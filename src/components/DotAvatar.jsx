import React, { useEffect, useRef } from 'react';

export default function DotAvatar({ imageSrc, size = 96, gridSize = 28 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Initial procedural fallback dots
    const drawFallback = () => {
      ctx.clearRect(0, 0, size, size);
      const step = size / gridSize;
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          const dx = x - gridSize / 2;
          const dy = y - gridSize / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < gridSize * 0.45) {
            ctx.fillStyle = dist < gridSize * 0.25 ? '#ffffff' : '#777777';
            ctx.beginPath();
            ctx.arc((x + 0.5) * step, (y + 0.5) * step, step * 0.32, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    drawFallback();

    if (!imageSrc) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      // Offscreen canvas to downsample
      const off = document.createElement('canvas');
      off.width = gridSize;
      off.height = gridSize;
      const offCtx = off.getContext('2d');
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, gridSize, gridSize);
      const imgData = offCtx.getImageData(0, 0, gridSize, gridSize).data;

      ctx.clearRect(0, 0, size, size);

      // Background subtle dark tone
      ctx.fillStyle = '#060608';
      ctx.fillRect(0, 0, size, size);

      const step = size / gridSize;

      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const idx = (y * gridSize + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          // Grayscale luminance
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          const cx = (x + 0.5) * step;
          const cy = (y + 0.5) * step;

          if (lum > 25) {
            // High contrast dot matrix
            const radius = (lum / 255) * (step * 0.44) + 0.4;
            const alpha = Math.min(1, Math.max(0.15, (lum / 255) * 1.1));

            if (lum > 170) {
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            } else if (lum > 100) {
              ctx.fillStyle = `rgba(180, 180, 180, ${alpha})`;
            } else {
              ctx.fillStyle = `rgba(90, 90, 90, ${alpha})`;
            }

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };
  }, [imageSrc, size, gridSize]);

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #222',
        background: '#040406',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: size,
          height: size,
          display: 'block',
        }}
      />
      {/* Subtle corner tech marks */}
      <div
        style={{
          position: 'absolute',
          bottom: 4,
          right: 6,
          fontSize: 8,
          color: '#555',
          fontFamily: 'monospace',
          letterSpacing: '0.05em',
          pointerEvents: 'none',
        }}
      >
        DOT // PP
      </div>
    </div>
  );
}
