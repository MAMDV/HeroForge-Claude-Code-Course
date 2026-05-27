// Infrastructure service: Google Workspace CLI integration (mock mode)
// See ADR-014 (mock mode by default, no /api/ calls) and DDD context: App → External Integration → Google Workspace
//
// Real mode requires a local `gwc` CLI tool + backend proxy — this is NOT used in the course.
// OAuth redirect flows don't work in Codespaces, and there is no backend (ADR-006).
// The mock mode demonstrates the Anti-Corruption Layer pattern: transforming external
// data shapes into the app's internal Contact format, just as a real integration would.

const MOCK_GOOGLE_CONTACTS = [
  {
    id: 'gw-1',
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    phone: '555-0201',
    category: 'work',
    createdAt: '2026-02-10T10:00:00.000Z',
  },
  {
    id: 'gw-2',
    name: 'Clark Kent',
    email: 'clark.kent@example.com',
    phone: '555-0202',
    category: 'work',
    createdAt: '2026-02-10T10:01:00.000Z',
  },
  {
    id: 'gw-3',
    name: 'Lois Lane',
    email: 'lois.lane@example.com',
    phone: '',
    category: 'personal',
    createdAt: '2026-02-10T10:02:00.000Z',
  },
];

function getMockGoogleContacts() {
  return MOCK_GOOGLE_CONTACTS;
}

/**
 * Fetches contacts from Google Workspace.
 * When VITE_GOOGLE_WORKSPACE_ENABLED is not 'true' (the default),
 * returns static mock data matching the Contact[] shape.
 * There are NO fetch('/api/google/...') calls — there is no backend (ADR-006, ADR-014).
 * Real mode (VITE_GOOGLE_WORKSPACE_ENABLED === 'true') is only available with a local
 * gwc CLI tool + backend proxy. This path is NOT used in the course.
 */
export async function getGoogleContacts() {
  if (import.meta.env.VITE_GOOGLE_WORKSPACE_ENABLED !== 'true') {
    return getMockGoogleContacts();
  }
  // Real mode only available with local gwc CLI + backend proxy (not used in course)
  throw new Error('Google Workspace real mode requires local setup');
}
