#!/usr/bin/env node
// Genera fotos y videos de moda con IA usando la API de fal.ai.
//
// La clave NO está en este archivo: la agrega el proxy del entorno de Claude
// (o, en tu compu, la variable de entorno FAL_KEY).
//
// Uso:
//   node scripts/fal.mjs imagen --ropa remera.jpg --prompt "..." [--salida out/moda/modelo.png] [--cantidad 2]
//   node scripts/fal.mjs video  --foto out/moda/modelo.png --prompt "..." [--duracion 5|10] [--salida out/moda/baile.mp4]
//   (opcional en ambos: --modelo <endpoint de fal>)

import fs from "node:fs";
import path from "node:path";

const MODELOS = {
  imagen: "fal-ai/nano-banana/edit",
  video: "fal-ai/kling-video/v2.1/standard/image-to-video",
};

const NEGATIVO_VIDEO =
  "blurry, distorted logo, changed t-shirt print, deformed text, extra fingers, deformed hands, low quality";

function args(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) out[a.slice(2)] = argv[++i];
    else out._.push(a);
  }
  return out;
}

function dataUri(file) {
  const ext = path.extname(file).slice(1).toLowerCase().replace("jpg", "jpeg");
  const b64 = fs.readFileSync(file).toString("base64");
  return `data:image/${ext};base64,${b64}`;
}

const HEADERS = {
  "Content-Type": "application/json",
  // El proxy reemplaza este valor por la clave real.
  Authorization: `Key ${process.env.FAL_KEY || "proxy-injected"}`,
};

async function pedir(url, opts = {}) {
  const r = await fetch(url, { ...opts, headers: HEADERS });
  const texto = await r.text();
  if (!r.ok) throw new Error(`HTTP ${r.status} en ${url}\n${texto.slice(0, 800)}`);
  return JSON.parse(texto);
}

async function correr(modelo, entrada) {
  console.log(`→ Enviando a ${modelo}...`);
  const cola = await pedir(`https://queue.fal.run/${modelo}`, {
    method: "POST",
    body: JSON.stringify(entrada),
  });
  const inicio = Date.now();
  let ultimo = "";
  for (;;) {
    await new Promise((res) => setTimeout(res, 4000));
    const st = await pedir(cola.status_url);
    if (st.status !== ultimo) {
      ultimo = st.status;
      console.log(`  estado: ${st.status} (${Math.round((Date.now() - inicio) / 1000)}s)`);
    }
    if (st.status === "COMPLETED") break;
    if (Date.now() - inicio > 20 * 60 * 1000) throw new Error("Tardó más de 20 minutos");
  }
  return pedir(cola.response_url);
}

async function bajar(url, destino) {
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  const r = await fetch(url);
  if (!r.ok) throw new Error(`No se pudo bajar ${url}: HTTP ${r.status}`);
  fs.writeFileSync(destino, Buffer.from(await r.arrayBuffer()));
  console.log(`✔ Guardado: ${destino}`);
}

const sello = () => new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);

async function main() {
  const a = args(process.argv.slice(2));
  const cmd = a._[0];
  if (!a.prompt || !["imagen", "video"].includes(cmd)) {
    console.log(fs.readFileSync(new URL(import.meta.url)).toString().split("\n").slice(1, 13).join("\n"));
    process.exit(1);
  }

  if (cmd === "imagen") {
    const ropas = (a.ropa || "").split(",").filter(Boolean);
    if (!ropas.length) throw new Error("Falta --ropa <foto de la prenda>");
    const res = await correr(a.modelo || MODELOS.imagen, {
      prompt: a.prompt,
      image_urls: ropas.map(dataUri),
      num_images: Number(a.cantidad || 1),
      output_format: "png",
    });
    const base = a.salida || `out/moda/modelo-${sello()}.png`;
    for (const [i, img] of (res.images || []).entries()) {
      const destino = res.images.length > 1 ? base.replace(/(\.\w+)$/, `-${i + 1}$1`) : base;
      await bajar(img.url, destino);
    }
    if (res.description) console.log(res.description);
  } else {
    if (!a.foto) throw new Error("Falta --foto <imagen de la modelo>");
    const res = await correr(a.modelo || MODELOS.video, {
      prompt: a.prompt,
      image_url: dataUri(a.foto),
      duration: String(a.duracion || 5),
      negative_prompt: NEGATIVO_VIDEO,
      cfg_scale: 0.5,
    });
    const url = res.video?.url;
    if (!url) throw new Error(`Respuesta sin video: ${JSON.stringify(res).slice(0, 500)}`);
    await bajar(url, a.salida || `out/moda/video-${sello()}.mp4`);
  }
}

main().catch((e) => {
  console.error("✖", e.message);
  process.exit(1);
});
