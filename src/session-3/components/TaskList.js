/**
 * TaskList — manages the task list: filter, render, toggle, and delete.
 *
 * Call TaskList.init() once after the DOM is ready to wire filter buttons.
 * Call TaskList.render() whenever state changes.
 *
 * Uses TaskItem to render each individual task.
 */

window.TaskComponents = window.TaskComponents || {};

window.TaskComponents.TaskList = {
  taskFilter: 'all',

  init: function () {
    var self = this;

    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        self.taskFilter = btn.getAttribute('data-filter');
        document.querySelectorAll('.filter-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        self.render();
      });
    });
  },

  render: function () {
    var state = window.LifeOpsState;
    var list = document.getElementById('tasks-list');
    var filter = this.taskFilter;

    var filtered = state.tasks.filter(function (t) {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    });

    list.innerHTML = filtered
      .map(window.TaskComponents.TaskItem)
      .join('');

    // Bind checkbox toggle
    list.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var id = cb.getAttribute('data-id');
        var task = state.tasks.find(function (t) { return t.id === id; });
        if (task) {
          task.completed = cb.checked;
          task.status = cb.checked ? 'done' : 'todo';
        }
        window.renderAll();
      });
    });

    // Bind delete buttons
    list.querySelectorAll('.btn-delete').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        state.tasks = state.tasks.filter(function (t) { return t.id !== id; });
        window.renderAll();
      });
    });
  }
};
