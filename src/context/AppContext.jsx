import { createContext, useContext, useReducer, useEffect } from "react";
import seedContacts from "../data/contacts.json";
import seedTasks from "../data/tasks.json";
import seedNotes from "../data/notes.json";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AppContext = createContext(null);

const initialState = {
  contacts: seedContacts,
  tasks: seedTasks,
  notes: seedNotes,
  theme: "light",
  accentColor: "#C9A84C",
  layout: "cards",
  user: { name: "User", bio: "", city: "", avatarEmoji: "👤" },
  activeView: "dashboard",
};

export function appReducer(state, action) {
  switch (action.type) {
    case "ADD_CONTACT": {
      const newContact = {
        ...action.payload,
        id: action.payload.id || (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)),
        createdAt: action.payload.createdAt || new Date().toISOString(),
      };
      return { ...state, contacts: [...state.contacts, newContact] };
    }

    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload } : c
        ),
      };

    case "DELETE_CONTACT": {
      // CASCADE NULLIFY: nullify contactId on all related tasks (ADR-011)
      const updatedTasks = state.tasks.map((t) =>
        t.contactId === action.payload.id ? { ...t, contactId: null } : t
      );
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== action.payload.id),
        tasks: updatedTasks,
      };
    }

    case "ADD_TASK": {
      const newTask = {
        ...action.payload,
        id: action.payload.id || (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)),
        completed: action.payload.completed || false,
        createdAt: action.payload.createdAt || new Date().toISOString(),
      };
      return { ...state, tasks: [...state.tasks, newTask] };
    }

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, completed: !t.completed } : t
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.id),
      };

    case "ADD_NOTE": {
      const newNote = {
        ...action.payload,
        id: action.payload.id || (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)),
        createdAt: action.payload.createdAt || new Date().toISOString(),
        updatedAt: action.payload.updatedAt || new Date().toISOString(),
      };
      return { ...state, notes: [...state.notes, newNote] };
    }

    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.payload.id
            ? { ...n, ...action.payload, updatedAt: new Date().toISOString() }
            : n
        ),
      };

    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((n) => n.id !== action.payload.id),
      };

    case "SET_THEME":
      return { ...state, theme: action.payload.theme };

    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };

    case "SET_ACCENT":
      return { ...state, accentColor: action.payload.color };

    case "SET_LAYOUT":
      return { ...state, layout: action.payload.layout };

    case "SET_USER":
      return { ...state, user: { ...state.user, ...action.payload } };

    case "SET_VIEW":
      return { ...state, activeView: action.payload.view };

    case "LOAD_STATE":
      return { ...state, ...action.payload };

    case "RESET_STATE":
      return { ...initialState };

    default:
      return state;
  }
}

export function AppProvider({ children, initialStateOverride }) {
  const [persistedState, setPersistedState] = useLocalStorage("lifeops-state", initialState);

  const [state, dispatch] = useReducer(appReducer, null, () => {
    if (initialStateOverride) return initialStateOverride;
    return persistedState;
  });

  // Sync state to localStorage on every change via useLocalStorage hook
  useEffect(() => {
    setPersistedState(state);
  }, [state, setPersistedState]);

  // Apply theme class to document root
  useEffect(() => {
    if (state.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.theme]);

  // Apply accent color CSS custom property
  useEffect(() => {
    document.documentElement.style.setProperty("--color-accent", state.accentColor);
  }, [state.accentColor]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

export { initialState };
export default AppContext;
