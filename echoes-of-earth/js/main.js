/* ============================================================
   ECHOES OF EARTH — main.js
   ============================================================ */

/* ── Cursor ── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX=0,mouseY=0,ringX=0,ringY=0;
document.addEventListener('mousemove', e => { mouseX=e.clientX; mouseY=e.clientY; });
function animCursor(){
  if(cursor){ cursor.style.left=mouseX+'px'; cursor.style.top=mouseY+'px'; }
  ringX+=(mouseX-ringX)*0.1; ringY+=(mouseY-ringY)*0.1;
  if(cursorRing){ cursorRing.style.left=ringX+'px'; cursorRing.style.top=ringY+'px'; }
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a,button,.card,.tour-section').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ if(cursorRing){cursorRing.style.width='44px';cursorRing.style.height='44px';} });
  el.addEventListener('mouseleave',()=>{ if(cursorRing){cursorRing.style.width='28px';cursorRing.style.height='28px';} });
});

/* ── Progress bar ── */
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll',()=>{
  if(!progressBar)return;
  progressBar.style.width=(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)+'%';
});

/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.1});
document.querySelectorAll('.reveal,.tl-entry').forEach(el=>revealObs.observe(el));

/* ── Keyframes ── */
const sty = document.createElement('style');
sty.textContent=`
  @keyframes fadeUp{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:translateY(0);}}
  @keyframes scrollPulse{0%,100%{opacity:0.3;}50%{opacity:1;}}
  @keyframes blink{0%,49%{opacity:1;}50%,100%{opacity:0;}}
  @keyframes drift{
    0%{transform:translateY(100vh);opacity:0;}
    8%{opacity:0.5;}90%{opacity:0.25;}
    100%{transform:translateY(-10px);opacity:0;}
  }
`;
document.head.appendChild(sty);

/* ── Subtle particles ── */
function spawnParticles(id,count=18){
  const c=document.getElementById(id);
  if(!c)return;
  for(let i=0;i<count;i++){
    const p=document.createElement('div');
    const sz=Math.random()*1.5+0.5;
    p.style.cssText=`position:absolute;border-radius:50%;background:#4a7c59;
      width:${sz}px;height:${sz}px;left:${Math.random()*100}%;
      opacity:0;pointer-events:none;
      animation:drift ${10+Math.random()*14}s linear infinite;
      animation-delay:${-Math.random()*20}s;`;
    c.appendChild(p);
  }
}
spawnParticles('particles');

/* ── Active nav ── */
(function(){
  const path=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    if(a.getAttribute('href').split('/').pop()===path) a.classList.add('active');
  });
})();
