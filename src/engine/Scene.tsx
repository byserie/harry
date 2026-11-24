import React from "react";
import { AbsoluteFill, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Stickman } from "../characters/Stickman";
import { Figure, FIGS } from "../characters/Figure";
import { Camera } from "../lib/Camera";
import { kf } from "../lib/pose";
import { charState } from "./charState";
import { SceneSpec, Trans } from "./types";
import { dynCam, Pops, SpeedLines } from "./Dyn";
import { BAND, LAND_SCALE, LandCtx, WideCtx } from "./layout";

const TRANS_FRAMES = 12;

const Chars: React.FC<{ spec: SceneSpec; t: number }> = ({ spec, t }) => {
  const states = spec.chars.map((c) => ({ c, st: charState(c, t) })).filter((o) => o.st.show);
  states.sort((a, b) => a.st.y - b.st.y);
  return (
    <>
      {states.map(({ c, st }, i) =>
        FIGS[c.who] ? (
          <Figure
            key={`${c.who}-${i}`}
            who={c.who}
            x={st.x}
            y={st.y}
            scale={st.s}
            facing={st.facing}
            pose={st.pose}
            expression={st.expr}
            rotate={st.rot}
            showName={c.name ?? true}
            opacity={(c.opacity ?? 1) * st.alpha}
            holding={c.holding?.(t)}
            stone={st.stone}
          />
        ) : (
        <Stickman
          key={`${c.who}-${i}`}
          who={c.who}
          x={st.x}
          y={st.y}
          scale={st.s}
          facing={st.facing}
          pose={st.pose}
          expression={st.expr}
          wand={st.wand}
          wandGlow={st.glow}
          broom={c.broom}
          rotate={st.rot}
          showName={c.name ?? true}
          opacity={(c.opacity ?? 1) * st.alpha}
          holding={c.holding?.(t)}
          stone={st.stone}
        />
        ),
      )}
    </>
  );
};

const camAt = (spec: SceneSpec, t: number) => {
  let keys = spec.cam ?? [
    { t: 0, z: 1.0, x: 540, y: 1100 },
    { t: 14, z: 1.08, x: 540, y: 1100 },
  ];
  keys = [...keys].sort((a, b) => a.t - b.t).filter((k, i, arr) => i === 0 || k.t > arr[i - 1].t + 0.01);
  const ts = keys.map((k) => k.t);
  const e = Easing.inOut(Easing.cubic);
  if (keys.length === 1) return { z: Math.max(1, keys[0].z), x: keys[0].x ?? 540, y: keys[0].y ?? 1100 };
  return {
    z: Math.max(1, kf(t, ts, keys.map((k) => k.z), e)),
    x: kf(t, ts, keys.map((k) => k.x ?? 540), e),
    y: kf(t, ts, keys.map((k) => k.y ?? 1100), e),
  };
};

const transStyle = (trans: Trans, f: number, tf = TRANS_FRAMES): React.CSSProperties => {
  if (f >= tf) return {};
  const k = Easing.out(Easing.cubic)(f / tf);
  switch (trans) {
    case "circle":
      return { clipPath: `circle(${k * 120}% at 50% 45%)` };
    case "wipe":
      return { clipPath: `inset(0 ${100 - k * 100}% 0 0)` };
    case "slide":
      return { translate: `${(1 - k) * 100}% 0` };
    case "zoom":
      return { scale: String(1.35 - 0.35 * k), opacity: k };
    default:
      return { opacity: k };
  }
};

export const Scene: React.FC<{ spec: SceneSpec; first?: boolean; dyn?: boolean; noSfx?: boolean }> = ({ spec, first, dyn = false, noSfx = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const land = React.useContext(LandCtx);
  const wide = React.useContext(WideCtx);
  const t = frame / fps;
  const cam0 = camAt(spec, t);
  const dc = dyn ? dynCam(spec, t, land) : { zMul: 1, xOff: 0, rot: 0 };
  const cam = land ? { z: Math.max(1, 1 + (cam0.z - 1) * 0.75) * dc.zMul, x: cam0.x + dc.xOff, y: cam0.y } : { z: cam0.z * dc.zMul, x: cam0.x + dc.xOff, y: cam0.y };
  let shake = 0;
  for (const [st, amt, d = 0.35] of spec.shake ?? []) {
    if (t >= st && t < st + d) shake = Math.max(shake, amt * (1 - (t - st) / d));
  }
  const Bg = spec.bg;
  const Under = spec.under;
  const Fx = spec.fx;
  const Overlay = spec.overlay;
  return (
    <AbsoluteFill style={first ? {} : transStyle(dyn ? "slide" : spec.trans ?? "circle", frame, dyn ? 8 : TRANS_FRAMES)}>
      <AbsoluteFill style={{ backgroundColor: "#1b1b2f", overflow: "hidden", rotate: `${dc.rot}deg`, scale: dc.rot ? "1.04" : undefined }}>
        {land ? (
          <>
            {wide ? null : <div
              style={{
                position: "absolute",
                left: 0,
                top: 540 - (BAND.top + BAND.height / 2) * (1920 / 1080),
                width: 1080,
                height: 1920,
                transformOrigin: "0 0",
                scale: String(1920 / 1080),
                filter: "blur(16px) brightness(0.55) saturate(1.2)",
              }}
            >
              <Bg t={t} />
            </div>}
            <div
              style={{
                position: "absolute",
                left: (1920 - 1080 * LAND_SCALE) / 2,
                top: -(BAND.top + (wide ? 110 : 0)) * LAND_SCALE,
                width: 1080,
                height: 1920,
                transformOrigin: "0 0",
                scale: String(LAND_SCALE),
                overflow: wide ? "visible" : "hidden",
                boxShadow: wide ? undefined : "0 0 60px 20px rgba(0,0,0,0.6)",
              }}
            >
              <Camera zoom={cam.z} fx={cam.x} fy={cam.y} shake={shake} frame={frame}>
                <Bg t={t} />
                {Under ? <Under t={t} /> : null}
                <Chars spec={spec} t={t} />
                {Fx ? <Fx t={t} /> : null}
              </Camera>
            </div>
          </>
        ) : (
          <Camera zoom={cam.z} fx={cam.x} fy={cam.y} shake={shake} frame={frame}>
            <Bg t={t} />
            {Under ? <Under t={t} /> : null}
            <Chars spec={spec} t={t} />
            {Fx ? <Fx t={t} /> : null}
          </Camera>
        )}
        {dyn ? <SpeedLines spec={spec} t={t} /> : null}
        {Overlay ? <Overlay t={t} /> : null}
        {dyn ? <Pops spec={spec} t={t} /> : null}
        {dyn && !first && frame < 4 ? <AbsoluteFill style={{ backgroundColor: "#fff", opacity: 0.6 * (1 - frame / 4) }} /> : null}
      </AbsoluteFill>
      {first ? null : (
        <Sequence durationInFrames={20} layout="none">
          <Audio src={staticFile("sfx/whoosh.wav")} volume={dyn ? 0.45 : 0.25} />
        </Sequence>
      )}
      {(noSfx ? [] : spec.sfx ?? []).map((s, i) => (
        <Sequence key={i} from={Math.round(s.t * fps)} durationInFrames={Math.round(3.2 * fps)} layout="none">
          <Audio src={staticFile(`sfx/${s.s}.wav`)} volume={s.v ?? 0.5} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export { TRANS_FRAMES };
