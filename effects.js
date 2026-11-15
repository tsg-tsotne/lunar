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
})();