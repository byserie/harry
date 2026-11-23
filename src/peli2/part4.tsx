import React from "react";
import { AbsoluteFill } from "remotion";
import { PartSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { Svg } from "../scenes/bg1";
import { Bathroom, Chamber, Corridor, Forest, Hospital, NightCastle, Pitch } from "../scenes/bg2";
import { Spell } from "../scenes/props";
import { Banner, Flash, switchAt, wordClock } from "../scenes/util";
import { Aragog, Bludger, Diary, FlyingCar, Goblet, Spider } from "./assets";
import audioData from "../data/p2part4.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);

const hPocion = w("hook", "pocion");
const hDiario = w("hook", "diario");
const hArana = w("hook", "arana");

const pPrepara = w("pocion", "prepara");
const pTransforman = w("pocion", "transforman");
const pGata = w("pocion", "gata");

const bBludger = w("bludger", "bludger");
const bRompe = w("bludger", "rompe");
const bCurarlo = w("bludger", "curarlo");
const bDesaparecer = w("bludger", "desaparecer");

const dDiario = w("diario", "diario");
const dRiddle = w("diario", "riddle");
const dRecuerdo = w("diario", "recuerdo");
const dCulpa = w("diario", "culpa");

const eVictima = w("hermione", "victima");
const ePetrificada = w("hermione", "petrificada");
const ePapel = w("hermione", "papel");

const gAzkaban = w("hagrid", "azkaban");
const gAranas = w("hagrid", "aranas");

const aBosque = w("aragog", "bosque");
const aAragog = w("aragog", "aragog");
const aInocente = w("aragog", "inocente");
const aComer = w("aragog", "comerselos");
const aRescata = w("aragog", "rescata");

const cMonstruo = w("cierre", "monstruo");

const Sepia: React.FC<{ t: number; t0: number; t1: number }> = ({ t, t0, t1 }) =>
  t > t0 && t < t1 ? (
    <AbsoluteFill style={{ background: "radial-gradient(circle, rgba(255,214,140,0.28) 40%, rgba(110,70,20,0.55) 100%)", mixBlendMode: "multiply" }} />
  ) : null;

export const p2part4: PartSpec = {
  part: 4,
  title: "Harry Potter y la cámara secreta",
  scenes: {
    hook: {
      bg: Forest,
      fx: ({ t }) => (
        <Svg>
          {t > hPocion - 0.3 ? <g opacity={kf(t, [hPocion - 0.3, hPocion, hDiario - 0.3, hDiario], [0, 1, 1, 0])}><Goblet x={540} y={760} s={2.2} t={t} /></g> : null}
          {t > hDiario - 0.3 ? <g opacity={kf(t, [hDiario - 0.3, hDiario, hArana - 0.3, hArana], [0, 1, 1, 0])}><Diary x={540} y={700} s={1.6} glow={1} r={Math.sin(t * 2) * 5} /></g> : null}
          {t > hArana - 0.4 ? <Aragog x={kf(t, [hArana - 0.4, hArana + 0.6], [1300, 820])} y={1300} s={0.9} t={t} /> : null}
        </Svg>
      ),
      chars: [
        { who: "harry", x: 230, y: 1460, acts: [{ t: hPocion, expr: "focus" }, { t: hArana, expr: "surprise" }, { t: hArana, pose: "cower" }] },
        { who: "ron", x: 420, y: 1450, acts: [{ t: hArana, expr: "surprise" }, { t: hArana, pose: "cower" }] },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1050 },
        { t: hArana, z: 1.0, y: 1050 },
        { t: 11.4, z: 1.1, x: 600, y: 1100 },
      ],
      sfx: [
        { t: hPocion, s: "sparkle", v: 0.4 },
        { t: hDiario, s: "chime", v: 0.4 },
        { t: hArana, s: "roar", v: 0.5 },
      ],
    },

    pocion: {
      bg: Bathroom,
      under: ({ t }) => (
        <Svg>
          <path d="M 470 1380 Q 460 1460 540 1470 Q 620 1460 610 1380 Z" fill="#3a3a44" stroke={INK} strokeWidth={6} />
          <ellipse cx={540} cy={1380} rx={72} ry={18} fill="#7bb03a" stroke={INK} strokeWidth={5} />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={520 + i * 20} cy={1370 - ((t * 60 + i * 30) % 90)} r={10} fill="#9ccf5a" opacity={0.8} />
          ))}
        </Svg>
      ),
      fx: ({ t }) => <Svg>{t > pTransforman - 0.2 && t < pTransforman + 1 ? <Sparkles x={360} y={1000} intensity={1.5} seed={4} count={24} color="#9ccf5a" /> : null}</Svg>,
      chars: [
        { who: "hermione", x: 760, y: 1440, facing: -1, acts: [{ t: pPrepara, pose: "hold", dur: 2 }, { t: pPrepara, expr: "focus" }, { t: pGata - 0.4, show: false }] },
        { who: "hermionecat", x: 760, y: 1440, facing: -1, show: false, acts: [{ t: pGata - 0.4, show: true }, { t: pGata - 0.4, expr: "sadness" }, { t: pGata - 0.4, pose: "sad" }] },
        { who: "harry", x: 230, y: 1450, acts: [{ t: pTransforman - 0.8, pose: "hold", dur: 0.8 }, { t: pTransforman - 0.2, show: false }] },
        { who: "ron", x: 430, y: 1450, acts: [{ t: pTransforman - 0.8, pose: "hold", dur: 0.8 }, { t: pTransforman - 0.2, show: false }] },
        { who: "goyle", x: 230, y: 1450, show: false, acts: [{ t: pTransforman - 0.2, show: true }, { t: pTransforman - 0.2, expr: "surprise" }, { t: pGata, expr: "surprise" }] },
        { who: "crabbe", x: 430, y: 1450, show: false, acts: [{ t: pTransforman - 0.2, show: true }, { t: pTransforman - 0.2, expr: "joy" }, { t: pGata, expr: "surprise" }, { t: pGata, pose: "surprised" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: pTransforman, z: 1.2, x: 360, y: 1050 },
        { t: pGata, z: 1.5, x: 740, y: 950 },
      ],
      sfx: [
        { t: pPrepara, s: "sparkle", v: 0.3 },
        { t: pTransforman - 0.2, s: "pop", v: 0.6 },
        { t: pTransforman - 0.1, s: "zap", v: 0.4 },
        { t: pGata - 0.4, s: "pop", v: 0.6 },
      ],
      overlay: ({ t }) => (
        <>
          <Flash t={t} at={pTransforman - 0.2} dur={0.3} color="#9ccf5a" />
          <Flash t={t} at={pGata - 0.4} dur={0.3} color="#c9a8ff" />
        </>
      ),
      trans: "fade",
    },

    bludger: {
      bg: Pitch,
      fx: ({ t }) => {
        const hx = t < bRompe ? kf(t, [0, bRompe], [-100, 520]) : 520;
        const bx = t < bRompe ? hx - 260 + Math.sin(t * 6) * 60 : kf(t, [bRompe, bRompe + 1], [560, 1300]);
        const by = t < bRompe ? 900 + Math.cos(t * 5) * 80 : kf(t, [bRompe, bRompe + 1], [820, 500]);
        return (
          <Svg>
            {t > bBludger - 0.8 ? <Bludger x={bx} y={by} s={1.3} t={t} /> : null}
            <Spell t={t} t0={bCurarlo - 0.1} x0={850} y0={1000} x1={560} y1={1150} color="#ff6bd1" />
          </Svg>
        );
      },
      chars: [
        {
          who: "harry",
          x: -100,
          y: 1150,
          broom: true,
          acts: [
            { t: 0, move: { x: 520, y: 1100 }, dur: bRompe },
            { t: bBludger, expr: "surprise" },
            { t: bRompe, rot: -70, dur: 0.3 },
            { t: bRompe, expr: "sadness" },
            { t: bRompe + 0.2, move: { y: 1480 }, dur: 0.5 },
            { t: bDesaparecer, expr: "surprise" },
          ],
        },
        { who: "lockhart", x: 1300, y: 1440, wand: true, acts: [{ t: bCurarlo - 1.4, walk: 840 }, { t: bCurarlo - 0.3, face: -1 }, { t: bCurarlo - 0.3, pose: "wandAim", dur: 1.2 }, { t: bCurarlo - 0.2, glow: 1 }, { t: bCurarlo + 0.6, glow: 0 }, { t: bCurarlo - 0.3, expr: "joy" }, { t: bDesaparecer + 0.3, expr: "surprise" }, { t: bDesaparecer + 0.3, pose: "shrug" }] },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1050 },
        { t: bRompe, z: 1.2, x: 520, y: 1000 },
        { t: bCurarlo, z: 1.05, x: 640, y: 1150 },
        { t: bDesaparecer, z: 1.4, x: 560, y: 1250 },
      ],
      sfx: [
        { t: 0.3, s: "cheer", v: 0.4 },
        { t: bBludger - 0.5, s: "whoosh", v: 0.6 },
        { t: bRompe, s: "boom", v: 0.8 },
        { t: bCurarlo - 0.1, s: "zap", v: 0.5 },
        { t: bDesaparecer, s: "pop", v: 0.6 },
      ],
      shake: [[bRompe, 0.8, 0.5]],
      overlay: ({ t }) => <Banner t={t} text="¡Sin huesos!" t0={bDesaparecer + 0.3} t1={bDesaparecer + 2.4} color="#ff9ae0" />,
      trans: "slide",
    },

    diario: {
      bg: switchAt(dRecuerdo - 0.3, ({ t }) => <Chamber t={t} tint="#1d2350" light="#ffe36e" />, ({ t }) => <Corridor t={t} />),
      fx: ({ t }) =>
        t < dRecuerdo - 0.3 ? (
          <Svg>
            <Diary x={560} y={1230} s={1.1} glow={t > dDiario ? 1 : 0.3} r={-8} />
            {t > dDiario + 0.4 ? (
              <text x={560} y={1060} textAnchor="middle" fontSize={44} fontFamily="Fredoka" fontWeight={700} fill="#ffe36e" opacity={kf(t, [dDiario + 0.4, dDiario + 1], [0, 1])}>
                {t > dRiddle - 0.2 ? "Soy Tom Riddle" : "Hola, Harry"}
              </text>
            ) : null}
          </Svg>
        ) : null,
      chars: [
        { who: "harry", x: 300, y: 1440, acts: [{ t: dDiario, pose: "hold", dur: 1.6 }, { t: dDiario + 0.4, expr: "surprise" }, { t: dRiddle, expr: "focus" }, { t: dRecuerdo - 0.3, move: { x: 120 }, dur: 0.01 }, { t: dRecuerdo - 0.3, alpha: 0.5, dur: 0.01 }, { t: dCulpa, expr: "surprise" }] },
        { who: "riddle", x: 520, y: 1440, show: false, acts: [{ t: dRecuerdo - 0.3, show: true }, { t: dCulpa - 0.3, pose: "point" }, { t: dCulpa - 0.3, expr: "anger" }] },
        { who: "hagrid", x: 840, y: 1460, s: 1.4, facing: -1, show: false, acts: [{ t: dRecuerdo - 0.3, show: true }, { t: dCulpa, expr: "surprise" }, { t: dCulpa, pose: "cower" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: dDiario, z: 1.45, x: 480, y: 1150 },
        { t: dRecuerdo - 0.35, z: 1.45, x: 480, y: 1150 },
        { t: dRecuerdo - 0.3, z: 1.0, x: 540, y: 1100 },
        { t: dCulpa, z: 1.2, x: 640, y: 1050 },
      ],
      sfx: [
        { t: dDiario, s: "chime", v: 0.4 },
        { t: dRecuerdo - 0.3, s: "whoosh", v: 0.6 },
        { t: dCulpa, s: "rumble", v: 0.4 },
      ],
      overlay: ({ t }) => (
        <>
          <Sepia t={t} t0={dRecuerdo - 0.3} t1={20} />
          <Flash t={t} at={dRecuerdo - 0.3} dur={0.35} color="#ffe3a0" />
          <Banner t={t} text="Hace 50 años" t0={dRecuerdo} t1={dRecuerdo + 2} color="#ffe3a0" />
        </>
      ),
      trans: "circle",
    },

    hermione: {
      bg: Hospital,
      fx: ({ t }) => (
        <Svg>
          <rect x={430} y={1170} width={46} height={30} fill="#fff6dc" stroke={INK} strokeWidth={3} transform="rotate(-20 453 1185)" />
          {t > ePetrificada - 0.2 && t < ePetrificada + 1.2 ? <Sparkles x={540} y={1150} intensity={1} seed={8} count={14} color="#d0d4dc" /> : null}
        </Svg>
      ),
      chars: [
        { who: "hermione", x: 600, y: 1270, s: 1.6, acts: [{ t: 0, rot: -90, dur: 0.001 }, { t: 0, expr: "surprise" }, { t: 0, stone: true }] },
        { who: "harry", x: 860, y: 1460, facing: -1, acts: [{ t: eVictima, expr: "sadness" }, { t: ePetrificada, pose: "sad" }, { t: ePapel, expr: "focus" }, { t: ePapel, look: 0.9 }] },
        { who: "ron", x: 1010, y: 1450, facing: -1, acts: [{ t: eVictima, expr: "sadness" }, { t: ePetrificada, pose: "sad" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: ePetrificada, z: 1.35, x: 540, y: 1150 },
        { t: ePapel, z: 1.8, x: 460, y: 1180 },
      ],
      sfx: [
        { t: ePetrificada, s: "chime", v: 0.3 },
        { t: ePapel, s: "paper", v: 0.4 },
      ],
      trans: "fade",
    },

    hagrid: {
      bg: ({ t }) => <Forest t={t} hut />,
      fx: ({ t }) => (
        <Svg>
          {t > gAranas - 0.6
            ? Array.from({ length: 9 }).map((_, i) => <Spider key={i} x={((t - gAranas + 0.6) * 260 + i * 120) % 1400 - 200} y={1500 + (i % 3) * 40} s={1.2} t={t} />)
            : null}
        </Svg>
      ),
      chars: [
        { who: "hagrid", x: 760, y: 1460, s: 1.5, facing: -1, acts: [{ t: 0, expr: "sadness" }, { t: gAranas - 0.4, pose: "point", dur: 1.4 }, { t: gAranas + 1.2, walk: 1450 }] },
        { who: "harry", x: 200, y: 1450, acts: [{ t: gAzkaban, expr: "sadness" }, { t: gAranas, expr: "surprise" }, { t: gAranas + 0.4, look: -0.5 }] },
        { who: "ron", x: 380, y: 1450, acts: [{ t: gAzkaban, expr: "sadness" }, { t: gAranas, expr: "surprise" }, { t: gAranas + 0.4, pose: "cower" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: gAranas, z: 1.1, x: 540, y: 1250 },
      ],
      sfx: [
        { t: gAzkaban, s: "rumble", v: 0.4 },
        { t: gAranas, s: "flutter", v: 0.3 },
      ],
      trans: "wipe",
    },

    aragog: {
      bg: Forest,
      under: ({ t }) => <Svg>{t > aAragog - 0.6 ? <Aragog x={720} y={kf(t, [aAragog - 0.6, aAragog + 0.4], [1900, 1420])} s={1.05} t={t} /> : null}</Svg>,
      fx: ({ t }) => (
        <Svg>
          {Array.from({ length: t > aComer ? 26 : 8 }).map((_, i) => {
            const k = t > aComer ? Math.min(1, (t - aComer) / 2) : 0;
            const sx = i % 2 ? 1250 : -150;
            const tx = 200 + (i % 5) * 50;
            return <Spider key={i} x={t > aComer ? sx + (tx - sx) * k + Math.sin(t * 3 + i) * 30 : ((t * 200 + i * 160) % 1400) - 200} y={1380 + (i % 4) * 60 - (t > aComer ? (i % 6) * 70 * k : 0)} s={1.3} t={t} flip={i % 2 === 1} />;
          })}
          {t > aRescata - 0.6 ? <FlyingCar x={kf(t, [aRescata - 0.6, aRescata + 0.2, aRescata + 1.4, aRescata + 2.6], [-400, 300, 300, 1500])} y={1360} s={0.95} t={t} riders={t > aRescata + 1.2 ? ["#1e1e28", "#e0662a"] : []} /> : null}
        </Svg>
      ),
      chars: [
        { who: "harry", x: -200, y: 1460, acts: [{ t: aBosque - 0.8, walk: 220 }, { t: aAragog, expr: "surprise" }, { t: aAragog, pose: "surprised", dur: 2 }, { t: aInocente, expr: "focus" }, { t: aComer, expr: "surprise" }, { t: aComer + 0.3, pose: "cower" }, { t: aRescata + 0.8, alpha: 0, dur: 0.3 }] },
        { who: "ron", x: -350, y: 1450, acts: [{ t: aBosque - 0.6, walk: 70 }, { t: aAragog, expr: "surprise" }, { t: aAragog, pose: "cower" }, { t: aRescata + 0.9, alpha: 0, dur: 0.3 }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: aAragog, z: 1.0, x: 600, y: 1000 },
        { t: aComer, z: 1.15, x: 420, y: 1150 },
        { t: aRescata, z: 1.0, x: 540, y: 1100 },
      ],
      sfx: [
        { t: aAragog - 0.5, s: "rumble", v: 0.6 },
        { t: aAragog, s: "roar", v: 0.4 },
        { t: aComer, s: "flutter", v: 0.7 },
        { t: aComer + 0.6, s: "hiss", v: 0.5 },
        { t: aRescata - 0.6, s: "whoosh", v: 0.7 },
        { t: aRescata + 1.4, s: "whoosh", v: 0.6 },
      ],
      shake: [[aAragog, 0.5, 0.8]],
      trans: "fade",
    },

    cierre: {
      bg: NightCastle,
      fx: ({ t }) =>
        t > cMonstruo - 0.3 ? (
          <Svg>
            <g opacity={kf(t, [cMonstruo - 0.3, cMonstruo + 0.3, 6.6, 7.2], [0, 1, 1, 0])}>
              <ellipse cx={440} cy={620} rx={50} ry={34} fill="#ffe66d" />
              <ellipse cx={640} cy={620} rx={50} ry={34} fill="#ffe66d" />
              <ellipse cx={446} cy={620} rx={10} ry={28} fill={INK} />
              <ellipse cx={646} cy={620} rx={10} ry={28} fill={INK} />
              <circle cx={540} cy={620} r={260} fill="#ffe66d" opacity={0.08} />
            </g>
          </Svg>
        ) : null,
      chars: [
        { who: "harry", x: 380, y: 1450, acts: [{ t: 0, expr: "focus" }, { t: cMonstruo, expr: "surprise" }] },
        { who: "ron", x: 680, y: 1440, facing: -1, acts: [{ t: 0, expr: "focus" }, { t: cMonstruo, expr: "surprise" }, { t: cMonstruo, pose: "cower", dur: 2 }] },
      ],
      cam: [
        { t: 0, z: 1.1, y: 1100 },
        { t: 10.8, z: 1.0, y: 1100 },
      ],
      sfx: [
        { t: cMonstruo - 0.3, s: "hiss", v: 0.5 },
        { t: cMonstruo, s: "rumble", v: 0.5 },
      ],
      trans: "circle",
    },
  },
};

export const p2part4Audio = audio;
