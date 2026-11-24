import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";
import { H, Svg } from "../scenes/bg1";
import { Defs } from "./assets";

/** Fondos de Avatar. El lienzo es 1080×1920 pero se dibuja de x=-460 a 1540 para que llene el 16:9. */
const L = -460;
const WW = 2000;
const T = (x: number, y: number, s = 1, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${s})`;
const rnd = (k: string | number) => random(String(k));

const Sky: React.FC<{ id: string; stops: string[] }> = ({ id, stops }) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        {stops.map((c, i) => (
          <stop key={i} offset={i / (stops.length - 1)} stopColor={c} />
        ))}
      </linearGradient>
    </defs>
    <rect x={L} y={0} width={WW} height={H} fill={`url(#${id})`} />
  </>
);

const Stars: React.FC<{ t: number; n?: number; maxY?: number }> = ({ t, n = 90, maxY = 1100 }) => (
  <>
    {Array.from({ length: n }).map((_, i) => (
      <circle key={i} cx={L + rnd(`st${i}`) * WW} cy={rnd(`sty${i}`) * maxY} r={0.8 + rnd(`str${i}`) * 2.2} fill="#fff" opacity={0.35 + 0.55 * Math.abs(Math.sin(t * 1.5 + i))} />
    ))}
  </>
);

/** Planeta gigante gaseoso (Polifemo) con bandas. */
export const GasGiant: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <g>
    <defs>
      <radialGradient id={`gg${r}`} cx="0.38" cy="0.35" r="0.75">
        <stop offset="0" stopColor="#dff0ff" />
        <stop offset="0.45" stopColor="#7aa8e0" />
        <stop offset="1" stopColor="#1a2a5a" />
      </radialGradient>
      <clipPath id={`ggc${r}`}>
        <circle cx={x} cy={y} r={r} />
      </clipPath>
    </defs>
    <circle cx={x} cy={y} r={r * 1.08} fill="#7ab8ff" opacity={0.15} />
    <circle cx={x} cy={y} r={r} fill={`url(#gg${r})`} />
    <g clipPath={`url(#ggc${r})`} opacity={0.45}>
      {[-0.6, -0.3, -0.05, 0.2, 0.45, 0.7].map((k, i) => (
        <path key={i} d={`M ${x - r} ${y + k * r} Q ${x} ${y + k * r - r * 0.12} ${x + r} ${y + k * r}`} stroke={i % 2 ? "#e8f4ff" : "#2a4a8a"} strokeWidth={r * 0.07} fill="none" />
      ))}
      <ellipse cx={x + r * 0.3} cy={y + r * 0.25} rx={r * 0.16} ry={r * 0.08} fill="#c8a080" />
    </g>
    <path d={`M ${x - r * 1.5} ${y + r * 0.2} Q ${x} ${y - r * 0.15} ${x + r * 1.5} ${y + r * 0.2}`} stroke="#c8dcff" strokeWidth={6} fill="none" opacity={0.5} />
  </g>
);

/** Luna Pandora vista desde el espacio. */
const PandoraMoon: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <g>
    <defs>
      <radialGradient id="pm" cx="0.35" cy="0.35" r="0.8">
        <stop offset="0" stopColor="#bff7d8" />
        <stop offset="0.5" stopColor="#2f9a6a" />
        <stop offset="1" stopColor="#0a2a3a" />
      </radialGradient>
    </defs>
    <circle cx={x} cy={y} r={r * 1.06} fill="#7affd8" opacity={0.2} />
    <circle cx={x} cy={y} r={r} fill="url(#pm)" />
    {[0, 1, 2, 3, 4].map((i) => (
      <ellipse key={i} cx={x - r * 0.4 + i * r * 0.22} cy={y - r * 0.3 + (i % 2) * r * 0.5} rx={r * 0.22} ry={r * 0.09} fill="#ffffff" opacity={0.35} />
    ))}
    <ellipse cx={x + r * 0.2} cy={y + r * 0.1} rx={r * 0.25} ry={r * 0.18} fill="#2a6aa0" opacity={0.6} />
  </g>
);

/** Nave interestelar gigante (motor atrás, escudo adelante, brazos largos). */
export const StarShip: React.FC<{ x: number; y: number; s?: number; t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y, s)}>
    <ellipse cx={-520} cy={0} rx={70} ry={30} fill="#9ad8ff" opacity={0.5 + 0.3 * Math.sin(t * 6)} />
    <rect x={-500} y={-8} width={900} height={16} fill="#b8c2cc" stroke={INK} strokeWidth={4} />
    <rect x={-470} y={-40} width={120} height={80} rx={10} fill="#8a96a4" stroke={INK} strokeWidth={5} />
    {[-300, -160, 0, 140].map((d, i) => (
      <g key={i}>
        <line x1={d} y1={-8} x2={d} y2={-70} stroke="#9aa4b0" strokeWidth={6} />
        <rect x={d - 40} y={-90} width={80} height={24} rx={6} fill="#d8dee6" stroke={INK} strokeWidth={4} />
        <line x1={d} y1={8} x2={d} y2={70} stroke="#9aa4b0" strokeWidth={6} />
        <rect x={d - 40} y={66} width={80} height={24} rx={6} fill="#d8dee6" stroke={INK} strokeWidth={4} />
      </g>
    ))}
    <path d="M 400 -60 Q 470 0 400 60 L 380 60 L 380 -60 Z" fill="#e6ebf0" stroke={INK} strokeWidth={5} />
    {[-420, -400, -380].map((d, i) => (
      <circle key={i} cx={d} cy={-50} r={4} fill="#ff5a5a" opacity={Math.sin(t * 4 + i) > 0 ? 1 : 0.2} />
    ))}
  </g>
);

/** Espacio: estrellas, planeta gigante, Pandora y la nave. */
export const Space: React.FC<{ t: number; ship?: boolean }> = ({ t, ship = true }) => (
  <Svg>
    <Defs />
    <Sky id="spc" stops={["#02030c", "#070a24", "#0a0f30"]} />
    <Stars t={t} n={160} maxY={H} />
    <ellipse cx={200} cy={700} rx={900} ry={260} fill="#3a2a8a" opacity={0.18} filter="url(#soft)" />
    <GasGiant x={1100} y={760} r={420} />
    <PandoraMoon x={300} y={1150} r={150} />
    {ship ? <StarShip x={540 - t * 8} y={980} s={0.9} t={t} /> : null}
  </Svg>
);

/** Bahía de criosueño: filas de cápsulas, luces azules, ventanal al espacio. */
export const CryoBay: React.FC<{ t: number; open?: number }> = ({ t, open = 0 }) => (
  <Svg>
    <Defs />
    <Sky id="cry" stops={["#0c1626", "#16263a", "#1c3046"]} />
    {/* ventanal */}
    <rect x={L + 60} y={260} width={WW - 120} height={300} rx={40} fill="#03050f" stroke="#6a7a8a" strokeWidth={14} />
    <g clipPath="none">
      {Array.from({ length: 60 }).map((_, i) => (
        <circle key={i} cx={L + 80 + rnd(`cw${i}`) * (WW - 160)} cy={280 + rnd(`cwy${i}`) * 260} r={1.5} fill="#fff" opacity={0.8} />
      ))}
    </g>
    <circle cx={1200} cy={420} r={120} fill="#2f9a6a" opacity={0.9} />
    {/* estructura */}
    {Array.from({ length: 9 }).map((_, i) => (
      <rect key={i} x={L + i * 250} y={180} width={26} height={1100} fill="#2a3a4c" stroke={INK} strokeWidth={4} />
    ))}
    {/* cápsulas en la pared, en filas */}
    {[0, 1].map((row) =>
      Array.from({ length: 8 }).map((_, i) => {
        const x = L + 120 + i * 250;
        const y = 700 + row * 260;
        return (
          <g key={`${row}-${i}`}>
            <rect x={x - 100} y={y - 70} width={200} height={140} rx={60} fill="#d8e2ea" stroke={INK} strokeWidth={5} />
            <rect x={x - 80} y={y - 50} width={160} height={100} rx={46} fill="#6ad8ff" opacity={0.25 + 0.1 * Math.sin(t * 2 + i)} />
            <circle cx={x + 70} cy={y + 50} r={6} fill={i % 3 ? "#3ae07a" : "#ffcc3a"} />
          </g>
        );
      }),
    )}
    {/* cápsula abierta del frente */}
    <rect x={L} y={1300} width={WW} height={H - 1300} fill="#1a2634" />
    <g transform={T(540, 1290)}>
      <rect x={-260} y={-60} width={520} height={90} rx={40} fill="#e6ecf2" stroke={INK} strokeWidth={6} />
      <g transform={`translate(0 ${-60 - open * 120})`}>
        <rect x={-250} y={-40} width={500} height={60} rx={30} fill="rgba(170,220,255,0.6)" stroke={INK} strokeWidth={6} />
      </g>
    </g>
    {/* luces azules del techo */}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <ellipse key={i} cx={L + 120 + i * 250} cy={190} rx={70} ry={14} fill="#bff4ff" filter="url(#glow)" />
    ))}
  </Svg>
);

const Fence: React.FC<{ y: number; t: number }> = ({ y }) => (
  <g>
    {Array.from({ length: 22 }).map((_, i) => (
      <g key={i}>
        <rect x={L + i * 95} y={y - 260} width={14} height={270} fill="#5a646e" stroke={INK} strokeWidth={3} />
        <line x1={L + i * 95} y1={y - 250} x2={L + i * 95 + 95} y2={y - 250} stroke="#7a848e" strokeWidth={4} />
        <line x1={L + i * 95} y1={y - 150} x2={L + i * 95 + 95} y2={y - 150} stroke="#7a848e" strokeWidth={4} />
        <path d={`M ${L + i * 95} ${y - 250} L ${L + i * 95 + 95} ${y - 150} M ${L + i * 95 + 95} ${y - 250} L ${L + i * 95} ${y - 150}`} stroke="#6a747e" strokeWidth={2} />
      </g>
    ))}
  </g>
);

/** Base humana (el fuerte): hangar abierto, torre con radar, contenedores, tanques, robots estacionados, rejas. */
export const HumanBase: React.FC<{ t: number; alarm?: number }> = ({ t, alarm = 0 }) => (
  <Svg>
    <Defs />
    <Sky id="hb" stops={["#86c6ec", "#c8e8f0", "#e8f2e6"]} />
    <GasGiant x={1250} y={330} r={200} />
    {[0, 1, 2].map((i) => (
      <ellipse key={`cl${i}`} cx={L + ((t * 12 + i * 700) % WW)} cy={260 + i * 70} rx={220} ry={50} fill="#ffffff" opacity={0.7} />
    ))}
    {/* selva lejana en capas con bruma */}
    {Array.from({ length: 18 }).map((_, i) => (
      <ellipse key={`j1${i}`} cx={L + i * 120} cy={820 + (i % 3) * 25} rx={130} ry={150} fill="#8ac0a8" />
    ))}
    {Array.from({ length: 16 }).map((_, i) => (
      <ellipse key={`j2${i}`} cx={L + 60 + i * 130} cy={900 + (i % 2) * 30} rx={140} ry={140} fill="#4f8a62" />
    ))}
    <rect x={L} y={760} width={WW} height={200} fill="#e8f4ee" opacity={0.25} />
    {/* hangar con puerta abierta */}
    <g stroke={INK} strokeWidth={5}>
      <path d="M -440 1080 L -440 760 Q -170 600 100 760 L 100 1080 Z" fill="#8f99a3" />
      <path d="M -380 1080 L -380 820 Q -170 700 40 820 L 40 1080 Z" fill="#2a3440" />
      {[-360, -300, -240, -180, -120, -60, 0].map((x, i) => (
        <line key={i} x1={x} y1={790 - Math.sin(((x + 440) / 540) * Math.PI) * 150} x2={x} y2={1080} stroke="#7a848e" strokeWidth={3} />
      ))}
    </g>
    <g transform="translate(-170 1000) scale(0.55)">
      <path d="M -160 0 Q -170 -60 -80 -70 L 120 -70 Q 190 -60 200 0 Q 190 40 120 50 L -100 50 Q -160 40 -160 0 Z" fill="#6a6e4a" stroke={INK} strokeWidth={7} />
    </g>
    <text x={-170} y={760} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={44} fill="#e8b923" stroke={INK} strokeWidth={1.5}>RDA</text>
    {/* torre de control con radar */}
    <g stroke={INK} strokeWidth={5}>
      <rect x={300} y={640} width={70} height={440} fill="#7a848e" />
      <rect x={260} y={600} width={150} height={70} rx={8} fill="#5a646e" />
      <rect x={272} y={612} width={126} height={30} fill="#9ad8ff" />
      <line x1={335} y1={600} x2={335} y2={540} />
      <g transform={`translate(335 540) scale(${Math.cos(t * 2)} 1)`}>
        <path d="M -50 0 Q 0 -30 50 0 Z" fill="#c8ced6" />
      </g>
    </g>
    <circle cx={335} cy={530} r={10} fill="#ff3a3a" opacity={(alarm > 0 ? Math.sin(t * 10) > 0 : Math.sin(t * 3) > 0) ? 1 : 0.3} filter="url(#glow)" />
    {/* tanques de combustible y caños */}
    <g stroke={INK} strokeWidth={5}>
      {[520, 660].map((x, i) => (
        <g key={i}>
          <rect x={x - 60} y={820} width={120} height={260} rx={50} fill="#d8dee6" />
          <rect x={x - 60} y={900} width={120} height={20} fill="#e8b923" />
        </g>
      ))}
      <path d="M 450 1000 L 420 1000 L 420 1060 M 730 980 L 800 980 L 800 1060" fill="none" stroke="#5a646e" strokeWidth={14} />
    </g>
    <circle cx={520} cy={790 - ((t * 30) % 80)} r={26} fill="#ddd" opacity={0.5} filter="url(#soft)" />
    {/* contenedores apilados */}
    {[[880, 1000, "#c0392b"], [1010, 1000, "#2f6fb8"], [940, 920, "#e8b923"], [1140, 1000, "#3a8a4a"]].map(([x, y, c], i) => (
      <g key={`ct${i}`} stroke={INK} strokeWidth={4}>
        <rect x={(x as number) - 60} y={(y as number) - 40} width={124} height={80} fill={c as string} />
        {[0, 1, 2, 3, 4].map((j) => (
          <line key={j} x1={(x as number) - 50 + j * 24} y1={(y as number) - 34} x2={(x as number) - 50 + j * 24} y2={(y as number) + 34} stroke="rgba(0,0,0,0.25)" strokeWidth={3} />
        ))}
      </g>
    ))}
    {/* edificio de módulos */}
    <g stroke={INK} strokeWidth={5}>
      <rect x={1220} y={820} width={320} height={260} fill="#a8b2bc" />
      <path d="M 1220 820 Q 1380 730 1540 820 Z" fill="#8a949e" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={1240 + i * 72} y={880} width={54} height={36} fill="#9ad8ff" />
      ))}
    </g>
    {/* torres de luz */}
    {[-30, 790, 1200].map((x, i) => (
      <g key={`lt${i}`} stroke={INK} strokeWidth={4}>
        <line x1={x} y1={1080} x2={x} y2={700} strokeWidth={8} />
        <rect x={x - 40} y={680} width={80} height={30} fill="#eef2f6" />
      </g>
    ))}
    <Fence y={1100} t={t} />
    {/* pista de cemento con marcas */}
    <rect x={L} y={1100} width={WW} height={H - 1100} fill="#8f918c" />
    <rect x={L} y={1100} width={WW} height={26} fill="#6f716c" />
    {Array.from({ length: 22 }).map((_, i) => (
      <rect key={`ws${i}`} x={L + i * 95} y={1126} width={46} height={14} fill={i % 2 ? "#1b1b2f" : "#f2c230"} />
    ))}
    <circle cx={1240} cy={1600} r={170} fill="none" stroke="#f2e05a" strokeWidth={12} />
    <text x={1240} y={1650} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={150} fill="#f2e05a">H</text>
    {Array.from({ length: 12 }).map((_, i) => (
      <line key={`c${i}`} x1={L + i * 200} y1={1140} x2={L + i * 200 - 300} y2={H} stroke="#7f817c" strokeWidth={3} />
    ))}
    {/* helicóptero que pasa al fondo */}
    <g transform={`translate(${1700 - ((t * 120) % 2400)} 520) scale(-0.35 0.35)`}>
      <path d="M -160 0 Q -170 -60 -80 -70 L 120 -70 Q 190 -60 200 0 Q 190 40 120 50 L -100 50 Q -160 40 -160 0 Z" fill="#5a5e40" stroke={INK} strokeWidth={8} />
      <ellipse cx={0} cy={-90} rx={200 * Math.abs(Math.cos(t * 30))} ry={8} fill="#ccc" />
    </g>
  </Svg>
);

/** Laboratorio de enlace con más vida: cápsulas en fila, escritorios con pantallas, cables, holograma de ADN. */
export const LabRich: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Defs />
    <Sky id="lr" stops={["#16222e", "#22334a", "#2a3e54"]} />
    {/* ventanal a la selva */}
    <rect x={-300} y={420} width={1680} height={420} rx={20} fill="#6ac0a0" stroke="#5a6a7a" strokeWidth={16} />
    {Array.from({ length: 14 }).map((_, i) => (
      <ellipse key={i} cx={-280 + i * 130} cy={760 + (i % 2) * 30} rx={120} ry={160} fill={i % 2 ? "#2f7a4f" : "#3a8a5a"} />
    ))}
    {[-2, -1, 0, 1, 2, 3, 4, 5].map((i) => (
      <line key={`m${i}`} x1={120 + i * 210} y1={420} x2={120 + i * 210} y2={840} stroke="#5a6a7a" strokeWidth={12} />
    ))}
    {/* holograma de ADN */}
    <g transform="translate(540 330)">
      {Array.from({ length: 14 }).map((_, i) => {
        const y = -120 + i * 18;
        const a = t * 2 + i * 0.5;
        return (
          <g key={i}>
            <line x1={Math.cos(a) * 60} y1={y} x2={-Math.cos(a) * 60} y2={y} stroke="#6ae8ff" strokeWidth={3} opacity={0.6} />
            <circle cx={Math.cos(a) * 60} cy={y} r={6} fill="#6ae8ff" filter="url(#glow)" />
            <circle cx={-Math.cos(a) * 60} cy={y} r={6} fill="#ff7ad8" filter="url(#glow)" />
          </g>
        );
      })}
    </g>
    {/* pantallas */}
    {[[-300, 300], [120, 280], [880, 280], [1300, 300]].map(([x, y], i) => (
      <g key={`sc${i}`}>
        <rect x={x - 110} y={y - 70} width={220} height={140} rx={10} fill="#0a1a2a" stroke="#6ae8ff" strokeWidth={4} />
        {[0, 1, 2, 3].map((j) => (
          <rect key={j} x={x - 90} y={y - 50 + j * 26} width={40 + ((j * 53 + Math.floor(t * 5) + i * 17) % 130)} height={10} rx={5} fill={j % 2 ? "#3ae07a" : "#9af0ff"} />
        ))}
      </g>
    ))}
    {/* luces de techo */}
    {[-260, 200, 540, 880, 1340].map((x, i) => (
      <g key={`l${i}`}>
        <rect x={x - 90} y={110} width={180} height={18} rx={9} fill="#e8f8ff" />
        <path d={`M ${x - 90} 128 L ${x + 90} 128 L ${x + 220} 1300 L ${x - 220} 1300 Z`} fill="#e8f8ff" opacity={0.05} />
      </g>
    ))}
    {/* piso con cables */}
    <rect x={L} y={1260} width={WW} height={H - 1260} fill="#2a3644" />
    {Array.from({ length: 14 }).map((_, i) => (
      <line key={`fl${i}`} x1={L + i * 160} y1={1260} x2={L + i * 160 - 220} y2={H} stroke="#3a4858" strokeWidth={3} />
    ))}
    {[0, 1, 2].map((i) => (
      <path key={`cb${i}`} d={`M ${-400 + i * 40} 1500 Q 200 ${1440 + i * 30} 600 ${1520 + i * 10} T 1500 ${1480 + i * 20}`} stroke={["#e8b923", "#2f6fb8", "#c0392b"][i]} strokeWidth={8} fill="none" />
    ))}
    {/* cápsulas de fondo */}
    {[-320, 1360].map((x, i) => (
      <g key={`pd${i}`} transform={`translate(${x} 1300) scale(0.75)`}>
        <path d="M -220 0 Q -230 -90 -150 -110 L 150 -110 Q 230 -90 220 0 Z" fill="#d8e2ea" stroke={INK} strokeWidth={6} />
        <path d="M -210 -100 Q -200 -200 0 -210 Q 200 -200 210 -100 Z" fill="rgba(170,220,255,0.55)" stroke={INK} strokeWidth={6} />
        <ellipse cx={0} cy={-120} rx={190} ry={60} fill="#6ae8ff" opacity={0.25 + 0.15 * Math.sin(t * 6 + i)} />
      </g>
    ))}
  </Svg>
);

/** Oficina de Selfridge: escritorio, pantallas, ventanal a la selva. */
export const Office: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Defs />
    <Sky id="of" stops={["#2a3440", "#3a4654", "#2a3440"]} />
    <rect x={-200} y={420} width={1480} height={620} rx={10} fill="#8fd8ff" stroke="#1a2430" strokeWidth={18} />
    {Array.from({ length: 10 }).map((_, i) => (
      <ellipse key={i} cx={-160 + i * 160} cy={960} rx={150} ry={130} fill={i % 2 ? "#3a8a5a" : "#2f7a4f"} />
    ))}
    {[260, 740].map((x, i) => (
      <line key={i} x1={x} y1={420} x2={x} y2={1040} stroke="#1a2430" strokeWidth={14} />
    ))}
    {/* pantallas con gráficos */}
    {[-380, 1340].map((x, i) => (
      <g key={i}>
        <rect x={x - 90} y={560} width={180} height={300} rx={10} fill="#0a1a2a" stroke="#6ae8ff" strokeWidth={4} />
        <path d={`M ${x - 70} 820 L ${x - 30} 760 L ${x + 10} 790 L ${x + 60} ${680 + 20 * Math.sin(t)}`} stroke="#3ae07a" strokeWidth={6} fill="none" />
        <text x={x} y={620} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={30} fill="#6ae8ff">$$$</text>
      </g>
    ))}
    <rect x={-460} y={1240} width={2000} height={680} fill="#3a2e28" />
    {/* escritorio */}
    <g stroke={INK} strokeWidth={6}>
      <rect x={180} y={1220} width={720} height={60} rx={10} fill="#5a3e2e" />
      <rect x={220} y={1280} width={40} height={180} fill="#4a3226" />
      <rect x={820} y={1280} width={40} height={180} fill="#4a3226" />
    </g>
    {/* mini golf */}
    <rect x={-380} y={1430} width={400} height={50} rx={20} fill="#3a9a4a" stroke={INK} strokeWidth={4} />
    <circle cx={-60} cy={1452} r={10} fill="#111" />
  </Svg>
);

/** Árbol Madre visto de afuera: tronco colosal, raíces, ramas en espiral. */
export const HomeTree: React.FC<{ t: number; burn?: number; fall?: number; night?: boolean }> = ({ t, burn = 0, fall = 0, night = false }) => (
  <Svg>
    <Defs />
    <Sky id={night ? "htn" : "htd"} stops={night ? ["#06102a", "#0c2a40", "#0e3a3a"] : ["#7ac8f0", "#c8ecea", "#9ad0a8"]} />
    {night ? <Stars t={t} n={50} maxY={700} /> : null}
    {/* selva alrededor */}
    {Array.from({ length: 14 }).map((_, i) => (
      <ellipse key={i} cx={L + i * 150} cy={1050 + (i % 3) * 20} rx={150} ry={150} fill={night ? "#0e3a40" : i % 2 ? "#3a8a5a" : "#2f7a4f"} />
    ))}
    {/* el árbol (se inclina y cae con fall) */}
    <g transform={`rotate(${fall * 38} 640 1250)`}>
      <path d="M 380 1260 Q 430 900 400 300 Q 520 220 700 230 Q 860 260 880 300 Q 840 900 900 1260 Z" fill={night ? "#1e3a40" : "#5a6a4a"} stroke={INK} strokeWidth={7} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M ${430 + i * 100} 1240 Q ${450 + i * 90} 800 ${470 + i * 70} 320`} stroke={night ? "#14282e" : "#46543a"} strokeWidth={14} fill="none" opacity={0.7} />
      ))}
      {/* copa gigante */}
      {Array.from({ length: 9 }).map((_, i) => (
        <ellipse key={i} cx={300 + i * 85} cy={260 - Math.sin(i * 0.7) * 80} rx={170} ry={110} fill={night ? "#163a3a" : i % 2 ? "#3a8a4a" : "#2f9a5a"} stroke={INK} strokeWidth={5} />
      ))}
      {/* luces del clan */}
      {night
        ? Array.from({ length: 16 }).map((_, i) => <circle key={i} cx={430 + rnd(`ht${i}`) * 420} cy={400 + rnd(`hty${i}`) * 800} r={6} fill="#ffd27a" filter="url(#glow)" />)
        : null}
      {/* raíces arco */}
      <path d="M 300 1270 Q 360 1100 440 1150 M 960 1270 Q 900 1100 840 1150" stroke={INK} strokeWidth={30} fill="none" />
      <path d="M 300 1270 Q 360 1100 440 1150 M 960 1270 Q 900 1100 840 1150" stroke={night ? "#1e3a40" : "#5a6a4a"} strokeWidth={22} fill="none" />
    </g>
    {/* fuego */}
    {burn > 0
      ? Array.from({ length: 14 }).map((_, i) => {
          const fx = 380 + rnd(`fi${i}`) * 520;
          const fy = 500 + rnd(`fiy${i}`) * 700;
          const h = 90 + 60 * Math.sin(t * 9 + i);
          return (
            <g key={i} opacity={burn}>
              <ellipse cx={fx} cy={fy} rx={70} ry={h} fill="#ff7a1a" opacity={0.55} filter="url(#soft)" />
              <path d={`M ${fx - 30} ${fy + 30} Q ${fx - 34} ${fy - h * 0.6} ${fx} ${fy - h} Q ${fx + 34} ${fy - h * 0.6} ${fx + 30} ${fy + 30} Z`} fill="#ffb02a" stroke="#ff5a1a" strokeWidth={4} />
            </g>
          );
        })
      : null}
    {burn > 0 ? <rect x={L} y={0} width={WW} height={H} fill="#ff6a2a" opacity={0.15 * burn} /> : null}
    {/* humo */}
    {burn > 0
      ? Array.from({ length: 8 }).map((_, i) => (
          <circle key={`sm${i}`} cx={420 + i * 70 + Math.sin(t + i) * 30} cy={300 - ((t * 60 + i * 80) % 400)} r={90} fill="#3a3a3a" opacity={0.35 * burn} filter="url(#soft)" />
        ))
      : null}
    <path d="M -460 1260 Q 540 1215 1540 1260 L 1540 1920 L -460 1920 Z" fill={night ? "#0a2a2a" : "#3a7a3a"} />
  </Svg>
);

/** Interior del Árbol Madre: espiral de ramas, hamacas, fogata. */
export const HomeTreeInside: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Defs />
    <Sky id="hti" stops={["#1a1410", "#3a2a1a", "#5a3a20"]} />
    {/* paredes de madera curvas */}
    {Array.from({ length: 12 }).map((_, i) => (
      <path key={i} d={`M ${L + i * 180} 1920 Q ${L + i * 180 + 120} 900 ${L + i * 180 + 40} 0`} stroke={i % 2 ? "#4a3420" : "#5a4028"} strokeWidth={90} fill="none" />
    ))}
    {/* espiral de ramas con na'vi */}
    {[0, 1, 2, 3].map((i) => (
      <path key={`r${i}`} d={`M ${-200 + i * 80} ${1000 - i * 220} Q 540 ${900 - i * 220} ${1300 - i * 80} ${1000 - i * 220}`} stroke="#6a4a2a" strokeWidth={30} fill="none" />
    ))}
    {/* hamacas */}
    {[[-100, 560], [300, 380], [800, 520], [1150, 330]].map(([x, y], i) => (
      <path key={`h${i}`} d={`M ${x - 80} ${y} Q ${x} ${y + 70} ${x + 80} ${y}`} stroke="#c9a060" strokeWidth={14} fill="none" />
    ))}
    {/* faroles bioluminiscentes */}
    {Array.from({ length: 12 }).map((_, i) => (
      <circle key={`l${i}`} cx={L + 100 + rnd(`htl${i}`) * (WW - 200)} cy={150 + rnd(`htly${i}`) * 900} r={8} fill={i % 2 ? "#7af4ff" : "#ffd27a"} filter="url(#glow)" opacity={0.7 + 0.3 * Math.sin(t * 2 + i)} />
    ))}
    <rect x={L} y={1270} width={WW} height={H - 1270} fill="#3a2a18" />
    {/* fogata */}
    <g transform={T(540, 1330)}>
      <ellipse cx={0} cy={0} rx={240} ry={60} fill="#ff9a3a" opacity={0.25} filter="url(#soft)" />
      <path d="M -60 10 L 60 -10 M -60 -10 L 60 10" stroke="#4a2a14" strokeWidth={20} />
      <path d={`M -40 0 Q -50 ${-80 - 10 * Math.sin(t * 8)} 0 ${-130 - 15 * Math.sin(t * 7)} Q 50 -80 40 0 Z`} fill="#ffb02a" stroke="#ff5a1a" strokeWidth={4} />
    </g>
  </Svg>
);

/** Roca flotante. */
const FloatRock: React.FC<{ x: number; y: number; s?: number; t: number; seed: number; fall?: boolean }> = ({ x, y, s = 1, t, seed, fall = true }) => (
  <g transform={T(x, y + Math.sin(t * 0.6 + seed) * 12, s)}>
    <path d="M -220 0 Q -200 -80 -100 -110 Q 20 -150 140 -100 Q 230 -60 220 0 Q 160 140 40 260 Q -40 320 -80 200 Q -160 100 -220 0 Z" fill="#7a7e78" stroke={INK} strokeWidth={6} />
    <path d="M -180 0 Q -60 60 40 240" stroke="#5a5e58" strokeWidth={10} fill="none" />
    <path d="M -222 -4 Q -120 -140 0 -150 Q 140 -140 222 -4 Q 120 -60 0 -70 Q -120 -60 -222 -4 Z" fill="#3a9a4a" stroke={INK} strokeWidth={5} />
    {/* lianas colgando */}
    {[-150, -60, 60, 170].map((d, i) => (
      <path key={i} d={`M ${d} ${20 + Math.abs(d) * 0.2} Q ${d + 14 * Math.sin(t + i)} 200 ${d - 6} ${300 + (i % 2) * 80}`} stroke="#2f7a3f" strokeWidth={7} fill="none" />
    ))}
    {/* cascada */}
    {fall ? (
      <g>
        <path d="M -40 -70 L 30 -70 L 50 600 L -60 600 Z" fill="#e8f8ff" opacity={0.75} />
        {[0, 1, 2].map((i) => (
          <line key={i} x1={-20 + i * 20} y1={-60 + ((t * 300 + i * 60) % 600)} x2={-20 + i * 20} y2={-10 + ((t * 300 + i * 60) % 600)} stroke="#ffffff" strokeWidth={6} />
        ))}
      </g>
    ) : null}
  </g>
);

/** Montañas flotantes con cascadas, nubes y arcos de piedra. */
export const FloatingMountains: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Defs />
    <Sky id="fm" stops={["#5ab0e8", "#a8dcf0", "#e6f6f8"]} />
    <GasGiant x={1300} y={260} r={200} />
    {/* nubes de abajo */}
    {Array.from({ length: 12 }).map((_, i) => (
      <ellipse key={i} cx={L + i * 180 + Math.sin(t * 0.3 + i) * 30} cy={1500 + (i % 3) * 60} rx={220} ry={90} fill="#ffffff" opacity={0.85} />
    ))}
    <FloatRock x={-260} y={520} s={0.6} t={t} seed={1} />
    <FloatRock x={1340} y={620} s={0.7} t={t} seed={2} />
    <FloatRock x={220} y={780} s={0.45} t={t} seed={3} fall={false} />
    <FloatRock x={880} y={450} s={0.5} t={t} seed={4} />
    {/* arco de piedra */}
    <path d="M 120 1200 Q 540 600 960 1200" stroke={INK} strokeWidth={70} fill="none" />
    <path d="M 120 1200 Q 540 600 960 1200" stroke="#8a8e86" strokeWidth={58} fill="none" />
    {/* roca principal (donde paran los personajes) */}
    <path d="M -460 1300 Q -200 1240 540 1250 Q 1280 1240 1540 1300 L 1540 1920 L -460 1920 Z" fill="#7a7e78" stroke={INK} strokeWidth={6} />
    <path d="M -460 1300 Q -200 1240 540 1250 Q 1280 1240 1540 1300 L 1540 1350 Q 540 1310 -460 1350 Z" fill="#3a9a4a" />
    {Array.from({ length: 50 }).map((_, i) => (
      <circle key={`n${i}`} cx={L + rnd(`fmn${i}`) * WW} cy={1550 + rnd(`fmy${i}`) * 300} r={3} fill="#5a5e58" />
    ))}
    {/* ikran volando lejos */}
    {[0, 1, 2].map((i) => {
      const x = ((t * 80 + i * 400) % 2000) + L;
      const y = 380 + i * 90 + Math.sin(t * 2 + i) * 20;
      const fl = Math.sin(t * 8 + i) * 18;
      return <path key={`ik${i}`} d={`M ${x - 40} ${y + fl} Q ${x - 20} ${y - 10} ${x} ${y} Q ${x + 20} ${y - 10} ${x + 40} ${y + fl}`} stroke="#3a2a6a" strokeWidth={6} fill="none" />;
    })}
  </Svg>
);

/** Árbol de las Voces: sauce con hebras rosadas que brillan. */
export const TreeOfVoices: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Defs />
    <Sky id="tv" stops={["#0a0a24", "#1a1440", "#2a1a3a"]} />
    <Stars t={t} n={60} maxY={800} />
    <path d="M 480 1270 Q 500 900 470 500 Q 540 440 610 500 Q 580 900 600 1270 Z" fill="#3a2a40" stroke={INK} strokeWidth={6} />
    {Array.from({ length: 50 }).map((_, i) => {
      const x0 = 540 + (i - 25) * 22;
      const sw = Math.sin(t * 0.8 + i * 0.4) * 14;
      return <path key={i} d={`M ${540 + (i - 25) * 6} 520 Q ${x0} 700 ${x0 + sw} ${1050 + (i % 5) * 40}`} stroke={i % 3 ? "#ff7ad8" : "#ffc8f0"} strokeWidth={3} fill="none" opacity={0.85} filter="url(#glow)" />;
    })}
    <ellipse cx={540} cy={500} rx={360} ry={90} fill="#ff7ad8" opacity={0.18} filter="url(#soft)" />
    <path d="M -460 1270 Q 540 1220 1540 1270 L 1540 1920 L -460 1920 Z" fill="#140c24" />
    <ellipse cx={540} cy={1420} rx={600} ry={80} fill="#ff7ad8" opacity={0.12} filter="url(#soft)" />
  </Svg>
);

/** Árbol de las Almas: hebras blancas luminosas, círculo de raíces, clan reunido. */
export const TreeOfSouls: React.FC<{ t: number; k?: number }> = ({ t, k = 1 }) => (
  <Svg>
    <Defs />
    <Sky id="ts" stops={["#040818", "#0a1a36", "#102a40"]} />
    <Stars t={t} n={90} maxY={900} />
    <ellipse cx={540} cy={600} rx={700} ry={360} fill="#bfe8ff" opacity={0.08 * k} filter="url(#soft)" />
    <path d="M 470 1250 Q 500 900 450 520 Q 540 460 630 520 Q 580 900 610 1250 Z" fill="#202a40" stroke={INK} strokeWidth={6} />
    {Array.from({ length: 70 }).map((_, i) => {
      const x0 = 540 + (i - 35) * 24;
      const sw = Math.sin(t * 0.6 + i * 0.3) * 12;
      return <path key={i} d={`M ${540 + (i - 35) * 5} 540 Q ${x0} 760 ${x0 + sw} ${1180 + (i % 4) * 30}`} stroke={i % 4 ? "#e8fbff" : "#9ae8ff"} strokeWidth={3} fill="none" opacity={0.6 + 0.4 * k} filter="url(#glow)" />;
    })}
    <path d="M -460 1270 Q 540 1225 1540 1270 L 1540 1920 L -460 1920 Z" fill="#0a1424" />
    {/* raíces luminosas en círculo */}
    <ellipse cx={540} cy={1430} rx={620} ry={110} fill="none" stroke="#9ae8ff" strokeWidth={6} opacity={0.6 * k} filter="url(#glow)" />
    <ellipse cx={540} cy={1430} rx={420} ry={70} fill="none" stroke="#e8fbff" strokeWidth={4} opacity={0.5 * k} filter="url(#glow)" />
    {Array.from({ length: 24 }).map((_, i) => {
      const a = (i / 24) * Math.PI * 2;
      return <line key={`rr${i}`} x1={540} y1={1430} x2={540 + Math.cos(a) * 620} y2={1430 + Math.sin(a) * 110} stroke="#9ae8ff" strokeWidth={2} opacity={0.35 * k} />;
    })}
  </Svg>
);

/** Cielo de batalla: atardecer en llamas, montañas flotantes, columnas de humo y fuego antiaéreo. */
export const BattleSky: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Defs />
    <Sky id="bs" stops={["#2a1a3a", "#7a2a3a", "#d8603a", "#f2a65a"]} />
    <circle cx={1150} cy={1150} r={260} fill="#ffd27a" opacity={0.55} filter="url(#soft)" />
    <FloatRock x={-260} y={820} s={0.85} t={t} seed={7} />
    <FloatRock x={1350} y={760} s={0.9} t={t} seed={8} />
    <FloatRock x={560} y={640} s={0.45} t={t} seed={9} fall={false} />
    {/* columnas de humo */}
    {[-200, 300, 900, 1300].map((x, i) => (
      <g key={i}>
        {[0, 1, 2, 3, 4].map((j) => (
          <circle key={j} cx={x + Math.sin(t * 0.8 + j + i) * 30 + j * 20} cy={1500 - j * 170 - ((t * 40) % 170)} r={90 + j * 25} fill="#2a2228" opacity={0.45 - j * 0.06} filter="url(#soft)" />
        ))}
      </g>
    ))}
    {/* fuego antiaéreo */}
    {Array.from({ length: 7 }).map((_, i) => {
      const ex = L + 200 + i * 280;
      const ey = 650 + (i % 3) * 180;
      const k = Math.max(0, Math.sin(t * 2.4 + i * 1.7));
      return <circle key={`e${i}`} cx={ex} cy={ey} r={30 + 60 * k} fill="#ffb02a" opacity={0.7 * k} filter="url(#soft)" />;
    })}
    {/* bosque abajo, ardiendo en partes */}
    {Array.from({ length: 16 }).map((_, i) => (
      <ellipse key={`f${i}`} cx={L + i * 130} cy={1640 + (i % 3) * 30} rx={150} ry={120} fill={i % 4 === 1 ? "#5a2a1a" : "#1f3a2a"} />
    ))}
    {[0, 1, 2, 3].map((i) => (
      <ellipse key={`fl${i}`} cx={L + 300 + i * 480} cy={1560} rx={80} ry={60 + 15 * Math.sin(t * 8 + i)} fill="#ff7a1a" opacity={0.7} filter="url(#soft)" />
    ))}
  </Svg>
);

/** Cielo para volar: azul intenso, nubes y montañas flotantes que pasan (parallax con t). */
export const SkyFlight: React.FC<{ t: number; speed?: number }> = ({ t, speed = 1 }) => {
  const off = (k: number) => ((t * 140 * speed * k) % 2600);
  return (
    <Svg>
      <Defs />
      <Sky id="sf" stops={["#2a7ad8", "#6ab8f0", "#bfe6f8", "#f2f8fa"]} />
      <GasGiant x={1200} y={420} r={240} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse key={`c${i}`} cx={1700 - ((off(0.4) + i * 430) % 2600)} cy={620 + (i % 3) * 120} rx={200} ry={60} fill="#ffffff" opacity={0.75} />
      ))}
      {[0, 1, 2].map((i) => (
        <FloatRock key={`r${i}`} x={1700 - ((off(0.7) + i * 870) % 2600)} y={820 + (i % 2) * 160} s={0.7 + (i % 2) * 0.2} t={t} seed={10 + i} fall={i !== 1} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <ellipse key={`b${i}`} cx={1700 - ((off(1.2) + i * 380) % 2600)} cy={1550 + (i % 3) * 60} rx={260} ry={110} fill="#ffffff" opacity={0.95} />
      ))}
    </Svg>
  );
};
