import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Crawl copy: drawn once onto a tall canvas, then scrolled through a
// perspective-tilted plane like the classic Star Wars opening crawl.
const EPISODE = 'Episode I';
const TITLE = 'THE FRONTEND AWAKENS';
const PARAGRAPHS = [
  'It is a period of digital war. Junior developers across the galaxy struggle to ship features on legacy codebases written in the dark times.',
  'But from the tropical system of JAVA, a hero emerges: PASHA AKBAR, a frontend engineer armed with React, TypeScript, and an unstoppable dedication to pixel-perfect interfaces.',
  'Guided by the ancient arts of Redux and Tailwind, he restores balance to the codebase — one commit at a time — while the Empire of Technical Debt watches from afar....',
];

const CANVAS_W = 1024;
const CANVAS_H = 4096;
const YELLOW = '#FFE81F';

function drawCrawlCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  ctx.fillStyle = YELLOW;
  ctx.textAlign = 'center';

  let y = CANVAS_H - 220; // crawl starts at the bottom of the canvas

  // Episode line
  ctx.font = `bold 72px "Arial Narrow", "Helvetica Neue", Arial, sans-serif`;
  ctx.fillText(EPISODE.toUpperCase(), CANVAS_W / 2, y);
  y -= 110;

  // Big title with the classic hollow stroke style
  ctx.font = `900 130px "Arial Narrow", "Helvetica Neue", Arial, sans-serif`;
  ctx.strokeStyle = YELLOW;
  ctx.lineWidth = 4;
  ctx.strokeText(TITLE, CANVAS_W / 2, y);
  y -= 190;

  // Paragraphs
  const wrap = (text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    words.forEach((w) => {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > maxWidth) {
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    return lines;
  };

  ctx.font = `bold 58px "Arial Narrow", "Helvetica Neue", Arial, sans-serif`;
  PARAGRAPHS.forEach((p) => {
    const lines = wrap(p, CANVAS_W * 0.82);
    lines.forEach((l) => {
      ctx.fillText(l, CANVAS_W / 2, y);
      y -= 78;
    });
    y -= 60; // paragraph gap
  });

  return canvas;
}

export default function OpenCrawl() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 60, 190);

    const camera = new THREE.PerspectiveCamera(52, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 6, 26);
    camera.lookAt(0, 30, -40);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    el.appendChild(renderer.domElement);

    // ─── Starfield ───
    const starGeo = new THREE.BufferGeometry();
    const starPos = [];
    for (let i = 0; i < 2600; i++) {
      const r = 300 + Math.random() * 500;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(Math.random() * 2 - 1);
      starPos.push(
        r * Math.sin(p) * Math.cos(t),
        r * Math.sin(p) * Math.sin(t) + 40,
        r * Math.cos(p)
      );
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({ color: 0xbbbbbb, size: 0.9, transparent: true, opacity: 0.8, fog: false })
      )
    );

    // ─── Crawl plane ───
    const tex = new THREE.CanvasTexture(drawCrawlCanvas());
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const planeW = 34;
    const planeH = (planeW * CANVAS_H) / CANVAS_W; // keep canvas aspect ratio
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(planeW, planeH),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide })
    );
    // Tilt the tall plane away from the camera; bottom (near) edge sits just
    // below the camera's view axis so text enters at the bottom of the screen.
    plane.rotation.x = -Math.PI / 2.9;
    plane.position.set(0, 34, -46);
    scene.add(plane);

    // ─── Animation ───
    const clock = new THREE.Clock();
    let raf;
    const INTRO_DELAY = 6.5; // keep in sync with the .sw-intro CSS animation
    const SCROLL_SPEED = 0.012; // texture heights per second
    const LOOP_OFFSET = 0.55; // full text has passed by ~0.45, then replay

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      tex.offset.y = Math.max(0, elapsed - INTRO_DELAY) * SCROLL_SPEED % LOOP_OFFSET;

      // Slow camera pull-back for cinematic depth
      camera.position.z = 26 - Math.sin(elapsed * 0.05) * 1.5;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      tex.dispose();
      plane.geometry.dispose();
      plane.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="sw-crawl">
      <div ref={mountRef} className="sw-crawl-canvas" />
      <div className="sw-intro">
        <p>A long time ago in a galaxy far,</p>
        <p>far away....</p>
      </div>
      <div className="sw-scroll-hint">▼ SCROLL THE SAGA ▼</div>
    </div>
  );
}
