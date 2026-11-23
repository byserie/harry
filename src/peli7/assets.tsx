import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";
import { Sparkles } from "../characters/Stickman";
import { Floor, Grad, H, Stars, Svg, W } from "../scenes/bg1";
import { Chamber, Forest } from "../scenes/bg2";
import { Snowfall } from "../peli3/assets";

type XY = { x: number; y: number; s?: number };
const T = (x: number, y: number, s = 1, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${s})`;

export const SnowForest: React.FC<{ t: number; ice?: boolean }> = ({ t, ice = false }) => (
  <>
    <div style={{ position: "absolute", inset: 0, filter: "saturate(0.5) brightness(1.15) hue-rotate(-20deg)" }}>
      <Forest t={t} />
    </div>
    <Svg>
      <rect x={0} y={1270} width={W} height={H - 1270} fill={ice ? "#bfe6ff" : "#eef6ff"} />
      {ice ? <ellipse cx={540} cy={1420} rx={420} ry={90} fill="#8fd0ff" stroke="#e8fbff" strokeWidth={8} /> : null}
      <Snowfall t={t} n={60} />
    </Svg>
  </>
);

export const Manor: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Chamber t={t} tint="#1d2420" light="#9fb4a8" />
    <Svg>
      <g transform="translate(540 240)" stroke={INK} strokeWidth={4}>
        <line x1={0} y1={-240} x2={0} y2={0} />
        <path d="M -200 40 Q 0 120 200 40" fill="none" stroke="#c9b37a" strokeWidth={8} />
        {[-180, -90, 0, 90, 180].map((x, i) => (
          <g key={i}>
            <rect x={x - 6} y={30 + Math.abs(x) * 0.1} width={12} height={30} fill="#fff6dc" />
            <ellipse cx={x} cy={22 + Math.abs(x) * 0.1} rx={6} ry={10} fill="#ffcc4d" stroke="none" />
          </g>
        ))}
      </g>
      <rect x={300} y={1250} width={480} height={60} fill="#2a2a24" stroke={INK} strokeWidth={6} />
    </Svg>
  </>
);

export const Beach: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <defs>
      <Grad id="bch" stops={["#ff9a5a", "#ffc58a", "#ffe3b8"]} />
    </defs>
    <rect width={W} height={H} fill="url(#bch)" />
    <circle cx={540} cy={760} r={130} fill="#fff1c2" opacity={0.9} />
    <rect x={0} y={860} width={W} height={420} fill="#4a8ab8" />
    {Array.from({ length: 6 }).map((_, i) => (
      <path key={i} d={`M -60 ${900 + i * 60} q 90 -20 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0`} fill="none" stroke="#bfe6ff" strokeWidth={4} opacity={0.6} transform={`translate(${Math.sin(t + i) * 30} 0)`} />
    ))}
    <path d="M 0 1270 Q 540 1180 1080 1270 L 1080 1920 L 0 1920 Z" fill="#f2d9a0" stroke={INK} strokeWidth={4} />
    <g stroke={INK} strokeWidth={6}>
      <rect x={760} y={1000} width={240} height={200} fill="#f4f4f4" />
      <path d="M 740 1010 L 880 900 L 1020 1010 Z" fill="#c0392b" />
    </g>
  </Svg>
);

export const TombNight: React.FC<{ t: number; open?: number }> = ({ t, open = 0 }) => (
  <Svg>
    <defs>
      <Grad id="tn" stops={["#05081f", "#101a45", "#1d2a6b"]} />
    </defs>
    <rect width={W} height={H} fill="url(#tn)" />
    <Stars t={t} n={60} h={900} seed="tn" />
    <rect x={0} y={1080} width={W} height={200} fill="#14205a" />
    <rect x={0} y={1270} width={W} height={H - 1270} fill="#1a2f20" />
    <g stroke={INK} strokeWidth={6}>
      <rect x={320} y={1150} width={440} height={140} fill="#f4f4f4" />
      <rect x={300} y={1120 - open * 160} width={480} height={40} fill="#ffffff" transform={`rotate(${open * -15} 300 1140)`} />
    </g>
  </Svg>
);

export const Tent: React.FC<XY> = ({ x, y, s = 1 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={6} strokeLinejoin="round">
    <path d="M -220 0 L 0 -260 L 220 0 Z" fill="#8a7a5a" />
    <path d="M -60 0 L 0 -180 L 60 0 Z" fill="#3a2a1a" />
    <circle cx={0} cy={-90} r={60} fill="#ffd36b" opacity={0.25} stroke="none" />
  </g>
);

export const Deluminator: React.FC<XY & { t: number; k?: number }> = ({ x, y, s = 1, t, k = 1 }) => (
  <g transform={T(x, y, s)}>
    <rect x={-20} y={-60} width={40} height={90} rx={10} fill="#c0c8d8" stroke={INK} strokeWidth={4} />
    {Array.from({ length: 5 }).map((_, i) => {
      const a = (i / 5) * Math.PI * 2 + t * 2;
      return <circle key={i} cx={Math.cos(a) * 90 * k} cy={-60 + Math.sin(a) * 50 * k} r={14} fill="#ffe36e" opacity={k} />;
    })}
  </g>
);

export const TalesBook: React.FC<XY> = ({ x, y, s = 1 }) => (
  <g transform={T(x, y, s, -6)} stroke={INK} strokeWidth={5}>
    <rect x={-80} y={-110} width={160} height={200} rx={8} fill="#5a3a7a" />
    <HallowsSymbol x={0} y={-10} s={0.35} />
  </g>
);

export const HallowsSymbol: React.FC<XY & { glow?: number }> = ({ x, y, s = 1, glow = 0 }) => (
  <g transform={T(x, y, s)} fill="none" stroke="#f2d272" strokeWidth={14} strokeLinejoin="round">
    {glow ? <circle cx={0} cy={0} r={260} fill="#f2d272" opacity={0.12 * glow} stroke="none" /> : null}
    <path d="M 0 -200 L 180 130 L -180 130 Z" />
    <circle cx={0} cy={20} r={108} />
    <line x1={0} y1={-200} x2={0} y2={130} />
  </g>
);

export const ElderWand: React.FC<XY & { r?: number; glow?: number }> = ({ x, y, s = 1, r = 0, glow = 0 }) => (
  <g transform={T(x, y, s, r)}>
    {glow ? <circle cx={0} cy={-170} r={90} fill="#e8f4ff" opacity={0.35 * glow} /> : null}
    <path d="M -10 0 L -6 -60 L -12 -80 L -4 -140 L -8 -200 L 6 -200 L 4 -140 L 12 -80 L 6 -60 L 10 0 Z" fill="#e8dcc0" stroke={INK} strokeWidth={4} />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={0} cy={-40 - i * 60} r={9} fill="#cbbd9a" stroke={INK} strokeWidth={3} />
    ))}
  </g>
);

export const Doe: React.FC<XY & { t: number; k?: number }> = ({ x, y, s = 1, t, k = 1 }) => (
  <g transform={T(x, y, s)} opacity={k}>
    <circle cx={0} cy={-200} r={260} fill="#dff4ff" opacity={0.25} />
    <g stroke="#ffffff" strokeWidth={8} strokeLinecap="round" fill="#e8f7ff">
      <ellipse cx={0} cy={-170} rx={130} ry={52} />
      {[-90, -50, 70, 100].map((lx, i) => (
        <line key={i} x1={lx} y1={-130} x2={lx + Math.sin(t * 6 + i) * 12} y2={0} strokeWidth={14} />
      ))}
      <path d="M 100 -200 L 160 -300 L 200 -280 L 160 -190 Z" />
      <ellipse cx={180} cy={-300} rx={42} ry={30} />
      <path d="M 170 -326 L 160 -360 L 184 -330 M 196 -326 L 206 -360 L 212 -326" fill="#e8f7ff" strokeWidth={6} />
    </g>
    <Sparkles x={0} y={-180} intensity={1} seed={12} count={14} color="#dff4ff" />
  </g>
);

export const Knife: React.FC<XY & { r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={T(x, y, s, r)} stroke={INK} strokeWidth={4}>
    <path d="M 0 -60 L 10 20 L -10 20 Z" fill="#e8eef5" />
    <rect x={-8} y={20} width={16} height={36} fill="#3a2414" />
  </g>
);

export const Grave: React.FC<XY & { text?: string }> = ({ x, y, s = 1, text = "Un elfo libre" }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={5}>
    <path d="M -90 0 L -90 -160 Q 0 -220 90 -160 L 90 0 Z" fill="#c9b78a" />
    <text x={0} y={-90} textAnchor="middle" fontSize={26} fontFamily="Fredoka" fontWeight={700} fill="#3a2a10" stroke="none">{text}</text>
  </g>
);

export const Radio: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={4}>
    <rect x={-60} y={-50} width={120} height={80} rx={12} fill="#8a5a2b" />
    <circle cx={-20} cy={-10} r={20} fill="#3a2414" />
    <rect x={14} y={-30} width={34} height={10} fill="#ffe7a8" />
    {[0, 1].map((i) => (
      <path key={i} d={`M ${70 + i * 20} ${-40 - ((t * 40) % 20)} q 10 20 0 40`} fill="none" stroke="#fff" strokeWidth={3} />
    ))}
  </g>
);

export const IceCrack: React.FC<{ t: number; t0: number }> = ({ t, t0 }) =>
  t < t0 ? null : (
    <g stroke="#ffffff" strokeWidth={5} fill="none" opacity={Math.min(1, (t - t0) * 3)}>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <polyline key={i} points={`540,1420 ${540 + Math.cos(a) * 120},${1420 + Math.sin(a) * 30} ${540 + Math.cos(a + 0.2) * 260},${1420 + Math.sin(a + 0.2) * 60}`} />;
      })}
      {Array.from({ length: 10 }).map((_, i) => (
        <circle key={`b${i}`} cx={480 + random(`ic${i}`) * 120} cy={1420 - ((t - t0) * 100 + i * 20) % 200} r={6} fill="#e8fbff" />
      ))}
    </g>
  );

export { Floor };
