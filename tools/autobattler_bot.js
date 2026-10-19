// 오토배틀러 봇: N판 돌려 도달 라운드·생명력 기록
const {chromium}=require('playwright');
const N=+process.argv[2]||6, STRAT=process.argv[3]||'basic', BAL=JSON.parse(process.argv[4]||'{}');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:700}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript((b)=>{window.BAL=b;},BAL); await p.goto('file://'+process.cwd()+'/var1a-game.html');await p.waitForTimeout(800);
await p.click('#go');await p.waitForTimeout(300);
const res=[];
for(let g=0;g<N;g++){
  const r=await p.evaluate(async(STRAT)=>{
    const G=window.__G; G.S=G.fresh(); G.S.phase='prep'; G.toPrep();
    const S=()=>G.S, H=G.HEROES;
    const log=[];
    const prep=()=>{
      const s=S();
      // 전략: 보유 영웅과 같은 카드 우선, 그다음 비싼 카드. 라운드 4부터 골드 여유 있으면 레벨업/리롤.
      for(let pass=0;pass<4;pass++){
        for(let i=0;i<5;i++){ const k=s.shop[i]; if(!k) continue; const h=H[k]; const own=G.copiesOf(k);
          const want = own>0 || h.cost>=3 || pass>=1;
          const keep = s.ri<4?0:(s.ri<9?10:20);
          if(want && s.gold-h.cost>=keep-(own>0?10:0)) G.buy(i); }
        if(STRAT==='strong'){ while(s.ri>=2 && s.gold>=(s.ri<9?12:20) && s.lvl<9) G.buyXp(); } else if(s.ri>=3 && s.gold>=(s.ri<9?26:34) && s.lvl<9){ G.buyXp(); }
        if(pass>=1 && s.gold>=(s.ri<9?30:40)) G.reroll();
      }
      // 보드 자동 채움은 startFight의 autoFill이 함
    };
    let guard=0;
    while(S().phase!=='over' && guard++<400){
      const s=S();
      if(s.phase==='prep'){ prep(); G.startFight(); if(S().phase==='prep'){ s.prepT=0; } }
      else if(s.phase==='fight'){ let t=0; while(S().phase==='fight' && t<200){ G.update(1/30); t+=1/30; } }
      else if(s.phase==='result'){ log.push({ri:s.ri,win:s.lastWin,left:s.cu.filter(u=>u.side==='foe'&&!u.dead).length,alive:s.cu.filter(u=>u.side==='ally'&&!u.dead).length,life:s.life,lvl:s.lvl,gold:s.gold,board:Object.keys(s.units).filter(k=>s.units[k].slot.t==='board').map(k=>H[s.units[k].key].name+'★'+s.units[k].star).join(' ')}); S().resultT=0; G.afterResult(); }
      else if(s.phase==='augment'){ const bs=document.querySelectorAll('.augC'); const pick=[...bs].find(x=>x.dataset.a==='skin')||bs[0]; pick&&pick.click(); }
      else break;
    }
    const s=S(); return {reached:s.ri+1,win:s.phase==='over'&&s.life>0,life:s.life,log};
  },STRAT);
  res.push(r); console.log(g, 'reached',r.reached,'life',r.life,'win',r.win, r.log.map(l=>(l.win?'O':'x')+l.left+'/'+l.alive).join(' '));
  console.log('   last board:', r.log[r.log.length-1]&&r.log[r.log.length-1].board, 'lvl', r.log[r.log.length-1]&&r.log[r.log.length-1].lvl);
}
const rs=res.map(r=>r.reached).sort((a,b)=>a-b);console.log('REACHED median',rs[Math.floor(rs.length/2)],'wins',res.filter(r=>r.win).length,'/',N, JSON.stringify(errs.slice(0,2)));
await b.close()})();
