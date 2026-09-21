'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  decay: number;
}

const GOLDEN_COLORS = [
  '#fef08a', // warm yellow 200
  '#fde047', // bright gold 300
  '#facc15', // amber gold 400
  '#fbbf24', // deep amber 400
  '#fffdf5', // starlight pearl
];

export default function StardustTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const maxParticles = 90;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const addParticle = (x: number, y: number) => {
      if (particles.length >= maxParticles) {
        particles.shift();
      }
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.8 + 0.2;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4, // gentle upward float
        size: Math.random() * 2.2 + 1.2,
        alpha: Math.random() * 0.4 + 0.6,
        color: GOLDEN_COLORS[Math.floor(Math.random() * GOLDEN_COLORS.length)],
        decay: Math.random() * 0.018 + 0.012,
      });
    };

    let lastX = 0;
    let lastY = 0;
    let hasMoved = false;

    const handlePointerMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!hasMoved) {
        lastX = x;
        lastY = y;
        hasMoved = true;
        return;
      }

      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist > 6) {
        // Spawn 2 particles with slight interpolation
        addParticle(x, y);
        addParticle((x + lastX) / 2, (y + lastY) / 2);
        lastX = x;
        lastY = y;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Cross starlight flare on larger particles
        if (p.size > 2.5 && p.alpha > 0.4) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 2, p.y);
          ctx.lineTo(p.x + p.size * 2, p.y);
          ctx.moveTo(p.x, p.y - p.size * 2);
          ctx.lineTo(p.x, p.y + p.size * 2);
          ctx.stroke();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ opacity: 0.85 }}
    />
  );
}
