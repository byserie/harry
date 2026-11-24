import { PartSpec, SceneSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Svg } from "../scenes/bg1";
import { Flash, switchAt, wordClock } from "../scenes/util";
import { Bow, LinkLab, PandoraDay, PandoraNight, Pod, Woodsprites } from "./assets";
import audioData from "../data/avdemo.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);

const h = { silla: w("hook", "silla"), pandora: w("hook", "pandora"), avatar: w("hook", "avatar", 1) };
const l = { capsula: w("link", "capsula"), cierra: w("link", "cierra"), despierta: w("link", "despierta"), dedos: w("link", "dedos"), para: w("link", "para"), corriendo: w("link", "corriendo"), caminar: w("link", "caminar") };
const n = { noche: w("noche", "noche"), neytiri: w("noche", "neytiri"), semillas: w("noche", "semillas"), posan: w("noche", "posan"), senal: w("noche", "senal") };

const scenes: Record<string, SceneSpec> = {
  hook: {
    bg: switchAt(h.pandora - 0.2, LinkLab, ({ t }) => <PandoraDay t={t} />),
    under: ({ t }) => <Svg>{t < h.pandora - 0.2 ? <Pod x={760} y={1400} s={0.9} t={t} k={0} /> : null}</Svg>,
    chars: [
      { who: "jake", x: 120, y: 1470, acts: [{ t: 0.2, walk: 380, dur: 1.6 }, { t: h.silla, expr: "neutral" }, { t: h.pandora - 0.2, show: false }] },
      { who: "jakenavi", x: 540, y: 1470, show: false, acts: [{ t: h.avatar - 0.2, show: true }, { t: h.avatar - 0.2, alpha: 0 }, { t: h.avatar - 0.2, alpha: 1, dur: 0.5 }, { t: h.avatar, expr: "surprise" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1150 }, { t: h.silla, z: 1.35, x: 380, y: 1250 }, { t: h.pandora, z: 1.0, y: 1100 }, { t: h.avatar, z: 1.25, x: 540, y: 1150 }],
    sfx: [{ t: h.pandora - 0.2, s: "whoosh", v: 0.6 }, { t: h.avatar, s: "sparkle", v: 0.5 }],
    overlay: ({ t }) => <Flash t={t} at={h.pandora - 0.2} dur={0.3} />,
  },
  link: {
    bg: switchAt(l.despierta - 0.2, LinkLab, ({ t }) => <PandoraDay t={t} />),
    under: ({ t }) => (
      <Svg>{t < l.despierta - 0.2 ? <Pod x={560} y={1420} s={1.1} t={t} k={kf(t, [l.cierra - 0.3, l.cierra + 0.4], [0, 1])} glow={kf(t, [l.cierra, l.despierta - 0.3], [0, 1])} /> : null}</Svg>
    ),
    chars: [
      { who: "jake", x: 260, y: 1470, acts: [{ t: 0, expr: "focus" }, { t: l.capsula - 0.2, alpha: 0, dur: 0.4 }] },
      {
        who: "jakenavi",
        x: 420,
        y: 1470,
        show: false,
        acts: [
          { t: l.despierta - 0.2, show: true },
          { t: l.despierta - 0.2, rot: -82 },
          { t: l.despierta - 0.2, expr: "sleep" },
          { t: l.despierta + 0.3, expr: "surprise" },
          { t: l.dedos, pose: "armsUp", dur: 0.8 },
          { t: l.para - 0.2, rot: 0, dur: 0.5 },
          { t: l.para + 0.3, expr: "joy" },
          { t: l.corriendo - 0.2, walk: 1250, dur: 1.6, run: true },
        ],
      },
    ],
    cam: [{ t: 0, z: 1.15, x: 480, y: 1250 }, { t: l.cierra, z: 1.4, x: 560, y: 1300 }, { t: l.despierta, z: 1.3, x: 420, y: 1300 }, { t: l.para, z: 1.1, y: 1150 }, { t: l.corriendo, z: 1.0, y: 1100 }],
    sfx: [{ t: l.cierra, s: "whoosh", v: 0.5 }, { t: l.despierta - 0.2, s: "zap", v: 0.6 }, { t: l.para, s: "pop", v: 0.5 }, { t: l.corriendo, s: "step", v: 0.6 }, { t: l.corriendo + 0.4, s: "step", v: 0.6 }],
    overlay: ({ t }) => <Flash t={t} at={l.despierta - 0.2} dur={0.4} color="#bff4ff" />,
  },
  noche: {
    bg: ({ t }) => <PandoraNight t={t} glow={kf(t, [0, 1.5], [0.4, 1])} />,
    fx: ({ t }) => <Svg>{t > n.semillas - 0.6 ? <Woodsprites t={t} n={9} cx={kf(t, [n.semillas - 0.6, n.posan + 0.5], [540, 380])} cy={kf(t, [n.semillas - 0.6, n.posan + 0.5], [600, 1000])} k={kf(t, [n.semillas - 0.6, n.semillas + 0.4], [0, 1])} /> : null}</Svg>,
    chars: [
      { who: "jakenavi", x: 360, y: 1470, acts: [{ t: 0, expr: "surprise" }, { t: 0, pose: "cower", dur: n.neytiri + 0.2 }, { t: n.neytiri + 0.4, expr: "surprise" }, { t: n.posan, pose: "armsUp", dur: 1.5 }, { t: n.senal, expr: "joy" }] },
      { who: "neytiri", x: 1250, y: 1470, facing: -1, holding: () => <Bow r={10} s={0.9} />, acts: [{ t: n.neytiri - 0.6, walk: 760, dur: 1.2 }, { t: n.neytiri + 0.6, expr: "focus" }, { t: n.posan, expr: "surprise" }] },
    ],
    cam: [{ t: 0, z: 1.25, x: 380, y: 1200 }, { t: n.neytiri, z: 1.0, y: 1100 }, { t: n.semillas, z: 1.05, y: 1050 }, { t: n.senal, z: 1.3, x: 400, y: 1150 }],
    sfx: [{ t: 0.3, s: "rumble", v: 0.4 }, { t: n.neytiri, s: "whoosh", v: 0.5 }, { t: n.semillas, s: "sparkle", v: 0.6 }, { t: n.senal, s: "chime", v: 0.5 }],
  },
};

export const avdemo: PartSpec = { part: 0, title: "Avatar", dyn: true, scenes };
export const avdemoAudio = audio;
