import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

// Types
export interface User {
  name: string;
  email?: string;
  loggedIn: boolean;
  credits: number;
}

export interface Book {
  id: number;
  title: string;
  chapters: { title: string; content: string }[];
  created: string;
}

export interface AppState {
  user: User;
  books: Book[];
  currentView: string;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextType {
  state: AppState;
  toasts: Toast[];
  nav: (view: string) => void;
  setUser: (u: Partial<User>) => void;
  addBook: (b: Book) => void;
  login: (email: string, pass: string) => void;
  logout: () => void;
  toast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

const defaultState: AppState = (() => {
  try {
    const s = localStorage.getItem('bs_v6');
    if (s) return JSON.parse(s);
  } catch (e) {}
  return {
    user: { name: 'Guest', loggedIn: false, credits: 50 },
    books: [],
    currentView: 'dashboard'
  };
})();

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  const save = useCallback((newState: AppState) => {
    try { localStorage.setItem('bs_v6', JSON.stringify(newState)); } catch (e) {}
    setState(newState);
  }, []);

  const nav = useCallback((view: string) => {
    setState(prev => ({ ...prev, currentView: view }));
  }, []);

  const setUser = useCallback((u: Partial<User>) => {
    setState(prev => {
      const next = { ...prev, user: { ...prev.user, ...u } };
      save(next);
      return next;
    });
  }, [save]);

  const addBook = useCallback((b: Book) => {
    setState(prev => {
      const next = { ...prev, books: [b, ...prev.books] };
      save(next);
      return next;
    });
  }, [save]);

  const login = useCallback((email: string, _pass: string) => {
    setTimeout(() => {
      setState(prev => {
        const next = { ...prev, user: { ...prev.user, name: email.split('@')[0], email, loggedIn: true } };
        save(next);
        return next;
      });
      toast('Logged in (Local Mode)', 'success');
      nav('dashboard');
    }, 500);
  }, [save, nav]);

  const logout = useCallback(() => {
    setState(prev => {
      const next = { ...prev, user: { name: 'Guest', loggedIn: false, credits: 50 } };
      save(next);
      return next;
    });
    toast('Logged out', 'info');
    nav('login');
  }, [save, nav]);

  const toast = useCallback((msg: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = ++toastIdRef.current;
    setToasts(prev => [...prev, { id, message: msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  return (
    <StoreContext.Provider value={{ state, toasts, nav, setUser, addBook, login, logout, toast }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
