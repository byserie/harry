import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";
import { H, Svg, W } from "../scenes/bg1";

type XY = { x: number; y: number; s?: number };
const T = (x: number, y: number, s = 1, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${s})`;
const rnd = (k: string | number) => random(String(k));

/** Filtros compartidos: resplandor suave y niebla. */
export const Defs: React.FC = () => (
  <defs>
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
    <filter id="haze">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
);

/** Planta fosforescente (helecho/hongo). */
const GlowPlant: React.FC<XY & { col: string; t: number; k?: number }> = ({ x, y, s = 1, col, t, k = 1 }) => {
  const pulse = 0.6 + 0.4 * Math.sin(t * 2 + x * 0.01);
  return (
    <g transform={T(x, y, s)}>
      <path d="M 0 0 Q -30 -80 -70 -120 M 0 0 Q 0 -90 10 -150 M 0 0 Q 30 -70 70 -110" stroke="#0b2a2a" strokeWidth={10} fill="none" strokeLinecap="round" />
      {[[-70, -120], [10, -150], [70, -110]].map(([a, b2], i) => (
        <g key={i}>
          <ellipse cx={a} cy={b2} rx={34} ry={14} fill={col} opacity={0.35 * pulse * k} filter="url(#soft)" />
          <ellipse cx={a} cy={b2} rx={22} ry={9} fill={col} opacity={0.95 * k} stroke={INK} strokeWidth={3} />
        </g>
      ))}
    </g>
  );
};

/** Hongo luminoso. */
const Mushroom: React.FC<XY & { col: string; t: number; k?: number }> = ({ x, y, s = 1, col, t, k = 1 }) => (
  <g transform={T(x, y, s)}>
    <rect x={-8} y={-60} width={16} height={60} fill="#163a3a" stroke={INK} strokeWidth={3} />
    <ellipse cx={0} cy={-62} rx={60} ry={30} fill={col} opacity={0.3 * k * (0.7 + 0.3 * Math.sin(t * 1.6 + x))} filter="url(#soft)" />
    <path d="M -46 -58 Q 0 -110 46 -58 Z" fill={col} stroke={INK} strokeWidth={4} opacity={k} />
    {[-24, 0, 22].map((d, i) => (
      <circle key={i} cx={d} cy={-72 + Math.abs(d) * 0.3} r={4} fill="#ffffff" opacity={0.7 * k} />
    ))}
  </g>
);

/** Árbol enorme de la selva (tronco con raíces). */
const BigTree: React.FC<XY & { col: string; dark: string; glow?: string; night?: boolean }> = ({ x, y, s = 1, col, dark, glow, night }) => (
  <g transform={T(x, y, s)}>
    <path d="M -60 0 Q -40 -300 -70 -700 L 70 -700 Q 40 -300 60 0 Q 120 10 160 40 L -160 40 Q -120 10 -60 0 Z" fill={col} stroke={INK} strokeWidth={5} />
    <path d="M -20 -40 Q -10 -300 -30 -680" stroke={dark} strokeWidth={10} fill="none" opacity={0.5} />
    <path d="M 25 -60 Q 30 -320 20 -660" stroke={dark} strokeWidth={6} fill="none" opacity={0.4} />
    {night && glow ? (
      <g>
        {Array.from({ length: 7 }).map((_, i) => (
          <circle key={i} cx={-40 + rnd(`tr${x}${i}`) * 80} cy={-80 - i * 85} r={5} fill={glow} filter="url(#glow)" />
        ))}
        <path d="M -150 38 Q -80 20 -60 0 M 150 38 Q 80 20 60 0" stroke={glow} strokeWidth={4} fill="none" opacity={0.8} filter="url(#glow)" />
      </g>
    ) : null}
  </g>
);

/** Selva de Pandora de noche: fosforescente, con niebla y partículas. */
export const PandoraNight: React.FC<{ t: number; glow?: number }> = ({ t, glow = 1 }) => (
  <Svg>
    <Defs />
    <defs>
      <linearGradient id="pnSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#050a22" />
        <stop offset="0.5" stopColor="#0b1d3e" />
        <stop offset="1" stopColor="#0a2e3a" />
      </linearGradient>
      <radialGradient id="pnPlanet" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#b8d8ff" />
        <stop offset="0.7" stopColor="#5a88c8" />
        <stop offset="1" stopColor="#2a4a8a" />
      </radialGradient>
      <linearGradient id="pnGround" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0c3a3a" />
        <stop offset="1" stopColor="#041a1e" />
      </linearGradient>
    </defs>
    <rect width={W} height={H} fill="url(#pnSky)" />
    {/* gigante gaseoso en el cielo */}
    <circle cx={800} cy={420} r={240} fill="url(#pnPlanet)" opacity={0.85} />
    <path d="M 560 400 Q 800 360 1040 420" stroke="#d8ecff" strokeWidth={10} fill="none" opacity={0.35} />
    <path d="M 575 480 Q 800 450 1030 500" stroke="#2a4a8a" strokeWidth={14} fill="none" opacity={0.4} />
    {Array.from({ length: 50 }).map((_, i) => (
      <circle key={i} cx={rnd(`s${i}`) * W} cy={rnd(`sy${i}`) * 700} r={1 + rnd(`sr${i}`) * 2} fill="#fff" opacity={0.4 + 0.5 * Math.sin(t * 2 + i)} />
    ))}
    {/* árboles lejanos (silueta azul) */}
    {[60, 300, 560, 880, 1060].map((x, i) => (
      <BigTree key={`f${i}`} x={x} y={1150} s={0.8} col="#0d2c4a" dark="#081a30" />
    ))}
    <rect x={0} y={900} width={W} height={400} fill="#0a3a4a" opacity={0.35} filter="url(#soft)" />
    {/* árboles cercanos con raíces que brillan */}
    <BigTree x={90} y={1290} s={1.25} col="#123a46" dark="#08202a" glow="#4ef0ff" night />
    <BigTree x={1010} y={1300} s={1.35} col="#123a46" dark="#08202a" glow="#c86bff" night />
    {/* lianas */}
    {[180, 420, 700, 940].map((x, i) => (
      <path key={`l${i}`} d={`M ${x} 0 Q ${x + 40 + Math.sin(t + i) * 10} 300 ${x - 10} ${520 + i * 40}`} stroke="#0d3a3a" strokeWidth={8} fill="none" />
    ))}
    {/* piso */}
    <path d="M 0 1260 Q 540 1210 1080 1260 L 1080 1920 L 0 1920 Z" fill="url(#pnGround)" />
    {/* camino de luz: el piso se ilumina donde pisan */}
    <ellipse cx={540} cy={1460} rx={420} ry={60} fill="#3ae0ff" opacity={0.12 * glow} filter="url(#soft)" />
    <GlowPlant x={150} y={1330} s={1.1} col="#4ef0ff" t={t} k={glow} />
    <GlowPlant x={930} y={1340} s={1.2} col="#ff6bd6" t={t} k={glow} />
    <Mushroom x={330} y={1300} s={0.9} col="#7affb8" t={t} k={glow} />
    <Mushroom x={760} y={1290} s={0.8} col="#c86bff" t={t} k={glow} />
    <GlowPlant x={540} y={1250} s={0.7} col="#b0ff4e" t={t} k={glow} />
    {/* pasto luminoso en primer plano */}
    {Array.from({ length: 40 }).map((_, i) => {
      const x = (i / 40) * W + rnd(`g${i}`) * 20;
      return <path key={`g${i}`} d={`M ${x} 1920 Q ${x + 8} ${1780 - rnd(`gh${i}`) * 80} ${x + 20 + Math.sin(t * 1.5 + i) * 6} ${1700 - rnd(`gh${i}`) * 120}`} stroke={i % 3 ? "#0f4a4a" : "#3ae0c8"} strokeWidth={6} fill="none" opacity={i % 3 ? 1 : 0.8 * glow} />;
    })}
    {/* partículas flotantes */}
    {Array.from({ length: 26 }).map((_, i) => {
      const px = (rnd(`p${i}`) * W + Math.sin(t * 0.5 + i) * 40) % W;
      const py = 600 + rnd(`py${i}`) * 900 - ((t * 20 + i * 30) % 200);
      return <circle key={`p${i}`} cx={px} cy={py} r={3} fill={i % 2 ? "#7af4ff" : "#d6a0ff"} opacity={0.8 * glow} filter="url(#glow)" />;
    })}
  </Svg>
);

/** Selva de día: verdes profundos, luz que se filtra. */
export const PandoraDay: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Defs />
    <defs>
      <linearGradient id="pdSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8fd8ff" />
        <stop offset="0.6" stopColor="#c8f0e0" />
        <stop offset="1" stopColor="#6ab88a" />
      </linearGradient>
      <linearGradient id="pdGround" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3a8a4a" />
        <stop offset="1" stopColor="#1a4a2a" />
      </linearGradient>
      <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fffbe0" stopOpacity="0.55" />
        <stop offset="1" stopColor="#fffbe0" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width={W} height={H} fill="url(#pdSky)" />
    {[80, 330, 600, 860, 1060].map((x, i) => (
      <BigTree key={i} x={x} y={1180} s={0.85} col="#4a8a6a" dark="#2a5a4a" />
    ))}
    <rect x={0} y={950} width={W} height={300} fill="#bff0d8" opacity={0.35} filter="url(#soft)" />
    {/* hojas gigantes de copa */}
    {Array.from({ length: 9 }).map((_, i) => (
      <ellipse key={i} cx={i * 130} cy={60 + (i % 2) * 50} rx={160} ry={90} fill={i % 2 ? "#2f7a4a" : "#3a9a5a"} stroke={INK} strokeWidth={4} />
    ))}
    {/* rayos de sol */}
    {[250, 520, 790].map((x, i) => (
      <path key={i} d={`M ${x} 100 L ${x + 120} 100 L ${x + 260} 1300 L ${x - 60} 1300 Z`} fill="url(#ray)" opacity={0.5 + 0.2 * Math.sin(t + i)} />
    ))}
    <BigTree x={70} y={1300} s={1.3} col="#3a6a4a" dark="#1f4430" />
    <BigTree x={1020} y={1310} s={1.4} col="#3a6a4a" dark="#1f4430" />
    <path d="M 0 1260 Q 540 1215 1080 1260 L 1080 1920 L 0 1920 Z" fill="url(#pdGround)" />
    {/* helechos */}
    {[120, 380, 700, 960].map((x, i) => (
      <g key={i} transform={T(x, 1330 + (i % 2) * 20, 1.1)}>
        {[-60, -25, 10, 45].map((a, j) => (
          <path key={j} d={`M 0 0 Q ${a} -60 ${a * 2} -110`} stroke="#1f6a3a" strokeWidth={14} fill="none" strokeLinecap="round" />
        ))}
      </g>
    ))}
    {Array.from({ length: 30 }).map((_, i) => {
      const x = (i / 30) * W;
      return <path key={`g${i}`} d={`M ${x} 1920 Q ${x + 10} 1800 ${x + 20 + Math.sin(t * 1.5 + i) * 6} ${1720 - rnd(`dg${i}`) * 90}`} stroke="#2a7a3a" strokeWidth={8} fill="none" />;
    })}
  </Svg>
);

/** Semillas del Árbol de las Almas (como medusas de luz). */
export const Woodsprites: React.FC<{ t: number; n?: number; cx?: number; cy?: number; k?: number }> = ({ t, n = 10, cx = 540, cy = 900, k = 1 }) => (
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const a = i * 2.4 + t * 0.4;
      const r = 120 + (i % 4) * 60;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a * 0.8) * r * 0.6 - Math.sin(t + i) * 20;
      return (
        <g key={i} transform={T(x, y, 0.9 + (i % 3) * 0.2)} opacity={k}>
          <circle r={26} fill="#e8fbff" opacity={0.35} filter="url(#soft)" />
          {Array.from({ length: 8 }).map((_, j) => (
            <path key={j} d={`M 0 0 Q ${Math.cos(j) * 10} ${-10} ${Math.cos(j * 0.8) * 18} ${-22 - (j % 2) * 4}`} stroke="#f4ffff" strokeWidth={2.5} fill="none" />
          ))}
          <circle r={5} fill="#ffffff" filter="url(#glow)" />
          <path d={`M 0 4 Q ${Math.sin(t * 3 + i) * 4} 18 0 30`} stroke="#bff4ff" strokeWidth={2} fill="none" />
        </g>
      );
    })}
  </g>
);
