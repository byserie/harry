import React from "react";
import { AbsoluteFill } from "remotion";
import { PartSpec, SceneSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { FONT } from "../lib/font";
import { Banner, Flash, wordClock } from "../scenes/util";
import { Msg, Paper, Phone } from "./world";
import { Bodega, Colonia, Fiscalia, Garage, MapaCocheras } from "./world3";
import audioData from "../data/gu2.audio.json";

const audio = audioData as AudioData;
const wc = wordClock(audio);
const D = (id: string) => (audio.scenes.find((s) => s.id === id)?.dur ?? 300) / 30;
/** Tiempo de una palabra; si no está, cae en una fracción de la escena (y lo avisa). */
const w = (scene: string, word: string, nth = 0, frac = 0.5) => {
  try {
    return wc(scene, word, nth);
  } catch {
    console.warn(`[gu2] palabra "${word}" no encontrada en ${scene}`);
    return D(scene) * frac;
  }
};
const kIn = (t: number, a: number, b: number) => kf(t, [a, a + 0.35, b - 0.3, b], [0, 1, 1, 0]);

const Chapter: React.FC<{ t: number; n: string; title: string; t0?: number }> = ({ t, n, title, t0 = 0.1 }) => {
  const k = kf(t, [t0, t0 + 0.3, t0 + 2.1, t0 + 2.5], [0, 1, 1, 0]);
  if (k <= 0) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", background: `rgba(10,10,20,${0.55 * k})` }}>
      <div style={{ scale: String(0.7 + 0.3 * k), opacity: k, textAlign: "center", fontFamily: FONT, fontWeight: 700 }}>
        <div style={{ fontSize: 44, color: "#ff5a5a", letterSpacing: 6 }}>PARTE {n}</div>
        <div style={{ fontSize: 110, color: "#fff", textShadow: "0 8px 0 #000" }}>{title}</div>
      </div>
    </AbsoluteFill>
  );
};
const BigText: React.FC<{ t: number; t0: number; t1: number; text: string; color?: string; size?: number }> = ({ t, t0, t1, text, color = "#ffe14d", size = 170 }) => {
  const k = kIn(t, t0, t1);
  if (k <= 0) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: size, color, WebkitTextStroke: "14px #1b1b2f", paintOrder: "stroke fill", scale: String(0.5 + 0.5 * k), opacity: k, rotate: "-4deg", textAlign: "center", lineHeight: 1, whiteSpace: "pre-line" }}>{text}</div>
    </AbsoluteFill>
  );
};
const Dark: React.FC<{ a?: number }> = ({ a = 0.25 }) => <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0) 40%, rgba(0,0,10,${a + 0.35}) 100%)`, pointerEvents: "none" }} />;

// ---------------------------------------------------------------- tiempos clave
const g = { creias: w("gancho", "creias"), ciudad: w("gancho", "ciudad"), temporada: w("gancho", "temporada") };
const f1 = { licenciada: w("fiscalia1", "licenciada"), hojea: w("fiscalia1", "hojea"), sorprendida: w("fiscalia1", "sorprendida") };
const f2 = { alcanza: w("fiscalia2", "alcanza"), jefe: w("fiscalia2", "jefe"), hoja: w("fiscalia2", "hoja"), escriba: w("fiscalia2", "escriba"), joven: w("fiscalia2", "joven"), asiente: w("fiscalia2", "asiente") };
const f3 = { escribes: w("fiscalia3", "escribes"), flaco: w("fiscalia3", "flaco"), firmas: w("fiscalia3", "firmas"), guarda: w("fiscalia3", "guarda"), vayanse: w("fiscalia3", "vayanse") };
const n1 = { despierta: w("noche1", "despierta"), porton: w("noche1", "porton"), nadie: w("noche1", "nadie"), llave: w("noche1", "llave") };
const v1 = { bajas: w("versa1", "bajas"), abierta: w("versa1", "abierta"), lona: w("versa1", "lona"), versa: w("versa1", "versa") };
const v2 = { levantas: w("versa2", "levantas"), mojadas: w("versa2", "mojadas"), clavo: w("versa2", "clavo"), marcas: w("versa2", "marcas"), existe: w("versa2", "existe"), buzon: w("versa2", "buzon") };
const v3 = { abres: w("versa3", "abres"), caja: w("versa3", "caja"), bodega: w("versa3", "bodega"), manda: w("versa3", "manda"), vibra: w("versa3", "vibra"), manana: w("versa3", "manana") };
const b1 = { cortina: w("bodega1", "cortina"), lampara: w("bodega1", "lampara"), hombre: w("bodega1", "hombre"), panzon: w("bodega1", "panzon") };
const b2 = { tu: w("bodega2", "tu"), jefe: w("bodega2", "jefe"), manda: w("bodega2", "manda"), dormido: w("bodega2", "dormido") };
const b3 = { crees: w("bodega3", "crees"), debo: w("bodega3", "debo"), preguntas: w("bodega3", "preguntas"), puerta: w("bodega3", "puerta"), primera: w("bodega3", "primera") };
const b4 = { motor: w("bodega4", "motor"), palido: w("bodega4", "palido"), sabe: w("bodega4", "sabe"), abras: w("bodega4", "abras") };
const m1 = { licenciada: w("mic1", "licenciada"), cita: w("mic1", "cita"), pega: w("mic1", "pega"), tiemblan: w("mic1", "tiemblan"), sale: w("mic1", "sale") };
const m2 = { viernes: w("mic2", "viernes"), nunca: w("mic2", "nunca"), pasos: w("mic2", "pasos"), botas: w("mic2", "botas"), camisa: w("mic2", "camisa"), guero: w("mic2", "guero") };
const m3 = { llaves: w("mic3", "llaves"), jefe: w("mic3", "jefe"), ya: w("mic3", "ya", 0, 0.75) };
const m4 = { helado: w("mic4", "helado"), acerca: w("mic4", "acerca"), pecho: w("mic4", "pecho"), microfono: w("mic4", "microfono"), quien: w("mic4", "quien") };
const p1 = { cofre: w("mapa1", "cofre"), quieres: w("mapa1", "quieres"), mapa: w("mapa1", "mapa"), cientos: w("mapa1", "cientos"), desliza: w("mapa1", "desliza"), mexicali: w("mapa1", "mexicali"), ensenada: w("mapa1", "ensenada"), hermosillo: w("mapa1", "hermosillo"), miles: w("mapa1", "miles"), mama: w("mapa1", "mama") };
const p2 = { abajo: w("mapa2", "abajo"), arriba: w("mapa2", "arriba"), nadie: w("mapa2", "nadie"), licenciada: w("mapa2", "licenciada"), cobra: w("mapa2", "cobra") };
const tr = { llamas: w("traicion", "llamas"), denuncia: w("traicion", "denuncia"), levantas: w("traicion", "levantas"), celular: w("traicion", "celular") };
const de = { avienta: w("deuda", "avienta"), sabes: w("deuda", "sabes"), noventa: w("deuda", "noventa"), pagas: w("deuda", "pagas"), consigues: w("deuda", "consigues"), camina: w("deuda", "caminando") };
const nu1 = { semanas: w("nuevo1", "semanas"), viernes: w("nuevo1", "viernes"), renta: w("nuevo1", "renta"), libreta: w("nuevo1", "libreta"), letra: w("nuevo1", "letra") };
const nu2 = { muda: w("nuevo2", "muda"), ninos: w("nuevo2", "ninos"), nota: w("nuevo2", "nota"), cruzas: w("nuevo2", "cruzas"), oye: w("nuevo2", "oye") };
const fi = { sonrie: w("final", "sonrie"), sigue: w("final", "sigue"), mapa: w("final", "mapa"), nuevo: w("final", "nuevo"), bienvenido: w("final", "bienvenido"), pies: w("final", "pies"), botas: w("final", "botas"), comentarios: w("final", "hubieras") };

const LIBRETA = ["Calle Olivo 214 ✗", "Av. Jacarandas 87 ✗", "Privada Sauce 12 ✓✓✓ COCHERA", "Calle Olivo 219 (flaco) ✗"];

const scenes: Record<string, SceneSpec> = {
  gancho: {
    bg: ({ t }) => <Garage t={t} car tarp={1} door={0.3} />,
    chars: [{ who: "prota", x: 900, y: 1480, facing: -1, acts: [{ t: 0, expr: "sadness" }, { t: g.ciudad, expr: "surprise" }] }],
    sfx: [{ t: g.ciudad, s: "boom", v: 0.7 }, { t: g.temporada, s: "whoosh", v: 0.6 }],
    overlay: ({ t }) => (
      <>
        <MapaCocheras t={t} k={kf(t, [g.ciudad - 0.6, g.ciudad - 0.2, g.temporada - 0.3, g.temporada], [0, 1, 1, 0])} dots={Math.round(kf(t, [g.ciudad - 0.5, g.temporada], [8, 420]))} zoom={kf(t, [g.ciudad - 0.5, g.temporada], [2.2, 1])} label="🔴 COCHERAS" />
        <BigText t={t} t0={g.temporada} t1={D("gancho") + 0.2} text={"LOS 200 DÓLARES\nTEMPORADA 2"} size={140} color="#ff5a5a" />
        <Dark />
      </>
    ),
  },
  fiscalia1: {
    bg: ({ t }) => <Fiscalia t={t} />,
    chars: [
      { who: "flaco", x: -120, y: 1480, acts: [{ t: 0, expr: "sadness" }, { t: 0.5, talk: 0 }] },
      { who: "prota", x: 160, y: 1480, acts: [{ t: 0, expr: "focus" }] },
      { who: "lic", x: 1050, y: 1480, facing: -1, acts: [{ t: f1.licenciada - 0.6, walk: 860, dur: 0.8 }, { t: f1.hojea, pose: "hold", dur: 3 }, { t: f1.sorprendida, expr: "focus" }] },
    ],
    sfx: [{ t: f1.hojea, s: "pop", v: 0.3 }],
    overlay: ({ t }) => (
      <>
        <Chapter t={t} n="1" title="La licenciada" />
        <Banner t={t} text="Fiscalía · Lunes 9:00 AM" t0={2.6} t1={5} color="#d8e8ff" />
      </>
    ),
  },
  fiscalia2: {
    bg: ({ t }) => <Fiscalia t={t} paper={kf(t, [f2.hoja, f2.hoja + 0.3], [0, 1])} />,
    chars: [
      { who: "flaco", x: -120, y: 1480, acts: [{ t: 0, expr: "sadness" }, { t: f2.asiente, rot: 6, dur: 0.2 }, { t: f2.asiente + 0.25, rot: 0, dur: 0.2 }] },
      { who: "prota", x: 160, y: 1480, acts: [{ t: f2.alcanza, expr: "surprise" }, { t: f2.joven, expr: "focus" }, { t: f2.joven, face: -1 }] },
      { who: "lic", x: 860, y: 1480, facing: -1, acts: [{ t: f2.alcanza - 0.2, say: "Esto no alcanza. Necesito al jefe… con su voz." }, { t: f2.escriba - 0.2, say: "Escriba su declaración. Con su letra." }, { t: f2.hoja, pose: "point", dur: 1.2 }] },
    ],
    sfx: [{ t: f2.alcanza, s: "boom", v: 0.4 }],
  },
  fiscalia3: {
    bg: ({ t }) => <Fiscalia t={t} paper={1} />,
    chars: [
      { who: "flaco", x: -120, y: 1480, acts: [{ t: 0, expr: "sadness" }] },
      { who: "prota", x: 160, y: 1480, acts: [{ t: f3.escribes, pose: "hold", dur: 3 }, { t: 0, expr: "focus" }] },
      { who: "lic", x: 860, y: 1480, facing: -1, acts: [{ t: f3.guarda, pose: "hold", dur: 1.2 }, { t: f3.vayanse - 0.2, say: "Váyanse a su casa. Nosotros los buscamos." }, { t: 0, expr: "joy" }] },
    ],
    sfx: [{ t: f3.firmas, s: "pop", v: 0.4 }],
    overlay: ({ t }) => (
      <Paper k={kIn(t, f3.escribes - 0.2, f3.guarda)} title="DECLARACIÓN" lines={["Mi casa: Privada Sauce 12", "Casa del flaco: Calle Olivo 219", "Direcciones de la libreta…", "", "Firma: ____✍️____"]} highlight={kf(t, [f3.flaco, f3.flaco + 0.1], [0, 1]) > 0.5 && t < f3.firmas ? 1 : t >= f3.firmas ? 4 : undefined} />
    ),
  },
  noche1: {
    bg: ({ t }) => <Garage t={t} door={kf(t, [n1.porton, n1.porton + 3], [0, 0.32])} torch={kf(t, [n1.nadie, n1.nadie + 0.5], [0, 1])} />,
    chars: [{ who: "prota", x: -220, y: 1480, acts: [{ t: n1.despierta, walk: 300, dur: 1.4 }, { t: n1.porton, expr: "surprise" }, { t: n1.llave, pose: "cower", dur: 2 }] }],
    sfx: [{ t: n1.porton, s: "crash", v: 0.35 }, { t: n1.llave, s: "boom", v: 0.7 }],
    shake: [[n1.llave, 0.4, 0.4]],
    overlay: ({ t }) => (
      <>
        <Banner t={t} text="3:00 AM" t0={0.2} t1={2} color="#c8d0ff" />
        <BigText t={t} t0={n1.llave} t1={D("noche1") + 0.2} text="ALGUIEN TIENE LLAVE 🔑" size={130} color="#ff5a5a" />
        <Dark a={0.35} />
      </>
    ),
  },
  versa1: {
    bg: ({ t }) => <Garage t={t} car tarp={1} door={0.32} />,
    chars: [{ who: "prota", x: -320, y: 1480, acts: [{ t: v1.bajas, walk: 1000, dur: 2.2 }, { t: v1.abierta, expr: "surprise" }, { t: v1.lona, face: -1 }, { t: v1.versa, pose: "surprised", dur: 2 }] }],
    sfx: [{ t: v1.versa, s: "boom", v: 0.8 }],
    shake: [[v1.versa, 0.5, 0.5]],
    overlay: ({ t }) => (
      <>
        <Chapter t={t} n="2" title="El Versa volvió" t0={0} />
        <BigText t={t} t0={v1.versa} t1={D("versa1") + 0.2} text="VOLVIÓ 😨" color="#ff5a5a" />
        <Dark />
      </>
    ),
  },
  versa2: {
    bg: ({ t }) => <Garage t={t} car tarp={kf(t, [v2.levantas, v2.levantas + 0.6], [1, 0])} wet={kf(t, [v2.mojadas - 0.3, v2.mojadas], [0, 1])} door={0.32} tarpFloor={t > v2.levantas + 0.5} />,
    chars: [{ who: "prota", x: 1000, y: 1480, facing: -1, acts: [{ t: v2.levantas - 0.3, walk: 900, dur: 0.3 }, { t: v2.levantas, pose: "armsUp", dur: 0.8 }, { t: v2.mojadas, expr: "surprise" }, { t: v2.marcas, pose: "hold", dur: 4 }, { t: v2.existe, expr: "anger" }] }],
    sfx: [{ t: v2.levantas, s: "whoosh", v: 0.6 }, { t: v2.existe, s: "pop", v: 0.4 }, { t: v2.buzon, s: "pop", v: 0.4 }],
    overlay: ({ t }) => (
      <>
        <Phone k={kIn(t, v2.marcas - 0.2, D("versa2") + 0.3)} side="left">
          <div style={{ padding: 20, fontWeight: 700, fontSize: 30, color: "#1b1b2f" }}>📞 Llamadas</div>
          <Msg text="Güero → Este número no existe ❌" k={kf(t, [v2.existe - 0.2, v2.existe], [0, 1])} />
          <Msg text="Licenciada → Buzón 📵" k={kf(t, [v2.buzon - 0.2, v2.buzon], [0, 1])} />
        </Phone>
        <Dark />
      </>
    ),
  },
  versa3: {
    bg: ({ t }) => <Garage t={t} car tarp={0} trunk={kf(t, [v3.abres, v3.abres + 0.5], [0, 1])} door={0.32} tarpFloor />,
    chars: [{ who: "prota", x: 900, y: 1480, facing: -1, acts: [{ t: v3.abres, pose: "armsUp", dur: 0.6 }, { t: v3.caja, pose: "hold", dur: 4 }, { t: v3.manda, expr: "surprise" }, { t: v3.vibra, pose: "hold", dur: 3 }, { t: v3.manana, expr: "focus" }] }],
    sfx: [{ t: v3.abres, s: "pop", v: 0.5 }, { t: v3.manda, s: "boom", v: 0.5 }, { t: v3.vibra, s: "chime", v: 0.5 }],
    overlay: ({ t }) => (
      <>
        <Paper k={kIn(t, v3.bodega - 0.3, v3.vibra - 0.2)} title="📍 Bodega · Salida a Tecate" lines={["", "Si quieres saber", "quién manda,", "ven solo."]} highlight={t > v3.manda ? 3 : undefined} />
        <Phone k={kIn(t, v3.vibra - 0.2, D("versa3") + 0.3)} side="left">
          <div style={{ padding: 20, fontWeight: 700, fontSize: 30, color: "#1b1b2f" }}>💬 Jefe</div>
          <Msg text="Mañana. 10 de la noche." k={kf(t, [v3.vibra, v3.vibra + 0.3], [0, 1])} />
        </Phone>
        <Dark />
      </>
    ),
  },
  bodega1: {
    bg: ({ t }) => <Bodega t={t} />,
    chars: [
      { who: "jefe", x: 540, y: 1480, acts: [{ t: 0, pose: "sit" }, { t: 0, expr: "sadness" }, { t: b1.panzon, pose: "hold", dur: 3 }] },
      { who: "prota", x: 1500, y: 1480, facing: -1, acts: [{ t: b1.cortina, walk: 1050, dur: 2.2 }, { t: b1.hombre, expr: "surprise" }] },
    ],
    sfx: [{ t: b1.cortina, s: "crash", v: 0.3 }],
    overlay: ({ t }) => (
      <>
        <Chapter t={t} n="3" title="La bodega" t0={0} />
        <Banner t={t} text="Salida a Tecate · 10:00 PM" t0={2.4} t1={4.6} color="#ffd8a8" />
        <Dark a={0.4} />
      </>
    ),
  },
  bodega2: {
    bg: ({ t }) => <Bodega t={t} />,
    chars: [
      { who: "jefe", x: 540, y: 1480, acts: [{ t: 0, pose: "sit" }, { t: 0, expr: "sadness" }, { t: b2.tu - 0.2, say: "¿Tú eres el de la cochera?" }] },
      { who: "prota", x: 1050, y: 1480, facing: -1, acts: [{ t: b2.jefe, expr: "surprise" }, { t: b2.dormido, expr: "focus" }] },
    ],
    sfx: [{ t: b2.jefe, s: "boom", v: 0.5 }],
    overlay: ({ t }) => (
      <>
        <BigText t={t} t0={b2.jefe} t1={b2.jefe + 2.4} text="¿ESTE ES EL JEFE?" size={130} />
        <Dark a={0.4} />
      </>
    ),
  },
  bodega3: {
    bg: ({ t }) => <Bodega t={t} />,
    chars: [
      { who: "jefe", x: 540, y: 1480, acts: [{ t: 0, pose: "sit" }, { t: b3.crees - 0.2, say: "¿Crees que yo invento esto? Yo también debo." }, { t: 0, expr: "anger" }, { t: b3.puerta, expr: "sadness" }, { t: b3.puerta, look: 1 }, { t: b3.primera - 1.2, say: "Al que te trajo el carro la primera vez." }] },
      { who: "prota", x: 1050, y: 1480, facing: -1, acts: [{ t: b3.preguntas - 0.2, say: "¿A quién le debes?" }, { t: b3.primera, expr: "surprise" }] },
    ],
    sfx: [{ t: b3.primera, s: "boom", v: 0.6 }],
    overlay: () => <Dark a={0.45} />,
  },
  bodega4: {
    bg: ({ t }) => <Bodega t={t} headlights={kf(t, [b4.motor - 0.2, b4.motor, b4.motor + 1.6, b4.motor + 2.2], [0, 1, 1, 0])} />,
    chars: [
      { who: "jefe", x: 540, y: 1480, acts: [{ t: 0, pose: "sit" }, { t: b4.motor + 0.3, pose: "stand" }, { t: b4.palido, expr: "surprise" }, { t: b4.sabe - 0.2, say: "Ya sabe que viniste. No le abras a nadie." }, { t: b4.abras, pose: "cower", dur: 2 }] },
      { who: "prota", x: 1050, y: 1480, facing: -1, acts: [{ t: b4.motor, face: 1 }, { t: b4.motor, expr: "surprise" }, { t: b4.sabe, face: -1 }] },
    ],
    sfx: [{ t: b4.motor, s: "whoosh", v: 0.7 }],
    shake: [[b4.motor, 0.6, 0.3]],
    overlay: () => <Dark a={0.4} />,
  },
  mic1: {
    bg: ({ t }) => <Garage t={t} car tarp={1} door={0} />,
    chars: [
      { who: "prota", x: 700, y: 1480, acts: [{ t: m1.licenciada, pose: "hold", dur: 3.5 }, { t: 0, expr: "focus" }] },
      { who: "flaco", x: 1050, y: 1480, facing: -1, acts: [{ t: m1.pega, pose: "hold", dur: 2 }, { t: m1.tiemblan, expr: "sadness" }, { t: m1.tiemblan, rot: 3, dur: 0.15 }, { t: m1.tiemblan + 0.2, rot: -3, dur: 0.15 }, { t: m1.tiemblan + 0.4, rot: 0, dur: 0.15 }, { t: m1.sale - 0.3, say: "Si sale mal… ¿quién le avisa a mi mamá?" }] },
    ],
    sfx: [{ t: m1.licenciada, s: "chime", v: 0.5 }],
    overlay: ({ t }) => (
      <>
        <Chapter t={t} n="4" title="El micrófono" t0={0} />
        <Phone k={kIn(t, m1.licenciada - 0.2, m1.pega)} side="left">
          <div style={{ padding: 20, fontWeight: 700, fontSize: 30, color: "#1b1b2f" }}>💬 Licenciada</div>
          <Msg text="Hagan la cita. El joven lleva micrófono." k={kf(t, [m1.cita - 0.4, m1.cita], [0, 1])} />
          <Msg text="Nosotros escuchamos desde afuera." k={kf(t, [m1.cita + 0.8, m1.cita + 1.1], [0, 1])} />
        </Phone>
        <Dark />
      </>
    ),
  },
  mic2: {
    bg: ({ t }) => <Garage t={t} car tarp={1} door={kf(t, [m2.guero - 0.8, m2.guero], [0, 1])} boots={kf(t, [m2.botas - 0.2, m2.botas + 0.2], [0, 1])} />,
    chars: [
      { who: "prota", x: 300, y: 1480, acts: [{ t: m2.nunca, expr: "sadness" }, { t: m2.pasos, expr: "surprise" }, { t: m2.pasos, face: 1 }] },
      { who: "flaco", x: 560, y: 1480, acts: [{ t: 0, expr: "sadness" }, { t: m2.pasos, pose: "cower", dur: 3 }] },
      { who: "guero", x: 1700, y: 1480, facing: -1, acts: [{ t: m2.guero - 0.6, walk: 1100, dur: 1 }, { t: 0, expr: "focus" }] },
    ],
    sfx: [{ t: m2.pasos, s: "knock", v: 0.5 }, { t: m2.guero, s: "boom", v: 0.8 }],
    overlay: ({ t }) => (
      <>
        <Banner t={t} text="Viernes · 11:00 PM" t0={0.2} t1={2.2} color="#c8d0ff" />
        <BigText t={t} t0={m2.guero} t1={D("mic2") + 0.2} text="EL GÜERO 😶" />
        <Dark a={0.35} />
      </>
    ),
  },
  mic3: {
    bg: ({ t }) => <Garage t={t} car tarp={1} door={1} />,
    chars: [
      { who: "prota", x: 300, y: 1480, acts: [{ t: 0, expr: "surprise" }] },
      { who: "flaco", x: 560, y: 1480, acts: [{ t: 0, expr: "sadness" }] },
      { who: "guero", x: 1100, y: 1480, facing: -1, acts: [{ t: m3.llaves, pose: "hold", dur: 1.5 }, { t: m3.jefe - 0.2, say: "El jefe no va a venir. Ya no hay jefe." }, { t: 0, expr: "joy" }] },
    ],
    sfx: [{ t: m3.llaves, s: "chime", v: 0.4 }, { t: m3.ya, s: "boom", v: 0.6 }],
    overlay: ({ t }) => (
      <>
        <BigText t={t} t0={m3.ya} t1={D("mic3") + 0.2} text={"YA NO\nHAY JEFE"} size={150} color="#ff5a5a" />
        <Dark a={0.3} />
      </>
    ),
  },
  mic4: {
    bg: ({ t }) => <Garage t={t} car tarp={1} door={1} />,
    chars: [
      { who: "prota", x: 300, y: 1480, acts: [{ t: m4.microfono, expr: "surprise" }] },
      { who: "flaco", x: 560, y: 1480, acts: [{ t: m4.helado, expr: "surprise" }, { t: m4.pecho, pose: "cower", dur: 3 }] },
      { who: "guero", x: 1100, y: 1480, facing: -1, acts: [{ t: m4.acerca, walk: 760, dur: 1.4 }, { t: m4.pecho, pose: "point", dur: 1.5 }, { t: m4.microfono - 0.2, say: "Ese micrófono no está conectado a nada, flaco." }, { t: m4.quien, say: "¿A quién crees que le llevaron la libreta?" }, { t: 0, expr: "joy" }] },
    ],
    sfx: [{ t: m4.pecho, s: "pop", v: 0.5 }, { t: m4.quien, s: "boom", v: 0.7 }],
    shake: [[m4.quien, 0.4, 0.4]],
    overlay: () => <Dark a={0.3} />,
  },
  mapa1: {
    bg: ({ t }) => <Garage t={t} car tarp={0} door={1} tarpFloor />,
    chars: [
      { who: "prota", x: 900, y: 1480, facing: -1, acts: [{ t: p1.mapa, expr: "surprise" }, { t: p1.mama, expr: "sadness" }] },
      { who: "guero", x: 520, y: 1480, acts: [{ t: p1.cofre, pose: "sit", dur: 2 }, { t: p1.quieres - 0.2, say: "¿Quieres ver para quién trabajas?" }, { t: 0, expr: "joy" }] },
    ],
    sfx: [{ t: p1.mapa, s: "whoosh", v: 0.5 }, { t: p1.miles, s: "boom", v: 0.7 }, { t: p1.mama, s: "boom", v: 0.5 }],
    overlay: ({ t }) => (
      <>
        <Chapter t={t} n="5" title="Bienvenido" t0={0} />
        <MapaCocheras
          t={t}
          k={kIn(t, p1.mapa - 0.2, D("mapa1") + 0.3)}
          dots={Math.round(kf(t, [p1.mapa, p1.cientos, p1.desliza, p1.miles], [6, 120, 160, 900]))}
          zoom={kf(t, [p1.mapa, p1.desliza, p1.miles], [2.4, 1.8, 1])}
          hl={t > p1.mama - 0.3 ? "Hermosillo" : t > p1.hermosillo ? "Hermosillo" : t > p1.ensenada ? "Ensenada" : t > p1.mexicali ? "Mexicali" : "Tijuana"}
          label={t > p1.miles ? "🔴 MILES DE COCHERAS" : "🔴 COCHERAS"}
        />
        <BigText t={t} t0={p1.mama} t1={D("mapa1") + 0.2} text="…donde vive tu mamá" size={90} color="#ff5a5a" />
      </>
    ),
  },
  mapa2: {
    bg: ({ t }) => <Garage t={t} car tarp={0} door={1} tarpFloor />,
    chars: [
      { who: "prota", x: 900, y: 1480, facing: -1, acts: [{ t: p2.licenciada - 0.3, say: "¿Y la licenciada?" }, { t: p2.cobra, expr: "surprise" }] },
      { who: "guero", x: 520, y: 1480, acts: [{ t: p2.abajo - 0.3, say: "El jefe era uno de abajo. Yo también." }, { t: p2.arriba, pose: "pointUp", dur: 2 }, { t: p2.cobra - 0.3, say: "Ella también cobra los viernes." }, { t: 0, expr: "joy" }] },
    ],
    sfx: [{ t: p2.cobra, s: "boom", v: 0.6 }],
    overlay: ({ t }) => (
      <>
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 80, pointerEvents: "none" }}>
          {["❓", "👤 👤 👤", "🤵 EL GÜERO", "😰 EL JEFE", "🙂 TÚ"].map((r, i) => (
            <div key={i} style={{ fontFamily: FONT, fontWeight: 700, fontSize: 46, color: "#fff", background: i === 0 ? "#000" : "rgba(200,40,50,0.85)", borderRadius: 16, padding: "4px 24px", margin: 6, opacity: kf(t, [p2.arriba + (4 - i) * 0.25, p2.arriba + (4 - i) * 0.25 + 0.3, p2.licenciada, p2.licenciada + 0.3], [0, 1, 1, 0]) }}>
              {r}
            </div>
          ))}
        </AbsoluteFill>
        <Dark a={0.25} />
      </>
    ),
  },
  traicion: {
    bg: ({ t }) => <Garage t={t} car tarp={0} door={1} tarpFloor />,
    chars: [
      { who: "prota", x: 700, y: 1480, acts: [{ t: tr.llamas, pose: "hold", dur: 3.5 }, { t: tr.denuncia, expr: "surprise" }, { t: tr.levantas, face: -1 }, { t: tr.celular, expr: "sadness" }] },
      { who: "flaco", x: 1100, y: 1480, facing: -1, acts: [{ t: 0, expr: "sadness" }, { t: tr.levantas - 0.4, show: false }] },
      { who: "guero", x: 300, y: 1480, acts: [{ t: 0, expr: "joy" }] },
    ],
    sfx: [{ t: tr.denuncia, s: "boom", v: 0.6 }, { t: tr.levantas, s: "whoosh", v: 0.5 }],
    overlay: ({ t }) => (
      <>
        <Phone k={kIn(t, tr.llamas - 0.2, tr.levantas - 0.2)} side="right">
          <div style={{ padding: 20, fontWeight: 700, fontSize: 30, color: "#1b1b2f" }}>📞 Fiscalía</div>
          <Msg text="No hay ninguna denuncia registrada con ese nombre." k={kf(t, [tr.denuncia - 0.4, tr.denuncia], [0, 1])} />
        </Phone>
        <Flash t={t} at={tr.levantas - 0.4} dur={0.3} color="#000" />
        <Banner t={t} text="El flaco desapareció" t0={tr.celular - 0.4} t1={D("traicion")} color="#ffb0b0" />
        <Dark a={0.35} />
      </>
    ),
  },
  deuda: {
    bg: ({ t }) => <Garage t={t} car tarp={0} door={1} tarpFloor />,
    chars: [
      { who: "prota", x: 800, y: 1480, facing: -1, acts: [{ t: de.avienta + 0.3, pose: "hold", dur: 1.5 }, { t: de.noventa, expr: "surprise" }, { t: de.consigues, expr: "sadness" }] },
      { who: "guero", x: 400, y: 1480, acts: [{ t: de.avienta, pose: "point", dur: 0.6 }, { t: de.sabes - 0.2, say: "Le debes 90 mil al banco." }, { t: de.pagas - 0.2, say: "O los pagas tú… o te consigues una cochera." }, { t: de.camina, walk: 1800, dur: 2.2 }, { t: 0, expr: "joy" }] },
    ],
    sfx: [{ t: de.avienta, s: "chime", v: 0.5 }, { t: de.noventa, s: "boom", v: 0.5 }],
    overlay: ({ t }) => (
      <>
        <BigText t={t} t0={de.noventa} t1={de.pagas} text="DEUDA: $90,000 💸" size={110} color="#ff5a5a" />
        <Dark a={0.3} />
      </>
    ),
  },
  nuevo1: {
    bg: ({ t }) => <Garage t={t} night={false} car tarp={1} door={0.4} />,
    chars: [{ who: "prota", x: 800, y: 1480, acts: [{ t: 0, expr: "joy" }, { t: nu1.viernes, pose: "cheer", dur: 1.2 }, { t: nu1.libreta, pose: "hold", dur: 3 }, { t: nu1.letra, expr: "focus" }] }],
    sfx: [{ t: nu1.viernes, s: "chime", v: 0.5 }],
    overlay: ({ t }) => (
      <>
        <Banner t={t} text="2 semanas después" t0={0.1} t1={1.8} color="#fff" />
        <Banner t={t} text="$200 cada viernes 💵 · Renta al día ✅" t0={nu1.viernes - 0.2} t1={nu1.libreta - 0.4} color="#bfffb0" />
        <Paper k={kIn(t, nu1.libreta - 0.2, D("nuevo1") + 0.3)} title="LIBRETA" lines={LIBRETA} highlight={3} />
      </>
    ),
  },
  nuevo2: {
    bg: ({ t }) => <Colonia t={t} note />,
    chars: [
      { who: "vecina", x: -60, y: 1480, acts: [{ t: nu2.muda - 0.6, walk: 120, dur: 1.2 }, { t: nu2.ninos, pose: "hold", dur: 2 }, { t: nu2.nota, expr: "sadness" }, { t: nu2.oye, face: 1 }, { t: nu2.oye, expr: "neutral" }] },
      { who: "prota", x: 1200, y: 1480, facing: -1, acts: [{ t: nu2.cruzas, walk: 500, dur: 1.6 }, { t: 0, expr: "joy" }, { t: nu2.oye - 0.2, say: "Oye… ¿tu cochera está vacía?" }] },
    ],
    sfx: [{ t: nu2.oye, s: "boom", v: 0.5 }],
    overlay: ({ t }) => <Banner t={t} text="Se muda alguien a la casa del flaco…" t0={nu2.muda} t1={nu2.nota} color="#ffe6a0" />,
  },
  final: {
    bg: ({ t }) => (t < fi.mapa - 0.3 ? <Colonia t={t} note /> : <Colonia t={t} night note />),
    chars: [
      { who: "vecina", x: 120, y: 1480, acts: [{ t: fi.sonrie, expr: "joy" }, { t: fi.sonrie, say: "Sí… no tengo carro." }, { t: fi.mapa - 0.3, show: false }] },
      { who: "prota", x: 500, y: 1480, facing: -1, acts: [{ t: 0, expr: "joy" }, { t: fi.mapa - 0.3, move: { x: 900 }, dur: 0.01 }, { t: fi.mapa - 0.3, face: 1 }, { t: fi.pies, expr: "focus" }] },
    ],
    sfx: [{ t: fi.nuevo, s: "pop", v: 0.6 }, { t: fi.bienvenido, s: "boom", v: 0.8 }, { t: fi.botas, s: "boom", v: 0.6 }],
    overlay: ({ t }) => (
      <>
        <Flash t={t} at={fi.mapa - 0.3} dur={0.4} color="#000" />
        <MapaCocheras t={t} k={kIn(t, fi.mapa, fi.pies - 0.2)} dots={900} zoom={2.4} newDot={kf(t, [fi.nuevo, fi.nuevo + 0.6], [0, 1])} label="🔴 +1" hl="Tijuana" />
        <BigText t={t} t0={fi.bienvenido} t1={fi.pies - 0.2} text={"BIENVENIDO\nA LA FAMILIA"} size={130} color="#ff5a5a" />
        <BigText t={t} t0={fi.botas} t1={fi.comentarios} text="🥾🥾" size={240} />
        <Banner t={t} text="¿Tú qué hubieras hecho? 👇" t0={fi.comentarios} t1={D("final")} color="#ffe14d" />
        <Dark a={0.3} />
      </>
    ),
  },
};

for (const sc of Object.values(scenes)) {
  const Bg = sc.bg;
  sc.bg = ({ t }) => (
    <div style={{ position: "absolute", inset: 0, filter: "saturate(1.15) contrast(1.06)", translate: `${Math.sin(t * 0.25) * 18}px ${Math.cos(t * 0.2) * 6}px`, scale: "1.04" }}>
      <Bg t={t} />
    </div>
  );
}

export const gu2: PartSpec = { part: 0, title: "Los 200 dólares · Temporada 2", badge: "TEMPORADA 2", ctaTitle: "Sígueme para la temporada 3", cta: "¡Suscríbete! ➜", dyn: true, scenes };
export const gu2Audio = audio;
