import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";
import { Sparkles } from "../characters/Stickman";
import { Floor, Grad, H, Stars, Svg, W } from "../scenes/bg1";
import { Chamber } from "../scenes/bg2";

type XY = { x: number; y: number; s?: number };
const T = (x: number, y: number, s = 1, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${s})`;

export const Bridge: React.FC<{ t: number; fall?: number }> = ({ t, fall = 0 }) => (
  <Svg>
    <defs>
      <Grad id="brg" stops={["#1a1a3a", "#3a2a5a", "#7a4a6a"]} />
    </defs>
    <rect width={W} height={H} fill="url(#brg)" />
    <Stars t={t} n={30} h={600} seed="br" />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={i * 230 - 30} y={500 + (i % 2) * 80} width={180} height={800} fill="#2a2440" stroke={INK} strokeWidth={4} />
    ))}
    <rect x={0} y={1300} width={W} height={620} fill="#1d3a5a" />
    {Array.from({ length: 8 }).map((_, i) => (
      <line key={i} x1={i * 140} x2={i * 140 + 80} y1={1360 + (i % 3) * 80} y2={1360 + (i % 3) * 80} stroke="#5ad1ff" strokeWidth={4} opacity={0.4} />
    ))}
    <g stroke={INK} strokeWidth={6}>
      <rect x={-20} y={1100} width={520} height={60} fill="#7a7a8a" transform={`rotate(${fall * 25} 480 1130) translate(0 ${fall * 200})`} />
      <rect x={580} y={1100} width={520} height={60} fill="#7a7a8a" transform={`rotate(${-fall * 25} 600 1130) translate(0 ${fall * 200})`} />
      <rect x={140} y={700} width={40} height={400} fill="#8a8a9a" />
      <rect x={900} y={700} width={40} height={400} fill="#8a8a9a" />
      <path d="M 160 720 Q 540 1000 920 720" fill="none" strokeWidth={8} stroke="#5a5a6a" />
    </g>
  </Svg>
);

export const Office: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <rect width={W} height={H} fill="#3a2a5a" />
    {Array.from({ length: 8 }).map((_, i) => (
      <g key={i} transform={`translate(${80 + (i % 4) * 280} ${260 + Math.floor(i / 4) * 300})`} stroke={INK} strokeWidth={4}>
        <rect x={-80} y={-110} width={160} height={210} fill="#d9a441" />
        <rect x={-64} y={-94} width={128} height={178} fill={["#5a3a7a", "#2a5a3a", "#7a3a3a", "#3a4a7a"][i % 4]} />
        <circle cx={0} cy={-20} r={30} fill="#f3e6d6" />
        <path d={`M -10 0 q 10 ${4 + Math.sin(t * 2 + i) * 4} 20 0`} fill="none" strokeWidth={3} />
      </g>
    ))}
    {Array.from({ length: 6 }).map((_, i) => (
      <circle key={i} cx={160 + i * 150} cy={930} r={10} fill="#bfefff" opacity={0.5 + 0.4 * Math.sin(t * 4 + i)} />
    ))}
    <Floor y={1270} c1="#4a3a2a" c2="#000" lines="rgba(0,0,0,0.3)" />
  </Svg>
);

export const Cave: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Chamber t={t} tint="#0f1f24" light="#5ad1ff" />
    <Svg>
      <path d="M 0 0 L 1080 0 L 1080 300 Q 900 200 700 320 Q 540 180 380 320 Q 200 200 0 300 Z" fill="#081418" />
      <rect x={0} y={1230} width={W} height={H - 1230} fill="#0a2a33" />
      {Array.from({ length: 10 }).map((_, i) => (
        <ellipse key={i} cx={(random(`cv${i}`) * 1080 + t * 15) % 1080} cy={1290 + i * 50} rx={120} ry={6} fill="#5ad1ff" opacity={0.15} />
      ))}
      <ellipse cx={540} cy={1240} rx={170} ry={40} fill="#1a3a3a" stroke={INK} strokeWidth={5} />
      <circle cx={540} cy={1180} r={90} fill="#3fdc6b" opacity={0.15 + 0.08 * Math.sin(t * 3)} />
    </Svg>
  </>
);

export const TowerTop: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <defs>
      <Grad id="tt" stops={["#05081f", "#141c4a", "#2a2f6a"]} />
    </defs>
    <rect width={W} height={H} fill="url(#tt)" />
    <Stars t={t} n={80} h={1100} seed="tt" />
    <circle cx={850} cy={300} r={70} fill="#fffbe6" />
    {Array.from({ length: 9 }).map((_, i) => (
      <rect key={i} x={i * 125} y={1180} width={80} height={90} fill="#4a4a62" stroke={INK} strokeWidth={5} />
    ))}
    <rect x={0} y={1270} width={W} height={650} fill="#3a3a52" stroke={INK} strokeWidth={6} />
  </Svg>
);

export const PrinceBook: React.FC<XY & { glow?: number }> = ({ x, y, s = 1, glow = 0 }) => (
  <g transform={T(x, y, s, -6)} stroke={INK} strokeWidth={5}>
    {glow ? <circle cx={0} cy={-60} r={140} fill="#ffe36e" opacity={0.2 * glow} stroke="none" /> : null}
    <rect x={-120} y={-150} width={240} height={160} rx={8} fill="#7a5a3a" />
    <rect x={-104} y={-136} width={208} height={132} fill="#e9d6a8" />
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M -90 ${-110 + i * 26} q 40 -10 80 0 t 80 0`} fill="none" stroke="#3a2a10" strokeWidth={3} />
    ))}
    <text x={0} y={-12} textAnchor="middle" fontSize={18} fontFamily="Fredoka" fontWeight={700} fill="#7a1a1a" stroke="none">Príncipe Mestizo</text>
  </g>
);

export const Vial: React.FC<XY & { color?: string }> = ({ x, y, s = 1, color = "#ffd23a" }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={4}>
    <circle cx={0} cy={0} r={50} fill={color} opacity={0.2} stroke="none" />
    <path d="M -14 -60 L 14 -60 L 14 -30 Q 34 -10 30 20 Q 26 46 0 48 Q -26 46 -30 20 Q -34 -10 -14 -30 Z" fill="#e8fbff" />
    <path d="M -28 4 Q 0 14 28 4 Q 26 44 0 46 Q -26 44 -28 4 Z" fill={color} strokeWidth={0} />
    <rect x={-16} y={-72} width={32} height={14} fill="#8a5a2b" />
  </g>
);

export const Pensieve: React.FC<XY & { t: number; active?: number }> = ({ x, y, s = 1, t, active = 0 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={6}>
    <circle cx={0} cy={-200} r={160 + active * 200} fill="#bfefff" opacity={0.12 + 0.2 * active} stroke="none" />
    <rect x={-30} y={-180} width={60} height={180} fill="#9a9aa8" />
    <path d="M -160 -200 Q -150 -110 0 -110 Q 150 -110 160 -200 Z" fill="#b8b8c8" />
    <ellipse cx={0} cy={-200} rx={160} ry={34} fill="#cfefff" />
    {[0, 1, 2].map((i) => (
      <ellipse key={i} cx={Math.sin(t * 2 + i * 2) * 60} cy={-200} rx={40} ry={8} fill="#ffffff" opacity={0.7} stroke="none" />
    ))}
  </g>
);

export const Locket: React.FC<XY & { glow?: number }> = ({ x, y, s = 1, glow = 1 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={5}>
    <circle cx={0} cy={0} r={90} fill="#3fdc6b" opacity={0.18 * glow} stroke="none" />
    <path d="M -40 -110 Q 0 -150 40 -110" fill="none" stroke="#d9a441" strokeWidth={6} />
    <ellipse cx={0} cy={-30} rx={50} ry={60} fill="#d9a441" />
    <path d="M -20 -50 Q 0 -70 20 -50 Q 0 -30 -12 -20 Q 10 0 -10 10" fill="none" stroke="#2f8f4a" strokeWidth={6} />
  </g>
);

export const Inferius: React.FC<XY & { t: number; seed?: number }> = ({ x, y, s = 1, t, seed = 0 }) => {
  const a = Math.sin(t * 3 + seed) * 20;
  return (
    <g transform={T(x, y, s)} stroke="#2a3a3a" strokeWidth={9} strokeLinecap="round" fill="none">
      <line x1={0} y1={0} x2={0} y2={-180} stroke="#c9d8d0" />
      <line x1={0} y1={-150} x2={-70} y2={-230 - a} stroke="#c9d8d0" />
      <line x1={0} y1={-150} x2={70} y2={-230 + a} stroke="#c9d8d0" />
      <circle cx={0} cy={-230} r={40} fill="#d8e4dc" strokeWidth={5} />
      <circle cx={-13} cy={-234} r={6} fill="#000" stroke="none" />
      <circle cx={13} cy={-234} r={6} fill="#000" stroke="none" />
    </g>
  );
};

export const FireRing: React.FC<{ t: number; k: number; cx?: number; cy?: number }> = ({ t, k, cx = 540, cy = 1250 }) =>
  k <= 0 ? null : (
    <g opacity={k}>
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2 + t * 0.6;
        const x = cx + Math.cos(a) * 420;
        const y = cy + Math.sin(a) * 110;
        const h = 120 + Math.sin(t * 12 + i) * 30;
        return <path key={i} d={`M ${x - 40} ${y} Q ${x} ${y - h} ${x + 40} ${y} Z`} fill={i % 2 ? "#ff8a1a" : "#ffd23a"} />;
      })}
    </g>
  );

export const Cabinet: React.FC<XY & { open?: number }> = ({ x, y, s = 1, open = 0 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={7}>
    <rect x={-130} y={-480} width={260} height={480} fill="#2a1a10" />
    <rect x={-115} y={-465} width={115} height={450} fill="#3a2414" transform={`rotate(${-open * 75} -115 -240)`} />
    <rect x={0} y={-465} width={115} height={450} fill="#3a2414" transform={`rotate(${open * 75} 115 -240)`} />
    <circle cx={0} cy={-240} r={60 + open * 80} fill="#3fdc6b" opacity={0.2 * open} stroke="none" />
  </g>
);

export const Ring: React.FC<XY> = ({ x, y, s = 1 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={5}>
    <circle r={40} fill="none" stroke="#d9a441" strokeWidth={14} />
    <path d="M -24 -50 L 24 -50 L 0 -86 Z" fill="#1d1d24" />
  </g>
);

export const Birds: React.FC<{ t: number; t0: number; tx: number; ty: number }> = ({ t, t0, tx, ty }) => {
  const k = t - t0;
  if (k < 0 || k > 2.2) return null;
  return (
    <g>
      {Array.from({ length: 8 }).map((_, i) => {
        const p = Math.min(1, k / 1.2);
        const x = 300 + (tx - 300) * p + Math.sin(k * 10 + i) * 40;
        const y = 600 + (ty - 600) * p + Math.cos(k * 9 + i) * 40;
        return (
          <g key={i} transform={`translate(${x} ${y})`} stroke={INK} strokeWidth={3}>
            <ellipse rx={20} ry={14} fill="#ffe14d" />
            <path d={`M -4 -6 Q -20 ${-24 + Math.sin(k * 30 + i) * 8} -30 -6 Z`} fill="#ffd23a" />
            <path d="M 18 -2 L 30 2 L 18 6 Z" fill="#ff8a1a" />
          </g>
        );
      })}
    </g>
  );
};

export const SevenPieces: React.FC<XY & { t: number; done?: number }> = ({ x, y, s = 1, t, done = 2 }) => (
  <g transform={T(x, y, s)}>
    {Array.from({ length: 7 }).map((_, i) => {
      const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
      const px = Math.cos(a) * 220;
      const py = Math.sin(a) * 220;
      return (
        <g key={i} transform={`translate(${px} ${py})`}>
          <circle r={56} fill={i < done ? "#5a5f70" : "#1d1d24"} stroke="#ff2b2b" strokeWidth={6} opacity={i < done ? 0.5 : 1} />
          <path d="M -20 -10 L 0 -30 L 20 -10 L 6 20 L -6 20 Z" fill="#ff2b2b" opacity={i < done ? 0.3 : 0.9 + 0.1 * Math.sin(t * 4 + i)} />
          {i < done ? <path d="M -40 -40 L 40 40 M 40 -40 L -40 40" stroke="#fff" strokeWidth={8} /> : null}
        </g>
      );
    })}
    <Sparkles x={0} y={0} intensity={0.8} seed={5} count={10} color="#ff6b6b" />
  </g>
);
