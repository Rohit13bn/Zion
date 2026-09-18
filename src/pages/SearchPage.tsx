import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Music, Disc, FileText, X } from 'lucide-react';
import { SongCard } from '../components/SongCard';
import { LANGUAGES_LIST } from '../data/songs';

export const SearchPage: React.FC = () => {
  const {
    songs,
    searchQuery,
    setSearchQuery,
    searchFilter,
    setSearchFilter,
    selectedLanguage,
    setSelectedLanguage,
    navigateToSong,
    theme
  } = useApp();

  const query = searchQuery.trim().toLowerCase();

  // Filter songs by title, lyrics, album, artist, and language
  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      if (selectedLanguage !== 'All' && song.language !== selectedLanguage) {
        return false;
      }

      if (!query) return true;

      const matchesTitle = song.title.toLowerCase().includes(query);
      const matchesArtist = song.artist.toLowerCase().includes(query);
      const matchesAlbum = song.album.toLowerCase().includes(query);
      const matchesLyrics = song.lyrics.some((sec) =>
        sec.lines.some((l) => l.toLowerCase().includes(query))
      );

      if (searchFilter === 'songs') return matchesTitle;
      if (searchFilter === 'albums') return matchesAlbum;
      if (searchFilter === 'lyrics') return matchesLyrics;

      return matchesTitle || matchesArtist || matchesAlbum || matchesLyrics;
    });
  }, [songs, query, searchFilter, selectedLanguage]);

  // Extract matching albums
  const filteredAlbums = useMemo(() => {
    if (searchFilter === 'songs' || searchFilter === 'lyrics') {
      return [];
    }
    const albumsMap = new Map<string, { title: string; artist: string; year: number; cover: string; songId: string }>();
    songs.forEach((s) => {
      if (!query || s.album.toLowerCase().includes(query) || s.artist.toLowerCase().includes(query)) {
        if (!albumsMap.has(s.album)) {
          albumsMap.set(s.album, {
            title: s.album,
            artist: s.artist,
            year: s.releaseYear,
            cover: s.albumArt,
            songId: s.id
          });
        }
      }
    });
    return Array.from(albumsMap.values());
  }, [songs, query, searchFilter]);

  const filterTabs: { id: 'all' | 'songs' | 'albums' | 'lyrics'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Top Results', icon: <Search className="w-3 h-3" /> },
    { id: 'songs', label: 'Songs', icon: <Music className="w-3 h-3" /> },
    { id: 'albums', label: 'Albums', icon: <Disc className="w-3 h-3" /> },
    { id: 'lyrics', label: 'Lyrics Only', icon: <FileText className="w-3 h-3" /> }
  ];

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Search Header */}
      <div className="space-y-5">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Search
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-normal">
            Find Zion songs by title, artist, album, or phrases from the lyrics.
          </p>
        </div>

        {/* Search Capsule */}
        <div className="relative shadow-2xl">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input
            id="main-search-input"
            type="text"
            placeholder="Type 'Perfect', 'Kesariya', or lyric lines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className={`w-full pl-11 pr-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm tracking-tight border outline-hidden transition-all ${
              theme === 'dark'
                ? 'bg-zinc-900 border-white/15 text-white placeholder-zinc-500 focus:border-[#fa2d48] focus:ring-1 focus:ring-[#fa2d48]/40'
                : 'bg-white border-black/15 text-zinc-900 placeholder-zinc-400 focus:border-[#fa2d48] focus:ring-1 focus:ring-[#fa2d48]/40 shadow-sm'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills & Language Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Segmented Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSearchFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition-all border ${
                  searchFilter === tab.id
                    ? 'bg-white text-black border-white shadow-xs font-semibold'
                    : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* iOS-style Language Selector Pill */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-zinc-500 font-medium shrink-0">Language:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-zinc-900 text-zinc-200 outline-hidden font-medium"
            >
              {LANGUAGES_LIST.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count feedback */}
      <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-white/[0.08] pb-3">
        <span>
          Results for <strong className="text-zinc-200">"{searchQuery || 'Catalog'}"</strong>
        </span>
        <span>{filteredSongs.length} found</span>
      </div>

      {/* Albums Grid */}
      {(searchFilter === 'all' || searchFilter === 'albums') && filteredAlbums.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold tracking-tight text-white flex items-center gap-2">
            <Disc className="w-4 h-4 text-[#fa2d48]" />
            <span>Albums</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filteredAlbums.map((alb) => (
              <div
                key={alb.title}
                onClick={() => navigateToSong(alb.songId)}
                className="p-3 rounded-2xl cursor-pointer border border-white/[0.06] bg-[#161618] hover:border-white/20 hover:bg-[#1c1c1f] transition-all group"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-2.5 bg-zinc-900 ring-1 ring-white/10">
                  <img src={alb.cover} alt={alb.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <h4 className="font-semibold text-xs text-white truncate group-hover:text-[#fa2d48] transition-colors">{alb.title}</h4>
                <p className="text-[11px] text-zinc-400 truncate mt-0.5">{alb.artist} • {alb.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Songs & Lyrics List */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-white flex items-center gap-2">
          <Music className="w-4 h-4 text-[#fa2d48]" />
          <span>Songs & Lyrics</span>
        </h2>

        {filteredSongs.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-zinc-800">
            <Music className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="font-semibold text-sm text-zinc-300">No matching lyrics found</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
              Try searching by artist name, track title, or lyrics keywords.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} layout="list" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
