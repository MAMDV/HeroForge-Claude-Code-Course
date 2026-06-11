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

Tell Claude:

```
Confirm Claude Code is installed and that the project builds without errors
```

### Get Your API Keys

Before the exercises, grab the two free keys this workshop uses. Keep them somewhere safe for a few minutes — you'll add them to your `.env` file in the "Set Up Your .env File" step below.

#### 1. OpenWeatherMap API key

1. Go to [openweathermap.org](https://openweathermap.org).
2. Sign up for a free account.
3. Go to **API Keys** in your dashboard.
4. Copy your default API key.

#### 2. GitHub Personal Access Token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens).
2. Click **Generate new token (classic)**.
3. Name it: `LifeOps workshop`.
4. Check the **repo** scope only.
5. Click **Generate token**.
6. **Copy it immediately — you only see it once!**

> ⚠️ **Never type your actual API keys inside dsp or Claude Code — always use a separate terminal tab!** You'll see exactly how to do this safely in the "Set Up Your .env File" step.

---

## Before You Start: Create Your Workshop Branch

Before beginning the exercises, create a new Git branch for your work. This keeps your changes isolated and makes it easy to open a pull request at the end.

Tell Claude:

```
Create and switch to a new Git branch called yourname-workshop-5
```

You should now be on the `yourname-workshop-5` branch. Confirm which Git branch you're currently on:

Tell Claude:

```
Confirm which Git branch I'm currently on
```

---

## What Is an Environment Variable?

Before we create one, here is the idea in plain English.

An **environment variable** is a way to store a secret — like an API key — *outside* your code. Your app reads it when it runs, but it never appears in the files you commit to Git.

> 💡 **Think of it like a locked drawer.** Your app has the key and can open the drawer to grab what it needs (your API key). Git can see that the drawer exists, but it can never look inside — so your secrets never end up in your repository or on GitHub.

In this project, secrets live in a file called `.env` (which is listed in `.gitignore`, so Git ignores it). Your code refers to them *by name* — for example `VITE_WEATHER_API_KEY` — instead of containing the actual key.

---

## Set Up Your .env File

Now let's put the keys you collected earlier into a `.env` file — safely. The trick: **create the file with Claude, but add the real keys yourself in a separate terminal tab.**

### Instructions

1. **Create the file (in dsp).** Ask Claude inside dsp to create the `.env` file with empty placeholders:

```
Create a .env file with empty placeholders for VITE_WEATHER_API_KEY and VITE_GITHUB_TOKEN. Make sure .env is in .gitignore.
```

This gives you a file that looks like:

```
VITE_WEATHER_API_KEY=
VITE_GITHUB_TOKEN=
```

2. **Open a NEW terminal tab.** Click the **+** button in the terminal panel to open a fresh terminal tab — separate from the one running dsp.

3. **Add your keys in the new terminal tab — NOT in dsp.** In that new tab, open `.env` (for example with `code .env` or your editor of choice) and paste in the real keys you copied earlier:

```
VITE_WEATHER_API_KEY=your_openweathermap_key_here
VITE_GITHUB_TOKEN=your_github_token_here
```

### Why a separate terminal tab?

We **never** type real API keys inside dsp because we don't want them logged. Anything you type into a Claude Code session can be captured in the conversation transcript and session logs. By adding your keys in a separate terminal tab — outside the Claude session — your secrets go straight into the `.env` file and never pass through dsp.

> ⚠️ **NEVER type your actual API keys inside dsp or Claude Code — always use a separate terminal tab!** Let Claude create the empty `.env` file for you, then fill in the real values yourself in a different terminal tab.

---

## Exercise 1: Environment Variables Setup (5 minutes)

### Goal
Create a `.env` file to securely store API credentials.

### Instructions

1. Tell Claude to set up environment variable support:

In Claude Code:

```
Create a .env.example file with placeholder values for VITE_WEATHER_API_KEY and VITE_GITHUB_TOKEN. Also create a .env file with the same structure. Make sure .env is in .gitignore.
```

💡 Tell Claude: Set up environment variables for me — make a .env.example with placeholders for VITE_WEATHER_API_KEY and VITE_GITHUB_TOKEN, create a matching .env, and add .env to .gitignore.

2. Open the generated `.env` file and add your real API keys:

```
VITE_WEATHER_API_KEY=your_openweathermap_key_here
VITE_GITHUB_TOKEN=your_github_token_here
```

3. Verify `.env` is in `.gitignore`:

Tell Claude:

```
Confirm that .env appears in .gitignore
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

In Claude Code:

```
Evaluate a Google Calendar MCP server using these 4 questions: (1) Who published it? (2) What permissions does it need? (3) Is the source code available? (4) What data does it access?
```

💡 Tell Claude: Help me decide whether a Google Calendar MCP server is safe to install — who publishes it, what permissions it needs, whether the source is public, and what data it can reach.

3. Inspect your currently installed MCP servers:

```
/mcp
```

4. Review the full checklist reference:

See `docs/reference/mcp-security-checklist.md` for red flags, decision framework, and periodic review guidance. A student quick reference is available at `docs/workshops/S5-MCP-Security-Checklist.md`.

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

In Claude Code:

```
Create src/services/weatherService.js that exports a getWeather(city) function. It should fetch current weather from OpenWeatherMap API using the VITE_WEATHER_API_KEY environment variable. Default city should be San Francisco. Return an object with temperature, description, humidity, and icon.
```

💡 Tell Claude: Build a weather service at src/services/weatherService.js with a getWeather(city) function that pulls current conditions from OpenWeatherMap using my VITE_WEATHER_API_KEY, defaults to San Francisco, and returns temperature, description, humidity, and icon.

2. Create the Weather Widget component:

In Claude Code:

```
Create src/components/WeatherWidget.jsx that uses the weatherService to display current weather. Include loading, error, and success states. Show temperature, weather description, humidity, and a weather icon. Style it as a dashboard card.
```

💡 Tell Claude: Make a WeatherWidget component at src/components/WeatherWidget.jsx that uses the weather service, handles loading, error, and success states, and shows temperature, description, humidity, and an icon as a dashboard card.

3. Test the widget:

Tell Claude:

```
Build the project for production
```

### Verification

Ask Claude to verify the implementation:

In Claude Code:

```
Review the WeatherWidget and weatherService for proper error handling, loading states, and environment variable usage
```

💡 Tell Claude: Review my WeatherWidget and weatherService — check the error handling, the loading states, and that the API key comes from an environment variable.

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

In Claude Code:

```
Create src/services/githubService.js that exports getGitHubActivity(username) function. Fetch recent events from GitHub API with optional token auth from VITE_GITHUB_TOKEN. Format events into readable strings like 'Pushed 3 commits to repo-name'. Return the 10 most recent events.
```

💡 Tell Claude: Create src/services/githubService.js with a getGitHubActivity(username) function that fetches recent GitHub events (using VITE_GITHUB_TOKEN if it's set), formats them into readable lines like 'Pushed 3 commits to repo-name', and returns the 10 most recent.

2. Create the GitHub Activity Widget:

In Claude Code:

```
Create src/components/GitHubActivityWidget.jsx that displays recent GitHub activity. If no token is configured, show a friendly setup message instead of an error. Include loading and error states. Each event should show the type, repo name, and timestamp.
```

💡 Tell Claude: Make a GitHubActivityWidget component that lists recent GitHub activity, shows a friendly setup message when no token is configured, handles loading and error states, and displays each event's type, repo, and timestamp.

3. Test with and without a token:

In Claude Code:

```
What happens if VITE_GITHUB_TOKEN is not set? Verify the GitHubActivityWidget handles this gracefully.
```

💡 Tell Claude: What happens if VITE_GITHUB_TOKEN isn't set? Check that the GitHubActivityWidget handles that gracefully.

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

In Claude Code:

```
Create src/services/taskParser.js that exports a parseTask(input) function. It should extract: title, dueDate (from keywords like 'tomorrow', 'by Friday', ISO dates), priority (from 'urgent', 'high priority', 'low priority'), and category (from #hashtags). Return a structured object.
```

💡 Tell Claude: Create src/services/taskParser.js with a parseTask(input) function that pulls out the title, a due date from phrases like 'tomorrow' or 'by Friday', a priority from words like 'urgent' or 'low priority', and a category from #hashtags, returning a structured object.

2. Test the parser with sample inputs:

In Claude Code:

```
Write 5 test cases for taskParser.js covering: a simple task, a task with a due date, a task with priority, a task with a category hashtag, and a task with all fields.
```

💡 Tell Claude: Write five test cases for taskParser.js — a plain task, one with a due date, one with a priority, one with a #category, and one that has all of them.

3. Create the Smart Task Input component:

In Claude Code:

```
Create src/components/SmartTaskInput.jsx with a text input and live preview panel. As the user types, run parseTask on the input and show the extracted title, due date, priority, and category in a preview card below the input. Include an 'Add Task' button.
```

💡 Tell Claude: Build a SmartTaskInput component with a text box and a live preview that runs parseTask as I type, shows the extracted title, due date, priority, and category in a card below the input, and has an 'Add Task' button.

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

In Claude Code:

```
Explain the difference between asking Claude for JSON in a text response versus using tool_use with a JSON schema. What problems does structured output solve?
```

💡 Tell Claude: Explain how asking for JSON in a normal reply differs from using tool_use with a JSON schema, and what problems structured output solves.

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

In Claude Code:

```
I'm going to give you two versions of a task parsing prompt. Run each one 3 times with the input 'Email boss about budget review by Wednesday urgent #work' and show me the outputs. Version 1 uses only instructions. Version 2 uses few-shot examples. Which produces more consistent results?
```

💡 Tell Claude: I'll give you two task-parsing prompts — one with just instructions, one with few-shot examples. Run each three times on 'Email boss about budget review by Wednesday urgent #work' and tell me which gives more consistent results.

3. Review the full reference at `docs/workshops/S5-Structured-Output-Reference.md`.

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

In Claude Code:

```
Create src/components/ErrorBoundary.jsx as a React class component that catches render errors in its children. Display a styled error card with the message 'Something went wrong' and a 'Try Again' button that resets the error state.
```

💡 Tell Claude: Create an ErrorBoundary at src/components/ErrorBoundary.jsx — a React class component that catches render errors in its children and shows a styled error card saying 'Something went wrong' with a 'Try Again' button that resets the error state.

2. Wrap the external widgets:

In Claude Code:

```
In the main dashboard layout, wrap WeatherWidget and GitHubActivityWidget each in their own ErrorBoundary component. This way if one widget crashes, the others keep working.
```

💡 Tell Claude: In the dashboard layout, wrap WeatherWidget and GitHubActivityWidget each in their own ErrorBoundary so one widget crashing doesn't take down the others.

3. Test error handling:

In Claude Code:

```
Temporarily modify the weatherService to throw an error, then verify the ErrorBoundary catches it and shows the fallback UI
```

💡 Tell Claude: Temporarily make the weatherService throw an error, then confirm the ErrorBoundary catches it and shows the fallback UI.

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

Tell Claude:

```
Show me my GitHub CLI authentication status
```

2. Ask Claude to read from GitHub using `gh`:

In Claude Code:

```
Using the gh CLI, list the 5 most recent issues on this repository (run: gh issue list --limit 5) and summarize them.
```

💡 Tell Claude: Use the gh CLI to list the five most recent issues on this repo and summarize them.

3. Try a pull-request command too:

In Claude Code:

```
Use gh to show the 5 most recent pull requests and their status (gh pr list --limit 5). Then tell me what's currently open.
```

💡 Tell Claude: Use gh to show the five most recent pull requests and their status, then tell me what's currently open.

4. Understand the difference:

In Claude Code:

```
Explain the difference between our githubService.js (direct fetch inside the browser app) and using the gh CLI from Claude Code. When would I use each one?
```

💡 Tell Claude: Explain the difference between our githubService.js (a direct fetch inside the browser app) and using the gh CLI from Claude Code, and when I'd use each.

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

In Claude Code:

```
Using the Google Calendar MCP, what's on my calendar tomorrow? Then find a free 30-minute slot this week.
```

💡 Tell Claude: Using the Google Calendar MCP, what's on my calendar tomorrow, and can you find a free 30-minute slot this week?

4. Understand why this one is an MCP, not a CLI:

In Claude Code:

```
Explain why the Google Calendar MCP works in both Claude chat and Claude Code, while the gh CLI only works where a terminal is available.
```

💡 Tell Claude: Explain why the Google Calendar MCP works in both Claude chat and Claude Code, while the gh CLI only works where there's a terminal.

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

In Claude Code:

```
How much context window space do my currently loaded MCP tools consume? What happens if I disable the ones I'm not using right now?
```

💡 Tell Claude: How much of my context window do the currently loaded MCP tools take up, and what happens if I turn off the ones I'm not using?

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

In Claude Code:

```
List all the service files and widget components we created today. Verify each service has proper error handling and each widget handles loading, error, and success states.
```

💡 Tell Claude: List all the service files and widget components we built today and check that each service handles errors and each widget handles loading, error, and success states.

2. Verify the build:

Tell Claude:

```
Build the project for production, run the tests, and run the linter
```

3. Final verification:

In Claude Code:

```
Give me a summary of the three integration patterns we used today (direct fetch, MCP, CLI) and which parts of our app use each one
```

💡 Tell Claude: Summarize the three integration patterns we used today — direct fetch, MCP, and CLI — and which parts of our app use each.

### Checkpoint
- [ ] All service files exist in `src/services/`
- [ ] All widget components exist in `src/components/`
- [ ] `npm run build` succeeds
- [ ] `npm test` passes
- [ ] `npm run lint` has no errors

---

## Bonus Exercises (If Time Permits)

### Bonus 1: 5-Day Weather Forecast

In Claude Code:

```
Extend the weatherService to also fetch a 5-day forecast and add a ForecastWidget component that shows daily high/low temperatures
```

💡 Tell Claude: Extend the weather service to also pull a 5-day forecast, and add a ForecastWidget that shows daily highs and lows.

### Bonus 2: Enhanced Task Parser

In Claude Code:

```
Add support for relative dates in taskParser.js: 'next Monday', 'end of month', 'in 3 days'. Write tests for each new pattern.
```

💡 Tell Claude: Add relative dates like 'next Monday', 'end of month', and 'in 3 days' to taskParser.js, with tests for each new pattern.

### Bonus 3: Google Workspace Mock

In Claude Code:

```
Create src/services/googleService.js as a mock service that returns sample calendar events, drive files, and email counts. Create a GoogleWorkspaceWidget that displays this mock data.
```

💡 Tell Claude: Create src/services/googleService.js as a mock that returns sample calendar events, drive files, and email counts, plus a GoogleWorkspaceWidget that displays that mock data.

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
- `docs/workshops/S5-MCP-Security-Checklist.md` — Student quick reference
- `docs/workshops/S5-Structured-Output-Reference.md` — Structured output and few-shot reference

**Next Workshop:** Workshop 6 — Cloud Tasks and Mobile Control (unit tests + Remote Control)
