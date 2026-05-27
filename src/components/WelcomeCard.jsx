/**
 * WelcomeCard -- luxury editorial greeting with generous whitespace.
 */
function WelcomeCard({ user }) {
  return (
    <div
      className="mc-card flex flex-col items-center justify-center p-10 text-center"
    >
      <p className="lm-label mb-3">Welcome back</p>
      <h2 className="mc-heading text-3xl">
        {user.name}
      </h2>
      {user.bio && (
        <p className="mt-2 text-sm" style={{ color: 'var(--lm-text-secondary)' }}>{user.bio}</p>
      )}
      {user.city && (
        <p className="mt-1 text-xs" style={{ color: 'var(--lm-text-tertiary)' }}>{user.city}</p>
      )}
    </div>
  );
}

export default WelcomeCard;
