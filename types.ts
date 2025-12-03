
export interface Habit {
  id: string;
  name: string;
  completedDates: string[]; // ISO date strings
  targetPerWeek: number;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Reciter {
  id: string;
  name: string;
  subtext: string;
  serverUrl: string; // Base URL for MP3s
  image?: string; // Optional avatar URL
}

export interface LastRead {
  surahNumber: number;
  surahName: string;
  timestamp: number;
}

export interface Bookmark {
  surahNumber: number;
  ayahNumber: number;
  text: string; // Preview text
  timestamp: number;
}

// New interface for favorited Hadith
export interface FavoriteHadith {
  refNumber: string; // Unique ID for the hadith
  category: string;
  text: string;
  arabic: string;
  source: string;
  timestamp: number;
}

export enum PageRoute {
  HOME = '/',
  HABITS = '/habits',
  QURAN_TRACKER = '/quran-tracker',
  QURAN_AUDIO = '/quran',
  QURAN_READ = '/read/:surahId',
  HADITH = '/hadith',
  DUA = '/dua',
  PRAYER = '/prayer',
  QIBLA = '/qibla',
  ASSISTANT = '/assistant',
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
