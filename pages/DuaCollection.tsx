
import React, { useState } from 'react';
import { Heart, Sun, Moon, Utensils, DoorOpen, Plane, BookOpen, Stars, Bed, Smile, Activity, Shield, Users, Search, Compass, CheckCircle, Globe, Loader2 } from 'lucide-react';
import { translateText } from '../services/geminiService';

const DUAS = [
  {
    category: 'General Good',
    icon: Stars,
    source: "Surah Al-Baqarah 2:201",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil 'akhirati hasanatan waqina 'adhaban-nar.",
    translation: "Our Lord! Give us in this world that which is good and in the Hereafter that which is good, and save us from the torment of the Fire."
  },
  {
    category: 'Forgiveness',
    icon: Shield,
    source: "Surah Al-A'raf 7:23",
    arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    transliteration: "Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakunanna minal-khasireen.",
    translation: "Our Lord! We have wronged ourselves. If You forgive us not, and bestow not upon us Your Mercy, we shall certainly be of the losers."
  },
  {
    category: 'Parents',
    icon: Users,
    source: "Surah Al-Isra 17:24",
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbir hamhuma kama rabbayani sagheera.",
    translation: "My Lord! Bestow on them Your Mercy as they did bring me up when I was small."
  },
  {
    category: 'Knowledge',
    icon: BookOpen,
    source: "Surah Taha 20:114",
    arabic: "رَّبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma.",
    translation: "My Lord! Increase me in knowledge."
  },
  {
    category: 'Guidance',
    icon: Compass,
    source: "Surah Al-Fatiha 1:6",
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    transliteration: "Ihdinas-siratal-mustaqeem.",
    translation: "Guide us to the Straight Path."
  },
  {
    category: 'Patience',
    icon: Activity,
    source: "Surah Al-Baqarah 2:250",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Rabbana afrigh 'alayna sabran wa thabbit aqdamana wansurna 'alal-qawmil-kafireen.",
    translation: "Our Lord! Pour forth on us patience and make our foothold firm, and give us victory over the disbelieving people."
  },
  {
    category: 'Spouse & Offspring',
    icon: Heart,
    source: "Surah Al-Furqan 25:74",
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    transliteration: "Rabbana hab lana min azwajina wa dhurriyatina qurrata a'yunin waj'alna lil-muttaqina imama.",
    translation: "Our Lord! Grant unto us wives and offspring who will be the comfort of our eyes, and give us (the grace) to lead the righteous."
  },
  {
    category: 'Acceptance',
    icon: CheckCircle,
    source: "Surah Al-Baqarah 2:127",
    arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Rabbana taqabbal minna innaka antas-sami'ul-'aleem.",
    translation: "Our Lord! Accept (this service) from us. Verily! You are the All-Hearer, the All-Knower."
  },
  {
    category: 'Morning',
    icon: Sun,
    source: "Sahih Muslim",
    arabic: "اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا ، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ النُّـشُور",
    transliteration: "Allahumma bika asbahna wa bika amsayna, wa bika nahya wa bika namutu wa ilaykan-nushur.",
    translation: "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the Final Return."
  },
  {
    category: 'Evening',
    icon: Moon,
    source: "Sahih Muslim",
    arabic: "اللّهُـمَّ بِكَ أَمْسَـينا وَبِكَ أَصْـبَحْنا، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ الْمَصِير",
    transliteration: "Allahumma bika amsayna wa bika asbahna, wa bika nahya wa bika namutu wa ilaykal-maseer.",
    translation: "O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the Final Return."
  },
  {
    category: 'Before Eating',
    icon: Utensils,
    source: "Sunan Abi Dawud",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah.",
    translation: "In the name of Allah."
  },
  {
    category: 'After Eating',
    icon: Utensils,
    source: "Sunan At-Tirmidhi",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلا قُوَّةٍ",
    transliteration: "Al-hamdu lillahilladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah.",
    translation: "Praise is to Allah Who has fed me this and provided it for me without any strength or power on my part."
  },
  {
    category: 'Leaving Home',
    icon: DoorOpen,
    source: "Sunan Abi Dawud",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
    transliteration: "Bismillahi, tawakkaltu 'alallahi, wa la hawla wa la quwwata illa billah.",
    translation: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah."
  },
  {
    category: 'Entering Home',
    icon: DoorOpen,
    source: "Sahih Muslim",
    arabic: "بِسْـمِ اللهِ وَلَجْنـا، وَبِسْـمِ اللهِ خَـرَجْنـا، وَعَلـى رَبِّنـا تَوَكّلْـنا",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Rabbina tawakkalna.",
    translation: "In the Name of Allah we enter, in the Name of Allah we leave, and upon our Lord we depend."
  },
  {
    category: 'Travel',
    icon: Plane,
    source: "Surah Az-Zukhruf 43:13-14",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    transliteration: "Subhanalla-dhi sakh-khara lana hadha wa ma kunna lahu muqrineen. Wa inna ila Rabbina la-munqaliboon.",
    translation: "Glory unto Him Who created this transportation, for us, though we were unable to create it on our own. And unto our Lord we shall return."
  },
  {
    category: 'Sleep',
    icon: Bed,
    source: "Sahih Bukhari",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amootu wa ahya.",
    translation: "In Your Name, O Allah, I die and I live."
  },
  {
    category: 'Waking Up',
    icon: Sun,
    source: "Sahih Bukhari",
    arabic: "الْحَمْدُ لِلهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushoor.",
    translation: "Praise is to Allah Who gives us life after He has caused us to die and to Him is the return."
  },
  {
    category: 'Distress',
    icon: Activity,
    source: "Sahih Bukhari",
    arabic: "لا إِلَهَ إِلا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لا إِلَهَ إِلا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ",
    transliteration: "La ilaha illallahul-'Adheemul-Haleem, la ilaha illallahu Rabbul-'arshil-'adheem.",
    translation: "There is no god but Allah, the Great, the Tolerant. There is no god but Allah, Lord of the Magnificent Throne."
  },
  {
    category: 'Visiting Sick',
    icon: Heart,
    source: "Sahih Bukhari",
    arabic: "لا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
    transliteration: "La ba'sa tahoorun insha'Allah.",
    translation: "Do not worry, it will be a purification (for you), if Allah wills."
  },
  {
    category: 'Sneezing',
    icon: Smile,
    source: "Sahih Bukhari",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah.",
    translation: "All praise is due to Allah."
  }
];

const LANGUAGES = [
  'English', 'Urdu', 'Indonesian', 'Turkish', 'French', 'Spanish', 
  'Hindi', 'Bengali', 'Russian', 'German', 'Malay', 'Chinese', 'Persian'
];

const DuaCollection: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [openTranslateId, setOpenTranslateId] = useState<number | null>(null);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [loadingTranslation, setLoadingTranslation] = useState<number | null>(null);

  const filteredDuas = DUAS.filter(d => 
    d.category.toLowerCase().includes(filter.toLowerCase()) || 
    d.translation.toLowerCase().includes(filter.toLowerCase())
  );

  const handleTranslate = async (duaIndex: number, text: string, lang: string) => {
    setOpenTranslateId(null);
    const translationKey = `${duaIndex}-${lang}`;

    if (lang === 'English') {
        const newTranslations = { ...translations };
        delete newTranslations[translationKey];
        setTranslations(newTranslations);
        return;
    }
    
    setLoadingTranslation(duaIndex);
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-slide-up">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-pink-600/20 rounded-xl text-pink-400">
             <Heart size={32} />
          </div>
          <div>
             <h2 className="text-3xl font-bold text-white">Dua Collection</h2>
             <p className="text-slate-400">Supplications from Quran & Sunnah</p>
          </div>
        </div>
        <div className="relative w-full md:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
           <input 
             type="text" 
             placeholder="Search Duas..." 
             className="w-full bg-slate-900 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
             value={filter}
             onChange={(e) => setFilter(e.target.value)}
           />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-20">
        {filteredDuas.length > 0 ? (
          filteredDuas.map((dua, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-pink-500/30 transition-all duration-300 group hover:shadow-lg animate-slide-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-lg text-emerald-400 group-hover:bg-emerald-900/30 transition-colors">
                    <dua.icon size={20} />
                  </div>
                  <h3 className="font-semibold text-lg text-emerald-100">{dua.category}</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400 font-mono">
                  {dua.source}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800/50">
                   <p className="font-quran text-3xl text-center leading-[2.5] text-white dir-rtl select-text">
                     {dua.arabic}
                   </p>
                </div>
                
                <div className="space-y-2 text-center">
                  <p className="text-emerald-400 font-medium italic text-sm md:text-base leading-relaxed">"{dua.transliteration}"</p>
                  
                  {loadingTranslation === idx ? (
                      <div className="flex justify-center items-center gap-2 text-emerald-400">
                         <Loader2 className="animate-spin" size={20} />
                         <span>Translating...</span>
                      </div>
                  ) : (
                    <p className="text-slate-300 leading-relaxed">
                      {translations[`${idx}-English`] || dua.translation}
                    </p>
                  )}
                </div>
              </div>

              {/* Translate Button */}
              <div className="flex justify-end mt-4 pt-4 border-t border-slate-800/50">
                <div className="relative">
                  <button 
                      onClick={() => setOpenTranslateId(openTranslateId === idx ? null : idx)}
                      className={`p-2 rounded-lg transition-colors relative flex items-center gap-1 ${translations[`${idx}-English`] ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10'}`}
                      title="Translate"
                  >
                      <Globe size={18} /> Translate
                  </button>

                  {/* Dropdown */}
                  {openTranslateId === idx && (
                        <div className="absolute bottom-full right-0 mb-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 animate-scale-in">
                            <div className="p-2 border-b border-slate-800 text-xs font-semibold text-slate-500 uppercase">
                                Translate to
                            </div>
                            <div className="max-h-48 overflow-y-auto custom-scrollbar">
                                {LANGUAGES.map(lang => (
                                    <button
                                        key={lang}
                                        onClick={() => handleTranslate(idx, dua.translation, lang)}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </div>
                  )}
                  {/* Backdrop for Dropdown */}
                  {openTranslateId === idx && (
                    <div 
                      className="fixed inset-0 z-40 bg-transparent"
                      onClick={() => setOpenTranslateId(null)}
                    ></div>
                  )}
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-20 text-slate-500 animate-fade-in">
            No duas found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default DuaCollection;
