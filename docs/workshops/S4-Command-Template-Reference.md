# Custom Command Template Reference — Session 4 Reference

**Session**: 4 of 8
**Topic**: Building custom slash commands for Claude Code

---

## What Are Custom Commands?

Custom commands are markdown files that define reusable workflows for Claude Code. When you type `/command-name` in Claude Code, it reads the corresponding markdown file and follows the instructions inside.

Think of commands as **recipe cards** for Claude. Instead of typing the same detailed prompt every time, you write it once and invoke it with a short slash command.

---

## Anatomy of a Custom Command

Every command file has two parts: **YAML frontmatter** and **markdown body**.

```markdown
---
description: A one-line summary shown when browsing commands
---

# Command Name

## Purpose
Why this command exists and when to use it.

## Instructions
Step-by-step instructions Claude follows when this command is invoked.
1. First step
2. Second step
3. Third step

## Output Format
How Claude should structure its response.
```

### YAML Frontmatter

The frontmatter block is enclosed in `---` markers at the top of the file. It contains metadata about the command.

| Field | Required | Purpose |
|-------|----------|---------|
| `description` | Yes | One-line summary displayed when listing commands |

### Markdown Body

The body contains the instructions Claude follows. Structure it clearly with headings:

| Section | Purpose |
|---------|---------|
| **Purpose** | Explains what the command does and when to use it |
| **Instructions** | Step-by-step actions Claude should take |
| **Output Format** | How Claude should present its results |

---

## Where Commands Live

### Project-Scoped Commands

Stored in your project's `.claude/commands/` directory. These are:
- Shared with your team via Git
- Specific to the project
- Available to anyone who clones the repository

```
your-project/
  .claude/
    commands/
      plan.md        # /plan
      review.md      # /review
      handoff.md     # /handoff
      pickup.md      # /pickup
```

The file name (minus `.md`) becomes the command name. `plan.md` is invoked as `/plan`.

### User-Scoped Commands

Stored in your home directory at `~/.claude/commands/`. These are:
- Personal to you — not shared via Git
- Available in every project you open
- Good for personal workflow preferences

```
~/.claude/
  commands/
    morning.md       # /morning — your personal startup routine
    done.md          # /done — your end-of-day checklist
```

### Priority

If a project-scoped command and a user-scoped command have the same name, the **project-scoped** command takes priority.

---

## Example: The `/plan` Command

**File:** `.claude/commands/plan.md`

```markdown
---
description: Plan the next feature or change before building it
---

# Plan Command

## Purpose
Think through the implementation approach before writing code.

## Instructions
1. Analyze the current state of the codebase relevant to the requested change
2. Identify which files need to be created or modified
3. Consider edge cases and potential issues
4. Present a clear, numbered plan with:
   - Files to create/modify
   - Key decisions and tradeoffs
   - Suggested order of implementation
5. Wait for user approval before proceeding

## Output Format
Present the plan as a numbered list with file paths and brief descriptions.
Do not implement anything — only plan.
```

**Usage:**
```
> /plan Add a search bar to the ContactList that filters by name and email
```

Claude reads the command file and follows the instructions: it analyzes the codebase, identifies the files involved, and presents a plan without writing any code.

---

## Example: The `/review` Command

**File:** `.claude/commands/review.md`

```markdown
---
description: Review recent changes for quality, bugs, and best practices
---

# Review Command

## Purpose
Review the most recent changes for code quality, potential bugs, and adherence to project conventions.

## Instructions
1. Run `git diff` to see recent unstaged changes, or `git diff HEAD~1` for the last commit
2. Check for:
   - Bugs or logic errors
   - Security issues (hardcoded secrets, XSS, injection)
   - Missing error handling
   - Code that doesn't match CLAUDE.md conventions
   - Unused imports or variables
3. Present findings organized by severity: Critical, Warning, Info
4. Suggest specific fixes for any issues found

## Output Format
### Critical
- [file:line] Description of issue

### Warning
- [file:line] Description of issue

### Info
- [file:line] Suggestion for improvement

### Summary
Overall assessment and recommended next steps.
```

**Usage:**
```
> /review
```

Claude runs `git diff`, analyzes the changes, and presents findings organized by severity.

---

## Tips for Writing Good Commands

### Be Specific About Steps
Instead of "review the code," write "Run `git diff` to see recent changes. Check for bugs, security issues, and convention violations."

### Define the Output Format
Tell Claude exactly how to structure its response. This ensures consistent, useful output every time.

### Use Action Verbs
Start each instruction with a verb: "Analyze," "Check," "List," "Summarize," "Present."

### Keep Commands Focused
Each command should do one thing well. If a command is getting complex, split it into two commands.

### Test Your Commands
After creating a command, run it and verify the output matches your expectations. Refine the instructions if needed.

---

## Quick Reference

| Location | Scope | Shared via Git? | Invoked as |
|----------|-------|-----------------|------------|
| `.claude/commands/plan.md` | Project | Yes | `/plan` |
| `~/.claude/commands/morning.md` | User | No | `/morning` |

| Frontmatter Field | Example |
|-------------------|---------|
| `description` | `Plan the next feature or change before building it` |

| Command | What It Does |
|---------|-------------|
| `/plan` | Think through a change before building it |
| `/review` | Check recent code changes for quality issues |
| `/handoff` | Save current work state for next session |
| `/pickup` | Load context from previous session handoff |
