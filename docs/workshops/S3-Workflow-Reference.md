# LifeOps Development Cycle — Quick Reference

**The 5-step workflow for building with Claude Code**

Use this cycle every time you build a feature, fix a bug, or make a change. It applies from Session 3 onward and mirrors how professional developers work with AI tools.

---

## The 5 Steps

### 1. Plan

**What:** Think through your changes before writing any code.

**When to use plan mode:**
- You are about to create multiple files
- You are making an architectural decision (e.g., where to put a new component, how data should flow)
- You are unsure how to approach a problem
- You want Claude to reason without modifying anything

**How:**
- Press **Shift+Tab** to enter plan mode (the mode indicator changes in your terminal)
- Type your plan prompt describing what you want to accomplish
- Review the plan Claude produces
- Press **Shift+Tab** again to return to normal mode

**Example prompt:**
```
I want to add a ContactList component with ContactCard and AddContactForm.
The contacts should have name, email, and phone.
Plan how to structure these components.
```

**When to skip plan mode:**
- Single-file changes (e.g., fixing a typo, adding a CSS property)
- You already know exactly what you want and the change is small

---

### 2. Build

**What:** Give Claude clear, focused instructions to implement one feature at a time.

**Key principles:**
- One prompt, one feature
- Be specific about file locations, component names, and data shapes
- Mention relationships between components (e.g., "tasks should reference contacts")
- Let Claude read the existing code before writing new code

**Keyboard shortcuts:**
| Shortcut | Action |
|----------|--------|
| **Enter** | Send your prompt |
| **Escape** | Interrupt Claude if it goes off track |
| **Ctrl+C** | Cancel the current operation |

---

### 3. Validate

**What:** Verify that the feature works as expected.

**Actions:**
- Run the app: `npm run dev` or `npm start`
- Run tests: `npm test`
- Check the browser for visual correctness
- Ask Claude to explain anything you do not understand

**Keyboard shortcuts:**
| Shortcut | Action |
|----------|--------|
| **Ctrl+`** | Open/close the VS Code terminal |

---

### 4. Review

**What:** Look at what changed before committing.

**Actions:**
- Open the **Source Control** panel in VS Code (branch icon in the left sidebar)
- Click on changed files to see the diff (red = removed, green = added)
- Ask Claude to summarize the changes:
  ```
  claude "Show me a summary of all the files we changed and what each change does"
  ```

**What to look for:**
- Are all the expected files present?
- Did anything change that you did not intend?
- Are there any hardcoded values that should be variables?

---

### 5. Commit

**What:** Save your work to Git with a clear message.

**Actions:**
- Stage and commit:
  ```
  claude "Stage all new and modified files, then commit with the message: Add contacts feature with list, card, and form components"
  ```
- Push to GitHub:
  ```
  claude "Push this branch to GitHub"
  ```
- Create a pull request (when ready for review):
  ```
  claude "Create a pull request with a description of what changed"
  ```

**Good commit messages:**
- Describe *what* was added or changed
- Start with a verb: Add, Update, Fix, Remove, Refactor
- Keep it under one line (50-72 characters)

---

## Full Keyboard Reference

| Shortcut | Context | Action |
|----------|---------|--------|
| **Shift+Tab** | Claude Code terminal | Toggle plan mode on/off |
| **Enter** | Claude Code terminal | Send prompt |
| **Escape** | Claude Code terminal | Interrupt / rewind |
| **Ctrl+C** | Terminal | Cancel current operation |
| **Ctrl+`** | VS Code | Open/close terminal |
| **Ctrl+Shift+G** | VS Code | Open Source Control panel |
| **Ctrl+Shift+E** | VS Code | Open File Explorer |

---

## When to Use Each Step

| Scenario | Steps to Emphasize |
|----------|-------------------|
| Adding a new multi-file feature | All 5 steps, starting with Plan |
| Fixing a small bug | Build, Validate, Commit (skip Plan) |
| Refactoring existing code | Plan, Build, Validate, Review, Commit |
| Exploring how code works | Plan only (use plan mode to ask questions) |
| Making a styling change | Build, Validate, Commit (skip Plan) |

---

*This reference card is part of the Mastering Claude Code course, Session 3 onward.*
