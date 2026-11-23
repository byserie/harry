import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";

export const W = 1080;
export const H = 1920;

export const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
    {children}
  </svg>
);

export const Grad: React.FC<{ id: string; stops: string[]; x2?: number; y2?: number }> = ({ id, stops, x2 = 0, y2 = 1 }) => (
  <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>
    {stops.map((c, i) => (
      <stop key={i} offset={i / (stops.length - 1)} stopColor={c} />
    ))}
  </linearGradient>
);

export const Stars: React.FC<{ t: number; n?: number; h?: number; seed?: string }> = ({ t, n = 50, h = 900, seed = "s" }) => (
  <>
    {Array.from({ length: n }).map((_, i) => (
      <circle
        key={i}
        cx={random(`${seed}x${i}`) * W}
        cy={random(`${seed}y${i}`) * h}
        r={1.5 + random(`${seed}r${i}`) * 3.5}
        fill="#fff"
        opacity={0.35 + 0.65 * Math.abs(Math.sin(t * 2.2 + i))}
      />
    ))}
  </>
);

export const Rain: React.FC<{ t: number; n?: number; color?: string }> = ({ t, n = 80, color = "#bcd3ff" }) => (
  <g stroke={color} strokeWidth={4} strokeLinecap="round" opacity={0.55}>
    {Array.from({ length: n }).map((_, i) => {
      const x0 = random(`rx${i}`) * 1300 - 100;
      const sp = 1500 + random(`rs${i}`) * 700;
      const y = ((random(`ry${i}`) * H + t * sp) % (H + 200)) - 100;
      const x = x0 - (t * sp * 0.25) % 400;
      return <line key={i} x1={x} y1={y} x2={x - 14} y2={y + 56} />;
    })}
  </g>
);

const Floor: React.FC<{ y: number; c1: string; c2: string; lines?: string; tiles?: boolean }> = ({ y, c1, c2, lines = "rgba(0,0,0,0.18)", tiles = true }) => (
  <g>
    <rect x={0} y={y} width={W} height={H - y} fill={c1} />
    <rect x={0} y={y} width={W} height={H - y} fill={c2} opacity={0.0} />
    {tiles
      ? Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={0} x2={W} y1={y + i * i * 10} y2={y + i * i * 10} stroke={lines} strokeWidth={4} />
        ))
      : null}
    {tiles
      ? Array.from({ length: 13 }).map((_, i) => {
          const x = (i - 6) * 150;
          return <line key={`v${i}`} x1={540 + x * 0.6} y1={y} x2={540 + x * 2.6} y2={H} stroke={lines} strokeWidth={4} />;
        })
      : null}
    <rect x={0} y={y} width={W} height={10} fill="rgba(0,0,0,0.2)" />
  </g>
);
export { Floor };

/* ---------------- PARTE 1 ---------------- */

export const NightSky: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <defs>
      <Grad id="ns" stops={["#120c3a", "#2e1d78", "#6b3fa8", "#c76aa8"]} />
    </defs>
    <rect width={W} height={H} fill="url(#ns)" />
    <Stars t={t} n={80} h={1500} />
    <circle cx={780} cy={420} r={120} fill="#fff4d0" />
    <circle cx={780} cy={420} r={190} fill="#fff4d0" opacity={0.12} />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${((t * 30 + i * 400) % 1500) - 300} ${300 + i * 380})`} fill="#3a2a7a" opacity={0.7}>
        <ellipse cx={0} cy={0} rx={160} ry={46} />
        <ellipse cx={70} cy={-30} rx={90} ry={50} />
        <ellipse cx={-60} cy={-20} rx={70} ry={40} />
      </g>
    ))}
    <path d="M 0 1500 Q 270 1380 540 1450 Q 810 1520 1080 1400 L 1080 1920 L 0 1920 Z" fill="#1d1450" />
  </Svg>
);

const House: React.FC<{ x: number; y: number; w: number; h: number; c: string; lit: number; door?: string }> = ({ x, y, w, h, c, lit, door = "#2b4d8c" }) => (
  <g stroke={INK} strokeWidth={5} strokeLinejoin="round">
    <rect x={x} y={y} width={w} height={h} fill={c} />
    <path d={`M ${x - 20} ${y} L ${x + w / 2} ${y - h * 0.45} L ${x + w + 20} ${y} Z`} fill="#5b3b5e" />
    <rect x={x + w * 0.12} y={y + h * 0.15} width={w * 0.26} height={h * 0.22} fill={lit > 0.5 ? "#ffd36b" : "#283a6b"} />
    <rect x={x + w * 0.62} y={y + h * 0.15} width={w * 0.26} height={h * 0.22} fill={lit > 0.3 ? "#ffd36b" : "#283a6b"} />
    <rect x={x + w * 0.38} y={y + h * 0.55} width={w * 0.24} height={h * 0.45} fill={door} />
    <circle cx={x + w * 0.57} cy={y + h * 0.78} r={5} fill="#ffd36b" />
  </g>
);

/** Calle de casas iguales. lights: 0..1 cuántos faroles siguen prendidos. */
export const NightStreet: React.FC<{ t: number; lights?: number; day?: boolean }> = ({ t, lights = 1, day = false }) => (
  <Svg>
    <defs>
      <Grad id="nst" stops={day ? ["#7fc8ff", "#bfe6ff", "#ffe7b3"] : ["#0f1a4a", "#24307a", "#4a3f8f"]} />
    </defs>
    <rect width={W} height={H} fill="url(#nst)" />
    {day ? null : <Stars t={t} n={45} h={700} seed="st" />}
    {day ? null : <circle cx={160} cy={300} r={70} fill="#fff4d0" />}
    <House x={-200} y={820} w={340} h={440} c="#c9b7d6" lit={0.2} />
    <House x={300} y={780} w={480} h={480} c="#e3d3b4" lit={0.0} door="#3a6b4a" />
    <House x={940} y={820} w={340} h={440} c="#b7c9d6" lit={0.6} />
    <rect x={0} y={1260} width={W} height={60} fill="#7d7a95" stroke={INK} strokeWidth={5} />
    <rect x={0} y={1320} width={W} height={600} fill="#3f3d5c" />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <rect key={i} x={i * 180 - ((t * 0) % 180)} y={1600} width={100} height={16} fill="#e8e3a0" opacity={0.6} />
    ))}
    {[120, 960].map((x, i) => {
      const on = (i === 0 ? lights > 0.5 : lights > 0) || day;
      return (
        <g key={i}>
          <rect x={x - 8} y={900} width={16} height={380} fill="#2b2b3d" stroke={INK} strokeWidth={4} />
          <rect x={x - 26} y={860} width={52} height={50} rx={8} fill={on && !day ? "#ffe27a" : "#55557a"} stroke={INK} strokeWidth={5} />
          {on && !day ? <circle cx={x} cy={885} r={110} fill="#ffe27a" opacity={0.18} /> : null}
        </g>
      );
    })}
  </Svg>
);

/** Casa de los Dursley cortada como casa de muñecas. */
export const HouseCut: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <rect width={W} height={H} fill="#8fd0ff" />
    <path d="M 20 520 L 540 200 L 1060 520 Z" fill="#a0525b" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    {/* piso de arriba: cuarto de Dudley */}
    <rect x={40} y={520} width={1000} height={400} fill="#ffd8ea" stroke={INK} strokeWidth={8} />
    {Array.from({ length: 10 }).map((_, i) => (
      <rect key={i} x={40 + i * 100} y={520} width={50} height={400} fill="#ffc4de" />
    ))}
    {/* juguetes */}
    <g stroke={INK} strokeWidth={5}>
      <rect x={90} y={800} width={110} height={110} fill="#ff6b6b" />
      <rect x={210} y={830} width={80} height={80} fill="#4ecdc4" />
      <rect x={150} y={720} width={80} height={80} fill="#ffe66d" />
      <rect x={760} y={640} width={220} height={150} rx={10} fill="#333" />
      <rect x={775} y={655} width={190} height={115} fill={Math.sin(t * 6) > 0 ? "#6bf" : "#9f6"} />
      <circle cx={680} cy={870} r={42} fill="#ff9f43" />
      <rect x={830} y={800} width={160} height={110} fill="#a29bfe" />
    </g>
    <rect x={40} y={912} width={1000} height={16} fill="#6b4a3a" />
    {/* piso de abajo */}
    <rect x={40} y={920} width={1000} height={560} fill="#f7f0d8" stroke={INK} strokeWidth={8} />
    {/* escalera */}
    <path d="M 60 1460 L 520 940 L 560 940 L 560 980 L 100 1460 Z" fill="#9b6b43" stroke={INK} strokeWidth={6} />
    {Array.from({ length: 10 }).map((_, i) => (
      <line key={i} x1={80 + i * 46} y1={1440 - i * 52} x2={130 + i * 46} y2={1440 - i * 52} stroke={INK} strokeWidth={5} />
    ))}
    {/* alacena */}
    <path d="M 60 1460 L 60 1180 L 330 1180 L 330 1460 Z" fill="#5a3b26" stroke={INK} strokeWidth={6} />
    <rect x={80} y={1200} width={230} height={250} fill="#7a5a3e" />
    <circle cx={195} cy={1230} r={14} fill="#ffe27a" stroke={INK} strokeWidth={3} />
    <rect x={95} y={1395} width={200} height={50} fill="#d9cfa8" stroke={INK} strokeWidth={4} />
    {/* sala */}
    <rect x={640} y={1040} width={300} height={180} fill="#9ad1ff" stroke={INK} strokeWidth={6} />
    <line x1={790} y1={1040} x2={790} y2={1220} stroke={INK} strokeWidth={5} />
    <rect x={40} y={1460} width={1000} height={460} fill="#b98a5e" stroke={INK} strokeWidth={8} />
  </Svg>
);

export const Zoo: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <defs>
      <Grad id="zoo" stops={["#7ad7ff", "#c8f0ff"]} />
    </defs>
    <rect width={W} height={H} fill="url(#zoo)" />
    {[80, 300, 860, 1020].map((x, i) => (
      <g key={i}>
        <rect x={x - 14} y={500} width={28} height={500} fill="#8a5a2b" />
        <circle cx={x} cy={480 + Math.sin(t + i) * 6} r={140} fill={i % 2 ? "#2fae4f" : "#3cc35f"} stroke={INK} strokeWidth={5} />
      </g>
    ))}
    {/* recinto del reptil */}
    <rect x={120} y={560} width={840} height={660} rx={20} fill="#3b2a1a" stroke={INK} strokeWidth={10} />
    <rect x={150} y={590} width={780} height={600} fill="#7fb069" />
    <path d="M 150 1190 Q 300 1060 520 1120 Q 760 1180 930 1080 L 930 1190 Z" fill="#c2a46a" />
    <path d="M 220 760 Q 520 700 860 820" stroke="#6b4a2b" strokeWidth={26} fill="none" strokeLinecap="round" />
    <rect x={150} y={1090} width={780} height={100} fill="#3fa9d6" opacity={0.85} />
    <rect x={380} y={480} width={320} height={70} rx={14} fill="#ffe66d" stroke={INK} strokeWidth={6} />
    <text x={540} y={530} textAnchor="middle" fontSize={44} fontWeight={700} fontFamily="Fredoka" fill={INK}>REPTILES</text>
    <Floor y={1220} c1="#d9c7a3" c2="#d9c7a3" lines="rgba(120,90,50,0.25)" />
    <rect x={100} y={1235} width={880} height={18} rx={9} fill="#8a8aa0" stroke={INK} strokeWidth={4} />
  </Svg>
);

export const LivingRoom: React.FC<{ t: number }> = () => (
  <Svg>
    <rect width={W} height={H} fill="#f3e1c0" />
    {Array.from({ length: 14 }).map((_, i) => (
      <rect key={i} x={i * 80} y={0} width={36} height={1260} fill="#ead2a8" />
    ))}
    {/* ventana */}
    <rect x={720} y={520} width={280} height={340} fill="#9ad1ff" stroke={INK} strokeWidth={8} />
    <line x1={860} y1={520} x2={860} y2={860} stroke={INK} strokeWidth={6} />
    <line x1={720} y1={690} x2={1000} y2={690} stroke={INK} strokeWidth={6} />
    {/* chimenea */}
    <rect x={300} y={800} width={420} height={460} fill="#c0583a" stroke={INK} strokeWidth={8} />
    {Array.from({ length: 6 }).map((_, i) => (
      <line key={i} x1={300} x2={720} y1={850 + i * 70} y2={850 + i * 70} stroke="#8a3a25" strokeWidth={5} />
    ))}
    <rect x={270} y={770} width={480} height={50} fill="#7a4a2a" stroke={INK} strokeWidth={6} />
    <path d="M 400 1260 L 400 1040 Q 510 960 620 1040 L 620 1260 Z" fill="#1d1010" stroke={INK} strokeWidth={6} />
    {/* puerta con ranura */}
    <rect x={40} y={760} width={200} height={500} fill="#8a5a3a" stroke={INK} strokeWidth={8} />
    <rect x={95} y={960} width={90} height={18} fill="#2a1a10" stroke={INK} strokeWidth={4} />
    <Floor y={1260} c1="#b07a4f" c2="#b07a4f" lines="rgba(80,40,10,0.25)" />
    <rect x={180} y={1450} width={720} height={260} rx={20} fill="#c94f7c" opacity={0.6} />
  </Svg>
);

export const SeaRock: React.FC<{ t: number }> = ({ t }) => {
  const flash = Math.max(0, Math.sin(t * 1.3) > 0.97 ? 1 : 0, (t % 3.5) < 0.12 ? 1 : 0);
  return (
    <Svg>
      <defs>
        <Grad id="sea" stops={["#0b1030", "#1f2f6b", "#3b4f8f"]} />
      </defs>
      <rect width={W} height={H} fill="url(#sea)" />
      <rect width={W} height={H} fill="#fff" opacity={flash * 0.5} />
      {flash ? <path d="M 760 0 L 700 260 L 760 270 L 680 560" stroke="#fffbd0" strokeWidth={14} fill="none" strokeLinejoin="round" /> : null}
      <path d="M 260 1300 L 380 860 L 520 800 L 700 860 L 820 1300 Z" fill="#4a4a5e" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <g stroke={INK} strokeWidth={6} strokeLinejoin="round">
        <rect x={420} y={680} width={240} height={180} fill="#7a5a3a" />
        <path d="M 400 690 L 540 580 L 680 690 Z" fill="#5a3a22" />
        <rect x={470} y={730} width={60} height={60} fill={Math.sin(t * 9) > -0.3 ? "#ffd36b" : "#c99a3b"} />
        <rect x={570} y={760} width={50} height={100} fill="#4a2f17" />
      </g>
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={i}
          d={`M -100 ${1180 + i * 130} q 90 ${-50 - i * 6} 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 L 1200 1920 L -100 1920 Z`}
          transform={`translate(${Math.sin(t * 1.5 + i) * 60 - 60} ${Math.cos(t * 1.8 + i) * 14})`}
          fill={["#2a4a9a", "#2f56ad", "#3561bf", "#3a6bcf", "#4277dd", "#4a82e8"][i]}
          stroke={INK}
          strokeWidth={5}
        />
      ))}
      <Rain t={t} n={110} />
    </Svg>
  );
};

/** Interior de la cabaña. door: 0 cerrada → 1 derrumbada (la dibuja la escena). */
export const HutInside: React.FC<{ t: number }> = ({ t }) => {
  const flash = (t % 4) < 0.1 ? 1 : 0;
  return (
    <Svg>
      <rect width={W} height={H} fill="#6b4a2f" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={0} y={i * 110} width={W} height={100} fill={i % 2 ? "#74522f" : "#7d5a35"} stroke="#4a2f17" strokeWidth={4} />
      ))}
      <rect x={80} y={560} width={240} height={260} fill={flash ? "#e8f0ff" : "#1b2450"} stroke={INK} strokeWidth={8} />
      <line x1={200} y1={560} x2={200} y2={820} stroke={INK} strokeWidth={6} />
      {/* marco de la puerta */}
      <rect x={760} y={760} width={260} height={500} fill="#120b05" stroke={INK} strokeWidth={10} />
      {/* chimenea apagada */}
      <rect x={360} y={920} width={300} height={340} fill="#5a5a66" stroke={INK} strokeWidth={8} />
      <rect x={420} y={1040} width={180} height={220} fill="#1d1d24" />
      <Floor y={1260} c1="#4a3220" c2="#4a3220" lines="rgba(0,0,0,0.25)" />
      <rect width={W} height={H} fill="#fff" opacity={flash * 0.25} />
    </Svg>
  );
};
