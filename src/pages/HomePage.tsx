import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, SlidersHorizontal, Share2, BookOpen, Clock, Upload } from 'lucide-react';
import { SongCard } from '../components/SongCard';

export const HomePage: React.FC = () => {
  const {
    songs,
    navigateToSearch,
    setActiveTab,
    setIsLyricCardModalOpen,
    setIsDynamicTypographyModalOpen,
    theme
  } = useApp();

  const [heroSearchInput, setHeroSearchInput] = useState('');
  const [songCategory, setSongCategory] = useState<string>('All');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      navigateToSearch(heroSearchInput.trim());
    }
  };

  // Filter songs by Zion category
  const filteredSongs = songs.filter((s) => {
    if (songCategory === 'All') return true;
    if (songCategory === 'Zion') {
      return (
        s.title.toLowerCase().includes('zion') ||
        s.album.toLowerCase().includes('zion') ||
        s.genre.toLowerCase().includes('zion') ||
        s.lyrics.some((l) => l.lines.some((line) => line.toLowerCase().includes('zion')))
      );
    }
    if (songCategory === 'Hymns') return s.genre.toLowerCase().includes('hymn');
    if (songCategory === 'Worship') {
      return s.genre.toLowerCase().includes('worship') || s.genre.toLowerCase().includes('praise');
    }
    return true;
  });

  const featuredSongs = filteredSongs.slice(0, 8);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section
        id="home-hero-section"
        className="relative pt-8 pb-10 sm:pt-14 sm:pb-14 px-4 sm:px-8 text-center flex flex-col items-center justify-center"
      >
        {/* Subtle radial illumination */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] h-[340px] bg-gradient-to-b from-[#fa2d48]/12 via-[#fa2d48]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Primary Scripture Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.12] text-white">
          “Sing to the LORD a new song.”{' '}
          <span className="block text-2xl sm:text-4xl md:text-5xl font-serif italic font-normal text-zinc-300 mt-2">
            — Psalm 98:1
          </span>
        </h1>

        {/* Search Capsule */}
        <form
          onSubmit={handleHeroSearch}
          className="mt-7 w-full max-w-xl relative group"
        >
          <div className="relative flex items-center shadow-2xl rounded-full">
            <Search className="w-4 h-4 absolute left-4 text-zinc-400 pointer-events-none group-focus-within:text-[#fa2d48] transition-colors" />
            <input
              id="hero-search-input"
              type="text"
              placeholder="Search by song, author, or sacred verse..."
              value={heroSearchInput}
              onChange={(e) => setHeroSearchInput(e.target.value)}
              className={`w-full pl-11 pr-28 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm tracking-tight border outline-hidden transition-all ${
                theme === 'dark'
                  ? 'bg-zinc-900/90 border-white/15 text-white placeholder-zinc-500 focus:border-[#fa2d48] focus:ring-1 focus:ring-[#fa2d48]/40'
                  : 'bg-white border-black/15 text-zinc-900 placeholder-zinc-400 focus:border-[#fa2d48] focus:ring-1 focus:ring-[#fa2d48]/40 shadow-sm'
              }`}
            />
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-tight bg-white text-black hover:bg-zinc-200 active:scale-95 transition-all shadow-xs"
            >
              Search
            </button>
          </div>
        </form>

        {/* Direct Action Hub: History, Index, and Host Upload */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('index')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 transition-all shadow-xs hover:scale-105"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#fa2d48]" />
            <span>Index of All Songs</span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-white/10 text-zinc-300">
              {songs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 transition-all shadow-xs hover:scale-105"
          >
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>Reading History</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-[#fa2d48] bg-[#fa2d48]/10 hover:bg-[#fa2d48]/20 border border-[#fa2d48]/30 transition-all shadow-xs hover:scale-105"
          >
            <Upload className="w-3.5 h-3.5 text-[#fa2d48]" />
            <span>Upload Lyrics (Host)</span>
          </button>
        </div>
      </section>

      {/* Popular Zion Songs Grid */}
      <section id="home-featured-lyrics-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Zion Songs Lyrics
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Line-by-line lyrics with theological context and stories
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'All', label: 'All Songs' },
              { id: 'Zion', label: 'Songs of Zion' },
              { id: 'Hymns', label: 'Sacred Hymns' },
              { id: 'Worship', label: 'Praise & Worship' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSongCategory(cat.id)}
                className={`text-xs px-3.5 py-1.5 rounded-full border whitespace-nowrap transition-all ${
                  songCategory === cat.id
                    ? 'bg-white text-black font-semibold border-white shadow-xs'
                    : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredSongs.map((song) => (
            <SongCard key={song.id} song={song} layout="grid" />
          ))}
        </div>
      </section>

      {/* Feature Bento Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Host Upload Lyrics Bento */}
        <div
          onClick={() => setActiveTab('upload')}
          className={`p-6 rounded-3xl border transition-all duration-200 cursor-pointer group ${
            theme === 'dark'
              ? 'bg-[#161618] border-white/10 hover:border-white/25 hover:bg-[#1a1a1d]'
              : 'bg-white border-black/10 hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#fa2d48]/15 border border-[#fa2d48]/30 flex items-center justify-center text-white">
              <Upload className="w-5 h-5 text-[#fa2d48]" />
            </div>
            <span className="text-[11px] font-semibold text-[#fa2d48] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Host Portal →
            </span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight group-hover:text-[#fa2d48] transition-colors">
            Upload Lyrics (Host)
          </h3>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
            Host portal to contribute songs, theological background, key signatures, authors, and verse-by-verse lyrics.
          </p>
        </div>

        {/* Dynamic Typography Bento */}
        <div
          onClick={() => setIsDynamicTypographyModalOpen(true)}
          className={`p-6 rounded-3xl border transition-all duration-200 cursor-pointer group ${
            theme === 'dark'
              ? 'bg-[#161618] border-white/10 hover:border-white/25 hover:bg-[#1a1a1d]'
              : 'bg-white border-black/10 hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-white">
              <SlidersHorizontal className="w-5 h-5 text-sky-400" />
            </div>
            <span className="text-[11px] font-semibold text-sky-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Customize Reader →
            </span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight group-hover:text-sky-400 transition-colors">
            Dynamic Typography
          </h3>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
            Read in Editorial Serif, Modern Sans, or Monospace with customizable scale steps, line spacing, and OLED contrast modes.
          </p>
        </div>

        {/* Shareable Quote Cards Bento */}
        <div
          onClick={() => setIsLyricCardModalOpen(true)}
          className={`p-6 rounded-3xl border transition-all duration-200 cursor-pointer group ${
            theme === 'dark'
              ? 'bg-[#161618] border-white/10 hover:border-white/25 hover:bg-[#1a1a1d]'
              : 'bg-white border-black/10 hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-white">
              <Share2 className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-[11px] font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Studio Generator →
            </span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
            Shareable Quote Cards
          </h3>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
            Generate high-resolution scripture and hymn cards with custom gradient backdrops, typography styles, and direct social sharing.
          </p>
        </div>
      </section>
    </div>
  );
};
