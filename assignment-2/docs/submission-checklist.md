# Submission checklist

## 1. Complete the real portfolio

- [x] Integrate the actual Assignment 1 source and document the before/after differences (done with Claude, C03; review it yourself).
- [ ] Verify your name and student ID (`202276640`, taken from your Assignment 1 ZIP name).
- [ ] Use only genuine personal and project claims.
- [ ] Make a meaningful code improvement yourself, explain it in `ai-usage-report.md`, and preserve the original AI snapshots.
- [ ] Review the JavaScript walkthrough and answer the understanding questions.
- [ ] Retest filters, combined search, sorting, empty-state reset, theme reload, dialogs, and invalid/valid form input.
- [ ] Check keyboard navigation, narrow screens, both themes, and reduced motion.

## 2. Create the public GitHub repository

Use the exact pattern **`id-name-assignment2`**, replacing the ID and removing spaces from first/last name. For you: `202276640-MahdiAlHashem-assignment2`.

No repository has been created or published by the delivered files. GitHub authentication and your actual ID are required. Create the repository using your account, choose **Public**, and upload the actual project folder contents so `index.html` sits at the repository root. Keep AI evidence outside it.

For a Git-based workflow, create an empty public remote, then perform genuine commits locally. If you start a new repository from your Assignment 1 files, commit that real baseline **before** integrating the new features. Do not fake dates or claim the generated draft is that baseline. Set your own Git author identity as appropriate.

Example sequence after the original baseline is imported:

```bash
git switch -c feature/interactive-portfolio
git add index.html css/styles.css js/core.js js/script.js assets/images/favicon.svg
git commit -m "Add project explorer, theme preferences, and form feedback" -m "Assisted-by: ChatGPT (model identifier unavailable)"
# Make your own improvement, test it, then commit the actual changed files.
git add README.md docs/ tests/ package.json .gitignore
git commit -m "Document setup, tests, and declared AI assistance" -m "Assisted-by: ChatGPT (model identifier unavailable)"
```

The credit lines above follow the assignment's AI disclosure requirement; use the exact model name if your interface identifies it. Do not claim a specific model without evidence. Review your actual history and merge the finished feature branch into the default branch before submission. Add the real remote and push using GitHub's instructions; no remote URL is assumed here.

- [ ] Repository has the required name and is publicly accessible in a signed-out browser.
- [ ] History contains genuine, meaningful commits reflecting the work.
- [ ] AI-assisted commits carry the required AI credit.
- [ ] README contains the actual repository URL.
- [ ] `.gitignore` excludes full conversations and evidence archives.

## 3. Optional deployment

If using GitHub Pages, select the repository's default branch and root folder in its Pages settings. Keep all asset URLs relative as supplied. Open the actual deployment URL after it is ready and retest the interactions. Deployment is optional for this assignment; a working public repository is required.

## 4. Complete the AI evidence

- [ ] Export the full unedited C01 conversation (ChatGPT) into `conversations/C01/`.
- [x] C02 (Claude, code explanation and review) added to `conversations/`.
- [ ] Export the full unedited C03 conversation (Claude, Assignment 1 integration and this report) into `conversations/`, using the share link and/or print-to-PDF, after your last message in that chat.
- [ ] Add every other AI conversation used, with matching usage-log rows.
- [ ] Preserve all original generated snapshots in `artifacts/`, including A03 and A04 (the projects Claude returned in C03, before your own edits).
- [ ] Record your own changes and tests separately and accurately.
- [ ] Confirm the full report and evidence are complete, then fill in the declaration with your name, ID, and date.
- [ ] Remove the draft warnings only after the outstanding requirements are actually satisfied.
- [ ] Package the completed evidence as `202276640-MahdiAlHashem-assignment2-ai-evidence.zip`.
- [ ] Do not commit this ZIP or conversation logs to the public repository.

## 5. Submit on Blackboard

- [ ] Submit the public **repository link**.
- [ ] Upload the completed **AI Evidence ZIP**.
- [ ] Verify the final upload opens and contains both `conversations/` and `artifacts/`.

**Do not submit the evidence scaffold as finished evidence.** The assignment says missing AI declaration or evidence results in zero. A signature or understanding statement must be your own truthful declaration.
