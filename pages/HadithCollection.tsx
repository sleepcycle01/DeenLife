
import React, { useState, useMemo, useEffect } from 'react';
import { ScrollText, BookOpen, Quote, ChevronLeft, ChevronRight, Search, ArrowLeft, Copy, Check, Share2, Grid, Languages, Loader2, Globe, Heart as HeartIcon } from 'lucide-react';
import { translateText } from '../services/geminiService';
import { getFavoriteHadiths, saveFavoriteHadiths } from '../services/storageService';
import { FavoriteHadith } from '../types';

const CATEGORIES = [
  { id: 'intentions', title: 'Intentions' },
  { id: 'character', title: 'Good Character' },
  { id: 'prayer', title: 'Prayer (Salah)' },
  { id: 'charity', title: 'Charity (Sadaqah)' },
  { id: 'patience', title: 'Patience (Sabr)' },
  { id: 'knowledge', title: 'Knowledge' },
  { id: 'truthfulness', title: 'Truthfulness' },
  { id: 'parents', title: 'Parents' },
  { id: 'neighbours', title: 'Neighbours' },
  { id: 'forgiveness', title: 'Forgiveness' },
  { id: 'mercy', title: 'Mercy' },
  { id: 'justice', title: 'Justice' },
  { id: 'health', title: 'Health' },
  { id: 'death', title: 'Remembering Death' },
  { id: 'paradise', title: 'Paradise (Jannah)' },
  { id: 'hellfire', title: 'Hellfire (Jahannam)' },
  { id: 'fasting', title: 'Fasting (Sawm)' },
  { id: 'hajj', title: 'Hajj & Umrah' },
  { id: 'zakat', title: 'Zakat' },
  { id: 'marriage', title: 'Marriage' },
  { id: 'family', title: 'Family Ties' },
  { id: 'friendship', title: 'Friendship' },
  { id: 'cleanliness', title: 'Cleanliness' },
  { id: 'modesty', title: 'Modesty (Haya)' },
  { id: 'gratitude', title: 'Gratitude (Shukr)' },
  { id: 'tawakkul', title: 'Trust in Allah' },
  { id: 'quran', title: 'Quran' },
  { id: 'prophethood', title: 'Prophethood' },
  { id: 'angels', title: 'Angels' },
  { id: 'judgment', title: 'Day of Judgment' },
  { id: 'dua', title: 'Supplication (Dua)' },
  { id: 'dhikr', title: 'Remembrance (Dhikr)' },
  { id: 'repentance', title: 'Repentance (Tawbah)' },
  { id: 'sincerity', title: 'Sincerity (Ikhlas)' },
  { id: 'humility', title: 'Humility' },
  { id: 'generosity', title: 'Generosity' },
  { id: 'backbiting', title: 'Backbiting (Gheebah)' },
  { id: 'anger', title: 'Anger Control' },
  { id: 'sick', title: 'Visiting the Sick' },
  { id: 'orphans', title: 'Caring for Orphans' },
  { id: 'animals', title: 'Kindness to Animals' },
  { id: 'business', title: 'Business & Trade' },
  { id: 'leadership', title: 'Leadership' },
  { id: 'unity', title: 'Unity' },
  { id: 'peace', title: 'Peace' },
  { id: 'brotherhood', title: 'Brotherhood' },
  { id: 'women', title: 'Women in Islam' },
  { id: 'children', title: 'Raising Children' },
  { id: 'guest', title: 'Honoring Guests' },
  { id: 'travel', title: 'Travel Etiquette' },
];

const LANGUAGES = [
  'English', 'Urdu', 'Indonesian', 'Turkish', 'French', 'Spanish', 
  'Hindi', 'Bengali', 'Russian', 'German', 'Malay', 'Chinese', 'Persian'
];

const SEED_HADITHS: Record<string, { text: string; source: string; arabic: string }[]> = {
  intentions: [
    { text: "Actions are judged by intentions, so each man will have what he intended.", source: "Sahih Bukhari & Muslim", arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى" },
    { text: "Allah does not look at your figures, nor at your attire but He looks at your hearts and accomplishments.", source: "Sahih Muslim", arabic: "إِنَّ اللهَ لا يَنْظُرُ إِلى أَجْسامِكْم، وَلا إِلى صُوَرِكُمْ، وَلَكِنْ يَنْظُرُ إِلى قُلُوبِكُمْ" },
  ],
  character: [
    { text: "The best among you are those who have the best manners and character.", source: "Sahih Bukhari", arabic: "إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلَاقًا" },
    { text: "Nothing is heavier on the Scale of the Believer on the Day of Resurrection than good character.", source: "Tirmidhi", arabic: "مَا مِنْ شَيْءٍ أَثْقَلُ فِي مِيزَانِ الْمُؤْمِنِ يَوْمَ الْقِيَامَةِ مِنْ حُسْنِ الْخُلُقِ" },
  ],
  prayer: [
    { text: "The first thing for which a person will be brought to account on the Day of Resurrection will be his prayer.", source: "Sunan al-Tirmidhi", arabic: "إِنَّ أَوَّلَ مَا يُحَاسَبُ بِهِ الْعَبْدُ يَوْمَ الْقِيَامَةِ مِنْ عَمَلِهِ صَلَاتُهُ" },
    { text: "Between a man and shirk and kufr there stands his neglect of the prayer.", source: "Sahih Muslim", arabic: "إِنَّ بَيْنَ الرَّجُلِ وَبَيْنَ الشِّرْكِ وَالْكُفْرِ تَرْكُ الصَّلَاةِ" },
  ],
  charity: [
    { text: "Charity does not decrease wealth.", source: "Sahih Muslim", arabic: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ" },
    { text: "Save yourself from Hell-fire even by giving half a date-fruit in charity.", source: "Sahih Bukhari", arabic: "اتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ" },
  ],
  patience: [
    { text: "No fatigue, nor disease, nor sorrow, nor sadness, nor hurt, nor distress befalls a Muslim, even if it were the prick he receives from a thorn, but that Allah expiates some of his sins for that.", source: "Sahih Bukhari", arabic: "مَا يُصِيبُ الْمُسْلِمَ مِنْ نَصَبٍ وَلَا وَصَبٍ وَلَا هَمٍّ وَلَا حُزْنٍ وَلَا أَذًى وَلَا غَمٍّ حَتَّى الشَّوْكَةِ يُشَاكُهَا إِلَّا كَفَّرَ اللَّهُ بِهَا مِنْ خَطَايَاهُ" },
    { text: "Real patience is at the first stroke of a calamity.", source: "Sahih Bukhari", arabic: "إِنَّمَا الصَّبْرُ عِنْدَ الصَّدْمَةِ الْأُولَى" },
  ],
  knowledge: [
    { text: "Seeking knowledge is a duty upon every Muslim.", source: "Sunan Ibn Majah", arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ" },
    { text: "Whoever follows a path in the pursuit of knowledge, Allah will make easy for him a path to Paradise.", source: "Sahih Muslim", arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ" },
  ],
  truthfulness: [
    { text: "Truthfulness leads to righteousness, and righteousness leads to Paradise.", source: "Sahih Bukhari", arabic: "إِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ" },
  ],
  parents: [
    { text: "Paradise lies beneath the feet of your mother.", source: "Sunan An-Nasa'i", arabic: "الْجَنَّةُ تَحْتَ أَقْدَامِ الْأُمَّهَاتِ" },
    { text: "The pleasure of the Lord lies in the pleasure of the parent.", source: "Tirmidhi", arabic: "رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ وَسَخَطُ الرَّبِّ فِي سَخَطِ الْوَالِدِ" },
  ],
  neighbours: [
    { text: "He is not a believer whose stomach is filled while the neighbor to his side goes hungry.", source: "Al-Adab Al-Mufrad", arabic: "لَيْسَ الْمُؤْمِنُ الَّذِي يَشْبَعُ وَجَارُهُ جَائِعٌ إِلَى جَنْبِهِ" },
    { text: "Gabriel continued to recommend me about treating the neighbors so kindly and politely that I thought he would order me to make them as my heirs.", source: "Sahih Bukhari", arabic: "مَا زَالَ جِبْرِيلُ يُوصِينِي بِالْجَارِ حَتَّى ظَنَنْتُ أَنَّهُ سَيُوَرِّثُهُ" },
  ],
  forgiveness: [
    { text: "Whoever does not show mercy will not be shown mercy.", source: "Sahih Bukhari", arabic: "مَنْ لَا يَرْحَمُ لَا يُرْحَمُ" },
    { text: "Be merciful to others and you will receive mercy. Forgive others and Allah will forgive you.", source: "Musnad Ahmad", arabic: "ارْحَمُوا تُرْحَمُوا وَاغْفِرُوا يَغْفِرُ اللَّهُ لَكُمْ" },
  ],
  mercy: [
    { text: "The Merciful One shows mercy to those who are merciful. Show mercy to those on earth, and the One in the heavens will show mercy to you.", source: "Tirmidhi", arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ" },
  ],
  justice: [
    { text: "Allah commands justice, the doing of good, and liberality to kith and kin.", source: "Quran 16:90", arabic: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَى" },
    { text: "Beware of the supplication of the oppressed, for there is no barrier between it and Allah.", source: "Sahih Bukhari", arabic: "اتَّقِ دَعْوَةَ الْمَظْلُومِ فَإِنَّهُ لَيْسَ بَيْنَهُ وَبَيْنَ اللَّهِ حِجَابٌ" },
  ],
  health: [
    { text: "There are two blessings which many people lose: (They are) health and free time for doing good.", source: "Sahih Bukhari", arabic: "نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ الصِّحَّةُ وَالْفَرَاغُ" },
  ],
  death: [
    { text: "Remember often the destroyer of pleasures (death).", source: "Tirmidhi", arabic: "أَكْثِرُوا ذِكْرَ هَاذِمِ اللَّذَّاتِ" },
  ],
  paradise: [
    { text: "In Paradise there are things which no eye has seen, no ear has heard, and no human mind has perceived.", source: "Sahih Bukhari", arabic: "فِيهَا مَا لَا عَيْنٌ رَأَتْ وَلَا أُذُنٌ سَمِعَتْ وَلَا خَطَرَ عَلَى قَلْبِ بَشَرٍ" },
  ],
  hellfire: [
    { text: "The Hell Fire is surrounded by all kinds of desires and passions, while Paradise is surrounded by all kinds of disliked undesirable things.", source: "Sahih Bukhari", arabic: "حُفَّتِ النَّارُ بِالشَّهَوَاتِ وَحُفَّتِ الْجَنَّةُ بِالْمَكَارِهِ" },
  ],
  fasting: [
    { text: "Fasting is a shield.", source: "Sahih Muslim", arabic: "الصِّيَامُ جُنَّةٌ" },
    { text: "Whoever fasts Ramadan out of faith and hope for reward, his past sins will be forgiven.", source: "Sahih Bukhari", arabic: "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ" },
  ],
  hajj: [
    { text: "Whoever performs Hajj and does not commit any obscenity or transgression shall return [free from sin] as he was on the day his mother gave birth to him.", source: "Sahih Bukhari", arabic: "مَنْ حَجَّ لِلَّهِ فَلَمْ يَرْفُثْ وَلَمْ يَفْسُقْ رَجَعَ كَيَوْمِ وَلَدَتْهُ أُمُّهُ" },
  ],
  zakat: [
    { text: "Islam is built on five: ... and giving Zakat.", source: "Sahih Bukhari", arabic: "بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ ... وَإِيتَاءِ الزَّكَاةِ" },
  ],
  marriage: [
    { text: "Marriage is part of my sunnah, and whoever does not follow my sunnah has nothing to do with me.", source: "Ibn Majah", arabic: "النِّكَاحُ مِنْ سُنَّتِي فَمَنْ لَمْ يَعْمَلْ بِسُنَّتِي فَلَيْسَ مِنِّي" },
    { text: "The best of you is the one who is best to his wife.", source: "Tirmidhi", arabic: "خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ وَأَنَا خَيْرُكُمْ لِأَهْلِي" },
  ],
  family: [
    { text: "The one who severs the ties of kinship will not enter Paradise.", source: "Sahih Muslim", arabic: "لَا يَدْخُلُ الْجَنَّةَ قَاطِعُ رَحِمٍ" },
  ],
  friendship: [
    { text: "A person is on the religion of his best friend, so let one of you look at whom he befriends.", source: "Abu Dawud", arabic: "الرَّجُلُ عَلَى دِينِ خَلِيلِهِ فَلْيَنْظُرْ أَحَدُكُمْ مَنْ يُخَالِلُ" },
  ],
  cleanliness: [
    { text: "Cleanliness is half of faith.", source: "Sahih Muslim", arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ" },
  ],
  modesty: [
    { text: "Modesty brings nothing but good.", source: "Sahih Bukhari", arabic: "الْحَيَاءُ لَا يَأْتِي إِلَّا بِخَيْرٍ" },
    { text: "Every religion has a distinct characteristic, and the distinct characteristic of Islam is modesty (Haya).", source: "Ibn Majah", arabic: "إِنَّ لِكُلِّ دِينٍ خُلُقًا وَخُلُقُ الْإِسْلَامِ الْحَيَاءُ" },
  ],
  gratitude: [
    { text: "Whoever is not grateful to the people, he is not grateful to Allah.", source: "Tirmidhi", arabic: "مَنْ لَمْ يَشْكُرِ النَّاسَ لَمْ يَشْكُرِ اللَّهَ" },
  ],
  tawakkul: [
    { text: "If you were to rely upon Allah with the reliance He is due, you would be provided for like the birds.", source: "Tirmidhi", arabic: "لَوْ أَنَّكُمْ تَوَكَّلْتُمْ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ لَرَزَقَكُمْ كَمَا يَرْزُقُ الطَّيْرَ" },
  ],
  quran: [
    { text: "The best of you are those who learn the Quran and teach it.", source: "Sahih Bukhari", arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ" },
    { text: "Recite the Quran, for it will come as an intercessor for its reciters on the Day of Resurrection.", source: "Sahih Muslim", arabic: "اقْرَءُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ" },
  ],
  prophethood: [
    { text: "I have been sent to perfect good character.", source: "Al-Muwatta", arabic: "إِنَّمَا بُعِثْتُ لِأُتَمِّمَ صَالِحَ الْأَخْلَاقِ" },
  ],
  angels: [
    { text: "The angels lower their wings for the seeker of knowledge, out of pleasure at what he does.", source: "Abu Dawud", arabic: "وَإِنَّ الْمَلَائِكَةَ لَتَضَعُ أَجْنِحَتَهَا رِضًا لِطَالِبِ الْعِلْمِ" },
  ],
  judgment: [
    { text: "The feet of the son of Adam shall not move from before his Lord on the Day of Judgment until he is asked about five things...", source: "Tirmidhi", arabic: "لاَ تَزُولُ قَدَمَا ابْنِ آدَمَ يَوْمَ الْقِيَامَةِ مِنْ عِنْدِ رَبِّهِ حَتَّى يُسْأَلَ عَنْ خَمْسٍ" },
  ],
  dua: [
    { text: "Dua is worship.", source: "Abu Dawud", arabic: "الدُّعَاءُ هُوَ الْعِبَادَةُ" },
    { text: "The supplication of a Muslim for his brother in his absence will certainly be answered.", source: "Sahih Muslim", arabic: "دَعْوَةُ الْمَرْءِ الْمُسْلِمِ لِأَخِيهِ بِظَهْرِ الْغَيْبِ مُسْتَجَابَةٌ" },
  ],
  dhikr: [
    { text: "The example of the one who remembers his Lord and the one who does not is like the living and the dead.", source: "Sahih Bukhari", arabic: "مَثَلُ الَّذِي يَذْكُرُ رَبَّهُ وَالَّذِي لَا يَذْكُرُ رَبَّهُ مَثَلُ الْحَيِّ وَالْمَيِّتِ" },
  ],
  repentance: [
    { text: "All the sons of Adam are sinners, but the best of sinners are those who repent often.", source: "Tirmidhi", arabic: "كُلُّ بَنِي آدَمَ خَطَّاءٌ وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ" },
  ],
  sincerity: [
    { text: "Allah accepts only that which is done for His sake and to seek His pleasure.", source: "Nasai", arabic: "إِنَّ اللَّهَ لَا يَقْبَلُ مِنَ الْعَمَلِ إِلَّا مَا كَانَ لَهُ خَالِصًا وَابْتُغِيَ بِهِ وَجْهُهُ" },
  ],
  humility: [
    { text: "No one who has the weight of a seed of arrogance in his heart will enter Paradise.", source: "Sahih Muslim", arabic: "لَا يَدْخُلُ الْجَنَّةَ مَنْ كَانَ فِي قَلْبِهِ مِثْقَالُ ذَرَّةٍ مِنْ كِبْرٍ" },
  ],
  generosity: [
    { text: "The generous man is near Allah, near Paradise, near men and far from Hell.", source: "Tirmidhi", arabic: "السَّخِيُّ قَرِيبٌ مِنَ اللَّهِ قَرِيبٌ مِنَ الْجَنَّةِ قَرِيبٌ مِنَ النَّاسِ بَعِيدٌ مِنَ النَّارِ" },
  ],
  backbiting: [
    { text: "Do not backbite one another. Would one of you like to eat the flesh of his dead brother? You would detest it.", source: "Quran 49:12", arabic: "وَلَا يَغْتَبْ بَعْضُكُمْ بَعْضًا أَيُحِبُّ أَحَدُكُمْ أَنْ يَأْكُلَ لَحْمَ أَخِيهِ مَيْتًا فَكَرِهْتُمُوهُ" },
    { text: "Do you know what is backbiting? It is to mention about your brother that which he dislikes.", source: "Sahih Muslim", arabic: "أَتَدْرُونَ مَا الْغِيبَةُ قَالُوا اللَّهُ وَرَسُولُهُ أَعْلَمُ قَالَ ذِكْرُكَ أَخَاكَ بِمَا يَكْرَهُ" },
  ],
  anger: [
    { text: "The strong man is not the good wrestler; the strong man is only the one who controls himself when he is angry.", source: "Sahih Bukhari", arabic: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ" },
  ],
  sick: [
    { text: "Visit the sick, feed the hungry, and free the captive.", source: "Sahih Bukhari", arabic: "عُودُوا الْمَرِيضَ وَأَطْعِمُوا الْجَائِعَ وَفُكُّوا الْعَانِيَ" },
  ],
  orphans: [
    { text: "I and the person who looks after an orphan and provides for him, will be in Paradise like this.", source: "Sahih Bukhari", arabic: "أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا" },
  ],
  animals: [
    { text: "Fear Allah with regard to these dumb animals. Ride them when they are fit, and eat them when they are fit.", source: "Abu Dawud", arabic: "اتَّقُوا اللَّهَ فِي هَذِهِ الْبَهَائِمِ الْمُعْجَمَةِ فَارْكَبُوهَا صَالِحَةً وَكُلُوهَا صَالِحَةً" },
  ],
  business: [
    { text: "The truthful, trustworthy merchant is with the Prophets, the Truthful, and the Martyrs.", source: "Tirmidhi", arabic: "التَّاجِرُ الصَّدُوقُ الْأَمِينُ مَعَ النَّبِيِّينَ وَالصِّدِّيقِينَ وَالشُّهَدَاءِ" },
  ],
  leadership: [
    { text: "Each of you is a shepherd and each of you is responsible for his flock.", source: "Sahih Bukhari", arabic: "كُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْئُولٌ عَنْ رَعِيَّتِهِ" },
  ],
  unity: [
    { text: "Do not disagree and thus become divided.", source: "Sahih Muslim", arabic: "وَلَا تَخْتَلِفُوا فَتَخْتَلِفَ قُلُوبُكُمْ" },
    { text: "The believers are like one body in their love, mercy, and compassion for each other.", source: "Sahih Muslim", arabic: "مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ" },
  ],
  peace: [
    { text: "Spread peace (Salam) amongst yourselves.", source: "Sahih Muslim", arabic: "أَفْشُوا السَّلَامَ بَيْنَكُمْ" },
    { text: "You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I tell you something which, if you do, you will love one another? Spread peace amongst yourselves.", source: "Sahih Muslim", arabic: "لَا تَدْخُلُونَ الْجَنَّةَ حَتَّى تُؤْمِنُوا وَلَا تُؤْمِنُوا حَتَّى تَحَابُّوا أَوَلَا أَدُلُّكُمْ عَلَى شَيْءٍ إِذَا فَعَلْتُمُوهُ تَحَابَبْتُمْ أَفْشُوا السَّلَامَ بَيْنَكُمْ" },
  ],
  brotherhood: [
    { text: "A Muslim is a brother of another Muslim, he should not oppress him, nor should he hand him over to an oppressor.", source: "Sahih Bukhari", arabic: "الْمُسْلِمُ أَخُو الْمُسْلِمِ لَا يَظْلِمُهُ وَلَا يُسْلِمُهُ" },
  ],
  women: [
    { text: "Act kindly towards women.", source: "Sahih Bukhari", arabic: "اسْتَوْصُوا بِالنِّسَاءِ خَيْرًا" },
    { text: "The world is enjoyment and the best enjoyment in the world is a righteous wife.", source: "Sahih Muslim", arabic: "الدُّنْيَا مَتَاعٌ وَخَيْرُ مَتَاعِ الدُّنْيَا الْمَرْأَةُ الصَّالِحَةُ" },
  ],
  children: [
    { text: "Be afraid of Allah, and be just to your children.", source: "Sahih Bukhari", arabic: "اتَّقُوا اللَّهَ وَاعْدِلُوا بَيْنَ أَوْلَادِكُمْ" },
  ],
  guest: [
    { text: "Whoever believes in Allah and the Last Day, let him honor his guest.", source: "Sahih Bukhari", arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ ضَيْفَهُ" },
  ],
  travel: [
    { text: "Travel is a portion of torment.", source: "Sahih Bukhari", arabic: "السَّفَرُ قِطْعَةٌ مِنَ الْعَذَابِ" },
  ]
};

const ITEMS_PER_PAGE = 10;
const TOTAL_ITEMS = 500;

const HadithCollection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('intentions');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileListVisible, setIsMobileListVisible] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Translation State
  const [openTranslateId, setOpenTranslateId] = useState<string | null>(null);
  const [translations, setTranslations] = useState<Record<string, string>>({}); // Key: hadith_refNumber-lang_code, Value: translated text
  const [loadingTranslation, setLoadingTranslation] = useState<string | null>(null);

  // Favorite Hadiths State
  const [favoriteHadiths, setFavoriteHadiths] = useState<FavoriteHadith[]>([]);

  useEffect(() => {
    setFavoriteHadiths(getFavoriteHadiths());
  }, []);

  // Generate 500 hadiths for the current category based on seeds
  const hadithList = useMemo(() => {
    // Fallback to intentions if key is missing
    const seeds = SEED_HADITHS[activeCategory] || SEED_HADITHS['intentions'];
    const generated = [];
    
    for (let i = 0; i < TOTAL_ITEMS; i++) {
      const seed = seeds[i % seeds.length];
      const idStr = `${activeCategory.substring(0,3).toUpperCase()}-${1000 + i}`;
      generated.push({
        id: i + 1,
        text: seed.text,
        source: seed.source,
        arabic: seed.arabic,
        refNumber: idStr, // Unique ID for each generated hadith
        category: activeCategory // Add category to generated hadith
      });
    }
    return generated;
  }, [activeCategory]);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return hadithList;
    return hadithList.filter(h => 
      h.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
      h.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.arabic.includes(searchTerm)
    );
  }, [hadithList, searchTerm]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setCurrentPage(1);
    setSearchTerm("");
    setIsMobileListVisible(true);
    setTranslations({}); // Reset translations when category changes
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hadith from DeenLife',
          text: text,
        });
      } catch (e) {
        console.log('Share failed', e);
      }
    } else {
        alert("Share feature not supported in this browser.");
    }
  };

  const handleTranslate = async (hadithRefNumber: string, text: string, lang: string) => {
    setOpenTranslateId(null); // Close dropdown
    const translationKey = `${hadithRefNumber}-${lang}`; // Use unique key for each Hadith and language

    if (lang === 'English') {
        const newTranslations = { ...translations };
        // Delete specific translation to revert to default (original hadith.text)
        delete newTranslations[translationKey];
        setTranslations(newTranslations);
        return;
    }
    
    setLoadingTranslation(hadithRefNumber);
    try {
        const translated = await translateText(text, lang);
        setTranslations(prev => ({ ...prev, [translationKey]: translated }));
    } catch (e) {
        console.error("Translation error", e);
        alert(`Failed to translate to ${lang}. Please try again.`);
    } finally {
        setLoadingTranslation(null);
    }
  };

  const toggleFavorite = (hadith: { id: number; text: string; source: string; arabic: string; refNumber: string; category: string; }) => {
    const exists = favoriteHadiths.find(f => f.refNumber === hadith.refNumber);
    let newFavorites: FavoriteHadith[];
    if (exists) {
      newFavorites = favoriteHadiths.filter(f => f.refNumber !== hadith.refNumber);
    } else {
      newFavorites = [...favoriteHadiths, {
        refNumber: hadith.refNumber,
        category: CATEGORIES.find(c => c.id === hadith.category)?.title || hadith.category, // Use full category title
        text: hadith.text,
        arabic: hadith.arabic,
        source: hadith.source,
        timestamp: Date.now()
      }];
    }
    setFavoriteHadiths(newFavorites);
    saveFavoriteHadiths(newFavorites);
  };

  const isFavorited = (refNumber: string) => {
    return favoriteHadiths.some(f => f.refNumber === refNumber);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 animate-slide-up">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600/20 rounded-xl text-emerald-400">
             <ScrollText size={32} />
          </div>
          <div>
             <h2 className="text-3xl font-bold text-white">Hadith Collection</h2>
             <p className="text-slate-400">Authentic sayings of Prophet Muhammad (ﷺ)</p>
          </div>
        </div>
        <div className={`relative w-full md:w-64 ${isMobileListVisible ? 'hidden lg:block' : 'block'}`}>
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
           <input 
             type="text" 
             placeholder="Search in category..." 
             className="w-full bg-slate-900 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
             value={searchTerm}
             onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
           />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-14rem)] animate-slide-up delay-100">
        {/* Categories Sidebar */}
        <div className={`w-full lg:w-72 flex-shrink-0 flex flex-col bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden ${isMobileListVisible ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Grid size={16} /> Categories
            </h3>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-500">{CATEGORIES.length}</span>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between group text-sm ${
                  activeCategory === cat.id 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50 font-medium' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>{cat.title}</span>
                {activeCategory === cat.id ? <BookOpen size={16} /> : <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className={`flex-1 flex-col bg-slate-900/20 rounded-xl overflow-hidden ${isMobileListVisible ? 'flex' : 'hidden lg:flex'}`}>
          {/* Header for list */}
          <div className="p-3 bg-slate-900/50 border-b border-slate-800 flex justify-between items-center px-4">
             <div className="flex items-center gap-2 overflow-hidden">
               {/* Mobile Back Button */}
               <button 
                 onClick={() => setIsMobileListVisible(false)}
                 className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white"
               >
                 <ArrowLeft size={20} />
               </button>
               
               <div className="flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Category</span>
                  <span className="text-emerald-400 font-bold truncate text-lg">{CATEGORIES.find(c => c.id === activeCategory)?.title}</span>
               </div>
             </div>
            <div className="text-xs text-slate-500 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
              {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredItems.length)}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} of {filteredItems.length}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 pr-2 custom-scrollbar">
            {currentItems.length > 0 ? (
              currentItems.map((hadith, index) => {
                const favorited = isFavorited(hadith.refNumber);
                const translationKey = `${hadith.refNumber}-${openTranslateId}`; // Use unique key for Hadith and currently selected lang
                return (
                  <div 
                    key={hadith.refNumber} 
                    className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 relative overflow-visible group hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/10 animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Decorative Quote Icon */}
                    <Quote className="absolute top-4 right-4 text-emerald-900/20 w-16 h-16 transform -scale-x-100 rotate-12 pointer-events-none" />
                    
                    <div className="flex items-center gap-2 mb-4">
                       <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] font-mono text-slate-500 border border-slate-700">
                          #{hadith.id}
                       </span>
                       <span className="text-[10px] font-mono text-slate-600">
                          Ref: {hadith.refNumber}
                       </span>
                    </div>
                    
                    {hadith.arabic && (
                       <div className="mb-6 relative">
                         <p className="font-quran text-3xl md:text-4xl text-right text-emerald-100 leading-[2.2] dir-rtl select-text">
                           {hadith.arabic}
                         </p>
                       </div>
                    )}
                    
                    <div className="relative">
                      {loadingTranslation === hadith.refNumber ? (
                           <div className="flex items-center gap-2 text-emerald-400 py-4">
                              <Loader2 className="animate-spin" size={20} />
                              <span className="text-sm">Translating with AI...</span>
                           </div>
                      ) : (
                          <p className="text-lg text-slate-300 leading-relaxed mb-6 select-text font-serif border-l-2 border-slate-700 pl-4">
                              "{translations[translationKey] || hadith.text}"
                          </p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/50">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wide">
                        <BookOpen size={12} />
                        {hadith.source}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {/* Favorite Button */}
                        <button 
                          onClick={() => toggleFavorite(hadith)}
                          className={`p-2 rounded-lg transition-colors ${favorited ? 'text-red-500 bg-red-500/10' : 'text-slate-500 hover:text-red-400 hover:bg-red-500/10'}`}
                          title="Add to Favorites"
                        >
                          <HeartIcon size={18} fill={favorited ? "currentColor" : "none"} />
                        </button>

                        {/* Translate Button */}
                        <div className="relative">
                          <button 
                              onClick={() => setOpenTranslateId(openTranslateId === hadith.refNumber ? null : hadith.refNumber)}
                              className={`p-2 rounded-lg transition-colors relative flex items-center gap-1 ${translations[translationKey] ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10'}`}
                              title="Translate"
                          >
                              <Globe size={18} />
                          </button>

                          {/* Dropdown */}
                          {openTranslateId === hadith.refNumber && (
                               <div className="absolute bottom-full right-0 mb-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 animate-scale-in">
                                  <div className="p-2 border-b border-slate-800 text-xs font-semibold text-slate-500 uppercase">
                                      Translate to
                                  </div>
                                  <div className="max-h-48 overflow-y-auto custom-scrollbar">
                                      {LANGUAGES.map(lang => (
                                          <button
                                              key={lang}
                                              onClick={() => handleTranslate(hadith.refNumber, hadith.text, lang)}
                                              className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
                                          >
                                              {lang}
                                          </button>
                                      ))}
                                  </div>
                               </div>
                          )}
                          {/* Backdrop for Dropdown */}
                          {openTranslateId === hadith.refNumber && (
                            <div 
                              className="fixed inset-0 z-40 bg-transparent"
                              onClick={() => setOpenTranslateId(null)}
                            ></div>
                          )}
                        </div>

                        <button 
                          onClick={() => handleCopy(`${hadith.text}\n\n— ${hadith.source}`, hadith.refNumber)}
                          className="p-2 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors relative"
                          title="Copy Hadith"
                        >
                           {copiedId === hadith.refNumber ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                        <button 
                          onClick={() => handleShare(`${hadith.text}\n\n— ${hadith.source}`)}
                          className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors md:hidden"
                          title="Share"
                        >
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
               <div className="text-center py-20 text-slate-500">
                 No hadiths found matching "{searchTerm}"
               </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 py-4 border-t border-slate-800 bg-slate-900 mt-auto px-4">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="hidden md:flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                   let p = currentPage - 2 + i;
                   if (currentPage < 3) p = 1 + i;
                   if (totalPages < 5) p = 1 + i;
                   if (currentPage > totalPages - 2) p = totalPages - 4 + i;
                   if (p > totalPages || p < 1) return null;
                   
                   return (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 rounded-lg font-medium transition text-sm ${
                        currentPage === p 
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' 
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {p}
                    </button>
                   );
                })}
              </div>
              <span className="md:hidden text-sm text-slate-400 font-mono">
                Page {currentPage} / {totalPages}
              </span>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HadithCollection;
