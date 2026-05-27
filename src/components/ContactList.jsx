import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ContactCard from './ContactCard';
import AddContactForm from './AddContactForm';
import ImportContactsButton from './ImportContactsButton';

/**
 * ContactList — luxury minimal contacts view with editorial layout.
 */
function ContactList() {
  const { state, dispatch } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = state.contacts.filter(contact => {
    const term = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term)
    );
  });

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_CONTACT', payload: { id } });
  };

  return (
    <div className="contact-list mx-auto max-w-2xl px-6 py-8">
      <h2 className="mc-heading mb-1 text-3xl">Contacts</h2>
      <p className="lm-label mb-8">Manage your network</p>

      <AddContactForm />
      <ImportContactsButton />

      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search contacts"
        className="lm-input mb-6"
      />

      {filteredContacts.length === 0 ? (
        <p className="empty-state py-12 text-center text-sm" style={{ color: 'var(--lm-text-tertiary)' }}>
          {state.contacts.length === 0
            ? 'No contacts yet. Add your first contact above.'
            : 'No contacts match your search.'}
        </p>
      ) : state.layout === 'list' ? (
        <ul data-testid="contact-list-view">
          {filteredContacts.map(contact => (
            <li key={contact.id} className="flex items-center justify-between py-4" style={{ borderBottom: '1px solid var(--lm-border)' }}>
              <div className="min-w-0 flex-1">
                <span style={{ fontFamily: 'var(--font-display)', color: 'var(--lm-text)' }}>{contact.name}</span>
                <span className="ml-3 text-sm" style={{ color: 'var(--lm-text-tertiary)' }}>{contact.email}</span>
              </div>
              <button
                onClick={() => handleDelete(contact.id)}
                aria-label={`Delete ${contact.name}`}
                className="ml-2 text-xs uppercase tracking-widest transition-colors"
                style={{ color: 'var(--lm-danger)', fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.12em' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        filteredContacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={handleDelete}
            tasks={state.tasks.filter(t => t.contactId === contact.id)}
          />
        ))
      )}
    </div>
  );
}

export default ContactList;
