# 랜덤 히어로 디펜스

운빨존많겜 규칙을 바탕으로 만든 HTML 캔버스 디펜스 게임.

플레이: https://pwj906.github.io/random-hero-defense/

- `src/unppal-defense.html` — 원본 (수정은 여기서)
- `tools/build.py` — 원본을 `index.html`·`game.js`·`pack.json`으로 나눔
- `tools/deploy.sh` — 빌드 후 main에 push (GitHub Pages 자동 반영)

## 랜덤 히어로 서바이버 (뱀서류)

플레이: https://pwj906.github.io/random-hero-defense/survivor/

- `src/survivor.html` — 원본 (수정은 여기서, claude.ai 아티팩트 본문 형식)
- `survivor/assets.js` — 영웅·적 그림 묶음
- `tools/build_survivor.py` — 원본을 `survivor/index.html`(완전한 HTML)로 만듦
- `supabase/survivor.sql` — 전진 거리 랭킹 표 `survivor_runs`
