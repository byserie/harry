import React from "react";
import { PartSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { LivingRoom, Svg } from "../scenes/bg1";
import { Corridor, GreatHall, Station } from "../scenes/bg2";
import { Flame } from "../scenes/props";
import { Flash, switchAt, wordClock } from "../scenes/util";
import { Bookshop, DarkAlley, Diary, FlyingCar, Howler, SkyTrain, WillowNight, WillowTree } from "../peli2/assets";
import audioData from "../data/p2dpart2.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);

const hEscritor = w("hook", "escritor");
const hCuaderno = w("hook", "cuaderno");
const hArbol = w("hook", "arbol");

const pChimenea = w("polvos", "chimenea");
const pMal = w("polvos", "mal");
const pCallejon = w("polvos", "callejon");
const pHagrid = w("polvos", "hagrid");

const lLockhart = w("lockhart", "lockhart");
const lFirma = w("lockhart", "firma");
const lProfesor = w("lockhart", "profesor");

const uLucius = w("lucius", "lucius");
const uDiscute = w("lucius", "discute");
const uCuaderno = w("lucius", "cuaderno");
const uGinny = w("lucius", "ginny");

const aCorren = w("anden", "corren");
const aEstrellan = w("anden", "estrellan");
const aTren = w("anden", "tren");

const fAuto = w("vuelo", "auto");
const fLlegar = w("vuelo", "llegar");
const fSauce = w("vuelo", "sauce");

const xVociferador = w("vociferador", "vociferador");
const xGrita = w("vociferador", "grita");
const xMama = w("vociferador", "mama");

const cExpulsion = w("cierre", "expulsion");
const cPeor = w("cierre", "peor");

const Cauldron: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK} strokeWidth={6}>
    <path d="M -60 -50 Q -70 30 0 40 Q 70 30 60 -50 Z" fill="#3a3a44" />
    <ellipse cx={0} cy={-50} rx={64} ry={16} fill="#55556a" />
    <rect x={-20} y={-90} width={40} height={36} fill="#c9a66b" strokeWidth={4} />
  </g>
);

export const p2dpart2: PartSpec = {
  part: 2,
  title: "Harry Potter y la cámara secreta",
  dyn: true,
  scenes: {
    hook: {
      bg: SkyTrain,
      fx: ({ t }) => (
        <Svg>
          <FlyingCar x={kf(t, [0, hArbol], [-300, 560], (x) => x)} y={1050 + Math.sin(t * 2) * 30} s={1.1} t={t} r={t > hArbol ? 25 : 0} riders={["#1e1e28", "#e0662a"]} />
          {t > hEscritor - 0.3 && t < hCuaderno ? (
            <g opacity={kf(t, [hEscritor - 0.3, hEscritor, hCuaderno - 0.4, hCuaderno], [0, 1, 1, 0])}>
              <circle cx={760} cy={620} r={150} fill="#1abc9c" stroke={INK} strokeWidth={8} />
              <circle cx={760} cy={600} r={70} fill="#e0fbf5" stroke={INK} strokeWidth={6} />
              <path d="M 690 590 Q 700 520 760 520 Q 820 520 830 590 Q 790 560 760 560 Q 730 560 690 590 Z" fill="#f2c94c" stroke={INK} strokeWidth={5} />
              <path d="M 730 620 Q 760 650 790 620 Z" fill="#fff" stroke={INK} strokeWidth={4} />
              <circle cx={738} cy={598} r={6} fill={INK} />
              <circle cx={782} cy={598} r={6} fill={INK} />
            </g>
          ) : null}
          {t > hCuaderno - 0.3 && t < hArbol ? (
            <g opacity={kf(t, [hCuaderno - 0.3, hCuaderno, hArbol - 0.4, hArbol], [0, 1, 1, 0])}>
              <Diary x={760} y={620} s={1.4} glow={1} r={Math.sin(t * 2) * 6} />
            </g>
          ) : null}
          {t > hArbol - 0.4 ? (
            <g transform={`translate(${kf(t, [hArbol - 0.4, hArbol], [1500, 1150])} 0)`}>
              <WillowTree x={0} y={1700} t={t} swing={1} s={0.9} />
            </g>
          ) : null}
        </Svg>
      ),
      chars: [],
      cam: [
        { t: 0, z: 1.0, y: 1000 },
        { t: hArbol, z: 1.15, x: 600, y: 1000 },
      ],
      sfx: [
        { t: 0.2, s: "whoosh", v: 0.5 },
        { t: hEscritor, s: "sparkle", v: 0.5 },
        { t: hCuaderno, s: "chime", v: 0.4 },
        { t: hArbol, s: "boom", v: 0.8 },
        { t: hArbol + 0.3, s: "crash", v: 0.5 },
      ],
      shake: [[hArbol, 0.9, 0.6]],
    },

    polvos: {
      bg: switchAt(pCallejon - 0.3, LivingRoom, DarkAlley),
      fx: ({ t }) => (
        <Svg>
          {t > pChimenea - 0.2 && t < pCallejon - 0.3 ? <Flame x={510} y={1260} s={kf(t, [pMal - 0.4, pMal + 0.2], [0.5, 1.6])} t={t} color="#3fdc6b" /> : null}
        </Svg>
      ),
      chars: [
        {
          who: "harry",
          x: 280,
          y: 1440,
          acts: [
            { t: pChimenea, walk: 500 },
            { t: pMal - 0.6, face: 1 },
            { t: pMal - 0.5, pose: "talk", dur: 0.8 },
            { t: pMal - 0.5, expr: "focus" },
            { t: pMal + 0.3, alpha: 0, dur: 0.3 },
            { t: pCallejon - 0.3, move: { x: 400 }, dur: 0.01 },
            { t: pCallejon - 0.2, alpha: 1, dur: 0.3 },
            { t: pCallejon - 0.2, pose: "cower", dur: 2.2 },
            { t: pCallejon - 0.2, expr: "surprise" },
            { t: pHagrid + 0.3, expr: "joy" },
            { t: pHagrid + 0.3, face: 1 },
          ],
        },
        { who: "ron", x: 120, y: 1440, acts: [{ t: pMal + 0.3, expr: "surprise" }, { t: pCallejon - 0.3, show: false }] },
        { who: "hagrid", x: 1300, y: 1460, s: 1.5, acts: [{ t: pHagrid - 0.8, walk: 760 }, { t: pHagrid + 0.4, face: -1 }, { t: pHagrid + 0.4, expr: "joy" }, { t: pHagrid + 0.5, pose: "wave", dur: 2 }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: pMal, z: 1.4, x: 510, y: 1100 },
        { t: pCallejon - 0.35, z: 1.4, x: 510, y: 1100 },
        { t: pCallejon - 0.3, z: 1.0, x: 540, y: 1100 },
        { t: pHagrid, z: 1.1, x: 600, y: 1100 },
      ],
      sfx: [
        { t: pMal - 0.4, s: "fire", v: 0.7 },
        { t: pMal + 0.3, s: "whoosh", v: 0.7 },
        { t: pCallejon - 0.2, s: "pop", v: 0.5 },
        { t: pCallejon + 0.4, s: "rumble", v: 0.3 },
        { t: pHagrid - 0.6, s: "step", v: 0.7 },
      ],
      overlay: ({ t }) => <Flash t={t} at={pCallejon - 0.3} dur={0.3} color="#3fdc6b" />,
      trans: "fade",
    },

    lockhart: {
      bg: Bookshop,
      chars: [
        { who: "hermione", x: 100, y: 1440, acts: [{ t: lLockhart, expr: "joy" }, { t: lLockhart + 0.3, pose: "cheer", dur: 1.5 }] },
        { who: "ron", x: 270, y: 1450, acts: [{ t: lFirma, expr: "focus" }, { t: lFirma, pose: "crossed" }] },
        { who: "harry", x: 460, y: 1450, acts: [{ t: lFirma + 0.4, expr: "surprise" }, { t: lProfesor, expr: "sadness" }] },
        { who: "lockhart", x: 780, y: 1440, facing: -1, acts: [{ t: lLockhart, pose: "wave", dur: 2 }, { t: lLockhart, expr: "joy" }, { t: lFirma, pose: "talk", dur: 2.6 }, { t: lProfesor - 0.3, pose: "armsUp" }] },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1050 },
        { t: lLockhart, z: 1.35, x: 760, y: 1000 },
        { t: lProfesor, z: 1.1, x: 600, y: 1050 },
      ],
      sfx: [
        { t: lFirma + 0.2, s: "pop", v: 0.5 },
        { t: lFirma + 1.0, s: "pop", v: 0.5 },
        { t: lFirma + 1.8, s: "pop", v: 0.5 },
        { t: lProfesor, s: "fanfare", v: 0.4 },
      ],
      overlay: ({ t }) => (
        <>
          <Flash t={t} at={lFirma + 0.2} dur={0.2} />
          <Flash t={t} at={lFirma + 1.0} dur={0.2} />
          <Flash t={t} at={lFirma + 1.8} dur={0.2} />
        </>
      ),
      trans: "circle",
    },

    lucius: {
      bg: Bookshop,
      under: () => (
        <Svg>
          <Cauldron x={330} y={1400} s={1.1} />
        </Svg>
      ),
      fx: ({ t }) => (
        <Svg>
          {t > uCuaderno - 0.3 && t < uCuaderno + 1.1 ? (
            <Diary x={kf(t, [uCuaderno - 0.3, uCuaderno + 0.9], [780, 340])} y={kf(t, [uCuaderno - 0.3, uCuaderno + 0.4, uCuaderno + 0.9], [1000, 900, 1330])} s={0.5} r={t * 120} glow={0.6} />
          ) : null}
        </Svg>
      ),
      chars: [
        { who: "ginny", x: 150, y: 1440, acts: [{ t: uGinny, look: 0.9 }, { t: uGinny, expr: "joy" }] },
        { who: "arthur", x: 450, y: 1440, acts: [{ t: uDiscute - 0.2, expr: "anger" }, { t: uDiscute - 0.2, pose: "angry", dur: 2.5 }] },
        { who: "lucius", x: 1300, y: 1440, acts: [{ t: uLucius - 0.6, walk: 850 }, { t: uDiscute - 0.4, face: -1 }, { t: uDiscute - 0.2, expr: "anger" }, { t: uDiscute - 0.2, pose: "point", dur: 2 }, { t: uCuaderno - 0.4, pose: "hold", dur: 0.6 }, { t: uCuaderno + 0.4, expr: "joy" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: uDiscute, z: 1.25, x: 640, y: 1050 },
        { t: uCuaderno, z: 1.6, x: 520, y: 1200 },
        { t: uGinny + 0.6, z: 1.2, x: 380, y: 1150 },
      ],
      sfx: [
        { t: uLucius, s: "step", v: 0.6 },
        { t: uDiscute, s: "rumble", v: 0.3 },
        { t: uCuaderno - 0.2, s: "whoosh", v: 0.4 },
        { t: uCuaderno + 0.9, s: "pop", v: 0.4 },
      ],
      trans: "slide",
    },

    anden: {
      bg: Station,
      chars: [
        { who: "ron", x: -150, y: 1440, acts: [{ t: aCorren - 0.6, walk: 470, run: true }, { t: aEstrellan, move: { x: 300 }, dur: 0.3 }, { t: aEstrellan, rot: -80, dur: 0.3 }, { t: aEstrellan, expr: "surprise" }, { t: aTren - 0.2, rot: 0, dur: 0.4 }, { t: aTren - 0.2, expr: "sadness" }] },
        { who: "harry", x: -350, y: 1460, acts: [{ t: aCorren - 0.5, walk: 420, run: true }, { t: aEstrellan + 0.05, move: { x: 150 }, dur: 0.3 }, { t: aEstrellan + 0.05, rot: -80, dur: 0.3 }, { t: aEstrellan, expr: "surprise" }, { t: aTren - 0.1, rot: 0, dur: 0.4 }, { t: aTren - 0.1, expr: "sadness" }, { t: aTren + 0.3, look: 0.9 }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: aEstrellan, z: 1.25, x: 400, y: 1100 },
        { t: aTren, z: 1.0, x: 540, y: 1050 },
      ],
      sfx: [
        { t: aEstrellan, s: "boom", v: 0.8 },
        { t: aEstrellan + 0.1, s: "crash", v: 0.4 },
        { t: aTren - 0.3, s: "whistle", v: 0.6 },
      ],
      shake: [[aEstrellan, 0.8]],
      trans: "wipe",
    },

    vuelo: {
      bg: switchAt(fLlegar - 0.2, SkyTrain, ({ t }) => <WillowNight t={t} swing={t > fSauce - 0.4 ? 1 : 0.2} />),
      fx: ({ t }) => (
        <Svg>
          {t < fLlegar - 0.2 ? (
            <FlyingCar x={kf(t, [0, fAuto + 1, fLlegar - 0.2], [-300, 450, 650])} y={1000 + Math.sin(t * 2.5) * 40} s={1.1} t={t} riders={["#1e1e28", "#e0662a"]} />
          ) : (
            <FlyingCar
              x={kf(t, [fLlegar - 0.2, fSauce, fSauce + 2.5], [100, 620, 680])}
              y={kf(t, [fLlegar - 0.2, fSauce, fSauce + 0.4], [500, 720, 820]) + (t > fSauce ? Math.sin(t * 9) * 40 : 0)}
              s={0.9}
              t={t}
              r={t > fSauce ? Math.sin(t * 7) * 25 : 12}
              riders={["#1e1e28", "#e0662a"]}
            />
          )}
        </Svg>
      ),
      chars: [],
      cam: [
        { t: 0, z: 1.0, y: 1000 },
        { t: fLlegar - 0.25, z: 1.1, y: 1000 },
        { t: fLlegar - 0.2, z: 1.0, y: 1000 },
        { t: fSauce + 0.5, z: 1.25, x: 680, y: 800 },
      ],
      sfx: [
        { t: 0.2, s: "whoosh", v: 0.5 },
        { t: fLlegar - 0.4, s: "zap", v: 0.4 },
        { t: fSauce, s: "boom", v: 0.8 },
        { t: fSauce + 0.8, s: "boom", v: 0.6 },
        { t: fSauce + 1.6, s: "crash", v: 0.6 },
        { t: fSauce + 2.4, s: "boom", v: 0.6 },
      ],
      shake: [
        [fSauce, 0.9, 0.5],
        [fSauce + 0.8, 0.7, 0.4],
        [fSauce + 2.4, 0.7, 0.4],
      ],
      overlay: ({ t }) => <Flash t={t} at={fLlegar - 0.2} dur={0.25} />,
      trans: "zoom",
    },

    vociferador: {
      bg: GreatHall,
      fx: ({ t }) => (
        <Svg>
          {t > xVociferador - 0.4 ? <Howler x={kf(t, [xVociferador - 0.4, xVociferador + 0.4], [1200, 560])} y={760} s={kf(t, [xGrita - 0.2, xGrita + 0.3], [0.8, 1.5])} t={t} open={kf(t, [xGrita - 0.2, xGrita + 0.1], [0, 1])} /> : null}
        </Svg>
      ),
      chars: [
        { who: "ron", x: 330, y: 1440, acts: [{ t: xVociferador, expr: "surprise" }, { t: xGrita, pose: "cower" }, { t: xGrita, expr: "sadness" }] },
        { who: "harry", x: 560, y: 1450, acts: [{ t: xGrita, expr: "surprise" }, { t: xGrita, pose: "cower" }] },
        { who: "hermione", x: 850, y: 1440, facing: -1, acts: [{ t: xGrita, pose: "crossed" }, { t: xMama, expr: "focus" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: xGrita, z: 1.3, x: 540, y: 900 },
      ],
      sfx: [
        { t: xVociferador - 0.3, s: "flutter", v: 0.5 },
        { t: xGrita, s: "roar", v: 0.5 },
        { t: xGrita + 0.6, s: "rumble", v: 0.6 },
      ],
      shake: [[xGrita, 0.6, 2]],
      trans: "circle",
    },

    cierre: {
      bg: ({ t }) => <Corridor t={t} />,
      chars: [
        { who: "harry", x: 200, y: 1450, acts: [{ t: 0, expr: "sadness" }, { t: cExpulsion + 0.5, expr: "joy" }, { t: cPeor, expr: "focus" }] },
        { who: "ron", x: 380, y: 1440, acts: [{ t: 0, expr: "sadness" }, { t: cExpulsion + 0.5, expr: "joy" }, { t: cExpulsion + 0.6, pose: "cheer", dur: 1.4 }] },
        { who: "mcgonagall", x: 700, y: 1430, facing: -1, acts: [{ t: 0, expr: "anger" }, { t: 0, pose: "point", dur: 2.5 }] },
        { who: "snape", x: 900, y: 1430, facing: -1, acts: [{ t: 0, expr: "anger" }, { t: 0, pose: "crossed" }] },
      ],
      cam: [
        { t: 0, z: 1.15, x: 600, y: 1050 },
        { t: 11, z: 1.0, x: 540, y: 1100 },
      ],
      sfx: [{ t: cPeor, s: "rumble", v: 0.4 }],
      trans: "fade",
    },
  },
};

export const p2dpart2Audio = audio;
export { Sparkles };
