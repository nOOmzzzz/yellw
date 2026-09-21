'use client';

import React, { useMemo } from 'react';

interface Petal {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
  color: string;
  rotation: number;
}

export default function FallingPetals({ active = true }: { active?: boolean }) {
  const petals = useMemo<Petal[]>(() => {
    const list: Petal[] = [];
    const colors = [
      'rgba(254, 240, 138, 0.85)', // yellow-200
      'rgba(253, 224, 71, 0.85)',  // yellow-300
      'rgba(250, 204, 21, 0.85)',  // yellow-400
      'rgba(245, 158, 11, 0.80)',  // amber-500
    ];

    for (let i = 0; i < 22; i++) {
      const left = ((i * 4.5 + (Math.sin(i * 3) * 15) + 50) % 100).toFixed(2);
      const size = (12 + Math.abs(Math.sin(i * 11)) * 14).toFixed(1);
      const duration = (7 + Math.abs(Math.cos(i * 7)) * 6).toFixed(1);
      const delay = (Math.abs(Math.sin(i * 13)) * 8).toFixed(1);
      const swayDuration = (3 + Math.abs(Math.sin(i * 5)) * 2).toFixed(1);
      const color = colors[i % colors.length];
      const rotation = Math.round(Math.sin(i) * 45);

      list.push({
        id: i,
        left: `${left}%`,
        size: parseFloat(size),
        duration: parseFloat(duration),
        delay: parseFloat(delay),
        swayDuration: parseFloat(swayDuration),
        color,
        rotation,
      });
    }
    return list;
  }, []);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-10">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute -top-12"
          style={{
            left: p.left,
            animation: `fallPetal ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          <div
            style={{
              width: `${p.size}px`,
              height: `${p.size * 1.5}px`,
              background: `radial-gradient(ellipse at 30% 20%, #fff 0%, ${p.color} 70%, #d97706 100%)`,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              boxShadow: '0 2px 8px rgba(234, 179, 8, 0.35)',
              transform: `rotate(${p.rotation}deg)`,
              animation: `swayPetal ${p.swayDuration}s ease-in-out infinite alternate`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
