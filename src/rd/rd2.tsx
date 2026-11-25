import React from "react";
import { AbsoluteFill } from "remotion";
import { PartSpec, SceneSpec, CharTrack } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { FONT } from "../lib/font";
import { Banner, Flash, wordClock } from "../scenes/util";
import { ArmyBase, Backyard, DiningRoom, DinnerTable, Kitchen, Msg, Paper, Phone } from "./world";
import audioData from "../data/rd2.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);
const D = (id: string) => (audio.scenes.find((s) => s.id === id)?.dur ?? 300) / 30;

const ROOM = ({ t }: { t: number }) => <DiningRoom t={t} />;
const TABLE = (o: { pie?: boolean; napkin?: boolean; envelope?: boolean; turkey?: number } = {}) => ({ t }: { t: number }) => <DinnerTable t={t} {...o} />;
const kIn = (t: number, a: number, b: number) => kf(t, [a, a + 0.35, b - 0.3, b], [0, 1, 1, 0]);

/** Familia sentada a la mesa (de izquierda a derecha). */
const FAM = (o: Partial<Record<"papa" | "mama" | "yo" | "dani", Partial<CharTrack>>> = {}): CharTrack[] => [
  { who: "papa", x: 40, y: 1480, ...o.papa },
  { who: "mama", x: 290, y: 1480, ...o.mama },
  { who: "yo", x: 790, y: 1480, facing: -1, ...o.yo },
  { who: "dani", x: 1040, y: 1480, facing: -1, ...o.dani },
];

/** Cartel grande de capítulo. */
const Chapter: React.FC<{ t: number; n: string; title: string; t0?: number }> = ({ t, n, title, t0 = 0.1 }) => {
  const k = kf(t, [t0, t0 + 0.3, t0 + 2.3, t0 + 2.7], [0, 1, 1, 0]);
  if (k <= 0) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", background: `rgba(10,10,20,${0.55 * k})` }}>
      <div style={{ scale: String(0.7 + 0.3 * k), opacity: k, textAlign: "center", fontFamily: FONT, fontWeight: 700 }}>
        <div style={{ fontSize: 44, color: "#ffe14d", letterSpacing: 6 }}>CAPÍTULO {n}</div>
        <div style={{ fontSize: 110, color: "#fff", textShadow: "0 8px 0 #000" }}>{title}</div>
      </div>
    </AbsoluteFill>
  );
};

/** Texto enorme en el centro (cifras, golpes). */
const BigText: React.FC<{ t: number; t0: number; t1: number; text: string; color?: string }> = ({ t, t0, t1, text, color = "#ffe14d" }) => {
  const k = kIn(t, t0, t1);
  if (k <= 0) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 200, color, WebkitTextStroke: "14px #1b1b2f", paintOrder: "stroke fill", scale: String(0.5 + 0.5 * k), opacity: k, rotate: "-4deg" }}>{text}</div>
    </AbsoluteFill>
  );
};

/** Tabla de rangos dentro del celular, con el dedo que va subiendo. */
const Ranks: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const R = ["E1 · Soldado raso", "E2 · Soldado", "E3 · Soldado de primera", "E4 · Cabo", "E5 · Sargento"];
  const pos = kf(t, [t0 + 0.8, t0 + 2.2, t0 + 5.5], [0, 0, 4]);
  return (
    <div style={{ padding: "30px 24px" }}>
      <div style={{ fontSize: 34, fontWeight: 700, color: "#1b1b2f", marginBottom: 16 }}>Rangos militares</div>
      {[...R].reverse().map((r, i) => {
        const idx = 4 - i;
        const on = Math.round(pos) === idx;
        return (
          <div key={r} style={{ display: "flex", alignItems: "center", margin: "14px 0", padding: "18px 16px", borderRadius: 18, background: on ? "#ffe14d" : idx === 0 ? "#ffd0d0" : idx === 4 ? "#d0ffd8" : "#e8ecf4", fontSize: 30, fontWeight: 700, color: "#1b1b2f" }}>
            <span style={{ flex: 1 }}>{r}</span>
            {idx === 0 ? <span>👈 Dani</span> : null}
            {idx === 4 ? <span>👈 Yo</span> : null}
            {on ? <span style={{ fontSize: 44, marginLeft: 8 }}>☝️</span> : null}
          </div>
        );
      })}
    </div>
  );
};

/** App del banco. */
const Bank: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const L = [
    ["Deudas viejas", "-$1.600"],
    ["Ropa nueva", "-$520"],
    ["Fiesta con amigos", "-$380"],
    ["Compras varias", "-$2.182"],
    ["📚 Libros", "-$118"],
  ];
  return (
    <div style={{ padding: "30px 24px" }}>
      <div style={{ fontSize: 30, fontWeight: 700, color: "#fff", background: "#2a8a5a", margin: "-30px -24px 20px", padding: "30px 24px" }}>Banco · Cuenta de Dani</div>
      {L.map(([a, b], i) => {
        const k = kf(t, [t0 + 1 + i * 0.9, t0 + 1.3 + i * 0.9], [0, 1]);
        return (
          <div key={a} style={{ display: "flex", justifyContent: "space-between", padding: "20px 8px", borderBottom: "2px solid #dde", fontSize: 32, fontWeight: 700, opacity: k, translate: `${(1 - k) * 60}px 0`, background: i === 4 && k > 0.9 ? "#ffe14d" : undefined, borderRadius: 10 }}>
            <span>{a}</span>
            <span style={{ color: "#c0392b" }}>{b}</span>
          </div>
        );
      })}
    </div>
  );
};

/** Servilleta con el plan de pagos. */
const Napkin: React.FC<{ t: number; t0: number; t1: number }> = ({ t, t0, t1 }) => {
  const k = kIn(t, t0, t1);
  if (k <= 0) return null;
  const k2 = kf(t, [t0 + 2, t0 + 2.6], [0, 1]);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ width: 640, height: 560, background: "#fffaf0", border: "6px solid #1b1b2f", rotate: "3deg", translate: `0 ${(1 - k) * 800}px`, fontFamily: FONT, fontWeight: 700, padding: 40, boxShadow: "0 30px 60px rgba(0,0,0,0.4)", backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0 10px, transparent 10px 20px)" }}>
        <div style={{ fontSize: 90, color: "#c0392b" }}>$4.800</div>
        <div style={{ fontSize: 34, color: "#5a5a6a" }}>(el techo 🏠)</div>
        <div style={{ opacity: k2, marginTop: 30 }}>
          <div style={{ fontSize: 60, color: "#2a3a7a" }}>$200 x 24 meses</div>
          <div style={{ fontSize: 34, color: "#1b1b2f", marginTop: 10 }}>Primer pago: 1° de diciembre</div>
          <div style={{ fontSize: 44, color: "#1b1b2f", marginTop: 20, fontStyle: "italic" }}>— Dani ✍️</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// palabras clave para sincronizar
const g = { hermano: w("gancho", "hermano"), rango: w("gancho", "rango"), cena: w("gancho", "cena"), aprendio: w("gancho", "aprendio") };
const it = { volvio: w("intro", "volvio"), guerra: w("intro", "guerra"), senor: w("intro", "senor"), reir: w("intro", "reir"), rangos: w("intro", "rangos") };
const ri = { dani: w("rivalidad", "dani"), perder: w("rivalidad", "perder"), carreras: w("rivalidad", "carreras"), ejercito: w("rivalidad", "ejercito"), verdad: w("rivalidad", "verdad") };
const na = { instituto: w("nada", "instituto"), deposito: w("nada", "deposito"), cabo: w("nada", "cabo") };
const cc = { cargo: w("cena_cabo", "cargo"), tenedor: w("cena_cabo", "tenedor"), plan: w("cena_cabo", "plan") };
const ll = { firme: w("llamada", "firme"), oficial: w("llamada", "oficial"), titulo: w("llamada", "titulo"), primero: w("llamada", "primero"), corto: w("llamada", "corto") };
const ma = { mensajes: w("mama", "mensajes"), navidad: w("mama", "navidad"), imposible: w("mama", "imposible"), pulgar: w("mama", "pulgar"), lei: w("mama", "lei") };
const lg = { uniforme: w("llega", "uniforme"), raso: w("llega", "raso"), abrazo: w("llega", "abrazo"), senor: w("llega", "senor") };
const rg = { sargento: w("rango", "sargento"), rango: w("rango", "rango", 1), marine: w("rango", "marine"), ahoga: w("rango", "ahoga") };
const tb = { celular: w("tabla", "celular"), raso: w("tabla", "raso"), sargento: w("tabla", "sargento"), cuenta: w("tabla", "cuenta"), mal: w("tabla", "mal") };
const pr = { vaso: w("papa_rie", "vaso"), duro: w("papa_rie", "duro"), reir: w("papa_rie", "reir"), sargento: w("papa_rie", "sargento"), senor: w("papa_rie", "senor") };
const so = { equivoque: w("sobre", "equivoque"), sobre: w("sobre", "sobre", 1), documentacion: w("sobre", "documentacion"), senor: w("sobre", "senor") };
const ca = { anteojos: w("carta", "anteojos"), folleto: w("carta", "folleto"), elegido: w("carta", "elegido"), requisito: w("carta", "requisito") };
const inf = { piloto: w("info", "piloto"), rio: w("info", "rio"), tomate: w("info", "tomate") };
const di = { seria: w("dinero", "seria"), programa: w("dinero", "programa"), plata: w("dinero", "plata"), cifra: w("dinero", "cifra"), silencio: w("dinero", "silencio") };
const ba = { carta: w("banco", "carta"), mostrame: w("banco", "mostrame"), aplicacion: w("banco", "aplicacion"), libros: w("banco", "libros"), ciento: w("banco", "ciento") };
const pq = { golpeo: w("porque", "golpeo"), impresionarlos: w("porque", "impresionarlos"), vecino: w("porque", "vecino"), extraordinario: w("porque", "extraordinario") };
const pt = { servilleta: w("prestamo", "servilleta"), techo: w("prestamo", "techo"), senalo: w("prestamo", "senalo"), prestamo: w("prestamo", "prestamo"), senor: w("prestamo", "senor") };
const pe = { harto: w("pelea", "harto"), levante: w("pelea", "levante"), sientense: w("pelea", "sientense") };
const er = { perfecto: w("error", "perfecto"), tarea: w("error", "tarea"), pesima: w("error", "pesima"), ascendieron: w("error", "ascendieron"), escuchar: w("error", "escuchar") };
const pl = { uniforme: w("plan", "uniforme"), lapicera: w("plan", "lapicera"), doscientos: w("plan", "doscientos"), servilleta: w("plan", "servilleta"), orgullosa: w("plan", "orgullosa") };
const po = { tarta: w("postre", "tarta"), admitis: w("postre", "admitis"), tenedor: w("postre", "tenedor"), victoria: w("postre", "victoria") };
const pa = { cocina: w("platos", "cocina"), esponja: w("platos", "esponja"), agua: w("platos", "agua"), puerta: w("platos", "puerta"), senora: w("platos", "senora"), superior: w("platos", "superior") };
const ci = { reddit: w("cierre", "reddit"), like: w("cierre", "like") };

const scenes: Record<string, SceneSpec> = {
  gancho: {
    bg: ROOM,
    fx: TABLE(),
    chars: FAM({
      dani: { x: 1700, acts: [{ t: 0.3, walk: 1040, dur: 1.6 }, { t: g.rango, pose: "crossed", dur: 3 }, { t: 0, expr: "joy" }, { t: g.aprendio, expr: "surprise" }] },
      yo: { acts: [{ t: g.cena, expr: "focus" }, { t: g.aprendio, expr: "joy" }] },
      mama: { acts: [{ t: 0, expr: "joy" }] },
      papa: { acts: [{ t: g.aprendio, expr: "joy" }] },
    }),
    sfx: [{ t: 0.3, s: "knock", v: 0.5 }, { t: g.rango, s: "boom", v: 0.4 }, { t: g.aprendio, s: "pop", v: 0.5 }],
    overlay: ({ t }) => <BigText t={t} t0={g.hermano} t1={g.rango} text="🎖️ VS 🎖️" color="#ffffff" />,
  },
  intro: {
    bg: ROOM,
    fx: TABLE(),
    chars: FAM({
      dani: { x: 1700, acts: [{ t: it.volvio, walk: 1040, dur: 1.4 }, { t: it.guerra, pose: "armsUp", dur: 1.2 }, { t: it.senor, say: "Desde ahora, me tenés que decir SEÑOR." }, { t: it.senor, pose: "point", dur: 2 }, { t: it.reir, expr: "anger" }] },
      yo: { acts: [{ t: it.senor, expr: "surprise" }, { t: it.reir, expr: "joy" }, { t: it.reir, pose: "cheer", dur: 1.5 }] },
      papa: { acts: [{ t: it.reir, expr: "joy" }] },
    }),
    sfx: [{ t: it.senor, s: "boom", v: 0.4 }, { t: it.reir, s: "cheer", v: 0.3 }],
    overlay: ({ t }) => <Banner t={t} text="Él: soldado raso (E1) · Yo: sargento (E5)" t0={it.rangos - 0.2} t1={it.rangos + 2.4} color="#ffe14d" />,
  },
  rivalidad: {
    bg: ({ t }) => <Backyard t={t} />,
    chars: [
      { who: "yo", x: 200, y: 1480, s: 1.2, name: true, acts: [{ t: ri.carreras, walk: 900, dur: 1.4, run: true }, { t: ri.carreras + 1.5, expr: "joy" }, { t: ri.ejercito, walk: 400, dur: 1 }] },
      { who: "dani", x: 60, y: 1480, s: 1.05, name: true, acts: [{ t: ri.perder, expr: "anger" }, { t: ri.carreras + 0.2, walk: 780, dur: 1.5, run: true }, { t: ri.carreras + 1.7, expr: "anger" }, { t: ri.carreras + 1.7, pose: "angry", dur: 1.4 }, { t: ri.verdad, pose: "crossed", dur: 2 }, { t: ri.verdad, say: "Yo voy a hacer algo de VERDAD." }] },
    ],
    sfx: [{ t: ri.carreras, s: "step", v: 0.6 }, { t: ri.carreras + 1.6, s: "pop", v: 0.5 }],
    overlay: ({ t }) => <Chapter t={t} n="1" title="La rivalidad" />,
  },
  nada: {
    bg: ({ t }) => <ArmyBase t={t} />,
    chars: [
      { who: "yo", x: -200, y: 1480, acts: [{ t: 0, walk: 500, dur: 2.5 }, { t: na.cabo, expr: "joy" }, { t: na.cabo, pose: "armsUp", dur: 1.2 }] },
      { who: "soldado", x: 900, y: 1480, facing: -1, name: false, acts: [{ t: na.cabo, pose: "wave", dur: 1.4 }] },
    ],
    sfx: [{ t: na.cabo, s: "fanfare", v: 0.5 }],
    overlay: ({ t }) => (
      <>
        <Banner t={t} text="Dani: instituto ❌ · depósito ❌" t0={na.instituto - 0.2} t1={na.cabo - 0.4} color="#ffb0b0" />
        <Banner t={t} text="Yo: ¡CABO! 🎖️" t0={na.cabo - 0.2} t1={na.cabo + 2.2} color="#bfffb0" />
      </>
    ),
  },
  cena_cabo: {
    bg: ROOM,
    fx: TABLE(),
    chars: FAM({
      yo: { acts: [{ t: cc.cargo - 0.6, say: "Ahora tengo soldados a mi cargo." }, { t: cc.cargo, expr: "joy" }] },
      dani: { acts: [{ t: cc.tenedor, expr: "focus" }, { t: cc.tenedor, pose: "think", dur: 3 }] },
      papa: { acts: [{ t: cc.cargo, expr: "joy" }] },
      mama: { acts: [{ t: cc.cargo, expr: "joy" }] },
    }),
    sfx: [{ t: cc.tenedor, s: "pop", v: 0.4 }, { t: cc.plan, s: "zap", v: 0.4 }],
    overlay: ({ t }) => <BigText t={t} t0={cc.plan - 0.2} t1={cc.plan + 1.6} text="🤔💡" color="#fff" />,
  },
  llamada: {
    bg: ({ t }) => <ArmyBase t={t} />,
    chars: [{ who: "yo", x: 380, y: 1480, acts: [{ t: 0, pose: "hold", dur: 99 }, { t: ll.oficial, expr: "surprise" }, { t: ll.corto, expr: "sadness" }] }],
    overlay: ({ t }) => (
      <Phone k={kf(t, [0.2, 0.6, D("llamada") - 0.5, D("llamada")], [0, 1, 1, 0])}>
        <div style={{ padding: "26px 20px 6px", fontSize: 30, fontWeight: 700, borderBottom: "2px solid #dde" }}>Dani 🎖️</div>
        <Msg text="Ya firmé. Me voy a los Marines 💪" k={kf(t, [ll.firme - 0.3, ll.firme], [0, 1])} />
        <Msg text="Y voy a ser OFICIAL 😎" k={kf(t, [ll.oficial - 0.3, ll.oficial], [0, 1])} />
        <Msg me text="Dani, para ser oficial necesitás título universitario" k={kf(t, [ll.titulo - 0.3, ll.titulo], [0, 1])} />
        <Msg text="Primero entro, después saco el título y te paso por arriba" k={kf(t, [ll.primero - 0.3, ll.primero], [0, 1])} />
      </Phone>
    ),
    sfx: [{ t: ll.firme, s: "pop", v: 0.4 }, { t: ll.oficial, s: "pop", v: 0.4 }, { t: ll.titulo, s: "pop", v: 0.4 }, { t: ll.primero, s: "pop", v: 0.4 }],
  },
  mama: {
    bg: ({ t }) => <ArmyBase t={t} />,
    chars: [{ who: "yo", x: 380, y: 1480, acts: [{ t: 0, pose: "hold", dur: 99 }, { t: ma.imposible, expr: "anger" }, { t: ma.lei, expr: "surprise" }] }],
    overlay: ({ t }) => (
      <Phone k={kf(t, [0.2, 0.6, D("mama") - 0.5, D("mama")], [0, 1, 1, 0])}>
        <div style={{ padding: "26px 20px 6px", fontSize: 30, fontWeight: 700, borderBottom: "2px solid #dde" }}>Mamá ❤️</div>
        <Msg text="Dani dice que para Navidad va a ser tu superior 😊" k={kf(t, [ma.navidad - 0.3, ma.navidad], [0, 1])} />
        <Msg me text="Mamá, eso es IMPOSIBLE" k={kf(t, [ma.imposible - 0.3, ma.imposible], [0, 1])} />
        <Msg text="👍" emoji k={kf(t, [ma.pulgar - 0.3, ma.pulgar], [0, 1])} />
      </Phone>
    ),
    sfx: [{ t: ma.navidad, s: "pop", v: 0.4 }, { t: ma.imposible, s: "pop", v: 0.4 }, { t: ma.pulgar, s: "pop", v: 0.6 }],
  },
  llega: {
    bg: ROOM,
    fx: TABLE(),
    chars: FAM({
      dani: { x: 1750, acts: [{ t: lg.uniforme - 0.4, walk: 1040, dur: 1.6 }, { t: lg.abrazo, pose: "wave", dur: 1 }, { t: lg.senor, say: "Ahora me tenés que decir señor." }, { t: lg.senor, pose: "point", dur: 2 }, { t: 0, expr: "joy" }] },
      yo: { acts: [{ t: lg.senor, expr: "surprise" }] },
      mama: { acts: [{ t: lg.abrazo, expr: "joy" }, { t: lg.abrazo, pose: "armsUp", dur: 1 }] },
    }),
    sfx: [{ t: lg.uniforme - 0.4, s: "knock", v: 0.6 }, { t: lg.senor, s: "boom", v: 0.4 }],
    overlay: ({ t }) => (
      <>
        <Chapter t={t} n="2" title="La cena" />
        <Banner t={t} text="Rango de Dani: soldado raso (el más bajo)" t0={lg.raso - 0.2} t1={lg.raso + 2.2} color="#ffd0d0" />
      </>
    ),
  },
  rango: {
    bg: ROOM,
    fx: TABLE(),
    chars: FAM({
      yo: { acts: [{ t: rg.rango - 0.8, say: "Dani, ¿vos sabés qué rango tenés?" }] },
      dani: { acts: [{ t: rg.marine - 0.3, say: "Soy marine." }, { t: rg.marine, pose: "crossed", dur: 2 }] },
      papa: { acts: [{ t: rg.ahoga, expr: "surprise" }, { t: rg.ahoga, pose: "cower", dur: 1 }] },
    }),
    sfx: [{ t: rg.ahoga, s: "splash", v: 0.5 }],
  },
  tabla: {
    bg: ROOM,
    fx: TABLE(),
    chars: FAM({
      yo: { acts: [{ t: tb.celular, pose: "hold", dur: 4 }, { t: tb.sargento, expr: "joy" }] },
      dani: { acts: [{ t: tb.cuenta, expr: "anger" }, { t: tb.mal, say: "Esa tabla está mal. Los marines somos distintos." }] },
    }),
    overlay: ({ t }) => (
      <Phone k={kf(t, [tb.celular, tb.celular + 0.4, tb.cuenta, tb.cuenta + 0.4], [0, 1, 1, 0])} side="center">
        <Ranks t={t} t0={tb.celular} />
      </Phone>
    ),
    sfx: [{ t: tb.celular, s: "whoosh", v: 0.4 }, { t: tb.sargento, s: "chime", v: 0.4 }],
  },
  papa_rie: {
    bg: ROOM,
    fx: TABLE(),
    chars: FAM({
      papa: { acts: [{ t: pr.vaso, say: "¿La tabla está mal?" }, { t: pr.reir, expr: "joy" }, { t: pr.reir, pose: "cheer", dur: 2 }, { t: pr.sargento, say: "Ninguno de los dos es oficial. Dejá de pedirle que te diga señor." }] },
      dani: { acts: [{ t: pr.duro, say: "Si estuviéramos en una base, me tendrías que saludar." }, { t: pr.reir, expr: "anger" }] },
      mama: { acts: [{ t: pr.reir, expr: "surprise" }] },
      yo: { acts: [{ t: pr.reir, expr: "joy" }] },
    }),
    sfx: [{ t: pr.reir, s: "cheer", v: 0.4 }],
  },
  sobre: {
    bg: ROOM,
    fx: ({ t }) => <DinnerTable t={t} envelope={t > so.sobre} />,
    chars: FAM({
      dani: { acts: [{ t: so.sobre - 0.6, pose: "hold", dur: 1.2 }, { t: so.documentacion, say: "Documentación oficial. Ahora sí me van a decir señor." }, { t: 0, expr: "joy" }] },
      yo: { acts: [{ t: so.sobre, expr: "surprise" }] },
      mama: { acts: [{ t: so.sobre, expr: "surprise" }] },
      papa: { acts: [{ t: so.sobre, expr: "focus" }] },
    }),
    sfx: [{ t: so.sobre, s: "paper", v: 0.6 }, { t: so.documentacion, s: "boom", v: 0.3 }],
    overlay: ({ t }) => <Chapter t={t} n="3" title="El sobre" />,
  },
  carta: {
    bg: ROOM,
    fx: TABLE({ envelope: true }),
    chars: FAM({
      papa: { acts: [{ t: ca.anteojos, pose: "hold", dur: 4 }, { t: ca.folleto, expr: "surprise" }, { t: ca.folleto, say: "Daniel… esto es un folleto informativo." }] },
      dani: { acts: [{ t: ca.folleto, expr: "sadness" }] },
    }),
    overlay: ({ t }) => (
      <Paper
        k={kf(t, [ca.anteojos, ca.anteojos + 0.4, D("carta") - 0.6, D("carta")], [0, 1, 1, 0])}
        title="¿Querés ser oficial? Información general"
        lines={["Cómo pedir una comisión de oficial:", "1. Tener un título universitario", "2. Cumplir los requisitos físicos", "3. Presentar la solicitud", "4. Esperar la selección"]}
        highlight={t > ca.requisito ? 1 : undefined}
        stamp={t > ca.elegido ? "SOLO INFORMACIÓN" : undefined}
      />
    ),
    sfx: [{ t: ca.anteojos, s: "paper", v: 0.6 }, { t: ca.requisito, s: "pop", v: 0.4 }],
  },
  info: {
    bg: ROOM,
    fx: TABLE({ envelope: true }),
    chars: FAM({
      yo: { acts: [{ t: 0.2, say: "Leer un folleto de pilotos no te hace piloto." }] },
      mama: { acts: [{ t: inf.rio, expr: "joy" }, { t: inf.rio, pose: "cower", dur: 0.8 }] },
      dani: { acts: [{ t: inf.tomate, expr: "anger" }, { t: inf.tomate, say: "¡Es una etapa preliminar!" }] },
    }),
    sfx: [{ t: inf.rio, s: "pop", v: 0.4 }],
  },
  dinero: {
    bg: ROOM,
    fx: TABLE({ envelope: true }),
    chars: FAM({
      mama: { acts: [{ t: di.seria, expr: "anger" }, { t: di.programa - 0.6, say: "Me dijiste que estabas en un programa especial." }] },
      papa: { acts: [{ t: di.plata - 0.4, say: "¿Le diste plata?" }, { t: di.cifra, expr: "surprise" }] },
      dani: { acts: [{ t: di.cifra, expr: "surprise" }, { t: di.silencio, pose: "cower", dur: 2 }] },
      yo: { acts: [{ t: di.cifra, expr: "surprise" }] },
    }),
    sfx: [{ t: di.cifra, s: "boom", v: 0.7 }],
    overlay: ({ t }) => <BigText t={t} t0={di.cifra} t1={di.cifra + 2.8} text="$4.800" color="#ff6b6b" />,
  },
  banco: {
    bg: ROOM,
    fx: TABLE({ envelope: true }),
    chars: FAM({
      papa: { acts: [{ t: ba.mostrame - 0.2, say: "Mostrame en qué gastaste esa plata." }, { t: 0, expr: "anger" }] },
      dani: { acts: [{ t: ba.aplicacion, pose: "hold", dur: 5 }, { t: 0, expr: "sadness" }] },
      mama: { acts: [{ t: ba.libros - 0.4, say: "¿Y los libros para ser oficial?" }] },
    }),
    overlay: ({ t }) => (
      <Phone k={kf(t, [ba.aplicacion, ba.aplicacion + 0.4, D("banco") - 0.5, D("banco")], [0, 1, 1, 0])} side="center">
        <Bank t={t} t0={ba.aplicacion} />
      </Phone>
    ),
    sfx: [{ t: ba.aplicacion, s: "whoosh", v: 0.4 }, { t: ba.ciento, s: "coins", v: 0.5 }],
  },
  porque: {
    bg: ROOM,
    fx: TABLE({ envelope: true }),
    chars: FAM({
      dani: { acts: [{ t: pq.golpeo, pose: "angry", dur: 1.2 }, { t: pq.golpeo, say: "¡Nadie me toma en serio!" }, { t: pq.vecino, expr: "sadness" }, { t: pq.vecino + 0.4, say: "Te escuché decirle al vecino que por fin tenías un hijo con futuro." }] },
      papa: { acts: [{ t: pq.vecino, expr: "surprise" }] },
    }),
    sfx: [{ t: pq.golpeo, s: "knock", v: 0.7 }],
    shake: [[pq.golpeo, 0.5, 0.4]],
    overlay: ({ t }) => <Chapter t={t} n="4" title="La verdad" />,
  },
  prestamo: {
    bg: ROOM,
    fx: ({ t }) => <DinnerTable t={t} envelope napkin={t > pt.servilleta} />,
    chars: FAM({
      mama: { acts: [{ t: pt.techo - 0.4, say: "Esta plata era para arreglar el techo." }] },
      dani: { acts: [{ t: pt.senalo, pose: "point", dur: 2 }, { t: pt.senalo, say: "Mi plan era pedírsela a él." }] },
      yo: { acts: [{ t: pt.senalo, expr: "surprise" }, { t: pt.senor - 0.6, say: "¿Me ibas a pedir plata media hora después de exigirme que te diga señor?" }] },
    }),
    sfx: [{ t: pt.senalo, s: "boom", v: 0.5 }],
  },
  pelea: {
    bg: ROOM,
    fx: TABLE({ envelope: true, napkin: true }),
    chars: FAM({
      dani: { acts: [{ t: pe.harto - 0.6, say: "¡Estoy harto de que lo traten como si fuera perfecto!" }, { t: 0, expr: "anger" }, { t: pe.harto, pose: "angry", dur: 1.5 }] },
      yo: { acts: [{ t: pe.levante, expr: "anger" }, { t: pe.levante, pose: "angry", dur: 1.2 }] },
      papa: { acts: [{ t: pe.sientense, say: "Los dos. Siéntense." }, { t: 0, expr: "anger" }, { t: pe.sientense, pose: "point", dur: 1.5 }] },
    }),
    sfx: [{ t: pe.harto, s: "crash", v: 0.4 }, { t: pe.sientense, s: "boom", v: 0.6 }],
    shake: [[pe.sientense, 0.6, 0.5]],
  },
  error: {
    bg: ({ t }) => (t < er.tarea - 0.2 ? <DiningRoom t={t} /> : <ArmyBase t={t} />),
    fx: ({ t }) => (t < er.tarea - 0.2 ? <DinnerTable t={t} envelope napkin /> : null),
    chars: [
      ...FAM({ papa: { acts: [{ t: er.perfecto - 0.4, say: "Tu hermano tampoco fue perfecto. Contale." }, { t: er.tarea - 0.2, show: false }] }, mama: { acts: [{ t: er.tarea - 0.2, show: false }] }, dani: { acts: [{ t: er.tarea - 0.2, show: false }] }, yo: { acts: [{ t: er.tarea - 0.2, show: false }] } }),
      { who: "yo", x: 380, y: 1480, show: false, acts: [{ t: er.tarea - 0.2, show: true }, { t: er.pesima, expr: "sadness" }, { t: er.pesima, pose: "sad", dur: 2 }, { t: er.escuchar, expr: "focus" }] },
      { who: "soldado", x: 800, y: 1480, facing: -1, name: false, show: false, acts: [{ t: er.tarea - 0.2, show: true }, { t: er.pesima, pose: "point", dur: 2 }, { t: er.pesima, say: "Evaluación: PÉSIMA." }, { t: 0, expr: "anger" }] },
    ],
    sfx: [{ t: er.tarea - 0.2, s: "whoosh", v: 0.5 }, { t: er.pesima, s: "boom", v: 0.4 }],
    overlay: ({ t }) => (
      <>
        <Chapter t={t} n="5" title="Mi error" />
        <Flash t={t} at={er.tarea - 0.2} dur={0.3} />
        <Banner t={t} text="El secreto: ESCUCHAR 👂" t0={er.escuchar - 0.2} t1={er.escuchar + 2.4} color="#bfffb0" />
      </>
    ),
  },
  plan: {
    bg: ROOM,
    fx: TABLE({ envelope: true }),
    chars: FAM({
      papa: { acts: [{ t: pl.uniforme - 0.6, say: "Ningún uniforme te hace mejor persona." }] },
      dani: { acts: [{ t: pl.lapicera, pose: "hold", dur: 3 }, { t: pl.doscientos, expr: "focus" }] },
      mama: { acts: [{ t: pl.orgullosa - 0.4, say: "Estaba orgullosa de vos antes de esa carta." }, { t: pl.orgullosa, expr: "joy" }] },
    }),
    overlay: ({ t }) => <Napkin t={t} t0={pl.doscientos - 0.6} t1={pl.orgullosa - 0.6} />,
    sfx: [{ t: pl.doscientos, s: "paper", v: 0.6 }],
  },
  postre: {
    bg: ROOM,
    fx: TABLE({ pie: true, turkey: 0, napkin: true }),
    chars: FAM({
      dani: { acts: [{ t: po.tarta, expr: "joy" }, { t: po.admitis - 0.4, say: "¿Por lo menos admitís que el entrenamiento de los marines es más duro?" }] },
      papa: { acts: [{ t: po.tenedor, expr: "surprise" }, { t: po.victoria - 1.2, say: "Te vas con una deuda en una servilleta. Yo no cantaría victoria." }] },
      mama: { acts: [{ t: po.victoria, expr: "joy" }] },
      yo: { acts: [{ t: po.victoria, expr: "joy" }, { t: po.victoria, pose: "cheer", dur: 1.2 }] },
    }),
    sfx: [{ t: po.tenedor, s: "pop", v: 0.4 }, { t: po.victoria, s: "cheer", v: 0.4 }],
  },
  platos: {
    bg: ({ t }) => <Kitchen t={t} />,
    chars: [
      { who: "dani", x: 460, y: 1480, acts: [{ t: pa.esponja - 0.6, say: "Algún día voy a tener más rango que vos." }, { t: pa.agua, pose: "point", dur: 0.6 }, { t: pa.agua, expr: "joy" }, { t: pa.senora, pose: "wandUp", dur: 1.5 }, { t: pa.senora, say: "¡Sí, señora!" }] },
      { who: "yo", x: 700, y: 1480, facing: -1, acts: [{ t: pa.esponja, say: "Puede ser. Pero primero pagá tus deudas." }, { t: pa.agua + 0.4, pose: "point", dur: 0.6 }, { t: pa.agua, expr: "joy" }, { t: pa.superior, say: "Viste que sí sabés reconocer a un superior." }] },
      { who: "mama", x: 1500, y: 1480, facing: -1, show: false, acts: [{ t: pa.puerta - 0.6, show: true }, { t: pa.puerta - 0.6, walk: 1040, dur: 0.8 }, { t: pa.puerta, say: "¡Si se portan como nenes, limpian TODA la cocina!" }, { t: 0, expr: "anger" }, { t: pa.superior, expr: "joy" }] },
    ],
    sfx: [{ t: pa.agua, s: "splash", v: 0.6 }, { t: pa.agua + 0.5, s: "splash", v: 0.5 }, { t: pa.senora, s: "fanfare", v: 0.4 }],
  },
  cierre: {
    bg: ROOM,
    fx: TABLE({ pie: true, turkey: 0, napkin: true }),
    chars: FAM({ papa: { acts: [{ t: 0.3, pose: "cheer", dur: 2 }, { t: 0, expr: "joy" }] }, mama: { acts: [{ t: 0, expr: "joy" }] }, yo: { acts: [{ t: 0.5, pose: "wave", dur: 2 }, { t: 0, expr: "joy" }] }, dani: { acts: [{ t: 0.4, pose: "wandUp", dur: 2 }, { t: 0, expr: "joy" }] } }),
    overlay: ({ t }) => <Banner t={t} text="Basado en un post de Reddit" t0={ci.reddit - 0.4} t1={ci.like - 0.2} color="#ff9a5a" />,
    sfx: [{ t: ci.like, s: "chime", v: 0.5 }],
  },
};

// color cálido y fondo con leve movimiento
for (const sc of Object.values(scenes)) {
  const Bg = sc.bg;
  sc.bg = ({ t }) => (
    <div style={{ position: "absolute", inset: 0, filter: "saturate(1.2) contrast(1.04)", translate: `${Math.sin(t * 0.25) * 22}px ${Math.cos(t * 0.2) * 8}px`, scale: "1.04" }}>
      <Bg t={t} />
    </div>
  );
}

export const rd2: PartSpec = { part: 0, title: "Mi hermano y los Marines", badge: "HISTORIA REAL", cta: "¡Suscribite! ➜", dyn: true, scenes };
export const rd2Audio = audio;
