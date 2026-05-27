/**
 * TaskItem — renders a single task as an HTML string.
 *
 * Shows the task title, status badge, priority badge, due date,
 * assigned contact name, and a checkbox to toggle completion.
 */

window.TaskComponents = window.TaskComponents || {};

window.TaskComponents.TaskItem = function (task) {
  var esc = window.LifeOpsUtils.escapeHtml;
  var contacts = window.LifeOpsState.contacts;

  // Look up assigned contact name
  var contactName = '';
  if (task.contactId) {
    var contact = contacts.find(function (c) { return c.id === task.contactId; });
    if (contact) contactName = contact.name;
  }

  var checkedAttr = task.completed ? ' checked' : '';
  var doneClass = task.completed ? ' item-done' : '';

  // Format due date for display
  var dueDateDisplay = '';
  if (task.dueDate) {
    var d = new Date(task.dueDate + 'T00:00:00');
    dueDateDisplay = d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  }

  var status = task.status || 'todo';

  return (
    '<li class="item-card' + doneClass + '">' +
      '<div class="item-info">' +
        '<label class="task-label">' +
          '<input type="checkbox"' + checkedAttr + ' data-id="' + task.id + '" />' +
          '<span>' + esc(task.text) + '</span>' +
        '</label>' +
        '<div class="task-meta">' +
          '<span class="badge badge-status-' + status + '">' + esc(status) + '</span>' +
          '<span class="badge badge-' + task.priority + '">' + esc(task.priority) + '</span>' +
          (dueDateDisplay
            ? '<span class="task-due">Due: ' + esc(dueDateDisplay) + '</span>'
            : '') +
          (contactName
            ? '<span class="task-assigned">Assigned: ' + esc(contactName) + '</span>'
            : '') +
        '</div>' +
      '</div>' +
      '<button class="btn btn-delete" data-id="' + task.id + '" aria-label="Delete task">&#10005;</button>' +
    '</li>'
  );
};
