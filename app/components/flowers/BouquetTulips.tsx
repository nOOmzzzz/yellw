'use client';

import React from 'react';

export default function BouquetTulips({ step = 5 }: { step?: number }) {
  const hasStems = step >= 1;
  const hasLeaves = step >= 2;
  const hasWrap = step >= 3;
  const hasBuds = step >= 4;
  const hasBloom = step >= 5;

  // Single Tulip Head Renderer
  const renderTulipHead = (scale: number, delaySec: number) => {
    return (
      <g>
        {/* Calyx */}
        {hasBuds && <ellipse cx="0" cy="5" rx="12" ry="6" fill="#15803d" />}

        {/* Dynamic Blooming Tulip Chalice */}
        <g
          style={{
            transformOrigin: '0px 0px',
            opacity: hasBuds ? 1 : 0,
            transform: hasBloom ? `scale(${scale})` : hasBuds ? `scale(${scale * 0.55})` : 'scale(0.001)',
            transition: `all 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.25) ${delaySec}s`,
          }}
        >
          {/* Back Petal */}
          <path
            d="M 0 0 C -35 -40, -35 -120, 0 -145 C 35 -120, 35 -40, 0 0 Z"
            fill="url(#tulipBackGrad)"
            filter="drop-shadow(0 3px 6px rgba(0,0,0,0.25))"
          />

          {/* Left Back Petal */}
          <path
            d="M 0 0 C -45 -30, -70 -95, -40 -130 C -12 -105, -4 -55, 0 0 Z"
            fill="url(#tulipMidGrad)"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
            style={{
              transformOrigin: '0px 0px',
              transform: hasBloom ? 'rotate(-12deg)' : 'rotate(0deg)',
              transition: `transform 1.3s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${delaySec + 0.1}s`,
            }}
          />

          {/* Right Back Petal */}
          <path
            d="M 0 0 C 45 -30, 70 -95, 40 -130 C 12 -105, 4 -55, 0 0 Z"
            fill="url(#tulipMidGrad)"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
            style={{
              transformOrigin: '0px 0px',
              transform: hasBloom ? 'rotate(12deg)' : 'rotate(0deg)',
              transition: `transform 1.3s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${delaySec + 0.1}s`,
            }}
          />

          {/* Left Front Satin Petal */}
          <path
            d="M 0 0 C -38 -25, -55 -80, -20 -125 C 5 -95, 8 -50, 0 0 Z"
            fill="url(#tulipFrontGrad)"
            opacity="0.95"
            filter="drop-shadow(0 3px 6px rgba(180, 83, 9, 0.3))"
            style={{
              transformOrigin: '0px 0px',
              transform: hasBloom ? 'rotate(-8deg)' : 'rotate(0deg)',
              transition: `transform 1.3s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${delaySec + 0.15}s`,
            }}
          />

          {/* Right Front Satin Petal */}
          <path
            d="M 0 0 C 38 -25, 55 -80, 20 -125 C -5 -95, -8 -50, 0 0 Z"
            fill="url(#tulipFrontGrad)"
            opacity="0.95"
            filter="drop-shadow(0 3px 6px rgba(180, 83, 9, 0.3))"
            style={{
              transformOrigin: '0px 0px',
              transform: hasBloom ? 'rotate(8deg)' : 'rotate(0deg)',
              transition: `transform 1.3s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${delaySec + 0.15}s`,
            }}
          />

          {/* Center Front Petal */}
          <path
            d="M 0 0 C -22 -30, -25 -95, 0 -118 C 25 -95, 22 -30, 0 0 Z"
            fill="url(#tulipFrontGrad)"
            filter="drop-shadow(0 3px 8px rgba(180, 83, 9, 0.4))"
          />

          {/* Satin Highlight line */}
          <path
            d="M -5 -10 C -12 -40, -12 -80, 0 -105"
            fill="none"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Center stamen tips inside chalice */}
          <circle cx="-5" cy="-75" r="2.5" fill="#ca8a04" />
          <circle cx="5" cy="-75" r="2.5" fill="#ca8a04" />
          <circle cx="0" cy="-80" r="3" fill="#facc15" />
        </g>
      </g>
    );
  };

  return (
    <div
      className={`relative w-full h-full flex items-end justify-center origin-bottom transition-transform duration-700 ${
        hasBloom ? 'animate-sway' : ''
      }`}
    >
      <svg
        suppressHydrationWarning
        viewBox="0 0 600 780"
        className="w-auto h-full max-h-[70vh] sm:max-h-[75vh] overflow-visible drop-shadow-2xl"
      >
        <defs>
          {/* Tulip Stem Gradient */}
          <linearGradient id="tulipBouquetStem" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>

          {/* Leaves Gradient */}
          <linearGradient id="tulipBouquetLeaf" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="60%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>

          {/* Tulip Petals Gradients */}
          <linearGradient id="tulipBackGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="40%" stopColor="#d97706" />
            <stop offset="85%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <linearGradient id="tulipMidGrad" x1="30%" y1="100%" x2="70%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#fef9c3" />
          </linearGradient>

          <linearGradient id="tulipFrontGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="35%" stopColor="#facc15" />
            <stop offset="85%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Floral Wrap Paper Gradients */}
          <linearGradient id="wrapOuterPaper" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="50%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>

          <linearGradient id="wrapInnerPaper" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>

        {/* --- STEMS (5 CURVED TULIP STEMS) --- */}
        <g>
          {/* Outer Left Stem -> (140, 360) */}
          <path
            d="M 300 760 C 270 650, 180 500, 140 360"
            fill="none"
            stroke="url(#tulipBouquetStem)"
            strokeWidth="11"
            strokeLinecap="round"
            style={{
              strokeDasharray: 550,
              strokeDashoffset: hasStems ? 0 : 550,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />

          {/* Inner Left Stem -> (220, 270) */}
          <path
            d="M 300 760 C 285 630, 230 450, 220 270"
            fill="none"
            stroke="url(#tulipBouquetStem)"
            strokeWidth="12"
            strokeLinecap="round"
            style={{
              strokeDasharray: 560,
              strokeDashoffset: hasStems ? 0 : 560,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
            }}
          />

          {/* Center Tall Stem -> (300, 200) */}
          <path
            d="M 300 760 C 298 600, 298 420, 300 200"
            fill="none"
            stroke="url(#tulipBouquetStem)"
            strokeWidth="13"
            strokeLinecap="round"
            style={{
              strokeDasharray: 600,
              strokeDashoffset: hasStems ? 0 : 600,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />

          {/* Inner Right Stem -> (380, 270) */}
          <path
            d="M 300 760 C 315 630, 370 450, 380 270"
            fill="none"
            stroke="url(#tulipBouquetStem)"
            strokeWidth="12"
            strokeLinecap="round"
            style={{
              strokeDasharray: 560,
              strokeDashoffset: hasStems ? 0 : 560,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
            }}
          />

          {/* Outer Right Stem -> (460, 360) */}
          <path
            d="M 300 760 C 330 650, 420 500, 460 360"
            fill="none"
            stroke="url(#tulipBouquetStem)"
            strokeWidth="11"
            strokeLinecap="round"
            style={{
              strokeDasharray: 550,
              strokeDashoffset: hasStems ? 0 : 550,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
        </g>

        {/* --- TULIP LEAVES (ARCHING & ENVELOPING) --- */}
        <g>
          {/* Far Left arching leaf */}
          <g transform="translate(230, 580)">
            <g
              style={{
                transformOrigin: '0px 0px',
                opacity: hasLeaves ? 1 : 0,
                transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(-35deg)',
                transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.15s',
              }}
            >
              <path
                d="M 0 0 C -60 -70, -140 -160, -150 -260 C -120 -180, -60 -90, 0 0 Z"
                fill="url(#tulipBouquetLeaf)"
                stroke="#14532d"
                strokeWidth="1.5"
              />
            </g>
          </g>

          {/* Far Right arching leaf */}
          <g transform="translate(370, 580)">
            <g
              style={{
                transformOrigin: '0px 0px',
                opacity: hasLeaves ? 1 : 0,
                transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(35deg)',
                transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.2s',
              }}
            >
              <path
                d="M 0 0 C 60 -70, 140 -160, 150 -260 C 120 -180, 60 -90, 0 0 Z"
                fill="url(#tulipBouquetLeaf)"
                stroke="#14532d"
                strokeWidth="1.5"
              />
            </g>
          </g>

          {/* Mid Leaves hugging center */}
          <g transform="translate(280, 480)">
            <g
              style={{
                transformOrigin: '0px 0px',
                opacity: hasLeaves ? 1 : 0,
                transform: hasLeaves ? 'scale(1)' : 'scale(0.001)',
                transition: 'all 1.3s ease 0.25s',
              }}
            >
              <path
                d="M 0 0 C -40 -60, -70 -140, -50 -230 C -25 -150, 0 -70, 0 0 Z"
                fill="url(#tulipBouquetLeaf)"
              />
            </g>
          </g>

          <g transform="translate(320, 480)">
            <g
              style={{
                transformOrigin: '0px 0px',
                opacity: hasLeaves ? 1 : 0,
                transform: hasLeaves ? 'scale(1)' : 'scale(0.001)',
                transition: 'all 1.3s ease 0.3s',
              }}
            >
              <path
                d="M 0 0 C 40 -60, 70 -140, 50 -230 C 25 -150, 0 -70, 0 0 Z"
                fill="url(#tulipBouquetLeaf)"
              />
            </g>
          </g>
        </g>

        {/* --- 5 TULIP BLOOM HEADS --- */}
        {/* Outer Left Tulip -> (140, 360) */}
        <g transform="translate(140, 360) rotate(-22)">
          {renderTulipHead(0.85, 0.1)}
        </g>

        {/* Inner Left Tulip -> (220, 270) */}
        <g transform="translate(220, 270) rotate(-10)">
          {renderTulipHead(0.92, 0.2)}
        </g>

        {/* Outer Right Tulip -> (460, 360) */}
        <g transform="translate(460, 360) rotate(22)">
          {renderTulipHead(0.85, 0.15)}
        </g>

        {/* Inner Right Tulip -> (380, 270) */}
        <g transform="translate(380, 270) rotate(10)">
          {renderTulipHead(0.92, 0.25)}
        </g>

        {/* Center Main Tulip -> (300, 200) */}
        <g transform="translate(300, 200)">
          {renderTulipHead(1.1, 0.3)}
        </g>

        {/* --- FLORAL BOUQUET WRAPPER & GOLDEN SATIN RIBBON --- */}
        <g transform="translate(300, 600)">
          <g
            style={{
              transformOrigin: '0px 0px',
              opacity: hasWrap ? 1 : 0,
              transform: hasWrap ? 'scale(1)' : 'scale(0.001)',
              transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.1s',
            }}
          >
            {/* Back Paper Layer (Flared Conical Silhouette) */}
            <path
              d="M -170 -130 L 170 -130 L 70 160 L -70 160 Z"
              fill="url(#wrapOuterPaper)"
              stroke="#ca8a04"
              strokeWidth="2"
              filter="drop-shadow(0 8px 16px rgba(0,0,0,0.6))"
            />

            {/* Inner Decorative Translucent Fold */}
            <path
              d="M -150 -125 L 0 -20 L 150 -125 L 50 155 L -50 155 Z"
              fill="url(#wrapInnerPaper)"
              stroke="rgba(250, 204, 21, 0.5)"
              strokeWidth="1.5"
            />

            {/* Front Left Wrapper Fold */}
            <path
              d="M -165 -120 L 60 -10 L -45 158 L -70 158 Z"
              fill="url(#wrapOuterPaper)"
              stroke="#eab308"
              strokeWidth="1.8"
            />

            {/* Front Right Wrapper Fold (Overlapping) */}
            <path
              d="M 165 -120 L -60 -10 L 45 158 L 70 158 Z"
              fill="#18181b"
              stroke="#fbbf24"
              strokeWidth="2"
            />

            {/* Decorative Gold Ribbon Border */}
            <line x1="-160" y1="-115" x2="60" y2="-8" stroke="#facc15" strokeWidth="2.5" />
            <line x1="160" y1="-115" x2="-60" y2="-8" stroke="#fde047" strokeWidth="2.5" />

            {/* --- SATIN RIBBON BOW & TAILS --- */}
            {/* Left Ribbon Loop */}
            <path
              d="M 0 0 C -40 -40, -85 -20, -85 10 C -85 35, -40 25, 0 0 Z"
              fill="url(#goldRibbon)"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
            />
            {/* Right Ribbon Loop */}
            <path
              d="M 0 0 C 40 -40, 85 -20, 85 10 C 85 35, 40 25, 0 0 Z"
              fill="url(#goldRibbon)"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
            />

            {/* Left Flowing Ribbon Tail */}
            <path
              d="M -8 5 C -25 35, -50 75, -65 110 C -50 100, -30 90, 0 12 Z"
              fill="url(#goldRibbon)"
              filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))"
            />
            {/* Right Flowing Ribbon Tail */}
            <path
              d="M 8 5 C 25 35, 50 75, 65 110 C 50 100, 30 90, 0 12 Z"
              fill="url(#goldRibbon)"
              filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))"
            />

            {/* Center Knot with Pearl Shine */}
            <ellipse
              cx="0"
              cy="2"
              rx="15"
              ry="13"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="2.5"
              filter="drop-shadow(0 2px 6px rgba(0,0,0,0.6))"
            />
            <circle cx="-3" cy="-1" r="3" fill="#ffffff" opacity="0.6" />
          </g>
        </g>
      </svg>
    </div>
  );
}
