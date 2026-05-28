# Mastering Claude Code — Course Repo

The student repo for **Mastering Claude Code: From Zero to Full Stack AI Developer**.

Across the course's hands-on sessions, you'll build and deploy a personal productivity dashboard — with contacts, tasks, notes, and live data integrations — using Claude Code and natural language.

---

## Getting Started

This course runs entirely in **GitHub Codespaces** — a full code editor and Linux machine that GitHub spins up for you in the cloud, on demand, in your browser. There's nothing to install on your laptop. You'll be writing code in about 5 minutes.

> ⚠️ **Why Codespaces (and why no local install yet)?** Claude Code can read, create, edit, and delete files in whatever environment it's running in. Running it inside a Codespace keeps it sandboxed in a disposable cloud machine — nothing on your laptop is ever touched. We'll cover local installation in a later session, once you're comfortable with the tools. If you want a head start on the local setup, see [README-local.md](./README-local.md) — but it's not needed for the course itself.

### 1. Create your own copy of the course from a template

This repo is set up as a **template repository** — that means each student creates their own copy in their own GitHub account. Your copy is yours: commit, push, break things, all without affecting anyone else.

1. Go to the course repo on GitHub: [https://github.com/MAMDV/HeroForge-Claude-Code-Course](https://github.com/MAMDV/HeroForge-Claude-Code-Course)
2. Click the green **`Use this template`** button near the top right of the page.
3. Choose **`Create a new repository`**.
4. Fill in the form:
   - **Owner:** your own GitHub username
   - **Repository name:** anything you like — e.g. `my-claude-code-course`
   - **Visibility:** Private is recommended (Public is fine too)
5. Click **`Create repository from template`**.
6. Wait a few seconds. GitHub will redirect you to your new repo once it's ready. The URL will look like `https://github.com/YOUR-USERNAME/my-claude-code-course` — confirm it says **your** username, not `MAMDV`.

> 💡 **What's a template?** A template repository is a normal GitHub repo with one setting flipped. Clicking "Use this template" copies the whole project — files and history — into your own account. Unlike a *fork*, a template copy is a clean break: there's no "send a pull request back to the original" relationship, just your own standalone repo.

### 2. Open your copy in a Codespace

Make sure you're looking at **your own copy** (the URL should start with `https://github.com/YOUR-USERNAME/...`), then:

1. Click the green **`Code`** button.
2. Choose the **`Codespaces`** tab.
3. Click **`Create codespace on main`**.

GitHub opens a full VS Code editor right in your browser, running on a Linux machine in the cloud. Everything you need to follow the course lives in this Codespace.

> 💡 **Codespaces auto-suspend after 30 minutes idle** to save your free hours. When you come back, just reopen the Codespace from the **Code → Codespaces** tab — your work is saved exactly as you left it.

### 3. Create your own work branch

In the Codespace, look for the **Terminal** panel at the bottom of the screen. (If you don't see it, click the `Terminal` menu at the top and choose `New Terminal`.)

In the terminal, run:

```bash
git checkout -b yourname-session-1
```

Replace `yourname` with your actual name — for example, `git checkout -b alex-session-1`. This gives you a safe space to experiment while keeping `main` clean.

> 💡 **What's a branch?** A branch is a separate line of changes inside the same project. You can edit freely on your branch, and the original code on `main` stays exactly as it was until you choose to bring your changes back in.

### 4. Install Claude Code

Still in the Codespace terminal, paste this in and press **Enter**:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

(Codespaces run on Linux, so this is the right command.)

Then start Claude Code so you can sign in:

```bash
claude
```

The first time you run this, Claude walks you through signing in — follow the prompts to authenticate in your browser. Once you're logged in, your credentials are saved and you won't be asked again.

You can confirm the install worked at any time by checking the version:

```bash
claude --version
```

If you see something like `2.x.x`, you're good to go. If you see "command not found", close and reopen your terminal so it picks up the new `claude` command, then try again.

### 5. Create shortcuts

These shortcuts save you from typing long commands every time. Paste this into your Codespace terminal:

```bash
echo -e "alias dsp='claude --dangerously-skip-permissions'\nalias dsp-c='claude --dangerously-skip-permissions -c'" >> ~/.bashrc
```

Then reload your shell config so the shortcuts are available immediately:

```bash
source ~/.bashrc
```

This creates two shortcuts:

| Shortcut | What It Does |
|----------|--------------|
| `dsp` | Starts Claude Code without asking permission for every action (needed for agent workflows) |
| `dsp-c` | Same as above, but resumes your last session so it remembers what you were working on |

> ⚠️ **Security note:** The `--dangerously-skip-permissions` flag lets Claude run commands without asking you to approve each one. This is safe inside a Codespace (it's a throwaway cloud machine you fully control), but be very cautious if you ever use this flag on your own computer.

### 6. Follow the workshop guide

Each session has a step-by-step guide in [`docs/workshops/`](./docs/workshops/). Open the one that matches your session and follow along.

---

**Which session should I start with?**

- **Brand new to coding?** Start at **Session 1**. Sessions 1 and 2 are built for total beginners.
- **Already comfortable with a terminal, Git, and VS Code?** You can jump straight to **Session 3**, where the beginner and experienced tracks merge.

---

## Session Breakdown

| # | Title | What You'll Build |
|---|-------|-------------------|
| 1 | Your First AI-Built Web Page | Static personal landing page in Claude Code Web |
| 2 | Setting Up Your Dev Environment | Local terminal + VS Code, first `hello.txt` |
| 3 | Real Projects, Real Git | Contacts + task list, committed through a real Git workflow |
| 4 | Multi-File Apps and CLAUDE.md | Refactor to a multi-file React app with persistent project context |
| 5 | Connecting to the Outside World | Live weather/data widget + GitHub MCP integration |
| 6 | Cloud Tasks and Mobile Control | Unit tests + mobile-driven code change via Remote Control |
| 7 | Agents, Skills, and Automation | Sub-agents, agentic loops, security hooks, and custom Skills |
| 8 | Ship It: Deploy and Present | Deploy to a live URL with a merged PR |
| 9 | Make It Yours | UI redesign with CommandPalette, Motion animations, and the Frontend Design skill |

---

## Working on Your Branch

You'll do all your work on a branch named after you, like `alex-session-1`. As you move from one session to the next, you can either:

- **Keep building on the same branch** (simplest — your work just accumulates), or
- **Create a fresh branch for the new session** — for example, `git checkout -b alex-session-4` — so each session has its own clean history.

Either way is fine. Everything stays inside your own template copy of the repo, so there's nothing to submit and nothing to break.

---

## Where to Find Things

- **Workshop guides** (the step-by-step you'll follow each session) → [`docs/workshops/`](./docs/workshops/)
- **Reference materials and course outline** → [`docs/`](./docs/)
- **App source code** → [`src/`](./src/)
- **Local install instructions** (for using Claude Code on your own computer) → [`README-local.md`](./README-local.md)

---

## Prerequisites

- A laptop with a modern web browser
- A [Claude Pro or Max](https://claude.ai/upgrade) subscription (**Max recommended** for Session 6's Remote Control features)
- A free [GitHub account](https://github.com/signup)
- **No prior coding experience required** for the beginner track (Sessions 1–2)

---

## License and Usage

This repository is provided exclusively as companion material for enrolled students of the Mastering Claude Code course. You may view and run this code locally for your own learning. You may **not** redistribute, republish, sell, or use this code for any commercial purpose. Forks of this repository are permitted by GitHub's Terms of Service for personal reference only and do not grant any additional rights.

See [LICENSE](./LICENSE) for full terms.
