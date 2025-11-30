export type Language = 'en' | 'ar' | 'ur';

export interface Translation {
    [key: string]: string;
}

export interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
    verses: number;
}

export interface Hadith {
    id: string;
    text: string;
    narrator: string;
    category?: string[];
    reference: string;
}

export interface Dua {
    id: string;
    arabic: string;
    transliteration: string;
    english: string;
    reference: string;
    category?: string[];
}

export interface Habit {
    title: string;
    description: string;
    icon: number; // Index for HABIT_ICONS
    color: string;
}

export interface Etiquette {
    title: string;
    benefit: string;
    icon: number; // Index for ETIQUETTE_ICONS
    color: string;
}

export interface Reciter {
    id: string;
    name: string;
    baseUrl: string;
}

export enum GeminiApiKeyStatus {
    UNKNOWN = 'UNKNOWN',
    SELECTED = 'SELECTED',
    NOT_SELECTED = 'NOT_SELECTED',
    ERROR = 'ERROR',
}