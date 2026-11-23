import React from "react";
import { AbsoluteFill } from "remotion";
import { AudioData } from "../engine/Part";
import { FONT } from "../lib/font";
import { kf } from "../lib/pose";

/** Tiempo local (s) en que se dice una palabra dentro de una escena. */
export const wordClock = (audio: AudioData) => (scene: string, word: string, nth = 0): number => {
  const sc = audio.scenes.find((s) => s.id === scene);
  if (!sc) throw new Error(`escena ${scene}`);
  const start = sc.from / audio.fps;
  const end = (sc.from + sc.dur) / audio.fps;
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
  const target = norm(word);
  const hits = audio.words.filter((w) => w.start >= start - 0.01 && w.start < end && norm(w.text).startsWith(target));
  const hit = hits[nth] ?? hits[0];
  if (!hit) throw new Error(`palabra "${word}" no encontrada en ${scene}`);
  return hit.start - start;
};

export const Banner: React.FC<{ t: number; text: string; t0?: number; t1?: number; color?: string }> = ({ t, text, t0 = 0.3, t1 = 2.8, color = "#ffe66d" }) => {
  const k = kf(t, [t0, t0 + 0.35, t1, t1 + 0.35], [0, 1, 1, 0]);
  if (k <= 0) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 220 }}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 72,
          color: "#1b1b2f",
          background: color,
          border: "7px solid #1b1b2f",
          borderRadius: 30,
          padding: "10px 40px",
          scale: String(0.7 + 0.3 * k),
          opacity: k,
          rotate: "-2deg",
          boxShadow: "0 12px 0 rgba(0,0,0,0.3)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

/** Flash blanco breve (impactos). */
export const Flash: React.FC<{ t: number; at: number; dur?: number; color?: string }> = ({ t, at, dur = 0.3, color = "#fff" }) => {
  const k = kf(t, [at, at + 0.04, at + dur], [0, 0.8, 0]);
  return k > 0 ? <AbsoluteFill style={{ backgroundColor: color, opacity: k }} /> : null;
};

/** Cambia de fondo a mitad de escena con un destello. */
export const switchAt = (at: number, A: React.FC<{ t: number }>, B: React.FC<{ t: number }>): React.FC<{ t: number }> => {
  const C: React.FC<{ t: number }> = ({ t }) => (t < at ? <A t={t} /> : <B t={t} />);
  return C;
};
