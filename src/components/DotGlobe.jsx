import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createWorldLandCanvas } from '../utils/mapGenerator';
import { CITIES, CONNECTIONS } from '../data/cities';

export default function DotGlobe({
  rotationSpeed = 0.0015,
  isRotating = true,
  dotSize = 2.4,
  showAtmosphere = true,
  showArcs = true,
  showOceanDots = true,
  showRings = true,
  oceanOpacity = 0.12,
  theme = 'white', // 'white', 'cyber', 'matrix', 'amber'
  selectedCity = null,
  onSelectCity = () => {},
  globeScale = 1.0,
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    globeGroup: null,
    pointsMesh: null,
    arcsGroup: null,
    citiesGroup: null,
    ringsGroup: null,
    atmosphereMesh: null,
    isDragging: false,
    prevMousePos: { x: 0, y: 0 },
    rotationVelocity: { x: 0, y: 0.001 },
    targetRotation: { x: 0, y: 0 },
    animatingToCity: false,
    animStartTime: 0,
    startQuat: new THREE.Quaternion(),
    targetQuat: new THREE.Quaternion(),
    pulses: [],
  });

  // Color themes
  const THEME_COLORS = {
    white: {
      land: new THREE.Color('#ffffff'),
      ocean: new THREE.Color('#4b5563'),
      arc: new THREE.Color('#e5e7eb'),
      pulse: new THREE.Color('#ffffff'),
      atmosphere: new THREE.Color('#9ca3af'),
      city: new THREE.Color('#ffffff'),
      activeCity: new THREE.Color('#ffffff'),
      ring: new THREE.Color('#374151'),
    },
    cyber: {
      land: new THREE.Color('#67e8f9'),
      ocean: new THREE.Color('#164e63'),
      arc: new THREE.Color('#38bdf8'),
      pulse: new THREE.Color('#a5f3fc'),
      atmosphere: new THREE.Color('#0284c7'),
      city: new THREE.Color('#38bdf8'),
      activeCity: new THREE.Color('#38bdf8'),
      ring: new THREE.Color('#0c4a6e'),
    },
    matrix: {
      land: new THREE.Color('#4ade80'),
      ocean: new THREE.Color('#064e3b'),
      arc: new THREE.Color('#22c55e'),
      pulse: new THREE.Color('#86efac'),
      atmosphere: new THREE.Color('#15803d'),
      city: new THREE.Color('#4ade80'),
      activeCity: new THREE.Color('#86efac'),
      ring: new THREE.Color('#064e3b'),
    },
    amber: {
      land: new THREE.Color('#fbbf24'),
      ocean: new THREE.Color('#78350f'),
      arc: new THREE.Color('#f59e0b'),
      pulse: new THREE.Color('#fef3c7'),
      atmosphere: new THREE.Color('#d97706'),
      city: new THREE.Color('#fbbf24'),
      activeCity: new THREE.Color('#fef3c7'),
      ring: new THREE.Color('#78350f'),
    },
  };

  const currentTheme = THEME_COLORS[theme] || THEME_COLORS.white;

  // Coordinate conversion helper: (lat, lon, radius) -> Vector3
  const latLonToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  // Create soft circular dot texture on an offscreen canvas
  const createDotTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.25)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 320);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Root Globe Group (all rotating objects belong here)
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Generate Dot Earth Points using Fibonacci Sphere Distribution
    const globeRadius = 100;
    const numPoints = 28000;
    const landCanvas = createWorldLandCanvas(2048, 1024);
    const landCtx = landCanvas?.getContext('2d');
    const mapData = landCtx ? landCtx.getImageData(0, 0, 2048, 1024).data : null;

    const positions = [];
    const colors = [];
    const alphas = [];
    const isLandArray = [];

    const phiGolden = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiGolden * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Lat / Lon
      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(z, x) * (180 / Math.PI);

      // Equirectangular UV mapping
      const u = (lon + 180) / 360;
      const v = (90 - lat) / 180;

      let isLand = false;
      if (mapData) {
        const px = Math.min(2047, Math.max(0, Math.floor(u * 2048)));
        const py = Math.min(1023, Math.max(0, Math.floor(v * 1024)));
        const index = (py * 2048 + px) * 4;
        isLand = mapData[index] > 120; // White pixels are land
      }

      // Elevate land points slightly
      const r = isLand ? globeRadius : globeRadius * 0.992;
      const pos = latLonToVector3(lat, lon, r);

      positions.push(pos.x, pos.y, pos.z);
      isLandArray.push(isLand);

      if (isLand) {
        colors.push(currentTheme.land.r, currentTheme.land.g, currentTheme.land.b);
        alphas.push(1.0);
      } else {
        colors.push(currentTheme.ocean.r, currentTheme.ocean.g, currentTheme.ocean.b);
        alphas.push(oceanOpacity);
      }
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    pointsGeometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1));

    const dotTexture = createDotTexture();

    const pointsMaterial = new THREE.PointsMaterial({
      size: dotSize,
      vertexColors: true,
      map: dotTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    globeGroup.add(pointsMesh);

    // 2. Atmospheric Halo
    const atmosphereGeo = new THREE.SphereGeometry(globeRadius * 1.15, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: currentTheme.atmosphere },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
          gl_FragColor = vec4(glowColor, intensity * 0.35);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // 3. Sci-Fi Latitude/Longitude Orbital Rings
    const ringsGroup = new THREE.Group();
    const ringMat = new THREE.LineBasicMaterial({
      color: currentTheme.ring,
      transparent: true,
      opacity: 0.3,
    });

    // Equator ring
    const equatorGeo = new THREE.BufferGeometry();
    const equatorPoints = [];
    for (let a = 0; a <= Math.PI * 2; a += Math.PI / 64) {
      equatorPoints.push(Math.cos(a) * (globeRadius * 1.03), 0, Math.sin(a) * (globeRadius * 1.03));
    }
    equatorGeo.setAttribute('position', new THREE.Float32BufferAttribute(equatorPoints, 3));
    const equatorLine = new THREE.Line(equatorGeo, ringMat);
    ringsGroup.add(equatorLine);

    // Tilted orbit ring
    const orbitRingGeo = new THREE.BufferGeometry();
    const orbitPoints = [];
    for (let a = 0; a <= Math.PI * 2; a += Math.PI / 64) {
      orbitPoints.push(Math.cos(a) * (globeRadius * 1.1), 0, Math.sin(a) * (globeRadius * 1.1));
    }
    orbitRingGeo.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));
    const orbitLine = new THREE.Line(orbitRingGeo, ringMat);
    orbitLine.rotation.x = Math.PI * 0.25;
    orbitLine.rotation.z = Math.PI * 0.15;
    ringsGroup.add(orbitLine);

    globeGroup.add(ringsGroup);

    // 4. Flight / Data Arcs & Traveling Pulses
    const arcsGroup = new THREE.Group();
    const cityCoordMap = {};
    CITIES.forEach((c) => {
      cityCoordMap[c.name] = latLonToVector3(c.lat, c.lon, globeRadius);
    });

    const pulses = [];

    CONNECTIONS.forEach(([startName, endName], index) => {
      const vStart = cityCoordMap[startName];
      const vEnd = cityCoordMap[endName];
      if (!vStart || !vEnd) return;

      const distance = vStart.distanceTo(vEnd);
      const elevation = Math.min(distance * 0.35, 45);

      // Midpoint elevated away from globe center
      const vMid = vStart.clone().add(vEnd).multiplyScalar(0.5);
      vMid.normalize().multiplyScalar(globeRadius + elevation);

      const curve = new THREE.QuadraticBezierCurve3(vStart, vMid, vEnd);
      const curvePoints = curve.getPoints(50);
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

      const arcMaterial = new THREE.LineBasicMaterial({
        color: currentTheme.arc,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
      });

      const arcLine = new THREE.Line(arcGeometry, arcMaterial);
      arcsGroup.add(arcLine);

      // Data pulse on this curve
      const pulseGeo = new THREE.SphereGeometry(1.2, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: currentTheme.pulse,
        transparent: true,
        opacity: 0.9,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      arcsGroup.add(pulseMesh);

      pulses.push({
        curve,
        mesh: pulseMesh,
        speed: 0.003 + (index % 4) * 0.0015,
        offset: (index * 0.17) % 1,
      });
    });

    globeGroup.add(arcsGroup);

    // 5. City Marker Pins
    const citiesGroup = new THREE.Group();
    const cityPins = [];

    CITIES.forEach((city) => {
      const pos = latLonToVector3(city.lat, city.lon, globeRadius + 1.2);

      // Dot marker
      const pinGeo = new THREE.SphereGeometry(1.3, 12, 12);
      const pinMat = new THREE.MeshBasicMaterial({
        color: currentTheme.city,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinMesh.userData = { city };

      // Outer ripple ring
      const ringGeo = new THREE.RingGeometry(1.8, 2.4, 24);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: currentTheme.activeCity,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMaterial);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(pos.clone().multiplyScalar(2));

      citiesGroup.add(pinMesh);
      citiesGroup.add(ringMesh);

      cityPins.push({ city, pinMesh, ringMesh, baseScale: 1.0 });
    });

    globeGroup.add(citiesGroup);

    // Initial rotation tilt for Earth (23.4 degrees axial tilt)
    globeGroup.rotation.x = 0.25;

    // Store state in ref
    stateRef.current = {
      scene,
      camera,
      renderer,
      globeGroup,
      pointsMesh,
      arcsGroup,
      citiesGroup,
      ringsGroup,
      atmosphereMesh,
      isLandArray,
      positions,
      cityPins,
      pulses,
      isDragging: false,
      prevMousePos: { x: 0, y: 0 },
      rotationVelocity: { x: 0, y: rotationSpeed },
      targetRotation: { x: globeGroup.rotation.x, y: globeGroup.rotation.y },
      animatingToCity: false,
      animStartTime: 0,
      startQuat: new THREE.Quaternion(),
      targetQuat: new THREE.Quaternion(),
    };

    // Pointer Interaction Handlers
    const onPointerDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.prevMousePos = { x: e.clientX, y: e.clientY };
      stateRef.current.animatingToCity = false;
    };

    const onPointerMove = (e) => {
      if (!stateRef.current.isDragging) return;
      const deltaX = e.clientX - stateRef.current.prevMousePos.x;
      const deltaY = e.clientY - stateRef.current.prevMousePos.y;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;

      // Keep x within pitch limits
      globeGroup.rotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, globeGroup.rotation.x));

      stateRef.current.rotationVelocity = {
        x: deltaY * 0.0005,
        y: deltaX * 0.0005,
      };

      stateRef.current.prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      stateRef.current.isDragging = false;
    };

    // Zoom on wheel
    const onWheel = (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.25;
      camera.position.z = Math.max(160, Math.min(500, camera.position.z));
    };

    // Raycast click to select city pin
    const onCanvasClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(
        cityPins.map((p) => p.pinMesh)
      );

      if (intersects.length > 0) {
        const clickedCity = intersects[0].object.userData.city;
        if (clickedCity) {
          onSelectCity(clickedCity);
        }
      }
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElem.addEventListener('wheel', onWheel, { passive: false });
    domElem.addEventListener('click', onCanvasClick);

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotation handling
      if (!stateRef.current.isDragging) {
        if (stateRef.current.animatingToCity) {
          const progress = Math.min(1, (performance.now() - stateRef.current.animStartTime) / 1200);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          globeGroup.quaternion.slerpQuaternions(
            stateRef.current.startQuat,
            stateRef.current.targetQuat,
            eased
          );
          if (progress >= 1) {
            stateRef.current.animatingToCity = false;
          }
        } else if (isRotating) {
          globeGroup.rotation.y += rotationSpeed;
        } else {
          // Inertial damping
          globeGroup.rotation.y += stateRef.current.rotationVelocity.y;
          globeGroup.rotation.x += stateRef.current.rotationVelocity.x;
          stateRef.current.rotationVelocity.x *= 0.94;
          stateRef.current.rotationVelocity.y *= 0.94;
        }
      }

      // Animate pulses along curves
      pulses.forEach((p) => {
        const t = (elapsedTime * p.speed * 40 + p.offset) % 1;
        const pos = p.curve.getPoint(t);
        p.mesh.position.copy(pos);
      });

      // Animate city ripple rings
      cityPins.forEach((pin, idx) => {
        const scale = 1 + 0.3 * Math.sin(elapsedTime * 3 + idx);
        pin.ringMesh.scale.set(scale, scale, scale);
      });

      // Subtle atmosphere shimmer
      if (atmosphereMesh) {
        atmosphereMesh.rotation.y = globeGroup.rotation.y * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElem.removeEventListener('wheel', onWheel);
      domElem.removeEventListener('click', onCanvasClick);
      if (container.contains(domElem)) {
        container.removeChild(domElem);
      }
      renderer.dispose();
    };
  }, []);

  // Update theme colors when theme prop changes
  useEffect(() => {
    const { pointsMesh, atmosphereMesh, arcsGroup, cityPins, ringsGroup } = stateRef.current;
    if (!pointsMesh) return;

    const colorsAttr = pointsMesh.geometry.getAttribute('color');
    const alphasAttr = pointsMesh.geometry.getAttribute('alpha');
    const isLandArray = stateRef.current.isLandArray;

    for (let i = 0; i < isLandArray.length; i++) {
      const isLand = isLandArray[i];
      if (isLand) {
        colorsAttr.setXYZ(i, currentTheme.land.r, currentTheme.land.g, currentTheme.land.b);
        alphasAttr.setX(i, 1.0);
      } else {
        colorsAttr.setXYZ(i, currentTheme.ocean.r, currentTheme.ocean.g, currentTheme.ocean.b);
        alphasAttr.setX(i, showOceanDots ? oceanOpacity : 0.0);
      }
    }
    colorsAttr.needsUpdate = true;
    alphasAttr.needsUpdate = true;

    if (atmosphereMesh) {
      atmosphereMesh.material.uniforms.glowColor.value = currentTheme.atmosphere;
    }

    if (cityPins) {
      cityPins.forEach((p) => {
        p.pinMesh.material.color = currentTheme.city;
        p.ringMesh.material.color = currentTheme.activeCity;
      });
    }
  }, [theme, showOceanDots, oceanOpacity]);

  // Update dot size
  useEffect(() => {
    if (stateRef.current.pointsMesh) {
      stateRef.current.pointsMesh.material.size = dotSize;
    }
  }, [dotSize]);

  // Update visibility toggles
  useEffect(() => {
    if (stateRef.current.atmosphereMesh) {
      stateRef.current.atmosphereMesh.visible = showAtmosphere;
    }
    if (stateRef.current.arcsGroup) {
      stateRef.current.arcsGroup.visible = showArcs;
    }
    if (stateRef.current.ringsGroup) {
      stateRef.current.ringsGroup.visible = showRings;
    }
  }, [showAtmosphere, showArcs, showRings]);

  // Smoothly rotate globe towards selected city
  useEffect(() => {
    if (!selectedCity || !stateRef.current.globeGroup) return;

    const globe = stateRef.current.globeGroup;
    stateRef.current.startQuat.copy(globe.quaternion);

    // Compute target rotation quaternion so city faces camera (0, 0, 1)
    const phi = (90 - selectedCity.lat) * (Math.PI / 180);
    const theta = (selectedCity.lon + 180) * (Math.PI / 180);

    const targetEuler = new THREE.Euler(
      phi - Math.PI / 2,
      -theta + Math.PI / 2,
      0,
      'YXZ'
    );
    stateRef.current.targetQuat.setFromEuler(targetEuler);

    stateRef.current.animatingToCity = true;
    stateRef.current.animStartTime = performance.now();
  }, [selectedCity]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        cursor: 'grab',
      }}
    />
  );
}
