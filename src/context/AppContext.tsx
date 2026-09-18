import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Song, Artist, Comment, User, Playlist, ActiveTab, LyricsFontSettings } from '../types';
import { INITIAL_SONGS, INITIAL_ARTISTS, INITIAL_COMMENTS } from '../data/songs';
import { audioSynth } from '../utils/audioPlayer';

interface AppContextType {
  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedSongId: string | null;
  selectedArtistId: string | null;
  selectedGenreId: string;
  setSelectedGenreId: (id: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchFilter: 'all' | 'songs' | 'artists' | 'albums' | 'lyrics';
  setSearchFilter: (filter: 'all' | 'songs' | 'artists' | 'albums' | 'lyrics') => void;
  navigateToSong: (songId: string) => void;
  navigateToArtist: (artistId: string) => void;
  navigateToSearch: (initialQuery?: string) => void;

  // Data
  songs: Song[];
  addSong: (newSong: Song) => void;
  artists: Artist[];
  comments: Comment[];

  // User & Auth
  user: User | null;
  loginUser: (email: string, name?: string) => void;
  loginGoogleDemo: () => void;
  logoutUser: () => void;

  // User Actions
  favorites: string[];
  toggleFavorite: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
  followedArtists: string[];
  toggleFollowArtist: (artistId: string) => void;
  isFollowed: (artistId: string) => boolean;
  recentlyViewed: string[];
  clearHistory: () => void;
  removeFromHistory: (songId: string) => void;
  playlists: Playlist[];
  createPlaylist: (title: string, description: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  deletePlaylist: (playlistId: string) => void;
  addComment: (songId: string, content: string) => void;
  likeComment: (commentId: string) => void;

  // Music Player
  currentSong: Song | null;
  isPlaying: boolean;
  playbackProgress: number; // 0 - 100
  playbackSeconds: number;
  volume: number;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  pauseSong: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setVolume: (v: number) => void;
  seekToProgress: (percent: number) => void;

  // Settings & Modals
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  lyricsFont: LyricsFontSettings;
  setLyricsFont: React.Dispatch<React.SetStateAction<LyricsFontSettings>>;
  isLyricCardModalOpen: boolean;
  setIsLyricCardModalOpen: (open: boolean) => void;
  lyricCardQuote: string;
  setLyricCardQuote: (quote: string) => void;
  openQuoteCardWithQuote: (quote: string, songId?: string) => void;
  isDynamicTypographyModalOpen: boolean;
  setIsDynamicTypographyModalOpen: (open: boolean) => void;
  isKaraokeDrawerOpen: boolean;
  setIsKaraokeDrawerOpen: (open: boolean) => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'lyrical_app_state_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedSongId, setSelectedSongId] = useState<string | null>('marching-to-zion');
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>('isaac-watts');
  const [selectedGenreId, setSelectedGenreId] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedMood, setSelectedMood] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<'all' | 'songs' | 'artists' | 'albums' | 'lyrics'>('all');

  // Persistence State
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_favs');
      return saved ? JSON.parse(saved) : ['marching-to-zion', 'glorious-things-of-thee', '10000-reasons'];
    } catch {
      return ['marching-to-zion', 'glorious-things-of-thee'];
    }
  });

  const [followedArtists, setFollowedArtists] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_followed');
      return saved ? JSON.parse(saved) : ['isaac-watts', 'john-newton'];
    } catch {
      return ['isaac-watts'];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_recent');
      return saved ? JSON.parse(saved) : ['marching-to-zion', 'glorious-things-of-thee', '10000-reasons'];
    } catch {
      return ['marching-to-zion'];
    }
  });

  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_playlists');
      return saved ? JSON.parse(saved) : [
        {
          id: 'pl-1',
          title: 'Songs of Zion',
          description: '“Sing to the LORD a new song.” — Psalm 98:1',
          songIds: ['marching-to-zion', 'glorious-things-of-thee', 'zions-hill'],
          coverArt: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
          createdAt: '2026-03-12'
        },
        {
          id: 'pl-2',
          title: 'Praise & Adoration',
          description: 'Hymns of grace, devotion, and adoration.',
          songIds: ['10000-reasons', 'way-maker', 'goodness-of-god'],
          coverArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
          createdAt: '2026-04-05'
        }
      ];
    } catch {
      return [];
    }
  });

  // Custom Uploaded Songs State (Host uploads)
  const [customSongs, setCustomSongs] = useState<Song[]>(() => {
    try {
      const saved = localStorage.getItem('zion_custom_songs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const songs = [...customSongs, ...INITIAL_SONGS];

  const addSong = (newSong: Song) => {
    setCustomSongs((prev) => {
      const updated = [newSong, ...prev.filter((s) => s.id !== newSong.id)];
      try {
        localStorage.setItem('zion_custom_songs', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_comments');
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  // User State - Clean unauthenticated start (Rohit option removed completely)
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Music Player State
  const [currentSong, setCurrentSong] = useState<Song | null>(INITIAL_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(0);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.75);

  // Appearance & Modals
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lyricsFont, setLyricsFont] = useState<LyricsFontSettings>({
    fontSize: 'lg',
    fontFamily: 'sans',
    lineSpacing: 'relaxed'
  });
  const [isLyricCardModalOpen, setIsLyricCardModalOpen] = useState<boolean>(false);
  const [lyricCardQuote, setLyricCardQuote] = useState<string>('Baby, I\'m dancin\' in the dark with you between my arms');
  const [isDynamicTypographyModalOpen, setIsDynamicTypographyModalOpen] = useState<boolean>(false);
  const [isKaraokeDrawerOpen, setIsKaraokeDrawerOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  const openQuoteCardWithQuote = (quote: string, songId?: string) => {
    if (songId) {
      setSelectedSongId(songId);
    }
    setLyricCardQuote(quote);
    setIsLyricCardModalOpen(true);
  };

  // Sync favorites & playlists to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_favs', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_followed', JSON.stringify(followedArtists));
    } catch (e) {
      console.error(e);
    }
  }, [followedArtists]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_recent', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error(e);
    }
  }, [recentlyViewed]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_playlists', JSON.stringify(playlists));
    } catch (e) {
      console.error(e);
    }
  }, [playlists]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_comments', JSON.stringify(comments));
    } catch (e) {
      console.error(e);
    }
  }, [comments]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_KEY + '_user', JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY + '_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Audio Playback Timer Effect
  useEffect(() => {
    let timer: number;
    if (isPlaying && currentSong) {
      timer = window.setInterval(() => {
        setPlaybackSeconds((prev) => {
          const next = prev + 1;
          if (next >= currentSong.durationSeconds) {
            // Loop or next song
            return 0;
          }
          setPlaybackProgress((next / currentSong.durationSeconds) * 100);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentSong]);

  // Handle theme class on root
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F8F9FC';
      document.body.style.color = '#0F172A';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = '#0B0B0F';
      document.body.style.color = '#FFFFFF';
    }
  }, [theme]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigateToSong = (songId: string) => {
    setSelectedSongId(songId);
    setActiveTab('song');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track recently viewed
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== songId);
      return [songId, ...filtered].slice(0, 20);
    });
  };

  const navigateToArtist = (artistId: string) => {
    setSelectedArtistId(artistId);
    const found = INITIAL_ARTISTS.find((a) => a.id === artistId);
    if (found) {
      setSearchQuery(found.name);
    }
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSearch = (initialQuery?: string) => {
    if (initialQuery !== undefined) {
      setSearchQuery(initialQuery);
    }
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setPlaybackSeconds(0);
    setPlaybackProgress(0);
    audioSynth.play(song.id, song.tempoBpm || 90, song.keySignature || 'C Major');
    showToast(`Now playing: ${song.title} — ${song.artist}`);
  };

  const togglePlay = () => {
    if (!currentSong) {
      if (INITIAL_SONGS.length > 0) {
        playSong(INITIAL_SONGS[0]);
      }
      return;
    }
    if (isPlaying) {
      pauseSong();
    } else {
      setIsPlaying(true);
      audioSynth.play(currentSong.id, currentSong.tempoBpm || 90, currentSong.keySignature || 'C Major');
    }
  };

  const pauseSong = () => {
    setIsPlaying(false);
    audioSynth.stop();
  };

  const nextSong = () => {
    if (!currentSong) return;
    const currentIndex = INITIAL_SONGS.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % INITIAL_SONGS.length;
    playSong(INITIAL_SONGS[nextIndex]);
  };

  const prevSong = () => {
    if (!currentSong) return;
    const currentIndex = INITIAL_SONGS.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + INITIAL_SONGS.length) % INITIAL_SONGS.length;
    playSong(INITIAL_SONGS[prevIndex]);
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    audioSynth.setVolume(val);
  };

  const seekToProgress = (percent: number) => {
    if (!currentSong) return;
    const clamped = Math.max(0, Math.min(100, percent));
    setPlaybackProgress(clamped);
    const targetSeconds = Math.floor((clamped / 100) * currentSong.durationSeconds);
    setPlaybackSeconds(targetSeconds);
  };

  const toggleFavorite = (songId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(songId);
      const updated = exists ? prev.filter((id) => id !== songId) : [...prev, songId];
      showToast(exists ? 'Removed from favorites' : '❤️ Added to favorites!');
      return updated;
    });
  };

  const isFavorite = (songId: string) => favorites.includes(songId);

  const toggleFollowArtist = (artistId: string) => {
    setFollowedArtists((prev) => {
      const exists = prev.includes(artistId);
      const updated = exists ? prev.filter((id) => id !== artistId) : [...prev, artistId];
      const targetArtist = INITIAL_ARTISTS.find((a) => a.id === artistId);
      showToast(exists ? `Unfollowed ${targetArtist?.name || 'artist'}` : `Following ${targetArtist?.name || 'artist'}! 🌟`);
      return updated;
    });
  };

  const isFollowed = (artistId: string) => followedArtists.includes(artistId);

  const createPlaylist = (title: string, description: string) => {
    const newPlaylist: Playlist = {
      id: 'pl-' + Date.now(),
      title,
      description,
      songIds: [],
      coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPlaylists((prev) => [newPlaylist, ...prev]);
    showToast(`Playlist "${title}" created!`);
  };

  const addSongToPlaylist = (playlistId: string, songId: string) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId && !pl.songIds.includes(songId)) {
          return { ...pl, songIds: [...pl.songIds, songId] };
        }
        return pl;
      })
    );
    showToast('Song added to playlist');
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          return { ...pl, songIds: pl.songIds.filter((id) => id !== songId) };
        }
        return pl;
      })
    );
    showToast('Song removed from playlist');
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists((prev) => prev.filter((pl) => pl.id !== playlistId));
    showToast('Playlist deleted');
  };

  const addComment = (songId: string, content: string) => {
    const newComment: Comment = {
      id: 'c-' + Date.now(),
      songId,
      userId: user?.id || 'guest',
      userName: user?.name || 'Music Fan',
      userAvatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      content,
      timestamp: 'Just now',
      likes: 0
    };
    setComments((prev) => [newComment, ...prev]);
    showToast('Comment posted! 💬');
  };

  const likeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const isLiked = !c.isLiked;
          return { ...c, likes: isLiked ? c.likes + 1 : c.likes - 1, isLiked };
        }
        return c;
      })
    );
  };

  const loginUser = (email: string, name?: string) => {
    const formattedName = name || email.split('@')[0] || 'Music Lover';
    setUser({
      id: 'u-' + Date.now(),
      name: formattedName,
      email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(formattedName)}`,
      joinedDate: 'Joined September 2026',
      favoriteSongIds: favorites,
      followedArtistIds: followedArtists,
      historySongIds: recentlyViewed,
      preferredLanguages: ['English', 'Hindi'],
      preferredGenres: ['Pop', 'Indie', 'Bollywood']
    });
    showToast(`Welcome back, ${formattedName}!`);
  };

  const clearHistory = () => {
    setRecentlyViewed([]);
    showToast('Reading history cleared');
  };

  const removeFromHistory = (songId: string) => {
    setRecentlyViewed((prev) => prev.filter((id) => id !== songId));
    showToast('Removed from history');
  };

  const loginGoogleDemo = () => {
    setUser({
      id: 'u-google-pilgrim',
      name: 'Grace Believer',
      email: 'worship@zionlyrics.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      joinedDate: 'Joined September 2026',
      favoriteSongIds: favorites,
      followedArtistIds: followedArtists,
      historySongIds: recentlyViewed,
      preferredLanguages: ['English'],
      preferredGenres: ['Zion Songs', 'Hymns', 'Praise & Worship']
    });
    showToast('Signed in with Google');
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Signed out successfully');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedSongId,
        selectedArtistId,
        selectedGenreId,
        setSelectedGenreId,
        selectedLanguage,
        setSelectedLanguage,
        selectedMood,
        setSelectedMood,
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        navigateToSong,
        navigateToArtist,
        navigateToSearch,
        songs,
        addSong,
        artists: INITIAL_ARTISTS,
        comments,
        user,
        loginUser,
        loginGoogleDemo,
        logoutUser,
        favorites,
        toggleFavorite,
        isFavorite,
        followedArtists,
        toggleFollowArtist,
        isFollowed,
        recentlyViewed,
        clearHistory,
        removeFromHistory,
        playlists,
        createPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        deletePlaylist,
        addComment,
        likeComment,
        currentSong,
        isPlaying,
        playbackProgress,
        playbackSeconds,
        volume,
        playSong,
        togglePlay,
        pauseSong,
        nextSong,
        prevSong,
        setVolume,
        seekToProgress,
        theme,
        toggleTheme,
        lyricsFont,
        setLyricsFont,
        isLyricCardModalOpen,
        setIsLyricCardModalOpen,
        lyricCardQuote,
        setLyricCardQuote,
        openQuoteCardWithQuote,
        isDynamicTypographyModalOpen,
        setIsDynamicTypographyModalOpen,
        isKaraokeDrawerOpen,
        setIsKaraokeDrawerOpen,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
