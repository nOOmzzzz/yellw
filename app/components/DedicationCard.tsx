'use client';

import React, { useState } from 'react';
import { Mail, X, Check, Copy, Edit3, Sparkles } from 'lucide-react';

const DEDICATION_PRESETS = [
  {
    title: '21 de Septiembre • Primavera',
    text: 'Un detalle de flores amarillas para recibir esta primavera. Que este nuevo ciclo llegue cargado de luz, sonrisas y momentos muy felices para ti.',
  },
  {
    title: 'Alegría & Buenos Deseos',
    text: 'Que la calidez y vitalidad de estas flores amarillas iluminen tus días, recordándote lo valiosa que es tu energía y todo lo bueno que mereces.',
  },
  {
    title: 'Buenas Vibras & Gratitud',
    text: 'Para desearte una temporada radiante. Gracias por compartir siempre tu buena vibra, tu autenticidad y alegría en cada momento.',
  },
];

export default function DedicationCard({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [recipient, setRecipient] = useState('Para ti');
  const [message, setMessage] = useState(
    'Un detalle de flores amarillas para recibir esta primavera. Que este nuevo ciclo llegue cargado de luz, sonrisas y momentos muy felices para ti.'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const fullText = `${recipient}\n\n"${message}"\n\n- Feliz 21 de Septiembre`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c101a] p-6 sm:p-8 text-white shadow-2xl shadow-black/80 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle warm corner ambient */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-amber-500/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-yellow-500/10 blur-2xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08] hover:text-white transition border border-white/5"
          title="Cerrar dedicatoria"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400/10 border border-amber-400/25 text-amber-300">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-normal tracking-wide text-amber-50">
              Carta de Dedicatoria
            </h3>
            <p className="text-xs text-zinc-400 font-light mt-0.5">
              Personaliza el mensaje que acompaña tu ramo de primavera
            </p>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="space-y-4">
          {isEditing ? (
            <div className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-amber-200/70 mb-1.5">
                  Destinatario
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400/60 focus:outline-none transition"
                  placeholder="Ej: Para alguien especial..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-amber-200/70 mb-1.5">
                  Mensaje especial
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400/60 focus:outline-none resize-none transition leading-relaxed"
                  placeholder="Escribe lo que sientes..."
                />
              </div>

              {/* Presets */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-2">
                  Mensajes de primavera sugeridos
                </label>
                <div className="flex flex-col gap-1.5">
                  {DEDICATION_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMessage(preset.text)}
                      className="text-left rounded-xl border border-white/5 bg-white/[0.02] hover:bg-amber-400/10 hover:border-amber-400/20 px-3 py-2 text-xs text-zinc-300 hover:text-amber-200 transition"
                    >
                      <span className="font-medium text-amber-300/90 block mb-0.5">{preset.title}</span>
                      <span className="text-zinc-400 line-clamp-1 font-light">{preset.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Styled Note View */
            <div className="relative rounded-2xl border border-amber-400/20 bg-gradient-to-b from-amber-400/[0.04] to-transparent p-6 text-center">
              <div className="text-xs font-semibold tracking-widest text-amber-300/80 uppercase mb-3">
                {recipient}
              </div>
              <p className="font-serif italic text-xl sm:text-2xl text-amber-50/95 leading-relaxed">
                “{message}”
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-amber-300/70 font-light">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Que tengas una hermosa primavera</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-zinc-300 hover:bg-white/[0.08] hover:text-white transition"
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-300" />
                <span>Guardar</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-zinc-400" />
                <span>Editar carta</span>
              </>
            )}
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3.5 py-2 text-xs font-medium text-amber-300 hover:bg-amber-400/20 transition shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="rounded-xl bg-amber-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-amber-300 transition shadow-md shadow-amber-500/20"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
