const test = require('node:test');
const assert = require('node:assert/strict');
const { matchesProject, compareProjects, validationMessage } = require('../js/core.js');

const projects = [
  { title: 'Interface portfolio', category: 'front-end', searchText: 'Interface portfolio HTML CSS responsive', order: 0 },
  { title: 'A different light', category: 'ui-systems', searchText: 'A different light theme localStorage', order: 1 },
  { title: 'Find your focus', category: 'javascript', searchText: 'Find your focus live search filter', order: 2 },
  { title: 'Every input matters', category: 'javascript', searchText: 'Every input matters form validation', order: 3 },
  { title: 'Study Planner', category: 'concept', searchText: 'Study Planner tasks deadlines', order: 4 }
];

test('empty or whitespace search includes all projects in All work', () => {
  assert.equal(projects.filter(p => matchesProject(p, 'all', '   ')).length, 5);
});
test('concept category shows only the planner idea', () => {
  assert.deepEqual(projects.filter(p => matchesProject(p, 'concept', '')).map(p => p.title), ['Study Planner']);
});
test('category restricts results to the selected category', () => {
  assert.deepEqual(projects.filter(p => matchesProject(p, 'javascript', '')).map(p => p.title), ['Find your focus', 'Every input matters']);
});
test('search ignores case and surrounding spaces', () => {
  assert.deepEqual(projects.filter(p => matchesProject(p, 'all', '  THEME  ')).map(p => p.title), ['A different light']);
});
test('search and category must both match', () => {
  assert.equal(projects.filter(p => matchesProject(p, 'javascript', 'theme')).length, 0);
  assert.equal(projects.filter(p => matchesProject(p, 'javascript', 'validation')).length, 1);
});
test('unmatched and markup-like searches have no results', () => {
  for (const term of ['zz-no-match', '<script>alert(1)</script>']) {
    assert.equal(projects.filter(p => matchesProject(p, 'all', term)).length, 0);
  }
});
test('alphabetical sorting is deterministic and featured sorting restores original order', () => {
  const ordered = [...projects].sort((a, b) => compareProjects(a, b, 'title'));
  assert.deepEqual(ordered.map(p => p.title), ['A different light', 'Every input matters', 'Find your focus', 'Interface portfolio', 'Study Planner']);
  assert.deepEqual(ordered.sort((a, b) => compareProjects(a, b, 'featured')), projects);
});
test('sorting ties compare equally', () => {
  assert.equal(compareProjects(projects[0], projects[0], 'title'), 0);
  assert.equal(compareProjects(projects[0], projects[0], 'featured'), 0);
});
test('every field rejects empty and whitespace-only values with specific guidance', () => {
  for (const name of ['name', 'email', 'message']) {
    for (const value of ['', ' ', '\n\t']) assert.match(validationMessage(name, value), /^Please enter/);
  }
});
test('name length boundaries and international names are supported', () => {
  assert.notEqual(validationMessage('name', 'A'), '');
  for (const value of ['Al', 'مهدي الهاشم', 'Li Wei', 'a'.repeat(60)]) assert.equal(validationMessage('name', value), '');
  assert.notEqual(validationMessage('name', 'a'.repeat(61)), '');
});
test('a space-padded short name remains invalid', () => {
  assert.notEqual(validationMessage('name', ' A '), '');
});
test('email accepts normal and plus-tagged addresses', () => {
  for (const value of ['student@example.com', 'mahdi+portfolio@example.edu.sa', ' name@example.com ']) assert.equal(validationMessage('email', value), '');
});
test('email rejects common malformed values and browser type mismatch', () => {
  for (const value of ['not-an-email', 'a@localhost', 'a@@b.com', 'a b@example.com', 'a@.']) assert.notEqual(validationMessage('email', value), '');
  assert.notEqual(validationMessage('email', 'a@example.com', true), '');
  assert.notEqual(validationMessage('email', 'a'.repeat(250) + '@b.com'), '');
});
test('message enforces inclusive 20 and 1000 character boundaries', () => {
  assert.notEqual(validationMessage('message', 'a'.repeat(19)), '');
  assert.equal(validationMessage('message', 'a'.repeat(20)), '');
  assert.equal(validationMessage('message', 'a'.repeat(1000)), '');
  assert.notEqual(validationMessage('message', 'a'.repeat(1001)), '');
});
test('padding does not count toward minimum message length', () => {
  assert.notEqual(validationMessage('message', '   short message   '), '');
});
test('valid values together produce no validation errors', () => {
  assert.deepEqual([
    validationMessage('name', 'Mahdi Al Hashem'),
    validationMessage('email', 'mahdi@example.com'),
    validationMessage('message', 'I would like to discuss a new portfolio idea.')
  ], ['', '', '']);
});
