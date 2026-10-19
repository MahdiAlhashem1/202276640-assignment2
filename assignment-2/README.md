# Mahdi Al Hashem — Interactive Portfolio

A responsive personal portfolio built with HTML, CSS, and vanilla JavaScript for **Assignment 2: Interactive Features**. It demonstrates useful interactivity through live project filtering, persistent theme preferences, accessible project details, and a contact form validation demo.

**Student:** Mahdi Al Hashem  
**Student ID:** `202276640`  
**Repository name:** `202276640-MahdiAlHashem-assignment2`  
**Repository / live URL:** `[ADD AFTER PUBLICATION]`

> **Preparation status:** The site builds on Assignment 1 (hero text, About text, skills list, the Personal Portfolio and Study Planner projects with their original images, the dark-mode idea, and the footer year). See [assignment1-integration.md](docs/assignment1-integration.md). Before submission: make and document your own code improvement, export all AI conversations, and complete the declaration truthfully. See [the submission checklist](docs/submission-checklist.md).

## Run locally

There are no runtime dependencies, API keys, build steps, or accounts needed to run the site.

1. Extract the project ZIP.
2. Open a terminal in the `assignment-2` folder (the folder containing `index.html`).
3. Start a local server:

   ```bash
   python3 -m http.server 8000
   ```

   On Windows, use `py -m http.server 8000` if `python3` is unavailable. Alternatively, open the folder in VS Code and use Live Server.
4. Visit **http://localhost:8000** in a browser. Keep the terminal open while testing.
5. Stop the server with **Ctrl+C**.

Opening `index.html` directly is adequate for inspecting the page, but use the local server to test storage consistently. If port 8000 is busy, use `8001` in both the command and the URL. If styles do not load, check that `css/`, `js/`, and `assets/` sit alongside `index.html`.

## What to try

| Feature | How to use it | Expected result |
|---|---|---|
| Category filter | Select **JavaScript** in Projects | Only the two JavaScript feature studies remain |
| Concept filter | Select **Concepts** | Only the Study Planner idea from Assignment 1 remains |
| Live search | Select **All work**, then type `planner` | Only Study Planner remains; the count updates |
| Combined controls | Select **JavaScript**, then search `validation` | Only the contact interaction remains |
| Empty state | Search `no-match-example` | A clear message and **Reset filters** button appear |
| Sorting | Clear search, select **Title A–Z** | The visible cards appear alphabetically |
| Project details | Select **View details** | A keyboard-accessible dialog explains the feature |
| Theme preference | Use the header theme button, then reload | The selected theme persists in this browser |
| Storage failure | Block site storage, then switch theme | Theme changes for the visit and a helpful warning appears |
| Contact validation | Select **Check my message** with blank fields | Inline errors appear and focus moves to the first field |
| Confirmation | Enter a name, valid email, and 20+ character message | A confirmation states that nothing was sent or saved |
| Expandable context | Open **How this portfolio works** | Supporting explanation appears |

The first two cards are the two projects from Assignment 1 (Study Planner is labeled as a concept because it has not been built yet). The other three cards are feature studies describing **this site's own interactive features**, not invented client work.

## Structure

```text
assignment-2/
├── index.html
├── css/styles.css
├── js/
│   ├── core.js                 # pure matching, sorting, and validation rules
│   └── script.js               # browser events and DOM updates
├── assets/images/           # favicon + Assignment 1 project images
├── docs/
│   ├── ai-usage-report.md
│   ├── technical-documentation.md
│   ├── rubric-alignment.md
│   ├── testing-report.md
│   ├── assignment1-integration.md
│   └── submission-checklist.md
├── tests/
│   ├── core.test.cjs
│   └── browser-tests.cjs
├── package.json                 # optional development tests only
├── README.md
└── .gitignore
```

## Design and accessibility

The layout uses semantic HTML, responsive CSS Grid, and shared color variables. It includes keyboard focus outlines, a skip link, labeled fields, live status messages, native modal focus handling, and a reduced-motion setting. Content remains readable when JavaScript is disabled; unavailable enhanced controls are hidden or disabled.

## Data and limitations

Only a theme string (`light` or `dark`) is stored under `mahdi-portfolio-theme`. Form input remains in the current page and is never persisted or transmitted by the application. The contact form is a **validation demo**, not an email service. Project data is local, so no API loading indicator is needed. Native project dialogs require a modern browser; older browsers still show the static project summaries.

## Development tests (optional)

The website itself does not need Node.js. With Node.js 18 or newer installed, run `npm test` for the dependency-free matching, sorting, and validation tests. Run `npm run check` for JavaScript syntax checks. No `npm install` is needed for either command.

For the separate browser regression suite, use a current Node.js LTS release, run `npm install`, run `npx playwright install chromium firefox webkit`, start the Python server above in a second terminal, and then run `npm run test:browser`. Linux systems may additionally need browser OS libraries (`npx playwright install-deps`). These commands download testing tools; they are not part of the deployed website. The browser suite was supplied but could not run in the preparation environment because browser downloads were blocked.

See [testing-report.md](docs/testing-report.md) for the actual tested environments and remaining limits. Browser automation is evidence of the listed checks, not a guarantee of every device or assistive technology.

## AI assistance

ChatGPT generated the initial implementation, suggested accessibility and error-handling improvements, helped test the site, and drafted this documentation (C01). Claude merged the Assignment 1 content into the site, updated the tests, ran the browser tests in Chromium, and updated the documentation (C03). A separate Claude chat explained `script.js` line by line and reviewed the code (C02). **The assistant's revisions are AI work; they do not count as the student's own required modifications.** Full scope, evidence instructions, and the unsigned declaration are in [docs/ai-usage-report.md](docs/ai-usage-report.md).

Keep conversation exports and AI artifacts **outside the repository**. Submit them separately in the required AI Evidence ZIP. The supplied evidence scaffold is incomplete until full conversation exports and any other AI use are added.

## Before publishing

Follow [assignment1-integration.md](docs/assignment1-integration.md), then [submission-checklist.md](docs/submission-checklist.md). The latter covers repository naming, genuine commits, optional GitHub Pages deployment, and the two Blackboard deliverables. No public repository or live deployment has been created by this package.
