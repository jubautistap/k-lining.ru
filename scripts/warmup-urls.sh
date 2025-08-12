#!/bin/bash
set -euo pipefail

BASE_URL="${1:-https://k-lining.ru}"

echo "[warmup] Base: $BASE_URL"

# core pages
URLS=(
  "/" "/services" "/prices" "/contacts" "/calculator"
)

# marketing landings from data/seo-landings.json
JSON="$(cat ./data/seo-landings.json 2>/dev/null || echo '{}')"
SLUGS=$(echo "$JSON" | node -e 'let s="";const o=JSON.parse(require("fs").readFileSync(0,"utf8"));for(const k of Object.keys(o)){s+=k+"\n"}console.log(s)')

COUNT=0
while IFS= read -r slug; do
  [[ -z "$slug" ]] && continue
  URLS+=("/$slug")
  COUNT=$((COUNT+1))
  [[ $COUNT -ge 50 ]] && break # ограничим разогрев 50 урлами за прогон
done <<< "$SLUGS"

for u in "${URLS[@]}"; do
  echo "[warmup] GET $BASE_URL$u"
  curl -fsS -o /dev/null "$BASE_URL$u" || true
done

echo "[warmup] done: ${#URLS[@]} URLs"


