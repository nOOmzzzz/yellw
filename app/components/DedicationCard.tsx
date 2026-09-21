'use client';

import React, { useState } from 'react';

const DEDICATION_PRESETS = [
  {
    title: 'Día de la Primavera (21 de Septiembre)',
    text: '¡Feliz Día de la Primavera! Te regalo estas flores amarillas para que llenen tus días de luz, alegría y momentos inolvidables. 🌻💛✨',
  },
  {
    title: 'Flores Amarillas (Floricienta)',
    text: 'Ella sabía que él sabía, que algún día pasaría, que vendría a buscarla con sus flores amarillas... 💛✨',
  },
  {
    title: 'Amor & Gratitud',
    text: 'Que esta flor amarilla ilumine tus días, recordándote lo especial, hermosa y única que eres para mí.',
  },
  {
    title: 'Amistad Radiante',
    text: 'Un ramillete dorado para celebrar nuestra complicidad, las risas compartidas y la dicha de tenerte en mi vida.',
  },
];

export default function DedicationCard({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [recipient, setRecipient] = useState('Para alguien especial');
  const [message, setMessage] = useState(
    'Ella sabía que él sabía, que algún día pasaría, que vendría a buscarla con sus flores amarillas... 💛✨'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const fullText = `${recipient}\n\n"${message}"\n\n— Te regalo esta flor amarilla 🌻`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-b from-zinc-900/90 via-zinc-950/95 to-black/95 p-6 sm:p-8 text-white shadow-2xl shadow-amber-500/15 backdrop-blur-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner glows */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-amber-500/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-yellow-500/20 blur-2xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-white transition"
          title="Cerrar dedicatoria"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/20 border border-amber-400/40 text-2xl shadow-inner shadow-amber-300/30">
            💌
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-amber-200">
              Carta de Dedicatoria
            </h3>
            <p className="text-xs text-zinc-400">
              Personaliza el mensaje que acompaña tu flor amarilla
            </p>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="space-y-4">
          {isEditing ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1">
                  Destinatario:
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  placeholder="Ej: Para mi persona favorita..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1">
                  Mensaje especial:
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none"
                  placeholder="Escribe lo que sientes..."
                />
              </div>

              {/* Presets */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  Inspiraciones rápidas:
                </label>
                <div className="flex flex-wrap gap-2">
                  {DEDICATION_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMessage(preset.text)}
                      className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-xs text-amber-300 hover:bg-amber-400/20 transition"
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Styled Romantic Note View */
            <div className="relative rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-500/10 via-amber-900/10 to-yellow-500/5 p-5 text-center shadow-inner">
              <div className="text-sm font-semibold tracking-wide text-amber-300 uppercase mb-2">
                {recipient}
              </div>
              <p className="font-serif italic text-lg sm:text-xl text-amber-100/95 leading-relaxed drop-shadow">
                “{message}”
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-amber-400/75">
                <span>💛</span>
                <span>Florece con todo mi cariño</span>
                <span>✨</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs sm:text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition"
          >
            <span>{isEditing ? '✓ Listo' : '✏️ Editar mensaje'}</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl border border-amber-400/30 bg-amber-400/15 px-4 py-2 text-xs sm:text-sm font-medium text-amber-300 hover:bg-amber-400/25 transition shadow-sm shadow-amber-500/20"
            >
              <span>{copied ? '✓ Copiado' : '📋 Copiar texto'}</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-xl bg-amber-400 px-5 py-2 text-xs sm:text-sm font-semibold text-zinc-950 hover:bg-amber-300 transition shadow-lg shadow-amber-400/25"
            >
              Ver la flor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
