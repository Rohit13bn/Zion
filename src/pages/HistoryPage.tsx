import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Trash2, BookOpen, Music, ArrowRight, Sparkles, Play, Pause, Heart } from 'lucide-react';
import { SongCard } from '../components/SongCard';

export const HistoryPage: React.FC = () => {
  const {
    recentlyViewed,
    songs,
    clearHistory,
    removeFromHistory,
    navigateToSong,
    setActiveTab,
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
    toggleFavorite,
    isFavorite,
    theme
  } = useApp();

  // Resolve recently viewed song objects in order of view
  const recentSongs = recentlyViewed
    .map((id) => songs.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#fa2d48] uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Sacred Reading Journey</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Reading History
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Review songs and sacred hymns of Zion you recently viewed.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {recentSongs.length > 0 && (
            <button
              onClick={clearHistory}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.06] hover:bg-red-500/20 hover:border-red-500/40 border border-white/10 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Clear History</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('index')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-black bg-white hover:bg-zinc-200 transition-all shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>A–Z Song Index</span>
          </button>
        </div>
      </div>

      {recentSongs.length === 0 ? (
        /* Empty State */
        <div className="py-20 text-center flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02]">
          <div className="w-14 h-14 rounded-2xl bg-[#fa2d48]/10 border border-[#fa2d48]/20 flex items-center justify-center text-[#fa2d48] mb-4">
            <Clock className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-semibold text-white">No Reading History Yet</h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mt-1 mb-6">
            When you open and read lyrics to songs of Zion, they will automatically be recorded here for convenient return.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#fa2d48] hover:bg-[#fc3c44] text-white transition-all shadow-md"
            >
              Explore Zion Songs
            </button>
            <button
              onClick={() => setActiveTab('index')}
              className="px-5 py-2.5 rounded-full text-xs font-medium bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15 transition-all"
            >
              View A–Z Index
            </button>
          </div>
        </div>
      ) : (
        /* Song History Items */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span>{recentSongs.length} {recentSongs.length === 1 ? 'song' : 'songs'} in your reading log</span>
            <span>Sorted by most recently viewed</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {recentSongs.map((song, index) => {
              const isCurrent = currentSong?.id === song.id;
              const playingThis = isCurrent && isPlaying;

              return (
                <div
                  key={song.id}
                  className={`group relative p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                    theme === 'dark'
                      ? 'bg-[#151518] hover:bg-[#1b1b20] border-white/10 hover:border-white/20'
                      : 'bg-white hover:bg-zinc-50 border-black/10 shadow-2xs'
                  }`}
                >
                  {/* Sequence Number */}
                  <div className="w-6 text-center text-xs font-semibold text-zinc-500 shrink-0">
                    {index + 1}
                  </div>

                  {/* Album Cover & Quick Play Button */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm ring-1 ring-white/10">
                    <img
                      src={song.albumArt}
                      alt={song.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                      title={playingThis ? 'Pause' : 'Play melody'}
                    >
                      {playingThis ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                  </div>

                  {/* Song Details */}
                  <div
                    onClick={() => navigateToSong(song.id)}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm sm:text-base text-white truncate group-hover:text-[#fa2d48] transition-colors">
                        {song.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                      <span className="font-medium text-zinc-300">{song.artist}</span>
                      <span>•</span>
                      <span className="truncate">{song.album}</span>
                      <span>•</span>
                      <span>{song.duration}</span>
                    </div>
                    {song.aboutSong && (
                      <p className="text-[11px] text-zinc-500 line-clamp-1 mt-1 hidden sm:block">
                        {song.aboutSong}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleFavorite(song.id)}
                      className={`p-2 rounded-full transition-colors ${
                        isFavorite(song.id)
                          ? 'text-[#fa2d48] bg-[#fa2d48]/10'
                          : 'text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                      title="Favorite"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(song.id) ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => removeFromHistory(song.id)}
                      className="p-2 rounded-full text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Remove from history"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigateToSong(song.id)}
                      className="hidden sm:inline-flex items-center gap-1 text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/10 transition-all"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Biblical Quote Card Footer */}
      <div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-900/80 via-black to-zinc-900/80 text-center space-y-2">
        <p className="text-base sm:text-lg font-serif italic text-zinc-200">
          “Sing to the LORD a new song.” — Psalm 98:1
        </p>
      </div>
    </div>
  );
};
