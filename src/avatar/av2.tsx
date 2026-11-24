import React from "react";
import { PartSpec, SceneSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Svg } from "../scenes/bg1";
import { Banner, Flash, switchAt, wordClock } from "../scenes/util";
import { Bow, Woodsprites } from "./assets";
import { JungleDay, JungleFront, JungleNight } from "./jungle";
import { HumanBase, LabRich, SkyFlight } from "./world";
import { Arrow, Explosion, Gunship, Ikran, QueueLink, Samson } from "./things";
import { BurningForest, Harpoon, HunterBoat, Ilu, OpenSea, ReefVillage, Rocket, SeaPredator, Skimwing, SpiritTreeSea, Tulkun, Underwater, WhalerShip } from "./ocean";
import audioData from "../data/av2full.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);
const D = (id: string) => (audio.scenes.find((s) => s.id === id)?.dur ?? 300) / 30;
const S = (children: React.ReactNode) => <Svg>{children}</Svg>;
const bow = () => <Bow r={10} s={0.85} />;
const DAY = ({ t }: { t: number }) => <JungleDay t={t} />;
const NIGHT = ({ t }: { t: number }) => <JungleNight t={t} />;
const REEF = ({ t }: { t: number }) => <ReefVillage t={t} />;
const UNDER = ({ t }: { t: number }) => <Underwater t={t} />;
const SEA = ({ t }: { t: number }) => <OpenSea t={t} />;
/** Burbujas que salen de la boca de alguien bajo el agua. */
const Bubbles: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => (
  <g>
    {[0, 1, 2, 3].map((i) => (
      <circle key={i} cx={x + Math.sin(t * 4 + i) * 8} cy={y - ((t * 120 + i * 40) % 200)} r={5 + i * 2} fill="none" stroke="#e8ffff" strokeWidth={2.5} />
    ))}
  </g>
);

const hk = { enemigo: w("hook", "enemigo"), muerte: w("hook", "muerte"), familia: w("hook", "familia"), hijos: w("hook", "hijos") };
const fa = { neteyam: w("familia", "neteyam"), loak: w("familia", "loak"), tuk: w("familia", "tuk"), kiri: w("familia", "kiri"), grace: w("familia", "grace"), spider: w("familia", "spider") };
const re = { luces: w("regreso", "luces"), vuelven: w("regreso", "vuelven"), naves: w("regreso", "naves"), ciudad: w("regreso", "ciudad"), quedarse: w("regreso", "quedarse"), muriendo: w("regreso", "muriendo") };
const rc = { sorpresa: w("recom", "sorpresa"), recuerdos: w("recom", "recuerdos"), cuerpo: w("recom", "cuerpo"), despierta: w("recom", "despierta"), manos: w("recom", "manos"), mision: w("recom", "mision") };
const ca = { soldados: w("captura", "soldados"), jugando: w("captura", "jugando"), atrapan: w("captura", "atrapan"), rescatarlos: w("captura", "rescatarlos"), flechas: w("captura", "flechas"), salvar: w("captura", "salvar"), spider: w("captura", "spider") };
const hu = { peligro: w("huida", "peligro"), decision: w("huida", "decision"), vuela: w("huida", "vuela"), mar: w("huida", "mar"), agua: w("huida", "agua") };
const ar = { arrecife: w("arrecife", "arrecife"), casas: w("arrecife", "casas"), distintos: w("arrecife", "distintos"), tonowari: w("arrecife", "tonowari"), ronal: w("arrecife", "ronal"), desconfia: w("arrecife", "desconfia") };
const ap = { respiracion: w("aprenden", "respiracion"), olas: w("aprenden", "olas"), nadar: w("aprenden", "nadar"), ilu: w("aprenden", "ilu"), skimwings: w("aprenden", "skimwings"), saltan: w("aprenden", "saltan") };
const bu = { aonung: w("bullying", "aonung"), burla: w("bullying", "burla"), pelea: w("bullying", "pelea"), reta: w("bullying", "reta"), altura: w("bullying", "altura") };
const ki = { conectada: w("kiri", "conectada"), respirar: w("kiri", "respirar"), arbol: w("kiri", "arbol"), grace: w("kiri", "grace"), ataque: w("kiri", "ataque"), padre: w("kiri", "padre") };
const pa = { abandona: w("payakan", "abandona"), tiburon: w("payakan", "tiburon"), salva: w("payakan", "salva"), tulkun: w("payakan", "tulkun"), aleta: w("payakan", "aleta"), payakan: w("payakan", "payakan"), inseparables: w("payakan", "inseparables") };
const tu = { hermanos: w("tulkun", "hermanos"), cantan: w("tulkun", "cantan"), matar: w("tulkun", "matar"), expulsado: w("tulkun", "expulsado"), nadie: w("tulkun", "nadie") };
const sp = { quaritch: w("spider", "quaritch"), odia: w("spider", "odia"), ensena: w("spider", "ensena"), idioma: w("spider", "idioma"), quererlo: w("spider", "quererlo") };
const cz = { quema: w("cazadores", "quema"), cazadores: w("cazadores", "cazadores"), cerebro: w("cazadores", "cerebro"), millones: w("cazadores", "millones"), arpones: w("cazadores", "arpones"), madre: w("cazadores", "madre") };
const se = { secreto: w("secreto", "secreto"), mataron: w("secreto", "mataron"), ataco: w("secreto", "ataco"), echaron: w("secreto", "echaron"), marginado: w("secreto", "marginado") };
const tr = { secuestra: w("trampa", "secuestra"), ata: w("trampa", "ata"), barco: w("trampa", "barco"), clan: w("trampa", "clan"), montados: w("trampa", "montados") };
const pk = { llega: w("payakan_ataca", "llega"), destroza: w("payakan_ataca", "destroza"), aplasta: w("payakan_ataca", "aplasta"), embiste: w("payakan_ataca", "embiste"), amigo: w("payakan_ataca", "amigo") };
const rs = { rescatan: w("rescate", "rescatan"), escapar: w("rescate", "escapar"), disparo: w("rescate", "disparo"), cae: w("rescate", "cae"), roca: w("rescate", "roca"), muere: w("rescate", "muere") };
const fu = { explota: w("furia", "explota"), spider: w("furia", "spider"), cuchillo: w("furia", "cuchillo"), kiri: w("furia", "kiri"), grita: w("furia", "grita"), suelta: w("furia", "suelta") };
const hn = { parte: w("hundimiento", "parte"), pelea: w("hundimiento", "pelea"), kiri: w("hundimiento", "kiri"), peces: w("hundimiento", "peces"), aire: w("hundimiento", "aire"), salva: w("hundimiento", "salva") };
const sl = { atrapado: w("spider_elige", "atrapado"), salva: w("spider_elige", "salva"), espalda: w("spider_elige", "espalda"), roca: w("spider_elige", "roca"), irse: w("spider_elige", "irse") };
const fn = { entregan: w("funeral", "entregan"), bahia: w("funeral", "bahia"), espiritu: w("funeral", "espiritu"), escucha: w("funeral", "escucha") };
const fi = { quedarse: w("final", "quedarse"), acepta: w("final", "acepta"), leccion: w("final", "leccion"), principio: w("final", "principio") };

const FAMILY = (x0: number, show = true, gap = 150) =>
  (["neteyam", "loak", "kiri", "tuk"] as const).map((who, i) => ({ who, x: x0 + i * gap, y: 1480, show, acts: [] as SceneSpec["chars"][number]["acts"] }));

const scenes: Record<string, SceneSpec> = {
  hook: {
    bg: switchAt(hk.familia - 0.2, ({ t }) => <BurningForest t={t} />, DAY),
    chars: [
      { who: "quaritchnavi", x: 760, y: 1480, facing: -1, acts: [{ t: 0, expr: "anger" }, { t: hk.muerte, pose: "point", dur: 1.5 }, { t: hk.familia - 0.2, show: false }] },
      { who: "jakenavi", x: 360, y: 1480, show: false, acts: [{ t: hk.familia - 0.2, show: true }, { t: hk.hijos, pose: "armsUp", dur: 1.2 }, { t: hk.hijos, expr: "joy" }] },
      { who: "neytiri", x: 560, y: 1480, show: false, holding: bow, acts: [{ t: hk.familia - 0.2, show: true }, { t: hk.hijos, expr: "joy" }] },
      { who: "tuk", x: 720, y: 1480, show: false, name: false, acts: [{ t: hk.familia - 0.2, show: true }, { t: hk.hijos, pose: "cheer", dur: 1.5 }] },
      { who: "loak", x: 860, y: 1480, show: false, name: false, acts: [{ t: hk.familia - 0.2, show: true }] },
    ],
    cam: [{ t: 0, z: 1.3, x: 760, y: 1050 }, { t: hk.muerte, z: 1.6, x: 760, y: 950 }, { t: hk.familia, z: 1.0, y: 1100 }, { t: hk.hijos, z: 1.2, x: 600, y: 1100 }],
    sfx: [{ t: 0.2, s: "fire", v: 0.6 }, { t: hk.muerte, s: "boom", v: 0.6 }, { t: hk.familia - 0.2, s: "whoosh", v: 0.5 }, { t: hk.hijos, s: "chime", v: 0.5 }],
    overlay: ({ t }) => <Flash t={t} at={hk.familia - 0.2} dur={0.3} />,
  },

  familia: {
    bg: DAY,
    overlay: ({ t }) => <Banner t={t} text="Más de 10 años después" t0={0.2} t1={fa.neteyam - 0.3} color="#bff4ff" />,
    chars: [
      { who: "jakenavi", x: 180, y: 1480, acts: [{ t: 0, expr: "joy" }] },
      { who: "neytiri", x: 340, y: 1480, holding: bow, acts: [{ t: 0, expr: "joy" }] },
      { who: "neteyam", x: 1600, y: 1480, facing: -1, acts: [{ t: fa.neteyam - 0.8, walk: 520, dur: 0.8, run: true }, { t: fa.neteyam, pose: "wave", dur: 1 }] },
      { who: "loak", x: 1600, y: 1480, facing: -1, acts: [{ t: fa.loak - 0.8, walk: 680, dur: 0.8, run: true }, { t: fa.loak, pose: "cheer", dur: 1.2 }, { t: fa.loak, expr: "joy" }] },
      { who: "tuk", x: 1600, y: 1480, facing: -1, acts: [{ t: fa.tuk - 0.6, walk: 820, dur: 0.6, run: true }, { t: fa.tuk, pose: "armsUp", dur: 1 }] },
      { who: "kiri", x: 1600, y: 1480, facing: -1, acts: [{ t: fa.kiri - 0.8, walk: 960, dur: 0.8 }, { t: fa.kiri, expr: "focus" }, { t: fa.grace, pose: "think", dur: 1.5 }] },
      { who: "spider", x: 1700, y: 1480, facing: -1, acts: [{ t: fa.spider - 0.8, walk: 1110, dur: 0.8, run: true }, { t: fa.spider, pose: "wave", dur: 1 }, { t: fa.spider, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.2, x: 260, y: 1100 }, { t: fa.neteyam, z: 1.3, x: 520, y: 1100 }, { t: fa.loak, z: 1.3, x: 680, y: 1100 }, { t: fa.tuk, z: 1.4, x: 820, y: 1200 }, { t: fa.kiri, z: 1.3, x: 960, y: 1100 }, { t: fa.spider, z: 1.3, x: 1100, y: 1150 }],
    sfx: [{ t: fa.neteyam, s: "pop", v: 0.4 }, { t: fa.loak, s: "pop", v: 0.4 }, { t: fa.tuk, s: "pop", v: 0.4 }, { t: fa.kiri, s: "sparkle", v: 0.4 }, { t: fa.spider, s: "pop", v: 0.4 }],
  },

  regreso: {
    bg: switchAt(re.ciudad - 0.2, ({ t }) => <BurningForest t={t} k={kf(t, [re.naves, re.naves + 1], [0, 1])} />, ({ t }) => <HumanBase t={t} />),
    under: ({ t }) =>
      S(
        t < re.ciudad - 0.2 ? (
          <>
            {[0, 1, 2].map((i) => (
              <Rocket key={i} x={-100 + i * 600} y={kf(t, [re.luces + i * 0.4, re.naves + 1 + i * 0.3], [-400, 900])} s={0.9} t={t} />
            ))}
          </>
        ) : null,
      ),
    chars: [
      { who: "jakenavi", x: 300, y: 1480, acts: [{ t: re.luces, expr: "surprise" }, { t: re.naves, pose: "cower", dur: 1.2 }, { t: re.ciudad - 0.2, show: false }] },
      { who: "neytiri", x: 480, y: 1480, holding: bow, acts: [{ t: re.luces, expr: "surprise" }, { t: re.ciudad - 0.2, show: false }] },
      { who: "soldado", x: 700, y: 1480, name: false, mask: true, show: false, acts: [{ t: re.ciudad - 0.2, show: true }, { t: re.ciudad, walk: 900, dur: 2 }] },
      { who: "soldado", x: 300, y: 1480, name: false, mask: true, show: false, acts: [{ t: re.ciudad - 0.2, show: true }, { t: re.quedarse, pose: "point", dur: 1.5 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 900 }, { t: re.naves, z: 1.0, y: 850 }, { t: re.ciudad, z: 1.0, y: 1050 }, { t: re.muriendo, z: 1.2, x: 600, y: 1050 }],
    sfx: [{ t: re.luces, s: "rumble", v: 0.6 }, { t: re.naves, s: "boom", v: 0.8 }, { t: re.naves + 0.6, s: "fire", v: 0.7 }, { t: re.ciudad - 0.2, s: "whoosh", v: 0.4 }],
    shake: [[re.naves + 0.5, 0.8, 1.2]],
    overlay: ({ t }) => <Flash t={t} at={re.ciudad - 0.2} dur={0.3} />,
  },

  recom: {
    bg: ({ t }) => <LabRich t={t} />,
    fx: ({ t }) => S(t < rc.despierta ? <rect x={300} y={700} width={480} height={800} rx={60} fill="rgba(120,220,255,0.3)" stroke="#1b1b2f" strokeWidth={8} /> : null),
    overlay: ({ t }) => <Banner t={t} text="Quaritch… versión na'vi" t0={rc.cuerpo} t1={rc.cuerpo + 2.2} color="#9ad8ff" />,
    chars: [
      { who: "quaritch", x: 300, y: 1480, opacity: 0.0, acts: [{ t: 0, alpha: 1, dur: 0.4 }, { t: rc.recuerdos, expr: "focus" }, { t: rc.cuerpo - 0.3, alpha: 0, dur: 0.4 }] },
      { who: "quaritchnavi", x: 540, y: 1480, show: false, acts: [{ t: rc.cuerpo - 0.2, show: true }, { t: 0, expr: "sleep" }, { t: rc.despierta, expr: "surprise" }, { t: rc.manos, pose: "hold", dur: 1.6 }, { t: rc.mision, expr: "anger" }, { t: rc.mision, pose: "point", dur: 1.5 }] },
      { who: "recom", x: 900, y: 1480, facing: -1, show: false, name: false, acts: [{ t: rc.mision - 0.4, show: true }, { t: 0, expr: "focus" }] },
      { who: "recom", x: 1100, y: 1480, facing: -1, show: false, name: false, acts: [{ t: rc.mision - 0.3, show: true }, { t: 0, expr: "anger" }] },
    ],
    cam: [{ t: 0, z: 1.3, x: 300, y: 1150 }, { t: rc.cuerpo, z: 1.4, x: 540, y: 1050 }, { t: rc.manos, z: 1.7, x: 560, y: 1000 }, { t: rc.mision, z: 1.1, x: 700, y: 1100 }],
    sfx: [{ t: rc.sorpresa, s: "boom", v: 0.4 }, { t: rc.cuerpo, s: "zap", v: 0.6 }, { t: rc.despierta, s: "whoosh", v: 0.5 }, { t: rc.mision, s: "boom", v: 0.5 }],
  },

  captura: {
    bg: DAY,
    fx: ({ t }) =>
      S(
        <>
          <Arrow x0={-300} y0={1000} x1={900} y1={1150} t={t} t0={ca.flechas} />
          <Arrow x0={-300} y0={950} x1={1100} y1={1100} t={t} t0={ca.flechas + 0.25} />
          {t > ca.flechas + 0.6 ? <Explosion x={1000} y={1250} s={0.9} k={Math.max(0, 1 - (t - ca.flechas - 0.6) * 1.2)} /> : null}
        </>,
      ),
    chars: [
      { who: "loak", x: 300, y: 1480, acts: [{ t: 0, pose: "cheer", dur: 1.5 }, { t: ca.atrapan, expr: "surprise" }, { t: ca.atrapan, pose: "cower", dur: 1.5 }, { t: ca.salvar, walk: -200, dur: 1, run: true }] },
      { who: "tuk", x: 460, y: 1480, acts: [{ t: ca.atrapan, expr: "surprise" }, { t: ca.salvar, walk: -200, dur: 1.2, run: true }] },
      { who: "kiri", x: 600, y: 1480, acts: [{ t: ca.atrapan, expr: "surprise" }, { t: ca.salvar, walk: -200, dur: 1.3, run: true }] },
      { who: "spider", x: 740, y: 1480, mask: true, acts: [{ t: ca.atrapan, expr: "surprise" }, { t: ca.spider, move: { x: 1250 }, dur: 1 }, { t: ca.spider, expr: "sadness" }] },
      { who: "quaritchnavi", x: 1600, y: 1480, facing: -1, acts: [{ t: ca.soldados - 0.5, walk: 920, dur: 1.2, run: true }, { t: ca.atrapan, pose: "point", dur: 1.4 }, { t: 0, expr: "anger" }, { t: ca.spider, walk: 1350, dur: 1 }] },
      { who: "recom", x: 1750, y: 1480, facing: -1, name: false, acts: [{ t: ca.soldados - 0.3, walk: 1100, dur: 1.2, run: true }, { t: 0, expr: "anger" }] },
      { who: "jakenavi", x: -300, y: 1480, show: false, holding: () => <Bow r={-10} s={0.85} />, acts: [{ t: ca.rescatarlos - 0.5, show: true }, { t: ca.rescatarlos - 0.5, walk: 120, dur: 0.6, run: true }, { t: ca.flechas - 0.2, pose: "wandAim", dur: 1.5 }, { t: 0, expr: "anger" }] },
      { who: "neytiri", x: -400, y: 1480, show: false, holding: bow, acts: [{ t: ca.rescatarlos - 0.4, show: true }, { t: ca.rescatarlos - 0.4, walk: 0, dur: 0.6, run: true }, { t: ca.flechas, pose: "wandAim", dur: 1.5 }, { t: 0, expr: "anger" }] },
    ],
    cam: [{ t: 0, z: 1.1, x: 500, y: 1150 }, { t: ca.atrapan, z: 1.2, x: 800, y: 1100 }, { t: ca.rescatarlos, z: 1.0, x: 500, y: 1100 }, { t: ca.flechas, z: 1.0, y: 1100 }, { t: ca.spider, z: 1.4, x: 1250, y: 1100 }],
    sfx: [{ t: ca.atrapan, s: "crash", v: 0.6 }, { t: ca.rescatarlos, s: "whoosh", v: 0.6 }, { t: ca.flechas, s: "whoosh", v: 0.7 }, { t: ca.flechas + 0.6, s: "boom", v: 0.8 }, { t: ca.spider, s: "chime", v: 0.3 }],
    shake: [[ca.flechas + 0.6, 0.7, 0.6]],
  },

  huida: {
    bg: switchAt(hu.vuela - 0.2, DAY, ({ t }) => <SkyFlight t={t} speed={1.4} />),
    under: ({ t }) =>
      S(
        t > hu.vuela - 0.2 ? (
          <>
            {[0, 1, 2, 3].map((i) => (
              <Ikran key={i} x={kf(t, [hu.vuela - 0.2, D("huida")], [-500 - i * 260, 1300 - i * 260])} y={760 + (i % 2) * 180} s={1.4 - (i % 2) * 0.3} t={t + i} col={["#3a6ad8", "#d84a6a", "#3ab88a", "#e8b923"][i]} />
            ))}
          </>
        ) : null,
      ),
    chars: [
      { who: "jakenavi", x: 400, y: 1480, acts: [{ t: hu.peligro, expr: "sadness" }, { t: hu.decision, pose: "think", dur: 1.5 }, { t: hu.decision + 1.5, talk: 1.5 }, { t: hu.vuela - 0.2, pose: "ride" }, { t: hu.vuela - 0.2, move: { x: -490, y: 770 }, dur: 0.01 }, { t: hu.vuela - 0.19, move: { x: 1310, y: 770 }, dur: D("huida") - hu.vuela + 0.19 }, { t: hu.mar, expr: "focus" }] },
      { who: "neytiri", x: 600, y: 1480, facing: -1, acts: [{ t: hu.peligro, expr: "sadness" }, { t: hu.vuela - 0.2, show: false }] },
      { who: "eytukan", x: 820, y: 1480, facing: -1, name: false, acts: [{ t: hu.decision, expr: "sadness" }, { t: hu.vuela - 0.2, show: false }] },
    ],
    cam: [{ t: 0, z: 1.2, x: 500, y: 1100 }, { t: hu.decision, z: 1.5, x: 420, y: 1050 }, { t: hu.vuela, z: 1.0, y: 950 }, { t: hu.agua, z: 1.1, x: 800, y: 950 }],
    sfx: [{ t: hu.decision, s: "chime", v: 0.4 }, { t: hu.vuela - 0.2, s: "whoosh", v: 0.8 }, { t: hu.vuela + 0.4, s: "roar", v: 0.5 }],
    overlay: ({ t }) => <Flash t={t} at={hu.vuela - 0.2} dur={0.3} />,
  },

  arrecife: {
    bg: REEF,
    chars: [
      ...FAMILY(-200).map((c, i) => ({ ...c, name: i === 1, acts: [{ t: 0, walk: c.x + 300, dur: 1.4 }, { t: ar.casas, expr: "surprise" as const }] })),
      { who: "jakenavi", x: -350, y: 1480, acts: [{ t: 0, walk: -50, dur: 1.4 }, { t: ar.tonowari + 0.8, pose: "point", dur: 1 }] },
      { who: "tonowari", x: 900, y: 1480, facing: -1, acts: [{ t: ar.tonowari, pose: "armsUp", dur: 1.2 }, { t: ar.tonowari, expr: "joy" }, { t: ar.tonowari, talk: 2 }] },
      { who: "ronal", x: 1100, y: 1480, facing: -1, acts: [{ t: ar.ronal, pose: "crossed" }, { t: ar.ronal, expr: "anger" }, { t: ar.desconfia, talk: 1.5 }] },
      { who: "tsireya", x: 1280, y: 1480, facing: -1, name: false, acts: [{ t: ar.distintos, expr: "joy" }] },
      { who: "aonung", x: 1420, y: 1480, facing: -1, name: false, acts: [{ t: ar.distintos, expr: "anger" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: ar.casas, z: 1.0, y: 950 }, { t: ar.distintos, z: 1.3, x: 1150, y: 1050 }, { t: ar.tonowari, z: 1.4, x: 900, y: 1000 }, { t: ar.ronal, z: 1.5, x: 1100, y: 1000 }],
    sfx: [{ t: ar.arrecife, s: "splash", v: 0.4 }, { t: ar.casas, s: "chime", v: 0.5 }, { t: ar.tonowari, s: "cheer", v: 0.3 }, { t: ar.desconfia, s: "hiss", v: 0.3 }],
  },

  aprenden: {
    bg: switchAt(ap.ilu - 0.3, UNDER, SEA),
    under: ({ t }) =>
      S(
        <>
          {t > ap.ilu - 0.3 ? <Ilu x={kf(t, [ap.ilu - 0.3, ap.skimwings], [200, 700])} y={1300} s={1.6} t={t} /> : null}
          {t > ap.skimwings - 0.2 ? <Skimwing x={kf(t, [ap.skimwings - 0.2, D("aprenden")], [-300, 1300])} y={kf(t, [ap.skimwings, ap.saltan, ap.saltan + 1, D("aprenden")], [1150, 1150, 800, 1150])} s={1.5} t={t} r={kf(t, [ap.saltan - 0.2, ap.saltan + 0.5, ap.saltan + 1.2], [0, -18, 12])} /> : null}
        </>,
      ),
    fx: ({ t }) => S(t < ap.ilu - 0.3 ? <Bubbles x={560} y={950} t={t} /> : null),
    overlay: ({ t }) => (
      <>
        <Banner t={t} text="Aguantar la respiración 🫧" t0={ap.respiracion - 0.2} t1={ap.olas - 0.2} color="#9af0ff" />
        <Banner t={t} text="Montar un ilu" t0={ap.ilu - 0.2} t1={ap.skimwings - 0.3} color="#7ad8f0" />
        <Banner t={t} text="¡Y un skimwing!" t0={ap.skimwings - 0.2} t1={ap.skimwings + 2} color="#ffe14d" />
      </>
    ),
    chars: [
      { who: "loak", x: 560, y: 1150, acts: [{ t: 0, rot: 75 }, { t: 0, expr: "focus" }, { t: ap.nadar, move: { x: 900 }, dur: 1.4 }, { t: ap.ilu - 0.3, show: false }] },
      { who: "tsireya", x: 260, y: 1220, acts: [{ t: 0, rot: 75 }, { t: 0, expr: "joy" }, { t: ap.ilu - 0.3, show: false }] },
      { who: "kiri", x: 200, y: 1110, show: false, acts: [{ t: ap.ilu - 0.3, show: true }, { t: ap.ilu - 0.3, pose: "ride" }, { t: ap.ilu - 0.3, move: { x: 700, y: 1110 }, dur: ap.skimwings - ap.ilu + 0.3 }, { t: ap.ilu, expr: "joy" }] },
      { who: "jakenavi", x: -300, y: 1060, show: false, acts: [{ t: ap.skimwings - 0.2, show: true }, { t: ap.skimwings - 0.2, pose: "ride" }, { t: ap.skimwings - 0.19, move: { x: 1300 }, dur: D("aprenden") - ap.skimwings }, { t: ap.saltan, move: { y: 720 }, dur: 1 }, { t: ap.saltan + 1, move: { y: 1060 }, dur: D("aprenden") - ap.saltan - 1 }, { t: ap.saltan, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.2, x: 500, y: 1100 }, { t: ap.olas, z: 1.1, x: 700, y: 1100 }, { t: ap.ilu, z: 1.1, x: 450, y: 1100 }, { t: ap.skimwings, z: 1.0, y: 1000 }],
    sfx: [{ t: ap.respiracion, s: "splash", v: 0.6 }, { t: ap.nadar, s: "whoosh", v: 0.4 }, { t: ap.ilu - 0.3, s: "splash", v: 0.6 }, { t: ap.skimwings, s: "whoosh", v: 0.7 }, { t: ap.saltan, s: "splash", v: 0.7 }, { t: ap.saltan + 0.4, s: "cheer", v: 0.3 }],
  },

  bullying: {
    bg: REEF,
    chars: [
      { who: "aonung", x: 800, y: 1480, facing: -1, acts: [{ t: bu.burla, pose: "point", dur: 1.6 }, { t: bu.burla, expr: "joy" }, { t: bu.burla, talk: 2 }, { t: bu.pelea + 0.3, rot: 70, dur: 0.3 }, { t: bu.pelea + 0.3, expr: "surprise" }, { t: bu.reta, rot: 0, dur: 0.4 }] },
      { who: "loak", x: 420, y: 1480, acts: [{ t: bu.burla, expr: "anger" }, { t: bu.pelea - 0.2, walk: 680, dur: 0.4, run: true }, { t: bu.pelea, pose: "angry", dur: 1 }, { t: bu.reta, walk: 400, dur: 0.6 }, { t: bu.reta, expr: "sadness" }, { t: bu.altura, pose: "sad", dur: 2 }] },
      { who: "jakenavi", x: -300, y: 1480, show: false, acts: [{ t: bu.reta - 0.6, show: true }, { t: bu.reta - 0.6, walk: 200, dur: 0.6 }, { t: bu.reta, pose: "point", dur: 1.4 }, { t: bu.reta, expr: "anger" }, { t: bu.reta, talk: 1.6 }] },
      { who: "neteyam", x: -400, y: 1480, show: false, name: false, acts: [{ t: bu.altura - 0.4, show: true }, { t: bu.altura - 0.4, walk: 30, dur: 0.6 }, { t: bu.altura, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.2, x: 650, y: 1100 }, { t: bu.burla, z: 1.5, x: 800, y: 1000 }, { t: bu.pelea, z: 1.2, x: 700, y: 1100 }, { t: bu.reta, z: 1.2, x: 300, y: 1100 }, { t: bu.altura, z: 1.5, x: 400, y: 1050 }],
    sfx: [{ t: bu.burla, s: "pop", v: 0.4 }, { t: bu.pelea + 0.3, s: "crash", v: 0.6 }, { t: bu.pelea + 0.4, s: "splash", v: 0.5 }, { t: bu.reta, s: "boom", v: 0.4 }],
  },

  kiri: {
    bg: switchAt(ki.arbol - 0.3, UNDER, ({ t }) => <SpiritTreeSea t={t} k={kf(t, [ki.grace, ki.ataque], [0.6, 1.2])} />),
    fx: ({ t }) =>
      S(
        <>
          {t < ki.arbol - 0.3 ? <Bubbles x={560} y={1000} t={t} /> : null}
          {t > ki.arbol - 0.3 ? <QueueLink x0={500} y0={1080} x1={540} y1={860} t={t} k={kf(t, [ki.grace - 0.3, ki.grace + 0.3, ki.ataque + 0.5, ki.padre], [0, 1, 1, 0])} /> : null}
          {t > ki.grace && t < ki.ataque + 0.5 ? <g opacity={kf(t, [ki.grace, ki.grace + 0.6, ki.ataque, ki.ataque + 0.5], [0, 0.6, 0.6, 0])}><circle cx={760} cy={950} r={90} fill="#ffffff" filter="url(#soft)" /><text x={760} y={970} textAnchor="middle" fontSize={60}>👩‍🔬</text></g> : null}
        </>,
      ),
    chars: [
      { who: "kiri", x: 560, y: 1200, acts: [{ t: 0, rot: 70 }, { t: 0, expr: "joy" }, { t: ki.arbol - 0.3, rot: 0, dur: 0.01 }, { t: ki.arbol - 0.3, move: { y: 1480 }, dur: 0.01 }, { t: ki.arbol, pose: "armsUp", dur: 1.5 }, { t: ki.grace, expr: "focus" }, { t: ki.ataque, expr: "surprise" }, { t: ki.ataque + 0.2, rot: -80, dur: 0.6 }, { t: ki.padre, expr: "sleep" }] },
      { who: "neytiri", x: 1400, y: 1480, facing: -1, show: false, acts: [{ t: ki.ataque + 0.4, show: true }, { t: ki.ataque + 0.4, walk: 800, dur: 0.6, run: true }, { t: ki.padre, expr: "sadness" }] },
    ],
    cam: [{ t: 0, z: 1.2, x: 560, y: 1150 }, { t: ki.arbol, z: 1.0, y: 1050 }, { t: ki.grace, z: 1.4, x: 640, y: 1050 }, { t: ki.ataque, z: 1.6, x: 560, y: 1200 }, { t: ki.padre, z: 1.2, x: 680, y: 1150 }],
    sfx: [{ t: ki.respirar, s: "sparkle", v: 0.4 }, { t: ki.arbol, s: "chime", v: 0.5 }, { t: ki.grace, s: "sparkle", v: 0.6 }, { t: ki.ataque, s: "zap", v: 0.7 }, { t: ki.padre, s: "chime", v: 0.3 }],
    shake: [[ki.ataque, 0.6, 1]],
  },

  payakan: {
    bg: UNDER,
    under: ({ t }) =>
      S(
        <>
          {t > pa.tiburon - 0.6 && t < pa.salva + 0.6 ? <SeaPredator x={kf(t, [pa.tiburon - 0.6, pa.tiburon + 0.6, pa.salva + 0.6], [1700, 1050, 1900])} y={1050} s={1.8} flip t={t} bite={kf(t, [pa.tiburon, pa.tiburon + 0.4, pa.salva], [0, 1, 0.2])} /> : null}
          {t > pa.salva - 0.4 ? <Tulkun x={kf(t, [pa.salva - 0.4, pa.salva + 0.5, D("payakan")], [-900, 300, 500])} y={1050} s={1.5} t={t} scar /> : null}
        </>,
      ),
    fx: ({ t }) => S(<Bubbles x={kf(t, [0, D("payakan")], [600, 900])} y={980} t={t} />),
    chars: [
      { who: "aonung", x: 400, y: 1150, acts: [{ t: 0, rot: 70 }, { t: pa.abandona, move: { x: -300 }, dur: 1.4 }, { t: 0, expr: "joy" }] },
      { who: "loak", x: 650, y: 1100, acts: [{ t: 0, rot: 70 }, { t: pa.abandona + 0.6, expr: "surprise" }, { t: pa.tiburon, expr: "surprise" }, { t: pa.tiburon, pose: "cower", dur: 1.2 }, { t: pa.payakan, expr: "joy" }, { t: pa.inseparables, move: { x: 900, y: 860 }, dur: 1.4 }, { t: pa.inseparables, pose: "ride" }, { t: pa.inseparables, rot: 0, dur: 0.6 }] },
    ],
    cam: [{ t: 0, z: 1.1, x: 550, y: 1100 }, { t: pa.tiburon, z: 1.0, y: 1050 }, { t: pa.salva, z: 0.95, y: 1050 }, { t: pa.aleta, z: 1.3, x: 350, y: 1150 }, { t: pa.payakan, z: 1.1, x: 600, y: 1000 }],
    sfx: [{ t: pa.tiburon, s: "roar", v: 0.8 }, { t: pa.salva, s: "crash", v: 0.8 }, { t: pa.tulkun, s: "rumble", v: 0.6 }, { t: pa.payakan, s: "chime", v: 0.6 }],
    shake: [[pa.salva, 0.7, 0.8]],
  },

  tulkun: {
    bg: SEA,
    under: ({ t }) =>
      S(
        <>
          {[0, 1, 2].map((i) => (
            <Tulkun key={i} x={kf(t, [0, D("tulkun")], [-400 + i * 500, 100 + i * 500])} y={1200 + (i % 2) * 120} s={0.9 - i * 0.1} t={t + i} col={i === 1 ? "#9aaac8" : "#8a9ab8"} />
          ))}
          {t > tu.cantan ? [0, 1, 2].map((i) => <text key={`n${i}`} x={200 + i * 400} y={kf(t, [tu.cantan, tu.cantan + 2], [1000, 700]) - i * 40} fontSize={70} opacity={kf(t, [tu.cantan, tu.cantan + 0.4, tu.matar], [0, 1, 0])}>🎵</text>) : null}
          {t > tu.expulsado - 0.2 ? <Tulkun x={kf(t, [tu.expulsado, D("tulkun")], [1600, 1300])} y={1300} s={0.8} flip t={t} scar /> : null}
        </>,
      ),
    chars: [{ who: "loak", x: 300, y: 1060, acts: [{ t: 0, pose: "ride" }, { t: tu.hermanos, expr: "joy" }, { t: tu.expulsado, expr: "sadness" }] }],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: tu.cantan, z: 1.05, y: 950 }, { t: tu.expulsado, z: 1.2, x: 1200, y: 1150 }],
    sfx: [{ t: tu.cantan, s: "chime", v: 0.6 }, { t: tu.cantan + 0.6, s: "chime", v: 0.5 }, { t: tu.expulsado, s: "rumble", v: 0.4 }],
  },

  spider: {
    bg: DAY,
    chars: [
      { who: "spider", x: 400, y: 1480, mask: true, acts: [{ t: sp.odia, expr: "anger" }, { t: sp.odia, pose: "crossed", dur: 1.4 }, { t: sp.ensena, expr: "joy" }, { t: sp.ensena, talk: 2.5 }, { t: sp.ensena, pose: "point", dur: 1.5 }, { t: sp.idioma, pose: "talk", dur: 1.5 }] },
      { who: "quaritchnavi", x: 760, y: 1480, facing: -1, acts: [{ t: sp.quaritch, expr: "focus" }, { t: sp.ensena + 0.5, walk: 820, dur: 0.6 }, { t: sp.ensena + 1.2, pose: "wandUp", dur: 1.2 }, { t: sp.idioma, talk: 1.5 }, { t: sp.quererlo, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.2, x: 580, y: 1100 }, { t: sp.odia, z: 1.5, x: 400, y: 1150 }, { t: sp.ensena, z: 1.1, x: 600, y: 1100 }, { t: sp.quererlo, z: 1.6, x: 760, y: 950 }],
    sfx: [{ t: sp.odia, s: "boom", v: 0.3 }, { t: sp.ensena, s: "pop", v: 0.4 }, { t: sp.quererlo, s: "chime", v: 0.5 }],
  },

  cazadores: {
    bg: switchAt(cz.cazadores - 0.2, ({ t }) => <BurningForest t={t} />, SEA),
    under: ({ t }) =>
      S(
        t > cz.cazadores - 0.2 ? (
          <>
            <WhalerShip x={kf(t, [cz.cazadores, D("cazadores")], [1500, 1100])} y={1000} s={0.75} flip t={t} />
            <Tulkun x={kf(t, [cz.cazadores, D("cazadores")], [-300, 300])} y={1250} s={0.9} t={t} swim={t > cz.madre ? 0.2 : 1} />
            {[0, 1, 2].map((i) => (
              <HunterBoat key={i} x={kf(t, [cz.arpones - 1, D("cazadores")], [1600 + i * 120, 600 + i * 220])} y={1160 + i * 60} s={1} flip t={t} fire={t > cz.arpones + i * 0.2} />
            ))}
            {[0, 1, 2].map((i) => (
              <Harpoon key={`h${i}`} x0={700 + i * 220} y0={1120 + i * 60} x1={350 + i * 60} y1={1180 + i * 20} t={t} t0={cz.arpones + i * 0.25} />
            ))}
          </>
        ) : null,
      ),
    overlay: ({ t }) => <Banner t={t} text="💧 = 💰💰💰" t0={cz.cerebro} t1={cz.millones + 1.2} color="#ffe14d" />,
    chars: [
      { who: "quaritchnavi", x: 600, y: 1480, facing: -1, acts: [{ t: 0, expr: "anger" }, { t: cz.quema, pose: "point", dur: 1.5 }, { t: cz.cazadores - 0.2, show: false }] },
      { who: "scoresby", x: 1100, y: 1480, facing: -1, show: false, acts: [{ t: cz.cerebro - 0.3, show: true }, { t: cz.millones, expr: "joy" }, { t: cz.millones, talk: 1.5 }, { t: cz.arpones - 0.5, show: false }] },
    ],
    cam: [{ t: 0, z: 1.2, x: 600, y: 1100 }, { t: cz.cazadores, z: 1.0, y: 1050 }, { t: cz.cerebro, z: 1.3, x: 1100, y: 1100 }, { t: cz.arpones, z: 1.0, y: 1100 }, { t: cz.madre, z: 1.3, x: 350, y: 1200 }],
    sfx: [{ t: cz.quema, s: "fire", v: 0.7 }, { t: cz.cazadores, s: "rumble", v: 0.6 }, { t: cz.millones, s: "coins", v: 0.6 }, { t: cz.arpones, s: "zap", v: 0.7 }, { t: cz.arpones + 0.3, s: "zap", v: 0.7 }, { t: cz.madre, s: "chime", v: 0.4 }],
  },

  secreto: {
    bg: switchAt(se.mataron - 0.2, UNDER, ({ t }) => <OpenSea t={t} storm />),
    under: ({ t }) =>
      S(
        t < se.mataron - 0.2 ? (
          <Tulkun x={400} y={1100} s={1.4} t={t} scar />
        ) : (
          <g opacity={0.9}>
            <WhalerShip x={900} y={1000} s={0.6} flip t={t} />
            <Tulkun x={kf(t, [se.mataron, se.ataco + 1], [-200, 700])} y={1200} s={0.8} t={t} scar />
            {t > se.ataco ? <Explosion x={850} y={1050} s={1} k={Math.max(0, 1 - (t - se.ataco) * 1.2)} /> : null}
          </g>
        ),
      ),
    chars: [{ who: "loak", x: 880, y: 1300, acts: [{ t: 0, rot: 60 }, { t: se.secreto, expr: "surprise" }, { t: se.mataron - 0.2, show: false }, { t: se.echaron, show: true }, { t: se.echaron, expr: "sadness" }, { t: se.marginado, expr: "joy" }] }],
    cam: [{ t: 0, z: 1.1, x: 600, y: 1150 }, { t: se.mataron, z: 1.0, y: 1050 }, { t: se.ataco, z: 1.2, x: 800, y: 1050 }, { t: se.marginado, z: 1.3, x: 700, y: 1150 }],
    sfx: [{ t: se.secreto, s: "chime", v: 0.4 }, { t: se.mataron, s: "zap", v: 0.6 }, { t: se.ataco, s: "boom", v: 0.8 }, { t: se.marginado, s: "chime", v: 0.5 }],
    overlay: ({ t }) => <Flash t={t} at={se.mataron - 0.2} dur={0.3} color="#000" />,
  },

  trampa: {
    bg: SEA,
    under: ({ t }) =>
      S(
        <>
          <WhalerShip x={1100} y={1030} s={0.85} flip t={t} />
          {t > tr.clan - 0.3 ? [0, 1, 2, 3].map((i) => <Ilu key={i} x={kf(t, [tr.clan - 0.3, D("trampa")], [-600 - i * 200, 500 - i * 220])} y={1300 + (i % 2) * 60} s={1.0} t={t + i} />) : null}
          {t > tr.montados ? [0, 1].map((i) => <Skimwing key={`s${i}`} x={kf(t, [tr.montados, D("trampa")], [-400 - i * 300, 700 - i * 300])} y={1150 - i * 60} s={1.0} t={t} />) : null}
        </>,
      ),
    chars: [
      { who: "loak", x: 1000, y: 1010, acts: [{ t: tr.ata, expr: "surprise" }, { t: tr.ata, pose: "cower", dur: 99 }] },
      { who: "tuk", x: 1120, y: 1010, name: false, acts: [{ t: tr.ata, expr: "sadness" }, { t: tr.ata, pose: "cower", dur: 99 }] },
      { who: "tsireya", x: 1240, y: 1010, name: false, acts: [{ t: tr.ata, expr: "surprise" }, { t: tr.ata, pose: "cower", dur: 99 }] },
      { who: "quaritchnavi", x: 860, y: 1010, facing: 1, acts: [{ t: 0, expr: "joy" }, { t: tr.secuestra, pose: "point", dur: 1.4 }, { t: tr.secuestra, talk: 2 }] },
      { who: "jakenavi", x: -500, y: 1150, show: false, acts: [{ t: tr.clan - 0.3, show: true }, { t: tr.clan - 0.3, pose: "ride" }, { t: tr.clan - 0.29, move: { x: 500 }, dur: D("trampa") - tr.clan }, { t: 0, expr: "anger" }] },
    ],
    cam: [{ t: 0, z: 1.2, x: 1000, y: 950 }, { t: tr.ata, z: 1.4, x: 1100, y: 900 }, { t: tr.clan, z: 1.0, y: 1050 }, { t: tr.montados, z: 1.0, y: 1050 }],
    sfx: [{ t: tr.secuestra, s: "boom", v: 0.5 }, { t: tr.ata, s: "knock", v: 0.5 }, { t: tr.clan, s: "cheer", v: 0.5 }, { t: tr.montados, s: "whoosh", v: 0.6 }],
  },

  payakan_ataca: {
    bg: SEA,
    under: ({ t }) =>
      S(
        <>
          <WhalerShip x={1100} y={1030} s={0.85} flip t={t} tilt={kf(t, [pk.embiste, pk.embiste + 0.6], [0, -8])} />
          {[0, 1].map((i) => (
            <HunterBoat key={i} x={600 + i * 300} y={1200 + i * 50} s={1} flip t={t} />
          ))}
          <Tulkun x={kf(t, [pk.llega - 0.5, pk.embiste, D("payakan_ataca")], [-900, 500, 400])} y={kf(t, [pk.llega - 0.5, pk.aplasta, pk.aplasta + 0.6, pk.embiste], [1300, 1300, 1050, 1250])} s={1.4} t={t} scar />
          {t > pk.destroza ? <Explosion x={700} y={1180} s={0.8} k={Math.max(0, 1 - (t - pk.destroza) * 1.3)} /> : null}
          {t > pk.aplasta ? <Explosion x={900} y={1230} s={0.9} k={Math.max(0, 1 - (t - pk.aplasta) * 1.3)} /> : null}
          {t > pk.embiste ? <Explosion x={850} y={1050} s={1.4} k={Math.max(0, 1 - (t - pk.embiste) * 1.0)} /> : null}
        </>,
      ),
    chars: [{ who: "loak", x: 1000, y: 1010, acts: [{ t: 0, pose: "cower", dur: pk.amigo }, { t: pk.llega, expr: "surprise" }, { t: pk.amigo, expr: "joy" }, { t: pk.amigo, pose: "cheer", dur: 1.5 }] }],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: pk.llega, z: 1.0, x: 300, y: 1100 }, { t: pk.embiste, z: 1.1, x: 800, y: 1050 }, { t: pk.amigo, z: 1.4, x: 1000, y: 900 }],
    sfx: [{ t: pk.llega, s: "rumble", v: 0.8 }, { t: pk.destroza, s: "crash", v: 0.8 }, { t: pk.aplasta, s: "boom", v: 0.8 }, { t: pk.embiste, s: "boom", v: 1 }, { t: pk.embiste + 0.3, s: "crash", v: 0.8 }, { t: pk.amigo, s: "cheer", v: 0.4 }],
    shake: [[pk.aplasta, 0.7, 0.6], [pk.embiste, 1, 1.2]],
  },

  rescate: {
    bg: switchAt(rs.roca - 0.2, SEA, ({ t }) => <ReefVillage t={t} sunset />),
    under: ({ t }) => S(t < rs.roca - 0.2 ? <WhalerShip x={1250} y={1030} s={0.8} flip t={t} tilt={-8} /> : null),
    chars: [
      { who: "neteyam", x: 700, y: 1300, acts: [{ t: rs.rescatan, pose: "point", dur: 1 }, { t: rs.escapar, move: { x: 400 }, dur: 1 }, { t: rs.disparo, expr: "surprise" }, { t: rs.cae, rot: 80, dur: 0.5 }, { t: rs.cae, expr: "sleep" }, { t: rs.roca - 0.2, move: { x: 540, y: 1460 }, dur: 0.01 }, { t: rs.roca - 0.2, rot: -86, dur: 0.01 }] },
      { who: "loak", x: 860, y: 1300, acts: [{ t: rs.escapar, move: { x: 560 }, dur: 1 }, { t: rs.cae, expr: "surprise" }, { t: rs.roca - 0.2, move: { x: 300, y: 1480 }, dur: 0.01 }, { t: rs.muere, expr: "sadness" }, { t: rs.muere, pose: "cower", dur: 3 }] },
      { who: "tsireya", x: 1000, y: 1300, name: false, acts: [{ t: rs.escapar, move: { x: 700 }, dur: 1 }, { t: rs.roca - 0.2, show: false }] },
      { who: "jakenavi", x: 760, y: 1480, show: false, acts: [{ t: rs.roca - 0.2, show: true }, { t: rs.muere, expr: "sadness" }, { t: rs.muere, pose: "cower", dur: 3 }] },
      { who: "neytiri", x: 900, y: 1480, facing: -1, show: false, acts: [{ t: rs.roca - 0.2, show: true }, { t: rs.muere, expr: "sadness" }, { t: rs.muere, pose: "cower", dur: 3 }] },
    ],
    cam: [{ t: 0, z: 1.1, x: 750, y: 1050 }, { t: rs.disparo, z: 1.5, x: 450, y: 1000 }, { t: rs.roca, z: 1.2, x: 600, y: 1200 }, { t: rs.muere, z: 1.5, x: 620, y: 1250 }],
    sfx: [{ t: rs.rescatan, s: "splash", v: 0.6 }, { t: rs.disparo, s: "zap", v: 0.9 }, { t: rs.cae, s: "splash", v: 0.6 }, { t: rs.muere, s: "chime", v: 0.4 }],
    overlay: ({ t }) => <Flash t={t} at={rs.disparo} dur={0.25} />,
  },

  furia: {
    bg: ({ t }) => <OpenSea t={t} storm />,
    under: ({ t }) => S(<WhalerShip x={540} y={1250} s={1.1} t={t} tilt={-6} />),
    chars: [
      { who: "neytiri", x: 300, y: 1180, holding: () => <path d="M 0 0 L 40 -10 L 6 8 Z" fill="#c8ced6" stroke="#1b1b2f" strokeWidth={3} />, acts: [{ t: 0, expr: "anger" }, { t: fu.explota, pose: "angry", dur: 1 }, { t: fu.cuchillo, pose: "point", dur: 3 }, { t: fu.suelta, expr: "sadness" }, { t: fu.cuchillo, talk: 1.5 }] },
      { who: "spider", x: 430, y: 1180, mask: true, acts: [{ t: fu.spider, expr: "surprise" }, { t: fu.suelta, move: { x: 560 }, dur: 0.6 }] },
      { who: "kiri", x: 680, y: 1180, facing: -1, acts: [{ t: fu.kiri, expr: "surprise" }, { t: fu.suelta, move: { x: 560 }, dur: 0.6 }] },
      { who: "quaritchnavi", x: 820, y: 1180, facing: -1, acts: [{ t: 0, expr: "anger" }, { t: fu.kiri, pose: "point", dur: 2 }, { t: fu.suelta, expr: "sadness" }] },
      { who: "jakenavi", x: 560, y: 1180, show: false, acts: [{ t: fu.grita - 0.3, show: true }, { t: fu.grita, pose: "armsUp", dur: 1 }, { t: fu.grita, expr: "anger" }, { t: fu.grita, talk: 0.8 }, { t: fu.suelta - 0.1, show: false }] },
    ],
    cam: [{ t: 0, z: 1.3, x: 360, y: 900 }, { t: fu.cuchillo, z: 1.6, x: 360, y: 850 }, { t: fu.kiri, z: 1.6, x: 760, y: 850 }, { t: fu.grita, z: 1.1, x: 560, y: 900 }],
    sfx: [{ t: fu.explota, s: "roar", v: 0.6 }, { t: fu.cuchillo, s: "zap", v: 0.4 }, { t: fu.grita, s: "boom", v: 0.7 }, { t: fu.suelta, s: "chime", v: 0.4 }],
    shake: [[fu.grita, 0.6, 0.5]],
  },

  hundimiento: {
    bg: switchAt(hn.pelea - 0.2, ({ t }) => <OpenSea t={t} storm />, ({ t }) => <Underwater t={t} deep={1} night={t > hn.kiri - 0.2} />),
    under: ({ t }) =>
      S(
        t < hn.pelea - 0.2 ? (
          <WhalerShip x={540} y={1050} s={0.9} t={t} tilt={kf(t, [0, hn.pelea], [-6, -30])} sink={kf(t, [0, hn.pelea], [0, 0.4])} />
        ) : (
          <>
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1={-460 + i * 520} y1={300} x2={-300 + i * 520} y2={1500} stroke="#3a4a5a" strokeWidth={60} opacity={0.6} />
            ))}
          </>
        ),
      ),
    fx: ({ t }) =>
      S(
        <>
          {t > hn.pelea - 0.2 ? <Bubbles x={500} y={1000} t={t} /> : null}
          {t > hn.peces - 0.2 ? Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={kf(t, [hn.peces - 0.2, hn.aire], [200 + i * 30, 300 + i * 30])} cy={kf(t, [hn.peces - 0.2, hn.aire], [1300 - i * 20, 300])} r={10} fill="#7af4ff" filter="url(#glow)" />) : null}
        </>,
      ),
    chars: [
      { who: "jakenavi", x: 420, y: 1300, show: false, acts: [{ t: hn.pelea - 0.2, show: true }, { t: hn.pelea, pose: "angry", dur: 2 }, { t: 0, expr: "anger" }, { t: hn.aire, expr: "sleep" }, { t: hn.aire, rot: 40, dur: 0.6 }, { t: hn.salva, move: { y: 600 }, dur: 1.6 }] },
      { who: "quaritchnavi", x: 720, y: 1300, facing: -1, show: false, acts: [{ t: hn.pelea - 0.2, show: true }, { t: hn.pelea, pose: "angry", dur: 2 }, { t: 0, expr: "anger" }, { t: hn.kiri - 0.2, show: false }] },
      { who: "kiri", x: 900, y: 1250, show: false, acts: [{ t: hn.kiri - 0.2, show: true }, { t: hn.kiri, pose: "armsUp", dur: 2 }, { t: 0, expr: "focus" }, { t: hn.aire - 0.2, show: false }] },
      { who: "neytiri", x: 300, y: 1300, show: false, acts: [{ t: hn.peces - 0.2, show: true }, { t: hn.peces, move: { y: 400 }, dur: 2 }] },
      { who: "tuk", x: 380, y: 1330, show: false, name: false, acts: [{ t: hn.peces - 0.2, show: true }, { t: hn.peces, move: { y: 430 }, dur: 2 }] },
      { who: "loak", x: 900, y: 1200, show: false, acts: [{ t: hn.salva - 0.4, show: true }, { t: hn.salva - 0.4, move: { x: 480, y: 1250 }, dur: 0.4 }, { t: hn.salva, move: { y: 560 }, dur: 1.6 }, { t: 0, expr: "focus" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1000 }, { t: hn.pelea, z: 1.3, x: 560, y: 1100 }, { t: hn.kiri, z: 1.3, x: 900, y: 1050 }, { t: hn.peces, z: 1.0, y: 900 }, { t: hn.salva, z: 1.1, x: 460, y: 900 }],
    sfx: [{ t: hn.parte, s: "crash", v: 0.9 }, { t: hn.pelea - 0.2, s: "splash", v: 0.8 }, { t: hn.kiri, s: "sparkle", v: 0.7 }, { t: hn.aire, s: "chime", v: 0.3 }, { t: hn.salva, s: "whoosh", v: 0.6 }],
    shake: [[hn.parte, 0.8, 1]],
    overlay: ({ t }) => <Flash t={t} at={hn.pelea - 0.2} dur={0.3} color="#bff4ff" />,
  },

  spider_elige: {
    bg: switchAt(sl.espalda - 0.2, UNDER, SEA),
    chars: [
      { who: "quaritchnavi", x: 600, y: 1300, acts: [{ t: 0, rot: 40 }, { t: 0, expr: "sleep" }, { t: sl.salva, move: { y: 1100 }, dur: 1 }, { t: sl.espalda - 0.2, move: { x: 900, y: 1300 }, dur: 0.01 }, { t: sl.espalda - 0.2, rot: 0, dur: 0.01 }, { t: sl.espalda, expr: "surprise" }, { t: sl.irse, expr: "sadness" }, { t: sl.irse, pose: "sad", dur: 2 }] },
      { who: "spider", x: 300, y: 1300, mask: true, acts: [{ t: sl.salva - 0.6, move: { x: 520 }, dur: 0.6 }, { t: sl.salva, pose: "hold", dur: 1 }, { t: sl.espalda - 0.2, move: { x: 700, y: 1300 }, dur: 0.01 }, { t: sl.espalda, face: -1 }, { t: sl.espalda, move: { x: -300 }, dur: 2.5 }, { t: 0, expr: "focus" }] },
    ],
    cam: [{ t: 0, z: 1.3, x: 560, y: 1100 }, { t: sl.salva, z: 1.3, x: 560, y: 1050 }, { t: sl.espalda, z: 1.1, x: 750, y: 1100 }, { t: sl.irse, z: 1.6, x: 900, y: 1000 }],
    sfx: [{ t: sl.salva, s: "whoosh", v: 0.5 }, { t: sl.espalda, s: "splash", v: 0.4 }, { t: sl.irse, s: "chime", v: 0.4 }],
  },

  funeral: {
    bg: ({ t }) => <SpiritTreeSea t={t} k={kf(t, [0, fn.espiritu, fn.escucha + 1], [0.5, 1, 1.3])} />,
    fx: ({ t }) =>
      S(
        <>
          {t > fn.espiritu ? <circle cx={540} cy={kf(t, [fn.espiritu, fn.espiritu + 2], [1300, 900])} r={20} fill="#ffffff" filter="url(#glow)" opacity={kf(t, [fn.espiritu, fn.espiritu + 2], [1, 0.3])} /> : null}
          <QueueLink x0={360} y0={1080} x1={540} y1={880} t={t} k={kf(t, [fn.escucha, fn.escucha + 0.5], [0, 1])} />
        </>,
      ),
    chars: [
      { who: "neteyam", x: 540, y: 1400, name: true, opacity: 0.9, acts: [{ t: 0, rot: -86 }, { t: 0, expr: "sleep" }, { t: fn.bahia, move: { y: 1500 }, dur: 2 }, { t: fn.espiritu, alpha: 0.2, dur: 1.5 }] },
      { who: "loak", x: 360, y: 1480, acts: [{ t: 0, expr: "sadness" }, { t: fn.escucha, expr: "surprise" }, { t: fn.escucha + 1.2, expr: "joy" }] },
      { who: "jakenavi", x: 760, y: 1480, facing: -1, acts: [{ t: 0, expr: "sadness" }, { t: fn.entregan, pose: "sad", dur: 3 }] },
      { who: "neytiri", x: 920, y: 1480, facing: -1, acts: [{ t: 0, expr: "sadness" }, { t: fn.entregan, pose: "sad", dur: 3 }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1100 }, { t: fn.bahia, z: 1.0, y: 1050 }, { t: fn.espiritu, z: 1.2, x: 540, y: 1100 }, { t: fn.escucha, z: 1.5, x: 400, y: 1100 }],
    sfx: [{ t: fn.entregan, s: "splash", v: 0.3 }, { t: fn.espiritu, s: "sparkle", v: 0.5 }, { t: fn.escucha, s: "chime", v: 0.6 }],
  },

  final: {
    bg: ({ t }) => <ReefVillage t={t} sunset />,
    under: ({ t }) => S(<Tulkun x={kf(t, [0, D("final")], [1700, 900])} y={1100} s={0.6} flip t={t} scar />),
    chars: [
      { who: "jakenavi", x: 300, y: 1480, acts: [{ t: fi.quedarse, expr: "joy" }, { t: fi.acepta, walk: 520, dur: 0.8 }, { t: fi.acepta + 0.8, talk: 1.5 }] },
      { who: "neytiri", x: 150, y: 1480, acts: [{ t: fi.acepta, expr: "joy" }] },
      { who: "tonowari", x: 860, y: 1480, facing: -1, acts: [{ t: fi.acepta, pose: "armsUp", dur: 1.4 }, { t: fi.acepta, expr: "joy" }, { t: fi.acepta, talk: 1.6 }] },
      { who: "ronal", x: 1020, y: 1480, facing: -1, acts: [{ t: fi.acepta, expr: "joy" }] },
      { who: "loak", x: -80, y: 1480, name: false, acts: [{ t: fi.leccion, expr: "joy" }] },
      { who: "kiri", x: -220, y: 1480, name: false, acts: [{ t: fi.leccion, expr: "joy" }] },
      { who: "tuk", x: 40, y: 1480, name: false, acts: [{ t: fi.acepta, pose: "cheer", dur: 1.5 }] },
      { who: "spider", x: -350, y: 1480, name: false, mask: true, acts: [{ t: fi.leccion, expr: "joy" }] },
    ],
    cam: [{ t: 0, z: 1.0, y: 1050 }, { t: fi.acepta, z: 1.3, x: 700, y: 1050 }, { t: fi.leccion, z: 1.0, y: 1000 }, { t: fi.principio, z: 1.05, y: 950 }],
    sfx: [{ t: fi.acepta, s: "cheer", v: 0.5 }, { t: fi.leccion, s: "chime", v: 0.5 }, { t: fi.principio, s: "fanfare", v: 0.5 }],
  },
};

// selva: hojas de primer plano
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
// color intenso y fondo vivo
for (const sc of Object.values(scenes)) {
  const Bg = sc.bg;
  sc.bg = ({ t }) => (
    <div style={{ position: "absolute", inset: 0, filter: "saturate(1.4) contrast(1.06) brightness(1.04)", translate: `${Math.sin(t * 0.27) * 34}px ${Math.cos(t * 0.21) * 12}px`, scale: "1.05" }}>
      <Bg t={t} />
    </div>
  );
}

export const av2full: PartSpec = { part: 0, title: "Avatar: el camino del agua", dyn: true, scenes };
export const av2fullAudio = audio;
export { Gunship, Samson, Woodsprites };
