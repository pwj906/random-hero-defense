# 디펜스 원본(src/unppal-defense.html)의 제륵 보스 동작 그림을 서바이버 assets.js 끝에 RH_ASSETS.bossA 로 붙임. 다시 돌리면 덮어씀.
# boss1: JRIMG.boss(걷기4)·bcast(시전4)·bfx(효과4) / boss2~6: V5['bossN'] (0~3 걷기, 4~7 시전, boss6은 8~15가 2페이즈) + V5['bossN/fx/*'] + V5['cutins/bossN']
import json, re
src = open('src/unppal-defense.html', encoding='utf8').read()
def obj(name):
    i = src.find(name + '=') + len(name) + 1
    return json.JSONDecoder().raw_decode(src[i:])[0]
J = obj('JRIMG'); V = obj('const V5')
A = {'boss1': {'walk': J['boss'], 'cast': J['bcast'], 'fx': J['bfx'], 'cut': V.get('cutins/boss1', [None])[0]}}
for n in range(2, 7):
    f = V['boss%d' % n]
    d = {'walk': f[0:4], 'cast': f[4:8], 'fx': V.get('boss%d/fx/skill' % n) or V.get('boss%d/fx/ripple' % n) or [], 'cut': V.get('cutins/boss%d' % n, [None])[0]}
    if len(f) >= 16: d['walk2'] = f[8:12]; d['cast2'] = f[12:16]
    A['boss%d' % n] = d
out = 'survivor/assets.js'
s = open(out, encoding='utf8').read()
s = re.sub(r'\nRH_ASSETS\.bossA=.*?;\n', '\n', s, flags=re.S)
s = s.rstrip('\n') + '\nRH_ASSETS.bossA=' + json.dumps(A) + ';\n'
open(out, 'w', encoding='utf8').write(s)
print('bossA', {k: {kk: (len(vv) if isinstance(vv, list) else bool(vv)) for kk, vv in v.items()} for k, v in A.items()}, len(s))
