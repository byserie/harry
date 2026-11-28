import React from "react";
import { AbsoluteFill } from "remotion";
import { Figure } from "../characters/Figure";
import { POSES, PoseName } from "../lib/pose";
import { FONT } from "../lib/font";
import type { Expression } from "../characters/Stickman";
import type { CharId } from "../characters/cast";
import { Bodega, Colonia, Fiscalia, Garage, MapaCocheras } from "./world3";

const stroke = (w: number) => ({ WebkitTextStroke: `${w}px #121220`, paintOrder: "stroke fill" as const });
const Vig = () => <AbsoluteFill style={{ background: "radial-gradient(ellipse at 55% 55%, rgba(0,0,0,0) 35%, rgba(0,0,15,0.75) 100%)" }} />;

// ---------------------------------------------------------------- miniatura del largo (1280x720)
export const MiniaturaGuero2: React.FC = () => (
  <AbsoluteFill style={{ background: "#0a0c16", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: -60, top: -560, width: 1080, height: 1920, scale: "1.2", transformOrigin: "0 0", filter: "saturate(1.2)" }}>
      <Garage t={1} car tarp={1} door={0.3} />
    </div>
    <div style={{ position: "absolute", left: 560, top: 250, width: 1920, height: 1080, scale: "0.36", transformOrigin: "0 0", rotate: "3deg" }}>
      <MapaCocheras t={1} k={1} dots={700} zoom={1} label="🔴 MILES DE COCHERAS" />
    </div>
    <Vig />
    <div style={{ position: "absolute", left: 440, top: -330, width: 1080, height: 1920, scale: "0.72", transformOrigin: "0 0" }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <Figure who="guero" x={900} y={1500} scale={2.5} facing={-1} pose={POSES.pointUp(4)} expression="joy" showName={false} />
      </svg>
    </div>
    <div style={{ position: "absolute", left: 30, top: 30, background: "#e23b3b", color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: 40, padding: "6px 24px", borderRadius: 20, border: "6px solid #121220", rotate: "-4deg" }}>TEMPORADA 2</div>
    <div style={{ position: "absolute", left: 30, top: 130, width: 620, fontFamily: FONT, fontWeight: 700, lineHeight: 0.95 }}>
      <div style={{ fontSize: 76, color: "#fff", ...stroke(14), rotate: "-3deg" }}>$200 POR UNA</div>
      <div style={{ fontSize: 120, color: "#ffe14d", ...stroke(18), rotate: "-3deg" }}>COCHERA</div>
      <div style={{ marginTop: 24, display: "inline-block", fontSize: 50, color: "#fff", background: "#e23b3b", border: "6px solid #121220", borderRadius: 22, padding: "6px 24px", rotate: "3deg", boxShadow: "0 8px 0 rgba(0,0,0,0.45)" }}>…era una MAFIA 🔴</div>
    </div>
  </AbsoluteFill>
);

// ---------------------------------------------------------------- portadas de los Shorts (1080x1920)
type Who = { who: CharId; pose: PoseName; expr: Expression };
type BgK = "fiscalia" | "garage" | "versa" | "bodega" | "mapa";
export type GueroCover = { part: string; l1: string; l2: string; c1?: string; emoji?: string; bg: BgK; a: Who; b: Who };

const BG: Record<BgK, React.FC> = {
  fiscalia: () => <Garage t={1} door={0.3} torch={1} />,
  garage: () => <Garage t={1} car tarp={1} door={1} />,
  versa: () => <Garage t={1} car tarp={0} wet={1} door={0.3} tarpFloor />,
  bodega: () => <Bodega t={1} />,
  mapa: () => <Colonia t={1} night note />,
};
void Fiscalia;

export const PortadaGuero: React.FC<{ d: GueroCover }> = ({ d }) => {
  const Bg = BG[d.bg];
  return (
    <AbsoluteFill style={{ background: "#0a0c16", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, filter: "saturate(1.2)" }}>
        <Bg />
      </div>
      {d.bg === "mapa" ? (
        <div style={{ position: "absolute", left: 40, top: 560, width: 1920, height: 1080, scale: "0.52", transformOrigin: "0 0" }}>
          <MapaCocheras t={1} k={1} dots={900} zoom={1} label="🔴 MILES" />
        </div>
      ) : null}
      <Vig />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <Figure who={d.a.who} x={330} y={1700} scale={2.7} facing={1} pose={POSES[d.a.pose](8)} expression={d.a.expr} showName={false} />
        <Figure who={d.b.who} x={770} y={1700} scale={2.7} facing={-1} pose={POSES[d.b.pose](14)} expression={d.b.expr} showName={false} />
      </svg>
      <div style={{ position: "absolute", left: 40, top: 60, background: "#e23b3b", color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: 60, padding: "10px 34px", borderRadius: 28, border: "7px solid #1b1b2f", rotate: "-4deg", boxShadow: "0 10px 0 rgba(0,0,0,0.4)" }}>{d.part}</div>
      <div style={{ position: "absolute", right: 40, top: 70, color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: 40, ...stroke(10), rotate: "4deg" }}>TEMP. 2</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 230, textAlign: "center", fontFamily: FONT, fontWeight: 700, lineHeight: 0.98, padding: "0 50px" }}>
        <div style={{ fontSize: 112, color: d.c1 ?? "#ffe14d", ...stroke(16), rotate: "-3deg" }}>{d.l1}</div>
        <div style={{ marginTop: 26, display: "inline-block", fontSize: 60, color: "#1b1b2f", background: "#ffffff", border: "7px solid #121220", borderRadius: 26, padding: "8px 30px", rotate: "2deg", boxShadow: "0 10px 0 rgba(0,0,0,0.45)" }}>{d.l2}</div>
      </div>
      {d.emoji ? <div style={{ position: "absolute", left: 0, right: 0, top: 640, textAlign: "center", fontSize: 150 }}>{d.emoji}</div> : null}
    </AbsoluteFill>
  );
};

export const GUERO_COVERS: GueroCover[] = [
  { part: "PARTE 1/5", l1: "ALGUIEN TIENE LLAVE", l2: "de mi cochera 😨", c1: "#ff5a5a", emoji: "🔑", bg: "fiscalia", a: { who: "flaco", pose: "cower", expr: "surprise" }, b: { who: "prota", pose: "surprised", expr: "surprise" } },
  { part: "PARTE 2/5", l1: "EL CARRO VOLVIÓ", l2: "con las llantas mojadas 💧", bg: "versa", a: { who: "prota", pose: "armsUp", expr: "surprise" }, b: { who: "flaco", pose: "cower", expr: "surprise" } },
  { part: "PARTE 3/5", l1: "¿ESTE ES EL JEFE?", l2: "le tenía miedo a alguien más 😰", c1: "#ffb03a", bg: "bodega", a: { who: "jefe", pose: "cower", expr: "sadness" }, b: { who: "prota", pose: "surprised", expr: "surprise" } },
  { part: "PARTE 4/5", l1: "YA NO HAY JEFE", l2: "llegó el güero 😶", c1: "#ff5a5a", bg: "garage", a: { who: "guero", pose: "hold", expr: "joy" }, b: { who: "flaco", pose: "cower", expr: "surprise" } },
  { part: "PARTE 5/5 · FINAL", l1: "ERA UNA MAFIA", l2: "de MILES de cocheras 🔴", c1: "#ff5a5a", bg: "mapa", a: { who: "guero", pose: "pointUp", expr: "joy" }, b: { who: "prota", pose: "surprised", expr: "surprise" } },
];
