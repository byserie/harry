import { PartSpec, SceneSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { NightStreet, Svg } from "../scenes/bg1";
import { Corridor, Forest, GreatHall, NightCastle } from "../scenes/bg2";
import { Confetti, Snitch, Spell, Voldemort } from "../scenes/props";
import { Burrow, Sword } from "../peli2/assets";
import { Dementor, MoonNight } from "../peli3/assets";
import { Atrium } from "../peli5/assets";
import { Locket } from "../peli6/assets";
import { Basilisk } from "../peli2/assets";
import { Banner, Flash, switchAt, wordClock } from "../scenes/util";
import { Beach, Deluminator, Doe, ElderWand, Grave, HallowsSymbol, IceCrack, Knife, Manor, Radio, SnowForest, TalesBook, Tent, TombNight } from "./assets";
import audioData from "../data/p7full.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);
const D = (id: string) => (audio.scenes.find((s) => s.id === id)?.dur ?? 300) / 30;

const h = { dumbledore: w("hook", "dumbledore"), ministerio: w("hook", "ministerio"), horrocrux: w("hook", "horrocruxes"), refugio: w("hook", "refugio") };
const si = { pocion: w("siete", "pocion"), siete: w("siete", "siete"), volando: w("siete", "volando"), persecucion: w("siete", "persecucion"), hedwig: w("siete", "hedwig") };
const te = { testamento: w("testamento", "testamento"), desiluminador: w("testamento", "desiluminador"), cuentos: w("testamento", "cuentos"), snitch: w("testamento", "snitch") };
const bo = { boda: w("boda", "boda"), patronus: w("boda", "patronus"), cayo: w("boda", "cayo"), desaparecen: w("boda", "desaparecen") };
const di = { snape: w("director", "snape"), enemigo: w("director", "enemigo") };
const mi = { umbridge: w("ministerio", "umbridge"), disfrazan: w("ministerio", "disfrazan"), ministerio: w("ministerio", "ministerio"), roban: w("ministerio", "roban"), escapan: w("ministerio", "escapan") };
const ca = { carpa: w("carpa", "carpa"), radio: w("carpa", "radio"), enojados: w("carpa", "enojados") };
const pe = { explota: w("pelea", "explota"), llora: w("pelea", "llora") };
const go = { tumba: w("godric", "tumba"), viejita: w("godric", "viejita"), nagini: w("godric", "nagini"), varita: w("godric", "varita") };
const ci = { cierva: w("cierva", "cierva"), espada: w("cierva", "espada"), agua: w("cierva", "agua"), ahorca: w("cierva", "ahorca"), ron: w("cierva", "ron"), destruye: w("cierva", "destruye") };
const re = { cuento: w("reliquias", "cuento"), varita: w("reliquias", "varita"), piedra: w("reliquias", "piedra"), capa: w("reliquias", "capa"), reliquias: w("reliquias", "reliquias") };
const ma = { tabu: w("mansion", "tabu"), cazadores: w("mansion", "cazadores"), mansion: w("mansion", "mansion"), bellatrix: w("mansion", "bellatrix"), dobby: w("mansion", "dobby") };
const do_ = { cuchillo: w("dobby", "cuchillo"), playa: w("dobby", "playa"), brazos: w("dobby", "brazos"), entierra: w("dobby", "entierra"), lapida: w("dobby", "lapida") };
const fi = { tumba: w("final", "tumba"), sauco: w("final", "sauco"), rayo: w("final", "rayo") };

const harrys = (t: number, k: number) =>
  ["harry", "harry", "harry", "harry", "harry", "harry", "harry"].map((who, i) => ({
    who: who as "harry",
    x: 80 + i * 150,
    y: 1450,
    s: 1.4,
    name: false,
    acts: [{ t: 0, expr: "surprise" as const }],
  }));
void harrys;

const scenes: Record<string, SceneSpec> = {
  hook: {
    bg: ({ t }) => <MoonNight t={t} />,
    fx: ({ t }) => (
      <Svg>
        {t > h.ministerio - 0.3 && t < h.horrocrux ? <g transform="translate(540 560) scale(0.8)"><Voldemort x={0} y={0} s={1} t={t} k={kf(t, [h.ministerio - 0.3, h.ministerio + 0.3], [0, 0.9])} /></g> : null}
        {t > h.horrocrux - 0.3 ? <Locket x={540} y={kf(t, [h.horrocrux - 0.3, h.horrocrux + 0.4], [900, 640])} s={1.5} glow={1} /> : null}
      </Svg>
    ),
    chars: [
      { who: "ron", x: 260, y: 1440, acts: [{ t: h.refugio, expr: "focus" }] },
      { who: "harry", x: 540, y: 1450, acts: [{ t: h.dumbledore, expr: "sadness" }, { t: h.horrocrux, expr: "focus" }] },
      { who: "hermione", x: 820, y: 1440, facing: -1, acts: [{ t: h.refugio, expr: "focus" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: D("hook"), z: 1.1, y: 1050 }],
    sfx: [{ t: h.ministerio, s: "rumble", v: 0.6 }, { t: h.horrocrux, s: "chime", v: 0.4 }],
  },

  siete: {
    bg: switchAt(si.volando - 0.3, ({ t }) => <NightStreet t={t} lights={0.6} />, ({ t }) => <MoonNight t={t} />),
    fx: ({ t }) => (
      <Svg>
        {t > si.persecucion - 0.5 ? [0, 1, 2].map((i) => <g key={i} opacity={kf(t, [si.persecucion - 0.5, si.persecucion], [0, 1])}><Dementor x={kf(t, [si.persecucion - 0.5, D("siete")], [-200 - i * 200, 1300 - i * 200])} y={600 + i * 200} s={0.5} t={t} seed={i} /></g>) : null}
        <Spell t={t} t0={si.persecucion + 0.4} x0={200} y0={700} x1={700} y1={900} color="#3fdc6b" />
        {t > si.hedwig - 0.3 ? <g opacity={kf(t, [si.hedwig - 0.3, si.hedwig + 1.5], [1, 0])}><circle cx={540} cy={600} r={60} fill="#ffffff" /><Sparkles x={540} y={600} intensity={1} seed={2} count={12} color="#ffffff" /></g> : null}
      </Svg>
    ),
    chars: [
      ...[0, 1, 2, 3, 4, 5, 6].map((i) => ({
        who: "harry" as const,
        x: 90 + i * 150,
        y: 1450,
        s: 1.35,
        name: i === 3,
        show: false,
        acts: [{ t: si.siete - 0.3, show: true }, { t: si.siete - 0.3, expr: "surprise" as const }, { t: si.volando - 0.3, show: false }],
      })),
      { who: "harry", x: -300, y: 1100, broom: true, show: false, acts: [{ t: si.volando - 0.3, show: true }, { t: si.volando - 0.3, move: { x: 600, y: 1000 }, dur: 1.5 }, { t: si.persecucion, expr: "focus" }, { t: si.hedwig, expr: "sadness" }] },
      { who: "hagrid", x: -500, y: 1250, s: 1.3, broom: true, show: false, acts: [{ t: si.volando - 0.3, show: true }, { t: si.volando - 0.3, move: { x: 300, y: 1150 }, dur: 1.5 }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: si.siete, z: 1.0, y: 1100 }, { t: si.volando, z: 1.0, y: 1000 }],
    sfx: [{ t: si.pocion, s: "pop", v: 0.5 }, { t: si.siete - 0.3, s: "sparkle", v: 0.6 }, { t: si.volando, s: "whoosh", v: 0.7 }, { t: si.persecucion + 0.4, s: "zap", v: 0.6 }, { t: si.hedwig, s: "boom", v: 0.4 }],
    overlay: ({ t }) => <Flash t={t} at={si.siete - 0.3} dur={0.3} color="#9ccf5a" />,
  },

  testamento: {
    bg: Burrow,
    fx: ({ t }) => (
      <Svg>
        {t > te.desiluminador - 0.3 && t < te.cuentos ? <Deluminator x={540} y={800} s={1.6} t={t} k={1} /> : null}
        {t > te.cuentos - 0.3 && t < te.snitch ? <TalesBook x={540} y={760} s={1.6} /> : null}
        {t > te.snitch - 0.3 ? <Snitch x={540} y={700} s={2} t={t} /> : null}
      </Svg>
    ),
    chars: [
      { who: "ron", x: 140, y: 1440, acts: [{ t: te.desiluminador, expr: "surprise" }] },
      { who: "hermione", x: 330, y: 1440, acts: [{ t: te.cuentos, expr: "surprise" }] },
      { who: "harry", x: 520, y: 1450, acts: [{ t: te.snitch, expr: "surprise" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: te.desiluminador, z: 1.0, y: 950 }],
    sfx: [{ t: te.desiluminador, s: "pop", v: 0.5 }, { t: te.cuentos, s: "paper", v: 0.5 }, { t: te.snitch, s: "flutter", v: 0.5 }],
  },

  boda: {
    bg: GreatHall,
    fx: ({ t }) => (
      <Svg>
        {t < bo.patronus ? <Confetti t={t} t0={0.2} n={60} colors={["#ffffff", "#ffd6f5", "#ffe14d"]} /> : null}
        {t > bo.patronus - 0.3 && t < bo.desaparecen ? <g opacity={kf(t, [bo.patronus - 0.3, bo.patronus + 0.3], [0, 1])}><circle cx={540} cy={700} r={140} fill="#e8f7ff" opacity={0.5} /><Sparkles x={540} y={700} intensity={1.2} seed={3} count={18} color="#e8f7ff" /></g> : null}
      </Svg>
    ),
    chars: [
      { who: "bill", x: 440, y: 1440, acts: [{ t: 0, expr: "joy" }, { t: bo.cayo, expr: "surprise" }] },
      { who: "fleur", x: 640, y: 1440, facing: -1, acts: [{ t: 0, expr: "joy" }, { t: bo.cayo, expr: "surprise" }] },
      { who: "harry", x: 160, y: 1450, acts: [{ t: 0.5, pose: "cheer", dur: 2 }, { t: 0, expr: "joy" }, { t: bo.cayo, expr: "surprise" }, { t: bo.desaparecen, alpha: 0, dur: 0.3 }] },
      { who: "hermione", x: 860, y: 1440, facing: -1, acts: [{ t: 0, expr: "joy" }, { t: bo.cayo, expr: "focus" }, { t: bo.desaparecen - 0.4, walk: 300, run: true }, { t: bo.desaparecen, alpha: 0, dur: 0.3 }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: bo.patronus, z: 1.0, y: 950 }, { t: bo.desaparecen, z: 1.2, x: 300, y: 1100 }],
    sfx: [{ t: 0.3, s: "cheer", v: 0.5 }, { t: bo.patronus, s: "sparkle", v: 0.6 }, { t: bo.cayo, s: "rumble", v: 0.6 }, { t: bo.desaparecen, s: "pop", v: 0.7 }],
    overlay: ({ t }) => <Flash t={t} at={bo.desaparecen} dur={0.3} />,
  },

  director: {
    bg: Corridor,
    chars: [
      { who: "snape", x: 540, y: 1440, acts: [{ t: di.snape, expr: "focus" }, { t: di.snape, pose: "crossed" }] },
      { who: "draco", x: 260, y: 1440, acts: [{ t: 0, expr: "sadness" }] },
      { who: "neville", x: 820, y: 1450, facing: -1, acts: [{ t: di.snape, expr: "anger" }] },
    ],
    fx: ({ t }) => <Svg>{t > di.enemigo - 0.3 ? <g transform={`translate(540 ${kf(t, [di.enemigo - 0.3, di.enemigo + 0.3], [-300, 480])}) rotate(-4)`}><rect x={-220} y={-200} width={440} height={400} fill="#f2e2b8" stroke={INK} strokeWidth={6} /><text x={0} y={-130} textAnchor="middle" fontSize={44} fontFamily="Fredoka" fontWeight={700} fill="#8a1a1a">ENEMIGO Nº 1</text><circle cx={0} cy={10} r={70} fill="#e3eeff" stroke={INK} strokeWidth={5} /><text x={0} y={150} textAnchor="middle" fontSize={44} fontFamily="Fredoka" fontWeight={700} fill={INK}>HARRY POTTER</text></g> : null}</Svg>,
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: di.snape, z: 1.35, x: 540, y: 1050 }, { t: di.enemigo, z: 1.0, y: 950 }],
    sfx: [{ t: di.snape, s: "rumble", v: 0.5 }, { t: di.enemigo, s: "paper", v: 0.6 }],
  },

  ministerio: {
    bg: Atrium,
    fx: ({ t }) => <Svg>{t > mi.roban - 0.3 ? <Locket x={kf(t, [mi.roban - 0.3, mi.roban + 0.5], [760, 420])} y={kf(t, [mi.roban - 0.3, mi.roban + 0.5], [1000, 1050])} s={0.7} glow={1} /> : null}</Svg>,
    chars: [
      { who: "umbridge", x: 760, y: 1440, facing: -1, acts: [{ t: mi.umbridge, expr: "joy" }, { t: mi.roban + 0.4, expr: "surprise" }] },
      { who: "harry", x: 300, y: 1450, acts: [{ t: mi.disfrazan - 0.2, alpha: 0.7, dur: 0.3 }, { t: mi.roban - 0.4, walk: 560 }, { t: mi.roban + 0.3, expr: "joy" }, { t: mi.escapan - 0.2, walk: -300, run: true }] },
      { who: "hermione", x: 120, y: 1440, acts: [{ t: mi.disfrazan - 0.2, alpha: 0.7, dur: 0.3 }, { t: mi.escapan - 0.2, walk: -400, run: true }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: mi.roban, z: 1.3, x: 640, y: 1050 }, { t: mi.escapan, z: 1.0, y: 1100 }],
    sfx: [{ t: mi.disfrazan, s: "pop", v: 0.5 }, { t: mi.roban, s: "whoosh", v: 0.5 }, { t: mi.escapan, s: "pop", v: 0.6 }],
    overlay: ({ t }) => <Flash t={t} at={mi.disfrazan} dur={0.3} color="#9ccf5a" />,
  },

  carpa: {
    bg: Forest,
    under: ({ t }) => <Svg><Tent x={760} y={1300} s={1.2} /><Radio x={420} y={1300} s={1.2} t={t} /></Svg>,
    chars: [
      { who: "ron", x: 200, y: 1440, holding: (t) => (t > ca.enojados - 1 ? <Locket x={0} y={0} s={0.35} /> : null), acts: [{ t: ca.radio, pose: "think", dur: 2 }, { t: ca.enojados, expr: "anger" }] },
      { who: "harry", x: 560, y: 1450, acts: [{ t: ca.carpa, expr: "focus" }, { t: ca.enojados, expr: "sadness" }] },
      { who: "hermione", x: 940, y: 1440, facing: -1, acts: [{ t: ca.carpa, expr: "focus" }, { t: ca.enojados, expr: "sadness" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ca.radio, z: 1.2, x: 420, y: 1150 }, { t: ca.enojados, z: 1.3, x: 260, y: 1050 }],
    sfx: [{ t: ca.radio, s: "zap", v: 0.2 }, { t: ca.enojados, s: "rumble", v: 0.4 }],
  },

  pelea: {
    bg: Forest,
    under: () => <Svg><Tent x={760} y={1300} s={1.2} /></Svg>,
    chars: [
      { who: "ron", x: 300, y: 1440, acts: [{ t: pe.explota, expr: "anger" }, { t: pe.explota, pose: "angry", dur: 2 }, { t: pe.explota + 2.2, walk: -300 }] },
      { who: "harry", x: 600, y: 1450, facing: -1, acts: [{ t: pe.explota, expr: "anger" }, { t: pe.explota + 0.4, pose: "angry", dur: 1.6 }, { t: pe.llora, expr: "sadness" }] },
      { who: "hermione", x: 900, y: 1440, facing: -1, acts: [{ t: pe.explota, expr: "surprise" }, { t: pe.llora, expr: "sadness" }, { t: pe.llora, pose: "sad" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: pe.explota, z: 1.3, x: 440, y: 1050 }, { t: pe.llora, z: 1.4, x: 860, y: 1050 }],
    sfx: [{ t: pe.explota, s: "boom", v: 0.5 }],
  },

  godric: {
    bg: switchAt(go.nagini - 0.3, ({ t }) => <SnowForest t={t} />, ({ t }) => <Corridor t={t} dark />),
    under: ({ t }) => <Svg>{t < go.nagini - 0.3 ? <><Grave x={420} y={1300} s={1.3} text="James y Lily" /></> : null}</Svg>,
    fx: ({ t }) => <Svg>{t > go.nagini - 0.3 ? <Basilisk x={kf(t, [go.nagini - 0.3, go.nagini + 0.6], [1400, 900])} y={1000} s={0.75} t={t} flip open={0.8} /> : null}{t > go.varita - 0.2 ? <g transform="translate(400 1350)"><line x1={-60} y1={0} x2={0} y2={-6} stroke="#6b3f1d" strokeWidth={8} /><line x1={10} y1={-4} x2={70} y2={6} stroke="#6b3f1d" strokeWidth={8} /></g> : null}</Svg>,
    chars: [
      { who: "harry", x: 280, y: 1450, acts: [{ t: go.tumba, expr: "sadness" }, { t: go.tumba, pose: "sad", dur: 2 }, { t: go.nagini, expr: "surprise" }, { t: go.nagini, pose: "cower" }] },
      { who: "hermione", x: 560, y: 1440, acts: [{ t: go.tumba, expr: "sadness" }, { t: go.nagini, expr: "surprise" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: go.tumba, z: 1.3, x: 400, y: 1150 }, { t: go.nagini, z: 1.0, y: 1050 }],
    sfx: [{ t: go.tumba, s: "chime", v: 0.3 }, { t: go.nagini - 0.2, s: "hiss", v: 0.8 }, { t: go.nagini + 0.3, s: "roar", v: 0.5 }, { t: go.varita, s: "crash", v: 0.5 }],
    overlay: ({ t }) => <Flash t={t} at={go.nagini - 0.3} dur={0.3} />,
  },

  cierva: {
    bg: ({ t }) => <SnowForest t={t} ice />,
    fx: ({ t }) => (
      <Svg>
        {t > ci.cierva - 0.3 && t < ci.agua ? <Doe x={kf(t, [ci.cierva - 0.3, ci.agua], [900, 640])} y={1350} s={0.8} t={t} k={kf(t, [ci.cierva - 0.3, ci.cierva + 0.3], [0, 1])} /> : null}
        {t > ci.espada - 0.3 && t < ci.destruye - 0.5 ? <Sword x={540} y={1460} s={0.7} r={180} glow={1} /> : null}
        <IceCrack t={t} t0={ci.agua} />
        {t > ci.destruye - 0.3 ? <><Locket x={540} y={1300} s={1} glow={kf(t, [ci.destruye - 0.3, ci.destruye + 0.3], [1, 3])} /><Sparkles x={540} y={1280} intensity={1.6} seed={4} count={24} color="#3fdc6b" /></> : null}
      </Svg>
    ),
    chars: [
      { who: "harry", x: 280, y: 1450, acts: [{ t: ci.cierva, expr: "surprise" }, { t: ci.agua - 0.3, walk: 520 }, { t: ci.agua + 0.2, move: { y: 1600 }, dur: 0.4 }, { t: ci.ahorca, expr: "sadness" }, { t: ci.ron + 0.4, move: { x: 360, y: 1450 }, dur: 0.6 }, { t: ci.ron + 0.4, expr: "joy" }] },
      { who: "ron", x: -200, y: 1440, holding: (t) => (t > ci.ron + 0.6 ? <Sword x={0} y={0} s={0.4} r={180} glow={0.6} /> : null), acts: [{ t: ci.ron - 0.8, walk: 500, run: true }, { t: ci.ron + 0.2, expr: "focus" }, { t: ci.destruye - 0.4, pose: "wandUp", dur: 1.2 }, { t: ci.destruye + 0.6, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ci.espada, z: 1.2, x: 540, y: 1250 }, { t: ci.ron, z: 1.0, y: 1100 }, { t: ci.destruye, z: 1.3, x: 540, y: 1200 }],
    sfx: [{ t: ci.cierva, s: "sparkle", v: 0.6 }, { t: ci.agua, s: "crash", v: 0.6 }, { t: ci.agua + 0.3, s: "splash", v: 0.7 }, { t: ci.ron, s: "splash", v: 0.6 }, { t: ci.destruye, s: "boom", v: 0.8 }, { t: ci.destruye + 0.2, s: "roar", v: 0.5 }],
    shake: [[ci.destruye, 0.8, 0.6]],
  },

  reliquias: {
    bg: ({ t }) => <Burrow t={t} />,
    fx: ({ t }) => (
      <Svg>
        {t > re.varita - 0.3 && t < re.reliquias ? <ElderWand x={300} y={800} s={1.6} r={-10} glow={1} /> : null}
        {t > re.piedra - 0.3 && t < re.reliquias ? <g transform="translate(540 700)"><circle r={40} fill="#3a3a44" stroke={INK} strokeWidth={5} /></g> : null}
        {t > re.capa - 0.3 && t < re.reliquias ? <path d="M 700 600 Q 780 560 860 600 L 900 820 Q 780 860 660 820 Z" fill="#9fb4d8" opacity={0.5} stroke="#fff" strokeWidth={4} /> : null}
        {t > re.reliquias - 0.3 ? <HallowsSymbol x={540} y={700} s={1} glow={1} /> : null}
      </Svg>
    ),
    chars: [
      { who: "xeno", x: 800, y: 1440, facing: -1, acts: [{ t: re.cuento, pose: "talk", dur: 5 }, { t: 0, expr: "focus" }] },
      { who: "harry", x: 200, y: 1450, acts: [{ t: re.reliquias, expr: "surprise" }] },
      { who: "hermione", x: 380, y: 1440, acts: [{ t: re.cuento, pose: "think", dur: 3 }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: re.varita, z: 1.0, y: 900 }],
    sfx: [{ t: re.varita, s: "sparkle", v: 0.4 }, { t: re.piedra, s: "chime", v: 0.4 }, { t: re.capa, s: "whoosh", v: 0.3 }, { t: re.reliquias, s: "fanfare", v: 0.4 }],
  },

  mansion: {
    bg: switchAt(ma.mansion - 0.3, Forest, Manor),
    fx: ({ t }) => <Svg>{t > ma.dobby - 0.3 && t < ma.dobby + 1 ? <Sparkles x={760} y={1150} intensity={1.4} seed={9} count={20} /> : null}</Svg>,
    chars: [
      { who: "harry", x: 300, y: 1450, acts: [{ t: ma.tabu - 0.3, pose: "talk", dur: 1 }, { t: ma.cazadores, expr: "surprise" }, { t: ma.cazadores + 0.3, pose: "cower", dur: 1.5 }, { t: ma.mansion - 0.3, move: { x: 160 }, dur: 0.01 }, { t: ma.dobby, expr: "joy" }] },
      { who: "ron", x: 120, y: 1440, acts: [{ t: ma.cazadores, expr: "surprise" }, { t: ma.mansion - 0.3, move: { x: 40 }, dur: 0.01 }, { t: ma.dobby, expr: "joy" }] },
      { who: "bellatrix", x: 760, y: 1440, facing: -1, show: false, wand: true, acts: [{ t: ma.mansion - 0.3, show: true }, { t: ma.bellatrix, expr: "anger" }, { t: ma.bellatrix + 0.3, pose: "wandAim", dur: 2 }] },
      { who: "hermione", x: 560, y: 1440, show: false, acts: [{ t: ma.mansion - 0.3, show: true }, { t: ma.bellatrix, expr: "sadness" }, { t: ma.bellatrix, pose: "cower" }] },
      { who: "dobby", x: 380, y: 1450, show: false, acts: [{ t: ma.dobby - 0.2, show: true }, { t: ma.dobby, pose: "cheer", dur: 1.5 }, { t: ma.dobby, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ma.cazadores, z: 1.1, y: 1100 }, { t: ma.bellatrix, z: 1.3, x: 660, y: 1050 }, { t: ma.dobby, z: 1.2, x: 400, y: 1150 }],
    sfx: [{ t: ma.tabu, s: "zap", v: 0.4 }, { t: ma.cazadores, s: "pop", v: 0.6 }, { t: ma.bellatrix, s: "cheer", v: 0.3 }, { t: ma.dobby - 0.2, s: "pop", v: 0.7 }],
    overlay: ({ t }) => <Flash t={t} at={ma.mansion - 0.3} dur={0.3} />,
  },

  dobby: {
    bg: switchAt(do_.playa - 0.3, Manor, Beach),
    under: ({ t }) => <Svg>{t > do_.lapida - 0.4 ? <Grave x={760} y={1350} s={1.3} /> : null}</Svg>,
    fx: ({ t }) => <Svg>{t > do_.cuchillo - 0.2 && t < do_.playa - 0.3 ? <Knife x={kf(t, [do_.cuchillo - 0.2, do_.playa - 0.4], [800, 420])} y={1150} s={1.2} r={-90} /> : null}</Svg>,
    chars: [
      { who: "bellatrix", x: 860, y: 1440, facing: -1, acts: [{ t: do_.cuchillo - 0.3, pose: "point", dur: 1 }, { t: 0, expr: "anger" }, { t: do_.playa - 0.3, show: false }] },
      { who: "dobby", x: 400, y: 1450, acts: [{ t: 0, expr: "focus" }, { t: do_.playa - 0.3, move: { x: 480, y: 1360 }, dur: 0.01 }, { t: do_.brazos, rot: -80, dur: 0.6 }, { t: do_.brazos, expr: "sleep" }, { t: do_.entierra, alpha: 0, dur: 0.8 }] },
      { who: "harry", x: 260, y: 1450, acts: [{ t: do_.playa, expr: "surprise" }, { t: do_.brazos, expr: "sadness" }, { t: do_.brazos, pose: "cower", dur: 2 }, { t: do_.lapida, pose: "sad" }] },
      { who: "ron", x: 100, y: 1440, show: false, acts: [{ t: do_.playa - 0.3, show: true }, { t: do_.brazos, expr: "sadness" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: do_.playa, z: 1.0, y: 1100 }, { t: do_.brazos, z: 1.4, x: 400, y: 1150 }, { t: do_.lapida, z: 1.2, x: 600, y: 1150 }],
    sfx: [{ t: do_.cuchillo, s: "whoosh", v: 0.6 }, { t: do_.playa - 0.3, s: "pop", v: 0.5 }, { t: do_.brazos, s: "chime", v: 0.3 }],
  },

  final: {
    bg: ({ t }) => <TombNight t={t} open={kf(t, [fi.tumba - 0.3, fi.tumba + 0.6], [0, 1])} />,
    fx: ({ t }) => <Svg>{t > fi.rayo - 0.3 ? <><path d={`M 640 ${kf(t, [fi.rayo - 0.3, fi.rayo], [900, 0])} L 600 300 L 660 320 L 620 700`} stroke="#e8f4ff" strokeWidth={14} fill="none" opacity={kf(t, [fi.rayo - 0.3, fi.rayo + 0.5, fi.rayo + 1.5], [0, 1, 0.2])} /></> : null}</Svg>,
    chars: [
      { who: "voldemort", x: 640, y: 1440, facing: -1, wand: false, holding: (t) => (t > fi.sauco - 0.2 ? <ElderWand x={0} y={0} s={0.4} r={160} glow={1} /> : null), acts: [{ t: fi.tumba, pose: "hold", dur: 2 }, { t: 0, expr: "anger" }, { t: fi.rayo - 0.4, pose: "pointUp" }, { t: fi.rayo, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.1, x: 600, y: 1100 }, { t: fi.sauco, z: 1.3, x: 640, y: 1050 }, { t: fi.rayo, z: 1.0, y: 1000 }],
    sfx: [{ t: fi.tumba, s: "rumble", v: 0.6 }, { t: fi.sauco, s: "sparkle", v: 0.5 }, { t: fi.rayo, s: "thunder", v: 0.9 }],
    shake: [[fi.rayo, 0.8, 0.8]],
    overlay: ({ t }) => <Flash t={t} at={fi.rayo} dur={0.4} color="#e8f4ff" />,
  },
};

export const p7full: PartSpec = { part: 0, title: "Harry Potter y las reliquias de la muerte (parte 1)", dyn: true, scenes };
export const p7fullAudio = audio;
export { NightCastle, Banner, INK };
