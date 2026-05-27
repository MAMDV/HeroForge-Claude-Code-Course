# LifeOps Command Center

A personal productivity dashboard built during the **Mastering Claude Code** course by HeroForge.AI.

## Session 3 Goals

In this session, you'll turn this starter repo into a working app with real data:

- [ ] Load contacts from `data/contacts.json` and display them
- [ ] Load tasks from `data/tasks.json` and display them with priorities
- [ ] Load notes from `data/notes.json` and display them
- [ ] Add a new contact using a form
- [ ] Add a new task using a form
- [ ] Add a new note using a form
- [ ] Delete contacts, tasks, and notes
- [ ] Search and filter contacts
- [ ] Filter tasks by status (all / active / completed)
- [ ] Commit your changes with meaningful git messages

## Getting Started

1. Open this repo in a GitHub Codespace
2. The devcontainer will automatically install dependencies
3. Open `index.html` in the browser to see the starter app
4. Use Claude Code to add features step by step

## Project Structure

```
├── index.html          # Main HTML with placeholder sections
├── style.css           # Styles with CSS custom properties for theming
├── app.js              # JavaScript with DOMContentLoaded stub
├── data/
│   ├── contacts.json   # Seed contacts (fictional data)
│   ├── tasks.json      # Seed tasks (fictional data)
│   └── notes.json      # Seed notes (fictional data)
├── .env.example        # Environment variable documentation
└── .devcontainer/
    └── devcontainer.json  # GitHub Codespaces configuration
```

## Important Notes

- All seed data uses **fictional names only** — do not enter real personal information
- Environment variables go in `.env` (never committed) — see `.env.example`
- This app uses vanilla HTML, CSS, and JavaScript (no build tools needed for Session 3)
