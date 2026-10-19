/* Optional end-to-end checks. Start the local HTTP server before running. */
const assert = require('node:assert/strict');
const { chromium, firefox, webkit } = require('playwright');
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:8000';
const browsers = { chromium, firefox, webkit };
const engines = (process.env.BROWSERS || 'chromium,firefox,webkit').split(',');

async function testBrowser(name) {
  const browser = await browsers[name].launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1366, height: 900 }, colorScheme: 'light' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(baseURL);
    await page.waitForSelector('#project-controls', { state: 'visible' });
    const count = () => page.locator('.project-card:visible').count();
    assert.equal(await count(), 5);
    await page.locator('[data-filter="javascript"]').click();
    assert.equal(await count(), 2);
    await page.locator('#project-search').fill('validation');
    assert.equal(await count(), 1);
    await page.locator('#project-search').fill('theme');
    assert.equal(await count(), 0);
    assert.equal(await page.locator('#empty-state').isVisible(), true);
    await page.locator('#reset-filters').click();
    assert.equal(await count(), 5);
    await page.locator('[data-filter="concept"]').click();
    assert.deepEqual(await page.locator('.project-card:visible h3').allTextContents(), ['Study Planner']);
    await page.locator('[data-filter="all"]').click();
    await page.locator('#project-search').fill('planner');
    assert.equal(await count(), 1);
    await page.locator('#project-search').fill('');
    assert.equal(await count(), 5);
    assert.equal(await page.locator('.project-art img').evaluateAll(imgs => imgs.every(img => img.complete && img.naturalWidth > 0)), true);
    assert.equal(await page.locator('#year').textContent(), String(new Date().getFullYear()));
    assert.equal(await page.locator('#project-search').evaluate(el => el === document.activeElement), true);
    await page.locator('#project-sort').selectOption('title');
    assert.deepEqual(await page.locator('.project-card h3').allTextContents(), ['A different light', 'Every input matters', 'Find your focus', 'Personal Portfolio', 'Study Planner']);
    await page.locator('#project-sort').selectOption('featured');
    assert.equal(await page.locator('.project-card h3').first().textContent(), 'Personal Portfolio');

    await page.locator('[data-open="portfolio"]').click();
    assert.equal(await page.locator('#project-dialog').isVisible(), true);
    assert.equal(await page.locator('#close-dialog').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#project-dialog').isVisible(), false);
    assert.equal(await page.locator('[data-open="portfolio"]').evaluate(el => el === document.activeElement), true);
    await page.locator('[data-open="theme"]').click();
    await page.locator('#dialog-action').click();
    await page.waitForFunction(() => document.activeElement.id === 'theme-toggle');

    await page.locator('#theme-toggle').click();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    await page.reload();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    assert.equal(await page.evaluate(() => localStorage.getItem('mahdi-portfolio-theme')), 'dark');

    await page.locator('#contact-submit').click();
    assert.equal(await page.locator('[aria-invalid="true"]').count(), 3);
    assert.equal(await page.locator('#contact-name').evaluate(el => el === document.activeElement), true);
    await page.locator('#contact-name').fill('مهدي الهاشم');
    await page.locator('#contact-email').fill('not-valid');
    await page.locator('#contact-message').fill('short');
    await page.locator('#contact-submit').click();
    assert.equal(await page.locator('[aria-invalid="true"]').count(), 2);
    await page.locator('#contact-email').fill('student@example.com');
    await page.locator('#contact-message').fill('I would like to discuss a new portfolio idea.');
    await page.locator('#contact-submit').click();
    assert.equal(await page.locator('[aria-invalid="true"]').count(), 0);
    assert.match(await page.locator('#form-feedback').textContent(), /nothing was sent or saved/);
    assert.match(await page.locator('#form-feedback').textContent(), /مهدي الهاشم/);
    await page.locator('#contact-message').fill('An updated message that needs checking again.');
    assert.equal(await page.locator('#form-feedback').isVisible(), false);
    await page.locator('#contact-name').fill('<img src=x onerror=alert(1)>');
    await page.locator('#contact-submit').click();
    assert.equal(await page.locator('#form-feedback img').count(), 0);
    assert.match(await page.locator('#form-feedback').textContent(), /<img/);

    for (const width of [320, 375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, `horizontal overflow at ${width}px`);
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior), 'auto');
    assert.equal(await page.locator('.button').first().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
    assert.deepEqual(errors, []);
    await context.close();

    const blocked = await browser.newContext();
    await blocked.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked for testing', 'SecurityError'); } });
    });
    const blockedPage = await blocked.newPage();
    await blockedPage.goto(baseURL);
    await blockedPage.waitForSelector('#theme-toggle', { state: 'visible' });
    await blockedPage.locator('#theme-toggle').click();
    assert.match(await blockedPage.locator('#theme-feedback').textContent(), /blocked saving/);
    assert.equal(await blockedPage.locator('#contact-submit').isEnabled(), true);
    await blocked.close();

    const noJS = await browser.newContext({ javaScriptEnabled: false });
    const staticPage = await noJS.newPage();
    await staticPage.goto(baseURL);
    assert.equal(await staticPage.locator('.project-card:visible').count(), 5);
    assert.equal(await staticPage.locator('#project-controls').isVisible(), false);
    assert.equal(await staticPage.locator('#contact-submit').isDisabled(), true);
    await noJS.close();
    console.log(`PASS ${name}: explorer, dialog focus, theme persistence/failure, validation, text safety, responsive overflow, reduced motion, and no-JS content.`);
  } finally {
    await browser.close();
  }
}

(async () => {
  let failures = 0;
  for (const engine of engines) {
    try { await testBrowser(engine); }
    catch (error) { failures += 1; console.error(`FAIL ${engine}: ${error.message}`); }
  }
  process.exitCode = failures ? 1 : 0;
})();
