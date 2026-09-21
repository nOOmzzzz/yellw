'use client';

import React from 'react';
import { FlowerType } from '../types';

interface BouquetWrapperProps {
  layer: 'back' | 'front';
  step: number;
  flowerType: FlowerType;
}

export default function BouquetWrapper({
  layer,
  step,
  flowerType,
}: BouquetWrapperProps) {
  const hasWrap = step >= 3;

  // Tailored geometry per flower anatomy
  // Sunflowers are wide and low; Tulips are slender and vertical; Classic is balanced; Wildflower is airy
  const getCollarParams = () => {
    switch (flowerType) {
      case 'sunflower':
        return {
          backOuter: 'M 225 730 L 50 270 Q 300 155 550 270 L 375 730 Z',
          backInner: 'M 235 710 L 70 285 Q 300 180 530 285 L 365 710 Z',
          frontLeft: 'M 225 730 L 105 425 Q 275 495 385 465 L 365 730 Z',
          frontRight: 'M 375 730 L 495 425 Q 325 490 215 465 L 235 730 Z',
          trimLeft: 'M 105 425 Q 275 495 385 465',
          trimRight: 'M 495 425 Q 325 490 215 465',
          neckCrease: 'M 220 540 Q 300 580 380 540',
        };
      case 'tulips':
        return {
          backOuter: 'M 230 730 L 75 260 Q 300 150 525 260 L 370 730 Z',
          backInner: 'M 240 710 L 95 275 Q 300 175 505 275 L 360 710 Z',
          frontLeft: 'M 230 730 L 125 415 Q 280 460 370 435 L 360 730 Z',
          frontRight: 'M 370 730 L 475 415 Q 320 455 230 435 L 240 730 Z',
          trimLeft: 'M 125 415 Q 280 460 370 435',
          trimRight: 'M 475 415 Q 320 455 230 435',
          neckCrease: 'M 228 535 Q 300 570 372 535',
        };
      case 'wildflower':
        return {
          backOuter: 'M 228 730 L 65 275 Q 300 165 535 275 L 372 730 Z',
          backInner: 'M 238 710 L 85 290 Q 300 190 515 290 L 362 710 Z',
          frontLeft: 'M 228 730 L 115 430 Q 280 475 375 450 L 362 730 Z',
          frontRight: 'M 372 730 L 485 430 Q 320 470 225 450 L 238 730 Z',
          trimLeft: 'M 115 430 Q 280 475 375 450',
          trimRight: 'M 485 430 Q 320 470 225 450',
          neckCrease: 'M 225 540 Q 300 575 375 540',
        };
      case 'bouquet':
      default:
        return {
          backOuter: 'M 230 730 L 70 275 Q 300 165 530 275 L 370 730 Z',
          backInner: 'M 240 710 L 90 290 Q 300 190 510 290 L 360 710 Z',
          frontLeft: 'M 230 730 L 118 430 Q 280 475 375 450 L 360 730 Z',
          frontRight: 'M 370 730 L 482 430 Q 320 470 225 450 L 240 730 Z',
          trimLeft: 'M 118 430 Q 280 475 375 450',
          trimRight: 'M 482 430 Q 320 470 225 450',
          neckCrease: 'M 225 540 Q 300 575 375 540',
        };
    }
  };

  const params = getCollarParams();

  // LAYER 1: BACK COLLAR (Sits behind the stems and flower heads)
  if (layer === 'back') {
    return (
      <g
        style={{
          transformOrigin: '300px 720px',
          opacity: hasWrap ? 1 : 0,
          transform: hasWrap ? 'scale(1)' : 'scale(0.001)',
          transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.08s',
        }}
      >
        {/* Back Paper Flared Cone with outer drop shadow */}
        <path
          d={params.backOuter}
          fill="url(#wrapPaperGrad)"
          stroke="#b45309"
          strokeWidth="2"
          filter="drop-shadow(0 14px 28px rgba(0,0,0,0.75))"
        />

        {/* Golden Silk Interior Lining with gentle curvature */}
        <path
          d={params.backInner}
          fill="url(#wrapInnerSilk)"
          stroke="rgba(250, 204, 21, 0.45)"
          strokeWidth="1.2"
        />

        {/* Subtle interior vertical paper fold lines */}
        <path
          d="M 235 710 L 170 330"
          fill="none"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="1"
        />
        <path
          d="M 365 710 L 430 330"
          fill="none"
          stroke="rgba(0, 0, 0, 0.25)"
          strokeWidth="1.5"
        />
      </g>
    );
  }

  // LAYER 5: FRONT WRAPPER CONE & SATIN RIBBON BOW
  // Hugs the bouquet waist, cups lower stems and flower bases
  return (
    <g
      style={{
        transformOrigin: '300px 720px',
        opacity: hasWrap ? 1 : 0,
        transform: hasWrap ? 'scale(1)' : 'scale(0.001)',
        transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.14s',
      }}
    >
      {/* Front Left Wrapper Diagonal Fold */}
      <path
        d={params.frontLeft}
        fill="url(#wrapPaperGrad)"
        stroke="#ca8a04"
        strokeWidth="1.6"
        filter="drop-shadow(0 6px 12px rgba(0,0,0,0.5))"
      />

      {/* Front Right Overlapping V-neck Fold (Origami style wrapping) */}
      <path
        d={params.frontRight}
        fill="#141416"
        stroke="#eab308"
        strokeWidth="1.8"
        filter="drop-shadow(0 8px 16px rgba(0,0,0,0.65))"
      />

      {/* Metallic Gold Foil Accent Trim on Paper Edges */}
      <path
        d={params.trimLeft}
        fill="none"
        stroke="#fde047"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d={params.trimRight}
        fill="none"
        stroke="#facc15"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Paper Tension Crease above waist */}
      <path
        d={params.neckCrease}
        fill="none"
        stroke="rgba(0, 0, 0, 0.35)"
        strokeWidth="2"
      />
      <path
        d={params.neckCrease}
        fill="none"
        stroke="rgba(250, 204, 21, 0.15)"
        strokeWidth="1"
      />

      {/* Exposed bottom stems gather (y: 730 - 765) */}
      <g opacity={step >= 1 ? 0.95 : 0}>
        <path
          d="M 275 730 L 265 765"
          fill="none"
          stroke="#15803d"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 292 730 L 290 768"
          fill="none"
          stroke="#16a34a"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M 308 730 L 310 768"
          fill="none"
          stroke="#15803d"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M 325 730 L 335 765"
          fill="none"
          stroke="#166534"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      {/* --- SATIN RIBBON BOW & FLOWING TAILS (Tied at waist y: 610) --- */}
      <g transform="translate(300, 610)">
        {/* Left Ribbon Loop */}
        <path
          d="M 0 0 C -45 -45, -92 -25, -92 10 C -92 36, -45 25, 0 0 Z"
          fill="url(#wrapRibbonGrad)"
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
        />
        {/* Right Ribbon Loop */}
        <path
          d="M 0 0 C 45 -45, 92 -25, 92 10 C 92 36, 45 25, 0 0 Z"
          fill="url(#wrapRibbonGrad)"
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
        />

        {/* Satin Sheen Line on Loops */}
        <path
          d="M -20 -15 C -55 -28, -75 -10, -75 5"
          fill="none"
          stroke="rgba(254, 240, 138, 0.65)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M 20 -15 C 55 -28, 75 -10, 75 5"
          fill="none"
          stroke="rgba(254, 240, 138, 0.65)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Left Flowing Ribbon Tail */}
        <path
          d="M -8 5 C -28 35, -55 75, -70 115 C -55 105, -35 95, 0 12 Z"
          fill="url(#wrapRibbonGrad)"
          filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))"
        />
        {/* Right Flowing Ribbon Tail */}
        <path
          d="M 8 5 C 28 35, 55 75, 70 115 C 55 105, 35 95, 0 12 Z"
          fill="url(#wrapRibbonGrad)"
          filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))"
        />

        {/* Center Knot with Pearl Sheen Highlight */}
        <ellipse
          cx="0"
          cy="2"
          rx="16"
          ry="14"
          fill="#fbbf24"
          stroke="#b45309"
          strokeWidth="2.2"
          filter="drop-shadow(0 2px 6px rgba(0,0,0,0.6))"
        />
        <circle cx="-3" cy="-1" r="3.5" fill="#fffdf5" opacity="0.65" />
      </g>
    </g>
  );
}
