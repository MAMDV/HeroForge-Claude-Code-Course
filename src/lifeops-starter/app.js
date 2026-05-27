/**
 * LifeOps Command Center — Starter App
 *
 * This file sets up the basic tab navigation for the starter repo.
 * Session 3 will add contacts, tasks, and notes functionality here.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Tab navigation
  const navButtons = document.querySelectorAll('.nav-btn');
  const views = document.querySelectorAll('.view');

  navButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetView = btn.getAttribute('data-view');

      // Update active button
      navButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Update active view
      views.forEach(function (v) { v.classList.remove('active'); });
      var target = document.getElementById(targetView);
      if (target) {
        target.classList.add('active');
      }
    });
  });

  // SESSION 3: Load seed data and render contacts, tasks, notes here
});
