# Structured Output and Prompting Reference

A reference for using structured output, few-shot prompting, and error response patterns with Claude. These techniques are essential for building reliable AI-powered features.

---

## What Is Structured Output?

Structured output means getting Claude to return data in a guaranteed schema-compliant format, rather than asking for free text and parsing it yourself.

**The problem with free text:**
- Claude might return JSON wrapped in markdown code fences
- Field names might change between calls ("due_date" vs "dueDate" vs "deadline")
- Optional fields might be missing or have inconsistent null representations
- JSON syntax errors can occur, especially with nested structures

**The solution:** Define a tool with an `input_schema` and use `tool_use` to guarantee the output matches your schema exactly.

---

## The tool_use Approach

Instead of asking Claude "Parse this task and return JSON," you define an extraction tool and let Claude call it. The tool parameters become your structured output.

### Step 1: Define the Tool

```json
{
  "name": "extract_task",
  "description": "Extracts structured task data from natural language input. Call this tool with the parsed fields whenever the user provides a task description.",
  "input_schema": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "The task title, stripped of date keywords, priority markers, and category hashtags"
      },
      "dueDate": {
        "type": ["string", "null"],
        "description": "ISO 8601 date string (YYYY-MM-DD) if a date or relative date is mentioned, null otherwise"
      },
      "priority": {
        "type": "string",
        "enum": ["low", "medium", "high"],
        "description": "Task priority. 'high' for urgent/important/critical. 'low' for low priority/not urgent. 'medium' for everything else."
      },
      "category": {
        "type": ["string", "null"],
        "description": "Category extracted from #hashtag in input, null if no hashtag present"
      }
    },
    "required": ["title", "priority"]
  }
}
```

### Step 2: Send the Request

```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 1024,
  "tools": [/* your tool definition above */],
  "tool_choice": {"type": "tool", "name": "extract_task"},
  "messages": [
    {
      "role": "user",
      "content": "Parse this task: Buy groceries tomorrow #shopping"
    }
  ]
}
```

### Step 3: Receive Guaranteed Output

The response will always contain a `tool_use` content block with parameters matching your schema:

```json
{
  "type": "tool_use",
  "name": "extract_task",
  "input": {
    "title": "Buy groceries",
    "dueDate": "2026-03-25",
    "priority": "medium",
    "category": "shopping"
  }
}
```

No parsing required. No JSON syntax errors. No unexpected fields.

---

## tool_choice Options

The `tool_choice` parameter controls whether and how Claude uses your tools.

### "auto" (default)

```json
"tool_choice": {"type": "auto"}
```

Claude decides whether to call a tool or respond with text. Use this when extraction is optional — for example, if the user might send a task description or might just be asking a question.

**When to use:** Conversational interfaces where tool use is one of several possible responses.

### "any"

```json
"tool_choice": {"type": "any"}
```

Claude must call a tool, but can choose which one from the available tools. Use this when you have multiple extraction tools and want Claude to pick the right one based on the input.

**When to use:** Multiple tool types available (e.g., `extract_task`, `extract_event`, `extract_contact`).

### Forced Selection

```json
"tool_choice": {"type": "tool", "name": "extract_task"}
```

Claude must call this specific tool. The output is guaranteed to match the tool's schema. This is the most reliable option for data extraction.

**When to use:** You always need structured output in a specific format. This is the standard choice for parsing, extraction, and data transformation pipelines.

### Comparison

| Option | Claude can return text? | Claude chooses tool? | Reliability |
|--------|------------------------|---------------------|-------------|
| `auto` | Yes | Yes | Lowest — may skip the tool |
| `any` | No | Yes | Medium — always calls a tool, but may pick wrong one |
| Forced | No | No | Highest — always calls the exact tool you specify |

---

## Few-Shot Prompting

Few-shot prompting means including 2-3 example inputs with their expected outputs directly in the prompt. Instead of describing the rules in prose, you show Claude the pattern.

### Why Few-Shot Works

1. **Shows rather than tells.** "The title should not include date or priority keywords" is ambiguous. An example showing `"Buy groceries tomorrow"` becoming `"Buy groceries"` is unambiguous.

2. **Enables generalization.** Claude learns the pattern from examples and applies it to novel inputs. You do not need to cover every possible case.

3. **Reduces instruction length.** A few examples often replace paragraphs of rules. Shorter prompts leave more room in the context window.

4. **Improves consistency.** The same input produces the same output structure reliably.

### Example: Task Parsing with Few-Shot

```
Parse the following task into structured data.

Examples:

Input: "Buy groceries tomorrow #shopping"
Output: {"title": "Buy groceries", "dueDate": "2026-03-25", "priority": "medium", "category": "shopping"}

Input: "URGENT: Fix the login bug by Friday"
Output: {"title": "Fix the login bug", "dueDate": "2026-03-28", "priority": "high", "category": null}

Input: "Read chapter 5 low priority"
Output: {"title": "Read chapter 5", "dueDate": null, "priority": "low", "category": null}

Now parse this task:
"Schedule vet appointment next Tuesday #pets high priority"
```

### Best Practices for Few-Shot Examples

1. **Use 2-3 examples.** More than 5 rarely improves results and wastes context tokens.

2. **Cover edge cases.** Include at least one example with missing fields (null values), one with all fields present, and one with tricky formatting.

3. **Be consistent.** All examples should follow the exact same output format. If one example uses `"dueDate": null` and another omits the field entirely, Claude will be inconsistent too.

4. **Order matters slightly.** Put the most representative example first and the edge case last.

5. **Match your actual data.** Use realistic examples that resemble real user input, not sanitized toy examples.

### When to Add More Examples

| Symptom | Fix |
|---------|-----|
| Inconsistent field names | Add an example that clearly shows the expected field names |
| Wrong priority mapping | Add an example with explicit priority keywords |
| Dates not resolving | Add an example with relative dates ("tomorrow", "next Friday") |
| Hashtags not extracted | Add an example with a #hashtag |
| Titles include noise words | Add an example showing noise words stripped from the title |

---

## Combining Structured Output with Few-Shot

The most reliable approach combines both techniques:

1. **Few-shot examples** in the prompt teach Claude the extraction pattern
2. **tool_use with forced selection** guarantees the output schema

```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 1024,
  "tools": [/* extract_task tool definition */],
  "tool_choice": {"type": "tool", "name": "extract_task"},
  "messages": [
    {
      "role": "user",
      "content": "Parse tasks into structured data.\n\nExamples:\nInput: \"Buy groceries tomorrow #shopping\"\nExpected: title=\"Buy groceries\", dueDate=\"2026-03-25\", priority=\"medium\", category=\"shopping\"\n\nInput: \"URGENT: Fix the login bug by Friday\"\nExpected: title=\"Fix the login bug\", dueDate=\"2026-03-28\", priority=\"high\", category=null\n\nNow parse: \"Email boss about budget review by Wednesday urgent #work\""
    }
  ]
}
```

This gives you both **pattern accuracy** (from few-shot) and **format reliability** (from tool_use).

---

## Structured Error Responses

When building MCP tools, errors need structure too. A generic "Operation failed" message prevents the agent from making good recovery decisions.

### The isError Pattern

```json
{
  "content": [
    {
      "type": "text",
      "text": "Weather API request timed out after 5000ms for city: San Francisco"
    }
  ],
  "isError": true
}
```

The `isError` flag tells the agent this is a failure response, not a successful result that happens to contain the word "error."

### Error Categories

| Category | Description | isRetryable | Example |
|----------|-------------|-------------|---------|
| `transient` | Temporary failure, may succeed on retry | `true` | Timeout, 503 Service Unavailable, rate limit |
| `validation` | Invalid input, will fail again with same input | `false` | Malformed city name, invalid date format |
| `business` | Request is valid but violates a policy | `false` | Task deletion blocked by retention policy |
| `permission` | Credentials lack required scope | `false` | GitHub token missing `repo` scope |

### Complete Structured Error Response

```json
{
  "content": [
    {
      "type": "text",
      "text": "GitHub API rate limit exceeded. Resets at 2026-03-24T15:30:00Z. Authenticated requests get 5000/hour; current usage: 5000/5000."
    }
  ],
  "isError": true,
  "errorCategory": "transient",
  "isRetryable": true,
  "retryAfterMs": 180000
}
```

### Why Structure Matters

| Error type | Agent response with generic error | Agent response with structured error |
|-----------|----------------------------------|-------------------------------------|
| Timeout | Might retry immediately (wasting tokens) or give up | Waits and retries after delay |
| Invalid input | Might retry with same input (guaranteed to fail again) | Reports the validation error to user |
| Rate limit | No idea when to retry | Waits until reset time, then retries |
| Missing permission | Might retry indefinitely | Tells user to update token scope |

---

## Quick Reference

```
STRUCTURED OUTPUT
  1. Define a tool with input_schema
  2. Use tool_choice: forced for reliable extraction
  3. Read output from tool_use content block

FEW-SHOT PROMPTING
  1. Include 2-3 example input/output pairs
  2. Cover edge cases (null fields, tricky formatting)
  3. Keep examples consistent in format

COMBINING BOTH
  1. Few-shot examples in the user message
  2. Forced tool_choice for schema guarantee
  3. Best accuracy + best reliability

ERROR RESPONSES
  1. Set isError: true for failures
  2. Include errorCategory (transient/validation/business/permission)
  3. Set isRetryable based on category
  4. Include descriptive error message with context
```
