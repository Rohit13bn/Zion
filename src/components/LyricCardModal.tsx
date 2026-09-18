import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Song } from '../types';
import confetti from 'canvas-confetti';
import { Sparkles, Download, Copy, X, Check, Share2, Music } from 'lucide-react';

interface LyricCardModalProps {
  song?: Song;
}

const CARD_THEMES = [
  { id: 'space-black', name: 'Space Black', bg: 'from-[#000000] via-[#121214] to-[#1c1c1e]', border: 'border-white/15', accent: '#FFFFFF', gradientStart: '#000000', gradientMid: '#121214', gradientEnd: '#1c1c1e' },
  { id: 'zion-crimson', name: 'Zion Crimson', bg: 'from-[#2e0307] via-[#590714] to-[#120104]', border: 'border-[#fa2d48]/40', accent: '#fa2d48', gradientStart: '#2e0307', gradientMid: '#590714', gradientEnd: '#120104' },
  { id: 'titanium', name: 'Titanium', bg: 'from-[#1c1917] via-[#292524] to-[#0c0a09]', border: 'border-amber-200/20', accent: '#E7E5E4', gradientStart: '#1c1917', gradientMid: '#292524', gradientEnd: '#0c0a09' },
  { id: 'midnight', name: 'Midnight Blue', bg: 'from-[#030712] via-[#0f172a] to-[#020617]', border: 'border-sky-500/30', accent: '#38BDF8', gradientStart: '#030712', gradientMid: '#0f172a', gradientEnd: '#020617' },
  { id: 'alpine', name: 'Alpine Forest', bg: 'from-[#022c22] via-[#064e3b] to-[#021d17]', border: 'border-emerald-500/30', accent: '#34D399', gradientStart: '#022c22', gradientMid: '#064e3b', gradientEnd: '#021d17' },
];

const CURATED_ICONIC_QUOTES = [
  { songId: 'perfect', quote: "Baby, I'm dancing in the dark with you between my arms", song: 'Perfect', artist: 'Ed Sheeran' },
  { songId: 'kesariya', quote: "केसरिया तेरा इश्क है पिया, रंग जाऊं जो मैं हाथ लगाऊं", song: 'Kesariya', artist: 'Arijit Singh' },
  { songId: 'until-i-found-you', quote: "I was lost within the darkness, but then I found her", song: 'Until I Found You', artist: 'Stephen Sanchez' },
  { songId: 'lover', quote: "तेरा नी मैं, तेरा नी मैं Lover, कोई आये ते सही साड्डे विचकार नी", song: 'Lover', artist: 'Diljit Dosanjh' },
  { songId: 'blinding-lights', quote: "I can't sleep until I feel your touch, I said, ooh, I'm blinded by the lights", song: 'Blinding Lights', artist: 'The Weeknd' },
  { songId: 'birds-of-a-feather', quote: "I'll love you 'til the day that I die, 'til the day that I die", song: 'Birds of a Feather', artist: 'Billie Eilish' },
];

export const LyricCardModal: React.FC<LyricCardModalProps> = ({ song: propSong }) => {
  const {
    isLyricCardModalOpen,
    setIsLyricCardModalOpen,
    lyricCardQuote,
    setLyricCardQuote,
    songs,
    selectedSongId,
    currentSong,
    showToast
  } = useApp();

  const [activeTheme, setActiveTheme] = useState(CARD_THEMES[0]);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [aspectRatio, setAspectRatio] = useState<'square' | 'story'>('square');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Determine active song
  const fallbackSong = songs.find((s) => s.id === selectedSongId) || currentSong || songs[0];
  const [activeSongId, setActiveSongId] = useState<string>(propSong?.id || fallbackSong.id);
  const activeSong = songs.find((s) => s.id === activeSongId) || propSong || fallbackSong;

  if (!isLyricCardModalOpen) return null;

  // Flatten sample quotes from active song
  const activeSongQuotes = activeSong.lyrics
    .flatMap((s) => s.lines)
    .filter((l) => l.length > 15 && l.length < 100)
    .slice(0, 5);

  const handleCopyQuote = () => {
    const textToCopy = `“${lyricCardQuote}”\n— ${activeSong.title} by ${activeSong.artist}\nVia Lyrical 🎵`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('Quote copied to clipboard');
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCard = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const height = aspectRatio === 'square' ? 1080 : 1920;
    canvas.width = width;
    canvas.height = height;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, activeTheme.gradientStart);
    gradient.addColorStop(0.5, activeTheme.gradientMid);
    gradient.addColorStop(1, activeTheme.gradientEnd);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle hairframe border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 48, width - 96, height - 96);

    // Brand Watermark
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 28px system-ui, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ZION LYRICS • SACRED HYMNS', width / 2, 130);

    // Large Quotation Marks
    ctx.fillStyle = activeTheme.accent;
    ctx.font = 'italic 500 80px "Newsreader", "Charter", Georgia, serif';
    ctx.fillText('“', width / 2, height / 2 - 130);

    // Quote lines text wrapping
    ctx.fillStyle = '#FFFFFF';
    ctx.font =
      fontFamily === 'serif'
        ? 'italic 500 48px "Newsreader", "Charter", Georgia, serif'
        : fontFamily === 'mono'
        ? '500 40px "JetBrains Mono", Menlo, monospace'
        : '600 46px system-ui, BlinkMacSystemFont, "Segoe UI", sans-serif';

    const words = lyricCardQuote.split(' ');
    let line = '';
    const lines: string[] = [];
    const maxWidth = width - 260;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const startY = height / 2 - (lines.length * 32);
    lines.forEach((l, index) => {
      ctx.fillText(l.trim(), width / 2, startY + index * 68);
    });

    // Song details at bottom
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 32px system-ui, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText(activeSong.title, width / 2, height - 210);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '400 24px system-ui, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText(`${activeSong.artist} — ${activeSong.album}`, width / 2, height - 160);

    // Export to png
    const link = document.createElement('a');
    link.download = `${activeSong.title.toLowerCase().replace(/\s+/g, '-')}-lyric-card.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('High-resolution card downloaded!');
    confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div
      id="lyric-card-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="w-full max-w-2xl bg-zinc-900/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#fa2d48] flex items-center justify-center text-white shadow-md shadow-[#fa2d48]/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-white tracking-tight">
                Shareable Lyric Card Studio
              </h3>
              <p className="text-[11px] text-zinc-400">
                Design studio-grade quote cards formatted for Instagram, WhatsApp & TikTok.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLyricCardModalOpen(false)}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Popular Songs Quick Picker */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-zinc-300">
            <span className="flex items-center gap-1 font-medium">
              <Music className="w-3.5 h-3.5 text-[#fa2d48]" /> Popular Songs Source:
            </span>
            <span className="text-[11px] text-zinc-500">
              {activeSong.artist} • {activeSong.title}
            </span>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {songs.slice(0, 7).map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSongId(s.id);
                  const firstQuote = s.lyrics[0]?.lines.find((l) => l.length > 15) || s.lyrics[0]?.lines[0] || '';
                  if (firstQuote) setLyricCardQuote(firstQuote);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap shrink-0 transition-all ${
                  activeSongId === s.id
                    ? 'bg-white text-black font-semibold border-white shadow-xs'
                    : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                <img src={s.albumArt} alt={s.title} className="w-4 h-4 rounded-full object-cover" />
                <span>{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className={`w-full max-w-md ${
              aspectRatio === 'square' ? 'aspect-square' : 'aspect-[9/14]'
            } rounded-3xl p-8 flex flex-col justify-between text-center border relative shadow-2xl transition-all duration-300 bg-gradient-to-b ${
              activeTheme.bg
            } ${activeTheme.border}`}
          >
            {/* Top brand tag */}
            <div className="flex items-center justify-between text-[11px] text-zinc-400 tracking-wider uppercase font-semibold">
              <span>Zion Lyrics</span>
              <span className="text-[#fa2d48] font-bold">Studio Style</span>
            </div>

            {/* Central Quote */}
            <div className="my-auto px-2">
              <span
                className="text-4xl sm:text-5xl font-serif italic block mb-2 opacity-80"
                style={{ color: activeTheme.accent }}
              >
                “
              </span>
              <p
                className={`text-base sm:text-xl font-medium tracking-tight text-white leading-relaxed ${
                  fontFamily === 'serif'
                    ? 'font-serif italic'
                    : fontFamily === 'mono'
                    ? 'font-mono'
                    : 'font-sans'
                }`}
              >
                {lyricCardQuote}
              </p>
            </div>

            {/* Bottom Song Attribution */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 ring-1 ring-white/15">
                <img
                  src={activeSong.albumArt}
                  alt={activeSong.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-xs text-white">{activeSong.title}</h4>
                <p className="text-[11px] text-zinc-400">{activeSong.artist} • {activeSong.album}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Quote Selectors */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-300 block">
            Trending Iconic Verses:
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {CURATED_ICONIC_QUOTES.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setLyricCardQuote(item.quote);
                  setActiveSongId(item.songId);
                }}
                className={`text-[11px] px-3 py-1.5 rounded-full border transition-all text-left truncate max-w-[280px] ${
                  lyricCardQuote === item.quote
                    ? 'bg-white text-black font-semibold border-white'
                    : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                "{item.quote}"
              </button>
            ))}
            {activeSongQuotes.map((q, idx) => (
              <button
                key={`song-${idx}`}
                onClick={() => setLyricCardQuote(q)}
                className={`text-[11px] px-3 py-1.5 rounded-full border transition-all text-left truncate max-w-[280px] ${
                  lyricCardQuote === q
                    ? 'bg-white text-black font-semibold border-white'
                    : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                "{q}"
              </button>
            ))}
          </div>

          <input
            type="text"
            value={lyricCardQuote}
            onChange={(e) => setLyricCardQuote(e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-white/10 text-white outline-hidden focus:border-[#fa2d48]"
            placeholder="Or type your own custom lyric verse..."
          />
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Theme Palette */}
          <div>
            <label className="text-[11px] text-zinc-400 block mb-1.5 font-medium">Palette</label>
            <div className="flex gap-1.5">
              {CARD_THEMES.map((th) => (
                <button
                  key={th.id}
                  onClick={() => setActiveTheme(th)}
                  className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                    activeTheme.id === th.id ? 'ring-2 ring-white scale-110' : 'opacity-80'
                  }`}
                  style={{ backgroundColor: th.accent }}
                  title={th.name}
                />
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <label className="text-[11px] text-zinc-400 block mb-1.5 font-medium">Typography</label>
            <div className="flex rounded-full bg-black/40 border border-white/10 p-0.5">
              {(['serif', 'sans', 'mono'] as const).map((font) => (
                <button
                  key={font}
                  onClick={() => setFontFamily(font)}
                  className={`flex-1 py-1 text-xs rounded-full capitalize font-medium transition-all ${
                    fontFamily === font ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div>
            <label className="text-[11px] text-zinc-400 block mb-1.5 font-medium">Aspect Ratio</label>
            <div className="flex rounded-full bg-black/40 border border-white/10 p-0.5">
              <button
                onClick={() => setAspectRatio('square')}
                className={`flex-1 py-1 text-xs rounded-full font-medium transition-all ${
                  aspectRatio === 'square' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                1:1 Square
              </button>
              <button
                onClick={() => setAspectRatio('story')}
                className={`flex-1 py-1 text-xs rounded-full font-medium transition-all ${
                  aspectRatio === 'story' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                9:16 Story
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-white/10">
          <button
            onClick={handleCopyQuote}
            className="px-4 py-2 rounded-full text-xs font-medium border border-white/10 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Text</span>
          </button>
          <button
            onClick={handleDownloadCard}
            className="px-5 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
