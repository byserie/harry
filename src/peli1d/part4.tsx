import { Act, PartSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { Svg } from "../scenes/bg1";
import { Chamber, Corridor, Forest, Library, NightCastle, Pitch } from "../scenes/bg2";
import { Book, Dog3, Flame, Hooded, Lantern, MiniStick, Mirror, Snitch, Spell, Stone, Trapdoor, Unicorn, Centaur, Voldemort } from "../scenes/props";
import { Banner, Flash, switchAt, wordClock } from "../scenes/util";
import audioData from "../data/p1dpart4.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);

/** Sacudidas de escoba: rotaciones alternadas. */
const wobble = (t0: number, t1: number, amp = 22): Act[] => {
  const out: Act[] = [];
  let k = 0;
  for (let t = t0; t < t1; t += 0.16) out.push({ t, rot: k++ % 2 ? amp : -amp, dur: 0.14 });
  out.push({ t: t1, rot: 0, dur: 0.3 });
  return out;
};

const hEscoba = w("hook", "escoba");
const hPerro = w("hook", "perro");
const hEspejo = w("hook", "espejo");

const qSnitch = w("quidditch", "snitch");
const qSacudirse = w("quidditch", "sacudirse");

const fSnape = w("fuego", "snape");
const fPrende = w("fuego", "prende");
const fCalma = w("fuego", "calma");
const fAtrapa = w("fuego", "atrapa");
const fGana = w("fuego", "gana");

const pPerro = w("perro", "perro");
const pHagrid = w("perro", "hagrid");
const pFlamel = w("perro", "flamel");

const lBuscan = w("flamel", "buscan");
const lEncuentra = w("flamel", "encuentra");
const lPiedra = w("flamel", "piedra");
const lPerro = w("flamel", "perro");

const mCapa = w("espejo", "capa");
const mEspejo = w("espejo", "espejo");
const mPadres = w("espejo", "padres");
const mDumbledore = w("espejo", "dumbledore");
const mSonando = w("espejo", "sonando");

const kCastigados = w("castigo", "castigados");
const kHagrid = w("castigo", "hagrid");

const fuUnicornio = w("bosque", "unicornio");
const fuSombra = w("bosque", "sombra");
const fuCentauro = w("bosque", "centauro");
const fuVoldemort = w("bosque", "voldemort");

const cPiedra = w("cierre", "piedra");

export const p1dpart4: PartSpec = {
  dyn: true,
  title: "Harry Potter y la piedra filosofal",
  part: 4,
  scenes: {
    hook: {
      bg: ({ t }) => <Pitch t={t} air />,
      fx: ({ t }) => (
        <Svg>
          {t > hPerro - 0.3 ? <Dog3 x={kf(t, [hPerro - 0.3, hPerro + 0.3], [1300, 860])} y={1900} s={0.75} t={t} /> : null}
          {t > hEspejo - 0.3 ? (
            <g opacity={kf(t, [hEspejo - 0.3, hEspejo + 0.2], [0, 1])}>
              <Mirror x={220} y={1900} s={0.7} t={t} glow={1} />
              <Sparkles x={220} y={1600} intensity={1} seed={3} count={14} />
            </g>
          ) : null}
        </Svg>
      ),
      chars: [
        {
          who: "harry",
          x: -300,
          y: 1380,
          broom: true,
          acts: [{ t: 0.2, move: { x: 420, y: 1330 }, dur: 2.0 }, { t: hEscoba - 0.2, expr: "surprise" }, ...wobble(hEscoba - 0.2, hEscoba + 1.5), { t: hEscoba + 1.6, expr: "focus" }],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1000 },
        { t: hEscoba, z: 1.2, x: 520, y: 1000 },
        { t: hPerro, z: 1.0, x: 540, y: 1100 },
      ],
      sfx: [
        { t: 0.2, s: "whoosh", v: 0.5 },
        { t: hEscoba - 0.2, s: "zap", v: 0.4 },
        { t: hPerro, s: "roar", v: 0.7 },
        { t: hEspejo, s: "sparkle", v: 0.6 },
      ],
    },

    quidditch: {
      bg: Pitch,
      fx: ({ t }) => <Svg>{t < qSacudirse + 2 ? <Snitch x={kf(t, [0, qSacudirse + 0.5], [500, 960]) + Math.sin(t * 5) * 40} y={760 + Math.cos(t * 4) * 70} s={1.1} t={t} /> : null}</Svg>,
      chars: [
        {
          who: "harry",
          x: -200,
          y: 1250,
          broom: true,
          acts: [
            { t: 0.2, move: { x: 420, y: 1200 }, dur: 2.2 },
            { t: qSnitch - 0.3, move: { x: 520, y: 1250 }, dur: 1.5 },
            { t: qSnitch, expr: "focus" },
            { t: qSacudirse - 0.2, expr: "surprise" },
            ...wobble(qSacudirse - 0.2, 10.6, 26),
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1000 },
        { t: qSnitch, z: 1.1, x: 600, y: 1000 },
        { t: qSacudirse, z: 1.3, x: 640, y: 900 },
      ],
      sfx: [
        { t: 0.3, s: "cheer", v: 0.5 },
        { t: 0.5, s: "whoosh", v: 0.5 },
        { t: qSnitch, s: "flutter", v: 0.4 },
        { t: qSacudirse - 0.2, s: "zap", v: 0.5 },
      ],
      shake: [[qSacudirse, 0.4, 2]],
      trans: "slide",
    },

    fuego: {
      bg: Pitch,
      fx: ({ t }) => (
        <Svg>
          <Spell t={t} t0={fPrende - 0.2} x0={330} y0={980} x1={790} y1={1330} color="#ff8a1a" dur={0.35} />
          {t > fPrende + 0.15 && t < fPrende + 3 ? <Flame x={kf(t, [fPrende + 0.15, fPrende + 1.4], [800, 1250])} y={1440} s={kf(t, [fPrende + 0.15, fPrende + 0.5], [0.3, 1])} t={t} /> : null}
          {t < fAtrapa ? <Snitch x={560 + Math.sin(t * 5) * 30} y={1150 + Math.cos(t * 4) * 30} s={1} t={t} /> : null}
        </Svg>
      ),
      chars: [
        { who: "ron", x: 120, y: 1440, acts: [{ t: fPrende, expr: "surprise" }, { t: fGana - 0.2, pose: "cheer" }, { t: fGana - 0.2, expr: "joy" }] },
        {
          who: "hermione",
          x: 300,
          y: 1430,
          wand: true,
          acts: [
            { t: fSnape - 0.2, pose: "point", dur: 1.4 },
            { t: fSnape - 0.2, expr: "anger" },
            { t: fPrende - 0.4, pose: "wandAim", dur: 1.2 },
            { t: fPrende - 0.2, glow: 1 },
            { t: fPrende + 0.6, glow: 0 },
            { t: fGana - 0.2, pose: "cheer" },
            { t: fGana - 0.2, expr: "joy" },
          ],
        },
        {
          who: "snape",
          x: 800,
          y: 1430,
          facing: -1,
          acts: [
            { t: 0, pose: "talk" },
            { t: 0, look: 0.2 },
            { t: 0, expr: "focus" },
            { t: fPrende + 0.15, look: null },
            { t: fPrende + 0.15, expr: "surprise" },
            { t: fPrende + 0.3, walk: 1300, run: true },
          ],
        },
        {
          who: "harry",
          x: 560,
          y: 1020,
          broom: true,
          acts: [
            { t: 0, expr: "surprise" },
            ...wobble(0, fCalma, 26),
            { t: fCalma + 0.2, expr: "focus" },
            { t: fAtrapa - 0.7, rot: 30, dur: 0.3 },
            { t: fAtrapa - 0.7, move: { x: 400, y: 1520 }, dur: 0.8 },
            { t: fAtrapa + 0.1, rot: 0, dur: 0.3 },
            { t: fAtrapa + 0.1, expr: "joy" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1100 },
        { t: fSnape, z: 1.35, x: 760, y: 1100 },
        { t: fPrende, z: 1.05, x: 560, y: 1150 },
        { t: fAtrapa, z: 1.15, x: 420, y: 1200 },
      ],
      sfx: [
        { t: fPrende - 0.2, s: "zap", v: 0.5 },
        { t: fPrende + 0.15, s: "fire", v: 0.7 },
        { t: fAtrapa - 0.7, s: "whoosh", v: 0.7 },
        { t: fGana - 0.3, s: "cheer", v: 0.7 },
        { t: fGana - 0.2, s: "fanfare", v: 0.5 },
      ],
      overlay: ({ t }) => <Banner t={t} text="¡GRYFFINDOR GANA!" t0={fGana - 0.2} t1={fGana + 2.2} />,
      trans: "circle",
    },

    perro: {
      bg: switchAt(pHagrid - 0.3, ({ t }) => <Corridor t={t} dark />, ({ t }) => <Forest t={t} hut />),
      under: ({ t }) =>
        t < pHagrid - 0.3 ? (
          <Svg>
            <Trapdoor x={720} y={1330} s={1.1} />
            <Dog3 x={720} y={1320} s={0.95} t={t} />
          </Svg>
        ) : null,
      chars: [
        { who: "hermione", x: 360, y: 1450, acts: [{ t: 0.3, expr: "surprise" }, { t: pPerro - 0.3, pose: "cower", dur: 2.5 }, { t: pHagrid - 0.3, show: false }] },
        { who: "ron", x: 80, y: 1460, acts: [{ t: 0.3, expr: "surprise" }, { t: pPerro - 0.3, pose: "cower", dur: 2.5 }, { t: pHagrid - 0.3, show: false }] },
        {
          who: "harry",
          x: 200,
          y: 1480,
          acts: [
            { t: 0.3, expr: "surprise" },
            { t: pPerro - 0.3, pose: "surprised", dur: 2.5 },
            { t: pHagrid - 0.3, move: { x: 250, y: 1440 }, dur: 0.01 },
            { t: pHagrid - 0.3, expr: "focus" },
            { t: pFlamel, expr: "surprise" },
          ],
        },
        {
          who: "hagrid",
          x: 760,
          y: 1460,
          s: 1.5,
          facing: -1,
          show: false,
          acts: [{ t: pHagrid - 0.3, show: true }, { t: pHagrid - 0.3, pose: "talk" }, { t: pHagrid - 0.3, expr: "joy" }, { t: pFlamel - 0.1, pose: "think" }, { t: pFlamel - 0.1, expr: "surprise" }],
        },
      ],
      cam: [
        { t: 0, z: 1.0, x: 540, y: 1000 },
        { t: pPerro, z: 1.05, x: 600, y: 950 },
        { t: pHagrid - 0.35, z: 1.1, x: 600, y: 950 },
        { t: pHagrid - 0.3, z: 1.0, x: 540, y: 1100 },
        { t: pFlamel, z: 1.45, x: 700, y: 950 },
      ],
      sfx: [
        { t: 0.4, s: "roar", v: 0.7 },
        { t: pPerro, s: "roar", v: 0.6 },
        { t: pFlamel, s: "chime", v: 0.4 },
      ],
      shake: [[0.4, 0.6, 0.8]],
      overlay: ({ t }) => (
        <>
          <Flash t={t} at={pHagrid - 0.3} dur={0.25} />
          <Banner t={t} text="Nicolás Flamel" t0={pFlamel} t1={pFlamel + 2.5} color="#ffd8a8" />
        </>
      ),
      trans: "zoom",
    },

    flamel: {
      bg: Library,
      fx: ({ t }) => (
        <Svg>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={260 + i * 12} y={1400 - i * 36 - (t > lBuscan + i * 0.5 ? 0 : 2000)} width={160} height={34} rx={6} fill={["#c8302f", "#2f6fe4", "#f2c230", "#2f8f4a", "#8e5ad6"][i]} stroke="#1b1b2f" strokeWidth={4} />
          ))}
          {t > lPiedra - 0.4 ? (
            <g opacity={kf(t, [lPiedra - 0.4, lPiedra + 0.1], [0, 1])}>
              <Stone x={560} y={kf(t, [lPiedra - 0.4, lPiedra + 0.6], [1000, 640])} s={kf(t, [lPiedra - 0.4, lPiedra + 0.6], [0.5, 2.6])} glow={1} />
              <Sparkles x={560} y={640} intensity={1} seed={17} count={18} color="#ff9a9a" />
            </g>
          ) : null}
        </Svg>
      ),
      chars: [
        { who: "harry", x: 380, y: 1430, acts: [{ t: lBuscan, pose: "think", dur: 3 }, { t: lBuscan, expr: "focus" }, { t: lEncuentra + 0.3, expr: "surprise" }, { t: lPiedra, expr: "joy" }] },
        { who: "ron", x: 130, y: 1440, acts: [{ t: lBuscan + 0.5, pose: "sad", dur: 2.6 }, { t: lBuscan + 0.5, expr: "sadness" }, { t: lEncuentra + 0.3, expr: "surprise" }, { t: lPerro - 0.3, pose: "point" }, { t: lPerro - 0.3, expr: "joy" }] },
        {
          who: "hermione",
          x: 760,
          y: 1430,
          facing: -1,
          holding: (t) => (t > lEncuentra - 0.4 ? <Book x={0} y={0} s={0.45} glow={1} /> : null),
          acts: [{ t: lBuscan, pose: "hold", dur: 2 }, { t: lBuscan, expr: "focus" }, { t: lEncuentra - 0.4, pose: "pointUp" }, { t: lEncuentra - 0.4, expr: "joy" }],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: lEncuentra, z: 1.35, x: 700, y: 1000 },
        { t: lPiedra, z: 1.0, x: 540, y: 1050 },
      ],
      sfx: [
        { t: lBuscan + 0.2, s: "pop", v: 0.3 },
        { t: lBuscan + 1.2, s: "pop", v: 0.3 },
        { t: lEncuentra - 0.3, s: "chime", v: 0.5 },
        { t: lPiedra - 0.3, s: "sparkle", v: 0.6 },
      ],
      trans: "wipe",
    },

    espejo: {
      bg: ({ t }) => <Chamber t={t} tint="#1d2350" light="#7cc8ff" />,
      under: ({ t }) => (
        <Svg>
          <Mirror x={740} y={1440} s={1.05} t={t} glow={t > mPadres - 0.3 ? 1 : 0.3}>
            {t > mPadres - 0.4 ? (
              <g opacity={kf(t, [mPadres - 0.4, mPadres + 0.3], [0, 1])}>
                <MiniStick x={-110} y={-30} s={1.1} color="#2fae4f" head="#fde3df" hair="#c0392b" arms="wave" t={t} />
                <MiniStick x={0} y={-30} s={0.95} color="#2f6fe4" head="#e3eeff" hair="#1e1e28" glasses />
                <MiniStick x={110} y={-30} s={1.15} color="#8a5a2b" head="#f3e6d6" hair="#1e1e28" glasses arms="wave" t={t + 1} />
              </g>
            ) : null}
          </Mirror>
        </Svg>
      ),
      chars: [
        {
          who: "harry",
          x: 330,
          y: 1440,
          acts: [
            { t: 0.2, alpha: 0.25, dur: 0.6 },
            { t: 0.2, expr: "joy" },
            { t: mCapa + 0.9, look: 0.9 },
            { t: mEspejo - 0.3, alpha: 1, dur: 0.5 },
            { t: mEspejo - 0.3, expr: "surprise" },
            { t: mPadres, expr: "joy" },
            { t: mPadres + 0.4, pose: "wave", dur: 2 },
            { t: mDumbledore + 0.5, face: -1 },
            { t: mDumbledore + 0.5, expr: "surprise" },
            { t: mSonando, expr: "sadness" },
            { t: mSonando, pose: "sad" },
          ],
        },
        {
          who: "dumbledore",
          x: -200,
          y: 1430,
          acts: [{ t: mDumbledore - 0.6, walk: 110 }, { t: mDumbledore + 0.6, pose: "talk" }, { t: mDumbledore + 0.6, expr: "sadness" }],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: mPadres, z: 1.45, x: 700, y: 950 },
        { t: mDumbledore, z: 1.0, x: 480, y: 1100 },
        { t: 16, z: 1.15, x: 360, y: 1100 },
      ],
      sfx: [
        { t: 0.2, s: "sparkle", v: 0.4 },
        { t: mPadres - 0.3, s: "chime", v: 0.6 },
      ],
      trans: "circle",
    },

    castigo: {
      bg: ({ t }) => <Forest t={t} hut />,
      chars: [
        { who: "harry", x: 120, y: 1440, acts: [{ t: kCastigados - 0.3, expr: "sadness" }, { t: kCastigados, pose: "sad" }] },
        { who: "ron", x: 300, y: 1450, acts: [{ t: kCastigados - 0.3, expr: "sadness" }, { t: kCastigados, pose: "sad" }] },
        { who: "hermione", x: 470, y: 1440, acts: [{ t: kCastigados - 0.3, expr: "sadness" }, { t: kCastigados, pose: "sad" }] },
        { who: "mcgonagall", x: 860, y: 1430, facing: -1, acts: [{ t: 0.4, pose: "point", dur: 2.6 }, { t: 0.4, expr: "anger" }, { t: kHagrid - 1, walk: 1300 }] },
        {
          who: "hagrid",
          x: 1350,
          y: 1460,
          s: 1.5,
          holding: (t) => <Lantern x={0} y={0} s={0.7} t={t} />,
          acts: [{ t: kHagrid - 0.6, walk: 800 }, { t: kHagrid + 0.8, face: -1 }, { t: kHagrid + 0.8, pose: "hold" }, { t: kHagrid + 0.8, expr: "joy" }],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: kCastigados, z: 1.3, x: 300, y: 1050 },
        { t: kHagrid, z: 1.0, x: 600, y: 1100 },
      ],
      sfx: [{ t: kCastigados, s: "zap", v: 0.3 }],
      overlay: ({ t }) => <Banner t={t} text="¡CASTIGADOS!" t0={kCastigados - 0.2} t1={kCastigados + 2} color="#ff6b6b" />,
      trans: "slide",
    },

    bosque: {
      bg: Forest,
      under: ({ t }) => (
        <Svg>
          <Unicorn x={720} y={1380} s={1} t={t} />
          {t > fuSombra - 0.6 ? (
            <g opacity={kf(t, [fuSombra - 0.6, fuSombra, fuCentauro + 0.4, fuCentauro + 1.2], [0, 1, 1, 0])}>
              <Hooded x={kf(t, [fuSombra - 0.6, fuSombra + 1.5, fuCentauro + 0.4, fuCentauro + 1.2], [1250, 900, 900, 1200])} y={1420} s={1.2} t={t} />
            </g>
          ) : null}
          {t > fuCentauro - 0.6 ? <Centaur x={kf(t, [fuCentauro - 0.6, fuCentauro + 0.4], [-300, 470])} y={1440} s={1.05} t={t} /> : null}
        </Svg>
      ),
      fx: ({ t }) => (
        <Svg>
          {t > fuVoldemort - 0.3 ? <Voldemort x={540} y={560} s={0.9} t={t} k={kf(t, [fuVoldemort - 0.3, fuVoldemort + 0.3, fuVoldemort + 2.4, fuVoldemort + 3], [0, 0.9, 0.9, 0])} /> : null}
        </Svg>
      ),
      chars: [
        {
          who: "harry",
          x: -150,
          y: 1460,
          acts: [
            { t: 0.2, walk: 200 },
            { t: fuUnicornio, expr: "sadness" },
            { t: fuSombra + 0.6, expr: "surprise" },
            { t: fuSombra + 1.0, pose: "cower" },
            { t: fuCentauro + 0.5, pose: "stand" },
            { t: fuCentauro + 0.5, look: 0.9 },
            { t: fuVoldemort - 0.2, expr: "surprise" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: fuSombra, z: 1.2, x: 700, y: 1100 },
        { t: fuCentauro, z: 1.0, x: 540, y: 1100 },
        { t: fuVoldemort, z: 1.05, x: 540, y: 950 },
      ],
      sfx: [
        { t: fuSombra, s: "rumble", v: 0.5 },
        { t: fuCentauro - 0.5, s: "step", v: 0.7 },
        { t: fuCentauro - 0.2, s: "step", v: 0.7 },
        { t: fuCentauro + 0.1, s: "step", v: 0.7 },
        { t: fuVoldemort - 0.2, s: "roar", v: 0.4 },
      ],
      overlay: ({ t }) => <Flash t={t} at={fuVoldemort - 0.2} dur={0.4} color="#ff2b2b" />,
      trans: "fade",
    },

    cierre: {
      bg: NightCastle,
      fx: ({ t }) => (
        <Svg>
          <g opacity={kf(t, [cPiedra - 0.5, cPiedra, 6.5, 7], [0, 1, 1, 0])}>
            <Stone x={540} y={800} s={2.4} glow={1} />
            <Sparkles x={540} y={800} intensity={1} seed={23} count={16} color="#ff9a9a" />
          </g>
        </Svg>
      ),
      chars: [
        { who: "ron", x: 230, y: 1440, acts: [{ t: 0, expr: "focus" }, { t: 0, pose: "crossed" }] },
        { who: "harry", x: 540, y: 1450, acts: [{ t: 0, expr: "focus" }, { t: cPiedra, pose: "pointUp", dur: 2.5 }] },
        { who: "hermione", x: 850, y: 1440, facing: -1, acts: [{ t: 0, expr: "focus" }, { t: 0, pose: "think" }] },
      ],
      cam: [
        { t: 0, z: 1.1, y: 1100 },
        { t: 10.9, z: 1.0, y: 1150 },
      ],
      sfx: [{ t: cPiedra - 0.3, s: "sparkle", v: 0.5 }],
      trans: "circle",
    },
  },
};

export const p1dpart4Audio = audio;
