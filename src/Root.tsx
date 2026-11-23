import { Composition, Series, Still } from "remotion";
import { Miniatura, Miniatura1, Portada } from "./Thumb";
import { Avatar, Banner } from "./Brand";
import { p2full, p2fullAudio } from "./peli2d/full";
import { p1full, p1fullAudio } from "./peli1d/full";
import { LandCtx } from "./engine/layout";
import { p3full, p3fullAudio } from "./peli3/full";
import { p4full, p4fullAudio } from "./peli4/full";
import { p5full, p5fullAudio } from "./peli5/full";
import { p6full, p6fullAudio } from "./peli6/full";
import { p7full, p7fullAudio } from "./peli7/full";
import { p8full, p8fullAudio } from "./peli8/full";
import { ShortCompositions } from "./shorts/register";
import { TestScene } from "./scenes/TestScene";
import { Part } from "./engine/Part";
import { part1, part1Audio } from "./scenes/part1";
import { part2, part2Audio } from "./scenes/part2";
import { part3, part3Audio } from "./scenes/part3";
import { part4, part4Audio } from "./scenes/part4";
import { part5, part5Audio } from "./scenes/part5";
import { p2part1, p2part1Audio } from "./peli2/part1";
import { p2part2, p2part2Audio } from "./peli2/part2";
import { p2part3, p2part3Audio } from "./peli2/part3";
import { p2part4, p2part4Audio } from "./peli2/part4";
import { p2part5, p2part5Audio } from "./peli2/part5";
import { p2dpart1, p2dpart1Audio } from "./peli2d/part1";
import { p2dpart2, p2dpart2Audio } from "./peli2d/part2";
import { p2dpart3, p2dpart3Audio } from "./peli2d/part3";
import { p2dpart4, p2dpart4Audio } from "./peli2d/part4";
import { p2dpart5, p2dpart5Audio } from "./peli2d/part5";

const Parte1 = () => <Part spec={part1} audio={part1Audio} audioFile="audio/part1.wav" />;
const Parte2 = () => <Part spec={part2} audio={part2Audio} audioFile="audio/part2.wav" />;
const Parte3 = () => <Part spec={part3} audio={part3Audio} audioFile="audio/part3.wav" />;
const Parte4 = () => <Part spec={part4} audio={part4Audio} audioFile="audio/part4.wav" />;
const Parte5 = () => <Part spec={part5} audio={part5Audio} audioFile="audio/part5.wav" />;

const P2Parte1 = () => <Part spec={p2part1} audio={p2part1Audio} audioFile="audio/p2part1.wav" />;

const P2Parte2 = () => <Part spec={p2part2} audio={p2part2Audio} audioFile="audio/p2part2.wav" />;
const P2Parte3 = () => <Part spec={p2part3} audio={p2part3Audio} audioFile="audio/p2part3.wav" />;

const P2Parte4 = () => <Part spec={p2part4} audio={p2part4Audio} audioFile="audio/p2part4.wav" />;
const P2Parte5 = () => <Part spec={p2part5} audio={p2part5Audio} audioFile="audio/p2part5.wav" />;

const P2DParte1 = () => <Part spec={p2dpart1} audio={p2dpart1Audio} audioFile="audio/p2dpart1.wav" />;
const P2DParte2 = () => <Part spec={p2dpart2} audio={p2dpart2Audio} audioFile="audio/p2dpart2.wav" />;
const P2DParte3 = () => <Part spec={p2dpart3} audio={p2dpart3Audio} audioFile="audio/p2dpart3.wav" />;
const P2DParte4 = () => <Part spec={p2dpart4} audio={p2dpart4Audio} audioFile="audio/p2dpart4.wav" />;
const P2DParte5 = () => <Part spec={p2dpart5} audio={p2dpart5Audio} audioFile="audio/p2dpart5.wav" />;

const P2DCompleta = () => (
  <Series>
    <Series.Sequence durationInFrames={p2dpart1Audio.durationInFrames}><P2DParte1 /></Series.Sequence>
    <Series.Sequence durationInFrames={p2dpart2Audio.durationInFrames}><P2DParte2 /></Series.Sequence>
    <Series.Sequence durationInFrames={p2dpart3Audio.durationInFrames}><P2DParte3 /></Series.Sequence>
    <Series.Sequence durationInFrames={p2dpart4Audio.durationInFrames}><P2DParte4 /></Series.Sequence>
    <Series.Sequence durationInFrames={p2dpart5Audio.durationInFrames}><P2DParte5 /></Series.Sequence>
  </Series>
);
const TOTAL_P2D = [p2dpart1Audio, p2dpart2Audio, p2dpart3Audio, p2dpart4Audio, p2dpart5Audio].reduce((a, b) => a + b.durationInFrames, 0);

const P2Full = () => <Part spec={p2full} audio={p2fullAudio} audioFile="audio/p2full.wav" />;

const P1Full = () => <Part spec={p1full} audio={p1fullAudio} audioFile="audio/p1full.wav" />;

const P1FullLand = () => (
  <LandCtx.Provider value>
    <P1Full />
  </LandCtx.Provider>
);
const P2FullLand = () => (
  <LandCtx.Provider value>
    <P2Full />
  </LandCtx.Provider>
);

const P3Full = () => <Part spec={p3full} audio={p3fullAudio} audioFile="audio/p3full.wav" />;
const P3FullLand = () => (
  <LandCtx.Provider value>
    <P3Full />
  </LandCtx.Provider>
);

const P4Full = () => <Part spec={p4full} audio={p4fullAudio} audioFile="audio/p4full.wav" />;
const P4FullLand = () => (
  <LandCtx.Provider value>
    <P4Full />
  </LandCtx.Provider>
);

const P5Full = () => <Part spec={p5full} audio={p5fullAudio} audioFile="audio/p5full.wav" />;
const P5FullLand = () => (
  <LandCtx.Provider value>
    <P5Full />
  </LandCtx.Provider>
);

const P6Full = () => <Part spec={p6full} audio={p6fullAudio} audioFile="audio/p6full.wav" />;
const P6FullLand = () => (
  <LandCtx.Provider value>
    <P6Full />
  </LandCtx.Provider>
);

const P7Full = () => <Part spec={p7full} audio={p7fullAudio} audioFile="audio/p7full.wav" />;
const P7FullLand = () => (
  <LandCtx.Provider value>
    <P7Full />
  </LandCtx.Provider>
);

const P8Full = () => <Part spec={p8full} audio={p8fullAudio} audioFile="audio/p8full.wav" />;
const P8FullLand = () => (
  <LandCtx.Provider value>
    <P8Full />
  </LandCtx.Provider>
);

const V = { fps: 30, width: 1080, height: 1920 };

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Prueba" component={TestScene} durationInFrames={150} {...V} />
      <Composition id="Parte1" component={Parte1} durationInFrames={part1Audio.durationInFrames} {...V} />
      <Composition id="Parte2" component={Parte2} durationInFrames={part2Audio.durationInFrames} {...V} />
      <Composition id="Parte3" component={Parte3} durationInFrames={part3Audio.durationInFrames} {...V} />
      <Composition id="Parte4" component={Parte4} durationInFrames={part4Audio.durationInFrames} {...V} />
      <Composition id="Parte5" component={Parte5} durationInFrames={part5Audio.durationInFrames} {...V} />
      <Composition id="P2Parte1" component={P2Parte1} durationInFrames={p2part1Audio.durationInFrames} {...V} />
      <Composition id="P2Parte2" component={P2Parte2} durationInFrames={p2part2Audio.durationInFrames} {...V} />
      <Composition id="P2Parte3" component={P2Parte3} durationInFrames={p2part3Audio.durationInFrames} {...V} />
      <Composition id="P2Parte4" component={P2Parte4} durationInFrames={p2part4Audio.durationInFrames} {...V} />
      <Composition id="P2Parte5" component={P2Parte5} durationInFrames={p2part5Audio.durationInFrames} {...V} />
      <Composition id="P2DParte1" component={P2DParte1} durationInFrames={p2dpart1Audio.durationInFrames} {...V} />
      <Composition id="P2DParte2" component={P2DParte2} durationInFrames={p2dpart2Audio.durationInFrames} {...V} />
      <Composition id="P2DParte3" component={P2DParte3} durationInFrames={p2dpart3Audio.durationInFrames} {...V} />
      <Composition id="P2DParte4" component={P2DParte4} durationInFrames={p2dpart4Audio.durationInFrames} {...V} />
      <Composition id="P2DParte5" component={P2DParte5} durationInFrames={p2dpart5Audio.durationInFrames} {...V} />
      <Composition id="P2DCompleta" component={P2DCompleta} durationInFrames={TOTAL_P2D} {...V} />
      <Composition id="P2Full" component={P2Full} durationInFrames={p2fullAudio.durationInFrames} {...V} />
      <Still id="Miniatura" component={Miniatura} width={1280} height={720} />
      <Still id="Portada" component={Portada} width={1080} height={1920} />
      <Composition id="P1Full" component={P1Full} durationInFrames={p1fullAudio.durationInFrames} {...V} />
      <Composition id="P1FullYT" component={P1FullLand} durationInFrames={p1fullAudio.durationInFrames} fps={30} width={1920} height={1080} />
      <Composition id="P2FullYT" component={P2FullLand} durationInFrames={p2fullAudio.durationInFrames} fps={30} width={1920} height={1080} />
      <Still id="Avatar" component={Avatar} width={800} height={800} />
      <Still id="BannerCanal" component={Banner} width={2560} height={1440} />
      <Still id="Miniatura1" component={Miniatura1} width={1280} height={720} />
      <Composition id="P3Full" component={P3Full} durationInFrames={p3fullAudio.durationInFrames} {...V} />
      <Composition id="P3FullYT" component={P3FullLand} durationInFrames={p3fullAudio.durationInFrames} fps={30} width={1920} height={1080} />
      <Composition id="P4FullYT" component={P4FullLand} durationInFrames={p4fullAudio.durationInFrames} fps={30} width={1920} height={1080} />
      <Composition id="P5FullYT" component={P5FullLand} durationInFrames={p5fullAudio.durationInFrames} fps={30} width={1920} height={1080} />
      <Composition id="P6FullYT" component={P6FullLand} durationInFrames={p6fullAudio.durationInFrames} fps={30} width={1920} height={1080} />
      <Composition id="P7FullYT" component={P7FullLand} durationInFrames={p7fullAudio.durationInFrames} fps={30} width={1920} height={1080} />
      <Composition id="P8FullYT" component={P8FullLand} durationInFrames={p8fullAudio.durationInFrames} fps={30} width={1920} height={1080} />
      <ShortCompositions />
    </>
  );
};
