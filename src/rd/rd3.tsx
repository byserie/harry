import React from "react";
import { AbsoluteFill } from "remotion";
import { PartSpec, SceneSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { FONT } from "../lib/font";
import { Banner, Flash, wordClock } from "../scenes/util";
import { Backyard, Msg, Phone } from "./world";
import { HotelRoom, JewelryStore, Laundry, LiquorStore, LivingRoom, MexicoBeach, NightStreet2 } from "./world2";
import audioData from "../data/rd3.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);
const D = (id: string) => (audio.scenes.find((s) => s.id === id)?.dur ?? 300) / 30;
const kIn = (t: number, a: number, b: number) => kf(t, [a, a + 0.35, b - 0.3, b], [0, 1, 1, 0]);

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
const BigText: React.FC<{ t: number; t0: number; t1: number; text: string; color?: string; size?: number }> = ({ t, t0, t1, text, color = "#ffe14d", size = 180 }) => {
  const k = kIn(t, t0, t1);
  if (k <= 0) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: size, color, WebkitTextStroke: "14px #1b1b2f", paintOrder: "stroke fill", scale: String(0.5 + 0.5 * k), opacity: k, rotate: "-4deg", textAlign: "center", lineHeight: 1 }}>{text}</div>
    </AbsoluteFill>
  );
};

const g = { ex: w("gancho", "ex"), mama: w("gancho", "mama"), corresponde: w("gancho", "corresponde"), mitad: w("gancho", "mitad"), casa: w("gancho", "casa"), principio: w("gancho", "principio") };
const co = { conoci: w("conocimos", "conoci"), indicada: w("conocimos", "indicada"), amo: w("conocimos", "amo"), siempre: w("conocimos", "siempre") };
const tr = { licoreria: w("trabajo", "licoreria"), apoye: w("trabajo", "apoye"), construccion: w("trabajo", "construccion"), sonabamos: w("trabajo", "sonabamos") };
const ro = { robar: w("robo", "robar"), pina: w("robo", "pina"), cambio: w("robo", "cambio"), auto: w("robo", "auto"), companero: w("robo", "companero"), raro: w("robo", "raro") };
const ru = { comentarios: w("rumores", "comentarios"), amiga: w("rumores", "amiga"), enganando: w("rumores", "enganando"), enfrente: w("rumores", "enfrente"), llorar: w("rumores", "llorar"), crei: w("rumores", "crei") };
const mx = { viaje: w("mexico", "viaje"), avion: w("mexico", "avion"), cuatro: w("mexico", "cuatro"), arrepiento: w("mexico", "arrepiento"), engane: w("mexico", "engane"), vengarme: w("mexico", "vengarme") };
const an = { culpa: w("anillo", "culpa"), joyeria: w("anillo", "joyeria"), casamiento: w("anillo", "casamiento"), si: w("anillo", "dijo") };
const rp = { ano: w("rupturas", "ano"), cuatro: w("rupturas", "cuatro"), tontas: w("rupturas", "tontas") };
const se = { secarropas: w("secarropas", "secarropas"), humeda: w("secarropas", "humeda"), abrio: w("secarropas", "abrio"), furiosa: w("secarropas", "furiosa"), dejo: w("secarropas", "dejo"), destrozado: w("secarropas", "destrozado") };
const va = { hotel: w("valentin", "hotel"), hablar: w("valentin", "hablar"), cansado: w("valentin", "cansado"), razon: w("valentin", "razon"), anillo: w("valentin", "anillo"), tanto: w("valentin", "tanto") };
const ll = { timbre: w("llegada", "timbre"), traido: w("llegada", "traido"), anillo: w("llegada", "anillo"), shampoo: w("llegada", "shampoo"), confundida: w("llegada", "confundida") };
const mi = { pregunte: w("mitad", "pregunte"), deberia: w("mitad", "deberia"), mal: w("mitad", "mal"), comprometidos: w("mitad", "comprometidos"), mitad: w("mitad", "mitad"), reir: w("mitad", "reir"), respeto: w("mitad", "respeto") };
const ma = { acuerdo: w("madre", "acuerdo"), televisor: w("madre", "televisor"), sillon: w("madre", "sillon"), microondas: w("madre", "microondas"), juntos: w("madre", "juntos"), eche: w("madre", "eche") };
const fi = { puerta: w("final", "puerta"), chau: w("final", "chau"), dos: w("final", "dos"), cerre: w("final", "cerre"), balas: w("final", "balas"), reddit: w("final", "reddit") };

const RING = ({ t, t0, t1 }: { t: number; t0: number; t1: number }) => {
  const k = kIn(t, t0, t1);
  if (k <= 0) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ fontSize: 260, scale: String(0.4 + 0.6 * k), opacity: k, rotate: `${Math.sin(t * 3) * 8}deg`, filter: "drop-shadow(0 0 30px #fff3a0)" }}>💍</div>
    </AbsoluteFill>
  );
};

const scenes: Record<string, SceneSpec> = {
  gancho: {
    bg: ({ t }) => <LivingRoom t={t} doorOpen={kf(t, [0.2, 0.8], [0, 1])} pointTV={kf(t, [g.casa, g.casa + 0.3], [0, 1])} pointSofa={kf(t, [g.casa + 0.3, g.casa + 0.6], [0, 1])} />,
    chars: [
      { who: "narr", x: 520, y: 1480, acts: [{ t: g.corresponde, expr: "surprise" }, { t: g.casa, expr: "joy" }, { t: g.casa, pose: "cheer", dur: 1.4 }] },
      { who: "ex", x: 1500, y: 1480, facing: -1, acts: [{ t: 0.3, walk: 880, dur: 1.4 }, { t: g.corresponde - 0.3, say: "¿No me corresponde más? Me toca la MITAD." }, { t: 0, expr: "focus" }] },
      { who: "suegra", x: 1650, y: 1480, facing: -1, acts: [{ t: 0.5, walk: 1100, dur: 1.4 }, { t: g.casa, pose: "point", dur: 1.6 }, { t: 0, expr: "joy" }] },
    ],
    sfx: [{ t: 0.2, s: "knock", v: 0.6 }, { t: g.mitad, s: "boom", v: 0.6 }, { t: g.casa, s: "pop", v: 0.5 }],
    overlay: ({ t }) => <BigText t={t} t0={g.mitad} t1={g.casa + 1.4} text={"¿LA MITAD?! 🤯"} />,
  },
  conocimos: {
    bg: ({ t }) => <Backyard t={t} />,
    fx: ({ t }) => (t > co.amo ? <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}><text x={560} y={kf(t, [co.amo, co.amo + 2], [1000, 820])} textAnchor="middle" fontSize={100} opacity={kf(t, [co.amo, co.amo + 0.4], [0, 1])}>💕</text></svg> : null),
    chars: [
      { who: "narr", x: 380, y: 1480, acts: [{ t: co.conoci, expr: "joy" }, { t: co.amo - 0.3, say: "Te amo." }] },
      { who: "ex", x: 720, y: 1480, facing: -1, acts: [{ t: co.conoci, expr: "joy" }, { t: co.siempre, pose: "wave", dur: 1.2 }] },
    ],
    sfx: [{ t: co.amo, s: "chime", v: 0.5 }],
    overlay: ({ t }) => <Chapter t={t} n="1" title="El primer amor" />,
  },
  trabajo: {
    bg: ({ t }) => <LiquorStore t={t} />,
    chars: [
      { who: "ex", x: 440, y: 1480, acts: [{ t: tr.licoreria, expr: "focus" }, { t: tr.licoreria + 0.6, pose: "hold", dur: 2 }] },
      { who: "narr", x: -250, y: 1480, acts: [{ t: tr.apoye - 0.6, walk: 140, dur: 0.8 }, { t: tr.apoye, say: "¡Te apoyo en todo!" }, { t: tr.apoye, expr: "joy" }, { t: tr.sonabamos, pose: "pointUp", dur: 1.4 }] },
    ],
    sfx: [{ t: tr.licoreria, s: "chime", v: 0.4 }],
    overlay: ({ t }) => <Banner t={t} text="Ahorrar 💵 · Auto 🚗 · Casa propia 🏠" t0={tr.sonabamos - 0.4} t1={tr.sonabamos + 2.4} color="#bfffb0" />,
  },
  robo: {
    bg: ({ t }) => (t < ro.auto - 0.2 ? <LiquorStore t={t} robbed={kf(t, [ro.robar, ro.robar + 0.3, ro.cambio, ro.cambio + 0.4], [0, 1, 1, 0])} /> : <NightStreet2 t={t} carX={kf(t, [ro.companero, D("robo")], [300, 1300])} />),
    chars: [
      { who: "ex", x: 440, y: 1480, acts: [{ t: ro.pina, expr: "surprise" }, { t: ro.pina, rot: -15, dur: 0.2 }, { t: ro.pina + 0.4, rot: 0, dur: 0.4 }, { t: ro.cambio, expr: "sadness" }, { t: ro.auto - 0.2, move: { x: 160 }, dur: 0.01 }, { t: ro.companero, walk: 1300, dur: 2.5 }] },
      { who: "soldado", x: 900, y: 1480, facing: -1, name: false, show: false, mask: true, acts: [{ t: ro.robar - 0.4, show: true }, { t: ro.pina - 0.2, pose: "point", dur: 0.6 }, { t: 0, expr: "anger" }, { t: ro.cambio, show: false }] },
      { who: "companero", x: 20, y: 1480, show: false, acts: [{ t: ro.companero - 0.4, show: true }, { t: ro.companero, walk: 1150, dur: 2.5 }, { t: 0, expr: "joy" }] },
    ],
    sfx: [{ t: ro.robar, s: "crash", v: 0.7 }, { t: ro.pina, s: "boom", v: 0.8 }, { t: ro.auto, s: "whoosh", v: 0.5 }],
    shake: [[ro.pina, 0.7, 0.5]],
    overlay: ({ t }) => <Flash t={t} at={ro.auto - 0.2} dur={0.3} color="#000" />,
  },
  rumores: {
    bg: ({ t }) => <LiquorStore t={t} />,
    chars: [
      { who: "narr", x: 380, y: 1480, acts: [{ t: ru.enganando, expr: "surprise" }, { t: ru.enfrente, expr: "anger" }, { t: ru.enfrente, say: "¿Me estás engañando?" }, { t: ru.crei, expr: "sadness" }] },
      { who: "amigo2", x: 120, y: 1480, name: false, acts: [{ t: ru.comentarios, talk: 1.5 }, { t: ru.enfrente - 0.3, show: false }] },
      { who: "ex", x: 1500, y: 1480, facing: -1, show: false, acts: [{ t: ru.enfrente - 0.5, show: true }, { t: ru.enfrente - 0.5, walk: 760, dur: 0.5 }, { t: ru.llorar, expr: "sadness" }, { t: ru.llorar, pose: "sad", dur: 2 }, { t: ru.llorar + 0.3, say: "¡No es verdad! Son chismes…" }] },
    ],
    sfx: [{ t: ru.enganando, s: "boom", v: 0.4 }, { t: ru.llorar, s: "chime", v: 0.3 }],
    overlay: ({ t }) => <Banner t={t} text="Sus compañeros 👀 · Su mejor amiga 👀" t0={ru.comentarios} t1={ru.enganando + 1} color="#ffd0d0" />,
  },
  mexico: {
    bg: ({ t }) => <MexicoBeach t={t} />,
    chars: [
      { who: "narr", x: 360, y: 1480, acts: [{ t: mx.viaje, expr: "joy" }, { t: mx.avion, pose: "cheer", dur: 1.4 }, { t: mx.arrepiento, expr: "sadness" }, { t: mx.vengarme, pose: "sad", dur: 2 }] },
      { who: "amigo1", x: 600, y: 1480, facing: -1, acts: [{ t: mx.cuatro, pose: "cheer", dur: 1.2 }, { t: 0, expr: "joy" }] },
      { who: "amigo2", x: 820, y: 1480, facing: -1, acts: [{ t: mx.cuatro, pose: "wave", dur: 1.2 }, { t: 0, expr: "joy" }] },
    ],
    sfx: [{ t: mx.avion, s: "whoosh", v: 0.6 }, { t: mx.cuatro, s: "cheer", v: 0.4 }, { t: mx.engane, s: "boom", v: 0.5 }],
    overlay: ({ t }) => (
      <>
        <Chapter t={t} n="2" title="México" />
        <BigText t={t} t0={mx.engane - 0.2} t1={mx.engane + 2} text="😳" size={260} />
      </>
    ),
  },
  anillo: {
    bg: ({ t }) => (t < an.casamiento - 0.2 ? <JewelryStore t={t} /> : <Backyard t={t} />),
    chars: [
      { who: "narr", x: 420, y: 1480, acts: [{ t: an.culpa, expr: "sadness" }, { t: an.joyeria, expr: "focus" }, { t: an.casamiento - 0.2, pose: "cower", dur: 1.6 }, { t: an.casamiento, say: "¿Te querés casar conmigo?" }, { t: an.si, expr: "joy" }] },
      { who: "ex", x: 760, y: 1480, facing: -1, show: false, acts: [{ t: an.casamiento - 0.2, show: true }, { t: an.casamiento + 0.4, expr: "surprise" }, { t: an.si - 0.2, say: "¡Sí!" }, { t: an.si, expr: "joy" }, { t: an.si, pose: "cheer", dur: 1.5 }] },
    ],
    sfx: [{ t: an.joyeria, s: "sparkle", v: 0.6 }, { t: an.si, s: "fanfare", v: 0.5 }],
    overlay: ({ t }) => <RING t={t} t0={an.joyeria} t1={an.casamiento + 0.6} />,
  },
  rupturas: {
    bg: ({ t }) => <LivingRoom t={t} />,
    chars: [
      { who: "narr", x: 400, y: 1480, acts: [{ t: rp.cuatro, expr: "surprise" }, { t: rp.tontas, expr: "sadness" }] },
      { who: "ex", x: 720, y: 1480, facing: -1, acts: [{ t: rp.cuatro, pose: "crossed", dur: 3 }, { t: 0, expr: "anger" }] },
    ],
    overlay: ({ t }) => <BigText t={t} t0={rp.cuatro - 0.2} t1={rp.tontas + 1.4} text={"💔 x4"} color="#ff6b6b" />,
    sfx: [{ t: rp.cuatro, s: "crash", v: 0.4 }],
  },
  secarropas: {
    bg: ({ t }) => <Laundry t={t} open={kf(t, [se.abrio - 0.2, se.abrio + 0.3], [0, 1])} />,
    chars: [
      { who: "narr", x: 260, y: 1480, acts: [{ t: se.humeda, expr: "surprise" }, { t: se.dejo, expr: "sadness" }, { t: se.destrozado, pose: "sad", dur: 2.5 }] },
      { who: "ex", x: 1050, y: 1480, facing: -1, acts: [{ t: se.humeda - 0.4, say: "¡¿Está HÚMEDA?!" }, { t: 0, expr: "anger" }, { t: se.abrio, pose: "hold", dur: 1 }, { t: se.furiosa, walk: 1700, dur: 1.2 }, { t: se.dejo - 0.4, say: "Se terminó. Te dejo." }] },
    ],
    sfx: [{ t: se.abrio, s: "pop", v: 0.5 }, { t: se.furiosa, s: "crash", v: 0.6 }, { t: se.dejo, s: "boom", v: 0.5 }],
    overlay: ({ t }) => <Banner t={t} text="Ruptura #1: la ropa estaba un poquito húmeda 🧺" t0={se.dejo - 0.3} t1={se.dejo + 2.6} color="#bfe6ff" />,
  },
  valentin: {
    bg: ({ t }) => <HotelRoom t={t} />,
    chars: [{ who: "narr", x: 380, y: 1480, acts: [{ t: 0, pose: "hold", dur: 99 }, { t: va.hablar, expr: "surprise" }, { t: va.cansado, expr: "focus" }, { t: va.anillo - 0.6, say: "Traeme el anillo y te devuelvo tus cosas." }] }],
    overlay: ({ t }) => (
      <>
        <Chapter t={t} n="3" title="San Valentín" />
        <Phone k={kf(t, [va.hotel, va.hotel + 0.4, va.razon, va.razon + 0.4], [0, 1, 1, 0])}>
          <div style={{ padding: "26px 20px 6px", fontSize: 30, fontWeight: 700, borderBottom: "2px solid #dde" }}>Ella ❤️</div>
          <Msg me text="¡Feliz San Valentín! ¿Cómo querés festejar? 🌹" k={kf(t, [va.hotel, va.hotel + 0.3], [0, 1])} />
          <Msg text="Tenemos que hablar." k={kf(t, [va.hablar - 0.3, va.hablar], [0, 1])} />
          <Msg text="No sé si esto es lo que quiero para mi vida…" k={kf(t, [va.hablar + 1.2, va.hablar + 1.5], [0, 1])} />
          <Msg me text="Tenés razón." k={kf(t, [va.razon - 0.3, va.razon], [0, 1])} />
        </Phone>
      </>
    ),
    sfx: [{ t: va.hablar, s: "boom", v: 0.4 }],
  },
  llegada: {
    bg: ({ t }) => <LivingRoom t={t} doorOpen={kf(t, [ll.timbre, ll.timbre + 0.5], [0, 1])} />,
    chars: [
      { who: "narr", x: 400, y: 1480, acts: [{ t: ll.traido, expr: "surprise" }, { t: ll.shampoo, pose: "hold", dur: 2 }] },
      { who: "ex", x: 1500, y: 1480, facing: -1, acts: [{ t: ll.timbre + 0.4, walk: 760, dur: 1.2 }, { t: ll.anillo, pose: "hold", dur: 1 }, { t: ll.confundida, expr: "focus" }] },
      { who: "suegra", x: 1700, y: 1480, facing: -1, show: false, acts: [{ t: ll.traido - 0.6, show: true }, { t: ll.traido - 0.6, walk: 1000, dur: 1 }, { t: ll.confundida, pose: "crossed", dur: 3 }] },
    ],
    sfx: [{ t: ll.timbre, s: "knock", v: 0.7 }, { t: ll.anillo, s: "sparkle", v: 0.4 }],
    overlay: ({ t }) => (
      <>
        <RING t={t} t0={ll.anillo - 0.1} t1={ll.anillo + 1.6} />
        <Banner t={t} text="Ropa 👕 · Shampoo 🧴 · Un DVD 📀" t0={ll.shampoo - 0.6} t1={ll.confundida} color="#ffffff" />
      </>
    ),
  },
  mitad: {
    bg: ({ t }) => <LivingRoom t={t} doorOpen={1} />,
    chars: [
      { who: "narr", x: 400, y: 1480, acts: [{ t: mi.pregunte, say: "¿Qué pasa?" }, { t: mi.mal, expr: "surprise" }, { t: mi.reir, expr: "joy" }, { t: mi.reir, pose: "cheer", dur: 1.6 }, { t: mi.respeto, expr: "focus" }] },
      { who: "ex", x: 760, y: 1480, facing: -1, acts: [{ t: mi.deberia - 0.3, say: "¿No me debería llevar más?" }, { t: mi.comprometidos - 0.3, say: "Estábamos comprometidos. ¡Me corresponde la mitad!" }, { t: mi.reir, expr: "anger" }] },
      { who: "suegra", x: 1000, y: 1480, facing: -1, acts: [{ t: mi.mitad, pose: "crossed", dur: 3 }, { t: 0, expr: "focus" }] },
    ],
    sfx: [{ t: mi.mitad, s: "boom", v: 0.7 }, { t: mi.reir, s: "cheer", v: 0.4 }],
    overlay: ({ t }) => <BigText t={t} t0={mi.mitad} t1={mi.mitad + 2.2} text="½ 🤯" size={240} />,
  },
  madre: {
    bg: ({ t }) => <LivingRoom t={t} doorOpen={1} pointTV={kf(t, [ma.televisor - 0.1, ma.televisor + 0.3], [0, 1])} pointSofa={kf(t, [ma.sillon - 0.1, ma.sillon + 0.3], [0, 1])} pointMicro={kf(t, [ma.microondas - 0.1, ma.microondas + 0.3], [0, 1])} />,
    chars: [
      { who: "suegra", x: 900, y: 1480, facing: -1, acts: [{ t: ma.acuerdo, say: "¡Claro que le corresponde!" }, { t: ma.televisor - 0.3, walk: 640, dur: 0.6 }, { t: ma.televisor, pose: "point", dur: 1.2 }, { t: ma.microondas - 0.4, walk: 60, dur: 0.6 }, { t: ma.microondas, pose: "point", dur: 1.2 }, { t: ma.eche, walk: 1600, dur: 1.2 }, { t: 0, expr: "joy" }] },
      { who: "ex", x: 1100, y: 1480, facing: -1, acts: [{ t: ma.sillon - 0.3, walk: 520, dur: 0.6 }, { t: ma.sillon, pose: "point", dur: 1.4 }, { t: ma.sillon, say: "¡Y el sillón!" }, { t: ma.eche, walk: 1700, dur: 1.2 }, { t: 0, expr: "joy" }] },
      { who: "narr", x: 300, y: 1480, acts: [{ t: ma.televisor, expr: "surprise" }, { t: ma.juntos, expr: "anger" }, { t: ma.eche - 0.4, say: "¡Fuera de la casa de mi mamá!" }, { t: ma.eche, pose: "point", dur: 1.6 }] },
    ],
    sfx: [{ t: ma.televisor, s: "pop", v: 0.5 }, { t: ma.sillon, s: "pop", v: 0.5 }, { t: ma.microondas, s: "pop", v: 0.5 }, { t: ma.eche, s: "boom", v: 0.7 }],
    overlay: ({ t }) => <Banner t={t} text="Nunca vivimos juntos 🙄" t0={ma.juntos - 0.3} t1={ma.juntos + 2.2} color="#ffd0d0" />,
  },
  final: {
    bg: ({ t }) => <LivingRoom t={t} doorOpen={kf(t, [fi.cerre, fi.cerre + 0.4], [1, 0])} />,
    chars: [
      { who: "narr", x: 640, y: 1480, acts: [{ t: fi.chau - 0.3, say: "Chau, suerte. La vas a necesitar. Las dos." }, { t: fi.cerre, walk: 900, dur: 0.6 }, { t: fi.balas, expr: "joy" }, { t: fi.balas, pose: "wandUp", dur: 2 }] },
      { who: "ex", x: 1180, y: 1480, facing: -1, acts: [{ t: fi.puerta, expr: "sadness" }, { t: fi.cerre - 0.3, walk: 1700, dur: 0.6 }] },
    ],
    sfx: [{ t: fi.cerre, s: "crash", v: 0.6 }, { t: fi.balas, s: "fanfare", v: 0.5 }],
    overlay: ({ t }) => (
      <>
        <BigText t={t} t0={fi.balas - 0.2} t1={fi.reddit - 0.4} text={"BALA\nESQUIVADA 🎯"} size={150} color="#7dff9a" />
        <Banner t={t} text="Basado en un post de Reddit (r/ChoosingBeggars)" t0={fi.reddit - 0.3} t1={D("final")} color="#ff9a5a" />
      </>
    ),
  },
};

for (const sc of Object.values(scenes)) {
  const Bg = sc.bg;
  sc.bg = ({ t }) => (
    <div style={{ position: "absolute", inset: 0, filter: "saturate(1.2) contrast(1.04)", translate: `${Math.sin(t * 0.25) * 22}px ${Math.cos(t * 0.2) * 8}px`, scale: "1.04" }}>
      <Bg t={t} />
    </div>
  );
}

export const rd3: PartSpec = { part: 0, title: "Me pidió la MITAD de todo", badge: "HISTORIA REAL", cta: "¡Suscribite! ➜", dyn: true, scenes };
export const rd3Audio = audio;
