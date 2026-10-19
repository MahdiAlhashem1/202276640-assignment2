/* Shared, side-effect-free rules used by the browser and the Node.js tests. */
((root) => {
  'use strict';

  function matchesProject(project, category, query) {
    const normalized = query.trim().toLocaleLowerCase();
    const matchesCategory = category === 'all' || project.category === category;
    return matchesCategory && project.searchText.toLocaleLowerCase().includes(normalized);
  }

  function compareProjects(first, second, mode) {
    return mode === 'title'
      ? first.title.localeCompare(second.title)
      : Number(first.order) - Number(second.order);
  }

  function validationMessage(name, rawValue, typeMismatch = false) {
    const value = rawValue.trim();
    if (!value) {
      const label = name === 'name' ? 'your name' : name === 'email' ? 'your email address' : 'a message';
      return `Please enter ${label}.`;
    }
    if (name === 'name' && (value.length < 2 || value.length > 60)) {
      return 'Use a name between 2 and 60 characters.';
    }
    if (name === 'email' && (typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length > 254)) {
      return 'Enter a valid email address, such as you@example.com.';
    }
    if (name === 'message' && (value.length < 20 || value.length > 1000)) {
      return 'Write a message between 20 and 1,000 characters.';
    }
    return '';
  }

  const rules = Object.freeze({ matchesProject, compareProjects, validationMessage });
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = rules;
  } else {
    root.PortfolioCore = rules;
  }
})(globalThis);
