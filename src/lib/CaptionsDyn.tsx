import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "./font";
import { Word } from "./Captions";
import { LandCtx } from "../engine/layout";

const COLORS = ["#ffffff", "#ffe14d", "#7dff9a", "#7ce3ff", "#ff9ae0"];

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");

/** Emoji que salta cuando se dice la palabra (prefijo normalizado). */
const EMOJI: [string, string][] = [
  ["elfo", "🧝"], ["dobby", "🧝"], ["auto", "🚗"], ["carta", "✉️"], ["lechuza", "🦉"], ["torta", "🎂"],
  ["rejas", "⛓️"], ["escapa", "🏃"], ["reloj", "⏰"], ["desayuno", "🍳"], ["casa", "🏠"], ["muerte", "💀"],
  ["peligro", "⚠️"], ["chimenea", "🔥"], ["fotos", "📸"], ["libros", "📚"], ["cuaderno", "📓"], ["diario", "📓"],
  ["tren", "🚂"], ["nubes", "☁️"], ["arbol", "🌳"], ["sauce", "🌳"], ["grita", "📢"], ["furiosa", "😡"],
  ["furioso", "😡"], ["voz", "👂"], ["sangre", "🩸"], ["gata", "🐈"], ["piedra", "🪨"], ["serpiente", "🐍"],
  ["parsel", "🐍"], ["miedo", "😱"], ["pocion", "🧪"], ["huesos", "🦴"], ["brazo", "💪"], ["arana", "🕷️"],
  ["aranas", "🕷️"], ["monstruo", "👹"], ["basilisco", "🐍"], ["mirada", "👁️"], ["espada", "⚔️"], ["fenix", "🔥"],
  ["lagrimas", "💧"], ["media", "🧦"], ["libre", "🎉"], ["mentira", "🤥"], ["memoria", "🧠"], ["voldemort", "💀"],
  ["secreto", "🤫"], ["hechizo", "🪄"], ["magia", "🪄"], ["magicos", "✨"], ["mago", "🪄"], ["colmillo", "🦷"],
];

const emojiFor = (w: string) => {
  const n = norm(w);
  if (n.length < 3) return null;
  const hit = EMOJI.find(([k]) => n.startsWith(k));
  return hit ? hit[1] : null;
};

type Page = { words: Word[]; start: number; end: number; idx: number };

const paginate = (words: Word[]): Page[] => {
  const pages: Page[] = [];
  let cur: Word[] = [];
  const flush = () => {
    if (cur.length) pages.push({ words: cur, start: cur[0].start, end: cur[cur.length - 1].end, idx: pages.length });
    cur = [];
  };
  words.forEach((w, i) => {
    cur.push(w);
    const chars = cur.map((c) => c.text).join(" ").length;
    const punct = /[.,;:!?…]$/.test(w.text);
    const next = words[i + 1];
    const short = next && next.text.replace(/[^\p{L}]/gu, "").length <= 2;
    if (punct || chars > 11 || cur.length >= 2 || (cur.length === 1 && !short && w.text.length > 6)) flush();
  });
  flush();
  return pages;
};

export const CaptionsDyn: React.FC<{ words: Word[] }> = ({ words }) => {
  const land = React.useContext(LandCtx);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const pages = useMemo(() => paginate(words), [words]);
  const page = pages.find((p, i) => t >= p.start - 0.03 && t < Math.min(pages[i + 1]?.start ?? p.end + 0.5, p.end + 0.5));
  const emo = useMemo(() => words.map((w) => ({ w, e: emojiFor(w.text) })).filter((o) => o.e), [words]);
  const em = [...emo].reverse().find((o) => t >= o.w.start && t < o.w.start + 1.1);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {em ? (
        <div
          style={{
            position: "absolute",
            left: land ? 1620 : 0,
            right: land ? 0 : 0,
            width: land ? 300 : undefined,
            top: land ? 430 : 1270,
            textAlign: "center",
            fontSize: land ? 170 : 150,
            scale: String(Math.min(1.25, 0.3 + (t - em.w.start) * 6) - Math.max(0, t - em.w.start - 0.15) * 0.25),
            rotate: `${Math.sin((t - em.w.start) * 14) * 10}deg`,
            filter: "drop-shadow(0 10px 0 rgba(0,0,0,0.35))",
          }}
        >
          {em.e}
        </div>
      ) : null}
      {page ? (
        <div
          style={{
            position: "absolute",
            left: land ? 320 : 40,
            right: land ? 320 : 40,
            top: land ? 830 : 1470,
            height: land ? 220 : 230,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0 24px",
            flexWrap: "wrap",
            textAlign: "center",
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: land ? 104 : 112,
            lineHeight: 1.0,
          }}
        >
          {page.words.map((w, i) => {
            const d = t - Math.max(page.start, w.start - 0.02);
            const s = d < 0 ? 0.6 : d < 0.08 ? 0.6 + (d / 0.08) * 0.7 : d < 0.16 ? 1.3 - ((d - 0.08) / 0.08) * 0.3 : 1;
            const color = COLORS[(page.idx + i) % COLORS.length];
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  color,
                  WebkitTextStroke: "16px #121220",
                  paintOrder: "stroke fill",
                  textShadow: "0 10px 0 rgba(0,0,0,0.4)",
                  scale: String(s),
                  rotate: `${(page.idx % 2 ? 1 : -1) * 3}deg`,
                  opacity: d < 0 ? 0.35 : 1,
                }}
              >
                {w.text.toUpperCase()}
              </span>
            );
          })}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

export const ProgressBar: React.FC<{ total: number; part: number }> = ({ total, part }) => {
  const frame = useCurrentFrame();
  const k = frame / total;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 16, background: "rgba(0,0,0,0.35)" }}>
        <div style={{ width: `${k * 100}%`, height: 16, background: "linear-gradient(90deg,#ffd23a,#ff5a3c)" }} />
      </div>
      {part ? <div
        style={{
          position: "absolute",
          right: 28,
          top: 34,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 38,
          color: "#fff",
          background: "rgba(27,27,47,0.75)",
          borderRadius: 999,
          padding: "6px 22px",
          border: "4px solid #ffd23a",
        }}
      >
        {part}/5
      </div> : null}
    </AbsoluteFill>
  );
};
