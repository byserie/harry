import { PartSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { HouseCut, HutInside, LivingRoom, NightSky, NightStreet, SeaRock, Svg, Zoo } from "../scenes/bg1";
import { NightCastle } from "../scenes/bg2";
import { Baby, Bolt, Cake, Clock, Dust, Glass, HutDoor, Letter, LetterBurst, Owl, PigTail, Snake, Spell } from "../scenes/props";
import { Banner, Flash, switchAt, wordClock } from "../scenes/util";
import audioData from "../data/p1dpart1.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);

/* ---- 1. Gancho ---- */
const hMentira = w("hook", "mentira");
const hMago = w("hook", "mago");

/* ---- 2. Bebé ---- */
const bHagrid = w("bebe", "gigante");
const bBebe = w("bebe", "bebe");
const bCasa = w("bebe", "casa");
const bCicatriz = w("bebe", "cicatriz");

/* ---- 3. Dursley ---- */
const dEstorbo = w("dursley", "estorbo");
const dAlacena = w("dursley", "alacena");
const dDudley = w("dursley", "dudley");

/* ---- 4. Zoo ---- */
const zHabla = w("zoo", "habla");
const zVidrio = w("zoo", "vidrio");
const zCastigado = w("zoo", "castigado");

/* ---- 5. Cartas ---- */
const cCarta = w("cartas", "carta");
const cRompe = w("cartas", "rompe");
const cDiez = w("cartas", "diez");
const cCien = w("cartas", "cien");
const cChimenea = w("cartas", "chimenea");

/* ---- 6. Cabaña ---- */
const kMedianoche = w("cabana", "medianoche");
const kSwitch = w("cabana", "tormenta") - 0.2;

/* ---- 7. Hagrid ---- */
const gBum = w("hagrid", "bum");
const gTorta = w("hagrid", "torta");
const gAccidente = w("hagrid", "accidente");
const gMago = w("hagrid", "mago", 1);

/* ---- 8. Cierre ---- */
const eHogwarts = w("cierre", "hogwarts");

export const p1dpart1: PartSpec = {
  dyn: true,
  title: "Harry Potter y la piedra filosofal",
  part: 1,
  scenes: {
    hook: {
      bg: NightSky,
      under: ({ t }) => (
        <Svg>
          <g opacity={kf(t, [hMago - 0.1, hMago + 0.3], [0, 1])}>
            <Bolt x={540} y={760} s={kf(t, [hMago - 0.1, hMago + 0.4], [0.3, 1.6])} glow={1} />
          </g>
        </Svg>
      ),
      chars: [
        {
          who: "harry",
          x: 540,
          y: 1500,
          s: 2.2,
          acts: [
            { t: 0, pose: "stand" },
            { t: 4.4, look: 0.1 },
            { t: hMentira - 0.2, pose: "sad" },
            { t: hMentira - 0.2, expr: "sadness" },
            { t: hMago - 0.25, pose: "wandUp" },
            { t: hMago - 0.25, wand: true },
            { t: hMago - 0.1, glow: 1 },
            { t: hMago - 0.1, expr: "joy" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1, y: 1100 },
        { t: hMentira, z: 1.12, y: 1150 },
        { t: 9.4, z: 1.22, y: 1050 },
      ],
      sfx: [
        { t: hMago - 0.15, s: "sparkle", v: 0.7 },
        { t: hMago, s: "chime", v: 0.5 },
      ],
      shake: [[hMago, 0.6]],
      overlay: ({ t }) => <Flash t={t} at={hMago} />,
    },

    bebe: {
      bg: ({ t }) => <NightStreet t={t} lights={t < 1.3 ? 1 : t < 1.9 ? 0.5 : 0} />,
      under: ({ t }) =>
        t > bCasa + 0.4 ? (
          <Svg>
            <Baby x={540} y={1262} s={0.9} />
            <Letter x={600} y={1262} s={0.45} />
            {t > bCicatriz - 0.2 ? <Sparkles x={498} y={1236} intensity={kf(t, [bCicatriz - 0.2, bCicatriz + 0.2], [0, 0.5])} seed={4} count={8} /> : null}
          </Svg>
        ) : null,
      chars: [
        { who: "mcgonagall", x: 150, y: 1420, acts: [{ t: 2.2, look: 0.9 }, { t: bCicatriz + 0.6, expr: "sadness" }] },
        {
          who: "dumbledore",
          x: 340,
          y: 1410,
          wand: true,
          acts: [
            { t: 0.6, pose: "wandUp", dur: 1.5 },
            { t: 0.9, glow: 1 },
            { t: 2.0, glow: 0 },
            { t: bCasa + 1, pose: "talk", dur: 2 },
            { t: bCicatriz + 0.6, expr: "sadness" },
            { t: bCicatriz + 0.6, pose: "sad" },
          ],
        },
        {
          who: "hagrid",
          x: 820,
          y: -600,
          s: 1.6,
          holding: (t) => (t < bCasa + 0.4 ? <Baby x={10} y={-10} s={0.55} /> : null),
          acts: [
            { t: 0, pose: "hold" },
            { t: bHagrid - 1.0, move: { y: 1440 }, dur: 1.2 },
            { t: bBebe, walk: 700 },
            { t: bCasa + 0.4, pose: "stand" },
            { t: bCasa + 0.6, walk: 860 },
            { t: bCasa + 1.8, face: -1 },
            { t: bCicatriz + 0.6, expr: "sadness" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1, y: 1100 },
        { t: bCasa, z: 1.05, y: 1150 },
        { t: bCicatriz - 0.3, z: 2.3, x: 540, y: 1250 },
        { t: bCicatriz + 1.6, z: 2.3, x: 540, y: 1250 },
        { t: 14, z: 1.1, y: 1150 },
      ],
      sfx: [
        { t: 0.9, s: "sparkle", v: 0.4 },
        { t: 1.3, s: "pop", v: 0.4 },
        { t: 1.9, s: "pop", v: 0.4 },
        { t: bHagrid - 1.0, s: "whoosh", v: 0.5 },
        { t: bHagrid + 0.2, s: "step", v: 0.7 },
        { t: bCicatriz - 0.2, s: "chime", v: 0.4 },
      ],
      trans: "fade",
    },

    dursley: {
      bg: HouseCut,
      under: () => null,
      chars: [
        {
          who: "harry",
          x: 200,
          y: 1385,
          s: 0.7,
          acts: [
            { t: 0, rot: -90, dur: 0.001 },
            { t: 0, expr: "sleep" },
            { t: dEstorbo - 1.2, expr: "surprise" },
            { t: dAlacena + 0.5, expr: "sadness" },
          ],
        },
        {
          who: "petunia",
          x: 480,
          y: 1462,
          s: 1.25,
          facing: -1,
          acts: [
            { t: dEstorbo - 1.6, pose: "angry", dur: 1.4 },
            { t: dEstorbo - 1.6, expr: "anger" },
          ],
        },
        {
          who: "vernon",
          x: 760,
          y: 1462,
          s: 1.3,
          facing: -1,
          acts: [
            { t: dEstorbo - 0.4, pose: "point", dur: 2.4 },
            { t: dEstorbo - 0.4, expr: "anger" },
          ],
        },
        {
          who: "dudley",
          x: 520,
          y: 910,
          s: 1.05,
          acts: [
            { t: 0, pose: "cheer" },
            { t: 0, expr: "joy" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1000 },
        { t: dEstorbo - 1.6, z: 1.45, x: 320, y: 1300 },
        { t: dAlacena - 0.2, z: 2.0, x: 210, y: 1330 },
        { t: dDudley - 0.4, z: 1.6, x: 540, y: 760 },
        { t: 13.4, z: 1.05, y: 1000 },
      ],
      sfx: [
        { t: dEstorbo - 1.6, s: "knock", v: 0.6 },
        { t: dDudley, s: "pop", v: 0.3 },
      ],
      overlay: ({ t }) => <Banner t={t} text="10 años después" />,
      trans: "wipe",
    },

    zoo: {
      bg: Zoo,
      under: ({ t }) => (
        <Svg>
          <Snake
            x={t < zVidrio + 0.6 ? 560 : kf(t, [zVidrio + 0.6, zVidrio + 3.5], [560, 1350])}
            y={t < zVidrio + 0.6 ? 1010 : kf(t, [zVidrio + 0.6, zVidrio + 1.2], [1010, 1330])}
            s={1.3}
            t={t}
          />
        </Svg>
      ),
      fx: ({ t }) => (
        <Svg>
          <Glass x={150} y={590} w={780} h={600} a={kf(t, [zVidrio, zVidrio + 0.35], [1, 0])} />
          {t > zVidrio && t < zVidrio + 1 ? <Sparkles x={540} y={890} intensity={kf(t, [zVidrio, zVidrio + 0.2, zVidrio + 1], [0, 1.6, 0])} seed={7} count={24} color="#bfefff" /> : null}
        </Svg>
      ),
      chars: [
        {
          who: "harry",
          x: -150,
          y: 1420,
          acts: [
            { t: 0, walk: 300 },
            { t: zHabla - 0.3, pose: "talk", dur: 2.2 },
            { t: zHabla - 0.3, expr: "joy" },
            { t: zVidrio, expr: "surprise" },
            { t: zVidrio, pose: "surprised", dur: 2 },
            { t: zCastigado - 0.4, expr: "sadness" },
            { t: zCastigado - 0.4, pose: "sad" },
          ],
        },
        {
          who: "dudley",
          x: 700,
          y: 1400,
          facing: -1,
          acts: [
            { t: 0.5, face: 1 },
            { t: 0.5, pose: "point", dur: 2 },
            { t: 0.5, expr: "joy" },
            { t: zVidrio + 0.1, expr: "surprise" },
            { t: zVidrio + 0.2, move: { x: 640, y: 1170 }, dur: 0.6 },
            { t: zVidrio + 0.2, rot: 70, dur: 0.5 },
          ],
        },
        {
          who: "vernon",
          x: 1250,
          y: 1440,
          acts: [
            { t: zCastigado - 1.4, walk: 860 },
            { t: zCastigado - 0.2, face: -1 },
            { t: zCastigado - 0.2, pose: "angry" },
            { t: zCastigado - 0.2, expr: "anger" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: zHabla, z: 1.35, x: 440, y: 1050 },
        { t: zVidrio + 0.1, z: 1.05, x: 540, y: 1100 },
        { t: zCastigado, z: 1.3, x: 640, y: 1150 },
      ],
      sfx: [
        { t: zHabla, s: "hiss", v: 0.4 },
        { t: zVidrio, s: "zap", v: 0.5 },
        { t: zVidrio + 0.05, s: "sparkle", v: 0.5 },
        { t: zVidrio + 0.7, s: "splash", v: 0.7 },
        { t: zVidrio + 1.0, s: "hiss", v: 0.4 },
      ],
      shake: [[zVidrio + 0.7, 0.5]],
      trans: "slide",
    },

    cartas: {
      bg: LivingRoom,
      fx: ({ t }) => (
        <Svg>
          {t > cCarta - 0.3 && t < cRompe + 0.2 ? (
            <Letter x={kf(t, [cCarta - 0.3, cCarta + 0.4], [140, 220])} y={kf(t, [cCarta - 0.3, cCarta + 0.4], [970, 1380])} r={kf(t, [cCarta - 0.3, cCarta + 0.4], [0, 160])} s={0.8} />
          ) : null}
          {t > cRompe + 0.2 && t < cRompe + 2 ? (
            <>
              <Letter x={700 - (t - cRompe) * 60} y={1100 + (t - cRompe) * 260} r={(t - cRompe) * 90} s={0.5} />
              <Letter x={760 + (t - cRompe) * 60} y={1100 + (t - cRompe) * 240} r={-(t - cRompe) * 120} s={0.5} />
            </>
          ) : null}
          <LetterBurst t={t} t0={cDiez - 0.1} n={10} ox={140} oy={970} spread={600} dur={0.8} />
          <LetterBurst t={t} t0={cCien - 0.1} n={26} ox={860} oy={690} spread={900} dur={1.2} />
          <LetterBurst t={t} t0={cChimenea - 0.3} n={120} ox={510} oy={1150} spread={1600} dur={2.6} up />
        </Svg>
      ),
      chars: [
        {
          who: "harry",
          x: 420,
          y: 1430,
          acts: [
            { t: cCarta + 0.2, walk: 300 },
            { t: cCarta + 0.9, pose: "hold", dur: 0.6 },
            { t: cCarta + 0.9, expr: "joy" },
            { t: cRompe, expr: "sadness" },
            { t: cChimenea - 0.3, pose: "cheer" },
            { t: cChimenea - 0.3, expr: "joy" },
          ],
        },
        {
          who: "vernon",
          x: 820,
          y: 1440,
          facing: -1,
          acts: [
            { t: cCarta + 1.0, walk: 560, run: true },
            { t: cRompe - 0.2, pose: "hold", dur: 0.5 },
            { t: cRompe - 0.2, expr: "anger" },
            { t: cRompe + 0.3, pose: "angry" },
            { t: cChimenea - 0.3, pose: "cower" },
            { t: cChimenea - 0.3, expr: "surprise" },
          ],
        },
        {
          who: "petunia",
          x: 960,
          y: 1400,
          facing: -1,
          acts: [
            { t: cCien - 0.1, pose: "surprised" },
            { t: cCien - 0.1, expr: "surprise" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.1, y: 1150 },
        { t: cCarta, z: 1.4, x: 300, y: 1200 },
        { t: cDiez, z: 1.1, x: 540, y: 1150 },
        { t: cChimenea, z: 0.98, x: 540, y: 1100 },
        { t: 12.4, z: 1.06, x: 540, y: 1100 },
      ],
      sfx: [
        { t: cCarta - 0.3, s: "paper", v: 0.6 },
        { t: cRompe, s: "paper", v: 0.8 },
        { t: cDiez - 0.1, s: "paper", v: 0.6 },
        { t: cDiez + 0.3, s: "paper", v: 0.6 },
        { t: cCien - 0.1, s: "flutter", v: 0.6 },
        { t: cCien + 0.2, s: "paper", v: 0.6 },
        { t: cChimenea - 0.3, s: "rumble", v: 0.7 },
        ...[0, 0.25, 0.5, 0.8, 1.1, 1.4, 1.8, 2.2].map((d) => ({ t: cChimenea - 0.2 + d, s: "paper" as const, v: 0.55 })),
      ],
      shake: [[cChimenea - 0.3, 0.6, 1.6]],
      trans: "circle",
    },

    cabana: {
      bg: switchAt(kSwitch, SeaRock, HutInside),
      under: ({ t }) =>
        t > kSwitch ? (
          <Svg>
            <Clock x={880} y={560} s={1} min={kf(t, [kMedianoche - 0.6, kMedianoche], [59, 60])} />
            <rect x={380} y={1300} width={170} height={160} rx={8} fill="#8a5a2b" stroke="#1b1b2f" strokeWidth={6} />
            <line x1={380} y1={1380} x2={550} y2={1380} stroke="#1b1b2f" strokeWidth={4} />
            <g opacity={kf(t, [kSwitch + 0.5, kSwitch + 1.5], [0, 1])}>
              <path d="M 580 1440 l 120 0 l 0 -50 l -120 0 z M 640 1390 l 0 -30" stroke="#d9c7a3" strokeWidth={5} fill="none" />
            </g>
          </Svg>
        ) : null,
      chars: [
        {
          who: "harry",
          x: 470,
          y: 1460,
          show: false,
          acts: [
            { t: kSwitch, show: true },
            { t: kSwitch, pose: "sit" },
            { t: kSwitch, expr: "sadness" },
            { t: kMedianoche + 0.2, expr: "joy" },
            { t: kMedianoche + 0.2, pose: "cheer", dur: 1.6 },
            { t: kMedianoche + 1.8, pose: "sit" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1000 },
        { t: kSwitch - 0.05, z: 1.25, x: 540, y: 820 },
        { t: kSwitch, z: 1.1, y: 1200 },
        { t: 10.9, z: 1.35, x: 600, y: 1250 },
      ],
      sfx: [
        { t: 0.1, s: "thunder", v: 0.8 },
        { t: 3.6, s: "thunder", v: 0.7 },
        { t: kMedianoche, s: "chime", v: 0.6 },
      ],
      overlay: ({ t }) => <Flash t={t} at={kSwitch} dur={0.25} />,
      trans: "zoom",
    },

    hagrid: {
      bg: HutInside,
      fx: ({ t }) => (
        <Svg>
          <HutDoor k={kf(t, [gBum - 0.05, gBum + 0.25], [0, 1])} />
          <Dust t={t} t0={gBum + 0.2} x={890} y={1260} />
          <Spell t={t} t0={gAccidente - 0.2} x0={700} y0={850} x1={170} y1={1250} color="#ff8fb8" />
          {t > gAccidente + 0.3 ? <PigTail x={120} y={1260} s={1.4} /> : null}
        </Svg>
      ),
      chars: [
        {
          who: "dudley",
          x: 170,
          y: 1460,
          acts: [
            { t: 0, expr: "surprise" },
            { t: gBum, pose: "cower", dur: 2 },
            { t: gAccidente + 0.2, expr: "surprise" },
            { t: gAccidente + 0.2, pose: "surprised" },
          ],
        },
        {
          who: "harry",
          x: 380,
          y: 1440,
          holding: (t) => (t > gTorta + 0.9 ? <Cake x={10} y={-10} s={0.4} /> : null),
          acts: [
            { t: gBum, expr: "surprise" },
            { t: gBum, pose: "surprised", dur: 1.6 },
            { t: gTorta + 0.9, pose: "hold" },
            { t: gTorta + 0.9, expr: "joy" },
            { t: gMago - 0.6, expr: "surprise" },
            { t: gMago, pose: "cheer" },
            { t: gMago, expr: "joy" },
          ],
        },
        {
          who: "vernon",
          x: 560,
          y: 1420,
          facing: 1,
          acts: [
            { t: gBum, pose: "cower" },
            { t: gBum, expr: "surprise" },
            { t: gBum + 1.4, walk: 640 },
          ],
        },
        {
          who: "hagrid",
          x: 1250,
          y: 1460,
          s: 1.55,
          facing: -1,
          wand: false,
          holding: (t) => (t < gTorta + 0.9 && t > gBum ? <Cake x={10} y={-10} s={0.4} /> : null),
          acts: [
            { t: gBum + 0.3, walk: 780 },
            { t: gTorta - 0.3, pose: "hold", dur: 1.2 },
            { t: gTorta - 0.3, expr: "joy" },
            { t: gAccidente - 0.7, wand: true },
            { t: gAccidente - 0.6, pose: "wandAim", dur: 1.2 },
            { t: gAccidente - 0.6, expr: "anger" },
            { t: gAccidente - 0.3, glow: 1 },
            { t: gAccidente + 0.6, glow: 0 },
            { t: gAccidente + 0.6, wand: false },
            { t: gAccidente + 0.6, expr: "joy" },
            { t: gMago - 0.4, pose: "talk" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.25, x: 860, y: 1050 },
        { t: gBum, z: 1.0, x: 540, y: 1100 },
        { t: gTorta, z: 1.15, x: 600, y: 1100 },
        { t: gAccidente - 0.3, z: 1.05, x: 480, y: 1150 },
        { t: gMago - 0.5, z: 1.7, x: 400, y: 1050 },
        { t: 14.5, z: 1.8, x: 400, y: 1050 },
      ],
      sfx: [
        { t: 0.2, s: "knock", v: 0.9 },
        { t: gBum - 0.05, s: "boom", v: 0.95 },
        { t: gBum + 0.6, s: "step", v: 0.8 },
        { t: gBum + 1.1, s: "step", v: 0.8 },
        { t: gAccidente - 0.25, s: "zap", v: 0.5 },
        { t: gAccidente + 0.25, s: "pop", v: 0.6 },
        { t: gMago, s: "sparkle", v: 0.6 },
      ],
      shake: [[gBum, 1.2, 0.6]],
      overlay: ({ t }) => <Flash t={t} at={gBum} dur={0.2} />,
      trans: "wipe",
    },

    cierre: {
      bg: NightCastle,
      fx: ({ t }) => (
        <Svg>
          <Owl x={kf(t, [0.3, 4.5], [-150, 1250])} y={kf(t, [0.3, 4.5], [500, 350])} s={1} t={t} fly />
          <g opacity={kf(t, [eHogwarts - 0.6, eHogwarts, 5.8, 6.3], [0, 1, 1, 0])}>
            <Letter x={540} y={760} s={kf(t, [eHogwarts - 0.6, eHogwarts + 0.4], [0.8, 2.6])} glow={1} r={Math.sin(t * 2) * 4} />
            <Sparkles x={540} y={760} intensity={1.2} seed={11} count={20} />
          </g>
        </Svg>
      ),
      chars: [
        { who: "harry", x: 400, y: 1420, acts: [{ t: 0, expr: "joy" }, { t: eHogwarts, pose: "cheer" }] },
        { who: "hagrid", x: 760, y: 1440, s: 1.5, facing: -1, acts: [{ t: 0, expr: "joy" }, { t: 1, pose: "wave", dur: 2.5 }] },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1100 },
        { t: 10.3, z: 1.1, y: 1150 },
      ],
      sfx: [
        { t: 0.4, s: "flutter", v: 0.5 },
        { t: eHogwarts - 0.4, s: "chime", v: 0.6 },
      ],
      trans: "circle",
    },
  },
};

export const p1dpart1Audio = audio;
