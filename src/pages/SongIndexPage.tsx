import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Search, Filter, Sparkles, Play, Pause, Heart, ArrowRight, Share2, Music, CheckCircle2 } from 'lucide-react';
import { Song } from '../types';

export const SongIndexPage: React.FC = () => {
  const {
    songs,
    navigateToSong,
    openQuoteCardWithQuote,
    toggleFavorite,
    isFavorite,
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
    setActiveTab,
    theme
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'artist'>('title');

  // Compute available alphabet letters from catalog
  const alphabet = useMemo(() => {
    const letters = new Set<string>();
    songs.forEach((s) => {
      const firstChar = s.title.trim().charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        letters.add(firstChar);
      } else {
        letters.add('#');
      }
    });
    return Array.from(letters).sort();
  }, [songs]);

  // Filter and sort catalog
  const filteredSongs = useMemo(() => {
    return songs
      .filter((song) => {
        // Search filter
        if (searchFilter.trim()) {
          const q = searchFilter.toLowerCase();
          const matchTitle = song.title.toLowerCase().includes(q);
          const matchArtist = song.artist.toLowerCase().includes(q);
          const matchAlbum = song.album.toLowerCase().includes(q);
          const matchLyrics = song.lyrics.some((l) =>
            l.lines.some((line) => line.toLowerCase().includes(q))
          );
          if (!matchTitle && !matchArtist && !matchAlbum && !matchLyrics) {
            return false;
          }
        }

        // Letter filter
        if (selectedLetter !== 'ALL') {
          const firstChar = song.title.trim().charAt(0).toUpperCase();
          if (selectedLetter === '#') {
            if (/[A-Z]/.test(firstChar)) return false;
          } else {
            if (firstChar !== selectedLetter) return false;
          }
        }

        // Category filter
        if (categoryFilter !== 'ALL') {
          if (categoryFilter === 'ZION') {
            const isZion =
              song.title.toLowerCase().includes('zion') ||
              song.album.toLowerCase().includes('zion') ||
              song.lyrics.some((l) =>
                l.lines.some((line) => line.toLowerCase().includes('zion'))
              );
            if (!isZion) return false;
          } else if (categoryFilter === 'HYMNS') {
            if (!song.genre.toLowerCase().includes('hymn')) return false;
          } else if (categoryFilter === 'WORSHIP') {
            if (!song.genre.toLowerCase().includes('worship') && !song.genre.toLowerCase().includes('praise'))
              return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'artist') return a.artist.localeCompare(b.artist);
        if (sortBy === 'year') return b.releaseYear - a.releaseYear;
        return 0;
      });
  }, [songs, searchFilter, selectedLetter, categoryFilter, sortBy]);

  // Group songs by starting character
  const groupedSongs = useMemo(() => {
    const groups: { [key: string]: Song[] } = {};
    filteredSongs.forEach((song) => {
      const firstChar = song.title.trim().charAt(0).toUpperCase();
      const groupKey = /[A-Z]/.test(firstChar) ? firstChar : '#';
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(song);
    });
    return groups;
  }, [filteredSongs]);

  const sortedGroupKeys = Object.keys(groupedSongs).sort();

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Index Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#fa2d48] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sacred Catalog Index</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Index of All Songs
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
            Browse sacred hymns, pilgrimage anthems, and songs of Zion in complete alphabetical order.
          </p>
        </div>

        {/* Quick Summary Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-center">
            <span className="block text-lg font-bold text-white leading-none">{songs.length}</span>
            <span className="text-[10px] text-zinc-400 font-medium">Hymns & Songs</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-7 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search index by song title, author, or lyric line..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white/[0.06] border border-white/10 text-white placeholder-zinc-500 focus:outline-hidden focus:border-[#fa2d48] focus:ring-1 focus:ring-[#fa2d48]/30 transition-all"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm bg-white/[0.06] border border-white/10 text-white focus:outline-hidden focus:border-[#fa2d48]"
            >
              <option value="ALL" className="bg-zinc-900 text-white">All Classifications</option>
              <option value="ZION" className="bg-zinc-900 text-white">Songs of Zion</option>
              <option value="HYMNS" className="bg-zinc-900 text-white">Traditional Hymns</option>
              <option value="WORSHIP" className="bg-zinc-900 text-white">Praise & Worship</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="sm:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm bg-white/[0.06] border border-white/10 text-white focus:outline-hidden focus:border-[#fa2d48]"
            >
              <option value="title" className="bg-zinc-900 text-white">Sort: Title (A-Z)</option>
              <option value="artist" className="bg-zinc-900 text-white">Sort: Author</option>
              <option value="year" className="bg-zinc-900 text-white">Sort: Year</option>
            </select>
          </div>
        </div>

        {/* A–Z Alphabet Quick-Jump Bar */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 pt-1 border-y border-white/5">
          <button
            onClick={() => setSelectedLetter('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
              selectedLetter === 'ALL'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            All ({songs.length})
          </button>
          {['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].map(
            (char) => {
              const hasSongs = alphabet.includes(char);
              const isSelected = selectedLetter === char;
              return (
                <button
                  key={char}
                  onClick={() => hasSongs && setSelectedLetter(char)}
                  disabled={!hasSongs}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[#fa2d48] text-white shadow-xs'
                      : hasSongs
                      ? 'text-zinc-300 hover:text-white hover:bg-white/10'
                      : 'text-zinc-600 opacity-40 cursor-not-allowed'
                  }`}
                >
                  {char}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Songs Index Listing */}
      {filteredSongs.length === 0 ? (
        <div className="py-16 text-center rounded-3xl border border-white/10 bg-white/[0.02]">
          <BookOpen className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No songs matched your query</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or reset the letter filter to browse the full index.
          </p>
          <button
            onClick={() => {
              setSearchFilter('');
              setSelectedLetter('ALL');
              setCategoryFilter('ALL');
            }}
            className="mt-4 px-4 py-2 rounded-full text-xs font-medium bg-white text-black hover:bg-zinc-200 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedGroupKeys.map((groupKey) => {
            const groupList = groupedSongs[groupKey];
            return (
              <div key={groupKey} id={`section-${groupKey}`} className="space-y-3">
                {/* Group Letter Marker */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#fa2d48]/15 border border-[#fa2d48]/30 text-[#fa2d48] font-bold text-sm flex items-center justify-center">
                    {groupKey}
                  </div>
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {groupList.length} {groupList.length === 1 ? 'Song' : 'Songs'}
                  </div>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Song Rows in this letter group */}
                <div className="grid grid-cols-1 gap-2.5">
                  {groupList.map((song) => {
                    const isCurrent = currentSong?.id === song.id;
                    const playingThis = isCurrent && isPlaying;

                    return (
                      <div
                        key={song.id}
                        className={`group p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 ${
                          theme === 'dark'
                            ? 'bg-[#151518] hover:bg-[#1c1c22] border-white/10 hover:border-white/20'
                            : 'bg-white hover:bg-zinc-50 border-black/10 shadow-2xs'
                        }`}
                      >
                        {/* Thumbnail & Quick Play */}
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 ring-1 ring-white/10 shadow-xs">
                          <img
                            src={song.albumArt}
                            alt={song.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isCurrent) {
                                togglePlay();
                              } else {
                                playSong(song);
                              }
                            }}
                            className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                          >
                            {playingThis ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                          </button>
                        </div>

                        {/* Title & Info */}
                        <div
                          onClick={() => navigateToSong(song.id)}
                          className="flex-1 min-w-0 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm sm:text-base text-white truncate group-hover:text-[#fa2d48] transition-colors">
                              {song.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                            <span className="font-medium text-zinc-300">{song.artist}</span>
                            <span>•</span>
                            <span className="truncate">{song.album}</span>
                            <span>•</span>
                            <span>{song.releaseYear}</span>
                            <span>•</span>
                            <span>{song.duration}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => toggleFavorite(song.id)}
                            className={`p-2 rounded-full transition-colors ${
                              isFavorite(song.id)
                                ? 'text-[#fa2d48] bg-[#fa2d48]/10'
                                : 'text-zinc-400 hover:text-white hover:bg-white/10'
                            }`}
                            title="Add to Favorites"
                          >
                            <Heart className={`w-4 h-4 ${isFavorite(song.id) ? 'fill-current' : ''}`} />
                          </button>

                          <button
                            onClick={() =>
                              openQuoteCardWithQuote(
                                song.lyrics[0]?.lines[0] || song.title,
                                song.id
                              )
                            }
                            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors hidden sm:block"
                            title="Create Quote Card"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => navigateToSong(song.id)}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-all shadow-xs"
                          >
                            <span>Lyrics</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Index Footer Banner */}
      <div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-900/80 via-black to-zinc-900/80 text-center space-y-2">
        <p className="text-base sm:text-lg font-serif italic text-zinc-200">
          “Sing to the LORD a new song.” — Psalm 98:1
        </p>
      </div>
    </div>
  );
};
