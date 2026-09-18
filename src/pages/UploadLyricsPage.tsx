import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Song, LyricSection } from '../types';
import {
  Upload,
  Music,
  FileText,
  Sparkles,
  ShieldCheck,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Key,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LANGUAGES_LIST, GENRES_LIST } from '../data/songs';

const PRESET_COVERS = [
  {
    label: 'Zion Mountains Sunrise',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80'
  },
  {
    label: 'Cathedral Organ & Choral',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
  },
  {
    label: 'Ancient Manuscript Hymnal',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
  },
  {
    label: 'Golden Rays & Sanctuary',
    url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=600&q=80'
  },
  {
    label: 'Sacred Harp & Pilgrimage',
    url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80'
  }
];

export const UploadLyricsPage: React.FC = () => {
  const { addSong, navigateToSong, theme, showToast } = useApp();

  // Host access gate (only host can upload)
  const [isHostUnlocked, setIsHostUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('zion_host_authorized') === 'true';
  });
  const [hostPasskey, setHostPasskey] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Song Metadata Form State
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [releaseYear, setReleaseYear] = useState<number>(new Date().getFullYear());
  const [duration, setDuration] = useState('3:45');
  const [genre, setGenre] = useState('Zion Songs');
  const [language, setLanguage] = useState('English');
  const [keySignature, setKeySignature] = useState('G Major');
  const [tempoBpm, setTempoBpm] = useState<number>(88);
  const [albumArt, setAlbumArt] = useState(PRESET_COVERS[0].url);
  const [aboutSong, setAboutSong] = useState('');
  const [studioNote, setStudioNote] = useState('');
  const [writers, setWriters] = useState('');
  const [producers, setProducers] = useState('Sacred Zion Hymnal');

  // Structured Lyrics State
  const [lyricsSections, setLyricsSections] = useState<LyricSection[]>([
    {
      type: 'Verse 1',
      lines: [
        'Come, ye that love the Lord,',
        'And let your joys be known;',
        'Join in a song with sweet accord,',
        'And thus surround the throne.'
      ]
    },
    {
      type: 'Chorus',
      lines: [
        "We're marching to Zion,",
        'Beautiful, beautiful Zion;',
        "We're marching upward to Zion,",
        'The beautiful city of God.'
      ]
    }
  ]);

  // Raw lyrics bulk importer tab
  const [bulkLyricsText, setBulkLyricsText] = useState('');
  const [editorMode, setEditorMode] = useState<'structured' | 'bulk'>('structured');
  const [previewActive, setPreviewActive] = useState(false);

  const handleUnlockHost = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = hostPasskey.trim().toLowerCase();
    // Allow 'zion', 'host', 'admin', 'sacred', or 'zion2026'
    if (
      cleanKey === 'zion' ||
      cleanKey === 'host' ||
      cleanKey === 'admin' ||
      cleanKey === 'zion2026' ||
      cleanKey === '1234'
    ) {
      setIsHostUnlocked(true);
      localStorage.setItem('zion_host_authorized', 'true');
      setAuthError('');
      showToast('Host mode verified: Ready to upload lyrics');
    } else {
      setAuthError('Incorrect host access key. (Hint: Use "zion" or click Quick Host Access)');
    }
  };

  const handleQuickHostAccess = () => {
    setIsHostUnlocked(true);
    localStorage.setItem('zion_host_authorized', 'true');
    setAuthError('');
    showToast('Host mode activated');
  };

  const handleLockHost = () => {
    setIsHostUnlocked(false);
    localStorage.removeItem('zion_host_authorized');
    showToast('Host mode locked');
  };

  // Structured Lyrics helpers
  const handleAddSection = () => {
    setLyricsSections([
      ...lyricsSections,
      {
        type: 'Verse 2',
        lines: ['']
      }
    ]);
  };

  const handleRemoveSection = (index: number) => {
    if (lyricsSections.length <= 1) {
      showToast('A song must have at least one lyric section');
      return;
    }
    setLyricsSections(lyricsSections.filter((_, i) => i !== index));
  };

  const handleSectionTypeChange = (index: number, newType: LyricSection['type']) => {
    const updated = [...lyricsSections];
    updated[index].type = newType;
    setLyricsSections(updated);
  };

  const handleSectionLinesChange = (index: number, text: string) => {
    const updated = [...lyricsSections];
    updated[index].lines = text.split('\n');
    setLyricsSections(updated);
  };

  // Bulk importer parser
  const handleParseBulkLyrics = () => {
    if (!bulkLyricsText.trim()) return;

    const blocks = bulkLyricsText.split(/\n\s*\n/);
    const parsed: LyricSection[] = [];

    blocks.forEach((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return;
      const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);

      let sectionType: LyricSection['type'] = 'Verse 1';
      let contentLines = lines;

      const firstLineLower = lines[0].toLowerCase();
      if (firstLineLower.includes('chorus')) {
        sectionType = 'Chorus';
        contentLines = lines.slice(1);
      } else if (firstLineLower.includes('verse 1')) {
        sectionType = 'Verse 1';
        contentLines = lines.slice(1);
      } else if (firstLineLower.includes('verse 2')) {
        sectionType = 'Verse 2';
        contentLines = lines.slice(1);
      } else if (firstLineLower.includes('verse 3')) {
        sectionType = 'Verse 3';
        contentLines = lines.slice(1);
      } else if (firstLineLower.includes('bridge')) {
        sectionType = 'Bridge';
        contentLines = lines.slice(1);
      } else if (firstLineLower.includes('outro')) {
        sectionType = 'Outro';
        contentLines = lines.slice(1);
      } else {
        sectionType = (idx === 0 ? 'Verse 1' : idx === 1 ? 'Chorus' : `Verse ${idx}`) as any;
      }

      parsed.push({
        type: sectionType,
        lines: contentLines.length > 0 ? contentLines : lines
      });
    });

    if (parsed.length > 0) {
      setLyricsSections(parsed);
      setEditorMode('structured');
      showToast(`Parsed ${parsed.length} lyric sections`);
    }
  };

  const handleSubmitSong = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast('Please provide a Song Title');
      return;
    }
    if (!artist.trim()) {
      showToast('Please provide an Artist or Hymnist name');
      return;
    }

    // Clean lyrics
    const cleanLyrics = lyricsSections
      .map((sec) => ({
        ...sec,
        lines: sec.lines.map((l) => l.trim()).filter(Boolean)
      }))
      .filter((sec) => sec.lines.length > 0);

    if (cleanLyrics.length === 0) {
      showToast('Please add at least one line of lyrics');
      return;
    }

    // Convert duration to seconds
    const durationParts = duration.split(':');
    const minutes = parseInt(durationParts[0] || '3', 10);
    const seconds = parseInt(durationParts[1] || '30', 10);
    const durationSeconds = minutes * 60 + seconds;

    const songId =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `song-${Date.now()}`;

    const newSong: Song = {
      id: songId,
      title: title.trim(),
      artist: artist.trim(),
      artistId: artist.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      album: album.trim() || 'Sacred Hymns Collection',
      albumArt: albumArt.trim() || PRESET_COVERS[0].url,
      releaseYear: Number(releaseYear) || new Date().getFullYear(),
      duration: duration.trim() || '3:45',
      durationSeconds,
      genre: genre.trim() || 'Zion Songs',
      language: language.trim() || 'English',
      aboutSong:
        aboutSong.trim() ||
        `“${title.trim()}” is a sacred hymn by ${artist.trim()}, preserved for reflection, devotion, and choral worship.`,
      studioNote:
        studioNote.trim() ||
        `Authenticated text for ${title.trim()} according to original hymnody manuscripts.`,
      keySignature: keySignature.trim() || 'G Major',
      tempoBpm: Number(tempoBpm) || 88,
      writers: writers.trim()
        ? writers.split(',').map((w) => w.trim())
        : [artist.trim()],
      producers: producers.trim()
        ? producers.split(',').map((p) => p.trim())
        : ['Sacred Zion Hymnal'],
      isVerified: true,
      verifiedBy: 'Host Contributor',
      playsCount: '1.2K',
      lyrics: cleanLyrics
    };

    addSong(newSong);
    confetti({ particleCount: 50, spread: 70 });
    showToast(`"${newSong.title}" uploaded to Zion catalog!`);
    navigateToSong(newSong.id);
  };

  // If host is NOT unlocked, show Host Gate
  if (!isHostUnlocked) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 animate-in fade-in duration-300">
        <div
          className={`p-8 sm:p-10 rounded-3xl border text-center space-y-6 ${
            theme === 'dark'
              ? 'bg-[#161618] border-white/10 shadow-2xl'
              : 'bg-white border-black/10 shadow-xl'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-[#fa2d48]/15 border border-[#fa2d48]/30 flex items-center justify-center mx-auto text-[#fa2d48]">
            <Key className="w-8 h-8 stroke-[2.2]" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-wider text-[#fa2d48] uppercase">
              Host Administration
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Host Lyrics Upload
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              This area is reserved for the host to upload lyrics, hymn metadata, and details according to the song.
            </p>
          </div>

          <form onSubmit={handleUnlockHost} className="space-y-4 max-w-sm mx-auto">
            <div className="text-left space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Host Access Key
              </label>
              <input
                type="password"
                placeholder="Enter host key (e.g. 'zion')"
                value={hostPasskey}
                onChange={(e) => setHostPasskey(e.target.value)}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-hidden transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                    : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                }`}
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{authError}</span>
              </p>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-full text-xs font-semibold bg-[#fa2d48] hover:bg-[#fc3c44] text-white shadow-md active:scale-98 transition-all"
              >
                Authenticate Host
              </button>

              <button
                type="button"
                onClick={handleQuickHostAccess}
                className="w-full py-2 rounded-full text-xs font-medium text-zinc-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
              >
                Quick Host Access (1-Click)
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#fa2d48] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#fa2d48]" />
            <span>Host Contributor Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Upload Song Lyrics
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Submit complete song details, theological context, and structured lyrics to the catalog.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setPreviewActive(!previewActive)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium border transition-colors ${
              previewActive
                ? 'bg-sky-500/20 border-sky-500/40 text-sky-400'
                : 'bg-white/[0.05] border-white/10 text-zinc-300 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{previewActive ? 'Hide Live Preview' : 'Show Live Preview'}</span>
          </button>
          <button
            type="button"
            onClick={handleLockHost}
            className="text-xs px-3 py-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Lock Host Mode"
          >
            Lock Host
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmitSong} className="space-y-8">
        {/* Section 1: Song Identity & Metadata */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            theme === 'dark' ? 'bg-[#161618] border-white/10' : 'bg-white border-black/10'
          }`}
        >
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Music className="w-4 h-4 text-[#fa2d48]" />
            <span>1. Song Identity & Metadata</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Song Title <span className="text-[#fa2d48]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Come, Thou Fount of Every Blessing"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-hidden transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                    : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Hymnist / Artist / Author <span className="text-[#fa2d48]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Robert Robinson"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-hidden transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                    : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Album / Hymnbook Collection
              </label>
              <input
                type="text"
                placeholder="e.g. A Garland of Sacred Poetry"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-hidden transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                    : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Year
                </label>
                <input
                  type="number"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(Number(e.target.value))}
                  className={`w-full px-3 py-2.5 text-xs rounded-xl border outline-hidden transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                      : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Duration (mm:ss)
                </label>
                <input
                  type="text"
                  placeholder="3:45"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className={`w-full px-3 py-2.5 text-xs rounded-xl border outline-hidden transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                      : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Classification / Category
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-hidden transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                    : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                }`}
              >
                {GENRES_LIST.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-hidden transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                    : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                }`}
              >
                {LANGUAGES_LIST.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Key Signature
              </label>
              <input
                type="text"
                placeholder="e.g. D Major, G Major"
                value={keySignature}
                onChange={(e) => setKeySignature(e.target.value)}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-hidden transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                    : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Tempo (BPM)
              </label>
              <input
                type="number"
                value={tempoBpm}
                onChange={(e) => setTempoBpm(Number(e.target.value))}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-hidden transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                    : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                }`}
              />
            </div>
          </div>

          {/* Cover Art selection */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>Cover Art Presets & URL</span>
              <span className="text-[11px] text-zinc-500 font-normal">Click preset or paste image link</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {PRESET_COVERS.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => setAlbumArt(preset.url)}
                  className={`relative cursor-pointer rounded-2xl overflow-hidden border p-1 transition-all ${
                    albumArt === preset.url
                      ? 'border-[#fa2d48] ring-2 ring-[#fa2d48]/40 scale-102'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="aspect-video sm:aspect-square w-full rounded-xl overflow-hidden mb-1">
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[10px] text-zinc-300 truncate font-medium text-center">
                    {preset.label}
                  </p>
                </div>
              ))}
            </div>
            <input
              type="url"
              placeholder="Or paste custom Cover Image URL (https://...)"
              value={albumArt}
              onChange={(e) => setAlbumArt(e.target.value)}
              className={`w-full px-4 py-2 text-xs rounded-xl border outline-hidden transition-colors mt-2 ${
                theme === 'dark'
                  ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                  : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
              }`}
            />
          </div>
        </div>

        {/* Section 2: Theological Background & Scripture Notes */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            theme === 'dark' ? 'bg-[#161618] border-white/10' : 'bg-white border-black/10'
          }`}
        >
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#fa2d48]" />
            <span>2. Theological Background & Story</span>
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                About the Song (Historical & Spiritual Significance)
              </label>
              <textarea
                rows={3}
                placeholder="Describe the context of when the hymn was composed, author background, or spiritual reflection..."
                value={aboutSong}
                onChange={(e) => setAboutSong(e.target.value)}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-hidden transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                    : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Scripture References & Manuscript Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grounded in 1 Samuel 7:12 and Psalm 98:1"
                  value={studioNote}
                  onChange={(e) => setStudioNote(e.target.value)}
                  className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-hidden transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                      : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Hymnbook / Publishing Attribution
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sacred Zion Hymnal Committee"
                  value={producers}
                  onChange={(e) => setProducers(e.target.value)}
                  className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-hidden transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                    : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Lyrics Editor (Structured or Bulk) */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            theme === 'dark' ? 'bg-[#161618] border-white/10' : 'bg-white border-black/10'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#fa2d48]" />
              <span>3. Lyrics by Verse & Chorus</span>
            </h2>

            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900 border border-white/10">
              <button
                type="button"
                onClick={() => setEditorMode('structured')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  editorMode === 'structured'
                    ? 'bg-white text-black font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Section Builder
              </button>
              <button
                type="button"
                onClick={() => setEditorMode('bulk')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  editorMode === 'bulk'
                    ? 'bg-white text-black font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Bulk Text Importer
              </button>
            </div>
          </div>

          {editorMode === 'bulk' ? (
            <div className="space-y-3">
              <p className="text-xs text-zinc-400 leading-relaxed">
                Paste the full hymn text below. Separate verses and choruses with empty blank lines. Include [Verse 1], [Chorus], etc., at the top of each block if desired.
              </p>
              <textarea
                rows={10}
                placeholder="[Verse 1]&#10;Come, thou Fount of ev'ry blessing,&#10;Tune my heart to sing thy grace;&#10;&#10;[Chorus]&#10;Streams of mercy, never ceasing,&#10;Call for songs of loudest praise."
                value={bulkLyricsText}
                onChange={(e) => setBulkLyricsText(e.target.value)}
                className={`w-full p-4 font-mono text-xs rounded-2xl border outline-hidden transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-white/15 text-white focus:border-[#fa2d48]'
                    : 'bg-zinc-100 border-black/15 text-zinc-900 focus:border-[#fa2d48]'
                }`}
              />
              <button
                type="button"
                onClick={handleParseBulkLyrics}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#fa2d48] text-white hover:bg-[#fc3c44] transition-colors"
              >
                Parse Into Sections
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {lyricsSections.map((sec, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-black/40 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <select
                        value={sec.type}
                        onChange={(e) =>
                          handleSectionTypeChange(index, e.target.value as any)
                        }
                        className="px-3 py-1 text-xs font-semibold rounded-lg bg-zinc-800 border border-white/10 text-white outline-hidden"
                      >
                        <option value="Verse 1">Verse 1</option>
                        <option value="Verse 2">Verse 2</option>
                        <option value="Verse 3">Verse 3</option>
                        <option value="Chorus">Chorus</option>
                        <option value="Bridge">Bridge</option>
                        <option value="Refrain">Refrain</option>
                        <option value="Outro">Outro</option>
                        <option value="Intro">Intro</option>
                      </select>
                      <span className="text-[11px] text-zinc-400">
                        {sec.lines.length} lines
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveSection(index)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remove section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <textarea
                    rows={sec.lines.length > 2 ? sec.lines.length + 1 : 3}
                    placeholder="Enter lyric lines for this section..."
                    value={sec.lines.join('\n')}
                    onChange={(e) => handleSectionLinesChange(index, e.target.value)}
                    className="w-full p-3 font-serif text-sm sm:text-base leading-relaxed rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-100 outline-hidden focus:border-[#fa2d48] transition-colors"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddSection}
                className="w-full py-3 rounded-2xl border border-dashed border-white/20 text-xs font-semibold text-zinc-300 hover:text-white hover:border-[#fa2d48]/50 hover:bg-[#fa2d48]/5 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4 text-[#fa2d48]" />
                <span>Add Another Section (Verse / Chorus)</span>
              </button>
            </div>
          )}
        </div>

        {/* Live Preview Pane */}
        {previewActive && (
          <div className="p-6 sm:p-8 rounded-3xl border border-sky-500/30 bg-zinc-950 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
              <Eye className="w-4 h-4" />
              <span>Live Catalog Reader Preview</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden ring-1 ring-white/15 shrink-0">
                <img src={albumArt} alt={title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{title || 'Untitled Song'}</h3>
                <p className="text-xs text-zinc-400">{artist || 'Unknown Artist'} • {album || 'Hymnal'}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-mono mt-1 inline-block">
                  {keySignature} • {tempoBpm} BPM • {duration}
                </span>
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-white/10 max-w-xl mx-auto text-center">
              {lyricsSections.map((sec, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-[11px] font-semibold text-[#fa2d48] uppercase tracking-wider">
                    {sec.type}
                  </span>
                  <div className="font-serif italic text-base sm:text-lg text-zinc-200 leading-relaxed">
                    {sec.lines.map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit & Publish CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-900 border border-white/15">
          <div className="text-left space-y-0.5">
            <h4 className="text-sm font-semibold text-white">
              Ready to Publish to Zion Sacred Catalog?
            </h4>
            <p className="text-xs text-zinc-400">
              Song will be indexed immediately and available for search, reading, and quote cards.
            </p>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold bg-[#fa2d48] hover:bg-[#fc3c44] text-white shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4 text-white" />
            <span>Publish Song to Catalog</span>
          </button>
        </div>
      </form>
    </div>
  );
};
