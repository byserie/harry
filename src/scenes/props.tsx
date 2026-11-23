import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";
import { Sparkles } from "../characters/Stickman";

type XY = { x: number; y: number; s?: number };
const T = (x: number, y: number, s = 1, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${s})`;

export const Baby: React.FC<XY> = ({ x, y, s = 1 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={5}>
    <ellipse cx={0} cy={0} rx={70} ry={42} fill="#cfe2ff" />
    <path d="M -70 0 Q -40 -30 0 -20 Q 40 -30 70 0" fill="#a9c8ff" />
    <circle cx={-46} cy={-8} r={30} fill="#ffe9d6" />
    <path d="M -50 -34 L -56 -24 L -48 -24 L -54 -14" stroke="#e23b3b" strokeWidth={3} fill="none" />
    <path d="M -58 -6 q 4 -3 8 0 M -42 -6 q 4 -3 8 0" strokeWidth={3} fill="none" />
  </g>
);

export const Letter: React.FC<XY & { r?: number; glow?: number }> = ({ x, y, s = 1, r = 0, glow = 0 }) => (
  <g transform={T(x, y, s, r)}>
    {glow ? <circle cx={0} cy={0} r={90} fill="#ffe36e" opacity={0.3 * glow} /> : null}
    <rect x={-60} y={-40} width={120} height={80} rx={6} fill="#f7ecd0" stroke={INK} strokeWidth={5} />
    <path d="M -60 -40 L 0 8 L 60 -40" fill="none" stroke={INK} strokeWidth={4} />
    <circle cx={0} cy={8} r={13} fill="#c8302f" stroke={INK} strokeWidth={3} />
  </g>
);

/** Cartas que caen o vuelan. from: punto de origen; spread: dispersión. */
export const LetterBurst: React.FC<{ t: number; t0: number; n: number; ox: number; oy: number; spread?: number; dur?: number; up?: boolean }> = ({
  t, t0, n, ox, oy, spread = 900, dur = 2.5, up = false,
}) => (
  <>
    {Array.from({ length: n }).map((_, i) => {
      const st = t0 + (random(`lb${i}`) * dur) * 0.8;
      const k = t - st;
      if (k < 0) return null;
      const vx = (random(`vx${i}`) - 0.5) * spread;
      const vy = up ? -500 - random(`vy${i}`) * 600 : -200 - random(`vy${i}`) * 300;
      const x = ox + vx * k;
      const y = oy + vy * k + 700 * k * k;
      if (y > 2100) return null;
      return <Letter key={i} x={x} y={y} s={0.7 + random(`ls${i}`) * 0.5} r={k * 300 * (random(`r${i}`) - 0.5)} />;
    })}
  </>
);

export const Cake: React.FC<XY> = ({ x, y, s = 1 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={5}>
    <rect x={-70} y={-60} width={140} height={70} rx={10} fill="#ff9ac8" />
    <path d="M -70 -50 q 17 20 35 0 t 35 0 t 35 0 t 35 0" fill="#fff" />
    <rect x={-4} y={-100} width={8} height={40} fill="#fff6dc" />
    <ellipse cx={0} cy={-108} rx={6} ry={10} fill="#ffcc4d" strokeWidth={2} />
    <text x={0} y={-12} textAnchor="middle" fontSize={22} fontFamily="Fredoka" fontWeight={700} fill="#2fae4f" stroke="none">HARRY</text>
  </g>
);

export const Snake: React.FC<XY & { t: number; flip?: boolean }> = ({ x, y, s = 1, t, flip = false }) => {
  const pts = Array.from({ length: 16 }).map((_, i) => `${-i * 26},${Math.sin(t * 5 - i * 0.6) * 18}`);
  return (
    <g transform={`${T(x, y, s)} scale(${flip ? -1 : 1} 1)`}>
      <polyline points={pts.join(" ")} fill="none" stroke={INK} strokeWidth={38} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={pts.join(" ")} fill="none" stroke="#5fbf3f" strokeWidth={28} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={pts.join(" ")} fill="none" stroke="#3a8f2a" strokeWidth={10} strokeDasharray="6 22" strokeLinecap="round" />
      <ellipse cx={14} cy={0} rx={30} ry={22} fill="#5fbf3f" stroke={INK} strokeWidth={5} />
      <circle cx={22} cy={-8} r={5} fill={INK} />
      <path d={`M 42 4 l 18 ${Math.sin(t * 20) * 4} m -6 0 l 8 -6 m -8 6 l 8 6`} stroke="#e23b3b" strokeWidth={4} fill="none" />
    </g>
  );
};

export const Glass: React.FC<{ x: number; y: number; w: number; h: number; a: number }> = ({ x, y, w, h, a }) =>
  a <= 0 ? null : (
    <g opacity={a}>
      <rect x={x} y={y} width={w} height={h} fill="#bfefff" opacity={0.35} stroke="#e8fbff" strokeWidth={6} />
      <line x1={x + 60} y1={y + 40} x2={x + 160} y2={y + 220} stroke="#fff" strokeWidth={12} opacity={0.6} />
      <line x1={x + 120} y1={y + 40} x2={x + 190} y2={y + 160} stroke="#fff" strokeWidth={6} opacity={0.6} />
    </g>
  );

/** Puerta de la cabaña: k 0 = en su lugar, 1 = caída hacia adelante. */
export const HutDoor: React.FC<{ k: number }> = ({ k }) => {
  const sy = Math.cos((k * Math.PI) / 2.05);
  return (
    <g transform={`translate(890 1260) scale(1 ${Math.max(0.06, sy)}) translate(-890 -1260)`}>
      <rect x={770} y={770} width={240} height={490} fill="#6b4320" stroke={INK} strokeWidth={8} />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={770 + i * 60} y1={770} x2={770 + i * 60} y2={1260} stroke="#4a2f17" strokeWidth={5} />
      ))}
      <circle cx={980} cy={1020} r={10} fill="#d9a441" stroke={INK} strokeWidth={3} />
    </g>
  );
};

export const Dust: React.FC<{ t: number; t0: number; x: number; y: number; n?: number }> = ({ t, t0, x, y, n = 14 }) => {
  const k = t - t0;
  if (k < 0 || k > 1.6) return null;
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI - Math.PI;
        const d = 60 + k * 340;
        return <circle key={i} cx={x + Math.cos(a) * d * (1 + random(`du${i}`))} cy={y + Math.sin(a) * d * 0.4} r={30 + k * 50} fill="#d9c7a3" opacity={0.7 * (1 - k / 1.6)} />;
      })}
    </>
  );
};

export const PigTail: React.FC<XY> = ({ x, y, s = 1 }) => (
  <path transform={T(x, y, s)} d="M 0 0 q 30 -10 30 15 q 0 20 -18 10 q -10 -10 5 -20 q 25 -10 30 10" stroke="#ff8fb8" strokeWidth={9} fill="none" strokeLinecap="round" />
);

export const Owl: React.FC<XY & { t: number; fly?: boolean }> = ({ x, y, s = 1, t, fly = false }) => {
  const wing = fly ? Math.sin(t * 18) * 30 : 0;
  return (
    <g transform={T(x, y, s)} stroke={INK} strokeWidth={5}>
      <path d={`M -10 0 Q -70 ${-20 - wing} -90 ${10 - wing} Q -50 20 -10 20`} fill="#f4f4f4" />
      <path d={`M 10 0 Q 70 ${-20 - wing} 90 ${10 - wing} Q 50 20 10 20`} fill="#f4f4f4" />
      <ellipse cx={0} cy={0} rx={42} ry={52} fill="#ffffff" />
      <circle cx={-15} cy={-14} r={13} fill="#ffd34a" />
      <circle cx={15} cy={-14} r={13} fill="#ffd34a" />
      <circle cx={-15} cy={-14} r={5} fill={INK} />
      <circle cx={15} cy={-14} r={5} fill={INK} />
      <path d="M -6 2 L 0 14 L 6 2 Z" fill="#e8a33a" strokeWidth={3} />
    </g>
  );
};

export const Package: React.FC<XY> = ({ x, y, s = 1 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={4}>
    <rect x={-30} y={-24} width={60} height={48} rx={4} fill="#b5895a" />
    <line x1={0} y1={-24} x2={0} y2={24} stroke="#5a3a22" strokeWidth={4} />
    <line x1={-30} y1={0} x2={30} y2={0} stroke="#5a3a22" strokeWidth={4} />
  </g>
);

export const SortingHat: React.FC<XY & { t: number; talk?: boolean }> = ({ x, y, s = 1, t, talk = false }) => (
  <g transform={T(x, y, s, Math.sin(t * 3) * 3)} stroke={INK} strokeWidth={6} strokeLinejoin="round">
    <path d="M -110 0 Q 0 -30 110 0 Q 60 -40 30 -120 Q 20 -180 70 -230 Q -10 -200 -30 -120 Q -60 -40 -110 0 Z" fill="#8a6a45" />
    <ellipse cx={0} cy={0} rx={130} ry={26} fill="#7a5a38" />
    <path d="M -40 -70 q 15 -12 30 0 M 15 -75 q 15 -12 30 0" fill="none" strokeWidth={6} />
    <path d={`M -30 -35 Q 0 ${-35 + (talk ? 18 + Math.sin(t * 14) * 14 : 4)} 30 -35`} fill="#3a2414" />
  </g>
);

export const Remembrall: React.FC<XY & { glow?: number }> = ({ x, y, s = 1, glow = 0 }) => (
  <g transform={T(x, y, s)}>
    <circle cx={0} cy={0} r={34 + glow * 20} fill="#ff4d4d" opacity={0.2 * glow} />
    <circle cx={0} cy={0} r={26} fill="#dff4ff" stroke={INK} strokeWidth={4} />
    <circle cx={4} cy={4} r={14} fill="#ff6b6b" opacity={0.8} />
    <circle cx={-9} cy={-9} r={6} fill="#fff" />
  </g>
);

export const Troll: React.FC<XY & { t: number; club?: number; ko?: number }> = ({ x, y, s = 1, t, club = 0, ko = 0 }) => {
  const sway = Math.sin(t * 2) * 4;
  return (
    <g transform={`${T(x, y, s)} rotate(${ko * -80} 0 0)`} stroke={INK} strokeWidth={8} strokeLinejoin="round">
      <rect x={-90} y={-160} width={50} height={160} rx={20} fill="#8a9a7a" />
      <rect x={40} y={-160} width={50} height={160} rx={20} fill="#8a9a7a" />
      <ellipse cx={0} cy={-300} rx={160} ry={180} fill="#9aab88" />
      <rect x={-120} y={-260} width={240} height={90} rx={30} fill="#7a5a3a" />
      <circle cx={0} cy={-500 + sway} r={70} fill="#9aab88" />
      <circle cx={-24} cy={-512 + sway} r={10} fill={INK} />
      <circle cx={24} cy={-512 + sway} r={10} fill={INK} />
      <path d={`M -30 ${-470 + sway} q 30 20 60 0`} fill="none" />
      <path d={`M -14 ${-468 + sway} l 6 12 l 6 -12`} fill="#fff" strokeWidth={3} />
      {ko > 0.5 ? <text x={0} y={-600} textAnchor="middle" fontSize={60} stroke="none" fill="#ffe66d">★ ★</text> : null}
      {/* brazo con garrote */}
      <g transform={`rotate(${-30 - club * 110} 150 -360)`}>
        <rect x={130} y={-380} width={44} height={200} rx={20} fill="#9aab88" />
        {club < 0.99 ? <path d="M 140 -180 L 120 60 Q 150 110 200 70 L 180 -180 Z" fill="#7a4a22" /> : null}
      </g>
      <rect x={-174} y={-380} width={44} height={200} rx={20} fill="#9aab88" />
    </g>
  );
};

export const Club: React.FC<XY & { r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <path transform={T(x, y, s, r)} d="M -20 -120 L -40 120 Q -10 170 40 130 L 20 -120 Z" fill="#7a4a22" stroke={INK} strokeWidth={8} />
);

export const Snitch: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y, s)}>
    <circle cx={0} cy={0} r={40} fill="#ffe36e" opacity={0.25} />
    <path d={`M -10 0 Q -40 ${-30 + Math.sin(t * 30) * 20} -70 -10 Q -40 0 -10 4`} fill="#fff" stroke={INK} strokeWidth={3} />
    <path d={`M 10 0 Q 40 ${-30 + Math.sin(t * 30) * 20} 70 -10 Q 40 0 10 4`} fill="#fff" stroke={INK} strokeWidth={3} />
    <circle cx={0} cy={0} r={16} fill="#f2c230" stroke={INK} strokeWidth={4} />
  </g>
);

export const Dog3: React.FC<XY & { t: number; sleep?: boolean }> = ({ x, y, s = 1, t, sleep = false }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={8} strokeLinejoin="round">
    <ellipse cx={0} cy={-260} rx={280} ry={170} fill="#8a6a45" />
    {[-200, -80, 80, 200].map((lx, i) => (
      <rect key={i} x={lx - 30} y={-160} width={60} height={160} rx={24} fill="#7a5a38" />
    ))}
    {[-180, 0, 180].map((hx, i) => {
      const bob = sleep ? 40 : Math.sin(t * 4 + i * 2) * 16;
      return (
        <g key={i} transform={`translate(${hx} ${-470 + bob}) rotate(${(i - 1) * 18 + (sleep ? 20 : 0)})`}>
          <ellipse cx={0} cy={0} rx={95} ry={85} fill="#9a7a50" />
          <path d="M -80 -50 L -110 -120 L -40 -80 Z M 80 -50 L 110 -120 L 40 -80 Z" fill="#6b4a2b" />
          <ellipse cx={0} cy={40} rx={55} ry={38} fill="#b8946a" />
          <ellipse cx={0} cy={18} rx={18} ry={12} fill={INK} />
          {sleep ? (
            <path d="M -45 -15 q 15 10 30 0 M 15 -15 q 15 10 30 0" fill="none" strokeWidth={6} />
          ) : (
            <g>
              <circle cx={-32} cy={-18} r={11} fill="#ff3b3b" />
              <circle cx={32} cy={-18} r={11} fill="#ff3b3b" />
              <path d="M -40 56 L -28 76 L -16 56 M 16 56 L 28 76 L 40 56" fill="#fff" strokeWidth={4} />
            </g>
          )}
        </g>
      );
    })}
    {sleep ? <text x={260} y={-640 - ((t * 40) % 80)} fontSize={70} fill="#fff" stroke="none" fontFamily="Fredoka" fontWeight={700}>Z z</text> : null}
  </g>
);

export const Book: React.FC<XY & { glow?: number; open?: boolean }> = ({ x, y, s = 1, glow = 0, open = true }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={5} strokeLinejoin="round">
    {glow ? <circle cx={0} cy={-20} r={150} fill="#ffe36e" opacity={0.25 * glow} stroke="none" /> : null}
    {open ? (
      <>
        <path d="M 0 0 Q -60 -30 -130 -10 L -130 -110 Q -60 -130 0 -100 Z" fill="#fff7e0" />
        <path d="M 0 0 Q 60 -30 130 -10 L 130 -110 Q 60 -130 0 -100 Z" fill="#fff7e0" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={-110} x2={-25} y1={-85 + i * 18} y2={-80 + i * 18} strokeWidth={3} />
        ))}
        <text x={65} y={-50} textAnchor="middle" fontSize={22} fontFamily="Fredoka" fontWeight={700} stroke="none" fill="#c8302f">FLAMEL</text>
      </>
    ) : (
      <rect x={-70} y={-110} width={140} height={110} rx={8} fill="#8e5ad6" />
    )}
  </g>
);

/** Espejo con contenido mágico (reflejo). */
export const Mirror: React.FC<XY & { t: number; children?: React.ReactNode; glow?: number }> = ({ x, y, s = 1, t, children, glow = 0.5 }) => (
  <g transform={T(x, y, s)}>
    <path d="M -230 0 L -230 -620 Q 0 -820 230 -620 L 230 0 Z" fill="#d9a441" stroke={INK} strokeWidth={10} />
    <path d="M -190 -20 L -190 -600 Q 0 -760 190 -600 L 190 -20 Z" fill="#9fd8ff" stroke={INK} strokeWidth={6} />
    <clipPath id="mirclip">
      <path d="M -190 -20 L -190 -600 Q 0 -760 190 -600 L 190 -20 Z" />
    </clipPath>
    <g clipPath="url(#mirclip)">
      <rect x={-200} y={-760} width={400} height={760} fill="#bde6ff" opacity={0.5 + 0.2 * Math.sin(t * 2)} />
      {children}
      <rect x={-150} y={-700} width={60} height={760} fill="#fff" opacity={0.25} transform={`translate(${((t * 80) % 500) - 100} 0) rotate(20)`} />
    </g>
    <circle cx={0} cy={-300} r={320} fill="#ffe36e" opacity={0.08 * glow} />
    <rect x={-260} y={-10} width={520} height={40} rx={10} fill="#b8862f" stroke={INK} strokeWidth={8} />
  </g>
);

export const Unicorn: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={6} strokeLinejoin="round">
    <circle cx={0} cy={-60} r={200} fill="#cfe8ff" opacity={0.15 + 0.05 * Math.sin(t * 3)} stroke="none" />
    <ellipse cx={0} cy={-40} rx={170} ry={60} fill="#ffffff" />
    <path d="M 140 -60 L 230 -110 L 250 -80 L 170 -30 Z" fill="#ffffff" />
    <path d="M 238 -110 L 300 -150 L 248 -96 Z" fill="#ffe36e" />
    <path d="M -170 -40 q -60 10 -80 50" fill="none" stroke="#d9c7ff" strokeWidth={14} />
    <path d="M -80 -10 q 10 40 40 40 M 0 -6 q 10 40 40 40" fill="none" strokeWidth={8} />
    <circle cx={60} cy={-10} r={10} fill="#c0d8ff" strokeWidth={0} />
  </g>
);

export const Hooded: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y + Math.sin(t * 2) * 6, s)}>
    <path d="M -110 0 Q -120 -300 -60 -420 Q 0 -500 60 -420 Q 120 -300 110 0 Q 50 -30 0 0 Q -50 -30 -110 0 Z" fill="#0d0d14" stroke="#000" strokeWidth={6} />
    <ellipse cx={0} cy={-380} rx={48} ry={58} fill="#000" />
    <circle cx={-18} cy={-385} r={8} fill="#ff2b2b" />
    <circle cx={18} cy={-385} r={8} fill="#ff2b2b" />
    <circle cx={0} cy={-385} r={60} fill="#ff2b2b" opacity={0.12} />
  </g>
);

export const Centaur: React.FC<XY & { t: number; flip?: boolean }> = ({ x, y, s = 1, t, flip = false }) => {
  const g = Math.sin(t * 4) * 8;
  return (
    <g transform={`${T(x, y, s)} scale(${flip ? -1 : 1} 1)`} stroke={INK} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx={-60} cy={-230} rx={150} ry={70} fill="#e8d7b8" />
      {[-170, -110, 0, 50].map((lx, i) => (
        <line key={i} x1={lx} y1={-200} x2={lx + (i % 2 ? g : -g)} y2={0} strokeWidth={14} />
      ))}
      <path d="M -210 -240 q -60 20 -70 90" fill="none" stroke="#e8d7b8" strokeWidth={22} />
      <line x1={70} y1={-260} x2={80} y2={-420} strokeWidth={13} />
      <line x1={78} y1={-400} x2={150} y2={-340} strokeWidth={13} />
      <line x1={78} y1={-400} x2={20} y2={-330} strokeWidth={13} />
      <circle cx={82} cy={-470} r={46} fill="#f4ecd8" strokeWidth={6} />
      <path d="M 40 -495 Q 82 -540 124 -495" fill="#e8d7b8" strokeWidth={5} />
      <circle cx={96} cy={-474} r={5} fill={INK} />
      <circle cx={70} cy={-474} r={5} fill={INK} />
      <text x={82} y={-550} textAnchor="middle" fontSize={34} fontFamily="Fredoka" fontWeight={700} fill="#fff" stroke={INK} strokeWidth={6} paintOrder="stroke" transform={flip ? "scale(-1 1) translate(-164 0)" : ""}>
        Centauro
      </text>
    </g>
  );
};

export const Harp: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={6}>
    <path d="M -50 0 L -50 -200 Q 40 -220 60 -120 L 30 0 Z" fill="none" stroke="#d9a441" strokeWidth={14} />
    {[0, 1, 2, 3, 4].map((i) => (
      <line key={i} x1={-40 + i * 16} y1={-10} x2={-40 + i * 16} y2={-180 + i * 10} stroke="#fff" strokeWidth={3} />
    ))}
    {[0, 1, 2].map((i) => (
      <text key={i} x={60 + i * 40} y={-140 - ((t * 60 + i * 40) % 120)} fontSize={44} fill="#ffe66d" stroke="none">♪</text>
    ))}
  </g>
);

export const Vines: React.FC<{ t: number; grip: number; burn?: number }> = ({ t, grip, burn = 0 }) => (
  <g stroke={INK} strokeWidth={6} strokeLinecap="round" fill="none" opacity={1 - burn}>
    {Array.from({ length: 9 }).map((_, i) => {
      const x = 60 + i * 120;
      const reach = 300 + grip * 500;
      const wig = Math.sin(t * 3 + i) * 30;
      return (
        <g key={i}>
          <path d={`M ${x} 1920 Q ${x + wig} ${1920 - reach * 0.5} ${x + wig * 2 + (540 - x) * grip * 0.4} ${1920 - reach}`} stroke="#1f5a2a" strokeWidth={28} />
          <path d={`M ${x} 1920 Q ${x + wig} ${1920 - reach * 0.5} ${x + wig * 2 + (540 - x) * grip * 0.4} ${1920 - reach}`} stroke="#3f9a4a" strokeWidth={16} />
        </g>
      );
    })}
  </g>
);

export const Key: React.FC<XY & { t: number; broken?: boolean; r?: number }> = ({ x, y, s = 1, t, broken = false, r = 0 }) => {
  const w = Math.sin(t * 26 + x) * 18;
  return (
    <g transform={T(x, y, s, r)} stroke={INK} strokeWidth={4}>
      <path d={`M -6 -6 Q -30 ${-30 - w} -50 -10 Q -30 -4 -6 2`} fill="#fff" />
      {broken ? <path d={`M 6 -6 Q 22 ${-18 - w} 30 -8`} fill="#fff" /> : <path d={`M 6 -6 Q 30 ${-30 - w} 50 -10 Q 30 -4 6 2`} fill="#fff" />}
      <circle cx={-18} cy={10} r={12} fill="none" stroke="#f2c230" strokeWidth={7} />
      <path d="M -6 10 L 30 10 M 22 10 L 22 22 M 30 10 L 30 20" stroke="#f2c230" strokeWidth={7} fill="none" />
    </g>
  );
};

export const ChessPiece: React.FC<XY & { kind: "peon" | "torre" | "caballo" | "reina" | "rey"; dark?: boolean; r?: number }> = ({ x, y, s = 1, kind, dark = false, r = 0 }) => {
  const fill = dark ? "#2a2a33" : "#f2efe6";
  return (
    <g transform={T(x, y, s, r)} stroke={INK} strokeWidth={7} strokeLinejoin="round">
      <rect x={-80} y={-40} width={160} height={40} rx={10} fill={fill} />
      <path d="M -55 -40 L -40 -200 L 40 -200 L 55 -40 Z" fill={fill} />
      {kind === "torre" ? <path d="M -60 -200 L -60 -270 L -35 -270 L -35 -240 L -10 -240 L -10 -270 L 10 -270 L 10 -240 L 35 -240 L 35 -270 L 60 -270 L 60 -200 Z" fill={fill} /> : null}
      {kind === "peon" ? <circle cx={0} cy={-240} r={48} fill={fill} /> : null}
      {kind === "caballo" ? <path d="M -50 -200 L -40 -300 Q 0 -360 60 -320 L 70 -270 L 20 -260 L 40 -200 Z" fill={fill} /> : null}
      {kind === "reina" || kind === "rey" ? (
        <g>
          <ellipse cx={0} cy={-240} rx={60} ry={44} fill={fill} />
          {kind === "rey" ? <path d="M -10 -340 L 10 -340 L 10 -310 L 30 -310 L 30 -290 L 10 -290 L 10 -270 L -10 -270 L -10 -290 L -30 -290 L -30 -310 L -10 -310 Z" fill={fill} /> : <path d="M -50 -270 L -40 -320 L -15 -280 L 0 -330 L 15 -280 L 40 -320 L 50 -270 Z" fill={fill} />}
        </g>
      ) : null}
    </g>
  );
};

export const Flame: React.FC<XY & { t: number; color?: string }> = ({ x, y, s = 1, t, color = "#ff8a1a" }) => (
  <g transform={T(x, y, s)}>
    <circle cx={0} cy={-60} r={110} fill={color} opacity={0.2} />
    {[0, 1, 2].map((i) => {
      const h = 160 - i * 40 + Math.sin(t * 14 + i) * 20;
      return (
        <path
          key={i}
          d={`M ${-60 + i * 18} 0 Q ${-70 + i * 20} ${-h * 0.5} ${Math.sin(t * 9 + i) * 15} ${-h} Q ${70 - i * 20} ${-h * 0.5} ${60 - i * 18} 0 Z`}
          fill={["#ff5a1a", color, "#ffe36e"][i]}
          stroke={i === 0 ? INK : "none"}
          strokeWidth={5}
        />
      );
    })}
  </g>
);

export const Stone: React.FC<XY & { glow?: number }> = ({ x, y, s = 1, glow = 1 }) => (
  <g transform={T(x, y, s)}>
    <circle cx={0} cy={0} r={70} fill="#ff3b3b" opacity={0.25 * glow} />
    <path d="M -28 -10 L -10 -34 L 22 -30 L 34 0 L 14 30 L -20 26 Z" fill="#e0262d" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -10 -20 L 8 -22 L 2 -6 Z" fill="#ff9a9a" />
  </g>
);

export const Cup: React.FC<XY & { glow?: number }> = ({ x, y, s = 1, glow = 1 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={7} strokeLinejoin="round">
    <circle cx={0} cy={-170} r={200} fill="#ffe36e" opacity={0.2 * glow} stroke="none" />
    <path d="M -110 -300 L 110 -300 Q 110 -150 0 -120 Q -110 -150 -110 -300 Z" fill="#f2c230" />
    <path d="M -110 -270 Q -190 -260 -160 -200 Q -140 -170 -100 -190" fill="none" strokeWidth={14} stroke="#f2c230" />
    <path d="M 110 -270 Q 190 -260 160 -200 Q 140 -170 100 -190" fill="none" strokeWidth={14} stroke="#f2c230" />
    <rect x={-20} y={-125} width={40} height={70} fill="#e0a820" />
    <rect x={-80} y={-60} width={160} height={50} rx={10} fill="#c8302f" />
    <path d="M -40 -270 L -20 -260" stroke="#fff" strokeWidth={10} />
  </g>
);

/** Voldemort: humo negro con ojos rojos. */
export const Voldemort: React.FC<XY & { t: number; k?: number }> = ({ x, y, s = 1, t, k = 1 }) => (
  <g transform={T(x, y, s)} opacity={k}>
    <circle cx={0} cy={0} r={260} fill="#ff1a1a" opacity={0.08 + 0.04 * Math.sin(t * 5)} />
    {Array.from({ length: 16 }).map((_, i) => {
      const a = (i / 16) * Math.PI * 2 + t * 0.6;
      const r = 90 + Math.sin(t * 2 + i) * 25;
      return <circle key={i} cx={Math.cos(a) * r * 1.2} cy={Math.sin(a) * r} r={80 + Math.sin(t * 3 + i * 1.7) * 18} fill={i % 2 ? "#0b0b10" : "#1a1a24"} opacity={0.85} />;
    })}
    <ellipse cx={0} cy={0} rx={150} ry={130} fill="#050507" />
    <path d="M -80 -30 L -20 -10 L -80 10 Z" fill="#ff2020" />
    <path d="M 80 -30 L 20 -10 L 80 10 Z" fill="#ff2020" />
    <circle cx={-55} cy={-10} r={40} fill="#ff2020" opacity={0.25} />
    <circle cx={55} cy={-10} r={40} fill="#ff2020" opacity={0.25} />
    <path d={`M -50 70 Q 0 ${90 + Math.sin(t * 6) * 10} 50 70`} stroke="#5a0000" strokeWidth={8} fill="none" />
  </g>
);

export const Bolt: React.FC<XY & { glow?: number }> = ({ x, y, s = 1, glow = 1 }) => (
  <g transform={T(x, y, s)}>
    <circle cx={0} cy={0} r={200} fill="#ffe36e" opacity={0.18 * glow} />
    <path d="M 30 -170 L -70 20 L 0 20 L -40 170 L 80 -40 L 10 -40 L 60 -170 Z" fill="#ffd23a" stroke={INK} strokeWidth={10} strokeLinejoin="round" />
  </g>
);

export const Clock: React.FC<XY & { min: number }> = ({ x, y, s = 1, min }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={6}>
    <circle cx={0} cy={0} r={90} fill="#fff6dc" />
    {Array.from({ length: 12 }).map((_, i) => (
      <line key={i} x1={Math.cos((i / 12) * Math.PI * 2) * 72} y1={Math.sin((i / 12) * Math.PI * 2) * 72} x2={Math.cos((i / 12) * Math.PI * 2) * 82} y2={Math.sin((i / 12) * Math.PI * 2) * 82} strokeWidth={4} />
    ))}
    <line x1={0} y1={0} x2={0} y2={-50} strokeWidth={9} strokeLinecap="round" transform={`rotate(${(min / 60) * 30 - 30 + 360})`} />
    <line x1={0} y1={0} x2={0} y2={-74} strokeWidth={6} strokeLinecap="round" transform={`rotate(${min * 6})`} />
    <circle cx={0} cy={0} r={8} fill={INK} />
  </g>
);

export const Frog: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => {
  const hop = Math.abs(Math.sin(t * 5)) * 80;
  return (
    <g transform={T(x, y - hop, s)} stroke={INK} strokeWidth={4}>
      <ellipse cx={0} cy={0} rx={40} ry={28} fill="#7a4a22" />
      <circle cx={-18} cy={-26} r={12} fill="#7a4a22" />
      <circle cx={18} cy={-26} r={12} fill="#7a4a22" />
      <circle cx={-18} cy={-28} r={5} fill="#fff" />
      <circle cx={18} cy={-28} r={5} fill="#fff" />
    </g>
  );
};

export const Trapdoor: React.FC<XY & { open?: number }> = ({ x, y, s = 1, open = 0 }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={6}>
    <ellipse cx={0} cy={0} rx={160} ry={40} fill="#0b0818" />
    <g transform={`scale(1 ${1 - open * 1.6})`}>
      <ellipse cx={0} cy={0} rx={160} ry={40} fill="#6b4320" />
      <circle cx={0} cy={0} r={10} fill="#d9a441" />
    </g>
  </g>
);

export const Spell: React.FC<{ t: number; t0: number; x0: number; y0: number; x1: number; y1: number; color?: string; dur?: number }> = ({ t, t0, x0, y0, x1, y1, color = "#ffe36e", dur = 0.5 }) => {
  const k = (t - t0) / dur;
  if (k < 0 || k > 1.6) return null;
  const kk = Math.min(1, k);
  const x = x0 + (x1 - x0) * kk;
  const y = y0 + (y1 - y0) * kk;
  return (
    <g>
      <line x1={x0} y1={y0} x2={x} y2={y} stroke={color} strokeWidth={14} strokeLinecap="round" opacity={Math.max(0, 1 - (k - 1) * 2)} />
      <Sparkles x={x} y={y} intensity={Math.max(0, 1 - Math.max(0, k - 1) * 1.6)} seed={Math.round(t0 * 10)} color={color} />
    </g>
  );
};

export const Hourglass: React.FC<XY & { fill: number; color: string }> = ({ x, y, s = 1, fill, color }) => (
  <g transform={T(x, y, s)} stroke={INK} strokeWidth={6}>
    <path d="M -50 -200 L 50 -200 L 8 -100 L 50 0 L -50 0 L -8 -100 Z" fill="#e6f4ff" opacity={0.8} />
    <path d={`M ${-50 + (1 - fill) * 40} ${-fill * 95} L ${50 - (1 - fill) * 40} ${-fill * 95} L 50 0 L -50 0 Z`} fill={color} strokeWidth={0} />
    <rect x={-60} y={-214} width={120} height={16} fill="#d9a441" />
    <rect x={-60} y={-2} width={120} height={16} fill="#d9a441" />
  </g>
);

export const Confetti: React.FC<{ t: number; t0: number; n?: number; colors?: string[] }> = ({ t, t0, n = 90, colors = ["#c8302f", "#f2c230", "#ffffff", "#ff8a1a"] }) => {
  const k = t - t0;
  if (k < 0) return null;
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const x = random(`cf${i}`) * 1080 + Math.sin(k * 3 + i) * 40;
        const y = -60 + (k * (300 + random(`cv${i}`) * 400)) - random(`cd${i}`) * 400;
        if (y < -80 || y > 2000) return null;
        return <rect key={i} x={x} y={y} width={18} height={30} fill={colors[i % colors.length]} transform={`rotate(${k * 400 * (random(`cr${i}`) - 0.5)} ${x + 9} ${y + 15})`} />;
      })}
    </>
  );
};

/** Figurita simple (reflejos, recuerdos, multitudes). */
export const MiniStick: React.FC<XY & { color: string; head: string; hair?: string; glasses?: boolean; arms?: "down" | "up" | "wave"; t?: number }> = ({ x, y, s = 1, color, head, hair, glasses = false, arms = "down", t = 0 }) => {
  const a = arms === "up" ? -60 : arms === "wave" ? -50 + Math.sin(t * 8) * 20 : 30;
  return (
    <g transform={T(x, y, s)} stroke={INK} strokeWidth={9} strokeLinecap="round" fill="none">
      <line x1={0} y1={-150} x2={-30} y2={0} />
      <line x1={0} y1={-150} x2={30} y2={0} />
      <line x1={0} y1={-150} x2={0} y2={-280} />
      <line x1={0} y1={-260} x2={-60} y2={-260 - a} />
      <line x1={0} y1={-260} x2={60} y2={-260 - (arms === "wave" ? -a : a)} />
      <line x1={-30} y1={-275} x2={30} y2={-275} stroke={color} strokeWidth={18} />
      <circle cx={0} cy={-330} r={44} fill={head} strokeWidth={6} />
      {hair ? <path d="M -44 -336 Q -40 -378 0 -378 Q 40 -378 44 -336 Q 22 -356 0 -354 Q -22 -356 -44 -336 Z" fill={hair} strokeWidth={4} /> : null}
      <circle cx={-14} cy={-334} r={5} fill={INK} stroke="none" />
      <circle cx={14} cy={-334} r={5} fill={INK} stroke="none" />
      <path d="M -14 -312 Q 0 -300 14 -312" strokeWidth={5} />
      {glasses ? (
        <g strokeWidth={3.5}>
          <circle cx={-14} cy={-334} r={11} />
          <circle cx={14} cy={-334} r={11} />
        </g>
      ) : null}
    </g>
  );
};

export const Lantern: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y, s)}>
    <circle cx={0} cy={30} r={90 + Math.sin(t * 8) * 6} fill="#ffd36b" opacity={0.25} />
    <line x1={0} y1={-20} x2={0} y2={0} stroke={INK} strokeWidth={5} />
    <rect x={-22} y={0} width={44} height={60} rx={8} fill="#ffe7a0" stroke={INK} strokeWidth={5} />
  </g>
);

export const Question: React.FC<{ t: number; x: number; y: number; t0: number }> = ({ t, x, y, t0 }) => {
  const k = t - t0;
  if (k < 0 || k > 3) return null;
  return (
    <>
      {[0, 1, 2].map((i) => (
        <text key={i} x={x + (i - 1) * 90} y={y - k * 40 - i * 20} fontSize={90} fontFamily="Fredoka" fontWeight={700} fill="#ffe66d" stroke={INK} strokeWidth={6} paintOrder="stroke" opacity={Math.min(1, k * 3) * (1 - Math.max(0, k - 2.4) / 0.6)}>
          ?
        </text>
      ))}
    </>
  );
};
