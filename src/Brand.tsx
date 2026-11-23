import React from "react";
import { AbsoluteFill } from "remotion";
import { Stickman } from "./characters/Stickman";
import { STAND, with_ } from "./lib/pose";
import { FONT } from "./lib/font";

const Canvas: React.FC<{ x: number; y: number; scale: number; children: React.ReactNode }> = ({ x, y, scale, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 1080, height: 1920, transformOrigin: "0 0", scale: String(scale) }}>{children}</div>
);

const Clapper: React.FC<{ s: number }> = ({ s }) => (
  <svg width={260 * s} height={220 * s} viewBox="0 0 260 220">
    <g stroke="#1b1b2f" strokeWidth={10} strokeLinejoin="round">
      <rect x={20} y={80} width={220} height={130} rx={14} fill="#1b1b2f" />
      <path d="M 20 80 L 30 30 L 240 10 L 240 60 Z" fill="#fff" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M ${60 + i * 48} ${26 - i * 4} l 26 -3 l -14 46 l -26 3 Z`} fill="#1b1b2f" stroke="none" />
      ))}
      <text x={130} y={175} textAnchor="middle" fontSize={78} fontFamily="Fredoka" fontWeight={700} fill="#ffd23a" stroke="none">5'</text>
    </g>
  </svg>
);

export const Avatar: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #ffd84d, #ff8a1a)", alignItems: "center", justifyContent: "center" }}>
    <div style={{ position: "absolute", top: 120 }}>
      <Clapper s={1.9} />
    </div>
    <div style={{ position: "absolute", bottom: 120, fontFamily: FONT, fontWeight: 700, fontSize: 112, color: "#fff", WebkitTextStroke: "16px #1b1b2f", paintOrder: "stroke fill", letterSpacing: 2 }}>
      PELIS
    </div>
  </AbsoluteFill>
);

const pose = (k: number) => with_(STAND, { rSh: 130 + k * 10, rEl: 20, lSh: -130 - k * 5, lEl: -20, headTurn: 0.1, headTilt: -6 });

export const Banner: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(135deg, #2b1f73, #5a3f9f 45%, #b5479f)", overflow: "hidden" }}>
    {Array.from({ length: 60 }).map((_, i) => (
      <div key={i} style={{ position: "absolute", left: (i * 397) % 2560, top: (i * 233) % 1440, width: 6 + (i % 4) * 3, height: 6 + (i % 4) * 3, borderRadius: 99, background: "#fff", opacity: 0.5 }} />
    ))}
    {/* zona segura central 1546×423 */}
    <div style={{ position: "absolute", left: 507, top: 508, width: 1546, height: 423, display: "flex", alignItems: "center" }}>
      <div style={{ marginLeft: 40 }}>
        <Clapper s={1.35} />
      </div>
      <div style={{ marginLeft: 40, fontFamily: FONT, fontWeight: 700 }}>
        <div style={{ fontSize: 112, whiteSpace: "nowrap", color: "#ffe14d", WebkitTextStroke: "16px #121220", paintOrder: "stroke fill", lineHeight: 1, rotate: "-2deg" }}>PELIS EN 5 MINUTOS</div>
        <div style={{ marginTop: 24, fontSize: 44, whiteSpace: "nowrap", color: "#fff", WebkitTextStroke: "10px #121220", paintOrder: "stroke fill" }}>Resúmenes animados de películas · Videos nuevos cada semana</div>
      </div>
    </div>
    {/* personajes a los costados (visibles en TV y escritorio ancho) */}
    <Canvas x={90} y={20} scale={0.6}>
      <Stickman who="hagrid" x={540} y={1900} scale={2.0} pose={pose(0)} expression="joy" showName={false} />
    </Canvas>
    <Canvas x={1980} y={330} scale={0.55}>
      <Stickman who="harry" x={540} y={1900} scale={2.4} pose={pose(1)} expression="joy" wand wandGlow={1} showName={false} />
    </Canvas>
    <Canvas x={2230} y={380} scale={0.5}>
      <Stickman who="hermione" x={540} y={1900} scale={2.4} facing={-1} pose={pose(2)} expression="joy" showName={false} />
    </Canvas>
  </AbsoluteFill>
);
