'use client';

import React, { useMemo } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

interface Firefly {
  id: number;
  left: string;
  bottom: string;
  size: number;
  duration: number;
  delay: number;
  moveX: number;
  moveY: number;
}

export default function BackgroundEffects({
  glowColor = 'rgba(251, 191, 36, 0.35)',
  showFireflies = true,
}: {
  glowColor?: string;
  showFireflies?: boolean;
}) {
  // Generate deterministic stars
  const stars = useMemo<Star[]>(() => {
    const list: Star[] = [];
    for (let i = 0; i < 90; i++) {
      const top = (Math.sin(i * 997) * 45 + 50).toFixed(2);
      const left = (Math.cos(i * 577) * 48 + 50).toFixed(2);
      const size = (Math.abs(Math.sin(i * 123)) * 2 + 1).toFixed(1);
      const opacity = (Math.abs(Math.cos(i * 456)) * 0.7 + 0.25).toFixed(2);
      const duration = (2 + Math.abs(Math.sin(i * 789)) * 3.5).toFixed(1);
      const delay = (Math.abs(Math.cos(i * 321)) * 4).toFixed(1);
      list.push({
        id: i,
        top: `${top}%`,
        left: `${left}%`,
        size: parseFloat(size),
        opacity: parseFloat(opacity),
        duration: parseFloat(duration),
        delay: parseFloat(delay),
      });
    }
    return list;
  }, []);

  // Generate deterministic fireflies
  const fireflies = useMemo<Firefly[]>(() => {
    const list: Firefly[] = [];
    for (let i = 0; i < 24; i++) {
      const left = (Math.abs(Math.sin(i * 333)) * 90 + 5).toFixed(2);
      const bottom = (Math.abs(Math.cos(i * 444)) * 75 + 10).toFixed(2);
      const size = (Math.abs(Math.sin(i * 555)) * 3 + 3).toFixed(1);
      const duration = (5 + Math.abs(Math.cos(i * 666)) * 4).toFixed(1);
      const delay = (Math.abs(Math.sin(i * 777)) * 3).toFixed(1);
      const moveX = Math.round((Math.sin(i) * 60));
      const moveY = Math.round((-40 - Math.abs(Math.cos(i)) * 60));
      list.push({
        id: i,
        left: `${left}%`,
        bottom: `${bottom}%`,
        size: parseFloat(size),
        duration: parseFloat(duration),
        delay: parseFloat(delay),
        moveX,
        moveY,
      });
    }
    return list;
  }, []);

  return (
    <div
      suppressHydrationWarning
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Deep atmospheric ambient gradients */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[550px] rounded-full blur-[140px] opacity-40 transition-all duration-1000"
        style={{ background: glowColor }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-amber-400/10 blur-[100px]" />

      {/* Stars */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white transition-opacity"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
            boxShadow: s.size > 2 ? '0 0 6px 1px rgba(255, 255, 255, 0.7)' : 'none',
          }}
        />
      ))}

      {/* Floating golden fireflies */}
      {showFireflies &&
        fireflies.map((f) => (
          <div
            key={f.id}
            className="absolute rounded-full bg-yellow-300"
            style={{
              left: f.left,
              bottom: f.bottom,
              width: `${f.size}px`,
              height: `${f.size}px`,
              boxShadow: '0 0 10px 2px rgba(250, 204, 21, 0.85), 0 0 20px 4px rgba(234, 179, 8, 0.4)',
              animation: `fireflyFloat ${f.duration}s ease-in-out ${f.delay}s infinite alternate`,
              transform: `translate(${f.moveX}px, ${f.moveY}px)`,
            }}
          />
        ))}
    </div>
  );
}
