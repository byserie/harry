import React from "react";
import { random, useCurrentFrame } from "remotion";
import { Pose } from "../lib/pose";
import { CAST, CharId, INK } from "./cast";
import { FONT } from "../lib/font";
import type { Expression } from "./Stickman";

/**
 * Personaje "con cuerpo" (para Avatar): torso con ropa, brazos y piernas con volumen,
 * cara con ojos de verdad, sombras. Usa la misma cinemática (Pose) que los palitos,
 * así funciona con todo el motor de escenas.
 */
export type Body = {
  kind: "human" | "navi";
  skin: string;
  shade: string;
  top: string | null; // null = torso desnudo (piel)
  bottom: string;
  shoes?: string; // humanos
  hair: string;
  hairStyle: "braid" | "buzz" | "short" | "bob" | "bun" | "long" | "bald";
  eye: string;
  female?: boolean;
  mask?: boolean;
  stripes?: string;
  beads?: string;
  headdress?: string;
  paint?: string; // pintura de guerra
  scar?: boolean;
  vest?: string;
  tie?: string;
  glasses?: boolean;
  build?: number; // 0 flaco … 1 ancho
  wheelchair?: boolean; // siempre sentado en silla de ruedas
};

const NAVI = (o: Partial<Body>): Body => ({
  kind: "navi",
  skin: "#4f9be8",
  shade: "#3477c4",
  top: null,
  bottom: "#7a5232",
  hair: "#121218",
  hairStyle: "braid",
  eye: "#f2c230",
  stripes: "#2a5aa8",
  beads: "#e8e2c8",
  ...o,
});
const HUMAN = (o: Partial<Body>): Body => ({
  kind: "human",
  skin: "#f1c9a5",
  shade: "#d6a47c",
  top: "#4a5d3a",
  bottom: "#33402a",
  shoes: "#1e1e22",
  hair: "#3a2a1a",
  hairStyle: "short",
  eye: "#5a7fa8",
  ...o,
});

export const FIGS: Partial<Record<CharId, Body>> = {
  jake: HUMAN({ top: "#3d4a2e", bottom: "#2b3324", hairStyle: "buzz", build: 0.5, wheelchair: true }),
  jakenavi: NAVI({ beads: "#e8e2c8", build: 0.5 }),
  neytiri: NAVI({ skin: "#58aaee", shade: "#3a88d2", female: true, top: "#c9873e", beads: "#e2553a", headdress: "#e2553a" }),
  grace: HUMAN({ female: true, skin: "#f3d6bd", shade: "#dcb393", top: "#b8a274", bottom: "#5c5a48", hair: "#a34e2a", hairStyle: "bob", eye: "#4a8a5a" }),
  gracenavi: NAVI({ female: true, top: "#b8a274", hairStyle: "bob", hair: "#2a1a14" }),
  quaritch: HUMAN({ skin: "#e3ad88", shade: "#c48c66", top: "#56562f", bottom: "#46462a", hair: "#9a9a90", hairStyle: "buzz", eye: "#8a9aaa", scar: true, build: 1 }),
  quaritchnavi: NAVI({ skin: "#4384c4", shade: "#2c64a0", top: "#4c4c2c", vest: "#3a3a24", bottom: "#3e3e2c", hairStyle: "buzz", build: 0.9 }),
  norm: HUMAN({ top: "#3a7ab8", bottom: "#44485a", hair: "#2a1a10", glasses: true }),
  trudy: HUMAN({ female: true, skin: "#d9a07a", shade: "#b87e58", top: "#5c5c38", bottom: "#46462a", hair: "#161010", hairStyle: "bun", eye: "#5a3a2a" }),
  selfridge: HUMAN({ top: "#f2f2f6", tie: "#2a4a8a", bottom: "#33344a", hair: "#c9a050", eye: "#5a7fa8" }),
  eytukan: NAVI({ skin: "#438cd4", shade: "#2c6cb0", beads: "#e0b030", headdress: "#e0b030", build: 0.7 }),
  moat: NAVI({ female: true, skin: "#4a90d8", shade: "#3070b8", top: "#8a4ab0", beads: "#b06ad8", headdress: "#b06ad8" }),
  tsutey: NAVI({ skin: "#3d86d0", shade: "#2a66ac", paint: "#e04a3a", beads: "#e04a3a", build: 0.7 }),
  recom: NAVI({ skin: "#4384c4", shade: "#2c64a0", top: "#4c4c2c", vest: "#3a3a24", bottom: "#3e3e2c", hairStyle: "buzz", paint: "#2a2a24", build: 0.8 }),
  scoresby: HUMAN({ top: "#2a3a5a", bottom: "#2a2a3a", hair: "#9a9a90", hairStyle: "buzz", eye: "#5a7fa8", build: 0.7 }),
  soldado: HUMAN({ top: "#5a5a36", bottom: "#46462a", hairStyle: "buzz", mask: true, build: 0.7 }),
  neteyam: NAVI({ beads: "#e8e2c8", build: 0.4 }),
  loak: NAVI({ beads: "#e0a02a", build: 0.3 }),
  kiri: NAVI({ female: true, skin: "#5aa4e8", top: "#8fd14f", beads: "#8fd14f", hairStyle: "long" }),
  tuk: NAVI({ female: true, top: "#ff8fc7", beads: "#ff8fc7" }),
  spider: HUMAN({ top: null, skin: "#efc59c", shade: "#d4a27a", bottom: "#7a5232", hair: "#d0903a", hairStyle: "long", mask: true, shoes: undefined }),
  tonowari: NAVI({ skin: "#5fb8b0", shade: "#3f9890", stripes: "#2a7a8a", beads: "#1aa3a3", paint: "#1a7a8a", build: 0.8 }),
  ronal: NAVI({ female: true, skin: "#5fb8b0", shade: "#3f9890", stripes: "#2a7a8a", top: "#1a8fa3", beads: "#1a8fa3", headdress: "#1a8fa3" }),
  tsireya: NAVI({ female: true, skin: "#6fc0b8", shade: "#4fa098", stripes: "#2a7a8a", top: "#3ac9b8", beads: "#3ac9b8", hairStyle: "long" }),
  aonung: NAVI({ skin: "#5fb8b0", shade: "#3f9890", stripes: "#2a7a8a", beads: "#1a8f7a", build: 0.4 }),
  varang: NAVI({ female: true, skin: "#5a6a80", shade: "#3e4a5c", stripes: "#2a2a34", top: "#3a1a14", bottom: "#2a1410", beads: "#c0392b", headdress: "#c0392b", paint: "#c0392b", eye: "#ff7a2a" }),
};

type P = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;
const down = (a: number): P => ({ x: Math.sin(rad(a)), y: Math.cos(rad(a)) });
const add = (p: P, d: P, k: number): P => ({ x: p.x + d.x * k, y: p.y + d.y * k });
const OUT = 5.5; // grosor del contorno

/** Aclara (k>0) u oscurece (k<0) un color hex. */
export const tone = (hex: string, k: number) => {
  const n = parseInt(hex.replace("#", "").slice(0, 6), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => Math.round(k > 0 ? c + (255 - c) * k : c * (1 + k)));
  return `#${ch.map((c) => Math.max(0, Math.min(255, c)).toString(16).padStart(2, "0")).join("")}`;
};

/** Segmento con volumen: contorno, relleno, luz de un lado y sombra del otro. */
const Seg: React.FC<{ a: P; b: P; w: number; col: string }> = ({ a, b, w, col }) => {
  const dx = b.x - a.x, dy = b.y - a.y;
  const L = Math.hypot(dx, dy) || 1;
  const px = -dy / L, py = dx / L;
  const o = w * 0.24;
  return (
    <>
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={INK} strokeWidth={w + OUT} strokeLinecap="round" />
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={col} strokeWidth={w} strokeLinecap="round" />
      <line x1={a.x + px * o} y1={a.y + py * o} x2={b.x + px * o} y2={b.y + py * o} stroke={tone(col, -0.28)} strokeWidth={w * 0.34} strokeLinecap="round" opacity={0.7} />
      <line x1={a.x - px * o * 1.1} y1={a.y - py * o * 1.1} x2={b.x - px * o * 1.1} y2={b.y - py * o * 1.1} stroke={tone(col, 0.35)} strokeWidth={w * 0.18} strokeLinecap="round" opacity={0.75} />
    </>
  );
};

/** Mano con pulgar y dedos. */
const Hand: React.FC<{ p: P; r: number; col: string; dir: P }> = ({ p, r, col, dir }) => {
  const a = (Math.atan2(dir.y, dir.x) * 180) / Math.PI - 90;
  return (
    <g transform={`translate(${p.x} ${p.y}) rotate(${a})`}>
      <ellipse cx={r * 0.55} cy={r * 0.1} rx={r * 0.38} ry={r * 0.26} fill={col} stroke={INK} strokeWidth={3.5} transform={`rotate(-35 ${r * 0.55} ${r * 0.1})`} />
      <path d={`M ${-r * 0.75} ${-r * 0.2} Q ${-r * 0.9} ${r * 1.15} 0 ${r * 1.25} Q ${r * 0.9} ${r * 1.15} ${r * 0.75} ${-r * 0.2} Q 0 ${-r * 0.75} ${-r * 0.75} ${-r * 0.2} Z`} fill={col} stroke={INK} strokeWidth={4} />
      {[-0.35, 0, 0.35].map((k, i) => (
        <line key={i} x1={k * r} y1={r * 0.55} x2={k * r * 1.1} y2={r * 1.05} stroke={tone(col, -0.35)} strokeWidth={2.5} strokeLinecap="round" />
      ))}
      <ellipse cx={-r * 0.25} cy={r * 0.25} rx={r * 0.25} ry={r * 0.35} fill={tone(col, 0.3)} opacity={0.6} />
    </g>
  );
};

type Props = {
  who: CharId;
  x: number;
  y: number;
  scale?: number;
  facing?: 1 | -1;
  pose: Pose;
  expression?: Expression;
  showName?: boolean;
  opacity?: number;
  rotate?: number;
  holding?: React.ReactNode;
  stone?: boolean;
  talking?: boolean;
  mask?: boolean;
  say?: string | null;
  sayK?: number;
};

export const Figure: React.FC<Props> = ({ who, x, y, scale = 2, facing = 1, pose: pose0, expression = "neutral", showName = true, opacity = 1, rotate = 0, holding, stone = false, talking = false, mask, say = null, sayK = 0 }) => {
  const frame = useCurrentFrame();
  const c = CAST[who];
  const b0 = FIGS[who]!;
  const b = mask === undefined ? b0 : { ...b0, mask };
  const chair = !!b.wheelchair;
  // en silla: muslos hacia adelante, rodillas dobladas, sin caminar ni saltar
  const seed0 = who.length * 13 + c.name.charCodeAt(0);
  // vida: respiración, balanceo de brazos, cabeza que se mueve; al hablar, gestos y cabeceo
  const f0 = frame + seed0 * 11;
  const still = Math.abs(pose0.rHip) < 25 && Math.abs(pose0.lHip) < 25;
  const gest = talking ? Math.sin(f0 * 0.22) : 0;
  const live = {
    ...pose0,
    rSh: pose0.rSh + (still ? 5 * Math.sin(f0 * 0.06) + 22 * gest : 0),
    rEl: pose0.rEl + (still ? 6 * Math.sin(f0 * 0.05 + 1) + 30 * Math.max(0, gest) : 0),
    lSh: pose0.lSh + (still ? -4 * Math.sin(f0 * 0.055 + 2) + (talking ? 10 * Math.sin(f0 * 0.17 + 1) : 0) : 0),
    lEl: pose0.lEl + (still ? 5 * Math.sin(f0 * 0.045) : 0),
    lean: pose0.lean + (still ? 1.6 * Math.sin(f0 * 0.04) : 0),
    headTilt: pose0.headTilt + 3 * Math.sin(f0 * 0.035) + (talking ? 4 * Math.sin(f0 * 0.5) : 0),
    bob: pose0.bob + (still ? 2.2 * Math.sin(f0 * 0.09) : 0),
  };
  const pose = chair ? { ...live, rHip: 88, rKn: 88, lHip: 84, lKn: 86, lean: Math.max(-4, Math.min(6, live.lean)), bob: 0 } : live;
  const navi = b.kind === "navi";
  const s = scale * c.height * 0.76;
  const seed = who.length * 13 + c.name.charCodeAt(0);
  const build = b.build ?? 0.3;

  // proporciones: los na'vi son más estilizados (piernas largas, cuello largo, cabeza chica)
  const TH = navi ? 92 : 80, SH = navi ? 92 : 78, TORSO = navi ? 118 : 116, NECK = navi ? 22 : 12;
  const UA = navi ? 68 : 60, FA = navi ? 66 : 58;
  const HR = navi ? 40 : 44; // radio de la cabeza
  const limbW = navi ? 17 : 22, legW = navi ? 21 : 26;

  const hip0: P = { x: 0, y: 0 };
  const kneeR = add(hip0, down(pose.rHip), TH);
  const ankR = add(kneeR, down(pose.rHip - pose.rKn), SH);
  const kneeL = add(hip0, down(pose.lHip), TH);
  const ankL = add(kneeL, down(pose.lHip - pose.lKn), SH);
  const ground = Math.max(ankR.y, ankL.y) + (chair ? 40 : 10);
  const off = -ground + pose.bob;
  const sh = (p: P): P => ({ x: p.x, y: p.y + off });
  const hip = sh(hip0), kR = sh(kneeR), aR = sh(ankR), kL = sh(kneeL), aL = sh(ankL);
  const up: P = { x: Math.sin(rad(pose.lean)), y: -Math.cos(rad(pose.lean)) };
  const shoulder = add(hip, up, TORSO);
  const neck = add(shoulder, up, NECK);
  const head = add(neck, up, HR + 4);
  // torso (antes de los miembros: brazos y piernas salen de los costados)
  const perp: P = { x: -up.y, y: up.x };
  const shW = (navi ? 34 : 38) + build * 14;
  const waW = (navi ? 20 : 30) + build * 8;
  const hpW = (navi ? 28 : 32) + build * 8 + (b.female ? 6 : 0);
  const shR = add(add(shoulder, perp, shW * 0.72), up, -6);
  const shL = add(add(shoulder, perp, -shW * 0.72), up, -6);
  const hipR = add(hip, perp, hpW * 0.42);
  const hipL = add(hip, perp, -hpW * 0.42);
  const elbR = add(shR, down(pose.rSh), UA);
  const handR = add(elbR, down(pose.rSh + pose.rEl), FA);
  const elbL = add(shL, down(pose.lSh), UA);
  const handL = add(elbL, down(pose.lSh + pose.lEl), FA);
  const kRr: P = { x: kR.x + hipR.x - hip.x, y: kR.y }, aRr: P = { x: aR.x + hipR.x - hip.x, y: aR.y };
  const kLl: P = { x: kL.x + hipL.x - hip.x, y: kL.y }, aLl: P = { x: aL.x + hipL.x - hip.x, y: aL.y };

  const sleeve = b.top ?? b.skin;
  const pantsLong = !navi && b.bottom !== b.skin;
  const thigh = navi ? b.skin : b.bottom;
  const shin = pantsLong ? b.bottom : b.skin;

  const arm = (sh0: P, el: P, hd: P, far: boolean) => (
    <g opacity={far ? 0.96 : 1}>
      <Seg a={sh0} b={el} w={limbW + 2} col={!navi && b.top ? sleeve : b.skin} />
      <Seg a={el} b={hd} w={limbW} col={b.skin} />
      <Hand p={hd} r={limbW * 0.72} col={b.skin} dir={{ x: hd.x - el.x, y: hd.y - el.y }} />
      {navi && b.beads ? <circle cx={el.x * 0.4 + hd.x * 0.6} cy={el.y * 0.4 + hd.y * 0.6} r={limbW * 0.5} fill="none" stroke={b.beads} strokeWidth={5} /> : null}
    </g>
  );
  const leg = (k: P, a: P, h0: P) => (
    <g>
      <Seg a={h0} b={k} w={legW + 3} col={thigh} />
      <Seg a={k} b={a} w={legW - 2} col={shin} />
      {navi ? (
        <ellipse cx={a.x + 12} cy={a.y + 2} rx={20} ry={9} fill={b.skin} stroke={INK} strokeWidth={4} />
      ) : (
        <path d={`M ${a.x - 12} ${a.y - 8} L ${a.x + 26} ${a.y - 4} Q ${a.x + 32} ${a.y + 8} ${a.x + 20} ${a.y + 10} L ${a.x - 12} ${a.y + 10} Z`} fill={b.shoes ?? b.skin} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      )}
    </g>
  );

  // torso
  const pt = (base: P, w: number, side: number) => add(base, perp, w * side);
  const waist = add(hip, up, TORSO * 0.42);
  const torsoPath = `M ${pt(shoulder, shW, -1).x} ${pt(shoulder, shW, -1).y}
    Q ${pt(waist, waW, -1).x} ${pt(waist, waW, -1).y} ${pt(hip, hpW, -1).x} ${pt(hip, hpW, -1).y}
    L ${pt(hip, hpW, 1).x} ${pt(hip, hpW, 1).y}
    Q ${pt(waist, waW, 1).x} ${pt(waist, waW, 1).y} ${pt(shoulder, shW, 1).x} ${pt(shoulder, shW, 1).y}
    Q ${shoulder.x + up.x * 10} ${shoulder.y + up.y * 10} ${pt(shoulder, shW, -1).x} ${pt(shoulder, shW, -1).y} Z`;
  const beltY = add(hip, up, 14);
  const sway = Math.sin(frame * 0.12 + seed) * 6;

  // cola na'vi
  const tail = navi ? (
    <g>
      <path d={`M ${hip.x - 10} ${hip.y - 6} Q ${hip.x - 70} ${hip.y + 30 + sway} ${hip.x - 60 + sway} ${hip.y + 120} Q ${hip.x - 50} ${hip.y + 160} ${hip.x - 80 - sway} ${hip.y + 170}`} stroke={INK} strokeWidth={17} fill="none" strokeLinecap="round" />
      <path d={`M ${hip.x - 10} ${hip.y - 6} Q ${hip.x - 70} ${hip.y + 30 + sway} ${hip.x - 60 + sway} ${hip.y + 120} Q ${hip.x - 50} ${hip.y + 160} ${hip.x - 80 - sway} ${hip.y + 170}`} stroke={b.skin} strokeWidth={10} fill="none" strokeLinecap="round" />
    </g>
  ) : null;

  // trenza (detrás de la cabeza)
  const braid =
    b.hairStyle === "braid" || b.hairStyle === "long" ? (
      <g>
        <path d={`M ${head.x - HR * 0.6} ${head.y} Q ${head.x - HR - 18} ${head.y + 90} ${head.x - HR - 4 + sway} ${head.y + (b.hairStyle === "long" ? 150 : 210)}`} stroke={INK} strokeWidth={b.hairStyle === "long" ? 44 : 22} fill="none" strokeLinecap="round" />
        <path d={`M ${head.x - HR * 0.6} ${head.y} Q ${head.x - HR - 18} ${head.y + 90} ${head.x - HR - 4 + sway} ${head.y + (b.hairStyle === "long" ? 150 : 210)}`} stroke={b.hair} strokeWidth={b.hairStyle === "long" ? 36 : 14} fill="none" strokeLinecap="round" />
        {b.hairStyle === "braid"
          ? [0.3, 0.5, 0.7, 0.9].map((k, i) => (
              <circle key={i} cx={head.x - HR - 10 + sway * k} cy={head.y + 210 * k} r={4} fill={b.beads ?? "#e8e2c8"} />
            ))
          : null}
      </g>
    ) : null;

  const labelX = x + facing * head.x * s;
  const labelY = y + (head.y - HR - (b.headdress ? 70 : 40)) * s;

  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute", left: 0, top: 0, overflow: "visible", opacity, filter: stone ? "grayscale(1) brightness(1.15)" : undefined }}>
      <ellipse cx={x} cy={y + 4} rx={62 * s} ry={11 * s} fill="rgba(0,0,0,0.25)" />
      <g transform={`translate(${x} ${y}) scale(${facing * s} ${s}) rotate(${rotate} 0 ${-(TH + SH)})`}>
        {chair ? (
          <g>
            {/* respaldo y rueda grande (detrás del cuerpo) */}
            <path d={`M ${hip.x - 34} ${hip.y + 6} L ${hip.x - 40} ${hip.y - 110} L ${hip.x - 26} ${hip.y - 116}`} stroke="#2a2a30" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x={hip.x - 46} y={hip.y - 100} width={22} height={80} rx={6} fill="#3a4a6a" stroke={INK} strokeWidth={4} />
            <circle cx={hip.x - 6} cy={hip.y + 40} r={62} fill="none" stroke={INK} strokeWidth={14} />
            <circle cx={hip.x - 6} cy={hip.y + 40} r={62} fill="none" stroke="#5a5a66" strokeWidth={7} />
            <circle cx={hip.x - 6} cy={hip.y + 40} r={50} fill="none" stroke="#9a9aa8" strokeWidth={3} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={i} x1={hip.x - 6} y1={hip.y + 40} x2={hip.x - 6 + Math.cos(i * 1.047 + frame * 0.02) * 50} y2={hip.y + 40 + Math.sin(i * 1.047 + frame * 0.02) * 50} stroke="#8a8a96" strokeWidth={3} />
            ))}
            <circle cx={hip.x - 6} cy={hip.y + 40} r={8} fill="#2a2a30" />
          </g>
        ) : null}
        {tail}
        {braid}
        {arm(shL, elbL, handL, true)}
        {leg(kLl, aLl, hipL)}
        {/* cuello */}
        <Seg a={shoulder} b={neck} w={navi ? 16 : 20} col={b.skin} />
        {/* torso */}
        <defs>
          <linearGradient id={`tg-${who}`} x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0" stopColor={tone(b.top ?? b.skin, -0.22)} />
            <stop offset="0.55" stopColor={b.top ?? b.skin} />
            <stop offset="1" stopColor={tone(b.top ?? b.skin, 0.22)} />
          </linearGradient>
        </defs>
        <path d={torsoPath} fill={`url(#tg-${who})`} stroke={INK} strokeWidth={OUT} strokeLinejoin="round" />
        {/* músculos / pliegues */}
        {!b.female && !b.top ? (
          <g stroke={tone(b.skin, -0.3)} strokeWidth={3.5} fill="none" strokeLinecap="round" opacity={0.7}>
            <path d={`M ${shoulder.x - shW * 0.55} ${shoulder.y + 34} Q ${shoulder.x - shW * 0.2} ${shoulder.y + 52} ${shoulder.x} ${shoulder.y + 36}`} />
            <path d={`M ${shoulder.x + shW * 0.55} ${shoulder.y + 34} Q ${shoulder.x + shW * 0.2} ${shoulder.y + 52} ${shoulder.x} ${shoulder.y + 36}`} />
            <path d={`M ${waist.x} ${waist.y - 30} L ${waist.x} ${waist.y + 20}`} />
          </g>
        ) : null}
        {b.top && !navi ? (
          <g stroke={tone(b.top, -0.3)} strokeWidth={3} fill="none" opacity={0.8}>
            <path d={`M ${shoulder.x - 10} ${shoulder.y + 6} L ${shoulder.x} ${shoulder.y + 26} L ${shoulder.x + 10} ${shoulder.y + 6}`} />
            <rect x={shoulder.x + shW * 0.25} y={shoulder.y + 30} width={18} height={14} rx={3} />
          </g>
        ) : null}
        {/* sombra lateral del torso */}
        <path d={torsoPath} fill="rgba(0,0,0,0.13)" stroke="none" clipPath="none" transform={`translate(${-perp.x * shW * 0.9} ${-perp.y * shW * 0.9})`} opacity={0.0} />
        <path
          d={`M ${pt(shoulder, shW * 0.15, -1).x} ${pt(shoulder, shW * 0.15, -1).y} Q ${pt(waist, waW * 0.5, -1).x} ${pt(waist, waW * 0.5, -1).y} ${pt(hip, hpW * 0.3, -1).x} ${pt(hip, hpW * 0.3, -1).y} L ${pt(hip, hpW * 0.95, -1).x} ${pt(hip, hpW * 0.95, -1).y} Q ${pt(waist, waW * 0.95, -1).x} ${pt(waist, waW * 0.95, -1).y} ${pt(shoulder, shW * 0.95, -1).x} ${pt(shoulder, shW * 0.95, -1).y} Z`}
          fill="rgba(0,0,0,0.14)"
        />
        {b.vest ? <path d={`M ${pt(shoulder, shW * 0.7, -1).x} ${pt(shoulder, shW * 0.7, -1).y} L ${pt(hip, hpW * 0.8, -1).x} ${pt(hip, hpW * 0.8, -1).y} L ${pt(hip, hpW * 0.8, 1).x} ${pt(hip, hpW * 0.8, 1).y} L ${pt(shoulder, shW * 0.7, 1).x} ${pt(shoulder, shW * 0.7, 1).y} Z`} fill={b.vest} stroke={INK} strokeWidth={4} opacity={0.95} /> : null}
        {b.tie ? <path d={`M ${shoulder.x} ${shoulder.y + 4} l -7 14 l 7 60 l 7 -60 Z`} fill={b.tie} stroke={INK} strokeWidth={3} /> : null}
        {/* rayas na'vi en el pecho */}
        {navi && b.stripes && !b.top ? (
          <g stroke={b.stripes} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.75}>
            <path d={`M ${pt(shoulder, shW * 0.6, 1).x} ${pt(shoulder, shW * 0.6, 1).y + 20} q -10 30 -2 60`} />
            <path d={`M ${pt(shoulder, shW * 0.2, -1).x} ${pt(shoulder, shW * 0.2, -1).y + 30} q 8 28 0 54`} />
          </g>
        ) : null}
        {/* top de mujer na'vi / collar */}
        {navi && b.female && b.top ? <path d={`M ${pt(shoulder, shW, -1).x} ${shoulder.y + 34} Q ${shoulder.x} ${shoulder.y + 58} ${pt(shoulder, shW, 1).x} ${shoulder.y + 34}`} stroke={b.beads ?? INK} strokeWidth={6} fill="none" /> : null}
        {navi && b.beads ? (
          <path d={`M ${pt(shoulder, shW * 0.8, -1).x} ${shoulder.y + 4} Q ${shoulder.x} ${shoulder.y + 40} ${pt(shoulder, shW * 0.8, 1).x} ${shoulder.y + 4}`} stroke={b.beads} strokeWidth={7} fill="none" strokeDasharray="2 9" strokeLinecap="round" />
        ) : null}
        {/* cinturón / taparrabos */}
        {navi ? (
          <g>
            <path d={`M ${pt(beltY, hpW + 2, -1).x} ${beltY.y} L ${pt(beltY, hpW + 2, 1).x} ${beltY.y} L ${pt(hip, hpW, 1).x} ${hip.y + 14} L ${hip.x + 10} ${hip.y + 60} L ${hip.x - 6} ${hip.y + 20} L ${pt(hip, hpW, -1).x} ${hip.y + 14} Z`} fill={b.bottom} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          </g>
        ) : (
          <g>
            <path d={`M ${pt(beltY, hpW, -1).x} ${beltY.y} L ${pt(beltY, hpW, 1).x} ${beltY.y} L ${pt(hip, hpW, 1).x} ${hip.y + 12} L ${pt(hip, hpW, -1).x} ${hip.y + 12} Z`} fill={b.bottom} stroke={INK} strokeWidth={5} />
            <line x1={pt(beltY, hpW, -1).x} y1={beltY.y + 3} x2={pt(beltY, hpW, 1).x} y2={beltY.y + 3} stroke="#2a2018" strokeWidth={6} />
          </g>
        )}
        {leg(kRr, aRr, hipR)}
        {chair ? (
          <g>
            {/* asiento, apoyapiés y ruedita delantera */}
            <rect x={hip.x - 40} y={hip.y + 4} width={100} height={14} rx={5} fill="#3a4a6a" stroke={INK} strokeWidth={4} />
            <path d={`M ${hip.x + 50} ${hip.y + 16} L ${aR.x + 6} ${aR.y + 14} L ${aR.x + 40} ${aR.y + 14}`} stroke="#2a2a30" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={aR.x + 2} cy={aR.y + 36} r={14} fill="#3a3a44" stroke={INK} strokeWidth={4} />
          </g>
        ) : null}
        <Face b={b} c={{ name: c.name }} p={head} HR={HR} turn={pose.headTurn} tilt={pose.headTilt} expression={expression} seed={seed} talking={talking} />
        {arm(shR, elbR, handR, false)}
        {holding ? <g transform={`translate(${handR.x} ${handR.y})`}>{holding}</g> : null}
      </g>
      {showName && !say ? <Tag x={labelX} y={labelY} name={c.name} color={c.color} /> : null}
      {say ? <Bubble x={labelX} y={labelY + 20} text={say} k={sayK} color={c.color} name={c.name} /> : null}
    </svg>
  );
};

/** Globo de diálogo sobre la cabeza. */
const Bubble: React.FC<{ x: number; y: number; text: string; k: number; color: string; name: string }> = ({ x, y, text, k, color, name }) => {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const wd of words) {
    if ((cur + " " + wd).trim().length > 22) {
      lines.push(cur.trim());
      cur = wd;
    } else cur += " " + wd;
  }
  if (cur.trim()) lines.push(cur.trim());
  const w = Math.max(...lines.map((l) => l.length)) * 21 + 60;
  const h = lines.length * 46 + 34;
  const bx = Math.max(-380 + w / 2, Math.min(1460 - w / 2, x));
  return (
    <g transform={`translate(${bx} ${y - h - 30}) scale(${0.6 + 0.4 * k})`} opacity={k}>
      <path d={`M ${-w / 2 + 24} 0 H ${w / 2 - 24} Q ${w / 2} 0 ${w / 2} 24 V ${h - 24} Q ${w / 2} ${h} ${w / 2 - 24} ${h} H ${Math.min(30, w / 2 - 30) + (x - bx)} L ${x - bx} ${h + 34} L ${Math.max(-30, -w / 2 + 30) + (x - bx) + 20} ${h} H ${-w / 2 + 24} Q ${-w / 2} ${h} ${-w / 2} ${h - 24} V 24 Q ${-w / 2} 0 ${-w / 2 + 24} 0 Z`} fill="#ffffff" stroke={INK} strokeWidth={5} />
      <rect x={-w / 2 + 16} y={-22} width={name.length * 17 + 28} height={36} rx={18} fill={color} stroke={INK} strokeWidth={4} />
      <text x={-w / 2 + 30} y={4} fontFamily={FONT} fontWeight={700} fontSize={24} fill="#fff">{name}</text>
      {lines.map((l, i) => (
        <text key={i} x={0} y={52 + i * 46} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={38} fill={INK}>
          {l}
        </text>
      ))}
    </g>
  );
};

const Tag: React.FC<{ x: number; y: number; name: string; color: string }> = ({ x, y, name, color }) => {
  const w = name.length * 23 + 40;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-30} width={w} height={56} rx={28} fill={color} stroke={INK} strokeWidth={5} />
      <text x={0} y={10} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill="#ffffff" stroke={INK} strokeWidth={0.5}>
        {name}
      </text>
    </g>
  );
};

const Face: React.FC<{ b: Body; c: { name: string }; p: P; HR: number; turn: number; tilt: number; expression: Expression; seed: number; talking?: boolean }> = ({ b, p, HR, turn, tilt, expression, seed, talking = false }) => {
  const frame = useCurrentFrame();
  const navi = b.kind === "navi";
  const period = 90 + Math.floor(random(seed) * 40);
  const ph = (frame + seed * 7) % period;
  const blink = expression === "sleep" ? 1 : ph < 5 ? 1 - Math.abs(ph - 2.5) / 2.5 : 0;
  const fx = turn * 14;
  const rx = HR * (navi ? 0.86 : 0.95);
  const ry = HR * (navi ? 1.12 : 1.05);
  const eyeSp = navi ? 17 : 16;
  const eyeRx = navi ? 11 : 8.5;
  const eyeRy = (navi ? 12 : 10) * (1 - blink * 0.92) * (expression === "surprise" ? 1.3 : expression === "focus" ? 0.7 : 1);
  const eyeY = navi ? -6 : -4;

  const brow = (side: -1 | 1) => {
    const bx = fx + side * eyeSp;
    let y1 = -22, y2 = -22;
    if (expression === "surprise") { y1 = -32; y2 = -32; }
    if (expression === "anger") { y1 = -13; y2 = -25; }
    if (expression === "sadness") { y1 = -28; y2 = -18; }
    if (expression === "focus") { y1 = -16; y2 = -20; }
    if (expression === "joy") { y1 = -25; y2 = -24; }
    return <path d={`M ${bx - side * 3} ${y1 + eyeY + 4} L ${bx + side * 13} ${y2 + eyeY + 4}`} stroke={navi ? "#1c2a4a" : b.hair} strokeWidth={6} strokeLinecap="round" />;
  };
  const mouth = () => {
    const m = fx * 1.05;
    const my = navi ? 26 : 22;
    if (talking && expression !== "sleep") {
      const o = Math.abs(Math.sin(frame * 0.85 + seed)) * 0.8 + 0.15 * Math.abs(Math.sin(frame * 2.1));
      return <ellipse cx={m} cy={my + 2} rx={11 - o * 2} ry={2 + o * 10} fill="#6a1a2a" stroke={INK} strokeWidth={4} />;
    }
    switch (expression) {
      case "joy":
        return <path d={`M ${m - 15} ${my - 4} Q ${m} ${my + 16} ${m + 15} ${my - 4} Z`} fill="#6a1a2a" stroke={INK} strokeWidth={4} strokeLinejoin="round" />;
      case "surprise":
        return <ellipse cx={m} cy={my + 2} rx={8} ry={11} fill="#6a1a2a" stroke={INK} strokeWidth={4} />;
      case "anger":
        return (
          <g>
            <path d={`M ${m - 15} ${my + 4} Q ${m} ${my - 8} ${m + 15} ${my + 4} L ${m + 15} ${my + 8} L ${m - 15} ${my + 8} Z`} fill="#fff" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
            {navi ? <path d={`M ${m - 9} ${my + 2} l 3 7 l 3 -7 M ${m + 3} ${my + 2} l 3 7 l 3 -7`} stroke={INK} strokeWidth={2} fill="#fff" /> : null}
          </g>
        );
      case "sadness":
        return <path d={`M ${m - 11} ${my + 6} Q ${m} ${my - 4} ${m + 11} ${my + 6}`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />;
      case "focus":
        return <path d={`M ${m - 9} ${my + 2} L ${m + 10} ${my}`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />;
      default:
        return <path d={`M ${m - 10} ${my} Q ${m} ${my + 6} ${m + 10} ${my}`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />;
    }
  };

  const eye = (side: -1 | 1) => {
    const ex = fx + side * eyeSp;
    return (
      <g>
        <ellipse cx={ex} cy={eyeY} rx={eyeRx} ry={Math.max(1, eyeRy)} fill={navi ? b.eye : "#ffffff"} stroke={INK} strokeWidth={3.5} />
        {eyeRy > 3 ? (
          <>
            {!navi ? <circle cx={ex + turn * 3} cy={eyeY + 1} r={5.2} fill={b.eye} /> : null}
            <circle cx={ex + turn * 3} cy={eyeY + 1} r={navi ? 3.6 : 2.8} fill={INK} />
            <circle cx={ex + turn * 3 - 2.5} cy={eyeY - 3} r={2.2} fill="#fff" />
          </>
        ) : null}
      </g>
    );
  };

  // orejas
  const earX = -rx * 0.75 + fx * 0.3;
  const ear = navi ? (
    <g>
      <path d={`M ${earX} ${-6} Q ${earX - 34} ${-40} ${earX - 26} ${-70} Q ${earX - 4} ${-40} ${earX + 10} ${-14} Z`} fill={b.skin} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <path d={`M ${earX - 2} ${-14} Q ${earX - 22} ${-38} ${earX - 22} ${-58} Q ${earX - 6} ${-38} ${earX + 4} ${-18} Z`} fill={tone(b.skin, -0.25)} />
    </g>
  ) : (
    <ellipse cx={earX - 2} cy={2} rx={8} ry={12} fill={b.skin} stroke={INK} strokeWidth={4} />
  );

  const hair = () => {
    switch (b.hairStyle) {
      case "buzz":
        return <path d={`M ${-rx} ${-8} Q ${-rx} ${-ry - 4} 0 ${-ry - 4} Q ${rx} ${-ry - 4} ${rx} ${-8} Q ${rx * 0.6} ${-ry * 0.62} 0 ${-ry * 0.66} Q ${-rx * 0.7} ${-ry * 0.62} ${-rx} ${-8} Z`} fill={b.hair} stroke={INK} strokeWidth={4} />;
      case "short":
        return <path d={`M ${-rx - 2} ${-2} Q ${-rx - 6} ${-ry - 10} 4 ${-ry - 8} Q ${rx + 6} ${-ry - 6} ${rx + 2} ${-10} L ${rx * 0.4} ${-ry * 0.6} L ${rx * 0.1} ${-ry * 0.5} L ${-rx * 0.3} ${-ry * 0.62} Q ${-rx * 0.8} ${-ry * 0.4} ${-rx - 2} ${-2} Z`} fill={b.hair} stroke={INK} strokeWidth={4} strokeLinejoin="round" />;
      case "bob":
        return <path d={`M ${-rx - 6} ${30} Q ${-rx - 12} ${-ry - 10} 0 ${-ry - 8} Q ${rx + 12} ${-ry - 10} ${rx + 6} ${16} Q ${rx * 0.5} ${-ry * 0.5} ${-rx * 0.2} ${-ry * 0.58} Q ${-rx * 0.6} ${-10} ${-rx * 0.65} ${32} Z`} fill={b.hair} stroke={INK} strokeWidth={4} strokeLinejoin="round" />;
      case "bun":
        return (
          <g fill={b.hair} stroke={INK} strokeWidth={4}>
            <circle cx={-rx * 0.6} cy={-ry * 0.95} r={16} />
            <path d={`M ${-rx} ${-4} Q ${-rx} ${-ry - 4} 0 ${-ry - 4} Q ${rx} ${-ry - 4} ${rx} ${-6} Q ${rx * 0.4} ${-ry * 0.7} ${-rx * 0.6} ${-ry * 0.5} Z`} />
          </g>
        );
      case "braid":
      case "long":
        return <path d={`M ${-rx - 3} ${6} Q ${-rx - 6} ${-ry - 8} 0 ${-ry - 6} Q ${rx + 4} ${-ry - 6} ${rx + 1} ${-14} Q ${rx * 0.3} ${-ry * 0.75} ${-rx * 0.45} ${-ry * 0.55} Q ${-rx * 0.8} ${-ry * 0.2} ${-rx - 3} ${6} Z`} fill={b.hair} stroke={INK} strokeWidth={4} strokeLinejoin="round" />;
      default:
        return null;
    }
  };

  return (
    <g transform={`translate(${p.x} ${p.y}) rotate(${tilt})`}>
      {ear}
      <ellipse cx={0} cy={0} rx={rx} ry={ry} fill={b.skin} stroke={INK} strokeWidth={OUT} />
      {/* sombra de la cara */}
      <path d={`M ${-rx * 0.2} ${-ry} Q ${-rx * 1.15} ${0} ${-rx * 0.2} ${ry} Q ${-rx * 0.95} ${0} ${-rx * 0.2} ${-ry} Z`} fill={b.shade} opacity={0.0} />
      <ellipse cx={-rx * 0.45} cy={ry * 0.1} rx={rx * 0.5} ry={ry * 0.85} fill="rgba(0,0,0,0.09)" />
      <ellipse cx={rx * 0.3} cy={-ry * 0.45} rx={rx * 0.35} ry={ry * 0.22} fill="#ffffff" opacity={0.14} />
      {/* mejillas */}
      <ellipse cx={fx - 26} cy={12} rx={10} ry={6} fill={navi ? tone(b.skin, -0.2) : "#e88a8a"} opacity={0.45} />
      <ellipse cx={fx + 26} cy={12} rx={10} ry={6} fill={navi ? tone(b.skin, -0.2) : "#e88a8a"} opacity={0.45} />
      {/* rayas y pecas fosforescentes na'vi */}
      {navi && b.stripes ? (
        <g stroke={b.stripes} strokeWidth={4.5} fill="none" strokeLinecap="round" opacity={0.8}>
          <path d={`M ${fx - 4} ${-ry * 0.9} q -6 18 -2 34`} />
          <path d={`M ${fx + 14} ${-ry * 0.85} q 4 16 2 30`} />
          <path d={`M ${fx - 24} ${-ry * 0.75} q -6 16 -4 28`} />
          <path d={`M ${fx + rx * 0.55} ${10} q 6 10 2 22`} />
        </g>
      ) : null}
      {navi
        ? [0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={fx - 22 + i * 11 + (i % 2) * 3} cy={8 + (i % 2) * 6} r={2.2} fill="#bff4ff" opacity={0.9} />
          ))
        : null}
      {b.paint ? <path d={`M ${fx - 34} ${-2} L ${fx - 8} ${4} M ${fx + 8} ${4} L ${fx + 34} ${-2}`} stroke={b.paint} strokeWidth={6} strokeLinecap="round" /> : null}
      {hair()}
      {b.headdress ? (
        <g>
          <path d={`M ${-rx} ${-ry * 0.55} Q 0 ${-ry * 0.85} ${rx} ${-ry * 0.55}`} stroke={b.headdress} strokeWidth={7} fill="none" strokeDasharray="3 8" strokeLinecap="round" />
          {[-1, 0, 1].map((k) => (
            <path key={k} d={`M ${k * 16} ${-ry - 2} q ${k * 8 - 4} -40 ${k * 14} -64`} stroke={INK} strokeWidth={11} fill="none" strokeLinecap="round" />
          ))}
          {[-1, 0, 1].map((k) => (
            <path key={`f${k}`} d={`M ${k * 16} ${-ry - 2} q ${k * 8 - 4} -40 ${k * 14} -64`} stroke={b.headdress} strokeWidth={6} fill="none" strokeLinecap="round" />
          ))}
        </g>
      ) : null}
      {eye(-1)}
      {eye(1)}
      {brow(-1)}
      {brow(1)}
      {/* nariz */}
      {navi ? (
        <path d={`M ${fx + 2} ${-4} L ${fx + 6} ${12} Q ${fx} ${17} ${fx - 7} ${12}`} fill="none" stroke={b.stripes ?? INK} strokeWidth={4} strokeLinecap="round" />
      ) : (
        <path d={`M ${fx + 4} ${2} Q ${fx + 9} ${12} ${fx + 2} ${13}`} fill="none" stroke={b.shade} strokeWidth={4} strokeLinecap="round" />
      )}
      {mouth()}
      {b.scar ? <path d={`M ${fx - 26} ${-30} L ${fx - 8} ${10} M ${fx - 22} ${-18} l 6 -3 M ${fx - 17} ${-6} l 6 -3`} stroke="#b05a4a" strokeWidth={3.5} strokeLinecap="round" /> : null}
      {b.glasses ? (
        <g stroke={INK} strokeWidth={3.5} fill="rgba(255,255,255,0.15)">
          <rect x={fx - eyeSp - 12} y={eyeY - 10} width={24} height={20} rx={6} />
          <rect x={fx + eyeSp - 12} y={eyeY - 10} width={24} height={20} rx={6} />
          <line x1={fx - eyeSp + 12} y1={eyeY} x2={fx + eyeSp - 12} y2={eyeY} />
        </g>
      ) : null}
      {b.mask ? (
        <g>
          <path d={`M ${fx - rx * 0.85} ${-2} Q ${fx} ${-12} ${fx + rx * 0.85} ${-2} L ${fx + rx * 0.7} ${ry * 0.75} Q ${fx} ${ry * 1.05} ${fx - rx * 0.7} ${ry * 0.75} Z`} fill="rgba(190,230,255,0.35)" stroke={INK} strokeWidth={4} />
          <path d={`M ${fx - rx * 0.6} ${ry * 0.8} q -20 30 -40 60`} stroke="#3a3a44" strokeWidth={7} fill="none" strokeLinecap="round" />
        </g>
      ) : null}
    </g>
  );
};
