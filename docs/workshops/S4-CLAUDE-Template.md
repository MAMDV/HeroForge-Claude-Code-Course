<!-- ============================================================
  CLAUDE.md Template — Workshop 4: Multi-File Apps and CLAUDE.md
  Mastering Claude Code: From Zero to Full Stack AI Developer

  WHAT IS THIS FILE?
  This is a template for creating your own CLAUDE.md file. During
  the Workshop 4, you will copy this template into your
  project root and customize it for your LifeOps Command Center app.

  WHY DOES IT MATTER?
  When Claude Code opens your project, it automatically reads
  CLAUDE.md from the project root. Everything in this file becomes
  persistent context that guides how Claude behaves — what files
  to create, what conventions to follow, what mistakes to avoid.
  Think of it as your project's instruction manual for AI.

  HOW TO USE THIS TEMPLATE:
  1. Copy this file to your project root and rename it to CLAUDE.md
  2. Replace all [PLACEHOLDER] text with your own project details
  3. Remove these instruction comments (or keep them — Claude
     ignores HTML comments when reading CLAUDE.md)
  4. Add or remove sections to fit your project's needs

  CLAUDE.MD HIERARCHY (where CLAUDE.md files can live):
  - User-level:      ~/.claude/CLAUDE.md (personal preferences, NOT shared via Git)
  - Project-level:   CLAUDE.md or .claude/CLAUDE.md in project root (team config, checked into Git)
  - Directory-level: e.g., src/CLAUDE.md or tests/CLAUDE.md (scoped rules for subdirectories)

  Rules stack: user-level loads first, then project-level, then directory-level.
  More specific rules override general ones.

  ADVANCED FEATURES:
  - @import syntax: Pull in rules from separate files (e.g., @import ./standards/testing.md)
  - .claude/rules/ directory: Topic-specific rule files with YAML frontmatter paths
    for conditional loading (rules that only activate when editing matching files)
============================================================ -->

# [YOUR PROJECT NAME]

<!-- HINT: Give your project a clear name so Claude understands
     what it is working on. Example: "LifeOps Command Center" -->

## Project Purpose

<!-- HINT: Describe what your project does in 2-3 sentences.
     Be specific — Claude uses this to make better decisions
     about code structure, naming, and architecture. -->

[Describe your project here. What does it do? Who is it for?]

**Tech stack**: [e.g., React, TypeScript, Vite, Tailwind CSS]
**Status**: [e.g., In development, Workshop 4 milestone]

## Repository Structure

<!-- HINT: Tell Claude where things live so it puts new files
     in the right place. Update this as your project grows. -->

- `/src` — application source code
  - `/src/components` — React components
  - `/src/utils` — helper functions and utilities
  - `/src/styles` — CSS and styling files
- `/tests` — test files
- `/public` — static assets (images, icons, favicon)
- `/docs` — project documentation

## Behavioral Rules (Always Enforced)

<!-- HINT: These rules prevent common AI mistakes. Keep the ones
     that matter to your project. Add your own if needed. -->

- Do what has been asked; nothing more, nothing less
- ALWAYS read a file before editing it
- NEVER create files unless absolutely necessary — prefer editing existing files
- NEVER save files to the project root — use the directories listed above
- NEVER commit secrets, credentials, or .env files
- ALWAYS run tests after making code changes
- ALWAYS verify the build succeeds before committing

## Build & Test

<!-- HINT: List the exact commands Claude should use to build,
     test, and lint your project. Claude will run these
     automatically when you ask it to verify changes. -->

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

- ALWAYS run `npm test` after making code changes
- ALWAYS run `npm run build` before committing to verify nothing is broken

## File Organization

<!-- HINT: These rules tell Claude exactly where to put new files.
     Without them, Claude might scatter files in unexpected places. -->

- React components go in `/src/components` — one component per file
- Utility functions go in `/src/utils`
- Test files go in `/tests` — name them `[feature].test.js`
- CSS files go in `/src/styles`
- Static assets (images, icons) go in `/public`

## Code Conventions

<!-- HINT: These conventions keep your code consistent. Claude
     will follow whatever style you define here. Customize
     these to match your preferences. -->

### Naming

- React components: PascalCase (e.g., `ContactList`, `TaskCard`)
- Functions and variables: camelCase (e.g., `getUserName`, `taskCount`)
- CSS classes: kebab-case (e.g., `task-card`, `nav-header`)
- Files: Match what they export (e.g., `ContactList.jsx` for the `ContactList` component)

### Imports

- Group imports in this order: (1) React/library imports, (2) components, (3) utilities, (4) styles
- Use named exports for components (e.g., `export function ContactList()`)

### Components

- Use functional components with hooks (no class components)
- Keep components focused — each component should do one thing well
- Extract reusable logic into custom hooks in `/src/utils`

## Security Rules

<!-- HINT: These rules prevent accidental exposure of sensitive
     data. NEVER remove these — they protect your project. -->

- NEVER hardcode API keys, secrets, or credentials in source files
- NEVER commit `.env` files or any file containing secrets
- Use environment variables for all external service configuration
- Always validate user input before processing it

## Workshop Progress

<!-- HINT: Update this section as you complete each session.
     It helps Claude understand what has been built so far
     and what stage the project is at. -->

- [x] Workshop 1: Static landing page (HTML + CSS)
- [x] Workshop 2: Dev environment setup
- [x] Workshop 3: Contacts + tasks with Git workflow
- [ ] Workshop 4: Multi-file React architecture with CLAUDE.md
- [ ] Workshop 5: External data integrations (weather, APIs)
- [ ] Workshop 6: Unit tests + mobile control
- [ ] Workshop 7: Agents, skills, and automation
- [ ] Workshop 8: Deploy to production

<!-- ============================================================
  MODULAR CONFIGURATION (Advanced)

  As your project grows, you can split this file into modules:

  @import ./standards/testing.md
  @import ./standards/security.md
  @import ./standards/api-design.md

  You can also create conditional rules in .claude/rules/:

  # .claude/rules/test-conventions.md
  ---
  paths:
    - "tests/**"
    - "**/*.test.js"
  ---
  Rules here only load when editing test files.

  See the Workshop 4 speaker script for full details on the hierarchy.
============================================================ -->

<!-- ============================================================
  CUSTOMIZATION CHECKLIST
  Before you start working with Claude Code, make sure you have:

  [ ] Replaced [YOUR PROJECT NAME] with your actual project name
  [ ] Filled in the Project Purpose section
  [ ] Updated the Tech stack and Status fields
  [ ] Reviewed the Repository Structure and adjusted paths
  [ ] Added any project-specific Behavioral Rules
  [ ] Verified the Build & Test commands match your setup
  [ ] Customized the Code Conventions to your preferences
  [ ] Updated Workshop Progress to reflect your current stage

  TIPS FOR GETTING THE MOST OUT OF CLAUDE.md:
  - Be specific: "Use Tailwind CSS" is better than "Use a CSS framework"
  - Be firm: Use ALWAYS and NEVER for rules that must not be broken
  - Keep it current: Update CLAUDE.md as your project evolves
  - Keep it concise: Claude reads this every time — shorter is faster
============================================================ -->
