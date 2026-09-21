'use client';

import React from 'react';

export default function Tulip({ isBlooming }: { isBlooming: boolean }) {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center transition-transform duration-700 ${
        isBlooming ? 'animate-sway' : ''
      }`}
    >
      <svg
        viewBox="0 0 500 760"
        className="w-full h-full max-h-[82vh] overflow-visible drop-shadow-2xl"
      >
        <defs>
          {/* Tulip Stem Gradient */}
          <linearGradient id="tulipStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Tulip Leaf Gradient */}
          <linearGradient id="tulipLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="60%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>

          {/* Tulip Petal Gradients */}
          <linearGradient id="tulipBackPetal" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="40%" stopColor="#d97706" />
            <stop offset="85%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <linearGradient id="tulipMidPetal" x1="30%" y1="100%" x2="70%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="45%" stopColor="#eab308" />
            <stop offset="85%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#fef9c3" />
          </linearGradient>

          <linearGradient id="tulipFrontPetal" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="35%" stopColor="#facc15" />
            <stop offset="85%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* --- STEM --- */}
        <g>
          <path
            d="M 250 760 C 248 640, 242 480, 252 340"
            fill="none"
            stroke="url(#tulipStemGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            style={{
              strokeDasharray: 550,
              strokeDashoffset: isBlooming ? 0 : 550,
              transition: 'stroke-dashoffset 2.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
          <path
            d="M 248 760 C 246 640, 240 480, 250 340"
            fill="none"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 550,
              strokeDashoffset: isBlooming ? 0 : 550,
              transition: 'stroke-dashoffset 2.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
        </g>

        {/* --- TULIP LEAVES (LONG, ELEGANT ARCHING) --- */}
        {/* Left tall leaf */}
        <g
          style={{
            transformOrigin: '246px 640px',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-20deg)',
            transition: 'all 1.8s cubic-bezier(0.34, 1.3, 0.64, 1) 0.8s',
          }}
        >
          <path
            d="M 248 640 C 210 570, 150 490, 130 380 C 130 460, 190 560, 248 640 Z"
            fill="url(#tulipLeafGrad)"
            stroke="#166534"
            strokeWidth="1.5"
          />
          <path
            d="M 248 640 C 200 550, 160 470, 132 385"
            fill="none"
            stroke="#bbf7d0"
            strokeWidth="1.5"
            opacity="0.4"
          />
        </g>

        {/* Right arching leaf */}
        <g
          style={{
            transformOrigin: '252px 560px',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(20deg)',
            transition: 'all 1.8s cubic-bezier(0.34, 1.3, 0.64, 1) 1.1s',
          }}
        >
          <path
            d="M 250 560 C 290 480, 360 400, 380 290 C 370 380, 310 490, 250 560 Z"
            fill="url(#tulipLeafGrad)"
            stroke="#166534"
            strokeWidth="1.5"
          />
          <path
            d="M 250 560 C 300 470, 350 390, 378 295"
            fill="none"
            stroke="#bbf7d0"
            strokeWidth="1.5"
            opacity="0.4"
          />
        </g>

        {/* --- TULIP CHALICE FLOWER HEAD --- */}
        <g
          transform="translate(252, 335)"
          style={{
            transformOrigin: '252px 335px',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1)' : 'scale(0.2)',
            transition: 'all 2s cubic-bezier(0.175, 0.885, 0.32, 1.2) 1.3s',
          }}
        >
          {/* Base Calyx / Receptacle */}
          <ellipse cx="0" cy="5" rx="14" ry="7" fill="#15803d" />

          {/* BACK PETAL (Center background) */}
          <path
            d="M 0 0 C -40 -60, -40 -150, 0 -175 C 40 -150, 40 -60, 0 0 Z"
            fill="url(#tulipBackPetal)"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))"
            style={{
              transformOrigin: '0 0',
              transform: isBlooming ? 'scaleY(1)' : 'scaleY(0.4)',
              transition: 'transform 1.6s ease-out 1.5s',
            }}
          />

          {/* LEFT BACK PETAL */}
          <path
            d="M 0 0 C -55 -40, -85 -120, -50 -160 C -15 -130, -5 -70, 0 0 Z"
            fill="url(#tulipMidPetal)"
            filter="drop-shadow(0 3px 5px rgba(0,0,0,0.2))"
            style={{
              transformOrigin: '0 0',
              transform: isBlooming ? 'rotate(-12deg) scale(1)' : 'rotate(0deg) scale(0.6)',
              transition: 'all 1.8s cubic-bezier(0.2, 0.9, 0.3, 1.2) 1.6s',
            }}
          />

          {/* RIGHT BACK PETAL */}
          <path
            d="M 0 0 C 55 -40, 85 -120, 50 -160 C 15 -130, 5 -70, 0 0 Z"
            fill="url(#tulipMidPetal)"
            filter="drop-shadow(0 3px 5px rgba(0,0,0,0.2))"
            style={{
              transformOrigin: '0 0',
              transform: isBlooming ? 'rotate(12deg) scale(1)' : 'rotate(0deg) scale(0.6)',
              transition: 'all 1.8s cubic-bezier(0.2, 0.9, 0.3, 1.2) 1.6s',
            }}
          />

          {/* LEFT FRONT MAIN PETAL (Silky overlap) */}
          <path
            d="M 0 0 C -45 -30, -65 -100, -25 -150 C 5 -120, 10 -60, 0 0 Z"
            fill="url(#tulipFrontPetal)"
            opacity="0.95"
            filter="drop-shadow(0 3px 8px rgba(180, 83, 9, 0.3))"
            style={{
              transformOrigin: '0 0',
              transform: isBlooming ? 'rotate(-8deg) scale(1)' : 'rotate(0deg) scale(0.7)',
              transition: 'all 1.8s cubic-bezier(0.2, 0.9, 0.3, 1.2) 1.8s',
            }}
          />

          {/* RIGHT FRONT MAIN PETAL (Silky overlap) */}
          <path
            d="M 0 0 C 45 -30, 65 -100, 25 -150 C -5 -120, -10 -60, 0 0 Z"
            fill="url(#tulipFrontPetal)"
            opacity="0.95"
            filter="drop-shadow(0 3px 8px rgba(180, 83, 9, 0.3))"
            style={{
              transformOrigin: '0 0',
              transform: isBlooming ? 'rotate(8deg) scale(1)' : 'rotate(0deg) scale(0.7)',
              transition: 'all 1.8s cubic-bezier(0.2, 0.9, 0.3, 1.2) 1.8s',
            }}
          />

          {/* CENTER FRONT PETAL */}
          <path
            d="M 0 0 C -25 -40, -30 -115, 0 -140 C 30 -115, 25 -40, 0 0 Z"
            fill="url(#tulipFrontPetal)"
            filter="drop-shadow(0 4px 10px rgba(180, 83, 9, 0.4))"
            style={{
              transformOrigin: '0 0',
              transform: isBlooming ? 'scale(1)' : 'scale(0.8)',
              transition: 'transform 1.6s ease-out 2.0s',
            }}
          />

          {/* Petal Delicate Sheen Highlights */}
          <path
            d="M -6 -10 C -15 -50, -15 -100, 0 -130"
            fill="none"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Golden Pistil tips visible inside cup */}
          <circle cx="-6" cy="-90" r="3" fill="#ca8a04" />
          <circle cx="6" cy="-90" r="3" fill="#ca8a04" />
          <circle cx="0" cy="-96" r="3.5" fill="#eab308" />
        </g>
      </svg>
    </div>
  );
}
