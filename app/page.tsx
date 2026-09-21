'use client';

import React, { useState } from 'react';
import {
  Flower2,
  Flower,
  Sun,
  Sparkles,
  Mail,
  Maximize2,
  Minimize2,
  RotateCcw,
  Wind,
} from 'lucide-react';
import BackgroundEffects from './components/BackgroundEffects';
import FallingPetals from './components/FallingPetals';
import MusicBoxPlayer from './components/MusicBoxPlayer';
import DedicationCard from './components/DedicationCard';
import GoldenSeed from './components/GoldenSeed';
import Bouquet from './components/flowers/Bouquet';
import BouquetTulips from './components/flowers/BouquetTulips';
import BouquetSunflowers from './components/flowers/BouquetSunflowers';
import BouquetWildflowers from './components/flowers/BouquetWildflowers';
import { FLOWER_OPTIONS, BUILD_STEPS, FlowerType } from './components/types';

export default function Home() {
  const [selectedFlower, setSelectedFlower] = useState<FlowerType>('bouquet');
  const [isTransitioningFlower, setIsTransitioningFlower] = useState(false);
  // step: 0 = Seed, 1 = Stems, 2 = Foliage, 3 = Wrap/Ribbon, 4 = Flower placement, 5 = Full Bloom
  const [step, setStep] = useState<number>(0);
  const [renderKey, setRenderKey] = useState<number>(0);

  const [showDedication, setShowDedication] = useState(false);
  const [showFallingPetals, setShowFallingPetals] = useState(true);
  const [showFireflies, setShowFireflies] = useState(true);
  const [immersiveMode, setImmersiveMode] = useState(false);

  const currentMeta = FLOWER_OPTIONS.find((f) => f.id === selectedFlower)!;
  const currentStepInfo = BUILD_STEPS[step] || BUILD_STEPS[0];

  // Advance growth step on click
  const handleNextStep = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    }
  };

  // Switch flower with soft-dissolve and bloom transition
  const handleSelectFlower = (type: FlowerType) => {
    if (type === selectedFlower || isTransitioningFlower) return;
    setIsTransitioningFlower(true);
    setTimeout(() => {
      setSelectedFlower(type);
      setRenderKey((prev) => prev + 1);
      setIsTransitioningFlower(false);
    }, 260);
  };

  // Reset to seed stage to re-build from the yellow dot
  const handleResetToSeed = () => {
    setStep(0);
    setRenderKey((prev) => prev + 1);
  };

  // Instant full bloom
  const handleInstantBloom = () => {
    setStep(5);
    setRenderKey((prev) => prev + 1);
  };

  const getFlowerIcon = (id: FlowerType) => {
    switch (id) {
      case 'bouquet':
        return <Flower2 className="w-3.5 h-3.5" />;
      case 'tulips':
        return <Flower className="w-3.5 h-3.5" />;
      case 'sunflower':
        return <Sun className="w-3.5 h-3.5" />;
      case 'wildflower':
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#060810] flex flex-col justify-between select-none">
      {/* Background Starfield and Ambient Glow */}
      <BackgroundEffects
        glowColor={currentMeta.glowColor}
        showFireflies={showFireflies}
      />

      {/* Falling Petals Particle Effect (active on step 4 & 5) */}
      <FallingPetals active={showFallingPetals && step >= 4} />

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
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400/[0.08] border border-amber-400/20 text-amber-300 shadow-sm">
            <Flower2 className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2.5">
              <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-amber-50">
                Flores Amarillas
              </h1>
              <span className="hidden sm:inline-block text-[10px] tracking-widest uppercase font-medium text-amber-300/60 border-l border-white/10 pl-2.5">
                21 de Septiembre
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-light mt-0.5 flex items-center gap-1.5">
              <span className="text-amber-200/90 font-medium">{currentMeta.name}</span>
              <span className="text-zinc-600">•</span>
              <span className="italic text-zinc-500 hidden sm:inline">
                {currentMeta.tagline}
              </span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <MusicBoxPlayer />

          <button
            onClick={() => setShowDedication(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 text-xs font-medium transition backdrop-blur-md"
            title="Abrir carta de dedicatoria de primavera"
          >
            <Mail className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Dedicatoria</span>
          </button>

          <button
            onClick={() => setImmersiveMode(true)}
            className="flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition backdrop-blur-md"
            title="Modo pantalla completa inmersiva"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* CENTER STAGE: GOLDEN SEED OR GROWING BOUQUET */}
      <div className="relative flex-1 w-full max-w-2xl mx-auto flex items-center justify-center px-4 pb-2 z-10">
        {step === 0 ? (
          /* Step 0: The glowing yellow point / Golden Seed */
          <div className="w-full flex items-center justify-center py-8">
            <GoldenSeed
              step={step}
              flowerName={currentMeta.name}
              onClick={handleNextStep}
            />
          </div>
        ) : (
          /* Step 1 to 5: The Interactive Bouquet Being Built */
          <div
            onClick={step < 5 ? handleNextStep : undefined}
            className={`w-full h-[65vh] sm:h-[72vh] flex items-end justify-center relative animate-fadeIn ${
              step < 5 ? 'cursor-pointer group' : ''
            }`}
            title={step < 5 ? 'Haz click para continuar armando tu ramo' : 'Ramo completo'}
          >
            {/* Step Helper Badge on top */}
            {step < 5 ? (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full bg-[#0c101a]/90 border border-amber-400/25 text-xs text-amber-200/90 font-medium backdrop-blur-md shadow-lg flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Paso {step} de 5:</span>
                <span className="text-zinc-200 font-semibold">{currentStepInfo.title}</span>
                <span className="text-zinc-500 text-[11px] hidden sm:inline">• Toca para avanzar</span>
              </div>
            ) : (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-[#0c101a]/90 border border-amber-400/30 text-xs font-serif italic text-amber-100 backdrop-blur-md shadow-lg flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Ramo en plenitud para ti</span>
              </div>
            )}

            {/* Individual Keyed Flower Component with soft cross-dissolve & entrance animation */}
            <div
              key={`${selectedFlower}-${renderKey}`}
              className={`w-full h-full flex items-end justify-center transition-all duration-300 ${
                isTransitioningFlower
                  ? 'scale-95 opacity-0 blur-[3px] pointer-events-none'
                  : 'animate-flower-entrance'
              }`}
            >
              {selectedFlower === 'bouquet' && <Bouquet step={step} />}
              {selectedFlower === 'tulips' && <BouquetTulips step={step} />}
              {selectedFlower === 'sunflower' && <BouquetSunflowers step={step} />}
              {selectedFlower === 'wildflower' && <BouquetWildflowers step={step} />}
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM CONTROLS & BOUQUET SELECTOR */}
      <footer
        className={`relative z-20 w-full max-w-2xl mx-auto p-4 sm:p-6 transition-all duration-500 ${
          immersiveMode ? 'opacity-0 pointer-events-none translate-y-8' : 'opacity-100'
        }`}
      >
        <div className="rounded-2xl border border-white/[0.08] bg-[#0c101a]/85 p-3 backdrop-blur-xl shadow-2xl shadow-black/80 flex flex-col gap-2.5">
          {/* Flower Selector Segmented Control */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {FLOWER_OPTIONS.map((flower) => {
              const isSelected = selectedFlower === flower.id;
              return (
                <button
                  key={flower.id}
                  onClick={() => handleSelectFlower(flower.id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs transition-all ${
                    isSelected
                      ? 'bg-amber-400/15 border border-amber-400/40 text-amber-200 font-medium shadow-sm'
                      : 'bg-white/[0.02] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] border border-transparent'
                  }`}
                >
                  <span className={isSelected ? 'text-amber-300' : 'text-zinc-500'}>
                    {getFlowerIcon(flower.id)}
                  </span>
                  <span>{flower.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Secondary Utility Controls */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.06] text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              {/* Reset to Seed / Build again */}
              <button
                onClick={handleResetToSeed}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/5 transition"
                title="Volver a la semilla para armar tu ramo paso a paso"
              >
                <RotateCcw className="w-3 h-3 text-amber-300/80" />
                <span>Armar de nuevo</span>
              </button>

              {/* Instant Bloom */}
              {step < 5 && (
                <button
                  onClick={handleInstantBloom}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/20 transition"
                  title="Ver ramo completo florecido de inmediato"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Florecer</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowFallingPetals(!showFallingPetals)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition border ${
                  showFallingPetals
                    ? 'bg-amber-400/10 border-amber-400/25 text-amber-300'
                    : 'bg-white/[0.02] border-white/5 text-zinc-500 hover:text-zinc-300'
                }`}
                title="Activar/desactivar lluvia de pétalos"
              >
                <Wind className="w-3 h-3" />
                <span className="hidden sm:inline">Pétalos</span>
              </button>

              <button
                onClick={() => setShowFireflies(!showFireflies)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition border ${
                  showFireflies
                    ? 'bg-amber-400/10 border-amber-400/25 text-amber-300'
                    : 'bg-white/[0.02] border-white/5 text-zinc-500 hover:text-zinc-300'
                }`}
                title="Activar/desactivar estrellas y luciérnagas"
              >
                <Sparkles className="w-3 h-3" />
                <span className="hidden sm:inline">Luces</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Exit Button for Immersive Mode */}
      {immersiveMode && (
        <button
          onClick={() => setImmersiveMode(false)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0c101a]/90 hover:bg-[#0c101a] border border-white/20 text-zinc-200 hover:text-white text-xs font-medium backdrop-blur-xl shadow-2xl transition animate-fadeIn"
        >
          <Minimize2 className="w-3.5 h-3.5 text-amber-300" />
          <span>Restaurar Controles</span>
        </button>
      )}
    </main>
  );
}
