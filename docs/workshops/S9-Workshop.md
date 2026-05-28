# HeroForge.AI Course: Mastering Claude Code
## Workshop 9: Make It Yours — Visual Identity & AI-Enhanced Design

**Estimated Time:** 60 minutes (extended bonus session)
**Difficulty:** Intermediate-Advanced
**Prerequisites:** Completed Workshops 1-8 (LifeOps Command Center deployed to Vercel, all features functional)

---

## Workshop Objectives

By completing this workshop, you will:
- [ ] Install and configure seven design/interaction libraries
- [ ] Activate the Frontend Design skill in Claude Code
- [ ] Choose an aesthetic direction and articulate it using design vocabulary
- [ ] Transform your LifeOps Command Center with at least three cohesive visual changes
- [ ] Present your redesigned app in a 60-second lightning demo

---

## Prerequisites Check

### Environment Verification

Before starting, verify your environment is ready:

```bash
# Check Node.js version (should be v20+)
node --version

# Check Claude Code is installed
claude --version

# Verify the LifeOps project builds
npm run build

# Verify tests pass
npm test

# Verify the app is deployed and accessible
# Open your Vercel production URL in a browser
```

### What You Should Have From Workshop 8

Confirm these are in place:

1. **LifeOps Command Center deployed to Vercel** with a live production URL
2. **All features functional**: contacts, tasks, notes, weather widget, accent color picker
3. **All quality gates passing**: `npm run build`, `npm test`, `npm run lint`
4. **Git repository** with all work committed and pushed to GitHub
5. **v1.0.0 tag** and GitHub Release created

If any of these are missing, complete them before proceeding. The Design Showdown builds on top of a working app.

---

## Setup: Install Libraries (5 minutes)

### Install All Dependencies

Run this single command to install all seven libraries:

```bash
npm install motion vaul sonner atropos cmdk @dicebear/core @dicebear/collection
```

### Add Web Fonts

Add the following to your `index.html` inside the `<head>` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Verify the Build

After installation, confirm the app still builds:

```bash
npm run build
```

If the build fails after installing libraries, run `npm install` again and retry. If dependency conflicts occur, try:

```bash
npm install --legacy-peer-deps
```

### Checkpoint
- [ ] All seven libraries installed successfully
- [ ] Web fonts added to `index.html`
- [ ] `npm run build` succeeds after installation

---

## The Design Showdown Brief

### Rules

1. **Pick one aesthetic direction** from the six options below
2. **Use the Frontend Design skill** — activate it with `/frontend-design` or by asking Claude Code to "use the Frontend Design skill"
3. **Implement at least three visual changes** — they must be cohesive (all belonging to the same aesthetic direction)
4. **Your app must still function** — contacts, tasks, notes, and navigation must all work after your changes
5. **Time limit: 25 minutes** — you will be stopped at time
6. **Present for 60 seconds** — show your app, name your aesthetic, highlight your proudest change

### What Counts as a Visual Change

Each of these counts as one change:
- New typography (font family, sizing, weight hierarchy)
- New color scheme (background, text, accents, semantic colors)
- New layout structure (bento grid, split panes, sidebar, stacked)
- Animation system (entrance animations, transitions, hover effects)
- New component (command palette, activity timeline, focus mode, drawer)
- Interactive effect (3D tilt, parallax, gesture-based interactions)
- Generated content (DiceBear avatars, time-aware backgrounds)
- Notification system (toast notifications with Sonner)

### What Does NOT Count
- Changing a single color value
- Adding one icon
- Adjusting padding or margins without a design rationale

---

## Aesthetic Cards: Your Six Options

### Card 1: BRUTALIST

**Visual Keywords:** Raw, exposed, monospace, high contrast, no decoration, visible grid

**Description:** Strip away every unnecessary visual element. No gradients. No shadows. No rounded corners. Borders are 1px solid black. Typography is monospace at a single size with hierarchy created by weight alone. The background is white or off-white. One accent color maximum — preferably red or black. The app should look like it was printed on paper by a typewriter, then uploaded to the web.

**Suggested Libraries:** Motion (for abrupt, mechanical transitions), Sonner (styled with monospace and hard borders)

**Mood Board References:** Craigslist, Bloomberg Terminal (text mode), brutalistwebsites.com, Swiss International Style posters

**Example Prompt:**
```
Use the Frontend Design skill. Redesign the LifeOps dashboard in a
brutalist aesthetic. Remove all shadows, gradients, and rounded corners.
Use a single monospace font (JetBrains Mono) at one size with hierarchy
from weight only. Background: white. Borders: 1px solid black. One
accent color: red. Layout: strict vertical stack with visible grid
lines. Components should feel raw and undecorated. Add mechanical
entrance animations using Motion — elements should snap into place,
not ease in.
```

---

### Card 2: RETRO-FUTURISTIC

**Visual Keywords:** CRT glow, scan lines, amber-on-black, NASA control rooms, pulsing indicators, monospace

**Description:** Dark backgrounds with amber, green, or cyan data accents. The feeling of a command center monitoring something important. Monospace typography everywhere. Status indicators that pulse gently. Subtle CRT scan-line overlay. Information density is high — small text, lots of data, minimal whitespace. The app should feel like it controls a space mission or a trading floor.

**Suggested Libraries:** Motion (staggered data arrival animations), Atropos (3D tilt on data cards), Sonner (amber-tinted notifications), cmdk (command palette for operator efficiency)

**Mood Board References:** NASA JPL mission control, Bloomberg Terminal, the movie Interstellar (TARS/CASE interface), Fallout Pip-Boy

**Example Prompt:**
```
Use the Frontend Design skill. Redesign the LifeOps dashboard as a
retro-futuristic mission control interface. Dark background (#0a0a0f).
Primary accent: amber (#f5a623). Secondary accent: green (#00ff41).
Typography: JetBrains Mono for data and labels, Instrument Serif for
section headings. Add a subtle CSS scan-line overlay. Stat cards should
use Atropos for 3D tilt on hover. Add an Activity Timeline with
staggered Motion animations. Include a Cmd+K command palette using cmdk.
Toast notifications via Sonner in amber tones.
```

---

### Card 3: ORGANIC

**Visual Keywords:** Soft gradients, natural colors, rounded forms, breathing animations, generous whitespace

**Description:** The opposite of brutalist. Everything is soft, warm, and approachable. Color palette drawn from nature: sage green, terracotta, warm cream, soft clay. Shapes are rounded — border-radius generous but not circles. Animations are slow and gentle: elements fade in over 500ms, not 200ms. Whitespace is abundant. The app should feel like opening a journal in a quiet room.

**Suggested Libraries:** Motion (slow, easing animations with spring physics), Vaul (soft drawer panels), Sonner (muted, gentle notifications), DiceBear (adventurer or lorelei avatar style)

**Mood Board References:** Headspace app, Notion (light mode), Japanese minimalist design, ceramics and pottery

**Example Prompt:**
```
Use the Frontend Design skill. Redesign the LifeOps dashboard with an
organic, nature-inspired aesthetic. Color palette: sage (#9caf88),
terracotta (#c67b5c), warm cream (#faf5ef), soft clay (#d4a888).
Background: warm cream. Typography: a rounded sans-serif for body text,
Instrument Serif for headings. Generous whitespace and large border
radius on all cards (16px+). Animations should be slow and springy —
use Motion with spring physics (stiffness: 100, damping: 15). Add
DiceBear avatars using the adventurer style. Toast notifications via
Sonner in muted earth tones.
```

---

### Card 4: EDITORIAL

**Visual Keywords:** Strong typography, whitespace, serif fonts, magazine layout, dramatic scale contrast

**Description:** Typography is the star. Large serif headings (48px+) next to small sans-serif body text (14px). Dramatic scale contrast between elements. Color is minimal — mostly black, white, and one accent. Layout borrows from magazine design: full-width sections, pull quotes, oversized numbers. The app should feel like the front page of a well-designed newspaper.

**Suggested Libraries:** Motion (dramatic entrance animations — large elements sliding in), Sonner (minimal, text-only notifications)

**Mood Board References:** The New York Times, Bloomberg Businessweek, Monocle magazine, Apple product pages

**Example Prompt:**
```
Use the Frontend Design skill. Redesign the LifeOps dashboard with an
editorial magazine aesthetic. Typography: Instrument Serif at 48px+
for headings, JetBrains Mono at 14px for body/data. Colors: black
(#111111), white (#fafafa), and one accent of your choice. Layout:
full-width horizontal sections with dramatic whitespace. Stat numbers
should be oversized (72px+). Cards should have no borders or shadows —
separation comes from whitespace alone. Entrance animations via
Motion: elements slide up from below with a gentle decelerate easing.
```

---

### Card 5: CYBERPUNK

**Visual Keywords:** Neon accents, dark backgrounds, glitch effects, data-dense, animated gradient borders

**Description:** Maximum visual energy. Dark backgrounds (near black) with vivid neon accents — electric blue, hot pink, toxic green. Borders glow. Text sometimes glitches. Layouts are dense with small text and lots of data. Gradient borders animate slowly. The app should feel like it was built by a hacker in a cyberpunk film — functional, fast, and slightly dangerous.

**Suggested Libraries:** Motion (glitch keyframe animations, gradient border animations), Atropos (neon-lit 3D cards), cmdk (dark command palette for rapid navigation), Sonner (neon-colored notifications)

**Mood Board References:** Cyberpunk 2077, Blade Runner 2049, Mr. Robot interfaces, neon signs in Tokyo

**Example Prompt:**
```
Use the Frontend Design skill. Redesign the LifeOps dashboard with a
cyberpunk aesthetic. Background: near-black (#0d0d0d). Neon accents:
electric blue (#00d4ff), hot pink (#ff2d78), toxic green (#39ff14).
Typography: JetBrains Mono for everything — this is a hacker's
interface. Add animated gradient borders on cards using CSS
@keyframes. Include a subtle text glitch effect on headings using
CSS clip-path animations. Stat cards with Atropos 3D tilt and neon
glow shadows. Dense layout with small text (13px body). Cmd+K
command palette via cmdk with a dark theme. Sonner notifications
in neon colors.
```

---

### Card 6: MINIMAL INDUSTRIAL

**Visual Keywords:** Flat, grid-visible, tiny labels, data-first, thin borders, muted palette

**Description:** Function dictates every decision. No decoration that does not serve a purpose. Colors are muted — grays, one functional accent for interactive elements. Borders are thin (0.5px). Labels are tiny (11px). Data is the visual focus, not the container. Grid lines are visible, reinforcing structure. The app should look like a monitoring system in a well-run factory — everything in its place, nothing wasted.

**Suggested Libraries:** Sonner (minimal, functional notifications), cmdk (efficient command access)

**Mood Board References:** Dieter Rams designs, factory SCADA interfaces, Muji products, Berlin techno flyers

**Example Prompt:**
```
Use the Frontend Design skill. Redesign the LifeOps dashboard with a
minimal industrial aesthetic. Colors: light gray background (#f2f2f2),
dark gray text (#333333), one functional accent (#2563eb) for
interactive elements only. Typography: JetBrains Mono at small sizes
(13px body, 11px labels). Borders: 0.5px solid #cccccc. No shadows.
No rounded corners. Visible grid lines in the layout. Cards are flat
containers with tiny uppercase labels. Data values are the largest
text element in each card. Minimal whitespace — information density
is high. Sonner notifications styled as plain text alerts.
```

---

## Prompt Templates

These templates work with any aesthetic direction. Replace the bracketed sections with your chosen values.

### Template 1: Full Redesign Kickoff

```
Use the Frontend Design skill. Redesign the LifeOps dashboard with a
[AESTHETIC NAME] aesthetic. [2-3 SENTENCES DESCRIBING THE VISUAL
DIRECTION]. Color palette: [PRIMARY], [SECONDARY], [ACCENT],
[BACKGROUND]. Typography: [HEADING FONT] for headings, [BODY FONT]
for body text. [SPECIFIC LIBRARY REQUESTS — e.g., "Add staggered
animations with Motion" or "Add 3D tilt cards with Atropos"].
```

### Template 2: Typography Change

```
Use the Frontend Design skill. Update the LifeOps typography to match
a [AESTHETIC NAME] direction. Headings: [FONT] at [SIZE]. Body text:
[FONT] at [SIZE]. Labels and metadata: [FONT] at [SIZE]. Ensure
hierarchy is clear — the most important text should be the most
visually prominent.
```

### Template 3: Color and Background

```
Use the Frontend Design skill. Change the LifeOps color scheme to:
background [COLOR], primary text [COLOR], secondary text [COLOR],
accent [COLOR]. Add a [DESCRIPTION — e.g., "time-aware mesh gradient"
or "subtle noise texture"] to the background. All interactive elements
should use the accent color.
```

### Template 4: Animation System

```
Use the Frontend Design skill. Add entrance animations to the LifeOps
dashboard using Motion. Cards should [ANIMATION — e.g., "fade in with
a 50ms stagger" or "slide up from 20px below"]. Use [EASING — e.g.,
"spring physics with stiffness 200" or "ease-out over 300ms"]. Hover
states should [HOVER EFFECT]. Page transitions should [TRANSITION].
```

### Template 5: New Component

```
Use the Frontend Design skill. Add a [COMPONENT — e.g., "command
palette" or "activity timeline" or "focus mode overlay"] to the
LifeOps dashboard. It should match the [AESTHETIC NAME] direction
with [SPECIFIC VISUAL REQUIREMENTS]. Use [LIBRARY] for the
implementation.
```

### Template 6: Avatar Generation

```
Use the Frontend Design skill. Add unique avatars to every contact
in the LifeOps app using DiceBear. Use the [STYLE — e.g., "bottts",
"pixelArt", "adventurer", "lorelei", "initials"] style. Generate
avatars based on the contact name as the seed. Display them as
[SIZE] circular images next to each contact name in the contact list.
```

---

## Judging Rubric

Each presentation is scored on four criteria. Maximum score: 20 points.

### 1. Distinctiveness (1-5 points)

| Score | Description |
|-------|-------------|
| 1 | Looks like the default LifeOps app with minor tweaks |
| 2 | Noticeable changes but still feels generic |
| 3 | Clearly different from the default — a specific direction is visible |
| 4 | Strongly distinctive — you could identify this app in a lineup |
| 5 | Unmistakable — the aesthetic is so clear you could name it without being told |

### 2. Craft (1-5 points)

| Score | Description |
|-------|-------------|
| 1 | Changes feel random or disconnected |
| 2 | Some consistency but details clash (e.g., fonts do not match the mood) |
| 3 | Mostly cohesive — typography, color, and layout work together |
| 4 | Polished — spacing, alignment, and details are considered |
| 5 | Exceptional — every detail reinforces the aesthetic, nothing feels out of place |

### 3. Functionality (1-5 points)

| Score | Description |
|-------|-------------|
| 1 | App is broken — major features do not work |
| 2 | App loads but some features are broken or inaccessible |
| 3 | Core features work (contacts, tasks, notes) with minor visual glitches |
| 4 | All features work correctly with the new design |
| 5 | All features work and the design enhances usability (e.g., command palette adds efficiency) |

### 4. One Memorable Thing (1-5 points)

| Score | Description |
|-------|-------------|
| 1 | Nothing stands out — it is competent but forgettable |
| 2 | One element is slightly interesting |
| 3 | One element is genuinely clever or eye-catching |
| 4 | One element made the audience react audibly |
| 5 | One element will be remembered after the session ends |

---

## Bonus Challenges

Finished early? Try these:

### Challenge 1: Theme Toggle
Add a button or keyboard shortcut that switches between two aesthetic directions. For example, toggle between your chosen aesthetic and a "light mode" variant. Use CSS custom properties and Motion for the transition animation.

### Challenge 2: Page Transitions
Add animated transitions when navigating between sections (contacts, tasks, notes). Use Motion's `AnimatePresence` to fade out the current view and fade in the next one.

### Challenge 3: Custom Avatar Style
Instead of DiceBear, ask Claude Code to generate unique SVG avatars for each contact. Prompt: "Generate a minimalist geometric SVG avatar for [contact name] using shapes and colors that match my [AESTHETIC] direction."

### Challenge 4: Responsive Drawer
Use Vaul to add a mobile-friendly drawer that contains the Activity Timeline or command palette. The drawer should pull up from the bottom on mobile and slide in from the side on desktop.

### Challenge 5: Sound Design
Add subtle UI sounds using the Web Audio API: a soft click when completing a task, a notification tone for toasts, a whoosh when opening the command palette. Keep volumes low and provide a mute toggle.

### Challenge 6: Data Visualization
Add a small chart or visualization to the dashboard — a task completion sparkline, a weekly activity heatmap, or a contact network graph. Use CSS or SVG, no additional chart libraries.

---

## Troubleshooting

### Library Installation Issues

**Problem:** `npm install` fails with dependency conflicts
**Solution:** Try `npm install --legacy-peer-deps`. If that fails, install libraries one at a time to identify the conflict.

**Problem:** `npm install` is very slow
**Solution:** Check your internet connection. If using a Codespace, the network should be fast. Try `npm cache clean --force` and retry.

### Build Errors After Changes

**Problem:** `Module not found` errors after adding imports
**Solution:** Double-check import paths. Common mistakes:
- Motion: import from `motion` (not `framer-motion`)
- DiceBear: import from `@dicebear/core` and `@dicebear/collection`
- Atropos: import from `atropos/react` for the React component, `atropos/css` for styles

**Problem:** Build succeeds but the page is blank
**Solution:** Open browser DevTools console. Look for runtime errors. The most common cause is a component throwing an error during render — check that all props are passed correctly.

### CSS Conflicts

**Problem:** New styles conflict with existing styles
**Solution:** Use CSS custom properties (variables) defined at the `:root` level for colors and typography. This ensures global consistency. If specific components need overrides, use component-scoped classes.

**Problem:** Fonts not loading
**Solution:** Verify the Google Fonts link is in `index.html` inside `<head>`. Check the font family names in CSS match exactly (e.g., `'JetBrains Mono'` with quotes, `'Instrument Serif'` with quotes).

### Atropos Specific Issues

**Problem:** 3D tilt effect is not visible
**Solution:** Make sure you import Atropos CSS: `import 'atropos/css'`. The component will render but look flat without the stylesheet.

**Problem:** Atropos cards overlap other elements on tilt
**Solution:** Add `z-index` to the Atropos container or ensure parent elements have `overflow: visible`.

### cmdk Specific Issues

**Problem:** Command palette opens but is invisible
**Solution:** cmdk is unstyled by default. You must add CSS for the `[cmdk-root]`, `[cmdk-input]`, `[cmdk-list]`, and `[cmdk-item]` elements. Ask Claude to generate styles matching your aesthetic.

**Problem:** Keyboard shortcut (Cmd+K) does not work
**Solution:** Add a `keydown` event listener in your app root that checks for `metaKey + k` (Mac) or `ctrlKey + k` (Windows/Linux) and toggles the palette visibility.

### Motion Specific Issues

**Problem:** Animations play on every re-render, not just on mount
**Solution:** Use `initial` and `animate` props on `motion.div`. For list items, use `AnimatePresence` with unique `key` props to control when enter/exit animations play.

**Problem:** Stagger animation does not work
**Solution:** Use `variants` with `staggerChildren` on the parent and `variants` on each child. The parent must have `animate="visible"` and `initial="hidden"`, and each child must reference the same variant names.

### DiceBear Specific Issues

**Problem:** Avatars are not rendering
**Solution:** DiceBear generates SVG strings. You need to either set `innerHTML` on a container element or convert the SVG to a data URI for use in an `<img>` tag:
```javascript
const avatar = createAvatar(bottts, { seed: name });
const dataUri = avatar.toDataUri();
// Use: <img src={dataUri} alt={name} />
```

**Problem:** All avatars look the same
**Solution:** Ensure each avatar has a unique `seed` value. The seed should be the contact's full name or a unique identifier, not a shared string.

---

## Key Concepts Reference

| Concept | Description |
|---------|-------------|
| Frontend Design Skill | A Claude Code skill focused on visual design, typography, color, and interaction |
| Aesthetic Direction | A coherent set of visual choices that define the personality of an interface |
| Bento Grid | An asymmetric grid layout where cells have different sizes based on content importance |
| Activity Timeline | A unified chronological feed combining events from multiple data sources |
| Focus Mode | A UI pattern that dims all content except one priority item |
| Command Palette | A keyboard-activated search/command interface (Cmd+K or Ctrl+K) |
| 3D Tilt Effect | A mouse-tracking parallax effect that makes flat elements appear three-dimensional |
| Procedural Avatars | Algorithmically generated avatar images based on a seed string |
| Time-Aware Theme | A color scheme that shifts based on the current time of day |
| Typography Pairing | Combining two complementary fonts (e.g., monospace + serif) for visual contrast |
| Stagger Animation | An entrance animation where list items appear sequentially with a delay between each |
| Design Showdown | A timed competition where participants transform the same app with different aesthetic directions |
