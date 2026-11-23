import React from "react";
import { AbsoluteFill } from "remotion";
import { Stickman } from "./characters/Stickman";
import { STAND, with_ } from "./lib/pose";
import { FONT } from "./lib/font";
import { SecretChamber, Basilisk } from "./peli2/assets";
import { Svg } from "./scenes/bg1";

const harryPose = with_(STAND, { rSh: 118, rEl: 40, lSh: 60, lEl: 70, lean: -6, headTilt: -6, headTurn: 0.85, lHip: -14, rHip: 14 });

/** Contenedor que escala un "lienzo" de 1080×1920 (el sistema de coordenadas de los personajes). */
const Canvas: React.FC<{ x: number; y: number; scale: number; children: React.ReactNode }> = ({ x, y, scale, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 1080, height: 1920, transformOrigin: "0 0", scale: String(scale) }}>{children}</div>
);

const Title: React.FC<{ size: number; badge: number }> = ({ size, badge }) => (
  <div style={{ fontFamily: FONT, fontWeight: 700, textAlign: "center", lineHeight: 0.92 }}>
    <div style={{ fontSize: size, color: "#ffe14d", WebkitTextStroke: `${size * 0.14}px #121220`, paintOrder: "stroke fill", textShadow: `0 ${size * 0.08}px 0 rgba(0,0,0,0.5)`, rotate: "-3deg" }}>LA CÁMARA</div>
    <div style={{ fontSize: size * 1.12, color: "#7dff9a", WebkitTextStroke: `${size * 0.14}px #121220`, paintOrder: "stroke fill", textShadow: `0 ${size * 0.08}px 0 rgba(0,0,0,0.5)`, rotate: "-3deg" }}>SECRETA</div>
    <div
      style={{
        display: "inline-block",
        marginTop: badge * 0.25,
        fontSize: badge,
        color: "#fff",
        background: "#e23b3b",
        border: `${badge * 0.1}px solid #121220`,
        borderRadius: badge * 0.4,
        padding: `${badge * 0.08}px ${badge * 0.4}px`,
        rotate: "4deg",
        boxShadow: `0 ${badge * 0.12}px 0 rgba(0,0,0,0.45)`,
      }}
    >
      ¡EN 5 MINUTOS!
    </div>
  </div>
);

export const Miniatura: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0d2a22", overflow: "hidden" }}>
    <Canvas x={0} y={-700} scale={1.19}>
      <SecretChamber t={1} />
    </Canvas>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 75% 55%, rgba(255,230,100,0.25), rgba(0,0,0,0) 45%), linear-gradient(90deg, rgba(0,0,0,0.55), rgba(0,0,0,0) 55%)" }} />
    {/* basilisco */}
    <Canvas x={430} y={-500} scale={1.05}>
      <Svg>
        <Basilisk x={760} y={980} s={1.55} t={0.4} flip open={0.95} />
      </Svg>
    </Canvas>
    {/* Harry */}
    <Canvas x={-40} y={-110} scale={0.56}>
      <Stickman who="harry" x={540} y={1700} scale={2.9} pose={harryPose} expression="surprise" wand wandGlow={1} showName={false} />
    </Canvas>
    <div style={{ position: "absolute", left: 440, top: 8, width: 820 }}>
      <Title size={100} badge={46} />
    </div>
    <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
      <path d="M 560 560 Q 660 500 760 540" stroke="#ff3b3b" strokeWidth={20} fill="none" strokeLinecap="round" />
      <path d="M 740 505 L 790 545 L 735 575 Z" fill="#ff3b3b" />
      
    </svg>
  </AbsoluteFill>
);

export const Portada: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0d2a22", overflow: "hidden" }}>
    <SecretChamber t={1} />
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 62%, rgba(255,230,100,0.25), rgba(0,0,0,0) 45%)" }} />
    <Svg>
      <Basilisk x={980} y={1080} s={1.5} t={0.4} flip open={0.95} />
    </Svg>
    <Canvas x={-120} y={160} scale={0.95}>
      <Stickman who="harry" x={540} y={1700} scale={2.7} pose={harryPose} expression="surprise" wand wandGlow={1} showName={false} />
    </Canvas>
    <div style={{ position: "absolute", left: 0, right: 0, top: 120 }}>
      <Title size={150} badge={78} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 230, textAlign: "center", fontFamily: FONT, fontWeight: 700, fontSize: 70, color: "#fff", WebkitTextStroke: "12px #121220", paintOrder: "stroke fill" }}>
      HARRY POTTER 2 · RESUMEN
    </div>
  </AbsoluteFill>
);

import { Chamber } from "./scenes/bg2";
import { Flame, Stone, Voldemort } from "./scenes/props";

const Title1: React.FC<{ size: number; badge: number }> = ({ size, badge }) => (
  <div style={{ fontFamily: FONT, fontWeight: 700, textAlign: "center", lineHeight: 0.92 }}>
    <div style={{ fontSize: size, color: "#ffe14d", WebkitTextStroke: `${size * 0.14}px #121220`, paintOrder: "stroke fill", textShadow: `0 ${size * 0.08}px 0 rgba(0,0,0,0.5)`, rotate: "-3deg" }}>LA PIEDRA</div>
    <div style={{ fontSize: size * 1.05, color: "#ff6b6b", WebkitTextStroke: `${size * 0.14}px #121220`, paintOrder: "stroke fill", textShadow: `0 ${size * 0.08}px 0 rgba(0,0,0,0.5)`, rotate: "-3deg" }}>FILOSOFAL</div>
    <div
      style={{
        display: "inline-block",
        marginTop: badge * 0.25,
        fontSize: badge,
        color: "#1b1b2f",
        background: "#ffd23a",
        border: `${badge * 0.1}px solid #121220`,
        borderRadius: badge * 0.4,
        padding: `${badge * 0.08}px ${badge * 0.4}px`,
        rotate: "4deg",
        boxShadow: `0 ${badge * 0.12}px 0 rgba(0,0,0,0.45)`,
      }}
    >
      ¡EN 6 MINUTOS!
    </div>
  </div>
);

export const Miniatura1: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#2a1838", overflow: "hidden" }}>
    <Canvas x={0} y={-700} scale={1.19}>
      <Chamber t={1} tint="#2a1838" light="#ff3b3b" />
    </Canvas>
    <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
      <Flame x={1230} y={760} s={1.6} t={1} color="#8a5aff" />
      <Flame x={60} y={780} s={1.3} t={2} />
    </svg>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 78% 60%, rgba(255,60,60,0.35), rgba(0,0,0,0) 45%), linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0) 55%)" }} />
    <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
      <Voldemort x={1000} y={490} s={1.25} t={1.3} k={1} />
      <ellipse cx={1000} cy={585} rx={95} ry={40} fill="#050507" />
      <path d="M 910 570 L 935 600 L 960 572 L 985 604 L 1010 572 L 1035 604 L 1060 572 L 1090 598 Q 1000 640 910 570 Z" fill="#5a0000" stroke="#ff2020" strokeWidth={4} />
      <path d="M 880 410 L 975 445 M 1120 410 L 1025 445" stroke="#ff2020" strokeWidth={14} strokeLinecap="round" />
    </svg>
    <Canvas x={-40} y={-110} scale={0.56}>
      <Stickman
        who="harry"
        x={540}
        y={1700}
        scale={2.9}
        pose={with_(STAND, { rSh: 100, rEl: 40, lSh: 60, lEl: 70, lean: -6, headTilt: -6, headTurn: 0.85, lHip: -14, rHip: 14 })}
        expression="surprise"
        showName={false}
        holding={<Stone x={14} y={-6} s={0.9} glow={1} />}
      />
    </Canvas>
    <div style={{ position: "absolute", left: 420, top: 8, width: 820 }}>
      <Title1 size={100} badge={46} />
    </div>
    <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
      <path d="M 560 580 Q 680 520 800 560" stroke="#ffd23a" strokeWidth={20} fill="none" strokeLinecap="round" />
      <path d="M 780 525 L 830 565 L 775 595 Z" fill="#ffd23a" />
    </svg>
  </AbsoluteFill>
);
