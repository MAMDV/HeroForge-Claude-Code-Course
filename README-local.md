# Mastering Claude Code — Local Setup Guide

This guide walks you through installing Claude Code and the course tools **on your own computer** — instead of running everything in a GitHub Codespace.

> 💡 **Most students should stick with the Codespaces flow in [README.md](./README.md).** Codespaces is the recommended path for the course: faster to start, identical on every operating system, and safely sandboxed from your real files. Come back to this guide later (we'll cover it in a future session) or if you've already finished the course and want to keep using Claude Code on your own machine.

---

## ⚠️ Heads up: Claude Code can change files on your computer

Claude Code can read, create, edit, and delete files in whatever environment it's running in. On your own computer, that means your real files are in scope. To stay safe:

- **Always run Claude Code from inside a specific project folder.** Don't launch it from your home folder, `Documents`, or `Desktop`.
- **Keep your work committed to Git** so you can roll back if Claude does something you didn't want.
- **Review the changes Claude proposes before approving them** — don't enable "Accept all" until you've watched Claude work for a while and trust the situation.
- **Be cautious with `--dangerously-skip-permissions`** on your own machine. That flag tells Claude not to ask before running commands or editing files — fine inside a disposable Codespace, riskier on your real laptop.

---

## What You'll Install

You'll set up four things on your computer:

1. **Git** — the version-control tool the course depends on
2. **Claude Code** — the AI coding assistant itself
3. **VS Code** — the code editor (the same one you've been using in Codespaces)
4. **Shortcuts** — small command aliases that save typing

Then you'll clone your own copy of the course repo and open it in VS Code.

---

## 1. Install Git

Git is the tool that tracks changes to your code. You may already have it.

To check, open a terminal (Terminal on macOS/Linux, PowerShell on Windows) and run:

```bash
git --version
```

If you see a version number (e.g. `git version 2.42.0`), you're done — skip ahead to **Step 2**. Otherwise:

**macOS:**

The easiest path is to install the Apple Command Line Tools, which include Git. Just type `git --version` in Terminal — macOS will pop up a dialog offering to install them. Click **Install** and wait a few minutes.

Or, if you use [Homebrew](https://brew.sh) (a package manager — like an app store for command-line tools):

```bash
brew install git
```

**Windows:**

Download and run the installer from [git-scm.com/downloads/win](https://git-scm.com/downloads/win). Accept the default options unless you have a reason not to. The installer also gives you **Git Bash**, a Linux-style terminal that's handy on Windows.

**Linux (Debian / Ubuntu):**

```bash
sudo apt update && sudo apt install git
```

**Linux (Fedora / RHEL):**

```bash
sudo dnf install git
```

After installing, confirm:

```bash
git --version
```

---

## 2. Install Claude Code

Pick the block that matches your operating system. These are the **same install commands** as the Codespaces flow, plus the Windows-specific options.

**macOS or Linux:**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows — WSL** (Windows Subsystem for Linux — a real Linux environment running inside Windows):

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows — PowerShell:**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**Windows — Command Prompt (CMD):**

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

> 💡 **Not sure if you're in PowerShell or CMD?** Look at your prompt. `PS C:\>` means PowerShell. `C:\>` (no `PS`) means CMD.

Next, start Claude Code so you can sign in:

```bash
claude
```

The first time you run this, Claude walks you through signing in via your browser. Once you're logged in, your credentials are saved.

Confirm the install worked:

```bash
claude --version
```

If you see something like `2.x.x`, you're good. If you see "command not found", close and reopen your terminal so it picks up the new `claude` command, then try again.

> 💡 **Other install methods:** If you prefer Homebrew (macOS), WinGet (Windows), or your Linux distro's package manager, see the [official install docs](https://code.claude.com/docs/en/setup).

---

## 3. Install VS Code

VS Code is the code editor you've been using inside Codespaces. The desktop version is the same thing, running directly on your computer.

**macOS:**

Download from [code.visualstudio.com](https://code.visualstudio.com) and drag the app into your `Applications` folder. Or, with Homebrew:

```bash
brew install --cask visual-studio-code
```

After opening VS Code once, press `Cmd+Shift+P`, type `Shell Command: Install 'code' command in PATH`, and hit Enter. This lets you launch VS Code from the terminal with just `code .`.

**Windows:**

Download the installer from [code.visualstudio.com](https://code.visualstudio.com) and run it. On the **Select Additional Tasks** screen, tick **"Add to PATH"** — that lets you open the editor from any terminal with `code .`.

**Linux (Debian / Ubuntu):**

Follow the official [VS Code on Linux instructions](https://code.visualstudio.com/docs/setup/linux) — they walk you through adding Microsoft's package repository and then installing with `sudo apt install code`.

**Linux (Fedora):**

```bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
sudo dnf install code
```

Confirm VS Code works:

```bash
code --version
```

---

## 4. Create your own copy of the course repo

If you haven't already, follow **Step 1** of the main [README.md](./README.md) to create your own copy of the course from the template. You need a copy you own so you can commit and push freely — don't try to clone the original course repo.

Once you have your copy (the URL will look like `https://github.com/YOUR-USERNAME/my-claude-code-course`), clone it to your computer.

In a terminal, navigate to wherever you want the course folder to live (e.g. `~/Projects`), then run:

```bash
git clone https://github.com/YOUR-USERNAME/my-claude-code-course.git
cd my-claude-code-course
```

Replace `YOUR-USERNAME` and `my-claude-code-course` with whatever you actually used.

---

## 5. Open the project in VS Code

From inside the cloned folder:

```bash
code .
```

VS Code launches with the whole project as your workspace. The `.` means "open this current folder."

---

## 6. Create your work branch

Same as the Codespaces flow — create a branch named after you so your work stays separate from `main`:

```bash
git checkout -b yourname-session-1
```

Replace `yourname` with your name.

---

## 7. Create shortcuts

These shortcuts save you from typing long Claude commands every time. Pick the block that matches your shell.

**macOS (zsh — the default on modern Macs):**

```bash
echo -e "alias dsp='claude --dangerously-skip-permissions'\nalias dsp-c='claude --dangerously-skip-permissions -c'" >> ~/.zshrc
source ~/.zshrc
```

**Linux (bash — the default on most distros):**

```bash
echo -e "alias dsp='claude --dangerously-skip-permissions'\nalias dsp-c='claude --dangerously-skip-permissions -c'" >> ~/.bashrc
source ~/.bashrc
```

**Windows (PowerShell):**

PowerShell uses *functions* instead of aliases when shortcuts need to pass arguments through. Paste this in:

```powershell
if (!(Test-Path $PROFILE)) { New-Item -Path $PROFILE -Type File -Force }
Add-Content $PROFILE "`nfunction dsp { claude --dangerously-skip-permissions @args }"
Add-Content $PROFILE "function dsp-c { claude --dangerously-skip-permissions -c @args }"
. $PROFILE
```

> 💡 **Windows CMD users:** Plain CMD doesn't support persistent shortcuts cleanly. Either type out the full `claude --dangerously-skip-permissions` command each time, or switch to PowerShell or WSL (both recommended over CMD for this course).

This creates two shortcuts:

| Shortcut | What It Does |
|----------|--------------|
| `dsp` | Starts Claude Code without asking permission for every action (needed for agent workflows) |
| `dsp-c` | Same as above, but resumes your last session so it remembers what you were working on |

> ⚠️ **Security note (worth a second read):** The `--dangerously-skip-permissions` flag lets Claude run commands without asking you to approve each one. Inside a Codespace this is safe — the Codespace is disposable. **On your own computer, your real files are at stake.** Only use this flag when you're inside a specific course-or-project folder you're working in, never from your home directory.

---

## 8. Start your first Claude Code session

From inside the course folder:

```bash
claude
```

(Or, with the shortcut you just created: `dsp` for a fresh session, `dsp-c` to resume your last conversation.)

Then open the workshop file for your session in `docs/workshops/` and follow along.

---

## Pulling course updates later

Because you created your copy from a template (not a fork), your repo doesn't know about the original course repo by default. If the course author publishes updates you want to pull in, set up the original as a remote *one time*:

```bash
git remote add upstream https://github.com/MAMDV/HeroForge-Claude-Code-Course.git
```

Then, any time you want to pull updates:

```bash
git fetch upstream
git merge upstream/main
```

You might hit merge conflicts if you've edited the same files the course updated — that's a normal Git situation and Claude can help you work through them.

---

## Troubleshooting

**`claude: command not found` after installing**

Close and reopen your terminal. The install script adds Claude to your `PATH`, but only new terminal windows pick that up.

**`code: command not found` on macOS**

Open VS Code, press `Cmd+Shift+P`, run `Shell Command: Install 'code' command in PATH`, then open a new terminal.

**`git clone` asks for a password**

GitHub stopped accepting passwords for `git` commands in 2021. Either:
- Set up [GitHub CLI](https://cli.github.com) (`gh auth login`) — easiest path, or
- Set up an [SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) and use the `git@github.com:...` URL instead of `https://...`, or
- Create a [personal access token](https://github.com/settings/tokens) and use that as the password.

**PowerShell `irm` command says "not recognized"**

You're probably in CMD, not PowerShell. Open PowerShell explicitly (Start menu → Windows PowerShell) and try again. Your prompt should say `PS C:\>`.

---

## Where to go next

- **Main course README** → [README.md](./README.md)
- **Workshop guides** → [`docs/workshops/`](./docs/workshops/)
- **Official Claude Code docs** → [code.claude.com/docs](https://code.claude.com/docs)
