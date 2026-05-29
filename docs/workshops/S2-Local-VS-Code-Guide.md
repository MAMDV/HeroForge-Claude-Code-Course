# Workshop 2 — Optional: Using Claude Code Locally with VS Code

**Surface:** VS Code (desktop) + Terminal
**Audience:** All levels — **optional / advanced**
**Prerequisites:** Comfortable with the Codespaces flow from Workshop 2

> 💡 **You do not need this guide to complete the course.** The whole course runs in GitHub Codespaces (see [the main README](../../README.md)) — that's the recommended path, and it works identically on every machine. This guide is for students who *want* to run Claude Code on their own computer, in the desktop version of VS Code, instead of in the cloud. It's a good thing to come back to once you're comfortable with the tools, or after the course when you keep building on your own.

---

## Should you go local?

There's no wrong answer here. Both paths use the exact same Claude Code and the exact same VS Code — the only difference is *where they run*.

| | **Codespaces** (course default) | **Local** (this guide) |
|---|---|---|
| Setup | Nothing to install | Install Git, Claude Code, VS Code once |
| Safety | Sandboxed, disposable cloud machine | Your real files are in scope — be careful |
| Works on every OS the same | Yes | You handle OS differences |
| Free monthly hours | Limited (Codespaces budget) | Unlimited — it's your computer |
| Best for | Following the workshops | Building your own projects long-term |

**Recommendation:** stay in Codespaces for the workshops, and switch to local once you want a permanent home for your own work. If you're not sure, you don't need to decide now.

> ⚠️ **The big difference is safety.** In a Codespace, Claude Code can only touch a throwaway cloud machine. On your own computer, it can read, create, edit, and delete your real files. Always run it from inside a specific project folder, keep your work in Git, and review changes before approving them. The [Local Setup Guide](../../README-local.md) covers this in detail — read its safety section before you start.

---

## Step 1: Install the tools

Installation (Git, Claude Code, VS Code, and the `dsp` shortcuts) is covered in full, with OS-by-OS instructions for macOS, Windows, and Linux, in:

### → [README-local.md](../../README-local.md)

Work through its steps 1–7 — install the four tools, clone your own copy of the course repo, open it in VS Code with `code .`, and create your work branch. Then come back here to learn the day-to-day workflow.

> 💡 We keep all install instructions in one place (`README-local.md`) on purpose, so there's only ever one set of steps to follow and keep current. This guide focuses on *using* Claude Code locally once it's installed.

---

## Step 2: The local VS Code layout

When you open your course folder locally with `code .`, you'll see the **same VS Code you used in Codespaces** — File Explorer on the left, editor in the center, terminal panel at the bottom. Everything you learned in Workshop 2 (Part 3) applies unchanged.

Two small things are different on the desktop:

- **You open the folder yourself.** Instead of a Codespace spinning up automatically, you launch VS Code on a folder — either `code .` from the terminal, or **File → Open Folder…** from the menu.
- **The terminal is your computer's terminal.** Open it with ``Ctrl+` `` (backtick) just like before, but now commands run against your real machine (your files, your installed tools), not a cloud container.

---

## Step 3: Run Claude Code in the VS Code terminal

This is the heart of the local workflow, and it's the same muscle memory as Codespaces:

1. Open the integrated terminal in VS Code: ``Ctrl+` ``
2. Make sure you're inside your course project folder (the prompt should show the project name; run `pwd` to confirm).
3. Start Claude Code:

   ```bash
   claude
   ```

   💡 Or use the shortcut from `README-local.md`: `dsp` for a fresh session, `dsp-c` to resume your last one.

4. Give it a prompt in plain English, exactly as you did in Workshop 2:

   ```bash
   claude "Create a file called hello-local.txt confirming my local environment works"
   ```

As Claude proposes file changes, **VS Code shows them inline** — you'll see the edited files light up in the File Explorer and the diff appear in the editor. Approve or reject each change right there. This is the same review loop you'll use throughout the course.

> ⚠️ **Approve deliberately on your own machine.** In a Codespace it's safe to move fast. Locally, read each proposed change before you accept it, and hold off on "accept all" / `--dangerously-skip-permissions` until you fully trust what's happening — those changes hit your real files.

---

## You're ready — the rest of the course is identical

That's the entire local-specific workflow. **From Workshop 3 onward, every step works exactly the same locally as it does in Codespaces** — the prompts, the Git commands, the app you build, all of it. Wherever a workshop says "in your Codespace terminal," just read it as "in your VS Code terminal."

Head to **[Workshop 3: Real Projects, Real Git](./S3-Workshop.md)** and keep building.

---

## Local-specific troubleshooting

For general install problems (`claude: command not found`, `code: command not found`, `git clone` asking for a password, PowerShell vs CMD), see the **[Troubleshooting section in README-local.md](../../README-local.md#troubleshooting)**. The items below are specific to running Claude Code inside local VS Code:

| Problem | Cause | Solution |
|---------|-------|----------|
| `code .` doesn't open VS Code | `code` command not on your PATH | macOS: open VS Code → `Cmd+Shift+P` → "Shell Command: Install 'code' command in PATH". Windows: re-run the installer and tick "Add to PATH". |
| Claude Code's changes don't show in the editor | A different folder is open than the one Claude is editing | Make sure VS Code's open folder is the same project directory your terminal is in (`pwd` to check). |
| Claude can see files outside my project | You launched `claude` from your home directory | Quit it, `cd` into your specific project folder, and start `claude` again. Never run it from your home/Documents/Desktop. |
| Wrong terminal type on Windows | CMD instead of PowerShell/WSL | Use PowerShell or WSL for this course — see `README-local.md`. |

---

## Where to go next

- **Install steps (all operating systems)** → [README-local.md](../../README-local.md)
- **Continue the course** → [Workshop 3: Real Projects, Real Git](./S3-Workshop.md)
- **Back to the main README** → [README.md](../../README.md)
