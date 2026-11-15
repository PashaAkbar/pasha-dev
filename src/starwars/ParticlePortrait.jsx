import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ParticleBody } from '../utils/particleEngine';

// Rebuilds a transparent cut-out as a cloud of dust: the alpha channel is the
// subject mask, the pixels become monochrome particles with their own springs,
// and the figure assembles on reveal, breathes, and scatters under the cursor.
const MAX_SIZE = 440; // longest edge the cut-out is downsampled to
const DOT_SIZE = 3.4; // CSS pixels

function makeDotTexture(size = 48) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.55, 'rgba(255,255,255,0.92)');
  g.addColorStop(0.85, 'rgba(255,255,255,0.22)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

export default function ParticlePortrait({ art, className = '', label }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let disposed = false;
    let cleanup = () => {};
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const img = new Image();
    img.decoding = 'async';
    img.src = art.src;

    img.onload = () => {
      if (disposed) return;

      // ─── Downsample + sample the cut-out ───
      const [cx0, cy0, cx1, cy1] = art.crop || [0, 0, 1, 1];
      const sw = img.width * (cx1 - cx0);
      const sh = img.height * (cy1 - cy0);
      const scale = Math.min(1, MAX_SIZE / Math.max(sw, sh));
      const w = Math.max(1, Math.round(sw * scale));
      const h = Math.max(1, Math.round(sh * scale));

      const source = document.createElement('canvas');
      source.width = w;
      source.height = h;
      const sctx = source.getContext('2d', { willReadFrequently: true });
      sctx.drawImage(img, img.width * cx0, img.height * cy0, sw, sh, 0, 0, w, h);
      const pixels = sctx.getImageData(0, 0, w, h).data;

      el.style.aspectRatio = `${w} / ${h}`;

      const step = art.step || 8;
      const floor = art.darkness ?? 0.24;
      const targets = [];
      const lums = [];

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const i = (y * w + x) * 4;
          if (pixels[i + 3] < 128) continue; // transparent = no particle

          targets.push(x - w / 2, h / 2 - y, 0);
          lums.push((0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]) / 255);
        }
      }

      const count = lums.length;
      if (!count) return;

      // Monochrome, auto-levelled: stretch the luminance so the subject keeps
      // its shading instead of turning into a flat white silhouette.
      const sorted = Float32Array.from(lums).sort();
      const lo = sorted[Math.floor(count * 0.05)];
      const hi = sorted[Math.floor(count * 0.95)];
      const span = Math.max(0.05, hi - lo);

      const colors = new Float32Array(count * 3);
      for (let k = 0; k < count; k++) {
        const t = Math.min(1, Math.max(0, (lums[k] - lo) / span));
        // lift the mid-tones so a dark subject still reads against black
        const v = floor + (1 - floor) * Math.pow(t, 0.7);
        colors[k * 3] = v;
        colors[k * 3 + 1] = v;
        colors[k * 3 + 2] = v;
      }

      const targetArray = new Float32Array(targets);
      const colorArray = colors;

      // ─── Scene ───
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1000, 1000);
      camera.position.z = 500;

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      const body = new ParticleBody({
        count,
        targets: targetArray,
        colors: colorArray,
        texture: makeDotTexture(),
        radius: w * 0.5,
        // sizeAttenuation is off, so point size is in device pixels
        size: DOT_SIZE * renderer.getPixelRatio(),
        opacity: 1,
        sizeAttenuation: false,
        blending: THREE.NormalBlending,
      });
      // Per-particle colours need a shader that actually reads the attribute;
      // PointsMaterial's vertexColors path flattens them here.
      const dotTex = body.material.map;
      body.material.dispose();
      body.material = new THREE.ShaderMaterial({
        uniforms: {
          uMap: { value: dotTex },
          uSize: { value: DOT_SIZE * renderer.getPixelRatio() },
        },
        vertexShader: `
          attribute vec3 color;
          uniform float uSize;
          varying vec3 vColor;
          void main() {
            vColor = color;
            gl_PointSize = uSize;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uMap;
          varying vec3 vColor;
          void main() {
            float a = texture2D(uMap, gl_PointCoord).a;
            if (a < 0.02) discard;
            gl_FragColor = vec4(vColor, a);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });
      body.points.material = body.material;

      scene.add(body.points);

      // Start scattered so the portrait assembles on reveal (skipped when the
      // visitor asked for reduced motion)
      if (!reduced.matches) {
        for (let i = 0; i < count; i++) {
          body.pos[i * 3] += (Math.random() - 0.5) * w * 1.5;
          body.pos[i * 3 + 1] += (Math.random() - 0.5) * h * 1.1;
          body.pos[i * 3 + 2] = 0;
        }
      }
      let assembled = reduced.matches;

      // ─── Viewport fit ───
      let viewW = w;
      let viewH = h;

      const applyViewport = () => {
        const cw = el.clientWidth;
        const ch = el.clientHeight;
        if (!cw || !ch) return;
        const aspect = cw / ch;
        viewH = h * 1.02;
        viewW = viewH * aspect;
        if (viewW < w * 1.02) {
          viewW = w * 1.02;
          viewH = viewW / aspect;
        }
        camera.left = -viewW / 2;
        camera.right = viewW / 2;
        camera.top = viewH / 2;
        camera.bottom = -viewH / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(cw, ch);
      };
      applyViewport();

      // ─── Interaction ───
      const mouse = new THREE.Vector2();
      const cursor = new THREE.Vector3();
      let pointerInside = false;
      let visible = false;

      const onMove = (e) => {
        if (e.target !== renderer.domElement) {
          pointerInside = false;
          return;
        }
        pointerInside = true;
        const r = renderer.domElement.getBoundingClientRect();
        mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      };
      const onLeave = () => {
        pointerInside = false;
      };
      window.addEventListener('pointermove', onMove);
      renderer.domElement.addEventListener('pointerleave', onLeave);

      const io = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible && !assembled) {
            assembled = true;
            body.setTargets(targetArray, { peelSeconds: 1.1 });
          }
        },
        { threshold: 0.25 }
      );
      io.observe(el);

      // ─── Animation ───
      const clock = new THREE.Clock();
      let raf;

      const animate = () => {
        raf = requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 1 / 30);
        if (!visible) return;

        if (!assembled) {
          assembled = true;
          body.setTargets(targetArray, { peelSeconds: 1.1 });
        }

        if (pointerInside && !reduced.matches) {
          cursor.set((mouse.x * viewW) / 2, (mouse.y * viewH) / 2, 0);
          body.setCursor(cursor, w * 0.16, w * 38);
        } else {
          body.setCursor(null);
        }

        body.update(dt);
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => applyViewport();
      window.addEventListener('resize', onResize);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener('resize', onResize);
        window.removeEventListener('pointermove', onMove);
        renderer.domElement.removeEventListener('pointerleave', onLeave);
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
        dotTex.dispose();
        body.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
      };
    };

    return () => {
      disposed = true;
      cleanup();
    };
  }, [art]);

  return <div ref={mountRef} className={`sw-portrait ${className}`} role="img" aria-label={label} />;
}
