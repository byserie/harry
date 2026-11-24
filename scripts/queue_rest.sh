#!/bin/bash
# Primero los momentos clave, después los Shorts con gancho que faltan (pelis 4-8)
cd "$(dirname "$0")/.."
OUT=out/final/momentos scripts/render_batch.sh Momento-M1-zoo Momento-M1-cartas Momento-M1-troll Momento-M1-ajedrez Momento-M2-torta Momento-M2-vociferador Momento-M2-pocion Momento-M2-aragog Momento-M3-marge Momento-M3-autobus Momento-M3-boggart Momento-M3-lobo Momento-M4-dragon Momento-M4-baile Momento-M4-lago Momento-M4-ritual Momento-M5-umbridge Momento-M5-descubren Momento-M5-duelo Momento-M6-lavender Momento-M6-veneno Momento-M6-libro Momento-M6-cueva Momento-M7-siete Momento-M7-ministerio Momento-M7-pelea Momento-M7-cierva Momento-M8-banco Momento-M8-neville Momento-M8-recuerdos Momento-M8-duelo
scripts/render_batch.sh Short-P4-2 Short-P4-3 Short-P4-4 Short-P5-1 Short-P5-2 Short-P5-3 Short-P5-4 Short-P6-1 Short-P6-2 Short-P6-3 Short-P7-1 Short-P7-2 Short-P7-3 Short-P8-1 Short-P8-2 Short-P8-3
