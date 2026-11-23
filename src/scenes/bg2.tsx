import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";
import { Floor, Grad, H, Stars, Svg, W } from "./bg1";

const Label: React.FC<{ x: number; y: number; text: string; fill?: string; size?: number; color?: string }> = ({ x, y, text, fill = "#ffe66d", size = 40, color = INK }) => {
  const w = text.length * size * 0.6 + 40;
  return (
    <g>
      <rect x={x - w / 2} y={y - size} width={w} height={size * 1.5} rx={12} fill={fill} stroke={INK} strokeWidth={5} />
      <text x={x} y={y + size * 0.18} textAnchor="middle" fontSize={size} fontWeight={700} fontFamily="Fredoka" fill={color}>
        {text}
      </text>
    </g>
  );
};
export { Label };

/* ---------------- PARTE 2 ---------------- */

export const Diagon: React.FC<{ t: number }> = ({ t }) => {
  const shops = [
    { x: -40, w: 300, h: 760, c: "#e8574a", s: "CALDEROS" },
    { x: 250, w: 280, h: 860, c: "#4aa3e8", s: "LECHUZAS" },
    { x: 520, w: 300, h: 720, c: "#f2b33d", s: "ESCOBAS" },
    { x: 810, w: 320, h: 820, c: "#8e5ad6", s: "LIBROS" },
  ];
  return (
    <Svg>
      <defs>
        <Grad id="dg" stops={["#7cc8ff", "#d9f1ff"]} />
      </defs>
      <rect width={W} height={H} fill="url(#dg)" />
      {shops.map((s, i) => (
        <g key={i} stroke={INK} strokeWidth={6} strokeLinejoin="round" transform={`rotate(${(i % 2 ? 1.5 : -1.5)} ${s.x + s.w / 2} 1260)`}>
          <rect x={s.x} y={1260 - s.h} width={s.w} height={s.h} fill={s.c} />
          <path d={`M ${s.x - 20} ${1260 - s.h} L ${s.x + s.w / 2} ${1260 - s.h - 140} L ${s.x + s.w + 20} ${1260 - s.h} Z`} fill="#4a3a5e" />
          <rect x={s.x + 30} y={1260 - s.h + 80} width={s.w - 60} height={120} fill="#ffeeb0" />
          <rect x={s.x + 40} y={1000} width={s.w - 80} height={180} fill="#9fe0ff" />
          <rect x={s.x + s.w / 2 - 40} y={1110} width={80} height={150} fill="#5a3a22" />
          {Array.from({ length: 5 }).map((_, k) => (
            <path key={k} d={`M ${s.x + k * (s.w / 5)} 960 l ${s.w / 10} 40 l ${s.w / 10} -40 Z`} fill={k % 2 ? "#fff" : s.c} strokeWidth={3} />
          ))}
        </g>
      ))}
      {shops.map((s, i) => (
        <Label key={i} x={s.x + s.w / 2} y={1260 - s.h + 160} text={s.s} size={34} />
      ))}
      {/* banderines */}
      <path d="M 0 360 Q 540 470 1080 360" stroke={INK} strokeWidth={4} fill="none" />
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 40 + i * 90;
        const y = 380 + Math.sin((x / 1080) * Math.PI) * 90;
        return <path key={i} d={`M ${x} ${y} l 40 0 l -20 50 z`} fill={["#e8574a", "#f2b33d", "#4aa3e8", "#2fae4f"][i % 4]} stroke={INK} strokeWidth={3} transform={`rotate(${Math.sin(t * 3 + i) * 8} ${x + 20} ${y})`} />;
      })}
      <Floor y={1260} c1="#a8a3b8" c2="#a8a3b8" lines="rgba(60,50,80,0.25)" />
    </Svg>
  );
};

export const Vault: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <rect width={W} height={H} fill="#2d2440" />
    <circle cx={540} cy={900} r={420} fill="#4a3f63" stroke={INK} strokeWidth={10} />
    <circle cx={540} cy={900} r={360} fill="#1c1630" stroke={INK} strokeWidth={8} />
    {[...Array(7)].map((_, i) => (
      <g key={i} stroke={INK} strokeWidth={5}>
        <ellipse cx={240 + i * 100} cy={1190 - (i % 3) * 30} rx={130} ry={70} fill="#f2c230" />
      </g>
    ))}
    {Array.from({ length: 40 }).map((_, i) => (
      <ellipse key={i} cx={200 + random(`c${i}`) * 680} cy={1050 + random(`d${i}`) * 180} rx={22} ry={10} fill="#ffe27a" stroke="#b8860b" strokeWidth={3} />
    ))}
    {Array.from({ length: 8 }).map((_, i) => (
      <circle key={i} cx={260 + random(`g${i}`) * 560} cy={1000 + random(`h${i}`) * 200} r={6 + 4 * Math.abs(Math.sin(t * 4 + i))} fill="#fff" opacity={0.8} />
    ))}
    <Floor y={1270} c1="#3a3050" c2="#3a3050" lines="rgba(0,0,0,0.3)" />
  </Svg>
);

export const WandShop: React.FC<{ t: number }> = () => (
  <Svg>
    <rect width={W} height={H} fill="#5a3f2a" />
    {Array.from({ length: 11 }).map((_, r) => (
      <g key={r}>
        <rect x={0} y={200 + r * 95} width={W} height={12} fill="#3a2614" />
        {Array.from({ length: 14 }).map((_, c) => (
          <rect key={c} x={c * 80 + (r % 2) * 30 + 8} y={200 + r * 95 + 14} width={64} height={70} fill={["#c9a66b", "#a8844f", "#d9bc85", "#8f6d3d"][(r + c) % 4]} stroke={INK} strokeWidth={3} />
        ))}
      </g>
    ))}
    <rect x={0} y={1120} width={W} height={170} fill="#7a4f2a" stroke={INK} strokeWidth={8} />
    <Floor y={1290} c1="#3d2a1a" c2="#3d2a1a" lines="rgba(0,0,0,0.3)" />
  </Svg>
);

export const Station: React.FC<{ t: number; train?: boolean }> = ({ t, train = true }) => (
  <Svg>
    <rect width={W} height={H} fill="#cfd8e8" />
    {/* techo */}
    {Array.from({ length: 6 }).map((_, i) => (
      <path key={i} d={`M ${i * 200 - 60} 0 Q ${i * 200 + 40} 220 ${i * 200 + 140} 0`} stroke="#6b7a8f" strokeWidth={14} fill="none" />
    ))}
    {train ? (
      <g stroke={INK} strokeWidth={6} transform={`translate(${-Math.max(0, t - 9) * 300} 0)`}>
        <rect x={-100} y={760} width={1300} height={360} rx={30} fill="#c8302f" />
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={-40 + i * 210} y={810} width={150} height={120} rx={14} fill="#ffe7a8" />
        ))}
        <rect x={-100} y={1060} width={1300} height={30} fill="#7a1a1a" />
        <circle cx={980} cy={700 - ((t * 60) % 120)} r={50 + ((t * 30) % 60)} fill="#fff" opacity={0.7} strokeWidth={0} />
      </g>
    ) : null}
    {/* pilar de ladrillos */}
    <rect x={380} y={420} width={320} height={860} fill="#b5523b" stroke={INK} strokeWidth={8} />
    {Array.from({ length: 14 }).map((_, r) => (
      <g key={r}>
        <line x1={380} x2={700} y1={480 + r * 60} y2={480 + r * 60} stroke="#7a2f20" strokeWidth={4} />
        {Array.from({ length: 4 }).map((_, c) => (
          <line key={c} x1={380 + c * 80 + (r % 2) * 40} x2={380 + c * 80 + (r % 2) * 40} y1={420 + r * 60 + 60} y2={480 + r * 60 + 60} stroke="#7a2f20" strokeWidth={4} />
        ))}
      </g>
    ))}
    <Label x={540} y={520} text="9 ¾" fill="#1b1b2f" color="#ffe66d" size={60} />
    <Label x={160} y={560} text="9" fill="#fff" size={54} />
    <Label x={920} y={560} text="10" fill="#fff" size={54} />
    <Floor y={1280} c1="#8f8fa3" c2="#8f8fa3" lines="rgba(0,0,0,0.18)" />
    <rect x={0} y={1280} width={W} height={20} fill="#ffe66d" />
  </Svg>
);

export const TrainInside: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <rect width={W} height={H} fill="#8a3a2a" />
    {/* ventana con paisaje */}
    <rect x={120} y={380} width={840} height={540} rx={30} fill="#8fd6ff" stroke={INK} strokeWidth={12} />
    <clipPath id="tw">
      <rect x={126} y={386} width={828} height={528} rx={26} />
    </clipPath>
    <g clipPath="url(#tw)">
      <g transform={`translate(${-((t * 260) % 1080)} 0)`}>
        {[0, 1].map((k) => (
          <g key={k} transform={`translate(${k * 1080} 0)`}>
            <path d="M 0 760 Q 200 600 400 720 Q 600 820 800 660 Q 950 560 1080 700 L 1080 920 L 0 920 Z" fill="#5bbf5b" stroke={INK} strokeWidth={5} />
            <path d="M 0 850 Q 300 760 600 840 Q 860 900 1080 820 L 1080 920 L 0 920 Z" fill="#3fa34a" />
            {[150, 480, 820].map((x, i) => (
              <g key={i}>
                <rect x={x - 8} y={680} width={16} height={60} fill="#6b4a2b" />
                <circle cx={x} cy={670} r={40} fill="#2f8f3f" stroke={INK} strokeWidth={4} />
              </g>
            ))}
          </g>
        ))}
      </g>
    </g>
    {/* asientos */}
    <rect x={40} y={1040} width={1000} height={120} rx={30} fill="#3a5a9a" stroke={INK} strokeWidth={8} />
    <rect x={40} y={1150} width={1000} height={140} fill="#2f4a80" stroke={INK} strokeWidth={8} />
    <Floor y={1290} c1="#5a3a2a" c2="#5a3a2a" lines="rgba(0,0,0,0.25)" tiles={false} />
  </Svg>
);

/** Gran comedor. deco: normal | halloween | copa */
export const GreatHall: React.FC<{ t: number; deco?: "normal" | "halloween" | "copa" }> = ({ t, deco = "normal" }) => (
  <Svg>
    <defs>
      <Grad id="gh" stops={["#140f3d", "#2f2273", "#4a3a8f"]} />
    </defs>
    <rect width={W} height={H} fill="url(#gh)" />
    <Stars t={t} n={70} h={700} seed="gh" />
    {[110, 370, 630, 890].map((x, i) => (
      <path key={i} d={`M ${x} 1100 L ${x} 640 Q ${x + 40} 560 ${x + 80} 640 L ${x + 80} 1100 Z`} fill="#7cc8ff" opacity={0.35} stroke={INK} strokeWidth={5} />
    ))}
    {/* estandartes */}
    {[
      ["#c8302f", "#f2c230"],
      ["#2f8f4a", "#c0c8d0"],
      ["#2f6fe4", "#c58a3a"],
      ["#f2c230", "#1b1b2f"],
    ].map(([a, b], i) => {
      const x = 80 + i * 260;
      const big = deco === "copa" ? (i === 0 ? 1.25 : 0.9) : 1;
      return (
        <g key={i} transform={`translate(${x} 560) scale(${big}) rotate(${Math.sin(t * 1.5 + i) * 2})`}>
          <path d="M 0 0 L 140 0 L 140 300 L 70 250 L 0 300 Z" fill={deco === "copa" ? "#c8302f" : a} stroke={INK} strokeWidth={5} />
          <circle cx={70} cy={120} r={40} fill={deco === "copa" ? "#f2c230" : b} stroke={INK} strokeWidth={4} />
        </g>
      );
    })}
    {/* velas flotantes / calabazas */}
    {Array.from({ length: 14 }).map((_, i) => {
      const x = 60 + random(`cx${i}`) * 960;
      const y = 300 + random(`cy${i}`) * 300 + Math.sin(t * 1.2 + i) * 14;
      return deco === "halloween" ? (
        <g key={i} transform={`translate(${x} ${y})`}>
          <ellipse cx={0} cy={0} rx={38} ry={32} fill="#ff8c1a" stroke={INK} strokeWidth={4} />
          <path d="M -14 -6 l 8 -8 l 8 8 z M 6 -6 l 8 -8 l 8 8 z M -16 10 q 16 12 32 0" fill="#3a1a00" stroke="#3a1a00" strokeWidth={3} />
          <circle cx={0} cy={0} r={60} fill="#ffb347" opacity={0.15} />
        </g>
      ) : (
        <g key={i} transform={`translate(${x} ${y})`}>
          <rect x={-8} y={0} width={16} height={46} fill="#fff6dc" stroke={INK} strokeWidth={3} />
          <ellipse cx={0} cy={-8} rx={7} ry={12} fill="#ffcc4d" />
          <circle cx={0} cy={-8} r={30} fill="#ffd36b" opacity={0.18} />
        </g>
      );
    })}
    <Floor y={1240} c1="#5a4a6e" c2="#5a4a6e" lines="rgba(0,0,0,0.2)" />
    {/* mesa larga al frente */}
    <rect x={-20} y={1500} width={1120} height={70} fill="#8a5a2b" stroke={INK} strokeWidth={8} />
    <rect x={-20} y={1570} width={1120} height={350} fill="#6b4320" />
    {Array.from({ length: 7 }).map((_, i) => (
      <g key={i}>
        <ellipse cx={80 + i * 160} cy={1500} rx={50} ry={14} fill="#e6e6f0" stroke={INK} strokeWidth={3} />
        <circle cx={80 + i * 160} cy={1488} r={18} fill={["#e8574a", "#f2b33d", "#7bd389"][i % 3]} />
      </g>
    ))}
  </Svg>
);

export const NightCastle: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <defs>
      <Grad id="nc" stops={["#0f0b33", "#2b1f73", "#5a3f9f"]} />
    </defs>
    <rect width={W} height={H} fill="url(#nc)" />
    <Stars t={t} n={90} h={900} seed="nc" />
    <path d="M 0 1000 L 160 760 L 300 900 L 420 700 L 560 860 L 700 680 L 840 840 L 1080 720 L 1080 1100 L 0 1100 Z" fill="#1d1650" />
    <g fill="#2a2066" stroke={INK} strokeWidth={4}>
      <rect x={260} y={560} width={110} height={420} />
      <path d="M 245 570 L 315 400 L 385 570 Z" fill="#3b2e85" />
      <rect x={420} y={460} width={150} height={520} />
      <path d="M 400 470 L 495 260 L 590 470 Z" fill="#3b2e85" />
      <rect x={600} y={600} width={260} height={380} />
      <rect x={880} y={520} width={110} height={460} />
      <path d="M 865 530 L 935 360 L 1005 530 Z" fill="#3b2e85" />
    </g>
    {Array.from({ length: 22 }).map((_, i) => (
      <rect key={i} x={280 + random(`w${i}`) * 680} y={520 + random(`v${i}`) * 420} width={18} height={30} rx={9} fill="#ffd36b" opacity={0.6 + 0.4 * Math.sin(t * 3 + i)} />
    ))}
    {/* lago */}
    <rect x={0} y={1080} width={W} height={840} fill="#14205a" />
    {Array.from({ length: 10 }).map((_, i) => (
      <line key={i} x1={100 + random(`l${i}`) * 800} x2={200 + random(`l${i}`) * 800} y1={1150 + i * 70} y2={1150 + i * 70} stroke="#ffd36b" strokeWidth={4} opacity={0.3 + 0.2 * Math.sin(t * 2 + i)} />
    ))}
  </Svg>
);

/* ---------------- PARTE 3 ---------------- */

export const Stairs: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <rect width={W} height={H} fill="#4a3f6b" />
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={i * 100} y={0} width={96} height={H} fill={i % 2 ? "#4f4472" : "#463b66"} />
    ))}
    {/* cuadros que hablan */}
    {[
      [130, 300, "#e8574a"],
      [820, 260, "#2fae4f"],
      [760, 760, "#f2b33d"],
    ].map(([x, y, c], i) => (
      <g key={i} transform={`translate(${x} ${y})`}>
        <rect x={-90} y={-110} width={180} height={220} fill="#d9a441" stroke={INK} strokeWidth={6} />
        <rect x={-70} y={-90} width={140} height={180} fill={c as string} />
        <circle cx={0} cy={-15} r={36} fill="#ffe0c2" stroke={INK} strokeWidth={4} />
        <circle cx={-12} cy={-20} r={4} fill={INK} />
        <circle cx={12} cy={-20} r={4} fill={INK} />
        <ellipse cx={0} cy={2} rx={10} ry={3 + 6 * Math.abs(Math.sin(t * 8 + i))} fill={INK} />
      </g>
    ))}
    {/* escaleras que giran */}
    {[0, 1, 2].map((i) => {
      const rot = Math.sin(t * 0.8 + i * 2) * 18;
      const cx = 300 + i * 260;
      const cy = 560 + i * 260;
      return (
        <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
          <path d={`M ${cx - 220} ${cy + 60} L ${cx + 220} ${cy - 60} L ${cx + 220} ${cy - 20} L ${cx - 220} ${cy + 100} Z`} fill="#9b6b43" stroke={INK} strokeWidth={6} />
          {Array.from({ length: 8 }).map((_, k) => (
            <line key={k} x1={cx - 200 + k * 55} y1={cy + 55 - k * 15} x2={cx - 200 + k * 55} y2={cy + 95 - k * 15} stroke={INK} strokeWidth={4} />
          ))}
        </g>
      );
    })}
    <Floor y={1290} c1="#6b5f8f" c2="#6b5f8f" lines="rgba(0,0,0,0.22)" />
  </Svg>
);

export const Classroom: React.FC<{ t: number; dungeon?: boolean }> = ({ t, dungeon = false }) => (
  <Svg>
    <rect width={W} height={H} fill={dungeon ? "#2f3d3a" : "#7a5f9a"} />
    {Array.from({ length: 16 }).map((_, r) => (
      <g key={r}>
        {Array.from({ length: 7 }).map((_, c) => (
          <rect key={c} x={c * 170 - (r % 2) * 85} y={r * 80} width={166} height={76} fill={dungeon ? (r + c) % 3 ? "#34443f" : "#3a4c46" : "#83699f"} stroke="rgba(0,0,0,0.25)" strokeWidth={3} />
        ))}
      </g>
    ))}
    <rect x={200} y={480} width={680} height={380} fill={dungeon ? "#1d2a26" : "#24543a"} stroke="#7a4a22" strokeWidth={18} />
    <text x={540} y={640} textAnchor="middle" fontSize={56} fontFamily="Fredoka" fontWeight={700} fill="#e6f5e6" opacity={0.8}>
      {dungeon ? "POCIONES" : "TRANSFORMACIONES"}
    </text>
    <path d="M 300 760 q 60 -60 120 0 t 120 0 t 120 0" stroke="#e6f5e6" strokeWidth={5} fill="none" opacity={0.6} />
    {dungeon
      ? [180, 900].map((x, i) => (
          <g key={i}>
            <rect x={x - 70} y={300} width={140} height={14} fill="#5a3a22" />
            {[0, 1, 2].map((k) => (
              <rect key={k} x={x - 60 + k * 44} y={240} width={34} height={60} rx={8} fill={["#7bd389", "#e8574a", "#9b7bff"][k]} stroke={INK} strokeWidth={3} />
            ))}
          </g>
        ))
      : null}
    <Floor y={1270} c1={dungeon ? "#25302d" : "#5f4a7a"} c2="#000" lines="rgba(0,0,0,0.25)" />
    {dungeon
      ? [170, 910].map((x, i) => (
          <g key={i}>
            <path d={`M ${x - 90} 1300 Q ${x} 1460 ${x + 90} 1300 Z`} fill="#2a2a2a" stroke={INK} strokeWidth={6} />
            <ellipse cx={x} cy={1300} rx={90} ry={20} fill="#6bdc6b" stroke={INK} strokeWidth={5} />
            {[0, 1, 2].map((k) => (
              <circle key={k} cx={x - 40 + k * 40} cy={1290 - ((t * 60 + k * 30) % 90)} r={10} fill="#9cf29c" opacity={0.8} />
            ))}
          </g>
        ))
      : null}
  </Svg>
);

export const Pitch: React.FC<{ t: number; air?: boolean; stands?: boolean }> = ({ t, air = false, stands = true }) => (
  <Svg>
    <defs>
      <Grad id="pt" stops={["#4aa8ff", "#a8dcff", "#e6f6ff"]} />
    </defs>
    <rect width={W} height={H} fill="url(#pt)" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i} transform={`translate(${((t * (20 + i * 8) + i * 330) % 1500) - 250} ${180 + i * 260})`} fill="#fff" opacity={0.9}>
        <ellipse cx={0} cy={0} rx={140} ry={44} />
        <ellipse cx={60} cy={-30} rx={80} ry={46} />
        <ellipse cx={-50} cy={-16} rx={60} ry={36} />
      </g>
    ))}
    {stands && !air ? (
      <g stroke={INK} strokeWidth={5}>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={i * 230 - 30} y={900} width={200} height={360} fill={["#c8302f", "#2f6fe4", "#f2c230", "#2f8f4a", "#c8302f"][i]} />
            <path d={`M ${i * 230 - 40} 900 L ${i * 230 + 70} 780 L ${i * 230 + 180} 900 Z`} fill="#f4f4f4" />
            {Array.from({ length: 4 }).map((_, k) => (
              <rect key={k} x={i * 230 - 10 + k * 45} y={960 + Math.abs(Math.sin(t * 6 + i + k)) * -10} width={30} height={30} rx={15} fill="#ffe0c2" strokeWidth={3} />
            ))}
          </g>
        ))}
      </g>
    ) : null}
    {!air
      ? [220, 540, 860].map((x, i) => (
          <g key={i} stroke={INK} strokeWidth={6}>
            <rect x={x - 6} y={600 + (i === 1 ? -80 : 0)} width={12} height={660} fill="#f2c230" />
            <circle cx={x} cy={560 + (i === 1 ? -80 : 0)} r={60} fill="none" stroke="#f2c230" strokeWidth={14} />
          </g>
        ))
      : null}
    {!air ? <rect x={0} y={1260} width={W} height={660} fill="#4cbf4c" /> : null}
    {!air ? Array.from({ length: 8 }).map((_, i) => <rect key={i} x={0} y={1260 + i * 85} width={W} height={42} fill="#43b043" />) : null}
  </Svg>
);

export const Corridor: React.FC<{ t: number; dark?: boolean; door?: boolean }> = ({ t, dark = false, door = false }) => (
  <Svg>
    <rect width={W} height={H} fill={dark ? "#1f1a33" : "#6b5f8f"} />
    {Array.from({ length: 16 }).map((_, r) => (
      <g key={r}>
        {Array.from({ length: 7 }).map((_, c) => (
          <rect key={c} x={c * 170 - (r % 2) * 85} y={r * 80} width={166} height={76} fill={dark ? "#262040" : (r + c) % 3 ? "#73679a" : "#7a6ea3"} stroke="rgba(0,0,0,0.25)" strokeWidth={3} />
        ))}
      </g>
    ))}
    {/* arco al fondo */}
    <path d="M 340 1270 L 340 760 Q 540 560 740 760 L 740 1270 Z" fill={dark ? "#0b0818" : "#2f2650"} stroke={INK} strokeWidth={8} />
    {door ? <rect x={380} y={820} width={320} height={450} fill="#5a3a22" stroke={INK} strokeWidth={8} /> : null}
    {[140, 940].map((x, i) => (
      <g key={i}>
        <rect x={x - 12} y={760} width={24} height={70} fill="#5a3a22" stroke={INK} strokeWidth={4} />
        <path d={`M ${x} ${700 - 10 * Math.abs(Math.sin(t * 9 + i))} Q ${x + 26} 740 ${x} 765 Q ${x - 26} 740 ${x} ${700}`} fill="#ff9f1a" />
        <circle cx={x} cy={740} r={dark ? 160 : 110} fill="#ffb347" opacity={dark ? 0.22 : 0.15} />
      </g>
    ))}
    <Floor y={1270} c1={dark ? "#2a2440" : "#5a4f7e"} c2="#000" lines="rgba(0,0,0,0.28)" />
  </Svg>
);

export const Bathroom: React.FC<{ t: number }> = () => (
  <Svg>
    <rect width={W} height={H} fill="#bfe3dc" />
    {Array.from({ length: 24 }).map((_, r) => (
      <g key={r}>
        {Array.from({ length: 14 }).map((_, c) => (
          <rect key={c} x={c * 80} y={r * 60} width={78} height={58} fill={(r + c) % 2 ? "#c8ebe4" : "#b3ddd5"} />
        ))}
      </g>
    ))}
    {[0, 1, 2, 3].map((i) => (
      <g key={i} stroke={INK} strokeWidth={6}>
        <rect x={40 + i * 260} y={640} width={230} height={600} fill="#7fb3a8" />
        <rect x={60 + i * 260} y={680} width={190} height={540} fill="#9ccfc4" />
        <circle cx={230 + i * 260} cy={960} r={8} fill={INK} />
      </g>
    ))}
    <Floor y={1240} c1="#e6efe9" c2="#000" lines="rgba(0,60,50,0.2)" />
  </Svg>
);

/* ---------------- PARTE 4 ---------------- */

export const Library: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <rect width={W} height={H} fill="#3a2a4a" />
    {[0, 1, 2].map((s) => (
      <g key={s} transform={`translate(${s * 360 + 10} 0)`}>
        <rect x={0} y={200} width={340} height={1070} fill="#5a3a22" stroke={INK} strokeWidth={8} />
        {Array.from({ length: 9 }).map((_, r) => (
          <g key={r}>
            <rect x={10} y={230 + r * 115} width={320} height={10} fill="#3a2414" />
            {Array.from({ length: 11 }).map((_, b) => (
              <rect key={b} x={16 + b * 28} y={240 + r * 115 + (b % 3) * 6} width={24} height={98 - (b % 3) * 6} fill={["#c8302f", "#2f6fe4", "#f2c230", "#2f8f4a", "#8e5ad6", "#e8574a"][(r + b + s) % 6]} stroke={INK} strokeWidth={2} />
            ))}
          </g>
        ))}
      </g>
    ))}
    {[200, 880].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy={150 + Math.sin(t * 1.4 + i) * 10} r={70} fill="#ffd36b" opacity={0.2} />
        <rect x={x - 8} y={150 + Math.sin(t * 1.4 + i) * 10} width={16} height={46} fill="#fff6dc" stroke={INK} strokeWidth={3} />
      </g>
    ))}
    <Floor y={1270} c1="#4a3420" c2="#000" lines="rgba(0,0,0,0.3)" />
    <rect x={180} y={1420} width={720} height={40} fill="#8a5a2b" stroke={INK} strokeWidth={6} />
    <rect x={220} y={1460} width={30} height={300} fill="#6b4320" />
    <rect x={830} y={1460} width={30} height={300} fill="#6b4320" />
  </Svg>
);

/** Sala de piedra oscura. tint para variar. */
export const Chamber: React.FC<{ t: number; tint?: string; light?: string }> = ({ t, tint = "#241d3d", light = "#9b7bff" }) => (
  <Svg>
    <rect width={W} height={H} fill={tint} />
    {Array.from({ length: 16 }).map((_, r) => (
      <g key={r}>
        {Array.from({ length: 7 }).map((_, c) => (
          <rect key={c} x={c * 170 - (r % 2) * 85} y={r * 80} width={166} height={76} fill="rgba(255,255,255,0.04)" stroke="rgba(0,0,0,0.35)" strokeWidth={3} />
        ))}
      </g>
    ))}
    <circle cx={540} cy={700} r={520 + Math.sin(t * 2) * 20} fill={light} opacity={0.12} />
    <Floor y={1270} c1="#1a1530" c2="#000" lines="rgba(255,255,255,0.06)" />
  </Svg>
);

export const Forest: React.FC<{ t: number; hut?: boolean }> = ({ t, hut = false }) => (
  <Svg>
    <defs>
      <Grad id="fo" stops={["#06122a", "#0f2a3f", "#1d4a4a"]} />
    </defs>
    <rect width={W} height={H} fill="url(#fo)" />
    <Stars t={t} n={40} h={500} seed="fo" />
    <circle cx={800} cy={300} r={90} fill="#eaf6ff" />
    <circle cx={800} cy={300} r={170} fill="#eaf6ff" opacity={0.12} />
    {hut ? (
      <g stroke={INK} strokeWidth={6}>
        <rect x={560} y={880} width={360} height={380} fill="#7a5a3a" />
        <path d="M 520 890 Q 740 620 960 890 Z" fill="#5a3a22" />
        <rect x={620} y={960} width={90} height={80} fill="#ffd36b" />
        <rect x={760} y={1060} width={100} height={200} fill="#4a2f17" />
      </g>
    ) : null}
    {Array.from({ length: hut ? 4 : 9 }).map((_, i) => {
      const x = (hut ? [40, 260, 1000, 1080] : [0, 140, 300, 470, 620, 760, 900, 1040, 220])[i];
      const h = 700 + random(`tr${i}`) * 400;
      return (
        <g key={i} stroke={INK} strokeWidth={5}>
          <rect x={x - 26} y={1270 - h * 0.45} width={52} height={h * 0.45} fill="#2a1d14" />
          <path d={`M ${x - 170} ${1270 - h * 0.35} L ${x} ${1270 - h} L ${x + 170} ${1270 - h * 0.35} Z`} fill={i % 2 ? "#123d2a" : "#0f3324"} transform={`rotate(${Math.sin(t * 0.8 + i) * 1.5} ${x} 1270)`} />
        </g>
      );
    })}
    <rect x={0} y={1270} width={W} height={650} fill="#123020" />
    {Array.from({ length: 5 }).map((_, i) => (
      <ellipse key={i} cx={((t * 30 + i * 300) % 1500) - 200} cy={1260 + i * 30} rx={300} ry={40} fill="#cfe8ff" opacity={0.08} />
    ))}
  </Svg>
);

export const Hospital: React.FC<{ t: number }> = () => (
  <Svg>
    <rect width={W} height={H} fill="#e8f1ff" />
    {[160, 920].map((x, i) => (
      <path key={i} d={`M ${x - 90} 1000 L ${x - 90} 500 Q ${x} 400 ${x + 90} 500 L ${x + 90} 1000 Z`} fill="#bfe3ff" stroke={INK} strokeWidth={6} />
    ))}
    <Floor y={1270} c1="#c9d6ea" c2="#000" lines="rgba(0,0,0,0.12)" />
    <g stroke={INK} strokeWidth={6}>
      <rect x={260} y={1130} width={560} height={150} rx={20} fill="#ffffff" />
      <rect x={240} y={1020} width={40} height={300} fill="#c0c8d8" />
      <rect x={800} y={1080} width={40} height={240} fill="#c0c8d8" />
    </g>
    {Array.from({ length: 6 }).map((_, i) => (
      <rect key={i} x={860 + (i % 3) * 50} y={1180 - Math.floor(i / 3) * 50} width={40} height={40} rx={8} fill={["#ff6b9a", "#ffe66d", "#7bd389"][i % 3]} stroke={INK} strokeWidth={3} />
    ))}
  </Svg>
);
