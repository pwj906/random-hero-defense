
// 집 등급 제외 (v265): NO_HOME=0으로 바꾸면 전부 원래대로. 집 영웅 데이터·그림은 그대로 남아 있음
const NO_HOME=1;let HOME_COST=2.7;
const TN=['집','동네','나라','행성','우주'], TC=['#aaaab3','#77bd50','#30b6f4','#ac6cec','#f5b63c'];
const PLANETS={earth:'지구',purmia:'파우니아',toytopia:'토이토피아',gearon:'기어론',mosaica:'모자이카',florasia:'플로라시아',mongle:'몽글성',lumiel:'루미엘',drakanis:'드라카니스',biikseong:'비익성',seolryeong:'설령성',haeyeon:'해연',fusion:'특수조합'};
const PICON={haeyeon:__P(1),earth:__P(2),purmia:__P(3),toytopia:__P(4),gearon:__P(5),mosaica:__P(6),florasia:__P(7),mongle:__P(8),lumiel:__P(9),drakanis:__P(10),biikseong:__P(11),seolryeong:__P(12)};
function pic(p){return PICON[p]?'<img class="pic" src="'+PICON[p]+'" alt="">':''}

// 승급의 행성 유지 여부는 미확정: 기존 전체 등급 풀 유지.
const U={
 veteran:{planet:'earth',n:'춘식',nick:'돌아온 참전용사',e:'🎖️',t:1,d:550,s:1/1.2,r:'4c',scale:1.5,x:'소총 발사 — 원거리 단일 (1.2초 간격)'},
 zeus:{planet:'earth',n:'제욱스',nick:'전기의 신',e:'⚡',t:4,d:120000,s:1/0.8,r:'4c',scale:1.3,x:'번개창 투척 — 원거리 단일 (0.8초 간격)'},
 jir:{planet:'earth',n:'볼트란',nick:'번개의 계승자',e:'⚡',t:3,d:21000,s:1/0.9,r:'3c',scale:1.5,x:'찌릿 탄 — 원거리 단일 (0.9초 간격)'},
 napoleon:{planet:'earth',n:'레오폴',nick:'몰락한 정복자',e:'🎩',t:2,d:3000,s:1/1.0,r:'3c',scale:1.5,x:'권총 발사 — 원거리 단일 (1.0초 간격)'},
 archeon:{planet:'gearon',n:'아르케온',nick:'최초의 코어',e:'🛰️',t:4,d:120000,s:1/0.8,r:'4c',scale:1.3,x:'코어 광탄 — 원거리 단일 (0.8초 간격)'},
 policebot:{planet:'gearon',n:'센트론',nick:'강철의 집행자',e:'🚨',t:2,d:3000,s:1/1.0,r:'3c',scale:1.15,x:'레이저 사격 — 원거리 단일 (1.0초 간격)'},
 fortressbot:{planet:'gearon',n:'바스티온',nick:'움직이는 요새',e:'💥',t:3,d:21000,s:1/1.3,r:'4c',scale:1.2,sp:'0.8c',sf:.15,smax:2,x:'중포 발사 — 단일 100% + 주변 0.8칸 최대 2명에게 15% (1.3초 간격)'},
 cleanbot:{planet:'gearon',n:'모프',nick:'버려진 거리의 청소부',e:'🧹',t:0,d:100,s:1/1.4,r:'2c',scale:1.15,x:'나사 발사 — 원거리 단일 (1.4초 간격)'},
 deliverybot:{planet:'gearon',n:'덱스',nick:'멈추지 않는 배달부',e:'📦',t:1,d:550,s:1/1.2,r:'3c',scale:1.2,x:'택배 투척 — 원거리 단일 (1.2초 간격)'},
 hyeonmu:{planet:'purmia',n:'현무',nick:'대지를 다스리는 왕',e:'🐢',t:4,d:120000,s:1/1.1,r:'3.5c',inst:1,hc:'#3fe0b0',scale:1.3,x:'지맥 강타 — 적 위치에 지면 충격파 (1.1초 간격)'},
 orca:{planet:'purmia',n:'오르칸',nick:'밀물의 인도자',e:'🐋',t:2,d:3000,s:1/1.0,r:'3c',scale:1.35,x:'물방울 탄 — 원거리 단일 (1.0초 간격)'},
 mugyeom:{planet:'purmia',n:'무겸',nick:'흑웅관장',e:'🐻',t:3,d:21000,s:1/0.9,r:'1.6c',scale:1.25,x:'곰권 연타 — 근접 주먹 (0.9초 간격)'},
 mole:{planet:'purmia',n:'두린',nick:'땅속의 개척자',e:'🦫',t:0,d:100,s:1/1.4,r:'2c',scale:2,x:'흙덩이 던지기 — 원거리 단일 (1.4초 간격)'},
 alpaca:{planet:'purmia',n:'알바',nick:'초원의 심술꾼',e:'🦙',t:1,d:550,s:1/1.2,r:'3c',scale:1.5,x:'침 뱉기 — 원거리 단일 (1.2초 간격)'},
 lunette:{planet:'toytopia',n:'루네트',nick:'버려진 소원의 주인',e:'🪆',t:4,d:120000,s:1/0.8,r:'4c',inst:1,hc:'#c77dff',scale:1.3,x:'저주 실 — 적 위치 직접 타격 (0.8초 간격)'},
 bricks:{planet:'toytopia',n:'브릭스',nick:'먼 곳을 꿰뚫는 눈',e:'🎯',t:2,d:5400,s:1/2.0,r:'6c',scale:1.5,x:'블록 탄환 — 초장거리 단일 (2.0초 간격)'},
 mold:{planet:'toytopia',n:'몰드',nick:'흐르는 손아귀',e:'🫠',t:3,d:34000,s:1/1.0,r:'2c',melee:1,sp:'0.9c',sf:.25,smax:2,scale:1.5,x:'찰흙 후려치기 — 근접 100% + 주변 0.9칸 최대 2명에게 25% (1.0초 간격)'},
 pico:{planet:'toytopia',n:'피코',nick:'작은 태엽의 용사',e:'🐤',t:0,d:160,s:1/1.0,r:'1.5c',melee:1,scale:1.5,x:'부리 쪼기 — 근접 단일 (1.0초 간격)'},
 jacko:{planet:'toytopia',n:'잭코',nick:'상자 속 도전자',e:'🥊',t:1,d:850,s:1/1.0,r:'1.5c',melee:1,scale:1.5,x:'근거리 펀치 — 근접 단일 (1.0초 간격)'},
 orbin:{planet:'mosaica',n:'오르빈',nick:'빠진 송곳니의 노신사',e:'🦷',t:0,d:105,s:1/1.3,r:'2.5c',scale:1.5,x:'틀니 투척 — 원거리 단일 (1.3초 간격)'},
 nero:{planet:'mosaica',n:'네로',nick:'골목의 동전 수집가',e:'🪙',t:1,d:500,s:1/1.1,r:'3c',scale:1.5,x:'동전 투척 — 원거리 단일 (1.1초 간격)'},
 vargon:{planet:'mosaica',n:'바르곤',nick:'끝없는 식욕의 수집가',e:'🍲',t:2,d:3000,s:1/1.1,r:'3c',scale:1.5,x:'냄비 투척 — 원거리 단일 (1.1초 간격)'},
 seraphine:{planet:'mosaica',n:'세라핀',nick:'운명의 실을 엮는 자',e:'🧵',t:3,d:15000,s:1/1.0,r:'3c',scale:1.5,x:'금빛 실 — 원거리 단일 (1.0초 간격)'},
 belkaon:{planet:'mosaica',n:'벨카온',nick:'운명을 거는 군주',e:'🎲',t:4,d:100000,s:1/0.8,r:'4c',scale:1.3,x:'칩 투척 — 원거리 단일 (0.8초 간격)'},
 floret:{planet:'florasia',n:'플로렛',nick:'배고픈 꽃봉오리',e:'🌺',t:0,d:100,s:1/1.3,r:'2.5c',scale:1.5,x:'씨앗 투척 — 원거리 단일 (1.3초 간격)'},
 sporun:{planet:'florasia',n:'스포룬',nick:'포자 우산지기',e:'🍄',t:1,d:480,s:1/1.2,r:'3c',scale:1.5,x:'포자 투척 — 원거리 단일 (1.2초 간격)'},
 cacton:{planet:'florasia',n:'칵톤',nick:'가시의 집행자',e:'🌵',t:2,d:6000,s:1/1.0,r:'2c',melee:1,scale:1.5,x:'가시 주먹 — 근접 단일 (1.0초 간격)'},
 elderon:{planet:'florasia',n:'엘더론',nick:'뿌리 깊은 숲의 수호자',e:'🌳',t:3,d:32000,s:1/1.0,r:'2c',melee:1,syn:1.4,scale:1.5,x:'뿌리 주먹 — 근접 단일 (1.0초 간격). 옆 칸(대각 포함)에 플로라시아 아군이 있으면 피해 +40%'},
 sylvaion:{planet:'florasia',n:'실바이온',nick:'별빛을 품은 세계수',e:'🌳',t:4,d:110000,s:1/0.8,r:'4c',scale:1.3,x:'황금 씨앗 — 원거리 단일 (0.8초 간격)'},
 momo:{planet:'mongle',n:'모모',nick:'통통 파동 도우미',e:'🫧',t:0,d:95,s:1/1.3,r:'2.5c',scale:1.5,x:'젤리 구슬 — 원거리 단일 (1.3초 간격)'},
 pulu:{planet:'mongle',n:'푸루',nick:'느릿한 젤리 비행사',e:'🪼',t:1,d:450,s:1/1.2,r:'3c',sl:.6,scale:1.5,x:'끈적 구슬 — 원거리 단일 + 0.6초 감속 (1.2초 간격)'},
 bubon:{planet:'mongle',n:'부본',nick:'압축 파동 주먹',e:'👊',t:2,d:5800,s:1/1.0,r:'2c',melee:1,scale:1.5,x:'압축 젤리 주먹 — 근접 단일 (1.0초 간격)'},
 stella:{planet:'mongle',n:'스텔라',nick:'튀어 오르는 별의 파동',e:'⭐',t:3,d:15000,s:1/1.0,r:'3c',bnc:2,bf:.6,scale:1.5,x:'별 구슬 — 맞은 적에서 근처 적 2명에게 60%씩 튕김 (1.0초 간격)'},
 chronel:{planet:'mongle',n:'크로넬',nick:'시간을 붙잡는 젤리 군주',e:'⏳',t:4,d:105000,s:1/0.8,r:'4c',scale:1.3,x:'황금 핵 구슬 — 원거리 단일 (0.8초 간격)'},
 lulu:{planet:'lumiel',n:'루루',nick:'꿈별 잠꾸러기',e:'⭐',t:0,d:100,s:1/1.3,r:'2.5c',scale:1.5,x:'별가루 — 원거리 단일 (1.3초 간격)'},
 miel:{planet:'lumiel',n:'미엘',nick:'달꽃 배달부',e:'🌼',t:1,d:550,s:1/1.1,r:'3c',scale:1.5,x:'달꽃 던지기 — 원거리 단일 (1.1초 간격)'},
 noctia:{planet:'lumiel',n:'녹티아',nick:'월식 기사',e:'🔨',t:2,d:3000,s:1/1.3,r:'1.6c',melee:1,scale:1.5,x:'월식 강타 — 근접 (1.3초 간격)'},
 aurielle:{planet:'lumiel',n:'오리엘',nick:'여명의 별 사제',e:'🌟',t:3,d:21000,s:1/1.0,r:'3.5c',scale:1.5,x:'성광탄 — 원거리 단일 (1.0초 간격)'},
 selene:{planet:'lumiel',n:'셀레네',nick:'월광의 여왕',e:'🌙',t:4,d:120000,s:1/0.9,r:'1.8c',melee:1,scale:1.3,x:'초승달 대검 — 근접 범위 (0.9초 간격)'},
 hornkid:{planet:'drakanis',n:'뿔꼬마',nick:'불씨 악동',e:'🔥',t:0,d:100,s:1/1.2,r:'2.5c',scale:1.5,x:'불씨 퉤 — 불씨가 터지며 좁은 범위 (1.2초 간격)'},
 fang_lancer:{planet:'drakanis',n:'용아 창병',nick:'청록의 관통 창병',e:'🔱',t:1,d:550,s:1/1.1,r:'2.4c',melee:1,scale:1.5,x:'용아 관통 — 창을 뻗어 일직선 관통 (1.1초 간격)'},
 iron_dragonkin:{planet:'drakanis',n:'흑철 용인',nick:'검은 강철의 용',e:'👊',t:2,d:3000,s:1/1.3,r:'2.6c',inst:1,hc:'#ff8a3c',scale:1.5,x:'흑철 강타 — 표적 주변 지면 충격파 (1.3초 간격)'},
 hongryeon:{planet:'drakanis',n:'홍련 용장',nick:'붉은 도끼의 용장',e:'🪓',t:3,d:21000,s:1/1.1,r:'1.9c',melee:1,scale:1.5,x:'홍련 휩쓸기 — 도끼로 앞쪽 부채꼴을 벰 (1.1초 간격)'},
 cheongryong:{planet:'drakanis',n:'청룡',nick:'창천을 다스리는 정의의 용',e:'🐉',t:4,d:120000,s:1/0.9,r:'4c',inst:1,hc:'#7fd0ff',scale:1.3,x:'천뢰 연쇄 — 낙뢰가 근처 적들로 이어짐 (0.9초 간격)'},
 feather_courier:{planet:'biikseong',n:'피유',nick:'깃털 배달부',e:'🪶',t:0,d:100,s:1/1.0,r:'2.8c',scale:1.5,x:'바람 깃털 — 작은 바람탄, 맞은 곳 좁은 범위 (1.0초 간격)'},
 feather_archer:{planet:'biikseong',n:'시엘',nick:'비익 궁수',e:'🏹',t:1,d:550,s:1/1.0,r:'3.8c',scale:1.5,x:'깃털 화살 — 일직선으로 꿰뚫음 (1.0초 간격)'},
 storm_owl:{planet:'biikseong',n:'오르윈',nick:'폭풍 부엉이 현자',e:'🦉',t:2,d:3000,s:1/1.2,r:'3.2c',inst:1,hc:'#5fd0ff',scale:1.5,x:'작은 회오리 — 적 위치에 회오리 범위 (1.2초 간격)'},
 goldwing_commander:{planet:'biikseong',n:'아우렐',nick:'금익 창장',e:'🦅',t:3,d:21000,s:1/1.0,r:'2c',melee:1,scale:1.5,x:'황금 창 휩쓸기 — 앞쪽 부채꼴 (1.0초 간격)'},
 jujak:{planet:'biikseong',n:'주작',nick:'홍익의 우주 신조',e:'🐦‍🔥',t:4,d:120000,s:1/0.85,r:'4.2c',scale:1.3,x:'불꽃 깃털 비 — 깃털이 터지며 넓은 범위 (0.85초 간격)'},
 snowkid:{planet:'seolryeong',n:'뭉치',nick:'눈뭉치 꼬마',e:'☃️',t:0,d:100,s:1/1.1,r:'2.6c',scale:1.5,x:'눈덩이 투척 — 좁은 범위 + 감속 (1.1초 간격)'},
 icicle_bat:{planet:'seolryeong',n:'빙키',nick:'고드름 박쥐',e:'🦇',t:1,d:550,s:1/1.0,r:'3.4c',scale:1.5,x:'고드름 파편 — 일직선 관통 + 감속 (1.0초 간격)'},
 snow_yeti:{planet:'seolryeong',n:'설봉',nick:'설산 예티',e:'🦍',t:2,d:3000,s:1/1.2,r:'1.9c',melee:1,scale:1.5,x:'주먹 강타 — 앞쪽 범위 + 감속 (1.2초 간격)'},
 ice_golem:{planet:'seolryeong',n:'빙각',nick:'빙정 골렘',e:'🧊',t:3,d:21000,s:1/1.2,r:'2.8c',inst:1,hc:'#8fe0ff',scale:1.5,x:'얼음 주먹 — 적 위치 범위 강타 + 감속 (1.2초 간격)'},
 pearlpunch:{planet:'haeyeon',n:'진주먹 꼬마',nick:'조개 주먹 꼬마',e:'🦪',t:0,d:100,s:1/1.4,r:'1.5c',melee:1,ml:1,lgK:.6,scale:1.5,x:'조개권 — 근접 단일 (1.4초 간격)'},
 clawlancer:{planet:'haeyeon',n:'집게창병',nick:'갑각 창병',e:'🦀',t:1,d:550,s:1/1.2,r:'2c',melee:1,ml:1,lgK:.5,scale:1.5,x:'집게창 찌르기 — 근접 단일 (1.2초 간격)'},
 coralgiant:{planet:'haeyeon',n:'산호 거인',nick:'산호초 수호자',e:'🪸',t:2,d:3000,s:1/1.4,r:'2c',melee:1,ml:1,lgK:.4,scale:1.5,x:'산호 강타 — 근접, 표적 주변까지 범위 피해 (1.4초 간격)'},
 abyssadmiral:{planet:'haeyeon',n:'해구 제독',nick:'심해의 닻',e:'⚓',t:3,d:21000,s:1/1.3,r:'2.2c',melee:1,ml:1,lgK:.35,scale:1.5,x:'닻 휩쓸기 — 근접, 표적 주변까지 범위 피해 (1.3초 간격)'},
 poseidon:{planet:'haeyeon',n:'포세이돈',nick:'대양의 지배자',e:'🔱',t:4,d:120000,s:1/1.2,r:'3c',inst:1,auraFx:1,hc:'#5fd8ff',scale:1.3,x:'삼지창 파도참 — 앞쪽 부채꼴 적 모두 (1.2초 간격)'},
 baekho:{planet:'seolryeong',n:'백호',nick:'서천을 다스리는 신수',e:'🐯',t:4,d:120000,s:1/0.6,r:'1.9c',melee:1,scale:1.3,x:'발톱 연격 — 빠른 근접 범위 (0.6초 간격)'},
 jinmu:{planet:'fusion',fu:1,hidden:1,n:'진무',nick:'천지를 지키는 수호장',e:'⚔️',t:4,d:120000,s:1/1.2,r:'4c',melee:1,ml:1,lgK:.35,hc:'#3fe0d0',scale:1.3,x:'창천참 — 표적 주변 범위 참격 (1.2초 간격)'},
 jeokhwang:{planet:'fusion',fu:1,hidden:1,n:'적황',nick:'태양을 두른 백호 군주',e:'🔥',t:4,d:120000,s:1/0.9,r:'4c',melee:1,ml:1,lgK:.35,hc:'#ffb040',scale:1.3,x:'백염조 — 표적 주변 범위 발톱 (0.9초 간격)'},
 noeha:{planet:'fusion',fu:1,hidden:1,n:'뇌해',nick:'살아 있는 폭풍 해일',e:'🌊',t:4,d:120000,s:1/1.4,r:'4c',melee:1,lgK:.27,hc:'#7fc8ff',scale:1.3,x:'뇌조 휩쓸기 — 근접, 파도팔로 앞쪽 부채꼴 적 모두 휩쓸기 (1.4초 간격)'},
 bideung:{planet:'fusion',fu:1,hidden:1,n:'비등',nick:'끓는 바다의 거인',e:'♨️',t:4,d:120000,s:1/1.5,r:'4c',melee:1,ml:1,lgK:.25,hc:'#5fe8e0',scale:1.3,x:'비등압권 — 근접, 땅을 내려쳐 표적 주변 1칸 적 모두에게 피해 (1.5초 간격)'},
 wolroe:{planet:'fusion',fu:1,hidden:1,n:'월뢰',nick:'달빛과 번개의 쌍도끼 전사',e:'🪓',t:4,d:120000,s:1/1.3,r:'4c',melee:1,lgK:.27,hc:'#9fb8ff',scale:1.3,x:'월뢰 쌍월참 — 근접, 쌍도끼로 앞쪽 부채꼴 적 모두 베기 (1.3초 간격)'},
 cheora:{planet:'fusion',fu:1,hidden:1,n:'철아',nick:'코어 지진의 분쇄자',e:'👊',t:4,d:120000,s:1/1.5,r:'4c',melee:1,ml:1,lgK:.25,hc:'#5fe0ff',scale:1.3,x:'지맥 분쇄권 — 근접, 땅을 내려쳐 주변 1칸 적 모두에게 피해 (1.5초 간격)'},
 astraon:{planet:'fusion',fu:1,hidden:1,n:'아스트라온',nick:'천벌의 번개 정령',e:'⚡',t:4,d:120000,s:1/1.4,r:'4.5c',inst:1,hc:'#8fd8ff',scale:1.3,x:'궤도 심판 — 보스 우선 위성 광선, 근처 3명에게 튐 + 받는 피해 증가 (1.4초 간격)'},
 yeongeopsu:{planet:'fusion',fu:1,hidden:1,n:'영겁수',nick:'시간을 품은 세계수',e:'🌳',t:4,d:120000,s:1/1.6,r:'2c',melee:1,ml:1,lgK:.2,hc:'#ffcf5a',scale:1.3,x:'뿌리권 — 근접 광역, 주먹으로 내려쳐 주변 적까지 피해 + 감속 (1.6초 간격)'},
 unhwa:{planet:'fusion',fu:1,hidden:1,n:'운화',nick:'흑화한 운명의 정령',e:'🎲',t:4,d:120000,s:1/1.5,r:'4c',hc:'#ff5a9a',scale:1.3,x:'검은 행운의 칩 — 착탄 주변 범위 피해 (1.5초 간격)'},
 clockweaver:{planet:'fusion',fu:1,hidden:1,n:'시운',nick:'초승달 시계의 주인',e:'🕰️',t:4,d:120000,s:1/1.4,r:'4.5c',hc:'#c48bff',scale:1.3,x:'운명의 실침 — 보스 우선, 주변 범위 피해 + 운명 표식 (1.4초 간격)'},
 nox:{planet:'fusion',fu:1,hidden:1,n:'녹스',nick:'월식의 지배자',e:'🌘',t:4,d:120000,s:1/1.3,r:'2c',melee:1,ml:1,lgK:.27,hc:'#c9a6ff',scale:1.3,x:'월아참 — 근접 암살, 보스 우선 단일 참격 + 8초 운명 표식 (1.3초 간격)'},
 yeongwol:{planet:'fusion',fu:1,hidden:1,n:'영월',nick:'멈춘 순간의 지배자',e:'🌒',t:4,d:120000,s:1/1.3,r:'2.5c',ml:1,inst:1,hc:'#b89cff',scale:1.15,x:'묵월 참선 — 보스 우선, 표적 주변 모든 적 베기 (1.3초 간격)'},
 heukjo:{planet:'fusion',fu:1,hidden:1,n:'흑조',nick:'검은 파도의 운명술사',e:'🃏',t:4,d:120000,s:1/1.4,r:'3c',hc:'#e0b040',scale:1.3,x:'흑조의 패 — 운명 칩 투척, 착탄 주변 범위 피해 (1.4초 간격)'},
 hwangryong:{planet:'fusion',fu:1,hidden:1,n:'황룡',nick:'사신을 거느린 황금 군주',e:'🐉',t:4,d:120000,s:1,r:'4.5c',melee:1,ml:1,lgK:.35,hc:'#ffd23e',scale:1.4,x:'황천참 — 표적 주변 1.4칸 최대 8명 참격 (1초 간격)'},
 gamer:{planet:'earth',n:'민준',nick:'잠들지 않는 게이머',e:'🎮',t:0,d:100,s:1/1.4,r:'2c',scale:1.5,x:'슬리퍼 투척 — 원거리 단일 (1.4초 간격)'},
};
const SP={
 veteran:{n:'수류탄 투척',full:1,cd:30,m:1.3,max:3,r:'1c',nade:1,x:'착지점 반경 1칸 안 최대 3명에게 각 130% 피해 (보스 포함)'},
 zeus:{n:'천벌',full:1,cd:120,m:11,st:2.5,smite:1,x:'사거리 안 모든 적에게 벼락 1100% + 2.5초 기절(보스 제외)'},
 jir:{n:'연쇄 벼락',full:1,cd:60,m:6.5,cm:1.2,r:'3c',bolt:1,x:'벼락 650% + 반경 3칸 안의 모든 적에게 전염 120%'},
 napoleon:{n:'쌍권총 난사',full:1,cd:90,m:.36,fin:1.8,burst:1,x:'쌍권총 30발 난사(각 36%) 후 마무리 2발(각 180%) — 총 1440%, 대상이 쓰러지면 다음 적으로'},
 archeon:{n:'위성 저격',full:1,cd:90,m:14,vu:8,one:3,col:'#7fe3ff',smite:1,x:'사거리 안 보스 → 체력 많은 적 3명에게 궤도 광선 1400% + 8초간 받는 피해 30% 증가'},
 policebot:{n:'진압 광선',full:1,cd:50,m:4,len:'6c',bw:16,beam:1,x:'일직선 관통 광선 — 선 위의 모든 적에게 400%'},
 fortressbot:{n:'전탄 발사',full:1,cd:100,m:.8,per:2,r:'1.3c',salvo:1,x:'미사일 6발 폭격 — 각 착탄 반경 1.3칸의 모든 적에게 80%'},
 cleanbot:{n:'먼지통 폭발',full:1,cd:40,m:1.6,sl:2.5,r:'2.5c',dust:1,x:'주변 2.5칸 안 모든 적에게 160% + 2.5초 감속'},
 deliverybot:{n:'묶음 배송',full:1,cd:45,m:2.4,burst:1,plain:1,x:'택배 3개 연속 투척 — 각 240% (총 720%), 대상이 쓰러지면 다음 적으로'},
 hyeonmu:{n:'지맥 장벽',full:1,cd:90,m:6,r:'1.6c',sl:2,aoe:1,col:'#3fe0b0',zdur:6,seg:'1.3c',zm:.22,zsl:1,x:'가장 앞선 적 앞에 지맥 장벽 3초(적 멈춤) + 그 자리 반경 1.6칸 600%·6초 중력장(0.5초마다 22% + 감속)'},
 orca:{n:'밀물의 응원',full:1,cd:30,m:0,as:1.4,dur:10,r:'1.6c',abuff:1,x:'주변 1칸(대각 포함) 아군의 공격속도 +40%, 10초'},
 mugyeom:{n:'쌍장 강타',full:1,cd:80,m:2,seg:'2.2c',r:'1.1c',st:1,gather:1,x:'길 앞뒤 2.2칸의 적을 한 점으로 끌어모은 뒤 200% + 1초 기절(보스는 끌리지 않음)'},
 mole:{n:'진흙 범벅',full:1,cd:40,m:.8,sl:1.5,r:'1.3c',aoe:1,x:'적 위치 반경 1.3칸에 80% + 1.5초 감속'},
 alpaca:{n:'왕침 한 방',full:1,cd:40,m:2,vu:5,r:'1.2c',aoe:1,proj:1,x:'착탄 반경 1.2칸에 200% + 5초간 받는 피해 30% 증가'},
 lunette:{n:'봉인 해방',full:1,cd:90,m:10,vu:8,r:'2.2c',aoe:1,col:'#c77dff',x:'적이 몰린 곳 반경 2.2칸에 저주 폭발 1000% + 8초간 받는 피해 30% 증가'},
 bricks:{n:'집중 조준',full:1,cd:40,m:9,snipe:1,x:'보스(없으면 체력이 가장 많은 적)에게 900%'},
 mold:{n:'끈적한 손아귀',full:1,cd:45,m:2,seg:'1.2c',cr:'2.5c',dur:6,hold:2,trap:1,x:'길 위에 6초간 찰흙 장판 — 들어온 적 200% + 2초 속박(보스는 감속)'},
 pico:{n:'태엽 박치기',full:1,cd:18,m:3,mhit:1,x:'근접 단일 대상 300%'},
 jacko:{n:'스프링 강타',full:1,cd:30,m:2.2,r:'0.9c',mhit:1,x:'근접 타격 지점 반경 0.9칸에 220%'},
 orbin:{n:'큰 틀니 강타',full:1,cd:22,m:2.6,pkg:1,x:'단일 대상 260% 피해'},
 nero:{n:'행운의 동전',full:1,cd:25,m:2.5,pkg:1,coin:1,x:'단일 대상 250% — 이 공격으로 처치하면 60% 확률로 코인 3배, 10% 확률로 10배 추가'},
 vargon:{n:'아무거나 던지기',full:1,cd:30,m:1,pot:7,fork:3.5,len:'5c',bw:16,bot:3,r:'1.4c',rand:1,x:'무작위 1개 — 냄비: 단일 700% / 포크: 일직선 관통 350% / 양념병: 반경 1.4칸 300%'},
 seraphine:{n:'운명 감기',full:1,cd:40,m:0,dur:12,rate:1.8,r:'1.6c',cdr:1,x:'주변 1칸(대각 포함) 아군의 특수기 쿨타임이 12초간 1.8배 빨리 돎 (세라핀끼리는 적용 안 됨, 중첩 없음)'},
 belkaon:{n:'운명의 주사위',full:1,cd:60,m:0,dur:12,rate:1.6,coinK:25,gamble:1,x:'무작위 1개 — 아군 전체 공격력 +30% 12초 / 아군 전체 특수기 쿨타임 1.6배 빨리 12초 / 코인 획득(처치 코인 25배)'},
 floret:{n:'독 씨앗',full:1,cd:25,m:.35,seg:'1.1c',dur:6,poison:1,x:'명중 지점 길 위에 6초간 독 장판 — 안에 있는 모든 적에게 0.5초마다 35%'},
 sporun:{n:'포자 우산',full:1,cd:24,m:0,dur:12,r:'1.6c',rbuff:1,x:'주변 1칸(대각 포함) 아군의 사거리 +1칸, 12초 (스포룬끼리는 적용 안 됨, 중첩 없음)'},
 cacton:{n:'가시 처형',full:1,cd:20,m:4,thr:.3,exec:1,x:'체력 30% 이하인 적을 즉시 처치(보스 제외). 해당하는 적이 없으면 단일 400%'},
 elderon:{n:'뿌리 강타',full:1,cd:40,m:3,r:'1.2c',mhit:1,x:'타격 지점 반경 1.2칸의 모든 적에게 300%'},
 sylvaion:{n:'세계수의 축복',full:1,cd:80,m:.5,dur:6,sl:.6,roots:1,x:'체력이 깎여 있으면 ❤️+2 (회복 한도 안) + 길 전체 6초 뿌리 장판(0.5초마다 50% + 감속)'},
 momo:{n:'통통 파동',full:1,cd:24,m:0,dur:12,r:'1.6c',slbuff:1,x:'주변 1칸(대각 포함) 아군의 기본공격에 0.8초 감속 부여, 12초 (모모끼리는 적용 안 됨, 중첩 없음)'},
 pulu:{n:'큰 감속 구슬',full:1,cd:30,m:1.5,sl:3,r:'1.3c',aoe:1,proj:1,x:'착탄 반경 1.3칸에 150% + 3초 감속'},
 bubon:{n:'파동 밀치기',full:1,cd:30,m:2,r:'1.2c',kbd:2.5,knock:1,x:'타격 지점 반경 1.2칸의 적에게 200% + 길 뒤쪽으로 2.5칸 밀침(보스는 0.5칸)'},
 stella:{n:'별의 파동',full:1,cd:35,m:4,cm:2.5,hops:8,chain:1,x:'단일 400% 후 근처 적 최대 8명에게 250%씩 연쇄(같은 적 재타격 없음)'},
 chronel:{n:'시간의 벽',full:1,cd:60,m:0,st:0,bst:0,tstop:1,wallv:1,x:'가장 앞선 적 앞에 시간의 벽 2.5초 — 벽 앞의 적은 멈춤, 벽이 사라지면 막혔던 적 3초 감속(보스는 벽 근처 50% 감속만). 피해 없음'},
 lulu:{n:'큰 꿈별',full:1,cd:22,m:2.6,pkg:1,x:'단일 대상 260% 피해'},
 miel:{n:'달꽃 3연타',full:1,cd:30,m:1.8,burst:1,plain:1,x:'달꽃 3송이 연속 — 각 180% (총 540%), 대상이 쓰러지면 다음 적으로'},
 noctia:{n:'월식 붕괴',full:1,cd:40,m:3.2,r:'1.3c',st:1,mhit:1,x:'타격 지점 반경 1.3칸에 320% + 1초 기절(보스 제외)'},
 aurielle:{n:'새벽의 성좌',full:1,cd:45,m:5,r:'1.5c',aoe:1,col:'#ffe9a0',x:'적이 몰린 곳 반경 1.5칸에 별빛 폭발 500%'},
 selene:{n:'월광 단죄',full:1,cd:90,m:17,r:'2.2c',mhit:1,x:'대검 내려베기 — 타격 지점 반경 2.2칸에 1700%'},
 hornkid:{n:'꼬마 불뿜기',full:1,cd:28,m:2.4,cone:1,r:'2.2c',ang:28,col:'#ff9a3c',x:'앞쪽 짧은 부채꼴에 불길 240%'},
 fang_lancer:{n:'청록 휩쓸기',full:1,cd:32,m:2.2,cone:1,sweep:1,r:'2.4c',ang:55,col:'#5fe8c8',x:'창을 크게 휘둘러 앞쪽 넓은 부채꼴에 220%'},
 iron_dragonkin:{n:'용광 브레스',full:1,cd:40,m:3.4,cone:1,r:'3c',ang:38,col:'#ff7a2a',x:'앞쪽 넓은 부채꼴에 화염 브레스 340%'},
 hongryeon:{n:'용암 파쇄',full:1,cd:45,m:5,len:'5c',bw:24,beam:1,x:'도끼를 내려찍어 앞쪽 일직선 5칸에 용암 균열 500%'},
 cheongryong:{n:'창천의 심판',full:1,cd:80,m:10.5,cone:1,r:'4.2c',ang:42,col:'#7fd0ff',big:1,x:'입에서 넓은 부채꼴로 번개 브레스 — 범위 안 모든 적 1050%'},
 feather_courier:{n:'큰 날갯짓',full:1,cd:26,m:2.2,cone:1,sweep:1,r:'2.4c',ang:45,col:'#9fe8ff',x:'앞쪽 부채꼴에 돌풍 220%'},
 feather_archer:{n:'강화 깃털 화살',full:1,cd:32,m:2,len:'6c',bw:22,beam:1,x:'굵은 깃털 화살이 앞쪽 6칸을 꿰뚫음 — 선 위 모든 적 200%'},
 storm_owl:{n:'폭풍 회오리',full:1,cd:40,m:3.6,r:'1.6c',sl:2.5,aoe:1,col:'#5fd0ff',x:'적이 몰린 곳 반경 1.6칸에 폭풍 360% + 2.5초 감속'},
 goldwing_commander:{n:'황금 바람 찌르기',full:1,cd:45,m:5.5,len:'5.5c',bw:30,beam:1,x:'황금 바람과 함께 창을 찔러 앞쪽 5.5칸을 넓게 꿰뚫음 550%'},
 jujak:{n:'홍익 화염 폭풍',full:1,cd:80,m:6.5,r:'2.3c',aoe:1,col:'#ff6a2a',zdur:5,seg:'1.6c',zm:.2,x:'적이 몰린 곳 반경 2.3칸에 화염 폭풍 650% + 5초간 불길(0.5초마다 20%)'},
 snowkid:{n:'큰 눈덩이',full:1,cd:26,m:1.6,r:'1.2c',sl:2.5,aoe:1,proj:1,col:'#cfefff',x:'큰 눈덩이 — 착탄 반경 1.2칸에 160% + 2.5초 감속'},
 icicle_bat:{n:'고드름 부채',full:1,cd:30,m:2.4,cone:1,r:'3c',ang:30,col:'#8fe0ff',x:'고드름을 부채꼴로 흩뿌림 — 앞쪽 부채꼴 240%'},
 snow_yeti:{n:'눈사태',full:1,cd:38,m:3.4,cone:1,sweep:1,r:'2.6c',ang:50,col:'#e8f6ff',x:'양 주먹으로 앞쪽 넓은 부채꼴에 눈사태 충격파 340%'},
 ice_golem:{n:'얼음 균열',full:1,cd:45,m:3.2,r:'1.8c',sl:3,aoe:1,col:'#8fe0ff',zdur:4,seg:'1.4c',zm:.08,zsl:1.5,x:'적이 몰린 곳 반경 1.8칸에 320% + 3초 감속, 4초간 얼음 균열(0.5초마다 8% + 감속)'},
 pearlpunch:{n:'진주 쌍권',full:1,fusk:1,cd:26,m:1,col:'#bfe9ff',x:'양 주먹으로 한 명에게 320%'},
 clawlancer:{n:'집게 휩쓸기',full:1,fusk:1,cd:30,m:1,col:'#ff9a5a',x:'앞쪽 90도 부채꼴 적 최대 3명에게 300%'},
 coralgiant:{n:'산호 분출',full:1,fusk:1,cd:38,m:1,col:'#ff8a6a',x:'표적 지점 반경 1칸 적 최대 6명에게 400%'},
 abyssadmiral:{n:'해구 견인',full:1,fusk:1,cd:45,m:1,col:'#3fb8ff',x:'적이 몰린 곳 반경 1.4칸 최대 8명에게 400% + 소용돌이 쪽으로 끌어당김(보스는 감속)'},
 poseidon:{n:'대양의 심판',full:1,fusk:1,cd:80,m:1,col:'#5fd8ff',x:'전장의 모든 적에게 해일 800% + 뒤로 밀치고 2초 감속(보스는 감속만)'},
 baekho:{n:'백호 포효',full:1,cd:80,m:13,r:'2.4c',st:1,mhit:1,x:'포효 후 넓은 참격 — 타격 지점 반경 2.4칸에 1300% + 1초 기절(보스 제외)'},
 jinmu:{n:'천지단죄 쌍벽',full:1,cd:90,m:16.5,r:'2c',st:0,sl:2,aoe:1,col:'#3fe0d0',zdur:5,seg:'1.6c',zm:.4,zsl:1,x:'가장 앞선 적 앞과 1.6칸 뒤에 벽 2개 2.5초(적 멈춤) + 반경 2칸 방패·대검 1650%·5초 중력장(0.5초마다 40% + 감속)'},
 jeokhwang:{n:'적천멸섬',full:1,cd:90,m:20,r:'2c',aoe:1,burn:.06,burnT:5,col:'#ff7a2a',x:'적이 몰린 곳 반경 2칸에 교차 참격 2000% + 5초 화상'},
 noeha:{n:'천해 뇌쇄',full:1,fusk:1,cd:60,m:1,col:'#7fc8ff',x:'적이 몰린 곳 반경 1.5칸에 파도 800%, 이어서 번개가 근처 적 최대 5명에게 연쇄 300% + 0.6초 마비'},
 bideung:{n:'임계압 대폭발',full:1,fusk:1,cd:60,m:1,col:'#5fe8e0',x:'자기 주변 반경 2.5칸 적 모두에게 증기 폭발 1000% + 뒤로 밀치기(보스는 0.2초 마비)'},
 wolroe:{n:'월광 천뢰십자',full:1,fusk:1,cd:60,m:1,col:'#9fb8ff',x:'적이 가장 많은 쪽으로 넓은 부채꼴(3칸·140도) 십자 베기 900% + 0.7초 마비'},
 cheora:{n:'최초 코어 대지붕괴',full:1,fusk:1,cd:60,m:1,col:'#5fe0ff',x:'적이 몰린 곳 반경 1.5칸에 두 주먹 1000% + 가장 앞선 적 앞에 코어 장벽 3초 — 벽이 무너질 때 막혀 있던 적에게 500%'},
 astraon:{n:'천벌 궤도 포격',full:1,fusk:1,cd:60,m:1,col:'#8fd8ff',x:'보스 우선 지점 반경 2칸에 낙뢰 1200% + 1초 마비, 중심 대상 800% 추가'},
 yeongeopsu:{n:'멈춰 선 계절',full:1,fusk:1,cd:60,m:1,col:'#ffcf5a',x:'적이 몰린 곳 반경 2칸에 400% + 1초 속박, 6초간 시간 장판(초당 150% + 감속) · 상시: 직접 처치 25마리마다 ❤️+1'},
 unhwa:{n:'운명 개화 룰렛',full:1,fusk:1,cd:60,m:1,col:'#ff5a9a',x:'적이 몰린 곳에 꽃잎 폭발 800% + 룰렛: 아군 공격력 +25% 10초 / 아군 특수기 8초 당김 / 코인 획득 중 하나'},
 clockweaver:{n:'운명 봉합',full:1,fusk:1,cd:60,m:1,col:'#c48bff',x:'보스 우선 지점 반경 2칸에 운명 표식 + 달날 폭발 1000%(표식 있으면 +600%) · 가장 앞선 적 앞에 시계 벽 3초 — 막혔던 적은 풀릴 때 운명 표식'},
 nox:{n:'월식 단죄',full:1,fusk:1,cd:60,m:1,col:'#c9a6ff',x:'전장 어디든 보스 우선 대상에게 거대한 초승달 1800%(표식 있으면 +800%), 주변 1.5칸 적 600%(표식 +300%)'},
 yeongwol:{n:'영겁의 월식',full:1,fusk:1,cd:60,m:1,col:'#b89cff',x:'전장의 모든 적을 멈추고(일반 2초·보스 0.5초) 세 칼날 동시 처형 1200% → 월식 낙뢰 800%'},
 heukjo:{n:'흑해 운명개문',full:1,fusk:1,cd:60,m:1,col:'#e0b040',x:'룰렛으로 셋 중 하나 — 검은 대양: 전장 모든 적 1400% + 밀치기 / 운명의 뇌격: 보스 우선 1800% → 최대 7번 연쇄 600% + 마비 / 황금 조류: 10초간 아군 공격력 +40%'},
 hwangryong:{n:'사신 순환',full:1,fusk:1,cd:15,m:1,col:'#ffd23e',x:'15초마다 청룡(연쇄 번개) → 현무(중력장) → 주작(길 전체 화염) → 백호(보스 집중 참격) 순서로 발동'},
 gamer:{n:'슬리퍼 강속구',full:1,cd:20,m:2.4,pkg:1,x:'단일 대상 240% 피해 (불꽃 강속구)'},
};
for(const k in SP){SP[k].cd=Math.round(SP[k].cd*.7);U[k].sp2=SP[k]}for(const k of ['astraon','yeongeopsu','unhwa','clockweaver','nox','jinmu','jeokhwang','cheora','wolroe','bideung','noeha','yeongwol','heukjo'])SP[k].cd=60;SP.hwangryong.cd=15;
// 특수기: 더 드물게, 대신 그만큼 세게 (황룡 15초 순환은 그대로)
const SPK=1.5,SPK_NO=new Set(['hwangryong','orca','seraphine','sporun','momo','chronel','belkaon']); // 버프·시간정지 특수기는 그대로
for(const k in SP)if(!SPK_NO.has(k))SP[k].cd=Math.round(SP[k].cd*SPK);
// 설명 속 피해 %도 같이 올림 (증가·감속·확률 %는 그대로)
for(const k in SP){if(SPK_NO.has(k)||!SP[k].x)continue;const t=SP[k].x;SP[k].x=t.replace(/(^|[^\-\d.])(\d+(?:\.\d+)?)%(?!p)(?!\s*(?:확률|감속|빨리|느리|쿨|더))/g,(m0,pre,v,off)=>{if(pre==='+'&&t[off+m0.length]!==')')return m0;if(/(확률|공격력|공격속도|피해)\s*$/.test(t.slice(0,off+pre.length))&&pre!=='+')return m0;return pre+Math.round(v*SPK)+'%'})}
const TEST_ONLY=null;

// ---------- 임시 캐릭터 (GPT 패키지 도착 전, 코드로 그린 플레이스홀더) ----------
const PIMG={};if(typeof Image!=='undefined')for(const p in PICON){const im=new Image();im.src=PICON[p];PIMG[p]=im}
const PLANET_COL={earth:'#5fae4a',purmia:'#3f8fe6',toytopia:'#ff6fae',gearon:'#8a93a3',mosaica:'#ff9a2e',florasia:'#6fcf3a',mongle:'#f5d33c',lumiel:'#b9a4ff',drakanis:'#ff7a2a',biikseong:'#4fd8e0',seolryeong:'#9fd8ff',haeyeon:'#2fb5d8'};
const TIER_D=[100,550,3000,21000,120000];
// [key, 행성, 단계, 이름, 모션, 투사체, 타격, 특수 종류, 특수 이름]
const TEMP=[];
const SP_M={area:5,line:6,chain:2.5,crit:7,hits:1.6,buff:1.5};
const SP_X={area:'도착 지점 범위 500% 피해',line:'직선 관통 600% 피해',chain:'연쇄 번개 각 250%',crit:'단일 치명 700%',hits:'연타 각 160%',buff:'4초간 아군 전체 공격력 1.5배'};
function drawTempHero(c,t,o){const col=o.col,tier=o.t,lean=Math.sin(Math.min(1,t*2.2)*Math.PI)*(tier>=3?6:9),bob=-Math.abs(Math.sin(t*Math.PI))*3;
  const dark=o.dark,OUT='#2a1a22';c.save();c.translate(0,bob);
  // 그림자/발
  c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(50,92,20,5,0,0,7);c.fill();
  const feet=(x)=>{c.beginPath();c.ellipse(x,89,7,4,0,0,7);c.fillStyle=dark;c.fill();c.lineWidth=2;c.strokeStyle=OUT;c.stroke()};feet(41-lean*.2);feet(59+lean*.3);
  c.translate(lean*.4,0);
  // 몸
  const shape=o.shape;c.lineWidth=2.6;c.strokeStyle=OUT;c.fillStyle=col;c.beginPath();
  if(shape==='round'){c.ellipse(50,62,19,23,0,0,7)}else if(shape==='box'){c.roundRect(32,40,36,46,6)}else if(shape==='tall'){c.ellipse(50,58,15,30,0,0,7)}else if(shape==='blob'){c.moveTo(31,80);c.quadraticCurveTo(28,38,50,36);c.quadraticCurveTo(72,38,69,80);c.quadraticCurveTo(50,90,31,80)}else{c.ellipse(50,64,21,20,0,0,7)}
  c.fill();c.stroke();
  // 배 하이라이트
  c.fillStyle='rgba(255,255,255,.28)';c.beginPath();c.ellipse(50,68,10,11,0,0,7);c.fill();
  // 머리
  c.fillStyle=col;c.beginPath();if(shape==='box')c.roundRect(34,16,32,28,7);else c.ellipse(50,33,20,18,0,0,7);c.fill();c.stroke();
  // 눈·입
  c.fillStyle='#fff';c.beginPath();c.ellipse(44,32,4.5,5.2,0,0,7);c.ellipse(57,32,4.5,5.2,0,0,7);c.fill();c.strokeStyle=OUT;c.lineWidth=1.6;c.stroke();
  c.fillStyle=OUT;c.beginPath();c.arc(45.5+lean*.15,33,2.3,0,7);c.arc(58.5+lean*.15,33,2.3,0,7);c.fill();
  c.beginPath();c.arc(51,41,3.2,0.1,3);c.lineWidth=1.6;c.stroke();
  // 팔(공격 시 앞으로)
  const ay=58-Math.sin(Math.min(1,t*2.2)*Math.PI)*14;c.lineCap='round';c.lineWidth=7;c.strokeStyle=OUT;c.beginPath();c.moveTo(66,60);c.lineTo(78+lean,ay);c.stroke();c.lineWidth=4.2;c.strokeStyle=col;c.stroke();
  c.beginPath();c.arc(78+lean,ay,5,0,7);c.fillStyle=dark;c.fill();c.lineWidth=2;c.strokeStyle=OUT;c.stroke();
  // 등급 장식
  if(tier>=1){c.fillStyle=o.acc;c.beginPath();c.moveTo(34,44);c.lineTo(66,44);c.lineTo(60,52);c.lineTo(40,52);c.closePath();c.fill();c.lineWidth=1.6;c.strokeStyle=OUT;c.stroke()}
  if(tier>=2){c.fillStyle=o.acc;c.beginPath();c.moveTo(31,46);c.quadraticCurveTo(14,70,26,86);c.lineTo(36,70);c.closePath();c.fill();c.stroke()}
  if(tier>=3){c.strokeStyle=o.acc;c.lineWidth=3;c.globalAlpha=.7;c.beginPath();c.ellipse(50,62,30,32,0,0,7);c.stroke();c.globalAlpha=1}
  if(tier>=4){c.fillStyle='#ffd23e';c.beginPath();c.moveTo(36,18);c.lineTo(41,6);c.lineTo(47,16);c.lineTo(50,3);c.lineTo(53,16);c.lineTo(59,6);c.lineTo(64,18);c.closePath();c.fill();c.lineWidth=1.8;c.strokeStyle=OUT;c.stroke()}
  if(tier>=1&&tier<4){c.font='bold 11px sans-serif';c.fillStyle='#fff';c.strokeStyle=OUT;c.lineWidth=3;c.textAlign='center';c.strokeText(['','★','★★','★★★'][tier],50,78);c.fillText(['','★','★★','★★★'][tier],50,78)}
  c.restore()}
const SHAPES={earth:'round',purmia:'tall',toytopia:'box',gearon:'box',mosaica:'tall',florasia:'blob',mongle:'blob',lumiel:'round',drakanis:'tall',biikseong:'round',seolryeong:'round',haeyeon:'round'};
function mixc(h,t){const p=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));return '#'+p.map(v=>Math.round(v*(1-t)).toString(16).padStart(2,'0')).join('')}
for(const [k,pl,t,n,mo,pj,im,sp,spn] of TEMP){
  const col=PLANET_COL[pl],kind=Object.keys(sp)[0];
  U[k]={planet:pl,n,e:'🦸',t,d:TIER_D[t],s:1/1.4,r:200,x:(t===4?'우주 히어로':['우리 집','우리 마을','우리 나라','우리 행성'][t]+' 히어로')+' — 원거리 단일 (1.4초 간격, 임시)'};
  const s2=Object.assign({n:spn,full:1,cd:75,m:SP_M[kind],r:60,x:SP_X[kind]},sp);if(sp.buff)s2.buff=4;if(sp.hits)s2.r=10;SP[k]=s2;U[k].sp2=s2;
}
const BY=[0,1,2,3].map(t=>Object.keys(U).filter(k=>U[k].t===t&&(!TEST_ONLY||TEST_ONLY.includes(k))));
const RECIPE={};RECIPE.poseidon=['abyssadmiral','coralgiant','clawlancer','pearlpunch'];RECIPE.baekho=['ice_golem','snow_yeti','icicle_bat','snowkid'];RECIPE.jujak=['goldwing_commander','storm_owl','feather_archer','feather_courier'];RECIPE.cheongryong=['hongryeon','iron_dragonkin','fang_lancer','hornkid'];RECIPE.selene=['aurielle','noctia','miel','lulu'];RECIPE.zeus=['jir','napoleon','veteran','gamer'];RECIPE.chronel=['stella','bubon','pulu','momo'];RECIPE.sylvaion=['elderon','cacton','sporun','floret'];RECIPE.belkaon=['seraphine','vargon','nero','orbin'];RECIPE.archeon=['fortressbot','policebot','deliverybot','cleanbot'];RECIPE.hyeonmu=['mugyeom','orca','alpaca','mole'];RECIPE.lunette=['mold','bricks','jacko','pico'];
const MOBC=['#6fbf4a','#5a9ad8','#d18a5a','#d16f9b','#9b7fd1','#8a8a9a','#c9b24a','#4fb8a8'],MOBE=['👾','🦠','🍄','👻','💩','🪳','🥦','👿'];
let MOBS=[],BOSS=null;

const {CH,PC,slime,sprite,OUT,ANIM}=(()=>{
// ---------- 페인터리 벡터 툴킷 ----------
const OUT='#2a1a22',SK='#f4c89a';
function mix(a,b,t){const p=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)],x=p(a),y=p(b);return'rgb('+x.map((v,i)=>Math.round(v+(y[i]-v)*t)).join(',')+')'}
function mixa(a,b,t,al){const p=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)],x=p(a),y=p(b);return'rgba('+x.map((v,i)=>Math.round(v+(y[i]-v)*t)).join(',')+','+al+')'}
const E=(x,y,rx,ry,r)=>c=>c.ellipse(x,y,rx,ry,r||0,0,7);
const R=(x,y,w,h,r)=>c=>{c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()};
const PG=p=>c=>{for(let i=0;i<p.length;i+=2)c[i?'lineTo':'moveTo'](p[i],p[i+1]);c.closePath()};
const CV=p=>c=>{c.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=4)c.quadraticCurveTo(p[i],p[i+1],p[i+2],p[i+3]);c.closePath()};
// 페인트: 밑색 + 내부 그림자(두 단계) + 하이라이트 + 외곽선
function P(c,p,col,o){o=o||{};const hx=col[0]==='#';c.save();c.beginPath();p(c);c.fillStyle=col;c.fill();
  if(hx&&!o.flat){c.clip();const d=o.d==null?3.2:o.d,sh=o.sh==null?.42:o.sh;
   c.beginPath();p(c);c.fillStyle=mixa(col,'#1c0e2a',sh,.92);c.fill();
   c.save();c.translate(-d*.5,-d*.4);c.beginPath();p(c);c.fillStyle=mixa(col,'#1c0e2a',sh*.5,.95);c.fill();c.restore();
   c.save();c.translate(-d,-d*.8);c.beginPath();p(c);c.fillStyle=col;c.fill();c.restore();
   c.save();c.translate(-d*2,-d*1.6);c.beginPath();p(c);c.fillStyle=mixa(col,'#ffffff',.16,.9);c.fill();c.restore();
   if(o.hl!==0){const hl=o.hl||[0,0],b=bbox(p);c.save();c.globalAlpha=.18;c.fillStyle='#fff';c.beginPath();c.ellipse(b.x+b.w*.33+hl[0],b.y+b.h*.28+hl[1],Math.max(2,b.w*.2),Math.max(1.5,b.h*.13),-.5,0,7);c.fill();c.restore()}}
  c.restore();c.beginPath();p(c);c.lineWidth=o.lw||2.2;c.lineJoin='round';c.lineCap='round';c.strokeStyle=o.oc||(hx?mix(col,'#1a0c18',.62):OUT);c.stroke()}
function bbox(p){const pts=[];const fake={moveTo:(x,y)=>pts.push(x,y),lineTo:(x,y)=>pts.push(x,y),arcTo:(x1,y1,x2,y2)=>pts.push(x1,y1,x2,y2),quadraticCurveTo:(a,b,x,y)=>pts.push(a,b,x,y),bezierCurveTo:(a,b,d,e,x,y)=>pts.push(a,b,d,e,x,y),ellipse:(x,y,rx,ry)=>pts.push(x-rx,y-ry,x+rx,y+ry),closePath(){},arc:(x,y,r)=>pts.push(x-r,y-r,x+r,y+r)};p(fake);
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(let i=0;i<pts.length;i+=2){x0=Math.min(x0,pts[i]);x1=Math.max(x1,pts[i]);y0=Math.min(y0,pts[i+1]);y1=Math.max(y1,pts[i+1])}return{x:x0,y:y0,w:x1-x0,h:y1-y0}}
function F(c,p,col,a){c.save();if(a!=null)c.globalAlpha=a;c.beginPath();p(c);c.fillStyle=col;c.fill();c.restore()}
function L(c,p,w,col){c.beginPath();for(let i=0;i<p.length;i+=2)c[i?'lineTo':'moveTo'](p[i],p[i+1]);c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.strokeStyle=col||OUT;c.stroke()}
function LO(c,p,w,col){L(c,p,w+2.6,mix(col,'#1a0c18',.62));L(c,p,w,col)}
function Q(c,p,w,col){c.beginPath();c.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=4)c.quadraticCurveTo(p[i],p[i+1],p[i+2],p[i+3]);c.lineCap='round';c.lineJoin='round';c.lineWidth=w+2.6;c.strokeStyle=mix(col,'#1a0c18',.62);c.stroke();c.lineWidth=w;c.strokeStyle=col;c.stroke()}
function at(c,x,y,r,f,s){c.save();c.translate(x,y);c.rotate(r||0);if(s)c.scale(s,s);f();c.restore()}
function glow(c,x,y,r,col,a){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');c.save();c.globalAlpha=a==null?.5:a;c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,7);c.fill();c.restore()}
// 눈: 큰 동공 + 하이라이트
function eye(c,x,y,s,iris,st){s=s||1;if(st==='angry'){F(c,E(x,y,3.2*s,4.2*s),OUT);F(c,E(x+.2*s,y+.6*s,2*s,2.6*s),iris||'#7a4a1a');F(c,E(x-1*s,y-1.6*s,1.1*s,1.3*s),'#fff');L(c,[x-4*s,y-6*s,x+3.6*s,y-3.6*s],2.2*s);return}
  if(st==='shut'){L(c,[x-3*s,y+1*s,x,y-1*s,x+3*s,y+1*s],2*s);return}
  F(c,E(x,y,3.4*s,4.4*s),'#fff');F(c,E(x+.4*s,y+.4*s,2.6*s,3.6*s),OUT);F(c,E(x+.6*s,y+1*s,1.6*s,2.2*s),iris||'#7a4a1a');F(c,E(x-.8*s,y-1.6*s,1.1*s,1.4*s),'#fff');F(c,E(x+1.6*s,y+2*s,.5*s,.6*s),'#fff');
  if(st==='frown')L(c,[x-4*s,y-6*s,x+3.6*s,y-4.2*s],2*s)}
function K(t,a){t=t||0;if(t<=a[0][0])return a[0][1];for(let i=0;i<a.length-1;i++){const A=a[i],B=a[i+1];if(t<=B[0]){const u=(t-A[0])/(B[0]-A[0]),e=u*u*(3-2*u);return A[1]+(B[1]-A[1])*e}}return a[a.length-1][1]}
function K2(t,a){return[K(t,a.map(v=>[v[0],v[1]])),K(t,a.map(v=>[v[0],v[2]]))]}
function flame(c,x,y,s,r,k1,k2){at(c,x,y,r||0,()=>{P(c,CV([-s*.5,0,-s*.9,-s*.5,-s*.3,-s*.9,-s*.1,-s*1.3,s*.1,-s*1.6,s*.3,-s*1,s*.9,-s*.5,s*.5,0]),k1||'#ff7a2e',{lw:1.8,d:2});F(c,CV([-s*.25,0,-s*.4,-s*.4,0,-s*.8,s*.3,-s*.4,s*.25,0]),k2||'#ffe066')})}
function sprite(mk,fn,S,t){const cv=mk(S),c=cv.getContext('2d');c.save();c.translate(S*.06,S*.06);c.scale(S*.88/100,S*.88/100);fn(c,t||0);c.restore();
  const o=mk(S),x=o.getContext('2d'),r=Math.max(1,S*.009);x.shadowColor='#1a0c18';x.shadowBlur=0;for(let i=0;i<8;i++){x.shadowOffsetX=Math.cos(i*.785)*r;x.shadowOffsetY=Math.sin(i*.785)*r;x.drawImage(cv,0,0)}x.shadowColor='transparent';x.shadowOffsetX=x.shadowOffsetY=0;x.drawImage(cv,0,0);return o}
const CH={};
// 공통: 짧은 두 발
function feet(c,col,y,dx,w){y=y||90;dx=dx||10;w=w||7;P(c,E(50-dx,y,w,4.2),col,{d:1.5});P(c,E(50+dx,y,w,4.2),col,{d:1.5})}
// 1. 햄스터 포병
CH.ham=(c,t)=>{const rc=K(t,[[0,0],[.06,-7],[.4,-2],[1,0]]),hk=K(t,[[0,0],[.06,-.18],[.4,.03],[1,0]]),ear=K(t,[[0,0],[.08,-.5],[.5,.1],[1,0]]),fl=t>.02&&t<.2?1-Math.abs(t-.08)/.14:0;
  // 배낭
  P(c,R(16,44,16,32,5),'#5f6b3a');for(const y of[50,60,70])P(c,R(19,y,10,6,2),'#8a3a2a',{d:1,lw:1.6});
  feet(c,'#e8b878');
  at(c,rc,0,0,()=>{
   // 몸
   P(c,E(50,66,24,22),'#e2b070',{d:4});F(c,E(54,72,15,13),'#fff3dc');F(c,E(58,60,10,4,-.2),'#fff3dc',.6);
   P(c,R(28,70,42,7,2),'#5a3a22',{d:1.5});P(c,R(52,69,8,9,2),'#e8c33a',{d:1,lw:1.6});
   // 바주카
   at(c,56,62,hk*.6,()=>{P(c,R(0,-8,46,15,6),'#3d3f3a',{d:3});P(c,R(38,-11,12,21,4),'#2b2d2a',{d:2});for(const x of[8,18,28])L(c,[x,-8,x,7],1.4,'rgba(0,0,0,.35)');P(c,R(4,-12,6,5,1.5),'#8a8a7a',{d:1,lw:1.4});
    if(fl>0){glow(c,56,0,22*fl+6,'rgba(255,200,60,.9)',.8);P(c,PG([50,-3,66+22*fl,-10,60+10*fl,0,66+22*fl,10,50,3]),'#ffe066',{flat:1,lw:1.6,oc:'#ff8a2e'})}});
   // 손
   P(c,E(38,74,6,5),'#e2b070',{d:1.5});P(c,E(66,74,6,5),'#e2b070',{d:1.5});
   // 머리
   at(c,54,40,hk,()=>{c.translate(-54,-40);
    at(c,32,30,-ear,()=>{P(c,E(0,0,8,8),'#e2b070',{d:2});F(c,E(1,1,4.5,4.5),'#f2a0a8')});at(c,74,28,ear,()=>{P(c,E(0,0,8,8),'#e2b070',{d:2});F(c,E(-1,1,4.5,4.5),'#f2a0a8')});
    P(c,E(54,40,25,21),'#e8b878',{d:4});F(c,E(60,47,13,10),'#fff3dc');
    eye(c,49,37,1.05,'#5a3a1a');eye(c,66,36,1.0,'#5a3a1a');F(c,E(64,45,2.6,1.8),'#e07a8a');
    P(c,PG([59,48,69,48,67,53,61,53]),'#fff',{flat:1,lw:1.4});L(c,[58,48,70,48],1.6);F(c,E(44,46,3.6,2.4),'#f2a0a8',.6);
    // 헬멧
    P(c,CV([28,32,30,8,54,8,78,8,80,32,54,26,28,32]),'#6b7a3f',{d:4});P(c,CV([26,32,54,24,82,30,82,36,54,30,26,38]),'#5a6a34',{d:1.5});
    P(c,PG([54,13,56.4,19,63,19,57.8,23,59.8,29,54,25.4,48.2,29,50.2,23,45,19,51.6,19]),'#e8c33a',{d:1,lw:1.4})})})};
// 2. 아기 용암도마뱀
CH.liz=(c,t)=>{const mo=K(t,[[0,0],[.25,.1],[.4,.65],[.6,.55],[.8,.1],[1,0]]),hl=K(t,[[0,0],[.25,-.18],[.4,.1],[.8,0],[1,0]]),tl=K(t,[[0,0],[.3,.25],[.6,-.15],[1,0]]),fs=K(t,[[0,1],[.3,1.4],[.5,.8],[1,1]]);
  at(c,34,74,tl,()=>{c.translate(-34,-74);P(c,CV([34,70,16,70,8,58,6,52,14,46,10,50,18,56,22,62,34,64]),'#d8402f',{d:3});at(c,8,50,0,()=>flame(c,0,0,9*fs,-.4));});
  feet(c,'#d8402f',91,11,8);for(const x of[36,42,58,64])F(c,PG([x,94,x+1.6,97,x+3.2,94]),'#f6eed8');
  // 몸
  P(c,E(50,68,22,21),'#d8402f',{d:4});F(c,E(54,72,13,13),'#f2c46a');for(const y of[64,70,76])L(c,[48,y,62,y+1],1.2,'rgba(80,20,20,.35)');
  // 망토
  P(c,CV([30,54,22,70,30,84,38,76,40,60,36,52]),'#3a2a3a',{d:2});P(c,R(44,54,14,5,2),'#5a3a2a',{d:1,lw:1.6});F(c,PG([51,52,53,57,58,57,54,60,56,65,51,62,46,65,48,60,44,57,49,57]),'#e8c33a');
  P(c,E(36,74,6,5),'#d8402f',{d:1.5});P(c,E(66,76,6,5),'#d8402f',{d:1.5});
  // 머리
  at(c,56,42,hl,()=>{c.translate(-56,-42);
   P(c,CV([34,46,32,22,56,20,78,22,86,36,96,40,96,48,86,50,64,56,40,56]),'#d8402f',{d:4});
   // 턱
   at(c,70,48,mo*.6,()=>{c.translate(-70,-48);P(c,CV([62,48,80,46,96,47,94,56,80,58,64,58]),'#c9302e',{d:2});F(c,PG([64,49,94,48,92,55,66,56]),'#7a1f2a');for(const x of[70,78,86])P(c,PG([x-2.4,49,x,55,x+2.4,49]),'#fff',{flat:1,lw:1.2});
    if(mo>.3)glow(c,80,52,14,'rgba(255,160,40,.9)',mo*.8)});
   for(const x of[70,80,90])P(c,PG([x-2.4,47,x,41,x+2.4,47]),'#fff',{flat:1,lw:1.2});
   F(c,E(66,36,6,4.6),'#f2c46a');F(c,E(90,43,1.4,1.2),OUT);
   eye(c,56,36,1.15,'#ff9a2e','angry');F(c,E(44,44,3.6,2.4),'#f27a8a',.5);
   for(const[x,y]of[[36,40],[38,30]])P(c,PG([x,y,x-6,y-8,x+3,y-5]),'#ffb03a',{d:1,lw:1.4});
   // 불꽃 머리
   flame(c,44,24,10*fs,-.3);flame(c,56,22,13*fs,0);flame(c,68,24,9*fs,.3)})};
// 3. 버섯기사
CH.mush=(c,t)=>{const sh=K(t,[[0,0],[.2,-10],[.34,12],[.5,2],[1,0]]),sw=K(t,[[0,0],[.3,-.9],[.46,1.4],[.62,1.6],[.85,.3],[1,0]]),cp=K(t,[[0,0],[.34,.1],[.5,-.08],[1,0]]);
  feet(c,'#5a4a2a',91,9,7.5);
  // 망토
  P(c,CV([34,56,24,72,30,86,44,80,46,62,40,54]),'#6a9a3a',{d:2});
  // 갑옷 몸
  P(c,R(36,56,30,28,8),'#9a9aa8',{d:4});for(const y of[62,70,78])L(c,[38,y,64,y],1.4,'rgba(0,0,0,.3)');P(c,R(36,72,30,6,2),'#5a3a22',{d:1.5});P(c,R(48,71,8,8,1.5),'#e8c33a',{d:1,lw:1.4});
  P(c,PG([42,50,60,50,52,60]),'#4a8a3a',{d:1.5});P(c,PG([51,48,55,51,51,56,47,51]),'#b0b0c0',{d:1,lw:1.4});
  // 방패(앞)
  at(c,70+sh,70,0,()=>{P(c,CV([-12,-16,12,-16,14,8,0,16,-14,8,-14,-16,-12,-16]),'#8a6a3a',{d:3});c.save();c.beginPath();CV([-10,-13,10,-13,11,7,0,13,-11,7,-11,-13,-10,-13])(c);c.strokeStyle='#5a3a22';c.lineWidth=2;c.stroke();c.restore();P(c,E(0,-2,5,7),'#6fbf4a',{d:1,lw:1.4});L(c,[0,-7,0,3],1.2,'#2a5a2a');P(c,E(-8,-18,3,3),'#e8c33a',{d:.5,lw:1.2});P(c,E(8,-18,3,3),'#e8c33a',{d:.5,lw:1.2})});
  P(c,E(72+sh,78,6,5),'#f4c89a',{d:1.5});
  // 검 손(뒤)
  at(c,30,70,sw,()=>{P(c,E(0,0,6,5),'#f4c89a',{d:1.5});P(c,PG([-3,-2,3,-2,2,-36,0,-44,-2,-36]),'#d8d8e0',{d:1.5,lw:1.6});L(c,[0,-4,0,-38],1,'#fff');P(c,R(-7,-5,14,4,1.5),'#e8c33a',{d:.5,lw:1.2})});
  // 머리
  at(c,52,46,cp,()=>{c.translate(-52,-46);P(c,E(52,46,17,15),'#f4d8a8',{d:3});eye(c,48,44,1,'#5a3a1a','frown');eye(c,61,43,.95,'#5a3a1a');F(c,E(55,51,1.8,1.4),'#d8a07a');L(c,[52,55,59,54],1.6);F(c,E(42,52,3.4,2.2),'#f2a0a8',.5);
   P(c,CV([30,46,52,40,76,44,76,50,52,48,30,52]),'#6a9a3a',{d:1.5});
   // 버섯 갓
   P(c,CV([16,40,14,2,52,-2,90,2,88,40,52,30,16,40]),'#d8362f',{d:5});for(const[x,y,r]of[[30,18,6],[52,8,7],[72,16,6],[40,32,4],[66,32,4.5]])P(c,E(x,y,r,r*.8),'#fff3dc',{d:1,lw:1.2});P(c,CV([14,40,52,32,90,40,90,45,52,37,14,45]),'#f2d0a0',{d:1.5})})};
// 4. 악어 복서
CH.croc=(c,t)=>{const h1=K2(t,[[0,74,58],[.3,66,62],[.42,98,54],[.5,76,60],[1,74,58]]),h2=K2(t,[[0,64,66],[.46,58,68],[.6,100,60],[.76,70,66],[1,64,66]]),ln=K(t,[[0,0],[.42,.1],[.6,.25],[1,0]]),jaw=K(t,[[0,0],[.42,.3],[.6,.4],[.8,0],[1,0]]);
  P(c,CV([34,80,14,86,6,76,10,68,18,74,34,70]),'#5a9a3a',{d:2});for(const[x,y]of[[12,70],[20,72]])P(c,PG([x-2.6,y+1,x,y-5,x+2.6,y+1]),'#2f6a2c',{d:.5,lw:1.2});
  feet(c,'#4a8a3a',91,10,8);
  at(c,50,86,ln,()=>{c.translate(-50,-86);
   // 몸
   P(c,E(50,66,22,22),'#5fae4a',{d:4});F(c,E(52,70,14,14),'#c8d890');for(const y of[62,68,74,80])L(c,[46,y,60,y],1.2,'rgba(30,60,20,.35)');
   P(c,R(34,74,32,13,4),'#c9302e',{d:2});L(c,[36,80,64,80],1.4,'rgba(0,0,0,.3)');P(c,R(30,70,40,6,2),'#5a3a22',{d:1.5});P(c,R(46,68,9,9,1.5),'#e8c33a',{d:1,lw:1.4});F(c,PG([50.5,70,51.6,72.6,54.4,72.6,52.2,74.2,53,77,50.5,75.4,48,77,48.8,74.2,46.6,72.6,49.4,72.6]),'#fff3a8');
   // 머리
   P(c,CV([34,44,32,22,60,18,80,22,94,32,96,40,90,46,70,50,44,52,34,44]),'#5fae4a',{d:4});
   at(c,66,46,jaw,()=>{c.translate(-66,-46);P(c,CV([60,46,80,46,96,44,94,54,78,56,62,54]),'#c8d890',{d:2});for(const x of[70,78,86])P(c,PG([x-2.4,47,x,52,x+2.4,47]),'#fff',{flat:1,lw:1.2});if(jaw>.2)F(c,PG([64,47,92,46,90,52,66,52]),'#7a1f2a')});
   for(const x of[72,82,92])P(c,PG([x-2.4,45,x,40,x+2.4,45]),'#fff',{flat:1,lw:1.2});F(c,E(93,36,1.4,1.2),OUT);
   eye(c,54,34,1.2,'#e8c33a','angry');P(c,PG([40,30,36,20,46,26]),'#4a8a3a',{d:1.5});L(c,[58,24,62,30],1.6,'#2f6a2c');
   // 글러브
   for(const[h,b]of[[h2,0],[h1,1]]){at(c,h[0],h[1],b?.2:-.2,()=>{P(c,E(0,0,9.5,8.5),'#d8402f',{d:2.5});F(c,E(-3,-3,3.4,2.4),'#ff8a7a',.7);P(c,R(-9,-3,5,8,2),'#f0ece0',{d:.5,lw:1.4})})}})};
// 5. 전기 너구리
CH.rac=(c,t)=>{const h=K2(t,[[0,70,66],[.3,64,70],[.42,90,58],[.7,76,62],[1,70,66]]),z=K(t,[[0,.3],[.3,1],[.42,1.6],[.7,.6],[1,.3]]),tl=K(t,[[0,0],[.4,.3],[.8,-.1],[1,0]]);
  at(c,36,78,tl,()=>{c.translate(-36,-78);P(c,CV([36,74,18,80,8,66,10,54,16,58,20,70,36,66]),'#55505a',{d:2});for(const[x,y]of[[12,58],[14,70]])F(c,E(x,y,3,2.6),'#2b2830')});
  feet(c,'#2b2830',91,9,7);
  // 몸(검은 슈트)
  P(c,E(50,67,21,20),'#2b2830',{d:3});F(c,PG([50,50,56,56,54,62,60,62,52,76,56,66,48,66,52,58]),'#ffe033');P(c,R(34,74,32,5,2),'#e8c33a',{d:1,lw:1.4});
  // 머리
  P(c,E(52,42,22,19),'#8a8a92',{d:4});F(c,E(55,50,13,9),'#f0ece0');P(c,CV([32,40,52,34,76,40,74,48,52,46,30,48]),'#2b2830',{d:1.5});
  P(c,PG([36,30,32,14,46,24]),'#8a8a92',{d:1.5});P(c,PG([64,24,74,10,78,30]),'#8a8a92',{d:1.5});
  eye(c,47,42,1.05,'#5fd0ff','angry');eye(c,62,41,1.0,'#5fd0ff');F(c,E(70,49,2.4,1.8),OUT);P(c,PG([60,52,70,51,68,56,62,56]),'#fff',{flat:1,lw:1.2});
  // 손 + 전기
  for(const[x,y]of[[36,72],[h[0],h[1]]]){P(c,E(x,y,6,5.4),'#2b2830',{d:1.5});glow(c,x,y,10*z,'rgba(120,230,255,.9)',.7);c.strokeStyle='#bfffff';c.lineWidth=1.6;c.lineCap='round';for(let i=0;i<4;i++){const a=i*1.57+t*20,r=5+6*z;c.beginPath();c.moveTo(x+Math.cos(a)*3,y+Math.sin(a)*3);c.lineTo(x+Math.cos(a+.5)*r,y+Math.sin(a+.5)*r);c.lineTo(x+Math.cos(a+.2)*r*1.5,y+Math.sin(a+.2)*r*1.5);c.stroke()}}};
// 6. 올빼미 기계공
CH.owl=(c,t)=>{const rc=K(t,[[0,0],[.06,-5],[.4,-1],[1,0]]),gr=t*18,fl=t>.02&&t<.16?1-Math.abs(t-.07)/.1:0;
  // 배낭 톱니
  P(c,R(18,46,16,30,4),'#8a6a3a',{d:2});at(c,26,52,gr*.5,()=>{P(c,c=>{for(let i=0;i<16;i++){const a=i*Math.PI/8,r=i%2?7:9;c[i?'lineTo':'moveTo'](Math.cos(a)*r,Math.sin(a)*r)}c.closePath()},'#c9a03a',{d:1,lw:1.4})});P(c,E(26,52,2.5,2.5),'#5a3a22',{flat:1,lw:1.2});
  feet(c,'#e8b84a',91,10,7);for(const x of[36,41,46,54,59,64])L(c,[x,91,x,96],2,'#c98a2a');
  at(c,rc,0,0,()=>{
   // 몸(깃털)
   P(c,E(50,68,22,22),'#8a5a32',{d:4});F(c,E(52,72,13,14),'#e8c898');for(const[x,y]of[[46,66],[52,74],[58,66],[52,82]])L(c,[x-3,y,x,y+4,x+3,y],1.2,'rgba(90,50,20,.5)');
   P(c,R(34,76,32,5,2),'#5a3a22',{d:1,lw:1.4});P(c,E(64,74,6,5),'#8a5a32',{d:1.5});
   // 렌치 총
   at(c,62,70,0,()=>{P(c,R(0,-5,30,9,4),'#8a8a92',{d:2});P(c,PG([28,-9,40,-9,36,-2,40,5,28,5,30,-2]),'#9a9aa8',{d:1.5});at(c,14,0,gr,()=>P(c,c=>{for(let i=0;i<12;i++){const a=i*Math.PI/6,r=i%2?5:7;c[i?'lineTo':'moveTo'](Math.cos(a)*r,Math.sin(a)*r)}c.closePath()},'#c9a03a',{d:.5,lw:1.2}));
    if(fl>0){glow(c,44,-2,14*fl+4,'rgba(255,220,120,.9)',.8)}});
   // 머리
   P(c,E(52,42,25,21),'#8a5a32',{d:4});P(c,CV([34,46,42,30,52,36,62,30,72,46,52,52,34,46]),'#e8c898',{d:1.5});
   eye(c,45,42,1.3,'#ff9a2e');eye(c,61,41,1.25,'#ff9a2e');P(c,PG([51,46,55,46,53,52]),'#e8c33a',{d:.5,lw:1.2});
   P(c,PG([28,30,32,18,40,28]),'#8a5a32',{d:1.5});P(c,PG([74,28,72,16,64,26]),'#8a5a32',{d:1.5});
   // 고글
   P(c,R(32,22,42,6,3),'#5a3a22',{d:1,lw:1.4});P(c,E(42,24,7,6),'#8a6a3a',{d:1,lw:1.6});P(c,E(62,24,7,6),'#8a6a3a',{d:1,lw:1.6});F(c,E(42,24,4.5,3.8),'#9fe8ff');F(c,E(62,24,4.5,3.8),'#9fe8ff');F(c,E(40,23,1.6,1.2),'#fff');F(c,E(60,23,1.6,1.2),'#fff')})};
// 7. 사막여우 마법사
CH.fen=(c,t)=>{const h=K2(t,[[0,70,60],[.3,62,70],[.42,90,54],[.7,78,58],[1,70,60]]),st=K(t,[[0,-.2],[.3,.5],[.42,-.6],[.7,-.3],[1,-.2]]),orb=K(t,[[0,.4],[.3,1.2],[.42,0],[.7,.2],[1,.4]]),tl=K(t,[[0,0],[.4,.25],[.8,-.1],[1,0]]);
  at(c,34,80,tl,()=>{c.translate(-34,-80);P(c,CV([34,76,14,82,6,66,10,52,16,56,20,68,34,68]),'#e8a85a',{d:2});F(c,CV([10,56,8,64,14,72,18,68,16,60]),'#fff3dc')});
  feet(c,'#e8a85a',91,8,6);
  // 로브
  P(c,CV([36,54,28,90,50,92,72,90,64,54,50,50,36,54]),'#6a3a9a',{d:4});F(c,PG([47,56,53,56,55,90,45,90]),'#e8c33a',.9);L(c,[32,66,38,64],1.4,'#e8c33a');L(c,[62,64,68,66],1.4,'#e8c33a');P(c,CV([34,56,50,62,66,56,66,52,50,58,34,52]),'#8a4fc0',{d:1.5});
  P(c,E(36,70,5.5,5),'#e8a85a',{d:1.5});
  // 지팡이
  at(c,h[0],h[1],st,()=>{P(c,E(0,0,5.5,5),'#e8a85a',{d:1.5});LO(c,[0,2,0,-40],3,'#7a5232');at(c,0,-44,0,()=>{P(c,c=>{c.arc(0,0,8,-1.9,1.9);c.arc(3,0,6.5,1.4,-1.4,true);c.closePath()},'#f2e6a8',{d:1,lw:1.4});glow(c,0,0,16*orb,'rgba(190,140,255,.9)',orb*.8);if(orb>.5)P(c,E(0,0,4*orb,4*orb),'#d9b8ff',{flat:1,lw:1.2,oc:'#8a4fc0'})})});
  // 머리
  P(c,E(52,40,22,18),'#f2c48a',{d:4});F(c,E(56,47,12,8),'#fff3dc');
  P(c,PG([30,36,26,6,44,24]),'#f2c48a',{d:2});F(c,PG([31,32,29,12,41,24]),'#f2a0a8');P(c,PG([70,24,80,0,78,34]),'#f2c48a',{d:2});F(c,PG([71,24,78,8,76,30]),'#f2a0a8');
  eye(c,48,40,1.05,'#5a3a1a');eye(c,62,39,1.0,'#5a3a1a');F(c,E(69,45,2.2,1.6),OUT);L(c,[62,50,68,49],1.4);F(c,E(42,46,3.4,2.2),'#f2a0a8',.5);
  P(c,CV([34,30,52,22,72,30,72,34,52,26,34,34]),'#8a4fc0',{d:1,lw:1.4});P(c,E(52,25,3,3),'#e8c33a',{d:.5,lw:1.2})};
// 8. 숲의 곰 수호자
CH.bear=(c,t)=>{const sh=K2(t,[[0,68,70],[.22,60,56],[.38,78,82],[.6,72,74],[1,68,70]]),bd=K(t,[[0,0],[.22,-.1],[.38,.14],[.6,.04],[1,0]]),cr=t>.36&&t<.7;
  feet(c,'#3f6a2c',91,12,9);
  at(c,50,88,bd,()=>{c.translate(-50,-88);
   // 몸(이끼)
   P(c,E(50,64,26,26),'#5f8a3a',{d:5});F(c,E(52,70,15,16),'#9aba6a');for(const[x,y]of[[30,52],[70,50],[34,76],[68,78],[48,44]])P(c,E(x,y,4,3),'#7aa84a',{d:.5,lw:1.2});for(const[x,y]of[[36,60],[64,58],[52,82]])F(c,E(x,y,2.2,2.2),'#6fbf4a');
   // 지팡이
   LO(c,[30,86,28,32],3.4,'#7a5232');P(c,E(28,30,4.5,4.5),'#5fd0ff',{d:1,lw:1.4});glow(c,28,30,9,'rgba(100,220,255,.8)',.5);P(c,E(30,72,6,5),'#5f8a3a',{d:1.5});
   // 머리
   P(c,E(52,38,25,21),'#5f8a3a',{d:4});F(c,E(58,46,13,9),'#9aba6a');P(c,E(32,22,8,8),'#5f8a3a',{d:2});P(c,E(72,20,8,8),'#5f8a3a',{d:2});
   eye(c,48,37,1.05,'#3a2a1a');eye(c,63,36,1.0,'#3a2a1a');F(c,E(60,45,3.4,2.4),OUT);L(c,[56,50,64,49],1.4);
   // 잎사귀 관
   for(const[x,y,r,k]of[[36,20,-.6,'#e8a23a'],[46,14,-.3,'#d8402f'],[56,12,0,'#e8c33a'],[66,14,.3,'#d8402f'],[76,20,.6,'#e8a23a']])at(c,x,y,r,()=>P(c,CV([0,4,-5,-2,0,-9,5,-2,0,4]),k,{d:.5,lw:1.2}));P(c,E(56,18,3,3),'#5fd0ff',{d:.5,lw:1.2});
   // 방패
   at(c,sh[0],sh[1],0,()=>{P(c,CV([-14,-18,14,-18,16,8,0,18,-16,8,-14,-18,-14,-18]),'#3a8a5a',{d:3});P(c,CV([-11,-14,11,-14,12,6,0,14,-12,6,-11,-14,-11,-14]),'#6a4a3a',{flat:1,lw:1.6});c.strokeStyle='#5fd0ff';c.lineWidth=2;c.beginPath();c.arc(0,-2,5,0,5);c.stroke();c.beginPath();c.arc(0,-2,2.5,2,6);c.stroke();glow(c,0,-2,9,'rgba(100,220,255,.9)',cr?.8:.4);P(c,E(-10,8,5,4.5),'#5f8a3a',{d:1.5})})})};
// 9. 그림자 고양이 암살자
CH.ncat=(c,t)=>{const h1=K2(t,[[0,72,66],[.25,58,74],[.42,94,46],[.56,78,62],[1,72,66]]),a1=K(t,[[0,.2],[.25,1.2],[.42,-1],[.56,.3],[1,.2]]),two=t>.44&&t<.9,h2=K2(t,[[.44,40,68],[.56,96,64],[.72,76,70],[.9,42,70]]),a2=K(t,[[.44,2.4],[.56,.15],[.9,2.6]]),crouch=K(t,[[0,0],[.25,6],[.42,0],[1,0]]),sm=K(t,[[0,0],[.3,.3],[.6,-.2],[1,0]]);
  // 연기
  for(const[x,y,r,ph]of[[22,80,8,0],[78,84,7,1],[16,60,6,2],[84,60,5,3]]){const q=(t*2+ph*.25)%1;glow(c,x+Math.sin(q*6)*4,y-q*14,r+q*6,'rgba(40,30,60,.8)',.5*(1-q))}
  at(c,34,78,sm,()=>{c.translate(-34,-78);P(c,CV([36,74,20,82,12,70,14,58,18,62,22,72,36,68]),'#1e1a28',{d:2})});
  feet(c,'#1e1a28',91,8,6.5);
  at(c,0,crouch,0,()=>{
   // 몸
   P(c,E(50,66,19,20),'#1e1a28',{d:3,sh:.5});P(c,R(34,70,32,5,2),'#5a3a4a',{d:1,lw:1.4});P(c,PG([40,56,58,56,50,66]),'#2a2436',{d:1,lw:1.4});
   // 후드 머리
   P(c,CV([30,46,32,22,52,16,74,22,78,46,54,52,30,46]),'#1e1a28',{d:4,sh:.5});P(c,PG([38,24,34,8,48,20]),'#1e1a28',{d:1.5,sh:.5});P(c,PG([66,20,76,4,78,26]),'#1e1a28',{d:1.5,sh:.5});
   P(c,CV([38,44,40,32,54,30,70,34,70,46,54,48,38,44]),'#2a2436',{flat:1,lw:1.6});
   eye(c,49,40,1.15,'#6fe36a','angry');eye(c,63,39,1.05,'#6fe36a');glow(c,49,40,6,'rgba(110,230,110,.8)',.3);glow(c,63,39,6,'rgba(110,230,110,.8)',.3);
   P(c,R(40,46,30,5,2),'#1e1a28',{d:.5,lw:1.4});
   // 단검
   at(c,h1[0],h1[1],a1,()=>{P(c,E(0,0,5.5,5),'#1e1a28',{d:1.5});P(c,PG([2,-3,22,-10,4,3]),'#c9c9d6',{d:1,lw:1.4});L(c,[4,-2,16,-6],.8,'#fff');P(c,R(-5,-2.5,8,5,1.5),'#5a3a4a',{flat:1,lw:1.2})});
   if(two)at(c,h2[0],h2[1],a2,()=>{P(c,E(0,0,5.5,5),'#1e1a28',{d:1.5});P(c,PG([2,-3,22,-10,4,3]),'#c9c9d6',{d:1,lw:1.4});P(c,R(-5,-2.5,8,5,1.5),'#5a3a4a',{flat:1,lw:1.2})});else P(c,E(36,72,5.5,5),'#1e1a28',{d:1.5})})};
// 10. 평화의 비둘기 치유사
CH.dove=(c,t)=>{const w=K(t,[[0,0],[.2,-.5],[.42,.35],[.7,0],[1,0]]),st=K2(t,[[0,74,62],[.3,70,70],[.42,86,52],[.7,78,58],[1,74,62]]),gl=K(t,[[0,.4],[.3,1.3],[.5,.6],[1,.4]]),fl=K(t,[[0,0],[.3,-4],[.6,-1],[1,0]]);
  at(c,0,fl,0,()=>{
   // 날개
   for(const s of[-1,1]){at(c,50+s*18,58,s*w,()=>{c.scale(s,1);P(c,CV([0,0,10,-20,30,-26,20,-12,32,-10,16,-2,28,6,10,8,0,6,0,0]),'#fbfbf8',{d:2});for(const[x,y]of[[12,-10],[16,-2],[20,4]])L(c,[x,y,x+8,y-3],1.2,'rgba(100,100,120,.4)')})}
   feet(c,'#e8b84a',91,8,5.5);
   // 로브
   P(c,CV([36,54,28,90,50,92,72,90,64,54,50,50,36,54]),'#f8f4e8',{d:4});F(c,PG([47,56,53,56,55,90,45,90]),'#e8c33a',.9);for(const[x,y]of[[36,74],[64,74]])L(c,[x,y,x+4,y+8],1.4,'#e8c33a');P(c,CV([34,56,50,60,66,56,66,52,50,56,34,52]),'#e8c33a',{d:1,lw:1.4});
   // 지팡이
   at(c,st[0],st[1],-.2,()=>{P(c,E(0,0,5.5,5),'#fbfbf8',{d:1.5});LO(c,[0,2,0,-42],3,'#c9a03a');at(c,0,-48,0,()=>{glow(c,0,0,18*gl,'rgba(255,230,120,.9)',gl*.8);P(c,PG([0,-10,3,-3,10,0,3,3,0,10,-3,3,-10,0,-3,-3]),'#ffe066',{d:1,lw:1.4});P(c,E(0,0,3,3),'#fff',{flat:1,lw:1,oc:'#e8c33a'})})});
   // 머리
   P(c,E(52,40,20,18),'#fbfbf8',{d:4});eye(c,49,40,1.05,'#3a2a1a');eye(c,62,39,.95,'#3a2a1a');P(c,PG([66,44,76,46,66,49]),'#e8b84a',{d:.5,lw:1.2});F(c,E(44,46,3.4,2.2),'#f2a0a8',.5);
   P(c,CV([36,30,52,24,70,30,70,34,52,28,36,34]),'#e8c33a',{d:.5,lw:1.2});
   // 후광
   c.beginPath();c.ellipse(52,20,14,4,0,0,7);c.lineWidth=4;c.strokeStyle='#c9a03a';c.stroke();c.lineWidth=2;c.strokeStyle='#ffe9a8';c.stroke();glow(c,52,20,18,'rgba(255,230,120,.8)',.35)})};

function slime(col,boss){return(c,t)=>{
  if(boss){P(c,PG([30,40,20,14,44,30]),'#f6eed8',{d:2});P(c,PG([66,34,82,12,76,40]),'#f6eed8',{d:2})}
  P(c,CV([12,84,4,46,52,26,96,48,88,84,80,94,70,88,60,96,50,89,40,96,30,88,20,94,12,84]),col,{d:5});
  F(c,E(32,46,7,4.4,-.6),'#fff',.45);F(c,E(24,58,2.4,3.4,-.3),'#fff',.4);
  eye(c,54,60,1.2,'#5a3a1a','angry');eye(c,70,59,1.05,'#5a3a1a','angry');
  if(boss){P(c,PG([34,30,30,10,43,21,52,6,61,21,74,10,70,30]),'#ffd23e',{d:2});F(c,E(52,22,2.6,2.6),'#ff4d6d');L(c,[52,72,74,70],2.2);P(c,PG([56,71.6,58,78,60.6,71.4]),'#fff',{flat:1,lw:1.2});P(c,PG([66,70.6,68,77,70.6,70.4]),'#fff',{flat:1,lw:1.2})}
  else L(c,[58,71,68,70],2.2)}}
const PC={ham:'#ffb03a',liz:'#ff7a2e',mush:'#dfe6ec',croc:'#d8402f',rac:'#7fe8ff',owl:'#c9a03a',fen:'#b98cff',bear:'#5fd0ff',ncat:'#6fe36a',dove:'#ffe066'};
CH.mole=(c,t)=>CH.bear(c,t);CH.rabbit=(c,t)=>CH.fen(c,t);CH.squirrel=(c,t)=>CH.owl(c,t);CH.frog=(c,t)=>CH.rac(c,t);CH.hedgehog=(c,t)=>CH.fen(c,t);CH.skunk=(c,t)=>CH.rac(c,t);CH.bluebird=(c,t)=>CH.dove(c,t);CH.caterpillar=(c,t)=>CH.mush(c,t);CH.beetle=(c,t)=>CH.mush(c,t);
const ANIM=Object.keys(CH);
return{CH,PC,slime,sprite,OUT,ANIM}})();
Object.assign(PC,{fawn:'#e8a23a',gloom:'#dfe6ec',sprout:'#ffb03a',chick:'#e5483a',drop:'#59bdf5',pyo:'#ff8a2e',pup:'#5fae4a',fox:'#8a5a32',bunny:'#3558b8',mole:'#e0b05a',deer:'#aee6ff',eagle:'#dff5c8',frog:'#3a8494',queen:'#62b34e',thunder:'#ff7a2e',cosmo:'#c59bff'});
const IMG={};
const CIMG={};
const ANI={};
Object.assign(PC,{gamer:'#4fa3ff'});
const PKG={"lunette":{"frames":{"idle_01":__P(13),"idle_02":__P(14),"idle_03":__P(15),"idle_04":__P(16),"attack_01":__P(17),"attack_02":__P(18),"attack_03":__P(19),"attack_04":__P(20),"special_01":__P(21),"special_02":__P(22),"special_03":__P(23),"special_04":__P(24),"special_05":__P(25),"special_06":__P(26),"special_07":__P(27),"special_08":__P(28)},"fx":{"hit":[__P(29),__P(30),__P(31),__P(32)],"sfxhit":[__P(33),__P(34),__P(35),__P(36)]},"idle":[["idle_01",200],["idle_02",200],["idle_03",200],["idle_04",200]],"attack":{"f":[["attack_01",110],["attack_02",110],["attack_03",110],["attack_04",110]],"rel":110,"sock":[800,480]},"special":{"f":[["special_01",110],["special_02",110],["special_03",110],["special_04",110],["special_05",110],["special_06",110],["special_07",110],["special_08",110]],"rel":440,"sock":[512,560]},"cfg":{"projCps":10,"spCps":10,"spScale":1,"projW":20,"hitFps":12,"hitW":44,"fxFps":12,"fxW":30,"sfxFps":10,"sfxW":60,"pivot":0.9375}},"bricks":{"frames":{"idle_01":__P(37),"idle_02":__P(38),"attack_01":__P(39),"attack_02":__P(40),"attack_03":__P(41),"attack_04":__P(42),"attack_05":__P(43),"attack_06":__P(44),"special_01":__P(45),"special_02":__P(46),"special_03":__P(47),"special_04":__P(48),"special_05":__P(49),"special_06":__P(50),"special_07":__P(51),"special_08":__P(52)},"fx":{"proj":[__P(53),__P(54),__P(55),__P(56)],"hit":[__P(57),__P(58),__P(59),__P(60)],"sfxhit":[__P(61),__P(62),__P(63),__P(64)]},"idle":[["idle_01",180],["idle_02",180]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",90],["attack_04",90],["attack_05",90],["attack_06",90]],"rel":270,"sock":[700,430]},"special":{"f":[["special_01",90],["special_02",90],["special_03",90],["special_04",90],["special_05",90],["special_06",90],["special_07",90],["special_08",90]],"rel":360,"sock":[700,430]},"cfg":{"projCps":26,"spCps":30,"spScale":1.7,"projW":30,"hitFps":12,"hitW":36,"fxFps":12,"fxW":30,"sfxFps":10,"sfxW":60,"pivot":0.9375}},"mold":{"frames":{"idle_01":__P(65),"idle_02":__P(66),"attack_01":__P(67),"attack_02":__P(68),"attack_03":__P(69),"attack_04":__P(70),"attack_05":__P(71),"attack_06":__P(72),"special_01":__P(73),"special_02":__P(74),"special_03":__P(75),"special_04":__P(76),"special_05":__P(77),"special_06":__P(78),"special_07":__P(79),"special_08":__P(80)},"fx":{"trap":[__P(81),__P(82),__P(83),__P(84)],"hit":[__P(85),__P(86),__P(87),__P(88)],"sfxhit":[__P(89),__P(90),__P(91),__P(92)],"reach":[__P(93),__P(94),__P(95),__P(96)]},"idle":[["idle_01",180],["idle_02",180]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",90],["attack_04",90],["attack_05",90],["attack_06",90]],"rel":270,"sock":[800,600]},"special":{"f":[["special_01",90],["special_02",90],["special_03",90],["special_04",90],["special_05",90],["special_06",90],["special_07",90],["special_08",90]],"rel":360,"sock":[800,600]},"cfg":{"projCps":10,"spCps":10,"spScale":1,"projW":20,"hitFps":12,"hitW":44,"fxFps":12,"fxW":30,"sfxFps":10,"sfxW":60,"pivot":0.9375}},"pico":{"frames":{"idle_01":__P(97),"idle_02":__P(98),"attack_01":__P(99),"attack_02":__P(100),"attack_03":__P(101),"attack_04":__P(102),"attack_05":__P(103),"attack_06":__P(104),"special_01":__P(105),"special_02":__P(106),"special_03":__P(107),"special_04":__P(108),"special_05":__P(109),"special_06":__P(110),"special_07":__P(111),"special_08":__P(112)},"fx":{"hit":[__P(113),__P(114),__P(115),__P(116)],"sfxhit":[__P(117),__P(118),__P(119),__P(120)],"reach":[__P(121),__P(122),__P(123),__P(124)]},"idle":[["idle_01",180],["idle_02",180]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",90],["attack_04",90],["attack_05",90],["attack_06",90]],"rel":270,"sock":[800,600]},"special":{"f":[["special_01",90],["special_02",90],["special_03",90],["special_04",90],["special_05",90],["special_06",90],["special_07",90],["special_08",90]],"rel":360,"sock":[800,600]},"cfg":{"projCps":10,"spCps":10,"spScale":1,"projW":20,"hitFps":12,"hitW":30,"fxFps":12,"fxW":30,"sfxFps":10,"sfxW":60,"pivot":0.9375}},"jacko":{"frames":{"idle_01":__P(125),"idle_02":__P(126),"attack_01":__P(127),"attack_02":__P(128),"attack_03":__P(129),"attack_04":__P(130),"attack_05":__P(131),"attack_06":__P(132),"special_01":__P(133),"special_02":__P(134),"special_03":__P(135),"special_04":__P(136),"special_05":__P(137),"special_06":__P(138),"special_07":__P(139),"special_08":__P(140)},"fx":{"hit":[__P(141),__P(142),__P(143),__P(144)],"sfxhit":[__P(145),__P(146),__P(147),__P(148)],"reach":[__P(149),__P(150),__P(151),__P(152)]},"idle":[["idle_01",180],["idle_02",180]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",90],["attack_04",90],["attack_05",90],["attack_06",90]],"rel":270,"sock":[800,600]},"special":{"f":[["special_01",90],["special_02",90],["special_03",90],["special_04",90],["special_05",90],["special_06",90],["special_07",90],["special_08",90]],"rel":360,"sock":[800,600]},"cfg":{"projCps":10,"spCps":10,"spScale":1,"projW":20,"hitFps":12,"hitW":36,"fxFps":12,"fxW":30,"sfxFps":10,"sfxW":60,"pivot":0.9375}},"orca":{"frames":{"idle_01":__P(153),"idle_02":__P(154),"attack_01":__P(155),"attack_02":__P(156),"attack_03":__P(157),"attack_04":__P(158),"attack_05":__P(159),"attack_06":__P(160),"special_01":__P(161),"special_02":__P(162),"special_03":__P(163),"special_04":__P(164),"special_05":__P(165),"special_06":__P(166),"special_07":__P(167),"special_08":__P(168)},"fx":{"proj":[__P(169),__P(170)],"fx":[__P(171),__P(172),__P(173),__P(174)],"hit":[__P(175),__P(176),__P(177),__P(178)],"sfxhit":[__P(179),__P(180),__P(181),__P(182)],"buff_marker":[__P(183),__P(184)],"bfx":[__P(171),__P(172),__P(173),__P(174)],"link":[__P(185),__P(186),__P(187),__P(188)]},"idle":[["idle_01",420],["idle_02",420]],"attack":{"f":[["attack_01",120],["attack_02",100],["attack_03",80],["attack_04",80],["attack_05",110],["attack_06",150]],"rel":300,"sock":[869,533]},"special":{"f":[["special_01",150],["special_02",170],["special_03",160],["special_04",100],["special_05",100],["special_06",100],["special_07",160],["special_08",180]],"rel":480,"sock":[765,450]},"cfg":{"projCps":12,"spCps":12,"spScale":1,"projW":26,"hitFps":12.5,"hitW":36,"bfxFps":12.5,"bfxW":26,"fxFps":12.5,"fxW":40,"sfxFps":8,"sfxW":80,"pivot":0.849609375}},"mugyeom":{"frames":{"idle_01":__P(189),"attack_01":__P(190),"attack_02":__P(191),"attack_03":__P(192),"special_01":__P(193),"special_02":__P(194),"special_03":__P(195),"special_04":__P(196)},"fx":{"reach":[__P(197),__P(198),__P(199),__P(200)],"hit":[__P(201),__P(202),__P(203),__P(204)],"sfxhit":[__P(205),__P(206),__P(207),__P(208)],"fx":[__P(197),__P(198),__P(199),__P(200)]},"idle":[["idle_01",500],["idle_01",500]],"attack":{"f":[["attack_01",140],["attack_02",90],["attack_03",170]],"rel":140,"sock":[760,600]},"special":{"f":[["special_01",180],["special_02",150],["special_03",110],["special_04",200]],"rel":330,"sock":[760,600]},"cfg":{"projCps":14,"spCps":14,"spScale":1,"projW":34,"hitFps":12,"hitW":44,"bfxFps":16,"bfxW":30,"fxFps":16,"fxW":44,"sfxFps":12,"sfxW":90,"pivot":0.9375}},"mole":{"frames":{"idle_01":__P(209),"idle_02":__P(210),"attack_01":__P(211),"attack_02":__P(212),"attack_03":__P(213),"attack_04":__P(214),"attack_05":__P(215),"attack_06":__P(216),"special_01":__P(217),"special_02":__P(218),"special_03":__P(219),"special_04":__P(220),"special_05":__P(221),"special_06":__P(222),"special_07":__P(223),"special_08":__P(224)},"fx":{"proj":[__P(225),__P(226)],"fx":[__P(227),__P(228),__P(229),__P(230)],"hit":[__P(231),__P(232),__P(233),__P(234)],"sfxhit":[__P(235),__P(236),__P(237),__P(238)],"slow_marker":[__P(239),__P(240)],"bfx":[__P(227),__P(228),__P(229),__P(230)]},"idle":[["idle_01",420],["idle_02",420]],"attack":{"f":[["attack_01",120],["attack_02",100],["attack_03",80],["attack_04",80],["attack_05",110],["attack_06",150]],"rel":300,"sock":[776,574]},"special":{"f":[["special_01",150],["special_02",170],["special_03",160],["special_04",100],["special_05",100],["special_06",100],["special_07",160],["special_08",180]],"rel":480,"sock":[704,681]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":26,"hitFps":12.5,"hitW":34,"bfxFps":12.5,"bfxW":22,"fxFps":12.5,"fxW":30,"sfxFps":9,"sfxW":60,"pivot":0.849609375}},"alpaca":{"frames":{"idle_01":__P(241),"idle_02":__P(242),"attack_01":__P(243),"attack_02":__P(244),"attack_03":__P(245),"attack_04":__P(246),"attack_05":__P(247),"attack_06":__P(248),"special_01":__P(249),"special_02":__P(250),"special_03":__P(251),"special_04":__P(252),"special_05":__P(253),"special_06":__P(254),"special_07":__P(255),"special_08":__P(256)},"fx":{"proj":[__P(257),__P(258)],"fx":[__P(259),__P(260),__P(261),__P(262)],"hit":[__P(263),__P(264),__P(265),__P(266)],"sfxhit":[__P(267),__P(268),__P(269),__P(270)],"sproj":[__P(271),__P(272)],"bfx":[__P(259),__P(260),__P(261),__P(262)]},"idle":[["idle_01",420],["idle_02",420]],"attack":{"f":[["attack_01",120],["attack_02",100],["attack_03",80],["attack_04",80],["attack_05",110],["attack_06",150]],"rel":300,"sock":[959,362]},"special":{"f":[["special_01",150],["special_02",170],["special_03",160],["special_04",100],["special_05",100],["special_06",100],["special_07",160],["special_08",180]],"rel":480,"sock":[911,423]},"cfg":{"projCps":11,"spCps":9,"spScale":2,"projW":22,"hitFps":12.5,"hitW":34,"bfxFps":12.5,"bfxW":22,"fxFps":12.5,"fxW":28,"sfxFps":9,"sfxW":60,"pivot":0.849609375}},"archeon":{"frames":{"idle_01":__P(273),"idle_02":__P(274),"attack_01":__P(275),"attack_02":__P(276),"attack_03":__P(277),"attack_04":__P(278),"attack_05":__P(279),"attack_06":__P(280),"special_01":__P(281),"special_02":__P(282),"special_03":__P(283),"special_04":__P(284),"special_05":__P(285),"special_06":__P(286),"special_07":__P(287),"special_08":__P(288)},"fx":{"proj":[__P(289),__P(290)],"hit":[__P(291),__P(292),__P(293),__P(294)],"fx":[__P(295),__P(296),__P(297),__P(298)],"sfxhit":[__P(299),__P(300),__P(301),__P(302)],"bolt":[__P(303),__P(304)],"bfx":[__P(295),__P(296),__P(297),__P(298)]},"idle":[["idle_01",420],["idle_02",420]],"attack":{"f":[["attack_01",140],["attack_02",120],["attack_03",100],["attack_04",80],["attack_05",100],["attack_06",160]],"rel":360,"sock":[849,541]},"special":{"f":[["special_01",160],["special_02",180],["special_03",180],["special_04",100],["special_05",100],["special_06",120],["special_07",180],["special_08",180]],"rel":620,"sock":[553,558]},"cfg":{"projCps":13,"spCps":13,"spScale":1,"projW":34,"hitFps":12.5,"hitW":46,"bfxFps":12.5,"bfxW":34,"fxFps":12.5,"fxW":70,"sfxFps":10,"sfxW":150,"pivot":0.849609375}},"policebot":{"frames":{"idle_01":__P(305),"idle_02":__P(306),"attack_01":__P(307),"attack_02":__P(308),"attack_03":__P(309),"attack_04":__P(310),"attack_05":__P(311),"attack_06":__P(312),"special_01":__P(313),"special_02":__P(314),"special_03":__P(315),"special_04":__P(316),"special_05":__P(317),"special_06":__P(318),"special_07":__P(319),"special_08":__P(320)},"fx":{"proj":[__P(321),__P(322)],"fx":[__P(323),__P(324),__P(325),__P(326)],"hit":[__P(327),__P(328),__P(329),__P(330)],"sfxhit":[__P(331),__P(332),__P(333),__P(334)],"beam":[__P(335),__P(336)],"bfx":[__P(323),__P(324),__P(325),__P(326)]},"idle":[["idle_01",420],["idle_02",420]],"attack":{"f":[["attack_01",140],["attack_02",120],["attack_03",100],["attack_04",80],["attack_05",100],["attack_06",160]],"rel":360,"sock":[805,426]},"special":{"f":[["special_01",160],["special_02",180],["special_03",180],["special_04",100],["special_05",100],["special_06",120],["special_07",180],["special_08",180]],"rel":620,"sock":[765,356]},"cfg":{"projCps":16,"spCps":16,"spScale":1,"projW":30,"hitFps":12.5,"hitW":32,"bfxFps":12.5,"bfxW":28,"fxFps":12.5,"fxW":44,"sfxFps":12.5,"sfxW":40,"pivot":0.849609375}},"fortressbot":{"frames":{"idle_01":__P(337),"idle_02":__P(338),"attack_01":__P(339),"attack_02":__P(340),"attack_03":__P(341),"attack_04":__P(342),"attack_05":__P(343),"attack_06":__P(344),"special_01":__P(345),"special_02":__P(346),"special_03":__P(347),"special_04":__P(348),"special_05":__P(349),"special_06":__P(350),"special_07":__P(351),"special_08":__P(352)},"fx":{"proj":[__P(353),__P(354)],"fx":[__P(355),__P(356),__P(357),__P(358)],"hit":[__P(359),__P(360),__P(361),__P(362)],"sfxhit":[__P(363),__P(364),__P(365),__P(366)],"sproj":[__P(367),__P(368)],"bfx":[__P(355),__P(356),__P(357),__P(358)]},"idle":[["idle_01",420],["idle_02",420]],"attack":{"f":[["attack_01",140],["attack_02",120],["attack_03",100],["attack_04",80],["attack_05",100],["attack_06",160]],"rel":360,"sock":[401,592]},"special":{"f":[["special_01",160],["special_02",180],["special_03",180],["special_04",100],["special_05",100],["special_06",120],["special_07",180],["special_08",180]],"rel":520,"sock":[755,336],"ev":[[520,[755,336]],[620,[267,318]],[720,[726,332]]]},"cfg":{"projCps":11,"spCps":10,"spScale":1.5,"projW":30,"hitFps":11,"hitW":56,"bfxFps":12.5,"bfxW":44,"fxFps":12.5,"fxW":40,"sfxFps":9,"sfxW":110,"pivot":0.849609375}},"cleanbot":{"frames":{"idle_01":__P(369),"idle_02":__P(370),"attack_01":__P(371),"attack_02":__P(372),"attack_03":__P(373),"attack_04":__P(374),"attack_05":__P(375),"attack_06":__P(376),"special_01":__P(377),"special_02":__P(378),"special_03":__P(379),"special_04":__P(380),"special_05":__P(381),"special_06":__P(382),"special_07":__P(383),"special_08":__P(384)},"fx":{"proj":[__P(385),__P(386)],"hit":[__P(387),__P(388),__P(389),__P(390)],"sfxhit":[__P(391),__P(392),__P(393),__P(394)],"fx":[__P(395),__P(396),__P(397),__P(398)],"bfx":[__P(395),__P(396),__P(397),__P(398)]},"idle":[["idle_01",420],["idle_02",420]],"attack":{"f":[["attack_01",120],["attack_02",100],["attack_03",80],["attack_04",80],["attack_05",110],["attack_06",150]],"rel":300,"sock":[860,525]},"special":{"f":[["special_01",150],["special_02",170],["special_03",160],["special_04",100],["special_05",100],["special_06",100],["special_07",160],["special_08",180]],"rel":580,"sock":[550,715]},"cfg":{"projCps":10,"spCps":10,"spScale":1,"projW":20,"hitFps":12.5,"hitW":28,"bfxFps":12.5,"bfxW":20,"fxFps":12.5,"fxW":24,"sfxFps":9,"sfxW":110,"pivot":0.849609375}},"deliverybot":{"frames":{"idle_01":__P(399),"idle_02":__P(400),"attack_01":__P(401),"attack_02":__P(402),"attack_03":__P(403),"attack_04":__P(404),"attack_05":__P(405),"attack_06":__P(406),"special_01":__P(407),"special_02":__P(408),"special_03":__P(409),"special_04":__P(410),"special_05":__P(411),"special_06":__P(412),"special_07":__P(413),"special_08":__P(414)},"fx":{"proj":[__P(415),__P(416)],"hit":[__P(417),__P(418),__P(419),__P(420)],"sfxhit":[__P(421),__P(422),__P(423),__P(424)],"fx":[__P(425),__P(426),__P(427),__P(428)],"sproj":[__P(429),__P(430)],"bfx":[__P(425),__P(426),__P(427),__P(428)]},"idle":[["idle_01",420],["idle_02",420]],"attack":{"f":[["attack_01",120],["attack_02",100],["attack_03",80],["attack_04",80],["attack_05",110],["attack_06",150]],"rel":300,"sock":[865,535]},"special":{"f":[["special_01",150],["special_02",170],["special_03",160],["special_04",100],["special_05",100],["special_06",100],["special_07",160],["special_08",180]],"rel":480,"sock":[885,555],"ev":[[480,[885,555]],[580,[830,610]],[680,[850,535]]]},"cfg":{"projCps":9,"spCps":10,"spScale":1.35,"projW":22,"hitFps":12.5,"hitW":34,"bfxFps":12.5,"bfxW":26,"fxFps":12.5,"fxW":30,"sfxFps":11,"sfxW":52,"pivot":0.849609375}},"zeus":{"frames":{"idle_01":__P(431),"idle_02":__P(432),"attack_01":__P(433),"attack_02":__P(434),"attack_03":__P(435),"attack_04":__P(436),"attack_05":__P(437),"attack_06":__P(438),"special_01":__P(439),"special_02":__P(440),"special_03":__P(441),"special_04":__P(442),"special_05":__P(443),"special_06":__P(444),"special_07":__P(445),"special_08":__P(446)},"fx":{"hit":[__P(447),__P(448),__P(449),__P(450)],"fx":[__P(451),__P(452),__P(453),__P(454)],"sfxhit":[__P(455),__P(456),__P(457),__P(458)],"bolt":[__P(459),__P(460)],"proj":[__P(461),__P(462)]},"idle":[["idle_01",380],["idle_02",420]],"attack":{"f":[["attack_01",120],["attack_02",100],["attack_03",60],["attack_04",80],["attack_05",100],["attack_06",140]],"rel":220,"sock":[880,385]},"special":{"f":[["special_01",160],["special_02",180],["special_03",180],["special_04",180],["special_05",100],["special_06",140],["special_07",180],["special_08",180]],"rel":700,"sock":[540,670]},"cfg":{"projCps":14,"spCps":14,"spScale":1,"projW":34,"hitFps":12.5,"hitW":46,"fxFps":12.5,"fxW":56,"sfxFps":10,"sfxW":150,"pivot":0.849609375}},"jir":{"frames":{"idle_01":__P(463),"attack_01":__P(464),"attack_02":__P(465),"attack_03":__P(466),"attack_04":__P(467),"attack_05":__P(468),"attack_06":__P(469),"special_01":__P(470),"special_02":__P(471),"special_03":__P(472),"special_04":__P(473),"special_05":__P(474),"special_06":__P(475),"special_07":__P(476),"special_08":__P(477)},"fx":{"proj":[__P(478),__P(479)],"sproj":[__P(480),__P(481)],"hit":[__P(482),__P(483),__P(484),__P(485)],"fx":[__P(486),__P(487),__P(488),__P(489)],"sfxhit":[__P(490),__P(491),__P(492),__P(493)]},"idle":[["idle_01",1000]],"attack":{"f":[["attack_01",120],["attack_02",100],["attack_03",60],["attack_04",80],["attack_05",100],["attack_06",140]],"rel":220,"sock":[920,435]},"special":{"f":[["special_01",160],["special_02",180],["special_03",180],["special_04",180],["special_05",100],["special_06",140],["special_07",180],["special_08",180]],"rel":700,"sock":[940,475]},"cfg":{"projCps":12,"spCps":18,"spScale":2.4166666666666665,"projW":24,"hitFps":12,"hitW":34,"fxFps":16,"fxW":70,"sfxFps":16,"sfxW":94,"pivot":0.849609375}},"napoleon":{"frames":{"idle_01":__P(494),"idle_02":__P(495),"attack_01":__P(496),"attack_02":__P(497),"attack_03":__P(498),"attack_04":__P(499),"special_01":__P(500),"special_02":__P(501),"special_03":__P(502),"special_04":__P(503),"special_05":__P(504),"special_06":__P(505),"special_07":__P(506),"special_08":__P(507)},"fx":{"proj":[__P(508)],"sproj":[__P(508)],"hit":[__P(509)],"sfxhit":[__P(509)],"fx":[__P(510),__P(511),__P(512),__P(513)],"buff_marker":[__P(514),__P(515)],"bfx":[__P(510),__P(511),__P(512),__P(513)]},"idle":[["idle_01",420],["idle_02",420]],"attack":{"f":[["attack_01",150],["attack_02",150],["attack_03",180],["attack_04",180]],"rel":150,"sock":[824,516]},"special":{"f":[["special_01",150],["special_02",150],["special_03",65],["special_04",55],["special_05",65],["special_06",85],["special_03",65],["special_04",55],["special_05",65],["special_06",85],["special_03",65],["special_04",55],["special_05",65],["special_06",85],["special_03",65],["special_04",55],["special_05",65],["special_06",85],["special_03",65],["special_04",55],["special_05",65],["special_06",85],["special_03",65],["special_04",55],["special_05",65],["special_06",85],["special_07",160],["special_08",180]],"rel":310,"sock":[796,552],"ev":[[310,[796,552]],[375,[752,408]],[430,[812,596]],[495,[656,384]],[495,[656,384]],[580,[796,552]],[645,[752,408]],[700,[812,596]],[765,[656,384]],[765,[656,384]],[850,[796,552]],[915,[752,408]],[970,[812,596]],[1035,[656,384]],[1035,[656,384]],[1120,[796,552]],[1185,[752,408]],[1240,[812,596]],[1305,[656,384]],[1305,[656,384]],[1390,[796,552]],[1455,[752,408]],[1510,[812,596]],[1575,[656,384]],[1575,[656,384]],[1660,[796,552]],[1725,[752,408]],[1780,[812,596]],[1845,[656,384]],[1845,[656,384]],[1920,[820,576]],[1920,[820,576]]]},"cfg":{"projCps":12,"spCps":16,"spScale":2.6,"projW":14,"hitFps":12,"hitW":26,"bfxFps":16,"bfxW":18,"fxFps":16,"fxW":52,"sfxFps":12,"sfxW":66,"pivot":0.9375}},"veteran":{"frames":{"idle_01":__P(516),"idle_02":__P(517),"attack_01":__P(518),"attack_02":__P(519),"attack_03":__P(520),"attack_04":__P(521),"special_01":__P(522),"special_02":__P(523),"special_03":__P(524),"special_04":__P(525),"special_05":__P(526),"special_06":__P(527),"special_07":__P(528),"special_08":__P(529)},"fx":{"proj":[__P(508)],"sproj":[__P(530)],"hit":[__P(509)],"sfxhit":[__P(531),__P(532),__P(533),__P(534)],"bfx":[__P(510),__P(511),__P(512),__P(513)],"tracer":[__P(535)]},"idle":[["idle_01",420],["idle_02",420]],"attack":{"f":[["attack_01",140],["attack_02",160],["attack_03",100],["attack_04",180]],"rel":300,"sock":[872,488]},"special":{"f":[["special_01",180],["special_02",180],["special_03",200],["special_04",80],["special_05",140],["special_06",140],["special_07",180],["special_08",180]],"rel":640,"sock":[868,576]},"cfg":{"projCps":12,"spCps":14,"spScale":1.2857142857142858,"projW":14,"hitFps":12,"hitW":24,"bfxFps":16,"bfxW":26,"fxFps":16,"fxW":48,"sfxFps":12,"sfxW":72,"pivot":0.9375,"nadeT":0.55,"nadeArc":0.8}},"gamer":{"frames":{"attack_01":__P(536),"attack_02":__P(537),"attack_03":__P(538),"attack_04":__P(539),"attack_05":__P(540),"attack_06":__P(541),"idle_01":__P(542),"idle_02":__P(543),"idle_03":__P(544),"idle_04":__P(545),"special_01":__P(546),"special_02":__P(547),"special_03":__P(548),"special_04":__P(549),"special_05":__P(550),"special_06":__P(551),"special_07":__P(552),"special_08":__P(553)},"fx":{"proj":[__P(554),__P(555)],"sproj":[__P(556),__P(557)],"hit":[__P(558),__P(559),__P(560),__P(561)],"fx":[__P(562),__P(563),__P(564),__P(565)],"sfxhit":[__P(566),__P(567),__P(568),__P(569)]},"idle":[["idle_01",350],["idle_02",350],["idle_03",350],["idle_04",350]],"attack":{"f":[["attack_01",120],["attack_02",100],["attack_03",60],["attack_04",80],["attack_05",100],["attack_06",140]],"rel":220,"sock":[800,470]},"special":{"f":[["special_01",180],["special_02",180],["special_03",200],["special_04",80],["special_05",140],["special_06",140],["special_07",180],["special_08",180]],"rel":560,"sock":[788,544]},"cfg":{"projCps":8,"spCps":14,"spScale":1.4545454545454546,"projW":22,"hitFps":15,"hitW":28,"fxFps":10,"fxW":48,"sfxFps":10,"sfxW":70,"pivot":0.849609375}},"orbin":{"frames":{"idle_01":__P(570),"idle_02":__P(571),"attack_01":__P(572),"attack_02":__P(573),"attack_03":__P(574),"attack_04":__P(575),"attack_05":__P(576),"attack_06":__P(577),"special_01":__P(578),"special_02":__P(579),"special_03":__P(580),"special_04":__P(581),"special_05":__P(582),"special_06":__P(583),"special_07":__P(584),"special_08":__P(585)},"fx":{"proj":[__P(586),__P(587)],"sproj":[__P(588),__P(589)],"hit":[__P(590),__P(591),__P(592),__P(593)],"sfxhit":[__P(594),__P(595),__P(596),__P(597)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",90],["attack_03",90],["attack_04",70],["attack_05",90],["attack_06",120]],"rel":280,"sock":[872,572]},"special":{"f":[["special_01",120],["special_02",100],["special_03",100],["special_04",100],["special_05",80],["special_06",100],["special_07",100],["special_08",160]],"rel":420,"sock":[888,488]},"cfg":{"projCps":10,"spCps":12,"spScale":1.6,"projW":24,"hitFps":14,"hitW":32,"fxFps":12,"fxW":30,"sfxFps":10,"sfxW":70,"pivot":0.9375}},"nero":{"frames":{"idle_01":__P(598),"idle_02":__P(599),"attack_01":__P(600),"attack_02":__P(601),"attack_03":__P(602),"attack_04":__P(603),"attack_05":__P(604),"attack_06":__P(605),"special_01":__P(606),"special_02":__P(607),"special_03":__P(608),"special_04":__P(609),"special_05":__P(610),"special_06":__P(611),"special_07":__P(612),"special_08":__P(613)},"fx":{"proj":[__P(614),__P(615)],"sproj":[__P(616),__P(617)],"hit":[__P(618),__P(619),__P(620),__P(621)],"sfxhit":[__P(622),__P(623),__P(624),__P(625)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",90],["attack_03",90],["attack_04",70],["attack_05",90],["attack_06",120]],"rel":280,"sock":[804,612]},"special":{"f":[["special_01",120],["special_02",100],["special_03",100],["special_04",100],["special_05",80],["special_06",100],["special_07",100],["special_08",160]],"rel":420,"sock":[824,604]},"cfg":{"projCps":10,"spCps":12,"spScale":1.6,"projW":24,"hitFps":14,"hitW":32,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":54,"pivot":0.9375}},"vargon":{"frames":{"idle_01":__P(626),"idle_02":__P(627),"attack_01":__P(628),"attack_02":__P(629),"attack_03":__P(630),"attack_04":__P(631),"attack_05":__P(632),"attack_06":__P(633),"special_01":__P(634),"special_02":__P(635),"special_03":__P(636),"special_04":__P(637),"special_05":__P(638),"special_06":__P(639),"special_07":__P(640),"special_08":__P(626)},"fx":{"hit":[__P(641),__P(642),__P(643),__P(644)],"proj":[__P(645),__P(646)],"sfxhit":[__P(647),__P(648),__P(649),__P(650)],"sproj_bottle":[__P(651),__P(652)],"sproj_fork":[__P(653),__P(654)],"sproj_pot":[__P(655),__P(656)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",100],["attack_03",100],["attack_04",80],["attack_05",100],["attack_06",140]],"rel":300,"sock":[808,464]},"special":{"f":[["special_01",120],["special_02",120],["special_03",100],["special_04",100],["special_05",100],["special_06",100],["special_07",90],["special_08",160]],"rel":640,"sock":[844,428]},"cfg":{"projCps":11,"spCps":12,"spScale":1.6,"projW":26,"hitFps":14,"hitW":36,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":60,"pivot":0.9375}},"seraphine":{"frames":{"idle_01":__P(657),"idle_02":__P(658),"attack_01":__P(659),"attack_02":__P(660),"attack_03":__P(661),"attack_04":__P(662),"attack_05":__P(663),"attack_06":__P(664),"special_01":__P(665),"special_02":__P(666),"special_03":__P(667),"special_04":__P(668),"special_05":__P(669),"special_06":__P(670),"special_07":__P(671),"special_08":__P(672)},"fx":{"buff_marker":[__P(673),__P(674),__P(675),__P(676)],"cast":[__P(677),__P(678)],"hit":[__P(679),__P(680),__P(681),__P(682)],"proj":[__P(683),__P(684)],"sfxhit":[__P(685),__P(686),__P(687),__P(688)],"link":[__P(689),__P(690),__P(691),__P(692)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",100],["attack_03",100],["attack_04",80],["attack_05",100],["attack_06",140]],"rel":300,"sock":[844,580]},"special":{"f":[["special_01",120],["special_02",120],["special_03",100],["special_04",100],["special_05",100],["special_06",100],["special_07",90],["special_08",160]],"rel":440,"sock":[816,408]},"cfg":{"projCps":11,"spCps":12,"spScale":1.6,"projW":26,"hitFps":14,"hitW":36,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":60,"pivot":0.9375}},"belkaon":{"frames":{"idle_01":__P(693),"idle_02":__P(694),"attack_01":__P(695),"attack_02":__P(696),"attack_03":__P(697),"attack_04":__P(698),"attack_05":__P(699),"attack_06":__P(700),"special_01":__P(701),"special_02":__P(702),"special_03":__P(703),"special_04":__P(704),"special_05":__P(705),"special_06":__P(706),"special_07":__P(707),"special_08":__P(708)},"fx":{"buff_attack":[__P(709),__P(710)],"buff_cooldown":[__P(711),__P(712)],"cast":[__P(713),__P(714),__P(715),__P(716)],"coin_reward":[__P(717),__P(718)],"hit":[__P(719),__P(720),__P(721),__P(722)],"proj":[__P(723),__P(724)],"sfxhit":[__P(725),__P(726),__P(727),__P(728)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",90],["attack_03",90],["attack_04",80],["attack_05",100],["attack_06",140]],"rel":280,"sock":[836,624]},"special":{"f":[["special_01",120],["special_02",100],["special_03",100],["special_04",100],["special_05",90],["special_06",120],["special_07",100],["special_08",160]],"rel":420,"sock":[892,516]},"cfg":{"projCps":13,"spCps":12,"spScale":1.6,"projW":26,"hitFps":14,"hitW":40,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":60,"pivot":0.9375}},"floret":{"frames":{"idle_01":__P(729),"idle_02":__P(730),"attack_01":__P(731),"attack_02":__P(732),"attack_03":__P(733),"attack_04":__P(734),"attack_05":__P(735),"attack_06":__P(736),"special_01":__P(737),"special_02":__P(738),"special_03":__P(739),"special_04":__P(740),"special_05":__P(741),"special_06":__P(742),"special_07":__P(743),"special_08":__P(744)},"fx":{"hit":[__P(745),__P(746),__P(747),__P(748)],"proj":[__P(749),__P(750)],"sfxhit":[__P(751),__P(752),__P(753),__P(754)],"sproj":[__P(755),__P(756)],"trap":[__P(757),__P(758),__P(759),__P(760)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",90],["attack_03",90],["attack_04",70],["attack_05",90],["attack_06",120]],"rel":280,"sock":[884,600]},"special":{"f":[["special_01",120],["special_02",100],["special_03",100],["special_04",100],["special_05",80],["special_06",100],["special_07",100],["special_08",160]],"rel":420,"sock":[924,620]},"cfg":{"projCps":10,"spCps":11,"spScale":1.6,"projW":24,"hitFps":14,"hitW":32,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":54,"pivot":0.9375}},"sporun":{"frames":{"idle_01":__P(761),"idle_02":__P(762),"attack_01":__P(763),"attack_02":__P(764),"attack_03":__P(765),"attack_04":__P(766),"attack_05":__P(767),"attack_06":__P(768),"special_01":__P(769),"special_02":__P(770),"special_03":__P(771),"special_04":__P(772),"special_05":__P(773),"special_06":__P(774),"special_07":__P(775),"special_08":__P(776)},"fx":{"buff_marker":[__P(777),__P(778)],"cast":[__P(779),__P(780),__P(781),__P(782)],"hit":[__P(783),__P(784),__P(785),__P(786)],"proj":[__P(787),__P(788)],"sfxhit":[__P(789),__P(790),__P(791),__P(792)],"link":[__P(793),__P(794),__P(795),__P(796)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",90],["attack_03",90],["attack_04",70],["attack_05",90],["attack_06",120]],"rel":280,"sock":[652,660]},"special":{"f":[["special_01",120],["special_02",100],["special_03",100],["special_04",100],["special_05",80],["special_06",100],["special_07",100],["special_08",160]],"rel":420,"sock":[512,452]},"cfg":{"projCps":10,"spCps":11,"spScale":1.6,"projW":24,"hitFps":14,"hitW":32,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":54,"pivot":0.9375}},"cacton":{"frames":{"idle_01":__P(797),"idle_02":__P(798),"attack_01":__P(799),"attack_02":__P(800),"attack_03":__P(801),"attack_04":__P(802),"attack_05":__P(803),"attack_06":__P(804),"special_01":__P(805),"special_02":__P(806),"special_03":__P(807),"special_04":__P(808),"special_05":__P(809),"special_06":__P(810),"special_07":__P(811),"special_08":__P(812)},"fx":{"hit":[__P(813),__P(814),__P(815),__P(816)],"sfxhit":[__P(817),__P(818),__P(819),__P(820)],"reach":[__P(821),__P(822),__P(823),__P(824)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",90],["attack_03",90],["attack_04",70],["attack_05",90],["attack_06",120]],"rel":280,"sock":[828,676]},"special":{"f":[["special_01",120],["special_02",100],["special_03",100],["special_04",100],["special_05",80],["special_06",100],["special_07",100],["special_08",160]],"rel":420,"sock":[880,580]},"cfg":{"projCps":10,"spCps":10,"spScale":1,"projW":20,"hitFps":14,"hitW":40,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":60,"pivot":0.9375}},"elderon":{"frames":{"idle_01":__P(825),"idle_02":__P(826),"attack_01":__P(827),"attack_02":__P(828),"attack_03":__P(829),"attack_04":__P(830),"attack_05":__P(831),"attack_06":__P(832),"special_01":__P(833),"special_02":__P(834),"special_03":__P(835),"special_04":__P(836),"special_05":__P(837),"special_06":__P(838),"special_07":__P(839),"special_08":__P(840)},"fx":{"buff_marker":[__P(841),__P(842)],"hit":[__P(843),__P(844),__P(845),__P(846)],"sfxhit":[__P(847),__P(848),__P(849),__P(850)],"reach":[__P(851),__P(852),__P(853),__P(854)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",90],["attack_03",90],["attack_04",70],["attack_05",90],["attack_06",120]],"rel":280,"sock":[828,676]},"special":{"f":[["special_01",120],["special_02",100],["special_03",100],["special_04",100],["special_05",80],["special_06",100],["special_07",100],["special_08",160]],"rel":420,"sock":[588,868]},"cfg":{"projCps":10,"spCps":10,"spScale":1,"projW":20,"hitFps":14,"hitW":48,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":60,"pivot":0.9375}},"sylvaion":{"frames":{"idle_01":__P(855),"idle_02":__P(856),"attack_01":__P(857),"attack_02":__P(858),"attack_03":__P(859),"attack_04":__P(860),"attack_05":__P(861),"attack_06":__P(862),"special_01":__P(863),"special_02":__P(864),"special_03":__P(865),"special_04":__P(866),"special_05":__P(867),"special_06":__P(868),"special_07":__P(869),"special_08":__P(870)},"fx":{"cast":[__P(871),__P(872),__P(873),__P(874)],"hit":[__P(875),__P(876),__P(877),__P(878)],"proj":[__P(879),__P(880)],"sfxhit":[__P(881),__P(882),__P(883),__P(884)],"trap":[__P(885),__P(886),__P(887),__P(888)]},"idle":[["idle_01",400],["idle_02",400]],"attack":{"f":[["attack_01",100],["attack_02",90],["attack_03",90],["attack_04",70],["attack_05",90],["attack_06",120]],"rel":280,"sock":[860,588]},"special":{"f":[["special_01",140],["special_02",120],["special_03",120],["special_04",100],["special_05",100],["special_06",140],["special_07",120],["special_08",160]],"rel":480,"sock":[512,600]},"cfg":{"projCps":13,"spCps":12,"spScale":1.6,"projW":28,"hitFps":14,"hitW":40,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":60,"pivot":0.9375}},"momo":{"frames":{"idle_01":__P(889),"idle_02":__P(890),"attack_01":__P(891),"attack_02":__P(892),"attack_03":__P(893),"attack_04":__P(894),"attack_05":__P(895),"attack_06":__P(896),"special_01":__P(897),"special_02":__P(898),"special_03":__P(899),"special_04":__P(900),"special_05":__P(901),"special_06":__P(902),"special_07":__P(903),"special_08":__P(904)},"fx":{"buff_marker":[__P(905),__P(906)],"cast":[__P(907),__P(908),__P(909),__P(910)],"hit":[__P(911),__P(912),__P(913),__P(914)],"proj":[__P(915),__P(916)],"sfxhit":[__P(917),__P(918),__P(919),__P(920)],"link":[__P(921),__P(922),__P(923),__P(924)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",90],["attack_03",90],["attack_04",70],["attack_05",90],["attack_06",120]],"rel":280,"sock":[620,588]},"special":{"f":[["special_01",120],["special_02",100],["special_03",100],["special_04",100],["special_05",80],["special_06",100],["special_07",100],["special_08",160]],"rel":420,"sock":[536,724]},"cfg":{"projCps":10,"spCps":10,"spScale":1.8,"projW":22,"hitFps":14,"hitW":32,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":56,"pivot":0.9375}},"pulu":{"frames":{"idle_01":__P(925),"idle_02":__P(926),"attack_01":__P(927),"attack_02":__P(928),"attack_03":__P(929),"attack_04":__P(930),"attack_05":__P(931),"attack_06":__P(932),"special_01":__P(933),"special_02":__P(934),"special_03":__P(935),"special_04":__P(936),"special_05":__P(937),"special_06":__P(938),"special_07":__P(939),"special_08":__P(940)},"fx":{"hit":[__P(941),__P(942),__P(943),__P(944)],"proj":[__P(945),__P(946)],"sfxhit":[__P(947),__P(948),__P(949),__P(950)],"sproj":[__P(951),__P(952)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",90],["attack_03",90],["attack_04",70],["attack_05",90],["attack_06",120]],"rel":280,"sock":[660,580]},"special":{"f":[["special_01",120],["special_02",100],["special_03",100],["special_04",100],["special_05",80],["special_06",100],["special_07",100],["special_08",160]],"rel":420,"sock":[660,580]},"cfg":{"projCps":10,"spCps":10,"spScale":1.8,"projW":22,"hitFps":14,"hitW":32,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":56,"pivot":0.9375}},"bubon":{"frames":{"idle_01":__P(953),"idle_02":__P(954),"attack_01":__P(955),"attack_02":__P(956),"attack_03":__P(957),"attack_04":__P(958),"attack_05":__P(959),"attack_06":__P(960),"special_01":__P(961),"special_02":__P(962),"special_03":__P(963),"special_04":__P(964),"special_05":__P(965),"special_06":__P(966),"special_07":__P(967),"special_08":__P(968)},"fx":{"hit":[__P(969),__P(970),__P(971),__P(972)],"sfxhit":[__P(973),__P(974),__P(975),__P(976)],"reach":[__P(977),__P(978)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",90],["attack_03",90],["attack_04",70],["attack_05",90],["attack_06",120]],"rel":280,"sock":[820,608]},"special":{"f":[["special_01",120],["special_02",100],["special_03",100],["special_04",100],["special_05",80],["special_06",100],["special_07",100],["special_08",160]],"rel":420,"sock":[860,632]},"cfg":{"projCps":10,"spCps":10,"spScale":1.8,"projW":22,"hitFps":14,"hitW":40,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":56,"pivot":0.9375}},"stella":{"frames":{"idle_01":__P(979),"idle_02":__P(980),"attack_01":__P(981),"attack_02":__P(982),"attack_03":__P(983),"attack_04":__P(984),"attack_05":__P(985),"attack_06":__P(986),"special_01":__P(987),"special_02":__P(988),"special_03":__P(989),"special_04":__P(990),"special_05":__P(991),"special_06":__P(992),"special_07":__P(993),"special_08":__P(994)},"fx":{"hit":[__P(995),__P(996),__P(997),__P(998)],"proj":[__P(999),__P(1000)],"sfxhit":[__P(1001),__P(1002),__P(1003),__P(1004)],"sproj":[__P(1005),__P(1006)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",90],["attack_03",90],["attack_04",70],["attack_05",90],["attack_06",120]],"rel":280,"sock":[860,584]},"special":{"f":[["special_01",140],["special_02",120],["special_03",120],["special_04",100],["special_05",100],["special_06",140],["special_07",120],["special_08",160]],"rel":480,"sock":[832,512]},"cfg":{"projCps":12,"spCps":12,"spScale":1.7,"projW":24,"hitFps":14,"hitW":36,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":56,"pivot":0.9375}},"chronel":{"frames":{"idle_01":__P(1007),"idle_02":__P(1008),"attack_01":__P(1009),"attack_02":__P(1010),"attack_03":__P(1011),"attack_04":__P(1012),"attack_05":__P(1013),"attack_06":__P(1014),"special_01":__P(1015),"special_02":__P(1016),"special_03":__P(1017),"special_04":__P(1018),"special_05":__P(1019),"special_06":__P(1020),"special_07":__P(1021),"special_08":__P(1022)},"fx":{"cast":[__P(1023),__P(1024),__P(1025),__P(1026)],"hit":[__P(1027),__P(1028),__P(1029),__P(1030)],"proj":[__P(1031),__P(1032)],"sfxhit":[__P(1033),__P(1034),__P(1035),__P(1036)]},"idle":[["idle_01",350],["idle_02",350]],"attack":{"f":[["attack_01",100],["attack_02",90],["attack_03",90],["attack_04",70],["attack_05",90],["attack_06",120]],"rel":280,"sock":[880,680]},"special":{"f":[["special_01",140],["special_02",120],["special_03",120],["special_04",100],["special_05",100],["special_06",140],["special_07",120],["special_08",160]],"rel":480,"sock":[572,732]},"cfg":{"projCps":12,"spCps":12,"spScale":1.7,"projW":24,"hitFps":14,"hitW":36,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":56,"pivot":0.9375}},"lulu":{"frames":{"idle_01":__P(1037),"idle_02":__P(1038),"attack_01":__P(1039),"attack_02":__P(1040),"attack_03":__P(1041),"attack_04":__P(1042),"attack_05":__P(1043),"attack_06":__P(1044),"special_01":__P(1045),"special_02":__P(1046),"special_03":__P(1047),"special_04":__P(1048),"special_05":__P(1049),"special_06":__P(1050),"special_07":__P(1051),"special_08":__P(1052)},"fx":{"proj":[__P(1053),__P(1054),__P(1055),__P(1056)],"hit":[__P(1057),__P(1058),__P(1059),__P(1060)],"sfxhit":[__P(1057),__P(1058),__P(1059),__P(1060)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",90],["attack_04",90],["attack_05",90],["attack_06",90]],"rel":180,"sock":[760,600]},"special":{"f":[["special_01",90],["special_02",90],["special_03",90],["special_04",90],["special_05",90],["special_06",90],["special_07",90],["special_08",90]],"rel":180,"sock":[760,560]},"cfg":{"projCps":10,"spCps":11,"spScale":1.6,"projW":24,"hitFps":14,"hitW":34,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":64,"pivot":0.9375}},"miel":{"frames":{"idle_01":__P(1061),"idle_02":__P(1062),"attack_01":__P(1063),"attack_02":__P(1064),"attack_03":__P(1065),"attack_04":__P(1066),"attack_05":__P(1067),"attack_06":__P(1068),"special_01":__P(1069),"special_02":__P(1070),"special_03":__P(1071),"special_04":__P(1072),"special_05":__P(1073),"special_06":__P(1074),"special_07":__P(1075),"special_08":__P(1076)},"fx":{"proj":[__P(1077),__P(1078),__P(1079),__P(1080)],"hit":[__P(1081),__P(1082),__P(1083),__P(1084)],"sfxhit":[__P(1081),__P(1082),__P(1083),__P(1084)],"fx":[__P(1077)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",90],["attack_04",90],["attack_05",90],["attack_06",90]],"rel":180,"sock":[760,600]},"special":{"f":[["special_01",90],["special_02",90],["special_03",90],["special_04",90],["special_05",90],["special_06",90],["special_07",90],["special_08",90]],"rel":180,"sock":[760,560],"ev":[[180,[760,560]],[300,[760,560]],[420,[760,560]]]},"cfg":{"projCps":11,"spCps":11,"spScale":1.4,"projW":26,"hitFps":14,"hitW":36,"fxFps":12,"fxW":30,"sfxFps":12,"sfxW":56,"pivot":0.9375}},"noctia":{"frames":{"idle_01":__P(1085),"idle_02":__P(1086),"attack_01":__P(1087),"attack_02":__P(1088),"attack_03":__P(1089),"attack_04":__P(1090),"attack_05":__P(1091),"attack_06":__P(1092),"special_01":__P(1093),"special_02":__P(1094),"special_03":__P(1095),"special_04":__P(1096),"special_05":__P(1097),"special_06":__P(1098),"special_07":__P(1099),"special_08":__P(1100)},"fx":{"hit":[__P(1101),__P(1102),__P(1103),__P(1104)],"sfxhit":[__P(1105),__P(1106),__P(1107),__P(1108)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",100],["attack_02",100],["attack_03",80],["attack_04",80],["attack_05",100],["attack_06",140]],"rel":200,"sock":[800,600]},"special":{"f":[["special_01",120],["special_02",130],["special_03",160],["special_04",90],["special_05",80],["special_06",100],["special_07",120],["special_08",160]],"rel":410,"sock":[800,600]},"cfg":{"projCps":10,"spCps":10,"spScale":1,"projW":20,"hitFps":12,"hitW":48,"fxFps":12,"fxW":30,"sfxFps":11,"sfxW":80,"pivot":0.9375}},"aurielle":{"frames":{"idle_01":__P(1109),"idle_02":__P(1110),"attack_01":__P(1111),"attack_02":__P(1112),"attack_03":__P(1113),"attack_04":__P(1114),"attack_05":__P(1115),"attack_06":__P(1116),"special_01":__P(1117),"special_02":__P(1118),"special_03":__P(1119),"special_04":__P(1120),"special_05":__P(1121),"special_06":__P(1122),"special_07":__P(1123),"special_08":__P(1124)},"fx":{"proj":[__P(1125),__P(1126),__P(1127),__P(1128)],"hit":[__P(1129),__P(1130),__P(1131),__P(1132)],"sfxhit":[__P(1133),__P(1134),__P(1135),__P(1136)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",100],["attack_02",100],["attack_03",80],["attack_04",80],["attack_05",100],["attack_06",140]],"rel":200,"sock":[768,608]},"special":{"f":[["special_01",120],["special_02",130],["special_03",160],["special_04",90],["special_05",80],["special_06",100],["special_07",120],["special_08",160]],"rel":410,"sock":[800,600]},"cfg":{"projCps":12,"spCps":12,"spScale":1.6,"projW":28,"hitFps":13,"hitW":44,"fxFps":12,"fxW":30,"sfxFps":11,"sfxW":90,"pivot":0.9375}},"selene":{"frames":{"idle_01":__P(1137),"idle_02":__P(1138),"attack_01":__P(1139),"attack_02":__P(1140),"attack_03":__P(1141),"attack_04":__P(1142),"attack_05":__P(1143),"attack_06":__P(1144),"special_01":__P(1145),"special_02":__P(1146),"special_03":__P(1147),"special_04":__P(1140),"special_05":__P(1141),"special_06":__P(1148),"special_07":__P(1144),"special_08":__P(1137)},"fx":{"hit":[__P(1149),__P(1150),__P(1151),__P(1152)],"sfxhit":[__P(1153),__P(1154),__P(1155),__P(1156)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",100],["attack_02",100],["attack_03",80],["attack_04",80],["attack_05",100],["attack_06",140]],"rel":200,"sock":[800,600]},"special":{"f":[["special_01",120],["special_02",130],["special_03",160],["special_04",90],["special_05",80],["special_06",100],["special_07",120],["special_08",160]],"rel":500,"sock":[800,600]},"cfg":{"projCps":10,"spCps":10,"spScale":1,"projW":20,"hitFps":12,"hitW":60,"fxFps":12,"fxW":30,"sfxFps":11,"sfxW":110,"pivot":0.9375}},"hyeonmu":{"frames":{"idle_01":__P(1157),"idle_02":__P(1158),"attack_01":__P(1159),"attack_02":__P(1160),"attack_03":__P(1161),"attack_04":__P(1162),"attack_05":__P(1163),"attack_06":__P(1164),"special_01":__P(1165),"special_02":__P(1166),"special_03":__P(1167),"special_04":__P(1168),"special_05":__P(1169),"special_06":__P(1170),"special_07":__P(1171),"special_08":__P(1157)},"fx":{"hit":[__P(1172),__P(1173),__P(1174),__P(1175)],"sfxhit":[__P(1176),__P(1177),__P(1178),__P(1179)],"field":[__P(1180),__P(1181),__P(1182),__P(1183)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",100],["attack_02",110],["attack_03",130],["attack_04",80],["attack_05",120],["attack_06",160]],"rel":340,"sock":[800,640]},"special":{"f":[["special_01",140],["special_02",160],["special_03",140],["special_04",180],["special_05",80],["special_06",140],["special_07",140],["special_08",180]],"rel":620,"sock":[800,640]},"cfg":{"projCps":10,"spCps":10,"spScale":1,"projW":20,"hitFps":11,"hitW":64,"fxFps":12,"fxW":30,"sfxFps":10,"sfxW":110,"pivot":0.9375}},"hornkid":{"frames":{"idle_01":__P(1184),"idle_02":__P(1185),"attack_01":__P(1186),"attack_02":__P(1187),"attack_03":__P(1188),"attack_04":__P(1189),"attack_05":__P(1190),"attack_06":__P(1191),"special_01":__P(1192),"special_02":__P(1193),"special_03":__P(1194),"special_04":__P(1195),"special_05":__P(1196),"special_06":__P(1197),"special_07":__P(1198),"special_08":__P(1199)},"fx":{"proj":[__P(1200),__P(1201),__P(1202),__P(1203)],"hit":[__P(1204),__P(1205),__P(1206),__P(1207)],"cone":[__P(1208),__P(1209),__P(1210),__P(1211)],"sfxhit":[__P(1204),__P(1205),__P(1206),__P(1207)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",100],["attack_02",100],["attack_03",90],["attack_04",100],["attack_05",110],["attack_06",150]],"rel":290,"sock":[776,520]},"special":{"f":[["special_01",120],["special_02",140],["special_03",160],["special_04",120],["special_05",120],["special_06",130],["special_07",130],["special_08",160]],"rel":420,"sock":[780,512]},"cfg":{"spCps":10,"spScale":1,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"sfxW":80,"pivot":0.9375,"projCps":10,"projW":26,"hitW":40}},"fang_lancer":{"frames":{"idle_01":__P(1212),"idle_02":__P(1213),"attack_01":__P(1214),"attack_02":__P(1215),"attack_03":__P(1216),"attack_04":__P(1217),"attack_05":__P(1218),"attack_06":__P(1219),"special_01":__P(1220),"special_02":__P(1221),"special_03":__P(1222),"special_04":__P(1223),"special_05":__P(1224),"special_06":__P(1225),"special_07":__P(1226),"special_08":__P(1227)},"fx":{"shp":[__P(1228),__P(1229),__P(1230),__P(1231)],"sseq":[__P(1232),__P(1233),__P(1234),__P(1235)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",100],["attack_02",100],["attack_03",90],["attack_04",100],["attack_05",110],["attack_06",150]],"rel":200,"sock":[748,696]},"special":{"f":[["special_01",120],["special_02",140],["special_03",160],["special_04",120],["special_05",120],["special_06",130],["special_07",130],["special_08",160]],"rel":420,"sock":[712,712]},"cfg":{"spCps":10,"spScale":1,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"sfxW":80,"pivot":0.9375,"projCps":10,"projW":20,"hitW":36}},"iron_dragonkin":{"frames":{"idle_01":__P(1236),"idle_02":__P(1237),"attack_01":__P(1238),"attack_02":__P(1239),"attack_03":__P(1240),"attack_04":__P(1241),"attack_05":__P(1242),"attack_06":__P(1243),"special_01":__P(1244),"special_02":__P(1245),"special_03":__P(1246),"special_04":__P(1247),"special_05":__P(1248),"special_06":__P(1249),"special_07":__P(1250),"special_08":__P(1251)},"fx":{"hit":[__P(1252),__P(1253),__P(1254),__P(1255)],"cone":[__P(1208),__P(1209),__P(1210),__P(1211)],"sfxhit":[__P(1252),__P(1253),__P(1254),__P(1255)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",100],["attack_02",100],["attack_03",90],["attack_04",100],["attack_05",110],["attack_06",150]],"rel":290,"sock":[856,892]},"special":{"f":[["special_01",120],["special_02",140],["special_03",160],["special_04",120],["special_05",120],["special_06",130],["special_07",130],["special_08",160]],"rel":420,"sock":[884,484]},"cfg":{"spCps":10,"spScale":1,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"sfxW":80,"pivot":0.9375,"projCps":10,"projW":20,"hitW":60}},"hongryeon":{"frames":{"idle_01":__P(1256),"idle_02":__P(1257),"attack_01":__P(1258),"attack_02":__P(1259),"attack_03":__P(1260),"attack_04":__P(1261),"attack_05":__P(1262),"attack_06":__P(1263),"special_01":__P(1264),"special_02":__P(1265),"special_03":__P(1266),"special_04":__P(1267),"special_05":__P(1268),"special_06":__P(1269),"special_07":__P(1270),"special_08":__P(1271)},"fx":{"shp":[__P(1272),__P(1273),__P(1274),__P(1275)],"beam":[__P(1276),__P(1277),__P(1278),__P(1279)],"fx":[__P(1272),__P(1273),__P(1274),__P(1275)],"sfxhit":[__P(1276),__P(1277),__P(1278),__P(1279)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",100],["attack_02",100],["attack_03",100],["attack_04",100],["attack_05",110],["attack_06",160]],"rel":200,"sock":[720,700]},"special":{"f":[["special_01",140],["special_02",160],["special_03",180],["special_04",120],["special_05",140],["special_06",130],["special_07",150],["special_08",180]],"rel":480,"sock":[820,920]},"cfg":{"spCps":10,"spScale":1,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"sfxW":46,"pivot":0.9375,"projCps":10,"projW":20,"hitW":50}},"cheongryong":{"frames":{"idle_01":__P(1280),"idle_02":__P(1281),"attack_01":__P(1282),"attack_02":__P(1283),"attack_03":__P(1284),"attack_04":__P(1285),"attack_05":__P(1286),"attack_06":__P(1287),"special_01":__P(1288),"special_02":__P(1289),"special_03":__P(1290),"special_04":__P(1291),"special_05":__P(1292),"special_06":__P(1293),"special_07":__P(1294),"special_08":__P(1295)},"fx":{"hit":[__P(1296),__P(1297),__P(1298),__P(1299)],"cone":[__P(1300),__P(1301),__P(1302),__P(1303)],"chain":[__P(1304),__P(1305),__P(1306),__P(1307)],"sfxhit":[__P(1296),__P(1297),__P(1298),__P(1299)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",100],["attack_02",100],["attack_03",100],["attack_04",100],["attack_05",110],["attack_06",160]],"rel":200,"sock":[872,412]},"special":{"f":[["special_01",140],["special_02",160],["special_03",180],["special_04",120],["special_05",140],["special_06",130],["special_07",150],["special_08",180]],"rel":480,"sock":[888,368]},"cfg":{"spCps":10,"spScale":1,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"sfxW":80,"pivot":0.9375,"projCps":10,"projW":20,"hitW":56}},"feather_courier":{"frames":{"idle_01":__P(1308),"attack_01":__P(1309),"attack_02":__P(1310),"attack_03":__P(1311),"special_01":__P(1312),"special_02":__P(1313),"special_03":__P(1314),"special_04":__P(1315)},"fx":{"proj":[__P(1316),__P(1317),__P(1318),__P(1319)],"hit":[__P(1320),__P(1321),__P(1322),__P(1323)],"sseq":[__P(1320),__P(1321),__P(1322),__P(1323)]},"idle":[["idle_01",500],["idle_01",500]],"attack":{"f":[["attack_01",140],["attack_02",90],["attack_03",170]],"rel":140,"sock":[780,560]},"special":{"f":[["special_01",180],["special_02",160],["special_03",100],["special_04",200]],"rel":340,"sock":[780,560]},"cfg":{"spCps":10,"spScale":1.4,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"pivot":0.9375,"projCps":12,"projW":24,"hitW":36,"sfxW":70}},"feather_archer":{"frames":{"idle_01":__P(1324),"attack_01":__P(1325),"attack_02":__P(1326),"attack_03":__P(1327),"special_01":__P(1328),"special_02":__P(1329),"special_03":__P(1330),"special_04":__P(1331)},"fx":{"proj":[__P(1332),__P(1333),__P(1334),__P(1335)],"hit":[__P(1336),__P(1337),__P(1338),__P(1339)],"beam":[__P(1332),__P(1333),__P(1334),__P(1335)],"fx":[__P(1336),__P(1337),__P(1338),__P(1339)],"sfxhit":[__P(1336),__P(1337),__P(1338),__P(1339)]},"idle":[["idle_01",500],["idle_01",500]],"attack":{"f":[["attack_01",140],["attack_02",90],["attack_03",170]],"rel":140,"sock":[780,560]},"special":{"f":[["special_01",180],["special_02",160],["special_03",100],["special_04",200]],"rel":340,"sock":[780,560]},"cfg":{"spCps":10,"spScale":1.4,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"pivot":0.9375,"projCps":16,"projW":30,"hitW":34,"sfxW":40}},"storm_owl":{"frames":{"idle_01":__P(1340),"attack_01":__P(1341),"attack_02":__P(1342),"attack_03":__P(1343),"special_01":__P(1344),"special_02":__P(1345),"special_03":__P(1346),"special_04":__P(1347)},"fx":{"hit":[__P(1348),__P(1349),__P(1350),__P(1351)],"sfxhit":[__P(1352),__P(1353),__P(1354),__P(1355)]},"idle":[["idle_01",500],["idle_01",500]],"attack":{"f":[["attack_01",150],["attack_02",100],["attack_03",180]],"rel":150,"sock":[780,560]},"special":{"f":[["special_01",180],["special_02",180],["special_03",110],["special_04",220]],"rel":360,"sock":[780,560]},"cfg":{"spCps":10,"spScale":1.4,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"pivot":0.9375,"projCps":10,"projW":20,"hitW":56,"sfxW":100}},"goldwing_commander":{"frames":{"idle_01":__P(1356),"attack_01":__P(1357),"attack_02":__P(1358),"attack_03":__P(1359),"special_01":__P(1360),"special_02":__P(1361),"special_03":__P(1362),"special_04":__P(1363)},"fx":{"shp":[__P(1364),__P(1365),__P(1366),__P(1367)],"beam":[__P(1368),__P(1369),__P(1370),__P(1371)],"fx":[__P(1364),__P(1365),__P(1366),__P(1367)],"sfxhit":[__P(1364),__P(1365),__P(1366),__P(1367)]},"idle":[["idle_01",500],["idle_01",500]],"attack":{"f":[["attack_01",150],["attack_02",100],["attack_03",180]],"rel":150,"sock":[780,560]},"special":{"f":[["special_01",180],["special_02",180],["special_03",110],["special_04",220]],"rel":360,"sock":[780,560]},"cfg":{"spCps":10,"spScale":1.4,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"pivot":0.9375,"projCps":10,"projW":20,"hitW":50,"sfxW":44}},"jujak":{"frames":{"idle_01":__P(1372),"attack_01":__P(1373),"attack_02":__P(1374),"attack_03":__P(1375),"special_01":__P(1376),"special_02":__P(1377),"special_03":__P(1378),"special_04":__P(1379)},"fx":{"proj":[__P(1380),__P(1381),__P(1382),__P(1383)],"hit":[__P(1384),__P(1385),__P(1386),__P(1387)],"sfxhit":[__P(1388),__P(1389),__P(1390),__P(1391)],"field":[__P(1388),__P(1389),__P(1390),__P(1391)]},"idle":[["idle_01",500],["idle_01",500]],"attack":{"f":[["attack_01",160],["attack_02",100],["attack_03",180]],"rel":160,"sock":[780,560]},"special":{"f":[["special_01",220],["special_02",180],["special_03",140],["special_04",220]],"rel":400,"sock":[780,560]},"cfg":{"spCps":10,"spScale":1.4,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"pivot":0.9375,"projCps":12,"projW":34,"hitW":50,"sfxW":120}},"snowkid":{"frames":{"idle_01":__P(1392),"attack_01":__P(1393),"attack_02":__P(1394),"attack_03":__P(1395),"special_01":__P(1396),"special_02":__P(1397),"special_03":__P(1398),"special_04":__P(1399)},"fx":{"proj":[__P(1400),__P(1401),__P(1402),__P(1403)],"hit":[__P(1404),__P(1405),__P(1406),__P(1407)],"sfxhit":[__P(1404),__P(1405),__P(1406),__P(1407)]},"idle":[["idle_01",500],["idle_01",500]],"attack":{"f":[["attack_01",150],["attack_02",100],["attack_03",180]],"rel":150,"sock":[780,560]},"special":{"f":[["special_01",180],["special_02",180],["special_03",110],["special_04",220]],"rel":360,"sock":[780,560]},"cfg":{"spCps":10,"spScale":1.5,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"pivot":0.9375,"projCps":10,"projW":26,"hitW":38,"sfxW":70}},"icicle_bat":{"frames":{"idle_01":__P(1408),"attack_01":__P(1409),"attack_02":__P(1410),"attack_03":__P(1411),"special_01":__P(1412),"special_02":__P(1413),"special_03":__P(1414),"special_04":__P(1415)},"fx":{"proj":[__P(1416),__P(1417),__P(1418),__P(1419)],"hit":[__P(1420),__P(1421),__P(1422),__P(1423)],"cone":[__P(1416),__P(1417),__P(1418),__P(1419)]},"idle":[["idle_01",500],["idle_01",500]],"attack":{"f":[["attack_01",150],["attack_02",100],["attack_03",180]],"rel":150,"sock":[780,424]},"special":{"f":[["special_01",180],["special_02",180],["special_03",110],["special_04",220]],"rel":360,"sock":[780,424]},"cfg":{"spCps":10,"spScale":1.5,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"pivot":0.9375,"projCps":15,"projW":30,"hitW":34,"sfxW":60}},"snow_yeti":{"frames":{"idle_01":__P(1424),"attack_01":__P(1425),"attack_02":__P(1426),"attack_03":__P(1427),"special_01":__P(1428),"special_02":__P(1429),"special_03":__P(1430),"special_04":__P(1431)},"fx":{"shp":[__P(1432),__P(1433),__P(1434),__P(1435)],"sseq":[__P(1436),__P(1437),__P(1438),__P(1439)],"hit":[__P(1432),__P(1433),__P(1434),__P(1435)]},"idle":[["idle_01",500],["idle_01",500]],"attack":{"f":[["attack_01",150],["attack_02",100],["attack_03",180]],"rel":150,"sock":[780,560]},"special":{"f":[["special_01",180],["special_02",180],["special_03",110],["special_04",220]],"rel":360,"sock":[780,560]},"cfg":{"spCps":10,"spScale":1.5,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"pivot":0.9375,"projCps":10,"projW":20,"hitW":50,"sfxW":90}},"ice_golem":{"frames":{"idle_01":__P(1440),"attack_01":__P(1441),"attack_02":__P(1442),"attack_03":__P(1443),"special_01":__P(1444),"special_02":__P(1445),"special_03":__P(1446),"special_04":__P(1447)},"fx":{"hit":[__P(1448),__P(1449),__P(1450),__P(1451)],"sfxhit":[__P(1452),__P(1453),__P(1454),__P(1455)],"field":[__P(1452),__P(1453),__P(1454),__P(1455)]},"idle":[["idle_01",500],["idle_01",500]],"attack":{"f":[["attack_01",150],["attack_02",100],["attack_03",180]],"rel":150,"sock":[780,560]},"special":{"f":[["special_01",180],["special_02",180],["special_03",110],["special_04",220]],"rel":360,"sock":[780,560]},"cfg":{"spCps":10,"spScale":1.5,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"pivot":0.9375,"projCps":10,"projW":20,"hitW":60,"sfxW":110}},"baekho":{"frames":{"idle_01":__P(1456),"attack_01":__P(1457),"attack_02":__P(1458),"attack_03":__P(1459),"special_01":__P(1460),"special_02":__P(1461),"special_03":__P(1462),"special_04":__P(1463)},"fx":{"reach":[__P(1464),__P(1465),__P(1466),__P(1467)],"hit":[__P(1468),__P(1469),__P(1470),__P(1471)],"sfxhit":[__P(1472),__P(1473),__P(1474),__P(1475)]},"idle":[["idle_01",500],["idle_01",500]],"attack":{"f":[["attack_01",130],["attack_02",80],["attack_03",160]],"rel":130,"sock":[780,560]},"special":{"f":[["special_01",200],["special_02",180],["special_03",120],["special_04",220]],"rel":380,"sock":[780,560]},"cfg":{"spCps":10,"spScale":1.5,"hitFps":12,"fxFps":12,"fxW":30,"sfxFps":11,"pivot":0.9375,"projCps":10,"projW":20,"hitW":46,"sfxW":120}},"jinmu":{"frames":{"idle_01":__P(1476),"attack_01":__P(1477),"attack_02":__P(1478),"attack_03":__P(1479),"special_01":__P(1480),"special_02":__P(1481),"special_03":__P(1482),"special_04":__P(1483),"summon_01":__P(1484),"summon_02":__P(1485),"summon_03":__P(1486),"summon_04":__P(1487)},"fx":{"hit":[__P(1488),__P(1489),__P(1490),__P(1491)],"hit2":[__P(1492),__P(1493),__P(1494),__P(1495)],"sfxhit":[__P(1496),__P(1497),__P(1498),__P(1499)],"spawn":[__P(1500),__P(1501),__P(1502),__P(1503)],"descent":[__P(1504),__P(1505),__P(1506),__P(1507)],"aura":[__P(1508),__P(1509),__P(1510),__P(1511)],"field":[__P(1496),__P(1497),__P(1498),__P(1499)]},"idle":[["idle_01",500],["idle_01",500]],"attack":{"f":[["attack_01",160],["attack_02",90],["attack_03",180]],"rel":160,"sock":[800,600]},"special":{"f":[["special_01",200],["special_02",300],["special_03",120],["special_04",220]],"rel":500,"sock":[800,600]},"cfg":{"projCps":10,"spCps":10,"spScale":1,"projW":20,"hitFps":12,"hitW":70,"fxFps":12,"fxW":40,"sfxFps":11,"sfxW":130,"pivot":0.9375,"auraC":[0.5,0.71,0.86]}},"jeokhwang":{"frames":{"idle_01":__P(1512),"attack_01":__P(1513),"attack_02":__P(1514),"attack_03":__P(1515),"special_01":__P(1516),"special_02":__P(1517),"special_03":__P(1518),"special_04":__P(1519),"summon_01":__P(1520),"summon_02":__P(1521),"summon_03":__P(1522),"summon_04":__P(1523)},"fx":{"hit":[__P(1524),__P(1525),__P(1526),__P(1527)],"hit2":[__P(1528),__P(1529),__P(1530),__P(1531)],"sfxhit":[__P(1532),__P(1533),__P(1534),__P(1535)],"spawn":[__P(1536),__P(1537),__P(1538),__P(1539)],"descent":[__P(1540),__P(1541),__P(1542),__P(1543)],"aura":[__P(1544),__P(1545),__P(1546),__P(1547)],"field":[__P(1532),__P(1533),__P(1534),__P(1535)]},"idle":[["idle_01",500],["idle_01",500]],"attack":{"f":[["attack_01",160],["attack_02",90],["attack_03",180]],"rel":160,"sock":[800,600]},"special":{"f":[["special_01",200],["special_02",300],["special_03",120],["special_04",220]],"rel":500,"sock":[800,600]},"cfg":{"projCps":10,"spCps":10,"spScale":1,"projW":20,"hitFps":12,"hitW":70,"fxFps":12,"fxW":40,"sfxFps":11,"sfxW":130,"pivot":0.9375,"auraC":[0.5,0.5,0.82]}},"astraon":{"frames":{"summon_01":__P(1548),"idle_01":__P(1549),"idle_02":__P(1550),"attack_01":__P(1551),"attack_02":__P(1552),"attack_03":__P(1553),"attack_04":__P(1554),"attack_05":__P(1555),"attack_06":__P(1556),"special_01":__P(1557),"special_02":__P(1558),"special_03":__P(1559),"special_04":__P(1560),"special_05":__P(1561),"special_06":__P(1562),"special_07":__P(1563),"special_08":__P(1564)},"fx":{"proj":[__P(1565)],"hit":[__P(1566)],"chain":[__P(1567)],"sig":[__P(1568)],"scol":[__P(1569)],"sfxhit":[__P(1570)],"fx":[__P(1571)],"descent":[__P(1572)],"spawn":[__P(1573)],"aura":[__P(1574)],"aura2":[__P(1575)],"spark":[__P(1576)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",70],["attack_04",70],["attack_05",80],["attack_06",100]],"rel":180,"sock":[620,420]},"special":{"f":[["special_01",150],["special_02",150],["special_03",150],["special_04",150],["special_05",160],["special_06",140],["special_07",130],["special_08",130]],"rel":600,"sock":[520,380]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":70,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":130,"pivot":0.8984375,"kp":1,"auraC":[0.52,0.56,0.58]}},"yeongeopsu":{"frames":{"summon_01":__P(1577),"idle_01":__P(1578),"idle_02":__P(1579),"attack_01":__P(1580),"attack_02":__P(1581),"attack_03":__P(1582),"attack_04":__P(1583),"attack_05":__P(1584),"attack_06":__P(1585),"special_01":__P(1586),"special_02":__P(1587),"special_03":__P(1588),"special_04":__P(1589),"special_05":__P(1590),"special_06":__P(1591),"special_07":__P(1592),"special_08":__P(1593)},"fx":{"proj":[__P(1594)],"hit":[__P(1595)],"fx":[__P(1596)],"dome":[__P(1597)],"field":[__P(1598)],"sfxhit":[__P(1599)],"sig":[__P(1600)],"descent":[__P(1601)],"spawn":[__P(1602)],"aura":[__P(1603)],"aura2":[__P(1604)],"spark":[__P(1605)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",70],["attack_04",70],["attack_05",80],["attack_06",100]],"rel":280,"sock":[920,470]},"special":{"f":[["special_01",150],["special_02",150],["special_03",150],["special_04",150],["special_05",160],["special_06",140],["special_07",130],["special_08",130]],"rel":600,"sock":[520,380]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":70,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":130,"pivot":0.8984375,"kp":1,"auraC":[0.51,0.5,0.82]}},"unhwa":{"frames":{"summon_01":__P(1606),"idle_01":__P(1607),"idle_02":__P(1608),"attack_01":__P(1609),"attack_02":__P(1610),"attack_03":__P(1611),"attack_04":__P(1612),"attack_05":__P(1613),"attack_06":__P(1614),"special_01":__P(1615),"special_02":__P(1616),"special_03":__P(1617),"special_04":__P(1618),"special_05":__P(1619),"special_06":__P(1620),"special_07":__P(1621),"special_08":__P(1622)},"fx":{"proj":[__P(1623)],"hit":[__P(1624)],"fx":[__P(1625)],"wheel":[__P(1626)],"buffA":[__P(1627)],"buffC":[__P(1628)],"coin":[__P(1629)],"sfxhit":[__P(1630)],"descent":[__P(1631)],"spawn":[__P(1632)],"aura":[__P(1633)],"aura2":[__P(1634)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",70],["attack_04",70],["attack_05",80],["attack_06",100]],"rel":180,"sock":[620,420]},"special":{"f":[["special_01",150],["special_02",150],["special_03",150],["special_04",150],["special_05",160],["special_06",140],["special_07",130],["special_08",130]],"rel":600,"sock":[520,380]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":70,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":130,"pivot":0.8984375,"kp":1,"auraC":[0.52,0.54,0.81]}},"clockweaver":{"frames":{"summon_01":__P(1635),"idle_01":__P(1636),"idle_02":__P(1637),"attack_01":__P(1638),"attack_02":__P(1639),"attack_03":__P(1640),"attack_04":__P(1641),"attack_05":__P(1642),"attack_06":__P(1643),"special_01":__P(1644),"special_02":__P(1645),"special_03":__P(1646),"special_04":__P(1647),"special_05":__P(1648),"special_06":__P(1649),"special_07":__P(1650),"special_08":__P(1651)},"fx":{"proj":[__P(1652)],"hit":[__P(1653)],"fx":[__P(1654)],"mark":[__P(1655)],"bind":[__P(1656)],"slash":[__P(1657)],"sfxhit":[__P(1658)],"descent":[__P(1659)],"spawn":[__P(1660)],"aura":[__P(1661)],"aura2":[__P(1662)],"spark":[__P(1663)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",70],["attack_04",70],["attack_05",80],["attack_06",100]],"rel":180,"sock":[620,420]},"special":{"f":[["special_01",150],["special_02",150],["special_03",150],["special_04",150],["special_05",160],["special_06",140],["special_07",130],["special_08",130]],"rel":600,"sock":[520,380]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":70,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":130,"pivot":0.8984375,"kp":1,"auraC":[0.51,0.49,0.82]}},"hwangryong":{"frames":{"idle_00":__P(1664),"attack_00":__P(1665),"attack_01":__P(1666),"attack_02":__P(1667),"blue_00":__P(1668),"blue_01":__P(1669),"jade_00":__P(1670),"jade_01":__P(1671),"red_00":__P(1672),"red_01":__P(1673),"white_00":__P(1674),"white_01":__P(1675),"falling_00":__P(1676),"falling_01":__P(1677),"landing_00":__P(1678),"landing_01":__P(1679),"idle_01":__P(1664),"summon_01":__P(1679)},"fx":{"blue":[__P(1680),__P(1681),__P(1682),__P(1683)],"jade":[__P(1684),__P(1685),__P(1686),__P(1687)],"red":[__P(1688),__P(1689),__P(1690),__P(1691)],"white":[__P(1692),__P(1693),__P(1694),__P(1695)],"aura":[__P(1696),__P(1697),__P(1698),__P(1699)],"spawn":[__P(1700),__P(1701),__P(1702),__P(1703)],"hit":[__P(1692),__P(1693),__P(1694),__P(1695)]},"idle":[["idle_00",600],["idle_00",600]],"attack":{"f":[["attack_00",160],["attack_01",90],["attack_02",180]],"rel":160,"sock":[620,420]},"special":{"f":[["blue_00",200],["blue_01",140],["idle_00",180]],"rel":200,"sock":[520,380]},"sk":{"blue":[["blue_00",200],["blue_01",140],["idle_00",180]],"jade":[["jade_00",200],["jade_01",140],["idle_00",180]],"red":[["red_00",200],["red_01",140],["idle_00",180]],"white":[["white_00",200],["white_01",140],["idle_00",180]]},"summon":[["falling_00",120],["falling_01",120],["landing_00",340],["landing_01",440]],"cfg":{"projCps":10,"spCps":10,"spScale":1,"projW":40,"hitFps":12,"hitW":90,"fxFps":12,"fxW":60,"sfxFps":12,"sfxW":160,"pivot":0.9375,"auraC":[0.5,0.5,0.81]}},"nox":{"frames":{"idle_01":__P(1704),"idle_02":__P(1705),"attack_01":__P(1706),"attack_02":__P(1707),"attack_03":__P(1708),"attack_04":__P(1709),"attack_05":__P(1710),"attack_06":__P(1711),"special_01":__P(1712),"special_02":__P(1713),"special_03":__P(1714),"special_04":__P(1715),"special_05":__P(1716),"special_06":__P(1717),"special_07":__P(1718),"special_08":__P(1719),"summon_01":__P(1720)},"fx":{"proj":[__P(1721)],"hit":[__P(1722)],"fx":[__P(1723)],"orb":[__P(1724)],"slash":[__P(1725)],"sfxhit":[__P(1726)],"mark":[__P(1727)],"descent":[__P(1728)],"spawn":[__P(1729)],"aura":[__P(1730)],"aura2":[__P(1731)],"spark":[__P(1732)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",70],["attack_02",60],["attack_03",50],["attack_04",80],["attack_05",90],["attack_06",100]],"rel":220,"sock":[860,740]},"special":{"f":[["special_01",140],["special_02",140],["special_03",140],["special_04",130],["special_05",100],["special_06",100],["special_07",150],["special_08",180]],"rel":650,"sock":[520,380]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":70,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":130,"pivot":0.9153094462540716,"kp":1,"auraC":[0.51,0.5,0.82]}},"cheora":{"frames":{"idle_01":__P(1733),"idle_02":__P(1734),"attack_01":__P(1735),"attack_02":__P(1736),"attack_03":__P(1737),"attack_04":__P(1738),"attack_05":__P(1739),"attack_06":__P(1740),"special_01":__P(1741),"special_02":__P(1742),"special_03":__P(1743),"special_04":__P(1744),"special_05":__P(1745),"special_06":__P(1746),"summon_01":__P(1747),"summon_02":__P(1748)},"fx":{"hit":[__P(1749)],"quake":[__P(1750)],"sfxhit":[__P(1751)],"spark":[__P(1752)],"descent":[__P(1753)],"spawn":[__P(1754)],"aura":[__P(1755)],"fx":[__P(1756)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",70],["attack_02",60],["attack_03",70],["attack_04",100],["attack_05",100],["attack_06",130]],"rel":280,"sock":[760,700]},"special":{"f":[["special_01",180],["special_02",180],["special_03",120],["special_04",120],["special_05",200],["special_06",300]],"rel":600,"sock":[520,500]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":70,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":130,"pivot":0.8984375,"kp":1,"auraC":[0.498,0.62,0.785]}},"wolroe":{"frames":{"idle_01":__P(1757),"idle_02":__P(1758),"attack_01":__P(1759),"attack_02":__P(1760),"attack_03":__P(1761),"attack_04":__P(1762),"attack_05":__P(1763),"attack_06":__P(1764),"special_01":__P(1765),"special_02":__P(1766),"special_03":__P(1767),"special_04":__P(1768),"special_05":__P(1769),"special_06":__P(1770),"summon_01":__P(1771),"summon_02":__P(1772)},"fx":{"hit":[__P(1773)],"shp":[__P(1774)],"slash":[__P(1775)],"cross":[__P(1776)],"sfxhit":[__P(1776)],"spark":[__P(1777)],"descent":[__P(1778)],"spawn":[__P(1779)],"aura":[__P(1780)],"fx":[__P(1781)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",70],["attack_02",60],["attack_03",50],["attack_04",80],["attack_05",90],["attack_06",100]],"rel":220,"sock":[700,560]},"special":{"f":[["special_01",180],["special_02",180],["special_03",120],["special_04",120],["special_05",200],["special_06",300]],"rel":600,"sock":[520,500]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":70,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":130,"pivot":0.8984375,"kp":1,"auraC":[0.508,0.537,0.887]}},"pearlpunch":{"frames":{"idle_01":__P(1782),"idle_02":__P(1783),"attack_01":__P(1784),"attack_02":__P(1785),"attack_03":__P(1786),"attack_04":__P(1787),"special_01":__P(1788),"special_02":__P(1789),"special_03":__P(1790),"special_04":__P(1791),"special_05":__P(1792),"special_06":__P(1793)},"fx":{"hit":[__P(1794)],"sfxhit":[__P(1795)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",100],["attack_04",140]],"rel":220,"sock":[700,560]},"special":{"f":[["special_01",150],["special_02",150],["special_03",120],["special_04",120],["special_05",180],["special_06",180]],"rel":540,"sock":[600,520]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":60,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":110,"pivot":0.8984375}},"clawlancer":{"frames":{"idle_01":__P(1796),"idle_02":__P(1797),"attack_01":__P(1798),"attack_02":__P(1799),"attack_03":__P(1800),"attack_04":__P(1801),"special_01":__P(1802),"special_02":__P(1803),"special_03":__P(1804),"special_04":__P(1805),"special_05":__P(1806),"special_06":__P(1807)},"fx":{"hit":[__P(1808)],"sfxhit":[__P(1809)],"shp":[__P(1809)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",100],["attack_04",140]],"rel":220,"sock":[700,560]},"special":{"f":[["special_01",150],["special_02",150],["special_03",120],["special_04",120],["special_05",180],["special_06",180]],"rel":540,"sock":[600,520]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":60,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":110,"pivot":0.8984375}},"coralgiant":{"frames":{"idle_01":__P(1810),"idle_02":__P(1811),"attack_01":__P(1812),"attack_02":__P(1813),"attack_03":__P(1814),"attack_04":__P(1815),"special_01":__P(1816),"special_02":__P(1817),"special_03":__P(1818),"special_04":__P(1819),"special_05":__P(1820),"special_06":__P(1821)},"fx":{"hit":[__P(1822)],"sfxhit":[__P(1823)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",100],["attack_04",140]],"rel":220,"sock":[720,600]},"special":{"f":[["special_01",150],["special_02",150],["special_03",120],["special_04",120],["special_05",180],["special_06",180]],"rel":540,"sock":[600,520]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":70,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":120,"pivot":0.8984375}},"abyssadmiral":{"frames":{"idle_01":__P(1824),"idle_02":__P(1825),"attack_01":__P(1826),"attack_02":__P(1827),"attack_03":__P(1828),"attack_04":__P(1829),"special_01":__P(1830),"special_02":__P(1831),"special_03":__P(1832),"special_04":__P(1833),"special_05":__P(1834),"special_06":__P(1835)},"fx":{"hit":[__P(1836)],"sfxhit":[__P(1837)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",100],["attack_04",140]],"rel":220,"sock":[720,560]},"special":{"f":[["special_01",150],["special_02",150],["special_03",120],["special_04",120],["special_05",180],["special_06",180]],"rel":540,"sock":[600,500]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":70,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":120,"pivot":0.8984375}},"poseidon":{"frames":{"idle_01":__P(1838),"idle_02":__P(1839),"attack_01":__P(1840),"attack_02":__P(1841),"attack_03":__P(1842),"attack_04":__P(1843),"special_01":__P(1844),"special_02":__P(1845),"special_03":__P(1846),"special_04":__P(1847),"special_05":__P(1848),"special_06":__P(1849)},"fx":{"hit":[__P(1836)],"shp":[__P(1836)],"sfxhit":[__P(1850)],"aura":[__P(1851)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",90],["attack_02",90],["attack_03",100],["attack_04",140]],"rel":220,"sock":[720,560]},"special":{"f":[["special_01",150],["special_02",150],["special_03",120],["special_04",120],["special_05",180],["special_06",180]],"rel":540,"sock":[600,500]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":70,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":120,"pivot":0.8984375,"auraC":[0.499,0.457,0.873]}},"bideung":{"frames":{"idle_01":__P(1852),"idle_02":__P(1853),"attack_01":__P(1854),"attack_02":__P(1855),"attack_03":__P(1856),"attack_04":__P(1857),"attack_05":__P(1858),"attack_06":__P(1859),"special_01":__P(1860),"special_02":__P(1861),"special_03":__P(1862),"special_04":__P(1863),"special_05":__P(1864),"special_06":__P(1865),"summon_01":__P(1866),"summon_02":__P(1867)},"fx":{"hit":[__P(1868)],"quake":[__P(1869)],"sfxhit":[__P(1870)],"spark":[__P(1871)],"descent":[__P(1872)],"spawn":[__P(1873)],"aura":[__P(1874)],"fx":[__P(1875)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",70],["attack_02",60],["attack_03",70],["attack_04",100],["attack_05",100],["attack_06",130]],"rel":280,"sock":[760,700]},"special":{"f":[["special_01",180],["special_02",180],["special_03",120],["special_04",120],["special_05",200],["special_06",300]],"rel":600,"sock":[520,500]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":70,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":130,"pivot":0.8984375,"kp":1,"auraC":[0.508,0.526,0.836]}},"noeha":{"frames":{"idle_01":__P(1876),"idle_02":__P(1877),"attack_01":__P(1878),"attack_02":__P(1879),"attack_03":__P(1880),"attack_04":__P(1881),"attack_05":__P(1882),"attack_06":__P(1883),"special_01":__P(1884),"special_02":__P(1885),"special_03":__P(1886),"special_04":__P(1887),"special_05":__P(1888),"special_06":__P(1889),"summon_01":__P(1890),"summon_02":__P(1891)},"fx":{"hit":[__P(1892)],"shp":[__P(1893)],"chain":[__P(1894)],"sfxhit":[__P(1895)],"spark":[__P(1896)],"descent":[__P(1897)],"spawn":[__P(1898)],"aura":[__P(1899)],"fx":[__P(1900)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",70],["attack_02",60],["attack_03",50],["attack_04",80],["attack_05",90],["attack_06",100]],"rel":220,"sock":[700,560]},"special":{"f":[["special_01",180],["special_02",180],["special_03",120],["special_04",120],["special_05",200],["special_06",300]],"rel":600,"sock":[520,500]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":70,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":130,"pivot":0.8984375,"kp":1,"auraC":[0.521,0.536,0.842]}},"yeongwol":{"frames":{"idle_01":__P(1901),"idle_02":__P(1902),"attack_01":__P(1903),"attack_02":__P(1904),"attack_03":__P(1905),"attack_04":__P(1906),"attack_05":__P(1907),"attack_06":__P(1908),"special_01":__P(1909),"special_02":__P(1910),"special_03":__P(1911),"special_04":__P(1912),"special_05":__P(1913),"special_06":__P(1914),"summon_01":__P(1915),"summon_02":__P(1916)},"fx":{"hit":[__P(1917)],"slash":[__P(1918)],"sfxhit":[__P(1919)],"tstop":[__P(1920)],"spark":[__P(1921)],"descent":[__P(1922)],"spawn":[__P(1923)],"aura":[__P(1924)],"fx":[__P(1925)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",70],["attack_02",60],["attack_03",50],["attack_04",80],["attack_05",90],["attack_06",100]],"rel":220,"sock":[640,520]},"special":{"f":[["special_01",180],["special_02",180],["special_03",120],["special_04",120],["special_05",200],["special_06",300]],"rel":600,"sock":[512,400]},"cfg":{"projCps":9,"spCps":9,"spScale":1,"projW":46,"hitFps":8,"hitW":90,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":130,"pivot":0.8984375,"kp":1,"auraC":[0.527,0.596,0.848]}},"heukjo":{"frames":{"idle_01":__P(1926),"idle_02":__P(1927),"attack_01":__P(1928),"attack_02":__P(1929),"attack_03":__P(1930),"attack_04":__P(1931),"attack_05":__P(1932),"attack_06":__P(1933),"special_01":__P(1934),"special_02":__P(1935),"special_03":__P(1936),"special_04":__P(1937),"special_05":__P(1938),"special_06":__P(1939),"summon_01":__P(1940),"summon_02":__P(1941)},"fx":{"proj":[__P(1942)],"hit":[__P(1943)],"fx":[__P(1944)],"wheel":[__P(1945)],"wave":[__P(1946)],"bolt":[__P(1947)],"bless":[__P(1948)],"sfxhit":[__P(1949)],"descent":[__P(1950)],"spawn":[__P(1951)],"aura":[__P(1952)]},"idle":[["idle_01",500],["idle_02",500]],"attack":{"f":[["attack_01",70],["attack_02",60],["attack_03",50],["attack_04",80],["attack_05",90],["attack_06",100]],"rel":220,"sock":[700,500]},"special":{"f":[["special_01",180],["special_02",180],["special_03",120],["special_04",120],["special_05",200],["special_06",300]],"rel":600,"sock":[512,400]},"cfg":{"projCps":10,"spCps":9,"spScale":1,"projW":40,"hitFps":8,"hitW":70,"fxFps":8,"fxW":60,"sfxFps":6,"sfxW":130,"pivot":0.8984375,"kp":1,"auraC":[0.527,0.554,0.848]}}};
const ANI_K=1; // 패키지 시간 유지; 배속은 게임 시계에서만 적용
function tintImg(im,col){const c=document.createElement('canvas');c.width=im.naturalWidth||im.width;c.height=im.naturalHeight||im.height;const x=c.getContext('2d');x.drawImage(im,0,0);x.globalCompositeOperation='source-atop';x.globalAlpha=.42;x.fillStyle=col;x.fillRect(0,0,c.width,c.height);return c}
function loadPkg(k){const p=PKG[k].src?Object.assign({},PKG[PKG[k].src],PKG[k]):PKG[k],U0=U[k];if(!U0)return;const ms=a=>a.map(([n,d])=>[n,d*ANI_K]),tot=a=>a.reduce((s,[,d])=>s+d,0)/1000;
  const at=ms(p.attack.f),sp=ms(p.special.f);
  U0.ani={pivot:p.cfg.pivot,idle:p.idle,idleT:tot(p.idle)*1000,attack:{T:tot(at),rel:p.attack.rel*ANI_K/1000,f:at,sock:p.attack.sock},special:{T:tot(sp),shots:[p.special.rel*ANI_K/1000],stink:p.special.rel*ANI_K/1000,radial:p.special.rel*ANI_K/1000,f:sp,sock:p.special.sock,ev:p.special.ev&&p.special.ev.map(([t,k])=>[t*ANI_K/1000,k])}};
  if(p.sk){U0.aniSk={};for(const g in p.sk){const f=ms(p.sk[g]);U0.aniSk[g]={T:tot(f),shots:[.2],stink:.2,radial:.2,f,sock:p.special.sock}}}
  U0.aimg={};for(const n in p.frames){const im=new Image();if(U0.tint)im.onload=()=>{U0.aimg[n]=tintImg(im,U0.tint);if(n==='idle_01')U0.url=U0.aimg[n].toDataURL()};im.src=p.frames[n];U0.aimg[n]=im}
  U0.url=p.frames.idle_01;U0.pk={cfg:p.cfg};for(const g in p.fx)U0.pk[g]=p.fx[g].map(src=>{const im=new Image();im.src=src;return im});
  if(!AT[k])AT[k]={mo:'shot',dl:.2,im:'none'};if(!PC[k])PC[k]=({mole:'#b9773a',alpaca:'#5fd6e8',orca:'#6fc8ff',mugyeom:'#3a3440',pico:'#ffd23e',jacko:'#e0483a',bricks:'#ff8a3c',mold:'#5fd6c8',lunette:'#c77dff'})[k]||'#ffd23e'}
function stOff(c,u,j){return [0,0];return u.t>=4||c.n===1?[0,0]:c.n===2?[[-CS*.22,0],[CS*.22,0]][j]:[[0,-CS*.22],[-CS*.23,CS*.06],[CS*.23,CS*.06]][j]}
function fitBox(u){if(u._fb)return u._fb;const im=u.aimg&&u.aimg.idle_01;if(!im||!(im.complete&&im.naturalWidth||im.getContext))return null;try{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.drawImage(im,0,0,64,64);const d=x.getImageData(0,0,64,64).data;let x0=64,y0=64,x1=0;for(let y=0;y<64;y++)for(let q=0;q<64;q++)if(d[(y*64+q)*4+3]>40){if(q<x0)x0=q;if(q>x1)x1=q;if(y<y0)y0=y}
  return u._fb={h:Math.max(.2,u.ani.pivot-y0/64),w:Math.max(.2,(x1-x0+1)/64)}}catch(e){return null}}
// 캐릭터별 표시 크기(설계 의도). 등급과 무관. 기본 1
const VS={heukjo:1.25,yeongwol:1.12,noeha:1.3,bideung:1.3,poseidon:1.16,abyssadmiral:1.06,coralgiant:1.04,clawlancer:.96,pearlpunch:.86,wolroe:1.3,cheora:1.3,nox:1.3,jinmu:1.3,jeokhwang:1.3,astraon:1.35,yeongeopsu:1.3,unhwa:1.3,clockweaver:1.3,hwangryong:1.45,baekho:1.14,ice_golem:1.06,jujak:1.14,goldwing_commander:1.04,cheongryong:1.16,iron_dragonkin:1.06,hornkid:.9,hyeonmu:1.14,selene:1.14,lulu:.88,chronel:1.1,sylvaion:1.12,belkaon:1.1,pico:.82,lunette:.86,mole:.9,cleanbot:.9,gamer:.95,jacko:.95,fortressbot:1.08,mugyeom:1.06,mold:1.0,zeus:1.12,archeon:1.1};
function fitS2(c,u){const B5=u.t>=4,n=1,fb=fitBox(u),KZ=B5?concSz(c):1;if(!fb)return (B5?CS*1.21:CS*.75)*1.2*(u.scale||1)*KZ;const H=CS*.8*(VS[c.u]||1)*(n===1?1:n===2?.86:.76),Wm=CS*(B5?1.05:n===1?.9:n===2?.66:.56);return Math.min(H/fb.h,Wm/fb.w)*KZ}
function pickT(x,y,r,pref){if(pref&&pref.hp>0&&pref.hp>(pref.inc||0))return pref;let b=null,bp=-1;for(const m of G.mobs){if(m.hp<=0||m.p<28||m.hp<=(m.inc||0))continue;const[mx,my]=pos(m.p),pr=m.boss?1e9:m.p;if(Math.hypot(mx-x,my-y)<=r&&pr>bp){bp=pr;b=m}}return b||(pref&&pref.hp>0?pref:null)}
function stN(c,u){return u.t>=4?1:c.n}
function sockXY(c,i,u,which,sk0,j){const[x0,y0]=cellXY(i),[ox,oy]=j==null?[0,0]:stOff(c,u,j),B5=u.t>=4,x=x0+ox,y=y0+oy-(B5?CS*.16:0),sz=B5?CS*1.21:CS*.75,S2=fitS2(c,u),sk=sk0||u.ani[which].sock,pv=u.ani.pivot,fl=(c.ax||1)<0?-1:1;
  return[x+(sk[0]/1024-.5)*S2*fl,y+GROUND+(sk[1]/1024-pv)*S2]}
function aniPick(list,ms){let t=0;for(const[n,d]of list){t+=d;if(ms<t)return n}return list[list.length-1][0]}
function aniFrame(u,c){const A=u.ani,im=u.aimg;if(!im)return null;let n;
  if(c.sb>0)n=aniPick(A.special.f,(A.special.T-c.sb)*1000);else if(c.b>0&&c.bT)n=aniPick(A.attack.f,(1-c.b/c.bT)*A.attack.T*1000);else n=aniPick(A.idle,(G.time*1000)%(A.idleT||700));
  return im[n]&&(im[n].complete===undefined||im[n].complete)&&(im[n].naturalWidth||im[n].width)?im[n]:null}
const NF=14;
function bake(){
  const mk=z=>{const c=document.createElement('canvas');c.width=c.height=z;return c};
  for(const k in U){if(CH[k]){U[k].spr=sprite(mk,CH[k],200);U[k].url=U[k].spr.toDataURL()}U[k].col=PC[k]||'#ffd23e'}
  if(typeof Image!=='undefined')for(const k in IMG){const im=new Image();im.onload=()=>{U[k].spr=im;U[k].img=1;U[k].fr=null};im.src=IMG[k];U[k].url=IMG[k]}
  if(typeof Image!=='undefined')for(const k in ANI){U[k].ani=ANI[k];U[k].aimg={};if(CIMG[k]&&CIMG[k].idle)U[k].url=CIMG[k].idle;for(const n in CIMG[k]){const im=new Image();im.src=CIMG[k][n];U[k].aimg[n]=im}}
  if(typeof Image!=='undefined')for(const k in PKG)loadPkg(k);
  if(typeof Image!=='undefined')for(const k in RINGIMG){const im=new Image();im.src=RINGIMG[k];RING[k]=im}
  if(typeof Image!=='undefined')for(const k in SFXIMG){const im=new Image();im.src=SFXIMG[k];SFX[k]=im}
  if(typeof Image!=='undefined')for(const k in FXIMG){const im=new Image();im.src=FXIMG[k];if(U[k]){U[k].fximg=im;U[k].fx=FXCFG[k]}}
  for(const k of ANIM){if(IMG[k]||!U[k])continue;U[k].fr=[];for(let i=0;i<NF;i++)U[k].fr.push(sprite(mk,c=>CH[k](c,i/(NF-1)),160))}
  MOBS=MOBC.map(c=>sprite(mk,slime(c),160));BOSS=sprite(mk,slime('#7a5ab8',1),220);
  if(typeof Image!=='undefined')ENK.forEach((k,i)=>{const im=new Image();im.onload=()=>{MOBS[i]=im;if(i===5)BOSS=im};im.src=ENIMG[k]})
}
// ---------- 캐릭터별 공격 모션·투사체·타격 이펙트 ----------
const AT={
 pyo:{mo:'spit',pj:'fire',dl:.14,im:'star'},drop:{mo:'puff',pj:'drop',dl:.18,h:8,im:'splash'},sprout:{mo:'throw',pj:'cone',dl:.34,h:34,im:'boom',ic:'#c98a4a'},
 chick:{mo:'dash',dl:.02,im:'slash',ic:'#ffffff'},pup:{mo:'slam',dl:.02,im:'crack'},
 fox:{mo:'shiver',pj:'bolt',dl:.1,im:'star'},peng:{mo:'throw',pj:'snow',dl:.28,h:22,im:'snow'},bunny:{mo:'dash',dl:.02,im:'star'},bat:{mo:'pulse',dl:.04,im:'zap'},mole:{mo:'dash',dl:.02,im:'dizzy'},
 lion:{mo:'rear',dl:.03,im:'boom',ic:'#ff7a2e'},deer:{mo:'rear',dl:.05,im:'spike'},mush:{mo:'puff',pj:'spore',dl:.36,h:26,im:'cloud'},wolf:{mo:'pounce',dl:.02,im:'claw'},eagle:{mo:'slash',pj:'wave',dl:.12,im:'slash',ic:'#dff5c8'},
 dino:{mo:'kick',pj:'shell',dl:.3,h:16,im:'boom',ic:'#ffb03a',big:1},whale:{mo:'cast',dl:.06,im:'sky'},tiger:{mo:'rear',dl:.03,im:'palm'},robo:{mo:'kick',pj:'bullet',dl:.06,im:'star'},
 dragon:{mo:'breath',dl:.22,im:'breath'},frog:{mo:'puff',pj:'ink',dl:.28,h:24,im:'splat'},queen:{mo:'cast',pj:'curse',dl:.3,im:'curse'},thunder:{mo:'flap',pj:'fire',dl:.2,im:'boom',ic:'#ff7a2e',big:1},cosmo:{mo:'brace',dl:.08,im:'beam'}
};
// 모션 키프레임: [시점, 전진, 상승, 가로배율, 세로배율, 회전] / r = 공격이 나가는 시점
const MO={
 spit:{r:.4,k:[[0,0,0,1,1,0],[.3,-3,0,1.12,.86,-.08],[.42,4,2,.9,1.14,.1],[.62,-2,0,1.04,.97,-.03],[1,0,0,1,1,0]]},
 puff:{r:.42,k:[[0,0,0,1,1,0],[.32,-2,0,1.22,1.16,-.06],[.44,3,0,.9,.93,.08],[.66,0,0,1.05,1.02,0],[1,0,0,1,1,0]]},
 throw:{r:.42,k:[[0,0,0,1,1,0],[.3,-3,2,1,1,-.45],[.45,4,3,1.05,.97,.4],[.7,1,0,1,1,.1],[1,0,0,1,1,0]]},
 dash:{r:.42,L:1,k:[[0,0,0,1,1,0],[.22,-1.2,0,1.1,.9,-.12],[.42,10,2,1.15,.9,.15],[.52,10,0,.95,1.08,.05],[1,0,0,1,1,0]]},
 pounce:{r:.46,L:1,k:[[0,0,0,1,1,0],[.2,-1,0,1.12,.85,-.15],[.34,5,14,1.08,.96,.3],[.46,10,3,1.06,.94,.1],[.56,10,0,1,1,0],[1,0,0,1,1,0]]},
 slam:{r:.62,L:1,k:[[0,0,0,1,1,0],[.25,-1,0,1.1,.85,0],[.5,6,18,.92,1.12,-.2],[.62,10,0,1.25,.7,.05],[.8,9,0,.96,1.06,0],[1,0,0,1,1,0]]},
 rear:{r:.52,k:[[0,0,0,1,1,0],[.35,-1,5,1,1.05,-.4],[.52,3,0,1.15,.82,.12],[.72,0,0,.98,1.04,0],[1,0,0,1,1,0]]},
 pulse:{r:.46,k:[[0,0,0,1,1,0],[.3,0,-3,1.2,.8,0],[.48,0,8,.84,1.22,0],[.75,0,2,1.05,.96,0],[1,0,0,1,1,0]]},
 shiver:{r:.4,k:[[0,0,0,1,1,0],[.1,1,0,1,1,.06],[.2,-1,0,1.08,.94,-.06],[.3,1,0,1.12,.9,.06],[.4,-2,0,.9,1.14,-.04],[.6,1,0,1.03,.98,0],[1,0,0,1,1,0]]},
 kick:{r:0,k:[[0,0,0,1,1,0],[.1,-6,1,1.06,.95,-.12],[.35,-3,0,1,1,-.05],[1,0,0,1,1,0]]},
 slash:{r:.4,k:[[0,0,0,1,1,0],[.28,-2,2,1,1,-.35],[.42,6,0,1.08,.95,.45],[.6,3,0,1,1,.15],[1,0,0,1,1,0]]},
 breath:{r:.4,k:[[0,0,0,1,1,0],[.3,-3,2,1.05,1.02,-.3],[.42,5,0,1.06,.96,.22],[.8,4,0,1.03,.98,.18],[1,0,0,1,1,0]]},
 cast:{r:.48,k:[[0,0,0,1,1,0],[.3,0,3,.95,1.08,-.06],[.5,0,9,1.08,1.04,.04],[.8,0,3,1.02,1,0],[1,0,0,1,1,0]]},
 flap:{r:.5,k:[[0,0,0,1,1,0],[.2,0,-2,1.15,.85,0],[.4,-2,12,.9,1.15,-.15],[.55,4,6,1.1,.95,.2],[1,0,0,1,1,0]]},
 brace:{r:.25,k:[[0,0,0,1,1,0],[.2,-2,0,1.06,.94,-.06],[.3,-4,0,1.1,.92,-.1],[.8,-3,0,1.06,.95,-.08],[1,0,0,1,1,0]]}
};
Object.assign(AT,{ham:{mo:'shot',pj:'shell',dl:.26,h:12,im:'boom',ic:'#ffb03a'},liz:{mo:'cast2',dl:.22,im:'breath'},mush:{mo:'step',dl:.02,im:'slash',ic:'#dfe6ec'},croc:{mo:'shot',dl:.18,im:'fxhit'},rac:{mo:'hold',dl:.05,im:'zap'},
 owl:{mo:'shot',pj:'gear',dl:.12,im:'star'},fen:{mo:'cast2',pj:'curse',dl:.22,im:'splash'},bear:{mo:'shot',dl:.18,im:'fxhit'},ncat:{mo:'step',dl:.02,im:'xslash'},dove:{mo:'cast2',dl:.1,im:'beam'},mole:{mo:'shot',dl:.24,im:'fxhit'},rabbit:{mo:'shot',pj:'carrot',dl:.14,im:'star'},squirrel:{mo:'shot',pj:'acorn',dl:.16,h:10,im:'star'},frog:{mo:'shot',pj:'drop',dl:.16,h:8,im:'splash'},hedgehog:{mo:'shot',pj:'quill',dl:.13,im:'star'},skunk:{mo:'shot',pj:'scent',dl:.14,h:6,im:'splash'},bluebird:{mo:'shot',pj:'wind',dl:.14,h:4,im:'star'},caterpillar:{mo:'shot',pj:'silk',dl:.16,h:8,im:'star'},beetle:{mo:'shot',pj:'horn',dl:.14,h:3,im:'star'}});
Object.assign(PC,{beetle:'#a86cf0',caterpillar:'#f3d9a8',bluebird:'#4fb8ff',skunk:'#9be05a',hedgehog:'#8a6a4a',frog:'#59bdf5',squirrel:'#c98a4a',rabbit:'#ff8a2e',mole:'#c98a4a',fox:'#c9a03a',peng:'#b98cff',bunny:'#5fae4a',bat:'#8a4fd0',mole:'#ffe9a8'});
Object.assign(MO,{cast2:{r:.42,k:[[0,0,0,1,1,0],[.3,-1.5,0,1,1,0],[.42,2.5,2,1,1,0],[.7,1,0,1,1,0],[1,0,0,1,1,0]]},
 shot:{r:.03,k:[[0,0,0,1,1,0],[.1,-3.5,0,1,1,0],[.4,-1,0,1,1,0],[1,0,0,1,1,0]]},
 step:{r:.42,L:1,k:[[0,0,0,1,1,0],[.25,-1,0,1,1,0],[.42,10,1.5,1,1,0],[.68,10,0,1,1,0],[1,0,0,1,1,0]]},
 hold:{r:.26,k:[[0,0,0,1,1,0],[.24,.5,0,1,1,0],[.32,-3,0,1,1,0],[.6,-1,0,1,1,0],[1,0,0,1,1,0]]}});
MO.sigh={r:.3,k:[[0,0,0,1,1,0],[.4,0,-2,1.08,.9,0],[.7,0,1,.97,1.05,0],[1,0,0,1,1,0]]};
const R2=()=>Math.random()-.5,sr=(s,i)=>{const v=Math.sin(s*99.7+i*12.9898)*43758.5;return v-Math.floor(v)};
function tempArt(){for(const [k,pl,t,n,mo,pj,im] of TEMP){const col=PLANET_COL[pl];
  CH[k]=(c,tt)=>drawTempHero(c,tt,{col,dark:mixc(col,.35),acc:['#ddd','#8ee05a','#5fd0ff','#c58bff','#ffd23e'][t],t,shape:SHAPES[pl]});
  ANIM.push(k);PC[k]=col;AT[k]={mo,pj,dl:.22,h:pj==='rock'||pj==='snow'?18:6,im,ic:col}}}
function fire(k,c,x,y,tx,ty,best){
  if(U[k].pk){const u=U[k],pk=u.pk,cf=pk.cfg,A=u.ani.attack,d0=Math.hypot(tx-x,ty-y)||1,asc=Math.min(1,(c.ncd||9)*.9/A.T),rl=A.rel*asc;c.bT=A.T*asc;c.b=c.bT;c.ax=(tx-x)/d0;c.ay=(ty-y)/d0;c.ad=d0;
    const i=G.cells.indexOf(c),[sx,sy]=sockXY(c,i,u,'attack'),fl=Math.max(.12,Math.hypot(tx-sx,ty-sy)/(cf.projCps*CS)),P=o=>{if(G.fx.length<340)G.fx.push(o)};
    if(u.ml&&(k==='nox'||k==='yeongeopsu'||k==='cheora'||k==='bideung')){const m=(c.tg&&c.tg[0])||best,[ux,uy]=pos(m.p),[sx2,sy2]=sockXY(c,i,u,'attack'),a=Math.atan2(uy-sy2,ux-sx2),L=Math.hypot(ux-sx2,uy-sy2);c.tgT=[rl];
      if(k==='nox'){kpf(pk.slash[0],(sx2+ux)/2,(sy2+uy)/2,Math.max(CS*.9,L*1.15),.28,{s0:.35,ang:a,fo:.45,dl:Math.max(0,rl-.12),add:1});P({k:'seq',imgs:pk.hit,fps:cf.hitFps,w:CS*.95,m,x:ux,y:uy,t:.3,T:.3,dl:rl})}
      else if(k==='cheora'||k==='bideung'){P({k:'root',x1:sx2,y1:sy2+CS*.25,x2:ux,y2:uy,t:.3,T:.3,dl:Math.max(0,rl-.08),cs:k==='bideung'?['#ffb84a','#5fe8e0','#2ab0b8']:['#ffe27a','#3fd6ff','#2aa0d8']});kpf(pk.hit[0],ux,uy,CS*1.2,.26,{s0:.5,fo:.4,dl:rl,add:1});kpf(pk.quake[0],ux,uy,CS*2.1,.32,{s0:.3,a:.8,fo:.35,dl:rl});G.sched.push({t:rl,f:()=>{G.shake=Math.max(G.shake,.12)}})}
      else{P({k:'root',x1:sx2,y1:sy2,x2:ux,y2:uy,t:.38,T:.38,dl:Math.max(0,rl-.16)});kpf(pk.hit[0],ux,uy,CS*1.05,.3,{s0:.5,fo:.5,dl:rl});kpf(pk.spawn[0],ux,uy,CS*1.5,.32,{s0:.4,a:.35,fo:.3,dl:rl})}
      return rl}
    if(u.melee||u.inst){c.tgT=[];for(let j=0;j<stN(c,u);j++){const m=(c.tg&&c.tg[j])||best,[ux,uy]=pos(m.p);if(u.pk&&u.pk.reach){const a=Math.atan2(uy-y,ux-x),L=CS*1.0;P({k:'bimg',imgs:u.pk.reach,x:ux-Math.cos(a)*L,y:uy-Math.sin(a)*L,a,L,w:CS*.95,t:.24,T:.24,dl:Math.max(0,rl-.05)})}if(u.pk&&u.pk.hit)P({k:'seq',imgs:u.pk.hit,fps:cf.hitFps,w:cf.hitW,m,x:ux,y:uy,t:u.pk.hit.length/cf.hitFps,T:u.pk.hit.length/cf.hitFps,dl:rl});else P({k:'star',x:ux+(Math.random()-.5)*6,y:uy+(Math.random()-.5)*6,r:9+u.t*2,t:.14,T:.14,dl:rl,c:u.hc||'#fff3b0'});parts(ux,uy,3,u.hc||'#ffe066',80,2.2,rl);if(u.inst&&!(u.pk&&u.pk.hit))P({k:'ring',x:ux,y:uy,r:14,t:.25,T:.25,c:u.hc||'#fff',dl:rl});c.tgT[j]=rl}return rl}
    c.tgT=[];let mxT=0;for(let j=0;j<stN(c,u);j++){const[ox,oy]=stOff(c,u,j),jx=sx+ox,jy=sy+oy,m=(c.tg&&c.tg[j])||best,[ux,uy]=pos(m.p),fj=Math.max(.12,Math.hypot(ux-jx,uy-jy)/(cf.projCps*CS));
    P({k:'pjimg',imgs:pk.proj,fps:12,x1:jx,y1:jy,x2:ux,y2:uy,m,w:cf.projW,t:fj,T:fj,dl:rl});if(pk.tracer)P({k:'bimg',imgs:pk.tracer,x:jx,y:jy,a:Math.atan2(uy-jy,ux-jx),L:Math.hypot(ux-jx,uy-jy),w:12,t:.16,T:.16,dl:rl});
    if(pk.bfx)P({k:'seq',imgs:pk.bfx,fps:cf.bfxFps||15,w:cf.bfxW||26,x:jx,y:jy,t:pk.bfx.length/(cf.bfxFps||15),T:pk.bfx.length/(cf.bfxFps||15),dl:rl,fl:(c.ax||1)<0?-1:1});
    if(pk.hit)P({k:'seq',imgs:pk.hit,fps:cf.hitFps,w:cf.hitW,m,x:ux,y:uy,t:pk.hit.length/cf.hitFps,T:pk.hit.length/cf.hitFps,dl:rl+fj});else{P({k:'star',x:ux,y:uy,r:12,t:.14,T:.14,dl:rl+fj,c:'#ffd9a0'});parts(ux,uy,4,'#ff8a3c',90,2.4,rl+fj)}c.tgT[j]=rl+fj;mxT=Math.max(mxT,rl+fj)}
    return mxT}
  
}
function motion(c,k){
  const o={ox:0,oy:0,sx:1,sy:1,rot:0};if(U[k].ani){if(U[k].fx)return o;const a=AT[k];if(!a||!MO[a.mo]||!MO[a.mo].L)return o;const L=Math.max(0,(c.ad||40)-16),sm=v=>v*v*(3-2*v);
    if(c.sb>0){const p=1-c.sb/c.sT,e=sm(Math.min(1,p*4))*sm(Math.min(1,(1-p)*6));o.ox=(c.ax||0)*L*e;o.oy=(c.ay||0)*L*e;return o}
    if(!(c.b>0)||!c.bT)return o;const p=1-c.b/c.bT,rp=U[k].ani.attack.rel/U[k].ani.attack.T,e=p<rp?sm(p/rp):sm(1-(p-rp)/(1-rp));o.ox=(c.ax||0)*L*e;o.oy=(c.ay||0)*L*e;return o}
  if(!(c.b>0)||!c.bT)return o;
  const a=AT[k],m=MO[a.mo],K=m.k,p=1-c.b/c.bT,ax=c.ax||0,ay=c.ay||0,sg=ax<0?-1:1;let i=0;while(i<K.length-2&&p>K[i+1][0])i++;
  const A=K[i],B=K[i+1],t=Math.min(1,Math.max(0,(p-A[0])/(B[0]-A[0]))),e=t*t*(3-2*t),v=j=>A[j]+(B[j]-A[j])*e,fs=m.L?Math.min(Math.max((c.ad||40)-30,6),42)/10:a.big?1.7:1,f=v(1)*fs;
  o.ox=ax*f;o.oy=ay*f-v(2);o.sx=v(3);o.sy=v(4);o.rot=v(5)*sg;return o
}
function oc(c,x,y,r,f,ry){c.beginPath();c.ellipse(x,y,r,ry||r,0,0,7);c.fillStyle=f;c.fill();c.lineWidth=2;c.strokeStyle=OUT;c.stroke()}
function starP(c,x,y,r,n,f,lw){c.beginPath();for(let i=0;i<n*2;i++){const a=-Math.PI/2+i*Math.PI/n,q=i%2?r*.42:r;c[i?'lineTo':'moveTo'](x+Math.cos(a)*q,y+Math.sin(a)*q)}c.closePath();c.fillStyle=f;c.fill();c.lineWidth=lw||2;c.lineJoin='round';c.strokeStyle=OUT;c.stroke()}
const FXD={
 pj(c,f,q){const dx=f.x2-f.x1,dy=f.y2-f.y1,x=f.x1+dx*q,y=f.y1+dy*q-f.h*Math.sin(q*Math.PI),ang=Math.atan2(dy-f.h*Math.PI*Math.cos(q*Math.PI),dx),tm=q*f.T;
  c.translate(x,y);
  switch(f.s){
   case'fist':{c.rotate(ang);const g=f.big?1.5:1;c.globalAlpha=.85;for(let i=2;i>=0;i--){c.beginPath();c.arc(-i*7*g,0,(9-i*2)*g,-1.2,1.2);c.arc(-i*7*g-6*g,0,(9-i*2)*g*1.05,1,-1,true);c.closePath();c.fillStyle=i?'rgba(255,120,110,'+(.35-i*.1)+')':'#ff6a6a';c.fill();if(!i){c.lineWidth=2;c.strokeStyle=OUT;c.stroke()}}
     c.beginPath();c.arc(2*g,0,5.5*g,0,7);c.fillStyle='#ffd0d0';c.fill();c.lineWidth=1.6;c.strokeStyle=OUT;c.stroke();break}
   case'horn':{c.rotate(ang);const im=SFX.horn_wave;if(im&&im.complete&&im.naturalWidth){c.globalAlpha=.95;c.drawImage(im,-15,-15,30,30)}else{oc(c,0,0,6,'#d9b3ff')}break}
   case'silk':{c.rotate(q*8);const im=SFX.silk_ball;if(im&&im.complete&&im.naturalWidth){c.drawImage(im,-11,-11,22,22)}else{oc(c,0,0,5,'#fff6e0')}break}
   case'silkbind':{c.rotate(ang);const im=SFX.silk_bind_bolt;if(im&&im.complete&&im.naturalWidth){c.drawImage(im,-16,-16,32,32)}else{oc(c,0,0,7,'#fff6e0')}break}
   case'wind':{c.rotate(ang);const im=SFX.wind_bolt;if(im&&im.complete&&im.naturalWidth){c.globalAlpha=.95;c.drawImage(im,-13,-13,26,26)}else{oc(c,0,0,5,'#bfe9ff')}break}
   case'scent':{c.rotate(ang);const im=SFX.scent_bolt;if(im&&im.complete&&im.naturalWidth){c.globalAlpha=.95;c.drawImage(im,-13,-13,26,26)}else{oc(c,0,0,5,'#9be05a')}break}
   case'quill':c.rotate(ang);c.beginPath();c.moveTo(-8,-2.2);c.lineTo(8,0);c.lineTo(-8,2.2);c.closePath();c.fillStyle='#f6eed8';c.fill();c.lineWidth=1.5;c.strokeStyle=OUT;c.stroke();c.fillStyle='#5a3a22';c.fillRect(-8,-1.4,6,2.8);break;
   case'acorn':{const g=f.big?1.9:1;c.rotate(q*9);if(f.big){c.fillStyle='rgba(255,210,80,.45)';c.beginPath();c.arc(0,0,11,0,7);c.fill()}c.beginPath();c.ellipse(0,1.5*g,4.6*g,5.4*g,0,0,7);c.fillStyle='#b5732e';c.fill();c.lineWidth=1.6;c.strokeStyle=OUT;c.stroke();c.beginPath();c.ellipse(0,-3*g,5.2*g,3*g,0,0,7);c.fillStyle='#6a4026';c.fill();c.stroke();c.beginPath();c.moveTo(0,-6*g);c.lineTo(1*g,-9*g);c.lineWidth=2;c.stroke();break}
   case'carrot':c.rotate(ang);c.beginPath();c.moveTo(-9,-3);c.lineTo(9,0);c.lineTo(-9,3);c.closePath();c.fillStyle='#ff8a2e';c.fill();c.lineWidth=1.6;c.strokeStyle=OUT;c.stroke();c.fillStyle='#5fae4a';for(const r of[-.5,0,.5]){c.save();c.translate(-9,0);c.rotate(r+Math.PI);c.beginPath();c.ellipse(4,0,4.5,1.6,0,0,7);c.fill();c.restore()}if(f.big){c.fillStyle='rgba(255,220,80,.5)';c.beginPath();c.ellipse(-4,0,12,4,0,0,7);c.fill()}break;
   case'gear':{const g=f.big?2.2:1;c.rotate(q*14);if(f.big){c.fillStyle='rgba(120,230,255,.45)';c.beginPath();c.arc(0,0,17,0,7);c.fill()}c.beginPath();for(let i=0;i<16;i++){const a=i*Math.PI/8,r=(i%2?4.5:6.5)*g;c[i?'lineTo':'moveTo'](Math.cos(a)*r,Math.sin(a)*r)}c.closePath();c.fillStyle='#c9a03a';c.fill();c.lineWidth=1.8;c.strokeStyle=OUT;c.stroke();c.fillStyle='#5a3a22';c.beginPath();c.arc(0,0,2*g,0,7);c.fill();break}
   case'bomb':c.rotate(q*9);c.beginPath();c.arc(0,0,5.6,0,7);c.fillStyle='#33303a';c.fill();c.lineWidth=2;c.strokeStyle=OUT;c.stroke();c.fillStyle='#77828f';c.fillRect(-2,-8,4,3.4);c.fillStyle='#ffe033';c.beginPath();c.arc(1,-10,2.2+Math.sin(q*40),0,7);c.fill();break;
   case'seed':c.rotate(ang);c.beginPath();c.moveTo(-6,0);c.quadraticCurveTo(-1,-4.6,6,0);c.quadraticCurveTo(-1,4.6,-6,0);c.fillStyle='#2a2026';c.fill();c.lineWidth=1.8;c.strokeStyle=OUT;c.stroke();c.fillStyle='#8a7a6a';c.fillRect(-2,-.8,5,1.4);break;
   case'radish':c.rotate(q*12);c.beginPath();c.moveTo(-7,0);c.quadraticCurveTo(-2,-6,5,-4.4);c.quadraticCurveTo(8,0,5,4.4);c.quadraticCurveTo(-2,6,-7,0);c.fillStyle='#fff';c.fill();c.lineWidth=2;c.strokeStyle=OUT;c.stroke();c.fillStyle='#6fbf4a';for(const r of[-.5,0,.5]){c.save();c.translate(6,0);c.rotate(r);c.beginPath();c.ellipse(4,0,4,1.6,0,0,7);c.fill();c.stroke();c.restore()}break;
   case'plane':c.rotate(ang);c.beginPath();c.moveTo(9,0);c.lineTo(-8,-6);c.lineTo(-4,0);c.lineTo(-8,6);c.closePath();c.fillStyle='#fff';c.fill();c.lineWidth=2;c.lineJoin='round';c.strokeStyle=OUT;c.stroke();c.lineWidth=1.2;c.beginPath();c.moveTo(-4,0);c.lineTo(9,0);c.stroke();break;
   case'cabb':c.rotate(q*10);oc(c,0,0,6.4,'#a6de72');c.lineWidth=1.4;c.strokeStyle='#5fa040';c.beginPath();c.arc(-2,0,4.4,-1,1);c.moveTo(2,-5);c.quadraticCurveTo(-1,0,2,5);c.stroke();break;
   case'leaf':c.rotate(q*20);c.beginPath();c.moveTo(-8,0);c.quadraticCurveTo(0,-6.5,9,0);c.quadraticCurveTo(0,6.5,-8,0);c.fillStyle='#9be070';c.fill();c.lineWidth=2;c.strokeStyle=OUT;c.stroke();c.lineWidth=1.2;c.strokeStyle='#4f9a3a';c.beginPath();c.moveTo(-6,0);c.lineTo(7,0);c.stroke();break;
   case'rock':c.rotate(q*9);pg2(c,'#9aa3ad',[-3.5,-1,-1,-3.5,3,-2.5,3.5,1.5,0,3.5,-3,2.5]);break;
   case'drop':c.rotate(ang);if(f.big){c.scale(1.9,1.9);c.fillStyle='rgba(120,200,255,.4)';c.beginPath();c.arc(0,0,8,0,7);c.fill()}c.fillStyle='#9fdcff';for(const[bx,r]of[[-10,2],[-15,1.4]]){c.beginPath();c.arc(bx,Math.sin(q*20+bx)*1.5,r,0,7);c.fill()}c.beginPath();c.moveTo(-9,0);c.quadraticCurveTo(-1,-5.5,4,-4);c.arc(2,0,4.5,-1.2,1.2);c.quadraticCurveTo(-1,5.5,-9,0);c.fillStyle='#5ab8f0';c.fill();c.lineWidth=2;c.strokeStyle=OUT;c.stroke();break;
   case'cone':c.rotate(q*13);oc(c,0,0,5.5,'#8a5a32',4.5);c.lineWidth=1.3;c.beginPath();c.moveTo(-4,-1.5);c.lineTo(4,-1.5);c.moveTo(-4,1.5);c.lineTo(4,1.5);c.stroke();c.fillStyle='#ffb03a';c.beginPath();c.arc(6.5,-3,1.8,0,7);c.fill();break;
   case'bolt':c.rotate(ang);c.lineCap='round';c.lineWidth=4.5;c.strokeStyle=OUT;c.beginPath();c.moveTo(-9,0);c.lineTo(4,0);c.stroke();c.lineWidth=2;c.strokeStyle='#c9a56a';c.stroke();pg2(c,'#dfe6ec',[3,-3.2,9,0,3,3.2]);pg2(c,'#e04a3a',[-10,-3,-6,0,-10,3]);break;
   case'snow':oc(c,0,0,4.6,'#ffffff');c.fillStyle='#d5e6f2';c.beginPath();c.arc(1,1.2,2.6,0,7);c.fill();break;
   case'fire':c.rotate(ang);for(const[bx,r,al]of[[-14,2.5,.35],[-9,3.6,.6]]){c.globalAlpha=al;c.fillStyle='#ff7a2e';c.beginPath();c.arc(bx,Math.sin(q*25+bx)*2,r,0,7);c.fill()}c.globalAlpha=1;c.beginPath();c.moveTo(-9,0);c.quadraticCurveTo(-2,-7,4,-5);c.arc(2,0,5.5,-1.1,1.1);c.quadraticCurveTo(-2,7,-9,0);c.fillStyle='#ff7a2e';c.fill();c.lineWidth=2;c.strokeStyle=OUT;c.stroke();c.fillStyle='#ffe066';c.beginPath();c.arc(2.5,0,2.8,0,7);c.fill();break;
   case'shard':c.rotate(ang);for(const[bx,by]of[[-5,-6],[3,0],[-5,6]])pg2(c,'#c8f1ff',[bx-6,by,bx,by-2.6,bx+6,by,bx,by+2.6]);break;
   case'spore':for(let i=0;i<3;i++)oc(c,Math.cos(q*9+i*2.1)*5,Math.sin(q*9+i*2.1)*5,3-i*.4,i%2?'#b074e0':'#9be05a');break;
   case'feather':c.rotate(ang);for(const by of[-4.5,4.5]){c.save();c.translate(0,by);c.rotate(Math.sin(q*14)*.25);pg2(c,'#f4f9fc',[-8,0,-1,-2.6,7,0,-1,2.6]);c.restore()}break;
   case'shell':c.rotate(ang);c.fillStyle='#b8b8c2';for(const[bx,r,al]of[[-18,5,.25],[-12,4,.45]]){c.globalAlpha=al;c.beginPath();c.arc(bx,0,r,0,7);c.fill()}c.globalAlpha=1;c.beginPath();c.moveTo(-6,-4);c.lineTo(2,-4);c.quadraticCurveTo(9,0,2,4);c.lineTo(-6,4);c.closePath();c.fillStyle='#3d3d4a';c.fill();c.lineWidth=2;c.strokeStyle=OUT;c.stroke();c.fillStyle='#ffb03a';c.fillRect(-5,-3,2.4,6);break;
   case'bullet':c.rotate(ang);c.lineCap='round';c.lineWidth=5;c.strokeStyle=OUT;c.beginPath();c.moveTo(-9,0);c.lineTo(1,0);c.stroke();c.lineWidth=2.6;c.strokeStyle='#ffe033';c.stroke();break;
   case'ink':oc(c,0,0,5.2,'#2b2233');oc(c,-6,2.5,2,'#2b2233');oc(c,-4,-4.5,1.6,'#2b2233');c.fillStyle='#6a5a80';c.beginPath();c.arc(-1.5,-1.8,1.4,0,7);c.fill();break;
   case'curse':c.globalAlpha=.35;c.fillStyle='#b8f05a';c.beginPath();c.arc(0,0,9,0,7);c.fill();c.globalAlpha=1;oc(c,0,0,5.2,'#8a4fc0');c.fillStyle='#b8f05a';for(let i=0;i<2;i++){c.beginPath();c.arc(Math.cos(q*16+i*3.14)*8,Math.sin(q*16+i*3.14)*4,1.8,0,7);c.fill()}c.fillStyle='#e9d6ff';c.beginPath();c.arc(-1.4,-1.4,1.6,0,7);c.fill();break;
   case'wave':{c.rotate(ang);const r=(f.big?13:9)*(1+q*.7);c.beginPath();c.arc(-r*.5,0,r,-1.15,1.15);c.arc(-r*.95,0,r*1.02,.85,-.85,true);c.closePath();c.fillStyle=f.c;c.fill();c.lineWidth=2;c.strokeStyle=OUT;c.stroke();break}
  }},
 star(c,f,q){c.globalAlpha=1-q*q;starP(c,f.x,f.y,f.r*(.55+q*.8),4,f.c||'#fff');starP(c,f.x,f.y,f.r*(.3+q*.4),4,'#fff',.01)},
 boom(c,f,q){const e=1-(1-q)*(1-q),R=f.r*(.35+.65*e);c.globalAlpha=1-q*q;c.beginPath();c.arc(f.x,f.y,R,0,7);c.fillStyle=f.c;c.fill();c.lineWidth=2.5;c.strokeStyle=OUT;c.stroke();
  if(q<.6){c.fillStyle='#fff3c0';c.beginPath();c.arc(f.x,f.y,R*.62*(1-q/.6),0,7);c.fill()}},
 smoke(c,f,q){c.globalAlpha=.75*(1-q);c.fillStyle=f.c;c.beginPath();c.arc(f.x+Math.sin(q*5+f.r)*3,f.y-24*q,f.r*(1+q*.9),0,7);c.fill()},
 slash(c,f,q){c.translate(f.x,f.y);c.rotate(f.a+Math.PI/2+(q-.5)*1.6);c.globalAlpha=1-q*q;const r=f.r;c.beginPath();c.arc(0,0,r,-1.25,1.25);c.arc(-r*.5,0,r*1.08,.95,-.95,true);c.closePath();c.fillStyle=f.c;c.fill();c.lineWidth=2;c.strokeStyle=OUT;c.stroke()},
 crack(c,f,q){c.globalAlpha=q<.6?1:1-(q-.6)/.4;const g=Math.min(1,q*5);c.lineCap='round';c.lineJoin='round';
  for(const[lw,col]of[[4,OUT],[1.6,'#8a6a3a']]){c.lineWidth=lw;c.strokeStyle=col;c.beginPath();for(let i=0;i<5;i++){const a=i*1.257+sr(f.sd,i)*.6;let x=f.x,y=f.y;c.moveTo(x,y);for(let j=1;j<=3;j++){const L=6*g,b=a+(sr(f.sd,i*7+j)-.5)*1.1;x+=Math.cos(b)*L;y+=Math.sin(b)*L*.6;c.lineTo(x,y)}}c.stroke()}},
 flake(c,f,q){c.translate(f.x,f.y-10*q);c.rotate(q*2);c.globalAlpha=1-q*q;c.lineCap='round';for(const[lw,col]of[[4.5,OUT],[2,'#fff']]){c.lineWidth=lw;c.strokeStyle=col;c.beginPath();for(let i=0;i<3;i++){const a=i*1.047;c.moveTo(Math.cos(a)*8,Math.sin(a)*8);c.lineTo(-Math.cos(a)*8,-Math.sin(a)*8)}c.stroke()}},
 zap(c,f,q){const dx=f.x2-f.x1,dy=f.y2-f.y1,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,n=Math.max(4,Math.round(L/16)),pts=[[f.x1,f.y1]];
  for(let i=1;i<n;i++){const o=(Math.random()-.5)*14;pts.push([f.x1+dx*i/n+nx*o,f.y1+dy*i/n+ny*o])}pts.push([f.x2,f.y2]);
  c.globalAlpha=1-q*q;c.lineCap='round';c.lineJoin='round';for(const[lw,col]of[[7*(f.w||1),OUT],[4.2*(f.w||1),f.c],[1.6*(f.w||1),'#fff']]){c.lineWidth=lw;c.strokeStyle=col;c.beginPath();pts.forEach((p,i)=>c[i?'lineTo':'moveTo'](p[0],p[1]));c.stroke()}},
 dizzy(c,f,q){c.globalAlpha=q<.7?1:1-(q-.7)/.3;for(let i=0;i<3;i++){const a=q*9+i*2.094;starP(c,f.x+Math.cos(a)*10,f.y+Math.sin(a)*3.5,3.6,5,'#ffe033',1.6)}},
 spike(c,f,q){const g=Math.min(1,q*4),e=1-(1-g)*(1-g);c.globalAlpha=q<.6?1:1-(q-.6)/.4;for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.5,L=(i===2?20:i%2?14:10)*e,bx=f.x+(i-2)*5;pg2(c,i%2?'#e9f8ff':'#a8e2ff',[bx-3.5,f.y,bx+Math.cos(a)*L,f.y+Math.sin(a)*L,bx+3.5,f.y])}},
 cloud(c,f,q){c.globalAlpha=.5*Math.sin(Math.min(1,q*4)*Math.PI/2)*(1-q);c.fillStyle=f.c;c.beginPath();c.arc(f.x+Math.sin(q*4+f.r)*4,f.y-6*q,f.r*(1+q*.7),0,7);c.fill()},
 claw(c,f,q){c.translate(f.x,f.y);c.rotate(f.a+Math.PI/2+.5);c.globalAlpha=1-q*q;const g=Math.min(1,q*3.5);c.lineCap='round';for(const[lw,col]of[[6,OUT],[3.6,'#ff5252'],[1.4,'#fff']]){c.lineWidth=lw;c.strokeStyle=col;c.beginPath();for(const o of[-6,0,6]){c.moveTo(o-3,-13);c.quadraticCurveTo(o+2,-13+13*g,o+3,-13+26*g)}c.stroke()}},
 fl(c,f,q){const x=f.x1+(f.x2-f.x1)*q,y=f.y1+(f.y2-f.y1)*q;c.globalAlpha=1-q*.6;c.fillStyle=q<.35?'#ffe066':q<.7?'#ff9a2e':'#e8452a';c.beginPath();c.arc(x,y,f.r*(.7+q*1.3),0,7);c.fill()},
 splat(c,f,q){const g=Math.min(1,q*7);c.globalAlpha=.85*(q<.5?1:1-(q-.5)/.5);c.fillStyle='#2b2233';c.beginPath();c.arc(f.x,f.y,9*g,0,7);c.fill();for(let i=0;i<7;i++){const a=i*.9+sr(f.sd,i)*.6,d=(8+sr(f.sd,i+9)*9)*g;c.beginPath();c.ellipse(f.x+Math.cos(a)*d,f.y+Math.sin(a)*d*.7,2+sr(f.sd,i+20)*3.2,1.6+sr(f.sd,i+30)*2.2,a,0,7);c.fill()}},
 imp(c,f,q){c.globalAlpha=.4+.6*q;c.strokeStyle=f.c;c.lineWidth=3;c.beginPath();c.arc(f.x,f.y,f.r*(1-q)+2,0,7);c.stroke();c.lineWidth=1.5;c.beginPath();c.arc(f.x,f.y,f.r*(1-q)*.6+1,0,7);c.stroke()},
 beam(c,f,q){const w=1-q;c.lineCap='round';c.globalAlpha=.85*w;for(const[lw,col]of[[13*w+2,f.c],[5*w+1,'#fff']]){c.lineWidth=lw;c.strokeStyle=col;c.beginPath();c.moveTo(f.x1,f.y1);c.lineTo(f.x2,f.y2);c.stroke()}
  c.strokeStyle='#fff';c.lineWidth=1.6;for(let i=0;i<3;i++){const u=(q*2+i/3)%1;c.beginPath();c.ellipse(f.x1+(f.x2-f.x1)*u,f.y1+(f.y2-f.y1)*u,6*w+2,6*w+2,0,0,7);c.stroke()}},
 shk(){}
};
Object.assign(FXD,{
 root(c,f,q){const g=q<.42?q/.42:q<.62?1:Math.max(0,1-(q-.62)/.38),dx=f.x2-f.x1,dy=f.y2-f.y1,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;c.lineCap='round';
  for(let k=0;k<3;k++){const sd=(k-1),ex=f.x1+dx*g+nx*sd*CS*.07,ey=f.y1+dy*g+ny*sd*CS*.07,mx=f.x1+dx*g*.5+nx*sd*CS*.26*g,my=f.y1+dy*g*.5+ny*sd*CS*.26*g;
   for(let s2=0;s2<2;s2++){const w0=(k===1?1:.7)*CS*(s2?.05:.12),w1=w0*.35;c.globalAlpha=Math.min(1,g*2)*(s2?1:.75);c.strokeStyle=f.cs?(s2?(k===1?f.cs[1]:f.cs[2]):f.cs[0]):s2?(k===1?'#8a5426':'#6a3c1a'):'#ffd86a';
    for(let t=0;t<4;t++){const a0=t/4,a1=(t+1)/4,P=u=>[(1-u)*(1-u)*f.x1+2*(1-u)*u*mx+u*u*ex,(1-u)*(1-u)*f.y1+2*(1-u)*u*my+u*u*ey],[x0,y0]=P(a0),[x1,y1]=P(a1);c.lineWidth=(w0+(w1-w0)*a0)+(s2?0:CS*.05);c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke()}}}},
 bimg(c,f,q){const im=f.imgs[Math.floor(q*f.T*14)%f.imgs.length];if(!im||!im.complete||!im.naturalWidth)return;const g=q<.15?q/.15:q>.7?(1-q)/.3:1;c.translate(f.x,f.y);c.rotate(f.a);c.globalAlpha=Math.min(1,g*1.2);const hh=f.w*(.6+.4*g);c.drawImage(im,-f.L*.04,-hh/2,f.L*1.08,hh)},
 tr(c,f,q){c.globalAlpha=(1-q)*.85;c.lineCap='round';c.strokeStyle=f.c;c.lineWidth=f.w*(1-q*.6);c.beginPath();c.moveTo(f.x1,f.y1);c.lineTo(f.x2,f.y2);c.stroke();c.strokeStyle='#fff';c.lineWidth=f.w*.35;c.stroke()},
 vortex(c,f,q){const im=SFX.wind_vortex;if(!im||!im.complete)return;const t=q*f.T,sc=t<.15?.25+.75*(t/.15):1,al=t<.35?1:Math.max(0,1-(t-.35)/.25);c.translate(f.x,f.y);c.rotate(Math.sin(t*40)*.04);c.globalAlpha=.92*al;const w=f.r*2*sc;c.drawImage(im,-w/2,-w*.9,w,w)},
 stink(c,f,q){const im=SFX.stink_ring;if(!im||!im.complete)return;const t=q*f.T,sc=t<.2?.25+.75*(t/.2):1,al=t<.5?1:Math.max(0,1-(t-.5)/.3);c.translate(f.x,f.y);c.scale(1,.62);c.globalAlpha=.9*al;const w=f.r*2.1*sc;c.drawImage(im,-w/2,-w/2,w,w)},
 pjimg(c,f,q){const im=f.imgs[Math.floor((q*f.T)*f.fps)%f.imgs.length];if(!im||!im.complete||!im.naturalWidth)return;const m=f.m;let tx=f.x2,ty=f.y2;if(m&&m.hp>0){[tx,ty]=pos(m.p);f.x2=tx;f.y2=ty}
  const x=f.x1+(tx-f.x1)*q,y=f.y1+(ty-f.y1)*q-(f.h||0)*4*q*(1-q),a=f.h?q*9:Math.atan2(ty-f.y1,tx-f.x1);c.translate(x,y);c.rotate(a);c.drawImage(im,-f.w/2,-f.w/2,f.w,f.w)},
 vseq(c,f,q){const idx=Math.min(f.imgs.length-1,Math.floor((q*f.T)*f.fps)),im=f.imgs[idx];if(!im||!im.complete||!im.naturalWidth)return;const m=f.m;const[x,y]=m?pos(m.p):[f.x,f.y],w=f.w,h=w*im.naturalHeight/im.naturalWidth;c.globalAlpha=q>.8?(1-q)/.2:1;c.drawImage(im,x-w/2,y-h*(f.ay||.94),w,h)},
 scr(c,f,q){const im=f.imgs[0];if(!im||!im.complete||!im.naturalWidth)return;c.globalAlpha=(f.a||.22)*Math.min(1,q/.08,(1-q)/.12);c.drawImage(im,0,0,W,H)},
 kp(c,f,q){const im=f.im;if(!im||!im.complete||!im.naturalWidth)return;const s0=f.s0==null?.6:f.s0,g=s0+(1-s0)*Math.min(1,q/.22),al=(f.a||1)*Math.min(1,q/.08+.25)*(q>(f.fo||.6)?Math.max(0,(1-q)/(1-(f.fo||.6))):1);const m=f.m,[x,y]=m&&m.hp>0?pos(m.p):[f.x,f.y];c.translate(x,y);if(f.ang)c.rotate(f.ang);if(f.fl<0)c.scale(-1,1);if(f.rot)c.rotate(f.rot*q);if(f.add)c.globalCompositeOperation='lighter';c.globalAlpha=al;const w=f.w*g;c.drawImage(im,-w/2,-w*(f.ay||.5),w,w)},
 seq(c,f,q){const idx=Math.min(f.imgs.length-1,Math.floor((q*f.T)*f.fps)),im=f.imgs[idx];if(!im||!im.complete||!im.naturalWidth)return;const m=f.m;const[x,y]=m?pos(m.p):[f.x,f.y];c.translate(x,y);if(f.fl<0)c.scale(-1,1);c.drawImage(im,-f.w/2,-f.w/2,f.w,f.w)},
 fxp(c,f,q){if(!f.im||!f.im.complete)return;const m=f.m;if(!m||m.hp<=0&&q<.5)return;const[tx,ty0]=pos(m.p),ty=ty0+(f.g?8:0),x=f.x1+(tx-f.x1)*q,y=f.y1+(ty-f.y1)*q,a=Math.atan2(ty-f.y1,tx-f.x1);
  c.translate(x,y);c.rotate(a);c.globalAlpha=q<.15?q/.15:1;const w=f.w,hh=w/2;c.drawImage(f.im,-w*.62,-hh/2,w,hh)},
 fxf(c,f,q){if(!f.im||!f.im.complete)return;const m=f.m;const[tx,ty0]=m?pos(m.p):[f.x,f.y],ty=ty0+(f.g?8:0);c.translate(tx,ty);c.globalAlpha=1-q;const w=f.w*(1+q*.3),hh=w/2;c.drawImage(f.im,-w*.5,-hh/2,w,hh)},
 wind(c,f,q){const dx=f.x2-f.x1,dy=f.y2-f.y1,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;c.lineCap='round';c.strokeStyle='#fff';c.lineWidth=2.2;
  for(let i=0;i<3;i++){const u1=Math.min(1,Math.max(0,q*1.5-i*.14)),u0=Math.max(0,u1-.3),o=(i-1)*8;if(u1<=u0)continue;c.globalAlpha=.85*(1-q);c.beginPath();
   for(let k=0;k<=6;k++){const u=u0+(u1-u0)*k/6,w=Math.sin(u*9+i)*3+o,x=f.x1+dx*u+nx*w,y=f.y1+dy*u+ny*w;c[k?'lineTo':'moveTo'](x,y)}c.stroke()}},
 burn(c,f,q){const s=(1-q*.6)*(1+Math.sin(q*40)*.12);c.translate(f.x,f.y+4);c.scale(s,s);c.globalAlpha=q<.7?1:1-(q-.7)/.3;
  c.beginPath();c.moveTo(-6,0);c.bezierCurveTo(-11,-8,-3,-10,-1,-18);c.bezierCurveTo(3,-12,10,-8,6,0);c.closePath();c.fillStyle='#ff7a2e';c.fill();c.lineWidth=2;c.strokeStyle=OUT;c.stroke();
  c.beginPath();c.moveTo(-3,0);c.bezierCurveTo(-5,-5,-1,-6,0,-10);c.bezierCurveTo(3,-6,5,-4,3,0);c.closePath();c.fillStyle='#ffe066';c.fill()},
 jet(c,f,q){const g=Math.min(1,q/.35),h=Math.max(0,(q-.5)/.5),dx=f.x2-f.x1,dy=f.y2-f.y1,x1=f.x1+dx*h,y1=f.y1+dy*h,x2=f.x1+dx*g,y2=f.y1+dy*g,w=Math.sin(q*30)*3;
  c.lineCap='round';for(const[lw,col]of[[9.5,OUT],[6.2,'#59bdf5'],[2.2,'#e3f6ff']]){c.lineWidth=lw;c.strokeStyle=col;c.beginPath();c.moveTo(x1,y1);c.quadraticCurveTo((x1+x2)/2+w,(y1+y2)/2-7,x2,y2);c.stroke()}
  if(g>=1){c.fillStyle='#bfe9ff';c.beginPath();c.arc(x2,y2,5+Math.sin(q*50)*1.5,0,7);c.fill()}},
 bite(c,f,q){const cl=Math.min(1,q/.3),gap=13*(1-cl*cl);c.translate(f.x,f.y);c.globalAlpha=q<.65?1:1-(q-.65)/.35;
  for(const s of[-1,1]){c.beginPath();c.moveTo(-15,s*(gap+11));c.quadraticCurveTo(0,s*(gap+5),15,s*(gap+11));c.lineCap='round';c.lineWidth=8.4;c.strokeStyle=OUT;c.stroke();c.lineWidth=5;c.strokeStyle='#5fae4a';c.stroke();
   for(const x of[-10,-5,0,5,10]){const b=s*(gap+8-Math.abs(x)*.12);c.beginPath();c.moveTo(x-2.8,b);c.lineTo(x,s*gap);c.lineTo(x+2.8,b);c.closePath();c.fillStyle='#fff';c.fill();c.lineWidth=1.6;c.strokeStyle=OUT;c.stroke()}}},
 cloudlet(c,f,q){c.globalAlpha=Math.min(1,q*6)*(q<.7?1:1-(q-.7)/.3);const P=c=>{c.arc(f.x-8,f.y+1,6,0,7);c.moveTo(f.x+7,f.y-2);c.arc(f.x,f.y-2,7.5,0,7);c.moveTo(f.x+15,f.y+1);c.arc(f.x+9,f.y+1,6,0,7)};
  c.beginPath();P(c);c.lineWidth=4.4;c.strokeStyle=OUT;c.stroke();c.beginPath();P(c);c.fillStyle='#7c8498';c.fill();c.fillStyle='#7fd0ff';for(const[dx,ph]of[[-7,0],[1,.4],[8,.7]]){const d=((q*3+ph)%1)*16;c.fillRect(f.x+dx,f.y+8+d,1.8,4)}},
 pow(c,f,q){c.globalAlpha=1-q*q;c.lineCap='round';for(const[lw,col]of[[5.6,OUT],[2.8,'#fff']]){c.lineWidth=lw;c.strokeStyle=col;c.beginPath();for(let i=0;i<8;i++){const a=i*.785+.3,r0=9+q*12,r1=14+q*22;c.moveTo(f.x+Math.cos(a)*r0,f.y+Math.sin(a)*r0);c.lineTo(f.x+Math.cos(a)*r1,f.y+Math.sin(a)*r1)}c.stroke()}}
});
function pg2(c,f,p){c.beginPath();for(let i=0;i<p.length;i+=2)c[i?'lineTo':'moveTo'](p[i],p[i+1]);c.closePath();c.fillStyle=f;c.fill();c.lineWidth=2;c.lineJoin='round';c.strokeStyle=OUT;c.stroke()}
function ic(k,big){const u=U[k];return u.url?'<img class="ic'+(big?' big':'')+'" src="'+u.url+'" alt="">':u.e}

// ---------- 게임 ----------
const MAPK=995/360,W=360,COLS=5,ROWS=6,NC=COLS*ROWS,FX0=178/MAPK,FX1=818/MAPK,FY0=310/MAPK,FY1=1085/MAPK,CS=Math.min((FX1-FX0)/COLS,(FY1-FY0)/ROWS),L=100/MAPK,R=900/MAPK,PW=R-L,CXS=Array.from({length:COLS},(_,i)=>FX0+(FX1-FX0)/COLS*(i+.5)),CYS=Array.from({length:ROWS},(_,j)=>FY0+(FY1-FY0)/ROWS*(j+.5)),GX=CXS[0]-CS/2,GROUND=52/MAPK*CS/56;
for(const k in U){if(typeof U[k].r==='string'&&U[k].r.endsWith('c'))U[k].r=Math.round(parseFloat(U[k].r)*CS+16)}
for(const k in SP){if(typeof SP[k].r==='string'&&SP[k].r.endsWith('c'))SP[k].r=Math.round(parseFloat(SP[k].r)*CS);if(typeof SP[k].len==='string')SP[k].len=Math.round(parseFloat(SP[k].len)*CS);if(typeof SP[k].cr==='string')SP[k].cr=Math.round(parseFloat(SP[k].cr)*CS);if(typeof SP[k].ar==='string')SP[k].ar=Math.round(parseFloat(SP[k].ar)*CS);if(typeof SP[k].seg==='string')SP[k].seg=Math.round(parseFloat(SP[k].seg)*CS)}
for(const k in U){if(typeof U[k].sp==='string')U[k].sp=Math.round(parseFloat(U[k].sp)*CS)}
// 행성 시너지: 필드에 같은 행성의 서로 다른 영웅 3종 / 4종
const PSYN={earth:{x:'치명타'},purmia:{x:'공격속도'},toytopia:{x:'공격력'},gearon:{x:'사거리'},mosaica:{x:'처치 코인'},florasia:{x:'특수기 쿨타임'},mongle:{x:'기본공격 감속'},lumiel:{x:'공격속도 · 특수기 쿨타임'},drakanis:{x:'공격력'},biikseong:{x:'공격속도 · 사거리'},seolryeong:{x:'공격력 · 감속'},haeyeon:{x:'공격력 · 특수기 쿨타임'}};
const PSYN2='그 행성 영웅 공격력 대폭 강화';
const AURA={napoleon:{pcr:.12,x:'아군 치명타 확률 +12%p'},momo:{psl:.6,x:'아군 기본공격에 감속 0.6초'},sporun:{prg:.6,x:'아군 사거리 +0.6칸'},orca:{pas:.25,x:'아군 공격속도 +25%'},seraphine:{pcd:.35,x:'아군 특수기 쿨타임 35% 빨리'},belkaon:{pa:.25,pcd:.15,x:'아군 공격력 +25% · 쿨타임 15% 빨리'},aurielle:{pa:.12,pas:.12,x:'아군 공격력·공격속도 +12%'}};
// ---------- 영웅별 기본공격 개성 (r 사거리칸 · sm 공속배수 · bm 피해배수 · 그 외 특성) ----------
const PV={
 gamer:{bm:.7,nth:{n:3,m:3},x:'3번째 공격마다 불꽃 슬리퍼 3배'},
 veteran:{r:5.5,sm:.6,bm:1.5,cr:.25,cm:2.5,x:'저격수 — 느리지만 강한 한 발, 치명타 25%'},
 napoleon:{bm:.7,x:'상시 오라 — 주변 8칸 아군 치명타 확률 +12%p (돌격 명령)'},
 jir:{bm:.85,bnc:2,bf:.5,x:'찌릿 탄이 근처 2명에게 튐 (50%)'},
 zeus:{bm:.85,nth:{n:4,m:2,r:1.2,af:.6,st:.6},x:'4번째 공격마다 낙뢰 — 주변 1.2칸 + 기절'},
 mole:{r:2.4,bm:.9,sl:1.2,x:'진흙 — 맞은 적 1.2초 감속'},
 alpaca:{bm:.9,vuc:.25,vut:4,x:'침 — 25% 확률로 4초간 받는 피해 증가'},
 orca:{bm:.6,x:'상시 오라 — 주변 8칸 아군 공격속도 +25%'},
 mugyeom:{r:1.6,melee:1,bm:1.1,ramp:[.15,5],x:'근접 — 같은 적을 계속 때리면 피해 +15%씩 (최대 +75%)'},
 hyeonmu:{bm:.8,sp:1,sf:.5,smax:6,sl:.8,x:'지맥 강타 — 적 위치에 충격파: 주변 1칸 최대 6명 50% + 0.8초 감속'},
 pico:{r:1.6,sm:.8,bm:2,x:'근접 — 기본공격이 아주 셈'},
 jacko:{r:1.6,bm:1.1,nth:{n:4,m:1.5,r:.9,af:1},x:'근접 — 4번째 공격마다 스프링 강타 (주변 0.9칸)'},
 bricks:{r:6.5,bm:1.3,bossK:2.5,x:'초장거리 저격 — 보스에게 피해 2.5배'},
 mold:{r:2.4,bm:.9,rtc:.12,rtd:1,x:'찰흙 — 12% 확률로 1초 속박'},
 lunette:{bm:.8,sp:.7,sf:1,smax:4,vuc:.3,vut:3,x:'좁고 강한 범위 — 주변 0.7칸 100%, 30% 확률로 약화'},
 cleanbot:{bm:.8,sp:1.2,sf:.35,smax:8,x:'넓고 약한 범위 — 주변 1.2칸에 35% 튐'},
 deliverybot:{bm:1,coinP:.5,x:'배송비 — 이 영웅이 처치하면 코인 +50%'},
 policebot:{bm:.9,bnc:1,bf:.8,x:'관통 광선 — 뒤의 적 1명도 80%'},
 fortressbot:{sm:.6,bm:1.3,sp:.8,sf:.9,smax:5,x:'좁고 강한 범위 — 느린 포격, 주변 0.8칸 90%'},
 archeon:{r:5,bm:.7,nth:{n:5,m:5},x:'장거리 — 5번째 공격마다 궤도 레이저 5배'},
 orbin:{bm:.9,hi:1.6,x:'흡혈 — 체력 50% 넘는 적에게 피해 1.6배'},
 nero:{bm:1,coinJ:.1,x:'행운 — 처치 시 10% 확률로 코인 5배'},
 vargon:{bm:.8,rng:[.3,2.3],x:'아무거나 — 한 방 피해가 0.3~2.3배로 들쭉날쭉'},
 seraphine:{bm:.6,x:'상시 오라 — 주변 8칸 아군 특수기 쿨타임 35% 빨리'},
 belkaon:{bm:.6,x:'상시 오라 — 주변 8칸 아군 공격력 +25% · 쿨타임 15% 빨리'},
 floret:{bm:.7,dot:.3,dott:3,x:'독 — 3초 동안 초당 30% 지속 피해'},
 sporun:{bm:.6,x:'상시 오라 — 주변 8칸 아군 사거리 +0.6칸'},
 cacton:{r:1.8,bm:.9,exec:3,x:'근접 처형 — 체력 30% 이하 적에게 피해 3배'},
 elderon:{bm:1.2,x:'근접 강타 — 옆에 플로라시아 영웅이 있으면 1.4배'},
 sylvaion:{bm:.8,dot:.25,dott:3,sl:.8,x:'가시 덩굴 — 지속 피해 + 감속'},
 momo:{bm:.6,x:'상시 오라 — 주변 8칸 아군 기본공격에 감속'},
 pulu:{bm:.85,sl:1.5,slx:1.3,x:'감속 구슬 — 1.5초 감속, 감속된 적에게 피해 1.3배'},
 bubon:{r:1.8,bm:1,kbc:.2,kbd:.8,x:'근접 — 20% 확률로 적을 0.8칸 밀침'},
 stella:{sm:1.8,bm:.6,bnc:2,bf:.5,x:'별 구슬 연사 — 공격속도 1.8배, 2명에게 튐'},
 chronel:{bm:.9,st:.08,x:'시간 균열 — 8% 확률로 1초 정지'},
 feather_courier:{bm:.85,sp:.5,sf:.5,smax:2,x:'바람탄 — 맞은 곳 주변 0.5칸 최대 2명에게 50%'},
 feather_archer:{bm:.6,shp:'line',sw:.25,sf2:.4,smax:2,x:'관통 화살 — 표적 뒤 일직선 위 적 최대 2명에게 40%'},
 storm_owl:{bm:1,sp:.9,sf:.6,smax:5,sl:.5,x:'회오리 — 표적 주변 0.9칸 최대 5명에게 60% + 감속'},
 goldwing_commander:{r:2,melee:1,bm:1.05,shp:'cone',sa:50,sf2:.8,smax:6,x:'창 휩쓸기 — 앞쪽 부채꼴 안 적 최대 6명에게 80%'},
 jujak:{bm:.6,sp:.9,sf:.35,smax:6,x:'불꽃 깃털 — 맞은 곳 주변 0.9칸 최대 6명에게 35%'},
 snowkid:{bm:.75,sp:.5,sf:.5,smax:2,sl:.8,x:'눈덩이 — 주변 0.5칸 최대 2명에게 50% + 감속'},
 icicle_bat:{bm:.8,shp:'line',sw:.25,sf2:.5,smax:3,sl:.6,x:'고드름 관통 — 표적 뒤 일직선 위 적 최대 3명에게 50% + 감속'},
 snow_yeti:{r:1.9,melee:1,bm:1.4,shp:'cone',sa:45,sf2:.7,smax:5,sl:.6,x:'주먹 강타 — 앞쪽 부채꼴 안 적 최대 5명에게 70% + 감속'},
 ice_golem:{bm:.8,sp:1,sf:.5,smax:5,sl:.8,x:'얼음 주먹 — 표적 주변 1칸 최대 5명에게 50% + 감속'},
 pearlpunch:{bm:1.2,x:'조개권 — 단일 120%'},
 clawlancer:{bm:1.1,x:'집게창 찌르기 — 단일 110%'},
 coralgiant:{bm:1,sp:.7,sf:.5,x:'산호 강타 — 표적 100% + 주변 0.7칸 적 모두 50%'},
 abyssadmiral:{bm:1,sp:.8,sf:.5,x:'닻 휩쓸기 — 표적 100% + 주변 0.8칸 적 모두 50%'},
 poseidon:{bm:1,shp:'cone',sa:50,sf2:1,x:'삼지창 파도참 — 앞쪽 부채꼴(±50도) 안 모든 적에게 100%'},
 baekho:{r:1.9,melee:1,bm:1,sp:1,sf:.6,smax:6,bossK:1.5,sl:.5,x:'발톱 연격 — 빠른 공격, 주변 1칸 최대 6명에게 60% + 감속, 보스에게 1.5배'},
 noeha:{bm:1.2,shp:'cone',sa:50,sf2:1,x:'뇌조 휩쓸기 — 앞쪽 부채꼴(±50도) 안 모든 적에게 120%'},
 bideung:{bm:1.2,sp:1,sf:1,x:'비등압권 — 표적 위치 반경 1칸 적 모두에게 120% (수 제한 없음)'},
 wolroe:{bm:1.2,shp:'cone',sa:50,sf2:1,x:'월뢰 쌍월참 — 앞쪽 부채꼴(±50도) 안 모든 적에게 120%'},
 cheora:{bm:1.4,sp:1,sf:.714,x:'지맥 분쇄권 — 중심 140%, 주변 1칸 모든 적 100% (수 제한 없음)'},
 astraon:{bm:1.6,bnc:3,bf:.7,bossK:1.25,vu2:3,x:'궤도 심판 — 보스 우선 광선 160%, 근처 3명에게 70%씩 튐, 3초간 받는 피해 +12%'},
 yeongeopsu:{bm:1.6,sp:.75,sf:.5,smax:6,sl2:2,x:'뿌리권 — 160% + 주변 0.75칸 최대 6명에게 50%, 2초 감속'},
 unhwa:{bm:1.6,sp:1,sf:.8,smax:5,x:'검은 행운의 칩 — 160% + 주변 1칸 최대 5명에게 80%'},
 clockweaver:{bm:1.8,sp:1,sf:.7,smax:5,fmk:10,x:'운명의 실침 — 보스 우선 180% + 주변 1칸 최대 5명에게 70%, 10초 운명 표식'},
 nox:{bm:1.7,fmk:8,x:'월아참 — 보스 우선 단일 170%, 8초 운명 표식'},
 yeongwol:{bm:1.5,sp:.8,sf:1,x:'묵월 참선 — 표적과 주변 0.8칸 모든 적 150%'},
 heukjo:{bm:1.4,sp:1,sf:1,x:'흑조의 패 — 표적과 주변 1칸 모든 적 140%'},
 hwangryong:{bm:2.5,sp:1.4,sf:1,smax:8,x:'황천참 — 표적과 주변 1.4칸 최대 8명에게 250%'},
 jinmu:{bm:1.5,sp:1.2,sf:1,smax:6,x:'창천참 — 표적과 주변 1.2칸 최대 6명에게 150%'},
 jeokhwang:{bm:1.8,sp:1,sf:1,smax:6,bossK:1.3,x:'백염조 — 표적과 주변 1칸 최대 6명에게 180%, 보스에게 1.3배'},
 hornkid:{bm:.95,sp:.6,sf:.6,smax:3,x:'불씨 — 맞은 곳 주변 0.6칸 최대 3명에게 60%'},
 fang_lancer:{r:2.4,melee:1,bm:1.05,shp:'line',sw:.35,sf2:.75,smax:5,x:'관통 창 — 표적 뒤 일직선 위 적 최대 5명에게 75%'},
 iron_dragonkin:{bm:1.3,sp:.9,sf:.7,smax:5,x:'지면 충격파 — 표적 주변 0.9칸 최대 5명에게 70%'},
 hongryeon:{r:1.9,melee:1,bm:1.15,shp:'cone',sa:55,sf2:.95,smax:6,x:'도끼 휩쓸기 — 앞쪽 부채꼴 안 적 최대 6명에게 80%'},
 cheongryong:{bm:.9,bnc:5,bf:.9,x:'천뢰 연쇄 — 맞은 적에서 근처 5명에게 번개가 이어짐 (90%)'},
 lulu:{bm:1.4,st:.1,x:'꿈별 — 10% 확률로 1초 잠재움(기절)'},
 miel:{bm:.8,nth:{n:3,m:1.5,r:.9,af:.45},x:'3번째 공격마다 달꽃 다발 — 1.5배 + 주변 0.9칸 45%'},
 noctia:{r:1.6,melee:1,bm:1.9,sp:.6,sf:.5,smax:3,st:.06,x:'근접 망치 — 느리지만 셈, 주변 0.6칸 50% + 6% 확률 기절'},
 aurielle:{bm:.7,x:'상시 오라 — 주변 8칸 아군 공격력·공격속도 +12%'},
 selene:{r:1.8,melee:1,bm:1.1,sp:1.4,sf:.95,smax:8,x:'초승달 대검 — 근접, 주변 1.4칸 최대 8명에게 95%'}};
// 피해·효과 분류 칩 (기본공격 / 특수기)
const TAGC={'단일':'#ff8a8a','범위':'#ffb066','지속':'#7ee08a','연쇄':'#c3a6ff','관통':'#c3a6ff','감속':'#8ccaff','기절':'#8ccaff','속박':'#8ccaff','정지':'#8ccaff','밀치기':'#8ccaff','모으기':'#8ccaff','약화':'#ff9cc6','버프':'#6fe8c8','코인':'#ffd84d','처형':'#ff8a8a','랜덤':'#e9a6ff','근접':'#d6d0c4','원거리':'#d6d0c4','저격':'#d6d0c4'};
const PVT={heukjo:['범위'],yeongwol:['범위'],noeha:['범위'],bideung:['범위'],pearlpunch:['단일'],clawlancer:['단일'],coralgiant:['범위'],abyssadmiral:['범위'],poseidon:['범위'],wolroe:['범위'],cheora:['범위'],nox:['단일','표식'],astraon:['약화','연쇄'],yeongeopsu:['범위','감속'],unhwa:['범위'],clockweaver:['범위','표식'],hwangryong:['범위'],jinmu:['범위'],jeokhwang:['범위'],snowkid:['범위','감속'],icicle_bat:['관통','감속'],snow_yeti:['범위','감속'],ice_golem:['범위','감속'],baekho:['범위','감속'],feather_courier:['범위'],feather_archer:['관통'],storm_owl:['범위','감속'],goldwing_commander:['범위'],jujak:['범위'],hornkid:['범위'],fang_lancer:['관통','범위'],iron_dragonkin:['범위'],hongryeon:['범위'],cheongryong:['연쇄'],hyeonmu:['범위','감속'],lulu:['단일','기절'],miel:['단일','범위'],noctia:['범위','기절'],aurielle:['버프'],selene:['범위'],gamer:['단일'],veteran:['단일'],napoleon:['버프'],jir:['연쇄'],zeus:['단일','범위','기절'],mole:['단일','감속'],alpaca:['단일','약화'],orca:['버프'],mugyeom:['단일'],pico:['단일'],jacko:['단일','범위'],bricks:['단일'],mold:['단일','속박'],lunette:['범위','약화'],cleanbot:['범위'],deliverybot:['단일','코인'],policebot:['관통'],fortressbot:['범위'],archeon:['단일'],orbin:['단일'],nero:['단일','코인'],vargon:['단일','랜덤'],seraphine:['버프'],belkaon:['버프'],floret:['지속'],sporun:['버프'],cacton:['단일','처형'],elderon:['단일'],sylvaion:['지속','감속'],momo:['버프'],pulu:['단일','감속'],bubon:['단일','밀치기'],stella:['연쇄'],chronel:['단일','기절']};
const SPT={heukjo:['범위','연쇄','기절'],yeongwol:['범위','기절'],noeha:['범위','연쇄','기절'],bideung:['범위','밀치기'],pearlpunch:['단일'],clawlancer:['범위'],coralgiant:['범위'],abyssadmiral:['범위','밀치기'],poseidon:['범위','밀치기','감속'],wolroe:['범위','기절'],cheora:['범위','기절'],nox:['범위','표식'],astraon:['범위','기절'],yeongeopsu:['범위','지속','감속'],unhwa:['범위','지원'],clockweaver:['범위','기절'],hwangryong:['범위','기절','지속'],jinmu:['범위','기절','지속'],jeokhwang:['범위','지속'],snowkid:['범위','감속'],icicle_bat:['범위'],snow_yeti:['범위'],ice_golem:['범위','지속','감속'],baekho:['범위','기절'],feather_courier:['범위'],feather_archer:['관통'],storm_owl:['범위','감속'],goldwing_commander:['관통'],jujak:['범위','지속'],hornkid:['범위'],fang_lancer:['범위'],iron_dragonkin:['범위'],hongryeon:['관통','범위'],cheongryong:['범위'],hyeonmu:['범위','지속','감속'],lulu:['단일'],miel:['단일'],noctia:['범위','기절'],aurielle:['범위'],selene:['범위'],gamer:['단일'],veteran:['범위'],napoleon:['단일'],jir:['연쇄'],zeus:['범위','기절'],floret:['지속'],sporun:['버프'],cacton:['처형'],elderon:['범위'],sylvaion:['지속','감속'],cleanbot:['범위','감속'],deliverybot:['단일'],policebot:['관통'],fortressbot:['범위'],archeon:['범위','약화'],momo:['버프'],pulu:['범위','감속'],bubon:['범위','밀치기'],stella:['연쇄'],chronel:['정지'],orbin:['단일'],nero:['단일','코인'],vargon:['랜덤'],seraphine:['버프'],belkaon:['버프','코인'],mole:['범위','감속'],alpaca:['범위','약화'],orca:['버프'],mugyeom:['모으기','기절'],pico:['단일'],jacko:['범위'],bricks:['단일'],mold:['지속','속박'],lunette:['범위','약화']};
function tagH(a){return (a||[]).map(t=>'<span class="tg" style="--c:'+(TAGC[t]||'#ddd')+'">'+t+'</span>').join('')}
function rngTag(k){const u=U[k];return u.melee?'근접':((u.r0||u.r)-16)/CS>=4.9?'저격':'원거리'}
for(const k in PV){const u=U[k],v=PV[k];if(!u)continue;for(const f in v){if(f==='r')u.r=Math.round(v.r*CS+16);else if(f==='sm')u.s*=v.sm;else if(f==='sp')u.sp=Math.round(v.sp*CS);else if(f==='kbd')u.kbd=v.kbd*CS;else if(f==='nth')u.nth=Object.assign({},v.nth,v.nth.r?{r:v.nth.r*CS}:{});else if(f!=='x')u[f]=v[f]}}
// 사거리 축소(v236): 자리 선택이 의미 있게. 원래 사거리는 r0(증강 판정용)
// 특징별 사거리(칸): 근접 짧게, 범위·버프 중간, 단일 원거리 길게, 저격 가장 길게. 원래보다 길어지지는 않음.
const MELEE2=['hyeonmu','iron_dragonkin','ice_golem','vargon']; // 그림이 근접(주먹·발 구르기)인 행성 영웅
for(const k of MELEE2)if(U[k])U[k].melee=1;
function rangeRole(k){const u=U[k],r0=(u.r0-16)/CS,t=PVT[k]||[];if(u.melee||r0<=2)return['근접',1.2];if(r0>=4.9)return['저격',3.2];if(AURA[k])return['버프',1.6];if(u.bnc||t.includes('연쇄'))return['연쇄',1.9];if(t.includes('관통'))return['관통',2];if(u.sp||u.shp||t.includes('범위'))return['범위',1.7];return['단일',2.1]}
if(NO_HOME)for(const k in U)if(U[k].t===0)U[k].hidden=1;
for(const k in U){const u=U[k];if(typeof u.r!=='number')continue;u.r0=u.r;const[rr,b]=rangeRole(k),r0=(u.r0-16)/CS,nr=Math.min(r0,b+.1*u.t);u.rr=rr;u.r=Math.round(nr*CS+16)}
// 근접으로 바뀐 특수조합: 특수기 사거리는 기본 사거리와 따로(녹스는 전장 전체, 영겁수는 예전 2.7칸)
for(const k of ['yeongeopsu','jinmu','jeokhwang','hwangryong','cheora','wolroe','bideung','noeha','coralgiant','abyssadmiral',...MELEE2]){const u=U[k];if(u)u.spR=Math.round(Math.min((u.r0-16)/CS,1.7+.1*u.t)*CS+16)}U.nox.spR=1e5;U.yeongwol.spR=1e5;
let drag=null;let H=1581/MAPK,T=220/MAPK,B=1190/MAPK,PH=B-T,PER=2*(PW+PH),GY=CYS[0]-CS/2,FS=1;let MAXU=NC*3;
// 백수형 사거리 +2칸은 미확정. 기존 200px 유지.
const UIIMG={"btn_summon_normal": __P(1953), "btn_summon_pressed": __P(1954), "btn_summon_disabled": __P(1955), "btn_combine_normal": __P(1956), "btn_combine_pressed": __P(1957), "btn_combine_disabled": __P(1958), "btn_luck_normal": __P(1959), "btn_luck_pressed": __P(1960), "btn_luck_disabled": __P(1961), "btn_upgrade_normal": __P(1962), "btn_upgrade_pressed": __P(1963), "btn_upgrade_disabled": __P(1964), "wave_panel": __P(1965), "enemy_counter_track": __P(1966), "resource_bar": __P(1967), "speed_pill": __P(1968)};
const RINGIMG={"t1_back":__P(1969),"t1_front":__P(1970),"t2_back":__P(1971),"t2_front":__P(1972),"t3_back":__P(1973),"t3_front":__P(1974),"t4_back":__P(1975),"t4_front":__P(1976),"t5_back":__P(1977),"t5_front":__P(1978)};const RING={};
const SFXIMG={};const SFX={};
const FXIMG={};
const FXCFG={bear:{tr:.18,w:46,ground:0},croc:{tr:.18,w:44,ground:0},mole:{tr:.24,w:50,ground:1}};
const MAPIMG=__P(1979);
const ENIMG={"slime_goblin": __P(1980), "mushroom_bandit": __P(1981), "red_bat": __P(1982), "armored_beetle": __P(1983), "crystal_snail": __P(1984), "goblin_captain": __P(1985)};
const ENK=['slime_goblin','mushroom_bandit','red_bat','armored_beetle','crystal_snail','goblin_captain'],ENV=[40,58,36,28,48,44],ENH=[1,.65,1.2,1.9,1.5,1.2];
const JRIMG={"e1":[__P(1986),__P(1987),__P(1988),__P(1989)],"e2":[__P(1990),__P(1991),__P(1992),__P(1993)],"e3":[__P(1994),__P(1995),__P(1996),__P(1997)],"e4":[__P(1998),__P(1999),__P(2000),__P(2001)],"e5":[__P(2002),__P(2003),__P(2004),__P(2005)],"boss":[__P(2006),__P(2007),__P(2008),__P(2009)],"bcast":[__P(2010),__P(2011),__P(2012),__P(2013)],"bfx":[__P(2014),__P(2015),__P(2016),__P(2017)]},JRI={},JRMS=[110,70,120,150,85],JRN=['도르','키릭','바르둠','그롬','베르카'];if(typeof Image!=='undefined')for(const k in JRIMG)JRI[k]=JRIMG[k].map(s=>{const im=new Image();im.src=s;return im});
const V5={"augments/v225/quick_hands":[__P(2018)],"augments/v225/summoner_mastery":[__P(2019)],"augments/v225/boss_bounty":[__P(2020)],"augments/v225/fusion_research":[__P(2021)],"augments/v225/cosmic_training":[__P(2022)],"augments/v225/mana_cycle":[__P(2023)],"augments/v225/weakpoint":[__P(2024)],"augments/v225/overload":[__P(2025)],"augments/v225/transcendence":[__P(2026)],"morph/area":[__P(2027),__P(2028),__P(2029),__P(2030)],"lunette/area":[__P(2031),__P(2032),__P(2033),__P(2034)],"fortressbot/area":[__P(2035),__P(2036),__P(2037),__P(2038)],"status/dot":[__P(2039),__P(2040)],"cacton/execute":[__P(2041),__P(2042),__P(2043),__P(2044)],"orbin/lifedrain":[__P(2045),__P(2046),__P(2047),__P(2048)],"common/critical":[__P(2049),__P(2050),__P(2051),__P(2052)],"common/buff_floor":[__P(2053),__P(2054),__P(2055),__P(2056)],"common/merge":[__P(2057),__P(2058),__P(2059),__P(2060)],"common/cosmic_birth":[__P(2061),__P(2062),__P(2063),__P(2064)],"boss2":[__P(2065),__P(2066),__P(2067),__P(2068),__P(2069),__P(2070),__P(2071),__P(2072)],"boss2/fx/skill":[__P(2073),__P(2074),__P(2075),__P(2076)],"boss3":[__P(2077),__P(2078),__P(2079),__P(2080),__P(2081),__P(2082),__P(2083),__P(2084)],"boss3/fx/skill":[__P(2085),__P(2086),__P(2087),__P(2088)],"bounty":[__P(2089),__P(2090),__P(2091),__P(2092)],"boss4":[__P(2093),__P(2094),__P(2095),__P(2096),__P(2097),__P(2098),__P(2099),__P(2100)],"boss4/fx/skill":[__P(2101),__P(2102),__P(2103),__P(2104)],"boss5":[__P(2105),__P(2106),__P(2107),__P(2108),__P(2109),__P(2110),__P(2111),__P(2112)],"boss5/fx/clock":[__P(2113),__P(2114)],"boss5/fx/ripple":[__P(2115),__P(2116)],"boss6":[__P(2117),__P(2118),__P(2119),__P(2120),__P(2121),__P(2122),__P(2123),__P(2124),__P(2125),__P(2126),__P(2127),__P(2128),__P(2129),__P(2130),__P(2131),__P(2132)],"boss6/fx/skill":[__P(2133),__P(2134),__P(2135),__P(2136)],"boss6/fx/summon":[__P(2073),__P(2074),__P(2075),__P(2076)],"boss6/fx/shield":[__P(2085),__P(2086),__P(2087),__P(2088)],"special_split":[__P(2137),__P(2138),__P(2139),__P(2140)],"special_heal":[__P(2141),__P(2142),__P(2143),__P(2144)],"special_immune":[__P(2145),__P(2146),__P(2147),__P(2148)],"split_small":[__P(2149),__P(2150)],"special_heal/fx/heal":[__P(2151),__P(2152)],"special_immune/fx/immune":[__P(2153),__P(2154)],"cutins/boss1":[__P(2155)],"cutins/boss2":[__P(2156)],"cutins/boss3":[__P(2157)],"cutins/boss4":[__P(2158)],"cutins/boss5":[__P(2159)],"cutins/boss6":[__P(2160)],"meteor/icon":[__P(2161)],"time_stop/icon":[__P(2162)],"gold_rain/icon":[__P(2163)],"blessing/icon":[__P(2164)],"thunder/icon":[__P(2165)],"judgement/icon":[__P(2166)],"meteor/projectile":[__P(2167)],"meteor/impact":[__P(2168),__P(2169),__P(2170),__P(2171)],"gold_rain/fx":[__P(2172),__P(2173),__P(2174),__P(2175)],"blessing/fx":[__P(2176),__P(2177),__P(2178),__P(2179)],"thunder/fx":[__P(2180),__P(2181),__P(2182)],"judgement/fx":[__P(2183),__P(2184),__P(2185),__P(2186)],"time_stop/fx":[__P(2187)],"augments/silver/01":[__P(2188)],"augments/silver/02":[__P(2189)],"augments/silver/03":[__P(2190)],"augments/silver/04":[__P(2191)],"augments/silver/05":[__P(2192)],"augments/silver/06":[__P(2193)],"augments/silver/07":[__P(2194)],"augments/silver/08":[__P(2195)],"augments/silver/09":[__P(2196)],"augments/silver/10":[__P(2197)],"augments/silver/11":[__P(2198)],"augments/silver/12":[__P(2199)],"augments/silver/13":[__P(2200)],"augments/silver/14":[__P(2201)],"augments/silver/15":[__P(2202)],"augments/silver/16":[__P(2203)],"augments/silver/17":[__P(2204)],"augments/silver/18":[__P(2205)],"augments/gold/01":[__P(2206)],"augments/gold/02":[__P(2207)],"augments/gold/03":[__P(2208)],"augments/gold/04":[__P(2209)],"augments/gold/05":[__P(2210)],"augments/gold/06":[__P(2211)],"augments/gold/07":[__P(2212)],"augments/gold/08":[__P(2213)],"augments/gold/09":[__P(2214)],"augments/gold/10":[__P(2215)],"augments/gold/11":[__P(2216)],"augments/gold/12":[__P(2217)],"augments/gold/13":[__P(2218)],"augments/gold/14":[__P(2219)],"augments/gold/15":[__P(2220)],"augments/gold/16":[__P(2221)],"augments/gold/17":[__P(2222)],"augments/prism/01":[__P(2223)],"augments/prism/02":[__P(2224)],"augments/prism/03":[__P(2225)],"augments/prism/04":[__P(2226)],"augments/prism/05":[__P(2227)],"augments/prism/06":[__P(2228)],"augments/prism/07":[__P(2229)],"augments/prism/08":[__P(2230)],"augments/prism/09":[__P(2231)],"augments/prism/10":[__P(2232)],"augments/prism/11":[__P(2233)],"random_box/closed":[__P(2234)],"random_box/open":[__P(2235)],"random_box/shard":[__P(2236)],"random_box/blank":[__P(2237)],"lottery/background":[__P(2238)],"cards/skill_reward":[__P(2239)],"lottery/jack":[__P(2240)],"lottery/x20":[__P(2241)],"lottery/stone":[__P(2242)],"lottery/x5":[__P(2243)],"lottery/x2":[__P(2244)],"lottery/x1":[__P(2245)],"cards/silver":[__P(2246)],"cards/gold":[__P(2247)],"cards/prism":[__P(2248)],"synergy/off":[__P(2249)],"synergy/1":[__P(2250)],"synergy/2":[__P(2251)]},V5I={};if(typeof Image!=='undefined')for(const k in V5)V5I[k]=V5[k].map(s=>{const im=new Image();im.src=s;return im});
const AUGIMGN={"augments/silver/01": "삼총사", "augments/silver/02": "근접 본능", "augments/silver/03": "저격 본능", "augments/silver/04": "서리 길", "augments/silver/05": "첫 소환 무료", "augments/silver/06": "이자", "augments/silver/07": "잭팟 사냥", "augments/silver/08": "환불 전문가", "augments/silver/09": "날카로운 눈", "augments/silver/10": "맹독", "augments/silver/11": "파편", "augments/silver/12": "종잣돈", "augments/silver/13": "네잎클로버", "augments/silver/14": "현상금 사냥꾼", "augments/silver/15": "복권 중독", "augments/silver/16": "판 공사 할인", "augments/silver/17": "행성 후원", "augments/silver/18": "미션 마스터", "augments/gold/01": "제압 사냥", "augments/gold/02": "동상", "augments/gold/03": "연쇄 폭발", "augments/gold/04": "행성 결속", "augments/gold/05": "쌍둥이", "augments/gold/06": "지름길", "augments/gold/07": "우주 가속", "augments/gold/08": "연타 리듬", "augments/gold/09": "사신", "augments/gold/10": "도탄", "augments/gold/11": "확장 오라", "augments/gold/12": "오라 증폭", "augments/gold/13": "백병전", "augments/gold/14": "충격탄", "augments/gold/15": "무지개 연합", "augments/gold/16": "풀뿌리", "augments/gold/17": "용 사냥", "augments/prism/01": "신의 눈", "augments/prism/02": "쌍둥이 소환", "augments/prism/03": "보스 사냥꾼", "augments/prism/04": "탐욕", "augments/prism/05": "메아리", "augments/prism/06": "우주의 축복", "augments/prism/07": "만석", "augments/prism/08": "진화", "augments/prism/09": "시간 왜곡", "augments/prism/10": "가격 동결", "augments/prism/11": "선택의 기로","augments/v225/quick_hands":"재빠른 손","augments/v225/summoner_mastery":"소환사 숙련","augments/v225/boss_bounty":"보스 현상금","augments/v225/fusion_research":"융합 연구","augments/v225/cosmic_training":"우주 단련","augments/v225/mana_cycle":"마나 순환","augments/v225/weakpoint":"약점 포착","augments/v225/overload":"과부하","augments/v225/transcendence":"초월"};
const JB={1:{n:'카록스',nick:'선봉대장',sk:'적색 질주',cd:8},2:{n:'나르굴',nick:'군단의 문을 여는 자',sk:'군단 호출',cd:12},3:{n:'두르간',nick:'검은 철벽의 장군',sk:'철벽 전개',cd:14},4:{n:'벨사르',nick:'침묵의 사제',sk:'침묵의 족쇄',cd:13},5:{n:'티크론',nick:'시간 약탈자',sk:'멎어 버린 초침',cd:15},6:{n:'제르칸',nick:'제륵의 군주',sk:'왕좌의 해방',cd:11}};
function bossKind(w){return [1,2,3,4,6,5][(Math.floor(w/10)-1)%6]}
const AREAFX={cleanbot:'morph/area',lunette:'lunette/area',fortressbot:'fortressbot/area'};
const USKI={meteor:'meteor/icon',tstop:'time_stop/icon',gold:'gold_rain/icon',bless:'blessing/icon',thunder:'thunder/icon',judge:'judgement/icon'};
const LOTI={'🦸':'lottery/jack','7️⃣':'lottery/x20','🍀':'lottery/stone','👑':'lottery/x5','💎':'lottery/x2','💰':'lottery/x1'};
function v5u(k,i){const l=V5[k];return l&&l[i||0]||''}
function v5img(k,cls,st){const u=v5u(k);return u?'<img'+(cls?' class="'+cls+'"':'')+' src="'+u+'" alt=""'+(st?' style="'+st+'"':'')+'>':''}
function augIcon(k){if(!AUG[k])return '';if(AUG[k].ik===undefined){AUG[k].ik=Object.keys(AUGIMGN).find(q=>AUGIMGN[q]===AUG[k].n)||''}return AUG[k].ik}
function fxs(k,x,y,w,o){const l=V5I[k];if(!l||G.fx.length>300)return;const fps=(o&&o.fps)||12,T=(o&&o.T)||l.length/fps;G.fx.push(Object.assign({k:'seq',imgs:l,fps,w,x,y,t:T,T,dl:0},o||{}))}
function fxv(k,x,y,w,o){const l=V5I[k];if(!l||G.fx.length>300)return;const fps=(o&&o.fps)||12,T=(o&&o.T)||l.length/fps;G.fx.push(Object.assign({k:'vseq',imgs:l,fps,w,x,y,t:T,T,dl:0},o||{}))}
function v5i(k,i){const l=V5I[k];if(!l||!l.length)return null;const im=l[((i|0)%l.length+l.length)%l.length];return im&&im.complete&&im.naturalWidth?im:null}
const JRMIX=[[1,[1,0,0,0,0]],[5,[1,0,0,0,0]],[8,[.8,.2,0,0,0]],[15,[.5,.3,.2,0,0]],[25,[.3,.25,.25,.2,0]],[35,[.2,.2,.2,.25,.15]],[45,[.1,.2,.2,.25,.25]]];
function jrKind(w){let a=JRMIX[0],b=JRMIX[JRMIX.length-1];for(let i=0;i<JRMIX.length-1;i++)if(w>=JRMIX[i][0]&&w<=JRMIX[i+1][0]){a=JRMIX[i];b=JRMIX[i+1];break}const t=b[0]>a[0]?Math.min(1,Math.max(0,(w-a[0])/(b[0]-a[0]))):1,p=a[1].map((v,i)=>v+(b[1][i]-v)*t);let r=Math.random()*p.reduce((x,y)=>x+y,0);for(let i=0;i<5;i++){r-=p[i];if(r<0)return i}return 0}
const cv=document.getElementById('cv'),cx=cv.getContext('2d');
let dpr=Math.min(window.devicePixelRatio||1,2);cx.imageSmoothingEnabled=true;cx.imageSmoothingQuality='medium';
const $=id=>document.getElementById(id);
let G,speed=1,running=false,last=0;

// ---- 지형(길 모양) — 50웨이브마다 바뀜 ----
const TERR_ON=1; // 지형 변화(0이면 끔)
const TMAP={mid:__P(2252),u:__P(2253),rev:__P(2254)},TCUT=__P(2255),TARW=__P(2256),TIMG={};
function timg(k){if(!TMAP[k])return null;if(!TIMG[k]){const im=new Image();im.src=TMAP[k];TIMG[k]=im}return TIMG[k].complete&&TIMG[k].naturalWidth?TIMG[k]:null}
let TARI=null;
const TERR=[{k:'sq',n:'네모 길',d:'바깥을 한 바퀴'},{k:'rev',n:'거꾸로 길',d:'반대 방향으로 한 바퀴'},{k:'mid',n:'日자 길',d:'가운데 줄을 가로지름 — 그 줄 칸은 막힘'},{k:'u',n:'U자 길',d:'가운데 세로줄을 지나감 — 그 줄 칸은 막힘'}];
let PATHS=[[L,T],[R,T],[R,B],[L,B],[L,T]],PCUM=[0,PW,PW+PH,2*PW+PH,PER],PLOOP=1,BLK=new Set();
function terrDef(k){const xm=CXS[2],ym=CYS[2];
  if(k==='rev')return{pts:[[L,T],[L,B],[R,B],[R,T]],loop:1,blk:[]};
  if(k==='mid')return{pts:[[L,T],[R,T],[R,ym],[L,ym],[L,B],[R,B]],loop:0,blk:[10,11,12,13,14]};
  if(k==='u')return{pts:[[L,T],[L,B],[xm,B],[xm,T],[R,T],[R,B]],loop:0,blk:[2,7,12,17,22,27]};
  return{pts:[[L,T],[R,T],[R,B],[L,B]],loop:1,blk:[]}}
function terrFits(i){const bl=new Set(terrDef(TERR[i].k).blk);let need=0,free=0;G.cells.forEach((q,j)=>{if(bl.has(j)){if(q)need++}else if(!q)free++});return need<=free}
function setTerrain(i,anim){const d=terrDef(TERR[i].k),P=d.pts.slice();if(d.loop)P.push(P[0]);const C=[0];for(let j=1;j<P.length;j++)C.push(C[j-1]+Math.hypot(P[j][0]-P[j-1][0],P[j][1]-P[j-1][1]));
  const oldPER=PER;PATHS=P;PCUM=C;PLOOP=d.loop;PER=C[C.length-1];BLK=new Set(d.blk);_PD=null;MAXU=(NC-BLK.size)*3;
  if(!G)return;G.terr=i;for(const m of G.mobs){m.p=((m.p%oldPER)+oldPER)%oldPER/oldPER*PER}
  if(!G.tile)G.tile=[];const TL=G.tile,mv=[],sold=[];
  const val=q=>Math.pow(4,U[q.u].t)*q.n*(q.k||1)*(q.lk?50:1)*(U[q.u].t>=4?100:1);
  const freeCells=()=>{const RO=ringOrd(),e=[];G.cells.forEach((q,j)=>{if(!q&&!BLK.has(j))e.push(j)});e.sort((x,y)=>RO[x]-RO[y]);return e};
  const moveTo=(b,j)=>{G.cells[j]=G.cells[b];G.cells[b]=null;G.cells[j].pop=.3;const t=TL[j]||0;TL[j]=TL[b]||0;TL[b]=t};
  for(const b of [...BLK]){let c=G.cells[b];if(!c)continue;
    let e=freeCells();if(e.length){moveTo(b,e[0]);mv.push(U[c.u].n);continue}
    const t=G.cells.findIndex((q,j)=>q&&j!==b&&!BLK.has(j)&&q.u===c.u&&U[q.u].t<4&&!q.k&&q.n+c.n<=3);if(t>=0){G.cells[t].n+=c.n;G.cells[b]=null;mv.push(U[c.u].n);continue}
    // 자리가 정말 없으면: 필드에서 가장 싼 칸(낮은 등급·적은 수, 잠금·우주는 마지막)을 통째로 팔고 그 자리로
    let ch=-1,bv=1e99;G.cells.forEach((q,j)=>{if(q&&(!BLK.has(j)||j===b)){const v=val(q);if(v<bv){bv=v;ch=j}}});
    if(ch>=0){const nm=U[G.cells[ch].u].n,s0=G.sel;G.tSell=1;for(let g=0;g<30&&G.cells[ch];g++){G.sel=ch;sell()}G.tSell=0;G.sel=s0===ch?null:s0;sold.push(nm);
      if(ch!==b&&!G.cells[ch]&&G.cells[b]){moveTo(b,ch);mv.push(U[c.u].n)}if(!G.cells[b])continue}
    BLK.delete(b)} // 그래도 안 되면 칸을 막지 않음
  // 막힌 칸에 남은 판 강화는 빈 일반 칸(강화 낮은 곳)으로 옮김
  for(const b of BLK){const lv=TL[b]||0;if(!lv)continue;let best=-1,bl=99;for(let j=0;j<NC;j++){if(BLK.has(j))continue;const l=(TL[j]||0)+(G.cells[j]?.5:0);if(l<bl){bl=l;best=j}}if(best>=0&&(TL[best]||0)<lv){const t=TL[best]||0;TL[best]=lv;TL[b]=t}}
  if(sold.length)setTimeout(()=>toast('💸 자리가 모자라 가장 싼 영웅 판매: '+sold.join(', ')),900);else if(mv.length)setTimeout(()=>toast('↪ 길이 된 칸의 영웅 '+mv.length+'명을 빈 칸으로 옮겼어요'),900);
  MAXU=(NC-BLK.size)*3;_PD=null;
  if(G.sel!==null&&BLK.has(G.sel))G.sel=null;
  if(anim){G.flash=Math.max(G.flash||0,.5);G.shake=Math.max(G.shake,.6);G.terrBan=2.6;toast('🗺️ 지형 변화! '+TERR[i].n+' — '+TERR[i].d);const tc=$('terrCut');if(tc){tc.innerHTML='<img src="'+TCUT+'" alt=""><b>지형 변화!</b><small>'+TERR[i].n+'</small>';tc.classList.remove('on');void tc.offsetWidth;tc.classList.add('on')}}refresh()}
function pos(p){p=((p%PER)+PER)%PER;const C=PCUM,P=PATHS;let j=1;while(j<C.length-1&&C[j]<p)j++;const a=P[j-1],b=P[j],sl=C[j]-C[j-1]||1,f=(p-C[j-1])/sl;return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f]}
function drawTerrain(){const k=TERR[(G&&G.terr)||0].k;if(k==='sq')return;const P=PATHS,rw=(FX0-L)*1.7,MI=timg(k);
  cx.save();cx.lineJoin='round';cx.lineCap='round';
  if(!MI&&k!=='rev'){cx.beginPath();P.forEach((q,j)=>j?cx.lineTo(q[0],q[1]):cx.moveTo(q[0],q[1]));cx.strokeStyle='#cdbf96';cx.lineWidth=rw+6;cx.stroke();cx.strokeStyle='#4b4e5e';cx.lineWidth=rw;cx.stroke();cx.strokeStyle='rgba(255,255,255,.06)';cx.lineWidth=rw*.5;cx.stroke()}
  // 방향 화살표
  if(!TARI){TARI=new Image();TARI.src=TARW}cx.fillStyle='rgba(255,230,140,.55)';const st=CS*1.6,off=(performance.now()/40)%st,ai=TARI.complete&&TARI.naturalWidth?TARI:null;cx.globalAlpha=.55;for(let q=off+CS*.5;q<PER-CS*.3;q+=st){const[a,b]=pos(q),[c2,d2]=pos(q+2),an=Math.atan2(d2-b,c2-a);cx.save();cx.translate(a,b);cx.rotate(an);if(ai)cx.drawImage(ai,-CS*.2,-CS*.2,CS*.4,CS*.4);else{cx.beginPath();cx.moveTo(6,0);cx.lineTo(-4,-5);cx.lineTo(-1,0);cx.lineTo(-4,5);cx.closePath();cx.fill()}cx.restore()}cx.globalAlpha=1;
  // 도착형: 출구에 ❤️ 표시, 두 번째 입구 표시
  if(G&&G.zm==='arrive'){const t=performance.now()/400,[ex,ey]=pos(PER-2);cx.save();cx.globalAlpha=.75+.25*Math.sin(t);cx.fillStyle='rgba(255,60,90,.35)';cx.strokeStyle='#ff5a7a';cx.lineWidth=3;cx.beginPath();cx.arc(ex,ey,CS*.42,0,7);cx.fill();cx.stroke();cx.globalAlpha=1;cx.font='bold '+Math.round(CS*.26)+"px 'Jua',sans-serif";cx.textAlign='center';cx.textBaseline='middle';cx.lineWidth=3;cx.strokeStyle='#2a1d14';cx.strokeText('❤️ 출구',ex,ey-CS*.55);cx.fillStyle='#ffd0da';cx.fillText('❤️ 출구',ex,ey-CS*.55);
    const ent=[0].concat(G.zent?[G.ent2]:[]);ent.forEach((p0,k)=>{const[sx,sy]=pos(p0+2);cx.fillStyle='rgba(150,90,255,.35)';cx.strokeStyle='#c49bff';cx.beginPath();cx.arc(sx,sy,CS*.36,0,7);cx.fill();cx.stroke();cx.strokeStyle='#2a1d14';cx.strokeText('입구'+(G.zent?k+1:''),sx,sy-CS*.48);cx.fillStyle='#e8d8ff';cx.fillText('입구'+(G.zent?k+1:''),sx,sy-CS*.48)});cx.restore()}
  if(!PLOOP&&!MI){const[ex,ey]=P[P.length-1],t=performance.now()/500;cx.fillStyle='rgba(120,60,200,.85)';cx.strokeStyle='#d6b3ff';cx.lineWidth=2;cx.beginPath();cx.arc(ex,ey,rw*.42,0,7);cx.fill();cx.stroke();cx.strokeStyle='rgba(255,255,255,.7)';cx.beginPath();cx.arc(ex,ey,rw*.25,t,t+4);cx.stroke()}
  cx.restore()}
function cellXY(i){return[CXS[i%COLS],CYS[Math.floor(i/COLS)]]}
let HP_G=1.13;function hpEase(w){return w<=30?4-3*Math.pow((w-1)/29,.7):Math.max(.5,1-.45*(w-30)/70)*(w>60?Math.pow(.975,w-60)*(w>100?Math.pow(.99,w-100):1):1)}/* 초반 단단하게, 30웨이브 이후 완만하게 */function mobHP(w){return Math.round(.7*(60+40*Math.pow(w,1.4))*Math.pow(HP_G,w)*hpEase(w))}
function bossMul(w){return 25*Math.pow(.978,Math.max(0,w-20))}
function isBoss(w){return w%10===0}
function reset(){
  G={upPlanet:{},runKills:{},tile:Array(NC).fill(0),tileN:0,cells:Array(NC).fill(null),mobs:[],fx:[],pend:[],sched:[],coins:NO_HOME?Math.round(100*HOME_COST):100,stones:0,wave:0,waveT:0,spawnLeft:0,spawnT:0,summons:0,up:[0,0,0],luck:0,sel:null,over:false,kills:0,time:0,shake:0,flash:0,buff:0,hp:HP_MAX,ovT:0,zi:-1,zm:'loop',prep:0,orb:{},autoS:autoInit()};
  setTerrain(0);nextWave();refresh();
}
function total(){return G.cells.reduce((a,c)=>a+(c?c.n:0),0)}
function cost(){if(G.freeT>0||G.freeN>0||(G.free&&A('freebie')))return 0;return Math.max(1,Math.round((NO_HOME?HOME_COST:1)*(A('titan')?1.3:1)*((12+(A('freeze')&&G.frzS!=null?G.summons-Math.min(15,G.summons-G.frzS):G.summons))*COST_K+4)*(G.bn?G.bn.cost:1)))}
let COST_K=3.2,HERO_POW=2.2,CRAFT_C0=350,CRAFT_STEP=200,CRAFT_GROW=1,TIER_POW=[1.7,1.6,1.7,1.6,2.0]; // 소환 비싸게, 집~우주 전부 강하게, 우주 조합은 갈수록 크게 비싸짐 // 소환 비싸게 + 영웅 강하게 (판에 덜 깔리게)
// v305 경제 증강 하향. EC=현재 값(window.ECO_OLD면 이전 값 — 측정용). G.eco[증강]={add:추가로 번 코인, save:아낀 코인, st:행운석}
const ECO_NEW={int:.05,intC:[150,15],seed0:[200,10],seedW:[10,1],sup:3,jpP:.03,jpX:8,bnt:1.25,mid:1.4,midSt:2,gold:1.3,greed:1.6,bg:2,bgSt:1,lotto:1.3,tile:.7,cf:.75,fus:.7,sp:.7,ref:1.3,kCap:2.2,floor:.5};
const ECO_OLD0={int:.1,intC:[500,50],seed0:[300,20],seedW:[20,2],sup:5,jpP:0,jpX:12,bnt:1.3,mid:1.6,midSt:1,gold:1.5,greed:2,bg:3,bgSt:2,lotto:1.5,tile:.6,cf:.7,fus:.6,sp:.6,ref:1.5,kCap:99,floor:0};
const EC=(typeof window!=='undefined'&&window.ECO_OLD)?ECO_OLD0:ECO_NEW;
function eco(k,v,f){if(!G||!v)return;G.eco=G.eco||{};const o=G.eco[k]=G.eco[k]||{add:0,save:0,st:0};o[f||'add']+=v}
function disc(base,mul,k){const c=Math.max(base*EC.floor,base*mul);if(mul<1)G._dk=[k,base-c];return Math.round(c)}  // 할인 하한: 원가의 50%
function paid(c){if(G._dk){eco(G._dk[0],G._dk[1],'save');G._dk=null}}
function killCoin(w){return Math.round((4+Math.floor(w/5))*(G.bn?G.bn.coin:1)*(G.plOn&&G.plOn.mosaica>0?1.3:1))}
// 처치 코인 배율(증강·세트) 합계 상한 EC.kCap. 증강별 몫은 로그 비율로 나눠 기록
function killMul(){const L=[];if(A('greed'))L.push(['greed',EC.greed]);if(A('bounty'))L.push(['bounty',EC.bnt]);if(A('midas'))L.push(['midas',EC.mid]);if(SO('gold'))L.push(['set_gold',EC.gold]);let m=L.reduce((a,x)=>a*x[1],1);m=Math.min(m,EC.kCap);return {m,L}}
function killPay(b){const K=killMul(),tot=Math.round(b*K.m);G.coins+=tot;G.ecoKill=(G.ecoKill||0)+b;if(K.L.length){const ex=tot-b,lg=K.L.reduce((a,x)=>a+Math.log(x[1]),0);for(const x of K.L)eco(x[0],ex*Math.log(x[1])/lg)}
  if(A('jackpot')&&EC.jpP&&Math.random()<EC.jpP){const j=b*(EC.jpX-1);G.coins+=j;eco('jackpot',j)}return tot}
const PITY_N=40; // 행성 등급 없이 40번 소환하면 다음은 행성 등급 확정
const LUCK_MAX=30;
function odds(){const n=Math.min(G.luck,10)+.5*Math.max(0,G.luck-10),w=[1,.09+.06*n,.018+.02*n,.003+.004*n],t=w[0]+w[1]+w[2]+w[3];if(NO_HOME){w[1]+=w[0];w[0]=0}return w.map(v=>v/t*100)}
function rnd(a){return a[Math.floor(Math.random()*a.length)]}
function place(id){
  if(autoTo(id))return true;
  let at=-1;
  if(U[id].t<4)for(let i=0;i<NC;i++){const c=G.cells[i];if(c&&c.u===id&&c.n<3&&!c.lk){c.n++;c.pop=.25;at=i;if(c.n===3)hint3(id);break}}
  if(at<0){const e=[];G.cells.forEach((c,i)=>{if(!c&&!BLK.has(i))e.push(i)});if(!e.length)return false;const RO=ringOrd();e.sort((a,b)=>RO[a]-RO[b]);at=e[0];G.cells[at]={u:id,n:1,cd:0,b:0,pop:.25,ax:0,ay:0,sc:SP[id]?SP[id].cd:0}}
  const t=U[id].t,[x,y]=cellXY(at);
  parts(x,y,6+t*5,TC[t],70+t*25,2.5+t*.5);
  if(t>=1)G.fx.push({k:'ring',x,y,r:26+t*16,t:.4,T:.4,c:TC[t]});
  if(t>=3){G.shake=.35;G.flash=.3;G.fx.push({k:'ray',x,y,t:.8,T:.8,c:TC[t]})}
  return true
}
function readyCells(){const r=[];G.cells.forEach((c,i)=>{if(c&&!c.lk&&c.n===3&&U[c.u].t<3&&BY[U[c.u].t+1].length&&autoOK(c.u,3))r.push(i)});return r}
function mergeAll(){if(G.over)return;let n=0;for(let g=0;g<60;g++){const r=readyCells();if(r.length){G.sel=r[0];merge();n++;continue}const o=orbReady();if(!o.length)break;if(orbMerge(o[0],true))n++;else break}G.sel=null;if(n)toast('일괄 승급 '+n+'회!');refresh()}
function hint3(id){if(U[id].t>=3||!BY[U[id].t+1].length)return;G.h3=(G.h3||0)+1;if(G.h3<=3)setTimeout(()=>toast('3명 모였어요! 칸을 눌러 ▲승급'),50)}
function fmt(d){const f=(v,u)=>(v>=100?Math.round(v):+v.toFixed(1))+u;return d>=1e12?f(d/1e12,'조'):d>=1e8?f(d/1e8,'억'):d>=1e4?f(d/1e4,'만'):''+Math.round(d)}
function parts(x,y,n,c,v,r,dl){if(G.fx.length>260)return;for(let j=0;j<n;j++){const a=Math.random()*6.283,sp=v*(.4+Math.random()*.6);G.fx.push({k:'pf',x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,t:.45,T:.45,c,r:r*(.6+Math.random()*.6),dl:dl||0})}}
let toastT;
function toast(s){const t=$('toast');t.textContent=s;t.style.opacity=1;clearTimeout(toastT);toastT=setTimeout(()=>t.style.opacity=0,900)}
const PULL_SAME=4,PULL_PLANET=2.2,PULL_RECIPE=3;
function pickU(t){const pool=BY[t],inc={},pl={},have={};for(const c of G.cells)if(c){have[c.u]=1;if(c.n<3)inc[c.u]=1;pl[U[c.u].planet]=1}
  const need={};for(const m in RECIPE){const r=rcp(m),got=r.filter(k=>have[k]).length;if(got>=2&&got<r.length)for(const k of r)if(!have[k])need[k]=1}
  const w=pool.map(k=>(inc[k]?PULL_SAME:pl[U[k].planet]?PULL_PLANET:1)*(need[k]?PULL_RECIPE:1));let r=Math.random()*w.reduce((a,b)=>a+b,0);for(let j=0;j<pool.length;j++){r-=w[j];if(r<0)return pool[j]}return pool[pool.length-1]}
function summon(){
  if(G.over)return;if(total()>=MAXU&&!autoAny()){toast('필드가 가득 찼어요!');return}
  const c=cost();if(G.coins<c)return;
  const o=odds();let r=Math.random()*100,t=0;while(t<3&&r>=o[t]){r-=o[t];t++}
  let leap=false,pity=false;G.pity=(G.pity||0)+1;if(t>=3)G.pity=0;else if(G.pity>=PITY_N&&BY[3].length){t=3;G.pity=0;pity=true}
  while(t>0&&!BY[t].length)t--;const id=pickU(t);
  if(A('leap')&&Math.random()<.4)G.sched.push({t:.15,f:()=>{if(!G.over&&total()<MAXU&&place(id))toast('🚀 쌍둥이 소환! '+U[id].n+' 한 명 더')}});
  if(!place(id)){toast('놓을 칸이 없어요');return}
  G.coins-=c;if(c===0&&A('freebie')&&G.free&&!(G.freeT>0)&&!(G.freeN>0))eco('freebie',Math.round((NO_HOME?HOME_COST:1)*((12+G.summons)*COST_K+4)),'save');if(c===0){if(G.freeN>0)G.freeN--;else if(!(G.freeT>0))G.free=0}G.summons++;SND.play('summon',t);if(leap)toast('🚀 도약 소환!');if(pity)toast('🎯 행성 등급 보장 소환!');if(t>=1){const at=G.cells.findIndex(q=>q&&q.u===id&&q.pop>0),[px,py]=cellXY(at<0?0:at);burst(px,py,t,t>=2);G.fx.push({k:'t',x:px,y:py-26,t:1.2,T:1.2,s:(t>=2?'대박! ':'')+TN[t]+' 등급!',cr:true,dl:.05});toast((t>=2?'🎉 대박! ':'✨ ')+TN[t]+' 등급 소환 — '+U[id].n)}refresh()
}
const GAM=[{t:1,c:1,p:.6},{t:2,c:1,p:.2},{t:3,c:2,p:.1}];
function gamble(i){
  const g=GAM[i];if(G.over||G.stones<g.c||!BY[g.t].length)return;if(total()>=MAXU&&!autoAny()){toast('필드가 가득 찼어요!');return}
  if(Math.random()<g.p){const id=rnd(BY[g.t]);if(!place(id)){toast('놓을 칸이 없어요');return}G.stones-=g.c;toast('성공! '+U[id].n)}
  else{G.stones-=g.c;toast('꽝! 🍀💨')}
  refresh()
}
function upCost(i){const l=i<3?G.up[i]:G.luck;return i===0?30+30*l:i===1?50+50*l:i===2?2+l:120+15*l}
function oddsAt(L){const s0=G.luck;G.luck=L;const o=odds();G.luck=s0;return o}
// 행성 강화 버튼 상태: 대상 수(특수조합은 재료 행성이면 포함)·비용·막는 사유
function upPlState(p){const key=Object.keys(U).find(k=>U[k].planet===p),lv=G.upPlanet[p]||0,n=G.cells.reduce((a,c)=>a+(c&&(U[c.u].planet===p||U[c.u].fu&&fuBase(c.u).some(b=>U[b]&&U[b].planet===p))?c.n*(c.k||1):0),0),cost=key?upKCost(key):0;
  return {key,lv,n,cost,why:!key?'준비 중':!n?'출전 영웅 없음':G.coins<cost?'🪙 '+(cost-Math.floor(G.coins))+' 부족':''}}
function upgrade(i){
  const c=upCost(i);
  if(i===2){if(G.stones<c)return;G.stones-=c;G.up[2]++}
  else{if(G.coins<c)return;if(i===3){if(G.luck>=LUCK_MAX)return;G.coins-=c;G.luck++}else{G.coins-=c;G.up[i]++}}
  refresh()
}
function dmgParts(i){const c=G.cells[i];if(!c)return null;const u=U[c.u],up=upM(planetLevel(c.u),.6)*(u.fu?FU_UPK*(A('fuslab')?1.2:1)*(A('ascend')?1.7:1):1),bf=G.buff>0?1.5:G.hjB>0?1.4:G.unhB>0?1.25:1,L=[['강화',up],['시너지·오라',c.pa||1],['겹치기',concK(c)],['증강',augA(c)],['버프',bf*(G.bn?G.bn.atk:1)*(c.sh>0?1.3:1)*(c.sy||1)]].filter(q=>Math.abs(q[1]-1)>.005);return{L,t:L.reduce((a,q)=>a*q[1],1)}}
// v307: 강화는 행성 강화 하나. 특수조합은 재료(맨 아래 우주) 행성들의 강화 평균을 따름(개별 강화 삭제)
function planetLevel(k){if(U[k]&&U[k].fu){const b=fuBase(k);return b.reduce((a,q)=>a+((G.upPlanet&&G.upPlanet[U[q].planet])||0),0)/b.length}return (G.upPlanet&&G.upPlanet[U[k].planet])||0}
const LVF=['dur','st','bst','sl','vu','adur','hold','kbd','coinK'];
const LV_STEP=.12;
function lvK(k,st){st=st||LV_STEP;if(U[k]&&U[k].fu){const b=fuBase(k);return b.reduce((a,q)=>a+lvK(q,st),0)/b.length+st*(((typeof SAVE!=='undefined'&&SAVE.lv&&SAVE.lv[k])||1)-1)}return 1+st*(((typeof SAVE!=='undefined'&&SAVE.lv&&SAVE.lv[k])||1)-1)}
const PL_POW={lumiel:1.28,drakanis:1.2,biikseong:1.2,seolryeong:1.2,haeyeon:1.2}; // 해금 행성 보상: 루미엘 영웅 공격력 +12%
// 영웅별 세기 보정 (신규 행성: 해금이 늦을수록 강하게 — 드라카니스 < 설령성 < 루미엘 < 비익성)
const HPW={heukjo:23,yeongwol:12.9,noeha:9,bideung:16.4,pearlpunch:1.16,clawlancer:1.18,coralgiant:1.63,abyssadmiral:1.02,poseidon:1.47,wolroe:9.47,cheora:10.9,nox:17.41,jinmu:3.02,jeokhwang:4.35,astraon:4.59,yeongeopsu:9.41,unhwa:6.08,clockweaver:5.43,hwangryong:7.46,hornkid:1.02,fang_lancer:.83,iron_dragonkin:1.09,hongryeon:1.11,cheongryong:.8,snowkid:.76,icicle_bat:.79,snow_yeti:.8,ice_golem:.73,baekho:1.04,lulu:1.38,miel:1.24,noctia:1.35,aurielle:1.11,selene:1.06,feather_courier:1.1,feather_archer:.86,storm_owl:1.01,goldwing_commander:1.2,jujak:1.12};
// 강화 배율: 10강까지 1강당 +a(예전 그대로), 그 뒤로는 매 강 ×UP_G 복리 — 후반 적 체력(지수)과 같이 커지게
const UP_G=1.07,FU_UPK=1;function upM(L,a){return L<=10?1+a*L:(1+a*10)*Math.pow(UP_G,L-10)}
function mult(k){return HERO_POW*TIER_POW[U[k].t]*(PL_POW[U[k].planet]||1)*(HPW[k]||1)*upM(planetLevel(k),.6)*(U[k].fu?FU_UPK*(A('fuslab')?1.2:1)*(A('ascend')?1.7:1):1)*(G.buff>0?1.5:G&&G.hjB>0?1.4:G&&G.unhB>0?1.25:1)*lvK(k)*(G.bn?G.bn.atk:1)}
const TILEC=['','#b5dc65','#66d9ef','#c89cff','#ffd863','#ff7e87'];
const TILEIMG={"1": __P(2257), "2": __P(2258), "3": __P(2259), "4": __P(2260), "5": __P(2261)};const TILE_ART={};
if(typeof Image!=='undefined')for(const lv in TILEIMG){const im=new Image();im.src=TILEIMG[lv];TILE_ART[lv]=im}
function drawTileUpgradeFloors(){return;
 {const bf=V5I&&V5I['common/buff_floor'];if(bf)for(let i=0;i<NC;i++){const c=G.cells[i];if(!c||!c.aur)continue;const im=bf[Math.floor((G.time||0)*6+i)%bf.length];if(im&&im.complete&&im.naturalWidth){const[x,y]=cellXY(i);cx.save();cx.globalAlpha=.55;cx.drawImage(im,x-CS/2,y-CS/2,CS,CS);cx.restore()}}}
 for(let i=0;i<NC;i++){const lv=G.tile[i]||0;if(!lv||BLK.has(i))continue;const[x,y]=cellXY(i),im=TILE_ART[lv];cx.save();
  cx.beginPath();cx.rect(x-CS/2+1.5,y-CS/2+1.5,CS-3,CS-3);cx.clip();
  if(G.cells[i])cx.globalAlpha=.3;if(im&&im.complete&&im.naturalWidth)cx.drawImage(im,x-CS/2,y-CS/2,CS,CS);
  else{cx.strokeStyle=TILEC[lv];cx.lineWidth=1+lv*.35;rrect(cx,x-CS/2+2,y-CS/2+2,CS-4,CS-4,5);cx.stroke()}
  cx.restore()}}
function drawTileUpgradeLabels(){if(!G.cells.some(c=>c&&c.lk))return;
 for(let i=0;i<NC;i++){if(BLK.has(i))continue;const lv=G.tile[i]||0,c=G.cells[i];if(drag&&drag.on&&drag.i===i)continue;const[x,y]=cellXY(i);
  if(c&&c.lk){cx.save();cx.strokeStyle='#9fc3ff';cx.lineWidth=2;cx.setLineDash([5,3]);rrect(cx,x-CS/2+2.5,y-CS/2+2.5,CS-5,CS-5,6);cx.stroke();cx.setLineDash([]);const bw=CS*.36;cx.drawImage(roleBadge('🔒'),x-CS/2+1,y-bw/2-CS*.08,bw,bw);cx.restore()}
  
  if(c&&ROLE[c.u]){const bw=CS*.3;cx.save();cx.globalAlpha=.95;cx.fillStyle='rgba(20,16,36,.85)';cx.strokeStyle=ROLES[ROLE[c.u]].c;cx.lineWidth=2;cx.beginPath();cx.arc(x+CS/2-bw/2-2,y-CS/2+bw/2+2,bw/2,0,7);cx.fill();cx.stroke();cx.drawImage(roleBadge(ROLES[ROLE[c.u]].e),x+CS/2-bw-2,y-CS/2+2,bw,bw);cx.restore()}
  if(!lv)continue;cx.save();cx.globalAlpha=1;
  const h=Math.round(CS*.27),tx=''+(1+lv),fz=Math.round(h*.8);cx.font="bold "+fz+"px 'Jua',sans-serif";const tw=cx.measureText('판×'+tx).width,w=tw+h*.95,bx=x+CS/2-w-1,by=y+CS*.5-h-2;
  cx.fillStyle='rgba(28,22,18,.92)';rrect(cx,bx,by,w,h,h/2);cx.fill();cx.lineWidth=1.6;cx.strokeStyle=TILEC[lv];cx.stroke();
  const sq=h*.5,sx=bx+h*.22,sy=by+(h-sq)/2;cx.fillStyle=TILEC[lv];cx.fillRect(sx,sy,sq,sq);cx.strokeStyle='rgba(0,0,0,.6)';cx.lineWidth=1;cx.strokeRect(sx,sy,sq,sq);
  cx.fillStyle=TILEC[lv];cx.textAlign='left';cx.textBaseline='middle';cx.fillText('판×'+tx,sx+sq+2,by+h/2+1);
  cx.restore()}}
function concK(c){const k=(c&&c.k)||1;return k*(1+.08*(k-1))}
const ROLEI={'버프':'✨','지속':'☠️','범위':'💥','연쇄':'⚡','관통':'➶','약화':'🎯','기절':'💫','정지':'💫','속박':'💫','감속':'❄️','코인':'🪙','처형':'💀','밀치기':'💨','랜덤':'🎲','표식':'🎯','단일':'🗡️'};
const _RAY={};function raySprite(fu){const kk=fu?1:0;if(_RAY[kk])return _RAY[kk];const z=128,c=document.createElement('canvas');c.width=c.height=z;const x=c.getContext('2d');x.translate(z/2,z/2);for(let r=0;r<8;r++){x.rotate(Math.PI/4);const g2=x.createLinearGradient(0,0,0,-z/2);g2.addColorStop(0,fu?'rgba(255,90,90,.55)':'rgba(255,225,120,.5)');g2.addColorStop(1,fu?'rgba(255,60,60,0)':'rgba(255,220,110,0)');x.fillStyle=g2;x.beginPath();x.moveTo(-6,0);x.lineTo(0,-z/2);x.lineTo(6,0);x.closePath();x.fill()}return _RAY[kk]=c}
const _RB={};function roleBadge(e){if(_RB[e])return _RB[e];const z=64,c=document.createElement('canvas');c.width=c.height=z;const x=c.getContext('2d');x.fillStyle='rgba(20,14,30,.78)';x.beginPath();x.arc(z/2,z/2,z*.45,0,7);x.fill();x.lineWidth=4;x.strokeStyle='rgba(255,255,255,.55)';x.stroke();x.font=Math.round(z*.5)+'px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillStyle='#fff';x.fillText(e,z/2,z/2+2);return _RB[e]=c}
function roleIcons(k){if(U[k]._ri)return U[k]._ri;const t=[...new Set([...(AURA[k]?['버프']:[]),...(PVT[k]||[])])];const ord=Object.keys(ROLEI);t.sort((a,b)=>ord.indexOf(a)-ord.indexOf(b));return U[k]._ri=t.filter(x=>ROLEI[x]).slice(0,2).map(x=>ROLEI[x])}
// 칸 순서: 바깥 테두리부터 왼쪽 위에서 시계 방향으로 한 바퀴, 그다음 안쪽 테두리
let _RO=null;function ringOrd(){if(_RO)return _RO;_RO=Array(NC).fill(0);let n=0;for(let r=0;r*2<Math.min(COLS,ROWS);r++){const x0=r,y0=r,x1=COLS-1-r,y1=ROWS-1-r,L=[];for(let x=x0;x<=x1;x++)L.push([x,y0]);for(let y=y0+1;y<=y1;y++)L.push([x1,y]);if(y1>y0)for(let x=x1-1;x>=x0;x--)L.push([x,y1]);if(x1>x0)for(let y=y1-1;y>y0;y--)L.push([x0,y]);for(const[x,y]of L)_RO[y*COLS+x]=n++}return _RO}
// 길에 사거리가 안 닿는 칸 (버프 영웅은 오라 때문에 일부러 안쪽에 두므로 제외)
function effR(i,c){c=c||G.cells[i];if(!c)return 0;return U[c.u].r+(c.prg||0)+(c.rg>0?CS:0)+(i===G.eyeI&&A('eye')?CS*3:0)}
function cellOut(i){const c=G.cells[i];if(!c||AURA[c.u])return false;const r=effR(i,c);return cellPathD()[i]*4>r}
let _PD=null;function cellPathD(){if(_PD)return _PD;_PD=[];for(let i=0;i<NC;i++){const[x,y]=cellXY(i);let m=1e9;for(let q=0;q<PER;q+=6){const[a,b]=pos(q);m=Math.min(m,Math.hypot(a-x,b-y))}_PD.push(Math.round(m/4))}return _PD}
const BOSS_ESC=15; // 제한 시간 안에 못 잡은 보스는 적 15마리 몫(순환 구간의 100마리 기준에 들어감)
// ---------- 유저 체력 + 100웨이브 구간 ----------
// 순환형: 적 OV_N(100)마리 이상이면 OV_INT초마다 체력 감소(초과 25마리마다 +1). 99마리 이하면 멈춤 — 타이머는 0으로 리셋하지 않고 같은 속도로 줄어들어, 100 근처를 오가도 즉시 피해가 반복되지 않음.
// 도착형: 적이 출구(길 끝)에 닿으면 체력 감소 후 제거(한 번만). 보스는 따로.
const ARR_HPK=.6; // 도착형은 적이 한 번만 지나가므로 체력 0.6배
function hpMax(){return HP_MAX+(A('rampart')?30:0)}
const HP_MAX=100,OV_N=100,OV_INT=2,OV_STEP=25,ARR_DMG={n:1,el:3,boss:15},ESC_DMG=10,ZONE_PREP=8,ZONE_HEAL=10;
const ZONES=[
 {k:'sq',mode:'loop',n:'네모 순환',d:'적이 바깥 길을 계속 돌아요 · 100마리부터 체력 감소'},
 {k:'u',mode:'arrive',n:'U자 돌파',d:'왼쪽 위 입구 → 오른쪽 아래 출구 · 출구에 닿으면 체력 감소'},
 {k:'rev',mode:'loop',n:'거꾸로 순환',d:'반대 방향으로 계속 돌아요 · 100마리부터 체력 감소'},
 {k:'mid',mode:'arrive',ent:'alt',n:'日자 두 입구',d:'위·왼쪽 두 입구에서 번갈아 나와요 · 출구에 닿으면 체력 감소'},
 {k:'u',mode:'arrive',ent:'merge',n:'U자 합류',d:'두 입구에서 동시에 나와 길 중간에서 합류 · 출구에 닿으면 체력 감소'},
 {k:'mid',mode:'loop',n:'日자 순환',d:'출구로 나가면 입구로 돌아와 계속 돌아요 · 100마리부터 체력 감소'}];
// 1~100 네모 순환 · 101~200 U자 돌파 · 201~300 거꾸로 순환 · 301~400 日자 두 입구 · 401~500 U자 합류 · 501~600 日자 순환 · 601~ 2번부터 반복
function zoneIdx(w){const z=Math.floor((Math.max(1,w)-1)/100);return z<ZONES.length?z:1+((z-1)%(ZONES.length-1))}
function zoneOf(w){return ZONES[zoneIdx(w)]}
function isArr(){return G&&G.zm==='arrive'}
function zoneSwitch(zi,anim){const Z=ZONES[zi],was=G.zm;if(G.walls)for(const w of [...G.walls])wallEnd(w);G.zi=zi;G.zm=Z.mode;G.zent=Z.ent||null;G.entI=0;
  const ti=TERR.findIndex(t=>t.k===Z.k);setTerrain(ti<0?0:ti,anim);G.ent2=PCUM.length>3?PCUM[3]:0;
  if(!anim)return;
  // 이전 구간의 적: 도착형으로 바뀌면 길 앞쪽(0~40%)에 다시 흩어 놓고 도착 피해 없음(m.old) — 전환 순간 대량 피해 방지
  if(G.zm==='arrive')for(const m of G.mobs){m.p=28+Math.random()*PER*.4;m.old=1;m.esc=0}
  else for(const m of G.mobs)m.old=0;
  G.prep=ZONE_PREP;G.spawnT=Math.max(G.spawnT,ZONE_PREP);G.waveT+=ZONE_PREP;
  if(ZONE_HEAL)hpGain(ZONE_HEAL,null);
  const zb=$('zBan');if(zb){zb.innerHTML='🗺️ <b>'+Z.n+'</b> — '+Z.d+'<br>준비 '+ZONE_PREP+'초 · 영웅을 끌어 자리를 바꿔 두세요';zb.style.display='block'}
  toast('🗺️ 구간 변경! '+Z.n);SND.play('alarm');try{storyZone()}catch(e){}}
function hpLose(n,why){if(!G||G.over||!(n>0))return;if(SO('fort'))n*=.7;G.hp=Math.max(0,G.hp-n);G.hpLost=(G.hpLost||0)+n;G.hpWhy=why;const b=$('hpbar');if(b){b.classList.remove('hit');void b.offsetWidth;b.classList.add('hit')}G.flash=Math.max(G.flash||0,.12);if(G.hp<=30&&!G.hpLowT){G.hpLowT=1;toast('❤️ 체력이 얼마 안 남았어요!');SND.play('alarm');storyEv('hp')}}
function hpGain(n,src){if(!G||!(n>0))return 0;const r=Math.min(n,hpMax()-G.hp);G.hp+=r;if(G.hp>30)G.hpLowT=0;if(src&&src.u){const o=stO(src.u);o.heal+=r;o.hov=(o.hov||0)+(n-r)}return r}
function arrive(m){if(m.arr)return;m.arr=1;if(m.pq&&G.pq&&G.pq.st==='on'){m.pqDone=1;const pl=m.pq;m.pq=0;G.pq.dead=1;pqFail('arrive')}const dm=m.old?0:m.boss?ARR_DMG.boss:m.el?ARR_DMG.el:ARR_DMG.n;m.hp=0;G.nArr=(G.nArr||0)+1;if(dm){hpLose(dm,'arrive');const[x,y]=pos(PER-1);if(G.fx.length<300)G.fx.push({k:'t',x,y:y-20,t:.9,T:.9,s:'❤️-'+dm,cr:true,dl:0})}if(m.boss)toast('😱 보스가 출구를 지났어요! ❤️-'+dm)}
function mobCount(){let n=0;for(const m of G.mobs)n+=m.esc?BOSS_ESC:1;return n}
function concSpd(c){const k=(c&&c.k)||1;return Math.min(2,1+.25*(k-1))}
function concSz(c){const k=Math.min(6,(c&&c.k)||1);return 1+.09*(k-1)}
// v307: 랜덤 판 강화 삭제 — 칸 배율은 겹치기(같은 우주·특수조합 한 칸에 쌓기)만
function tileMult(i){return concK(G.cells&&G.cells[i])}
function autoConc(){let g=0;for(;g<20;g++){const cp=concPair();if(!cp)break;concDo(cp[0],cp[1])}if(g&&G.sel!=null&&!G.cells[G.sel])G.sel=null;return g}
function concPair(){if(!G||G.over)return null;const seen={};for(let i=0;i<NC;i++){const c=G.cells[i];if(!c||U[c.u].t<4)continue;if(seen[c.u]!=null)return[seen[c.u],i];seen[c.u]=i}return null}
function concDo(a,b){const A=G.cells[a],C=G.cells[b];if(!A||!C||A.u!==C.u||U[A.u].t<4)return false;const ka=A.k||1,kb=C.k||1;const keep=ka>=kb?A:C,ki=ka>=kb?a:b,oi=ka>=kb?b:a;keep.k=ka+kb;keep.sc=Math.min(keep.sc||0,(G.cells[oi].sc||0));keep.kills=(A.kills||0)+(C.kills||0);keep.pop=.3;G.cells[oi]=null;const[x,y]=cellXY(ki);parts(x,y,26,'#ffd23e',190,3.4);G.fx.push({k:'ring',x,y,r:CS*.9,t:.5,T:.5,c:'#fff3a8'});G.fx.push({k:'t',x,y:y-CS*.8,t:1.2,T:1.2,s:'×'+keep.k+' 겹치기!',cr:true,dl:0});G.shake=Math.max(G.shake,.35);G.flash=Math.max(G.flash||0,.15);SND.play('cosmic');toast(U[keep.u].n+' 농축 ×'+keep.k+' — 공격력 '+concK(keep).toFixed(1)+'배 · 공격·특수기 속도 +'+Math.round((concSpd(keep)-1)*100)+'%');G.sel=null;refresh();return true}
function tileCost(){return disc(40+10*(G.tileN||0),A('tilesale')?EC.tile:1,'tilesale')}
function upgradeTile(){return;const cand=[];for(let i=0;i<NC;i++)if((G.tile[i]||0)<5)cand.push(i);if(!cand.length){toast('모든 판이 최대 강화입니다');return}
  const c=tileCost();if(G.coins<c)return;G.coins-=c;paid();G.tileN=(G.tileN||0)+1;const i=cand[Math.floor(Math.random()*cand.length)];G.tile[i]++;if(A('builder')&&G.tile[i]<5&&Math.random()<.3){G.tile[i]++;setTimeout(()=>toast('🏗️ 두 배 공사! 한 단계 더'),400)}
  const[x,y]=cellXY(i);parts(x,y,14,TILEC[G.tile[i]],130,3);G.fx.push({k:'ring',x,y,r:34,t:.5,T:.5,c:TILEC[G.tile[i]]});G.fx.push({k:'boom',x,y,r:26,t:.35,T:.35,c:TILEC[G.tile[i]]});
  toast((i+1)+'번 판 강화 Lv.'+G.tile[i]+' (공격력 ×'+(1+G.tile[i])+')');refresh()}
// 임시 가격: 한 행성 전체에 적용되므로 공통 코인 비용으로 통일.
function upKCost(k){return disc(40+40*((G.upPlanet&&G.upPlanet[U[k].planet])||0),A('tilesale')?EC.tile:A('sponsor')?EC.sp:1,A('tilesale')?'tilesale':'sponsor')}
function upgradeK(k){if(G.over||!U[k]||!PLANETS[U[k].planet])return;const p=U[k].planet,cost=upKCost(k);if(G.coins<cost)return;G.coins-=cost;paid();G.upPlanet[p]=(G.upPlanet[p]||0)+1;if(A('builder')&&Math.random()<.3){G.upPlanet[p]++;setTimeout(()=>toast('🏗️ 두 배 강화! 한 단계 더'),300)}
 for(let i=0;i<NC;i++){const c=G.cells[i];if(c&&U[c.u].planet===p){const[x,y]=cellXY(i);parts(x,y,10,'#ffd23e',110,3)}}if(!(typeof HOLD!=='undefined'&&HOLD.k&&HOLD.n>0))toast(PLANETS[p]+' 강화 Lv.'+G.upPlanet[p]);refresh();if(typeof HOLD!=='undefined'&&HOLD.k)hkMark(HOLD.n>0?'hkRep':'hkCh')}
function craftCost(){const n=(G&&G.nCraft)||0;return disc((CRAFT_C0+CRAFT_STEP*n)*Math.pow(CRAFT_GROW,n),A('cforge')?EC.cf:1,'cforge')}
function canCraft(m,mat){if(!mat&&G&&G.coins<craftCost())return false;const need=rcp(m);if(!U[m]||U[m].t!==4||!Array.isArray(need)||!need.length)return false;for(const id of need)if(!U[id]||U[id].t<0||U[id].t>3)return false;
 return !!resSpot(m,takePlan(need,true))}
function merge(){
 if(G.over)return;const c=G.cells[G.sel];if(!c||c.n!==3||U[c.u].t>=3)return;if(c.lk){toast('🔒 잠긴 영웅이에요');return}if(!autoOK(c.u,3)&&!confirmUse('m'+c.u,'🎯 목표('+U[G.goal].n+') 재료예요 — 한 번 더 누르면 승급'))return;
 const pool=BY[U[c.u].t+1];if(!pool.length){toast('다음 단계 히어로가 아직 준비되지 않았어요');return}
 const i=G.sel;G.cells[i]=null;const id=pickU(U[c.u].t+1);
 if(autoTo(id)){G.nMerge=(G.nMerge||0)+1;SND.play('merge',U[id].t);G.sel=null;toast('▲ '+TN[U[id].t]+' 등급 — '+U[id].n+' (🛰️ 자동 보관)');refresh();return}
 let at=-1;if(U[id].t<4)for(let j=0;j<NC;j++){const d=G.cells[j];if(d&&d.u===id&&d.n<3&&!d.lk){at=j;break}}
 if(at<0){at=i;G.cells[i]={u:id,n:1,cd:0,b:0,pop:.25,ax:0,ay:0,sc:SP[id]?SP[id].cd:0}}else{const d=G.cells[at];d.n++;d.pop=.25;if(d.n===3)hint3(id)}
 const[px,py]=cellXY(at),t=U[id].t,[qx,qy]=cellXY(i);for(let q=0;q<3;q++){const a=q*2.1+Math.random();G.fx.push({k:'tr',x1:qx+Math.cos(a)*CS*.9,y1:qy+Math.sin(a)*CS*.9,x2:px,y2:py,w:4,c:TC[t],t:.22,T:.22,dl:0})}G.nMerge=(G.nMerge||0)+1;SND.play('merge',t);burst(px,py,t,t>=2);fxs('common/merge',px,py,CS*1.9,{fps:14});G.fx.push({k:'t',x:px,y:py-26,t:1.1,T:1.1,s:'▲ '+TN[t]+'!',cr:true,dl:.05});G.sel=at;
 if(A('twin')&&Math.random()<.25&&place(id)){G.fx.push({k:'t',x:px,y:py-44,t:1.2,T:1.2,s:'👯 쌍둥이!',cr:true,dl:.15})}
 toast((t>=3?'🌟 ':'')+TN[t]+' 등급 — '+U[id].n+'!');refresh()
}
function sell(){
  const c=G.cells[G.sel];if(!c)return;if(!G.tSell&&!autoOK(c.u,1)&&!confirmUse('s'+c.u,'🎯 목표 재료예요 — 한 번 더 누르면 판매'))return;const t=U[c.u].t;
  if(t>=4&&c.k>1){const k2=A('refund')?EC.ref:1;c.k--;const g=Math.round(SELL4*k2);G.stones+=g;toast('한 명 판매 — 🍀+'+g+' (×'+c.k+')');refresh();return}
  const k2=A('refund')?EC.ref:1;if(t===0)G.coins+=Math.round(10*k2);else G.stones+=Math.round((t===4?SELL4:t)*k2);if(t===4)toast('🌌 '+U[c.u].n+' 판매 — 🍀+'+Math.round(SELL4*k2));
  c.n--;if(c.n<=0){G.cells[G.sel]=null;G.sel=null}refresh()
}
function hasUnit(id){return G.cells.some(c=>c&&c.u===id)||orbHas(id)>0}
function craft(m){
 if(G.over||!canCraft(m)){toast(G.coins<craftCost()?'🪙 우주 조합 비용 '+craftCost()+'이 부족해요':'재료 또는 우주 히어로 배치 공간이 부족해요');return}if(!matsOK(rcp(m),m)&&!confirmUse('cr'+m,'🎯 목표('+U[G.goal].n+') 재료를 써요 — 한 번 더 누르면 조합'))return;{const c0=craftCost();G.coins-=c0;paid()};G.nCraft=(G.nCraft||0)+1;
 {const P=takePlan(rcp(m),false);putRes(m,resSpot(m,P))}if(A('cosmicplus')&&Math.random()<.4){const e=G.cells.findIndex((c,j)=>!c&&!BLK.has(j));if(e>=0||orbN()<ORB_CAP){putRes(m,e>=0?{c:e}:{o:1});toast('🌠 우주의 축복! 하나 더')}}G.sel=null;{const at=G.cells.findIndex(q=>q&&q.u===m),[px,py]=cellXY(at<0?12:at);SND.play('cosmic');burst(px,py,4,true);fxs('common/cosmic_birth',px,py-CS*.3,CS*3.2,{fps:9});for(let q=0;q<5;q++)G.fx.push({k:'ring',x:px,y:py,r:60+q*45,t:.7,T:.7,c:q%2?'#fff':'#ffd23e',dl:.1+q*.09});parts(px,py,40,'#ffd23e',260,4);parts(px,py,24,'#fff',200,3);G.fx.push({k:'t',x:px,y:py-34,t:1.6,T:1.6,s:'우주 히어로 탄생!',cr:true,dl:.1});G.hs=.45;G.flash=Math.max(G.flash||0,.2);G.fAt=-9;G.shake=Math.max(G.shake,.7);if(!(CUT_CRAFT_ONCE?cutOnce('cr:'+m,m,'우주 히어로 탄생! '+U[m].n):cutin(m,'우주 히어로 탄생! '+U[m].n)))toast('우주 히어로 탄생! '+U[m].n)}refresh()
}
let tapI=-1,tapAt=0;

function nextWave(){
  if(G.wave>=1000){end(true);return}
  G.wave++;{const zi=zoneIdx(G.wave);if(zi!==G.zi)zoneSwitch(zi,G.wave>1);else if(G.wave%100>=96){const Z=ZONES[zoneIdx(G.wave+(100-G.wave%100)+1)];toast('🗺️ '+(101-G.wave%100)+'웨이브 뒤 구간 변경 — '+Z.n+': '+Z.d)}}const b=isBoss(G.wave);
  G.waveT=b?60:20;G.free=1;G.healW=0;if(A('seed')){const v=EC.seedW[0]+EC.seedW[1]*G.wave;G.coins+=v;eco('seed',v)}if(A('supply')){const v=EC.sup*G.wave;G.coins+=v;eco('supply',v)}if(A('midas')&&G.wave>1&&G.wave%EC.midSt===0){G.stones++;eco('midas',1,'st')}if(SO('gold')&&G.wave>1)G.stones++;if(A('dice')){const L=G.cells.filter(c=>c).sort(()=>Math.random()-.5).slice(0,5);G.diceS=L;for(const c of L){const j=G.cells.indexOf(c),[dx,dy]=cellXY(j);G.fx.push({k:'t',x:dx,y:dy-30,t:1.3,T:1.3,s:'🎲×2.5',cr:true,dl:.2})}}if(A('evolve')&&G.wave>1)evolveOne();if(A('interest')&&G.wave>1){const g=Math.min(EC.intC[0]+EC.intC[1]*G.wave,Math.floor(G.coins*EC.int));if(g>0){G.coins+=g;eco('interest',g);if(g>=50)toast('🏦 이자 +'+g)}}if(G.wave===5)G.sched.push({t:1.2,f:boonOpen});G.spawnLeft=b?1:30;G.spawnT=0;G.spawnFast=false;
  // 행운석은 보스 보상과 희귀 이상 판매에서만 획득.
  SND.play(b?'bossIn':'wave');SND.bg(false,b?1:0);if(!b)toast('웨이브 '+G.wave);try{storyWave()}catch(e){repErr(e,'story')}
}
function spawn(){
  const w=G.wave,b=isBoss(w),hp=mobHP(w)*(b?bossMul(w):1);
  const kk=b?5:jrKind(w),bk=b?bossKind(w):0;let sk=null;if(!b&&w>=12&&Math.random()<Math.min(.12,.03+w*.0015)){const c=['split'];if(w>=16)c.push('heal');if(w>=22)c.push('immune');sk=c[Math.floor(Math.random()*c.length)]}
  const hp2=Math.round(hp*(b?(bk===6?1.3:1):ENH[kk]*(sk==='split'?1.4:sk==='immune'?1.6:sk==='heal'?1.1:1))*(A('greed')?1.15:1)*(G.zm==='arrive'?ARR_HPK:1));let p0=0;if(!b&&G.zm==='arrive'&&G.zent){if(G.zent==='alt'){G.entI^=1;if(G.entI)p0=G.ent2}else if(G.zent==='merge'&&G.spawnLeft>1){G.mobs.push({p:G.ent2,hp:hp2,max:hp2,sl:0,st:0,boss:false,bk:0,sk:null,v:ENV[kk],k:kk,sd:Math.random()*4,dcd:0});G.spawnLeft--}}G.mobs.push({p:p0,hp:hp2,max:hp2,sl:0,st:0,boss:b,bk,sk,v:b?30:ENV[kk]*(sk==='heal'?.85:sk==='immune'?1.1:1),k:kk,sd:Math.random()*4,dcd:b?6:0});
  if(b){const J=JB[bk];if(!CUTIN['jb'+bk]&&V5['cutins/boss'+bk]){CUTIN['jb'+bk]=V5['cutins/boss'+bk][0];CUTCOL['jb'+bk]='#ff5a4a'}if(!cutin('jb'+bk,J.n+' — '+J.nick+' 등장!'))toast('👹 '+J.n+' 등장!')}
}

// ---------- 전투 계열(행성과 별개인 두 번째 소속) + 최상급 역할 ----------
// 시너지는 '서로 다른 영웅 종류 수'로 발동. 같은 영웅을 여러 칸 두어도 1종.
const CLS={
 guard:{e:'🧱',n:'길막러',need:[2,4,6],c:'#7fb6ff',x:['길막러 영웅이 12초마다 사거리 안 가장 앞선 적 앞에 작은 벽(1초) · 벽·제어에서 풀린 적 3초간 받는 피해 +20%','작은 벽 10초마다 1.5초 · 풀린 적 피해 +40%','작은 벽 8초마다 2초 · 풀린 적 피해 +70%'],s:'길 막기'},
 brawl:{e:'⚔️',n:'투사',need:[2,4,6],c:'#ff8a6a',x:['투사 영웅 공격속도 +15%','투사 공격속도 +30% · 공격력 +20%','투사 공격속도 +50% · 공격력 +40%'],s:'근접 딜'},
 snipe:{e:'🎯',n:'저격수',need:[2,4,6],c:'#ffd23e',x:['저격수가 같은 적을 이어 맞히면 한 번마다 피해 +8% (최대 5번)','한 번마다 +12% (최대 6번)','한 번마다 +16% (최대 8번)'],s:'단일 집중'},
 bomb:{e:'💥',n:'폭격수',need:[2,4,6],c:'#ff9f2e',x:['폭격수 공격 한 번에 적 3명 이상 맞히면 추가 폭발(공격력 40%, 반경 1칸) · 영웅마다 3초에 1번','폭발 70% · 2.5초','폭발 100% · 2초'],s:'광역'},
 support:{e:'✨',n:'지원가',need:[2,3],c:'#6fe8c8',x:['모든 오라 효과 1.3배 (같은 종류 오라는 여전히 가장 센 것 하나)','오라 효과 1.6배'],s:'오라 강화'},
 heal:{e:'💚',n:'치유사',need:[2,3],c:'#7fe87f',x:['치유사가 적을 처치하면 2% 확률로 ❤️+1(유저 체력) · 실제로 회복되면 4초간 모든 아군 공격속도 +15%','처치 3% 확률 · 공격속도 +25%'],s:'유저 체력 회복'}};
const CLS_ORD=['guard','brawl','snipe','bomb','support','heal'];
const HCLS={mugyeom:'guard',bubon:'guard',noctia:'guard',mold:'guard',snow_yeti:'guard',ice_golem:'guard',baekho:'brawl',hyeonmu:'guard',abyssadmiral:'guard',coralgiant:'guard',chronel:'guard',iron_dragonkin:'guard',
 goldwing_commander:'brawl',fang_lancer:'brawl',hongryeon:'brawl',cacton:'brawl',elderon:'brawl',clawlancer:'brawl',vargon:'brawl',jacko:'brawl',selene:'brawl',
 veteran:'snipe',bricks:'snipe',archeon:'snipe',deliverybot:'snipe',nero:'snipe',alpaca:'snipe',pulu:'snipe',feather_archer:'snipe',icicle_bat:'snipe',policebot:'snipe',
 storm_owl:'bomb',jujak:'bomb',zeus:'bomb',jir:'bomb',fortressbot:'bomb',lunette:'bomb',poseidon:'bomb',stella:'bomb',cheongryong:'bomb',
 napoleon:'support',seraphine:'support',belkaon:'support',aurielle:'support',
 sporun:'heal',orca:'heal',miel:'heal',sylvaion:'heal',
 // 특수 조합
 jinmu:'guard',cheora:'guard',clockweaver:'guard',yeongeopsu:'heal',unhwa:'support',nox:'brawl',astraon:'snipe',wolroe:'brawl',noeha:'bomb',bideung:'bomb',jeokhwang:'bomb',hwangryong:'bomb',yeongwol:'brawl',heukjo:'bomb'};
// 최상급(우주·특수 조합) 역할: 강점과 약점이 같이 붙음
const ROLES={
 block:{e:'🧱',n:'경로 차단형',c:'#7fb6ff',x:'특수기로 길 위에 진짜 벽을 세워 그 앞에서 적을 멈춤 · 벽이 사라지면 막혔던 적은 5초간 벽을 통과 · 보스는 벽 근처에서 50% 감속만 · 벽은 전장에 최대 4개 (길막러 계열의 작은 벽 포함)',w:'자체 피해 -40%'},
 aoe:{e:'💥',n:'범위 공격형',c:'#ff9f2e',x:'특수기가 적이 가장 몰린 곳을 노림 · 일반 적에게 피해 +15%',w:'보스에게 피해 -30%'},
 single:{e:'🗡️',n:'단일 극딜형',c:'#ff5a6e',x:'기본공격·특수기 모두 보스 → 체력 많은 적 순으로 노림 · 보스에게 피해 +50%',w:'일반 적에게 피해 -25%'},
 buff:{e:'📯',n:'시너지 지원형',c:'#6fe8c8',x:'특수기로 전장의 아군 전체에 실제 버프(공격력·특수기 쿨·코인 중 하나, 10~12초) · 자기 오라·버프 효과 1.5배',w:'자체 피해 -40%'},
 heal:{e:'💗',n:'유저 체력 회복형',c:'#7fe87f',x:'유저 체력을 실제로 회복 — 실바이온: 특수기 때 ❤️+2 · 영겁수: 직접 처치 25마리마다 ❤️+1 (모든 회복 합쳐 웨이브당 최대 3, 최대 체력 초과 없음)',w:'자체 피해 -30%'}};
const ROLE={hyeonmu:'block',chronel:'block',jinmu:'block',cheora:'block',clockweaver:'block',
 archeon:'single',selene:'single',baekho:'single',nox:'single',astraon:'single',
 zeus:'aoe',lunette:'aoe',jujak:'aoe',poseidon:'aoe',cheongryong:'aoe',noeha:'aoe',bideung:'aoe',jeokhwang:'aoe',wolroe:'aoe',hwangryong:'aoe',heukjo:'aoe',yeongwol:'aoe',
 belkaon:'buff',unhwa:'buff',sylvaion:'heal',yeongeopsu:'heal'};
const ROLE_DMG={block:{a:.6},aoe:{n:1.15,b:.7},single:{n:.75,b:1.5},buff:{a:.6},heal:{a:.7}};
const BLK_T=2,BLK_IMM=6,BLK_BSL=2,CC_MAX=4,CC_IMM=3,HEAL_CAP=3,CD_MAX=3,AURA_MAXK=2.5;
function clsOf(k){return HCLS[k]||null}
function clsTag(k){const c=HCLS[k];return c?'<span style="color:'+CLS[c].c+'">'+CLS[c].e+CLS[c].n+'</span>':''}
function roleTag(k){const r=ROLE[k];return r?'<span style="color:'+ROLES[r].c+'">'+ROLES[r].e+ROLES[r].n+'</span>':''}
// 조합 결과 미리보기: 재료가 빠지고 결과가 들어간 뒤 시너지 종류 수 변화
function synDelta(add,mats){const cells=G.cells.map(c=>c?{u:c.u,n:c.n,k:c.k}:null);for(const k of mats){const i=cells.findIndex(c=>c&&c.u===k);if(i<0)continue;if((cells[i].k||1)>1)cells[i].k--;else if(cells[i].n>1)cells[i].n--;else cells[i]=null}cells.push({u:add,n:1});
  const a=clsCount(G.cells),b=clsCount(cells),pc=L=>{const P={};for(const c of L)if(c&&!U[c.u].fu)(P[U[c.u].planet]=P[U[c.u].planet]||new Set()).add(c.u);const o={};for(const k in P)o[k]=P[k].size;return o},pa=pc(G.cells),pb=pc(cells),out=[];
  for(const k of CLS_ORD){const x=a[k]||0,y=b[k]||0;if(x!==y){const lx=clsLvOf(k,x),ly=clsLvOf(k,y);out.push('<span style="color:'+(y>x?'#7fe8a0':'#ff8a8a')+'">'+CLS[k].e+CLS[k].n+' '+x+'→'+y+(ly!==lx?(ly>lx?' ▲':' ▼'):'')+'</span>')}}
  for(const k in Object.assign({},pa,pb)){const x=pa[k]||0,y=pb[k]||0;if(x!==y)out.push('<span style="color:'+(y>x?'#7fe8a0':'#ff8a8a')+'">'+(PLANETS[k]||k)+' '+x+'→'+y+'</span>')}
  return out.length?'시너지 변화: '+out.join(' · '):'시너지 변화 없음'}
function clsLv(id){return (G&&G.clOn&&G.clOn[id])||0}
function clsCount(cells){const S={};for(const c of cells)if(c){const k=HCLS[c.u];if(k)(S[k]=S[k]||new Set()).add(c.u)}const n={};for(const k in S)n[k]=S[k].size;return n}
function clsNeed(id){const nd=CLS[id].need;return G&&G.clTop===id?nd.map((q,j)=>j?q-1:q):nd}
function clsLvOf(id,n){const nd=clsNeed(id);let l=0;for(let j=0;j<nd.length;j++)if(n>=nd[j])l=j+1;return l}
// 차단: 이미 묶여 있으면 연장·갱신 없음, 풀린 뒤 BLK_IMM초 면역(어느 영웅이든), 보스는 감속만, 연속 제어 상한(CC_MAX초 묶이면 CC_IMM초 모든 이동 불가 면역)
// v305 경로 차단형: 길 위에 진짜 벽. G.walls=[{p:길 위치, t:남은 시간, T, c:세운 영웅 칸, col, held:Set}]
//  벽 앞에 도착한 적은 멈춤(m._wh). 면역(m.wImm·연속 제어 면역 m.ccImm·immune 특성)인 적은 통과, 보스는 벽 ±0.8칸에서 50% 감속만.
//  벽이 사라지면 막혀 있던 적은 WALL_IMM초 벽 통과 + 풀림 취약(m.rel). 막혀 있는 시간도 연속 제어(CC_MAX)에 합산 → 벽·기절을 번갈아 써도 4초 넘게 못 묶음.
const WALL_IMM=5,WALL_MAX=4;
const WALLC={hyeonmu:{T:3,n:1,col:'#3fe0b0',x:'지맥 장벽'},chronel:{T:2.5,n:1,col:'#8fd0ff',x:'시간의 벽',after:'slow'},jinmu:{T:2.5,n:2,col:'#3fe0d0',x:'쌍벽'},cheora:{T:3,n:1,col:'#5fe0ff',x:'코어 장벽',burst:5},clockweaver:{T:3,n:1,col:'#c48bff',x:'시계 벽',mark:1}};
function wallCast(c,best){const W=WALLC[c.u];if(!W||!best)return 0;G.walls=G.walls||[];const front=best.p+CS*.7;let n=0;
  for(let j=0;j<W.n;j++){while(G.walls.length>=WALL_MAX)wallEnd(G.walls[0]);G.walls.push({p:front-j*CS*1.6,t:W.T,T:W.T,c,col:W.col,held:new Set(),u:c.u});n++}
  if(G.fx.length<320){const[x,y]=pos(front);G.fx.push({k:'ring',x,y,r:CS*.6,t:.4,T:.4,c:W.col,dl:0})}return n}
function wallEnd(w){const i=G.walls.indexOf(w);if(i<0)return;G.walls.splice(i,1);const W=WALLC[w.u]||{};let n=0;
  for(const m of w.held){if(m.hp<=0)continue;m._wh=0;m.wImm=WALL_IMM;m.rel=3;n++;if(W.after==='slow')m.sl=Math.max(m.sl||0,3);if(W.mark&&w.c&&G.cells.includes(w.c))markSet(m,w.c,10)}
  if(W.burst&&w.c&&G.cells.includes(w.c)&&w.held.size){const ci=G.cells.indexOf(w.c),u=U[w.c.u],d=u.d*w.c.n*mult(w.c.u)*tileMult(ci)*augA(w.c)*SPK;const[x,y]=pos(w.p);for(const m of w.held)if(m.hp>0)hit(m,{},d*W.burst,0,w.c);if(G.fx.length<320)G.fx.push({k:'boom',x,y,r:CS*.9,t:.4,T:.4,c:W.col})}
  if(n&&w.c&&w.c.u)storyEv('block',{u:w.c.u,n})}
function drawWalls(){if(!G.walls||!G.walls.length)return;for(const w of G.walls){const[x,y]=pos(w.p),[x2,y2]=pos(w.p+3),ang=Math.atan2(y2-y,x2-x)+Math.PI/2,L2=CS*.62,f=Math.min(1,w.t/.3),a=Math.min(1,(w.T-w.t)/.15);
  cx.save();cx.translate(x,y);cx.rotate(ang);cx.globalAlpha=.9*f*a;cx.fillStyle='rgba(20,30,40,.55)';cx.fillRect(-L2,-5,L2*2,10);cx.strokeStyle=w.col;cx.lineWidth=3;cx.strokeRect(-L2,-5,L2*2,10);
  cx.fillStyle=w.col;for(let k=-2;k<=2;k++)cx.fillRect(k*L2*.4-2,-8,4,16);cx.globalAlpha=f;cx.fillStyle='#fff';cx.fillRect(-L2,7,L2*2*(w.t/w.T),2.5);cx.restore();
  if(w.held.size){cx.save();cx.font="bold 9px 'Jua',sans-serif";cx.textAlign='center';cx.fillStyle=w.col;cx.strokeStyle='#000';cx.lineWidth=2.5;const t='🧱'+[...w.held].filter(m=>m._wh===w).length;cx.strokeText(t,x,y-14);cx.fillText(t,x,y-14);cx.restore()}}}
const GW_T=[0,1,1.5,2],GW_CD=[0,12,10,8];
// 길막러 계열(최상급 차단형 제외 소속 영웅 전부): 계열 단계에 따라 주기적으로 작은 벽
function guardTick(dt){let L=clsLv('guard');if(L&&A('wall'))L=Math.min(3,L+1);if(!L)return;G.cells.forEach((c,i)=>{if(!c||HCLS[c.u]!=='guard'||ROLE[c.u]==='block')return;c.gw=(c.gw==null?GW_CD[L]*Math.random():c.gw)-dt;if(c.gw>0)return;const[x,y]=cellXY(i),r=effR(i,c);let best=null;for(const m of G.mobs){if(m.hp<=0||m.p<28||m.boss||m.wImm>0||m.ccImm>0)continue;const[mx,my]=pos(m.p);if(Math.hypot(mx-x,my-y)<=r&&(!best||m.p>best.p))best=m}
  if(!best){c.gw=1;return}c.gw=GW_CD[L];G.walls=G.walls||[];while(G.walls.length>=WALL_MAX)wallEnd(G.walls[0]);G.walls.push({p:best.p+CS*.5,t:GW_T[L],T:GW_T[L],c,col:'#7fb6ff',held:new Set(),u:c.u,small:1})})}
function wallTick(dt){guardTick(dt);if(!G.walls||!G.walls.length)return;for(const w of [...G.walls]){w.t-=dt;if(w.t<=0||!G.cells.includes(w.c))wallEnd(w)}}
// 적 이동 직전: 이번 프레임에 벽을 넘으려 하면 벽 바로 앞에 세움
function wallStop(m,v,dt){if(!G.walls||!G.walls.length||v<=0)return v;if(m.wImm>0||m.ccImm>0||m.sk==='immune'){return v}
  for(const w of G.walls){const d=((w.p-m.p)%PER+PER)%PER;if(m.boss){if(d<CS*.8||d>PER-CS*.8)v*=.5;continue}
    if(d<=v*dt+1.5){m.p+=Math.max(0,d-1.5-Math.random()*2);if(!w.held.has(m)){w.held.add(m);const o=stO(w.c.u);o.cn++}m._wh=w;if(w.c&&w.c.u)stO(w.c.u).ctrl+=dt;return 0}}
  if(m._wh)m._wh=0;return v}
function tryBlock(m,c){if(!m||m.hp<=0)return false;if(m.boss){m.sl=Math.max(m.sl,BLK_BSL);return false}if(m.blkT>0||m.blkImm>0||m.ccImm>0||m.sk==='immune')return false;m.blkT=BLK_T;m.blkSrc=c;const o=stO(c.u);o.cn++;if(G.fx.length<320){const[x,y]=pos(m.p);G.fx.push({k:'ring',x,y,r:CS*.32,t:.35,T:.35,c:'#7fb6ff',dl:0})}return true}
function healTry(n,src){if(!G||G.over)return 0;G.healW=G.healW||0;const room=Math.max(0,HEAL_CAP+(A('spring')?2:0)+(G.styHeal||0)-G.healW);if(room<=0||G.hp>=hpMax()){if(src&&src.u)stO(src.u).hov=(stO(src.u).hov||0)+n;return 0}const r=hpGain(Math.min(n,room),src);G.healW+=r;if(r>0){if(src&&src.u)storyEv('heal',{u:src.u,n:r});const L=clsLv('heal');if(L)G.healB=4;if(src){const ci=G.cells.indexOf(src);if(ci>=0&&G.fx.length<320){const[x,y]=cellXY(ci);G.fx.push({k:'t',x,y:y-CS*.6,t:1.2,T:1.2,s:'❤️+'+r,cr:true,dl:0})}}}return r}

// ---------- 목표 조합 재료 보호 + 궤도 대기소 ----------
// 대기소(G.orb={영웅id:수량}) 영웅은 싸우지 않고 오라·시너지도 없음. 승급·조합 재료로는 전장과 합쳐 계산.
// 재료 보호: 목표(G.goal) 1종의 직접 재료를 필요 수만큼 자동 소비(일괄 승급·진화·다른 조합)에서 지킴. 초과분은 자유.
const ORB_CAP=Infinity; // v303: 대기소 개체 수 제한 없음(종류별 ×수량 표시)
// 종류별 자동 보관: G.autoS={id:1}. 지정하면 이 판에서 그 영웅을 새로 얻을 때(소환·승급·조합·진화·복권 등) 전장 대신 대기소로.
// 보유 0이 되거나 1기를 출전시켜도 유지, 해제는 사용자만. SAVE.autoKeep이면 다음 판에도 SAVE.autoS를 이어 씀.
function autoInit(){const o={};if(SAVE.autoKeep&&SAVE.autoS)for(const k in SAVE.autoS)if(U[k]&&!U[k].hidden)o[k]=1;return o}
function autoAny(){return !!(G.autoS&&Object.keys(G.autoS).length)}
function autoTo(id){if(!G.autoS||!G.autoS[id])return false;G.orb=G.orb||{};G.orb[id]=(G.orb[id]||0)+1;G.autoN=(G.autoN||0)+1;if(G.fx&&G.fx.length<320){const[x,y]=cellXY(NC-COLS);G.fx.push({k:'t',x,y:y+CS*.3,t:.9,T:.9,s:'🛰️ +1 '+U[id].n,cr:false,dl:0})}return true}
function autoSet(id,on){G.autoS=G.autoS||{};if(on)G.autoS[id]=1;else delete G.autoS[id];if(SAVE.autoKeep){SAVE.autoS=Object.assign({},G.autoS);saveAll()}
  if(on){let n=0;G.cells.forEach((c,i)=>{if(c&&c.u===id&&!c.pin&&orbStore(i,true))n++});toast('🛰️ '+U[id].n+' 보관'+(n?' '+n+'칸':'')+' · 앞으로 얻는 것도 대기소로 (대기소에서 끄기)')}else toast('🛰️ '+U[id].n+' 자동 보관 끔')}
function orbN(){let n=0;const O=G.orb||{};for(const k in O)n+=O[k];return n}
function orbHas(id){return (G.orb&&G.orb[id])||0}
function fieldUnits(id,noLk){return G.cells.reduce((n,c)=>n+(c&&c.u===id&&!(noLk&&c.lk)?c.n*(c.k||1):0),0)}
function owned(id,noLk){return fieldUnits(id,noLk)+orbHas(id)}
function goalMats(g){g=g||G.goal;if(!g)return [];return RECIPE[g]?rcp(g):FUSION[g]?FUSION[g].mat:[]}
// v303: 목표 전체 경로 — 목표 → 특수조합 → 우주 → 1~3단계 재료까지 재귀로 내려가며, 전장+대기소 보유분을 한 번만 배정(공유 재료는 합산).
//  이미 가진 중간 영웅은 그대로 예약하고 그 아래 재료는 예약하지 않음. 조합식은 영웅마다 하나라 경로도 하나.
//  need[id]=경로가 요구하는 수(보호 기준), wants[id]=아직 만들어야 하는 중간 영웅 수, miss=없는 맨 아래 재료, par=어느 중간 영웅에 쓰이는지.
function matsOf(id){return RECIPE[id]?rcp(id):FUSION[id]?FUSION[id].mat:null}
function goalPlan(g){g=g||G.goal;if(!g)return {need:{},wants:{},miss:{},par:{},have:{}};const pool={},need={},wants={},miss={},par={},have={};
  const own=k=>k in pool?pool[k]:(pool[k]=owned(k));
  const ex=(id,n,parent,d)=>{need[id]=(need[id]||0)+n;(par[id]=par[id]||[]).includes(parent)||par[id].push(parent);const h=own(id),tk=Math.min(h,n);pool[id]=h-tk;have[id]=(have[id]||0)+tk;const r=n-tk;if(r<=0)return;
    const mats=matsOf(id);if(mats&&d<7){wants[id]=(wants[id]||0)+r;const c={};for(const k of mats)c[k]=(c[k]||0)+1;for(const k in c)ex(k,c[k]*r,id,d+1)}else miss[id]=(miss[id]||0)+r};
  const c={};for(const k of goalMats(g))c[k]=(c[k]||0)+1;for(const k in c)ex(k,c[k],g,1);return {need,wants,miss,par,have}}
function goalNeed(){return goalPlan().need}
function onPath(id){return !!(G.goal&&(id===G.goal||goalPlan().wants[id]>0))}
function pathWhy(id){if(id===G.goal)return '🎯 목표';const pr=(goalPlan().par[id]||[]).filter(x=>x!==G.goal);return '🎯 '+U[G.goal].n+' 제작에 필요한 중간 재료'+(pr.length?' ('+pr.map(x=>U[x]?U[x].n:x).join('·')+'용)':'')}
function goalShort(){const P=goalPlan(),ms=Object.keys(P.miss);return '<div class="gP">🛡️ 재료 보호 중'+(ms.length?' · 부족 '+ms.length+'종':' · 재료 다 있음')+'</div>'}
function goalTreeHTML(){if(!G.goal)return '';const P=goalPlan(),nm=k=>U[k]?U[k].n:k,lines=[];
  const walk=(id,n,d)=>{const mats=matsOf(id),own=owned(id);lines.push('<div style="padding-left:'+(d*1.1)+'em">'+(d?'└ ':'')+'<b style="color:'+(U[id]&&U[id].fu?'#ff5a6e':U[id]?TC[U[id].t]:'#fff')+'">'+nm(id)+'</b>'+(d?' <small>필요 '+n+' · 보유 '+own+'</small>'+(P.wants[id]>0&&d?' <small style="color:#ffd23e">→ '+P.wants[id]+' 더 만들기</small>':own>=n?' ✓':''):'')+'</div>');
    if(mats&&(d===0||P.wants[id]>0)&&d<6){const c={};for(const k of mats)c[k]=(c[k]||0)+1;for(const k in c)walk(k,c[k],d+1)}};
  walk(G.goal,1,0);const ms=Object.keys(P.miss);return '<div class="gP" style="text-align:left">🛡️ 전체 경로 보호 중 (전장+대기소)'+lines.join('')+(ms.length?'<div style="margin-top:.3em;color:#ffb0b0">부족: '+ms.map(k=>nm(k)+' ×'+P.miss[k]).join(' · ')+'</div>':'<div style="margin-top:.3em;color:#7fe8a0">재료가 다 있어요 — 중간 영웅부터 만들면 돼요</div>')+'</div>'}
function protN(id){const nd=goalNeed()[id]||0;return Math.min(nd,owned(id))}
function autoOK(id,n){const nd=goalNeed()[id]||0;return !nd||owned(id)-n>=nd}
function matsOK(mats,except){if(!G.goal||G.goal===except||(except&&goalPlan().wants[except]>0))return true;const c={};for(const k of mats)c[k]=(c[k]||0)+1;return Object.keys(c).every(k=>autoOK(k,c[k]))}
// 보호 재료를 손으로 쓰려 할 때: 한 번 안내, 3.5초 안에 다시 누르면 허용
function confirmUse(key,msg){const t=performance.now();if(G.cfK===key&&t-G.cfT<3500){G.cfK=null;return true}G.cfK=key;G.cfT=t;toast(msg);return false}
// 재료 소비 계획: 대기소 먼저 → 전장(잠금 제외, 적게 쌓인 칸부터). dry면 실제로 안 바꿈
function takePlan(mats,dry){const n0=orbN(),orb=Object.assign({},G.orb||{}),cells=dry?G.cells.map(c=>c?{u:c.u,n:c.n,k:c.k||1,lk:c.lk}:null):G.cells,freed=[];let fromField=false,orbUsed=0;
  for(const id of mats){if(orb[id]>0){orb[id]--;orbUsed++;continue}
    let bi=-1;cells.forEach((c,j)=>{if(c&&c.u===id&&!c.lk&&(bi<0||c.n*(c.k||1)<cells[bi].n*(cells[bi].k||1)))bi=j});if(bi<0)return null;
    const c=cells[bi];fromField=true;if((c.k||1)>1)c.k--;else if(--c.n<=0){cells[bi]=null;freed.push(bi)}}
  if(!dry){for(const k in orb)if(orb[k]<=0)delete orb[k];G.orb=orb}
  return {freed,fromField,orbFree:ORB_CAP-(n0-orbUsed)}}
// 결과 위치: ① 재료로 비워진 전장 칸 → ② 전장 재료를 썼으면 같은 영웅 칸(3명 미만)·다른 빈 전장 칸 → ③ 궤도 대기소 → 다 안 되면 null(실행 전 차단)
function resSpot(id,P){if(!P)return null;if(P.freed.length)return {c:P.freed[0]};if(P.fromField){if(U[id].t<4){const j=G.cells.findIndex(c=>c&&c.u===id&&c.n<3&&!c.lk);if(j>=0)return {s:j}}const e=G.cells.findIndex((c,j)=>!c&&!BLK.has(j));if(e>=0)return {c:e}}if(P.orbFree>=1)return {o:1};return null}
function putRes(id,sp,extra){if(G.autoS&&G.autoS[id]&&!(extra&&extra.k>1))sp={o:1};if(sp.c!=null){G.cells[sp.c]=Object.assign({u:id,n:1,cd:0,b:0,pop:.25,ax:0,ay:0,sc:SP[id]?SP[id].cd:0},extra||{});return sp.c}if(sp.s!=null){const d=G.cells[sp.s];d.n++;d.pop=.25;if(d.n===3)hint3(id);return sp.s}G.orb=G.orb||{};G.orb[id]=(G.orb[id]||0)+1;toast('🛰️ '+U[id].n+' → 궤도 대기소'+(G.autoS&&G.autoS[id]?' (자동 보관)':''));return -1}
function orbStore(i,silent){const c=G.cells[i];if(!c)return false;
  G.orb=G.orb||{};G.orb[c.u]=(G.orb[c.u]||0)+c.n*(c.k||1);G.cells[i]=null;if(G.sel===i)G.sel=null;const[x,y]=cellXY(i);if(G.fx.length<320)G.fx.push({k:'ring',x,y,r:CS*.5,t:.35,T:.35,c:'#8fd8ff',dl:0});return true}
function orbDeploy(id){if(!orbHas(id))return false;let j=U[id].t<4?G.cells.findIndex(c=>c&&c.u===id&&c.n<3&&!c.lk):-1;
  if(j>=0){G.cells[j].n++;G.cells[j].pop=.25}else{const RO=ringOrd(),e=[];G.cells.forEach((c,i)=>{if(!c&&!BLK.has(i))e.push(i)});if(!e.length){toast('전장에 빈 칸이 없어요');return false}e.sort((a,b)=>RO[a]-RO[b]);j=e[0];G.cells[j]={u:id,n:1,cd:.5,b:0,pop:.25,ax:0,ay:0,sc:SP[id]?SP[id].cd:0}}
  if(--G.orb[id]<=0)delete G.orb[id];const[x,y]=cellXY(j);if(G.fx.length<320)G.fx.push({k:'ring',x,y,r:CS*.5,t:.35,T:.35,c:'#8fd8ff',dl:0});return true}
// 대기소에서 승급: 자동(일괄 승급)은 대기소 3명만, 수동은 전장과 섞어서
function orbMergeOK(id,auto){const t=U[id].t;if(t>=3||!BY[t+1]||!BY[t+1].length)return false;if(auto)return orbHas(id)>=3&&autoOK(id,3);return owned(id,1)>=3}
function orbMerge(id,auto){if(G.over||!orbMergeOK(id,auto))return false;if(!auto&&!autoOK(id,3)&&!confirmUse('om'+id,'🎯 목표 재료예요 — 한 번 더 누르면 승급'))return false;
  const P0=takePlan([id,id,id],true);if(!P0||!(P0.freed.length||P0.fromField&&G.cells.some((c,j)=>!c&&!BLK.has(j))||P0.orbFree>=1)){toast('결과를 둘 자리가 없어요');return false}
  const P=takePlan([id,id,id],false),nid=pickU(U[id].t+1),at=putRes(nid,resSpot(nid,P));G.nMerge=(G.nMerge||0)+1;SND.play('merge',U[nid].t);if(at>=0){const[px,py]=cellXY(at);burst(px,py,U[nid].t,false)}toast('▲ '+TN[U[nid].t]+' 등급 — '+U[nid].n+(at<0?' (대기소)':''));return true}
function orbReady(){return Object.keys(G.orb||{}).filter(id=>orbMergeOK(id,true))}
function synSnap(cells){const pc={},cc=clsCount(cells);for(const c of cells)if(c&&!U[c.u].fu)(pc[U[c.u].planet]=pc[U[c.u].planet]||new Set()).add(c.u);const o={};for(const k in pc)o[k]=pc[k].size;return {p:o,c:cc}}
function synDiffTxt(a,b){const out=[];for(const k of CLS_ORD){const x=a.c[k]||0,y=b.c[k]||0;if(x!==y){const lx=clsLvOf(k,x),ly=clsLvOf(k,y);out.push('<span style="color:'+(y>x?'#7fe8a0':'#ff8a8a')+'">'+CLS[k].e+CLS[k].n+' '+x+'→'+y+(lx!==ly?(ly>lx?' ▲':' ▼'):'')+'</span>')}}const nd=plNeed();for(const k in Object.assign({},a.p,b.p)){const x=a.p[k]||0,y=b.p[k]||0;if(x!==y){const lv=v=>v>=nd[1]?2:v>=nd[0]?1:0;out.push('<span style="color:'+(y>x?'#7fe8a0':'#ff8a8a')+'">'+(PLANETS[k]||k)+' '+x+'→'+y+(lv(x)!==lv(y)?(lv(y)>lv(x)?' ▲':' ▼'):'')+'</span>')}}return out.length?out.join(' · '):'시너지 변화 없음'}
function bulkPlan(tmax){const idx=[];G.cells.forEach((c,i)=>{if(c&&U[c.u].t<=tmax&&!c.pin)idx.push(i)});let room=ORB_CAP-orbN(),take=[],units=0;for(const i of idx){const n=G.cells[i].n;if(n>room)continue;room-=n;units+=n;take.push(i)}const after=G.cells.map((c,i)=>take.includes(i)?null:c);return {take,units,skipped:idx.length-take.length,diff:synDiffTxt(synSnap(G.cells),synSnap(after))}}
function orbUI(){const P=$('orbP');if(!P||P.style.display!=='block'||!G)return;const O=G.orb||{},AS=G.autoS||{},ks=[...new Set([...Object.keys(O),...Object.keys(AS)])].filter(k=>U[k]).sort((a,b)=>U[b].t-U[a].t||(O[b]||0)-(O[a]||0)),gn=goalNeed();
  let h='<div class="oh"><b style="display:flex;align-items:center">🛰️ 궤도 대기소 · '+orbN()+'명'+helpBtn('orb')+'</b><button class="oX">✕</button></div>';
  if(G.goal&&U[G.goal])h+='<div class="og">🎯 목표 <b>'+U[G.goal].n+'</b> — 전체 경로 재료 보호 중: '+'하위 재료까지 필요한 만큼 지켜요'+'</div>';
  h+=ks.length?ks.map(id=>{const u=U[id],f=fieldUnits(id);return '<div class="oi">'+(u.url?'<img src="'+cardUrl(id)+'" alt="">':'<span>'+u.e+'</span>')+'<span class="on"><b style="color:'+(u.fu?'#ff5a6e':TC[u.t])+'">'+u.n+'</b><small>보관 <b style="display:inline;color:#fff;font-size:1.15em">×'+(O[id]||0)+'</b> · 전장 '+f+(gn[id]?' · 🎯보호 '+protN(id):'')+'</small></span><button data-oa="'+id+'" class="'+(AS[id]?'aon':'aoff')+'" title="새로 얻으면 자동으로 대기소로">'+(AS[id]?'자동 보관 ON':'자동 보관 OFF')+'</button>'+(O[id]?'<button data-od="'+id+'">출전 1</button>':'')+(orbMergeOK(id,false)?'<button data-om="'+id+'" class="up">▲ 승급</button>':'')+'</div>'}).join(''):'<div class="oEmpty"><i>🛰️</i>보관 중인 영웅이 없어요</div>';
  h+='<div class="ob"><label style="display:flex;gap:.4em;align-items:center"><input type="checkbox" id="oKeep"'+(SAVE.autoKeep?' checked':'')+'> 다음 판에도 자동 보관 유지</label></div><div class="ob"><b>일괄 보관</b><div>'+[1,2,3].map(t=>'<button data-ob="'+t+'">'+TN[t]+' 이하</button>').join('')+'</div><div id="obPrev">'+(G.obPv?obPrevH(G.obPv):'')+'</div></div>';
  P.innerHTML=h}
function obPrevH(tm){const B=bulkPlan(tm);return B.take.length?'<div class="opv">'+TN[tm]+' 이하 <b>'+B.take.length+'칸 '+B.units+'명</b> 보관'+(B.skipped?' (자리 부족으로 '+B.skipped+'칸 제외)':'')+'<br>'+B.diff+'<br><button data-obgo="'+tm+'" class="up">보관하기</button><button data-obno="1">취소</button></div>':'<div class="opv">옮길 영웅이 없어요</div>'}
function orbBtn(){const b=$('orbB');if(b&&G){const t='🛰️ ×'+orbN()+(autoAny()?' 🔁':'');if(b.textContent!==t)b.textContent=t}}
function orbInit(){if($('orbB'))return;const st=$('stage');const b=document.createElement('button');b.id='orbB';st.appendChild(b);const P=document.createElement('div');P.id='orbP';st.appendChild(P);
  b.onclick=()=>{P.style.display=P.style.display==='block'?'none':'block';orbUI()};
  P.onchange=e=>{if(e.target.id==='oKeep'){SAVE.autoKeep=e.target.checked?1:0;SAVE.autoS=SAVE.autoKeep?Object.assign({},G.autoS||{}):{};saveAll();toast(SAVE.autoKeep?'다음 판에도 자동 보관 유지':'자동 보관은 이번 판만')}};
  P.onclick=e=>{const t=e.target.closest('button');if(!t)return;if(t.classList.contains('oX')){P.style.display='none';return}
    if(t.dataset.oa){const id=t.dataset.oa;autoSet(id,!(G.autoS&&G.autoS[id]));synTick();refresh();orbUI();return}
    if(t.dataset.od){orbDeploy(t.dataset.od);synTick();refresh();orbUI();return}
    if(t.dataset.om){orbMerge(t.dataset.om,false);synTick();refresh();orbUI();return}
    if(t.dataset.ob){G.obPv=+t.dataset.ob;orbUI();return}
    if(t.dataset.obgo){G.obPv=null;const B=bulkPlan(+t.dataset.obgo);let n=0;for(const i of B.take)if(orbStore(i,true))n++;toast('🛰️ '+n+'칸 보관');synTick();refresh();orbUI();return}
    if(t.dataset.obno){G.obPv=null;orbUI();return}}}

// ---------- 서사·캐릭터 (1차: 대표 3명 · 연속 사건 2갈래 · 일상/전투 반응 · 항해 기록) ----------
// 저장(v304: 기록·읽음 목록 없음): SAVE.story = {done:{사건id:'win'|'fail'}, tries:{사건id:n}, claim:{사건id:1}, rel:{영웅:0~3}, met:{영웅:1}, recent:[대사id…], log:[{e,r,w,at}]}
//  · seen(봤다)과 done(완료=성공)을 구분. 스킵·중도 종료는 done이 아님 → 재도전 가능, 다시 볼 때 도입은 짧게.
//  · rel은 올라가기만(Math.max). claim은 영구 보상 1회 지급 기록(기기 합치기 때 합집합).
// 이번 판 상태: G.sty = {used:{대사id:1}, req:현재 요청, log:[이번 판 사건], zoneSaid:{}}
// 대사마다 고유 id·화자(who)가 있어 나중에 음성을 붙일 수 있음.
const SCH={ // 대표 캐릭터 설정
 hyeonmu:{n:'현무',c:'#3fe0b0',want:'다시는 백성을 잃지 않는 것',fear:'큰 소리와 갑작스러운 일에 몸이 굳어 등껍질에 숨는 버릇 — 그래서 결정을 늦게 내림',twist:'‘대지의 왕’이지만 무척 수줍고, 백성 아이들 이름을 전부 외움',rel:'제욱스는 시끄러워서 피하지만 위기엔 꼭 그 앞에 섬 · 실바이온과는 천 년 지기',voice:'느릿한 하오체 · 쿵 하고 발 구르기',fight:'경로 차단형 — 적을 묶어 동료에게 시간을 벌어 줌'},
 zeus:{n:'제욱스',c:'#ffd23e',want:'인정받는 것, 혼자서 다 해결하는 영웅',fear:'도움을 청하지 못함 — 혼자 뛰어들었다 위기를 부름',twist:'구한 사람 이름을 몰래 수첩에 적어 둠',rel:'현무를 ‘거북 영감’이라 놀리지만 결국 등을 맡김 · 실바이온의 잔소리엔 꼼짝 못함',voice:'반말·감탄사 “번쩍!”',fight:'범위 공격형 — 한 번에 쓸어버리지만 보스엔 약함'},
 sylvaion:{n:'실바이온',c:'#b6f04a',want:'모두가 살아서 돌아오는 것',fear:'또 누군가를 잃는 것(제륵이 숲 하나를 태웠음) — 그래서 일부러 거리를 둠',twist:'무뚝뚝하지만 동료마다 이름 붙인 씨앗을 몰래 심어 둠',rel:'현무와 오래된 친구 · 제욱스를 ‘불씨’라 부르며 잔소리',voice:'짧은 반말과 마침표 “…다치지 마.”',fight:'유저 체력 회복형 — 체력을 조금씩 되살림'}};
const REL_N=['처음','아는 사이','신뢰','전우'];
// 대사: id·화자·문장. who가 출전 중이 아니면 alt(대체 화자: 행성 통신·위원회)로
const SL={
 // 첫 만남(계정당 1회)
 meet_hyeonmu:{who:'hyeonmu',t:'…위원회의 분이시오? 나는 현무. 크게 부르지만 마시오, 놀라면 숨어 버리니.'},
 meet_zeus:{who:'zeus',t:'번쩍! 제욱스 등장! 걱정 마, 이 판은 나 혼자로도 충분하니까.'},
 meet_sylvaion:{who:'sylvaion',t:'실바이온. …이름은 됐고, 살아서 돌아와.'},
 // 원정 시작
 st_base:{who:'council',t:'원정 시작. 제륵 함대가 협정 행성 경계에 다가오고 있어요.'},
 st_cv_wait:{who:'council',t:'파우니아 쪽 항로가 불안해요. 수송대 신호가 끊겼다 이어졌다 해요.'},
 st_cv_after:{who:'council',t:'지난번 구한 파우니아 수송대가 고맙다며 보급을 보내왔어요.'},
 st_sv_wait:{who:'council',t:'플로라시아에서 씨앗 운반선을 보낸대요. 항로를 지켜야 해요.'},
 st_done:{who:'council',t:'협정 행성들이 조용해요. 오늘은 제륵만 막으면 돼요.'},
 // 사건: 파우니아 수송대 (cv1 → cv2 → cv3)
 cv1_a:{who:'hyeonmu',alt:'purmia_comm',t:'수송대가 쫓기고 있소… 내, 내가 가야 하는데. 다리가 안 움직이오.',ta:'[파우니아 통신] 수송대가 제륵에게 쫓기고 있어요! 길을 열어 주세요!'},
 cv1_b:{who:'council',t:'📡 긴급 지원: 3웨이브 안에 적 50마리 처치 — 수송대가 지나갈 길을 열어 주세요.'},
 cv1_win:{who:'hyeonmu',alt:'purmia_comm',t:'…해냈소. 아이들이 무사하오. 다음엔, 내가 먼저 나서겠소.',ta:'[파우니아 통신] 수송대 무사 통과! 은혜는 잊지 않을게요.'},
 cv1_fail:{who:'hyeonmu',alt:'purmia_comm',t:'늦었소… 아니, 아직이오. 수송대는 다시 길을 찾을 거요.',ta:'[파우니아 통신] 수송대가 후퇴했어요. 다음 원정 때 다시 부탁해요.'},
 cv2_a:{who:'hyeonmu',alt:'purmia_comm',t:'지난번 수송대가 보급을 보냈소. 아이들이 그린 그림도 같이 왔다오.',ta:'[파우니아 통신] 지난번 구해 주신 수송대가 보급품을 보냈어요!'},
 cv3_a:{who:'zeus',alt:'earth_comm',t:'우회로? 그딴 거 필요 없어. 보스는 내가 혼자 지진다!',ta:'[지구 통신] 수송대가 지구 항로로 우회해요. 보스를 빨리 잡아 길을 터 주세요.'},
 cv3_b:{who:'hyeonmu',alt:'purmia_comm',t:'…제욱스, 혼자 가지 마시오. 내가 앞을 막겠소.',ta:'[파우니아 통신] 이번엔 우리 수송대가 끝까지 갈 수 있을까요…'},
 cv3_c:{who:'council',t:'📡 후속 임무: 다음 보스를 나타난 뒤 40초 안에 처치 — 우회로를 열어 주세요.'},
 cv3_win:{who:'zeus',alt:'earth_comm',t:'…고마워, 영감. 혼자였으면 못 했어. 이건 수첩에 적어 둘게.',ta:'[지구 통신] 우회로 확보! 수송대가 무사히 도착했어요.'},
 cv3_win2:{who:'hyeonmu',t:'쿵. …처음으로, 숨지 않았소.'},
 cv3_fail:{who:'zeus',alt:'earth_comm',t:'쳇… 너무 빨랐어. 다음엔 기다릴게. 진짜로.',ta:'[지구 통신] 보스가 너무 오래 버텼어요. 다음 원정에서 다시!'},
 // 사건: 플로라시아 씨앗 (sv1 → sv2)
 sv1_a:{who:'sylvaion',alt:'flora_comm',t:'씨앗 운반선이 지나가. …한 알도 잃고 싶지 않아.',ta:'[플로라시아 통신] 세계수의 씨앗을 실은 배가 지나가요!'},
 sv1_b:{who:'council',t:'📡 긴급 지원: 다음 보스를 잡을 때까지 ❤️ 체력을 5 넘게 잃지 마세요.'},
 sv1_win:{who:'sylvaion',alt:'flora_comm',t:'…무사해. 고마워. 이건, 진심이야.',ta:'[플로라시아 통신] 씨앗이 무사히 도착했어요. 숲이 기뻐해요.'},
 sv1_fail:{who:'sylvaion',alt:'flora_comm',t:'괜찮아. 씨앗은 또 맺혀. …너만 무사하면 돼.',ta:'[플로라시아 통신] 운반선이 돌아갔어요. 다음에 다시 보낼게요.'},
 sv2_a:{who:'sylvaion',alt:'flora_comm',t:'그때 씨앗, 싹 텄어. 네 이름 붙여 뒀어. …말하지 마, 아무한테도.',ta:'[플로라시아 통신] 그때 지킨 씨앗이 싹을 틔웠대요! 이번 원정엔 회복 상한 +1.'},
 sv2_b:{who:'hyeonmu',t:'실바이온이 이름을 붙였다니… 천 년 동안 처음 보는 일이오.'},
 // 구간 전환(준비 8초 동안)
 zn_any:{who:'council',t:'구간 변경! 길이 바뀌어요. 준비 시간에 영웅 자리를 다시 잡으세요.'},
 zn_hy_cv:{who:'hyeonmu',t:'길이 바뀌어도 걱정 마시오. 지난번처럼, 내가 앞을 막겠소.'},
 zn_hy:{who:'hyeonmu',t:'땅이 흔들리오… 괜찮소, 괜찮소. 발을 구르면 멈추오.'},
 zn_ze:{who:'zeus',t:'새 길이다! 번쩍, 기대되는데?'},
 zn_ze_bond:{who:'zeus',t:'영감, 이번에도 앞은 맡길게. …그 대신 뒤는 내가 다 태울게.'},
 zn_sy:{who:'sylvaion',t:'길이 바뀌었어. 다친 사람 있으면 말해.'},
 zn_sy_seed:{who:'sylvaion',t:'씨앗이 자라는 동안엔, 아무도 안 쓰러지게 할 거야.'},
 // 전투 반응(실제 사건이 일어났을 때만)
 bk_hy:{who:'hyeonmu',t:'…쓰러졌소? 휴. 다리가 아직 떨리오.'},
 bk_hy2:{who:'hyeonmu',r:2,t:'모두 무사하오. 이번엔 숨지 않았소.'},
 bk_ze:{who:'zeus',t:'번쩍! 봤지? 보스도 별거 아니—'},
 bk_ze2:{who:'zeus',r:2,t:'영감이 막아 준 덕이야. 수첩에 적어 둘게.'},
 bk_sy:{who:'sylvaion',t:'끝났어. 다들 숨 쉬고 있지?'},
 bl_hy:{who:'hyeonmu',t:'여기서 멈추시오! …쿵!'},
 bl_hy2:{who:'hyeonmu',r:2,t:'지금이오, 제욱스! 내가 붙잡고 있겠소!'},
 mk_ze:{who:'zeus',t:'한 방에 우르르! 이 정도는 기본이지.'},
 mk_ze2:{who:'zeus',r:2,t:'영감이 모아 준 덕에 한 번에 지졌어!'},
 hl_sy:{who:'sylvaion',t:'…버텨. 잎 한 장 나눠 줄게.'},
 hl_sy2:{who:'sylvaion',r:2,t:'무리하지 마. 네가 쓰러지면 씨앗도 슬퍼해.'},
 hp_sy:{who:'sylvaion',t:'체력이 바닥이야. 지금 물러설 순 없어… 내가 붙잡을게.'},
 hp_hy:{who:'hyeonmu',t:'위험하오! 모두 내 뒤로 오시오!'},
 hp_ze:{who:'zeus',t:'괜, 괜찮아! 아직 번개 남았어!'},
 // 일상·관계(가끔)
 dy_hy0:{who:'hyeonmu',r0:0,t:'…위원회 분, 오늘 날씨가 좋소. 그, 그냥 그렇다고.'},
 dy_hy1:{who:'hyeonmu',r:1,t:'파우니아 아이들이 위원회 분 그림을 그렸다오. 조금 닮았소.'},
 dy_hy2:{who:'hyeonmu',r:2,t:'제욱스가 시끄럽긴 해도… 뒤에 있으면 마음이 놓이오.'},
 dy_hy3:{who:'hyeonmu',r:3,t:'천 년 동안 숨어만 살았소. 이제는 앞에 서는 게 무섭지 않소.'},
 dy_ze0:{who:'zeus',r0:0,t:'지구엔 전기가 끊긴 동네가 많아. …아, 아무것도 아냐.'},
 dy_ze2:{who:'zeus',r:2,t:'수첩이 벌써 반이나 찼어. 누구 이름이냐고? 비밀.'},
 dy_ze3:{who:'zeus',r:3,t:'예전엔 혼자 다 하는 게 영웅인 줄 알았어. 지금은… 같이 버티는 게 더 멋져.'},
 dy_sy0:{who:'sylvaion',r0:0,t:'…뭘 봐. 싸움에 집중해.'},
 dy_sy1:{who:'sylvaion',r:1,t:'현무는 천 년째 저래. 겁쟁이인데, 한 번도 친구를 버린 적은 없어.'},
 dy_sy2:{who:'sylvaion',r:2,t:'불씨(제욱스)가 또 앞으로 튀어 나가. …내가 뒤에서 받쳐야지.'},
 dy_sy3:{who:'sylvaion',r:2,t:'오늘도 다 같이 돌아가자. 그게 내 유일한 부탁이야.'},
 dy_hz:{who:'zeus',with:'hyeonmu',t:'영감, 거북이 등딱지는 번개도 막아? …시험은 안 해 볼게.'},
 dy_zs:{who:'sylvaion',with:'zeus',t:'불씨, 혼자 나가지 마. 이건 잔소리 아니고 부탁이야.'}};
const SW={council:{n:'위원회',e:'🛰️'},purmia_comm:{n:'파우니아 통신',e:'📡'},earth_comm:{n:'지구 통신',e:'📡'},flora_comm:{n:'플로라시아 통신',e:'📡'}};
// 사건: 조건·참여 인물·선행·결과·후속·반복
const SEV={
 cv1:{chain:'convoy',n:'파우니아 수송대 구조',pl:['purmia'],who:['hyeonmu'],pre:[],w:[12,70],intro:['cv1_a','cv1_b'],short:'cv1_b',
  goal:{t:'적 처치',n:50,waves:3,get:()=>G.kills},win:{line:'cv1_win',rel:{hyeonmu:1},unlock:['cv2'],coins:300,box:2},fail:{line:'cv1_fail'},rep:'until_win'},
 cv2:{chain:'convoy',n:'수송대의 감사 보급',pl:['purmia'],who:['hyeonmu'],pre:['cv1'],auto:'start',intro:['cv2_a'],win:{rel:{hyeonmu:2},unlock:['cv3'],coins:400},rep:'once'},
 cv3:{chain:'convoy',n:'지구 우회로 호위',pl:['purmia'],who:['zeus','hyeonmu'],pre:['cv2'],w:[25,95],bossWave:1,intro:['cv3_a','cv3_b','cv3_c'],short:'cv3_c',
  goal:{t:'보스 40초 안에 처치',boss:40},win:{line:'cv3_win',line2:'cv3_win2',rel:{hyeonmu:3,zeus:2},box:3},fail:{line:'cv3_fail'},rep:'until_win'},
 sv1:{chain:'seed',n:'세계수 씨앗 운반',pl:['florasia'],who:['sylvaion'],pre:[],w:[15,80],intro:['sv1_a','sv1_b'],short:'sv1_b',
  goal:{t:'다음 보스까지 체력 5 넘게 잃지 않기',hp:5},win:{line:'sv1_win',rel:{sylvaion:1},unlock:['sv2'],coins:300,box:2},fail:{line:'sv1_fail'},rep:'until_win'},
 sv2:{chain:'seed',n:'싹 튼 씨앗',pl:['florasia'],who:['sylvaion','hyeonmu'],pre:['sv1'],auto:'start',intro:['sv2_a','sv2_b'],win:{rel:{sylvaion:2},buff:'healcap'},rep:'once'}};
const STORY_GAP=9000,STORY_SHOW=4600,LINE_CD=150000,LINE_RECENT=4,IDLE_GAP=[22000,40000],EV_CD=35000;  // v304: 같은 대사는 실제 시간 150초 뒤 다시 가능, 최근 4줄은 제외, 일상 대화 22~40초 간격, 같은 종류 전투 반응 35초 간격
function lineFree(id,now){const t=G.sty.used[id];if(t&&now-t<LINE_CD)return false;return !(G.sty.rec||[]).includes(id)}  // 대사 사이 최소 간격·한 줄 표시 시간(실제 시간 ms, 배속과 무관)
function sty(){SAVE.story=SAVE.story||{};const S=SAVE.story;for(const k of ['done','tries','claim','rel','met'])S[k]=S[k]||{};delete S.seen;delete S.recent;delete S.log;return S}
function onField(u){return !!(G&&G.cells.some(c=>c&&c.u===u))}
function relOf(u){return sty().rel[u]||0}
function relUp(u,l){const S=sty();if((S.rel[u]||0)<l){S.rel[u]=l;return true}return false}
function evDone(e){return sty().done[e]==='win'}
function preOK(E){return E.pre.every(evDone)}
// 대사 하나를 화자 상황에 맞게: 화자가 없으면 대체 화자(행성 통신), 그것도 없으면 null(재생 안 함)
function lineFor(id){const L=SL[id];if(!L)return null;if(L.who==='council'||SW[L.who])return {id,who:L.who,t:L.t};if(onField(L.who)&&(!L.with||onField(L.with)))return {id,who:L.who,t:L.t};if(L.alt&&L.ta)return {id:id+'#alt',who:L.alt,t:L.ta};return null}
// 대기열: 중요도 높은 것 먼저, 오래된 반응(ttl 지남)은 버림, 같은 판 같은 일상 대사 반복 금지
function say(id,o){o=o||{};if(!G||!G.sty)return false;const S=sty(),L=lineFor(id);if(!L)return false;const imp=o.p>=2;if(SAVE.storyOff&&!imp)return false;
  const now=performance.now();if(!o.rep&&!lineFree(L.id,now))return false;if(G.sty.q.some(x=>x.id===L.id)||(G.sty.cur&&G.sty.cur.id===L.id))return false;G.sty.q.push(Object.assign({},L,{p:o.p||0,exp:now+(o.ttl||6000),req:o.req,skipTo:o.skipTo}));G.sty.q.sort((a,b)=>b.p-a.p);if(G.sty.q.length>6)G.sty.q.length=6;return true}
function commTick(){if(!G||!G.sty)return;const C=$('comm');if(!C)return;const now=performance.now(),Q=G.sty.q;
  if(G.sty.cur&&now<G.sty.cur.until)return;if(G.sty.cur){G.sty.cur=null;C.classList.remove('on')}
  while(Q.length&&Q[0].exp<now)Q.shift();if(!Q.length)return;const gap=Q[0].p>=2||G.sty.chain?1200:STORY_GAP;if(now-(G.sty.lastAt||0)<gap)return;
  const L=Q.shift();G.sty.used[L.id]=now;const S=sty();G.sty.rec=(G.sty.rec||[]);G.sty.rec.push(L.id);if(G.sty.rec.length>LINE_RECENT)G.sty.rec.shift();G.sty.lastAt=now;G.sty.chain=Q.length&&Q[0].p>=1;
  const sp=SCH[L.who],sw=SW[L.who]||(String(L.who).startsWith('pq:')?{n:PLANETS[L.who.slice(3)]+' 긴급 통신',e:'📡',img:PICON[L.who.slice(3)]}:null);G.sty.cur=Object.assign(L,{until:now+(L.req?STORY_SHOW+2400:STORY_SHOW)});
  C.innerHTML=(sp&&U[L.who]&&U[L.who].url?'<img src="'+cardUrl(L.who)+'" alt="">':sw&&sw.img?'<img src="'+sw.img+'" alt="">':'<i>'+(sw?sw.e:'💬')+'</i>')+'<span><b style="color:'+(sp?sp.c:'#bfe8ff')+'">'+(sp?sp.n:sw?sw.n:'')+'</b> '+String(L.t).replace(/^\s*\[[^\]]*\]\s*/,'')+(L.req||(L.pqk&&G.pq&&G.pq.st==='offer')?' <u>눌러서 확인</u>':'')+'</span>';C.classList.remove('on');void C.offsetWidth;C.classList.add('on');commPos()}
function commPos(){const C=$('comm'),st=$('stage'),app=$('app');if(!C||!st||!app)return;const r=st.getBoundingClientRect(),a=app.getBoundingClientRect(),top=r.top-a.top,bot=a.bottom-r.bottom;C.style.left=(r.left-a.left+r.width*.03)+'px';C.style.width=(r.width*.94)+'px';
  const ch=C.offsetHeight||32;if(top>=ch+4){C.style.top=(top-ch-2)+'px';C.dataset.m='out'}else if(bot>=ch+4){C.style.top=(r.bottom-a.top+2)+'px';C.dataset.m='out'}else{C.style.top=(top+2)+'px';C.dataset.m='in'}}
// 사건 장면 재생(본 기록은 실제로 화면에 뜰 때 seen에 남음)
function scene(ev,ids,o){o=o||{};ids.forEach((id,j)=>{const L=lineFor(id);if(!L)return;say(id,{p:o.p||1,ttl:30000,rep:1,req:o.req&&j===ids.length-1});const q=G.sty.q.find(x=>x.id===L.id);if(q)q.scene=ev+':'+id})}
// ----- 판 시작/웨이브/틱 -----
function storyStart(){G.sty={used:{},q:[],cur:null,log:[],zoneSaid:{},lastAt:performance.now()-STORY_GAP+3000};const S=sty(),pl=plIn();
  // 원정 시작 한 줄: 사건 진행 상황을 반영
  const cvw=pl.includes('purmia')&&!evDone('cv1'),cva=evDone('cv1')&&!evDone('cv2')&&pl.includes('purmia'),svw=pl.includes('florasia')&&!evDone('sv1');
  if(STORY_OFF)return;G.sched.push({t:2.5,f:()=>{say(cva?'st_cv_after':cvw?'st_cv_wait':svw?'st_sv_wait':Object.keys(SEV).every(evDone)?'st_done':'st_base',{p:1,ttl:20000})}});
  // 자동 사건(감사 보급·싹 튼 씨앗): 시작하고 조금 뒤, 관련 행성이 있을 때만
  for(const k of ['cv2','sv2']){const E=SEV[k];if(evDone(k)||!preOK(E)||!E.pl.every(p=>pl.includes(p)))continue;G.sched.push({t:9,f:()=>{if(G.over)return;scene(k,E.intro,{p:1});storyWin(k)}})}}
const STORY_OFF=1; // v305: 영웅끼리 대사·이야기 사건 끔(사용자 요청). 행성 긴급 통신(pq)만 #comm에 표시
function storyWave(){if(STORY_OFF||!G||!G.sty||G.over)return;const S=sty(),pl=plIn();
  // 처음 출전한 대표 캐릭터: 첫 만남(계정당 1번)
  for(const u in SCH)if(!S.met[u]&&onField(u)){S.met[u]=1;relUp(u,0);say('meet_'+u,{p:1,ttl:20000});break}
  if(G.sty.req||G.pq)return;
  for(const k in SEV){const E=SEV[k];if(E.auto||evDone(k)||!preOK(E)||G.sty.log.some(x=>x.e===k))continue;if(!E.pl.every(p=>pl.includes(p)))continue;if(G.wave<E.w[0]||G.wave>E.w[1])continue;if(E.bossWave&&G.wave%10>7)continue;if(Math.random()>.45)continue;
    const re=(S.tries[k]||0)>0;G.sty.req={e:k,st:'offer',exp:G.wave+2};G.sty.log.push({e:k,r:'offer'});scene(k,re?[E.short]:E.intro,{p:2,req:1});return}
  const R=G.sty.req;if(R&&R.st==='offer'&&G.wave>R.exp){G.sty.req=null}}
function reqAccept(){const R=G.sty&&G.sty.req;if(!R||R.st!=='offer')return;const E=SEV[R.e];R.st='on';R.w0=G.wave;R.k0=G.kills;R.h0=G.hpLost||0;R.bw=null;sty().tries[R.e]=(sty().tries[R.e]||0)+1;const lg=G.sty.log.find(x=>x.e===R.e);if(lg)lg.r='on';toast('📡 수락 — '+E.n);$('reqP').style.display='none'}
function reqLater(){const R=G.sty&&G.sty.req;if(R&&R.st==='offer'){G.sty.req=null;const lg=G.sty.log.find(x=>x.e===R.e);if(lg)lg.r='later'}$('reqP').style.display='none'}
function storyTick(){if(!G||!G.sty)return;const R=G.sty.req;if(!R||R.st!=='on'||G.over)return;const E=SEV[R.e],g=E.goal;
  if(g.n){const v=G.kills-R.k0;R.v=v;if(v>=g.n)return storyWin(R.e);if(G.wave>=R.w0+g.waves)return storyFail(R.e)}
  else if(g.boss){const b=G.mobs.find(m=>m.boss&&!m.esc&&m.hp>0);if(b&&R.bw==null){R.bw=G.wave;R.bt=G.time}if(R.bw!=null){R.v=Math.max(0,Math.ceil(g.boss-(G.time-R.bt)));if(!b&&!R.bd){R.bd=1;return G.time-R.bt<=g.boss?storyWin(R.e):storyFail(R.e)}if(G.time-R.bt>g.boss)return storyFail(R.e)}}
  else if(g.hp){const lost=(G.hpLost||0)-R.h0;R.v=lost;if(lost>g.hp)return storyFail(R.e);if(isBoss(G.wave)&&G.wave>R.w0)R.bw=1;if(R.bw&&!G.mobs.some(m=>m.boss&&m.hp>0)&&!G.mobs.some(m=>m.esc))return storyWin(R.e)}}
function storyWin(k){const E=SEV[k],S=sty(),W=E.win||{};const first=!S.claim[k];S.done[k]='win';if(G.sty.req&&G.sty.req.e===k)G.sty.req=null;
  for(const u in W.rel||{})relUp(u,W.rel[u]);if(W.coins)G.coins+=W.coins;if(W.buff==='healcap')G.styHeal=1;
  if(first&&W.box){S.claim[k]=1;SAVE.boxes=(SAVE.boxes||0)+W.box;toast('📡 '+E.n+' 성공! 🪙+'+(W.coins||0)+' · 🎁 랜덤박스 +'+W.box+' (처음 1번)')}else if(W.coins)toast('📡 '+E.n+' 완료 · 🪙+'+W.coins);
  if(W.line)say(W.line,{p:2,ttl:20000,rep:1});if(W.line2)say(W.line2,{p:1,ttl:25000,rep:1});
  const lg=G.sty.log.find(x=>x.e===k);if(lg)lg.r='win';else G.sty.log.push({e:k,r:'win'});saveAll()}
function storyFail(k){const E=SEV[k],S=sty();if(S.done[k]!=='win')S.done[k]='fail';G.sty.req=null;if(E.fail&&E.fail.line)say(E.fail.line,{p:2,ttl:20000,rep:1});toast('📡 '+E.n+' 실패 — 다음 원정에서 다시 도전할 수 있어요');const lg=G.sty.log.find(x=>x.e===k);if(lg)lg.r='fail';saveAll()}
// 실제 전투 사건에 대한 반응(해당 영웅이 출전 중이고 실제로 그 일을 했을 때만, 오래 지나면 버림)
function storyEv(type,o){if(STORY_OFF||!G||!G.sty||G.over||G.pause||G.menu)return;const now=performance.now();G.sty.evT=G.sty.evT||{};if(now-(G.sty.evT[type]||-1e9)<EV_CD)return;const pk=(base,u)=>{const r=relOf(u),hi=base+'2';return SL[hi]&&r>=2&&lineFree(hi,now)?hi:base};const sy=(id,op)=>{if(say(id,op))G.sty.evT[type]=now};
  if(type==='boss'){const u=o&&o.u&&SCH[o.u]?o.u:Object.keys(SCH).find(onField);if(!u)return;sy(pk({hyeonmu:'bk_hy',zeus:'bk_ze',sylvaion:'bk_sy'}[u],u),{ttl:3500})}
  else if(type==='block'&&o.u==='hyeonmu'&&o.n>=4)sy(pk('bl_hy','hyeonmu'),{ttl:3000});
  else if(type==='multi'&&o.u==='zeus'&&o.n>=6)sy(pk('mk_ze','zeus'),{ttl:3000});
  else if(type==='heal'&&o.u==='sylvaion')sy(pk('hl_sy','sylvaion'),{ttl:3500});
  else if(type==='hp'){const u=['sylvaion','hyeonmu','zeus'].find(onField);if(u)sy({sylvaion:'hp_sy',hyeonmu:'hp_hy',zeus:'hp_ze'}[u],{p:1,ttl:3000})}}
// 일상 대화: 조용할 때 가끔(최근 본 것은 뒤로, 같은 판 반복 없음, 관계 단계 반영)
function storyIdle(){if(STORY_OFF||!G||!G.sty||G.over||SAVE.storyOff||G.pause||G.menu)return;const now=performance.now();if(!G.sty.idleAt)G.sty.idleAt=now+IDLE_GAP[0];if(now<G.sty.idleAt||G.sty.q.length||G.sty.cur||now-(G.sty.lastAt||0)<STORY_GAP)return;
  const r=relOf,C=Object.keys(SL).filter(id=>id.startsWith('dy_')&&lineFree(id,now)).filter(id=>{const L=SL[id];if(!onField(L.who)||(L.with&&!onField(L.with)))return false;const v=r(L.who);if(L.r0!=null&&v!==L.r0)return false;if(L.r!=null&&v<L.r)return false;return true});
  if(!C.length){G.sty.idleAt=now+12000;return}  // 맞는 대사가 없으면 조용히, 12초 뒤 다시 확인
  C.sort((a,b)=>(G.sty.used[a]||0)-(G.sty.used[b]||0)||Math.random()-.5);say(C[0],{ttl:8000});G.sty.idleAt=now+IDLE_GAP[0]+Math.random()*(IDLE_GAP[1]-IDLE_GAP[0])}
// 구간 전환: 준비 시간에 짧게(누르면 바로 넘김), 이전 사건 결과 반영
function storyZone(){if(STORY_OFF||!G||!G.sty)return;const ids=['zn_any'];if(onField('hyeonmu'))ids.push(evDone('cv1')?'zn_hy_cv':'zn_hy');if(onField('zeus'))ids.push(evDone('cv3')?'zn_ze_bond':'zn_ze');if(onField('sylvaion'))ids.push(evDone('sv2')?'zn_sy_seed':'zn_sy');ids.slice(0,3).forEach(id=>say(id,{p:1,ttl:12000,rep:1}))}
// 종료 화면: 이번 원정 사건 + 실제 활약 한 줄 + 짧은 반응
function storyEndHTML(){if(!G||!G.sty)return '';const S=G.st||{},rows=[];
  for(const x of G.sty.log){if(x.r==='offer'||x.r==='later')continue;rows.push('📡 '+SEV[x.e].n+' — '+(x.r==='win'?'<b style="color:#7fe8a0">성공</b>':x.r==='fail'?'<b style="color:#ff8a8a">실패</b>':'진행 중 (다음에 재도전)'))}
  const top=Object.keys(S).filter(k=>U[k]).sort((a,b)=>S[b].d-S[a].d)[0];if(top)rows.push('⚔️ <b>'+U[top].n+'</b> — 피해 '+fmt(S[top].d)+(G.bestMk&&G.bestMk.u===top&&G.bestMk.n>=5?' · 한 번에 적 '+G.bestMk.n+'마리 처치':''));
  const cs=Object.keys(S).filter(k=>U[k]&&S[k].cn>0).sort((a,b)=>S[b].cn-S[a].cn)[0];if(cs)rows.push('🧱 <b>'+U[cs].n+'</b> — 적 '+S[cs].cn+'마리의 진격을 '+S[cs].ctrl.toFixed(0)+'초 저지');
  const hs=Object.keys(S).filter(k=>U[k]&&S[k].heal>0).sort((a,b)=>S[b].heal-S[a].heal)[0];if(hs)rows.push('💗 <b>'+U[hs].n+'</b> — 위기에서 ❤️ '+S[hs].heal+' 회복');
  const sp=Object.keys(S).filter(k=>U[k]&&S[k].sup>0).sort((a,b)=>S[b].sup-S[a].sup)[0];if(sp)rows.push('📯 <b>'+U[sp].n+'</b> — 오라로 피해 '+fmt(S[sp].sup)+' 보탬');
  const react=[];if(cs==='hyeonmu'||onField('hyeonmu'))react.push(['hyeonmu',relOf('hyeonmu')>=2?'“다들 무사하오. 다음에도 내가 앞에 서겠소.”':'“…수고했소. 다리가 아직 떨리오.”']);if(top==='zeus'||onField('zeus'))react.push(['zeus',relOf('zeus')>=2?'“혼자가 아니라서 이긴 거야. 진짜로.”':'“번쩍! 다음엔 더 많이 지져 줄게!”']);if(hs==='sylvaion'||onField('sylvaion'))react.push(['sylvaion',relOf('sylvaion')>=2?'“다 같이 돌아왔네. …그거면 됐어.”':'“…다친 데 없어? 그럼 됐어.”']);
  if(!rows.length&&!react.length)return '';
  return '<div class="sEnd"><b>📖 이번 원정</b>'+rows.map(r=>'<div>'+r+'</div>').join('')+react.slice(0,2).map(([u,t])=>'<div class="sR">'+(U[u]&&U[u].url?'<img src="'+cardUrl(u)+'" alt="">':'')+'<span><b style="color:'+SCH[u].c+'">'+SCH[u].n+'</b> '+t+'</span></div>').join('')+'</div>'}
// 항해 기록(메인 화면)
// v304: 항해 기록(사건·대화 기록) 삭제 → 플레이 기록: 실제 성과만(SAVE.rec + 최고 기록·판 수·영웅별 처치)
function playRec(){let D=$('lgB');if(!D){D=document.createElement('div');D.id='lgB';document.body.appendChild(D);D.onclick=e=>{if(e.target===D||e.target.closest('.lgX'))D.style.display='none'}}
  const r=SAVE.rec||{},kt=Object.values(SAVE.kills||{}).reduce((a,b)=>a+b,0),row=(a,b)=>'<div class="lgL" style="display:flex;justify-content:space-between"><span>'+a+'</span><b>'+b+'</b></div>';
  D.innerHTML='<div class="lgp"><button class="lgX">✕</button><h2>📊 플레이 기록</h2>'+row('🏆 최고 웨이브',(SAVE.best||0))+row('🎮 플레이한 판',(SAVE.games||0))+row('⚔️ 누적 처치',kt.toLocaleString())+row('👑 누적 보스 처치',(r.boss||0).toLocaleString())+row('▲ 누적 승급',(r.merge||0).toLocaleString())+row('🌌 우주 히어로 제작',(r.craft||0).toLocaleString())+row('✨ 특수 조합 제작',(r.fuse||0).toLocaleString())+row('📡 행성 긴급 지원 성공',(r.pq||0).toLocaleString())+'<small class="lgN">'+(typeof AC!=='undefined'&&AC.s?'로그인 계정에 저장돼 다른 기기에서도 이어져요':'이 기기에만 저장돼요')+'</small></div>';
  D.style.display='flex'}
function logbook(){playRec()}
function storyMerge(a,b){const A=a||{},B=b||{},o={};for(const k of ['seen','claim','met'])o[k]=Object.assign({},B[k]||{},A[k]||{});o.done={};for(const k of new Set([...Object.keys(A.done||{}),...Object.keys(B.done||{})]))o.done[k]=(A.done||{})[k]==='win'||(B.done||{})[k]==='win'?'win':'fail';
  o.tries={};for(const k of new Set([...Object.keys(A.tries||{}),...Object.keys(B.tries||{})]))o.tries[k]=Math.max((A.tries||{})[k]||0,(B.tries||{})[k]||0);o.rel={};for(const k of new Set([...Object.keys(A.rel||{}),...Object.keys(B.rel||{})]))o.rel[k]=Math.max((A.rel||{})[k]||0,(B.rel||{})[k]||0);
  o.recent=(A.recent||[]).slice(-30);const seenL=new Set(),L=[];for(const x of [...(B.log||[]),...(A.log||[])].sort((p,q)=>p.at-q.at)){const key=x.e+x.at;if(seenL.has(key))continue;seenL.add(key);L.push(x)}o.log=L.slice(-60);return o}

function storyInit(){if($('comm'))return;const a=$('app');const C=document.createElement('div');C.id='comm';a.appendChild(C);const P=document.createElement('div');P.id='reqP';$('stage').appendChild(P);
  C.onclick=()=>{const cur=G&&G.sty&&G.sty.cur;if(cur&&cur.req&&G.sty.req){reqOpen();return}if(cur&&cur.pqk&&G.pq&&G.pq.st==='offer'){pqOpen();return}if(cur){cur.until=0;G.sty.lastAt=performance.now()-STORY_GAP+600}};
  P.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.a==='ok')reqAccept();else reqLater()};
  setInterval(()=>{try{if(G&&!G.over&&!G.pause&&!G.menu){commTick();storyIdle()}else{const c=$('comm');if(c)c.classList.remove('on')}}catch(e){}},250);window.addEventListener('resize',commPos)}
function reqOpen(){const R=G.sty&&G.sty.req;if(!R)return;const E=SEV[R.e],P=$('reqP'),W=E.win||{},first=!sty().claim[R.e];
  P.innerHTML='<b>📡 '+E.n+'</b><div>'+E.goal.t+(E.goal.n?' '+E.goal.n+'마리 · '+E.goal.waves+'웨이브 안':'')+'</div><div class="rw">성공 보상: 🪙'+(W.coins||0)+(W.box&&first?' · 🎁 랜덤박스 '+W.box+' (처음 1번)':'')+(W.rel?' · 관계 진전':'')+'</div><div class="rw">실패해도 불이익 없음 · 다음 원정에서 다시 도전</div>'+(R.st==='offer'?'<button data-a="ok">수락</button><button data-a="no">나중에</button>':'<button data-a="no">닫기</button>');P.style.display='block'}
function storyMsn(){const R=G.sty&&G.sty.req;if(!R)return '';const E=SEV[R.e];if(R.st==='offer')return '<div class="sreq" onclick="reqOpen()">📡 <b>'+E.n+'</b> — 눌러서 보기 · ⏳'+(R.exp-G.wave+1)+'</div>';const g=E.goal;return '<div class="sreq" onclick="reqOpen()">📡 '+E.n+' '+(g.n?(R.v||0)+'/'+g.n+' · ⏳'+(R.w0+g.waves-G.wave):g.boss?(R.bw!=null?'⏱'+R.v+'초':'보스 대기'):'잃은 ❤️ '+(R.v||0)+'/'+g.hp)+'</div>'}

// ---------- 판 기여도 통계: 실제 피해(넘친 피해 제외)·보스 피해·지원 지표 ----------
// G.st[영웅id]={d 실제 피해, b 보스 피해, coin 추가 코인, heal 실제 회복, ctrl 제어 시간(초), cn 제어한 적 수, sup 오라로 늘려 준 피해}
function stO(k){G.st=G.st||{};return G.st[k]||(G.st[k]={d:0,b:0,coin:0,heal:0,ctrl:0,cn:0,sup:0})}
function stDmg(src,r,boss){if(!(r>0))return;const k=src&&src.u?src.u:'_sk',o=stO(k);o.d+=r;if(boss)o.b+=r;
  // 오라 지원 기여: 오라로 곱해진 몫(1-1/pa)을 오라 준 영웅들에게 나눠 기록 — 총피해에는 더하지 않음
  if(src&&src.pa>1&&src.aurL&&src.aurL.length){const g=r*(1-1/src.pa)/src.aurL.length;for(const a of src.aurL)stO(a).sup+=g}}
function hit(m,u,d,dl,src){if(!m||m.hp<=0)return;const h0=m.hp;hit0(m,u,d,dl,src);stDmg(src,h0-Math.max(0,m.hp),m.boss)}
function hit0(m,u,d,dl,src){if(!m||m.hp<=0)return;if(src)m.last=src;if(m.shd>0)d*=.2;if(u.bossK&&m.boss)d*=u.bossK;if(u.exec&&m.hp<m.max*.3)d*=u.exec;if(u.hi&&m.hp>m.max*.5)d*=u.hi;if(u.slx&&(m.sl>0||m.sl2>0))d*=u.slx;if(u.rng)d*=u.rng[0]+Math.random()*(u.rng[1]-u.rng[0]);if(m.k===2&&!m.boss&&!(m.vu>0))d*=.75;if(G.aug){if(G.aug.cc&&(m.st>0||m.rt>0||m.blkT>0||m._wh))d*=2;if(G.aug.chill&&(m.sl>0||m.sl2>0))d*=1.4;if(G.aset){if(G.aset.ctrl&&(m.st>0||m.rt>0))d*=1.5;if(G.aset.ice&&(m.sl>0||m.sl2>0||m.st>0))d*=1.5;if(G.aset.poison&&m.dotT>0)d*=1.25;if(G.aset.hunt&&m.boss)d*=1.5}}
  if(m.boss&&A('bossbane'))d*=1.6;if(m.boss&&A('hunt'))d*=2;if(m.boss&&A('execute')&&m.hp<m.max*.3)d*=2;let cr=false;const ec=u.planet==='earth'&&G.plOn&&G.plOn.earth>0,crc=(u.cr||0)+(ec?.15:0)+(u.bm&&A('crit')?.15:0);if(crc&&Math.random()<crc){d*=u.cm||(ec?2.5:2);cr=true;if(G.fx.length<220){const[x,y]=pos(m.p);fxs('common/critical',x,y-10,40,{fps:16})}}if(u.exec&&m.hp<m.max*.3&&G.fx.length<230){const[x,y]=pos(m.p);fxs('cacton/execute',x,y-10,48,{fps:14})}if(u.hi&&m.hp>m.max*.5&&Math.random()<.4&&G.fx.length<200){const[x,y]=pos(m.p);fxs('orbin/lifedrain',x,y-10,40,{fps:12})}
  if(m.vu>0)d*=1.3;if(m.vu2>0)d*=A('weak')?1.2:1.12;if(m.boss&&src&&src.u&&FUB[src.u])d*=FUB[src.u];if(src&&src.u&&ROLE[src.u]){const q=ROLE_DMG[ROLE[src.u]];d*=(q.a||1)*(m.boss?(q.b||1):(q.n||1))}if(m.rel>0){let g=clsLv('guard');if(g&&A('wall'))g=Math.min(3,g+1);if(g)d*=[1,1.2,1.4,1.7][g]}if(A('exitguard')&&G.zm==='arrive'&&m.p>PER*.7)d*=1.6;if(m.rel>0&&SO('line'))d*=1.3;m.hp-=d;m.fl=.12;
  {const o=m._tf;if(o&&o.t>0&&o.T-o.t<.35&&G.fx.includes(o)){o.v+=d;o.s=fmt(o.v);if(cr&&!o.cr){o.cr=true;o.t=o.T=.8}}else if(G.fx.length<220&&(cr||m.boss||G.tN<24)){const[x,y]=pos(m.p);G.tN=(G.tN||0)+1;const f={k:'t',x:x+(Math.random()-.5)*12,y:y-10,t:cr?.8:.55,T:cr?.8:.55,v:d,s:fmt(d),cr,dl};m._tf=f;G.fx.push(f)}}
  if(cr)G.shake=Math.max(G.shake,.12);
  if(u.sl)m.sl=Math.max(m.sl,u.sl);if(u.sl2)m.sl2=Math.max(m.sl2||0,u.sl2);if(u.vuc&&Math.random()<u.vuc)m.vu=Math.max(m.vu||0,u.vut);if(u.rtc&&!m.boss&&Math.random()<u.rtc){m.rt=Math.max(m.rt||0,u.rtd);m.rtT=u.rtd}if(u.kbc&&!m.boss&&Math.random()<u.kbc){m.kb=.25;m.kbv=u.kbd/.25}if(u.bm&&A('shock')&&!m.boss&&Math.random()<.1)m.st=Math.max(m.st||0,.6);if(A('reaper')&&!m.boss&&m.hp>0&&m.hp<m.max*.12)m.hp=0;if(A('execute')&&!m.boss&&m.hp>0&&m.hp<m.max*.25)m.hp=0;if(u.dot){m.dot=Math.max(m.dotT>0?m.dot:0,d*u.dot*(A('venom')?2:1));m.dotT=u.dott;m.dsrc=src}else if(A('venom')&&d>0&&!dl){m.dot=Math.max(m.dotT>0?m.dot:0,d*(SO('poison')?.3:.1));m.dotT=Math.max(m.dotT||0,3);m.dsrc=src}
  if(u.rt&&!m.boss){m.rt=Math.max(m.rt||0,u.rt);m.rtT=u.rt}if(u.vu2)m.vu2=Math.max(m.vu2||0,u.vu2);else if(u.bm&&A('weak'))m.vu2=Math.max(m.vu2||0,3);if(u.fmk&&src)markSet(m,src,u.fmk);
  if(u.st&&!m.boss&&Math.random()<u.st)m.st=1
}
const CUTIN={heukjo:__P(2262),yeongwol:__P(2263),noeha:__P(2264),bideung:__P(2265),poseidon:__P(2266),wolroe:__P(2267),cheora:__P(2268),nox:__P(2269),clockweaver:__P(2270),jeokhwang:__P(2271),jinmu:__P(2272),astraon:__P(2273),hwangryong:__P(2274),unhwa:__P(2275),yeongeopsu:__P(2276),baekho:__P(2277),jujak:__P(2278),cheongryong:__P(2279),hyeonmu:__P(2280),selene:__P(2281),chronel:__P(2282),sylvaion:__P(2283),belkaon:__P(2284),zeus:__P(2285),archeon:__P(2286),lunette:__P(2287)},CUTCOL={baekho:'#e8f6ff',jujak:'#ff6a2a',cheongryong:'#7fd0ff',hyeonmu:'#3fe0b0',selene:'#b9a4ff',chronel:'#8fd0ff',sylvaion:'#b6f04a',belkaon:'#3fe08a',zeus:'#ffd23e',archeon:'#5fd8ff',lunette:'#c77dff',clockweaver:'#c48bff',jeokhwang:'#ff7a2a',jinmu:'#3fe0d0',astraon:'#8fd8ff',hwangryong:'#ffd23e',unhwa:'#ff5a9a',yeongeopsu:'#ffcf5a',nox:'#c9a6ff',cheora:'#5fe0ff',wolroe:'#9fb8ff',bideung:'#5fe8e0',noeha:'#7fc8ff',poseidon:'#5fd8ff',yeongwol:'#b89cff',heukjo:'#e0b040'};let cutT=0;
const CUT_LT={};
// 연출 간소화: 영웅 종류마다 이번 판 첫 번째만 전체 컷인, 이미 컷인이 떠 있으면 겹치지 않고 건너뜀(대기열 없음)
const CUT_CRAFT_ONCE=1; // (제안·미확정) 조합 연출도 종류별 첫 획득만 컷인, 재조합은 작은 알림
function cutOnce(key,k,txt){G.cutSeen=G.cutSeen||{};if(G.cutSeen[key])return false;G.cutSeen[key]=1;const now=performance.now();if(now-(G.cutRT||-1e9)<1400)return false;if(!cutin(k,txt))return false;G.cutRT=now;return true}
function cutin(k,txt){const e=$('cutin');if(!CUTIN[k]||!e)return false;e.style.setProperty('--cc',CUTCOL[k]);const lt=!!CUT_LT[k],pr=txt.split(' — ');e.classList.toggle('lt',lt);e.innerHTML='<img src="'+CUTIN[k]+'" alt=""><b>'+(lt&&pr.length>1?pr[0]+'<small>'+pr.slice(1).join(' — ')+'</small>':txt)+'</b>';SND.play('cutin');e.classList.remove('on');void e.offsetWidth;e.classList.add('on');clearTimeout(cutT);cutT=setTimeout(()=>e.classList.remove('on'),1320);return true}
function nthHit(h,m,u){const n=h.nh,[x,y]=pos(m.p);{const pk=h.c&&U[h.c.u]&&U[h.c.u].pk;if(pk&&pk.sfxhit&&G.fx.length<320){const T=pk.sfxhit.length/12;G.fx.push({k:'seq',imgs:pk.sfxhit,fps:12,w:n.r?n.r*2.4:CS*1.3,x,y,t:T,T,dl:0})}}if(G.fx.length<300){G.fx.push({k:'ring',x,y,r:n.r||22,t:.3,T:.3,c:u.col||'#ffe066',dl:0});G.fx.push({k:'star',x,y:y-6,r:18,t:.22,T:.22,c:'#fff',dl:0})}G.shake=Math.max(G.shake,.12);
  if(n.r)for(const o of G.mobs){if(o===m||o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p);if(Math.hypot(ox-x,oy-y)<=n.r){hit(o,{},h.d*(n.af||.5),0,h.c);if(n.st&&!o.boss)o.st=Math.max(o.st||0,n.st)}}if(n.st&&!m.boss&&m.hp>0)m.st=Math.max(m.st||0,n.st)}
function shapeHit(h,m,u){const ci=G.cells.indexOf(h.c);if(ci<0)return;const[sx,sy]=sockXY(h.c,ci,u,'attack'),a=Math.atan2(h.y-sy,h.x-sx),nx=Math.cos(a),ny=Math.sin(a),R=u.r+CS*.3;let n=0;
  if(u.pk&&u.pk.shp&&G.fx.length<300){if(u.shp==='line')G.fx.push({k:'bimg',imgs:u.pk.shp,x:sx,y:sy,a,L:R,w:CS*.75,t:.28,T:.28,dl:0});else G.fx.push({k:'seq',imgs:u.pk.shp,fps:14,w:R*1.5,x:sx+nx*R*.45,y:sy+ny*R*.45,t:.3,T:.3,dl:0,fl:nx<0?-1:1})}
  for(const o of G.mobs){if(o===m||o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p),dx=ox-sx,dy=oy-sy,al=dx*nx+dy*ny;if(al<0||al>R)continue;
    if(u.shp==='line'){if(Math.abs(-dx*ny+dy*nx)>u.sw*CS)continue}else{let da=Math.abs(Math.atan2(dy,dx)-a);if(da>Math.PI)da=2*Math.PI-da;if(da>u.sa*Math.PI/180)continue}
    hit(o,u,h.d*u.sf2,0,h.c);n++;if(u.smax&&n>=u.smax)break}if(n>=2)bombBlast(h.c,h.x,h.y,h.d)}
// 폭격수: 한 공격에 3명 이상 맞으면 추가 폭발 1번(영웅마다 쿨). 폭발은 다시 폭발을 부르지 않음(hit에 {}만 넘김, bombBlast를 안 부름)
function bombBlast(c,x,y,d){const L=c&&HCLS[c.u]==='bomb'?clsLv('bomb'):0;if(!L||(c.bmbT||0)>G.time)return;c.bmbT=G.time+[0,3,2.5,2][L];const k=[0,.4,.7,1][L],R=CS;if(G.fx.length<320){G.fx.push({k:'ring',x,y,r:R,t:.3,T:.3,c:'#ff9f2e',dl:.05});G.fx.push({k:'ray',x,y,t:.35,T:.35,c:'#ffb85a'})}for(const o of G.mobs){if(o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p);if(Math.hypot(ox-x,oy-y)<=R)hit(o,{},d*k,0,c)}}
function bounce(m0,n,dmg,c,pk,hop,w){const seen=new Set([m0]);let cur=m0,[px,py]=pos(m0.p);for(let k=0;k<n;k++){let nb=null,bd=hop;for(const o of G.mobs){if(o.hp<=0||o.p<28||seen.has(o))continue;const[ox,oy]=pos(o.p),dd=Math.hypot(ox-px,oy-py);if(dd<bd){bd=dd;nb=o}}if(!nb)break;seen.add(nb);const[nx,ny]=pos(nb.p),dl=.06*(k+1);if(pk&&pk.chain)G.fx.push({k:'bimg',imgs:pk.chain,x:px,y:py,a:Math.atan2(ny-py,nx-px),L:Math.hypot(nx-px,ny-py),w:30,t:.3,T:.3,dl});else G.fx.push({k:'zap',x1:px,y1:py,x2:nx,y2:ny,t:.3,T:.3,c:'#ff7ad9',w:2.2,dl});if(pk&&pk.hit&&G.fx.length<340)G.fx.push({k:'seq',imgs:pk.hit,fps:pk.cfg.hitFps,w:w||pk.cfg.hitW,m:nb,x:nx,y:ny,t:pk.hit.length/pk.cfg.hitFps,T:pk.hit.length/pk.cfg.hitFps,dl});hit(nb,{},dmg,dl,c);px=nx;py=ny}}
const STIMG={"sl":[__P(2288),__P(2289)],"st":[__P(2290),__P(2291)],"rt":[__P(2292),__P(2293)],"vu":[__P(2294),__P(2295)],"sp":[__P(2296),__P(2297)]},STI={};if(typeof Image!=='undefined')for(const k in STIMG)STI[k]=STIMG[k].map(s=>{const im=new Image();im.src=s;return im});
setTimeout(()=>{if(typeof V5I!=='undefined'&&V5I['status/dot'])STI.dot=V5I['status/dot']},0);
function burst(x,y,t,big){const col=TC[t]||'#ffd23e',P=o=>{if(G.fx.length<340)G.fx.push(o)};P({k:'ray',x,y,t:.6,T:.6,c:col});for(let q=0;q<(big?4:2);q++)P({k:'ring',x,y,r:30+t*14+q*22,t:.45,T:.45,c:q%2?'#fff':col,dl:q*.07});P({k:'star',x,y:y-6,r:16+t*5,t:.25,T:.25,c:'#fff',dl:0});parts(x,y,10+t*7,col,90+t*35,2.6+t*.5);parts(x,y,6+t*3,'#fff',70+t*25,2.2);G.shake=Math.max(G.shake,.1+t*.09);if(t>=2){G.flash=Math.max(G.flash||0,.1+t*.03);G.hs=Math.max(G.hs||0,t>=3?.16:.08)}}
function buffFx(x1,y1,x2,y2,txt,col,imgs){if(G.fx.length>330)return;if(imgs)G.fx.push({k:'bimg',imgs,x:x1,y:y1-8,a:Math.atan2(y2-y1,x2-x1),L:Math.hypot(x2-x1,y2-y1),w:46,t:.6,T:.6,dl:0});else G.fx.push({k:'tr',x1,y1:y1-8,x2,y2:y2-8,w:4,c:col,t:.4,T:.4,dl:0});G.fx.push({k:'ring',x:x2,y:y2,r:20,t:.45,T:.45,c:col,dl:.1});G.fx.push({k:'t',x:x2,y:y2-24,t:1.1,T:1.1,s:txt,cr:false,dl:.12})}

// ---------- 판 안 재미 요소: 미션 · 현상금 · 보상 선택 · 조합 목표 ----------
// v304: 일반 미션 → 자연 달성형 성장 보상. 판 시작부터 모든 목표를 동시에 누적 집계(표시 여부와 무관), 달성 즉시 자동 지급.
//  반복 목표: 다음 목표 = 이전 목표 + 단계량(누적 기준이라 넘친 진행량은 다음 단계로 그대로 이어짐). 한 번에 여러 단계도 모두 지급.
//  기본: 적 처치·보스 처치·웨이브 도달 / 보조(작은 보상): 승급·조합. 소환·복권·도박 횟수 목표 없음, 특정 영웅·행성 요구 없음.
const MISSIONS=[
 {id:'kill',e:'⚔️',t:'적 처치',step:w=>60,get:()=>G.kills,rw:w=>({c:Math.round(20+w*1.5)})},
 {id:'boss',e:'👑',t:'보스 처치',step:()=>1,get:()=>G.nBossK||0,rw:w=>({c:Math.round(40+w*2),s:1})},
 {id:'wave',e:'🌊',t:'웨이브 도달',step:()=>5,get:()=>G.wave,rw:w=>({s:1,c:Math.round(20+w)})},
 {id:'merge',e:'▲',t:'승급',step:()=>10,get:()=>G.nMerge||0,rw:()=>({s:1}),sub:1},
 {id:'craft',e:'✦',t:'조합',step:()=>2,get:()=>(G.nCraft||0)+(G.nFuse||0),rw:()=>({s:1}),sub:1}];
const MSN_K=()=>A('quest')?1.5:1;
function msnInit(){G.mst={};for(const d of MISSIONS)G.mst[d.id]={goal:d.step(0),lv:0};G.msnC=0;G.msnS=0;G.msAcc=null}
// v305: 일반 미션 삭제(사용자 요청). #msn은 이야기 지원 요청이 있을 때만 그 진행을 보여 줌.
const MSN_OFF=1;
function msnTick(){if(MSN_OFF){augUI();return}if(!G.mst)msnInit();const E=$('msn');
  for(const d of MISSIONS){const st=G.mst[d.id],v=d.get();let g=0;while(v>=st.goal&&g++<50){const r=d.rw(G.wave),k=MSN_K(),c=Math.round((r.c||0)*k),sn=Math.round((r.s||0)*k);G.coins+=c;G.stones+=sn;G.msnC+=c;G.msnS+=sn;st.lv++;st.goal+=d.step(G.wave);G.nMsn=(G.nMsn||0)+1;
    const A2=G.msAcc||(G.msAcc={n:0,c:0,s:0,t:performance.now(),ids:[]});A2.n++;A2.c+=c;A2.s+=sn;if(!A2.ids.includes(d.e))A2.ids.push(d.e)}}
  if(G.msAcc&&performance.now()-G.msAcc.t>700){const a=G.msAcc;G.msAcc=null;SND.play('mission');toast('📜 목표 달성'+(a.n>1?' ×'+a.n:'')+' '+a.ids.join('')+' — '+(a.c?'🪙+'+a.c+' ':'')+(a.s?'🍀+'+a.s:''));if(E){E.classList.remove('done');void E.offsetWidth;E.classList.add('done')}}
  if(!E)return;let best=null,bp=-1;for(const d of MISSIONS){if(d.sub)continue;const st=G.mst[d.id],st0=st.goal-d.step(G.wave),pr=Math.max(0,Math.min(1,(d.get()-st0)/Math.max(1,st.goal-st0)));if(pr>bp){bp=pr;best=d}}
  const d=best,st=G.mst[d.id],v=d.get(),r=d.rw(G.wave),k=d.id+v+'_'+st.goal+'_'+G.wave+'_'+(G.sty&&G.sty.req?G.sty.req.st+(G.sty.req.v||0):'');
  if(k!==G.msK){G.msK=k;const st0=st.goal-d.step(G.wave);E.innerHTML='📜 <b>'+d.e+' '+d.t+' '+v+'/'+st.goal+'</b><div class="bar"><i style="width:'+Math.max(0,Math.min(100,(v-st0)/Math.max(1,st.goal-st0)*100))+'%"></i></div>'+(r.c?'🪙'+Math.round(r.c*MSN_K())+' ':'')+(r.s?'🍀'+Math.round(r.s*MSN_K()):'')+'<div style="font-size:.85em;opacity:.85;white-space:nowrap;overflow:hidden">'+MISSIONS.filter(x=>!x.sub&&x!==d).map(x=>x.e+(x.get())+'/'+G.mst[x.id].goal).join(' ')+' · 자동</div>'+storyMsn()}}
// v304: 현상금 → 행성 긴급 지원 요청(선택형). 동시에 1개, 수락은 선택(무시·거절·만료 불이익 없음).
//  흐름: 요청 도착(작은 통신 + 오른쪽 위 버튼) → 누르면 목표·난도·보상·실패 결과 → 수락하면 목표 시작 → 성공 시 감사 통신 + 자동 지급.
//  수락 대기: 실제 시간 30초(배속과 무관하게 읽을 시간). 진행 타이머: 게임 시간(배속 반영, 일시정지·구간 준비 시간엔 멈춤).
//  특수 적: 일반 적과 같이 적 수(순환형 100마리 기준)에 포함. 도착형에서 출구에 닿으면 정예 도착 피해(❤️-3)만 받고 요청 실패 — 실패 벌칙은 따로 안 줌(이중 적용 없음).
//  구간 전환: 진행 중 요청은 준비 시간 동안 타이머 정지, 특수 적은 다른 적처럼 옮겨짐. 수락 대기 중이면 대기 시간도 멈춤.
const PQ_DEF={
 earth:{n:'폭주 전차 저지',ty:'stop',x:'탈주한 전차 부대가 시가지로 향하고 있어! 막아 줘.',th:'고마워, 시민들이 무사해.',rw:'coin'},
 purmia:{n:'밀렵꾼 소탕',ty:'swarm',x:'밀렵꾼 무리가 숲에 들어왔어요. 몰아내 주세요!',th:'아이들이 다시 뛰어놀아요. 고마워요!',rw:'heal'},
 toytopia:{n:'고장 난 태엽 거인',ty:'stop',x:'거대 태엽 인형이 고장 나서 날뛰고 있어!',th:'태엽이 멈췄어! 행운 상자 보낼게.',rw:'stone'},
 gearon:{n:'폭주 수송기 저지',ty:'stop',x:'폭주한 수송기를 저지해 줘. 성공 시 강화 보급품을 보내겠다.',th:'수송기 회수 완료. 강화 보급품 발송.',rw:'up'},
 mosaica:{n:'균열 결정 파괴',ty:'stop',x:'차원 균열에서 결정 괴물이 새어 나왔어요.',th:'균열이 닫혔어요. 결정 조각으로 영웅을 보낼게요.',rw:'unit'},
 florasia:{n:'시든 숲 지키기',ty:'hold',x:'적이 숲을 짓밟지 않게 잠시만 버텨 줘!',th:'숲이 숨을 쉬어. 생명의 이슬을 보낼게.',rw:'heal'},
 mongle:{n:'꿈 도둑 추격',ty:'swarm',x:'꿈 도둑들이 몽글성의 꿈을 훔쳐 달아나!',th:'꿈이 돌아왔어~ 고마워!',rw:'coin'},
 lumiel:{n:'빛 수정 수호',ty:'hold',x:'빛 수정이 흔들려요. 적을 줄여서 지켜 주세요.',th:'수정이 다시 빛나요. 행운의 빛을 나눠 드릴게요.',rw:'stone'},
 drakanis:{n:'흑룡 척후 격퇴',ty:'stop',x:'흑룡 척후가 정찰 중이다. 정보를 가져가기 전에 쓰러뜨려라.',th:'훌륭한 사냥이었다. 용족의 단련을 전한다.',rw:'up'},
 biikseong:{n:'폭풍 둥지 정리',ty:'swarm',x:'폭풍이 둥지를 덮쳤어! 적을 걷어내 줘!',th:'둥지가 안전해졌어. 새 동료를 보낼게.',rw:'unit'},
 seolryeong:{n:'눈사태 막기',ty:'hold',x:'적이 몰리면 눈사태가 나요. 숫자를 줄여 주세요.',th:'눈이 잠잠해졌어요. 따뜻한 차 한 잔… 아니, 체력을 보낼게요.',rw:'heal'},
 haeyeon:{n:'심해 괴수 퇴치',ty:'stop',x:'심해 괴수가 해구를 빠져나왔다. 해연을 도와 줘.',th:'해구가 조용해졌다. 진주를 보낸다.',rw:'coin'}};
const PQ_ACCEPT=30,PQ_GAP=[120,180];
function pqDiff(){const w=G.wave;return w<40?0:w<120?1:2}
function pqGoal(ty){const d=pqDiff(),hunt=A('hunter')?.85:1;return ty==='stop'?{hp:[5,8,12][d]*hunt,T:[35,32,30][d]}:ty==='swarm'?{n:Math.round([25,35,45][d]*hunt),T:30}:{max:[80,75,70][d],T:25}}
function pqRwTxt(rw){const k=A('hunter')?1.5:1,w=G.wave;return rw==='coin'?'🪙'+Math.round((60+6*w)*k):rw==='stone'?'🍀'+Math.round(2*k):rw==='heal'?'❤️+2 (회복 한도 안) + 🪙'+Math.round((30+3*w)*k):rw==='up'?'해당 행성 강화 +1 (없으면 가장 많은 행성)':'나라 등급 영웅 1명 (조합 재료)'}
function pqFailTxt(){const d=pqDiff();return d<2?'보상 없음 (다른 불이익 없음)':'❤️-3'+(G.zm==='arrive'?' · 특수 적이 출구에 닿아 실패하면 도착 피해(❤️-3)만 받고 추가 벌칙은 없음':'')}
function pqTick(dt){if(G.pq==null){G.pq=null;G.pqCd=G.pqCd==null?90:G.pqCd}const Q=G.pq,now=performance.now();
  if(!Q){if(G.prep>0||G.wave<4)return;G.pqCd-=dt;if(G.pqCd>0||(G.sty&&G.sty.req))return;
    const pl=plIn().filter(k=>PQ_DEF[k]&&!(G.pqLast||[]).includes(k));const k=pl.length?pl[Math.floor(Math.random()*pl.length)]:null;if(!k){G.pqCd=20;return}
    const D=PQ_DEF[k];G.pq={pl:k,st:'offer',t0:now,left:PQ_ACCEPT,g:pqGoal(D.ty),d:pqDiff()};G.pqLast=[k,...(G.pqLast||[])].slice(0,3);
    if(G.sty)G.sty.q&&G.sty.q.unshift({id:'pq_'+k+'_'+G.wave,who:'pq:'+k,t:D.x,p:2,exp:now+8000,pqk:k});G.pqN=(G.pqN||0)+1;SND.play('bounty');return}
  if(Q.st==='offer'){const rt=Math.min(.5,(now-(Q.rt||now))/1000);Q.rt=now;if(!(G.prep>0))Q.left-=rt;if(Q.left<=0){G.pq=null;G.pqCd=45;if($('pqP'))$('pqP').style.display='none'}return}
  if(Q.st==='on'){if(G.prep>0)return;Q.T-=dt;const D=PQ_DEF[Q.pl];
    if(D.ty==='swarm'&&G.kills-Q.k0>=Q.g.n)return pqWin();
    if(D.ty==='hold'&&Q.T<=0)return pqWin();
    if(D.ty==='hold'&&mobCount()>Q.g.max){Q.over=(Q.over||0)+dt;if(Q.over>=3)return pqFail('over')}else if(D.ty==='hold')Q.over=0;
    if(D.ty==='stop'&&!G.mobs.some(m=>m.pq&&m.hp>0)&&!Q.dead)return pqFail('lost');
    if(Q.T<=0)return pqFail('time')}}
function pqAccept(){const Q=G.pq;if(!Q||Q.st!=='offer')return;const D=PQ_DEF[Q.pl];Q.st='on';Q.T=Q.g.T;Q.k0=G.kills;
  if(D.ty==='stop'){const w=G.wave,hp=Math.round(mobHP(w)*Q.g.hp*(G.zm==='arrive'?ARR_HPK:1));G.mobs.push({p:0,hp,max:hp,sl:0,st:0,boss:false,v:32,k:Math.min(4,Math.floor((w-1)/10)),el:1,pq:Q.pl})}
  toast('📡 '+PLANETS[Q.pl]+' 지원 수락 — '+D.n);if($('pqP'))$('pqP').style.display='none';G.shake=Math.max(G.shake,.15)}
function pqDecline(){if(G.pq&&G.pq.st==='offer'){G.pq=null;G.pqCd=45}if($('pqP'))$('pqP').style.display='none'}
function pqWin(){const Q=G.pq,D=PQ_DEF[Q.pl],k=A('hunter')?1.5:1,w=G.wave;let got='';G.pq=null;G.pqCd=PQ_GAP[0]+Math.random()*(PQ_GAP[1]-PQ_GAP[0]);G.pqWin=(G.pqWin||0)+1;
  for(const m of G.mobs)if(m.pq)m.pq=0;
  if(D.rw==='coin'){const c=Math.round((60+6*w)*k);G.coins+=c;G.pqC=(G.pqC||0)+c;got='🪙+'+c}
  else if(D.rw==='stone'){const sn=Math.round(2*k);G.stones+=sn;G.pqS=(G.pqS||0)+sn;got='🍀+'+sn}
  else if(D.rw==='heal'){const r=healTry(2,null),c=Math.round((30+3*w)*k);G.coins+=c;G.pqC=(G.pqC||0)+c;got=(r?'❤️+'+r+' ':'')+'🪙+'+c}
  else if(D.rw==='up'){let p=Q.pl;if(!G.cells.some(c=>c&&U[c.u].planet===p)){const n={};for(const c of G.cells)if(c&&PLANETS[U[c.u].planet]&&U[c.u].planet!=='fusion')n[U[c.u].planet]=(n[U[c.u].planet]||0)+c.n;p=Object.keys(n).sort((a,b)=>n[b]-n[a])[0]||Q.pl}G.upPlanet[p]=(G.upPlanet[p]||0)+1;got=PLANETS[p]+' 강화 +1'}
  else{let pool=BY[2].filter(x=>U[x].planet===Q.pl);if(!pool.length)pool=BY[2];const id=pool[Math.floor(Math.random()*pool.length)];if(id&&place(id))got=U[id].n+' 합류';else{const c=Math.round((60+6*w)*k);G.coins+=c;got='🪙+'+c+' (자리 없음)'}}
  SND.play('bountyKill');toast('📡 '+PLANETS[Q.pl]+' 지원 성공! '+got);if(G.sty&&G.sty.q)G.sty.q.unshift({id:'pqt_'+Q.pl+'_'+w,who:'pq:'+Q.pl,t:D.th,p:2,exp:performance.now()+8000});refresh()}
function pqFail(why){const Q=G.pq;if(!Q)return;G.pq=null;G.pqCd=PQ_GAP[0]+Math.random()*(PQ_GAP[1]-PQ_GAP[0]);G.pqFail=(G.pqFail||0)+1;for(const m of G.mobs)if(m.pq)m.pq=0;
  const pen=Q.d>=2&&why!=='arrive';if(pen)hpLose(3,'pq');toast('📡 '+PLANETS[Q.pl]+' 지원 실패'+(why==='arrive'?' — 특수 적이 출구를 지났어요':why==='over'?' — 적이 너무 많아요':'')+(pen?' ❤️-3':''))}
function pqUI(){const B=$('bBty');if(!B||!G)return;const Q=G.pq;let k,h;
  if(!Q){k='none'+(G.wave<4);h='📡 <b>행성 통신</b><small>긴급 요청 대기 중</small>'}
  else if(Q.st==='offer'){const L=Math.ceil(Q.left);k='o'+Q.pl+L;h=(PICON[Q.pl]?'<img src="'+PICON[Q.pl]+'" style="height:1.4em;vertical-align:middle">':'📡')+' <b>'+PLANETS[Q.pl]+' 긴급!</b><small>'+PQ_DEF[Q.pl].n+' · 눌러서 확인 '+L+'초</small>'}
  else{const D=PQ_DEF[Q.pl],T=Math.max(0,Math.ceil(Q.T)),pr=D.ty==='swarm'?' '+Math.min(Q.g.n,G.kills-Q.k0)+'/'+Q.g.n:D.ty==='hold'?' 적 '+mobCount()+'/'+Q.g.max:'';k='a'+Q.pl+T+pr;h=(PICON[Q.pl]?'<img src="'+PICON[Q.pl]+'" style="height:1.4em;vertical-align:middle">':'📡')+' <b>'+PLANETS[Q.pl]+' 지원 중</b><small>'+D.n+pr+' · '+T+'초'+(G.prep>0?' (정지)':'')+'</small>'}
  if(k!==G.btyK){G.btyK=k;B.disabled=!Q;B.classList.toggle('pqOn',!!Q&&Q.st==='offer');B.innerHTML=h}}
function pqOpen(){const Q=G.pq;if(!Q){toast('📡 지금은 긴급 요청이 없어요');return}let P=$('pqP');if(!P){P=document.createElement('div');P.id='pqP';$('stage').appendChild(P);P.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.a==='ok')pqAccept();else if(b.dataset.a==='no')pqDecline();else P.style.display='none'}}
  const D=PQ_DEF[Q.pl],g=Q.g,goal=D.ty==='stop'?'특수 적 1마리를 '+g.T+'초 안에 처치 (체력 일반 적의 '+Math.round(g.hp)+'배)':D.ty==='swarm'?g.T+'초 안에 적 '+g.n+'마리 처치':g.T+'초 동안 적 수를 '+g.max+'마리 이하로 유지 (3초 넘게 넘으면 실패)';
  P.innerHTML='<div style="font-size:1.1em">'+(PICON[Q.pl]?'<img src="'+PICON[Q.pl]+'" style="height:1.6em;vertical-align:middle"> ':'')+'<b>'+PLANETS[Q.pl]+' 긴급 통신</b></div><div style="margin:.4em 0;opacity:.9">“'+D.x+'”</div><div class="rw" style="text-align:left">🎯 목표: '+goal+'<br>⚖️ 난도: '+['쉬움','보통','어려움'][Q.d]+'<br>🎁 성공: '+pqRwTxt(D.rw)+'<br>💥 실패: '+pqFailTxt()+'<br>'+(D.ty==='stop'?'👾 특수 적도 적 수에 포함돼요'+(G.zm==='arrive'?' · 출구에 닿으면 도착 피해':''):'')+'<br>⏳ '+(Q.st==='offer'?Math.ceil(Q.left)+'초 안에 고르기 · 무시해도 불이익 없음':'진행 중')+'</div>'+(Q.st==='offer'?'<button data-a="ok">지원하기</button><button data-a="no" style="background:#3a4a66;color:#fff">거절</button>':'<button data-a="x" style="background:#3a4a66;color:#fff">닫기</button>');P.style.display='block'}
const BTY_MAX=5;
function btyTick(dt){for(const m of G.mobs)if(m.pq&&m.hp<=0&&!m.pqDone&&!m.arr){m.pqDone=1;if(G.pq&&G.pq.st==='on'){G.pq.dead=1;pqWin()}}pqTick(dt);pqUI()}
// ---------- 증강 (보스 처치 + 5웨이브) ----------
const AUGT=['실버','골드','프리즘'],AUGC=['#d9e2f0','#ffd24a','#d7b8ff'];
const AUG={
 trio:{t:0,e:'⚔️',n:'삼총사',x:'3명 꽉 찬 칸 공격력 +40%'},
 close:{t:0,e:'🥊',n:'근접 본능',x:'근접 영웅(사거리 짧은 영웅·근접 특수조합 포함) 공격력 +50%'},
 far:{t:0,e:'🔭',n:'저격 본능',x:'사거리 긴 영웅(2.1칸 이상 — 단일·관통·저격) 공격력 +50%'},
 frost:{t:0,e:'❄️',n:'서리 길',x:'모든 적 이동속도 -20%'},
 freebie:{t:0,e:'🎟️',n:'첫 소환 무료',x:'매 웨이브 첫 소환이 공짜'},
 interest:{t:0,e:'🏦',n:'이자',x:'웨이브마다 보유 코인의 5% (최대 150+웨이브×15 — 100웨이브면 1,650)'},
 jackpot:{t:0,e:'🎰',n:'잭팟 사냥',x:'처치 시 3% 확률로 코인 8배'},
 refund:{t:0,e:'💱',n:'환불 전문가',x:'판매 보상 1.3배'},
 cc:{t:1,e:'🔨',n:'제압 사냥',x:'기절·속박·정지·차단된 적이 받는 피해 2배'},
 chill:{t:1,e:'🧊',n:'동상',x:'감속된 적이 받는 피해 +40%'},
 boom:{t:1,e:'💥',n:'연쇄 폭발',x:'적이 죽으면 최대 체력 6%로 주변 폭발 (폭발로 죽은 적은 다시 터지지 않음)'},
 clan:{t:1,e:'🪐',n:'행성 결속',x:'행성 시너지에 필요한 영웅 수 1종 줄어듦 (3·4종 → 2·3종)'},
 twin:{t:1,e:'👯',n:'쌍둥이',x:'승급 시 25% 확률로 한 명 더'},
 short:{t:1,e:'🧩',n:'지름길',x:'우주 조합에 집 등급 재료가 필요 없음'},
 cosmo:{t:1,e:'🌌',n:'우주 가속',x:'우주 히어로 특수기 쿨타임 -25%'},
 eye:{t:2,e:'👁️',n:'신의 눈',x:'가장 강한 영웅의 사거리 +3칸, 공격력 2배'},
 leap:{t:2,e:'🚀',n:'쌍둥이 소환',x:'소환할 때 40% 확률로 같은 영웅이 한 명 더 (무료)'},
 hunt:{t:2,e:'🗡️',n:'보스 사냥꾼',x:'보스가 받는 피해 2배, 보스 이동 -30%'},
 greed:{t:2,e:'💰',n:'탐욕',x:'처치·보스 코인 1.6배, 대신 적 체력 +15%'},
 echo:{t:2,e:'🔁',n:'메아리',x:'특수기가 50% 확률로 1초 뒤 한 번 더'},
 crit:{t:0,e:'🦅',n:'날카로운 눈',x:'모든 영웅 치명타 확률 +15%p'},
 venom:{t:0,e:'🧪',n:'맹독',x:'모든 기본공격이 3초간 독(초당 그 피해의 10%) — 독 특성 영웅은 지속 피해 2배'},
 shard:{t:0,e:'🪨',n:'파편',x:'범위 공격이 튀는 범위 +35%'},
 seed:{t:0,e:'💵',n:'종잣돈',x:'즉시 코인 200+웨이브×10, 매 웨이브 10+웨이브'},
 clover:{t:0,e:'☘️',n:'네잎클로버',x:'보스 처치 시 행운석 +3'},
 hunter:{t:0,e:'🤠',n:'긴급 지원 전문가',x:'행성 긴급 지원 보상 1.5배, 목표가 조금 쉬워짐(체력·처치 수 -15%)'},
 lotto:{t:1,e:'🎫',n:'복권 중독',x:'복권 당첨금 1.3배'},
 tilesale:{t:1,e:'🧱',n:'강화 할인',x:'영웅 강화 비용 -30%'},
 sponsor:{t:1,e:'📡',n:'행성 후원',x:'행성 강화 비용 -40%'},
 quest:{t:1,e:'📜',n:'미션 마스터',x:'자동 목표 보상 1.5배'},
 rhythm:{t:1,e:'🥁',n:'연타 리듬',x:'모든 영웅 공격속도 +15%, "N번째 공격마다" 특성은 한 박자 빨리 터짐'},
 reaper:{t:1,e:'💀',n:'사신',x:'체력 12% 이하로 떨어진 일반 적 즉사'},
 ricochet:{t:1,e:'🎱',n:'도탄',x:'모든 기본공격이 근처 1명에게 40% 튐'},
 wideaura:{t:1,e:'📶',n:'확장 오라',x:'버프 영웅 오라 범위 2칸 (주변 24칸)'},
 ampaura:{t:1,e:'🔊',n:'오라 증폭',x:'버프 영웅 오라 효과 2배'},
 brawl:{t:1,e:'👊',n:'백병전',x:'근접 영웅(사거리 짧은 영웅·근접 특수조합 포함) 공격속도 +60%'},
 shock:{t:1,e:'💫',n:'충격탄',x:'기본공격 10% 확률로 0.6초 기절'},
 rainbow:{t:1,e:'🌈',n:'무지개 연합',x:'필드에 행성 5곳 이상이면 전체 공격력 +30%'},
 grass:{t:1,e:'🌱',n:'풀뿌리',x:'동네·나라 등급 영웅 공격력 3배'},
 bossbane:{t:1,e:'🐲',n:'용 사냥',x:'보스가 받는 피해 +60%'},
 cosmicplus:{t:2,e:'🌠',n:'우주의 축복',x:'우주 조합 시 40% 확률로 같은 우주 히어로 하나 더'},
 packed:{t:2,e:'🏟️',n:'만석',x:'빈 칸이 없으면 전체 공격력 +90%'},
 evolve:{t:2,e:'🧬',n:'진화',x:'웨이브마다 가장 낮은 등급 영웅 1명 승급 (나라 등급까지)'},
 warp:{t:2,e:'🌀',n:'시간 왜곡',x:'18초마다 모든 적 3초 정지 (보스 1초)'},
 freeze:{t:1,e:'🏷️',n:'가격 동결',x:'고른 뒤 소환 15번은 비용이 오르지 않음'},
 crossroad:{t:2,e:'🔀',n:'선택의 기로',x:'즉시 실버 증강 2개를 더 고름'},
 quick:{t:0,e:'🏃',n:'재빠른 손',x:'모든 영웅 공격속도 +20%'},
 skcd:{t:0,e:'🔮',n:'소환사 숙련',x:'소환사 스킬 쿨타임 -40%, 피해·처치 수 +50%'},
 bossgold:{t:0,e:'👑',n:'보스 현상금',x:'보스 처치 코인 2배 + 행운석 +1'},
 fuslab:{t:1,e:'⚗️',n:'융합 연구',x:'특수 조합 비용 -30%, 특수 조합 영웅 공격력 +20%'},
 cforge:{t:1,e:'🔨',n:'우주 단련',x:'우주 조합 비용 -25%'},
 mana:{t:1,e:'💠',n:'마나 순환',x:'모든 영웅 특수기 쿨타임 -20%'},
 weak:{t:1,e:'🎯',n:'약점 포착',x:'기본공격에 맞은 적은 3초간 받는 피해 +20%'},
 ascend:{t:2,e:'🌟',n:'초월',x:'특수 조합 영웅 공격력 +70%, 특수기 쿨타임 -25%'},
 overdrive:{t:2,e:'⚡',n:'과부하',x:'15초마다 6초간 모든 영웅 공격속도 +70%'},
 guard:{t:0,e:'🛡️',n:'간판 행성',x:'가장 많이 강화한 행성 영웅(그 행성이 재료인 특수조합 포함) 공격력 +50%'},
 solo:{t:0,e:'🐺',n:'외로운 늑대',x:'필드에 한 칸뿐인 영웅(같은 영웅이 다른 칸에 없음) 공격력 +40%'},
 bounty:{t:0,e:'🪙',n:'사냥 수당',x:'적 처치 코인 +25%'},
 supply:{t:0,e:'📦',n:'보급품',x:'웨이브마다 코인 웨이브×3 (50웨이브면 150)'},
 resonate:{t:1,e:'🔗',n:'시너지 공명',x:'행성 또는 전투 계열 시너지가 켜진 영웅 공격력 +25%'},
 grit:{t:1,e:'🔥',n:'역전의 투지',x:'적이 100마리를 넘거나 ❤️ 체력이 절반 이하면 전체 공격력 +40%'},
 builder:{t:1,e:'🏗️',n:'두 배 강화',x:'영웅 강화할 때 30% 확률로 한 단계 더'},
 tailwind:{t:1,e:'💨',n:'순풍',x:'모든 영웅 사거리 +0.45칸'},
 majesty:{t:2,e:'👑',n:'우주의 위엄',x:'우주·특수 조합 영웅 공격력 +80%'},
 titan:{t:2,e:'🗿',n:'거인의 힘',x:'모든 영웅 공격력 +60%, 대신 소환 비용 +30%'},
 chainall:{t:2,e:'🌩️',n:'번개 군단',x:'모든 기본공격이 근처 적 2명에게 50%씩 튐'},
 midas:{t:2,e:'💎',n:'미다스의 손',x:'적 처치 코인 +40%, 2웨이브마다 행운석 +1'},
 timelord:{t:2,e:'⏳',n:'시간의 지배자',x:'모든 영웅 특수기 쿨타임 -40%'},
 execute:{t:2,e:'⚰️',n:'처형인',x:'체력 25% 이하 일반 적 즉사, 체력 30% 이하 보스는 받는 피해 2배'},
 swarm:{t:2,e:'🐝',n:'대군',x:'필드 영웅 1명당 전체 공격력 +3% (최대 +90%)'},
 dice:{t:2,e:'🎲',n:'행운의 주사위',x:'웨이브마다 무작위 영웅 5명 공격력 2.5배 (그 웨이브 동안)'},
 rampart:{t:0,e:'🏰',n:'최후의 보루',x:'❤️ 최대 체력 +30 (바로 30 회복)'},
 wall:{t:0,e:'🧱',n:'수호 결계',x:'🧱길막러 계열이 켜져 있으면 효과 한 단계 위 (최대 3단계)'},
 spring:{t:1,e:'⛲',n:'생명의 샘',x:'웨이브당 회복 상한 3→5, 보스를 잡으면 ❤️+2'},
 exitguard:{t:1,e:'🚪',n:'출구 사수',x:'도착형 구간: 길 마지막 30% 위 적이 받는 피해 +60% · 순환형 구간: 100마리 넘을 때 체력 감소 간격 2→3초'},
 drill:{t:1,e:'🎖️',n:'계열 훈련',x:'필드에 가장 많이 모인 전투 계열의 2·3단계 필요 종류 -1'}};
const AUGP={rampart:()=>{G.hp=Math.min(hpMax(),G.hp+30)},hunter:()=>{if(G.pqCd>20)G.pqCd=20},seed:()=>{const v=EC.seed0[0]+EC.seed0[1]*G.wave;G.coins+=v;eco('seed',v)},freeze:()=>{G.frzS=G.summons},crossroad:()=>{G.forceT=[0,0]}};
function evolveOne(){let bi=-1,bt=9;G.cells.forEach((c,i)=>{if(!c)return;const t=U[c.u].t;if(!c.lk&&autoOK(c.u,1)&&t<2&&BY[t+1].length&&t<bt){bt=t;bi=i}});if(bi<0)return;const c=G.cells[bi];c.n--;if(c.n<=0)G.cells[bi]=null;const id=pickU(bt+1);if(!place(id)){c.n++;G.cells[bi]=c;return}const at=G.cells.findIndex(q=>q&&q.u===id&&q.pop>0),[px,py]=cellXY(at<0?bi:at);burst(px,py,bt+1,false);G.fx.push({k:'t',x:px,y:py-26,t:1.1,T:1.1,s:'🧬 진화!',cr:true,dl:.05})}
function A(k){return G&&G.aug&&G.aug[k]?1:0}
function rcp(m){let r=RECIPE[m];if(NO_HOME&&r)r=r.filter(k=>!U[k]||U[k].t!==0);return A('short')&&r&&r.length>3?r.slice(0,r.length-1):r}
function rCells(k){return (U[k].r-16)/CS}
function isMel(k){const u=U[k];return rCells(k)<=1.65||!!(u.melee||u.ml||(PV[k]&&(PV[k].ml||PV[k].melee))||MELEE2.includes(k))}

// ---------- 증강 세트(시너지): 특정 증강을 다 모으면 추가 효과 ----------
const ASET=[
 {id:'poison',e:'☠️',n:'독살자',ks:['venom','weak','reaper'],x:'독 피해 3배 + 독 걸린 적이 받는 피해 +25%'},
 {id:'ice',e:'🧊',n:'빙하기',ks:['frost','chill','shock'],x:'감속·기절된 적이 받는 피해 +50%, 모든 적 이동속도 추가 -10%'},
 {id:'ctrl',e:'⛓️',n:'제압의 달인',ks:['cc','shock','warp'],x:'기절·속박·정지된 적이 받는 피해 추가 +50%'},
 {id:'gold',e:'💰',n:'황금 손',ks:['interest','bounty','jackpot'],x:'적 처치 코인 +30%, 웨이브마다 행운석 +1 (처치 코인 증가는 모두 합쳐 최대 2.2배)'},
 {id:'hunt',e:'🐉',n:'용사냥꾼',ks:['hunt','bossbane','bossgold'],x:'보스가 받는 피해 추가 +50%'},
 {id:'cosmic',e:'🌌',n:'우주 군단',ks:['majesty','cosmo','cforge'],x:'우주·특수 조합 영웅 공격속도 +30%'},
 {id:'fusion',e:'✨',n:'융합의 정점',ks:['fuslab','ascend'],x:'특수 조합 영웅 공격력 +50%'},
 {id:'melee',e:'⚔️',n:'근접 전문가',ks:['close','brawl'],x:'근접 영웅 공격력 추가 +30%'},
 {id:'snipe',e:'🎯',n:'저격수 둥지',ks:['far','crit','tailwind'],x:'사거리 긴 영웅 공격력 추가 +40%'},
 {id:'storm',e:'⚡',n:'번개 폭풍',ks:['ricochet','chainall'],x:'모든 영웅 공격속도 +20%'},
 {id:'time',e:'⏳',n:'시간술사',ks:['mana','timelord','warp'],x:'모든 특수기 쿨타임 추가 -20%'},
 {id:'aura',e:'💫',n:'오라 마스터',ks:['wideaura','ampaura'],x:'모든 영웅 공격력 +20%'},
 {id:'army',e:'🪖',n:'대군 지휘',ks:['swarm','packed','trio'],x:'모든 영웅 공격력 +25%'},
 {id:'fort',e:'🏯',n:'불굴의 요새',ks:['rampart','spring','exitguard'],x:'받는 체력 피해 -30%'},
 {id:'line',e:'🛡️',n:'철의 전선',ks:['wall','cc','drill'],x:'차단·기절에서 풀린 적 받는 피해 추가 +30%'},
];
function SO(id){return !!(G&&G.aset&&G.aset[id])}
function asetCheck(){if(!G||!G.aug)return;G.aset=G.aset||{};for(const S of ASET){if(G.aset[S.id])continue;if(S.ks.every(k=>G.aug[k])){G.aset[S.id]=1;G.flash=Math.max(G.flash||0,.4);G.shake=Math.max(G.shake,.4);toast('🔗 세트 완성! '+S.e+' '+S.n+' — '+S.x);if(typeof SND!=='undefined')SND.play('jackpot')}}}
function asetHint(k){const L=ASET.filter(S=>S.ks.includes(k));if(!L.length)return'';return L.map(S=>{const h=S.ks.filter(q=>G.aug&&G.aug[q]).length;return '<i class="aset'+(h+1===S.ks.length?' done':'')+'">🔗 '+S.e+S.n+' '+(h+1)+'/'+S.ks.length+'</i>'}).join('')}
function augA(c){if(!G.aug)return 1;let k=1;const u=U[c.u];if(G.aug.eye&&G.cells.indexOf(c)===G.eyeI)k*=2;if(G.aug.trio&&c.n>=3)k*=1.4;if(G.aug.guard&&G.upPlanet){let tp=null,tl=0;for(const q in G.upPlanet)if(G.upPlanet[q]>tl){tl=G.upPlanet[q];tp=q}if(tp&&(u.fu?fuBase(c.u).some(b=>U[b]&&U[b].planet===tp):u.planet===tp))k*=1.5}if(G.aug.grass&&u.t<=2)k*=3;if(G.aug.rainbow&&G.pl&&Object.keys(G.pl).length>=5)k*=1.3;if(G.aug.packed&&!G.cells.some(q=>!q))k*=1.9;if(G.aug.close&&isMel(c.u))k*=1.5;if(G.aug.far&&rCells(c.u)>=2.05)k*=1.5;if(G.aug.solo&&G.cells.filter(q=>q&&q.u===c.u).length===1)k*=1.4;if(G.aug.resonate&&((G.plOn&&G.plOn[u.planet]>0)||(HCLS[c.u]&&clsLv(HCLS[c.u])>0)))k*=1.25;if(G.aug.grit&&(G.mobN>100||G.hp<=hpMax()/2))k*=1.4;if(G.aug.majesty&&u.t>=4)k*=1.8;if(G.aug.dice&&G.diceS&&G.diceS.includes(c))k*=2.5;if(G.aug.titan)k*=1.6;if(G.aset){if(G.aset.fusion&&u.fu)k*=1.5;if(G.aset.melee&&isMel(c.u))k*=1.3;if(G.aset.snipe&&rCells(c.u)>=2.05)k*=1.4;if(G.aset.aura)k*=1.2;if(G.aset.army)k*=1.25}if(G.aug.swarm)k*=1+Math.min(.9,.03*(G.unitN||0));return k}
function plNeed(){return A('clan')?[2,3]:[3,4]}
function synTick(){const P={};for(const c of G.cells)if(c&&!U[c.u].fu)(P[U[c.u].planet]=P[U[c.u].planet]||new Set()).add(c.u);const nd=plNeed();G.pl={};G.plOn={};for(const p in P){G.pl[p]=P[p].size;G.plOn[p]=P[p].size>=nd[1]?2:P[p].size>=nd[0]?1:0}
  G.cl=clsCount(G.cells);G.clOn={};G.clTop=A('drill')?Object.keys(G.cl).sort((a,b)=>G.cl[b]-G.cl[a]||CLS_ORD.indexOf(a)-CLS_ORD.indexOf(b))[0]:null;for(const k in G.cl)G.clOn[k]=clsLvOf(k,G.cl[k]);
  const ar=A('wideaura')?2:1,sk=[1,1.3,1.6][clsLv('support')];for(const c of G.cells)if(c){c.pa=1;c.pas=1;c.pcd=1;c.prg=A('tailwind')?.45*CS:0;c.psl=0;c.pcr=0;c.aur=0;c.aurL=[]}
  G.cells.forEach((c,i)=>{const A0=c&&AURA[c.u];if(!A0)return;const x0=i%COLS,y0=Math.floor(i/COLS),ak=Math.min(AURA_MAXK,(A('ampaura')?2:1)*sk*(ROLE[c.u]==='buff'?1.5:1));
    G.cells.forEach((d,j)=>{if(!d||j===i||d.u===c.u||Math.max(Math.abs(j%COLS-x0),Math.abs(Math.floor(j/COLS)-y0))>ar)return;
      d.aur=1;d.aurK=c.u;(d.aurL=d.aurL||[]).includes(c.u)||d.aurL.push(c.u);if(A0.pa)d.pa=Math.max(d.pa,1+A0.pa*ak);if(A0.pas)d.pas=Math.max(d.pas,1+A0.pas*ak);if(A0.pcd)d.pcd=Math.max(d.pcd,1+A0.pcd*ak);if(A0.prg)d.prg=Math.max(d.prg,A0.prg*ak*CS);if(A0.psl)d.psl=Math.max(d.psl,A0.psl*ak);if(A0.pcr)d.pcr=Math.max(d.pcr,A0.pcr*ak)})});
  for(const c of G.cells){if(!c)continue;const p=U[c.u].planet,l=G.plOn[p]||0;if(!l)continue;
    if(p==='purmia')c.pas*=1.25;else if(p==='toytopia')c.pa*=1.3;else if(p==='gearon')c.prg+=.7*CS;else if(p==='florasia')c.pcd*=1.3;else if(p==='mongle')c.psl=Math.max(c.psl,.8);else if(p==='lumiel'){c.pas*=1.15;c.pcd*=1.2}else if(p==='drakanis')c.pa*=1.2;else if(p==='biikseong'){c.pas*=1.2;c.prg+=.5*CS}else if(p==='seolryeong'){c.pa*=1.15;c.psl=Math.max(c.psl,.8)}else if(p==='haeyeon'){c.pa*=1.15;c.pcd*=1.15}
    if(l>=2)c.pa*=1.4}
  {const b=clsLv('brawl');if(b)for(const c of G.cells)if(c&&HCLS[c.u]==='brawl'){c.pas*=[1,1.15,1.3,1.5][b];c.pa*=[1,1,1.2,1.4][b]}}
  G.cells.forEach((c,i)=>{if(!c||c.u!=='elderon')return;const x0=i%COLS,y0=Math.floor(i/COLS);if(G.cells.some((d,j)=>d&&j!==i&&d.u!=='elderon'&&U[d.u].planet==='florasia'&&Math.max(Math.abs(j%COLS-x0),Math.abs(Math.floor(j/COLS)-y0))<=1))c.pa*=1.4});
  synUI()}
function synUI(){const E=$('synS');if(!E||!G.pl)return;const nd=plNeed();
  // 표시 우선순위: 켜진 것 → 다음 단계에 가까운 것. 행성·계열 합쳐 최대 6칩
  const PL=Object.keys(G.pl).filter(p=>G.pl[p]>=2).map(p=>({t:'p',k:p,n:G.pl[p],l:G.plOn[p],nx:G.plOn[p]>=1?nd[1]:nd[0]})),CL=Object.keys(G.cl||{}).map(c=>({t:'c',k:c,n:G.cl[c],l:G.clOn[c],nx:CLS[c].need[Math.min(G.clOn[c],CLS[c].need.length-1)]}));
  const all=PL.concat(CL).filter(o=>o.l>0||o.nx-o.n<=1).sort((a,b)=>(b.l>0)-(a.l>0)||(a.nx-a.n)-(b.nx-b.n)||b.n-a.n).slice(0,5),ks=all.filter(o=>o.t==='p').map(o=>o.k),k=all.map(o=>o.t+o.k+o.n+o.l).join(',')+nd;if(k===G.synK)return;G.synK=k;
  E.innerHTML=all.map(o=>o.t==='c'?'<i class="l'+Math.min(2,o.l)+' cls" style="--rc:'+CLS[o.k].c+'"><span>'+CLS[o.k].e+'</span><b>'+o.n+'</b><small>/'+o.nx+'</small></i>':(p=>'<i class="l'+G.plOn[p]+(v5u('synergy/off')?' chip':'')+'" style="--rc:'+(PLANET_COL[p]||'#fff')+(v5u('synergy/off')?';background-image:url('+v5u('synergy/'+(G.plOn[p]===2?'2':G.plOn[p]===1?'1':'off'))+')':'')+'">'+(PICON[p]?'<img src="'+PICON[p]+'" alt="">':'')+'<b>'+G.pl[p]+'</b><small>/'+(G.plOn[p]>=1?nd[1]:nd[0])+'</small></i>')(o.k)).join('');
  if($('synL').style.display==='block')synList()}
function synList(){const L=$('synL'),on={},nd=plNeed();for(const c of G.cells)if(c)(on[U[c.u].planet]=on[U[c.u].planet]||new Set()).add(U[c.u].n);
  const cOn={};for(const c of G.cells)if(c&&HCLS[c.u])(cOn[HCLS[c.u]]=cOn[HCLS[c.u]]||new Set()).add(U[c.u].n);
  L.innerHTML='<div style="text-align:center;color:#c9d0f0">시너지는 <b>서로 다른 영웅 종류</b> 수로 켜져요 · 모든 배율은 곱해짐 (눌러서 닫기)</div><div style="color:#ffe9a8;margin-top:4px">⚔️ 전투 계열</div>'+CLS_ORD.map(k=>{const C=CLS[k],n=(G.cl&&G.cl[k])||0,l=clsLv(k);return '<div class="sr"><b style="color:'+C.c+'">'+C.e+' '+C.n+' '+n+'종</b> <small style="display:inline;opacity:.7">'+C.s+'</small>'+C.need.map((q,j)=>'<div class="'+(l>j?'on':'off')+'">'+q+'종: '+C.x[j]+'</div>').join('')+(cOn[k]?'<small style="opacity:.7">'+[...cOn[k]].join(', ')+'</small>':'<small style="opacity:.5">소속: '+Object.keys(HCLS).filter(h=>HCLS[h]===k&&U[h]&&!U[h].hidden&&(U[h].fu?fuAvail(h):plIn().includes(U[h].planet))).map(h=>U[h].n).join(', ')+'</small>')+'</div>'}).join('')+'<div style="color:#ffe9a8;margin-top:8px">🪐 행성</div>'+plIn().filter(p=>PSYN[p]).sort((a,b)=>((G.pl&&G.pl[b])||0)-((G.pl&&G.pl[a])||0)).map(p=>{const n=(G.pl&&G.pl[p])||0,l=(G.plOn&&G.plOn[p])||0;
    return '<div class="sr">'+pic(p)+' <b style="color:'+(PLANET_COL[p]||'#fff')+'">'+PLANETS[p]+' '+n+'종</b><div class="'+(l>=1?'on':'off')+'">'+nd[0]+'종: '+PSYN[p].x+'</div><div class="'+(l>=2?'on':'off')+'">'+nd[1]+'종: '+PSYN2+'</div>'+(on[p]?'<small style="opacity:.7">'+[...on[p]].join(', ')+'</small>':'')+'</div>'}).join('')}
function augTick(){synTick();G.mobN=mobCount();G.unitN=total();if(!G.aug)return;if(G.aug.eye){let bi=-1,bv=0;G.cells.forEach((c,i)=>{if(!c)return;const v=U[c.u].d*U[c.u].s*c.n*tileMult(i)*mult(c.u);if(v>bv){bv=v;bi=i}});G.eyeI=bi}}
function augBoom(m,x,y){const d=m.max*.06,R=CS*1.2;let n=0;for(const o of G.mobs){if(o.hp<=0||o===m||o.p<28)continue;const[ox,oy]=pos(o.p);if(Math.hypot(ox-x,oy-y)<=R){o.byB=1;hit(o,{},d,0,m.last);if(o.hp>0)o.byB=0;n++}}if(G.fx.length<300){G.fx.push({k:'boom',x,y,r:R*.8,t:.3,T:.3,c:'#ff9a3c'});G.fx.push({k:'ring',x,y,r:R,t:.3,T:.3,c:'#ffcf6a'})}}
function echoSp(c){const i=G.cells.indexOf(c);if(i<0||G.over)return;const u=U[c.u],s=u.sp2;if(!s)return;const[x,y]=cellXY(i),R=i===G.eyeI&&A('eye')?u.r+CS*3:u.r;let best=null,bp=-1;for(const m of G.mobs){if(m.hp<=0||m.p<28)continue;const[mx,my]=pos(m.p);if(Math.hypot(mx-x,my-y)<=R&&(m.boss?1e9:m.p)>bp){bp=m.boss?1e9:m.p;best=m}}if(!best)return;
  G.fx.push({k:'t',x,y:y-34,t:1,T:1,s:'🔁 메아리!',cr:true,dl:0});special(c,i,R!==u.r?Object.assign(Object.create(u),{r:R}):u,s,x,y,best)}
function augTier(){const k=G.nBoon||0,pp=[0,.06,.14,.22,.3,.36][Math.min(5,k)],pg=[.3,.45,.5,.5,.5,.5][Math.min(5,k)],r=Math.random();return r<pp?2:r<pp+pg?1:0}
function augRoll(t){const own=G.aug||{},pick=(tt,n,ex)=>Object.keys(AUG).filter(k=>AUG[k].t===tt&&!own[k]&&!(NO_HOME&&k==='short')&&k!=='sponsor'&&!(MSN_OFF&&k==='quest')&&!ex.includes(k)).map(k=>[k,Math.random()-(ASET.some(S=>S.ks.includes(k)&&S.ks.some(q=>own[q]))?.35:0)]).sort((a,b)=>a[1]-b[1]).map(x=>x[0]).slice(0,n);
  let a=pick(t,3,[]);for(const tt of [1,0,2])if(a.length<3)a=a.concat(pick(tt,3-a.length,a));return a}
function boonShow(){const t=G.boonT;$('boonH').innerHTML='💎 증강 선택 <span class="tg" style="background:'+AUGC[t]+';color:#1a1030">'+AUGT[t]+'</span><div style="font-size:11px;font-weight:400;opacity:.8;margin-top:3px">공격력·피해 증가는 서로 곱해져요 (예: +40%와 +50% → ×2.1). 영웅을 누르면 지금 배율이 보여요</div>';
  $('boonC').innerHTML=G.boonP.map((k,j)=>{const a=AUG[k];const ik=augIcon(k),cb=v5u('cards/'+['silver','gold','prism'][a.t]);return '<button class="bnc t'+a.t+(cb?' cbg':'')+'" style="animation-delay:'+j*.08+'s'+(cb?';background-image:url('+cb+')':'')+'" onclick="boonPick('+j+')">'+(ik?v5img(ik,'aic'):'<span>'+a.e+'</span>')+'<b>'+a.n+'</b><small>'+a.x+'</small>'+asetHint(k)+'</button>'}).join('');
  const R=$('boonR');R.disabled=!(G.boonRr>0);R.textContent='🔄 다시 뽑기 ('+(G.boonRr||0)+')'}
function boonOpen(){if(G.over)return;G.aug=G.aug||{};G.pause=true;const t=G.forceT&&G.forceT.length?G.forceT.shift():augTier();G.boonT=t;G.boonP=augRoll(t);if(!G.boonP.length){G.pause=false;return}G.boonRr=1;boonShow();$('boon').style.display='flex';SND.play(t===2?'reveal':'boonOpen')}
function boonRe(){if(!G.pause||!G.boonP||!(G.boonRr>0))return;G.boonRr--;G.boonP=augRoll(G.boonT);SND.play('card');boonShow()}
function boonPick(j){if(!G.pause||!G.boonP)return;const k=G.boonP[j]||G.boonP[0];G.boonP=null;SND.play('boonPick');G.aug[k]=1;(G.augL=G.augL||[]).push(k);if(AUGP[k])AUGP[k]();asetCheck();if(G.forceT&&G.forceT.length)G.sched.push({t:.4,f:boonOpen});G.pause=false;$('boon').style.display='none';G.nBoon=(G.nBoon||0)+1;const a=AUG[k];toast(a.e+' '+a.n+' 획득!');augTick();augUI();refresh()}
function augUI(){const S=$('augS'),L=$('augL');if(!S)return;const l=(G&&G.augL)||[];{const E=$('msn');if(E){const AM=6,sh=l.length>AM?l.slice(-(AM-1)):l,h='<b style="font-size:.9em">✨ 증강 '+l.length+'</b><div class="augR">'+(l.length?sh.map(k=>{const ik=augIcon(k);return '<i class="t'+AUG[k].t+'">'+(ik?v5img(ik):AUG[k].e)+'</i>'}).join('')+(l.length>AM?'<i class="more">+'+(l.length-AM+1)+'</i>':'')+(G&&G.aset&&Object.keys(G.aset).length?'<i class="more">🔗'+Object.keys(G.aset).length+'</i>':''):'<small style="opacity:.7">5웨이브에 첫 증강</small>')+'</div>';if(E.__h!==h){E.__h=h;E.innerHTML=h}E.style.display=G?'':'none'}S.style.display='none';}const AM=4,sh=l.length>AM?l.map((k,j)=>[k,j]).sort((a,b)=>AUG[b[0]].t-AUG[a[0]].t||b[1]-a[1]).slice(0,AM-1).map(x=>x[0]):l;S.innerHTML=sh.map(k=>{const ik=augIcon(k);return '<i class="t'+AUG[k].t+(ik?' im':'')+'">'+(ik?v5img(ik):AUG[k].e)+'</i>'}).join('')+(l.length>AM?'<i class="more">+'+(l.length-AM+1)+'</i>':'')+(G&&G.aset&&Object.keys(G.aset).length?'<i class="more" style="border-color:#ffd23e">🔗'+Object.keys(G.aset).length+'</i>':'');S.style.display=l.length?'flex':'none';
  L.innerHTML='<div style="text-align:center;color:#c9d0f0">보유 증강 (눌러서 닫기)</div>'+l.map(k=>'<div class="c'+AUG[k].t+'">'+(augIcon(k)?v5img(augIcon(k),'','width:1.4em;height:1.4em;vertical-align:middle'):AUG[k].e)+' <b>'+AUG[k].n+'</b> · '+AUG[k].x+'</div>').join('')+asetList()}
function asetList(){const own=G&&G.aug||{};const L=ASET.map(S=>({S,h:S.ks.filter(k=>own[k]).length})).filter(o=>o.h>0).sort((a,b)=>(SO(b.S.id)-SO(a.S.id))||b.h/b.S.ks.length-a.h/a.S.ks.length);if(!L.length)return '<div style="text-align:center;color:#9aa;margin-top:6px;font-size:.9em">🔗 증강 세트: 정해진 증강을 다 모으면 추가 효과</div>';return '<div style="text-align:center;color:#ffd23e;margin-top:8px">🔗 증강 세트</div>'+L.map(o=>'<div class="'+(SO(o.S.id)?'c2':'c0')+'" style="opacity:'+(SO(o.S.id)?1:.75)+'">'+o.S.e+' <b>'+o.S.n+'</b> '+(SO(o.S.id)?'✅':o.h+'/'+o.S.ks.length)+' · '+o.S.x+'<br><small>'+o.S.ks.map(k=>(own[k]?'✔':'·')+AUG[k].n).join(' ')+'</small></div>').join('')}
// ---------- 사용자 스킬 (보상 상자에서 극악 확률) ----------
const USK={
 meteor:{e:'☄️',n:'운석 낙하',x:'적이 가장 몰린 곳(반경 2칸)에 운석 — 일반 적 체력의 3.5배 피해(일반 적은 한 방)',cd:75,dm:3.5},
 tstop:{e:'⏳',n:'시간 정지',x:'모든 적 5초 정지 (보스 2초)',cd:70},
 gold:{e:'💰',n:'황금 소나기',x:'다음 소환 4번 무료',cd:120},
 bless:{e:'🙌',n:'축복의 손길',x:'가장 높은 영웅 1명 한 단계 승급',cd:75},
 thunder:{e:'⚡',n:'천둥 폭풍',x:'2초 동안 번개 16발 — 한 발에 일반 적 체력의 4배(일반 적 한 방, 보스엔 절반)',cd:75,dm:4},
 judge:{e:'⚖️',n:'최후의 심판',x:'보스 빼고 맨 앞 적 40마리 소멸',cd:120}};
function skDesc(k){const u=USK[k];return u.x+(u.dm&&typeof G!=='undefined'&&G&&G.wave?' · 지금 1회 '+fmt(mobHP(G.wave)*u.dm):'')}
const SK_DROP=.015,SK_PITY=40;
function skAlive(){return G.mobs.filter(o=>o.hp>0&&o.p>=28)}
const SKF={
 meteor(){const ms=skAlive();if(!ms.length)return false;const R=CS*1.9;let best=ms[0],bn=-1;for(const m of ms){const[x,y]=pos(m.p);let n=0;for(const o of ms){const[a,b]=pos(o.p);if(Math.hypot(a-x,b-y)<=R)n++}if(n>bn){bn=n;best=m}}
  const[x,y]=pos(best.p),d=mobHP(G.wave)*3.5*(A('skcd')?1.5:1);if(V5I['meteor/projectile'])G.fx.push({k:'pjimg',imgs:V5I['meteor/projectile'],fps:1,x1:x+120,y1:y-300,x2:x,y2:y,w:CS*1.6,t:.35,T:.35,dl:0});else G.fx.push({k:'tr',x1:x+90,y1:y-260,x2:x,y2:y,w:10,c:'#ff8a3c',t:.35,T:.35,dl:0});
  G.sched.push({t:.35,f:()=>{for(const o of skAlive()){const[a,b]=pos(o.p);if(Math.hypot(a-x,b-y)<=R)hit(o,{},d,0,null)}fxs('meteor/impact',x,y-10,R*2.4,{fps:10});G.fx.push({k:'boom',x,y,r:R,t:.45,T:.45,c:'#ff7a2a'});for(let q=0;q<3;q++)G.fx.push({k:'ring',x,y,r:R*(.6+q*.35),t:.5,T:.5,c:q%2?'#fff':'#ffb05a',dl:q*.06});parts(x,y,30,'#ff9a3c',240,4);G.shake=Math.max(G.shake,.6);G.flash=Math.max(G.flash||0,.25);G.hs=.12;SND.play('special','boom',4)}})},
 tstop(){const ms=skAlive();if(!ms.length)return false;for(const o of ms){const t=o.boss?2:5;o.st=Math.max(o.st||0,t);o.stp=G.time+t}if(V5I['time_stop/fx'])G.fx.push({k:'scr',imgs:V5I['time_stop/fx'],a:.26,t:4,T:4,dl:0});const[x,y]=cellXY(Math.floor(NC/2));for(let q=0;q<3;q++)G.fx.push({k:'ring',x,y,r:CS*(2+q*2),t:.7,T:.7,c:'#8fd0ff',dl:q*.1});G.flash=Math.max(G.flash||0,.2);SND.play('special','freeze',4)},
 gold(){G.freeN=(G.freeN||0)+4;const[x,y]=cellXY(Math.floor(NC/2));for(let q=0;q<3;q++)fxs('gold_rain/fx',x+(q-1)*CS*1.3,y-CS*(q%2),CS*2.6,{fps:8,dl:q*.15});parts(x,y,40,'#ffd23e',260,4);SND.play('jackpot');refresh()},
 bless(){let bi=-1,bt=-1;G.cells.forEach((c,i)=>{if(!c)return;const t=U[c.u].t;if(!c.lk&&t<3&&BY[t+1].length&&(t>bt||(t===bt&&c.n>G.cells[bi].n))){bt=t;bi=i}});if(bi<0){toast('승급할 영웅이 없어요');return false}
  const c=G.cells[bi];c.n--;if(c.n<=0)G.cells[bi]=null;const id=pickU(bt+1);if(!place(id)){c.n++;G.cells[bi]=c;return false}const at=G.cells.findIndex(q=>q&&q.u===id&&q.pop>0),[px,py]=cellXY(at<0?bi:at);burst(px,py,bt+1,true);fxv('blessing/fx',px,py+CS*.45,CS*1.5,{fps:8});G.fx.push({k:'t',x:px,y:py-26,t:1.2,T:1.2,s:'🙌 '+TN[bt+1]+'!',cr:true,dl:.05});SND.play('merge',bt+1);toast('🙌 축복 — '+U[id].n)},
 thunder(){if(!skAlive().length)return false;const d=mobHP(G.wave)*4*(A('skcd')?1.5:1);for(let q=0;q<(A('skcd')?24:16);q++)G.sched.push({t:q*.13,f:()=>{const ms=skAlive();if(!ms.length)return;const m=ms[Math.floor(Math.random()*ms.length)],[x,y]=pos(m.p);if(V5I['thunder/fx'])fxv('thunder/fx',x,y+6,CS*.9,{fps:12});else G.fx.push({k:'zap',x1:x+(Math.random()-.5)*40,y1:y-240,x2:x,y2:y,t:.25,T:.25,c:'#fff36a',w:3.5,dl:0});G.fx.push({k:'ring',x,y,r:26,t:.3,T:.3,c:'#fff36a',dl:0});hit(m,{},m.boss?d*.5:d,0,null);G.shake=Math.max(G.shake,.15);if(q%3===0)SND.play('special','zap',3)}})},
 judge(){const ms=skAlive().filter(o=>!o.boss).sort((a,b)=>b.p-a.p).slice(0,A('skcd')?60:40);if(!ms.length)return false;ms.forEach((o,j)=>{const[x,y]=pos(o.p);if(j<14)fxv('judgement/fx',x,y+6,CS*.85,{fps:10,dl:j*.03});else if(G.fx.length<330)G.fx.push({k:'ray',x,y,t:.5,T:.5,c:'#fff3b0'});stDmg(null,o.hp,o.boss);o.hp=0});G.flash=Math.max(G.flash||0,.35);G.shake=Math.max(G.shake,.5);SND.play('special','laser',4)}};
// 자동 발사: 쿨타임이 차고 쓸 만한 상황이면 알아서 씀
function skWant(k){return true}
function skAutoTick(){if(!G||G.over||G.pause||G.menu)return;const eq=skEq();for(let j=0;j<eq.length;j++){const k=eq[j];if(!USK[k]||(G.uskc&&G.uskc[k]>0))continue;if(skWant(k))useSk(j,1)}}
function skAutoBtn(){const B=$('skA');if(!B)return;const on=!!SAVE.skAuto,vis=skEq().length&&running&&!(G&&G.over),key=on+'|'+vis;if(B.dataset.k===key)return;B.dataset.k=key;B.style.display=vis?'block':'none';B.textContent=on?'자동 ON':'자동 OFF';B.classList.toggle('on',on)}
function skEq(){return (typeof SAVE!=='undefined'&&SAVE.skEq)||[]}
function useSk(j,auto){const k=skEq()[j];if(!k||!USK[k]||!G||G.over||G.pause||G.menu||(!running&&!auto))return;G.uskc=G.uskc||{};if(G.uskc[k]>0)return;if(SKF[k]()===false)return;G.uskc[k]=USK[k].cd*(A('skcd')?.6:1);G.nSk=(G.nSk||0)+1;toast(USK[k].e+' '+USK[k].n+'!'+(auto?' (자동)':''));if(USK[k].dm||k==='judge'){const k0=G.kills;G.sched.push({t:2.4,f:()=>{if(G&&!G.over)toast(USK[k].e+' '+USK[k].n+' — '+(G.kills-k0)+'마리 처치')}})}refresh()}
function skHud(){const eq=skEq();skAutoBtn();for(let j=0;j<2;j++){const B=$('sk'+j);if(!B)continue;const k=eq[j];if(!k||!USK[k]){if(B.style.display!=='none')B.style.display='none';continue}
  const cd=(G.uskc&&G.uskc[k])||0,p=Math.max(0,cd/USK[k].cd),key=k+Math.ceil(cd);if(B.dataset.k!==key){B.dataset.k=key;B.style.display='block';B.style.setProperty('--p',p.toFixed(3));B.innerHTML=(v5u(USKI[k])?v5img(USKI[k]):USK[k].e)+(cd>0?'<small>'+Math.ceil(cd)+'</small>':'');B.classList.toggle('rd',cd<=0);B.title=USK[k].n+' — '+skDesc(k)}else B.style.setProperty('--p',p.toFixed(3))}}
function rcpTick(){const E=$('rcp');if(!E)return;if(G.goal&&U[G.goal]){const gn=goalNeed(),ks=Object.keys(gn),hv=ks.filter(k=>owned(k)>=gn[k]).length,k='g'+G.goal+hv;if(k!==G.rcK){G.rcK=k;E.style.display='flex';E.innerHTML='🎯'+(U[G.goal].url?'<img src=+cardUrl(G.goal)+ alt=>':'')+hv+'/'+ks.length}return}let best=null,bn=0;const have={};for(const c of G.cells)if(c)have[c.u]=1;for(const m in RECIPE){const r=rcp(m),n=r.filter(k=>have[k]).length;if(n>bn){bn=n;best=m}}
  const k=best?best+bn:'';if(k!==G.rcK){G.rcK=k;E.style.display=best&&bn>=2?'flex':'none';if(best)E.innerHTML=(U[best].url?'<img src="'+U[best].url+'" alt="">':'')+bn+'/'+rcp(best).length}}
function bossFoil(m){m.cast=0;m.dcd=4;SND.play('foil');const[x,y]=pos(m.p);G.fx.push({k:'t',x,y:y-50,t:1.1,T:1.1,s:'저지!',cr:true,dl:0});G.fx.push({k:'ring',x,y,r:40,t:.4,T:.4,c:'#8fd8ff',dl:0})}
function bossFire(m){const bk=m.bk||1,J=JB[bk],[x,y]=pos(m.p);m.act=.35;m.dcd=J.cd;let sk=bk;if(bk===6)sk=m.ph2?(m.alt=!m.alt)?3:2:2;
  if(sk===1){m.dash=1.1;SND.play('dash');toast('💨 '+J.n+' — '+J.sk+'!');G.shake=Math.max(G.shake,.35);return}
  toast('👹 '+J.n+' — '+(bk===6?(sk===3?'왕좌의 방벽':'군단 소환'):J.sk)+'!');G.shake=Math.max(G.shake,.3);SND.play('special',sk===3?'buff':'boom',4);
  if(sk===2){fxs(bk===6?'boss6/fx/summon':'boss2/fx/skill',x,y,CS*2.4,{fps:10});const w=G.wave,n=bk===6?8:6;for(let j=0;j<n;j++){const k=Math.min(4,Math.max(0,Math.floor(w/10)-1)),hp=Math.round(mobHP(w)*ENH[k]*.7);G.spawnQ=G.spawnQ||[];G.mobs.push({p:Math.max(0,m.p-6-j*9),hp,max:hp,sl:0,st:0,boss:false,v:ENV[k],k,sd:Math.random()*4})}}
  else if(sk===3){m.shd=5;m.shT=5}
  else if(bk===4){const occ=G.cells.map((c,i)=>c?i:-1).filter(i=>i>=0).sort(()=>Math.random()-.5).slice(0,3);for(const i of occ){G.cells[i].seal=6;const[cx0,cy0]=cellXY(i);G.fx.push({k:'ring',x:cx0,y:cy0,r:CS*.7,t:.4,T:.4,c:'#c77dff',dl:0})}}
  else if(bk===5){G.cdLock=5;fxs('boss5/fx/ripple',x,y,CS*3,{fps:6,T:.6});const[mx,my]=cellXY(Math.floor(NC/2));fxs('boss5/fx/ripple',mx,my,CS*5,{fps:6,T:.8})}}
function bossAI(m,v,dt){if(m.bk===6&&!m.ph2&&m.hp<m.max*.5){m.ph2=1;m.cast=0;m.dash=0;m.dcd=2.5;const[x,y]=pos(m.p);fxs('boss6/fx/skill',x,y-20,CS*3,{fps:8});G.shake=Math.max(G.shake,.6);G.flash=Math.max(G.flash||0,.35);SND.play('bossIn');toast('👑 제르칸 — 왕좌의 해방! (상태 이상 면역)')}
  if(m.act>0)m.act-=dt;if(m.shd>0)m.shd-=dt;
  if(m.cast>0){m.cast-=dt;if(m.rt>0&&!(m.bk===6&&m.ph2)){bossFoil(m);return 0}if(m.cast<=0)bossFire(m);return 0}
  if(m.dash>0){m.dash-=dt;if(m.dash<=0)m.dcd=JB[m.bk||1].cd;return m.rt>0?0:v*4.5}
  m.dcd-=dt;if(m.dcd<=0){m.cast=1.2;m.castT=1.2;SND.play('telegraph')}return v}
// ---------- 사운드 엔진 (Web Audio 합성, 파일 없음) ----------
const SND=(()=>{
  let A=null,M=null,SF=null,BG=null,RV=null,NB=null,mode=0,last={},bgOn=false,bgT=null,bgStep=0,bgNext=0,bgInt=0,bgHome=true;
  try{mode=+(localStorage.getItem('rhd_snd')||0)}catch(e){}
  const now=()=>A.currentTime;
  function init(){if(A)return true;const C=window.AudioContext||window.webkitAudioContext;if(!C)return false;A=new C();
    const comp=A.createDynamicsCompressor();comp.threshold.value=-14;comp.knee.value=10;comp.ratio.value=4;comp.attack.value=.003;comp.release.value=.2;comp.connect(A.destination);
    M=A.createGain();M.connect(comp);SF=A.createGain();SF.connect(M);BG=A.createGain();BG.connect(M);
    // 합성 리버브 (지수 감쇠 노이즈)
    const L=Math.floor(A.sampleRate*2.2),ir=A.createBuffer(2,L,A.sampleRate);for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<L;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/L,3.2)}
    RV=A.createConvolver();RV.buffer=ir;const rg=A.createGain();rg.gain.value=.32;RV.connect(rg);rg.connect(M);
    NB=A.createBuffer(1,A.sampleRate*2,A.sampleRate);const nd=NB.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;
    apply();return true}
  function apply(){if(!A)return;SF.gain.value=mode===2?0:.9;BG.gain.value=mode>=1?0:.42}
  function unlock(){if(!init())return;if(A.state==='suspended')A.resume();if(!bgOn)bgStart()}
  function out(rev){const g=A.createGain();g.connect(SF);if(rev){const s=A.createGain();s.gain.value=rev;g.connect(s);s.connect(RV)}return g}
  function env(g,t,a,peak,dur,curve){g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+a+dur)}
  function tone(type,f0,f1,t,dur,peak,o,a=.004,det=0){const os=A.createOscillator(),g=A.createGain();os.type=type;os.frequency.setValueAtTime(f0,t);if(f1&&f1!==f0)os.frequency.exponentialRampToValueAtTime(f1,t+dur);if(det)os.detune.value=det;env(g,t,a,peak,dur);os.connect(g);g.connect(o);os.start(t);os.stop(t+a+dur+.05);return os}
  function noise(t,dur,peak,o,ft,f0,f1,q=1,a=.003){const s=A.createBufferSource();s.buffer=NB;s.loop=true;const f=A.createBiquadFilter();f.type=ft;f.frequency.setValueAtTime(f0,t);if(f1&&f1!==f0)f.frequency.exponentialRampToValueAtTime(f1,t+dur);f.Q.value=q;const g=A.createGain();env(g,t,a,peak,dur);s.connect(f);f.connect(g);g.connect(o);s.start(t,Math.random()*1.5);s.stop(t+a+dur+.05)}
  function bell(f,t,dur,peak,o){[[1,1],[2.76,.45],[5.4,.25],[8.93,.12]].forEach(([r,v])=>tone('sine',f*r,0,t,dur*(1.1-r*.08),peak*v,o,.002))}
  function metal(f,t,dur,peak,o){[1,1.47,2.09,2.56,3.23].forEach((r,i)=>tone(i%2?'square':'sine',f*r,f*r*.98,t,dur*(1-i*.12),peak*(i?.3:.7),o,.001))}
  function boom(t,size,o){tone('sine',110*size,32,t,.5+size*.35,.9,o,.002);noise(t,.35+size*.3,.7,o,'lowpass',1800,120,.7,.002);noise(t,.08,.5,o,'bandpass',2500,800,1.2,.001)}
  function whoosh(t,dur,peak,o,up=true){noise(t,dur,peak,o,'bandpass',up?300:3000,up?3500:250,2.2,dur*.6)}
  const nt=n=>440*Math.pow(2,(n-69)/12);
  const can=(k,ms)=>{const c=performance.now();if(last[k]&&c-last[k]<ms)return false;last[k]=c;return true};
  const S={
    tap(){const t=now(),o=out(0);tone('sine',900,500,t,.05,.25,o);noise(t,.02,.12,o,'highpass',4000,4000)},
    summon(tier){const t=now(),o=out(.25);whoosh(t,.22,.35,o);[0,4,7].forEach((s,i)=>tone('triangle',nt(76+s),0,t+.12+i*.05,.25,.22,o));
      if(tier>=1){const o2=out(.5);[0,4,7,12,16].forEach((s,i)=>bell(nt(72+s+tier*2),t+.25+i*.07,.9,.22,o2));if(tier>=2)boom(t+.2,.6,o2)}},
    merge(tier){const t=now(),o=out(.35);whoosh(t,.35,.45,o);const base=60+tier*4;[0,4,7,12].forEach((s,i)=>bell(nt(base+s),t+.28+i*.06,1+tier*.3,.2+tier*.03,o));
      tone('sawtooth',nt(base-12),nt(base),t,.32,.12,o);if(tier>=2)boom(t+.3,.5+tier*.25,o);if(tier>=3){const o2=out(.7);noise(t+.3,1.4,.25,o2,'highpass',3000,9000,.7,.2)}},
    cosmic(){const t=now(),o=out(.8);tone('sine',90,28,t,1.6,1,o,.01);noise(t,1.1,.4,o,'bandpass',200,4000,1.4,.9);
      [48,55,60,64,67].forEach((n,i)=>{[-12,0,7].forEach(d=>tone('sawtooth',nt(n),0,t+.9,2.2,.05,o,.35,d))});
      [72,76,79,84,88,91].forEach((n,i)=>bell(nt(n),t+.95+i*.09,1.8,.24,o));boom(t+.9,1.4,o)},
    hit(){if(!can('hit',55))return;const t=now(),o=out(0);noise(t,.04,.13,o,'bandpass',1400+Math.random()*1600,800,1.5);tone('sine',180+Math.random()*60,70,t,.06,.14,o)},
    die(){if(!can('die',45))return;const t=now(),o=out(0);tone('triangle',520+Math.random()*200,160,t,.09,.12,o);noise(t,.05,.09,o,'highpass',2500,1500)},
    special(kind,tier){if(!can('sp'+kind,90))return;const t=now(),big=tier>=3?1:0,o=out(.25+big*.35);
      if(kind==='boom'){whoosh(t,.2,.25,o);boom(t+.15,.7+tier*.25,o)}
      else if(kind==='zap'){for(let i=0;i<7;i++){noise(t+i*.035,.06,.35,o,'highpass',2500+Math.random()*4000,1800,4);tone('sawtooth',300+Math.random()*900,80,t+i*.035,.07,.12,o)}boom(t+.05,.4+tier*.2,o)}
      else if(kind==='laser'){tone('sawtooth',220,1800,t,.35,.4,o);tone('square',440,3600,t,.3,.18,o);noise(t+.1,.3,.5,o,'bandpass',3000,1200,3);boom(t+.25,.35,o)}
      else if(kind==='freeze'){[96,91,88,84,79,76].forEach((n,i)=>bell(nt(n),t+i*.06,1.6,.2,o));noise(t,1.2,.25,o,'highpass',6000,2500,.8,.3);tone('sine',300,60,t,1.4,.3,o,.05)}
      else if(kind==='buff'){[0,4,7,11,14].forEach((s,i)=>tone('sine',nt(79+s),0,t+i*.05,.5,.13,o,.01));noise(t,.6,.14,o,'highpass',5000,9000,.7,.2)}
      else if(kind==='smash'){noise(t,.05,.5,o,'bandpass',900,400,1);tone('sine',140,45,t,.3,.7,o);metal(320+Math.random()*80,t,.35,.15,o)}
      else if(kind==='slash'){noise(t,.14,.4,o,'highpass',2500,7000,1.5,.01);metal(1200,t+.04,.5,.12,o)}
      else {whoosh(t,.16,.25,o);tone('triangle',700,250,t+.1,.18,.25,o);noise(t+.12,.12,.3,o,'lowpass',2400,500)}
      if(tier>=4){const o2=out(.9);noise(t,.9,.3,o2,'bandpass',150,3000,1.2,.5);boom(t+.25,1.2,o2)}},
    cutin(){const t=now(),o=out(.6);noise(t,.5,.9,o,'bandpass',400,6000,2.5,.15);tone('sawtooth',nt(45),nt(57),t,.5,.25,o,.05)},
    coin(n=1){const t=now(),o=out(.2);for(let i=0;i<Math.min(n,10);i++){const tt=t+i*.055+Math.random()*.02;tone('square',nt(95),0,tt,.05,.06,o);tone('sine',nt(100),0,tt+.05,.22,.14,o)}},
    jackpot(){const t=now(),o=out(.5);this.coin(10);[72,76,79,84,88].forEach((n,i)=>{bell(nt(n),t+.4+i*.08,1.2,.22,o);tone('square',nt(n),0,t+.4+i*.08,.12,.05,o)});boom(t+.4,.6,o)},
    scratch(){const t=now(),o=out(0);for(let i=0;i<6;i++)noise(t+i*.06,.06,.4,o,'bandpass',2500+i*300,4000,3)},
    lose(){const t=now(),o=out(.2);tone('sawtooth',300,150,t,.35,.12,o);tone('sawtooth',225,110,t+.3,.5,.12,o)},
    win(m){const t=now(),o=out(.4);const k=Math.min(4,Math.log2(m+1)|0);[0,4,7,12].slice(0,2+k).forEach((s,i)=>bell(nt(76+s),t+i*.08,1,.22,o));this.coin(2+k*2)},
    bossIn(){const t=now(),o=out(.5);[0,.55].forEach(d=>{[55,55.5,82.5].forEach(f=>tone('sawtooth',f,f*.98,t+d,.5,.16,o,.06));noise(t+d,.3,.3,o,'lowpass',400,100,.8);tone('sine',70,40,t+d,.4,.6,o)});[0,.2,.4].forEach(d=>tone('sine',880,880,t+1.2+d,.12,.12,o))},
    telegraph(){const t=now(),o=out(.2);tone('sawtooth',60,140,t,1.1,.18,o,.2);noise(t,1.1,.18,o,'bandpass',200,900,3,.6)},
    dash(){const t=now(),o=out(.3);noise(t,.9,1,o,'bandpass',150,1200,1.5,.05);tone('sawtooth',80,40,t,.6,.4,o);tone('sine',60,30,t,.5,.5,o)},
    foil(){const t=now(),o=out(.5);metal(620,t,.9,.3,o);boom(t,.3,o)},
    alarm(){if(!can('alarm',4000))return;const t=now(),o=out(.2);for(let i=0;i<3;i++){tone('square',740,520,t+i*.3,.22,.1,o);tone('square',745,525,t+i*.3,.22,.08,o)}},
    mission(){const t=now(),o=out(.4);[72,76,79,84].forEach((n,i)=>{tone('triangle',nt(n),0,t+i*.07,.3,.18,o);bell(nt(n+12),t+i*.07,.5,.06,o)})},
    bounty(){const t=now(),o=out(.6);bell(nt(55),t,2,.4,o);bell(nt(62),t+.5,1.8,.3,o)},
    bountyKill(){this.jackpot()},
    boonOpen(){const t=now(),o=out(.7);noise(t,1,.3,o,'bandpass',300,6000,1.5,.6);[67,71,74,79,83].forEach((n,i)=>tone('sine',nt(n),0,t+.3+i*.08,.8,.12,o,.02))},
    boonPick(){const t=now(),o=out(.5);[79,84,88].forEach((n,i)=>bell(nt(n),t+i*.06,1,.25,o))},
    wave(){if(!can('wave',3000))return;const t=now(),o=out(.2);tone('sine',120,50,t,.25,.35,o);noise(t,.15,.15,o,'lowpass',800,200)},
    over(){const t=now(),o=out(.6);[69,65,62,57].forEach((n,i)=>tone('sawtooth',nt(n),nt(n)*.99,t+i*.32,.6,.1,o,.03));tone('sine',60,30,t+1.2,1.5,.5,o)},
    roll(){if(!can('roll',35))return;const t=now(),o=out(0);tone('square',nt(84+Math.floor(Math.random()*5)),0,t,.04,.16,o)},
    reveal(){const t=now(),o=out(.6);boom(t,.5,o);[72,76,79,84,88,91].forEach((n,i)=>bell(nt(n),t+.05+i*.05,1.2,.18,o))},
    card(){if(!can('card',40))return;const t=now(),o=out(.1);noise(t,.05,.2,o,'highpass',3000,6000,1);tone('sine',nt(88),0,t,.12,.06,o)},
  };
  // ---------- 배경음악 (절차 생성, 우주 모험풍) ----------
  const PROG=[[57,60,64],[53,57,60],[60,64,67],[55,59,62]],BPM=96,SPB=60/BPM/4;
  function bgVoice(type,f,t,dur,peak,lp){const os=A.createOscillator(),g=A.createGain(),fl=A.createBiquadFilter();os.type=type;os.frequency.value=f;fl.type='lowpass';fl.frequency.value=lp;env(g,t,Math.min(.08,dur*.3),peak,dur);os.connect(fl);fl.connect(g);g.connect(BG);os.start(t);os.stop(t+dur+.1)}
  function bgTick(){if(!A)return;while(bgNext<A.currentTime+.25){const t=bgNext,s=bgStep%64,bar=Math.floor(s/16),ch=PROG[bar],I=bgInt,home=bgHome;
      if(s%16===0)ch.forEach(n=>{[-6,6].forEach(d=>{const os=A.createOscillator(),g=A.createGain(),fl=A.createBiquadFilter();os.type='sawtooth';os.frequency.value=nt(n);os.detune.value=d;fl.type='lowpass';fl.frequency.value=700+I*900;env(g,t,.6,.035,SPB*16-.3);os.connect(fl);fl.connect(g);g.connect(BG);const sg=A.createGain();sg.gain.value=.5;g.connect(sg);sg.connect(RV);os.start(t);os.stop(t+SPB*16+.2)})});
      if(s%4===0)bgVoice('triangle',nt(ch[0]-24),t,SPB*3.5,.22,500);
      if(!home&&s%2===0){const n=ch[(s/2)%3]+12+((s%8===6)?12:0);bgVoice('square',nt(n),t,SPB*1.6,.028+I*.012,1800+I*1500)}
      if(home&&s%4===2){const n=ch[(s/4|0)%3]+24;const os=A.createOscillator(),g=A.createGain();os.type='sine';os.frequency.value=nt(n);env(g,t,.01,.03,1.2);os.connect(g);g.connect(BG);const sg=A.createGain();sg.gain.value=.8;g.connect(sg);sg.connect(RV);os.start(t);os.stop(t+1.3)}
      if(!home){if(s%8===0||(I>0&&s%8===6)){const os=A.createOscillator(),g=A.createGain();os.frequency.setValueAtTime(130,t);os.frequency.exponentialRampToValueAtTime(42,t+.18);env(g,t,.002,.32+I*.1,.22);os.connect(g);g.connect(BG);os.start(t);os.stop(t+.3)}
        if(s%8===4){const sr=A.createBufferSource();sr.buffer=NB;const f=A.createBiquadFilter();f.type='bandpass';f.frequency.value=1800;const g=A.createGain();env(g,t,.002,.1+I*.05,.16);sr.connect(f);f.connect(g);g.connect(BG);sr.start(t,Math.random());sr.stop(t+.2)}
        if(I>0||s%2===0){const sr=A.createBufferSource();sr.buffer=NB;const f=A.createBiquadFilter();f.type='highpass';f.frequency.value=7000;const g=A.createGain();env(g,t,.001,.03+I*.02,.04);sr.connect(f);f.connect(g);g.connect(BG);sr.start(t,Math.random());sr.stop(t+.06)}}
      bgStep++;bgNext+=SPB}}
  function bgStart(){if(!A||bgOn)return;bgOn=true;bgNext=A.currentTime+.1;bgT=setInterval(bgTick,60)}
  const api={unlock,mode:()=>mode,cycle(){mode=(mode+1)%3;try{localStorage.setItem('rhd_snd',mode)}catch(e){}if(!A)init();apply();return mode},
    bg(home,int){bgHome=home;bgInt=int||0},
    play(k,...a){if(!A||mode===2||A.state!=='running')return;try{S[k]&&S[k](...a)}catch(e){}}};
  return api})();
document.addEventListener('pointerdown',e=>{SND.unlock();const b=e.target.closest&&e.target.closest('button');if(b)SND.play('tap')},true);

const SPD={"gamer":"불꽃 슬리퍼로 한 명 강타","veteran":"수류탄으로 주변 3명 폭발","napoleon":"쌍권총 난사 30발","jir":"주변 전체에 연쇄 벼락","zeus":"사거리 안 모두에게 벼락 + 기절","cleanbot":"주변 폭발 + 감속","deliverybot":"택배 3개 연속 투하","policebot":"일직선 관통 광선","fortressbot":"미사일 폭격","archeon":"위성 포격 + 받는 피해 증가","mole":"진흙 범벅 범위 감속","alpaca":"왕침 범위 피해 + 약화","orca":"주변 아군 공격속도 +40%","mugyeom":"적을 한 점으로 모아 양손 강타","pico":"태엽 박치기 단일 강타","jacko":"스프링 강타 작은 범위","bricks":"가장 강한 적 저격","mold":"찰흙 장판 — 밟으면 속박","lunette":"저주 폭발 + 받는 피해 증가","orbin":"큰 틀니로 단일 강타","nero":"처치하면 코인 보너스","vargon":"냄비·포크·양념병 중 무작위","seraphine":"주변 아군 쿨타임 가속","belkaon":"공격↑·쿨타임↑·코인 중 무작위","floret":"길 위에 독 장판","sporun":"주변 아군 사거리 +1칸","cacton":"체력 30% 이하 즉시 처형","elderon":"범위 뿌리 강타 · 플로라시아 옆이면 강화","sylvaion":"길 전체에 뿌리 장판","momo":"주변 아군 공격에 감속 부여","pulu":"큰 감속 구슬 · 기본공격도 감속","bubon":"적을 뒤로 밀쳐냄","stella":"적 사이를 튕기는 연쇄 구슬","chronel":"모든 적 시간 정지"};
function sndKind(s){if(s.nade||s.aoe||s.salvo||s.dust||s.roots||s.poison)return 'boom';if(s.bolt||s.smite||s.chain)return 'zap';if(s.beam||s.snipe)return 'laser';if(s.tstop)return 'freeze';if(s.abuff||s.cdr||s.rbuff||s.slbuff||s.gamble)return 'buff';if(s.mhit||s.knock||s.gather||s.trap)return 'smash';if(s.exec)return 'slash';return 'shot'}
function sndBtn(){const b=$('bSnd');if(b)b.textContent=['🔊','🎵','🔇'][SND.mode()];}
function synOn(i,u){const[x,y]=cellXY(i);for(let j=0;j<NC;j++){const o=G.cells[j];if(!o||j===i||U[o.u].planet!==u.planet)continue;const[ox,oy]=cellXY(j);if(Math.hypot(ox-x,oy-y)<=CS*1.6)return true}return false}
function special(c,i,u,s,x,y,best){
  if(u.spR)u=Object.assign(Object.create(u),{r:u.spR});
  {const L=lvK(c.u,.05);if(L>1){s=Object.assign({},s);for(const f of LVF)if(typeof s[f]==='number')s[f]*=L}}
  const d=u.d*(c.pa||1)*c.n*mult(c.u)*tileMult(i)*(c.sh>0?1.3:1)*(c.sy||1)*augA(c)*s.m*(SPK_NO.has(c.u)?1:SPK),col=u.col,P=o=>G.fx.push(o);c.bT=.6;c.b=.6;
  SND.play('special',sndKind(s),u.t);if(!cutOnce('sk:'+c.u,c.u,u.n+' — '+s.n+'!')&&G.fx.length<300)G.fx.push({k:'t',x,y:y-CS*.55,t:1.1,T:1.1,s:'★ '+s.n,cr:true,dl:0});if(u.t>=3)G.flash=Math.max(G.flash||0,.15);G.shake=Math.max(G.shake,u.t>=3?.15:.06);
  P({k:'ring',x,y,r:40,t:.4,T:.4,c:col});P({k:'ray',x,y,t:.5,T:.5,c:col});
  const hitAll=(cx,cy,r,f)=>{for(const m of G.mobs){if(m.hp<=0||m.p<28)continue;const[mx,my]=pos(m.p);if(Math.hypot(mx-cx,my-cy)<=r)f(m)}};
  
  const[tx,ty]=pos(best.p);{const dd=Math.hypot(tx-x,ty-y)||1;c.ax=(tx-x)/dd;c.ay=(ty-y)/dd;c.ad=dd}
  if(s.fusk&&u.pk&&FUSK[c.u]){if(u.aniSk){const g=['blue','jade','red','white'][c.hwI||0];u.ani.special=u.aniSk[g]}const A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;FUSK[c.u](c,i,u,s,d,best);return}
  if(s.nade&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{if(!G.cells.includes(c))return;const tgt=best&&best.hp>0?best:pickT(x,y,u.r,null);if(!tgt)return;const[lx,ly]=pos(tgt.p),[sx,sy]=sockXY(c,i,u,'special'),fl=cf.nadeT||.55;c.ax=(lx-x)/(Math.hypot(lx-x,ly-y)||1);
      for(let j=0;j<stN(c,u);j++){const[ox,oy]=stOff(c,u,j);P({k:'pjimg',imgs:pk.sproj||pk.proj,fps:12,x1:sx+ox,y1:sy+oy,x2:lx,y2:ly,w:cf.projW*cf.spScale,h:(cf.nadeArc||.8)*CS,t:fl,T:fl,dl:0})}
      G.sched.push({t:fl,f:()=>{if(pk.sfxhit)P({k:'seq',imgs:pk.sfxhit,fps:7,w:Math.max(cf.sfxW,s.r*3.4),x:lx,y:ly,t:pk.sfxhit.length/7,T:pk.sfxhit.length/7,dl:0});G.shake=Math.max(G.shake,.55);G.flash=Math.max(G.flash||0,.25);
        P({k:'ring',x:lx,y:ly,r:s.r*1.25,t:.35,T:.35,c:'#ffb347'});P({k:'ring',x:lx,y:ly,r:s.r*.8,t:.25,T:.25,c:'#fff3c4'});parts(lx,ly,16,'#ff9a2e',150,3.2);parts(lx,ly,10,'#5a4a3a',90,3.8);parts(lx,ly,8,'#ffe9a8',200,2.2);
        const list=G.mobs.filter(o=>o.hp>0&&o.p>=28&&Math.hypot(pos(o.p)[0]-lx,pos(o.p)[1]-ly)<=s.r).sort((a,b)=>(Math.hypot(pos(a.p)[0]-lx,pos(a.p)[1]-ly)-Math.hypot(pos(b.p)[0]-lx,pos(b.p)[1]-ly))||(b.p-a.p)).slice(0,s.max||3);
        for(const m of list)hit(m,{},d,0,c)}})}});return}
  if(s.smite&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0]*.55,f:()=>{if(!G.cells.includes(c))return;parts(x,y-20,18,(s.col||'#ffe45a'),120,2.6);P({k:'ring',x,y:y-10,r:50,t:.4,T:.4,c:(s.col||'#fff3a8')})}});
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),[sx,sy]=sockXY(c,ci,u,'special');
      P({k:'seq',imgs:pk.fx,fps:cf.fxFps,w:cf.fxW,x:sx,y:sy,t:pk.fx.length/cf.fxFps,T:pk.fx.length/cf.fxFps,dl:0});P({k:'ring',x:cx0,y:cy0,r:u.r,t:.6,T:.6,c:(s.col||'#ffe45a')});G.flash=Math.max(G.flash||0,.45);G.shake=Math.max(G.shake,.8);
      const list=G.mobs.filter(o=>o.hp>0&&o.p>=28&&Math.hypot(pos(o.p)[0]-cx0,pos(o.p)[1]-cy0)<=u.r).sort((a,b)=>(b.boss?1e9:b.p)-(a.boss?1e9:a.p));if(s.one){list.sort((a,b)=>(b.boss?1e30:b.hp)-(a.boss?1e30:a.hp));list.length=Math.min(list.length,s.one)}
      list.forEach((o,q)=>{const dl=Math.min(.6,.03*q)+Math.random()*.05;G.sched.push({t:dl,f:()=>{if(o.hp<=0)return;const[ox,oy]=pos(o.p);
        if(q<26){P({k:'seq',imgs:pk.bolt,fps:12,w:cf.sfxW,x:ox,y:oy+4,t:2/12,T:2/12,dl:0});P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:cf.sfxW,x:ox,y:oy+4,t:pk.sfxhit.length/cf.sfxFps,T:pk.sfxhit.length/cf.sfxFps,dl:.08});parts(ox,oy,5,(s.col||'#ffe45a'),120,2.2)}
        G.shake=Math.max(G.shake,.3);if(s.st&&!o.boss)o.st=Math.max(o.st||0,s.st);hit(o,{},d,0,c);if(s.vu)o.vu=Math.max(o.vu||0,s.vu)}})})}});return}
  if(s.dust&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),N=stN(c,u);
      for(let j=0;j<N;j++){const[ox,oy]=stOff(c,u,j);P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:s.r*1.5,x:cx0+ox,y:cy0+oy+2,t:pk.sfxhit.length/cf.sfxFps,T:pk.sfxhit.length/cf.sfxFps,dl:j*.05})}
      P({k:'ring',x:cx0,y:cy0,r:s.r,t:.5,T:.5,c:'#d9c29a'});parts(cx0,cy0,20,'#cdb48a',170,3.6);parts(cx0,cy0,10,'#8a7a62',110,3);G.shake=Math.max(G.shake,.3);
      for(const o of G.mobs){if(o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p);if(Math.hypot(ox-cx0,oy-cy0)>s.r)continue;parts(ox,oy,4,'#cdb48a',70,2.6,.08);hit(o,{sl:s.sl},d,.08,c)}}});return}
  if(s.cone&&u.pk){const pk=u.pk,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),m=pickT(cx0,cy0,Math.max(u.r,s.r),best)||best;if(!m||m.hp<=0)return;const[mx,my]=pos(m.p);c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);
      const[sx,sy]=sockXY(c,ci,u,'special'),a=Math.atan2(my-sy,mx-sx),R=s.r,ha=s.ang*Math.PI/180;
      if(s.sweep&&pk.sseq)P({k:'seq',imgs:pk.sseq,fps:12,w:R*1.7,x:sx+Math.cos(a)*R*.45,y:sy+Math.sin(a)*R*.45,t:.4,T:.4,dl:0,fl:Math.cos(a)<0?-1:1});else if(pk.cone)P({k:'bimg',imgs:pk.cone,x:sx,y:sy,a,L:R*1.05,w:Math.max(CS*.9,2*R*Math.tan(ha)*.95),t:.6,T:.6,dl:0});
      G.shake=Math.max(G.shake,s.big?.7:.3);if(s.big)G.flash=Math.max(G.flash||0,.25);
      for(const o of G.mobs){if(o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p),dx=ox-sx,dy=oy-sy,dd=Math.hypot(dx,dy);if(dd>R+12)continue;let da=Math.abs(Math.atan2(dy,dx)-a);if(da>Math.PI)da=2*Math.PI-da;if(dd>CS*.45&&da>ha)continue;hit(o,{},d,.04+dd/R*.15,c);if(G.fx.length<320)parts(ox,oy,3,s.col||'#ffb040',90,2.2,.05+dd/R*.15)}}});return}
  if(s.beam&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),N=stN(c,u),dj=d/N,m=pickT(cx0,cy0,u.r,best)||best;if(!m)return;const[mx,my]=pos(m.p);c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);
      for(let j=0;j<N;j++){const[sx,sy]=sockXY(c,ci,u,'special',null,j),a=Math.atan2(my-sy,mx-sx),nx=Math.cos(a),ny=Math.sin(a);
        P({k:'seq',imgs:pk.fx,fps:cf.fxFps,w:cf.fxW,x:sx,y:sy,t:pk.fx.length/cf.fxFps,T:pk.fx.length/cf.fxFps,dl:0,fl:(c.ax||1)<0?-1:1});
        P({k:'bimg',imgs:pk.beam,x:sx,y:sy,a,L:s.len,w:70,t:.45,T:.45,dl:0});
        for(const o of G.mobs){if(o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p),al=(ox-sx)*nx+(oy-sy)*ny,pe=Math.abs(-(ox-sx)*ny+(oy-sy)*nx);if(al<-6||al>s.len||pe>s.bw)continue;
          const dl=.03+al/s.len*.08;P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:cf.sfxW,m:o,x:ox,y:oy,t:pk.sfxhit.length/cf.sfxFps,T:pk.sfxhit.length/cf.sfxFps,dl});hit(o,{},dj,dl,c)}}
      G.shake=Math.max(G.shake,.4);G.flash=Math.max(G.flash||0,.15)}});return}
  if(s.salvo&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;const used=new Set();
    for(const[et,sk]of A.ev)G.sched.push({t:et,f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),N=stN(c,u),dj=d/N;
      for(let j=0;j<N;j++)for(let q=0;q<(s.per||1);q++){const cand=G.mobs.filter(o=>o.hp>0&&o.p>=28&&Math.hypot(pos(o.p)[0]-cx0,pos(o.p)[1]-cy0)<=u.r);if(!cand.length)return;
        const fresh=cand.filter(o=>!used.has(o)),tg=(fresh.length?fresh:cand)[Math.floor(Math.random()*(fresh.length?fresh:cand).length)];used.add(tg);
        const[tx0,ty0]=pos(tg.p),lx=tx0+(Math.random()-.5)*10,ly=ty0+(Math.random()-.5)*10,[sx,sy]=sockXY(c,ci,u,'special',sk,j),fl=.5+q*.07;
        P({k:'seq',imgs:pk.fx,fps:cf.fxFps,w:cf.fxW,x:sx,y:sy,t:pk.fx.length/cf.fxFps,T:pk.fx.length/cf.fxFps,dl:q*.07,fl:(c.ax||1)<0?-1:1});
        P({k:'pjimg',imgs:pk.sproj,fps:12,x1:sx,y1:sy,x2:lx,y2:ly,w:cf.projW*cf.spScale,h:CS*1.6,t:.5,T:.5,dl:q*.07});
        G.sched.push({t:fl,f:()=>{P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:s.r*2.4,x:lx,y:ly,t:pk.sfxhit.length/cf.sfxFps,T:pk.sfxhit.length/cf.sfxFps,dl:0});
          P({k:'ring',x:lx,y:ly,r:s.r,t:.35,T:.35,c:'#ff9a3c'});parts(lx,ly,10,'#ff9a2e',150,3);parts(lx,ly,6,'#4a3a30',90,3.4);G.shake=Math.max(G.shake,.45);G.flash=Math.max(G.flash||0,.12);
          for(const o of G.mobs){if(o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p);if(Math.hypot(ox-lx,oy-ly)<=s.r)hit(o,{},dj,0,c)}}})}}});return}
  if(s.aoe&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),N=stN(c,u),cand=G.mobs.filter(o=>o.hp>0&&o.p>=28&&Math.hypot(pos(o.p)[0]-cx0,pos(o.p)[1]-cy0)<=u.r);let m=null,bn=-1;for(const o of cand){const[ax,ay]=pos(o.p);let n=o.boss?3:0;for(const w of G.mobs){if(w.hp<=0||w.p<28)continue;const[bx,by]=pos(w.p);if(Math.hypot(ax-bx,ay-by)<=s.r)n++}if(n>bn){bn=n;m=o}}if(!m)return;const[lx,ly]=pos(m.p);c.ax=(lx-cx0)/(Math.hypot(lx-cx0,ly-cy0)||1);let fl=0;
      for(let j=0;j<N;j++){const[sx,sy]=sockXY(c,ci,u,'special',null,j);if(pk.fx)P({k:'seq',imgs:pk.fx,fps:cf.fxFps,w:cf.fxW*1.4,x:sx,y:sy,t:pk.fx.length/cf.fxFps,T:pk.fx.length/cf.fxFps,dl:0,fl:(c.ax||1)<0?-1:1});
        if(s.proj){fl=Math.max(.15,Math.hypot(lx-sx,ly-sy)/(cf.spCps*CS));P({k:'pjimg',imgs:pk.sproj||pk.proj,fps:12,x1:sx,y1:sy,x2:lx,y2:ly,w:cf.projW*cf.spScale,h:CS*.4,t:fl,T:fl,dl:0})}}
      if(s.ar)G.cells.forEach((o,j)=>{if(!o)return;const[ox,oy]=cellXY(j);if(Math.hypot(ox-cx0,oy-cy0)>s.ar)return;o.sh=o.shT=s.adur;parts(ox,oy-10,6,'#9fd0ff',70,2.4);if(o!==c)buffFx(cx0,cy0,ox,oy,'공격↑','#9fd0ff')});if(s.ar)P({k:'ring',x:cx0,y:cy0,r:s.ar,t:.5,T:.5,c:'#9fd0ff'});
      G.sched.push({t:fl+.001,f:()=>{if(pk.sfxhit)P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:s.r*2.8,x:lx,y:ly,t:pk.sfxhit.length/cf.sfxFps,T:pk.sfxhit.length/cf.sfxFps,dl:0});else{for(let q=0;q<3;q++)P({k:'ring',x:lx,y:ly,r:s.r*(1-q*.28),t:.5,T:.5,c:q%2?'#2a1238':(s.col||'#fff'),dl:q*.08});for(const o of G.mobs){if(o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p);if(Math.hypot(ox-lx,oy-ly)<=s.r)P({k:'star',x:ox,y:oy,r:11,t:.2,T:.2,c:s.col||'#fff',dl:Math.random()*.12})}parts(lx,ly,26,s.col||'#fff',210,3.4);parts(lx,ly,14,'#2a1238',140,4);G.flash=Math.max(G.flash||0,.3);G.shake=Math.max(G.shake,.6)}P({k:'ring',x:lx,y:ly,r:s.r,t:.4,T:.4,c:PC[c.u]||'#fff'});G.shake=Math.max(G.shake,.25);
        for(const o of G.mobs){if(o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p);if(Math.hypot(ox-lx,oy-ly)>s.r)continue;hit(o,{sl:s.sl,st:s.st?1:0,dot:s.burn||0,dott:s.burnT||0},d,0,c);if(s.vu)o.vu=Math.max(o.vu||0,s.vu)}if(s.zdur)(G.zones=G.zones||[]).push({p:m.p,seg:s.seg,t:s.zdur,T:s.zdur,dot:1,tk:.5,d:d*s.zm,c,sl:s.zsl,imgs:pk.field||pk.trap,seen:new Set()})}})}});return}
  if(s.rand&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),N=stN(c,u),dj=d/N,sT=pk.sfxhit.length/cf.sfxFps,SQ=(x,y,w,dl,mm)=>P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w,m:mm,x,y,t:sT,T:sT,dl});
      for(let j=0;j<N;j++){const m=pickT(cx0,cy0,u.r,best);if(!m)continue;const[mx,my]=pos(m.p);if(!j)c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);const[sx,sy]=sockXY(c,ci,u,'special',null,j),fl=Math.max(.12,Math.hypot(mx-sx,my-sy)/(cf.spCps*CS)),v=Math.floor(Math.random()*3);
        if(v===0){P({k:'pjimg',imgs:pk.sproj_pot,fps:12,x1:sx,y1:sy,x2:mx,y2:my,m,w:38,t:fl,T:fl,dl:0});SQ(mx,my,70,fl,m);m.inc=(m.inc||0)+dj*s.pot;G.pend.push({m,u:{},d:dj*s.pot,t:fl,x:mx,y:my,c});G.fx.push({k:'t',x:cx0,y:cy0-26,t:.8,T:.8,s:'냄비!',cr:true,dl:0})}
        else if(v===1){const a=Math.atan2(my-sy,mx-sx),nx=Math.cos(a),ny=Math.sin(a),tf=s.len/(cf.spCps*1.8*CS);P({k:'pjimg',imgs:pk.sproj_fork,fps:12,x1:sx,y1:sy,x2:sx+nx*s.len,y2:sy+ny*s.len,w:40,t:tf,T:tf,dl:0});P({k:'tr',x1:sx,y1:sy,x2:sx+nx*s.len,y2:sy+ny*s.len,w:3,c:'#ffe9b0',t:tf+.1,T:tf+.1,dl:0});G.fx.push({k:'t',x:cx0,y:cy0-26,t:.8,T:.8,s:'포크!',cr:true,dl:0});
          for(const o of G.mobs){if(o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p),al=(ox-sx)*nx+(oy-sy)*ny,pe=Math.abs(-(ox-sx)*ny+(oy-sy)*nx);if(al<-6||al>s.len||pe>s.bw)continue;const dl=al/s.len*tf;SQ(ox,oy,50,dl,o);hit(o,{},dj*s.fork,dl,c)}}
        else{P({k:'pjimg',imgs:pk.sproj_bottle,fps:12,x1:sx,y1:sy,x2:mx,y2:my,w:38,h:CS*.7,t:fl+.1,T:fl+.1,dl:0});G.fx.push({k:'t',x:cx0,y:cy0-26,t:.8,T:.8,s:'양념병!',cr:true,dl:0});
          G.sched.push({t:fl+.1,f:()=>{SQ(mx,my,s.r*2.8,0);P({k:'ring',x:mx,y:my,r:s.r,t:.35,T:.35,c:'#c77dff'});parts(mx,my,14,'#ff5a4a',150,3);G.shake=Math.max(G.shake,.3);for(const o of G.mobs){if(o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p);if(Math.hypot(ox-mx,oy-my)<=s.r)hit(o,{},dj*s.bot,0,c)}}})}}}});return}
  if(s.cdr&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),sT=pk.sfxhit.length/cf.sfxFps;
      if(pk.cast)P({k:'seq',imgs:pk.cast,fps:6,w:s.r*1.5,x:cx0,y:cy0-4,t:pk.cast.length/6,T:pk.cast.length/6,dl:0});P({k:'ring',x:cx0,y:cy0,r:s.r,t:.5,T:.5,c:'#5fe0c0'});
      G.cells.forEach((o,j)=>{if(!o||o===c)return;const q=U[o.u].sp2;if(!q||q.cdr)return;const[ox,oy]=cellXY(j);if(Math.hypot(ox-cx0,oy-cy0)>s.r)return;o.hst=s.dur;o.hsv=s.rate;buffFx(cx0,cy0,ox,oy,'쿨타임↑','#ffe38a',pk.link);P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:46,x:ox,y:oy-6,t:sT,T:sT,dl:.1});parts(ox,oy-10,6,'#ffe38a',70,2.4)})}});return}
  if(s.gamble&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),sT=pk.sfxhit.length/cf.sfxFps,v=Math.floor(Math.random()*3);
      if(pk.cast)P({k:'seq',imgs:pk.cast,fps:8,w:CS*2.2,x:cx0,y:cy0+GROUND-4,t:pk.cast.length/8,T:pk.cast.length/8,dl:0});
      if(v===2){const b=killCoin(G.wave)*s.coinK;G.coins+=b;toast('🎲 코인 +'+b+'!');if(pk.coin_reward)P({k:'seq',imgs:pk.coin_reward,fps:5,w:CS*1.6,x:cx0,y:cy0-CS*.7,t:.5,T:.5,dl:0});parts(cx0,cy0-10,26,'#ffd23e',200,3.4);G.fx.push({k:'t',x:cx0,y:cy0-30,t:1.2,T:1.2,s:'+'+b+'🪙',cr:true,dl:0});return}
      toast(v===0?'🎲 아군 전체 공격 강화!':'🎲 아군 전체 쿨타임 가속!');
      G.cells.forEach((o,j)=>{if(!o)return;const[ox,oy]=cellXY(j);if(v===0){o.sh=o.shT=s.dur}else{if(o===c)return;o.hsv=Math.max(o.hst>0?o.hsv||1:1,s.rate);o.hst=Math.max(o.hst||0,s.dur)}P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:46,x:ox,y:oy-4,t:sT,T:sT,dl:Math.random()*.2});parts(ox,oy-10,5,v===0?'#7dffb0':'#8fd8ff',70,2.4);if(G.fx.length<330)G.fx.push({k:'t',x:ox,y:oy-22,t:1.1,T:1.1,s:v===0?'공격↑':'쿨타임↑',cr:false,dl:.15})})}});return}
  if(s.poison&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),m=pickT(cx0,cy0,u.r,best)||best;if(!m)return;const pc=m.p,[mx,my]=pos(pc);c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);const[sx,sy]=sockXY(c,ci,u,'special'),fl=Math.max(.15,Math.hypot(mx-sx,my-sy)/(cf.spCps*CS)),sT=pk.sfxhit.length/cf.sfxFps;
      P({k:'pjimg',imgs:pk.sproj||pk.proj,fps:12,x1:sx,y1:sy,x2:mx,y2:my,w:cf.projW*cf.spScale,h:CS*.5,t:fl,T:fl,dl:0});
      G.sched.push({t:fl,f:()=>{P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:s.seg*2.6,x:mx,y:my,t:sT,T:sT,dl:0});P({k:'ring',x:mx,y:my,r:s.seg,t:.4,T:.4,c:'#9be83a'});parts(mx,my,10,'#9be83a',110,3);(G.zones=G.zones||[]).push({p:pc,seg:s.seg,t:s.dur,T:s.dur,dot:1,tk:0,d,c,imgs:pk.trap,seen:new Set()})}})}});return}
  if(s.rbuff&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),sT=pk.sfxhit.length/cf.sfxFps;
      if(pk.cast)P({k:'seq',imgs:pk.cast,fps:8,w:s.r*2.1,x:cx0,y:cy0,t:pk.cast.length/8,T:pk.cast.length/8,dl:0});
      G.cells.forEach((o,j)=>{if(!o||o===c)return;const q=U[o.u].sp2;if(q&&q.rbuff)return;const[ox,oy]=cellXY(j);if(Math.hypot(ox-cx0,oy-cy0)>s.r)return;o.rg=s.dur;buffFx(cx0,cy0,ox,oy,'사거리↑','#5fe0a0',pk.link);P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:46,x:ox,y:oy-4,t:sT,T:sT,dl:.1});parts(ox,oy-10,5,'#5fe0a0',70,2.4)})}});return}
  if(s.exec&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),N=stN(c,u),dj=d/N,sT=pk.sfxhit.length/cf.sfxFps,used=new Set();
      for(let j=0;j<N;j++){const cand=G.mobs.filter(o=>o.hp>0&&o.p>=28&&!used.has(o)&&Math.hypot(pos(o.p)[0]-cx0,pos(o.p)[1]-cy0)<=u.r);if(!cand.length)break;
        const low=cand.filter(o=>!o.boss&&o.hp<=o.max*s.thr).sort((a,b)=>b.hp-a.hp)[0],m=low||cand.sort((a,b)=>(b.boss?1e9:b.p)-(a.boss?1e9:a.p))[0];used.add(m);const[mx,my]=pos(m.p);if(!j)c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);
        P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:66,x:mx,y:my,t:sT,T:sT,dl:0});
        if(low){G.fx.push({k:'t',x:mx,y:my-24,t:.9,T:.9,s:'처형!',cr:true,dl:0});parts(mx,my,14,'#ff3a6a',170,3);G.shake=Math.max(G.shake,.25);m.last=c;stDmg(c,m.hp,m.boss);m.hp=0}else hit(m,{},dj,0,c)}}});return}
  if(s.roots&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci);
      if(pk.cast)P({k:'seq',imgs:pk.cast,fps:8,w:CS*2.6,x:cx0,y:cy0-6,t:pk.cast.length/8,T:pk.cast.length/8,dl:0});P({k:'ring',x:cx0,y:cy0,r:CS*3,t:.6,T:.6,c:'#b6f04a'});G.shake=Math.max(G.shake,.45);
      (G.zones=G.zones||[]).push({all:1,dot:1,p:30,seg:CS,t:s.dur,T:s.dur,tk:0,d,c,sl:s.sl,imgs:pk.trap,seen:new Set()})}});return}
  if(s.slbuff&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),sT=pk.sfxhit.length/cf.sfxFps;
      if(pk.cast)P({k:'seq',imgs:pk.cast,fps:8,w:s.r*2.1,x:cx0,y:cy0,t:pk.cast.length/8,T:pk.cast.length/8,dl:0});
      G.cells.forEach((o,j)=>{if(!o||o===c)return;const q=U[o.u].sp2;if(q&&q.slbuff)return;const[ox,oy]=cellXY(j);if(Math.hypot(ox-cx0,oy-cy0)>s.r)return;o.slb=s.dur;buffFx(cx0,cy0,ox,oy,'감속 부여','#8ff0c0',pk.link);P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:46,x:ox,y:oy-4,t:sT,T:sT,dl:.1});parts(ox,oy-10,5,'#8ff0c0',70,2.4)})}});return}
  if(s.knock&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),N=stN(c,u),dj=d/N,sT=pk.sfxhit.length/cf.sfxFps;
      for(let j=0;j<N;j++){const m=pickT(cx0,cy0,u.r,best);if(!m)continue;const[mx,my]=pos(m.p);if(!j)c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);
        P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:s.r*2.8,x:mx,y:my,t:sT,T:sT,dl:0});P({k:'ring',x:mx,y:my,r:s.r,t:.35,T:.35,c:'#5fe6ff'});parts(mx,my,12,'#8ff0ff',170,3);G.shake=Math.max(G.shake,.3);
        for(const o of G.mobs){if(o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p);if(Math.hypot(ox-mx,oy-my)>s.r)continue;hit(o,{},dj,0,c);o.kb=.35;o.kbv=s.kbd*CS*(o.boss?.2:1)/.35}}}});return}
  if(s.chain&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),N=stN(c,u),dj=d/N,sT=pk.sfxhit.length/cf.sfxFps;
      for(let j=0;j<N;j++){const m=pickT(cx0,cy0,u.r,best);if(!m)continue;const[mx,my]=pos(m.p);if(!j)c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);const[sx,sy]=sockXY(c,ci,u,'special',null,j),fl=Math.max(.1,Math.hypot(mx-sx,my-sy)/(cf.spCps*CS));
        P({k:'pjimg',imgs:pk.sproj||pk.proj,fps:12,x1:sx,y1:sy,x2:mx,y2:my,m,w:cf.projW*cf.spScale,t:fl,T:fl,dl:0});P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:64,m,x:mx,y:my,t:sT,T:sT,dl:fl});
        m.inc=(m.inc||0)+dj;G.pend.push({m,u:{},d:dj,t:fl,x:mx,y:my,c,bn:1});G.sched.push({t:fl,f:()=>bounce(m,s.hops,dj*s.cm/s.m,c,pk,CS*2.4,56)})}}});return}
  if(s.tstop&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),sT=pk.sfxhit.length/cf.sfxFps;let q=0;
      if(pk.cast)P({k:'seq',imgs:pk.cast,fps:7,w:CS*3,x:cx0,y:cy0,t:pk.cast.length/7,T:pk.cast.length/7,dl:0});for(let k2=0;k2<3;k2++)P({k:'ring',x:cx0,y:cy0,r:CS*(2+k2*2),t:.7,T:.7,c:'#8fd0ff',dl:k2*.1});G.shake=Math.max(G.shake,.4);
      for(const o of G.mobs){if(o.hp<=0||o.p<28)continue;if(!s.wallv){o.st=Math.max(o.st||0,o.boss?s.bst:s.st);o.stp=G.time+(o.boss?s.bst:s.st)}if(q++<(s.wallv?0:40)){const[ox,oy]=pos(o.p);P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:44,m:o,x:ox,y:oy,t:sT,T:sT,dl:Math.random()*.15})}}}});return}
  if(s.abuff&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci);
      P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:s.r*2.6,x:cx0,y:cy0+GROUND,t:pk.sfxhit.length/cf.sfxFps,T:pk.sfxhit.length/cf.sfxFps,dl:0});P({k:'ring',x:cx0,y:cy0,r:s.r,t:.5,T:.5,c:'#6fc8ff'});
      G.cells.forEach((o,j)=>{if(!o)return;const[ox,oy]=cellXY(j);if(Math.hypot(ox-cx0,oy-cy0)>s.r)return;o.as=s.dur;o.asv=Math.max(o.as>0?o.asv||1:1,s.as);parts(ox,oy-10,6,'#8fd8ff',70,2.4);if(o!==c)buffFx(cx0,cy0,ox,oy,'공속↑','#8fd8ff',pk.link)})}});return}
  if(s.gather&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),cand=G.mobs.filter(o=>o.hp>0&&o.p>=28&&Math.hypot(pos(o.p)[0]-cx0,pos(o.p)[1]-cy0)<=u.r);if(!cand.length)return;
      const dpp=(a,b)=>((a-b+PER*1.5)%PER)-PER/2;let m=null,bn=-1;for(const o of cand){let n=o.boss?3:0;for(const w of G.mobs)if(w.hp>0&&w.p>=28&&Math.abs(dpp(w.p,o.p))<=s.seg)n++;if(n>bn){bn=n;m=o}}
      const pc=m.p,[lx,ly]=pos(pc),[sx,sy]=sockXY(c,ci,u,'special');c.ax=(lx-cx0)/(Math.hypot(lx-cx0,ly-cy0)||1);
      P({k:'seq',imgs:pk.fx,fps:cf.fxFps,w:cf.fxW*1.5,x:sx,y:sy,t:pk.fx.length/cf.fxFps,T:pk.fx.length/cf.fxFps,dl:0});if(pk.aura)P({k:'seq',imgs:pk.aura,fps:10,w:70,x:cx0,y:cy0-8,t:.4,T:.4,dl:0});
      P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:s.seg*1.7,x:lx,y:ly,t:pk.sfxhit.length/cf.sfxFps,T:pk.sfxhit.length/cf.sfxFps,dl:0});P({k:'ring',x:lx,y:ly,r:s.seg,t:.3,T:.3,c:'#2a2530'});
      const grp=G.mobs.filter(o=>o.hp>0&&o.p>=28&&!o.boss&&Math.abs(dpp(o.p,pc))<=s.seg);
      for(let q=1;q<=6;q++)G.sched.push({t:q*.04,f:()=>{for(const o of grp)if(o.hp>0)o.p-=dpp(o.p,pc)*.45}});
      G.sched.push({t:.3,f:()=>{P({k:'seq',imgs:pk.hit,fps:cf.hitFps,w:s.r*2.6,x:lx,y:ly,t:pk.hit.length/cf.hitFps,T:pk.hit.length/cf.hitFps,dl:0});P({k:'ring',x:lx,y:ly,r:s.r*1.2,t:.35,T:.35,c:'#fff'});parts(lx,ly,16,'#1b1820',170,3.4);parts(lx,ly,8,'#fff',120,2.2);G.shake=Math.max(G.shake,.6);G.flash=Math.max(G.flash||0,.15);
        for(const o of G.mobs){if(o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p);if(Math.hypot(ox-lx,oy-ly)>s.r)continue;if(!o.boss)o.st=Math.max(o.st||0,s.st);hit(o,{},d,0,c)}}})}});return}
  if(s.mhit&&u.pk){const A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),N=stN(c,u),dj=d/N;
      for(let j=0;j<N;j++){const m=pickT(cx0,cy0,u.r,best);if(!m)continue;const[mx,my]=pos(m.p);if(!j)c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);
        if(!u.pk.sfxhit)P({k:'star',x:mx,y:my,r:20,t:.2,T:.2,c:'#fff3b0',dl:0});{const q=u.pk.sfxhit,f=u.pk.cfg.sfxFps;if(q)P({k:'seq',imgs:q,fps:f,w:s.r?s.r*3:56,x:mx,y:my,t:q.length/f,T:q.length/f,dl:0})}P({k:'ring',x:mx,y:my,r:s.r||22,t:.3,T:.3,c:'#ffe066'});parts(mx,my,10,'#ffe066',150,2.8);G.shake=Math.max(G.shake,.3);
        if(s.r){for(const o of G.mobs){if(o.hp<=0||o.p<28)continue;const[ox,oy]=pos(o.p);if(Math.hypot(ox-mx,oy-my)<=s.r)hit(o,s.st?{st:1}:{},dj,0,c)}}else{m.inc=(m.inc||0)+dj;G.pend.push({m,u:{},d:dj,t:.001,x:mx,y:my,c})}}}});return}
  if(s.snipe&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),N=stN(c,u),dj=d/N,cand=G.mobs.filter(o=>o.hp>0&&o.p>=28&&Math.hypot(pos(o.p)[0]-cx0,pos(o.p)[1]-cy0)<=u.r);if(!cand.length)return;
      cand.sort((a,b)=>(b.boss?1:0)-(a.boss?1:0)||(b.hp-(b.inc||0))-(a.hp-(a.inc||0)));
      for(let j=0;j<N;j++){const m=cand[Math.min(j,cand.length-1)],[mx,my]=pos(m.p);if(!j)c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);const[sx,sy]=sockXY(c,ci,u,'special',null,j),fl=Math.max(.06,Math.hypot(mx-sx,my-sy)/(cf.spCps*CS));
        P({k:'ring',x:mx,y:my,r:16,t:.25,T:.25,c:'#ff4a3a'});P({k:'tr',x1:sx,y1:sy,x2:mx,y2:my,w:3,c:'#ffb07a',t:.18,T:.18,dl:0});P({k:'star',x:sx,y:sy,r:12,t:.12,T:.12,c:'#ffe9b0',dl:0});
        P({k:'pjimg',imgs:pk.proj,fps:10,x1:sx,y1:sy,x2:mx,y2:my,m,w:cf.projW*cf.spScale,t:fl,T:fl,dl:0});if(!pk.sfxhit)P({k:'star',x:mx,y:my,r:24,t:.2,T:.2,c:'#fff3b0',dl:fl});{const q=u.pk.sfxhit,f=u.pk.cfg.sfxFps;if(q)P({k:'seq',imgs:q,fps:f,w:76,x:mx,y:my,t:q.length/f,T:q.length/f,dl:fl})}parts(mx,my,12,'#ff8a3c',170,3,fl);
        m.inc=(m.inc||0)+dj;G.pend.push({m,u:{},d:dj,t:fl,x:mx,y:my,c})}
      G.shake=Math.max(G.shake,.35)}});return}
  if(s.trap&&u.pk){const pk=u.pk,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),cand=G.mobs.filter(o=>o.hp>0&&o.p>=28&&Math.hypot(pos(o.p)[0]-cx0,pos(o.p)[1]-cy0)<=s.cr);if(!cand.length)return;
      const dpp=(a,b)=>((a-b+PER*1.5)%PER)-PER/2;let m=null,bn=-1;for(const o of cand){let n=0;for(const w of G.mobs)if(w.hp>0&&w.p>=28){const q=dpp(w.p,o.p);if(q<=s.seg*.5&&q>=-s.seg*3)n++}if(n>bn){bn=n;m=o}}
      const pc=m.p+s.seg*.4,[lx,ly]=pos(pc);c.ax=(lx-cx0)/(Math.hypot(lx-cx0,ly-cy0)||1);(G.zones=G.zones||[]).push({p:pc,seg:s.seg,t:s.dur,T:s.dur,hold:s.hold,d,c,imgs:pk.trap,seen:new Set()});
      {const q=u.pk.sfxhit,f=u.pk.cfg.sfxFps;if(q)P({k:'seq',imgs:q,fps:f,w:s.seg*2.6,x:lx,y:ly,t:q.length/f,T:q.length/f,dl:0})}P({k:'ring',x:lx,y:ly,r:s.seg,t:.4,T:.4,c:'#5fd6c8'});parts(lx,ly,12,'#8a6fd0',120,3)}});return}
  if(s.bolt&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const N=stN(c,u),dj=d/N,[cx0,cy0]=cellXY(ci),used=new Set();
      for(let j=0;j<N;j++){const m=pickT(cx0,cy0,u.r,best);if(!m)continue;const[mx,my]=pos(m.p);if(!j)c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);const[sx,sy]=sockXY(c,ci,u,'special',null,j),fl=Math.max(.08,Math.hypot(mx-sx,my-sy)/(cf.spCps*CS));if(!j)c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);
        P({k:'seq',imgs:pk.fx,fps:cf.fxFps,w:cf.fxW,x:sx,y:sy,t:pk.fx.length/cf.fxFps,T:pk.fx.length/cf.fxFps,dl:0,fl:(c.ax||1)<0?-1:1});
        P({k:'zap',x1:sx,y1:sy,x2:mx,y2:my,t:.22,T:.22,c:'#bff3ff',w:1.8,dl:0});
        P({k:'pjimg',imgs:pk.sproj,fps:12,x1:sx,y1:sy,x2:mx,y2:my,m,w:cf.projW*cf.spScale,t:fl,T:fl,dl:0});
        m.inc=(m.inc||0)+dj;G.pend.push({m,u:{},d:dj,t:fl,x:mx,y:my,c});
        G.sched.push({t:fl,f:()=>{const[hx,hy]=pos(m.p);P({k:'zap',x1:hx+(Math.random()-.5)*50,y1:hy-170,x2:hx,y2:hy,t:.3,T:.3,c:'#fff7b0',w:1.2,dl:0});P({k:'zap',x1:hx+(Math.random()-.5)*70,y1:hy-170,x2:hx,y2:hy,t:.35,T:.35,c:'#ffe45a',w:1,dl:.05});P({k:'ring',x:hx,y:hy,r:70,t:.45,T:.45,c:'#bff3ff',dl:.05});P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps*.6,w:cf.sfxW*1.5,x:hx,y:hy,t:pk.sfxhit.length/(cf.sfxFps*.6),T:pk.sfxhit.length/(cf.sfxFps*.6),dl:0});
          P({k:'ring',x:hx,y:hy,r:44,t:.35,T:.35,c:'#ffe45a'});parts(hx,hy,14,'#ffe45a',170,2.6);parts(hx,hy,8,'#bff3ff',120,2.2);G.shake=Math.max(G.shake,.7);G.flash=Math.max(G.flash||0,.35);
          used.add(m);P({k:'ring',x:hx,y:hy,r:s.r,t:.5,T:.5,c:'#ffe45a'});
          const near=G.mobs.filter(o=>o.hp>0&&o.p>=28&&!used.has(o)&&Math.hypot(pos(o.p)[0]-hx,pos(o.p)[1]-hy)<=s.r).sort((a,b)=>Math.hypot(pos(a.p)[0]-hx,pos(a.p)[1]-hy)-Math.hypot(pos(b.p)[0]-hx,pos(b.p)[1]-hy));
          let px=hx,py=hy;near.forEach((o,q)=>{used.add(o);const[ox,oy]=pos(o.p),dl=Math.min(.5,.04*(q+1));if(q<24){P({k:'zap',x1:px,y1:py,x2:ox,y2:oy,t:.4,T:.4,c:'#ffe45a',w:2.4,dl});P({k:'seq',imgs:pk.hit,fps:cf.hitFps,w:cf.hitW*1.4,m:o,x:ox,y:oy,t:pk.hit.length/cf.hitFps,T:pk.hit.length/cf.hitFps,dl});P({k:'ring',x:ox,y:oy,r:22,t:.25,T:.25,c:'#ffe45a',dl})}hit(o,{},dj*s.cm/s.m,dl,c);px=ox;py=oy})}})}}});return}
  if(s.burst&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;const N=stN(c,u),tg=[],nE=A.ev.length;
    A.ev.forEach(([et,sk],e)=>G.sched.push({t:et,f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const[cx0,cy0]=cellXY(ci),fin=!s.plain&&e>=nE-2,dj=d/N*(fin?(s.fin||s.m)/s.m:1),K=fin?1.7:1;
      for(let j=0;j<N;j++){const m=tg[j]=pickT(cx0,cy0,u.r,tg[j]||best);if(!m)continue;const[mx0,my0]=pos(m.p),mx=mx0+(fin?0:(Math.random()-.5)*10),my=my0+(fin?0:(Math.random()-.5)*10);if(!j)c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);
        const[sx,sy]=sockXY(c,ci,u,'special',sk,j),fl=Math.max(.06,Math.hypot(mx-sx,my-sy)/(cf.spCps*CS*(s.plain?1:1.5))),dir=(c.ax||1)<0?-1:1;
        P({k:'seq',imgs:pk.fx,fps:cf.fxFps,w:cf.fxW*K,x:sx,y:sy,t:pk.fx.length/cf.fxFps,T:pk.fx.length/cf.fxFps,dl:0,fl:dir});
        if(!s.plain)P({k:'tr',x1:sx,y1:sy,x2:mx,y2:my,w:fin?4:2.2,c:fin?'#ffb52e':'#ffd86b',t:fin?.22:.12,T:fin?.22:.12,dl:0});
        P({k:'pjimg',imgs:pk.sproj||pk.proj,fps:12,x1:sx,y1:sy,x2:mx,y2:my,w:cf.projW*cf.spScale*K,h:s.plain?CS*.5:0,t:fl,T:fl,dl:0});
        P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:cf.sfxW*(fin?1.8:s.plain?1:.8),x:mx,y:my,t:pk.sfxhit.length/cf.sfxFps,T:pk.sfxhit.length/cf.sfxFps,dl:fl});
        if(!s.plain)G.fx.push({k:'pf',x:sx-dir*4,y:sy,vx:-dir*(40+Math.random()*40),vy:-60-Math.random()*50,t:.4,T:.4,c:'#e8b84a',r:1.6,dl:0});
        parts(mx,my,fin?12:3,'#ffe08a',fin?190:110,fin?3:2,fl);
        if(fin){P({k:'ring',x:mx,y:my,r:38,t:.35,T:.35,c:'#ffcf5a',dl:fl});P({k:'ring',x:sx,y:sy,r:20,t:.2,T:.2,c:'#fff3c4'})}
        m.inc=(m.inc||0)+dj;G.pend.push({m,u:{},d:dj,t:fl,x:mx,y:my,c})}
      G.shake=Math.max(G.shake,fin?.45:.14);if(fin)G.flash=Math.max(G.flash||0,.15)}}));return}
  if(s.pkg&&u.pk){const pk=u.pk,cf=pk.cfg,A=u.ani.special;c.sb=c.sT=A.T;c.b=0;c.cd=c.sT+.2;let tgt=best;
    G.sched.push({t:A.shots[0],f:()=>{const ci=G.cells.indexOf(c);if(ci<0)return;const N=stN(c,u),dj=d/N,[cx0,cy0]=cellXY(ci);
      for(let j=0;j<N;j++){const m=pickT(cx0,cy0,u.r,tgt);if(!m)continue;const[mx,my]=pos(m.p);if(!j)c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);const[sx,sy]=sockXY(c,ci,u,'special',null,j),fl=Math.max(.1,Math.hypot(mx-sx,my-sy)/(cf.spCps*CS));if(!j)c.ax=(mx-cx0)/(Math.hypot(mx-cx0,my-cy0)||1);
        if(pk.fx)P({k:'seq',imgs:pk.fx,fps:cf.fxFps,w:cf.fxW,x:sx,y:sy,t:pk.fx.length/cf.fxFps,T:pk.fx.length/cf.fxFps,dl:0});if(s.coin)m.cb=G.time+fl+.2;
        P({k:'pjimg',imgs:pk.sproj||pk.proj,fps:12,x1:sx,y1:sy,x2:mx,y2:my,m,w:cf.projW*cf.spScale,t:fl,T:fl,dl:0});
        P({k:'seq',imgs:pk.sfxhit,fps:cf.sfxFps,w:cf.sfxW,m,x:mx,y:my,t:pk.sfxhit.length/cf.sfxFps,T:pk.sfxhit.length/cf.sfxFps,dl:fl});
        m.inc=(m.inc||0)+dj;G.pend.push({m,u:{},d:dj,t:fl,x:mx,y:my,c})}}});return}
  
}
function update(dt){
  if(G.pause||G.menu||G.lotP)return;G.uiT=(G.uiT||0)-dt;if(G.uiT<=0){G.uiT=.25;if(autoConc())refresh();msnTick();rcpTick();augTick();try{storyTick()}catch(e){repErr(e,'story')}}btyTick(dt);if(G.freeT>0)G.freeT-=dt;if(G.healB>0)G.healB-=dt;if(G.unhB>0)G.unhB-=dt;if(G.hjB>0)G.hjB-=dt;if(A('overdrive')){G.odT=(G.odT??15)-dt;if(G.odT<=0){G.odT=15;G.odL=6;toast('⚡ 과부하! 6초간 공격속도 +70%')}if(G.odL>0)G.odL-=dt;G.odOn=G.odL>0}else G.odOn=false;if(G.cdLock>0)G.cdLock-=dt;if(A('warp')){G.warpT=(G.warpT??18)-dt;if(G.warpT<=0){G.warpT=18;for(const o of G.mobs)if(o.hp>0){o.st=Math.max(o.st||0,o.boss?1:3)}const[wx,wy]=cellXY(Math.floor(NC/2));for(let q=0;q<2;q++)G.fx.push({k:'ring',x:wx,y:wy,r:CS*(3+q*2),t:.6,T:.6,c:'#b48cff',dl:q*.1});toast('🌀 시간 왜곡!')}}if(G.uskc)for(const k in G.uskc)if(G.uskc[k]>0)G.uskc[k]-=dt;if(SAVE.skAuto){G.skAT=(G.skAT||0)-dt;if(G.skAT<=0){G.skAT=.5;skAutoTick()}}
  if(G.prep>0){G.prep-=dt;if(G.prep<=0){const zb=$('zBan');if(zb)zb.style.display='none'}}
  G.time+=dt;G.waveT-=dt;if(G.shake>0)G.shake-=dt;if(G.flash>(G.fPrev||0)+1e-6){if(G.time-(G.fAt??-9)<2.5)G.flash=G.fPrev||0;else G.fAt=G.time}if(G.flash>0)G.flash-=dt*2.2;G.fPrev=Math.max(0,G.flash);
  if(G.spawnLeft>0){G.spawnT-=dt;if(G.spawnT<=0){spawn();G.spawnLeft--;G.spawnT=G.spawnFast?.18:.65}}
  for(const m of G.mobs){
    if(m.fl>0)m.fl-=dt;
    if(m.sk==='immune'||(m.bk===6&&m.ph2)){if(m.st>0||m.rt>0||(m.sk&&(m.sl>0||m.sl2>0||m.kb>0))){if(!(m.imT>0)){m.imT=.8;const[x,y]=pos(m.p);fxs('special_immune/fx/immune',x,y-18,30,{fps:6,T:.5})}m.st=0;m.rt=0;if(m.sk){m.sl=0;m.sl2=0;m.kb=0}}if(m.imT>0)m.imT-=dt}
    if(m.sk==='heal'&&m.p>=28){m.hk=(m.hk??1.5)-dt;if(m.hk<=0){m.hk=2;const[x,y]=pos(m.p);let n=0;for(const o of G.mobs){if(o===m||o.hp<=0||o.boss)continue;const[ox,oy]=pos(o.p);if(Math.hypot(ox-x,oy-y)<=CS*1.3&&o.hp<o.max){o.hp=Math.min(o.max,o.hp+o.max*.06);if(n++<4)fxs('special_heal/fx/heal',ox,oy-14,24,{fps:6,T:.5})}}if(n)fxs('special_heal/fx/heal',x,y-16,30,{fps:6,T:.5})}}
    if(m.vu>0)m.vu=Math.max(0,m.vu-dt);if(m.vu2>0)m.vu2-=dt;
    if(m.wImm>0)m.wImm-=dt;{const cc=m.st>0||m.rt>0||m.blkT>0||!!m._wh;if(m.ccImm>0){m.ccImm-=dt;m.st=0;m.rt=0;m.blkT=0;m._wh=0}else if(cc){m.ccA=(m.ccA||0)+dt;if(m.ccA>=CC_MAX){m.ccA=0;m.ccImm=CC_IMM;m.st=0;m.rt=0;if(m.blkT>0){m.blkT=0;m.blkImm=BLK_IMM}}}else if(m.ccA>0)m.ccA=Math.max(0,m.ccA-dt*.5);
     if(m.wasC&&!(m.st>0||m.rt>0||m.blkT>0||m._wh))m.rel=3;m.wasC=m.st>0||m.rt>0||m.blkT>0||!!m._wh;if(m.rel>0)m.rel-=dt;if(m.blkImm>0)m.blkImm-=dt;
     m._bk=0;if(m.blkT>0){m.blkT-=dt;m._bk=1;if(m.blkSrc&&m.blkSrc.u)stO(m.blkSrc.u).ctrl+=dt;if(m.blkT<=0)m.blkImm=BLK_IMM}}
    if(m.dotT>0){m.dotT-=dt;if(m.hp>0)stDmg(m.dsrc,Math.min(m.hp,m.dot*dt),m.boss);m.hp-=m.dot*dt;if(m.dsrc)m.last=m.dsrc;m.dtk=(m.dtk||0)-dt;if(m.dtk<=0){m.dtk=.5;if(G.fx.length<200){const[x,y]=pos(m.p);G.fx.push({k:'t',x:x+(Math.random()-.5)*10,y:y-14,t:.5,T:.5,s:fmt(m.dot*.5),cr:false,dl:0});parts(x,y,2,'#8be04a',40,2)}}}
    if(m.st>0){if(m.boss&&m.cast>0)bossFoil(m);m.st=Math.max(0,m.st-dt);if(m.sl>0)m.sl=Math.max(0,m.sl-dt);if(m.sl2>0)m.sl2=Math.max(0,m.sl2-dt);if(m.rt>0)m.rt=Math.max(0,m.rt-dt);continue}
    let v=m.v*(G.aug?(G.aug.frost?.8:1)*(m.boss&&G.aug.hunt?.7:1)*(G.aset&&G.aset.ice?.9:1):1);if(m.sl>0){m.sl-=dt;v*=m.boss?.8:.6}else if(m.sl2>0){v*=.8}
    if(m.sl2>0)m.sl2-=dt;
    if(m.kb>0){m.kb-=dt;m.p=Math.max(28,m.p-m.kbv*dt)}
    if(m.rt>0){m.rt-=dt;v=0}if(m._bk)v=0;
    if(m.boss)v=bossAI(m,v,dt);
    if(G.prep>0)v=0;if(m.boss&&G.zm==='arrive'&&m.dash>0)v=Math.min(v,m.v*2);
    v=wallStop(m,v,dt);
    m.p+=v*dt;if(G.zm==='arrive'&&m.p>=PER)arrive(m)
  }
  const DL=.1;
  if(G.buff>0)G.buff-=dt;
  G.cells.forEach((c,i)=>{
    if(!c)return;if(c.seal>0){c.seal-=dt;return}if(c.b>0)c.b-=dt;if(c.pop>0)c.pop-=dt;if(c.sc>0)c.sc-=c.u==='hwangryong'?dt*(G.cdLock>0?0:1):dt*Math.min(CD_MAX,(c.hst>0?c.hsv||1:1)*(G.bn?G.bn.cd:1)*(G.aug&&G.aug.cosmo&&U[c.u].t===4?1.33:1)*(A('mana')?1.25:1)*(A('timelord')?1.67:1)*(SO('time')?1.25:1)*(A('ascend')&&U[c.u].fu?1.33:1)*concSpd(c)*(c.pcd||1))*(G.cdLock>0?0:1);if(c.hst>0)c.hst-=dt;if(c.drop>0)c.drop-=dt;if(c.sh>0)c.sh-=dt;if(c.as>0)c.as-=dt;if(c.sb>0)c.sb-=dt;
    if(c.rg>0)c.rg-=dt;if(c.slb>0)c.slb-=dt;const u0=U[c.u];c.sy=u0.syn&&synOn(i,u0)?u0.syn:0;const eye=i===G.eyeI&&A('eye'),u=(c.rg>0||c.slb>0||eye||c.prg>0||c.psl>0||c.pcr>0)?Object.assign(Object.create(u0),{r:eye?u0.r+CS*3:u0.r+(c.rg>0?CS:0)+(c.prg||0)},c.pcr>0?{cr:(u0.cr||0)+c.pcr,cm:u0.cm||2.5}:{},(c.slb>0||c.psl>0)?{sl:Math.max(u0.sl||0,c.slb>0?.8:0,c.psl||0)}:{}):u0,s=u.sp2;if(c.sb>0)return;
    if(s&&c.sc<=0){const[x,y]=cellXY(i);let best=null,bp=-1;
      {const rl=ROLE[c.u],cand=[];for(const m of G.mobs){if(m.hp<=0||m.p<28)continue;const[mx,my]=pos(m.p);if(Math.hypot(mx-x,my-y)<=(u.spR||u.r))cand.push([m,mx,my])}
       for(const[m,mx,my]of cand){let k;if(rl==='single')k=m.boss?1e30:m.hp;else if(rl==='aoe'){k=m.boss?.5:0;for(const[o,ox,oy]of cand)if(Math.abs(ox-mx)<CS*1.2&&Math.abs(oy-my)<CS*1.2)k++}else k=m.boss?1e9:m.p;if(k>bp){bp=k;best=m}}}
      if(best||s.buff){c.sc=s.cd;special(c,i,u,s,x,y,best);{const rl=ROLE[c.u];if(rl==='block'&&best)wallCast(c,best);else if(c.u==='sylvaion'&&G.hp<hpMax())healTry(2,c)}if(G.aug&&G.aug.echo&&Math.random()<.5)G.sched.push({t:1,f:()=>echoSp(c)});c.cd=Math.max(c.cd,.5);return}}
    c.cd-=dt;if(c.cd>0)return;
    const [x,y]=cellXY(i);let best=null,bp=-1;
    const hiT=ROLE[c.u]==='single';for(const m of G.mobs){if(m.hp<=0||m.p<28||m.hp<=(m.inc||0))continue;const[mx,my]=pos(m.p),key=m.boss?1e30:hiT?m.hp-(m.inc||0):m.p;if(Math.hypot(mx-x,my-y)<=u.r&&key>bp){bp=key;best=m}}
    if(!best){c.cd=.1;return}
    let d=u.d*(u.bm||1)*(c.pa||1)*c.n*mult(c.u)*tileMult(i)*(c.sh>0?1.3:1)*(c.sy||1)*augA(c),nh=null;const[tx,ty]=pos(best.p);if(u.nth&&(c.hc=(c.hc||0)+1)%Math.max(2,u.nth.n-A('rhythm'))===0){d*=u.nth.m;nh=u.nth}if(u.ramp){c.rc=c.lt===best?Math.min(u.ramp[1],(c.rc||0)+1):0;c.lt=best;d*=1+u.ramp[0]*c.rc}{const sn=HCLS[c.u]==='snipe'?clsLv('snipe'):0;if(sn){c.snS=c.snT===best?Math.min([0,5,6,8][sn],(c.snS||0)+1):0;c.snT=best;d*=1+[0,.08,.12,.16][sn]*c.snS}}
    if(u.pk){const N=stN(c,u),dj=d/N;c.tg=[];for(let j=0;j<N;j++){const m=pickT(x,y,u.r,best);m.inc=(m.inc||0)+dj;c.tg.push(m)}
      fire(c.u,c,x,y,tx,ty,best);c.tg.forEach((m,j)=>{const[ux,uy]=pos(m.p);G.pend.push({m,u,d:dj,t:c.tgT[j],x:ux,y:uy,c,nh:j===0?nh:null})})}
    else{const dl2=fire(c.u,c,x,y,tx,ty,best);best.inc=(best.inc||0)+d;G.pend.push({m:best,u,d,t:dl2,x:tx,y:ty,c,nh});if(u.sp)G.fx.push({k:'c',x:tx,y:ty,r:u.sp,t:.3,T:.3,c:u.col,dl:dl2})}

    c.cd=c.ncd=1/u.s/(c.as>0?c.asv||1:1)/(G.bn?G.bn.spd:1)/(c.pas||1)/(A('brawl')&&isMel(c.u)?1.6:1)/(A('rhythm')?1.15:1)/(SO('storm')?1.2:1)/(SO('cosmic')&&U[c.u].t>=4?1.3:1)/(A('quick')?1.2:1)/(G.odOn?1.7:1)/(G.healB>0?[1,1.15,1.25][clsLv('heal')]||1:1)/concSpd(c)
  });
  wallTick(dt);
  if(G.zones&&G.zones.length){const dpp=(a,b)=>((a-b+PER*1.5)%PER)-PER/2;for(const z of G.zones){z.t-=dt;if(z.dot){z.tk-=dt;if(z.tk<=0){z.tk+=.5;for(const o of G.mobs){if(o.hp<=0||o.p<28||(!z.all&&Math.abs(dpp(o.p,z.p))>z.seg))continue;if(z.sl)o.sl=Math.max(o.sl,z.sl);hit(o,{},z.d,0,z.c)}}continue}for(const o of G.mobs){if(o.hp<=0||o.p<28||z.seen.has(o)||Math.abs(dpp(o.p,z.p))>z.seg)continue;z.seen.add(o);if(o.boss)o.sl=Math.max(o.sl,z.hold);else{o.rt=Math.max(o.rt||0,z.hold);o.rtT=z.hold}hit(o,{},z.d,0,z.c)}}G.zones=G.zones.filter(z=>z.t>0)}
  for(const q of G.sched){q.t-=dt;if(q.t<=0)q.f()}G.sched=G.sched.filter(q=>q.t>0);
  for(const h of G.pend){h.t-=dt;if(h.t>0)continue;const m=h.m,u=h.u,splashHit=!h.area&&m&&m.hp>0;if(splashHit&&u.sp){[h.x,h.y]=pos(m.p)}let mlX=null;if(u.ml&&h.c){const ci=G.cells.indexOf(h.c);if(ci<0)mlX=-1;else{const[ax,ay]=cellXY(ci),[bx,by]=pos(m.p);mlX=[ax,ay];if(m.hp<=0||Math.hypot(bx-ax,by-ay)>u.r){m.inc-=h.d;continue}}}if(mlX===-1){m.inc-=h.d;continue}
    if(!h.area){m.inc-=h.d;if(m.hp>0){hit(m,u,h.d,0,h.c);SND.play('hit')}if(h.nh)nthHit(h,m,u);if(u.bnc&&!h.bn)bounce(m,u.bnc,h.d*u.bf,h.c,u.pk,CS*1.8);else if(A('ricochet')&&!h.bn&&u.bm)bounce(m,1,h.d*.4,h.c,u.pk,CS*1.8);if(A('chainall')&&!h.bn&&u.bm)bounce(m,2,h.d*.5,h.c,u.pk,CS*1.8)}else{if(h.inc)m.inc-=h.d;let os=G.mobs.filter(o=>o.hp>0&&Math.hypot(pos(o.p)[0]-h.x,pos(o.p)[1]-h.y)<=u.sp);if(u.max===1&&m&&m.hp>0)os=[m];else if(u.max)os=os.sort((a,b)=>(b.boss?1e9:b.p)-(a.boss?1e9:a.p)).slice(0,u.max);for(const o of os){hit(o,{sl:u.sl,rt:u.rt},h.d,0,h.c);if(u.st2&&!o.boss)o.st=Math.max(o.st||0,u.st2)}if(os.length>=3)bombBlast(h.c,h.x,h.y,h.d);continue}
    if(u.shp&&splashHit&&h.c)shapeHit(h,m,u);if(u.sp&&splashHit){let n=0;const SR=u.sp*(A('shard')?1.35:1),SF=u.sf||1;if(u.bm&&G.fx.length<240){const af=h.c&&AREAFX[h.c.u];if(af&&V5I[af])fxs(af,h.x,h.y,SR*2.3,{fps:16});else G.fx.push({k:'ring',x:h.x,y:h.y,r:SR,t:.22,T:.22,c:u.col||'#ff9f2e',dl:0})}for(const o of G.mobs){if(o===m||o.hp<=0)continue;const[mx,my]=pos(o.p);if(mlX&&Math.hypot(mx-mlX[0],my-mlX[1])>u.r)continue;if(Math.hypot(mx-h.x,my-h.y)<=SR){hit(o,u,h.d*SF,0,h.c);n++;if(u.smax&&n>=u.smax)break}}if(n>=2)bombBlast(h.c,h.x,h.y,h.d)}}
  G.pend=G.pend.filter(h=>h.t>0);
  const SQ=[];G.mobs=G.mobs.filter(m=>{
    if(m.hp>0)return true;if(m.arr)return false;if(m.sk==='split'){for(const dp of [-5,5]){const hp=Math.round(m.max*.3);SQ.push({p:Math.max(0,m.p+dp),hp,max:hp,sl:0,st:0,boss:false,sk:'small',v:ENV[0]*1.25,k:0,sd:Math.random()*4})}}
    G.kills++;SND.play('die');if(m.last){G.fk=G.fk||{};G.fk[m.last.u]=(G.fk[m.last.u]||0)+1;m.last.kills=(m.last.kills||0)+1;if(m.last.u==='yeongeopsu'&&m.last.kills%25===0)healTry(1,m.last);G.runKills[m.last.u]=(G.runKills[m.last.u]||0)+1;{const hl=HCLS[m.last.u]==='heal'?clsLv('heal'):0;if(hl&&G.hp<hpMax()&&Math.random()<[0,.02,.03][hl])healTry(1,m.last)}}const[x,y]=pos(m.p);
    if(m.boss){G.nBossK=(G.nBossK||0)+1;storyEv('boss',{u:m.last&&m.last.u});if(A('spring'))healTry(2,null);const fast=!m.esc&&G.waveT>30;{const bc=100+10*G.wave,gm=A('greed')?EC.greed:1,bm=A('bossgold')?EC.bg:1;G.coins+=Math.round(bc*gm*bm);if(gm>1)eco('greed',bc*(gm-1));if(bm>1){eco('bossgold',bc*gm*(bm-1));eco('bossgold',EC.bgSt,'st')}}G.stones+=(fast?3:2)+(A('clover')?3:0)+(A('bossgold')?EC.bgSt:0);if(!m.esc)G.waveT=Math.min(G.waveT,3);toast(m.esc?'놓친 보스 처치! 🍀+2':fast?'빠른 처치! 🍀+3':'보스 처치! 🍀+2');parts(x,y,34,'#ffd23e',190,5);G.fx.push({k:'ring',x,y,r:90,t:.5,T:.5,c:'#fff'});G.shake=.5;G.flash=.35;SND.play('reveal');G.sched.push({t:.9,f:boonOpen})}
    else{if(m.pq&&!m.pqDone){m.pqDone=1;if(G.pq&&G.pq.st==='on'){G.pq.dead=1;pqWin()}}if(m.el){if(m.bty>0){const hk=A('hunter')?2:1,b=killCoin(G.wave)*6*hk;G.coins+=b;G.stones+=2*hk;G.nBounty=(G.nBounty||0)+1;SND.play('bountyKill');toast('🎯 현상금 획득! 🍀+'+2*hk+' 🪙+'+b);parts(x,y,26,'#ffd23e',200,3.6);G.fx.push({k:'ring',x,y,r:60,t:.45,T:.45,c:'#ffd23e'});G.shake=Math.max(G.shake,.35)}}killPay(killCoin(G.wave));{const ku=m.last&&U[m.last.u];const cr0=U.belkaon&&U.belkaon.pk&&U.belkaon.pk.coin_reward,cpop=()=>{if(cr0&&G.fx.length<300)G.fx.push({k:'seq',imgs:cr0,fps:8,w:26,x,y:y-12,t:.25,T:.25,dl:0})};if(ku&&ku.coinP){const cg=Math.round(killCoin(G.wave)*ku.coinP);G.coins+=cg;stO(m.last.u).coin+=cg;cpop()}if(ku&&ku.coinJ&&Math.random()<ku.coinJ){const b=killCoin(G.wave)*5;G.coins+=b;stO(m.last.u).coin+=b;cpop();if(G.fx.length<300)G.fx.push({k:'t',x,y:y-18,t:1,T:1,s:'+'+b+'🪙',cr:true,dl:0});SND.play('coin',2)}}parts(x,y,5,'#ffffff',80,3,0);if(G.aug){if(G.aug.jackpot&&Math.random()<.05){const b=killCoin(G.wave)*12;G.coins+=b;SND.play('jackpot');G.fx.push({k:'t',x,y:y-18,t:1.1,T:1.1,s:'🎰 +'+b+'🪙',cr:true,dl:0})}if(G.aug.boom&&!m.byB)augBoom(m,x,y)}if(m.cb&&G.time<=m.cb){const r=Math.random(),k=r<.1?10:r<.7?3:0;if(k){const b=killCoin(G.wave)*k;G.coins+=b;SND.play(k>=10?'jackpot':'coin',3);G.fx.push({k:'t',x,y:y-18,t:1.1,T:1.1,s:(k>=10?'잭팟! ':'')+'+'+b+'🪙',cr:true,dl:0});parts(x,y,k>=10?26:12,'#ffd23e',k>=10?200:130,3.4);if(k>=10){G.fx.push({k:'ring',x,y,r:46,t:.45,T:.45,c:'#ffd23e'});G.shake=Math.max(G.shake,.25)}}}}
    return false
  });if(SQ.length)G.mobs.push(...SQ);if(G.fk){for(const u in G.fk){const n=G.fk[u];if(n>=5){if(!G.bestMk||n>G.bestMk.n)G.bestMk={u,n};storyEv('multi',{u,n})}}G.fk=null}
  for(const f of G.fx){if(f.dl>0){f.dl-=dt;continue}f.t-=dt;if(f.k==='shk')G.shake=Math.max(G.shake,f.v);if(f.k==='pf'){f.x+=f.vx*dt;f.y+=f.vy*dt;f.vx*=.9;f.vy*=.9}}
  G.fx=G.fx.filter(f=>f.t>0);G.tN=0;for(const f of G.fx)if(f.k==='t')G.tN++;
  if(G.zm!=='arrive'&&G.prep<=0){const n=mobCount();if(n>=OV_N){G.ovT+=dt;const oi=A('exitguard')?3:OV_INT;while(G.ovT>=oi){G.ovT-=oi;hpLose(1+Math.floor((n-OV_N)/OV_STEP),'over')}}else G.ovT=Math.max(0,G.ovT-dt)}
  if(G.hp<=0){end(false,G.hpWhy==='arrive'?'적이 출구를 너무 많이 지나갔어요':G.hpWhy==='esc'?'놓친 보스에게 체력을 모두 잃었어요':'적이 100마리 넘게 쌓여 체력을 모두 잃었어요');return}
  if(G.waveT<=0){
    if(isBoss(G.wave)&&G.zm!=='arrive'){const bs=G.mobs.filter(m=>m.boss&&!m.esc&&m.hp>0);if(bs.length){bs.forEach(m=>m.esc=1);hpLose(ESC_DMG*bs.length,'esc');toast('😱 보스를 놓쳤어요! ❤️-'+ESC_DMG*bs.length+' · 남은 보스는 적 '+BOSS_ESC+'마리 몫');SND.play('alarm');G.shake=Math.max(G.shake,.6)}}
    nextWave()
  }
}
function contribHTML(){const S=G.st||{},ks=Object.keys(S).filter(k=>k[0]!=='_'&&U[k]),tot=Object.values(S).reduce((a,o)=>a+o.d,0)||1;
  ks.sort((a,b)=>S[b].d-S[a].d||S[b].sup-S[a].sup);if(!ks.length)return '';
  const row=(k,i)=>{const o=S[k],u=U[k],pct=o.d/tot*100,ex=[o.b>0?'👹 보스 '+fmt(o.b):'',o.coin>0?'🪙 +'+fmt(o.coin):'',o.heal>0?'❤️ 회복 '+(+o.heal.toFixed(1)):'',o.cn>0?'⛓ 제어 '+o.cn+'마리·'+o.ctrl.toFixed(1)+'초':'',o.sup>0?'✨ 지원 '+fmt(o.sup):''].filter(Boolean).join(' · ');
    return '<div class="cRow'+(i<3?' top':'')+'"><span class="cI">'+(u.url?'<img src="'+cardUrl(k)+'" alt="">':pic(u.planet))+'</span><span class="cN"><b>'+(i+1)+'. '+u.n+'</b><small>'+ex+'</small><i style="width:'+Math.max(1,pct).toFixed(1)+'%;background:'+(u.fu?'#ff5a6e':TC[u.t])+'"></i></span><span class="cD"><b>'+fmt(o.d)+'</b><small>'+pct.toFixed(1)+'%</small></span></div>'};
  const sk=S._sk&&S._sk.d>0?'<div class="cRow"><span class="cI">🌟</span><span class="cN"><b>사용자 스킬</b><small>운석·천둥·심판 등'+(S._sk.b>0?' · 👹 보스 '+fmt(S._sk.b):'')+'</small></span><span class="cD"><b>'+fmt(S._sk.d)+'</b><small>'+(S._sk.d/tot*100).toFixed(1)+'%</small></span></div>':'';
  return '<details class="ctb" open><summary>📊 영웅별 기여도 <small>(총 '+fmt(tot)+')</small></summary><div class="cL">'+ks.slice(0,12).map(row).join('')+(ks.length>12?'<div class="cMore">외 '+(ks.length-12)+'종</div>':'')+sk+'</div><div class="cH">같은 영웅 여러 기는 합산 · 승급·조합으로 사라진 영웅 기록도 유지 · 적 남은 체력을 넘긴 피해는 뺌 · ✨지원 = 오라로 늘려 준 피해(이미 총피해 안에 있어 따로 더하지 않음)</div></details>'}
function end(win,why){
  if(G.over)return;SND.play('over');SND.bg(true);G.over=true;running=false;$('bMenu').style.display='none';const o=$('over');o.style.display='flex';
  o.innerHTML='<h1>'+(win?'🎉 1000웨이브 클리어!':'💥 게임 오버')+'</h1><div>'+(win?'운도 실력입니다.':why)+'<br>도달 웨이브 '+G.wave+' / 처치 '+G.kills+'마리</div>'+(()=>{try{return contribHTML()}catch(e){repErr(e,'contrib');return ''}})()+'<button id="start">다시 하기</button>';
  const rec=(SAVE.games||0)>0&&G.wave>(SAVE.best||0),nb=boxReward(G.wave)+(rec?BOX_REC:0);try{SAVE.frag=SAVE.frag||{};SAVE.boxes=(SAVE.boxes||0)+nb;for(const k in G.runKills)SAVE.kills[k]=(SAVE.kills[k]||0)+G.runKills[k];{if(RK.sb&&!(typeof AC!=='undefined'&&AC.s)&&!SAVE.acHint){SAVE.acHint=1;setTimeout(()=>{try{toast('👤 로그인하면 기록·영웅이 다른 기기에서도 이어져요 (메인의 로그인)')}catch(e){}},1500)}const r=SAVE.rec=SAVE.rec||{};const ad=(k,v)=>r[k]=(r[k]||0)+(v||0);ad('boss',G.nBossK);ad('merge',G.nMerge);ad('craft',G.nCraft);ad('fuse',G.nFuse);ad('pq',G.pqWin)}{const pre=Object.keys(LOCKP).filter(p=>!plUnlocked(p)&&plAll().includes(p));SAVE.games++;SAVE.best=Math.max(SAVE.best,G.wave);G.newPl=pre.filter(plUnlocked);if(G.newPl.length)SAVE.plNew=1}saveAll()}catch(e){}
  o.innerHTML+='<div id="loot" style="font-size:14px;line-height:1.5;max-width:92%">🎁 랜덤박스 '+nb+'개 획득!'+(rec?' <span style="color:#ffe066">(🏆 최고 기록 갱신 +'+BOX_REC+')</span>':'')+(SAVE.boxes>nb?' (보유 '+SAVE.boxes+'개)':'')+'</div><button id="openBox" style="background:linear-gradient(#c58bff,#8a4fd6);color:#fff">박스 열기</button><button id="openBoxA" style="background:linear-gradient(#ffcf4a,#e08a1a);color:#3a2408">모두 열기</button>';
  if(G.newPl&&G.newPl.length)o.innerHTML+=G.newPl.map(p=>'<div class="unl">'+(PICON[p]?'<img src="'+PICON[p]+'" alt="">':'')+'🌙 새 행성 해금! <b>'+PLANETS[p]+'</b><br><small>메인 화면 「🪐 행성 고르기」에서 7개 중 하나로 넣어 보세요</small></div>').join('');
  o.innerHTML+='<button id="toMain" style="background:linear-gradient(#9fe36a,#5fae4a);color:#1d3a14">메인으로</button>';
  $('openBox').textContent='박스 열기 ('+SAVE.boxes+')';$('openBox').onclick=()=>{const r=openBoxes();if(r){$('loot').innerHTML=lootHTML(r);const b=$('openBox');if(r.left>0)b.textContent='다음 박스 열기 ('+r.left+')';else b.style.display='none';if(r.left<2&&$('openBoxA'))$('openBoxA').style.display='none'}};$('openBoxA').style.display=SAVE.boxes>1?'':'none';$('openBoxA').onclick=()=>{const A=openAllBoxes();if(A){$('loot').innerHTML=lootAllHTML(A);$('openBox').style.display='none';$('openBoxA').style.display='none';try{SND.play('jackpot')}catch(e){}}};
  $('start').onclick=()=>{rkFlush();start()};$('toMain').onclick=()=>{rkFlush();o.style.display='none';showMain('home')}
  {const rk=document.createElement('div');rk.id='rkRes';rk.style.cssText='font-size:15px;color:#ffe066;min-height:20px;max-width:92%';o.insertBefore(rk,o.querySelector('#start'));const W=G.wave,K=G.kills,TT=G.time;
    const codeBox=()=>{const c=rkCode(W,K,TT);rk.innerHTML='<div style="font-size:13px;color:#fff">랭킹에 올리려면 이 <b style="color:#ffe066">기록 코드</b>를 게임 주인에게 보내 주세요</div><div style="font-size:13px;color:#fff;margin-top:4px">랭킹 이름 <input id="rkCN" maxlength="12" value="'+rkNick().replace(/[<>"&]/g,'')+'" style="width:40%;font-size:13px"></div><input id="rkCodeT" readonly value="'+c+'" style="width:100%;box-sizing:border-box;font-size:11px;margin:4px 0"><button id="rkCopy" style="font-size:14px;padding:4px 14px">📋 코드 복사</button>';$('rkCN').onchange=()=>{SAVE.nick=cleanNick($('rkCN').value.trim().slice(0,12));saveAll();$('rkCodeT').value=rkCode(W,K,TT)};$('rkCopy').onclick=()=>{const t=$('rkCodeT');t.select();let ok=false;try{ok=document.execCommand('copy')}catch(e){}if(navigator.clipboard)navigator.clipboard.writeText(c).then(()=>toast('복사했어요!'),()=>{if(!ok)toast('길게 눌러 직접 복사해 주세요')});else toast(ok?'복사했어요!':'길게 눌러 직접 복사해 주세요')}};
    if(RK.db&&RK.uid&&RK.canW!==false){rk.className='rkBox';rkEndPanel(rk,W,K,TT)}else codeBox()}
}
function spr(img,e,x,y,s){if(img)cx.drawImage(img,x-s/2,y-s/2,s,s);else{cx.font=s*.6+'px sans-serif';cx.fillText(e,x,y)}}

function rrect(b,x,y,w,h,r){b.beginPath();b.moveTo(x+r,y);b.arcTo(x+w,y,x+w,y+h,r);b.arcTo(x+w,y+h,x,y+h,r);b.arcTo(x,y+h,x,y,r);b.arcTo(x,y,x+w,y,r);b.closePath()}

let BG=null,BGimg=null;
function layout(){
  const st=$('stage'),app=$('app'),sc=Math.min(app.clientWidth/995,app.clientHeight/1581),sw=Math.floor(995*sc),shp=Math.floor(1581*sc);st.style.width=sw+'px';st.style.height=shp+'px';st.style.setProperty('--sh',(shp/100)+'px');const s=sw/W;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);cx.setTransform(dpr,0,0,dpr,0,0);cx.imageSmoothingQuality='medium';
  paintUI(true);
  if(!BGimg&&typeof Image!=='undefined'){BGimg=new Image();BGimg.onload=()=>{BG=BGimg;if(!running)draw()};BGimg.src=MAPIMG}
}

const UIEL=[];let UIREADY=false;
function uiInit(){if(typeof Image==='undefined')return;const imgs={};let left=0;for(const k in UIIMG){left++;const im=new Image();im.onload=()=>{if(--left===0){UIREADY=true;paintUI(true)}};im.src=UIIMG[k];imgs[k]=im}
  document.querySelectorAll('[data-ui]').forEach(el=>{const c=document.createElement('canvas');c.className='uibg';el.insertBefore(c,el.firstChild);UIEL.push({el,c,key:el.dataset.ui,nine:!!el.dataset.nine,imgs,st:''})})}
function nineSlice(x,im,w,h,sl,sr,st,sb){const W0=im.width,H0=im.height;const xs=[0,sl,W0-sr,W0],ys=[0,st,H0-sb,H0],k=Math.min(1,h/H0*1.0),dl=sl*k,dr=sr*k,dt=st*k,db=sb*k,dxs=[0,dl,w-dr,w],dys=[0,dt,h-db,h];
  for(let i=0;i<3;i++)for(let j=0;j<3;j++){const sw=xs[i+1]-xs[i],sh=ys[j+1]-ys[j],dw=dxs[i+1]-dxs[i],dh=dys[j+1]-dys[j];if(sw>0&&sh>0&&dw>0&&dh>0)x.drawImage(im,xs[i],ys[j],sw,sh,dxs[i],dys[j],dw,dh)}}
function paintUI(force){if(!UIREADY)return;for(const u of UIEL){const el=u.el,w=el.clientWidth,h=el.clientHeight;if(!w||!h)continue;
  const st=u.nine?(el.disabled?'_disabled':el.matches(':active')?'_pressed':'_normal'):'';const sig=st+'|'+w+'x'+h;if(!force&&sig===u.st)continue;u.st=sig;
  const im=u.imgs[u.key+st];if(!im)continue;const c=u.c,d=Math.min(3,window.devicePixelRatio||1);c.width=Math.round(w*d);c.height=Math.round(h*d);const x=c.getContext('2d');x.scale(d,d);x.imageSmoothingQuality='high';
  if(u.nine)nineSlice(x,im,w,h,36,36,28,28);else x.drawImage(im,0,0,w,h)}}
setInterval(()=>paintUI(false),120);document.addEventListener('pointerdown',()=>setTimeout(()=>paintUI(false),0));document.addEventListener('pointerup',()=>setTimeout(()=>paintUI(false),0));
function draw(){
  const tm=G.time||0;cx.save();
  if(G.shake>0){const a=Math.min(5,G.shake*16);cx.translate((Math.random()-.5)*a,(Math.random()-.5)*a)}
  {const TM=G&&G.terr?timg(TERR[G.terr].k):null;if(TM)cx.drawImage(TM,0,0,W,H);else if(BG)cx.drawImage(BG,0,0,W,H);else{cx.fillStyle='#5f9a3a';cx.fillRect(0,0,W,H)}}
  cx.textAlign='center';cx.textBaseline='middle';cx.lineJoin='round';
  drawTileUpgradeFloors();drawTerrain();try{drawWalls()}catch(e){}cx.textAlign='center';cx.textBaseline='middle';
  if(G.sel!==null&&G.cells[G.sel]){const[x,y]=cellXY(G.sel),u=U[G.cells[G.sel].u],er=effR(G.sel);
    cx.fillStyle='rgba(255,255,255,.16)';cx.strokeStyle='rgba(255,255,255,.7)';cx.lineWidth=1.5;cx.setLineDash([6,4]);cx.beginPath();cx.arc(x,y,er,0,7);cx.fill();cx.stroke();cx.setLineDash([]);if(er>u.r+1){cx.strokeStyle='rgba(111,232,160,.85)';cx.lineWidth=1.2;cx.setLineDash([2,4]);cx.beginPath();cx.arc(x,y,u.r,0,7);cx.stroke();cx.setLineDash([])}
    cx.strokeStyle='#fff';cx.lineWidth=2.5;rrect(cx,x-CS/2+1,y-CS/2+1,CS-2,CS-2,7);cx.stroke()}
  if(drag&&drag.on&&G.cells[drag.i]){const j=cellAt(drag.x,drag.y),u=U[G.cells[drag.i].u],dr=effR(drag.i);
    {const[x,y]=cellXY(drag.i);cx.strokeStyle='rgba(255,255,255,.5)';cx.lineWidth=2;cx.setLineDash([5,4]);rrect(cx,x-CS/2+3,y-CS/2+3,CS-6,CS-6,10);cx.stroke();cx.setLineDash([])}
    if(j>=0){const[x,y]=cellXY(j);cx.fillStyle='rgba(255,255,255,.14)';cx.strokeStyle='rgba(255,255,255,.65)';cx.lineWidth=1.5;cx.setLineDash([6,4]);cx.beginPath();cx.arc(x,y,dr,0,7);cx.fill();cx.stroke();cx.setLineDash([]);
      cx.fillStyle='rgba(255,255,255,.3)';cx.strokeStyle='#fff';cx.lineWidth=2.5;rrect(cx,x-CS/2+2,y-CS/2+2,CS-4,CS-4,10);cx.fill();cx.stroke()}}
  const mob=m=>{
    const[x,y]=pos(m.p),fl=m.fl>0?m.fl/.12:0,s=(m.boss?60:m.el?46:30)*(1+fl*.22)*(.35+.65*Math.min(1,m.p/28)),by=y-(m.boss?8:2)-Math.abs(Math.sin(tm*6+m.p*.05))*2.5,pp=((m.p%PER)+PER)%PER,flip=(()=>{const a=pos(pp)[0],b=pos(pp+2)[0];return b<a-.01})();
    cx.fillStyle='rgba(0,0,0,.2)';cx.beginPath();cx.ellipse(x,y+(m.boss?14:9),s*.3,s*.1,0,0,7);cx.fill();
    const jf=m.boss?(m.cast>0?Math.min(2,Math.floor((1-m.cast/(m.castT||1.2))*3)):Math.floor(tm*1000/(m.dash>0?55:110)+(m.sd||0))%4):Math.floor(tm*1000/JRMS[m.k||0]+(m.sd||0))%4,jl=m.boss?(m.cast>0||m.dash>0?JRI.bcast:JRI.boss):JRI['e'+((m.k||0)+1)];let ji=jl&&jl[m.dash>0?3:jf],jok=ji&&ji.complete&&ji.naturalWidth;
    let S2=s*(m.boss?1.55:1.9);{let vk=null,fr=Math.floor(tm*1000/120+(m.sd||0))%4;if(m.boss&&m.bk>1){vk='boss'+m.bk;const ofs=m.bk===6&&m.ph2?8:0;if(m.cast>0)fr=ofs+4+Math.min(2,Math.floor((1-m.cast/(m.castT||1.2))*3));else if(m.act>0)fr=ofs+7;else fr=ofs+fr;if(m.bk===6)S2*=1.15}else if(m.bty!==undefined){vk='bounty'}else if(m.sk==='small'){vk='split_small';fr=fr%2;S2*=.75}else if(m.sk){vk='special_'+m.sk}
      if(vk){const im2=v5i(vk,fr);if(im2){ji=im2;jok=true}}}
    const im=m.boss?BOSS:MOBS[m.k],em=m.boss?'👹':MOBE[m.k];
    cx.globalAlpha=m.st>0?.65:1;cx.save();if(flip){cx.translate(x,0);cx.scale(-1,1);cx.translate(-x,0)}
    if(m.dash>0&&JRI.bfx){const fi=JRI.bfx[Math.floor(tm*14)%4];if(fi&&fi.complete){const fw=s*2.2;cx.drawImage(fi,x-fw*.95,y-fw*.55,fw,fw)}}
    if(jok){cx.drawImage(ji,x-S2/2,y+(m.boss?6:3)-S2*.89,S2,S2);if(fl>0&&m.boss){cx.globalCompositeOperation='lighter';cx.globalAlpha=fl*.6;cx.drawImage(ji,x-S2/2,y+(m.boss?6:3)-S2*.89,S2,S2);cx.globalCompositeOperation='source-over'}}
    else{spr(im,em,x,by-s*.08,s);if(fl>0&&im){cx.globalCompositeOperation='lighter';cx.globalAlpha=fl*.8;spr(im,em,x,by-s*.08,s);cx.globalCompositeOperation='source-over'}}cx.restore();
    if(m.cast>0){cx.font="bold 16px 'Jua',sans-serif";cx.textAlign='center';cx.fillStyle='#ff3a3a';cx.strokeStyle='#fff';cx.lineWidth=3;const yy=y-S2*.8-Math.abs(Math.sin(tm*14))*3;cx.strokeText('!',x,yy);cx.fillText('!',x,yy);cx.strokeStyle='rgba(255,58,58,'+(.4+.4*Math.sin(tm*20)).toFixed(2)+')';cx.lineWidth=2;cx.beginPath();cx.ellipse(x,y+10,30,10,0,0,7);cx.stroke()}
    if(m.shd>0){const sk=m.bk===6?'boss6/fx/shield':'boss3/fx/skill',si=v5i(sk,Math.floor(tm*10)),sw=S2*1.15;if(si){cx.globalAlpha=Math.min(1,m.shd/.3,(m.shT-m.shd)/.2)*.9;cx.drawImage(si,x-sw/2,y+(m.boss?6:3)-S2*.89+S2*.5-sw/2,sw,sw)}}
    cx.globalAlpha=1;
    if(m.rt>0&&SFX.cocoon_bind&&SFX.cocoon_bind.complete){const el=(m.rtT||1.5)-m.rt,sc=el<.12?.7+.3*(el/.12):1,al=m.rt<.15?m.rt/.15:1,w=s*1.9*sc;cx.globalAlpha=al;cx.drawImage(SFX.cocoon_bind,x-w/2,by-s*.08-w*.52,w,w);cx.globalAlpha=1}
    if(m.blkT>0){cx.save();cx.strokeStyle='#7fb6ff';cx.fillStyle='rgba(127,182,255,.18)';cx.lineWidth=2.5;const r=(m.boss?40:20);cx.beginPath();for(let q=0;q<6;q++){const a=q*Math.PI/3+Math.PI/6;cx.lineTo(x+Math.cos(a)*r,y-8+Math.sin(a)*r)}cx.closePath();cx.fill();cx.stroke();cx.restore()}
    {const L=[];if(m.st>0)L.push(m.stp>G.time?'sp':'st');if(m.rt>0)L.push('rt');if(m.sl>0)L.push('sl');if(m.vu>0)L.push('vu');if(m.dotT>0&&STI.dot)L.push('dot');const w=m.boss?18:13,n=Math.min(L.length,3),fr=Math.floor(tm*4)%2,yy=y-(m.boss?52:29);for(let q=0;q<n;q++){const im=STI[L[q]]&&STI[L[q]][fr];if(im&&im.complete&&im.naturalWidth)cx.drawImage(im,x-n*w/2+q*w,yy,w,w)}}
    if(m.pq){const im=PIMG[m.pq];if(im&&im.complete&&im.naturalWidth)cx.drawImage(im,x-9,y-48,18,18);cx.strokeStyle='#8fd8ff';cx.lineWidth=2;cx.beginPath();cx.arc(x,y-6,16,0,6.283);cx.stroke()}
    if(m.bty>0){cx.font="bold 10px 'Jua',sans-serif";cx.textAlign='center';cx.fillStyle='#ffd23e';cx.strokeStyle='#2a1d14';cx.lineWidth=3;const tt='🎯'+Math.ceil(m.bty);cx.strokeText(tt,x,y-34);cx.fillText(tt,x,y-34)}
    if(m.hp<m.max||m.boss){const w=m.boss?44:m.el?30:18,hy=y-(m.boss?34:m.el?24:15);
      cx.fillStyle='#2a1d14';rrect(cx,x-w/2-1,hy-1,w+2,5,2);cx.fill();cx.fillStyle=m.boss?'#ff3b3b':'#ffd23e';cx.fillRect(x-w/2,hy,w*Math.max(0,m.hp/m.max),3)}
  };
  if(G.zones)for(const z of G.zones){const im=z.imgs&&z.imgs[Math.floor(tm*8)%z.imgs.length];if(!im||!im.complete||!im.naturalWidth)continue;const[zx,zy]=pos(z.p),w=z.seg*2.5,al=Math.min(1,z.t/.4,(z.T-z.t)/.25);cx.globalAlpha=Math.max(0,al)*.92;if(z.all){for(let q=CS*.5;q<PER;q+=CS*.95){const[ax,ay]=pos(q);cx.drawImage(im,ax-CS*.75,ay-CS*.75+3,CS*1.5,CS*1.5)}}else cx.drawImage(im,zx-w/2,zy-w/2+3,w,w);cx.globalAlpha=1}
  for(const m of G.mobs)if(pos(m.p)[1]<GY)try{mob(m)}catch(e){repErr(e,'mob '+(m.bk||m.k)+(m.sk||''));G.__dirty=1}
  for(let i=0;i<NC;i++){try{
    const c=G.cells[i];if(!c)continue;const u=U[c.u],dg=drag&&drag.on&&drag.i===i,[x,y]=dg?[drag.x,drag.y-16]:cellXY(i);
    const k=(dg?1.15:1)*(c.pop>0?1+Math.sin((1-c.pop/.25)*Math.PI)*.4:1),K_=c.pop>0?1+Math.sin((1-c.pop/.25)*Math.PI)*.4:1,M=motion(c,c.u);
    if(c.b>0&&AT[c.u].mo==='cast'){cx.globalAlpha=.5*Math.sin((1-c.b/c.bT)*Math.PI);cx.fillStyle=u.col;cx.beginPath();cx.ellipse(x,y+13,24,10,0,0,7);cx.fill();cx.globalAlpha=1}
    const big=u.t>=4,P=big?[[0,-CS*.16]]:[[0,-1]],sz=(big?(u.t===4?CS*1.21:CS*1.1):CS*.75)*k;
    const SC=['rgba(240,245,235,.62)','rgba(120,190,255,.7)','rgba(200,140,255,.7)','rgba(255,214,70,.75)','rgba(255,130,90,.75)'][u.t];
    if(!dg&&u.t<4){const GC=['235,235,225','70,160,255','170,90,255','255,190,40'][u.t];cx.save();cx.fillStyle='rgba('+GC+','+(u.t?.3:.18)+')';rrect(cx,x-CS/2+2,y-CS/2+2,CS-4,CS-4,8);cx.fill();cx.lineWidth=u.t?2.8:2;cx.strokeStyle='rgba('+GC+','+(u.t?.95:.85)+')';rrect(cx,x-CS/2+2.5,y-CS/2+2.5,CS-5,CS-5,8);cx.stroke();cx.restore()}
    const RB=RING['t'+(u.t+1)+'_back'],RF=RING['t'+(u.t+1)+'_front'],RW=sz*(big?1.0:1.15)*(P.length>1?.78:1)*512/448,RH=RW*320/512,ringOK=RB&&RB.complete&&RB.naturalWidth;
    if((u.fu||u.auraFx)&&u.pk&&u.pk.aura&&!dg){const im=u.pk.aura[Math.floor(tm*1000/240)%u.pk.aura.length];if(im&&im.complete&&im.naturalWidth){const ac=u.pk.cfg.auraC||[.5,.5,.8],AS=CS*1.3*concSz(c)/ac[2];cx.save();cx.globalAlpha=.45+(c.b>0?.2:0)+(c.sb>0?.35:0);cx.drawImage(im,x-ac[0]*AS,y+CS*.28-ac[1]*AS,AS,AS);cx.restore()}}
    if(u.fu&&!dg){cx.save();cx.fillStyle='rgba(40,0,8,.55)';rrect(cx,x-CS/2+2,y-CS/2+2,CS-4,CS-4,8);cx.fill();cx.restore()}
    if(u.t>=3&&!dg){const gold=u.t===4,fu=!!u.fu,pu=.5+.5*Math.sin(tm*3+i),col=gold?(fu?'255,55,80':'255,205,70'):'190,125,255';cx.save();
      const gr=cx.createRadialGradient(x,y+2,2,x,y+2,CS*.66);gr.addColorStop(0,'rgba('+col+','+((gold?.85:.38)*(.7+.3*pu)).toFixed(3)+')');gr.addColorStop(1,'rgba('+col+',0)');cx.fillStyle=gr;rrect(cx,x-CS/2+2,y-CS/2+2,CS-4,CS-4,8);cx.fill();
      if(gold){cx.globalCompositeOperation='lighter';{const bw=CS*.62,bg=cx.createLinearGradient(0,y+CS*.45,0,y-CS*1.05);const bc=fu?'255,70,90':'255,215,90';bg.addColorStop(0,'rgba('+bc+','+(.5+.2*pu).toFixed(3)+')');bg.addColorStop(1,'rgba('+bc+',0)');cx.fillStyle=bg;cx.fillRect(x-bw/2,y-CS*1.05,bw,CS*1.5)}cx.translate(x,y+4);cx.rotate(tm*.5+i);cx.globalAlpha=.7+.3*pu;const RS=raySprite(fu),rw=CS*1.2;cx.drawImage(RS,-rw/2,-rw/2,rw,rw);cx.globalAlpha=1}
      cx.restore();cx.save();if(gold&&cx.createConicGradient){const cg=cx.createConicGradient(tm*2.2+i,x,y);(fu?['#ff2d4a','#ff9a2a','#ffffff','#ff2d4a','#2a0008','#ff2d4a']:['#ff5e7a','#ffb83c','#fff27a','#5effa8','#5ec8ff','#b47bff','#ff5e7a']).forEach((cc,q,A)=>cg.addColorStop(q/(A.length-1),cc));cx.strokeStyle=cg}else cx.strokeStyle='rgba('+col+','+(.55+.45*pu).toFixed(3)+')';cx.lineWidth=gold?4:1.8;rrect(cx,x-CS/2+2.5,y-CS/2+2.5,CS-5,CS-5,8);cx.stroke();{const ss=cx.strokeStyle;cx.globalAlpha=.25+.2*pu;cx.lineWidth=gold?9:5;cx.strokeStyle='rgb('+col+')';cx.stroke();cx.globalAlpha=1;cx.strokeStyle=ss}cx.restore();
      if(gold){cx.save();cx.globalCompositeOperation='lighter';for(let q=0;q<5;q++){const ph=(tm*.6+q/5+i*.13)%1,sx=x+Math.sin(q*2.3+i)*CS*.34,sy=y+CS*.38-ph*CS*.85,al=Math.sin(ph*Math.PI);cx.fillStyle=(fu?'rgba(255,170,150,':'rgba(255,230,140,')+(al*.9).toFixed(3)+')';cx.beginPath();cx.arc(sx,sy,1.2+al*1.6,0,7);cx.fill()}cx.restore()}}
    P.forEach(([dx,dy])=>{const fy=y+dy+GROUND;cx.fillStyle='rgba(40,70,25,.22)';cx.beginPath();cx.ellipse(x+dx,fy+1.5,sz*.36,sz*.12,0,0,7);cx.fill();if(ringOK){cx.drawImage(RB,x+dx-RW/2,fy-RH/2,RW,RH)}else{cx.fillStyle=SC;cx.beginPath();cx.ellipse(x+dx,fy,sz*.33,sz*.105,0,0,7);cx.fill()}});
    P.forEach(([dx,dy],j)=>{cx.save();const br=Math.sin(tm*2.6+i+j*2)*.03;{const lg=u.melee?(c.sb>0&&c.sT?Math.sin(Math.min(1,(1-c.sb/c.sT)*1.6)*Math.PI):c.b>0&&c.bT?Math.sin((1-c.b/c.bT)*Math.PI):0)*CS*.3*(u.lgK||1):0;cx.translate(x+dx+M.ox+lg*(c.ax||0),y+dy+M.oy+sz*.42+lg*(c.ay||0)-(c.drop>0?Math.pow(c.drop/.42,2)*CS*4:0))}cx.rotate(M.rot);cx.scale(M.sx*(1-br*.5)*(c.ax<0?-1:1),M.sy*(1+br));const AF=u.ani?aniFrame(u,c):null;if(AF){const S2=fitS2(c,u)*k;cx.drawImage(AF,-S2/2,GROUND-sz*.42-S2*u.ani.pivot,S2,S2)}else spr(u.fr&&c.b>0&&c.bT?u.fr[Math.max(0,Math.min(NF-1,Math.round((1-c.b/c.bT)*(NF-1))))]:u.spr,u.e,0,-sz*.42,sz);cx.restore()});
    if(ringOK)P.forEach(([dx,dy])=>{const fy=y+dy+GROUND;cx.drawImage(RF,x+dx-RW/2,fy-RH/2,RW,RH)});

    if(c.sh>0&&SFX.guardian_shield&&SFX.guardian_shield.complete){const el=(c.shT||3)-c.sh,al=Math.min(1,el/.15,c.sh/.25),w=sz*1.5*(1+.03*Math.sin(tm*5));cx.globalAlpha=.85*al;cx.drawImage(SFX.guardian_shield,x-w/2,y-sz*.1-w/2,w,w);cx.globalAlpha=1}
    if(u.sp2){const rem=Math.max(0,c.sc),rdy=rem<=0;cx.textAlign='center';cx.textBaseline='middle';cx.strokeStyle='#2a1d14';
      if(c.sb>0){cx.font="12px 'Jua',sans-serif";cx.fillStyle='#ffe066';cx.lineWidth=3;const ty=y-CS*.78;cx.strokeText('★ '+u.sp2.n,x,ty);cx.fillText('★ '+u.sp2.n,x,ty)}
      else{const tl=G.tile[i]>0,gw=CS*(tl?.44:.62),gh=4,gx=tl?x-CS*.44:x-gw/2,gy=y+CS*.5-7,cdT=(u.sp2.cd||1),pr=rdy?1:Math.max(0,Math.min(1,1-rem/cdT));cx.fillStyle='rgba(20,12,8,.75)';rrect(cx,gx-1,gy-1,gw+2,gh+2,3);cx.fill();const gc=rdy?(Math.sin(tm*6+i)>0?'#fff3a0':'#ffd23e'):'#7fd0ff';cx.fillStyle=gc;rrect(cx,gx,gy,Math.max(2,gw*pr),gh,2);cx.fill();if(rdy){cx.font="9px 'Jua',sans-serif";cx.fillStyle='#ffe066';cx.lineWidth=2.5;cx.strokeText('★',gx+gw+5,gy+2);cx.fillText('★',gx+gw+5,gy+2)}}}
    
    if(c.hst>0&&U.seraphine&&U.seraphine.pk&&U.seraphine.pk.buff_marker){const bm=U.seraphine.pk.buff_marker[Math.floor(tm*6)%4];if(bm&&bm.complete&&bm.naturalWidth){const w=26;cx.globalAlpha=Math.min(1,c.hst/.5);cx.drawImage(bm,x+CS/2-w+3,y-CS/2-3+Math.sin(tm*5)*1,w,w);cx.globalAlpha=1}}
    if(c.rg>0&&U.sporun&&U.sporun.pk&&U.sporun.pk.buff_marker){const bm=U.sporun.pk.buff_marker[Math.floor(tm*4)%2];if(bm&&bm.complete&&bm.naturalWidth){const w=22;cx.globalAlpha=Math.min(1,c.rg/.5);cx.drawImage(bm,x-w/2,y-CS/2-9+Math.sin(tm*5)*1,w,w);cx.globalAlpha=1}}
    if(c.sy&&U[c.u].pk&&U[c.u].pk.buff_marker){const bm=U[c.u].pk.buff_marker[Math.floor(tm*4)%2];if(bm&&bm.complete&&bm.naturalWidth){const w=22;cx.drawImage(bm,x-CS/2,y-CS/2+12+Math.sin(tm*5)*1,w,w)}}
    if(c.slb>0&&U.momo&&U.momo.pk&&U.momo.pk.buff_marker){const bm=U.momo.pk.buff_marker[Math.floor(tm*4)%2];if(bm&&bm.complete&&bm.naturalWidth){const w=20;cx.globalAlpha=Math.min(1,c.slb/.5);cx.drawImage(bm,x+CS/2-w,y-CS/2+13+Math.sin(tm*5)*1,w,w);cx.globalAlpha=1}}
    if(c.as>0&&U.orca&&U.orca.pk&&U.orca.pk.buff_marker){const bm=U.orca.pk.buff_marker[Math.floor(tm*5)%2];if(bm&&bm.complete&&bm.naturalWidth){const w=15;cx.globalAlpha=Math.min(1,c.as/.5);cx.drawImage(bm,x-CS/2+1,y-CS/2+1+Math.sin(tm*5)*1,w,w);cx.globalAlpha=1}}
    if(planetLevel(c.u)>0){const lv=planetLevel(c.u),tx=x+CS/2-1,ty=y+CS*.5-23;cx.save();cx.font="9px 'Jua',sans-serif";cx.textAlign='right';cx.textBaseline='top';const txt='Lv'+lv,w=cx.measureText(txt).width+5;
      cx.fillStyle=lv>1?'rgba(42,29,20,.85)':'rgba(42,29,20,.55)';rrect(cx,tx-w,ty,w,12,3.5);cx.fill();cx.fillStyle=lv>1?'#ffd23e':'#e8dcc8';cx.fillText(txt,tx-3,ty+1.5);cx.restore()}
    if(c.aur){const pk0=U[c.aurK]&&U[c.aurK].pk,bm=pk0&&(pk0.buff_marker||pk0.buff_attack);if(bm){const im=bm[Math.floor(tm*4)%bm.length];if(im&&im.complete&&im.naturalWidth){cx.save();cx.globalAlpha=.9;cx.drawImage(im,x-CS/2+2,y+CS/2-30,16,16);cx.restore()}}}if(c.aur&&!(V5I&&V5I['common/buff_floor'])){cx.save();cx.strokeStyle='rgba(95,224,138,'+(.45+.2*Math.sin(tm*3))+')';cx.lineWidth=2;cx.setLineDash([4,3]);rrect(cx,x-CS/2+4,y-CS/2+4,CS-8,CS-8,6);cx.stroke();cx.restore()}
    {const im=PIMG[u.planet];if(im&&im.complete&&im.naturalWidth){const on=G.plOn&&G.plOn[u.planet]>0,w=on?15:13;cx.save();if(on){cx.fillStyle=PLANET_COL[u.planet]||'#fff';cx.globalAlpha=.35+.15*Math.sin(tm*4);cx.beginPath();cx.arc(x+CS/2-w/2-1,y-CS/2+w/2+1,w*.75,0,7);cx.fill();cx.globalAlpha=1}else cx.globalAlpha=.85;cx.drawImage(im,x+CS/2-w-1,y-CS/2+1,w,w);cx.restore()}}
    if(u.t===4){cx.font='9px sans-serif';cx.fillStyle='#fff';const q=tm*2+i;cx.fillText('✦',x+Math.cos(q)*20,y+Math.sin(q)*9-4)}
    if(c.rc>0&&u.pk&&u.pk.combo){const im=u.pk.combo[Math.min(u.pk.combo.length,c.rc)-1];if(im&&im.complete&&im.naturalWidth)cx.drawImage(im,x-10,y-CS/2-12,20,20)}
    if(c.seal>0){const si=v5i('boss4/fx/skill',Math.floor(tm*8));if(si){cx.save();cx.globalAlpha=Math.min(1,c.seal/.3);cx.drawImage(si,x-CS*.6,y-CS*.65,CS*1.2,CS*1.2);cx.restore()}}
    if(G.cdLock>0&&u.sp2){const ci=v5i('boss5/fx/clock',Math.floor(tm*4));if(ci)cx.drawImage(ci,x-9,y-CS/2-14,18,18)}
    
    if(c.n===3&&u.t<3&&BY[u.t+1].length&&!dg&&!c.lk&&autoOK(c.u,3)){const pu=.5+.5*Math.sin(tm*5),bw=34,bh=13,bx=x-bw/2,by=y-CS/2-3+Math.sin(tm*6)*1.5;cx.save();
      cx.strokeStyle='rgba(255,224,102,'+(.55+.45*pu)+')';cx.lineWidth=2+pu*1.5;rrect(cx,x-CS/2+2,y-CS/2+2,CS-4,CS-4,6);cx.save();cx.globalAlpha=.3*pu+.15;cx.lineWidth=7;cx.stroke();cx.restore();cx.stroke();cx.restore()}
  }catch(e){repErr(e,'cell '+(G.cells[i]&&G.cells[i].u));G.__dirty=1}}
  if(A('eye')&&G.eyeI>=0&&G.cells[G.eyeI]){const[ex,ey]=cellXY(G.eyeI),pu=.5+.5*Math.sin(tm*4);cx.save();cx.strokeStyle='rgba(215,184,255,'+(.6+.4*pu)+')';cx.lineWidth=2.5+pu*2;rrect(cx,ex-CS/2+3,ey-CS/2+3,CS-6,CS-6,7);cx.stroke();cx.font='11px sans-serif';cx.shadowBlur=0;cx.fillText('👁️',ex+CS/2-9,ey-CS/2+9);cx.restore()}
  for(let i=0;i<NC;i++){const c=G.cells[i];if(!c||(drag&&drag.on&&drag.i===i))continue;const u=U[c.u],q=u.t>=4?(c.k||1):c.n;if(q<=1)continue;const rdy=u.t<3&&c.n===3&&BY[u.t+1]&&BY[u.t+1].length,st=c.lk?'lk':rdy?(autoOK(c.u,3)?'up':'pr'):'n',[x,y]=cellXY(i),tx='×'+q+(st==='up'?'▲':st==='pr'?'🛡':'');
   cx.save();cx.font="bold "+Math.round(CS*.24)+"px 'Jua',sans-serif";cx.textAlign='center';cx.textBaseline='middle';const w=cx.measureText(tx).width+9,h=CS*.27,bx=x-CS*.5+w/2+2,by=y+CS*.5-h/2-10;
   cx.fillStyle=st==='up'?'#ffd23e':st==='pr'?'#2a5fb0':st==='lk'?'#55607a':'rgba(20,14,10,.88)';rrect(cx,bx-w/2,by-h/2,w,h,h/2);cx.fill();cx.lineWidth=1.6;cx.strokeStyle=st==='up'?'#fff6c0':'#fff';cx.stroke();cx.fillStyle=st==='up'?'#3a2408':'#fff';cx.fillText(tx,bx,by+1);cx.restore()}
  for(let i=0;i<0;i++){const c=G.cells[i];if(!c||!(c.k>1)||(drag&&drag.on&&drag.i===i))continue;const[x,y]=cellXY(i),tx='🔮'+c.k+'겹';cx.save();cx.font="bold "+Math.round(CS*.24)+"px 'Jua',sans-serif";cx.textAlign='center';cx.textBaseline='middle';const w=cx.measureText(tx).width+8,h=CS*.28,bx=x-CS*.5+w/2+1,by=(G.tile[i]>0?y+CS*.5-Math.round(CS*.27)-4-h/2:y+CS*.5-h/2-9);cx.fillStyle='rgba(60,20,90,.9)';rrect(cx,bx-w/2,by-h/2,w,h,h/2);cx.fill();cx.lineWidth=1.5;cx.strokeStyle='#ffd23e';cx.stroke();cx.fillStyle='#ffe98a';cx.fillText(tx,bx,by+1);cx.restore()}
  if(SAVE.roleI!==0)for(let i=0;i<NC;i++){const c=G.cells[i];if(!c||(drag&&drag.on&&drag.i===i))continue;const[x,y]=cellXY(i),ri=roleIcons(c.u);cx.save();cx.font=Math.round(CS*.22)+"px sans-serif";cx.textAlign='center';cx.textBaseline='middle';ri.forEach((e,q)=>{const ex=x-CS*.5+CS*.15+q*CS*.27,ey=y-CS*.5+CS*.15,im=roleBadge(e),bw=CS*.3;cx.drawImage(im,ex-bw/2,ey-bw/2,bw,bw)});
   if(c.aur||c.hst>0||c.as>0||c.rg>0||c.slb>0){const pu=.5+.5*Math.sin(tm*4+i);cx.strokeStyle='rgba(111,232,200,'+(.45+.4*pu).toFixed(2)+')';cx.lineWidth=2;cx.setLineDash([4,3]);rrect(cx,x-CS/2+3,y-CS/2+3,CS-6,CS-6,7);cx.stroke();cx.setLineDash([]);cx.font="bold "+Math.round(CS*.2)+"px 'Jua',sans-serif";cx.fillStyle='#6fe8c8';cx.strokeStyle='#103028';cx.lineWidth=2.5;cx.textAlign='left';cx.textBaseline='bottom';cx.strokeText('▲',x-CS*.47,y+CS*.47);cx.fillText('▲',x-CS*.47,y+CS*.47)}cx.restore()}
  if(G.sel!==null&&G.cells[G.sel]&&AURA[G.cells[G.sel].u]){const sx=G.sel%COLS,sy=Math.floor(G.sel/COLS),ar=A('wideaura')?2:1;cx.save();for(let j=0;j<NC;j++){const jx=j%COLS,jy=Math.floor(j/COLS);if(j===G.sel||Math.max(Math.abs(jx-sx),Math.abs(jy-sy))>ar)continue;const[x,y]=cellXY(j);cx.fillStyle='rgba(111,232,200,.18)';rrect(cx,x-CS/2+2,y-CS/2+2,CS-4,CS-4,7);cx.fill();cx.strokeStyle='rgba(111,232,200,.8)';cx.lineWidth=1.5;cx.stroke()}cx.restore()}
  for(let i=0;i<NC;i++){if(!cellOut(i)||(drag&&drag.on&&drag.i===i))continue;const[x,y]=cellXY(i),c=G.cells[i],big=U[c.u].t>=4,by=y-CS*.33+Math.sin(tm*3+i)*CS*.03,r=CS*.16;cx.save();cx.globalAlpha=.92;cx.fillStyle='rgba(60,10,16,.85)';cx.beginPath();cx.arc(x,by,r,0,7);cx.fill();cx.lineWidth=2;cx.strokeStyle='#ff6b6b';cx.stroke();cx.beginPath();cx.arc(x,by,r*.55,0,7);cx.lineWidth=1.6;cx.strokeStyle='#ffd0d0';cx.stroke();cx.beginPath();cx.moveTo(x-r*.7,by+r*.7);cx.lineTo(x+r*.7,by-r*.7);cx.lineWidth=2.4;cx.strokeStyle='#ff6b6b';cx.stroke();cx.restore()}
  drawTileUpgradeLabels();cx.textAlign='center';cx.textBaseline='middle';
  for(const m of G.mobs)if(pos(m.p)[1]>=GY)try{mob(m)}catch(e){repErr(e,'mob '+(m.bk||m.k)+(m.sk||''));G.__dirty=1}
  for(const f of G.fx){
    if(f.dl>0)continue;const q=1-f.t/f.T;
    if(FXD[f.k]){cx.save();FXD[f.k](cx,f,q);cx.restore();continue}
    if(f.k==='p'){const x=f.x1+(f.x2-f.x1)*q,y=f.y1+(f.y2-f.y1)*q,q0=Math.max(0,q-.45),x0=f.x1+(f.x2-f.x1)*q0,y0=f.y1+(f.y2-f.y1)*q0;
      cx.strokeStyle=f.c;cx.lineCap='round';cx.globalAlpha=.55;cx.lineWidth=f.r*1.6;cx.beginPath();cx.moveTo(x0,y0);cx.lineTo(x,y);cx.stroke();cx.globalAlpha=1;
      cx.fillStyle=f.c;cx.beginPath();cx.arc(x,y,f.r+1,0,7);cx.fill();cx.fillStyle='#fff';cx.beginPath();cx.arc(x,y,f.r*.55,0,7);cx.fill()}
    else if(f.k==='s'){cx.globalAlpha=1-q;cx.fillStyle='#fff';cx.beginPath();cx.arc(f.x,f.y,f.r*(.5+q*.3),0,7);cx.fill();
      cx.strokeStyle=f.c;cx.lineWidth=2.5;cx.lineCap='round';for(let j=0;j<6;j++){const a=j*1.047+f.x,r0=f.r*(.5+q),r1=f.r*(1+q*1.4);cx.beginPath();cx.moveTo(f.x+Math.cos(a)*r0,f.y+Math.sin(a)*r0);cx.lineTo(f.x+Math.cos(a)*r1,f.y+Math.sin(a)*r1);cx.stroke()}}
    else if(f.k==='c'){const r=f.r*(.35+.65*q);cx.fillStyle=f.c;cx.globalAlpha=(1-q)*.4;cx.beginPath();cx.arc(f.x,f.y,r,0,7);cx.fill();cx.globalAlpha=1-q;cx.strokeStyle='#fff';cx.lineWidth=3*(1-q)+.5;cx.stroke()}
    else if(f.k==='pf'){cx.globalAlpha=1-q*q;cx.fillStyle=f.c;cx.beginPath();cx.arc(f.x,f.y,f.r*(1-q*.5),0,7);cx.fill()}
    else if(f.k==='ring'){cx.globalAlpha=1-q;cx.strokeStyle=f.c;cx.lineWidth=5*(1-q)+1;cx.beginPath();cx.arc(f.x,f.y,f.r*q,0,7);cx.stroke()}
    else if(f.k==='ray'){cx.globalAlpha=(1-q)*.55;cx.fillStyle=f.c;for(let j=0;j<8;j++){const a=j*.785+q*1.5,R2=70+q*40;cx.beginPath();cx.moveTo(f.x,f.y);cx.lineTo(f.x+Math.cos(a-.12)*R2,f.y+Math.sin(a-.12)*R2);cx.lineTo(f.x+Math.cos(a+.12)*R2,f.y+Math.sin(a+.12)*R2);cx.fill()}}
    else if(f.k==='t'){const pop=q<.15?1.5-q/.15*.5:1,sz=(f.cr?17:11)*pop;cx.globalAlpha=Math.min(1,f.t/f.T*2.2);cx.font=sz+"px 'Jua',sans-serif";
      cx.strokeStyle='#2a1d14';cx.lineWidth=3;cx.fillStyle=f.cr?'#ffe033':'#fff';const y=f.y-q*18;cx.strokeText(f.s,f.x,y);cx.fillText(f.s,f.x,y)}
    cx.globalAlpha=1
  }
  cx.restore();
  if(G.flash>0){cx.fillStyle='rgba(255,255,255,'+Math.min(.2,G.flash*.6)+')';cx.fillRect(0,0,W,H)}
}
function hud(){
  $('hW').textContent='WAVE '+G.wave+(isBoss(G.wave)?' 보스':'');
  const t=Math.max(0,Math.ceil(G.waveT)),ss=t%60;$('hT').textContent=G.prep>0?'준비 '+Math.ceil(G.prep):'0'+Math.floor(t/60)+':'+(ss<10?'0':'')+ss;
  {const mc=mobCount(),ne=G.mobs.filter(m=>m.esc).length,ar=G.zm==='arrive';const hp='❤️'+Math.ceil(G.hp),tx=(ar?'💀'+mc+' 🚩'+(G.nArr||0):'💀'+mc+'/'+OV_N+(mc>=OV_N?'↓':'')+(ne?' 😱'+ne:''))+' · '+hp;if($('hM').textContent!==tx)$('hM').textContent=tx;$('hM').classList.toggle('lowhp',G.hp<=30)}
  {const hb=$('hpbar');if(hb){$('hpF').style.width=(G.hp/hpMax()*100)+'%';const tx='❤️ '+Math.ceil(G.hp)+' / '+hpMax();if($('hHP').textContent!==tx)$('hHP').textContent=tx;hb.classList.toggle('low',G.hp<=30)}}
  {const dz=G.zm==='arrive'?G.hp<=30:mobCount()>=OV_N-10;if(dz&&!G.dz){toast('⚠️ 위기! 적이 너무 많아요');SND.play('alarm')}if(dz!==!!G.dz)SND.bg(false,dz||isBoss(G.wave)?1:0);G.dz=dz;$('mbar').classList.toggle('dz',dz)}$('mfill').style.width=(G.zm==='arrive'?Math.min(100,G.mobs.length):Math.min(100,mobCount()/OV_N*100))+'%';
  $('hC').textContent=Math.floor(G.coins).toLocaleString();orbBtn();$('hS').textContent=G.stones;$('hN').textContent=total()+'/'+MAXU;
  $('summon').disabled=G.coins<cost();{G.crK2=(G.crK2||0)+1;if(G.crK2%10===0){const sig=Object.keys(RECIPE).map(k=>canCraft(k)?1:0).join('')+'|'+craftCost();if(sig!==G.crSig){G.crSig=sig;refresh()}}}{const cs=cost(),tx=cs?'🪙'+cs:'무료';if($('cost').textContent!==tx)$('cost').textContent=tx}skHud();
  if(sheet==='gam'){if($('gLot'))$('gLot').disabled=G.stones<lotCost()*(G.lotX||1);if(0)$('gLot10').disabled=G.stones<lotCost()*10}
  if(sheet==='up'&&$('u3'))$('u3').disabled=G.coins<upCost(3)||G.luck>=LUCK_MAX;
  if(0)$('u4').disabled=G.coins<tileCost()||G.tile.every(lv=>lv>=5);
  if(sheet==='up'&&$('fuUp'))Array.from($('fuUp').children).forEach(b=>{const id=b.dataset.id;b.disabled=!G.cells.some(c=>c&&c.u===id)||G.coins<fuUpCost(id)});if(sheet==='up'&&$('planetUp')){const sig=plIn().map(p=>{const q=upPlState(p);return (q.n>0)+''+(G.coins>=q.cost)+q.lv}).join('|')+'|'+(G.coins<upCost(3));if(sig!==G.upSig){G.upSig=sig;if(!HOLD.k)refresh()}}
  if($('bU')&&G.sel!==null&&G.cells[G.sel]){const k=G.cells[G.sel].u;$('bU').disabled=G.coins<upKCost(k)}
}
let sheet=null;
// ---------- 복권 ----------
const LOT=[{k:'h1',s:'🧑',p:.08,t:1},{k:'h2',s:'🦹',p:.03,t:2},{k:'jack',s:'🦸',p:.01},{k:'x20',s:'7️⃣',p:.015,m:20},{k:'stone',s:'🍀',p:.06},{k:'x5',s:'👑',p:.06,m:5},{k:'x2',s:'💎',p:.14,m:2},{k:'x1',s:'💰',p:.22,m:1}];
function lotCost(){return 1}
const SELL4=2; // 우주·특수조합 판매 행운석 (조합→판매→복권 무한 루프 너프)
function lotPrize(){return Math.round((50+5*G.wave)*(A('lotto')?EC.lotto:1))}
let lotCur=null;
function lotRoll(){let r=Math.random();for(const z of LOT){if(r<z.p)return z;r-=z.p}return null}
function lotSyms(pz){if(pz)return [pz.s,pz.s,pz.s];const S=LOT.map(z=>z.s),a=S[Math.floor(Math.random()*S.length)];let b;do{b=S[Math.floor(Math.random()*S.length)]}while(b===a);const sy=Math.random()<.6?[a,a,b]:[a,b,S[Math.floor(Math.random()*S.length)]];if(sy[0]===sy[1]&&sy[1]===sy[2])sy[2]=b;return sy.sort(()=>Math.random()-.5)}
function lotSymH(x,sz){return LOTI[x]&&v5u(LOTI[x])?v5img(LOTI[x],'','width:'+sz+';height:'+sz):x}
function lotPay(z,cost){if(!z)return {msg:'꽝… 다음엔 될 거예요',sh:'꽝',big:0,c:0,st:0,h:null};
  if(z.m){const w=cost*z.m;G.coins+=w;return {msg:(z.m>=20?'🎉 대박! ':z.m>=5?'✨ 당첨! ':'당첨! ')+'<b>🪙+'+w+'</b>'+(z.m>1?' ('+z.m+'배)':''),sh:'🪙'+w,big:z.m>=20,c:w,st:0,h:null}}
  if(z.t){const pool=BY[z.t]||[],id=pool.length?rnd(pool):null;if(id&&place(id))return {msg:'🎉 영웅 당첨! <b>'+TN[z.t]+' '+U[id].n+'</b>',sh:'🧑'+U[id].n,big:z.t>=2,c:0,st:0,h:id};const w=cost*(z.t+1);G.coins+=w;return {msg:'영웅 자리가 없어 <b>🪙+'+w+'</b>',sh:'🪙'+w,big:0,c:w,st:0,h:null}}
  if(z.k==='stone'){G.stones+=3;return {msg:'🍀 당첨! <b>행운석 +3</b>',sh:'🍀+3',big:0,c:0,st:3,h:null}}
  const id=BY[3].length?rnd(BY[3]):null;if(id&&place(id))return {msg:'🦸 잭팟!! <b>'+U[id].n+'</b> 등장!',sh:'🦸'+U[id].n,big:1,c:0,st:0,h:id};G.coins+=cost*30;return {msg:'🦸 잭팟!! <b>🪙+'+cost*30+'</b>',sh:'🪙'+cost*30,big:1,c:cost*30,st:0,h:null}}
function lotFx(big){const card=$('lot').firstChild;card.className='lcard '+(big?'jack':'win');G.flash=Math.max(G.flash||0,big?.6:.25);G.shake=Math.max(G.shake,big?.8:.3);
  for(let i=0;i<(big?60:22);i++)G.fx.push({k:'pf',x:W/2+(Math.random()-.5)*W*.8,y:H*.45,vx:(Math.random()-.5)*260,vy:-80-Math.random()*220,t:1+Math.random()*.6,T:1.6,c:['#ffe066','#ff9a2e','#fff','#7fe3ff','#ff6fae'][i%5],r:2.5+Math.random()*2.5,dl:Math.random()*.25})}
function buyLot10(){if(G.over||lotCur&&!lotCur.done)return;const n=10,c=lotCost()*n;if(G.stones<c){toast('🍀 행운석이 '+c+'개 필요해요');return}G.stones-=c;G.lotN=(G.lotN||0)+n;const cost=lotPrize(),R=[];
  for(let i=0;i<n;i++){const z=lotRoll();R.push({z,sy:lotSyms(z),p:lotPay(z,cost)})}
  lotCur={done:true,ten:1};const L=$('lot');L.style.display='flex';G.lotP=true;L.firstChild.className='lcard';L.querySelector('.lbox').style.display='none';$('lotSub').textContent='10장 한 번에 긁는 중…';SND.play('scratch');
  const tc=R.reduce((a,r)=>a+r.p.c,0),ts=R.reduce((a,r)=>a+r.p.st,0),hs=R.filter(r=>r.p.h).map(r=>U[r.p.h].n),wn=R.filter(r=>r.z).length,big=R.some(r=>r.p.big);
  $('lotRes').innerHTML='<div class="l10">'+R.map((r,i)=>'<div class="'+(r.z?(r.p.big?'w j':'w'):'')+'" style="animation-delay:'+(i*.12)+'s"><span>'+r.sy.map(x=>lotSymH(x,'1em')).join('')+'</span><b>'+r.p.sh+'</b></div>').join('')+'</div><div class="l10s" style="animation-delay:'+(n*.12+.1)+'s">당첨 <b>'+wn+'</b>/10 · <b>🪙+'+tc+'</b>'+(ts?' · <b>🍀+'+ts+'</b>':'')+(hs.length?' · <b>🦸'+hs.join(', ')+'</b>':'')+'</div>';
  ['lotAll','lotAgain','lotClose'].forEach(id=>$(id).style.display='none');
  setTimeout(()=>{if(!wn)SND.play('lose');else if(big)SND.play('jackpot');else SND.play('win',3);if(wn)lotFx(big);$('lotSub').textContent=big?'이게 되네!!':wn?'당첨!':'아깝다!';
    const a=$('lotAgain');a.style.display='';a.textContent='10장 더 🍀'+lotCost()*10;a.disabled=G.stones<lotCost()*10;a.onclick=buyLot10;$('lotClose').style.display='';refresh()},n*120+250);refresh()}
function buyLot(){if(G.over||lotCur&&!lotCur.done)return;const c=lotCost();if(G.stones<c)return;G.stones-=c;G.lotN=(G.lotN||0)+1;const pz=lotRoll(),sy=lotSyms(pz);
  lotCur={pz,cost:lotPrize(),done:false};const L=$('lot');G.lotP=true;L.querySelector('.lbox').style.display='';$('lotAgain').onclick=buyLot;L.style.display='flex';L.firstChild.className='lcard';$('lotSym').innerHTML=sy.map(x=>'<span>'+lotSymH(x,'1.15em')+'</span>').join('');$('lotRes').innerHTML='';$('lotSub').textContent='두근두근…';
  $('lotAll').style.display='none';$('lotAgain').style.display='none';$('lotClose').style.display='none';
  const cv=$('lotCv'),x=cv.getContext('2d');x.globalCompositeOperation='source-over';const g=x.createLinearGradient(0,0,520,220);g.addColorStop(0,'#c9ccd6');g.addColorStop(.5,'#f1f2f6');g.addColorStop(1,'#a9adba');x.fillStyle=g;x.fillRect(0,0,520,220);
  x.fillStyle='rgba(90,95,110,.5)';x.font="bold 26px 'Jua',sans-serif";x.textAlign='center';for(let i=0;i<3;i++)x.fillText('긁어요',95+i*165,120);x.globalCompositeOperation='destination-out';refresh();setTimeout(lotAuto,220)}

function lotReveal(){if(!lotCur||lotCur.done)return;lotCur.done=true;const cv=$('lotCv'),x=cv.getContext('2d');x.clearRect(0,0,520,220);const z=lotCur.pz,R=$('lotRes'),card=$('lot').firstChild;let msg;
  if(!z)SND.play('lose');else if(z.k==='jack'||(z.m||0)>=20)SND.play('jackpot');else SND.play('win',z.m||3);
  {const P=lotPay(z,lotCur.cost);msg=P.msg;if(!z)$('lotSub').textContent='아깝다!';else{const big=z.k==='jack'||z.m>=20;$('lotSub').textContent=big?'이게 되네!!':'당첨!';lotFx(big)}}
  R.innerHTML=msg;$('lotAll').style.display='none';const a=$('lotAgain');a.style.display='';a.textContent='한 장 더 🍀'+lotCost();a.disabled=G.stones<lotCost();$('lotClose').style.display='';refresh()}
function lotAuto(){if(!lotCur||lotCur.done||lotCur.auto)return;lotCur.auto=true;SND.play('scratch');const cur=lotCur,cv=$('lotCv'),x=cv.getContext('2d');x.globalCompositeOperation='destination-out';let k=0;const N=16,step=()=>{if(lotCur!==cur||cur.done)return;for(let q=0;q<3;q++){const t=(k*3+q)/(N*3),row=Math.floor(t*4),u=t*4-row,X=(row%2?1-u:u)*520,Y=28+row*55;x.beginPath();x.arc(X,Y,44,0,7);x.fill()}k++;if(k<N)requestAnimationFrame(step);else lotReveal()};step()}
function lotInit(){if(v5u('lottery/background')){const lb=document.querySelector('#lot .lbox');if(lb)lb.style.backgroundImage='url('+v5u('lottery/background')+')'}const cv=$('lotCv');let dn=false;cv.addEventListener('pointerdown',e=>{lotAuto()});
  $('lotAll').onclick=lotReveal;$('lotAgain').onclick=buyLot;$('lotClose').onclick=()=>{$('lot').style.display='none';G.lotP=false;$('lot').querySelector('.lbox').style.display='';lotCur=null}}
function openSheet(k){if(HOLD.k)holdStop();sheet=sheet===k?null:k;refresh();holdInit()}
function refresh(){
  {const n=G&&!G.over?readyCells().length+orbReady().length:0,b=$('bAll');if(b){b.style.display=n&&G.sel===null&&!sheet?'block':'none';b.textContent='▲ 일괄 승급 ×'+n}}
  {const b=$('bCraft');if(b){const L=[];if(G&&!G.over){const nm=k=>U[k]?U[k].n:k;
   const GL=!!G.goal;
   for(const m of Object.keys(RECIPE))if(canCraft(m)&&(!GL||onPath(m)))L.push({t:'m',id:m,c:craftCost(),mat:rcp(m).map(nm).join(' + ')});
   for(const f of Object.keys(FUSION))if(U[f]&&canFuse(f)&&(!GL||onPath(f)))L.push({t:'f',id:f,c:fuseCost(),mat:FUSION[f].mat.map(nm).join(' + ')});
   if(0){const seen={};for(let i=0;i<NC;i++){const c=G.cells[i];if(!c||U[c.u].t<4)continue;if(seen[c.u]!=null){const j=seen[c.u],ka=G.cells[j].k||1,kb=c.k||1;if(!L.some(o=>o.t==='k'&&o.id===c.u))L.push({t:'k',id:c.u,a:j,b:i,c:0,kk:ka+kb,mat:nm(c.u)+' ×'+ka+' + ×'+kb})}else seen[c.u]=i}}}
   const ids=L.map(o=>o.t+o.id),newOne=ids.some(x=>!(b.__seen||[]).includes(x));if(newOne&&b.__hid){b.__hid=0}b.__seen=ids;if(!L.length)b.__open=0;
   const show=L.length&&G.sel===null&&!sheet&&!b.__hid;b.style.display=show?'flex':'none';
   const opt=(o,j)=>'<button class="cOpt'+(o.t!=='m'?' fu':'')+'" data-j="'+j+'">'+(U[o.id].url?'<img src="'+cardUrl(o.id)+'" alt="">':'')+'<span class="cT"><b>'+(o.t==='m'?'✦ '+U[o.id].n+' 조합':o.t==='f'?'✨ '+U[o.id].n+' 특수 조합':'🔮 '+U[o.id].n+' 농축 ×'+o.kk)+(o.c?' <small>🪙'+o.c+'</small>':'')+'</b><em>'+o.mat+'</em></span></button>';
   const key=L.map(o=>o.t+o.id+o.c+'_'+(o.kk||0)+o.mat).join('|')+'#'+(b.__open?1:0);if(b.dataset.k!==key){b.dataset.k=key;b.__L=L;
    b.innerHTML=!L.length?'':(L.length===1?opt(L[0],0):b.__open?L.map(opt).join('')+'<button class="cMore" data-a="close">▾ 접기</button>':'<button class="cOpt cSum'+(L.some(o=>o.t!=='m')?' fu':'')+'" data-a="open">'+(U[L[0].id].url?'<img src="'+cardUrl(L[0].id)+'" alt="">':'')+'<span class="cT"><b>✦ 조합 '+L.length+' ▴</b></span></button>')+'<button class="cHide" data-a="hide" title="숨기기">✕</button>'}}}
  $('cost').textContent=cost()?'🪙'+cost():'무료';orbUI();
  $('bMyth').classList.toggle('ready',Object.keys(RECIPE).some(m=>canCraft(m)&&(!G.goal||onPath(m)))||Object.keys(FUSION).some(k=>U[k]&&canFuse(k)&&(!G.goal||onPath(k))));
  const s=$('sel'),c=G.sel!==null?G.cells[G.sel]:null;
  {const S=$('synS');if(S)S.style.visibility=c||sheet?'hidden':'visible'}$('bSnd').style.visibility=sheet?'hidden':'';$('bMenu').style.visibility=sheet?'hidden':'';if(!c)s.style.display='none';
  else{
    const u=U[c.u];s.style.display='flex';
    s.innerHTML='<button id="selX" style="position:absolute;top:-12px;right:-8px;z-index:3;width:30px;height:30px;border-radius:50%;border:2px solid #2a1d14;background:#5a4636;color:#fff;font-size:15px;line-height:1;padding:0">✕</button>'+ic(c.u,1)+'<div class="t"><b>'+u.n+(u.nick?' <span style="font-weight:400;font-size:11px;color:#d8c8b0">'+u.nick+'</span>':'')+'</b><small><span style="color:'+(u.fu?'#ff5a6e':TC[u.t])+'">'+(u.fu?'✨ 특수 조합':TN[u.t])+(c.n>1?' ×'+c.n:'')+(c.k>1?' ×'+c.k+' 겹침 (공격력 '+concK(c).toFixed(1)+'배·속도 +'+Math.round((concSpd(c)-1)*100)+'%)':'')+'</span> · '+pic(u.planet)+PLANETS[u.planet]+(HCLS[c.u]?' · '+clsTag(c.u):'')+(ROLE[c.u]?' · '+roleTag(c.u):'')+'</small><small>'+(lvK(c.u)>1?'Lv.'+SAVE.lv[c.u]+' · ':'')+'⚔️'+fmt(u.d*c.n*mult(c.u)*tileMult(G.sel)*(c.pa||1)*augA(c))+' · 🎯'+(+((effR(G.sel)-16)/CS).toFixed(1))+'칸'+(effR(G.sel)>u.r+1?' <span style="color:#7fe8a0">(+'+(+((effR(G.sel)-u.r)/CS).toFixed(1))+')</span>':'')+(G.tile[G.sel]?' · <span style="color:'+TILEC[G.tile[G.sel]]+'">▦ 강화 칸 ×'+(1+G.tile[G.sel]).toFixed(1)+'</span>':'')+(cellOut(G.sel)?' <b style="color:#ff8a8a;font-weight:400">⚠ 길에 안 닿음</b>':'')+'</small>'+(()=>{const D=dmgParts(G.sel);return D&&D.L.length?'<small style="display:block;font-size:12px;color:#ffd9a0;white-space:normal">💥 공격력 ×'+D.t.toFixed(2)+' = '+D.L.map(q=>q[0]+' ×'+q[1].toFixed(2)).join(' · ')+' <span style="opacity:.7">(모두 곱해짐)</span></small>':''})()+(PV[c.u]?'<small style="display:block;font-size:12px;white-space:normal"><b style="font-weight:400;color:#c9d0f0">기본</b> '+tagH([rngTag(c.u)].concat(PVT[c.u]||[]))+'<br><span style="color:#9fe8ff">'+PV[c.u].x+'</span>'+(AURA[c.u]?'<br><span style="color:#6fe8c8">✨ 오라(초록 칸): '+AURA[c.u].x+'</span>':'')+(c.aur?'<br><span style="color:#6fe8c8">▲ 오라 받는 중: '+(c.aurL||[c.aurK]).map(k=>U[k]?U[k].n:k).join(', ')+'</span><br><span style="color:#a8f0d8;font-size:12px">'+[c.pa>1?'공격력 +'+Math.round((c.pa-1)*100)+'%':'',c.pas>1?'공격속도 +'+Math.round((c.pas-1)*100)+'%':'',c.pcd>1?'쿨타임 '+Math.round((c.pcd-1)*100)+'% 빨리':'',c.prg>0?'사거리 +'+(+(c.prg/CS).toFixed(1))+'칸':'',c.pcr>0?'치명타 +'+Math.round(c.pcr*100)+'%p':'',c.psl>0?'감속 부여':''].filter(Boolean).join(' · ')+' (행성 시너지 포함 · 같은 종류 오라는 겹치지 않고 가장 센 것 하나)</span>':'')+'</small>':'')+(u.sp2?'<small>★ '+u.sp2.n+' · 쿨 '+u.sp2.cd+'초 '+tagH(SPT[c.u])+'</small>'+(SPD[c.u]?'<small style="display:block;color:#ffe9a8;font-size:12px;white-space:normal">'+SPD[c.u]+'</small>':''):'')+'</div><div class="bt">'+
      (c.n===3&&u.t<3&&BY[u.t+1].length&&!c.lk?'<button id="bM" class="mergeBtn">▲ 승급<br><small>'+TN[u.t+1]+' 등급으로</small></button>':'')+(G.selMore&&u.t<4?'<button id="bL" style="background:'+(c.lk?'#3d6fb0':'#55607a')+'">'+(c.lk?'🔓 잠금 해제':(u.t===3?'🔒 재료 잠금':'🔒 승급 잠금'))+(u.t===3&&!c.lk?'<br><small>우주 조합에 안 씀</small>':'')+'</button>':'')+
      '<button id="bO" style="background:#2f5f8a">🛰️ 보관<br><small>이 종류 계속</small></button>'+(G.selMore?'<button id="bP" style="background:'+(c.pin?'#b07a1a':'#55607a')+'">'+(c.pin?'📌 고정 해제':'📌 출전 고정')+'</button>':'')+'<button id="bS" style="background:#7a5234">판매 '+(u.t===0?'🪙10':'🍀'+Math.round((u.t===4?SELL4:u.t)*(A('refund')?1.5:1)))+(c.k>1?'<br><small>1명</small>':'')+'</button><button id="bMore" style="background:#3a3a4a;font-size:12px">'+(G.selMore?'▴ 접기':'⋯ 추가 관리'+(c.lk||c.pin?' ●':''))+'</button></div>';
    if($('selX'))$('selX').onclick=e=>{e.stopPropagation();G.sel=null;refresh()};if($('bM'))$('bM').onclick=merge;if($('bL'))$('bL').onclick=()=>{c.lk=!c.lk;toast(c.lk?(U[c.u].t===3?'🔒 잠금 — 우주 조합 재료로 쓰지 않아요':'🔒 승급 잠금 — 일괄 승급에서도 빠져요'):'🔓 잠금 해제');refresh()};if($('bS'))$('bS').onclick=sell;if($('bO'))$('bO').onclick=()=>{autoSet(c.u,true);G.sel=null;synTick();refresh()};if($('bP'))$('bP').onclick=()=>{c.pin=!c.pin;toast(c.pin?'📌 출전 고정 — 일괄 보관에서 빠져요':'📌 고정 해제');refresh()};if($('bMore'))$('bMore').onclick=()=>{G.selMore=!G.selMore;refresh()};if($('bU'))$('bU').onclick=()=>upgradeK(c.u)
  }
  const sh=$('sheet');if(!sheet){sh.style.display='none';return}
  sh.style.display='block';const body=$('sheetBody'),X='<button id="x">✕</button></h3>';
  if(sheet==='myth'){
    body.innerHTML='<h3><span>✦ 우주 조합'+helpBtn('myth')+'</span><small style="margin-left:auto;margin-right:8px;color:#ffd96a">🪙'+craftCost()+'</small>'+X+'<div id="myth"></div>';G.__gH=0;
    const ord=Object.keys(RECIPE).filter(m=>plIn().includes(U[m].planet)).map(m=>[m,rcp(m).filter(id=>hasUnit(id)).length,rcp(m).length]).sort((a,b)=>onPath(b[0])-onPath(a[0])||canCraft(b[0])-canCraft(a[0])||b[1]/b[2]-a[1]/a[2]);
    for(const[m,have,need]of ord){const ok=canCraft(m),b=document.createElement('button'),pl=U[m].planet;
      b.className='mr'+(ok?' ok':'');
      b.innerHTML='<div class="mh">'+ic(m)+'<span class="mn"><b>'+U[m].n+'</b><small>'+pic(pl)+PLANETS[pl]+' 우주 히어로 · '+clsTag(m)+(ROLE[m]?' · '+roleTag(m):'')+'</small>'+(have===need?'<small class="sd">'+synDelta(m,rcp(m))+'</small>':'')+'</span><span class="mp'+(have===need?' full':'')+'">'+have+' / '+need+'</span></div><div class="mi">'+
        rcp(m).map(id=>{const h=hasUnit(id);return '<span class="ing'+(h?' h':'')+'">'+ic(id)+'<em>'+TN[U[id].t]+'</em>'+U[id].n+'<i>'+(h?(fieldUnits(id)?'✓ 있음':'✓ 🛰️대기소'):'필요')+'</i></span>'}).join('')+'</div>'+(ok&&!matsOK(rcp(m),m)?'<div class="go pr">✦ 조합하기 <small>🪙'+craftCost()+' · 🛡 목표 재료 포함 — 두 번 눌러 확인</small></div>':ok?'<div class="go">✦ 조합하기 <small>🪙'+craftCost()+'</small></div>':canCraft(m,1)?'<div class="go no">🪙'+craftCost()+' 필요 · '+(craftCost()-Math.floor(G.coins))+' 부족</div>':'');
      {const gb=document.createElement('span');gb.className='gB'+(G.goal===m?' on':'');gb.textContent=G.goal===m?'🎯 목표 해제':'🎯 목표로';gb.onclick=e=>{e.stopPropagation();G.goal=G.goal===m?null:m;toast(G.goal?'🎯 목표: '+U[m].n+' — 재료를 필요한 만큼 지켜요':'🎯 목표 해제');refresh()};b.querySelector('.mh').appendChild(gb);if(!G.__gH){G.__gH=1;gb.insertAdjacentHTML('afterend',helpBtn('goal'))}if(G.goal===m)b.insertAdjacentHTML('beforeend',goalShort())}
      b.onclick=()=>{craft(m);refresh()};$('myth').appendChild(b)}
    {const h=document.createElement('div');h.className='fuhd';h.innerHTML='✨ <b>특수 조합</b> <small>🪙'+fuseCost()+'</small>';$('myth').appendChild(h);
     for(const id of Object.keys(FUSION).filter(fuAvail)){const f=FUSION[id],ready=fuseReady(id),ok=canFuse(id),art=!!U[id],b=document.createElement('button');b.className='mr fu'+(ok?' ok':'');
      b.innerHTML='<div class="mh">'+(art?ic(id):'✨')+'<span class="mn"><b>'+f.n+'</b><small>특수조합 · '+clsTag(id)+(ROLE[id]?' · '+roleTag(id):'')+'</small>'+(ready?'<small class="sd">'+synDelta(id,f.mat)+'</small>':'')+'</span><span class="mp'+(ready?' full':'')+'">'+f.mat.filter(k=>owned(k)>0).length+' / '+f.mat.length+'</span></div><div class="mi">'+f.mat.map(k=>{const h=owned(k)>0,nm=U[k]?U[k].n:FUSION[k]?FUSION[k].n:k;return '<span class="ing'+(h?' h':'')+'">'+(U[k]?ic(k):'✨')+'<em>우주</em>'+nm+'<i>'+(h?'✓ 있음':'필요')+'</i></span>'}).join('')+'</div>'+(!art?'<div class="go no">그림 준비 중</div>':ok&&!matsOK(f.mat,id)?'<div class="go pr">✦ 특수 조합하기 <small>🪙'+fuseCost()+' · 🛡 목표 재료 포함 — 두 번 눌러 확인</small></div>':ok?'<div class="go">✦ 특수 조합하기 <small>🪙'+fuseCost()+'</small></div>':ready?'<div class="go no">🪙'+fuseCost()+' 필요 · '+(fuseCost()-Math.floor(G.coins))+' 부족</div>':'');
      if(art){const gb=document.createElement('span');gb.className='gB'+(G.goal===id?' on':'');gb.textContent=G.goal===id?'🎯 목표 해제':'🎯 목표로';gb.onclick=e=>{e.stopPropagation();G.goal=G.goal===id?null:id;toast(G.goal?'🎯 목표: '+U[id].n+' — 재료를 필요한 만큼 지켜요':'🎯 목표 해제');refresh()};b.querySelector('.mh').appendChild(gb);if(G.goal===id)b.insertAdjacentHTML('beforeend',goalShort())}
      b.onclick=()=>{if(art)fuse(id)};$('myth').appendChild(b)}}
  }else if(sheet==='gam'){
    G.lotX=G.lotX||1;const n=G.lotX;body.innerHTML='<h3><span>🎫 복권'+helpBtn('gam')+'</span>'+X+'</h3><div class="lotOne"><div class="lotSeg"><button data-x="1" class="'+(n===1?'on':'')+'">1장</button><button data-x="10" class="'+(n===10?'on':'')+'">10장</button></div><button id="gLot">🎫 '+n+'장 긁기 <b>🍀'+lotCost()*n+'</b><small>코인(당첨금 🪙'+lotPrize()+' 기준 최대 20배) · 영웅(동네·나라·행성) · 행운석</small></button></div>';
    body.querySelectorAll('.lotSeg button').forEach(b=>b.onclick=()=>{G.lotX=+b.dataset.x;sheet=null;openSheet('gam')});$('gLot').onclick=()=>{if(G.lotX===10)buyLot10();else buyLot()}
  }else{
    const o=odds(),l=G.luck,mx=l>=LUCK_MAX,o2=mx?o:oddsAt(l+1),pc=v=>v<10?v.toFixed(2):v.toFixed(1),xf=v=>v<100?v.toFixed(1):fmt(v);
    body.innerHTML='<h3><span>⬆ 강화'+helpBtn('up')+'</span>'+X+
     '<button id="u3" class="upc" data-hk="u3"><span class="ut">🍀 소환 확률 <b>Lv.'+l+(mx?' (최대)':' → '+(l+1))+'</b></span><span class="ud">행성 등급 '+pc(o[3])+'%'+(mx?'':' → <b>'+pc(o2[3])+'%</b>')+' · 나라 '+pc(o[2])+'%'+(mx?'':' → <b>'+pc(o2[2])+'%</b>')+'</span><span class="uc">'+(mx?'최대':'🪙'+upCost(3))+'</span>'+(!mx&&G.coins<upCost(3)?'<span class="ur">🪙 '+(upCost(3)-Math.floor(G.coins))+' 부족</span>':'')+'</button>'+
     '<div class="uph">행성 강화</div><div id="planetUp" class="upg"></div>';
    for(const p of plIn()){const st=upPlState(p),b=document.createElement('button');b.className='upc';
      b.innerHTML='<span class="ut">'+pic(p)+PLANETS[p]+' <b>Lv.'+st.lv+'</b></span><span class="ud">×'+xf(upM(st.lv,.6))+' → <b>×'+xf(upM(st.lv+1,.6))+'</b> · '+st.n+'명</span><span class="uc">'+(st.key?'🪙'+st.cost:'')+'</span>'+(st.why?'<span class="ur">'+st.why+'</span>':'');
      b.disabled=!!st.why;if(st.key){b.dataset.hk='k:'+st.key;b.onclick=()=>upgradeK(st.key)}$('planetUp').appendChild(b)}
    $('u3').onclick=()=>upgrade(3)
  }
  $('x').onclick=()=>{if(HOLD.k)holdStop();sheet=null;refresh()};
  hud()
}
// v308: 도움말 — 설명은 상시 나열하지 않고 ⓘ(터치 44px)를 눌렀을 때만. 하나만 열림, 바깥 탭·✕로 닫힘, 닫는 탭은 뒤 버튼으로 안 넘어감, 좁은 화면은 아래 시트
const HELP={
 up:{t:'⬆ 강화',L:['<b>행성 강화</b>: 그 행성 영웅 전체(우주 포함) 공격력이 올라요. 1강당 +60%, 10강부터는 매 강 ×1.07씩 복리','<b>특수 조합</b>은 따로 강화하지 않아요. 재료 행성들의 강화 레벨 평균을 그대로 따라가요(실제 레벨은 영웅을 누르면 보여요)','<b>소환 확률 강화</b>: 높은 등급이 나올 확률이 올라가요','버튼을 <b>꾹 누르면 연속 강화</b> — 0.4초 뒤부터 계속, 손을 떼면 바로 멈춤'],ex:'예) 지구 Lv.2 → 제욱스·볼트란 등 지구 영웅 모두 ×2.2. 아스트라온(제욱스+아르케온)은 지구·재료 행성 평균 레벨을 따라감'},
 myth:{t:'✦ 조합',L:['<b>우주 조합</b>: 같은 행성 영웅을 등급마다 1명씩 모으면 우주 히어로 1명. 재료는 1명씩만 빠지고, 할수록 비용이 올라요','<b>특수 조합</b>: 서로 다른 행성의 우주 히어로끼리 합쳐 최상위 영웅','재료는 <b>전장 + 대기소</b>를 합쳐서 세요','같은 우주·특수 조합 영웅은 자동으로 한 칸에 <b>겹쳐요</b> (겹칠수록 공격력·속도↑)','<b>🎯 목표로</b>: 목표까지 필요한 재료(하위 재료 포함)를 일괄 승급·다른 조합에서 지켜요. 완성해도 목표는 유지돼서 다음 것을 또 모아요'],ex:'🛡 표시 = 목표 재료가 들어가는 조합. 한 번 더 누르면 그래도 조합해요'},
 goal:{t:'🎯 목표와 재료 보호',L:['목표 하나를 고르면 그 영웅까지 가는 전체 경로의 재료를 필요한 수만큼 지켜요','지켜진 재료는 일괄 승급·다른 조합에 안 쓰여요. 남는 수량은 자유롭게 쓰여요','직접 쓰려고 하면 한 번 알려 주고, 다시 누르면 허용','목표를 다시 누르면 해제'],ex:'예) 시운 목표 → 크로넬·루네트·벨카온과 그 재료까지 1세트분 보호'},
 orb:{t:'🛰️ 궤도 대기소',L:['보관한 영웅은 <b>싸우지 않고</b> 오라·시너지도 주지 않아요','승급·조합 <b>재료로는 그대로</b> 쓰여요(꺼낼 필요 없음)','<b>보관</b>을 누르면 그 종류는 앞으로 얻을 때도 자동으로 대기소로 가요 — 여기서 <b>자동 보관 OFF</b>로 끄기','<b>출전 1</b>: 1명을 전장으로. 꺼내도 자동 보관 설정은 그대로','<b>다음 판에도 유지</b>를 켜면 자동 보관 종류가 다음 판에도 이어져요','<b>일괄 보관</b>: 고른 등급 이하를 한 번에(📌 출전 고정한 칸은 빠짐 — 영웅 누르고 ⋯ 추가 관리)'],ex:'개수 제한 없음 · 같은 영웅은 ×수량으로 묶여 보여요'},
 gam:{t:'🎫 복권',L:['행운석으로 긁어요. 코인(당첨금 기준 최대 20배)·행운석·영웅(동네·나라·행성)이 나와요','영웅 자리가 없으면 코인으로 바뀌어요','10장은 한 번에 결과만 보여 줘요']}};
function helpBtn(k){return '<button class="hI" data-help="'+k+'" aria-label="도움말" type="button"></button>'}
function helpOpen(k,anchor){const H=HELP[k];if(!H)return;let P=$('helpPop');if(!P){P=document.createElement('div');P.id='helpPop';document.body.appendChild(P)}
  P.innerHTML='<button class="hx" data-hx="1" aria-label="닫기">✕</button><h4>'+H.t+'</h4><ul>'+H.L.map(x=>'<li>'+x+'</li>').join('')+'</ul>'+(H.ex?'<div class="ex">'+H.ex+'</div>':'');
  P.style.display='block';P.classList.remove('sheet');P.dataset.k=k;const vw=innerWidth,vh=innerHeight;
  if(vw<400||!anchor){P.classList.add('sheet');P.style.top='';P.style.left='0px';return}
  const r=anchor.getBoundingClientRect(),w=P.offsetWidth,h=P.offsetHeight;let x=Math.min(vw-w-12,Math.max(12,r.left+r.width/2-w/2)),y=r.bottom+6;if(y+h>vh-12)y=Math.max(12,r.top-h-6);P.style.left=x+'px';P.style.top=y+'px'}
function helpClose(){const P=$('helpPop');if(P)P.style.display='none'}
(function(){let swallow=0;
  document.addEventListener('pointerdown',e=>{const P=$('helpPop');const open=P&&P.style.display==='block';const hb=e.target.closest&&e.target.closest('.hI');
    if(hb){e.stopPropagation();return}
    if(open&&!P.contains(e.target)){helpClose();swallow=1;e.stopPropagation();e.preventDefault()}},true);
  document.addEventListener('click',e=>{const hb=e.target.closest&&e.target.closest('.hI');if(hb){e.stopPropagation();e.preventDefault();const P=$('helpPop');if(P&&P.style.display==='block'&&P.dataset.k===hb.dataset.help)helpClose();else helpOpen(hb.dataset.help,hb);return}
    if(e.target.closest&&e.target.closest('[data-hx]')){e.stopPropagation();helpClose();return}
    if(swallow){swallow=0;e.stopPropagation();e.preventDefault()}},true)})();
// 길게 누르기 안내: 강화 버튼을 짧게 연달아 3번 누르면(배운 적 없을 때) 버튼 위 말풍선 2.6초, 판당 1번. 연속 강화를 한 번 쓰면 SAVE.hkL=1 → 다시 안 뜸
function hkTipCheck(b){if(SAVE.hkL||!b)return;const t=performance.now();G.hkTaps=(G.hkTaps||[]).filter(x=>t-x<2500);G.hkTaps.push(t);if(G.hkTaps.length<3||G.hkTipShown)return;G.hkTipShown=1;let T=$('hkTip');if(!T){T=document.createElement('div');T.id='hkTip';document.body.appendChild(T)}
  T.textContent='꾹 누르면 연속 강화';T.style.display='block';const r=b.getBoundingClientRect(),w=T.offsetWidth,x=Math.min(innerWidth-w-8,Math.max(8,r.left+r.width/2-w/2));T.style.left=x+'px';T.style.top=Math.max(8,r.top-T.offsetHeight-10)+'px';T.style.setProperty('--ax',(r.left+r.width/2-x)+'px');clearTimeout(T.__t);T.__t=setTimeout(()=>T.style.display='none',2600)}
function hkMark(cls){const sb=$('sheetBody');if(!sb)return;sb.querySelectorAll('.hkCh,.hkRep').forEach(x=>x.classList.remove('hkCh','hkRep'));if(cls&&HOLD.k){const b=sb.querySelector('[data-hk="'+HOLD.k+'"]');if(b)b.classList.add(cls)}}
const PERF={a:17,n:0};
// 강화 버튼 길게 누르기: 짧게=1회(click), HOLD_DELAY 뒤부터 HOLD_RATE회/초 반복. 손 떼기·밖으로 이동·취소·화면 전환·재화 부족·최대 강화면 즉시 중단
const HOLD_DELAY=400,HOLD_RATE=4.5;const HOLD={k:null,t0:null,iv:null,n:0,sup:0};
function holdAct(k){if(!G||G.over)return false;const c0=G.coins,l0=JSON.stringify([G.luck,G.tile,G.upPlanet,G.fuLv]);
  if(k==='u3')upgrade(3);else if(k==='u4')upgradeTile();else if(k.startsWith('k:'))upgradeK(k.slice(2));else if(k.startsWith('f:'))fuUp(k.slice(2));
  return G.coins!==c0||JSON.stringify([G.luck,G.tile,G.upPlanet,G.fuLv])!==l0}
function holdStop(){try{hkMark(null)}catch(e){}clearTimeout(HOLD.t0);clearInterval(HOLD.iv);HOLD.t0=HOLD.iv=null;if(HOLD.n>0)HOLD.sup=1;HOLD.k=null;HOLD.n=0}
function holdInit(){const sb=$('sheetBody');if(!sb||sb.__hold)return;sb.__hold=1;sb.addEventListener('contextmenu',e=>{if(e.target.closest('[data-hk]'))e.preventDefault()});
  sb.addEventListener('pointerdown',e=>{const b=e.target.closest('[data-hk]');if(!b||b.disabled)return;holdStop();HOLD.sup=0;HOLD.k=b.dataset.hk;b.classList.add('hkCh');
    HOLD.t0=setTimeout(()=>{hkMark('hkRep');HOLD.iv=setInterval(()=>{if(!HOLD.k||!sheet||G.pause){holdStop();return}if(!holdAct(HOLD.k)){holdStop();return}HOLD.n++;hkMark('hkRep');if(HOLD.n>=2&&!SAVE.hkL){SAVE.hkL=1;saveAll()}},1000/HOLD_RATE);if(holdAct(HOLD.k)){HOLD.n++;hkMark('hkRep')}else holdStop()},HOLD_DELAY)});
  sb.addEventListener('click',e=>{const b=e.target.closest('[data-hk]');if(b&&!HOLD.sup)hkTipCheck(b)});
  // 길게 누른 뒤 손을 떼며 생기는 click은 한 번 무시
  sb.addEventListener('click',e=>{if(HOLD.sup&&e.target.closest('[data-hk]')){e.stopPropagation();e.preventDefault();HOLD.sup=0}},true);
  const stop=()=>{if(HOLD.k)holdStop()};
  document.addEventListener('pointerup',stop);document.addEventListener('pointercancel',stop);window.addEventListener('blur',stop);document.addEventListener('visibilitychange',stop);
  document.addEventListener('pointermove',e=>{if(!HOLD.k)return;const el=document.elementFromPoint(e.clientX,e.clientY),b=el&&el.closest&&el.closest('[data-hk]');if(!b||b.dataset.hk!==HOLD.k)holdStop()})}
// 오류가 나도 게임이 멈추지 않게: 기록하고 같은 오류는 한 번만 알림
const __ERR={};function repErr(e,w){const k=(w||'')+':'+(e&&e.message);if(__ERR[k])return;__ERR[k]=1;console.error(w,e);try{(SAVE.errLog=SAVE.errLog||[]).push(new Date().toISOString().slice(5,16)+' w'+(G&&G.wave)+' '+k+' @'+((e&&e.stack||'').split('\n')[1]||'').trim().slice(0,80));SAVE.errLog=SAVE.errLog.slice(-20);saveAll()}catch(_){}try{toast('⚠ 오류 '+k.slice(0,60))}catch(_){}}
function loop(ts){
  if(!running)return;
  let dt=Math.min(.05,(ts-last)/1000);last=ts;
  try{if(G.hs>0){G.hs-=dt;update(dt*.12)}else for(let i=0;i<speed&&!G.over;i++)update(dt)}catch(e){repErr(e,'update')}
  if(G.__dirty){G.__dirty=0;try{if(cx.reset)cx.reset();cx.setTransform(dpr,0,0,dpr,0,0);cx.imageSmoothingQuality='medium'}catch(_){}}
  try{draw()}catch(e){repErr(e,'draw');G.__dirty=1}try{if(!G.over)hud()}catch(e){repErr(e,'hud')}
  // 느린 기기: 프레임이 계속 밀리면 화면 해상도를 한 단계씩 낮춤
  {const fr=dt*1000;PERF.a=PERF.a*.97+fr*.03;if(++PERF.n>120&&PERF.a>26&&dpr>1){dpr=Math.max(1,dpr-.5);PERF.n=0;PERF.a=17;layout()}}
  requestAnimationFrame(loop)
}
const TEST_START=false; // 테스트 기간: 시작 시 모든 캐릭터 1명씩 배치
function start(){buildBY();$('bSnd').style.display='';$('bMenu').style.display='block';$('gmenu').style.display='none';SND.bg(false,0);$('over').style.display='none';$('boon').style.display='none';$('augL').style.display='none';$('synL').style.display='none';reset();orbInit();storyInit();storyStart();$('orbP').style.display='none';augUI();G.synK='';synTick();['sk0','sk1'].forEach(id=>$(id).dataset.k='');if(TEST_START){Object.keys(U).sort((a,b)=>U[b].t-U[a].t).forEach((k,i)=>{G.cells[[12,7,17,11,13,6,8,16,18][i]??i]={u:k,n:1,cd:0,b:0,pop:.25,ax:0,ay:0,sc:SP[k]?SP[k].cd:0}});refresh()}running=true;last=performance.now();requestAnimationFrame(loop);TIP.last=performance.now()-4000;TIP.cur=null;tipHide()}

tempArt();bake();
$('mLog').onclick=()=>logbook();$('bAll').onclick=mergeAll;$('bBty').onclick=pqOpen;$('bSnd').onclick=e=>{SND.cycle();sndBtn();toast(['🔊 소리 켜짐','🎵 배경음악 끔 (효과음만)','🔇 소리 끔'][SND.mode()])};sndBtn();$('rcp').onclick=()=>openSheet('myth');$('bCraft').onclick=e=>{const B=$('bCraft'),ac=e.target.closest('[data-a]');if(ac){const a=ac.dataset.a;if(a==='open')B.__open=1;else if(a==='close')B.__open=0;else if(a==='hide'){B.__hid=1;B.__open=0}B.dataset.k='';refresh();return}const bt=e.target.closest('.cOpt');if(!bt)return;const o=($('bCraft').__L||[])[+bt.dataset.j];if(!o)return;if(o.t==='m'){if(canCraft(o.id))craft(o.id)}else if(o.t==='f'){if(canFuse(o.id))fuse(o.id)}else{const A=G.cells[o.a],B=G.cells[o.b];if(A&&B&&A.u===o.id&&B.u===o.id)concDo(o.a,o.b)}$('bCraft').dataset.k='';refresh()};lotInit();$('bMyth').onclick=()=>openSheet('myth');$('bGam').onclick=()=>openSheet('gam');$('bUp').onclick=()=>openSheet('up');
$('summon').onclick=summon;$('bMenu').onclick=()=>{if(!G||G.over)return;G.menu=true;$('gmenu').style.display='flex'};$('gmGo').onclick=()=>{G.menu=false;$('gmenu').style.display='none'};
$('gmRe').onclick=()=>{$('gmenu').style.display='none';if(G)G.menu=false;start()};$('gmHome').onclick=()=>{$('gmenu').style.display='none';if(G){G.menu=false;G.over=true}running=false;$('boon').style.display='none';$('lot').style.display='none';showMain('home')};$('skA').onclick=()=>{SAVE.skAuto=!SAVE.skAuto;saveAll();skAutoBtn();toast(SAVE.skAuto?'🤖 스킬 자동 발사 ON':'스킬 자동 발사 OFF')};$('sk0').onclick=()=>useSk(0);$('sk1').onclick=()=>useSk(1);$('augS').onclick=()=>{$('augL').style.display='block'};$('msn').onclick=()=>{if(G&&(G.augL||[]).length)$('augL').style.display='block'};$('synS').onclick=()=>{synList();$('synL').style.display='block'};$('synL').onclick=()=>{$('synL').style.display='none'};$('augL').onclick=()=>{$('augL').style.display='none'};
$('speed').onclick=()=>{speed=speed%5+1;$('speed').textContent='x'+speed};
$('start').onclick=start;
// ---------- 메인 페이지 / 내 캐릭터 ----------
const SAVE_KEY='umd_save';let SAVE={lv:{},kills:{},frag:{},boxes:0,games:0,best:0};
try{const r=localStorage.getItem(SAVE_KEY);if(r)Object.assign(SAVE,JSON.parse(r))}catch(e){}
function saveClean(){for(const f of ['lv','frag','kills'])if(SAVE[f]){delete SAVE[f].cheongram;if(SAVE[f].white_tiger!=null){SAVE[f].mugyeom=Math.max(SAVE[f].mugyeom||0,SAVE[f].white_tiger);delete SAVE[f].white_tiger}}}saveClean();
if(!SAVE.c293){SAVE.c293=1;if((SAVE.best||0)>=51){SAVE.boxes=(SAVE.boxes||0)+20;setTimeout(()=>{try{toast('🎁 지형 변화 버그 보상: 랜덤박스 20개!');saveAll()}catch(e){}},2500)}}
const LOCKP={lumiel:{w:100,x:'100웨이브 돌파'},drakanis:{g:3,x:'3판 이상 플레이'},biikseong:{w:110,x:'110웨이브 돌파'},seolryeong:{g:5,x:'5판 이상 플레이'},haeyeon:{g:7,x:'7판 이상 플레이'}},PL_MAX=7;
const UNLOCK_ALL=['pwj0906']; // 이 계정은 잠긴 행성을 처음부터 열어 줌
function plUnlocked(p){const L=LOCKP[p];return !L||(L.w!=null&&(SAVE.best||0)>L.w)||(L.g!=null&&(SAVE.games||0)>=L.g)||!!(typeof AC!=='undefined'&&AC&&AC.s&&UNLOCK_ALL.includes(AC.s.id))}
function heroLocked(k){return !!(U[k]&&!plUnlocked(U[k].planet))}
function plAll(){return Object.keys(PLANETS).filter(p=>p!=='fusion'&&Object.keys(U).some(k=>U[k].planet===p))}
function plAvail(){return plAll().filter(plUnlocked)}
function plIn(){const av=plAvail(),need=Math.min(PL_MAX,av.length);let a=(SAVE.pl||[]).filter(p=>av.includes(p));if(a.length!==need)a=plRec();return a}
// 추천 편성: 해금된 행성 중 7개 조합을 전부 따져, 만들 수 있는 특수 조합 수 → 전투 계열 다양성 순으로 가장 좋은 것
function plRec(){const av=plAvail(),need=Math.min(PL_MAX,av.length);if(plRec.k===av.join())return plRec.v.slice();let best=null,bs=-1;const fus=Object.keys(FUSION).filter(id=>U[id]);
  const rec=(st,pick)=>{if(pick.length===need){const fn=fus.filter(id=>fuBase(id).every(k=>pick.includes(U[k].planet))).length,cl=new Set(Object.keys(HCLS).filter(k=>U[k]&&!U[k].fu&&!U[k].hidden&&pick.includes(U[k].planet)).map(k=>HCLS[k])).size,sc=fn*10+cl;if(sc>bs){bs=sc;best=pick.slice()}return}for(let i=st;i<av.length;i++){pick.push(av[i]);rec(i+1,pick);pick.pop()}};
  rec(0,[]);plRec.k=av.join();plRec.v=best||av.slice(0,need);return plRec.v.slice()}
function buildBY(){const on=plIn();for(let t=0;t<4;t++){const a=Object.keys(U).filter(k=>U[k].t===t&&!(NO_HOME&&t===0)&&on.includes(U[k].planet)&&(!TEST_ONLY||TEST_ONLY.includes(k)));BY[t].splice(0,BY[t].length,...a)}}
SAVE.sk=SAVE.sk||{meteor:1};SAVE.skEq=(SAVE.skEq||['meteor']).filter(k=>USK[k]&&SAVE.sk[k]).slice(0,2);SAVE.skPity=SAVE.skPity||0;
// ---------- 랭킹 (artifact db: rank/<viewer id>, 각자 자기 기록만 씀) ----------
const RK={db:null,us:null,uid:null,name:'',canW:null,best:null,list:null,err:''};
// 공개 배포판(claude.ai 밖)용 랭킹: Supabase. 기기마다 무작위 id·비밀값을 만들어 자기 기록만 갱신.
const SB_URL='https://loegtuubjzsfkexehuvn.supabase.co',SB_KEY='sb_publishable_4vh1i_31bEHbOecl8vxEug_GGtA6Y6a';
function sbId(){let p,s;try{p=localStorage.getItem('rhd_pid');s=localStorage.getItem('rhd_sec')}catch(e){}if(!p||!s){const r=()=>(crypto.randomUUID?crypto.randomUUID():Math.random().toString(36).slice(2)+Date.now().toString(36)+Math.random().toString(36).slice(2)).replace(/-/g,'');p='p'+r().slice(0,20);s=r()+r();try{localStorage.setItem('rhd_pid',p);localStorage.setItem('rhd_sec',s)}catch(e){}}return [p,s]}
async function sbReq(path,opt){const r=await fetch(SB_URL+'/rest/v1/'+path,Object.assign({headers:{apikey:SB_KEY,'Content-Type':'application/json'}},opt||{}));if(!r.ok)throw {code:r.status===401||r.status===403?'invalid_argument':'unavailable',status:r.status};const t=await r.text();return t?JSON.parse(t):null}
function sbDb(pid,sec){const row=d=>({w:d.w,k:d.k,t:d.t,nick:d.nick,g:d.g});
  return {doc:p=>{const id=p.split('/')[1];return{
    get:async()=>{const a=await sbReq('rank?select=pid,nick,w,k,t,g&pid=eq.'+encodeURIComponent(id));return{exists:!!(a&&a.length),data:()=>a&&a[0]&&row(a[0]),id}},
    set:async d=>{await sbReq('rpc/submit_score',{method:'POST',body:JSON.stringify({p_pid:pid,p_secret:sec,p_nick:d.nick||'',p_w:d.w|0,p_k:d.k|0,p_t:Math.round(d.t||0)})})},
    update:async d=>{if(d.nick!=null)await sbReq('rpc/set_nick',{method:'POST',body:JSON.stringify({p_pid:pid,p_secret:sec,p_nick:d.nick})})}}},
   collection:()=>{const q={orderBy:()=>q,limit:()=>q,get:async()=>{const a=await sbReq('rank?select=pid,nick,w,k,t,g&order=w.desc,k.desc&limit=200');return{docs:(a||[]).map(r=>({id:r.pid,data:()=>row(r)}))}}};return q}}}
if(!(window.claude&&window.claude.use)&&SB_URL&&typeof fetch!=='undefined'){const[p,s0]=sbId();RK.db=sbDb(p,s0);RK.uid=p;RK.sb=1;setTimeout(()=>rkFetch().catch(()=>{}),1500)}
// ---------- 계정(공개 배포판): 아이디·비밀번호 → Supabase Auth. 진행 상황(SAVE)을 saves 표에 저장 ----------
var AC={s:null,err:0};const AC_DOM='@player.rhd.app';
function acLoad(){try{AC.s=JSON.parse(localStorage.getItem('rhd_auth')||'null')}catch(e){AC.s=null}}
function acStore(){try{if(AC.s)localStorage.setItem('rhd_auth',JSON.stringify(AC.s));else localStorage.removeItem('rhd_auth')}catch(e){}}
function acPid(){return 'u'+AC.s.uid.replace(/-/g,'').slice(0,20)}
async function acAuth(path,body){const r=await fetch(SB_URL+'/auth/v1/'+path,{method:'POST',headers:{apikey:SB_KEY,'Content-Type':'application/json'},body:JSON.stringify(body)});const j=await r.json().catch(()=>({}));if(!r.ok)throw j;return j}
function acSet(j,id){AC.s={id:id||(AC.s&&AC.s.id),uid:j.user.id,at:j.access_token,rt:j.refresh_token,exp:Date.now()+((j.expires_in||3600)-120)*1000};acStore()}
async function acTok(){if(!AC.s)return null;if(Date.now()>AC.s.exp){try{acSet(await acAuth('token?grant_type=refresh_token',{refresh_token:AC.s.rt}))}catch(e){return null}}return AC.s.at}
async function acReq(path,opt){const t=await acTok();if(!t)throw {code:'auth'};opt=opt||{};const r=await fetch(SB_URL+'/rest/v1/'+path,Object.assign({},opt,{keepalive:true,headers:Object.assign({apikey:SB_KEY,Authorization:'Bearer '+t,'Content-Type':'application/json'},opt.headers||{})}));if(!r.ok)throw {status:r.status};const x=await r.text();return x?JSON.parse(x):null}
async function acPull(){const a=await acReq('saves?select=data&user_id=eq.'+AC.s.uid);return a&&a[0]?a[0].data:null}
let acTm=null;
function acPush(now){if(!AC.s)return;clearTimeout(acTm);const go=async()=>{try{await acReq('saves',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({user_id:AC.s.uid,data:SAVE,updated_at:new Date().toISOString()})});AC.err=0}catch(e){AC.err=1}acUI()};if(now)return go();acTm=setTimeout(go,1200)}
function acMerge(a,b){const o=Object.assign({},b,a),mx=k=>Math.max(a[k]||0,b[k]||0);['best','games','boxes','skPity'].forEach(k=>o[k]=mx(k));{const ra=a.rec||{},rb=b.rec||{};o.rec={};for(const k of new Set([...Object.keys(ra),...Object.keys(rb)]))o.rec[k]=Math.max(ra[k]||0,rb[k]||0)}
  o.lv={};o.frag={};for(const k of new Set([...Object.keys(a.lv||{}),...Object.keys(b.lv||{}),...Object.keys(a.frag||{}),...Object.keys(b.frag||{})])){const la=(a.lv||{})[k]||1,lb=(b.lv||{})[k]||1,fa=(a.frag||{})[k]||0,fb=(b.frag||{})[k]||0,useA=la>lb||(la===lb&&fa>=fb);o.lv[k]=useA?la:lb;o.frag[k]=useA?fa:fb}
  o.kills={};for(const k of new Set([...Object.keys(a.kills||{}),...Object.keys(b.kills||{})]))o.kills[k]=Math.max((a.kills||{})[k]||0,(b.kills||{})[k]||0);
  o.sk=Object.assign({},b.sk||{},a.sk||{});o.skEq=(a.skEq&&a.skEq.length?a.skEq:b.skEq)||['meteor'];o.pl=a.pl||b.pl;o.nick=a.nick||b.nick;o.story=storyMerge(a.story,b.story);return o}
const AC_PROG=['lv','kills','frag','boxes','games','best','sk','skEq','skPity','pl','plNew','nick','acct','story','rec'];
function acReplace(d){const keep={};for(const k of Object.keys(SAVE))if(!AC_PROG.includes(k))keep[k]=SAVE[k];for(const k of Object.keys(SAVE))delete SAVE[k];Object.assign(SAVE,keep,{lv:{},kills:{},frag:{},boxes:0,games:0,best:0},d||{});SAVE.sk=SAVE.sk||{meteor:1};SAVE.skEq=(SAVE.skEq||['meteor']).filter(k=>USK[k]&&SAVE.sk[k]).slice(0,2);SAVE.skPity=SAVE.skPity||0;saveClean()}
function acErr(e,su){const c=e&&(e.error_code||e.code||''),m=String(e&&(e.msg||e.message||e.error_description||e.error)||'');
  if(c==='user_already_exists'||/already/i.test(m))return '이미 있는 아이디예요';if(c==='invalid_credentials'||/invalid login/i.test(m))return '아이디나 비밀번호가 틀렸어요';if(c==='weak_password'||/password/i.test(m))return '비밀번호가 너무 약해요 (6자 이상)';if(c==='email_not_confirmed')return '계정 확인 설정이 켜져 있어요 (게임 주인이 꺼야 해요)';if(c==='over_request_rate_limit'||/rate/i.test(m))return '잠시 후 다시 시도해 주세요';if(/signup.*disabled/i.test(m))return '지금은 가입이 막혀 있어요';return (su?'가입':'로그인')+'하지 못했어요'+(m?' ('+m.slice(0,60)+')':'')}
async function acLogin(id,pw,su){id=String(id||'').trim().toLowerCase();if(!/^[a-z0-9_]{3,16}$/.test(id))throw '아이디는 영문 소문자·숫자·_ 3~16자로 정해 주세요';if(String(pw||'').length<6)throw '비밀번호는 6자 이상이어야 해요';
  let j;try{j=await acAuth(su?'signup':'token?grant_type=password',{email:id+AC_DOM,password:pw})}catch(e){throw acErr(e,su)}
  if(!j.access_token)throw '가입은 됐는데 바로 로그인이 안 돼요 (Supabase에서 이메일 확인을 꺼야 해요)';
  acSet(j,id);let srv=null;try{srv=await acPull()}catch(e){AC.err=1}
  if(srv){if(SAVE.acct&&SAVE.acct!==AC.s.uid)acReplace(srv);else acReplace(acMerge(srv,SAVE))}else if(SAVE.acct&&SAVE.acct!==AC.s.uid)acReplace({});
  SAVE.acct=AC.s.uid;if(!SAVE.nick)SAVE.nick=id;RK.uid=acPid();RK.bestW=0;try{localStorage.setItem(SAVE_KEY,JSON.stringify(SAVE))}catch(e){}await acPush(true);return su}
function acLogout(){acPush(true);AC.s=null;acStore();acReplace({});saveAll();RK.uid=sbId()[0];RK.bestW=0}
async function acBoot(){if(!AC.s)return;RK.uid=acPid();try{const srv=await acPull();if(srv){acReplace(acMerge(srv,SAVE));SAVE.acct=AC.s.uid;try{localStorage.setItem(SAVE_KEY,JSON.stringify(SAVE))}catch(e){}if($('mHome')&&$('mHome').classList.contains('on'))showMain('home')}acPush()}catch(e){AC.err=1}acUI()}
function acUI(){const B=$('mAcct');if(!B)return;B.style.display=RK.sb?'':'none';B.innerHTML=AC.s?'👤 '+String(AC.s.id).replace(/[<>&"]/g,'')+(AC.err?' ⚠️':''):'👤 로그인';const M=$('acct');if(M&&M.style.display==='flex')acView()}
function acView(msg,bad,first){if(first!==undefined)AC.first=first;const M=$('acct'),esc=t=>String(t).replace(/[<>&"]/g,'');M.style.display='flex';
  M.innerHTML='<div class="acc">'+(AC.s?'<h2>👤 '+esc(AC.s.id)+'</h2><div class="ad">로그인됨 · 랭킹, 행성 해금, 영웅 조각·레벨, 랜덤박스, 스킬이 계정에 자동 저장돼요. 다른 기기에서 같은 아이디로 로그인하면 이어서 할 수 있어요.</div>'+(AC.err?'<div class="am bad">⚠️ 서버에 저장하지 못했어요. 인터넷을 확인해 주세요.</div>':'<div class="am">✅ 저장됨</div>')+'<button id="acOut" class="g2">로그아웃</button><button id="acX">닫기</button>'
   :'<h2>👤 로그인</h2><div class="ad">아이디와 비밀번호만 정하면 돼요. 진행 상황이 저장되고 다른 기기에서도 이어서 할 수 있어요.</div><input id="acId" maxlength="16" placeholder="아이디 (영문 소문자·숫자 3~16자)" autocomplete="username" autocapitalize="off"><input id="acPw" type="password" maxlength="64" placeholder="비밀번호 (6자 이상)" autocomplete="current-password"><div id="acM" class="am'+(bad?' bad':'')+'">'+(msg||'비밀번호는 찾을 수 없으니 꼭 기억해 두세요')+'</div><button id="acIn">로그인</button><button id="acUp" class="g2">처음이에요 — 가입하기</button><button id="acX" class="g3">'+(AC.first?'로그인 없이 하기 <small>(기록은 이 기기에만)</small>':'닫기')+'</button>')+'</div>';
  $('acX').onclick=()=>{M.style.display='none';AC.first=0};M.onclick=e=>{if(e.target===M&&!AC.first)M.style.display='none'};
  if(AC.s){$('acOut').onclick=()=>{acLogout();toast('로그아웃했어요');acView();acUI();showMain('home')};return}
  const go=su=>async()=>{const m=$('acM');m.className='am';m.textContent=su?'가입하는 중…':'로그인 중…';$('acIn').disabled=$('acUp').disabled=true;
    try{await acLogin($('acId').value,$('acPw').value,su);toast(su?'🎉 가입 완료! 이제 자동 저장돼요':'👋 어서 와요, '+AC.s.id);if(AC.first){AC.first=0;$('acct').style.display='none'}else acView();acUI();showMain('home')}catch(e){acView(typeof e==='string'?e:acErr(e,su),1)}};
  const keep=()=>{const v=$('acId').value;return v};$('acIn').onclick=async()=>{const v=keep();await go(false)();if(!AC.s&&$('acId'))$('acId').value=v};$('acUp').onclick=async()=>{const v=keep();await go(true)();if(!AC.s&&$('acId'))$('acId').value=v};
  $('acPw').onkeydown=e=>{if(e.key==='Enter')$('acIn').click()}}
if(RK.sb){acLoad();if(AC.s)acBoot()}
(async()=>{try{const C=window.claude;if(!C||!C.use)return;const[db,us]=await Promise.all([C.use('db'),C.use('user')]);if(!db||!us)return;RK.db=db;RK.us=us;RK.uid=await us.id();try{const me=await us.me();RK.name=me&&me.name||''}catch(e){}
  if(RK.uid){try{const d=await db.doc('rank/'+RK.uid).get();if(d.exists)RK.best=d.data()}catch(e){}}if($('mRank')&&$('mRank').classList.contains('on'))rkRender()}catch(e){}})();
// ---------- 닉네임 비속어 필터 (표시·저장 모두) ----------
const BADW=['씨발','시발','씨빨','씨바','ㅅㅂ','ㅆㅂ','ㅆ발','씹','좆','좃','존나','졸라','ㅈㄴ','병신','븅신','빙신','ㅂㅅ','등신','개새끼','개새','개색','섀끼','쌔끼','ㅅㄲ','미친놈','미친년','미친','ㅁㅊ','지랄','ㅈㄹ','염병','닥쳐','꺼져','엿먹','느금','니애미','니미','애미','애비','엠창','걸레','창녀','보지','자지','섹스','찐따','한남','김치녀','일베','fuck','fck','shit','bitch','asshole','dick','pussy','cunt','nigger','nigga','fag','sex','porn','씨팔','씨펄','씨벌','시팔','시펄','시벌','쓰발','쒸발','씌발','십알','십새','ㅆㅍ','ㅅㅍ','썅','쌍년','쌍놈','개년','개놈','개같','개쓰레기','개소리','개자식','좆까','좆밥','ㅈ같','ㅈ까','존1나','뻐큐','퍽큐','빠큐','엿같','니엄마','느금마','느그엄마','엄창','니미럴','애자','장애새','병1신','븅','빙딱','등1신','또라이','돌아이','싸이코','죽어','뒤져','디져','자살','섹','쎅','쌕스','야동','야스','자위행위','자위하','딸감','딸딸이','딸치','떡치','빠구리','보빨','자빨','펠라','사까시','질싸','노콘','오르가즘','정액','콘돔','강간','성폭','몸캠','변태','젖꼭지','젖가슴','꼭지','유두','음경','음란','야한','av배우','fuk','fvck','phuck','sibal','ssibal','tlqkf','qudtls','whssk','wlfkf','sexy','boobs','nude','penis','vagina','cock','horny','rape','slut','whore','hentai','xxx','메갈','틀딱','짱깨','쪽바리','깜둥'];
const NICE=['꽃','별','냥','뿅','햇살','구름','하트','젤리'];
function cleanNick(n){if(n==null)return n;let o=String(n);const hs=[...o].reduce((a,ch)=>a*31+ch.charCodeAt(0)|0,7);let hit=false;
  for(const w of [...BADW].sort((a,b)=>b.length-a.length)){const re=new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');if(re.test(o)){hit=true;o=o.replace(re,NICE[Math.abs(hs)%NICE.length])}}
  const norm=o.toLowerCase().replace(/[\s0-9._\-~!@#$%^&*()+=,·'"`|\\/?<>:;\[\]{}ㆍ]/g,'');if(BADW.some(w=>norm.includes(w)))return '착한 용사'+(Math.abs(hs)%900+100);if(/ㅗ{1,}|凸/.test(norm))return '착한 용사'+(Math.abs(hs)%900+100);
  return o.trim()||'이름없음'}
function rkNick(){return cleanNick((SAVE.nick||RK.name||'').slice(0,12))||'이름없음'}
function rkBetter(a,b){return !b||a.w>b.w||(a.w===b.w&&a.k>b.k)}
async function sbRun(w,k,t){const r=await fetch(SB_URL+'/rest/v1/runs?select=id',{method:'POST',keepalive:true,headers:{apikey:SB_KEY,'Content-Type':'application/json',Prefer:'return=representation'},body:JSON.stringify({pid:RK.uid,nick:rkNick(),w:w|0,k:k|0,t:Math.round(t||0)})});if(!r.ok)throw {status:r.status};const a=await r.json();return a&&a[0]&&a[0].id}
async function rkSubmit(w,k,t){if(RK.sb){try{const prev=RK.bestW||0;const id=await sbRun(w,k,t);RK.last=id;const L=await rkFetch(),i=L.findIndex(r=>r.id===id);RK.bestW=Math.max(prev,w);return {rec:w>prev,rank:i<0?null:i+1}}catch(e){return null}}
  if(!RK.db||!RK.uid||RK.canW===false)return null;const cur={w,k,t,nick:rkNick(),at:Date.now(),v:308};
  const b=RK.best&&(RK.best.at||0)>=RK_SEASON_MS?RK.best:null,nb=rkBetter(cur,b)?cur:Object.assign({},b,{nick:rkNick()});nb.g=((b&&b.g)||0)+1;
  try{await RK.db.doc('rank/'+RK.uid).set(nb);RK.best=nb;RK.canW=true;return {rec:nb===cur&&(!b||cur.w>b.w||cur.k>b.k),rank:await rkMyRank()}}catch(e){if(e&&e.code==='invalid_argument')RK.canW=false;return null}}
// 랭킹 시즌: 규칙이 크게 바뀐 v299부터 새로 시작 — 그 전 기록은 지우지 않고 화면에서만 뺌
const RK_SEASON='2026-10-15T07:40:00Z',RK_SEASON_MS=Date.parse(RK_SEASON);
async function rkFetch(){if(RK.sb){const r=await fetch(SB_URL+'/rest/v1/runs?select=id,pid,nick,w,k,t,created_at&created_at=gte.'+RK_SEASON+'&order=w.desc,k.desc,t.asc&limit=100',{headers:{apikey:SB_KEY}});if(!r.ok)throw {status:r.status};const a=await r.json();RK.list=a.map(x=>({id:x.id,mine:x.pid===RK.uid,nick:cleanNick(x.nick),w:x.w,k:x.k,t:x.t,d:x.created_at}));const m=RK.list.filter(x=>x.mine);if(m.length)RK.bestW=Math.max(RK.bestW||0,...m.map(x=>x.w));return RK.list}const q=await RK.db.collection('rank').orderBy('w','desc').limit(200).get();RK.list=q.docs.map(d=>Object.assign({id:d.id},d.data())).filter(r=>typeof r.w==='number'&&(r.at||0)>=RK_SEASON_MS).sort((a,b)=>b.w-a.w||b.k-a.k||a.t-b.t);return RK.list}
async function rkMyRank(){try{const L=await rkFetch();const i=L.findIndex(r=>r.id===RK.uid);return i<0?null:i+1}catch(e){return null}}
// 게임 끝 화면: 랭킹을 바로 보여주고 닉네임 입력 → 등록. 등록 안 하고 나가면 그 이름으로 자동 등록.
let RKP=null;
function rkEsc(t){const s=document.createElement('span');s.textContent=t||'이름없음';return s.innerHTML}
function rkEndPanel(box,W,K,T){RKP={w:W,k:K,t:T,done:false,busy:false};
  box.innerHTML='<div class="rkT">🏆 랭킹</div><div class="rkIn"><input id="rkEN" maxlength="12" placeholder="닉네임 입력" value="'+String(SAVE.nick||RK.name||'').replace(/[<>"&]/g,'')+'"><button id="rkEB">등록</button></div><div id="rkEM" class="rkM">닉네임을 적고 등록하면 랭킹에 올라가요</div><div id="rkEL" class="rkL"><div class="rkM" style="text-align:center">불러오는 중…</div></div>';
  $('rkEB').onclick=rkEndSubmit;$('rkEN').onkeydown=e=>{if(e.key==='Enter')rkEndSubmit()};$('rkEN').oninput=()=>{const t=$('rkTmpN');if(t)t.innerHTML=rkEsc($('rkEN').value.trim()||'나')};
  const P=RKP;rkFetch().then(L=>{if(RKP===P&&!P.done)rkEndList(L,null)}).catch(()=>{if($('rkEL'))$('rkEL').innerHTML='<div class="rkM" style="text-align:center">랭킹을 불러오지 못했어요</div>'})}
function rkEndList(L,myId){const P=RKP,E=$('rkEL');if(!P||!E)return;const rows=(L||[]).slice(0,100).map(r=>Object.assign({},r));let pos;
  if(myId==null){pos=rows.findIndex(r=>r.w<P.w||(r.w===P.w&&((r.k||0)<P.k||((r.k||0)===P.k&&(r.t||0)>P.t))));if(pos<0)pos=rows.length;rows.splice(pos,0,{tmp:1,nick:'',w:P.w,k:P.k,t:P.t});
    $('rkEM').innerHTML=pos<100?'이번 판은 예상 <b>'+(pos+1)+'위</b>! 닉네임을 적고 등록하세요':'이번 판은 100위 밖이에요. 그래도 등록할 수 있어요'}
  else pos=rows.findIndex(r=>r.id===myId);
  E.innerHTML=rows.length?rows.map((r,i)=>{const me=r.tmp||(myId!=null&&r.id===myId);return '<div class="rkr'+(i<3?' p'+(i+1):'')+(me?' me':'')+'"'+(me?' id="rkMeRow"':'')+'><span class="n">'+(i>=100?'—':i<3?['🥇','🥈','🥉'][i]:i+1)+'</span><span class="nm">'+(r.tmp?'<span id="rkTmpN">'+rkEsc(cleanNick(($('rkEN')&&$('rkEN').value.trim())||'나'))+'</span><b class="tg">이번 판</b>':rkEsc(cleanNick(r.nick))+(me?'<b class="tg">방금 등록</b>':r.mine?' (나)':''))+'<small>처치 '+(r.k||0)+' · '+rkTime(r.t)+'</small></span><span class="w">웨이브 <b>'+r.w+'</b></span></div>'}).join(''):'<div class="rkM" style="text-align:center">아직 아무도 없어요</div>';
  const m=$('rkMeRow');if(m)E.scrollTop=Math.max(0,m.offsetTop-E.clientHeight/2+m.offsetHeight/2)}
async function rkEndSubmit(){const P=RKP;if(!P||P.done||P.busy)return;const inp=$('rkEN'),B=$('rkEB'),v=inp?inp.value.trim().slice(0,12):'';
  if(!v){toast('닉네임을 입력해 주세요');if(inp)inp.focus();return}SAVE.nick=cleanNick(v);if(SAVE.nick!==v){if(inp)inp.value=SAVE.nick;toast('바른 말로 바꿔서 등록했어요')}saveAll();P.busy=true;if(B){B.disabled=true;B.textContent='등록 중…'}
  let r=null;try{r=await rkSubmit(P.w,P.k,P.t)}catch(e){}P.busy=false;if(RKP!==P)return;
  if(!r){if(B){B.disabled=false;B.textContent='다시 시도'}$('rkEM').textContent='등록에 실패했어요. 다시 눌러 주세요';return}
  P.done=true;if(inp)inp.disabled=true;if(B)B.textContent='완료 ✓';$('rkEM').innerHTML=(r.rec?'🎉 내 최고 기록! ':'')+(r.rank?'전체 <b>'+r.rank+'위</b>로 등록됐어요':'등록했어요 (100위 밖)');
  try{rkEndList(RK.list||await rkFetch(),RK.sb?RK.last:RK.uid)}catch(e){}}
function rkFlush(){const P=RKP;RKP=null;if(!P||P.done||P.busy)return;const inp=$('rkEN'),v=inp&&inp.value.trim().slice(0,12);if(v){SAVE.nick=cleanNick(v);saveAll()}rkSubmit(P.w,P.k,P.t).catch(()=>{})}
window.addEventListener('pagehide',rkFlush);
function rkTime(t){t=Math.round(t||0);return Math.floor(t/60)+'분 '+(t%60)+'초'}
// 기록 코드: 랭킹에 직접 못 쓰는 사람(공개 링크 외부인·비로그인)이 주인에게 보내면 주인이 등록
function rkHash(t){let h=2166136261;for(let i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return h.toString(16).padStart(8,'0')}
function rkCode(w,k,t){const p=JSON.stringify({n:rkNick(),w,k,t:Math.round(t),a:Date.now()}),b=btoa(unescape(encodeURIComponent(p))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');return 'RHD-'+b+'-'+rkHash('rhd!'+b)}
function rkParse(c){const m=/RHD-([A-Za-z0-9_-]+)-([0-9a-f]{8})/.exec(c);if(!m||rkHash('rhd!'+m[1])!==m[2])return null;try{const b=m[1].replace(/-/g,'+').replace(/_/g,'/');const o=JSON.parse(decodeURIComponent(escape(atob(b+'==='.slice((b.length+3)%4)))));if(typeof o.w!=='number'||typeof o.k!=='number'||!o.n)return null;return o}catch(e){return null}}
async function rkImport(txt){const L=txt.split(/\s+/).map(rkParse).filter(Boolean);let n=0;for(const o of L){const id='x_'+rkHash('nick:'+String(o.n).slice(0,12)),ref=RK.db.doc('rank/'+id);let b=null;try{const d=await ref.get();if(d.exists)b=d.data()}catch(e){}
    if(b&&(b.la||[]).includes(o.a))continue;const cur={w:o.w,k:o.k,t:o.t||0,nick:cleanNick(String(o.n).slice(0,12)),at:o.a||Date.now(),ext:1};const nb=rkBetter(cur,b)?cur:Object.assign({},b);nb.g=((b&&b.g)||0)+1;nb.la=((b&&b.la)||[]).concat(o.a).slice(-30);try{await ref.set(nb);n++}catch(e){}}return [n,L.length]}
function rkCanOwn(){try{return !!(RK.us&&RK.us.isOwner())}catch(e){return false}}
async function rkRender(){const M=$('rkMe'),L=$('rkList');if(!M)return;const esc=t=>String(t).replace(/[<>"&]/g,'');
  let h='내 이름 <input id="rkNick" maxlength="12" value="'+esc(rkNick())+'"><button id="rkSave">저장</button>';
  if(RK.sb)h+='<div>판이 끝날 때마다 이 이름으로 기록이 올라가요. 높은 웨이브 순서예요.</div>';else if(RK.db&&RK.uid&&RK.canW!==false)h+='<div>'+(RK.best&&(RK.best.at||0)>=RK_SEASON_MS?'내 최고 기록 — 웨이브 <b>'+RK.best.w+'</b> · 처치 '+RK.best.k+' · '+(RK.best.g||1)+'판':'아직 기록이 없어요. 한 판 끝내면 자동으로 올라가요.')+'</div>';
  else h+='<div style="font-size:.85em;color:#8a4a1a">이 링크로는 랭킹에 바로 저장되지 않아요. 판이 끝나면 나오는 <b>기록 코드</b>를 게임 주인에게 보내 주세요.</div>';
  if(RK.db&&rkCanOwn())h+='<div style="margin-top:6px;border-top:1px dashed #d9b77a;padding-top:6px">📥 받은 기록 코드 등록 <small style="opacity:.7">(여러 개 한 번에 붙여 넣어도 돼요)</small><textarea id="rkIn" rows="2" style="width:100%;box-sizing:border-box;font-size:12px;margin-top:4px"></textarea><button id="rkReg">등록</button> <span id="rkRegMsg" style="font-size:.85em"></span></div>';
  M.innerHTML=h;
  $('rkSave').onclick=async()=>{const v=$('rkNick').value.trim().slice(0,12);SAVE.nick=cleanNick(v);saveAll();if(RK.best&&RK.db&&RK.uid){try{await RK.db.doc('rank/'+RK.uid).update({nick:rkNick()});RK.best.nick=rkNick()}catch(e){}}toast('이름 저장!');rkRender()};
  if($('rkReg'))$('rkReg').onclick=async()=>{const r=await rkImport($('rkIn').value);$('rkRegMsg').textContent=r[1]?'✅ '+r[0]+'개 등록':'❌ 올바른 코드가 없어요';if(r[0]){$('rkIn').value='';setTimeout(rkRender,600)}};
  if(!RK.db){L.innerHTML='<div style="text-align:center;opacity:.6;padding:12px">랭킹 목록은 claude.ai에 로그인하면 보여요.</div>';return}
  L.innerHTML='<div style="text-align:center;opacity:.6;padding:12px">불러오는 중…</div>';
  try{const R=await rkFetch();L.innerHTML=R.length?R.slice(0,100).map((r,i)=>{const e=document.createElement('span');e.textContent=cleanNick(r.nick)||'이름없음';const me=r.mine||r.id===RK.uid;return '<div class="rkr'+(i<3?' p'+(i+1):'')+(me?' me':'')+(RK.sb&&r.id===RK.last?' new':'')+'"><span class="n">'+(i<3?['🥇','🥈','🥉'][i]:i+1)+'</span><span class="nm">'+e.innerHTML+(me?' (나)':'')+'<small>처치 '+(r.k||0)+' · '+rkTime(r.t)+(RK.sb?(r.d?' · '+new Date(r.d).toLocaleDateString('ko-KR',{month:'numeric',day:'numeric'}):''):' · '+(r.g||1)+'판')+'</small></span><span class="w">웨이브 <b>'+r.w+'</b></span></div>'}).join(''):'<div style="text-align:center;opacity:.6;padding:12px">아직 아무도 없어요. 첫 기록을 남겨 보세요!</div>'}
  catch(e){L.innerHTML='<div style="text-align:center;opacity:.6;padding:12px">랭킹을 불러오지 못했어요.</div>'}}
function saveAll(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(SAVE))}catch(e){}if(typeof AC!=='undefined'&&AC&&AC.s)acPush();}
function fragNeed(lv){return 10*lv}
// 상자: 상한 없음, 40웨이브부터 점점 더 많이 → 일부러 일찍 죽는 것보다 오래 버티는 게 이득
function boxReward(w){return 1+Math.floor(w/10)+Math.floor(Math.pow(Math.max(0,w-40),2)/1000)}
const BOX_REC=3; // 내 최고 기록 갱신 보너스
function fuOwned(){return Object.keys(FUSION).filter(id=>U[id]&&U[id].url&&fuBase(id).every(k=>U[k]&&!heroLocked(k)))}
function openBoxes(){const n=SAVE.boxes||0;if(!n)return null;const got={},ups=[],cards=[],W=[50,27,15,6,2,3],FO=fuOwned(),own=ownedList(),ts=[0,1,2,3,4,5].filter(t=>t===5?FO.length:own.some(k=>U[k].t===t)),tw=ts.reduce((a,t)=>a+W[t],0);
  for(let b=0;b<20;b++){if(Math.random()<.35){cards.push(null);continue}let r=Math.random()*tw,t=ts[0];for(const q of ts){r-=W[q];if(r<0){t=q;break}}
    const pool=t===5?FO:own.filter(k=>U[k].t===t),k=pool[Math.floor(Math.random()*pool.length)];cards.push(k);got[k]=(got[k]||0)+1}
  for(const k in got){SAVE.frag[k]=(SAVE.frag[k]||0)+got[k];let lv=SAVE.lv[k]||1;while(SAVE.frag[k]>=fragNeed(lv)){SAVE.frag[k]-=fragNeed(lv);lv++;ups.push(k)}SAVE.lv[k]=lv}
  let skill=null,dup=null;SAVE.skPity=(SAVE.skPity||0)+1;if(Math.random()<SK_DROP||SAVE.skPity>=SK_PITY){SAVE.skPity=0;const not=Object.keys(USK).filter(k=>!SAVE.sk[k]);
    if(not.length){skill=not[Math.floor(Math.random()*not.length)];SAVE.sk[skill]=1;if(SAVE.skEq.length<2)SAVE.skEq.push(skill)}
    else{dup=own[Math.floor(Math.random()*own.length)];SAVE.frag[dup]=(SAVE.frag[dup]||0)+30;let lv=SAVE.lv[dup]||1;while(SAVE.frag[dup]>=fragNeed(lv)){SAVE.frag[dup]-=fragNeed(lv);lv++;ups.push(dup)}SAVE.lv[dup]=lv}
    try{SND.play('jackpot')}catch(e){}}
  SAVE.boxes=n-1;saveAll();return {left:n-1,got,ups,cards,skill,dup}}
function openAllBoxes(){const n=SAVE.boxes||0;if(!n)return null;const A={n:0,got:{},ups:new Set(),skills:[],dup:{},hit:0};
  for(let i=0;i<n;i++){const r=openBoxes();if(!r)break;A.n++;for(const k in r.got)A.got[k]=(A.got[k]||0)+r.got[k];A.hit+=r.cards.filter(Boolean).length;r.ups.forEach(k=>A.ups.add(k));if(r.skill)A.skills.push(r.skill);if(r.dup)A.dup[r.dup]=(A.dup[r.dup]||0)+30}return A}
function lootAllHTML(A){if(!A)return '';const ks=Object.keys(A.got).sort((a,b)=>U[b].t-U[a].t||A.got[b]-A.got[a]);
  return '<div style="font-size:1.1em;margin:4px 0">🎁 랜덤박스 '+A.n+'개 모두 열기</div>'+A.skills.map(k=>'<div class="skdrop">✨ 사용자 스킬 획득!<span>'+(v5u(USKI[k])?v5img(USKI[k],'','width:1.4em;height:1.4em;vertical-align:middle'):USK[k].e)+'</span><b>'+USK[k].n+'</b><br><small>'+skDesc(k)+'</small></div>').join('')+
   (Object.keys(A.dup).length?'<div class="skdrop">✨ 스킬 상자(스킬 전부 보유): '+Object.keys(A.dup).map(k=>U[k].n+' 조각 +'+A.dup[k]).join(', ')+'</div>':'')+
   '<div class="lootg">'+ks.map((k,i)=>'<span class="lc" style="animation-delay:'+Math.min(i*.03,1)+'s;background:'+(U[k].fu?'#d0203a':TC[U[k].t])+';position:relative">'+(U[k].url?'<img src="'+U[k].url+'" alt="'+U[k].n+'">':U[k].e)+'<b style="position:absolute;right:1px;bottom:0;font-size:11px;color:#fff;text-shadow:0 0 3px #000,0 0 2px #000">×'+A.got[k]+'</b></span>').join('')+'</div>'+
   '<div style="margin-top:6px">'+(v5u('random_box/shard')?v5img('random_box/shard','','width:1.3em;height:1.3em;vertical-align:middle'):'🧩')+' 조각 '+A.hit+'장 · 꽝 '+(A.n*20-A.hit)+'장'+(A.ups.size?'<br>'+[...A.ups].map(k=>'<b style="color:#ffe066">▲ '+U[k].n+' Lv.'+SAVE.lv[k]+'</b>').join(' · '):'')+'</div>'}
function lootHTML(r){if(!r)return '';const hit=r.cards.filter(Boolean).length;
  return (r.skill?'<div class="skdrop">✨ 사용자 스킬 획득!<span>'+(v5u(USKI[r.skill])?v5img(USKI[r.skill],'','width:1.4em;height:1.4em;vertical-align:middle'):USK[r.skill].e)+'</span><b>'+USK[r.skill].n+'</b><br><small>'+skDesc(r.skill)+' · 쿨타임 '+USK[r.skill].cd+'초</small></div>':'')+(r.dup?'<div class="skdrop">✨ 스킬 상자! (스킬 전부 보유) ✨<br><b>'+U[r.dup].n+' 조각 +30</b></div>':'')+'<div class="lootg">'+r.cards.map((k,i)=>'<span class="lc'+(k?'':' no')+'" style="animation-delay:'+(i*.045)+'s;'+(k?'background:'+(U[k].fu?'#d0203a':TC[U[k].t]):'')+'">'+(k?(U[k].url?'<img src="'+U[k].url+'" alt="'+U[k].n+'">':U[k].e):(v5u('random_box/blank')?v5img('random_box/blank'):'꽝'))+'</span>').join('')+'</div>'+
   '<div style="margin-top:6px">'+(v5u('random_box/shard')?v5img('random_box/shard','','width:1.3em;height:1.3em;vertical-align:middle'):'🧩')+' 조각 '+hit+'장 · 꽝 '+(20-hit)+'장'+(Object.keys(USK).some(k=>!SAVE.sk[k])?'<br><small style="opacity:.8">🔮 스킬 확정까지 '+(SK_PITY-SAVE.skPity)+'상자</small>':'')+(r.ups.length?'<br>'+[...new Set(r.ups)].map(k=>'<b style="color:#ffe066">▲ '+U[k].n+' Lv.'+SAVE.lv[k]+'</b>').join(' · '):'')+'</div>'}
function ownedList(){return (typeof TEST_ONLY!=='undefined'&&TEST_ONLY&&TEST_ONLY.length?TEST_ONLY:Object.keys(U)).filter(k=>U[k]&&!U[k].hidden&&!heroLocked(k))}
function skStrip(){const E=$('mSk');if(!E)return;const eq=SAVE.skEq;
  E.innerHTML='🔮 사용자 스킬 <small style="opacity:.75">(2개 장착 · 상자에서 '+(SK_DROP*100)+'% · '+(SK_PITY-SAVE.skPity)+'상자 안에 확정)</small><div class="row">'+Object.keys(USK).map(k=>{const own=SAVE.sk[k],q=USK[k];return '<button class="sk'+(own?'':' no')+(eq.includes(k)?' eq':'')+'" data-k="'+k+'"><span>'+(own?(v5u(USKI[k])?v5img(USKI[k],'','width:1.3em;height:1.3em'):q.e):'❔')+'</span>'+(own?q.n:'???')+'</button>'}).join('')+'</div><div id="mSkD" style="margin-top:4px;opacity:.85;font-size:calc(1.4*var(--sh))">'+(eq.length?eq.map(k=>USK[k].e+' '+skDesc(k)).join(' / '):'')+'</div>';
  E.querySelectorAll('.sk').forEach(b=>b.onclick=()=>{const k=b.dataset.k;if(!SAVE.sk[k]){toast('보상 상자에서 아주 드물게 나와요');return}const i=eq.indexOf(k);if(i>=0)eq.splice(i,1);else{if(eq.length>=2)eq.shift();eq.push(k)}saveAll();skStrip()})}
function cardUrl(k){const u=U[k];if(u._cu)return u._cu;const im=u.aimg&&u.aimg.idle_01;if(!im||!(im.complete&&im.naturalWidth))return u.url;try{const W=im.naturalWidth,H=im.naturalHeight,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0);const d=x.getImageData(0,0,W,H).data;let x0=W,y0=H,x1=0,y1=0;for(let y=0;y<H;y++)for(let q=0;q<W;q++)if(d[(y*W+q)*4+3]>30){if(q<x0)x0=q;if(q>x1)x1=q;if(y<y0)y0=y;if(y>y1)y1=y}if(x1<x0)return u.url;const pd=2,w=x1-x0+1+pd*2,h=y1-y0+1+pd*2,o=document.createElement('canvas');o.width=w;o.height=h;o.getContext('2d').drawImage(c,x0-pd,y0-pd,w,h,0,0,w,h);return u._cu=o.toDataURL()}catch(e){return u.url}}
// 특수 조합 우주 히어로: 서로 다른 행성의 우주 히어로 2~3명을 합침 (그림 준비 중 — 지금은 '내 캐릭터'에만 미리 보기)
const FUSION={astraon:{n:'아스트라온',nick:'천벌 궤도 포격 · 약화',mat:['zeus','archeon']},
 jinmu:{n:'진무',nick:'마비 · 중력장 제어',mat:['hyeonmu','cheongryong']},
 jeokhwang:{n:'적황',nick:'빠른 참격 · 화상 · 보스 화력',mat:['jujak','baekho']},
 yeongeopsu:{n:'영겁수',nick:'시간 속박 · 지속 피해',mat:['sylvaion','chronel']},
 unhwa:{n:'운화',nick:'운명 룰렛 · 아군 지원',mat:['sylvaion','belkaon']},
 clockweaver:{n:'시운',nick:'시간 속박 · 운명 폭발',mat:['chronel','lunette','belkaon']},
 nox:{n:'녹스',nick:'운명 표식 · 월식 참격',mat:['lunette','selene']},
 cheora:{n:'철아',nick:'근접 땅치기 · 광역 분쇄',mat:['archeon','baekho']},
 wolroe:{n:'월뢰',nick:'쌍도끼 부채꼴 베기 · 낙뢰',mat:['zeus','selene']},
 bideung:{n:'비등',nick:'증기 압력 · 근접 광역 폭발',mat:['poseidon','jujak']},
 noeha:{n:'뇌해',nick:'파도 휩쓸기 · 번개 연쇄',mat:['poseidon','zeus']},
 hwangryong:{n:'황룡',nick:'사신 순환 · 최종 영웅',mat:['jinmu','jeokhwang']},
 yeongwol:{n:'영월',nick:'시간 정지 · 동시 처형',mat:['clockweaver','wolroe']},
 heukjo:{n:'흑조',nick:'운명 룰렛 · 해일·낙뢰·축복',mat:['noeha','unhwa']}};
// v306: 특수 조합끼리 합치는 2단계 특수 조합(황룡·영월·흑조) 삭제 — 조합식·도감·박스 조각에서 빠짐(그림·코드는 남김)
for(const k of Object.keys(FUSION))if(FUSION[k].mat.some(m=>FUSION[m])){delete FUSION[k];if(U[k])U[k].hidden=1}
const FU_SPAWN={heukjo:{m:9,st:1.2,bst:.25},yeongwol:{m:10,st:1.5,bst:.3},noeha:{m:7,st:1,bst:.2},bideung:{m:7,st:1,bst:.2},wolroe:{m:7,st:1,bst:.2},cheora:{m:7,st:1,bst:.2},jinmu:{m:6,st:2,bst:.6},jeokhwang:{m:8,st:1,bst:.3,burn:1,burnT:4},astraon:{m:8,st:1.5,bst:.4},yeongeopsu:{m:6,st:1.5,bst:.3},unhwa:{m:5,st:1,bst:.2},clockweaver:{m:8,st:1.5,bst:.3},hwangryong:{m:12,st:3,bst:1},nox:{m:7,st:1,bst:.2}};
for(const id in FUSION){if(AURA[id])continue;const A0={};for(const m of FUSION[id].mat)if(AURA[m])for(const f in AURA[m])if(f!=='x')A0[f]=Math.max(A0[f]||0,+(AURA[m][f]*1.3).toFixed(3));if(Object.keys(A0).length){A0.x='재료에게 물려받은 오라(1.3배)'+(A0.pa?' — 아군 공격력 +'+Math.round(A0.pa*100)+'%':'')+(A0.pcd?' · 쿨타임 '+Math.round(A0.pcd*100)+'% 빨리':'')+(A0.pas?' · 공격속도 +'+Math.round(A0.pas*100)+'%':'');AURA[id]=A0}}
function fuStartLv(id){const mats=FUSION[id].mat;if(mats.every(k=>U[k]&&U[k].fu)){let sp=0;for(const k of mats){const l=(G.fuLv&&G.fuLv[k])||0;sp+=80*l+40*l*(l-1)}sp*=.7;let l=0,acc=0;while(acc+80+80*l<=sp){acc+=80+80*l;l++}return l}
  const avg=mats.reduce((a,k)=>a+planetLevel(k),0)/mats.length;return Math.floor(avg*.6/.45)}
function fuseCost(){return disc(500+300*((G&&G.nFuse)||0),A('fuslab')?EC.fus:1,'fuslab')}
function fuseReady(id){return !!U[id]&&FUSION[id].mat.every(k=>owned(k)>=1)&&!!resSpot(id,takePlan(FUSION[id].mat,true))}
function canFuse(id){return fuseReady(id)&&G.coins>=fuseCost()}
function fuUpCost(id){return 80+80*((G.fuLv&&G.fuLv[id])||0)}
function fuUp(id){return;if(G.over||!G.cells.some(c=>c&&c.u===id))return;const c=fuUpCost(id);if(G.coins<c)return;G.coins-=c;(G.fuLv=G.fuLv||{})[id]=(G.fuLv[id]||0)+1;G.cells.forEach((q,i)=>{if(q&&q.u===id){const[x,y]=cellXY(i);parts(x,y,16,'#ffe066',140,3)}});toast(U[id].n+' 개별 강화 Lv.'+G.fuLv[id]);refresh()}
function fuse(id){if(!G.over&&canFuse(id)&&!matsOK(FUSION[id].mat,id)&&!confirmUse('fu'+id,'🎯 목표('+U[G.goal].n+') 재료를 써요 — 한 번 더 누르면 특수 조합'))return;if(G.over||!canFuse(id)){toast(!fuseReady(id)?(FUSION[id].mat.every(k=>G.cells.some(c=>c&&c.u===k))?'빈 칸이 없어요 (농축된 재료는 한 겹만 빠져요)':'재료 우주 히어로가 모자라요'):'🪙 코인이 '+(fuseCost()-Math.floor(G.coins))+' 더 필요해요');return}
  const sl0=fuStartLv(id);{const c0=fuseCost();G.coins-=c0;paid()};G.nFuse=(G.nFuse||0)+1;G.fuLv=G.fuLv||{};if(sl0>(G.fuLv[id]||0)){G.fuLv[id]=sl0;G.sched.push({t:1.6,f:()=>toast(FUSION[id].n+' — 재료 강화를 이어받아 개별 강화 Lv.'+sl0+'로 시작')})}const P=takePlan(FUSION[id].mat,false);let at=putRes(id,resSpot(id,P),{cd:1.2,drop:.42});G.sel=null;SND.play('cosmic');const[x,y]=cellXY(at<0?12:at),u=U[id],pk=u.pk||{};const cutShown=CUT_CRAFT_ONCE?cutOnce('cr:'+id,id,u.n+' — 특수 조합 탄생!'):cutin(id,u.n+' — 특수 조합 탄생!');G.cutAt=G.time;
  if(pk.descent)fxs2(pk.descent,x,y-CS*.6,CS*2.6,10,0);G.fx.push({k:'t',x,y:y-40,t:1.8,T:1.8,s:'✨ 특수 조합 — '+u.n+'!',cr:true,dl:.1});G.flash=Math.max(G.flash||0,.15);
  G.sched.push({t:.42,f:()=>{const S=FU_SPAWN[id]||{m:6,st:1,bst:.3},atk=u.d*mult(id);if(pk.spawn)fxs2(pk.spawn,x,y-CS*.2,CS*5,12,0);G.flash=Math.max(G.flash||0,.28);G.shake=Math.max(G.shake,.8);G.hs=.5;
    }});
  if(!cutShown)toast('✨ 특수 조합 — '+u.n+'!');refresh()}
const FUB={heukjo:1,yeongwol:1.5,noeha:1,bideung:.744,wolroe:1,cheora:1.0,nox:0.354,astraon:1.348,yeongeopsu:0.895,unhwa:1.203,clockweaver:1.828,jinmu:0.591,jeokhwang:0.803,hwangryong:2.917}; // 특수조합 보스 피해 보정(재료 합 대비 2.6배 맞춤)
function kpf(im,x,y,w,T,o){if(!im||G.fx.length>=330)return;G.fx.push(Object.assign({k:'kp',im,x,y,w,t:T,T,dl:0},o||{}))}

// ---------- 특수 조합 영웅 특수기 ----------
function cUid(c){return c.uid||(c.uid=(G.uidN=(G.uidN||0)+1))}
function markSet(m,c,t){(m.mk=m.mk||{})[cUid(c)]=G.time+t}
function markTake(m,c){const id=cUid(c);if(m.mk&&m.mk[id]>G.time){delete m.mk[id];return true}return false}
function fuAlive(){return G.mobs.filter(o=>o.hp>0&&o.p>=28)}
function fuNear(x,y,r){return fuAlive().filter(o=>{const[a,b]=pos(o.p);return Math.hypot(a-x,b-y)<=r})}
function fuBossPick(x,y,r,best){const L=fuNear(x,y,r);if(!L.length)return best&&best.hp>0?best:null;return L.sort((a,b)=>(b.boss?1e9:b.p)-(a.boss?1e9:a.p))[0]}
function fuDense(x,y,r,R){const L=fuNear(x,y,r);let m=null,bn=-1;for(const o of L){const[a,b]=pos(o.p);let n=o.boss?3:0;for(const w of fuAlive()){const[c2,d2]=pos(w.p);if(Math.hypot(a-c2,b-d2)<=R)n++}if(n>bn){bn=n;m=o}}return m}
function fuStun(o,t,bt){if(o.boss)o.sl=Math.max(o.sl||0,bt*3);else o.st=Math.max(o.st||0,t)}
function fuRoot(o,t,bt){if(o.boss)o.sl=Math.max(o.sl||0,1.5+bt);else{o.rt=Math.max(o.rt||0,t);o.rtT=t}}
function fuCast(c,u,cx0,cy0){const pk=u.pk;const[sx,sy]=sockXY(c,G.cells.indexOf(c),u,'special');if(pk.fx)kpf(pk.fx[0],sx,sy,CS*1.6,.6,{s0:.3,add:1})}
const FUSK={
 heukjo(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i);fuCast(c,u,cx0,cy0);const r=Math.floor(Math.random()*3);
  kpf(pk.wheel[0],cx0,cy0-CS*1.4,CS*1.9,.8,{s0:.3,rot:9,fo:.75});
  G.sched.push({t:.6,f:()=>{if(!G.cells.includes(c))return;
   if(r===0){const L=fuAlive();toast('🌊 흑해 운명개문 — 검은 대양!');if(!L.length)return;for(let q=0;q<7;q++){const o=L[Math.floor(q/7*L.length)];if(!o)break;const[a,b]=pos(o.p);kpf(pk.wave[0],a,b-CS*.25,CS*2.4,.8,{s0:.4,fo:.55,dl:q*.05})}
     G.shake=Math.max(G.shake,.45);G.flash=Math.max(G.flash||0,.25);for(const o of L){hit(o,{},d*14,0,c);if(o.hp>0&&!o.boss)o.p=Math.max(28,o.p-CS*.5)}}
   else if(r===1){toast('⚡ 흑해 운명개문 — 운명의 뇌격!');const al=fuAlive();if(!al.length)return;let cur=al.sort((a,b)=>(b.boss?1e9:b.p)-(a.boss?1e9:a.p))[0];const seen=new Set([cur]);let px=cx0,py=cy0-CS*.8;
     for(let q=0;q<8&&cur;q++){const o=cur,[ox,oy]=pos(o.p),dl=q*.06,ln=Math.hypot(ox-px,oy-py);G.fx.push({k:'zap',x1:px,y1:py,x2:ox,y2:oy,t:.25,T:.25,c:'#ffd860',w:3,dl});if(ln>4)kpf(pk.bolt[0],(px+ox)/2,(py+oy)/2,ln*1.45,.3,{s0:.9,ang:Math.atan2(oy-py,ox-px),fo:.5,dl,add:1});kpf(pk.hit[0],ox,oy,CS*1.1,.35,{s0:.5,dl});
      G.sched.push({t:dl,f:()=>{if(o.hp>0){hit(o,{},d*(q?6:18),0,c);fuStun(o,.8,.2/3)}}});px=ox;py=oy;let nx=null,nd=1e9;for(const w of fuAlive()){if(seen.has(w))continue;const[a,b]=pos(w.p),dd=Math.hypot(a-ox,b-oy);if(dd<=CS*2&&dd<nd){nd=dd;nx=w}}cur=nx;if(nx)seen.add(nx)}G.shake=Math.max(G.shake,.45);G.flash=Math.max(G.flash||0,.25)}
   else{G.hjB=10;let n=0;G.cells.forEach((q,j)=>{if(q&&n++<14){const[a,b]=cellXY(j);kpf(pk.bless[0],a,b-CS*.25,CS*1.3,1,{s0:.4,dl:n*.03})}});toast('🍀 흑해 운명개문 — 황금 조류! 10초간 아군 공격력 +40%')}
   refresh()}})},
 yeongwol(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i);fuCast(c,u,cx0,cy0);if(!fuAlive().length)return;kpf(pk.tstop[0],cx0,cy0-CS*.5,CS*1.6,.4,{s0:.3,add:1});
  G.sched.push({t:.36,f:()=>{if(!G.cells.includes(c))return;const L=fuAlive();c.ywS=L;const[mx,my]=pos(PER*.5);kpf(pk.tstop[0],W/2,(GY+H)/2*.9,Math.min(W,H)*.75,.9,{s0:.6,fo:.5});for(const o of L)o.st=Math.max(o.st||0,o.boss?.5:2);G.flash=Math.max(G.flash||0,.15);
   G.sched.push({t:.24,f:()=>{if(!G.cells.includes(c))return;let n=0;for(const o of c.ywS){if(o.hp<=0)continue;const[ox,oy]=pos(o.p);if(n++<12)kpf(pk.sfxhit[0],ox,oy,CS*1.5,.4,{s0:.5,fo:.4,add:1});hit(o,{},d*12,0,c)}G.shake=Math.max(G.shake,.35);G.flash=Math.max(G.flash||0,.2);
    G.sched.push({t:.25,f:()=>{let n=0;for(const o of c.ywS){if(o.hp<=0)continue;const[ox,oy]=pos(o.p);if(n++<12)kpf(pk.sfxhit[0],ox,oy,CS*2.1,.5,{s0:.6,fo:.45,ang:.6,add:1});hit(o,{},d*8,0,c)}c.ywS=null;G.shake=Math.max(G.shake,.5);G.flash=Math.max(G.flash||0,.3)}})}})}})},
 noeha(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i);fuCast(c,u,cx0,cy0);const R=CS*1.5,m=fuDense(cx0,cy0,u.r+CS,R);if(!m)return;const[lx,ly]=pos(m.p);
  G.sched.push({t:.6,f:()=>{if(!G.cells.includes(c))return;kpf(pk.sfxhit[0],lx,ly,R*2.2,.5,{s0:.3,fo:.45});G.fx.push({k:'ring',x:lx,y:ly,r:R,t:.4,T:.4,c:'#7fc8ff'});G.shake=Math.max(G.shake,.4);G.flash=Math.max(G.flash||0,.2);
   const area=fuNear(lx,ly,R);for(const o of area)hit(o,{},d*8,0,c);let cur=area.filter(o=>o.hp>0).sort((a,b)=>b.p-a.p)[0]||area.sort((a,b)=>b.p-a.p)[0];if(!cur)return;const seen=new Set([cur]);let[px,py]=pos(cur.p);
   for(let h=0;h<5;h++){let nx=null,nd=CS*2+1;for(const w of fuAlive()){if(seen.has(w))continue;const[a,b]=pos(w.p),dd=Math.hypot(a-px,b-py);if(dd<nd){nd=dd;nx=w}}if(!nx)break;seen.add(nx);const[qx,qy]=pos(nx.p),x1=px,y1=py,tg=nx;
    G.fx.push({k:'bimg',imgs:pk.chain,x:x1,y:y1,a:Math.atan2(qy-y1,qx-x1),L:Math.hypot(qx-x1,qy-y1),w:34,t:.3,T:.3,dl:h*.06});G.sched.push({t:h*.06,f:()=>{if(tg.hp>0){hit(tg,{},d*3,0,c);fuStun(tg,.6,.15)}}});px=qx;py=qy}}})},
 bideung(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i);fuCast(c,u,cx0,cy0);const R=CS*2.5;
  G.sched.push({t:.6,f:()=>{if(!G.cells.includes(c))return;kpf(pk.sfxhit[0],cx0,cy0,R*1.6,.6,{s0:.3,fo:.4,a:.8});kpf(pk.quake[0],cx0,cy0,R*2.1,.6,{s0:.2,fo:.4});G.fx.push({k:'ring',x:cx0,y:cy0,r:R,t:.45,T:.45,c:'#5fe8e0'});G.shake=Math.max(G.shake,.45);G.flash=Math.max(G.flash||0,.2);
   for(const o of fuNear(cx0,cy0,R)){hit(o,{},d*10,0,c);if(o.hp<=0)continue;if(o.boss)fuStun(o,0,.2);else o.p=Math.max(28,o.p-CS*.4)}}})},
 pearlpunch(c,i,u,s,d,best){const pk=u.pk;G.sched.push({t:.54,f:()=>{if(!G.cells.includes(c)||!best||best.hp<=0)return;const[lx,ly]=pos(best.p);kpf(pk.sfxhit[0],lx,ly,CS*1.1,.3,{s0:.5,fo:.5});hit(best,{},d*3.2,0,c)}})},
 clawlancer(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i);if(!best)return;const[bx,by]=pos(best.p),A0=Math.atan2(by-cy0,bx-cx0),R=CS*2+16;c.ax=Math.cos(A0);c.ay=Math.sin(A0);
  G.sched.push({t:.54,f:()=>{if(!G.cells.includes(c))return;kpf(pk.sfxhit[0],cx0+Math.cos(A0)*R*.5,cy0+Math.sin(A0)*R*.5,R*1.1,.3,{s0:.4,ang:A0,fo:.4});
   const L=fuAlive().filter(o=>{const[a,b]=pos(o.p),dx=a-cx0,dy=b-cy0,dd=Math.hypot(dx,dy);if(dd>R)return false;let da=Math.abs(Math.atan2(dy,dx)-A0);if(da>Math.PI)da=2*Math.PI-da;return dd<1||da<=Math.PI/4}).sort((a,b)=>b.p-a.p).slice(0,3);for(const o of L)hit(o,{},d*3,0,c)}})},
 coralgiant(c,i,u,s,d,best){const pk=u.pk;if(!best)return;const[lx,ly]=pos(best.p);G.sched.push({t:.54,f:()=>{if(!G.cells.includes(c))return;const R=CS;kpf(pk.sfxhit[0],lx,ly,R*2.6,.45,{s0:.3,fo:.5});G.shake=Math.max(G.shake,.15);
   for(const o of fuNear(lx,ly,R).sort((a,b)=>b.p-a.p).slice(0,6))hit(o,{},d*4,0,c)}})},
 abyssadmiral(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i);const R=CS*1.4,m=fuDense(cx0,cy0,u.r+CS*.5,R);if(!m)return;const lp=m.p,[lx,ly]=pos(lp);
  G.sched.push({t:.54,f:()=>{if(!G.cells.includes(c))return;kpf(pk.sfxhit[0],lx,ly,R*2.2,.6,{s0:.3,fo:.5});G.shake=Math.max(G.shake,.2);
   for(const o of fuNear(lx,ly,R).sort((a,b)=>b.p-a.p).slice(0,8)){hit(o,{},d*4,0,c);if(o.hp<=0)continue;if(o.boss)o.sl2=Math.max(o.sl2||0,1);else{const dp=lp-o.p;o.p+=Math.sign(dp)*Math.min(Math.abs(dp),CS*.6)}}}})},
 poseidon(c,i,u,s,d,best){const pk=u.pk;G.sched.push({t:.54,f:()=>{if(!G.cells.includes(c))return;const L=fuAlive();
   for(let q=0;q<6;q++){const o=L[Math.floor(q/6*L.length)];if(!o)break;const[a,b]=pos(o.p);kpf(pk.sfxhit[0],a,b-CS*.2,CS*2.2,.8,{s0:.3,fo:.55,dl:q*.06})}
   G.shake=Math.max(G.shake,.5);G.flash=Math.max(G.flash||0,.2);
   for(const o of L){hit(o,{},d*8,0,c);if(o.hp<=0)continue;if(o.boss)o.sl2=Math.max(o.sl2||0,2);else{o.p=Math.max(28,o.p-CS*.7);o.sl=Math.max(o.sl||0,2)}}}})},
 wolroe(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i);fuCast(c,u,cx0,cy0);const R=CS*3+16,HA=70*Math.PI/180,L=fuAlive().filter(o=>{const[a,b]=pos(o.p);return Math.hypot(a-cx0,b-cy0)<=R});if(!L.length)return;
  const inC=(o,a0)=>{const[a,b]=pos(o.p),dx=a-cx0,dy=b-cy0,dd=Math.hypot(dx,dy);if(dd>R)return false;if(dd<1)return true;let da=Math.abs(Math.atan2(dy,dx)-a0);if(da>Math.PI)da=2*Math.PI-da;return da<=HA};
  let A0=0,bn=-1,bp=-1;for(const o of L){const[a,b]=pos(o.p),a0=Math.atan2(b-cy0,a-cx0);let n=0;for(const w of L)if(inC(w,a0))n++;if(n>bn||(n===bn&&o.p>bp)){bn=n;bp=o.p;A0=a0}}
  c.ax=Math.cos(A0);c.ay=Math.sin(A0);const mx=cx0+Math.cos(A0)*R*.5,my=cy0+Math.sin(A0)*R*.5;
  G.sched.push({t:.6,f:()=>{if(!G.cells.includes(c))return;kpf(pk.cross[0],mx,my,R*1.2,.65,{s0:.4,fo:.45,a:.85});kpf(pk.slash[0],mx,my,R*1.05,.4,{s0:.5,ang:A0-.5,fo:.4,a:.7});kpf(pk.slash[0],mx,my,R*1.05,.4,{s0:.5,ang:A0+.5,fo:.4,a:.7});G.shake=Math.max(G.shake,.4);G.flash=Math.max(G.flash||0,.15);
   for(const o of fuAlive())if(inC(o,A0)){hit(o,{},d*9,0,c);fuStun(o,.7,.15)}}})},
 cheora(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i);fuCast(c,u,cx0,cy0);const R=CS*1.5,m=fuDense(cx0,cy0,u.r+CS,R);if(!m)return;const[lx,ly]=pos(m.p);
  G.sched.push({t:.6,f:()=>{if(!G.cells.includes(c))return;kpf(pk.sfxhit[0],lx,ly,R*2.2,.7,{s0:.4,fo:.5,add:1});kpf(pk.quake[0],lx,ly,R*2.4,.7,{s0:.2,fo:.4});G.fx.push({k:'ring',x:lx,y:ly,r:R,t:.45,T:.45,c:'#5fe0ff'});G.shake=Math.max(G.shake,.45);G.flash=Math.max(G.flash||0,.25);
   for(const o of fuNear(lx,ly,R)){hit(o,{},d*10,0,c)}}})},
 astraon(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i);fuCast(c,u,cx0,cy0);
  G.sched.push({t:.35,f:()=>{if(!G.cells.includes(c))return;const tg=fuBossPick(cx0,cy0,u.r+CS,best);if(!tg)return;const[lx,ly]=pos(tg.p),R=CS*2;
   kpf(pk.scol[0],lx,ly+CS*.5,CS*3.4,.75,{ay:.9,s0:.5,fo:.5,add:1});for(let q=0;q<3;q++)G.fx.push({k:'zap',x1:cx0+(q-1)*CS*.6,y1:cy0-CS,x2:lx,y2:ly,t:.25,T:.25,c:'#bfe9ff',w:3,dl:q*.05});
   G.sched.push({t:.25,f:()=>{kpf(pk.sfxhit[0],lx,ly,R*2.2,.6,{s0:.5,add:1});G.fx.push({k:'ring',x:lx,y:ly,r:R,t:.4,T:.4,c:'#8fd8ff'});G.flash=Math.max(G.flash||0,.3);G.shake=Math.max(G.shake,.6);
    for(const o of fuNear(lx,ly,R)){hit(o,{},d*12,0,c);fuStun(o,1,.25);o.vu2=Math.max(o.vu2||0,6)}if(tg.hp>0)hit(tg,{},d*8,.05,c)}})}})},
 yeongeopsu(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i);fuCast(c,u,cx0,cy0);
  G.sched.push({t:.4,f:()=>{if(!G.cells.includes(c))return;const R=CS*2,m=fuDense(cx0,cy0,(u.spR||u.r)+CS,R);if(!m)return;const[lx,ly]=pos(m.p);
   kpf(pk.dome[0],lx,ly,R*2.3,.8,{s0:.3});G.sched.push({t:.3,f:()=>{kpf(pk.sfxhit[0],lx,ly,R*1.8,.6,{s0:.5});G.shake=Math.max(G.shake,.5);
    for(const o of fuNear(lx,ly,R)){hit(o,{sl:2},d*4,0,c);fuRoot(o,1,.2)}
    (G.zones=G.zones||[]).push({p:m.p,seg:R,t:6,T:6,dot:1,tk:.5,d:d*.75,c,sl:1.2,imgs:pk.field,seen:new Set()})}})}})},
 unhwa(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i);fuCast(c,u,cx0,cy0);const r=Math.floor(Math.random()*3);
  kpf(pk.wheel[0],cx0,cy0-CS*1.5,CS*1.9,1.3,{s0:.3,rot:9,fo:.8});
  G.sched.push({t:1.2,f:()=>{if(!G.cells.includes(c))return;const R=CS*2,m=fuDense(cx0,cy0,u.r+CS,R);
   if(m){const[lx,ly]=pos(m.p);kpf(pk.sfxhit[0],lx,ly,R*2,.7,{s0:.4});G.shake=Math.max(G.shake,.4);for(const o of fuNear(lx,ly,R))hit(o,{},d*8,0,c)}
   if(r===0){G.unhB=10;let n=0;G.cells.forEach((q,j)=>{if(q&&n++<14){const[a,b]=cellXY(j);kpf(pk.buffA[0],a,b-CS*.2,CS*1.2,.9,{s0:.4,dl:n*.03})}});toast('🎲 황금 개화 — 10초간 아군 공격력 +25%')}
   else if(r===1){let n=0;G.cells.forEach((q,j)=>{if(!q||q===c||q.u==='unhwa'||q.u==='hwangryong'||!SP[q.u]||!(q.sc>0)||q.cdrL>G.time)return;q.cdrL=G.time+10;q.sc=Math.max(0,q.sc-8);const[a,b]=cellXY(j);if(n++<14)kpf(pk.buffC[0],a,b-CS*.2,CS*1.2,.9,{s0:.4})});toast('🎲 운명 재촉 — 아군 특수기 8초 당김')}
   else{const g=Math.max(80,Math.round(cost()*1.2));G.coins+=g;kpf(pk.coin[0],cx0,cy0-CS,CS*2,1,{s0:.4});G.fx.push({k:'t',x:cx0,y:cy0-CS*1.4,t:1.2,T:1.2,s:'+🪙'+g,cr:true,dl:.1});toast('🎲 행운 수확 — 코인 +'+g)}
   refresh()}})},
 clockweaver(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i);fuCast(c,u,cx0,cy0);
  G.sched.push({t:.4,f:()=>{if(!G.cells.includes(c))return;const tg=fuBossPick(cx0,cy0,u.r+CS,best);if(!tg)return;const[lx,ly]=pos(tg.p),R=CS*2,L=fuNear(lx,ly,R);
   kpf(pk.bind[0],lx,ly,R*2.1,.6,{s0:.4,fo:.7});for(const o of L){markSet(o,c,10);if(G.fx.length<300)kpf(pk.mark[0],0,0,CS*.6,.6,{m:o,s0:.5})}
   G.sched.push({t:.5,f:()=>{kpf(pk.slash[0],lx,ly,R*2.3,.55,{s0:.7,add:1});kpf(pk.sfxhit[0],lx,ly,R*1.9,.6,{s0:.5});G.flash=Math.max(G.flash||0,.22);G.shake=Math.max(G.shake,.55);
    for(const o of L){if(o.hp<=0)continue;hit(o,{},d*10,0,c);if(markTake(o,c))hit(o,{},d*6,.06,c)}}})}})},
 nox(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i);fuCast(c,u,cx0,cy0);const al=fuAlive();if(!al.length)return;const tg=al.sort((a,b)=>(b.boss?1e9:b.p)-(a.boss?1e9:a.p))[0];const[lx,ly]=pos(tg.p);
  kpf(pk.orb[0],lx,ly-CS*.6,CS*1.4,.6,{s0:.2});
  G.sched.push({t:.3,f:()=>{if(!G.cells.includes(c))return;const[tx,ty]=tg.hp>0?pos(tg.p):[lx,ly];kpf(pk.slash[0],tx,ty,CS*3.2,.5,{s0:.6,add:1});
   G.sched.push({t:.3,f:()=>{kpf(pk.sfxhit[0],tx,ty,CS*2.6,.6,{s0:.5});G.flash=Math.max(G.flash||0,.25);G.shake=Math.max(G.shake,.6);
    if(tg.hp>0){hit(tg,{},d*18,0,c);if(markTake(tg,c))hit(tg,{},d*8,.05,c)}
    for(const o of fuNear(tx,ty,CS*1.5)){if(o===tg||o.hp<=0)continue;hit(o,{},d*6,.03,c);if(markTake(o,c))hit(o,{},d*3,.06,c)}}})}})},
 hwangryong(c,i,u,s,d,best){const pk=u.pk,[cx0,cy0]=cellXY(i),g=c.hwI||0;c.hwI=(g+1)%4;const nm=['청룡 · 창천뢰쇄','현무 · 지맥압진','주작 · 적천성화','백호 · 백금멸참'][g];G.fx.push({k:'t',x:cx0,y:cy0-CS*1.3,t:1.2,T:1.2,s:nm,cr:true,dl:0});
  const SQ=(imgs,x,y,w,dl)=>{if(G.fx.length<330)G.fx.push({k:'seq',imgs,fps:10,w,x,y,t:.4,T:.4,dl:dl||0})};
  G.sched.push({t:.2,f:()=>{if(!G.cells.includes(c))return;
   if(g===0){let cur=fuBossPick(cx0,cy0,u.r+CS,best);if(!cur)return;const seen=new Set([cur]);let px=cx0,py=cy0-CS*.8;for(let q=0;q<10&&cur;q++){const o=cur,[ox,oy]=pos(o.p),dl=q*.06;G.fx.push({k:'zap',x1:px,y1:py,x2:ox,y2:oy,t:.25,T:.25,c:'#9fd8ff',w:3,dl});SQ(pk.blue,ox,oy,CS*1.3,dl);
     G.sched.push({t:dl,f:()=>{if(o.hp>0){hit(o,{},d*(q?5:10),0,c);fuStun(o,1.5,.5)}}});px=ox;py=oy;let nx=null,nd=1e9;for(const w of fuAlive()){if(seen.has(w))continue;const[a,b]=pos(w.p),dd=Math.hypot(a-ox,b-oy);if(dd<=CS*2&&dd<nd){nd=dd;nx=w}}cur=nx;if(nx)seen.add(nx)}G.shake=Math.max(G.shake,.4)}
   else if(g===1){const R=CS*2.4,m=fuDense(cx0,cy0,u.r+CS,R);if(!m)return;const[lx,ly]=pos(m.p);SQ(pk.jade,lx,ly,R*2);G.fx.push({k:'ring',x:lx,y:ly,r:R,t:.5,T:.5,c:'#6fe0a0'});G.shake=Math.max(G.shake,.5);
     for(const o of fuNear(lx,ly,R))hit(o,{sl:2},d*8,0,c);(G.zones=G.zones||[]).push({p:m.p,seg:R,t:6,T:6,dot:1,tk:.5,d:d*.8,c,sl:1,imgs:pk.jade,seen:new Set()})}
   else if(g===2){const L=fuAlive();L.forEach((o,q)=>{const[ox,oy]=pos(o.p);if(q<24)SQ(pk.red,ox,oy,CS*1.2,Math.min(.5,q*.02));hit(o,{},d*10,Math.min(.5,q*.02),c)});G.flash=Math.max(G.flash||0,.3);G.shake=Math.max(G.shake,.7);
     (G.zones=G.zones||[]).push({p:0,seg:PER,all:1,t:6,T:6,dot:1,tk:.5,d:d*1,c,imgs:pk.red,seen:new Set()})}
   else{const tg=fuBossPick(cx0,cy0,u.r+CS,best);if(!tg)return;const[lx,ly]=pos(tg.p),R=CS*2;SQ(pk.white,lx,ly,R*2.4);G.fx.push({k:'ring',x:lx,y:ly,r:R,t:.4,T:.4,c:'#fff'});G.flash=Math.max(G.flash||0,.25);G.shake=Math.max(G.shake,.6);
     hit(tg,{},d*30,0,c);for(const o of fuNear(lx,ly,R))if(o!==tg)hit(o,{},d*15,.04,c)}}})}};
function fxs2(imgs,x,y,w,fps,dl){if(imgs&&imgs.length===1)return kpf(imgs[0],x,y,w,.9,{dl:dl||0,s0:.4});if(G.fx.length<330)G.fx.push({k:'seq',imgs,fps,w,x,y,t:imgs.length/fps,T:imgs.length/fps,dl:dl||0})}
function fuName(k){return U[k]?U[k].n:FUSION[k]?FUSION[k].n:k}
function fuBase(k){return FUSION[k]?FUSION[k].mat.flatMap(fuBase):[k]}
// 이번 판 행성으로 만들 수 있는 특수 조합만
function fuAvail(id){const on=plIn();return fuBase(id).every(k=>U[k]&&on.includes(U[k].planet))}
// 내 캐릭터 — 영웅 상세 (스킬·공격력·공속·사거리)
function heroDetail(k){const u=U[k];if(!u)return;let D=$('hDet');if(!D){D=document.createElement('div');D.id='hDet';document.body.appendChild(D);D.onclick=e=>{if(e.target===D||e.target.closest('.hdX'))D.style.display='none'}}
  const fu=!!u.fu,lv=fu?null:(SAVE.lv[k]||1),atk=u.d*HERO_POW*TIER_POW[u.t]*(PL_POW[u.planet]||1)*(HPW[k]||1)*lvK(k),bm=u.bm||1,iv=1/u.s,rc=(u.r-16)/CS,s=u.sp2,pv=PV[k],lock=!fu&&heroLocked(k);
  const row=(a,b)=>'<div class="hr"><span>'+a+'</span><b>'+b+'</b></div>',f1=v=>(+v.toFixed(2))+'';
  // 설명 속 피해 %를 실제 피해 숫자로 (증가·감속·확률 같은 %는 그대로)
  const dmg=t=>{let n=0;const o=(t||'').replace(/(^|[^\-\d.])(\d+(?:\.\d+)?)%(?!p)(?!\s*(?:확률|감속|빨리|느리|쿨|더|추가 피해 증가))/g,(m0,pre,v,off)=>{if(pre==='+'&&t[off+m0.length]!==')')return m0;if(/확률\s*$/.test(t.slice(0,t.indexOf(m0)+pre.length)))return m0;n++;return pre+v+'% <b class="dv">'+fmt(atk*v/100)+'</b>'});return[o,n]};
  const [bx,bn]=dmg(pv&&pv.x?pv.x:u.x||''),[sx,sn]=s?dmg(s.x||SPD[k]||''):['',0];
  let h='<div class="hdp"><button class="hdX">✕</button><div class="hdT" style="background:'+(fu?'linear-gradient(135deg,#6a3fd0,#d9a520)':TC[u.t])+'">'+(u.url?'<img src="'+cardUrl(k)+'" alt="">':'<span class="hdE">'+u.e+'</span>')+'<div><small>'+(fu?'✨ 특수 조합 (우주 둘 이상을 합친 상위 영웅)':pic(u.planet)+PLANETS[u.planet]+' · '+TN[u.t])+'</small><div class="hdN">'+u.n+'</div><small>'+(u.nick||(FUSION[k]&&FUSION[k].nick)||'')+'</small><small style="display:block">'+[clsTag(k),roleTag(k)].filter(Boolean).join(' · ')+'</small>'+(lv?'<div class="hdL">카드 Lv.'+lv+(lv>1?' (공격력 +'+(lv-1)*5+'%)':'')+(lock?' · 🔒 잠김':'')+'</div>':'')+'</div></div>';
  if(HCLS[k]||ROLE[k])h+='<div class="hdB"><div class="hdH">소속·역할</div>'+(HCLS[k]?'<p>'+clsTag(k)+' — '+CLS[HCLS[k]].need.map((q,j)=>q+'종: '+CLS[HCLS[k]].x[j]).join('<br>')+'</p>':'')+(ROLE[k]?'<p>'+roleTag(k)+' — 강점: '+ROLES[ROLE[k]].x+'<br>약점: '+ROLES[ROLE[k]].w+'</p>':'')+'</div>';
  h+='<div class="hdS">'+row('⏱️ 공격 간격',f1(iv)+'초 <small>(초당 '+f1(u.s)+'회)</small>')+row('🎯 사거리',(+rc.toFixed(1))+'칸 <small>(반지름) '+(u.rr||'')+'</small>')+(s?row('★ 특수기 쿨타임',s.cd+'초'):'')+'</div>';
  h+='<div class="hdB"><div class="hdH">기본공격 '+tagH([rngTag(k)].concat(PVT[k]||[]))+'</div><p>'+bx+'</p><div class="dl">💥 1회 피해 <b>'+fmt(atk*bm)+'</b>'+(bn?'':' <small>('+Math.round(bm*100)+'%)</small>')+' · 초당 <b>'+fmt(atk*bm*u.s)+'</b> <small>(적 1명 기준)</small></div>'+(u.cr?'<p class="hm">치명타 확률 '+Math.round(u.cr*100)+'% · 치명타 피해 '+(u.cm||2)+'배</p>':'')+((u.bossK||1)*(FUB[k]||1)!==1?'<div class="dl">👑 보스에게 1회 피해 <b>'+fmt(atk*bm*(u.bossK||1)*(FUB[k]||1))+'</b></div>':'')+'</div>';
  if(s)h+='<div class="hdB sp"><div class="hdH">★ '+s.n+' '+tagH(SPT[k]||[])+'</div><p>'+sx+'</p>'+(!sn&&s.m?'<div class="dl">💥 피해 <b>'+fmt(atk*s.m)+'</b> <small>('+Math.round(s.m*100)+'%)</small></div>':'')+(SPD[k]&&s.x&&SPD[k]!==s.x?'<p class="hm">'+SPD[k]+'</p>':'')+'<p class="hm">쿨타임 '+s.cd+'초'+(u.spR?(u.spR>1e4?' · 사거리 전장 전체':' · 사거리 '+(+((u.spR-16)/CS).toFixed(1))+'칸'):'')+'</p></div>';
  if(AURA[k])h+='<div class="hdB au"><div class="hdH">✨ 상시 오라</div><p>'+AURA[k].x+'</p><p class="hm">주변 칸 아군에게 적용 (게임에서 초록 점선 칸)</p></div>';
  if(u.syn)h+='<div class="hdB"><div class="hdH">🌿 특성</div><p>옆 칸(대각 포함)에 같은 행성 아군이 있으면 피해 '+u.syn+'배</p></div>';
  if(fu&&FUSION[k])h+='<div class="hdB fu"><div class="hdH">⚗️ 조합식</div><p>'+FUSION[k].mat.map(fuName).join(' + ')+'</p><p class="hm">게임 중 개별 강화 1강마다 공격력 +45%(10강부터 ×1.07 복리) · 조합하면 재료의 오라를 1.3배로 물려받음</p></div>';
  else if(!fu&&PSYN[u.planet])h+='<div class="hdB"><div class="hdH">🪐 '+PLANETS[u.planet]+' 시너지</div><p>'+PSYN[u.planet].x+'</p><p class="hm">게임 중 행성 강화 1강마다 이 행성 영웅 공격력 +60%(10강부터 ×1.07 복리)</p></div>';
  h+='<p class="hm" style="text-align:center;margin-top:6px">숫자는 게임 안 강화·증강·버프 적용 전 기준</p></div>';
  D.innerHTML=h;D.style.display='flex'}
function heroHead(){return '<div class="lockH hh">🪐 <b>행성 영웅</b> <small>각 행성의 영웅들</small></div>'}
function fusionCards(){return '<div class="lockH fuh">✨ <b>특수 조합</b> <small>우주 히어로끼리 합친 최상위 영웅</small></div>'+Object.keys(FUSION).map(id=>{const f=FUSION[id];
  const art=U[id]&&U[id].url;return '<div class="card fu'+(art?' fa':'')+'" data-k="'+id+'"><div class="pk fp">✨특수조합</div><div class="k"></div><div class="im fim">'+(art?'<img class="one" src="'+cardUrl(id)+'" alt="">':fuBase(id).map(k=>U[k]&&U[k].url?'<img src="'+cardUrl(k)+'" alt="">':'').join(''))+'</div><div class="lv">'+(art?(()=>{const lv=SAVE.lv[id]||1;return 'Lv.'+lv+(lv>1?' <small style="opacity:.85">+'+(lv-1)*5+'%</small>':'')})():'🔜 준비 중')+'</div>'+(art?(()=>{const lv=SAVE.lv[id]||1,need=fragNeed(lv),pc=Math.min(need,(SAVE.frag&&SAVE.frag[id])||0);return '<div class="bar"><i style="width:'+(pc/need*100)+'%"></i><b>🧩 '+pc+'/'+need+'</b></div>'})():'')+'<div class="nm"><small>'+f.nick+'</small>'+f.n+'</div><div class="fx2">'+f.mat.map(fuName).join(' + ')+'</div></div>'}).join('')}
function lockCards(){const L=Object.keys(U).filter(k=>!U[k].hidden&&heroLocked(k)).sort((a,b)=>U[a].t-U[b].t);if(!L.length)return '';
  return [...new Set(L.map(k=>U[k].planet))].map(p=>'<div class="lockH">'+pic(p)+' <b>'+PLANETS[p]+'</b> 🔒 '+LOCKP[p].x+' 시 해금 <small>(내 최고 '+(SAVE.best||0)+'웨이브)</small></div>'+L.filter(k=>U[k].planet===p).map(k=>{const u=U[k];return '<div class="card lock" data-k="'+k+'" style="background:'+TC[u.t]+'"><div class="pk">'+pic(u.planet)+PLANETS[u.planet]+'</div><div class="k">'+TN[u.t]+'</div><div class="im">'+(u.url?'<img src="'+cardUrl(k)+'" alt="">':'<span style="font-size:calc(5*var(--sh))">'+u.e+'</span>')+'</div><div class="lv">🔒 잠김</div><div class="nm">'+(u.nick?'<small>'+u.nick+'</small>':'')+u.n+'</div></div>'}).join('')).join('')}
function renderChars(){const own=ownedList();const g=$('mGrid');SAVE.frag=SAVE.frag||{};
  const card=k=>{const u=U[k],lv=SAVE.lv[k]||1,need=fragNeed(lv),pc=Math.min(need,SAVE.frag[k]||0);
    return '<div class="card" data-k="'+k+'" style="background:'+TC[u.t]+'"><div class="pk">'+pic(u.planet)+PLANETS[u.planet]+'</div><div class="k">'+TN[u.t]+'</div><div class="im">'+(u.url?'<img src="'+cardUrl(k)+'" alt="">':'<span style="font-size:calc(5*var(--sh))">'+u.e+'</span>')+'</div><div class="lv">Lv.'+lv+(lv>1?' <small style="opacity:.85">+'+(lv-1)*5+'%</small>':'')+'</div><div class="bar"><i style="width:'+(pc/need*100)+'%"></i><b>🧩 '+pc+'/'+need+'</b></div><div class="nm">'+(u.nick?'<small>'+u.nick+'</small>':'')+u.n+'</div><div class="tgs">'+tagH([...new Set([rngTag(k)].concat(PVT[k]||[],SPT[k]||[]))])+'</div></div>'};
  const ps=SAVE.cSort!=='tier';$('mSortT').classList.toggle('on',!ps);$('mSortP').classList.toggle('on',ps);
  if(ps){const pls=[...new Set(own.map(k=>U[k].planet))].sort((a,b)=>PLANETS[a].localeCompare(PLANETS[b],'ko'));
    g.innerHTML=fusionCards()+heroHead()+pls.map(p=>{const hs=own.filter(k=>U[k].planet===p).sort((a,b)=>U[a].t-U[b].t);return '<div class="lockH pgh">'+pic(p)+' <b>'+PLANETS[p]+'</b> <small>'+hs.length+'종</small></div>'+hs.map(card).join('')}).join('')+lockCards()}
  else g.innerHTML=fusionCards()+heroHead()+own.slice().sort((a,b)=>U[b].t-U[a].t||(SAVE.lv[b]||1)-(SAVE.lv[a]||1)).map(card).join('')+lockCards();
  skStrip();g.onclick=e=>{const c=e.target.closest('[data-k]');if(c&&U[c.dataset.k])heroDetail(c.dataset.k)};
  $('mOwn').textContent=own.length+'종';$('mBox').innerHTML=(v5u('random_box/closed')?v5img('random_box/closed','','width:1.8em;height:1.8em;vertical-align:middle'):'')+(SAVE.boxes||0)+'개';$('mOpen').disabled=!(SAVE.boxes>0);$('mOpenA').disabled=!(SAVE.boxes>1);$('mCnt').textContent=own.length+'/'+Object.keys(U).filter(k=>!U[k].hidden).length;
  $('mOpenA').onclick=()=>{const A=openAllBoxes();if(A){const L=$('mLoot');renderChars();L.style.display='block';L.style.color='#fff';L.style.textAlign='center';L.onclick=e=>{if(e.target.closest('.lootX')){L.style.display='none';L.innerHTML=''}};L.innerHTML='<button class="lootX">✕ 닫기</button>'+(v5u('random_box/open')?'<div style="text-align:center">'+v5img('random_box/open','','width:30%;max-width:120px;animation:pgflip .4s both')+'</div>':'')+lootAllHTML(A);try{SND.play('jackpot')}catch(e){}}};
$('mOpen').onclick=()=>{const r=openBoxes();if(r){const L=$('mLoot');renderChars();L.style.display='block';L.style.color='#fff';L.style.textAlign='center';L.onclick=e=>{if(e.target.closest('.lootX')){L.style.display='none';L.innerHTML=''}};L.innerHTML='<button class="lootX">✕ 닫기</button>'+(v5u('random_box/open')?'<div style="text-align:center">'+v5img('random_box/open','','width:30%;max-width:120px;animation:pgflip .4s both')+'</div>':'')+lootHTML(r)}}}
function showMain(v){SND.bg(true);$('main').style.display='flex';$('mHome').classList.toggle('on',v!=='chars'&&v!=='rank'&&v!=='plan');$('mPlan').classList.toggle('on',v==='plan');if(v==='plan'){PLD=null;plRender()}plBtn();$('mChars').classList.toggle('on',v==='chars');$('mRank').classList.toggle('on',v==='rank');$('bSnd').style.display=(v==='chars'||v==='rank'||v==='plan')?'none':'';$('bMenu').style.display='none';if(v==='chars')renderChars();if(v==='rank')rkRender();
  const ks=ownedList().filter(k=>U[k].url),pls=Object.keys(PLANETS).filter(p=>ks.some(k=>U[k].planet===p)),M=$('mascot'),sh=parseFloat(getComputedStyle(M).getPropertyValue('--sh'))||5.7,H0=(pls.length<=3?11:pls.length<=5?8.5:7)*sh;M.innerHTML='';
  const bbox=im=>{if(im._bb)return im._bb;const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.drawImage(im,0,0,64,64);const d=x.getImageData(0,0,64,64).data;let x0=64,y0=64,x1=0,y1=0;for(let y=0;y<64;y++)for(let q=0;q<64;q++)if(d[(y*64+q)*4+3]>40){if(q<x0)x0=q;if(q>x1)x1=q;if(y<y0)y0=y;if(y>y1)y1=y}return im._bb=x1<x0?[0,0,1,1]:[x0/64,y0/64,(x1+1)/64,(y1+1)/64]};
  for(const p of pls){const g=document.createElement('div');g.className='grp';const row=document.createElement('div');row.className='row';const hs=ks.filter(k=>U[k].planet===p).sort((a,b)=>U[a].t-U[b].t),ord=[];hs.slice().reverse().forEach((k,i)=>i%2?ord.unshift(k):ord.push(k));
    ord.forEach((k,i)=>{const t=U[k].t,h=H0*(.78+t*.08),b=document.createElement('span');b.className='hb';b.style.zIndex=10-t;b.style.marginBottom=(-t*H0*.035)+'px';const im=new Image();im.alt=U[k].n;
      im.onload=()=>{const[x0,y0,x1,y1]=bbox(im),S=h/(y1-y0),w=(x1-x0)*S;b.style.width=w+'px';b.style.height=h+'px';b.style.marginLeft=b.style.marginRight=(-w*.13)+'px';im.style.width=im.style.height=S+'px';im.style.left=(-x0*S)+'px';im.style.top=(-y0*S)+'px'};im.src=U[k].url;b.appendChild(im);row.appendChild(b)});
    const lb=document.createElement('span');lb.className='pl';lb.innerHTML=pic(p)+PLANETS[p];g.appendChild(row);g.appendChild(lb);M.appendChild(g)}}
let PLD=null;
function plRender(){const av=plAvail(),need=Math.min(PL_MAX,av.length),E=$('mPGrid');if(!E)return;if(!PLD)PLD=plIn().slice();
  E.innerHTML=plAll().map(p=>{const lk=!plUnlocked(p),on=PLD.includes(p),hs=Object.keys(U).filter(k=>U[k].planet===p&&!U[k].hidden).sort((a,b)=>U[a].t-U[b].t),d=PLANET_DESC[p]||['',''];
    return '<button class="pc'+(on?' on':'')+(lk?' lock':'')+'" data-p="'+p+'"><span class="ck">'+(lk?'🔒':on?'✅':'')+'</span><div class="ph">'+(PICON[p]?'<img src="'+PICON[p]+'" alt="">':'')+'<b>'+PLANETS[p]+'</b></div><div class="hs">'+hs.map(k=>U[k].url?'<img src="'+U[k].url+'" alt="">':'').join('')+'</div><div>'+d[0]+'</div><div class="sy">시너지 · '+(PSYN[p]?PSYN[p].x:'-')+'</div>'+(lk?'<div class="lk">🔒 '+LOCKP[p].x+' 시 해금<br>(내 최고 '+(SAVE.best||0)+'웨이브)</div>':'')+'</button>'}).join('');
  {const F0=$('mPFu');if(F0)F0.remove();const F=document.createElement('div');F.id='mPFu';E.appendChild(F);const ids=Object.keys(FUSION).filter(id=>U[id]),row=id=>{const pls=[...new Set(fuBase(id).map(k=>U[k].planet))],ok=pls.every(q=>PLD.includes(q));return [ok,'<div class="fur'+(ok?' ok':'')+'">'+(U[id].url?'<img class="fp" src="'+cardUrl(id)+'" alt="">':'')+'<div class="ft"><b>'+FUSION[id].n+'</b><small>'+FUSION[id].nick+'</small><span>'+pls.map(q=>'<i class="'+(PLD.includes(q)?'y':'n')+'">'+(PICON[q]?'<img src="'+PICON[q]+'" alt="">':'')+PLANETS[q]+'</i>').join('')+'</span></div><em>'+(ok?'✨ 가능':'행성 부족')+'</em></div>']};
   const R=ids.map(row).sort((a,b)=>b[0]-a[0]);F.innerHTML='<div class="fuh2">✨ 이 행성들로 만들 수 있는 특수 조합 <b>'+R.filter(r=>r[0]).length+'</b> / '+R.length+'</div>'+R.map(r=>r[1]).join('')}
  $('mPCnt').textContent=PLD.length+' / '+need;$('mPStart').disabled=PLD.length!==need;
  E.querySelectorAll('.pc').forEach(b=>b.onclick=()=>{const p=b.dataset.p;if(!plUnlocked(p)){toast('🔒 '+PLANETS[p]+' — '+LOCKP[p].x+' 시 해금');return}
    if(av.length<=PL_MAX){toast('지금은 행성 '+av.length+'개가 모두 들어가요. 새 행성을 해금하면 바꿀 수 있어요');return}
    const i=PLD.indexOf(p);if(i>=0)PLD.splice(i,1);else{if(PLD.length>=need){toast('행성은 '+need+'개까지 — 먼저 하나를 빼세요');return}PLD.push(p)}
    if(PLD.length===need){SAVE.pl=PLD.slice();saveAll()}plRender()})}
function plBtn(){const B=$('mPlB');if(!B)return;const av=plAvail().length,all=plAll().length;B.innerHTML='🪐 행성 고르기'+(SAVE.plNew?' <b style="background:#ff4a6a;color:#fff;border-radius:8px;padding:0 6px;font-size:.7em;font-weight:400">NEW</b>':'')}
function mainStart(){$('main').style.display='none';start()}
$('mPRec').onclick=()=>{PLD=plRec();SAVE.pl=PLD.slice();saveAll();plRender();toast('⭐ 추천 편성 — 특수 조합을 가장 많이 만들 수 있는 7개')};$('mAcct').onclick=()=>acView();acUI();$('mSortT').onclick=()=>{SAVE.cSort='tier';saveAll();renderChars()};$('mSortP').onclick=()=>{SAVE.cSort='planet';saveAll();renderChars()};$('mPlB').onclick=()=>{SAVE.plNew=0;saveAll();showMain('plan')};$('mPBack').onclick=()=>showMain('home');$('mPStart').onclick=()=>{const need=Math.min(PL_MAX,plAvail().length);if(PLD&&PLD.length===need){SAVE.pl=PLD.slice();saveAll()}mainStart()};plBtn();$('mStart').onclick=mainStart;$('mStart2').onclick=mainStart;$('mChar').onclick=()=>showMain('chars');$('mBack').onclick=()=>showMain('home');$('mRankB').onclick=()=>showMain('rank');$('mRBack').onclick=()=>showMain('home');$('mStart3').onclick=()=>$('mStart').click();
showMain('home');
// ---------- 인트로 스토리 ----------
const INTRO_BG=[__P(2298),__P(2299),__P(2300),__P(2301),__P(2302)],EMB_JERUK=__P(2303),EMB_COUNCIL=__P(2304);
const INTRO=[
 {t:'우주에는 수많은 행성과<br>다양한 생명이 존재합니다.',a:()=>''},
 {t:'각 행성마다 위대한 영웅들이 있고,<br>모든 영웅은 각자의 <b>집</b>에서, <b>동네</b>에서,<br><b>나라</b>에서, <b>행성</b>에서 존경받습니다.',h:'60%',a:()=>['gamer','veteran','napoleon','jir'].map((k,i)=>U[k]&&U[k].url?'<span class="step" style="animation-delay:'+i*.25+'s;text-shadow:0 2px 4px #000"><img style="--h:'+(9+i*2.6)+'" src="'+U[k].url+'">'+TN[i]+'</span>':'').join('')},
 {t:'종종 아주 강력하고 위대한 영웅은<br><b>‘우주 히어로’</b>라는 이름으로 추앙받습니다.',h:'50%',a:()=>'<span class="big" style="display:flex;align-items:flex-end">'+Object.keys(U).filter(k=>U[k].t===4&&U[k].url&&!U[k].hidden).map((k,i)=>'<img style="animation:iin .7s '+i*.25+'s both;margin:0 calc(-2*var(--sh))" src="'+U[k].url+'">').join('')+'</span>'},
 {t:'<b>우주평화위원회</b>인 당신은<br>현재까지 <b>7개의 행성</b>과<br>평화협정을 맺었습니다.',h:'62%',a:()=>'<img src="'+EMB_COUNCIL+'" alt="" style="height:calc(10*var(--sh));filter:drop-shadow(0 0 10px #ffd23e)">'},
 {t:'각 행성의 영웅들을 모집하여,<br>우주 정복을 노리는 <i>‘제륵’ 행성</i>의 적들로부터<br>행성을 보호하세요.',red:1,h:'62%',a:()=>'<img src="'+EMB_JERUK+'" alt="" style="height:calc(12*var(--sh));filter:drop-shadow(0 0 12px #ff2a3a)">'}];
let introI=0,introTm=null;
function introShow(i){introI=i;const sc=INTRO[i],I=$('intro');I.classList.toggle('red',!!sc.red);I.classList.add('bg');I.style.setProperty('--ah',sc.h||'58%');{const B=$('iBg');B.src=INTRO_BG[i];B.style.animation='none';void B.offsetWidth;B.style.animation=''}$('iArt').innerHTML=sc.a();$('iDots').innerHTML=INTRO.map((_,j)=>'<span class="'+(j===i?'on':'')+'"></span>').join('');
  $('iHint').textContent=i===INTRO.length-1?'화면을 눌러 시작':'화면을 눌러 계속';const T=$('iTxt'),full=sc.t;clearInterval(introTm);let n=0;const plain=full.replace(/<[^>]+>/g,'');T.dataset.done='';
  introTm=setInterval(()=>{n+=1;let out='',c=0,tag=false;for(const ch of full){if(ch==='<')tag=true;if(tag){out+=ch;if(ch==='>')tag=false;continue}if(c>=n)break;out+=ch;c++}T.innerHTML=out;if(n>=plain.length){clearInterval(introTm);T.innerHTML=full;T.dataset.done='1'}},38)}
function introOpen(){$('intro').style.display='flex';introShow(0)}


// ---------- 상황별 도움말: 필요할 때 한 번씩 (게임은 안 멈춤) ----------
const TIP={cur:null,last:0,t0:0};
function tipSeen(id){if(!SAVE.tips&&SAVE.tut)SAVE.tips={summon:1,merge:1,move:1,up:1};return SAVE.tips&&SAVE.tips[id]}
const TIPS=[
 {id:'summon',when:()=>G.summons===0&&G.time>1.2,at:'#summon',x:'🎲 <b>소환</b>을 눌러 영웅을 뽑아! 적이 <b>100마리</b> 넘게 쌓이면 ❤️ 체력이 깎여.',done:()=>G.summons>0},
 {id:'merge',when:()=>readyCells().length>0,at:()=>readyCells()[0],x:()=>G.sel!==null&&$('bM')?'⭐ <b>▲ 승급</b> 버튼을 눌러!':'⭐ 같은 영웅 <b>3명</b>이 모였어! 반짝이는 칸을 눌러 <b>승급</b>해.',done:()=>!readyCells().length},
 {id:'move',when:()=>total()>=6&&tipSeen('merge'),at:'board',x:'✋ 영웅을 <b>꾹 눌러 끌면</b> 자리를 옮겨. 같은 영웅끼리는 한 칸에 합쳐져.',done:()=>G.mv},
 {id:'up',when:()=>G.wave>=4&&G.coins>=250,at:'#bUp',x:'⬆ 남는 코인은 <b>강화</b>에! 행성 공격력·소환 확률을 올려.',done:()=>sheet==='up'},
 {id:'craft',when:()=>{const b=$('bCraft');return b&&b.style.display!=='none'&&b.innerHTML},at:'#bCraft',x:'🌌 <b>조합</b> 가능! 눌러서 우주 히어로를 만들어 — 엄청 세.',done:()=>G.cells.some(c=>c&&U[c.u].t>=4)},
 {id:'gam',when:()=>G.stones>=1,at:'#bGam',x:'🍀 <b>행운석</b>이 생겼어! <b>복권</b>을 긁으면 코인이나 영웅이 나와.',done:()=>sheet==='gam'},
 {id:'bty',when:()=>G&&G.pq&&G.pq.st==='offer',at:'#bBty',x:'📡 <b>행성 긴급 지원</b> — 눌러서 내용을 보고 지원할지 골라. 무시해도 괜찮아.'},
 {id:'boss',when:()=>G.wave%10===9,at:null,x:'👹 다음 웨이브는 <b>보스</b>! 60초 안에 못 잡으면 적 15마리 몫으로 쌓여.'},
 {id:'conc',when:()=>false&&(()=>{const L=G.cells.filter(c=>c&&U[c.u].t>=4).map(c=>c.u);return L.length!==new Set(L).size})(),at:()=>G.cells.findIndex(c=>c&&U[c.u].t>=4&&G.cells.filter(q=>q&&q.u===c.u).length>1),x:'🔮 같은 우주 히어로가 2명! 칸을 <b>두 번 빠르게</b> 누르면 <b>농축</b> — 한 칸에 겹쳐 훨씬 세져.'},
 {id:'lock',when:()=>G.cells.some(c=>c&&U[c.u].t===3),at:()=>G.cells.findIndex(c=>c&&U[c.u].t===3),x:'🔒 행성 등급! 칸을 눌러 <b>재료 잠금</b>하면 조합 재료로 안 쓰여서 시너지용으로 남길 수 있어.'},
 {id:'many',when:()=>G.mobs.length>=100,at:'#mbar',x:'💀 적이 <b>100마리</b>를 넘었어! 이제 2초마다 ❤️ 체력이 깎여 — 99마리 아래로 줄이면 멈춰.'},
];
function tipHide(){const T=$('tip');if(T)T.style.display='none';TIP.cur=null}
function tipShow(S){const T=$('tip');SAVE.tips=SAVE.tips||{};SAVE.tips[S.id]=1;saveAll();TIP.cur=S;TIP.t0=performance.now();T.style.display='block';tipDraw()}
function tipDraw(){const S=TIP.cur;if(!S)return;const T=$('tip'),H2=T.querySelector('.th2'),B=T.querySelector('.tb2');let at=typeof S.at==='function'?S.at():S.at;if(typeof at==='number'&&at<0)at=null;const R=at!=null?tutRect(at):null;
  if(R){Object.assign(H2.style,{display:'block',left:R.x+'px',top:R.y+'px',width:R.w+'px',height:R.h+'px'})}else H2.style.display='none';
  const x=typeof S.x==='function'?S.x():S.x;if(B.dataset.x!==x){B.dataset.x=x;B.innerHTML='<span>'+x+'</span><button>알겠어</button>';B.querySelector('button').onclick=e=>{e.stopPropagation();TIP.last=performance.now();tipHide()}}
  const sh=$('stage').offsetHeight,bh=B.offsetHeight;let top;if(!R)top=sh*.3;else{const below=R.y+R.h+10,above=R.y-10-bh;top=R.y+R.h/2>sh*.5?(above>=6?above:below):(below+bh<=sh-6?below:above)}B.style.top=Math.max(6,Math.min(sh-bh-6,top))+'px'}
function tipTick(){if(!G||G.over||G.pause||TUT||!running||$('main').style.display==='flex'){if(TIP.cur)tipHide();return}
  const now=performance.now();if(TIP.cur){const S=TIP.cur;if((S.done&&S.done())||now-TIP.t0>9000){TIP.last=now;tipHide()}else tipDraw();return}
  if(now-TIP.last<5000)return;for(const S of TIPS){if(tipSeen(S.id))continue;let ok=false;try{ok=S.when()}catch(e){}if(ok){tipShow(S);return}}}
setInterval(tipTick,300);
// ---------- 튜토리얼 (첫 판 / 메인에서 다시 하기) ----------
let TUT=null;
function tutRect(t){const st=$('stage').getBoundingClientRect(),k=st.width/$('stage').offsetWidth;
  if(typeof t==='number'){const cr=cv.getBoundingClientRect(),[x,y]=cellXY(t),sx=cr.width/W,sy=cr.height/H;return{x:(cr.left-st.left)/k+(x-CS/2)*sx/k-3,y:(cr.top-st.top)/k+(y-CS/2)*sy/k-3,w:CS*sx/k+6,h:CS*sy/k+6}}
  if(t==='board'){const cr=cv.getBoundingClientRect(),[x0,y0]=cellXY(0),[x1,y1]=cellXY(NC-1),sx=cr.width/W,sy=cr.height/H;return{x:(cr.left-st.left)/k+(x0-CS*.6)*sx/k,y:(cr.top-st.top)/k+(y0-CS*.6)*sy/k,w:(x1-x0+CS*1.2)*sx/k,h:(y1-y0+CS*1.2)*sy/k}}
  if(t==='path'){const cr=cv.getBoundingClientRect(),[x0,y0]=cellXY(0),[x1,y1]=cellXY(NC-1),sx=cr.width/W,sy=cr.height/H,e=CS*1.15;const X0=Math.max(0,x0-CS/2-e),Y0=Math.max(0,y0-CS/2-e),X1=Math.min(W,x1+CS/2+e),Y1=Math.min(H,y1+CS/2+e);return{x:(cr.left-st.left)/k+X0*sx/k,y:(cr.top-st.top)/k+Y0*sy/k,w:(X1-X0)*sx/k,h:(Y1-Y0)*sy/k}}
  const e=typeof t==='string'?document.querySelector(t):null;if(!e||!e.offsetParent&&getComputedStyle(e).position!=='fixed')return null;const r=e.getBoundingClientRect();if(!r.width)return null;return{x:(r.left-st.left)/k-4,y:(r.top-st.top)/k-4,w:r.width/k+8,h:r.height/k+8}}
function tutCellK(){for(const i of [12,11,13,7,17,6,8,16,18,2,22,10,14]){if(i<NC&&!G.cells[i]&&!BLK.has(i))return i}return G.cells.findIndex((c,j)=>!c&&!BLK.has(j))}
const TUTS=[
 {t:'🎲 소환',at:'#summon',do:1,x:'❤️ 체력이 0이 되기 전에 막아!<br><span class="do">소환을 3번 눌러 봐.</span> (지금은 무료)',
  on:()=>{G.freeN=Math.max(G.freeN||0,3);TUT.s0=G.summons;refresh()},ok:()=>G.summons>=TUT.s0+3},
 {t:'⭐ 승급',do:1,x:()=>'같은 영웅 <b>3명</b>이 모이면 승급!<br><span class="do">'+(G.sel===TUT.mi&&$('bM')?'<b>▲ 승급</b> 버튼을 눌러!':'반짝이는 칸을 눌러 봐.')+'</span>',
  on:()=>{const i=tutCellK(),k=(BY.find((b,t)=>t<3&&b.length&&BY[t+1]&&BY[t+1].length)||BY[1])[0];G.cells[i]={u:k,n:3,cd:0,b:0,pop:.25,ax:0,ay:0,sc:0};TUT.mi=i;TUT.mk=k;G.sel=null;refresh()},
  at:()=>G.sel===TUT.mi&&$('bM')?'#bM':TUT.mi,ok:()=>{const c=G.cells[TUT.mi];return !c||c.u!==TUT.mk||c.n<3}},
 {t:'🚀 끝!',x:'영웅은 끌어서 옮기고, 남는 코인은 <b>⬆ 강화</b>에!<br>나머지는 하면서 익히면 돼.'}];
function tutStart(){if(!G)return;TUT={i:-1};G.pause=true;G.tutOn=1;$('tut').style.display='block';tutGo(0);clearInterval(TUT.tm);TUT.tm=setInterval(tutTick,200)}
function tutGo(i){const P=TUTS[TUT.i];if(P&&P.off)P.off();TUT.i=i;while(TUT.i<TUTS.length&&TUTS[TUT.i].skipIf&&TUTS[TUT.i].skipIf())TUT.i++;if(TUT.i>=TUTS.length)return tutEnd();const S=TUTS[TUT.i];if(S.on)S.on();tutDraw()}
function tutNext(){tutGo(TUT.i+1)}
function tutEnd(){if(!TUT)return;const P=TUTS[TUT.i];if(P&&P.off)P.off();clearInterval(TUT.tm);TUT=null;$('tut').style.display='none';SAVE.tut=1;saveAll();if(G){G.tutOn=0;G.pause=false;sheet=null;refresh()}}
function tutDraw(){if(!TUT)return;const S=TUTS[TUT.i],B=$('tutB'),Hh=$('tutH'),C=$('tutC');let at=typeof S.at==='function'?S.at():S.at;const R=at!=null?tutRect(at):null;
  if(R){Object.assign(Hh.style,{left:R.x+'px',top:R.y+'px',width:R.w+'px',height:R.h+'px'});Hh.className='th'+(S.do?' pulse':'')}else{Object.assign(Hh.style,{left:'50%',top:'50%',width:'0px',height:'0px'});Hh.className='th no'}
  C.style.display=S.do?'none':'block';
  B.innerHTML='<div class="tt">'+S.t+'</div>'+(typeof S.x==='function'?S.x():S.x)+'<div class="tf"><button class="sk" id="tutSk">건너뛰기</button><small>'+(TUT.i+1)+' / '+TUTS.length+'</small>'+(S.do&&!S.next?'<span style="width:60px"></span>':'<button id="tutNx">'+(TUT.i===TUTS.length-1?'시작! ▶':S.do?'넘어가기 ▶':'다음 ▶')+'</button>')+'</div>';
  const sh=$('stage').offsetHeight,bh=B.offsetHeight;B.style.bottom='';let top;if(!R)top=sh*.32;else{const below=R.y+R.h+10,above=R.y-10-bh;if(R.y+R.h/2>sh*.5)top=above>=6?above:(below+bh<=sh-6?below:sh-bh-6);else top=below+bh<=sh-6?below:(above>=6?above:sh-bh-6)}B.style.top=Math.max(6,Math.min(sh-bh-6,top))+'px';
  $('tutSk').onclick=e=>{e.stopPropagation();tutEnd()};if($('tutNx'))$('tutNx').onclick=e=>{e.stopPropagation();tutNext()};TUT.key=JSON.stringify(R)}
function tutTick(){if(!TUT)return;if(!G||G.over||$('main').style.display==='flex'){tutEnd();return}const S=TUTS[TUT.i];G.pause=true;
  if(S.do&&S.ok&&S.ok()){tutNext();return}const at=typeof S.at==='function'?S.at():S.at,R=at!=null?tutRect(at):null;if(JSON.stringify(R)!==TUT.key)tutDraw()}
$('tutC').onclick=()=>{if(TUT&&!TUTS[TUT.i].do)tutNext()};
$('mTut').onclick=()=>{SAVE.tips={};saveAll();toast('📘 도움말을 처음부터 다시 보여 줄게요');mainStart()};
function introClose(){clearInterval(introTm);$('intro').style.display='none';SAVE.intro=1;saveAll();if(!SAVE.pg)pgOpen()}
$('intro').onclick=e=>{if(e.target.id==='iSkip'){introClose();return}const T=$('iTxt');if(!T.dataset.done){clearInterval(introTm);T.innerHTML=INTRO[introI].t;T.dataset.done='1';return}if(introI<INTRO.length-1)introShow(introI+1);else introClose()};

// ---------- 첫 진입: 행성 영웅 랜덤박스 ----------
let pgI=0,pgOrder=[],pgState='',pgTm=null;
function pgDots(){$('pgDots').innerHTML=pgOrder.map((p,j)=>'<i class="'+(j<pgI?'on':'')+'">'+(j<pgI&&PICON[p]?'<img src="'+PICON[p]+'" alt="">':'')+'</i>').join('')}
function pgOpen(){pgOrder=plAvail().sort(()=>Math.random()-.5);pgI=0;$('pg').style.display='flex';pgBox()}
function pgBox(){pgState='box';pgDots();$('pgSub').innerHTML='우주 어딘가의 행성 하나가 당신과 평화협정을 맺습니다.<br>상자 '+(pgI+1)+' / '+pgOrder.length;$('pgStage').innerHTML='<div id="pgBox">🎁</div>';$('pgHint').textContent='상자를 눌러 열기'}
function pgRoll(){pgState='roll';const p=pgOrder[pgI],keys=Object.keys(PICON),left=pgOrder.slice(pgI),S=$('pgStage');$('pgHint').textContent='';$('pgSub').textContent='수많은 행성 중에서…';
  S.innerHTML='<div id="pgRoll"><img><img class="c"><img></div><div id="pgName">???</div>';const im=S.querySelectorAll('img'),nm=$('pgName');let n=0;const N=11;
  const step=()=>{n++;const last=n>=N;SND.play('roll');im.forEach((e,q)=>{const dark=!(last&&q===1)&&Math.random()<.62,k=last&&q===1?p:(dark?keys[Math.floor(Math.random()*keys.length)]:left[Math.floor(Math.random()*left.length)]);e.src=PICON[k];e.classList.toggle('dk',dark);if(q===1)nm.textContent=dark?'???':PLANETS[k]});
    if(last){pgTm=setTimeout(pgWin,120);return}pgTm=setTimeout(step,32+n*n*.9)};step()}
const PLANET_DESC={
 earth:['평범한 사람들이 영웅이 되는 푸른 행성','투척·총기·번개로 정면 화력을 낸다'],
 purmia:['초원·설산·바다의 동물들이 사는 행성','감속·약화·아군 공속 지원에 강하다'],
 toytopia:['버려진 장난감들이 깨어난 행성','근접 난타·초장거리 저격·속박·저주가 특기'],
 gearon:['기계와 로봇이 다스리는 행성','관통 광선과 미사일 폭격으로 넓게 쓸어낸다'],
 mosaica:['저주받은 괴수들이 지배하는 행성','코인을 벌고, 매번 다른 효과와 아군 지원으로 판을 흔든다'],
 florasia:['살아 있는 식물들의 행성','독 장판·처형, 서로 붙어 있을수록 강해진다'],
 mongle:['말랑한 젤리족이 사는 행성','감속·밀치기·시간 정지로 발을 묶고 별 구슬로 연쇄'],
 haeyeon:['심해 종족이 사는 바다 행성 · 강한 행성','조개 주먹·집게창·산호·닻으로 몰아붙이고 해일로 쓸어 버린다'],
 seolryeong:['눈과 얼음의 정령들이 사는 행성 · 강한 행성','눈덩이·고드름으로 적을 얼려 느리게 만든다'],
 biikseong:['바람을 타는 조인족의 행성 · 강한 행성','바람 화살·회오리·황금 창·불꽃 깃털로 꿰뚫고 휩쓴다'],
 drakanis:['정의로운 용족의 행성 · 강한 행성','불꽃과 번개로 넓은 범위를 한꺼번에 태운다'],
 lumiel:['달빛 요정들이 사는 행성 · 강한 행성','잠재우기·기절·아군 축복, 근접 대검까지 고루 갖췄다']};
function pgWin(){pgState='win';SND.play('reveal');const p=pgOrder[pgI],hs=Object.keys(U).filter(k=>U[k].planet===p&&!U[k].hidden).sort((a,b)=>U[a].t-U[b].t);pgI++;pgDots();$('pgSub').innerHTML='<b style="color:#ffe066">'+PLANETS[p]+'</b> 행성과 평화협정 체결!';
  $('pgStage').innerHTML='<div id="pgWin" style="--pc:'+PLANET_COL[p]+'"><img class="big" src="'+PICON[p]+'" alt=""><div id="pgName" style="--pc:'+PLANET_COL[p]+'">'+PLANETS[p]+'</div>'+(PLANET_DESC[p]?'<div class="pgd">'+PLANET_DESC[p][0]+'<b>'+PLANET_DESC[p][1]+'</b></div>':'')+'<div id="pgCards">'+hs.map((k,j)=>'<div class="pgc" style="background:'+TC[U[k].t]+';animation-delay:'+(.1+j*.06)+'s"><small>'+TN[U[k].t]+'</small><img src="'+(U[k].url||'')+'" alt=""><b>'+U[k].n+'</b></div>').join('')+'</div></div>';
  $('pgHint').textContent=pgI<pgOrder.length?'화면을 눌러 다음 상자':'화면을 눌러 계속'}
function pgEnd(){pgState='end';const n=Object.keys(U).length;$('pgSub').innerHTML='<b style="color:#ffe066">'+pgOrder.length+'개 행성</b>, <b style="color:#ffe066">'+n+'명의 영웅</b>이 합류했습니다.<br>우주에는 아직 만나지 못한 행성이 훨씬 많습니다.';
  $('pgStage').innerHTML='<div id="pgAll">'+pgOrder.map((p,j)=>'<span style="animation-delay:'+j*.07+'s"><img src="'+PICON[p]+'" alt="">'+PLANETS[p]+'</span>').join('')+[0,1,2,3,4].map(j=>'<span class="lk" style="animation-delay:'+(.5+j*.07)+'s"><img src="'+PICON[pgOrder[(j*3+1)%pgOrder.length]]+'" alt="">???</span>').join('')+'</div>';$('pgHint').textContent='화면을 눌러 시작'}
function pgClose(){clearTimeout(pgTm);$('pg').style.display='none';SAVE.pg=1;saveAll()}
$('pg').onclick=()=>{if(pgState==='box')pgRoll();else if(pgState==='roll'){clearTimeout(pgTm);pgWin()}else if(pgState==='win'){if(pgI<pgOrder.length)pgBox();else pgEnd()}else if(pgState==='end')pgClose()};
$('mStory').onclick=introOpen;$('mPg').onclick=pgOpen;
drag=null;
function evPos(e){const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height]}
function cellAt(x,y){for(let i=0;i<NC;i++){if(BLK.has(i))continue;const[cx,cy]=cellXY(i);if(Math.abs(x-cx)<=CS/2&&Math.abs(y-cy)<=CS/2)return i}return-1}
function moveCell(a,b){const A=G.cells[a],C=G.cells[b];if(!A)return;if(TUT)TUT.mv=1;G.mv=1;
  if(C&&C.u===A.u&&U[C.u].t>=4){concDo(a,b);return}
  if(C&&C.u===A.u&&C.n+A.n<=3&&U[C.u].t<4){C.n+=A.n;if(A.lk)C.lk=1;C.sc=Math.max(C.sc||0,A.sc||0);C.cd=Math.max(C.cd||0,A.cd||0);C.kills=(C.kills||0)+(A.kills||0);C.pop=.2;G.cells[a]=null;if(C.n===3)hint3(C.u)}else{G.cells[b]=A;G.cells[a]=C;A.pop=.2;if(C&&C.u!==A.u)toast(U[A.u].n+' ↔ '+U[C.u].n+' 자리 교체 (같은 캐릭터만 묶여요)');else if(C&&C.u===A.u&&C.n+A.n>3)toast('한 칸에는 3명까지! 3명 모인 칸을 눌러 승급하세요')}}
cv.addEventListener('pointerdown',e=>{
  if(!G||G.over)return;const[x,y]=evPos(e),i=cellAt(x,y);
  if(i>=0&&G.cells[i]){drag={i,sx:x,sy:y,x,y,on:false};try{cv.setPointerCapture(e.pointerId)}catch(_){}}
  else{if(i>=0&&G.sel!==null&&G.cells[G.sel]){moveCell(G.sel,i)}G.sel=null;refresh()}
});
cv.addEventListener('pointermove',e=>{
  if(!drag)return;const[x,y]=evPos(e);drag.x=x;drag.y=y;
  if(!drag.on&&Math.hypot(x-drag.sx,y-drag.sy)>8){drag.on=true;G.sel=null;refresh()}
});
const dragEnd=e=>{
  if(!drag)return;const d=drag;drag=null;
  if(G.over)return;
  if(d.on){const j=cellAt(d.x,d.y);if(j>=0&&j!==d.i)moveCell(d.i,j)}
  else{const now=performance.now(),dbl=tapI===d.i&&now-tapAt<400,c=G.cells[d.i];tapI=d.i;tapAt=now;
    const sc=G.sel!==null&&G.sel!==d.i?G.cells[G.sel]:null;let oj=-1;if(dbl&&c&&U[c.u].t>=4){for(let q=0;q<NC;q++){const o=G.cells[q];if(q!==d.i&&o&&o.u===c.u&&(oj<0||(o.k||1)>(G.cells[oj].k||1)))oj=q}}
    if(dbl&&c&&!c.lk&&c.n===3&&U[c.u].t<3&&BY[U[c.u].t+1].length){tapI=-1;G.sel=d.i;merge();G.sel=null}else if(oj>=0){tapI=-1;concDo(d.i,oj);G.sel=null}else if(dbl&&c&&U[c.u].t>=4){tapI=-1;toast('🔮 같은 우주 히어로가 하나 더 있어야 농축할 수 있어요')}else if(sc&&c&&sc.u===c.u&&U[c.u].t>=4){concDo(G.sel,d.i);G.sel=null}else if(sc&&c&&sc.u===c.u&&sc.n+c.n<=3&&U[c.u].t<4){moveCell(G.sel,d.i);G.sel=null}else G.sel=G.sel===d.i?null:d.i}
  refresh()
};
cv.addEventListener('pointerup',dragEnd);cv.addEventListener('pointercancel',()=>{drag=null});
window.addEventListener('resize',()=>{layout();if(!running)draw()});
uiInit();setTimeout(layout,50);
G={upPlanet:{},runKills:{},tile:Array(NC).fill(0),tileN:0,cells:Array(NC).fill(null),mobs:[],fx:[],pend:[],sched:[],sel:null,up:[0,0,0],luck:0,summons:0,coins:100,stones:0,wave:1,waveT:20,over:true,time:0,shake:0,flash:0,buff:0};
layout();
// 시작 화면에 몬스터 미리보기
Object.keys(U).slice(0,6).forEach((k,i)=>G.cells[[6,7,8,11,12,13][i]]={u:k,n:1,cd:0,b:0});
draw();G.cells.fill(null);refresh();
