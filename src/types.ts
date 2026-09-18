export interface LyricSection {
  type: 'Verse 1' | 'Verse 2' | 'Verse 3' | 'Chorus' | 'Pre-Chorus' | 'Bridge' | 'Outro' | 'Hook' | 'Intro';
  lines: string[];
  timestamp?: number; // in seconds for karaoke/playback sync
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumArt: string;
  releaseYear: number;
  duration: string; // e.g. "3:53"
  durationSeconds: number;
  genre: string;
  language: string;
  mood?: 'Romantic' | 'Energetic' | 'Chill' | 'Heartbreak' | 'Focus' | 'Party';
  trendingRank?: number;
  trendPercentage?: string; // e.g. "+24%"
  playsCount: string; // e.g. "1.8B"
  lyrics: LyricSection[];
  plainLyrics?: string;
  translationNotes?: string;
  aboutSong: string;
  keySignature?: string;
  tempoBpm?: number;
  featuredArtists?: string[];
  writers?: string[];
  producers?: string[];
  isVerified?: boolean;
  verifiedBy?: string;
  studioNote?: string;
}

export interface Artist {
  id: string;
  name: string;
  photo: string;
  bannerPhoto: string;
  monthlyListeners: string;
  bio: string;
  origin: string;
  genres: string[];
  isFollowed?: boolean;
  popularSongIds: string[];
  albums: {
    id: string;
    title: string;
    year: number;
    cover: string;
    trackCount: number;
  }[];
}

export interface Comment {
  id: string;
  songId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
  favoriteSongIds: string[];
  followedArtistIds: string[];
  historySongIds: string[]; // recently viewed
  preferredLanguages: string[];
  preferredGenres: string[];
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  songIds: string[];
  coverArt?: string;
  createdAt: string;
}

export type ActiveTab = 'home' | 'search' | 'song' | 'history' | 'index' | 'upload' | 'favorites' | 'profile';

export interface LyricsFontSettings {
  fontSize: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  fontFamily: 'sans' | 'serif' | 'mono';
  lineSpacing: 'tight' | 'normal' | 'relaxed' | 'spacious';
  textAlign?: 'left' | 'center';
  readingTone?: 'charcoal-dark' | 'studio-oled' | 'warm-titanium' | 'crisp-light' | 'zion-dark';
}
