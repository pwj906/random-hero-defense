# 이펙트·소품 그림 zip(fx/<묶음>/<이름>_<프레임>.png, props/<구역>/<이름>.png)
# → survivor/assets.js 끝에 RH_ASSETS.fx / RH_ASSETS.props 로 붙임. 다시 돌리면 덮어씀.
import sys, zipfile, io, re, base64, json
from PIL import Image

# 프레임 한 칸을 이 크기(긴 변)로 줄여 넣음
SCALE = {'attack': 112, 'common': 112, 'special': 224, 'reward': 224, 'map': 160}
BIG = {'sp_shot_8': 160, 'proj_shot_4': 48, 'proj_aoe_4': 48, 'proj_pierce_4': 128,
       'bolt_chain_3': 192, 'lightning_6': 256, 'wall_4': 192, 'gate_8': 192,
       'hit_aoe_8': 160, 'ring_slam_7': 160, 'sweep_arc_6': 192, 'slash_melee_5': 128,
       'death_elite_8': 144, 'boss_hit_4': 160, 'meteor_hit_8': 176}

def webp(im, q=78):
    b = io.BytesIO(); im.save(b, 'WEBP', quality=q, method=4)
    return 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()

def main(zp, out='survivor/assets.js'):
    z = zipfile.ZipFile(zp)
    fx, props = {}, {}
    for n in sorted(z.namelist()):
        m = re.search(r'fx/([a-z]+)/([a-z_]+_(\d+))\.png$', n)
        if m:
            grp, key, fr = m.group(1), m.group(2), int(m.group(3))
            im = Image.open(io.BytesIO(z.read(n))).convert('RGBA')
            fw, fh = im.size[0] // fr, im.size[1]
            L = BIG.get(key, SCALE.get(grp, 128))
            k = L / max(fw, fh)
            nw, nh = max(1, round(fw * k)), max(1, round(fh * k))
            im = im.resize((nw * fr, nh), Image.LANCZOS)
            name = key.rsplit('_', 1)[0]
            fx[name] = {'src': webp(im), 'n': fr, 'w': nw, 'h': nh, 'tint': grp in ('attack', 'special')}
            continue
        m = re.search(r'props/([a-z]+)/([a-z_]+)\.png$', n)
        if m:
            im = Image.open(io.BytesIO(z.read(n))).convert('RGBA').resize((96, 96), Image.LANCZOS)
            props.setdefault(m.group(1), []).append(webp(im, 80))
    s = open(out, encoding='utf8').read()
    s = re.sub(r'\nRH_ASSETS\.fx=.*?;\n', '\n', s, flags=re.S)
    s = re.sub(r'\nRH_ASSETS\.props=.*?;\n', '\n', s, flags=re.S)
    s = s.rstrip('\n') + '\nRH_ASSETS.fx=' + json.dumps(fx, ensure_ascii=False) + ';\nRH_ASSETS.props=' + json.dumps(props) + ';\n'
    open(out, 'w', encoding='utf8').write(s)
    print('fx', len(fx), 'props', sum(len(v) for v in props.values()), 'assets.js', len(s))

if __name__ == '__main__':
    main(*sys.argv[1:])
