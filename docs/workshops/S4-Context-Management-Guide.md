# Context Window Management Guide — Workshop 4 Reference

**Workshop**: 4 of 8
**Topic**: Understanding and managing the context window in Claude Code

---

## What Are Tokens?

Tokens are the units Claude uses to process text. Roughly:
- 1 token is about 4 characters or 0.75 words in English
- A line of code is typically 10-30 tokens
- A 100-line file is roughly 1,000-2,000 tokens

You do not need to count tokens manually. Claude Code tracks this for you.

---

## The 200K Token Budget

Claude Code has a **200,000 token context window**. This is the total amount of information Claude can hold in memory during a single session. Everything shares this budget:

| What Consumes Tokens | Approximate Cost |
|----------------------|-----------------|
| Your CLAUDE.md file | 200-1,000 tokens (depending on length) |
| MCP tool definitions | 500-2,000 tokens per MCP server |
| Conversation history | Grows with every message and response |
| Files Claude reads | Varies by file size |
| Claude's own responses | Varies by response length |

### The Key Insight

Your CLAUDE.md, MCP tools, and system context consume tokens **before you even type your first message**. A large CLAUDE.md with many MCP servers connected can use 5,000-10,000 tokens before the conversation starts.

---

## Checking Your Context Usage

Use the `/context` command to see how much of your budget is consumed:

```
/context
```

This shows:
- Total tokens used so far
- Approximate percentage of the 200K budget
- Breakdown by category (system, conversation, tools)

**Rule of thumb:** Stay under **100K tokens** for best results. Once you exceed 100K, Claude's ability to recall details from earlier in the conversation starts to degrade.

---

## The `/compact` Command

When your context is getting full, use `/compact` to compress your conversation history:

```
/compact
```

What `/compact` does:
- Summarizes the conversation so far into a condensed form
- Preserves key decisions, file changes, and important context
- Frees up token budget for new work

**When to use `/compact`:**
- After completing a major task (e.g., finishing a component refactor)
- When you notice Claude forgetting earlier instructions
- When `/context` shows you are above 80K tokens
- Before starting a new, unrelated task in the same session

**When NOT to use `/compact`:**
- In the middle of a multi-step operation (Claude may lose the thread)
- When you need Claude to reference specific earlier conversation details

---

## Tips for Staying Lean

### 1. Keep CLAUDE.md Focused
A CLAUDE.md of 50-100 lines is ideal. Do not dump your entire project history into it. Focus on rules and conventions that actively guide Claude's behavior.

### 2. Be Selective with MCP Servers
Only connect the MCP servers you need for the current task. Each connected server adds tool definitions to your context. You can enable and disable them as needed.

### 3. Start Fresh When Appropriate
If you are switching to a completely different task, consider starting a new Claude Code session rather than continuing a long one. A fresh session gives you the full 200K budget.

### 4. Use Specific Prompts
Vague prompts like "look at my project" cause Claude to read many files, consuming tokens. Specific prompts like "read src/components/TaskList.jsx and add a filter dropdown" are more efficient.

### 5. Use the Handoff/Pickup Pattern
Rather than keeping an impossibly long session alive, use `/handoff` to save state and `/pickup` in a fresh session. This gives you full context budget with no information loss.

---

## Context Budget Mental Model

Think of your context window like a desk:

- **CLAUDE.md** is a reference binder that is always open on your desk
- **MCP tools** are like specialized instruments that take up desk space even when not in use
- **Conversation** is the stack of notes that grows as you work
- **`/compact`** is like summarizing your notes onto a single page and clearing the stack

The desk can only hold so much. Keep it organized, and you will work more effectively.

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `/context` | Check current token usage |
| `/compact` | Compress conversation history |
| Alt+P | Switch models (Haiku uses fewer tokens for responses) |

| Threshold | Action |
|-----------|--------|
| Under 50K | Working comfortably — no action needed |
| 50K-80K | Normal for a productive session — monitor |
| 80K-100K | Consider using `/compact` or starting a new task |
| Over 100K | Use `/compact` now, or start a fresh session |
