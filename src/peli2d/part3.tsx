import React from "react";
import { PartSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { Svg } from "../scenes/bg1";
import { Classroom, Corridor, GreatHall } from "../scenes/bg2";
import { Courtyard } from "../scenes/backgrounds/Courtyard";
import { Question, Snake, Spell } from "../scenes/props";
import { Banner, wordClock } from "../scenes/util";
import { NorrisStone, Pixie, WallMessage } from "../peli2/assets";
import audioData from "../data/p2dpart3.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);

const hVoz = w("hook", "voz");
const hMensaje = w("hook", "mensaje");
const hSecreto = w("hook", "secreto");

const dJaula = w("duendecillos", "jaula");
const dCorriendo = w("duendecillos", "corriendo");
const dCongela = w("duendecillos", "congela");

const zVoz = w("voz", "voz");
const zNadie = w("voz", "nadie");

const mGata = w("mensaje", "gata");
const mMensaje = w("mensaje", "mensaje");

const lLeyenda = w("leyenda", "leyenda");
const lCamara = w("leyenda", "camara");
const lMonstruo = w("leyenda", "monstruo");

const uSerpiente = w("duelo", "serpiente");
const uHabla = w("duelo", "habla");
const uParsel = w("duelo", "parsel");

const sMiedo = w("sospecha", "miedo");
const sHeredero = w("sospecha", "heredero");

const cQuien = w("cierre", "quien");

const Whisper: React.FC<{ t: number; t0: number; t1: number }> = ({ t, t0, t1 }) => {
  const k = kf(t, [t0 - 0.2, t0 + 0.3, t1, t1 + 0.4], [0, 1, 1, 0]);
  if (k <= 0) return null;
  return (
    <g opacity={k}>
      {[0, 1, 2, 3].map((i) => {
        const r = ((t * 220 + i * 160) % 640) + 40;
        return <ellipse key={i} cx={1080} cy={900} rx={r} ry={r * 0.7} fill="none" stroke="#5fd39a" strokeWidth={8} opacity={1 - r / 680} />;
      })}
      {[0, 1, 2, 3].map((i) => {
        const r = ((t * 220 + i * 160) % 640) + 40;
        return <ellipse key={`l${i}`} cx={0} cy={900} rx={r} ry={r * 0.7} fill="none" stroke="#5fd39a" strokeWidth={8} opacity={1 - r / 680} />;
      })}
    </g>
  );
};

export const p2dpart3: PartSpec = {
  part: 3,
  title: "Harry Potter y la cámara secreta",
  dyn: true,
  scenes: {
    hook: {
      bg: ({ t }) => <Corridor t={t} dark />,
      fx: ({ t }) => (
        <Svg>
          <Whisper t={t} t0={hVoz} t1={hMensaje} />
          <WallMessage t={t} t0={hMensaje} y={380} />
        </Svg>
      ),
      chars: [
        { who: "harry", x: 540, y: 1460, acts: [{ t: hVoz, expr: "surprise" }, { t: hVoz, look: -0.6 }, { t: hVoz + 1, look: 0.9 }, { t: hMensaje, look: null }, { t: hMensaje, pose: "pointUp", dur: 2 }, { t: hSecreto, expr: "focus" }] },
        { who: "ron", x: 300, y: 1450, acts: [{ t: hMensaje, expr: "surprise" }, { t: hMensaje, pose: "cower" }] },
        { who: "hermione", x: 790, y: 1450, facing: -1, acts: [{ t: hMensaje, expr: "surprise" }, { t: hMensaje, pose: "surprised" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: hMensaje, z: 1.0, y: 1000 },
        { t: 12, z: 1.12, y: 1000 },
      ],
      sfx: [
        { t: hVoz, s: "hiss", v: 0.5 },
        { t: hMensaje, s: "rumble", v: 0.6 },
      ],
    },

    duendecillos: {
      bg: Classroom,
      fx: ({ t }) => (
        <Svg>
          {t > dJaula - 0.2
            ? Array.from({ length: 10 }).map((_, i) => {
                const frozen = t > dCongela + 0.3;
                const tt = frozen ? dCongela + 0.3 : t;
                const k = Math.min(1, (tt - dJaula + 0.2) / 0.8);
                return <Pixie key={i} x={760 + (Math.sin(tt * (2 + i * 0.3) + i) * 420) * k} y={1000 + (Math.cos(tt * (2.5 + i * 0.2) + i * 2) * 320 - 200) * k} s={1.2} t={t} frozen={frozen} />;
              })
            : null}
          <rect x={700} y={1180} width={120} height={100} fill="none" stroke="#c9a441" strokeWidth={6} />
          <Spell t={t} t0={dCongela - 0.1} x0={300} y0={950} x1={700} y1={900} color="#bfefff" />
          {t > dCongela + 0.2 && t < dCongela + 1.5 ? <Sparkles x={700} y={900} intensity={1.5} seed={5} count={26} color="#bfefff" /> : null}
        </Svg>
      ),
      chars: [
        { who: "hermione", x: 200, y: 1440, wand: true, acts: [{ t: dJaula + 0.5, expr: "surprise" }, { t: dCongela - 0.4, pose: "wandAim", dur: 1.6 }, { t: dCongela - 0.4, expr: "focus" }, { t: dCongela - 0.2, glow: 1 }, { t: dCongela + 1, glow: 0 }, { t: dCongela + 1, expr: "joy" }] },
        { who: "ron", x: 360, y: 1450, acts: [{ t: dJaula + 0.5, expr: "surprise" }, { t: dJaula + 0.5, pose: "cower", dur: 3 }] },
        { who: "harry", x: 520, y: 1450, acts: [{ t: dJaula + 0.5, expr: "surprise" }, { t: dJaula + 0.8, pose: "cower", dur: 3 }] },
        { who: "lockhart", x: 860, y: 1440, facing: -1, acts: [{ t: 0.3, pose: "talk", dur: dJaula - 0.5 }, { t: 0.3, expr: "joy" }, { t: dJaula, pose: "point", dur: 0.8 }, { t: dJaula + 0.9, expr: "surprise" }, { t: dCorriendo - 0.4, walk: 1350, run: true }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: dJaula, z: 1.0, y: 1000 },
        { t: dCongela, z: 1.2, x: 420, y: 1050 },
      ],
      sfx: [
        { t: dJaula, s: "pop", v: 0.5 },
        { t: dJaula + 0.3, s: "flutter", v: 0.6 },
        { t: dJaula + 1.2, s: "crash", v: 0.5 },
        { t: dCorriendo - 0.4, s: "whoosh", v: 0.4 },
        { t: dCongela - 0.1, s: "zap", v: 0.5 },
        { t: dCongela + 0.2, s: "sparkle", v: 0.6 },
      ],
      shake: [[dJaula + 1.2, 0.4]],
      trans: "fade",
    },

    voz: {
      bg: ({ t }) => <Corridor t={t} dark />,
      fx: ({ t }) => (
        <Svg>
          <Whisper t={t} t0={zVoz - 0.2} t1={zNadie} />
        </Svg>
      ),
      chars: [
        { who: "harry", x: -150, y: 1460, acts: [{ t: 0.2, walk: 480 }, { t: zVoz, expr: "surprise" }, { t: zVoz, look: -0.8 }, { t: zVoz + 1.2, look: 0.9 }, { t: zVoz + 2, pose: "cower", dur: 1.6 }, { t: zNadie, look: null }, { t: zNadie, expr: "focus" }] },
        { who: "ron", x: 1250, y: 1450, acts: [{ t: zNadie - 0.8, walk: 780 }, { t: zNadie + 0.2, face: -1 }, { t: zNadie + 0.3, pose: "shrug" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: zVoz, z: 1.5, x: 480, y: 1000 },
        { t: zNadie, z: 1.1, x: 600, y: 1100 },
      ],
      sfx: [
        { t: zVoz - 0.2, s: "hiss", v: 0.6 },
        { t: zVoz + 1.4, s: "hiss", v: 0.5 },
      ],
      trans: "fade",
    },

    mensaje: {
      bg: ({ t }) => <Corridor t={t} dark />,
      under: ({ t }) => (
        <Svg>
          {t > mGata - 0.6 ? <NorrisStone x={760} y={1130} s={1.2} /> : null}
          <rect x={0} y={1290} width={1080} height={120} fill="#3a7bbf" opacity={0.25} />
        </Svg>
      ),
      fx: ({ t }) => (
        <Svg>
          <WallMessage t={t} t0={mMensaje - 0.2} y={400} />
        </Svg>
      ),
      chars: [
        { who: "harry", x: 260, y: 1460, acts: [{ t: mGata, expr: "surprise" }, { t: mGata, pose: "surprised", dur: 2 }, { t: mMensaje, pose: "pointUp" }] },
        { who: "ron", x: 90, y: 1450, acts: [{ t: mGata + 0.3, expr: "surprise" }, { t: mMensaje, pose: "cower" }] },
        { who: "hermione", x: 440, y: 1450, acts: [{ t: mGata + 0.3, expr: "surprise" }, { t: mMensaje, expr: "sadness" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: mGata, z: 1.6, x: 760, y: 1100 },
        { t: mMensaje - 0.2, z: 1.05, x: 540, y: 900 },
      ],
      sfx: [
        { t: mGata, s: "chime", v: 0.3 },
        { t: mMensaje - 0.2, s: "rumble", v: 0.7 },
      ],
      shake: [[mMensaje, 0.4, 1]],
      trans: "circle",
    },

    leyenda: {
      bg: Classroom,
      fx: ({ t }) => {
        const k = kf(t, [lCamara - 0.4, lCamara + 0.1, 12, 12.6], [0, 1, 1, 0]);
        return k > 0 ? (
          <Svg>
            <g opacity={k}>
              <circle cx={540} cy={420} r={260} fill="#0d2a22" stroke={INK} strokeWidth={10} />
              <circle cx={540} cy={420} r={232} fill="#123a30" />
              <Snake x={620} y={340} s={1.3} t={t} />
              <text x={540} y={580} textAnchor="middle" fontSize={56} fontFamily="Fredoka" fontWeight={700} fill="#9cf29c">SLYTHERIN</text>
              {t > lMonstruo - 0.2 ? (
                <g opacity={kf(t, [lMonstruo - 0.2, lMonstruo + 0.3], [0, 1])}>
                  <ellipse cx={470} cy={470} rx={30} ry={20} fill="#ffe66d" />
                  <ellipse cx={610} cy={470} rx={30} ry={20} fill="#ffe66d" />
                  <ellipse cx={474} cy={470} rx={6} ry={16} fill={INK} />
                  <ellipse cx={614} cy={470} rx={6} ry={16} fill={INK} />
                </g>
              ) : null}
            </g>
          </Svg>
        ) : null;
      },
      chars: [
        { who: "mcgonagall", x: 800, y: 1430, facing: -1, acts: [{ t: lLeyenda - 0.3, pose: "talk", dur: 4 }, { t: lMonstruo, pose: "point" }, { t: lMonstruo, expr: "focus" }] },
        { who: "harry", x: 260, y: 1450, acts: [{ t: lCamara, expr: "surprise" }, { t: lMonstruo, expr: "focus" }] },
        { who: "ron", x: 80, y: 1450, acts: [{ t: lMonstruo, expr: "surprise" }, { t: lMonstruo, pose: "cower" }] },
        { who: "hermione", x: 450, y: 1440, acts: [{ t: lLeyenda, pose: "think" }, { t: lLeyenda, expr: "focus" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: lCamara, z: 1.0, y: 1000 },
        { t: lMonstruo, z: 1.1, x: 540, y: 700 },
      ],
      sfx: [
        { t: lCamara - 0.3, s: "chime", v: 0.4 },
        { t: lMonstruo, s: "hiss", v: 0.6 },
        { t: lMonstruo + 0.2, s: "rumble", v: 0.5 },
      ],
      trans: "slide",
    },

    duelo: {
      bg: GreatHall,
      under: ({ t }) => (
        <Svg>
          {t > uSerpiente - 0.1 ? <Snake x={kf(t, [uSerpiente, uHabla], [600, 560])} y={1380} s={1.6} t={t} flip={t > uHabla + 0.6} /> : null}
          {t > uSerpiente - 0.2 && t < uSerpiente + 0.8 ? <Sparkles x={560} y={1380} intensity={1.3} seed={3} count={18} color="#9cf29c" /> : null}
        </Svg>
      ),
      chars: [
        { who: "harry", x: 230, y: 1450, acts: [{ t: uSerpiente, expr: "surprise" }, { t: uHabla - 0.2, pose: "talk", dur: 2.5 }, { t: uHabla - 0.2, expr: "focus" }, { t: uParsel, expr: "surprise" }] },
        { who: "draco", x: 900, y: 1440, facing: -1, wand: true, acts: [{ t: uSerpiente - 0.5, pose: "wandAim", dur: 1.2 }, { t: uSerpiente - 0.4, glow: 1 }, { t: uSerpiente + 0.6, glow: 0 }, { t: uSerpiente, expr: "joy" }, { t: uParsel, expr: "surprise" }, { t: uParsel, pose: "cower" }] },
        { who: "ron", x: 60, y: 1450, acts: [{ t: uParsel, expr: "surprise" }, { t: uParsel, pose: "surprised" }] },
        { who: "hermione", x: 720, y: 1460, facing: -1, acts: [{ t: uParsel, expr: "surprise" }, { t: uParsel, pose: "surprised" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: uSerpiente, z: 1.3, x: 600, y: 1200 },
        { t: uHabla, z: 1.4, x: 360, y: 1100 },
        { t: uParsel, z: 1.0, x: 540, y: 1100 },
      ],
      sfx: [
        { t: uSerpiente - 0.4, s: "zap", v: 0.5 },
        { t: uSerpiente, s: "pop", v: 0.5 },
        { t: uSerpiente + 0.3, s: "hiss", v: 0.6 },
        { t: uHabla, s: "hiss", v: 0.5 },
        { t: uParsel, s: "rumble", v: 0.4 },
      ],
      overlay: ({ t }) => <Banner t={t} text="¡Habla pársel!" t0={uParsel} t1={uParsel + 2.2} color="#9cf29c" />,
      trans: "zoom",
    },

    sospecha: {
      bg: ({ t }) => <Corridor t={t} />,
      chars: [
        { who: "neville", x: 120, y: 1450, acts: [{ t: sMiedo - 0.3, expr: "surprise" }, { t: sMiedo - 0.3, pose: "cower" }] },
        { who: "ginny", x: 300, y: 1450, acts: [{ t: sMiedo, expr: "sadness" }, { t: sMiedo, pose: "think" }] },
        { who: "harry", x: 1300, y: 1460, facing: -1, acts: [{ t: 0.1, walk: 560 }, { t: sMiedo + 0.5, expr: "sadness" }, { t: sHeredero, pose: "sad" }] },
        { who: "draco", x: 880, y: 1440, facing: -1, acts: [{ t: sMiedo, pose: "point", dur: 3 }, { t: sMiedo, expr: "joy" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: sHeredero, z: 1.4, x: 560, y: 1000 },
      ],
      sfx: [{ t: sHeredero, s: "rumble", v: 0.3 }],
      trans: "wipe",
    },

    cierre: {
      bg: () => <Courtyard />,
      fx: ({ t }) => (
        <Svg>
          <Question t={t} x={540} y={780} t0={cQuien - 0.2} />
        </Svg>
      ),
      chars: [
        { who: "ron", x: 250, y: 1440, acts: [{ t: cQuien, expr: "focus" }, { t: cQuien, pose: "shrug", dur: 2 }] },
        { who: "harry", x: 540, y: 1450, acts: [{ t: 0, expr: "focus" }, { t: 0.5, pose: "think" }] },
        { who: "hermione", x: 830, y: 1440, facing: -1, acts: [{ t: cQuien, expr: "focus" }, { t: cQuien, pose: "think" }] },
      ],
      cam: [
        { t: 0, z: 1.1, y: 1100 },
        { t: 11, z: 1.0, y: 1150 },
      ],
      sfx: [{ t: cQuien, s: "chime", v: 0.4 }],
      trans: "fade",
    },
  },
};

export const p2dpart3Audio = audio;
