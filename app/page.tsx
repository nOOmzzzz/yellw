'use client';

import React, { useState, useEffect } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import FallingPetals from './components/FallingPetals';
import MusicBoxPlayer from './components/MusicBoxPlayer';
import DedicationCard from './components/DedicationCard';
import Bouquet from './components/flowers/Bouquet';
import Sunflower from './components/flowers/Sunflower';
import Narcissus from './components/flowers/Narcissus';
import Daisy from './components/flowers/Daisy';
import { FLOWER_OPTIONS, FlowerType } from './components/types';

export default function Home() {
  const [selectedFlower, setSelectedFlower] = useState<FlowerType>('bouquet');
  const [isBlooming, setIsBlooming] = useState(false);
  const [showDedication, setShowDedication] = useState(false);
  const [showFallingPetals, setShowFallingPetals] = useState(true);
  const [showFireflies, setShowFireflies] = useState(true);
  const [immersiveMode, setImmersiveMode] = useState(false);

  // Trigger blooming animation on initial mount and when flower changes
  useEffect(() => {
    setIsBlooming(false);
    const timer = setTimeout(() => {
      setIsBlooming(true);
    }, 120);
    return () => clearTimeout(timer);
  }, [selectedFlower]);

  const handleSelectFlower = (type: FlowerType) => {
    if (type === selectedFlower) {
      // Re-trigger bloom if clicked again
      setIsBlooming(false);
      setTimeout(() => setIsBlooming(true), 120);
    } else {
      setSelectedFlower(type);
    }
  };

  const handleReplayBloom = () => {
    setIsBlooming(false);
    setTimeout(() => setIsBlooming(true), 120);
  };

  const currentMeta = FLOWER_OPTIONS.find((f) => f.id === selectedFlower)!;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#050813] via-[#091024] to-[#04060e] flex flex-col justify-between">
      {/* Background Starfield and Ambient Glow */}
      <BackgroundEffects
        glowColor={currentMeta.glowColor}
        showFireflies={showFireflies}
      />

      {/* Falling Petals Particle Effect */}
      <FallingPetals active={showFallingPetals} />

      {/* Dedication Card Modal */}
      <DedicationCard
        isOpen={showDedication}
        onClose={() => setShowDedication(false)}
      />

      {/* TOP FLOATING NAV / HEADER */}
      <header
        className={`relative z-20 flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6 transition-all duration-500 ${
          immersiveMode ? 'opacity-0 pointer-events-none -translate-y-6' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">🌻</span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent drop-shadow">
                  Flores Amarillas
                </h1>
                <span className="hidden xs:inline-block rounded-full bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300 tracking-wide">
                  DÍA DE LA PRIMAVERA
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-light flex items-center gap-1.5 mt-0.5">
            <span className="text-amber-300 font-medium">{currentMeta.name}</span>
            <span>•</span>
            <span className="italic text-zinc-400 hidden sm:inline">
              {currentMeta.symbolism}
            </span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <MusicBoxPlayer />

          <button
            onClick={() => setShowDedication(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20 text-xs sm:text-sm font-medium transition backdrop-blur-md shadow-lg shadow-amber-500/10"
            title="Abrir carta de dedicatoria de primavera"
          >
            <span>💌</span>
            <span className="hidden sm:inline">Dedicatoria</span>
          </button>

          <button
            onClick={() => setImmersiveMode(true)}
            className="flex items-center justify-center h-9 w-9 rounded-full border border-white/15 bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20 transition backdrop-blur-md"
            title="Modo pantalla completa inmersiva"
          >
            👁️
          </button>
        </div>
      </header>

      {/* CENTER FLOWER DISPLAY STAGE */}
      <div className="relative flex-1 w-full max-w-2xl mx-auto flex items-end justify-center px-4 pb-2 z-10">
        <div className="w-full h-[65vh] sm:h-[72vh] flex items-end justify-center relative">
          {selectedFlower === 'bouquet' && <Bouquet isBlooming={isBlooming} />}
          {selectedFlower === 'sunflower' && <Sunflower isBlooming={isBlooming} />}
          {selectedFlower === 'narcissus' && <Narcissus isBlooming={isBlooming} />}
          {selectedFlower === 'wildflower' && <Daisy isBlooming={isBlooming} />}
        </div>
      </div>

      {/* BOTTOM CONTROLS & FLOWER SELECTOR */}
      <footer
        className={`relative z-20 w-full max-w-3xl mx-auto p-4 sm:p-6 transition-all duration-500 ${
          immersiveMode ? 'opacity-0 pointer-events-none translate-y-8' : 'opacity-100'
        }`}
      >
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-3 sm:p-4 backdrop-blur-2xl shadow-2xl shadow-black/60 flex flex-col gap-3">
          {/* Flower Selector Pills */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300/90 self-start sm:self-center ml-1">
              Escoge tu flor amarilla:
            </span>

            <div className="grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
              {FLOWER_OPTIONS.map((flower) => {
                const isSelected = selectedFlower === flower.id;
                return (
                  <button
                    key={flower.id}
                    onClick={() => handleSelectFlower(flower.id)}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 text-zinc-950 font-bold shadow-lg shadow-amber-400/30 scale-[1.02]'
                        : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <span className="text-base">{flower.icon}</span>
                    <span>{flower.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <button
                onClick={handleReplayBloom}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition border border-white/5"
                title="Volver a reproducir la animación de florecimiento"
              >
                <span>↺</span>
                <span>Florecer de nuevo</span>
              </button>

              <button
                onClick={() => setShowFallingPetals(!showFallingPetals)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition border ${
                  showFallingPetals
                    ? 'bg-amber-400/15 border-amber-400/30 text-amber-300'
                    : 'bg-white/5 border-white/5 text-zinc-400 hover:text-zinc-200'
                }`}
                title="Activar/desactivar lluvia de pétalos"
              >
                <span>🍃</span>
                <span>Pétalos</span>
              </button>

              <button
                onClick={() => setShowFireflies(!showFireflies)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition border ${
                  showFireflies
                    ? 'bg-amber-400/15 border-amber-400/30 text-amber-300'
                    : 'bg-white/5 border-white/5 text-zinc-400 hover:text-zinc-200'
                }`}
                title="Activar/desactivar luciérnagas doradas"
              >
                <span>✨</span>
                <span>Luciérnagas</span>
              </button>
            </div>

            <span className="italic text-[11px] text-amber-200/70 hidden md:inline">
              "{currentMeta.tagline}"
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Exit Button for Immersive Mode */}
      {immersiveMode && (
        <button
          onClick={() => setImmersiveMode(false)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white text-xs font-medium backdrop-blur-xl shadow-2xl transition animate-fadeIn"
        >
          <span>✕</span>
          <span>Mostrar Controles</span>
        </button>
      )}
    </main>
  );
}
