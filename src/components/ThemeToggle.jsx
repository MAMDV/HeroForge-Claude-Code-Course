import { useAppContext } from '../context/AppContext';

/**
 * ThemeToggle -- minimal toggle between light and dark modes.
 */
function ThemeToggle() {
  const { state, dispatch } = useAppContext();

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
      className="lm-btn px-3 py-1.5"
      style={{ fontSize: '0.625rem', letterSpacing: '0.12em' }}
      aria-label={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode`}
      data-testid="theme-toggle"
    >
      {state.theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}

export default ThemeToggle;
