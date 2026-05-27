import ChangelogDisplay from './ChangelogDisplay';

/**
 * AboutPage -- app description and development changelog.
 */
function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      {/* App description */}
      <div className="mb-10">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          About LifeOps Command Center
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          LifeOps Command Center is a personal productivity dashboard built
          progressively across the{' '}
          <strong>Mastering Claude Code</strong> course. It brings together
          contacts, tasks, notes, and external data integrations into a single
          unified interface — all created using AI-assisted development with
          Claude Code.
        </p>
      </div>

      {/* Changelog timeline */}
      <ChangelogDisplay />
    </section>
  );
}

export default AboutPage;
