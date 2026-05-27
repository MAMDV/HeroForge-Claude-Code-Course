# Session 6 Reference: Visual Testing with Playwright

**What this covers:** Why visual testing matters for AI-assisted development, how to use Playwright MCP for screenshots, and when to use visual testing vs other testing methods.

---

## Why Visual Testing Matters

Unit tests verify that your code produces the correct data. But they cannot tell you whether your app looks right. Consider these scenarios:

- Claude fixes a CSS bug but accidentally removes a flexbox rule, breaking the layout
- A color change passes all logic tests but creates a WCAG contrast violation
- A component renders the correct text but overlaps with another element
- A responsive breakpoint works in the test environment but breaks on mobile widths

Visual testing catches these issues by comparing what the app actually looks like in a real browser.

---

## Why This Matters for AI-Assisted Development

When you write CSS by hand, you see the result immediately. When Claude writes CSS for you, the change happens in code — you might not notice a visual regression until much later.

Visual verification closes this gap. After every visual change, take a screenshot and confirm the result matches your expectations.

---

## Using Playwright MCP for Screenshots

The Playwright MCP provides browser automation capabilities to Claude Code, including the ability to take screenshots of running web applications.

### Basic Screenshot Workflow

**Step 1: Start your development server**

```bash
npm run dev
```

Your app should be running at `http://localhost:5173` (or your configured port).

**Step 2: Ask Claude to take a screenshot**

```
"Take a screenshot of the LifeOps app running on localhost:5173"
```

Claude uses the Playwright MCP to open a browser, navigate to your app, and capture a screenshot.

**Step 3: Make your change**

For example, change the accent color from Ocean Blue to Rose.

**Step 4: Take another screenshot and compare**

```
"Take another screenshot of the LifeOps app and compare it
to the previous one. What visual differences do you see?"
```

Claude will identify the visual differences — color changes, layout shifts, missing elements, or unexpected changes.

---

## Before/After Comparison Workflow

The most valuable visual testing pattern is before/after comparison:

1. **Before:** Capture the current state before any changes
2. **Change:** Make the modification (CSS update, component refactor, new feature)
3. **After:** Capture the new state
4. **Compare:** Identify intended changes and catch unintended regressions

This workflow is especially useful for:
- Theme changes (accent colors, dark/light mode)
- Layout refactors (switching from grid to flexbox, responsive adjustments)
- Component redesigns (new card styles, updated navigation)
- Accessibility improvements (font size changes, contrast adjustments)

---

## When to Use Each Testing Method

| Testing method | What it catches | Speed | When to use |
|---------------|----------------|-------|-------------|
| **Unit tests** (Vitest + RTL) | Logic errors, wrong data, missing props, broken state | Milliseconds | Every code change |
| **Visual tests** (Playwright screenshots) | CSS regressions, layout breaks, color issues, responsive problems | Seconds | After visual/CSS changes |
| **Manual testing** | Interaction flows, animations, complex UX patterns | Minutes | Before major releases |

**Guidelines:**
- Always run unit tests (they are fast and automated)
- Add visual verification when Claude changes CSS, layouts, or themes
- Use manual testing for complex interactions that neither unit tests nor screenshots can capture

---

## Tips for Effective Visual Testing

1. **Capture full-page screenshots** for layout verification, and **element-level screenshots** for component-specific changes

2. **Test multiple viewport sizes** if your app is responsive:
   ```
   "Take screenshots of the LifeOps app at 1920x1080, 768x1024, and 375x667"
   ```

3. **Focus on the changed area** — if you only changed the header, compare the header region specifically

4. **Combine with unit tests** — visual tests verify appearance, unit tests verify logic. Use both for complete coverage.

5. **Keep your dev server running** during the session so screenshots are quick to capture

---

## Limitations

- Screenshots capture a single moment in time — they do not test animations or transitions
- Visual comparison is qualitative, not pixel-perfect — Claude describes differences rather than computing exact pixel diffs
- Screenshots require a running development server
- Browser rendering can vary slightly between environments

For production-grade visual regression testing (pixel-perfect comparison, automated baselines), consider dedicated tools like Playwright's built-in visual comparison or Chromatic. The Playwright MCP approach taught in this session is ideal for quick verification during development.
