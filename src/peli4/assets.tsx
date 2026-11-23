import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";
import { Sparkles } from "../characters/Stickman";
import { Grad, H, Stars, Svg, W } from "../scenes/bg1";
import { MiniStick } from "../scenes/props";

type XY = { x: number; y: number; s?: number };
const T = (x: number, y: number, s = 1, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${s})`;

/* ================= FONDOS ================= */

export const Stadium: React.FC<{ t: number; fireworks?: boolean }> = ({ t, fireworks = true }) => (
  <Svg>
    <defs>
      <Grad id="std" stops={["#0b0f33", "#1d2a6b", "#3b4f9f"]} />
    </defs>
    <rect width={W} height={H} fill="url(#std)" />
    <Stars t={t} n={50} h={600} seed="st" />
    {fireworks
      ? [0, 1, 2].map((i) => {
          const k = ((t * 0.7 + i * 0.33) % 1);
          const cx = 200 + i * 340;
          const cy = 300 + (i % 2) * 120;
          return (
            <g key={i} opacity={1 - k}>
              {Array.from({ length: 14 }).map((_, j) => {
                const a = (j / 14) * Math.PI * 2;
                return <circle key={j} cx={cx + Math.cos(a) * k * 160} cy={cy + Math.sin(a) * k * 160} r={8} fill={["#ff6b6b", "#7dff9a", "#ffe14d"][i]} />;
              })}
            </g>
          );
        })
      : null}
    {/* gradas */}
    {[0, 1, 2, 3].map((r) => (
      <g key={r}>
        <rect x={-20} y={700 + r * 130} width={W + 40} height={130} fill={["#2f6fe4", "#c8302f", "#2fae4f", "#f2c230"][r]} stroke={INK} strokeWidth={5} />
        {Array.from({ length: 24 }).map((_, i) => (
          <circle key={i} cx={20 + i * 45 + (r % 2) * 22} cy={730 + r * 130 - Math.abs(Math.sin(t * 6 + i + r)) * 8} r={14} fill="#ffe0c2" stroke={INK} strokeWidth={2} />
        ))}
      </g>
    ))}
    <rect x={0} y={1220} width={W} height={H - 1220} fill="#3a8f3a" />
    {Array.from({ length: 8 }).map((_, i) => (
      <rect key={i} x={0} y={1220 + i * 90} width={W} height={45} fill="#348534" />
    ))}
  </Svg>
);

export const Camp: React.FC<{ t: number; fire?: boolean }> = ({ t, fire = true }) => (
  <Svg>
    <defs>
      <Grad id="cmp" stops={["#050a20", "#14204f", "#2a2a5a"]} />
    </defs>
    <rect width={W} height={H} fill="url(#cmp)" />
    <Stars t={t} n={60} h={800} seed="cp" />
    {[80, 330, 600, 860].map((x, i) => (
      <g key={i} stroke={INK} strokeWidth={5}>
        <path d={`M ${x - 110} 1270 L ${x} ${1020 - (i % 2) * 40} L ${x + 110} 1270 Z`} fill={["#c0392b", "#2f6fe4", "#e67e22", "#8e44ad"][i]} />
        <path d={`M ${x - 20} 1270 L ${x} 1180 L ${x + 20} 1270 Z`} fill="#1b1b2f" />
      </g>
    ))}
    {fire
      ? [200, 720].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={1200} r={120} fill="#ff8a1a" opacity={0.18 + 0.06 * Math.sin(t * 9 + i)} />
            <path d={`M ${x - 40} 1240 Q ${x} ${1120 - 20 * Math.abs(Math.sin(t * 10 + i))} ${x + 40} 1240 Z`} fill="#ff8a1a" />
          </g>
        ))
      : null}
    <rect x={0} y={1270} width={W} height={H - 1270} fill="#1a3a20" />
  </Svg>
);

export const Underwater: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <defs>
      <Grad id="uw" stops={["#3fb6d6", "#1d6f9a", "#0b3350"]} />
    </defs>
    <rect width={W} height={H} fill="url(#uw)" />
    {Array.from({ length: 6 }).map((_, i) => (
      <path key={i} d={`M ${i * 200 - 60} 0 L ${i * 200 + 40} 0 L ${i * 200 + 160 + Math.sin(t + i) * 40} 1300 L ${i * 200 + 60 + Math.sin(t + i) * 40} 1300 Z`} fill="#bff4ff" opacity={0.06} />
    ))}
    {Array.from({ length: 12 }).map((_, i) => {
      const x = 40 + i * 90;
      return <path key={i} d={`M ${x} 1920 Q ${x + Math.sin(t * 2 + i) * 40} 1600 ${x + Math.sin(t * 1.5 + i) * 60} ${1300 + (i % 3) * 60}`} stroke="#2f8f4a" strokeWidth={18} fill="none" strokeLinecap="round" />;
    })}
    {Array.from({ length: 20 }).map((_, i) => (
      <circle key={i} cx={(random(`b${i}`) * 1080) % 1080} cy={H - ((t * (60 + random(`v${i}`) * 80) + random(`y${i}`) * H) % H)} r={4 + random(`r${i}`) * 8} fill="none" stroke="#e8fbff" strokeWidth={3} opacity={0.7} />
    ))}
    <rect x={0} y={1500} width={W} height={420} fill="#7a6a4a" opacity={0.6} />
  </Svg>
);

export const Maze: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <defs>
      <Grad id="mz" stops={["#0a1530", "#1c2f5a", "#2a4a6a"]} />
    </defs>
    <rect width={W} height={H} fill="url(#mz)" />
    <Stars t={t} n={40} h={500} seed="mz" />
    {[
      [0, 520, 260],
      [820, 520, 260],
      [120, 640, 300],
      [660, 640, 300],
    ].map(([x, y, w], i) => (
      <rect key={i} x={x} y={y} width={w} height={1270 - y} fill={i < 2 ? "#123d24" : "#174d2d"} stroke={INK} strokeWidth={5} />
    ))}
    <rect x={0} y={1270} width={W} height={H - 1270} fill="#1a3a20" />
    {Array.from({ length: 5 }).map((_, i) => (
      <ellipse key={i} cx={((t * 40 + i * 300) % 1500) - 200} cy={1250 + i * 20} rx={300} ry={36} fill="#cfe8ff" opacity={0.08} />
    ))}
  </Svg>
);

export const Graveyard: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <defs>
      <Grad id="gy" stops={["#0b0f1a", "#1d2333", "#2f2a3f"]} />
    </defs>
    <rect width={W} height={H} fill="url(#gy)" />
    <circle cx={820} cy={300} r={80} fill="#d9e4ff" opacity={0.85} />
    <path d="M 40 1270 L 40 760 L 160 640 L 280 760 L 280 1270 Z" fill="#232838" stroke="#000" strokeWidth={5} />
    {[120, 360, 820, 980].map((x, i) => (
      <g key={i} stroke="#000" strokeWidth={5}>
        <path d={`M ${x - 50} 1270 L ${x - 50} ${1120 - (i % 2) * 40} Q ${x} ${1060 - (i % 2) * 40} ${x + 50} ${1120 - (i % 2) * 40} L ${x + 50} 1270 Z`} fill="#5a5f70" />
      </g>
    ))}
    <g stroke="#000" strokeWidth={6}>
      <rect x={480} y={980} width={120} height={290} fill="#6a6f80" />
      <rect x={430} y={1040} width={220} height={50} fill="#6a6f80" />
    </g>
    <rect x={0} y={1270} width={W} height={H - 1270} fill="#1f2a1f" />
    {Array.from({ length: 6 }).map((_, i) => (
      <ellipse key={i} cx={((t * 30 + i * 260) % 1500) - 200} cy={1230 + i * 25} rx={340} ry={40} fill="#c9d4e8" opacity={0.1} />
    ))}
  </Svg>
);

/* ================= OBJETOS ================= */

export const DarkMark: React.FC<XY & { k?: number }> = ({ x, y, s = 1, k = 1 }) => (
  <g transform={T(x, y, s)} opacity={k}>
    <circle r={260} fill="#3fdc6b" opacity={0.15} />
    <g fill="#3fdc6b" stroke="#0f5a2a" strokeWidth={6}>
      <path d="M -110 -40 Q -120 -170 0 -170 Q 120 -170 110 -40 Q 110 30 60 50 L 60 90 L -60 90 L -60 50 Q -110 30 -110 -40 Z" />
    </g>
    <circle cx={-45} cy={-60} r={28} fill="#0b2a14" />
    <circle cx={45} cy={-60} r={28} fill="#0b2a14" />
    <path d="M -10 -10 L 0 -30 L 10 -10 Z" fill="#0b2a14" />
    <path d="M 0 90 Q -80 160 0 220 Q 90 280 20 340" stroke="#3fdc6b" strokeWidth={30} fill="none" strokeLinecap="round" />
  </g>
);

export const Carriage: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y + Math.sin(t * 2) * 15, s)} stroke={INK} strokeWidth={6} strokeLinejoin="round">
    {[0, 1].map((i) => (
      <g key={i} transform={`translate(${-330 + i * 70} ${-40 + i * 20})`}>
        <ellipse cx={0} cy={0} rx={80} ry={36} fill="#fff" />
        <path d={`M -10 -20 Q -60 ${-90 - Math.sin(t * 8) * 30} -130 -60 Q -60 -30 -10 -10 Z`} fill="#e8f4ff" />
        <path d="M 60 -20 Q 90 -60 110 -50 L 100 -20 Z" fill="#fff" />
      </g>
    ))}
    <rect x={-120} y={-170} width={260} height={170} rx={40} fill="#7cc8ff" />
    <rect x={-80} y={-140} width={80} height={80} rx={12} fill="#fff6dc" />
    <circle cx={-80} cy={10} r={36} fill="#d9a441" />
    <circle cx={100} cy={10} r={36} fill="#d9a441" />
  </g>
);

export const Ship: React.FC<XY & { t: number; rise?: number }> = ({ x, y, s = 1, t, rise = 1 }) => (
  <g transform={T(x, y + (1 - rise) * 400, s, Math.sin(t * 1.5) * 3)} stroke={INK} strokeWidth={6} strokeLinejoin="round">
    <path d="M -300 0 L 300 0 L 240 120 L -240 120 Z" fill="#5a3a22" />
    <rect x={-10} y={-400} width={20} height={400} fill="#3a2414" />
    <path d="M 10 -380 Q 180 -260 10 -120 Z" fill="#e8e0d0" />
    <path d="M -10 -360 Q -160 -260 -10 -150 Z" fill="#d8d0c0" />
    {[-200, -100, 0, 100, 200].map((wx, i) => (
      <circle key={i} cx={wx} cy={60} r={14} fill="#ffd36b" />
    ))}
    <path d="M -340 120 Q -170 90 0 120 T 340 120 L 340 200 L -340 200 Z" fill="#1d4a7a" opacity={0.9} />
  </g>
);

export const GobletFire: React.FC<XY & { t: number; burst?: number; color?: string }> = ({ x, y, s = 1, t, burst = 0, color = "#5ad1ff" }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={6} strokeLinejoin="round">
    <circle cx={0} cy={-260} r={180 + burst * 120} fill={color} opacity={0.15 + burst * 0.2} stroke="none" />
    <path d="M -110 -220 L 110 -220 Q 100 -100 20 -80 L 20 -20 L 80 0 L -80 0 L -20 -20 L -20 -80 Q -100 -100 -110 -220 Z" fill="#8a6a45" />
    {[0, 1, 2].map((i) => {
      const hgt = 140 + burst * 160 - i * 30 + Math.sin(t * 14 + i) * 20;
      return <path key={i} d={`M ${-80 + i * 25} -220 Q ${-60 + i * 20} ${-220 - hgt * 0.6} ${Math.sin(t * 9 + i) * 20} ${-220 - hgt} Q ${60 - i * 20} ${-220 - hgt * 0.6} ${80 - i * 25} -220 Z`} fill={i === 0 ? "#2f8fff" : i === 1 ? color : "#e8fbff"} stroke={i === 0 ? INK : "none"} strokeWidth={4} />;
    })}
  </g>
);

export const NameSlip: React.FC<XY & { name: string; r?: number }> = ({ x, y, s = 1, name, r = 0 }) => (
  <g transform={T(x, y, s, r)}>
    <rect x={-150} y={-40} width={300} height={80} fill="#f7ecd0" stroke={INK} strokeWidth={5} />
    <path d="M -150 30 l 20 -10 l 20 10 l 20 -10 l 20 10" stroke="#b8860b" strokeWidth={3} fill="none" />
    <text x={0} y={14} textAnchor="middle" fontSize={40} fontFamily="Fredoka" fontWeight={700} fill="#1b1b2f">{name}</text>
  </g>
);

export const Dragon: React.FC<XY & { t: number; fire?: number; flip?: boolean }> = ({ x, y, s = 1, t, fire = 0, flip = false }) => {
  const wg = Math.sin(t * 5) * 30;
  return (
    <g transform={`${T(x, y, s)} scale(${flip ? -1 : 1} 1)`} stroke={INK} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round">
      <path d={`M -60 -300 L -260 ${-560 - wg} L -200 -380 L -340 ${-420 - wg} L -160 -260 Z`} fill="#3a2a2a" />
      <path d="M -200 -200 Q -380 -160 -420 -40 Q -330 -120 -220 -140" fill="#2a1d1d" />
      <ellipse cx={0} cy={-220} rx={220} ry={110} fill="#2a1d1d" />
      {[-130, -60, 70, 140].map((lx, i) => (
        <path key={i} d={`M ${lx} -150 L ${lx + 10} 0 L ${lx + 40} 0`} fill="none" strokeWidth={24} stroke="#2a1d1d" />
      ))}
      <path d="M 180 -260 Q 260 -360 300 -420 L 400 -400 L 420 -360 L 330 -330 Q 280 -280 220 -200 Z" fill="#3a2a2a" />
      <path d="M 300 -420 L 290 -470 L 320 -430 M 340 -416 L 345 -466 L 360 -420" fill="#c9a441" strokeWidth={4} />
      <circle cx={350} cy={-400} r={10} fill="#ffe66d" stroke="none" />
      {[-140, -60, 20, 100].map((sx, i) => (
        <path key={i} d={`M ${sx} -325 l 20 -36 l 20 34`} fill="#c9a441" strokeWidth={4} />
      ))}
      {fire > 0 ? (
        <g opacity={fire}>
          <path d={`M 420 -370 Q 600 ${-420 + Math.sin(t * 20) * 20} 760 -360 Q 600 -300 420 -350 Z`} fill="#ff8a1a" stroke="none" />
          <path d={`M 420 -366 Q 560 ${-390 + Math.sin(t * 24) * 14} 680 -360 Q 560 -330 420 -356 Z`} fill="#ffe36e" stroke="none" />
        </g>
      ) : null}
    </g>
  );
};

export const GoldenEgg: React.FC<XY & { glow?: number; open?: number }> = ({ x, y, s = 1, glow = 1, open = 0 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={5}>
    <circle cx={0} cy={-10} r={90} fill="#ffe36e" opacity={0.2 * glow} />
    <path d={`M -50 0 Q -55 -90 0 -100 Q 55 -90 50 0 Z`} fill="#f2c230" transform={`translate(0 ${-open * 30}) rotate(${-open * 20})`} />
    <path d="M -50 0 Q -50 60 0 66 Q 50 60 50 0 Z" fill="#e0a820" />
    <path d="M -30 -40 l 20 10 l 20 -10 l 20 10" stroke="#fff6c2" strokeWidth={4} fill="none" />
  </g>
);

export const Hostage: React.FC<XY & { color: string; head: string; hair?: string; t: number }> = ({ x, y, s = 1, color, head, hair, t }) => (
  <g transform={T(x, y + Math.sin(t * 1.5 + x) * 10, s)}>
    <line x1={0} y1={0} x2={0} y2={300} stroke="#6b4a2a" strokeWidth={8} />
    <g opacity={0.95}>
      <MiniStick x={0} y={0} s={0.8} color={color} head={head} hair={hair} />
    </g>
    <path d="M -20 -150 l 40 0 M -20 -130 l 40 0" stroke="#6b4a2a" strokeWidth={6} />
  </g>
);

export const BigCauldron: React.FC<XY & { t: number; boil?: number }> = ({ x, y, s = 1, t, boil = 0 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={8}>
    <circle cx={0} cy={-260} r={200 + boil * 150} fill="#9a9aa8" opacity={0.15 * boil} stroke="none" />
    <path d="M -220 -200 Q -250 40 0 60 Q 250 40 220 -200 Z" fill="#2a2a33" />
    <ellipse cx={0} cy={-200} rx={230} ry={50} fill="#4a4a5a" />
    <ellipse cx={0} cy={-200} rx={200} ry={38} fill={boil > 0.5 ? "#c9d4e8" : "#7a8a5a"} />
    {Array.from({ length: 5 }).map((_, i) => (
      <circle key={i} cx={-140 + i * 70} cy={-210 - ((t * 80 * (1 + boil) + i * 40) % (120 + boil * 300))} r={14 + boil * 20} fill="#c9d4e8" opacity={0.7} strokeWidth={0} />
    ))}
    {[-160, 0, 160].map((fx, i) => (
      <path key={i} d={`M ${fx - 30} 80 Q ${fx} ${20 - Math.abs(Math.sin(t * 9 + i)) * 30} ${fx + 30} 80 Z`} fill="#ff8a1a" strokeWidth={0} />
    ))}
  </g>
);

export const BeamDuel: React.FC<{ t: number; x0: number; y0: number; x1: number; y1: number; k?: number }> = ({ t, x0, y0, x1, y1, k = 1 }) => {
  const mx = (x0 + x1) / 2 + Math.sin(t * 3) * 40;
  const my = (y0 + y1) / 2;
  return (
    <g opacity={k}>
      <line x1={x0} y1={y0} x2={mx} y2={my} stroke="#ff3b3b" strokeWidth={16} strokeLinecap="round" />
      <line x1={x0} y1={y0} x2={mx} y2={my} stroke="#ffe14d" strokeWidth={6} />
      <line x1={x1} y1={y1} x2={mx} y2={my} stroke="#3fdc6b" strokeWidth={16} strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={mx} y2={my} stroke="#e8fff0" strokeWidth={6} />
      <circle cx={mx} cy={my} r={50 + Math.sin(t * 20) * 10} fill="#ffe36e" />
      <Sparkles x={mx} y={my} intensity={1.4} seed={7} count={20} color="#ffe36e" />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI;
        return <path key={i} d={`M ${mx - 420} ${my + 380} Q ${mx + Math.cos(a) * -420 + 0} ${my - Math.sin(a) * 420} ${mx + 420} ${my + 380}`} stroke="#ffd23a" strokeWidth={4} fill="none" opacity={0.35} />;
      })}
    </g>
  );
};

export const Echo: React.FC<XY & { color: string; head: string; hair?: string; glasses?: boolean; k?: number; t: number }> = ({ x, y, s = 1, color, head, hair, glasses, k = 1, t }) => (
  <g opacity={0.55 * k} transform={`translate(0 ${Math.sin(t * 2 + x) * 10})`}>
    <circle cx={x} cy={y - 180 * s} r={180 * s} fill="#e8f7ff" opacity={0.3} />
    <MiniStick x={x} y={y} s={s} color={color} head={head} hair={hair} glasses={glasses} arms="wave" t={t} />
  </g>
);
