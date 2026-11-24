import React from "react";
import { AbsoluteFill, Composition, Easing, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Scene } from "../engine/Scene";
import { PartSpec } from "../engine/types";
import { Stickman } from "../characters/Stickman";
import { CAST } from "../characters/cast";
import { POSES } from "../lib/pose";
import { FONT } from "../lib/font";
import { kf } from "../lib/pose";
import { Clip, EDITS, EditDef, FILM_NAME } from "./data";
import { p1full } from "../peli1d/full";
import { p2full } from "../peli2d/full";
import { p3full } from "../peli3/full";
import { p4full } from "../peli4/full";
import { p5full } from "../peli5/full";
import { p6full } from "../peli6/full";
import { p7full } from "../peli7/full";
import { p8full } from "../peli8/full";

const SPECS: Record<number, PartSpec> = { 1: p1full, 2: p2full, 3: p3full, 4: p4full, 5: p5full, 6: p6full, 7: p7full, 8: p8full };

const FPS = 30;
const BEAT = 60 / 140;
const fr = (beats: number) => Math.round(beats * BEAT * FPS);
const INTRO = 8, BUILD = 8, DROP = 32;
const END_BEAT = INTRO + BUILD + DROP;
export const EDIT_FRAMES = fr(END_BEAT) + Math.round(2.0 * FPS);

type Slot = { clip: Clip; from: number; to: number; phase: "intro" | "build" | "drop" };
const slots = (e: EditDef): Slot[] => {
  const out: Slot[] = [{ clip: e.intro, from: 0, to: fr(INTRO), phase: "intro" }];
  e.build.forEach((c, i) => out.push({ clip: c, from: fr(INTRO + i * 4), to: fr(INTRO + (i + 1) * 4), phase: "build" }));
  e.drop.forEach((c, i) => out.push({ clip: c, from: fr(INTRO + BUILD + i * 4), to: fr(INTRO + BUILD + (i + 1) * 4), phase: "drop" }));
  out[out.length - 1].to = EDIT_FRAMES; // el último clip sigue debajo del cierre
  return out;
};

/** Clip con "golpe" de corte: zoom que entra, flash blanco y pulso con cada tiempo. */
const ClipView: React.FC<{ slot: Slot }> = ({ slot }) => {
  const f = useCurrentFrame();
  const spec = SPECS[slot.clip.f].scenes[slot.clip.s];
  const startF = Math.round(slot.clip.t * FPS);
  const beatPhase = ((f + slot.from) % (BEAT * FPS)) / (BEAT * FPS);
  const pulse = slot.phase === "drop" ? 0.035 * Math.exp(-beatPhase * 7) : 0;
  const punch = slot.phase === "intro" ? kf(f, [0, fr(INTRO)], [1.0, 1.12]) : 1 + 0.14 * Math.exp(-f / 5);
  const filter =
    slot.phase === "intro"
      ? "grayscale(0.85) contrast(1.25) brightness(0.62)"
      : slot.phase === "build"
        ? "saturate(0.8) contrast(1.2) brightness(0.85)"
        : "saturate(1.35) contrast(1.12)";
  const shakeX = slot.phase === "drop" ? Math.sin(f * 2.1) * 10 * Math.exp(-beatPhase * 8) : 0;
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <AbsoluteFill style={{ scale: String(punch + pulse), translate: `${shakeX}px 0`, filter }}>
        <Sequence from={-startF} layout="none">
          <Scene spec={spec} first dyn noSfx />
        </Sequence>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 100%)" }} />
      {f < 5 && slot.from > 0 ? <AbsoluteFill style={{ backgroundColor: "#fff", opacity: 0.85 * (1 - f / 5) }} /> : null}
    </AbsoluteFill>
  );
};

/** Texto de qué pasa en la escena: película arriba, hecho abajo. */
const Label: React.FC<{ clip: Clip; phase: Slot["phase"] }> = ({ clip, phase }) => {
  const f = useCurrentFrame();
  const k = kf(f, [1, 7], [0, 1], Easing.out(Easing.back(1.8)));
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 250 }}>
      <div style={{ translate: `${(1 - k) * -120}px 0`, opacity: k, width: 980, fontFamily: FONT, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            background: "#ffe14d",
            color: "#1b1b2f",
            fontWeight: 700,
            fontSize: 38,
            padding: "8px 26px",
            borderRadius: 18,
            marginBottom: 14,
            rotate: "-2deg",
          }}
        >
          🎬 {clip.f <= 6 ? `AÑO ${clip.f}` : "AÑO 7"} · {FILM_NAME[clip.f].toUpperCase()}
        </div>
        <div
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: phase === "drop" ? 68 : 60,
            lineHeight: 1.08,
            textShadow: "0 6px 0 #000, 0 0 24px rgba(0,0,0,0.9)",
            WebkitTextStroke: "3px #000",
            paintOrder: "stroke fill",
          }}
        >
          {clip.txt}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Ficha del personaje: retrato grande con detalle + datos + barras. */
const Card: React.FC<{ e: EditDef }> = ({ e }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const inK = kf(f, [0, 10], [0, 1], Easing.out(Easing.back(1.6)));
  const titleK = kf(f, [0, 8], [2.2, 1], Easing.out(Easing.cubic));
  const multi = e.who.length > 1;
  return (
    <AbsoluteFill>
      {/* barras de cine */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 120, background: "#000" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: "#000" }} />
      {/* título */}
      <div
        style={{
          position: "absolute",
          top: 170,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: e.title.length > 16 ? 92 : 128,
          lineHeight: 1,
          color: "#fff",
          letterSpacing: 4,
          scale: String(titleK),
          opacity: kf(f, [0, 6], [0, 1]),
          textShadow: "0 0 40px rgba(255,225,77,0.6), 0 8px 0 #000",
          padding: "0 40px",
          boxSizing: "border-box",
        }}
      >
        {e.title}
        <div style={{ fontSize: 50, color: "#ffe14d", marginTop: 14, letterSpacing: 2 }}>{e.sub}</div>
      </div>
      {/* panel */}
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          top: 1010,
          height: 700,
          borderRadius: 44,
          background: "rgba(14,14,28,0.88)",
          border: `8px solid ${multi ? "#ffe14d" : CAST[e.who[0]].color}`,
          boxShadow: "0 20px 0 rgba(0,0,0,0.5)",
          translate: `0 ${(1 - inK) * 500}px`,
          overflow: "hidden",
        }}
      >
        {/* retrato */}
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 40,
            width: 380,
            height: 620,
            borderRadius: 30,
            background: `radial-gradient(circle at 50% 40%, ${multi ? "#ffe14d" : CAST[e.who[0]].color}, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 45%, rgba(255,255,255,0.05) 75%)`,
          }}
        />
        <div style={{ position: "absolute", left: -330, top: -1130, width: 1080, height: 1920 }}>
          <AbsoluteFill style={{ background: "transparent" }}>
            {e.who.map((w, i) => (
              <Stickman
                key={w}
                who={w}
                x={multi ? 430 + i * 110 : 540}
                y={multi ? 1790 : 1900}
                scale={multi ? 1.25 : 1.7}
                facing={1}
                pose={POSES[e.pose](t * 30 + i * 7)}
                expression={w === "voldemort" ? "anger" : w === "snape" ? "focus" : "joy"}
                wand
                wandGlow={0.5 + 0.5 * Math.sin(t * 6)}
                showName={false}
              />
            ))}
          </AbsoluteFill>
        </div>
        {/* datos */}
        <div style={{ position: "absolute", left: 420, right: 30, top: 40, fontFamily: FONT, color: "#fff" }}>
          {e.facts.map(([k, v], i) => {
            const a = kf(f, [10 + i * 9, 18 + i * 9], [0, 1], Easing.out(Easing.cubic));
            return (
              <div key={k} style={{ opacity: a, translate: `${(1 - a) * 60}px 0`, marginBottom: 16 }}>
                <div style={{ fontSize: 30, color: "#ffe14d", fontWeight: 700 }}>{k.toUpperCase()}</div>
                <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.05 }}>{v}</div>
              </div>
            );
          })}
          {e.stats.map(([k, v], i) => {
            const a = kf(f, [46 + i * 6, 64 + i * 6], [0, 1], Easing.out(Easing.cubic));
            return (
              <div key={k} style={{ marginTop: 8, opacity: Math.min(1, a * 3) }}>
                <div style={{ fontSize: 28, fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
                  <span>{k}</span>
                  <span style={{ color: "#7dff9a" }}>{Math.round(v * a)}</span>
                </div>
                <div style={{ height: 16, borderRadius: 8, background: "rgba(255,255,255,0.15)" }}>
                  <div style={{ width: `${v * a}%`, height: "100%", borderRadius: 8, background: v < 30 ? "#ff6b6b" : "#7dff9a" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC<{ e: EditDef }> = ({ e }) => {
  const f = useCurrentFrame();
  const k = kf(f, [0, 10], [0, 1], Easing.out(Easing.back(1.8)));
  return (
    <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${kf(f, [0, 12], [0, 0.6])})`, alignItems: "center", justifyContent: "center" }}>
      <div style={{ scale: String(k), textAlign: "center", fontFamily: FONT, fontWeight: 700, color: "#fff", padding: "0 60px" }}>
        <div style={{ fontSize: 96, lineHeight: 1.05, textShadow: "0 8px 0 #000, 0 0 40px rgba(255,225,77,0.7)" }}>{e.end}</div>
        <div
          style={{
            marginTop: 40,
            display: "inline-block",
            background: "#fff",
            color: "#1b1b2f",
            fontSize: 52,
            padding: "18px 36px",
            borderRadius: 30,
            border: "6px solid #1b1b2f",
          }}
        >
          👉 Seguí el canal: Pelis en 5 Minutos
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Edit: React.FC<{ e: EditDef }> = ({ e }) => {
  const S = slots(e);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {S.map((sl, i) => (
        <Sequence key={i} from={sl.from} durationInFrames={sl.to - sl.from} name={`${sl.phase} ${sl.clip.f}/${sl.clip.s}`}>
          <ClipView slot={sl} />
          {sl.clip.txt ? (
            <Sequence durationInFrames={Math.min(sl.to - sl.from, fr(4))} layout="none">
              <Label clip={sl.clip} phase={sl.phase} />
            </Sequence>
          ) : null}
        </Sequence>
      ))}
      <Sequence durationInFrames={fr(INTRO)} name="Ficha">
        <Card e={e} />
      </Sequence>
      <Sequence from={fr(END_BEAT)} name="Cierre">
        <Outro e={e} />
      </Sequence>
      <Audio src={staticFile(`audio/edits/${e.id}.wav`)} />
      {S.slice(1).map((sl, i) => (
        <Sequence key={i} from={sl.from - 6} durationInFrames={20} layout="none">
          <Audio src={staticFile("sfx/whoosh.wav")} volume={sl.phase === "build" ? 0.35 : 0.25} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const EditCompositions: React.FC = () => (
  <>
    {EDITS.map((e) => {
      const C: React.FC = () => <Edit e={e} />;
      return <Composition key={e.id} id={`Edit-${e.id}`} component={C} durationInFrames={EDIT_FRAMES} fps={FPS} width={1080} height={1920} />;
    })}
  </>
);
