import { PartSpec, SceneSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { LivingRoom, NightStreet, Svg } from "../scenes/bg1";
import { Classroom, Corridor, Diagon, Hospital, NightCastle, Pitch, TrainInside } from "../scenes/bg2";
import { Rain } from "../scenes/bg1";
import { Aragog, WillowTree } from "../peli2/assets";
import { MiniStick, Question, Spell, Voldemort } from "../scenes/props";
import { Thought } from "../peli2/part1";
import { Banner, Flash, switchAt, wordClock } from "../scenes/util";
import {
  Balloon, BlackDog, Chocolate, Dementor, Divination, Dorm, Field, Firebolt, Frost, Hippogriff, Hogsmeade, KnightBus,
  MaraudersMap, MoonNight, Rat, Rewind, Shack, Shield, Skates, Snowball, Snowfall, Stag, TeaCup, TimeTurner, Trunk,
  Wardrobe, WantedPoster, Werewolf,
} from "./assets";
import audioData from "../data/p3full.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);
const D = (id: string) => (audio.scenes.find((s) => s.id === id)?.dur ?? 300) / 30;

/* ---------- tiempos clave ---------- */
const h = { asesino: w("hook", "asesino"), viene: w("hook", "viene"), peligro: w("hook", "peligro") };
const m = { burla: w("marge", "burla"), insulta: w("marge", "insulta"), zas: w("marge", "zas"), volando: w("marge", "volando"), agarrar: w("marge", "agarrarla") };
const a = { perro: w("autobus", "perro"), bum: w("autobus", "bum"), achica: w("autobus", "achica"), frena: w("autobus", "frena") };
const s = { sirius: w("sirius", "sirius"), carteles: w("sirius", "carteles"), trece: w("sirius", "trece"), viene: w("sirius", "viene") };
const tr = { congela: w("tren", "congela"), dementor: w("tren", "dementor"), desmaya: w("tren", "desmaya"), lupin: w("tren", "lupin"), chocolate: w("tren", "chocolate") };
const tw = { taza: w("trelawney", "taza"), perro: w("trelawney", "perro"), muerte: w("trelawney", "muerte") };
const hg = { buckbeak: w("hipogrifo", "buckbeak"), reverencia: w("hipogrifo", "reverencia"), vuela: w("hipogrifo", "vuela"), draco: w("hipogrifo", "draco"), ataca: w("hipogrifo", "ataca"), ejecuten: w("hipogrifo", "ejecuten") };
const bg = { boggart: w("boggart", "boggart"), arana: w("boggart", "arana"), patines: w("boggart", "patines"), dementor: w("boggart", "dementor") };
const to = { retrato: w("torre", "retrato"), cama: w("torre", "cama"), grita: w("torre", "grita"), escapa: w("torre", "escapa") };
const q = { dementores: w("quidditch", "dementores"), cae: w("quidditch", "cae"), dumbledore: w("quidditch", "dumbledore"), sauce: w("quidditch", "sauce") };
const mp = { mapa: w("mapa", "mapa"), hogsmeade: w("mapa", "hogsmeade"), nieve: w("mapa", "nieve") };
const tc = { sirius: w("traicion", "sirius"), padrino: w("traicion", "padrino"), voldemort: w("traicion", "voldemort"), furioso: w("traicion", "furioso") };
const pt = { patronus: w("patronus", "patronus"), feliz: w("patronus", "feliz"), principio: w("patronus", "principio"), practica: w("patronus", "practica") };
const pg = { pettigrew: w("pettigrew", "pettigrew"), murio: w("pettigrew", "murio") };
const dr = { burla: w("draco", "burla"), pina: w("draco", "pina"), corriendo: w("draco", "corriendo") };
const cd = { scabbers: w("condena", "scabbers") };
const pr = { salta: w("perro", "salta"), arrastra: w("perro", "arrastra"), casa: w("perro", "casa") };
const rv = { convierte: w("revelacion", "convierte"), lupin: w("revelacion", "lupin"), inocente: w("revelacion", "inocente"), rata: w("revelacion", "rata"), hechizo: w("revelacion", "hechizo") };
const lb = { luna: w("lobo", "luna"), lobo: w("lobo", "lobo"), escapa: w("lobo", "escapa") };
const lg = { dementores: w("lago", "dementores"), patronus: w("lago", "patronus"), desmaya: w("lago", "desmaya") };
const gt = { dumbledore: w("giratiempo", "dumbledore"), giratiempo: w("giratiempo", "giratiempo"), retroceden: w("giratiempo", "retroceden") };
const rs = { salvan: w("rescate", "salvan") };
const cv = { padre: w("ciervo", "padre"), mismo: w("ciervo", "mismo"), ciervo: w("ciervo", "ciervo"), huyen: w("ciervo", "huyen") };
const lb2 = { torre: w("libre", "torre"), libre: w("libre", "libre") };
const fn = { escoba: w("final", "escoba"), familia: w("final", "familia") };

const dementorRing = (t: number, cx: number, cy: number, n: number, k: number, r = 380) => (
  <>
    {Array.from({ length: n }).map((_, i) => {
      const ang = (i / n) * Math.PI * 2 + t * 0.4;
      return <Dementor key={i} x={cx + Math.cos(ang) * r * k} y={cy + Math.sin(ang) * r * 0.45 * k} s={0.55} t={t} seed={i} />;
    })}
  </>
);

const scenes: Record<string, SceneSpec> = {
  hook: {
    bg: ({ t }) => <NightStreet t={t} lights={0.4} />,
    fx: ({ t }) => (
      <Svg>
        {t > h.asesino - 0.3 ? <g opacity={kf(t, [h.asesino - 0.3, h.asesino + 0.2, h.viene - 0.3, h.viene], [0, 1, 1, 0.0])}><WantedPoster x={540} y={720} s={1.2} t={t} /></g> : null}
        {t > h.peligro - 0.4 ? <g opacity={kf(t, [h.peligro - 0.4, h.peligro + 0.4], [0, 1])}><Dementor x={kf(t, [h.peligro - 0.4, h.peligro + 2], [1300, 850])} y={1100} s={1.1} t={t} /></g> : null}
        <Frost k={kf(t, [h.peligro, h.peligro + 0.6], [0, 1])} />
      </Svg>
    ),
    chars: [{ who: "harry", x: 380, y: 1440, acts: [{ t: 3.5, look: 0.9 }, { t: h.viene, expr: "surprise" }, { t: h.viene, pose: "surprised" }, { t: h.peligro, pose: "cower" }] }],
    cam: [{ t: 0, z: 1, y: 1050 }, { t: h.viene, z: 1.15, x: 420, y: 1100 }, { t: 13, z: 1.05, x: 540, y: 1100 }],
    sfx: [{ t: h.asesino, s: "rumble", v: 0.5 }, { t: h.viene, s: "zap", v: 0.4 }, { t: h.peligro, s: "hiss", v: 0.5 }],
  },

  marge: {
    bg: LivingRoom,
    under: () => (
      <Svg>
        <rect x={180} y={1250} width={720} height={36} fill="#8a5a2b" stroke={INK} strokeWidth={6} />
      </Svg>
    ),
    fx: ({ t }) =>
      t > m.zas - 0.1 ? (
        <Svg>
          <Balloon x={kf(t, [m.zas, m.volando, m.volando + 3], [700, 720, 760])} y={kf(t, [m.zas, m.volando - 0.3, m.volando + 3], [1050, 980, 120])} s={1} t={t} k={kf(t, [m.zas, m.zas + 1.6], [0.1, 1])} />
        </Svg>
      ) : null,
    chars: [
      { who: "harry", x: 260, y: 1440, acts: [{ t: m.burla, expr: "sadness" }, { t: m.insulta, expr: "anger" }, { t: m.insulta + 0.5, pose: "angry" }, { t: m.volando + 1, expr: "surprise" }] },
      { who: "marge", x: 700, y: 1430, facing: -1, acts: [{ t: m.burla - 0.2, pose: "talk", dur: 3 }, { t: m.burla - 0.2, expr: "joy" }, { t: m.zas - 0.1, show: false }] },
      { who: "vernon", x: 940, y: 1450, facing: -1, acts: [{ t: m.zas + 0.5, expr: "surprise" }, { t: m.agarrar - 0.3, walk: 760, run: true }, { t: m.agarrar + 0.2, pose: "pointUp" }, { t: m.agarrar + 0.2, move: { y: 1200 }, dur: 1.4 }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: m.insulta, z: 1.4, x: 300, y: 1050 }, { t: m.zas, z: 1.0, x: 600, y: 1050 }, { t: m.volando + 1, z: 1.0, x: 700, y: 800 }],
    sfx: [{ t: m.zas, s: "zap", v: 0.6 }, { t: m.zas + 0.4, s: "whoosh", v: 0.5 }, { t: m.volando, s: "whoosh", v: 0.6 }],
    shake: [[m.zas, 0.5]],
  },

  autobus: {
    bg: ({ t }) => <NightStreet t={t} lights={0.5} />,
    under: ({ t }) => (
      <Svg>
        <ellipse cx={150} cy={1260} rx={180} ry={90} fill="#1f4a2a" stroke={INK} strokeWidth={5} />
        {t > a.perro - 0.3 && t < a.bum ? (
          <g opacity={kf(t, [a.perro - 0.3, a.perro + 0.3], [0, 1])}>
            <circle cx={110} cy={1230} r={9} fill="#ffe66d" />
            <circle cx={150} cy={1230} r={9} fill="#ffe66d" />
          </g>
        ) : null}
      </Svg>
    ),
    fx: ({ t }) =>
      t > a.bum - 0.4 ? (
        <Svg>
          <KnightBus x={kf(t, [a.bum - 0.4, a.bum + 0.3, a.frena - 0.5, a.frena], [1600, 900, 700, 640], (x) => x)} y={1460} s={1.0} t={t} squeeze={t > a.achica && t < a.achica + 0.8 ? 0.55 : 1} />
        </Svg>
      ) : null,
    chars: [
      { who: "harry", x: -150, y: 1440, holding: () => <Trunk x={10} y={10} s={0.7} />, acts: [{ t: 0.2, walk: 330 }, { t: a.perro, expr: "surprise" }, { t: a.perro, look: -0.8 }, { t: a.bum, look: null }, { t: a.bum, pose: "cower", dur: 2 }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: a.perro, z: 1.6, x: 150, y: 1180 }, { t: a.bum - 0.4, z: 1.0, x: 540, y: 1100 }],
    sfx: [{ t: a.perro, s: "roar", v: 0.3 }, { t: a.bum, s: "boom", v: 0.8 }, { t: a.achica, s: "whoosh", v: 0.6 }, { t: a.frena, s: "crash", v: 0.6 }],
    shake: [[a.bum, 0.7], [a.frena, 0.6]],
  },

  sirius: {
    bg: Diagon,
    fx: ({ t }) => <Svg>{t > s.carteles - 0.6 ? <WantedPoster x={540} y={kf(t, [s.carteles - 0.6, s.carteles], [-400, 700])} s={1.3} t={t} /> : null}</Svg>,
    chars: [
      { who: "arthur", x: 240, y: 1440, acts: [{ t: s.sirius, pose: "talk", dur: 3 }, { t: s.sirius, expr: "focus" }] },
      { who: "harry", x: 780, y: 1450, facing: -1, acts: [{ t: s.trece, expr: "surprise" }, { t: s.viene, pose: "surprised" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: s.carteles, z: 1.0, y: 900 }, { t: s.viene, z: 1.35, x: 760, y: 1050 }],
    sfx: [{ t: s.carteles, s: "rumble", v: 0.5 }, { t: s.trece, s: "boom", v: 0.5 }],
    overlay: ({ t }) => <Banner t={t} text="¡ESCAPÓ DE AZKABAN!" t0={s.sirius + 0.5} t1={s.sirius + 2.6} color="#ff6b6b" />,
  },

  tren: {
    bg: TrainInside,
    fx: ({ t }) => (
      <Svg>
        <Frost k={kf(t, [tr.congela - 0.2, tr.congela + 0.6, tr.lupin + 1, tr.lupin + 2], [0, 1, 1, 0])} />
        {t > tr.dementor - 0.5 && t < tr.lupin + 1.5 ? <Dementor x={kf(t, [tr.dementor - 0.5, tr.dementor + 1, tr.lupin + 0.3, tr.lupin + 1.5], [1300, 760, 760, 1400])} y={1300} s={1.2} t={t} /> : null}
        <Shield x={700} y={950} s={1} k={kf(t, [tr.lupin, tr.lupin + 0.3, tr.lupin + 1.3, tr.lupin + 1.8], [0, 1, 1, 0])} />
      </Svg>
    ),
    chars: [
      { who: "ron", x: 140, y: 1280, acts: [{ t: 0, pose: "sit" }, { t: tr.dementor, expr: "surprise" }] },
      { who: "harry", x: 330, y: 1280, acts: [{ t: 0, pose: "sit" }, { t: tr.congela, expr: "surprise" }, { t: tr.desmaya, expr: "sleep" }, { t: tr.desmaya, rot: -60, dur: 0.6 }, { t: tr.chocolate - 0.5, rot: 0, dur: 0.4 }, { t: tr.chocolate - 0.5, expr: "joy" }] },
      { who: "lupin", x: 580, y: 1280, holding: (t) => (t > tr.chocolate - 0.2 ? <Chocolate x={10} y={0} s={0.5} /> : null), wand: false, acts: [{ t: 0, pose: "sit" }, { t: 0, expr: "sleep" }, { t: tr.lupin - 0.5, expr: "focus" }, { t: tr.lupin - 0.4, move: { y: 1440 }, dur: 0.3 }, { t: tr.lupin - 0.4, wand: true }, { t: tr.lupin - 0.3, pose: "wandAim", dur: 1.6 }, { t: tr.lupin - 0.2, glow: 1 }, { t: tr.lupin + 1.4, glow: 0 }, { t: tr.lupin + 1.4, wand: false }, { t: tr.chocolate - 0.3, face: -1 }, { t: tr.chocolate - 0.3, pose: "hold" }, { t: tr.chocolate - 0.3, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: tr.dementor, z: 1.15, x: 640, y: 1050 }, { t: tr.desmaya, z: 1.5, x: 360, y: 1000 }, { t: tr.lupin, z: 1.05, x: 560, y: 1050 }],
    sfx: [{ t: tr.congela, s: "rumble", v: 0.5 }, { t: tr.dementor, s: "hiss", v: 0.6 }, { t: tr.desmaya, s: "whoosh", v: 0.4 }, { t: tr.lupin - 0.2, s: "zap", v: 0.5 }, { t: tr.lupin, s: "sparkle", v: 0.6 }, { t: tr.chocolate, s: "chime", v: 0.4 }],
    overlay: ({ t }) => <Flash t={t} at={tr.lupin} dur={0.4} color="#e8f7ff" />,
  },

  trelawney: {
    bg: Divination,
    fx: ({ t }) => (
      <Svg>
        {t > tw.perro - 0.4 ? (
          <g opacity={kf(t, [tw.perro - 0.4, tw.perro + 0.2], [0, 1])}>
            <circle cx={540} cy={560} r={260} fill="#1b1b2f" opacity={0.85} stroke={INK} strokeWidth={10} />
            <BlackDog x={500} y={700} s={1.1} t={t} />
          </g>
        ) : null}
      </Svg>
    ),
    chars: [
      { who: "harry", x: 230, y: 1450, acts: [{ t: tw.perro, expr: "surprise" }, { t: tw.muerte, pose: "cower" }] },
      { who: "ron", x: 60, y: 1450, acts: [{ t: tw.muerte, expr: "surprise" }] },
      { who: "trelawney", x: 760, y: 1440, facing: -1, holding: () => <TeaCup x={10} y={0} s={0.45} grim={1} />, acts: [{ t: tw.taza - 0.3, pose: "hold" }, { t: tw.taza, expr: "focus" }, { t: tw.perro, expr: "surprise" }, { t: tw.muerte, pose: "surprised" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: tw.taza, z: 1.45, x: 700, y: 1000 }, { t: tw.perro, z: 1.0, x: 540, y: 950 }],
    sfx: [{ t: tw.taza, s: "chime", v: 0.4 }, { t: tw.perro, s: "roar", v: 0.4 }, { t: tw.muerte, s: "rumble", v: 0.5 }],
    overlay: ({ t }) => <Banner t={t} text="¡PRESAGIO DE MUERTE!" t0={tw.muerte} t1={tw.muerte + 2.2} color="#c8a2ff" />,
  },

  hipogrifo: {
    bg: Field,
    fx: ({ t }) => {
      const flying = t > hg.vuela - 0.3 && t < hg.draco - 0.3;
      const hx = flying ? kf(t, [hg.vuela - 0.3, hg.draco - 0.3], [700, 400]) : 720;
      const hy = flying ? kf(t, [hg.vuela - 0.3, hg.vuela + 0.6, hg.draco - 1, hg.draco - 0.3], [1440, 900, 900, 1440]) : 1440;
      return (
        <Svg>
          <Hippogriff x={hx} y={hy} s={1.1} t={t} flip lunge={kf(t, [hg.ataca - 0.1, hg.ataca + 0.15, hg.ataca + 0.8], [0, 1, 0])} />
        </Svg>
      );
    },
    chars: [
      { who: "hagrid", x: 960, y: 1460, s: 1.5, facing: -1, acts: [{ t: hg.buckbeak, pose: "point", dur: 2 }, { t: hg.buckbeak, expr: "joy" }, { t: hg.ataca + 0.3, expr: "surprise" }] },
      {
        who: "harry",
        x: 380,
        y: 1440,
        acts: [
          { t: hg.reverencia - 0.2, pose: "sad", dur: 1 },
          { t: hg.vuela - 0.35, move: { x: 700, y: 1240 }, dur: 0.01 },
          { t: hg.vuela - 0.3, move: { x: 700, y: 700 }, dur: 0.9 },
          { t: hg.vuela + 0.6, move: { x: 400, y: 700 }, dur: hg.draco - hg.vuela - 1.6 },
          { t: hg.draco - 1, move: { x: 400, y: 1240 }, dur: 0.7 },
          { t: hg.draco - 0.3, move: { x: 230, y: 1440 }, dur: 0.01 },
          { t: hg.vuela, expr: "joy" },
          { t: hg.vuela, pose: "cheer", dur: 2 },
          { t: hg.ataca, expr: "surprise" },
        ],
      },
      { who: "draco", x: 1300, y: 1440, acts: [{ t: hg.draco - 0.6, walk: 560 }, { t: hg.draco + 0.4, face: 1 }, { t: hg.draco + 0.4, pose: "point", dur: 1 }, { t: hg.draco + 0.4, expr: "joy" }, { t: hg.ataca + 0.1, rot: -80, dur: 0.3 }, { t: hg.ataca + 0.1, expr: "sadness" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: hg.vuela, z: 1.0, x: 540, y: 950 }, { t: hg.ataca, z: 1.25, x: 640, y: 1100 }],
    sfx: [{ t: hg.buckbeak, s: "flutter", v: 0.5 }, { t: hg.vuela, s: "whoosh", v: 0.6 }, { t: hg.ataca, s: "roar", v: 0.6 }, { t: hg.ataca + 0.15, s: "crash", v: 0.4 }, { t: hg.ejecuten, s: "rumble", v: 0.4 }],
    shake: [[hg.ataca + 0.1, 0.6]],
  },

  boggart: {
    bg: Classroom,
    under: ({ t }) => <Svg><Wardrobe x={540} y={1300} s={1} t={t} shake={t < bg.arana - 0.3 ? 1 : 0} open={kf(t, [bg.arana - 0.4, bg.arana - 0.1], [0, 1])} /></Svg>,
    fx: ({ t }) => (
      <Svg>
        {t > bg.arana - 0.2 && t < bg.dementor - 0.3 ? (
          <g transform={`rotate(${t > bg.patines ? Math.sin(t * 8) * 12 : 0} 560 1400)`}>
            <Aragog x={560 + (t > bg.patines ? Math.sin(t * 3) * 120 : 0)} y={1400} s={0.6} t={t} />
            {t > bg.patines ? <Skates x={560 + Math.sin(t * 3) * 120} y={1400} s={1.4} t={t} /> : null}
          </g>
        ) : null}
        {t > bg.dementor - 0.3 ? <Dementor x={kf(t, [bg.dementor - 0.3, bg.dementor + 0.4], [560, 470])} y={1350} s={1.1} t={t} /> : null}
      </Svg>
    ),
    chars: [
      { who: "lupin", x: 900, y: 1440, facing: -1, acts: [{ t: 0.3, pose: "talk", dur: 3 }, { t: 0.3, expr: "joy" }] },
      { who: "ron", x: 120, y: 1450, wand: true, acts: [{ t: bg.arana, expr: "surprise" }, { t: bg.arana, pose: "cower", dur: 1.2 }, { t: bg.patines - 0.4, pose: "wandAim", dur: 1 }, { t: bg.patines - 0.3, glow: 1 }, { t: bg.patines + 0.5, glow: 0 }, { t: bg.patines + 0.3, expr: "joy" }] },
      { who: "harry", x: 290, y: 1450, acts: [{ t: bg.patines + 0.3, expr: "joy" }, { t: bg.dementor, expr: "surprise" }, { t: bg.dementor, pose: "cower" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: bg.arana, z: 1.1, x: 480, y: 1150 }, { t: bg.dementor, z: 1.3, x: 400, y: 1050 }],
    sfx: [{ t: 0.4, s: "knock", v: 0.4 }, { t: bg.arana - 0.2, s: "boom", v: 0.5 }, { t: bg.patines - 0.3, s: "zap", v: 0.4 }, { t: bg.patines, s: "pop", v: 0.5 }, { t: bg.dementor - 0.3, s: "hiss", v: 0.6 }],
  },

  torre: {
    bg: Dorm,
    chars: [
      { who: "ron", x: 520, y: 1270, s: 1.5, acts: [{ t: 0, rot: -90, dur: 0.001 }, { t: 0, expr: "sleep" }, { t: to.grita - 0.4, rot: 0, dur: 0.3 }, { t: to.grita - 0.4, move: { y: 1440 }, dur: 0.3 }, { t: to.grita - 0.3, expr: "surprise" }, { t: to.grita - 0.3, pose: "surprised" }] },
      { who: "sirius", x: 1300, y: 1440, facing: -1, acts: [{ t: to.cama - 1.2, walk: 800 }, { t: to.cama, expr: "anger" }, { t: to.grita, expr: "surprise" }, { t: to.escapa - 0.3, walk: -300, run: true }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: to.cama, z: 1.35, x: 680, y: 1100 }, { t: to.grita, z: 1.1, x: 600, y: 1050 }],
    sfx: [{ t: to.retrato, s: "crash", v: 0.5 }, { t: to.cama, s: "rumble", v: 0.5 }, { t: to.grita, s: "roar", v: 0.4 }, { t: to.escapa, s: "whoosh", v: 0.5 }],
    overlay: ({ t }) => <Banner t={t} text="¡SIRIUS ESTÁ EN EL CASTILLO!" t0={to.retrato} t1={to.retrato + 2} color="#ff6b6b" />,
  },

  quidditch: {
    bg: switchAt(q.sauce - 0.2, ({ t }) => (
      <>
        <div style={{ position: "absolute", inset: 0, filter: "brightness(0.5) saturate(0.6)" }}>
          <Pitch t={t} />
        </div>
        <Svg><Rain t={t} n={140} /></Svg>
      </>
    ), ({ t }) => (
      <Svg>
        <rect width={1080} height={1920} fill="#1d2440" />
        <Rain t={t} n={120} />
        <rect x={0} y={1270} width={1080} height={650} fill="#1f4a2a" />
        <WillowTree x={600} y={1290} t={t} swing={1} />
      </Svg>
    )),
    fx: ({ t }) => (
      <Svg>
        {t > q.dementores - 0.5 && t < q.sauce - 0.2 ? dementorRing(t, 540, 600, 9, kf(t, [q.dementores - 0.5, q.dementores + 1], [2, 1])) : null}
        {t > q.sauce - 0.2 ? [0, 1, 2, 3].map((i) => <line key={i} x1={500 + i * 60} y1={kf(t, [q.sauce, q.sauce + 1.5], [700, 1260]) - i * 20} x2={560 + i * 60} y2={kf(t, [q.sauce, q.sauce + 1.5], [700, 1260]) - i * 20 + 30} stroke="#7a4a22" strokeWidth={14} transform={`rotate(${t * 300 + i * 40} ${530 + i * 60} 900)`} />) : null}
      </Svg>
    ),
    chars: [
      { who: "harry", x: 300, y: 1100, broom: true, acts: [{ t: 0, move: { x: 560, y: 1000 }, dur: 2 }, { t: q.dementores, expr: "surprise" }, { t: q.cae, expr: "sleep" }, { t: q.cae, rot: 80, dur: 0.5 }, { t: q.cae, move: { y: 1300 }, dur: q.dumbledore - q.cae + 0.3 }, { t: q.sauce - 0.2, show: false }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: q.dementores, z: 1.0, y: 900 }, { t: q.cae, z: 1.2, x: 560, y: 1000 }],
    sfx: [{ t: 0.2, s: "thunder", v: 0.6 }, { t: q.dementores, s: "hiss", v: 0.7 }, { t: q.cae, s: "whoosh", v: 0.6 }, { t: q.dumbledore, s: "sparkle", v: 0.5 }, { t: q.sauce, s: "crash", v: 0.8 }, { t: q.sauce + 0.3, s: "boom", v: 0.5 }],
    shake: [[q.sauce, 0.8]],
  },

  mapa: {
    bg: switchAt(mp.hogsmeade - 0.3, Corridor, Hogsmeade),
    fx: ({ t }) => (
      <Svg>
        {t > mp.mapa - 0.3 && t < mp.hogsmeade - 0.3 ? <MaraudersMap x={540} y={430} s={0.8} t={t} open={kf(t, [mp.mapa - 0.3, mp.mapa + 0.4], [0, 1])} /> : null}
        {t > mp.nieve - 0.2 ? [0, 1, 2, 3].map((i) => {
          const k = ((t - mp.nieve + i * 0.35) % 1.4) / 1.4;
          return <Snowball key={i} x={300 + k * 480} y={1150 - Math.sin(k * Math.PI) * 300} s={1.2} />;
        }) : null}
      </Svg>
    ),
    chars: [
      { who: "fred", x: 620, y: 1440, facing: -1, acts: [{ t: mp.mapa - 0.4, pose: "hold", dur: 1.5 }, { t: 0, expr: "joy" }, { t: mp.hogsmeade - 0.3, show: false }] },
      { who: "george", x: 800, y: 1440, facing: -1, acts: [{ t: 0, expr: "joy" }, { t: mp.mapa, pose: "wave", dur: 1.5 }, { t: mp.hogsmeade - 0.3, show: false }] },
      { who: "harry", x: 280, y: 1450, acts: [{ t: mp.mapa, expr: "surprise" }, { t: mp.mapa + 1, expr: "joy" }, { t: mp.hogsmeade - 0.3, alpha: 0.25, dur: 0.01 }, { t: mp.hogsmeade - 0.3, expr: "joy" }] },
      { who: "draco", x: 850, y: 1440, facing: -1, show: false, acts: [{ t: mp.hogsmeade - 0.3, show: true }, { t: mp.nieve, expr: "surprise" }, { t: mp.nieve + 0.4, pose: "cower" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1050 }, { t: mp.mapa, z: 1.0, y: 900 }, { t: mp.hogsmeade, z: 1.0, y: 1100 }, { t: mp.nieve, z: 1.15, x: 640, y: 1100 }],
    sfx: [{ t: mp.mapa - 0.3, s: "paper", v: 0.6 }, { t: mp.mapa + 0.4, s: "sparkle", v: 0.4 }, { t: mp.nieve, s: "pop", v: 0.5 }, { t: mp.nieve + 0.35, s: "pop", v: 0.5 }, { t: mp.nieve + 0.7, s: "pop", v: 0.5 }],
    overlay: ({ t }) => <Banner t={t} text="Hogsmeade" t0={mp.hogsmeade} t1={mp.hogsmeade + 2} color="#dff4ff" />,
  },

  traicion: {
    bg: Hogsmeade,
    fx: ({ t }) => (
      <Svg>
        <Thought x={540} y={560} k={kf(t, [tc.sirius - 0.4, tc.sirius, D("traicion") - 1, D("traicion")], [0, 1, 1, 0])}>
          <MiniStick x={-110} y={110} s={0.55} color="#1f3a5f" head="#e6ecf3" hair="#141418" />
          <MiniStick x={10} y={110} s={0.55} color="#2f6fe4" head="#e3eeff" hair="#1e1e28" glasses />
          <MiniStick x={110} y={110} s={0.55} color="#2fae4f" head="#fde3df" hair="#c0392b" />
          {t > tc.voldemort - 0.3 ? <g transform="scale(0.35)"><Voldemort x={0} y={-60} s={1} t={t} k={kf(t, [tc.voldemort - 0.3, tc.voldemort + 0.3], [0, 1])} /></g> : null}
        </Thought>
      </Svg>
    ),
    chars: [
      { who: "mcgonagall", x: 820, y: 1430, facing: -1, acts: [{ t: 0.2, pose: "talk", dur: 4 }] },
      { who: "harry", x: 250, y: 1450, acts: [{ t: tc.padrino, expr: "surprise" }, { t: tc.furioso - 0.2, expr: "anger" }, { t: tc.furioso - 0.2, pose: "angry" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1050 }, { t: tc.padrino, z: 1.0, y: 900 }, { t: tc.furioso, z: 1.5, x: 280, y: 1000 }],
    sfx: [{ t: tc.padrino, s: "chime", v: 0.3 }, { t: tc.voldemort, s: "rumble", v: 0.6 }, { t: tc.furioso, s: "boom", v: 0.4 }],
  },

  patronus: {
    bg: Classroom,
    fx: ({ t }) => (
      <Svg>
        {t > pt.principio && t < pt.principio + 1 ? <circle cx={560} cy={940} r={kf(t, [pt.principio, pt.principio + 1], [10, 80])} fill="#e8f7ff" opacity={kf(t, [pt.principio, pt.principio + 1], [0.8, 0])} /> : null}
        <Shield x={620} y={920} s={1.1} k={kf(t, [pt.practica, pt.practica + 0.4, D("patronus")], [0, 1, 1])} />
      </Svg>
    ),
    chars: [
      { who: "lupin", x: 880, y: 1440, facing: -1, acts: [{ t: 0.2, pose: "talk", dur: 3 }, { t: pt.practica + 0.5, expr: "joy" }] },
      { who: "harry", x: 340, y: 1450, wand: true, acts: [{ t: pt.feliz, expr: "focus" }, { t: pt.principio - 0.3, pose: "wandAim", dur: 1 }, { t: pt.principio + 0.7, expr: "sadness" }, { t: pt.practica - 0.3, pose: "wandAim" }, { t: pt.practica - 0.2, glow: 1 }, { t: pt.practica, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: pt.principio, z: 1.3, x: 440, y: 1050 }, { t: pt.practica, z: 1.05, x: 560, y: 1000 }],
    sfx: [{ t: pt.principio, s: "pop", v: 0.4 }, { t: pt.practica, s: "sparkle", v: 0.7 }, { t: pt.practica + 0.2, s: "chime", v: 0.5 }],
    overlay: ({ t }) => <Flash t={t} at={pt.practica} dur={0.4} color="#e8f7ff" />,
  },

  pettigrew: {
    bg: Dorm,
    fx: ({ t }) => (
      <Svg>
        <MaraudersMap x={540} y={470} s={0.9} t={t} name={t > pg.pettigrew - 0.3 ? "Peter Pettigrew" : undefined} />
        <Question t={t} x={540} y={760} t0={pg.murio + 0.4} />
      </Svg>
    ),
    chars: [{ who: "harry", x: 540, y: 1450, holding: () => <rect x={-20} y={-20} width={60} height={40} fill="#e9d6a8" stroke={INK} strokeWidth={4} />, acts: [{ t: 0, pose: "hold" }, { t: 0, expr: "focus" }, { t: pg.pettigrew, expr: "surprise" }] }],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: pg.pettigrew, z: 1.3, x: 620, y: 750 }],
    sfx: [{ t: pg.pettigrew - 0.3, s: "chime", v: 0.5 }, { t: pg.murio, s: "rumble", v: 0.5 }],
  },

  draco: {
    bg: Field,
    chars: [
      { who: "draco", x: 640, y: 1440, facing: -1, acts: [{ t: dr.burla - 0.2, pose: "point", dur: 1.4 }, { t: dr.burla, expr: "joy" }, { t: dr.pina + 0.05, move: { x: 820 }, dur: 0.25 }, { t: dr.pina + 0.05, rot: 30, dur: 0.2 }, { t: dr.pina + 0.05, expr: "surprise" }, { t: dr.corriendo - 0.3, rot: 0, dur: 0.2 }, { t: dr.corriendo - 0.2, walk: 1400, run: true }] },
      { who: "hermione", x: 160, y: 1440, acts: [{ t: dr.burla + 0.6, expr: "anger" }, { t: dr.pina - 0.5, walk: 520, run: true }, { t: dr.pina - 0.05, pose: "point", dur: 0.5 }, { t: dr.corriendo, expr: "joy" }] },
      { who: "ron", x: 60, y: 1450, acts: [{ t: dr.pina + 0.3, expr: "surprise" }, { t: dr.corriendo, expr: "joy" }, { t: dr.corriendo, pose: "cheer" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: dr.pina, z: 1.4, x: 600, y: 1050 }, { t: dr.corriendo, z: 1.1, x: 420, y: 1100 }],
    sfx: [{ t: dr.pina, s: "boom", v: 0.7 }, { t: dr.corriendo, s: "whoosh", v: 0.5 }],
    shake: [[dr.pina, 0.8]],
  },

  condena: {
    bg: Field,
    fx: ({ t }) => <Svg>{t > cd.scabbers - 0.3 ? <Rat x={kf(t, [cd.scabbers - 0.3, cd.scabbers + 0.5], [700, 560])} y={kf(t, [cd.scabbers - 0.3, cd.scabbers + 0.1, cd.scabbers + 0.5], [1100, 1000, 1150])} s={1.4} t={t} flip /> : null}</Svg>,
    chars: [
      { who: "hagrid", x: 840, y: 1460, s: 1.5, facing: -1, acts: [{ t: 0, expr: "sadness" }, { t: 0, pose: "sad" }] },
      { who: "harry", x: 200, y: 1450, acts: [{ t: 0, expr: "sadness" }] },
      { who: "hermione", x: 360, y: 1440, acts: [{ t: 0, expr: "sadness" }] },
      { who: "ron", x: 520, y: 1450, acts: [{ t: cd.scabbers, expr: "surprise" }, { t: cd.scabbers + 0.5, pose: "hold" }, { t: cd.scabbers + 0.5, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: cd.scabbers, z: 1.5, x: 560, y: 1100 }],
    sfx: [{ t: cd.scabbers - 0.3, s: "pop", v: 0.5 }],
  },

  perro: {
    bg: switchAt(pr.casa - 0.3, ({ t }) => <Field t={t} dusk />, Shack),
    fx: ({ t }) => (
      <Svg>
        {t > pr.salta - 0.5 && t < pr.casa - 0.3 ? <BlackDog x={kf(t, [pr.salta - 0.5, pr.salta + 0.3, pr.arrastra, pr.casa - 0.3], [-300, 420, 420, 1400])} y={1450} s={1.3} t={t} run /> : null}
      </Svg>
    ),
    chars: [
      { who: "ron", x: 520, y: 1450, acts: [{ t: pr.salta + 0.2, expr: "surprise" }, { t: pr.salta + 0.3, rot: 80, dur: 0.3 }, { t: pr.arrastra, move: { x: 1500 }, dur: pr.casa - pr.arrastra - 0.3 }, { t: pr.casa - 0.3, show: false }] },
      { who: "harry", x: 240, y: 1450, acts: [{ t: pr.salta, expr: "surprise" }, { t: pr.arrastra + 0.6, walk: 1400, run: true }, { t: pr.casa - 0.3, move: { x: 200 }, dur: 0.01 }, { t: pr.casa - 0.2, walk: 380 }, { t: pr.casa, expr: "focus" }] },
      { who: "hermione", x: 90, y: 1440, acts: [{ t: pr.salta, expr: "surprise" }, { t: pr.arrastra + 0.8, walk: 1400, run: true }, { t: pr.casa - 0.3, move: { x: 40 }, dur: 0.01 }, { t: pr.casa - 0.1, walk: 180 }, { t: pr.casa, expr: "focus" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: pr.salta, z: 1.2, x: 480, y: 1150 }, { t: pr.casa - 0.3, z: 1.0, x: 540, y: 1100 }],
    sfx: [{ t: pr.salta - 0.2, s: "roar", v: 0.6 }, { t: pr.arrastra, s: "whoosh", v: 0.6 }, { t: pr.casa - 0.2, s: "knock", v: 0.4 }],
    shake: [[pr.salta, 0.6]],
  },

  revelacion: {
    bg: Shack,
    fx: ({ t }) => (
      <Svg>
        {t < rv.convierte ? <BlackDog x={780} y={1450} s={1.3} t={t} flip /> : null}
        {t > rv.convierte - 0.2 && t < rv.convierte + 1 ? <Sparkles x={780} y={1200} intensity={1.4} seed={3} count={20} color="#cfd8ff" /> : null}
        {t < rv.hechizo ? <Rat x={560} y={1150} s={1.3} t={t} /> : null}
        {t > rv.hechizo - 0.3 && t < rv.hechizo + 1.2 ? <Sparkles x={560} y={1150} intensity={1.6} seed={5} count={24} color="#ffe36e" /> : null}
      </Svg>
    ),
    chars: [
      { who: "harry", x: 160, y: 1450, wand: true, acts: [{ t: rv.convierte, expr: "anger" }, { t: rv.convierte + 0.3, pose: "wandAim", dur: 2 }, { t: rv.inocente, expr: "surprise" }] },
      { who: "ron", x: 380, y: 1450, holding: () => null, acts: [{ t: 0, expr: "sadness" }, { t: rv.rata, expr: "surprise" }] },
      { who: "sirius", x: 780, y: 1440, facing: -1, show: false, acts: [{ t: rv.convierte, show: true }, { t: rv.convierte, expr: "anger" }, { t: rv.inocente, expr: "joy" }, { t: rv.rata, pose: "point" }] },
      { who: "lupin", x: 1300, y: 1440, wand: true, acts: [{ t: rv.lupin - 0.4, walk: 950 }, { t: rv.lupin + 0.6, face: -1 }, { t: rv.lupin + 0.6, expr: "focus" }, { t: rv.hechizo - 0.4, pose: "wandAim", dur: 1.2 }, { t: rv.hechizo - 0.3, glow: 1 }, { t: rv.hechizo + 0.8, glow: 0 }] },
      { who: "pettigrew", x: 560, y: 1450, show: false, acts: [{ t: rv.hechizo, show: true }, { t: rv.hechizo, expr: "surprise" }, { t: rv.hechizo, pose: "cower" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: rv.convierte, z: 1.35, x: 760, y: 1050 }, { t: rv.inocente, z: 1.0, x: 600, y: 1100 }, { t: rv.hechizo, z: 1.3, x: 560, y: 1100 }],
    sfx: [{ t: rv.convierte - 0.2, s: "zap", v: 0.5 }, { t: rv.convierte, s: "pop", v: 0.6 }, { t: rv.lupin, s: "step", v: 0.5 }, { t: rv.hechizo - 0.2, s: "zap", v: 0.5 }, { t: rv.hechizo, s: "pop", v: 0.7 }],
    overlay: ({ t }) => (
      <>
        <Flash t={t} at={rv.convierte} dur={0.3} />
        <Flash t={t} at={rv.hechizo} dur={0.3} color="#ffe36e" />
      </>
    ),
  },

  lobo: {
    bg: MoonNight,
    fx: ({ t }) => (
      <Svg>
        {t > lb.lobo - 0.3 ? <Werewolf x={kf(t, [lb.lobo - 0.3, lb.lobo + 2], [600, 640])} y={1460} s={1.1} t={t} /> : null}
        {t > lb.escapa - 0.3 ? <Rat x={kf(t, [lb.escapa - 0.3, lb.escapa + 1.5], [420, -200])} y={1460} s={1.3} t={t} flip /> : null}
      </Svg>
    ),
    chars: [
      { who: "lupin", x: 600, y: 1440, facing: -1, acts: [{ t: lb.luna, expr: "surprise" }, { t: lb.luna + 0.3, pose: "cower", dur: 1 }, { t: lb.lobo - 0.3, show: false }] },
      { who: "harry", x: 180, y: 1450, acts: [{ t: lb.luna, look: 0.9 }, { t: lb.lobo, expr: "surprise" }, { t: lb.lobo, pose: "cower" }] },
      { who: "hermione", x: 330, y: 1440, acts: [{ t: lb.lobo, expr: "surprise" }, { t: lb.lobo, pose: "surprised" }] },
      { who: "pettigrew", x: 420, y: 1450, acts: [{ t: 0, expr: "focus" }, { t: lb.escapa - 0.3, show: false }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 900 }, { t: lb.lobo, z: 1.1, x: 600, y: 1050 }, { t: lb.escapa, z: 1.2, x: 400, y: 1150 }],
    sfx: [{ t: lb.luna, s: "chime", v: 0.3 }, { t: lb.lobo - 0.2, s: "roar", v: 0.8 }, { t: lb.escapa - 0.3, s: "pop", v: 0.5 }],
    shake: [[lb.lobo, 0.7, 0.8]],
  },

  lago: {
    bg: NightCastle,
    fx: ({ t }) => (
      <Svg>
        {t > lg.dementores - 0.5 && t < lg.patronus + 1 ? dementorRing(t, 540, 1150, 10, kf(t, [lg.dementores - 0.5, lg.dementores + 1, lg.patronus, lg.patronus + 1], [2.2, 1, 1, 3])) : null}
        <Frost k={kf(t, [lg.dementores, lg.dementores + 1, lg.patronus, lg.patronus + 0.5], [0, 1, 1, 0])} />
        {t > lg.patronus - 0.3 ? <g opacity={kf(t, [lg.patronus - 0.3, lg.patronus + 0.3, lg.desmaya, lg.desmaya + 1], [0, 1, 1, 0.4])}><Stag x={900} y={1180} s={0.4} t={t} /></g> : null}
      </Svg>
    ),
    chars: [
      { who: "sirius", x: 640, y: 1450, s: 1.6, acts: [{ t: 0, rot: -90, dur: 0.001 }, { t: 0, expr: "sleep" }] },
      { who: "harry", x: 300, y: 1450, wand: true, acts: [{ t: lg.dementores, expr: "surprise" }, { t: lg.dementores + 0.5, pose: "cower" }, { t: lg.patronus, look: 0.9 }, { t: lg.patronus, expr: "surprise" }, { t: lg.desmaya, rot: -85, dur: 0.6 }, { t: lg.desmaya, expr: "sleep" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: lg.dementores, z: 1.0, y: 1000 }, { t: lg.patronus, z: 1.15, x: 760, y: 1100 }],
    sfx: [{ t: lg.dementores, s: "hiss", v: 0.7 }, { t: lg.dementores + 0.6, s: "rumble", v: 0.5 }, { t: lg.patronus, s: "sparkle", v: 0.8 }, { t: lg.patronus + 0.2, s: "chime", v: 0.6 }],
    overlay: ({ t }) => <Flash t={t} at={lg.patronus} dur={0.5} color="#e8f7ff" />,
  },

  giratiempo: {
    bg: Hospital,
    fx: ({ t }) => (
      <Svg>
        {t > gt.giratiempo - 0.3 ? <TimeTurner x={540} y={kf(t, [gt.giratiempo - 0.3, gt.giratiempo + 0.4], [1300, 700])} s={1.6} t={t} spin={t > gt.retroceden - 0.4 ? 1 : 0.2} /> : null}
        <Rewind t={t} t0={gt.retroceden - 0.2} dur={1.8} />
      </Svg>
    ),
    chars: [
      { who: "dumbledore", x: 860, y: 1440, facing: -1, acts: [{ t: gt.dumbledore - 0.6, walk: 860 }, { t: gt.dumbledore, pose: "talk", dur: 2.4 }, { t: gt.dumbledore, expr: "joy" }] },
      { who: "harry", x: 190, y: 1450, acts: [{ t: 0, expr: "sadness" }, { t: gt.giratiempo, expr: "surprise" }] },
      { who: "hermione", x: 400, y: 1440, acts: [{ t: gt.giratiempo - 0.4, pose: "hold", dur: 2 }, { t: gt.giratiempo, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: gt.giratiempo, z: 1.0, y: 900 }, { t: gt.retroceden, z: 1.3, x: 540, y: 850 }],
    sfx: [{ t: gt.giratiempo, s: "chime", v: 0.5 }, { t: gt.retroceden - 0.2, s: "whoosh", v: 0.7 }, { t: gt.retroceden + 0.2, s: "sparkle", v: 0.6 }, { t: gt.retroceden + 0.6, s: "rumble", v: 0.4 }],
  },

  rescate: {
    bg: Field,
    fx: ({ t }) => <Svg><Hippogriff x={kf(t, [0.5, D("rescate")], [760, -300])} y={1440} s={1} t={t} /></Svg>,
    chars: [
      { who: "harry", x: 520, y: 1450, acts: [{ t: rs.salvan - 0.4, walk: -300, run: true }, { t: 0, expr: "focus" }] },
      { who: "hermione", x: 340, y: 1440, acts: [{ t: rs.salvan - 0.3, walk: -400, run: true }, { t: 0, expr: "focus" }] },
    ],
    cam: [{ t: 0, z: 1.1, y: 1100 }, { t: 5.6, z: 1.0, y: 1100 }],
    sfx: [{ t: rs.salvan, s: "flutter", v: 0.6 }],
  },

  ciervo: {
    bg: NightCastle,
    fx: ({ t }) => (
      <Svg>
        {t < cv.huyen + 1 ? dementorRing(t, 380, 1150, 8, kf(t, [cv.ciervo, cv.huyen, cv.huyen + 1], [1, 1, 3]), 300) : null}
        {t > cv.ciervo - 0.3 ? <Stag x={kf(t, [cv.ciervo - 0.3, cv.huyen + 2], [700, 300])} y={1300} s={0.9} t={t} k={kf(t, [cv.ciervo - 0.3, cv.ciervo + 0.3], [0, 1])} /> : null}
      </Svg>
    ),
    chars: [
      { who: "harry", x: 820, y: 1450, facing: -1, wand: true, acts: [{ t: cv.padre, look: 0.9 }, { t: cv.padre, expr: "focus" }, { t: cv.mismo, expr: "surprise" }, { t: cv.ciervo - 0.5, pose: "wandAim" }, { t: cv.ciervo - 0.4, glow: 1 }, { t: cv.huyen, expr: "joy" }] },
      { who: "hermione", x: 980, y: 1440, facing: -1, acts: [{ t: cv.huyen, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: cv.mismo, z: 1.4, x: 820, y: 1000 }, { t: cv.ciervo, z: 1.0, x: 540, y: 1050 }],
    sfx: [{ t: cv.mismo, s: "chime", v: 0.4 }, { t: cv.ciervo - 0.3, s: "zap", v: 0.5 }, { t: cv.ciervo, s: "sparkle", v: 0.9 }, { t: cv.ciervo + 0.2, s: "fanfare", v: 0.5 }, { t: cv.huyen, s: "whoosh", v: 0.7 }],
    overlay: ({ t }) => <Flash t={t} at={cv.ciervo} dur={0.6} color="#e8f7ff" />,
  },

  libre: {
    bg: ({ t }) => <MoonNight t={t} />,
    fx: ({ t }) => (
      <Svg>
        <rect x={760} y={700} width={260} height={800} fill="#2a2066" stroke={INK} strokeWidth={6} />
        <rect x={830} y={820} width={110} height={150} fill="#ffd36b" stroke={INK} strokeWidth={5} />
        <Hippogriff x={kf(t, [0, lb2.torre, lb2.libre, D("libre")], [-200, 620, 620, 1400])} y={kf(t, [0, lb2.torre, lb2.libre, D("libre")], [1300, 1060, 1060, 600])} s={0.9} t={t} />
      </Svg>
    ),
    chars: [
      { who: "sirius", x: 880, y: 1000, s: 1.1, acts: [{ t: 0, expr: "sadness" }, { t: lb2.libre - 0.3, expr: "joy" }, { t: lb2.libre - 0.3, move: { x: 640, y: 900 }, dur: 0.4 }, { t: lb2.libre, move: { x: 1420, y: 440 }, dur: D("libre") - lb2.libre }, { t: lb2.libre, pose: "cheer" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: lb2.torre, z: 1.2, x: 760, y: 950 }, { t: lb2.libre, z: 1.0, x: 700, y: 900 }],
    sfx: [{ t: 0.3, s: "flutter", v: 0.6 }, { t: lb2.libre, s: "fanfare", v: 0.5 }, { t: lb2.libre + 0.3, s: "whoosh", v: 0.6 }],
  },

  final: {
    bg: Corridor,
    fx: ({ t }) => <Svg>{t > fn.escoba - 0.4 ? <Firebolt x={540} y={kf(t, [fn.escoba - 0.4, fn.escoba + 0.3], [400, 820])} s={1.1} r={-8} /> : null}</Svg>,
    chars: [
      { who: "ron", x: 180, y: 1440, acts: [{ t: fn.escoba, expr: "surprise" }, { t: fn.escoba + 0.6, pose: "cheer" }, { t: fn.escoba + 0.6, expr: "joy" }] },
      { who: "harry", x: 540, y: 1450, acts: [{ t: fn.escoba, expr: "surprise" }, { t: fn.familia - 0.3, expr: "joy" }, { t: fn.familia, pose: "cheer" }] },
      { who: "hermione", x: 880, y: 1440, facing: -1, acts: [{ t: fn.escoba + 0.6, expr: "joy" }, { t: fn.familia, pose: "cheer" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: fn.escoba, z: 1.0, y: 1000 }, { t: fn.familia, z: 1.0, y: 1100 }],
    sfx: [{ t: fn.escoba - 0.3, s: "sparkle", v: 0.6 }, { t: fn.familia, s: "chime", v: 0.5 }],
  },
};

export const p3full: PartSpec = { part: 0, title: "Harry Potter y el prisionero de Azkaban", dyn: true, scenes };
export const p3fullAudio = audio;
export { Snowfall, Spell };
