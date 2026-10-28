import re,json,os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC=os.path.join(ROOT,'src','unppal-defense.html')
OUT=os.path.join(ROOT,'v1')
s=open(SRC,encoding='utf8').read()
a=s.index('<script>');b=s.rindex('</script>')
pre,js,post=s[:a],s[a+len('<script>'):b],s[b+len('</script>'):]
pat=re.compile(r'(["\'])data:((?:image|audio|font)/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=]+)\1')
mimes=[];T=[];D=[];idx={}
def add(mime,b64):
    key=(mime,b64)
    if key in idx: return idx[key]
    if mime not in mimes: mimes.append(mime)
    idx[key]=len(D);T.append(mimes.index(mime));D.append(b64);return idx[key]
# markup: homeBg etc (attribute values)
mk=[]
def mrep(m):
    i=add(m.group(2),m.group(3));mk.append(i);return m.group(1)+m.group(1)+' data-pk="'+str(i)+'"'
pre2=pat.sub(mrep,pre)
assert 'data:image' not in pre2, 'markup data left'
js2=pat.sub(lambda m:'__P('+str(add(m.group(2),m.group(3)))+')',js)
left=len(re.findall(r'data:(image|audio|font)/[a-z0-9.+-]+;base64,[A-Za-z0-9+/]{40}',js2))
assert left==0,left
loader='''<div id="pkLoad" style="position:fixed;inset:0;z-index:99;display:flex;flex-direction:column;gap:12px;align-items:center;justify-content:center;background:#0b0a1e;color:#ffe9a8;font:18px sans-serif;text-align:center;padding:20px"><div id="pkT">불러오는 중…</div><div style="width:70%;max-width:320px;height:10px;border-radius:6px;background:#2a2550;overflow:hidden"><div id="pkB" style="height:100%;width:0;background:linear-gradient(90deg,#ffd24a,#ff9a2e);transition:width .2s"></div></div><div id="pkS" style="font-size:13px;color:#b8b0e0"></div></div><script>
(function(){var L=document.getElementById('pkLoad'),T=document.getElementById('pkT'),B=document.getElementById('pkB'),S=document.getElementById('pkS'),HV='__HV__';
var tot=0,got={},failed=0;function upd(){var g=0;for(var k in got)g+=got[k];if(tot){B.style.width=Math.min(100,g/tot*100).toFixed(0)+'%';S.textContent=(g/1048576).toFixed(1)+' / '+(tot/1048576).toFixed(1)+' MB'}}
function fail(m){if(failed)return;failed=1;T.textContent=m;S.innerHTML='<button onclick="location.reload()" style="font:16px sans-serif;padding:8px 18px;border-radius:10px;border:0;background:#ffd24a;color:#3a2208">다시 시도</button>'}
function get(u,key,tries){tries=tries||0;return new Promise(function(res,rej){var x=new XMLHttpRequest(),last=Date.now(),done=0;x.open('GET',u);x.responseType='text';
x.onprogress=function(e){last=Date.now();got[key]=e.loaded;upd()};
x.onload=function(){done=1;clearInterval(w);if(x.status>=200&&x.status<300){try{got[key]=x.responseText.length;upd();res(JSON.parse(x.responseText))}catch(e){retry()}}else retry()};
x.onerror=function(){done=1;clearInterval(w);retry()};
var w=setInterval(function(){if(!done&&Date.now()-last>20000){done=1;clearInterval(w);try{x.abort()}catch(e){}retry()}},1000);
function retry(){got[key]=0;if(tries<3){T.textContent='연결이 느려서 다시 받는 중… ('+(tries+1)+')';get(u,key,tries+1).then(res,rej)}else rej(0)}
x.send()})}
get('pack.json?v='+HV,'p').then(function(P){var n=P.parts||0,a=[];tot=P.sz||0;for(var i=1;i<=n;i++)a.push(get('pack-'+i+'.json?v='+(P.h&&P.h[i-1]||HV),'k'+i));return Promise.all(a).then(function(ps){var D=P.d||[];ps.forEach(function(q){D=D.concat(q.d)});return {m:P.m,t:P.t,d:D}})}).then(function(P){var M=P.m,Ti=P.t,Dd=P.d;window.__P=function(i){return 'data:'+M[Ti[i]]+';base64,'+Dd[i]};T.textContent='게임 준비 중…';
document.querySelectorAll('[data-pk]').forEach(function(e){e.src=__P(+e.getAttribute('data-pk'))});var s=document.createElement('script');s.src='game.js?v='+HV;s.onload=function(){L.remove()};s.onerror=function(){fail('게임을 불러오지 못했어요.')};document.body.appendChild(s)}).catch(function(){fail('그림을 불러오지 못했어요. 인터넷 연결을 확인해 주세요.')})})();
</script>'''
os.makedirs(OUT,exist_ok=True)
open(os.path.join(OUT,'game.js'),'w',encoding='utf8').write(js2)
import glob
for f in glob.glob(os.path.join(OUT,'pack-*.json')): os.remove(f)
LIM=7*1024*1024;parts=[];cur=[];sz=0
for d in D:
    if sz+len(d)>LIM and cur: parts.append(cur);cur=[];sz=0
    cur.append(d);sz+=len(d)
if cur: parts.append(cur)
import hashlib
H=[];SZ=0
for i,pt in enumerate(parts,1):
    t=json.dumps({'d':pt},separators=(',',':'));open(os.path.join(OUT,'pack-%d.json'%i),'w').write(t)
    H.append(hashlib.md5(t.encode()).hexdigest()[:10]);SZ+=len(t)
pj=json.dumps({'m':mimes,'t':T,'d':[],'parts':len(parts),'h':H,'sz':SZ},separators=(',',':'))
open(os.path.join(OUT,'pack.json'),'w').write(pj)
HV=hashlib.md5((pj+js2).encode()).hexdigest()[:10]
open(os.path.join(OUT,'index.html'),'w',encoding='utf8').write(pre2+loader.replace('__HV__',HV)+post)
for f in ['index.html','game.js','pack.json']+['pack-%d.json'%i for i in range(1,len(parts)+1)]: print(f,os.path.getsize(os.path.join(OUT,f)))
print('images',len(D),'markup',mk)
