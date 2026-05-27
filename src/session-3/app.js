/**
 * LifeOps Command Center — Session 3: Vanilla CRUD
 *
 * Loads contacts, tasks, and notes from JSON seed data.
 * Supports add, delete, search/filter, and toggle-complete.
 *
 * Contact logic has been extracted into component files:
 *   components/ContactCard.js, AddContactForm.js, ContactList.js
 */

document.addEventListener('DOMContentLoaded', function () {
  // ── State ──────────────────────────────────────────────
  var contacts = [];
  var tasks = [];
  var notes = [];
  // taskFilter is now managed by TaskComponents.TaskList

  // ── Utilities ──────────────────────────────────────────
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ── Shared State & Utilities ───────────────────────────
  // Expose state so component files can read and write it.
  // This is the vanilla equivalent of React's Context —
  // a shared object that multiple files can access.
  window.LifeOpsState = {
    contacts: contacts,
    tasks: tasks,
    notes: notes,
    contactSearch: ''
  };

  window.LifeOpsUtils = {
    escapeHtml: escapeHtml
  };

  // ── Tab Navigation ─────────────────────────────────────
  var navButtons = document.querySelectorAll('.nav-btn');
  var views = document.querySelectorAll('.view');

  navButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetView = btn.getAttribute('data-view');
      navButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      views.forEach(function (v) { v.classList.remove('active'); });
      var target = document.getElementById(targetView);
      if (target) target.classList.add('active');
    });
  });

  // ── Data Loading ───────────────────────────────────────
  function loadData() {
    Promise.all([
      fetch('data/contacts.json').then(function (r) { return r.json(); }),
      fetch('data/tasks.json').then(function (r) { return r.json(); }),
      fetch('data/notes.json').then(function (r) { return r.json(); })
    ]).then(function (results) {
      contacts = results[0].contacts || [];
      tasks = results[1].tasks || [];
      notes = results[2].notes || [];
      // Sync shared state after loading
      window.LifeOpsState.contacts = contacts;
      window.LifeOpsState.tasks = tasks;
      window.LifeOpsState.notes = notes;
      renderAll();
    });
  }

  // ── Render Helpers ─────────────────────────────────────
  function renderAll() {
    // Sync local variables from shared state.
    // This is needed because delete operations use filter(),
    // which creates a new array and breaks the original reference.
    contacts = window.LifeOpsState.contacts;
    tasks = window.LifeOpsState.tasks;
    notes = window.LifeOpsState.notes;

    renderContacts();
    renderTasks();
    renderNotes();
  }

  // Expose renderAll so component files can trigger re-renders
  window.renderAll = renderAll;

  // ── Contacts (delegated to component files) ────────────
  function renderContacts() {
    window.ContactComponents.ContactList.render();
  }

  // Initialize contact components
  window.ContactComponents.ContactList.init();
  window.ContactComponents.AddContactForm.init();

  // ── Tasks (delegated to component files) ───────────────
  function renderTasks() {
    window.TaskComponents.AddTaskForm.populateContacts();
    window.TaskComponents.TaskList.render();
  }

  // Initialize task components
  window.TaskComponents.TaskList.init();
  window.TaskComponents.AddTaskForm.init();

  // ── Notes (delegated to component files) ───────────────
  function renderNotes() {
    window.NoteComponents.NoteList.render();
  }

  // Initialize note components
  window.NoteComponents.AddNoteForm.init();

  // ── Init ───────────────────────────────────────────────
  loadData();
});
