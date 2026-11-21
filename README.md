# HIST 1302 — Interactive U.S. History Survey

[![GitHub Pages](https://img.shields.io/badge/site-GitHub%20Pages-blue?style=flat-square)](https://sevekh33-glitch.github.io/hist-1302-interactive-course/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![No build step](https://img.shields.io/badge/build-none-orange?style=flat-square)](.)

> A survey course of U.S. History since 1876 built like an interactive experience: video, games, primary-source analysis, instant-feedback quizzes and an AI tutor that knows the course content.

**Live demo:** https://sevekh33-glitch.github.io/hist-1302-interactive-course/

---

## Why this project

HIST 1302 is usually taught as a slide deck followed by a multiple-choice exam. This project asks a different question: *what if the survey course were designed around feedback and curiosity instead?*

Every module follows the same learning loop:

1. **Watch** — a short curated video (Crash Course U.S. History) with a guiding question.
2. **Read** — concise, sourced notes with hoverable definitions.
3. **Play** — a matching activity and a chronology puzzle.
4. **Investigate** — a real primary source with questions modeled on historical reasoning.
5. **Prove it** — a Coursera-style quiz: one question at a time, instant explanation after each answer.
6. **Ask** — an AI tutor grounded in that module's actual content, with a built-in offline knowledge base so it never stalls.

Progress (XP, badges and best quiz scores) is stored in `localStorage`. No accounts, no backend, no tracking.

## Features

- 4 complete pilot modules (1865–1920), 24 quiz questions, 8 source-analysis questions
- 12 interactive games (matching + chronology per module)
- 24 flip cards, hover glossary, instant feedback on every question
- XP, badges, per-module progress bars and a dashboard
- Hash-based router — works on GitHub Pages with zero configuration
- Fully responsive (desktop, tablet, phone) and keyboard-accessible flashcards
- AI tutor: free public endpoint by default; bring your own OpenAI / OpenRouter key optionally
- Zero dependencies, zero build step — plain HTML, CSS and JavaScript

## Run it locally

```bash
git clone https://github.com/sevekh33-glitch/hist-1302-interactive-course.git
cd hist-1302-interactive-course
python -m http.server 8000
```

Open <http://localhost:8000>. That's it — no `npm install`.

## Publish on GitHub Pages

1. Push this folder to a new **public** repository.
2. In the repo: **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch** → branch `main`, folder `/ (root)` → **Save**.
4. Your site is live at https://sevekh33-glitch.github.io/hist-1302-interactive-course/ (already configured).

## Project structure

```
hist1302-interactive/
├── index.html          # app shell + navigation + tutor mount
├── css/styles.css      # complete design system (parchment / navy / rust / gold)
├── js/
│   ├── data.js         # ALL course content — the only file you need to edit to add modules
│   ├── ui.js           # quiz engine, games, flashcards, source questions
│   ├── tutor.js        # AI tutor + offline fallback knowledge base
│   └── app.js          # router, progress persistence, home and dashboard
├── .nojekyll           # lets GitHub Pages serve the folder as-is
└── README.md
```

### Add a module

Add one object to `COURSE.modules` in `js/data.js` with: `id`, `number`, `theme`, `title`, `era`, `tagline`, `objectives`, `video`, `reading`, `matching`, `ordering`, `flashcards`, `source`, `quiz`.

The router, cards, progress dashboard and AI tutor context all pick it up automatically. No other file needs to change.

### AI tutor setup

By default the tutor uses a free public text endpoint — it works without configuration. If you want reliable access, click the **⚙** button in the tutor panel and add an OpenRouter or OpenAI key. The key is stored only in your browser's `localStorage`; it is never sent anywhere except the provider you choose.

If no AI endpoint is reachable, the tutor automatically answers from its built-in glossary and reading knowledge base and tells the student it is in offline mode.

## Content & credits

- Video overviews: **Crash Course U.S. History** (PBS / Complexly), embedded from YouTube with enhanced privacy. All rights to the videos remain with their creators; the embeds link back to the originals.
- Primary sources (Black Codes, Omaha Platform, *The Jungle*, Fourteen Points) are in the U.S. public domain.
- Reading notes are original to this project and intended as study scaffolding, not a substitute for the textbook.
- Code released under the [MIT license](LICENSE).

## LinkedIn post draft

> I built an interactive HIST 1302 course — and published it as a free, open-source web app. 🎓
>
> Instead of a slide deck, students move through four modules (Reconstruction → WWI) with:
> ▶ short video overviews
> ⇄ matching and chronology games
> ❝ real primary sources with historian-style questions
> ✦ instant-feedback quizzes
> 🤖 an AI tutor that actually knows the course content
>
> Everything is vanilla HTML/CSS/JS — no build step, no backend, no paywall. Progress and badges are saved locally, and adding a new module is just one entry in a data file.
>
> The interesting engineering problem was the tutor: it needs the module's real content as context, but must degrade gracefully when no AI service is reachable. The offline knowledge base handles that.
>
> Live demo + code in the comments. Feedback welcome — especially from history teachers.

## What's next

- Modules 5–15 (1920s → present) — the engine already supports them
- Instructor dashboard with exportable quiz results (requires a backend)
- "Exam mode" that shuffles all questions across modules
- Optional spaced-repetition scheduling for the flashcards
