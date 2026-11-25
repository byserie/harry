import React from "react";
import { AbsoluteFill, random } from "remotion";
import { INK } from "../characters/cast";
import { H, Svg } from "../scenes/bg1";
import { FONT } from "../lib/font";
import { LandCtx } from "../engine/layout";

/** Mundos de la historia familiar. Se dibujan de x=-460 a 1540 para llenar el 16:9. */
const L = -460;
const WW = 2000;
const rnd = (k: string | number) => random(String(k));

const Defs: React.FC = () => (
  <defs>
    <filter id="rglow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="10" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="rsoft">
      <feGaussianBlur stdDeviation="16" />
    </filter>
  </defs>
);

const Frame: React.FC<{ x: number; y: number; w: number; h: number; col: string; seed: number }> = ({ x, y, w, h, col, seed }) => (
  <g>
    <rect x={x - 8} y={y - 8} width={w + 16} height={h + 16} fill="#8a5a2a" stroke={INK} strokeWidth={4} />
    <rect x={x} y={y} width={w} height={h} fill={col} />
    <circle cx={x + w * 0.3} cy={y + h * 0.4} r={h * 0.14} fill="#f3d2b6" />
    <circle cx={x + w * 0.65} cy={y + h * 0.45} r={h * 0.12} fill="#e8bf9a" />
    <rect x={x + w * 0.15} y={y + h * 0.6} width={w * 0.7} height={h * 0.4} fill={seed % 2 ? "#5a7aa8" : "#a85a6a"} opacity={0.7} />
  </g>
);

/** Comedor familiar cálido de noche: empapelado, ventana con nieve, cuadros, lámpara, aparador. */
export const DiningRoom: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Defs />
    <defs>
      <linearGradient id="dwall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7a4a3a" />
        <stop offset="1" stopColor="#a8664a" />
      </linearGradient>
      <linearGradient id="dfloor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6a3e22" />
        <stop offset="1" stopColor="#3a2010" />
      </linearGradient>
    </defs>
    <rect x={L} y={0} width={WW} height={H} fill="url(#dwall)" />
    {/* empapelado con rayas y florcitas */}
    {Array.from({ length: 34 }).map((_, i) => (
      <rect key={i} x={L + i * 60} y={0} width={22} height={1300} fill="#ffffff" opacity={0.05} />
    ))}
    {Array.from({ length: 60 }).map((_, i) => (
      <circle key={`f${i}`} cx={L + 30 + (i % 30) * 66} cy={150 + Math.floor(i / 30) * 420 + (i % 2) * 200} r={6} fill="#ffd8a8" opacity={0.25} />
    ))}
    {/* zócalo de madera */}
    <rect x={L} y={1050} width={WW} height={250} fill="#5a3420" />
    {Array.from({ length: 22 }).map((_, i) => (
      <rect key={`p${i}`} x={L + 20 + i * 92} y={1075} width={72} height={190} fill="none" stroke="#7a4a2a" strokeWidth={5} />
    ))}
    {/* ventana con nieve */}
    <g>
      <rect x={1080} y={380} width={380} height={520} fill="#1a2a4a" stroke="#f2e6d0" strokeWidth={18} />
      <line x1={1270} y1={380} x2={1270} y2={900} stroke="#f2e6d0" strokeWidth={12} />
      <line x1={1080} y1={640} x2={1460} y2={640} stroke="#f2e6d0" strokeWidth={12} />
      <circle cx={1380} cy={470} r={34} fill="#f4f0dc" opacity={0.9} />
      {Array.from({ length: 30 }).map((_, i) => (
        <circle key={`s${i}`} cx={1090 + rnd(`sn${i}`) * 360} cy={390 + ((t * 40 + rnd(`sny${i}`) * 500) % 500)} r={3 + (i % 3)} fill="#ffffff" opacity={0.85} />
      ))}
      <path d="M 1050 360 Q 1060 640 1030 920 L 1000 920 Q 1020 640 1010 360 Z" fill="#a83a3a" stroke={INK} strokeWidth={4} />
      <path d="M 1490 360 Q 1480 640 1510 920 L 1540 920 Q 1520 640 1530 360 Z" fill="#a83a3a" stroke={INK} strokeWidth={4} />
    </g>
    {/* cuadros familiares */}
    <Frame x={-360} y={430} w={180} h={140} col="#c8dce8" seed={1} />
    <Frame x={-120} y={470} w={130} h={170} col="#e8d8b8" seed={2} />
    <Frame x={640} y={420} w={200} h={150} col="#d8e8c8" seed={3} />
    {/* bandera doblada y medalla en vitrina (papá fue militar) */}
    <g>
      <rect x={860} y={700} width={160} height={110} fill="#3a2414" stroke={INK} strokeWidth={4} />
      <path d="M 875 795 L 940 715 L 1005 795 Z" fill="#1f3a7a" stroke="#f2e6d0" strokeWidth={4} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={920 + i * 20} cy={770} r={3} fill="#ffffff" />
      ))}
    </g>
    {/* lámpara colgante con luz cálida */}
    <line x1={300} y1={0} x2={300} y2={250} stroke={INK} strokeWidth={6} />
    <path d="M 210 330 L 390 330 L 340 250 L 260 250 Z" fill="#e8b84a" stroke={INK} strokeWidth={5} />
    <ellipse cx={300} cy={340} rx={60} ry={14} fill="#fff4c2" filter="url(#rglow)" />
    <path d="M 200 340 L 400 340 L 760 1300 L -160 1300 Z" fill="#fff4c2" opacity={0.08 + 0.01 * Math.sin(t * 3)} />
    {/* aparador */}
    <g stroke={INK} strokeWidth={5}>
      <rect x={-420} y={880} width={360} height={190} fill="#6a3e22" />
      <rect x={-400} y={900} width={150} height={150} fill="#7a4a2a" />
      <rect x={-230} y={900} width={150} height={150} fill="#7a4a2a" />
      <rect x={-380} y={830} width={40} height={50} fill="#e8e0d0" />
      <path d="M -260 880 Q -240 810 -200 830 Q -180 860 -200 880 Z" fill="#c84a3a" />
    </g>
    <rect x={L} y={1300} width={WW} height={H - 1300} fill="url(#dfloor)" />
    {Array.from({ length: 16 }).map((_, i) => (
      <line key={`fl${i}`} x1={L + i * 140} y1={1300} x2={L + i * 140 - 160} y2={H} stroke="#2a1608" strokeWidth={3} />
    ))}
  </Svg>
);

/** Mesa de Acción de Gracias (va adelante de los personajes, tapa de la cintura para abajo). */
export const DinnerTable: React.FC<{ t: number; turkey?: number; pie?: boolean; napkin?: boolean; envelope?: boolean }> = ({ t, turkey = 1, pie = false, napkin = false, envelope = false }) => (
  <Svg>
    <defs>
      <linearGradient id="tcloth" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f6efe0" />
        <stop offset="1" stopColor="#d8ccb4" />
      </linearGradient>
    </defs>
    <path d="M -300 1290 L 1380 1290 L 1440 1640 L -360 1640 Z" fill="url(#tcloth)" stroke={INK} strokeWidth={6} />
    <path d="M -360 1640 L 1440 1640 L 1440 1700 L -360 1700 Z" fill="#c8b89a" stroke={INK} strokeWidth={5} />
    <rect x={-300} y={1300} width={1680} height={36} fill="#c0392b" opacity={0.85} />
    {/* platos */}
    {[-180, 160, 900, 1240].map((x, i) => (
      <g key={i}>
        <ellipse cx={x} cy={1420} rx={90} ry={26} fill="#ffffff" stroke={INK} strokeWidth={4} />
        <ellipse cx={x} cy={1418} rx={60} ry={16} fill="#f0e8d8" />
      </g>
    ))}
    {/* pavo */}
    {turkey > 0 ? (
      <g transform="translate(540 1380)">
        <ellipse cx={0} cy={40} rx={190} ry={44} fill="#f2f2f2" stroke={INK} strokeWidth={5} />
        <path d="M -150 30 Q -160 -90 0 -100 Q 160 -90 150 30 Z" fill="#c8742a" stroke={INK} strokeWidth={6} />
        <path d="M -110 -40 Q -40 -80 40 -70" stroke="#e8a050" strokeWidth={10} fill="none" />
        <path d="M 120 -20 L 190 -60 M -120 -20 L -190 -60" stroke={INK} strokeWidth={14} strokeLinecap="round" />
        <circle cx={195} cy={-63} r={12} fill="#f2f2f2" stroke={INK} strokeWidth={3} />
        <circle cx={-195} cy={-63} r={12} fill="#f2f2f2" stroke={INK} strokeWidth={3} />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M ${-40 + i * 40} -110 q 10 -30 0 -60`} stroke="#ffffff" strokeWidth={6} fill="none" opacity={0.4 + 0.3 * Math.sin(t * 2 + i)} />
        ))}
      </g>
    ) : null}
    {/* puré y salsera */}
    <g transform="translate(320 1460)">
      <ellipse cx={0} cy={0} rx={70} ry={28} fill="#e8e0d0" stroke={INK} strokeWidth={4} />
      <ellipse cx={0} cy={-10} rx={52} ry={20} fill="#fff4d8" />
    </g>
    <g transform="translate(760 1470)">
      <path d="M -40 0 Q -40 -30 0 -30 Q 50 -30 60 -10 L 80 -20 L 70 0 Z" fill="#f2f2f2" stroke={INK} strokeWidth={4} />
      <ellipse cx={0} cy={-20} rx={30} ry={8} fill="#8a4a1a" />
    </g>
    {/* velas */}
    {[90, 990].map((x, i) => (
      <g key={`v${i}`}>
        <rect x={x - 10} y={1300} width={20} height={80} fill="#f6efe0" stroke={INK} strokeWidth={3} />
        <ellipse cx={x} cy={1290 - 4 * Math.sin(t * 9 + i)} rx={9} ry={18} fill="#ffcf3a" filter="url(#rglow)" />
      </g>
    ))}
    {pie ? (
      <g transform="translate(540 1440)">
        <ellipse cx={0} cy={10} rx={130} ry={36} fill="#f2f2f2" stroke={INK} strokeWidth={4} />
        <ellipse cx={0} cy={0} rx={110} ry={28} fill="#d8782a" stroke={INK} strokeWidth={4} />
        <path d="M 0 0 L 100 -10 L 90 12 Z" fill="#f6efe0" />
      </g>
    ) : null}
    {envelope ? (
      <g transform="translate(420 1520) rotate(-6)">
        <rect x={-70} y={-40} width={140} height={80} fill="#ffffff" stroke={INK} strokeWidth={4} />
        <path d="M -70 -40 L 0 10 L 70 -40" fill="none" stroke={INK} strokeWidth={3} />
      </g>
    ) : null}
    {napkin ? (
      <g transform="translate(660 1540) rotate(4)">
        <rect x={-80} y={-50} width={160} height={100} fill="#fffaf0" stroke={INK} strokeWidth={3} />
        <text x={0} y={-6} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill="#c0392b">$4800</text>
        <text x={0} y={30} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={22} fill={INK}>$200 x 24</text>
      </g>
    ) : null}
  </Svg>
);

/** Cocina: azulejos, alacenas, pileta con ventana, vapor. */
export const Kitchen: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Defs />
    <rect x={L} y={0} width={WW} height={H} fill="#f2e6c8" />
    {Array.from({ length: 22 }).map((_, i) =>
      Array.from({ length: 6 }).map((_, j) => <rect key={`${i}-${j}`} x={L + i * 92} y={700 + j * 92} width={88} height={88} fill={(i + j) % 2 ? "#e8f2f2" : "#d8eaea"} />),
    )}
    {/* alacenas */}
    {Array.from({ length: 6 }).map((_, i) => (
      <g key={`a${i}`} stroke={INK} strokeWidth={5}>
        <rect x={-380 + i * 330} y={180} width={300} height={360} fill="#c8a26a" />
        <rect x={-360 + i * 330} y={200} width={120} height={320} fill="#d8b47a" />
        <rect x={-220 + i * 330} y={200} width={120} height={320} fill="#d8b47a" />
      </g>
    ))}
    {/* ventana sobre la pileta */}
    <rect x={380} y={600} width={320} height={300} fill="#1a2a4a" stroke="#f2e6d0" strokeWidth={14} />
    {Array.from({ length: 14 }).map((_, i) => (
      <circle key={`s${i}`} cx={390 + rnd(`ks${i}`) * 300} cy={610 + ((t * 40 + rnd(`ksy${i}`) * 280) % 280)} r={4} fill="#fff" />
    ))}
    {/* mesada */}
    <rect x={L} y={1180} width={WW} height={60} fill="#7a7a7a" stroke={INK} strokeWidth={5} />
    <rect x={L} y={1240} width={WW} height={H - 1240} fill="#a8804a" />
    {Array.from({ length: 10 }).map((_, i) => (
      <rect key={`c${i}`} x={L + 20 + i * 200} y={1270} width={180} height={300} fill="#b8905a" stroke={INK} strokeWidth={4} />
    ))}
    {/* pileta con agua y espuma */}
    <rect x={400} y={1170} width={280} height={30} fill="#5a6a7a" stroke={INK} strokeWidth={4} />
    {Array.from({ length: 8 }).map((_, i) => (
      <circle key={`b${i}`} cx={420 + i * 34} cy={1160 - Math.abs(Math.sin(t * 3 + i)) * 14} r={12} fill="#ffffff" stroke="#bfe6ff" strokeWidth={2} />
    ))}
    <path d="M 540 1050 Q 600 1000 600 1080" stroke="#9aa4ae" strokeWidth={14} fill="none" />
    {/* platos apilados */}
    {[0, 1, 2, 3].map((i) => (
      <ellipse key={`pl${i}`} cx={900} cy={1170 - i * 12} rx={70} ry={14} fill="#ffffff" stroke={INK} strokeWidth={3} />
    ))}
    {[0, 1, 2].map((i) => (
      <circle key={`v${i}`} cx={1100 + Math.sin(t + i) * 10} cy={1100 - ((t * 50 + i * 60) % 180)} r={26} fill="#ffffff" opacity={0.35} filter="url(#rsoft)" />
    ))}
  </Svg>
);

/** Patio de la infancia: casa, pasto, árbol, bicicletas. */
export const Backyard: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Defs />
    <defs>
      <linearGradient id="bys" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6ac0f0" />
        <stop offset="1" stopColor="#d8f2f8" />
      </linearGradient>
    </defs>
    <rect x={L} y={0} width={WW} height={H} fill="url(#bys)" />
    <circle cx={1300} cy={280} r={110} fill="#ffe680" filter="url(#rglow)" />
    {[0, 1, 2].map((i) => (
      <ellipse key={`c${i}`} cx={L + ((t * 18 + i * 700) % WW)} cy={260 + i * 80} rx={200} ry={50} fill="#fff" opacity={0.9} />
    ))}
    {/* casa */}
    <g stroke={INK} strokeWidth={6}>
      <rect x={-340} y={640} width={620} height={640} fill="#f2e6c8" />
      <path d="M -380 660 L -30 400 L 320 660 Z" fill="#c0392b" />
      <rect x={-80} y={980} width={150} height={300} fill="#8a5a2a" />
      <rect x={-280} y={760} width={150} height={130} fill="#9ad8ff" />
      <rect x={120} y={760} width={150} height={130} fill="#9ad8ff" />
    </g>
    {/* árbol */}
    <rect x={1060} y={760} width={70} height={520} fill="#7a4a22" stroke={INK} strokeWidth={5} />
    {[0, 1, 2, 3, 4].map((i) => (
      <circle key={`t${i}`} cx={1000 + i * 50 + Math.sin(t + i) * 4} cy={720 - (i % 2) * 60} r={110} fill={i % 2 ? "#3aa04a" : "#4ab85a"} stroke={INK} strokeWidth={4} />
    ))}
    {/* cerca */}
    {Array.from({ length: 20 }).map((_, i) => (
      <rect key={`f${i}`} x={L + i * 100} y={1120} width={30} height={170} fill="#f6efe0" stroke={INK} strokeWidth={3} />
    ))}
    <rect x={L} y={1160} width={WW} height={20} fill="#f6efe0" stroke={INK} strokeWidth={3} />
    <path d="M -460 1280 Q 540 1240 1540 1280 L 1540 1920 L -460 1920 Z" fill="#5ab84a" />
    {Array.from({ length: 50 }).map((_, i) => (
      <path key={`g${i}`} d={`M ${L + i * 40} 1920 q 6 -60 16 -${90 + (i % 4) * 20}`} stroke="#3a9a3a" strokeWidth={6} fill="none" />
    ))}
  </Svg>
);

/** Cuartel del ejército: barracas, bandera, campo de entrenamiento. */
export const ArmyBase: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <Defs />
    <defs>
      <linearGradient id="abs" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8ac8f0" />
        <stop offset="1" stopColor="#f0e8d0" />
      </linearGradient>
    </defs>
    <rect x={L} y={0} width={WW} height={H} fill="url(#abs)" />
    {[0, 1].map((i) => (
      <ellipse key={`c${i}`} cx={L + ((t * 15 + i * 900) % WW)} cy={300 + i * 90} rx={220} ry={50} fill="#fff" opacity={0.85} />
    ))}
    {[-380, 120, 620, 1120].map((x, i) => (
      <g key={i} stroke={INK} strokeWidth={5}>
        <rect x={x} y={780} width={420} height={260} fill="#a8a07a" />
        <path d={`M ${x - 20} 790 L ${x + 210} 680 L ${x + 440} 790 Z`} fill="#6a6a4a" />
        {[0, 1, 2, 3].map((j) => (
          <rect key={j} x={x + 30 + j * 98} y={850} width={60} height={50} fill="#9ad8ff" />
        ))}
      </g>
    ))}
    {/* mástil y bandera */}
    <line x1={1460} y1={1280} x2={1460} y2={420} stroke="#9aa4ae" strokeWidth={10} />
    <path d={`M 1460 430 q 60 ${-10 + 10 * Math.sin(t * 3)} 120 0 q 0 40 0 80 q -60 ${10 * Math.sin(t * 3)} -120 0 Z`} fill="#3a6a3a" stroke={INK} strokeWidth={4} />
    <rect x={L} y={1040} width={WW} height={H - 1040} fill="#c8b890" />
    {Array.from({ length: 12 }).map((_, i) => (
      <line key={`l${i}`} x1={L + i * 200} y1={1300} x2={L + i * 200 + 120} y2={1300} stroke="#ffffff" strokeWidth={8} />
    ))}
  </Svg>
);

// ---------------------------------------------------------------- pantallas / hojas en primer plano (overlay)

/** Celular grande en pantalla. */
export const Phone: React.FC<{ k: number; children: React.ReactNode; side?: "left" | "right" | "center" }> = ({ k, children, side = "right" }) => {
  const land = React.useContext(LandCtx);
  if (k <= 0) return null;
  const left = !land ? 280 : side === "left" ? 160 : side === "center" ? 700 : 1240;
  const top = land ? 90 : 300;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left,
          top,
          width: 520,
          height: 900,
          borderRadius: 60,
          background: "#14141c",
          border: "10px solid #2a2a34",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
          translate: `0 ${(1 - k) * 1000}px`,
          rotate: `${(1 - k) * 8}deg`,
          overflow: "hidden",
          fontFamily: FONT,
        }}
      >
        <div style={{ position: "absolute", inset: 18, borderRadius: 42, background: "#f4f6fa", overflow: "hidden" }}>{children}</div>
      </div>
    </AbsoluteFill>
  );
};

/** Burbuja de chat dentro del celular. */
export const Msg: React.FC<{ text: string; me?: boolean; k?: number; emoji?: boolean }> = ({ text, me = false, k = 1, emoji = false }) =>
  k <= 0 ? null : (
    <div style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start", margin: "14px 20px", opacity: k, translate: `0 ${(1 - k) * 30}px` }}>
      <div style={{ maxWidth: 380, background: me ? "#3a8af0" : "#e2e6ee", color: me ? "#fff" : "#1b1b2f", borderRadius: 28, padding: emoji ? "6px 18px" : "16px 22px", fontSize: emoji ? 70 : 32, fontWeight: 700, lineHeight: 1.2 }}>{text}</div>
    </div>
  );

/** Hoja de papel grande (carta, folleto). */
export const Paper: React.FC<{ k: number; title: string; lines: string[]; stamp?: string; highlight?: number }> = ({ k, title, lines, stamp, highlight }) =>
  k <= 0 ? null : (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <div
        style={{
          width: 820,
          minHeight: 760,
          background: "#fffdf6",
          border: "6px solid #1b1b2f",
          borderRadius: 12,
          padding: "50px 60px",
          boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
          translate: `0 ${(1 - k) * 900}px`,
          rotate: `${-2 + (1 - k) * 10}deg`,
          fontFamily: FONT,
          color: "#1b1b2f",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: "#2a3a7a", letterSpacing: 2 }}>CUERPO DE MARINES</div>
        <div style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 26px", borderBottom: "4px solid #1b1b2f", paddingBottom: 14 }}>{title}</div>
        {lines.map((l, i) => (
          <div key={i} style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.5, background: highlight === i ? "#ffe14d" : undefined, padding: "2px 8px", borderRadius: 6 }}>
            {l}
          </div>
        ))}
        {stamp ? (
          <div style={{ marginTop: 30, display: "inline-block", border: "6px solid #c0392b", color: "#c0392b", fontSize: 44, fontWeight: 700, padding: "6px 24px", rotate: "-8deg" }}>{stamp}</div>
        ) : null}
      </div>
    </AbsoluteFill>
  );

// ------------------------------------------------------------------ miniatura
import { Figure } from "../characters/Figure";
import { POSES } from "../lib/pose";

export const MiniaturaMarines: React.FC = () => (
  <AbsoluteFill style={{ background: "#2a1a14", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: -200, top: -560, width: 1080, height: 1920, scale: "1.25", transformOrigin: "0 0", filter: "saturate(1.25) brightness(0.9)" }}>
      <DiningRoom t={1} />
    </div>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 70% 55%, rgba(255,200,80,0.25), rgba(0,0,0,0.55) 75%)" }} />
    {/* Dani exigiendo, el hermano riéndose */}
    <div style={{ position: "absolute", left: 300, top: -470, width: 1080, height: 1920, scale: "0.95", transformOrigin: "0 0" }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <Figure who="dani" x={420} y={1500} scale={2.6} facing={1} pose={POSES.point(0)} expression="anger" showName={false} />
        <Figure who="yo" x={830} y={1500} scale={2.6} facing={-1} pose={POSES.cheer(10)} expression="joy" showName={false} />
      </svg>
    </div>
    {/* insignias de rango */}
    <div style={{ position: "absolute", left: 620, top: 470, fontFamily: FONT, fontWeight: 700, fontSize: 44, color: "#fff", background: "#c0392b", border: "5px solid #1b1b2f", borderRadius: 18, padding: "4px 18px", rotate: "-6deg" }}>E1 😤</div>
    <div style={{ position: "absolute", left: 1020, top: 430, fontFamily: FONT, fontWeight: 700, fontSize: 44, color: "#1b1b2f", background: "#7dff9a", border: "5px solid #1b1b2f", borderRadius: 18, padding: "4px 18px", rotate: "6deg" }}>E5 😂</div>
    {/* texto */}
    <div style={{ position: "absolute", left: 30, top: 40, width: 640, fontFamily: FONT, fontWeight: 700, lineHeight: 0.95 }}>
      <div style={{ fontSize: 94, color: "#ffe14d", WebkitTextStroke: "14px #121220", paintOrder: "stroke fill", rotate: "-3deg" }}>"LLAMAME</div>
      <div style={{ fontSize: 124, color: "#ffffff", WebkitTextStroke: "16px #121220", paintOrder: "stroke fill", rotate: "-3deg" }}>SEÑOR"</div>
      <div style={{ marginTop: 26, display: "inline-block", fontSize: 50, color: "#fff", background: "#e23b3b", border: "6px solid #121220", borderRadius: 22, padding: "6px 24px", rotate: "3deg", boxShadow: "0 8px 0 rgba(0,0,0,0.45)" }}>…pero yo soy SARGENTO</div>
    </div>
  </AbsoluteFill>
);

// ------------------------------------------------------------------ portadas verticales de los Shorts
import type { Expression } from "../characters/Stickman";
import type { PoseName } from "../lib/pose";
import type { CharId } from "../characters/cast";

export type CoverDef = {
  part: string;
  l1: string;
  l2: string;
  c1?: string;
  emoji?: string;
  a: { who: CharId; pose: PoseName; expr: Expression };
  b: { who: CharId; pose: PoseName; expr: Expression };
};

export const PortadaShort: React.FC<{ d: CoverDef }> = ({ d }) => (
  <AbsoluteFill style={{ background: "#2a1a14", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, filter: "saturate(1.3) brightness(0.85)" }}>
      <DiningRoom t={1} />
    </div>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 62%, rgba(255,200,80,0.3), rgba(0,0,0,0.6) 78%)" }} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <Figure who={d.a.who} x={330} y={1700} scale={2.7} facing={1} pose={POSES[d.a.pose](8)} expression={d.a.expr} showName={false} />
      <Figure who={d.b.who} x={770} y={1700} scale={2.7} facing={-1} pose={POSES[d.b.pose](14)} expression={d.b.expr} showName={false} />
    </svg>
    <div style={{ position: "absolute", left: 40, top: 60, background: "#e23b3b", color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: 64, padding: "10px 34px", borderRadius: 28, border: "7px solid #1b1b2f", rotate: "-4deg", boxShadow: "0 10px 0 rgba(0,0,0,0.4)" }}>{d.part}</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 230, textAlign: "center", fontFamily: FONT, fontWeight: 700, lineHeight: 0.98, padding: "0 50px" }}>
      <div style={{ fontSize: 118, color: d.c1 ?? "#ffe14d", WebkitTextStroke: "16px #121220", paintOrder: "stroke fill", rotate: "-3deg" }}>{d.l1}</div>
      <div style={{ marginTop: 26, display: "inline-block", fontSize: 64, color: "#1b1b2f", background: "#ffffff", border: "7px solid #121220", borderRadius: 26, padding: "8px 30px", rotate: "2deg", boxShadow: "0 10px 0 rgba(0,0,0,0.45)" }}>{d.l2}</div>
    </div>
    {d.emoji ? <div style={{ position: "absolute", left: 0, right: 0, top: 820, textAlign: "center", fontSize: 200 }}>{d.emoji}</div> : null}
  </AbsoluteFill>
);

export const COVERS: CoverDef[] = [
  { part: "PARTE 1/6", l1: "SE HIZO MARINE", l2: "solo para darme órdenes 😤", a: { who: "dani", pose: "point", expr: "anger" }, b: { who: "yo", pose: "shrug", expr: "surprise" } },
  { part: "PARTE 2/6", l1: "YO ERA EL ORGULLO", l2: "y mi hermano no lo soportó", c1: "#7dff9a", a: { who: "dani", pose: "crossed", expr: "anger" }, b: { who: "yo", pose: "cheer", expr: "joy" } },
  { part: "PARTE 3/6", l1: "\"LLAMAME SEÑOR\"", l2: "…pero yo soy sargento 😂", a: { who: "dani", pose: "point", expr: "anger" }, b: { who: "yo", pose: "cheer", expr: "joy" } },
  { part: "PARTE 4/6", l1: "LA CARTA ERA FALSA", l2: "y mamá le dio $4.800 💸", c1: "#ff6b6b", emoji: "📄", a: { who: "papa", pose: "hold", expr: "surprise" }, b: { who: "dani", pose: "cower", expr: "sadness" } },
  { part: "PARTE 5/6", l1: "¿ME PIDE PLATA?", l2: "después de humillarme 🤯", c1: "#ffb03a", a: { who: "dani", pose: "point", expr: "focus" }, b: { who: "yo", pose: "surprised", expr: "surprise" } },
  { part: "PARTE 6/6 · FINAL", l1: "UNA DEUDA EN UNA SERVILLETA", l2: "así terminó la cena 🍗", c1: "#9ad8ff", a: { who: "mama", pose: "point", expr: "anger" }, b: { who: "dani", pose: "sad", expr: "sadness" } },
];
