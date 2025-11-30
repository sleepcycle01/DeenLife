
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Droplets, Sparkles, Moon, BookOpen, Heart, Shield, Coffee, Eye, Lock, Sun, CheckCircle, Circle, BarChart, Search, X, Loader2, Clock, HeartPulse, Brain, ShieldCheck, Feather, Bookmark, MapPin, Bell, BellOff, Play, Pause, SkipForward, SkipBack, Volume2, Headphones, Book, Copy, Check, Star, Compass, Navigation, RotateCcw, Globe, Lightbulb, ChevronDown } from 'lucide-react';
import { QURAN_SURAHS, CURATED_HADITHS, TRANSLATIONS, LANGUAGES, getHabits, getEtiquettes, getDuas } from './constants';
import { Surah, Hadith, Dua, Language, Translation } from './types';
import DuaExplainerModal from './components/DuaExplainerModal';

// Icons mapping for dynamic habits
const HABIT_ICONS: Record<number, any> = {
    0: Droplets, 1: Sparkles, 2: Moon, 3: BookOpen, 4: Sun, 5: Eye, 6: Shield, 7: Heart, 8: Coffee, 9: Lock
};
const ETIQUETTE_ICONS: Record<number, any> = {
    0: Clock, 1: Droplets, 2: HeartPulse, 3: Feather, 4: Brain, 5: ShieldCheck
};

// Mapping of Surah Index (0-113) to Start Page (Standard Madani)
const SURAH_START_PAGES = [
    1, 2, 50, 77, 106, 128, 151, 177, 187, 208, 221, 235, 249, 255, 262, 267, 282, 293, 305, 312,
    322, 332, 342, 350, 359, 367, 377, 385, 396, 404, 411, 415, 418, 428, 434, 440, 446, 453, 458, 467,
    477, 483, 489, 496, 499, 502, 507, 511, 515, 518, 520, 523, 526, 528, 531, 534, 537, 542, 545, 549,
    551, 553, 554, 556, 558, 560, 562, 564, 566, 568, 570, 572, 574, 575, 577, 578, 580, 582, 583, 585,
    586, 587, 587, 589, 590, 591, 591, 592, 593, 594, 595, 595, 596, 596, 597, 597, 598, 598, 599, 599,
    600, 600, 601, 601, 601, 602, 602, 602, 603, 603, 603, 604, 604, 604
];

// Mapping of Juz to Start Page
const JUZ_START_PAGES = [
    1, 22, 42, 62, 82, 102, 122, 142, 162, 182, 202, 222, 242, 262, 282,
    302, 322, 342, 362, 382, 402, 422, 442, 462, 482, 502, 522, 542, 562, 582
];

// Quran Reciters Configuration
const RECITERS = [
    { id: 'sudais', name: 'Abdul Rahman Al-Sudais', baseUrl: 'https://server11.mp3quran.net/sds/' },
    { id: 'alafasy', name: 'Mishary Rashid Alafasy', baseUrl: 'https://server8.mp3quran.net/afs/' },
    { id: 'maher', name: 'Maher Al-Muaiqly', baseUrl: 'https://server12.mp3quran.net/maher/' },
    { id: 'ghamdi', name: 'Saad Al-Ghamdi', baseUrl: 'https://server7.mp3quran.net/s_gmd/' },
    { id: 'shuraim', name: 'Saud Al-Shuraim', baseUrl: 'https://server7.mp3quran.net/shur/' },
    { id: 'basit', name: 'Abdul Basit Abdus Samad', baseUrl: 'https://server7.mp3quran.net/basit/' },
    { id: 'husary', name: 'Mahmoud Khalil Al-Husary', baseUrl: 'https://server13.mp3quran.net/husr/' },
    { id: 'yasser', name: 'Yasser Al-Dosari', baseUrl: 'https://server11.mp3quran.net/yasser/' },
    { id: 'baleela', name: 'Bandar Baleela', baseUrl: 'https://server6.mp3quran.net/balila/' },
    { id: 'abkar', name: 'Idris Abkar', baseUrl: 'https://server6.mp3quran.net/abkar/' }
];

const POPULAR_SURAH_IDS = [
    36, // Ya-Sin
    67, // Al-Mulk
    55, // Ar-Rahman
    56, // Al-Waqi'ah
    18, // Al-Kahf
    32, // As-Sajdah
    2,  // Al-Baqarah
];

const KAABA_COORDS = { lat: 21.422487, lng: 39.826206 };

let HADITH_CACHE: Hadith[] | null = null;

export const SunnahHabitsApp: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Derive active tab from URL path
    const getActiveTab = () => {
        const path = location.pathname.replace('/', '');
        const validTabs = ['habits', 'quran', 'audio', 'hadith', 'dua', 'prayers', 'qibla'];
        return validTabs.includes(path) ? path : 'habits';
    };

    const activeTab = getActiveTab();

    // Language State
    const [language, setLanguage] = useState<Language>(() => {
        try {
            return (localStorage.getItem('app_language') as Language) || 'en';
        } catch {
            return 'en';
        }
    });

    const t = useCallback((key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key, [language]);
    const isRTL = language === 'ar' || language === 'ur';

    // Quran Tracker State
    const [searchQuery, setSearchQuery] = useState('');
    const [completedSurahs, setCompletedSurahs] = useState<number[]>(() => {
        try {
            const saved = localStorage.getItem('completed_surahs');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Quran Reader State
    const [currentQuranPage, setCurrentQuranPage] = useState<number | null>(null);
    const [pageContent, setPageContent] = useState<any>(null);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [readerError, setReaderError] = useState<string | null>(null);
    const [surahListPage, setSurahListPage] = useState(1);
    const SURAHS_PER_PAGE = 10;
    const [navPageInput, setNavPageInput] = useState('');
    const [ayahSearchQuery, setAyahSearchQuery] = useState('');
    const [isSearchingAyah, setIsSearchingAyah] = useState(false);

    // Quran Audio State
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [audioState, setAudioState] = useState(() => {
        try {
            const savedReciterId = localStorage.getItem('selected_reciter');
            const savedVolume = localStorage.getItem('audio_volume');
            const defaultReciter = RECITERS[0];
            const initialReciter = savedReciterId ? RECITERS.find(r => r.id === savedReciterId) || defaultReciter : defaultReciter;

            let initialVolume = 1.0;
            if (savedVolume) {
                const parsed = parseFloat(savedVolume);
                if (!isNaN(parsed) && isFinite(parsed)) {
                    initialVolume = parsed;
                }
            }

            return {
                isPlaying: false,
                currentSurah: null as Surah | null,
                currentReciter: initialReciter,
                volume: initialVolume,
                progress: 0,
                duration: 0,
                miniPlayerActive: false,
            };
        } catch {
            return {
                isPlaying: false,
                currentSurah: null,
                currentReciter: RECITERS[0],
                volume: 1.0,
                progress: 0,
                duration: 0,
                miniPlayerActive: false,
            };
        }
    });

    // Hadith State
    const [hadiths, setHadiths] = useState<Hadith[]>([]);
    const [hadithSearchQuery, setHadithSearchQuery] = useState('');
    const [activeHadithCategory, setActiveHadithCategory] = useState('all');
    const [favoriteHadiths, setFavoriteHadiths] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('favorite_hadiths_v2');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [readHadiths, setReadHadiths] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('read_hadiths_v2');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [hadithPage, setHadithPage] = useState(1);
    const HADITHS_PER_PAGE = 10;
    const [isLoadingHadiths, setIsLoadingHadiths] = useState(false);
    const [hadithSource, setHadithSource] = useState('curated');
    const HADITH_CATEGORIES = [
        { key: 'all', label: t('cat_all') },
        { key: 'favorites', label: t('cat_favorites') },
        { key: 'sleep', label: t('cat_sleep') },
        { key: 'prayer', label: t('cat_prayer') },
        { key: 'manners', label: t('cat_manners') },
        { key: 'knowledge', label: t('cat_knowledge') },
        { key: 'purity', label: t('cat_purity') },
        { key: 'forgiveness', label: t('cat_forgiveness') },
        { key: 'worship', label: t('cat_worship') },
    ];

    // Dua State
    const [duas, setDuas] = useState<Dua[]>([]);
    const [duaSearchQuery, setDuaSearchQuery] = useState('');
    const [activeDuaCategory, setActiveDuaCategory] = useState('all');
    const [favoriteDuas, setFavoriteDuas] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('favorite_duas_v1');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [readDuas, setReadDuas] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('read_duas_v1');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [duaPage, setDuaPage] = useState(1);
    const DUAS_PER_PAGE = 10;
    const DUA_CATEGORIES = [
        { key: 'all', label: t('cat_all') },
        { key: 'favorites', label: t('cat_favorites') },
        { key: 'morning_evening', label: t('cat_morning_evening') },
        { key: 'protection', label: t('cat_protection') },
        { key: 'forgiveness', label: t('cat_forgiveness') },
        { key: 'travel', label: t('cat_travel') },
        { key: 'daily_life', label: t('cat_daily_life') },
        { key: 'sleep_dua', label: t('cat_sleep_dua') },
        { key: 'gratitude', label: t('cat_gratitude') },
        { key: 'guidance', label: t('cat_guidance') },
        { key: 'patience', label: t('cat_patience') },
        { key: 'success', label: t('cat_success') },
        { key: 'health', label: t('cat_health') },
        { key: 'rizq', label: t('cat_rizq') },
        { key: 'family', label: t('cat_family') },
        { key: 'knowledge', label: t('cat_knowledge') },
        { key: 'death', label: t('cat_death') },
        { key: 'repentance', label: t('cat_repentance') },
    ];

    const [isDuaExplainerOpen, setIsDuaExplainerOpen] = useState(false);
    const [selectedDuaForExplanation, setSelectedDuaForExplanation] = useState<Dua | null>(null);

    // Prayer Times State
    const [prayerTimes, setPrayerTimes] = useState<any>(null);
    const [locationStatus, setLocationStatus] = useState<'idle' | 'fetching' | 'granted' | 'denied' | 'error'>('idle');
    const [locationError, setLocationError] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [prayerReminders, setPrayerReminders] = useState<Record<string, boolean>>(() => {
        try {
            const saved = localStorage.getItem('prayer_reminders');
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });
    const [nextPrayer, setNextPrayer] = useState<any>(null);

    // Qibla Finder State
    const [compassHeading, setCompassHeading] = useState<number | null>(null);
    const [qiblaBearing, setQiblaBearing] = useState<number | null>(null);
    const [qiblaError, setQiblaError] = useState<string | null>(null);
    const [isCompassActive, setIsCompassActive] = useState(false);
    const [deviceMotionPermissionGranted, setDeviceMotionPermissionGranted] = useState<boolean | null>(null);


    // Effects
    useEffect(() => {
        try {
            localStorage.setItem('completed_surahs', JSON.stringify(completedSurahs));
        } catch (e) { console.error(e); }
    }, [completedSurahs]);

    useEffect(() => {
        try {
            localStorage.setItem('app_language', language);
        } catch (e) { console.error(e); }
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }, [language, isRTL]);

    useEffect(() => {
        try {
            localStorage.setItem('selected_reciter', audioState.currentReciter.id);
            localStorage.setItem('audio_volume', audioState.volume.toString());
        } catch (e) { console.error(e); }
    }, [audioState.currentReciter.id, audioState.volume]);

    useEffect(() => {
        try {
            localStorage.setItem('prayer_reminders', JSON.stringify(prayerReminders));
        } catch (e) { console.error(e); }
    }, [prayerReminders]);

    useEffect(() => {
        try {
            localStorage.setItem('favorite_hadiths_v2', JSON.stringify(favoriteHadiths));
        } catch (e) { console.error(e); }
    }, [favoriteHadiths]);

    useEffect(() => {
        try {
            localStorage.setItem('read_hadiths_v2', JSON.stringify(readHadiths));
        } catch (e) { console.error(e); }
    }, [readHadiths]);

    useEffect(() => {
        try {
            localStorage.setItem('favorite_duas_v1', JSON.stringify(favoriteDuas));
        } catch (e) { console.error(e); }
    }, [favoriteDuas]);

    useEffect(() => {
        try {
            localStorage.setItem('read_duas_v1', JSON.stringify(readDuas));
        } catch (e) { console.error(e); }
    }, [readDuas]);

    useEffect(() => {
        setDuas(getDuas(language));
    }, [language]);


    // Quran Tracker
    const toggleSurah = (id: number) => {
        if (completedSurahs.includes(id)) setCompletedSurahs(completedSurahs.filter(sId => sId !== id));
        else setCompletedSurahs([...completedSurahs, id]);
    };

    const fetchPage = async (pageNumber: number) => {
        setIsLoadingPage(true);
        setReaderError(null);
        setPageContent(null);
        try {
            const arabicRes = await fetch(`https://api.alquran.cloud/v1/page/${pageNumber}/quran-uthmani`);
            const arabicData = await arabicRes.json();
            const englishRes = await fetch(`https://api.alquran.cloud/v1/page/${pageNumber}/en.sahih`);
            const englishData = await englishRes.json();
            if (arabicData.code === 200 && englishData.code === 200) {
                setPageContent({ arabic: arabicData.data, english: englishData.data });
            } else {
                setReaderError(t('reader_load_error') || "Failed to load page.");
            }
        } catch (err) {
            setReaderError(t('network_error') || "Network error.");
        } finally {
            setIsLoadingPage(false);
        }
    };

    const handleReadPage = (pageNumber: number) => {
        if (pageNumber < 1) pageNumber = 1;
        if (pageNumber > 604) pageNumber = 604;
        setCurrentQuranPage(pageNumber);
        fetchPage(pageNumber);
    };

    const handleReadSurah = (e: React.MouseEvent | null, surahNumber: number) => {
        if (e) e.stopPropagation();
        const startPage = SURAH_START_PAGES[surahNumber - 1];
        handleReadPage(startPage);
    };

    const handleSearchAyah = async () => {
        if (!ayahSearchQuery.trim()) return;
        setIsSearchingAyah(true);
        try {
            const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(ayahSearchQuery)}/all/en.sahih`);
            const data = await res.json();
            if (data.code === 200 && data.data.count > 0) {
                const firstMatch = data.data.matches[0];
                const ayahRes = await fetch(`https://api.alquran.cloud/v1/ayah/${firstMatch.number}/en.sahih`);
                const ayahData = await ayahRes.json();
                if (ayahData.code === 200) handleReadPage(ayahData.data.page);
            } else {
                alert(t('ayah_search_no_results'));
            }
        } catch (e) {
            alert(t('ayah_search_failed'));
        } finally {
            setIsSearchingAyah(false);
        }
    };

    const closeReader = () => {
        setCurrentQuranPage(null);
        setPageContent(null);
    };

    const filteredSurahs = QURAN_SURAHS.filter(s =>
        (s.name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.englishName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.number.toString().includes(searchQuery)
    );
    const totalSurahPages = Math.ceil(filteredSurahs.length / SURAHS_PER_PAGE);
    const paginatedSurahs = filteredSurahs.slice((surahListPage - 1) * SURAHS_PER_PAGE, surahListPage * SURAHS_PER_PAGE);
    const totalVerses = QURAN_SURAHS.reduce((sum, s) => sum + s.verses, 0);
    const completedVerses = QURAN_SURAHS.filter(s => completedSurahs.includes(s.number)).reduce((sum, s) => sum + s.verses, 0);
    const progressPercentage = (completedVerses / totalVerses) * 100;


    // Quran Audio
    const getAudioUrl = (surahNumber: number) => {
        if (!audioState.currentReciter || !surahNumber) return '';
        const surahId = String(surahNumber).padStart(3, '0');
        return `${audioState.currentReciter.baseUrl}${surahId}.mp3`;
    };

    const formatAudioTime = (seconds: number): string => {
        if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) return "00:00";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const playAudio = (surah: Surah) => {
        const url = getAudioUrl(surah.number);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = url;
            audioRef.current.load();
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
            setAudioState(prev => ({ ...prev, isPlaying: true, currentSurah: surah, miniPlayerActive: true }));
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (audioState.isPlaying) audioRef.current.pause();
            else audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
            setAudioState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
        }
    };

    const skipSurah = (direction: 'next' | 'prev') => {
        if (!audioState.currentSurah) return;
        const currentIndex = QURAN_SURAHS.findIndex(s => s.number === audioState.currentSurah?.number);
        let newIndex = direction === 'next' ? (currentIndex + 1) % QURAN_SURAHS.length : (currentIndex - 1 + QURAN_SURAHS.length) % QURAN_SURAHS.length;
        playAudio(QURAN_SURAHS[newIndex]);
    };

    const handleAudioEnded = () => skipSurah('next');

    const handleAudioTimeUpdate = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            setAudioState(prev => ({
                ...prev,
                progress: isNaN(currentTime) || !isFinite(currentTime) ? 0 : currentTime,
                duration: isNaN(duration) || !isFinite(duration) ? 0 : duration,
            }));
        }
    };

    const handleAudioVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        if (!isNaN(newVolume) && isFinite(newVolume)) {
            if (audioRef.current) audioRef.current.volume = newVolume;
            setAudioState(prev => ({ ...prev, volume: newVolume }));
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = audioState.volume;
            audioRef.current.onplay = () => setAudioState(prev => ({ ...prev, isPlaying: true }));
            audioRef.current.onpause = () => setAudioState(prev => ({ ...prev, isPlaying: false }));
            audioRef.current.onended = handleAudioEnded;
            audioRef.current.ontimeupdate = handleAudioTimeUpdate;
            audioRef.current.onerror = (e) => console.error("Audio playback error occurred", e);
            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: audioState.currentSurah?.englishName || t('mini_player_title'),
                    artist: audioState.currentReciter.name,
                    album: t('app_title'),
                    artwork: [{ src: 'icon.png', sizes: '512x512', type: 'image/png' }]
                });
                navigator.mediaSession.setActionHandler('play', togglePlayPause);
                navigator.mediaSession.setActionHandler('pause', togglePlayPause);
                navigator.mediaSession.setActionHandler('previoustrack', () => skipSurah('prev'));
                navigator.mediaSession.setActionHandler('nexttrack', () => skipSurah('next'));
            }
        }
    }, [audioState.isPlaying, audioState.currentSurah, audioState.currentReciter, language]);


    // Hadith Logic
    useEffect(() => {
        const fetchHadiths = async () => {
            if (HADITH_CACHE) {
                setHadiths(HADITH_CACHE);
                return;
            }
            setIsLoadingHadiths(true);
            const curated = CURATED_HADITHS.map(h => ({ ...h, id: h.id }));
            setHadithSource('curated');
            
            try {
                // Fetch all 6 major collections concurrently
                const responses = await Promise.all([
                    fetch('https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/eng-bukhari.min.json'),
                    fetch('https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/eng-muslim.min.json'),
                    fetch('https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/eng-abudawud.min.json'),
                    fetch('https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/eng-tirmidhi.min.json'),
                    fetch('https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/eng-nasai.min.json'),
                    fetch('https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/eng-ibnmajah.min.json')
                ]);

                let apiHadiths: Hadith[] = [];
                const names = ["Sahih Bukhari", "Sahih Muslim", "Sunan Abu Dawood", "Jami` at-Tirmidhi", "Sunan an-Nasa'i", "Sunan Ibn Majah"];
                const keys = ["bukhari", "muslim", "abudawud", "tirmidhi", "nasai", "ibnmajah"];

                for (let i = 0; i < responses.length; i++) {
                    if (responses[i].ok) {
                        const data = await responses[i].json();
                        const items = Object.values(data.hadiths).map((item: any) => ({
                            id: `${keys[i]}-${item.hadithNumber}`,
                            text: item.text,
                            narrator: names[i],
                            category: [],
                            reference: `${keys[i]} ${item.hadithNumber}`
                        }));
                        apiHadiths = [...apiHadiths, ...items];
                    }
                }

                if (apiHadiths.length > 0) {
                    const allHadiths = [...curated, ...apiHadiths];
                    HADITH_CACHE = allHadiths; // Cache the result
                    setHadiths(allHadiths);
                    setHadithSource('Major 6 Books (Sihah Sittah)');
                } else {
                    setHadiths(curated);
                }
            } catch (error) {
                console.warn("Failed to fetch full Hadith collection from API, using curated only.", error);
                setHadiths(curated);
            } finally {
                setIsLoadingHadiths(false);
            }
        };
        fetchHadiths();
    }, [language]); // Depend on language if APIs support it, otherwise English default

    const getHadithCategoryTags = (text: string): string[] => {
        const categories: string[] = [];
        const lowerText = (text || '').toLowerCase();
        if (lowerText.includes(t('cat_sleep').toLowerCase()) || lowerText.includes('bed') || lowerText.includes('night') || lowerText.includes('dream') || lowerText.includes('sleeping')) categories.push(t('cat_sleep'));
        if (lowerText.includes(t('cat_prayer').toLowerCase()) || lowerText.includes('salah') || lowerText.includes('worship') || lowerText.includes('masjid') || lowerText.includes('prostration') || lowerText.includes('bowing')) categories.push(t('cat_prayer'));
        if (lowerText.includes(t('cat_manners').toLowerCase()) || lowerText.includes('charity') || lowerText.includes('kind') || lowerText.includes('parents') || lowerText.includes('good deed') || lowerText.includes('akhlaq') || lowerText.includes('neighbor') || lowerText.includes('guest')) categories.push(t('cat_manners'));
        if (lowerText.includes(t('cat_knowledge').toLowerCase()) || lowerText.includes('quran') || lowerText.includes('ilm') || lowerText.includes('learn') || lowerText.includes('book') || lowerText.includes('scholar') || lowerText.includes('teaching')) categories.push(t('cat_knowledge'));
        if (lowerText.includes(t('cat_purity').toLowerCase()) || lowerText.includes('wudu') || lowerText.includes('ghusl') || lowerText.includes('clean') || lowerText.includes('ablution')) categories.push(t('cat_purity'));
        if (lowerText.includes(t('cat_forgiveness').toLowerCase()) || lowerText.includes('repent') || lowerText.includes('maghfirah') || lowerText.includes('sin') || lowerText.includes('mercy')) categories.push(t('cat_forgiveness'));
        if (lowerText.includes(t('cat_worship').toLowerCase()) || lowerText.includes('ibadah') || lowerText.includes('dhikr') || lowerText.includes('fasting') || lowerText.includes('hajj') || lowerText.includes('zakat')) categories.push(t('cat_worship'));
        return categories.length > 0 ? categories : [t('cat_all')];
    };

    const getFilteredHadiths = (): Hadith[] => {
        let filtered = hadiths
            .map(h => ({ ...h, category: h.category && h.category.length > 0 ? h.category : getHadithCategoryTags(h.text) }))
            .filter(h => (h.text ?? '').toLowerCase().includes(hadithSearchQuery.toLowerCase()));
        if (activeHadithCategory === 'favorites') filtered = filtered.filter(h => favoriteHadiths.includes(h.id));
        else if (activeHadithCategory !== 'all') filtered = filtered.filter(h => h.category?.includes(activeHadithCategory === t('cat_sleep') ? t('cat_sleep') : activeHadithCategory));
        return filtered.slice(0, 500);
    };

    const toggleFavoriteHadith = (id: string) => setFavoriteHadiths(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]);
    const toggleReadHadith = (id: string) => setReadHadiths(prev => prev.includes(id) ? prev.filter(readId => readId !== id) : [...prev, id]);


    // Dua Logic
    const getFilteredDuas = (): Dua[] => {
        let filtered = duas.filter(d =>
            (d.arabic ?? '').toLowerCase().includes(duaSearchQuery.toLowerCase()) ||
            (d.transliteration ?? '').toLowerCase().includes(duaSearchQuery.toLowerCase()) ||
            (d.english ?? '').toLowerCase().includes(duaSearchQuery.toLowerCase())
        );
        if (activeDuaCategory === 'favorites') filtered = filtered.filter(d => favoriteDuas.includes(d.id));
        else if (activeDuaCategory !== 'all') {
            const translatedCategory = DUA_CATEGORIES.find(c => c.key === activeDuaCategory)?.label;
            filtered = filtered.filter(d => d.category?.includes(translatedCategory || activeDuaCategory));
        }
        return filtered;
    };
    const toggleFavoriteDua = (id: string) => setFavoriteDuas(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]);
    const toggleReadDua = (id: string) => setReadDuas(prev => prev.includes(id) ? prev.filter(readId => readId !== id) : [...prev, id]);
    const openDuaExplanation = (dua: Dua) => { setSelectedDuaForExplanation(dua); setIsDuaExplainerOpen(true); };


    // Prayer Times Logic
    const getPrayerTimes = async (latitude: number, longitude: number) => {
        setLocationStatus('fetching');
        setLocationError(null);
        try {
            const date = new Date();
            const response = await fetch(`https://api.aladhan.com/v1/calendar/${date.getFullYear()}/${date.getMonth() + 1}?latitude=${latitude}&longitude=${longitude}&method=2`);
            const data = await response.json();
            if (data.code === 200) {
                const todayData = data.data.find((d: any) => parseInt(d.date.gregorian.day) === date.getDate());
                if (todayData) {
                    setPrayerTimes(todayData.timings);
                    setLocationStatus('granted');
                    calculateNextPrayer(todayData.timings);
                } else {
                    setLocationError('No prayer data for today.');
                    setLocationStatus('error');
                }
            } else {
                setLocationError(data.status);
                setLocationStatus('error');
            }
        } catch (err: any) {
            setLocationError(err.message || 'Unknown error.');
            setLocationStatus('error');
        }
    };

    const getUserLocation = () => {
        if (!navigator.geolocation) {
            setLocationError(t('location_not_supported') || 'Geolocation not supported.');
            setLocationStatus('error');
            return;
        }
        setLocationStatus('fetching');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                getPrayerTimes(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                setLocationError(error.message || 'Error getting location.');
                setLocationStatus('denied');
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
        );
    };

    const calculateNextPrayer = (timings: any) => {
        const now = new Date();
        const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        let next = null;
        let minDiff = Infinity;
        for (const pName of prayerNames) {
            const [hours, minutes] = timings[pName].split(' ')[0].split(':').map(Number);
            const prayerTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
            let diff = prayerTime.getTime() - now.getTime();
            if (diff < 0) {
                const nextDayPrayer = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, hours, minutes, 0);
                diff = nextDayPrayer.getTime() - now.getTime();
                if (diff < minDiff) { minDiff = diff; next = { name: pName, time: prayerTime, isTomorrow: true }; }
            } else if (diff < minDiff) { minDiff = diff; next = { name: pName, time: prayerTime, isTomorrow: false }; }
        }
        setNextPrayer(next);
    };

    const formatTimeRemaining = (ms: number) => {
        if (isNaN(ms) || !isFinite(ms)) return "00m 00s";
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${seconds}s`;
    };

    useEffect(() => {
        if (userLocation && activeTab === 'prayers') getPrayerTimes(userLocation.latitude, userLocation.longitude);
        else if (locationStatus === 'granted' && activeTab === 'prayers') {
            const interval = setInterval(() => { if (prayerTimes) calculateNextPrayer(prayerTimes); }, 60000);
            return () => clearInterval(interval);
        }
    }, [activeTab, userLocation, prayerTimes]);

    const toggleReminder = async (prayerName: string) => {
        if (!("Notification" in window)) { alert(t('notifications_not_supported')); return; }
        if (Notification.permission === "granted") {
            setPrayerReminders(prev => {
                const newState = { ...prev, [prayerName]: !prev[prayerName] };
                if (newState[prayerName] && prayerTimes) {
                     // Logic for scheduling notification would go here (simplified for now)
                }
                return newState;
            });
        } else if (Notification.permission !== "denied") {
            const permission = await Notification.requestPermission();
            if (permission === "granted") toggleReminder(prayerName);
        }
    };


    // Qibla Finder
    const calculateQiblaBearing = (lat: number, lng: number) => {
        const KaabaLat = KAABA_COORDS.lat;
        const KaabaLng = KAABA_COORDS.lng;
        const dLat = (KaabaLat - lat) * Math.PI / 180;
        const dLon = (KaabaLng - lng) * Math.PI / 180;
        const lat1 = lat * Math.PI / 180;
        const lat2 = KaabaLat * Math.PI / 180;
        const y = Math.sin(dLon) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        setQiblaBearing((Math.atan2(y, x) * 180 / Math.PI + 360) % 360);
    };

    const handleDeviceOrientation = (event: any) => {
        let alpha = event.alpha;
        if (event.webkitCompassHeading !== undefined && event.webkitCompassHeading !== null) alpha = event.webkitCompassHeading;
        else if (alpha !== null) alpha = (360 - alpha);
        if (alpha !== null && alpha !== undefined) setCompassHeading(alpha);
    };

    const requestDeviceMotionPermission = async () => {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const permissionState = await (DeviceOrientationEvent as any).requestPermission();
                if (permissionState === 'granted') { setDeviceMotionPermissionGranted(true); startCompass(); }
                else { setDeviceMotionPermissionGranted(false); setQiblaError(t('qibla_permission_denied')); }
            } catch (error) { setDeviceMotionPermissionGranted(false); setQiblaError(t('qibla_permission_error')); }
        } else { setDeviceMotionPermissionGranted(true); startCompass(); }
    };

    const startCompass = () => {
        if (qiblaBearing === null) { setQiblaError(t('qibla_location_required')); return; }
        if (isCompassActive) return;
        setIsCompassActive(true); setQiblaError(null); setCompassHeading(null);
        
        const win = window as any;
        if ('ondeviceorientationabsolute' in win) {
            win.addEventListener('deviceorientationabsolute', handleDeviceOrientation);
        } else if ('ondeviceorientation' in win) {
            win.addEventListener('deviceorientation', handleDeviceOrientation);
        } else { 
            setQiblaError(t('device_orientation_not_supported')); 
            setIsCompassActive(false); 
        }
    };

    const stopCompass = () => {
        if (isCompassActive) {
            const win = window as any;
            win.removeEventListener('deviceorientation', handleDeviceOrientation);
            win.removeEventListener('deviceorientationabsolute', handleDeviceOrientation);
            setIsCompassActive(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'qibla') {
            if (!userLocation && locationStatus !== 'fetching' && locationStatus !== 'granted') getUserLocation();
            else if (userLocation && qiblaBearing === null) calculateQiblaBearing(userLocation.latitude, userLocation.longitude);
            if (deviceMotionPermissionGranted === null) requestDeviceMotionPermission();
            else if (deviceMotionPermissionGranted && qiblaBearing !== null) startCompass();
        } else stopCompass();
        return () => stopCompass();
    }, [activeTab, userLocation, qiblaBearing, deviceMotionPermissionGranted]);

    const isAlignedWithQibla = qiblaBearing !== null && compassHeading !== null && Math.abs(((compassHeading - qiblaBearing + 360) % 360) - 0) < 10;

    return (
        <div className="animate-fade-in-up pb-28 relative" dir={isRTL ? 'rtl' : 'ltr'}>
            <DuaExplainerModal isOpen={isDuaExplainerOpen} onClose={() => setIsDuaExplainerOpen(false)} dua={selectedDuaForExplanation} t={t} isRTL={isRTL} language={language} />
            <audio ref={audioRef} onVolumeChange={handleAudioVolumeChange} />

            <div className="bg-slate-800 rounded-xl p-4 sm:p-8 border border-slate-700 shadow-2xl relative">
                {/* Header Container - Flex for responsiveness */}
                <div className="flex flex-col mb-8">
                    <div className="flex justify-between items-center w-full mb-4 px-2">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center text-slate-400 hover:text-yellow-400 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            {t('back_home')}
                        </button>

                        <div className="relative">
                            <Globe className="absolute left-2 top-2 w-3 h-3 text-slate-500 pointer-events-none" />
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as Language)}
                                className="bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-8 py-1 text-xs text-white h-8 focus:border-sky-500 outline-none appearance-none"
                                aria-label={t('select_language')}
                            >
                                {LANGUAGES.map((lang) => (
                                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-2 w-3 h-3 text-slate-500 pointer-events-none" />
                        </div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6">{t('app_title')}</h2>
                    </div>

                    <div className="flex bg-slate-900/50 p-1 rounded-lg max-w-full overflow-x-auto mx-auto scrollbar-hide">
                        <button onClick={() => navigate('/habits')} className={`flex-none min-w-fit sm:flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all whitespace-nowrap ${activeTab === 'habits' ? 'bg-yellow-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}><span className="flex items-center justify-center gap-2"><Sparkles className="w-4 h-4" /> {t('tab_sunnah')}</span></button>
                        <button onClick={() => navigate('/quran')} className={`flex-none min-w-fit sm:flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all whitespace-nowrap ${activeTab === 'quran' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}><span className="flex items-center justify-center gap-2"><BookOpen className="w-4 h-4" /> {t('tab_quran')}</span></button>
                        <button onClick={() => navigate('/audio')} className={`flex-none min-w-fit sm:flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all whitespace-nowrap ${activeTab === 'audio' ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}><span className="flex items-center justify-center gap-2"><Headphones className="w-4 h-4" /> {t('tab_audio')}</span></button>
                        <button onClick={() => navigate('/hadith')} className={`flex-none min-w-fit sm:flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all whitespace-nowrap ${activeTab === 'hadith' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}><span className="flex items-center justify-center gap-2"><Book className="w-4 h-4" /> {t('tab_hadith')}</span></button>
                        <button onClick={() => navigate('/dua')} className={`flex-none min-w-fit sm:flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all whitespace-nowrap ${activeTab === 'dua' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}><span className="flex items-center justify-center gap-2"><Lightbulb className="w-4 h-4" /> {t('tab_dua')}</span></button>
                        <button onClick={() => navigate('/prayers')} className={`flex-none min-w-fit sm:flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all whitespace-nowrap ${activeTab === 'prayers' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}><span className="flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> {t('tab_prayers')}</span></button>
                        <button onClick={() => navigate('/qibla')} className={`flex-none min-w-fit sm:flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all whitespace-nowrap ${activeTab === 'qibla' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}><span className="flex items-center justify-center gap-2"><Compass className="w-4 h-4" /> {t('tab_qibla')}</span></button>
                    </div>
                </div>

                {/* Mini Audio Player */}
                {audioState.miniPlayerActive && activeTab !== 'audio' && audioState.currentSurah && (
                    <div className="fixed bottom-4 left-4 right-4 sm:left-auto w-auto sm:w-80 bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl flex items-center justify-between z-50 animate-fade-in-up">
                        <div className="flex items-center gap-3">
                            <Headphones className="w-6 h-6 text-teal-400" />
                            <div>
                                <p className="text-sm font-semibold text-white">{audioState.currentSurah.englishName}</p>
                                <p className="text-xs text-slate-400">{t('mini_player_reciter')}: {audioState.currentReciter.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => skipSurah('prev')} className="p-1 rounded-full hover:bg-slate-800 text-slate-300"><SkipBack className="w-5 h-5" /></button>
                            <button onClick={togglePlayPause} className="p-1 rounded-full bg-teal-600 hover:bg-teal-500 text-white">{audioState.isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}</button>
                            <button onClick={() => skipSurah('next')} className="p-1 rounded-full hover:bg-slate-800 text-slate-300"><SkipForward className="w-5 h-5" /></button>
                            <button onClick={() => setAudioState(prev => ({ ...prev, miniPlayerActive: false }))} className="p-1 rounded-full hover:bg-slate-800 text-slate-300"><X className="w-5 h-5" /></button>
                        </div>
                    </div>
                )}

                {/* Tab Content Rendering */}
                {activeTab === 'habits' && (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="space-y-4">
                            {getHabits(language).map((habit, index) => {
                                const IconComponent = HABIT_ICONS[habit.icon as number];
                                return (
                                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-slate-600 transition-all hover:bg-slate-900 group">
                                        <div className={`p-3 rounded-full bg-slate-800 border border-slate-700 shrink-0 group-hover:scale-110 transition-transform`}>{IconComponent && <IconComponent className={`w-6 h-6 ${habit.color}`} />}</div>
                                        <div><h3 className={`font-bold text-lg mb-1 ${habit.color}`}>{habit.title}</h3><p className="text-slate-300 text-sm leading-relaxed">{habit.description}</p></div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-10 pt-8 border-t border-slate-700">
                            <h3 className="text-xl font-bold text-white mb-6 text-center">{t('wisdom_title')}</h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {getEtiquettes(language).map((etiquette, index) => {
                                    const IconComponent = ETIQUETTE_ICONS[etiquette.icon as number];
                                    return (
                                        <div key={index} className="bg-slate-750 border border-slate-700 rounded-lg p-5 hover:bg-slate-700 transition-colors">
                                            <div className="flex items-center gap-3 mb-2">{IconComponent && <IconComponent className={`w-5 h-5 ${etiquette.color}`} />}<h4 className="font-bold text-slate-200">{etiquette.title}</h4></div>
                                            <p className="text-sm text-slate-400 leading-relaxed">{etiquette.benefit}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Moon className="w-5 h-5 text-sky-400" />{t('dua_sleeping')}</h3>
                                <p className="text-xl sm:text-2xl font-arabic text-right mb-4 leading-loose text-yellow-100 font-serif" dir="rtl">{t('dua_sleeping_arabic')}</p>
                                <p className="text-slate-300 italic mb-2">{t('dua_sleeping_translit')}</p>
                                <p className="text-slate-400 text-sm">{t('dua_sleeping_meaning')}</p>
                            </div>
                            <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Sun className="w-5 h-5 text-yellow-400" />{t('dua_waking_up')}</h3>
                                <p className="text-xl sm:text-2xl font-arabic text-right mb-4 leading-loose text-yellow-100 font-serif" dir="rtl">{t('dua_waking_up_arabic')}</p>
                                <p className="text-slate-300 italic mb-2">{t('dua_waking_up_translit')}</p>
                                <p className="text-slate-400 text-sm">{t('dua_waking_up_meaning')}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Other tabs logic remains largely same, just ensuring correct render inside main container */}
                {activeTab === 'quran' && (
                    <div className="animate-fade-in-up space-y-8">
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                            <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold text-white flex items-center gap-2"><BarChart className="w-5 h-5 text-green-400" /> {t('progress')}</h3><span className="text-2xl font-bold text-green-400">{progressPercentage.toFixed(1)}%</span></div>
                            <div className="w-full bg-slate-700 rounded-full h-4 mb-4"><div className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-out relative" style={{ width: `${progressPercentage}%` }}><div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div></div></div>
                            <div className="grid grid-cols-2 gap-4 text-center"><div className="bg-slate-800 rounded-lg p-3"><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{t('surahs_completed')}</p><p className="text-2xl font-bold text-white">{completedSurahs.length} <span className="text-slate-500 text-sm font-normal">/ 114</span></p></div><div className="bg-slate-800 rounded-lg p-3"><p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{t('verses_recited')}</p><p className="text-2xl font-bold text-white">{completedVerses} <span className="text-slate-500 text-sm font-normal">/ {totalVerses}</span></p></div></div>
                        </div>
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Bookmark className="w-5 h-5 text-sky-400" /> {t('tab_quran')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex gap-2"><input type="number" min="1" max="604" placeholder={`${t('page')} (1-604)`} value={navPageInput} onChange={(e) => setNavPageInput(e.target.value)} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white w-full text-sm focus:border-sky-500 outline-none" /><button onClick={() => handleReadPage(parseInt(navPageInput))} className="bg-sky-600 hover:bg-sky-500 text-white px-3 py-2 rounded-lg font-medium text-sm transition-colors">{t('go')}</button></div>
                                <select onChange={(e) => handleReadPage(JUZ_START_PAGES[parseInt(e.target.value) - 1])} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white w-full text-sm focus:border-sky-500 outline-none" defaultValue=""><option value="" disabled>{t('go')} {t('para')} (Juz)</option>{Array.from({ length: 30 }, (_, i) => (<option key={i + 1} value={i + 1}>{t('para')} {i + 1}</option>))}</select>
                                <div className="relative"><input type="text" placeholder={t('search_ayah')} value={ayahSearchQuery} onChange={(e) => setAyahSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearchAyah()} className="bg-slate-800 border border-slate-600 rounded-lg pl-3 pr-10 py-2 text-white w-full text-sm focus:border-sky-500 outline-none" /><button onClick={handleSearchAyah} disabled={isSearchingAyah} className="absolute right-1 top-1 p-1 text-slate-400 hover:text-white rounded">{isSearchingAyah ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}</button></div>
                            </div>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-white mb-4">{t('popular_surahs')}</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {POPULAR_SURAH_IDS.map(id => {
                                    const surah = QURAN_SURAHS.find(s => s.number === id);
                                    if (!surah) return null;
                                    return (<button key={surah.number} onClick={() => handleReadSurah(null, surah.number)} className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-sm text-center hover:bg-slate-800 transition-colors"><p className="font-bold text-sky-400">{surah.englishName}</p><p className="text-xs text-slate-500">{surah.name}</p></button>);
                                })}
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4"><h3 className="text-lg font-bold text-white">{t('surah_list_header') || 'Surah List'}</h3><div className="relative w-full sm:w-64"><input type="text" placeholder={t('search_surah')} value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setSurahListPage(1); }} className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white w-full focus:border-sky-500 outline-none" /><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" /></div></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 mb-6">
                                {paginatedSurahs.map((surah) => {
                                    const isCompleted = completedSurahs.includes(surah.number);
                                    return (
                                        <div key={surah.number} onClick={() => toggleSurah(surah.number)} className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between group ${isCompleted ? 'bg-slate-800 border-green-500/50 shadow-lg shadow-green-500/10' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}>
                                            <div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${isCompleted ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-400'}`}>{surah.number}</div><div><h4 className={`font-bold ${isCompleted ? 'text-white' : 'text-slate-300'}`}>{surah.englishName} <span className="text-xs font-normal text-slate-500 ml-1">({surah.name})</span></h4><p className="text-xs text-slate-500">{surah.englishNameTranslation} • {surah.verses} {t('verses')}</p></div></div>
                                            <div className="flex items-center gap-3"><button onClick={(e) => handleReadSurah(e, surah.number)} className="px-3 py-1.5 bg-slate-800 hover:bg-sky-600 hover:text-white text-sky-400 text-xs font-medium rounded-full transition-colors border border-slate-700 hover:border-sky-500">{t('read')}</button>{isCompleted ? (<CheckCircle className="w-5 h-5 text-green-500" />) : (<Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                            {totalSurahPages > 1 && (<div className="flex justify-center items-center gap-4"><button onClick={() => setSurahListPage(p => Math.max(1, p - 1))} disabled={surahListPage === 1} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"><ChevronLeft className="w-4 h-4" /></button><span className="text-sm text-slate-400">{t('page')} <span className="text-white">{surahListPage}</span> {t('of')} {totalSurahPages}</span><button onClick={() => setSurahListPage(p => Math.min(totalSurahPages, p + 1))} disabled={surahListPage === totalSurahPages} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"><ChevronRight className="w-4 h-4" /></button></div>)}
                        </div>
                    </div>
                )}
                {activeTab === 'audio' && (
                    <div className="animate-fade-in-up space-y-8">
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700"><h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Headphones className="w-5 h-5 text-teal-400" /> {t('reciter')}</h3><select value={audioState.currentReciter.id} onChange={(e) => { const selected = RECITERS.find(r => r.id === e.target.value); if (selected) { setAudioState(prev => ({ ...prev, currentReciter: selected })); if (audioState.currentSurah) playAudio(audioState.currentSurah); } }} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white w-full text-sm focus:border-teal-500 outline-none">{RECITERS.map(reciter => (<option key={reciter.id} value={reciter.id}>{reciter.name}</option>))}</select></div>
                        {audioState.currentSurah && (
                            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 text-center">
                                <p className="text-2xl font-bold text-teal-400 mb-2">{audioState.currentSurah.englishName}</p><p className="text-sm text-slate-400 mb-4">{audioState.currentReciter.name}</p>
                                <div className="flex items-center justify-center gap-4 mb-4"><button onClick={() => skipSurah('prev')} className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white"><SkipBack className="w-6 h-6" /></button><button onClick={togglePlayPause} className="p-4 rounded-full bg-teal-600 hover:bg-teal-500 text-white">{audioState.isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}</button><button onClick={() => skipSurah('next')} className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white"><SkipForward className="w-6 h-6" /></button></div>
                                <div className="w-full bg-slate-700 rounded-full h-2 mb-2"><div className="bg-teal-500 h-2 rounded-full" style={{ width: `${(audioState.progress / (audioState.duration || 1)) * 100}%` }}></div></div><div className="flex justify-between text-xs text-slate-400 mb-4"><span>{formatAudioTime(audioState.progress)}</span><span>{formatAudioTime(audioState.duration)}</span></div>
                                <div className="flex items-center justify-center gap-2"><Volume2 className="w-5 h-5 text-slate-400" /><input type="range" min="0" max="1" step="0.05" value={audioState.volume} onChange={handleAudioVolumeChange} className="w-32 accent-teal-500" /></div>
                            </div>
                        )}
                        <div className="mb-8"><h3 className="text-lg font-bold text-white mb-4">{t('quick_play')}</h3><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">{POPULAR_SURAH_IDS.map(id => { const surah = QURAN_SURAHS.find(s => s.number === id); if (!surah) return null; return (<button key={surah.number} onClick={() => playAudio(surah)} className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-sm text-center hover:bg-slate-800 transition-colors"><p className="font-bold text-teal-400">{surah.englishName}</p><p className="text-xs text-slate-500">{surah.name}</p></button>); })}</div></div>
                        <div><h3 className="text-lg font-bold text-white mb-4">{t('playlist')}</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">{QURAN_SURAHS.map((surah) => (<div key={surah.number} onClick={() => playAudio(surah)} className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between group ${audioState.currentSurah?.number === surah.number ? 'bg-teal-800 border-teal-500 shadow-lg shadow-teal-500/10' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}><div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${audioState.currentSurah?.number === surah.number ? 'bg-teal-500 text-white' : 'bg-slate-800 text-slate-400'}`}>{surah.number}</div><div><h4 className={`font-bold ${audioState.currentSurah?.number === surah.number ? 'text-white' : 'text-slate-300'}`}>{surah.englishName} <span className="text-xs font-normal text-slate-500 ml-1">({surah.name})</span></h4><p className="text-xs text-slate-500">{surah.englishNameTranslation} • {surah.verses} {t('verses')}</p></div></div><Play className={`w-5 h-5 ${audioState.currentSurah?.number === surah.number ? 'text-white' : 'text-teal-400 group-hover:text-white'}`} /></div>))}</div></div>
                    </div>
                )}
                {activeTab === 'hadith' && (
                    <div className="animate-fade-in-up space-y-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4"><h3 className="text-lg font-bold text-white">{t('hadith_collection')}</h3><div className="relative w-full sm:w-64"><input type="text" placeholder={t('search_hadith')} value={hadithSearchQuery} onChange={(e) => { setHadithSearchQuery(e.target.value); setHadithPage(1); }} className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white w-full focus:border-orange-500 outline-none" /><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" /></div></div>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">{HADITH_CATEGORIES.map(cat => (<button key={cat.key} onClick={() => { setActiveHadithCategory(cat.key); setHadithPage(1); }} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeHadithCategory === cat.key ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{cat.label}</button>))}</div>
                        {isLoadingHadiths ? (<div className="flex flex-col items-center justify-center h-48 text-orange-400"><Loader2 className="w-8 h-8 animate-spin mb-3" /><p>{t('loading')} {t('hadith_collection')}...</p></div>) : (<><p className="text-xs text-slate-500 mb-4">{t('source')}: {hadithSource}</p><div className="grid grid-cols-1 gap-4">{getFilteredHadiths().slice((hadithPage - 1) * HADITHS_PER_PAGE, hadithPage * HADITHS_PER_PAGE).map(hadith => { const isFavorite = favoriteHadiths.includes(hadith.id); const isRead = readHadiths.includes(hadith.id); return (<div key={hadith.id} className={`p-5 rounded-lg border transition-all relative group ${isRead ? 'bg-green-900/10 border-green-500/20' : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600'}`}>{isRead && <span className="absolute top-2 right-2 text-green-500" title={t('read')}><CheckCircle className="w-5 h-5" /></span>}<div className="flex items-center gap-2 mb-3">{hadith.category && hadith.category.map((cat, idx) => (<span key={idx} className="bg-slate-700/70 text-slate-300 px-2 py-0.5 rounded-md text-xs font-medium">{cat}</span>))}</div><p className="text-slate-200 leading-relaxed mb-4"><span className="font-semibold text-orange-400 mr-2">{hadith.narrator}:</span>{hadith.text}</p><p className="text-sm text-slate-500 font-medium">{t('source')}: {hadith.reference}</p><div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700/50"><button onClick={() => toggleFavoriteHadith(hadith.id)} className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/50 hover:bg-slate-600 text-slate-400'}`} title={isFavorite ? t('remove_favorite') : t('add_favorite')}><Heart className="w-4 h-4" /></button><button onClick={() => toggleReadHadith(hadith.id)} className={`p-2 rounded-full transition-colors ${isRead ? 'bg-green-500/20 text-green-400' : 'bg-slate-700/50 hover:bg-slate-600 text-slate-400'}`} title={isRead ? t('mark_unread') : t('mark_read')}><div className="flex items-center">{isRead ? <Check className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}</div></button><button onClick={() => { navigator.clipboard.writeText(hadith.text); alert(t('copied')); }} className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-600 text-slate-400 transition-colors" title={t('copy')}><Copy className="w-4 h-4" /></button></div></div>); })}</div>{getFilteredHadiths().length > HADITHS_PER_PAGE && (<div className="flex justify-center items-center gap-4 mt-6"><button onClick={() => setHadithPage(p => Math.max(1, p - 1))} disabled={hadithPage === 1} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"><ChevronLeft className="w-4 h-4" /></button><span className="text-sm text-slate-400">{t('page')} <span className="text-white">{hadithPage}</span> {t('of')} {Math.ceil(getFilteredHadiths().length / HADITHS_PER_PAGE)}</span><button onClick={() => setHadithPage(p => Math.min(Math.ceil(getFilteredHadiths().length / HADITHS_PER_PAGE), p + 1))} disabled={hadithPage === Math.ceil(getFilteredHadiths().length / HADITHS_PER_PAGE)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"><ChevronRight className="w-4 h-4" /></button></div>)}</>)}
                    </div>
                )}
                {activeTab === 'dua' && (
                    <div className="animate-fade-in-up space-y-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4"><h3 className="text-lg font-bold text-white">{t('dua_collection')}</h3><div className="relative w-full sm:w-64"><input type="text" placeholder={t('search_dua')} value={duaSearchQuery} onChange={(e) => { setDuaSearchQuery(e.target.value); setDuaPage(1); }} className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white w-full focus:border-purple-500 outline-none" /><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" /></div></div>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">{DUA_CATEGORIES.map(cat => (<button key={cat.key} onClick={() => { setActiveDuaCategory(cat.key); setDuaPage(1); }} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeDuaCategory === cat.key ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{cat.label}</button>))}</div>
                        <div className="grid grid-cols-1 gap-4">{getFilteredDuas().slice((duaPage - 1) * DUAS_PER_PAGE, duaPage * DUAS_PER_PAGE).map(dua => { const isFavorite = favoriteDuas.includes(dua.id); const isRead = readDuas.includes(dua.id); return (<div key={dua.id} className={`p-5 rounded-lg border transition-all relative group ${isRead ? 'bg-green-900/10 border-green-500/20' : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600'}`}>{isRead && <span className="absolute top-2 right-2 text-green-500" title={t('read')}><CheckCircle className="w-5 h-5" /></span>}<div className="flex items-center gap-2 mb-3">{dua.category && dua.category.map((cat, idx) => (<span key={idx} className="bg-slate-700/70 text-slate-300 px-2 py-0.5 rounded-md text-xs font-medium">{cat}</span>))}</div><p className="text-xl sm:text-2xl font-arabic text-right leading-loose text-white font-serif mb-3" dir="rtl">{dua.arabic}</p><p className="text-slate-300 italic text-sm mb-3">{dua.transliteration}</p><p className="text-slate-200 leading-relaxed mb-4">{dua.english}</p><p className="text-sm text-slate-500 font-medium">{t('source')}: {dua.reference}</p><div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700/50"><button onClick={() => toggleFavoriteDua(dua.id)} className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/50 hover:bg-slate-600 text-slate-400'}`} title={isFavorite ? t('remove_favorite') : t('add_favorite')}><Heart className="w-4 h-4" /></button><button onClick={() => toggleReadDua(dua.id)} className={`p-2 rounded-full transition-colors ${isRead ? 'bg-green-500/20 text-green-400' : 'bg-slate-700/50 hover:bg-slate-600 text-slate-400'}`} title={isRead ? t('mark_unread') : t('mark_read')}><div className="flex items-center">{isRead ? <Check className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}</div></button><button onClick={() => { navigator.clipboard.writeText(`${dua.arabic}\n${dua.transliteration}\n${dua.english}`); alert(t('copied')); }} className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-600 text-slate-400 transition-colors" title={t('copy')}><Copy className="w-4 h-4" /></button><button onClick={() => openDuaExplanation(dua)} className="p-2 rounded-full bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 transition-colors ml-auto flex items-center gap-2 px-3"><Lightbulb className="w-4 h-4" /><span className="text-xs font-medium">{t('explain_dua')}</span></button></div></div>); })}</div>
                        {getFilteredDuas().length > DUAS_PER_PAGE && (<div className="flex justify-center items-center gap-4 mt-6"><button onClick={() => setDuaPage(p => Math.max(1, p - 1))} disabled={duaPage === 1} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"><ChevronLeft className="w-4 h-4" /></button><span className="text-sm text-slate-400">{t('page')} <span className="text-white">{duaPage}</span> {t('of')} {Math.ceil(getFilteredDuas().length / DUAS_PER_PAGE)}</span><button onClick={() => setDuaPage(p => Math.min(Math.ceil(getFilteredDuas().length / DUAS_PER_PAGE), p + 1))} disabled={duaPage === Math.ceil(getFilteredDuas().length / DUAS_PER_PAGE)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"><ChevronRight className="w-4 h-4" /></button></div>)}
                    </div>
                )}
                {activeTab === 'prayers' && (
                    <div className="animate-fade-in-up space-y-6">
                        <h3 className="text-xl font-bold text-white text-center mb-6 flex items-center justify-center gap-2"><Clock className="w-6 h-6 text-indigo-400" /> {t('prayer_times_header')}</h3>
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 text-center">
                            <p className="text-sm text-slate-400 mb-2">{t('location_status')}:</p>
                            {locationStatus === 'idle' && (<button onClick={getUserLocation} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-2 mx-auto"><MapPin className="w-5 h-5" /> {t('enable_location')}</button>)}
                            {locationStatus === 'fetching' && (<p className="text-indigo-400 flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> {t('fetching_location')}</p>)}
                            {locationStatus === 'denied' && (<p className="text-red-400">{t('location_error')} {locationError}</p>)}
                            {locationStatus === 'error' && (<p className="text-red-400">{t('location_error')} {locationError}</p>)}
                            {locationStatus === 'granted' && (<p className="text-green-400 flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" /> {t('location_granted')}</p>)}
                        </div>
                        {prayerTimes && locationStatus === 'granted' && (
                            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                                {nextPrayer && (<div className="text-center mb-6"><p className="text-sm text-slate-400">{t('next_prayer')}</p><p className="text-3xl font-bold text-green-400 mb-2">{t(nextPrayer.name.toLowerCase() as any)} ({nextPrayer.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}){nextPrayer.isTomorrow && <span className="text-base text-slate-500 ml-2">({t('tomorrow')})</span>}</p><p className="text-lg text-slate-300">{t('time_until')}: {formatTimeRemaining(nextPrayer.time.getTime() - new Date().getTime())}</p></div>)}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">{['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map(prayer => (<div key={prayer} className="bg-slate-800 rounded-lg p-3 text-center border border-slate-700 flex flex-col justify-between"><div><p className="text-sm text-slate-400 mb-1">{t(prayer.toLowerCase() as any)}</p><p className="text-xl font-bold text-white">{prayerTimes[prayer].split(' ')[0]}</p></div><button onClick={() => toggleReminder(prayer)} className={`mt-3 px-3 py-1 rounded-full text-xs font-medium flex items-center justify-center gap-1 mx-auto ${prayerReminders[prayer] ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'}`}>{prayerReminders[prayer] ? <Bell className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}{prayerReminders[prayer] ? t('reminder_on') : t('reminder_off')}</button></div>))}</div>
                                <p className="text-xs text-slate-500 text-center">{t('method')}: <span className="text-slate-400">{t('makkah_method')}</span></p>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'qibla' && (
                    <div className="animate-fade-in-up space-y-6">
                        <h3 className="text-xl font-bold text-white text-center mb-6 flex items-center justify-center gap-2"><Compass className="w-6 h-6 text-red-400" /> {t('qibla_finder_header')}</h3>
                        {deviceMotionPermissionGranted === false && (<div className="bg-red-900/20 border border-red-700 rounded-xl p-4 text-center"><p className="text-red-400 mb-3">{t('qibla_permission_denied')}</p><button onClick={requestDeviceMotionPermission} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg flex items-center gap-2 mx-auto"><RotateCcw className="w-5 h-5" /> {t('grant_permission')}</button></div>)}
                        {qiblaError && (<div className="bg-red-900/20 border border-red-700 rounded-xl p-4 text-center"><p className="text-red-400">{t('compass_error')} {qiblaError}</p>{!userLocation && locationStatus !== 'fetching' && (<button onClick={getUserLocation} className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-2 mx-auto"><MapPin className="w-5 h-5" /> {t('enable_location')}</button>)}</div>)}
                        {(!isCompassActive || compassHeading === null) && !qiblaError && deviceMotionPermissionGranted !== false ? (<div className="flex flex-col items-center justify-center h-48 text-red-400"><Loader2 className="w-8 h-8 animate-spin mb-3" /><p>{t('activating_compass')}</p><p className="text-sm text-slate-500">{t('ensure_device_flat')}</p></div>) : compassHeading !== null && (
                            <div className="relative w-full aspect-square max-w-sm mx-auto bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-700 shadow-2xl overflow-hidden">
                                <div className="absolute inset-0 rounded-full transition-transform duration-100 ease-linear" style={{ transform: `rotateZ(${-compassHeading}deg)`, backgroundImage: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)' }}>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-500" />
                                    <span className="absolute top-4 left-1/2 -translate-x-1/2 text-red-500 font-bold text-lg">N</span>
                                    {Array.from({ length: 12 }, (_, i) => (<div key={i} className="absolute top-0 left-1/2 w-px h-full" style={{ transformOrigin: 'top center', transform: `translateX(-50%) rotateZ(${i * 30}deg)` }}><div className="w-0.5 h-3 bg-slate-600 absolute top-0 left-1/2 -translate-x-1/2"></div>{i % 3 === 0 && i !== 0 && (<span className="absolute top-5 -translate-x-1/2 text-slate-400 text-xs" style={{ transform: `rotateZ(${-i * 30}deg)` }}>{i * 30 === 90 ? 'E' : i * 30 === 180 ? 'S' : 'W'}</span>)}</div>))}
                                </div>
                                {qiblaBearing !== null ? (
                                    <div className="absolute inset-0 transition-transform duration-100 ease-linear flex items-start justify-center" style={{ transform: `rotateZ(${(qiblaBearing - compassHeading + 360) % 360}deg)`, transformOrigin: 'center center' }}>
                                        <div className={`relative w-12 h-12 bg-gray-900 border-2 border-amber-400 rounded-lg flex items-center justify-center -mt-6 transition-all duration-300 ${isAlignedWithQibla ? 'shadow-lg shadow-amber-500/50 scale-110 animate-pulse-medium' : ''}`}><div className="absolute top-1/2 left-1/2 w-4 h-4 bg-amber-400 rounded-full -translate-x-1/2 -translate-y-1/2"></div><div className="absolute w-full h-1/4 bottom-0 bg-amber-400/80"></div><span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-gray-900">{t('kaaba')}</span></div>
                                    </div>
                                ) : (
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-amber-500 font-bold text-xs flex flex-col items-center">
                                         <Loader2 className="w-4 h-4 animate-spin mb-1" />
                                         <span>Loading Qibla...</span>
                                    </div>
                                )}
                                <Navigation className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-white z-10" />
                            </div>
                        )}
                        {qiblaBearing !== null && compassHeading !== null && (<div className="text-center mt-6"><p className="text-lg font-semibold text-slate-300 mb-2">{t('current_heading')}: {compassHeading.toFixed(1)}°</p><p className="text-lg font-semibold text-sky-400 mb-4">{t('qibla_bearing')}: {qiblaBearing.toFixed(1)}°</p>{isAlignedWithQibla ? (<p className="text-green-400 font-bold text-xl flex items-center justify-center gap-2 animate-pulse"><CheckCircle className="w-6 h-6" /> {t('facing_qibla')}</p>) : (<p className="text-slate-400 text-lg">{t('align_device')}</p>)}</div>)}
                    </div>
                )}
            </div>

            {/* Quran Reader Modal */}
            {currentQuranPage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-sm animate-fade-in-up">
                    <div className="bg-slate-900 w-full max-w-4xl h-full sm:h-[90vh] sm:rounded-2xl shadow-2xl border-none sm:border border-slate-700 flex flex-col relative" dir={isRTL ? 'rtl' : 'ltr'}>
                        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900 sm:rounded-t-2xl z-10">
                            <div className="flex items-center gap-3"><span className="bg-sky-900/30 text-sky-400 px-3 py-1 rounded-full text-xs font-bold border border-sky-500/30">{t('page')} {currentQuranPage}</span>{pageContent && (<span className="text-xs text-slate-400 hidden sm:inline">{t('para')} {pageContent.arabic.ayahs[0].juz} • Hizb {pageContent.arabic.ayahs[0].hizbQuarter}</span>)}</div>
                            <div className="flex gap-2"><button onClick={() => handleReadPage(currentQuranPage - 1)} disabled={currentQuranPage <= 1} className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-lg text-white" title={t('previous_page')}><ChevronLeft className="w-5 h-5" /></button><button onClick={() => handleReadPage(currentQuranPage + 1)} disabled={currentQuranPage >= 604} className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-lg text-white" title={t('next_page')}><ChevronRight className="w-5 h-5" /></button><button onClick={closeReader} className="p-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg ml-2"><X className="w-5 h-5" /></button></div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 scrollbar-hide bg-[#1a1c23]">
                            {isLoadingPage ? (<div className="flex flex-col items-center justify-center h-full text-slate-400"><Loader2 className="w-10 h-10 animate-spin mb-4 text-sky-500" /><p>{t('loading')} {t('page')} {currentQuranPage}...</p></div>) : readerError ? (<div className="flex flex-col items-center justify-center h-full text-red-400"><p>{readerError}</p><button onClick={() => handleReadPage(currentQuranPage!)} className="mt-4 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-white text-sm">{t('try_again')}</button></div>) : pageContent ? (<>{pageContent.arabic.ayahs.map((ayah: any, index: number) => { const isBismillah = ayah.text.includes("بِسْمِ ٱللَّهِ") && ayah.numberInSurah === 1 && ayah.surah.number !== 1 && ayah.surah.number !== 9; const displayText = isBismillah ? ayah.text.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "").trim() : ayah.text; return (<div key={ayah.number} className="border-b border-slate-800/50 pb-6 last:border-0">{ayah.numberInSurah === 1 && (<div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 mb-6 text-center"><h3 className="text-xl font-bold text-yellow-400">{ayah.surah.englishName}</h3><p className="text-xs text-slate-400">{ayah.surah.englishNameTranslation} • {ayah.surah.revelationType}</p>{ayah.surah.number !== 1 && ayah.surah.number !== 9 && (<p className="text-2xl font-arabic text-white mt-2 font-serif" dir="rtl">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>)}</div>)}<div className="flex flex-col gap-4"><div className="flex justify-end items-start gap-3"><span className="w-8 h-8 rounded-full border border-sky-500/30 flex items-center justify-center text-[10px] text-sky-400 flex-shrink-0 mt-1">{ayah.numberInSurah}</span><p className="text-2xl sm:text-3xl font-arabic text-right leading-loose text-white font-serif" dir="rtl">{displayText || ayah.text}</p></div><p className="text-slate-400 text-sm sm:text-base leading-relaxed text-left pl-2 border-l-2 border-slate-700 ml-1">{pageContent.english.ayahs[index].text}</p></div></div>); })}</>) : null}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
