# HeroForge.AI Course: Mastering Claude Code
## Workshop 5: Connecting to the Outside World

**Estimated Time:** 45-60 minutes
**Difficulty:** Intermediate
**Prerequisites:** Completed Workshops 1-4 (Dev environment, Git workflow, multi-file React architecture)

---

## Workshop Objectives

By completing this workshop, you will:
- [ ] Evaluate MCP server trustworthiness before installation
- [ ] Integrate a live Weather Widget using direct API fetch
- [ ] Build a GitHub Activity Widget with token-based authentication
- [ ] Configure MCP servers with project-scoped and user-scoped settings
- [ ] Implement a Smart Task Input with natural language parsing
- [ ] Use structured output (tool_use) for reliable data extraction
- [ ] Apply few-shot prompting for consistent parsing results
- [ ] Understand three integration patterns: direct fetch, MCP servers, CLI tools
- [ ] Use environment variables and env var expansion to secure API keys
- [ ] Add Error Boundaries and structured error responses for graceful failure handling
- [ ] Manage MCP context to conserve token budget

---

## Prerequisites Check (Run Before Starting)

### Environment Verification

```bash
# Verify your dev environment is ready
claude --version      # Should show a version number
npm run build         # Should succeed without errors
```

### API Keys Setup

You will need:
1. **OpenWeatherMap API key** (free tier): Sign up at https://openweathermap.org/api
2. **GitHub personal access token** (optional): Settings > Developer Settings > Personal Access Tokens

---

## What Is an Environment Variable?

Before we create one, here is the idea in plain English.

An **environment variable** is a way to store a secret — like an API key — *outside* your code. Your app reads it when it runs, but it never appears in the files you commit to Git.

> 💡 **Think of it like a locked drawer.** Your app has the key and can open the drawer to grab what it needs (your API key). Git can see that the drawer exists, but it can never look inside — so your secrets never end up in your repository or on GitHub.

In this project, secrets live in a file called `.env` (which is listed in `.gitignore`, so Git ignores it). Your code refers to them *by name* — for example `VITE_WEATHER_API_KEY` — instead of containing the actual key.

---

## Exercise 1: Environment Variables Setup (5 minutes)

### Goal
Create a `.env` file to securely store API credentials.

### Instructions

1. Tell Claude to set up environment variable support:

```
claude "Create a .env.example file with placeholder values for VITE_WEATHER_API_KEY and VITE_GITHUB_TOKEN. Also create a .env file with the same structure. Make sure .env is in .gitignore."
```

2. Open the generated `.env` file and add your real API keys:

```
VITE_WEATHER_API_KEY=your_openweathermap_key_here
VITE_GITHUB_TOKEN=your_github_token_here
```

3. Verify `.env` is in `.gitignore`:

```bash
grep ".env" .gitignore
```

### Checkpoint
- [ ] `.env.example` exists with placeholder values
- [ ] `.env` exists with your real API keys (never committed)
- [ ] `.gitignore` includes `.env`

---

## What Is MCP?

**MCP (Model Context Protocol)** is a standard way to connect Claude to external services and tools — like GitHub, a database, or your file system.

> 💡 **Think of it like a USB port for Claude.** USB is one standard plug shape that works with keyboards, drives, cameras, and more. MCP is that standard "plug shape" for Claude: connect a service once using MCP, and Claude can use it — no custom glue code needed for each one.

Over the next few exercises you will evaluate, configure, and use MCP servers.

---

## Exercise 2: Evaluating MCP Trustworthiness (5 minutes)

### Goal
Learn to evaluate MCP servers before installing them using a 4-question checklist.

### Instructions

1. Review the 4-question checklist:

| # | Question | What to check |
|---|----------|---------------|
| 1 | Who published it? | Official (Anthropic, GitHub) vs community vs unknown |
| 2 | What permissions does it need? | File access, network, credentials, shell execution |
| 3 | Is the source code available? | Open source = inspectable, closed source = trust required |
| 4 | What data does it access? | Read-only vs read-write, scope of access |

2. Practice evaluating an MCP you might actually install — a **Google Calendar MCP** server (you'll configure one in Exercise 9b):

```
claude "Evaluate a Google Calendar MCP server using these 4 questions: (1) Who published it? (2) What permissions does it need? (3) Is the source code available? (4) What data does it access?"
```

3. Inspect your currently installed MCP servers:

```
/mcp
```

4. Review the full checklist reference:

See `docs/reference/mcp-security-checklist.md` for red flags, decision framework, and periodic review guidance. A student quick reference is available at `docs/workshops/templates/S5-MCP-Security-Checklist.md`.

### Checkpoint
- [ ] You can name the 4 trustworthiness questions from memory
- [ ] You evaluated a Google Calendar MCP server using the checklist
- [ ] You used `/mcp` to inspect installed servers
- [ ] You understand the difference between official and community servers

---

## Exercise 3: Weather Service and Widget (10 minutes)

### Goal
Build a weather service that fetches live data and a React component that displays it.

### Instructions

1. Create the weather service:

```
claude "Create src/services/weatherService.js that exports a getWeather(city) function. It should fetch current weather from OpenWeatherMap API using the VITE_WEATHER_API_KEY environment variable. Default city should be San Francisco. Return an object with temperature, description, humidity, and icon."
```

2. Create the Weather Widget component:

```
claude "Create src/components/WeatherWidget.jsx that uses the weatherService to display current weather. Include loading, error, and success states. Show temperature, weather description, humidity, and a weather icon. Style it as a dashboard card."
```

3. Test the widget:

```bash
npm run build
```

### Verification

Ask Claude to verify the implementation:

```
claude "Review the WeatherWidget and weatherService for proper error handling, loading states, and environment variable usage"
```

### Checkpoint
- [ ] `src/services/weatherService.js` fetches from OpenWeatherMap
- [ ] `src/components/WeatherWidget.jsx` renders weather data
- [ ] Widget shows loading spinner while fetching
- [ ] Widget shows error message if API call fails
- [ ] API key is read from environment variable (not hardcoded)

---

## Exercise 4: GitHub Activity Service and Widget (10 minutes)

### Goal
Build a GitHub activity feed that shows recent events for a user.

### Instructions

1. Create the GitHub service:

```
claude "Create src/services/githubService.js that exports getGitHubActivity(username) function. Fetch recent events from GitHub API with optional token auth from VITE_GITHUB_TOKEN. Format events into readable strings like 'Pushed 3 commits to repo-name'. Return the 10 most recent events."
```

2. Create the GitHub Activity Widget:

```
claude "Create src/components/GitHubActivityWidget.jsx that displays recent GitHub activity. If no token is configured, show a friendly setup message instead of an error. Include loading and error states. Each event should show the type, repo name, and timestamp."
```

3. Test with and without a token:

```
claude "What happens if VITE_GITHUB_TOKEN is not set? Verify the GitHubActivityWidget handles this gracefully."
```

### Checkpoint
- [ ] `src/services/githubService.js` fetches GitHub events
- [ ] `src/components/GitHubActivityWidget.jsx` renders activity feed
- [ ] Missing token shows setup instructions (not an error)
- [ ] Events are formatted as human-readable strings
- [ ] Timestamps show relative time (e.g., "2 hours ago")

---

## Exercise 5: Smart Task Parsing (10 minutes)

### Goal
Build a natural language task parser and a Smart Task Input component with live preview.

### Instructions

1. Create the task parser:

```
claude "Create src/services/taskParser.js that exports a parseTask(input) function. It should extract: title, dueDate (from keywords like 'tomorrow', 'by Friday', ISO dates), priority (from 'urgent', 'high priority', 'low priority'), and category (from #hashtags). Return a structured object."
```

2. Test the parser with sample inputs:

```
claude "Write 5 test cases for taskParser.js covering: a simple task, a task with a due date, a task with priority, a task with a category hashtag, and a task with all fields."
```

3. Create the Smart Task Input component:

```
claude "Create src/components/SmartTaskInput.jsx with a text input and live preview panel. As the user types, run parseTask on the input and show the extracted title, due date, priority, and category in a preview card below the input. Include an 'Add Task' button."
```

4. Try these sample inputs in the preview:
   - `Call dentist tomorrow high priority`
   - `Buy groceries by Friday #shopping`
   - `Finish report due 2026-03-20 urgent`
   - `Team meeting #work`
   - `Read chapter 5 low priority`

### Checkpoint
- [ ] `src/services/taskParser.js` parses natural language tasks
- [ ] Parser extracts title, dueDate, priority, and category
- [ ] `src/components/SmartTaskInput.jsx` shows live preview
- [ ] Preview updates on every keystroke
- [ ] "Add Task" button returns parsed task object

---

## What Is Structured Output?

Sometimes you do not just want Claude to *write* an answer — you want data in an exact shape your code can use, every single time.

**Structured output** means Claude returns data that follows a predefined structure (a JSON "schema") instead of free-form text. Behind the scenes this uses a feature called **`tool_use`**: you describe a "tool" with the exact fields you expect, and Claude fills them in.

> 💡 **The difference:** asking Claude for JSON inside a normal text reply *usually* works — but it might add a sentence first, format a date differently, or skip a field. Structured output guarantees the response matches your schema, so your code can rely on it without fragile text-parsing.

Here is how it works.

---

## Exercise 6: Structured Output with JSON Schemas (5 minutes)

### Goal
Understand how to use `tool_use` with JSON schemas to get reliable, schema-compliant output from Claude.

### Instructions

1. Review the extraction tool definition:

```json
{
  "name": "extract_task",
  "description": "Extracts structured task data from natural language input",
  "input_schema": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "The task title without date, priority, or category markers"
      },
      "dueDate": {
        "type": ["string", "null"],
        "description": "ISO 8601 date string, or null if no date mentioned"
      },
      "priority": {
        "type": "string",
        "enum": ["low", "medium", "high"],
        "description": "Task priority level"
      },
      "category": {
        "type": ["string", "null"],
        "description": "Category from hashtag, or null if none specified"
      }
    },
    "required": ["title", "priority"]
  }
}
```

2. Understand the three `tool_choice` options:

| Option | Behavior | When to use |
|--------|----------|-------------|
| `"auto"` | Claude may return text instead of calling the tool | Optional extraction — sometimes there is nothing to extract |
| `"any"` | Claude must call a tool, but can choose which one | Multiple extraction tools available |
| `{"type": "tool", "name": "extract_task"}` | Claude must call this specific tool | Reliable extraction — you always need structured output |

3. Ask Claude to explain the difference:

```
claude "Explain the difference between asking Claude for JSON in a text response versus using tool_use with a JSON schema. What problems does structured output solve?"
```

### Checkpoint
- [ ] You understand the extraction tool schema structure
- [ ] You can explain when to use each `tool_choice` option
- [ ] You understand why structured output is more reliable than parsing free text

---

## Exercise 7: Few-Shot Prompting (5 minutes)

### Goal
Learn to use few-shot examples for consistent, accurate task parsing.

### Instructions

1. Compare these two prompting approaches:

**Without few-shot (instructions only):**
```
Parse this task. The title should not include date or priority keywords.
Dates like "tomorrow" should resolve to actual dates. Priority keywords
include "urgent" and "high priority". Hashtags indicate categories.

Parse: "Buy groceries tomorrow #shopping"
```

**With few-shot (examples):**
```
Parse the following task into structured data. Here are examples:

Input: "Buy groceries tomorrow #shopping"
Output: {"title": "Buy groceries", "dueDate": "2026-03-25", "priority": "medium", "category": "shopping"}

Input: "URGENT: Fix the login bug by Friday"
Output: {"title": "Fix the login bug", "dueDate": "2026-03-28", "priority": "high", "category": null}

Input: "Read chapter 5 low priority"
Output: {"title": "Read chapter 5", "dueDate": null, "priority": "low", "category": null}

Now parse this task:
"Schedule vet appointment next Tuesday #pets high priority"
```

2. Test both approaches with Claude and compare results:

```
claude "I'm going to give you two versions of a task parsing prompt. Run each one 3 times with the input 'Email boss about budget review by Wednesday urgent #work' and show me the outputs. Version 1 uses only instructions. Version 2 uses few-shot examples. Which produces more consistent results?"
```

3. Review the full reference at `docs/workshops/templates/S5-Structured-Output-Reference.md`.

### Checkpoint
- [ ] You wrote at least 2 few-shot examples for task parsing
- [ ] You compared results with and without examples
- [ ] You understand why examples work better than longer instructions

---

## Exercise 8: Error Boundaries (5 minutes)

### Goal
Add Error Boundaries to protect the dashboard from widget failures.

### Instructions

1. Create the Error Boundary component:

```
claude "Create src/components/ErrorBoundary.jsx as a React class component that catches render errors in its children. Display a styled error card with the message 'Something went wrong' and a 'Try Again' button that resets the error state."
```

2. Wrap the external widgets:

```
claude "In the main dashboard layout, wrap WeatherWidget and GitHubActivityWidget each in their own ErrorBoundary component. This way if one widget crashes, the others keep working."
```

3. Test error handling:

```
claude "Temporarily modify the weatherService to throw an error, then verify the ErrorBoundary catches it and shows the fallback UI"
```

### Checkpoint
- [ ] `src/components/ErrorBoundary.jsx` catches and displays errors
- [ ] WeatherWidget is wrapped in an ErrorBoundary
- [ ] GitHubActivityWidget is wrapped in an ErrorBoundary
- [ ] A failing widget does not crash the entire dashboard
- [ ] "Try Again" button resets the error state

---

## Exercise 9: Use GitHub from the Command Line (`gh`) (5 minutes)

### Goal
Connect Claude to GitHub through the **GitHub CLI (`gh`)** — which is already installed and authenticated in your Codespace — instead of an MCP server.

### Why CLI over MCP (when a CLI exists)

> 💡 **If a CLI exists for a service, always prefer it in Claude Code — it's faster, more reliable, and already installed. MCP shines when you need the same connection to work across Claude chat, Claude Code, and other surfaces.**

GitHub ships an excellent command-line tool, `gh`, and Codespaces comes with it pre-installed and already signed in. Claude Code can run `gh` directly — no extra server to install, no token wiring, and no context tokens spent on tool definitions. So for GitHub, reach for `gh`.

### Instructions

1. Confirm `gh` is installed and authenticated:

```bash
gh auth status
```

2. Ask Claude to read from GitHub using `gh`:

```
claude "Using the gh CLI, list the 5 most recent issues on this repository (run: gh issue list --limit 5) and summarize them."
```

3. Try a pull-request command too:

```
claude "Use gh to show the 5 most recent pull requests and their status (gh pr list --limit 5). Then tell me what's currently open."
```

4. Understand the difference:

```
claude "Explain the difference between our githubService.js (direct fetch inside the browser app) and using the gh CLI from Claude Code. When would I use each one?"
```

### Checkpoint
- [ ] `gh auth status` shows you are logged in
- [ ] Claude listed recent issues using `gh issue list`
- [ ] Claude listed recent pull requests using `gh pr list`
- [ ] You understand why a CLI is preferred over an MCP server when one already exists

---

## Exercise 9b: Configure a Real MCP — Google Calendar (7 minutes)

### Goal
Configure an MCP server for a service that has **no built-in CLI** — Google Calendar — and learn project-scoped vs user-scoped settings with environment variable expansion.

### Why MCP here (and not a CLI)

Google Calendar has no `gh`-style tool sitting in your Codespace, and you'll want the *same* calendar connection to work everywhere — Claude chat on your phone, Claude Code at your desk, and other surfaces. That's exactly what MCP is for: configure it once, use it across every Claude surface. It's also something you'd genuinely use day to day — *"what's on my calendar tomorrow?"*, *"find a free 30-minute slot this week"*, *"add a study block Friday at 4pm."*

### Instructions

1. Create a **user-scoped** MCP entry (your personal calendar belongs to you, not the shared repo). Add a Google Calendar server to `~/.claude.json`, or a project-scoped `.mcp.json` if your whole team shares a calendar:

```json
{
  "mcpServers": {
    "google-calendar": {
      "command": "npx",
      "args": ["-y", "@cocal/google-calendar-mcp"],
      "env": {
        "GOOGLE_OAUTH_CREDENTIALS": "${GOOGLE_OAUTH_CREDENTIALS}"
      }
    }
  }
}
```

Note: The `${GOOGLE_OAUTH_CREDENTIALS}` syntax references an environment variable — your real credentials stay in your `.env` file, which is never committed. This keeps secrets out of version control while making the configuration shareable.

> ⚠️ **Vet it first.** Community MCP package names change, and this one connects to your real calendar. Before installing, run the server through the **4-question trustworthiness checklist from Exercise 2** (who publishes it? what permissions? source available? what data?) and confirm you're using a current, trusted package — replace the name above with the one you've vetted.

2. Understand the two configuration scopes:

| Scope | File | Shared? | Use case |
|-------|------|---------|----------|
| Project | `.mcp.json` (project root) | Yes, via Git | Team-shared servers (shared team calendar, project API) |
| User | `~/.claude.json` | No | Personal servers (your own Google Calendar) |

3. Test the connection — and notice this same MCP works in Claude chat *and* Claude Code:

```
claude "Using the Google Calendar MCP, what's on my calendar tomorrow? Then find a free 30-minute slot this week."
```

4. Understand why this one is an MCP, not a CLI:

```
claude "Explain why the Google Calendar MCP works in both Claude chat and Claude Code, while the gh CLI only works where a terminal is available."
```

### Checkpoint
- [ ] An MCP entry exists with environment variable expansion (no raw credentials in the file)
- [ ] You understand project-scoped vs user-scoped configuration and why a personal calendar is user-scoped
- [ ] You vetted the calendar MCP with the 4-question checklist before connecting it
- [ ] You can explain why MCP (not a CLI) fits a cross-surface service like Calendar

---

## Exercise 10: MCP Context Management (3 minutes)

### Goal
Learn to manage loaded MCP servers to conserve your context window budget.

### Instructions

1. View your currently loaded MCP servers:

```
/mcp
```

2. Note the tools each server provides — each tool definition consumes context tokens.

3. If you have servers you are not actively using, disable them to free up context space.

4. Ask Claude about the impact:

```
claude "How much context window space do my currently loaded MCP tools consume? What happens if I disable the ones I'm not using right now?"
```

### Connection to Workshop 4

Remember "Context is currency" from Workshop 4. Your 200K token context window is shared between CLAUDE.md, MCP tool definitions, and your conversation. Managing loaded MCPs is one of the easiest ways to reclaim context space when you are working on tasks that do not need external integrations.

### Checkpoint
- [ ] You used `/mcp` to review loaded servers
- [ ] You understand that MCP tools consume context tokens
- [ ] You know how to disable unused MCPs to free context

---

## Exercise 11: Integration Architecture Review (5 minutes)

### Goal
Verify the complete integration architecture and file structure.

### Instructions

1. Review the architecture:

```
claude "List all the service files and widget components we created today. Verify each service has proper error handling and each widget handles loading, error, and success states."
```

2. Verify the build:

```bash
npm run build
npm test
npm run lint
```

3. Final verification:

```
claude "Give me a summary of the three integration patterns we used today (direct fetch, MCP, CLI) and which parts of our app use each one"
```

### Checkpoint
- [ ] All service files exist in `src/services/`
- [ ] All widget components exist in `src/components/`
- [ ] `npm run build` succeeds
- [ ] `npm test` passes
- [ ] `npm run lint` has no errors

---

## Bonus Exercises (If Time Permits)

### Bonus 1: 5-Day Weather Forecast

```
claude "Extend the weatherService to also fetch a 5-day forecast and add a ForecastWidget component that shows daily high/low temperatures"
```

### Bonus 2: Enhanced Task Parser

```
claude "Add support for relative dates in taskParser.js: 'next Monday', 'end of month', 'in 3 days'. Write tests for each new pattern."
```

### Bonus 3: Google Workspace Mock

```
claude "Create src/services/googleService.js as a mock service that returns sample calendar events, drive files, and email counts. Create a GoogleWorkspaceWidget that displays this mock data."
```

---

## Summary

In this workshop, you built three types of external integrations and learned professional patterns for AI-powered development:

| Integration | Pattern | Service File | Component |
|-------------|---------|-------------|-----------|
| Weather | Direct Fetch | weatherService.js | WeatherWidget.jsx |
| GitHub Activity | Direct Fetch | githubService.js | GitHubActivityWidget.jsx |
| GitHub (read/query) | `gh` CLI from Claude Code | — | — |
| Google Calendar | MCP server (cross-surface) | `.mcp.json` / `~/.claude.json` | — |
| Smart Tasks | Local Parsing + Structured Output | taskParser.js | SmartTaskInput.jsx |
| Google Workspace (Bonus) | Mock Service | googleService.js | GoogleWorkspaceWidget.jsx |

**Key patterns learned:**
- Preferring a CLI (`gh`) over MCP when one already exists — faster, more reliable, already installed
- MCP for cross-surface services (Google Calendar works in Claude chat *and* Claude Code)
- MCP security evaluation (4-question trustworthiness checklist)
- Project-scoped `.mcp.json` vs user-scoped `~/.claude.json`
- Environment variable expansion in MCP configuration
- Loading / Error / Success state management
- Structured output with `tool_use` and JSON schemas
- Few-shot prompting for consistent extraction
- Tool description design for accurate tool selection
- Structured error responses (`isError`, `isRetryable`, error categories)
- Error Boundaries for graceful failure
- On-demand MCP loading for context management

**Reference materials:**
- `docs/reference/mcp-security-checklist.md` — Full MCP evaluation checklist
- `docs/workshops/templates/S5-MCP-Security-Checklist.md` — Student quick reference
- `docs/workshops/templates/S5-Structured-Output-Reference.md` — Structured output and few-shot reference

**Next Workshop:** Workshop 6 — Cloud Tasks and Mobile Control (unit tests + Remote Control)
