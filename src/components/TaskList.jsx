import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import SmartTaskInput from "./SmartTaskInput";

/**
 * TaskList -- luxury minimal task management view.
 */
export default function TaskList() {
  const { state, dispatch } = useAppContext();
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTasks = state.tasks.filter((task) => {
    if (filter === "active" && task.completed) return false;
    if (filter === "completed" && !task.completed) return false;
    if (priorityFilter !== "all" && task.priority !== priorityFilter) return false;
    return true;
  });

  const getContactName = (contactId) => {
    if (!contactId) return null;
    const contact = state.contacts.find((c) => c.id === contactId);
    return contact ? contact.name : null;
  };

  const handleToggle = (id) => {
    const task = state.tasks.find((t) => t.id === id);
    dispatch({ type: "TOGGLE_TASK", payload: { id } });
    if (task && !task.completed) {
      toast.success(`Completed: ${task.title}`);
    }
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TASK", payload: { id } });
  };

  const filterBtnStyle = (isActive) => ({
    fontFamily: 'var(--font-mono)',
    fontSize: '0.625rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    borderBottom: isActive ? '1px solid var(--lm-accent)' : '1px solid transparent',
    background: 'transparent',
    color: isActive ? 'var(--lm-accent)' : 'var(--lm-text-tertiary)',
  });

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h2 className="mc-heading mb-1 text-3xl">Tasks</h2>
      <p className="lm-label mb-8">Stay on track</p>

      <SmartTaskInput />
      <AddTaskForm />

      {/* Status filter */}
      <div className="mb-2 flex gap-0" role="group" aria-label="Filter tasks by status">
        {["all", "active", "completed"].map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            style={filterBtnStyle(filter === option)}
            aria-pressed={filter === option}
            data-testid={`filter-${option}`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {/* Priority filter */}
      <div className="mb-6 flex gap-0" role="group" aria-label="Filter tasks by priority">
        {["all", "high", "medium", "low"].map((option) => (
          <button
            key={option}
            onClick={() => setPriorityFilter(option)}
            style={filterBtnStyle(priorityFilter === option)}
            aria-pressed={priorityFilter === option}
            data-testid={`priority-filter-${option}`}
          >
            {option === "all" ? "All Priorities" : option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <p className="py-12 text-center text-sm" style={{ color: 'var(--lm-text-tertiary)' }}>
          {state.tasks.length === 0
            ? "No tasks yet. Add your first task above."
            : "No tasks match this filter."}
        </p>
      ) : state.layout === 'list' ? (
        <ul data-testid="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--lm-border)' }} data-testid={`task-item-${task.id}`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                  className="size-4 cursor-pointer"
                  style={{ accentColor: 'var(--lm-accent)' }}
                  aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
                />
                <span
                  className={`text-sm ${task.completed ? 'line-through' : ''}`}
                  style={{ color: task.completed ? 'var(--lm-text-tertiary)' : 'var(--lm-text)' }}
                >
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-xs uppercase tracking-widest"
                style={{ color: 'var(--lm-danger)', fontFamily: 'var(--font-mono)', fontSize: '0.625rem' }}
                aria-label={`Delete task "${task.title}"`}
                data-testid={`delete-task-${task.id}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-0" data-testid="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              contactName={getContactName(task.contactId)}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
