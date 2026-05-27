/**
 * ContactCard — renders a single contact as an HTML string.
 *
 * This is a "pure" function: it takes data in and returns markup out,
 * with no side-effects. In React you would write this as a stateless
 * component; here we use a plain function on a shared namespace.
 */

window.ContactComponents = window.ContactComponents || {};

window.ContactComponents.ContactCard = function (contact) {
  var esc = window.LifeOpsUtils.escapeHtml;

  return (
    '<li class="item-card">' +
      '<div class="item-info">' +
        '<strong>' + esc(contact.name) + '</strong>' +
        '<span class="item-meta">' +
          esc(contact.email) +
          (contact.phone ? ' &middot; ' + esc(contact.phone) : '') +
        '</span>' +
        '<span class="badge badge-' + contact.category + '">' +
          esc(contact.category) +
        '</span>' +
      '</div>' +
      '<button class="btn btn-delete" data-id="' + contact.id + '" ' +
        'aria-label="Delete contact">&#10005;</button>' +
    '</li>'
  );
};
