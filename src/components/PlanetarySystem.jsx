import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { loadEarthLandMask, isLandAt } from '../utils/earthSampler';
import { PLANETS, PERSONAL_INFO } from '../data/portfolioData';

export default function PlanetarySystem({
  activePlanetId = 'earth',
  onSelectPlanet = () => {},
  isDetailOpen = true,
}) {
  const mountRef = useRef(null);
  const activeRef = useRef(activePlanetId);
  const detailOpenRef = useRef(isDetailOpen);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    activeRef.current = activePlanetId;
  }, [activePlanetId]);

  useEffect(() => {
    detailOpenRef.current = isDetailOpen;
  }, [isDetailOpen]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 1, 4000);
    camera.position.set(0, 300, 600);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    renderer.domElement.style.touchAction = 'none'; // let touch drag orbit instead of scrolling
    el.appendChild(renderer.domElement);

    // Soft round dot texture
    const c = document.createElement('canvas');
    c.width = 32;
    c.height = 32;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(0.4, 'rgba(255,255,255,0.75)');
    g.addColorStop(0.8, 'rgba(255,255,255,0.15)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 32, 32);
    const dotTex = new THREE.CanvasTexture(c);

    // Starfield
    const sG = new THREE.BufferGeometry();
    const sP = [];
    for (let i = 0; i < 2200; i++) {
      const r = 1400 + Math.random() * 1200;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(Math.random() * 2 - 1);
      sP.push(r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p));
    }
    sG.setAttribute('position', new THREE.Float32BufferAttribute(sP, 3));
    scene.add(new THREE.Points(sG, new THREE.PointsMaterial({ color: 0x444444, size: 1.1 })));

    const GA = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    const map = {};
    const dynamicMoons = [];
    const dynamicWaves = [];

    // Helper to create basic dot sphere
    const makeDotSphere = (radius, count, color = 0x888888, opacity = 0.5, size = 1.1) => {
      const geo = new THREE.BufferGeometry();
      const pos = [];
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const rY = Math.sqrt(1 - y * y);
        const th = GA * i;
        pos.push(Math.cos(th) * rY * radius, y * radius, Math.sin(th) * rY * radius);
      }
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      return new THREE.Points(
        geo,
        new THREE.PointsMaterial({
          color,
          size,
          map: dotTex,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
    };

    // Helper: make a thin circular dotted orbit ring
    const makeOrbitRing = (radius, count = 120, opacity = 0.22, color = 0x666666) => {
      const rGeo = new THREE.BufferGeometry();
      const rPos = [];
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        rPos.push(Math.cos(a) * radius, 0, Math.sin(a) * radius);
      }
      rGeo.setAttribute('position', new THREE.Float32BufferAttribute(rPos, 3));
      return new THREE.Points(
        rGeo,
        new THREE.PointsMaterial({ color, size: 0.9, map: dotTex, transparent: true, opacity, blending: THREE.AdditiveBlending })
      );
    };

    // ─── Build Distinct Planets ───
    PLANETS.forEach((cfg) => {
      const group = new THREE.Group();
      scene.add(group);

      // Hit collider
      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(cfg.size * 1.5, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hit.userData = { planetId: cfg.id };
      group.add(hit);

      if (cfg.id === 'sun') {
        // ─── SOL: Central Star with Coronal Flare Loops ───
        const R = cfg.size;
        group.add(makeDotSphere(R, 800, 0xcccccc, 0.7, 1.4));
        group.add(makeDotSphere(R * 1.25, 250, 0x666666, 0.35, 1.2));

        // 3 Arching Coronal Solar Flare Loops (Prominences)
        for (let loopIdx = 0; loopIdx < 3; loopIdx++) {
          const lGeo = new THREE.BufferGeometry();
          const lPts = [];
          const baseAngle = (loopIdx * Math.PI * 2) / 3 + 0.4;
          const loopHeight = R * 0.65;
          for (let p = 0; p <= 24; p++) {
            const t = p / 24;
            const arch = Math.sin(t * Math.PI) * loopHeight;
            const a = baseAngle + (t - 0.5) * 0.35;
            const rad = R + arch;
            lPts.push(Math.cos(a) * rad, Math.sin(t * Math.PI) * (R * 0.2), Math.sin(a) * rad);
          }
          lGeo.setAttribute('position', new THREE.Float32BufferAttribute(lPts, 3));
          const flareLoop = new THREE.Points(
            lGeo,
            new THREE.PointsMaterial({ color: 0x999999, size: 1.3, map: dotTex, transparent: true, opacity: 0.6 })
          );
          flareLoop.rotation.x = loopIdx * 0.7;
          group.add(flareLoop);
        }
      } else if (cfg.id === 'earth') {
        // Earth handled specially below
      } else if (cfg.id === 'mars') {
        // ─── MARS: Prominent Ice Caps + Olympus Mons Caldera + Valles Marineris + Phobos & Deimos with Orbit Tracks ───
        const R = cfg.size;
        const mGeo = new THREE.BufferGeometry();
        const mPos = [];
        const mCols = [];
        const count = 1100;

        for (let i = 0; i < count; i++) {
          const y = 1 - (i / (count - 1)) * 2;
          const rY = Math.sqrt(1 - y * y);
          const th = GA * i;
          const x = Math.cos(th) * rY;
          const z = Math.sin(th) * rY;

          // Polar Ice Caps: North Pole (y > 0.78) and South Pole (y < -0.78) are distinct dense bright white
          const isNorthPole = y > 0.78;
          const isSouthPole = y < -0.78;

          // Valles Marineris canyon fissure across equator
          const lon = Math.atan2(z, x);
          const isCanyon = Math.abs(y) < 0.1 && lon > -1.5 && lon < -0.4;

          if (!isCanyon) {
            mPos.push(x * R, y * R, z * R);
            if (isNorthPole || isSouthPole) {
              mCols.push(0.9, 0.9, 0.95); // Bright white polar caps
            } else {
              mCols.push(0.24, 0.22, 0.22); // Darker terrain
            }
          }
        }
        mGeo.setAttribute('position', new THREE.Float32BufferAttribute(mPos, 3));
        mGeo.setAttribute('color', new THREE.Float32BufferAttribute(mCols, 3));
        const marsPts = new THREE.Points(
          mGeo,
          new THREE.PointsMaterial({
            size: 1.15,
            vertexColors: true,
            map: dotTex,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        group.add(marsPts);

        // Olympus Mons (Giant Shield Volcano Caldera): elevated concentric crater cone
        const volcanoGroup = new THREE.Group();
        volcanoGroup.position.set(R * 0.7, R * 0.3, R * 0.65);
        volcanoGroup.lookAt(volcanoGroup.position.clone().multiplyScalar(2));

        [R * 0.32, R * 0.2, R * 0.1].forEach((rad, vIdx) => {
          const vGeo = new THREE.BufferGeometry();
          const vPts = [];
          for (let a = 0; a <= Math.PI * 2; a += Math.PI / 10) {
            vPts.push(Math.cos(a) * rad, Math.sin(a) * rad, vIdx * 0.8);
          }
          vGeo.setAttribute('position', new THREE.Float32BufferAttribute(vPts, 3));
          volcanoGroup.add(
            new THREE.Points(
              vGeo,
              new THREE.PointsMaterial({ color: 0x888888, size: 1.1, map: dotTex, transparent: true, opacity: 0.7 })
            )
          );
        });
        group.add(volcanoGroup);

        // Phobos & Deimos with faint orbital rings
        const phobosOrbit = makeOrbitRing(R * 1.65, 80, 0.2);
        const deimosOrbit = makeOrbitRing(R * 2.35, 100, 0.18);
        group.add(phobosOrbit);
        group.add(deimosOrbit);

        const phobosPiv = new THREE.Group();
        const deimosPiv = new THREE.Group();
        group.add(phobosPiv);
        group.add(deimosPiv);

        const phobosMesh = makeDotSphere(0.8, 1, 0xffffff, 0.85, 2.2);
        phobosMesh.position.set(R * 1.65, 0, 0);
        phobosPiv.add(phobosMesh);

        const deimosMesh = makeDotSphere(0.8, 1, 0xaaaaaa, 0.75, 1.8);
        deimosMesh.position.set(R * 2.35, 0, 0);
        deimosPiv.add(deimosMesh);

        dynamicMoons.push(
          { pivot: phobosPiv, speed: 0.038 },
          { pivot: deimosPiv, speed: 0.02 }
        );
      } else if (cfg.id === 'jupiter') {
        // ─── JUPITER: Distinct Horizontal Zebra Cloud Belts + Swirling Great Red Spot + 4 Galilean Moons ───
        const R = cfg.size;
        const jGeo = new THREE.BufferGeometry();
        const jPos = [];
        const jCols = [];
        const count = 2200;

        for (let i = 0; i < count; i++) {
          const y = 1 - (i / (count - 1)) * 2;
          const rY = Math.sqrt(1 - y * y);
          const th = GA * i;
          const x = Math.cos(th) * rY;
          const z = Math.sin(th) * rY;

          // Latitudinal atmospheric cloud bands (high-contrast alternating stripes)
          const lat = Math.asin(y);
          // Modulate stripes across latitude: zones vs belts
          const stripe = Math.sin(lat * 9.0);
          const isBrightStripe = stripe > 0.0;

          // Great Red Spot vortex feature at lat -22 deg (lat ~ -0.38 rad)
          const lon = Math.atan2(z, x);
          const inGRS = Math.abs(lat - -0.38) < 0.14 && Math.abs(lon - 1.1) < 0.32;

          jPos.push(x * R, y * R, z * R);

          if (inGRS) {
            jCols.push(0.95, 0.85, 0.75); // Bright swirling spot core
          } else if (isBrightStripe) {
            jCols.push(0.55, 0.55, 0.58); // Distinct light zone
          } else {
            jCols.push(0.12, 0.12, 0.14); // Dark cloud belt
          }
        }

        jGeo.setAttribute('position', new THREE.Float32BufferAttribute(jPos, 3));
        jGeo.setAttribute('color', new THREE.Float32BufferAttribute(jCols, 3));
        const jupiterPts = new THREE.Points(
          jGeo,
          new THREE.PointsMaterial({
            size: 1.15,
            vertexColors: true,
            map: dotTex,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        group.add(jupiterPts);

        // 4 Galilean Moons with visible dotted orbit tracks (Io, Europa, Ganymede, Callisto)
        const moonDists = [R * 1.5, R * 2.1, R * 2.8, R * 3.6];
        const moonSpeeds = [0.035, 0.024, 0.016, 0.009];

        moonDists.forEach((d, idx) => {
          // Visible circular orbit track
          group.add(makeOrbitRing(d, 80 + idx * 20, 0.14));

          const mPiv = new THREE.Group();
          group.add(mPiv);
          const mMesh = makeDotSphere(0.8, 1, 0xdddddd, 0.85, 2.2 - idx * 0.2);
          mMesh.position.set(d, 0, 0);
          mPiv.add(mMesh);
          dynamicMoons.push({ pivot: mPiv, speed: moonSpeeds[idx] });
        });
      } else if (cfg.id === 'saturn') {
        // ─── SATURN: Oblate Spheroid (Flattened) + Dual Rings with Cassini Division (User Favorite) ───
        const R = cfg.size;
        const sGeo = new THREE.BufferGeometry();
        const sPos = [];
        const count = 1400;

        for (let i = 0; i < count; i++) {
          const y = 1 - (i / (count - 1)) * 2;
          const rY = Math.sqrt(1 - y * y);
          const th = GA * i;
          // Oblate flattening: polar y compressed to 0.88, equatorial expanded to 1.03
          sPos.push(Math.cos(th) * rY * R * 1.03, y * R * 0.88, Math.sin(th) * rY * R * 1.03);
        }
        sGeo.setAttribute('position', new THREE.Float32BufferAttribute(sPos, 3));
        const saturnBody = new THREE.Points(
          sGeo,
          new THREE.PointsMaterial({
            color: 0x999999,
            size: 1.1,
            map: dotTex,
            transparent: true,
            opacity: 0.55,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        group.add(saturnBody);

        // Grand Dual Rings with Cassini Division
        const ringGeo = new THREE.BufferGeometry();
        const ringPos = [];
        const ringCols = [];

        // Ring B (inner, dense): 1.42R to 1.9R
        for (let i = 0; i < 280; i++) {
          const a = (i / 280) * Math.PI * 2 + Math.random() * 0.02;
          const rad = R * 1.42 + Math.random() * (R * 0.48);
          ringPos.push(Math.cos(a) * rad, (Math.random() - 0.5) * 0.3, Math.sin(a) * rad);
          ringCols.push(0.5, 0.5, 0.52);
        }

        // Cassini division gap (1.9R - 2.08R is empty)

        // Ring A (outer): 2.08R to 2.55R
        for (let i = 0; i < 220; i++) {
          const a = (i / 220) * Math.PI * 2 + Math.random() * 0.02;
          const rad = R * 2.08 + Math.random() * (R * 0.45);
          ringPos.push(Math.cos(a) * rad, (Math.random() - 0.5) * 0.3, Math.sin(a) * rad);
          ringCols.push(0.35, 0.35, 0.38);
        }

        ringGeo.setAttribute('position', new THREE.Float32BufferAttribute(ringPos, 3));
        ringGeo.setAttribute('color', new THREE.Float32BufferAttribute(ringCols, 3));

        const dualRings = new THREE.Points(
          ringGeo,
          new THREE.PointsMaterial({
            size: 1.05,
            vertexColors: true,
            map: dotTex,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        dualRings.rotation.x = 0.46; // 26.7 degree axial ring tilt
        dualRings.rotation.z = 0.1;
        group.add(dualRings);
      } else if (cfg.id === 'neptune') {
        // ─── NEPTUNE: Tilted Narrow Rings (Adams/Le Verrier) + Pulsing Beacon Waves + Triton Moon ───
        const R = cfg.size;
        group.add(makeDotSphere(R, 850, 0x8899aa, 0.55, 1.15));

        // Tilted Narrow Ring System (Neptune's famous delicate rings, tilted at 30 deg)
        const nRingGeo = new THREE.BufferGeometry();
        const nRingPos = [];
        for (let i = 0; i < 180; i++) {
          const a = (i / 180) * Math.PI * 2;
          const rad = R * 1.55 + Math.random() * 0.4;
          nRingPos.push(Math.cos(a) * rad, (Math.random() - 0.5) * 0.2, Math.sin(a) * rad);
        }
        nRingGeo.setAttribute('position', new THREE.Float32BufferAttribute(nRingPos, 3));
        const nRing = new THREE.Points(
          nRingGeo,
          new THREE.PointsMaterial({ color: 0x7799aa, size: 1.0, map: dotTex, transparent: true, opacity: 0.45 })
        );
        nRing.rotation.x = 0.52; // Tilted ring
        nRing.rotation.z = 0.2;
        group.add(nRing);

        // Animated Beacon Radar Transmission Wave Circles (expanding outward)
        const waveRings = [];
        for (let w = 0; w < 3; w++) {
          const wGeo = new THREE.BufferGeometry();
          const wPts = [];
          for (let a = 0; a <= Math.PI * 2; a += Math.PI / 24) {
            wPts.push(Math.cos(a), 0, Math.sin(a));
          }
          wGeo.setAttribute('position', new THREE.Float32BufferAttribute(wPts, 3));
          const wLine = new THREE.Line(
            wGeo,
            new THREE.LineBasicMaterial({ color: 0x6688aa, transparent: true, opacity: 0.35 })
          );
          wLine.rotation.x = 0.5;
          group.add(wLine);
          waveRings.push({ mesh: wLine, offset: w * 0.33 });
        }
        dynamicWaves.push(...waveRings);

        // Retrograde Triton Moon on inclined dotted orbit track
        const tritonOrbit = makeOrbitRing(R * 2.5, 90, 0.2, 0x6688aa);
        tritonOrbit.rotation.x = 0.65;
        group.add(tritonOrbit);

        const tritonPiv = new THREE.Group();
        tritonPiv.rotation.x = 0.65;
        group.add(tritonPiv);

        const tritonMesh = makeDotSphere(0.8, 1, 0xffffff, 0.9, 2.2);
        tritonMesh.position.set(R * 2.5, 0, 0);
        tritonPiv.add(tritonMesh);
        dynamicMoons.push({ pivot: tritonPiv, speed: -0.016 }); // Retrograde negative speed
      }

      // Orbital Track Line
      if (cfg.orbitRadius > 0) {
        const oG = new THREE.BufferGeometry();
        const oP = [];
        for (let i = 0; i <= 128; i++) {
          const a = (i / 128) * Math.PI * 2;
          oP.push(Math.cos(a) * cfg.orbitRadius, 0, Math.sin(a) * cfg.orbitRadius);
        }
        oG.setAttribute('position', new THREE.Float32BufferAttribute(oP, 3));
        scene.add(new THREE.Line(oG, new THREE.LineBasicMaterial({ color: 0x3c3c3c })));
      }

      map[cfg.id] = { group, hit, config: cfg };
    });

    // ─── EARTH: Bright Land Continents over Faint Ocean Dots (islands clearly visible) ───
    const ER = PLANETS.find((p) => p.id === 'earth').size;
    const eGroup = map.earth.group;
    const NE = 20000; // Dense enough for readable coastlines, still airy
    const ePos = new Float32Array(NE * 3);
    const eCol = new Float32Array(NE * 3);

    for (let i = 0; i < NE; i++) {
      const y = 1 - (i / (NE - 1)) * 2;
      const rY = Math.sqrt(1 - y * y);
      const th = GA * i;
      ePos[i * 3] = Math.cos(th) * rY * ER;
      ePos[i * 3 + 1] = y * ER;
      ePos[i * 3 + 2] = Math.sin(th) * rY * ER;
      eCol[i * 3] = 0.12;
      eCol[i * 3 + 1] = 0.12;
      eCol[i * 3 + 2] = 0.14;
    }

    const eGeo = new THREE.BufferGeometry();
    eGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
    eGeo.setAttribute('color', new THREE.BufferAttribute(eCol, 3));
    eGroup.add(
      new THREE.Points(
        eGeo,
        new THREE.PointsMaterial({
          size: 1.1,
          vertexColors: true,
          map: dotTex,
          transparent: true,
          opacity: 0.75,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      )
    );
    eGroup.rotation.z = 0.41;

    loadEarthLandMask().then((md) => {
      if (!md) return;
      const pA = eGeo.getAttribute('position');
      const cA = eGeo.getAttribute('color');
      for (let i = 0; i < NE; i++) {
        const y = 1 - (i / (NE - 1)) * 2;
        const rY = Math.sqrt(1 - y * y);
        const th = GA * i;
        const x = Math.cos(th) * rY;
        const z = Math.sin(th) * rY;
        const lat = (Math.asin(y) * 180) / Math.PI;
        const lon = (Math.atan2(z, x) * 180) / Math.PI;
        const u = (lon + 180) / 360;
        const v = (90 - lat) / 180;

        if (isLandAt(u, v, md)) {
          // Land: bright white dots forming visible continents & islands
          pA.setXYZ(i, x * ER, y * ER, z * ER);
          cA.setXYZ(i, 0.95, 0.95, 0.97);
        } else {
          // Ocean: black transparent (invisible with additive blending)
          pA.setXYZ(i, x * ER * 0.996, y * ER * 0.996, z * ER * 0.996);
          cA.setXYZ(i, 0, 0, 0);
        }
      }
      pA.needsUpdate = true;
      cA.needsUpdate = true;
    });

    // Interaction Handlers
    const rc = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let drag = false;
    let prev = { x: 0, y: 0 };
    let dTime = 0;
    let dPos = { x: 0, y: 0 };
    let orbitA = 0;
    let pitch = 0.4;
    let dist = 650;
    const lookAt = new THREE.Vector3();
    const hits = Object.values(map).map((p) => p.hit);

    const setMouseFromEvent = (e) => {
      const r = renderer.domElement.getBoundingClientRect();
      mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    };

    const onDown = (e) => {
      setHovered(null);
      setMouseFromEvent(e); // taps never fire a preceding pointermove
      drag = true;
      prev = { x: e.clientX, y: e.clientY };
      dTime = performance.now();
      dPos = { ...prev };
    };

    const onMove = (e) => {
      if (drag) {
        orbitA -= (e.clientX - prev.x) * 0.005;
        pitch = Math.max(0.05, Math.min(1.4, pitch - (e.clientY - prev.y) * 0.004));
        prev = { x: e.clientX, y: e.clientY };
        return;
      }
      // ignore hover raycasts that start over UI overlays
      if (e.target !== renderer.domElement) {
        setHovered(null);
        el.style.cursor = 'default';
        return;
      }
      setMouseFromEvent(e);
      rc.setFromCamera(mouse, camera);
      const h = rc.intersectObjects(hits);
      setHovered(h.length ? PLANETS.find((p) => p.id === h[0].object.userData.planetId) : null);
      el.style.cursor = h.length ? 'pointer' : 'default';
    };

    const onUp = (e) => {
      drag = false;
      if (Math.hypot(e.clientX - dPos.x, e.clientY - dPos.y) < 5 && performance.now() - dTime < 300) {
        setMouseFromEvent(e); // use the release point, not the last hover position
        rc.setFromCamera(mouse, camera);
        const h = rc.intersectObjects(hits);
        if (h.length) onSelectPlanet(h[0].object.userData.planetId);
      }
    };

    const onWheel = (e) => {
      e.preventDefault();
      dist = Math.max(50, Math.min(1200, dist + e.deltaY * 0.5));
    };

    renderer.domElement.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let raf;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Orbit planets
      PLANETS.forEach((cfg) => {
        if (!cfg.orbitRadius) return;
        const o = map[cfg.id];
        if (!o) return;
        const a = t * cfg.speed + cfg.orbitRadius * 0.01;
        o.group.position.set(Math.cos(a) * cfg.orbitRadius, 0, Math.sin(a) * cfg.orbitRadius);
        o.group.rotation.y += 0.004;
      });

      // Moons rotation
      dynamicMoons.forEach((m) => {
        m.pivot.rotation.y += m.speed;
      });

      // Neptune radar pulse waves expansion
      const neptuneObj = map.neptune;
      if (neptuneObj) {
        const NR = neptuneObj.config.size;
        dynamicWaves.forEach((w) => {
          const progress = (t * 0.35 + w.offset) % 1;
          const currentRadius = NR * (1.2 + progress * 1.8);
          w.mesh.scale.set(currentRadius, currentRadius, currentRadius);
          w.mesh.material.opacity = (1 - progress) * 0.35;
        });
      }

      eGroup.rotation.y += 0.002;

      // ─── Camera Framing: 50/50 split on desktop, planet above the sheet on mobile ───
      const id = activeRef.current;
      const isDetail = detailOpenRef.current && id !== 'sun';
      const narrow = el.clientWidth < 768;
      let tP = new THREE.Vector3();
      let tL = new THREE.Vector3();

      if (id === 'sun') {
        // Full System Overview
        tP.set(
          Math.sin(orbitA) * Math.cos(pitch) * dist,
          Math.sin(pitch) * dist,
          Math.cos(orbitA) * Math.cos(pitch) * dist
        );
        tL.set(0, 0, 0);
      } else {
        const o = map[id];
        if (o) {
          const wp = new THREE.Vector3();
          o.group.getWorldPosition(wp);

          const fd = (id === 'earth' ? o.config.size * 3.4 : o.config.size * 3.8) * (narrow ? 1.3 : 1);

          // Camera offset: position camera in front of the planet
          tP.copy(wp).add(new THREE.Vector3(0, fd * 0.25, fd));

          if (isDetail) {
            if (narrow) {
              // Mobile: the panel covers the lower screen — look below the planet
              // so it sits in the upper half
              tL.copy(wp).add(new THREE.Vector3(0, -fd * 0.3, 0));
            } else {
              // 50% / 50% Split Screen:
              // Center the planet in the LEFT 50% of the screen by shifting lookAt to the right
              // by approx 25% of visible frustum width (~fd * 0.26)
              tL.copy(wp).add(new THREE.Vector3(fd * 0.26, 0, 0));
            }
          } else {
            tL.copy(wp);
          }
        }
      }

      camera.position.lerp(tP, 0.045);
      lookAt.lerp(tL, 0.045);
      camera.lookAt(lookAt);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.85)',
            border: '1px solid #333',
            borderRadius: 999,
            padding: '5px 14px',
            fontSize: 11,
            color: '#ccc',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            zIndex: 30,
            letterSpacing: '0.06em',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
          {hovered.name} <span style={{ color: '#666' }}>· {hovered.label}</span>
        </div>
      )}
    </div>
  );
}
