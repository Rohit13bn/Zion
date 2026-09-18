import React from 'react';
import { useApp } from '../context/AppContext';
import { Music2 } from 'lucide-react';
import { LANGUAGES_LIST } from '../data/songs';

export const Footer: React.FC = () => {
  const { setActiveTab, setSelectedLanguage, theme } = useApp();

  return (
    <footer
      id="main-footer"
      className={`border-t pb-12 pt-10 transition-colors ${
        theme === 'dark'
          ? 'bg-[#000000] border-white/[0.08] text-zinc-500'
          : 'bg-[#f5f5f7] border-black/[0.08] text-zinc-600'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Directory Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pb-10 border-b border-white/[0.08] text-xs">
          {/* Brand & Purpose */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#fa2d48] flex items-center justify-center text-white">
                <Music2 className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-sm text-white tracking-tight">Zion Lyrics</span>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-400 font-normal">
              Sacred hymns, devotional poetry, and anthems of Zion preserved for worship, reflection, and spiritual reading.
            </p>
          </div>

          {/* Directory 1: Explore */}
          <div>
            <h4 className="font-semibold text-xs text-white mb-2.5 tracking-tight">
              Catalog & Journey
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Songs of Zion
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('index');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-white font-medium"
                >
                  A–Z Song Index
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('history');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Reading History
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('upload');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#fa2d48] hover:text-[#fc3c44] font-medium transition-colors"
                >
                  Upload Lyrics (Host)
                </button>
              </li>
            </ul>
          </div>

          {/* Directory 2: Global Languages */}
          <div>
            <h4 className="font-semibold text-xs text-white mb-2.5 tracking-tight">
              Languages
            </h4>
            <div className="flex flex-wrap gap-1">
              {LANGUAGES_LIST.slice(0, 6).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setActiveTab('search');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 hover:border-white/30 hover:text-white text-zinc-400 transition-colors"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Legal & Copyright Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-3">
          <p>
            Copyright © {new Date().getFullYear()} Zion Lyrics. “Sing to the LORD a new song.” — Psalm 98:1
          </p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Sacred Use</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Colophon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
