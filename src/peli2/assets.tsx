import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";
import { Sparkles } from "../characters/Stickman";
import { Floor, Grad, H, Stars, Svg, W } from "../scenes/bg1";
import { Diagon, Library } from "../scenes/bg2";
import { Label } from "../scenes/bg2";

type XY = { x: number; y: number; s?: number };
const T = (x: number, y: number, s = 1, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${s})`;

/* ================= FONDOS ================= */

export const Bedroom: React.FC<{ t: number; bars?: boolean; car?: boolean }> = ({ t, bars = false }) => (
  <Svg>
    <rect width={W} height={H} fill="#bcd6e8" />
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={i * 95} y={0} width={44} height={1270} fill="#c8def0" />
    ))}
    {/* ventana */}
    <rect x={560} y={420} width={440} height={520} fill="#13204f" stroke={INK} strokeWidth={10} />
    <g>
      <clipPath id="bw">
        <rect x={566} y={426} width={428} height={508} />
      </clipPath>
      <g clipPath="url(#bw)">
        <Stars t={t} n={30} h={1000} seed="bw" />
        <circle cx={900} cy={520} r={44} fill="#fff4d0" />
      </g>
    </g>
    <line x1={780} y1={420} x2={780} y2={940} stroke={INK} strokeWidth={7} />
    <line x1={560} y1={680} x2={1000} y2={680} stroke={INK} strokeWidth={7} />
    {bars
      ? Array.from({ length: 7 }).map((_, i) => <rect key={i} x={575 + i * 64} y={410} width={14} height={540} fill="#5a5a66" stroke={INK} strokeWidth={3} />)
      : null}
    {/* cama */}
    <rect x={40} y={1120} width={440} height={140} rx={16} fill="#e8e8f0" stroke={INK} strokeWidth={7} />
    <rect x={40} y={1080} width={120} height={70} rx={20} fill="#fff" stroke={INK} strokeWidth={6} />
    <rect x={30} y={980} width={30} height={300} fill="#8a5a2b" stroke={INK} strokeWidth={5} />
    {/* escritorio y jaula */}
    <rect x={600} y={1110} width={360} height={30} fill="#8a5a2b" stroke={INK} strokeWidth={5} />
    <path d="M 700 1110 L 700 990 Q 760 930 820 990 L 820 1110 Z" fill="none" stroke="#c9a441" strokeWidth={6} />
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1={715 + i * 30} y1={985} x2={715 + i * 30} y2={1110} stroke="#c9a441" strokeWidth={4} />
    ))}
    <ellipse cx={760} cy={1065} rx={28} ry={34} fill="#fff" stroke={INK} strokeWidth={4} />
    <circle cx={750} cy={1055} r={6} fill="#ffd34a" />
    <circle cx={770} cy={1055} r={6} fill="#ffd34a" />
    <Floor y={1270} c1="#8f7a6a" c2="#000" lines="rgba(0,0,0,0.2)" tiles={false} />
  </Svg>
);

export const Burrow: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <rect width={W} height={H} fill="#f2c48d" />
    {Array.from({ length: 10 }).map((_, i) => (
      <rect key={i} x={i * 110} y={0} width={10} height={1270} fill="#d9a066" transform={`rotate(${(i % 3) - 1} ${i * 110} 600)`} />
    ))}
    {/* reloj de la familia */}
    <g transform="translate(250 560)">
      <circle r={150} fill="#fff6dc" stroke={INK} strokeWidth={8} />
      {["CASA", "VIAJE", "COLEGIO", "PELIGRO", "TRABAJO", "PERDIDO"].map((l, i) => {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        return (
          <text key={i} x={Math.cos(a) * 105} y={Math.sin(a) * 105 + 8} textAnchor="middle" fontSize={20} fontFamily="Fredoka" fontWeight={700} fill={INK}>
            {l}
          </text>
        );
      })}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={0} y1={0} x2={0} y2={-70} stroke={["#e0662a", "#2fae4f", "#a0522d", "#5d8aa8"][i]} strokeWidth={9} strokeLinecap="round" transform={`rotate(${i * 7 + Math.sin(t + i) * 6})`} />
      ))}
      <circle r={10} fill={INK} />
    </g>
    {/* fregadero con platos que se lavan solos */}
    <rect x={560} y={940} width={460} height={330} fill="#c97a40" stroke={INK} strokeWidth={8} />
    <rect x={600} y={900} width={380} height={50} fill="#7fc8e8" stroke={INK} strokeWidth={6} />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${680 + i * 110} ${760 + Math.sin(t * 3 + i * 2) * 40}) rotate(${Math.sin(t * 4 + i) * 30})`}>
        <ellipse rx={46} ry={14} fill="#fff" stroke={INK} strokeWidth={5} />
        <circle cx={0} cy={-30} r={8} fill="#bfefff" opacity={0.8} />
      </g>
    ))}
    <rect x={720 + Math.sin(t * 6) * 60} y={840} width={50} height={28} rx={8} fill="#ffe66d" stroke={INK} strokeWidth={4} />
    <Floor y={1270} c1="#b07a4f" c2="#000" lines="rgba(80,40,10,0.25)" />
    <rect x={140} y={1440} width={800} height={36} fill="#8a5a2b" stroke={INK} strokeWidth={7} />
  </Svg>
);

export const DarkAlley: React.FC<{ t: number }> = ({ t }) => (
  <div style={{ position: "absolute", inset: 0, filter: "hue-rotate(160deg) saturate(0.45) brightness(0.55)" }}>
    <Diagon t={t} />
  </div>
);

export const Bookshop: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Library t={t} />
    <Svg>
      <g transform="translate(540 520)">
        <rect x={-210} y={-250} width={420} height={460} fill="#fffbe6" stroke={INK} strokeWidth={10} />
        <rect x={-180} y={-220} width={360} height={340} fill="#1abc9c" />
        <circle cx={0} cy={-60} r={90} fill="#e0fbf5" stroke={INK} strokeWidth={6} />
        <path d="M -90 -80 Q -80 -170 0 -170 Q 80 -170 90 -80 Q 40 -120 0 -116 Q -40 -120 -90 -80 Z" fill="#f2c94c" stroke={INK} strokeWidth={5} />
        <circle cx={-30} cy={-64} r={8} fill={INK} />
        <circle cx={30} cy={-64} r={8} fill={INK} />
        <path d="M -40 -20 Q 0 20 40 -20 Z" fill="#fff" stroke={INK} strokeWidth={4} />
        <path d={`M 110 -150 l 10 -24 l 10 24 l 24 10 l -24 10 l -10 24 l -10 -24 l -24 -10 Z`} fill="#fff" opacity={Math.abs(Math.sin(t * 3))} />
        <text x={0} y={175} textAnchor="middle" fontSize={50} fontFamily="Fredoka" fontWeight={700} fill={INK}>
          LOCKHART
        </text>
      </g>
      <Label x={540} y={900} text="FIRMA DE LIBROS HOY" fill="#ff6f61" color="#fff" size={44} />
    </Svg>
  </>
);

export const SkyTrain: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <defs>
      <Grad id="skt" stops={["#4aa8ff", "#a8dcff", "#e6f6ff"]} />
    </defs>
    <rect width={W} height={H} fill="url(#skt)" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i} transform={`translate(${((-t * (120 + i * 30) + i * 330) % 1500 + 1500) % 1500 - 250} ${200 + i * 300})`} fill="#fff" opacity={0.92}>
        <ellipse cx={0} cy={0} rx={150} ry={46} />
        <ellipse cx={60} cy={-30} rx={90} ry={50} />
        <ellipse cx={-50} cy={-16} rx={60} ry={36} />
      </g>
    ))}
    {/* campo y tren abajo */}
    <path d="M 0 1600 Q 300 1520 600 1580 Q 850 1630 1080 1560 L 1080 1920 L 0 1920 Z" fill="#5bbf5b" stroke={INK} strokeWidth={5} />
    <g transform={`translate(${((t * 40) % 300) - 100} 1640)`}>
      <rect x={0} y={0} width={500} height={60} rx={10} fill="#c8302f" stroke={INK} strokeWidth={4} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={30 + i * 115} y={12} width={70} height={26} fill="#ffe7a8" />
      ))}
      <circle cx={470} cy={-30 - ((t * 40) % 40)} r={24} fill="#fff" opacity={0.8} />
    </g>
  </Svg>
);

export const WillowNight: React.FC<{ t: number; swing?: number }> = ({ t, swing = 0 }) => (
  <Svg>
    <defs>
      <Grad id="wn" stops={["#0f0b33", "#2b1f73", "#5a3f9f"]} />
    </defs>
    <rect width={W} height={H} fill="url(#wn)" />
    <Stars t={t} n={60} h={700} seed="wn" />
    <g fill="#2a2066" stroke={INK} strokeWidth={4}>
      <rect x={60} y={560} width={110} height={420} />
      <path d="M 45 570 L 115 400 L 185 570 Z" fill="#3b2e85" />
      <rect x={200} y={460} width={150} height={520} />
      <path d="M 180 470 L 275 260 L 370 470 Z" fill="#3b2e85" />
    </g>
    <rect x={0} y={1270} width={W} height={650} fill="#1f4a2a" />
    <WillowTree x={700} y={1290} t={t} swing={swing} />
  </Svg>
);

export const WillowTree: React.FC<XY & { t: number; swing?: number }> = ({ x, y, s = 1, t, swing = 0 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M -60 0 Q -40 -300 -20 -520 L 30 -520 Q 50 -300 70 0 Z" fill="#5a3a22" />
    {[-1, 1, -1, 1, -1].map((d, i) => {
      const a = d * (30 + i * 10) + Math.sin(t * (2 + swing * 6) + i) * (8 + swing * 50);
      return (
        <g key={i} transform={`translate(0 ${-520 + i * 60}) rotate(${a})`}>
          <path d={`M 0 0 Q ${d * 120} -100 ${d * 260} -60`} fill="none" stroke="#5a3a22" strokeWidth={22} />
          <path d={`M ${d * 200} -80 q ${d * 30} 40 ${d * 70} 20`} fill="none" stroke="#3a2414" strokeWidth={10} />
          <circle cx={d * 250} cy={-70} r={60} fill="#2f6b3a" strokeWidth={5} />
        </g>
      );
    })}
    <circle cx={0} cy={-640} r={150} fill="#2f6b3a" strokeWidth={6} />
  </g>
);

export const SecretChamber: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <rect width={W} height={H} fill="#0d2a22" />
    <circle cx={540} cy={700} r={560} fill="#3fa36b" opacity={0.12 + 0.03 * Math.sin(t * 2)} />
    {/* estatua al fondo */}
    <g transform="translate(540 1270)" stroke={INK} strokeWidth={8}>
      <path d="M -220 0 L -180 -620 Q 0 -760 180 -620 L 220 0 Z" fill="#3b5a50" />
      <ellipse cx={0} cy={-560} rx={130} ry={150} fill="#4a6d61" />
      <path d="M -60 -400 Q 0 -300 60 -400 L 60 -340 Q 0 -260 -60 -340 Z" fill="#2d4a40" />
      <circle cx={-45} cy={-590} r={14} fill="#1b1b2f" />
      <circle cx={45} cy={-590} r={14} fill="#1b1b2f" />
    </g>
    {/* pilares con serpientes */}
    {[60, 1020].map((x, i) => (
      <g key={i} stroke={INK} strokeWidth={6}>
        <rect x={x - 60} y={200} width={120} height={1080} fill="#2d4a40" />
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(${x} ${400 + k * 300}) scale(${i ? -1 : 1} 1)`}>
            <path d="M 0 0 Q 70 -40 90 20 Q 60 60 0 30 Z" fill="#3fa36b" />
            <circle cx={60} cy={10} r={6} fill="#ffe66d" stroke="none" />
          </g>
        ))}
      </g>
    ))}
    <rect x={0} y={1270} width={W} height={650} fill="#123a30" />
    {Array.from({ length: 8 }).map((_, i) => (
      <ellipse key={i} cx={(random(`w${i}`) * 1080 + t * 20) % 1080} cy={1320 + i * 70} rx={120} ry={8} fill="#5fd39a" opacity={0.15} />
    ))}
  </Svg>
);

/* ================= OBJETOS ================= */

export const FlyingCar: React.FC<XY & { t: number; r?: number; riders?: string[] }> = ({ x, y, s = 1, t, r = 0, riders = [] }) => (
  <g transform={T(x, y, s, r)} stroke={INK} strokeWidth={7} strokeLinejoin="round">
    <path d="M -200 0 L -200 -70 Q -190 -90 -150 -95 L -90 -170 L 90 -170 L 140 -95 Q 200 -90 210 -60 L 210 0 Z" fill="#4f8fd9" />
    <path d="M -80 -155 L -20 -155 L -20 -100 L -125 -100 Z" fill="#cfefff" />
    <path d="M 0 -155 L 80 -155 L 120 -100 L 0 -100 Z" fill="#cfefff" />
    {riders.map((c, i) => (
      <g key={i} transform={`translate(${-60 + i * 80} -120)`}>
        <circle r={22} fill="#fff0e0" strokeWidth={4} />
        <path d="M -22 -6 Q -20 -26 0 -26 Q 20 -26 22 -6 Q 10 -16 0 -15 Q -10 -16 -22 -6 Z" fill={c} strokeWidth={3} />
      </g>
    ))}
    <rect x={-210} y={-40} width={420} height={18} fill="#c0c8d8" strokeWidth={4} />
    <circle cx={190} cy={-55} r={12} fill="#fff7b0" strokeWidth={4} />
    {[-120, 120].map((wx, i) => (
      <g key={i} transform={`translate(${wx} 0) rotate(${t * 400})`}>
        <circle r={38} fill="#2a2a33" />
        <line x1={-24} y1={0} x2={24} y2={0} stroke="#888" strokeWidth={5} />
      </g>
    ))}
    <circle cx={230} cy={-40} r={50} fill="#fff7b0" opacity={0.2} stroke="none" />
  </g>
);

export const Howler: React.FC<XY & { t: number; open?: number }> = ({ x, y, s = 1, t, open = 1 }) => {
  const m = open * (24 + Math.abs(Math.sin(t * 14)) * 30);
  return (
    <g transform={T(x + Math.sin(t * 30) * 6 * open, y, s, Math.sin(t * 20) * 6 * open)} stroke={INK} strokeWidth={6} strokeLinejoin="round">
      <rect x={-130} y={-90} width={260} height={180} rx={14} fill="#e0262d" />
      <path d={`M -130 -90 L 0 ${-10 - m * 0.5} L 130 -90`} fill="#b81d23" />
      <ellipse cx={0} cy={30} rx={70} ry={m} fill="#3a0a0a" />
      {open > 0.5
        ? [0, 1, 2].map((i) => (
            <path key={i} d={`M ${150 + i * 30} ${-40 + i * 40} l 40 -10`} stroke="#ffe66d" strokeWidth={8} strokeLinecap="round" />
          ))
        : null}
      {open > 0.5
        ? [0, 1, 2].map((i) => (
            <path key={i} d={`M ${-150 - i * 30} ${-40 + i * 40} l -40 -10`} stroke="#ffe66d" strokeWidth={8} strokeLinecap="round" />
          ))
        : null}
    </g>
  );
};

export const Pixie: React.FC<XY & { t: number; frozen?: boolean }> = ({ x, y, s = 1, t, frozen = false }) => {
  const w = frozen ? 0 : Math.sin(t * 40 + x) * 18;
  return (
    <g transform={T(x, y, s)} stroke={INK} strokeWidth={4}>
      <ellipse cx={-22} cy={-10 - w} rx={22} ry={12} fill="#e6f6ff" opacity={0.85} />
      <ellipse cx={22} cy={-10 - w} rx={22} ry={12} fill="#e6f6ff" opacity={0.85} />
      <ellipse cx={0} cy={0} rx={18} ry={24} fill={frozen ? "#9fc6e8" : "#3a7bff"} />
      <circle cx={-6} cy={-6} r={4} fill="#fff" />
      <circle cx={6} cy={-6} r={4} fill="#fff" />
      <path d="M -8 8 Q 0 14 8 8" fill="none" strokeWidth={3} />
    </g>
  );
};

export const Diary: React.FC<XY & { glow?: number; r?: number; hole?: boolean }> = ({ x, y, s = 1, glow = 0, r = 0, hole = false }) => (
  <g transform={T(x, y, s, r)}>
    {glow ? <circle r={110} fill="#ffe36e" opacity={0.25 * glow} /> : null}
    <rect x={-70} y={-90} width={140} height={180} rx={10} fill="#1d1d24" stroke="#000" strokeWidth={5} />
    <rect x={-56} y={-76} width={8} height={152} fill="#3a3a44" />
    <text x={10} y={70} textAnchor="middle" fontSize={20} fontFamily="Fredoka" fontWeight={700} fill="#d9a441">T. M. R.</text>
    {hole ? (
      <g>
        <circle cx={10} cy={-10} r={22} fill="#000" />
        <path d="M 10 -10 l 60 -50 M 10 -10 l -40 -60 M 10 -10 l 70 20" stroke="#1d1d24" strokeWidth={6} />
      </g>
    ) : null}
  </g>
);

export const Spider: React.FC<XY & { t: number; flip?: boolean }> = ({ x, y, s = 1, t, flip = false }) => (
  <g transform={`${T(x, y, s)} scale(${flip ? -1 : 1} 1)`} stroke="#000" strokeWidth={4} strokeLinecap="round">
    {[-1, 1].map((d) =>
      [0, 1, 2, 3].map((i) => {
        const k = Math.sin(t * 20 + i * 1.5 + d) * 6;
        return <polyline key={`${d}-${i}`} points={`0,0 ${d * (22 + i * 4)},${-14 + i * 6 + k} ${d * (40 + i * 4)},${10 + i * 4}`} fill="none" />;
      }),
    )}
    <ellipse cx={0} cy={0} rx={16} ry={12} fill="#1d1d24" />
    <circle cx={14} cy={-4} r={9} fill="#1d1d24" />
    <circle cx={18} cy={-6} r={2.5} fill="#ff3b3b" stroke="none" />
  </g>
);

export const Aragog: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y, s)} stroke="#000" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round">
    {[-1, 1].map((d) =>
      [0, 1, 2, 3].map((i) => {
        const k = Math.sin(t * 2 + i + d) * 15;
        return <polyline key={`${d}-${i}`} points={`0,-200 ${d * (180 + i * 40)},${-420 + i * 70 + k} ${d * (330 + i * 30)},${0}`} fill="none" stroke="#2a2a33" strokeWidth={22} />;
      }),
    )}
    <ellipse cx={0} cy={-250} rx={170} ry={130} fill="#2a2a33" />
    <ellipse cx={0} cy={-390} rx={110} ry={90} fill="#33333d" />
    {[-50, -18, 18, 50].map((ex, i) => (
      <circle key={i} cx={ex} cy={-400 + Math.abs(ex) * 0.3} r={16} fill="#e8e8f0" strokeWidth={4} />
    ))}
    <path d="M -30 -320 q -10 40 10 60 M 30 -320 q 10 40 -10 60" fill="none" stroke="#000" strokeWidth={10} />
    <text x={0} y={-520} textAnchor="middle" fontSize={44} fontFamily="Fredoka" fontWeight={700} fill="#fff" stroke={INK} strokeWidth={8} paintOrder="stroke">
      Aragog
    </text>
  </g>
);

export const Basilisk: React.FC<XY & { t: number; open?: number; blind?: boolean; flip?: boolean }> = ({ x, y, s = 1, t, open = 0.3, blind = false, flip = false }) => {
  const body = Array.from({ length: 14 }).map((_, i) => `${-i * 70},${Math.sin(t * 2 - i * 0.5) * 50 + i * 30}`);
  const jaw = 20 + open * 70;
  return (
    <g transform={`${T(x, y, s)} scale(${flip ? -1 : 1} 1)`} strokeLinejoin="round" strokeLinecap="round">
      <polyline points={body.join(" ")} fill="none" stroke={INK} strokeWidth={120} />
      <polyline points={body.join(" ")} fill="none" stroke="#3f8f4a" strokeWidth={104} />
      <polyline points={body.join(" ")} fill="none" stroke="#2f6b3a" strokeWidth={30} strokeDasharray="20 40" />
      <g stroke={INK} strokeWidth={8}>
        <path d={`M -30 -60 Q 120 -120 230 -40 L 220 ${-10} Q 100 -20 -30 20 Z`} fill="#4aa356" />
        <path d={`M -30 30 Q 100 ${40 + jaw} 210 ${10 + jaw} L 200 ${40 + jaw} Q 80 ${80 + jaw} -30 70 Z`} fill="#3f8f4a" />
        <path d={`M -10 20 Q 100 ${10 + jaw * 0.5} 205 ${10 + jaw * 0.6} L 200 -8 Q 100 -14 -10 20 Z`} fill="#7a0f1a" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M ${60 + i * 40} -18 l 8 26 l 8 -26`} fill="#fff" strokeWidth={4} />
        ))}
        {blind ? (
          <path d="M 80 -78 l 40 20 M 120 -78 l -40 20" stroke="#7a0f1a" strokeWidth={10} />
        ) : (
          <g>
            <ellipse cx={100} cy={-68} rx={30} ry={22} fill="#ffe66d" />
            <ellipse cx={104} cy={-68} rx={6} ry={18} fill={INK} stroke="none" />
            <circle cx={100} cy={-68} r={60} fill="#ffe66d" opacity={0.15} stroke="none" />
          </g>
        )}
      </g>
    </g>
  );
};

export const Phoenix: React.FC<XY & { t: number; flip?: boolean }> = ({ x, y, s = 1, t, flip = false }) => {
  const w = Math.sin(t * 12) * 40;
  return (
    <g transform={`${T(x, y, s)} scale(${flip ? -1 : 1} 1)`} stroke={INK} strokeWidth={5} strokeLinejoin="round">
      <circle r={110} fill="#ffb347" opacity={0.2} stroke="none" />
      <path d={`M -10 -10 Q -80 ${-90 - w} -170 ${-60 - w} Q -100 -10 -10 10 Z`} fill="#e0262d" />
      <path d={`M 10 -10 Q 80 ${-90 - w} 170 ${-60 - w} Q 100 -10 10 10 Z`} fill="#ff8a1a" />
      <path d="M -20 30 Q -10 120 -40 170 M 0 30 Q 10 130 0 180 M 20 30 Q 30 120 50 165" fill="none" stroke="#f2c230" strokeWidth={10} />
      <ellipse cx={0} cy={0} rx={34} ry={44} fill="#e0262d" />
      <circle cx={30} cy={-40} r={26} fill="#e0262d" />
      <path d="M 52 -42 L 76 -34 L 52 -28 Z" fill="#f2c230" />
      <circle cx={36} cy={-46} r={5} fill={INK} stroke="none" />
      <path d="M 20 -64 q 10 -20 24 -12" fill="none" stroke="#f2c230" strokeWidth={6} />
    </g>
  );
};

export const Sword: React.FC<XY & { r?: number; glow?: number }> = ({ x, y, s = 1, r = 0, glow = 1 }) => (
  <g transform={T(x, y, s, r)} stroke={INK} strokeWidth={5} strokeLinejoin="round">
    {glow ? <ellipse cx={0} cy={-150} rx={60} ry={220} fill="#fff7b0" opacity={0.3 * glow} stroke="none" /> : null}
    <path d="M -14 -20 L -14 -330 L 0 -370 L 14 -330 L 14 -20 Z" fill="#e8eef5" />
    <line x1={0} y1={-30} x2={0} y2={-330} stroke="#b8c4d0" strokeWidth={4} />
    <rect x={-60} y={-24} width={120} height={22} rx={8} fill="#d9a441" />
    <rect x={-10} y={-2} width={20} height={70} fill="#7a4a22" />
    <circle cx={0} cy={76} r={14} fill="#e0262d" />
    <circle cx={-40} cy={-13} r={7} fill="#e0262d" strokeWidth={2} />
    <circle cx={40} cy={-13} r={7} fill="#e0262d" strokeWidth={2} />
  </g>
);

export const Sock: React.FC<XY & { r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={T(x, y, s, r)} stroke={INK} strokeWidth={5} strokeLinejoin="round">
    <path d="M -20 -70 L 20 -70 L 20 10 Q 20 40 60 40 L 60 70 Q 0 74 -20 40 Z" fill="#f4f4f4" />
    <rect x={-20} y={-70} width={40} height={18} fill="#e0262d" />
    <line x1={-20} y1={-30} x2={20} y2={-30} stroke="#2f6fe4" strokeWidth={6} />
  </g>
);

export const Bludger: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y, s)}>
    <circle r={60} fill="#ff3b3b" opacity={0.12 + 0.08 * Math.sin(t * 10)} />
    <circle r={34} fill="#2a2a33" stroke={INK} strokeWidth={5} />
    <circle cx={-10} cy={-12} r={8} fill="#55556a" />
    <path d="M -34 0 l -50 -10 M -30 16 l -46 10" stroke="#888" strokeWidth={5} strokeLinecap="round" />
  </g>
);

export const Fang: React.FC<XY & { r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <path transform={T(x, y, s, r)} d="M -14 0 Q -10 -80 0 -110 Q 10 -80 14 0 Z" fill="#fffbe6" stroke={INK} strokeWidth={5} />
);

export const NorrisStone: React.FC<XY> = ({ x, y, s = 1 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={5} strokeLinejoin="round">
    <ellipse cx={0} cy={0} rx={70} ry={36} fill="#b8bcc4" />
    <circle cx={70} cy={-30} r={30} fill="#b8bcc4" />
    <path d="M 52 -54 L 58 -80 L 72 -58 M 84 -56 L 94 -78 L 96 -50" fill="#b8bcc4" />
    <path d="M -70 0 Q -120 -10 -110 -70" fill="none" strokeWidth={10} stroke="#b8bcc4" />
    <circle cx={62} cy={-32} r={6} fill="#fff" />
    <circle cx={82} cy={-32} r={6} fill="#fff" />
    {[-40, 40].map((lx, i) => (
      <line key={i} x1={lx} y1={30} x2={lx} y2={70} stroke="#b8bcc4" strokeWidth={12} />
    ))}
  </g>
);

export const WallMessage: React.FC<{ t: number; t0: number; x?: number; y?: number; lines?: string[] }> = ({
  t,
  t0,
  x = 540,
  y = 560,
  lines = ["LA CÁMARA DE LOS", "SECRETOS HA SIDO", "ABIERTA"],
}) => {
  const k = Math.max(0, Math.min(1, (t - t0) / 1.2));
  if (k <= 0) return null;
  return (
    <g>
      {lines.map((l, i) => {
        const shown = Math.floor(l.length * Math.min(1, Math.max(0, k * lines.length - i)));
        return (
          <text key={i} x={x} y={y + i * 90} textAnchor="middle" fontSize={72} fontFamily="Fredoka" fontWeight={700} fill="#c8102e" opacity={0.92} transform={`rotate(-3 ${x} ${y})`}>
            {l.slice(0, shown)}
          </text>
        );
      })}
      {k >= 1
        ? Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={x - 300 + i * 80} y={y + 10 + (i % 3) * 90} width={6} height={20 + ((t - t0) * 30 * (1 + (i % 3))) % 90} fill="#c8102e" opacity={0.8} />
          ))
        : null}
    </g>
  );
};

export const Goblet: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={5}>
    <path d="M -40 -80 L 40 -80 Q 40 -20 0 -10 Q -40 -20 -40 -80 Z" fill="#c0c8d8" />
    <ellipse cx={0} cy={-80} rx={40} ry={10} fill="#6b8f3a" />
    <rect x={-6} y={-12} width={12} height={40} fill="#c0c8d8" />
    <ellipse cx={0} cy={30} rx={30} ry={8} fill="#c0c8d8" />
    {[0, 1].map((i) => (
      <circle key={i} cx={-10 + i * 20} cy={-90 - ((t * 50 + i * 20) % 60)} r={7} fill="#9ccf5a" strokeWidth={2} />
    ))}
  </g>
);

export const Sink: React.FC<XY & { open?: number }> = ({ x, y, s = 1, open = 0 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={6}>
    <ellipse cx={0} cy={0} rx={160 * open + 1} ry={40 * open + 1} fill="#050a08" />
    <g transform={`translate(0 ${-open * 300})`} opacity={1 - open * 0.7}>
      <rect x={-50} y={-200} width={100} height={200} fill="#e6efe9" />
      <ellipse cx={0} cy={-200} rx={90} ry={26} fill="#fff" />
      <path d="M -10 -260 Q 0 -280 30 -260 L 30 -230" fill="none" stroke="#c0c8d0" strokeWidth={10} />
      <path d="M -20 -150 q 20 -30 40 0 q -20 20 -40 0" fill="#3fa36b" strokeWidth={3} />
    </g>
  </g>
);

export const Pudding: React.FC<XY> = ({ x, y, s = 1 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={6}>
    <path d="M -110 0 Q -120 -120 0 -140 Q 120 -120 110 0 Z" fill="#fff4e0" />
    <path d="M -110 -50 q 30 30 55 0 t 55 0 t 55 0 t 55 0" fill="#fff" />
    {[-60, 0, 60].map((v, i) => (
      <circle key={i} cx={v} cy={-125 + (i === 1 ? -14 : 0)} r={14} fill="#e0262d" />
    ))}
    <ellipse cx={0} cy={6} rx={140} ry={18} fill="#e6e6f0" />
  </g>
);

export const Splat: React.FC<XY & { t: number; t0: number }> = ({ x, y, s = 1, t, t0 }) => {
  const k = t - t0;
  if (k < 0) return null;
  return (
    <g transform={T(x, y, s)}>
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const d = Math.min(1, k * 4) * (120 + random(`sp${i}`) * 140);
        return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d * 0.6 + k * 200} r={18 + random(`sr${i}`) * 20} fill="#fff4e0" stroke={INK} strokeWidth={3} opacity={Math.max(0, 1 - k / 2.5)} />;
      })}
    </g>
  );
};

export const Tears: React.FC<{ t: number; x: number; y: number }> = ({ t, x, y }) => (
  <g>
    {[0, 1, 2].map((i) => {
      const k = ((t * 1.2 + i * 0.33) % 1);
      return <path key={i} d={`M ${x + (i - 1) * 20} ${y + k * 80} q 8 14 0 20 q -8 -6 0 -20`} fill="#bfefff" stroke={INK} strokeWidth={3} opacity={1 - k} />;
    })}
    <Sparkles x={x} y={y + 40} intensity={0.6} seed={77} count={8} color="#bfefff" />
  </g>
);
