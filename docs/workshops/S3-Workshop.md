# LifeOps Command Center: Workshop 3
## Real Projects, Real Git

**Estimated Time:** 45 minutes
**Difficulty:** All Levels (beginner + experienced merge here)
**Prerequisites:** Completed Workshops 1-2 (personal landing page, dev environment setup)
**Surface:** VS Code (GitHub Codespace)

---

## Pre-Workshop Setup (REQUIRED)

### Open the course repo (HeroForge-Claude-Code-Course) in a Codespace

1. Navigate to the course repository on GitHub
2. Click the green **Code** button
3. Select **Codespaces** tab
4. Click **Create codespace on main**
5. Wait for the Codespace to finish loading (~60 seconds)

### Verify Your Environment

In the VS Code terminal (Ctrl + ` to open), run:

Tell Claude:

```
Check that Claude Code is installed and show me the version, then install the project dependencies
```

If all commands return version numbers, you are ready to proceed.

---

## Part 1: VS Code and Git Orientation (10 minutes)

### The LifeOps Development Cycle

Before we start building, learn the 5-step workflow you will use for the rest of this course:

| Step | What You Do | Key Action |
|------|-------------|------------|
| **1. Plan** | Think through changes before making them | Press **Shift+Tab** to enter plan mode |
| **2. Build** | Give Claude clear instructions for one feature at a time | Write a focused prompt in normal mode |
| **3. Validate** | Run tests, check the app, verify it works | Run `npm test` or `npm run dev` |
| **4. Review** | Look at the diff, understand what changed | Check the Source Control panel or ask Claude |
| **5. Commit** | Stage, commit with a clear message, push | Tell Claude to commit and push |

This is not just a course workflow -- it is how professional developers work with AI tools every day. You will practice each step in the exercises below.

> **Reference:** See the [S3-Workflow-Reference.md](./S3-Workflow-Reference.md) card for a printable version of this cycle.

### Exercise 1.1 — Explore the Project Structure

Open the file explorer in VS Code and familiarize yourself with the starter app:

```
HeroForge-Claude-Code-Course/
  src/
    components/     # Your new features go here
    data/           # Sample JSON data (contacts, tasks, notes)
    App.jsx         # Main application component
    main.jsx        # Entry point
    index.css       # Global styles
  docs/             # Course documentation and workshops
  index.html        # App entry HTML
  package.json      # Dependencies and scripts
```

**Task:** Open `src/App.jsx` in the editor. Read through it. This is the main component you will be modifying today.

> **About the `.claude/` folder:** The starter app includes a `.claude/` folder with a basic `CLAUDE.md` file. This is where Claude Code's project configuration lives. In Workshop 4, we will build this out with custom commands and project rules. For now, just know it exists -- it is how Claude Code learns your project's conventions.

### Exercise 1.2 — Check Git Status

Ask Claude Code about the current state of your project:

In Claude Code:

```
What branch am I on and what is the git status of this project?
```

💡 Tell Claude: What branch am I on, and is my working tree clean?

**Expected result:** You should be on the `main` branch with a clean working tree.

### Exercise 1.3 — Create a Feature Branch

Create a new branch for today's work:

In Claude Code:

```
Create a new git branch called yourname-workshop-3
```

💡 Tell Claude: Make a new branch called yourname-workshop-3

**Verification:** Look at the bottom-left corner of VS Code. It should show `yourname-workshop-3` instead of `main`.

---

## Part 2: Building Features with Claude Code (25 minutes)

### Exercise 2.1 — Plan the Contacts Feature

Before building, use **plan mode** to think through the architecture (Step 1 of the LifeOps Development Cycle):

1. In the Claude Code terminal, press **Shift+Tab** to enter plan mode
2. Type the following plan prompt:

```
I want to add a ContactList component with ContactCard and AddContactForm. The contacts should have name, email, and phone. Plan how to structure these components.
```

3. Review the plan Claude produces -- it will outline the files, props, and data flow
4. When you are satisfied, press **Shift+Tab** again to return to normal mode

Now proceed to the build step. Ask Claude Code to create the contacts system:

In Claude Code:

```
Create a Contacts feature for the LifeOps Command Center app. Create these files in src/components/contacts/:

1. ContactList.jsx - displays a list of contacts showing name, email, and phone number
2. ContactCard.jsx - renders a single contact as a styled card
3. AddContactForm.jsx - a form with inputs for name, email, and phone, plus a submit button

Use React useState to manage the contacts array. Add 3 sample contacts as default data. Use a clean card-based design.
```

💡 Tell Claude: Build a Contacts feature in src/components/contacts/ with ContactList, ContactCard, and AddContactForm components, using React useState and 3 sample contacts in a clean card design.

**Verification checklist:**
- [ ] `src/components/contacts/ContactList.jsx` exists
- [ ] `src/components/contacts/ContactCard.jsx` exists
- [ ] `src/components/contacts/AddContactForm.jsx` exists
- [ ] Sample contacts appear when viewing the component

> **How Claude Code selects tools:** While creating these files, watch the terminal output. Claude Code automatically picks the right tool for each task: **Grep** to search for content across files (e.g., finding where contacts are referenced), **Glob** to find files by name or pattern (e.g., listing all `.jsx` files), and **Read** to view the contents of a specific file. You do not need to tell Claude which tool to use -- but understanding this helps you give better instructions and interpret what you see in the terminal.

### Exercise 2.2 — Add the Tasks Feature

Now create a task management system linked to contacts:

In Claude Code:

```
Create a Tasks feature in src/components/tasks/ with these components:

1. TaskList.jsx - shows all tasks with title, status (todo/in-progress/done), due date, and assigned contact name
2. TaskItem.jsx - renders one task with a checkbox to toggle completion status
3. AddTaskForm.jsx - form with fields for title, description, due date, priority (low/medium/high), and a dropdown to select an assigned contact

Include 3-4 sample tasks as default data. Connect the contact dropdown to the contacts list.
```

💡 Tell Claude: Build a Tasks feature in src/components/tasks/ with TaskList, TaskItem, and AddTaskForm, including 3-4 sample tasks and a contact dropdown linked to the contacts list.

**Verification checklist:**
- [ ] `src/components/tasks/TaskList.jsx` exists
- [ ] `src/components/tasks/TaskItem.jsx` exists
- [ ] `src/components/tasks/AddTaskForm.jsx` exists
- [ ] Tasks show assigned contact names
- [ ] Priority levels are visible

### Exercise 2.3 — Add the Notes System

Create a notes feature:

In Claude Code:

```
Create a Notes feature in src/components/notes/ with:

1. NoteList.jsx - displays notes in a card grid layout
2. NoteCard.jsx - shows note title, content preview (first 100 characters), and creation date
3. AddNoteForm.jsx - form with a title input and a textarea for content

Include 2-3 sample notes. Style the cards with subtle shadows and rounded corners.
```

💡 Tell Claude: Build a Notes feature in src/components/notes/ with NoteList, NoteCard, and AddNoteForm, plus 2-3 sample notes styled as cards with subtle shadows and rounded corners.

**Verification checklist:**
- [ ] `src/components/notes/NoteList.jsx` exists
- [ ] `src/components/notes/NoteCard.jsx` exists
- [ ] `src/components/notes/AddNoteForm.jsx` exists
- [ ] Notes display as cards with content previews

### Exercise 2.4 — Wire Everything Together

Connect all features to the main app:

In Claude Code:

```
Update src/App.jsx to:
1. Import ContactList, TaskList, and NoteList
2. Add a tab navigation bar with three tabs: Contacts, Tasks, Notes
3. Show the selected tab's component when clicked
4. Default to the Contacts tab
```

💡 Tell Claude: Wire ContactList, TaskList, and NoteList into src/App.jsx with a three-tab navigation bar (Contacts, Tasks, Notes) that defaults to Contacts.

**Verification:** Run `npm start` (or `npm run dev`) and open the app in your browser. You should see three tabs and be able to switch between Contacts, Tasks, and Notes.

---

## Part 3: Git Workflow (10 minutes)

### Exercise 3.1 — Review Your Changes

See what Git knows about your work:

In Claude Code:

```
Show me a summary of all files we've added or changed on this branch
```

💡 Tell Claude: What files have I added or changed on this branch?

You should see approximately 10 files: 9 new component files and 1 modified `App.jsx`.

### Exercise 3.2 — Commit Your Work

Stage and commit all changes:

In Claude Code:

```
Stage all new and modified files, then commit with the message: Add contacts, tasks, and notes features with tab navigation
```

💡 Tell Claude: Stage and commit everything with the message: Add contacts, tasks, and notes features with tab navigation.

**Verification:** Ask Claude Code to show the git log:

In Claude Code:

```
Show me the last git commit
```

💡 Tell Claude: Show me my most recent commit.

You should see your commit message and the list of files.

### Exercise 3.3 — Push and Create a Pull Request

Push your branch and create a PR:

In Claude Code:

```
Push this branch to GitHub and create a pull request titled 'Add contacts, tasks, and notes features' with a description listing what was added
```

💡 Tell Claude: Push this branch and open a pull request titled 'Add contacts, tasks, and notes features' that lists what was added.

**Verification:** Open the PR link that Claude Code provides. You should see:
- [ ] A clear title
- [ ] A description listing the three features
- [ ] All changed files in the "Files changed" tab

### Exercise 3.4 — Merge the Pull Request

Complete the workflow by merging:

In Claude Code:

```
Merge this pull request into main
```

💡 Tell Claude: Merge this pull request into main.

Then switch back to main:

In Claude Code:

```
Switch to the main branch and pull the latest changes
```

💡 Tell Claude: Switch back to main and pull the latest changes.

---

## Bonus Challenges

If you finish early, try these extensions:

### Bonus A: Add Search to Contacts

In Claude Code:

```
Add a search bar to ContactList that filters contacts by name or email as the user types
```

💡 Tell Claude: Add a live search bar to ContactList that filters contacts by name or email as I type.

### Bonus B: Add Task Filtering

In Claude Code:

```
Add filter buttons to TaskList so users can view All, Todo, In Progress, or Done tasks
```

💡 Tell Claude: Add All/Todo/In Progress/Done filter buttons to TaskList.

### Bonus C: Add Note Categories

In Claude Code:

```
Add a category field to notes (Personal, Work, Ideas) and add category filter tabs to NoteList
```

💡 Tell Claude: Add Personal/Work/Ideas categories to notes and category filter tabs to NoteList.

### Bonus D: Improve Styling

In Claude Code:

```
Add a consistent color scheme and hover effects to all card components across contacts, tasks, and notes
```

💡 Tell Claude: Give all the contact, task, and note cards a shared color scheme and hover effects.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm start` / `npm run dev` fails | Run `npm install` first, then try again |
| "Branch already exists" error | Use a different name: `yourname-workshop-3-v2` |
| Can't see new files in explorer | Click the refresh icon at the top of the file explorer |
| Terminal not visible | Press Ctrl + ` or go to Terminal > New Terminal |
| Components don't render | Check the browser console (F12) for errors; ask Claude Code to fix them |
| Git push fails | You may need to set upstream: Claude Code handles this automatically |
| PR creation fails | Make sure you have push access to the repo; use your fork if needed |

---

## Workshop 3 Recap

By completing this workshop, you have:

1. **Opened** the LifeOps starter app in a VS Code Codespace
2. **Created** a Git feature branch using natural language
3. **Built** 9 React components across 3 features (Contacts, Tasks, Notes)
4. **Connected** components with tab navigation in App.jsx
5. **Committed** changes with a descriptive Git message
6. **Pushed** to GitHub and created a pull request
7. **Merged** the PR into the main branch

### Key Skills Learned
- VS Code navigation (file explorer, editor, terminal, source control)
- Git workflow: branch > build > commit > push > PR > merge
- Multi-component feature development with Claude Code
- Cross-component data relationships (tasks assigned to contacts)

### What's Next
**Workshop 4: Multi-File Apps and CLAUDE.md** — Refactor your components into a cleaner architecture and learn how CLAUDE.md gives Claude Code persistent project context.
