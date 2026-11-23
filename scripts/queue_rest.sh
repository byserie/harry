#!/bin/bash
cd "$(dirname "$0")/.."
while pgrep -f "render_batch.sh Short-P1" >/dev/null; do sleep 15; done
scripts/render_batch.sh Short-P3-1 Short-P3-2 Short-P3-3 Short-P3-4 Short-P3-5 Short-P4-1 Short-P4-2 Short-P4-3 Short-P4-4 Short-P5-1 Short-P5-2 Short-P5-3 Short-P5-4 Short-P6-1 Short-P6-2 Short-P6-3 Short-P7-1 Short-P7-2 Short-P7-3 Short-P8-1 Short-P8-2 Short-P8-3
for x in "P6FullYT misterio-del-principe" "P7FullYT reliquias-de-la-muerte-1" "P8FullYT reliquias-de-la-muerte-2"; do
  set -- $x
  npx remotion render $1 out/final/$2-youtube-16x9.mp4 --codec=h264 --crf=20 --concurrency=4 > /tmp/claude-0/r-$1.log 2>&1 && echo "listo $2" || echo "FALLO $1"
done
