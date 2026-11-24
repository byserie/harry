import { Easing } from "remotion";
import { Expression } from "../characters/Stickman";
import { lerpPose, Pose, POSES, run, walk, walkPhase, with_ } from "../lib/pose";
import { Act, CharTrack } from "./types";

export type CharState = {
  x: number;
  y: number;
  s: number;
  facing: 1 | -1;
  pose: Pose;
  expr: Expression;
  wand: boolean;
  glow: number;
  show: boolean;
  rot: number;
  alpha: number;
  stone: boolean;
  talking: boolean;
  say: string | null;
  sayK: number;
};

const FPS = 30;
const WALK_SPEED = 360; // px/s
const RUN_SPEED = 720;
const BLEND = 0.28;
const ease = Easing.inOut(Easing.cubic);

type Motion = { t0: number; t1: number; x0: number; x1: number; y0: number; y1: number; kind: "walk" | "run" | "move" };

const prepare = (c: CharTrack) => {
  const acts = [...(c.acts ?? [])].sort((a, b) => a.t - b.t);
  // segmentos de movimiento con posiciones encadenadas
  const motions: Motion[] = [];
  let x = c.x;
  let y = c.y ?? 1390;
  for (const a of acts) {
    if ("walk" in a) {
      const d = Math.abs(a.walk - x);
      const dur = a.dur ?? d / (a.run ? RUN_SPEED : WALK_SPEED);
      motions.push({ t0: a.t, t1: a.t + Math.max(dur, 0.2), x0: x, x1: a.walk, y0: y, y1: y, kind: a.run ? "run" : "walk" });
      x = a.walk;
    } else if ("move" in a) {
      const nx = a.move.x ?? x;
      const ny = a.move.y ?? y;
      motions.push({ t0: a.t, t1: a.t + (a.dur ?? 0.8), x0: x, x1: nx, y0: y, y1: ny, kind: "move" });
      x = nx;
      y = ny;
    }
  }
  return { acts, motions };
};

const cache = new WeakMap<CharTrack, ReturnType<typeof prepare>>();

const latest = <K extends string>(acts: Act[], t: number, key: K): (Act & Record<K, unknown>) | undefined => {
  let r: (Act & Record<K, unknown>) | undefined;
  for (const a of acts) {
    if (a.t > t) break;
    if (key in a) r = a as Act & Record<K, unknown>;
  }
  return r;
};

/** Pose sin fundidos en el tiempo t (segundos). */
const rawPose = (c: CharTrack, p: ReturnType<typeof prepare>, t: number, s: number): Pose => {
  const f = t * FPS;
  const m = p.motions.find((mm) => mm.kind !== "move" && t >= mm.t0 && t < mm.t1);
  if (m) {
    const k = (t - m.t0) / (m.t1 - m.t0);
    const dist = Math.abs(m.x1 - m.x0) * k;
    const ph = walkPhase(dist, s);
    return m.kind === "run" ? run(ph) : walk(ph);
  }
  const pa = latest(p.acts, t, "pose") as { t: number; pose: keyof typeof POSES; dur?: number } | undefined;
  if (pa && (pa.dur === undefined || t < pa.t + pa.dur)) {
    return POSES[pa.pose]((t - pa.t) * FPS);
  }
  if (c.broom) return POSES.ride(f);
  return POSES.stand(f);
};

/** Momentos donde cambia la pose base (para fundir). */
const changeTimes = (p: ReturnType<typeof prepare>): number[] => {
  const ts: number[] = [];
  for (const m of p.motions) if (m.kind !== "move") ts.push(m.t0, m.t1);
  for (const a of p.acts) if ("pose" in a) { ts.push(a.t); if (a.dur !== undefined) ts.push(a.t + a.dur); }
  return ts.sort((a, b) => a - b);
};

export const charState = (c: CharTrack, t: number): CharState => {
  let p = cache.get(c);
  if (!p) { p = prepare(c); cache.set(c, p); }
  // posición
  let x = c.x;
  let y = c.y ?? 1390;
  let facing: 1 | -1 = c.facing ?? 1;
  for (const m of p.motions) {
    if (t < m.t0) break;
    const k = Math.min(1, (t - m.t0) / (m.t1 - m.t0));
    const kk = m.kind === "move" ? ease(k) : k;
    x = m.x0 + (m.x1 - m.x0) * kk;
    y = m.y0 + (m.y1 - m.y0) * kk;
    if (m.kind !== "move" && m.x1 !== m.x0) facing = m.x1 > m.x0 ? 1 : -1;
  }
  // giro explícito posterior al último movimiento
  for (const a of p.acts) {
    if (a.t > t) break;
    if ("face" in a) {
      const lastMove = p.motions.filter((m) => m.kind !== "move" && m.t0 <= t && m.t0 > a.t);
      if (!lastMove.length) facing = a.face;
    }
  }
  // escala
  let s = c.s ?? 1.9;
  const sc = latest(p.acts, t, "scale") as { t: number; scale: number; dur?: number } | undefined;
  if (sc) {
    const prev = [...p.acts].filter((a) => "scale" in a && a.t < sc.t).pop() as { scale: number } | undefined;
    const from = prev?.scale ?? c.s ?? 1.9;
    const k = Math.min(1, (t - sc.t) / (sc.dur ?? 0.5));
    s = from + (sc.scale - from) * ease(k);
  }
  // pose con fundido
  let pose = rawPose(c, p, t, s);
  const ct = changeTimes(p).filter((x0) => x0 <= t && t - x0 < BLEND).pop();
  if (ct !== undefined && ct > 0) {
    const before = rawPose(c, p, ct - 1 / FPS, s);
    pose = lerpPose(before, pose, ease((t - ct) / BLEND));
  }
  const look = latest(p.acts, t, "look") as { look: number | null } | undefined;
  if (look && look.look !== null) pose = with_(pose, { headTurn: look.look });

  const ex = latest(p.acts, t, "expr") as { expr: Expression } | undefined;
  const wa = latest(p.acts, t, "wand") as { wand: boolean } | undefined;
  const sh = latest(p.acts, t, "show") as { show: boolean } | undefined;
  // brillo con rampa
  const ga = latest(p.acts, t, "glow") as { t: number; glow: number } | undefined;
  let glow = 0;
  if (ga) {
    const prev = [...p.acts].filter((a) => "glow" in a && a.t < ga.t).pop() as { glow: number } | undefined;
    const g0 = prev?.glow ?? 0;
    glow = g0 + (ga.glow - g0) * Math.min(1, (t - ga.t) / 0.3);
  }
  const ra = latest(p.acts, t, "rot") as { t: number; rot: number; dur?: number } | undefined;
  let rot = 0;
  if (ra) {
    const prev = [...p.acts].filter((a) => "rot" in a && a.t < ra.t).pop() as { rot: number } | undefined;
    const r0 = prev?.rot ?? 0;
    rot = r0 + (ra.rot - r0) * ease(Math.min(1, (t - ra.t) / (ra.dur ?? 0.4)));
  }
  const aa = latest(p.acts, t, "alpha") as { t: number; alpha: number; dur?: number } | undefined;
  let alpha = 1;
  if (aa) {
    const prev = [...p.acts].filter((a) => "alpha" in a && a.t < aa.t).pop() as { alpha: number } | undefined;
    const a0 = prev?.alpha ?? 1;
    alpha = a0 + (aa.alpha - a0) * Math.min(1, (t - aa.t) / (aa.dur ?? 0.5));
  }
  const so = latest(p.acts, t, "stone") as { stone: boolean } | undefined;
  const tk = latest(p.acts, t, "talk") as { t: number; talk: number } | undefined;
  const sy = latest(p.acts, t, "say") as { t: number; say: string; dur?: number } | undefined;
  const sayDur = sy ? sy.dur ?? Math.max(1.6, sy.say.length * 0.075) : 0;
  const saying = !!sy && t < sy.t + sayDur;
  return {
    say: saying ? sy!.say : null,
    sayK: saying ? Math.min(1, (t - sy!.t) / 0.18) * Math.min(1, (sy!.t + sayDur - t) / 0.18) : 0,
    talking: (!!tk && t < tk.t + tk.talk) || saying,
    stone: so?.stone ?? false,
    alpha,
    x,
    y,
    s,
    facing,
    pose,
    expr: ex?.expr ?? c.expr ?? "neutral",
    wand: wa?.wand ?? c.wand ?? false,
    glow,
    show: sh?.show ?? c.show ?? true,
    rot,
  };
};
