import React from "react";

/** true cuando la composición es horizontal (16:9). */
export const LandCtx = React.createContext(false);

/** Franja del lienzo vertical (1080×1920) que se muestra en horizontal. */
export const BAND = { top: 380, height: 1080 };
export const LAND_SCALE = 1080 / BAND.height; // 1.0
