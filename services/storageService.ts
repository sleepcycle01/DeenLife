
import { Habit, Surah, LastRead, Bookmark, FavoriteHadith } from '../types';
import { HABITS_STORAGE_KEY, SURAH_LIST_CACHE_KEY } from '../constants';

const QURAN_PROGRESS_KEY = 'deenlife_quran_progress';
const LAST_READ_KEY = 'deenlife_last_read';
const BOOKMARKS_KEY = 'deenlife_bookmarks';
const FAVORITE_HADITHS_KEY = 'deenlife_favorite_hadiths';

export const getHabits = (): Habit[] => {
  try {
    const stored = localStorage.getItem(HABITS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to parse habits", e);
    return [];
  }
};

export const saveHabits = (habits: Habit[]) => {
  localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
};

export const getCachedSurahs = (): Surah[] | null => {
  try {
    const stored = localStorage.getItem(SURAH_LIST_CACHE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const cacheSurahs = (surahs: Surah[]) => {
  localStorage.setItem(SURAH_LIST_CACHE_KEY, JSON.stringify(surahs));
};

export const getQuranProgress = (): number[] => {
  try {
    const stored = localStorage.getItem(QURAN_PROGRESS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveQuranProgress = (completedSurahs: number[]) => {
  localStorage.setItem(QURAN_PROGRESS_KEY, JSON.stringify(completedSurahs));
};

// --- New Features ---

export const getLastRead = (): LastRead | null => {
  try {
    const stored = localStorage.getItem(LAST_READ_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const saveLastRead = (data: LastRead) => {
  localStorage.setItem(LAST_READ_KEY, JSON.stringify(data));
};

export const getBookmarks = (): Bookmark[] => {
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveBookmarks = (bookmarks: Bookmark[]) => {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
};

// --- Favorite Hadiths ---

export const getFavoriteHadiths = (): FavoriteHadith[] => {
  try {
    const stored = localStorage.getItem(FAVORITE_HADITHS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveFavoriteHadiths = (hadiths: FavoriteHadith[]) => {
  localStorage.setItem(FAVORITE_HADITHS_KEY, JSON.stringify(hadiths));
};
