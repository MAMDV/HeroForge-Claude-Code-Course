import NavLinks from './NavLinks';
import AccentColorPicker from './AccentColorPicker';
import ThemeToggle from './ThemeToggle';

/**
 * Header -- luxury minimal navigation bar with editorial spacing.
 */
function Header() {
  return (
    <nav
      aria-label="Main navigation"
      className="flex items-center gap-3 px-6 py-4"
      style={{ borderBottom: '1px solid var(--lm-border)' }}
    >
      <span
        className="mr-4 text-xl tracking-tight"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--lm-text)' }}
      >
        LifeOps
      </span>
      <NavLinks />
      <div className="ml-auto flex items-center gap-3">
        <AccentColorPicker />
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Header;
