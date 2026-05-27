import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

/**
 * AddTaskForm — luxury minimal task creation form.
 */
function AddTaskForm() {
  const { state, dispatch } = useAppContext();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [contactId, setContactId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    dispatch({
      type: 'ADD_TASK',
      payload: {
        title: title.trim(),
        priority,
        dueDate: dueDate ? new Date(dueDate + 'T00:00:00.000Z').toISOString() : null,
        contactId: contactId || null,
      },
    });

    setTitle('');
    setPriority('medium');
    setDueDate('');
    setContactId('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Add task" className="mb-8">
      <div className="mb-4">
        <label htmlFor="task-title" className="lm-label mb-2 block">Title *</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError(''); }}
          placeholder="What needs to be done?"
          className="lm-input"
          style={error ? { borderBottomColor: 'var(--lm-danger)' } : undefined}
        />
        {error && (
          <p role="alert" className="mt-1 text-xs" style={{ color: 'var(--lm-danger)' }}>{error}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="task-priority" className="lm-label mb-2 block">Priority</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="lm-input cursor-pointer"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="task-due-date" className="lm-label mb-2 block">Due Date</label>
        <input
          id="task-due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="lm-input cursor-pointer"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="task-contact" className="lm-label mb-2 block">Contact</label>
        <select
          id="task-contact"
          value={contactId}
          onChange={(e) => setContactId(e.target.value)}
          className="lm-input cursor-pointer"
        >
          <option value="">No contact</option>
          {state.contacts.map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="lm-btn lm-btn-accent">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
