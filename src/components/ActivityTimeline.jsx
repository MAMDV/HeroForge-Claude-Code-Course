import { useMemo } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

function buildTimeline(contacts, tasks, notes) {
  const entries = [];

  contacts.forEach((c) => {
    entries.push({
      id: `contact-${c.id}`,
      type: 'contact',
      description: `Added contact: ${c.name}`,
      timestamp: c.createdAt || new Date().toISOString(),
      color: 'var(--lm-accent)',
    });
  });

  tasks.forEach((t) => {
    if (t.completed) {
      entries.push({
        id: `task-done-${t.id}`,
        type: 'task',
        description: `Completed: ${t.title}`,
        timestamp: t.completedAt || t.createdAt || new Date().toISOString(),
        color: 'var(--lm-success)',
      });
    } else {
      entries.push({
        id: `task-${t.id}`,
        type: 'task',
        description: `Created task: ${t.title}`,
        timestamp: t.createdAt || new Date().toISOString(),
        color: 'var(--lm-text-tertiary)',
      });
    }
  });

  notes.forEach((n) => {
    entries.push({
      id: `note-${n.id}`,
      type: 'note',
      description: `Note: ${n.title || n.content?.slice(0, 40) || 'Untitled'}`,
      timestamp: n.updatedAt || n.createdAt || new Date().toISOString(),
      color: 'var(--lm-warning)',
    });
  });

  entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  return entries.slice(0, 15);
}

function formatTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

function ActivityTimeline() {
  const { state } = useAppContext();
  const timeline = useMemo(
    () => buildTimeline(state.contacts, state.tasks, state.notes),
    [state.contacts, state.tasks, state.notes]
  );

  if (timeline.length === 0) {
    return (
      <div className="mc-card h-full p-5">
        <h3 className="mc-heading mb-4 text-lg">Activity</h3>
        <p className="text-sm" style={{ color: 'var(--lm-text-tertiary)' }}>No activity yet.</p>
      </div>
    );
  }

  return (
    <div className="mc-card h-full p-5">
      <h3 className="mc-heading mb-5 text-lg">Activity</h3>
      <div className="relative space-y-0">
        {timeline.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-start gap-3 pb-4"
          >
            {/* Connecting line */}
            {i < timeline.length - 1 && (
              <div className="mc-timeline-line" />
            )}

            {/* Dot */}
            <div
              className="relative z-10 mt-1.5 size-2 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
            />

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug" style={{ color: 'var(--lm-text-secondary)' }}>
                {entry.description}
              </p>
              <time className="mt-0.5 block text-xs" style={{ color: 'var(--lm-text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                {formatTime(entry.timestamp)}
              </time>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;
