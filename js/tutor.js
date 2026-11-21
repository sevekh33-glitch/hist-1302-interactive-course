/* ============================================================
   AI TUTOR — optional live AI + guaranteed offline fallback.
   Default: free Pollinations endpoint (no key needed).
   Settings let you use your own OpenAI / OpenRouter key.
   ============================================================ */

const Tutor = {

  module: null,
  messages: [],
  busy: false,

  init(){
    const root = document.getElementById('tutor-root');
    if(!root) return;
    root.innerHTML = `
      <button class="tutor-fab" id="tutorFab" type="button" title="Ask the AI tutor">✦<span class="ping"></span></button>
      <section class="tutor-panel" id="tutorPanel" aria-label="AI Tutor">
        <div class="tutor-head">
          <div class="t-ico">H?</div>
          <div><b>HIST 1302 Tutor</b><small id="tutorCtx">Ask me anything about the course</small></div>
          <button class="t-close" id="tutorClose" type="button" aria-label="Close">×</button>
        </div>
        <div class="tutor-msgs" id="tutorMsgs">
          <div class="msg bot">Hi! I'm your history tutor. I can explain a concept, help you think through a quiz question, or connect what you just read to the bigger picture. What are you stuck on?</div>
        </div>
        <div class="tutor-chips" id="tutorChips"></div>
        <div class="tutor-input">
          <textarea id="tutorText" rows="1" placeholder="Type your question…" aria-label="Your message"></textarea>
          <button class="tutor-send" id="tutorSend" type="button" title="Send">➤</button>
        </div>
        <div class="tutor-settings" id="tutorSettings">
          <b>Connect your own AI (optional)</b><br>
          The free public endpoint works out of the box. For reliability, paste a key from
          <a href="https://openrouter.ai/keys" target="_blank" rel="noopener">OpenRouter</a> or OpenAI.
          <select id="tProvider" style="width:100%;border:1.5px solid var(--line);border-radius:9px;padding:8px;margin-top:6px;font-size:13px">
            <option value="pollinations">Free public endpoint (no key)</option>
            <option value="openrouter">OpenRouter (your key)</option>
            <option value="openai">OpenAI (your key)</option>
          </select>
          <input id="tKey" type="password" placeholder="API key (stored only in this browser)" autocomplete="off">
          <input id="tModel" type="text" placeholder="Model (optional) — e.g. openai/gpt-4o-mini">
          <div style="display:flex;gap:10px;align-items:center">
            <button class="btn btn-navy btn-sm" id="tSave" type="button">Save</button>
            <a id="tSettingsToggle">Hide settings</a>
          </div>
        </div>
      </section>`;

    const $ = id=>document.getElementById(id);
    $('tutorFab').addEventListener('click', ()=>this.open());
    $('tutorClose').addEventListener('click', ()=>this.close());
    $('tutorSend').addEventListener('click', ()=>this.send());
    $('tutorText').addEventListener('keydown', e=>{
      if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); this.send(); }
    });
    $('tSettingsToggle').addEventListener('click', ()=>$('tutorSettings').classList.remove('open'));
    $('tHeadSettings')?.addEventListener('click', ()=>$('tutorSettings').classList.toggle('open'));
    $('tSave').addEventListener('click', ()=>{
      const cfg = {
        provider: $('tProvider').value,
        key: $('tKey').value.trim(),
        model: $('tModel').value.trim()
      };
      try{ localStorage.setItem('hist1302_ai_config', JSON.stringify(cfg)); }catch(e){}
      this.push('sys','Settings saved in this browser.');
    });

    // settings button in header (small gear next to close)
    const gear = document.createElement('button');
    gear.textContent = '⚙';
    gear.title = 'AI settings';
    gear.style.cssText = 'margin-left:6px;background:none;border:0;color:#cfe0f0;font-size:15px;cursor:pointer';
    gear.addEventListener('click', ()=>$('tutorSettings').classList.toggle('open'));
    $('tutorClose').before(gear);

    const cfg = this.config();
    $('tProvider').value = cfg.provider;
    $('tKey').value = cfg.key;
    $('tModel').value = cfg.model;
    this.chips();
  },

  config(){
    try{
      const c = JSON.parse(localStorage.getItem('hist1302_ai_config'));
      if(c && c.provider) return c;
    }catch(e){}
    return { provider:'pollinations', key:'', model:'' };
  },

  setContext(mod){
    this.module = mod || null;
    const ctx = document.getElementById('tutorCtx');
    if(ctx) ctx.textContent = mod ? `Context: Module ${mod.number} · ${mod.title}` : 'Ask me anything about the course';
    this.chips();
  },

  chips(){
    const el = document.getElementById('tutorChips');
    if(!el) return;
    const m = this.module;
    const list = m ? [
      `Explain ${m.reading.glossary[0].t}`,
      'Help me with this quiz question',
      'Give me a 30-second summary',
      'What should I remember?'
    ] : [
      'Why study Reconstruction?',
      'Summarize the whole course',
      'Give me a study plan'
    ];
    el.innerHTML = list.map(c=>`<button class="tutor-chip" type="button">${c}</button>`).join('');
    el.querySelectorAll('.tutor-chip').forEach(b=>b.addEventListener('click', ()=>{
      this.send(b.textContent);
    }));
  },

  open(){
    const p = document.getElementById('tutorPanel');
    if(!p) return;
    p.classList.add('open');
    document.getElementById('tutorText').focus();
  },

  close(){
    document.getElementById('tutorPanel')?.classList.remove('open');
  },

  md(s){
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  },

  push(role, text){
    const box = document.getElementById('tutorMsgs');
    if(!box) return;
    const div = document.createElement('div');
    div.className = 'msg ' + role;
    if(role === 'bot') div.innerHTML = this.md(text);
    else div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  },

  thinking(on){
    const box = document.getElementById('tutorMsgs');
    let t = box.querySelector('.thinking');
    if(on && !t){
      t = document.createElement('div');
      t.className = 'msg thinking';
      t.innerHTML = '<i></i><i></i><i></i>';
      box.appendChild(t);
    } else if(!on && t) t.remove();
    if(box) box.scrollTop = box.scrollHeight;
  },

  async send(forced){
    if(this.busy) return;
    const input = document.getElementById('tutorText');
    const text = (forced || input.value).trim();
    if(!text) return;
    input.value = '';
    this.push('user', text);
    this.messages.push({role:'user', content:text});
    this.busy = true;
    document.getElementById('tutorSend').disabled = true;
    this.thinking(true);

    let answer = null;
    try{ answer = await this.ask(this.buildMessages()); }
    catch(e){ console.warn('AI endpoint unavailable, using offline tutor:', e); }

    this.thinking(false);
    if(!answer){
      answer = this.offline(text);
      if(!this._warned){
        this.push('sys','Live AI is unavailable right now — I answered from the built-in course knowledge base instead. You can add your own API key via ⚙.');
        this._warned = true;
      }
    }
    this.push('bot', answer);
    this.messages.push({role:'assistant', content:answer});
    if(this.messages.length > 14) this.messages = this.messages.slice(-14);
    this.busy = false;
    document.getElementById('tutorSend').disabled = false;
  },

  buildMessages(){
    const m = this.module;
    let context = 'You are a patient, encouraging tutor for an open-source U.S. History survey course (HIST 1302: since 1876). Answer in plain language, 2–4 short paragraphs or bullets. Be accurate and concrete with dates and names. When a student asks about a quiz answer, guide their reasoning with a hint rather than only giving the letter.';
    if(m){
      const glossary = m.reading.glossary.map(g=>`- ${g.t}: ${g.d}`).join('\n');
      const sections = m.reading.sections.map(s=>`${s.h}: ${s.p.replace(/<[^>]+>/g,'')}`).join('\n');
      context += `\n\nCURRENT MODULE: ${m.title} (${m.era})\nObjectives: ${m.objectives.join('; ')}\n\nKEY TERMS:\n${glossary}\n\nREADING NOTES:\n${sections.slice(0,6000)}`;
    } else {
      context += '\n\nModules: ' + COURSE.modules.map(x=>`${x.number}. ${x.title} (${x.era})`).join('; ');
    }
    return [{role:'system',content:context}, ...this.messages.slice(-8)];
  },

  async ask(messages){
    const cfg = this.config();
    let url, model, headers = {'Content-Type':'application/json'};

    if(cfg.provider === 'openai'){
      url = 'https://api.openai.com/v1/chat/completions';
      model = cfg.model || 'gpt-4o-mini';
      if(!cfg.key) throw new Error('No OpenAI key');
      headers.Authorization = 'Bearer ' + cfg.key;
    } else if(cfg.provider === 'openrouter'){
      url = 'https://openrouter.ai/api/v1/chat/completions';
      model = cfg.model || 'openai/gpt-4o-mini';
      if(!cfg.key) throw new Error('No OpenRouter key');
      headers.Authorization = 'Bearer ' + cfg.key;
    } else {
      url = 'https://text.pollinations.ai/openai';
      model = cfg.model || 'openai';
    }

    const res = await fetch(url, {
      method:'POST', headers,
      body: JSON.stringify({ model, messages, stream:false, temperature:0.6, max_tokens:550 })
    });
    if(!res.ok) throw new Error('AI HTTP ' + res.status);
    const data = await res.json();
    const txt = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || data?.text;
    if(!txt) throw new Error('Empty AI response');
    return String(txt).trim();
  },

  /* ---- Offline knowledge base: never leave the student hanging ---- */
  offline(q){
    const query = q.toLowerCase();
    const modules = this.module ? [this.module] : COURSE.modules;

    // 1. direct glossary hit
    for(const m of modules){
      for(const g of m.reading.glossary){
        const words = g.t.toLowerCase().split(/\s+/).filter(w=>w.length>3);
        if(words.some(w=>query.includes(w))){
          return `**${g.t}** — ${g.d}\n\nIn Module ${m.number} (${m.title}), this matters because it is part of the larger question of the era: who gets rights, who gets access to power, and how far the federal government will go to protect them.\n\nTry applying it: can you name one event from the timeline that shows this idea in action?`;
        }
      }
    }

    // 2. flashcard hit
    for(const m of modules){
      for(const c of m.flashcards){
        const words = c.front.toLowerCase().split(/\s+/).filter(w=>w.length>4);
        if(words.some(w=>query.includes(w))){
          return `From Module ${m.number}: **${c.front}** — ${c.back}\n\nIf you are working on the quiz, look for the answer choice that captures this idea rather than one that is merely a date or a name.`;
        }
      }
    }

    // 3. intent-based help
    if(/summary|summar|recap|30.second|big picture/.test(query)){
      return this.module
        ? `In one minute: ${this.module.reading.lede}\n\nThe three things to hold onto are: ${this.module.objectives.slice(0,2).join(' ')} And finally: ${this.module.objectives[2]}. If you can explain those in your own words, you are ready for the quiz.`
        : `The course follows one thread from 1876 onward: how Americans argued over freedom, citizenship and the reach of government.\n\nModule 1 — Reconstruction and the meaning of freedom.\nModule 2 — Industrial wealth and the Populist backlash.\nModule 3 — Progressives trying to reform the system, and the limits of that reform.\nModule 4 — A world war that transformed the federal government at home.`;
    }
    if(/quiz|answer|option|hint|stuck|don't know|help me/.test(query)){
      return `A good method for these quizzes:\n\n1. Eliminate any answer that is too absolute — history questions rarely turn on "always" or "never."\n2. Ask what the question is really testing: a cause, a consequence, or a definition?\n3. Match it to the learning objectives at the top of the module — every quiz question comes from one of them.\n\nTell me which question number you are on and I'll help you reason through it.`;
    }
    if(/study|plan|learn|remember|memor/.test(query)){
      return `Try this loop for each module:\n\n1. Watch the video and write down one question.\n2. Play the matching and timeline games — they build the mental scaffolding.\n3. Flip every flashcard once, then again from memory.\n4. Do the source analysis before the quiz, not after.\n5. Take the quiz. If you miss one, re-read that section and retry — your best score is the one that counts.`;
    }

    // 4. generic grounded answer
    return this.module
      ? `That's a good question. In **${this.module.title}** (${this.module.era}), the key tension is this: ${this.module.objectives[0]}\n\nLook especially at the section "**${this.module.reading.sections[0].h}**" in the reading. If you can connect that to a specific event from the timeline game, you'll have a strong answer. If you want, rephrase your question with a name or date and I'll try to pin it down.`
      : `This course covers U.S. history from Reconstruction to the First World War. Try asking about a specific topic — for example "what was sharecropping?", "why did Progressivism have limits?", or "give me a study plan." I can also explain anything in the glossary of the module you are currently reading.`;
  }
};

document.addEventListener('DOMContentLoaded', ()=>Tutor.init());
