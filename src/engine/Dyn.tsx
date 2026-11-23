import React from "react";
import { AbsoluteFill, random } from "remotion";
import { FONT } from "../lib/font";
import { SceneSpec, SfxName } from "./types";
import { LandCtx } from "./layout";

/** Onomatopeyas automáticas según el efecto de sonido. */
const WORDS: Partial<Record<SfxName, { text: string; color: string }>> = {
  boom: { text: "¡BUM!", color: "#ff5a3c" },
  crash: { text: "¡CRASH!", color: "#ffb02e" },
  zap: { text: "¡ZAS!", color: "#7cf0ff" },
  pop: { text: "¡PUF!", color: "#ff7ad9" },
  roar: { text: "¡GRRR!", color: "#ff3b3b" },
  splash: { text: "¡SPLASH!", color: "#5cc8ff" },
  knock: { text: "¡TOC TOC!", color: "#ffd23a" },
  fire: { text: "¡FUSH!", color: "#ff8a1a" },
  hiss: { text: "¡SSSS!", color: "#7bd389" },
  fanfare: { text: "¡SÍ!", color: "#ffd23a" },
  cheer: { text: "¡WOOO!", color: "#ffd23a" },
};

const IMPACT: SfxName[] = ["boom", "crash", "zap", "pop", "roar", "splash", "knock", "fire", "fanfare"];
const HEAVY: SfxName[] = ["boom", "crash", "roar"];

/** Ajustes de cámara: golpes de zoom en impactos + cortes de encuadre cada ~2 s. */
export const dynCam = (spec: SceneSpec, t: number, land = false) => {
  let punch = 0;
  let rot = 0;
  (spec.sfx ?? []).forEach((s, i) => {
    if (!IMPACT.includes(s.s)) return;
    const d = t - s.t;
    if (d >= 0 && d < 0.45) {
      const k = Math.exp(-d * 9);
      punch = Math.max(punch, (HEAVY.includes(s.s) ? 0.2 : 0.12) * k);
      rot += (i % 2 ? 1 : -1) * 2.2 * k;
    }
  });
  const seg = Math.floor(t / 2.1);
  const alt = seg % 3;
  const zMul = (alt === 1 ? (land ? 1.07 : 1.16) : alt === 2 ? (land ? 1.03 : 1.07) : 1) * (1 + punch * (land ? 0.7 : 1));
  const xOff = alt === 1 ? 30 : alt === 2 ? -30 : 0;
  return { zMul, xOff, rot };
};

export const Pops: React.FC<{ spec: SceneSpec; t: number }> = ({ spec, t }) => {
  const land = React.useContext(LandCtx);
  return (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    {(spec.sfx ?? []).map((s, i) => {
      const wdef = WORDS[s.s];
      if (!wdef) return null;
      const d = t - s.t;
      if (d < 0 || d > 0.8) return null;
      const pop = d < 0.12 ? 0.4 + (d / 0.12) * 0.9 : d < 0.22 ? 1.3 - ((d - 0.12) / 0.1) * 0.3 : 1;
      const fade = d > 0.6 ? 1 - (d - 0.6) / 0.2 : 1;
      const x = land ? 380 + random(`px${i}${s.t}`) * 1050 : 160 + random(`px${i}${s.t}`) * 560;
      const y = land ? 120 + random(`py${i}${s.t}`) * 380 : 380 + random(`py${i}${s.t}`) * 380;
      const r = (random(`pr${i}${s.t}`) - 0.5) * 24;
      return (
        <div key={i} style={{ position: "absolute", left: x, top: y, scale: String(pop), rotate: `${r}deg`, opacity: fade, transformOrigin: "center" }}>
          <svg width={360} height={220} viewBox="-180 -110 360 220" style={{ position: "absolute", left: -110, top: -70, overflow: "visible" }}>
            <polygon
              points={Array.from({ length: 24 })
                .map((_, k) => {
                  const a = (k / 24) * Math.PI * 2;
                  const rr = k % 2 ? 70 : 120;
                  return `${Math.cos(a) * rr * 1.4},${Math.sin(a) * rr * 0.8}`;
                })
                .join(" ")}
              fill="#fff6c2"
              stroke="#1b1b2f"
              strokeWidth={6}
            />
          </svg>
          <div
            style={{
              position: "relative",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 92,
              color: wdef.color,
              WebkitTextStroke: "12px #1b1b2f",
              paintOrder: "stroke fill",
              whiteSpace: "nowrap",
              textShadow: "0 8px 0 rgba(0,0,0,0.35)",
              marginLeft: -40,
              marginTop: -20,
            }}
          >
            {wdef.text}
          </div>
        </div>
      );
    })}
  </AbsoluteFill>
  );
};

export const SpeedLines: React.FC<{ spec: SceneSpec; t: number }> = ({ spec, t }) => {
  let k = 0;
  (spec.sfx ?? []).forEach((s) => {
    if (!HEAVY.includes(s.s) && s.s !== "whoosh") return;
    const d = t - s.t;
    if (d >= 0 && d < 0.4) k = Math.max(k, (s.s === "whoosh" ? 0.5 : 1) * (1 - d / 0.4));
  });
  if (k <= 0) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: k }}>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="none">
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i / 48) * Math.PI * 2 + random(`sl${i}`) * 0.1;
          const r0 = 520 + random(`sr${i}${Math.floor(t * 20)}`) * 200;
          return (
            <line
              key={i}
              x1={540 + Math.cos(a) * r0}
              y1={900 + Math.sin(a) * r0 * 1.4}
              x2={540 + Math.cos(a) * 1500}
              y2={900 + Math.sin(a) * 2100}
              stroke="#ffffff"
              strokeWidth={6 + random(`sw${i}`) * 10}
              opacity={0.75}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
