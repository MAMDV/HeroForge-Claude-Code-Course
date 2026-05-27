# Mastering Claude Code: From Zero to Full Stack AI Developer
## Session 1 Workshop: Your First AI-Built Web Page

**Estimated Time:** 45 minutes
**Difficulty:** Beginner (no coding experience required)
**Surface:** Claude Code Web (claude.ai/code)

---

## Learning Objectives

By completing this workshop, you will:

- [ ] Understand what HTML and CSS are and how they work together
- [ ] Use Claude Code Web to generate a complete personal landing page
- [ ] Customize colors, layout, and content through conversational prompts
- [ ] Learn the basics of iterative prompting (asking for changes step by step)
- [ ] Download your finished web page as a zip file you can share

---

## Prerequisites Checklist

Before starting, confirm you have the following:

- [ ] A laptop or desktop computer with a modern web browser (Chrome, Firefox, Safari, or Edge)
- [ ] A Claude Pro or Max subscription (sign up at claude.ai if you have not already)
- [ ] Access to Claude Code Web at **claude.ai/code**
- [ ] An idea of what you want on your personal page (your name, a short bio, and a few interests or hobbies)

That is it. No software to install. No terminal. No code editor. Just your browser.

---

## What You Are Building

By the end of this session you will have a personal landing page with the following sections:

| Section | What It Contains |
|---------|-----------------|
| **Hero** | Your name and a short tagline |
| **About** | A paragraph about yourself |
| **Interests** | A list of your hobbies or interests |
| **Contact** | An email link and social media placeholders |
| **Footer** | A copyright line with the current year |

The page will be styled with custom colors, responsive layout (looks good on both desktop and mobile), a Google Font, and hover effects on links. It will consist of two files: `index.html` (the content) and `style.css` (the appearance).

---

## Key Concepts (5 minutes)

Before we start building, here are four ideas that will help everything else make sense.

### What is HTML?

HTML stands for HyperText Markup Language. It is the language that describes the **content** of a web page: headings, paragraphs, lists, links, and images. Think of HTML as the skeleton of a web page. It defines **what** is on the page, but not how it looks.

### What is CSS?

CSS stands for Cascading Style Sheets. It controls the **appearance** of a web page: colors, fonts, spacing, and layout. If HTML is the skeleton, CSS is the skin, clothes, and hairstyle.

### How do HTML and CSS work together?

You write your content in an HTML file (`index.html`) and your styling rules in a CSS file (`style.css`). Inside the HTML file, a single line links the two files together so the browser knows where to find the styles.

### What is iterative prompting?

Instead of trying to describe your entire web page in one giant message, you build it step by step. First you ask for a basic page, then you ask for color changes, then layout tweaks, and so on. Each prompt builds on what came before. This is how professional developers work with AI tools.

---

## Step-by-Step Instructions

### Part 1: Open Claude Code Web (2 minutes)

**Step 1.** Open your web browser and go to **claude.ai/code**.

**Step 2.** Sign in with your Claude account if you are not already signed in.

**Step 3.** You should see the Claude Code Web interface. It looks similar to a chat window, but it has the ability to create, edit, and manage files for you.

> **What is Claude Code Web?** It is a browser-based coding environment powered by Claude. You type what you want in plain English, and Claude writes the code, creates the files, and lets you preview or download the result. No installation required.

> **Context Window Awareness:** You may notice a token counter in the Claude Code Web interface. Every conversation with Claude has a budget -- think of it as a word limit that covers everything you type and everything Claude writes back. You do not need to manage it today, but it is good to know it exists. You will learn how to work with this budget effectively in Session 4.

> **Model Selection:** Claude Code Web uses a model called Sonnet by default, which balances speed and quality well for most tasks. There are also faster options (Haiku) and more powerful options (Opus) available. You will learn when to use each model in Session 4 -- for now, Sonnet is the right choice.

---

### CHECKPOINT 1

Before continuing, confirm:
- [ ] You are signed in to claude.ai/code
- [ ] You can see the chat input area where you can type prompts

If you see an error or cannot access the page, see the **Troubleshooting** section at the bottom of this document.

---

### Part 2: Generate Your Landing Page (10 minutes)

**Step 4.** Type your first prompt into Claude Code Web. You can use the example below or write your own. Replace the placeholder text with your real information.

**Example prompt:**

```
Create a personal landing page for me with two files: index.html and style.css.

My details:
- Name: Jordan Rivera
- Tagline: "Curious mind. Creative soul. Coffee enthusiast."
- About me: I'm a graphic design student who loves hiking, photography, and
  learning new things. I recently started exploring web development and I'm
  excited to build my first web page.
- Interests: Hiking, Photography, Graphic Design, Coffee, Travel, Reading
- Email: jordan.rivera@email.com
- Social links: Use placeholder URLs for Twitter, LinkedIn, and GitHub

For the design:
- Use a clean, modern look
- Use a Google Font (something friendly and readable)
- Include a hero section, about section, interests list, contact section,
  and footer with copyright
- Make it responsive so it looks good on mobile
- Use CSS custom properties (variables) for the color theme
- Add hover effects on links
```

**Step 5.** Press Enter (or the send button) to submit your prompt.

**Step 6.** Watch as Claude generates your files. It will create:
- `index.html` -- the structure and content of your page
- `style.css` -- the colors, fonts, spacing, and layout

**Step 7.** Preview your page. Claude Code Web will show you the generated files. Look for a preview option or open the HTML file to see what your page looks like.

> **Tip:** Do not worry if the page does not look exactly how you imagined. You will customize it in the next steps. The goal right now is to get a working starting point.

---

### CHECKPOINT 2

Before continuing, confirm:
- [ ] Claude has generated both `index.html` and `style.css`
- [ ] You can see or preview your landing page
- [ ] The page shows your name, bio, interests, and contact information

If Claude generated only one file or the page looks broken, try asking: "Can you make sure the index.html file links to style.css with a link tag in the head section?"

---

### Part 3: Customize Your Colors (8 minutes)

Now you will practice **iterative prompting** by asking Claude to change the color scheme.

> **Iterative Prompting -- The Pattern You Are Learning:** What you are doing right now -- asking Claude to make changes step by step -- is called iterative prompting. It is one of the most powerful techniques in AI-assisted development. "Make it more professional" or "add a hover effect to the cards" are perfectly valid prompts. You do not need to describe everything upfront. Each small request builds on the last, and this is how experienced developers work with AI tools every day.

**Step 8.** Choose a color direction. Here are some ideas:

| Style | Description |
|-------|-------------|
| Ocean | Blues and teals with white text |
| Sunset | Warm oranges, pinks, and dark backgrounds |
| Forest | Greens and earth tones |
| Minimal | Black, white, and one accent color |
| Neon | Dark background with bright accent colors |

**Step 9.** Send a prompt to change the colors. Here are example prompts you can adapt:

**Example prompt (Ocean theme):**
```
Change the color scheme to an ocean theme. Use a deep navy background for
the hero section, teal accent colors for links and buttons, and a light
blue-gray for the body background. Keep the text readable with good contrast.
Update the CSS custom properties so all the colors are defined in one place.
```

**Example prompt (Minimal theme):**
```
Change the color scheme to a minimal black and white design with a single
accent color of coral (#FF6B6B). Use the accent color only for links,
hover effects, and the hero section border. Everything else should be
black, white, or light gray.
```

**Step 10.** Review the updated page. If the colors are not quite right, send a follow-up prompt:

```
The background color is too dark. Make it a lighter shade. Also, increase
the contrast between the heading text and the background so it is easier
to read.
```

> **This is iterative prompting in action.** You do not need to get everything perfect in one message. Professional developers adjust things step by step, and that is exactly what you are doing here.

---

### CHECKPOINT 3

Before continuing, confirm:
- [ ] Your page has a color scheme you are happy with (or close to it)
- [ ] The colors are defined using CSS custom properties (variables) at the top of the CSS file
- [ ] Text is readable against its background color

If you want to see how CSS custom properties work, ask Claude: "Show me where the CSS custom properties are defined and explain how they work."

---

### Part 4: Adjust the Layout and Fonts (8 minutes)

**Step 11.** If you want to try a different font, ask Claude to change it:

**Example prompt:**
```
Change the Google Font to "Poppins" for headings and "Inter" for body text.
Make sure both fonts are imported in the HTML file and applied in the CSS.
```

**Step 12.** Adjust spacing and layout if anything feels too cramped or too spread out:

**Example prompt:**
```
Add more spacing between the sections. Each section should have generous
padding on the top and bottom. Also, center the interests list and display
the items in a two-column grid on desktop, but stack them in a single
column on mobile.
```

**Step 13.** Ask Claude to improve the hover effects on links:

**Example prompt:**
```
Add a smooth hover effect to all links. When I hover over a link, it should
change color and have a subtle underline animation. Use a CSS transition
so the change is not instant.
```

**Step 14.** Verify that the page still looks good on mobile. You can ask Claude directly:

**Example prompt:**
```
Does the page have a media query for mobile devices? If not, add one that
adjusts the layout for screens smaller than 768 pixels. The hero text
should be smaller, the sections should have less padding, and the interests
grid should become a single column.
```

---

### CHECKPOINT 4

Before continuing, confirm:
- [ ] The page uses a Google Font you like
- [ ] Sections have comfortable spacing between them
- [ ] Links have hover effects with smooth transitions
- [ ] The layout has a media query for mobile screens

---

### Part 5: Final Touches and Download (7 minutes)

**Step 15.** Do a final review of your page. Here are some optional improvements you can ask for:

**Add a subtle background pattern or gradient:**
```
Add a subtle gradient to the hero section background, going from the
primary color to a slightly darker shade.
```

**Add an emoji or icon to each interest:**
```
Add a relevant emoji before each item in the interests list. For example,
a camera emoji before Photography, a mountain emoji before Hiking.
```

**Improve the footer:**
```
Update the footer to include the text "Built with Claude Code" next to
the copyright notice. Center the footer text and make it a smaller font size.
```

**Step 16.** Once you are satisfied with your page, download it. Ask Claude:

**Example prompt:**
```
Package my index.html and style.css files into a downloadable zip file
so I can save them to my computer.
```

**Step 17.** Download the zip file to your computer.

**Step 18. (Optional)** Open the downloaded files on your computer to verify they work:
1. Unzip the downloaded file
2. Find the `index.html` file
3. Double-click it to open it in your browser
4. Your personal landing page should appear, looking exactly like the preview

---

### CHECKPOINT 5 (Final)

Confirm you have completed the session:
- [ ] Your personal landing page displays your name, bio, interests, and contact info
- [ ] The page has a custom color scheme using CSS custom properties
- [ ] The page uses a Google Font
- [ ] Links have hover effects with smooth transitions
- [ ] The page is responsive (has a media query for mobile)
- [ ] The layout uses CSS flexbox
- [ ] You have downloaded the zip file containing `index.html` and `style.css`

Congratulations -- you just built your first web page using AI.

---

## Understanding What Claude Built (5 minutes)

Take a moment to understand the two files you now have.

### index.html Structure

Your HTML file follows this structure:

```
<!DOCTYPE html>          <-- Tells the browser this is an HTML5 document
<html>
  <head>
    <meta charset>       <-- Sets the character encoding
    <meta viewport>      <-- Makes the page work on mobile
    <title>              <-- Text that appears in the browser tab
    <link to CSS>        <-- Connects the CSS file to this HTML file
    <link to Google Font><-- Loads the font from Google
  </head>
  <body>
    <header>             <-- Hero section with name and tagline
    <section id="about"> <-- About/bio section
    <section id="interests"> <-- Interests list
    <section id="contact">   <-- Contact links
    <footer>             <-- Copyright notice
  </body>
</html>
```

Every HTML file starts with `<!DOCTYPE html>` and wraps everything inside `<html>` tags. The `<head>` contains information about the page (title, links to CSS). The `<body>` contains everything you see on the page.

### style.css Structure

Your CSS file follows this structure:

```
:root {                  <-- CSS custom properties (color variables)
  --primary-color: ...
  --text-color: ...
}

* { box-sizing }         <-- Base reset for consistent sizing

body { }                 <-- Global styles (font, background)

header { }               <-- Hero section styling

.about { }               <-- About section styling

.interests { }           <-- Interests section styling
  (uses flexbox for layout)

.contact { }             <-- Contact section styling
  a:hover { }            <-- Link hover effects

footer { }               <-- Footer styling

@media (max-width: 768px) <-- Mobile-specific adjustments
```

CSS selectors (like `body`, `header`, `.about`) target HTML elements and apply styles to them. The `:root` block at the top defines color variables you can reuse throughout the file.

---

## Troubleshooting

| Problem | Possible Cause | Solution |
|---------|---------------|----------|
| Cannot access claude.ai/code | Subscription does not include Claude Code Web | Verify you have a Claude Pro or Max subscription. Visit claude.ai/settings to check your plan. |
| Claude only generated one file | Prompt did not request two files explicitly | Ask Claude: "Please create a separate style.css file and link it from index.html." |
| Page looks like plain text with no styling | HTML file is not linking to the CSS file | Ask Claude: "Add a link tag in the head section of index.html that points to style.css." |
| Colors look wrong or text is hard to read | Poor contrast between text and background | Ask Claude: "Improve the contrast. Make sure all text has a contrast ratio of at least 4.5:1 against its background." |
| Page does not look right on mobile | Missing or incorrect media query | Ask Claude: "Add a media query for screens smaller than 768px that adjusts font sizes and switches to a single-column layout." |
| Google Font is not loading | Font import link is missing or incorrect | Ask Claude: "Check the Google Fonts import link in the HTML head. Make sure it is a valid Google Fonts URL." |
| Downloaded zip will not open | Corrupted download or unsupported format | Try downloading again. If the issue persists, ask Claude to provide the files as separate code blocks and copy them manually into a text editor. |
| Preview is not showing in Claude Code Web | Feature may not be available or browser issue | Try refreshing the page. You can also copy the HTML code, paste it into a new file on your computer called index.html, and open it in your browser. |
| Hover effects are not working | Missing CSS transition or incorrect selector | Ask Claude: "Add a CSS transition property to links so the hover color change is smooth." |
| "I accidentally closed the tab" | Session may still be recoverable | Go back to claude.ai/code and check if your session is listed in the sidebar. If not, you will need to start a new prompt, but you can use the same prompts from this worksheet. |

---

## Extension Exercises for Fast Finishers

Finished early? Try these additional challenges to push your skills further.

### Extension 1: Add a Dark Mode Toggle Description

Ask Claude to explain how you would add a dark mode toggle button to your page. You do not need to implement it -- just have Claude explain the concept of toggling a CSS class on the `<body>` element and swapping CSS custom property values.

**Example prompt:**
```
Explain how I could add a dark mode toggle button to my landing page.
Describe the concept step by step but do not add it to the code yet.
I just want to understand how it would work.
```

### Extension 2: Add a Profile Image Placeholder

Ask Claude to add a circular profile image placeholder to the hero section. Since you may not have an image URL handy, use a placeholder service.

**Example prompt:**
```
Add a circular profile image to the hero section. Use a placeholder
image from https://placehold.co/200x200 for now. Style it with a
border, border-radius to make it circular, and a subtle shadow.
```

### Extension 3: Add a Projects or Portfolio Section

Ask Claude to add a new section between Interests and Contact that showcases two or three projects or accomplishments.

**Example prompt:**
```
Add a "Projects" section between Interests and Contact. Include three
project cards in a row, each with a title, short description, and a
"Learn more" link. Use flexbox to arrange them side by side on desktop
and stacked on mobile.
```

### Extension 4: Experiment with Animations

Ask Claude to add a subtle entrance animation so sections fade in as you scroll down the page.

**Example prompt:**
```
Add a CSS fade-in animation to each section so they appear with a
subtle upward slide when the page loads. Use CSS keyframes and
animation-delay to stagger the sections.
```

### Extension 5: Explore the Code

Ask Claude to walk you through the code line by line. This is a great way to start understanding what each piece does.

**Example prompt:**
```
Walk me through the index.html file line by line. Explain what each
tag does and why it is there. Keep the explanations simple -- I have
never seen HTML before today.
```

---

## Key Takeaways

By completing this workshop, you have learned:

1. **HTML defines content, CSS defines appearance.** These two languages work together to create every web page you have ever seen.
2. **You do not need to memorize code to build things.** Claude Code Web lets you describe what you want in plain English, and it writes the code for you.
3. **Iterative prompting is the key skill.** Start simple, review the result, then ask for specific changes. This step-by-step approach produces better results than trying to describe everything at once.
4. **CSS custom properties keep your design consistent.** By defining colors in one place, you can change your entire color scheme by editing a few lines.
5. **Responsive design matters.** A media query ensures your page looks good on phones and tablets, not just desktop screens.

---

## What Comes Next

In **Session 2: Setting Up Your Dev Environment**, you will:
- Install development tools on your computer (VS Code, terminal basics)
- Learn what a terminal is and how to run simple commands
- Set up your local development environment
- Create your first file from the command line

**Preparation:**
1. Make sure you have your downloaded zip file from today's session saved somewhere you can find it
2. If you have a GitHub account, great -- if not, you will create one in Session 2

See you in Session 2!

---

**Workshop Complete!**

You have built and downloaded your first web page using nothing but a browser and plain English prompts. Every professional web developer started with a single page just like this one.
