import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Music2, Moon, Sun, Menu, X, SlidersHorizontal, Sparkles, BookOpen, Clock, Upload } from 'lucide-react';
import { ActiveTab } from '../types';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    navigateToSearch,
    theme,
    toggleTheme,
    setIsDynamicTypographyModalOpen,
    setIsLyricCardModalOpen,
    recentlyViewed
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearchInput, setNavSearchInput] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchInput.trim()) {
      navigateToSearch(navSearchInput.trim());
      setMobileMenuOpen(false);
    }
  };

  const navItems: { id: ActiveTab; label: string; isHost?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'index', label: 'A–Z Index' },
    { id: 'history', label: 'History' },
    { id: 'upload', label: 'Upload Lyrics (Host)', isHost: true },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-colors border-b backdrop-blur-xl ${
        theme === 'dark'
          ? 'bg-black/80 border-white/[0.08] text-[#f5f5f7]'
          : 'bg-white/80 border-black/[0.08] text-[#1d1d1f]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Zion Lyrics Brand Logo */}
        <div className="flex items-center gap-6 sm:gap-8">
          <button
            id="nav-logo-btn"
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          >
            {/* Zion Lyrics Icon */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-[#fc3c44] to-[#fa2d48] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Music2 className="w-4 h-4 text-white stroke-[2.2]" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-base font-semibold tracking-tight transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-zinc-900'
              }`}>
                Zion
              </span>
              <span className={`text-[11px] font-normal transition-colors ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                Lyrics
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all flex items-center gap-1.5 ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-white/12 text-white font-semibold'
                        : 'bg-black/8 text-zinc-950 font-semibold'
                      : item.isHost
                      ? 'text-[#fa2d48] hover:bg-[#fa2d48]/10'
                      : theme === 'dark'
                      ? 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.04]'
                  }`}
                >
                  {item.isHost && <Upload className="w-3 h-3 text-[#fa2d48]" />}
                  <span>{item.label}</span>
                  {item.id === 'history' && recentlyViewed.length > 0 && (
                    <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-medium ${
                      theme === 'dark' ? 'bg-white/10 text-zinc-300' : 'bg-black/5 text-zinc-700'
                    }`}>
                      {recentlyViewed.length}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Studio Tools Pills */}
            <div className={`hidden lg:flex items-center gap-1 pl-2 border-l ${
              theme === 'dark' ? 'border-white/10' : 'border-black/10'
            }`}>
              <button
                onClick={() => setIsDynamicTypographyModalOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  theme === 'dark'
                    ? 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.04]'
                }`}
                title="Dynamic Typography Reader"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" />
                <span>Typography</span>
              </button>
              <button
                onClick={() => setIsLyricCardModalOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  theme === 'dark'
                    ? 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.04]'
                }`}
                title="Shareable Quote Card Studio"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#fa2d48]" />
                <span>Quote Studio</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Right Controls: Search Capsule & Theme Switch */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Capsule */}
          <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative">
            <Search className="w-3.5 h-3.5 absolute left-3 text-zinc-400 pointer-events-none" />
            <input
              id="navbar-search-input"
              type="text"
              placeholder="Search hymns & lyrics..."
              value={navSearchInput}
              onChange={(e) => setNavSearchInput(e.target.value)}
              onFocus={() => {
                if (activeTab !== 'search') {
                  navigateToSearch(navSearchInput);
                }
              }}
              className={`w-40 sm:w-48 focus:w-64 pl-8 pr-3 py-1.5 text-xs rounded-full transition-all outline-hidden ${
                theme === 'dark'
                  ? 'bg-zinc-900/80 border border-white/10 text-white placeholder-zinc-500 focus:border-[#fa2d48]/80 focus:bg-black'
                  : 'bg-zinc-100 border border-black/10 text-zinc-900 placeholder-zinc-500 focus:border-[#fa2d48]/80 focus:bg-white'
              }`}
            />
          </form>

          {/* Theme Toggle Pill */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors border ${
              theme === 'dark'
                ? 'bg-zinc-900/60 border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800'
                : 'bg-zinc-100 border-black/10 text-zinc-700 hover:text-black hover:bg-zinc-200'
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-300" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-zinc-700" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-1.5 rounded-full transition-colors focus:outline-hidden ${
              theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className={`md:hidden px-4 pt-3 pb-6 border-b animate-in fade-in slide-in-from-top-2 duration-200 ${
            theme === 'dark'
              ? 'bg-[#000000]/95 backdrop-blur-xl border-white/10'
              : 'bg-white/95 backdrop-blur-xl border-black/10'
          }`}
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
              <input
                type="text"
                placeholder="Search lyrics, songs, hymns..."
                value={navSearchInput}
                onChange={(e) => setNavSearchInput(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 text-xs rounded-full outline-hidden border ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-white/10 text-white'
                    : 'bg-zinc-100 border-black/10 text-zinc-900'
                }`}
              />
            </div>
          </form>

          {/* Mobile Links */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium ${
                  activeTab === item.id
                    ? 'bg-[#fa2d48] text-white font-semibold'
                    : theme === 'dark'
                    ? 'text-zinc-300 hover:bg-zinc-900'
                    : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.isHost && <Upload className="w-3.5 h-3.5" />}
                  {item.label}
                </span>
                {item.id === 'history' && recentlyViewed.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white">
                    {recentlyViewed.length}
                  </span>
                )}
              </button>
            ))}

            {/* Mobile Studio Tools */}
            <div className={`pt-2 border-t space-y-1 ${
              theme === 'dark' ? 'border-white/10' : 'border-black/10'
            }`}>
              <button
                onClick={() => {
                  setIsDynamicTypographyModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${
                  theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-900' : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" />
                <span>Dynamic Typography</span>
              </button>
              <button
                onClick={() => {
                  setIsLyricCardModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${
                  theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-900' : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#fa2d48]" />
                <span>Quote Card Studio</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
