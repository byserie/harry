import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "./font";

export type Word = { text: string; start: number; end: number };

type Page = { words: Word[]; start: number; end: number };

const paginate = (words: Word[]): Page[] => {
  const pages: Page[] = [];
  let cur: Word[] = [];
  const flush = () => {
    if (cur.length) pages.push({ words: cur, start: cur[0].start, end: cur[cur.length - 1].end });
    cur = [];
  };
  words.forEach((w, i) => {
    cur.push(w);
    const chars = cur.map((c) => c.text).join(" ").length;
    const punct = /[.,;:!?…]$/.test(w.text);
    const next = words[i + 1];
    const gap = next ? next.start - w.end > 0.35 : true;
    if (chars > 16 || punct || gap || cur.length >= 4) flush();
  });
  flush();
  return pages;
};

/** Subtítulos grandes en la franja inferior, con la palabra actual resaltada. */
export const Captions: React.FC<{ words: Word[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const pages = useMemo(() => paginate(words), [words]);
  const page = pages.find((p, i) => t >= p.start - 0.05 && t < (pages[i + 1]?.start ?? p.end + 0.6) && t < p.end + 0.6);
  if (!page) return null;
  const pop = Math.min(1, (t - page.start + 0.05) / 0.12);
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: 1450,
        height: 230,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        flexWrap: "wrap",
        gap: "0 22px",
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 84,
        lineHeight: 1.08,
        scale: String(0.9 + 0.1 * pop),
      }}
    >
      {page.words.map((w, i) => {
        const activeIdx = page.words.reduce((acc, ww, j) => (t >= ww.start ? j : acc), -1);
        const active = i === activeIdx && t < page.end + 0.3;
        return (
          <span
            key={i}
            style={{
              color: active ? "#ffe14d" : "#ffffff",
              WebkitTextStroke: "14px #121220",
              paintOrder: "stroke fill",
              textShadow: "0 8px 0 rgba(0,0,0,0.35)",
              display: "inline-block",
              translate: active ? "0 -6px" : "0 0",
            }}
          >
            {w.text.toUpperCase()}
          </span>
        );
      })}
    </div>
  );
};
