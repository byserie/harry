import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";
import { H, Svg } from "../scenes/bg1";
import { FONT } from "../lib/font";

/** Lugares de la historia "dame la mitad". Se dibujan de x=-460 a 1540 (16:9). */
const L = -460;
const WW = 2000;
const rnd = (k: string | number) => random(String(k));

const Glow: React.FC = () => (
  <defs>
    <filter id="g2" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="10" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="s2">
      <feGaussianBlur stdDeviation="16" />
    </filter>
  </defs>
);

/** Living de la casa de mamá: sillón, tele, microondas en la cocina abierta, puerta de entrada. */
export const LivingRoom: React.FC<{ t: number; pointTV?: number; pointSofa?: number; pointMicro?: number; doorOpen?: number }> = ({ t, pointTV = 0, pointSofa = 0, pointMicro = 0, doorOpen = 0 }) => {
  const hl = (k: number) => (k > 0 ? <rect x={-14} y={-14} width={0} height={0} /> : null);
  void hl;
  const ring = (x: number, y: number, rx: number, ry: number, k: number) =>
    k > 0 ? <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke="#ff3a3a" strokeWidth={10} strokeDasharray="22 12" opacity={k} /> : null;
  return (
    <Svg>
      <Glow />
      <defs>
        <linearGradient id="lrw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8d8b8" />
          <stop offset="1" stopColor="#d8c4a0" />
        </linearGradient>
      </defs>
      <rect x={L} y={0} width={WW} height={H} fill="url(#lrw)" />
      {Array.from({ length: 30 }).map((_, i) => (
        <rect key={i} x={L + i * 68} y={0} width={4} height={1300} fill="#c8b490" opacity={0.6} />
      ))}
      {/* puerta de entrada */}
      <g stroke={INK} strokeWidth={6}>
        <rect x={1220} y={560} width={260} height={740} fill="#6a3e22" />
        <rect x={1240} y={580} width={220} height={700} fill="#1a2a4a" />
        <g transform={`translate(1240 580) scale(${1 - doorOpen * 0.8} 1)`}>
          <rect x={0} y={0} width={220} height={700} fill="#8a5a2a" />
          <rect x={30} y={40} width={160} height={260} fill="#9a6a3a" />
          <rect x={30} y={360} width={160} height={280} fill="#9a6a3a" />
          <circle cx={190} cy={380} r={12} fill="#e8c84a" />
        </g>
      </g>
      {/* cocina abierta con microondas */}
      <g stroke={INK} strokeWidth={5}>
        <rect x={-440} y={700} width={420} height={380} fill="#f2ead8" />
        <rect x={-440} y={900} width={420} height={40} fill="#8a8a8a" />
        <rect x={-400} y={800} width={160} height={100} rx={8} fill="#e8e8e8" />
        <rect x={-390} y={810} width={110} height={80} fill="#2a2a34" />
        <circle cx={-260} cy={830} r={6} fill="#3ae07a" />
        <rect x={-200} y={720} width={150} height={170} fill="#c8a26a" />
      </g>
      {ring(-320, 850, 120, 80, pointMicro)}
      {/* tele grande */}
      <g stroke={INK} strokeWidth={6}>
        <rect x={320} y={540} width={460} height={270} rx={10} fill="#14141c" />
        <rect x={336} y={556} width={428} height={238} fill={`hsl(${(t * 40) % 360} 60% 40%)`} opacity={0.85} />
        <rect x={520} y={810} width={60} height={50} fill="#2a2a34" />
        <rect x={260} y={860} width={580} height={150} fill="#7a4a2a" />
      </g>
      {ring(550, 680, 280, 170, pointTV)}
      {/* cuadros y planta */}
      <rect x={60} y={480} width={160} height={200} fill="#8a5a2a" stroke={INK} strokeWidth={4} />
      <rect x={72} y={492} width={136} height={176} fill="#bfe0f0" />
      <circle cx={140} cy={560} r={30} fill="#f3d2b6" />
      <g>
        <rect x={980} y={980} width={90} height={110} fill="#c0603a" stroke={INK} strokeWidth={4} />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M 1025 980 q ${(i - 2) * 40} -90 ${(i - 2) * 70} ${-140 - (i % 2) * 40}`} stroke="#3a9a4a" strokeWidth={14} fill="none" strokeLinecap="round" />
        ))}
      </g>
      {/* piso y alfombra */}
      <rect x={L} y={1290} width={WW} height={H - 1290} fill="#a87a4a" />
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={`f${i}`} x1={L + i * 140} y1={1290} x2={L + i * 140 - 160} y2={H} stroke="#8a5a2a" strokeWidth={3} />
      ))}
      <ellipse cx={540} cy={1560} rx={800} ry={150} fill="#c8504a" opacity={0.8} />
      <ellipse cx={540} cy={1560} rx={700} ry={110} fill="none" stroke="#f2e6d0" strokeWidth={8} opacity={0.6} />
      {/* sillón (adelante de la pared, atrás de los personajes) */}
      <g stroke={INK} strokeWidth={6}>
        <rect x={180} y={1080} width={740} height={230} rx={40} fill="#3a7a9a" />
        <rect x={140} y={1140} width={110} height={190} rx={30} fill="#2f6a88" />
        <rect x={850} y={1140} width={110} height={190} rx={30} fill="#2f6a88" />
        <rect x={240} y={1180} width={320} height={110} rx={20} fill="#4a8aaa" />
        <rect x={580} y={1180} width={320} height={110} rx={20} fill="#4a8aaa" />
      </g>
      {ring(550, 1200, 460, 170, pointSofa)}
    </Svg>
  );
};

/** Licorería de noche: estantes con botellas, mostrador, caja, neón. */
export const LiquorStore: React.FC<{ t: number; robbed?: number }> = ({ t, robbed = 0 }) => (
  <Svg>
    <Glow />
    <rect x={L} y={0} width={WW} height={H} fill="#2a2430" />
    {/* estantes */}
    {Array.from({ length: 5 }).map((_, r) => (
      <g key={r}>
        <rect x={L} y={300 + r * 180} width={WW} height={16} fill="#6a4a2a" />
        {Array.from({ length: 40 }).map((_, i) => {
          const c = ["#3a8a3a", "#8a3a2a", "#c8a03a", "#3a5a9a", "#e8e8e8", "#8a2a6a"][(i + r) % 6];
          return (
            <g key={i}>
              <rect x={L + 20 + i * 50} y={300 + r * 180 - 110 + (i % 3) * 8} width={30} height={110 - (i % 3) * 8} rx={6} fill={c} stroke={INK} strokeWidth={2} />
              <rect x={L + 28 + i * 50} y={300 + r * 180 - 130 + (i % 3) * 8} width={14} height={24} fill={c} stroke={INK} strokeWidth={2} />
            </g>
          );
        })}
      </g>
    ))}
    {/* neón */}
    <text x={540} y={170} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={110} fill="#ff4ab0" filter="url(#g2)" opacity={0.75 + 0.25 * Math.sin(t * 7)}>LICORERÍA</text>
    {/* mostrador */}
    <rect x={L} y={1150} width={WW} height={H - 1150} fill="#3a2a20" />
    <rect x={-200} y={1080} width={1100} height={200} fill="#5a3a2a" stroke={INK} strokeWidth={6} />
    <rect x={700} y={1000} width={150} height={80} fill="#2a2a34" stroke={INK} strokeWidth={4} />
    <rect x={710} y={1010} width={130} height={40} fill="#3ae07a" opacity={0.7} />
    {robbed > 0 ? <rect x={L} y={0} width={WW} height={H} fill="#ff2a2a" opacity={0.18 * robbed * (0.5 + 0.5 * Math.sin(t * 12))} /> : null}
  </Svg>
);

/** Calle de noche con el auto (para "lo llevaba a su casa"). */
export const NightStreet2: React.FC<{ t: number; carX?: number }> = ({ t, carX = 540 }) => (
  <Svg>
    <Glow />
    <rect x={L} y={0} width={WW} height={H} fill="#0e1428" />
    {Array.from({ length: 50 }).map((_, i) => (
      <circle key={i} cx={L + rnd(`ns${i}`) * WW} cy={rnd(`nsy${i}`) * 600} r={1.5} fill="#fff" opacity={0.7} />
    ))}
    <circle cx={1300} cy={250} r={70} fill="#f4f0dc" />
    {[-380, -60, 300, 700, 1100, 1450].map((x, i) => (
      <g key={i}>
        <rect x={x} y={560 + (i % 2) * 80} width={260} height={700} fill="#1a2240" stroke={INK} strokeWidth={4} />
        {[0, 1, 2, 3].map((j) => (
          <rect key={j} x={x + 30 + (j % 2) * 110} y={620 + (i % 2) * 80 + Math.floor(j / 2) * 160} width={80} height={90} fill={rnd(`w${i}${j}`) > 0.4 ? "#ffd27a" : "#2a3460"} />
        ))}
      </g>
    ))}
    {/* farolas */}
    {[0, 800].map((x, i) => (
      <g key={`l${i}`}>
        <rect x={x} y={760} width={14} height={540} fill="#3a3a44" />
        <ellipse cx={x + 7} cy={760} rx={30} ry={14} fill="#ffe8a0" filter="url(#g2)" />
        <path d={`M ${x - 100} 1300 L ${x + 114} 1300 L ${x + 30} 770 L ${x - 16} 770 Z`} fill="#ffe8a0" opacity={0.08} />
      </g>
    ))}
    <rect x={L} y={1300} width={WW} height={H - 1300} fill="#2a2a34" />
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={`d${i}`} x={L + i * 180} y={1560} width={100} height={14} fill="#e8e8a0" />
    ))}
    {/* auto */}
    <g transform={`translate(${carX} 1420)`}>
      <path d="M -260 0 L -230 -90 Q -150 -170 0 -170 Q 140 -170 200 -90 L 270 -70 Q 290 -20 270 20 L -260 20 Z" fill="#c0392b" stroke={INK} strokeWidth={6} />
      <path d="M -190 -95 Q -130 -150 -20 -150 L -20 -95 Z M 10 -150 Q 110 -150 160 -95 L 10 -95 Z" fill="#9ad8ff" stroke={INK} strokeWidth={4} />
      <circle cx={-150} cy={20} r={44} fill="#1a1a1a" stroke={INK} strokeWidth={5} />
      <circle cx={170} cy={20} r={44} fill="#1a1a1a" stroke={INK} strokeWidth={5} />
      <ellipse cx={280} cy={-30} rx={16} ry={10} fill="#fff4c2" filter="url(#g2)" />
    </g>
  </Svg>
);

/** Playa de México: mar turquesa, palmeras, sol, sombrillas. */
export const MexicoBeach: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Glow />
    <defs>
      <linearGradient id="mxs" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3ab0f0" />
        <stop offset="1" stopColor="#bff0f8" />
      </linearGradient>
    </defs>
    <rect x={L} y={0} width={WW} height={H} fill="url(#mxs)" />
    <circle cx={1250} cy={320} r={130} fill="#ffe14d" filter="url(#g2)" />
    {[0, 1].map((i) => (
      <ellipse key={i} cx={L + ((t * 15 + i * 900) % WW)} cy={260 + i * 100} rx={220} ry={50} fill="#fff" opacity={0.85} />
    ))}
    <rect x={L} y={900} width={WW} height={300} fill="#1ac0c8" />
    {Array.from({ length: 4 }).map((_, i) => {
      const off = ((t * 50 + i * 80) % 160) - 160;
      let d = `M ${L + off} ${930 + i * 50}`;
      for (let k = 0; k < 14; k++) d += " q 40 -12 80 0 t 80 0";
      return <path key={i} d={d} stroke="#e8ffff" strokeWidth={5} fill="none" opacity={0.7} />;
    })}
    <path d="M -460 1180 Q 540 1130 1540 1180 L 1540 1920 L -460 1920 Z" fill="#f6dfa0" />
    {/* palmeras */}
    {[-320, 1380].map((x, k) => (
      <g key={k} transform={`translate(${x} 1300)`}>
        <path d="M 0 0 Q 40 -260 -20 -560" stroke={INK} strokeWidth={34} fill="none" />
        <path d="M 0 0 Q 40 -260 -20 -560" stroke="#8a6a3a" strokeWidth={24} fill="none" />
        {Array.from({ length: 7 }).map((_, i) => {
          const a = ((-150 + i * 50 + Math.sin(t + i) * 5) * Math.PI) / 180;
          return <path key={i} d={`M -20 -560 q ${Math.cos(a) * 140} ${Math.sin(a) * 60 - 50} ${Math.cos(a) * 270} ${Math.sin(a) * 140 + 20}`} stroke={i % 2 ? "#2fb070" : "#3ad08a"} strokeWidth={30} fill="none" strokeLinecap="round" />;
        })}
      </g>
    ))}
    {/* sombrilla */}
    <g transform="translate(980 1240)">
      <line x1={0} y1={0} x2={0} y2={-260} stroke={INK} strokeWidth={8} />
      <path d="M -170 -240 Q 0 -360 170 -240 Z" fill="#e8503a" stroke={INK} strokeWidth={5} />
      <path d="M -60 -300 L 0 -240 L 60 -300" stroke="#fff" strokeWidth={10} fill="none" />
    </g>
    <text x={540} y={160} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={80} fill="#fff" stroke={INK} strokeWidth={3}>MÉXICO 🌴</text>
  </Svg>
);

/** Cuarto de hotel (llamada de San Valentín). */
export const HotelRoom: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Glow />
    <rect x={L} y={0} width={WW} height={H} fill="#3a3448" />
    {Array.from({ length: 20 }).map((_, i) => (
      <rect key={i} x={L + i * 100} y={0} width={50} height={1300} fill="#443c54" />
    ))}
    {/* ventana con ciudad */}
    <rect x={820} y={420} width={520} height={500} fill="#0e1428" stroke="#c8b8a0" strokeWidth={16} />
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={`b${i}`} x={830 + i * 42} y={640 + (i % 3) * 60} width={36} height={280} fill="#1a2240" />
    ))}
    {Array.from({ length: 30 }).map((_, i) => (
      <rect key={`w${i}`} x={835 + rnd(`hw${i}`) * 490} y={660 + rnd(`hwy${i}`) * 240} width={8} height={10} fill="#ffd27a" opacity={0.8} />
    ))}
    {/* corazones de San Valentín en la mesa */}
    <text x={250} y={1000} fontSize={90}>💐</text>
    <text x={360} y={1010} fontSize={60} opacity={0.6 + 0.4 * Math.sin(t * 3)}>❤️</text>
    {/* cama */}
    <rect x={L} y={1280} width={WW} height={H - 1280} fill="#2a2434" />
    <g stroke={INK} strokeWidth={6}>
      <rect x={-380} y={1050} width={700} height={260} rx={20} fill="#f2ead8" />
      <rect x={-380} y={950} width={60} height={360} fill="#6a4a3a" />
      <rect x={-300} y={1010} width={200} height={70} rx={30} fill="#ffffff" />
      <rect x={-380} y={1150} width={700} height={160} fill="#8a3a4a" />
    </g>
    <rect x={460} y={1060} width={160} height={240} fill="#6a4a3a" stroke={INK} strokeWidth={5} />
    <ellipse cx={540} cy={1040} rx={40} ry={18} fill="#ffe8a0" filter="url(#g2)" />
  </Svg>
);

/** Joyería: vitrinas brillantes con anillos. */
export const JewelryStore: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Glow />
    <rect x={L} y={0} width={WW} height={H} fill="#1a1428" />
    <text x={540} y={200} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={100} fill="#ffe08a" filter="url(#g2)">JOYERÍA 💍</text>
    {Array.from({ length: 4 }).map((_, i) => (
      <g key={i} stroke={INK} strokeWidth={5}>
        <rect x={-380 + i * 500} y={880} width={420} height={420} fill="#2a2440" />
        <rect x={-370 + i * 500} y={880} width={400} height={140} fill="rgba(200,230,255,0.25)" />
        {[0, 1, 2].map((j) => (
          <g key={j}>
            <circle cx={-310 + i * 500 + j * 130} cy={960} r={22} fill="none" stroke="#ffd23a" strokeWidth={8} />
            <circle cx={-310 + i * 500 + j * 130} cy={936} r={9} fill="#e8fbff" filter="url(#g2)" opacity={0.6 + 0.4 * Math.sin(t * 5 + j + i)} />
          </g>
        ))}
      </g>
    ))}
    <rect x={L} y={1300} width={WW} height={H - 1300} fill="#3a2a4a" />
    {Array.from({ length: 30 }).map((_, i) => (
      <circle key={`sp${i}`} cx={L + rnd(`js${i}`) * WW} cy={300 + rnd(`jsy${i}`) * 700} r={3} fill="#fff" opacity={Math.max(0, Math.sin(t * 4 + i))} />
    ))}
  </Svg>
);

/** Lavadero con secarropas (abre la puerta con k). */
export const Laundry: React.FC<{ t: number; open?: number }> = ({ t, open = 0 }) => (
  <Svg>
    <Glow />
    <rect x={L} y={0} width={WW} height={H} fill="#d8e8ee" />
    {Array.from({ length: 22 }).map((_, i) =>
      Array.from({ length: 8 }).map((_, j) => <rect key={`${i}-${j}`} x={L + i * 92} y={560 + j * 92} width={88} height={88} fill={(i + j) % 2 ? "#f6ecd8" : "#e8dcc0"} />),
    )}
    {/* lavarropas y secarropas */}
    {[300, 640].map((x, i) => (
      <g key={i} stroke={INK} strokeWidth={6}>
        <rect x={x} y={880} width={300} height={420} rx={20} fill="#f6f6f6" />
        <rect x={x} y={880} width={300} height={70} rx={20} fill="#e0e4e8" />
        <circle cx={x + 150} cy={1110} r={110} fill="#bfe0f0" />
        {i === 1 ? (
          <g transform={`translate(${x + 40} 1110) scale(${1 - open} 1) translate(${-x - 40} -1110)`}>
            <circle cx={x + 150} cy={1110} r={110} fill="#d8eef8" stroke={INK} strokeWidth={6} />
          </g>
        ) : (
          <circle cx={x + 150} cy={1110} r={80} fill="#9ad0e8" />
        )}
        <circle cx={x + 250} cy={915} r={14} fill={i === 1 ? "#3ae07a" : "#ff8a3a"} />
      </g>
    ))}
    {/* ropa colgada */}
    <line x1={-300} y1={420} x2={1400} y2={420} stroke="#6a6a6a" strokeWidth={4} />
    {[-200, 0, 200, 900, 1100].map((x, i) => (
      <path key={`r${i}`} d={`M ${x} 420 l -40 30 l 0 120 l 100 0 l 0 -120 l -40 -30 Z`} fill={["#d8508a", "#3a6ab8", "#ffe14d", "#3ab88a", "#e8803a"][i]} stroke={INK} strokeWidth={4} transform={`rotate(${Math.sin(t * 2 + i) * 4} ${x} 420)`} />
    ))}
    <rect x={L} y={1300} width={WW} height={H - 1300} fill="#9aa8b0" />
  </Svg>
);
