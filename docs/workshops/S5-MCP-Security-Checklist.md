# MCP Security Quick Reference

A student-facing quick reference for evaluating MCP (Model Context Protocol) servers before installing them. Use this checklist every time you consider adding a new MCP server.

---

## The 4-Question Checklist

Run through these four questions before installing any MCP server. It takes 60 seconds.

### 1. Who published it?

| Publisher type | Trust level | Action |
|---------------|-------------|--------|
| Anthropic / official vendor (GitHub, Vercel, etc.) | High | Install with confidence |
| Named developer with public track record | Medium | Review the source code briefly |
| Anonymous or brand-new account | Low | Do not install without thorough review |

### 2. What permissions does it need?

| Permission | Risk level | Example |
|------------|-----------|---------|
| Read-only network access | Low | Weather API, read-only data feeds |
| Read-write network access | Medium | GitHub (create issues, merge PRs) |
| File system read access | Medium | Documentation indexer |
| File system write access | High | Code generators, file managers |
| Shell command execution | Very High | Build tools, deployment scripts |
| Credential access | High | Any server that reads API tokens |

Ask: does the server need all the permissions it requests? A weather MCP should not need file system write access.

### 3. Is the source code available?

| Availability | Action |
|-------------|--------|
| Open source, actively maintained (commits within 3 months) | Good to proceed |
| Open source, inactive (6+ months without commits) | Proceed with caution — may have unpatched vulnerabilities |
| Closed source from a trusted vendor | Acceptable if you already trust the vendor |
| Closed source from unknown source | Do not install |

### 4. What data does it access?

| Access pattern | Risk level | Example |
|---------------|-----------|---------|
| Read-only, public data | Low | Weather data, public repo info |
| Read-only, private data | Medium | Private repo contents, personal calendar |
| Read-write, any data | High | Can create, modify, or delete resources |
| Transmits data to third parties | Very High | Sends your data somewhere beyond the integration target |

---

## Decision Flowchart

Follow this path to decide whether to install an MCP server:

```
START: You found an MCP server you want to install
  |
  v
Do you trust the publisher?
  |
  +-- NO --> Is the source code open and inspectable?
  |            |
  |            +-- NO --> STOP. Do not install.
  |            |
  |            +-- YES --> Have you reviewed the code?
  |                         |
  |                         +-- NO --> Review it first, then continue.
  |                         +-- YES --> Continue below.
  |
  +-- YES --> Continue below.
  |
  v
Are the permissions proportional to the functionality?
  |
  +-- NO --> STOP. A weather tool should not need shell access.
  |
  +-- YES --> Continue below.
  |
  v
Is it read-only or read-write?
  |
  +-- Read-only --> INSTALL. Low risk.
  |
  +-- Read-write --> Can you limit the scope?
                      |
                      +-- YES --> Limit scope, then INSTALL.
                      |
                      +-- NO --> INSTALL WITH CAUTION. Monitor behavior.
```

---

## Common Red Flags

Stop and reconsider if you see any of these:

- The server requires root or admin-level system access
- The README does not explain what data the server accesses
- The server sends data to domains unrelated to its stated purpose
- The repository has disabled issues or hidden its commit history
- The server asks for write permissions when read-only would suffice
- Installation instructions tell you to disable security features
- The server bundles compiled binaries without corresponding source code
- The npm package has very few downloads and no community validation

---

## Inspecting Your MCP Servers

Use the `/mcp` command in Claude Code at any time:

```
/mcp
```

This shows:
- All installed MCP servers and their connection status
- The tools each server provides
- Whether the server is project-scoped (`.mcp.json`) or user-scoped (`~/.claude.json`)

---

## Credential Safety

When an MCP server needs API keys or tokens:

- Use environment variable expansion in `.mcp.json`: `"API_KEY": "${WEATHER_API_KEY}"`
- Store actual values in `.env` (which is in `.gitignore`)
- Use the narrowest possible token scope
- Never hardcode secrets directly in configuration files
- Never commit `.env` files to version control

---

## Quick Reference Card

```
Before installing any MCP server, ask:

  1. WHO published it?      (Official > Known dev > Unknown)
  2. WHAT permissions?       (Read-only > Read-write > Shell)
  3. SOURCE available?       (Open > Closed-trusted > Closed-unknown)
  4. WHAT data accessed?     (Public > Private > Read-write)

  All positive  --> Install
  One negative  --> Proceed with caution, limit scope
  Two+ negative --> Do not install
```

For the full checklist with periodic review guidance, see `docs/reference/mcp-security-checklist.md`.
