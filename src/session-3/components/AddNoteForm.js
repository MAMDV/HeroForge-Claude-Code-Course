/**
 * AddNoteForm — wires the note form to handle submissions.
 *
 * Call AddNoteForm.init() once after the DOM is ready.
 * Creates new notes with title, body, category, and timestamp.
 */

window.NoteComponents = window.NoteComponents || {};

window.NoteComponents.AddNoteForm = {
  init: function () {
    var form = document.getElementById('note-form');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var titleInput = document.getElementById('note-title');
      var bodyInput = document.getElementById('note-body');
      var categoryInput = document.getElementById('note-category');

      var title = titleInput.value.trim();
      if (!title) {
        titleInput.focus();
        return;
      }

      window.LifeOpsState.notes.push({
        id: 'n' + Date.now(),
        title: title,
        body: bodyInput.value.trim(),
        category: categoryInput.value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      form.reset();
      window.renderAll();
    });
  }
};
