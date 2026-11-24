"""Genera la voz de cada gancho de los Shorts.
Uso: VOICE_SPEED=1.1 python3 scripts/hooks.py [lista.json] [salida.json]"""
import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
import audio as A  # noqa: E402

LIST = Path(sys.argv[1]) if len(sys.argv) > 1 else A.ROOT / "src" / "shorts" / "list.json"
OUT = Path(sys.argv[2]) if len(sys.argv) > 2 else A.ROOT / "src" / "data" / "hooks.json"
items = json.loads(LIST.read_text())
out = {}
for it in items:
    sig = A.tts(it["hook"], 0)
    A.write_wav(A.ROOT / "public" / "audio" / "hooks" / f"{it['id']}.wav", np.stack([sig, sig], 1))
    words = A.word_times(it["hook"], sig, 0.0)
    out[it["id"]] = {"dur": round(len(sig) / A.SR, 3), "words": words}
    print(it["id"], out[it["id"]]["dur"])
OUT.write_text(json.dumps(out, ensure_ascii=False))
