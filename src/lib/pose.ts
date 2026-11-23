import { Easing, interpolate } from "remotion";

/** Ángulos en grados. Brazos/piernas: 0 = recto hacia abajo, positivo = hacia adelante. */
export type Pose = {
  lSh: number; // hombro lejano
  lEl: number; // codo lejano (positivo = antebrazo sube hacia adelante)
  rSh: number; // hombro cercano (mano de la varita)
  rEl: number;
  lHip: number;
  lKn: number; // rodilla (positivo = se dobla hacia atrás)
  rHip: number;
  rKn: number;
  lean: number; // inclinación del torso
  headTilt: number;
  headTurn: number; // -1 mira atrás … 0 al frente … 1 mira adelante
  bob: number; // desplazamiento vertical del cuerpo (unidades locales)
};

export const STAND: Pose = {
  lSh: -8, lEl: 10, rSh: 8, rEl: 10,
  lHip: -4, lKn: 2, rHip: 4, rKn: 2,
  lean: 0, headTilt: 0, headTurn: 0.2, bob: 0,
};

export const lerpPose = (a: Pose, b: Pose, k: number): Pose => {
  const o = {} as Pose;
  (Object.keys(a) as (keyof Pose)[]).forEach((key) => {
    o[key] = a[key] + (b[key] - a[key]) * k;
  });
  return o;
};

export const with_ = (p: Pose, patch: Partial<Pose>): Pose => ({ ...p, ...patch });

/** Ciclo de caminata. phase en radianes. */
export const walk = (phase: number, energy = 1): Pose => {
  const s = Math.sin(phase);
  const c = Math.cos(phase);
  return {
    rHip: 28 * s * energy,
    lHip: -28 * s * energy,
    rKn: 6 + 38 * Math.max(0, c) * energy,
    lKn: 6 + 38 * Math.max(0, -c) * energy,
    rSh: -26 * s * energy,
    lSh: 26 * s * energy,
    rEl: 22 + 10 * Math.max(0, -s),
    lEl: 22 + 10 * Math.max(0, s),
    lean: 5 * energy,
    headTilt: 0,
    headTurn: 0.6,
    bob: -7 * (1 - Math.abs(s)) * energy,
  };
};

/** Fase de caminata a partir de la distancia recorrida (en px de pantalla), sin patinar. */
export const walkPhase = (distancePx: number, scale: number) =>
  (Math.abs(distancePx) / (135 * scale)) * Math.PI;

export const wave = (t: number): Pose =>
  with_(STAND, { rSh: 112, rEl: 48 + 28 * Math.sin(t * 0.55), headTurn: 0.5, headTilt: -4 });

export const point = (up = 0): Pose =>
  with_(STAND, { rSh: 90 + up, rEl: 4, lean: 3, headTurn: 0.8 });

export const wandUp = (t = 0): Pose =>
  with_(STAND, {
    rSh: 145 + 4 * Math.sin(t * 0.3),
    rEl: 15,
    lSh: -20,
    lEl: 30,
    lean: -3,
    headTilt: -8,
    headTurn: 0.7,
    lHip: -10,
    rHip: 10,
  });

export const wandAim = (t = 0): Pose =>
  with_(STAND, { rSh: 95 + 3 * Math.sin(t * 0.4), rEl: 0, lSh: -15, lEl: 25, lean: 4, headTurn: 0.9, lHip: -12, rHip: 12, lKn: 8 });

export const armsUp = (t = 0): Pose =>
  with_(STAND, {
    rSh: 130 + 8 * Math.sin(t * 0.5),
    rEl: 20,
    lSh: -130 - 8 * Math.sin(t * 0.5),
    lEl: -20,
    headTilt: -10,
    headTurn: 0.1,
    bob: -10 * Math.abs(Math.sin(t * 0.25)),
    lHip: -8,
    rHip: 8,
  });

export const shrug: Pose = with_(STAND, { rSh: 40, rEl: 110, lSh: 40, lEl: 110, headTilt: 8 });

export const think: Pose = with_(STAND, { rSh: 35, rEl: 130, lSh: 20, lEl: 70, headTilt: 10, headTurn: 0.4 });

export const sad: Pose = with_(STAND, { lSh: -2, rSh: 2, lEl: 4, rEl: 4, lean: 10, headTilt: 18, headTurn: 0.2 });

export const surprised: Pose = with_(STAND, { rSh: 50, rEl: 60, lSh: 50, lEl: 60, lean: -8, headTilt: -6, lHip: -10, rHip: 10 });

export const angry: Pose = with_(STAND, { rSh: 25, rEl: 100, lSh: 25, lEl: 100, lean: 8, headTilt: 4, lHip: -14, rHip: 14 });

export type Segment = {
  from: number;
  to: number;
  pose: (localFrame: number) => Pose;
};

/** Encadena segmentos de pose con fundido suave entre uno y otro. */
export const act = (frame: number, segs: Segment[], blend = 7): Pose => {
  let idx = segs.findIndex((s) => frame >= s.from && frame < s.to);
  if (idx === -1) idx = frame < segs[0].from ? 0 : segs.length - 1;
  const seg = segs[idx];
  const local = Math.max(0, Math.min(frame, seg.to) - seg.from);
  const cur = seg.pose(local);
  if (idx > 0 && local < blend) {
    const prev = segs[idx - 1];
    const k = Easing.inOut(Easing.cubic)(local / blend);
    return lerpPose(prev.pose(prev.to - prev.from), cur, k);
  }
  return cur;
};

/** interpolate con clamp por defecto. */
export const kf = (
  frame: number,
  input: number[],
  output: number[],
  easing: (t: number) => number = Easing.inOut(Easing.cubic),
) =>
  interpolate(frame, input.reduce<number[]>((acc, v) => [...acc, acc.length ? Math.max(v, acc[acc.length - 1] + 0.001) : v], []), output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const sit: Pose = with_(STAND, { lHip: 88, rHip: 92, lKn: 90, rKn: 92, lSh: 10, rSh: 25, lEl: 40, rEl: 40, headTurn: 0.4 });
export const ride: Pose = with_(STAND, { lHip: 60, rHip: 70, lKn: 100, rKn: 105, rSh: 70, rEl: 10, lSh: 60, lEl: 15, lean: 14, headTurn: 0.9 });
export const hold: Pose = with_(STAND, { rSh: 70, rEl: 35, lSh: 60, lEl: 45, headTurn: 0.6 });
export const cower: Pose = with_(STAND, { lHip: 40, rHip: 45, lKn: 85, rKn: 90, rSh: 120, rEl: 95, lSh: 110, lEl: 100, lean: 12, headTilt: 12 });
export const pointUp: Pose = with_(STAND, { rSh: 150, rEl: 0, headTilt: -12, headTurn: 0.7 });
export const run = (phase: number): Pose => with_(walk(phase, 1.35), { lean: 14 });
export const cheer = (t: number): Pose => with_(armsUp(t), { bob: -18 * Math.abs(Math.sin(t * 0.3)) });
export const talk = (t: number): Pose => with_(STAND, { rSh: 30 + 18 * Math.sin(t * 0.18), rEl: 60 + 20 * Math.sin(t * 0.23), headTurn: 0.7, headTilt: 3 * Math.sin(t * 0.1) });
export const crossed: Pose = with_(STAND, { rSh: 35, rEl: 115, lSh: 40, lEl: 110, headTilt: -4 });

export type PoseName =
  | "stand" | "wave" | "point" | "pointUp" | "wandUp" | "wandAim" | "armsUp" | "cheer" | "shrug" | "think"
  | "sad" | "surprised" | "angry" | "sit" | "ride" | "hold" | "cower" | "talk" | "crossed";

export const POSES: Record<PoseName, (t: number) => Pose> = {
  stand: (t) => with_(STAND, { bob: -1.5 * Math.sin(t * 0.08) }),
  wave: (t) => wave(t),
  point: () => point(),
  pointUp: () => pointUp,
  wandUp: (t) => wandUp(t),
  wandAim: (t) => wandAim(t),
  armsUp: (t) => armsUp(t),
  cheer: (t) => cheer(t),
  shrug: () => shrug,
  think: () => think,
  sad: () => sad,
  surprised: () => surprised,
  angry: (t) => with_(angry, { bob: -2 * Math.abs(Math.sin(t * 0.4)) }),
  sit: () => sit,
  ride: (t) => with_(ride, { bob: 4 * Math.sin(t * 0.12) }),
  hold: () => hold,
  cower: () => cower,
  talk: (t) => talk(t),
  crossed: () => crossed,
};
