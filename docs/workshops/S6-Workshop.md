# HeroForge.AI Course: Mastering Claude Code
## Workshop 6: Cloud Tasks and Mobile Control

**Estimated Time:** 45-60 minutes
**Difficulty:** Intermediate
**Prerequisites:** Completed Workshops 1-5 (LifeOps app with components, context, routing, and weather widget)

---

## Workshop Objectives

By completing this workshop, you will:
- [ ] Set up Vitest and React Testing Library for the LifeOps project
- [ ] Write component tests for ContactList, TaskList, NoteList, and StatCard
- [ ] Write service tests for taskParser and SmartTaskInput
- [ ] Test AppContext and the useLocalStorage hook
- [ ] Configure a pre-commit validation hook that blocks commits when tests fail
- [ ] Add an accent color picker with six WCAG AA-compliant presets
- [ ] Use Playwright MCP for visual verification of UI changes
- [ ] Practice test-driven iteration and the interview pattern
- [ ] Handle Claude's errors with retry-and-error-feedback
- [ ] Test the WeatherWidget with mocked API calls
- [ ] Execute a cloud task using the --remote flag
- [ ] Create a GitHub issue from mobile and have Claude implement it
- [ ] Steer a Claude Code session from a mobile device using Remote Control

---

## Prerequisites Check

### Environment Verification

Before starting, verify your environment is ready:

```bash
# Check Node.js version (should be v20+)
node --version

# Check that dependencies are installed
npm list vitest
npm list @testing-library/react

# If missing, install them:
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/coverage-v8
```

### Project Structure Check

Ensure your LifeOps project has these files from previous sessions:

```
src/
  components/
    ContactList.jsx
    TaskList.jsx
    NoteList.jsx
    StatCard.jsx
    SmartTaskInput.jsx
    WeatherWidget.jsx
  services/
    taskParser.js
  context/
    AppContext.jsx
  hooks/
    useLocalStorage.js
```

---

## Exercise 1: Test Infrastructure Setup (10 minutes)

### 1.1 Create the Test Setup File

Create a test setup file that runs before every test:

**Prompt to use with Claude Code:**
```
claude "Create a test setup file at src/test/setup.js that:
1. Imports cleanup from @testing-library/react
2. Imports afterEach and vi from vitest
3. Spies on console.error to suppress noisy warnings
4. Runs cleanup after each test"
```

**Expected result:** A file at `src/test/setup.js` with cleanup and console spy.

### 1.2 Configure Vitest

Verify your `vitest.config.js` includes the setup file:

**Prompt:**
```
claude "Check that vitest.config.js has environment set to jsdom and
setupFiles pointing to src/test/setup.js. Update it if needed."
```

### 1.3 Verify the Setup

Run the test suite to make sure the infrastructure works:

```bash
npx vitest run
```

**Checkpoint:** The command should run without errors (even if there are no tests yet).

---

## Exercise 2: Component Tests (15 minutes)

### 2.1 ContactList Tests

Write tests for the ContactList component:

**Prompt:**
```
claude "Write Vitest tests for the ContactList component. Test that:
1. Contact names render when given an array of contacts
2. Email addresses render for each contact
3. An empty state message shows when the contacts array is empty
Save to src/test/ContactList.test.jsx"
```

**What to verify:**
- [ ] Test file created at `src/test/ContactList.test.jsx`
- [ ] All three test cases pass
- [ ] Tests use `render` and `screen` from Testing Library

### 2.2 TaskList Tests

**Prompt:**
```
claude "Write Vitest tests for the TaskList component. Test that:
1. Task titles render in the list
2. Completed tasks have a visual indicator
3. Empty state works when no tasks are provided
Save to src/test/TaskList.test.jsx"
```

### 2.3 NoteList Tests

**Prompt:**
```
claude "Write Vitest tests for the NoteList component. Test that:
1. Note content renders correctly
2. Timestamps are displayed
3. Empty state message appears when there are no notes
Save to src/test/NoteList.test.jsx"
```

### 2.4 StatCard Tests

**Prompt:**
```
claude "Write Vitest tests for the StatCard component. Test that:
1. The label prop renders
2. The value prop renders
3. Different label/value combinations work correctly
Save to src/test/StatCard.test.jsx"
```

**Checkpoint:** Run `npx vitest run` — all component tests should pass.

---

## Exercise 3: Service Tests (10 minutes)

### 3.1 taskParser Tests

Write tests for the taskParser service — a pure function with no DOM dependencies:

**Prompt:**
```
claude "Write Vitest tests for the taskParser service. Test that:
1. A simple task string returns the correct title
2. Exclamation marks set high priority
3. Natural language dates are extracted
4. Tags prefixed with # are parsed
5. Empty strings return a sensible default
Save to src/test/taskParser.test.js"
```

### 3.2 SmartTaskInput Tests

Test the SmartTaskInput component, which integrates with taskParser:

**Prompt:**
```
claude "Write Vitest tests for SmartTaskInput. Test that:
1. The input field renders
2. Typing text and pressing Enter creates a task
3. The input clears after submission
4. The parsed task has the correct title
Use userEvent from @testing-library/user-event for typing simulation.
Save to src/test/SmartTaskInput.test.jsx"
```

**Checkpoint:** Run `npx vitest run` — all service and integration tests should pass.

---

## Exercise 4: Context and Hook Tests (10 minutes)

### 4.1 AppContext Tests

Test the AppContext provider and its state management:

**Prompt:**
```
claude "Write Vitest tests for AppContext. Test that:
1. The provider renders children without crashing
2. The default state values are correct
3. State updates propagate to consuming components
Wrap test components in the AppContext provider.
Save to src/test/AppContext.test.jsx"
```

### 4.2 useLocalStorage Tests

Test the custom hook for localStorage persistence:

**Prompt:**
```
claude "Write Vitest tests for useLocalStorage. Test that:
1. It returns the initial value when localStorage is empty
2. It persists values to localStorage on update
3. It reads existing values from localStorage
Use renderHook from @testing-library/react.
Save to src/test/useLocalStorage.test.js"
```

**Checkpoint:** All context and hook tests pass.

---

## Exercise 5: Accent Color Picker (10 minutes)

### 5.1 Build the Color Picker

Add an accent color picker with six WCAG AA-compliant presets:

**Prompt:**
```
claude "Create an AccentColorPicker component with six color presets:
1. Ocean Blue (#2563EB)
2. Emerald Green (#059669)
3. Amber (#D97706)
4. Rose (#E11D48)
5. Violet (#7C3AED)
6. Slate (#475569)
Each color should be a circular button. Clicking it updates the accent
color in AppContext and persists to localStorage. Show a checkmark on
the selected color. All colors must have WCAG AA contrast ratio against
white text. Save to src/components/AccentColorPicker.jsx"
```

### 5.2 Test the Color Picker

**Prompt:**
```
claude "Write Vitest tests for AccentColorPicker. Test that:
1. All six color swatches render
2. Clicking a swatch updates the selected color
3. The selected color shows a visual indicator
Save to src/test/AccentColorPicker.test.jsx"
```

**Checkpoint:** The color picker renders and tests pass.

---

## Exercise 6: WeatherWidget Tests (5 minutes)

### 6.1 Mock and Test the Widget

**Prompt:**
```
claude "Write Vitest tests for WeatherWidget that mock the fetch API.
Test that:
1. A loading state shows while data is being fetched
2. Weather data renders after a successful fetch
3. An error message shows when the API call fails
Use vi.mock to mock the global fetch function.
Save to src/test/WeatherWidget.test.jsx"
```

**Checkpoint:** WeatherWidget tests pass with mocked data.

---

## Exercise 7: Test Coverage (5 minutes)

### 7.1 Run Coverage Report

```bash
npx vitest run --coverage
```

**What to check:**
- [ ] Overall line coverage percentage
- [ ] Components with zero coverage (if any)
- [ ] Services with zero coverage (if any)

### 7.2 Identify Gaps

**Prompt:**
```
claude "Look at the test coverage report and identify any components or
services with less than 50% coverage. Suggest which tests to add."
```

---

## Exercise 8: Automating Quality with Hooks (5 minutes)

### 8.1 Configure a Pre-Commit Validation Hook

Hooks are scripts that run automatically before or after Claude Code actions. A pre-tool-use hook runs BEFORE an action and can block it. A post-tool-use hook runs AFTER an action and can warn or log.

Create a hook that runs your test suite before every commit:

**Prompt:**
```
claude "Add a pre-commit validation hook to settings.json that runs
npm test before any git commit command. If the tests fail, block
the commit."
```

The resulting `settings.json` should look like this:

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

### 8.2 Understand the Pattern Matcher

The matcher syntax follows the pattern `ToolName(argument pattern)`:
- `Bash(git commit*)` — matches any Bash call starting with `git commit`
- `Write(*.jsx)` — matches any file write to a JSX file
- `Read(*)` — matches any file read

The asterisk `*` is a wildcard that matches any characters.

### 8.3 Test the Hook

1. Intentionally break a test (change an expected value)
2. Ask Claude Code to commit your changes
3. Watch the hook block the commit because tests fail
4. Fix the test
5. Try the commit again — this time it should succeed

**What to verify:**
- [ ] Hook configuration exists in settings.json
- [ ] Commits are blocked when tests fail
- [ ] Commits succeed when all tests pass

> **Key concept:** Hooks give you deterministic guarantees. Prompt instructions have a non-zero failure rate — Claude might forget to run tests. A hook runs every time, no exceptions.

See the [Hooks Reference](S6-Hooks-Reference.md) for more details and common use cases.

---

## Exercise 9: Visual Verification with Playwright (5 minutes)

### 9.1 Take a Before Screenshot

With the Playwright MCP available, take a screenshot of your running app:

**Prompt:**
```
claude "Take a screenshot of the LifeOps app running on localhost:5173"
```

### 9.2 Make a Visual Change

Change the accent color using the color picker (or modify a CSS value directly).

### 9.3 Take an After Screenshot and Compare

**Prompt:**
```
claude "Take another screenshot of the LifeOps app and compare it
to the previous one. What visual differences do you see?"
```

**What to verify:**
- [ ] Before screenshot captured successfully
- [ ] After screenshot shows the visual change
- [ ] Claude identifies the specific differences

> **Key concept:** Unit tests verify logic. Visual tests verify appearance. When Claude changes CSS, screenshots catch layout breaks and styling issues that no unit test can detect.

See the [Visual Testing Guide](S6-Visual-Testing-Guide.md) for more details.

---

## Exercise 10: Iterative Refinement Patterns (10 minutes)

### 10.1 Test-Driven Iteration

Write a test for a feature that does not exist yet, then have Claude implement it:

**Step 1 — Write the test first:**
```
claude "Add a test to taskParser.test.js that verifies parsing a
recurring task like 'Water plants every Monday' returns
recurrence: 'weekly' and recurrenceDay: 'Monday'. Do NOT update
the taskParser implementation yet."
```

**Step 2 — Run the test and confirm it fails:**
```bash
npx vitest run src/test/taskParser.test.js
```

**Step 3 — Share the failure with Claude:**
```
claude "Here is the failing test output for recurring task parsing.
Update taskParser to make this test pass."
```

**What to verify:**
- [ ] Test was written before the implementation
- [ ] Test initially failed (as expected)
- [ ] Claude implemented the feature to match the test specification
- [ ] Test passes after implementation

### 10.2 The Interview Pattern

Before implementing a complex feature, have Claude interview you:

**Prompt:**
```
claude "I want to add a calendar view to LifeOps that shows tasks
and notes on their dates. Before you implement this, what questions
do you have?"
```

**What to observe:**
- Claude asks about scope (tasks, notes, or both?)
- Claude asks about view type (week, month, day?)
- Claude surfaces edge cases (what about tasks without dates? recurring tasks?)
- Claude asks about design decisions (drag-and-drop? color coding?)

> **Key concept:** The interview pattern surfaces design decisions and edge cases BEFORE code is written. "Use the interview pattern" is much more actionable than "think about edge cases."

You do not need to actually implement the calendar view. The exercise is about the pattern itself.

---

## Exercise 11: Handling Failed Output (5 minutes)

### 11.1 Practice Retry with Error Feedback

If any of your tests failed during earlier exercises, practice the retry-with-error-feedback pattern:

**Bad retry (do not do this):**
```
claude "That didn't work. Try again."
```

**Good retry (do this):**
```
claude "The test failed because ContactCard received undefined for
the email prop. The error is on line 23 where you destructure
props — you used 'mail' instead of 'email'. Fix the prop name."
```

### 11.2 Understand When Retries Work

| Situation | Retry works? | Why |
|-----------|-------------|-----|
| Wrong import path | Yes | Format mismatch — easy to correct |
| Missing required prop | Yes | Structural error — clear fix |
| Ambiguous requirements | Yes | Provide clarification with the retry |
| Information not available | No | Claude cannot guess missing data |
| Task exceeds capabilities | No | Different approach needed |

> **Key concept:** The more specific your error feedback, the faster Claude converges on a fix. Remember from Workshop 5: structured output with JSON schemas eliminates syntax errors entirely, so you only need to worry about semantic errors.

---

## Exercise 12: Cloud Tasks (5 minutes)

### 12.1 Run Tests Remotely

Execute your test suite as a cloud task:

```bash
claude --remote "Run npx vitest run and report the results. Tell me
how many tests passed, how many failed, and if coverage is above 70%."
```

**What to observe:**
- [ ] The command executes on remote infrastructure
- [ ] Results return to your terminal
- [ ] You could close your laptop and check later

### 12.2 Remote Feature Addition

Try adding a feature remotely:

```bash
claude --remote "Add a test to the StatCard test file that verifies
the component handles a zero value correctly. Run the test to confirm."
```

---

## Exercise 13: Remote Control and Mobile Workflow (10 minutes)

### 13.1 Start a Remote Session

Start Claude Code with remote access enabled and follow the instructions to get your Remote Control URL.

### 13.2 Connect from Mobile

1. Open the Remote Control URL on your phone or tablet
2. You should see a conversational interface

### 13.3 Send Commands from Mobile

Try these commands from your phone:

1. "How many test files are in the project?"
2. "Run the test suite and tell me the results"
3. "What is the current accent color default?"

**Checkpoint:** Commands sent from mobile execute on your local machine and return results.

### 13.4 Mobile Issue-to-Implementation Workflow

Practice the full mobile workflow:

1. **Create a GitHub issue from your phone** (in the GitHub app or mobile browser):
   - Title: "Add a purple option to the accent color picker"
   - Description: "Add Purple (#9333EA) as a seventh accent color option in the AccentColorPicker component."

2. **Tell Claude Code to implement it** (via Remote Control on your phone):
   ```
   "Check GitHub for the latest issue on the LifeOps repo and implement it."
   ```

3. **Review the changes on your desktop** — check the diff, verify the color, and merge

**What to verify:**
- [ ] GitHub issue created from mobile
- [ ] Claude implemented the change based on the issue
- [ ] Tests still pass after the change
- [ ] The new color appears in the accent color picker

> **Key concept:** This is a preview of the full GitHub Actions workflow we will set up in Workshop 8. For now, you create issues manually and use Claude Code to implement them. In Workshop 8, this becomes fully automated.

---

## Wrap-Up Checklist

Before finishing, verify everything works:

```bash
# Run full test suite
npx vitest run

# Run with coverage
npx vitest run --coverage

# Build the project
npm run build

# Run linter
npm run lint
```

**Final checklist:**
- [ ] Test setup file exists at `src/test/setup.js`
- [ ] Component tests pass for ContactList, TaskList, NoteList, StatCard
- [ ] Service tests pass for taskParser, SmartTaskInput
- [ ] AppContext and useLocalStorage tests pass
- [ ] Pre-commit validation hook configured in settings.json
- [ ] Hook blocks commits when tests fail
- [ ] AccentColorPicker renders with six WCAG AA presets
- [ ] Visual verification attempted with Playwright screenshots
- [ ] Test-driven iteration pattern practiced
- [ ] Interview pattern practiced
- [ ] WeatherWidget tests pass with mocked fetch
- [ ] Coverage report runs successfully
- [ ] Cloud task executed with --remote
- [ ] GitHub issue created from mobile and implemented by Claude
- [ ] Remote Control session tested from mobile

---

## Bonus Challenges

If you finish early, try these:

1. **Snapshot Testing**: Use `toMatchSnapshot()` to capture component output and detect unintended changes
2. **Accessibility Testing**: Add `@testing-library/jest-dom` matchers like `toBeVisible()` and `toHaveAccessibleName()`
3. **Parameterized Tests**: Use `it.each` to test multiple accent colors in a single test definition
4. **Watch Mode**: Run `npx vitest` (without `run`) to enable watch mode — tests re-run automatically when files change

---

## Key Concepts Reference

| Concept | Description |
|---------|-------------|
| `render()` | Renders a React component into a virtual DOM for testing |
| `screen` | Object for querying rendered elements (getByText, getByRole, etc.) |
| `expect()` | Assertion function — checks that a value meets a condition |
| `describe()` | Groups related tests under a common label |
| `it()` / `test()` | Defines a single test case |
| `vi.mock()` | Replaces a module with a mock implementation |
| `vi.spyOn()` | Watches a function and records calls without replacing it |
| `userEvent` | Simulates real user interactions (typing, clicking) |
| `renderHook()` | Tests a custom hook in isolation |
| Pre-tool-use hook | Script that runs BEFORE a Claude Code action; can block it |
| Post-tool-use hook | Script that runs AFTER a Claude Code action; can warn or log |
| Pattern matcher | Syntax like `Bash(git commit*)` that specifies which actions trigger a hook |
| Visual verification | Using screenshots to verify UI appearance after changes |
| Playwright MCP | MCP server that provides browser automation and screenshot capabilities |
| Test-driven iteration | Write tests first, share failures with Claude, iterate until green |
| Interview pattern | Ask Claude to interview you before implementing a complex feature |
| Retry with error feedback | Append specific error details when retrying a failed Claude output |
| `--remote` | Executes a Claude Code command on cloud infrastructure |
| Remote Control | Steers a local Claude Code session from a mobile device |
| WCAG AA | Accessibility standard requiring 4.5:1 contrast ratio for text |
