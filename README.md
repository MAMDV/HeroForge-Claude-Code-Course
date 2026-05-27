# Mastering Claude Code — Course Repo

The student repo for **Mastering Claude Code: From Zero to Full Stack AI Developer**.

Across the course's hands-on sessions, you'll build and deploy a personal productivity dashboard — with contacts, tasks, notes, and live data integrations — using Claude Code and natural language.

---

## Getting Started

No setup, no installs — you'll be writing code in your browser in about 60 seconds.

### 1. Clone the Repository

"Cloning" just means making your own copy of this project so you can work on it without affecting anyone else's code. Think of it like photocopying a workbook — you get your own version to write in.

You have two options:

**Option A: Use GitHub Codespaces (recommended for beginners — nothing to install)**

1. Go to the repository page on GitHub.
2. Click the green **`Code`** button near the top of the page.
3. Choose the **`Codespaces`** tab.
4. Click **`Create codespace on main`**.

That's it — GitHub will open a full code editor right in your browser with everything ready to go. Skip ahead to **Step 2**.

**Option B: Clone to your own computer (if you prefer working locally)**

If you already have Git installed on your computer, open a terminal and run:

```bash
git clone https://github.com/MAMDV/HeroForge-Claude-Code-Course.git
cd HeroForge-Claude-Code-Course
```

The first command downloads the project to your computer. The second command moves you into the project folder so you're ready to work.

**Before you start making changes**, create your own branch so your work stays separate from the main copy:

```bash
git checkout -b yourname-session-1
```

Replace `yourname` with your actual name — for example, `git checkout -b alex-session-1`. This gives you a safe space to experiment without worrying about breaking anything on the main branch.

> 💡 **What's a branch?** A branch is like a separate copy of the project that lives inside the same folder. You can make all the changes you want on your branch, and the original code on `main` stays untouched.

### 2. Install Claude Code

Once your codespace opens, look for the **Terminal** panel at the bottom of the screen. (If you don't see it, click the `Terminal` menu at the top and choose `New Terminal`.)

In the terminal, type each of the following commands one at a time, pressing **Enter** after each one.

First, install Claude Code itself:

```bash
npm install -g @anthropic-ai/claude-code
```

Next, sign in with your Claude account:

```bash
claude login
```

This will print a link — open it in your browser, sign in, and copy the code it gives you back into the terminal.

Finally, confirm the install worked by checking the version number:

```bash
claude --version
```

If you see a version number printed (something like `2.x.x`), you're good to go. If you see an error, double-check you ran the `npm install` command above.

### 3. Load the starting point for your session

Still in the terminal, type this command and press **Enter** to load the starting point for Session 1:

```bash
git checkout S1-start
```

> 💡 **What does `git checkout` do?** It's how you tell Git which version of the code to show you. Every session has a `-start` branch with the code exactly as it looks at the beginning of that session. To load a different session, swap in its number — for example, `git checkout S4-start` loads the beginning of Session 4.

### 4. Follow the workshop guide

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

## Branch Structure

Every session has three branches so you can jump in, peek ahead, or reset to a known good state:

| Branch | Use it when... |
|--------|----------------|
| `S{N}-start` | You want the session's starting point — same code the instructor begins with |
| `S{N}-in-progress` | You got stuck partway and want a checkpoint mid-session |
| `S{N}-complete` | You want the finished result to compare against or skip ahead from |

Example — start Session 4:
```bash
git checkout S4-start
```

Peek at the finished Session 4 app:
```bash
git checkout S4-complete
```

---

## Where to Find Things

- **Workshop guides** (the step-by-step you'll follow each session) → [`docs/workshops/`](./docs/workshops/)
- **Reference materials and course outline** → [`docs/`](./docs/)
- **App source code** → [`src/`](./src/)

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
