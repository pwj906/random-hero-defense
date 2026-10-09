# 랜덤 히어로 디펜스 — 작업 규칙

운빨존많겜 규칙 기반 HTML 캔버스 디펜스 게임. 사용자와는 한국어 반말로 대화한다.

## 파일
- `src/unppal-defense.html` — **원본. 수정은 항상 여기서만 한다.** 그림(WebP data URI)이 전부 박힌 단일 HTML.
- `index.html`, `game.js`, `pack.json`, `pack-1.json`, `pack-2.json`… — 배포용. `tools/build.py`가 원본에서 자동 생성한다. 직접 고치지 않는다.
  - 그림을 pack 파일로 빼는 이유: 그림이 HTML 안에 많으면 claude.ai 공개 공유 검토가 막힌다.
  - pack은 7MB씩 나눈다(아티팩트 파일 하나 16MB 한도). `pack.json`은 목록, `pack-N.json`이 그림 묶음.

## 업데이트할 때마다 (자동 배포)
1. `src/unppal-defense.html` 수정. 메인 화면의 버전 표시 `>v1NN<`와 랭킹 기록용 `v:1NN`을 함께 올린다.
2. `tools/deploy.sh "vNNN: 바꾼 내용"` 실행 → 빌드, 문법 검사, 커밋, push.
   - GitHub Pages(main 브랜치 / root)가 1~2분 안에 https://pwj906.github.io/random-hero-defense/ 에 반영한다.
3. claude.ai 아티팩트(https://claude.ai/artifact/QzZJKSqcjsDtUz14ccwMRg)도 같은 `index.html`과 files `{game.js, pack.json, pack-1.json, pack-2.json…}`로 다시 게시한다. `capabilities`는 생략해서 기존 설정(db·user)을 유지한다.
4. 커밋 메시지 끝에는 세션 안내에 있는 Co-Authored-By 줄을 붙인다.

## 랭킹
- claude.ai 아티팩트 안: 아티팩트 db(`rank/<viewer id>`). 외부 공개 링크 방문자는 쓰기가 막혀 기록 코드로 대체.
- GitHub Pages(공개 배포판): Supabase `https://loegtuubjzsfkexehuvn.supabase.co`, publishable 키는 코드에 있음(공개용).
  - 테이블 `public.runs`: 판마다 한 줄(pid, nick, w, k, t, created_at). 누구나 읽기·추가만 가능, 수정·삭제 불가.
  - 순위: 웨이브 내림차순 → 처치 내림차순 → 시간 오름차순, 상위 100.
  - 예전 `public.rank` 표와 `submit_score`/`set_nick` 함수는 안 쓴다.

## 그림
- v5 그림(제륵 보스2~6·현상금·특수적·컷인, 사용자 스킬, 증강·복권·박스·시너지칩, 전투FX)은 원본의 `V5` 상수(키 = GPT 묶음의 animation.json asset 키)에 있다. `v5i(키,프레임)`으로 꺼낸다.
- 보스 순서: 10웨이브마다 1(카록스)·2(나르굴)·3(두르간)·4(벨사르)·6(제르칸, 50웨이브)·5(티크론) 반복. `JB`, `bossKind`, `bossFire` 참고.
- 그림은 사용자가 GPT로 만들어 zip으로 준다. 캐릭터 256×256, 발 (128,240), 오른쪽을 봄.
- `PKG`(JSON) 안에 프레임은 168px WebP q70, 효과는 144px로 줄여 넣는다.

## 행성
- 행성은 8개(루미엘 추가). 판마다 7개를 고른다(`SAVE.pl`, `plIn()`, `buildBY()`가 start에서 소환 풀을 다시 만든다).
- 잠긴 행성은 `LOCKP`(루미엘: 최고 기록 100웨이브 초과 시 해금). 잠긴 영웅은 `ownedList()`에서 빠지고 내 캐릭터에 🔒 카드로 보인다.
- 파우니아의 우주 히어로는 현무(`hyeonmu`, 조합식은 예전 청람 것 승계). 청람(`cheongram`)은 `planet:'drakanis', hidden:1`로 빼 둠 — 용족 신규 행성(이름 미확정)이 나오면 그 행성 5단계로 붙이고 hidden을 지운다. 저장 데이터의 cheongram 레벨·조각은 그대로 둔다.
- 새 영웅 그림은 `PKG`에 넣는다(프레임 168px, 효과 144px, sock은 256 기준 ×4).

## 계정 (공개 배포판만)
- 아이디·비밀번호 → Supabase Auth(이메일 `아이디@player.rhd.app`로 바꿔 가입, 이메일 확인은 꺼 둠). `AC`, `acLogin`, `acPush`.
- 진행 상황 `SAVE` 전체를 `public.saves`(user_id, data jsonb)에 저장. 표 만들기 SQL은 `supabase/saves.sql`.
- 로그인하면 랭킹 pid가 `u`+사용자 id 앞 20자로 바뀐다. claude.ai 아티팩트 안에서는 로그인 버튼이 안 보인다.
