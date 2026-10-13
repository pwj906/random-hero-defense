# 서바이버 원본(src/survivor.html, 아티팩트용 본문) → survivor/index.html (완전한 HTML 문서)
import os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
body=open(os.path.join(ROOT,'src','survivor.html'),encoding='utf8').read()
head='''<!doctype html>
<html lang="ko"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">
<meta name="theme-color" content="#0a0e1f">
<link rel="icon" href="../favicon.ico">
<link rel="apple-touch-icon" href="../icon-180.png">
<meta property="og:title" content="랜덤 히어로 서바이버">
<meta property="og:description" content="히어로는 자동으로 싸운다. 너는 전진하고, 고르고, 운을 건다. 얼마나 멀리 갈 수 있을까?">
<meta property="og:image" content="https://pwj906.github.io/random-hero-defense/share.jpg">
<style>*,*::before,*::after{box-sizing:border-box}:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
'''
i=body.index('<canvas')
out=head+body[:i]+'</head><body>\n'+body[i:]+'\n</body></html>\n'
open(os.path.join(ROOT,'survivor','index.html'),'w',encoding='utf8').write(out)
print('survivor/index.html',len(out))
