"""Música original estilo 'edit' (phonk/trap oscuro) para los Shorts de edits.
Estructura fija en tiempos (140 bpm): intro 8 · subida 8 · DROP 32 · golpe final.
Uso: python3 scripts/edit_music.py   -> public/audio/edits/<id>.wav
"""
import json, sys
from pathlib import Path
import numpy as np
sys.path.insert(0, str(Path(__file__).parent))
from audio import SR, ROOT, place, midi, lp, hp, bp, noise, kick, snare, hat, write_wav, sfx_boom, sfx_whoosh

BPM = 140
BEAT = 60 / BPM
INTRO, BUILD, DROP = 8, 8, 32
TOTAL_BEATS = INTRO + BUILD + DROP
DUR = TOTAL_BEATS * BEAT + 2.0


def b808(f, d):
    n = int(d * SR); tt = np.arange(n) / SR
    ff = f * (1 + 1.2 * np.exp(-tt / 0.03))
    x = np.sin(2 * np.pi * np.cumsum(ff) / SR)
    x = np.tanh(2.2 * x) * np.exp(-tt / (d * 0.6))
    return x * np.minimum(1, tt / 0.003)


def cowbell(f, d=0.35):
    n = int(d * SR); tt = np.arange(n) / SR
    x = np.sign(np.sin(2 * np.pi * f * tt)) + np.sign(np.sin(2 * np.pi * f * 1.48 * tt))
    return bp(x, 500, 4000) * np.exp(-tt / 0.09) * 0.5


def bell(f, d=1.6):
    n = int(d * SR); tt = np.arange(n) / SR
    x = np.sin(2 * np.pi * f * tt) + 0.5 * np.sin(2 * np.pi * f * 2.76 * tt) * np.exp(-tt / 0.3)
    return x * np.exp(-tt / 0.7) * np.minimum(1, tt / 0.005)


def pad(freqs, d):
    n = int(d * SR); tt = np.arange(n) / SR
    x = sum(np.sin(2 * np.pi * f * (1 + det) * tt) for f in freqs for det in (-0.003, 0, 0.004))
    return lp(x, 900) / (len(freqs) * 3) * np.clip(np.minimum(tt / 0.8, (d - tt) / 0.5), 0, 1)


def clap():
    n = int(0.22 * SR); tt = np.arange(n) / SR
    x = bp(noise(n), 900, 5000)
    e = np.exp(-tt / 0.06) + 0.6 * np.exp(-np.maximum(0, tt - 0.012) / 0.01) * (tt > 0.012)
    return x * e


def track(root, seed):
    r = np.random.default_rng(seed)
    out = np.zeros(int(DUR * SR) + SR)
    minor = [0, 3, 5, 7, 8, 10, 12]
    prog = [0, 8, 3, 10]  # i - VI - III - VII
    mel = [minor[i] for i in r.integers(0, 7, 16)]
    K, S, H, C = kick(), snare(), hat(), clap()
    # intro: pad + campanas, oscuro
    for bar in range(INTRO // 4 + BUILD // 4):
        ch = root + prog[bar % 4]
        place(out, pad([midi(ch + 12), midi(ch + 15), midi(ch + 19)], 4 * BEAT + 0.4), bar * 4 * BEAT, 0.5)
    for k in range(INTRO + BUILD):
        if k % 2 == 0:
            place(out, bell(midi(root + 24 + mel[k % 16])), k * BEAT, 0.22)
    # subida: bombo en negras + redoble que acelera + ruido que sube
    t0 = INTRO * BEAT
    for k in range(BUILD):
        place(out, K, t0 + k * BEAT, 0.7)
    steps = []
    for k in range(BUILD):
        div = 1 if k < 2 else 2 if k < 4 else 4 if k < 6 else 8
        steps += [t0 + k * BEAT + j * BEAT / div for j in range(div)]
    for i, st in enumerate(steps):
        place(out, S, st, 0.25 + 0.5 * i / len(steps))
    n = int(BUILD * BEAT * SR)
    riser = hp(noise(n), 2000) * np.linspace(0, 1, n) ** 2 * 0.35
    place(out, riser, t0)
    # DROP
    td = (INTRO + BUILD) * BEAT
    place(out, sfx_boom(), td - 0.02, 0.9)
    for k in range(DROP):
        bt = td + k * BEAT
        bar = k // 4
        ch = root + prog[bar % 4]
        if k % 4 in (0, 3) or (k % 8 == 6):
            place(out, K, bt, 1.0)
        if k % 2 == 1:
            place(out, C, bt, 0.7)
        for j in range(4):
            if not (k % 8 == 7 and j > 1):
                place(out, H, bt + j * BEAT / 4, 0.35 if j % 2 else 0.5)
        if k % 8 == 7:
            for j in range(6):
                place(out, H, bt + BEAT / 2 + j * BEAT / 12, 0.35)
        if k % 4 == 0:
            place(out, b808(midi(ch - 12), 4 * BEAT * 0.95), bt, 0.9)
        if k % 4 == 2 and bar % 2 == 1:
            place(out, b808(midi(ch - 12 + 7), BEAT * 1.8), bt, 0.7)
        for j in range(2):
            m = root + 24 + mel[(k * 2 + j) % 16] + prog[bar % 4] % 12 * 0
            place(out, cowbell(midi(m)), bt + j * BEAT / 2, 0.32 if j == 0 else 0.22)
    tf = TOTAL_BEATS * BEAT
    place(out, sfx_boom(), tf, 1.0)
    place(out, bell(midi(root + 24), 2.5), tf, 0.4)
    out = out[: int(DUR * SR)]
    out[-int(1.2 * SR):] *= np.linspace(1, 0, int(1.2 * SR))
    out = np.tanh(1.4 * out / (np.max(np.abs(out)) + 1e-9)) * 0.9
    return out


if __name__ == "__main__":
    lst = json.loads((ROOT / "src/edits/list.json").read_text())
    for e in lst:
        y = track(e["root"], e["seed"])
        write_wav(ROOT / "public/audio/edits" / f"{e['id']}.wav", np.stack([y, y], 1))
        print("ok", e["id"], round(len(y) / SR, 2))
