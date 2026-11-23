import React from "react";
import { AbsoluteFill } from "remotion";

/** Cámara: zoom alrededor de un punto focal + paneo + temblor. */
export const Camera: React.FC<{
  zoom: number;
  fx?: number;
  fy?: number;
  panX?: number;
  panY?: number;
  shake?: number;
  frame?: number;
  children: React.ReactNode;
}> = ({ zoom, fx = 540, fy = 1000, panX = 0, panY = 0, shake = 0, frame = 0, children }) => {
  const sx = shake * Math.sin(frame * 2.3) * 14;
  const sy = shake * Math.cos(frame * 3.1) * 10;
  return (
    <AbsoluteFill
      style={{
        transformOrigin: `${fx}px ${fy}px`,
        scale: String(zoom),
        translate: `${panX + sx}px ${panY + sy}px`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
