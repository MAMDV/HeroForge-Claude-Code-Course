# Session 8 Reference: GitHub Integration with Claude

This reference covers installing the Claude GitHub App, using the `@claude` workflow in issues and PRs, and best practices for asynchronous development from any device.

---

## Installing the Claude GitHub App

### Step 1: Run the Install Command

In your Claude Code terminal session, run:

```
/install-github-app
```

This connects Claude to your GitHub account and repository. You will be prompted to authorize the app and select which repositories it can access.

### Step 2: Verify Installation

After installation, verify by checking your repository settings:
- Go to your GitHub repository
- Settings → Integrations → GitHub Apps
- Confirm Claude is listed and has the correct permissions

### What Permissions Does It Need?

The Claude GitHub App requires:
- **Read access** to code, issues, and pull requests
- **Write access** to issues and pull requests (to create PRs and post comments)
- **Read access** to repository metadata

---

## The @Claude Workflow

### Overview

The workflow follows a simple loop:

1. **Create an issue** on GitHub describing what you want
2. **Tag @claude** in the issue body or a comment
3. **Claude implements** the change by reading your codebase (including CLAUDE.md)
4. **A PR is created** with the implementation
5. **You review** the PR, request changes if needed, and merge when satisfied

### Creating an Issue

Write the issue as if you were giving instructions to a developer:

**Title**: Add a footer with course credit to the dashboard

**Body**:
```
@claude implement this.

Add a footer component to the Dashboard that displays:
- "Built with Claude Code"
- "Mastering Claude Code Course by HeroForge.AI"
- A link to the course repository

The footer should match the existing design system and be responsive.
Place it at the bottom of the main Dashboard component in src/components/.
```

### Tagging @claude in an Existing Issue

If an issue already exists, add a comment:

```
@claude implement this issue. Follow the acceptance criteria above.
```

### Requesting Changes on a Claude PR

If the PR needs adjustments, comment on the PR:

```
@claude The footer text should be centered and the font size should be smaller (0.875rem). Also add a top border to separate it from the content above.
```

Claude reads the feedback and pushes updated commits to the same PR.

---

## Mobile Workflow

One of the most powerful aspects of the `@claude` workflow is that it works from any device with a browser or the GitHub mobile app.

### The Mobile Flow

1. **On your phone**: Open the GitHub mobile app (or github.com in a browser)
2. **Create an issue**: Tap the + button, write a title and description, tag `@claude`
3. **Go about your day**: Claude works in the background
4. **On your desktop**: The PR is waiting for review when you sit down

### When to Use Mobile Workflow

- You think of a feature while commuting — create the issue immediately
- A bug report comes in during a meeting — create an issue with the details
- You want to parallelize work — create multiple issues and let Claude work on them
- Weekend inspiration — capture the idea as an issue without opening your laptop

---

## Best Practices for Writing Effective Issues

### Be Specific

| Less Effective | More Effective |
|----------------|----------------|
| "Fix the homepage" | "Fix the navigation links on the homepage — the Tasks link points to /task instead of /tasks" |
| "Add tests" | "Add unit tests for the ContactList component covering: rendering with empty data, rendering with 3 contacts, and click handler on individual contacts" |
| "Improve styling" | "Update the Dashboard header to use the primary color from the theme and increase padding to 1.5rem" |

### Mention File Locations

If you know where the change should happen, say so:

```
Update the WeatherWidget component in src/components/WeatherWidget.tsx
to show a loading spinner while fetching data.
```

### Include Acceptance Criteria

Tell Claude what "done" looks like:

```
Acceptance criteria:
- [ ] Footer appears on every page
- [ ] Footer text is centered
- [ ] Footer includes a link to the course repository
- [ ] Footer is responsive (stacks vertically on mobile)
- [ ] No console errors introduced
```

### One Feature Per Issue

Do not bundle unrelated changes in a single issue. This makes review harder and increases the chance of conflicts.

**Avoid**:
```
Add a footer, fix the task list sorting bug, and update the color picker defaults.
```

**Prefer**: Three separate issues, each focused on one change.

### Provide Context for Non-Obvious Changes

If the change requires understanding a specific part of the architecture:

```
@claude implement this.

The Dashboard currently fetches weather data in a useEffect hook inside
WeatherWidget.tsx. Refactor this to use the existing useApi hook from
src/hooks/useApi.ts instead. The useApi hook handles loading state,
error state, and caching — so the WeatherWidget can remove its manual
loading/error state management.
```

---

## How to Review Claude-Generated PRs

### Step 1: Read the PR Description

Claude writes a PR description summarizing the changes. Check that the description matches what you requested in the issue.

### Step 2: Review the Diff

- Click "Files changed" on the PR
- Read every changed file
- Look for:
  - Does the implementation match your request?
  - Are there any unexpected changes to files you did not mention?
  - Is the code consistent with the rest of the project?
  - Are there any hardcoded values that should be configurable?

### Step 3: Check the Preview

If you have Vercel (or another preview deployment service) connected, click the preview link to see the changes live.

### Step 4: Test Locally (Optional)

For significant changes, pull the branch locally and test:

```bash
git fetch origin
git checkout pr-branch-name
npm install
npm run build && npm test
```

### Step 5: Request Changes or Approve

- If changes are needed, comment on the PR with specific feedback and tag `@claude`
- If everything looks good, approve and merge

### Common Review Findings

| Finding | Action |
|---------|--------|
| Implementation is correct but styling differs from existing components | Comment with specific CSS values to match |
| Missing error handling | Request error handling for edge cases you care about |
| Tests not included | Request tests if the change is significant enough |
| Unnecessary file changes | Ask Claude to revert changes to files not related to the issue |
| Good implementation | Approve and merge |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| @claude does not respond | Verify the GitHub App is installed and has access to the repository |
| PR has merge conflicts | Ask Claude to rebase: `@claude rebase this PR on the latest main` |
| Implementation is wrong | Close the PR, update the issue with clearer instructions, and re-tag `@claude` |
| Claude changes too many files | Be more specific about scope in the issue description |
| Response is slow | Claude processes issues asynchronously — allow a few minutes for complex changes |
