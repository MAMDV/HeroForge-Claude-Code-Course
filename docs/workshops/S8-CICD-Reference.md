# Workshop 8 Reference: CI/CD Integration with Claude Code

This reference covers using Claude Code in automated pipelines — CI/CD workflows, git hooks, and scripted review processes.

---

## The `-p` Flag: Non-Interactive Mode

The `-p` (or `--print`) flag runs Claude Code as a single-shot command. Instead of an interactive conversation, you provide a prompt and receive a response. This is what makes automation possible.

### Basic Usage

```bash
# Simple review
claude -p "Review src/App.tsx for bugs and security issues"

# Multi-line prompt
claude -p "Analyze the test coverage in this project.
List any components that lack test files.
Suggest which components should be tested first based on complexity."
```

### Key Behaviors in Non-Interactive Mode

- No follow-up questions — Claude processes the prompt and returns a single response
- Full file system access — Claude can read your codebase, including CLAUDE.md
- No conversation history — each invocation starts with a fresh context
- Exit code 0 on success, non-zero on failure — useful for CI pass/fail gates

---

## Structured Output: `--output-format json`

The `--output-format json` flag produces machine-parseable JSON output instead of human-readable text.

### Basic JSON Output

```bash
claude -p "List all TODO comments in the codebase" --output-format json
```

### Schema-Constrained Output: `--json-schema`

Combine `--output-format json` with `--json-schema` to enforce a specific output structure. This is essential for downstream automation that expects consistent fields.

```bash
claude -p "Review this codebase for security issues" \
  --output-format json \
  --json-schema '{
    "type": "object",
    "properties": {
      "issues": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "file": { "type": "string" },
            "line": { "type": "number" },
            "severity": { "type": "string", "enum": ["critical", "warning", "info"] },
            "message": { "type": "string" },
            "suggestion": { "type": "string" }
          },
          "required": ["file", "severity", "message"]
        }
      },
      "summary": { "type": "string" }
    },
    "required": ["issues", "summary"]
  }'
```

### When to Use Each

| Format | Use Case |
|--------|----------|
| Default (text) | Human-readable reports, logs, debugging |
| `--output-format json` | Parsing in scripts, storing results, API integration |
| `--json-schema` | Strict downstream consumers, dashboards, automated PR comments |

---

## CLAUDE.md as CI Context

The same `CLAUDE.md` that guides interactive development also provides context to CI-invoked Claude instances. This means your review criteria, coding conventions, testing standards, and fixture conventions are automatically available during automated review — without maintaining a separate review checklist.

### What CLAUDE.md Provides to CI

- **Coding conventions**: naming patterns, file organization, import rules
- **Testing standards**: coverage expectations, test file locations, fixture patterns
- **Security rules**: secrets handling, input validation, authentication requirements
- **Architecture decisions**: component structure, data flow, state management

### Best Practice

Keep your CLAUDE.md comprehensive and up-to-date. It serves double duty:
1. Guides Claude during interactive development
2. Provides review criteria during automated CI review

---

## Session Context Isolation

### The Self-Review Limitation

When Claude generates code in an interactive session, it builds up reasoning context — the decisions it made, the tradeoffs it considered, the assumptions it held. If you ask the same session to review the code it just generated, that context makes it less likely to question its own decisions.

This is not a deficiency — it is a natural consequence of how context works. A reviewer who knows all the reasoning behind a decision is less likely to challenge it than a reviewer seeing the code for the first time.

### Why CI Review Catches More Issues

A Claude instance invoked in CI:
- Has no prior reasoning context from the generation session
- Evaluates the code purely on its own merits
- Applies CLAUDE.md rules without the biases of the generation process
- Is more likely to notice inconsistencies, edge cases, and violations

### Multi-Pass Review for Large Codebases

For large PRs or complex changes, consider splitting the review into multiple passes:

1. **Per-file analysis**: Review each changed file independently for local correctness
2. **Cross-file integration**: Review how the changed files interact with each other and the rest of the codebase
3. **Security-focused pass**: A dedicated pass looking only at security concerns

```yaml
# Example: Multi-pass review in GitHub Actions
- name: Per-file review
  run: |
    claude -p "Review each changed file in this PR independently. For each file, check for bugs, naming conventions, and error handling." --output-format json

- name: Integration review
  run: |
    claude -p "Review how the changed files in this PR interact with each other and the rest of the codebase. Check for broken contracts, missing imports, and inconsistent data flow." --output-format json
```

---

## Example Workflow Configurations

### Basic PR Review

```yaml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code
      - name: Run Claude Code Review
        run: |
          claude -p "Review this PR diff for bugs, security issues, and code quality. Focus on new or changed files only. Report only new issues, not pre-existing ones." --output-format json
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

### Security-Focused Review

```yaml
- name: Security Review
  run: |
    claude -p "Perform a security-focused review of this PR. Check for:
    1. Hardcoded secrets, API keys, or credentials
    2. SQL injection or XSS vulnerabilities
    3. Improper input validation
    4. Insecure dependencies
    5. Authentication/authorization bypasses
    Report only critical and high-severity findings." --output-format json
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

### Pre-Merge Gate

```yaml
- name: Pre-merge quality check
  run: |
    RESULT=$(claude -p "Check if this PR is ready to merge. Verify: 1) No TODO comments in new code, 2) All new functions have documentation, 3) No console.log statements in production code, 4) Error handling is present for all async operations. Return pass or fail with reasons." --output-format json)
    echo "$RESULT"
    # Parse result and fail the job if issues are found
```

---

## Tips for Reducing False Positives

1. **Be specific in your prompt**: "Review for bugs" is vague. "Check for null pointer errors, unhandled promise rejections, and incorrect type coercions" is specific.

2. **Scope to changed files**: Include "Focus on new or changed files only" to avoid flagging pre-existing issues.

3. **Provide context via CLAUDE.md**: If your project has intentional patterns that look like issues (e.g., `any` types in specific files, test fixtures with fake credentials), document them in CLAUDE.md so the reviewer understands the context.

4. **Filter by severity**: For automated gates, only fail on critical issues. Log warnings and info items without blocking.

5. **Use `--json-schema` for consistent output**: Structured output is easier to filter and process than free-text responses.

6. **Tune over time**: Start permissive, then tighten the review criteria as you learn which findings are most valuable for your project.
