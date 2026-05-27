/**
 * ContactList — manages the contact list: search, render, and delete.
 *
 * Call ContactList.init() once after the DOM is ready to wire the
 * search input. Call ContactList.render() whenever state changes.
 *
 * Uses ContactCard to render each individual contact — this is the
 * vanilla version of React component composition.
 */

window.ContactComponents = window.ContactComponents || {};

window.ContactComponents.ContactList = {
  /**
   * init — wire the search input. Called once on startup.
   */
  init: function () {
    document.getElementById('contact-search').addEventListener('input', function (e) {
      window.LifeOpsState.contactSearch = e.target.value;
      window.ContactComponents.ContactList.render();
    });
  },

  /**
   * render — filter contacts by search term and display them.
   * Called on every state change via renderAll().
   */
  render: function () {
    var state = window.LifeOpsState;
    var list = document.getElementById('contacts-list');
    var query = (state.contactSearch || '').toLowerCase();

    var filtered = state.contacts.filter(function (c) {
      if (!query) return true;
      return (
        c.name.toLowerCase().indexOf(query) !== -1 ||
        c.email.toLowerCase().indexOf(query) !== -1
      );
    });

    // Map each contact through ContactCard (like React's .map())
    list.innerHTML = filtered
      .map(window.ContactComponents.ContactCard)
      .join('');

    // Bind delete buttons after rendering
    list.querySelectorAll('.btn-delete').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        state.contacts = state.contacts.filter(function (c) {
          return c.id !== id;
        });
        window.renderAll();
      });
    });
  }
};
