import { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { useAppContext } from '../context/AppContext';

/**
 * CommandPalette -- Cmd+K command palette for quick navigation and actions.
 * Always mounted; toggled by keyboard shortcut.
 */
function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useAppContext();

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

  function navigateTo(view) {
    dispatch({ type: 'SET_VIEW', payload: { view } });
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div cmdk-dialog="">
      <div cmdk-overlay="" onClick={() => setOpen(false)} />
      <Command
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
        }}
        label="Command palette"
      >
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="Navigation">
            <Command.Item onSelect={() => navigateTo('dashboard')}>
              <span aria-hidden="true">{'\u{1F3E0}'}</span>
              Dashboard
            </Command.Item>
            <Command.Item onSelect={() => navigateTo('contacts')}>
              <span aria-hidden="true">{'\u{1F4C7}'}</span>
              Contacts
            </Command.Item>
            <Command.Item onSelect={() => navigateTo('tasks')}>
              <span aria-hidden="true">{'\u2705'}</span>
              Tasks
            </Command.Item>
            <Command.Item onSelect={() => navigateTo('notes')}>
              <span aria-hidden="true">{'\u{1F4DD}'}</span>
              Notes
            </Command.Item>
            <Command.Item onSelect={() => navigateTo('settings')}>
              <span aria-hidden="true">{'\u2699\uFE0F'}</span>
              Settings
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Contacts">
            {state.contacts.slice(0, 8).map((c) => (
              <Command.Item
                key={c.id}
                value={`contact ${c.name} ${c.email || ''}`}
                onSelect={() => navigateTo('contacts')}
              >
                <span aria-hidden="true">{'\u{1F464}'}</span>
                {c.name}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Tasks">
            {state.tasks
              .filter((t) => !t.completed)
              .slice(0, 6)
              .map((t) => (
                <Command.Item
                  key={t.id}
                  value={`task ${t.title}`}
                  onSelect={() => navigateTo('tasks')}
                >
                  <span aria-hidden="true">{'\u{1F4CB}'}</span>
                  {t.title}
                </Command.Item>
              ))}
          </Command.Group>

          <Command.Group heading="Actions">
            <Command.Item
              onSelect={() => {
                dispatch({ type: 'TOGGLE_THEME' });
                setOpen(false);
              }}
            >
              <span aria-hidden="true">{'\u{1F319}'}</span>
              Toggle Theme
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

export default CommandPalette;
