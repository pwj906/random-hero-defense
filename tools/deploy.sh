#!/usr/bin/env bash
# 원본(src/unppal-defense.html) → 배포 파일 3개로 나누고 main에 올린다. GitHub Pages가 1~2분 안에 자동 반영한다.
set -euo pipefail
cd "$(dirname "$0")/.."
python3 tools/build.py
node --check game.js
git add -A
msg="${1:-게임 업데이트}"
git commit -m "$msg" || { echo "바뀐 게 없음"; exit 0; }
git push origin main
