# 오토배틀러 원본(src/autobattler.html, 아티팩트 본문 형식) → autobattler/index.html + autobattler/assets.js
# 그림(data URI) 스크립트 줄(<script>const SPR_*=…, BG_SRC=…)을 전부 assets.js로 빼고 HTML은 작게 유지한다.
import os,re,hashlib
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src=open(os.path.join(ROOT,'src','autobattler.html'),encoding='utf8').read()
lines=src.split('\n'); assets=[]; keep=[]
for l in lines:
    if re.match(r'^<script>const (SPR_[A-Z]+|BG_SRC|BGP_SRC)=',l) and l.endswith('</script>'):
        assets.append(l[len('<script>'):-len('</script>')])
    else: keep.append(l)
# 아티팩트 파일 한도(16MB) 때문에 12MB씩 나눠 assets-1.js, assets-2.js… 로 저장
LIM=12*1024*1024
chunks=[[]]; size=0
for a in assets:
    if size+len(a)>LIM and chunks[-1]: chunks.append([]); size=0
    chunks[-1].append(a); size+=len(a)+1
os.makedirs(os.path.join(ROOT,'autobattler'),exist_ok=True)
for f in os.listdir(os.path.join(ROOT,'autobattler')):
    if re.match(r'^assets(-\d+)?\.js$',f): os.remove(os.path.join(ROOT,'autobattler',f))
tags=[]; total=0
for i,c in enumerate(chunks,1):
    js='\n'.join(c)+'\n'; h=hashlib.md5(js.encode()).hexdigest()[:8]; total+=len(js)
    open(os.path.join(ROOT,'autobattler','assets-%d.js'%i),'w',encoding='utf8').write(js)
    tags.append('<script src="assets-%d.js?v=%s"></script>'%(i,h))
body='\n'.join(keep)
head='''<!doctype html>
<html lang="ko"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">
<meta name="theme-color" content="#0a0e1f">
<link rel="icon" href="../favicon.ico">
<link rel="apple-touch-icon" href="../icon-180.png">
<meta property="og:title" content="랜덤 히어로 오토배틀러">
<meta property="og:description" content="영웅을 사고, 시너지를 맞추고, 제륵 군단을 막아라. 20라운드 자동 전투 디펜스.">
<meta property="og:image" content="https://pwj906.github.io/random-hero-defense/share.jpg">
<style>*,*::before,*::after{box-sizing:border-box}html,body{height:100%}body{margin:0;background:#0a0e1f}[hidden]{display:none!important}</style>
'''
i=body.index('<div class="app">')
out=head+body[:i]+'</head><body>\n'+'\n'.join(tags)+'\n'+body[i:]+'\n</body></html>\n'
open(os.path.join(ROOT,'autobattler','index.html'),'w',encoding='utf8').write(out)
print('autobattler/index.html',len(out),'assets',[f.split('"')[1] for f in tags],'total',total)
