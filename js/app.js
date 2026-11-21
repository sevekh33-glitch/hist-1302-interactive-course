/* ============================================================
   APP SHELL — hash router, progress persistence, home & dashboard
   ============================================================ */

const STORE_KEY = 'hist1302_progress_v1';
const ACTIVITY_KEYS = ['video','reading','matching','ordering','flashcards','source','quiz'];
const ACTIVITY_LABELS = {
  video:'Watch the video', reading:'Read the module', matching:'Matching game',
  ordering:'Timeline game', flashcards:'Flashcards', source:'Primary source', quiz:'Module quiz'
};
const REPO_URL = 'https://github.com/sevekh33-glitch/hist-1302-interactive-course';

const App = {

  state: null,

  load(){
    try{
      const s = JSON.parse(localStorage.getItem(STORE_KEY));
      if(s && typeof s === 'object') return { xp:s.xp||0, done:s.done||{}, badges:s.badges||[] };
    }catch(e){}
    return { xp:0, done:{}, badges:[] };
  },

  save(){
    try{ localStorage.setItem(STORE_KEY, JSON.stringify(this.state)); }catch(e){}
  },

  isDone(modId, key){
    const v = this.state.done[modId] && this.state.done[modId][key];
    return v !== undefined && v !== null;
  },

  complete(modId, key, xp, msg){
    this.state.done[modId] = this.state.done[modId] || {};
    const prev = this.state.done[modId][key];
    if(prev !== undefined && prev >= xp) return false;
    this.state.xp += (prev === undefined ? xp : xp - prev);
    this.state.done[modId][key] = xp;

    const mod = COURSE.modules.find(m=>m.id===modId);
    if(mod && ACTIVITY_KEYS.every(k=>this.isDone(modId,k))){
      this.award('module-'+modId, `Module ${mod.number} Master`);
    }
    if(this.state.badges.length===1) this.award('first-steps','First Steps');
    if(this.totalDone() === COURSE.modules.length*ACTIVITY_KEYS.length && COURSE.modules.length>0){
      this.award('historian','Hist 1302 Scholar');
    }
    this.save();
    this.updateTopProgress();
    if(msg) this.toast(msg, prev===undefined ? `+${xp} XP` : `+${xp-prev} XP`);
    return true;
  },

  award(id, label){
    if(this.state.badges.includes(id)) return;
    this.state.badges.push(id);
    setTimeout(()=>this.toast('Badge unlocked', label), 900);
  },

  moduleDoneCount(modId){
    return ACTIVITY_KEYS.filter(k=>this.isDone(modId,k)).length;
  },

  modulePct(modId){
    return Math.round(this.moduleDoneCount(modId)/ACTIVITY_KEYS.length*100);
  },

  totalDone(){
    return COURSE.modules.reduce((n,m)=>n+this.moduleDoneCount(m.id),0);
  },

  totalActivities(){
    return COURSE.modules.length * ACTIVITY_KEYS.length;
  },

  updateTopProgress(){
    const pct = this.totalActivities() ? Math.round(this.totalDone()/this.totalActivities()*100) : 0;
    const el = document.getElementById('courseProgressFill');
    if(el) el.style.width = pct+'%';
    const xp = document.getElementById('navXP');
    if(xp) xp.textContent = this.state.xp+' XP';
  },

  updateModuleHeader(modId){
    const p = this.modulePct(modId);
    const a = document.getElementById('modPct'), b = document.getElementById('modBar'), c = document.getElementById('modDoneCount');
    if(a) a.textContent = p+'%';
    if(b) b.style.width = p+'%';
    if(c) c.textContent = `${this.moduleDoneCount(modId)} / ${ACTIVITY_KEYS.length} activities`;
  },

  toast(title, sub){
    document.querySelectorAll('.toast').forEach(t=>t.remove());
    const t = document.createElement('div');
    t.className = 'toast show';
    t.innerHTML = `<b>${title}</b><span>${sub||''}</span>`;
    document.body.appendChild(t);
    setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),350); }, 3200);
  },

  /* ---------------- Pages ---------------- */
  home(){
    const qCount = COURSE.modules.reduce((n,m)=>n+m.quiz.length+m.source.questions.length,0);
    const gCount = COURSE.modules.reduce((n,m)=>n+3,0);
    return `
      <section class="hero">
        <div class="wrap">
          <span class="eyebrow">◆ Open interactive course · Free forever</span>
          <h1>U.S. History,<br><em>not a lecture.</em></h1>
          <p class="hero-sub">A survey of American history since 1876 built like a game: watch, play, inspect real primary sources, answer instant-feedback quizzes — and argue with an AI tutor that knows the course.</p>
          <div class="hero-stats">
            <div class="hero-stat"><b>${COURSE.modules.length}</b><span>Modules</span></div>
            <div class="hero-stat"><b>${gCount}</b><span>Interactive games</span></div>
            <div class="hero-stat"><b>${qCount}</b><span>Questions</span></div>
            <div class="hero-stat"><b>∞</b><span>Retry everything</span></div>
          </div>
          <div class="btn-row">
            <a class="btn btn-gold btn-lg" href="#/m1">Start Module 1 →</a>
            <a class="btn btn-ghost btn-lg" style="color:#eaf0f7;border-color:rgba(255,255,255,.35)" href="#/modules">Browse all modules</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="section-head reveal">
            <div class="kicker">The syllabus</div>
            <h2>Four modules. One long argument.</h2>
            <p>Trace the threaded question of the course: who gets to be free, who gets to participate, and how much power the federal government should have to decide.</p>
          </div>
          <div class="mod-grid">${COURSE.modules.map(m=>this.moduleCard(m)).join('')}</div>
        </div>
      </section>

      <section class="section alt">
        <div class="wrap">
          <div class="section-head reveal">
            <div class="kicker">How it works</div>
            <h2>Built for attention, not retention tests.</h2>
            <p>Every module follows the same learning loop — and every activity gives you feedback immediately.</p>
          </div>
          <div class="how-grid">
            <div class="how-card reveal"><div class="how-ico">▶</div><h4>1 · Watch</h4><p>Short, curated video overviews from Crash Course U.S. History with a guiding question.</p></div>
            <div class="how-card reveal"><div class="how-ico">⇄</div><h4>2 · Play</h4><p>Matching challenges and chronology puzzles make abstract connections concrete.</p></div>
            <div class="how-card reveal"><div class="how-ico">❝</div><h4>3 · Investigate</h4><p>Read real 19th- and 20th-century sources and answer questions like a historian.</p></div>
            <div class="how-card reveal"><div class="how-ico">✦</div><h4>4 · Prove it</h4><p>Quiz questions with instant explanations, then an AI tutor when you want to go deeper.</p></div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="cta-panel reveal">
            <div>
              <h3>Your progress stays with you.</h3>
              <p>Everything is saved in your browser — XP, badges and quiz scores. No account, no tracking, no paywall. Clear it any time from your browser settings.</p>
            </div>
            <div class="btn-row">
              <a class="btn btn-gold btn-lg" href="#/progress">My progress →</a>
              <button class="btn btn-ghost btn-lg" id="homeAskAI" style="color:#fff;border-color:rgba(255,255,255,.4)">Ask the AI tutor</button>
            </div>
          </div>
        </div>
      </section>`;
  },

  moduleCard(m){
    const pct = this.modulePct(m.id);
    return `<a class="mod-card reveal" href="#/${m.id}">
      <div class="mod-card-top ${m.theme==='rust'?'rust':m.theme==='green'?'green':m.theme==='plum'?'plum':''}">
        <span class="mod-num">Module ${m.number}</span>
        <h3>${m.title}</h3>
        <span class="mod-era">${m.era}</span>
      </div>
      <div class="mod-card-body">
        <p class="mod-tagline">${m.tagline}</p>
        <div class="mod-meta">
          <span class="chip">${m.quiz.length} quiz questions</span>
          <span class="chip plain">${m.flashcards.length} flashcards</span>
          <span class="chip plain">2 games</span>
        </div>
        <div class="mod-progress">
          <div class="mini-bar"><i style="width:${pct}%"></i></div>
          <b>${pct}%</b>
        </div>
      </div>
    </a>`;
  },

  modules(){
    return `
      <section class="prog-hero"><div class="wrap">
        <div class="eyebrow" style="background:rgba(217,164,65,.12);border-color:rgba(217,164,65,.4)">Course map</div>
        <h1>All modules</h1>
        <p>A pilot built as a complete learning experience. The structure is ready to grow to a full 15-week survey — each new module only needs an entry in <code>js/data.js</code>.</p>
      </div></section>
      <section class="section"><div class="wrap">
        <div class="mod-grid">${COURSE.modules.map(m=>this.moduleCard(m)).join('')}</div>
        <div class="coming reveal" style="margin-top:28px">
          <h3>Modules 5–15 · the rest of HIST 1302</h3>
          <p>The engine is ready: the 1920s, the Great Depression, WWII, the Cold War, Civil Rights, Vietnam, the conservative turn and the 21st century can all be added as data — no code changes needed.</p>
          <a class="btn btn-ghost btn-sm" href="${REPO_URL||'#'}" target="_blank" rel="noopener">Fork it on GitHub</a>
        </div>
      </div></section>`;
  },

  progress(){
    const done = this.totalDone(), total = this.totalActivities();
    const pct = total ? Math.round(done/total*100) : 0;
    const badges = this.state.badges;
    const allBadges = [
      {id:'first-steps',ico:'🌱',name:'First Steps',desc:'Finish your first activity'},
      {id:'module-m1',ico:'🏛️',name:'Reconstruction Master',desc:'Complete every activity in Module 1'},
      {id:'module-m2',ico:'🏭',name:'Gilded Age Master',desc:'Complete every activity in Module 2'},
      {id:'module-m3',ico:'⚖️',name:'Progressive Master',desc:'Complete every activity in Module 3'},
      {id:'module-m4',ico:'🌍',name:'Great War Master',desc:'Complete every activity in Module 4'},
      {id:'historian',ico:'🎓',name:'HIST 1302 Scholar',desc:'Complete the entire pilot course'}
    ];
    return `
      <section class="prog-hero"><div class="wrap">
        <div class="eyebrow" style="background:rgba(217,164,65,.12);border-color:rgba(217,164,65,.4)">Learning dashboard</div>
        <h1>My progress</h1>
        <p>Saved locally in this browser. Your score only improves — retrying a quiz with a better result replaces the old one.</p>
        <div class="prog-stats">
          <div class="prog-stat"><b>${pct}%</b><span>Course complete</span></div>
          <div class="prog-stat"><b>${this.state.xp}</b><span>Total XP</span></div>
          <div class="prog-stat"><b>${done}/${total}</b><span>Activities done</span></div>
          <div class="prog-stat"><b>${badges.length}</b><span>Badges earned</span></div>
        </div>
      </div></section>
      <section class="section"><div class="wrap">
        <div class="section-head reveal"><div class="kicker">By module</div><h2>Every step counts</h2></div>
        <div class="prog-grid">
          ${COURSE.modules.map(m=>`
            <div class="prog-card reveal">
              <h3>${m.number}. ${m.title}</h3>
              <span class="era">${m.era} · ${this.modulePct(m.id)}% complete</span>
              ${ACTIVITY_KEYS.map(k=>{
                const d = this.isDone(m.id,k);
                return `<div class="act-row"><span class="st ${d?'done':'todo'}">${d?'✓':'·'}</span>
                  <span>${ACTIVITY_LABELS[k]}</span><span class="val">${d?'+'+this.state.done[m.id][k]+' XP':'—'}</span></div>`;
              }).join('')}
              <div style="margin-top:12px"><a class="btn btn-navy btn-sm" href="#/${m.id}">${d(this.modulePct(m.id))===100?'Review':'Continue'} module →</a></div>
            </div>`).join('')}
        </div>
      </div></section>
      <section class="section alt"><div class="wrap">
        <div class="section-head reveal"><div class="kicker">Trophy case</div><h2>Badges</h2><p>Earn all seven activities in a module to unlock its badge.</p></div>
        <div class="badges">
          ${allBadges.map(b=>{
            const got = badges.includes(b.id);
            return `<div class="badge ${got?'':'locked'}"><span class="b-ico">${b.ico}</span><div><b>${b.name}</b><span>${got?'Unlocked':b.desc}</span></div></div>`;
          }).join('')}
        </div>
        <div style="margin-top:22px"><button class="btn btn-ghost btn-sm" id="resetProgress" type="button">Reset all progress</button></div>
      </div></section>`;
  },

  /* ---------------- Router ---------------- */
  route(){
    const hash = location.hash.replace(/^#\/?/,'') || 'home';
    const app = document.getElementById('app');
    const mod = COURSE.modules.find(m=>m.id===hash);

    if(mod){
      app.innerHTML = UI.moduleBody(mod);
      UI.wire(app, mod);
      document.title = `${mod.title} · HIST 1302`;
      Tutor.setContext(mod);
    } else if(hash==='modules'){
      app.innerHTML = this.modules();
      document.title = 'All modules · HIST 1302';
      Tutor.setContext(null);
    } else if(hash==='progress'){
      app.innerHTML = this.progress();
      document.title = 'My progress · HIST 1302';
      const reset = document.getElementById('resetProgress');
      if(reset) reset.addEventListener('click', ()=>{
        if(confirm('Reset all XP, badges and activity progress?')){
          this.state = {xp:0,done:{},badges:[]};
          this.save(); this.updateTopProgress(); this.route(); this.toast('Progress reset','Start fresh');
        }
      });
      Tutor.setContext(null);
    } else {
      app.innerHTML = this.home();
      document.title = 'HIST 1302 · Interactive U.S. History Survey';
      Tutor.setContext(null);
      const ask = document.getElementById('homeAskAI');
      if(ask) ask.addEventListener('click', ()=>Tutor.open());
    }

    // nav highlighting
    document.querySelectorAll('[data-nav]').forEach(a=>{
      const key = a.dataset.nav;
      a.classList.toggle('active',
        (key==='home' && (hash==='home')) ||
        (key==='modules' && (hash==='modules'||!!mod)) ||
        (key==='progress' && hash==='progress'));
    });
    document.getElementById('mainnav').classList.remove('open');
    window.scrollTo({top:0,behavior:'instant'});
    this.observe();
  },

  observe(){
    if(window.IntersectionObserver){
      if(this._obs) this._obs.disconnect();
      this._obs = new IntersectionObserver(entries=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); this._obs.unobserve(e.target); } });
      },{threshold:.08});
      document.querySelectorAll('.reveal').forEach(el=>this._obs.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
    }
  },

  init(){
    this.state = this.load();
    this.updateTopProgress();
    if(REPO_URL) document.getElementById('repoLink').href = REPO_URL;

    document.getElementById('navAskAI').addEventListener('click', ()=>Tutor.open());
    document.getElementById('navToggle').addEventListener('click', ()=>{
      document.getElementById('mainnav').classList.toggle('open');
    });
    window.addEventListener('hashchange', ()=>this.route());
    this.route();
  }
};

/* Tiny helper used in template strings above */
function d(x){ return x; }

document.addEventListener('DOMContentLoaded', ()=>App.init());
