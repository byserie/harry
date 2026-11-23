import { PartSpec, SceneSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { Svg } from "../scenes/bg1";
import { wordClock } from "../scenes/util";
import { Bedroom, FlyingCar } from "../peli2/assets";
import { p2dpart1 } from "./part1";
import { p2dpart2 } from "./part2";
import { p2dpart3 } from "./part3";
import { p2dpart4 } from "./part4";
import { p2dpart5 } from "./part5";
import audioData from "../data/p2full.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);
const hElfo = w("full_hook", "elfo");
const hAuto = w("full_hook", "auto");
const hMonstruo = w("full_hook", "monstruo");
const hAdvertencia = w("full_hook", "advertencia");
const WINDOW = "polygon(566px 426px, 994px 426px, 994px 934px, 566px 934px)";

const hook: SceneSpec = {
  bg: Bedroom,
  under: ({ t }) =>
    t > hAuto - 0.4 && t < hAuto + 2.4 ? (
      <div style={{ position: "absolute", inset: 0, clipPath: WINDOW }}>
        <Svg>
          <FlyingCar x={kf(t, [hAuto - 0.4, hAuto + 2.4], [1150, 420], (x) => x)} y={700 + Math.sin(t * 4) * 20} s={0.55} t={t} riders={["#e0662a", "#e0662a", "#e0662a"]} />
        </Svg>
      </div>
    ) : null,
  fx: ({ t }) => (
    <Svg>
      {t > hElfo - 0.3 && t < hElfo + 1 ? <Sparkles x={300} y={1100} intensity={kf(t, [hElfo - 0.3, hElfo, hElfo + 1], [0, 1.3, 0])} seed={2} count={18} /> : null}
      {t > hMonstruo - 0.2 && t < hAdvertencia ? (
        <g opacity={kf(t, [hMonstruo - 0.2, hMonstruo + 0.2, hAdvertencia - 0.4, hAdvertencia], [0, 1, 1, 0])}>
          <rect x={0} y={0} width={1080} height={1920} fill="#05050c" opacity={0.75} />
          <ellipse cx={420} cy={760} rx={70} ry={46} fill="#ffe66d" />
          <ellipse cx={660} cy={760} rx={70} ry={46} fill="#ffe66d" />
          <ellipse cx={428} cy={760} rx={14} ry={40} fill={INK} />
          <ellipse cx={668} cy={760} rx={14} ry={40} fill={INK} />
        </g>
      ) : null}
    </Svg>
  ),
  chars: [
    { who: "harry", x: 520, y: 1440, acts: [{ t: 3.6, look: 0.3 }, { t: hElfo, expr: "surprise" }, { t: hElfo, face: -1 }, { t: hAuto - 0.2, face: 1 }, { t: hAuto - 0.2, expr: "joy" }, { t: hMonstruo, expr: "surprise" }, { t: hMonstruo, pose: "cower", dur: 1.4 }, { t: hAdvertencia, expr: "focus" }, { t: hAdvertencia, pose: "think" }] },
    { who: "dobby", x: 260, y: 1440, show: false, acts: [{ t: hElfo - 0.1, show: true }, { t: hElfo, pose: "wave", dur: 1.4 }, { t: hElfo, expr: "joy" }, { t: hAdvertencia - 0.2, expr: "sadness" }, { t: hAdvertencia - 0.2, pose: "point" }] },
  ],
  cam: [
    { t: 0, z: 1.0, y: 1100 },
    { t: hAuto, z: 1.15, x: 700, y: 900 },
    { t: hAdvertencia, z: 1.3, x: 420, y: 1100 },
  ],
  sfx: [
    { t: hElfo - 0.1, s: "pop", v: 0.6 },
    { t: hAuto - 0.3, s: "whoosh", v: 0.6 },
    { t: hMonstruo - 0.1, s: "roar", v: 0.5 },
    { t: hAdvertencia, s: "rumble", v: 0.4 },
  ],
};

const scenes: Record<string, SceneSpec> = { full_hook: hook };
[p2dpart1, p2dpart2, p2dpart3, p2dpart4, p2dpart5].forEach((p, i) => {
  Object.entries(p.scenes).forEach(([id, sc]) => {
    if (id !== "hook") scenes[`p${i + 1}_${id}`] = sc;
  });
});

export const p2full: PartSpec = { part: 0, title: "Harry Potter y la cámara secreta", dyn: true, scenes };
export const p2fullAudio = audio;
