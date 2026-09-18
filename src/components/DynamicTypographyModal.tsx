import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LyricsFontSettings } from '../types';
import {
  Type,
  SlidersHorizontal,
  AlignLeft,
  AlignCenter,
  Sparkles,
  Check,
  X,
  Palette,
  Eye,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DynamicTypographyModal: React.FC = () => {
  const {
    isDynamicTypographyModalOpen,
    setIsDynamicTypographyModalOpen,
    lyricsFont,
    setLyricsFont,
    showToast,
    songs,
    theme
  } = useApp();

  const [previewFont, setPreviewFont] = useState<LyricsFontSettings>({
    fontFamily: lyricsFont.fontFamily || 'sans',
    fontSize: lyricsFont.fontSize || 'lg',
    lineSpacing: lyricsFont.lineSpacing || 'relaxed',
    textAlign: lyricsFont.textAlign || 'left',
    readingTone: lyricsFont.readingTone || 'zion-dark'
  });

  const [previewSongIndex, setPreviewSongIndex] = useState<number>(0);

  if (!isDynamicTypographyModalOpen) return null;

  const sampleVerses = [
    {
      title: 'Perfect — Ed Sheeran',
      text: "Baby, I'm dancing in the dark with you between my arms\nBarefoot on the grass, listening to our favourite song\nWhen you said you looked a mess, I whispered underneath my breath\nBut you heard it, darling, you look perfect tonight"
    },
    {
      title: 'Kesariya — Arijit Singh',
      text: "केसरिया तेरा इश्क है पिया, रंग जाऊं जो मैं हाथ लगाऊं\nदिन बीते सारा तेरी फिक्र में, रैन सारी तेरी खैर मनाऊं\nपतझड़ के मौसम में भी रंग रूप तेरा ना छूटे\nमेरी हर खुशी तेरी बाहों में आके टूटे"
    },
    {
      title: 'Until I Found You — Stephen Sanchez',
      text: "I was lost within the darkness, but then I found her\nI found you\nGeorgia, wrap me up in all your, I want you in my arms\nOh, let me hold you\nI would never fall in love until I found her"
    }
  ];

  const currentVerse = sampleVerses[previewSongIndex];

  const handleApplyGlobal = () => {
    setLyricsFont(previewFont);
    showToast('Dynamic Typography applied to all song lyrics!');
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    setIsDynamicTypographyModalOpen(false);
  };

  const handleResetDefaults = () => {
    const defaults: LyricsFontSettings = {
      fontFamily: 'sans',
      fontSize: 'lg',
      lineSpacing: 'relaxed',
      textAlign: 'left',
      readingTone: 'zion-dark'
    };
    setPreviewFont(defaults);
    setLyricsFont(defaults);
    showToast('Typography reset to Zion reader defaults');
  };

  return (
    <div
      id="dynamic-typography-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 bg-zinc-900/95 backdrop-blur-2xl border-white/15 text-white space-y-6`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#fc3c44] to-[#fa2d48] flex items-center justify-center text-white shadow-md shadow-[#fa2d48]/30">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Dynamic Typography Engine
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white border border-white/15">
                  Live Preview
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Adjust typography, line spacing, and optical hierarchy for an immersive reading experience.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDynamicTypographyModalOpen(false)}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Typography Preview Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium text-white">
              <Eye className="w-3.5 h-3.5 text-[#fa2d48]" /> Real-time Verse Reader Preview:
            </span>
            <button
              onClick={() => setPreviewSongIndex((prev) => (prev + 1) % sampleVerses.length)}
              className="text-[11px] text-[#fa2d48] hover:text-[#fc3c44] flex items-center gap-1 transition-colors"
            >
              <span>Cycle Song ({currentVerse.title.split('—')[0].trim()})</span>
            </button>
          </div>

          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-xl ${
              previewFont.readingTone === 'studio-oled'
                ? 'bg-black border-emerald-500/20 text-emerald-50'
                : previewFont.readingTone === 'warm-titanium'
                ? 'bg-[#1c1917] border-amber-200/20 text-amber-50'
                : previewFont.readingTone === 'crisp-light'
                ? 'bg-[#f5f5f7] border-black/10 text-zinc-900'
                : 'bg-[#121214] border-white/10 text-white'
            }`}
          >
            <p
              className={`whitespace-pre-line tracking-tight transition-all duration-200 ${
                previewFont.fontFamily === 'serif'
                  ? 'font-serif italic'
                  : previewFont.fontFamily === 'mono'
                  ? 'font-mono'
                  : 'font-sans'
              } ${
                previewFont.fontSize === 'sm'
                  ? 'text-xs sm:text-sm'
                  : previewFont.fontSize === 'base'
                  ? 'text-sm sm:text-base'
                  : previewFont.fontSize === 'lg'
                  ? 'text-base sm:text-xl font-medium'
                  : previewFont.fontSize === 'xl'
                  ? 'text-lg sm:text-2xl font-semibold'
                  : 'text-xl sm:text-3xl font-bold'
              } ${
                previewFont.lineSpacing === 'tight'
                  ? 'leading-tight'
                  : previewFont.lineSpacing === 'normal'
                  ? 'leading-normal'
                  : previewFont.lineSpacing === 'relaxed'
                  ? 'leading-relaxed'
                  : 'leading-loose'
              } ${
                previewFont.textAlign === 'center' ? 'text-center' : 'text-left'
              }`}
            >
              {currentVerse.text}
            </p>
          </div>
        </div>

        {/* Controls Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Font Family */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 block">
              Font Family
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10">
              <button
                onClick={() => setPreviewFont({ ...previewFont, fontFamily: 'sans' })}
                className={`py-2 px-2 text-xs rounded-xl font-sans transition-all ${
                  previewFont.fontFamily === 'sans'
                    ? 'bg-white text-black font-semibold shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                SF Pro Sans
              </button>
              <button
                onClick={() => setPreviewFont({ ...previewFont, fontFamily: 'serif' })}
                className={`py-2 px-2 text-xs rounded-xl font-serif italic transition-all ${
                  previewFont.fontFamily === 'serif'
                    ? 'bg-white text-black font-semibold shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Newsreader
              </button>
              <button
                onClick={() => setPreviewFont({ ...previewFont, fontFamily: 'mono' })}
                className={`py-2 px-2 text-xs rounded-xl font-mono transition-all ${
                  previewFont.fontFamily === 'mono'
                    ? 'bg-white text-black font-semibold shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                SF Mono
              </button>
            </div>
          </div>

          {/* Font Size Scale */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 block">
              Font Scale
            </label>
            <div className="grid grid-cols-5 gap-1 p-1 rounded-2xl bg-black/40 border border-white/10">
              {(['sm', 'base', 'lg', 'xl', '2xl'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setPreviewFont({ ...previewFont, fontSize: sz })}
                  className={`py-2 text-xs rounded-xl font-medium transition-all ${
                    previewFont.fontSize === sz
                      ? 'bg-white text-black font-semibold shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {sz === 'sm' ? '14' : sz === 'base' ? '16' : sz === 'lg' ? '18' : sz === 'xl' ? '22' : '26'}
                </button>
              ))}
            </div>
          </div>

          {/* Line Spacing */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 block">
              Line Spacing
            </label>
            <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-black/40 border border-white/10">
              {(['tight', 'normal', 'relaxed', 'spacious'] as const).map((spacing) => (
                <button
                  key={spacing}
                  onClick={() => setPreviewFont({ ...previewFont, lineSpacing: spacing })}
                  className={`py-2 text-xs capitalize rounded-xl font-medium transition-all ${
                    previewFont.lineSpacing === spacing
                      ? 'bg-white text-black font-semibold shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {spacing}
                </button>
              ))}
            </div>
          </div>

          {/* Text Alignment */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 block">
              Text Alignment
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10">
              <button
                onClick={() => setPreviewFont({ ...previewFont, textAlign: 'left' })}
                className={`py-2 flex items-center justify-center gap-1.5 text-xs rounded-xl font-medium transition-all ${
                  previewFont.textAlign !== 'center'
                    ? 'bg-white text-black font-semibold shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span>Left Aligned</span>
              </button>
              <button
                onClick={() => setPreviewFont({ ...previewFont, textAlign: 'center' })}
                className={`py-2 flex items-center justify-center gap-1.5 text-xs rounded-xl font-medium transition-all ${
                  previewFont.textAlign === 'center'
                    ? 'bg-white text-black font-semibold shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
                <span>Centered</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reader Atmosphere Tone */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-300 block flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-[#fa2d48]" />
            <span>Reader Atmosphere</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'zion-dark', name: 'Zion Dark', desc: 'Deep Charcoal' },
              { id: 'studio-oled', name: 'OLED Black', desc: 'Pure 0% Black' },
              { id: 'warm-titanium', name: 'Titanium', desc: 'Warm Bronze' },
              { id: 'crisp-light', name: 'Crisp Light', desc: 'Studio White' }
            ].map((tone) => (
              <button
                key={tone.id}
                onClick={() =>
                  setPreviewFont({ ...previewFont, readingTone: tone.id as any })
                }
                className={`p-3 rounded-2xl border text-left transition-all ${
                  previewFont.readingTone === tone.id
                    ? 'border-white bg-white/15 ring-1 ring-white shadow-xs'
                    : 'border-white/10 bg-black/40 hover:bg-white/5'
                }`}
              >
                <div className="text-xs font-semibold text-white">{tone.name}</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">{tone.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-4 py-2 rounded-full text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDynamicTypographyModalOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-medium text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyGlobal}
              className="px-5 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply to All Lyrics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
