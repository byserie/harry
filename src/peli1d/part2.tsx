import { PartSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { Svg } from "../scenes/bg1";
import { Diagon, GreatHall, Station, TrainInside, Vault, WandShop } from "../scenes/bg2";
import { Book, Confetti, Frog, Owl, Package, SortingHat } from "../scenes/props";
import { Flash, wordClock } from "../scenes/util";
import audioData from "../data/p1dpart2.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);

const hOro = w("hook", "oro");
const hVarita = w("hook", "varita");
const hMundo = w("hook", "mundo");

const aToca = w("callejon", "toca");
const aAbre = w("callejon", "abre");
const aCalderos = w("callejon", "calderos");

const bOro = w("banco", "oro");
const bPaquete = w("banco", "paquetito");
const bDice = w("banco", "dice");

const vPrueba = w("varita", "prueba");
const vChispas = w("varita", "chispas");
const vLechuza = w("varita", "lechuza");

const pBusca = w("anden", "busca");
const pCorrer = w("anden", "correr");
const pAtravesar = w("anden", "atravesarla");

const tRon = w("tren", "ron");
const tRanas = w("tren", "ranas");
const tAsquerosos = w("tren", "asquerosos");

const eAparece = w("hermione", "aparece");
const eDraco = w("hermione", "draco");
const eRechaza = w("hermione", "rechaza");
const eRon = w("hermione", "ron");

const sSombrero = w("sombrero", "sombrero");
const sDuda = w("sombrero", "duda");
const sSly = w("sombrero", "slytherin");
const sPide = w("sombrero", "pide");
const sGry = w("sombrero", "gryffindor");

const cGry = w("cierre", "gryffindor");

const Bricks: React.FC<{ t: number; open: number }> = ({ open }) => (
  <Svg>
    {[0, 1].map((side) => (
      <g key={side} transform={`translate(${(side ? 1 : -1) * open * 560} 0)`}>
        <rect x={side ? 540 : 0} y={0} width={540} height={1270} fill="#a8513b" />
        {Array.from({ length: 22 }).map((_, r) =>
          Array.from({ length: 6 }).map((__, c) => (
            <rect
              key={`${r}-${c}`}
              x={(side ? 540 : 0) + c * 100 - (r % 2) * 50}
              y={r * 58}
              width={96}
              height={54}
              fill={(r + c) % 3 ? "#b55a42" : "#9c4a35"}
              stroke="#6b2f20"
              strokeWidth={3}
            />
          )),
        )}
      </g>
    ))}
  </Svg>
);

export const p1dpart2: PartSpec = {
  dyn: true,
  title: "Harry Potter y la piedra filosofal",
  part: 2,
  scenes: {
    hook: {
      bg: Diagon,
      fx: ({ t }) => (
        <Svg>
          <Owl x={kf(t, [1, 5], [1250, -200])} y={kf(t, [1, 5], [600, 420])} t={t} fly />
          {t > hOro - 0.2 && t < hOro + 2 ? <Sparkles x={540} y={700} intensity={kf(t, [hOro - 0.2, hOro, hOro + 2], [0, 1.4, 0])} seed={5} count={22} color="#ffd23a" /> : null}
        </Svg>
      ),
      chars: [
        {
          who: "hagrid",
          x: -400,
          y: 1450,
          s: 1.5,
          acts: [{ t: 0.2, walk: 790 }, { t: 3.6, face: -1 }, { t: 3.6, expr: "joy" }, { t: hMundo, pose: "wave", dur: 2 }],
        },
        {
          who: "harry",
          x: -150,
          y: 1420,
          acts: [
            { t: 0.6, walk: 380 },
            { t: 2.3, look: 0.6 },
            { t: 2.3, pose: "surprised", dur: 2 },
            { t: 2.3, expr: "surprise" },
            { t: hVarita - 0.2, wand: true },
            { t: hVarita - 0.2, pose: "wandUp" },
            { t: hVarita - 0.1, glow: 1 },
            { t: hVarita - 0.1, expr: "joy" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1100 },
        { t: hVarita, z: 1.2, x: 420, y: 1050 },
        { t: 12.4, z: 1.1, x: 540, y: 1100 },
      ],
      sfx: [
        { t: 1.2, s: "flutter", v: 0.5 },
        { t: hOro - 0.1, s: "coins", v: 0.6 },
        { t: hVarita - 0.1, s: "sparkle", v: 0.6 },
        { t: hMundo, s: "chime", v: 0.5 },
      ],
    },

    callejon: {
      bg: Diagon,
      under: ({ t }) => <Bricks t={t} open={kf(t, [aAbre - 0.1, aAbre + 1.2], [0, 1])} />,
      chars: [
        {
          who: "hagrid",
          x: 720,
          y: 1450,
          s: 1.5,
          facing: -1,
          acts: [
            { t: 0.3, face: 1 },
            { t: aToca - 0.4, wand: true },
            { t: aToca - 0.3, pose: "wandAim", dur: 1.4 },
            { t: aToca - 0.1, glow: 1 },
            { t: aToca + 1.0, glow: 0 },
            { t: aToca + 1.1, wand: false },
            { t: aAbre + 1.2, face: -1 },
            { t: aAbre + 1.2, expr: "joy" },
          ],
        },
        {
          who: "harry",
          x: 330,
          y: 1420,
          acts: [
            { t: 0.3, look: 0.9 },
            { t: aAbre, expr: "surprise" },
            { t: aAbre, pose: "surprised", dur: 1.5 },
            { t: aCalderos - 0.6, walk: 470 },
            { t: aCalderos + 0.6, pose: "cheer" },
            { t: aCalderos + 0.6, expr: "joy" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.25, x: 640, y: 1050 },
        { t: aAbre, z: 1.05, x: 540, y: 1100 },
        { t: aCalderos, z: 0.95, x: 540, y: 1000 },
        { t: 14, z: 1.05, x: 540, y: 1000 },
      ],
      sfx: [
        { t: aToca - 0.1, s: "knock", v: 0.4 },
        { t: aToca, s: "sparkle", v: 0.4 },
        { t: aAbre - 0.1, s: "rumble", v: 0.8 },
        { t: aCalderos, s: "chime", v: 0.4 },
      ],
      shake: [[aAbre, 0.4, 1.2]],
      trans: "fade",
    },

    banco: {
      bg: Vault,
      fx: ({ t }) => (
        <Svg>
          {t > bOro - 0.2 ? <Sparkles x={540} y={1150} intensity={kf(t, [bOro - 0.2, bOro + 0.2, bOro + 3], [0, 1.5, 0.5])} seed={8} count={26} color="#ffd23a" /> : null}
        </Svg>
      ),
      chars: [
        { who: "duende", x: 160, y: 1420, s: 1.9, acts: [{ t: 0.5, pose: "point", dur: 2.5 }, { t: 0.5, expr: "focus" }] },
        {
          who: "harry",
          x: 420,
          y: 1430,
          acts: [
            { t: 0.6, look: 0.5 },
            { t: bOro - 0.3, expr: "surprise" },
            { t: bOro - 0.3, pose: "surprised", dur: 1.4 },
            { t: bOro + 1.2, pose: "cheer", dur: 1.6 },
            { t: bOro + 1.2, expr: "joy" },
            { t: bPaquete, face: 1 },
            { t: bPaquete + 0.2, pose: "think" },
            { t: bPaquete + 0.2, expr: "focus" },
          ],
        },
        {
          who: "hagrid",
          x: 820,
          y: 1450,
          s: 1.5,
          facing: -1,
          holding: (t) => (t > bPaquete - 0.4 ? <Package x={10} y={-10} s={0.6} /> : null),
          acts: [
            { t: bPaquete - 0.4, pose: "hold", dur: 1.6 },
            { t: bDice - 0.4, pose: "think" },
            { t: bDice - 0.4, expr: "focus" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: bOro, z: 1.2, x: 460, y: 1100 },
        { t: bPaquete, z: 1.5, x: 760, y: 1000 },
        { t: 12, z: 1.4, x: 700, y: 1050 },
      ],
      sfx: [
        { t: bOro - 0.2, s: "coins", v: 0.7 },
        { t: bOro + 0.2, s: "sparkle", v: 0.4 },
        { t: bPaquete, s: "pop", v: 0.3 },
      ],
      trans: "slide",
    },

    varita: {
      bg: WandShop,
      fx: ({ t }) => (
        <Svg>
          {t > vLechuza - 0.4 ? <Owl x={kf(t, [vLechuza - 0.4, vLechuza + 1], [1200, 620])} y={kf(t, [vLechuza - 0.4, vLechuza + 1], [500, 900])} t={t} fly={t < vLechuza + 1} /> : null}
          {t > vPrueba + 0.3 && t < vPrueba + 1.2 ? <circle cx={700} cy={900} r={kf(t, [vPrueba + 0.3, vPrueba + 1.2], [20, 160])} fill="#888" opacity={kf(t, [vPrueba + 0.3, vPrueba + 1.2], [0.7, 0])} /> : null}
          {t > vPrueba + 1.8 && t < vPrueba + 2.7 ? <circle cx={700} cy={760} r={kf(t, [vPrueba + 1.8, vPrueba + 2.7], [20, 160])} fill="#9b7bff" opacity={kf(t, [vPrueba + 1.8, vPrueba + 2.7], [0.7, 0])} /> : null}
        </Svg>
      ),
      chars: [
        { who: "ollivander", x: 840, y: 1330, facing: -1, acts: [{ t: 0.3, pose: "talk", dur: 2.5 }, { t: vChispas, pose: "cheer", dur: 1.4 }, { t: vChispas, expr: "joy" }] },
        {
          who: "harry",
          x: 340,
          y: 1430,
          wand: true,
          acts: [
            { t: vPrueba, pose: "wandAim", dur: 0.6 },
            { t: vPrueba + 0.6, expr: "surprise" },
            { t: vPrueba + 1.5, pose: "wandAim", dur: 0.6 },
            { t: vPrueba + 1.8, expr: "sadness" },
            { t: vChispas - 0.3, pose: "wandUp" },
            { t: vChispas - 0.2, glow: 1 },
            { t: vChispas - 0.2, expr: "joy" },
            { t: vLechuza - 0.5, glow: 0 },
            { t: vLechuza, pose: "stand" },
            { t: vLechuza, look: 0.9 },
            { t: vLechuza + 1, pose: "cheer" },
          ],
        },
        { who: "hagrid", x: 1250, y: 1450, s: 1.5, acts: [{ t: vLechuza - 1.2, walk: 980 }, { t: vLechuza + 0.4, face: -1 }, { t: vLechuza + 0.4, expr: "joy" }] },
      ],
      cam: [
        { t: 0, z: 1.1, y: 1100 },
        { t: vChispas, z: 1.35, x: 420, y: 1000 },
        { t: vLechuza, z: 1.05, x: 600, y: 1100 },
      ],
      sfx: [
        { t: vPrueba + 0.3, s: "pop", v: 0.6 },
        { t: vPrueba + 1.8, s: "crash", v: 0.4 },
        { t: vChispas - 0.2, s: "sparkle", v: 0.7 },
        { t: vChispas, s: "chime", v: 0.5 },
        { t: vLechuza - 0.3, s: "flutter", v: 0.6 },
      ],
      shake: [[vPrueba + 1.8, 0.3]],
      trans: "circle",
    },

    anden: {
      bg: Station,
      fx: ({ t }) => (
        <Svg>
          {t > pCorrer + 0.9 && t < pCorrer + 2.6 ? (
            <g>
              {[0, 1, 2].map((i) => (
                <ellipse key={i} cx={540} cy={1050} rx={kf(t, [pCorrer + 0.9 + i * 0.2, pCorrer + 2.2 + i * 0.2], [20, 220])} ry={kf(t, [pCorrer + 0.9 + i * 0.2, pCorrer + 2.2 + i * 0.2], [40, 380])} fill="none" stroke="#bfefff" strokeWidth={10} opacity={kf(t, [pCorrer + 0.9 + i * 0.2, pCorrer + 2.2 + i * 0.2], [0.9, 0])} />
              ))}
              <Sparkles x={540} y={1050} intensity={kf(t, [pCorrer + 0.9, pCorrer + 1.2, pCorrer + 2.6], [0, 1, 0])} seed={13} count={18} color="#bfefff" />
            </g>
          ) : null}
        </Svg>
      ),
      chars: [
        {
          who: "harry",
          x: 120,
          y: 1430,
          acts: [
            { t: pBusca - 0.3, pose: "think", dur: 2.2 },
            { t: pBusca - 0.3, expr: "focus" },
            { t: pBusca + 2, pose: "shrug", dur: 1.6 },
            { t: pBusca + 2, expr: "sadness" },
            { t: pCorrer - 0.2, expr: "focus" },
            { t: pCorrer, walk: 540, run: true },
            { t: pCorrer + 0.9, alpha: 0, dur: 0.3 },
          ],
        },
        { who: "ron", x: 900, y: 1440, facing: -1, acts: [{ t: pCorrer - 1.4, pose: "point", dur: 1.4 }, { t: pCorrer - 1.4, expr: "joy" }, { t: pAtravesar + 0.4, walk: 540, run: true }, { t: pAtravesar + 1.1, alpha: 0, dur: 0.3 }] },
      ],
      cam: [
        { t: 0, z: 1.15, x: 300, y: 1100 },
        { t: pCorrer, z: 1.0, x: 540, y: 1100 },
        { t: 11.3, z: 1.12, x: 540, y: 1050 },
      ],
      sfx: [
        { t: pCorrer + 0.9, s: "whoosh", v: 0.6 },
        { t: pCorrer + 0.95, s: "sparkle", v: 0.5 },
        { t: pAtravesar + 1.1, s: "whoosh", v: 0.5 },
        { t: 8.6, s: "whistle", v: 0.5 },
      ],
      trans: "wipe",
    },

    tren: {
      bg: TrainInside,
      fx: ({ t }) => (
        <Svg>
          {t > tRanas - 0.2 ? <Frog x={kf(t, [tRanas - 0.2, tRanas + 3], [520, 1200])} y={1100} s={1.2} t={t} /> : null}
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx={470 + i * 30} cy={1035} rx={12} ry={8} fill={["#ff6b9a", "#ffe66d", "#7bd389", "#6bb6ff", "#c58a3a"][i]} stroke={INK} strokeWidth={3} />
          ))}
        </Svg>
      ),
      chars: [
        { who: "harry", x: 300, y: 1280, acts: [{ t: 0, pose: "sit" }, { t: tRon, expr: "joy" }, { t: tRanas, expr: "surprise" }, { t: tAsquerosos + 0.3, expr: "joy" }] },
        {
          who: "ron",
          x: 1200,
          y: 1440,
          acts: [
            { t: 0.2, walk: 760 },
            { t: tRon + 0.3, face: -1 },
            { t: tRon + 0.3, move: { y: 1280 }, dur: 0.3 },
            { t: tRon + 0.3, pose: "sit" },
            { t: tRon + 0.3, expr: "joy" },
            { t: tRanas, expr: "surprise" },
            { t: tAsquerosos - 0.4, pose: "hold", dur: 0.6 },
            { t: tAsquerosos, expr: "anger" },
            { t: tAsquerosos + 0.2, pose: "sit" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: tRanas, z: 1.2, x: 600, y: 1100 },
        { t: tAsquerosos, z: 1.5, x: 720, y: 1000 },
      ],
      sfx: [
        { t: tRanas - 0.1, s: "pop", v: 0.5 },
        { t: tRanas + 0.5, s: "pop", v: 0.4 },
        { t: tRanas + 1.1, s: "pop", v: 0.4 },
        { t: tAsquerosos, s: "zap", v: 0.3 },
      ],
      trans: "slide",
    },

    hermione: {
      bg: TrainInside,
      chars: [
        { who: "harry", x: 260, y: 1280, acts: [{ t: 0, pose: "sit" }, { t: eAparece, look: 0.9 }, { t: eRechaza - 0.3, expr: "anger" }, { t: eRechaza - 0.3, pose: "crossed" }, { t: eRon - 0.2, expr: "joy" }, { t: eRon, pose: "sit" }] },
        { who: "ron", x: 500, y: 1280, facing: -1, acts: [{ t: 0, pose: "sit" }, { t: eAparece + 0.5, face: 1 }, { t: eRon, expr: "joy" }, { t: eRon, pose: "cheer" }] },
        {
          who: "hermione",
          x: 1200,
          y: 1440,
          holding: () => <Book x={0} y={0} s={0.35} open={false} />,
          acts: [
            { t: eAparece - 0.5, walk: 800 },
            { t: eAparece + 1, face: -1 },
            { t: eAparece + 1, pose: "talk", dur: 2 },
            { t: eAparece + 1, expr: "joy" },
            { t: eDraco - 0.3, walk: 1300 },
          ],
        },
        {
          who: "draco",
          x: 1300,
          y: 1440,
          acts: [
            { t: eDraco, walk: 790 },
            { t: eDraco + 1.4, face: -1 },
            { t: eDraco + 1.4, pose: "point", dur: 1.6 },
            { t: eDraco + 1.4, expr: "joy" },
            { t: eRechaza + 0.3, expr: "anger" },
            { t: eRechaza + 0.3, pose: "angry", dur: 1 },
            { t: eRechaza + 1.3, walk: 1300 },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: eDraco, z: 1.15, x: 600, y: 1100 },
        { t: eRechaza, z: 1.4, x: 300, y: 1050 },
        { t: 11.3, z: 1.15, x: 420, y: 1100 },
      ],
      sfx: [{ t: eRechaza, s: "pop", v: 0.3 }],
      trans: "circle",
    },

    sombrero: {
      bg: ({ t }) => <GreatHall t={t} />,
      under: () => (
        <Svg>
          <rect x={470} y={1300} width={150} height={20} fill="#8a5a2b" stroke={INK} strokeWidth={5} />
          <line x1={490} y1={1320} x2={480} y2={1460} stroke={INK} strokeWidth={12} />
          <line x1={600} y1={1320} x2={610} y2={1460} stroke={INK} strokeWidth={12} />
        </Svg>
      ),
      fx: ({ t }) => (
        <Svg>
          {t > sSombrero - 0.5 ? <SortingHat x={545} y={kf(t, [sSombrero - 0.5, sSombrero + 0.3], [500, 880])} s={1.05} t={t} talk={(t > sDuda - 0.3 && t < sPide) || (t > sGry - 0.3 && t < sGry + 1)} /> : null}
          {t > sSly - 0.2 && t < sPide + 0.4 ? <circle cx={545} cy={880} r={320} fill="#2f8f4a" opacity={kf(t, [sSly - 0.2, sSly + 0.2, sPide, sPide + 0.4], [0, 0.3, 0.3, 0])} /> : null}
          {t > sGry - 0.2 ? <circle cx={545} cy={880} r={kf(t, [sGry - 0.2, sGry + 0.4], [100, 700])} fill="#ffd23a" opacity={kf(t, [sGry - 0.2, sGry + 0.4, sGry + 1.4], [0, 0.4, 0])} /> : null}
          <Confetti t={t} t0={sGry} />
        </Svg>
      ),
      chars: [
        { who: "harry", x: 520, y: 1460, acts: [{ t: 0, pose: "sit" }, { t: 0, expr: "surprise" }, { t: sSly, expr: "focus" }, { t: sGry, expr: "joy" }, { t: sGry + 0.3, pose: "cheer" }] },
        { who: "mcgonagall", x: 860, y: 1440, facing: -1, acts: [{ t: 0.3, pose: "hold", dur: sSombrero - 0.6 }, { t: sGry + 0.3, expr: "joy" }] },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1100 },
        { t: sDuda, z: 1.45, x: 545, y: 950 },
        { t: sPide, z: 1.7, x: 545, y: 930 },
        { t: sGry + 0.3, z: 1.05, x: 545, y: 1050 },
      ],
      sfx: [
        { t: sSombrero, s: "pop", v: 0.3 },
        { t: sSly, s: "rumble", v: 0.4 },
        { t: sGry - 0.1, s: "fanfare", v: 0.6 },
        { t: sGry + 0.2, s: "cheer", v: 0.6 },
      ],
      shake: [[sGry, 0.4]],
      overlay: ({ t }) => <Flash t={t} at={sGry} dur={0.3} color="#ffe36e" />,
      trans: "zoom",
    },

    cierre: {
      bg: GreatHall,
      fx: ({ t }) => (
        <Svg>
          <Confetti t={t} t0={cGry - 0.2} n={70} />
        </Svg>
      ),
      chars: [
        { who: "ron", x: 230, y: 1430, acts: [{ t: 0, expr: "joy" }, { t: cGry - 0.3, pose: "cheer" }] },
        { who: "harry", x: 540, y: 1440, acts: [{ t: 0, expr: "joy" }, { t: 0.4, pose: "wave", dur: 2 }, { t: cGry - 0.3, pose: "cheer" }] },
        { who: "hermione", x: 850, y: 1430, facing: -1, acts: [{ t: 0, expr: "joy" }, { t: cGry - 0.3, pose: "cheer" }] },
      ],
      cam: [
        { t: 0, z: 1.1, y: 1100 },
        { t: 11, z: 1.0, y: 1150 },
      ],
      sfx: [{ t: cGry - 0.2, s: "cheer", v: 0.5 }],
      trans: "circle",
    },
  },
};

export const p1dpart2Audio = audio;
