import { Act, PartSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { Svg } from "../scenes/bg1";
import { Bathroom, Classroom, Corridor, GreatHall, Pitch, Stairs } from "../scenes/bg2";
import { Courtyard } from "../scenes/backgrounds/Courtyard";
import { Club, Confetti, MiniStick, Question, Remembrall, Spell, Troll } from "../scenes/props";
import { Banner, Flash, switchAt, wordClock } from "../scenes/util";
import audioData from "../data/p1dpart3.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);

const hEscaleras = w("hook", "escaleras");
const hTroll = w("hook", "troll");

const cFantasmas = w("castillo", "fantasmas");
const cMcG = w("castillo", "mcgonagall");
const cTransformar = w("castillo", "transformar");

const sPociones = w("snape", "pociones");
const sPreguntas = w("snape", "preguntas");
const sOdia = w("snape", "odia");

const vRoba = w("vuelo", "roba");
const vTira = w("vuelo", "tira");
const vDisparado = w("vuelo", "disparado");
const vPicada = w("vuelo", "picada");

const bVio = w("buscador", "vio");
const bExpulsar = w("buscador", "expulsar");
const bBuscador = w("buscador", "buscador");
const bJoven = w("buscador", "joven");

const pBurla = w("pelea", "burla");
const pLlorando = w("pelea", "llorando");

const hwQuirrell = w("halloween", "quirrell");
const hwTroll = w("halloween", "troll");
const hwCorren = w("halloween", "corren");

const tRompiendo = w("troll", "rompiendo");
const tLevitar = w("troll", "levitar");
const tCae = w("troll", "cae");

const eDefiende = w("cierre", "defiende");
const eInseparables = w("cierre", "inseparables");

/* Pelota de cristal: arco hacia arriba y caída hasta la mano de Harry. */
const HARRY_END = { x: 420, y: 1360 };
const HAND = { x: HARRY_END.x + 270, y: HARRY_END.y - 470 };
const ballPos = (t: number) => {
  if (t < vTira) return { x: 760, y: 1000 };
  if (t < vPicada) {
    const k = Math.min(1, (t - vTira) / 0.9);
    return { x: 760 - 120 * k, y: 1000 - 640 * Math.sin((k * Math.PI) / 2) };
  }
  const k = Math.min(1, (t - vPicada) / 1.0);
  return { x: 640 + (HAND.x - 640) * k, y: 360 + (HAND.y - 360) * k * k };
};

export const p1dpart3: PartSpec = {
  dyn: true,
  title: "Harry Potter y la piedra filosofal",
  part: 3,
  scenes: {
    hook: {
      bg: Stairs,
      fx: ({ t }) => (
        <Svg>
          {t > hTroll - 0.4 ? <Troll x={kf(t, [hTroll - 0.4, hTroll + 0.4], [1400, 930])} y={1500} s={1.1} t={t} /> : null}
        </Svg>
      ),
      chars: [
        {
          who: "harry",
          x: -200,
          y: 1430,
          acts: [{ t: 0.3, walk: 330 }, { t: hEscaleras, look: 0.3 }, { t: hEscaleras, expr: "surprise" }, { t: hTroll, pose: "cower" }, { t: hTroll, expr: "surprise" }],
        },
        {
          who: "ron",
          x: -400,
          y: 1440,
          acts: [{ t: 0.5, walk: 110 }, { t: hEscaleras, pose: "pointUp", dur: 2 }, { t: hEscaleras, expr: "joy" }, { t: hTroll, pose: "cower" }, { t: hTroll, expr: "surprise" }],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1000 },
        { t: hTroll - 0.5, z: 1.1, y: 1100 },
        { t: hTroll + 0.5, z: 1.0, x: 640, y: 1100 },
        { t: 11.7, z: 1.08, x: 600, y: 1100 },
      ],
      sfx: [
        { t: hEscaleras, s: "rumble", v: 0.4 },
        { t: hTroll, s: "roar", v: 0.8 },
      ],
      shake: [[hTroll + 0.2, 0.7, 0.6]],
    },

    castillo: {
      bg: switchAt(cMcG - 0.4, Stairs, Classroom),
      fx: ({ t }) => (
        <Svg>
          {t < cMcG - 0.4 ? (
            <g opacity={0.6}>
              <MiniStick x={kf(t, [cFantasmas - 1.2, cFantasmas + 2], [1250, -200])} y={1180 + Math.sin(t * 3) * 20} s={1.8} color="#cfe8ff" head="#f4fbff" arms="wave" t={t} />
            </g>
          ) : (
            <g>
              <rect x={490} y={1180} width={120} height={60} rx={10} fill="#8a5a2b" stroke={INK} strokeWidth={5} />
              {t < cTransformar + 0.2 ? (
                <g>
                  <ellipse cx={550} cy={1160} rx={36} ry={22} fill="#9a9aa8" stroke={INK} strokeWidth={4} />
                  <circle cx={526} cy={1140} r={10} fill="#9a9aa8" stroke={INK} strokeWidth={3} />
                </g>
              ) : (
                <g stroke={INK} strokeWidth={4}>
                  <path d="M 515 1135 L 585 1135 L 575 1180 L 525 1180 Z" fill="#fff" />
                  <path d="M 585 1145 q 20 5 0 25" fill="none" />
                </g>
              )}
              {t > cTransformar - 0.2 && t < cTransformar + 1 ? <Sparkles x={550} y={1160} intensity={kf(t, [cTransformar - 0.2, cTransformar + 0.1, cTransformar + 1], [0, 1.2, 0])} seed={2} count={16} /> : null}
            </g>
          )}
        </Svg>
      ),
      chars: [
        { who: "harry", x: 260, y: 1430, acts: [{ t: cFantasmas - 0.6, expr: "surprise" }, { t: cFantasmas - 0.6, pose: "surprised", dur: 2 }, { t: cTransformar + 0.3, expr: "joy" }] },
        { who: "ron", x: 80, y: 1440, acts: [{ t: cFantasmas - 0.4, expr: "surprise" }, { t: cFantasmas - 0.4, pose: "cower", dur: 2 }, { t: cTransformar + 0.3, expr: "joy" }] },
        {
          who: "mcgonagall",
          x: 820,
          y: 1430,
          facing: -1,
          show: false,
          wand: true,
          acts: [{ t: cMcG - 0.4, show: true }, { t: cTransformar - 0.5, pose: "wandAim", dur: 1.4 }, { t: cTransformar - 0.3, glow: 1 }, { t: cTransformar + 0.8, glow: 0 }],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1050 },
        { t: cMcG - 0.45, z: 1.15, y: 1050 },
        { t: cMcG - 0.4, z: 1.0, y: 1100 },
        { t: cTransformar, z: 1.4, x: 560, y: 1100 },
      ],
      sfx: [
        { t: cFantasmas - 1, s: "whoosh", v: 0.4 },
        { t: cTransformar - 0.2, s: "sparkle", v: 0.6 },
        { t: cTransformar + 0.1, s: "pop", v: 0.4 },
      ],
      overlay: ({ t }) => <Flash t={t} at={cMcG - 0.4} dur={0.25} />,
      trans: "wipe",
    },

    snape: {
      bg: ({ t }) => <Classroom t={t} dungeon />,
      fx: ({ t }) => (
        <Svg>
          <Question t={t} x={330} y={820} t0={sPreguntas - 0.2} />
        </Svg>
      ),
      chars: [
        { who: "harry", x: 340, y: 1430, acts: [{ t: sPociones, expr: "surprise" }, { t: sPreguntas, pose: "shrug", dur: 2 }, { t: sOdia - 0.4, expr: "sadness" }, { t: sOdia - 0.4, pose: "sad" }] },
        { who: "ron", x: 130, y: 1440, acts: [{ t: sPreguntas, expr: "surprise" }] },
        {
          who: "snape",
          x: 1250,
          y: 1430,
          acts: [
            { t: 0.3, walk: 700 },
            { t: 1.8, face: -1 },
            { t: sPociones, expr: "anger" },
            { t: sPociones + 0.2, pose: "point", dur: 3 },
            { t: sPreguntas + 2.6, pose: "crossed" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: sPreguntas, z: 1.3, x: 520, y: 1050 },
        { t: sOdia, z: 1.6, x: 340, y: 1000 },
      ],
      sfx: [
        { t: sPociones + 0.2, s: "zap", v: 0.3 },
        { t: sPreguntas, s: "pop", v: 0.3 },
      ],
      trans: "slide",
    },

    vuelo: {
      bg: ({ t }) => <Pitch t={t} stands={false} />,
      fx: ({ t }) => {
        const b = ballPos(t);
        return (
          <Svg>
            <Remembrall x={b.x} y={b.y} s={1.3} glow={t > vRoba ? 1 : 0.3} />
          </Svg>
        );
      },
      chars: [
        { who: "neville", x: 960, y: 1440, facing: -1, acts: [{ t: vRoba - 0.2, expr: "sadness" }, { t: vRoba, pose: "sad" }] },
        {
          who: "draco",
          x: 660,
          y: 1430,
          acts: [
            { t: vRoba - 0.4, pose: "hold", dur: 1.4 },
            { t: vRoba - 0.4, expr: "joy" },
            { t: vTira - 0.3, pose: "pointUp", dur: 1.4 },
            { t: vPicada + 1.1, expr: "surprise" },
            { t: vPicada + 1.1, pose: "surprised" },
          ],
        },
        {
          who: "harry",
          x: 260,
          y: 1400,
          broom: true,
          acts: [
            { t: vTira, expr: "anger" },
            { t: vDisparado - 0.2, move: { x: 520, y: 700 }, dur: 0.9 },
            { t: vDisparado - 0.2, rot: -18, dur: 0.4 },
            { t: vPicada - 0.1, rot: 20, dur: 0.3 },
            { t: vPicada, move: HARRY_END, dur: 1.0 },
            { t: vPicada + 1.0, rot: 0, dur: 0.3 },
            { t: vPicada + 1.0, expr: "joy" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: vTira, z: 0.95, x: 600, y: 900 },
        { t: vPicada, z: 1.0, x: 560, y: 900 },
        { t: vPicada + 1.1, z: 1.35, x: 560, y: 1000 },
        { t: 14.7, z: 1.2, x: 560, y: 1050 },
      ],
      sfx: [
        { t: vTira - 0.1, s: "whoosh", v: 0.5 },
        { t: vDisparado - 0.2, s: "whoosh", v: 0.7 },
        { t: vPicada, s: "whoosh", v: 0.7 },
        { t: vPicada + 1.0, s: "pop", v: 0.5 },
        { t: vPicada + 1.1, s: "cheer", v: 0.5 },
      ],
      trans: "circle",
    },

    buscador: {
      bg: Corridor,
      chars: [
        {
          who: "harry",
          x: 360,
          y: 1430,
          acts: [
            { t: bVio, expr: "surprise" },
            { t: bExpulsar - 0.3, pose: "sad", dur: 1.6 },
            { t: bExpulsar - 0.3, expr: "sadness" },
            { t: bBuscador - 0.2, expr: "joy" },
            { t: bBuscador, pose: "cheer" },
          ],
        },
        {
          who: "mcgonagall",
          x: 1250,
          y: 1430,
          acts: [
            { t: 0.2, walk: 720, run: true },
            { t: bVio + 0.2, face: -1 },
            { t: bVio, expr: "anger" },
            { t: bVio + 0.2, pose: "point", dur: 1.5 },
            { t: bBuscador - 0.4, expr: "joy" },
            { t: bBuscador - 0.4, pose: "talk" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: bExpulsar, z: 1.5, x: 360, y: 1000 },
        { t: bBuscador, z: 1.1, x: 540, y: 1100 },
      ],
      sfx: [
        { t: bBuscador, s: "fanfare", v: 0.6 },
        { t: bJoven, s: "sparkle", v: 0.4 },
      ],
      overlay: ({ t }) => <Banner t={t} text="¡BUSCADOR!" t0={bBuscador} t1={bBuscador + 2.6} />,
      trans: "zoom",
    },

    pelea: {
      bg: Corridor,
      chars: [
        { who: "harry", x: 170, y: 1440, acts: [{ t: pBurla, expr: "joy" }, { t: pLlorando - 0.6, expr: "surprise" }] },
        {
          who: "ron",
          x: 400,
          y: 1430,
          facing: -1,
          acts: [{ t: pBurla - 0.3, pose: "talk", dur: 2.4 }, { t: pBurla - 0.3, expr: "joy" }, { t: pLlorando - 0.6, face: 1 }, { t: pLlorando - 0.6, expr: "surprise" }],
        },
        {
          who: "hermione",
          x: 820,
          y: 1420,
          facing: -1,
          acts: [
            { t: pBurla + 0.6, expr: "surprise" },
            { t: pBurla + 1.4, expr: "sadness" },
            { t: pBurla + 1.4, pose: "sad", dur: 1.0 },
            { t: pLlorando - 0.4, walk: 1300, run: true },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.1, x: 400, y: 1100 },
        { t: pBurla + 1.2, z: 1.6, x: 800, y: 1000 },
        { t: 8.6, z: 1.1, x: 540, y: 1100 },
      ],
      sfx: [{ t: pLlorando - 0.4, s: "whoosh", v: 0.4 }],
      trans: "slide",
    },

    halloween: {
      bg: ({ t }) => <GreatHall t={t} deco="halloween" />,
      chars: [
        {
          who: "harry",
          x: 220,
          y: 1440,
          acts: [{ t: 0, expr: "joy" }, { t: hwTroll, expr: "surprise" }, { t: hwTroll, pose: "surprised", dur: 1.6 }, { t: hwCorren - 1.2, look: 0.9 }, { t: hwCorren - 0.6, expr: "focus" }, { t: hwCorren, walk: -300, run: true }],
        },
        {
          who: "ron",
          x: 420,
          y: 1430,
          acts: [{ t: 0, expr: "joy" }, { t: hwTroll, expr: "surprise" }, { t: hwTroll, pose: "surprised", dur: 1.6 }, { t: hwCorren - 1.2, face: -1 }, { t: hwCorren - 0.6, expr: "focus" }, { t: hwCorren + 0.1, walk: -300, run: true }],
        },
        {
          who: "quirrell",
          x: 1300,
          y: 1430,
          acts: [
            { t: hwQuirrell - 0.8, walk: 760, run: true },
            { t: hwTroll - 0.4, face: -1 },
            { t: hwTroll - 0.4, expr: "surprise" },
            { t: hwTroll - 0.4, pose: "armsUp", dur: 1.4 },
            { t: hwTroll + 1.1, rot: 90, dur: 0.4 },
            { t: hwTroll + 1.1, expr: "sleep" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1100 },
        { t: hwTroll, z: 1.35, x: 760, y: 1050 },
        { t: hwCorren - 1.2, z: 1.2, x: 320, y: 1100 },
      ],
      sfx: [
        { t: hwQuirrell - 0.8, s: "step", v: 0.6 },
        { t: hwTroll, s: "roar", v: 0.6 },
        { t: hwTroll + 1.3, s: "boom", v: 0.4 },
        { t: hwCorren, s: "whoosh", v: 0.5 },
      ],
      overlay: ({ t }) => <Banner t={t} text="¡HAY UN TROLL!" t0={hwTroll} t1={hwTroll + 2} color="#ff6b6b" />,
      trans: "circle",
    },

    troll: {
      bg: Bathroom,
      fx: ({ t }) => {
        const free = t > tLevitar + 0.2;
        const cy = free ? (t < tCae ? kf(t, [tLevitar + 0.2, tLevitar + 1.2], [1000, 350]) : kf(t, [tCae, tCae + 0.35], [350, 860], (x) => x * x)) : 0;
        const club = t < tRompiendo ? 0 : t < tRompiendo + 0.8 ? kf(t, [tRompiendo, tRompiendo + 0.4, tRompiendo + 0.8], [0, 0.9, 0]) : 0;
        return (
          <Svg>
            <Troll x={850} y={1440} s={1.0} t={t} club={free ? 1 : club} ko={kf(t, [tCae + 0.4, tCae + 1.1], [0, 1])} />
            {free ? <Club x={960} y={cy} s={1.1} r={t * 200} /> : null}
            <Spell t={t} t0={tLevitar - 0.1} x0={600} y0={900} x1={920} y1={1000} color="#9fe8ff" dur={0.35} />
            <Confetti t={t} t0={tCae + 0.4} n={30} colors={["#ffe66d", "#ffffff"]} />
          </Svg>
        );
      },
      chars: [
        { who: "hermione", x: 90, y: 1430, acts: [{ t: 0, expr: "surprise" }, { t: 0, pose: "cower" }, { t: tCae + 0.8, pose: "cheer" }, { t: tCae + 0.8, expr: "joy" }] },
        {
          who: "ron",
          x: -200,
          y: 1440,
          wand: true,
          acts: [
            { t: 0.2, walk: 450, run: true },
            { t: tLevitar - 0.5, expr: "focus" },
            { t: tLevitar - 0.4, pose: "wandAim", dur: 1.6 },
            { t: tLevitar - 0.2, glow: 1 },
            { t: tCae, pose: "wandUp" },
            { t: tCae + 0.5, glow: 0 },
            { t: tCae + 0.8, expr: "joy" },
            { t: tCae + 0.8, pose: "cheer" },
          ],
        },
        { who: "harry", x: -400, y: 1450, acts: [{ t: 0.4, walk: 270, run: true }, { t: tRompiendo, expr: "surprise" }, { t: tRompiendo, pose: "cower", dur: 1.4 }, { t: tCae + 0.8, expr: "joy" }, { t: tCae + 0.8, pose: "cheer" }] },
      ],
      cam: [
        { t: 0, z: 0.95, x: 540, y: 1050 },
        { t: tLevitar, z: 1.0, x: 600, y: 1000 },
        { t: tCae, z: 0.95, x: 640, y: 900 },
        { t: tCae + 1.2, z: 1.0, x: 540, y: 1050 },
      ],
      sfx: [
        { t: 0.1, s: "roar", v: 0.6 },
        { t: tRompiendo + 0.4, s: "crash", v: 0.7 },
        { t: tLevitar - 0.1, s: "zap", v: 0.5 },
        { t: tLevitar + 0.2, s: "sparkle", v: 0.5 },
        { t: tCae + 0.3, s: "boom", v: 0.8 },
        { t: tCae + 1.0, s: "rumble", v: 0.5 },
      ],
      shake: [
        [tRompiendo + 0.4, 0.6],
        [tCae + 0.3, 0.9, 0.5],
        [tCae + 1.0, 0.7, 0.5],
      ] as [number, number, number?][],
      trans: "zoom",
    },

    cierre: {
      bg: () => <Courtyard />,
      chars: [
        {
          who: "mcgonagall",
          x: 880,
          y: 1420,
          facing: -1,
          acts: [{ t: 0, expr: "anger" }, { t: 0, pose: "crossed" }, { t: eDefiende + 1.2, expr: "joy" }, { t: eDefiende + 1.2, pose: "stand" }],
        },
        { who: "hermione", x: 560, y: 1430, facing: 1, acts: [{ t: eDefiende - 0.2, pose: "talk", dur: 2.2 }, { t: eDefiende - 0.2, expr: "focus" }, { t: eInseparables - 0.6, face: -1 }, { t: eInseparables - 0.4, expr: "joy" }, { t: eInseparables, pose: "cheer" }] },
        { who: "ron", x: 330, y: 1440, acts: [{ t: eInseparables - 0.4, expr: "joy" }, { t: eInseparables, pose: "cheer" }] },
        { who: "harry", x: 130, y: 1440, acts: [{ t: eInseparables - 0.4, expr: "joy" }, { t: eInseparables, pose: "cheer" }] },
      ],
      cam: [
        { t: 0, z: 1.2, x: 700, y: 1050 },
        { t: eInseparables - 0.6, z: 1.0, x: 540, y: 1100 },
      ],
      sfx: [{ t: eInseparables, s: "chime", v: 0.5 }],
      trans: "fade",
    },
  },
};

export const p1dpart3Audio = audio;
export type { Act };
