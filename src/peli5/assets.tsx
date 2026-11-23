import React from "react";
import { random } from "remotion";
import { INK } from "../characters/cast";
import { Floor, Grad, H, Svg, W } from "../scenes/bg1";
import { Chamber } from "../scenes/bg2";

type XY = { x: number; y: number; s?: number };
const T = (x: number, y: number, s = 1, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${s})`;

export const PinkOffice: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <rect width={W} height={H} fill="#ffc7e3" />
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={i * 95} y={0} width={44} height={1270} fill="#ffd6ec" />
    ))}
    {Array.from({ length: 12 }).map((_, i) => {
      const x = 130 + (i % 4) * 270;
      const y = 300 + Math.floor(i / 4) * 230;
      return (
        <g key={i} transform={`translate(${x} ${y})`} stroke={INK} strokeWidth={4}>
          <circle r={80} fill="#fff" />
          <circle r={62} fill="#ffe3f1" />
          <circle cx={0} cy={6} r={30} fill="#f2c9a0" />
          <path d="M -26 -16 L -22 -42 L -8 -24 M 26 -16 L 22 -42 L 8 -24" fill="#f2c9a0" />
          <circle cx={-10} cy={2} r={4} fill={INK} stroke="none" />
          <circle cx={10} cy={2} r={4} fill={INK} stroke="none" />
          <path d={`M -6 ${14 + Math.sin(t * 6 + i) * 3} q 6 6 12 0`} fill="none" strokeWidth={3} />
        </g>
      );
    })}
    <Floor y={1270} c1="#e89cc3" c2="#000" lines="rgba(120,30,80,0.2)" />
    <rect x={160} y={1380} width={760} height={40} fill="#c86b9a" stroke={INK} strokeWidth={6} />
  </Svg>
);

export const RoomReq: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <rect width={W} height={H} fill="#4a3a2a" />
    {Array.from({ length: 16 }).map((_, r) => (
      <g key={r}>
        {Array.from({ length: 7 }).map((_, c) => (
          <rect key={c} x={c * 170 - (r % 2) * 85} y={r * 80} width={166} height={76} fill={(r + c) % 3 ? "#54412f" : "#5c4734"} stroke="rgba(0,0,0,0.3)" strokeWidth={3} />
        ))}
      </g>
    ))}
    {[0, 1, 2].map((i) => (
      <rect key={i} x={120 + i * 320} y={300} width={200} height={300} rx={20} fill="#c8302f" stroke={INK} strokeWidth={6} />
    ))}
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${200 + i * 340} 1270)`} stroke={INK} strokeWidth={6}>
        <rect x={-8} y={-300} width={16} height={300} fill="#6b4320" />
        <circle cx={0} cy={-340} r={40} fill="#d9c7a3" />
        <rect x={-50} y={-290} width={100} height={20} fill="#6b4320" />
      </g>
    ))}
    {[120, 960].map((x, i) => (
      <circle key={i} cx={x} cy={760} r={120 + Math.sin(t * 6 + i) * 8} fill="#ffb347" opacity={0.15} />
    ))}
    <Floor y={1270} c1="#5a4430" c2="#000" lines="rgba(0,0,0,0.3)" />
    {Array.from({ length: 6 }).map((_, i) => (
      <rect key={i} x={60 + i * 170} y={1340} width={140} height={30} rx={14} fill="#b33" opacity={0.6} />
    ))}
  </Svg>
);

export const Grimmauld: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <rect width={W} height={H} fill="#2a2a24" />
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={i * 95} y={0} width={44} height={1270} fill="#33332a" />
    ))}
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${200 + i * 340} 520)`} stroke={INK} strokeWidth={5}>
        <rect x={-90} y={-120} width={180} height={240} fill="#6b5a2a" />
        <rect x={-72} y={-102} width={144} height={204} fill="#3a3a30" />
        <circle cx={0} cy={-20} r={34} fill="#d9d0b8" />
      </g>
    ))}
    <path d="M 0 1100 L 1080 1100" stroke="#5a4a2a" strokeWidth={10} />
    <rect x={140} y={1180} width={800} height={40} fill="#5a3a22" stroke={INK} strokeWidth={6} />
    {[200, 540, 880].map((x, i) => (
      <g key={i}>
        <rect x={x - 6} y={1120} width={12} height={60} fill="#fff6dc" stroke={INK} strokeWidth={3} />
        <ellipse cx={x} cy={1112} rx={7} ry={12} fill="#ffcc4d" />
        <circle cx={x} cy={1112} r={60} fill="#ffd36b" opacity={0.15 + 0.05 * Math.sin(t * 7 + i)} />
      </g>
    ))}
    <Floor y={1270} c1="#3a3226" c2="#000" lines="rgba(0,0,0,0.3)" tiles={false} />
  </Svg>
);

export const Atrium: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <defs>
      <Grad id="atr" stops={["#1a2a4a", "#2a3f6b", "#3a5080"]} />
    </defs>
    <rect width={W} height={H} fill="url(#atr)" />
    {Array.from({ length: 7 }).map((_, i) => (
      <rect key={i} x={i * 170 - 20} y={200} width={60} height={1070} fill="#1a2440" stroke={INK} strokeWidth={4} />
    ))}
    {Array.from({ length: 10 }).map((_, i) => (
      <path key={i} d={`M ${60 + i * 110} 250 l 30 0 l 0 40 l -30 0 z`} fill="#5ad1ff" opacity={0.3 + 0.3 * Math.abs(Math.sin(t * 2 + i))} />
    ))}
    <g transform="translate(540 1270)" stroke={INK} strokeWidth={6}>
      <ellipse cx={0} cy={-10} rx={260} ry={50} fill="#d9a441" />
      <rect x={-30} y={-400} width={60} height={390} fill="#e8b923" />
      <circle cx={0} cy={-440} r={60} fill="#f2c230" />
      {[-1, 1].map((d) => (
        <path key={d} d={`M ${d * 30} -300 Q ${d * 120} ${-340 + Math.sin(t * 4) * 10} ${d * 200} -60`} stroke="#9fe8ff" strokeWidth={10} fill="none" opacity={0.8} />
      ))}
    </g>
    <Floor y={1270} c1="#1a2236" c2="#000" lines="rgba(255,255,255,0.06)" />
  </Svg>
);

export const Mysteries: React.FC<{ t: number; broken?: number }> = ({ t, broken = 0 }) => (
  <Svg>
    <rect width={W} height={H} fill="#070a1a" />
    {Array.from({ length: 5 }).map((_, s) => (
      <g key={s} transform={`translate(${s * 230 - 40} 0)`}>
        <rect x={0} y={150} width={180} height={1120} fill="#121830" stroke="#000" strokeWidth={5} />
        {Array.from({ length: 9 }).map((_, r) => (
          <g key={r}>
            <rect x={6} y={190 + r * 120} width={168} height={8} fill="#2a3050" />
            {Array.from({ length: 4 }).map((_, c) => {
              const gone = random(`o${s}-${r}-${c}`) < broken;
              return gone ? null : <circle key={c} cx={30 + c * 40} cy={170 + r * 120} r={16} fill="#9fd8ff" opacity={0.5 + 0.4 * Math.abs(Math.sin(t * 2 + s + r + c))} />;
            })}
          </g>
        ))}
      </g>
    ))}
    <Floor y={1270} c1="#0c1024" c2="#000" lines="rgba(120,180,255,0.08)" />
  </Svg>
);

export const VeilRoom: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Chamber t={t} tint="#141824" light="#9fb4d8" />
    <Svg>
      <g stroke="#000" strokeWidth={8}>
        <path d="M 340 1270 L 340 620 Q 540 480 740 620 L 740 1270" fill="none" stroke="#5a5f70" strokeWidth={50} />
      </g>
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i} d={`M ${370 + i * 45} 640 Q ${380 + i * 45 + Math.sin(t * 2 + i) * 20} 950 ${370 + i * 45 + Math.sin(t * 1.6 + i) * 30} 1260`} stroke="#2a2f3a" strokeWidth={30} fill="none" opacity={0.8} />
      ))}
      <rect x={300} y={1250} width={480} height={40} fill="#4a4f60" stroke="#000" strokeWidth={6} />
    </Svg>
  </>
);

export const Thestral: React.FC<XY & { t: number; flip?: boolean }> = ({ x, y, s = 1, t, flip = false }) => {
  const wg = Math.sin(t * 5) * 30;
  return (
    <g transform={`${T(x, y, s)} scale(${flip ? -1 : 1} 1)`} stroke="#000" strokeWidth={6} strokeLinejoin="round" strokeLinecap="round">
      <path d={`M -40 -260 Q -180 ${-420 - wg} -340 ${-360 - wg} Q -220 -280 -60 -230 Z`} fill="#26232e" />
      <ellipse cx={0} cy={-200} rx={150} ry={60} fill="#1d1a24" />
      {[-20, 20, 60].map((rx, i) => (
        <path key={i} d={`M ${rx - 60} -230 q 10 30 0 60`} stroke="#4a4656" strokeWidth={4} fill="none" />
      ))}
      {[-100, -60, 70, 110].map((lx, i) => (
        <line key={i} x1={lx} y1={-150} x2={lx + Math.sin(t * 5 + i) * 8} y2={0} strokeWidth={10} stroke="#1d1a24" />
      ))}
      <path d="M 120 -230 Q 170 -320 210 -330 L 280 -290 L 270 -270 L 200 -280 Q 170 -230 150 -190 Z" fill="#1d1a24" />
      <circle cx={232} cy={-306} r={8} fill="#e8e8f0" stroke="none" />
      <path d="M -150 -210 q -50 30 -60 80" fill="none" stroke="#1d1a24" strokeWidth={8} />
    </g>
  );
};

export const FireDragon: React.FC<XY & { t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={T(x, y, s)}>
    {Array.from({ length: 12 }).map((_, i) => (
      <circle key={i} cx={-i * 60} cy={Math.sin(t * 6 - i * 0.6) * 40} r={44 - i * 2.5} fill={i % 2 ? "#ff8a1a" : "#ffd23a"} opacity={0.9 - i * 0.05} />
    ))}
    <path d="M 20 -40 L 120 -10 L 20 30 Z" fill="#ff5a1a" />
    <circle cx={30} cy={-14} r={8} fill="#fff" />
  </g>
);

export const Decree: React.FC<XY & { n: number }> = ({ x, y, s = 1, n }) => (
  <g transform={T(x, y, s, -4)} stroke={INK} strokeWidth={5}>
    <rect x={-160} y={-110} width={320} height={220} fill="#ffe3f1" />
    <text x={0} y={-50} textAnchor="middle" fontSize={34} fontFamily="Fredoka" fontWeight={700} fill="#c2185b" stroke="none">DECRETO Nº {n}</text>
    {[0, 1, 2].map((i) => (
      <line key={i} x1={-120} x2={120} y1={0 + i * 30} y2={0 + i * 30} stroke="#c2185b" strokeWidth={4} />
    ))}
  </g>
);
