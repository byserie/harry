import React from "react";
import { AbsoluteFill } from "remotion";
import { Figure } from "../characters/Figure";
import { POSES, PoseName } from "../lib/pose";
import { FONT } from "../lib/font";
import type { Expression } from "../characters/Stickman";
import type { CharId } from "../characters/cast";
import { LivingRoom, Laundry, JewelryStore } from "./world2";

const stroke = (w: number) => ({ WebkitTextStroke: `${w}px #121220`, paintOrder: "stroke fill" as const });

// ---------------------------------------------------------------- miniatura del largo (1280x720)
export const MiniaturaMitad: React.FC = () => (
  <AbsoluteFill style={{ background: "#2a1a14", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: -120, top: -620, width: 1080, height: 1920, scale: "1.3", transformOrigin: "0 0", filter: "saturate(1.3) brightness(0.85)" }}>
      <LivingRoom t={1} pointTV={1} />
    </div>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 72% 60%, rgba(255,200,80,0.25), rgba(0,0,0,0.6) 75%)" }} />
    <div style={{ position: "absolute", left: 470, top: -380, width: 1080, height: 1920, scale: "0.8", transformOrigin: "0 0" }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <Figure who="suegra" x={240} y={1500} scale={2.5} facing={1} pose={POSES.point(0)} expression="anger" showName={false} />
        <Figure who="ex" x={520} y={1500} scale={2.5} facing={1} pose={POSES.crossed(6)} expression="focus" showName={false} />
        <Figure who="narr" x={860} y={1500} scale={2.5} facing={-1} pose={POSES.surprised(10)} expression="surprise" showName={false} />
      </svg>
    </div>
    <div style={{ position: "absolute", left: 1150, top: 30, fontSize: 110, rotate: "10deg" }}>📺</div>
    <div style={{ position: "absolute", left: 30, top: 40, width: 640, fontFamily: FONT, fontWeight: 700, lineHeight: 0.95 }}>
      <div style={{ fontSize: 88, color: "#ffffff", ...stroke(14), rotate: "-3deg" }}>MI EX QUERÍA</div>
      <div style={{ fontSize: 150, color: "#ffe14d", ...stroke(18), rotate: "-3deg" }}>LA MITAD</div>
      <div style={{ marginTop: 24, display: "inline-block", fontSize: 46, color: "#fff", background: "#e23b3b", border: "6px solid #121220", borderRadius: 22, padding: "6px 24px", rotate: "3deg", boxShadow: "0 8px 0 rgba(0,0,0,0.45)" }}>…de la casa de MI MAMÁ 🤯</div>
    </div>
  </AbsoluteFill>
);

// ---------------------------------------------------------------- portadas de los Shorts (1080x1920)
type Who = { who: CharId; pose: PoseName; expr: Expression };
export type MitadCover = { part: string; l1: string; l2: string; c1?: string; emoji?: string; bg: "living" | "laundry" | "jewel"; a: Who; b: Who };

const BG: Record<MitadCover["bg"], React.FC> = {
  living: () => <LivingRoom t={1} />,
  laundry: () => <Laundry t={1} open={1} />,
  jewel: () => <JewelryStore t={1} />,
};

export const PortadaMitad: React.FC<{ d: MitadCover }> = ({ d }) => {
  const Bg = BG[d.bg];
  return (
    <AbsoluteFill style={{ background: "#2a1a14", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, filter: "saturate(1.3) brightness(0.85)" }}>
        <Bg />
      </div>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 62%, rgba(255,200,80,0.3), rgba(0,0,0,0.6) 78%)" }} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <Figure who={d.a.who} x={330} y={1700} scale={2.7} facing={1} pose={POSES[d.a.pose](8)} expression={d.a.expr} showName={false} />
        <Figure who={d.b.who} x={770} y={1700} scale={2.7} facing={-1} pose={POSES[d.b.pose](14)} expression={d.b.expr} showName={false} />
      </svg>
      <div style={{ position: "absolute", left: 40, top: 60, background: "#e23b3b", color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: 64, padding: "10px 34px", borderRadius: 28, border: "7px solid #1b1b2f", rotate: "-4deg", boxShadow: "0 10px 0 rgba(0,0,0,0.4)" }}>{d.part}</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 230, textAlign: "center", fontFamily: FONT, fontWeight: 700, lineHeight: 0.98, padding: "0 50px" }}>
        <div style={{ fontSize: 118, color: d.c1 ?? "#ffe14d", ...stroke(16), rotate: "-3deg" }}>{d.l1}</div>
        <div style={{ marginTop: 26, display: "inline-block", fontSize: 64, color: "#1b1b2f", background: "#ffffff", border: "7px solid #121220", borderRadius: 26, padding: "8px 30px", rotate: "2deg", boxShadow: "0 10px 0 rgba(0,0,0,0.45)" }}>{d.l2}</div>
      </div>
      {d.emoji ? <div style={{ position: "absolute", left: 0, right: 0, top: 640, textAlign: "center", fontSize: 150 }}>{d.emoji}</div> : null}
    </AbsoluteFill>
  );
};

export const MITAD_COVERS: MitadCover[] = [
  { part: "PARTE 1/4", l1: "¿LA MITAD DE TODO?", l2: "…de la casa de mi mamá 🤯", bg: "living", a: { who: "ex", pose: "point", expr: "focus" }, b: { who: "narr", pose: "surprised", expr: "surprise" } },
  { part: "PARTE 2/4", l1: "ME DEJÓ POR ROPA HÚMEDA", l2: "sí, en serio 🧺", c1: "#9ad8ff", emoji: "💦", bg: "laundry", a: { who: "ex", pose: "angry", expr: "anger" }, b: { who: "narr", pose: "shrug", expr: "surprise" } },
  { part: "PARTE 3/4", l1: "VINO CON SU MAMÁ", l2: "a devolverme el anillo 💍", c1: "#ff9ad5", emoji: "💍", bg: "living", a: { who: "suegra", pose: "crossed", expr: "anger" }, b: { who: "narr", pose: "surprised", expr: "surprise" } },
  { part: "PARTE 4/4 · FINAL", l1: "ELIGIERON MUEBLES DE MI CASA", l2: "así que las eché 😤", c1: "#7dff9a", emoji: "📺", bg: "living", a: { who: "suegra", pose: "point", expr: "joy" }, b: { who: "narr", pose: "angry", expr: "anger" } },
];
