import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Crawl copy: drawn once onto a tall canvas, then scrolled through a
// perspective-tilted plane like the classic Star Wars opening crawl.
const EPISODE = 'Episode I';
const TITLE = 'THE FRONTEND AWAKENS';
const PARAGRAPHS = [
  'It is a period of digital war. Junior developers across the galaxy struggle to ship features on legacy codebases written in the dark times.',
  'But from the tropical system of JAVA, a hero emerges: PASHA AKBAR, a frontend engineer armed with React, TypeScript, and an unstoppable dedication to pixel-perfect interfaces.',
  'Guided by the ancient arts of Redux and Tailwind, he restores balance to the codebase — one commit at a time — while the Empire of Technical Debt watches from afar…',
];

const CANVAS_W = 1024;
const CANVAS_H = 4096;
const YELLOW = '#FFE81F';

const PLANE_W = 34;
const PLANE_TILT = -Math.PI / 2.9;

const CAM_TARGET = new THREE.Vector3(0, 30, -40);
const CAM_HOME = new THREE.Vector3(0, 14, 52);

const INTRO_DELAY = 5.6; // matches the .sw-intro CSS animation
const SCROLL_SPEED = 2.6; // world units per second along the plane
const TEXT_TOP = 1750; // canvas y of the first crawl line
const FONT = '"Arial Narrow", "Helvetica Neue", Arial, sans-serif';

// Portrait screens see a much narrower slice of the plane, so the text column
// has to be narrower too or it runs off the sides.
function stripFraction(aspect) {
  return Math.min(0.82, Math.max(0.34, 0.92 * aspect));
}

function drawCrawlCanvas(strip) {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext('2d');
  const column = CANVAS_W * strip;
  // Wide screens can afford bigger type; narrow ones are already tight.
  const s = strip > 0.7 ? 1.3 : 1;

  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  ctx.fillStyle = YELLOW;
  ctx.textAlign = 'center';

  // Text is laid out top-to-bottom in reading order; the plane starts low
  // enough that the first line enters from the bottom of the frame.
  let y = TEXT_TOP;

  // Episode line
  ctx.font = `bold ${Math.round(72 * s)}px ${FONT}`;
  ctx.fillText(EPISODE.toUpperCase(), CANVAS_W / 2, y);
  y += 110 * s;

  // Big title with the classic hollow stroke style. The title sits nearest the
  // camera, where the frustum is narrowest, so it gets less width than the body
  // copy and wraps onto more lines when the screen is narrow.
  const titleMax = column * (strip < 0.7 ? 0.62 : 0.94);
  const words = TITLE.split(' ');
  const halves = Math.ceil(words.length / 2);
  const variants = [
    [TITLE],
    [words.slice(0, halves).join(' '), words.slice(halves).join(' ')],
    words,
  ];
  const fits = (lines, size) => {
    ctx.font = `900 ${size}px ${FONT}`;
    return lines.every((l) => ctx.measureText(l).width <= titleMax);
  };

  let titleLines = variants[0];
  for (const variant of variants) {
    titleLines = variant;
    if (fits(variant, 52)) break;
  }
  let titleSize = 130 * s;
  while (titleSize > 36 && !fits(titleLines, titleSize)) titleSize -= 2;

  ctx.font = `900 ${titleSize}px ${FONT}`;
  ctx.strokeStyle = YELLOW;
  ctx.lineWidth = 4;
  const titleLead = titleSize * 1.06;
  titleLines.forEach((line, i) => {
    ctx.strokeText(line, CANVAS_W / 2, y + i * titleLead);
  });
  y += 190 * s + (titleLines.length - 1) * titleLead;

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

  ctx.font = `bold ${Math.round(58 * s)}px ${FONT}`;
  PARAGRAPHS.forEach((p) => {
    const lines = wrap(p, column);
    lines.forEach((l) => {
      ctx.fillText(l, CANVAS_W / 2, y);
      y += 78 * s;
    });
    y += 60 * s; // paragraph gap
  });

  return canvas;
}

export default function OpenCrawl() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 60, 190);

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 1000);
    camera.position.copy(CAM_HOME);
    camera.lookAt(CAM_TARGET);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
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
    const starMat = new THREE.PointsMaterial({
      color: 0xbbbbbb,
      size: 0.9,
      transparent: true,
      opacity: 0.8,
      fog: false,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ─── Crawl plane ───
    let strip = stripFraction(el.clientWidth / el.clientHeight || 1);
    const tex = new THREE.CanvasTexture(drawCrawlCanvas(strip));
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const planeH = (PLANE_W * CANVAS_H) / CANVAS_W; // keep canvas aspect ratio
    const planeMat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(PLANE_W, planeH), planeMat);
    // Tilt the tall plane away from the camera; bottom (near) edge sits just
    // below the camera's view axis so text enters at the bottom of the screen.
    plane.rotation.x = PLANE_TILT;
    const basePos = new THREE.Vector3(0, 34, -46);
    plane.position.copy(basePos);
    scene.add(plane);

    // The crawl travels along the plane's own "up" axis, so the text rises
    // toward the vanishing point instead of sliding down the texture.
    const planeUp = new THREE.Vector3(0, 1, 0).applyEuler(new THREE.Euler(PLANE_TILT, 0, 0));
    // Start low enough that the first line sits just under the frame and
    // scrolls up into view; loop only once the block has cleared the top.
    const START_TRAVEL = -(((CANVAS_H - 220) - TEXT_TOP) / CANVAS_H) * planeH;
    const TRAVEL = planeH * 1.35;

    const redraw = () => {
      const next = stripFraction(el.clientWidth / el.clientHeight || 1);
      if (Math.abs(next - strip) < 0.02) return;
      strip = next;
      tex.image = drawCrawlCanvas(strip);
      tex.needsUpdate = true;
    };

    const applyViewport = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      redraw();
    };
    applyViewport();

    // ─── Animation ───
    const clock = new THREE.Clock();
    let raf;
    let onScreen = true;
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(el);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.1);
      if (!onScreen) return; // no work while scrolled past the crawl

      const elapsed = clock.elapsedTime;
      const reduced = reducedMotion.matches;

      const travel = reduced
        ? START_TRAVEL + planeH * 0.3 // static, mid-crawl, so the copy is readable
        : START_TRAVEL + (Math.max(0, elapsed - INTRO_DELAY) * SCROLL_SPEED) % TRAVEL;
      plane.position.copy(basePos).addScaledVector(planeUp, travel);

      // Slow camera pull-back for cinematic depth
      if (!reduced) {
        camera.position.z = CAM_HOME.z - Math.sin(elapsed * 0.05) * 1.5;
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => applyViewport();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      starGeo.dispose();
      starMat.dispose();
      tex.dispose();
      plane.geometry.dispose();
      planeMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div className="sw-crawl">
      <div ref={mountRef} className="sw-crawl-canvas" aria-hidden="true" />
      <div className="sw-intro" aria-hidden="true">
        <p>A long time ago in a galaxy far,</p>
        <p>far away…</p>
      </div>
      <h1 className="sr-only">
        {EPISODE}: {TITLE}
      </h1>
      <div className="sr-only">
        {PARAGRAPHS.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="sw-scroll-hint">▼ SCROLL THE SAGA ▼</div>
    </div>
  );
}
