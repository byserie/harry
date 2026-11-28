import React from "react";
import { Composition } from "remotion";
import { AudioData } from "../engine/Part";
import { PartSpec } from "../engine/types";
import { Short, ShortDef, shortTiming, HookAudio } from "./Short";
import list from "./list.json";
import hooksData from "../data/hooks.json";
import momentos from "../momentos/list.json";
import momentosHooks from "../data/momentos-hooks.json";
import avShorts from "../avatar/shorts.json";
import avHooks from "../data/av-hooks.json";
import { av1full, av1fullAudio } from "../avatar/av1";
import { rd2, rd2Audio } from "../rd/rd2";
import rdShorts from "../rd/shorts.json";
import rdHooks from "../data/rd-hooks.json";
import { rd3, rd3Audio } from "../rd/rd3";
import miShorts from "../rd/shorts-mitad.json";
import miHooks from "../data/mi-hooks.json";
import guShorts from "../rd/shorts-guero.json";
import guHooks from "../data/gu-hooks.json";
import { gu2, gu2Audio } from "../rd/gu2";
import { p1full, p1fullAudio } from "../peli1d/full";
import { p2full, p2fullAudio } from "../peli2d/full";
import { p3full, p3fullAudio } from "../peli3/full";
import { p4full, p4fullAudio } from "../peli4/full";
import { p5full, p5fullAudio } from "../peli5/full";
import { p6full, p6fullAudio } from "../peli6/full";
import { p7full, p7fullAudio } from "../peli7/full";
import { p8full, p8fullAudio } from "../peli8/full";

const FILMS: Record<number, { spec: PartSpec; audio: AudioData; file: string }> = {
  1: { spec: p1full, audio: p1fullAudio, file: "audio/p1full.wav" },
  2: { spec: p2full, audio: p2fullAudio as AudioData, file: "audio/p2full.wav" },
  3: { spec: p3full, audio: p3fullAudio, file: "audio/p3full.wav" },
  4: { spec: p4full, audio: p4fullAudio, file: "audio/p4full.wav" },
  5: { spec: p5full, audio: p5fullAudio, file: "audio/p5full.wav" },
  6: { spec: p6full, audio: p6fullAudio, file: "audio/p6full.wav" },
  7: { spec: p7full, audio: p7fullAudio, file: "audio/p7full.wav" },
  8: { spec: p8full, audio: p8fullAudio, file: "audio/p8full.wav" },
  9: { spec: av1full, audio: av1fullAudio, file: "audio/av1full.wav" },
  10: { spec: rd2, audio: rd2Audio, file: "audio/rd2.wav" },
  11: { spec: rd3, audio: rd3Audio, file: "audio/rd3.wav" },
  12: { spec: gu2, audio: gu2Audio, file: "audio/gu2.wav" },
};
const hooks = hooksData as Record<string, HookAudio>;

const build = (defs: ShortDef[], hk: Record<string, HookAudio>, prefix: string) =>
  defs.map((def) => {
    const film = FILMS[def.film];
    const C: React.FC = () => <Short def={def} spec={film.spec} audio={film.audio} audioFile={film.file} hook={hk[def.id]} />;
    return { id: `${prefix}-${def.id}`, C, total: shortTiming(def, film.audio, hk[def.id]).total };
  });
const comps = [
  ...build(list as ShortDef[], hooks, "Short"),
  // Momentos clave: pregunta "¿qué pasaría si…?" y la escena directo
  ...build(momentos as ShortDef[], momentosHooks as Record<string, HookAudio>, "Momento"),
  // Avatar: partes con gancho y momentos
  ...build(avShorts as ShortDef[], avHooks as Record<string, HookAudio>, "Short"),
  // Historia de los Marines en partes
  ...build(rdShorts as ShortDef[], rdHooks as Record<string, HookAudio>, "Short"),
  ...build(miShorts as ShortDef[], miHooks as Record<string, HookAudio>, "Short"),
  ...build(guShorts as ShortDef[], guHooks as Record<string, HookAudio>, "Short"),
];

export const ShortCompositions: React.FC = () => (
  <>
    {comps.map(({ id, C, total }) => (
      <Composition key={id} id={id} component={C} durationInFrames={total} fps={30} width={1080} height={1920} />
    ))}
  </>
);
