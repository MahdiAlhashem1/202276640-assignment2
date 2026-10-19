# Continuing Assignment 1

Assignment 1 source: `202276640-assignment-1` (supplied as a ZIP). It was merged into the Assignment 2 site in the C03 conversation (Claude). Everything below can be checked by comparing the two folders.

## What was kept from Assignment 1

| Assignment 1 element | Where it is now |
|---|---|
| Tagline “Student and beginner web developer” | Hero eyebrow |
| “Hello, I’m Mahdi Al Hashem.” and “I enjoy learning web development and creating simple, useful websites.” | Hero heading and description |
| “View my projects” button | Hero button (links to `#projects`) |
| Nav: About, Projects, Contact | Same three links (Projects section keeps the A1 id `projects`) |
| About Me paragraph | About section (split into two paragraphs) |
| Skills: HTML, CSS, JavaScript, UI/UX designing | “My Skills” list in About |
| Project card “Personal Portfolio” + `project-one.svg` | First project card, same text and image |
| Project card “Study Planner” + `project-two.svg` | Second card, same text and image, labeled **Concept** |
| Dark-mode button | Theme toggle, now saved in `localStorage` |
| Contact form (name, email, message) | Same three fields, now validated |
| Footer “© year Mahdi Al Hashem” set by JavaScript | Same footer and same `#year` script |

## Before and after

| Area | Assignment 1 | Assignment 2 | Verified by you |
|---|---|---|---|
| Projects | Two static cards | Five cards (2 A1 projects + 3 feature studies); live search, category filters incl. **Concepts**, sorting, result count, empty state with reset, details dialog | `[date / result]` |
| Theme | Button toggles a `dark` class; choice lost on reload | Light/dark palette from CSS variables; choice saved; follows system theme on first visit; message if storage is blocked | `[date / result]` |
| Contact | `required` attributes; shows “Thank you!” and resets without checking | Per-field validation (name 2–60, valid email, message 20–1000), inline errors, focus on first error, honest confirmation | `[date / result]` |
| Layout and motion | Two-column grid, one column under 650px | Responsive grid with 960/700/380px breakpoints; hover and feedback transitions; reduced-motion support; skip link | `[date / result]` |
| About | Text and skills list | Same text and skills, plus an expandable “What changed since Assignment 1” panel | `[date / result]` |

Fill in the last column after you test each row yourself.
