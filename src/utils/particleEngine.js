import * as THREE from 'three';

// Spring constants fitted to the reference clip (particle-motion-video skill):
// zeta 0.66 damping -> ~6% overshoot on every throw, settle in ~0.5s.
const ZETA = 0.66;
const STIFFNESS = 160;
const DAMPING = 2 * ZETA * Math.sqrt(STIFFNESS);

const GA = Math.PI * (3 - Math.sqrt(5));

const TBL_BITS = 10;
const TBL_SIZE = 1 << TBL_BITS;
const TBL_MASK = TBL_SIZE - 1;
const SIN_TABLE = new Float32Array(TBL_SIZE);
for (let i = 0; i < TBL_SIZE; i++) {
  SIN_TABLE[i] = Math.sin((i / TBL_SIZE) * Math.PI * 2);
}

export function makeGlowTexture(size = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,0.5)');
  g.addColorStop(0.32, 'rgba(255,255,255,0.14)');
  g.addColorStop(0.68, 'rgba(255,255,255,0.035)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

// Evenly distributed points on a sphere (golden-angle spiral).
export function fibonacciSphere(count, radius, { squashY = 1 } = {}) {
  const out = new Float32Array(count * 3);
  const denom = count > 1 ? count - 1 : 1;
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / denom) * 2;
    const rY = Math.sqrt(Math.max(0, 1 - y * y));
    const th = GA * i;
    out[i * 3] = Math.cos(th) * rY * radius;
    out[i * 3 + 1] = y * radius * squashY;
    out[i * 3 + 2] = Math.sin(th) * rY * radius;
  }
  return out;
}

/**
 * A cloud of dust where every particle is its own damped spring chasing a target.
 * Bodies lead, particles lag, overshoot, spray and settle — the motion grammar
 * from the particle-motion-video skill, running live in Three.js.
 */
export class ParticleBody {
  constructor({
    count,
    targets,
    colors,
    texture,
    radius = 1,
    size = 1.2,
    opacity = 0.9,
    sizeAttenuation = true,
    blending = THREE.AdditiveBlending,
  }) {
    this.count = count;
    this.radius = radius;
    this.pos = new Float32Array(count * 3);
    this.vel = new Float32Array(count * 3);
    this.target = new Float32Array(count * 3);
    this.target.set(targets);

    this.baseColor = new Float32Array(count * 3);
    this.colorBuf = new Float32Array(count * 3);
    if (colors) this.baseColor.set(colors);
    else this.baseColor.fill(1);
    this.colorBuf.set(this.baseColor);

    this.delay = new Float32Array(count);
    this.phase = new Uint16Array(count);
    this.mask = new Uint8Array(count).fill(1);
    this.glow = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      this.phase[i] = (Math.random() * TBL_SIZE) | 0;
      this.pos[i * 3] = this.target[i * 3];
      this.pos[i * 3 + 1] = this.target[i * 3 + 1];
      this.pos[i * 3 + 2] = this.target[i * 3 + 2];
    }

    this.geometry = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(this.pos, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    const colAttr = new THREE.BufferAttribute(this.colorBuf, 3);
    colAttr.setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute('position', posAttr);
    this.geometry.setAttribute('color', colAttr);

    this.material = new THREE.PointsMaterial({
      size,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity,
      blending,
      depthWrite: false,
      sizeAttenuation,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.cursor = new THREE.Vector3();
    this.cursorRadius = 1;
    this.cursorPower = 0;
    this.cursorActive = false;
    this.time = Math.random() * 8;
    this.morphing = false;
    this.morphElapsed = 0;
    this.morphDuration = 0;
  }

  _assignPeel(seconds) {
    const { count, target, delay } = this;
    let minX = Infinity;
    let maxX = -Infinity;
    for (let i = 0; i < count; i++) {
      const x = target[i * 3];
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
    const span = maxX - minX || 1;
    for (let i = 0; i < count; i++) {
      delay[i] = ((target[i * 3] - minX) / span) * seconds + Math.random() * 0.14;
    }
  }

  setTargets(targets, { peelSeconds = 0.6 } = {}) {
    this.target.set(targets);
    this._assignPeel(peelSeconds);
    this.morphElapsed = 0;
    this.morphDuration = peelSeconds + 0.9;
    this.morphing = true;
  }

  setColors(colors, { instant = false } = {}) {
    this.baseColor.set(colors);
    if (instant || !this.morphing) {
      this.colorBuf.set(this.baseColor);
      this.geometry.attributes.color.needsUpdate = true;
    }
  }

  // Local-space point the dust should scatter away from (null clears it).
  setCursor(point, radius, power = 0) {
    if (!point) {
      this.cursorActive = false;
      return;
    }
    this.cursor.copy(point);
    this.cursorRadius = radius;
    this.cursorPower = power;
    this.cursorActive = true;
  }

  setMask(mask) {
    this.mask.set(mask);
    // Park newly hidden particles on their target so none are left frozen mid-flight.
    for (let i = 0; i < this.count; i++) {
      if (this.mask[i] !== 0) continue;
      const i3 = i * 3;
      this.pos[i3] = this.target[i3];
      this.pos[i3 + 1] = this.target[i3 + 1];
      this.pos[i3 + 2] = this.target[i3 + 2];
      this.vel[i3] = 0;
      this.vel[i3 + 1] = 0;
      this.vel[i3 + 2] = 0;
    }
    this.geometry.attributes.position.needsUpdate = true;
  }

  // Throw the dust out of its shape so it springs back with smear + overshoot.
  rematerialize(strength = 1) {
    const { count, target, pos, vel, mask } = this;
    const reach = (this.radius || 1) * strength;

    for (let i = 0; i < count; i++) {
      if (mask[i] === 0) continue;
      const i3 = i * 3;
      const tx = target[i3];
      const ty = target[i3 + 1];
      const tz = target[i3 + 2];
      const len = Math.hypot(tx, ty, tz) || 1;
      const nx = tx / len;
      const ny = ty / len;
      const nz = tz / len;
      // Push scales with each particle's own distance, so ring dust sprays
      // proportionally instead of flying past the camera.
      const push = (len * 0.3 + reach * 0.2) * (0.4 + Math.random() * 0.8);
      const jitter = push * 0.55;
      const kick = push * 2;

      pos[i3] = tx + nx * push + (Math.random() - 0.5) * jitter;
      pos[i3 + 1] = ty + ny * push + (Math.random() - 0.5) * jitter;
      pos[i3 + 2] = tz + nz * push + (Math.random() - 0.5) * jitter;

      vel[i3] = nx * kick + (Math.random() - 0.5) * kick * 0.5;
      vel[i3 + 1] = ny * kick + (Math.random() - 0.5) * kick * 0.5;
      vel[i3 + 2] = nz * kick + (Math.random() - 0.5) * kick * 0.5;
    }

    this._assignPeel(0.45);
    this.morphElapsed = 0;
    this.morphDuration = 1.35;
    this.morphing = true;
  }

  update(dt) {
    if (!(dt > 0)) return;
    this.time += dt;

    const { count, pos, vel, target, delay, phase, mask, baseColor, colorBuf } = this;
    const k = STIFFNESS;
    const c = DAMPING;

    if (this.morphing) {
      this.morphElapsed += dt;
      if (this.morphElapsed >= this.morphDuration) {
        this.morphing = false;
        colorBuf.set(baseColor);
        this.geometry.attributes.color.needsUpdate = true;
      }
    }

    const morphing = this.morphing;
    const me = this.morphElapsed;
    const baseIdx = ((this.time * 90) | 0) & TBL_MASK;
    let colorDirty = false;

    const glow = this.glow;
    const glowDecay = Math.pow(0.02, dt);
    const cursorOn = this.cursorActive && this.cursorPower > 0;
    const cx = this.cursor.x;
    const cy = this.cursor.y;
    const cz = this.cursor.z;
    const cr = this.cursorRadius;
    const cr2 = cr * cr;
    const cPower = this.cursorPower;

    for (let i = 0; i < count; i++) {
      if (mask[i] === 0) continue;
      const i3 = i * 3;

      const breathe = 1 + 0.007 * SIN_TABLE[(baseIdx + phase[i]) & TBL_MASK];
      const tx = target[i3] * breathe;
      const ty = target[i3 + 1] * breathe;
      const tz = target[i3 + 2] * breathe;

      if (!morphing || me >= delay[i]) {
        vel[i3] += ((tx - pos[i3]) * k - vel[i3] * c) * dt;
        vel[i3 + 1] += ((ty - pos[i3 + 1]) * k - vel[i3 + 1] * c) * dt;
        vel[i3 + 2] += ((tz - pos[i3 + 2]) * k - vel[i3 + 2] * c) * dt;
      } else {
        vel[i3] *= 0.96;
        vel[i3 + 1] *= 0.96;
        vel[i3 + 2] *= 0.96;
      }

      pos[i3] += vel[i3] * dt;
      pos[i3 + 1] += vel[i3 + 1] * dt;
      pos[i3 + 2] += vel[i3 + 2] * dt;

      if (cursorOn) {
        const dx = pos[i3] - cx;
        const dy = pos[i3 + 1] - cy;
        const dz = pos[i3 + 2] - cz;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < cr2) {
          const d = Math.sqrt(d2) || 0.0001;
          const falloff = 1 - d / cr;
          const g = (falloff * falloff * cPower * dt) / d;
          vel[i3] += dx * g;
          vel[i3 + 1] += dy * g;
          vel[i3 + 2] += dz * g;
          glow[i] = 1;
        }
      }

      const spark = glow[i];
      if (spark > 0.002) {
        const next = spark * glowDecay;
        glow[i] = next;
        const tint = 1 + next * 1.8;
        colorBuf[i3] = baseColor[i3] * tint;
        colorBuf[i3 + 1] = baseColor[i3 + 1] * tint;
        colorBuf[i3 + 2] = baseColor[i3 + 2] * tint;
        colorDirty = true;
      }

      if (morphing) {
        let lit = (me - delay[i]) / 0.45;
        if (lit < 0) lit = 0;
        else if (lit > 1) lit = 1;
        lit = lit * lit * (3 - 2 * lit);
        const f = 0.16 + 0.84 * lit;
        colorBuf[i3] = baseColor[i3] * f;
        colorBuf[i3 + 1] = baseColor[i3 + 1] * f;
        colorBuf[i3 + 2] = baseColor[i3 + 2] * f;
        colorDirty = true;
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
    if (colorDirty) this.geometry.attributes.color.needsUpdate = true;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
