import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";
import { Sparkles } from "../characters/Stickman";
import { Floor, Grad, H, Stars, Svg, W } from "../scenes/bg1";
import { Chamber, Classroom, Diagon } from "../scenes/bg2";

type XY = { x: number; y: number; s?: number };
const T = (x: number, y: number, s = 1, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${s})`;

/* ================= FONDOS ================= */

export const Divination: React.FC<{ t: number }> = ({ t }) => (
  <>
    <div style={{ position: "absolute", inset: 0, filter: "hue-rotate(40deg) saturate(1.3) brightness(0.8)" }}>
      <Classroom t={t} />
    </div>
    <Svg>
      <rect width={W} height={H} fill="#c060c0" opacity={0.12} />
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse key={i} cx={((t * 25 + i * 260) % 1400) - 150} cy={1150 + (i % 3) * 60} rx={260} ry={40} fill="#ffd6f5" opacity={0.12} />
      ))}
      {[200, 880].map((x, i) => (
        <g key={i}>
          <rect x={x - 70} y={1180} width={140} height={90} fill="#5a2a5a" stroke={INK} strokeWidth={5} />
          <circle cx={x} cy={1140} r={50} fill="#bfefff" stroke={INK} strokeWidth={5} opacity={0.9} />
          <circle cx={x} cy={1140} r={70} fill="#e0b0ff" opacity={0.15 + 0.1 * Math.sin(t * 3 + i)} />
        </g>
      ))}
    </Svg>
  </>
);

export const Field: React.FC<{ t: number; dusk?: boolean }> = ({ t, dusk = false }) => (
  <Svg>
    <defs>
      <Grad id={dusk ? "fdk" : "fdy"} stops={dusk ? ["#3b2a8f", "#c45fa8", "#ff9a5a"] : ["#6cc4ff", "#b8e6ff", "#e8f8ff"]} />
    </defs>
    <rect width={W} height={H} fill={`url(#${dusk ? "fdk" : "fdy"})`} />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${((t * 20 + i * 400) % 1500) - 250} ${200 + i * 220})`} fill="#fff" opacity={dusk ? 0.3 : 0.9}>
        <ellipse cx={0} cy={0} rx={150} ry={44} />
        <ellipse cx={60} cy={-30} rx={80} ry={46} />
      </g>
    ))}
    {Array.from({ length: 9 }).map((_, i) => (
      <path key={i} d={`M ${i * 130 - 40} 1000 L ${i * 130 + 30} 700 L ${i * 130 + 100} 1000 Z`} fill={i % 2 ? "#1f5a33" : "#2a6b3d"} stroke={INK} strokeWidth={4} />
    ))}
    <g stroke={INK} strokeWidth={6}>
      <rect x={640} y={860} width={320} height={300} fill="#8a6a45" />
      <path d="M 610 870 Q 800 650 990 870 Z" fill="#5a3a22" />
      <rect x={700} y={940} width={70} height={60} fill="#ffd36b" />
      <rect x={840} y={1000} width={80} height={160} fill="#4a2f17" />
    </g>
    <rect x={0} y={1150} width={W} height={H - 1150} fill={dusk ? "#3f7a3f" : "#5cc95c"} />
    {[120, 300, 470].map((x, i) => (
      <g key={i} stroke={INK} strokeWidth={4}>
        <ellipse cx={x} cy={1190} rx={50} ry={36} fill="#ff8c1a" />
        <path d={`M ${x} 1154 q 6 -14 16 -16`} fill="none" stroke="#2f6b3a" strokeWidth={6} />
      </g>
    ))}
  </Svg>
);

export const Dorm: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <rect width={W} height={H} fill="#3a1d24" />
    {Array.from({ length: 16 }).map((_, r) => (
      <g key={r}>
        {Array.from({ length: 7 }).map((_, c) => (
          <rect key={c} x={c * 170 - (r % 2) * 85} y={r * 80} width={166} height={76} fill={(r + c) % 3 ? "#42222b" : "#4a2730"} stroke="rgba(0,0,0,0.3)" strokeWidth={3} />
        ))}
      </g>
    ))}
    <path d="M 440 820 L 440 520 Q 540 420 640 520 L 640 820 Z" fill="#16204f" stroke={INK} strokeWidth={6} />
    <circle cx={580} cy={560} r={30} fill="#fff4d0" />
    {[60, 680].map((x, i) => (
      <g key={i} stroke={INK} strokeWidth={6}>
        <rect x={x} y={600} width={18} height={680} fill="#5a3a22" />
        <rect x={x + 320} y={600} width={18} height={680} fill="#5a3a22" />
        <rect x={x} y={590} width={340} height={40} fill="#a51d2d" />
        <path d={`M ${x + 18} 630 Q ${x + 50} 900 ${x + 30} 1180 L ${x + 18} 1180 Z`} fill="#c8302f" />
        <path d={`M ${x + 320} 630 Q ${x + 290} 900 ${x + 310} 1180 L ${x + 320} 1180 Z`} fill="#c8302f" />
        <rect x={x + 18} y={1120} width={302} height={120} rx={14} fill="#f2e6d8" />
        <rect x={x + 30} y={1100} width={300 - 200} height={50} rx={16} fill="#fff" />
      </g>
    ))}
    <Floor y={1270} c1="#5a3020" c2="#000" lines="rgba(0,0,0,0.3)" tiles={false} />
  </Svg>
);

export const Hogsmeade: React.FC<{ t: number }> = ({ t }) => (
  <>
    <div style={{ position: "absolute", inset: 0, filter: "saturate(0.7) brightness(1.05) hue-rotate(-10deg)" }}>
      <Diagon t={t} />
    </div>
    <Svg>
      <rect width={W} height={H} fill="#dfefff" opacity={0.25} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M ${i * 280 - 40} ${470 + (i % 2) * 90} q 140 -50 300 0 l 0 20 q -150 -30 -300 0 z`} fill="#fff" stroke={INK} strokeWidth={3} />
      ))}
      <rect x={0} y={1250} width={W} height={60} fill="#ffffff" />
      <rect x={0} y={1280} width={W} height={H - 1280} fill="#eef6ff" />
      <Snowfall t={t} />
    </Svg>
  </>
);

export const Snowfall: React.FC<{ t: number; n?: number }> = ({ t, n = 70 }) => (
  <g fill="#fff">
    {Array.from({ length: n }).map((_, i) => {
      const x = (random(`sx${i}`) * 1200 + Math.sin(t + i) * 30) % 1100;
      const y = ((random(`sy${i}`) * H + t * (80 + random(`sv${i}`) * 80)) % (H + 40)) - 20;
      return <circle key={i} cx={x} cy={y} r={4 + random(`sr${i}`) * 6} opacity={0.85} />;
    })}
  </g>
);

export const Shack: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Chamber t={t} tint="#3a2a1d" light="#c9a66b" />
    <Svg>
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={0} y={i * 128} width={W} height={120} fill={i % 2 ? "#4a3626" : "#523c2a"} opacity={0.75} stroke="#2a1d12" strokeWidth={4} />
      ))}
      <rect x={140} y={500} width={260} height={300} fill="#1a1410" stroke={INK} strokeWidth={8} />
      <path d="M 150 520 L 390 780 M 390 520 L 150 780" stroke="#6b4a2a" strokeWidth={14} />
      <g stroke={INK} strokeWidth={6}>
        <rect x={700} y={1080} width={300} height={190} fill="#6b4a3a" transform="rotate(8 850 1170)" />
        <rect x={680} y={1040} width={80} height={90} fill="#8a6a55" transform="rotate(-20 720 1080)" />
      </g>
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={(random(`d${i}`) * 1080 + t * 10) % 1080} cy={300 + random(`e${i}`) * 900} r={3} fill="#e8d7b8" opacity={0.4} />
      ))}
    </Svg>
  </>
);

export const MoonNight: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <defs>
      <Grad id="mn" stops={["#05081f", "#101a45", "#1e2a5f"]} />
    </defs>
    <rect width={W} height={H} fill="url(#mn)" />
    <Stars t={t} n={70} h={900} seed="mn" />
    <circle cx={540} cy={420} r={170} fill="#fffbe6" />
    <circle cx={540} cy={420} r={300} fill="#fffbe6" opacity={0.12} />
    {Array.from({ length: 8 }).map((_, i) => {
      const x = [0, 160, 330, 760, 900, 1040, 80, 980][i];
      const h = 700 + random(`mt${i}`) * 300;
      return <path key={i} d={`M ${x - 150} 1270 L ${x} ${1270 - h} L ${x + 150} 1270 Z`} fill="#0b1f18" stroke="#000" strokeWidth={4} />;
    })}
    <rect x={0} y={1270} width={W} height={650} fill="#0f2a1e" />
  </Svg>
);

/* ================= OBJETOS ================= */

export const KnightBus: React.FC<XY & { t: number; squeeze?: number }> = ({ x, y, s = 1, t, squeeze = 1 }) => (
  <g transform={`${T(x, y, s)} scale(${squeeze} 1)`} stroke={INK} strokeWidth={7} strokeLinejoin="round">
    {[0, 1, 2].map((k) => (
      <g key={k}>
        <rect x={-260} y={-130 - k * 150} width={520} height={150} rx={18} fill="#7b2fbf" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-230 + i * 120} y={-110 - k * 150} width={90} height={80} rx={10} fill="#ffe7a8" />
        ))}
      </g>
    ))}
    <rect x={-270} y={-40} width={540} height={30} fill="#5a1f8f" />
    <text x={0} y={-468} textAnchor="middle" fontSize={34} fontFamily="Fredoka" fontWeight={700} fill="#ffd23a" stroke="none">AUTOBÚS NOCTÁMBULO</text>
    {[-170, 170].map((wx, i) => (
      <g key={i} transform={`translate(${wx} 0) rotate(${t * 600})`}>
        <circle r={46} fill="#2a2a33" />
        <line x1={-30} y1={0} x2={30} y2={0} stroke="#888" strokeWidth={6} />
      </g>
    ))}
    <circle cx={260} cy={-60} r={18} fill="#fff7b0" />
  </g>
);

export const WantedPoster: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => {
  const m = 10 + Math.abs(Math.sin(t * 9)) * 24;
  return (
    <g transform={T(x, y, s, -3)} stroke={INK} strokeWidth={6}>
      <rect x={-200} y={-270} width={400} height={540} fill="#f2e2b8" />
      <text x={0} y={-205} textAnchor="middle" fontSize={56} fontFamily="Fredoka" fontWeight={700} fill="#8a1a1a" stroke="none">SE BUSCA</text>
      <rect x={-150} y={-180} width={300} height={300} fill="#c9b78a" />
      <path d="M -110 -60 Q -120 -170 0 -170 Q 120 -170 110 -60 L 110 100 L 70 100 L 66 -70 L -66 -70 L -70 100 L -110 100 Z" fill="#141418" />
      <circle cx={0} cy={-40} r={70} fill="#e6ecf3" />
      <circle cx={-25} cy={-55} r={8} fill={INK} />
      <circle cx={25} cy={-55} r={8} fill={INK} />
      <ellipse cx={0} cy={0} rx={30} ry={m} fill="#3a0a0a" />
      <text x={0} y={190} textAnchor="middle" fontSize={50} fontFamily="Fredoka" fontWeight={700} fill={INK} stroke="none">SIRIUS BLACK</text>
    </g>
  );
};

export const Dementor: React.FC<XY & { t: number; seed?: number }> = ({ x, y, s = 1, t, seed = 0 }) => {
  const f = Math.sin(t * 2 + seed) * 14;
  return (
    <g transform={T(x, y + f, s)}>
      <circle cx={0} cy={-200} r={170} fill="#9fd8ff" opacity={0.08} />
      <path
        d={`M -90 -360 Q 0 -440 90 -360 L 120 -60 Q 100 ${20 + f} 80 -20 Q 60 ${40 - f} 30 -10 Q 10 ${50 + f} -20 -10 Q -50 ${40 - f} -70 -20 Q -100 ${20 + f} -120 -60 Z`}
        fill="#15151d"
        stroke="#000"
        strokeWidth={5}
      />
      <ellipse cx={0} cy={-330} rx={46} ry={54} fill="#000" />
      <path d={`M -100 -260 Q -170 -230 -200 ${-180 + f}`} stroke="#15151d" strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d={`M 100 -260 Q 170 -230 200 ${-180 - f}`} stroke="#15151d" strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d={`M -206 ${-178 + f} l -16 -10 m 16 10 l -18 6 m 18 -6 l -10 16`} stroke="#9aa0aa" strokeWidth={6} fill="none" />
    </g>
  );
};

export const Frost: React.FC<{ k: number }> = ({ k }) =>
  k <= 0 ? null : (
    <g opacity={k}>
      <rect width={W} height={H} fill="#bfe6ff" opacity={0.18} />
      {Array.from({ length: 30 }).map((_, i) => {
        const x = random(`fx${i}`) < 0.5 ? random(`fa${i}`) * 200 : 880 + random(`fa${i}`) * 200;
        const y = random(`fy${i}`) * H;
        return <path key={i} d={`M ${x} ${y} l 20 -30 l 10 40 l 30 -10 l -40 30 z`} fill="#eaf7ff" opacity={0.7} />;
      })}
    </g>
  );

export const TeaCup: React.FC<XY & { grim?: number }> = ({ x, y, s = 1, grim = 0 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={6}>
    <path d="M -90 -60 L 90 -60 Q 90 40 0 50 Q -90 40 -90 -60 Z" fill="#fff" />
    <path d="M 90 -40 q 50 0 40 40 q -10 30 -50 20" fill="none" />
    <ellipse cx={0} cy={-60} rx={90} ry={20} fill="#8a5a2b" />
    {grim > 0 ? (
      <g opacity={grim} transform="translate(0 -62) scale(0.35)">
        <path d="M -150 0 Q -150 -60 -80 -70 L -40 -120 L -10 -80 L 120 -80 Q 170 -60 160 0 Z" fill="#1d1d24" stroke="none" />
      </g>
    ) : null}
    <ellipse cx={0} cy={60} rx={130} ry={18} fill="#e6e6f0" />
  </g>
);

export const Hippogriff: React.FC<XY & { t: number; flip?: boolean; lunge?: number }> = ({ x, y, s = 1, t, flip = false, lunge = 0 }) => {
  const wg = Math.sin(t * 6) * 25;
  return (
    <g transform={`${T(x, y, s, -lunge * 20)} scale(${flip ? -1 : 1} 1)`} stroke={INK} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round">
      <path d={`M -40 -250 Q -160 ${-380 - wg} -300 ${-330 - wg} Q -200 -260 -60 -220 Z`} fill="#a8a8b8" />
      <ellipse cx={0} cy={-200} rx={170} ry={80} fill="#8c8c9c" />
      {[-110, -60, 70, 120].map((lx, i) => (
        <line key={i} x1={lx} y1={-150} x2={lx + Math.sin(t * 5 + i) * 10} y2={0} strokeWidth={16} />
      ))}
      <path d="M -170 -220 q -70 10 -90 70" fill="none" stroke="#6c6c7c" strokeWidth={22} />
      <path d="M 120 -250 Q 160 -340 200 -360 L 250 -330 L 230 -300 L 180 -290 Q 160 -240 150 -200 Z" fill="#d8d8e4" />
      <path d="M 248 -332 L 290 -318 L 246 -304 Z" fill="#e8b923" />
      <circle cx={214} cy={-332} r={8} fill="#ff8c1a" />
      <path d={`M -10 -240 Q -100 ${-330 - wg} -230 ${-300 - wg} Q -140 -230 -20 -215 Z`} fill="#c0c0cc" />
    </g>
  );
};

export const Wardrobe: React.FC<XY & { t: number; shake?: number; open?: number }> = ({ x, y, s = 1, t, shake = 0, open = 0 }) => (
  <g transform={T(x + Math.sin(t * 40) * 6 * shake, y, s, Math.sin(t * 30) * 2 * shake)} stroke={INK} strokeWidth={7}>
    <rect x={-150} y={-500} width={300} height={500} fill="#6b4320" />
    <rect x={-130} y={-480} width={130} height={460} fill="#7a4f2a" transform={`rotate(${-open * 70} -130 -250)`} />
    <rect x={0} y={-480} width={130} height={460} fill="#7a4f2a" transform={`rotate(${open * 70} 130 -250)`} />
    <circle cx={-14} cy={-250} r={8} fill="#d9a441" />
    <circle cx={14} cy={-250} r={8} fill="#d9a441" />
  </g>
);

export const Skates: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={4}>
    {[-120, -40, 40, 120].map((sx, i) => (
      <g key={i} transform={`translate(${sx} 0)`}>
        <rect x={-26} y={-16} width={52} height={16} rx={4} fill="#ff6b9a" />
        <circle cx={-16} cy={4} r={7} fill="#fff" transform={`rotate(${t * 500} -16 4)`} />
        <circle cx={16} cy={4} r={7} fill="#fff" />
      </g>
    ))}
  </g>
);

export const MaraudersMap: React.FC<XY & { t: number; name?: string; open?: number }> = ({ x, y, s = 1, t, name, open = 1 }) => (
  <g transform={`${T(x, y, s)} scale(${0.2 + 0.8 * open} 1)`} stroke={INK} strokeWidth={6}>
    <rect x={-300} y={-220} width={600} height={440} fill="#e9d6a8" />
    {[-100, 100].map((fx, i) => (
      <line key={i} x1={fx} y1={-220} x2={fx} y2={220} stroke="#b89a5c" strokeWidth={3} />
    ))}
    {[[-260, -180, 180, 140], [-40, -160, 220, 110], [-240, 20, 160, 160], [0, 40, 260, 140]].map(([a, b, c, d], i) => (
      <rect key={i} x={a} y={b} width={c} height={d} fill="none" stroke="#7a5a2a" strokeWidth={4} />
    ))}
    {Array.from({ length: 6 }).map((_, i) => {
      const px = -200 + ((t * 40 + i * 70) % 400);
      const py = -100 + (i % 3) * 90 + Math.sin(t * 2 + i) * 20;
      return (
        <g key={i}>
          <ellipse cx={px} cy={py} rx={7} ry={11} fill="#3a2a10" stroke="none" />
          <ellipse cx={px + 14} cy={py - 8} rx={7} ry={11} fill="#3a2a10" stroke="none" />
        </g>
      );
    })}
    {name ? (
      <g>
        <ellipse cx={80 + Math.sin(t) * 40} cy={60} rx={8} ry={12} fill="#c8102e" stroke="none" />
        <rect x={20 + Math.sin(t) * 40} y={80} width={180} height={34} fill="#fff6dc" stroke="#c8102e" strokeWidth={3} />
        <text x={110 + Math.sin(t) * 40} y={105} textAnchor="middle" fontSize={22} fontFamily="Fredoka" fontWeight={700} fill="#c8102e" stroke="none">{name}</text>
      </g>
    ) : null}
  </g>
);

export const Rat: React.FC<XY & { t: number; flip?: boolean }> = ({ x, y, s = 1, t, flip = false }) => (
  <g transform={`${T(x, y, s)} scale(${flip ? -1 : 1} 1)`} stroke={INK} strokeWidth={4}>
    <path d={`M -40 0 Q -90 ${-10 + Math.sin(t * 8) * 10} -120 10`} fill="none" stroke="#e8a0a0" strokeWidth={6} />
    <ellipse cx={0} cy={-12} rx={44} ry={26} fill="#9a8a7a" />
    <circle cx={40} cy={-24} r={18} fill="#9a8a7a" />
    <circle cx={34} cy={-40} r={9} fill="#e8a0a0" />
    <circle cx={48} cy={-26} r={4} fill={INK} />
    <circle cx={58} cy={-20} r={4} fill="#e8a0a0" />
  </g>
);

export const BlackDog: React.FC<XY & { t: number; flip?: boolean; run?: boolean }> = ({ x, y, s = 1, t, flip = false, run = false }) => {
  const g = run ? Math.sin(t * 16) * 18 : 0;
  return (
    <g transform={`${T(x, y, s)} scale(${flip ? -1 : 1} 1)`} stroke="#000" strokeWidth={7} strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx={0} cy={-150} rx={150} ry={70} fill="#1d1d24" />
      {[-100, -60, 70, 110].map((lx, i) => (
        <line key={i} x1={lx} y1={-110} x2={lx + (i % 2 ? g : -g)} y2={0} stroke="#1d1d24" strokeWidth={22} />
      ))}
      <path d="M -150 -160 q -60 -30 -80 -90" fill="none" stroke="#1d1d24" strokeWidth={18} />
      <ellipse cx={170} cy={-200} rx={70} ry={55} fill="#1d1d24" />
      <path d="M 210 -190 L 270 -180 L 260 -160 L 210 -160 Z" fill="#1d1d24" />
      <path d="M 140 -250 L 150 -300 L 180 -250 Z" fill="#1d1d24" />
      <circle cx={190} cy={-210} r={9} fill="#ffe66d" stroke="none" />
    </g>
  );
};

export const Werewolf: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y, s)} stroke="#000" strokeWidth={8} strokeLinejoin="round" strokeLinecap="round">
    <path d="M -60 0 L -40 -260 L 40 -260 L 60 0" fill="none" stroke="#5a4a3a" strokeWidth={30} />
    <ellipse cx={0} cy={-340} rx={110} ry={130} fill="#6b5a4a" />
    <path d={`M -100 -380 L -${200 + Math.sin(t * 6) * 20} -${300 + Math.sin(t * 5) * 20}`} stroke="#6b5a4a" strokeWidth={30} />
    <path d={`M 100 -380 L ${200 + Math.cos(t * 6) * 20} -${300 + Math.cos(t * 5) * 20}`} stroke="#6b5a4a" strokeWidth={30} />
    <g transform="translate(0 -500)">
      <ellipse cx={0} cy={0} rx={80} ry={70} fill="#7a6a5a" />
      <path d="M -60 -40 L -80 -120 L -20 -60 Z M 60 -40 L 80 -120 L 20 -60 Z" fill="#7a6a5a" />
      <path d="M 30 10 L 130 30 L 120 60 L 30 50 Z" fill="#7a6a5a" />
      <circle cx={-20} cy={-10} r={10} fill="#ffe66d" stroke="none" />
      <circle cx={30} cy={-10} r={10} fill="#ffe66d" stroke="none" />
      <path d="M 60 50 l 8 14 l 8 -12 l 8 14 l 8 -12" fill="#fff" strokeWidth={3} />
    </g>
  </g>
);

export const Stag: React.FC<XY & { t: number; k?: number }> = ({ x, y, s = 1, t, k = 1 }) => (
  <g transform={T(x, y, s)} opacity={k}>
    <circle cx={0} cy={-200} r={340} fill="#dff4ff" opacity={0.25} />
    <circle cx={0} cy={-200} r={200} fill="#ffffff" opacity={0.25} />
    <g stroke="#ffffff" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" fill="#e8f7ff">
      <ellipse cx={0} cy={-180} rx={150} ry={60} />
      {[-110, -70, 80, 120].map((lx, i) => (
        <line key={i} x1={lx} y1={-140} x2={lx + Math.sin(t * 8 + i) * 25} y2={0} strokeWidth={18} />
      ))}
      <path d="M 120 -210 L 190 -330 L 240 -300 L 190 -200 Z" />
      <ellipse cx={220} cy={-330} rx={50} ry={36} />
      <path d="M 200 -360 L 170 -450 L 140 -480 M 170 -450 L 200 -490 M 230 -360 L 260 -450 L 230 -490 M 260 -450 L 300 -480" fill="none" strokeWidth={10} />
    </g>
    <Sparkles x={0} y={-200} intensity={1.2} seed={44} count={20} color="#dff4ff" />
  </g>
);

export const Shield: React.FC<XY & { k: number }> = ({ x, y, s = 1, k }) =>
  k <= 0 ? null : (
    <g transform={T(x, y, s)} opacity={k}>
      <circle r={220} fill="#e8f7ff" opacity={0.35} />
      <circle r={150} fill="#ffffff" opacity={0.45} />
      <circle r={220} fill="none" stroke="#ffffff" strokeWidth={10} opacity={0.8} />
    </g>
  );

export const TimeTurner: React.FC<XY & { t: number; spin?: number }> = ({ x, y, s = 1, t, spin = 0 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={5}>
    <line x1={0} y1={-200} x2={0} y2={-80} stroke="#d9a441" strokeWidth={6} />
    <circle cx={0} cy={0} r={80} fill="none" stroke="#d9a441" strokeWidth={14} />
    <g transform={`rotate(${spin * t * 720})`}>
      <ellipse cx={0} cy={0} rx={80} ry={24} fill="none" stroke="#f2c230" strokeWidth={10} />
      <path d="M -24 -44 L 24 -44 L 6 0 L 24 44 L -24 44 L -6 0 Z" fill="#e6f4ff" />
      <path d="M -14 20 L 14 20 L 22 40 L -22 40 Z" fill="#f2c230" strokeWidth={0} />
    </g>
    <circle cx={0} cy={0} r={130} fill="#ffe36e" opacity={0.15 * spin} stroke="none" />
  </g>
);

export const Balloon: React.FC<XY & { t: number; k: number }> = ({ x, y, s = 1, t, k }) => (
  <g transform={T(x, y, s, Math.sin(t * 2) * 6)} stroke={INK} strokeWidth={6}>
    <ellipse cx={0} cy={0} rx={80 + k * 160} ry={90 + k * 150} fill="#e57373" />
    <circle cx={0} cy={-90 - k * 150} r={50} fill="#ffe6e6" />
    <circle cx={-16} cy={-96 - k * 150} r={6} fill={INK} />
    <circle cx={16} cy={-96 - k * 150} r={6} fill={INK} />
    <ellipse cx={0} cy={-72 - k * 150} rx={10} ry={12} fill={INK} />
    {[-1, 1].map((d) => (
      <line key={d} x1={d * (60 + k * 140)} y1={-20} x2={d * (110 + k * 170)} y2={-60 - Math.sin(t * 6) * 20} strokeWidth={12} />
    ))}
    {[-1, 1].map((d) => (
      <line key={`l${d}`} x1={d * 30} y1={80 + k * 140} x2={d * 40} y2={150 + k * 150} strokeWidth={12} />
    ))}
  </g>
);

export const Trunk: React.FC<XY> = ({ x, y, s = 1 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={5}>
    <rect x={-60} y={-50} width={120} height={80} rx={8} fill="#7a4a22" />
    <rect x={-60} y={-50} width={120} height={20} fill="#5a3214" />
    <rect x={-10} y={-36} width={20} height={20} fill="#d9a441" />
  </g>
);

export const Chocolate: React.FC<XY> = ({ x, y, s = 1 }) => (
  <g transform={T(x, y, s, -20)} stroke={INK} strokeWidth={4}>
    <rect x={-30} y={-50} width={60} height={100} rx={6} fill="#5a3214" />
    <rect x={-30} y={10} width={60} height={40} fill="#c8302f" />
  </g>
);

export const Snowball: React.FC<XY> = ({ x, y, s = 1 }) => <circle cx={x} cy={y} r={22 * s} fill="#fff" stroke={INK} strokeWidth={4} />;

export const Firebolt: React.FC<XY & { r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={T(x, y, s, r)} stroke={INK} strokeWidth={6} strokeLinejoin="round">
    <line x1={-220} y1={0} x2={180} y2={0} stroke="#5a2a14" strokeWidth={16} strokeLinecap="round" />
    <path d="M -220 -20 L -330 -50 L -340 0 L -330 50 L -220 20 Z" fill="#c9883a" />
    <path d="M 120 -6 l 30 0" stroke="#f2c230" strokeWidth={8} />
    <circle cx={0} cy={0} r={140} fill="#ffb347" opacity={0.15} stroke="none" />
  </g>
);

export const Rewind: React.FC<{ t: number; t0: number; dur?: number }> = ({ t, t0, dur = 1.6 }) => {
  const k = (t - t0) / dur;
  if (k < 0 || k > 1) return null;
  return (
    <g opacity={Math.sin(k * Math.PI)}>
      <rect width={W} height={H} fill="#ffe9a8" opacity={0.35} />
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx={540} cy={900} r={((1 - k) * 900 + i * 120) % 1000} fill="none" stroke="#f2c230" strokeWidth={10} opacity={0.6} />
      ))}
      <g transform={`translate(540 900) rotate(${-k * 1440})`}>
        <circle r={180} fill="#fff6dc" stroke={INK} strokeWidth={8} />
        <line x1={0} y1={0} x2={0} y2={-120} stroke={INK} strokeWidth={10} strokeLinecap="round" />
        <line x1={0} y1={0} x2={80} y2={0} stroke={INK} strokeWidth={12} strokeLinecap="round" />
      </g>
    </g>
  );
};
