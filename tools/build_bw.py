#!/usr/bin/env python3
"""흑과백: src/black-and-white.html(아티팩트 본문 형식) → black-and-white/index.html(GitHub Pages용 완전한 HTML)."""
import os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
body = open(os.path.join(root, 'src/black-and-white.html'), encoding='utf-8').read()
head = ('<!doctype html><html lang="ko"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
        '<meta name="description" content="0~8 숫자 타일로 겨루는 흑과백 — 컴퓨터 대전과 방 코드로 만나는 온라인 1:1 대전">'
        '<meta property="og:title" content="흑과 백"><meta property="og:description" content="상대 타일은 색만 보인다. 더 높은 숫자를 낸 사람이 이긴다.">'
        '<link rel="icon" href="../favicon.ico">'
        '<style>:root{color-scheme:dark;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}'
        'body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>')
os.makedirs(os.path.join(root, 'black-and-white'), exist_ok=True)
open(os.path.join(root, 'black-and-white/index.html'), 'w', encoding='utf-8').write(head + body + '</body></html>')
print('black-and-white/index.html', len(head + body), 'bytes')
