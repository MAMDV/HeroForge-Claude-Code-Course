import { useAppContext } from '../context/AppContext';

/**
 * NavLinks -- luxury minimal tab navigation with underline indicator.
 */
const views = ['dashboard', 'contacts', 'tasks', 'notes', 'settings', 'about'];

function NavLinks() {
  const { state, dispatch } = useAppContext();

  return (
    <div className="flex items-center gap-1">
      {views.map(view => (
        <button
          key={view}
          onClick={() => dispatch({ type: 'SET_VIEW', payload: { view } })}
          aria-current={state.activeView === view ? 'page' : undefined}
          className="relative cursor-pointer px-3 py-2 text-xs uppercase tracking-widest transition-colors focus:outline-none"
          style={{
            fontFamily: 'var(--font-mono)',
            color: state.activeView === view ? 'var(--lm-accent)' : 'var(--lm-text-tertiary)',
            letterSpacing: '0.12em',
          }}
        >
          {view}
          {state.activeView === view && (
            <span
              className="absolute bottom-0 left-3 right-3 h-px"
              style={{ backgroundColor: 'var(--lm-accent)' }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

export default NavLinks;
