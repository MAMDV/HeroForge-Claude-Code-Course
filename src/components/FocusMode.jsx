import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

/**
 * FocusMode -- luxury minimal focus overlay.
 */
function FocusMode({ active, onClose }) {
  const { state } = useAppContext();

  const topTask = state.tasks.find((t) => !t.completed && t.priority === 'high')
    || state.tasks.find((t) => !t.completed)
    || null;

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (active) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [active, handleKeyDown]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Focus mode"
        >
          {/* Frosted overlay */}
          <div className="absolute inset-0" style={{ background: 'rgba(250, 250, 248, 0.92)', backdropFilter: 'blur(20px)' }} />

          {/* Focus card */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="mc-card p-10 text-center">
              <p className="lm-label mb-4">Focus Mode</p>

              {topTask ? (
                <>
                  <h2 className="mc-heading mb-3 text-2xl">{topTask.title}</h2>
                  {topTask.priority && (
                    <span
                      className="mb-4 inline-block text-xs uppercase tracking-widest"
                      style={{
                        color: topTask.priority === 'high' ? 'var(--lm-danger)' :
                          topTask.priority === 'medium' ? 'var(--lm-warning)' : 'var(--lm-success)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.625rem',
                        letterSpacing: '0.12em',
                      }}
                    >
                      {topTask.priority} priority
                    </span>
                  )}

                  {/* Accent circle */}
                  <div
                    className="mx-auto my-8 flex size-28 items-center justify-center rounded-full"
                    style={{ border: '1px solid var(--lm-border)', backgroundColor: 'var(--lm-accent-soft)' }}
                  >
                    <span className="mc-data text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                      1
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="mc-heading mb-3 text-2xl">All Clear</h2>
                  <p className="text-sm" style={{ color: 'var(--lm-text-tertiary)' }}>No pending tasks.</p>
                </>
              )}

              <button
                onClick={onClose}
                className="lm-btn mt-6"
              >
                Exit Focus (Esc)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FocusMode;
