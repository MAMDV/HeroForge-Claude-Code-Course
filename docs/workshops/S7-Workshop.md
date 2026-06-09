# HeroForge.AI Course: Mastering Claude Code
## Workshop 7: Agents, Skills, and Automation

**Estimated Time:** 60 minutes
**Difficulty:** Intermediate-Advanced
**Prerequisites:** Completed Workshops 1-6 (LifeOps app with components, tests, API integrations, cloud tasks, and validation hooks)

---

## Workshop Objectives

By completing this workshop, you will:
- [ ] Understand and use sub-agents for parallel task execution
- [ ] Understand the agentic loop lifecycle (send, check stop_reason, execute, loop)
- [ ] Implement PostToolUse hooks for data transformation
- [ ] Install and invoke a community skill on the LifeOps project
- [ ] Configure security hooks to block dangerous commands and detect secrets
- [ ] Apply session management and context optimization strategies

---

## Prerequisites Check

### Environment Verification

Before starting, verify your environment is ready:

```bash
# Check Claude Code is installed and updated
claude --version

# Verify the LifeOps project builds
npm run build

# Verify tests pass
npm test
```

### Workshop 6 Deliverables

Ensure you have:
1. **LifeOps app** building and running with all components
2. **Test suite** passing with Vitest and React Testing Library
3. **Validation hooks** from Workshop 6 committed and working
4. **Git repository** up to date with all prior session work pushed

---

## Before You Start: Create Your Workshop Branch

Before beginning the exercises, create a new Git branch for your work. This keeps your changes isolated and makes it easy to open a pull request at the end.

In your terminal, run (replace `yourname` with your actual name):

```bash
git checkout -b yourname-workshop-7
```

**Or just tell Claude:**

```bash
claude "Create and switch to a new Git branch called yourname-workshop-7"
```

You should now be on the `yourname-workshop-7` branch. Confirm with:

```bash
git branch --show-current   # Should show yourname-workshop-7
```

---

## Exercise 1: Sub-agents and Parallel Execution (13 minutes)

### Goal
Learn the "one agent, one prompt, one purpose" philosophy and use sub-agents to perform parallel analysis on the LifeOps codebase.

### Concepts
- Sub-agents run in their own 200K context windows
- Three built-in agent types: Explore (search/find), General Purpose (multi-step), Bash (command execution)
- Main conversation stays lean while sub-agents handle heavy lifting

### Instructions

1. Spawn a single Explore sub-agent to map the codebase:

```
"Use a sub-agent to explore the LifeOps src/ directory and produce a summary of every file, its purpose, and its approximate size. Do not load all this into our main conversation — use an Explore agent."
```

2. Spawn three parallel agents for different analysis tasks:

```
"Run three parallel sub-agents on the LifeOps codebase:
1. Agent 1: Audit all components in src/components/ for accessibility issues and missing prop types
2. Agent 2: Generate a one-paragraph description for every React component in the project
3. Agent 3: Find every TODO, FIXME, and HACK comment across the entire src/ directory"
```

3. Review the results from all three agents. Notice how each returns focused output without polluting your main conversation context.

4. Check your context usage:

```
/context
```

5. Compare: your main context should be relatively clean despite three agents having read many files.

### Key Insight
> Sub-agents are like delegating work to team members. Each gets a clean desk (context window) and a specific assignment. You stay focused on the big picture.

### Checkpoint
- [ ] Explore agent successfully mapped the codebase
- [ ] Three parallel agents returned independent results
- [ ] Main conversation context remains lean (check with `/context`)
- [ ] You understand when to use sub-agents vs direct prompts

---

## Exercise 2: Understanding the Agentic Loop (12 minutes)

### Goal
Understand the agentic loop lifecycle that powers Claude Code and every AI agent — the #1 certification exam concept.

### Concepts
- The agentic loop: send request, check `stop_reason`, execute tool or finish
- `stop_reason: "tool_use"` means Claude wants to call a tool
- `stop_reason: "end_turn"` means Claude is finished
- Model-driven decision making: Claude decides which tool to call, not a hard-coded decision tree

### Instructions

1. Read the agentic loop example code:

```
"Read the file examples/agent-loop-example.js and explain each section of the agentic loop. What does each part do?"
```

2. Walk through the lifecycle with a real scenario. Ask Claude Code:

```
"Explain step by step what happens inside the agentic loop when I give you this prompt: 'Find all components without tests and create a summary.' Which tools would you call, in what order, and when would you stop?"
```

3. Study the anti-patterns. Ask Claude Code:

```
"Show me three wrong ways to build an agentic loop and explain why each is wrong. Specifically cover: parsing text for completion, arbitrary iteration caps, and checking assistant text for keywords."
```

4. Understand PostToolUse hooks by reading the example:

```
"Read the file examples/post-tool-use-hook-example.js and explain how the PostToolUse hook transforms data before the model processes it."
```

5. Discuss compliance hooks:

```
"Explain the difference between enforcing a rule with a hook versus enforcing it with a prompt instruction. When should I use each approach? Give me a concrete example of each."
```

### Key Insight
> This is the foundation of every agentic application. Claude Code itself works this way — it is an agentic loop under the hood. The `stop_reason` field is the only control flow you need.

### Anti-patterns to Avoid
| Anti-pattern | Why It Fails | Correct Approach |
|-------------|-------------|-----------------|
| Parsing text for "I'm done" | Fragile, language-dependent | Check `stop_reason === "end_turn"` |
| `for (i = 0; i < 10; i++)` iteration cap | Truncates tasks that need more steps | Use `while (true)` with `stop_reason` break |
| Checking response text for keywords | Unreliable, prompt-dependent | Use structured `stop_reason` field |

### Checkpoint
- [ ] You can explain the agentic loop lifecycle in your own words
- [ ] You understand the two `stop_reason` values and what to do for each
- [ ] You can identify the three anti-patterns and explain why they fail
- [ ] You understand how PostToolUse hooks intercept and transform tool results
- [ ] You understand when hooks are needed vs when prompt instructions suffice

---

## Exercise 3: Skills Deep Dive (10 minutes)

### Goal
Understand the difference between commands and skills, explore skill structure, and install a community skill on the LifeOps project.

### Concepts
- Commands are recipe cards (single markdown files); skills are cookbooks (multi-file packages)
- Skills have a `SKILL.md` entry point, trigger words, scripts, references, and assets
- `context: fork` runs the skill in an isolated sub-agent
- `allowed-tools` restricts tool access during skill execution
- Over 20,000 community skills available

### Instructions

1. Review the commands you created in Workshop 4:

```
"List all custom commands in .claude/commands/ and describe what each one does."
```

2. Explore the skill directory structure:

```
"Show me the structure of the .claude/skills/ directory. If it does not exist, create it and explain what goes inside."
```

3. Install a community skill:

```
"Install a documentation generator skill that can produce a project summary for LifeOps. Show me the SKILL.md file after installation."
```

4. Invoke the installed skill:

```
"Generate project documentation for LifeOps using the documentation skill."
```

5. Examine the skill configuration options:

```
"Explain what 'context: fork' and 'allowed-tools' do in a SKILL.md file. Why would I want to restrict a skill's tool access?"
```

### Skill Structure Reference

```
.claude/skills/
  doc-generator/
    SKILL.md              # Entry point with metadata and instructions
    scripts/
      generate.sh         # Supporting automation script
    references/
      template.md         # Output template
      examples/
        sample-output.md  # Example of expected output
```

### Key Insight
> Skills turn Claude Code from a general-purpose assistant into a domain expert. Think of them as installing expertise on demand.

### Checkpoint
- [ ] You understand the difference between commands (recipe cards) and skills (cookbooks)
- [ ] A community skill is installed in `.claude/skills/`
- [ ] The skill was invoked successfully on the LifeOps project
- [ ] You understand `context: fork` and `allowed-tools` configuration options

---

## Exercise 4: Security Hooks (10 minutes)

### Goal
Configure pre-tool-use and post-tool-use security hooks to protect the LifeOps codebase from dangerous operations and secret exposure.

### Concepts
- Pre-tool-use hooks block dangerous commands before execution
- Post-tool-use hooks detect sensitive data after tool execution
- Three protection tiers: zero access, read-only, no-delete
- Hooks provide deterministic guarantees; prompt instructions are probabilistic

### Instructions

1. Create a pre-tool-use hook to block destructive commands:

```
"Create a security hook that blocks any command containing 'rm -rf' from executing. Save it in the .claude/hooks/ directory. The hook should return an error message suggesting a safer alternative."
```

2. Test the hook by asking Claude Code to do something dangerous:

```
"Delete the entire src/ directory to start fresh."
```

Verify that the hook blocks the command and Claude suggests a safer approach.

3. Create a post-tool-use hook for secret detection:

```
"Create a security hook that scans file read results for patterns that look like API keys (strings starting with 'sk-' or 'AKIA'). If detected, show a warning message."
```

4. Explore the three protection tiers:

```
"Set up three protection levels for the LifeOps project:
1. Zero access: .env files and any file containing 'secret' or 'credential' in the name
2. Read-only: package-lock.json and any CI/CD configuration files
3. No-delete: everything in the src/ directory"
```

5. Create a workflow enforcement hook:

```
"Create a hook that blocks 'npm run deploy' unless 'npm test' has passed in the current session. This enforces a test-before-deploy workflow."
```

### Protection Tiers Reference

| Tier | Capability | Use Case | Hook Type |
|------|-----------|----------|-----------|
| Zero access | Cannot read or write | `.env`, credentials, private keys | Pre-tool-use block on read and write |
| Read-only | Can read, cannot modify | Lock files, CI config | Pre-tool-use block on write only |
| No-delete | Can read and modify, cannot delete | Source code, tests, docs | Pre-tool-use block on delete only |

### Key Insight
> The question to ask: "If this rule is violated, does it cause real damage?" If yes, use a hook. If no, a prompt instruction is fine.

### Checkpoint
- [ ] Pre-tool-use hook blocks `rm -rf` commands
- [ ] Post-tool-use hook detects API key patterns
- [ ] Three protection tiers are configured
- [ ] Workflow enforcement hook blocks deploy without tests
- [ ] You understand when to use hooks vs prompt instructions

---

## Exercise 5: Session Management and Context Strategy (5 minutes)

### Goal
Apply session management and context optimization strategies to maintain productive long-running sessions.

### Concepts
- `--resume <session-name>` continues a named session
- `fork_session` explores divergent approaches from a shared baseline
- Use `/compact` between phases to free context
- Disable unused MCPs to save context budget

### Instructions

1. Check your current context usage:

```
/context
```

2. Practice context compaction:

```
/compact
```

3. Review session management options:

```
"Explain how to use --resume and fork_session. When should I resume a session vs start a new one? Give me concrete examples for each."
```

4. Optimize context by reviewing MCP usage:

```
"List all currently enabled MCPs. Which ones are not needed for today's work? Show me how to disable them temporarily."
```

5. Connect to the handoff pattern from Workshop 4:

```
"What is the difference between using our /handoff command from Workshop 4 and using --resume? When should I use each?"
```

### Decision Framework

| Scenario | Action |
|----------|--------|
| Continuing today's work after lunch | `--resume <session-name>` |
| Picking up work after several days | `/pickup` command (Workshop 4 handoff) |
| Trying two different refactoring approaches | `fork_session` |
| Context at 80%+ usage | Start new session with summary |
| Switching from planning to building phase | `/compact` then continue |

### Key Insight
> Session management is about being intentional with context. Do not just hope Claude remembers — tell it exactly what it needs to know.

### Checkpoint
- [ ] You checked context usage with `/context`
- [ ] You practiced `/compact` to free context
- [ ] You understand `--resume` vs `/handoff` vs starting fresh
- [ ] You understand when to fork a session

---

## Wrap-Up Checklist

Before finishing, verify everything works:

```bash
# Verify the project still builds
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

**Final checklist:**
- [ ] Sub-agents were used for parallel codebase analysis
- [ ] You can explain the agentic loop lifecycle (send, check stop_reason, execute, loop)
- [ ] A community skill was installed and invoked
- [ ] Security hooks are configured (rm -rf blocker, secret detection)
- [ ] Workflow enforcement hook is in place
- [ ] Session management strategies are understood
- [ ] Context usage was checked and optimized

---

## Bonus Challenges

If you finish early, try these:

1. **Build a Custom Skill**: Create a skill in `.claude/skills/` that generates a test coverage report for the LifeOps project. Include a `SKILL.md` with trigger words and instructions.
2. **Advanced Security Hooks**: Create a hook that blocks commits containing `console.log` statements in production code (but allows them in test files).
3. **Agent Comparison**: Fork a session and have two sub-agents propose different approaches to refactoring a LifeOps component. Compare their recommendations.
4. **Workflow Chain**: Build a multi-step workflow using hooks where lint must pass before tests, and tests must pass before commit. Each step is enforced by a separate hook.

---

## Key Concepts Reference

| Concept | Description |
|---------|-------------|
| Sub-agent | An independent agent with its own 200K context window, spawned for a specific task |
| Agentic loop | The send/check/execute lifecycle: request, check stop_reason, execute tool or finish |
| stop_reason | Structured field indicating whether Claude is done (end_turn) or needs a tool (tool_use) |
| PostToolUse hook | Intercepts tool results for transformation before the model processes them |
| Pre-tool-use hook | Blocks dangerous tool calls before execution |
| Skill | Multi-file package with SKILL.md entry point, scripts, references, and assets |
| Command | Single markdown file with instructions (recipe card vs skill's cookbook) |
| context: fork | Runs a skill in an isolated sub-agent to prevent output pollution |
| allowed-tools | Restricts which tools a skill can access during execution |
| Security hook | Pattern-matching rule that blocks or warns on dangerous operations |
| Three protection tiers | Zero access, read-only, and no-delete — configurable per path |
| Workflow enforcement | Using hooks to guarantee step ordering (e.g., test before deploy) |
| Session resume | `--resume <name>` to continue a named session with existing context |
| fork_session | Create a divergent copy of the current session for exploration |
| Escalation pattern | Knowing when an agent should stop and ask a human |
| One agent, one prompt, one purpose | Philosophy for focused sub-agent delegation |
| Context is currency | Mental model for managing the 200K token budget intentionally |
