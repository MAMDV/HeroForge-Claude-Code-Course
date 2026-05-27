# Session 7 Reference: Claude Agent SDK

**Purpose:** Quick reference for the agentic loop lifecycle, stop_reason values, AgentDefinition structure, PostToolUse hooks, and anti-patterns.

---

## The Agentic Loop Lifecycle

```
                    +------------------+
                    |   Send Request   |
                    | (prompt + tools) |
                    +--------+---------+
                             |
                             v
                    +------------------+
                    | Claude Responds  |
                    | with stop_reason |
                    +--------+---------+
                             |
                  +----------+----------+
                  |                     |
                  v                     v
         +---------------+    +------------------+
         | stop_reason:  |    | stop_reason:     |
         | "end_turn"    |    | "tool_use"       |
         +-------+-------+    +--------+---------+
                 |                      |
                 v                      v
         +---------------+    +------------------+
         | Task Complete  |    | Execute Tool     |
         | Extract text   |    | Locally          |
         +---------------+    +--------+---------+
                                       |
                                       v
                              +------------------+
                              | Append tool_     |
                              | result to        |
                              | conversation     |
                              +--------+---------+
                                       |
                                       +-----> (Back to Send Request)
```

---

## stop_reason Values

| Value | Meaning | Action |
|-------|---------|--------|
| `"end_turn"` | Claude is finished with the task | Break out of the loop. Extract the final text from `response.content`. |
| `"tool_use"` | Claude wants to call a tool | Find the `tool_use` block in `response.content`. Execute the tool locally. Append the assistant message and tool result to conversation history. Loop again. |
| `"max_tokens"` | Response was truncated due to length | The response is incomplete. You may need to continue the conversation or increase `max_tokens`. |
| `"stop_sequence"` | A custom stop sequence was hit | Handle based on your application logic. Rarely used in agentic loops. |

---

## Agentic Loop Code Structure

```javascript
// 1. Initialize conversation with the user's task
const conversationHistory = [
  { role: "user", content: "Your task description here" }
];

// 2. Define the tools the agent can use
const tools = [
  {
    name: "get_tasks",
    description: "Retrieve all tasks from the LifeOps database",
    input_schema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["active", "completed", "overdue"],
          description: "Filter tasks by status"
        }
      }
    }
  },
  {
    name: "update_task",
    description: "Update a task's status or properties",
    input_schema: {
      type: "object",
      properties: {
        taskId: { type: "string", description: "The task ID to update" },
        status: { type: "string", description: "New status value" }
      },
      required: ["taskId", "status"]
    }
  }
];

// 3. The agentic loop
while (true) {
  const response = await claude.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: conversationHistory,
    tools: tools
  });

  // 4. Check stop_reason — this is the ONLY control flow you need
  if (response.stop_reason === "end_turn") {
    // Claude is done — extract final text
    const finalText = response.content
      .filter(block => block.type === "text")
      .map(block => block.text)
      .join("\n");
    console.log("Result:", finalText);
    break;
  }

  if (response.stop_reason === "tool_use") {
    // Claude wants to call a tool
    const toolCall = response.content.find(c => c.type === "tool_use");

    // Execute the tool locally
    const result = await executeLocalTool(toolCall.name, toolCall.input);

    // Append assistant message and tool result to history
    conversationHistory.push({
      role: "assistant",
      content: response.content
    });
    conversationHistory.push({
      role: "user",
      content: [{
        type: "tool_result",
        tool_use_id: toolCall.id,
        content: JSON.stringify(result)
      }]
    });
  }
}
```

---

## AgentDefinition Structure

An `AgentDefinition` configures a reusable agent with specific tools, instructions, and constraints.

```javascript
const agentDefinition = {
  // The model to use
  model: "claude-sonnet-4-6",

  // System prompt — sets the agent's role and constraints
  system: "You are a LifeOps task manager. You can read and update tasks but never delete them.",

  // Tools available to this agent
  tools: [
    { name: "get_tasks", /* ... */ },
    { name: "update_task", /* ... */ }
  ],

  // Maximum tokens per response
  maxTokens: 4096,

  // Optional: hooks for intercepting tool calls and results
  hooks: {
    postToolUse: normalizeToolResult,
    preToolUse: validateToolCall
  }
};
```

---

## PostToolUse Hook Pattern

PostToolUse hooks intercept tool results before the model processes them.

### Use Cases
- **Data normalization** — convert timestamps, standardize formats
- **Filtering** — remove sensitive data from tool output
- **Enrichment** — add computed fields to tool results
- **Validation** — verify tool output meets expected schema

### Pattern

```javascript
function postToolUse(toolName, toolInput, toolResult) {
  // Normalize dates from Unix timestamps to ISO 8601
  if (toolName === "get_tasks") {
    return {
      ...toolResult,
      tasks: toolResult.tasks.map(task => ({
        ...task,
        dueDate: new Date(task.dueDate * 1000).toISOString(),
        createdAt: new Date(task.createdAt * 1000).toISOString()
      }))
    };
  }

  // Filter sensitive fields from user data
  if (toolName === "get_user_profile") {
    const { ssn, creditCard, ...safeData } = toolResult;
    return safeData;
  }

  // Pass through unchanged for other tools
  return toolResult;
}
```

### Compliance Hook Example

```javascript
function preToolUse(toolName, toolInput) {
  // Block deletion of archived tasks
  if (toolName === "delete_task") {
    const task = getTaskById(toolInput.taskId);
    if (task.status === "archived") {
      return {
        blocked: true,
        reason: "Cannot delete archived tasks. Unarchive first."
      };
    }
  }

  // Allow all other tool calls
  return { blocked: false };
}
```

---

## Anti-patterns to Avoid

### 1. Parsing Natural Language for Loop Termination

```javascript
// WRONG — fragile and unreliable
while (true) {
  const response = await getResponse();
  if (response.content.includes("I'm done") ||
      response.content.includes("Task complete")) {
    break;  // This will miss many valid completions
  }
}

// CORRECT — structured and deterministic
while (true) {
  const response = await getResponse();
  if (response.stop_reason === "end_turn") {
    break;  // Always works, regardless of response text
  }
}
```

### 2. Arbitrary Iteration Caps

```javascript
// WRONG — truncates tasks that need more tool calls
for (let i = 0; i < 10; i++) {
  const response = await getResponse();
  if (response.stop_reason === "end_turn") break;
  // If the task needs 12 tool calls, iterations 11 and 12 are lost
}

// CORRECT — let Claude decide when it is done
while (true) {
  const response = await getResponse();
  if (response.stop_reason === "end_turn") break;
  // Process tool call and continue
}
```

### 3. Checking Assistant Text for Completion Indicators

```javascript
// WRONG — prompt-dependent and unreliable
const lastText = response.content.find(c => c.type === "text");
if (lastText && lastText.text.startsWith("Summary:")) {
  // Assumes Claude always starts final answer with "Summary:"
  break;
}

// CORRECT — use the structured stop_reason field
if (response.stop_reason === "end_turn") {
  break;
}
```

### Summary Rule
> Trust `stop_reason`, not text analysis. The `stop_reason` field exists precisely to signal completion in a structured, deterministic way.
