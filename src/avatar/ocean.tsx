import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";
import { H, Svg } from "../scenes/bg1";
import { Defs } from "./assets";

/** Mundo del mar de Avatar 2: arrecife, aldea Metkayina, fondo marino, criaturas y barcos. */
const L = -460;
const WW = 2000;
const rnd = (k: string | number) => random(String(k));
const T = (x: number, y: number, s = 1, flip = false, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${flip ? -s : s} ${s})`;
type XY = { x: number; y: number; s?: number; flip?: boolean; t: number };

const Grad: React.FC<{ id: string; stops: string[] }> = ({ id, stops }) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      {stops.map((c, i) => (
        <stop key={i} offset={i / (stops.length - 1)} stopColor={c} />
      ))}
    </linearGradient>
  </defs>
);

const Waves: React.FC<{ y: number; t: number; col: string; n?: number; amp?: number; speed?: number }> = ({ y, t, col, n = 3, amp = 14, speed = 1 }) => (
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const off = ((t * 60 * speed + i * 90) % 180) - 180;
      let d = `M ${L + off} ${y + i * 26}`;
      for (let k = 0; k < 14; k++) d += ` q 45 ${-amp} 90 0 t 90 0`;
      return <path key={i} d={d} stroke={col} strokeWidth={5} fill="none" opacity={0.7 - i * 0.15} />;
    })}
  </g>
);

/** Palmera de Pandora. */
const Palm: React.FC<{ x: number; y: number; s?: number; t: number; seed: number }> = ({ x, y, s = 1, t, seed }) => (
  <g transform={T(x, y, s)}>
    <path d="M 0 0 Q 30 -200 -10 -420" stroke={INK} strokeWidth={30} fill="none" />
    <path d="M 0 0 Q 30 -200 -10 -420" stroke="#8a6a3a" strokeWidth={22} fill="none" />
    {Array.from({ length: 7 }).map((_, i) => {
      const a = -150 + i * 50 + Math.sin(t * 1.2 + i + seed) * 6;
      return (
        <path key={i} d={`M -10 -420 q ${Math.cos((a * Math.PI) / 180) * 120} ${Math.sin((a * Math.PI) / 180) * 60 - 40} ${Math.cos((a * Math.PI) / 180) * 230} ${Math.sin((a * Math.PI) / 180) * 120 + 20}`} stroke={i % 2 ? "#2fb070" : "#3ad08a"} strokeWidth={26} fill="none" strokeLinecap="round" />
      );
    })}
  </g>
);

/** Casa tejida Metkayina (marui) sobre raíces. */
const Marui: React.FC<{ x: number; y: number; s?: number; col?: string }> = ({ x, y, s = 1, col = "#d8b878" }) => (
  <g transform={T(x, y, s)}>
    {[-80, -30, 30, 80].map((d, i) => (
      <path key={i} d={`M ${d} 0 Q ${d * 1.3} 80 ${d * 1.6} 160`} stroke={INK} strokeWidth={12} fill="none" />
    ))}
    <rect x={-130} y={-20} width={260} height={24} rx={10} fill="#a8804a" stroke={INK} strokeWidth={5} />
    <path d="M -120 -20 Q -130 -200 0 -230 Q 130 -200 120 -20 Z" fill={col} stroke={INK} strokeWidth={6} />
    {[-80, -40, 0, 40, 80].map((d, i) => (
      <path key={`w${i}`} d={`M ${d} -20 Q ${d * 0.6} -140 0 -225`} stroke="rgba(0,0,0,0.18)" strokeWidth={4} fill="none" />
    ))}
    <path d="M -40 -20 Q 0 -100 40 -20 Z" fill="#3a2a1a" />
  </g>
);

/** Aldea Metkayina: agua turquesa, casas tejidas, playa, palmeras, olas. */
export const ReefVillage: React.FC<{ t: number; sunset?: boolean }> = ({ t, sunset = false }) => (
  <Svg>
    <Defs />
    <Grad id={sunset ? "rvs" : "rv"} stops={sunset ? ["#3a2a6a", "#d8608a", "#ffb86a"] : ["#3aa8f0", "#8ad8f8", "#d8f6f6"]} />
    <Grad id="rvw" stops={["#3ae0d8", "#18b0c8", "#0a6a98"]} />
    <rect x={L} y={0} width={WW} height={H} fill={`url(#${sunset ? "rvs" : "rv"})`} />
    <circle cx={1150} cy={sunset ? 900 : 360} r={sunset ? 200 : 170} fill={sunset ? "#ffd27a" : "#e8f4ff"} opacity={sunset ? 0.9 : 0.6} />
    {[0, 1, 2].map((i) => (
      <ellipse key={`c${i}`} cx={L + ((t * 15 + i * 700) % WW)} cy={300 + i * 90} rx={240} ry={55} fill="#ffffff" opacity={0.7} />
    ))}
    {/* islas lejanas */}
    {[-200, 400, 1200].map((x, i) => (
      <path key={`is${i}`} d={`M ${x - 220} 1000 Q ${x} ${820 - i * 30} ${x + 220} 1000 Z`} fill="#3a8a7a" opacity={0.7} />
    ))}
    {/* mar */}
    <rect x={L} y={990} width={WW} height={H - 990} fill="url(#rvw)" />
    <Waves y={1010} t={t} col="#e8ffff" n={4} />
    {/* casas tejidas sobre el agua */}
    <Marui x={-280} y={1080} s={0.9} />
    <Marui x={60} y={1050} s={0.7} col="#e0c890" />
    <Marui x={1030} y={1060} s={0.8} />
    <Marui x={1380} y={1090} s={1.0} col="#e0c890" />
    {/* pasarelas */}
    <path d="M -160 1090 Q 40 1110 180 1060 M 900 1070 Q 1100 1100 1260 1080" stroke="#a8804a" strokeWidth={14} fill="none" />
    {/* reflejos */}
    {Array.from({ length: 16 }).map((_, i) => (
      <ellipse key={`r${i}`} cx={L + rnd(`rf${i}`) * WW} cy={1150 + rnd(`rfy${i}`) * 300} rx={40} ry={5} fill="#ffffff" opacity={0.3 + 0.3 * Math.sin(t * 3 + i)} />
    ))}
    {/* playa / plataforma donde están los personajes */}
    <path d="M -460 1300 Q 540 1240 1540 1300 L 1540 1920 L -460 1920 Z" fill="#f2dca0" stroke={INK} strokeWidth={5} />
    <path d="M -460 1300 Q 540 1240 1540 1300 L 1540 1330 Q 540 1275 -460 1330 Z" fill="#7ae8e0" opacity={0.6 + 0.2 * Math.sin(t * 2)} />
    {Array.from({ length: 30 }).map((_, i) => (
      <circle key={`sh${i}`} cx={L + rnd(`sh${i}`) * WW} cy={1400 + rnd(`shy${i}`) * 450} r={4 + rnd(`shr${i}`) * 4} fill={i % 3 ? "#e8c880" : "#ff9ab0"} />
    ))}
    <Palm x={-380} y={1340} s={1.2} t={t} seed={1} />
    <Palm x={1460} y={1340} s={1.25} t={t} seed={2} />
    {/* skimwings saltando a lo lejos */}
    {[0, 1].map((i) => {
      const k = ((t * 0.4 + i * 0.5) % 1);
      const x = 1500 - k * 1800;
      const y = 1000 - Math.sin(k * Math.PI) * 140;
      return <path key={`sk${i}`} d={`M ${x} ${y} l 40 -6 l -40 -16 l -24 10 Z`} fill="#3a6ad8" stroke={INK} strokeWidth={3} />;
    })}
  </Svg>
);

/** Fondo marino: rayos de luz, corales de colores, algas, peces, burbujas. Brillante de noche. */
export const Underwater: React.FC<{ t: number; deep?: number; night?: boolean }> = ({ t, deep = 0, night = false }) => (
  <Svg>
    <Defs />
    <Grad id={night ? "uwn" : `uw${Math.round(deep * 10)}`} stops={night ? ["#04122a", "#062a40", "#031828"] : [deep > 0.5 ? "#1a6aa8" : "#48c8e8", deep > 0.5 ? "#0a3a70" : "#1a8ac0", deep > 0.5 ? "#06204a" : "#0a5a8a"]} />
    <rect x={L} y={0} width={WW} height={H} fill={`url(#${night ? "uwn" : `uw${Math.round(deep * 10)}`})`} />
    {/* superficie */}
    {!night ? (
      <path d={`M ${L} 120 ${Array.from({ length: 20 }).map((_, i) => `q 50 ${-12 + 6 * Math.sin(t * 2 + i)} 100 0`).join(" ")} L 1540 0 L ${L} 0 Z`} fill="#bff4ff" opacity={0.5} />
    ) : null}
    {/* rayos de luz */}
    {!night
      ? [-200, 200, 600, 1000, 1350].map((x, i) => (
          <path key={`ry${i}`} d={`M ${x} 100 L ${x + 120} 100 L ${x + 300} 1500 L ${x - 60} 1500 Z`} fill="#e8ffff" opacity={0.12 + 0.06 * Math.sin(t + i)} />
        ))
      : null}
    {/* peces en cardumen */}
    {[0, 1, 2].map((g) =>
      Array.from({ length: 10 }).map((_, i) => {
        const x = 1700 - ((t * (80 + g * 30) + g * 700 + (i % 5) * 40) % 2600);
        const y = 500 + g * 220 + Math.floor(i / 5) * 40 + Math.sin(t * 3 + i) * 10;
        return <path key={`f${g}${i}`} d={`M ${x} ${y} q 20 -12 40 0 q -20 12 -40 0 l -14 -10 l 0 20 Z`} fill={night ? "#7af4ff" : ["#ffb02a", "#ff6ba0", "#ffe14d"][g]} stroke={INK} strokeWidth={2} opacity={night ? 0.8 : 1} filter={night ? "url(#glow)" : undefined} />;
      }),
    )}
    {/* algas */}
    {Array.from({ length: 16 }).map((_, i) => {
      const x = L + 40 + i * 125;
      const h = 380 + (i % 3) * 140;
      const sw = Math.sin(t * 1.2 + i) * 30;
      return <path key={`k${i}`} d={`M ${x} 1500 Q ${x + 30 + sw} ${1500 - h * 0.5} ${x + sw * 1.4} ${1500 - h}`} stroke={night ? "#1a8a7a" : "#2fa060"} strokeWidth={18} fill="none" strokeLinecap="round" />;
    })}
    {/* fondo de arena y corales */}
    <path d="M -460 1450 Q 540 1380 1540 1450 L 1540 1920 L -460 1920 Z" fill={night ? "#0a2a3a" : "#e8d8a0"} />
    {Array.from({ length: 14 }).map((_, i) => {
      const x = L + 60 + i * 145;
      const c = ["#ff6ba0", "#ff9a3a", "#c86bff", "#4ef0ff", "#ffe14d", "#7affb8"][i % 6];
      return (
        <g key={`co${i}`} transform={T(x, 1470 + (i % 2) * 20, 1 + (i % 3) * 0.2)}>
          {[-30, 0, 30].map((a, j) => (
            <path key={j} d={`M 0 0 Q ${a * 0.5} -50 ${a} -${90 + j * 20}`} stroke={c} strokeWidth={16} fill="none" strokeLinecap="round" filter={night ? "url(#glow)" : undefined} />
          ))}
          <circle cx={0} cy={-10} r={18} fill={c} stroke={INK} strokeWidth={3} />
        </g>
      );
    })}
    {/* burbujas */}
    {Array.from({ length: 24 }).map((_, i) => (
      <circle key={`b${i}`} cx={L + rnd(`bb${i}`) * WW + Math.sin(t * 2 + i) * 10} cy={1500 - ((t * 90 + i * 70) % 1400)} r={4 + (i % 3) * 3} fill="none" stroke="#e8ffff" strokeWidth={2} opacity={0.7} />
    ))}
  </Svg>
);

/** Mar abierto: horizonte, olas grandes, espuma. */
export const OpenSea: React.FC<{ t: number; storm?: boolean }> = ({ t, storm = false }) => (
  <Svg>
    <Defs />
    <Grad id={storm ? "oss" : "os"} stops={storm ? ["#3a4a6a", "#7a8aa0", "#c8b8a0"] : ["#2a90e0", "#7ac8f0", "#d8f0f8"]} />
    <Grad id="osw" stops={["#1aa0c8", "#0a6a9a", "#063a6a"]} />
    <rect x={L} y={0} width={WW} height={H} fill={`url(#${storm ? "oss" : "os"})`} />
    {[0, 1, 2, 3].map((i) => (
      <ellipse key={`c${i}`} cx={L + ((t * 20 + i * 520) % WW)} cy={280 + i * 70} rx={260} ry={60} fill={storm ? "#5a6a7a" : "#ffffff"} opacity={0.75} />
    ))}
    <rect x={L} y={900} width={WW} height={H - 900} fill="url(#osw)" />
    <Waves y={920} t={t} col="#e8ffff" n={6} amp={18} />
    {Array.from({ length: 8 }).map((_, i) => {
      const x = L + ((t * 70 + i * 260) % WW);
      return <path key={`wv${i}`} d={`M ${x - 120} ${1300 + (i % 3) * 120} Q ${x} ${1240 + (i % 3) * 120} ${x + 120} ${1300 + (i % 3) * 120}`} stroke="#ffffff" strokeWidth={10} fill="none" opacity={0.6} />;
    })}
  </Svg>
);

/** Árbol de los espíritus bajo el mar (bahía de los antepasados). */
export const SpiritTreeSea: React.FC<{ t: number; k?: number }> = ({ t, k = 1 }) => (
  <Svg>
    <Defs />
    <Grad id="sts" stops={["#06204a", "#0a3a6a", "#061a3a"]} />
    <rect x={L} y={0} width={WW} height={H} fill="url(#sts)" />
    <ellipse cx={540} cy={800} rx={800} ry={400} fill="#7affd8" opacity={0.1 * k} filter="url(#soft)" />
    <path d="M 480 1460 Q 500 1100 470 760 Q 540 700 610 760 Q 580 1100 600 1460 Z" fill="#14304a" stroke={INK} strokeWidth={6} />
    {Array.from({ length: 70 }).map((_, i) => {
      const x0 = 540 + (i - 35) * 26;
      const sw = Math.sin(t * 0.7 + i * 0.3) * 20;
      return <path key={i} d={`M ${540 + (i - 35) * 5} 780 Q ${x0} 960 ${x0 + sw} ${1360 + (i % 4) * 30}`} stroke={i % 3 ? "#9affe8" : "#e8ffff"} strokeWidth={3} fill="none" opacity={0.5 + 0.4 * k} filter="url(#glow)" />;
    })}
    <path d="M -460 1450 Q 540 1400 1540 1450 L 1540 1920 L -460 1920 Z" fill="#0a2030" />
    {Array.from({ length: 20 }).map((_, i) => (
      <circle key={`b${i}`} cx={L + rnd(`stb${i}`) * WW} cy={1500 - ((t * 60 + i * 80) % 1400)} r={4} fill="#bff4ff" opacity={0.6} filter="url(#glow)" />
    ))}
  </Svg>
);

/** Selva incendiada por las naves que aterrizan. */
export const BurningForest: React.FC<{ t: number; k?: number }> = ({ t, k = 1 }) => (
  <Svg>
    <Defs />
    <Grad id="bf" stops={["#1a0a14", "#5a1a1a", "#d8502a"]} />
    <rect x={L} y={0} width={WW} height={H} fill="url(#bf)" />
    {Array.from({ length: 14 }).map((_, i) => (
      <path key={`tr${i}`} d={`M ${L + i * 150} 1300 L ${L + i * 150 + 20} ${700 + (i % 3) * 80} L ${L + i * 150 + 50} 1300 Z`} fill="#1a0e0a" />
    ))}
    {Array.from({ length: 16 }).map((_, i) => {
      const x = L + 60 + i * 125;
      const h = 160 + 70 * Math.sin(t * 7 + i);
      return (
        <g key={`fi${i}`} opacity={k}>
          <ellipse cx={x} cy={1250} rx={90} ry={h} fill="#ff7a1a" opacity={0.5} filter="url(#soft)" />
          <path d={`M ${x - 40} 1300 Q ${x - 50} ${1300 - h * 0.7} ${x} ${1300 - h} Q ${x + 50} ${1300 - h * 0.7} ${x + 40} 1300 Z`} fill="#ffb02a" stroke="#ff5a1a" strokeWidth={4} />
        </g>
      );
    })}
    {Array.from({ length: 10 }).map((_, i) => (
      <circle key={`sm${i}`} cx={L + i * 220 + Math.sin(t + i) * 30} cy={600 - ((t * 50 + i * 90) % 500)} r={120} fill="#2a1a1a" opacity={0.5} filter="url(#soft)" />
    ))}
    <path d="M -460 1300 Q 540 1260 1540 1300 L 1540 1920 L -460 1920 Z" fill="#2a1410" />
    {Array.from({ length: 30 }).map((_, i) => (
      <circle key={`em${i}`} cx={L + rnd(`em${i}`) * WW} cy={1300 - ((t * 120 + i * 60) % 1100)} r={4} fill="#ffcf3a" filter="url(#glow)" />
    ))}
  </Svg>
);

// ---------------------------------------------------------------- criaturas del mar

/** Ilu: criatura marina de cuello largo (se monta). */
export const Ilu: React.FC<XY & { swim?: number }> = ({ x, y, s = 1, flip, t, swim = 1 }) => {
  const w = Math.sin(t * 5) * swim;
  return (
    <g transform={T(x, y, s, flip)}>
      <path d={`M -180 0 Q -260 ${20 + w * 30} -330 ${-10 + w * 40}`} stroke={INK} strokeWidth={34} fill="none" strokeLinecap="round" />
      <path d={`M -180 0 Q -260 ${20 + w * 30} -330 ${-10 + w * 40}`} stroke="#5ab8d8" strokeWidth={24} fill="none" strokeLinecap="round" />
      <path d="M -200 0 Q -190 -70 -40 -80 Q 100 -80 140 -30 Q 140 30 0 40 Q -160 40 -200 0 Z" fill="#6ac8e8" stroke={INK} strokeWidth={6} />
      <path d={`M -60 20 L -120 ${90 + w * 30} L -20 30 Z M 60 20 L 30 ${100 - w * 30} L 100 20 Z`} fill="#4aa8c8" stroke={INK} strokeWidth={4} />
      <path d="M 120 -40 Q 200 -160 260 -200" stroke={INK} strokeWidth={34} fill="none" strokeLinecap="round" />
      <path d="M 120 -40 Q 200 -160 260 -200" stroke="#6ac8e8" strokeWidth={24} fill="none" strokeLinecap="round" />
      <path d="M 240 -220 Q 320 -230 340 -190 Q 310 -170 250 -180 Z" fill="#7ad8f0" stroke={INK} strokeWidth={5} />
      <circle cx={290} cy={-205} r={6} fill={INK} />
      {[-120, -60, 0, 60].map((d, i) => (
        <path key={i} d={`M ${d} -76 q 10 30 0 60`} stroke="#bff4ff" strokeWidth={6} fill="none" />
      ))}
    </g>
  );
};

/** Skimwing: pez volador gigante con alas. */
export const Skimwing: React.FC<XY & { r?: number }> = ({ x, y, s = 1, flip, t, r = 0 }) => {
  const w = Math.sin(t * 10) * 0.3;
  return (
    <g transform={T(x, y, s, flip, r)}>
      <path d="M -260 0 L -340 -40 L -320 0 L -340 40 Z" fill="#2a4a9a" stroke={INK} strokeWidth={5} />
      <path d={`M -80 -10 L -20 ${-170 - w * 80} L 80 -10 Z`} fill="#4a8ae8" stroke={INK} strokeWidth={5} opacity={0.9} />
      <path d="M -260 0 Q -200 -50 0 -50 Q 200 -40 260 0 Q 200 30 0 36 Q -200 30 -260 0 Z" fill="#3a6ad8" stroke={INK} strokeWidth={6} />
      <path d="M 200 -20 L 320 0 L 200 16 Z" fill="#2a4a9a" stroke={INK} strokeWidth={4} />
      <circle cx={200} cy={-10} r={7} fill="#ffd23a" stroke={INK} strokeWidth={2} />
      <path d={`M -40 10 L 40 ${150 + w * 80} L 100 10 Z`} fill="#5a9af0" stroke={INK} strokeWidth={5} />
      {[-160, -100, -40, 20, 80].map((d, i) => (
        <path key={i} d={`M ${d} -46 q 6 40 0 76`} stroke="#ffe14d" strokeWidth={5} fill="none" />
      ))}
    </g>
  );
};

/** Tulkun: ballena gigante e inteligente. scar = aleta lastimada (Payakan). */
export const Tulkun: React.FC<XY & { scar?: boolean; swim?: number; col?: string }> = ({ x, y, s = 1, flip, t, scar = false, swim = 1, col = "#8a9ab8" }) => {
  const w = Math.sin(t * 2) * swim;
  return (
    <g transform={T(x, y, s, flip)}>
      <path d={`M -420 0 Q -520 ${-20 + w * 40} -600 ${-90 + w * 60} M -420 0 Q -520 ${30 + w * 40} -600 ${100 + w * 60}`} stroke={INK} strokeWidth={50} fill="none" strokeLinecap="round" />
      <path d={`M -420 0 Q -520 ${-20 + w * 40} -600 ${-90 + w * 60} M -420 0 Q -520 ${30 + w * 40} -600 ${100 + w * 60}`} stroke={col} strokeWidth={38} fill="none" strokeLinecap="round" />
      <path d="M -450 0 Q -420 -170 -60 -190 Q 280 -200 420 -60 Q 460 20 380 80 Q 100 150 -250 100 Q -440 70 -450 0 Z" fill={col} stroke={INK} strokeWidth={8} />
      {/* panza clara */}
      <path d="M -300 80 Q 0 140 380 70 Q 300 110 0 130 Q -200 120 -300 80 Z" fill="#e8eef6" />
      {/* marcas */}
      {[-280, -180, -80, 20, 120, 220].map((d, i) => (
        <path key={i} d={`M ${d} -180 q 20 50 0 110`} stroke="#5a6a8a" strokeWidth={10} fill="none" opacity={0.6} />
      ))}
      {/* cabeza con placas */}
      <path d="M 220 -150 Q 380 -150 430 -50 Q 360 -90 240 -100 Z" fill="#a8b8d0" stroke={INK} strokeWidth={5} />
      <circle cx={340} cy={-30} r={14} fill="#ffd23a" stroke={INK} strokeWidth={4} />
      <circle cx={344} cy={-32} r={6} fill={INK} />
      {/* aleta */}
      {scar ? (
        <path d={`M 0 60 L -40 ${220 + w * 30} L 30 200 L 50 230 L 90 70 Z`} fill={col} stroke={INK} strokeWidth={6} />
      ) : (
        <path d={`M 0 60 L -60 ${260 + w * 30} L 100 70 Z`} fill={col} stroke={INK} strokeWidth={6} />
      )}
      {scar ? <path d="M -10 120 l 30 20 M 0 160 l 26 14" stroke="#c84a4a" strokeWidth={6} /> : null}
    </g>
  );
};

/** Tiburón gigante (akula). */
export const SeaPredator: React.FC<XY & { bite?: number }> = ({ x, y, s = 1, flip, t, bite = 0 }) => {
  const w = Math.sin(t * 6);
  return (
    <g transform={T(x, y, s, flip)}>
      <path d={`M -300 0 L -400 ${-70 + w * 20} L -380 0 L -400 ${70 + w * 20} Z`} fill="#3a4a5a" stroke={INK} strokeWidth={6} />
      <path d="M -320 0 Q -280 -110 0 -110 Q 220 -100 320 -20 L 330 20 Q 200 90 0 90 Q -260 80 -320 0 Z" fill="#4a5a6a" stroke={INK} strokeWidth={7} />
      <path d="M -40 -110 L 20 -220 L 80 -100 Z" fill="#3a4a5a" stroke={INK} strokeWidth={6} />
      <path d={`M 160 30 Q 260 ${50 + bite * 60} 330 20`} stroke={INK} strokeWidth={6} fill={bite > 0.2 ? "#7a1a2a" : "none"} />
      {bite > 0.2 ? [180, 220, 260, 300].map((d, i) => <path key={i} d={`M ${d} ${36 + bite * 10} l 8 -18 l 8 18`} fill="#fff" />) : null}
      <circle cx={250} cy={-30} r={9} fill="#ff3a3a" />
      {[-200, -140, -80].map((d, i) => (
        <path key={i} d={`M ${d} -60 q 10 30 0 60`} stroke="#2a3a4a" strokeWidth={6} fill="none" />
      ))}
    </g>
  );
};

// ---------------------------------------------------------------- máquinas del mar

/** Nave que aterriza con fuego (llegada de los humanos). */
export const Rocket: React.FC<XY & { fire?: number }> = ({ x, y, s = 1, t, fire = 1 }) => (
  <g transform={T(x, y, s)}>
    <ellipse cx={0} cy={220} rx={120 * fire} ry={300 * fire} fill="#ffb02a" opacity={0.6} />
    <path d={`M -60 160 Q 0 ${420 + 40 * Math.sin(t * 20)} 60 160 Z`} fill="#fff4c2" opacity={fire} />
    <path d="M -90 160 L -110 -220 Q 0 -360 110 -220 L 90 160 Z" fill="#d8dee6" stroke={INK} strokeWidth={8} />
    <path d="M -90 160 L -170 220 L -100 60 Z M 90 160 L 170 220 L 100 60 Z" fill="#8a96a4" stroke={INK} strokeWidth={6} />
    {[-40, 0, 40].map((d, i) => (
      <circle key={i} cx={d} cy={-150} r={14} fill="#6ac8ff" stroke={INK} strokeWidth={4} />
    ))}
    <text x={0} y={40} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={44} fill="#e8b923">RDA</text>
  </g>
);

/** Barco ballenero gigante. */
export const WhalerShip: React.FC<XY & { tilt?: number; sink?: number }> = ({ x, y, s = 1, flip, t, tilt = 0, sink = 0 }) => (
  <g transform={T(x, y + sink * 600, s, flip, tilt)}>
    <path d="M -520 -40 L 520 -40 L 440 160 L -440 160 Z" fill="#4a5058" stroke={INK} strokeWidth={8} />
    <rect x={-520} y={-60} width={1040} height={30} fill="#c0392b" stroke={INK} strokeWidth={5} />
    <path d="M -300 -60 L -300 -260 L 0 -260 L 60 -60 Z" fill="#d8dee6" stroke={INK} strokeWidth={7} />
    {[-260, -180, -100].map((d, i) => (
      <rect key={i} x={d} y={-230} width={50} height={40} fill="#6ac8ff" stroke={INK} strokeWidth={4} />
    ))}
    <rect x={-200} y={-360} width={30} height={100} fill="#5a6068" stroke={INK} strokeWidth={4} />
    <circle cx={-185} cy={-380 - ((t * 40) % 80)} r={26} fill="#666" opacity={0.5} />
    {/* grúa y arpón */}
    <path d="M 200 -60 L 300 -280 L 420 -200" stroke="#e8b923" strokeWidth={16} fill="none" strokeLinejoin="round" />
    <line x1={420} y1={-200} x2={420} y2={-60} stroke={INK} strokeWidth={4} />
    <rect x={380} y={-100} width={80} height={40} fill="#3a3e44" stroke={INK} strokeWidth={4} />
    <text x={-80} y={80} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={48} fill="#e8e8e8">SEA DRAGON</text>
  </g>
);

/** Lancha cazadora rápida con arpón. */
export const HunterBoat: React.FC<XY & { fire?: boolean }> = ({ x, y, s = 1, flip, t, fire = false }) => (
  <g transform={T(x, y + Math.sin(t * 6) * 6, s, flip)}>
    <path d="M -160 0 L 170 0 L 130 50 L -140 50 Z" fill="#d8dee6" stroke={INK} strokeWidth={6} />
    <rect x={-60} y={-50} width={90} height={50} rx={6} fill="#3a4654" stroke={INK} strokeWidth={5} />
    <line x1={60} y1={-10} x2={150} y2={-40} stroke={INK} strokeWidth={10} />
    {fire ? <line x1={150} y1={-40} x2={360} y2={-110} stroke="#5a5a5a" strokeWidth={6} strokeDasharray="10 6" /> : null}
    <path d={`M -170 30 q -40 ${10 + 6 * Math.sin(t * 20)} -90 0`} stroke="#ffffff" strokeWidth={10} fill="none" />
  </g>
);

/** Arpón disparado. */
export const Harpoon: React.FC<{ x0: number; y0: number; x1: number; y1: number; t: number; t0: number; dur?: number }> = ({ x0, y0, x1, y1, t, t0, dur = 0.4 }) => {
  if (t < t0) return null;
  const k = Math.min(1, (t - t0) / dur);
  const x = x0 + (x1 - x0) * k;
  const y = y0 + (y1 - y0) * k;
  const a = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  return (
    <g>
      <line x1={x0} y1={y0} x2={x} y2={y} stroke="#5a5a5a" strokeWidth={4} strokeDasharray="10 6" />
      <g transform={`translate(${x} ${y}) rotate(${a})`}>
        <line x1={-60} y1={0} x2={10} y2={0} stroke="#8a8a8a" strokeWidth={10} />
        <path d="M 10 -14 L 40 0 L 10 14 Z" fill="#c8ced6" stroke={INK} strokeWidth={3} />
      </g>
    </g>
  );
};
