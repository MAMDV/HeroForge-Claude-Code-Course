/**
 * StatCard -- luxury minimal stat display.
 */
function StatCard({ label, count, icon }) {
  return (
    <div
      className="mc-card flex flex-col items-center justify-center p-5 text-center"
      role="group"
      aria-label={`${label}: ${count}`}
    >
      {icon && <span className="mb-2 block text-lg" aria-hidden="true">{icon}</span>}
      <p className="mc-data text-3xl">{count}</p>
      <p className="lm-label mt-2">{label}</p>
    </div>
  );
}

export default StatCard;
