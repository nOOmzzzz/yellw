'use client';

import React from 'react';

export default function BouquetSunflowers({ step = 5 }: { step?: number }) {
  const hasStems = step >= 1;
  const hasLeaves = step >= 2;
  const hasWrap = step >= 3;
  const hasBuds = step >= 4;
  const hasBloom = step >= 5;

  const outerPetals = Array.from({ length: 24 }, (_, i) => i * 15);
  const innerPetals = Array.from({ length: 18 }, (_, i) => i * 20 + 10);

  const renderSunflowerHead = (scale: number, delaySec: number) => {
    return (
      <g>
        {/* Calyx */}
        {hasBuds && (
          <path
            d="M -22 10 C -15 35, 15 35, 22 10 C 12 18, -12 18, -22 10 Z"
            fill="#15803d"
          />
        )}

        {/* Dynamic Blooming Sunflower */}
        <g
          style={{
            transformOrigin: '0px 0px',
            opacity: hasBuds ? 1 : 0,
            transform: hasBloom ? `scale(${scale})` : hasBuds ? `scale(${scale * 0.55})` : 'scale(0.001)',
            transition: `all 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.25) ${delaySec}s`,
          }}
        >
          {/* Ambient Glow */}
          {hasBloom && (
            <circle cx="0" cy="0" r="140" fill="rgba(251, 191, 36, 0.35)" filter="blur(16px)" />
          )}

          {/* Outer Petals */}
          {outerPetals.map((angle, idx) => (
            <g
              key={`sun-outer-${idx}`}
              style={{
                transformOrigin: '0px 0px',
                opacity: hasBloom ? 1 : 0,
                transform: hasBloom ? `rotate(${angle}deg) scale(1)` : `rotate(${angle}deg) scale(0.01)`,
                transition: `all 1.2s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${delaySec + 0.1 + idx * 0.015}s`,
              }}
            >
              <path
                d="M 0 0 C -15 -35, -15 -85, 0 -120 C 15 -85, 15 -35, 0 0 Z"
                fill="url(#sunOuterGrad)"
                filter="drop-shadow(0 2px 4px rgba(120, 53, 15, 0.35))"
              />
            </g>
          ))}

          {/* Inner Petals */}
          {innerPetals.map((angle, idx) => (
            <g
              key={`sun-inner-${idx}`}
              style={{
                transformOrigin: '0px 0px',
                opacity: hasBloom ? 1 : 0,
                transform: hasBloom ? `rotate(${angle}deg) scale(1)` : `rotate(${angle}deg) scale(0.01)`,
                transition: `all 1.1s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${delaySec + 0.2 + idx * 0.015}s`,
              }}
            >
              <path
                d="M 0 0 C -12 -30, -12 -70, 0 -95 C 12 -70, 12 -30, 0 0 Z"
                fill="url(#sunInnerGrad)"
                filter="drop-shadow(0 3px 6px rgba(120, 53, 15, 0.45))"
              />
            </g>
          ))}

          {/* Center Disk */}
          <circle
            cx="0"
            cy="0"
            r="54"
            fill="url(#sunDiskGrad)"
            stroke="#78350f"
            strokeWidth="3"
            filter="drop-shadow(0 0 10px rgba(245, 158, 11, 0.6))"
          />

          {/* Seed Circles */}
          {[14, 25, 36, 46].map((radius, rIdx) => {
            const count = 8 + rIdx * 6;
            return (
              <g key={`seed-ring-${rIdx}`} opacity="0.65">
                {Array.from({ length: count }).map((_, dIdx) => {
                  const rad = (dIdx * 360) / count * (Math.PI / 180);
                  const cx = Math.round(Math.cos(rad) * radius * 100) / 100;
                  const cy = Math.round(Math.sin(rad) * radius * 100) / 100;
                  return (
                    <circle
                      key={`seed-${rIdx}-${dIdx}`}
                      cx={cx}
                      cy={cy}
                      r={1.5}
                      fill={rIdx === 3 ? '#fde047' : '#f59e0b'}
                    />
                  );
                })}
              </g>
            );
          })}
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
          <linearGradient id="sunStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a1e" />
            <stop offset="50%" stopColor="#3d7a35" />
            <stop offset="100%" stopColor="#254d21" />
          </linearGradient>

          <linearGradient id="sunLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4d9b42" />
            <stop offset="60%" stopColor="#2d6a26" />
            <stop offset="100%" stopColor="#193d15" />
          </linearGradient>

          <linearGradient id="sunOuterGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="25%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <linearGradient id="sunInnerGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <radialGradient id="sunDiskGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f1406" />
            <stop offset="50%" stopColor="#3d2407" />
            <stop offset="85%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>

          <linearGradient id="wrapPaperSun" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="60%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>

          <linearGradient id="sunRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* LAYER 1: BACK WRAPPER COLLAR */}
        <g
          style={{
            transformOrigin: '300px 720px',
            opacity: hasWrap ? 1 : 0,
            transform: hasWrap ? 'scale(1)' : 'scale(0.001)',
            transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.1s',
          }}
        >
          <path
            d="M 230 730 L 70 280 Q 300 170 530 280 L 370 730 Z"
            fill="url(#wrapPaperSun)"
            stroke="#ca8a04"
            strokeWidth="2.5"
            filter="drop-shadow(0 12px 28px rgba(0,0,0,0.7))"
          />
        </g>

        {/* LAYER 2: STEMS */}
        <g>
          {/* Left Stem -> (190, 320) */}
          <path
            d="M 300 710 C 280 610, 215 470, 190 320"
            fill="none"
            stroke="url(#sunStemGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            style={{
              strokeDasharray: 550,
              strokeDashoffset: hasStems ? 0 : 550,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />

          {/* Right Stem -> (410, 320) */}
          <path
            d="M 300 710 C 320 610, 385 470, 410 320"
            fill="none"
            stroke="url(#sunStemGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            style={{
              strokeDasharray: 550,
              strokeDashoffset: hasStems ? 0 : 550,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
            }}
          />

          {/* Center Tall Stem -> (300, 220) */}
          <path
            d="M 300 710 C 298 600, 298 420, 300 220"
            fill="none"
            stroke="url(#sunStemGrad)"
            strokeWidth="16"
            strokeLinecap="round"
            style={{
              strokeDasharray: 600,
              strokeDashoffset: hasStems ? 0 : 600,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
        </g>

        {/* LAYER 3: LEAVES */}
        <g>
          <g transform="translate(230, 520)">
            <g
              style={{
                transformOrigin: '0px 0px',
                opacity: hasLeaves ? 1 : 0,
                transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(-35deg)',
                transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.2s',
              }}
            >
              <path
                d="M 0 0 C -60 -15, -120 15, -145 75 C -105 105, -45 75, 0 0 Z"
                fill="url(#sunLeafGrad)"
                stroke="#1b4317"
                strokeWidth="2"
              />
            </g>
          </g>

          <g transform="translate(370, 520)">
            <g
              style={{
                transformOrigin: '0px 0px',
                opacity: hasLeaves ? 1 : 0,
                transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(35deg)',
                transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.25s',
              }}
            >
              <path
                d="M 0 0 C 60 -15, 120 15, 145 75 C 105 105, 45 75, 0 0 Z"
                fill="url(#sunLeafGrad)"
                stroke="#1b4317"
                strokeWidth="2"
              />
            </g>
          </g>
        </g>

        {/* LAYER 4: 3 SUNFLOWER HEADS */}
        {/* Left Sunflower -> (190, 320) */}
        <g transform="translate(190, 320) rotate(-14)">
          {renderSunflowerHead(0.85, 0.1)}
        </g>

        {/* Right Sunflower -> (410, 320) */}
        <g transform="translate(410, 320) rotate(14)">
          {renderSunflowerHead(0.85, 0.15)}
        </g>

        {/* Center Main Sunflower -> (300, 220) */}
        <g transform="translate(300, 220)">
          {renderSunflowerHead(1.1, 0.25)}
        </g>

        {/* LAYER 5: FRONT WRAPPER & SATIN RIBBON */}
        <g
          style={{
            transformOrigin: '300px 720px',
            opacity: hasWrap ? 1 : 0,
            transform: hasWrap ? 'scale(1)' : 'scale(0.001)',
            transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.15s',
          }}
        >
          <path
            d="M 230 730 L 120 440 Q 280 480 370 455 L 360 730 Z"
            fill="url(#wrapPaperSun)"
            stroke="#eab308"
            strokeWidth="1.8"
            filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))"
          />
          <path
            d="M 370 730 L 480 440 Q 320 475 230 455 L 240 730 Z"
            fill="#18181b"
            stroke="#fbbf24"
            strokeWidth="2"
            filter="drop-shadow(0 6px 14px rgba(0,0,0,0.6))"
          />

          <g transform="translate(300, 610)">
            <path
              d="M 0 0 C -45 -45, -90 -25, -90 10 C -90 35, -45 25, 0 0 Z"
              fill="url(#sunRibbon)"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
            />
            <path
              d="M 0 0 C 45 -45, 90 -25, 90 10 C 90 35, 45 25, 0 0 Z"
              fill="url(#sunRibbon)"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
            />
            <path
              d="M -8 5 C -28 35, -55 75, -70 115 C -55 105, -35 95, 0 12 Z"
              fill="url(#sunRibbon)"
            />
            <path
              d="M 8 5 C 28 35, 55 75, 70 115 C 55 105, 35 95, 0 12 Z"
              fill="url(#sunRibbon)"
            />
            <ellipse cx="0" cy="2" rx="16" ry="14" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
