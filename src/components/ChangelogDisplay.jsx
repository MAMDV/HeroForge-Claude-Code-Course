import changelog from '../data/changelog.json';

/**
 * ChangelogDisplay -- renders a session-by-session timeline from changelog.json.
 */
function ChangelogDisplay() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Changelog
      </h2>
      <div className="relative border-l-2 border-gray-300 pl-6 dark:border-gray-600">
        {changelog.map((entry) => (
          <div key={entry.session} className="relative mb-8 last:mb-0">
            {/* Timeline dot */}
            <div className="absolute top-1 size-3 rounded-full bg-accent" style={{ left: '-1.55rem' }} />

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Session {entry.session}: {entry.title}
            </h3>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
              {entry.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChangelogDisplay;
