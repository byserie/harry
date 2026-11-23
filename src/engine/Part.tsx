import React from "react";
import { AbsoluteFill, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Captions, Word } from "../lib/Captions";
import { FONT } from "../lib/font";
import { kf } from "../lib/pose";
import { Scene } from "./Scene";
import { CaptionsDyn, ProgressBar } from "../lib/CaptionsDyn";
import { PartSpec } from "./types";

export type AudioData = {
  fps: number;
  durationInFrames: number;
  scenes: { id: string; from: number; dur: number; voiceFrom: number; voiceDur: number }[];
  words: Word[];
};

const Title: React.FC<{ part: number; title: string; dyn?: boolean }> = ({ part, title, dyn }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const inK = dyn ? kf(t, [0, 0.25], [0, 1], Easing.out(Easing.back(2.2))) : kf(t, [0.1, 0.7], [0, 1], Easing.out(Easing.back(1.6)));
  const out = dyn ? kf(t, [3.0, 3.4], [1, 0]) : kf(t, [3.6, 4.2], [1, 0]);
  if (out <= 0) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 170, opacity: out, fontFamily: FONT }}>
      {dyn && part ? (
        <div style={{ fontSize: 54, fontWeight: 700, color: "#1b1b2f", background: "#fff", border: "6px solid #1b1b2f", borderRadius: 999, padding: "4px 30px", marginBottom: 18, scale: String(inK) }}>
          🎬 PELÍCULA
        </div>
      ) : null}
      <div
        style={{
          scale: String(inK),
          background: "linear-gradient(180deg,#ffe47a,#ffb43b)",
          border: "8px solid #1b1b2f",
          borderRadius: 40,
          padding: "14px 46px",
          fontSize: part ? 96 : 70,
          whiteSpace: "nowrap",
          fontWeight: 700,
          color: "#1b1b2f",
          boxShadow: "0 14px 0 rgba(0,0,0,0.35)",
          rotate: `${-3 + Math.sin(t * 3) * 1}deg`,
        }}
      >
        {part ? `PARTE ${part}` : "PELÍCULA COMPLETA"}
      </div>
      <div
        style={{
          marginTop: 30,
          fontSize: 66,
          fontWeight: 700,
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.05,
          WebkitTextStroke: "12px #1b1b2f",
          paintOrder: "stroke fill",
          opacity: kf(t, [0.5, 1.0], [0, 1]),
          translate: `0 ${kf(t, [0.5, 1.0], [40, 0])}px`,
          padding: "0 60px",
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};

const CTA: React.FC<{ part: number }> = ({ part }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const k = kf(t, [0, 0.5], [0, 1], Easing.out(Easing.back(1.8)));
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 230, fontFamily: FONT }}>
      <div
        style={{
          scale: String(k),
          background: "#ffffff",
          border: "8px solid #1b1b2f",
          borderRadius: 44,
          padding: "30px 44px",
          width: 860,
          textAlign: "center",
          boxShadow: "0 16px 0 rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ fontSize: 70, fontWeight: 700, color: "#1b1b2f", lineHeight: 1.08 }}>
          Seguí mi perfil para ver el próximo resumen
        </div>
        <div
          style={{
            marginTop: 18,
            display: "inline-block",
            background: "#e23b3b",
            color: "#fff",
            fontSize: 54,
            fontWeight: 700,
            borderRadius: 999,
            padding: "10px 40px",
            scale: String(1 + 0.06 * Math.sin(t * 8)),
          }}
        >
          {part === 0 ? "Próxima película ➜" : part < 5 ? `Parte ${part + 1} ➜` : "¡Seguí! ➜"}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Part: React.FC<{ spec: PartSpec; audio: AudioData; audioFile: string }> = ({ spec, audio, audioFile }) => {
  const last = audio.scenes[audio.scenes.length - 1];
  return (
    <AbsoluteFill style={{ backgroundColor: "#1b1b2f" }}>
      {audio.scenes.map((sc, i) => {
        const s = spec.scenes[sc.id];
        if (!s) throw new Error(`Falta la escena ${sc.id}`);
        return (
          <Sequence key={sc.id} name={sc.id} from={sc.from} durationInFrames={sc.dur}>
            <Scene spec={s} first={i === 0} dyn={spec.dyn} />
          </Sequence>
        );
      })}
      <Sequence from={0} durationInFrames={150} name="Título">
        <Title part={spec.part} title={spec.title ?? "Harry Potter y la piedra filosofal"} dyn={spec.dyn} />
      </Sequence>
      <Sequence from={last.voiceFrom + Math.round((last.voiceDur - 3.2) * 30)} name="Seguí mi perfil">
        <CTA part={spec.part} />
      </Sequence>
      {spec.dyn ? <CaptionsDyn words={audio.words} /> : <Captions words={audio.words} />}
      {spec.dyn ? <ProgressBar total={audio.durationInFrames} part={spec.part} /> : null}
      <Audio src={staticFile(audioFile)} />
    </AbsoluteFill>
  );
};
