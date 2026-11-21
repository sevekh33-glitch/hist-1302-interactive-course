/* ============================================================
   UI COMPONENTS — all interactive activities live here.
   App.complete() is called whenever an activity is finished.
   ============================================================ */

const UI = {

  esc(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  },

  shuffle(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  },

  markBtn(mod, key, label, xp){
    const done = App.isDone(mod.id, key);
    return `<button type="button" class="mark-done${done?' on':''}" data-mark="${key}" data-xp="${xp}">
      ${done?'✓ Completed':label} <span style="opacity:.6">+${xp} XP</span>
    </button>`;
  },

  /* ---------- Full module body ---------- */
  moduleBody(mod){
    const m = mod;
    return `
      <section class="mod-hero" data-num="0${m.number}">
        <div class="wrap">
          <div class="breadcrumb"><a href="#/">Home</a> / Module ${m.number}</div>
          <span class="era">${m.era}</span>
          <h1>${m.title}</h1>
          <p class="tagline">${m.tagline}</p>
          <div class="mod-hero-progress">
            <b id="modPct">${App.modulePct(m.id)}%</b>
            <div class="mini-bar"><i id="modBar" style="width:${App.modulePct(m.id)}%"></i></div>
            <span id="modDoneCount">${App.moduleDoneCount(m.id)} / 7 activities</span>
          </div>
        </div>
      </section>

      <nav class="subnav">
        <div class="wrap">
          <a href="#objectives">Objectives</a>
          <a href="#watch">Watch</a>
          <a href="#read">Read</a>
          <a href="#match">Match</a>
          <a href="#order">Timeline</a>
          <a href="#cards">Flashcards</a>
          <a href="#source">Primary source</a>
          <a href="#quiz">Module quiz</a>
        </div>
      </nav>

      <div class="wrap">
        <section class="block reveal" id="objectives">
          <div class="block-head"><div class="block-ico">◎</div><div><h2>What you'll learn</h2><small>By the end of this module you should be able to…</small></div></div>
          <div class="objectives"><h4>Learning objectives</h4><ul>
            ${m.objectives.map(o=>`<li>${o}</li>`).join('')}
          </ul></div>
        </section>

        <section class="block reveal" id="watch">
          <div class="block-head"><div class="block-ico">▶</div><div><h2>Watch</h2><small>Start with the big picture — then test what you noticed.</small></div></div>
          <div class="video-frame">
            <iframe src="https://www.youtube-nocookie.com/embed/${m.video.id}" title="${this.esc(m.video.title)}"
              loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="video-caption">
            <div><strong>${m.video.title}</strong> · ${m.video.credit}<br><em>${m.video.question}</em></div>
            <div>${this.markBtn(m,'video','Mark as watched',10)}</div>
          </div>
        </section>

        <section class="block reveal" id="read">
          <div class="block-head"><div class="block-ico">▤</div><div><h2>Read & explore</h2><small>Hover over underlined terms for a quick definition.</small></div></div>
          <article class="reading">
            <p class="lede">${m.reading.lede}</p>
            ${m.reading.sections.map(s=>`<h3>${s.h}</h3><p>${s.p}</p>`).join('')}
            <div class="glossary">
              ${m.reading.glossary.map(g=>`<div class="gloss-item"><b>${g.t}</b><span>${g.d}</span></div>`).join('')}
            </div>
          </article>
          <div style="margin-top:12px">${this.markBtn(m,'reading','Mark as read',10)}</div>
        </section>

        <section class="block reveal" id="match">
          <div class="block-head"><div class="block-ico">⇄</div><div><h2>${m.matching.title}</h2><small>Activity 1 · connection</small></div></div>
          <div class="activity">
            <p class="activity-prompt">${m.matching.prompt}</p>
            <div class="match-cols">
              <div class="match-col"><h5>Concept / person</h5>
                ${m.matching.pairs.map((p,i)=>`<button class="match-item" data-side="a" data-i="${i}" type="button">${this.esc(p.a)}</button>`).join('')}
              </div>
              <div class="match-col"><h5>Meaning / result</h5>
                ${this.shuffle(m.matching.pairs.map((p,i)=>({...p,i}))).map(p=>`<button class="match-item" data-side="b" data-i="${p.i}" type="button">${this.esc(p.b)}</button>`).join('')}
              </div>
            </div>
            <div class="activity-status" id="matchStatus"></div>
          </div>
        </section>

        <section class="block reveal" id="order">
          <div class="block-head"><div class="block-ico">↕</div><div><h2>${m.ordering.title}</h2><small>Activity 2 · chronology</small></div></div>
          <div class="activity">
            <p class="activity-prompt">${m.ordering.prompt}</p>
            <div class="order-pool" id="orderPool">
              ${this.shuffle(m.ordering.items.map((it,i)=>({...it,i}))).map(it=>
                `<button class="order-chip" data-i="${it.i}" type="button">${this.esc(it.text)}</button>`).join('')}
            </div>
            <div class="order-slots" id="orderSlots">
              ${m.ordering.items.map((_,i)=>`<div class="order-slot placeholder" data-slot="${i}"><span class="slot-num">${i+1}</span><span class="slot-label">Choose an event…</span></div>`).join('')}
            </div>
            <div class="activity-status" id="orderStatus"></div>
            <div class="btn-row" style="margin-top:12px">
              <button class="btn btn-primary btn-sm" id="orderCheck" type="button" disabled>Check order</button>
              <button class="btn btn-ghost btn-sm" id="orderReset" type="button">Reset</button>
            </div>
          </div>
        </section>

        <section class="block reveal" id="cards">
          <div class="block-head"><div class="block-ico">▣</div><div><h2>Flashcards</h2><small>Activity 3 · recall. Click each card to flip it.</small></div></div>
          <div class="activity">
            <div class="cards-grid" id="cardsGrid">
              ${m.flashcards.map((c,i)=>`
                <div class="fcard" data-i="${i}" tabindex="0" role="button" aria-label="Flip card ${i+1}">
                  <div class="fcard-inner">
                    <div class="fcard-face fcard-front"><div><b>${this.esc(c.front)}</b><small>click to reveal</small></div></div>
                    <div class="fcard-face fcard-back"><div>${this.esc(c.back)}</div></div>
                  </div>
                </div>`).join('')}
            </div>
            <div class="cards-done" id="cardsDone">0 of ${m.flashcards.length} cards flipped</div>
            <div class="btn-row" style="margin-top:10px"><button class="btn btn-ghost btn-sm" id="cardsShuffle" type="button">↝ Shuffle</button></div>
          </div>
        </section>

        <section class="block reveal" id="source">
          <div class="block-head"><div class="block-ico">❝</div><div><h2>Read like a historian</h2><small>Activity 4 · primary source analysis</small></div></div>
          <div class="source">
            <div class="source-meta">${m.source.meta}</div>
            <div class="source-title">${m.source.title}</div>
            <div class="source-text">${m.source.text}</div>
            <div class="source-credit">${m.source.credit}</div>
            <div class="q-list">
              ${m.source.questions.map((q,qi)=>this.questionCard(q,qi,'src')).join('')}
            </div>
          </div>
        </section>

        <section class="block reveal" id="quiz">
          <div class="block-head"><div class="block-ico">✦</div><div><h2>Module quiz</h2><small>${m.quiz.length} questions · instant feedback · ${Math.round(0.7*100)}% to earn the badge</small></div></div>
          <div class="quiz-shell" id="quizShell"></div>
        </section>

        <section class="block reveal">
          <div class="cta-panel">
            <div>
              <h3>Stuck on a question?</h3>
              <p>Ask the AI tutor about this module — it knows the course content and can explain a concept in a different way.</p>
            </div>
            <button class="btn btn-gold btn-lg" id="inlineAskAI" type="button">Ask the AI Tutor →</button>
          </div>
        </section>
      </div>`;
  },

  questionCard(q, qi, prefix){
    return `<div class="q-card" data-q="${prefix}-${qi}">
      <div class="q-num">Question ${qi+1}</div>
      <div class="q-text">${this.esc(q.q)}</div>
      <div class="q-opts">
        ${q.options.map((o,oi)=>`<button class="opt" type="button" data-opt="${oi}">
          <span class="letter">${String.fromCharCode(65+oi)}</span><span>${this.esc(o)}</span>
        </button>`).join('')}
      </div>
      <div class="feedback-slot"></div>
    </div>`;
  },

  /* ---------- Wire all module interactions ---------- */
  wire(root, mod){
    this.wireMarks(root, mod);
    this.wireMatching(root, mod);
    this.wireOrdering(root, mod);
    this.wireCards(root, mod);
    this.wireQuestions(root, mod, 'src');
    this.wireQuiz(root, mod);
    const a = document.getElementById('inlineAskAI');
    if(a) a.addEventListener('click', ()=>Tutor.open());
  },

  wireMarks(root, mod){
    root.querySelectorAll('[data-mark]').forEach(btn=>{
      if(App.isDone(mod.id, btn.dataset.mark)){
        btn.classList.add('on');
        btn.innerHTML = '✓ Completed <span style="opacity:.6">+' + btn.dataset.xp + ' XP</span>';
      }
      btn.addEventListener('click', ()=>{
        if(App.isDone(mod.id, btn.dataset.mark)) return;
        App.complete(mod.id, btn.dataset.mark, +btn.dataset.xp, 'Activity completed');
        btn.classList.add('on');
        btn.innerHTML = '✓ Completed <span style="opacity:.6">+' + btn.dataset.xp + ' XP</span>';
        App.updateModuleHeader(mod.id);
      });
    });
  },

  /* ---- Matching ---- */
  wireMatching(root, mod){
    const wrap = root.querySelector('#match .activity');
    if(!wrap) return;
    const status = wrap.querySelector('#matchStatus');
    let sel = null;
    const done = new Set();
    const all = wrap.querySelectorAll('.match-item');

    all.forEach(el=>el.addEventListener('click', ()=>{
      const i = +el.dataset.i, side = el.dataset.side;
      if(el.classList.contains('correct')) return;
      if(side === 'a'){
        wrap.querySelectorAll('[data-side="a"]').forEach(n=>n.classList.remove('selected'));
        sel = i;
        el.classList.add('selected');
        status.className = 'activity-status';
        status.textContent = 'Now pick its partner on the right.';
        return;
      }
      if(sel === null){
        status.className = 'activity-status bad';
        status.textContent = 'Pick an item on the left first.';
        return;
      }
      if(sel === i){
        const pair = wrap.querySelectorAll(`.match-item[data-i="${i}"]`);
        pair.forEach(n=>{ n.classList.remove('selected','wrong'); n.classList.add('correct','locked'); });
        done.add(i);
        sel = null;
        status.className = 'activity-status good';
        status.textContent = `✓ Correct! ${done.size} of ${mod.matching.pairs.length} matched.`;
        if(done.size === mod.matching.pairs.length){
          App.complete(mod.id,'matching',20,'Matching game complete!');
          status.textContent = '✓ All matched! +20 XP earned.';
          App.updateModuleHeader(mod.id);
        }
      } else {
        el.classList.add('wrong');
        status.className = 'activity-status bad';
        status.textContent = 'Not quite — try another partner.';
        setTimeout(()=>el.classList.remove('wrong'), 600);
      }
    }));
  },

  /* ---- Ordering ---- */
  wireOrdering(root, mod){
    const wrap = root.querySelector('#order .activity');
    if(!wrap) return;
    const pool = wrap.querySelector('#orderPool');
    const slots = [...wrap.querySelectorAll('.order-slot')];
    const status = wrap.querySelector('#orderStatus');
    const check = wrap.querySelector('#orderCheck');
    const reset = wrap.querySelector('#orderReset');
    const n = mod.ordering.items.length;
    let placed = Array(n).fill(null);

    function paint(){
      slots.forEach((s,i)=>{
        s.classList.remove('ok','no');
        if(placed[i] === null){
          s.className = 'order-slot placeholder';
          s.innerHTML = `<span class="slot-num">${i+1}</span><span class="slot-label">Choose an event…</span>`;
        } else {
          const it = mod.ordering.items[placed[i]];
          s.className = 'order-slot filled';
          s.innerHTML = `<span class="slot-num">${i+1}</span><span>${UI.esc(it.text)}</span>`;
        }
      });
      pool.querySelectorAll('.order-chip').forEach(c=>{
        c.classList.toggle('used', placed.includes(+c.dataset.i));
      });
      check.disabled = placed.some(v=>v===null);
      status.className = 'activity-status';
      status.textContent = '';
    }

    pool.querySelectorAll('.order-chip').forEach(c=>c.addEventListener('click', ()=>{
      const idx = placed.indexOf(null);
      if(idx === -1) return;
      placed[idx] = +c.dataset.i;
      paint();
    }));

    slots.forEach((s,i)=>s.addEventListener('click', ()=>{
      if(placed[i] === null) return;
      placed[i] = null;
      paint();
    }));

    check.addEventListener('click', ()=>{
      let all = true;
      slots.forEach((s,i)=>{
        if(placed[i] === i){ s.classList.add('ok'); }
        else { s.classList.add('no'); all = false; }
      });
      if(all){
        status.className = 'activity-status good';
        status.textContent = '✓ Perfect chronology! +20 XP earned.';
        check.disabled = true;
        App.complete(mod.id,'ordering',20,'Timeline complete!');
        App.updateModuleHeader(mod.id);
      } else {
        status.className = 'activity-status bad';
        status.textContent = 'Not yet — green means correct, red means out of order. Click a placed event to remove it.';
      }
    });

    reset.addEventListener('click', ()=>{ placed = Array(n).fill(null); paint(); pool.appendChild(...UI.shuffle([...pool.children])); });
    paint();
  },

  /* ---- Flashcards ---- */
  wireCards(root, mod){
    const wrap = root.querySelector('#cards .activity');
    if(!wrap) return;
    const grid = wrap.querySelector('#cardsGrid');
    const counter = wrap.querySelector('#cardsDone');
    const seen = new Set();
    const cards = [...grid.children];

    function flip(card){
      card.classList.toggle('flipped');
      if(card.classList.contains('flipped')) seen.add(card.dataset.i);
      counter.textContent = `${seen.size} of ${mod.flashcards.length} cards flipped`;
      if(seen.size === mod.flashcards.length && !App.isDone(mod.id,'flashcards')){
        App.complete(mod.id,'flashcards',10,'Flashcards complete!');
        App.updateModuleHeader(mod.id);
      }
    }
    cards.forEach(c=>{
      c.addEventListener('click', ()=>flip(c));
      c.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); flip(c); } });
    });
    wrap.querySelector('#cardsShuffle').addEventListener('click', ()=>{
      UI.shuffle(cards).forEach(c=>grid.appendChild(c));
    });
  },

  /* ---- Source questions ---- */
  wireQuestions(root, mod, prefix){
    root.querySelectorAll(`.q-card[data-q^="${prefix}-"]`).forEach(card=>{
      const q = mod.source.questions[+card.dataset.q.split('-')[1]];
      let answered = false;
      card.querySelectorAll('.opt').forEach(btn=>btn.addEventListener('click', ()=>{
        if(answered) return;
        answered = true;
        const chosen = +btn.dataset.opt;
        const correct = chosen === q.answer;
        card.querySelectorAll('.opt').forEach(n=>{
          n.classList.add('locked');
          if(+n.dataset.opt === q.answer) n.classList.add('correct');
        });
        if(!correct) btn.classList.add('wrong');
        card.querySelector('.feedback-slot').innerHTML =
          `<div class="feedback ${correct?'good':'bad'}"><b>${correct?'✓ Correct':'✗ Not quite'}</b>${q.explain}</div>`;
        const cards = [...root.querySelectorAll(`.q-card[data-q^="${prefix}-"]`)];
        if(cards.every(c=>c.querySelector('.feedback'))){
          App.complete(mod.id,'source',15,'Source analysis complete!');
          App.updateModuleHeader(mod.id);
        }
      }));
    });
  },

  /* ---- Coursera-style quiz: one question at a time ---- */
  wireQuiz(root, mod){
    const shell = root.querySelector('#quizShell');
    if(!shell) return;
    let idx = 0, chosen = null, checked = false;
    const results = new Array(mod.quiz.length).fill(null);

    function dots(){
      return `<div class="quiz-dots">${mod.quiz.map((_,i)=>
        `<span class="dot ${results[i]===true?'right':results[i]===false?'wrong':i===idx?'current':''}"></span>`).join('')}</div>`;
    }

    function render(){
      if(idx >= mod.quiz.length){ renderResult(); return; }
      const q = mod.quiz[idx];
      shell.innerHTML = `
        <div class="quiz-top">${dots()}<span class="quiz-count">QUESTION ${idx+1} OF ${mod.quiz.length}</span></div>
        <div class="quiz-question">${q.q}</div>
        <div class="q-opts" id="quizOpts">
          ${q.options.map((o,i)=>`<button class="opt" type="button" data-opt="${i}">
            <span class="letter">${String.fromCharCode(65+i)}</span><span>${UI.esc(o)}</span></button>`).join('')}
        </div>
        <div class="feedback-slot" id="quizFeedback"></div>
        <div class="quiz-actions">
          <button class="btn btn-primary" id="quizCheck" type="button" disabled>Check answer</button>
          <span class="quiz-hint">You get feedback after each answer.</span>
        </div>`;

      const opts = shell.querySelector('#quizOpts');
      const check = shell.querySelector('#quizCheck');
      opts.querySelectorAll('.opt').forEach(btn=>btn.addEventListener('click', ()=>{
        if(checked) return;
        chosen = +btn.dataset.opt;
        opts.querySelectorAll('.opt').forEach(n=>n.classList.remove('selected'));
        btn.classList.add('selected');
        check.disabled = false;
      }));

      check.addEventListener('click', ()=>{
        checked = true;
        const correct = chosen === q.answer;
        results[idx] = correct;
        opts.querySelectorAll('.opt').forEach(n=>{
          n.classList.add('locked');
          if(+n.dataset.opt === q.answer) n.classList.add('correct');
        });
        if(!correct) opts.querySelector(`[data-opt="${chosen}"]`).classList.add('wrong');
        shell.querySelector('#quizFeedback').innerHTML =
          `<div class="feedback ${correct?'good':'bad'}"><b>${correct?'✓ Correct!':'✗ Not quite.'}</b>${q.explain}</div>`;
        shell.querySelector('.quiz-actions').innerHTML =
          `<button class="btn btn-primary" id="quizNext" type="button">${idx===mod.quiz.length-1?'See results →':'Next question →'}</button>
           <span class="quiz-hint">${correct?'Nice work.':'No problem — the explanation is above.'}</span>`;
        shell.querySelector('#quizNext').addEventListener('click', ()=>{
          idx++; chosen = null; checked = false; render();
        });
      });
    }

    function renderResult(){
      const score = results.filter(Boolean).length;
      const pct = Math.round(score/mod.quiz.length*100);
      const pass = pct >= 70;
      shell.innerHTML = `
        <div class="quiz-result">
          <div class="score-ring" style="--pct:${pct}"><div><b>${pct}%</b><small>${score}/${mod.quiz.length} correct</small></div></div>
          <h3>${pass?'Module mastered!':'Keep going — review and retry.'}</h3>
          <p>${pass
            ? 'You have earned the Module ' + mod.number + ' badge. Revisit any section any time; your progress is saved in this browser.'
            : 'Review the reading and try again. There is no penalty for retries — that is how learning works.'}</p>
          ${pass?`<div class="result-badge">🏅 Module ${mod.number} badge unlocked</div>`:''}
          <div class="btn-row" style="justify-content:center">
            <button class="btn btn-navy" id="quizRetry" type="button">↻ Try again</button>
            <a class="btn btn-ghost" href="#/progress">See my progress</a>
          </div>
        </div>`;
      shell.querySelector('#quizRetry').addEventListener('click', ()=>{
        idx=0; chosen=null; checked=false; results.fill(null); render();
      });
      if(pass && !App.isDone(mod.id,'quiz')) App.complete(mod.id,'quiz',25+score*5,'Quiz passed!');
      else if(!App.isDone(mod.id,'quiz')) App.complete(mod.id,'quiz',Math.max(0,score*2),'Quiz attempted');
      App.updateModuleHeader(mod.id);
    }

    render();
  }
};
/* ============================================================
   UI COMPONENTS — all interactive activities live here.
   App.complete() is called whenever an activity is finished.
   ============================================================ */

const UI = {

  esc(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  },

  shuffle(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  },

  markBtn(mod, key, label, xp){
    const done = App.isDone(mod.id, key);
    return `<button type="button" class="mark-done${done?' on':''}" data-mark="${key}" data-xp="${xp}">
      ${done?'✓ Completed':label} <span style="opacity:.6">+${xp} XP</span>
    </button>`;
  },

  /* ---------- Full module body ---------- */
  moduleBody(mod){
    const m = mod;
    return `
      <section class="mod-hero" data-num="0${m.number}">
        <div class="wrap">
          <div class="breadcrumb"><a href="#/">Home</a> / Module ${m.number}</div>
          <span class="era">${m.era}</span>
          <h1>${m.title}</h1>
          <p class="tagline">${m.tagline}</p>
          <div class="mod-hero-progress">
            <b id="modPct">${App.modulePct(m.id)}%</b>
            <div class="mini-bar"><i id="modBar" style="width:${App.modulePct(m.id)}%"></i></div>
            <span id="modDoneCount">${App.moduleDoneCount(m.id)} / 7 activities</span>
          </div>
        </div>
      </section>

      <nav class="subnav">
        <div class="wrap">
          <a href="#objectives">Objectives</a>
          <a href="#watch">Watch</a>
          <a href="#read">Read</a>
          <a href="#match">Match</a>
          <a href="#order">Timeline</a>
          <a href="#cards">Flashcards</a>
          <a href="#source">Primary source</a>
          <a href="#quiz">Module quiz</a>
        </div>
      </nav>

      <div class="wrap">
        <section class="block reveal" id="objectives">
          <div class="block-head"><div class="block-ico">◎</div><div><h2>What you'll learn</h2><small>By the end of this module you should be able to…</small></div></div>
          <div class="objectives"><h4>Learning objectives</h4><ul>
            ${m.objectives.map(o=>`<li>${o}</li>`).join('')}
          </ul></div>
        </section>

        <section class="block reveal" id="watch">
          <div class="block-head"><div class="block-ico">▶</div><div><h2>Watch</h2><small>Start with the big picture — then test what you noticed.</small></div></div>
          <div class="video-frame">
            <iframe src="https://www.youtube-nocookie.com/embed/${m.video.id}" title="${this.esc(m.video.title)}"
              loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="video-caption">
            <div><strong>${m.video.title}</strong> · ${m.video.credit}<br><em>${m.video.question}</em></div>
            <div>${this.markBtn(m,'video','Mark as watched',10)}</div>
          </div>
        </section>

        <section class="block reveal" id="read">
          <div class="block-head"><div class="block-ico">▤</div><div><h2>Read & explore</h2><small>Hover over underlined terms for a quick definition.</small></div></div>
          <article class="reading">
            <p class="lede">${m.reading.lede}</p>
            ${m.reading.sections.map(s=>`<h3>${s.h}</h3><p>${s.p}</p>`).join('')}
            <div class="glossary">
              ${m.reading.glossary.map(g=>`<div class="gloss-item"><b>${g.t}</b><span>${g.d}</span></div>`).join('')}
            </div>
          </article>
          <div style="margin-top:12px">${this.markBtn(m,'reading','Mark as read',10)}</div>
        </section>

        <section class="block reveal" id="match">
          <div class="block-head"><div class="block-ico">⇄</div><div><h2>${m.matching.title}</h2><small>Activity 1 · connection</small></div></div>
          <div class="activity">
            <p class="activity-prompt">${m.matching.prompt}</p>
            <div class="match-cols">
              <div class="match-col"><h5>Concept / person</h5>
                ${m.matching.pairs.map((p,i)=>`<button class="match-item" data-side="a" data-i="${i}" type="button">${this.esc(p.a)}</button>`).join('')}
              </div>
              <div class="match-col"><h5>Meaning / result</h5>
                ${this.shuffle(m.matching.pairs.map((p,i)=>({...p,i}))).map(p=>`<button class="match-item" data-side="b" data-i="${p.i}" type="button">${this.esc(p.b)}</button>`).join('')}
              </div>
            </div>
            <div class="activity-status" id="matchStatus"></div>
          </div>
        </section>

        <section class="block reveal" id="order">
          <div class="block-head"><div class="block-ico">↕</div><div><h2>${m.ordering.title}</h2><small>Activity 2 · chronology</small></div></div>
          <div class="activity">
            <p class="activity-prompt">${m.ordering.prompt}</p>
            <div class="order-pool" id="orderPool">
              ${this.shuffle(m.ordering.items.map((it,i)=>({...it,i}))).map(it=>
                `<button class="order-chip" data-i="${it.i}" type="button"><b>${it.year}</b> · ${this.esc(it.text)}</button>`).join('')}
            </div>
            <div class="order-slots" id="orderSlots">
              ${m.ordering.items.map((_,i)=>`<div class="order-slot placeholder" data-slot="${i}"><span class="slot-num">${i+1}</span><span class="slot-label">Choose an event…</span></div>`).join('')}
            </div>
            <div class="activity-status" id="orderStatus"></div>
            <div class="btn-row" style="margin-top:12px">
              <button class="btn btn-primary btn-sm" id="orderCheck" type="button" disabled>Check order</button>
              <button class="btn btn-ghost btn-sm" id="orderReset" type="button">Reset</button>
            </div>
          </div>
        </section>

        <section class="block reveal" id="cards">
          <div class="block-head"><div class="block-ico">▣</div><div><h2>Flashcards</h2><small>Activity 3 · recall. Click each card to flip it.</small></div></div>
          <div class="activity">
            <div class="cards-grid" id="cardsGrid">
              ${m.flashcards.map((c,i)=>`
                <div class="fcard" data-i="${i}" tabindex="0" role="button" aria-label="Flip card ${i+1}">
                  <div class="fcard-inner">
                    <div class="fcard-face fcard-front"><div><b>${this.esc(c.front)}</b><small>click to reveal</small></div></div>
                    <div class="fcard-face fcard-back"><div>${this.esc(c.back)}</div></div>
                  </div>
                </div>`).join('')}
            </div>
            <div class="cards-done" id="cardsDone">0 of ${m.flashcards.length} cards flipped</div>
            <div class="btn-row" style="margin-top:10px"><button class="btn btn-ghost btn-sm" id="cardsShuffle" type="button">↝ Shuffle</button></div>
          </div>
        </section>

        <section class="block reveal" id="source">
          <div class="block-head"><div class="block-ico">❝</div><div><h2>Read like a historian</h2><small>Activity 4 · primary source analysis</small></div></div>
          <div class="source">
            <div class="source-meta">${m.source.meta}</div>
            <div class="source-title">${m.source.title}</div>
            <div class="source-text">${m.source.text}</div>
            <div class="source-credit">${m.source.credit}</div>
            <div class="q-list">
              ${m.source.questions.map((q,qi)=>this.questionCard(q,qi,'src')).join('')}
            </div>
          </div>
        </section>

        <section class="block reveal" id="quiz">
          <div class="block-head"><div class="block-ico">✦</div><div><h2>Module quiz</h2><small>${m.quiz.length} questions · instant feedback · ${Math.round(0.7*100)}% to earn the badge</small></div></div>
          <div class="quiz-shell" id="quizShell"></div>
        </section>

        <section class="block reveal">
          <div class="cta-panel">
            <div>
              <h3>Stuck on a question?</h3>
              <p>Ask the AI tutor about this module — it knows the course content and can explain a concept in a different way.</p>
            </div>
            <button class="btn btn-gold btn-lg" id="inlineAskAI" type="button">Ask the AI Tutor →</button>
          </div>
        </section>
      </div>`;
  },

  questionCard(q, qi, prefix){
    return `<div class="q-card" data-q="${prefix}-${qi}">
      <div class="q-num">Question ${qi+1}</div>
      <div class="q-text">${this.esc(q.q)}</div>
      <div class="q-opts">
        ${q.options.map((o,oi)=>`<button class="opt" type="button" data-opt="${oi}">
          <span class="letter">${String.fromCharCode(65+oi)}</span><span>${this.esc(o)}</span>
        </button>`).join('')}
      </div>
      <div class="feedback-slot"></div>
    </div>`;
  },

  /* ---------- Wire all module interactions ---------- */
  wire(root, mod){
    this.wireMarks(root, mod);
    this.wireMatching(root, mod);
    this.wireOrdering(root, mod);
    this.wireCards(root, mod);
    this.wireQuestions(root, mod, 'src');
    this.wireQuiz(root, mod);
    const a = document.getElementById('inlineAskAI');
    if(a) a.addEventListener('click', ()=>Tutor.open());
  },

  wireMarks(root, mod){
    root.querySelectorAll('[data-mark]').forEach(btn=>{
      if(App.isDone(mod.id, btn.dataset.mark)){
        btn.classList.add('on');
        btn.innerHTML = '✓ Completed <span style="opacity:.6">+' + btn.dataset.xp + ' XP</span>';
      }
      btn.addEventListener('click', ()=>{
        if(App.isDone(mod.id, btn.dataset.mark)) return;
        App.complete(mod.id, btn.dataset.mark, +btn.dataset.xp, 'Activity completed');
        btn.classList.add('on');
        btn.innerHTML = '✓ Completed <span style="opacity:.6">+' + btn.dataset.xp + ' XP</span>';
        App.updateModuleHeader(mod.id);
      });
    });
  },

  /* ---- Matching ---- */
  wireMatching(root, mod){
    const wrap = root.querySelector('#match .activity');
    if(!wrap) return;
    const status = wrap.querySelector('#matchStatus');
    let sel = null;
    const done = new Set();
    const all = wrap.querySelectorAll('.match-item');

    all.forEach(el=>el.addEventListener('click', ()=>{
      const i = +el.dataset.i, side = el.dataset.side;
      if(el.classList.contains('correct')) return;
      if(side === 'a'){
        wrap.querySelectorAll('[data-side="a"]').forEach(n=>n.classList.remove('selected'));
        sel = i;
        el.classList.add('selected');
        status.className = 'activity-status';
        status.textContent = 'Now pick its partner on the right.';
        return;
      }
      if(sel === null){
        status.className = 'activity-status bad';
        status.textContent = 'Pick an item on the left first.';
        return;
      }
      if(sel === i){
        const pair = wrap.querySelectorAll(`.match-item[data-i="${i}"]`);
        pair.forEach(n=>{ n.classList.remove('selected','wrong'); n.classList.add('correct','locked'); });
        done.add(i);
        sel = null;
        status.className = 'activity-status good';
        status.textContent = `✓ Correct! ${done.size} of ${mod.matching.pairs.length} matched.`;
        if(done.size === mod.matching.pairs.length){
          App.complete(mod.id,'matching',20,'Matching game complete!');
          status.textContent = '✓ All matched! +20 XP earned.';
          App.updateModuleHeader(mod.id);
        }
      } else {
        el.classList.add('wrong');
        status.className = 'activity-status bad';
        status.textContent = 'Not quite — try another partner.';
        setTimeout(()=>el.classList.remove('wrong'), 600);
      }
    }));
  },

  /* ---- Ordering ---- */
  wireOrdering(root, mod){
    const wrap = root.querySelector('#order .activity');
    if(!wrap) return;
    const pool = wrap.querySelector('#orderPool');
    const slots = [...wrap.querySelectorAll('.order-slot')];
    const status = wrap.querySelector('#orderStatus');
    const check = wrap.querySelector('#orderCheck');
    const reset = wrap.querySelector('#orderReset');
    const n = mod.ordering.items.length;
    let placed = Array(n).fill(null);

    function paint(){
      slots.forEach((s,i)=>{
        s.classList.remove('ok','no');
        if(placed[i] === null){
          s.className = 'order-slot placeholder';
          s.innerHTML = `<span class="slot-num">${i+1}</span><span class="slot-label">Choose an event…</span>`;
        } else {
          const it = mod.ordering.items[placed[i]];
          s.className = 'order-slot filled';
          s.innerHTML = `<span class="slot-num">${i+1}</span><span>${it.year} · ${UI.esc(it.text)}</span>`;
        }
      });
      pool.querySelectorAll('.order-chip').forEach(c=>{
        c.classList.toggle('used', placed.includes(+c.dataset.i));
      });
      check.disabled = placed.some(v=>v===null);
      status.className = 'activity-status';
      status.textContent = '';
    }

    pool.querySelectorAll('.order-chip').forEach(c=>c.addEventListener('click', ()=>{
      const idx = placed.indexOf(null);
      if(idx === -1) return;
      placed[idx] = +c.dataset.i;
      paint();
    }));

    slots.forEach((s,i)=>s.addEventListener('click', ()=>{
      if(placed[i] === null) return;
      placed[i] = null;
      paint();
    }));

    check.addEventListener('click', ()=>{
      let all = true;
      slots.forEach((s,i)=>{
        if(placed[i] === i){ s.classList.add('ok'); }
        else { s.classList.add('no'); all = false; }
      });
      if(all){
        status.className = 'activity-status good';
        status.textContent = '✓ Perfect chronology! +20 XP earned.';
        check.disabled = true;
        App.complete(mod.id,'ordering',20,'Timeline complete!');
        App.updateModuleHeader(mod.id);
      } else {
        status.className = 'activity-status bad';
        status.textContent = 'Not yet — green means correct, red means out of order. Click a placed event to remove it.';
      }
    });

    reset.addEventListener('click', ()=>{ placed = Array(n).fill(null); paint(); pool.appendChild(...UI.shuffle([...pool.children])); });
    paint();
  },

  /* ---- Flashcards ---- */
  wireCards(root, mod){
    const wrap = root.querySelector('#cards .activity');
    if(!wrap) return;
    const grid = wrap.querySelector('#cardsGrid');
    const counter = wrap.querySelector('#cardsDone');
    const seen = new Set();
    const cards = [...grid.children];

    function flip(card){
      card.classList.toggle('flipped');
      if(card.classList.contains('flipped')) seen.add(card.dataset.i);
      counter.textContent = `${seen.size} of ${mod.flashcards.length} cards flipped`;
      if(seen.size === mod.flashcards.length && !App.isDone(mod.id,'flashcards')){
        App.complete(mod.id,'flashcards',10,'Flashcards complete!');
        App.updateModuleHeader(mod.id);
      }
    }
    cards.forEach(c=>{
      c.addEventListener('click', ()=>flip(c));
      c.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); flip(c); } });
    });
    wrap.querySelector('#cardsShuffle').addEventListener('click', ()=>{
      UI.shuffle(cards).forEach(c=>grid.appendChild(c));
    });
  },

  /* ---- Source questions ---- */
  wireQuestions(root, mod, prefix){
    root.querySelectorAll(`.q-card[data-q^="${prefix}-"]`).forEach(card=>{
      const q = mod.source.questions[+card.dataset.q.split('-')[1]];
      let answered = false;
      card.querySelectorAll('.opt').forEach(btn=>btn.addEventListener('click', ()=>{
        if(answered) return;
        answered = true;
        const chosen = +btn.dataset.opt;
        const correct = chosen === q.answer;
        card.querySelectorAll('.opt').forEach(n=>{
          n.classList.add('locked');
          if(+n.dataset.opt === q.answer) n.classList.add('correct');
        });
        if(!correct) btn.classList.add('wrong');
        card.querySelector('.feedback-slot').innerHTML =
          `<div class="feedback ${correct?'good':'bad'}"><b>${correct?'✓ Correct':'✗ Not quite'}</b>${q.explain}</div>`;
        const cards = [...root.querySelectorAll(`.q-card[data-q^="${prefix}-"]`)];
        if(cards.every(c=>c.querySelector('.feedback'))){
          App.complete(mod.id,'source',15,'Source analysis complete!');
          App.updateModuleHeader(mod.id);
        }
      }));
    });
  },

  /* ---- Coursera-style quiz: one question at a time ---- */
  wireQuiz(root, mod){
    const shell = root.querySelector('#quizShell');
    if(!shell) return;
    let idx = 0, chosen = null, checked = false;
    const results = new Array(mod.quiz.length).fill(null);

    function dots(){
      return `<div class="quiz-dots">${mod.quiz.map((_,i)=>
        `<span class="dot ${results[i]===true?'right':results[i]===false?'wrong':i===idx?'current':''}"></span>`).join('')}</div>`;
    }

    function render(){
      if(idx >= mod.quiz.length){ renderResult(); return; }
      const q = mod.quiz[idx];
      shell.innerHTML = `
        <div class="quiz-top">${dots()}<span class="quiz-count">QUESTION ${idx+1} OF ${mod.quiz.length}</span></div>
        <div class="quiz-question">${q.q}</div>
        <div class="q-opts" id="quizOpts">
          ${q.options.map((o,i)=>`<button class="opt" type="button" data-opt="${i}">
            <span class="letter">${String.fromCharCode(65+i)}</span><span>${UI.esc(o)}</span></button>`).join('')}
        </div>
        <div class="feedback-slot" id="quizFeedback"></div>
        <div class="quiz-actions">
          <button class="btn btn-primary" id="quizCheck" type="button" disabled>Check answer</button>
          <span class="quiz-hint">You get feedback after each answer.</span>
        </div>`;

      const opts = shell.querySelector('#quizOpts');
      const check = shell.querySelector('#quizCheck');
      opts.querySelectorAll('.opt').forEach(btn=>btn.addEventListener('click', ()=>{
        if(checked) return;
        chosen = +btn.dataset.opt;
        opts.querySelectorAll('.opt').forEach(n=>n.classList.remove('selected'));
        btn.classList.add('selected');
        check.disabled = false;
      }));

      check.addEventListener('click', ()=>{
        checked = true;
        const correct = chosen === q.answer;
        results[idx] = correct;
        opts.querySelectorAll('.opt').forEach(n=>{
          n.classList.add('locked');
          if(+n.dataset.opt === q.answer) n.classList.add('correct');
        });
        if(!correct) opts.querySelector(`[data-opt="${chosen}"]`).classList.add('wrong');
        shell.querySelector('#quizFeedback').innerHTML =
          `<div class="feedback ${correct?'good':'bad'}"><b>${correct?'✓ Correct!':'✗ Not quite.'}</b>${q.explain}</div>`;
        shell.querySelector('.quiz-actions').innerHTML =
          `<button class="btn btn-primary" id="quizNext" type="button">${idx===mod.quiz.length-1?'See results →':'Next question →'}</button>
           <span class="quiz-hint">${correct?'Nice work.':'No problem — the explanation is above.'}</span>`;
        shell.querySelector('#quizNext').addEventListener('click', ()=>{
          idx++; chosen = null; checked = false; render();
        });
      });
    }

    function renderResult(){
      const score = results.filter(Boolean).length;
      const pct = Math.round(score/mod.quiz.length*100);
      const pass = pct >= 70;
      shell.innerHTML = `
        <div class="quiz-result">
          <div class="score-ring" style="--pct:${pct}"><div><b>${pct}%</b><small>${score}/${mod.quiz.length} correct</small></div></div>
          <h3>${pass?'Module mastered!':'Keep going — review and retry.'}</h3>
          <p>${pass
            ? 'You have earned the Module ' + mod.number + ' badge. Revisit any section any time; your progress is saved in this browser.'
            : 'Review the reading and try again. There is no penalty for retries — that is how learning works.'}</p>
          ${pass?`<div class="result-badge">🏅 Module ${mod.number} badge unlocked</div>`:''}
          <div class="btn-row" style="justify-content:center">
            <button class="btn btn-navy" id="quizRetry" type="button">↻ Try again</button>
            <a class="btn btn-ghost" href="#/progress">See my progress</a>
          </div>
        </div>`;
      shell.querySelector('#quizRetry').addEventListener('click', ()=>{
        idx=0; chosen=null; checked=false; results.fill(null); render();
      });
      if(pass && !App.isDone(mod.id,'quiz')) App.complete(mod.id,'quiz',25+score*5,'Quiz passed!');
      else if(!App.isDone(mod.id,'quiz')) App.complete(mod.id,'quiz',Math.max(0,score*2),'Quiz attempted');
      App.updateModuleHeader(mod.id);
    }

    render();
  }
};
