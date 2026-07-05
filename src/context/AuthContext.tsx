import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useProfile } from '../hooks/useUser';
import type { User } from '../types/auth.types';

interface AuthContextValue {
  user: User | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, isError } = useProfile();

  // Fixes the "back button shows an old logged-in page's details" issue.
  // When the browser restores a page from the back-forward cache (bfcache),
  // it resumes the exact frozen page from before you navigated away —
  // JS resumes right where it left off, showing whatever was on screen
  // at that time, without re-running our auth check. `pageshow` with
  // `event.persisted === true` is the standard way to detect that restore.
  // A full reload (rather than just re-fetching data) guarantees the
  // frozen snapshot is discarded outright before anyone sees it, and the
  // app boots fresh and checks the real session from scratch.
  useEffect(() => {
    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        window.location.reload();
      }
    }
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !isError && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}