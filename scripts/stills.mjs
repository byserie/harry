// Uso: node scripts/stills.mjs Parte1 30,200,400 out/sheet.png
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { execFileSync } from "node:child_process";
import path from "node:path";
const [comp, framesArg, outSheet] = process.argv.slice(2);
const frames = framesArg.split(",").map(Number);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts"), enableCaching: true });
import fs from "node:fs";
const browserExecutable = fs.existsSync("/opt/pw-browsers/chromium_headless_shell") ? "/opt/pw-browsers/chromium_headless_shell" : null;
const composition = await selectComposition({ serveUrl, id: comp, browserExecutable });
const files = [];
for (const f of frames) {
  const output = `/tmp/claude-0/st-${f}.png`;
  await renderStill({ composition, serveUrl, output, frame: f, scale: 0.3, browserExecutable });
  files.push(output);
}
const args = ["-loglevel", "error", "-y"];
files.forEach((f) => args.push("-i", f));
const cols = Math.min(6, files.length);
const rows = Math.ceil(files.length / cols);
let filter = "";
if (files.length === 1) filter = "[0:v]copy";
else {
  const layout = files.map((_, i) => `${(i % cols) * 324}_${Math.floor(i / cols) * 576}`).join("|");
  filter = files.map((_, i) => `[${i}:v]`).join("") + `xstack=inputs=${files.length}:layout=${layout}:fill=black`;
}
args.push("-filter_complex", filter, outSheet);
execFileSync("ffmpeg", args);
console.log("ok", outSheet, rows);
