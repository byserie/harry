import React from "react";
import { AbsoluteFill, random } from "remotion";
import { INK } from "../characters/cast";
import { H, Svg } from "../scenes/bg1";
import { FONT } from "../lib/font";

/** Lugares de "Los 200 dólares – Temporada 2". Se dibujan de x=-460 a 1540 (16:9). */
const L = -460;
const WW = 2000;
const R = 1540;
const rnd = (k: string | number) => random(String(k));

const Defs: React.FC = () => (
  <defs>
    <filter id="g3" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="12" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="b3">
      <feGaussianBlur stdDeviation="22" />
    </filter>
    <radialGradient id="bulb3" cx="0.5" cy="0" r="1">
      <stop offset="0" stopColor="#ffe9a8" stopOpacity="0.55" />
      <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
    </radialGradient>
  </defs>
);

/** Nissan Versa gris (de costado), con lona opcional y cajuela que se abre. */
export const Versa: React.FC<{ x: number; y: number; tarp?: number; trunk?: number; wet?: number; t?: number; glow?: number }> = ({ x, y, tarp = 0, trunk = 0, wet = 0, t = 0, glow = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={8} rx={500} ry={34} fill="#000" opacity={0.35} />
    <g stroke={INK} strokeWidth={7} strokeLinejoin="round">
      {/* cuerpo */}
      <path d="M -470 -40 L -470 -170 Q -460 -200 -420 -205 L -260 -215 L -150 -330 Q -130 -350 -90 -350 L 170 -350 Q 210 -350 240 -320 L 330 -220 L 430 -205 Q 470 -195 475 -160 L 475 -40 Z" fill="#9aa2ac" />
      <path d="M -130 -320 L -80 -330 L 60 -330 L 60 -225 L -230 -222 Z" fill="#2a3a4a" />
      <path d="M 85 -330 L 170 -330 Q 195 -328 215 -305 L 290 -225 L 85 -225 Z" fill="#2a3a4a" />
      <line x1={70} y1={-220} x2={70} y2={-60} />
      <rect x={-20} y={-180} width={50} height={12} rx={6} fill="#6a727c" />
      <rect x={150} y={-180} width={50} height={12} rx={6} fill="#6a727c" />
      <rect x={430} y={-170} width={40} height={40} rx={8} fill="#e84a3a" />
      <rect x={-468} y={-170} width={36} height={36} rx={8} fill="#fff6c8" />
      {/* cajuela (parte trasera, derecha) */}
      <g transform={`rotate(${-trunk * 55} 330 -220)`}>
        <path d="M 330 -220 L 430 -205 Q 470 -195 475 -160 L 330 -160 Z" fill="#8a929c" />
      </g>
    </g>
    {/* ruedas */}
    {[-300, 300].map((wx) => (
      <g key={wx} stroke={INK} strokeWidth={7}>
        <circle cx={wx} cy={-40} r={72} fill="#1e1e24" />
        <circle cx={wx} cy={-40} r={34} fill="#9aa2ac" />
        {wet > 0 ? <ellipse cx={wx} cy={4} rx={70} ry={10} fill="#5a8ab8" opacity={0.7 * wet} stroke="none" /> : null}
      </g>
    ))}
    {wet > 0
      ? [0, 1, 2, 3].map((i) => {
          const ph = (t * 1.3 + i * 0.27) % 1;
          return <circle key={i} cx={-330 + i * 200} cy={-10 + ph * 30} r={7} fill="#7ab0e8" opacity={wet * (1 - ph)} />;
        })
      : null}
    {/* brillo de celulares en la cajuela */}
    {glow > 0 ? <ellipse cx={400} cy={-220} rx={140} ry={70} fill="#9fe8ff" opacity={0.5 * glow} filter="url(#b3)" /> : null}
    {/* lona azul */}
    {tarp > 0 ? (
      <g opacity={tarp} transform={`translate(0 ${(1 - tarp) * -60})`}>
        <path d="M -500 -20 Q -510 -200 -440 -220 Q -300 -240 -180 -360 Q -100 -390 100 -385 Q 240 -380 300 -280 Q 380 -230 470 -215 Q 520 -190 510 -20 Q 400 0 300 -30 Q 150 10 0 -25 Q -150 10 -300 -25 Q -420 5 -500 -20 Z" fill="#2f6fb0" stroke={INK} strokeWidth={7} />
        <path d="M -380 -60 Q -300 -200 -200 -230 M -60 -40 Q 0 -250 60 -360 M 200 -50 Q 240 -200 300 -260" stroke="#24578c" strokeWidth={12} fill="none" />
      </g>
    ) : null}
  </g>
);

/** La cochera de tu casa: portón, foco, repisa, clavo con llave. */
export const Garage: React.FC<{
  t: number;
  night?: boolean;
  door?: number; // 0 cerrado … 1 abierto
  car?: boolean;
  tarp?: number;
  trunk?: number;
  wet?: number;
  glow?: number;
  keyOn?: boolean;
  police?: number;
  boots?: number; // botas por la rendija
  torch?: number;
  tarpFloor?: boolean;
}> = ({ t, night = true, door = 0, car = false, tarp = 1, trunk = 0, wet = 0, glow = 0, keyOn = true, police = 0, boots = 0, torch = 0, tarpFloor = false }) => {
  const wall = night ? "#3a4258" : "#c8c0b0";
  const brick = night ? "#323a4e" : "#b8ae9c";
  const flick = night ? 0.85 + 0.15 * Math.sin(t * 23) * Math.sin(t * 7) : 1;
  const doorH = 820 * (1 - door);
  return (
    <Svg>
      <Defs />
      <rect x={L} y={0} width={WW} height={H} fill={wall} />
      {Array.from({ length: 26 }).map((_, r) =>
        Array.from({ length: 16 }).map((__, c) => (
          <rect key={`${r}-${c}`} x={L + c * 130 + (r % 2) * 65} y={r * 52} width={124} height={46} rx={4} fill={brick} opacity={0.55} />
        )),
      )}
      {/* foco colgando */}
      <line x1={420} y1={0} x2={420} y2={250} stroke={INK} strokeWidth={5} />
      <circle cx={420} cy={270} r={26} fill="#fff3c0" stroke={INK} strokeWidth={5} filter="url(#g3)" opacity={flick} />
      <path d={`M 420 270 L -160 1340 L 1000 1340 Z`} fill="url(#bulb3)" opacity={flick * (night ? 1 : 0.4)} />
      {/* repisa con cajas y caja de tenis */}
      <g stroke={INK} strokeWidth={5}>
        <rect x={-380} y={560} width={420} height={18} fill="#7a5232" />
        <rect x={-360} y={470} width={80} height={90} fill="#c86a2a" />
        <rect x={-270} y={500} width={60} height={60} fill="#e8e8e8" />
        <rect x={-190} y={460} width={130} height={100} fill="#c8a06a" />
        <rect x={-40} y={505} width={70} height={55} fill="#e8803a" />
      </g>
      {/* clavo con llave */}
      <circle cx={140} cy={600} r={7} fill="#888" stroke={INK} strokeWidth={3} />
      {keyOn ? (
        <g transform={`rotate(${Math.sin(t * 2) * 6} 140 600)`} stroke={INK} strokeWidth={4}>
          <line x1={140} y1={600} x2={140} y2={640} />
          <circle cx={140} cy={655} r={16} fill="#e8c84a" />
          <rect x={134} y={668} width={12} height={46} fill="#c8c8c8" />
        </g>
      ) : null}
      {/* portón (derecha) */}
      <g stroke={INK} strokeWidth={7}>
        <rect x={1020} y={470} width={500} height={830} fill={night ? "#0c1222" : "#8ab8e0"} />
        {night ? (
          <g>
            {Array.from({ length: 14 }).map((_, i) => (
              <circle key={i} cx={1040 + rnd(`st${i}`) * 460} cy={500 + rnd(`sy${i}`) * 300} r={2 + rnd(`sr${i}`) * 3} fill="#fff" opacity={0.5 + 0.5 * Math.sin(t * 2 + i)} stroke="none" />
            ))}
            <rect x={1020} y={1040} width={500} height={260} fill="#1a2232" stroke="none" />
          </g>
        ) : (
          <rect x={1020} y={1040} width={500} height={260} fill="#9a9a90" stroke="none" />
        )}
        <g>
          <rect x={1020} y={470} width={500} height={doorH} fill="#6a7486" />
          {Array.from({ length: Math.ceil(doorH / 60) }).map((_, i) => (
            <line key={i} x1={1020} y1={470 + doorH - i * 60} x2={1520} y2={470 + doorH - i * 60} strokeWidth={4} />
          ))}
        </g>
        <rect x={1000} y={440} width={540} height={36} fill="#4a5262" />
      </g>
      {/* luz de patrulla por la rendija */}
      {police > 0 ? (
        <g opacity={police}>
          <rect x={1020} y={1260} width={500} height={40} fill={Math.floor(t * 4) % 2 ? "#ff3a3a" : "#3a6aff"} filter="url(#g3)" />
          <path d={`M 1020 1290 L 300 1500 L 300 1560 L 1020 1300 Z`} fill={Math.floor(t * 4) % 2 ? "#ff3a3a" : "#3a6aff"} opacity={0.35} />
        </g>
      ) : null}
      {torch > 0 ? <ellipse cx={700 + Math.sin(t * 1.7) * 250} cy={1420} rx={180} ry={40} fill="#fff8d0" opacity={0.5 * torch} filter="url(#b3)" /> : null}
      {/* botas del otro lado */}
      {boots > 0 && door < 0.9 ? (
        <g opacity={boots} stroke={INK} strokeWidth={4}>
          <path d="M 1200 1298 l 0 -20 l 50 0 l 0 10 l 30 10 Z" fill="#a8743a" />
          <path d="M 1300 1298 l 0 -20 l 50 0 l 0 10 l 30 10 Z" fill="#a8743a" />
        </g>
      ) : null}
      {/* piso de cemento con manchas de aceite */}
      <rect x={L} y={1290} width={WW} height={H - 1290} fill={night ? "#4a4e5a" : "#9a968c"} />
      <ellipse cx={350} cy={1420} rx={200} ry={30} fill="#000" opacity={0.25} />
      <ellipse cx={620} cy={1450} rx={120} ry={20} fill="#000" opacity={0.2} />
      {car ? <Versa x={330} y={1330} tarp={tarp} trunk={trunk} wet={wet} t={t} glow={glow} /> : null}
      {tarpFloor ? <path d="M -300 1330 q 60 -70 160 -60 q 90 -20 140 30 q 40 30 0 40 q -150 20 -300 -10 z" fill="#2f6fb0" stroke={INK} strokeWidth={6} /> : null}
      {night ? <rect x={L} y={0} width={WW} height={H} fill="#0a0a2a" opacity={0.18} /> : null}
    </Svg>
  );
};

/** Oficina de la fiscalía: persianas, archivero, escritorio con papeles. */
export const Fiscalia: React.FC<{ t: number; paper?: number }> = ({ t, paper = 0 }) => (
  <Svg>
    <Defs />
    <rect x={L} y={0} width={WW} height={H} fill="#b8c4b0" />
    <rect x={L} y={900} width={WW} height={400} fill="#a0ac98" />
    <line x1={L} y1={900} x2={R} y2={900} stroke={INK} strokeWidth={5} />
    {/* ventana con persianas */}
    <g stroke={INK} strokeWidth={6}>
      <rect x={-300} y={360} width={520} height={420} fill="#d8ecf8" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={-300} y={360 + i * 35} width={520} height={20} fill="#e8e4d8" strokeWidth={2} />
      ))}
    </g>
    {Array.from({ length: 6 }).map((_, i) => (
      <path key={i} d={`M ${-260 + i * 90} 800 L ${-120 + i * 140} 1300 L ${-80 + i * 140} 1300 L ${-230 + i * 90} 800 Z`} fill="#fff" opacity={0.08} />
    ))}
    {/* reloj */}
    <g stroke={INK} strokeWidth={5}>
      <circle cx={560} cy={420} r={60} fill="#f8f8f0" />
      <line x1={560} y1={420} x2={560 + 34 * Math.sin(t * 0.3)} y2={420 - 34 * Math.cos(t * 0.3)} />
      <line x1={560} y1={420} x2={590} y2={430} />
    </g>
    {/* archivero */}
    <g stroke={INK} strokeWidth={6}>
      <rect x={1180} y={620} width={260} height={680} fill="#7a8a96" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={1200} y={650 + i * 215} width={220} height={190} fill="#8a9aa6" />
          <rect x={1280} y={730 + i * 215} width={60} height={16} rx={6} fill="#d8d8d8" />
        </g>
      ))}
      <rect x={1200} y={560} width={120} height={60} fill="#e8d8a8" />
      <rect x={1240} y={540} width={140} height={20} fill="#f4f4f0" />
    </g>
    {/* tablero de corcho */}
    <g stroke={INK} strokeWidth={5}>
      <rect x={700} y={330} width={360} height={260} fill="#c8965a" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={720 + (i % 2) * 170} y={350 + Math.floor(i / 2) * 120} width={140} height={100} fill="#f8f4e8" strokeWidth={3} transform={`rotate(${(rnd(`cp${i}`) - 0.5) * 10} ${790 + (i % 2) * 170} ${400 + Math.floor(i / 2) * 120})`} />
      ))}
    </g>
    <rect x={L} y={1290} width={WW} height={H - 1290} fill="#8a8e84" />
    {Array.from({ length: 14 }).map((_, i) => (
      <line key={i} x1={L + i * 160} y1={1290} x2={L + i * 160} y2={H} stroke="#7a7e74" strokeWidth={4} />
    ))}
    {/* escritorio */}
    <g stroke={INK} strokeWidth={7}>
      <rect x={180} y={1160} width={760} height={50} fill="#7a5232" />
      <rect x={210} y={1210} width={700} height={160} fill="#6a4628" />
      <rect x={260} y={1110} width={150} height={50} fill="#f4f4f0" />
      <rect x={280} y={1080} width={130} height={30} fill="#f8f8f4" />
      <rect x={720} y={1060} width={160} height={100} fill="#3a3a44" />
      <rect x={730} y={1070} width={140} height={70} fill="#7ac0e8" />
      {paper > 0 ? <rect x={470} y={1135} width={170} height={26} fill="#ffffff" opacity={paper} transform="rotate(-4 555 1148)" /> : null}
    </g>
  </Svg>
);

/** Bodega abandonada en la salida a Tecate: lámina, una lámpara, silla de plástico. */
export const Bodega: React.FC<{ t: number; chair?: boolean; headlights?: number }> = ({ t, chair = true, headlights = 0 }) => {
  const sw = Math.sin(t * 1.4) * 40;
  return (
    <Svg>
      <Defs />
      <rect x={L} y={0} width={WW} height={H} fill="#1c1e26" />
      {Array.from({ length: 34 }).map((_, i) => (
        <rect key={i} x={L + i * 60} y={0} width={30} height={1300} fill="#262a34" />
      ))}
      {/* cortina metálica medio abierta */}
      <g stroke={INK} strokeWidth={6}>
        <rect x={1060} y={500} width={440} height={800} fill="#0a0c16" />
        <rect x={1060} y={500} width={440} height={420} fill="#4a4e58" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={1060} y1={540 + i * 50} x2={1500} y2={540 + i * 50} strokeWidth={3} />
        ))}
      </g>
      {headlights > 0 ? (
        <g opacity={headlights}>
          <circle cx={1180} cy={1150} r={30} fill="#fff8d0" filter="url(#g3)" />
          <circle cx={1380} cy={1150} r={30} fill="#fff8d0" filter="url(#g3)" />
          <path d="M 1180 1150 L 300 1500 L 300 1650 Z M 1380 1150 L 400 1650 L 600 1700 Z" fill="#fff8d0" opacity={0.18} />
        </g>
      ) : null}
      {/* cajas apiladas */}
      <g stroke={INK} strokeWidth={5}>
        <rect x={-420} y={1000} width={240} height={300} fill="#8a6a3a" />
        <rect x={-380} y={800} width={200} height={200} fill="#9a7a4a" />
        <rect x={-170} y={1080} width={180} height={220} fill="#7a5a2a" />
      </g>
      {/* lámpara colgante que se mece */}
      <line x1={480} y1={0} x2={480 + sw} y2={360} stroke={INK} strokeWidth={5} />
      <path d={`M ${430 + sw} 360 L ${530 + sw} 360 L ${560 + sw} 410 L ${400 + sw} 410 Z`} fill="#3a3a44" stroke={INK} strokeWidth={5} />
      <circle cx={480 + sw} cy={415} r={16} fill="#fff3c0" filter="url(#g3)" />
      <path d={`M ${400 + sw} 410 L ${-80 + sw * 1.6} 1360 L ${1040 + sw * 1.6} 1360 L ${560 + sw} 410 Z`} fill="url(#bulb3)" />
      <rect x={L} y={1290} width={WW} height={H - 1290} fill="#2a2c34" />
      <ellipse cx={480 + sw * 1.6} cy={1400} rx={520} ry={70} fill="#ffe9a8" opacity={0.12} />
      {/* silla de plástico */}
      {chair ? (
        <g stroke={INK} strokeWidth={6} fill="#e8e8e0">
          <rect x={430} y={1150} width={220} height={30} rx={10} />
          <rect x={600} y={960} width={40} height={200} rx={10} />
          <rect x={440} y={1180} width={20} height={170} />
          <rect x={620} y={1180} width={20} height={170} />
        </g>
      ) : null}
    </Svg>
  );
};

/** Calle de la colonia (de día o de noche): tu casa y la del flaco enfrente. */
export const Colonia: React.FC<{ t: number; night?: boolean; note?: boolean }> = ({ t, night = false, note = false }) => (
  <Svg>
    <Defs />
    <rect x={L} y={0} width={WW} height={H} fill={night ? "#0e1428" : "#8ac8f0"} />
    {!night ? <circle cx={1300} cy={240} r={90} fill="#ffe68a" filter="url(#g3)" /> : <circle cx={1300} cy={240} r={60} fill="#f0f0e0" filter="url(#g3)" />}
    {/* cerros de Tijuana */}
    <path d={`M ${L} 900 Q -200 640 100 760 Q 400 600 700 740 Q 1000 620 1300 720 Q 1450 660 ${R} 700 L ${R} 1000 L ${L} 1000 Z`} fill={night ? "#1e2238" : "#d8b88a"} />
    {Array.from({ length: 40 }).map((_, i) => (
      <rect key={i} x={L + rnd(`hx${i}`) * WW} y={720 + rnd(`hy${i}`) * 200} width={30} height={22} fill={night ? (rnd(`hl${i}`) > 0.5 ? "#ffd86a" : "#2a2e48") : ["#f0a0a0", "#a0d0f0", "#f0e0a0", "#c0f0b0"][i % 4]} />
    ))}
    {/* casa del flaco */}
    <g stroke={INK} strokeWidth={6}>
      <rect x={-380} y={820} width={760} height={480} fill={night ? "#3a4a5a" : "#f0b8a0"} />
      <rect x={-300} y={900} width={180} height={150} fill={night ? "#ffd86a" : "#bfe0f0"} />
      <rect x={20} y={1000} width={150} height={300} fill="#7a4a2a" />
      {note ? <rect x={55} y={1060} width={70} height={60} fill="#fffbe0" transform={`rotate(${Math.sin(t * 3) * 4} 90 1060)`} /> : null}
      <rect x={200} y={940} width={150} height={360} fill="#8a8e94" />
    </g>
    {/* reja y tu casa (derecha) */}
    <g stroke={INK} strokeWidth={6}>
      <rect x={760} y={760} width={780} height={540} fill={night ? "#3a3e5a" : "#f4d48a"} />
      <rect x={1020} y={860} width={480} height={440} fill="#6a7486" />
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={1020} y1={900 + i * 60} x2={1500} y2={900 + i * 60} strokeWidth={4} />
      ))}
      <rect x={820} y={1000} width={150} height={300} fill="#5a3a22" />
    </g>
    {/* banqueta y calle */}
    <rect x={L} y={1290} width={WW} height={90} fill={night ? "#3a3e48" : "#c8c4b8"} />
    <rect x={L} y={1380} width={WW} height={H - 1380} fill={night ? "#22242c" : "#5a5a62"} />
    {Array.from({ length: 8 }).map((_, i) => (
      <rect key={i} x={L + 40 + i * 260} y={1640} width={140} height={16} fill="#e8e0a0" opacity={0.7} />
    ))}
    {/* poste con cables */}
    <rect x={640} y={500} width={24} height={880} fill="#6a5a4a" stroke={INK} strokeWidth={4} />
    <path d={`M ${L} 560 Q 200 640 652 520 Q 1100 640 ${R} 560`} stroke={INK} strokeWidth={4} fill="none" />
    {night ? <circle cx={652} cy={520} r={20} fill="#ffe9a8" filter="url(#g3)" /> : null}
  </Svg>
);

/** Mapa del noroeste de México con puntitos rojos de cocheras (pantalla completa). */
export const MapaCocheras: React.FC<{ t: number; k: number; dots: number; zoom?: number; label?: string; hl?: string; newDot?: number }> = ({ t, k, dots, zoom = 1, label, hl, newDot = 0 }) => {
  if (k <= 0) return null;
  const cities: Record<string, [number, number]> = { Tijuana: [300, 260], Mexicali: [620, 250], Ensenada: [360, 520], Hermosillo: [1240, 700] };
  return (
    <AbsoluteFill style={{ opacity: k, pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,8,20,0.75)" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 1500, height: 900, marginLeft: -750, marginTop: -450, borderRadius: 40, overflow: "hidden", border: "10px solid #2a2a34", background: "#0e2a44", scale: String(0.85 + 0.15 * k) }}>
        <svg width={1500} height={900} viewBox="0 0 1500 900">
          <g transform={`translate(${300 * (1 - zoom)} ${260 * (1 - zoom)}) scale(${zoom})`}>
            <path d="M 260 0 L 1500 0 L 1500 900 L 1100 900 Q 1000 760 900 700 Q 700 600 560 760 Q 480 850 520 900 L 440 900 Q 380 700 320 560 Q 260 420 230 300 Q 220 150 260 0 Z" fill="#2a3a2e" stroke="#4a6a4e" strokeWidth={4} />
            {Array.from({ length: 30 }).map((_, i) => (
              <path key={i} d={`M ${260 + rnd(`r${i}`) * 1200} ${rnd(`ry${i}`) * 900} l ${(rnd(`rd${i}`) - 0.5) * 400} ${(rnd(`re${i}`) - 0.5) * 300}`} stroke="#3e5a42" strokeWidth={3} />
            ))}
            {Array.from({ length: dots }).map((_, i) => {
              const c = Object.values(cities)[i % 4];
              const spread = 40 + (i % 4 === 0 ? 30 : 60) * rnd(`s${i}`);
              const a = rnd(`a${i}`) * Math.PI * 2;
              const px = c[0] + Math.cos(a) * spread * (1 + rnd(`m${i}`) * 1.5);
              const py = c[1] + Math.sin(a) * spread * (1 + rnd(`n${i}`));
              const pulse = 0.7 + 0.3 * Math.sin(t * 4 + i);
              return <circle key={i} cx={px} cy={py} r={6 * pulse} fill="#ff2a3a" opacity={0.9} />;
            })}
            {newDot > 0 ? (
              <g>
                <circle cx={300} cy={260} r={14 + 30 * (1 - newDot)} fill="none" stroke="#ff2a3a" strokeWidth={5} opacity={newDot} />
                <circle cx={300} cy={260} r={12} fill="#ff2a3a" opacity={newDot} />
              </g>
            ) : null}
            {Object.entries(cities).map(([n, [x, y]]) => (
              <text key={n} x={x} y={y - 70} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={34 / zoom} fill={hl === n ? "#ffe14d" : "#e8f0ff"} stroke="#0a0a14" strokeWidth={6 / zoom} paintOrder="stroke">
                {n}
              </text>
            ))}
          </g>
        </svg>
        {label ? (
          <div style={{ position: "absolute", left: 30, top: 24, fontFamily: FONT, fontWeight: 700, fontSize: 40, color: "#fff", background: "rgba(255,42,58,0.9)", borderRadius: 18, padding: "6px 22px" }}>{label}</div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
