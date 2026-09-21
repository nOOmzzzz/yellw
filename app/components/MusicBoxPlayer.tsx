'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Music, VolumeX } from 'lucide-react';

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
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all backdrop-blur-md ${
        isPlaying
          ? 'bg-amber-400/15 text-amber-300 border-amber-400/40 shadow-sm'
          : 'bg-white/[0.04] text-zinc-400 hover:text-zinc-200 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
      }`}
      title={isPlaying ? 'Pausar melodía' : 'Reproducir melodía'}
    >
      {isPlaying ? (
        <Music className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-300" />
      )}
      <span className="hidden sm:inline">{isPlaying ? 'Melodía activa' : 'Melodía'}</span>
      {isPlaying && (
        <span className="flex gap-0.5 items-end h-2.5 ml-0.5">
          <span className="w-0.5 h-2.5 bg-amber-300 rounded-full animate-bounce" />
          <span className="w-0.5 h-1.5 bg-amber-300 rounded-full animate-bounce [animation-delay:0.2s]" />
          <span className="w-0.5 h-3 bg-amber-300 rounded-full animate-bounce [animation-delay:0.4s]" />
        </span>
      )}
    </button>
  );
}
