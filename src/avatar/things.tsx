import React from "react";
import { INK } from "../characters/cast";

/** Criaturas y máquinas de Avatar. Todas en coordenadas del lienzo 1080×1920. */
type XY = { x: number; y: number; s?: number; flip?: boolean; t: number };
const T = (x: number, y: number, s = 1, flip = false, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${flip ? -s : s} ${s})`;

// ---------------------------------------------------------------- máquinas humanas

/** Helicóptero de transporte con dos hélices en tubos. */
export const Samson: React.FC<XY & { r?: number }> = ({ x, y, s = 1, flip, t, r = 0 }) => (
  <g transform={T(x, y, s, flip, r)}>
    <path d="M -160 0 Q -170 -60 -80 -70 L 120 -70 Q 190 -60 200 0 Q 190 40 120 50 L -100 50 Q -160 40 -160 0 Z" fill="#7a7e5a" stroke={INK} strokeWidth={6} />
    <path d="M 110 -60 Q 180 -50 190 -6 L 110 -6 Z" fill="#9ad8ff" stroke={INK} strokeWidth={5} />
    <rect x={-60} y={-40} width={110} height={70} rx={8} fill="#5a5e40" stroke={INK} strokeWidth={4} />
    <path d="M -160 -20 L -320 -40 L -330 -10 L -160 10 Z" fill="#6a6e4a" stroke={INK} strokeWidth={5} />
    {[-1, 1].map((side) => (
      <g key={side} transform={`translate(${side * 20} -70)`}>
        <rect x={-110 + side * 90} y={-50} width={120} height={36} rx={18} fill="#5a5e40" stroke={INK} strokeWidth={5} />
        <ellipse cx={-50 + side * 90} cy={-32} rx={70 * Math.abs(Math.cos(t * 30 + side))} ry={6} fill="#ddd" opacity={0.7} />
      </g>
    ))}
    <line x1={-120} y1={50} x2={-120} y2={80} stroke={INK} strokeWidth={6} />
    <line x1={120} y1={50} x2={120} y2={80} stroke={INK} strokeWidth={6} />
    <line x1={-150} y1={80} x2={160} y2={80} stroke={INK} strokeWidth={8} strokeLinecap="round" />
    <text x={20} y={20} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={22} fill="#e8b923">RDA</text>
  </g>
);

/** Helicóptero de ataque (más chico, con armas). */
export const Gunship: React.FC<XY & { r?: number; fire?: boolean }> = ({ x, y, s = 1, flip, t, r = 0, fire = false }) => (
  <g transform={T(x, y, s, flip, r)}>
    <path d="M -120 0 Q -110 -50 -20 -54 L 80 -50 Q 150 -30 150 0 Q 140 30 60 36 L -90 30 Q -120 20 -120 0 Z" fill="#5a6048" stroke={INK} strokeWidth={6} />
    <path d="M 70 -46 Q 140 -30 145 -4 L 70 -4 Z" fill="#9ad8ff" stroke={INK} strokeWidth={4} />
    <path d="M -120 -10 L -260 -30 L -270 0 L -120 14 Z" fill="#4a5038" stroke={INK} strokeWidth={5} />
    <line x1={-40} y1={-54} x2={-40} y2={-80} stroke={INK} strokeWidth={6} />
    <ellipse cx={-40} cy={-82} rx={200 * Math.abs(Math.cos(t * 28))} ry={7} fill="#ddd" opacity={0.75} />
    <rect x={-40} y={24} width={120} height={22} rx={10} fill="#3a3e2c" stroke={INK} strokeWidth={4} />
    <line x1={80} y1={35} x2={140} y2={35} stroke={INK} strokeWidth={8} />
    {fire ? <circle cx={150} cy={35} r={14 + 6 * Math.sin(t * 40)} fill="#ffd23a" opacity={0.9} /> : null}
  </g>
);

/** Nave de asalto gigante (la "Dragón"). */
export const DragonShip: React.FC<XY> = ({ x, y, s = 1, flip, t }) => (
  <g transform={T(x, y, s, flip)}>
    <path d="M -340 0 Q -330 -90 -160 -110 L 260 -110 Q 380 -80 400 0 Q 380 70 260 90 L -180 90 Q -330 80 -340 0 Z" fill="#4a5040" stroke={INK} strokeWidth={8} />
    <path d="M 260 -100 Q 370 -70 390 -10 L 260 -10 Z" fill="#9ad8ff" stroke={INK} strokeWidth={5} />
    {[-220, -60, 100].map((d, i) => (
      <rect key={i} x={d} y={-60} width={110} height={40} rx={8} fill="#3a3e30" stroke={INK} strokeWidth={4} />
    ))}
    {[-1, 1].map((side) => (
      <g key={side}>
        <rect x={side > 0 ? 120 : -300} y={-170} width={180} height={50} rx={25} fill="#3a3e30" stroke={INK} strokeWidth={6} />
        <ellipse cx={side > 0 ? 210 : -210} cy={-145} rx={130 * Math.abs(Math.cos(t * 26 + side))} ry={8} fill="#ddd" opacity={0.7} />
      </g>
    ))}
    {[-200, -80, 40, 160].map((d, i) => (
      <circle key={`l${i}`} cx={d} cy={70} r={8} fill="#ff4a3a" opacity={Math.sin(t * 6 + i) > 0 ? 1 : 0.3} />
    ))}
    <text x={30} y={40} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={34} fill="#e8b923">RDA</text>
  </g>
);

/** Nave de transporte que baja del espacio. */
export const Shuttle: React.FC<XY & { door?: number }> = ({ x, y, s = 1, flip, t, door = 0 }) => (
  <g transform={T(x, y, s, flip)}>
    <path d="M -300 40 L -250 -60 Q 0 -110 260 -60 L 320 40 Q 0 80 -300 40 Z" fill="#d8dee6" stroke={INK} strokeWidth={7} />
    <path d="M 180 -64 Q 270 -50 300 0 L 190 0 Z" fill="#6ac8ff" stroke={INK} strokeWidth={5} />
    <path d="M -300 40 L -420 -20 L -400 50 Z" fill="#b8c2cc" stroke={INK} strokeWidth={5} />
    <rect x={-140} y={-30} width={160} height={70} fill="#3a4654" stroke={INK} strokeWidth={4} />
    <path d={`M -140 40 L 20 40 L ${20} ${40 + door * 90} L -140 ${40 + door * 90} Z`} fill="#8a96a4" stroke={INK} strokeWidth={4} />
    <ellipse cx={-320} cy={30} rx={40 + 10 * Math.sin(t * 20)} ry={18} fill="#9ad8ff" opacity={0.6} />
  </g>
);

/** Robot gigante (exoesqueleto) con piloto adentro. */
export const AmpSuit: React.FC<XY & { pilotSkin?: string; walk?: number; knife?: boolean; broken?: number }> = ({ x, y, s = 1, flip, t, pilotSkin = "#e3ad88", walk = 0, knife = false, broken = 0 }) => {
  const st = Math.sin(t * 5) * walk;
  return (
    <g transform={T(x, y, s, flip)}>
      {/* piernas */}
      <path d={`M -40 -260 L ${-60 - st * 20} -120 L ${-50 - st * 30} 0`} stroke={INK} strokeWidth={44} fill="none" strokeLinejoin="round" />
      <path d={`M -40 -260 L ${-60 - st * 20} -120 L ${-50 - st * 30} 0`} stroke="#6a7058" strokeWidth={32} fill="none" strokeLinejoin="round" />
      <path d={`M 40 -260 L ${60 + st * 20} -120 L ${50 + st * 30} 0`} stroke={INK} strokeWidth={44} fill="none" strokeLinejoin="round" />
      <path d={`M 40 -260 L ${60 + st * 20} -120 L ${50 + st * 30} 0`} stroke="#7a8068" strokeWidth={32} fill="none" strokeLinejoin="round" />
      <rect x={-90 - st * 30} y={-10} width={80} height={24} rx={8} fill="#4a5040" stroke={INK} strokeWidth={5} />
      <rect x={10 + st * 30} y={-10} width={80} height={24} rx={8} fill="#4a5040" stroke={INK} strokeWidth={5} />
      {/* cuerpo / cabina */}
      <path d="M -110 -260 L -120 -420 Q -110 -470 -40 -470 L 60 -470 Q 120 -460 120 -400 L 110 -260 Z" fill="#7a8068" stroke={INK} strokeWidth={7} />
      <path d="M -70 -450 L 70 -450 Q 90 -420 80 -360 L -80 -360 Q -90 -420 -70 -450 Z" fill={broken > 0 ? "rgba(255,255,255,0.15)" : "rgba(160,220,255,0.55)"} stroke={INK} strokeWidth={5} />
      {broken > 0 ? <path d="M -40 -440 L -10 -400 L -50 -380 M 20 -445 L 0 -410 L 40 -380" stroke="#fff" strokeWidth={3} fill="none" /> : null}
      {/* piloto */}
      <circle cx={0} cy={-405} r={24} fill={pilotSkin} stroke={INK} strokeWidth={4} />
      <path d="M -26 -415 Q 0 -440 26 -415" stroke="#8a8a80" strokeWidth={10} fill="none" />
      <circle cx={8} cy={-405} r={3.5} fill={INK} />
      {/* brazos */}
      <path d={`M 110 -400 L 190 ${-330 + st * 10} L 250 ${-380 + st * 10}`} stroke={INK} strokeWidth={42} fill="none" strokeLinejoin="round" />
      <path d={`M 110 -400 L 190 ${-330 + st * 10} L 250 ${-380 + st * 10}`} stroke="#6a7058" strokeWidth={30} fill="none" strokeLinejoin="round" />
      {knife ? <path d={`M 250 ${-380 + st * 10} L 420 ${-430 + st * 10} L 260 ${-360 + st * 10} Z`} fill="#c8ced6" stroke={INK} strokeWidth={5} /> : <rect x={240} y={-400 + st * 10} width={120} height={30} rx={10} fill="#3a3e30" stroke={INK} strokeWidth={5} />}
      <path d="M -110 -400 L -180 -320 L -170 -250" stroke={INK} strokeWidth={42} fill="none" strokeLinejoin="round" />
      <path d="M -110 -400 L -180 -320 L -170 -250" stroke="#7a8068" strokeWidth={30} fill="none" strokeLinejoin="round" />
      <text x={0} y={-300} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={26} fill="#e8b923">AMP</text>
    </g>
  );
};

/** Topadora gigante con cuchilla. */
export const Bulldozer: React.FC<XY> = ({ x, y, s = 1, flip, t }) => (
  <g transform={T(x, y, s, flip)}>
    <rect x={-260} y={-60} width={440} height={80} rx={30} fill="#3a3a3a" stroke={INK} strokeWidth={6} />
    {[-220, -140, -60, 20, 100].map((d, i) => (
      <circle key={i} cx={d + ((t * 60) % 20)} cy={-20} r={22} fill="#5a5a5a" stroke={INK} strokeWidth={4} />
    ))}
    <path d="M -220 -60 L -200 -240 L 80 -240 L 140 -60 Z" fill="#e8b923" stroke={INK} strokeWidth={7} />
    <rect x={-170} y={-220} width={120} height={90} rx={6} fill="#9ad8ff" stroke={INK} strokeWidth={5} />
    <path d="M 180 -160 L 300 -180 L 330 20 L 200 30 Z" fill="#c8a020" stroke={INK} strokeWidth={7} />
    <line x1={140} y1={-120} x2={200} y2={-110} stroke={INK} strokeWidth={14} />
    <rect x={-100} y={-280} width={30} height={50} fill="#5a5a5a" stroke={INK} strokeWidth={4} />
    <circle cx={-85} cy={-300 - ((t * 40) % 60)} r={20} fill="#555" opacity={0.5} />
  </g>
);

/** Piedra de unobtanio que flota sobre un soporte magnético. */
export const Unobtanium: React.FC<XY & { k?: number }> = ({ x, y, s = 1, t, k = 1 }) => (
  <g transform={T(x, y, s)}>
    <rect x={-50} y={10} width={100} height={30} rx={8} fill="#2a2a34" stroke={INK} strokeWidth={4} />
    <g transform={`translate(0 ${-50 + Math.sin(t * 2) * 10})`} opacity={k}>
      <ellipse cx={0} cy={0} rx={60} ry={40} fill="#9ad8ff" opacity={0.3} />
      <path d="M -40 0 L -20 -30 L 20 -34 L 44 -4 L 24 28 L -24 26 Z" fill="#8a8e9a" stroke={INK} strokeWidth={4} />
      <path d="M -20 -30 L 0 0 L 44 -4 M 0 0 L -24 26" stroke="#c8d0dc" strokeWidth={3} />
    </g>
  </g>
);

/** Misil con humo. */
export const Missile: React.FC<{ x0: number; y0: number; x1: number; y1: number; t: number; t0: number; dur?: number }> = ({ x0, y0, x1, y1, t, t0, dur = 0.7 }) => {
  if (t < t0 || t > t0 + dur + 0.6) return null;
  const k = Math.min(1, (t - t0) / dur);
  const x = x0 + (x1 - x0) * k;
  const y = y0 + (y1 - y0) * k;
  const a = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  return (
    <g>
      <line x1={x0} y1={y0} x2={x} y2={y} stroke="#ddd" strokeWidth={10} opacity={0.5} strokeLinecap="round" />
      {k < 1 ? (
        <g transform={`translate(${x} ${y}) rotate(${a})`}>
          <rect x={-30} y={-7} width={60} height={14} rx={7} fill="#e8e8e8" stroke={INK} strokeWidth={3} />
          <circle cx={-34} cy={0} r={9} fill="#ffb02a" />
        </g>
      ) : (
        <Explosion x={x1} y={y1} s={1.2} k={1 - (t - t0 - dur) / 0.6} />
      )}
    </g>
  );
};

/** Explosión (k de 1 a 0 se apaga). */
export const Explosion: React.FC<{ x: number; y: number; s?: number; k?: number }> = ({ x, y, s = 1, k = 1 }) =>
  k <= 0 ? null : (
    <g transform={T(x, y, s * (1.6 - k * 0.6))} opacity={Math.min(1, k * 1.5)}>
      <circle r={110} fill="#ff6a1a" opacity={0.5} />
      <path d="M 0 -100 L 24 -36 L 92 -50 L 46 6 L 96 60 L 26 46 L 0 106 L -24 46 L -96 60 L -46 6 L -92 -50 L -24 -36 Z" fill="#ffb02a" stroke="#ff5a1a" strokeWidth={6} />
      <circle r={40} fill="#fff4c2" />
    </g>
  );

/** Flecha volando. */
export const Arrow: React.FC<{ x0: number; y0: number; x1: number; y1: number; t: number; t0: number; dur?: number }> = ({ x0, y0, x1, y1, t, t0, dur = 0.35 }) => {
  if (t < t0) return null;
  const k = Math.min(1, (t - t0) / dur);
  const x = x0 + (x1 - x0) * k;
  const y = y0 + (y1 - y0) * k;
  const a = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <line x1={-90} y1={0} x2={10} y2={0} stroke="#6a4a2a" strokeWidth={6} />
      <path d="M 10 -9 L 30 0 L 10 9 Z" fill="#c8ced6" stroke={INK} strokeWidth={2} />
      <path d="M -90 0 L -104 -12 M -90 0 L -104 12" stroke="#e2553a" strokeWidth={5} />
    </g>
  );
};

/** Conexión de la trenza: hilos de luz entre dos puntos. */
export const QueueLink: React.FC<{ x0: number; y0: number; x1: number; y1: number; t: number; k?: number }> = ({ x0, y0, x1, y1, t, k = 1 }) =>
  k <= 0 ? null : (
    <g opacity={k}>
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M ${x0} ${y0} Q ${(x0 + x1) / 2 + Math.sin(t * 6 + i) * 30} ${(y0 + y1) / 2 - 40 + i * 20} ${x1} ${y1}`} stroke={i % 2 ? "#bff4ff" : "#ffffff"} strokeWidth={4} fill="none" filter="url(#glow)" />
      ))}
      <circle cx={x0} cy={y0} r={12} fill="#ffffff" filter="url(#glow)" />
      <circle cx={x1} cy={y1} r={12} fill="#ffffff" filter="url(#glow)" />
    </g>
  );

/** Antorcha encendida. */
export const Torch: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <line x1={0} y1={30} x2={0} y2={-60} stroke="#5a3a1a" strokeWidth={10} strokeLinecap="round" />
    <ellipse cx={0} cy={-80} rx={40} ry={60} fill="#ff9a2a" opacity={0.35} />
    <path d={`M -16 -60 Q -20 ${-100 - 8 * Math.sin(t * 9)} 0 ${-120 - 10 * Math.sin(t * 7)} Q 20 -100 16 -60 Z`} fill="#ffb02a" stroke="#ff5a1a" strokeWidth={3} />
  </g>
);

// ---------------------------------------------------------------- criaturas

/** Thanator: pantera negra gigante de seis patas, con escamas rojas. */
export const Thanator: React.FC<XY & { roar?: number; run?: number }> = ({ x, y, s = 1, flip, t, roar = 0, run = 0 }) => {
  const st = Math.sin(t * 12) * run;
  return (
    <g transform={T(x, y, s, flip)}>
      {[-150, -40, 80].map((d, i) => (
        <path key={i} d={`M ${d} -120 L ${d + (i % 2 ? 1 : -1) * st * 40} -40 L ${d + 20 + (i % 2 ? -1 : 1) * st * 30} 0`} stroke={INK} strokeWidth={34} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <path d="M -230 -130 Q -240 -230 -100 -250 Q 60 -270 160 -220 Q 200 -170 170 -110 Q 0 -80 -200 -100 Z" fill="#141418" stroke={INK} strokeWidth={6} />
      <path d="M -230 -150 Q -330 -170 -380 -250" stroke="#141418" strokeWidth={26} fill="none" strokeLinecap="round" />
      {/* aletas rojas del lomo */}
      {[-140, -90, -40, 10, 60].map((d, i) => (
        <path key={`f${i}`} d={`M ${d} -248 L ${d + 18} -300 L ${d + 36} -250 Z`} fill="#c0392b" stroke={INK} strokeWidth={3} />
      ))}
      {/* cabeza */}
      <g transform={`translate(190 -190) rotate(${-roar * 15})`}>
        <path d="M -20 -60 Q 80 -80 140 -30 Q 120 20 50 30 Q -10 20 -20 -60 Z" fill="#1c1c22" stroke={INK} strokeWidth={6} />
        <path d={`M 20 10 Q 90 ${20 + roar * 60} 140 ${0 + roar * 30}`} stroke={INK} strokeWidth={6} fill={roar > 0.2 ? "#7a1a2a" : "none"} />
        {roar > 0.2 ? [30, 60, 90, 115].map((d, i) => <path key={i} d={`M ${d} ${12 + roar * 10} l 8 18 l 8 -18`} fill="#fff" />) : null}
        <circle cx={70} cy={-38} r={8} fill="#ffd23a" />
        <path d="M -20 -60 L -60 -110 L 10 -70 M 20 -70 L 0 -130 L 50 -76" stroke="#c0392b" strokeWidth={10} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};

/** Lobo de seis patas (víbora-lobo) con brillos verdes. */
export const ViperWolf: React.FC<XY & { glow?: number }> = ({ x, y, s = 1, flip, t, glow = 1 }) => (
  <g transform={T(x, y, s, flip)}>
    {[-60, -10, 40].map((d, i) => (
      <path key={i} d={`M ${d} -60 L ${d + Math.sin(t * 10 + i) * 14} 0`} stroke={INK} strokeWidth={14} strokeLinecap="round" />
    ))}
    <path d="M -100 -60 Q -90 -110 0 -110 Q 70 -110 90 -80 L 150 -90 Q 160 -60 110 -50 Q 40 -40 -90 -50 Z" fill="#26262e" stroke={INK} strokeWidth={5} />
    <path d="M -100 -70 Q -160 -90 -190 -60" stroke="#26262e" strokeWidth={12} fill="none" strokeLinecap="round" />
    {[-60, -20, 20, 60].map((d, i) => (
      <circle key={`g${i}`} cx={d} cy={-96} r={5} fill="#7affb8" opacity={glow} filter="url(#glow)" />
    ))}
    <circle cx={120} cy={-80} r={5} fill="#7affb8" filter="url(#glow)" />
    <path d="M 120 -64 l 6 10 l 6 -10 l 6 10 l 6 -10" stroke="#fff" strokeWidth={2} fill="none" />
  </g>
);

/** Bestia cabeza de martillo (titanotero). */
export const Hammerhead: React.FC<XY & { charge?: number }> = ({ x, y, s = 1, flip, t, charge = 0 }) => {
  const st = Math.sin(t * 8) * charge;
  return (
    <g transform={T(x, y, s, flip)}>
      {[-160, -40, 80].map((d, i) => (
        <path key={i} d={`M ${d} -100 L ${d + st * 20} 0`} stroke={INK} strokeWidth={50} strokeLinecap="round" />
      ))}
      <path d="M -230 -100 Q -240 -260 -60 -280 Q 120 -290 170 -200 Q 180 -120 120 -90 L -200 -80 Z" fill="#6a5a8a" stroke={INK} strokeWidth={7} />
      <path d="M -150 -260 Q -40 -230 60 -270" stroke="#4a3a6a" strokeWidth={14} fill="none" />
      {/* cabeza de martillo con cresta */}
      <g transform={`translate(190 -170) rotate(${-charge * 10})`}>
        <path d="M -40 -40 L 40 -120 Q 90 -140 110 -90 L 60 0 Q 80 60 40 80 L -40 40 Z" fill="#7a6a9a" stroke={INK} strokeWidth={6} />
        <path d="M 40 -120 Q 140 -170 160 -60 Q 160 40 100 100" stroke={INK} strokeWidth={10} fill="#d86a8a" opacity={0.9} />
        <circle cx={30} cy={-20} r={7} fill="#111" />
      </g>
    </g>
  );
};

/** Caballo de seis patas (direhorse) con antenas. */
export const Direhorse: React.FC<XY & { run?: number }> = ({ x, y, s = 1, flip, t, run = 0 }) => {
  const st = Math.sin(t * 11) * run;
  return (
    <g transform={T(x, y, s, flip)}>
      {[-120, -30, 70].map((d, i) => (
        <path key={i} d={`M ${d} -120 L ${d + (i % 2 ? st : -st) * 30} -50 L ${d + (i % 2 ? -st : st) * 20} 0`} stroke={INK} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <path d="M -170 -120 Q -170 -190 -40 -195 Q 80 -200 130 -150 Q 140 -110 100 -100 L -150 -100 Z" fill="#3a5a8a" stroke={INK} strokeWidth={6} />
      <path d="M -170 -140 Q -230 -150 -250 -110" stroke="#3a5a8a" strokeWidth={12} fill="none" />
      <path d="M 100 -160 Q 160 -260 190 -300" stroke={INK} strokeWidth={36} fill="none" strokeLinecap="round" />
      <path d="M 100 -160 Q 160 -260 190 -300" stroke="#3a5a8a" strokeWidth={26} fill="none" strokeLinecap="round" />
      <path d="M 170 -310 Q 230 -320 260 -280 Q 240 -260 180 -270 Z" fill="#4a6a9a" stroke={INK} strokeWidth={5} />
      <path d="M 180 -310 Q 160 -360 120 -380 M 190 -312 Q 190 -370 170 -400" stroke="#2a3a6a" strokeWidth={5} fill="none" />
      {[-120, -60, 0, 60].map((d, i) => (
        <path key={`s${i}`} d={`M ${d} -190 q 10 20 0 40`} stroke="#5a8aca" strokeWidth={5} fill="none" />
      ))}
    </g>
  );
};

/** Ikran (dragón volador de los na'vi). flap 0..1 controla el aleteo. */
export const Ikran: React.FC<XY & { col?: string; col2?: string; flap?: number; perch?: boolean; r?: number }> = ({ x, y, s = 1, flip, t, col = "#3a6ad8", col2 = "#f2c230", flap = 1, perch = false, r = 0 }) => {
  const w = perch ? -0.6 : Math.sin(t * 9) * flap;
  return (
    <g transform={T(x, y, s, flip, r)}>
      {/* ala lejana */}
      <path d={`M -20 -10 Q -60 ${-140 - w * 120} -240 ${-180 - w * 160} Q -180 ${-60 - w * 60} -80 30 Z`} fill={col} stroke={INK} strokeWidth={5} opacity={0.85} />
      {/* cuerpo */}
      <path d="M -140 10 Q -160 -30 -60 -40 Q 60 -50 120 -20 Q 130 20 60 30 Q -60 40 -140 10 Z" fill={col} stroke={INK} strokeWidth={6} />
      <path d="M -140 10 Q -220 20 -280 60" stroke={col} strokeWidth={14} fill="none" strokeLinecap="round" />
      {/* rayas */}
      {[-80, -30, 20, 70].map((d, i) => (
        <path key={i} d={`M ${d} -40 q 8 30 0 64`} stroke={col2} strokeWidth={8} fill="none" />
      ))}
      {/* cabeza con cresta */}
      <g transform="translate(130 -40)">
        <path d="M -20 0 Q 30 -40 110 -10 Q 60 10 20 20 Z" fill={col} stroke={INK} strokeWidth={5} />
        <path d="M 0 -6 Q 40 -70 90 -60 Q 60 -20 30 -10 Z" fill={col2} stroke={INK} strokeWidth={4} />
        <circle cx={40} cy={-4} r={5} fill="#ffd23a" stroke={INK} strokeWidth={2} />
        <path d="M 40 6 L 100 -6" stroke={INK} strokeWidth={3} />
      </g>
      {/* ala cercana */}
      <path d={`M 0 -10 Q 40 ${-150 - w * 120} 230 ${-200 - w * 160} Q 160 ${-70 - w * 60} 60 30 Z`} fill={col} stroke={INK} strokeWidth={6} />
      <path d={`M 20 -20 Q 80 ${-130 - w * 100} 210 ${-190 - w * 150}`} stroke={col2} strokeWidth={8} fill="none" />
      {perch ? (
        <g>
          <path d="M -40 30 L -50 90 M 40 30 L 50 90" stroke={INK} strokeWidth={10} strokeLinecap="round" />
        </g>
      ) : null}
    </g>
  );
};

/** Toruk: el dragón rojo gigante, rey de los cielos. */
export const Toruk: React.FC<XY & { flap?: number; r?: number }> = ({ x, y, s = 1, flip, t, flap = 1, r = 0 }) => {
  const w = Math.sin(t * 5) * flap;
  return (
    <g transform={T(x, y, s, flip, r)}>
      <path d={`M -40 -20 Q -120 ${-260 - w * 160} -460 ${-300 - w * 200} Q -340 ${-80 - w * 80} -160 60 Z`} fill="#b8241a" stroke={INK} strokeWidth={7} opacity={0.9} />
      <path d="M -260 20 Q -300 -60 -100 -80 Q 120 -100 240 -40 Q 260 30 140 50 Q -100 80 -260 20 Z" fill="#d8341f" stroke={INK} strokeWidth={8} />
      <path d="M -260 20 Q -400 40 -520 120" stroke="#d8341f" strokeWidth={24} fill="none" strokeLinecap="round" />
      {[-180, -110, -40, 30, 100, 170].map((d, i) => (
        <path key={i} d={`M ${d} -80 q 16 50 0 120`} stroke="#ffcf3a" strokeWidth={12} fill="none" />
      ))}
      <g transform="translate(240 -60)">
        <path d="M -30 0 Q 60 -80 220 -30 Q 120 20 40 40 Z" fill="#d8341f" stroke={INK} strokeWidth={7} />
        <path d="M 0 -20 Q 60 -140 180 -120 Q 120 -50 60 -30 Z" fill="#ffcf3a" stroke={INK} strokeWidth={6} />
        <path d="M 30 -30 Q 50 -100 120 -150" stroke="#1a3a8a" strokeWidth={10} fill="none" />
        <circle cx={90} cy={-14} r={9} fill="#ffd23a" stroke={INK} strokeWidth={3} />
        <path d="M 80 10 L 210 -20" stroke={INK} strokeWidth={4} />
      </g>
      <path d={`M 0 -20 Q 80 ${-300 - w * 160} 480 ${-340 - w * 200} Q 340 ${-100 - w * 80} 120 60 Z`} fill="#d8341f" stroke={INK} strokeWidth={8} />
      <path d={`M 40 -40 Q 160 ${-260 - w * 140} 440 ${-320 - w * 190}`} stroke="#ffcf3a" strokeWidth={12} fill="none" />
      <path d={`M 80 -20 Q 200 ${-200 - w * 100} 380 ${-250 - w * 160}`} stroke="#1a3a8a" strokeWidth={8} fill="none" />
    </g>
  );
};

/** Planta que se esconde cuando la tocás (espiral naranja). */
export const ShyPlant: React.FC<XY & { k?: number }> = ({ x, y, s = 1, t, k = 0 }) => (
  <g transform={T(x, y, s)}>
    <line x1={0} y1={0} x2={0} y2={-120 * (1 - k * 0.9)} stroke="#2f6a3a" strokeWidth={12} />
    <g transform={`translate(0 ${-120 * (1 - k * 0.9)}) scale(${1 - k * 0.85})`}>
      <path d={`M 0 0 Q -60 -40 -40 -100 Q 0 -140 40 -100 Q 60 -40 0 0 Z`} fill="#ff8a2a" stroke={INK} strokeWidth={5} />
      <path d="M 0 -20 Q -30 -60 0 -100 Q 30 -60 0 -20" stroke="#ffcf3a" strokeWidth={5} fill="none" />
    </g>
    {Math.sin(t) > 2 ? null : null}
  </g>
);
