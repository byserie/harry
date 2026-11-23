import React from "react";
import { AbsoluteFill, Easing, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Stickman, Sparkles } from "../characters/Stickman";
import { act, armsUp, kf, STAND, surprised, walk, walkPhase, wandUp, wave, with_ } from "../lib/pose";
import { Camera } from "../lib/Camera";
import { Courtyard } from "./backgrounds/Courtyard";
import { Captions } from "../lib/Captions";
import audio from "../data/test.audio.json";

const S = 1.9;
const FLOOR = 1390;

const Cast: React.FC = () => {
  const f = useCurrentFrame();
  const easeOut = Easing.out(Easing.quad);

  // Harry: entra desde la izquierda hasta el centro
  const hx = kf(f, [0, 58], [-300, 540], easeOut);
  const harryPose = act(f, [
    { from: 0, to: 58, pose: () => walk(walkPhase(hx + 300, S)) },
    { from: 58, to: 66, pose: () => STAND },
    { from: 66, to: 90, pose: (l) => with_(wave(l), { headTurn: 0.8 }) },
    { from: 90, to: 112, pose: () => surprised },
    { from: 112, to: 160, pose: (l) => armsUp(l) },
  ]);
  const harryFacing = f >= 64 && f < 90 ? -1 : 1;
  const harryExpr = f < 64 ? "neutral" : f < 92 ? "joy" : f < 112 ? "surprise" : "joy";

  // Ron: entra desde la izquierda, saluda a Harry
  const rx = kf(f, [0, 45], [-220, 250], easeOut);
  const ronPose = act(f, [
    { from: 0, to: 45, pose: () => walk(walkPhase(rx + 220, S)) },
    { from: 45, to: 60, pose: () => with_(STAND, { headTurn: 0.9 }) },
    { from: 60, to: 90, pose: (l) => wave(l + 10) },
    { from: 90, to: 112, pose: () => surprised },
    { from: 112, to: 160, pose: (l) => armsUp(l + 6) },
  ]);
  const ronExpr = f < 58 ? "neutral" : f < 92 ? "joy" : f < 112 ? "surprise" : "joy";

  // Hermione: entra desde la derecha, levanta la varita
  const ex = kf(f, [0, 48], [1320, 830], easeOut);
  const hermPose = act(f, [
    { from: 0, to: 48, pose: () => walk(walkPhase(1320 - ex, S)) },
    { from: 48, to: 78, pose: () => with_(STAND, { headTurn: 0.7 }) },
    { from: 78, to: 160, pose: (l) => wandUp(l) },
  ]);
  const hermExpr = f < 60 ? "neutral" : f < 78 ? "joy" : f < 108 ? "focus" : "joy";
  const glow = kf(f, [88, 96, 140, 150], [0, 1, 1, 0.6]);

  return (
    <>
      <Stickman who="ron" x={rx} y={FLOOR} scale={S} pose={ronPose} expression={ronExpr} />
      <Stickman who="harry" x={hx} y={FLOOR + 10} scale={S} facing={harryFacing} pose={harryPose} expression={harryExpr} />
      <Stickman who="hermione" x={ex} y={FLOOR} scale={S} facing={-1} pose={hermPose} expression={hermExpr} wand wandGlow={glow} />
    </>
  );
};

const SkyBurst: React.FC = () => {
  const f = useCurrentFrame();
  const k = kf(f, [104, 116, 140, 150], [0, 1.6, 1.4, 0]);
  if (k <= 0) return null;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <Sparkles x={540} y={400} intensity={k} seed={3} count={34} />
      <Sparkles x={260} y={520} intensity={k * 0.6} seed={9} count={14} color="#9fe8ff" />
      <Sparkles x={820} y={500} intensity={k * 0.6} seed={21} count={14} color="#ffb3f0" />
    </svg>
  );
};

export const TestScene: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = kf(f, [0, 150], [1.0, 1.13], Easing.inOut(Easing.sin));
  const shake = kf(f, [92, 95, 104], [0, 1, 0], Easing.linear);
  return (
    <AbsoluteFill style={{ backgroundColor: "#1b1b2f" }}>
      <Camera zoom={zoom} fx={540} fy={1100} shake={shake} frame={f}>
        <Courtyard parallax={(zoom - 1) * 300} />
        <Cast />
        <SkyBurst />
      </Camera>
      <Captions words={audio.words} />
      <Audio src={staticFile("audio/test.wav")} />
    </AbsoluteFill>
  );
};
