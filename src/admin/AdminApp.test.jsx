import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import AdminApp from './AdminApp';

const mockSupabase = {
  auth: {
    getSession: vi.fn(),
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: { unsubscribe: vi.fn() } },
    })),
  },
  rpc: vi.fn(),
};

vi.mock('../lib/supabase', () => ({
  get supabase() {
    return mockSupabase;
  },
  isSupabaseConfigured: true,
}));

const resetLocation = () => window.history.replaceState({}, '', '/admin/');

describe('AdminApp auth gate', () => {
  it('redirects to /admin/login when there is no session', async () => {
    resetLocation();
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });

    render(<AdminApp />);

    await waitFor(() => expect(window.location.pathname).toBe('/admin/login'));
  });

  it('shows a "not an admin" message for a logged-in non-admin user', async () => {
    resetLocation();
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: { user: { id: 'u1', email: 'someone@example.com' } } },
    });
    mockSupabase.rpc.mockResolvedValue({ data: false, error: null });

    render(<AdminApp />);

    expect(
      await screen.findByText(/this account is not an admin/i),
    ).toBeInTheDocument();
    // Never redirected away, and never showed the dashboard tabs.
    expect(window.location.pathname).toBe('/admin/');
    expect(screen.queryByText(/log out/i)).toBeInTheDocument();
  });
});
