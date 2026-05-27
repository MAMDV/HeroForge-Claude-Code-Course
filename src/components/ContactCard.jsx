import { motion } from 'motion/react';
import AvatarGenerator from './AvatarGenerator';

/**
 * ContactCard — luxury minimal contact display with DiceBear avatar.
 */
function ContactCard({ contact, onDelete, tasks = [] }) {
  const categoryColors = {
    personal: 'var(--lm-accent)',
    work: '#64748B',
    family: '#6B8F6B',
    friend: '#8C6C4C',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="contact-card mc-card mb-4 p-5"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <AvatarGenerator name={contact.name} size={44} />
          <div>
            <h3
              className="text-base"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--lm-text)', fontSize: '1.125rem' }}
            >
              {contact.name}
            </h3>
            <span
              className="mt-1 inline-block text-xs uppercase tracking-widest"
              style={{ color: categoryColors[contact.category] || 'var(--lm-text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.12em' }}
            >
              {contact.category}
            </span>
          </div>
        </div>
        <button
          onClick={() => onDelete(contact.id)}
          aria-label={`Delete ${contact.name}`}
          className="lm-btn lm-btn-danger px-2 py-1"
          style={{ fontSize: '0.625rem' }}
        >
          Delete
        </button>
      </div>

      <div className="mt-4 space-y-1 text-sm" style={{ color: 'var(--lm-text-secondary)' }}>
        {contact.email && <p>{contact.email}</p>}
        {contact.phone && <p>{contact.phone}</p>}
      </div>

      {/* Related tasks */}
      <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--lm-border)' }}>
        <h4 className="lm-label mb-2">Assigned Tasks</h4>
        {tasks.length === 0 ? (
          <p className="text-sm italic" style={{ color: 'var(--lm-text-tertiary)' }}>No tasks assigned</p>
        ) : (
          <ul className="space-y-1">
            {tasks.map(task => (
              <li
                key={task.id}
                className={`flex items-center gap-2 text-sm ${
                  task.completed ? 'line-through' : ''
                }`}
                style={{ color: task.completed ? 'var(--lm-text-tertiary)' : 'var(--lm-text-secondary)' }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block size-1.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: task.priority === 'high' ? 'var(--lm-danger)' :
                      task.priority === 'medium' ? 'var(--lm-warning)' : 'var(--lm-success)',
                  }}
                />
                {task.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export default ContactCard;
