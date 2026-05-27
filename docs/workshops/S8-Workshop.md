# HeroForge.AI Course: Mastering Claude Code
## Session 8 Workshop: Ship It — Deploy and Present

**Estimated Time:** 45-60 minutes
**Difficulty:** Intermediate-Advanced
**Prerequisites:** Completed Sessions 1-7 (LifeOps app with components, tests, API integrations, cloud tasks, agents, skills, and automation)

---

## Workshop Objectives

By completing this workshop, you will:
- [ ] Verify the LifeOps app passes all build, test, and lint checks
- [ ] Set up a pre-push security hook to catch hardcoded secrets
- [ ] Configure automated Claude Code review in a CI/CD pipeline
- [ ] Deploy the LifeOps Command Center to Vercel
- [ ] Install the Claude GitHub App and understand the @claude workflow
- [ ] Create a pull request for final review
- [ ] Merge to the main branch and tag a v1.0.0 release
- [ ] Run a post-deploy validation checklist
- [ ] Prepare and deliver a short presentation of your app

---

## Prerequisites Check

### Environment Verification

Before starting, verify your environment is ready:

```bash
# Check Node.js version (should be v20+)
node --version

# Check Claude Code is installed
claude --version

# Check GitHub CLI is installed
gh --version

# Verify the LifeOps project builds
npm run build

# Verify tests pass
npm test

# Verify linter is clean
npm run lint
```

### Accounts and Access

Ensure you have:
1. **Vercel account** (free tier): Sign up at https://vercel.com
2. **Vercel CLI** installed: `npm install -g vercel`
3. **GitHub repository** with your LifeOps project pushed
4. **All previous session work** committed and pushed

---

## Exercise 1: Pre-Deploy Quality Gates (10 minutes)

### Goal
Run a comprehensive quality check to ensure the app is production-ready.

### Instructions

1. Ask Claude to run the full quality gate suite:

```
claude "Run a complete pre-deploy check for the LifeOps project:
1. Run npm run build and report any errors
2. Run npm test and report pass/fail counts
3. Run npm run lint and report any warnings or errors
4. Check that .env is in .gitignore
5. Check that no API keys are hardcoded in source files
Give me a pass/fail summary for each check."
```

2. Fix any issues found:

```
claude "Fix any lint errors or test failures found in the pre-deploy check. Do not skip or ignore any issues."
```

3. Verify all issues are resolved:

```bash
npm run build && npm test && npm run lint
```

### Checkpoint
- [ ] `npm run build` succeeds with zero errors
- [ ] `npm test` passes all tests
- [ ] `npm run lint` reports zero errors
- [ ] No secrets or API keys are hardcoded in source files
- [ ] `.env` is listed in `.gitignore`

---

## Exercise 1b: Pre-Push Security Hook (5 minutes)

### Goal
Add a hook that scans for hardcoded secrets before any `git push`, applying the hook pattern from Session 7 to production safety.

### Instructions

1. Ask Claude to set up the security hook:

```
claude "Create a post-tool-use hook in .claude/settings.json that intercepts git push commands. The hook should scan source files in src/ for patterns matching API keys (sk-, AKIA, ghp_), hardcoded passwords, and .env file patterns. If secrets are detected, block the push and display a warning. This is the same hook pattern from Session 7 applied to deployment safety."
```

2. Test the hook by verifying it does not block a clean push:

```bash
# This should succeed — no secrets in source files
git push --dry-run origin main
```

3. Verify the hook catches issues (optional test):

```
claude "Create a temporary test file with a fake API key to verify the security hook catches it. Then remove the test file."
```

### Why This Matters

This is defense in depth:
- `.gitignore` prevents committing `.env` files
- The pre-push hook catches anything `.gitignore` missed — hardcoded keys in source files, accidentally committed credentials, test fixtures with real API keys
- Two layers of protection are always better than one

### Checkpoint
- [ ] Security hook is configured in `.claude/settings.json`
- [ ] Hook scans for common API key patterns
- [ ] Hook does not block pushes when no secrets are present

---

## Exercise 1c: Automated Code Review with Claude Code (10 minutes)

### Goal
Set up a GitHub Actions workflow that automatically reviews every pull request using Claude Code.

### Instructions

1. Review the workflow template:

```
claude "Read the file .github/workflows/claude-review.yml and explain what each section does."
```

2. If the workflow file does not exist, create it:

```
claude "Create a GitHub Actions workflow at .github/workflows/claude-review.yml that:
1. Triggers on pull request open and synchronize events
2. Checks out the code
3. Runs claude -p with a review prompt using --output-format json
4. Uses the ANTHROPIC_API_KEY secret for authentication
Add comments explaining each section."
```

3. Add the API key to your GitHub repository secrets:
   - Go to your repo on GitHub
   - Settings → Secrets and variables → Actions
   - Add `ANTHROPIC_API_KEY` with your API key

4. Understand session context isolation:

> When Claude generates code in your terminal, it builds up reasoning context — the decisions it made, the assumptions it held. A fresh Claude instance in CI has none of that context. It evaluates your code independently, which makes it more effective at catching subtle issues the generating session might miss.

> Your CLAUDE.md provides the review criteria. The same file that guides development also tells the CI reviewer about your coding conventions, testing standards, and architecture decisions.

### Checkpoint
- [ ] GitHub Actions workflow exists at `.github/workflows/claude-review.yml`
- [ ] `ANTHROPIC_API_KEY` is configured as a repository secret
- [ ] You understand why a separate review instance catches issues the generator might miss

### Reference
See `docs/workshops/templates/S8-CICD-Reference.md` for detailed documentation on the `-p` flag, `--output-format json`, `--json-schema`, and tips for reducing false positives.

---

## Exercise 2: Deploy to Vercel (10 minutes)

### Goal
Deploy the LifeOps Command Center to a live URL using Vercel.

### Instructions

1. Log in to Vercel CLI:

```bash
vercel login
```

2. Ask Claude to prepare the deployment:

```
claude "Prepare the LifeOps project for Vercel deployment:
1. Check that a vercel.json config exists — if not, create one with the correct build settings for a Vite React app
2. Make sure the build output directory is set to 'dist'
3. Verify that environment variables are documented in .env.example"
```

3. Deploy to Vercel preview:

```bash
vercel
```

4. Review the preview deployment:
   - Open the preview URL in your browser
   - Verify the dashboard loads correctly
   - Check that all components render (contacts, tasks, notes, weather widget)
   - Test navigation between sections

5. Deploy to production:

```bash
vercel --prod
```

6. Record your production URL:

```
claude "Save the production URL to docs/deployment-url.md along with the deployment date and a note about the Vercel project name."
```

### Checkpoint
- [ ] Vercel CLI is authenticated
- [ ] Preview deployment loads correctly
- [ ] All dashboard components render on the live site
- [ ] Production deployment is live
- [ ] Production URL is recorded in `docs/deployment-url.md`

---

## Exercise 3: Create and Merge Pull Request (10 minutes)

### Goal
Create a pull request for final review and merge it into the main branch.

### Instructions

1. Make sure all changes are committed:

```
claude "Check for any uncommitted changes in the LifeOps project. If there are any, stage and commit them with an appropriate message."
```

2. Create a feature branch if not already on one:

```bash
git checkout -b release/v1.0.0
```

3. Push to the remote:

```bash
git push -u origin release/v1.0.0
```

4. Ask Claude to create the pull request:

```
claude "Create a pull request from release/v1.0.0 to main with:
- Title: 'LifeOps Command Center v1.0.0'
- Description that summarizes all features built across Sessions 1-8:
  - Session 1: Static landing page
  - Session 2: Dev environment setup
  - Session 3: Contacts and task list with Git workflow
  - Session 4: React component architecture with CLAUDE.md
  - Session 5: Weather widget, GitHub activity, smart task parser
  - Session 6: Unit tests, accent color picker, cloud tasks
  - Session 7: Agents, skills, hooks, and the Claude Agent SDK
  - Session 8: Deployment and release"
```

5. Review the PR on GitHub and merge:

```bash
gh pr merge --squash --delete-branch
```

### Checkpoint
- [ ] All changes are committed and pushed
- [ ] Pull request was created with a comprehensive description
- [ ] PR was reviewed (at minimum, a self-review)
- [ ] PR was merged into main
- [ ] Feature branch was deleted after merge

---

## Exercise 3b: GitHub Integration — Work from Anywhere (5 minutes)

### Goal
Install the Claude GitHub App and understand the issue-to-PR workflow.

### Instructions

1. Install the Claude GitHub App:

```
/install-github-app
```

2. Create a test issue on your GitHub repository:
   - Go to your repo on GitHub (or use your phone)
   - Create a new issue titled: "Add a footer with course credit to the dashboard"
   - In the issue body, write: `@claude implement this. Add a footer to the Dashboard component showing "Built with Claude Code — Mastering Claude Code Course by HeroForge.AI"`

3. Watch Claude work:
   - Claude reads the issue, examines your codebase (including CLAUDE.md), and implements the change
   - A pull request is created automatically
   - Review the PR when it appears

4. Understand the mobile workflow:
   - You can create issues from your phone using the GitHub mobile app
   - Tag `@claude` in the issue
   - Claude implements in the background
   - Review the PR later on your desktop

### Tips for Writing Effective Issues for Claude
- Be specific: "Add a footer with course credit" not "fix the page"
- Mention file locations if known: "Update `src/components/Dashboard.tsx`"
- Include acceptance criteria: what should the result look like?
- One feature per issue — do not bundle unrelated changes

### Checkpoint
- [ ] Claude GitHub App is installed on your repository
- [ ] You understand the issue → @claude → PR → review → merge workflow
- [ ] You know how to create issues from mobile for asynchronous work

### Reference
See `docs/workshops/templates/S8-GitHub-Integration-Guide.md` for detailed documentation.

---

## Exercise 4: Tag the Release (5 minutes)

### Goal
Create a Git tag marking the v1.0.0 release and publish release notes.

### Instructions

1. Switch to main and pull the latest:

```bash
git checkout main
git pull origin main
```

2. Create the release tag:

```bash
git tag -a v1.0.0 -m "LifeOps Command Center v1.0.0 — first production release"
git push origin v1.0.0
```

3. Ask Claude to create GitHub release notes:

```
claude "Create a GitHub release for tag v1.0.0 using gh release create. Include:
- Title: 'LifeOps Command Center v1.0.0'
- Release notes summarizing all features
- Mark it as the latest release"
```

### Checkpoint
- [ ] `v1.0.0` tag exists on the main branch
- [ ] Tag is pushed to the remote repository
- [ ] GitHub Release was created with release notes
- [ ] Release is marked as the latest release

---

## Exercise 5: Post-Deploy Validation (5 minutes)

### Goal
Run through a validation checklist to confirm the deployed app works correctly.

### Instructions

1. Ask Claude to generate a validation checklist:

```
claude "Create a post-deploy validation checklist for the LifeOps app at docs/post-deploy-checklist.md. Include checks for:
1. Homepage loads without console errors
2. Contact list displays and can be interacted with
3. Task list renders with correct formatting
4. Notes section is functional
5. Weather widget shows data (or graceful error)
6. GitHub activity widget shows data (or setup message)
7. Smart task input parses natural language correctly
8. Accent color picker changes the theme
9. Navigation between sections works
10. Mobile responsiveness is acceptable"
```

2. Walk through the checklist on your live deployment:
   - Open your production URL
   - Open browser DevTools console
   - Test each item on the checklist
   - Note any issues found

3. Fix any critical issues:

```
claude "I found the following issues on the live deployment: [describe issues]. Fix them, commit, and redeploy."
```

### Checkpoint
- [ ] Post-deploy checklist exists at `docs/post-deploy-checklist.md`
- [ ] All checklist items were verified on the live site
- [ ] No critical issues remain (minor issues documented for future fixes)

---

## Exercise 6: Presentation Prep (15 minutes)

### Goal
Prepare a short presentation (3-5 minutes) showcasing your LifeOps Command Center.

### Instructions

1. Ask Claude to generate presentation talking points:

```
claude "Create presentation talking points at docs/presentation-notes.md for a 3-5 minute demo of the LifeOps Command Center. Structure it as:
1. Introduction (30 seconds): What is LifeOps and why I built it
2. Architecture overview (1 minute): Tech stack, component structure, how Claude Code helped
3. Live demo walkthrough (2 minutes): Show contacts, tasks, notes, weather widget, smart task input, color picker
4. Key learnings (1 minute): Most valuable Claude Code techniques learned
5. What's next (30 seconds): Future features I would add
Include specific things to click on and show during the demo."
```

2. Practice the demo flow:
   - Open your deployed app
   - Walk through each section following the talking points
   - Time yourself — aim for 3-5 minutes

3. Prepare for questions:

```
claude "Generate a list of 5 likely audience questions about the LifeOps project and suggested answers. Focus on questions about Claude Code workflow, architecture decisions, and deployment."
```

### Checkpoint
- [ ] Presentation notes exist at `docs/presentation-notes.md`
- [ ] Demo flow covers all major features
- [ ] Presentation fits within 3-5 minutes
- [ ] You have prepared answers for likely questions

---

## Wrap-Up Checklist

Before finishing, run the final verification:

```bash
# Verify the project still builds
npm run build

# Run tests
npm test

# Run linter
npm run lint

# Check the deployment is live
curl -s -o /dev/null -w "%{http_code}" YOUR_PRODUCTION_URL
```

**Final checklist:**
- [ ] All quality gates pass (build, test, lint)
- [ ] App is deployed to Vercel with a production URL
- [ ] Pull request was created and merged to main
- [ ] `v1.0.0` tag and GitHub Release were created
- [ ] Post-deploy validation was completed
- [ ] Presentation notes and talking points are prepared
- [ ] You can demo the app in 3-5 minutes

---

## What's Next

### Scaling with the Batch API

For the work you have done in this course, the synchronous Claude API — send a request, get a response — is the right tool. But when you need to process at scale, the Message Batches API offers non-blocking processing with a 24-hour window and 50% cost savings. Each request includes a `custom_id` for correlating responses. The tradeoff: no multi-turn tool calling within a single batch request. Use synchronous for pre-merge checks and real-time features. Use batch for nightly audits, weekly reports, and bulk test generation.

### Beyond Code: Cowork

Beyond code, Claude Desktop's Cowork feature handles knowledge work — generating changelogs from git history, preparing meeting summaries, organizing research notes. If you find yourself doing repetitive non-code tasks, explore Cowork as your automation partner.

### Certification Pathway

If you want to take your Claude skills to the professional level, consider the Claude Certified Architect — Foundations certification. Throughout this course, you have touched all five exam domains: agentic architecture (Session 7), tool design and MCP (Session 5), Claude Code configuration (Session 4), prompt engineering (Sessions 5-6), and context management (Sessions 4 and 7). The exam guide is available in our `docs/` folder.

---

## Bonus Challenges

If you finish early, try these:

1. **Custom Domain**: Configure a custom domain for your Vercel deployment and set up HTTPS
2. **Enhanced CI/CD Pipeline**: Extend the Claude review workflow to also run build, test, and lint checks, and post results as PR comments
3. **Performance Audit**: Run Lighthouse in Chrome DevTools and optimize for a score above 90 in all categories
4. **Multi-Pass Review**: Set up a review workflow that does per-file analysis followed by a cross-file integration check
5. **Batch Processing**: Write a script that uses the Message Batches API to generate test cases for every component in the project

---

## Key Concepts Reference

| Concept | Description |
|---------|-------------|
| Quality Gates | Pre-deploy checks (build, test, lint) that must pass before shipping |
| Pre-Push Security Hook | A hook that scans for hardcoded secrets before `git push` — defense in depth |
| `-p` Flag (Non-Interactive) | Runs Claude Code with a single prompt, no conversation — enables CI/CD automation |
| `--output-format json` | Produces machine-parseable structured output from Claude Code |
| `--json-schema` | Constrains JSON output to a specific schema for consistent structure |
| Session Context Isolation | A fresh Claude instance reviews code without the generator's reasoning bias |
| Multi-Instance Review | Using separate Claude instances for generation and review to catch more issues |
| Claude GitHub App | Connects Claude to GitHub for issue-to-PR automation via `@claude` |
| Message Batches API | Non-blocking API with 50% cost savings for bulk processing (24-hour window) |
| Vercel | Cloud platform for deploying frontend applications |
| Preview Deployment | A temporary deployment for testing before going to production |
| Production Deployment | The live, public-facing version of your app |
| Pull Request | A request to merge changes from one branch into another |
| Squash Merge | Combines all PR commits into a single commit on the target branch |
| Git Tag | A named reference to a specific commit, used for releases |
| GitHub Release | A packaged version of your project with release notes |
| Post-Deploy Validation | Manual or automated checks to verify a deployment works |
| Presentation Demo | A structured walkthrough showing key features of your app |
| Cowork | Claude Desktop feature for non-code knowledge work automation |
| Claude Certified Architect | Professional certification covering 5 domains of Claude expertise |
