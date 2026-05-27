import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { getGoogleContacts } from '../services/googleWorkspaceService';

function ImportContactsButton() {
  const { state, dispatch } = useAppContext();
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);

  const handleImport = async () => {
    setImporting(true);
    setResult(null);
    try {
      const contacts = await getGoogleContacts();
      const existingEmails = new Set(state.contacts.map(c => c.email.toLowerCase()));
      const newContacts = contacts.filter(c => !existingEmails.has(c.email.toLowerCase()));
      if (newContacts.length === 0) {
        setResult({ type: 'info', message: 'All contacts already imported.' });
      } else {
        newContacts.forEach(contact => {
          dispatch({ type: 'ADD_CONTACT', payload: contact });
        });
        setResult({
          type: 'success',
          message: `Imported ${newContacts.length} contact${newContacts.length === 1 ? '' : 's'} from Google Workspace (mock).`,
        });
      }
    } catch (error) {
      setResult({ type: 'error', message: error.message });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="mb-6">
      <button
        onClick={handleImport}
        disabled={importing}
        className="lm-btn disabled:cursor-not-allowed disabled:opacity-40"
      >
        {importing ? 'Importing...' : 'Import from Google'}
      </button>
      {result && (
        <p role="status" className="mt-2 text-xs" style={{
          color: result.type === 'success' ? 'var(--lm-success)' : result.type === 'error' ? 'var(--lm-danger)' : 'var(--lm-text-tertiary)',
          fontFamily: 'var(--font-mono)',
        }}>
          {result.message}
        </p>
      )}
    </div>
  );
}

export default ImportContactsButton;
