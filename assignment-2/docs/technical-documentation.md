# Technical documentation

## Scope and architecture

This is a static, client-side portfolio with four small modules:

| Layer | File | Responsibility |
|---|---|---|
| Content | `index.html` | Landmarks, project cards, controls, contact form, dialog shell |
| Presentation | `css/styles.css` | Theme tokens, layout, component styles, responsive rules, motion |
| Rules | `js/core.js` | Side-effect-free project matching, sort comparison, and validation |
| Behavior | `js/script.js` | Theme persistence, browser events, DOM updates, dialogs, feedback |

Immediately invoked functions keep internal variables scoped. The only intentional browser namespace is the frozen `PortfolioCore` object shared by the two scripts. `core.js` exports the same functions through CommonJS for Node tests; the `typeof module` guard chooses the environment. Both scripts are deferred, preserving their document order after HTML parsing. HTML contains the primary content so a script failure does not produce an empty site. No framework, remote font, image download, analytics, backend, API key, or third-party runtime script is needed.

## Dynamic project explorer

Each `article.project-card` has a stable `data-project` identifier, category, featured order, and searchable keywords. The `cards` array caches those DOM elements once. `activeCategory`, the search input, and the sort selection are the current explorer state.

`updateProjects()`:

1. Trims and lowercases the query.
2. Tests both category membership and text matching for every card.
3. Sets the native `hidden` property, which also removes unmatched interactive elements from keyboard navigation.
4. Sorts a copy of the card array and moves existing DOM nodes into that order.
5. Announces the result count and shows the resettable empty state when needed.

Matching is **category AND query**. Search is a case-insensitive substring match across the card's text and extra keywords. It does not perform fuzzy search. Restoring Featured sorts by the original numeric `data-order`. Reset clears all explorer controls and focuses the search field.

Matching is O(n); sorting is O(n log n). For five cards this is negligible, so a debounce would add delay without useful benefit. If the dataset grows substantially, cache normalized search text and consider debouncing or server-side search.

## Theme and basic data handling

CSS custom properties define the complete light and dark palettes. `applyTheme()` changes `data-theme` on the root element and keeps the button's text, accessible name, and pressed state synchronized.

On load, a valid saved theme takes precedence over the operating system preference. Unknown stored values are ignored. If no valid preference exists, the initial system setting is used. This implementation samples the system setting on page load; it does not follow later operating system theme changes during the same visit.

Every storage read and write is inside `try/catch`. If browser policy blocks storage, the theme still works in memory, and a persistent status message explains that the user can allow site storage to save preferences. Successful storage feedback disappears after five seconds. The stored value is a short string, not JSON, so no parse step is needed.

**Key:** `mahdi-portfolio-theme`  
**Allowed values:** `light`, `dark`  
**Stored personal information:** none

Use an HTTP server for repeatable testing. MDN documents that `file:` storage behavior varies by browser. A small light-theme flash may occur before the deferred script applies a saved dark preference; this is a known tradeoff of keeping executable JavaScript out of the document head.

## Project details

The `studies` object maps each project identifier to a title, summary, learning points, technologies, and an action destination. Text is assigned through `textContent`; list items are created using DOM methods. User-provided strings are never inserted using `innerHTML`.

The native `<dialog>` uses `showModal()` to contain keyboard focus. It has a labeled heading, a visible close button, and native Escape dismissal. Closing returns focus to the trigger. Selecting the action closes the dialog and deliberately focuses the destination control or section. Page scrolling is locked only while a modal is open. If `showModal` is unavailable, detail buttons remain hidden and card summaries are still readable.

## Form validation and feedback

This form demonstrates the assignment's data-handling option without requiring an email server. Its action never sends a network request.

| Input | Rules after trimming | Feedback |
|---|---|---|
| Name | Required; 2–60 characters; no Latin-only restriction | Name-specific error |
| Email | Required; browser email validity plus a simple domain-dot check; maximum 254 characters | Example of expected format |
| Message | Required; 20–1,000 characters | Exact permitted length |

`validationMessage(name, value, typeMismatch)` in `core.js` computes one message per field. `validateField()` in `script.js` passes the browser's native type-mismatch result and updates the adjacent message, `aria-invalid`, and visibility. Submission prevents the default action, validates **all** fields, summarizes the count of errors, and focuses the first invalid field. Editing a previously invalid field checks it again and removes stale form-level confirmation. The message counter shows the raw input length; the minimum-length validation uses trimmed text.

The email check is deliberately simple and is not a complete RFC parser or a deliverability test. A production form also needs a real endpoint, server-side validation, abuse protection, and appropriate data handling. The demo tells the visitor that their message was **not sent or saved**.

## Responsive layout and accessibility

- Desktop: two-column hero, work grid, About, and Contact.
- At 960px: smaller gaps and adjusted illustration sizes.
- At 700px: a single-column content layout; compact header.
- At 380px: stacked search/sort controls and tighter header spacing.
- Forms use 16px input text and visible labels; controls generally provide at least a 44px height.
- Native buttons and links retain expected keyboard behavior.
- A skip link bypasses navigation, and focus rings use a separate color token.
- Result counts, theme changes, and form feedback use polite live regions.
- Errors are associated with fields through `aria-describedby` and `aria-invalid`.
- Decorative artwork is CSS-based and marked `aria-hidden`; the two Assignment 1 project images have descriptive `alt` text, fixed `width`/`height` (no layout shift), and `loading="lazy"`.
- `prefers-reduced-motion: reduce` removes transitions, animation, and smooth scrolling.
- With JavaScript disabled, static content and native About expansion still work; enhanced controls are unavailable with explanatory text.

These are implemented accessibility measures, not a formal WCAG certification. Complete real screen-reader and zoom checks before a production release.

## Animation and performance

Transitions are limited to roughly 180–200ms for buttons, colors, and cards. Form feedback has a short fade/translation. There are no perpetual animations. Styles use system fonts and CSS illustrations, avoiding network dependencies and large raster assets. Images are a tiny local SVG favicon and the two small SVG project illustrations from Assignment 1. Production assets have no bundling requirement. Detailed checks are recorded in `testing-report.md`.

## Extending the site

To add genuine work, add a semantic article with a unique `data-project`, category, order, and keywords. Add a corresponding entry to `studies` if it needs details. Update the All work badge, explanatory copy, and tests to reflect the new count. If adding a category, update its filter button as well.

Assignment 1 has been integrated; `assignment1-integration.md` lists exactly what was kept and what changed. The `Concepts` category (`data-category="concept"`) is for ideas that are not built yet, such as Study Planner.

## References checked during preparation

- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — persistence, exceptions, and local-file limitations.
- [MDN: dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) — native modal behavior and accessibility.
- [GitHub: creating a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) — public repository setup.

Accessed 19 October 2026. These references informed specific decisions; no third-party portfolio template was copied.
