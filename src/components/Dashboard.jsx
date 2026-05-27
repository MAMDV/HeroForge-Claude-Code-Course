import { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import WelcomeCard from './WelcomeCard';
import MissionControlCard from './MissionControlCard';
import WeatherWidget from './WeatherWidget';
import GitHubActivityWidget from './GitHubActivityWidget';
import ActivityTimeline from './ActivityTimeline';
import FocusMode from './FocusMode';

/**
 * Dashboard -- luxury minimal overview with editorial bento grid.
 */
function Dashboard() {
  const { state } = useAppContext();
  const [focusActive, setFocusActive] = useState(false);

  const completedTasks = state.tasks.filter((t) => t.completed).length;

  const staggerItem = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-8">
      {/* Header area */}
      <div className="relative mb-10 flex items-end justify-between">
        <div>
          <h1 className="mc-heading text-5xl" style={{ letterSpacing: '-0.03em' }}>
            Command Center
          </h1>
          <p className="lm-label mt-2">
            Your day at a glance
          </p>
        </div>
        <button
          onClick={() => setFocusActive(true)}
          className="lm-btn"
        >
          Focus Mode
        </button>
      </div>

      {/* Bento grid */}
      <div className="mc-bento relative">
        {/* Hero welcome -- span 3 columns */}
        <motion.div
          className="col-span-4 md:col-span-3"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={staggerItem}
        >
          <WelcomeCard user={state.user} />
        </motion.div>

        {/* Quick stat top-right */}
        <motion.div
          className="col-span-4 md:col-span-1"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={staggerItem}
        >
          <MissionControlCard label="Completed" count={completedTasks} />
        </motion.div>

        {/* Stat cards row */}
        <motion.div
          className="col-span-4 md:col-span-1"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={staggerItem}
        >
          <MissionControlCard label="Contacts" count={state.contacts.length} />
        </motion.div>

        <motion.div
          className="col-span-4 md:col-span-1"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={staggerItem}
        >
          <MissionControlCard label="Tasks" count={state.tasks.length} />
        </motion.div>

        <motion.div
          className="col-span-4 md:col-span-1"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={staggerItem}
        >
          <MissionControlCard label="Notes" count={state.notes.length} />
        </motion.div>

        {/* Weather -- 1 column */}
        <motion.div
          className="col-span-4 md:col-span-1"
          custom={5}
          initial="hidden"
          animate="visible"
          variants={staggerItem}
        >
          <WeatherWidget />
        </motion.div>

        {/* GitHub activity -- span 2 columns */}
        <motion.div
          className="col-span-4 md:col-span-2"
          custom={6}
          initial="hidden"
          animate="visible"
          variants={staggerItem}
        >
          <GitHubActivityWidget />
        </motion.div>

        {/* Activity timeline -- tall side column, span 2 rows */}
        <motion.div
          className="col-span-4 row-span-2 md:col-span-2"
          custom={7}
          initial="hidden"
          animate="visible"
          variants={staggerItem}
        >
          <ActivityTimeline />
        </motion.div>
      </div>

      {/* Focus Mode overlay */}
      <FocusMode active={focusActive} onClose={() => setFocusActive(false)} />
    </div>
  );
}

export default Dashboard;
