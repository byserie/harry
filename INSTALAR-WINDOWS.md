# Instalar y renderizar en Windows (paso a paso)

## 1. Programas (una sola vez)
- **Node.js LTS**: https://nodejs.org → botón verde "LTS" → instalar con todo por defecto.
- **Python 3.12**: https://www.python.org/downloads/ → al instalar, **marcá "Add python.exe to PATH"**.
- **Git**: https://git-scm.com (ya lo tenés si clonaste el repo).

Cerrá y volvé a abrir la terminal después de instalar.

## 2. Preparar el proyecto (una sola vez)
Abrí **cmd** y escribí, de a una línea:

```
cd %USERPROFILE%\Documents\harry
git pull
npm install
pip install numpy scipy soundfile kokoro-onnx
mkdir .cache\models
curl -L -o .cache\models\kokoro-v1.0.onnx https://huggingface.co/fastrtc/kokoro-onnx/resolve/main/kokoro-v1.0.onnx
curl -L -o .cache\models\voices-v1.0.bin https://huggingface.co/fastrtc/kokoro-onnx/resolve/main/voices-v1.0.bin
```

## 3. Generar el audio de una película
(El audio no está en GitHub porque pesa mucho; se genera en unos minutos.)

```
set VOICE_SPEED=1.15
python scripts\part_audio.py specs\peli3\full.json
```

Para otras películas cambiá `peli3` por `peli1d`, `peli2d`, `peli4`, `peli5`...

## 4. Renderizar
```
npx remotion render P3FullYT salida-pelicula3.mp4 --concurrency=100%
```

| Película | Audio (paso 3) | Render (paso 4) |
|---|---|---|
| 1 · Piedra filosofal | `specs\peli1d\full.json` | `P1FullYT` |
| 2 · Cámara secreta | `specs\peli2d\full.json` | `P2FullYT` |
| 3 · Prisionero de Azkaban | `specs\peli3\full.json` | `P3FullYT` |
| 4 · Cáliz de fuego | `specs\peli4\full.json` | `P4FullYT` |

La primera vez Remotion descarga su navegador (tarda un poco). El video queda en la carpeta `harry`.
