import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getGoogleContacts } from '../googleWorkspaceService.js';

describe('googleWorkspaceService', () => {
  beforeEach(() => { delete import.meta.env.VITE_GOOGLE_WORKSPACE_ENABLED; });
  afterEach(() => { vi.restoreAllMocks(); });

  it('returns mock contacts when env var is not set', async () => {
    const contacts = await getGoogleContacts();
    expect(Array.isArray(contacts)).toBe(true);
    expect(contacts.length).toBeGreaterThan(0);
  });

  it('returns mock contacts when env var is false', async () => {
    import.meta.env.VITE_GOOGLE_WORKSPACE_ENABLED = 'false';
    expect((await getGoogleContacts()).length).toBeGreaterThan(0);
  });

  it('mock contacts match Contact shape', async () => {
    (await getGoogleContacts()).forEach(c => {
      expect(c).toHaveProperty('id');
      expect(c).toHaveProperty('name');
      expect(c).toHaveProperty('email');
      expect(c).toHaveProperty('phone');
      expect(c).toHaveProperty('category');
      expect(c).toHaveProperty('createdAt');
      expect(c.name.length).toBeGreaterThan(0);
    });
  });

  it('mock contacts use fictional names', async () => {
    const names = (await getGoogleContacts()).map(c => c.name);
    expect(names).toContain('Diana Prince');
    expect(names).toContain('Clark Kent');
    expect(names).toContain('Lois Lane');
  });

  it('does not call fetch', async () => {
    const spy = vi.spyOn(globalThis, 'fetch');
    await getGoogleContacts();
    expect(spy).not.toHaveBeenCalled();
  });

  it('throws when env var is true', async () => {
    import.meta.env.VITE_GOOGLE_WORKSPACE_ENABLED = 'true';
    await expect(getGoogleContacts()).rejects.toThrow('Google Workspace real mode requires local setup');
  });
});
