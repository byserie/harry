import React from "react";
import { random, useCurrentFrame } from "remotion";
import { INK } from "../../characters/cast";

/** Patio del castillo al atardecer. parallax: desplazamiento de cámara para las capas lejanas. */
export const Courtyard: React.FC<{ parallax?: number }> = ({ parallax = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="cy-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b2a8f" />
          <stop offset="0.45" stopColor="#b5479f" />
          <stop offset="0.8" stopColor="#ff9a5a" />
          <stop offset="1" stopColor="#ffd27a" />
        </linearGradient>
        <linearGradient id="cy-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9a8fb8" />
          <stop offset="1" stopColor="#5a4f7e" />
        </linearGradient>
      </defs>
      <rect width={1080} height={1920} fill="url(#cy-sky)" />
      {/* estrellas */}
      {Array.from({ length: 40 }).map((_, i) => (
        <circle
          key={i}
          cx={random(`sx${i}`) * 1080}
          cy={random(`sy${i}`) * 600}
          r={1.5 + random(`sr${i}`) * 3}
          fill="#fff"
          opacity={0.4 + 0.6 * Math.abs(Math.sin(frame * 0.08 + i))}
        />
      ))}
      {/* luna */}
      <circle cx={820 - parallax * 0.1} cy={300} r={90} fill="#fff4d0" />
      <circle cx={850 - parallax * 0.1} cy={280} r={90} fill="#c45fa8" opacity={0.0} />
      {/* castillo lejano */}
      <g transform={`translate(${-parallax * 0.25} 0)`} fill="#2a1f5c" stroke={INK} strokeWidth={4}>
        <rect x={90} y={620} width={120} height={500} />
        <path d="M 70 630 L 150 470 L 230 630 Z" fill="#3d2d7a" />
        <rect x={300} y={560} width={150} height={560} />
        <path d="M 280 570 L 375 380 L 470 570 Z" fill="#3d2d7a" />
        <rect x={520} y={700} width={260} height={420} />
        <rect x={820} y={600} width={130} height={520} />
        <path d="M 800 610 L 885 430 L 970 610 Z" fill="#3d2d7a" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={540 + i * 40} y={680} width={26} height={30} />
        ))}
      </g>
      {/* ventanas encendidas */}
      <g transform={`translate(${-parallax * 0.25} 0)`} fill="#ffd36b">
        {[
          [130, 700], [160, 800], [350, 640], [400, 760], [360, 880], [580, 780], [660, 820], [720, 760], [860, 680], [900, 800],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width={24} height={40} rx={12} opacity={0.75 + 0.25 * Math.sin(frame * 0.1 + i)} />
        ))}
      </g>
      {/* muro con arcos */}
      <g transform={`translate(${-parallax * 0.5} 0)`}>
        <rect x={-100} y={960} width={1300} height={300} fill="#7a6aa8" stroke={INK} strokeWidth={5} />
        {[-40, 200, 440, 680, 920].map((x, i) => (
          <g key={i}>
            <path d={`M ${x} 1260 L ${x} 1060 Q ${x + 80} 980 ${x + 160} 1060 L ${x + 160} 1260 Z`} fill="#3b2f66" stroke={INK} strokeWidth={5} />
            <path d={`M ${x + 40} 1000 l 30 0 l 0 110 l -15 -16 l -15 16 z`} fill={["#d8433c", "#2fae4f", "#e8b923", "#2f6fe4", "#d8433c"][i]} stroke={INK} strokeWidth={4} />
          </g>
        ))}
      </g>
      {/* piso */}
      <rect x={0} y={1240} width={1080} height={680} fill="url(#cy-floor)" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`h${i}`} x1={0} x2={1080} y1={1240 + i * i * 9} y2={1240 + i * i * 9} stroke="#4a4070" strokeWidth={4} />
      ))}
      {Array.from({ length: 13 }).map((_, i) => {
        const x = (i - 6) * 140;
        return <line key={`v${i}`} x1={540 + x * 0.6 - parallax * 0.8} y1={1240} x2={540 + x * 2.4 - parallax} y2={1920} stroke="#4a4070" strokeWidth={4} />;
      })}
      {/* faroles flotantes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = 90 + i * 180 - parallax * 0.6;
        const y = 860 + Math.sin(frame * 0.05 + i * 1.7) * 18 + (i % 2) * 60;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={30} fill="#ffd36b" opacity={0.25} />
            <rect x={x - 8} y={y - 22} width={16} height={36} rx={5} fill="#fff3c4" stroke={INK} strokeWidth={3} />
          </g>
        );
      })}
    </svg>
  );
};
