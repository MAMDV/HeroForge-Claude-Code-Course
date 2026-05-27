/**
 * AddTaskForm — wires the task form to handle submissions.
 *
 * Call AddTaskForm.init() once after the DOM is ready.
 * Populates the contact dropdown from the shared contacts state
 * and creates new tasks with all fields.
 */

window.TaskComponents = window.TaskComponents || {};

window.TaskComponents.AddTaskForm = {
  init: function () {
    var form = document.getElementById('task-form');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var textInput = document.getElementById('task-text');
      var descInput = document.getElementById('task-description');
      var dueDateInput = document.getElementById('task-due-date');
      var priorityInput = document.getElementById('task-priority');
      var contactInput = document.getElementById('task-contact');

      var text = textInput.value.trim();
      if (!text) {
        textInput.focus();
        return;
      }

      var contactId = contactInput.value || null;

      window.LifeOpsState.tasks.push({
        id: 't' + Date.now(),
        text: text,
        description: descInput.value.trim(),
        priority: priorityInput.value,
        status: 'todo',
        completed: false,
        contactId: contactId,
        dueDate: dueDateInput.value || null
      });

      form.reset();
      window.renderAll();
    });
  },

  /**
   * populateContacts — fills the contact dropdown from current state.
   * Called on every render so newly added contacts appear immediately.
   */
  populateContacts: function () {
    var select = document.getElementById('task-contact');
    var contacts = window.LifeOpsState.contacts;
    var currentValue = select.value;

    // Keep the "None" option, rebuild the rest
    select.innerHTML = '<option value="">None</option>';

    contacts.forEach(function (c) {
      var option = document.createElement('option');
      option.value = c.id;
      option.textContent = c.name;
      select.appendChild(option);
    });

    // Restore previous selection if still valid
    if (currentValue) {
      select.value = currentValue;
    }
  }
};
