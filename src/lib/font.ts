import { continueRender, delayRender, staticFile } from "remotion";

export const FONT = "Fredoka, Inter, sans-serif";

const faces = [
  new FontFace("Fredoka", `url(${staticFile("fonts/fredoka-latin.woff2")}) format("woff2")`, {
    weight: "300 700",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215",
  }),
  new FontFace("Fredoka", `url(${staticFile("fonts/fredoka-latin-ext.woff2")}) format("woff2")`, {
    weight: "300 700",
    unicodeRange: "U+0100-02AF, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
  }),
];

const handle = delayRender("Cargando fuente Fredoka");
Promise.all(faces.map((f) => f.load()))
  .then((loaded) => {
    loaded.forEach((f) => document.fonts.add(f));
    continueRender(handle);
  })
  .catch((e) => {
    console.error(e);
    continueRender(handle);
  });
