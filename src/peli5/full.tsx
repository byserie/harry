import { PartSpec, SceneSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { NightStreet, Svg } from "../scenes/bg1";
import { Chamber, Classroom, Corridor, Forest, GreatHall, NightCastle } from "../scenes/bg2";
import { Centaur, Confetti, MiniStick, Snake, Spell, Voldemort } from "../scenes/props";
import { Phoenix } from "../peli2/assets";
import { Thought } from "../peli2/part1";
import { Dementor, Dorm, Field, MoonNight, Shield } from "../peli3/assets";
import { BeamDuel } from "../peli4/assets";
import { Banner, Flash, switchAt, wordClock } from "../scenes/util";
import { Atrium, Decree, FireDragon, Grimmauld, Mysteries, PinkOffice, RoomReq, Thestral, VeilRoom } from "./assets";
import audioData from "../data/p5full.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);
const D = (id: string) => (audio.scenes.find((s) => s.id === id)?.dur ?? 300) / 30;

const h = { voldemort: w("hook", "voldemort"), rosa: w("hook", "rosa"), ejercito: w("hook", "ejercito"), batalla: w("hook", "batalla") };
const de = { dementores: w("dementores", "dementores"), patronus: w("dementores", "patronus"), expulsion: w("dementores", "expulsion") };
const or = { escobas: w("orden", "escobas"), orden: w("orden", "orden"), sirius: w("orden", "sirius") };
const ju = { juicio: w("juicio", "juicio"), dumbledore: w("juicio", "dumbledore"), libre: w("juicio", "libre") };
const um = { umbridge: w("umbridge", "umbridge"), prohibe: w("umbridge", "prohibe"), voldemort: w("umbridge", "voldemort"), pluma: w("umbridge", "pluma"), mano: w("umbridge", "mano") };
const dc = { decretos: w("decretos", "decretos"), trelawney: w("decretos", "trelawney") };
const ej = { ejercito: w("ejercito", "ejercito"), sala: w("ejercito", "sala"), patronus: w("ejercito", "patronus") };
const lu = { luna: w("luna", "luna"), neville: w("luna", "neville"), thestrals: w("luna", "thestrals") };
const ch = { muerdago: w("cho", "muerdago"), beso: w("cho", "beso") };
const vi = { serpiente: w("vision", "serpiente"), gritando: w("vision", "gritando"), real: w("vision", "real"), conectados: w("vision", "conectados") };
const oc = { snape: w("oclumancia", "snape"), tortura: w("oclumancia", "tortura"), recuerdo: w("oclumancia", "recuerdo") };
const ds = { descubre: w("descubren", "descubre"), culpa: w("descubren", "culpa"), arrestar: w("descubren", "arrestar"), fenix: w("descubren", "fenix") };
const ge = { fuegos: w("gemelos", "fuegos"), dragon: w("gemelos", "dragon"), escobas: w("gemelos", "escobas") };
const ce = { sirius: w("centauros", "sirius"), atrapa: w("centauros", "atrapa"), bosque: w("centauros", "bosque"), centauros: w("centauros", "centauros") };
const mi = { thestrals: w("ministerio", "thestrals"), ministerio: w("ministerio", "ministerio"), esferas: w("ministerio", "esferas"), profecia: w("ministerio", "profecia") };
const tr = { trampa: w("trampa", "trampa"), lucius: w("trampa", "lucius"), bellatrix: w("trampa", "bellatrix"), batalla: w("trampa", "batalla"), rompen: w("trampa", "rompen") };
const ve = { orden: w("velo", "orden"), alcanza: w("velo", "alcanza"), velo: w("velo", "velo"), grita: w("velo", "grita") };
const du = { voldemort: w("duelo", "voldemort"), dumbledore: w("duelo", "dumbledore"), poseer: w("duelo", "poseer"), amor: w("duelo", "amor"), huye: w("duelo", "huye"), creen: w("duelo", "creen") };
const pr = { profecia: w("profecia", "profecia"), uno: w("profecia", "uno") };
const fi = { amigos: w("final", "amigos") };

const eaters = (t: number, k: number) => (
  <>
    {[140, 940].map((x, i) => (
      <g key={i} opacity={k}>
        <MiniStick x={x} y={1440} s={1.6} color="#111" head="#222" t={t} arms="up" />
      </g>
    ))}
  </>
);

const scenes: Record<string, SceneSpec> = {
  hook: {
    bg: Atrium,
    fx: ({ t }) => (
      <Svg>
        {t > h.voldemort - 0.3 && t < h.rosa ? <Voldemort x={540} y={600} s={0.9} t={t} k={kf(t, [h.voldemort - 0.3, h.voldemort + 0.3], [0, 0.85])} /> : null}
      </Svg>
    ),
    chars: [
      { who: "umbridge", x: 820, y: 1440, facing: -1, show: false, acts: [{ t: h.rosa - 0.2, show: true }, { t: h.rosa - 0.2, expr: "joy" }, { t: h.rosa, pose: "crossed" }, { t: h.ejercito, show: false }] },
      { who: "harry", x: 300, y: 1450, wand: true, acts: [{ t: h.voldemort, expr: "surprise" }, { t: h.ejercito, pose: "wandUp" }, { t: h.ejercito, glow: 1 }, { t: h.ejercito, expr: "focus" }] },
      { who: "ron", x: 120, y: 1440, show: false, wand: true, acts: [{ t: h.ejercito, show: true }, { t: h.ejercito, pose: "wandAim" }] },
      { who: "hermione", x: 520, y: 1440, show: false, wand: true, acts: [{ t: h.ejercito, show: true }, { t: h.ejercito, pose: "wandAim" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: h.batalla, z: 1.1, y: 1100 }],
    sfx: [{ t: h.voldemort, s: "rumble", v: 0.6 }, { t: h.rosa, s: "pop", v: 0.4 }, { t: h.ejercito, s: "sparkle", v: 0.5 }, { t: h.batalla, s: "boom", v: 0.6 }],
  },

  dementores: {
    bg: ({ t }) => <NightStreet t={t} lights={0.3} />,
    fx: ({ t }) => (
      <Svg>
        {t > de.dementores - 0.5 && t < de.patronus + 1 ? (
          <>
            <Dementor x={kf(t, [de.dementores - 0.5, de.patronus, de.patronus + 1], [1200, 820, 1400])} y={1300} s={1} t={t} />
            <Dementor x={kf(t, [de.dementores - 0.3, de.patronus, de.patronus + 1], [1400, 980, 1600])} y={1200} s={0.9} t={t} seed={2} />
          </>
        ) : null}
        <Shield x={560} y={950} s={1.1} k={kf(t, [de.patronus - 0.1, de.patronus + 0.2, de.patronus + 1.2, de.patronus + 1.6], [0, 1, 1, 0])} />
      </Svg>
    ),
    chars: [
      { who: "dudley", x: 180, y: 1450, acts: [{ t: de.dementores, expr: "surprise" }, { t: de.dementores + 0.5, pose: "cower" }] },
      { who: "harry", x: 420, y: 1450, wand: true, acts: [{ t: de.dementores, expr: "surprise" }, { t: de.patronus - 0.3, pose: "wandAim", dur: 1.6 }, { t: de.patronus - 0.2, glow: 1 }, { t: de.patronus + 1.4, glow: 0 }, { t: de.expulsion, expr: "sadness" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: de.patronus, z: 1.1, x: 600, y: 1050 }, { t: de.expulsion, z: 1.5, x: 420, y: 1000 }],
    sfx: [{ t: de.dementores, s: "hiss", v: 0.6 }, { t: de.patronus, s: "sparkle", v: 0.8 }, { t: de.expulsion, s: "paper", v: 0.5 }],
    overlay: ({ t }) => <><Flash t={t} at={de.patronus} dur={0.4} color="#e8f7ff" /><Banner t={t} text="¡EXPULSIÓN!" t0={de.expulsion} t1={de.expulsion + 2} color="#ff6b6b" /></>,
  },

  orden: {
    bg: switchAt(or.orden - 0.3, ({ t }) => <MoonNight t={t} />, Grimmauld),
    chars: [
      { who: "moody", x: -200, y: 900, broom: true, acts: [{ t: or.escobas - 0.5, move: { x: 1400, y: 700 }, dur: 2.5 }, { t: or.orden - 0.3, show: false }] },
      { who: "tonks", x: -400, y: 1050, broom: true, acts: [{ t: or.escobas - 0.4, move: { x: 1300, y: 850 }, dur: 2.5 }, { t: or.orden - 0.3, show: false }] },
      { who: "harry", x: -300, y: 1200, broom: true, acts: [{ t: or.escobas - 0.3, move: { x: 1300, y: 1000 }, dur: 2.5 }, { t: or.escobas, expr: "joy" }, { t: or.orden - 0.3, show: false }] },
      { who: "harry", x: 300, y: 1450, show: false, acts: [{ t: or.orden - 0.3, show: true }, { t: or.sirius, expr: "joy" }, { t: or.sirius + 0.4, pose: "cheer" }] },
      { who: "sirius", x: 760, y: 1440, facing: -1, show: false, acts: [{ t: or.orden - 0.3, show: true }, { t: or.sirius, expr: "joy" }, { t: or.sirius + 0.2, pose: "wave", dur: 2 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 950 }, { t: or.orden - 0.35, z: 1.0, y: 950 }, { t: or.orden - 0.3, z: 1.0, y: 1100 }, { t: or.sirius, z: 1.2, x: 540, y: 1050 }],
    sfx: [{ t: or.escobas - 0.4, s: "whoosh", v: 0.7 }, { t: or.orden, s: "chime", v: 0.5 }, { t: or.sirius, s: "cheer", v: 0.4 }],
    overlay: ({ t }) => <Banner t={t} text="La Orden del Fénix" t0={or.orden} t1={or.orden + 2.2} color="#ffb347" />,
  },

  juicio: {
    bg: ({ t }) => <Chamber t={t} tint="#1d1d2a" light="#9fb4d8" />,
    under: ({ t }) => (
      <Svg>
        {Array.from({ length: 8 }).map((_, i) => (
          <MiniStick key={i} x={80 + i * 130} y={900} s={0.7} color="#5d3a7a" head="#efe6f5" t={t} />
        ))}
        <rect x={0} y={900} width={1080} height={40} fill="#2a2440" stroke={INK} strokeWidth={5} />
      </Svg>
    ),
    chars: [
      { who: "harry", x: 380, y: 1450, acts: [{ t: ju.juicio, expr: "sadness" }, { t: ju.libre, expr: "joy" }, { t: ju.libre + 0.3, pose: "cheer" }] },
      { who: "dumbledore", x: 1300, y: 1440, acts: [{ t: ju.dumbledore - 0.6, walk: 760 }, { t: ju.dumbledore + 0.6, face: -1 }, { t: ju.dumbledore + 0.6, pose: "talk", dur: 2 }, { t: ju.libre, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: ju.dumbledore, z: 1.15, x: 600, y: 1100 }, { t: ju.libre, z: 1.3, x: 420, y: 1050 }],
    sfx: [{ t: ju.juicio, s: "knock", v: 0.6 }, { t: ju.dumbledore, s: "chime", v: 0.4 }, { t: ju.libre, s: "fanfare", v: 0.5 }],
  },

  umbridge: {
    bg: PinkOffice,
    fx: ({ t }) => (
      <Svg>
        {t > um.mano - 0.3 ? (
          <g opacity={kf(t, [um.mano - 0.3, um.mano + 0.2], [0, 1])}>
            <rect x={240} y={420} width={600} height={300} rx={30} fill="#ffe3f1" stroke={INK} strokeWidth={8} />
            <text x={540} y={590} textAnchor="middle" fontSize={50} fontFamily="Fredoka" fontWeight={700} fill="#b0122b">No debo decir mentiras</text>
          </g>
        ) : null}
      </Svg>
    ),
    chars: [
      { who: "umbridge", x: 760, y: 1440, facing: -1, acts: [{ t: um.umbridge, expr: "joy" }, { t: um.umbridge, pose: "talk", dur: 2 }, { t: um.prohibe, pose: "point", dur: 1.5 }, { t: um.voldemort + 0.5, expr: "anger" }, { t: um.pluma, expr: "joy" }] },
      { who: "harry", x: 280, y: 1450, acts: [{ t: um.prohibe, expr: "anger" }, { t: um.voldemort - 0.2, pose: "talk", dur: 1.4 }, { t: um.pluma, pose: "hold" }, { t: um.mano, expr: "sadness" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: um.umbridge, z: 1.4, x: 760, y: 1000 }, { t: um.voldemort, z: 1.05, x: 540, y: 1100 }, { t: um.mano, z: 1.0, y: 900 }],
    sfx: [{ t: um.umbridge, s: "chime", v: 0.4 }, { t: um.prohibe, s: "zap", v: 0.3 }, { t: um.mano, s: "hiss", v: 0.4 }],
  },

  decretos: {
    bg: Corridor,
    fx: ({ t }) => (
      <Svg>
        {[0, 1, 2, 3].map((i) => (t > dc.decretos + i * 0.5 ? <Decree key={i} x={200 + i * 230} y={kf(t, [dc.decretos + i * 0.5, dc.decretos + i * 0.5 + 0.3], [-200, 450 + (i % 2) * 120])} s={0.7} n={20 + i * 3} /> : null))}
      </Svg>
    ),
    chars: [
      { who: "umbridge", x: 540, y: 1440, acts: [{ t: dc.decretos, pose: "point", dur: 2 }, { t: dc.decretos, expr: "joy" }, { t: dc.trelawney, face: 1 }, { t: dc.trelawney + 0.2, pose: "point" }] },
      { who: "trelawney", x: 860, y: 1440, facing: -1, acts: [{ t: dc.trelawney, expr: "sadness" }, { t: dc.trelawney + 0.4, pose: "sad" }, { t: dc.trelawney + 1.4, walk: 1400 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: dc.trelawney, z: 1.2, x: 720, y: 1100 }],
    sfx: [{ t: dc.decretos, s: "knock", v: 0.5 }, { t: dc.decretos + 0.5, s: "knock", v: 0.5 }, { t: dc.decretos + 1, s: "knock", v: 0.5 }, { t: dc.trelawney, s: "crash", v: 0.4 }],
  },

  ejercito: {
    bg: switchAt(ej.sala - 0.3, Corridor, RoomReq),
    fx: ({ t }) => <Svg><Shield x={760} y={950} s={0.9} k={kf(t, [ej.patronus, ej.patronus + 0.3, D("ejercito")], [0, 1, 1])} /><Spell t={t} t0={ej.sala + 1} x0={300} y0={950} x1={700} y1={950} color="#ffe36e" /></Svg>,
    chars: [
      { who: "hermione", x: 760, y: 1440, facing: -1, acts: [{ t: 0.3, pose: "talk", dur: 2 }, { t: 0, expr: "focus" }, { t: ej.sala - 0.3, move: { x: 880 }, dur: 0.01 }, { t: ej.patronus, pose: "wandAim" }, { t: ej.patronus, wand: true }, { t: ej.patronus + 0.1, glow: 1 }] },
      { who: "harry", x: 300, y: 1450, acts: [{ t: ej.ejercito, expr: "surprise" }, { t: ej.ejercito + 1, expr: "joy" }, { t: ej.sala - 0.3, move: { x: 200 }, dur: 0.01 }, { t: ej.sala, pose: "talk", dur: 3 }, { t: ej.sala, wand: true }] },
      { who: "neville", x: 450, y: 1450, show: false, wand: true, acts: [{ t: ej.sala - 0.3, show: true }, { t: ej.sala + 0.8, pose: "wandAim", dur: 1 }, { t: ej.sala + 1, glow: 1 }, { t: ej.sala + 1.6, glow: 0 }] },
      { who: "ron", x: 620, y: 1450, show: false, wand: true, acts: [{ t: ej.sala - 0.3, show: true }, { t: ej.patronus, pose: "wandUp" }, { t: ej.patronus, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ej.sala, z: 1.0, y: 1100 }, { t: ej.patronus, z: 1.1, x: 640, y: 1050 }],
    sfx: [{ t: ej.ejercito, s: "fanfare", v: 0.5 }, { t: ej.sala - 0.3, s: "whoosh", v: 0.5 }, { t: ej.sala + 1, s: "zap", v: 0.4 }, { t: ej.patronus, s: "sparkle", v: 0.6 }],
    overlay: ({ t }) => <Banner t={t} text="Ejército de Dumbledore" t0={ej.ejercito} t1={ej.ejercito + 2.2} color="#ffb347" />,
  },

  luna: {
    bg: ({ t }) => <Field t={t} dusk />,
    fx: ({ t }) => <Svg>{t > lu.thestrals - 0.4 ? <g opacity={kf(t, [lu.thestrals - 0.4, lu.thestrals + 0.3], [0, 1])}><Thestral x={820} y={1450} s={1.1} t={t} flip /></g> : null}</Svg>,
    chars: [
      { who: "luna", x: 300, y: 1440, acts: [{ t: lu.luna, expr: "joy" }, { t: lu.luna + 0.2, pose: "wave", dur: 1.6 }, { t: lu.thestrals, pose: "point" }] },
      { who: "neville", x: 120, y: 1450, acts: [{ t: lu.neville, expr: "joy" }, { t: lu.neville + 0.2, pose: "cheer", dur: 1.4 }] },
      { who: "harry", x: 500, y: 1450, acts: [{ t: lu.thestrals, expr: "surprise" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: lu.luna, z: 1.4, x: 300, y: 1050 }, { t: lu.thestrals, z: 1.0, x: 600, y: 1100 }],
    sfx: [{ t: lu.luna, s: "chime", v: 0.4 }, { t: lu.thestrals, s: "flutter", v: 0.6 }],
  },

  cho: {
    bg: RoomReq,
    under: () => <Svg><g transform="translate(540 820)" stroke={INK} strokeWidth={4}><line x1={0} y1={-300} x2={0} y2={0} stroke="#3a2414" /><ellipse cx={-20} cy={10} rx={30} ry={16} fill="#2f8f4a" /><ellipse cx={20} cy={10} rx={30} ry={16} fill="#2f8f4a" /><circle cx={0} cy={22} r={10} fill="#fff" /></g></Svg>,
    fx: ({ t }) => <Svg>{t > ch.beso - 0.2 ? [0, 1, 2].map((i) => <text key={i} x={460 + i * 80} y={kf(t, [ch.beso - 0.2, ch.beso + 2], [900, 600]) - i * 30} fontSize={80} fill="#ff4f8b">♥</text>) : null}</Svg>,
    chars: [
      { who: "harry", x: 440, y: 1450, acts: [{ t: ch.muerdago, expr: "surprise" }, { t: ch.beso, expr: "joy" }] },
      { who: "cho", x: 640, y: 1440, facing: -1, acts: [{ t: ch.muerdago, expr: "joy" }, { t: ch.beso - 0.2, move: { x: 590 }, dur: 0.3 }] },
    ],
    cam: [{ t: 0, z: 1.1, x: 540, y: 1050 }, { t: ch.beso, z: 1.6, x: 540, y: 950 }],
    sfx: [{ t: ch.beso, s: "chime", v: 0.6 }],
  },

  vision: {
    bg: switchAt(vi.gritando - 0.2, ({ t }) => <Corridor t={t} dark />, Dorm),
    fx: ({ t }) => (
      <Svg>
        {t < vi.gritando - 0.2 ? (
          <>
            <rect width={1080} height={1920} fill="#3fdc6b" opacity={0.12} />
            <Snake x={kf(t, [0, vi.serpiente + 1], [200, 640])} y={1380} s={2.2} t={t} />
          </>
        ) : null}
      </Svg>
    ),
    chars: [
      { who: "arthur", x: 820, y: 1440, facing: -1, acts: [{ t: vi.serpiente + 0.8, expr: "surprise" }, { t: vi.serpiente + 1, rot: 85, dur: 0.4 }, { t: vi.gritando - 0.2, show: false }] },
      { who: "harry", x: 380, y: 1290, show: false, acts: [{ t: vi.gritando - 0.2, show: true }, { t: vi.gritando - 0.2, pose: "sit" }, { t: vi.gritando - 0.2, expr: "surprise" }, { t: vi.real, expr: "sadness" }, { t: vi.conectados, expr: "focus" }] },
      { who: "ron", x: 760, y: 1440, show: false, facing: -1, acts: [{ t: vi.gritando - 0.2, show: true }, { t: vi.gritando, expr: "surprise" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1150 }, { t: vi.gritando - 0.25, z: 1.2, x: 700, y: 1150 }, { t: vi.gritando - 0.2, z: 1.2, x: 420, y: 1050 }],
    sfx: [{ t: vi.serpiente, s: "hiss", v: 0.7 }, { t: vi.serpiente + 1, s: "boom", v: 0.4 }, { t: vi.gritando - 0.2, s: "roar", v: 0.4 }],
    overlay: ({ t }) => <Flash t={t} at={vi.gritando - 0.2} dur={0.3} />,
  },

  oclumancia: {
    bg: ({ t }) => <Classroom t={t} dungeon />,
    fx: ({ t }) => (
      <Svg>
        <Thought x={540} y={520} k={kf(t, [oc.recuerdo - 0.3, oc.recuerdo + 0.2, D("oclumancia"), D("oclumancia") + 1], [0, 1, 1, 0])}>
          <MiniStick x={-70} y={110} s={0.55} color="#2f6fe4" head="#e3eeff" hair="#1e1e28" glasses arms="up" />
          <MiniStick x={80} y={110} s={0.5} color="#3a3f4a" head="#dfe2e8" hair="#16161c" />
        </Thought>
      </Svg>
    ),
    chars: [
      { who: "snape", x: 760, y: 1440, facing: -1, wand: true, acts: [{ t: oc.snape, pose: "wandAim", dur: 3 }, { t: oc.snape, expr: "focus" }, { t: oc.snape + 0.2, glow: 0.6 }, { t: oc.recuerdo + 0.5, expr: "anger" }] },
      { who: "harry", x: 300, y: 1450, acts: [{ t: oc.tortura, pose: "cower", dur: 1.5 }, { t: oc.tortura, expr: "sadness" }, { t: oc.recuerdo, expr: "surprise" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: oc.tortura, z: 1.3, x: 420, y: 1050 }, { t: oc.recuerdo, z: 1.0, y: 900 }],
    sfx: [{ t: oc.snape, s: "zap", v: 0.4 }, { t: oc.tortura, s: "rumble", v: 0.4 }, { t: oc.recuerdo, s: "chime", v: 0.4 }],
  },

  descubren: {
    bg: PinkOffice,
    fx: ({ t }) => <Svg>{t > ds.fenix - 0.3 ? <><circle cx={760} cy={1000} r={kf(t, [ds.fenix - 0.3, ds.fenix + 0.3], [50, 500])} fill="#ff8a1a" opacity={kf(t, [ds.fenix - 0.3, ds.fenix + 0.2, ds.fenix + 1], [0, 0.8, 0])} /><Phoenix x={kf(t, [ds.fenix, ds.fenix + 2], [760, 1300])} y={kf(t, [ds.fenix, ds.fenix + 2], [800, 300])} s={0.9} t={t} /></> : null}</Svg>,
    chars: [
      { who: "umbridge", x: 280, y: 1440, acts: [{ t: ds.descubre, expr: "joy" }, { t: ds.descubre, pose: "point", dur: 2 }, { t: ds.fenix, expr: "surprise" }] },
      { who: "harry", x: 500, y: 1450, acts: [{ t: ds.descubre, expr: "sadness" }, { t: ds.culpa, expr: "surprise" }] },
      { who: "dumbledore", x: 760, y: 1440, facing: -1, acts: [{ t: ds.culpa - 0.2, pose: "talk", dur: 2 }, { t: ds.culpa, expr: "joy" }, { t: ds.fenix - 0.1, alpha: 0, dur: 0.2 }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ds.culpa, z: 1.3, x: 700, y: 1050 }, { t: ds.fenix, z: 1.0, x: 600, y: 1000 }],
    sfx: [{ t: ds.descubre, s: "zap", v: 0.4 }, { t: ds.arrestar, s: "rumble", v: 0.4 }, { t: ds.fenix - 0.1, s: "fire", v: 0.8 }, { t: ds.fenix + 0.2, s: "flutter", v: 0.5 }],
    shake: [[ds.fenix, 0.6]],
  },

  gemelos: {
    bg: GreatHall,
    fx: ({ t }) => (
      <Svg>
        <Confetti t={t} t0={ge.fuegos} n={100} colors={["#ff6b6b", "#ffe14d", "#7dff9a", "#7ce3ff", "#ff9ae0"]} />
        {t > ge.dragon - 0.3 ? <FireDragon x={kf(t, [ge.dragon - 0.3, ge.dragon + 2.5], [-200, 1300])} y={kf(t, [ge.dragon - 0.3, ge.dragon + 2.5], [1000, 900]) + Math.sin(t * 4) * 60} s={1.2} t={t} /> : null}
      </Svg>
    ),
    chars: [
      { who: "umbridge", x: 300, y: 1440, acts: [{ t: ge.dragon, expr: "surprise" }, { t: ge.dragon + 0.2, walk: 1400, run: true }] },
      { who: "fred", x: 700, y: 1200, broom: true, acts: [{ t: 0, expr: "joy" }, { t: ge.escobas, move: { x: 1400, y: 600 }, dur: 2 }] },
      { who: "george", x: 880, y: 1240, broom: true, acts: [{ t: 0, expr: "joy" }, { t: ge.escobas + 0.2, move: { x: 1500, y: 650 }, dur: 2 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: ge.dragon, z: 1.0, y: 1000 }],
    sfx: [{ t: ge.fuegos, s: "boom", v: 0.5 }, { t: ge.fuegos + 0.4, s: "pop", v: 0.5 }, { t: ge.fuegos + 0.8, s: "pop", v: 0.5 }, { t: ge.dragon, s: "roar", v: 0.6 }, { t: ge.escobas, s: "cheer", v: 0.8 }, { t: ge.escobas + 0.2, s: "whoosh", v: 0.6 }],
  },

  centauros: {
    bg: switchAt(ce.bosque - 0.3, ({ t }) => <PinkOffice t={t} />, Forest),
    fx: ({ t }) => <Svg>{t < ce.atrapa - 0.3 && t > ce.sirius - 0.5 ? <Thought x={540} y={520} k={kf(t, [ce.sirius - 0.5, ce.sirius, ce.atrapa - 0.6, ce.atrapa - 0.3], [0, 1, 1, 0])}><MiniStick x={0} y={110} s={0.6} color="#1f3a5f" head="#e6ecf3" hair="#141418" arms="up" /></Thought> : null}{t > ce.centauros - 0.5 ? <Centaur x={kf(t, [ce.centauros - 0.5, ce.centauros + 0.5], [1400, 820])} y={1440} s={1.05} t={t} flip /> : null}</Svg>,
    chars: [
      { who: "harry", x: 240, y: 1450, acts: [{ t: ce.sirius - 0.5, expr: "surprise" }, { t: ce.sirius - 0.5, pose: "cower", dur: 1.5 }, { t: ce.bosque, expr: "focus" }] },
      { who: "hermione", x: 400, y: 1440, acts: [{ t: ce.bosque - 0.3, pose: "point", dur: 1.4 }, { t: ce.centauros, expr: "joy" }] },
      { who: "umbridge", x: 760, y: 1440, facing: -1, acts: [{ t: ce.atrapa, expr: "anger" }, { t: ce.atrapa, pose: "point", dur: 1.4 }, { t: ce.centauros, expr: "surprise" }, { t: ce.centauros + 0.3, move: { x: 1400, y: 1200 }, dur: 1.4 }, { t: ce.centauros + 0.3, rot: 40, dur: 0.4 }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: ce.atrapa, z: 1.1, x: 600, y: 1100 }, { t: ce.centauros, z: 1.0, x: 640, y: 1050 }],
    sfx: [{ t: ce.sirius - 0.5, s: "rumble", v: 0.5 }, { t: ce.atrapa, s: "zap", v: 0.3 }, { t: ce.centauros - 0.4, s: "step", v: 0.7 }, { t: ce.centauros, s: "roar", v: 0.4 }],
    overlay: ({ t }) => <Flash t={t} at={ce.bosque - 0.3} dur={0.3} />,
  },

  ministerio: {
    bg: switchAt(mi.ministerio - 0.2, ({ t }) => <MoonNight t={t} />, ({ t }) => <Mysteries t={t} />),
    fx: ({ t }) => (
      <Svg>
        {t < mi.ministerio - 0.2 ? [0, 1, 2].map((i) => <Thestral key={i} x={kf(t, [0, mi.ministerio], [-300 - i * 200, 1300 - i * 200])} y={900 + i * 150 + Math.sin(t * 3 + i) * 30} s={0.6} t={t + i} />) : null}
        {t > mi.profecia - 0.4 ? <><circle cx={540} cy={900} r={60} fill="#bfefff" stroke="#fff" strokeWidth={6} /><Sparkles x={540} y={900} intensity={1} seed={8} count={14} color="#bfefff" /></> : null}
      </Svg>
    ),
    chars: [
      { who: "harry", x: 380, y: 1450, show: false, acts: [{ t: mi.ministerio - 0.2, show: true }, { t: mi.esferas, expr: "surprise" }, { t: mi.profecia, pose: "pointUp" }] },
      { who: "ron", x: 120, y: 1450, show: false, acts: [{ t: mi.ministerio - 0.2, show: true }, { t: mi.esferas, expr: "surprise" }] },
      { who: "hermione", x: 640, y: 1440, show: false, acts: [{ t: mi.ministerio - 0.2, show: true }, { t: mi.esferas, expr: "surprise" }] },
      { who: "luna", x: 860, y: 1440, show: false, facing: -1, acts: [{ t: mi.ministerio - 0.2, show: true }, { t: mi.esferas, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: mi.ministerio - 0.25, z: 1.0, y: 1000 }, { t: mi.ministerio - 0.2, z: 1.0, y: 1100 }, { t: mi.profecia, z: 1.3, x: 540, y: 950 }],
    sfx: [{ t: mi.thestrals, s: "flutter", v: 0.6 }, { t: mi.ministerio - 0.2, s: "whoosh", v: 0.5 }, { t: mi.esferas, s: "sparkle", v: 0.5 }, { t: mi.profecia, s: "chime", v: 0.6 }],
    overlay: ({ t }) => <Banner t={t} text="Ministerio de Magia" t0={mi.ministerio} t1={mi.ministerio + 2} color="#bfefff" />,
  },

  trampa: {
    bg: ({ t }) => <Mysteries t={t} broken={kf(t, [tr.batalla, tr.rompen + 1.5], [0, 0.8])} />,
    fx: ({ t }) => (
      <Svg>
        {t > tr.lucius - 0.3 ? eaters(t, kf(t, [tr.lucius - 0.3, tr.lucius + 0.3], [0, 1])) : null}
        <Spell t={t} t0={tr.batalla} x0={300} y0={950} x1={760} y1={950} color="#ffe36e" />
        <Spell t={t} t0={tr.batalla + 0.5} x0={780} y0={950} x1={320} y1={950} color="#ff3b3b" />
        <Spell t={t} t0={tr.batalla + 1} x0={500} y0={950} x1={900} y1={900} color="#7dff9a" />
        {t > tr.rompen - 0.3 ? Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={100 + ((i * 53) % 900)} cy={kf(t, [tr.rompen - 0.3 + (i % 5) * 0.1, tr.rompen + 1.2], [300 + (i % 6) * 100, 1300])} r={14} fill="#bfefff" opacity={0.8} />) : null}
      </Svg>
    ),
    chars: [
      { who: "harry", x: 320, y: 1450, wand: true, acts: [{ t: tr.trampa, expr: "surprise" }, { t: tr.batalla - 0.3, pose: "wandAim", dur: 2 }, { t: tr.batalla - 0.2, glow: 1 }, { t: tr.batalla + 1.5, glow: 0 }, { t: tr.batalla, expr: "focus" }] },
      { who: "lucius", x: 760, y: 1440, facing: -1, show: false, wand: true, acts: [{ t: tr.lucius - 0.3, show: true }, { t: tr.lucius, pose: "point", dur: 1.4 }, { t: tr.lucius, expr: "joy" }, { t: tr.batalla + 0.3, pose: "wandAim" }] },
      { who: "bellatrix", x: 560, y: 1440, facing: -1, show: false, wand: true, acts: [{ t: tr.bellatrix - 0.3, show: true }, { t: tr.bellatrix - 0.3, expr: "joy" }, { t: tr.bellatrix, pose: "armsUp", dur: 1.5 }, { t: tr.batalla + 0.8, pose: "wandAim" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: tr.bellatrix, z: 1.35, x: 560, y: 1050 }, { t: tr.batalla, z: 1.0, x: 540, y: 1050 }],
    sfx: [{ t: tr.trampa, s: "rumble", v: 0.5 }, { t: tr.bellatrix, s: "cheer", v: 0.3 }, { t: tr.batalla, s: "zap", v: 0.6 }, { t: tr.batalla + 0.5, s: "zap", v: 0.6 }, { t: tr.batalla + 1, s: "zap", v: 0.6 }, { t: tr.rompen, s: "crash", v: 0.8 }, { t: tr.rompen + 0.4, s: "crash", v: 0.6 }],
    shake: [[tr.rompen, 0.7, 1]],
  },

  velo: {
    bg: VeilRoom,
    fx: ({ t }) => <Svg><Spell t={t} t0={ve.alcanza - 0.2} x0={900} y0={950} x1={560} y1={1000} color="#ff3b3b" dur={0.3} /></Svg>,
    chars: [
      { who: "lupin", x: 120, y: 1450, wand: true, acts: [{ t: ve.orden, pose: "wandAim", dur: 2 }, { t: ve.grita, expr: "sadness" }] },
      { who: "harry", x: 300, y: 1450, wand: true, acts: [{ t: ve.orden, expr: "joy" }, { t: ve.orden + 0.3, pose: "wandAim", dur: 2 }, { t: ve.velo, expr: "surprise" }, { t: ve.grita, expr: "sadness" }, { t: ve.grita, pose: "surprised" }] },
      { who: "sirius", x: 560, y: 1440, wand: true, acts: [{ t: ve.orden, expr: "joy" }, { t: ve.orden + 0.3, pose: "wandAim", dur: 2 }, { t: ve.alcanza, expr: "surprise" }, { t: ve.alcanza + 0.1, rot: -30, dur: 0.6 }, { t: ve.velo - 0.4, alpha: 0, dur: 1.4 }] },
      { who: "bellatrix", x: 920, y: 1440, facing: -1, wand: true, acts: [{ t: ve.alcanza - 0.4, pose: "wandAim", dur: 1 }, { t: ve.alcanza - 0.3, glow: 1 }, { t: ve.alcanza + 0.5, glow: 0 }, { t: ve.alcanza + 0.5, expr: "joy" }, { t: ve.alcanza + 0.6, pose: "cheer" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: ve.alcanza, z: 1.2, x: 600, y: 1050 }, { t: ve.velo, z: 1.3, x: 540, y: 1000 }, { t: ve.grita, z: 1.5, x: 300, y: 1000 }],
    sfx: [{ t: ve.orden, s: "fanfare", v: 0.4 }, { t: ve.alcanza - 0.2, s: "zap", v: 0.7 }, { t: ve.velo, s: "whoosh", v: 0.6 }, { t: ve.grita, s: "rumble", v: 0.5 }],
  },

  duelo: {
    bg: Atrium,
    fx: ({ t }) => (
      <Svg>
        {t > du.dumbledore && t < du.poseer ? <BeamDuel t={t} x0={300} y0={900} x1={800} y1={900} k={kf(t, [du.dumbledore, du.dumbledore + 0.3, du.poseer - 0.3, du.poseer], [0, 1, 1, 0])} /> : null}
        {t > du.poseer && t < du.amor ? <circle cx={540} cy={1050} r={400} fill="#000" opacity={0.5} /> : null}
        {t > du.amor - 0.2 && t < du.huye + 0.5 ? <circle cx={540} cy={1050} r={kf(t, [du.amor - 0.2, du.huye], [50, 700])} fill="#fff7c2" opacity={0.5} /> : null}
      </Svg>
    ),
    chars: [
      { who: "harry", x: 540, y: 1450, acts: [{ t: du.voldemort, expr: "surprise" }, { t: du.poseer, pose: "cower" }, { t: du.poseer, expr: "sadness" }, { t: du.amor, expr: "focus" }, { t: du.amor, pose: "armsUp" }, { t: du.creen, expr: "joy" }] },
      { who: "dumbledore", x: 200, y: 1440, show: false, wand: true, acts: [{ t: du.dumbledore - 0.3, show: true }, { t: du.dumbledore, pose: "wandAim", dur: 2.5 }, { t: du.dumbledore, glow: 1 }, { t: du.poseer, glow: 0 }] },
      { who: "voldemort", x: 860, y: 1440, facing: -1, wand: true, show: false, acts: [{ t: du.voldemort - 0.3, show: true }, { t: du.voldemort, expr: "anger" }, { t: du.dumbledore, pose: "wandAim", dur: 2.5 }, { t: du.dumbledore, glow: 1 }, { t: du.poseer, glow: 0 }, { t: du.huye - 0.2, alpha: 0, dur: 0.4 }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1100 }, { t: du.dumbledore, z: 1.0, y: 1000 }, { t: du.poseer, z: 1.4, x: 540, y: 1000 }, { t: du.creen, z: 1.1, x: 540, y: 1100 }],
    sfx: [{ t: du.voldemort, s: "roar", v: 0.5 }, { t: du.dumbledore, s: "zap", v: 0.7 }, { t: du.dumbledore + 0.4, s: "fire", v: 0.6 }, { t: du.dumbledore + 1, s: "splash", v: 0.6 }, { t: du.poseer, s: "rumble", v: 0.7 }, { t: du.amor, s: "chime", v: 0.6 }, { t: du.huye, s: "whoosh", v: 0.6 }],
    shake: [[du.dumbledore + 0.4, 0.5, 1.5], [du.poseer, 0.5, 1]],
    overlay: ({ t }) => <Flash t={t} at={du.huye} dur={0.4} />,
  },

  profecia: {
    bg: ({ t }) => <Chamber t={t} tint="#2a2433" light="#ffd23a" />,
    fx: ({ t }) => <Svg><circle cx={540} cy={700} r={110} fill="#bfefff" stroke="#fff" strokeWidth={8} opacity={0.9} /><Sparkles x={540} y={700} intensity={1} seed={4} count={14} color="#bfefff" />{t > pr.uno - 0.3 ? <><g transform="translate(390 700) scale(0.45)"><Voldemort x={0} y={0} s={1} t={t} k={0.9} /></g><text x={660} y={730} fontSize={120} fill="#ffe14d">⚡</text></> : null}</Svg>,
    chars: [
      { who: "dumbledore", x: 780, y: 1440, facing: -1, acts: [{ t: pr.profecia, pose: "talk", dur: 4 }, { t: 0, expr: "sadness" }] },
      { who: "harry", x: 300, y: 1450, acts: [{ t: pr.profecia, expr: "focus" }, { t: pr.uno, expr: "surprise" }] },
    ],
    cam: [{ t: 0, z: 1.05, y: 1050 }, { t: pr.uno, z: 1.0, y: 900 }],
    sfx: [{ t: pr.profecia, s: "chime", v: 0.4 }, { t: pr.uno, s: "rumble", v: 0.6 }],
  },

  final: {
    bg: NightCastle,
    chars: [
      { who: "luna", x: 100, y: 1440, acts: [{ t: 0, expr: "joy" }] },
      { who: "ron", x: 280, y: 1440, acts: [{ t: fi.amigos, expr: "joy" }, { t: fi.amigos + 0.3, pose: "cheer", dur: 2 }] },
      { who: "harry", x: 540, y: 1450, acts: [{ t: 0, expr: "sadness" }, { t: fi.amigos, expr: "joy" }] },
      { who: "hermione", x: 780, y: 1440, facing: -1, acts: [{ t: fi.amigos, expr: "joy" }, { t: fi.amigos + 0.3, pose: "cheer", dur: 2 }] },
      { who: "neville", x: 960, y: 1450, facing: -1, acts: [{ t: 0, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.1, y: 1100 }, { t: D("final"), z: 1.0, y: 1150 }],
    sfx: [{ t: fi.amigos, s: "chime", v: 0.5 }],
  },
};

export const p5full: PartSpec = { part: 0, title: "Harry Potter y la Orden del Fénix", dyn: true, scenes };
export const p5fullAudio = audio;
