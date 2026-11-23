import { PartSpec, SceneSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { Svg } from "../scenes/bg1";
import { Bathroom, Classroom, Corridor, GreatHall, NightCastle, Pitch } from "../scenes/bg2";
import { Courtyard } from "../scenes/backgrounds/Courtyard";
import { Confetti, MiniStick, Question, Spell, Voldemort } from "../scenes/props";
import { Burrow, Diary } from "../peli2/assets";
import { Thought } from "../peli2/part1";
import { Grimmauld } from "../peli5/assets";
import { DarkMark } from "../peli4/assets";
import { Banner, Flash, switchAt, wordClock } from "../scenes/util";
import { Birds, Bridge, Cabinet, Cave, FireRing, Inferius, Locket, Office, Pensieve, PrinceBook, Ring, SevenPieces, TowerTop, Vial } from "./assets";
import audioData from "../data/p6full.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);
const D = (id: string) => (audio.scenes.find((s) => s.id === id)?.dur ?? 300) / 30;

const h = { libro: w("hook", "libro"), recuerdos: w("hook", "recuerdos"), torre: w("hook", "torre") };
const at = { puente: w("ataque", "puente"), bellatrix: w("ataque", "bellatrix"), madriguera: w("ataque", "madriguera") };
const sl = { slughorn: w("slughorn", "slughorn"), pociones: w("slughorn", "pociones"), coleccion: w("slughorn", "coleccion") };
const ju = { draco: w("juramento", "draco"), snape: w("juramento", "snape"), juramento: w("juramento", "juramento") };
const li = { libro: w("libro", "libro"), principe: w("libro", "principe"), suerte: w("libro", "suerte") };
const re = { pensadero: w("recuerdos", "pensadero"), tom: w("recuerdos", "tom"), miedo: w("recuerdos", "miedo") };
const la = { estrella: w("lavender", "estrella"), lavender: w("lavender", "lavender"), pajaros: w("lavender", "pajaros") };
const ve = { envenenada: w("veneno", "envenenada"), bezoar: w("veneno", "bezoar"), vida: w("veneno", "vida") };
const he = { draco: w("hechizo", "draco"), hechizo: w("hechizo", "hechizo"), herido: w("hechizo", "herido"), snape: w("hechizo", "snape"), esconde: w("hechizo", "esconde") };
const su = { suerte: w("suerte", "suerte"), slughorn: w("suerte", "slughorn"), horrocrux: w("suerte", "horrocruxes") };
const ho = { alma: w("horrocrux", "alma"), siete: w("horrocrux", "siete"), diario: w("horrocrux", "diario"), destruir: w("horrocrux", "destruir") };
const cu = { cueva: w("cueva", "cueva"), guardapelo: w("cueva", "guardapelo"), pocion: w("cueva", "pocion"), agua: w("cueva", "agua"), cadaveres: w("cueva", "cadaveres"), fuego: w("cueva", "fuego") };
const to = { armario: w("torre", "armario"), draco: w("torre", "draco"), desarma: w("torre", "desarma"), anima: w("torre", "anima") };
const sn = { snape: w("snape", "snape"), varita: w("snape", "varita"), rayo: w("snape", "rayo"), cae: w("snape", "cae") };
const pr = { persigue: w("principe", "persigue"), principe: w("principe", "principe"), escapa: w("principe", "escapa") };
const va = { varitas: w("varitas", "varitas"), luz: w("varitas", "luz") };
const fa = { falso: w("falso", "falso"), nota: w("falso", "nota") };
const fi = { decision: w("final", "decision"), ron: w("final", "ron") };

const scenes: Record<string, SceneSpec> = {
  hook: {
    bg: TowerTop,
    fx: ({ t }) => (
      <Svg>
        {t > h.libro - 0.3 && t < h.recuerdos ? <PrinceBook x={540} y={800} s={1.6} glow={1} /> : null}
        {t > h.recuerdos - 0.3 && t < h.torre ? <Pensieve x={540} y={1000} s={1.2} t={t} active={1} /> : null}
        {t > h.torre - 0.3 ? <DarkMark x={540} y={450} s={0.8} k={kf(t, [h.torre - 0.3, h.torre + 0.3], [0, 1])} /> : null}
      </Svg>
    ),
    chars: [{ who: "harry", x: 300, y: 1450, acts: [{ t: h.libro, expr: "focus" }, { t: h.torre, expr: "surprise" }, { t: h.torre, look: 0.9 }] }],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: D("hook"), z: 1.1, y: 1000 }],
    sfx: [{ t: h.libro, s: "paper", v: 0.5 }, { t: h.recuerdos, s: "chime", v: 0.5 }, { t: h.torre, s: "rumble", v: 0.6 }],
  },

  ataque: {
    bg: switchAt(at.bellatrix - 0.3, ({ t }) => <Bridge t={t} fall={kf(t, [at.puente + 0.2, at.puente + 1.4], [0, 1])} />, Burrow),
    fx: ({ t }) => (
      <Svg>
        {t < at.bellatrix - 0.3 ? [0, 1, 2].map((i) => <path key={i} d={`M ${200 + i * 300} ${200 + i * 80} Q ${360 + i * 200} ${600 + Math.sin(t * 4 + i) * 60} ${520} 1120`} stroke="#111" strokeWidth={50} fill="none" opacity={kf(t, [at.puente - 0.6, at.puente], [0, 0.85])} strokeLinecap="round" />) : null}
        {t > at.madriguera - 0.3 ? [0, 1, 2, 3].map((i) => <path key={i} d={`M ${150 + i * 260} 1280 Q ${200 + i * 260} ${900 - Math.abs(Math.sin(t * 8 + i)) * 150} ${250 + i * 260} 1280 Z`} fill={i % 2 ? "#ff8a1a" : "#ffd23a"} opacity={kf(t, [at.madriguera - 0.3, at.madriguera + 0.4], [0, 0.95])} />) : null}
      </Svg>
    ),
    chars: [
      { who: "bellatrix", x: 760, y: 1440, facing: -1, show: false, wand: true, acts: [{ t: at.bellatrix - 0.3, show: true }, { t: at.bellatrix - 0.3, expr: "joy" }, { t: at.madriguera - 0.4, pose: "wandAim", dur: 1.5 }, { t: at.madriguera - 0.3, glow: 1 }, { t: at.madriguera + 1.2, pose: "cheer" }] },
      { who: "ron", x: 260, y: 1450, show: false, acts: [{ t: at.bellatrix - 0.3, show: true }, { t: at.madriguera, expr: "surprise" }, { t: at.madriguera, pose: "cower" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: at.puente, z: 1.0, y: 1000 }, { t: at.bellatrix - 0.35, z: 1.0, y: 1000 }, { t: at.bellatrix - 0.3, z: 1.2, x: 700, y: 1100 }, { t: at.madriguera, z: 1.0, y: 1050 }],
    sfx: [{ t: at.puente, s: "whoosh", v: 0.6 }, { t: at.puente + 0.3, s: "crash", v: 0.8 }, { t: at.puente + 0.6, s: "boom", v: 0.6 }, { t: at.bellatrix, s: "cheer", v: 0.3 }, { t: at.madriguera, s: "fire", v: 0.8 }],
    shake: [[at.puente + 0.3, 0.8, 0.8]],
  },

  slughorn: {
    bg: Grimmauld,
    chars: [
      { who: "dumbledore", x: 140, y: 1440, acts: [{ t: 0.2, pose: "talk", dur: 2 }, { t: 0, expr: "joy" }] },
      { who: "harry", x: 320, y: 1450, acts: [{ t: sl.coleccion, expr: "surprise" }] },
      { who: "slughorn", x: 760, y: 1440, facing: -1, acts: [{ t: sl.slughorn, expr: "surprise" }, { t: sl.slughorn + 0.8, pose: "talk", dur: 2 }, { t: sl.pociones, expr: "joy" }, { t: sl.coleccion, pose: "point" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: sl.slughorn, z: 1.4, x: 740, y: 1050 }, { t: sl.coleccion, z: 1.1, x: 540, y: 1100 }],
    sfx: [{ t: sl.slughorn, s: "pop", v: 0.4 }, { t: sl.coleccion, s: "chime", v: 0.4 }],
  },

  juramento: {
    bg: ({ t }) => <Corridor t={t} dark />,
    fx: ({ t }) => (
      <Svg>
        {t > ju.juramento - 0.3 ? [0, 1, 2].map((i) => <ellipse key={i} cx={640} cy={1000} rx={kf(t, [ju.juramento - 0.3, ju.juramento + 0.8], [10, 160]) - i * 30} ry={30} fill="none" stroke="#ff4d4d" strokeWidth={8} opacity={0.8} transform={`rotate(${t * 120 + i * 60} 640 1000)`} />) : null}
      </Svg>
    ),
    chars: [
      { who: "draco", x: 300, y: 1440, acts: [{ t: ju.draco, expr: "sadness" }, { t: ju.draco, pose: "sad" }] },
      { who: "snape", x: 760, y: 1440, facing: -1, acts: [{ t: ju.snape, expr: "focus" }, { t: ju.juramento - 0.3, pose: "hold" }] },
      { who: "harry", x: -150, y: 1450, opacity: 0.6, acts: [{ t: ju.snape - 0.6, walk: 90 }, { t: ju.juramento, expr: "surprise" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ju.draco, z: 1.4, x: 320, y: 1050 }, { t: ju.juramento, z: 1.2, x: 640, y: 1050 }],
    sfx: [{ t: ju.juramento - 0.2, s: "zap", v: 0.5 }, { t: ju.juramento + 0.3, s: "sparkle", v: 0.5 }],
  },

  libro: {
    bg: ({ t }) => <Classroom t={t} dungeon />,
    fx: ({ t }) => <Svg>{t > li.libro - 0.3 && t < li.suerte - 0.4 ? <PrinceBook x={540} y={760} s={1.6} glow={t > li.principe ? 1 : 0.3} /> : null}{t > li.suerte - 0.4 ? <Vial x={540} y={780} s={2.2} /> : null}{t > li.suerte - 0.4 && t < li.suerte + 1.5 ? <Sparkles x={540} y={780} intensity={1.2} seed={6} count={18} /> : null}</Svg>,
    chars: [
      { who: "slughorn", x: 820, y: 1440, facing: -1, acts: [{ t: li.suerte - 0.8, pose: "cheer", dur: 1.6 }, { t: li.suerte - 0.8, expr: "joy" }] },
      { who: "harry", x: 300, y: 1450, acts: [{ t: li.libro, pose: "hold", dur: 2 }, { t: li.principe, expr: "surprise" }, { t: li.suerte - 0.8, expr: "joy" }, { t: li.suerte - 0.6, pose: "cheer" }] },
      { who: "hermione", x: 120, y: 1440, acts: [{ t: li.suerte - 0.8, expr: "anger" }, { t: li.suerte - 0.8, pose: "crossed" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: li.principe, z: 1.0, y: 900 }, { t: li.suerte, z: 1.0, y: 950 }],
    sfx: [{ t: li.libro, s: "paper", v: 0.5 }, { t: li.principe, s: "chime", v: 0.4 }, { t: li.suerte - 0.3, s: "fanfare", v: 0.5 }],
  },

  recuerdos: {
    bg: Office,
    under: ({ t }) => <Svg><Pensieve x={540} y={1440} s={1.2} t={t} active={kf(t, [re.pensadero, re.pensadero + 0.6], [0, 1])} /></Svg>,
    fx: ({ t }) => (
      <Svg>
        {t > re.tom - 0.4 ? (
          <g opacity={kf(t, [re.tom - 0.4, re.tom + 0.2], [0, 1])}>
            <circle cx={540} cy={640} r={260} fill="#d9c7a3" stroke={INK} strokeWidth={8} />
            <MiniStick x={540} y={820} s={0.8} color="#555" head="#f0e8e0" hair="#1a1a22" />
            {t > re.miedo - 0.2 ? <><circle cx={526} cy={545} r={6} fill="#ff2020" /><circle cx={554} cy={545} r={6} fill="#ff2020" /></> : null}
          </g>
        ) : null}
      </Svg>
    ),
    chars: [
      { who: "dumbledore", x: 820, y: 1440, facing: -1, acts: [{ t: re.pensadero, pose: "point", dur: 1.5 }, { t: 0, expr: "focus" }] },
      { who: "harry", x: 240, y: 1450, acts: [{ t: re.pensadero, expr: "surprise" }, { t: re.miedo, expr: "sadness" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: re.pensadero, z: 1.2, x: 540, y: 1200 }, { t: re.tom, z: 1.0, y: 900 }],
    sfx: [{ t: re.pensadero, s: "sparkle", v: 0.5 }, { t: re.tom - 0.3, s: "whoosh", v: 0.5 }, { t: re.miedo, s: "rumble", v: 0.5 }],
  },

  lavender: {
    bg: switchAt(la.lavender - 0.3, Pitch, () => <Courtyard />),
    fx: ({ t }) => <Svg><Birds t={t} t0={la.pajaros - 0.2} tx={420} ty={1050} />{t < la.lavender - 0.3 ? <Confetti t={t} t0={la.estrella} n={40} /> : null}</Svg>,
    chars: [
      { who: "ron", x: 420, y: 1450, acts: [{ t: la.estrella, pose: "cheer", dur: 2 }, { t: 0, expr: "joy" }, { t: la.pajaros + 0.4, pose: "cower" }, { t: la.pajaros + 0.4, expr: "surprise" }] },
      { who: "lavender", x: 620, y: 1440, facing: -1, show: false, acts: [{ t: la.lavender - 0.3, show: true }, { t: la.lavender - 0.3, expr: "joy" }, { t: la.lavender, pose: "wave", dur: 1.5 }] },
      { who: "hermione", x: 160, y: 1440, show: false, wand: true, acts: [{ t: la.lavender - 0.3, show: true }, { t: la.lavender, expr: "anger" }, { t: la.pajaros - 0.4, pose: "wandAim", dur: 1.2 }, { t: la.pajaros - 0.3, glow: 1 }, { t: la.pajaros + 0.8, glow: 0 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: la.lavender - 0.35, z: 1.0, y: 1100 }, { t: la.lavender - 0.3, z: 1.2, x: 520, y: 1100 }, { t: la.pajaros, z: 1.05, x: 400, y: 1100 }],
    sfx: [{ t: la.estrella, s: "cheer", v: 0.7 }, { t: la.lavender, s: "chime", v: 0.4 }, { t: la.pajaros - 0.2, s: "flutter", v: 0.8 }],
  },

  veneno: {
    bg: Corridor,
    chars: [
      { who: "slughorn", x: 860, y: 1440, facing: -1, acts: [{ t: ve.envenenada + 0.6, expr: "surprise" }, { t: ve.envenenada + 0.6, pose: "surprised" }] },
      { who: "ron", x: 540, y: 1450, holding: (t) => (t < ve.envenenada + 0.5 ? <Vial x={10} y={0} s={0.4} color="#c08aff" /> : null), acts: [{ t: 0.3, pose: "hold", dur: 1.4 }, { t: 0, expr: "joy" }, { t: ve.envenenada + 0.5, rot: -85, dur: 0.5 }, { t: ve.envenenada + 0.5, expr: "sleep" }, { t: ve.vida, expr: "joy" }] },
      { who: "harry", x: 240, y: 1450, acts: [{ t: ve.envenenada + 0.6, expr: "surprise" }, { t: ve.bezoar - 0.5, walk: 420, run: true }, { t: ve.bezoar, pose: "hold", dur: 1 }, { t: ve.vida, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ve.envenenada, z: 1.3, x: 540, y: 1150 }, { t: ve.bezoar, z: 1.4, x: 460, y: 1200 }],
    sfx: [{ t: ve.envenenada + 0.5, s: "boom", v: 0.5 }, { t: ve.bezoar, s: "pop", v: 0.5 }, { t: ve.vida, s: "chime", v: 0.5 }],
  },

  hechizo: {
    bg: Bathroom,
    fx: ({ t }) => <Svg><Spell t={t} t0={he.hechizo + 0.4} x0={300} y0={950} x1={760} y1={1000} color="#ff3b3b" dur={0.3} />{t > he.esconde - 0.2 ? <PrinceBook x={kf(t, [he.esconde - 0.2, he.esconde + 1], [400, 1300])} y={kf(t, [he.esconde - 0.2, he.esconde + 1], [1100, 700])} s={0.8} /> : null}</Svg>,
    chars: [
      { who: "harry", x: 260, y: 1450, wand: true, acts: [{ t: he.draco, expr: "anger" }, { t: he.hechizo + 0.2, pose: "wandAim", dur: 1 }, { t: he.hechizo + 0.3, glow: 1 }, { t: he.herido, glow: 0 }, { t: he.herido, expr: "surprise" }, { t: he.herido + 0.4, pose: "sad" }] },
      { who: "draco", x: 780, y: 1440, facing: -1, wand: true, acts: [{ t: he.draco, expr: "anger" }, { t: he.draco + 0.5, pose: "wandAim", dur: 1 }, { t: he.herido - 0.1, rot: 80, dur: 0.4 }, { t: he.herido - 0.1, expr: "sleep" }] },
      { who: "snape", x: 1300, y: 1440, acts: [{ t: he.snape - 0.6, walk: 940, run: true }, { t: he.snape + 0.2, face: -1 }, { t: he.snape + 0.2, expr: "anger" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: he.hechizo, z: 1.15, x: 520, y: 1050 }, { t: he.herido, z: 1.3, x: 740, y: 1150 }, { t: he.esconde, z: 1.05, x: 540, y: 1050 }],
    sfx: [{ t: he.hechizo + 0.3, s: "zap", v: 0.8 }, { t: he.herido, s: "boom", v: 0.5 }, { t: he.snape, s: "step", v: 0.6 }, { t: he.esconde, s: "whoosh", v: 0.4 }],
    shake: [[he.herido, 0.6]],
  },

  suerte: {
    bg: Corridor,
    fx: ({ t }) => (
      <Svg>
        {t < su.slughorn ? <Sparkles x={300} y={1000} intensity={1} seed={7} count={18} /> : null}
        {t > su.horrocrux - 0.3 ? <Thought x={540} y={520} k={kf(t, [su.horrocrux - 0.3, su.horrocrux + 0.2], [0, 1])}><MiniStick x={-60} y={110} s={0.5} color="#2a5a3a" head="#efe6dc" hair="#1a1a22" /><MiniStick x={70} y={110} s={0.55} color="#c39b55" head="#fdf1dc" /><text x={0} y={-30} textAnchor="middle" fontSize={44} fontFamily="Fredoka" fontWeight={700} fill="#c8102e">¿HORROCRUX?</text></Thought> : null}
      </Svg>
    ),
    chars: [
      { who: "harry", x: 300, y: 1450, holding: (t) => (t < su.suerte + 0.6 ? <Vial x={10} y={0} s={0.4} /> : null), acts: [{ t: su.suerte - 0.3, pose: "hold", dur: 1 }, { t: su.suerte + 0.6, expr: "joy" }, { t: su.suerte + 0.8, pose: "cheer", dur: 1.4 }] },
      { who: "slughorn", x: 760, y: 1440, facing: -1, acts: [{ t: su.slughorn, pose: "talk", dur: 2.5 }, { t: su.slughorn, expr: "sadness" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: su.suerte, z: 1.3, x: 360, y: 1050 }, { t: su.horrocrux, z: 1.0, y: 950 }],
    sfx: [{ t: su.suerte + 0.4, s: "sparkle", v: 0.7 }, { t: su.suerte + 0.8, s: "chime", v: 0.5 }, { t: su.horrocrux, s: "rumble", v: 0.6 }],
  },

  horrocrux: {
    bg: Office,
    fx: ({ t }) => (
      <Svg>
        {t > ho.siete - 0.3 ? <SevenPieces x={540} y={660} s={kf(t, [ho.siete - 0.3, ho.siete + 0.4], [0.3, 1])} t={t} done={t > ho.diario ? 2 : 0} /> : null}
        {t > ho.diario - 0.2 && t < ho.destruir ? <><Diary x={340} y={1100} s={0.7} hole /><Ring x={740} y={1100} s={1.2} /></> : null}
      </Svg>
    ),
    chars: [
      { who: "dumbledore", x: 820, y: 1440, facing: -1, acts: [{ t: ho.alma, pose: "talk", dur: 4 }, { t: 0, expr: "focus" }] },
      { who: "harry", x: 240, y: 1450, acts: [{ t: ho.siete, expr: "surprise" }, { t: ho.destruir, expr: "focus" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ho.siete, z: 1.0, y: 900 }],
    sfx: [{ t: ho.alma, s: "rumble", v: 0.5 }, { t: ho.siete, s: "boom", v: 0.5 }, { t: ho.diario, s: "crash", v: 0.4 }],
  },

  cueva: {
    bg: Cave,
    fx: ({ t }) => (
      <Svg>
        {t > cu.guardapelo - 0.3 ? <Locket x={540} y={1100} s={1} glow={1} /> : null}
        {t > cu.cadaveres - 0.5 ? [0, 1, 2, 3, 4, 5].map((i) => <Inferius key={i} x={100 + i * 180} y={kf(t, [cu.cadaveres - 0.5 + i * 0.1, cu.cadaveres + 0.8], [1700, 1450])} s={1} t={t} seed={i} />) : null}
        <FireRing t={t} k={kf(t, [cu.fuego - 0.2, cu.fuego + 0.4], [0, 1])} cx={540} cy={1380} />
      </Svg>
    ),
    chars: [
      { who: "dumbledore", x: 700, y: 1440, facing: -1, wand: true, holding: (t) => (t > cu.pocion - 0.2 && t < cu.agua ? <Vial x={10} y={0} s={0.4} color="#3fdc6b" /> : null), acts: [{ t: cu.pocion - 0.2, pose: "hold", dur: 2 }, { t: cu.pocion + 0.5, expr: "sadness" }, { t: cu.agua, pose: "sad", dur: 1.4 }, { t: cu.fuego - 0.4, pose: "wandUp" }, { t: cu.fuego - 0.3, glow: 1 }, { t: cu.fuego, expr: "anger" }] },
      { who: "harry", x: 360, y: 1450, acts: [{ t: cu.cueva, expr: "focus" }, { t: cu.cadaveres, expr: "surprise" }, { t: cu.cadaveres, pose: "cower" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: cu.pocion, z: 1.3, x: 680, y: 1050 }, { t: cu.cadaveres, z: 1.0, y: 1150 }],
    sfx: [{ t: cu.cueva, s: "splash", v: 0.4 }, { t: cu.guardapelo, s: "chime", v: 0.4 }, { t: cu.cadaveres, s: "splash", v: 0.7 }, { t: cu.cadaveres + 0.3, s: "hiss", v: 0.5 }, { t: cu.fuego, s: "fire", v: 0.9 }],
    shake: [[cu.fuego, 0.5, 1]],
  },

  torre: {
    bg: switchAt(to.draco + 0.5, ({ t }) => <Corridor t={t} dark />, TowerTop),
    under: ({ t }) => <Svg>{t < to.draco + 0.5 ? <Cabinet x={760} y={1300} s={1} open={kf(t, [to.armario - 0.3, to.armario + 0.4], [0, 1])} /> : null}</Svg>,
    fx: ({ t }) => <Svg><Spell t={t} t0={to.desarma - 0.2} x0={700} y0={950} x1={360} y1={950} color="#ff6b6b" /></Svg>,
    chars: [
      { who: "draco", x: 760, y: 1440, facing: -1, show: true, wand: true, acts: [{ t: to.armario, expr: "focus" }, { t: to.desarma - 0.4, pose: "wandAim", dur: 3 }, { t: to.desarma - 0.3, glow: 1 }, { t: to.desarma + 0.5, glow: 0 }, { t: to.anima, expr: "sadness" }] },
      { who: "dumbledore", x: 320, y: 1440, show: false, acts: [{ t: to.draco + 0.5, show: true }, { t: to.draco + 0.5, expr: "sadness" }, { t: to.desarma + 0.3, pose: "surprised", dur: 0.8 }, { t: to.anima, pose: "talk" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: to.armario, z: 1.3, x: 760, y: 1050 }, { t: to.draco + 0.45, z: 1.3, x: 760, y: 1050 }, { t: to.draco + 0.5, z: 1.0, y: 1100 }, { t: to.anima, z: 1.4, x: 700, y: 1000 }],
    sfx: [{ t: to.armario, s: "knock", v: 0.5 }, { t: to.armario + 0.3, s: "whoosh", v: 0.5 }, { t: to.desarma - 0.2, s: "zap", v: 0.6 }],
  },

  snape: {
    bg: TowerTop,
    fx: ({ t }) => <Svg><Spell t={t} t0={sn.rayo - 0.1} x0={900} y0={950} x1={420} y1={1000} color="#3fdc6b" dur={0.3} /></Svg>,
    chars: [
      { who: "dumbledore", x: 380, y: 1440, acts: [{ t: 0, expr: "sadness" }, { t: sn.rayo + 0.2, rot: -40, dur: 0.4 }, { t: sn.cae, move: { x: 200, y: 2400 }, dur: 1.4 }] },
      { who: "draco", x: 620, y: 1440, facing: -1, acts: [{ t: 0, expr: "sadness" }, { t: sn.rayo, expr: "surprise" }] },
      { who: "snape", x: 1300, y: 1440, facing: -1, wand: true, acts: [{ t: 0, walk: 880 }, { t: sn.snape, expr: "focus" }, { t: sn.varita - 0.2, pose: "wandAim", dur: 2 }, { t: sn.rayo - 0.2, glow: 1 }, { t: sn.rayo + 0.6, glow: 0 }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: sn.snape, z: 1.3, x: 860, y: 1050 }, { t: sn.rayo, z: 1.0, x: 540, y: 1100 }],
    sfx: [{ t: sn.snape, s: "rumble", v: 0.4 }, { t: sn.rayo - 0.1, s: "zap", v: 0.8 }, { t: sn.cae, s: "whoosh", v: 0.6 }],
    overlay: ({ t }) => <Flash t={t} at={sn.rayo} dur={0.5} color="#3fdc6b" />,
  },

  principe: {
    bg: NightCastle,
    fx: ({ t }) => <Svg><Spell t={t} t0={pr.persigue + 0.6} x0={300} y0={950} x1={760} y1={950} color="#ff6b6b" /><Spell t={t} t0={pr.persigue + 1.4} x0={300} y0={950} x1={760} y1={950} color="#ff6b6b" />{t > pr.principe - 0.3 && t < pr.escapa ? <PrinceBook x={540} y={600} s={1.3} glow={1} /> : null}</Svg>,
    chars: [
      { who: "harry", x: -150, y: 1450, wand: true, acts: [{ t: pr.persigue - 0.4, walk: 300, run: true }, { t: pr.persigue + 0.5, pose: "wandAim", dur: 1.6 }, { t: pr.persigue + 0.6, glow: 1 }, { t: pr.principe, glow: 0 }, { t: pr.persigue, expr: "anger" }, { t: pr.principe, expr: "surprise" }] },
      { who: "snape", x: 800, y: 1440, facing: -1, wand: true, acts: [{ t: pr.persigue + 0.6, pose: "wandUp", dur: 1.6 }, { t: 0, expr: "anger" }, { t: pr.principe, pose: "talk" }, { t: pr.escapa, walk: 1400, run: true }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: pr.principe, z: 1.0, y: 950 }],
    sfx: [{ t: pr.persigue + 0.6, s: "zap", v: 0.6 }, { t: pr.persigue + 1.4, s: "zap", v: 0.6 }, { t: pr.principe, s: "boom", v: 0.5 }, { t: pr.escapa, s: "whoosh", v: 0.5 }],
  },

  varitas: {
    bg: () => <Courtyard />,
    fx: ({ t }) => (
      <Svg>
        <DarkMark x={540} y={420} s={0.8} k={kf(t, [va.luz - 0.2, va.luz + 1.2], [1, 0])} />
        {t > va.varitas ? <circle cx={540} cy={420} r={kf(t, [va.varitas, va.luz + 1.5], [50, 700])} fill="#fff7c2" opacity={kf(t, [va.varitas, va.luz, va.luz + 2], [0, 0.4, 0])} /> : null}
      </Svg>
    ),
    chars: ["neville", "ron", "harry", "hermione", "mcgonagall"].map((who, i) => ({
      who: who as never,
      x: 110 + i * 215,
      y: 1440,
      wand: true,
      acts: [{ t: 0, expr: "sadness" as const }, { t: va.varitas + i * 0.15, pose: "wandUp" as const }, { t: va.varitas + i * 0.15, glow: 1 }],
    })),
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: va.luz, z: 1.0, y: 950 }],
    sfx: [{ t: va.varitas, s: "sparkle", v: 0.6 }, { t: va.luz, s: "chime", v: 0.6 }],
  },

  falso: {
    bg: Corridor,
    fx: ({ t }) => (
      <Svg>
        <Locket x={540} y={760} s={1.6} glow={0.3} />
        {t > fa.nota - 0.3 ? <g transform={`translate(540 ${kf(t, [fa.nota - 0.3, fa.nota + 0.3], [800, 600])})`}><rect x={-170} y={-90} width={340} height={180} fill="#f7ecd0" stroke={INK} strokeWidth={6} /><text x={0} y={20} textAnchor="middle" fontSize={64} fontFamily="Fredoka" fontWeight={700} fill="#1b1b2f">R.A.B.</text></g> : null}
        <Question t={t} x={540} y={420} t0={fa.falso} />
      </Svg>
    ),
    chars: [{ who: "harry", x: 300, y: 1450, acts: [{ t: fa.falso, expr: "surprise" }, { t: fa.nota, pose: "hold" }] }],
    cam: [{ t: 0, z: 1.05, y: 1050 }, { t: fa.nota, z: 1.0, y: 900 }],
    sfx: [{ t: fa.falso, s: "rumble", v: 0.4 }, { t: fa.nota, s: "paper", v: 0.6 }],
  },

  final: {
    bg: NightCastle,
    fx: ({ t }) => <Svg>{t > fi.decision ? <g opacity={kf(t, [fi.decision, fi.decision + 0.5, fi.ron, fi.ron + 0.5], [0, 1, 1, 0])}><SevenPieces x={540} y={600} s={0.7} t={t} done={3} /></g> : null}{t > fi.decision && t < fi.ron ? <g transform="translate(540 600) scale(0.3)"><Voldemort x={0} y={0} s={1} t={t} k={0.8} /></g> : null}</Svg>,
    chars: [
      { who: "ron", x: 260, y: 1440, show: false, acts: [{ t: fi.ron - 0.2, show: true }, { t: fi.ron, expr: "focus" }] },
      { who: "harry", x: 540, y: 1450, acts: [{ t: 0, expr: "focus" }, { t: fi.ron + 0.3, pose: "crossed" }] },
      { who: "hermione", x: 820, y: 1440, facing: -1, show: false, acts: [{ t: fi.ron, show: true }, { t: fi.ron, expr: "focus" }] },
    ],
    cam: [{ t: 0, z: 1.1, y: 1100 }, { t: D("final"), z: 1.0, y: 1150 }],
    sfx: [{ t: fi.decision, s: "rumble", v: 0.4 }, { t: fi.ron, s: "chime", v: 0.5 }],
  },
};

export const p6full: PartSpec = { part: 0, title: "Harry Potter y el misterio del príncipe", dyn: true, scenes };
export const p6fullAudio = audio;
export { GreatHall, Banner };
