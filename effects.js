(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  try { paused = paused || localStorage.getItem('lunar-motion-paused') === 'true'; } catch {}
  const control = document.createElement('button');
  control.type = 'button'; control.className = 'motion-control';
  control.setAttribute('aria-label', 'ანიმაციების შეჩერება');
  document.body.append(control);
  let detailAnimation;
  function syncMotion() {
    root.classList.toggle('motion-paused', paused || reduced.matches);
    control.setAttribute('aria-pressed', String(paused || reduced.matches));
    control.textContent = paused || reduced.matches ? 'ანიმაციები შეჩერებულია' : 'ანიმაციების შეჩერება';
    control.disabled = reduced.matches;
    if (paused || reduced.matches) detailAnimation?.cancel();
  }
  control.addEventListener('click', () => { paused = !paused; try { localStorage.setItem('lunar-motion-paused', String(paused)); } catch {} syncMotion(); });
  reduced.addEventListener('change', syncMotion); syncMotion();
  const stars = document.createElement('div'); stars.className = 'starfield'; stars.setAttribute('aria-hidden', 'true');
  for(let i = 0; i < 42; i++) { const star = document.createElement('i'); star.style.left = ((i * 61 + 13) % 100) + '%'; star.style.top = ((i * 37 + 7) % 91) + '%'; star.style.setProperty('--duration', (5 + i % 7) + 's'); star.style.setProperty('--delay', -(i % 9) + 's'); stars.append(star); }
  document.querySelector('.hero').prepend(stars);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting) {entry.target.classList.remove('reveal-pending');entry.target.classList.add('reveal-ready');observer.unobserve(entry.target);} }); }, {threshold:.08});
    document.querySelectorAll('.section-top,.two-col,.principles article,.system-layout,.flow,.sim-heading,.console,.roadmap-grid article,.closing').forEach(el => { if(el.getBoundingClientRect().top > innerHeight && !paused && !reduced.matches) {el.classList.add('reveal-pending'); observer.observe(el);} });
    // Keyboard focus and anchor navigation must never leave a focused section hidden.
    document.addEventListener('focusin', e => {const target=e.target.closest('.reveal-pending');if(target){target.classList.remove('reveal-pending');observer.unobserve(target)}});
  }
  const hero = document.querySelector('.hero'), art = document.querySelector('.hero-art');
  if (matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', e => {if(paused || reduced.matches)return;const box=hero.getBoundingClientRect();art.style.setProperty('--parallax-x', ((e.clientX-box.left)/box.width-.5)*10+'px');art.style.setProperty('--parallax-y', ((e.clientY-box.top)/box.height-.5)*8+'px')}, {passive:true});
    hero.addEventListener('pointerleave', () => {art.style.setProperty('--parallax-x','0px');art.style.setProperty('--parallax-y','0px')});
  }
  const detail = document.querySelector('.component-detail');
  function animateDetail(){if(paused || reduced.matches || !detail.animate)return;detailAnimation?.cancel();detailAnimation=detail.animate([{opacity:.4,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'ease-out'})}
  document.querySelector('.component-list').addEventListener('click',animateDetail);
  document.querySelector('.component-list').addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End'].includes(e.key))animateDetail()});
  const scene = document.querySelector('.sim-scene');
  function energyState(){scene.classList.toggle('no-energy',Number(document.getElementById('power').textContent)===0)}
  document.querySelector('.console').addEventListener('input',energyState);
  document.querySelector('.console').addEventListener('click',energyState);
  document.getElementById('reset').addEventListener('click',energyState);energyState();
  document.addEventListener('visibilitychange',()=>{root.classList.toggle('tab-inactive',document.hidden)});
  for (let i=0;i<2;i++){const meteor=document.createElement('span');meteor.className='meteor'+(i?' second':'');meteor.setAttribute('aria-hidden','true');stars.append(meteor)}
  const finePointer=matchMedia('(pointer: fine)');
  document.querySelectorAll('.roadmap-grid article,.component-detail,.principles article').forEach(card=>{
    card.classList.add('spotlight-card');
    card.addEventListener('pointermove',e=>{if(paused||reduced.matches||!finePointer.matches)return;const box=card.getBoundingClientRect();card.style.setProperty('--spot-x',(e.clientX-box.left)+'px');card.style.setProperty('--spot-y',(e.clientY-box.top)+'px')},{passive:true});
  });
  document.addEventListener('click',e=>{
    if(paused||reduced.matches)return;
    const button=e.target.closest('.btn,.nav-cta,.base-controls button,.reset');if(!button)return;
    const box=button.getBoundingClientRect(),ripple=document.createElement('span');ripple.className='click-ripple';ripple.setAttribute('aria-hidden','true');
    ripple.style.left=(e.detail?e.clientX-box.left:box.width/2)+'px';ripple.style.top=(e.detail?e.clientY-box.top:box.height/2)+'px';button.append(ripple);
    // Also remove when an animation is interrupted by the pause control.
    setTimeout(()=>ripple.remove(),650);
  });
  const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
  let progressFrame=0;
  function updateProgress(){progressFrame=0;const distance=root.scrollHeight-innerHeight;progress.style.transform='scaleX('+(distance>0?Math.min(1,Math.max(0,scrollY/distance)):0)+')'}
  function requestProgress(){if(!progressFrame)progressFrame=requestAnimationFrame(updateProgress)}
  addEventListener('scroll',requestProgress,{passive:true});addEventListener('resize',requestProgress);updateProgress();
})();