# HeroForge.AI Course: Mastering Claude Code
## Session 5 Workshop: Connecting to the Outside World

**Estimated Time:** 45-60 minutes
**Difficulty:** Intermediate
**Prerequisites:** Completed Sessions 1-4 (Dev environment, Git workflow, multi-file React architecture)

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
node --version        # Should show v20.x.x
npm --version         # Should show 10.x.x
claude --version      # Should show a version number
npm run build         # Should succeed without errors
```

### API Keys Setup

You will need:
1. **OpenWeatherMap API key** (free tier): Sign up at https://openweathermap.org/api
2. **GitHub personal access token** (optional): Settings > Developer Settings > Personal Access Tokens

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

2. Practice evaluating the GitHub MCP server:

```
claude "Evaluate @modelcontextprotocol/server-github using these 4 questions: (1) Who published it? (2) What permissions does it need? (3) Is the source code available? (4) What data does it access?"
```

3. Inspect your currently installed MCP servers:

```
/mcp
```

4. Review the full checklist reference:

See `docs/reference/mcp-security-checklist.md` for red flags, decision framework, and periodic review guidance. A student quick reference is available at `docs/workshops/templates/S5-MCP-Security-Checklist.md`.

### Checkpoint
- [ ] You can name the 4 trustworthiness questions from memory
- [ ] You evaluated the GitHub MCP server using the checklist
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

## Exercise 9: MCP Configuration (5 minutes)

### Goal
Configure MCP servers using project-scoped and user-scoped settings, with environment variable expansion for credentials.

### Instructions

1. Create a project-scoped `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

Note: The `${GITHUB_TOKEN}` syntax references an environment variable — the actual token stays in your `.env` file, which is never committed. This keeps secrets out of version control while making the MCP configuration shareable with your team.

2. Understand the two configuration scopes:

| Scope | File | Shared? | Use case |
|-------|------|---------|----------|
| Project | `.mcp.json` (project root) | Yes, via Git | Team-shared servers (project API, database) |
| User | `~/.claude.json` | No | Personal/experimental servers |

3. Test the MCP connection:

```
claude "Using the GitHub MCP server, list the 5 most recent issues on our repository"
```

4. Understand the difference:

```
claude "Explain the difference between our githubService.js (direct fetch) and the GitHub MCP server. When would I use each one?"
```

### Checkpoint
- [ ] `.mcp.json` exists in project root with environment variable expansion
- [ ] You understand project-scoped vs user-scoped MCP configuration
- [ ] Claude can query GitHub through MCP
- [ ] You understand when to use direct fetch vs MCP

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

### Connection to Session 4

Remember "Context is currency" from Session 4. Your 200K token context window is shared between CLAUDE.md, MCP tool definitions, and your conversation. Managing loaded MCPs is one of the easiest ways to reclaim context space when you are working on tasks that do not need external integrations.

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
| GitHub Activity | Direct Fetch + MCP | githubService.js | GitHubActivityWidget.jsx |
| Smart Tasks | Local Parsing + Structured Output | taskParser.js | SmartTaskInput.jsx |
| Google (Bonus) | Mock Service | googleService.js | GoogleWorkspaceWidget.jsx |

**Key patterns learned:**
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

**Next Session:** Session 6 — Cloud Tasks and Mobile Control (unit tests + Remote Control)
