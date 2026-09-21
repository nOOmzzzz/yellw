'use client';

import { useState, useEffect, useRef } from 'react';

export function useParallax(maxTiltDeg = 4) {
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, bgX: 0, bgY: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animId: number;

    const handlePointerMove = (e: PointerEvent) => {
      // Normalize from -1 to 1 based on screen center
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRef.current = { x: normX, y: normY };
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-to-right [-90, 90]
        // beta: front-to-back [-180, 180]
        const normX = Math.max(-1, Math.min(1, e.gamma / 30));
        const normY = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
        targetRef.current = { x: normX, y: normY };
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    // Smooth Lerp loop for silky spring physics
    const update = () => {
      const factor = 0.065; // silky dampening
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * factor;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * factor;

      const rotY = Number((currentRef.current.x * maxTiltDeg).toFixed(2));
      const rotX = Number((-currentRef.current.y * maxTiltDeg).toFixed(2));
      const bgX = Number((currentRef.current.x * 12).toFixed(1));
      const bgY = Number((currentRef.current.y * 12).toFixed(1));

      setTilt({ rotX, rotY, bgX, bgY });
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [maxTiltDeg]);

  const bouquetTiltStyle = {
    transform: `perspective(1100px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
    transformStyle: 'preserve-3d' as const,
    transition: 'transform 0.08s ease-out',
  };

  const backgroundParallaxStyle = {
    transform: `translate3d(${-tilt.bgX}px, ${-tilt.bgY}px, 0)`,
    transition: 'transform 0.1s ease-out',
  };

  return {
    tilt,
    bouquetTiltStyle,
    backgroundParallaxStyle,
  };
}
