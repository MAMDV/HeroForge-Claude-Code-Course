/**
 * NoteList — manages the notes display: render and delete.
 *
 * Call NoteList.render() whenever state changes.
 * Renders notes in a card grid layout using NoteCard.
 */

window.NoteComponents = window.NoteComponents || {};

window.NoteComponents.NoteList = {
  render: function () {
    var state = window.LifeOpsState;
    var list = document.getElementById('notes-list');

    list.innerHTML = state.notes
      .map(window.NoteComponents.NoteCard)
      .join('');

    // Bind delete buttons
    list.querySelectorAll('.btn-delete').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        state.notes = state.notes.filter(function (n) {
          return n.id !== id;
        });
        window.renderAll();
      });
    });
  }
};
