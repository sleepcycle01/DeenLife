
import { Reciter } from "./types";

export const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

export const SURAH_LIST_CACHE_KEY = 'deenlife_surah_list';
export const HABITS_STORAGE_KEY = 'deenlife_habits';
export const LOCATION_STORAGE_KEY = 'deenlife_location';

export const DEFAULT_COORDINATES = {
  latitude: 21.4225, // Mecca
  longitude: 39.8262,
};

// High quality audio servers from mp3quran.net
export const RECITERS: Reciter[] = [
  {
    id: 'mishary',
    name: 'Mishari Rashid Al-Afasy',
    subtext: 'Kuwait - Imam of Masjid Al-Kabir',
    serverUrl: 'https://server8.mp3quran.net/afs/',
  },
  {
    id: 'sudais',
    name: 'Abdur-Rahman As-Sudais',
    subtext: 'Saudi Arabia - Imam Masjid Al-Harram (Makkah)',
    serverUrl: 'https://server11.mp3quran.net/sds/',
  },
  {
    id: 'shuraym',
    name: 'Sa`ud Ash-Shuraym',
    subtext: 'Saudi Arabia - Imam Masjid Al-Harram (Makkah)',
    serverUrl: 'https://server7.mp3quran.net/shur/',
  },
  {
    id: 'ghamdi',
    name: 'Saad Al-Ghamdi',
    subtext: 'Saudi Arabia - Imam Masjid Al-Harram (Makkah)',
    serverUrl: 'https://server7.mp3quran.net/s_gmd/',
  },
  {
    id: 'dosari',
    name: 'Yasser Al-Dosari',
    subtext: 'Saudi Arabia - Imam Masjid Al-Harram (Makkah)',
    serverUrl: 'https://server11.mp3quran.net/yasser/',
  },
  {
    id: 'maher',
    name: 'Maher Al Meaqli',
    subtext: 'Saudi Arabia - Imam Masjid Al-Harram (Makkah)',
    serverUrl: 'https://server12.mp3quran.net/maher/',
  },
  {
    id: 'basit',
    name: 'Abdul Basit',
    subtext: 'Egypt - Murattal',
    serverUrl: 'https://server7.mp3quran.net/basit/',
  },
  {
    id: 'juhany',
    name: 'Abdullah Al-Johany',
    subtext: 'Saudi Arabia - Imam Masjid Al-Harram (Makkah)',
    serverUrl: 'https://server13.mp3quran.net/jhn/',
  },
  {
    id: 'baleela',
    name: 'Imam Bandar Baleela',
    subtext: 'Saudi Arabia',
    serverUrl: 'https://server6.mp3quran.net/balila/',
  },
  {
    id: 'alossi',
    name: 'Abdur-Rahman Aloosi',
    subtext: 'Saudi Arabia - Al-Ikhlass Mosque (Al Khobar)',
    serverUrl: 'https://server6.mp3quran.net/aloosi/',
  },
  {
    id: 'minshawi',
    name: 'Muhammad Siddiq al-Minshawi',
    subtext: 'Egypt',
    serverUrl: 'https://server10.mp3quran.net/minsh/',
  },
  {
    id: 'huth',
    name: 'Ali Abdur-Rahman Al-Huthaify',
    subtext: 'Saudi Arabia - Imam Masjid Nabvi',
    serverUrl: 'https://server9.mp3quran.net/hthfi/',
  },
];
