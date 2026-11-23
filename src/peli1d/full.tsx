import { PartSpec, SceneSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { p1dpart1 } from "./part1";
import { p1dpart2 } from "./part2";
import { p1dpart3 } from "./part3";
import { p1dpart4 } from "./part4";
import { p1dpart5 } from "./part5";
import audioData from "../data/p1full.audio.json";

const scenes: Record<string, SceneSpec> = {};
[p1dpart1, p1dpart2, p1dpart3, p1dpart4, p1dpart5].forEach((p, i) => {
  Object.entries(p.scenes).forEach(([id, sc]) => {
    if (id !== "hook" || i === 0) scenes[`p${i + 1}_${id}`] = sc;
  });
});

export const p1full: PartSpec = { part: 0, title: "Harry Potter y la piedra filosofal", dyn: true, scenes };
export const p1fullAudio = audioData as AudioData;
