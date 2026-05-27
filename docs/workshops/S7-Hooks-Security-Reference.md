# Session 7 Reference: Hooks and Security

**Purpose:** Quick reference for pre-tool-use and post-tool-use hooks, pattern matcher syntax, three protection tiers, patterns.yaml format, and common security hook recipes.

---

## Pre-Tool-Use vs Post-Tool-Use Hooks

| Aspect | Pre-Tool-Use | Post-Tool-Use |
|--------|-------------|--------------|
| **When it runs** | Before the tool executes | After the tool executes, before model sees result |
| **What it can do** | Block the tool call entirely | Transform, filter, or warn about the result |
| **Primary use** | Preventing dangerous operations | Normalizing data, detecting sensitive output |
| **If it blocks** | Tool never executes; error message returned to model | Tool already executed; can suppress or modify result |
| **Performance impact** | None (tool does not run) | Tool runs, then hook processes output |

### Flow Diagram

```
User Prompt
    |
    v
Claude decides to call a tool
    |
    v
+-------------------+
| Pre-Tool-Use Hook |-----> BLOCKED? --> Error message to Claude
+-------------------+
    |
    | (allowed)
    v
+-------------------+
| Tool Executes     |
+-------------------+
    |
    v
+--------------------+
| Post-Tool-Use Hook |-----> Transform/filter/warn
+--------------------+
    |
    v
Result sent to Claude
```

---

## Pattern Matcher Syntax

Patterns use string matching and regular expressions to identify dangerous commands or sensitive data.

### String Matching

```yaml
# Exact substring match
- pattern: "rm -rf"
  action: block

# Multiple patterns (any match triggers the rule)
- patterns:
    - "rm -rf"
    - "rm -r /"
    - "rmdir --ignore-fail-on-non-empty"
  action: block
```

### Regular Expression Matching

```yaml
# Regex pattern for API keys
- pattern: "(sk-[a-zA-Z0-9]{32,}|AKIA[A-Z0-9]{16})"
  type: regex
  action: warn

# Regex for AWS credentials
- pattern: "aws_secret_access_key\\s*=\\s*[A-Za-z0-9/+=]{40}"
  type: regex
  action: warn
```

### Path-Based Matching

```yaml
# Block writes to specific paths
- path: ".env*"
  operation: write
  action: block

# Block reads from credential files
- path: "**/*credential*"
  operation: read
  action: block
```

---

## Three Protection Tiers

### Tier 1: Zero Access

The tool cannot read or write to the protected resource. Use for files containing secrets, credentials, and private keys.

```yaml
# Zero access tier
zero_access:
  - path: ".env"
    operations: [read, write, delete]
    action: block
    message: "Access to .env files is blocked. Use environment variables instead."

  - path: "**/*.pem"
    operations: [read, write, delete]
    action: block
    message: "Private key files are blocked from all operations."

  - path: "**/credentials.json"
    operations: [read, write, delete]
    action: block
    message: "Credential files cannot be accessed."
```

### Tier 2: Read-Only

The tool can read but not modify or delete. Use for configuration files, lock files, and CI/CD pipelines.

```yaml
# Read-only tier
read_only:
  - path: "package-lock.json"
    operations: [write, delete]
    action: block
    message: "package-lock.json is read-only. Use 'npm install' to update it."

  - path: ".github/workflows/*"
    operations: [write, delete]
    action: block
    message: "CI/CD configuration is read-only. Edit manually with review."

  - path: "tsconfig.json"
    operations: [write, delete]
    action: block
    message: "TypeScript config is read-only in this session."
```

### Tier 3: No-Delete

The tool can read and modify but not delete. Use for source code, tests, and documentation that should never be removed.

```yaml
# No-delete tier
no_delete:
  - path: "src/**/*"
    operations: [delete]
    action: block
    message: "Source files cannot be deleted. Archive or move them instead."

  - path: "tests/**/*"
    operations: [delete]
    action: block
    message: "Test files cannot be deleted."

  - path: "docs/**/*"
    operations: [delete]
    action: block
    message: "Documentation files cannot be deleted."
```

---

## patterns.yaml Format

The `patterns.yaml` file lives in `.claude/hooks/` and defines all security rules in one place.

```yaml
# .claude/hooks/patterns.yaml

# Pre-tool-use rules: evaluated before tool execution
pre_tool_use:
  # Block dangerous shell commands
  - name: "block-recursive-delete"
    tool: bash
    pattern: "rm -rf"
    action: block
    message: "Recursive force deletion is blocked. Remove files individually."

  - name: "block-root-delete"
    tool: bash
    pattern: "rm -r /"
    action: block
    message: "Root directory deletion is absolutely blocked."

  - name: "block-force-push"
    tool: bash
    pattern: "git push --force"
    action: block
    message: "Force push is blocked. Use --force-with-lease if necessary."

  # Path-based access control
  - name: "protect-env-files"
    tool: [read, write]
    path: ".env*"
    action: block
    message: "Environment files are protected. Use environment variables."

  # Workflow prerequisites
  - name: "test-before-deploy"
    tool: bash
    pattern: "npm run deploy"
    prerequisite: "npm test"
    action: block_unless_prerequisite_passed
    message: "Tests must pass before deployment."

# Post-tool-use rules: evaluated after tool execution
post_tool_use:
  # Secret detection
  - name: "detect-api-keys"
    pattern: "(sk-[a-zA-Z0-9]{32,}|AKIA[A-Z0-9]{16})"
    type: regex
    action: warn
    message: "Possible API key detected in output. Do not commit this file."

  - name: "detect-private-keys"
    pattern: "-----BEGIN (RSA |EC |DSA )?PRIVATE KEY-----"
    type: regex
    action: warn
    message: "Private key detected in output. This should never be in source code."

  - name: "detect-connection-strings"
    pattern: "(mongodb|postgres|mysql)://[^\\s]+"
    type: regex
    action: warn
    message: "Database connection string detected. Use environment variables."
```

---

## Common Security Hook Recipes

### Recipe 1: rm -rf Blocker

Prevents accidental recursive deletion of directories.

```yaml
- name: "block-recursive-delete"
  tool: bash
  patterns:
    - "rm -rf"
    - "rm -fr"
    - "rm -r --force"
  action: block
  message: "Recursive force deletion is blocked. To remove files, delete them individually or use a more targeted command."
```

### Recipe 2: Secret Detector

Scans tool output for common secret patterns and warns before they can be committed.

```yaml
- name: "detect-secrets"
  type: regex
  patterns:
    # OpenAI API keys
    - "sk-[a-zA-Z0-9]{32,}"
    # AWS Access Key IDs
    - "AKIA[A-Z0-9]{16}"
    # AWS Secret Access Keys
    - "aws_secret_access_key\\s*=\\s*[A-Za-z0-9/+=]{40}"
    # Generic API key patterns
    - "api[_-]?key\\s*[:=]\\s*['\"][A-Za-z0-9]{20,}['\"]"
    # Private keys
    - "-----BEGIN (RSA |EC |DSA )?PRIVATE KEY-----"
    # Database connection strings
    - "(mongodb|postgres|mysql)://[^\\s]+"
  action: warn
  message: "Potential secret detected. Review the output and ensure secrets are not committed to version control."
```

### Recipe 3: Test-Before-Commit Enforcer

Ensures tests pass before any git commit is allowed.

```yaml
- name: "test-before-commit"
  tool: bash
  pattern: "git commit"
  prerequisite:
    command: "npm test"
    must_exit: 0
  action: block_unless_prerequisite_passed
  message: "All tests must pass before committing. Run 'npm test' and fix any failures first."
```

### Recipe 4: Production Branch Protector

Prevents direct commits to main/production branches.

```yaml
- name: "protect-main-branch"
  tool: bash
  pattern: "git push origin main"
  action: block
  message: "Direct push to main is blocked. Create a pull request instead."

- name: "protect-production-branch"
  tool: bash
  pattern: "git push origin production"
  action: block
  message: "Direct push to production is blocked. Use the release workflow."
```

### Recipe 5: Dependency Audit

Warns when new dependencies are added without review.

```yaml
- name: "audit-new-dependencies"
  tool: bash
  pattern: "npm install"
  action: warn
  message: "Installing a new dependency. Verify the package is trusted and necessary before proceeding."
```

---

## Decision Framework: Hooks vs Prompts

| Criterion | Use a Hook | Use a Prompt |
|-----------|-----------|-------------|
| Violation causes real damage | Yes | No |
| Rule must be enforced 100% of the time | Yes | No |
| Rule is a preference or guideline | No | Yes |
| Rule involves security or compliance | Yes | No |
| Rule involves style or convention | No | Yes |

### Examples

| Rule | Enforcement | Reason |
|------|------------|--------|
| Never delete the src/ directory | Hook | Causes irreversible damage |
| Never commit API keys | Hook | Security requirement, 100% enforcement |
| Tests must pass before deploy | Hook | Broken deploys cause real damage |
| Use camelCase for variables | Prompt | Style preference, no real damage if violated |
| Add JSDoc comments to functions | Prompt | Quality preference, not a hard requirement |
| Limit functions to 20 lines | Prompt | Guideline, sometimes reasonable to exceed |
