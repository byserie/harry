# 🎬 Pelis en 5 Minutos — resúmenes animados con stickmans

Proyecto para crear **resúmenes animados de películas** (por ahora la saga de *Harry Potter*) con personajes stickman, narración en español, música, efectos de sonido y subtítulos, todo **generado por código**. Sin editores de video ni imágenes externas: cada cuadro se dibuja con React/SVG y se renderiza con [Remotion](https://www.remotion.dev).

Canal: **Pelis en 5 Minutos** (YouTube).

---

## Índice
1. [Qué hay hecho](#qué-hay-hecho)
2. [Herramientas que se usan](#herramientas-que-se-usan)
3. [Instalación](#instalación)
4. [Cómo funciona (el flujo completo)](#cómo-funciona-el-flujo-completo)
5. [Estructura de carpetas](#estructura-de-carpetas)
6. [El motor de escenas](#el-motor-de-escenas)
7. [Personajes](#personajes)
8. [Voz, música y efectos](#voz-música-y-efectos)
9. [Estilo “dinámico”](#estilo-dinámico)
10. [Formatos: vertical y 16:9](#formatos-vertical-y-169)
11. [Cómo hacer una película nueva paso a paso](#cómo-hacer-una-película-nueva-paso-a-paso)
12. [Miniaturas, banner y foto de perfil](#miniaturas-banner-y-foto-de-perfil)
13. [Comandos útiles](#comandos-útiles)
14. [Problemas comunes](#problemas-comunes)

---

## Qué hay hecho

| Película | Versiones | Composiciones de Remotion |
|---|---|---|
| **1 · La piedra filosofal** | 5 partes verticales (estilo clásico) · película completa dinámica vertical · **película completa 16:9** | `Parte1`…`Parte5`, `P1Full`, `P1FullYT` |
| **2 · La cámara secreta** | 5 partes verticales clásicas · 5 partes dinámicas · película completa dinámica vertical · 16:9 | `P2Parte1`…`P2Parte5`, `P2DParte1`…`P2DParte5`, `P2DCompleta`, `P2Full`, `P2FullYT` |
| **3 · El prisionero de Azkaban** | película completa dinámica 16:9 (en curso) | `P3Full`, `P3FullYT` |
| Extras | miniaturas, portada vertical, foto de perfil y banner del canal | `Miniatura`, `Miniatura1`, `Portada`, `Avatar`, `BannerCanal` |

Cada película dura entre 5 y 6 minutos (la versión completa) o ~90 s por parte (versión para Shorts/TikTok/Reels).

---

## Herramientas que se usan

| Herramienta | Para qué |
|---|---|
| **Node.js 22** + **TypeScript** + **React 19** | Todo el dibujo y la animación |
| **Remotion 4** (`remotion`, `@remotion/cli`, `@remotion/media`, `@remotion/bundler`, `@remotion/renderer`) | Convierte componentes de React en video MP4 cuadro por cuadro |
| **Chromium headless** | Lo usa Remotion para renderizar (se configura en `remotion.config.ts`) |
| **Python 3** + **numpy** + **scipy** | Mezcla de audio, música original sintetizada, efectos de sonido, ducking, tiempos de palabras |
| **Kokoro TTS** (`kokoro-onnx`, modelo ONNX de Hugging Face `fastrtc/kokoro-onnx`) | La voz del narrador (voz “6”: mezcla de las voces `em_alex` 65 % + `am_puck` 35 %) |
| **Piper TTS** (`piper-tts`) | Voz de la primera versión (ya no se usa por defecto, queda como alternativa) |
| **ffmpeg** | Cortes de video (Shorts), hojas de contacto, verificación |
| **Fuente Fredoka** (Google Fonts, guardada en `public/fonts`) | Títulos, subtítulos y etiquetas |
| Skills de Remotion (`npx skills add remotion-dev/skills`) | Guías de buenas prácticas usadas durante el desarrollo |

Todo el arte (personajes, fondos, objetos), la música y los efectos de sonido son **originales y hechos por código**. La narración es un resumen con palabras propias (no se copian diálogos).

---

## Instalación

```bash
# 1. Dependencias de Node
npm install

# 2. Dependencias de Python
pip install numpy scipy soundfile kokoro-onnx piper-tts

# 3. Modelos de voz (no están en el repo por su tamaño)
mkdir -p .cache/models
curl -L -o .cache/models/kokoro-v1.0.onnx https://huggingface.co/fastrtc/kokoro-onnx/resolve/main/kokoro-v1.0.onnx
curl -L -o .cache/models/voices-v1.0.bin  https://huggingface.co/fastrtc/kokoro-onnx/resolve/main/voices-v1.0.bin

# 4. Efectos de sonido (ya vienen en public/sfx, pero se pueden regenerar)
python3 scripts/part_audio.py sfx
```

En `remotion.config.ts` está la ruta del navegador:
```ts
Config.setBrowserExecutable("/opt/pw-browsers/chromium_headless_shell");
```
Si en tu compu no existe esa ruta, **borrá esa línea** y Remotion descarga su propio Chromium.

> Los archivos de audio de las narraciones (`public/audio/*.wav`) no se suben al repo porque pesan cientos de MB. Se regeneran en minutos con el paso 2 del flujo (ver abajo).

---

## Cómo funciona (el flujo completo)

```
 ┌──────────────┐   ┌──────────────────────┐   ┌──────────────────┐   ┌────────────┐
 │ 1. Guion     │──▶│ 2. Audio              │──▶│ 3. Escenas        │──▶│ 4. Render  │
 │ specs/*.json │   │ scripts/part_audio.py │   │ src/...partN.tsx  │   │ remotion   │
 └──────────────┘   └──────────────────────┘   └──────────────────┘   └────────────┘
                     · voz (Kokoro)              · fondos, personajes   · MP4 1080×1920
                     · música + ducking          · acciones por tiempo    o 1920×1080
                     · tiempos de cada palabra   · cámara, efectos
                     · duración de cada escena   · sonidos sincronizados
```

1. **Guion** (`specs/.../*.json`): lista de escenas, cada una con un `id` y el texto de la narración.
2. **Audio** (`scripts/part_audio.py`): genera la voz de cada escena, calcula cuánto dura cada escena a partir de la voz, mezcla la música con *ducking* (baja cuando habla el narrador) y exporta:
   - `public/audio/<id>.wav` → la pista completa,
   - `src/data/<id>.audio.json` → escenas (en frames) + **tiempo exacto de cada palabra** (para subtítulos y sincronizar efectos).
3. **Escenas** (archivos `.tsx`): describen qué pasa en cada escena. Los momentos importantes se sincronizan con palabras de la narración usando `wordClock`:
   ```ts
   const w = wordClock(audio);
   const tBum = w("hagrid", "bum");   // segundo exacto en que se dice “¡bum!” en la escena "hagrid"
   ```
   Así, si cambia la voz o el texto, los efectos siguen cayendo en el momento justo.
4. **Render**: `npx remotion render <Composición> salida.mp4`.

---

## Estructura de carpetas

```
specs/                  Guiones (narración por escena)
  part1..5.json           Película 1, versión clásica por partes
  peli1d/                 Película 1, versión dinámica (partes + full.json)
  peli2/  peli2d/         Película 2 (clásica y dinámica)
  peli3/full.json         Película 3
scripts/
  audio.py                Voz (Kokoro/Piper), diccionario de pronunciación, música, efectos, mezcla
  part_audio.py           Cronograma de escenas + mezcla final de una parte/película
  stills.mjs              Renderiza varios cuadros sueltos y arma una hoja de contacto (para revisar)
src/
  Root.tsx                Registro de todas las composiciones (videos e imágenes)
  engine/                 Motor de escenas
    types.ts                Tipos: SceneSpec, CharTrack, Act, Cam...
    charState.ts            Calcula la pose/posición de cada personaje en cada instante
    Scene.tsx               Renderiza una escena (cámara, transición, capas, sonidos)
    Part.tsx                Une escenas, título, subtítulos, audio y cierre
    Dyn.tsx                 Estilo dinámico: zooms de impacto, cortes, onomatopeyas, líneas de velocidad
    layout.ts               Modo horizontal 16:9
  characters/
    cast.ts                 Todos los personajes (color, pelo, altura, accesorios)
    Stickman.tsx            El stickman articulado (cuerpo, cara, expresiones, varita, escoba)
  lib/
    pose.ts                 Poses (caminar, saludar, varita, festejar...) y utilidades de animación
    Captions.tsx            Subtítulos clásicos
    CaptionsDyn.tsx         Subtítulos dinámicos + emojis + barra de progreso
    Camera.tsx  font.ts
  scenes/                 Película 1 (fondos bg1/bg2, objetos props, util, part1..5)
  peli1d/                 Película 1 dinámica (copias que apuntan al audio dinámico) + full.tsx
  peli2/                  Película 2 (assets propios + part1..5)
  peli2d/                 Película 2 dinámica + full.tsx
  peli3/                  Película 3
  Thumb.tsx               Miniaturas y portada
  Brand.tsx               Foto de perfil y banner del canal
public/
  sfx/                    Efectos de sonido generados
  fonts/                  Fuente Fredoka
  audio/                  (ignorado) narraciones mezcladas
```

---

## El motor de escenas

Cada escena es un objeto `SceneSpec`:

```ts
{
  bg: Bedroom,                         // fondo (componente que recibe t en segundos)
  under: ({ t }) => <Svg>...</Svg>,    // capa entre fondo y personajes (opcional)
  fx: ({ t }) => <Svg>...</Svg>,       // capa sobre los personajes (opcional)
  overlay: ({ t }) => <Banner .../>,   // textos/destellos fuera de la cámara (opcional)
  chars: [                             // personajes
    {
      who: "harry", x: 300, y: 1440,   // posición de los pies (lienzo 1080×1920)
      acts: [                          // acciones en el tiempo (segundos dentro de la escena)
        { t: 0.5, walk: 600 },         // camina hasta x=600 (mueve piernas y brazos)
        { t: 2,   pose: "wave", dur: 1.5 },
        { t: 2,   expr: "joy" },       // neutral | joy | surprise | anger | sadness | focus | sleep
        { t: 4,   wand: true }, { t: 4.2, glow: 1 },   // varita con destellos
        { t: 6,   face: -1 },          // mirar a la izquierda
        { t: 7,   move: { y: 900 }, dur: 1 },          // volar / deslizarse
        { t: 8,   rot: -90 },          // acostarse / caerse
        { t: 9,   alpha: 0 },          // desaparecer (capa invisible)
        { t: 9,   stone: true },       // petrificado
      ],
    },
  ],
  cam: [{ t: 0, z: 1, x: 540, y: 1100 }, { t: 5, z: 1.4, x: 300, y: 1000 }], // empujes de cámara
  shake: [[3.2, 0.8, 0.5]],           // temblor [segundo, intensidad, duración]
  sfx: [{ t: 3.2, s: "boom", v: 0.8 }],// efectos de sonido sincronizados
  trans: "circle",                     // transición de entrada: fade | wipe | circle | slide | zoom
}
```

Poses disponibles (`src/lib/pose.ts`): `stand, wave, point, pointUp, wandUp, wandAim, armsUp, cheer, shrug, think, sad, surprised, angry, sit, ride, hold, cower, talk, crossed`, y el ciclo de caminata/carrera automático.

Para revisar escenas sin renderizar todo:
```bash
node scripts/stills.mjs P3Full 100,400,900 /tmp/hoja.png   # cuadros 100, 400 y 900
```

---

## Personajes

Definidos en `src/characters/cast.ts`. Cada uno tiene **color fijo** (bufanda y etiqueta), **cabeza clara**, peinado, altura/ancho y accesorios:

Harry (azul, anteojos + cicatriz) · Ron (verde) · Hermione (violeta) · Hagrid (marrón, gigante) · Dumbledore (blanco, sombrero) · Snape (gris oscuro) · McGonagall (verde oscuro) · Draco (gris plata) · Quirrell (amarillo, turbante) · Vernon, Petunia, Dudley (gris/rosa) · Dobby · Lockhart · Ginny · Tom Riddle · Lucius · Myrtle · Fred y George · Sr. y Sra. Weasley · Crabbe y Goyle · Neville · Sirius · Lupin · Pettigrew · Trelawney · tía Marge, y más.

El stickman (`Stickman.tsx`) tiene cabeza, torso, brazos (hombro/codo) y piernas (cadera/rodilla) articulados, parpadeo automático, 7 expresiones, varita con destellos, escoba, nombre arriba y “petrificado”. Voldemort es un objeto aparte: humo negro con ojos rojos (`props.tsx`).

---

## Voz, música y efectos

Todo en `scripts/audio.py` y `scripts/part_audio.py`.

- **Voz**: Kokoro, voz mezclada `em_alex*0.65+am_puck*0.35`. Se puede cambiar con variables de entorno:
  ```bash
  VOICE_ENGINE="kokoro:em_alex*0.65+am_puck*0.35" VOICE_SPEED=1.15 python3 scripts/part_audio.py specs/peli3/full.json
  ```
  (`VOICE_ENGINE=piper` usa la voz vieja.)
- **Pronunciación**: el diccionario `PRONUNCIA` en `audio.py` reescribe los nombres para que la voz los diga como en el doblaje latino (Hagrid → “Jágrid”, McGonagall → “Macgónagal”…). Los subtítulos muestran el nombre bien escrito. **Para corregir cómo se pronuncia un nombre, agregalo ahí.**
- **Música**: original y sintetizada (celesta, cuerdas, bajo; en el estilo dinámico además batería). Baja ~10 dB cuando habla la voz (*ducking*).
- **Efectos**: `whoosh, sparkle, step, pop, boom, paper, thunder, splash, chime, hiss, roar, fire, flutter, fanfare, crash, zap, coins, whistle, rumble, cheer, knock` (en `public/sfx`).
- Las voces se guardan en caché (`.cache/voice`), así que regenerar es rápido.

---

## Estilo “dinámico”

Se activa con `dyn: true` en la película y `"style": "dyn"` en el guion. Agrega:
- voz más rápida (`VOICE_SPEED=1.15`) y frases con ganchos,
- **cortes de encuadre** cada ~2 s y **zoom de golpe** en cada impacto,
- **onomatopeyas** automáticas según el sonido (`¡BUM!`, `¡ZAS!`, `¡PUF!`, `¡GRRR!`…),
- líneas de velocidad, destello en cada transición,
- **subtítulos de 1–2 palabras** que rebotan y cambian de color, **emojis** por palabra clave,
- **barra de progreso** arriba, música con batería.

---

## Formatos: vertical y 16:9

- **Vertical 1080×1920** (Shorts, TikTok, Reels): composiciones normales.
- **Horizontal 1920×1080** (YouTube): `P1FullYT`, `P2FullYT`, `P3FullYT`. Usan el mismo contenido: muestran una franja amplia de la escena en el centro y rellenan los costados con el fondo desenfocado; los subtítulos, emojis y onomatopeyas se reacomodan (`src/engine/layout.ts`, contexto `LandCtx`).

---

## Cómo hacer una película nueva paso a paso

1. **Guion**: crear `specs/peliN/full.json`:
   ```json
   { "id": "pNfull", "part": 0, "style": "dyn",
     "scenes": [ { "id": "hook", "text": "Película: ... (gancho)" }, { "id": "escena2", "text": "..." } ] }
   ```
   La primera escena es el gancho (empieza con “Película: …”) y la última termina con “Seguí mi perfil para ver el próximo resumen”.
2. **Nombres nuevos** → agregarlos a `PRONUNCIA` en `scripts/audio.py`.
3. **Audio**:
   ```bash
   VOICE_SPEED=1.15 python3 scripts/part_audio.py specs/peliN/full.json
   ```
   Imprime la duración de cada escena.
4. **Personajes nuevos** → `src/characters/cast.ts`.
5. **Escenas** → `src/peliN/full.tsx` con un `SceneSpec` por escena (mismo `id` que el guion), usando `wordClock` para sincronizar con palabras.
6. **Registrar** en `src/Root.tsx` (vertical y/o `...YT` 16:9 envolviendo con `<LandCtx.Provider value>`).
7. **Revisar** con `node scripts/stills.mjs ...` y corregir lo que se vea mal.
8. **Renderizar**:
   ```bash
   npx remotion render PNFullYT out/final/peliN-16x9.mp4 --codec=h264 --crf=20
   ```

---

## Miniaturas, banner y foto de perfil

```bash
npx remotion still Miniatura   out/final/miniatura.png        # 1280×720  (Cámara secreta)
npx remotion still Miniatura1  out/final/miniatura-pf.png     # 1280×720  (Piedra filosofal)
npx remotion still Portada     out/final/portada.png          # 1080×1920
npx remotion still Avatar      out/final/canal-foto-perfil.png  # 800×800
npx remotion still BannerCanal out/final/canal-banner.png       # 2560×1440
```

---

## Comandos útiles

```bash
npm run dev                                   # Remotion Studio (vista previa interactiva)
npx tsc --noEmit                              # chequear tipos
npx remotion render P2FullYT out/x.mp4        # render completo
npx remotion render P1Full out/prueba.mp4 --frames=0-779   # solo un tramo (prueba)
ffmpeg -ss 90 -i largo.mp4 -t 90 -c:v libx264 -c:a aac corte.mp4   # cortar un Short
```

---

## Problemas comunes

- **“Timeout… delayRender… fuente”**: la fuente se carga local desde `public/fonts`; verificá que esos archivos existan.
- **Un efecto cae en el momento equivocado**: revisá la palabra usada en `w("escena", "palabra")`; `wordClock` toma la **primera** palabra de la escena que **empieza** con ese texto (sin tildes). Para la segunda aparición: `w("escena", "mago", 1)`.
- **Error “palabra no encontrada”**: cambiaste el texto del guion y esa palabra ya no está; actualizá la escena.
- **Se ven bordes vacíos**: la cámara nunca debe tener zoom < 1 (el motor ya lo limita).
- **El render tarda**: ~1–2 cuadros por segundo por núcleo; usá `--concurrency` y probá primero con `--frames`.
