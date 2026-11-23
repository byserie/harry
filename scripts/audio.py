"""Genera la pista de audio de una composición: voz (Piper), música original sintetizada,
efectos sincronizados y ducking. También exporta los tiempos de cada palabra para los subtítulos.

Uso: python3 scripts/audio.py specs/test.json
"""
import hashlib
import json
import re
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np
from scipy.signal import butter, resample_poly, sosfilt

SR = 48000
ROOT = Path(__file__).resolve().parent.parent
VOICE_DIR = ROOT / ".cache" / "models"
VOICE = "es_MX-claude-high"
CACHE = ROOT / ".cache" / "voice"


# ---------------------------------------------------------------- utilidades
def read_wav(path):
    with wave.open(str(path)) as w:
        sr = w.getframerate()
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
        if w.getnchannels() == 2:
            x = x.reshape(-1, 2).mean(1)
    return x, sr


def write_wav(path, stereo):
    path.parent.mkdir(parents=True, exist_ok=True)
    data = (np.clip(stereo, -1, 1) * 32767).astype(np.int16)
    with wave.open(str(path), "w") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())


def env_exp(n, decay):
    t = np.arange(n) / SR
    return np.exp(-t / decay)


def lp(x, f, order=2):
    return sosfilt(butter(order, f, "low", fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, "high", fs=SR, output="sos"), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], "band", fs=SR, output="sos"), x)


def place(buf, sig, t, gain=1.0):
    i = int(t * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i] * gain


def midi(m):
    return 440.0 * 2 ** ((m - 69) / 12)


# ---------------------------------------------------------------- voz
ENGINE = __import__("os").environ.get("VOICE_ENGINE", "kokoro:em_alex*0.65+am_puck*0.35")  # piper | kokoro:em_alex | xtts:<speaker>
_kokoro = None
SPEED = float(__import__("os").environ.get("VOICE_SPEED", "1.05"))
_xtts = None


def _synth(text, out):
    global _kokoro, _xtts
    if ENGINE == "piper":
        subprocess.run(
            [sys.executable, "-m", "piper", "-m", str(VOICE_DIR / f"{VOICE}.onnx"), "-f", str(out),
             "--length-scale", "0.92", "--sentence-silence", "0.18"],
            input=text.encode(), check=True, capture_output=True,
        )
    elif ENGINE.startswith("kokoro"):
        import soundfile as sf
        from kokoro_onnx import Kokoro
        if _kokoro is None:
            _kokoro = Kokoro(str(VOICE_DIR / "kokoro-v1.0.onnx"), str(VOICE_DIR / "voices-v1.0.bin"))
        spec = ENGINE.split(":")[1]
        style = 0
        for part in spec.split("+"):
            name, _, wgt = part.partition("*")
            style = style + _kokoro.get_voice_style(name) * float(wgt or 1)
        a, sr = _kokoro.create(text, voice=style, speed=SPEED, lang="es")
        sf.write(str(out), a, sr, subtype="PCM_16")
    elif ENGINE.startswith("xtts"):
        import soundfile as sf
        if _xtts is None:
            from TTS.api import TTS
            _xtts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")
        spk = ENGINE.split(":", 1)[1]
        kw = {"speaker_wav": spk} if spk.endswith(".wav") else {"speaker": spk}
        a = _xtts.tts(text=text, language="es", **kw)
        sf.write(str(out), np.asarray(a, dtype=np.float32), 24000, subtype="PCM_16")


# Pronunciación (solo para la voz; los subtítulos usan el texto original)
PRONUNCIA = {
    "McGonagall": "Macgónagal", "Hagrid": "Jágrid", "Harry": "Jarri", "Hermione": "Jermáioni",
    "Dumbledore": "Dámbeldor", "Hogwarts": "Jógguarts", "Snape": "Esnéip", "Quirrell": "Quírrel",
    "Voldemort": "Voldemor", "Dursley": "Dúrsli", "Dudley": "Dádli", "Vernon": "Vérnon",
    "Gryffindor": "Gríffindor", "Slytherin": "Eslíderin", "Malfoy": "Málfoi", "Draco": "Dráco",
    "Dobby": "Dóbi", "Gilderoy": "Guílderoi", "Lockhart": "Lócjart", "Lucius": "Lúcius", "Ginny": "Yíni",
    "Weasley": "Uísli", "Riddle": "Rídel", "Aragog": "Áragog", "Fawkes": "Foks", "Myrtle": "Mírtel",
    "Azkaban": "Ázcaban", "bludger": "bláyer",
    "Sirius": "Sírius", "Lupin": "Lúpin", "Pettigrew": "Pétigru", "Trelawney": "Trelóni", "Buckbeak": "Bákbik",
    "Hogsmeade": "Jógsmid", "Marge": "Márch", "patronus": "patrónus", "boggart": "bógart", "Scabbers": "Escábers",
    "Beauxbatons": "Bobatón", "Durmstrang": "Dúrmstrang", "Moody": "Múdi", "Ojoloco": "Ojoloco", "Fleur": "Flér",
    "Krum": "Krum", "Cedric": "Sédric", "Colagusano": "Colagusano", "Barty": "Bárti", "Crouch": "Cráuch",
    "Umbridge": "Ámbrich", "Dolores": "Dolores", "Lovegood": "Lavgud", "Cho": "Chou", "Chang": "Chang",
    "Bellatrix": "Bélatrix", "Lestrange": "Lestránch", "Tonks": "Tonks", "thestrals": "téstrals",
    "Slughorn": "Slágjorn", "Horace": "Jóras", "Lavender": "Lávender", "horrocruxes": "jórocruxes", "horrocrux": "jórocrux",
    "Nagini": "Nagíni", "Bill": "Bil", "Godric": "Gódric",
    "Ravenclaw": "Révenclo", "Lily": "Líli",
    "quidditch": "quídich", "snitch": "esních", "Flamel": "Flamél", "Potter": "Póter",
}


def respell(text):
    for k, v in PRONUNCIA.items():
        text = re.sub(rf"\b{k}\b", v, text, flags=re.I)
    return text


def tts(text, idx):
    CACHE.mkdir(parents=True, exist_ok=True)
    text = respell(text)
    key = ENGINE.replace(":", "_").replace("/", "_")[-30:] + f"_s{SPEED}_" + re.sub(r"[^a-z0-9]+", "_", text.lower())[:50] + "_" + hashlib.md5(text.encode()).hexdigest()[:8]
    out = CACHE / f"{key}.wav"
    if not out.exists():
        _synth(text, out)
    x, sr = read_wav(out)
    x = resample_poly(x, SR, sr).astype(np.float32)
    a = np.abs(x)
    nz = np.where(a > 0.02)[0]
    if len(nz):
        x = x[max(0, nz[0] - 800): nz[-1] + 2400]
    x = hp(x, 80) + 0.15 * bp(x, 2500, 6000)
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
    return x


def word_times(text, sig, start):
    """Reparte las palabras sobre los tramos con voz, anclando pausas de puntuación a silencios reales."""
    words = text.split()
    dur = len(sig) / SR
    # detección de silencios internos
    win = int(0.02 * SR)
    e = np.sqrt(np.convolve(sig ** 2, np.ones(win) / win, mode="same"))
    voiced = e > 0.03
    # pesos: letras + pausa por puntuación
    weights = []
    for w in words:
        base = len(re.sub(r"[^\wáéíóúñü]", "", w, flags=re.I)) + 1.5
        weights.append(base)
    total_voiced = voiced.sum() / SR
    # mapa de tiempo "con voz" -> tiempo real
    cum = np.cumsum(voiced) / SR
    W = np.cumsum([0] + weights)
    res = []
    for i, w in enumerate(words):
        v0 = W[i] / W[-1] * total_voiced
        v1 = W[i + 1] / W[-1] * total_voiced
        t0 = np.searchsorted(cum, v0) / SR
        t1 = np.searchsorted(cum, v1) / SR
        res.append({"text": w, "start": round(start + t0, 3), "end": round(start + min(t1, dur), 3)})
    return res


# ---------------------------------------------------------------- efectos
rng = np.random.default_rng(7)


def noise(n):
    return rng.standard_normal(n).astype(np.float32)


def sfx_whoosh(d=0.6):
    n = int(d * SR)
    x = noise(n)
    t = np.linspace(0, 1, n)
    out = np.zeros(n)
    seg = 8
    for k in range(seg):
        a, b = k * n // seg, (k + 1) * n // seg
        f = 300 + 2500 * np.sin(np.pi * (k + 0.5) / seg)
        out[a:b] = bp(x[a:b], f * 0.6, min(f * 1.6, 20000))
    return out * np.sin(np.pi * t) ** 2 * 0.9


def sfx_sparkle(d=1.0):
    n = int(d * SR)
    out = np.zeros(n)
    for k in range(18):
        t0 = rng.uniform(0, d * 0.7)
        f = rng.uniform(2200, 6000)
        m = int(0.35 * SR)
        tt = np.arange(m) / SR
        ping = (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * f * 2.76 * tt)) * np.exp(-tt / 0.08)
        place(out, ping, t0, rng.uniform(0.15, 0.35))
    shimmer = hp(noise(n), 6000) * np.exp(-np.arange(n) / SR / 0.4) * 0.15
    return out + shimmer


def sfx_step():
    n = int(0.12 * SR)
    tt = np.arange(n) / SR
    return (np.sin(2 * np.pi * 85 * tt) * np.exp(-tt / 0.03) + lp(noise(n), 1200) * np.exp(-tt / 0.015) * 0.5) * 0.6


def sfx_pop():
    n = int(0.15 * SR)
    tt = np.arange(n) / SR
    f = 700 * np.exp(-tt / 0.04) + 180
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.05)


def sfx_boom():
    n = int(1.6 * SR)
    tt = np.arange(n) / SR
    low = np.sin(2 * np.pi * 48 * tt) * np.exp(-tt / 0.35)
    crack = lp(noise(n), 3000) * np.exp(-tt / 0.08)
    rumble = lp(noise(n), 200) * np.exp(-tt / 0.6) * 1.5
    return (low + crack * 0.7 + rumble) * 0.9


def sfx_paper():
    n = int(0.25 * SR)
    tt = np.arange(n) / SR
    x = bp(noise(n), 1800, 7000) * (np.abs(np.sin(2 * np.pi * 28 * tt)) ** 3) * np.exp(-tt / 0.1)
    return x * 0.8


def sfx_thunder(d=3.0):
    n = int(d * SR)
    tt = np.arange(n) / SR
    x = lp(noise(n), 300, 4) * 4 * (np.exp(-tt / 0.9)) * (1 + 0.6 * np.sin(2 * np.pi * 3 * tt))
    crack = hp(noise(n), 1500) * np.exp(-tt / 0.05) * 0.6
    return x + crack


def sfx_splash():
    n = int(0.9 * SR)
    tt = np.arange(n) / SR
    x = bp(noise(n), 500, 6000) * np.exp(-tt / 0.18)
    for k in range(10):
        f = rng.uniform(400, 1200)
        m = int(0.08 * SR)
        t2 = np.arange(m) / SR
        bub = np.sin(2 * np.pi * (f + 3000 * t2) * t2) * np.exp(-t2 / 0.02)
        place(x, bub, rng.uniform(0.1, 0.7), 0.3)
    return x


def sfx_chime():
    n = int(2.0 * SR)
    tt = np.arange(n) / SR
    out = np.zeros(n)
    for i, m in enumerate([76, 79, 83, 88]):
        f = midi(m)
        tone = (np.sin(2 * np.pi * f * tt) + 0.4 * np.sin(2 * np.pi * f * 3.01 * tt)) * np.exp(-tt / 0.7)
        place(out, tone, i * 0.08, 0.3)
    return out


def sfx_hiss():
    n = int(0.9 * SR)
    tt = np.arange(n) / SR
    return hp(noise(n), 4000) * np.sin(np.pi * tt / 0.9) * 0.5


def sfx_roar():
    n = int(1.4 * SR)
    tt = np.arange(n) / SR
    f = 70 + 30 * np.sin(2 * np.pi * 5 * tt)
    tone = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.5
    x = lp(tone + bp(noise(n), 100, 900) * 0.8, 900) * np.minimum(1, tt / 0.1) * np.exp(-tt / 0.7)
    return x * 1.4


def sfx_fire():
    n = int(1.2 * SR)
    tt = np.arange(n) / SR
    x = bp(noise(n), 300, 3000) * np.minimum(1, tt / 0.05) * np.exp(-tt / 0.6)
    for k in range(25):
        place(x, hp(noise(300), 2000) * 0.8, rng.uniform(0, 1.0))
    return x


def sfx_flutter():
    n = int(0.8 * SR)
    tt = np.arange(n) / SR
    return bp(noise(n), 400, 2500) * (0.5 + 0.5 * np.sin(2 * np.pi * 14 * tt)) ** 2 * np.sin(np.pi * tt / 0.8)


def sfx_fanfare():
    n = int(2.4 * SR)
    out = np.zeros(n)
    for i, (m, t0, d) in enumerate([(67, 0, 0.25), (67, 0.25, 0.15), (72, 0.42, 0.5), (76, 0.95, 0.3), (79, 1.25, 1.1)]):
        k = int(d * SR) + int(0.3 * SR)
        tt = np.arange(k) / SR
        f = midi(m)
        tone = sum(np.sin(2 * np.pi * f * h * tt) / h for h in range(1, 7))
        env = np.minimum(1, tt / 0.03) * np.where(tt < d, 1, np.exp(-(tt - d) / 0.1))
        place(out, lp(tone * env, 4000), t0, 0.35)
    return out


def sfx_crash():
    n = int(1.0 * SR)
    tt = np.arange(n) / SR
    x = hp(noise(n), 800) * np.exp(-tt / 0.25)
    for k in range(12):
        f = rng.uniform(2000, 7000)
        m = int(0.2 * SR)
        t2 = np.arange(m) / SR
        place(x, np.sin(2 * np.pi * f * t2) * np.exp(-t2 / 0.05), rng.uniform(0, 0.5), 0.4)
    return x + sfx_step()[: n] * 2 if False else x


def sfx_zap():
    n = int(0.5 * SR)
    tt = np.arange(n) / SR
    f = 2400 * np.exp(-tt / 0.12) + 300
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.18) * 0.7 + hp(noise(n), 5000) * np.exp(-tt / 0.1) * 0.3


def sfx_coins():
    n = int(1.2 * SR)
    out = np.zeros(n)
    for k in range(16):
        f = rng.uniform(3000, 6000)
        m = int(0.25 * SR)
        t2 = np.arange(m) / SR
        place(out, (np.sin(2 * np.pi * f * t2) + 0.5 * np.sin(2 * np.pi * f * 1.5 * t2)) * np.exp(-t2 / 0.06), rng.uniform(0, 0.9), 0.3)
    return out


def sfx_whistle():
    n = int(1.4 * SR)
    tt = np.arange(n) / SR
    f = 880 + 20 * np.sin(2 * np.pi * 6 * tt)
    x = (np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.5 * np.sin(2 * np.pi * np.cumsum(f * 1.26) / SR))
    x += bp(noise(n), 1500, 4000) * 0.3
    return x * np.minimum(1, tt / 0.1) * np.minimum(1, (1.4 - tt) / 0.3) * 0.6


def sfx_rumble():
    n = int(2.0 * SR)
    tt = np.arange(n) / SR
    return lp(noise(n), 150, 4) * 5 * np.sin(np.pi * tt / 2.0)


def sfx_cheer():
    n = int(2.0 * SR)
    tt = np.arange(n) / SR
    x = bp(noise(n), 500, 3500) * (0.7 + 0.3 * np.sin(2 * np.pi * 7 * tt + rng.uniform(0, 6))) * np.sin(np.pi * tt / 2.0)
    return x


def sfx_knock():
    n = int(1.2 * SR)
    out = np.zeros(n)
    k = int(0.15 * SR)
    t2 = np.arange(k) / SR
    hit = (np.sin(2 * np.pi * 140 * t2) * np.exp(-t2 / 0.04) + lp(noise(k), 2000) * np.exp(-t2 / 0.02))
    for t0 in (0, 0.35, 0.7):
        place(out, hit, t0, 0.9)
    return out


SFX = {
    "whoosh": sfx_whoosh, "sparkle": sfx_sparkle, "step": sfx_step, "pop": sfx_pop, "boom": sfx_boom,
    "paper": sfx_paper, "thunder": sfx_thunder, "splash": sfx_splash, "chime": sfx_chime, "hiss": sfx_hiss, "roar": sfx_roar, "fire": sfx_fire, "flutter": sfx_flutter,
    "fanfare": sfx_fanfare, "crash": sfx_crash, "zap": sfx_zap, "coins": sfx_coins, "whistle": sfx_whistle,
    "rumble": sfx_rumble, "cheer": sfx_cheer, "knock": sfx_knock,
}


# ---------------------------------------------------------------- música original
def celesta(f, d):
    n = int(d * SR)
    tt = np.arange(n) / SR
    x = np.sin(2 * np.pi * f * tt) + 0.35 * np.sin(2 * np.pi * f * 4 * tt) * np.exp(-tt / 0.15)
    return x * np.exp(-tt / 0.9) * np.minimum(1, tt / 0.004)


def strings(freqs, d):
    n = int(d * SR)
    tt = np.arange(n) / SR
    x = np.zeros(n)
    for f in freqs:
        for det in (-0.25, 0, 0.27):
            ff = f * 2 ** (det / 12)
            ph = rng.uniform(0, 1)
            x += 2 * ((ff * tt + ph) % 1) - 1
    x = lp(x, 1600, 2) / (len(freqs) * 3)
    a = np.minimum(1, tt / 0.5) * np.minimum(1, (d - tt) / 0.4)
    return x * np.clip(a, 0, 1)


def pizz(f, d=0.6):
    n = int(d * SR)
    tt = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * tt) + 0.4 * np.sin(4 * np.pi * f * tt)) * np.exp(-tt / 0.22)


# acordes en MIDI (Mi menor, aire misterioso y juguetón)
PROG = [
    [52, 55, 59], [48, 52, 55], [45, 48, 52], [47, 51, 54],
    [52, 55, 59], [43, 47, 50], [48, 52, 55], [47, 51, 54],
]
SCALE = [64, 66, 67, 69, 71, 72, 74, 76, 78, 79]


def music(dur, bpm=126, seed=1):
    r = np.random.default_rng(seed)
    beat = 60 / bpm
    bar = beat * 3
    n = int(dur * SR) + SR
    out = np.zeros(n)
    t = 0.0
    b = 0
    while t < dur:
        ch = PROG[b % len(PROG)]
        out_seg = strings([midi(m) for m in ch], bar + 0.3)
        place(out, out_seg, t, 0.5)
        place(out, pizz(midi(ch[0] - 12)), t, 0.55)
        place(out, pizz(midi(ch[0] - 12 + 7)) * 0.6, t + beat * 1, 0.4)
        place(out, pizz(midi(ch[0] - 12 + 7)) * 0.6, t + beat * 2, 0.4)
        arp = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[0] + 24, ch[2] + 12, ch[1] + 12]
        for k, m in enumerate(arp):
            place(out, celesta(midi(m), 1.2), t + k * beat / 2, 0.16)
        # melodía: una nota larga por compás, a veces dos
        mel = r.choice([s for s in SCALE if (s - ch[0]) % 12 in ((ch[1] - ch[0]) % 12, (ch[2] - ch[0]) % 12, 0)])
        place(out, celesta(midi(mel + 12), 1.6), t, 0.22)
        if r.random() < 0.5:
            place(out, celesta(midi(r.choice(SCALE) + 12), 1.2), t + beat * 2, 0.15)
        t += bar
        b += 1
    out = out[: int(dur * SR)]
    fade = int(0.6 * SR)
    out[:fade] *= np.linspace(0, 1, fade)
    out[-int(1.0 * SR):] *= np.linspace(1, 0, int(1.0 * SR))
    return out / (np.max(np.abs(out)) + 1e-9)


def kick():
    n = int(0.35 * SR)
    tt = np.arange(n) / SR
    f = 150 * np.exp(-tt / 0.04) + 45
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.18)


def snare():
    n = int(0.25 * SR)
    tt = np.arange(n) / SR
    return (hp(noise(n), 1500) * 0.7 + np.sin(2 * np.pi * 190 * tt) * 0.5) * np.exp(-tt / 0.08)


def hat():
    n = int(0.06 * SR)
    tt = np.arange(n) / SR
    return hp(noise(n), 7000) * np.exp(-tt / 0.015) * 0.5


PROG4 = [[52, 55, 59], [48, 52, 55], [50, 54, 57], [47, 51, 54]]


def music_dyn(dur, bpm=124, seed=1):
    """Música enérgica 4/4 con batería, bajo y arpegio (original)."""
    r = np.random.default_rng(seed)
    beat = 60 / bpm
    bar = beat * 4
    n = int(dur * SR) + SR
    out = np.zeros(n)
    t = 0.0
    b = 0
    K, S, Hh = kick(), snare(), hat()
    while t < dur:
        ch = PROG4[b % len(PROG4)]
        intro = t < bar * 1
        place(out, strings([midi(m) for m in ch], bar + 0.2), t, 0.32)
        for k in range(4):
            bt = t + k * beat
            if not intro or k >= 2:
                place(out, K, bt, 0.95)
            if k % 2 == 1:
                place(out, S, bt, 0.55)
            place(out, Hh, bt, 0.5)
            place(out, Hh, bt + beat / 2, 0.35)
            place(out, pizz(midi(ch[0] - 12), 0.3), bt + beat / 2, 0.55)
        arp = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[0] + 24]
        for k in range(16):
            place(out, celesta(midi(arp[k % 4] + (12 if (k // 4) % 2 and b % 2 else 0)), 0.6), t + k * beat / 4, 0.11)
        if b % 2 == 1:
            mel = r.choice(SCALE)
            place(out, celesta(midi(mel + 12), 1.2), t, 0.2)
        t += bar
        b += 1
    out = out[: int(dur * SR)]
    fade = int(0.3 * SR)
    out[:fade] *= np.linspace(0, 1, fade)
    out[-int(1.0 * SR):] *= np.linspace(1, 0, int(1.0 * SR))
    return out / (np.max(np.abs(out)) + 1e-9)


def smooth_gate(mask, attack=0.12, release=0.45):
    out = np.zeros_like(mask, dtype=np.float32)
    a_up = 1 - np.exp(-1 / (attack * SR))
    a_dn = 1 - np.exp(-1 / (release * SR))
    # procesar en bloques para velocidad
    blk = 240
    m = mask[::blk].astype(np.float32)
    o = np.zeros_like(m)
    y = 0.0
    au = 1 - (1 - a_up) ** blk
    ad = 1 - (1 - a_dn) ** blk
    for i, v in enumerate(m):
        y += (v - y) * (au if v > y else ad)
        o[i] = y
    out = np.repeat(o, blk)[: len(mask)]
    return out


# ---------------------------------------------------------------- principal
def main(spec_path):
    spec = json.loads(Path(spec_path).read_text())
    cid = spec["id"]
    dur = spec["duration"]
    n = int(dur * SR)
    voice = np.zeros(n)
    fx = np.zeros(n)
    words = []
    lines = []
    for i, v in enumerate(spec["voice"]):
        sig = tts(v["text"], i)
        place(voice, sig, v["start"])
        words += word_times(v["text"], sig, v["start"])
        lines.append({"start": v["start"], "end": round(v["start"] + len(sig) / SR, 3)})
    for s in spec.get("sfx", []):
        place(fx, SFX[s["type"]](), s["t"], s.get("gain", 0.6))
    mus = music(dur, spec.get("bpm", 126), spec.get("seed", 1))
    mask = np.zeros(n)
    for ln in lines:
        mask[int(ln["start"] * SR): int(ln["end"] * SR)] = 1
    duck = smooth_gate(mask)
    music_gain = 0.32 * (1 - duck) + 0.08 * duck  # ~ -12 dB con voz
    mix_m = voice * 1.0 + mus * music_gain + fx
    mix_m = np.tanh(mix_m * 1.1) / np.tanh(1.1)
    mix_m = mix_m / (np.max(np.abs(mix_m)) + 1e-9) * 0.89
    # estéreo: efectos levemente abiertos
    st = np.stack([mix_m, mix_m], 1)
    write_wav(ROOT / "public" / "audio" / f"{cid}.wav", st)
    data = {"words": words, "lines": lines, "duration": dur}
    (ROOT / "src" / "data" / f"{cid}.audio.json").write_text(json.dumps(data, ensure_ascii=False, indent=1))
    for ln, v in zip(lines, spec["voice"]):
        print(f"{ln['start']:6.2f}–{ln['end']:6.2f}  {v['text'][:60]}")


if __name__ == "__main__":
    main(sys.argv[1])
