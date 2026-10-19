# AI Usage Report — Assignment 2: Interactive Features

**Name:** Mahdi Al Hashem  
**Student ID:** 202276640  
**Course:** SWE 363  
**Repository:** `202276640-MahdiAlHashem-assignment2`

> Fields marked ✏️ must be completed by me personally before submission.

---

## 1. Summary

I used ChatGPT (C01) and Claude (C02, C03). ChatGPT built the first version of the site. Claude explained the code to me and reviewed it (C02), then added my Assignment 1 content and helped with the tests and docs (C03). My own part is in Section 6. Full conversations are in the evidence ZIP.

## 2. Tools used and how

| Tool | Model | How I used it |
|---|---|---|
| ChatGPT (OpenAI) | Exact model name not shown in the interface | Analyzed the assignment and rubric; generated the first HTML, CSS, and JavaScript; suggested accessibility and error-handling features; split the logic into `core.js` so it could be unit-tested; wrote unit tests and a browser test script; drafted the README and docs. |
| Claude (Anthropic) | `claude-opus-5-5` | **C02:** explained `js/script.js` line by line; reviewed my code and listed improvements; explained good commit messages; checked my project against the instructor's requirements. **C03:** merged my Assignment 1 site into the Assignment 2 draft; added a *Concepts* filter for the Study Planner idea; updated the unit and browser tests; ran the browser tests in Chromium and checked screenshots; updated the README and docs; drafted this report; organized the evidence ZIP. |

Python, Node.js, and Playwright were only used to run and test the site. They are not generative AI.

## 3. Usage log

| ID | Tool (model) | Date | Purpose | Files affected | What I changed and how I verified it |
|---|---|---|---|---|---|
| C01 | ChatGPT (model not shown) | 2026-10-19 | Plan features from the rubric; generate the interactive site; add validation, error handling, and accessibility; write tests and docs | `index.html`, `css/styles.css`, `js/core.js`, `js/script.js`, `assets/images/favicon.svg`, `tests/*`, `package.json`, `.gitignore`, `README.md`, `docs/*` | The draft did not include my Assignment 1 work, so I continued in C02 to merge it. ✏️ *My review/test of this output:* `[e.g. "Read script.js and core.js line by line; tested filters, search, theme and form in Chrome on 2026-10-__."]` |
| C02 | Claude (claude-opus-5-5) | 2026-10-19 | Line-by-line explanation of `js/script.js`; code review; commit-message advice; requirements check | None directly (explanations and advice only) | I used the explanation to study how the theme, explorer, dialog, and form code work (Section 5). The review listed 10 possible fixes (e.g. theme flash on load, search matching hidden text). ✏️ *Which suggestions I used, if any:* `[e.g. "I implemented review fix #2 myself — see Section 6"]` |
| C03 | Claude (claude-opus-5-5) | 2026-10-19 | Integrate Assignment 1 content and images; add Concepts filter; update tests; run Chromium tests; update docs; write this report; organize the evidence ZIP | `index.html`, `css/styles.css`, `js/script.js`, `assets/images/project-one.svg`, `assets/images/project-two.svg`, `tests/*`, `README.md`, `docs/*` | Automated checks: 16/16 unit tests and the Chromium browser suite passed (see `testing-report.md`). ✏️ *My own change and test:* `[one line, see Section 6]` |
| A01 | ChatGPT | 2026-10-19 | First generated website, before any revisions | Whole site | Kept as evidence; later revised in C01 and C02. |
| A02 | ChatGPT | 2026-10-19 | Final C01 project, before Assignment 1 integration | Whole project | Used as the starting point for C02. |
| A03 | Claude | 2026-10-19 | Project as first returned by Claude in C03 (Assignment 1 integrated) | Whole project | Starting point for the final report. |
| A04 | Claude | 2026-10-19 | Final project returned by Claude in C03, before my own edits (includes this report) | Whole project | Compared with my final repository to show my own changes. |

## 4. What the AI produced vs. what came from me

| Part of the site | Source |
|---|---|
| Text in the hero, About, skills list, project titles and descriptions | **My Assignment 1** (re-used by Claude in C03) |
| Project images `project-one.svg`, `project-two.svg` | **My Assignment 1** |
| Dark-mode idea, contact form fields, footer year script | **My Assignment 1**, extended by AI |
| Search, category filters, sorting, empty state, details dialog | ChatGPT (C01); Concepts filter added by Claude (C03) |
| Saved theme with `localStorage` and blocked-storage message | ChatGPT (C01) |
| Form validation with inline errors | ChatGPT (C01) |
| Unit tests and browser tests | ChatGPT (C01), updated by Claude (C03) |
| Line-by-line explanation and code review of `script.js` | Claude (C02), used for my own learning |
| ✏️ My own improvement | Me (Section 6) |

## 5. Understanding the AI-generated code

These are the main parts of the code and how they work. I studied them using Claude's line-by-line explanation in C02.

**Project explorer (`js/script.js` → `updateProjects`, `js/core.js` → `matchesProject`, `compareProjects`)**
- Each card has `data-category`, `data-order`, and `data-keywords` attributes. On every `input` (search) or `click` (filter), `updateProjects()` runs again.
- A card is shown only if it matches the category **AND** the search text. AND is used because each control narrows the results; OR would show more cards when the user adds a filter, which is confusing.
- Sorting copies the array (`[...cards]`) so the original order list is never changed. "Featured" sorts by `data-order`, which returns the cards to their original order.
- When nothing matches, the empty-state message and a **Reset filters** button appear. The result count is in an `aria-live` region so screen readers announce it.

**Theme preference (`applyTheme`, `localStorage`)**
- The theme is stored as the string `light` or `dark` under `mahdi-portfolio-theme`. On load, the saved value is used only if it is exactly one of those two values, so a broken or edited value cannot break the page.
- `localStorage` can throw an error (e.g. private mode or blocked storage). The calls are wrapped in `try/catch`, so the theme still changes for the visit and the user sees a message explaining that it couldn't be saved.
- In Assignment 1 the button only toggled a class, so the choice was lost on reload.

**Contact form validation (`validationMessage`, `validateField`)**
- `event.preventDefault()` stops the browser from submitting the form and reloading the page, because there is no backend.
- Values are trimmed first, so a field with only spaces counts as empty. Rules: name 2–60 characters, a valid email, message 20–1000 characters.
- Errors appear next to each field and are linked with `aria-describedby` and `aria-invalid`. Focus moves to the first wrong field.
- The success message uses `textContent`, not `innerHTML`, so anything typed (like `<img onerror=…>`) is shown as text and never runs as code.
- Client-side checks only help the user. A real contact form would also need server-side validation, because browser code can be bypassed.

**Animation and accessibility (`css/styles.css`)**
- Hover and feedback transitions are short (about 200 ms). The `prefers-reduced-motion` media query turns transitions and smooth scrolling off for users who request it.
- Without JavaScript, all content still shows; only the interactive controls are hidden.

## 6. My own improvement ✏️

**What I changed:** `[Describe your change: file, function, before → after. Ideas: fix one problem from the C02 code review yourself (e.g. #2, make the search ignore hidden text), or build the first part of the Study Planner.]`

**Why it improves the site:** `[1–2 sentences]`

**How I tested it:** `[Steps you followed and the result you saw, with the date]`

## 7. Benefits, challenges, and what I learned

**Benefits**
- AI helped me turn the rubric into a list of concrete features and showed accessible ways to build them (live regions, focus handling, reduced motion).
- Moving the logic into `core.js` meant it could be tested without a browser, which taught me how separating logic from the DOM makes code easier to test.
- The automated browser tests checked things I would have missed by hand, such as horizontal overflow at 320px and what happens when storage is blocked.

**Challenges**
- The first draft (C01) was made without my Assignment 1 files, so it replaced my content with generic text. I had to give the AI my Assignment 1 project in C03 to keep my real work.
- The code review in C02 showed that AI code that passes its tests can still have real problems, for example a short flash of the light theme for dark-mode users, and a search that also matches hidden screen-reader text.
- The generated project was larger than my Assignment 1 code, so I had to study it carefully to understand every function before submitting.
- One of the new browser tests failed at first; the cause was the test itself (it clicked a button that only appears when there are no results), not the site. Tests can be wrong too.

**What I learned**
- How to use `input`/`click` events to update the page, `data-*` attributes to store information on elements, and `Array.sort` with a copied array.
- How to use `localStorage` safely with `try/catch` and value checks.
- How to write helpful form validation and why `textContent` is safer than `innerHTML`.

## 8. Responsible use

- I gave the AI only my own project files and the assignment brief. No passwords, API keys, or other people's personal data were shared.
- No fake projects or data: the Study Planner is labeled as a concept because it isn't built yet, and the three feature-study cards describe this site's own features.
- AI-assisted commits include an `Assisted-by:` line, e.g. `Assisted-by: Claude (claude-opus-5-5)` or `Assisted-by: ChatGPT`.
- Conversation logs and the evidence ZIP are not committed to the repository (`.gitignore`).

## 9. References

- Anthropic. (2026). *Claude* (claude-opus-5-5) [Large language model]. https://claude.ai
- OpenAI. (2026). *ChatGPT* [Large language model]. https://chatgpt.com

## 10. Evidence

Submitted on Blackboard as `202276640-MahdiAlHashem-assignment2-ai-evidence.zip`:

```text
README.txt
conversations/
  C01_Mahdi_ChatGPT_portfolio-assignment2          (full export + share link)
  C02_Mahdi_Claude_code-explanation-review.md
  C03_Mahdi_Claude_assignment1-integration          (full export + share link)
artifacts/
  A01_Mahdi_ChatGPT_initial-website.zip
  A02_Mahdi_ChatGPT_project-before-edits.zip
  A03_Mahdi_Claude_integrated-project.zip
  A04_Mahdi_Claude_final-project.zip
  manifest.txt
```

## 11. Declaration

> I declare that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.

**Name:** Mahdi Al Hashem  
**Student ID:** 202276640  
**Date:** ✏️ `[date you sign]`
