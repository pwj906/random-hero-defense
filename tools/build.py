import re,json,os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC=os.path.join(ROOT,'src','unppal-defense.html')
OUT=ROOT
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
loader='''<div id="pkLoad" style="position:fixed;inset:0;z-index:99;display:flex;align-items:center;justify-content:center;background:#0b0a1e;color:#ffe9a8;font:18px sans-serif">불러오는 중…</div><script>
(function(){var L=document.getElementById('pkLoad');function j(u){return fetch(u).then(function(r){if(!r.ok)throw 0;return r.json()})}
j('pack.json').then(function(P){var n=P.parts||0,a=[];for(var i=1;i<=n;i++)a.push(j('pack-'+i+'.json'));return Promise.all(a).then(function(ps){var D=P.d||[];ps.forEach(function(q){D=D.concat(q.d)});return {m:P.m,t:P.t,d:D}})}).then(function(P){var M=P.m,Ti=P.t,Dd=P.d;window.__P=function(i){return 'data:'+M[Ti[i]]+';base64,'+Dd[i]};
document.querySelectorAll('[data-pk]').forEach(function(e){e.src=__P(+e.getAttribute('data-pk'))});var s=document.createElement('script');s.src='game.js';s.onload=function(){L.remove()};s.onerror=function(){L.textContent='게임을 불러오지 못했어요. 새로고침해 주세요.'};document.body.appendChild(s)}).catch(function(){L.textContent='그림을 불러오지 못했어요. 새로고침해 주세요.'})})();
</script>'''
os.makedirs(OUT,exist_ok=True)
open(os.path.join(OUT,'index.html'),'w',encoding='utf8').write(pre2+loader+post)
open(os.path.join(OUT,'game.js'),'w',encoding='utf8').write(js2)
import glob
for f in glob.glob(os.path.join(OUT,'pack-*.json')): os.remove(f)
LIM=7*1024*1024;parts=[];cur=[];sz=0
for d in D:
    if sz+len(d)>LIM and cur: parts.append(cur);cur=[];sz=0
    cur.append(d);sz+=len(d)
if cur: parts.append(cur)
json.dump({'m':mimes,'t':T,'d':[],'parts':len(parts)},open(os.path.join(OUT,'pack.json'),'w'),separators=(',',':'))
for i,pt in enumerate(parts,1): json.dump({'d':pt},open(os.path.join(OUT,'pack-%d.json'%i),'w'),separators=(',',':'))
for f in ['index.html','game.js','pack.json']+['pack-%d.json'%i for i in range(1,len(parts)+1)]: print(f,os.path.getsize(os.path.join(OUT,f)))
print('images',len(D),'markup',mk)
