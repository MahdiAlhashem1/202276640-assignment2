# Testing report

**Date:** 19 October 2026  
**Performed by:** the AI assistant during preparation  
**Environment:** Linux, Node.js 24.19.0, Python 3.12.14

## Executed checks

| Check | Actual result | Scope |
|---|---|---|
| `npm test` | **15 passed, 0 failed** | Pure matching, sorting, and validation rules used by the website |
| `npm run check` | **Passed** | Syntax of both production JavaScript files |
| Browser test script syntax | **Passed** | Parses successfully; its browser assertions have not run |
| HTML/resource/static checks | **64 passed** | Unique IDs; one main/H1; label and ARIA references; fragment links; asset existence; local HTTP responses; no form endpoint; no `innerHTML`; palette contrast calculations |
| Primary text and button color pairs | **28 pairs passed 4.5:1** | Calculated contrast of theme tokens; minimum tested ratio 5.11:1 |
| Production asset size | **47,852 bytes total, uncompressed** | HTML, CSS, both JavaScript files, and favicon; excludes docs and optional testing tools |

The 28 color-pair checks are included within the 64 static checks. Asset size is a measured file-size total, **not a Lighthouse score or a timed network benchmark**. Static contrast calculations do not certify every composited visual state or WCAG conformance.

## Rules exercised by the passing tests

The tests cover blank/whitespace search, category selection, case-insensitive keywords, combined category and query matching, no-result cases, markup-like search text, alphabetical and featured ordering, sort ties, blank fields, trimmed lengths, international names, valid and malformed email examples, browser-reported email mismatch, overlong values, inclusive message boundaries, and a complete set of valid inputs.

Run the same checks from the project directory:

```bash
npm test
npm run check
```

No downloaded dependency is needed for these two commands. The tests call the same functions loaded by the website through `js/core.js`; they do not exercise the browser event loop, native rendering, or real focus behavior.

## Browser testing after Assignment 1 integration (C03, Claude) — 19 October 2026

Environment: Linux, Node.js 22.22.0, Playwright 1.56.0, Chromium (pre-installed).

| Check | Actual result |
|---|---|
| `npm test` | **16 passed, 0 failed** (added a `concept` category test) |
| `npm run check` | **Passed** |
| `BROWSERS=chromium node tests/browser-tests.cjs` | **PASS chromium**: explorer (5 cards, Concepts filter, `planner` search), dialog focus, theme persistence and blocked storage, validation, text safety, no overflow at 320/375/768/1440px, reduced motion, no-JS content, both A1 images load, footer year |
| Screenshots (1366px light, 1366px dark, 390px mobile) | Reviewed visually: layout, both themes, and A1 images display correctly |

**Firefox and WebKit were not run** (not installed in this environment). Run `npm run test:browser` on your machine to cover them.

`tests/browser-tests.cjs` supplies runnable end-to-end checks for those three engines. After installing the optional Playwright tooling and starting the local server, run:

```bash
npm install
npx playwright install chromium firefox webkit
npm run test:browser
```

The script checks actual DOM filtering/sorting, result reset, dialog visibility and focus return, theme persistence, invalid/valid form feedback, literal rendering of markup-like names, viewport overflow at 320/375/768/1440px, reduced motion, blocked storage, and no-JavaScript content. It reports failures, including missing browsers, rather than treating them as passes.

## Manual checks to complete on your machine

| Check | Expected result | Student result/date |
|---|---|---|
| Desktop Chrome/Edge, Firefox, Safari where available | No errors, usable controls, correct result counts | `[PENDING]` |
| Real phone, portrait and landscape | Readable layout, no horizontal scrolling, usable form | `[PENDING]` |
| Keyboard only | Skip link works; visible focus; modal contains focus; Escape returns it | `[PENDING]` |
| 200% browser zoom | Content remains readable and operable | `[PENDING]` |
| Screen reader | Labels, result count, and errors are announced sensibly | `[PENDING]` |
| Light and dark themes | Legible content and controls throughout the page | `[PENDING]` |
| Theme then reload | Selection persists; failure explains how to proceed | `[PENDING]` |
| Form with blanks / invalid email / short message | Helpful errors and first-error focus | `[PENDING]` |
| Valid form | Explicit local-demo confirmation; no message sent | `[PENDING]` |
| OS reduced-motion setting | No animated transitions or smooth scrolling | `[PENDING]` |
| JavaScript disabled | Static content and About expansion remain available | `[PENDING]` |
| After Assignment 1 integration | Original content and new features both work | Chromium automated pass by Claude (C03); your own check `[PENDING]` |

## AI revisions made during preparation

1. Preserved the original generated website as evidence artifact A01.
2. Moved matching, sorting, and validation rules to `js/core.js` so they could be tested directly with the built-in Node test runner despite unavailable browser downloads.
3. Updated the browser script to use those shared rules and kept both scripts deferred in the correct order.
4. Added boundary and interaction-rule tests, optional browser tests, and precise test limitations.
5. Expanded HTML/CSS formatting to make the generated source easier to review.

All these revisions were made by the assistant. They are **not** the student's own required modifications.
