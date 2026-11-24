import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";
import { H, Svg } from "../scenes/bg1";

/**
 * Selva de Pandora con profundidad: capas con bruma, troncos orgánicos con raíces,
 * helechos, hojas gigantes, lianas, flores, rayos de luz y vida que se mueve.
 * Se dibuja de x=-460 a 1540 para llenar el 16:9.
 */
const L = -460;
const WW = 2000;
const rnd = (k: string | number) => random(String(k));
const T = (x: number, y: number, s = 1, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${s})`;

type Pal = {
  sky: string[];
  far: string;
  mid: string;
  midDark: string;
  near: string;
  nearDark: string;
  leaf: string;
  leaf2: string;
  ground: string[];
  haze: string;
  glow?: string[];
};

const DAYP: Pal = {
  sky: ["#48b8f8", "#9ae8f4", "#e2fbd6"],
  far: "#6ec0a4",
  mid: "#3f9a72",
  midDark: "#2a7258",
  near: "#3a6a3a",
  nearDark: "#244a28",
  leaf: "#2fb050",
  leaf2: "#7ade5a",
  ground: ["#4fb83f", "#2f8a2a", "#1f5a20"],
  haze: "#dff4e6",
};
const NIGHTP: Pal = {
  sky: ["#040a20", "#0a1c3c", "#0b2c3a"],
  far: "#123048",
  mid: "#0f3040",
  midDark: "#0a2030",
  near: "#0c2830",
  nearDark: "#061820",
  leaf: "#0f3a3a",
  leaf2: "#145050",
  ground: ["#0c3438", "#072226", "#03141a"],
  haze: "#1a4a5a",
  glow: ["#4ef0ff", "#c86bff", "#7affb8", "#ff6bd6", "#b0ff4e"],
};

/** Tronco orgánico con raíces en arco. */
const Trunk: React.FC<{ x: number; y: number; h: number; w: number; col: string; dark: string; lean?: number; seed: number; glow?: string }> = ({ x, y, h, w, col, dark, lean = 0, seed, glow }) => {
  const top = y - h;
  const lx = lean * h;
  return (
    <g>
      {/* raíces */}
      {[-1, 1].map((sd) => (
        <path key={sd} d={`M ${x + sd * w * 0.4} ${y - h * 0.18} Q ${x + sd * w * 1.3} ${y - h * 0.05} ${x + sd * w * 1.9} ${y + 10} L ${x + sd * w * 1.2} ${y + 10} Q ${x + sd * w * 0.9} ${y - h * 0.06} ${x + sd * w * 0.3} ${y - h * 0.08} Z`} fill={col} stroke={INK} strokeWidth={4} />
      ))}
      <path
        d={`M ${x - w * 0.55} ${y + 6} C ${x - w * 0.5} ${y - h * 0.4} ${x - w * 0.42 + lx * 0.5} ${y - h * 0.7} ${x - w * 0.36 + lx} ${top} L ${x + w * 0.36 + lx} ${top} C ${x + w * 0.42 + lx * 0.5} ${y - h * 0.7} ${x + w * 0.5} ${y - h * 0.4} ${x + w * 0.55} ${y + 6} Z`}
        fill={col}
        stroke={INK}
        strokeWidth={5}
      />
      {/* corteza */}
      {[0.2, 0.45, 0.7].map((k, i) => (
        <path key={i} d={`M ${x + (k - 0.5) * w * 0.8} ${y} C ${x + (k - 0.5) * w * 0.7} ${y - h * 0.5} ${x + (k - 0.5) * w * 0.6 + lx * 0.6} ${y - h * 0.8} ${x + (k - 0.5) * w * 0.5 + lx} ${top + 10}`} stroke={dark} strokeWidth={3 + i} fill="none" opacity={0.7} />
      ))}
      {/* sombra lateral */}
      <path d={`M ${x + w * 0.1} ${y} C ${x + w * 0.2} ${y - h * 0.5} ${x + w * 0.2 + lx * 0.5} ${y - h * 0.8} ${x + w * 0.15 + lx} ${top} L ${x + w * 0.36 + lx} ${top} C ${x + w * 0.42 + lx * 0.5} ${y - h * 0.7} ${x + w * 0.5} ${y - h * 0.4} ${x + w * 0.55} ${y + 6} Z`} fill="rgba(0,0,0,0.18)" />
      {/* musgo */}
      {Array.from({ length: 4 }).map((_, i) => (
        <ellipse key={`m${i}`} cx={x - w * 0.3 + rnd(`mo${seed}${i}`) * w * 0.6} cy={y - h * (0.2 + i * 0.18)} rx={w * 0.22} ry={8} fill="#5aa04a" opacity={glow ? 0 : 0.6} />
      ))}
      {glow
        ? Array.from({ length: 6 }).map((_, i) => (
            <circle key={`g${i}`} cx={x - w * 0.3 + rnd(`tg${seed}${i}`) * w * 0.6 + lx * (i / 6)} cy={y - h * (0.1 + i * 0.14)} r={4} fill={glow} filter="url(#glow)" />
          ))
        : null}
    </g>
  );
};

/** Hoja con punta (para copas y matas). */
const leafPath = (len: number, wid: number) => `M 0 0 Q ${wid} ${-len * 0.4} 0 ${-len} Q ${-wid} ${-len * 0.4} 0 0 Z`;

/** Racimo de hojas que se mece. */
const LeafCluster: React.FC<{ x: number; y: number; s?: number; col: string; col2: string; t: number; n?: number; seed: number; spread?: number }> = ({ x, y, s = 1, col, col2, t, n = 9, seed, spread = 170 }) => (
  <g transform={T(x, y, s, Math.sin(t * 0.9 + seed) * 2)}>
    {Array.from({ length: n }).map((_, i) => {
      const a = -spread / 2 + (spread / (n - 1)) * i + Math.sin(t * 1.3 + i + seed) * 3;
      const len = 120 + rnd(`lc${seed}${i}`) * 70;
      return (
        <g key={i} transform={`rotate(${a})`}>
          <path d={leafPath(len, 34)} fill={i % 2 ? col : col2} stroke={INK} strokeWidth={3.5} />
          <line x1={0} y1={0} x2={0} y2={-len * 0.9} stroke="rgba(0,0,0,0.25)" strokeWidth={2.5} />
        </g>
      );
    })}
  </g>
);

/** Helecho: tallo curvo con hojitas a los lados. */
const Frond: React.FC<{ x: number; y: number; s?: number; a: number; col: string; t: number; seed: number }> = ({ x, y, s = 1, a, col, t, seed }) => {
  const sway = Math.sin(t * 1.4 + seed) * 4;
  return (
    <g transform={T(x, y, s, a + sway)}>
      <path d="M 0 0 Q 30 -120 10 -240" stroke={INK} strokeWidth={7} fill="none" />
      <path d="M 0 0 Q 30 -120 10 -240" stroke={col} strokeWidth={4} fill="none" />
      {Array.from({ length: 11 }).map((_, i) => {
        const k = (i + 1) / 12;
        const px = 30 * 2 * k * (1 - k) + 10 * k * k;
        const py = -240 * k;
        const l = 50 * (1 - k * 0.7);
        return (
          <g key={i}>
            <path d={`M ${px} ${py} q ${l * 0.6} ${-l * 0.2} ${l} ${-l * 0.55}`} stroke={col} strokeWidth={9} strokeLinecap="round" fill="none" />
            <path d={`M ${px} ${py} q ${-l * 0.6} ${-l * 0.2} ${-l} ${-l * 0.55}`} stroke={col} strokeWidth={9} strokeLinecap="round" fill="none" />
          </g>
        );
      })}
    </g>
  );
};

/** Hoja gigante de primer plano (tipo corazón con nervaduras). */
const BigLeaf: React.FC<{ x: number; y: number; s?: number; r: number; col: string; t: number; seed: number }> = ({ x, y, s = 1, r, col, t, seed }) => (
  <g transform={T(x, y, s, r + Math.sin(t * 1.1 + seed) * 3)}>
    <path d="M 0 0 L 0 -120" stroke={INK} strokeWidth={10} />
    <path d="M 0 -110 C 120 -140 160 -300 0 -400 C -160 -300 -120 -140 0 -110 Z" fill={col} stroke={INK} strokeWidth={5} />
    <path d="M 0 -110 L 0 -390" stroke="rgba(0,0,0,0.3)" strokeWidth={5} />
    {[-1, 1].map((sd) => [0.3, 0.5, 0.7].map((k, i) => <path key={`${sd}${i}`} d={`M 0 ${-110 - 280 * k} q ${sd * 50} -20 ${sd * 90} -60`} stroke="rgba(0,0,0,0.25)" strokeWidth={3.5} fill="none" />))}
    <path d="M -10 -140 C -90 -170 -110 -280 -10 -370" stroke="rgba(255,255,255,0.18)" strokeWidth={10} fill="none" />
  </g>
);

/** Liana que cuelga y se mece, con hojitas. */
const Vine: React.FC<{ x: number; len: number; t: number; col: string; seed: number; glow?: string }> = ({ x, len, t, col, seed, glow }) => {
  const sw = Math.sin(t * 0.8 + seed) * 18;
  return (
    <g>
      <path d={`M ${x} -20 Q ${x + 30 + sw} ${len * 0.5} ${x + sw * 0.6} ${len}`} stroke={INK} strokeWidth={9} fill="none" />
      <path d={`M ${x} -20 Q ${x + 30 + sw} ${len * 0.5} ${x + sw * 0.6} ${len}`} stroke={col} strokeWidth={5} fill="none" />
      {Array.from({ length: Math.floor(len / 70) }).map((_, i) => {
        const k = (i + 1) / (len / 70 + 1);
        const px = x + (30 + sw) * 2 * k * (1 - k) + sw * 0.6 * k * k;
        const py = -20 + (len + 20) * k;
        return <path key={i} d={leafPath(34, 12)} transform={`translate(${px} ${py}) rotate(${i % 2 ? 120 : -120})`} fill={glow ?? "#4aa04a"} stroke={INK} strokeWidth={2} />;
      })}
      {glow ? <circle cx={x + sw * 0.6} cy={len} r={9} fill={glow} filter="url(#glow)" /> : null}
    </g>
  );
};

/** Flor de Pandora. */
const Flower: React.FC<{ x: number; y: number; s?: number; col: string; t: number; glow?: boolean }> = ({ x, y, s = 1, col, t, glow }) => (
  <g transform={T(x, y, s, Math.sin(t + x) * 4)}>
    <path d="M 0 0 Q 6 -40 0 -80" stroke="#2a5a2a" strokeWidth={6} fill="none" />
    {glow ? <circle cx={0} cy={-90} r={36} fill={col} opacity={0.35} filter="url(#soft)" /> : null}
    {[0, 72, 144, 216, 288].map((a) => (
      <path key={a} d={leafPath(36, 16)} transform={`translate(0 -86) rotate(${a})`} fill={col} stroke={INK} strokeWidth={2.5} />
    ))}
    <circle cx={0} cy={-86} r={8} fill="#fff3a0" stroke={INK} strokeWidth={2} />
  </g>
);

/** Bichitos que vuelan: mariposas de día, lagartijas-hélice brillantes de noche. */
const Fliers: React.FC<{ t: number; night: boolean }> = ({ t, night }) => (
  <g>
    {Array.from({ length: night ? 9 : 6 }).map((_, i) => {
      const x = L + ((t * (40 + i * 9) + rnd(`fx${i}`) * WW) % WW);
      const y = 700 + rnd(`fy${i}`) * 600 + Math.sin(t * 2 + i) * 50;
      const f = Math.abs(Math.sin(t * (night ? 6 : 14) + i));
      return night ? (
        <g key={i} transform={`translate(${x} ${y}) rotate(${t * 200 + i * 40})`}>
          <ellipse rx={22 * f + 4} ry={8} fill={i % 2 ? "#ffb02a" : "#7af4ff"} opacity={0.85} filter="url(#glow)" />
        </g>
      ) : (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d={`M 0 0 Q ${-16} ${-14 * f} ${-22} ${-2} Q ${-12} 6 0 0 Q 12 6 22 -2 Q 16 ${-14 * f} 0 0 Z`} fill={i % 2 ? "#ff8a2a" : "#4ac8ff"} stroke={INK} strokeWidth={2} />
        </g>
      );
    })}
  </g>
);

const Jungle: React.FC<{ t: number; p: Pal; night: boolean; glow?: number }> = ({ t, p, night, glow = 1 }) => {
  const G = p.glow;
  const gc = (i: number) => (G ? G[i % G.length] : undefined);
  return (
    <Svg>
      <defs>
        <linearGradient id={`jsky${night ? "n" : "d"}`} x1="0" y1="0" x2="0" y2="1">
          {p.sky.map((c, i) => (
            <stop key={i} offset={i / (p.sky.length - 1)} stopColor={c} />
          ))}
        </linearGradient>
        <linearGradient id={`jgr${night ? "n" : "d"}`} x1="0" y1="0" x2="0" y2="1">
          {p.ground.map((c, i) => (
            <stop key={i} offset={i / (p.ground.length - 1)} stopColor={c} />
          ))}
        </linearGradient>
        <linearGradient id="jray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffbe0" stopOpacity="0.6" />
          <stop offset="1" stopColor="#fffbe0" stopOpacity="0" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="far">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect x={L} y={0} width={WW} height={H} fill={`url(#jsky${night ? "n" : "d"})`} />
      {night ? (
        <>
          {Array.from({ length: 70 }).map((_, i) => (
            <circle key={i} cx={L + rnd(`js${i}`) * WW} cy={rnd(`jsy${i}`) * 650} r={1 + rnd(`jsr${i}`) * 2} fill="#fff" opacity={0.4 + 0.5 * Math.abs(Math.sin(t * 1.7 + i))} />
          ))}
          <circle cx={1180} cy={330} r={230} fill="#5a88c8" opacity={0.85} />
          <path d="M 960 320 Q 1180 280 1400 340" stroke="#d8ecff" strokeWidth={12} fill="none" opacity={0.3} />
        </>
      ) : (
        <circle cx={1180} cy={300} r={180} fill="#e8f4ff" opacity={0.55} />
      )}
      {/* capa lejana: siluetas con bruma */}
      <g filter="url(#far)">
        {Array.from({ length: 12 }).map((_, i) => (
          <Trunk key={`f${i}`} x={L + 80 + i * 170} y={1120} h={760 + (i % 3) * 120} w={60} col={p.far} dark={p.far} seed={i} lean={(i % 2 ? 1 : -1) * 0.03} />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <ellipse key={`fc${i}`} cx={L + i * 130} cy={340 + (i % 3) * 60} rx={150} ry={100} fill={p.far} />
        ))}
      </g>
      <rect x={L} y={600} width={WW} height={700} fill={p.haze} opacity={night ? 0.18 : 0.35} />
      {/* rayos de luz / niebla luminosa */}
      {night ? (
        <ellipse cx={540} cy={1250} rx={900} ry={160} fill={p.haze} opacity={0.35} filter="url(#soft)" />
      ) : (
        [-250, 250, 650, 1100].map((x, i) => <path key={`r${i}`} d={`M ${x} 0 L ${x + 140} 0 L ${x + 380} 1350 L ${x - 40} 1350 Z`} fill="url(#jray)" opacity={0.35 + 0.15 * Math.sin(t * 0.7 + i)} />)
      )}
      {/* capa media */}
      {Array.from({ length: 7 }).map((_, i) => (
        <Trunk key={`m${i}`} x={L + 140 + i * 300} y={1260} h={1050} w={110} col={p.mid} dark={p.midDark} seed={20 + i} lean={(i % 2 ? 1 : -1) * 0.04} glow={night ? gc(i) : undefined} />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <LeafCluster key={`mc${i}`} x={L + 60 + i * 210} y={300 + (i % 2) * 70} s={1.2} col={p.mid} col2={p.leaf} t={t} seed={i} n={11} spread={300} />
      ))}
      {/* lianas */}
      {[-300, -60, 220, 470, 760, 1010, 1300].map((x, i) => (
        <Vine key={`v${i}`} x={x} len={500 + (i % 3) * 180} t={t} col={night ? "#1a5a50" : "#3a7a3a"} seed={i} glow={night ? gc(i + 1) : undefined} />
      ))}
      {/* piso */}
      <path d={`M ${L} 1280 Q 100 1230 540 1250 Q 1000 1235 1540 1280 L 1540 1920 L ${L} 1920 Z`} fill={`url(#jgr${night ? "n" : "d"})`} />
      {night ? <ellipse cx={540} cy={1470} rx={760} ry={90} fill="#3ae0ff" opacity={0.12 * glow} filter="url(#soft)" /> : null}
      {/* troncos cercanos a los costados */}
      <Trunk x={-330} y={1330} h={1400} w={230} col={p.near} dark={p.nearDark} seed={50} lean={0.03} glow={night ? gc(2) : undefined} />
      <Trunk x={1420} y={1340} h={1400} w={250} col={p.near} dark={p.nearDark} seed={51} lean={-0.03} glow={night ? gc(1) : undefined} />
      {/* matas, helechos y flores */}
      {[-200, 60, 330, 760, 1010, 1270].map((x, i) => (
        <g key={`fr${i}`}>
          <Frond x={x} y={1330 + (i % 2) * 15} s={1.1} a={-35} col={night ? "#1a6a60" : p.leaf} t={t} seed={i} />
          <Frond x={x + 20} y={1330 + (i % 2) * 15} s={1.2} a={10} col={night ? "#14584f" : p.leaf2} t={t} seed={i + 3} />
          <Frond x={x + 40} y={1330 + (i % 2) * 15} s={1.0} a={45} col={night ? "#1a6a60" : p.leaf} t={t} seed={i + 6} />
        </g>
      ))}
      {[-120, 200, 560, 900, 1180].map((x, i) => (
        <Flower key={`fl${i}`} x={x} y={1360 + (i % 2) * 30} s={1.1} col={night ? gc(i)! : i % 2 ? "#ff6ba0" : "#ffb02a"} t={t} glow={night} />
      ))}
      {/* rocas */}
      {[-80, 640, 1150].map((x, i) => (
        <path key={`rk${i}`} d={`M ${x - 70} 1420 Q ${x - 60} 1360 ${x} 1355 Q ${x + 70} 1360 ${x + 80} 1420 Z`} fill={night ? "#1a2e36" : "#7a8a7a"} stroke={INK} strokeWidth={4} />
      ))}
      {/* pasto */}
      {Array.from({ length: 70 }).map((_, i) => {
        const x = L + (i / 70) * WW + rnd(`gr${i}`) * 20;
        const h = 60 + rnd(`grh${i}`) * 80;
        const glowing = night && i % 4 === 0;
        return <path key={`g${i}`} d={`M ${x} 1920 Q ${x + 6} ${1560 - h} ${x + 16 + Math.sin(t * 1.6 + i) * 8} ${1500 - h}`} stroke={glowing ? gc(i) : i % 2 ? p.ground[1] : p.leaf} strokeWidth={7} fill="none" opacity={glowing ? 0.85 * glow : 1} />;
      })}
      {/* hojas que caen / esporas que flotan */}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = L + ((rnd(`lf${i}`) * WW + Math.sin(t * 0.6 + i) * 60) % WW);
        const y = ((t * (night ? 25 : 60) + i * 140) % 1300) + 300;
        return night ? (
          <circle key={`p${i}`} cx={x} cy={1600 - y} r={3.5} fill={gc(i)} opacity={0.9 * glow} filter="url(#glow)" />
        ) : (
          <path key={`p${i}`} d={leafPath(20, 8)} transform={`translate(${x} ${y}) rotate(${t * 120 + i * 50})`} fill={p.leaf2} stroke={INK} strokeWidth={1.5} />
        );
      })}
      <Fliers t={t} night={night} />
      {/* bandada de ikran a lo lejos */}
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 1700 - ((t * 110 + i * 90) % 2600);
        const y = 420 + i * 28 + Math.sin(t * 1.5 + i) * 14;
        const fl = Math.sin(t * 9 + i) * 14;
        return <path key={`ik${i}`} d={`M ${x - 30} ${y + fl} Q ${x - 14} ${y - 8} ${x} ${y} Q ${x + 14} ${y - 8} ${x + 30} ${y + fl}`} stroke={night ? "#c86bff" : "#2a3a8a"} strokeWidth={5} fill="none" opacity={night ? 0.8 : 1} />;
      })}
      {/* bandas de niebla que se desplazan */}
      {[0, 1].map((i) => (
        <ellipse key={`mist${i}`} cx={L + ((t * 30 + i * 1000) % (WW + 600)) - 300} cy={1180 + i * 80} rx={520} ry={60} fill={night ? "#3ae0ff" : "#ffffff"} opacity={night ? 0.12 : 0.35} filter="url(#soft)" />
      ))}
    </Svg>
  );
};

export const JungleDay: React.FC<{ t: number }> = ({ t }) => <Jungle t={t} p={DAYP} night={false} />;
export const JungleNight: React.FC<{ t: number; glow?: number }> = ({ t, glow = 1 }) => <Jungle t={t} p={NIGHTP} night glow={glow} />;

/** Hojas de primer plano que enmarcan la escena (van encima de los personajes). */
export const JungleFront: React.FC<{ t: number; night?: boolean }> = ({ t, night = false }) => {
  const c1 = night ? "#082a2a" : "#1f5a2a";
  const c2 = night ? "#0c3a36" : "#2f7a35";
  return (
    <Svg>
      <BigLeaf x={-420} y={1950} s={1.5} r={35} col={c1} t={t} seed={1} />
      <BigLeaf x={-300} y={1980} s={1.2} r={60} col={c2} t={t} seed={2} />
      <BigLeaf x={1500} y={1950} s={1.5} r={-35} col={c1} t={t} seed={3} />
      <BigLeaf x={1380} y={1990} s={1.15} r={-62} col={c2} t={t} seed={4} />
      <g transform="rotate(180 -380 300)"><LeafCluster x={-380} y={300} s={1.4} col={c1} col2={c2} t={t} seed={7} n={9} spread={200} /></g>
      <g transform="rotate(180 1460 300)"><LeafCluster x={1460} y={300} s={1.4} col={c1} col2={c2} t={t} seed={8} n={9} spread={200} /></g>
    </Svg>
  );
};
