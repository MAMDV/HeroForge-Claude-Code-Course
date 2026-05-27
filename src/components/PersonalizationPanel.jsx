import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { initialState } from '../context/AppContext';
import AccentColorPicker from './AccentColorPicker';

/**
 * PersonalizationPanel -- luxury minimal settings view.
 */
function PersonalizationPanel() {
  const { state, dispatch } = useAppContext();

  const [name, setName] = useState(state.user.name);
  const [bio, setBio] = useState(state.user.bio);
  const [city, setCity] = useState(state.user.city);
  const [avatarEmoji, setAvatarEmoji] = useState(state.user.avatarEmoji);

  const handleSaveProfile = () => {
    dispatch({ type: 'SET_USER', payload: { name, bio, city, avatarEmoji } });
  };

  const handleResetDefaults = () => {
    dispatch({ type: 'SET_ACCENT', payload: { color: initialState.accentColor } });
    dispatch({ type: 'SET_LAYOUT', payload: { layout: initialState.layout } });
    dispatch({ type: 'SET_USER', payload: { ...initialState.user } });
    if (state.theme !== initialState.theme) {
      dispatch({ type: 'TOGGLE_THEME' });
    }
    setName(initialState.user.name);
    setBio(initialState.user.bio);
    setCity(initialState.user.city);
    setAvatarEmoji(initialState.user.avatarEmoji);
  };

  const filterBtnStyle = (isActive) => ({
    fontFamily: 'var(--font-mono)',
    fontSize: '0.625rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    borderBottom: isActive ? '1px solid var(--lm-accent)' : '1px solid transparent',
    background: 'transparent',
    color: isActive ? 'var(--lm-accent)' : 'var(--lm-text-tertiary)',
  });

  return (
    <div className="mx-auto max-w-2xl px-6 py-8" data-testid="personalization-panel">
      <h2 className="mc-heading mb-1 text-3xl">Settings</h2>
      <p className="lm-label mb-8">Personalize your experience</p>

      {/* Layout Picker */}
      <section className="mb-8">
        <h3 className="lm-label mb-3">Layout</h3>
        <div className="flex gap-0" role="group" aria-label="Layout picker">
          {['cards', 'list'].map((option) => (
            <button
              key={option}
              onClick={() => dispatch({ type: 'SET_LAYOUT', payload: { layout: option } })}
              style={filterBtnStyle(state.layout === option)}
              aria-pressed={state.layout === option}
              data-testid={`layout-${option}`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Profile Editor */}
      <section className="mb-8">
        <h3 className="lm-label mb-3">Profile</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="profile-name" className="lm-label mb-2 block">Name</label>
            <input id="profile-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="lm-input" data-testid="profile-name" />
          </div>
          <div>
            <label htmlFor="profile-bio" className="lm-label mb-2 block">Bio</label>
            <input id="profile-bio" type="text" value={bio} onChange={(e) => setBio(e.target.value)} className="lm-input" data-testid="profile-bio" />
          </div>
          <div>
            <label htmlFor="profile-city" className="lm-label mb-2 block">City</label>
            <input id="profile-city" type="text" value={city} onChange={(e) => setCity(e.target.value)} className="lm-input" data-testid="profile-city" />
          </div>
          <div>
            <label htmlFor="profile-avatar" className="lm-label mb-2 block">Emoji Avatar</label>
            <input id="profile-avatar" type="text" value={avatarEmoji} onChange={(e) => setAvatarEmoji(e.target.value)} className="lm-input w-20 text-center text-2xl" data-testid="profile-avatar" />
          </div>
          <button onClick={handleSaveProfile} className="lm-btn lm-btn-accent" data-testid="save-profile">Save Profile</button>
        </div>
      </section>

      {/* Accent Color Picker */}
      <section className="mb-8">
        <h3 className="lm-label mb-3">Accent Color</h3>
        <AccentColorPicker />
      </section>

      {/* Reset */}
      <section>
        <button onClick={handleResetDefaults} className="lm-btn lm-btn-danger" data-testid="reset-defaults">
          Reset to Defaults
        </button>
      </section>
    </div>
  );
}

export default PersonalizationPanel;
