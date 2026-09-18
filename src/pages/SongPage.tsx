import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Heart,
  Share2,
  Copy,
  Check,
  Sparkles,
  Type,
  MessageSquare,
  ThumbsUp,
  Send,
  Music,
  Info,
  Calendar,
  Disc,
  BookOpen,
  SlidersHorizontal
} from 'lucide-react';
import { SongCard } from '../components/SongCard';
import confetti from 'canvas-confetti';

export const SongPage: React.FC = () => {
  const {
    songs,
    selectedSongId,
    setActiveTab,
    navigateToSearch,
    isFavorite,
    toggleFavorite,
    lyricsFont,
    setLyricsFont,
    setIsLyricCardModalOpen,
    setLyricCardQuote,
    setIsDynamicTypographyModalOpen,
    showToast,
    comments,
    addComment,
    likeComment,
    theme
  } = useApp();

  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [showMeaningTab, setShowMeaningTab] = useState(false);

  // Find selected song or fallback to first
  const song = songs.find((s) => s.id === selectedSongId) || songs[0];
  const favorited = isFavorite(song.id);

  // Filter comments for this song
  const songComments = comments.filter((c) => c.songId === song.id);

  // Related songs
  const relatedSongs = songs
    .filter((s) => s.id !== song.id && (s.genre === song.genre || s.artistId === song.artistId))
    .slice(0, 3);

  const handleCopyAllLyrics = () => {
    const fullText = song.lyrics
      .map((sec) => `[${sec.type}]\n` + sec.lines.join('\n'))
      .join('\n\n');
    const attribution = `\n\n"${song.title}" by ${song.artist}\nAlbum: ${song.album} (${song.releaseYear})\nLyrics via Lyrical`;
    navigator.clipboard.writeText(fullText + attribution);
    setCopiedLyrics(true);
    showToast('Lyrics copied to clipboard');
    confetti({ particleCount: 25, spread: 45 });
    setTimeout(() => setCopiedLyrics(false), 2500);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${song.title} — ${song.artist}`,
          text: `Read lyrics for "${song.title}" by ${song.artist} on Zion Lyrics`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard');
    }
  };

  const handleOpenLyricCard = (lineText?: string) => {
    if (lineText) {
      setLyricCardQuote(lineText);
    } else {
      const defaultQuote =
        song.lyrics.find((s) => s.type === 'Chorus')?.lines[0] ||
        song.lyrics[0]?.lines[0] ||
        'Sing to the LORD a new song.';
      setLyricCardQuote(defaultQuote);
    }
    setIsLyricCardModalOpen(true);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(song.id, commentInput.trim());
    setCommentInput('');
  };

  // Font styling class mapping
  const getFontSizeClass = () => {
    switch (lyricsFont.fontSize) {
      case 'sm':
        return 'text-base sm:text-lg';
      case 'base':
        return 'text-lg sm:text-xl';
      case 'lg':
        return 'text-xl sm:text-2xl';
      case 'xl':
        return 'text-2xl sm:text-3xl';
      case '2xl':
        return 'text-3xl sm:text-4xl';
      default:
        return 'text-xl sm:text-2xl';
    }
  };

  const getFontFamilyClass = () => {
    switch (lyricsFont.fontFamily) {
      case 'serif':
        return 'font-serif';
      case 'mono':
        return 'font-mono';
      case 'sans':
      default:
        return 'font-sans';
    }
  };

  const getLineSpacingClass = () => {
    switch (lyricsFont.lineSpacing) {
      case 'tight':
        return 'leading-snug space-y-1.5';
      case 'normal':
        return 'leading-normal space-y-2.5';
      case 'relaxed':
        return 'leading-relaxed space-y-3.5';
      case 'spacious':
        return 'leading-loose space-y-5';
      default:
        return 'leading-relaxed space-y-3.5';
    }
  };

  return (
    <div className="space-y-12 pb-16 animate-in fade-in duration-300">
      {/* Navigation Breadcrumb */}
      <button
        id="song-page-back-btn"
        onClick={() => setActiveTab('home')}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white transition-colors border border-white/5 bg-white/[0.03]"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Browse Catalog</span>
      </button>

      {/* Hero Card */}
      <section
        id="song-hero-banner"
        className={`relative p-6 sm:p-10 rounded-3xl border overflow-hidden transition-all ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-[#161618] via-[#111113] to-[#09090b] border-white/10 shadow-2xl'
            : 'bg-white border-black/10 shadow-md'
        }`}
      >
        {/* Soft specular ambient glow behind cover */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#fa2d48]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Squircle Cover */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-2xl shrink-0 ring-1 ring-white/20">
            <img
              src={song.albumArt}
              alt={song.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Song Metadata */}
          <div className="flex-1 text-center md:text-left min-w-0">
            {/* Master Style Pill */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/10 text-zinc-300 border border-white/10">
                {song.language}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#fa2d48]/15 text-[#fa2d48] border border-[#fa2d48]/20">
                Zion Hymnal Archive
              </span>
            </div>

            {/* Song Title */}
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {song.title}
            </h1>

            {/* Artist clickable */}
            <p
              onClick={() => navigateToSearch(song.artist)}
              className="text-lg sm:text-xl font-medium text-zinc-300 hover:text-[#fa2d48] transition-colors cursor-pointer mt-1.5 inline-block"
              title="Search artist songs"
            >
              {song.artist}
            </p>

            {/* Album & Specs row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Disc className="w-3.5 h-3.5 text-zinc-400" />
                <strong className="text-zinc-200 font-medium">{song.album}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>{song.releaseYear}</span>
              </span>
              <span>•</span>
              <span className="font-mono text-zinc-400">{song.duration}</span>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mt-7">
              {/* Generate Lyric Card Button */}
              <button
                id="song-card-gen-btn"
                onClick={() => handleOpenLyricCard()}
                className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-tight flex items-center gap-2 bg-[#fa2d48] hover:bg-[#fc3c44] text-white shadow-lg shadow-[#fa2d48]/25 active:scale-98 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Create Lyric Card</span>
              </button>

              {/* Favorite Button */}
              <button
                id="song-fav-action-btn"
                onClick={() => toggleFavorite(song.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-tight flex items-center gap-2 border transition-all active:scale-98 ${
                  favorited
                    ? 'bg-[#fa2d48]/20 border-[#fa2d48]/40 text-[#fa2d48]'
                    : theme === 'dark'
                    ? 'bg-zinc-900 border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800'
                    : 'bg-zinc-100 border-black/10 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-[#fa2d48] text-[#fa2d48]' : ''}`} />
                <span>{favorited ? 'Saved' : 'Save Song'}</span>
              </button>

              {/* Copy All Lyrics */}
              <button
                id="song-copy-lyrics-btn"
                onClick={handleCopyAllLyrics}
                className="px-4 py-2.5 rounded-full text-xs font-semibold tracking-tight border border-white/10 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center gap-2 transition-all"
              >
                {copiedLyrics ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              {/* Share Button */}
              <button
                id="song-share-action-btn"
                onClick={handleShareClick}
                className="p-2.5 rounded-full border border-white/10 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                title="Share link"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Lyrics Section + Control Center Toolbar */}
      <section id="song-lyrics-viewer-container" className="space-y-4">
        {/* Segmented Control Bar */}
        <div
          className={`flex flex-wrap items-center justify-between p-2.5 sm:p-3 rounded-2xl border gap-3 ${
            theme === 'dark' ? 'bg-[#161618] border-white/10' : 'bg-white border-black/10 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-tight text-white flex items-center gap-1.5 px-2">
              <Type className="w-3.5 h-3.5 text-[#fa2d48]" /> Lyrics
            </span>
            {song.translationNotes && (
              <button
                onClick={() => setShowMeaningTab(!showMeaningTab)}
                className={`text-xs px-3 py-1 rounded-full border flex items-center gap-1.5 transition-all ${
                  showMeaningTab
                    ? 'bg-[#fa2d48] border-[#fa2d48] text-white font-medium'
                    : 'bg-zinc-900/60 border-white/10 text-zinc-300 hover:text-white'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>Meaning</span>
              </button>
            )}
          </div>

          {/* Quick Font Controls in iOS Segmented Style */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Dynamic Typography Engine Launcher */}
            <button
              onClick={() => setIsDynamicTypographyModalOpen(true)}
              className="px-3 py-1 text-xs rounded-full border border-white/10 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center gap-1.5 transition-colors"
              title="Open full Dynamic Typography Engine"
            >
              <SlidersHorizontal className="w-3 h-3 text-sky-400" />
              <span>Typography Engine</span>
            </button>

            {/* Font Family Segmented Control */}
            <div className="flex items-center bg-black/40 border border-white/10 rounded-full p-0.5">
              {(['sans', 'serif', 'mono'] as const).map((font) => (
                <button
                  key={font}
                  onClick={() => setLyricsFont((prev) => ({ ...prev, fontFamily: font }))}
                  className={`px-3 py-1 text-xs rounded-full capitalize font-medium transition-all ${
                    lyricsFont.fontFamily === font
                      ? 'bg-white text-black shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {font}
                </button>
              ))}
            </div>

            {/* Font Size Selector */}
            <div className="flex items-center bg-black/40 border border-white/10 rounded-full p-0.5">
              {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setLyricsFont((prev) => ({ ...prev, fontSize: sz }))}
                  className={`px-2.5 py-1 text-xs font-semibold transition-all rounded-full ${
                    lyricsFont.fontSize === sz
                      ? 'bg-white text-black shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {sz === 'sm' ? 'A-' : sz === 'base' ? 'A' : sz === 'lg' ? 'A+' : 'A++'}
                </button>
              ))}
            </div>

            {/* Line Spacing Selector */}
            <div className="hidden sm:flex items-center bg-black/40 border border-white/10 rounded-full p-0.5">
              {(['tight', 'relaxed', 'spacious'] as const).map((sp) => (
                <button
                  key={sp}
                  onClick={() => setLyricsFont((prev) => ({ ...prev, lineSpacing: sp }))}
                  className={`px-2.5 py-1 text-[11px] font-medium transition-all rounded-full capitalize ${
                    lyricsFont.lineSpacing === sp
                      ? 'bg-white text-black shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Translation & Notes Drawer */}
        {showMeaningTab && song.translationNotes && (
          <div
            className={`p-5 sm:p-6 rounded-3xl border animate-in fade-in duration-200 ${
              theme === 'dark'
                ? 'bg-[#18181b] border-white/15 text-zinc-300'
                : 'bg-zinc-100 border-black/10 text-zinc-800'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold text-xs tracking-tight text-white mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#fa2d48]" />
              <span>Cultural Meaning & Context</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed font-normal">{song.translationNotes}</p>
          </div>
        )}

        {/* High-Contrast Lyrics Sheet */}
        <div
          id="formatted-lyrics-sheet"
          className={`p-6 sm:p-14 rounded-3xl border transition-all ${
            theme === 'dark'
              ? 'bg-[#0f0f11] border-white/10'
              : 'bg-white border-black/10 shadow-xs'
          }`}
        >
          <div className={`max-w-2xl mx-auto space-y-12 ${getFontFamilyClass()}`}>
            {song.lyrics.map((section, sIdx) => (
              <div key={sIdx} className="space-y-4">
                {/* Section Tag */}
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/10 text-zinc-400 border border-white/10 font-sans">
                    {section.type}
                  </span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>

                {/* Lyrics Lines */}
                <div className={`${getLineSpacingClass()} ${getFontSizeClass()}`}>
                  {section.lines.map((line, lIdx) => (
                    <div
                      key={lIdx}
                      onClick={() => handleOpenLyricCard(line)}
                      title="Tap to create lyric card"
                      className="group cursor-pointer py-1.5 px-3 -mx-3 rounded-2xl transition-all flex items-baseline justify-between text-white/90 hover:text-white hover:bg-white/[0.06]"
                    >
                      <p className="font-medium tracking-tight transition-colors group-hover:text-white">
                        {line}
                      </p>
                      <span className="opacity-0 group-hover:opacity-100 text-[10px] font-semibold text-[#fa2d48] shrink-0 ml-3 tracking-wider flex items-center gap-1 font-sans">
                        <Sparkles className="w-3 h-3" /> Quote Card
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* End of Lyrics attribution */}
          <div className="text-center pt-10 border-t border-white/10 mt-12 text-xs text-zinc-500 font-sans">
            Lyrics transcription for "{song.title}"
          </div>
        </div>
      </section>

      {/* About Song & Credits */}
      <section
        id="about-this-song-section"
        className={`p-6 sm:p-8 rounded-3xl border ${
          theme === 'dark' ? 'bg-[#161618] border-white/10' : 'bg-white border-black/10'
        }`}
      >
        <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
          <Info className="w-4 h-4 text-[#fa2d48]" />
          <span>About "{song.title}"</span>
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">{song.aboutSong}</p>

        {/* Credits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10 text-xs">
          {song.writers && (
            <div>
              <span className="text-zinc-500 uppercase tracking-wider font-semibold block mb-1 text-[10px]">
                Written By
              </span>
              <span className="font-medium text-zinc-200">{song.writers.join(', ')}</span>
            </div>
          )}
          {song.producers && (
            <div>
              <span className="text-zinc-500 uppercase tracking-wider font-semibold block mb-1 text-[10px]">
                Produced By
              </span>
              <span className="font-medium text-zinc-200">{song.producers.join(', ')}</span>
            </div>
          )}
        </div>
      </section>

      {/* Community Thoughts (iOS Message Style) */}
      <section
        id="song-comments-discussion-section"
        className={`p-6 sm:p-8 rounded-3xl border ${
          theme === 'dark' ? 'bg-[#161618] border-white/10' : 'bg-white border-black/10'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#fa2d48]" />
            <h3 className="text-base font-semibold text-white">Lyrics Discussion</h3>
          </div>
          <span className="text-xs text-zinc-500">{songComments.length} thoughts</span>
        </div>

        {/* Comment Form */}
        <form onSubmit={handlePostComment} className="flex gap-3 mb-6">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-800 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Share your reflection or worship thought..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className={`flex-1 px-4 py-2 text-xs rounded-full border outline-hidden transition-colors ${
                theme === 'dark'
                  ? 'bg-zinc-900 border-white/10 text-white focus:border-[#fa2d48]'
                  : 'bg-zinc-100 border-black/10 text-zinc-900 focus:border-[#fa2d48]'
              }`}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-200 font-medium text-xs flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3 h-3" />
              <span>Share</span>
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-3">
          {songComments.length === 0 ? (
            <p className="text-xs text-zinc-500 text-center py-6">
              Be the first to share your interpretation or memory with these lyrics.
            </p>
          ) : (
            songComments.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl border border-white/5 bg-zinc-900/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={c.userAvatar}
                      alt={c.userName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="font-medium text-xs text-white">{c.userName}</h5>
                      <span className="text-[10px] text-zinc-500">{c.timestamp}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => likeComment(c.id)}
                    className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full transition-colors ${
                      c.isLiked
                        ? 'text-[#fa2d48] bg-[#fa2d48]/10'
                        : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{c.likes}</span>
                  </button>
                </div>
                <p className="text-xs text-zinc-300 pl-8 leading-relaxed font-normal">
                  {c.content}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related Songs Section */}
      {relatedSongs.length > 0 && (
        <section id="song-related-section">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Music className="w-4 h-4 text-[#fa2d48]" />
              <span>More Lyrics You Might Love</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedSongs.map((rSong) => (
              <SongCard key={rSong.id} song={rSong} layout="grid" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
