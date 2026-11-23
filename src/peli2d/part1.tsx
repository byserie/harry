import React from "react";
import { PartSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { LivingRoom, Svg } from "../scenes/bg1";
import { NightCastle } from "../scenes/bg2";
import { Letter, MiniStick } from "../scenes/props";
import { Banner, Flash, switchAt, wordClock } from "../scenes/util";
import { Bedroom, Burrow, FlyingCar, Pudding, Splat } from "../peli2/assets";
import audioData from "../data/p2dpart1.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);

export const Thought: React.FC<{ x: number; y: number; s?: number; k: number; children: React.ReactNode }> = ({ x, y, s = 1, k, children }) =>
  k <= 0 ? null : (
    <g transform={`translate(${x} ${y}) scale(${s * (0.7 + 0.3 * k)})`} opacity={k}>
      <circle cx={-150} cy={190} r={16} fill="#fff" stroke={INK} strokeWidth={5} />
      <circle cx={-110} cy={150} r={24} fill="#fff" stroke={INK} strokeWidth={5} />
      <ellipse cx={0} cy={0} rx={220} ry={150} fill="#fff" stroke={INK} strokeWidth={7} />
      {children}
    </g>
  );

const hElfo = w("hook", "elfo");
const hAuto = w("hook", "auto");
const hAdvertencia = w("hook", "advertencia");

const vRon = w("verano", "ron");
const vLechuza = w("verano", "lechuza");

const dDobby = w("dobby", "dobby");
const dPeligro = w("dobby", "peligro");
const dCartas = w("dobby", "cartas");

const tLevitar = w("torta", "levitar");
const tCae = w("torta", "cae");
const tFurioso = w("torta", "furioso");

const aAuto = w("auto", "auto");
const aRon = w("auto", "ron");
const aArrancan = w("auto", "arrancan");
const aEscapa = w("auto", "escapa");

const mMadriguera = w("madriguera", "madriguera");
const mReloj = w("madriguera", "reloj");
const mReta = w("madriguera", "reta");
const mDesayuno = w("madriguera", "desayuno");

const cCasa = w("cierre", "casa");
const cDobby = w("cierre", "dobby");

const WINDOW = "polygon(566px 426px, 994px 426px, 994px 934px, 566px 934px)";

export const p2dpart1: PartSpec = {
  part: 1,
  title: "Harry Potter y la cámara secreta",
  dyn: true,
  scenes: {
    hook: {
      bg: Bedroom,
      under: ({ t }) =>
        t > hAuto - 0.4 && t < hAuto + 2.6 ? (
          <div style={{ position: "absolute", inset: 0, clipPath: WINDOW }}>
            <Svg>
              <FlyingCar x={kf(t, [hAuto - 0.4, hAuto + 2.6], [1150, 420], (x) => x)} y={700 + Math.sin(t * 4) * 20} s={0.55} t={t} riders={["#e0662a", "#e0662a", "#e0662a"]} />
            </Svg>
          </div>
        ) : null,
      fx: ({ t }) => <Svg>{t > hElfo - 0.3 && t < hElfo + 1 ? <Sparkles x={300} y={1100} intensity={kf(t, [hElfo - 0.3, hElfo, hElfo + 1], [0, 1.3, 0])} seed={2} count={18} /> : null}</Svg>,
      chars: [
        { who: "harry", x: 520, y: 1440, acts: [{ t: 4.4, look: 0.3 }, { t: hElfo, expr: "surprise" }, { t: hElfo, face: -1 }, { t: hAuto - 0.2, face: 1 }, { t: hAuto - 0.2, expr: "joy" }, { t: hAdvertencia, expr: "focus" }, { t: hAdvertencia, pose: "think" }] },
        { who: "dobby", x: 260, y: 1440, show: false, acts: [{ t: hElfo - 0.1, show: true }, { t: hElfo, pose: "wave", dur: 1.6 }, { t: hElfo, expr: "joy" }, { t: hAdvertencia - 0.2, expr: "sadness" }, { t: hAdvertencia - 0.2, pose: "point" }] },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1100 },
        { t: hAuto, z: 1.15, x: 700, y: 900 },
        { t: hAdvertencia, z: 1.3, x: 420, y: 1100 },
      ],
      sfx: [
        { t: hElfo - 0.1, s: "pop", v: 0.6 },
        { t: hAuto - 0.3, s: "whoosh", v: 0.6 },
        { t: hAdvertencia, s: "rumble", v: 0.4 },
      ],
    },

    verano: {
      bg: Bedroom,
      fx: ({ t }) => (
        <Svg>
          <Thought x={560} y={520} k={kf(t, [vRon - 0.4, vRon, vLechuza - 0.5, vLechuza], [0, 1, 1, 0])}>
            <MiniStick x={-80} y={110} s={0.55} color="#2fae4f" head="#e2f7e6" hair="#e0662a" />
            <MiniStick x={80} y={110} s={0.55} color="#8a4fe0" head="#efe6ff" hair="#7a4a2a" />
            <text x={0} y={-30} textAnchor="middle" fontSize={110} fontFamily="Fredoka" fontWeight={700} fill="#e23b3b">?</text>
          </Thought>
          {t > vRon + 0.5 ? <Letter x={360} y={1270} s={0.5} r={-10} /> : null}
        </Svg>
      ),
      chars: [{ who: "harry", x: 260, y: 1290, acts: [{ t: 0, pose: "sit" }, { t: 0, expr: "sadness" }, { t: vLechuza - 0.2, look: 0.9 }] }],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: vRon, z: 1.1, x: 460, y: 950 },
        { t: vLechuza, z: 1.45, x: 760, y: 1060 },
      ],
      sfx: [{ t: vLechuza, s: "flutter", v: 0.4 }],
      trans: "fade",
    },

    dobby: {
      bg: Bedroom,
      fx: ({ t }) => <Svg>{t > dDobby - 0.3 && t < dDobby + 1 ? <Sparkles x={260} y={1000} intensity={kf(t, [dDobby - 0.3, dDobby, dDobby + 1], [0, 1.4, 0])} seed={5} count={18} /> : null}</Svg>,
      chars: [
        { who: "harry", x: 680, y: 1440, facing: -1, acts: [{ t: dDobby, expr: "surprise" }, { t: dDobby, pose: "surprised", dur: 1.6 }, { t: dPeligro + 0.4, expr: "focus" }, { t: dCartas + 0.2, expr: "anger" }, { t: dCartas + 0.2, pose: "angry" }] },
        {
          who: "dobby",
          x: 260,
          y: 1130,
          show: false,
          holding: (t) => (t > dCartas - 0.4 ? <Letter x={10} y={0} s={0.5} /> : null),
          acts: [
            { t: dDobby - 0.1, show: true },
            { t: dDobby, pose: "wave", dur: 1.2 },
            { t: dDobby, expr: "joy" },
            { t: dPeligro - 0.3, pose: "talk", dur: 2.5 },
            { t: dPeligro - 0.3, expr: "sadness" },
            { t: dCartas - 0.4, pose: "hold" },
            { t: dCartas - 0.4, expr: "surprise" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: dDobby, z: 1.5, x: 300, y: 1000 },
        { t: dCartas, z: 1.15, x: 480, y: 1050 },
      ],
      sfx: [
        { t: dDobby - 0.1, s: "pop", v: 0.7 },
        { t: dCartas - 0.4, s: "paper", v: 0.6 },
      ],
      trans: "circle",
    },

    torta: {
      bg: switchAt(tFurioso - 0.2, LivingRoom, ({ t }) => <Bedroom t={t} bars />),
      under: ({ t }) =>
        t < tFurioso - 0.2 ? (
          <Svg>
            <rect x={600} y={1250} width={460} height={40} fill="#8a5a2b" stroke={INK} strokeWidth={6} />
            <MiniStick x={700} y={1420} s={1.25} color="#9b59b6" head="#fff0f6" hair="#c9a25e" />
            <MiniStick x={900} y={1420} s={1.35} color="#34495e" head="#ecedef" hair="#555" />
          </Svg>
        ) : null,
      fx: ({ t }) =>
        t < tFurioso - 0.2 ? (
          <Svg>
            {t < tCae + 0.35 ? (
              <Pudding
                x={t < tCae ? kf(t, [tLevitar - 0.3, tLevitar + 1], [330, 760]) : 800}
                y={t < tCae ? kf(t, [tLevitar - 0.3, tLevitar + 1], [1240, 620]) + Math.sin(t * 6) * 15 : kf(t, [tCae, tCae + 0.35], [620, 980], (x) => x * x)}
                s={1}
              />
            ) : null}
            <Splat x={800} y={1000} s={1.2} t={t} t0={tCae + 0.35} />
            {t > tLevitar - 0.4 && t < tCae ? <Sparkles x={300} y={1000} intensity={0.8} seed={9} count={12} /> : null}
          </Svg>
        ) : null,
      chars: [
        { who: "dobby", x: 200, y: 1430, acts: [{ t: tLevitar - 0.4, pose: "pointUp", dur: 2.2 }, { t: tLevitar - 0.4, expr: "focus" }, { t: tCae + 0.6, alpha: 0, dur: 0.2 }] },
        { who: "harry", x: 460, y: 1440, acts: [{ t: tLevitar, expr: "surprise" }, { t: tCae + 0.3, pose: "cower", dur: 1.5 }, { t: tFurioso - 0.2, move: { x: 700, y: 1440 }, dur: 0.01 }, { t: tFurioso - 0.2, expr: "sadness" }, { t: tFurioso - 0.2, pose: "sad" }] },
        { who: "vernon", x: 1000, y: 1460, facing: -1, acts: [{ t: tCae + 0.5, expr: "anger" }, { t: tCae + 0.5, pose: "angry" }, { t: tFurioso - 0.2, show: false }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: tLevitar, z: 1.1, x: 540, y: 1000 },
        { t: tCae + 0.3, z: 1.2, x: 760, y: 1050 },
        { t: tFurioso - 0.25, z: 1.2, x: 760, y: 1050 },
        { t: tFurioso - 0.2, z: 1.1, x: 700, y: 1000 },
      ],
      sfx: [
        { t: tLevitar - 0.3, s: "sparkle", v: 0.5 },
        { t: tCae + 0.3, s: "splash", v: 0.8 },
        { t: tCae + 0.35, s: "crash", v: 0.4 },
        { t: tFurioso, s: "knock", v: 0.6 },
      ],
      shake: [[tCae + 0.35, 0.7]],
      overlay: ({ t }) => <Flash t={t} at={tFurioso - 0.2} dur={0.25} />,
      trans: "slide",
    },

    auto: {
      bg: ({ t }) => <Bedroom t={t} bars={t < aArrancan} />,
      under: ({ t }) =>
        t > aAuto - 0.6 ? (
          <div style={{ position: "absolute", inset: 0, clipPath: WINDOW }}>
            <Svg>
              <FlyingCar
                x={t < aArrancan ? kf(t, [aAuto - 0.6, aAuto + 0.6], [1300, 900]) : kf(t, [aArrancan, aArrancan + 0.5, aEscapa + 0.6, aEscapa + 2], [900, 1000, 900, -400])}
                y={690 + Math.sin(t * 3) * 14}
                s={0.75}
                t={t}
                riders={t > aEscapa + 0.4 ? ["#e0662a", "#e0662a", "#1e1e28", "#e0662a"] : ["#e0662a", "#e0662a", "#e0662a"]}
              />
            </Svg>
          </div>
        ) : null,
      fx: ({ t }) =>
        t > aArrancan && t < aArrancan + 1.2 ? (
          <Svg>
            {Array.from({ length: 7 }).map((_, i) => (
              <rect key={i} x={575 + i * 64 + (t - aArrancan) * 500} y={410 + (t - aArrancan) * (300 + i * 40)} width={14} height={540} fill="#5a5a66" stroke={INK} strokeWidth={3} transform={`rotate(${(t - aArrancan) * 90} ${580 + i * 64} 680)`} />
            ))}
          </Svg>
        ) : null,
      chars: [
        {
          who: "harry",
          x: 340,
          y: 1440,
          acts: [
            { t: 0, expr: "sadness" },
            { t: aAuto, expr: "surprise" },
            { t: aAuto, look: 0.9 },
            { t: aRon, expr: "joy" },
            { t: aRon, pose: "cheer", dur: 1.5 },
            { t: aArrancan + 0.4, walk: 780 },
            { t: aEscapa, alpha: 0, dur: 0.4 },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: aAuto, z: 1.3, x: 780, y: 760 },
        { t: aRon + 1, z: 1.05, x: 600, y: 1000 },
        { t: aArrancan, z: 1.2, x: 760, y: 820 },
      ],
      sfx: [
        { t: aAuto - 0.6, s: "whoosh", v: 0.6 },
        { t: aRon, s: "chime", v: 0.4 },
        { t: aArrancan, s: "crash", v: 0.8 },
        { t: aArrancan + 0.1, s: "boom", v: 0.5 },
        { t: aEscapa + 0.6, s: "whoosh", v: 0.6 },
      ],
      shake: [[aArrancan, 0.8, 0.5]],
      trans: "fade",
    },

    madriguera: {
      bg: Burrow,
      chars: [
        { who: "ron", x: 100, y: 1440, s: 1.6, acts: [{ t: 0, expr: "joy" }, { t: mReta - 0.2, expr: "sadness" }, { t: mReta - 0.2, pose: "sad", dur: 2 }, { t: mDesayuno, expr: "joy" }] },
        { who: "fred", x: 265, y: 1440, s: 1.6, acts: [{ t: 0, expr: "joy" }, { t: mReta - 0.2, expr: "sadness" }, { t: mReta - 0.2, pose: "sad", dur: 2 }, { t: mDesayuno, expr: "joy" }] },
        { who: "george", x: 430, y: 1440, s: 1.6, acts: [{ t: 0, expr: "joy" }, { t: mReta - 0.2, expr: "sadness" }, { t: mReta - 0.2, pose: "sad", dur: 2 }, { t: mDesayuno, expr: "joy" }] },
        { who: "harry", x: 610, y: 1450, s: 1.7, acts: [{ t: mMadriguera, expr: "joy" }, { t: mReloj, look: 0.4 }, { t: mReloj, pose: "point", dur: 1.6 }, { t: mReta - 0.2, expr: "surprise" }, { t: mDesayuno, expr: "joy" }, { t: mDesayuno + 0.3, pose: "cheer" }] },
        { who: "molly", x: 1200, y: 1460, s: 1.7, facing: -1, acts: [{ t: mReta - 1.2, walk: 880 }, { t: mReta - 0.2, face: -1 }, { t: mReta - 0.2, expr: "anger" }, { t: mReta - 0.2, pose: "angry", dur: 2.2 }, { t: mDesayuno - 0.3, expr: "joy" }, { t: mDesayuno - 0.3, pose: "hold" }] },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1100 },
        { t: mReloj, z: 1.35, x: 300, y: 800 },
        { t: mReta, z: 1.1, x: 600, y: 1100 },
        { t: mDesayuno, z: 1.3, x: 720, y: 1050 },
      ],
      sfx: [
        { t: mReloj, s: "chime", v: 0.4 },
        { t: mReta, s: "zap", v: 0.3 },
      ],
      trans: "circle",
    },

    cierre: {
      bg: NightCastle,
      fx: ({ t }) => (
        <Svg>
          <Thought x={560} y={560} k={kf(t, [cDobby - 0.4, cDobby, 6.6, 7.0], [0, 1, 1, 0])} s={0.9}>
            <MiniStick x={0} y={120} s={0.6} color="#8fd14f" head="#e9f7d9" />
            <path d="M -27 -76 L -90 -100 L -24 -60 Z M 27 -76 L 90 -100 L 24 -60 Z" fill="#e9f7d9" stroke={INK} strokeWidth={4} />
            <text x={140} y={-20} fontSize={90} fontFamily="Fredoka" fontWeight={700} fill="#e23b3b">!</text>
          </Thought>
        </Svg>
      ),
      chars: [
        { who: "ron", x: 300, y: 1440, acts: [{ t: 0, expr: "joy" }, { t: 0.5, pose: "wave", dur: 2 }] },
        { who: "harry", x: 600, y: 1450, acts: [{ t: 0, expr: "joy" }, { t: cCasa, pose: "cheer", dur: 1.5 }, { t: cDobby - 0.2, expr: "focus" }, { t: cDobby, pose: "think" }] },
      ],
      cam: [
        { t: 0, z: 1.1, y: 1100 },
        { t: 14, z: 1.0, y: 1150 },
      ],
      sfx: [{ t: cDobby - 0.3, s: "pop", v: 0.4 }],
      overlay: ({ t }) => <Banner t={t} text="La Madriguera" t0={0.3} t1={2.4} color="#ffd8a8" />,
      trans: "fade",
    },
  },
};

export const p2dpart1Audio = audio;
