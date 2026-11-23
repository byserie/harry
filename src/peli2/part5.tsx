import { PartSpec } from "../engine/types";
import { AudioData } from "../engine/Part";
import { kf } from "../lib/pose";
import { Sparkles } from "../characters/Stickman";
import { INK } from "../characters/cast";
import { Svg } from "../scenes/bg1";
import { Bathroom, Corridor, Library, NightCastle } from "../scenes/bg2";
import { Confetti, Question, SortingHat, Spell, Voldemort } from "../scenes/props";
import { Banner, Flash, wordClock } from "../scenes/util";
import { Basilisk, Diary, Fang, Phoenix, SecretChamber, Sink, Sock, Sword, Tears, WallMessage } from "./assets";
import audioData from "../data/p2part5.audio.json";

const audio = audioData as AudioData;
const w = wordClock(audio);

const hMonstruo = w("hook", "monstruo");
const hChica = w("hook", "chica");
const hEnemigo = w("hook", "enemigo");

const bBasilisco = w("basilisco", "basilisco");
const bMirada = w("basilisco", "mirada");
const bCanerias = w("basilisco", "canerias");

const gMensaje = w("ginny", "mensaje");
const gLockhart = w("ginny", "lockhart");
const gMentira = w("ginny", "mentira");

const eMyrtle = w("entrada", "myrtle");
const eParsel = w("entrada", "parsel");
const eBorrar = w("entrada", "borrarles");
const eReves = w("entrada", "reves");

const rGinny = w("riddle", "ginny");
const rRiddle = w("riddle", "riddle");
const rVoldemort = w("riddle", "voldemort");

const fFawkes = w("fenix", "fawkes");
const fSombrero = w("fenix", "sombrero");
const fEspada = w("fenix", "espada");

const lAtaca = w("lucha", "ataca");
const lOjos = w("lucha", "ojos");
const lBoca = w("lucha", "boca");
const lColmillo = w("lucha", "colmillo");
const lLagrimas = w("lucha", "lagrimas");

const dClava = w("diario", "clava");
const dGrita = w("diario", "grita");
const dDespierta = w("diario", "despierta");

const oEngana = w("dobby", "engana");
const oMedia = w("dobby", "media");
const oLibre = w("dobby", "libre");

const cHogwarts = w("cierre", "hogwarts");

export const p2part5: PartSpec = {
  part: 5,
  title: "Harry Potter y la cámara secreta",
  scenes: {
    hook: {
      bg: SecretChamber,
      under: ({ t }) => (
        <Svg>
          {t > hMonstruo - 0.4 ? <Basilisk x={kf(t, [hMonstruo - 0.4, hMonstruo + 0.6], [1500, 1000])} y={760} s={0.9} t={t} flip open={0.6} /> : null}
        </Svg>
      ),
      fx: ({ t }) => <Svg>{t > hEnemigo - 0.3 ? <Voldemort x={540} y={520} s={0.7} t={t} k={kf(t, [hEnemigo - 0.3, hEnemigo + 0.3], [0, 0.85])} /> : null}</Svg>,
      chars: [
        { who: "harry", x: 260, y: 1460, wand: true, acts: [{ t: 4.4, glow: 0.4 }, { t: hMonstruo, expr: "surprise" }, { t: hMonstruo, pose: "wandAim" }, { t: hEnemigo, expr: "focus" }] },
        { who: "ginny", x: 620, y: 1420, s: 1.6, show: false, acts: [{ t: hChica - 0.2, show: true }, { t: hChica - 0.2, rot: -90, dur: 0.001 }, { t: hChica - 0.2, expr: "sleep" }] },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1050 },
        { t: hEnemigo, z: 1.1, y: 900 },
      ],
      sfx: [
        { t: hMonstruo - 0.3, s: "hiss", v: 0.7 },
        { t: hMonstruo, s: "roar", v: 0.6 },
        { t: hEnemigo, s: "rumble", v: 0.6 },
      ],
      shake: [[hMonstruo, 0.5, 0.8]],
    },

    basilisco: {
      bg: Library,
      fx: ({ t }) => {
        const k = kf(t, [bBasilisco - 0.4, bBasilisco + 0.2, 9, 9.5], [0, 1, 1, 0]);
        return k > 0 ? (
          <Svg>
            <g opacity={k}>
              <rect x={90} y={110} width={900} height={460} rx={30} fill="#0d2a22" stroke={INK} strokeWidth={10} />
              <clipPath id="bp">
                <rect x={100} y={120} width={880} height={440} rx={26} />
              </clipPath>
              <g clipPath="url(#bp)">
                {[0, 1, 2].map((i) => (
                  <rect key={i} x={100} y={190 + i * 130} width={880} height={50} fill="#3a4c46" stroke={INK} strokeWidth={4} />
                ))}
                <Basilisk x={kf(t, [bBasilisco, bCanerias + 2], [1100, 760])} y={330} s={0.55} t={t} flip open={t > bMirada ? 0.8 : 0.3} />
              </g>
            </g>
          </Svg>
        ) : null;
      },
      chars: [
        { who: "harry", x: 380, y: 1440, holding: () => <rect x={-10} y={-30} width={46} height={56} fill="#fff6dc" stroke={INK} strokeWidth={4} />, acts: [{ t: 0, pose: "hold" }, { t: 0, expr: "focus" }, { t: bBasilisco, expr: "surprise" }] },
        { who: "ron", x: 140, y: 1450, acts: [{ t: bMirada, expr: "surprise" }, { t: bMirada, pose: "cower" }] },
      ],
      cam: [
        { t: 0, z: 1.3, x: 380, y: 1150 },
        { t: bBasilisco, z: 1.0, x: 540, y: 1000 },
      ],
      sfx: [
        { t: bBasilisco, s: "hiss", v: 0.6 },
        { t: bMirada, s: "zap", v: 0.4 },
        { t: bCanerias, s: "rumble", v: 0.5 },
      ],
      trans: "fade",
    },

    ginny: {
      bg: ({ t }) => <Corridor t={t} dark />,
      fx: ({ t }) => (
        <Svg>
          <WallMessage t={t} t0={gMensaje - 0.2} y={420} lines={["GINNY ESTÁ", "EN LA CÁMARA"]} />
        </Svg>
      ),
      chars: [
        { who: "ron", x: 150, y: 1450, acts: [{ t: gMensaje, expr: "sadness" }, { t: gMensaje, pose: "sad" }] },
        { who: "harry", x: 340, y: 1460, acts: [{ t: gMensaje, expr: "surprise" }, { t: gLockhart, look: 0.9 }, { t: gMentira, expr: "anger" }] },
        {
          who: "lockhart",
          x: 1300,
          y: 1440,
          holding: () => <rect x={-20} y={-10} width={70} height={60} rx={8} fill="#8a5a2b" stroke={INK} strokeWidth={4} />,
          acts: [
            { t: gLockhart - 0.5, walk: 760, run: true },
            { t: gLockhart + 0.8, face: -1 },
            { t: gLockhart + 0.8, expr: "surprise" },
            { t: gMentira - 0.6, pose: "shrug" },
            { t: gMentira - 0.6, expr: "sadness" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1000 },
        { t: gLockhart, z: 1.1, x: 600, y: 1100 },
        { t: gMentira, z: 1.4, x: 740, y: 1000 },
      ],
      sfx: [
        { t: gMensaje - 0.2, s: "rumble", v: 0.6 },
        { t: gLockhart - 0.5, s: "step", v: 0.5 },
      ],
      overlay: ({ t }) => <Banner t={t} text="¡Todo era mentira!" t0={gMentira} t1={gMentira + 2.2} color="#9cf2dc" />,
      trans: "wipe",
    },

    entrada: {
      bg: Bathroom,
      under: ({ t }) => (
        <Svg>
          <Sink x={560} y={1330} s={1.1} open={kf(t, [eParsel, eParsel + 1.2], [0, 1])} />
        </Svg>
      ),
      fx: ({ t }) => (
        <Svg>
          <Spell t={t} t0={eBorrar - 0.1} x0={920} y0={900} x1={600} y1={950} color="#ff6bd1" dur={0.4} />
          <Spell t={t} t0={eReves - 0.3} x0={600} y0={950} x1={900} y1={820} color="#ff6bd1" dur={0.35} />
          <Question t={t} x={880} y={700} t0={eReves + 0.3} />
        </Svg>
      ),
      chars: [
        { who: "myrtle", x: 140, y: 1300, opacity: 0.65, acts: [{ t: 0, expr: "sadness" }, { t: eMyrtle, pose: "sad" }, { t: eMyrtle + 2, move: { y: 1260 }, dur: 1 }] },
        { who: "ron", x: 330, y: 1450, acts: [{ t: eParsel + 0.4, expr: "surprise" }] },
        { who: "harry", x: 470, y: 1460, acts: [{ t: eParsel - 0.3, pose: "talk", dur: 1.6 }, { t: eParsel - 0.3, expr: "focus" }, { t: eBorrar, expr: "surprise" }] },
        { who: "lockhart", x: 900, y: 1440, facing: -1, wand: true, acts: [{ t: eBorrar - 0.4, pose: "wandAim", dur: 1 }, { t: eBorrar - 0.4, expr: "anger" }, { t: eBorrar - 0.3, glow: 1 }, { t: eReves, glow: 0 }, { t: eReves, rot: 15, dur: 0.2 }, { t: eReves + 0.3, rot: 0, dur: 0.3 }, { t: eReves + 0.3, expr: "joy" }, { t: eReves + 0.3, pose: "shrug" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: eParsel, z: 1.3, x: 540, y: 1150 },
        { t: eBorrar, z: 1.05, x: 640, y: 1050 },
        { t: eReves + 0.5, z: 1.4, x: 860, y: 950 },
      ],
      sfx: [
        { t: eMyrtle, s: "chime", v: 0.3 },
        { t: eParsel, s: "hiss", v: 0.6 },
        { t: eParsel + 0.4, s: "rumble", v: 0.6 },
        { t: eBorrar - 0.1, s: "zap", v: 0.5 },
        { t: eReves - 0.3, s: "zap", v: 0.5 },
        { t: eReves, s: "boom", v: 0.5 },
      ],
      shake: [[eReves, 0.5]],
      trans: "circle",
    },

    riddle: {
      bg: SecretChamber,
      fx: ({ t }) => <Svg>{t > rVoldemort - 0.3 ? <Voldemort x={780} y={620} s={0.75} t={t} k={kf(t, [rVoldemort - 0.3, rVoldemort + 0.3], [0, 0.8])} /> : null}</Svg>,
      chars: [
        { who: "ginny", x: 520, y: 1440, s: 1.6, acts: [{ t: 0, rot: -90, dur: 0.001 }, { t: 0, expr: "sleep" }] },
        { who: "harry", x: -150, y: 1460, acts: [{ t: 0.1, walk: 230, run: true }, { t: rGinny, expr: "sadness" }, { t: rRiddle, expr: "surprise" }, { t: rVoldemort, pose: "surprised" }] },
        { who: "riddle", x: 820, y: 1440, facing: -1, acts: [{ t: rRiddle, expr: "joy" }, { t: rRiddle, pose: "talk", dur: 2 }, { t: rVoldemort - 0.2, expr: "anger" }, { t: rVoldemort - 0.2, pose: "armsUp" }] },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1100 },
        { t: rRiddle, z: 1.3, x: 760, y: 1050 },
        { t: rVoldemort, z: 1.1, x: 640, y: 900 },
      ],
      sfx: [
        { t: rRiddle, s: "chime", v: 0.3 },
        { t: rVoldemort - 0.2, s: "rumble", v: 0.8 },
        { t: rVoldemort, s: "roar", v: 0.4 },
      ],
      shake: [[rVoldemort, 0.6, 0.8]],
      overlay: ({ t }) => <Flash t={t} at={rVoldemort - 0.2} dur={0.4} color="#ff2b2b" />,
      trans: "fade",
    },

    fenix: {
      bg: SecretChamber,
      fx: ({ t }) => {
        const px = kf(t, [fFawkes - 0.5, fSombrero], [1300, 520]);
        const py = kf(t, [fFawkes - 0.5, fSombrero], [300, 700]);
        const dropped = t > fSombrero + 0.4;
        return (
          <Svg>
            {t > fFawkes - 0.5 ? <Phoenix x={dropped ? kf(t, [fSombrero + 0.4, fSombrero + 2], [520, 820]) : px} y={dropped ? kf(t, [fSombrero + 0.4, fSombrero + 2], [700, 500]) : py} s={1.1} t={t} flip /> : null}
            {t > fFawkes - 0.5 ? <SortingHat x={dropped ? 400 : px} y={dropped ? kf(t, [fSombrero + 0.4, fSombrero + 0.8], [800, 1420]) : py + 110} s={0.6} t={t} /> : null}
            {t > fEspada - 0.4 && t < fEspada + 0.6 ? <Sword x={400} y={kf(t, [fEspada - 0.4, fEspada + 0.3], [1400, 1050])} s={1} glow={1} /> : null}
            {t > fEspada - 0.4 && t < fEspada + 1.5 ? <Sparkles x={400} y={1150} intensity={1.4} seed={6} count={22} /> : null}
          </Svg>
        );
      },
      chars: [
        { who: "ginny", x: 760, y: 1440, s: 1.6, acts: [{ t: 0, rot: -90, dur: 0.001 }, { t: 0, expr: "sleep" }] },
        {
          who: "harry",
          x: 260,
          y: 1460,
          holding: (t) => (t > fEspada + 0.5 ? <Sword x={0} y={0} s={0.45} r={180} glow={0.6} /> : null),
          acts: [{ t: fFawkes, expr: "surprise" }, { t: fFawkes, look: 0.9 }, { t: fEspada + 0.5, pose: "wandUp" }, { t: fEspada + 0.5, expr: "focus" }],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1050 },
        { t: fSombrero, z: 1.2, x: 460, y: 1100 },
        { t: fEspada, z: 1.35, x: 380, y: 1050 },
      ],
      sfx: [
        { t: fFawkes - 0.5, s: "flutter", v: 0.6 },
        { t: fFawkes, s: "chime", v: 0.5 },
        { t: fSombrero + 0.6, s: "pop", v: 0.4 },
        { t: fEspada - 0.3, s: "sparkle", v: 0.7 },
        { t: fEspada, s: "fanfare", v: 0.4 },
      ],
      trans: "zoom",
    },

    lucha: {
      bg: SecretChamber,
      under: ({ t }) => {
        const dead = t > lBoca + 0.3;
        return (
          <Svg>
            <Basilisk x={kf(t, [lAtaca - 0.4, lAtaca + 0.3, lBoca, lBoca + 1.5], [1400, 900, 720, 980])} y={kf(t, [lBoca, lBoca + 1.5], [860, 1300])} s={1} t={dead ? lBoca : t} flip open={dead ? 1 : 0.7} blind={t > lOjos + 0.3} />
          </Svg>
        );
      },
      fx: ({ t }) => (
        <Svg>
          {t < lLagrimas - 0.6 ? <Phoenix x={kf(t, [0, lOjos - 0.3, lOjos + 0.3, lBoca], [1200, 820, 760, 1100])} y={kf(t, [0, lOjos - 0.3, lOjos + 0.3, lBoca], [300, 640, 660, 300])} s={0.9} t={t} flip /> : <Phoenix x={kf(t, [lLagrimas - 0.6, lLagrimas], [1100, 520])} y={kf(t, [lLagrimas - 0.6, lLagrimas], [300, 1100])} s={0.8} t={t} flip />}
          {t > lColmillo && t < lLagrimas + 0.2 ? <Fang x={420} y={1120} s={0.8} r={40} /> : null}
          {t > lLagrimas ? <Tears t={t} x={430} y={1100} /> : null}
        </Svg>
      ),
      chars: [
        {
          who: "harry",
          x: 300,
          y: 1460,
          holding: (t) => (t < lColmillo ? <Sword x={0} y={0} s={0.45} r={180} glow={0.5} /> : null),
          acts: [
            { t: 0, pose: "wandUp" },
            { t: 0, expr: "focus" },
            { t: lBoca - 0.4, walk: 520, run: true },
            { t: lBoca, pose: "wandAim", dur: 0.6 },
            { t: lColmillo, expr: "sadness" },
            { t: lColmillo, pose: "cower" },
            { t: lLagrimas + 0.6, expr: "joy" },
            { t: lLagrimas + 0.6, pose: "stand" },
          ],
        },
      ],
      cam: [
        { t: 0, z: 1.0, y: 1000 },
        { t: lOjos, z: 1.2, x: 760, y: 800 },
        { t: lBoca, z: 1.1, x: 620, y: 1000 },
        { t: lLagrimas, z: 1.45, x: 480, y: 1100 },
      ],
      sfx: [
        { t: lAtaca - 0.3, s: "hiss", v: 0.7 },
        { t: lAtaca, s: "roar", v: 0.6 },
        { t: lOjos, s: "flutter", v: 0.6 },
        { t: lOjos + 0.2, s: "roar", v: 0.5 },
        { t: lBoca, s: "boom", v: 0.9 },
        { t: lColmillo, s: "zap", v: 0.4 },
        { t: lLagrimas, s: "chime", v: 0.6 },
      ],
      shake: [
        [lAtaca, 0.5],
        [lBoca, 1.0, 0.6],
      ],
      overlay: ({ t }) => <Flash t={t} at={lBoca} dur={0.3} />,
      trans: "fade",
    },

    diario: {
      bg: SecretChamber,
      fx: ({ t }) => (
        <Svg>
          <Diary x={560} y={1400} s={1} hole={t > dClava + 0.2} glow={t > dClava ? kf(t, [dClava, dClava + 0.3, dGrita + 1], [0, 1.5, 0]) : 0} />
          {t > dClava - 0.4 && t < dClava + 0.6 ? <Fang x={560} y={kf(t, [dClava - 0.4, dClava], [1100, 1380])} s={0.9} r={180} /> : null}
          {t > dClava && t < dGrita + 1.5 ? <Sparkles x={560} y={1380} intensity={1.6} seed={12} count={26} color="#ffffff" /> : null}
        </Svg>
      ),
      chars: [
        { who: "ginny", x: 820, y: 1440, s: 1.6, acts: [{ t: 0, rot: -90, dur: 0.001 }, { t: 0, expr: "sleep" }, { t: dDespierta - 0.2, rot: 0, dur: 0.5 }, { t: dDespierta, expr: "surprise" }, { t: dDespierta + 0.6, expr: "joy" }] },
        { who: "harry", x: 380, y: 1460, acts: [{ t: dClava - 0.5, pose: "cower", dur: 1.2 }, { t: dClava - 0.5, expr: "focus" }, { t: dDespierta, expr: "joy" }] },
        { who: "riddle", x: 760, y: 1440, facing: -1, acts: [{ t: 0, expr: "anger" }, { t: dGrita - 0.2, expr: "surprise" }, { t: dGrita - 0.2, pose: "armsUp" }, { t: dGrita, alpha: 0, dur: 0.6 }] },
      ],
      cam: [
        { t: 0, z: 1.2, x: 540, y: 1200 },
        { t: dGrita, z: 1.0, x: 540, y: 1100 },
      ],
      sfx: [
        { t: dClava, s: "crash", v: 0.6 },
        { t: dGrita - 0.2, s: "roar", v: 0.5 },
        { t: dGrita, s: "sparkle", v: 0.6 },
        { t: dDespierta, s: "chime", v: 0.5 },
      ],
      overlay: ({ t }) => <Flash t={t} at={dGrita} dur={0.5} />,
      trans: "circle",
    },

    dobby: {
      bg: ({ t }) => <Corridor t={t} />,
      fx: ({ t }) => (
        <Svg>
          {t > oEngana + 0.4 && t < oMedia + 0.4 ? <Diary x={kf(t, [oEngana + 0.4, oMedia - 0.2], [480, 720])} y={kf(t, [oEngana + 0.4, oMedia - 0.6, oMedia - 0.2], [1100, 900, 1150])} s={0.45} r={t * 200} /> : null}
          {t > oMedia - 0.2 ? <Sock x={kf(t, [oMedia - 0.2, oMedia + 0.3], [720, 330])} y={kf(t, [oMedia - 0.2, oMedia + 0.3], [1150, 1200])} s={0.8} r={kf(t, [oMedia - 0.2, oMedia + 0.3], [0, 360])} /> : null}
          {t > oLibre - 0.3 && t < oLibre + 2 ? <Sparkles x={300} y={1200} intensity={1.4} seed={21} count={24} /> : null}
          <Confetti t={t} t0={oLibre} n={40} colors={["#8fd14f", "#ffffff", "#ffe66d"]} />
        </Svg>
      ),
      chars: [
        { who: "harry", x: 480, y: 1460, holding: (t) => (t < oEngana + 0.4 ? <Diary x={10} y={0} s={0.4} /> : null), acts: [{ t: oEngana - 0.3, pose: "hold", dur: 0.8 }, { t: oEngana, expr: "joy" }] },
        { who: "lucius", x: 800, y: 1440, facing: -1, acts: [{ t: 0, expr: "anger" }, { t: oMedia - 0.6, pose: "point", dur: 0.6 }, { t: oLibre, expr: "anger" }, { t: oLibre, pose: "angry" }] },
        { who: "dobby", x: 280, y: 1460, acts: [{ t: 0, expr: "sadness" }, { t: oMedia + 0.3, pose: "hold", dur: 0.8 }, { t: oMedia + 0.3, expr: "surprise" }, { t: oLibre - 0.2, expr: "joy" }, { t: oLibre - 0.2, pose: "cheer" }] },
      ],
      cam: [
        { t: 0, z: 1.05, y: 1100 },
        { t: oMedia, z: 1.2, x: 480, y: 1150 },
        { t: oLibre, z: 1.5, x: 320, y: 1150 },
      ],
      sfx: [
        { t: oMedia - 0.2, s: "whoosh", v: 0.4 },
        { t: oLibre - 0.3, s: "sparkle", v: 0.7 },
        { t: oLibre, s: "fanfare", v: 0.5 },
      ],
      overlay: ({ t }) => <Banner t={t} text="¡Dobby es libre!" t0={oLibre} t1={oLibre + 2.4} color="#bff28f" />,
      trans: "slide",
    },

    cierre: {
      bg: NightCastle,
      chars: [
        { who: "ginny", x: 120, y: 1440, acts: [{ t: 0, expr: "joy" }, { t: 0.5, pose: "wave", dur: 3 }] },
        { who: "ron", x: 300, y: 1440, acts: [{ t: 0, expr: "joy" }, { t: 0.3, pose: "wave", dur: 3 }] },
        { who: "harry", x: 520, y: 1450, acts: [{ t: 0, expr: "joy" }, { t: cHogwarts, pose: "cheer", dur: 2 }] },
        { who: "hermione", x: 740, y: 1440, facing: -1, acts: [{ t: 0, expr: "joy" }, { t: 0.6, pose: "wave", dur: 3 }] },
        { who: "hagrid", x: 960, y: 1470, s: 1.4, facing: -1, acts: [{ t: 0, expr: "joy" }] },
      ],
      cam: [
        { t: 0, z: 1.1, y: 1100 },
        { t: 8.5, z: 1.0, y: 1150 },
      ],
      sfx: [{ t: cHogwarts, s: "chime", v: 0.5 }],
      trans: "circle",
    },
  },
};

export const p2part5Audio = audio;
