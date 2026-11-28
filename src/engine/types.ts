import React from "react";
import { CharId } from "../characters/cast";
import { Expression } from "../characters/Stickman";
import { PoseName } from "../lib/pose";

/** Acciones de personaje. t en segundos desde el inicio de la escena. */
export type Act =
  | { t: number; walk: number; dur?: number; run?: boolean } // caminar hasta x
  | { t: number; pose: PoseName; dur?: number } // sostener pose (sin dur: hasta la próxima)
  | { t: number; face: 1 | -1 }
  | { t: number; expr: Expression }
  | { t: number; wand: boolean }
  | { t: number; glow: number }
  | { t: number; look: number | null } // giro de cabeza forzado
  | { t: number; move: { x?: number; y?: number }; dur?: number } // desplazamiento sin caminar (volar, deslizar)
  | { t: number; show: boolean }
  | { t: number; rot: number; dur?: number }
  | { t: number; scale: number; dur?: number }
  | { t: number; alpha: number; dur?: number }
  | { t: number; stone: boolean }
  | { t: number; talk: number } // habla durante talk segundos (boca y gestos)
  | { t: number; say: string; dur?: number }; // globo de diálogo (también mueve la boca)

export type CharTrack = {
  who: CharId;
  x: number;
  y?: number;
  s?: number;
  facing?: 1 | -1;
  expr?: Expression;
  wand?: boolean;
  broom?: boolean;
  show?: boolean;
  name?: boolean;
  opacity?: number;
  holding?: (t: number) => React.ReactNode;
  mask?: boolean; // máscara de oxígeno (Avatar)
  acts?: Act[];
};

export type Cam = { t: number; z: number; x?: number; y?: number };

export type SfxName =
  | "whoosh" | "sparkle" | "step" | "pop" | "boom" | "paper" | "thunder" | "splash" | "chime" | "hiss" | "roar"
  | "fire" | "flutter" | "fanfare" | "crash" | "zap" | "coins" | "whistle" | "rumble" | "cheer" | "knock";

export type Trans = "fade" | "wipe" | "circle" | "slide" | "zoom";

export type Layer = React.FC<{ t: number }>;

export type SceneSpec = {
  bg: Layer;
  under?: Layer; // entre el fondo y los personajes
  fx?: Layer; // encima de los personajes (dentro de la cámara)
  overlay?: Layer; // encima de todo (fuera de la cámara)
  chars: CharTrack[];
  cam?: Cam[];
  shake?: [number, number, number?][]; // [t, intensidad, duración]
  sfx?: { t: number; s: SfxName; v?: number }[];
  trans?: Trans;
  /** false = usar las teclas de cámara a mano en vez del encuadre automático (Avatar). */
  autoCam?: boolean;
  /** recorte en el que se muestra el contenido (para escenas partidas). */
};

export type PartSpec = {
  part: number;
  title?: string;
  dyn?: boolean;
  badge?: string; // texto del cartel del título (por defecto PARTE N / PELÍCULA COMPLETA)
  ctaTitle?: string;
  cta?: string; // texto del botón final
  scenes: Record<string, SceneSpec>;
};
