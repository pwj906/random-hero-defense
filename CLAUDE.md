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
- 파우니아의 우주 히어로는 현무(`hyeonmu`, 조합식은 예전 청람 것 승계). 청람(`cheongram`)은 코드·그림·저장 데이터에서 전부 삭제했다(`saveClean()`이 옛 저장에서도 지움). 용족 행성의 청룡은 새로 만든다.
- 드라카니스(`drakanis`, 정의로운 용족, 범위 공격 위주, 3판 이상 플레이 시 해금 `LOCKP.g`, `PL_POW` 1.12, 시너지 공격력 +20%): 뿔꼬마(hornkid)·용아 창병(fang_lancer)·흑철 용인(iron_dragonkin)·홍련 용장(hongryeon)·청룡(cheongryong). 기본공격 모양 `PV.shp`('line'/'cone', `shapeHit`), 부채꼴 특수기 `SP.cone`, 청룡 번개 연쇄 그림 `pk.chain`(bounce).
- 비익성(`biikseong`, 조인족, 110웨이브 돌파 해금, 시너지 공격속도 +20%·사거리 +0.5칸): 피유(feather_courier)·시엘(feather_archer)·오르윈(storm_owl)·아우렐(goldwing_commander)·주작(jujak).
- 설령성(`seolryeong`, 눈·얼음 정령, 5판 이상 해금, 시너지 공격력·감속, `PL_POW` 1.2): 뭉치(snowkid)·빙키(icicle_bat, 공중형이라 그림을 34px 띄워 인코딩)·설봉(snow_yeti)·빙각(ice_golem)·백호(baekho). 전원 기본공격에 감속.
- 신규 행성 공격력 보너스 `PL_POW`: 루미엘 1.28, 드라카니스·비익성 1.2. 벤치마크(적 24마리 무적 더미 30초)에서 신규 행성 영웅은 같은 등급 기존 평균의 1.2~2.3배, 신규 우주는 모든 기존 우주보다 위.
- 파우니아 행성 등급 백련(백호)은 무겸(흑웅관장)으로 교체: ID `mugyeom`, 능력 그대로, 옛 white_tiger 저장은 `saveClean()`이 무겸으로 옮김. 백호는 나중에 별도 행성.
- 특수 조합(`FUSION`, 분류 '특수조합', 영웅별 개별 강화 `G.fuLv` +30%/강, 비용 80+80·lv, 조합 비용 500+300·n): 아스트라온(astraon)=제욱스+아르케온, 진무=현무+청룡, 적황=주작+백호, 영겁수(yeongeopsu)=실바이온+크로넬, 운화(unhwa)=실바이온+벨카온, 운명의 시계술사(clockweaver)=크로넬+루네트+벨카온, 녹스=루네트+벨카온+셀레네(그림 대기), 황룡(hwangryong)=진무+적황.
  - 특수기는 `FUSK[id]`(특수기 분기 `s.fusk`). 황룡은 15초마다 청룡→현무→주작→백호 순환(`c.hwI`, 동작 `aniSk`). 1칸 점유, 크게 그림(GPT 문서는 2칸·4칸 제안).
  - 키포즈 4명(아스트라온·영겁수·운화·시계술사)은 프레임 1장씩 + 효과 1장씩, 효과는 `kpf`/FXD.kp(커지며 사라짐).
  - 밸런스: 벤치(allpow3, 움직이는 적 24마리·보스 1마리, 60초)에서 재료 합의 약 2.6배(군중·보스 둘 다), 황룡은 진무+적황의 약 2.3배. `HPW`(군중)·`FUB`(보스 피해 보정)로 맞춤.
  - 조합 시작 강화 레벨 `fuStartLv`: 재료 행성 강화 평균×0.83, 황룡은 진무·적황 강화 비용의 70%를 레벨로 환산.
- 컷인: 왼쪽이 빈 그림(주작·백호)은 `CUT_LT`로 글자를 왼쪽에. 새 컷인은 전체를 채워 달라고 요청(outputs/gpt-request-v225.md).
- 증강 점검(augbench, 처치 처리량): 연쇄 폭발 6%·재폭발 없음, 신의 눈은 사거리+3칸·공격력+30%, 우주 가속 -25%, 동상 +40%로 너프. 새 증강 9종(재빠른 손·소환사 숙련·보스 현상금·융합 연구·우주 단련·마나 순환·약점 포착·초월·과부하).
- 황금 소나기(사용자 스킬)는 '다음 소환 5번 무료'(`G.freeN`).
- 우주 조합 비용: 350부터 200씩(`CRAFT_C0/STEP`, GROW 1). 다음 목표는 우주끼리 합치는 상위 우주 히어로.
- 새 영웅 그림은 `PKG`에 넣는다(프레임 168px, 효과 144px, sock은 256 기준 ×4).

## 계정 (공개 배포판만)
- 아이디·비밀번호 → Supabase Auth(이메일 `아이디@player.rhd.app`로 바꿔 가입, 이메일 확인은 꺼 둠). `AC`, `acLogin`, `acPush`.
- 진행 상황 `SAVE` 전체를 `public.saves`(user_id, data jsonb)에 저장. 표 만들기 SQL은 `supabase/saves.sql`.
- 로그인하면 랭킹 pid가 `u`+사용자 id 앞 20자로 바뀐다. claude.ai 아티팩트 안에서는 로그인 버튼이 안 보인다.

- 행성 설명·시너지 문구에는 숫자를 쓰지 않는다(콘셉트만, 예: '공격속도 · 사거리'). 엘더론의 '옆에 플로라시아 영웅이 있으면 강화(1.4배)'는 synTick에서 처리.
