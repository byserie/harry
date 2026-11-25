import { CAST } from "../characters/cast";
import { FIGS } from "../characters/Figure";
import { charState } from "./charState";
import { SceneSpec } from "./types";

/**
 * Cámara automática (Avatar): encuadra a los personajes visibles, enteros y centrados.
 * Si alguien habla, se acerca un poco a esa persona. Devuelve el punto del lienzo que va
 * al centro de la pantalla (cx, cy) y el zoom.
 */
const SCREEN_CY = 1030; // y del lienzo que cae en el centro de la pantalla 16:9

const frameAt = (spec: SceneSpec, t: number) => {
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  let sx = 0, sy = 0, sn = 0;
  for (const c of spec.chars) {
    const st = charState(c, t);
    if (!st.show || st.alpha < 0.35 || (c.opacity ?? 1) < 0.35) continue;
    const body = FIGS[c.who];
    const local = body ? (body.kind === "navi" ? 470 : 410) : 380;
    const h = local * st.s * CAST[c.who].height * (body ? 0.76 : 1) * (Math.abs(st.rot) > 45 ? 0.45 : 1);
    const w = Math.abs(st.rot) > 45 ? h / 0.45 : h * 0.45;
    // personajes muy afuera de la escena no cuentan
    if (st.x < -380 || st.x > 1460) continue;
    x0 = Math.min(x0, st.x - w / 2);
    x1 = Math.max(x1, st.x + w / 2);
    y0 = Math.min(y0, st.y - h - 140);
    y1 = Math.max(y1, st.y + 30);
    if (st.talking) {
      sx += st.x;
      sy += st.y - h * 0.6;
      sn++;
    }
  }
  if (!isFinite(x0)) return null;
  const bw = x1 - x0;
  const bh = y1 - y0;
  let z = Math.min(1080 / (bh * 1.08), 1920 / (bw + 480));
  let cx = (x0 + x1) / 2;
  let cy = (y0 + y1) / 2;
  if (sn > 0) {
    cx = cx * 0.45 + (sx / sn) * 0.55;
    cy = cy * 0.6 + (sy / sn) * 0.4;
    z *= 1.12;
  }
  return { z, cx, cy };
};

export const autoFrame = (spec: SceneSpec, t: number) => {
  // promedio de varios instantes para que la cámara se mueva suave
  const ts = [t, t - 0.2, t - 0.4, t - 0.6, t - 0.8].map((x) => Math.max(0, x));
  const wts = [0.32, 0.24, 0.18, 0.14, 0.12];
  let z = 0, cx = 0, cy = 0, n = 0;
  ts.forEach((tt, i) => {
    const f = frameAt(spec, tt);
    if (!f) return;
    z += f.z * wts[i];
    cx += f.cx * wts[i];
    cy += f.cy * wts[i];
    n += wts[i];
  });
  if (n === 0) return { z: 1, cx: 540, cy: SCREEN_CY };
  z = Math.max(1, Math.min(1.4, z / n));
  cx /= n;
  cy /= n;
  const hw = 960 / z - 40;
  const hh = 540 / z - 20;
  cx = Math.max(-430 + hw, Math.min(1510 - hw, cx));
  cy = Math.max(hh + 10, Math.min(1900 - hh, cy));
  return { z, cx, cy };
};

export { SCREEN_CY };


/** Cámara vertical (Shorts) para personajes con cuerpo: sigue a quien habla, si no al centro del grupo. */
export const vFollow = (spec: SceneSpec, t: number) => {
  const at = (tt: number) => {
    let sx = 0, sn = 0, gx0 = Infinity, gx1 = -Infinity;
    for (const c of spec.chars) {
      const st = charState(c, tt);
      if (!st.show || st.alpha < 0.35 || st.x < -380 || st.x > 1460) continue;
      gx0 = Math.min(gx0, st.x);
      gx1 = Math.max(gx1, st.x);
      if (st.talking) {
        sx += st.x;
        sn++;
      }
    }
    if (sn) return sx / sn;
    if (isFinite(gx0)) return (gx0 + gx1) / 2;
    return 540;
  };
  const ts = [0, 0.25, 0.5, 0.75, 1.0].map((d) => Math.max(0, t - d));
  const wts = [0.3, 0.25, 0.2, 0.15, 0.1];
  let cx = 0;
  ts.forEach((tt, i) => (cx += at(tt) * wts[i]));
  const z = 1.08;
  const hw = 540 / z;
  cx = Math.max(-440 + hw, Math.min(1520 - hw, cx));
  return { z, cx, cy: 1040 };
};
