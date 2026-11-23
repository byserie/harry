import React from "react";
import { INK } from "../characters/cast";
import { Sparkles } from "../characters/Stickman";
import { Floor, H, Svg, W } from "../scenes/bg1";
import { MiniStick } from "../scenes/props";

type XY = { x: number; y: number; s?: number };
const T = (x: number, y: number, s = 1, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${s})`;

export const WhiteStation: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <rect width={W} height={H} fill="#f6f8ff" />
    <circle cx={540} cy={700} r={700} fill="#ffffff" opacity={0.6 + 0.1 * Math.sin(t)} />
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} d={`M ${i * 260 - 60} 0 Q ${i * 260 + 70} 120 ${i * 260 + 200} 0`} stroke="#e0e6f5" strokeWidth={14} fill="none" />
    ))}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect key={i} x={i * 200 - 20} y={200} width={30} height={1070} fill="#eef1fa" />
    ))}
    <Floor y={1270} c1="#eef1fa" c2="#000" lines="rgba(150,160,190,0.25)" />
  </Svg>
);

export const Diadem: React.FC<XY & { glow?: number }> = ({ x, y, s = 1, glow = 1 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={5}>
    <circle cx={0} cy={-30} r={110} fill="#5ad1ff" opacity={0.15 * glow} stroke="none" />
    <path d="M -100 0 Q 0 -30 100 0 L 80 -60 L 40 -30 L 0 -90 L -40 -30 L -80 -60 Z" fill="#c0c8d8" />
    <circle cx={0} cy={-60} r={14} fill="#2f6fe4" />
  </g>
);

export const SmallCup: React.FC<XY & { glow?: number }> = ({ x, y, s = 1, glow = 1 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={5}>
    <circle cx={0} cy={-60} r={90} fill="#ffe36e" opacity={0.2 * glow} stroke="none" />
    <path d="M -50 -110 L 50 -110 Q 50 -50 0 -40 Q -50 -50 -50 -110 Z" fill="#f2c230" />
    <path d="M -50 -100 q -30 0 -24 30 q 4 16 24 10 M 50 -100 q 30 0 24 30 q -4 16 -24 10" fill="none" stroke="#f2c230" strokeWidth={8} />
    <rect x={-8} y={-42} width={16} height={30} fill="#e0a820" />
    <ellipse cx={0} cy={-10} rx={34} ry={8} fill="#e0a820" />
  </g>
);

export const Dome: React.FC<{ t: number; k: number; broken?: number }> = ({ t, k, broken = 0 }) =>
  k <= 0 ? null : (
    <g opacity={k * (1 - broken)}>
      <path d="M -60 1280 Q 540 -100 1140 1280" fill="#7cc8ff" opacity={0.18} stroke="#bfefff" strokeWidth={10} />
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i} d={`M ${i * 150} 1280 Q ${540} ${200 + Math.sin(t + i) * 20} ${1080 - i * 150} 1280`} fill="none" stroke="#bfefff" strokeWidth={3} opacity={0.4} />
      ))}
    </g>
  );

export const Shards: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const k = t - t0;
  if (k < 0 || k > 2) return null;
  return (
    <g>
      {Array.from({ length: 30 }).map((_, i) => {
        const a = (i / 30) * Math.PI;
        const x = 540 + Math.cos(a) * 520 * (1 + k * 0.4);
        const y = 600 - Math.sin(a) * 500 + k * k * 600;
        return <path key={i} d={`M ${x} ${y} l 30 10 l -14 26 z`} fill="#bfefff" opacity={1 - k / 2} />;
      })}
    </g>
  );
};

export const Giant: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g opacity={0.9}>
    <MiniStick x={x + Math.sin(t) * 10} y={y} s={s} color="#6b4a2b" head="#c9a27a" hair="#3a2414" arms="up" t={t} />
  </g>
);

export const Statue: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g filter="grayscale(1)">
    <MiniStick x={x} y={y} s={s} color="#9a9aa8" head="#c0c0cc" t={t} arms="up" />
  </g>
);

export const BrokenWand: React.FC<XY & { k: number }> = ({ x, y, s = 1, k }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={4}>
    <path d="M -100 0 L -6 -4 L -6 6 L -100 4 Z" fill="#e8dcc0" transform={`rotate(${-k * 30} -6 0) translate(${-k * 40} ${k * 200})`} />
    <path d="M 6 -4 L 100 0 L 100 4 L 6 6 Z" fill="#e8dcc0" transform={`rotate(${k * 30} 6 0) translate(${k * 40} ${k * 220})`} />
    {k < 0.3 ? <Sparkles x={0} y={0} intensity={1} seed={3} count={12} /> : null}
  </g>
);

export const Ashes: React.FC<{ t: number; t0: number; x: number; y: number }> = ({ t, t0, x, y }) => {
  const k = t - t0;
  if (k < 0 || k > 3) return null;
  return (
    <g>
      {Array.from({ length: 40 }).map((_, i) => (
        <rect key={i} x={x - 60 + ((i * 37) % 120) + k * 60 * Math.sin(i)} y={y - 400 + ((i * 53) % 400) - k * 120 * (1 + (i % 3))} width={10} height={10} fill="#2a2a2a" opacity={Math.max(0, 1 - k / 3)} transform={`rotate(${k * 200 + i * 20} ${x} ${y - 200})`} />
      ))}
    </g>
  );
};
