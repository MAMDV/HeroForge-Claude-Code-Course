/**
 * NoteCard — renders a single note as an HTML string.
 *
 * Shows the note title, a content preview (first 100 characters),
 * category badge, and formatted creation date. Designed for use
 * in a card grid layout.
 */

window.NoteComponents = window.NoteComponents || {};

window.NoteComponents.NoteCard = function (note) {
  var esc = window.LifeOpsUtils.escapeHtml;

  // Truncate body to 100 characters for preview
  var preview = note.body || '';
  if (preview.length > 100) {
    preview = preview.substring(0, 100) + '…';
  }

  // Format creation date
  var dateDisplay = '';
  if (note.createdAt) {
    var d = new Date(note.createdAt);
    dateDisplay = d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  }

  return (
    '<li class="note-card">' +
      '<div class="note-card-header">' +
        '<strong class="note-card-title">' + esc(note.title) + '</strong>' +
        '<button class="btn btn-delete" data-id="' + note.id + '" aria-label="Delete note">&#10005;</button>' +
      '</div>' +
      '<p class="note-card-preview">' + esc(preview) + '</p>' +
      '<div class="note-card-footer">' +
        '<span class="badge badge-' + note.category + '">' + esc(note.category) + '</span>' +
        (dateDisplay
          ? '<span class="note-card-date">' + esc(dateDisplay) + '</span>'
          : '') +
      '</div>' +
    '</li>'
  );
};
