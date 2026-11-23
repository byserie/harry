import { PartSpec, SceneSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { Svg } from "../scenes/bg1";
import { Bathroom, Chamber, Classroom, Corridor, GreatHall, NightCastle, Pitch } from "../scenes/bg2";
import { Confetti, Cup, Hooded, Question, Spell, Voldemort } from "../scenes/props";
import { Spider } from "../peli2/assets";
import { Trunk } from "../peli3/assets";
import { Banner, Flash, switchAt, wordClock } from "../scenes/util";
import { BeamDuel, BigCauldron, Camp, Carriage, DarkMark, Dragon, Echo, GobletFire, GoldenEgg, Graveyard, Hostage, Maze, NameSlip, Ship, Stadium, Underwater } from "./assets";
import audioData from "../data/p4full.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);
const D = (id: string) => (audio.scenes.find((s) => s.id === id)?.dur ?? 300) / 30;

const h = { torneo: w("hook", "torneo"), nombre: w("hook", "nombre"), voldemort: w("hook", "voldemort") };
const mu = { mundial: w("mundial", "mundial"), mortifagos: w("mundial", "mortifagos"), calavera: w("mundial", "calavera") };
const to = { torneo: w("torneo", "torneo"), beaux: w("torneo", "beauxbatons"), durm: w("torneo", "durmstrang") };
const mo = { moody: w("moody", "moody"), ojo: w("moody", "ojo"), maldiciones: w("moody", "maldiciones"), arana: w("moody", "arana") };
const ca = { caliz: w("caliz", "caliz"), fleur: w("caliz", "fleur"), krum: w("caliz", "krum"), cedric: w("caliz", "cedric"), cuarto: w("caliz", "cuarto"), harry: w("caliz", "harry") };
const en = { nadie: w("enojo", "nadie"), ron: w("enojo", "ron"), solo: w("enojo", "solo") };
const dg = { dragon: w("dragon", "dragon"), escoba: w("dragon", "escoba"), persigue: w("dragon", "persigue"), atrapa: w("dragon", "atrapa") };
const am = { perdon: w("amigos", "perdon") };
const ba = { baile: w("baile", "baile"), hermione: w("baile", "hermione"), celos: w("baile", "celos") };
const hu = { grita: w("huevo", "grita"), agua: w("huevo", "agua"), canta: w("huevo", "canta") };
const la = { branquias: w("lago", "branquias"), ron: w("lago", "ron"), fleur: w("lago", "fleur"), ultimo: w("lago", "ultimo") };
const lb = { laberinto: w("laberinto", "laberinto"), krum: w("laberinto", "krum"), salva: w("laberinto", "salva"), copa: w("laberinto", "copa"), tocarla: w("laberinto", "tocarla") };
const tr = { trampa: w("traslador", "trampa"), cementerio: w("traslador", "cementerio") };
const ce = { colagusano: w("cedric", "colagusano"), rayo: w("cedric", "rayo"), cedric: w("cedric", "cedric") };
const ri = { lapida: w("ritual", "lapida"), caldero: w("ritual", "caldero"), sangre: w("ritual", "sangre"), explota: w("ritual", "explota"), voldemort: w("ritual", "voldemort") };
const mf = { marca: w("mortifagos", "marca"), mortifagos: w("mortifagos", "mortifagos"), lucius: w("mortifagos", "lucius"), duelo: w("mortifagos", "duelo") };
const du = { dorado: w("duelo", "dorado"), padres: w("duelo", "padres"), copa: w("duelo", "copa"), escapa: w("duelo", "escapa") };
const m2 = { confiesa: w("moody2", "confiesa"), dumbledore: w("moody2", "dumbledore"), impostor: w("moody2", "impostor"), baul: w("moody2", "baul") };
const fi = { volvio: w("final", "volvio"), cedric: w("final", "cedric"), guerra: w("final", "guerra") };

const deathEaters = (t: number, k: number) => (
  <>
    {[180, 360, 760, 920].map((x, i) => (
      <g key={i} opacity={k}>
        <Hooded x={x} y={1440} s={0.85} t={t + i} />
      </g>
    ))}
  </>
);

const scenes: Record<string, SceneSpec> = {
  hook: {
    bg: Graveyard,
    fx: ({ t }) => (
      <Svg>
        {t > h.torneo - 0.3 && t < h.nombre ? <g opacity={kf(t, [h.torneo - 0.3, h.torneo + 0.2], [0, 1])}><GobletFire x={540} y={1300} s={1.2} t={t} burst={0.4} /></g> : null}
        {t > h.nombre - 0.2 && t < h.voldemort ? <NameSlip x={540} y={kf(t, [h.nombre - 0.2, h.nombre + 0.6], [1000, 700])} s={1.3} name="Harry Potter" r={Math.sin(t * 3) * 6} /> : null}
        {t > h.voldemort - 0.4 ? <DarkMark x={540} y={520} s={kf(t, [h.voldemort - 0.4, h.voldemort + 0.4], [0.3, 1.1])} k={kf(t, [h.voldemort - 0.4, h.voldemort], [0, 1])} /> : null}
      </Svg>
    ),
    chars: [{ who: "harry", x: 280, y: 1450, acts: [{ t: 3, look: 0.9 }, { t: h.nombre, expr: "surprise" }, { t: h.voldemort, pose: "cower" }] }],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: h.voldemort, z: 1.0, y: 950 }, { t: D("hook"), z: 1.1, y: 950 }],
    sfx: [{ t: h.torneo, s: "fire", v: 0.5 }, { t: h.nombre, s: "paper", v: 0.5 }, { t: h.voldemort, s: "rumble", v: 0.7 }, { t: h.voldemort + 0.3, s: "roar", v: 0.4 }],
    shake: [[h.voldemort, 0.6, 1]],
  },

  mundial: {
    bg: switchAt(mu.mortifagos - 0.4, Stadium, ({ t }) => <Camp t={t} />),
    fx: ({ t }) => (
      <Svg>
        {t > mu.mortifagos - 0.4 ? deathEaters(t, kf(t, [mu.mortifagos - 0.4, mu.mortifagos + 0.4], [0, 1])) : null}
        {t > mu.calavera - 0.4 ? <DarkMark x={540} y={430} s={kf(t, [mu.calavera - 0.4, mu.calavera + 0.4], [0.3, 1])} k={kf(t, [mu.calavera - 0.4, mu.calavera], [0, 1])} /> : null}
      </Svg>
    ),
    chars: [
      { who: "ron", x: 330, y: 1440, acts: [{ t: 0, expr: "joy" }, { t: mu.mundial, pose: "cheer", dur: 3 }, { t: mu.mortifagos - 0.4, show: false }] },
      { who: "harry", x: 540, y: 1450, acts: [{ t: 0, expr: "joy" }, { t: mu.mundial + 0.3, pose: "cheer", dur: 3 }, { t: mu.mortifagos - 0.4, show: false }] },
      { who: "hermione", x: 750, y: 1440, acts: [{ t: 0, expr: "joy" }, { t: mu.mundial + 0.5, pose: "cheer", dur: 3 }, { t: mu.mortifagos - 0.4, show: false }] },
      { who: "harry", x: 540, y: 1460, show: false, acts: [{ t: mu.mortifagos - 0.4, show: true }, { t: mu.mortifagos - 0.4, expr: "surprise" }, { t: mu.calavera, pose: "pointUp" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: mu.mortifagos - 0.45, z: 1.1, y: 1050 }, { t: mu.mortifagos - 0.4, z: 1.0, y: 1100 }, { t: mu.calavera, z: 1.0, y: 900 }],
    sfx: [{ t: 0.3, s: "cheer", v: 0.7 }, { t: 2, s: "pop", v: 0.4 }, { t: mu.mortifagos - 0.4, s: "rumble", v: 0.6 }, { t: mu.mortifagos, s: "fire", v: 0.5 }, { t: mu.calavera, s: "boom", v: 0.6 }],
    overlay: ({ t }) => <Banner t={t} text="Mundial de quidditch" t0={0.3} t1={2.4} color="#7dff9a" />,
  },

  torneo: {
    bg: NightCastle,
    fx: ({ t }) => (
      <Svg>
        {t > to.beaux - 0.6 ? <Carriage x={kf(t, [to.beaux - 0.6, to.beaux + 1.5], [1400, 620])} y={kf(t, [to.beaux - 0.6, to.beaux + 1.5], [300, 620])} s={0.9} t={t} /> : null}
        {t > to.durm - 0.5 ? <Ship x={540} y={1250} s={1} t={t} rise={kf(t, [to.durm - 0.5, to.durm + 1.5], [0, 1])} /> : null}
      </Svg>
    ),
    chars: [{ who: "dumbledore", x: 160, y: 1440, acts: [{ t: to.torneo - 0.3, pose: "armsUp", dur: 2 }, { t: 0, expr: "joy" }] }],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: to.beaux, z: 1.0, y: 800 }, { t: to.durm, z: 1.0, y: 1100 }],
    sfx: [{ t: to.torneo, s: "fanfare", v: 0.6 }, { t: to.beaux - 0.5, s: "flutter", v: 0.6 }, { t: to.durm - 0.4, s: "splash", v: 0.7 }, { t: to.durm + 0.4, s: "rumble", v: 0.5 }],
    overlay: ({ t }) => <Banner t={t} text="Torneo de los Tres Magos" t0={to.torneo} t1={to.torneo + 2.2} />,
  },

  moody: {
    bg: Classroom,
    fx: ({ t }) => <Svg>{t > mo.arana - 0.3 ? <Spider x={560} y={kf(t, [mo.arana - 0.3, mo.arana + 0.4], [1200, 1000])} s={3} t={t} /> : null}{t > mo.arana + 0.6 ? <Sparkles x={560} y={1000} intensity={1} seed={3} count={12} color="#3fdc6b" /> : null}</Svg>,
    chars: [
      { who: "moody", x: 1300, y: 1440, wand: true, acts: [{ t: 0.1, walk: 820 }, { t: mo.moody + 0.4, face: -1 }, { t: mo.ojo, expr: "focus" }, { t: mo.maldiciones, expr: "anger" }, { t: mo.arana, pose: "wandAim" }, { t: mo.arana + 0.2, glow: 1 }] },
      { who: "harry", x: 230, y: 1450, acts: [{ t: mo.moody + 0.4, expr: "surprise" }, { t: mo.arana + 0.6, pose: "cower" }] },
      { who: "ron", x: 60, y: 1450, acts: [{ t: mo.arana, expr: "surprise" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: mo.ojo, z: 1.7, x: 820, y: 920 }, { t: mo.maldiciones, z: 1.05, x: 600, y: 1100 }],
    sfx: [{ t: 0.3, s: "knock", v: 0.4 }, { t: mo.ojo, s: "zap", v: 0.3 }, { t: mo.arana + 0.2, s: "zap", v: 0.5 }],
  },

  caliz: {
    bg: GreatHall,
    fx: ({ t }) => {
      const burstAt = [ca.fleur, ca.krum, ca.cedric, ca.harry].map((x) => x - 0.5);
      const b = Math.max(...burstAt.map((x) => kf(t, [x, x + 0.2, x + 0.8], [0, 1, 0])));
      return (
        <Svg>
          <GobletFire x={540} y={1300} s={1.3} t={t} burst={b} color={t > ca.cuarto ? "#ff5a3c" : "#5ad1ff"} />
          {[["Fleur", ca.fleur], ["Krum", ca.krum], ["Cedric", ca.cedric], ["Harry Potter", ca.harry]].map(([n, at], i) =>
            t > (at as number) - 0.4 && t < (at as number) + 1.6 ? <NameSlip key={i} x={540} y={kf(t, [(at as number) - 0.4, (at as number) + 0.3], [900, 600])} s={1.2} name={n as string} r={Math.sin(t * 4) * 8} /> : null,
          )}
        </Svg>
      );
    },
    chars: [
      { who: "fleur", x: 120, y: 1440, show: false, acts: [{ t: ca.fleur, show: true }, { t: ca.fleur, expr: "joy" }] },
      { who: "krum", x: 280, y: 1450, show: false, acts: [{ t: ca.krum, show: true }, { t: ca.krum, expr: "focus" }] },
      { who: "cedric", x: 820, y: 1440, show: false, facing: -1, acts: [{ t: ca.cedric, show: true }, { t: ca.cedric, expr: "joy" }] },
      { who: "harry", x: 960, y: 1450, facing: -1, acts: [{ t: ca.harry, expr: "surprise" }, { t: ca.harry, pose: "surprised" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ca.caliz, z: 1.2, x: 540, y: 1050 }, { t: ca.cuarto, z: 1.0, x: 540, y: 950 }, { t: ca.harry + 0.5, z: 1.4, x: 900, y: 1000 }],
    sfx: [{ t: ca.fleur - 0.5, s: "fire", v: 0.5 }, { t: ca.krum - 0.5, s: "fire", v: 0.5 }, { t: ca.cedric - 0.5, s: "fire", v: 0.5 }, { t: ca.cuarto, s: "rumble", v: 0.6 }, { t: ca.harry - 0.5, s: "boom", v: 0.7 }],
    shake: [[ca.harry - 0.5, 0.8]],
  },

  enojo: {
    bg: Corridor,
    chars: [
      { who: "draco", x: 820, y: 1440, facing: -1, acts: [{ t: en.nadie, pose: "point", dur: 2 }, { t: en.nadie, expr: "joy" }] },
      { who: "ron", x: 580, y: 1440, facing: -1, acts: [{ t: en.ron, expr: "anger" }, { t: en.ron, pose: "crossed" }, { t: en.ron + 0.8, walk: 1400 }] },
      { who: "harry", x: 300, y: 1450, acts: [{ t: en.nadie, expr: "sadness" }, { t: en.solo - 0.3, pose: "sad" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: en.ron, z: 1.3, x: 500, y: 1050 }, { t: en.solo, z: 1.6, x: 300, y: 1000 }],
    sfx: [{ t: en.ron, s: "zap", v: 0.3 }],
  },

  dragon: {
    bg: ({ t }) => <Pitch t={t} />,
    fx: ({ t }) => (
      <Svg>
        <Dragon x={kf(t, [0, dg.persigue, dg.persigue + 2.5], [700, 600, 520])} y={kf(t, [dg.persigue, dg.persigue + 1], [1440, 900])} s={kf(t, [dg.persigue, dg.persigue + 1], [1, 0.7])} t={t} fire={kf(t, [dg.dragon, dg.dragon + 0.3, dg.dragon + 1.4, dg.dragon + 1.8], [0, 1, 1, 0])} flip />
        {t < dg.atrapa ? <GoldenEgg x={820} y={1430} s={1} /> : null}
      </Svg>
    ),
    chars: [
      {
        who: "harry",
        x: 220,
        y: 1450,
        broom: true,
        holding: (t) => (t > dg.atrapa ? <GoldenEgg x={10} y={0} s={0.45} /> : null),
        wand: true,
        acts: [
          { t: dg.escoba - 0.4, pose: "wandUp", dur: 0.8 },
          { t: dg.escoba, wand: false },
          { t: dg.escoba + 0.3, move: { x: 300, y: 1000 }, dur: 0.6 },
          { t: dg.persigue, move: { x: 900, y: 700 }, dur: 1.2 },
          { t: dg.atrapa - 0.6, move: { x: 820, y: 1300 }, dur: 0.6 },
          { t: dg.atrapa, expr: "joy" },
          { t: dg.atrapa + 0.2, pose: "cheer" },
        ],
      },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: dg.dragon, z: 1.1, x: 600, y: 1050 }, { t: dg.persigue, z: 1.0, x: 600, y: 950 }, { t: dg.atrapa, z: 1.25, x: 820, y: 1100 }],
    sfx: [{ t: dg.dragon, s: "roar", v: 0.8 }, { t: dg.dragon + 0.2, s: "fire", v: 0.7 }, { t: dg.escoba, s: "whoosh", v: 0.6 }, { t: dg.persigue, s: "crash", v: 0.6 }, { t: dg.persigue + 0.4, s: "roar", v: 0.6 }, { t: dg.atrapa, s: "cheer", v: 0.7 }],
    shake: [[dg.dragon, 0.6], [dg.persigue, 0.7]],
  },

  amigos: {
    bg: Corridor,
    chars: [
      { who: "ron", x: 1300, y: 1440, acts: [{ t: 0.1, walk: 640 }, { t: 1.5, face: -1 }, { t: am.perdon - 0.2, pose: "sad", dur: 1 }, { t: am.perdon - 0.2, expr: "sadness" }, { t: am.perdon + 1, expr: "joy" }, { t: am.perdon + 1.2, pose: "cheer" }] },
      { who: "harry", x: 380, y: 1450, acts: [{ t: am.perdon + 1, expr: "joy" }, { t: am.perdon + 1.2, pose: "cheer" }] },
    ],
    cam: [{ t: 0, z: 1.1, y: 1100 }, { t: am.perdon + 1, z: 1.25, x: 520, y: 1050 }],
    sfx: [{ t: am.perdon + 1, s: "chime", v: 0.5 }],
  },

  baile: {
    bg: GreatHall,
    fx: ({ t }) => <Svg><Confetti t={t} t0={ba.hermione} n={40} colors={["#ffffff", "#bfefff", "#ffd6f5"]} /></Svg>,
    chars: [
      { who: "harry", x: 160, y: 1450, acts: [{ t: ba.baile, expr: "sadness" }, { t: ba.hermione, expr: "surprise" }] },
      { who: "ron", x: 320, y: 1450, acts: [{ t: ba.baile, expr: "sadness" }, { t: ba.hermione, expr: "surprise" }, { t: ba.celos - 0.2, expr: "anger" }, { t: ba.celos - 0.2, pose: "crossed" }] },
      { who: "hermione", x: 1300, y: 1440, acts: [{ t: ba.hermione - 0.6, walk: 680 }, { t: ba.hermione + 1.5, face: -1 }, { t: ba.hermione, expr: "joy" }, { t: ba.hermione + 1.6, pose: "wave", dur: 1.5 }] },
      { who: "krum", x: 1450, y: 1450, acts: [{ t: ba.hermione - 0.6, walk: 860 }, { t: ba.hermione + 1.5, face: -1 }, { t: ba.hermione, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ba.hermione, z: 1.15, x: 720, y: 1050 }, { t: ba.celos, z: 1.6, x: 320, y: 1000 }],
    sfx: [{ t: ba.hermione, s: "chime", v: 0.6 }, { t: ba.celos, s: "zap", v: 0.3 }],
  },

  huevo: {
    bg: Bathroom,
    fx: ({ t }) => (
      <Svg>
        <rect x={0} y={1300} width={1080} height={620} fill="#5ad1ff" opacity={t > hu.agua ? 0.45 : 0} />
        <GoldenEgg x={540} y={t > hu.agua ? 1450 : 1200} s={1.4} open={kf(t, [hu.grita - 0.3, hu.grita], [0, 1])} />
        {t > hu.grita - 0.2 && t < hu.agua ? <Sparkles x={540} y={1150} intensity={1} seed={9} count={10} color="#ff6b6b" /> : null}
        {t > hu.canta - 0.2 ? [0, 1, 2].map((i) => <text key={i} x={600 + i * 60} y={1350 - ((t * 60 + i * 40) % 160)} fontSize={60} fill="#ffe66d">♪</text>) : null}
      </Svg>
    ),
    chars: [
      { who: "harry", x: 300, y: 1450, acts: [{ t: hu.grita, expr: "surprise" }, { t: hu.grita, pose: "cower", dur: 1.6 }, { t: hu.canta, expr: "focus" }] },
      { who: "cedric", x: 860, y: 1440, facing: -1, show: false, acts: [{ t: hu.grita + 1.4, show: true }, { t: hu.grita + 1.4, pose: "talk", dur: 2 }, { t: hu.grita + 1.4, expr: "joy" }, { t: hu.agua + 0.5, show: false }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: hu.grita, z: 1.3, x: 480, y: 1150 }, { t: hu.canta, z: 1.2, x: 540, y: 1250 }],
    sfx: [{ t: hu.grita - 0.1, s: "roar", v: 0.6 }, { t: hu.agua, s: "splash", v: 0.6 }, { t: hu.canta, s: "chime", v: 0.6 }],
  },

  lago: {
    bg: Underwater,
    fx: ({ t }) => (
      <Svg>
        <Hostage x={380} y={1250} s={1} color="#2fae4f" head="#e2f7e6" hair="#e0662a" t={t} />
        <Hostage x={620} y={1250} s={1} color="#8a4fe0" head="#efe6ff" hair="#7a4a2a" t={t} />
        <Hostage x={840} y={1250} s={0.8} color="#5dade2" head="#eaf6ff" hair="#f5e6a8" t={t} />
      </Svg>
    ),
    chars: [
      { who: "harry", x: 200, y: 600, acts: [{ t: 0, rot: 70, dur: 0.001 }, { t: 0, pose: "armsUp" }, { t: la.branquias, expr: "surprise" }, { t: la.branquias + 0.5, move: { x: 300, y: 1050 }, dur: 1.4 }, { t: la.ron, move: { x: 420, y: 1050 }, dur: 0.6 }, { t: la.fleur, move: { x: 760, y: 1050 }, dur: 0.8 }, { t: la.ultimo, move: { x: 600, y: 500 }, dur: 1.2 }, { t: la.ultimo + 1, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: la.ron, z: 1.15, x: 460, y: 1100 }, { t: la.fleur, z: 1.15, x: 760, y: 1100 }, { t: la.ultimo, z: 1.0, y: 900 }],
    sfx: [{ t: 0.2, s: "splash", v: 0.6 }, { t: la.branquias, s: "pop", v: 0.5 }, { t: la.ron, s: "sparkle", v: 0.4 }, { t: la.fleur, s: "sparkle", v: 0.4 }, { t: la.ultimo + 0.6, s: "cheer", v: 0.5 }],
    overlay: ({ t }) => <Banner t={t} text="¡+ PUNTOS POR NOBLEZA!" t0={la.ultimo + 0.6} t1={la.ultimo + 2.6} />,
  },

  laberinto: {
    bg: Maze,
    fx: ({ t }) => (
      <Svg>
        <Spell t={t} t0={lb.krum} x0={200} y0={950} x1={540} y1={1050} color="#ff3b3b" />
        <Spell t={t} t0={lb.salva - 0.1} x0={820} y0={950} x1={260} y1={950} color="#ffe36e" />
        {t > lb.copa - 0.6 ? <Cup x={540} y={1300} s={0.8} glow={1} /> : null}
      </Svg>
    ),
    chars: [
      { who: "krum", x: 160, y: 1450, wand: true, acts: [{ t: lb.krum - 0.4, pose: "wandAim", dur: 1.2 }, { t: lb.krum - 0.3, glow: 1 }, { t: lb.krum - 0.4, expr: "anger" }, { t: lb.salva + 0.2, rot: -85, dur: 0.4 }, { t: lb.salva + 0.2, expr: "sleep" }, { t: lb.copa - 0.6, show: false }] },
      { who: "cedric", x: 540, y: 1440, acts: [{ t: lb.krum + 0.3, pose: "cower", dur: 1.4 }, { t: lb.krum + 0.3, expr: "surprise" }, { t: lb.copa - 0.6, move: { x: 760 }, dur: 0.01 }, { t: lb.copa - 0.5, face: -1 }, { t: lb.tocarla, expr: "joy" }, { t: lb.tocarla, pose: "point" }] },
      { who: "harry", x: 860, y: 1450, facing: -1, wand: true, acts: [{ t: lb.salva - 0.4, pose: "wandAim", dur: 1 }, { t: lb.salva - 0.3, glow: 1 }, { t: lb.salva + 0.6, glow: 0 }, { t: lb.copa - 0.6, move: { x: 320 }, dur: 0.01 }, { t: lb.copa - 0.5, face: 1 }, { t: lb.tocarla, expr: "joy" }, { t: lb.tocarla, pose: "point" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: lb.krum, z: 1.2, x: 380, y: 1050 }, { t: lb.copa, z: 1.0, x: 540, y: 1100 }],
    sfx: [{ t: lb.laberinto, s: "rumble", v: 0.4 }, { t: lb.krum, s: "zap", v: 0.6 }, { t: lb.salva, s: "zap", v: 0.6 }, { t: lb.copa - 0.4, s: "chime", v: 0.6 }],
    overlay: ({ t }) => <Flash t={t} at={lb.copa - 0.6} dur={0.3} />,
  },

  traslador: {
    bg: switchAt(tr.cementerio - 0.3, Maze, Graveyard),
    fx: ({ t }) => (
      <Svg>
        {t > tr.trampa - 0.3 && t < tr.cementerio - 0.3 ? (
          <g>
            {Array.from({ length: 10 }).map((_, i) => (
              <circle key={i} cx={540} cy={1000} r={((t - tr.trampa) * 900 + i * 90) % 900} fill="none" stroke="#5ad1ff" strokeWidth={10} opacity={0.5} />
            ))}
            <Cup x={540} y={1300} s={0.8} glow={1.5} />
          </g>
        ) : null}
      </Svg>
    ),
    chars: [
      { who: "harry", x: 380, y: 1450, acts: [{ t: tr.trampa, expr: "surprise" }, { t: tr.trampa + 0.3, rot: 360, dur: 1.2 }, { t: tr.cementerio - 0.3, rot: 0, dur: 0.01 }, { t: tr.cementerio - 0.3, pose: "cower", dur: 1 }, { t: tr.cementerio + 1, expr: "focus" }] },
      { who: "cedric", x: 700, y: 1440, facing: -1, acts: [{ t: tr.trampa, expr: "surprise" }, { t: tr.trampa + 0.3, rot: -360, dur: 1.2 }, { t: tr.cementerio - 0.3, rot: 0, dur: 0.01 }, { t: tr.cementerio + 1, expr: "focus" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: tr.trampa, z: 1.3, x: 540, y: 1050 }, { t: tr.cementerio - 0.3, z: 1.0, y: 1100 }],
    sfx: [{ t: tr.trampa, s: "whoosh", v: 0.8 }, { t: tr.trampa + 0.4, s: "rumble", v: 0.5 }, { t: tr.cementerio - 0.3, s: "boom", v: 0.6 }],
    overlay: ({ t }) => <Flash t={t} at={tr.cementerio - 0.3} dur={0.4} color="#5ad1ff" />,
  },

  cedric: {
    bg: Graveyard,
    fx: ({ t }) => <Svg><Spell t={t} t0={ce.rayo - 0.1} x0={980} y0={1000} x1={720} y1={1050} color="#3fdc6b" dur={0.3} /></Svg>,
    chars: [
      { who: "pettigrew", x: 1300, y: 1450, holding: () => <ellipse cx={20} cy={0} rx={50} ry={34} fill="#6b5a4a" stroke={INK} strokeWidth={4} />, acts: [{ t: ce.colagusano - 0.6, walk: 960 }, { t: ce.colagusano + 1, face: -1 }, { t: ce.colagusano, pose: "hold" }, { t: ce.colagusano, expr: "focus" }] },
      { who: "cedric", x: 680, y: 1440, acts: [{ t: ce.colagusano, expr: "surprise" }, { t: ce.rayo + 0.2, rot: -88, dur: 0.5 }, { t: ce.rayo + 0.2, expr: "sleep" }] },
      { who: "harry", x: 340, y: 1450, acts: [{ t: ce.colagusano, expr: "surprise" }, { t: ce.cedric, expr: "sadness" }, { t: ce.cedric, pose: "sad" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ce.colagusano, z: 1.2, x: 860, y: 1050 }, { t: ce.cedric, z: 1.3, x: 500, y: 1100 }],
    sfx: [{ t: ce.colagusano, s: "rumble", v: 0.5 }, { t: ce.rayo - 0.1, s: "zap", v: 0.7 }, { t: ce.cedric, s: "boom", v: 0.3 }],
    overlay: ({ t }) => <Flash t={t} at={ce.rayo} dur={0.4} color="#3fdc6b" />,
  },

  ritual: {
    bg: Graveyard,
    under: ({ t }) => <Svg><BigCauldron x={760} y={1380} s={0.9} t={t} boil={kf(t, [ri.sangre, ri.explota], [0.2, 1])} /></Svg>,
    fx: ({ t }) => <Svg>{t > ri.explota - 0.2 && t < ri.voldemort + 0.6 ? <circle cx={760} cy={1000} r={kf(t, [ri.explota - 0.2, ri.voldemort], [100, 700])} fill="#c9d4e8" opacity={kf(t, [ri.explota - 0.2, ri.explota + 0.4, ri.voldemort + 0.6], [0, 0.9, 0])} /> : null}</Svg>,
    chars: [
      { who: "harry", x: 520, y: 1450, acts: [{ t: 0, expr: "surprise" }, { t: ri.lapida, pose: "crossed" }, { t: ri.sangre, expr: "sadness" }, { t: ri.voldemort, expr: "surprise" }] },
      { who: "pettigrew", x: 960, y: 1450, facing: -1, acts: [{ t: ri.caldero, pose: "hold", dur: 2.5 }, { t: ri.sangre, expr: "focus" }, { t: ri.voldemort - 0.5, pose: "cower" }] },
      { who: "voldemort", x: 760, y: 1440, facing: -1, show: false, acts: [{ t: ri.voldemort - 0.3, show: true }, { t: ri.voldemort - 0.3, pose: "armsUp" }, { t: ri.voldemort - 0.3, expr: "anger" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ri.caldero, z: 1.2, x: 760, y: 1150 }, { t: ri.voldemort, z: 1.25, x: 700, y: 1000 }],
    sfx: [{ t: ri.caldero, s: "fire", v: 0.5 }, { t: ri.sangre, s: "zap", v: 0.3 }, { t: ri.explota - 0.1, s: "boom", v: 0.9 }, { t: ri.voldemort, s: "roar", v: 0.6 }],
    shake: [[ri.explota, 0.8, 0.8]],
  },

  mortifagos: {
    bg: Graveyard,
    fx: ({ t }) => <Svg>{t > mf.mortifagos - 0.3 ? deathEaters(t, kf(t, [mf.mortifagos - 0.3, mf.mortifagos + 0.4], [0, 1])) : null}{t > mf.marca - 0.2 ? <DarkMark x={540} y={430} s={0.8} k={kf(t, [mf.marca - 0.2, mf.marca + 0.3], [0, 1])} /> : null}</Svg>,
    chars: [
      { who: "voldemort", x: 620, y: 1440, facing: -1, acts: [{ t: mf.marca, pose: "point", dur: 1 }, { t: 0, expr: "anger" }, { t: mf.duelo - 0.3, pose: "wandAim" }, { t: mf.duelo - 0.3, wand: true }] },
      { who: "lucius", x: 900, y: 1440, facing: -1, show: false, acts: [{ t: mf.lucius - 0.3, show: true }, { t: mf.lucius - 0.3, expr: "joy" }] },
      { who: "harry", x: 260, y: 1450, acts: [{ t: mf.mortifagos, expr: "surprise" }, { t: mf.duelo, expr: "focus" }, { t: mf.duelo, wand: true }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: mf.lucius, z: 1.3, x: 860, y: 1050 }, { t: mf.duelo, z: 1.0, x: 460, y: 1100 }],
    sfx: [{ t: mf.marca, s: "zap", v: 0.4 }, { t: mf.mortifagos, s: "whoosh", v: 0.6 }, { t: mf.mortifagos + 0.3, s: "rumble", v: 0.5 }, { t: mf.duelo, s: "boom", v: 0.4 }],
  },

  duelo: {
    bg: Graveyard,
    fx: ({ t }) => (
      <Svg>
        {t < du.copa ? <BeamDuel t={t} x0={360} y0={900} x1={760} y1={900} k={kf(t, [0.1, 0.4, du.copa - 0.4, du.copa], [0, 1, 1, 0])} /> : null}
        {t > du.padres - 0.4 && t < du.copa + 0.5 ? (
          <>
            <Echo x={180} y={1450} s={1} color="#2f6fe4" head="#e3eeff" hair="#1e1e28" glasses k={kf(t, [du.padres - 0.4, du.padres + 0.3], [0, 1])} t={t} />
            <Echo x={520} y={1450} s={1} color="#2fae4f" head="#fde3df" hair="#c0392b" k={kf(t, [du.padres - 0.2, du.padres + 0.5], [0, 1])} t={t} />
          </>
        ) : null}
        {t > du.copa - 0.2 ? <Cup x={300} y={1300} s={0.6} glow={1} /> : null}
      </Svg>
    ),
    chars: [
      { who: "harry", x: 300, y: 1450, wand: true, acts: [{ t: 0, pose: "wandAim" }, { t: 0, expr: "focus" }, { t: 0.2, glow: 1 }, { t: du.copa - 0.6, glow: 0 }, { t: du.copa - 0.6, walk: 380, run: true }, { t: du.escapa, alpha: 0, dur: 0.3 }] },
      { who: "voldemort", x: 820, y: 1440, facing: -1, wand: true, acts: [{ t: 0, pose: "wandAim" }, { t: 0, expr: "anger" }, { t: 0.2, glow: 1 }, { t: du.padres, expr: "surprise" }] },
      { who: "cedric", x: 480, y: 1450, s: 1.6, acts: [{ t: 0, rot: -88, dur: 0.001 }, { t: 0, expr: "sleep" }, { t: du.escapa, alpha: 0, dur: 0.3 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: du.dorado, z: 1.15, x: 560, y: 950 }, { t: du.padres, z: 1.0, x: 400, y: 1100 }, { t: du.copa, z: 1.2, x: 360, y: 1150 }],
    sfx: [{ t: 0.1, s: "zap", v: 0.7 }, { t: du.dorado, s: "sparkle", v: 0.7 }, { t: du.dorado + 0.3, s: "rumble", v: 0.6 }, { t: du.padres, s: "chime", v: 0.6 }, { t: du.escapa, s: "whoosh", v: 0.8 }],
    shake: [[0.1, 0.4, 2]],
    overlay: ({ t }) => <Flash t={t} at={du.escapa} dur={0.4} color="#5ad1ff" />,
  },

  moody2: {
    bg: ({ t }) => <Chamber t={t} tint="#2a2433" light="#c9a66b" />,
    under: ({ t }) => <Svg>{t > m2.baul - 0.4 ? <Trunk x={860} y={1430} s={2} /> : null}</Svg>,
    fx: ({ t }) => <Svg><Question t={t} x={300} y={760} t0={m2.confiesa} /><Spell t={t} t0={m2.dumbledore - 0.1} x0={980} y0={950} x1={620} y1={1000} color="#ff6b6b" /></Svg>,
    chars: [
      { who: "harry", x: 260, y: 1450, acts: [{ t: m2.confiesa, expr: "surprise" }, { t: m2.confiesa + 1, pose: "cower", dur: 1.5 }, { t: m2.impostor, expr: "focus" }] },
      { who: "moody", x: 620, y: 1440, facing: -1, wand: true, acts: [{ t: m2.confiesa, expr: "anger" }, { t: m2.confiesa + 1, pose: "wandAim", dur: 1.5 }, { t: m2.dumbledore, rot: 80, dur: 0.4 }, { t: m2.impostor - 0.3, show: false }] },
      { who: "barty", x: 620, y: 1440, facing: -1, show: false, acts: [{ t: m2.impostor - 0.3, show: true }, { t: m2.impostor - 0.3, rot: 80, dur: 0.001 }, { t: m2.impostor - 0.3, expr: "anger" }] },
      { who: "dumbledore", x: 1300, y: 1440, wand: true, acts: [{ t: m2.dumbledore - 0.6, walk: 950, run: true }, { t: m2.dumbledore, face: -1 }, { t: m2.dumbledore, pose: "wandAim", dur: 1 }, { t: m2.dumbledore, glow: 1 }, { t: m2.dumbledore + 1, glow: 0 }, { t: m2.dumbledore + 0.3, expr: "anger" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: m2.confiesa, z: 1.35, x: 480, y: 1050 }, { t: m2.dumbledore, z: 1.0, x: 600, y: 1100 }, { t: m2.impostor, z: 1.3, x: 620, y: 1200 }, { t: m2.baul, z: 1.15, x: 760, y: 1150 }],
    sfx: [{ t: m2.confiesa, s: "rumble", v: 0.5 }, { t: m2.dumbledore - 0.1, s: "zap", v: 0.7 }, { t: m2.dumbledore + 0.2, s: "boom", v: 0.6 }, { t: m2.impostor - 0.3, s: "pop", v: 0.6 }, { t: m2.baul, s: "knock", v: 0.6 }],
    overlay: ({ t }) => <Flash t={t} at={m2.impostor - 0.3} dur={0.3} />,
  },

  final: {
    bg: GreatHall,
    fx: ({ t }) => <Svg>{t > fi.volvio - 0.3 && t < fi.cedric ? <g transform="translate(540 520) scale(0.7)"><Voldemort x={0} y={0} s={1} t={t} k={kf(t, [fi.volvio - 0.3, fi.volvio + 0.3], [0, 0.85])} /></g> : null}</Svg>,
    chars: [
      { who: "dumbledore", x: 540, y: 1430, acts: [{ t: fi.volvio - 0.3, pose: "talk", dur: 2.5 }, { t: 0, expr: "sadness" }, { t: fi.cedric, show: false }] },
      { who: "ron", x: 260, y: 1440, show: false, acts: [{ t: fi.cedric, show: true }, { t: fi.cedric, expr: "sadness" }, { t: fi.guerra, expr: "focus" }] },
      { who: "harry", x: 540, y: 1450, show: false, acts: [{ t: fi.cedric, show: true }, { t: fi.cedric, expr: "sadness" }, { t: fi.cedric, pose: "sad", dur: 2 }, { t: fi.guerra, expr: "focus" }] },
      { who: "hermione", x: 820, y: 1440, facing: -1, show: false, acts: [{ t: fi.cedric, show: true }, { t: fi.cedric, expr: "sadness" }, { t: fi.guerra, expr: "focus" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: fi.cedric - 0.05, z: 1.1, y: 1100 }, { t: fi.cedric, z: 1.0, y: 1100 }],
    sfx: [{ t: fi.volvio, s: "rumble", v: 0.6 }, { t: fi.guerra, s: "boom", v: 0.4 }],
    overlay: ({ t }) => <Flash t={t} at={fi.cedric} dur={0.3} />,
  },
};

export const p4full: PartSpec = { part: 0, title: "Harry Potter y el cáliz de fuego", dyn: true, scenes };
export const p4fullAudio = audio;
