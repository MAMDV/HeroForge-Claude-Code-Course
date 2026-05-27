import { motion } from 'motion/react';
import { formatDate } from "../services/helpers";

const priorityConfig = {
  high: { label: "High", color: 'var(--lm-danger)' },
  medium: { label: "Medium", color: 'var(--lm-warning)' },
  low: { label: "Low", color: 'var(--lm-success)' },
};

export default function TaskItem({ task, contactName, onToggle, onDelete }) {
  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const formattedDate = formatDate(task.dueDate);

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mc-card mb-3 flex items-center justify-between p-4"
      data-testid={`task-item-${task.id}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="size-4 cursor-pointer rounded-sm accent-[var(--lm-accent)]"
          style={{ accentColor: 'var(--lm-accent)' }}
          aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`text-sm ${task.completed ? 'line-through' : ''}`}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                color: task.completed ? 'var(--lm-text-tertiary)' : 'var(--lm-text)',
              }}
            >
              {task.title}
            </span>

            <span
              className="inline-flex items-center gap-1 text-xs uppercase tracking-widest"
              style={{ color: priority.color, fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.1em' }}
              data-testid={`priority-badge-${task.id}`}
            >
              <span className="inline-block size-1.5 rounded-full" style={{ backgroundColor: priority.color }} />
              {priority.label}
            </span>
          </div>

          <div className="mt-1.5 flex items-center gap-3">
            {formattedDate && (
              <span className="text-xs" style={{ color: 'var(--lm-text-tertiary)', fontFamily: 'var(--font-mono)' }} data-testid={`due-date-${task.id}`}>
                Due {formattedDate}
              </span>
            )}

            {contactName && (
              <span
                className="text-xs"
                style={{ color: 'var(--lm-accent)', fontFamily: 'var(--font-mono)' }}
                data-testid={`contact-badge-${task.id}`}
              >
                {contactName}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="ml-3 transition-colors"
        style={{ color: 'var(--lm-text-tertiary)' }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--lm-danger)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--lm-text-tertiary)'}
        aria-label={`Delete task "${task.title}"`}
        data-testid={`delete-task-${task.id}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </motion.li>
  );
}
