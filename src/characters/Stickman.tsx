import React from "react";
import { random, useCurrentFrame } from "remotion";
import { Pose } from "../lib/pose";
import { CAST, CharDef, CharId, INK } from "./cast";
import { FONT } from "../lib/font";

export type Expression = "neutral" | "joy" | "surprise" | "anger" | "sadness" | "focus" | "sleep";

type Props = {
  who: CharId;
  x: number; // posición de los pies en pantalla
  y: number;
  scale?: number;
  facing?: 1 | -1;
  pose: Pose;
  expression?: Expression;
  wand?: boolean;
  wandGlow?: number; // 0..1 destellos en la punta
  blink?: number; // forzar parpadeo 0..1
  showName?: boolean;
  opacity?: number;
  broom?: boolean; // montado en escoba (no apoya en el piso)
  rotate?: number; // rotación de todo el cuerpo (grados, alrededor de la cadera)
  holding?: React.ReactNode; // objeto en la mano cercana (coordenadas locales de la mano)
  stone?: boolean; // petrificado
};

type P = { x: number; y: number };
const R = 46; // radio de la cabeza
const rad = (d: number) => (d * Math.PI) / 180;
const down = (a: number): P => ({ x: Math.sin(rad(a)), y: Math.cos(rad(a)) });
const add = (p: P, d: P, k: number): P => ({ x: p.x + d.x * k, y: p.y + d.y * k });

export const Stickman: React.FC<Props> = ({
  who,
  x,
  y,
  scale = 2,
  facing = 1,
  pose,
  expression = "neutral",
  wand = false,
  wandGlow = 0,
  blink,
  showName = true,
  opacity = 1,
  broom = false,
  rotate = 0,
  holding,
  stone = false,
}) => {
  const frame = useCurrentFrame();
  const c: CharDef = CAST[who];
  const s = scale * c.height;
  const seed = who.length * 13 + c.name.charCodeAt(0);

  // --- cinemática directa ---
  const TH = 78, SH = 78, TORSO = 128, NECK = 14, UA = 60, FA = 58;
  const hip0: P = { x: 0, y: 0 };
  const kneeR = add(hip0, down(pose.rHip), TH);
  const ankR = add(kneeR, down(pose.rHip - pose.rKn), SH);
  const kneeL = add(hip0, down(pose.lHip), TH);
  const ankL = add(kneeL, down(pose.lHip - pose.lKn), SH);
  // apoyar el pie más bajo en el piso
  const ground = broom ? TH + SH : Math.max(ankR.y, ankL.y) + 4;
  const off = -ground + pose.bob;
  const sh = (p: P): P => ({ x: p.x, y: p.y + off });
  const hip = sh(hip0);
  const kR = sh(kneeR), aR = sh(ankR), kL = sh(kneeL), aL = sh(ankL);
  const up: P = { x: Math.sin(rad(pose.lean)), y: -Math.cos(rad(pose.lean)) };
  const shoulder = add(hip, up, TORSO);
  const neck = add(shoulder, up, NECK);
  const head = add(neck, up, R - 4);
  const elbR = add(shoulder, down(pose.rSh), UA);
  const handR = add(elbR, down(pose.rSh + pose.rEl), FA);
  const elbL = add(shoulder, down(pose.lSh), UA);
  const handL = add(elbL, down(pose.lSh + pose.lEl), FA);

  const lw = 13;
  const torsoW = 13 + c.width * 52;
  const limb = (pts: P[], w = lw, col = INK) => (
    <polyline
      points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
      fill="none"
      stroke={col}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
  const foot = (a: P) => limb([a, { x: a.x + 20, y: a.y + 1 }], lw);
  const hand = (p: P) => <circle cx={p.x} cy={p.y} r={9} fill={INK} />;

  // varita
  const wd = down(pose.rSh + pose.rEl);
  const w0 = add(handR, wd, -8);
  const w1 = add(handR, wd, 66);

  // bufanda
  const sway = Math.sin(frame * 0.18 + seed) * 7 - pose.lean * 1.2;
  const scarfY = shoulder.y + 4;
  const scarf = (
    <g>
      <path
        d={`M ${shoulder.x + 6} ${scarfY + 6} q ${-10 + sway * 0.4} 30 ${-16 + sway} 62`}
        stroke={c.color}
        strokeWidth={17}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M ${shoulder.x + 6} ${scarfY + 6} q ${-10 + sway * 0.4} 30 ${-16 + sway} 62`}
        stroke="rgba(0,0,0,0.18)"
        strokeWidth={17}
        strokeDasharray="6 12"
        fill="none"
      />
      <line
        x1={shoulder.x - 22}
        y1={scarfY}
        x2={shoulder.x + 22}
        y2={scarfY}
        stroke={c.color}
        strokeWidth={20}
        strokeLinecap="round"
      />
      <line
        x1={shoulder.x - 22}
        y1={scarfY}
        x2={shoulder.x + 22}
        y2={scarfY}
        stroke="rgba(0,0,0,0.2)"
        strokeWidth={20}
        strokeDasharray="5 9"
      />
    </g>
  );

  const hatH = c.extras.includes("wizardHat") || c.extras.includes("witchHat") ? 120 : c.extras.includes("turban") ? 34 : c.hairStyle === "bushy" || c.hairStyle === "curly" ? 18 : 0;

  // etiqueta en coordenadas de pantalla (no se espeja)
  const labelX = x + facing * head.x * s;
  const labelY = y + (head.y - R - hatH - 34) * s;

  return (
    <svg
      width={1080}
      height={1920}
      viewBox="0 0 1080 1920"
      style={{ position: "absolute", left: 0, top: 0, overflow: "visible", opacity, filter: stone ? "grayscale(1) brightness(1.15) contrast(0.85)" : undefined }}
    >
      {broom ? null : <ellipse cx={x} cy={y + 2} rx={70 * s * (0.6 + c.width * 0.5)} ry={10 * s} fill="rgba(0,0,0,0.22)" />}
      <g transform={`translate(${x} ${y}) scale(${facing * s} ${s}) rotate(${rotate} 0 ${-(TH + SH)})`}>
        {broom ? (
          <g>
            <line x1={-120} y1={hip.y + 6} x2={110} y2={hip.y + 6} stroke="#7a4a22" strokeWidth={11} strokeLinecap="round" />
            <path d={`M -120 ${hip.y - 8} L -190 ${hip.y - 30} L -200 ${hip.y + 6} L -190 ${hip.y + 42} L -120 ${hip.y + 20} Z`} fill="#e0b25a" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          </g>
        ) : null}
        {/* lado lejano */}
        {limb([shoulder, elbL, handL])}
        {hand(handL)}
        {limb([hip, kL, aL])}
        {foot(aL)}
        {/* torso */}
        {limb([hip, shoulder], torsoW)}
        {c.width > 0 ? limb([hip, shoulder], torsoW - 16, c.head) : null}
        {/* lado cercano */}
        {limb([hip, kR, aR])}
        {foot(aR)}
        {scarf}
        <Head who={who} p={head} tilt={pose.headTilt} turn={pose.headTurn} expression={expression} blinkOverride={blink} seed={seed} />
        {wand ? limb([w0, w1], 7, "#6b3f1d") : null}
        {wand ? <circle cx={w1.x} cy={w1.y} r={4} fill="#fff4c2" /> : null}
        {limb([shoulder, elbR, handR])}
        {hand(handR)}
        {holding ? <g transform={`translate(${handR.x} ${handR.y})`}>{holding}</g> : null}
      </g>
      {wand && wandGlow > 0 ? (
        <Sparkles x={x + facing * w1.x * s} y={y + w1.y * s} intensity={wandGlow} seed={seed} />
      ) : null}
      {showName ? <NameTag x={labelX} y={labelY} name={c.name} color={c.color} /> : null}
    </svg>
  );
};

const NameTag: React.FC<{ x: number; y: number; name: string; color: string }> = ({ x, y, name, color }) => {
  const w = name.length * 23 + 40;
  const light = color === "#f4f4f4" || color === "#a9b4c2" || color === "#e8b923" || color === "#f6a5c6";
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-30} width={w} height={56} rx={28} fill={color} stroke={INK} strokeWidth={5} />
      <text
        x={0}
        y={10}
        textAnchor="middle"
        fontFamily={FONT}
        fontWeight={700}
        fontSize={36}
        fill={light ? INK : "#ffffff"}
      >
        {name}
      </text>
    </g>
  );
};

const Head: React.FC<{
  who: CharId;
  p: P;
  tilt: number;
  turn: number;
  expression: Expression;
  blinkOverride?: number;
  seed: number;
}> = ({ who, p, tilt, turn, expression, blinkOverride, seed }) => {
  const frame = useCurrentFrame();
  const c: CharDef = CAST[who];
  const period = 88 + Math.floor(random(seed) * 40);
  const ph = (frame + seed * 7) % period;
  const autoBlink = ph < 5 ? 1 - Math.abs(ph - 2.5) / 2.5 : 0;
  const blink = expression === "sleep" ? 1 : blinkOverride ?? autoBlink;

  const fx = turn * 15;
  const sp = 15 * (1 - 0.25 * Math.abs(turn));
  const eyeY = -4;
  const eyeScale =
    (1 - blink * 0.92) *
    (expression === "surprise" ? 1.45 : expression === "focus" ? 0.6 : expression === "sadness" ? 0.85 : 1);
  const eyeR = expression === "surprise" ? 7 : 6;

  const brow = (side: -1 | 1) => {
    const bx = fx + side * sp;
    const ox = side * 9;
    let y1 = -21, y2 = -21; // y1 = extremo interno, y2 = externo
    if (expression === "surprise") { y1 = -31; y2 = -31; }
    if (expression === "joy") { y1 = -24; y2 = -23; }
    if (expression === "anger") { y1 = -12; y2 = -24; }
    if (expression === "sadness") { y1 = -27; y2 = -17; }
    if (expression === "focus") { y1 = -15; y2 = -19; }
    return (
      <line x1={bx - ox * 0.2} y1={y1} x2={bx + ox} y2={y2} stroke={INK} strokeWidth={5} strokeLinecap="round" />
    );
  };

  const mouth = () => {
    const m = fx;
    switch (expression) {
      case "joy":
        return <path d={`M ${m - 16} 12 Q ${m} 36 ${m + 16} 12 Z`} fill={INK} stroke={INK} strokeWidth={4} strokeLinejoin="round" />;
      case "surprise":
        return <ellipse cx={m} cy={20} rx={8} ry={11} fill={INK} />;
      case "anger":
        return <path d={`M ${m - 14} 24 Q ${m} 10 ${m + 14} 24`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />;
      case "sadness":
        return <path d={`M ${m - 11} 24 Q ${m} 14 ${m + 11} 24`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />;
      case "focus":
        return <path d={`M ${m - 8} 18 L ${m + 9} 16`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />;
      default:
        return <path d={`M ${m - 10} 16 Q ${m} 21 ${m + 10} 16`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />;
    }
  };

  const hairBack = () => {
    switch (c.hairStyle) {
      case "bushy":
        return (
          <g fill={c.hair} stroke={INK} strokeWidth={4}>
            <circle cx={-34} cy={-14} r={30} />
            <circle cx={-26} cy={20} r={26} />
            <circle cx={-6} cy={-38} r={30} />
            <circle cx={24} cy={-34} r={24} />
            <circle cx={-40} cy={30} r={20} />
          </g>
        );
      case "curly":
        return (
          <g fill={c.hair} stroke={INK} strokeWidth={4}>
            {[-40, -20, 0, 20, 36].map((a, i) => (
              <circle key={i} cx={a * 0.9} cy={-40 + Math.abs(a) * 0.35} r={22} />
            ))}
            <circle cx={-44} cy={0} r={22} />
          </g>
        );
      case "curtains":
        return <path d="M -50 -6 Q -52 -52 0 -52 Q 52 -52 50 -6 L 50 40 L 34 40 L 30 -18 L -30 -18 L -34 40 L -50 40 Z" fill={c.hair} stroke={INK} strokeWidth={4} />;
      case "bun":
        return <circle cx={-30} cy={-38} r={18} fill={c.hair} stroke={INK} strokeWidth={4} />;
      default:
        return null;
    }
  };

  const hairFront = () => {
    switch (c.hairStyle) {
      case "messy":
        return (
          <path
            d="M -44 -14 Q -46 -48 -8 -50 Q 34 -54 46 -18 L 34 -30 L 26 -16 L 16 -32 L 4 -18 L -6 -34 L -18 -18 L -26 -32 Z"
            fill={c.hair}
            stroke={INK}
            strokeWidth={4}
            strokeLinejoin="round"
          />
        );
      case "short":
        return <path d="M -44 -12 Q -40 -50 0 -50 Q 40 -50 44 -12 Q 30 -30 0 -30 Q -30 -30 -44 -12 Z" fill={c.hair} stroke={INK} strokeWidth={4} />;
      case "slick":
        return <path d="M -45 -8 Q -44 -50 0 -50 Q 44 -50 45 -8 Q 20 -36 -10 -32 Q -30 -28 -45 -8 Z" fill={c.hair} stroke={INK} strokeWidth={4} />;
      case "curtains":
        return <path d="M -46 -4 Q -40 -50 0 -48 Q 40 -50 46 -4 Q 30 -34 4 -34 L 0 -24 L -4 -34 Q -30 -34 -46 -4 Z" fill={c.hair} stroke={INK} strokeWidth={4} />;
      case "bun":
      case "bushy":
      case "curly":
        return <path d="M -44 -12 Q -38 -48 0 -48 Q 38 -48 44 -12 Q 24 -28 0 -26 Q -24 -28 -44 -12 Z" fill={c.hair} stroke={INK} strokeWidth={4} />;
      default:
        return null;
    }
  };

  const ex = c.extras;
  return (
    <g transform={`translate(${p.x} ${p.y}) rotate(${tilt})`}>
      {ex.includes("longHair") ? <path d="M -46 -10 Q -60 60 -30 90 L 30 90 Q 60 60 46 -10 Z" fill={c.hair} stroke={INK} strokeWidth={4} /> : null}
      {ex.includes("elfEars") ? (
        <g fill={c.head} stroke={INK} strokeWidth={5} strokeLinejoin="round">
          <path d="M -40 -10 L -120 -50 L -44 18 Z" />
          <path d="M 40 -10 L 120 -50 L 44 18 Z" />
        </g>
      ) : null}
      {ex.includes("catFace") ? (
        <g fill="#7a4a2a" stroke={INK} strokeWidth={4} strokeLinejoin="round">
          <path d="M -40 -26 L -34 -76 L -8 -44 Z" />
          <path d="M 40 -26 L 34 -76 L 8 -44 Z" />
        </g>
      ) : null}
      {hairBack()}
      <circle cx={0} cy={0} r={R} fill={c.head} stroke={INK} strokeWidth={6} />
      {hairFront()}
      {ex.includes("bigBeard") ? (
        <path d="M -46 -2 Q -54 66 0 80 Q 54 66 46 -2 Q 30 26 0 26 Q -30 26 -46 -2 Z" fill={c.hair} stroke={INK} strokeWidth={4} />
      ) : null}
      {ex.includes("beard") ? (
        <path d="M -34 8 Q -36 84 4 130 Q 38 84 36 8 Q 0 34 -34 8 Z" fill="#ffffff" stroke={INK} strokeWidth={4} />
      ) : null}
      {ex.includes("bigBeard") ? <ellipse cx={fx} cy={18} rx={17} ry={11} fill={c.head} /> : null}
      {ex.includes("elfEars") ? (
        <g>
          <circle cx={fx - sp} cy={eyeY} r={14} fill="#a8e06a" stroke={INK} strokeWidth={3} />
          <circle cx={fx + sp} cy={eyeY} r={14} fill="#a8e06a" stroke={INK} strokeWidth={3} />
        </g>
      ) : null}
      {/* ojos */}
      {[-1, 1].map((sd) => (
        <ellipse key={sd} cx={fx + sd * sp} cy={eyeY} rx={eyeR} ry={eyeR * eyeScale} fill={INK} />
      ))}
      {brow(-1)}
      {brow(1)}
      {mouth()}
      {ex.includes("catFace") ? (
        <g stroke={INK} strokeWidth={3}>
          <circle cx={0} cy={0} r={44} fill="#a0703f" opacity={0.35} stroke="none" />
          <path d={`M ${fx - 6} 8 L ${fx + 6} 8 L ${fx} 14 Z`} fill="#ff8fb8" />
          <line x1={fx - 10} y1={12} x2={fx - 44} y2={4} />
          <line x1={fx - 10} y1={16} x2={fx - 44} y2={20} />
          <line x1={fx + 10} y1={12} x2={fx + 44} y2={4} />
          <line x1={fx + 10} y1={16} x2={fx + 44} y2={20} />
        </g>
      ) : null}
      {ex.includes("mustache") ? (
        <path d={`M ${fx - 22} 12 Q ${fx} 2 ${fx + 22} 12 Q ${fx} 8 ${fx - 22} 12 Z`} fill={c.hair} stroke={INK} strokeWidth={4} />
      ) : null}
      {ex.includes("glasses") ? (
        <g fill="none" stroke={INK} strokeWidth={3.5}>
          <circle cx={fx - sp} cy={eyeY} r={12} />
          <circle cx={fx + sp} cy={eyeY} r={12} />
          <line x1={fx - sp + 12} y1={eyeY} x2={fx + sp - 12} y2={eyeY} />
        </g>
      ) : null}
      {ex.includes("scar") ? (
        <path d={`M ${fx + 4} -42 L ${fx - 4} -32 L ${fx + 4} -31 L ${fx - 3} -21`} fill="none" stroke="#e23b3b" strokeWidth={3.5} strokeLinejoin="round" />
      ) : null}
      {ex.includes("wizardHat") ? (
        <g stroke={INK} strokeWidth={5} strokeLinejoin="round">
          <path d="M -40 -30 Q 4 -60 50 -30 L 18 -170 Q 10 -100 -40 -30 Z" fill="#6c5ce7" />
          <ellipse cx={4} cy={-32} rx={64} ry={14} fill="#6c5ce7" />
          <path d="M 6 -96 l 5 11 l 12 1 l -9 8 l 3 12 l -11 -6 l -11 6 l 3 -12 l -9 -8 l 12 -1 z" fill="#ffd54a" strokeWidth={2} />
        </g>
      ) : null}
      {ex.includes("witchHat") ? (
        <g stroke={INK} strokeWidth={5} strokeLinejoin="round">
          <path d="M -36 -32 L 30 -32 L 12 -150 Z" fill="#14402a" />
          <ellipse cx={-3} cy={-32} rx={66} ry={13} fill="#14402a" />
          <rect x={-32} y={-52} width={58} height={12} fill={c.color} strokeWidth={3} />
        </g>
      ) : null}
      {ex.includes("turban") ? (
        <g stroke={INK} strokeWidth={4}>
          <path d="M -48 -14 Q -54 -72 0 -76 Q 54 -72 48 -14 Q 0 -34 -48 -14 Z" fill="#7d4bb5" />
          <path d="M -44 -30 Q 0 -56 44 -34" fill="none" stroke="#5a3388" strokeWidth={6} />
          <circle cx={0} cy={-38} r={7} fill={c.color} />
        </g>
      ) : null}
    </g>
  );
};

export const Sparkles: React.FC<{ x: number; y: number; intensity: number; seed: number; count?: number; color?: string }> = ({
  x,
  y,
  intensity,
  seed,
  count = 14,
  color = "#ffe36e",
}) => {
  const frame = useCurrentFrame();
  return (
    <g>
      <circle cx={x} cy={y} r={46 * intensity} fill={color} opacity={0.25 * intensity} />
      <circle cx={x} cy={y} r={20 * intensity} fill="#fffbe0" opacity={0.7 * intensity} />
      {Array.from({ length: count }).map((_, i) => {
        const life = 22;
        const t = ((frame + i * 7 + seed) % life) / life;
        const a = random(`${seed}-a-${i}-${Math.floor((frame + i * 7 + seed) / life)}`) * Math.PI * 2;
        const dist = 20 + t * 120 * intensity;
        const px = x + Math.cos(a) * dist;
        const py = y + Math.sin(a) * dist - t * 20;
        const r = (1 - t) * 14 * intensity;
        return (
          <path
            key={i}
            d={`M ${px} ${py - r} L ${px + r * 0.3} ${py - r * 0.3} L ${px + r} ${py} L ${px + r * 0.3} ${py + r * 0.3} L ${px} ${py + r} L ${px - r * 0.3} ${py + r * 0.3} L ${px - r} ${py} L ${px - r * 0.3} ${py - r * 0.3} Z`}
            fill={i % 3 === 0 ? "#ffffff" : color}
            opacity={1 - t * 0.6}
          />
        );
      })}
    </g>
  );
};
