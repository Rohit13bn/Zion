import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LyricCardModal } from './components/LyricCardModal';
import { DynamicTypographyModal } from './components/DynamicTypographyModal';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { SongPage } from './pages/SongPage';
import { HistoryPage } from './pages/HistoryPage';
import { SongIndexPage } from './pages/SongIndexPage';
import { UploadLyricsPage } from './pages/UploadLyricsPage';

const AppContent: React.FC = () => {
  const { activeTab, toast, theme } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'search':
        return <SearchPage />;
      case 'song':
        return <SongPage />;
      case 'history':
        return <HistoryPage />;
      case 'index':
        return <SongIndexPage />;
      case 'upload':
        return <UploadLyricsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      id="app-root-container"
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#f5f5f7] selection:bg-[#fa2d48] selection:text-white'
          : 'bg-[#f5f5f7] text-[#1d1d1f] selection:bg-[#fa2d48] selection:text-white'
      }`}
    >
      {/* Global Toast Capsule */}
      {toast && (
        <div className="fixed top-16 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/90 backdrop-blur-xl border border-white/15 text-white shadow-2xl text-xs font-medium tracking-tight">
            <span className="w-2 h-2 rounded-full bg-[#fa2d48] animate-ping" />
            <span>{toast}</span>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {renderActivePage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Studio Modals */}
      <LyricCardModal />
      <DynamicTypographyModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
