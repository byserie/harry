#!/bin/bash
# Uso: scripts/render_batch.sh Short-P1-1 Short-P1-2 ...  (renderiza en orden, vertical)
cd "$(dirname "$0")/.."
while pgrep -f "remotion render" >/dev/null; do sleep 10; done
for c in "$@"; do
  npx remotion render "$c" "out/final/shorts-gancho/$c.mp4" --codec=h264 --crf=20 --concurrency=4 > "/tmp/claude-0/r-$c.log" 2>&1 || echo "FALLO $c"
  echo "listo $c"
done
