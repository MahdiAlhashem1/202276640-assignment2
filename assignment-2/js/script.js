/* Plain JavaScript keeps the portfolio small and easy to explain. */
(() => {
  'use strict';

  const rules = window.PortfolioCore;

  const themeKey = 'mahdi-portfolio-theme';
  const root = document.documentElement;
  const themeToggle = document.querySelector('#theme-toggle');
  const themeFeedback = document.querySelector('#theme-feedback');
  let themeTimer;

  function applyTheme(theme) {
    const dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    document.querySelector('#theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
  }

  function announceTheme(message, persistent = false) {
    clearTimeout(themeTimer);
    themeFeedback.textContent = message;
    themeFeedback.hidden = false;
    if (!persistent) themeTimer = setTimeout(() => { themeFeedback.hidden = true; }, 5000);
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let initialTheme = prefersDark ? 'dark' : 'light';
  try {
    const saved = localStorage.getItem(themeKey);
    if (saved === 'light' || saved === 'dark') initialTheme = saved;
  } catch {
    announceTheme('Preference storage is unavailable. You can still change the theme for this visit.', true);
  }
  applyTheme(initialTheme);
  themeToggle.hidden = false;

  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try {
      localStorage.setItem(themeKey, nextTheme);
      announceTheme(`${nextTheme === 'dark' ? 'Dark' : 'Light'} theme saved for your next visit.`);
    } catch {
      announceTheme('Theme changed for this visit. Your browser blocked saving it; allow site storage to remember it.', true);
    }
  });

  const grid = document.querySelector('#project-grid');
  const cards = [...grid.querySelectorAll('.project-card')];
  const search = document.querySelector('#project-search');
  const sort = document.querySelector('#project-sort');
  const filters = [...document.querySelectorAll('[data-filter]')];
  let activeCategory = 'all';

  function updateProjects() {
    const query = search.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    // Search and category use AND, so both controls work together.
    cards.forEach((card) => {
      const visible = rules.matchesProject({
        category: card.dataset.category,
        searchText: `${card.textContent} ${card.dataset.keywords}`
      }, activeCategory, query);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    const ordered = [...cards].sort((a, b) => {
      return rules.compareProjects(
        { title: a.querySelector('h3').textContent, order: a.dataset.order },
        { title: b.querySelector('h3').textContent, order: b.dataset.order },
        sort.value
      );
    });
    ordered.forEach((card) => grid.append(card));
    document.querySelector('#results-count').textContent = `${visibleCount} of ${cards.length} ${visibleCount === 1 ? 'project' : 'projects'} shown`;
    document.querySelector('#empty-state').hidden = visibleCount !== 0;
  }

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.filter;
      filters.forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
      updateProjects();
    });
  });
  search.addEventListener('input', updateProjects);
  sort.addEventListener('change', updateProjects);
  document.querySelector('#reset-filters').addEventListener('click', () => {
    activeCategory = 'all';
    search.value = '';
    sort.value = 'featured';
    filters.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === 'all')));
    updateProjects();
    search.focus();
  });
  document.querySelector('#project-controls').hidden = false;
  updateProjects();

  const studies = {
    portfolio: {
      title: 'Personal Portfolio', category: 'Front-end / Assignment 1 project',
      summary: 'The website you are on. Assignment 1 built it as a responsive page with About, Projects, Skills, and Contact sections; Assignment 2 adds the interactive features.',
      highlights: ['Assignment 1: semantic sections, two project cards, a dark-mode button, and a demo contact form.', 'Assignment 2: search, filters, sorting, project details, a remembered theme, and real form validation.', 'CSS Grid changes two-column layouts into one column on smaller screens.'],
      stack: 'HTML · CSS Grid · JavaScript', target: '#about', action: 'Read about me ↗'
    },
    planner: {
      title: 'Study Planner', category: 'Concept / Assignment 1 project idea',
      summary: 'A simple project idea that helps students organize tasks and deadlines. It is a concept from Assignment 1 and has not been built yet.',
      highlights: ['Planned: add tasks with a title and due date.', 'Planned: sort tasks by the nearest deadline.', 'Planned: save tasks in the browser so they are still there after a reload.'],
      stack: 'Planned: HTML · CSS · JavaScript · localStorage', target: '#contact-name', action: 'Share feedback on the idea ↗'
    },
    theme: {
      title: 'A different light', category: 'UI systems / feature study',
      summary: 'A small, reusable color system lets visitors choose a light or dark interface and keeps that choice between visits.',
      highlights: ['CSS custom properties define both palettes in one place.', 'localStorage saves only the theme string, never contact details.', 'A try/catch keeps the switch working when storage is blocked and explains why the preference could not be saved.'],
      stack: 'CSS custom properties · localStorage · Error handling', target: '#theme-toggle', action: 'Try the theme switch ↗'
    },
    explorer: {
      title: 'Find your focus', category: 'JavaScript / feature study',
      summary: 'Live search, category filters, and sorting work together so visitors can find relevant work without leaving the page.',
      highlights: ['The input event updates visible cards while you type.', 'Search matches titles, descriptions, and technology keywords; the category further narrows the results.', 'A live result count and resettable empty state explain what happened and how to recover.'],
      stack: 'DOM events · Array.filter-style matching · Array.sort', target: '#project-search', action: 'Try the project search ↗'
    },
    contact: {
      title: 'Every input matters', category: 'JavaScript / feature study',
      summary: 'This local form demonstration validates a name, email address, and message, then provides honest confirmation. It does not send or save information.',
      highlights: ['Whitespace-only values are rejected; names need 2–60 characters and messages need 20–1,000.', 'Errors appear next to the relevant input, and focus moves to the first invalid field.', 'The success message uses textContent so user input is displayed as text, never interpreted as HTML.'],
      stack: 'Form events · Constraint validation · Accessible feedback', target: '#contact-name', action: 'Try the form demo ↗'
    }
  };
  const dialog = document.querySelector('#project-dialog');
  const dialogAction = document.querySelector('#dialog-action');
  let dialogTrigger = null;

  function closeStudy() {
    dialog.close();
  }

  // Native dialogs supply focus containment and Escape support in modern browsers.
  if (typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-open]').forEach((button) => {
      button.hidden = false;
      button.addEventListener('click', () => {
        const study = studies[button.dataset.open];
        dialogTrigger = button;
        document.querySelector('#dialog-title').textContent = study.title;
        document.querySelector('#dialog-category').textContent = study.category;
        document.querySelector('#dialog-summary').textContent = study.summary;
        document.querySelector('#dialog-stack').textContent = study.stack;
        const list = document.querySelector('#dialog-highlights');
        list.replaceChildren(...study.highlights.map((text) => {
          const item = document.createElement('li');
          item.textContent = text;
          return item;
        }));
        dialogAction.href = study.target;
        dialogAction.textContent = study.action;
        dialog.showModal();
        document.body.classList.add('modal-open');
      });
    });
    document.querySelector('#close-dialog').addEventListener('click', closeStudy);
    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      dialogTrigger?.focus({ preventScroll: true });
    });
    dialogAction.addEventListener('click', (event) => {
      event.preventDefault();
      const target = document.querySelector(dialogAction.getAttribute('href'));
      // Clear the trigger so the close event does not steal focus from the destination.
      dialogTrigger = null;
      closeStudy();
      target.scrollIntoView({ block: 'center' });
      if (!target.matches('button, input, textarea, a')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  const form = document.querySelector('#contact-form');
  const fields = [...form.querySelectorAll('input, textarea')];
  const formFeedback = document.querySelector('#form-feedback');
  let hasSubmitted = false;

  function validateField(field) {
    const error = rules.validationMessage(field.name, field.value, field.validity.typeMismatch);
    const errorElement = document.querySelector(`#${field.name}-error`);
    field.setAttribute('aria-invalid', String(Boolean(error)));
    errorElement.textContent = error;
    errorElement.hidden = !error;
    return !error;
  }

  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      if (field.value.length || hasSubmitted) validateField(field);
    });
    field.addEventListener('input', () => {
      if (hasSubmitted || field.getAttribute('aria-invalid') === 'true') validateField(field);
      if (field.name === 'message') document.querySelector('#message-count').textContent = `${field.value.length} / 1000`;
      // An edited message has not yet been validated as a whole.
      formFeedback.hidden = true;
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    hasSubmitted = true;
    const validity = fields.map(validateField);
    const invalidIndex = validity.indexOf(false);
    formFeedback.hidden = false;
    if (invalidIndex !== -1) {
      const errors = validity.filter((valid) => !valid).length;
      formFeedback.dataset.state = 'error';
      formFeedback.textContent = `Please correct ${errors} ${errors === 1 ? 'field' : 'fields'} highlighted above, then check your message again.`;
      fields[invalidIndex].focus();
      return;
    }
    formFeedback.dataset.state = 'success';
    formFeedback.textContent = `Thanks, ${fields[0].value.trim()}! Your message passed validation. This is a demo: nothing was sent or saved. You can edit the fields and check again.`;
  });
  document.querySelector('#contact-submit').disabled = false;

  // Kept from Assignment 1: show the current year in the footer.
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
