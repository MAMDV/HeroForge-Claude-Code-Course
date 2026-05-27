import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { parseTaskInput } from '../services/taskParser';

/**
 * SmartTaskInput — luxury minimal natural language task entry with preview.
 */
function SmartTaskInput() {
  const { state, dispatch } = useAppContext();
  const [inputText, setInputText] = useState('');

  const parsed = useMemo(
    () => parseTaskInput(inputText, state.contacts),
    [inputText, state.contacts]
  );

  const hasInput = inputText.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasInput) return;

    let contactId = null;
    if (parsed.matchedContactName) {
      const matched = state.contacts.find(
        (c) => c.name === parsed.matchedContactName
      );
      if (matched) contactId = matched.id;
    }

    dispatch({
      type: 'ADD_TASK',
      payload: {
        title: parsed.title,
        priority: parsed.priority,
        dueDate: parsed.dueDate,
        contactId,
      },
    });

    setInputText('');
  };

  const priorityColor = {
    high: 'var(--lm-danger)',
    medium: 'var(--lm-warning)',
    low: 'var(--lm-success)',
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Smart task input" className="mb-8">
      <div className="mb-3">
        <label htmlFor="smart-task-input" className="lm-label mb-2 block">Quick Add</label>
        <input
          id="smart-task-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder='e.g. "Call Sarah tomorrow urgent"'
          className="lm-input"
        />
      </div>

      {hasInput && (
        <div
          data-testid="smart-task-preview"
          className="mc-card mb-4 p-4"
        >
          <p style={{ fontFamily: 'var(--font-display)', color: 'var(--lm-text)', fontSize: '1rem' }}>
            {parsed.title || '(no title)'}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <span
              data-testid="priority-badge"
              className="text-xs uppercase tracking-widest"
              style={{ color: priorityColor[parsed.priority], fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.1em' }}
            >
              {parsed.priority}
            </span>
            {parsed.dueDate && (
              <span className="text-xs" style={{ color: 'var(--lm-text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.625rem' }}>
                Due: {parsed.dueDate}
              </span>
            )}
            {parsed.matchedContactName && (
              <span className="text-xs" style={{ color: 'var(--lm-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.625rem' }}>
                {parsed.matchedContactName}
              </span>
            )}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={!hasInput}
        className="lm-btn lm-btn-accent disabled:cursor-not-allowed disabled:opacity-40"
      >
        Add Task
      </button>
    </form>
  );
}

export default SmartTaskInput;
