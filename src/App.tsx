import React from 'react';
import { StoreProvider, useStore } from './store';
import { Header, Sidebar, MobileNav, Toasts } from './components/Layout';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Forge from './views/Forge';
import Studio from './views/Studio';
import Compliance from './views/Compliance';
import Library from './views/Library';
import Reader from './views/Reader';

function AppContent() {
  const { state } = useStore();
  const view = state.currentView;

  // If not logged in and not on login page, redirect to login
  if (!state.user.loggedIn && view !== 'login') {
    return (
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        <Header />
        <div className="flex-1 flex overflow-hidden relative">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-8 bg-[radial-gradient(circle_at_top_right,#1f1f22,#09090b)]">
            <Login />
          </main>
          <MobileNav />
        </div>
        <Toasts />
      </div>
    );
  }

  const renderView = () => {
    switch (view) {
      case 'login': return <Login />;
      case 'dashboard': return <Dashboard />;
      case 'forge': return <Forge />;
      case 'studio': return <Studio />;
      case 'compliance': return <Compliance />;
      case 'library': return <Library />;
      case 'reader': return <Reader />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header />
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-8 bg-[radial-gradient(circle_at_top_right,#1f1f22,#09090b)]">
          {renderView()}
        </main>
        <MobileNav />
      </div>
      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
