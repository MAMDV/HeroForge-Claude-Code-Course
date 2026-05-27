import { useState } from 'react';
import { toast } from 'sonner';
import { useAppContext } from '../context/AppContext';

/**
 * AddNoteForm — luxury minimal note creation form.
 */
function AddNoteForm() {
  const { dispatch } = useAppContext();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('general');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    dispatch({
      type: 'ADD_NOTE',
      payload: {
        title: title.trim(),
        body: body.trim(),
        category,
      },
    });
    toast.success(`Note created: ${title.trim()}`);

    setTitle('');
    setBody('');
    setCategory('general');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Add note" className="mb-8">
      <div className="mb-4">
        <label htmlFor="note-title" className="lm-label mb-2 block">Title *</label>
        <input
          id="note-title"
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError(''); }}
          placeholder="Note title"
          className="lm-input"
          style={error ? { borderBottomColor: 'var(--lm-danger)' } : undefined}
        />
        {error && (
          <p role="alert" className="mt-1 text-xs" style={{ color: 'var(--lm-danger)' }}>{error}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="note-body" className="lm-label mb-2 block">Body</label>
        <textarea
          id="note-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your note..."
          rows={4}
          className="lm-input resize-y"
          style={{ borderBottom: '1px solid var(--lm-border)' }}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="note-category" className="lm-label mb-2 block">Category</label>
        <select
          id="note-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="lm-input cursor-pointer"
        >
          <option value="general">General</option>
          <option value="meeting">Meeting</option>
          <option value="idea">Idea</option>
          <option value="reference">Reference</option>
        </select>
      </div>

      <button type="submit" className="lm-btn lm-btn-accent">Add Note</button>
    </form>
  );
}

export default AddNoteForm;
