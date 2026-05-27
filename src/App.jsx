import { useAppContext } from './context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ContactList from './components/ContactList';
import TaskList from './components/TaskList';
import NoteList from './components/NoteList';
import PersonalizationPanel from './components/PersonalizationPanel';
import AboutPage from './components/AboutPage';
import ToastProvider from './components/ToastProvider';
import CommandPalette from './components/CommandPalette';

function App() {
  const { state } = useAppContext();

  const views = {
    dashboard: <Dashboard />,
    contacts: <ContactList />,
    tasks: <TaskList />,
    notes: <NoteList />,
    settings: <PersonalizationPanel />,
    about: <AboutPage />,
  };

  return (
    <div className="mc-grain min-h-screen transition-colors" style={{ backgroundColor: 'var(--lm-bg)', color: 'var(--lm-text)' }}>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={state.activeView}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {views[state.activeView] || views.dashboard}
        </motion.main>
      </AnimatePresence>
      <CommandPalette />
      <ToastProvider />
    </div>
  );
}

export default App;
