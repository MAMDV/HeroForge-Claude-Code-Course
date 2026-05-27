import { Toaster } from 'sonner';

/**
 * ToastProvider -- luxury minimal toast styling.
 */
function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--lm-surface)',
          border: 'none',
          boxShadow: 'var(--lm-shadow-md)',
          color: 'var(--lm-text)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          borderRadius: '0.75rem',
        },
      }}
    />
  );
}

export default ToastProvider;
