(function(){
  const saved = localStorage.getItem('NN_THEME') || 'luxury';
  apply(saved);
  const s = document.getElementById('themeSel');
  const f = document.getElementById('fontSel');
  if(s){ s.value = saved; s.onchange = () => { localStorage.setItem('NN_THEME', s.value); apply(s.value); }; }
  if(f){ f.onchange = () => { document.documentElement.style.setProperty('--font', f.value); localStorage.setItem('NN_FONT', f.value); }; 
         const svf = localStorage.getItem('NN_FONT'); if(svf){ f.value = svf; document.documentElement.style.setProperty('--font', svf); } }
  function apply(name){
    document.body.classList.remove('theme-luxury','theme-modern','theme-neon');
    document.body.classList.add('theme-'+name);
  }
})();
