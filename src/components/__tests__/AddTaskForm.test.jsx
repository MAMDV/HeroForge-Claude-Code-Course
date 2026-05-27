/**
 * Unit tests for AddTaskForm (Issue #111)
 *
 * Acceptance criteria:
 *   - Form fields: title (required), priority (dropdown), due date (optional), contact (dropdown)
 *   - Contact dropdown populated from state.contacts
 *   - Dispatches ADD_TASK with contactId (or null if no contact selected)
 *   - Title validation: not empty
 *
 * ADR-006: Validation at UI boundary.
 * ADR-011: contactId references Contact.id or null.
 */
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "../../context/AppContext";
import AddTaskForm from "../AddTaskForm";

const testContacts = [
  { id: "c1", name: "Sarah Chen", email: "sarah@example.com", phone: "555-0101", category: "work", createdAt: "2026-01-15T09:00:00.000Z" },
  { id: "c2", name: "Mom", email: "mom@example.com", phone: "555-0102", category: "family", createdAt: "2026-01-15T09:01:00.000Z" },
];

function renderAddTaskForm(overrides = {}) {
  const state = {
    contacts: testContacts,
    tasks: [],
    notes: [],
    theme: "light",
    accentColor: "#1d4ed8",
    layout: "cards",
    user: { name: "User", bio: "", city: "", avatarEmoji: "\u{1F464}" },
    activeView: "tasks",
    ...overrides,
  };
  return render(
    <AppProvider initialStateOverride={state}>
      <AddTaskForm />
    </AppProvider>
  );
}

describe("AddTaskForm", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders all form fields (title, priority, due date, contact dropdown)", () => {
    renderAddTaskForm();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact/i)).toBeInTheDocument();
  });

  it("title validation prevents empty submit", () => {
    renderAddTaskForm();
    const submitButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(submitButton);
    expect(screen.getByRole("alert")).toHaveTextContent("Title is required");
  });

  it("title validation prevents whitespace-only submit", () => {
    renderAddTaskForm();
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "   " } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("Title is required");
  });

  it("contact dropdown populated from state.contacts", () => {
    renderAddTaskForm();
    const contactSelect = screen.getByLabelText(/contact/i);
    const options = contactSelect.querySelectorAll("option");
    expect(options).toHaveLength(3); // "No contact" + 2 contacts
    expect(options[0].textContent).toBe("No contact");
    expect(options[1].textContent).toBe("Sarah Chen");
    expect(options[2].textContent).toBe("Mom");
  });

  it("shows empty contact dropdown when no contacts exist", () => {
    renderAddTaskForm({ contacts: [] });
    const contactSelect = screen.getByLabelText(/contact/i);
    const options = contactSelect.querySelectorAll("option");
    expect(options).toHaveLength(1);
    expect(options[0].textContent).toBe("No contact");
  });

  it("dispatches ADD_TASK with contactId on valid submit", () => {
    renderAddTaskForm();
    const titleInput = screen.getByLabelText(/title/i);
    const contactSelect = screen.getByLabelText(/contact/i);

    fireEvent.change(titleInput, { target: { value: "Call Sarah" } });
    fireEvent.change(contactSelect, { target: { value: "c1" } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    // Form should reset after successful submit
    expect(titleInput.value).toBe("");
    expect(contactSelect.value).toBe("");
  });

  it("dispatches ADD_TASK with null contactId when no contact selected", () => {
    renderAddTaskForm();
    const titleInput = screen.getByLabelText(/title/i);

    fireEvent.change(titleInput, { target: { value: "Solo task" } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    // Form should reset after successful submit (no error shown)
    expect(titleInput.value).toBe("");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("resets all fields after successful submit", () => {
    renderAddTaskForm();
    const titleInput = screen.getByLabelText(/title/i);
    const prioritySelect = screen.getByLabelText(/priority/i);
    const contactSelect = screen.getByLabelText(/contact/i);

    fireEvent.change(titleInput, { target: { value: "Test" } });
    fireEvent.change(prioritySelect, { target: { value: "high" } });
    fireEvent.change(contactSelect, { target: { value: "c2" } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(titleInput.value).toBe("");
    expect(prioritySelect.value).toBe("medium");
    expect(contactSelect.value).toBe("");
  });

  it("clears validation error when user starts typing", () => {
    renderAddTaskForm();
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "a" } });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
