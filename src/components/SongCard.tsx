import React from 'react';
import { Song } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, FileText } from 'lucide-react';

interface SongCardProps {
  song: Song;
  showRank?: boolean;
  layout?: 'grid' | 'list';
}

export const SongCard: React.FC<SongCardProps> = ({
  song,
  layout = 'grid'
}) => {
  const {
    navigateToSong,
    toggleFavorite,
    isFavorite,
    theme
  } = useApp();

  const favorited = isFavorite(song.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(song.id);
  };

  if (layout === 'list') {
    return (
      <div
        id={`song-list-item-${song.id}`}
        onClick={() => navigateToSong(song.id)}
        className={`group flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${
          theme === 'dark'
            ? 'bg-[#161618] border-white/[0.06] hover:bg-[#1f1f22] hover:border-white/[0.12]'
            : 'bg-white border-black/[0.06] hover:bg-zinc-50 hover:border-black/[0.12] shadow-2xs'
        }`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 ring-1 ring-black/10 shadow-xs">
            <img
              src={song.albumArt}
              alt={song.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="min-w-0">
            <h4 className={`font-semibold text-xs sm:text-sm tracking-tight truncate group-hover:text-[#fa2d48] transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-zinc-900'
            }`}>
              {song.title}
            </h4>
            <p className={`text-xs truncate mt-0.5 font-normal ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              {song.artist} <span className={theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}>•</span> {song.album}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full transition-colors ${
            theme === 'dark'
              ? 'text-zinc-300 bg-white/[0.06] border border-white/10 group-hover:border-[#fa2d48]/40 group-hover:text-white'
              : 'text-zinc-700 bg-black/[0.04] border border-black/10 group-hover:border-[#fa2d48]/40 group-hover:text-zinc-950'
          }`}>
            <FileText className="w-3 h-3 text-[#fa2d48]" />
            <span>Lyrics</span>
          </span>
          <span className={`text-xs font-mono hidden sm:inline-block ${
            theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
          }`}>
            {song.duration}
          </span>
          <button
            id={`fav-btn-${song.id}`}
            onClick={handleFavoriteClick}
            aria-label="Toggle Favorite"
            className={`p-2 rounded-full transition-colors focus:outline-hidden ${
              theme === 'dark'
                ? 'text-zinc-400 hover:text-[#fa2d48]'
                : 'text-zinc-500 hover:text-[#fa2d48]'
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                favorited ? 'text-[#fa2d48] fill-[#fa2d48]' : ''
              }`}
            />
          </button>
        </div>
      </div>
    );
  }

  // Grid Card Layout
  return (
    <div
      id={`song-card-${song.id}`}
      onClick={() => navigateToSong(song.id)}
      className={`group relative rounded-3xl p-3 cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
        theme === 'dark'
          ? 'bg-[#161618] border-white/[0.06] hover:border-white/[0.18] hover:bg-[#1c1c1f] hover:-translate-y-1 hover:shadow-2xl'
          : 'bg-white border-zinc-200/90 hover:border-zinc-300 hover:bg-zinc-50/90 hover:-translate-y-1 shadow-2xs hover:shadow-md'
      }`}
    >
      <div>
        {/* Squircle Cover Art */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-3 bg-zinc-900 shadow-md ring-1 ring-black/10">
          <img
            src={song.albumArt}
            alt={song.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Frosted heart button */}
          <button
            id={`fav-badge-${song.id}`}
            onClick={handleFavoriteClick}
            aria-label="Toggle favorite"
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:text-[#fa2d48] transition-transform active:scale-90 border border-white/10"
          >
            <Heart
              className={`w-3.5 h-3.5 ${favorited ? 'text-[#fa2d48] fill-[#fa2d48]' : ''}`}
            />
          </button>

          {/* Read Lyrics frosted indicator on hover */}
          <div className="absolute inset-x-3 bottom-3 py-2 px-3 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium text-center opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 border border-white/10">
            <FileText className="w-3 h-3 text-[#fa2d48]" />
            <span>Read Lyrics</span>
          </div>
        </div>

        {/* Title & Artist */}
        <h3 className={`font-semibold text-xs sm:text-sm tracking-tight truncate group-hover:text-[#fa2d48] transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-zinc-900'
        }`}>
          {song.title}
        </h3>
        <p className={`text-xs truncate mt-0.5 font-normal ${
          theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          {song.artist}
        </p>
      </div>

      {/* Footer Spec info */}
      <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] ${
        theme === 'dark'
          ? 'border-white/[0.06] text-zinc-500'
          : 'border-zinc-200/80 text-zinc-500'
      }`}>
        <span className="truncate max-w-[120px]">{song.album}</span>
        <span className="font-mono">{song.duration}</span>
      </div>
    </div>
  );
};
