import { useState } from 'react';
import { motion } from 'motion/react';

/**
 * NoteCard — luxury minimal note display with inline edit.
 */
function NoteCard({ note, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editBody, setEditBody] = useState(note.body || '');

  const categoryColors = {
    general: 'var(--lm-text-tertiary)',
    meeting: '#64748B',
    idea: 'var(--lm-accent)',
    reference: 'var(--lm-success)',
  };

  const truncateBody = (body, maxLength = 120) => {
    if (!body || body.length <= maxLength) return body || '';
    return body.slice(0, maxLength) + '...';
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleEdit = () => {
    setEditTitle(note.title);
    setEditBody(note.body || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) return;
    onUpdate(note.id, { title: trimmedTitle, body: editBody });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditBody(note.body || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="mc-card mb-4 p-5" style={{ boxShadow: `var(--lm-shadow-md), 0 0 0 1px var(--lm-accent)` }}>
        <div className="mb-4">
          <label htmlFor={`edit-title-${note.id}`} className="lm-label mb-2 block">Title</label>
          <input
            id={`edit-title-${note.id}`}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            aria-label={`Edit title for ${note.title}`}
            className="lm-input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor={`edit-body-${note.id}`} className="lm-label mb-2 block">Body</label>
          <textarea
            id={`edit-body-${note.id}`}
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            rows={4}
            aria-label={`Edit body for ${note.title}`}
            className="lm-input resize-y"
            style={{ borderBottom: '1px solid var(--lm-border)' }}
          />
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave} aria-label={`Save ${note.title}`} className="lm-btn lm-btn-accent">Save</button>
          <button onClick={handleCancel} aria-label={`Cancel editing ${note.title}`} className="lm-btn">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="note-card mc-card mb-4 p-5"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3
            className="mb-1"
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--lm-text)' }}
          >
            {note.title}
          </h3>
          <span
            className="category-badge inline-block text-xs uppercase tracking-widest"
            style={{
              color: categoryColors[note.category] || 'var(--lm-text-tertiary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.12em',
            }}
          >
            {note.category}
          </span>
        </div>
        <div className="flex shrink-0 gap-2">
          <button onClick={handleEdit} aria-label={`Edit ${note.title}`} className="lm-btn lm-btn-accent px-2 py-1" style={{ fontSize: '0.625rem' }}>Edit</button>
          <button onClick={() => onDelete(note.id)} aria-label={`Delete ${note.title}`} className="lm-btn lm-btn-danger px-2 py-1" style={{ fontSize: '0.625rem' }}>Delete</button>
        </div>
      </div>
      <p className="note-body mt-3 text-sm leading-relaxed" style={{ color: 'var(--lm-text-secondary)' }}>
        {truncateBody(note.body)}
      </p>
      <p className="note-updated mt-3 text-xs" style={{ color: 'var(--lm-text-tertiary)', fontFamily: 'var(--font-mono)' }}>
        {formatDate(note.updatedAt)}
      </p>
    </motion.div>
  );
}

export default NoteCard;
