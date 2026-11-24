import React from "react";
import { AbsoluteFill } from "remotion";
import { Scene } from "../engine/Scene";
import { SceneSpec } from "../engine/types";
import { LandCtx } from "../engine/layout";
import { Svg } from "../scenes/bg1";
import { PandoraDay, PandoraNight, Woodsprites } from "./assets";

const noche: SceneSpec = {
  bg: ({ t }) => <PandoraNight t={t} />,
  fx: ({ t }) => (
    <Svg>
      <Woodsprites t={t} n={9} cx={540} cy={950} />
    </Svg>
  ),
  chars: [
    { who: "jakenavi", x: 380, y: 1460, acts: [{ t: 0, expr: "surprise" }, { t: 0, look: 1 }] },
    { who: "neytiri", x: 720, y: 1460, facing: -1, acts: [{ t: 0, expr: "focus" }] },
  ],
  cam: [{ t: 0, z: 1.0, y: 1100 }, { t: 5, z: 1.12, y: 1080 }],
};

const elenco: SceneSpec = {
  bg: ({ t }) => <PandoraDay t={t} />,
  chars: [
    { who: "jake", x: 90, y: 1500, s: 1.5 },
    { who: "grace", x: 230, y: 1500, s: 1.5 },
    { who: "quaritch", x: 380, y: 1500, s: 1.5, acts: [{ t: 0, expr: "anger" }] },
    { who: "jakenavi", x: 540, y: 1500, s: 1.5, acts: [{ t: 0, expr: "joy" }] },
    { who: "neytiri", x: 700, y: 1500, s: 1.5, facing: -1 },
    { who: "eytukan", x: 860, y: 1500, s: 1.5, facing: -1 },
    { who: "tsutey", x: 1000, y: 1500, s: 1.5, facing: -1, acts: [{ t: 0, expr: "anger" }] },
  ],
  cam: [{ t: 0, z: 1.0, y: 1150 }],
};

export const MuestraNoche: React.FC = () => <AbsoluteFill><Scene spec={noche} first noSfx /></AbsoluteFill>;
export const MuestraElenco: React.FC = () => <AbsoluteFill><Scene spec={elenco} first noSfx /></AbsoluteFill>;
export const MuestraNocheYT: React.FC = () => (
  <LandCtx.Provider value>
    <MuestraNoche />
  </LandCtx.Provider>
);
