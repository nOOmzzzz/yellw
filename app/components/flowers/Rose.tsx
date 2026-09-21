'use client';

import React from 'react';

export default function Rose({ isBlooming }: { isBlooming: boolean }) {
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
          {/* Rose Stem Gradient */}
          <linearGradient id="roseStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#0f3d20" />
          </linearGradient>

          {/* Rose Leaf Gradient */}
          <linearGradient id="roseLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#052e16" />
            <stop offset="60%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>

          {/* Outer Rose Petals */}
          <linearGradient id="roseOuterPetal" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="30%" stopColor="#d97706" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="95%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#fef9c3" />
          </linearGradient>

          {/* Mid Rose Petals */}
          <linearGradient id="roseMidPetal" x1="30%" y1="100%" x2="70%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Inner Rose Spiral */}
          <radialGradient id="roseCoreGrad" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="25%" stopColor="#fde047" />
            <stop offset="65%" stopColor="#f59e0b" />
            <stop offset="90%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </radialGradient>
        </defs>

        {/* --- STEM WITH THORNS --- */}
        <g>
          {/* Main Stem */}
          <path
            d="M 250 760 C 248 630, 256 470, 250 310"
            fill="none"
            stroke="url(#roseStemGrad)"
            strokeWidth="15"
            strokeLinecap="round"
            style={{
              strokeDasharray: 560,
              strokeDashoffset: isBlooming ? 0 : 560,
              transition: 'stroke-dashoffset 2.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />

          {/* Thorns */}
          <path
            d="M 244 580 C 235 580, 226 585, 222 595 C 228 593, 238 592, 244 590 Z"
            fill="#14532d"
            opacity={isBlooming ? 1 : 0}
            style={{ transition: 'opacity 1s ease 1s' }}
          />
          <path
            d="M 256 500 C 265 500, 274 505, 278 515 C 272 513, 262 512, 256 510 Z"
            fill="#14532d"
            opacity={isBlooming ? 1 : 0}
            style={{ transition: 'opacity 1s ease 1.3s' }}
          />
          <path
            d="M 244 420 C 235 420, 228 424, 224 432 C 230 431, 238 430, 244 428 Z"
            fill="#14532d"
            opacity={isBlooming ? 1 : 0}
            style={{ transition: 'opacity 1s ease 1.5s' }}
          />
        </g>

        {/* --- ROSE LEAFLETS --- */}
        {/* Left Leaflet cluster */}
        <g
          transform="translate(244, 530)"
          style={{
            transformOrigin: '0 0',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-30deg)',
            transition: 'all 1.6s cubic-bezier(0.34, 1.4, 0.64, 1) 0.9s',
          }}
        >
          {/* Main Leaf */}
          <path
            d="M 0 0 C -40 -20, -95 -10, -125 35 C -90 55, -45 35, 0 0 Z"
            fill="url(#roseLeafGrad)"
            stroke="#052e16"
            strokeWidth="1.5"
          />
          <path
            d="M 0 0 C -45 10, -85 20, -120 32"
            fill="none"
            stroke="#86efac"
            strokeWidth="1.5"
            opacity="0.5"
          />
        </g>

        {/* Right Leaflet cluster */}
        <g
          transform="translate(254, 440)"
          style={{
            transformOrigin: '0 0',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(30deg)',
            transition: 'all 1.6s cubic-bezier(0.34, 1.4, 0.64, 1) 1.2s',
          }}
        >
          <path
            d="M 0 0 C 40 -20, 95 -10, 125 35 C 90 55, 45 35, 0 0 Z"
            fill="url(#roseLeafGrad)"
            stroke="#052e16"
            strokeWidth="1.5"
          />
          <path
            d="M 0 0 C 45 10, 85 20, 120 32"
            fill="none"
            stroke="#86efac"
            strokeWidth="1.5"
            opacity="0.5"
          />
        </g>

        {/* --- ROSE BLOSSOM HEAD --- */}
        <g
          transform="translate(250, 300)"
          style={{
            transformOrigin: '250px 300px',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1)' : 'scale(0.2)',
            transition: 'all 2s cubic-bezier(0.175, 0.885, 0.32, 1.2) 1.3s',
          }}
        >
          {/* Sepals below bloom */}
          <path
            d="M -25 15 C -45 25, -60 45, -70 65 C -55 45, -35 30, -15 20 Z"
            fill="#15803d"
          />
          <path
            d="M 25 15 C 45 25, 60 45, 70 65 C 55 45, 35 30, 15 20 Z"
            fill="#15803d"
          />

          {/* Outer Layer Petals (Broad, curled edges) */}
          {/* Petal Bottom */}
          <path
            d="M -70 10 C -90 70, 90 70, 70 10 C 35 35, -35 35, -70 10 Z"
            fill="url(#roseOuterPetal)"
            filter="drop-shadow(0 4px 8px rgba(146, 64, 14, 0.4))"
            style={{
              transformOrigin: '0 20px',
              transform: isBlooming ? 'scale(1)' : 'scale(0.4)',
              transition: 'transform 1.6s ease 1.5s',
            }}
          />

          {/* Petal Left Wide */}
          <path
            d="M -20 20 C -110 10, -120 -80, -45 -95 C -65 -40, -45 0, -20 20 Z"
            fill="url(#roseOuterPetal)"
            filter="drop-shadow(0 3px 6px rgba(146, 64, 14, 0.35))"
            style={{
              transformOrigin: '-20px 20px',
              transform: isBlooming ? 'rotate(0deg)' : 'rotate(15deg) scale(0.4)',
              transition: 'all 1.6s ease 1.6s',
            }}
          />

          {/* Petal Right Wide */}
          <path
            d="M 20 20 C 110 10, 120 -80, 45 -95 C 65 -40, 45 0, 20 20 Z"
            fill="url(#roseOuterPetal)"
            filter="drop-shadow(0 3px 6px rgba(146, 64, 14, 0.35))"
            style={{
              transformOrigin: '20px 20px',
              transform: isBlooming ? 'rotate(0deg)' : 'rotate(-15deg) scale(0.4)',
              transition: 'all 1.6s ease 1.6s',
            }}
          />

          {/* Petal Top Outer */}
          <path
            d="M -55 -70 C -40 -125, 40 -125, 55 -70 C 25 -95, -25 -95, -55 -70 Z"
            fill="url(#roseMidPetal)"
            filter="drop-shadow(0 2px 5px rgba(146, 64, 14, 0.3))"
            style={{
              transformOrigin: '0 -70px',
              transform: isBlooming ? 'scale(1)' : 'scale(0.5)',
              transition: 'transform 1.6s ease 1.7s',
            }}
          />

          {/* Middle Whorl Petals (Enfolding spiral) */}
          <path
            d="M -40 -10 C -75 -40, -50 -90, -10 -90 C -35 -60, -25 -25, -40 -10 Z"
            fill="url(#roseMidPetal)"
            opacity="0.95"
          />
          <path
            d="M 40 -10 C 75 -40, 50 -90, 10 -90 C 35 -60, 25 -25, 40 -10 Z"
            fill="url(#roseMidPetal)"
            opacity="0.95"
          />

          {/* Inner Swirl Cup */}
          <ellipse
            cx="0"
            cy="-35"
            rx="46"
            ry="42"
            fill="url(#roseCoreGrad)"
            stroke="#b45309"
            strokeWidth="1.5"
            filter="drop-shadow(0 2px 6px rgba(146, 64, 14, 0.4))"
          />

          {/* Heart spiral swirl lines */}
          <path
            d="M -24 -35 C -24 -55, 0 -60, 16 -48 C 28 -38, 22 -20, 6 -18 C -10 -16, -14 -28, -6 -35 C 0 -40, 8 -36, 6 -30"
            fill="none"
            stroke="#92400e"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M -22 -37 C -22 -53, 0 -58, 14 -46 C 26 -36, 20 -22, 6 -20 C -8 -18, -12 -28, -5 -34"
            fill="none"
            stroke="#fef08a"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
