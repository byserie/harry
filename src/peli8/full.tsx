import { PartSpec, SceneSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { Svg } from "../scenes/bg1";
import { Chamber, Corridor, Forest, GreatHall, NightCastle, Station, Vault } from "../scenes/bg2";
import { MiniStick, SortingHat, Snitch, Spell } from "../scenes/props";
import { Fang, SecretChamber, Sword } from "../peli2/assets";
import { RoomReq } from "../peli5/assets";
import { Pensieve } from "../peli6/assets";
import { BeamDuel, Dragon, Echo } from "../peli4/assets";
import { FireDragon } from "../peli5/assets";
import { Spider } from "../peli2/assets";
import { ElderWand } from "../peli7/assets";
import { Banner, Flash, switchAt, wordClock } from "../scenes/util";
import { Ashes, BrokenWand, Diadem, Dome, Giant, Shards, SmallCup, Statue, WhiteStation } from "./assets";
import audioData from "../data/p8full.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);
const D = (id: string) => (audio.scenes.find((s) => s.id === id)?.dur ?? 300) / 30;

const h = { banco: w("hook", "banco"), castillo: w("hook", "castillo"), snape: w("hook", "snape"), duelo: w("hook", "duelo") };
const ba = { disfraza: w("banco", "disfraza"), copa: w("banco", "copa"), multiplica: w("banco", "multiplica"), dragon: w("banco", "dragon") };
const ho = { diadema: w("hogwarts", "diadema"), pasadizo: w("hogwarts", "pasadizo"), neville: w("hogwarts", "neville") };
const sn = { snape: w("snape", "snape"), mcgonagall: w("snape", "mcgonagall"), huye: w("snape", "huye") };
const es = { escudo: w("escudo", "escudo"), estatuas: w("escudo", "estatuas") };
const bt = { batalla: w("batalla", "batalla"), gigantes: w("batalla", "gigantes"), rompe: w("batalla", "rompe") };
const ca = { colmillo: w("camara", "colmillo"), copa: w("camara", "copa"), explota: w("camara", "explota"), beso: w("camara", "beso") };
const di = { diadema: w("diadema", "diadema"), draco: w("diadema", "draco"), fuego: w("diadema", "fuego"), salva: w("diadema", "salva"), destruye: w("diadema", "destruye") };
const s2 = { nagini: w("snape2", "nagini"), muriendo: w("snape2", "muriendo"), lagrimas: w("snape2", "lagrimas") };
const re = { pensadero: w("recuerdos", "pensadero"), lily: w("recuerdos", "lily"), siempre: w("recuerdos", "siempre"), horrocrux: w("recuerdos", "horrocrux"), morir: w("recuerdos", "morir") };
const bo = { snitch: w("bosque", "snitch"), piedra: w("bosque", "piedra"), padres: w("bosque", "padres"), voldemort: w("bosque", "voldemort"), rayo: w("bosque", "rayo") };
const li = { blanco: w("limbo", "blanco"), dumbledore: w("limbo", "dumbledore"), volver: w("limbo", "volver") };
const ne = { rindan: w("neville", "rindan"), neville: w("neville", "neville"), espada: w("neville", "espada"), nagini: w("neville", "nagini") };
const du = { vivo: w("duelo", "vivo"), duelo: w("duelo", "duelo"), dueno: w("duelo", "dueno"), rebota: w("duelo", "rebota"), cenizas: w("duelo", "cenizas") };
const va = { rompe: w("varita", "rompe") };
const ep = { diecinueve: w("epilogo", "diecinueve"), hijos: w("epilogo", "hijos"), cicatriz: w("epilogo", "cicatriz"), bien: w("epilogo", "bien") };
const fi = { historia: w("final", "historia"), ocho: w("final", "ocho") };

const scenes: Record<string, SceneSpec> = {
  hook: {
    bg: NightCastle,
    fx: ({ t }) => (
      <Svg>
        {t > h.banco - 0.3 && t < h.castillo ? <Dragon x={kf(t, [h.banco - 0.3, h.castillo], [1300, 700])} y={900} s={0.7} t={t} fire={1} flip /> : null}
        <Dome t={t} k={kf(t, [h.castillo - 0.3, h.castillo + 0.3, h.snape, h.snape + 0.3], [0, 1, 1, 0])} />
        {t > h.duelo - 0.3 ? <BeamDuel t={t} x0={240} y0={900} x1={840} y1={900} k={kf(t, [h.duelo - 0.3, h.duelo + 0.3], [0, 1])} /> : null}
      </Svg>
    ),
    chars: [
      { who: "snape", x: 540, y: 1440, show: false, acts: [{ t: h.snape - 0.2, show: true }, { t: h.snape - 0.2, expr: "focus" }, { t: h.duelo - 0.3, show: false }] },
      { who: "harry", x: 200, y: 1450, wand: true, show: false, acts: [{ t: h.duelo - 0.3, show: true }, { t: h.duelo - 0.3, pose: "wandAim" }, { t: h.duelo, expr: "focus" }] },
      { who: "voldemort", x: 880, y: 1440, facing: -1, wand: true, show: false, acts: [{ t: h.duelo - 0.3, show: true }, { t: h.duelo - 0.3, pose: "wandAim" }, { t: h.duelo, expr: "anger" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: D("hook"), z: 1.1, y: 1050 }],
    sfx: [{ t: h.banco, s: "roar", v: 0.6 }, { t: h.castillo, s: "rumble", v: 0.5 }, { t: h.duelo, s: "zap", v: 0.7 }],
  },

  banco: {
    bg: Vault,
    fx: ({ t }) => (
      <Svg>
        <SmallCup x={540} y={kf(t, [ba.copa - 0.3, ba.copa + 0.3], [1000, 900])} s={1.4} glow={1} />
        {t > ba.multiplica - 0.2 && t < ba.dragon ? [0, 1, 2, 3, 4, 5].map((i) => <SmallCup key={i} x={200 + i * 140} y={1250 - ((t - ba.multiplica) * 300 + i * 40) % 300} s={0.6} glow={0.5} />) : null}
        {t > ba.dragon - 0.4 ? <Dragon x={kf(t, [ba.dragon - 0.4, D("banco")], [600, 700])} y={kf(t, [ba.dragon - 0.4, D("banco")], [1450, 600])} s={0.9} t={t} fire={kf(t, [ba.dragon, ba.dragon + 0.4], [0, 1])} flip /> : null}
      </Svg>
    ),
    chars: [
      { who: "bellatrix", x: 300, y: 1450, acts: [{ t: ba.disfraza, expr: "focus" }, { t: ba.dragon - 0.4, show: false }] },
      { who: "harry", x: 760, y: 1450, facing: -1, acts: [{ t: ba.copa, expr: "joy" }, { t: ba.multiplica, expr: "surprise" }, { t: ba.multiplica + 0.3, pose: "cower", dur: 1 }, { t: ba.dragon - 0.4, show: false }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ba.copa, z: 1.2, x: 540, y: 1050 }, { t: ba.dragon, z: 1.0, y: 1000 }],
    sfx: [{ t: ba.disfraza, s: "pop", v: 0.5 }, { t: ba.copa, s: "chime", v: 0.5 }, { t: ba.multiplica, s: "coins", v: 0.8 }, { t: ba.dragon, s: "roar", v: 0.8 }, { t: ba.dragon + 0.5, s: "crash", v: 0.7 }],
    shake: [[ba.dragon + 0.5, 0.8, 0.8]],
    overlay: ({ t }) => <Flash t={t} at={ba.disfraza} dur={0.3} color="#9ccf5a" />,
  },

  hogwarts: {
    bg: switchAt(ho.neville - 0.3, ({ t }) => <Corridor t={t} dark />, RoomReq),
    fx: ({ t }) => <Svg>{t > ho.diadema - 0.3 && t < ho.neville - 0.3 ? <Diadem x={540} y={700} s={2} glow={1} /> : null}</Svg>,
    chars: [
      { who: "harry", x: 300, y: 1450, acts: [{ t: ho.diadema, expr: "focus" }, { t: ho.neville, expr: "joy" }] },
      { who: "ron", x: 130, y: 1440, acts: [{ t: ho.neville, expr: "joy" }] },
      { who: "hermione", x: 470, y: 1440, acts: [{ t: ho.neville, expr: "joy" }] },
      { who: "neville", x: 800, y: 1450, facing: -1, show: false, acts: [{ t: ho.neville - 0.3, show: true }, { t: ho.neville, pose: "cheer", dur: 1.5 }, { t: ho.neville, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ho.diadema, z: 1.0, y: 900 }, { t: ho.neville, z: 1.2, x: 700, y: 1050 }],
    sfx: [{ t: ho.diadema, s: "chime", v: 0.4 }, { t: ho.pasadizo, s: "whoosh", v: 0.4 }, { t: ho.neville, s: "cheer", v: 0.5 }],
  },

  snape: {
    bg: GreatHall,
    fx: ({ t }) => <Svg><Spell t={t} t0={sn.mcgonagall + 0.3} x0={300} y0={950} x1={760} y1={950} color="#ff6b6b" />{t > sn.huye ? <g opacity={kf(t, [sn.huye, sn.huye + 1.5], [1, 0])}>{Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M ${900 + i * 10} 700 l 30 ${40 + i * 10} l -20 10 z`} fill="#bfefff" />)}</g> : null}</Svg>,
    chars: [
      { who: "harry", x: 140, y: 1450, acts: [{ t: sn.snape, expr: "anger" }, { t: sn.snape + 0.3, pose: "point", dur: 1.4 }] },
      { who: "mcgonagall", x: 320, y: 1440, wand: true, acts: [{ t: sn.mcgonagall, expr: "anger" }, { t: sn.mcgonagall + 0.2, pose: "wandAim", dur: 1.5 }, { t: sn.mcgonagall + 0.3, glow: 1 }, { t: sn.huye, glow: 0 }] },
      { who: "snape", x: 780, y: 1440, facing: -1, wand: true, acts: [{ t: sn.snape, expr: "focus" }, { t: sn.mcgonagall + 0.4, pose: "wandUp", dur: 1 }, { t: sn.huye - 0.2, move: { x: 1200, y: 900 }, dur: 0.6 }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: sn.mcgonagall, z: 1.0, y: 1050 }, { t: sn.huye, z: 1.1, x: 800, y: 1000 }],
    sfx: [{ t: sn.mcgonagall + 0.3, s: "zap", v: 0.7 }, { t: sn.huye, s: "crash", v: 0.7 }],
  },

  escudo: {
    bg: NightCastle,
    fx: ({ t }) => (
      <Svg>
        <Dome t={t} k={kf(t, [es.escudo - 0.3, es.escudo + 0.6], [0, 1])} />
        {t > es.estatuas - 0.3 ? [0, 1, 2, 3].map((i) => <Statue key={i} x={180 + i * 240} y={kf(t, [es.estatuas - 0.3 + i * 0.1, es.estatuas + 0.5], [1700, 1450])} s={1.4} t={t} />) : null}
      </Svg>
    ),
    chars: [{ who: "mcgonagall", x: 540, y: 1440, wand: true, acts: [{ t: es.escudo - 0.3, pose: "wandUp" }, { t: es.escudo - 0.2, glow: 1 }, { t: es.estatuas, expr: "joy" }] }],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: es.estatuas, z: 1.0, y: 1100 }],
    sfx: [{ t: es.escudo, s: "sparkle", v: 0.7 }, { t: es.estatuas, s: "rumble", v: 0.6 }],
  },

  batalla: {
    bg: NightCastle,
    fx: ({ t }) => (
      <Svg>
        <Dome t={t} k={1} broken={kf(t, [bt.rompe - 0.1, bt.rompe + 0.2], [0, 1])} />
        <Shards t={t} t0={bt.rompe} />
        {t > bt.gigantes - 0.3 ? <><Giant x={180} y={1480} s={2.6} t={t} /><Giant x={900} y={1480} s={2.4} t={t + 1} /></> : null}
        {t > bt.gigantes ? [0, 1, 2, 3].map((i) => <Spider key={i} x={kf(t, [bt.gigantes, D("batalla")], [-100 + i * 50, 1200 - i * 60])} y={1500 - (i % 2) * 30} s={2} t={t} />) : null}
        {[0, 1, 2, 3].map((i) => <Spell key={i} t={t} t0={bt.batalla + i * 0.5} x0={100 + i * 250} y0={1300} x1={540} y1={500} color={i % 2 ? "#3fdc6b" : "#ff3b3b"} />)}
      </Svg>
    ),
    chars: [],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: bt.rompe, z: 1.0, y: 900 }],
    sfx: [{ t: bt.batalla, s: "boom", v: 0.6 }, { t: bt.batalla + 0.5, s: "zap", v: 0.5 }, { t: bt.gigantes, s: "roar", v: 0.7 }, { t: bt.rompe, s: "crash", v: 0.9 }, { t: bt.rompe + 0.2, s: "boom", v: 0.7 }],
    shake: [[bt.rompe, 1, 1]],
    overlay: ({ t }) => <Flash t={t} at={bt.rompe} dur={0.4} color="#bfefff" />,
  },

  camara: {
    bg: SecretChamber,
    fx: ({ t }) => (
      <Svg>
        <SmallCup x={540} y={1430} s={1.2} glow={1} />
        {t > ca.colmillo - 0.3 && t < ca.explota ? <Fang x={420} y={1200} s={1} r={20} /> : null}
        {t > ca.explota - 0.2 && t < ca.explota + 1.5 ? <ellipse cx={540} cy={1200} rx={kf(t, [ca.explota - 0.2, ca.explota + 1], [50, 700])} ry={kf(t, [ca.explota - 0.2, ca.explota + 1], [100, 900])} fill="#5ad1ff" opacity={kf(t, [ca.explota - 0.2, ca.explota + 0.3, ca.explota + 1.5], [0, 0.6, 0])} /> : null}
        {t > ca.beso - 0.2 ? [0, 1, 2].map((i) => <text key={i} x={470 + i * 70} y={kf(t, [ca.beso - 0.2, ca.beso + 2], [900, 600]) - i * 30} fontSize={80} fill="#ff4f8b">♥</text>) : null}
      </Svg>
    ),
    chars: [
      { who: "ron", x: 380, y: 1450, acts: [{ t: ca.colmillo, pose: "hold", dur: 1.5 }, { t: ca.explota, expr: "surprise" }, { t: ca.beso - 0.3, move: { x: 480 }, dur: 0.3 }, { t: ca.beso, expr: "joy" }] },
      { who: "hermione", x: 720, y: 1440, facing: -1, acts: [{ t: ca.explota, expr: "surprise" }, { t: ca.beso - 0.3, move: { x: 620 }, dur: 0.3 }, { t: ca.beso, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ca.explota, z: 1.0, y: 1050 }, { t: ca.beso, z: 1.5, x: 550, y: 1000 }],
    sfx: [{ t: ca.colmillo, s: "pop", v: 0.4 }, { t: ca.explota, s: "splash", v: 0.9 }, { t: ca.explota + 0.2, s: "roar", v: 0.5 }, { t: ca.beso, s: "chime", v: 0.6 }],
    shake: [[ca.explota, 0.8, 0.8]],
  },

  diadema: {
    bg: RoomReq,
    fx: ({ t }) => (
      <Svg>
        {t < di.destruye ? <Diadem x={540} y={kf(t, [di.salva, di.destruye], [800, 1100])} s={1.2} glow={1} /> : null}
        {t > di.fuego - 0.3 ? <FireDragon x={kf(t, [di.fuego - 0.3, D("diadema")], [-200, 1300])} y={1150 + Math.sin(t * 3) * 120} s={2} t={t} /> : null}
        {t > di.fuego ? [0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${i * 240} 1300 Q ${i * 240 + 60} ${900 - Math.abs(Math.sin(t * 8 + i)) * 200} ${i * 240 + 120} 1300 Z`} fill={i % 2 ? "#ff8a1a" : "#ffd23a"} opacity={kf(t, [di.fuego, di.fuego + 0.6], [0, 0.9])} />) : null}
      </Svg>
    ),
    chars: [
      { who: "harry", x: 300, y: 1450, broom: false, acts: [{ t: di.diadema, expr: "joy" }, { t: di.draco, expr: "surprise" }, { t: di.salva - 0.3, move: { x: 600, y: 1000 }, dur: 0.6 }, { t: di.salva - 0.3, pose: "pointUp" }] },
      { who: "draco", x: 760, y: 1440, facing: -1, wand: true, acts: [{ t: di.draco, pose: "wandAim", dur: 1.5 }, { t: di.fuego + 0.3, expr: "surprise" }, { t: di.fuego + 0.3, pose: "cower" }, { t: di.salva, move: { x: 760, y: 1050 }, dur: 0.6 }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: di.fuego, z: 1.0, y: 1050 }, { t: di.salva, z: 1.0, y: 950 }],
    sfx: [{ t: di.diadema, s: "chime", v: 0.4 }, { t: di.fuego, s: "fire", v: 0.9 }, { t: di.fuego + 0.3, s: "roar", v: 0.6 }, { t: di.salva, s: "whoosh", v: 0.7 }, { t: di.destruye, s: "boom", v: 0.6 }],
    shake: [[di.fuego, 0.6, 2]],
  },

  snape2: {
    bg: ({ t }) => <Chamber t={t} tint="#141824" light="#5ad1ff" />,
    fx: ({ t }) => <Svg>{t > s2.lagrimas - 0.3 ? <g opacity={kf(t, [s2.lagrimas - 0.3, s2.lagrimas + 0.3], [0, 1])}><circle cx={520} cy={1280} r={50} fill="#bfefff" opacity={0.6} /><Sparkles x={520} y={1280} intensity={1} seed={3} count={12} color="#bfefff" /></g> : null}</Svg>,
    chars: [
      { who: "voldemort", x: 820, y: 1440, facing: -1, acts: [{ t: s2.nagini - 0.3, pose: "point", dur: 1.4 }, { t: 0, expr: "anger" }, { t: s2.muriendo - 0.5, walk: 1400 }] },
      { who: "snape", x: 540, y: 1450, s: 1.6, acts: [{ t: s2.nagini + 0.5, rot: -88, dur: 0.6 }, { t: s2.nagini + 0.5, expr: "sadness" }] },
      { who: "harry", x: -150, y: 1450, acts: [{ t: s2.muriendo - 0.6, walk: 280, run: true }, { t: s2.muriendo, expr: "sadness" }, { t: s2.lagrimas, pose: "cower" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: s2.muriendo, z: 1.3, x: 420, y: 1150 }, { t: s2.lagrimas, z: 1.5, x: 450, y: 1200 }],
    sfx: [{ t: s2.nagini, s: "hiss", v: 0.8 }, { t: s2.nagini + 0.4, s: "boom", v: 0.4 }, { t: s2.lagrimas, s: "chime", v: 0.5 }],
  },

  recuerdos: {
    bg: Corridor,
    under: ({ t }) => <Svg><Pensieve x={540} y={1440} s={1.2} t={t} active={1} /></Svg>,
    fx: ({ t }) => (
      <Svg>
        {t > re.lily - 0.3 ? <g opacity={kf(t, [re.lily - 0.3, re.lily + 0.3], [0, 1])}><circle cx={540} cy={620} r={260} fill="#e8dcc0" stroke={INK} strokeWidth={8} /><MiniStick x={460} y={800} s={0.8} color="#3a3f4a" head="#dfe2e8" hair="#16161c" /><MiniStick x={620} y={800} s={0.8} color="#2fae4f" head="#fde3df" hair="#c0392b" />{t > re.siempre ? <text x={540} y={500} textAnchor="middle" fontSize={70} fill="#ff4f8b">♥</text> : null}</g> : null}
        {t > re.horrocrux - 0.3 ? <g opacity={kf(t, [re.horrocrux - 0.3, re.horrocrux + 0.3], [0, 0.9])}><rect x={0} y={0} width={1080} height={1920} fill="#300" opacity={0.35} /></g> : null}
      </Svg>
    ),
    chars: [{ who: "harry", x: 260, y: 1450, acts: [{ t: re.pensadero, expr: "focus" }, { t: re.lily, expr: "surprise" }, { t: re.horrocrux, expr: "sadness" }, { t: re.morir, pose: "sad" }] }],
    cam: [{ t: 0, z: 1.05, y: 1150 }, { t: re.lily, z: 1.0, y: 900 }, { t: re.morir, z: 1.5, x: 300, y: 1000 }],
    sfx: [{ t: re.pensadero, s: "sparkle", v: 0.5 }, { t: re.lily, s: "chime", v: 0.5 }, { t: re.horrocrux, s: "rumble", v: 0.6 }],
  },

  bosque: {
    bg: Forest,
    fx: ({ t }) => (
      <Svg>
        {t > bo.snitch - 0.3 && t < bo.piedra + 0.5 ? <Snitch x={300} y={1050} s={1.4} t={t} /> : null}
        {t > bo.padres - 0.3 && t < bo.rayo ? (
          <>
            <Echo x={120} y={1450} s={1} color="#2f6fe4" head="#e3eeff" hair="#1e1e28" glasses k={1} t={t} />
            <Echo x={420} y={1450} s={1} color="#2fae4f" head="#fde3df" hair="#c0392b" k={1} t={t} />
            <Echo x={560} y={1450} s={1} color="#1f3a5f" head="#e6ecf3" hair="#141418" k={1} t={t} />
          </>
        ) : null}
        <Spell t={t} t0={bo.rayo - 0.1} x0={820} y0={950} x1={320} y1={1000} color="#3fdc6b" dur={0.3} />
      </Svg>
    ),
    chars: [
      { who: "harry", x: -150, y: 1450, acts: [{ t: 0.2, walk: 280 }, { t: bo.snitch, pose: "hold", dur: 1.5 }, { t: bo.padres, expr: "joy" }, { t: bo.voldemort, expr: "focus" }, { t: bo.rayo - 0.6, expr: "sleep" }, { t: bo.rayo + 0.1, rot: -88, dur: 0.6 }] },
      { who: "voldemort", x: 860, y: 1440, facing: -1, show: false, wand: true, acts: [{ t: bo.voldemort - 0.3, show: true }, { t: bo.rayo - 0.4, pose: "wandAim", dur: 1 }, { t: bo.rayo - 0.3, glow: 1 }, { t: bo.rayo + 0.6, glow: 0 }, { t: 0, expr: "anger" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: bo.padres, z: 1.0, y: 1100 }, { t: bo.rayo, z: 1.3, x: 400, y: 1150 }],
    sfx: [{ t: bo.snitch, s: "flutter", v: 0.4 }, { t: bo.piedra, s: "chime", v: 0.5 }, { t: bo.padres, s: "sparkle", v: 0.5 }, { t: bo.rayo - 0.1, s: "zap", v: 0.8 }],
    overlay: ({ t }) => <Flash t={t} at={bo.rayo} dur={0.6} color="#3fdc6b" />,
  },

  limbo: {
    bg: WhiteStation,
    chars: [
      { who: "harry", x: 300, y: 1450, acts: [{ t: li.blanco, expr: "surprise" }, { t: li.volver, expr: "focus" }] },
      { who: "dumbledore", x: 760, y: 1440, facing: -1, show: false, acts: [{ t: li.dumbledore - 0.3, show: true }, { t: li.dumbledore - 0.3, alpha: 0, dur: 0.001 }, { t: li.dumbledore - 0.2, alpha: 1, dur: 0.6 }, { t: li.dumbledore + 0.4, pose: "talk", dur: 3 }, { t: 0, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: li.dumbledore, z: 1.0, y: 1100 }, { t: li.volver, z: 1.3, x: 360, y: 1050 }],
    sfx: [{ t: li.blanco, s: "chime", v: 0.5 }, { t: li.volver, s: "sparkle", v: 0.4 }],
  },

  neville: {
    bg: NightCastle,
    fx: ({ t }) => (
      <Svg>
        {t > ne.espada - 0.4 && t < ne.espada + 0.3 ? <SortingHat x={300} y={1080} s={0.5} t={t} /> : null}
        {t > ne.nagini - 0.6 ? <g opacity={kf(t, [ne.nagini + 0.2, ne.nagini + 1.2], [1, 0])}><path d="M 700 1420 Q 780 1360 860 1420 T 1020 1420" stroke="#3f8f4a" strokeWidth={40} fill="none" strokeLinecap="round" /></g> : null}
      </Svg>
    ),
    chars: [
      { who: "hagrid", x: 900, y: 1460, s: 1.4, facing: -1, holding: () => <MiniStick x={0} y={0} s={0.3} color="#2f6fe4" head="#e3eeff" hair="#1e1e28" glasses />, acts: [{ t: 0, pose: "hold" }, { t: 0, expr: "sadness" }] },
      { who: "voldemort", x: 660, y: 1440, facing: -1, acts: [{ t: ne.rindan - 0.3, pose: "armsUp", dur: 1.6 }, { t: 0, expr: "joy" }, { t: ne.nagini, expr: "surprise" }] },
      { who: "neville", x: 200, y: 1450, holding: (t) => (t > ne.espada ? <Sword x={0} y={0} s={0.4} r={180} glow={1} /> : null), acts: [{ t: ne.neville, walk: 340 }, { t: ne.neville + 0.6, expr: "anger" }, { t: ne.espada, pose: "wandUp", dur: 1 }, { t: ne.nagini - 0.4, walk: 600, run: true }, { t: ne.nagini, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ne.neville, z: 1.3, x: 300, y: 1050 }, { t: ne.nagini, z: 1.15, x: 640, y: 1100 }],
    sfx: [{ t: ne.rindan, s: "rumble", v: 0.5 }, { t: ne.espada, s: "sparkle", v: 0.7 }, { t: ne.nagini, s: "boom", v: 0.7 }, { t: ne.nagini + 0.3, s: "cheer", v: 0.6 }],
    shake: [[ne.nagini, 0.6]],
  },

  duelo: {
    bg: GreatHall,
    fx: ({ t }) => (
      <Svg>
        {t > du.duelo - 0.3 && t < du.cenizas ? <BeamDuel t={t} x0={300} y0={900} x1={780} y1={900} k={kf(t, [du.duelo - 0.3, du.duelo + 0.3, du.rebota, du.rebota + 0.3], [0, 1, 1, 0])} /> : null}
        {t > du.dueno - 0.3 && t < du.rebota ? <ElderWand x={540} y={600} s={1.4} glow={1} /> : null}
        <Ashes t={t} t0={du.cenizas - 0.2} x={800} y={1440} />
      </Svg>
    ),
    chars: [
      { who: "harry", x: 280, y: 1450, wand: true, acts: [{ t: du.vivo - 0.4, expr: "focus" }, { t: du.duelo - 0.3, pose: "wandAim" }, { t: du.duelo - 0.2, glow: 1 }, { t: du.cenizas, expr: "joy" }, { t: du.cenizas + 0.5, glow: 0 }] },
      { who: "voldemort", x: 800, y: 1440, facing: -1, wand: true, acts: [{ t: du.vivo, expr: "surprise" }, { t: du.duelo - 0.3, pose: "wandAim" }, { t: du.duelo - 0.2, glow: 1 }, { t: du.dueno, expr: "anger" }, { t: du.cenizas - 0.3, alpha: 0, dur: 0.8 }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: du.duelo, z: 1.0, y: 1000 }, { t: du.rebota, z: 1.3, x: 700, y: 1050 }, { t: du.cenizas, z: 1.0, x: 540, y: 1100 }],
    sfx: [{ t: du.vivo, s: "cheer", v: 0.5 }, { t: du.duelo, s: "zap", v: 0.8 }, { t: du.duelo + 0.3, s: "rumble", v: 0.6 }, { t: du.rebota, s: "boom", v: 0.9 }, { t: du.cenizas, s: "whoosh", v: 0.6 }],
    shake: [[du.duelo, 0.4, 2], [du.rebota, 1, 0.8]],
    overlay: ({ t }) => <Flash t={t} at={du.rebota} dur={0.5} />,
  },

  varita: {
    bg: NightCastle,
    fx: ({ t }) => <Svg><BrokenWand x={540} y={900} s={2} k={kf(t, [va.rompe, va.rompe + 1.5], [0, 1])} /></Svg>,
    chars: [{ who: "harry", x: 300, y: 1450, acts: [{ t: 0, expr: "focus" }, { t: va.rompe, pose: "hold", dur: 0.6 }, { t: va.rompe + 1, expr: "joy" }] }],
    cam: [{ t: 0, z: 1.05, y: 1050 }],
    sfx: [{ t: va.rompe, s: "crash", v: 0.6 }],
  },

  epilogo: {
    bg: Station,
    fx: ({ t }) => <Svg>{t > ep.hijos - 0.3 ? [0, 1, 2].map((i) => <MiniStick key={i} x={420 + i * 120} y={1450} s={0.9} color={["#2f6fe4", "#2fae4f", "#8a4fe0"][i]} head="#fff0e0" hair={["#1e1e28", "#e0662a", "#7a4a2a"][i]} arms="wave" t={t + i} />) : null}</Svg>,
    chars: [
      { who: "harry", x: 110, y: 1450, s: 1.7, acts: [{ t: 0, expr: "joy" }, { t: ep.hijos, pose: "wave", dur: 3 }, { t: ep.cicatriz, look: 0.2 }] },
      { who: "ginny", x: 260, y: 1440, s: 1.7, acts: [{ t: 0, expr: "joy" }] },
      { who: "ron", x: 820, y: 1450, s: 1.7, facing: -1, acts: [{ t: 0, expr: "joy" }, { t: ep.hijos, pose: "wave", dur: 3 }] },
      { who: "hermione", x: 970, y: 1440, s: 1.7, facing: -1, acts: [{ t: 0, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: ep.cicatriz, z: 1.4, x: 140, y: 1000 }, { t: ep.bien, z: 1.0, y: 1100 }],
    sfx: [{ t: ep.diecinueve, s: "chime", v: 0.5 }, { t: ep.hijos + 1, s: "whistle", v: 0.5 }, { t: ep.bien, s: "fanfare", v: 0.5 }],
    overlay: ({ t }) => <Banner t={t} text="19 años después" t0={ep.diecinueve} t1={ep.diecinueve + 2.2} />,
  },

  final: {
    bg: NightCastle,
    fx: ({ t }) => <Svg><Sparkles x={540} y={500} intensity={1.2} seed={11} count={24} /></Svg>,
    chars: [
      { who: "ron", x: 230, y: 1440, acts: [{ t: 0, expr: "joy" }, { t: fi.ocho, pose: "wave", dur: 3 }] },
      { who: "harry", x: 540, y: 1450, acts: [{ t: 0, expr: "joy" }, { t: fi.historia, pose: "wave", dur: 3 }] },
      { who: "hermione", x: 850, y: 1440, facing: -1, acts: [{ t: 0, expr: "joy" }, { t: fi.ocho, pose: "wave", dur: 3 }] },
    ],
    cam: [{ t: 0, z: 1.1, y: 1100 }, { t: D("final"), z: 1.0, y: 1150 }],
    sfx: [{ t: fi.historia, s: "chime", v: 0.5 }],
  },
};

export const p8full: PartSpec = { part: 0, title: "Harry Potter y las reliquias de la muerte (parte 2)", dyn: true, scenes };
export const p8fullAudio = audio;
