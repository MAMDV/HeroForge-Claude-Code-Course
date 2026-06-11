# Mastering Claude Code — Workshop 4
## Multi-File Apps and CLAUDE.md

**Estimated Time:** 60 minutes
**Difficulty:** Intermediate
**Prerequisites:** Completed Workshops 1-3 (HTML page, dev environment, Git workflow)
**Surface:** Terminal CLI

---

## Workshop Objectives

By completing this workshop, you will:
- [ ] Understand React component architecture and why it matters
- [ ] Create a CLAUDE.md file with project conventions and behavioral rules
- [ ] Understand the CLAUDE.md hierarchy (user, project, directory levels)
- [ ] Learn `@import` syntax and `.claude/rules/` for modular configuration
- [ ] Refactor the LifeOps Command Center from vanilla JS to React components
- [ ] Implement AppContext with useReducer for shared state management
- [ ] Add a useLocalStorage hook for browser persistence
- [ ] Build a light/dark theme toggle using the full state flow
- [ ] Create custom slash commands (`/plan`, `/review`, `/handoff`, `/pickup`)
- [ ] Manage context window usage with `/context` and `/compact`
- [ ] Use plan mode (Shift+Tab) for multi-file changes
- [ ] Switch models with Alt+P for different task types

---

## Prerequisites Check

### Environment Verification

Before starting, verify your environment is ready:

Tell Claude:

```
Confirm Claude Code is installed and show me the files in my project's src directory
```

### Project State Check

Your LifeOps project from Workshop 3 should have:
- A working app with contacts and tasks (vanilla JS)
- Git configured with at least one commit
- `package.json` present in the project root

---

## Before You Start: Create Your Workshop Branch

Before beginning the exercises, create a new Git branch for your work. This keeps your changes isolated and makes it easy to open a pull request at the end.

Tell Claude:

```
Create and switch to a new Git branch called yourname-workshop-4
```

You should now be on the `yourname-workshop-4` branch. Confirm with:

Tell Claude:

```
Confirm I'm on the yourname-workshop-4 branch
```

---

## Exercise 1: Create CLAUDE.md (10 minutes)

### Objective
Create the project's CLAUDE.md file — the instruction manual that tells Claude Code how to work with your project.

### Step 1.1: Understand CLAUDE.md

CLAUDE.md is read by Claude Code at the start of every session. It provides:
- Project purpose and structure
- Build and test commands
- Behavioral rules (what to do and what to avoid)
- Code conventions (styling, patterns, file organization)

### Step 1.2: Create the File

In Claude Code:

```
Create a CLAUDE.md file in the project root for the LifeOps Command Center app. Include:
- Project description: a personal productivity dashboard with contacts, tasks, and notes
- Repository structure: /src for source code, /tests for tests, /docs for documentation
- Build commands: npm run build, npm test, npm run dev
- Behavioral rules: never create files in root, always read before editing, never commit secrets
- Code conventions: React functional components, Tailwind CSS for styling, hooks for state
- Security rules: no hardcoded API keys, no .env commits
```

### Step 1.3: Review and Customize

Open CLAUDE.md in your editor and verify it includes all sections. Add any additional rules you think are important for your project.

### Step 1.4: Understand the CLAUDE.md Hierarchy

Claude Code reads CLAUDE.md files from multiple locations, layered from general to specific:

| Level | Location | Scope | Shared via Git? |
|-------|----------|-------|-----------------|
| User-level | `~/.claude/CLAUDE.md` | Your personal preferences across all projects | No |
| Project-level | `CLAUDE.md` or `.claude/CLAUDE.md` in project root | Team-shared project conventions | Yes |
| Directory-level | e.g., `src/CLAUDE.md` or `tests/CLAUDE.md` | Rules scoped to a specific directory | Yes |

Rules stack: user-level loads first, then project-level, then directory-level. More specific rules override general ones.

### Step 1.5: Learn Modular Configuration

For larger projects, you can split CLAUDE.md into modules using `@import`:

```markdown
# In your project-level CLAUDE.md
@import ./standards/testing.md
@import ./standards/security.md
```

You can also create conditional rules in `.claude/rules/` with YAML frontmatter:

```markdown
# .claude/rules/test-conventions.md
---
paths:
  - "tests/**"
  - "**/*.test.js"
---

When writing test files:
- Use Vitest as the test runner
- Use describe/it blocks
- Mock all external dependencies
```

Rules with `paths` only activate when Claude is editing matching files.

### Checkpoint
- [ ] CLAUDE.md exists in the project root
- [ ] Contains at least 5 sections (purpose, structure, commands, rules, conventions)
- [ ] Behavioral rules are specific and actionable
- [ ] You understand the three levels of the CLAUDE.md hierarchy
- [ ] You know how `@import` and `.claude/rules/` work for modular config

---

## Exercise 2: Set Up React + Vite + Tailwind (10 minutes)

### Objective
Transform the project from vanilla JavaScript to a React application with Vite and Tailwind CSS.

### Step 2.1: Initialize React with Vite

In Claude Code:

```
Convert this project to use React with Vite. Set up Tailwind CSS for styling. Keep the existing package.json name and description. Create the standard Vite + React structure with:
- src/main.jsx as the entry point
- src/App.jsx as the root component
- Tailwind configured with content paths for src/**/*.{js,jsx}
- A basic index.html with the Vite root div
Follow the conventions in CLAUDE.md.
```

### Step 2.2: Install Dependencies

Tell Claude:

```
Install the project dependencies
```

### Step 2.3: Verify the Setup

Tell Claude:

```
Start the development server
```

Open the URL shown in the terminal (usually http://localhost:5173). You should see a basic React page.

### Checkpoint
- [ ] `npm run dev` starts without errors
- [ ] Browser shows the React app
- [ ] Tailwind classes work (test with a colored div)

---

## Exercise 3: Build Component Architecture (15 minutes)

### Objective
Create the component tree for LifeOps with shared state management.

### Step 3.1: Create AppContext with useReducer

In Claude Code:

```
Create src/context/AppContext.jsx with a React context and useReducer. The state should have:
- contacts: array of {id, name, email, phone, createdAt}
- tasks: array of {id, title, completed, priority, createdAt}
- notes: array of {id, title, content, updatedAt}
- theme: 'light' or 'dark'

The reducer should handle these 13 actions:
ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT,
ADD_TASK, UPDATE_TASK, DELETE_TASK, TOGGLE_TASK,
ADD_NOTE, UPDATE_NOTE, DELETE_NOTE,
SET_THEME, LOAD_STATE, RESET_STATE

Export AppProvider (wrapper) and useAppContext (hook).
Follow the conventions in CLAUDE.md.
```

### Step 3.2: Create useLocalStorage Hook

In Claude Code:

```
Create src/hooks/useLocalStorage.js — a custom React hook that works like useState but persists to localStorage. It should:
- Accept a key and initial value
- Load from localStorage on mount
- Save to localStorage on every update
- Handle JSON serialization/deserialization
- Handle errors gracefully (fall back to initial value)
Follow the conventions in CLAUDE.md.
```

### Step 3.3: Create UI Components

In Claude Code:

```
Create these React components for the LifeOps Command Center. Each should be in src/components/ and use Tailwind CSS for styling:

1. Header.jsx — App title 'LifeOps Command Center', navigation tabs, theme toggle button
2. Dashboard.jsx — Overview cards showing contact count, task count (total/completed), note count
3. ContactList.jsx — List contacts, add new contact form (name, email, phone), delete button
4. TaskList.jsx — List tasks with checkbox to toggle completion, add task form, priority badge, delete button
5. NoteEditor.jsx — List notes, click to edit, add note form with title and content, delete button
6. ThemeToggle.jsx — Button that dispatches SET_THEME to toggle between light and dark mode

All components should use useAppContext() to read state and dispatch actions.
Follow the conventions in CLAUDE.md.
```

### Step 3.4: Wire Up App.jsx

In Claude Code:

```
Update src/App.jsx to:
1. Wrap everything in AppProvider
2. Apply the theme class to the root div (dark/light)
3. Render Header at the top
4. Render Dashboard below the header
5. Render ContactList, TaskList, and NoteEditor in a responsive grid
6. Use Tailwind for the layout — dark:bg-gray-900 for dark mode, bg-gray-50 for light
Follow the conventions in CLAUDE.md.
```

### Step 3.5: Verify the Build

Tell Claude:

```
Build the project for production
```

Then:

Tell Claude:

```
Start the development server
```

Test in the browser:
- Add a contact, task, and note
- Toggle theme between light and dark
- Refresh the page — data should persist

### Checkpoint
- [ ] All 6 components render in the browser
- [ ] Adding/deleting contacts, tasks, and notes works
- [ ] Theme toggle switches between light and dark
- [ ] Data persists after page refresh (useLocalStorage working)
- [ ] `npm run build` completes without errors

---

## Exercise 4: Multi-File Refactoring Practice (10 minutes)

### Objective
Practice using Claude Code CLI for multi-file operations that demonstrate the power of the terminal surface.

### Step 4.1: Add a Feature Across Multiple Files

In Claude Code:

```
Add a 'priority' filter to the TaskList component. Users should be able to filter tasks by priority (all, high, medium, low). This requires:
1. A filter dropdown in TaskList.jsx
2. Filtering logic based on the selected priority
3. Make sure new tasks can be assigned a priority from the add form
Show me which files you modify.
```

### Step 4.2: Update CLAUDE.md with New Conventions

In Claude Code:

```
Add a 'Component Conventions' section to CLAUDE.md that documents:
- All components use functional syntax with hooks
- All components receive props with destructuring
- All components are located in src/components/
- All state mutations go through AppContext dispatch
- Tailwind utility classes are preferred over custom CSS
```

### Step 4.3: Run the Full Verification Suite

Tell Claude:

```
Run the full verification suite — build, lint, and tests
```

Fix any errors Claude Code identifies.

### Step 4.4: Use Plan Mode for the Refactor

Before making the change, try using plan mode. Press **Shift+Tab** to activate plan mode, then type your prompt. Claude will present a plan without writing code. Review the plan, then approve it.

**When to use plan mode:**
- Multi-file refactors and architectural decisions
- Complex changes with multiple valid approaches

**When to skip plan mode:**
- Single-file fixes, renaming variables, simple additions

### Checkpoint
- [ ] Priority filter works in TaskList
- [ ] CLAUDE.md has the new Component Conventions section
- [ ] Build, lint, and tests pass
- [ ] You have tried plan mode (Shift+Tab) at least once

---

## Exercise 5: Build Custom Commands (10 minutes)

### Objective
Create reusable slash commands that automate common workflows.

### Step 5.1: Create the Commands Directory

Tell Claude:

```
Create a .claude/commands directory
```

### Step 5.2: Create a `/plan` Command

Create `.claude/commands/plan.md` using Claude Code:

In Claude Code:

```
Create a file .claude/commands/plan.md with this structure:
- YAML frontmatter with description: 'Plan the next feature or change before building it'
- A Purpose section explaining this command plans before coding
- An Instructions section with steps: analyze codebase, identify files, consider edge cases, present numbered plan, wait for approval
- An Output Format section saying to present as numbered list without implementing
```

### Step 5.3: Create a `/review` Command

In Claude Code:

```
Create a file .claude/commands/review.md with this structure:
- YAML frontmatter with description: 'Review recent changes for quality, bugs, and best practices'
- Instructions to run git diff, check for bugs/security/convention issues
- Output format organized by severity: Critical, Warning, Info, Summary
```

### Step 5.4: Test Your Commands

Try your new commands:

```
/plan Add a notes search feature to NoteEditor
```

```
/review
```

### Step 5.5: Understand Scoping

- **Project-scoped** (`.claude/commands/`): Checked into Git, shared with your team
- **User-scoped** (`~/.claude/commands/`): Personal, available in every project

See the **S4-Command-Template-Reference** handout for the full command anatomy.

### Checkpoint
- [ ] `.claude/commands/plan.md` exists and works
- [ ] `.claude/commands/review.md` exists and works
- [ ] You understand project-scoped vs user-scoped commands

---

## Exercise 6: Context Window Management (5 minutes)

### Objective
Learn to monitor and manage your token budget.

### Step 6.1: Check Context Usage

```
/context
```

Note the current usage. Remember: the 200K budget is shared by CLAUDE.md, MCP tools, conversation history, and files Claude reads.

### Step 6.2: Understand the Budget

| Threshold | Action |
|-----------|--------|
| Under 50K | Comfortable — no action needed |
| 50K-80K | Normal for a productive session |
| 80K-100K | Consider using `/compact` |
| Over 100K | Use `/compact` now, or start a fresh session |

**Rule of thumb:** Stay under 100K tokens for best results.

### Step 6.3: Try `/compact`

If your context usage is above 50K:

```
/compact
```

This compresses conversation history while preserving key decisions and file changes.

### Step 6.4: Try Model Switching

Press **Alt+P** to open the model picker. Switch to **Haiku** and ask a quick question:

```
What files are in the src/components directory?
```

Notice how fast Haiku responds. Switch back to **Sonnet** with Alt+P for the rest of your work.

**Model selection guide:**
- **Opus**: Complex reasoning, architecture, hard debugging
- **Sonnet**: Most development work (your default)
- **Haiku**: Quick questions, simple renames, fast iteration

See the **S4-Context-Management-Guide** handout for the full reference.

### Checkpoint
- [ ] You have run `/context` and seen your token usage
- [ ] You understand the 200K budget and the 100K rule of thumb
- [ ] You have tried `/compact` (or know when to use it)
- [ ] You have switched models with Alt+P at least once

---

## Exercise 7: Handoff and Pickup (5 minutes)

### Objective
Set up cross-session continuity using the handoff/pickup pattern.

### Step 7.1: Create the Handoff Command

In Claude Code:

```
Create .claude/commands/handoff.md that:
- Has YAML frontmatter with description: 'Save current work state for cross-session continuity'
- Instructions to summarize session, list in-progress work, note key decisions, list blockers
- Saves output to docs/handoffs/handoff-latest.md
- Output format includes: Session Summary, In Progress, Key Decisions, Next Steps, Blockers, Files Changed
```

### Step 7.2: Create the Pickup Command

In Claude Code:

```
Create .claude/commands/pickup.md that:
- Has YAML frontmatter with description: 'Load context from a previous session handoff'
- Instructions to read docs/handoffs/handoff-latest.md
- Summarize previous session, highlight in-progress work, suggest next steps
- Ask user if they want to continue or do something different
```

### Step 7.3: Create the Handoffs Directory

Tell Claude:

```
Create a docs/handoffs directory
```

### Step 7.4: Run Your First Handoff

At the end of this session, run:

```
/handoff
```

This saves your work state. When you start Workshop 5, run `/pickup` to give Claude the context it needs.

### Step 7.5: Skills Preview

In addition to commands, Claude Code supports **skills** — multi-file packages with their own scripts, references, and templates. Think of commands as recipe cards and skills as entire cookbooks. We will explore skills in depth in Workshop 7.

### Checkpoint
- [ ] `.claude/commands/handoff.md` exists
- [ ] `.claude/commands/pickup.md` exists
- [ ] `docs/handoffs/` directory exists
- [ ] You have run `/handoff` at least once (or plan to before leaving)

---

## Wrap-Up

### What You Built

By completing this workshop, your LifeOps Command Center now has:

| Feature | Implementation |
|---------|---------------|
| Component architecture | 6 React components with single responsibility |
| Shared state | AppContext + useReducer with 13 actions |
| Persistence | useLocalStorage hook for browser storage |
| Theme support | Light/dark toggle with Tailwind dark mode |
| AI configuration | CLAUDE.md hierarchy (user, project, directory levels) |
| Modular config | `@import` syntax and `.claude/rules/` for conditional loading |
| Custom commands | `/plan`, `/review`, `/handoff`, `/pickup` |
| Context management | `/context` to monitor, `/compact` to compress |
| Plan mode | Shift+Tab for planning before executing |
| Model switching | Alt+P to choose Opus, Sonnet, or Haiku |
| Cross-session continuity | Handoff/pickup pattern for seamless resumption |
| Modern tooling | React + Vite + Tailwind CSS |

### Key Commands Used

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Run tests
npm test

# Claude Code multi-file refactor
claude "Refactor [description]... Follow the conventions in CLAUDE.md."
```

### Key Claude Code Commands Learned

| Command / Shortcut | Purpose |
|--------------------|---------|
| `/context` | Check current token usage |
| `/compact` | Compress conversation history |
| `/plan` | Plan a feature before building (custom command) |
| `/review` | Review code for quality issues (custom command) |
| `/handoff` | Save work state for next session (custom command) |
| `/pickup` | Load context from previous session (custom command) |
| Shift+Tab | Activate plan mode before a prompt |
| Alt+P | Switch between Opus, Sonnet, and Haiku models |

### Preparing for Workshop 5

Workshop 5 introduces external data connections:
- Your dashboard will show live weather data
- MCP (Model Context Protocol) connects Claude Code to external services
- New components will fetch and display API data

**Before you leave:** Run `/handoff` to save your session state. Start Workshop 5 with `/pickup`.

To prepare:
- Review your CLAUDE.md and ensure it is complete
- Try `/plan Add a search bar to ContactList that filters by name`
- Experiment with creating your own custom command in `.claude/commands/`
- Try `claude "Explain the data flow when I add a new contact"` to test your understanding

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm run dev` shows blank page | Check browser console for errors; verify main.jsx imports App correctly |
| Components not updating | Verify useAppContext is imported and dispatch is called correctly |
| Theme does not persist | Check useLocalStorage is connected to the theme state in AppContext |
| Tailwind classes not working | Verify `tailwind.config.js` content array includes `./src/**/*.{js,jsx}` |
| CLAUDE.md not being read | Must be in project root directory, not in a subdirectory |
| Build errors after refactor | Run `claude "Fix the build errors"` — Claude Code reads error output |
| Too many files changed | Use `git diff` to review; use `git checkout -- <file>` to revert specific files |
| Custom command not found | Verify file is in `.claude/commands/` with `.md` extension; file name becomes the command |
| `/context` shows high usage | Run `/compact` to compress history, or start a fresh session |
| Alt+P not working | Must be inside Claude Code terminal, not a regular terminal or editor |
| Plan mode not activating | Press Shift+Tab before typing the prompt, not after |
| `/handoff` not saving | Ensure `docs/handoffs/` directory exists: `mkdir -p docs/handoffs` |
| `.claude/rules/` not loading | Check YAML frontmatter `paths` patterns match the files you are editing |
