/**
 * AddContactForm — wires the contact form to handle submissions.
 *
 * Call AddContactForm.init() once after the DOM is ready.
 * This is the vanilla equivalent of a React form component with
 * useState for each field and an onSubmit handler.
 */

window.ContactComponents = window.ContactComponents || {};

window.ContactComponents.AddContactForm = {
  init: function () {
    var form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = document.getElementById('contact-name');
      var emailInput = document.getElementById('contact-email');
      var phoneInput = document.getElementById('contact-phone');
      var categoryInput = document.getElementById('contact-category');

      var name = nameInput.value.trim();
      var email = emailInput.value.trim();

      // Basic validation — name and email are required
      if (!name) {
        nameInput.focus();
        return;
      }
      if (!email) {
        emailInput.focus();
        return;
      }

      window.LifeOpsState.contacts.push({
        id: 'c' + Date.now(),
        name: name,
        email: email,
        phone: phoneInput.value.trim(),
        category: categoryInput.value
      });

      form.reset();
      window.renderAll();
    });
  }
};
