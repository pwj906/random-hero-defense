# 행성 그림 zip(planets/<id>/{emblem,flag,card,castle}.png, common/supply.png) → survivor/assets.js 끝에 RH_ASSETS.planet/supply로 붙임
import sys, os, io, json, base64, zipfile, re
from PIL import Image
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IDS={'earth':'지구','faunia':'파우니아','toytopia':'토이토피아','gearon':'기어론','mosaica':'모자이카','florasia':'플로라시아','mongle':'몽글성','lumiel':'루미엘','drakanis':'드라카니스','biikseong':'비익성','seolryeong':'설령성','haeyeon':'해연'}
SIZE={'emblem':(128,128,80),'flag':(192,128,80),'card':(300,420,72),'castle':(256,256,78)}
def enc(data,box,q):
    im=Image.open(io.BytesIO(data));im=im.convert('RGBA' if im.mode in('RGBA','LA','P') else 'RGB');im.thumbnail(box,Image.LANCZOS)
    b=io.BytesIO();im.save(b,'WEBP',quality=q,method=6);return 'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
z=zipfile.ZipFile(sys.argv[1]);names={n.split('/',1)[-1] if n.count('/')>2 else n:n for n in z.namelist()}
planet={}
for n in z.namelist():
    m=re.search(r'planets/([a-z]+)/(emblem|flag|card|castle)\.png$',n)
    if m and m.group(1) in IDS:
        w,h,q=SIZE[m.group(2)];planet.setdefault(IDS[m.group(1)],{})[m.group(2)]=enc(z.read(n),(w,h),q)
sup=[n for n in z.namelist() if n.endswith('common/supply.png')]
supply=enc(z.read(sup[0]),(128,128),80) if sup else None
p=os.path.join(ROOT,'survivor','assets.js');s=open(p,encoding='utf8').read()
s=re.sub(r'\n?RH_ASSETS\.planet=.*$','',s,flags=re.S)
s+='\nRH_ASSETS.planet='+json.dumps(planet,ensure_ascii=False)+';RH_ASSETS.supply='+json.dumps(supply)+';'
open(p,'w',encoding='utf8').write(s)
print({k:sorted(v) for k,v in planet.items()},'supply',bool(supply),'assets.js',len(s))
