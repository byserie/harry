import React from "react";
import { AbsoluteFill } from "remotion";
import { PartSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles, Stickman } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { STAND, with_ } from "../lib/pose";
import { Svg } from "./bg1";
import { Chamber, Corridor, GreatHall, Hospital, NightCastle } from "./bg2";
import { ChessPiece, Confetti, Cup, Dog3, Flame, Harp, Hourglass, Key, Mirror, MiniStick, Stone, Trapdoor, Vines, Voldemort } from "./props";
import { Banner, Flash, switchAt, wordClock } from "./util";
import audioData from "../data/part5.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);

const hTrampilla = w("hook", "trampilla");
const hEnemigo = w("hook", "enemigo");
const hFinal = w("hook", "final");

const tDumbledore = w("trampilla", "dumbledore");
const tSnape = w("trampilla", "snape");
const tAdelantarse = w("trampilla", "adelantarse");
const tDuermen = w("trampilla", "duermen");
const tBajan = w("trampilla", "bajan");

const plCaen = w("planta", "caen");
const plLlama = w("planta", "llama");
const plSuelta = w("planta", "suelta");

const kLlaves = w("llaves", "llaves");
const kMonta = w("llaves", "monta");
const kCorrecta = w("llaves", "correcta");

const aAjedrez = w("ajedrez", "ajedrez");
const aSacrifica = w("ajedrez", "sacrifica");
const aHermione = w("ajedrez", "hermione");
const aSolo = w("ajedrez", "solo");

const qSnape = w("quirrell", "snape");
const qQuirrell = w("quirrell", "quirrell");
const qTraidor = w("quirrell", "traidor");
const qProtegido = w("quirrell", "protegido");

const vTurbante = w("voldemort", "turbante");
const vVoldemort = w("voldemort", "voldemort");
const vEspejo = w("voldemort", "espejo");
const vBolsillo = w("voldemort", "bolsillo");

const lAtrapar = w("lucha", "atraparlo");
const lQuema = w("lucha", "quema");
const lAmor = w("lucha", "amor");
const lDesmayarse = w("lucha", "desmayarse");

const cEnfermeria = w("copa", "enfermeria");
const cCena = w("copa", "cena");
const cPuntos = w("copa", "puntos");
const cGry = w("copa", "gryffindor");

const eHogwarts = w("cierre", "hogwarts");

const FireWalls: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    {[60, 1020].map((x, i) => (
      <g key={i}>
        {[0, 1, 2].map((k) => (
          <Flame key={k} x={x + (i ? -1 : 1) * k * 40} y={1300 - k * 300} s={1.1} t={t + k} color={i ? "#8a5aff" : "#ff8a1a"} />
        ))}
      </g>
    ))}
  </Svg>
);

const Board: React.FC<{ t: number }> = () => (
  <Svg>
    {Array.from({ length: 6 }).map((_, r) =>
      Array.from({ length: 8 }).map((__, c) => {
        const y0 = 1270 + r * r * 16 + r * 20;
        const y1 = 1270 + (r + 1) * (r + 1) * 16 + (r + 1) * 20;
        const w0 = 140 + r * 40;
        const w1 = 140 + (r + 1) * 40;
        const x0 = 540 + (c - 4) * w0;
        const x1 = 540 + (c - 4) * w1;
        return <path key={`${r}-${c}`} d={`M ${x0} ${y0} L ${x0 + w0} ${y0} L ${x1 + w1} ${y1} L ${x1} ${y1} Z`} fill={(r + c) % 2 ? "#2a2a33" : "#e8e4d8"} />;
      }),
    )}
  </Svg>
);

/** Recuerdo: Snape protegiendo a Harry en el partido. */
const SnapeMemory: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const k = kf(t, [t0 - 0.3, t0 + 0.2, t0 + 3.2, t0 + 3.6], [0, 1, 1, 0]);
  if (k <= 0) return null;
  return (
    <AbsoluteFill style={{ opacity: k }}>
      <div
        style={{
          position: "absolute",
          left: 560,
          top: 220,
          width: 440,
          height: 440,
          borderRadius: "50%",
          overflow: "hidden",
          border: "10px solid #1b1b2f",
          background: "linear-gradient(#7cc8ff,#cfeeff)",
          scale: String(0.8 + 0.2 * k),
          boxShadow: "0 0 0 10px #ffe66d",
        }}
      >
        <div style={{ position: "absolute", left: -320, top: -560, width: 1080, height: 1920, scale: "0.42", transformOrigin: "540px 960px" }}>
          <Stickman who="snape" x={540} y={1500} scale={2.4} facing={1} pose={with_(STAND, { rSh: 145, rEl: 15, headTilt: -10, headTurn: 0.6 })} expression="focus" wand wandGlow={1} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const part5: PartSpec = {
  part: 5,
  scenes: {
    hook: {
      bg: ({ t }) => <Chamber t={t} tint="#2a1525" light="#ff4d4d" />,
      under: ({ t }) => (
        <Svg>
          <Trapdoor x={540} y={1340} s={1.6} open={kf(t, [hTrampilla - 0.3, hTrampilla + 0.4], [0, 1])} />
        </Svg>
      ),
      fx: ({ t }) => <Svg>{t > hEnemigo - 0.4 ? <Voldemort x={540} y={640} s={1} t={t} k={kf(t, [hEnemigo - 0.4, hEnemigo + 0.4], [0, 0.85])} /> : null}</Svg>,
      chars: [
        { who: "ron", x: 130, y: 1450, wand: true, acts: [{ t: 0.2, glow: 0.4 }, { t: hEnemigo, expr: "surprise" }, { t: hEnemigo, pose: "cower" }] },
        { who: "harry", x: 340, y: 1460, wand: true, acts: [{ t: 0.2, glow: 0.4 }, { t: 0.2, pose: "wandAim" }, { t: hEnemigo, expr: "surprise" }, { t: hFinal, expr: "focus" }] },
        { who: "hermione", x: 900, y: 1450, facing: -1, wand: true, acts: [{ t: 0.2, glow: 0.4 }, { t: 0.2, pose: "wandUp" }, { t: hEnemigo, expr: "surprise" }] },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1050 },
        { t: hEnemigo, z: 1.1, y: 900 },
        { t: 11.5, z: 1.15, y: 950 },
      ],
      sfx: [
        { t: hTrampilla - 0.2, s: "knock", v: 0.4 },
        { t: hEnemigo - 0.3, s: "rumble", v: 0.6 },
        { t: hEnemigo, s: "roar", v: 0.3 },
      ],
    },

    trampilla: {
      bg: ({ t }) => <Corridor t={t} dark />,
      under: ({ t }) =>
        t > tAdelantarse - 0.5 ? (
          <Svg>
            <Trapdoor x={540} y={1330} s={1.3} open={kf(t, [tBajan - 0.5, tBajan], [0, 1])} />
            {t < tBajan - 0.4 ? <Dog3 x={540} y={1320} s={0.95} t={t} sleep={t > tDuermen + 0.4} /> : null}
            {t > tDuermen - 0.4 ? <Harp x={120} y={1250} s={1.2} t={t} /> : null}
          </Svg>
        ) : null,
      chars: [
        { who: "dumbledore", x: 600, y: 1430, acts: [{ t: tDumbledore - 0.2, walk: 1350 }] },
        {
          who: "harry",
          x: -200,
          y: 1470,
          acts: [
            { t: tSnape - 1.2, walk: 260 },
            { t: tSnape, pose: "think", dur: 2 },
            { t: tSnape, expr: "focus" },
            { t: tDuermen + 0.6, expr: "joy" },
            { t: tBajan - 0.3, move: { x: 520, y: 1330 }, dur: 0.4 },
            { t: tBajan + 0.1, alpha: 0, dur: 0.2 },
          ],
        },
        { who: "ron", x: -350, y: 1460, acts: [{ t: tSnape - 1.0, walk: 90 }, { t: tSnape + 0.3, expr: "surprise" }, { t: tBajan + 0.2, move: { x: 520, y: 1330 }, dur: 0.4 }, { t: tBajan + 0.6, alpha: 0, dur: 0.2 }] },
        { who: "hermione", x: 1300, y: 1450, acts: [{ t: tSnape - 0.6, walk: 860 }, { t: tSnape + 0.8, face: -1 }, { t: tSnape + 0.8, expr: "focus" }, { t: tBajan + 0.7, move: { x: 560, y: 1330 }, dur: 0.4 }, { t: tBajan + 1.1, alpha: 0, dur: 0.2 }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: tSnape, z: 1.15, x: 400, y: 1100 },
        { t: tDuermen, z: 1.0, x: 540, y: 1050 },
        { t: tBajan, z: 1.35, x: 540, y: 1250 },
      ],
      sfx: [
        { t: tDumbledore, s: "whoosh", v: 0.4 },
        { t: tAdelantarse - 0.5, s: "roar", v: 0.5 },
        { t: tDuermen, s: "chime", v: 0.5 },
        { t: tBajan - 0.3, s: "knock", v: 0.4 },
        { t: tBajan, s: "whoosh", v: 0.6 },
      ],
      trans: "fade",
    },

    planta: {
      bg: ({ t }) => <Chamber t={t} tint="#132a1a" light="#7bd389" />,
      fx: ({ t }) => (
        <Svg>
          <Vines t={t} grip={kf(t, [plCaen + 0.4, plCaen + 2], [0.2, 1])} burn={kf(t, [plLlama + 0.4, plSuelta + 0.4], [0, 1])} />
          {t > plLlama - 0.2 && t < plSuelta + 2 ? <Flame x={560} y={1150} s={kf(t, [plLlama - 0.2, plLlama + 0.3], [0.3, 1.4])} t={t} color="#6bd1ff" /> : null}
        </Svg>
      ),
      chars: [
        { who: "harry", x: 230, y: -300, acts: [{ t: plCaen - 0.3, move: { y: 1460 }, dur: 0.6 }, { t: plCaen + 0.4, pose: "cower" }, { t: plCaen + 0.4, expr: "surprise" }, { t: plSuelta, pose: "stand" }, { t: plSuelta, expr: "joy" }] },
        { who: "ron", x: 860, y: -300, acts: [{ t: plCaen - 0.1, move: { y: 1470 }, dur: 0.6 }, { t: plCaen + 0.6, pose: "cower" }, { t: plCaen + 0.6, expr: "surprise" }, { t: plSuelta, pose: "cheer" }, { t: plSuelta, expr: "joy" }] },
        {
          who: "hermione",
          x: 560,
          y: -300,
          wand: true,
          acts: [
            { t: plCaen + 0.1, move: { y: 1450 }, dur: 0.6 },
            { t: plCaen + 0.8, pose: "cower" },
            { t: plCaen + 0.8, expr: "surprise" },
            { t: plLlama - 0.5, pose: "wandUp" },
            { t: plLlama - 0.5, expr: "focus" },
            { t: plLlama - 0.3, glow: 1 },
            { t: plSuelta + 0.5, expr: "joy" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1050 },
        { t: plLlama, z: 1.25, x: 560, y: 1100 },
        { t: plSuelta + 0.5, z: 1.0, x: 540, y: 1100 },
      ],
      sfx: [
        { t: plCaen, s: "whoosh", v: 0.5 },
        { t: plCaen + 0.5, s: "boom", v: 0.4 },
        { t: plLlama - 0.2, s: "fire", v: 0.8 },
        { t: plSuelta, s: "sparkle", v: 0.4 },
      ],
      shake: [[plCaen + 0.5, 0.5]],
      trans: "circle",
    },

    llaves: {
      bg: ({ t }) => <Chamber t={t} tint="#2a2410" light="#ffd23a" />,
      under: () => (
        <Svg>
          <path d="M 440 1270 L 440 900 Q 540 820 640 900 L 640 1270 Z" fill="#5a3a22" stroke={INK} strokeWidth={8} />
          <circle cx={600} cy={1090} r={14} fill="#d9a441" stroke={INK} strokeWidth={4} />
        </Svg>
      ),
      fx: ({ t }) => (
        <Svg>
          {Array.from({ length: 16 }).map((_, i) => (
            <Key key={i} x={540 + Math.cos(t * (0.8 + (i % 5) * 0.15) + i) * (240 + (i % 4) * 80)} y={420 + Math.sin(t * (1.1 + (i % 3) * 0.2) + i * 2) * (90 + (i % 3) * 40)} s={1} t={t} r={Math.sin(t * 3 + i) * 30} />
          ))}
          {t < kCorrecta + 0.6 ? (
            <g>
              <circle cx={kf(t, [0, kCorrecta + 0.6], [300, 830])} cy={kf(t, [0, kCorrecta + 0.6], [420, 640])} r={50} fill="#fff" opacity={0.3 + 0.2 * Math.sin(t * 10)} />
              <Key x={kf(t, [0, kCorrecta + 0.6], [300, 830])} y={kf(t, [0, kCorrecta + 0.6], [420, 640])} s={1.3} t={t} broken />
            </g>
          ) : null}
        </Svg>
      ),
      chars: [
        { who: "ron", x: 160, y: 1450, acts: [{ t: kLlaves, pose: "pointUp", dur: 2.5 }, { t: kLlaves, expr: "surprise" }, { t: kCorrecta + 0.7, pose: "cheer" }, { t: kCorrecta + 0.7, expr: "joy" }] },
        { who: "hermione", x: 360, y: 1450, acts: [{ t: kLlaves + 0.4, pose: "think", dur: 2.5 }, { t: kCorrecta + 0.7, pose: "cheer" }, { t: kCorrecta + 0.7, expr: "joy" }] },
        {
          who: "harry",
          x: 820,
          y: 1420,
          broom: true,
          facing: -1,
          acts: [
            { t: kMonta, move: { x: 700, y: 900 }, dur: 0.8 },
            { t: kMonta, expr: "focus" },
            { t: kMonta + 0.8, face: 1 },
            { t: kCorrecta - 0.6, move: { x: 560, y: 1120 }, dur: 0.7 },
            { t: kCorrecta + 0.6, expr: "joy" },
          ],
          holding: (t) => (t > kCorrecta + 0.6 ? <Key x={10} y={0} s={0.6} t={t} broken /> : null),
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1000 },
        { t: kMonta, z: 0.95, x: 540, y: 900 },
        { t: kCorrecta, z: 1.3, x: 760, y: 750 },
        { t: 10.9, z: 1.05, x: 540, y: 1000 },
      ],
      sfx: [
        { t: 0.2, s: "flutter", v: 0.5 },
        { t: kLlaves, s: "flutter", v: 0.5 },
        { t: kMonta, s: "whoosh", v: 0.6 },
        { t: kCorrecta + 0.6, s: "chime", v: 0.6 },
      ],
      trans: "wipe",
    },

    ajedrez: {
      bg: ({ t }) => <Chamber t={t} tint="#1f1f2a" light="#c0c8ff" />,
      under: ({ t }) => (
        <Svg>
          <Board t={t} />
          <ChessPiece x={130} y={1310} s={0.9} kind="torre" dark />
          <ChessPiece x={950} y={1310} s={0.9} kind="rey" dark />
          <ChessPiece x={kf(t, [aSacrifica - 0.6, aSacrifica + 0.1], [760, 640])} y={1330} s={1.1} kind="reina" dark r={kf(t, [aSacrifica - 0.6, aSacrifica - 0.2, aSacrifica + 0.1], [0, -12, 0])} />
        </Svg>
      ),
      chars: [
        { who: "harry", x: 220, y: 1500, s: 1.7, acts: [{ t: aAjedrez, expr: "surprise" }, { t: aSacrifica + 0.4, expr: "sadness" }, { t: aSolo - 0.6, expr: "focus" }, { t: aSolo - 0.4, walk: 1300 }] },
        {
          who: "ron",
          x: 480,
          y: 1460,
          s: 1.7,
          acts: [
            { t: aAjedrez + 0.4, pose: "point", dur: 1.8 },
            { t: aAjedrez + 0.4, expr: "focus" },
            { t: aSacrifica - 0.4, expr: "joy" },
            { t: aSacrifica + 0.1, rot: -88, dur: 0.4 },
            { t: aSacrifica + 0.1, expr: "sleep" },
            { t: aSacrifica + 0.1, move: { x: 420, y: 1500 }, dur: 0.4 },
          ],
        },
        { who: "hermione", x: 860, y: 1490, s: 1.7, facing: -1, acts: [{ t: aSacrifica + 0.3, expr: "sadness" }, { t: aHermione - 0.3, walk: 640, run: true }, { t: aHermione + 0.5, pose: "cower" }] },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1050 },
        { t: aSacrifica - 0.5, z: 1.25, x: 560, y: 1150 },
        { t: aSolo - 0.5, z: 1.05, x: 600, y: 1100 },
      ],
      sfx: [
        { t: aAjedrez, s: "rumble", v: 0.4 },
        { t: aSacrifica - 0.5, s: "step", v: 0.7 },
        { t: aSacrifica + 0.1, s: "boom", v: 0.8 },
      ],
      shake: [[aSacrifica + 0.1, 0.8, 0.5]],
      trans: "slide",
    },

    quirrell: {
      bg: ({ t }) => <Chamber t={t} tint="#2a1838" light="#ff8a1a" />,
      under: ({ t }) => (
        <>
          <FireWalls t={t} />
          <Svg>
            <Mirror x={860} y={1290} s={0.8} t={t} glow={0.5} />
          </Svg>
        </>
      ),
      chars: [
        { who: "harry", x: -200, y: 1460, acts: [{ t: 0.2, walk: 280 }, { t: qSnape - 0.2, expr: "surprise" }, { t: qQuirrell - 0.2, pose: "surprised", dur: 2 }, { t: qTraidor + 0.3, expr: "anger" }, { t: qProtegido, expr: "sadness" }] },
        {
          who: "quirrell",
          x: 680,
          y: 1450,
          facing: -1,
          wand: true,
          acts: [{ t: qQuirrell - 0.3, expr: "joy" }, { t: qQuirrell - 0.3, pose: "wave", dur: 0.9 }, { t: qTraidor - 0.3, expr: "anger" }, { t: qTraidor - 0.3, pose: "wandAim" }, { t: qTraidor - 0.1, glow: 0.7 }],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1100 },
        { t: qQuirrell - 0.3, z: 1.5, x: 680, y: 950 },
        { t: qTraidor + 0.4, z: 1.1, x: 500, y: 1100 },
      ],
      sfx: [
        { t: 0.2, s: "fire", v: 0.5 },
        { t: qQuirrell - 0.3, s: "boom", v: 0.5 },
        { t: qTraidor, s: "zap", v: 0.4 },
        { t: qProtegido - 0.6, s: "chime", v: 0.4 },
      ],
      shake: [[qQuirrell - 0.3, 0.4]],
      overlay: ({ t }) => <SnapeMemory t={t} t0={qProtegido - 1.2} />,
      trans: "circle",
    },

    voldemort: {
      bg: ({ t }) => <Chamber t={t} tint="#2a1838" light="#ff3b3b" />,
      under: ({ t }) => (
        <>
          <FireWalls t={t} />
          <Svg>
            <Mirror x={860} y={1290} s={0.8} t={t} glow={t > vEspejo ? 1 : 0.4}>
              {t > vEspejo - 0.3 ? (
                <g opacity={kf(t, [vEspejo - 0.3, vEspejo + 0.2], [0, 1])}>
                  <MiniStick x={0} y={-20} s={1.1} color="#2f6fe4" head="#e3eeff" hair="#1e1e28" glasses arms="up" />
                  <Stone x={60} y={-430} s={0.8} glow={1} />
                </g>
              ) : null}
            </Mirror>
          </Svg>
        </>
      ),
      fx: ({ t }) => (
        <Svg>
          {t > vTurbante + 0.2 ? <Voldemort x={560} y={720} s={kf(t, [vTurbante + 0.2, vVoldemort + 0.3], [0.2, 0.75])} t={t} k={kf(t, [vTurbante + 0.2, vVoldemort], [0, 1])} /> : null}
          {t > vBolsillo - 0.3 ? (
            <g>
              <Stone x={300} y={1180} s={kf(t, [vBolsillo - 0.3, vBolsillo + 0.2], [0.3, 1.1])} glow={1} />
              <Sparkles x={300} y={1180} intensity={kf(t, [vBolsillo - 0.3, vBolsillo + 0.2, vBolsillo + 3], [0, 1.2, 0.5])} seed={31} count={18} color="#ff9a9a" />
            </g>
          ) : null}
        </Svg>
      ),
      chars: [
        { who: "harry", x: 260, y: 1460, acts: [{ t: 0, expr: "anger" }, { t: vVoldemort - 0.2, expr: "surprise" }, { t: vVoldemort - 0.2, pose: "cower", dur: 2.4 }, { t: vEspejo, expr: "focus" }, { t: vEspejo, look: 0.9 }, { t: vBolsillo - 0.2, expr: "surprise" }, { t: vBolsillo, pose: "hold" }] },
        { who: "quirrell", x: 600, y: 1450, facing: -1, acts: [{ t: vTurbante - 0.6, pose: "think", dur: 0.6 }, { t: vTurbante, show: false }] },
        { who: "quirrell2", x: 600, y: 1450, facing: 1, show: false, acts: [{ t: vTurbante, show: true }, { t: vTurbante, look: 0.9 }, { t: vEspejo, pose: "point" }] },
      ],
      cam: [
        { t: 0, z: 1.15, x: 520, y: 1050 },
        { t: vVoldemort, z: 1.25, x: 560, y: 850 },
        { t: vEspejo, z: 1.0, x: 600, y: 1050 },
        { t: vBolsillo, z: 1.35, x: 330, y: 1050 },
      ],
      sfx: [
        { t: vTurbante, s: "whoosh", v: 0.5 },
        { t: vVoldemort - 0.3, s: "rumble", v: 0.8 },
        { t: vVoldemort, s: "roar", v: 0.4 },
        { t: vBolsillo - 0.2, s: "sparkle", v: 0.6 },
        { t: vBolsillo, s: "chime", v: 0.5 },
      ],
      shake: [[vVoldemort, 0.6, 1]],
      overlay: ({ t }) => <Flash t={t} at={vVoldemort - 0.2} dur={0.4} color="#ff2b2b" />,
      trans: "fade",
    },

    lucha: {
      bg: ({ t }) => <Chamber t={t} tint="#2a1838" light="#ffd23a" />,
      under: ({ t }) => <FireWalls t={t} />,
      fx: ({ t }) => (
        <Svg>
          {t > lAmor - 0.4 ? <circle cx={330} cy={1080} r={kf(t, [lAmor - 0.4, lAmor + 0.4], [100, 360])} fill="#ffe36e" opacity={kf(t, [lAmor - 0.4, lAmor + 0.3, lDesmayarse - 0.5, lDesmayarse], [0, 0.35, 0.25, 0])} /> : null}
          {t > lAmor - 0.4 && t < lDesmayarse ? <Sparkles x={330} y={1000} intensity={1.4} seed={41} count={24} /> : null}
          {t > lQuema - 0.2 && t < lQuema + 2.2 ? <Flame x={560} y={1130} s={0.6} t={t} /> : null}
        </Svg>
      ),
      chars: [
        {
          who: "harry",
          x: 300,
          y: 1460,
          acts: [
            { t: 0, expr: "focus" },
            { t: lAtrapar, expr: "surprise" },
            { t: lAtrapar, pose: "cower", dur: 1.2 },
            { t: lAmor - 0.2, expr: "focus" },
            { t: lAmor - 0.2, pose: "armsUp" },
            { t: lDesmayarse - 0.2, rot: -88, dur: 0.6 },
            { t: lDesmayarse - 0.2, expr: "sleep" },
          ],
        },
        {
          who: "quirrell2",
          x: 820,
          y: 1450,
          facing: -1,
          acts: [
            { t: 0, expr: "anger" },
            { t: lAtrapar - 0.6, walk: 480, run: true },
            { t: lAtrapar + 0.4, pose: "hold", dur: 0.6 },
            { t: lQuema - 0.2, expr: "sadness" },
            { t: lQuema - 0.2, pose: "cower" },
            { t: lQuema + 0.2, move: { x: 760 }, dur: 0.6 },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1100 },
        { t: lQuema, z: 1.3, x: 450, y: 1050 },
        { t: lAmor, z: 1.15, x: 380, y: 1050 },
        { t: lDesmayarse + 0.5, z: 1.5, x: 330, y: 1250 },
      ],
      sfx: [
        { t: lAtrapar - 0.6, s: "whoosh", v: 0.5 },
        { t: lQuema - 0.2, s: "fire", v: 0.8 },
        { t: lAmor - 0.3, s: "sparkle", v: 0.7 },
        { t: lAmor, s: "chime", v: 0.5 },
        { t: lDesmayarse, s: "boom", v: 0.4 },
      ],
      shake: [[lQuema - 0.2, 0.5]],
      overlay: ({ t }) => {
        const k = kf(t, [lDesmayarse + 0.3, lDesmayarse + 1.4], [0, 1]);
        return k > 0 ? <AbsoluteFill style={{ backgroundColor: "#fff", opacity: k }} /> : null;
      },
      trans: "zoom",
    },

    copa: {
      bg: switchAt(cCena - 0.3, Hospital, ({ t }) => <GreatHall t={t} deco="copa" />),
      fx: ({ t }) =>
        t > cCena - 0.3 ? (
          <Svg>
            {(
              [
                ["#c8302f", 0.35, 0.95],
                ["#2f8f4a", 0.9, 0.7],
                ["#2f6fe4", 0.6, 0.6],
                ["#f2c230", 0.5, 0.5],
              ] as [string, number, number][]
            ).map(([c, a, b], i) => t > cGry - 0.2 ? null : (
              <Hourglass key={i} x={210 + i * 220} y={640} s={0.85} color={c} fill={i === 0 ? kf(t, [cPuntos, cGry], [a, b]) : i === 1 ? kf(t, [cPuntos, cGry], [a, 0.8]) : a} />
            ))}
            {t > cGry - 0.3 ? <Cup x={540} y={kf(t, [cGry - 0.3, cGry + 0.4], [800, 640])} s={kf(t, [cGry - 0.3, cGry + 0.4], [0.3, 1.2])} glow={1} /> : null}
            <Confetti t={t} t0={cGry} n={110} />
          </Svg>
        ) : null,
      chars: [
        { who: "harry", x: 540, y: 1270, s: 1.6, acts: [{ t: 0, rot: -90, dur: 0.001 }, { t: 0, expr: "sleep" }, { t: 1.0, expr: "joy" }, { t: cCena - 0.3, show: false }] },
        { who: "dumbledore", x: 880, y: 1440, s: 1.7, facing: -1, acts: [{ t: cEnfermeria, pose: "talk" }, { t: cEnfermeria, expr: "joy" }, { t: cCena - 0.3, show: false }] },
        { who: "neville", x: 90, y: 1470, show: false, acts: [{ t: cCena - 0.3, show: true }, { t: cGry, pose: "cheer" }, { t: cGry, expr: "joy" }] },
        { who: "ron", x: 330, y: 1470, show: false, acts: [{ t: cCena - 0.3, show: true }, { t: cGry, pose: "cheer" }, { t: cGry, expr: "joy" }] },
        { who: "harry", x: 560, y: 1480, show: false, acts: [{ t: cCena - 0.3, show: true }, { t: cPuntos, expr: "surprise" }, { t: cGry, pose: "cheer" }, { t: cGry, expr: "joy" }] },
        { who: "hermione", x: 790, y: 1470, show: false, facing: -1, acts: [{ t: cCena - 0.3, show: true }, { t: cGry, pose: "cheer" }, { t: cGry, expr: "joy" }] },
      ],
      cam: [
        { t: 0, z: 1.15, x: 640, y: 1150 },
        { t: cCena - 0.35, z: 1.2, x: 640, y: 1150 },
        { t: cCena - 0.3, z: 1.0, x: 540, y: 1050 },
        { t: cGry, z: 0.95, x: 540, y: 1000 },
      ],
      sfx: [
        { t: cPuntos, s: "coins", v: 0.5 },
        { t: cGry - 0.2, s: "fanfare", v: 0.7 },
        { t: cGry + 0.1, s: "cheer", v: 0.8 },
      ],
      shake: [[cGry, 0.4]],
      overlay: ({ t }) => (
        <>
          <Flash t={t} at={cCena - 0.3} dur={0.3} />
          <Flash t={t} at={cGry} dur={0.3} color="#ffe36e" />
        </>
      ),
      trans: "fade",
    },

    cierre: {
      bg: NightCastle,
      fx: ({ t }) => <Svg>{t > eHogwarts - 0.3 && t < 5 ? <Sparkles x={540} y={500} intensity={1.2} seed={51} count={22} /> : null}</Svg>,
      chars: [
        { who: "ron", x: 230, y: 1440, acts: [{ t: 0, expr: "joy" }, { t: 0.4, pose: "wave", dur: 3 }] },
        { who: "harry", x: 540, y: 1450, acts: [{ t: 0, expr: "joy" }, { t: 0.2, pose: "wave", dur: 3 }] },
        { who: "hermione", x: 850, y: 1440, facing: -1, acts: [{ t: 0, expr: "joy" }, { t: 0.6, pose: "wave", dur: 3 }] },
        { who: "hagrid", x: 1000, y: 1470, s: 1.4, facing: -1, acts: [{ t: 0, expr: "joy" }] },
      ],
      cam: [
        { t: 0, z: 1.1, y: 1100 },
        { t: 8.8, z: 1.0, y: 1150 },
      ],
      sfx: [{ t: eHogwarts, s: "chime", v: 0.5 }],
      trans: "circle",
    },
  },
};

export const part5Audio = audio;
export { Banner };
