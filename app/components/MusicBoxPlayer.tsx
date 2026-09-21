'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function MusicBoxPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const stepRef = useRef(0);

  // Sweet gentle melody inspired by gentle music box / romantic ballad
  // Frequencies in Hz: G4, B4, D5, E5, G5, A5, etc.
  const melody = [
    392.00, // G4
    440.00, // A4
    493.88, // B4
    587.33, // D5
    659.25, // E5
    587.33, // D5
    493.88, // B4
    440.00, // A4
    392.00, // G4
    329.63, // E4
    392.00, // G4
    587.33, // D5
    523.25, // C5
    493.88, // B4
    440.00, // A4
    392.00, // G4
  ];

  const playChime = (freq: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Warm music box bell tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle second harmonic for bell richness
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);
    gain2.gain.setValueAtTime(0.08, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    // Envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(ctx.destination);
    gain2.connect(ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 2.0);
    osc2.stop(now + 2.0);
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);
      stepRef.current = 0;
      playChime(melody[0]);

      timerRef.current = setInterval(() => {
        stepRef.current = (stepRef.current + 1) % melody.length;
        playChime(melody[stepRef.current]);
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={togglePlay}
      className={`group flex items-center gap-2 px-4 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all backdrop-blur-md shadow-lg ${
        isPlaying
          ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 shadow-amber-500/20 animate-pulse'
          : 'bg-white/10 text-zinc-300 hover:text-white border-white/15 hover:bg-white/15 hover:border-white/25'
      }`}
      title={isPlaying ? 'Pausar música ambiental' : 'Reproducir melodía de caja de música'}
    >
      <span className="text-base">{isPlaying ? '🎵' : '🔇'}</span>
      <span>{isPlaying ? 'Música activa' : 'Melodía suave'}</span>
      {isPlaying && (
        <span className="flex gap-0.5 items-end h-3 ml-1">
          <span className="w-0.5 h-3 bg-amber-400 rounded-full animate-bounce" />
          <span className="w-0.5 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
          <span className="w-0.5 h-3.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]" />
        </span>
      )}
    </button>
  );
}
