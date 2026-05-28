# Workshop 7 Reference: Skills

**Purpose:** Quick reference for skills vs commands, SKILL.md structure, trigger words, invocation methods, configuration options, and where to find community skills.

---

## Skills vs Commands Comparison

| Aspect | Command | Skill |
|--------|---------|-------|
| **Analogy** | Recipe card | Cookbook |
| **File structure** | Single `.md` file | Multi-file package with directory |
| **Location** | `.claude/commands/` | `.claude/skills/` |
| **Entry point** | The `.md` file itself | `SKILL.md` |
| **Can include scripts** | No | Yes |
| **Can include references** | No | Yes (templates, examples, schemas) |
| **Can include assets** | No | Yes (config files, sample data) |
| **Invocation** | `/command-name` | Trigger words or `/skill-name` |
| **Scope** | Project (`.claude/`) or User (`~/.claude/`) | Project (`.claude/`) or User (`~/.claude/`) |
| **Isolation** | Runs in main context | Can run in forked context |
| **Tool restrictions** | No | Yes, via `allowed-tools` |
| **Complexity** | Simple, single-purpose | Complex, multi-step workflows |
| **Sharing** | Copy the file | Installable package |

### When to Use Each

| Scenario | Use |
|----------|-----|
| Quick one-step action (review this PR, plan this feature) | Command |
| Multi-step workflow with templates and scripts | Skill |
| Project-specific convention you enforce | Command |
| Reusable expertise you share across projects | Skill |
| Simple prompt template with variables | Command |
| Complex process with validation and output formatting | Skill |

---

## SKILL.md Structure

The `SKILL.md` file is the entry point for every skill. It contains metadata and instructions.

### Required Fields

```markdown
# Skill Name

## Description
A clear, one-paragraph description of what this skill does.

## Trigger Words
- "generate docs"
- "document this project"
- "create documentation"

## Instructions
Step-by-step instructions that Claude follows when this skill is invoked.

1. Read the project structure
2. Identify all public APIs
3. Generate documentation for each API
4. Format output using the template in references/template.md
5. Save output to the specified location
```

### Optional Fields

```markdown
## Configuration
- context: fork
- allowed-tools: [Read, Glob, Grep]

## References
- references/template.md — Output template
- references/examples/ — Example outputs for reference

## Scripts
- scripts/generate.sh — Post-processing script

## Assets
- assets/schema.json — Output validation schema
```

### Complete Example

```markdown
# Documentation Generator

## Description
Generates comprehensive project documentation by analyzing source code,
README files, and configuration. Produces a structured overview with
component descriptions, API references, and architecture diagrams in text.

## Trigger Words
- "generate docs"
- "document this project"
- "create project documentation"
- "write API docs"

## Configuration
- context: fork
- allowed-tools: [Read, Glob, Grep, Write]

## Instructions

### Phase 1: Discovery
1. Read the project's CLAUDE.md, README.md, and package.json
2. Use Glob to find all source files matching src/**/*.{ts,tsx,js,jsx}
3. Use Grep to find all exported functions and components

### Phase 2: Analysis
4. For each exported function/component, read the file and extract:
   - Function name and signature
   - JSDoc comments if present
   - Parameters and return types
   - Dependencies and imports
5. Categorize findings into: Components, Services, Utilities, Hooks

### Phase 3: Generation
6. Use the template at references/template.md for formatting
7. Generate one section per category
8. Include code examples for key functions
9. Add a table of contents at the top

### Phase 4: Output
10. Save the documentation to docs/project-documentation.md
11. Report a summary of what was documented

## References
- references/template.md — Documentation output template
- references/examples/sample-docs.md — Example of expected output

## Scripts
- scripts/validate-links.sh — Validates that all internal links resolve
```

---

## Trigger Words and Invocation Methods

### Trigger Words

Trigger words are phrases that automatically activate a skill when spoken in conversation. They are defined in the `SKILL.md` file.

```markdown
## Trigger Words
- "generate docs"
- "document this project"
- "create documentation"
```

When you say "generate docs for LifeOps," Claude recognizes the trigger phrase and activates the skill.

### Direct Invocation

Skills can also be invoked directly by name, similar to commands:

```
/doc-generator
```

### Programmatic Invocation

In an agentic loop, skills can be invoked as tools:

```javascript
const result = await invokeSkill("doc-generator", {
  projectPath: "./src",
  outputPath: "./docs/api.md"
});
```

---

## Configuration Options

### context: fork

Runs the skill in an isolated sub-agent with its own context window.

**Why use it:**
- Prevents skill output from polluting your main conversation
- Large skills that read many files do not consume your main context budget
- Skill failures do not corrupt your main session state

**When to use it:**
- Skills that read many files (documentation generators, code auditors)
- Skills that produce verbose output
- Skills where failure should not affect the main session

**When NOT to use it:**
- Skills that need to interact with your current conversation context
- Simple skills that produce minimal output
- Skills where you want to iteratively refine the output

```markdown
## Configuration
- context: fork
```

### allowed-tools

Restricts which tools the skill can access during execution.

**Why use it:**
- Prevents skills from executing dangerous commands
- Limits a documentation skill to read-only operations
- Enforces the principle of least privilege

**Common configurations:**

```markdown
# Read-only skill (documentation, analysis)
- allowed-tools: [Read, Glob, Grep]

# Read-write skill (generators, formatters)
- allowed-tools: [Read, Glob, Grep, Write]

# Full access skill (build tools, deployment)
- allowed-tools: [Read, Glob, Grep, Write, Bash]
```

---

## Directory Structure

### Project-Level Skills

```
.claude/
  skills/
    doc-generator/
      SKILL.md                  # Entry point
      scripts/
        validate-links.sh       # Post-processing script
      references/
        template.md             # Output template
        examples/
          sample-docs.md        # Example output
      assets/
        schema.json             # Validation schema
    code-reviewer/
      SKILL.md
      references/
        checklist.md            # Review checklist
        severity-guide.md       # Issue severity definitions
    test-generator/
      SKILL.md
      scripts/
        run-coverage.sh         # Coverage analysis script
      references/
        patterns.md             # Common test patterns
```

### User-Level Skills

```
~/.claude/
  skills/
    my-review-skill/
      SKILL.md
    my-deploy-skill/
      SKILL.md
```

User-level skills are available across all projects. Project-level skills are specific to one repository.

---

## Where to Find Community Skills

### Sources

1. **Claude Code Skills Registry** — The official registry of community-contributed skills. Over 20,000 skills available.
2. **GitHub** — Search for repositories tagged with `claude-code-skill` or containing `SKILL.md` files.
3. **Team sharing** — Skills can be shared by copying the skill directory or publishing to a shared repository.

### Installing a Community Skill

```bash
# Install from the skills registry
claude skill install <skill-name>

# Install from a GitHub repository
claude skill install github:<owner>/<repo>/<skill-path>

# Install from a local directory
claude skill install /path/to/skill/directory
```

### Evaluating a Skill Before Installing

Before installing a community skill, check:

1. **Who published it?** — Is the author reputable?
2. **What tools does it use?** — Check the `allowed-tools` in SKILL.md
3. **Does it use `context: fork`?** — Isolated execution is safer
4. **What files does it read/write?** — Review the instructions for file access patterns
5. **Is the source code available?** — Review scripts and references before installing

### Managing Installed Skills

```bash
# List installed skills
claude skill list

# Show skill details
claude skill info <skill-name>

# Remove a skill
claude skill remove <skill-name>

# Update a skill
claude skill update <skill-name>
```
