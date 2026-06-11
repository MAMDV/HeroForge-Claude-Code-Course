# Workshop 2: Setting Up Your Dev Environment

**Estimated Time:** 45 minutes
**Difficulty:** Beginner (zero prior experience required)
**Surface:** Terminal + VS Code
**Prerequisites:** Completed Workshop 1 (Your First AI-Built Web Page), GitHub account

---

## Learning Objectives

By completing this workshop, you will:

- [ ] Open and navigate a GitHub Codespace
- [ ] Use basic terminal commands (`pwd`, `ls`)
- [ ] Configure Git with your identity
- [ ] Navigate the VS Code interface (file explorer, editor, terminal panel)
- [ ] Install Claude Code CLI globally using npm
- [ ] Use Claude Code to create a file from natural language
- [ ] Check token usage with the `/context` command
- [ ] Use essential keyboard shortcuts (Escape, Ctrl+C, Ctrl+R, `!` prefix)
- [ ] Verify your complete development pipeline works

---

## Prerequisites Checklist

Before starting, confirm you have:

- [ ] A GitHub account (free) — sign up at https://github.com/signup
- [ ] A Claude Pro or Max subscription — needed for Claude Code CLI
- [ ] Access to the course repository on GitHub
- [ ] A modern web browser (Chrome, Firefox, Safari, or Edge)

---

## Part 1: Open Your Codespace (5 minutes)

### Step 1: Navigate to the Course Repository

Open your browser and go to the course repository URL provided by your instructor.

### Step 2: Create a Codespace

1. Click the green **Code** button
2. Select the **Codespaces** tab
3. Click **Create codespace on main**
4. Wait approximately 60 seconds for the environment to load

> **What is a Codespace?** A Codespace is a cloud-based development environment provided by GitHub. It's a full computer running in the cloud, pre-configured with everything you need. No software installation required on your laptop.

### Step 3: Identify the Three Panels

When your Codespace loads, you'll see three main areas:

| Panel | Location | Purpose |
|-------|----------|---------|
| **File Explorer** | Left sidebar | Browse and open project files |
| **Editor** | Center (large area) | Read and write code |
| **Terminal** | Bottom panel | Type commands |

If the terminal is not visible, open it: press `Ctrl+`` ` (backtick) or go to **Terminal > New Terminal** in the menu.

---

### CHECKPOINT 1

Confirm you can see all three panels. Type the following in the terminal and verify it responds:

```bash
echo "Codespace is running!"
```

**Expected output:** `Codespace is running!`

If you see this message, proceed to Part 2. If not, raise your hand for instructor help.

---

## Part 2: Terminal Basics (10 minutes)

### Step 4: Learn Where You Are

Type each command and observe the output:

```bash
pwd
```

**What it does:** "Print Working Directory" — shows your current location in the file system.
**Expected output:** Something like `/workspaces/claude-code-course`

```bash
ls
```

**What it does:** Lists files and folders in your current directory.
**Expected output:** You should see folders like `src`, `docs`, `tests`, and files like `package.json`

### Step 5: Configure Git

Configure Git with your identity. Tell Claude (replace `Your Name` and `your.email@example.com` with your actual name and email):

```
Configure Git globally with my name "Your Name" and email "your.email@example.com"
```

Verify your configuration:

```bash
git config --global user.name
git config --global user.email
```

**Expected output:** Your name and email, respectively.

> **What is Git?** Git tracks changes to your code over time. Think of it like "Track Changes" in Google Docs, but for code. Every change you save is called a "commit."

---

### CHECKPOINT 2

Confirm your Git identity is configured (no empty output):

```bash
git config --global user.name
git config --global user.email
```

Both commands should print the values you just set. If either is empty, repeat the Git configuration from Step 5.

---

## Part 3: VS Code Orientation (5 minutes)

### Step 6: Explore the File Explorer

1. In the left sidebar, click the **Explorer** icon (top icon, looks like stacked files)
2. Click on `package.json` to open it in the editor
3. Notice how VS Code colors different parts of the file — this is called **syntax highlighting**

### Step 7: Learn Key VS Code Features

| Feature | How to Access | What It Does |
|---------|--------------|--------------|
| Open a file | Click in File Explorer | Opens in a new tab |
| Toggle terminal | `Ctrl+`` ` (backtick) | Show/hide the terminal panel |
| Open command palette | `Ctrl+Shift+P` | Search for any VS Code action |
| Save a file | `Ctrl+S` | Saves the current file |
| Close a tab | `Ctrl+W` | Closes the current editor tab |

### Step 8: Create a File Manually (Optional)

Try creating a file using the terminal:

```bash
echo "This is a test" > test-file.txt
```

Now look in the File Explorer — you should see `test-file.txt` appear. Click it to view the contents.

Clean up:

```bash
rm test-file.txt
```

The file disappears from the File Explorer.

---

## Part 4: Install Claude Code CLI (5 minutes)

### Step 9: Install Claude Code

Follow the install guide at https://code.claude.com/docs/en/quickstart

### Step 10: Verify Claude Code

Tell Claude:

```
Tell me which version of Claude Code I'm running
```

**Expected output:** A version number (e.g., `1.x.x`)

> **What just happened?** You installed Claude Code as a command-line tool. Unlike the web version from Workshop 1, this version can read and write files in your project, run terminal commands, and interact with your entire codebase.

---

### CHECKPOINT 3

Verify Claude Code is installed. Tell Claude:

```
Tell me which version of Claude Code I'm running
```

If you see a version number, proceed to Part 5. If you see "command not found":

1. Close the terminal: type `exit`
2. Open a new terminal: `Ctrl+`` ` (backtick)
3. Try `claude --version` again

Still not working? Run `source ~/.bashrc` and try again.

---

## Part 5: Create hello.txt with Claude Code (10 minutes)

### Step 11: Your First Claude Code Command

This is the main event. In Claude Code:

```
Create a file called hello.txt with a welcome message that includes today's date and confirms that my dev environment is working
```

**What happens:**
1. Claude Code reads your natural language prompt
2. It decides to create a file
3. It writes content for `hello.txt`
4. It asks for your permission to save (type `y` or press Enter to approve)
5. The file appears in your project

### Step 12: Verify the File

Check that the file was created. Tell Claude:

```
Show me the contents of hello.txt
```

**Expected output:** A welcome message with today's date and a confirmation that your environment is working.

Also check the File Explorer — you should see `hello.txt` in the file list. Click it to view in the editor.

### Step 12a: Check Your Token Usage

Now that you've had your first Claude Code interaction, let's check how much of your context budget you've used. While Claude Code is still running, type:

```
/context
```

You should see a token count showing how much of your context window has been used.

> **What are tokens?** Every message you send and every response Claude gives uses tokens from your context window — think of it like a budget. Right now you've barely used any. In Workshop 4, we'll learn strategies for managing this budget on larger projects. For now, just remember: `/context` shows your usage at any time.

### Step 13: Modify the File with Claude Code

Now let's make a change using natural language. In Claude Code:

```
Add a line to hello.txt that says: I completed Workshop 2 on $(date +%Y-%m-%d)
```

Verify the change. Tell Claude:

```
Show me the contents of hello.txt
```

You should see the original content plus the new line.

### Step 13a: Keyboard Shortcuts

Now that you've used Claude Code a couple of times, here are shortcuts that will make you faster. These work whenever Claude Code is running in the terminal:

| Shortcut | What It Does |
|----------|-------------|
| **Escape** | Rewind/undo the last action. If Claude does something you didn't want, hit Escape to step back. |
| **Ctrl+C** | Cancel the current operation. If Claude is taking too long or you changed your mind, this stops it immediately. |
| **Ctrl+R** | Search your prompt history. Instead of retyping a long prompt, press Ctrl+R and start typing to find a previous one. |
| **`!` prefix** | Run a shell command directly (e.g., `!ls`, `!git status`). This skips the AI entirely — the command runs instantly and doesn't use any of your tokens. |

The two most important shortcuts to remember right now are **Escape** (undo) and **Ctrl+C** (cancel). You'll pick up the others naturally as you use Claude Code more.

---

### CHECKPOINT 4 (Final)

Run the complete environment verification. Tell Claude:

```
Verify my dev environment: confirm which version of Claude Code is installed and whether hello.txt exists
```

**Both checks should show values (no errors).** If hello.txt exists: YES, your dev environment is fully verified.

Congratulations — you've completed Workshop 2!

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Codespace won't start | GitHub service issue | Wait 2 minutes and try again; or use a different browser |
| Terminal not visible | Panel may be collapsed | Press `Ctrl+`` ` or go to Terminal > New Terminal |
| Install problems | Setup issue | Follow the install guide at https://code.claude.com/docs/en/quickstart |
| `claude` command not found after install | Shell not refreshed | Close terminal and open a new one, or run `source ~/.bashrc` |
| Claude Code asks for API key | Key not configured | Ask instructor for temporary key, or set: `export ANTHROPIC_API_KEY=your-key` |
| File Explorer doesn't show new file | VS Code lag | Click the refresh icon in the File Explorer, or wait a moment |
| `git config` shows nothing | Not yet configured | Run the `git config --global` commands from Step 5 |

---

## Extension Exercises (For Fast Finishers)

If you finish early, try these additional terminal exercises:

### Extension 1: Explore the Project

Tell Claude:

```
Show me all files in this project including hidden ones, then list the files in the src and docs directories
```

### Extension 2: Ask Claude Code Questions

In Claude Code:

```
What files are in this project and what do they do?
```

In Claude Code:

```
Explain what package.json is in simple terms
```

In Claude Code:

```
What is the src folder used for?
```

### Extension 3: Create More Files

In Claude Code:

```
Create a file called notes.txt with three tips for learning to code
```

Tell Claude:

```
Show me the contents of notes.txt
```

### Extension 4: Terminal Navigation

Tell Claude:

```
Navigate into the src directory, confirm where I am, list the files there, then go back up to the project root and confirm my location
```

---

## Bonus: Status Line Setup (Optional)

Power users can configure a status line at the bottom of their terminal that shows useful information at a glance — the model name, how many tokens you've used, and how long your session has been running.

If you want to try this, ask Claude Code. In Claude Code:

```
Help me set up a status line that shows my model and context usage
```

This is completely optional. We'll cover context management in depth in Workshop 4. But if you like having information visible while you work, it's a nice quality-of-life upgrade.

---

## Key Terms Learned

| Term | Definition |
|------|-----------|
| **Terminal** | A text-based interface for typing commands to your computer |
| **Codespace** | A cloud-based development environment from GitHub |
| **VS Code** | Visual Studio Code, a code editor for reading and writing code |
| **Node.js** | A runtime that lets you run JavaScript outside the browser |
| **npm** | Node Package Manager — installs JavaScript libraries |
| **Git** | Version control system that tracks changes to code |
| **CLI** | Command Line Interface — a tool you use by typing commands |
| **Global install** | Installing a package so it's available everywhere (`-g` flag) |
| **Syntax highlighting** | Color-coding in editors that makes code easier to read |
| **Tokens** | Units of text that Claude processes; your context window has a token budget |
| **Context window** | The total amount of information Claude can hold in a single conversation |

---

## What's Next

**Workshop 3: Real Projects, Real Git** — You'll start building the LifeOps Command Center app. You'll add contacts, tasks, and notes to a starter application using Claude Code, and learn the Git workflow for saving and sharing your changes. The beginner and experienced developer tracks merge from Workshop 3 onward — you're ready.

> 💡 **Want to run Claude Code on your own computer instead of in Codespaces?** That's optional and not needed for the course, but if you'd like to try it, see [S2-Local-VS-Code-Guide.md](./S2-Local-VS-Code-Guide.md) — it walks through the local VS Code workflow (install steps live in [README-local.md](../../README-local.md)).
