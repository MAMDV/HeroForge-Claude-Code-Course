import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { appReducer, initialState, AppProvider, useAppContext } from '../AppContext';

describe('AppContext Reducer — all 13 actions (ADR-006)', () => {
  let state;

  beforeEach(() => {
    state = {
      contacts: [
        { id: 'c1', name: 'Alice', email: 'alice@example.com', phone: '555-0001', category: 'work', createdAt: '2026-01-01' },
        { id: 'c2', name: 'Bob', email: 'bob@example.com', phone: '555-0002', category: 'friend', createdAt: '2026-01-01' },
      ],
      tasks: [
        { id: 't1', title: 'Call Alice', contactId: 'c1', completed: false, priority: 'medium', createdAt: '2026-01-01' },
        { id: 't2', title: 'Buy groceries', contactId: null, completed: false, priority: 'low', createdAt: '2026-01-01' },
        { id: 't3', title: 'Email Bob', contactId: 'c2', completed: false, priority: 'high', createdAt: '2026-01-01' },
      ],
      notes: [
        { id: 'n1', title: 'Meeting notes', body: 'Discussed roadmap', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
      ],
      theme: 'light',
      accentColor: '#C9A84C',
      layout: 'cards',
      user: { name: 'User', bio: '', city: '', avatarEmoji: '👤' },
      activeView: 'dashboard',
    };
  });

  it('ADD_CONTACT adds contact with auto-generated id and createdAt', () => {
    const newState = appReducer(state, {
      type: 'ADD_CONTACT',
      payload: { name: 'Charlie', email: 'charlie@example.com', phone: '', category: 'personal' },
    });
    expect(newState.contacts).toHaveLength(3);
    expect(newState.contacts[2].name).toBe('Charlie');
    expect(newState.contacts[2].id).toBeTruthy();
    expect(newState.contacts[2].createdAt).toBeTruthy();
  });

  it('ADD_CONTACT preserves provided id', () => {
    const newState = appReducer(state, {
      type: 'ADD_CONTACT',
      payload: { id: 'c3', name: 'Charlie', email: 'charlie@example.com', phone: '', category: 'personal' },
    });
    expect(newState.contacts[2].id).toBe('c3');
  });

  it('DELETE_CONTACT removes contact and cascade-nullifies task contactIds', () => {
    const newState = appReducer(state, {
      type: 'DELETE_CONTACT',
      payload: { id: 'c1' },
    });
    expect(newState.contacts).toHaveLength(1);
    expect(newState.contacts.find(c => c.id === 'c1')).toBeUndefined();
    expect(newState.tasks).toHaveLength(3);
    expect(newState.tasks[0].contactId).toBeNull();
    expect(newState.tasks[1].contactId).toBeNull();
    expect(newState.tasks[2].contactId).toBe('c2');
  });

  it('ADD_TASK adds task with auto-generated fields', () => {
    const newState = appReducer(state, {
      type: 'ADD_TASK',
      payload: { title: 'New task', priority: 'medium', contactId: null },
    });
    expect(newState.tasks).toHaveLength(4);
    expect(newState.tasks[3].title).toBe('New task');
    expect(newState.tasks[3].id).toBeTruthy();
    expect(newState.tasks[3].completed).toBe(false);
    expect(newState.tasks[3].createdAt).toBeTruthy();
  });

  it('TOGGLE_TASK toggles completed status', () => {
    expect(state.tasks[0].completed).toBe(false);
    const newState = appReducer(state, { type: 'TOGGLE_TASK', payload: { id: 't1' } });
    expect(newState.tasks[0].completed).toBe(true);
    const reToggled = appReducer(newState, { type: 'TOGGLE_TASK', payload: { id: 't1' } });
    expect(reToggled.tasks[0].completed).toBe(false);
  });

  it('DELETE_TASK removes task by id', () => {
    const newState = appReducer(state, { type: 'DELETE_TASK', payload: { id: 't2' } });
    expect(newState.tasks).toHaveLength(2);
    expect(newState.tasks.find(t => t.id === 't2')).toBeUndefined();
  });

  it('ADD_NOTE adds note with auto-generated fields', () => {
    const newState = appReducer(state, {
      type: 'ADD_NOTE',
      payload: { title: 'New note', body: 'Body text' },
    });
    expect(newState.notes).toHaveLength(2);
    expect(newState.notes[1].title).toBe('New note');
    expect(newState.notes[1].id).toBeTruthy();
    expect(newState.notes[1].createdAt).toBeTruthy();
    expect(newState.notes[1].updatedAt).toBeTruthy();
  });

  it('UPDATE_NOTE updates note content and sets updatedAt', () => {
    const newState = appReducer(state, {
      type: 'UPDATE_NOTE',
      payload: { id: 'n1', body: 'Updated content' },
    });
    expect(newState.notes[0].body).toBe('Updated content');
    expect(newState.notes[0].title).toBe('Meeting notes');
    expect(newState.notes[0].updatedAt).not.toBe('2026-01-01');
  });

  it('DELETE_NOTE removes note by id', () => {
    const newState = appReducer(state, { type: 'DELETE_NOTE', payload: { id: 'n1' } });
    expect(newState.notes).toHaveLength(0);
  });

  it('TOGGLE_THEME switches between light and dark', () => {
    const darkState = appReducer(state, { type: 'TOGGLE_THEME' });
    expect(darkState.theme).toBe('dark');
    const lightState = appReducer(darkState, { type: 'TOGGLE_THEME' });
    expect(lightState.theme).toBe('light');
  });

  it('SET_ACCENT changes accent color', () => {
    const newState = appReducer(state, { type: 'SET_ACCENT', payload: { color: '#ef4444' } });
    expect(newState.accentColor).toBe('#ef4444');
  });

  it('SET_LAYOUT changes layout mode', () => {
    const newState = appReducer(state, { type: 'SET_LAYOUT', payload: { layout: 'list' } });
    expect(newState.layout).toBe('list');
  });

  it('SET_USER merges user profile updates', () => {
    const newState = appReducer(state, { type: 'SET_USER', payload: { name: 'Jane', city: 'Portland' } });
    expect(newState.user.name).toBe('Jane');
    expect(newState.user.city).toBe('Portland');
    expect(newState.user.bio).toBe('');
    expect(newState.user.avatarEmoji).toBe('👤');
  });

  it('SET_VIEW changes active view', () => {
    const newState = appReducer(state, { type: 'SET_VIEW', payload: { view: 'contacts' } });
    expect(newState.activeView).toBe('contacts');
  });

  it('unknown action returns state unchanged', () => {
    const newState = appReducer(state, { type: 'UNKNOWN_ACTION' });
    expect(newState).toBe(state);
  });
});

describe('initialState shape (ADR-006)', () => {
  it('has all required top-level keys', () => {
    expect(initialState).toHaveProperty('contacts');
    expect(initialState).toHaveProperty('tasks');
    expect(initialState).toHaveProperty('notes');
    expect(initialState).toHaveProperty('theme', 'light');
    expect(initialState).toHaveProperty('accentColor', '#C9A84C');
    expect(initialState).toHaveProperty('layout', 'cards');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('activeView', 'dashboard');
  });

  it('user object has required fields', () => {
    expect(initialState.user).toEqual({
      name: 'User', bio: '', city: '', avatarEmoji: '👤',
    });
  });
});

describe('AppProvider and useAppContext hook', () => {
  function TestConsumer() {
    const { state, dispatch } = useAppContext();
    return (
      <div>
        <span data-testid="theme">{state.theme}</span>
        <span data-testid="view">{state.activeView}</span>
        <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>toggle</button>
      </div>
    );
  }

  it('provides state and dispatch to children', () => {
    render(
      <AppProvider initialStateOverride={{
        contacts: [], tasks: [], notes: [],
        theme: 'light', accentColor: '#C9A84C', layout: 'cards',
        user: { name: 'User', bio: '', city: '', avatarEmoji: '👤' },
        activeView: 'dashboard',
      }}>
        <TestConsumer />
      </AppProvider>
    );
    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(screen.getByTestId('view').textContent).toBe('dashboard');
  });

  it('dispatch updates state', () => {
    render(
      <AppProvider initialStateOverride={{
        contacts: [], tasks: [], notes: [],
        theme: 'light', accentColor: '#C9A84C', layout: 'cards',
        user: { name: 'User', bio: '', city: '', avatarEmoji: '👤' },
        activeView: 'dashboard',
      }}>
        <TestConsumer />
      </AppProvider>
    );
    act(() => { screen.getByText('toggle').click(); });
    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  it('throws when useAppContext is used outside AppProvider', () => {
    const consoleError = console.error;
    console.error = () => {};
    expect(() => render(<TestConsumer />)).toThrow('useAppContext must be used within an AppProvider');
    console.error = consoleError;
  });
});
