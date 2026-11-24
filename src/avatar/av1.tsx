import React from "react";
import { PartSpec, SceneSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Svg } from "../scenes/bg1";
import { Banner, Flash, switchAt, wordClock } from "../scenes/util";
import { Bow, Pod, Woodsprites } from "./assets";
import { JungleDay as PandoraDay, JungleFront, JungleNight as PandoraNight } from "./jungle";
import { LabRich as LinkLab, BattleSky, SkyFlight, CryoBay, FloatingMountains, HomeTree, HomeTreeInside, HumanBase, Office, Space, TreeOfSouls, TreeOfVoices } from "./world";
import { AmpSuit, Arrow, Bulldozer, Direhorse, DragonShip, Explosion, Gunship, Hammerhead, Ikran, Missile, QueueLink, Samson, Shuttle, ShyPlant, Thanator, Torch, Toruk, Unobtanium, ViperWolf } from "./things";
import audioData from "../data/av1full.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);
const D = (id: string) => (audio.scenes.find((s) => s.id === id)?.dur ?? 300) / 30;
const S = (children: React.ReactNode) => <Svg>{children}</Svg>;
const bow = () => <Bow r={10} s={0.85} />;
const NIGHT = ({ t }: { t: number }) => <PandoraNight t={t} />;
const DAY = ({ t }: { t: number }) => <PandoraDay t={t} />;

// --- momentos clave (sincronizados con la narración)
const hk = { cuerpo: w("hook", "cuerpo"), planeta: w("hook", "planeta"), peleando: w("hook", "peleando"), soldado: w("hook", "soldado"), enamorandose: w("hook", "enamorandose") };
const ti = { tierra: w("tierra", "tierra"), silla: w("tierra", "silla"), gemelo: w("tierra", "gemelo"), murio: w("tierra", "murio"), oferta: w("tierra", "oferta") };
const na = { dormido: w("nave", "dormido"), nave: w("nave", "nave"), despierta: w("nave", "despierta"), flota: w("nave", "flota"), ventana: w("nave", "ventana"), pandora: w("nave", "pandora") };
const at = { bajan: w("aterrizaje", "bajan"), mascaras: w("aterrizaje", "mascaras"), mata: w("aterrizaje", "mata"), afuera: w("aterrizaje", "afuera"), robots: w("aterrizaje", "robots") };
const qu = { coronel: w("quaritch", "coronel"), cicatrices: w("quaritch", "cicatrices"), advierte: w("quaritch", "advierte"), matarte: w("quaritch", "matarte"), marine: w("quaritch", "marine") };
const mi = { mineral: w("mineral", "mineral"), unobtanio: w("mineral", "unobtanio"), selfridge: w("mineral", "selfridge"), plata: w("mineral", "plata"), debajo: w("mineral", "debajo") };
const av = { navi: w("avatares", "navi"), azules: w("avatares", "azules"), avatares: w("avatares", "avatares"), mente: w("avatares", "mente"), grace: w("avatares", "grace") };
const en = { acuesta: w("enlace", "acuesta"), cierra: w("enlace", "cierra"), despierta: w("enlace", "despierta"), dedos: w("enlace", "dedos"), tambaleando: w("enlace", "tambaleando"), tira: w("enlace", "tira"), corriendo: w("enlace", "corriendo"), siente: w("enlace", "siente") };
const se = { juega: w("selva", "juega"), esconden: w("selva", "esconden"), despierta: w("selva", "despierta"), martillo: w("selva", "martillo"), planta: w("selva", "planta"), va: w("selva", "va", 1), peor: w("selva", "peor") };
const th = { thanator: w("thanator", "thanator"), corriendo: w("thanator", "corriendo"), cascada: w("thanator", "cascada"), rio: w("thanator", "rio"), solo: w("thanator", "solo"), noche: w("thanator", "noche") };
const lo = { lobos: w("lobos", "lobos"), antorcha: w("lobos", "antorcha"), pelea: w("lobos", "pelea"), flechas: w("lobos", "flechas"), salva: w("lobos", "salva"), neytiri: w("lobos", "neytiri") };
const sm = { apaga: w("semillas", "apaga"), bebe: w("semillas", "bebe"), irse: w("semillas", "irse"), semillas: w("semillas", "semillas"), posan: w("semillas", "posan"), senal: w("semillas", "senal") };
const ar = { arbol: w("arbol", "arbol"), cientos: w("arbol", "cientos"), tsutey: w("arbol", "tsutey"), matarlo: w("arbol", "matarlo"), madre: w("arbol", "madre", 1), ensenar: w("arbol", "ensenar") };
const es = { base: w("espia", "base"), trato: w("espia", "trato"), operacion: w("espia", "operacion"), caminar: w("espia", "caminar"), acepta: w("espia", "acepta"), espia: w("espia", "espia") };
const ap = { idioma: w("aprende", "idioma"), silencio: w("aprende", "silencio"), arco: w("aprende", "arco"), agradecerle: w("aprende", "agradecerle"), trenza: w("aprende", "trenza"), sienten: w("aprende", "sienten") };
const ca = { montar: w("caballo", "montar"), uniendo: w("caballo", "uniendo"), cae: w("caballo", "cae"), rie: w("caballo", "rie"), poco: w("caballo", "poco"), pensar: w("caballo", "pensar") };
const mo = { montanas: w("montanas", "montanas"), cascadas: w("montanas", "cascadas"), trepar: w("montanas", "trepar"), ikran: w("montanas", "ikran"), dragon: w("montanas", "dragon") };
const ik = { elige: w("ikran", "elige"), matarlo: w("ikran", "matarlo"), salta: w("ikran", "salta"), conecta: w("ikran", "conecta"), vacio: w("ikran", "vacio"), vuela: w("ikran", "vuela"), clan: w("ikran", "clan") };
const di = { videos: w("diario", "videos"), pandora: w("diario", "pandora"), real: w("diario", "real"), silla: w("diario", "silla"), selva: w("diario", "selva") };
const am = { voces: w("amor", "voces"), ancestros: w("amor", "ancestros"), aman: w("amor", "aman"), eligen: w("amor", "eligen") };
const to = { topadoras: w("topadoras", "topadoras"), destruyen: w("topadoras", "destruyen"), rompe: w("topadoras", "rompe"), video: w("topadoras", "video"), bando: w("topadoras", "bando") };
const ak = { orden: w("ataque", "orden"), helicopteros: w("ataque", "helicopteros"), gas: w("ataque", "gas"), misiles: w("ataque", "misiles"), fuego: w("ataque", "fuego"), derrumba: w("ataque", "derrumba"), padre: w("ataque", "padre"), hogar: w("ataque", "hogar") };
const tr = { espia: w("traicion", "espia"), llora: w("traicion", "llora"), vaya: w("traicion", "vaya"), desconectados: w("traicion", "desconectados"), encerrados: w("traicion", "encerrados") };
const ec = { trudy: w("escape", "trudy"), escapar: w("escape", "escapar"), norm: w("escape", "norm"), dispara: w("escape", "dispara"), hiere: w("escape", "hiere") };
const tk = { perdonar: w("toruk", "perdonar"), cinco: w("toruk", "cinco"), tira: w("toruk", "tira"), doma: w("toruk", "doma"), rojo: w("toruk", "rojo"), rey: w("toruk", "rey") };
const tm = { aterriza: w("toruk_makto", "aterriza"), arrodillan: w("toruk_makto", "arrodillan"), leyenda: w("toruk_makto", "leyenda"), perdona: w("toruk_makto", "perdona"), lider: w("toruk_makto", "lider") };
const gr = { almas: w("grace", "almas"), conecta: w("grace", "conecta"), debil: w("grace", "debil"), muere: w("grace", "muere"), eywa: w("grace", "eywa") };
const cl = { vuela: w("clanes", "vuela"), miles: w("clanes", "miles"), ayuda: w("clanes", "ayuda"), bandos: w("clanes", "bandos"), equilibrio: w("clanes", "equilibrio") };
const ba = { nave: w("batalla", "nave"), bombas: w("batalla", "bombas"), batalla: w("batalla", "batalla"), dragones: w("batalla", "dragones"), flechas: w("batalla", "flechas"), caen: w("batalla", "caen"), tsutey: w("batalla", "tsutey") };
const ey = { perdido: w("eywa", "perdido"), responde: w("eywa", "responde"), animales: w("eywa", "animales"), martillo: w("eywa", "martillo"), thanators: w("eywa", "thanators"), salta: w("eywa", "salta"), explotar: w("eywa", "explotar") };
const du = { robot: w("duelo", "robot"), capsula: w("duelo", "capsula"), ventana: w("duelo", "ventana"), ahogar: w("duelo", "ahogar"), pelea: w("duelo", "pelea"), flechas: w("duelo", "flechas") };
const ma = { corre: w("mascara", "corre"), desmayado: w("mascara", "desmayado"), mascara: w("mascara", "mascara"), despierta: w("mascara", "despierta"), ojos: w("mascara", "ojos"), veo: w("mascara", "veo") };
const fi = { expulsados: w("final", "expulsados"), almas: w("final", "almas"), espiritu: w("final", "espiritu"), abre: w("final", "abre"), nueva: w("final", "nueva") };

const scenes: Record<string, SceneSpec> = {
  hook: {
    bg: switchAt(hk.peleando - 0.2, NIGHT, ({ t }) => <BattleSky t={t} />),
    fx: ({ t }) =>
      S(
        <>
          {t < hk.peleando - 0.2 ? <Woodsprites t={t} n={8} cx={540} cy={800} /> : null}
          {t > hk.peleando - 0.2 ? <Gunship x={kf(t, [hk.peleando - 0.2, D("hook")], [1500, 300])} y={650} s={0.9} flip t={t} fire={t > hk.soldado} /> : null}
          {t > hk.peleando - 0.2 ? <Ikran x={kf(t, [hk.peleando - 0.2, D("hook")], [-400, 800])} y={820} s={0.8} t={t} /> : null}
        </>,
      ),
    chars: [
      { who: "jakenavi", x: 400, y: 1480, acts: [{ t: 0, expr: "surprise" }, { t: hk.cuerpo, pose: "armsUp", dur: 1.2 }, { t: hk.peleando - 0.2, show: false }, { t: hk.enamorandose, show: true }, { t: hk.enamorandose, expr: "joy" }] },
      { who: "neytiri", x: 700, y: 1480, facing: -1, holding: bow, show: false, acts: [{ t: hk.enamorandose, show: true }, { t: hk.enamorandose, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.1, y: 1100 }, { t: hk.peleando, z: 1.0, y: 1000 }, { t: hk.enamorandose, z: 1.25, y: 1150 }],
    sfx: [{ t: hk.cuerpo, s: "sparkle", v: 0.5 }, { t: hk.peleando - 0.2, s: "boom", v: 0.6 }, { t: hk.soldado, s: "zap", v: 0.5 }, { t: hk.enamorandose, s: "chime", v: 0.5 }],
    overlay: ({ t }) => <Flash t={t} at={hk.peleando - 0.2} dur={0.3} />,
  },

  tierra: {
    bg: ({ t }) => <HumanBase t={t} />,
    overlay: ({ t }) => <Banner t={t} text="Año 2154 · La Tierra" t0={0.2} t1={ti.silla - 0.3} color="#bfe8ff" />,
    chars: [
      { who: "jake", x: -100, y: 1480, acts: [{ t: 0.3, walk: 420, dur: 2.2 }, { t: ti.murio, expr: "sadness" }, { t: ti.oferta, expr: "surprise" }] },
      { who: "soldado", x: 820, y: 1480, facing: -1, name: false, show: false, acts: [{ t: ti.gemelo - 0.4, show: true }, { t: ti.gemelo - 0.4, walk: 680, dur: 0.8 }, { t: ti.oferta, pose: "point", dur: 1.6 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: ti.silla, z: 1.45, x: 420, y: 1250 }, { t: ti.murio, z: 1.3, x: 420, y: 1200 }, { t: ti.oferta, z: 1.1, x: 560, y: 1150 }],
    sfx: [{ t: ti.murio, s: "rumble", v: 0.4 }, { t: ti.oferta, s: "chime", v: 0.4 }],
  },

  nave: {
    bg: switchAt(na.despierta - 0.2, ({ t }) => <Space t={t} />, ({ t }) => <CryoBay t={t} open={kf(t, [na.despierta - 0.2, na.despierta + 0.6], [0, 1])} />),
    fx: ({ t }) => (t > na.ventana - 0.2 ? S(<g opacity={kf(t, [na.ventana - 0.2, na.ventana + 0.4], [0, 1])}><rect x={-460} y={0} width={2000} height={1920} fill="#02030c" opacity={0.0} /></g>) : null),
    chars: [
      { who: "jake", x: 540, y: 1300, show: false, name: true, acts: [{ t: na.despierta, show: true }, { t: na.despierta, expr: "sleep" }, { t: na.flota - 0.3, expr: "surprise" }, { t: na.flota - 0.3, move: { y: 1050 }, dur: 1.2 }, { t: na.flota - 0.3, rot: 25, dur: 2.5 }, { t: na.pandora, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: na.nave, z: 1.2, x: 540, y: 980 }, { t: na.despierta, z: 1.2, x: 540, y: 1200 }, { t: na.ventana, z: 1.0, y: 900 }],
    sfx: [{ t: 0.2, s: "rumble", v: 0.4 }, { t: na.despierta - 0.2, s: "whoosh", v: 0.5 }, { t: na.flota, s: "sparkle", v: 0.3 }, { t: na.pandora, s: "chime", v: 0.5 }],
    overlay: ({ t }) => <Flash t={t} at={na.despierta - 0.2} dur={0.3} color="#bff4ff" />,
  },

  aterrizaje: {
    bg: ({ t }) => <HumanBase t={t} />,
    under: ({ t }) =>
      S(
        <>
          <Shuttle x={kf(t, [0, at.mascaras], [300, 360])} y={kf(t, [0, at.mascaras], [700, 1180])} s={1.0} t={t} door={kf(t, [at.mata, at.afuera], [0, 1])} />
          {t > at.afuera ? <Samson x={kf(t, [at.afuera, D("aterrizaje")], [1500, 1100])} y={760} s={0.9} flip t={t} /> : null}
          {t > at.robots - 0.6 ? <AmpSuit x={kf(t, [at.robots - 0.6, D("aterrizaje")], [1500, 1180])} y={1470} s={1.35} flip t={t} walk={1} /> : null}
        </>,
      ),
    chars: [
      { who: "soldado", mask: true, x: 250, y: 1480, show: false, name: false, acts: [{ t: at.afuera, show: true }, { t: at.afuera, walk: 760, dur: 2 }] },
      { who: "jake", mask: true, x: 340, y: 1480, show: false, acts: [{ t: at.afuera + 0.4, show: true }, { t: at.afuera + 0.4, walk: 520, dur: 1.8 }, { t: at.robots, expr: "surprise" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: at.mascaras, z: 1.25, x: 360, y: 1150 }, { t: at.afuera, z: 1.0, y: 1100 }, { t: at.robots, z: 1.1, x: 800, y: 1100 }],
    sfx: [{ t: 0.2, s: "rumble", v: 0.6 }, { t: at.mascaras, s: "hiss", v: 0.5 }, { t: at.afuera, s: "whoosh", v: 0.4 }, { t: at.robots, s: "step", v: 0.8 }, { t: at.robots + 0.5, s: "step", v: 0.8 }],
    shake: [[at.mascaras - 0.3, 0.6, 0.6]],
  },

  quaritch: {
    bg: ({ t }) => <HumanBase t={t} />,
    under: ({ t }) => S(<AmpSuit x={1320} y={1440} s={1.25} flip t={t} />),
    chars: [
      { who: "soldado", mask: true, x: 120, y: 1480, name: false },
      { who: "jake", mask: true, x: 330, y: 1480, acts: [{ t: qu.marine, expr: "joy" }] },
      { who: "norm", mask: true, x: 500, y: 1480, acts: [{ t: qu.matarte, expr: "surprise" }] },
      { who: "quaritch", x: 820, y: 1480, facing: -1, acts: [{ t: 0, expr: "anger" }, { t: qu.advierte, pose: "point", dur: 2 }, { t: qu.marine, expr: "focus" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: qu.coronel, z: 1.3, x: 820, y: 1100 }, { t: qu.cicatrices, z: 1.7, x: 820, y: 1000 }, { t: qu.matarte, z: 1.2, x: 600, y: 1150 }, { t: qu.marine, z: 1.4, x: 450, y: 1150 }],
    sfx: [{ t: qu.coronel, s: "boom", v: 0.4 }, { t: qu.matarte, s: "roar", v: 0.3 }],
  },

  mineral: {
    bg: ({ t }) => <Office t={t} />,
    fx: ({ t }) => S(<Unobtanium x={540} y={1200} s={1.6} t={t} k={kf(t, [mi.mineral - 0.2, mi.mineral + 0.4], [0, 1])} />),
    chars: [
      { who: "selfridge", x: 760, y: 1480, facing: -1, show: false, acts: [{ t: mi.selfridge - 0.4, show: true }, { t: mi.plata, expr: "joy" }, { t: mi.plata, pose: "armsUp", dur: 0.8 }, { t: mi.debajo, pose: "point", dur: 1.5 }] },
      { who: "grace", x: 260, y: 1480, show: false, acts: [{ t: mi.debajo - 0.3, show: true }, { t: mi.debajo, expr: "anger" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: mi.unobtanio, z: 1.6, x: 540, y: 1150 }, { t: mi.selfridge, z: 1.2, x: 700, y: 1100 }, { t: mi.debajo, z: 1.05, y: 1100 }],
    sfx: [{ t: mi.unobtanio, s: "sparkle", v: 0.5 }, { t: mi.plata, s: "coins", v: 0.6 }],
  },

  avatares: {
    bg: switchAt(av.avatares - 0.2, DAY, ({ t }) => <LinkLab t={t} />),
    under: ({ t }) =>
      S(
        t > av.avatares - 0.2 ? (
          <>
            {/* tanques con avatares flotando */}
            {[180, 900].map((x, i) => (
              <g key={i}>
                <rect x={x - 110} y={700} width={220} height={620} rx={50} fill="rgba(120,220,255,0.35)" stroke="#1b1b2f" strokeWidth={8} />
                <rect x={x - 110} y={1300} width={220} height={40} fill="#5a6a7a" stroke="#1b1b2f" strokeWidth={6} />
                {[0, 1, 2, 3].map((j) => (
                  <circle key={j} cx={x - 60 + j * 40} cy={1250 - ((t * 120 + j * 90) % 500)} r={6} fill="#e8fbff" opacity={0.7} />
                ))}
              </g>
            ))}
            <Pod x={540} y={1440} s={0.8} t={t} k={0} glow={kf(t, [av.mente - 0.2, av.mente + 0.5], [0, 1])} />
          </>
        ) : null,
      ),
    chars: [
      { who: "neytiri", x: 360, y: 1480, holding: bow, acts: [{ t: av.avatares - 0.2, show: false }] },
      { who: "tsutey", x: 700, y: 1480, facing: -1, acts: [{ t: av.avatares - 0.2, show: false }] },
      { who: "gracenavi", x: 180, y: 1300, s: 1.5, name: false, show: false, opacity: 0.85, acts: [{ t: av.avatares - 0.2, show: true }, { t: 0, expr: "sleep" }] },
      { who: "jakenavi", x: 900, y: 1300, s: 1.5, name: false, show: false, opacity: 0.85, acts: [{ t: av.avatares - 0.2, show: true }, { t: 0, expr: "sleep" }] },
      { who: "grace", x: 560, y: 1480, show: false, acts: [{ t: av.grace - 0.4, show: true }, { t: av.grace, expr: "focus" }, { t: av.grace + 0.4, pose: "point", dur: 1.2 }] },
    ],
    cam: [{ t: 0, z: 1.2, y: 1100 }, { t: av.azules, z: 1.5, x: 520, y: 1000 }, { t: av.avatares, z: 1.0, y: 1050 }, { t: av.mente, z: 1.3, x: 540, y: 1300 }, { t: av.grace, z: 1.25, x: 560, y: 1150 }],
    sfx: [{ t: av.navi, s: "chime", v: 0.4 }, { t: av.avatares - 0.2, s: "whoosh", v: 0.5 }, { t: av.mente, s: "zap", v: 0.4 }],
    overlay: ({ t }) => <Flash t={t} at={av.avatares - 0.2} dur={0.3} />,
  },

  enlace: {
    bg: switchAt(en.despierta - 0.2, ({ t }) => <LinkLab t={t} />, ({ t }) => (t < en.corriendo - 0.2 ? <LinkLab t={t} /> : <PandoraDay t={t} />)),
    under: ({ t }) => S(t < en.despierta - 0.2 ? <Pod x={560} y={1440} s={1.1} t={t} k={kf(t, [en.cierra - 0.3, en.cierra + 0.3], [0, 1])} glow={kf(t, [en.cierra, en.despierta - 0.3], [0, 1])} /> : null),
    fx: ({ t }) => S(t > en.tira - 0.1 && t < en.corriendo - 0.2 ? [0, 1, 2, 3].map((i) => <rect key={i} x={760 + i * 60} y={kf(t, [en.tira, en.tira + 0.6], [1100, 1440 - i * 10])} width={40} height={30} fill="#9aa4ae" stroke="#1b1b2f" strokeWidth={4} transform={`rotate(${(t - en.tira) * 200 * (i % 2 ? 1 : -1)} ${780 + i * 60} 1300)`} />) : null),
    chars: [
      { who: "jake", x: 300, y: 1480, acts: [{ t: 0, walk: 420, dur: 1 }, { t: en.acuesta - 0.1, alpha: 0, dur: 0.4 }] },
      { who: "grace", x: 900, y: 1480, facing: -1, acts: [{ t: en.despierta - 0.2, expr: "focus" }, { t: en.tira, expr: "surprise" }, { t: en.corriendo - 0.2, show: false }] },
      {
        who: "jakenavi",
        x: 540,
        y: 1480,
        show: false,
        acts: [
          { t: en.despierta - 0.2, show: true },
          { t: en.despierta - 0.2, rot: -80 },
          { t: en.despierta - 0.2, expr: "sleep" },
          { t: en.despierta + 0.4, expr: "surprise" },
          { t: en.tambaleando - 0.2, rot: 0, dur: 0.6 },
          { t: en.tambaleando, pose: "surprised", dur: 1.0 },
          { t: en.tira, walk: 780, dur: 0.8 },
          { t: en.corriendo - 0.2, move: { x: 0 }, dur: 0.01 },
          { t: en.corriendo - 0.2, expr: "joy" },
          { t: en.corriendo - 0.1, walk: 1050, dur: 1.3, run: true },
          { t: en.siente - 0.6, face: -1 },
          { t: en.siente, pose: "armsUp", dur: 1.5 },
        ],
      },
    ],
    cam: [{ t: 0, z: 1.1, x: 480, y: 1200 }, { t: en.cierra, z: 1.5, x: 560, y: 1300 }, { t: en.despierta, z: 1.6, x: 520, y: 1250 }, { t: en.dedos, z: 1.3, x: 600, y: 1350 }, { t: en.tambaleando, z: 1.1, y: 1150 }, { t: en.corriendo, z: 1.0, y: 1100 }],
    sfx: [{ t: en.cierra, s: "whoosh", v: 0.5 }, { t: en.despierta - 0.2, s: "zap", v: 0.6 }, { t: en.tira, s: "crash", v: 0.6 }, { t: en.corriendo, s: "step", v: 0.7 }, { t: en.corriendo + 0.35, s: "step", v: 0.7 }, { t: en.siente, s: "cheer", v: 0.3 }],
    overlay: ({ t }) => (
      <>
        <Flash t={t} at={en.despierta - 0.2} dur={0.4} color="#bff4ff" />
        <Flash t={t} at={en.corriendo - 0.2} dur={0.3} />
      </>
    ),
  },

  selva: {
    bg: DAY,
    under: ({ t }) => S([[260, 1400], [430, 1380], [850, 1400]].map(([x, y], i) => <ShyPlant key={i} x={x} y={y} s={1.1} t={t} k={kf(t, [se.esconden + i * 0.15, se.esconden + 0.3 + i * 0.15], [0, 1])} />)),
    fx: ({ t }) => S(t > se.despierta - 0.3 && t < se.peor ? <Hammerhead x={kf(t, [se.despierta - 0.3, se.martillo, se.va, se.peor], [1700, 1150, 1150, 1900])} y={1480} s={1.05} flip t={t} charge={t < se.planta ? 1 : 0} /> : null),
    chars: [
      { who: "jakenavi", x: 330, y: 1480, acts: [{ t: 0, expr: "joy" }, { t: se.juega, pose: "point", dur: 1.6 }, { t: se.martillo, expr: "surprise" }, { t: se.planta, pose: "angry", dur: 1.4 }, { t: se.planta, expr: "anger" }, { t: se.va, expr: "joy" }, { t: se.peor, expr: "surprise" }] },
      { who: "grace", x: -100, y: 1480, show: false },
    ],
    cam: [{ t: 0, z: 1.2, x: 380, y: 1250 }, { t: se.esconden, z: 1.4, x: 350, y: 1300 }, { t: se.martillo, z: 1.0, y: 1100 }, { t: se.planta, z: 1.3, x: 500, y: 1150 }, { t: se.peor, z: 1.5, x: 330, y: 1050 }],
    sfx: [{ t: se.esconden, s: "pop", v: 0.6 }, { t: se.martillo, s: "roar", v: 0.7 }, { t: se.martillo + 0.3, s: "rumble", v: 0.6 }, { t: se.peor, s: "hiss", v: 0.6 }],
    shake: [[se.martillo + 0.2, 0.7, 0.8]],
  },

  thanator: {
    bg: switchAt(th.noche - 0.3, DAY, NIGHT),
    fx: ({ t }) =>
      S(
        <>
          {t < th.cascada ? <Thanator x={kf(t, [0, th.corriendo, th.cascada], [1500, 1150, 600])} y={1490} s={1.0} flip t={t} roar={kf(t, [th.thanator - 0.2, th.thanator + 0.4, th.thanator + 1.0], [0, 1, 0.2])} run={t > th.corriendo ? 1 : 0} /> : null}
          {t > th.cascada - 0.2 && t < th.solo ? (
            <g>
              <rect x={-460} y={900} width={2000} height={700} fill="#4aa8d8" opacity={0.0} />
              <path d="M 300 0 L 800 0 L 860 1920 L 240 1920 Z" fill="#e8f8ff" opacity={0.7} />
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={i} x1={320 + i * 110} y1={(t * 900 + i * 300) % 1920} x2={320 + i * 110} y2={((t * 900 + i * 300) % 1920) + 200} stroke="#fff" strokeWidth={10} />
              ))}
            </g>
          ) : null}
        </>,
      ),
    chars: [
      { who: "jakenavi", x: 600, y: 1480, acts: [{ t: 0, expr: "surprise" }, { t: th.corriendo - 0.1, walk: -200, dur: 1.4, run: true }, { t: th.cascada - 0.2, move: { x: 540, y: 600 }, dur: 0.01 }, { t: th.cascada - 0.2, move: { y: 1700 }, dur: 1.0 }, { t: th.cascada - 0.2, rot: 180, dur: 1 }, { t: th.solo - 0.1, move: { x: 540, y: 1480 }, dur: 0.01 }, { t: th.solo - 0.1, rot: 0, dur: 0.01 }, { t: th.solo, expr: "sadness" }, { t: th.noche, pose: "cower", dur: 2 }] },
    ],
    cam: [{ t: 0, z: 1.3, x: 1000, y: 1100 }, { t: th.thanator + 0.2, z: 1.6, x: 1150, y: 1050 }, { t: th.corriendo, z: 1.0, y: 1100 }, { t: th.cascada, z: 1.1, y: 1000 }, { t: th.solo, z: 1.3, x: 540, y: 1200 }],
    sfx: [{ t: th.thanator, s: "roar", v: 0.9 }, { t: th.corriendo, s: "step", v: 0.7 }, { t: th.corriendo + 0.3, s: "step", v: 0.7 }, { t: th.cascada, s: "whoosh", v: 0.6 }, { t: th.rio, s: "splash", v: 0.8 }, { t: th.noche, s: "rumble", v: 0.3 }],
    shake: [[th.thanator, 0.6, 0.7]],
    overlay: ({ t }) => <Flash t={t} at={th.noche - 0.3} dur={0.3} color="#000" />,
  },

  lobos: {
    bg: NIGHT,
    fx: ({ t }) =>
      S(
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} opacity={t > lo.salva + i * 0.2 ? Math.max(0, 1 - (t - lo.salva - i * 0.2) * 2) : 1}>
              <ViperWolf x={kf(t, [0, lo.lobos + 0.5], [i < 2 ? -300 - i * 100 : 1400 + i * 50, i < 2 ? 220 + i * 120 : 820 + (i - 2) * 140])} y={1490 - (i % 2) * 30} s={1.1} flip={i >= 2} t={t} />
            </g>
          ))}
          <Arrow x0={1300} y0={700} x1={300} y1={1400} t={t} t0={lo.flechas} />
          <Arrow x0={1300} y0={650} x1={820} y1={1420} t={t} t0={lo.flechas + 0.25} />
          <Arrow x0={1300} y0={600} x1={950} y1={1400} t={t} t0={lo.flechas + 0.5} />
        </>,
      ),
    chars: [
      { who: "jakenavi", x: 540, y: 1480, holding: (t) => (t > lo.antorcha - 0.2 ? <Torch t={t} /> : null), acts: [{ t: 0, expr: "surprise" }, { t: lo.antorcha, pose: "wandUp", dur: 2.5 }, { t: lo.pelea, expr: "anger" }, { t: lo.salva, expr: "surprise" }] },
      { who: "neytiri", x: 1500, y: 1480, facing: -1, holding: bow, show: false, acts: [{ t: lo.neytiri - 0.6, show: true }, { t: lo.neytiri - 0.6, walk: 860, dur: 0.8, run: true }, { t: lo.neytiri + 0.2, expr: "focus" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: lo.antorcha, z: 1.3, x: 540, y: 1150 }, { t: lo.flechas, z: 1.0, y: 1100 }, { t: lo.neytiri, z: 1.4, x: 860, y: 1050 }],
    sfx: [{ t: lo.lobos, s: "hiss", v: 0.6 }, { t: lo.antorcha, s: "fire", v: 0.5 }, { t: lo.pelea, s: "roar", v: 0.5 }, { t: lo.flechas, s: "whoosh", v: 0.6 }, { t: lo.flechas + 0.3, s: "whoosh", v: 0.6 }, { t: lo.neytiri, s: "chime", v: 0.4 }],
  },

  semillas: {
    bg: NIGHT,
    fx: ({ t }) => S(t > sm.semillas - 0.5 ? <Woodsprites t={t} n={12} cx={kf(t, [sm.semillas - 0.5, sm.posan + 0.5], [700, 460])} cy={kf(t, [sm.semillas - 0.5, sm.posan + 0.5], [500, 1050])} k={kf(t, [sm.semillas - 0.5, sm.semillas + 0.3], [0, 1])} /> : null),
    chars: [
      { who: "jakenavi", x: 460, y: 1480, holding: (t) => (t < sm.apaga + 0.2 ? <Torch t={t} /> : null), acts: [{ t: sm.apaga, expr: "surprise" }, { t: sm.bebe, expr: "sadness" }, { t: sm.posan, pose: "armsUp", dur: 2 }, { t: sm.posan, expr: "joy" }] },
      { who: "neytiri", x: 760, y: 1480, facing: -1, holding: bow, acts: [{ t: sm.apaga - 0.2, pose: "point", dur: 0.8 }, { t: sm.bebe, expr: "anger" }, { t: sm.bebe, pose: "point", dur: 1.2 }, { t: sm.irse, face: 1 }, { t: sm.irse, walk: 1000, dur: 1 }, { t: sm.semillas, face: -1 }, { t: sm.semillas, expr: "surprise" }, { t: sm.senal, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.3, x: 600, y: 1100 }, { t: sm.bebe, z: 1.5, x: 760, y: 1000 }, { t: sm.semillas, z: 1.0, y: 1000 }, { t: sm.senal, z: 1.3, x: 520, y: 1100 }],
    sfx: [{ t: sm.apaga, s: "hiss", v: 0.5 }, { t: sm.semillas, s: "sparkle", v: 0.6 }, { t: sm.senal, s: "chime", v: 0.6 }],
  },

  arbol: {
    bg: switchAt(ar.tsutey - 0.3, ({ t }) => <HomeTree t={t} night />, ({ t }) => <HomeTreeInside t={t} />),
    chars: [
      { who: "neytiri", x: 300, y: 1480, holding: bow, acts: [{ t: 0, walk: 520, dur: 1.5 }, { t: ar.tsutey - 0.3, move: { x: 420 }, dur: 0.01 }, { t: ar.matarlo, pose: "point", dur: 1 }] },
      { who: "jakenavi", x: 120, y: 1480, acts: [{ t: 0, walk: 320, dur: 1.5 }, { t: ar.cientos, expr: "surprise" }, { t: ar.tsutey - 0.3, move: { x: 600 }, dur: 0.01 }, { t: ar.matarlo, expr: "surprise" }, { t: ar.ensenar, expr: "joy" }] },
      { who: "tsutey", x: 900, y: 1480, facing: -1, show: false, acts: [{ t: ar.tsutey - 0.3, show: true }, { t: 0, expr: "anger" }, { t: ar.matarlo, pose: "angry", dur: 1.5 }] },
      { who: "eytukan", x: 1100, y: 1480, facing: -1, show: false, acts: [{ t: ar.tsutey - 0.3, show: true }] },
      { who: "moat", x: 1300, y: 1480, facing: -1, show: false, acts: [{ t: ar.madre - 0.3, show: true }, { t: ar.madre - 0.3, walk: 800, dur: 1 }, { t: ar.ensenar, pose: "point", dur: 1.2 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 950 }, { t: ar.cientos, z: 1.05, y: 900 }, { t: ar.tsutey, z: 1.4, x: 900, y: 1050 }, { t: ar.madre, z: 1.1, x: 750, y: 1100 }, { t: ar.ensenar, z: 1.3, x: 600, y: 1100 }],
    sfx: [{ t: ar.arbol, s: "chime", v: 0.5 }, { t: ar.tsutey, s: "roar", v: 0.4 }, { t: ar.madre, s: "sparkle", v: 0.4 }],
    overlay: ({ t }) => <Flash t={t} at={ar.tsutey - 0.3} dur={0.3} />,
  },

  espia: {
    bg: ({ t }) => <LinkLab t={t} />,
    under: ({ t }) => S(<Pod x={300} y={1440} s={0.9} t={t} k={kf(t, [0, 0.6], [1, 0])} />),
    overlay: ({ t }) => <Banner t={t} text="Trato secreto 🤫" t0={es.trato} t1={es.trato + 2} color="#ffb0b0" />,
    chars: [
      { who: "jake", x: 330, y: 1480, acts: [{ t: 0.8, walk: 480, dur: 1 }, { t: es.trato, expr: "surprise" }, { t: es.caminar, expr: "joy" }, { t: es.acepta, expr: "focus" }] },
      { who: "quaritch", x: 1300, y: 1480, facing: -1, acts: [{ t: es.base, walk: 760, dur: 1.4 }, { t: es.trato, pose: "point", dur: 1.4 }, { t: es.caminar, expr: "joy" }, { t: es.acepta, pose: "crossed" }] },
    ],
    cam: [{ t: 0, z: 1.2, x: 360, y: 1250 }, { t: es.trato, z: 1.2, x: 620, y: 1150 }, { t: es.operacion, z: 1.5, x: 760, y: 1050 }, { t: es.caminar, z: 1.6, x: 480, y: 1100 }, { t: es.espia, z: 1.1, y: 1150 }],
    sfx: [{ t: es.trato, s: "knock", v: 0.4 }, { t: es.acepta, s: "boom", v: 0.4 }],
  },

  aprende: {
    bg: switchAt(ap.trenza - 0.2, DAY, NIGHT),
    fx: ({ t }) =>
      S(
        <>
          {t > ap.arco && t < ap.agradecerle + 1.2 ? <Arrow x0={520} y0={1180} x1={1250} y1={1300} t={t} t0={ap.arco + 0.4} /> : null}
          {t > ap.trenza - 0.2 ? <QueueLink x0={430} y0={1100} x1={760} y1={1240} t={t} k={kf(t, [ap.trenza, ap.trenza + 0.4], [0, 1])} /> : null}
          {t > ap.trenza - 0.2 ? <g transform="translate(800 1420)"><path d="M 0 0 Q -40 -120 -10 -220 Q 30 -120 0 0" fill="#ff7ad8" stroke="#1b1b2f" strokeWidth={5} opacity={kf(t, [ap.trenza, ap.trenza + 0.4], [0.5, 1])} filter="url(#glow)" /></g> : null}
        </>,
      ),
    overlay: ({ t }) => (
      <>
        <Banner t={t} text="Lección 1: el idioma" t0={ap.idioma - 0.2} t1={ap.silencio - 0.3} color="#bff4ff" />
        <Banner t={t} text="Lección 2: cazar" t0={ap.arco - 0.2} t1={ap.agradecerle + 0.8} color="#ffe14d" />
        <Banner t={t} text="Lección 3: la conexión" t0={ap.trenza - 0.2} t1={ap.trenza + 2.2} color="#ff9ae0" />
      </>
    ),
    chars: [
      { who: "jakenavi", x: 400, y: 1480, holding: (t) => (t > ap.arco - 0.3 && t < ap.trenza - 0.2 ? <Bow r={-10} s={0.85} /> : null), acts: [{ t: ap.idioma, pose: "talk", dur: 1.5 }, { t: ap.silencio, walk: 520, dur: 1.2 }, { t: ap.arco, pose: "wandAim", dur: 1.2 }, { t: ap.agradecerle, pose: "sad", dur: 1.5 }, { t: ap.trenza, pose: "point", dur: 2 }, { t: ap.sienten, expr: "joy" }] },
      { who: "neytiri", x: 820, y: 1480, facing: -1, holding: bow, acts: [{ t: ap.idioma, pose: "talk", dur: 1.3 }, { t: ap.agradecerle, expr: "joy" }, { t: ap.trenza - 0.2, move: { x: 1000 }, dur: 0.01 }] },
    ],
    cam: [{ t: 0, z: 1.2, y: 1150 }, { t: ap.arco, z: 1.3, x: 520, y: 1150 }, { t: ap.agradecerle, z: 1.1, x: 800, y: 1150 }, { t: ap.trenza, z: 1.4, x: 600, y: 1150 }],
    sfx: [{ t: ap.arco + 0.4, s: "whoosh", v: 0.5 }, { t: ap.trenza, s: "sparkle", v: 0.6 }, { t: ap.sienten, s: "chime", v: 0.5 }],
  },

  caballo: {
    bg: DAY,
    under: ({ t }) =>
      S(
        <>
          <Direhorse x={kf(t, [ca.poco, D("caballo")], [560, 1500])} y={1480} s={1.1} t={t} run={t > ca.poco ? 1 : t > ca.cae && t < ca.cae + 0.8 ? 1 : 0} />
          <QueueLink x0={kf(t, [ca.poco, D("caballo")], [500, 1440])} y0={1050} x1={kf(t, [ca.poco, D("caballo")], [760, 1700])} y1={1150} t={t} k={kf(t, [ca.uniendo, ca.uniendo + 0.4], [0, 1]) * (t > ca.cae && t < ca.rie ? 0 : 1)} />
        </>,
      ),
    chars: [
      { who: "jakenavi", x: 500, y: 1300, acts: [{ t: 0, pose: "ride" }, { t: ca.cae, move: { x: 320, y: 1480 }, dur: 0.4 }, { t: ca.cae, rot: -70, dur: 0.4 }, { t: ca.cae, expr: "surprise" }, { t: ca.rie + 0.6, move: { x: 500, y: 1300 }, dur: 0.3 }, { t: ca.rie + 0.6, rot: 0, dur: 0.3 }, { t: ca.poco, move: { x: 1440 }, dur: D("caballo") - ca.poco }, { t: ca.poco, expr: "joy" }] },
      { who: "neytiri", x: 900, y: 1480, facing: -1, holding: bow, acts: [{ t: ca.rie, expr: "joy" }, { t: ca.rie, pose: "cheer", dur: 1.2 }] },
    ],
    cam: [{ t: 0, z: 1.15, x: 600, y: 1150 }, { t: ca.cae, z: 1.4, x: 400, y: 1250 }, { t: ca.rie, z: 1.4, x: 900, y: 1050 }, { t: ca.poco, z: 1.0, y: 1100 }],
    sfx: [{ t: ca.uniendo, s: "sparkle", v: 0.5 }, { t: ca.cae + 0.3, s: "crash", v: 0.6 }, { t: ca.rie, s: "cheer", v: 0.3 }, { t: ca.poco, s: "step", v: 0.6 }],
  },

  montanas: {
    bg: ({ t }) => <FloatingMountains t={t} />,
    fx: ({ t }) => S(t > mo.ikran - 0.3 ? <Ikran x={kf(t, [mo.ikran - 0.3, D("montanas")], [1500, 1000])} y={kf(t, [mo.ikran - 0.3, D("montanas")], [500, 900])} s={0.9} flip t={t} /> : null),
    chars: [
      { who: "jakenavi", x: 300, y: 1480, acts: [{ t: 0, expr: "surprise" }, { t: mo.trepar, walk: 560, dur: 1.5 }, { t: mo.dragon, expr: "focus" }] },
      { who: "neytiri", x: 120, y: 1480, holding: bow, acts: [{ t: mo.trepar, walk: 360, dur: 1.5 }] },
      { who: "tsutey", x: -100, y: 1480, acts: [{ t: mo.trepar, walk: 140, dur: 1.5 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 850 }, { t: mo.cascadas, z: 1.05, y: 800 }, { t: mo.trepar, z: 1.15, x: 400, y: 1100 }, { t: mo.ikran, z: 1.0, y: 1000 }],
    sfx: [{ t: mo.montanas, s: "chime", v: 0.5 }, { t: mo.cascadas, s: "splash", v: 0.3 }, { t: mo.ikran, s: "roar", v: 0.6 }],
  },

  ikran: {
    bg: switchAt(ik.vacio - 0.2, ({ t }) => <FloatingMountains t={t} />, ({ t }) => <SkyFlight t={t} speed={1.4} />),
    under: ({ t }) =>
      S(
        t < ik.vacio - 0.2 ? (
          <Ikran x={kf(t, [0, ik.salta], [800, 700])} y={1300} s={1.1} flip t={t} perch={t < ik.salta} flap={t < ik.salta ? 0 : 1} />
        ) : (
          <Ikran x={kf(t, [ik.vacio - 0.2, D("ikran")], [-200, 1300])} y={kf(t, [ik.vacio - 0.2, D("ikran")], [600, 900])} s={1.2} t={t} />
        ),
      ),
    fx: ({ t }) => S(t > ik.conecta - 0.1 && t < ik.vacio - 0.2 ? <QueueLink x0={620} y0={1050} x1={760} y1={1240} t={t} k={1} /> : null),
    chars: [
      {
        who: "jakenavi",
        x: 380,
        y: 1480,
        acts: [
          { t: 0, expr: "focus" },
          { t: ik.matarlo, pose: "cower", dur: 0.8 },
          { t: ik.matarlo, expr: "surprise" },
          { t: ik.salta - 0.2, move: { x: 680, y: 1220 }, dur: 0.4 },
          { t: ik.salta, pose: "ride" },
          { t: ik.conecta, expr: "anger" },
          { t: ik.vacio - 0.2, move: { x: -190, y: 610 }, dur: 0.01 },
          { t: ik.vacio - 0.19, move: { x: 1310, y: 910 }, dur: D("ikran") - ik.vacio + 0.19 },
          { t: ik.vuela, expr: "joy" },
        ],
      },
    ],
    cam: [{ t: 0, z: 1.2, x: 600, y: 1150 }, { t: ik.matarlo, z: 1.5, x: 700, y: 1150 }, { t: ik.conecta, z: 1.6, x: 680, y: 1100 }, { t: ik.vacio, z: 1.0, y: 1000 }],
    sfx: [{ t: ik.elige, s: "roar", v: 0.7 }, { t: ik.salta, s: "whoosh", v: 0.6 }, { t: ik.conecta, s: "zap", v: 0.6 }, { t: ik.vacio, s: "whoosh", v: 0.8 }, { t: ik.vuela, s: "cheer", v: 0.4 }, { t: ik.clan, s: "fanfare", v: 0.4 }],
    shake: [[ik.matarlo, 0.5, 0.5]],
    overlay: ({ t }) => <Flash t={t} at={ik.vacio - 0.2} dur={0.3} />,
  },

  diario: {
    bg: ({ t }) => <LinkLab t={t} />,
    fx: ({ t }) =>
      S(
        <g>
          <rect x={620} y={1060} width={340} height={230} rx={14} fill="#0a1a2a" stroke="#6ae8ff" strokeWidth={5} />
          <circle cx={650} cy={1090} r={10} fill="#ff3a3a" opacity={Math.sin(t * 6) > 0 ? 1 : 0.2} />
          <text x={790} y={1180} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={34} fill="#6ae8ff">REC · Día {Math.min(90, 1 + Math.floor(t * 9))}</text>
          <rect x={760} y={1290} width={60} height={110} fill="#3a4a5a" />
        </g>,
      ),
    chars: [
      { who: "jake", x: 420, y: 1480, acts: [{ t: di.videos, pose: "talk", dur: 2 }, { t: di.real, expr: "sadness" }, { t: di.selva, expr: "focus" }] },
      { who: "jakenavi", x: 1250, y: 1480, facing: -1, show: false, opacity: 0.6, name: false, acts: [{ t: di.pandora - 0.2, show: true }, { t: di.pandora - 0.2, alpha: 0 }, { t: di.pandora, alpha: 0.6, dur: 0.6 }, { t: di.selva, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.3, x: 600, y: 1200 }, { t: di.real, z: 1.5, x: 420, y: 1200 }, { t: di.selva, z: 1.0, y: 1100 }],
    sfx: [{ t: di.videos, s: "pop", v: 0.4 }, { t: di.real, s: "chime", v: 0.3 }],
  },

  amor: {
    bg: ({ t }) => <TreeOfVoices t={t} />,
    fx: ({ t }) =>
      S(
        <>
          <QueueLink x0={430} y0={1070} x1={520} y1={850} t={t} k={kf(t, [am.ancestros, am.ancestros + 0.5], [0, 0.8])} />
          {t > am.aman ? <text x={540} y={kf(t, [am.aman, am.aman + 1.5], [1000, 820])} textAnchor="middle" fontSize={90} opacity={kf(t, [am.aman, am.aman + 0.4], [0, 1])}>💙</text> : null}
        </>,
      ),
    chars: [
      { who: "jakenavi", x: 420, y: 1480, acts: [{ t: am.ancestros, expr: "surprise" }, { t: am.aman, expr: "joy" }, { t: am.aman, walk: 470, dur: 0.6 }] },
      { who: "neytiri", x: 680, y: 1480, facing: -1, acts: [{ t: am.aman, expr: "joy" }, { t: am.aman, walk: 620, dur: 0.6 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: am.ancestros, z: 1.1, y: 950 }, { t: am.aman, z: 1.5, x: 540, y: 1050 }],
    sfx: [{ t: am.voces, s: "sparkle", v: 0.5 }, { t: am.aman, s: "chime", v: 0.6 }],
  },

  topadoras: {
    bg: DAY,
    under: ({ t }) => S(<Bulldozer x={kf(t, [0, to.destruyen + 1], [1700, 950])} y={1480} s={1.2} flip t={t} />),
    fx: ({ t }) =>
      S(
        <>
          {t > to.destruyen ? [0, 1, 2].map((i) => <Explosion key={i} x={900 + i * 120} y={1200 - i * 60} s={0.5} k={Math.max(0, 1 - (t - to.destruyen - i * 0.3) * 1.5)} />) : null}
          {t > to.video - 0.2 ? (
            <g opacity={kf(t, [to.video - 0.2, to.video + 0.2], [0, 1])}>
              <rect x={-60} y={620} width={460} height={300} rx={16} fill="#0a1a2a" stroke="#ff3a3a" strokeWidth={6} />
              <text x={170} y={700} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={40} fill="#ff3a3a">● VIDEO</text>
              <text x={170} y={800} textAnchor="middle" fontSize={80}>💥🦾</text>
            </g>
          ) : null}
        </>,
      ),
    chars: [
      { who: "jakenavi", x: 300, y: 1480, acts: [{ t: to.destruyen, expr: "anger" }, { t: to.rompe - 0.4, walk: 760, dur: 0.6, run: true }, { t: to.rompe, pose: "angry", dur: 1.2 }] },
      { who: "quaritch", x: 1500, y: 1480, facing: -1, show: false, acts: [{ t: to.video, show: true }, { t: to.video, move: { x: 1250 }, dur: 0.3 }, { t: to.bando, expr: "anger" }, { t: to.bando, pose: "point", dur: 1 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: to.destruyen, z: 1.2, x: 900, y: 1150 }, { t: to.rompe, z: 1.4, x: 780, y: 1150 }, { t: to.video, z: 1.1, x: 600, y: 1000 }, { t: to.bando, z: 1.5, x: 1250, y: 1050 }],
    sfx: [{ t: 0.2, s: "rumble", v: 0.7 }, { t: to.destruyen, s: "crash", v: 0.8 }, { t: to.rompe, s: "crash", v: 0.7 }, { t: to.bando, s: "boom", v: 0.5 }],
    shake: [[to.destruyen, 0.6, 0.8], [to.rompe, 0.5, 0.4]],
  },

  ataque: {
    bg: ({ t }) => <HomeTree t={t} burn={kf(t, [ak.misiles + 0.5, ak.fuego + 0.5], [0, 1])} fall={kf(t, [ak.derrumba - 0.2, ak.derrumba + 1.6], [0, 1])} />,
    fx: ({ t }) =>
      S(
        <>
          {[0, 1, 2].map((i) => (
            <Gunship key={i} x={kf(t, [ak.helicopteros - 0.5, ak.misiles + 1], [1700 + i * 150, 1150 + i * 120])} y={420 + i * 130} s={0.7} flip t={t} />
          ))}
          {t > ak.gas && t < ak.misiles + 1 ? [0, 1, 2, 3].map((i) => <circle key={i} cx={500 + i * 90} cy={kf(t, [ak.gas, ak.gas + 1], [600, 1150])} r={60 + (t - ak.gas) * 40} fill="#c8d8a0" opacity={0.35} filter="url(#soft)" />) : null}
          {[0, 1, 2, 3].map((i) => (
            <Missile key={`m${i}`} x0={1100 + i * 100} y0={460 + i * 80} x1={520 + i * 80} y1={800 + i * 120} t={t} t0={ak.misiles + i * 0.25} />
          ))}
        </>,
      ),
    chars: [
      { who: "neytiri", x: 200, y: 1480, holding: bow, acts: [{ t: ak.misiles, expr: "surprise" }, { t: ak.padre, expr: "sadness" }, { t: ak.padre, pose: "cower", dur: 2.5 }] },
      { who: "eytukan", x: 380, y: 1480, acts: [{ t: ak.misiles, expr: "anger" }, { t: ak.padre - 0.2, rot: -85, dur: 0.6 }, { t: ak.padre - 0.2, expr: "sleep" }] },
      { who: "jakenavi", x: 60, y: 1480, acts: [{ t: ak.fuego, expr: "sadness" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 900 }, { t: ak.misiles, z: 1.1, y: 900 }, { t: ak.derrumba, z: 0.95, y: 900 }, { t: ak.padre, z: 1.4, x: 300, y: 1200 }, { t: ak.hogar, z: 1.0, y: 1000 }],
    sfx: [{ t: ak.helicopteros, s: "rumble", v: 0.7 }, { t: ak.gas, s: "hiss", v: 0.6 }, { t: ak.misiles + 0.7, s: "boom", v: 0.9 }, { t: ak.misiles + 1.0, s: "boom", v: 0.8 }, { t: ak.fuego, s: "fire", v: 0.8 }, { t: ak.derrumba, s: "crash", v: 1 }, { t: ak.padre, s: "chime", v: 0.3 }],
    shake: [[ak.misiles + 0.7, 0.8, 0.8], [ak.derrumba + 0.6, 1, 1.4]],
  },

  traicion: {
    bg: switchAt(tr.desconectados - 0.2, ({ t }) => <HomeTree t={t} burn={0.6} fall={1} />, ({ t }) => <HumanBase t={t} alarm={1} />),
    chars: [
      { who: "neytiri", x: 700, y: 1480, facing: -1, acts: [{ t: tr.espia, expr: "anger" }, { t: tr.llora, expr: "sadness" }, { t: tr.vaya, pose: "point", dur: 1.4 }, { t: tr.vaya, expr: "anger" }, { t: tr.desconectados - 0.2, show: false }] },
      { who: "jakenavi", x: 420, y: 1480, acts: [{ t: tr.espia, expr: "sadness" }, { t: tr.desconectados - 0.4, alpha: 0, dur: 0.3 }] },
      { who: "jake", x: 400, y: 1480, show: false, acts: [{ t: tr.desconectados - 0.2, show: true }, { t: 0, expr: "sadness" }] },
      { who: "grace", x: 600, y: 1480, show: false, acts: [{ t: tr.desconectados - 0.2, show: true }, { t: 0, expr: "anger" }] },
      { who: "soldado", x: 860, y: 1480, facing: -1, name: false, show: false, acts: [{ t: tr.encerrados - 0.3, show: true }, { t: tr.encerrados, pose: "point", dur: 1.5 }] },
    ],
    cam: [{ t: 0, z: 1.3, x: 560, y: 1100 }, { t: tr.llora, z: 1.6, x: 700, y: 1000 }, { t: tr.vaya, z: 1.3, x: 600, y: 1100 }, { t: tr.desconectados, z: 1.1, x: 600, y: 1150 }],
    sfx: [{ t: tr.llora, s: "chime", v: 0.3 }, { t: tr.vaya, s: "boom", v: 0.4 }, { t: tr.desconectados - 0.2, s: "zap", v: 0.5 }, { t: tr.encerrados, s: "knock", v: 0.6 }],
    overlay: ({ t }) => <Flash t={t} at={tr.desconectados - 0.2} dur={0.3} />,
  },

  escape: {
    bg: ({ t }) => <HumanBase t={t} alarm={1} />,
    under: ({ t }) => S(<Samson x={kf(t, [ec.escapar, D("escape")], [700, 1300])} y={kf(t, [ec.escapar, D("escape")], [1300, 600])} s={1.0} t={t} r={kf(t, [ec.escapar, D("escape")], [0, -8])} />),
    fx: ({ t }) =>
      S(
        <>
          {t > ec.dispara ? [0, 1, 2, 3, 4].map((i) => {
            const k = (t - ec.dispara - i * 0.12) * 3;
            return k > 0 && k < 1 ? <line key={i} x1={kf(k, [0, 1], [200, 1100])} y1={kf(k, [0, 1], [1250, 800])} x2={kf(k, [0, 1], [240, 1140])} y2={kf(k, [0, 1], [1240, 790])} stroke="#ffd23a" strokeWidth={6} /> : null;
          }) : null}
        </>,
      ),
    chars: [
      { who: "trudy", mask: true, x: 900, y: 1480, facing: -1, acts: [{ t: ec.trudy, pose: "wave", dur: 1.2 }, { t: ec.escapar - 0.2, show: false }] },
      { who: "grace", mask: true, x: 520, y: 1480, acts: [{ t: ec.escapar - 0.2, show: false }] },
      { who: "jake", mask: true, x: 360, y: 1480, acts: [{ t: ec.escapar - 0.2, show: false }] },
      { who: "norm", mask: true, x: 680, y: 1480, acts: [{ t: ec.escapar - 0.2, show: false }] },
      { who: "quaritch", x: -250, y: 1480, show: false, acts: [{ t: ec.dispara - 0.6, show: true }, { t: ec.dispara - 0.6, walk: 150, dur: 0.6 }, { t: 0, expr: "anger" }, { t: ec.dispara, pose: "wandAim", dur: 2 }] },
    ],
    cam: [{ t: 0, z: 1.1, x: 640, y: 1150 }, { t: ec.escapar, z: 1.0, y: 1050 }, { t: ec.dispara, z: 1.3, x: 200, y: 1100 }, { t: ec.hiere, z: 1.2, x: 1000, y: 850 }],
    sfx: [{ t: ec.escapar, s: "rumble", v: 0.7 }, { t: ec.dispara, s: "zap", v: 0.6 }, { t: ec.dispara + 0.2, s: "zap", v: 0.6 }, { t: ec.hiere, s: "crash", v: 0.5 }],
  },

  toruk: {
    bg: ({ t }) => <SkyFlight t={t} speed={1.2} />,
    under: ({ t }) =>
      S(
        <>
          <Toruk x={kf(t, [0, tk.doma, D("toruk")], [1500, 700, 300])} y={kf(t, [0, tk.doma, D("toruk")], [900, 1150, 900])} s={0.9} flip={t < tk.doma} t={t} />
          {t < tk.tira + 0.4 ? <Ikran x={kf(t, [0, tk.tira], [-200, 600])} y={600} s={0.8} t={t} /> : null}
        </>,
      ),
    chars: [
      { who: "jakenavi", x: -200, y: 650, acts: [{ t: 0, pose: "ride" }, { t: 0, move: { x: 600 }, dur: tk.tira }, { t: tk.tira, move: { x: 760, y: 1080 }, dur: tk.doma - tk.tira }, { t: tk.tira, pose: "armsUp", dur: tk.doma - tk.tira }, { t: tk.tira, expr: "anger" }, { t: tk.doma, pose: "ride" }, { t: tk.doma, move: { x: 360, y: 830 }, dur: D("toruk") - tk.doma }, { t: tk.rey, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: tk.cinco, z: 1.1, x: 900, y: 1000 }, { t: tk.tira, z: 1.0, y: 1000 }, { t: tk.doma, z: 1.3, x: 700, y: 1000 }, { t: tk.rey, z: 1.0, y: 950 }],
    sfx: [{ t: tk.cinco, s: "rumble", v: 0.5 }, { t: tk.tira, s: "whoosh", v: 0.9 }, { t: tk.doma, s: "roar", v: 1 }, { t: tk.doma + 0.4, s: "zap", v: 0.5 }, { t: tk.rey, s: "fanfare", v: 0.6 }],
    shake: [[tk.doma, 0.8, 0.8]],
  },

  toruk_makto: {
    bg: ({ t }) => <TreeOfSouls t={t} k={0.6} />,
    under: ({ t }) => S(<Toruk x={kf(t, [0, tk.doma * 0 + 1.2], [1500, 760])} y={kf(t, [0, 1.2], [600, 1250])} s={0.75} flip t={t} flap={t < 1.2 ? 1 : 0.15} />),
    chars: [
      { who: "jakenavi", x: 1500, y: 980, acts: [{ t: 0, pose: "ride" }, { t: 0, move: { x: 800, y: 1080 }, dur: 1.2 }, { t: tm.leyenda, move: { x: 560, y: 1480 }, dur: 0.6 }, { t: tm.leyenda, pose: "stand" }, { t: tm.perdona, expr: "joy" }] },
      { who: "neytiri", x: 220, y: 1480, acts: [{ t: tm.arrodillan, pose: "cower", dur: 1.6 }, { t: tm.perdona, expr: "joy" }, { t: tm.perdona, walk: 400, dur: 0.6 }] },
      { who: "tsutey", x: 60, y: 1480, acts: [{ t: tm.arrodillan, pose: "cower", dur: 2.5 }, { t: tm.lider, expr: "joy" }, { t: tm.lider, pose: "armsUp", dur: 1 }] },
      { who: "moat", x: -120, y: 1480, acts: [{ t: tm.arrodillan, pose: "cower", dur: 2.5 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: tm.arrodillan, z: 1.0, y: 1100 }, { t: tm.leyenda, z: 1.4, x: 560, y: 1100 }, { t: tm.perdona, z: 1.3, x: 450, y: 1100 }, { t: tm.lider, z: 1.1, x: 300, y: 1100 }],
    sfx: [{ t: 0.2, s: "roar", v: 0.8 }, { t: tm.arrodillan, s: "rumble", v: 0.5 }, { t: tm.leyenda, s: "fanfare", v: 0.7 }, { t: tm.perdona, s: "chime", v: 0.5 }, { t: tm.lider, s: "cheer", v: 0.5 }],
    shake: [[1.2, 0.6, 0.5]],
    overlay: ({ t }) => <Banner t={t} text="TORUK MAKTO" t0={tm.leyenda - 0.2} t1={tm.leyenda + 2} color="#ff6b4a" />,
  },

  grace: {
    bg: ({ t }) => <TreeOfSouls t={t} k={kf(t, [gr.conecta - 0.3, gr.conecta + 0.6, gr.muere, gr.eywa + 1], [0.5, 1, 1, 0.6])} />,
    fx: ({ t }) =>
      S(
        <>
          {t > gr.eywa - 0.3 ? <circle cx={480} cy={kf(t, [gr.eywa - 0.3, gr.eywa + 2], [1320, 600])} r={22} fill="#ffffff" opacity={kf(t, [gr.eywa - 0.3, gr.eywa + 2], [1, 0])} filter="url(#glow)" /> : null}
        </>,
      ),
    chars: [
      { who: "grace", x: 480, y: 1460, acts: [{ t: 0, rot: -86 }, { t: 0, expr: "sadness" }, { t: gr.muere, expr: "sleep" }] },
      { who: "gracenavi", x: 700, y: 1460, name: false, acts: [{ t: 0, rot: 86 }, { t: 0, expr: "sleep" }] },
      { who: "jakenavi", x: 280, y: 1480, acts: [{ t: gr.conecta, pose: "cower", dur: 3 }, { t: gr.muere, expr: "sadness" }] },
      { who: "moat", x: 900, y: 1480, facing: -1, acts: [{ t: gr.conecta, pose: "armsUp", dur: 2.5 }] },
      { who: "neytiri", x: 1100, y: 1480, facing: -1, acts: [{ t: gr.conecta, pose: "armsUp", dur: 2.5 }, { t: gr.muere, expr: "sadness" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: gr.conecta, z: 1.05, y: 1000 }, { t: gr.debil, z: 1.5, x: 480, y: 1250 }, { t: gr.eywa, z: 1.0, y: 950 }],
    sfx: [{ t: gr.almas, s: "sparkle", v: 0.5 }, { t: gr.conecta, s: "chime", v: 0.5 }, { t: gr.muere, s: "chime", v: 0.3 }, { t: gr.eywa, s: "sparkle", v: 0.5 }],
  },

  clanes: {
    bg: switchAt(cl.ayuda - 0.2, ({ t }) => <FloatingMountains t={t} />, ({ t }) => <TreeOfSouls t={t} />),
    under: ({ t }) =>
      S(
        t < cl.ayuda - 0.2 ? (
          <>
            <Toruk x={kf(t, [0, cl.ayuda], [-300, 1400])} y={650} s={0.7} t={t} />
            {Array.from({ length: 8 }).map((_, i) => (
              <Ikran key={i} x={kf(t, [0, cl.ayuda], [-500 - i * 140, 1200 - i * 140])} y={780 + (i % 3) * 90} s={0.45} t={t + i} col={i % 2 ? "#3a6ad8" : "#d84a6a"} />
            ))}
          </>
        ) : null,
      ),
    chars: [
      ...[0, 1, 2, 3, 4, 5].map((i) => ({ who: (["tsutey", "neytiri", "moat", "eytukan", "tsutey", "neytiri"] as const)[i], x: -300 + i * 340, y: 1480, name: false, show: false, s: 1.5, acts: [{ t: cl.miles - 0.2, show: true }, { t: cl.miles, pose: "cheer" as const, dur: 1.5 }, { t: cl.ayuda - 0.2, show: false }] })),
      { who: "jakenavi", x: 400, y: 1480, show: false, acts: [{ t: cl.ayuda - 0.2, show: true }, { t: cl.ayuda, pose: "armsUp", dur: 2 }, { t: cl.bandos, expr: "surprise" }] },
      { who: "neytiri", x: 700, y: 1480, facing: -1, show: false, acts: [{ t: cl.ayuda - 0.2, show: true }, { t: cl.bandos, pose: "talk", dur: 2 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 850 }, { t: cl.miles, z: 1.0, y: 1150 }, { t: cl.ayuda, z: 1.2, x: 500, y: 1100 }, { t: cl.bandos, z: 1.4, x: 700, y: 1050 }],
    sfx: [{ t: 0.3, s: "roar", v: 0.6 }, { t: cl.miles, s: "cheer", v: 0.6 }, { t: cl.ayuda, s: "sparkle", v: 0.5 }],
    overlay: ({ t }) => <Flash t={t} at={cl.ayuda - 0.2} dur={0.3} />,
  },

  batalla: {
    bg: ({ t }) => <BattleSky t={t} />,
    under: ({ t }) =>
      S(
        <>
          <DragonShip x={kf(t, [0, D("batalla")], [1500, 1000])} y={600} s={0.9} flip t={t} />
          {[0, 1, 2].map((i) => (
            <Gunship key={i} x={kf(t, [ba.batalla - 0.5, D("batalla")], [1700 + i * 160, 500 + i * 220])} y={900 + i * 120} s={0.6} flip t={t} fire={t > ba.flechas} />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <Ikran key={`i${i}`} x={kf(t, [ba.batalla - 0.5, D("batalla")], [-400 - i * 120, 900 - i * 120])} y={900 + (i % 3) * 140} s={0.55} t={t + i} col={i % 2 ? "#3a6ad8" : "#d84a6a"} r={t > ba.caen + i * 0.3 && i % 2 ? 60 : 0} />
          ))}
          {t > ba.caen ? [0, 1, 2].map((i) => <Explosion key={`e${i}`} x={300 + i * 300} y={1000 + (i % 2) * 150} s={0.6} k={Math.max(0, 1 - (t - ba.caen - i * 0.4) * 1.2)} />) : null}
        </>,
      ),
    fx: ({ t }) => S([0, 1, 2, 3].map((i) => <Arrow key={i} x0={-200} y0={1200 - i * 60} x1={900 + i * 120} y1={900 + i * 60} t={t} t0={ba.flechas + i * 0.2} />)),
    chars: [
      { who: "tsutey", x: 300, y: 1480, holding: bow, show: false, acts: [{ t: ba.tsutey - 0.6, show: true }, { t: 0, expr: "anger" }, { t: ba.tsutey, rot: -85, dur: 0.5 }, { t: ba.tsutey, expr: "sleep" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 900 }, { t: ba.bombas, z: 1.2, x: 1000, y: 750 }, { t: ba.batalla, z: 1.0, y: 1000 }, { t: ba.caen, z: 1.1, y: 1050 }, { t: ba.tsutey, z: 1.4, x: 300, y: 1250 }],
    sfx: [{ t: 0.2, s: "rumble", v: 0.8 }, { t: ba.batalla, s: "roar", v: 0.7 }, { t: ba.flechas, s: "whoosh", v: 0.6 }, { t: ba.flechas + 0.3, s: "zap", v: 0.6 }, { t: ba.caen + 0.1, s: "boom", v: 0.8 }, { t: ba.caen + 0.6, s: "boom", v: 0.7 }, { t: ba.tsutey, s: "chime", v: 0.3 }],
    shake: [[ba.caen, 0.7, 1]],
  },

  eywa: {
    bg: switchAt(ey.responde - 0.2, ({ t }) => <BattleSky t={t} />, DAY),
    under: ({ t }) =>
      S(
        <>
          {t > ey.martillo - 0.4 && t < ey.salta - 0.2 ? <Hammerhead x={kf(t, [ey.martillo - 0.4, ey.salta], [-500, 900])} y={1480} s={1.0} t={t} charge={1} /> : null}
          {t > ey.thanators - 0.3 && t < ey.salta - 0.2 ? <Thanator x={kf(t, [ey.thanators - 0.3, ey.salta], [1600, 400])} y={1490} s={0.9} flip t={t} run={1} roar={0.8} /> : null}
          {t > ey.martillo - 0.4 && t < ey.salta - 0.2 ? <AmpSuit x={kf(t, [ey.martillo, ey.salta], [800, 1350])} y={1470} s={1.25} t={t} broken={1} /> : null}
          {t > ey.salta - 0.2 ? <DragonShip x={kf(t, [ey.salta - 0.2, ey.explotar], [1100, 800])} y={700} s={1.0} flip t={t} /> : null}
          {t > ey.salta - 0.2 ? <Toruk x={kf(t, [ey.salta - 0.2, ey.explotar], [-200, 500])} y={kf(t, [ey.salta - 0.2, ey.explotar], [900, 450])} s={0.6} t={t} /> : null}
          {t > ey.explotar - 0.1 ? <Explosion x={800} y={700} s={2.2} k={Math.max(0, 1 - (t - ey.explotar) * 0.7)} /> : null}
        </>,
      ),
    chars: [
      { who: "jakenavi", x: 400, y: 1480, show: false, acts: [{ t: ey.perdido - 0.3, show: true }, { t: 0, expr: "sadness" }, { t: ey.responde, expr: "surprise" }, { t: ey.responde - 0.2, show: false }] },
      { who: "neytiri", x: 600, y: 1480, holding: bow, show: false, acts: [{ t: ey.animales - 0.2, show: true }, { t: ey.animales, expr: "joy" }, { t: ey.animales, pose: "cheer", dur: 1.5 }, { t: ey.salta - 0.2, show: false }] },
    ],
    cam: [{ t: 0, z: 1.2, x: 400, y: 1200 }, { t: ey.responde, z: 1.0, y: 1100 }, { t: ey.thanators, z: 1.1, y: 1150 }, { t: ey.salta, z: 1.0, y: 850 }, { t: ey.explotar, z: 1.2, x: 800, y: 800 }],
    sfx: [{ t: ey.responde, s: "chime", v: 0.7 }, { t: ey.martillo, s: "roar", v: 0.8 }, { t: ey.martillo + 0.4, s: "rumble", v: 0.7 }, { t: ey.thanators, s: "roar", v: 0.9 }, { t: ey.salta, s: "whoosh", v: 0.7 }, { t: ey.explotar, s: "boom", v: 1 }],
    shake: [[ey.martillo + 0.3, 0.7, 1], [ey.explotar, 1, 1.2]],
    overlay: ({ t }) => (
      <>
        <Flash t={t} at={ey.responde - 0.2} dur={0.4} color="#e8fbff" />
        <Flash t={t} at={ey.explotar} dur={0.5} color="#fff4c2" />
      </>
    ),
  },

  duelo: {
    bg: DAY,
    under: ({ t }) =>
      S(
        <>
          <g transform="translate(1180 1430)">
            <rect x={-200} y={-200} width={400} height={220} rx={20} fill="#c8ced6" stroke="#1b1b2f" strokeWidth={7} />
            <rect x={-150} y={-160} width={300} height={110} rx={10} fill={t > du.ventana ? "rgba(255,255,255,0.1)" : "rgba(160,220,255,0.6)"} stroke="#1b1b2f" strokeWidth={5} />
            {t > du.ventana ? <path d="M -100 -150 L -60 -100 L -110 -70 M 40 -155 L 10 -110 L 70 -70" stroke="#fff" strokeWidth={4} fill="none" /> : null}
          </g>
          <AmpSuit x={kf(t, [0, du.capsula, du.pelea, du.flechas], [300, 900, 820, 820])} y={1470} s={1.6} t={t} walk={t < du.capsula ? 1 : 0} knife pilotSkin="#e3ad88" />
          {t > du.ventana && t < du.flechas + 0.5 ? [0, 1, 2].map((i) => <circle key={i} cx={1180 + i * 40} cy={1300 - ((t * 80 + i * 40) % 160)} r={30} fill="#b8c8a0" opacity={0.4} filter="url(#soft)" />) : null}
        </>,
      ),
    fx: ({ t }) =>
      S(
        <>
          <Arrow x0={200} y0={950} x1={820} y1={820} t={t} t0={du.flechas} dur={0.25} />
          <Arrow x0={200} y0={900} x1={830} y1={810} t={t} t0={du.flechas + 0.35} dur={0.25} />
        </>,
      ),
    chars: [
      { who: "neytiri", x: -200, y: 1480, holding: bow, show: false, acts: [{ t: du.pelea - 0.6, show: true }, { t: du.pelea - 0.6, walk: 200, dur: 0.6, run: true }, { t: 0, expr: "anger" }, { t: du.flechas - 0.3, pose: "wandAim", dur: 1.5 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: du.capsula, z: 1.2, x: 1100, y: 1100 }, { t: du.ventana, z: 1.6, x: 1180, y: 1300 }, { t: du.pelea, z: 1.0, y: 1050 }, { t: du.flechas, z: 1.4, x: 820, y: 900 }],
    sfx: [{ t: du.robot, s: "step", v: 0.8 }, { t: du.robot + 0.5, s: "step", v: 0.8 }, { t: du.ventana, s: "crash", v: 0.9 }, { t: du.ahogar, s: "hiss", v: 0.6 }, { t: du.pelea, s: "zap", v: 0.6 }, { t: du.flechas, s: "whoosh", v: 0.7 }, { t: du.flechas + 0.35, s: "whoosh", v: 0.7 }],
    shake: [[du.ventana, 0.6, 0.5]],
  },

  mascara: {
    bg: ({ t }) => (
      <>
        <PandoraDay t={t} />
      </>
    ),
    under: ({ t }) =>
      S(
        <g transform="translate(860 1430)">
          <rect x={-200} y={-200} width={400} height={220} rx={20} fill="#c8ced6" stroke="#1b1b2f" strokeWidth={7} />
          <rect x={-150} y={-160} width={300} height={110} rx={10} fill="rgba(255,255,255,0.1)" stroke="#1b1b2f" strokeWidth={5} />
          {t < 0 ? null : null}
        </g>,
      ),
    fx: ({ t }) => S(t > ma.mascara - 0.2 && t < ma.mascara + 0.5 ? <circle cx={470} cy={1080} r={40} fill="#bff4ff" opacity={kf(t, [ma.mascara - 0.2, ma.mascara + 0.5], [0.8, 0])} filter="url(#glow)" /> : null),
    chars: [
      { who: "jake", x: 470, y: 1480, acts: [{ t: 0, expr: "sleep" }, { t: ma.despierta, expr: "surprise" }, { t: ma.veo, expr: "joy" }] },
      { who: "neytiri", x: 1400, y: 1480, facing: -1, acts: [{ t: 0, walk: 700, dur: 1.2, run: true }, { t: ma.desmayado, expr: "sadness" }, { t: ma.mascara, pose: "hold", dur: 1.5 }, { t: ma.ojos, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: ma.desmayado, z: 1.4, x: 520, y: 1200 }, { t: ma.ojos, z: 1.7, x: 580, y: 1050 }, { t: ma.veo, z: 1.8, x: 560, y: 1000 }],
    sfx: [{ t: ma.mascara, s: "hiss", v: 0.5 }, { t: ma.despierta, s: "sparkle", v: 0.4 }, { t: ma.veo, s: "chime", v: 0.7 }],
    overlay: ({ t }) => <Banner t={t} text="«Te veo»" t0={ma.veo} t1={ma.veo + 2.2} color="#bff4ff" />,
  },

  final: {
    bg: switchAt(fi.almas - 0.2, ({ t }) => <HumanBase t={t} />, ({ t }) => <TreeOfSouls t={t} k={kf(t, [fi.espiritu, fi.abre], [0.6, 1])} />),
    under: ({ t }) => S(t < fi.almas - 0.2 ? <Shuttle x={kf(t, [0, fi.almas], [400, 600])} y={kf(t, [0, fi.almas], [1180, 600])} s={1} t={t} /> : null),
    fx: ({ t }) => S(t > fi.espiritu ? <QueueLink x0={450} y0={1380} x1={680} y1={1380} t={t} k={kf(t, [fi.espiritu, fi.espiritu + 0.5, fi.abre, fi.abre + 0.5], [0, 1, 1, 0])} /> : null),
    chars: [
      { who: "soldado", x: 700, y: 1480, name: false, acts: [{ t: 0, expr: "sadness" }, { t: 0.3, walk: 300, dur: 1.5 }, { t: fi.almas - 0.2, show: false }] },
      { who: "selfridge", x: 900, y: 1480, acts: [{ t: 0, expr: "sadness" }, { t: 0.3, walk: 450, dur: 1.5 }, { t: fi.almas - 0.2, show: false }] },
      { who: "jake", x: 450, y: 1460, show: false, acts: [{ t: fi.almas - 0.2, show: true }, { t: 0, rot: -86 }, { t: 0, expr: "sleep" }, { t: fi.abre, alpha: 0, dur: 0.6 }] },
      { who: "jakenavi", x: 700, y: 1460, show: false, acts: [{ t: fi.almas - 0.2, show: true }, { t: 0, rot: 86 }, { t: 0, expr: "sleep" }, { t: fi.abre, expr: "surprise" }, { t: fi.abre + 0.4, rot: 0, dur: 0.6 }, { t: fi.nueva, expr: "joy" }] },
      { who: "neytiri", x: 1000, y: 1480, facing: -1, show: false, acts: [{ t: fi.almas - 0.2, show: true }, { t: fi.abre, expr: "joy" }] },
      { who: "moat", x: 1200, y: 1480, facing: -1, show: false, acts: [{ t: fi.almas - 0.2, show: true }, { t: fi.espiritu, pose: "armsUp", dur: 2 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: fi.almas, z: 1.0, y: 1000 }, { t: fi.espiritu, z: 1.3, x: 580, y: 1250 }, { t: fi.abre, z: 1.7, x: 700, y: 1100 }, { t: fi.nueva, z: 1.2, x: 700, y: 1050 }],
    sfx: [{ t: 0.2, s: "rumble", v: 0.6 }, { t: fi.almas, s: "sparkle", v: 0.5 }, { t: fi.espiritu, s: "chime", v: 0.5 }, { t: fi.abre, s: "fanfare", v: 0.7 }],
    overlay: ({ t }) => <Flash t={t} at={fi.almas - 0.2} dur={0.3} />,
  },
};

// quién habla y cuándo (boca y gestos)
const TALK: [string, string, string, number, number?][] = [
  ["tierra", "soldado", "oferta", 2.5],
  ["quaritch", "quaritch", "advierte", 3.5],
  ["quaritch", "jake", "marine", 1.2],
  ["mineral", "selfridge", "plata", 2.2],
  ["avatares", "grace", "grace", 2.5],
  ["arbol", "tsutey", "matarlo", 1.6],
  ["arbol", "moat", "ensenar", 2.5],
  ["espia", "quaritch", "trato", 4],
  ["espia", "jake", "acepta", 1.2],
  ["aprende", "neytiri", "idioma", 2.2],
  ["aprende", "jakenavi", "silencio", 1.2],
  ["caballo", "neytiri", "rie", 1.6],
  ["diario", "jake", "videos", 6],
  ["amor", "neytiri", "aman", 1.4],
  ["amor", "jakenavi", "eligen", 1.4],
  ["semillas", "neytiri", "bebe", 2.6],
  ["topadoras", "quaritch", "bando", 1.5],
  ["traicion", "neytiri", "vaya", 2.4],
  ["escape", "trudy", "trudy", 2],
  ["toruk_makto", "tsutey", "lider", 1.5],
  ["clanes", "jakenavi", "ayuda", 2],
  ["clanes", "neytiri", "bandos", 3],
  ["mascara", "neytiri", "veo", 1.6],
  ["mascara", "jake", "ojos", 1],
  ["selva", "jakenavi", "planta", 1],
];
for (const [sid, who, word, dur] of TALK) {
  const tr = scenes[sid]?.chars.find((c) => c.who === who);
  if (tr) tr.acts = [...(tr.acts ?? []), { t: w(sid, word), talk: dur }];
}

// hojas de primer plano en las escenas de selva
for (const sc of Object.values(scenes)) {
  if (sc.bg === DAY || sc.bg === NIGHT) {
    const night = sc.bg === NIGHT;
    const Fx = sc.fx;
    sc.fx = ({ t }) => (
      <>
        {Fx ? <Fx t={t} /> : null}
        <JungleFront t={t} night={night} />
      </>
    );
  }
}

export const av1full: PartSpec = { part: 0, title: "Avatar", dyn: true, scenes };
export const av1fullAudio = audio;
