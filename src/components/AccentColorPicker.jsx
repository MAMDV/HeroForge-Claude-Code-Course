import { useAppContext } from '../context/AppContext';

/**
 * AccentColorPicker -- luxury color swatches with gold default.
 */

const COLOR_PRESETS = [
  { name: 'Gold',   light: '#C9A84C', dark: '#D4B65A' },
  { name: 'Slate',  light: '#64748B', dark: '#94A3B8' },
  { name: 'Rose',   light: '#9F5C5C', dark: '#C48A8A' },
  { name: 'Sage',   light: '#6B8F6B', dark: '#8FB88F' },
  { name: 'Navy',   light: '#4C5C8C', dark: '#7B8EC4' },
  { name: 'Bronze', light: '#8C6C4C', dark: '#B89A7A' },
];

function AccentColorPicker() {
  const { state, dispatch } = useAppContext();
  const isDark = state.theme === 'dark';

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Accent color picker" data-testid="accent-color-picker">
      {COLOR_PRESETS.map((preset) => {
        const hex = isDark ? preset.dark : preset.light;
        const isActive = state.accentColor === hex;

        return (
          <button
            key={preset.name}
            onClick={() => dispatch({ type: 'SET_ACCENT', payload: { color: hex } })}
            className="cursor-pointer rounded-full transition-all focus:outline-none"
            style={{
              width: 18,
              height: 18,
              backgroundColor: hex,
              boxShadow: isActive
                ? `0 0 0 2px var(--lm-bg), 0 0 0 4px ${hex}`
                : 'none',
            }}
            aria-label={`Set accent color to ${preset.name}`}
            data-testid={`accent-swatch-${preset.name.toLowerCase()}`}
            title={preset.name}
          />
        );
      })}
    </div>
  );
}

export { COLOR_PRESETS };
export default AccentColorPicker;
