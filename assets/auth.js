
// Minimal Auth / Favorites / Alerts / Appointments (Supabase-ready; falls back to localStorage)
(function(global){
  const cfg = (global.CONFIG||{});
  let supa = null;
  async function supaInit(){
    try{
      if(cfg.supabaseUrl && cfg.supabaseAnonKey && global.supabase){
        supa = global.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
      }
    }catch(e){}
  }
  supaInit();

  const store = {
    get(key){ try{ return JSON.parse(localStorage.getItem(key)||'[]'); }catch(e){ return []; } },
    set(key, val){ localStorage.setItem(key, JSON.stringify(val)); },
    user(){ try{ return JSON.parse(localStorage.getItem('user')||'null'); }catch(e){ return null; } },
    setUser(u){ localStorage.setItem('user', JSON.stringify(u)); }
  };

  // ---- Auth Modal ----
  function ensureAuthModal(){
    if(document.getElementById('authModal')) return;
    const modal = document.createElement('div');
    modal.id = 'authModal';
    modal.innerHTML = `
    <div class="modal-backdrop" style="position:fixed;inset:0;background:rgba(0,0,0,.5);display:none;z-index:9998"></div>
    <div class="modal" style="position:fixed;inset:0;display:none;align-items:center;justify-content:center;z-index:9999">
      <div class="glass" style="width:min(520px,92%);padding:18px;border-radius:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <h3 style="margin:0">เข้าสู่ระบบ / สมัครสมาชิก</h3>
          <button id="authClose" class="btn ghost">ปิด</button>
        </div>
        <p style="margin-top:0">เข้าสู่ระบบด้วยอีเมล (OTP) หรือ Google — เร็วและไม่ต้องจำรหัสผ่าน</p>
        <div id="authStep">
          <input id="authEmail" placeholder="อีเมล" style="width:100%;margin-bottom:8px;padding:10px"/>
          <button class="btn primary" id="authEmailBtn">รับรหัส OTP</button>
          <div style="height:10px"></div>
          <button class="btn" id="authGoogleBtn">เข้าสู่ระบบด้วย Google</button>
        </div>
        <div id="authOtp" style="display:none">
          <input id="authCode" placeholder="กรอกรหัส 6 หลัก" style="width:100%;margin-bottom:8px;padding:10px"/>
          <button class="btn primary" id="authVerifyBtn">ยืนยัน</button>
        </div>
      </div>
    </div>`;
    document.body.appendChild(modal);
    const dialog = modal.querySelector('.modal');
    const back = modal.querySelector('.modal-backdrop');
    function open(){ dialog.style.display='flex'; back.style.display='block'; }
    function close(){ dialog.style.display='none'; back.style.display='none'; }
    modal.open = open; modal.close = close;
    modal.querySelector('#authClose').onclick = close;

    // Local mocked OTP
    let pendingEmail = null;
    modal.querySelector('#authEmailBtn').onclick = async () => {
      const email = (document.getElementById('authEmail').value||'').trim();
      if(!email) return alert('กรอกอีเมล');
      pendingEmail = email;
      // If Supabase available, send magic link OTP (passwordless)
      if(supa){
        try{
          const { data, error } = await supa.auth.signInWithOtp({ email });
          if(error) throw error;
          alert('เราได้ส่งลิงก์/OTP ไปที่อีเมลแล้ว กรุณาตรวจสอบกล่องจดหมาย');
        }catch(e){ alert('ส่ง OTP ไม่สำเร็จ: '+e.message); }
      }else{
        document.getElementById('authStep').style.display='none';
        document.getElementById('authOtp').style.display='block';
        alert('โหมดทดสอบ: ป้อนรหัสใดก็ได้ (จะล็อกอินจำลอง)');
      }
    };
    modal.querySelector('#authVerifyBtn').onclick = async () => {
      const code = (document.getElementById('authCode').value||'').trim();
      if(!code) return alert('ใส่รหัส');
      // Mock success
      store.setUser({ email: pendingEmail, name: pendingEmail.split('@')[0] });
      updateAuthUI();
      modal.close();
    };
    modal.querySelector('#authGoogleBtn').onclick = async () => {
      if(!supa) { alert('โหมดทดสอบ: จำลองล็อกอิน Google'); store.setUser({email:'test@example.com', name:'Guest'}); updateAuthUI(); modal.close(); return; }
      try{
        const { data, error } = await supa.auth.signInWithOAuth({ provider: 'google' });
        if(error) throw error;
      }catch(e){ alert('เข้าสู่ระบบ Google ไม่สำเร็จ: '+e.message); }
    };

    global._authModal = modal;
  }

  function showAuth(){ ensureAuthModal(); global._authModal.open(); }

  // ---- Top-right buttons update ----
  function updateAuthUI(){
    const u = store.user();
    document.querySelectorAll('[data-auth="login"]').forEach(el=> el.style.display = u? 'none' : '');
    document.querySelectorAll('[data-auth="account"]').forEach(el=> el.style.display = u? '' : 'none');
    const nameEl = document.getElementById('userName'); if(nameEl) nameEl.textContent = u? (u.name||u.email) : '';
  }

  // ---- Favorites ----
  function isFav(id){ return store.get('favorites').includes(id); }
  function toggleFav(id){
    const u = store.user(); if(!u){ showAuth(); return; }
    let fav = store.get('favorites');
    if(fav.includes(id)) fav = fav.filter(x=>x!==id); else fav.push(id);
    store.set('favorites', fav);
    document.querySelectorAll(`[data-fav-btn="${id}"]`).forEach(btn=>{
      btn.classList.toggle('active', fav.includes(id));
      btn.setAttribute('aria-pressed', btn.classList.contains('active'));
    });
  }

  // ---- Alerts (saved searches) ----
  function saveAlert(queryJson){
    const u = store.user(); if(!u){ showAuth(); return; }
    const alerts = store.get('alerts');
    alerts.push({ id: Date.now(), user: u.email, query: queryJson });
    store.set('alerts', alerts);
    alert('บันทึกแจ้งเตือนแล้ว');
  }

  // ---- Appointments ----
  function saveAppointment(item, payload){
    const u = store.user(); if(!u){ showAuth(); return; }
    const apps = store.get('appointments');
    apps.push({ id: Date.now(), user: u.email, listing: item, form: payload });
    store.set('appointments', apps);
    alert('ส่งคำขอนัดชมเรียบร้อย');
  }

  // Expose to global
  global.AuthUX = { showAuth, updateAuthUI, toggleFav, isFav, saveAlert, saveAppointment, store };
  // Init
  document.addEventListener('DOMContentLoaded', updateAuthUI);
})(window);
