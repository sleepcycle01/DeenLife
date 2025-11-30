
import { Hadith, Dua, Language, Translation, Habit, Etiquette, Surah } from './types';

// Quran Surahs Data
export const QURAN_SURAHS: Surah[] = [
    { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", englishNameTranslation: "The Opening", revelationType: "Meccan", verses: 7 },
    { number: 2, name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", revelationType: "Medinan", verses: 286 },
    { number: 3, name: "آل عمران", englishName: "Ali 'Imran", englishNameTranslation: "Family of Imran", revelationType: "Medinan", verses: 200 },
    { number: 4, name: "النساء", englishName: "An-Nisa", englishNameTranslation: "The Women", revelationType: "Medinan", verses: 176 },
    { number: 5, name: "المائدة", englishName: "Al-Ma'idah", englishNameTranslation: "The Table Spread", revelationType: "Medinan", verses: 120 },
    { number: 6, name: "الأنعام", englishName: "Al-An'am", englishNameTranslation: "The Cattle", revelationType: "Meccan", verses: 165 },
    { number: 7, name: "الأعراف", englishName: "Al-A'raf", englishNameTranslation: "The Heights", revelationType: "Meccan", verses: 206 },
    { number: 8, name: "الأنفال", englishName: "Al-Anfal", englishNameTranslation: "The Spoils of War", revelationType: "Medinan", verses: 75 },
    { number: 9, name: "التوبة", englishName: "At-Tawbah", englishNameTranslation: "The Repentance", revelationType: "Medinan", verses: 129 },
    { number: 10, name: "يونس", englishName: "Yunus", englishNameTranslation: "Jonah", revelationType: "Meccan", verses: 109 },
    { number: 11, name: "هود", englishName: "Hud", englishNameTranslation: "Hud", revelationType: "Meccan", verses: 123 },
    { number: 12, name: "يوسف", englishName: "Yusuf", englishNameTranslation: "Joseph", revelationType: "Meccan", verses: 111 },
    { number: 13, name: "الرعد", englishName: "Ar-Ra'd", englishNameTranslation: "The Thunder", revelationType: "Medinan", verses: 43 },
    { number: 14, name: "ابراهيم", englishName: "Ibrahim", englishNameTranslation: "Abraham", revelationType: "Meccan", verses: 52 },
    { number: 15, name: "الحجر", englishName: "Al-Hijr", englishNameTranslation: "The Rock", revelationType: "Meccan", verses: 99 },
    { number: 16, name: "النحل", englishName: "An-Nahl", englishNameTranslation: "The Bee", revelationType: "Meccan", verses: 128 },
    { number: 17, name: "الإسراء", englishName: "Al-Isra", englishNameTranslation: "The Night Journey", revelationType: "Meccan", verses: 111 },
    { number: 18, name: "الكهف", englishName: "Al-Kahf", englishNameTranslation: "The Cave", revelationType: "Meccan", verses: 110 },
    { number: 19, name: "مريم", englishName: "Maryam", englishNameTranslation: "Mary", revelationType: "Meccan", verses: 98 },
    { number: 20, name: "طه", englishName: "Taha", englishNameTranslation: "Taha", revelationType: "Meccan", verses: 135 },
    { number: 21, name: "الأنبياء", englishName: "Al-Anbiya", englishNameTranslation: "The Prophets", revelationType: "Meccan", verses: 112 },
    { number: 22, name: "الحج", englishName: "Al-Hajj", englishNameTranslation: "The Pilgrimage", revelationType: "Medinan", verses: 78 },
    { number: 23, name: "المؤمنون", englishName: "Al-Mu'minun", englishNameTranslation: "The Believers", revelationType: "Meccan", verses: 118 },
    { number: 24, name: "النور", englishName: "An-Nur", englishNameTranslation: "The Light", revelationType: "Medinan", verses: 64 },
    { number: 25, name: "الفرقان", englishName: "Al-Furqan", englishNameTranslation: "The Criterion", revelationType: "Meccan", verses: 77 },
    { number: 26, name: "الشعراء", englishName: "Ash-Shu'ara", englishNameTranslation: "The Poets", revelationType: "Meccan", verses: 227 },
    { number: 27, name: "النمل", englishName: "An-Naml", englishNameTranslation: "The Ant", revelationType: "Meccan", verses: 93 },
    { number: 28, name: "القصص", englishName: "Al-Qasas", englishNameTranslation: "The Stories", revelationType: "Meccan", verses: 88 },
    { number: 29, name: "العنكبوت", englishName: "Al-Ankabut", englishNameTranslation: "The Spider", revelationType: "Meccan", verses: 69 },
    { number: 30, name: "الروم", englishName: "Ar-Rum", englishNameTranslation: "The Romans", revelationType: "Meccan", verses: 60 },
    { number: 31, name: "لقمان", englishName: "Luqman", englishNameTranslation: "Luqman", revelationType: "Meccan", verses: 34 },
    { number: 32, name: "السجدة", englishName: "As-Sajdah", englishNameTranslation: "The Prostration", revelationType: "Meccan", verses: 30 },
    { number: 33, name: "الأحزاب", englishName: "Al-Ahzab", englishNameTranslation: "The Confederates", revelationType: "Medinan", verses: 73 },
    { number: 34, name: "سبأ", englishName: "Saba", englishNameTranslation: "Sheba", revelationType: "Meccan", verses: 54 },
    { number: 35, name: "فاطر", englishName: "Fatir", englishNameTranslation: "The Originator", revelationType: "Meccan", verses: 45 },
    { number: 36, name: "يس", englishName: "Ya-Sin", englishNameTranslation: "Ya Sin", revelationType: "Meccan", verses: 83 },
    { number: 37, name: "الصافات", englishName: "As-Saffat", englishNameTranslation: "Those Who Set The Ranks", revelationType: "Meccan", verses: 182 },
    { number: 38, name: "ص", englishName: "Sad", englishNameTranslation: "The Letter Sad", revelationType: "Meccan", verses: 88 },
    { number: 39, name: "الزمر", englishName: "Az-Zumar", englishNameTranslation: "The Troops", revelationType: "Meccan", verses: 75 },
    { number: 40, name: "غافر", englishName: "Ghafir", englishNameTranslation: "The Forgiver", revelationType: "Meccan", verses: 85 },
    { number: 41, name: "فصلت", englishName: "Fussilat", englishNameTranslation: "Explained in Detail", revelationType: "Meccan", verses: 54 },
    { number: 42, name: "الشورى", englishName: "Ash-Shuraa", englishNameTranslation: "The Consultation", revelationType: "Meccan", verses: 53 },
    { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", englishNameTranslation: "The Gold Adornments", revelationType: "Meccan", verses: 89 },
    { number: 44, name: "الدخان", englishName: "Ad-Dukhan", englishNameTranslation: "The Smoke", revelationType: "Meccan", verses: 59 },
    { number: 45, name: "الجاثية", englishName: "Al-Jathiyah", englishNameTranslation: "The Crouching", revelationType: "Meccan", verses: 37 },
    { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", englishNameTranslation: "The Sand-Hills", revelationType: "Meccan", verses: 35 },
    { number: 47, name: "محمد", englishName: "Muhammad", englishNameTranslation: "Muhammad", revelationType: "Medinan", verses: 38 },
    { number: 48, name: "الفتح", englishName: "Al-Fath", englishNameTranslation: "The Victory", revelationType: "Medinan", verses: 29 },
    { number: 49, name: "الحجرات", englishName: "Al-Hujurat", englishNameTranslation: "The Rooms", revelationType: "Medinan", verses: 18 },
    { number: 50, name: "ق", englishName: "Qaf", englishNameTranslation: "The Letter Qaf", revelationType: "Meccan", verses: 45 },
    { number: 51, name: "الذاريات", englishName: "Adh-Dhariyat", englishNameTranslation: "The Winnowing Winds", revelationType: "Meccan", verses: 60 },
    { number: 52, name: "الطور", englishName: "At-Tur", englishNameTranslation: "The Mount", revelationType: "Meccan", verses: 49 },
    { number: 53, name: "النجم", englishName: "An-Najm", englishNameTranslation: "The Star", revelationType: "Meccan", verses: 62 },
    { number: 54, name: "القمر", englishName: "Al-Qamar", englishNameTranslation: "The Moon", revelationType: "Meccan", verses: 55 },
    { number: 55, name: "الرحمن", englishName: "Ar-Rahman", englishNameTranslation: "The Beneficent", revelationType: "Medinan", verses: 78 },
    { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", englishNameTranslation: "The Inevitable", revelationType: "Meccan", verses: 96 },
    { number: 57, name: "الحديد", englishName: "Al-Hadid", englishNameTranslation: "The Iron", revelationType: "Medinan", verses: 29 },
    { number: 58, name: "المجادلة", englishName: "Al-Mujadila", englishNameTranslation: "The Pleading Woman", revelationType: "Medinan", verses: 22 },
    { number: 59, name: "الحشر", englishName: "Al-Hashr", englishNameTranslation: "The Exile", revelationType: "Medinan", verses: 24 },
    { number: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", englishNameTranslation: "She That Is To Be Examined", revelationType: "Medinan", verses: 13 },
    { number: 61, name: "الصف", englishName: "As-Saff", englishNameTranslation: "The Ranks", revelationType: "Medinan", verses: 14 },
    { number: 62, name: "الجمعة", englishName: "Al-Jumu'ah", englishNameTranslation: "The Congregation", revelationType: "Medinan", verses: 11 },
    { number: 63, name: "المنافقون", englishName: "Al-Munafiqun", englishNameTranslation: "The Hypocrites", revelationType: "Medinan", verses: 11 },
    { number: 64, name: "التغابن", englishName: "At-Taghabun", englishNameTranslation: "The Mutual Disillusion", revelationType: "Medinan", verses: 18 },
    { number: 65, name: "الطلاق", englishName: "At-Talaq", englishNameTranslation: "The Divorce", revelationType: "Medinan", verses: 12 },
    { number: 66, name: "التحريم", englishName: "At-Tahrim", englishNameTranslation: "The Prohibition", revelationType: "Medinan", verses: 12 },
    { number: 67, name: "الملك", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty", revelationType: "Meccan", verses: 30 },
    { number: 68, name: "القلم", englishName: "Al-Qalam", englishNameTranslation: "The Pen", revelationType: "Meccan", verses: 52 },
    { number: 69, name: "الحاقة", englishName: "Al-Haqqah", englishNameTranslation: "The Reality", revelationType: "Meccan", verses: 52 },
    { number: 70, name: "المعارج", englishName: "Al-Ma'arij", englishNameTranslation: "The Ascending Stairways", revelationType: "Meccan", verses: 44 },
    { number: 71, name: "نوح", englishName: "Nuh", englishNameTranslation: "Noah", revelationType: "Meccan", verses: 28 },
    { number: 72, name: "الجن", englishName: "Al-Jinn", englishNameTranslation: "The Jinn", revelationType: "Meccan", verses: 28 },
    { number: 73, name: "المزمل", englishName: "Al-Muzzammil", englishNameTranslation: "The Enshrouded One", revelationType: "Meccan", verses: 20 },
    { number: 74, name: "المدثر", englishName: "Al-Muddaththir", englishNameTranslation: "The Cloaked One", revelationType: "Meccan", verses: 56 },
    { number: 75, name: "القيامة", englishName: "Al-Qiyamah", englishNameTranslation: "The Resurrection", revelationType: "Meccan", verses: 40 },
    { number: 76, name: "الإنسان", englishName: "Al-Insan", englishNameTranslation: "Man", revelationType: "Medinan", verses: 31 },
    { number: 77, name: "المرسلات", englishName: "Al-Mursalat", englishNameTranslation: "The Emissaries", revelationType: "Meccan", verses: 50 },
    { number: 78, name: "النبأ", englishName: "An-Naba", englishNameTranslation: "The Tidings", revelationType: "Meccan", verses: 40 },
    { number: 79, name: "النازعات", englishName: "An-Nazi'at", englishNameTranslation: "Those Who Drag Forth", revelationType: "Meccan", verses: 46 },
    { number: 80, name: "عبس", englishName: "'Abasa", englishNameTranslation: "He Frowned", revelationType: "Meccan", verses: 42 },
    { number: 81, name: "التكوير", englishName: "At-Takwir", englishNameTranslation: "The Overthrowing", revelationType: "Meccan", verses: 29 },
    { number: 82, name: "الإنفطار", englishName: "Al-Infitar", englishNameTranslation: "The Cleaving", revelationType: "Meccan", verses: 19 },
    { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", englishNameTranslation: "The Defrauding", revelationType: "Meccan", verses: 36 },
    { number: 84, name: "الإنشقاق", englishName: "Al-Inshiqaq", englishNameTranslation: "The Rending Asunder", revelationType: "Meccan", verses: 25 },
    { number: 85, name: "البروج", englishName: "Al-Buruj", englishNameTranslation: "The Mansions of the Stars", revelationType: "Meccan", verses: 22 },
    { number: 86, name: "الطارق", englishName: "At-Tariq", englishNameTranslation: "The Nightcommer", revelationType: "Meccan", verses: 17 },
    { number: 87, name: "الأعلى", englishName: "Al-A'la", englishNameTranslation: "The Most High", revelationType: "Meccan", verses: 19 },
    { number: 88, name: "الغاشية", englishName: "Al-Ghashiyah", englishNameTranslation: "The Overwhelming", revelationType: "Meccan", verses: 26 },
    { number: 89, name: "الفجر", englishName: "Al-Fajr", englishNameTranslation: "The Dawn", revelationType: "Meccan", verses: 30 },
    { number: 90, name: "البلد", englishName: "Al-Balad", englishNameTranslation: "The City", revelationType: "Meccan", verses: 20 },
    { number: 91, name: "الشمس", englishName: "Ash-Shams", englishNameTranslation: "The Sun", revelationType: "Meccan", verses: 15 },
    { number: 92, name: "الليل", englishName: "Al-Layl", englishNameTranslation: "The Night", revelationType: "Meccan", verses: 21 },
    { number: 93, name: "الضحى", englishName: "Ad-Duhaa", englishNameTranslation: "The Morning Hours", revelationType: "Meccan", verses: 11 },
    { number: 94, name: "الشرح", englishName: "Ash-Sharh", englishNameTranslation: "The Consolation", revelationType: "Meccan", verses: 8 },
    { number: 95, name: "التين", englishName: "At-Tin", englishNameTranslation: "The Fig", revelationType: "Meccan", verses: 8 },
    { number: 96, name: "العلق", englishName: "Al-'Alaq", englishNameTranslation: "The Clot", revelationType: "Meccan", verses: 19 },
    { number: 97, name: "القدر", englishName: "Al-Qadr", englishNameTranslation: "The Power", revelationType: "Meccan", verses: 5 },
    { number: 98, name: "البينة", englishName: "Al-Bayyinah", englishNameTranslation: "The Clear Proof", revelationType: "Medinan", verses: 8 },
    { number: 99, name: "الزلزلة", englishName: "Az-Zalzalah", englishNameTranslation: "The Earthquake", revelationType: "Medinan", verses: 8 },
    { number: 100, name: "العاديات", englishName: "Al-'Adiyat", englishNameTranslation: "The Chargers", revelationType: "Meccan", verses: 11 },
    { number: 101, name: "القارعة", englishName: "Al-Qari'ah", englishNameTranslation: "The Striking Hour", revelationType: "Meccan", verses: 11 },
    { number: 102, name: "التكاثر", englishName: "At-Takathur", englishNameTranslation: "The Rivalry in Worldly Increase", revelationType: "Meccan", verses: 8 },
    { number: 103, name: "العصر", englishName: "Al-'Asr", englishNameTranslation: "The Declining Day", revelationType: "Meccan", verses: 3 },
    { number: 104, name: "الهمزة", englishName: "Al-Humazah", englishNameTranslation: "The Traducer", revelationType: "Meccan", verses: 9 },
    { number: 105, name: "الفيل", englishName: "Al-Fil", englishNameTranslation: "The Elephant", revelationType: "Meccan", verses: 5 },
    { number: 106, name: "قريش", englishName: "Quraysh", englishNameTranslation: "Quraysh", revelationType: "Meccan", verses: 4 },
    { number: 107, name: "الماعون", englishName: "Al-Ma'un", englishNameTranslation: "The Small Kindnesses", revelationType: "Meccan", verses: 7 },
    { number: 108, name: "الكوثر", englishName: "Al-Kawthar", englishNameTranslation: "The Abundance", revelationType: "Meccan", verses: 3 },
    { number: 109, name: "الكافرون", englishName: "Al-Kafirun", englishNameTranslation: "The Disbelievers", revelationType: "Meccan", verses: 6 },
    { number: 110, name: "النصر", englishName: "An-Nasr", englishNameTranslation: "The Divine Support", revelationType: "Medinan", verses: 3 },
    { number: 111, name: "المسد", englishName: "Al-Masad", englishNameTranslation: "The Palm Fiber", revelationType: "Meccan", verses: 5 },
    { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", englishNameTranslation: "The Sincerity", revelationType: "Meccan", verses: 4 },
    { number: 113, name: "الفلق", englishName: "Al-Falaq", englishNameTranslation: "The Daybreak", revelationType: "Meccan", verses: 5 },
    { number: 114, name: "الناس", englishName: "An-Nas", englishNameTranslation: "Mankind", revelationType: "Meccan", verses: 6 },
];

// Curated Hadiths
export const CURATED_HADITHS: Hadith[] = [
    {
        id: "bukhari-1",
        text: "Actions are but by intentions and every man shall have but that which he intended. So he whose migration was for Allah and His Messenger, his migration was for Allah and His Messenger. And he whose migration was for some worldly gain or a woman he might marry, his migration was for that for which he migrated.",
        narrator: "Umar ibn Al-Khattab",
        category: ["manners", "worship"],
        reference: "Sahih al-Bukhari 1, Sahih Muslim 1"
    },
    {
        id: "nawawi-1",
        text: "On the authority of Abu Hurayrah (may Allah be pleased with him) who said: The Messenger of Allah (peace and blessings of Allah be upon him) said: “Do not envy one another; do not outbid one another (with a view to raising the price of an article which you do not intend to buy); do not hate one another; do not turn your backs on one another; and do not enter into a transaction when others have entered into it; but be, O servants of Allah, brothers. A Muslim is the brother of a Muslim: he does not wrong him or abandon him, and he does not despise him. Piety is here”—and he pointed to his chest three times. “It is enough evil for a Muslim to despise his Muslim brother. All of a Muslim’s—his blood, his honor, and his property—is inviolable for another Muslim.”",
        narrator: "Abu Hurayrah",
        category: ["manners", "worship"],
        reference: "Muslim"
    },
    {
        id: "bukhari-2",
        text: "The Prophet (ﷺ) said, 'None of you will have faith until he loves for his brother what he loves for himself.'",
        narrator: "Anas ibn Malik",
        category: ["manners"],
        reference: "Sahih al-Bukhari 13, Sahih Muslim 45"
    },
    {
        id: "bukhari-3",
        text: "The Messenger of Allah (ﷺ) said: 'Indeed, Allah is Tayyib (good) and He does not accept anything but that which is Tayyib (good).'",
        narrator: "Abu Hurayrah",
        category: ["purity", "worship"],
        reference: "Sahih Muslim 1015"
    },
    {
        id: "tirmidhi-1",
        text: "The Prophet (ﷺ) said: 'Dua (supplication) is the very essence of worship.'",
        narrator: "Anas ibn Malik",
        category: ["worship"],
        reference: "Jami` at-Tirmidhi 3372"
    },
    {
        id: "bukhari-4",
        text: "The Prophet (ﷺ) said: 'When one of you wakes up from sleep and performs ablution, he should wash his nose three times by putting water in it and then blowing it out, because Satan stays in the upper part of his nose.'",
        narrator: "Abu Hurayrah",
        category: ["purity", "sleep"],
        reference: "Sahih al-Bukhari 3295"
    },
    {
        id: "nawawi-2",
        text: "The Prophet (ﷺ) said, 'None of you truly believes until his desires are in accordance with what I have brought.'",
        narrator: "Abdullah bin Amr",
        category: ["knowledge", "worship"],
        reference: "Nawawi's 40 Hadith"
    },
    {
        id: "bukhari-5",
        text: "Whoever says, 'Subhan Allah wa bihamdihi,' one hundred times a day, will have all his sins forgiven, even if they were as much as the foam of the sea.'",
        narrator: "Abu Hurayrah",
        category: ["forgiveness", "worship"],
        reference: "Sahih al-Bukhari 6405"
    }
];

// Translations
export const TRANSLATIONS: Record<Language, Translation> = {
    en: {
        app_title: "DeenLife",
        back_home: "Back to Home",
        tab_sunnah: "Sunnah Habits",
        tab_quran: "Quran Tracker",
        tab_audio: "Quran Audio",
        tab_hadith: "Hadith",
        tab_dua: "Duas",
        tab_prayers: "Prayer Times",
        tab_qibla: "Qibla Finder",
        select_language: "Select Language",
        close: "Close",

        // Sunnah Habits Tab
        wisdom_title: "Islamic Etiquettes & Wisdom",
        dua_sleeping: "Dua Before Sleeping",
        dua_sleeping_arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
        dua_sleeping_translit: "Bismika Rabbi wada'tu janbi, wa bika arfa'uh, fa in amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi 'ibadaka as-salihin.",
        dua_sleeping_meaning: "In Your Name, my Lord, I lay myself down; and in Your Name I rise. If You should take my soul, then have mercy on it; and if You should return it, then protect it with that by which You protect Your righteous servants.",
        dua_waking_up: "Dua Upon Waking Up",
        dua_waking_up_arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        dua_waking_up_translit: "Al-hamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
        dua_waking_up_meaning: "All praise is due to Allah, Who gave us life after death, and to Him is the resurrection.",

        // Quran Tracker Tab
        progress: "Your Progress",
        surahs_completed: "Surahs Completed",
        verses_recited: "Verses Recited",
        page: "Page",
        go: "Go",
        para: "Para",
        search_ayah: "Search Ayah...",
        ayah_search_no_results: "No results found for your search.",
        ayah_search_failed: "Failed to search for Ayah. Please try again.",
        popular_surahs: "Popular Surahs",
        surah_list_header: "All Surahs",
        search_surah: "Search Surah...",
        verses: "verses",
        read: "Read",
        of: "of",
        reader_load_error: "Failed to load page. Please try again.",
        network_error: "Network error. Check your connection.",
        previous_page: "Previous Page",
        next_page: "Next Page",
        try_again: "Try Again",

        // Quran Audio Tab
        reciter: "Reciter",
        quick_play: "Quick Play",
        playlist: "Full Surah Playlist",
        mini_player_title: "Quran Recitation",
        mini_player_reciter: "Reciter",

        // Hadith Tab
        hadith_collection: "Hadith Collection",
        search_hadith: "Search Hadith...",
        cat_all: "All",
        cat_favorites: "Favorites",
        cat_sleep: "Sleep",
        cat_prayer: "Prayer",
        cat_manners: "Manners",
        cat_knowledge: "Knowledge",
        cat_purity: "Purity",
        cat_forgiveness: "Forgiveness",
        cat_worship: "Worship",
        cat_dreams: "Dreams",
        source: "Source",
        loading: "Loading",
        add_favorite: "Add to Favorites",
        remove_favorite: "Remove from Favorites",
        mark_read: "Mark as Read",
        mark_unread: "Mark as Unread",
        copied: "Copied!",
        copy: "Copy",

        // Dua Tab
        dua_collection: "Dua Collection",
        search_dua: "Search Dua...",
        cat_morning_evening: "Morning & Evening",
        cat_protection: "Protection",
        cat_travel: "Travel",
        cat_daily_life: "Daily Life",
        cat_sleep_dua: "Sleep",
        cat_gratitude: "Gratitude",
        cat_guidance: "Guidance",
        cat_patience: "Patience",
        cat_success: "Success",
        cat_health: "Health",
        cat_rizq: "Sustenance",
        cat_family: "Family",
        cat_death: "Death & Grave",
        cat_repentance: "Repentance",
        explain_dua: "Explain Dua (AI)",
        dua_explanation_title: "Dua Explanation",
        explanation_loading: "Getting explanation...",
        explanation_error: "Failed to get explanation. Please try again.",
        gemini_api_not_selected: "Gemini API key not selected. Please select an API key to use AI features.",
        gemini_api_select_key: "Select API Key",
        gemini_api_billing_info: "You must select an API key from a paid GCP project. Learn more about billing: ai.google.dev/gemini-api/docs/billing",
        gemini_api_select_key_error: "Failed to open API key selector.",

        // Prayer Times Tab
        prayer_times_header: "Daily Prayer Times",
        location_status: "Location Status",
        enable_location: "Enable Location",
        fetching_location: "Fetching Location...",
        location_error: "Location Error:",
        location_granted: "Location Granted",
        location_not_supported: "Geolocation not supported by your browser.",
        next_prayer: "Next Prayer:",
        time_until: "Time until",
        tomorrow: "Tomorrow",
        fajr: "Fajr",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha",
        reminder_on: "On",
        reminder_off: "Off",
        notifications_not_supported: "This browser does not support desktop notifications.",
        prayer_time_notification_title: "Prayer Time!",
        prayer_time_notification_body: "It's time for prayer.",
        notification_permission_denied: "Notification permission denied.",
        notification_permission_blocked: "Notification permission is blocked. Please enable it in browser settings.",
        method: "Calculation Method",
        makkah_method: "Umm Al-Qura University, Makkah",

        // Qibla Finder Tab
        qibla_finder_header: "Qibla Finder",
        qibla_permission_denied: "Device motion permission is required to use the compass.",
        qibla_permission_error: "Error requesting device motion permission.",
        qibla_location_required: "Your location is required to calculate Qibla bearing.",
        device_orientation_not_supported: "Device orientation not supported on this device.",
        compass_error: "Compass Error:",
        grant_permission: "Grant Permission",
        activating_compass: "Activating Compass...",
        ensure_device_flat: "Ensure device is flat and away from magnets.",
        kaaba: "Kaaba",
        current_heading: "Current Heading",
        qibla_bearing: "Qibla Bearing",
        facing_qibla: "You are facing the Qibla!",
        align_device: "Align your device towards the Kaaba.",
    },
    ar: {
        app_title: "DeenLife",
        back_home: "العودة للصفحة الرئيسية",
        tab_sunnah: "عادات السنن",
        tab_quran: "تتبع القرآن",
        tab_audio: "صوت القرآن",
        tab_hadith: "الأحاديث",
        tab_dua: "الأدعية",
        tab_prayers: "أوقات الصلاة",
        tab_qibla: "محدد القبلة",
        select_language: "اختر اللغة",
        close: "إغلاق",

        // Sunnah Habits Tab
        wisdom_title: "الآداب والحكمة الإسلامية",
        dua_sleeping: "دعاء قبل النوم",
        dua_sleeping_arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
        dua_sleeping_translit: "Bismika Rabbi wada'tu janbi, wa bika arfa'uh, fa in amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi 'ibadaka as-salihin.",
        dua_sleeping_meaning: "باسمك ربي وضعت جنبي، وبك أرفعه، فإن أمسكت نفسي فارحمها، وإن أرسلتها فاحفظها بما تحفظ به عبادك الصالحين.",
        dua_waking_up: "دعاء الاستيقاظ",
        dua_waking_up_arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        dua_waking_up_translit: "Al-hamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
        dua_waking_up_meaning: "الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور.",

        // Quran Tracker Tab
        progress: "تقدمك",
        surahs_completed: "السور المكتملة",
        verses_recited: "الآيات المتلوة",
        page: "صفحة",
        go: "اذهب",
        para: "جزء",
        search_ayah: "ابحث عن آية...",
        ayah_search_no_results: "لا توجد نتائج لبحثك.",
        ayah_search_failed: "فشل البحث عن الآية. يرجى المحاولة مرة أخرى.",
        popular_surahs: "السور المشهورة",
        surah_list_header: "قائمة السور",
        search_surah: "ابحث عن سورة...",
        verses: "آية",
        read: "اقرأ",
        of: "من",
        reader_load_error: "فشل تحميل الصفحة. يرجى المحاولة مرة أخرى.",
        network_error: "خطأ في الشبكة. تحقق من اتصالك.",
        previous_page: "الصفحة السابقة",
        next_page: "الصفحة التالية",
        try_again: "حاول مرة أخرى",

        // Quran Audio Tab
        reciter: "القارئ",
        quick_play: "تشغيل سريع",
        playlist: "قائمة تشغيل السور كاملة",
        mini_player_title: "تلاوة القرآن",
        mini_player_reciter: "القارئ",

        // Hadith Tab
        hadith_collection: "مجموعة الأحاديث",
        search_hadith: "ابحث عن حديث...",
        cat_all: "الكل",
        cat_favorites: "المفضلة",
        cat_sleep: "النوم",
        cat_prayer: "الصلاة",
        cat_manners: "الآداب",
        cat_knowledge: "العلم",
        cat_purity: "الطهارة",
        cat_forgiveness: "المغفرة",
        cat_worship: "العبادة",
        cat_dreams: "الأحلام",
        source: "المصدر",
        loading: "جار التحميل",
        add_favorite: "أضف إلى المفضلة",
        remove_favorite: "إزالة من المفضلة",
        mark_read: "وضع علامة مقروء",
        mark_unread: "وضع علامة غير مقروء",
        copied: "تم النسخ!",
        copy: "نسخ",

        // Dua Tab
        dua_collection: "مجموعة الأدعية",
        search_dua: "ابحث عن دعاء...",
        cat_morning_evening: "الصباح والمساء",
        cat_protection: "الحماية",
        cat_travel: "السفر",
        cat_daily_life: "الحياة اليومية",
        cat_sleep_dua: "النوم",
        cat_gratitude: "الشكر",
        cat_guidance: "الهداية",
        cat_patience: "الصبر",
        cat_success: "النجاح",
        cat_health: "الصحة",
        cat_rizq: "الرزق",
        cat_family: "العائلة",
        cat_death: "الموت والقبر",
        cat_repentance: "التوبة",
        explain_dua: "شرح الدعاء (AI)",
        dua_explanation_title: "شرح الدعاء",
        explanation_loading: "جار الحصول على الشرح...",
        explanation_error: "فشل الحصول على الشرح. يرجى المحاولة مرة أخرى.",
        gemini_api_not_selected: "لم يتم تحديد مفتاح API لـ Gemini. يرجى تحديد مفتاح API لاستخدام ميزات الذكاء الاصطناعي.",
        gemini_api_select_key: "تحديد مفتاح API",
        gemini_api_billing_info: "يجب عليك اختيار مفتاح API من مشروع GCP مدفوع. تعرف على المزيد حول الفواتير: ai.google.dev/gemini-api/docs/billing",
        gemini_api_select_key_error: "فشل فتح محدد مفتاح API.",


        // Prayer Times Tab
        prayer_times_header: "أوقات الصلاة اليومية",
        location_status: "حالة الموقع",
        enable_location: "تمكين الموقع",
        fetching_location: "جلب الموقع...",
        location_error: "خطأ في الموقع:",
        location_granted: "تم منح الموقع",
        location_not_supported: "الموقع الجغرافي غير مدعوم من قبل متصفحك.",
        next_prayer: "الصلاة التالية:",
        time_until: "الوقت المتبقي",
        tomorrow: "غدًا",
        fajr: "الفجر",
        dhuhr: "الظهر",
        asr: "العصر",
        maghrib: "المغرب",
        isha: "العشاء",
        reminder_on: "تشغيل",
        reminder_off: "إيقاف",
        notifications_not_supported: "هذا المتصفح لا يدعم إشعارات سطح المكتب.",
        prayer_time_notification_title: "وقت الصلاة!",
        prayer_time_notification_body: "حان وقت الصلاة.",
        notification_permission_denied: "تم رفض إذن الإشعار.",
        notification_permission_blocked: "تم حظر إذن الإشعار. يرجى تمكينه في إعدادات المتصفح.",
        method: "طريقة الحساب",
        makkah_method: "جامعة أم القرى، مكة",

        // Qibla Finder Tab
        qibla_finder_header: "محدد القبلة",
        qibla_permission_denied: "مطلوب إذن حركة الجهاز لاستخدام البوصلة.",
        qibla_permission_error: "خطأ في طلب إذن حركة الجهاز.",
        qibla_location_required: "موقعك مطلوب لحساب اتجاه القبلة.",
        device_orientation_not_supported: "اتجاه الجهاز غير مدعوم على هذا الجهاز.",
        compass_error: "خطأ في البوصلة:",
        grant_permission: "منح الإذن",
        activating_compass: "تنشيط البوصلة...",
        ensure_device_flat: "تأكد من أن الجهاز مستوٍ وبعيد عن المغناطيس.",
        kaaba: "الكعبة",
        current_heading: "الاتجاه الحالي",
        qibla_bearing: "اتجاه القبلة",
        facing_qibla: "أنت تواجه القبلة!",
        align_device: "قم بمحاذاة جهازك نحو الكعبة.",
    },
    ur: {
        app_title: "DeenLife",
        back_home: "ہوم پر واپس جائیں",
        tab_sunnah: "سنت کی عادات",
        tab_quran: "قرآن ٹریکر",
        tab_audio: "قرآن آڈیو",
        tab_hadith: "حدیث",
        tab_dua: "دعائیں",
        tab_prayers: "نماز کے اوقات",
        tab_qibla: "قبلہ فائنڈر",
        select_language: "زبان منتخب کریں",
        close: "بند کریں",

        // Sunnah Habits Tab
        wisdom_title: "اسلامی آداب اور حکمت",
        dua_sleeping: "سونے سے پہلے کی دعا",
        dua_sleeping_arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
        dua_sleeping_translit: "Bismika Rabbi wada'tu janbi, wa bika arfa'uh, fa in amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi 'ibadaka as-salihin.",
        dua_sleeping_meaning: "اے میرے رب! تیرے نام سے میں نے اپنا پہلو رکھا، اور تیرے ہی نام سے اٹھاتا ہوں۔ اگر تو میری جان کو روک لے تو اس پر رحم فرما، اور اگر اسے بھیج دے تو اسے اس چیز سے بچا جس سے تو اپنے نیک بندوں کو بچاتا ہے۔",
        dua_waking_up: "جاگنے کی دعا",
        dua_waking_up_arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        dua_waking_up_translit: "Al-hamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
        dua_waking_up_meaning: "تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں موت کے بعد زندگی بخشی، اور اسی کی طرف لوٹنا ہے۔",

        // Quran Tracker Tab
        progress: "آپ کی پیش رفت",
        surahs_completed: "مکمل شدہ سورتیں",
        verses_recited: "تلاوت کی گئی آیات",
        page: "صفحہ",
        go: "جائیں",
        para: "پارہ",
        search_ayah: "آیت تلاش کریں...",
        ayah_search_no_results: "آپ کی تلاش کے لیے کوئی نتیجہ نہیں ملا۔",
        ayah_search_failed: "آیت تلاش کرنے میں ناکام رہا۔ براہ کرم دوبارہ کوشش کریں۔",
        popular_surahs: "مشہور سورتیں",
        surah_list_header: "سورتوں کی فہرست",
        search_surah: "سورت تلاش کریں...",
        verses: "آیات",
        read: "پڑھیں",
        of: "کا",
        reader_load_error: "صفحہ لوڈ کرنے میں ناکام رہا۔ براہ کرم دوبارہ کوشش کریں۔",
        network_error: "نیٹ ورک کی خرابی۔ کنکشن چیک کریں۔",
        previous_page: "پچھلا صفحہ",
        next_page: "اگلا صفحہ",
        try_again: "دوبارہ کوشش کریں",

        // Quran Audio Tab
        reciter: "قاری",
        quick_play: "فوری چلائیں",
        playlist: "مکمل سورت پلے لسٹ",
        mini_player_title: "قرآن کی تلاوت",
        mini_player_reciter: "قاری",

        // Hadith Tab
        hadith_collection: "احادیث کا مجموعہ",
        search_hadith: "حدیث تلاش کریں...",
        cat_all: "تمام",
        cat_favorites: "پسندیدہ",
        cat_sleep: "نیند",
        cat_prayer: "نماز",
        cat_manners: "آداب",
        cat_knowledge: "علم",
        cat_purity: "طہارت",
        cat_forgiveness: "مغفرت",
        cat_worship: "عبادت",
        cat_dreams: "خواب",
        source: "ماخذ",
        loading: "لوڈ ہو رہا ہے",
        add_favorite: "پسندیدہ میں شامل کریں",
        remove_favorite: "پسندیدہ سے ہٹائیں",
        mark_read: "پڑھا ہوا نشان لگائیں",
        mark_unread: "نہ پڑھا ہوا نشان لگائیں",
        copied: "کاپی ہو گیا!",
        copy: "کاپی کریں",

        // Dua Tab
        dua_collection: "دعا کا مجموعہ",
        search_dua: "دعا تلاش کریں...",
        cat_morning_evening: "صبح و شام",
        cat_protection: "حفاظت",
        cat_travel: "سفر",
        cat_daily_life: "روزمرہ کی زندگی",
        cat_sleep_dua: "نیند",
        cat_gratitude: "شکر",
        cat_guidance: "ہدایت",
        cat_patience: "صبر",
        cat_success: "کامیابی",
        cat_health: "صحت",
        cat_rizq: "رزق",
        cat_family: "خاندان",
        cat_death: "موت اور قبر",
        cat_repentance: "توبہ",
        explain_dua: "دعا کی وضاحت (AI)",
        dua_explanation_title: "دعا کی وضاحت",
        explanation_loading: "وضاحت حاصل کی جا رہی ہے...",
        explanation_error: "وضاحت حاصل کرنے میں ناکام رہا۔ براہ کرم دوبارہ کوشش کریں۔",
        gemini_api_not_selected: "جیمنی API کی کلید منتخب نہیں کی گئی ہے۔ AI خصوصیات استعمال کرنے کے لیے براہ کرم ایک API کلید منتخب کریں۔",
        gemini_api_select_key: "API کلید منتخب کریں",
        gemini_api_billing_info: "آپ کو ایک ادا شدہ GCP پروجیکٹ سے API کلید منتخب کرنا ہوگی۔ بلنگ کے بارے میں مزید جانیں: ai.google.dev/gemini-api/docs/billing",
        gemini_api_select_key_error: "API کی کلید سلیکٹر کھولنے میں ناکامی۔",

        // Prayer Times Tab
        prayer_times_header: "روزانہ نماز کے اوقات",
        location_status: "مقام کی حیثیت",
        enable_location: "مقام فعال کریں",
        fetching_location: "مقام حاصل کیا جا رہا ہے...",
        location_error: "مقام کی خرابی:",
        location_granted: "مقام منظور شدہ",
        location_not_supported: "آپ کا براؤزر جغرافیائی محل وقوع کو سپورٹ نہیں کرتا۔",
        next_prayer: "اگلی نماز:",
        time_until: "وقت باقی",
        tomorrow: "کل",
        fajr: "فجر",
        dhuhr: "ظہر",
        asr: "عصر",
        maghrib: "مغرب",
        isha: "عشاء",
        reminder_on: "آن",
        reminder_off: "آف",
        notifications_not_supported: "یہ براؤزر ڈیسک ٹاپ اطلاعات کو سپورٹ نہیں کرتا ہے۔",
        prayer_time_notification_title: "نماز کا وقت!",
        prayer_time_notification_body: "نماز کا وقت ہو گیا ہے۔",
        notification_permission_denied: "اطلاع کی اجازت سے انکار کیا گیا۔",
        notification_permission_blocked: "اطلاع کی اجازت بلاک ہے۔ براہ کرم براؤزر کی ترتیبات میں اسے فعال کریں۔",
        method: "حساب کا طریقہ",
        makkah_method: "ام القریٰ یونیورسٹی، مکہ",

        // Qibla Finder Tab
        qibla_finder_header: "قبلہ فائنڈر",
        qibla_permission_denied: "کمپاس استعمال کرنے کے لیے ڈیوائس موشن کی اجازت درکار ہے۔",
        qibla_permission_error: "ڈیوائس موشن کی اجازت کی درخواست کرنے میں خرابی۔",
        qibla_location_required: "قبلہ کی سمت کا حساب لگانے کے لیے آپ کا مقام درکار ہے۔",
        device_orientation_not_supported: "اس ڈیوائس پر ڈیوائس اورینٹیشن سپورٹ نہیں ہے۔",
        compass_error: "کمپاس کی خرابی:",
        grant_permission: "اجازت دیں",
        activating_compass: "کمپاس فعال ہو رہا ہے...",
        ensure_device_flat: "یقینی بنائیں کہ ڈیوائس فلیٹ ہے اور میگنےٹ سے دور ہے۔",
        kaaba: "کعبہ",
        current_heading: "موجودہ سمت",
        qibla_bearing: "قبلہ کی سمت",
        facing_qibla: "آپ قبلہ کی طرف رخ کر رہے ہیں!",
        align_device: "اپنی ڈیوائس کو کعبہ کی طرف سیدھا کریں۔",
    }
};


export const getHabits = (lang: Language): Habit[] => {
    const t = (key: string) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en'][key] || key;
    return [
        {
            title: t('salat_in_congregation') || "Pray Salat in Congregation",
            description: t('salat_in_congregation_desc') || "Perform all five daily prayers in congregation at the mosque.",
            icon: 0, // Droplets (Wudu) or similar
            color: "text-sky-400"
        },
        {
            title: t('read_quran_daily') || "Recite Quran Daily",
            description: t('read_quran_daily_desc') || "Allocate time each day to read and reflect on the Quran.",
            icon: 3, // BookOpen
            color: "text-green-400"
        },
        {
            title: t('dhikr_morning_evening') || "Dhikr Morning & Evening",
            description: t('dhikr_morning_evening_desc') || "Engage in remembrance of Allah (SWT) after Fajr and before Maghrib.",
            icon: 1, // Sparkles
            color: "text-purple-400"
        },
        {
            title: t('sleep_on_right_side') || "Sleep on Right Side",
            description: t('sleep_on_right_side_desc') || "Adopt the Sunnah of sleeping on your right side.",
            icon: 2, // Moon
            color: "text-indigo-400"
        },
        {
            title: t('fasting_mondays_thursdays') || "Fasting on Mondays & Thursdays",
            description: t('fasting_mondays_thursdays_desc') || "Observe voluntary fasting following the practice of the Prophet (PBUH).",
            icon: 4, // Sun
            color: "text-yellow-400"
        },
        {
            title: t('kindness_to_parents') || "Kindness to Parents",
            description: t('kindness_to_parents_desc') || "Treat your parents with utmost respect, love, and obedience.",
            icon: 7, // Heart
            color: "text-red-400"
        },
        {
            title: t('smile_often') || "Smile Often",
            description: t('smile_often_desc') || "Smiling is a charity and a Sunnah of the Prophet (PBUH).",
            icon: 5, // Eye
            color: "text-emerald-400"
        },
        {
            title: t('say_salam_frequently') || "Say Salam Frequently",
            description: t('say_salam_frequently_desc') || "Spread peace by greeting others with 'Assalamu Alaikum'.",
            icon: 6, // Shield
            color: "text-blue-400"
        }
    ];
};

export const getEtiquettes = (lang: Language): Etiquette[] => {
    const t = (key: string) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en'][key] || key;
    return [
        {
            title: t('etiquette_eating') || "Etiquette of Eating",
            benefit: t('etiquette_eating_desc') || "Start with Bismillah, eat with the right hand, and don't overeat. This brings barakah and health.",
            icon: 0, // Clock
            color: "text-yellow-400"
        },
        {
            title: t('etiquette_drinking') || "Etiquette of Drinking",
            benefit: t('etiquette_drinking_desc') || "Drink sitting down, in three sips, and say Alhamdulillah. It's healthier and more satisfying.",
            icon: 1, // Droplets
            color: "text-teal-400"
        },
        {
            title: t('etiquette_speaking') || "Etiquette of Speaking",
            benefit: t('etiquette_speaking_desc') || "Speak kindly, truthfully, and avoid backbiting. Good speech reflects strong faith.",
            icon: 3, // Feather
            color: "text-purple-400"
        },
        {
            title: t('etiquette_guests') || "Etiquette of Guests",
            benefit: t('etiquette_guests_desc') || "Be generous and welcoming to guests, as it is a sign of faith in Allah and the Last Day.",
            icon: 2, // HeartPulse
            color: "text-pink-400"
        },
        {
            title: t('etiquette_mosque') || "Etiquette of Mosque",
            benefit: t('etiquette_mosque_desc') || "Enter with the right foot, pray two rak'ahs, and maintain cleanliness. Respecting the mosque is respecting Allah's house.",
            icon: 5, // ShieldCheck
            color: "text-green-400"
        },
        {
            title: t('etiquette_sleeping') || "Etiquette of Sleeping",
            benefit: t('etiquette_sleeping_desc') || "Make wudu, recite duas, and sleep on your right side for peace and protection.",
            icon: 4, // Brain
            color: "text-indigo-400"
        }
    ];
};


export const getDuas = (lang: Language): Dua[] => {
    const t = (key: string) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en'][key] || key;
    return [
        // --- DAILY LIFE ---
        {
            id: "dua-1",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ.",
            transliteration: "Al-hamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
            english: "Praise is to Allah Who gives us life after He has caused us to die and to Him is the return.",
            reference: "Al-Bukhari",
            category: [t('cat_daily_life'), t('cat_sleep_dua'), t('cat_gratitude')]
        },
        {
            id: "dua-2",
            arabic: "الحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ.",
            transliteration: "Alhamdu lillahil-ladhi kasani hadha (ath-thawba) wa razaqanihi min ghayri hawlin minni wa la quwwah.",
            english: "Praise is to Allah Who has clothed me with this (garment) and provided it for me, though I was powerless myself and incapable.",
            reference: "Al-Bukhari",
            category: [t('cat_daily_life'), t('cat_gratitude')]
        },
        {
            id: "dua-3",
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا.",
            transliteration: "Allahumma inni as'aluka khayral-mawliji wa khayral-makhraji bismillahi walajna wa bismillahi kharajna wa 'alallahi rabbina tawakkalna.",
            english: "O Allah, I ask You for the best of entrance and the best of exit. In the Name of Allah we enter, and in the Name of Allah we leave, and upon Allah our Lord we rely.",
            reference: "Abu Dawud",
            category: [t('cat_daily_life'), t('cat_protection')]
        },
        {
            id: "dua-4",
            arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.",
            transliteration: "Bismillahi tawakkaltu 'alallahi, la hawla wa la quwwata illa billah.",
            english: "In the Name of Allah, I have placed my trust in Allah; there is no might and no power except by Allah.",
            reference: "Abu Dawud",
            category: [t('cat_daily_life'), t('cat_protection'), t('cat_travel')]
        },
        {
            id: "dua-5",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ.",
            transliteration: "Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith.",
            english: "O Allah, I seek protection in You from the male and female unclean spirits.",
            reference: "Al-Bukhari",
            category: [t('cat_daily_life'), t('cat_protection')]
        },
        {
            id: "dua-6",
            arabic: "غُفْرَانَكَ.",
            transliteration: "Ghufranak.",
            english: "I seek Your forgiveness.",
            reference: "At-Tirmidhi",
            category: [t('cat_daily_life'), t('cat_forgiveness')]
        },
        {
            id: "dua-7",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ.",
            transliteration: "Al-hamdu lillahil-ladhi at'amana wa saqana wa ja'alana muslimin.",
            english: "Praise be to Allah Who has fed us and given us drink and made us Muslims.",
            reference: "At-Tirmidhi",
            category: [t('cat_daily_life'), t('cat_gratitude')]
        },
        {
            id: "dua-8",
            arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَأَطْعِمْنَا خَيْرًا مِنْهُ.",
            transliteration: "Allahumma barik lana fihi wa at'imna khayran minhu.",
            english: "O Allah, bless us in it and provide us with better than it.",
            reference: "At-Tirmidhi",
            category: [t('cat_daily_life'), t('cat_rizq')]
        },
        {
            id: "dua-9",
            arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
            transliteration: "Asbahna wa asbahal-mulku lillahi wal-hamdu lillahi, la ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir.",
            english: "We have reached the morning and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.",
            reference: "Muslim",
            category: [t('cat_morning_evening'), t('cat_gratitude')]
        },
        {
            id: "dua-10",
            arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ.",
            transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan-nushur.",
            english: "O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.",
            reference: "At-Tirmidhi",
            category: [t('cat_morning_evening'), t('cat_daily_life')]
        },

        // --- PRAYER & MOSQUE ---
        {
            id: "dua-11",
            arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا.",
            transliteration: "Allahummaj'al fi qalbi nura, wa fi lisani nura, wa fi sam'i nura, wa fi basari nura.",
            english: "O Allah, place light in my heart, and on my tongue light, and in my ears light and in my sight light.",
            reference: "Muslim",
            category: [t('cat_prayer'), t('cat_guidance'), t('cat_purity')]
        },
        {
            id: "dua-12",
            arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ.",
            transliteration: "Allahummaftah li abwaba rahmatik.",
            english: "O Allah, open the gates of Your mercy for me.",
            reference: "Muslim",
            category: [t('cat_prayer'), t('cat_daily_life')]
        },
        {
            id: "dua-13",
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ.",
            transliteration: "Allahumma inni as'aluka min fadlik.",
            english: "O Allah, I ask You from Your favor.",
            reference: "Muslim",
            category: [t('cat_prayer'), t('cat_rizq')]
        },
        {
            id: "dua-14",
            arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ.",
            transliteration: "Subhana Rabbiyal-'Azim.",
            english: "Glory to my Lord the Exalted.",
            reference: "Muslim",
            category: [t('cat_prayer'), t('cat_worship')]
        },
        {
            id: "dua-15",
            arabic: "سُبْحَانَ رَبِّيَ الأَعْلَى.",
            transliteration: "Subhana Rabbiyal-A'la.",
            english: "Glory to my Lord the Most High.",
            reference: "Muslim",
            category: [t('cat_prayer'), t('cat_worship')]
        },
        {
            id: "dua-16",
            arabic: "رَبَّنَا وَلَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ.",
            transliteration: "Rabbana wa lakal-hamdu hamdan kathiran tayyiban mubarakan fih.",
            english: "Our Lord, praise is Yours, abundant, good and blessed praise.",
            reference: "Al-Bukhari",
            category: [t('cat_prayer'), t('cat_gratitude')]
        },
        {
            id: "dua-17",
            arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ.",
            transliteration: "Allahumma a'inni 'ala dhikrika, wa shukrika, wa husni 'ibadatik.",
            english: "O Allah, help me to remember You, to thank You, and to worship You in the best of manners.",
            reference: "Abu Dawud",
            category: [t('cat_prayer'), t('cat_worship'), t('cat_guidance')]
        },

        // --- TRAVEL & NATURE ---
        {
            id: "dua-18",
            arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ.",
            transliteration: "Subhanalladhi sakh-khara lana hadha wa ma kunna lahu muqrinin wa inna ila Rabbina lamunqalibun.",
            english: "Glory is to Him Who has subjected this to us, and we were not able to do it, and surely to our Lord we shall return.",
            reference: "Muslim",
            category: [t('cat_travel'), t('cat_gratitude')]
        },
        {
            id: "dua-19",
            arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا.",
            transliteration: "Allahumma sayyiban nafi'a.",
            english: "O Allah, (bring) beneficial rain.",
            reference: "Al-Bukhari",
            category: [t('cat_daily_life'), t('cat_rizq')]
        },
        {
            id: "dua-20",
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا، وَخَيْرَ مَا أُرْسِلَتْ بِهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا، وَشَرِّ مَا فِيهَا، وَشَرِّ مَا أُرْسِلَتْ بِهِ.",
            transliteration: "Allahumma inni as'aluka khayraha wa khayra ma fiha, wa khayra ma ursilat bihi, wa a'udhu bika min sharriha, wa sharri ma fiha, wa sharri ma ursilat bihi.",
            english: "O Allah, I ask You for the good of it, for the good of what it contains, and for the good of what is sent with it, and I seek refuge in You from the evil of it, from the evil of what it contains, and from the evil that is sent with it.",
            reference: "Muslim",
            category: [t('cat_daily_life'), t('cat_protection')]
        },

        // --- FASTING ---
        {
            id: "dua-21",
            arabic: "ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ.",
            transliteration: "Dhahabaz-zama'u wabtallatil-'uruqu wa thabatal-ajru in sha' Allah.",
            english: "The thirst is gone, the veins are moistened and the reward is confirmed, if Allah wills.",
            reference: "Abu Dawud",
            category: [t('cat_daily_life'), t('cat_worship')]
        },
        {
            id: "dua-22",
            arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ.",
            transliteration: "Allahumma inni laka sumtu wa 'ala rizqika aftartu.",
            english: "O Allah, I fasted for You and I break my fast with Your provision.",
            reference: "Abu Dawud (Weak but popular)",
            category: [t('cat_worship')]
        },

        // --- HAJJ & UMRAH ---
        {
            id: "dua-23",
            arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لاَ شَرِيكَ لَكَ.",
            transliteration: "Labbayk Allahumma labbayk, labbayka la sharika laka labbayk, innal-hamda wan-ni'mata laka wal-mulk la sharika lak.",
            english: "Here I am O Allah, here I am. There is no partner for You, here I am. Verily all praise and blessings are Yours, and all sovereignty, there is no partner for You.",
            reference: "Al-Bukhari",
            category: [t('cat_worship')]
        },
        {
            id: "dua-24",
            arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.",
            transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhaban-nar.",
            english: "Our Lord! Grant us good in this world and good in the Hereafter, and protect us from the torment of the Fire.",
            reference: "Al-Bukhari",
            category: [t('cat_worship'), t('cat_daily_life'), t('cat_success')]
        },

        // --- PROTECTION & DISTRESS ---
        {
            id: "dua-25",
            arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.",
            transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq.",
            english: "I seek refuge in the Perfect Words of Allah from the evil of what He has created.",
            reference: "Muslim",
            category: [t('cat_protection'), t('cat_morning_evening')]
        },
        {
            id: "dua-26",
            arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.",
            transliteration: "Bismillahi-lladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa huwas-Sami'ul-'Alim.",
            english: "In the Name of Allah with Whose Name there is protection against every kind of harm in the earth or in the heaven, and He is the All-Hearing and All-Knowing.",
            reference: "Abu Dawud",
            category: [t('cat_protection'), t('cat_morning_evening')]
        },
        {
            id: "dua-27",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ.",
            transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'id-dayni wa ghalabatir-rijal.",
            english: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
            reference: "Al-Bukhari",
            category: [t('cat_protection'), t('cat_daily_life')]
        },
        {
            id: "dua-28",
            arabic: "لاَ إِلَهَ إِلاَّ اللَّهُ الْعَظِيمُ الْحَلِيمُ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ السَّمَوَاتِ وَرَبُّ الأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ.",
            transliteration: "La ilaha illallahul-'Azimul-Halim, la ilaha illallahu Rabbul-'Arshil-'Azim, la ilaha illallahu Rabbus-samawati wa Rabbul-ardi wa Rabbul-'Arshil-Karim.",
            english: "There is no god but Allah, the Mighty, the Forbearing. There is no god but Allah, Lord of the Magnificent Throne. There is no god but Allah, Lord of the heavens and Lord of the earth, and Lord of the Noble Throne.",
            reference: "Al-Bukhari",
            category: [t('cat_protection'), t('cat_daily_life')]
        },

        // --- QURANIC DUAS (Replacing omitted block with real content) ---
        {
            id: "dua-200",
            arabic: "اللَّهُمَّ تَقَبَّلْ مِنَّا صَلاتَنَا وَصِيَامَنَا وَقِيَامَنَا وَرُكُوعَنَا وَسُجُودَنَا.",
            transliteration: "Allahumma taqabbal minna salatana wa siyamana wa qiyamana wa ruku'ana wa sujudana.",
            english: "O Allah, accept from us our prayers, our fasting, our standing, our bowing, and our prostration.",
            reference: "Common Usage",
            category: [t('cat_worship'), t('cat_success')]
        },
        {
            id: "dua-201",
            arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ.",
            transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana wa hab lana min ladunka rahmatan innaka Antal-Wahhab.",
            english: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.",
            reference: "Ali 'Imran 3:8",
            category: [t('cat_guidance'), t('cat_protection')]
        },
        {
            id: "dua-202",
            arabic: "رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي.",
            transliteration: "Rabbi inni zalamtu nafsi faghfir li.",
            english: "My Lord, indeed I have wronged myself, so forgive me.",
            reference: "Al-Qasas 28:16",
            category: [t('cat_forgiveness'), t('cat_repentance')]
        },
        {
            id: "dua-203",
            arabic: "رَبَّنَا آمَنَّا بِمَا أَنزَلْتَ وَاتَّبَعْنَا الرَّسُولَ فَاكْتُبْنَا مَعَ الشَّاهِدِينَ.",
            transliteration: "Rabbana amanna bima anzalta wattaba'nar-rasula faktubna ma'ash-shahidin.",
            english: "Our Lord, we have believed in what You revealed and have followed the messenger So register us among the witnesses [to truth].",
            reference: "Ali 'Imran 3:53",
            category: [t('cat_guidance'), t('cat_worship')]
        },
        {
            id: "dua-204",
            arabic: "رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ.",
            transliteration: "Rabbana ma khalaqta hadha batilan subhanaka faqina 'adhaban-nar.",
            english: "Our Lord, You did not create this aimlessly; exalted are You [above such a thing]; then protect us from the punishment of the Fire.",
            reference: "Ali 'Imran 3:191",
            category: [t('cat_protection'), t('cat_worship')]
        },
        {
            id: "dua-205",
            arabic: "رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الرَّاحِمِينَ.",
            transliteration: "Rabbana amanna faghfir lana warhamna wa anta khayrur-rahimin.",
            english: "Our Lord, we have believed, so forgive us and have mercy upon us, and You are the best of the merciful.",
            reference: "Al-Mu'minun 23:109",
            category: [t('cat_forgiveness'), t('cat_repentance')]
        },
        {
            id: "dua-206",
            arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ ۖ إِنَّ عَذَابَهَا كَانَ غَرَامًا.",
            transliteration: "Rabbanasrif 'anna 'adhaba jahannama inna 'adhabaha kana gharama.",
            english: "Our Lord, avert from us the punishment of Hell. Indeed, its punishment is ever adhering.",
            reference: "Al-Furqan 25:65",
            category: [t('cat_protection'), t('cat_death')]
        },
        {
            id: "dua-207",
            arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا.",
            transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama.",
            english: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us leaders for the righteous.",
            reference: "Al-Furqan 25:74",
            category: [t('cat_family'), t('cat_daily_life')]
        },
        {
            id: "dua-208",
            arabic: "رَبِّ هَبْ لِي حُكْمًا وَأَلْحِقْنِي بِالصَّالِحِينَ.",
            transliteration: "Rabbi hab li hukman wa alhiqni bis-salihin.",
            english: "My Lord, grant me authority and join me with the righteous.",
            reference: "Ash-Shu'ara 26:83",
            category: [t('cat_success'), t('cat_guidance')]
        },
        {
            id: "dua-209",
            arabic: "وَاجْعَل لِّي لِسَانَ صِدْقٍ فِي الْآخِرِينَ.",
            transliteration: "Waj'al li lisana sidqin fil-akhirin.",
            english: "And grant me a reputation of honor among later generations.",
            reference: "Ash-Shu'ara 26:84",
            category: [t('cat_success'), t('cat_daily_life')]
        },
        {
            id: "dua-210",
            arabic: "وَاجْعَلْنِي مِن وَرَثَةِ جَنَّةِ النَّعِيمِ.",
            transliteration: "Waj'alni min warathati jannatin-na'im.",
            english: "And place me among the inheritors of the Garden of Pleasure.",
            reference: "Ash-Shu'ara 26:85",
            category: [t('cat_success'), t('cat_death')]
        },
        {
            id: "dua-211",
            arabic: "رَبِّ نَجِّنِي وَأَهْلِي مِمَّا يَعْمَلُونَ.",
            transliteration: "Rabbi najjini wa ahli mimma ya'malun.",
            english: "My Lord, save me and my family from [the consequence of] what they do.",
            reference: "Ash-Shu'ara 26:169",
            category: [t('cat_family'), t('cat_protection')]
        },
        {
            id: "dua-212",
            arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ.",
            transliteration: "Rabbi awzi'ni an ashkura ni'matakal-lati an'amta 'alayya wa 'ala walidayya wa an a'mala salihan tardahu wa adkhilni bi-rahmatika fi 'ibadikas-salihin.",
            english: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve and admit me by Your mercy among Your righteous servants.",
            reference: "An-Naml 27:19",
            category: [t('cat_gratitude'), t('cat_family')]
        },
        {
            id: "dua-213",
            arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ.",
            transliteration: "Rabbi inni lima anzalta ilayya min khayrin faqir.",
            english: "My Lord, indeed I am, for whatever good You would send down to me, in need.",
            reference: "Al-Qasas 28:24",
            category: [t('cat_rizq'), t('cat_daily_life')]
        },
        {
            id: "dua-214",
            arabic: "رَبِّ انصُرْنِي عَلَى الْقَوْمِ الْمُفْسِدِينَ.",
            transliteration: "Rabbinsurni 'alal-qawmil-mufsidin.",
            english: "My Lord, support me against the corrupting people.",
            reference: "Al-Ankabut 29:30",
            category: [t('cat_protection'), t('cat_success')]
        },
        {
            id: "dua-215",
            arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ.",
            transliteration: "Rabbi hab li minas-salihin.",
            english: "My Lord, grant me [a child] from the righteous.",
            reference: "As-Saffat 37:100",
            category: [t('cat_family')]
        },
        {
            id: "dua-216",
            arabic: "رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْمًا فَاغْفِرْ لِلَّذِينَ تَابُوا وَاتَّبَعُوا سَبِيلَكَ وَقِهِمْ عَذَابَ الْجَحِيمِ.",
            transliteration: "Rabbana wasi'ta kulla shay'in rahmatan wa 'ilman faghfir lilladhina tabu wattaba'u sabilaka waqihim 'adhabal-jahim.",
            english: "Our Lord, You have encompassed all things in mercy and knowledge, so forgive those who have repented and followed Your way and protect them from the punishment of Hellfire.",
            reference: "Ghafir 40:7",
            category: [t('cat_forgiveness'), t('cat_protection')]
        },
        {
            id: "dua-217",
            arabic: "رَبَّنَا وَأَدْخِلْهُمْ جَنَّاتِ عَدْنٍ الَّتِي وَعَدتَّهُمْ وَمَن صَلَحَ مِنْ آبَائِهِمْ وَأَزْوَاجِهِمْ وَذُرِّيَّاتِهِمْ ۚ إِنَّكَ أَنتَ الْعَزِيزُ الْحَكِيمُ.",
            transliteration: "Rabbana wa adkhilhum jannati 'adninillati wa'adtahum wa man salaha min aba'ihim wa azwajihim wa dhurriyyatihim innaka Antal-'Azizul-Hakim.",
            english: "Our Lord, and admit them to gardens of perpetual residence which You have promised them and whoever was righteous among their fathers, their spouses and their offspring. Indeed, it is You who is the Exalted in Might, the Wise.",
            reference: "Ghafir 40:8",
            category: [t('cat_family'), t('cat_success')]
        },
        {
            id: "dua-218",
            arabic: "وَقِهِمُ السَّيِّئَاتِ ۚ وَمَن تَقِ السَّيِّئَاتِ يَوْمَئِذٍ فَقَدْ رَحِمْتَهُ ۚ وَذَٰلِكَ هُوَ الْفَوْزُ الْعَظِيمُ.",
            transliteration: "Waqihimus-sayyi'at wa man taqis-sayyi'ati yawma'idhin faqad rahimtahu wa dhalika huwal-fawzul-'azim.",
            english: "And protect them from the evil consequences [of their deeds]. And he whom You protect from evil consequences that Day - You will have given him mercy. And that is the great attainment.",
            reference: "Ghafir 40:9",
            category: [t('cat_protection'), t('cat_success')]
        },
        {
            id: "dua-219",
            arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي ۖ إِنِّي تُبْتُ إِلَيْكَ وَإِنِّي مِنَ الْمُسْلِمِينَ.",
            transliteration: "Rabbi awzi'ni an ashkura ni'matakal-lati an'amta 'alayya wa 'ala walidayya wa an a'mala salihan tardahu wa aslih li fi dhurriyyati inni tubtu ilayka wa inni minal-muslimin.",
            english: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve and make righteous for me my offspring. Indeed, I have turned to You, and indeed, I am of the Muslims.",
            reference: "Al-Ahqaf 46:15",
            category: [t('cat_gratitude'), t('cat_family')]
        },
        {
            id: "dua-220",
            arabic: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ.",
            transliteration: "Rabbana aghfir lana wa li-ikhwaninalladhina sabaquna bil-imani wa la taj'al fi qulubina ghillan lilladhina amanu rabbana innaka Ra'ufun Rahim.",
            english: "Our Lord, forgive us and our brothers who preceded us in faith and put not in our hearts [any] resentment toward those who have believed. Our Lord, indeed You are Kind and Merciful.",
            reference: "Al-Hashr 59:10",
            category: [t('cat_forgiveness'), t('cat_family')]
        },
        {
            id: "dua-221",
            arabic: "رَّبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ.",
            transliteration: "Rabbana 'alayka tawakkalna wa ilayka anabna wa ilaykal-masir.",
            english: "Our Lord, upon You we have relied, and to You we have returned, and to You is the destination.",
            reference: "Al-Mumtahanah 60:4",
            category: [t('cat_guidance'), t('cat_worship')]
        },
        {
            id: "dua-222",
            arabic: "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا ۖ إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ.",
            transliteration: "Rabbana atmim lana nurana waghfir lana innaka 'ala kulli shay'in qadir.",
            english: "Our Lord, perfect for us our light and forgive us. Indeed, You are over all things competent.",
            reference: "At-Tahrim 66:8",
            category: [t('cat_forgiveness'), t('cat_success')]
        },
        {
            id: "dua-223",
            arabic: "رَبِّ ابْنِ لِي عِندَكَ بَيْتًا فِي الْجَنَّةِ.",
            transliteration: "Rabbi ibni li 'indaka baytan fil-jannah.",
            english: "My Lord, build for me near You a house in Paradise.",
            reference: "At-Tahrim 66:11",
            category: [t('cat_success'), t('cat_death')]
        },
        {
            id: "dua-224",
            arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ وَلَا تَزِدِ الظَّالِمِينَ إِلَّا تَبَارًا.",
            transliteration: "Rabbighfir li wa li-walidayya wa liman dakhala baytiya mu'minan wa lil-mu'minina wal-mu'minati wa la tazidiz-zalimina illa tabara.",
            english: "My Lord, forgive me and my parents and whoever enters my house a believer and the believing men and believing women. And do not increase the wrongdoers except in destruction.",
            reference: "Nuh 71:28",
            category: [t('cat_forgiveness'), t('cat_family')]
        },
        {
            id: "dua-225",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ.",
            transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan.",
            english: "O Allah, I seek refuge in You from anxiety and sorrow.",
            reference: "Al-Bukhari",
            category: [t('cat_protection'), t('cat_daily_life')]
        },
        {
            id: "dua-226",
            arabic: "اللَّهُمَّ أَلْهِمْنِي رُشْدِي، وَأَعِذْنِي مِنْ شَرِّ نَفْسِي.",
            transliteration: "Allahumma alhimni rushdi, wa a'idhni min sharri nafsi.",
            english: "O Allah, inspire me with guidance and protect me from the evil of myself.",
            reference: "At-Tirmidhi",
            category: [t('cat_guidance'), t('cat_protection')]
        },
        {
            id: "dua-227",
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى، وَالتُّقَى، وَالْعَفَافَ، وَالْغِنَى.",
            transliteration: "Allahumma inni as'alukal-huda, wat-tuqa, wal-'afafa, wal-ghina.",
            english: "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.",
            reference: "Muslim",
            category: [t('cat_guidance'), t('cat_daily_life')]
        },
        {
            id: "dua-228",
            arabic: "اللَّهُمَّ اغْفِرْ لِي خَطِيئَتِي وَجَهْلِي وَإِسْرَافِي فِي أَمْرِي وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي.",
            transliteration: "Allahummaghfir li khati'ati wa jahli wa israfi fi amri wa ma Anta a'lamu bihi minni.",
            english: "O Allah, forgive my errors, my ignorance, and my excess in my affairs, and what You know better than I.",
            reference: "Al-Bukhari",
            category: [t('cat_forgiveness'), t('cat_repentance')]
        },
        {
            id: "dua-229",
            arabic: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ، وَارْحَمْنِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ.",
            transliteration: "Allahumma inni zalamtu nafsi zulman kathiran, wa la yaghfirudh-dhunuba illa Ant, faghfir li maghfiratan min 'indik, warhamni, innaka Antal-Ghafurur-Rahim.",
            english: "O Allah, I have wronged myself greatly, and no one forgives sins except You, so grant me forgiveness from You and have mercy on me, You are the Forgiving, the Merciful.",
            reference: "Al-Bukhari",
            category: [t('cat_forgiveness'), t('cat_repentance')]
        },
        {
            id: "dua-230",
            arabic: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ.",
            transliteration: "Allahumma ba'id bayni wa bayna khatayaya kama ba'adta baynal-mashriqi wal-maghrib, Allahumma naqqini min khatayaya kama yunaqqath-thawbul-abyadu minad-danas, Allahummaghsilni min khatayaya bith-thalji wal-ma'i wal-barad.",
            english: "O Allah, distance me from my sins as You have distanced the East from the West. O Allah, purify me from my sins as a white garment is purified from dirt. O Allah, wash me from my sins with snow, water, and hail.",
            reference: "Al-Bukhari",
            category: [t('cat_forgiveness'), t('cat_purity')]
        },
        {
            id: "dua-231",
            arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ.",
            transliteration: "Astaghfirullahal-'Azimal-ladhi la ilaha illa Huwal-Hayyul-Qayyumu wa atubu ilayh.",
            english: "I seek forgiveness from Allah, the Magnificent, whom there is no god but He, the Living, the Sustainer, and I repent to Him.",
            reference: "At-Tirmidhi",
            category: [t('cat_forgiveness'), t('cat_repentance')]
        },
        {
            id: "dua-232",
            arabic: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.",
            transliteration: "Allahumma Anta Rabbi la ilaha illa Ant, khalaqtani wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika mastata't, a'udhu bika min sharri ma sana't, abu'u laka bini'matika 'alayya, wa abu'u laka bidhanbi faghfir li, fa'innahu la yaghfirudh-dhunuba illa Ant.",
            english: "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I am faithful to Your covenant and Your promise as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge before You Your favor upon me and I acknowledge to You my sin, so forgive me, for indeed, no one forgives sins except You.",
            reference: "Al-Bukhari",
            category: [t('cat_forgiveness'), t('cat_repentance')]
        },
        {
            id: "dua-233",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْهَرَمِ، وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ.",
            transliteration: "Allahumma inni a'udhu bika minal-'ajzi wal-kasal, wal-jubni wal-haram, wal-bukhl, wa a'udhu bika min 'adhabil-qabr, wa min fitnatil-mahya wal-mamat.",
            english: "O Allah, I seek refuge in You from incapacity, laziness, cowardice, old age, and miserliness, and I seek refuge in You from the punishment of the grave and from the trials of life and death.",
            reference: "Al-Bukhari",
            category: [t('cat_protection'), t('cat_daily_life')]
        },
        {
            id: "dua-234",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلاَءِ، وَدَرَكِ الشَّقَاءِ، وَسُوءِ الْقَضَاءِ، وَشَمَاتَةِ الأَعْدَاءِ.",
            transliteration: "Allahumma inni a'udhu bika min jahdil-bala', wa darakish-shaqa', wa su'il-qada', wa shamatatil-a'da'.",
            english: "O Allah, I seek refuge in You from the difficulty of affliction, from the realization of misery, from a bad decree, and from the malicious joy of enemies.",
            reference: "Al-Bukhari",
            category: [t('cat_protection'), t('cat_success')]
        },
        {
            id: "dua-235",
            arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي، وَاجْعَلِ الْحَيَاةَ زِيَادَةً لِي فِي كُلِّ خَيْرٍ، وَاجْعَلِ الْمَوْتَ رَاحَةً لِي مِنْ كُلِّ شَرٍّ.",
            transliteration: "Allahumma aslih li diniyal-ladhi huwa 'ismatu amri, wa aslih li dunyaya allati fiha ma'ashi, wa aslih li akhiratiyallati fiha ma'adi, waj'alil-hayata ziyadatan li fi kulli khayr, waj'alil-mawta rahatan li min kulli sharr.",
            english: "O Allah, correct my religion for me which is the safeguard of my affairs, and correct my worldly life for me in which is my livelihood, and correct my Hereafter for me in which is my return, and make life an increase for me in every good, and make death a relief for me from every evil.",
            reference: "Muslim",
            category: [t('cat_daily_life'), t('cat_guidance'), t('cat_death')]
        },
        {
            id: "dua-236",
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى.",
            transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina.",
            english: "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.",
            reference: "Muslim",
            category: [t('cat_guidance'), t('cat_daily_life')]
        },
        {
            id: "dua-237",
            arabic: "اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا، وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا، أَنْتَ وَلِيُّهَا وَمَوْلاَهَا.",
            transliteration: "Allahumma ati nafsi taqwaha, wa zakkiha Anta khayru man zakkaha, Anta waliyyuha wa mawlaha.",
            english: "O Allah, grant my soul its piety and purify it, You are the Best to purify it, You are its Guardian and Master.",
            reference: "Muslim",
            category: [t('cat_guidance'), t('cat_purity')]
        },
        {
            id: "dua-238",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ، وَتَحَوُّلِ عَافِيَتِكَ، وَفُجَاءَةِ نِقْمَتِكَ، وَجَمِيعِ سَخَطِكَ.",
            transliteration: "Allahumma inni a'udhu bika min zawali ni'matik, wa tahawwuli 'afiyatik, wa fuja'ati niqmatik, wa jami'i sakhatik.",
            english: "O Allah, I seek refuge in You from the decline of Your favor, the change in Your granting of well-being, sudden vengeance from You, and all of Your displeasure.",
            reference: "Muslim",
            category: [t('cat_protection'), t('cat_gratitude')]
        },
        {
            id: "dua-239",
            arabic: "اللَّهُمَّ اغْفِرْ لِي، وَارْحَمْنِي، وَاهْدِنِي، وَعَافِنِي، وَارْزُقْنِي.",
            transliteration: "Allahummaghfir li, warhamni, wahdini, wa 'afini, warzuqni.",
            english: "O Allah, forgive me, have mercy on me, guide me, heal me, and provide for me.",
            reference: "Muslim",
            category: [t('cat_forgiveness'), t('cat_health'), t('cat_rizq')]
        },
        {
            id: "dua-240",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا عَمِلْتُ، وَمِنْ شَرِّ مَا لَمْ أَعْمَلْ.",
            transliteration: "Allahumma inni a'udhu bika min sharri ma 'amiltu, wa min sharri ma lam a'mal.",
            english: "O Allah, I seek refuge in You from the evil of what I have done and from the evil of what is not done.",
            reference: "Muslim",
            category: [t('cat_protection'), t('cat_forgiveness')]
        },
        {
            id: "dua-241",
            arabic: "اللَّهُمَّ أَكْثِرْ مَالِي، وَوَلَدِي، وَبَارِكْ لِي فِيمَا أَعْطَيْتَنِي.",
            transliteration: "Allahumma akthir mali, wa waladi, wa barik li fima a'taytani.",
            english: "O Allah, increase my wealth and my children, and bless me in what You have given me.",
            reference: "Al-Bukhari",
            category: [t('cat_rizq'), t('cat_family'), t('cat_success')]
        },
        {
            id: "dua-242",
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ يَا اللَّهُ بِأَنَّكَ الْوَاحِدُ الأَحَدُ الصَّمَدُ الَّذِي لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ، أَنْ تَغْفِرَ لِي ذُنُوبِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ.",
            transliteration: "Allahumma inni as'aluka ya Allahu bi'annakal-Wahidul-Ahadus-Samad, alladhi lam yalid wa lam yulad, wa lam yakun lahu kufuwan ahad, an taghfira li dhunubi, innaka Antal-Ghafurur-Rahim.",
            english: "O Allah, I ask You, O Allah, as You are the One, the Only, the Self-Sufficient Master, who begets not nor was He begotten, and there is none co-equal or comparable to Him, to forgive me my sins, indeed You are the Forgiving, the Merciful.",
            reference: "An-Nasa'i",
            category: [t('cat_forgiveness'), t('cat_worship')]
        },
        {
            id: "dua-243",
            arabic: "لاَ إِلَهَ إِلاَّ أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ.",
            transliteration: "La ilaha illa Anta subhanaka inni kuntu minaz-zalimin.",
            english: "There is no god but You, glory to You, indeed I was among the wrongdoers.",
            reference: "At-Tirmidhi",
            category: [t('cat_forgiveness'), t('cat_protection')]
        },
        {
            id: "dua-244",
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنَّ لَكَ الْحَمْدَ، لاَ إِلَهَ إِلاَّ أَنْتَ، وَحْدَكَ لاَ شَرِيكَ لَكَ، الْمَنَّانُ، يَا بَدِيعَ السَّمَاوَاتِ وَالأَرْضِ، يَا ذَا الْجَلاَلِ وَالإِكْرَامِ، يَا حَيُّ يَا قَيُّومُ، إِنِّي أَسْأَلُكَ الْجَنَّةَ، وَأَعُوذُ بِكَ مِنَ النَّارِ.",
            transliteration: "Allahumma inni as'aluka bi'anna lakal-hamd, la ilaha illa Ant, wahdaka la sharika lak, Al-Mannan, ya Badi'as-samawati wal-ard, ya Dhal-Jalali wal-Ikram, ya Hayyu ya Qayyum, inni as'alukal-jannah, wa a'udhu bika minan-nar.",
            english: "O Allah, I ask You by virtue of the fact that all praise is due to You, there is no god but You, You alone have no partner, the Bestower, O Originator of the heavens and the earth, O Possessor of Majesty and Honor, O Ever-Living, O Sustainer, I ask You for Paradise, and I seek refuge in You from the Fire.",
            reference: "Abu Dawud",
            category: [t('cat_worship'), t('cat_success'), t('cat_protection')]
        },
        {
            id: "dua-245",
            arabic: "اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ.",
            transliteration: "Allahummakfini bihalalika 'an haramik, wa aghnini bifadlika 'amman siwak.",
            english: "O Allah, suffice me with Your lawful against Your prohibited, and make me independent of all those besides You by Your favor.",
            reference: "At-Tirmidhi",
            category: [t('cat_rizq'), t('cat_protection')]
        },
        {
            id: "dua-246",
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلاً مُتَقَبَّلاً.",
            transliteration: "Allahumma inni as'aluka 'ilman nafi'a, wa rizqan tayyiba, wa 'amalan mutaqabbala.",
            english: "O Allah, I ask You for beneficial knowledge, goodly provision, and acceptable deeds.",
            reference: "Ibn Majah",
            category: [t('cat_knowledge'), t('cat_rizq'), t('cat_success')]
        },
        {
            id: "dua-247",
            arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ.",
            transliteration: "Astaghfirullaha wa atubu ilayh.",
            english: "I seek forgiveness from Allah and I repent to Him.",
            reference: "Al-Bukhari",
            category: [t('cat_forgiveness'), t('cat_repentance')]
        },
        {
            id: "dua-248",
            arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ، وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ، وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.",
            transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin kama sallayta 'ala Ibrahima wa 'ala ali Ibrahima innaka Hamidun Majid. Allahumma barik 'ala Muhammadin wa 'ala ali Muhammadin kama barakta 'ala Ibrahima wa 'ala ali Ibrahima innaka Hamidun Majid.",
            english: "O Allah, bestow Your favor on Muhammad and on the family of Muhammad as You have bestowed Your favor on Ibrahim and on the family of Ibrahim, You are Praiseworthy, Most Glorious. O Allah, bless Muhammad and the family of Muhammad as You have blessed Ibrahim and the family of Ibrahim, You are Praiseworthy, Most Glorious.",
            reference: "Al-Bukhari",
            category: [t('cat_worship'), t('cat_prayer')]
        },
        {
            id: "dua-249",
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ.",
            transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirah.",
            english: "O Allah, I ask You for pardon and well-being in this world and the Hereafter.",
            reference: "Ibn Majah",
            category: [t('cat_health'), t('cat_protection'), t('cat_daily_life')]
        },
        {
            id: "dua-250",
            arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ.",
            transliteration: "Ya Muqallibal-qulubi thabbit qalbi 'ala dinik.",
            english: "O Changer of the hearts, make my heart firm upon Your religion.",
            reference: "At-Tirmidhi",
            category: [t('cat_guidance'), t('cat_faith'), t('cat_daily_life')]
        }
    ];
};

export const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'ur', name: 'اردو' },
];
