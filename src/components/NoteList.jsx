import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import NoteCard from './NoteCard';
import AddNoteForm from './AddNoteForm';

/**
 * NoteList — luxury minimal notes view.
 */
function NoteList() {
  const { state, dispatch } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = state.notes.filter(note => {
    const term = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(term) ||
      (note.body && note.body.toLowerCase().includes(term))
    );
  });

  const handleUpdate = (id, changes) => {
    dispatch({ type: 'UPDATE_NOTE', payload: { id, ...changes } });
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_NOTE', payload: { id } });
  };

  return (
    <div className="note-list mx-auto max-w-2xl px-6 py-8">
      <h2 className="mc-heading mb-1 text-3xl">Notes</h2>
      <p className="lm-label mb-8">Capture your thoughts</p>

      <AddNoteForm />

      <input
        type="text"
        placeholder="Search by title or content..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search notes"
        className="lm-input mb-6"
      />

      {filteredNotes.length === 0 ? (
        <p className="empty-state py-12 text-center text-sm" style={{ color: 'var(--lm-text-tertiary)' }}>
          {state.notes.length === 0
            ? 'No notes yet. Add your first note above.'
            : 'No notes match your search.'}
        </p>
      ) : (
        filteredNotes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default NoteList;
