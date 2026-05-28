# Workshop 6 Reference: Claude Code Hooks

**What this covers:** How to use hooks for automated validation, security, notification, and logging in Claude Code.

---

## What Are Hooks?

Hooks are scripts that run automatically before or after Claude Code actions. They provide deterministic guarantees — unlike prompt instructions, which Claude might occasionally skip, hooks execute every time without exception.

There are two types:

| Type | When it runs | Can it block? | Use case |
|------|-------------|---------------|----------|
| **Pre-tool-use** | BEFORE an action | Yes — if the hook fails (non-zero exit), the action is blocked | Validation, security gates |
| **Post-tool-use** | AFTER an action | No — the action already happened | Warnings, logging, notifications |

---

## Configuration Format

Hooks are configured in your Claude Code `settings.json` file. The structure is:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "ToolName(argument pattern)",
        "hooks": [
          {
            "type": "command",
            "command": "your-command-here"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "ToolName(argument pattern)",
        "hooks": [
          {
            "type": "command",
            "command": "your-command-here"
          }
        ]
      }
    ]
  }
}
```

Each hook entry has:
- **`matcher`** — a pattern that determines which tool calls trigger this hook
- **`hooks`** — an array of commands to run when the matcher matches
- **`type`** — currently `"command"` (runs a shell command)
- **`command`** — the shell command to execute

---

## Pattern Matcher Syntax

The matcher follows the format `ToolName(argument pattern)`:

| Pattern | What it matches |
|---------|----------------|
| `Bash(git commit*)` | Any Bash call starting with `git commit` |
| `Bash(git push*)` | Any Bash call starting with `git push` |
| `Bash(rm -rf*)` | Any Bash call starting with `rm -rf` |
| `Write(*.jsx)` | Any file write to a `.jsx` file |
| `Write(src/*)` | Any file write inside the `src/` directory |
| `Read(*)` | Any file read |
| `Bash(npm publish*)` | Any Bash call starting with `npm publish` |

**Wildcard rules:**
- `*` matches any sequence of characters
- The pattern matches against the tool's argument (the command for Bash, the file path for Read/Write)

---

## Common Hook Use Cases

### 1. Validation: Run Tests Before Commit

Block commits when tests fail:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "hooks": [
          {
            "type": "command",
            "command": "npm test"
          }
        ]
      }
    ]
  }
}
```

### 2. Security: Block Dangerous Commands

Prevent accidental destructive operations:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(rm -rf*)",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'BLOCKED: rm -rf is not allowed' && exit 1"
          }
        ]
      }
    ]
  }
}
```

### 3. Linting: Run Lint Before Commit

Ensure code style compliance:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint"
          }
        ]
      }
    ]
  }
}
```

### 4. Logging: Record Agent Activity

Log all file writes for audit purposes:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write(*)",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"$(date): File written\" >> .claude/activity.log"
          }
        ]
      }
    ]
  }
}
```

### 5. Notification: Alert on Completion

Play a sound or send a notification when a long-running command finishes:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash(npm run build*)",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Build completed' && osascript -e 'display notification \"Build done\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

---

## Hooks vs Prompt Instructions

| Aspect | Hooks | Prompt Instructions |
|--------|-------|-------------------|
| **Reliability** | 100% — always runs | High but not guaranteed — Claude might skip |
| **Scope** | Specific tool calls (pattern-matched) | Any behavior in any context |
| **Flexibility** | Fixed command execution | Nuanced, context-dependent reasoning |
| **Configuration** | `settings.json` | `CLAUDE.md` or conversation |
| **Best for** | Compliance that must be 100% | Guidelines, preferences, coding style |

**Rule of thumb:** Use hooks when compliance must be deterministic (security, testing, linting). Use prompt instructions for guidelines where judgment is needed (code style, architecture decisions, naming conventions).

---

## Multiple Hooks on the Same Matcher

You can run multiple commands for the same trigger:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "hooks": [
          {
            "type": "command",
            "command": "npm test"
          },
          {
            "type": "command",
            "command": "npm run lint"
          }
        ]
      }
    ]
  }
}
```

All hooks run in order. If any hook fails (non-zero exit), the action is blocked.

---

## Looking Ahead

In Workshop 7, you will use hooks for more advanced scenarios:
- Security hooks that detect secrets in code
- Compliance hooks that enforce business rules
- Agent SDK hooks (`PostToolUse`) that transform data between agent steps

Hooks are one of the most important tools for professional Claude Code usage. They turn "best practices" into enforced guarantees.
