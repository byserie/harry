"""Audio y cronograma de una parte completa.

- Genera la voz de cada escena (Piper) y calcula la duración de cada escena a partir de la voz.
- Escribe src/data/<id>.audio.json (escenas en frames + palabras para subtítulos).
- Mezcla voz + música original con ducking en public/audio/<id>.wav.
  (Los efectos de sonido van en Remotion, sincronizados con la animación.)

Uso: python3 scripts/part_audio.py specs/part1.json [--target 100]
"""
import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
import audio as A  # noqa: E402

FPS = 30
LEAD = 0.55  # silencio antes de la voz en cada escena
TAIL = 0.75  # aire después de la voz
OVERLAP = 12  # frames de transición entre escenas
MIN_SCENE = 6.0


def main(path):
    spec = json.loads(Path(path).read_text())
    cid = spec["id"]
    dyn = spec.get("style") == "dyn"
    global LEAD, TAIL, OVERLAP, MIN_SCENE
    if dyn:
        LEAD, TAIL, OVERLAP, MIN_SCENE = 0.3, 0.45, 8, 5.0
    sigs = [A.tts(s["text"], i) for i, s in enumerate(spec["scenes"])]
    vdur = [len(x) / A.SR for x in sigs]
    durs = [max(MIN_SCENE, LEAD + d + TAIL) for d in vdur]
    durs[-1] += 1.5  # tarjeta final
    total = sum(durs) - (len(durs) - 1) * OVERLAP / FPS
    target_min = float(spec.get("min", 90.0))
    if total < target_min:  # repartir aire extra para más acción
        extra = (target_min - total) / len(durs)
        durs = [d + extra for d in durs]
    scenes = []
    frame = 0
    words = []
    lines = []
    for s, d, sig, vd in zip(spec["scenes"], durs, sigs, vdur):
        df = int(round(d * FPS))
        vfrom = frame + int(round(LEAD * FPS))
        start_s = vfrom / FPS
        scenes.append({"id": s["id"], "from": frame, "dur": df, "voiceFrom": vfrom, "voiceDur": round(vd, 3)})
        words += A.word_times(s["text"], sig, start_s)
        lines.append((start_s, start_s + vd, sig))
        frame += df - OVERLAP
    total_frames = frame + OVERLAP
    dur = total_frames / FPS
    n = int(dur * A.SR)
    voice = np.zeros(n)
    mask = np.zeros(n)
    for st, en, sig in lines:
        A.place(voice, sig, st)
        mask[int(st * A.SR): int(en * A.SR)] = 1
    mus = A.music_dyn(dur, 124, seed=spec["part"] * 7) if dyn else A.music(dur, spec.get("bpm", 120 + spec["part"] * 3), seed=spec["part"] * 11)
    duck = A.smooth_gate(mask)
    gain = (0.34 * (1 - duck) + 0.12 * duck) if dyn else (0.30 * (1 - duck) + 0.075 * duck)
    m = min(len(voice), len(mus))
    mix = voice[:m] + mus[:m] * gain[:m]
    mix = np.tanh(mix * 1.1) / np.tanh(1.1)
    mix = mix / (np.max(np.abs(mix)) + 1e-9) * 0.89
    A.write_wav(A.ROOT / "public" / "audio" / f"{cid}.wav", np.stack([mix, mix], 1))
    out = {"fps": FPS, "durationInFrames": total_frames, "scenes": scenes, "words": words}
    (A.ROOT / "src" / "data" / f"{cid}.audio.json").write_text(json.dumps(out, ensure_ascii=False))
    print(f"{cid}: {dur:.1f}s")
    for sc in scenes:
        print(f"  {sc['id']:10s} from {sc['from']/FPS:6.2f}s  dur {sc['dur']/FPS:5.2f}s  voz {sc['voiceDur']:5.2f}s")


def export_sfx():
    out = A.ROOT / "public" / "sfx"
    out.mkdir(parents=True, exist_ok=True)
    for name, fn in A.SFX.items():
        x = fn()
        x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
        A.write_wav(out / f"{name}.wav", np.stack([x, x], 1))


if __name__ == "__main__":
    if sys.argv[1] == "sfx":
        export_sfx()
    else:
        main(sys.argv[1])
