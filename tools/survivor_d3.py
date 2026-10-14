# 디자인 3 zip(player/·boss/·ui/) → survivor/assets.js 끝에 RH_ASSETS.d3 로 붙임. 다시 돌리면 덮어씀.
# 시트는 가로 한 줄, 이름 끝 _N = 프레임 수. 캐릭터 칸 256, 발 (128,240).
import sys, zipfile, io, re, base64, json
from PIL import Image
SZ = {'player': 168, 'boss': 192, 'ui': 0}
BIG = {'freeze_clock_8': 300, 'phase_burst_8': 300, 'lair_8': 260, 'slam_impact_8': 240, 'berserk_aura_6': 240, 'enrage_aura_6': 240,
       'shield_dome_6': 240, 'bullet_4': 40, 'dash_line_4': 320, 'dash_trail_6': 240, 'arena_wall_4': 160, 'liberated_flag_4': 160, 'summon_portal_8': 180}
def webp(im, q=80):
    b = io.BytesIO(); im.save(b, 'WEBP', quality=q, method=4)
    return 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()
def main(zp, out='survivor/assets.js'):
    z = zipfile.ZipFile(zp); D = {}
    for n in sorted(z.namelist()):
        m = re.search(r'(player|boss|ui)/([a-z_0-9]+)\.png$', n)
        if not m: continue
        grp, key = m.groups(); im = Image.open(io.BytesIO(z.read(n))).convert('RGBA')
        fm = None if grp == 'ui' else re.search(r'_(\d+)$', key); fr = int(fm.group(1)) if fm else 1
        name = re.sub(r'_\d+$', '', key) if fm else key
        fw, fh = im.size[0] // fr, im.size[1]
        if grp == 'ui':
            L = 96 if name.startswith('boss_icon') else 0
            if L: im = im.resize((L, L), Image.LANCZOS); fw = fh = L
            D['ui_' + name] = {'src': webp(im, 85), 'n': 1, 'w': im.size[0], 'h': im.size[1]}; continue
        if name == 'portrait':
            im = im.resize((320, 320), Image.LANCZOS); D['pl_portrait'] = {'src': webp(im, 85), 'n': 1, 'w': 320, 'h': 320}; continue
        L = BIG.get(key, SZ[grp]); k = L / max(fw, fh); nw, nh = round(fw * k), round(fh * k)
        im = im.resize((nw * fr, nh), Image.LANCZOS)
        D[('pl_' if grp == 'player' else 'b_') + name] = {'src': webp(im), 'n': fr, 'w': nw, 'h': nh}
    s = open(out, encoding='utf8').read()
    s = re.sub(r'\nRH_ASSETS\.d3=.*?;\n', '\n', s, flags=re.S)
    s = s.rstrip('\n') + '\nRH_ASSETS.d3=' + json.dumps(D) + ';\n'
    open(out, 'w', encoding='utf8').write(s)
    print(len(D), sorted(D), 'assets.js', len(s))
if __name__ == '__main__': main(*sys.argv[1:])
