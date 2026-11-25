import React from "react";
import { AbsoluteFill, Easing, Freeze, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Scene } from "../engine/Scene";
import { AudioData } from "../engine/Part";
import { PartSpec } from "../engine/types";
import { CaptionsDyn, ProgressBar } from "../lib/CaptionsDyn";
import { Word } from "../lib/Captions";
import { FONT } from "../lib/font";
import { kf } from "../lib/pose";

export type ShortDef = { id: string; film: number; scenes: string[]; teaser: string; hook: string; label?: string; end?: string };
export type HookAudio = { dur: number; words: Word[] };

const FPS = 30;

export const shortTiming = (def: ShortDef, audio: AudioData, hook: HookAudio) => {
  const first = audio.scenes.find((s) => s.id === def.scenes[0])!;
  const last = audio.scenes.find((s) => s.id === def.scenes[def.scenes.length - 1])!;
  const hookFrames = Math.round((hook.dur + 0.7) * FPS);
  const base = first.from;
  const chunkFrames = last.from + last.dur - base;
  return { hookFrames, base, chunkFrames, total: hookFrames + chunkFrames };
};

const HookText: React.FC<{ text: string; words: Word[] }> = ({ text, words }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const pop = kf(t, [0, 0.18], [0.5, 1], Easing.out(Easing.back(2.4)));
  const list = text.split(" ");
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 110 }}>
      <div
        style={{
          scale: String(pop),
          width: 960,
          padding: "34px 40px",
          borderRadius: 40,
          background: "rgba(18,18,32,0.82)",
          border: "8px solid #ffe14d",
          boxShadow: "0 18px 0 rgba(0,0,0,0.4)",
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 78,
          lineHeight: 1.06,
          rotate: "-2deg",
        }}
      >
        {list.map((wd, i) => {
          const wt = words[i];
          const on = wt ? t >= wt.start - 0.05 : true;
          return (
            <span key={i} style={{ color: on ? (i % 3 === 2 ? "#7dff9a" : "#ffe14d") : "rgba(255,255,255,0.35)", marginRight: 18, display: "inline-block", scale: on ? "1" : "0.92" }}>
              {wd}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** Cartel fijo "PARTE X/N" arriba a la izquierda. */
const PartBadge: React.FC<{ text: string }> = ({ text }) => {
  const f = useCurrentFrame();
  const k = kf(f / FPS, [0, 0.3], [0, 1], Easing.out(Easing.back(2)));
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 40, top: 40, scale: String(k), background: "#e23b3b", color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: 48, padding: "10px 28px", borderRadius: 24, border: "6px solid #1b1b2f", boxShadow: "0 8px 0 rgba(0,0,0,0.35)", rotate: "-3deg" }}>{text}</div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC<{ text?: string }> = ({ text }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const k = kf(t, [0, 0.35], [0, 1], Easing.out(Easing.back(2)));
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 230 }}>
      <div
        style={{
          scale: String(k),
          background: "#ffffff",
          border: "8px solid #1b1b2f",
          borderRadius: 40,
          padding: "26px 40px",
          width: 880,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 66,
          color: "#1b1b2f",
          boxShadow: "0 16px 0 rgba(0,0,0,0.35)",
        }}
      >
        {text ?? "👉 Mirá la película completa en el canal"}
      </div>
    </AbsoluteFill>
  );
};

export const Short: React.FC<{ def: ShortDef; spec: PartSpec; audio: AudioData; audioFile: string; hook: HookAudio }> = ({ def, spec, audio, audioFile, hook }) => {
  const { fps } = useVideoConfig();
  const { hookFrames, base, chunkFrames, total } = shortTiming(def, audio, hook);
  const HEAVY = ["boom", "crash", "roar", "fire", "splash", "zap", "thunder"];
  const teaserSc = def.teaser ? audio.scenes.find((s) => s.id === def.teaser)! : null;
  const hit = def.teaser ? (spec.scenes[def.teaser].sfx ?? []).filter((x) => HEAVY.includes(x.s)).sort((a, b) => a.t - b.t)[0] : undefined;
  const teaserLocal = !teaserSc ? 0 : hit ? Math.max(0, Math.round((hit.t - 0.6) * fps)) : Math.round(teaserSc.dur * 0.5);
  const words = audio.words.filter((w) => w.start * fps >= base && w.start * fps < base + chunkFrames).map((w) => ({ ...w, start: w.start - base / fps, end: w.end - base / fps }));
  const subScenes = def.scenes.map((id) => audio.scenes.find((s) => s.id === id)!);
  return (
    <AbsoluteFill style={{ backgroundColor: "#1b1b2f" }}>
      {/* 1) Gancho: el momento más fuerte + la pregunta */}
      <Sequence durationInFrames={hookFrames} name="Gancho">
        {def.teaser ? (
          <Sequence from={-teaserLocal} durationInFrames={teaserLocal + hookFrames}>
            <Scene spec={spec.scenes[def.teaser]} first dyn />
          </Sequence>
        ) : (
          // Momento: la escena congelada y oscura detrás de la pregunta; al terminar arranca directo
          <AbsoluteFill style={{ filter: "blur(5px) brightness(0.55) saturate(1.2)", scale: "1.06" }}>
            <Freeze frame={12}>
              <Scene spec={spec.scenes[def.scenes[0]]} first dyn noSfx />
            </Freeze>
          </AbsoluteFill>
        )}
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0) 55%)" }} />
        <HookText text={def.hook} words={hook.words} />
        <Audio src={staticFile(`audio/hooks/${def.id}.wav`)} />
        <Sequence durationInFrames={30} layout="none">
          <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />
        </Sequence>
        <Sequence from={hookFrames - 8} layout="none">
          <Audio src={staticFile("sfx/boom.wav")} volume={0.45} />
        </Sequence>
      </Sequence>

      {/* 2) La historia de esta parte */}
      <Sequence from={hookFrames} durationInFrames={chunkFrames} name="Historia">
        {subScenes.map((sc, i) => (
          <Sequence key={sc.id} from={sc.from - base} durationInFrames={sc.dur} name={sc.id}>
            <Scene spec={spec.scenes[sc.id]} first={i === 0} dyn />
          </Sequence>
        ))}
        <CaptionsDyn words={words} />
        <Audio src={staticFile(audioFile)} trimBefore={base} />
        <Sequence from={chunkFrames - Math.round(2.8 * fps)} name="Ver completa">
          <EndCard text={def.end} />
        </Sequence>
      </Sequence>
      <ProgressBar total={total} part={0} />
      {def.label ? <PartBadge text={def.label} /> : null}
    </AbsoluteFill>
  );
};
