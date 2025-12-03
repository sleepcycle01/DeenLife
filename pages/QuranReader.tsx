
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QURAN_API_BASE } from '../constants';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, Bookmark as BookmarkIcon, BookOpen, ScrollText, Settings, Type as TypeIcon } from 'lucide-react';
import { saveLastRead, getBookmarks, saveBookmarks } from '../services/storageService';
import { Bookmark } from '../types';

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
}

interface SurahDetails {
  number: number;
  englishName: string;
  englishNameTranslation: string;
  name: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

const PageFrame = ({ children }: { children?: React.ReactNode }) => (
  <div className="relative p-1 md:p-2 bg-gradient-to-br from-yellow-600/20 via-slate-900 to-yellow-600/20 rounded-none md:rounded-lg shadow-2xl animate-scale-in">
    <div className="bg-[#0f172a] border-4 border-double border-yellow-600/40 p-4 md:p-8 min-h-[80vh] relative overflow-hidden">
       {/* Corner Ornaments */}
       <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-emerald-500/50 rounded-tl-3xl"></div>
       <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-emerald-500/50 rounded-tr-3xl"></div>
       <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-emerald-500/50 rounded-bl-3xl"></div>
       <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-emerald-500/50 rounded-br-3xl"></div>
       
       {/* Inner Content */}
       <div className="relative z-10 h-full">
          {children}
       </div>
    </div>
  </div>
);

const SurahHeader = ({ surah }: { surah: SurahDetails | null }) => (
  <div className="relative py-8 mb-8 text-center animate-slide-up">
    {/* Decorative Frame */}
    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
       <div className="w-64 h-24 border-y-2 border-yellow-500 transform skew-x-12"></div>
    </div>
    
    <div className="relative z-10">
      <h1 className="font-quran text-5xl md:text-6xl text-emerald-400 drop-shadow-[0_2px_10px_rgba(16,185,129,0.3)] mb-2">
        {surah?.name}
      </h1>
      <div className="flex items-center justify-center gap-2 text-yellow-500/80 text-sm font-serif italic">
        <span className="h-px w-8 bg-current"></span>
        <span>{surah?.englishName}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
        <span>{surah?.revelationType}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
        <span>{surah?.numberOfAyahs} Verses</span>
        <span className="h-px w-8 bg-current"></span>
      </div>
    </div>
  </div>
);

const QuranReader: React.FC = () => {
  const { surahId } = useParams<{ surahId: string }>();
  const navigate = useNavigate();
  const [arabicSurah, setArabicSurah] = useState<SurahDetails | null>(null);
  const [englishSurah, setEnglishSurah] = useState<SurahDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  
  // UI State
  const [readingMode, setReadingMode] = useState<'mushaf' | 'translation'>('mushaf');
  const [fontSize, setFontSize] = useState(32);
  const [showSettings, setShowSettings] = useState(false);

  const currentId = parseInt(surahId || "1");

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const fetchWithRetry = async (retries = 3, delay = 1000): Promise<any> => {
        try {
          const res = await fetch(`${QURAN_API_BASE}/surah/${currentId}/editions/quran-uthmani,en.sahih`);
          if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
          }
          return await res.json();
        } catch (err) {
          if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(retries - 1, delay * 2);
          }
          throw err;
        }
      };

      try {
        const data = await fetchWithRetry();
        
        if (isMounted) {
          if (data.code === 200 && data.data.length >= 2) {
            const arData = data.data[0];
            setArabicSurah(arData);
            setEnglishSurah(data.data[1]);

            // Save Last Read Status
            saveLastRead({
              surahNumber: arData.number,
              surahName: arData.englishName,
              timestamp: Date.now()
            });
            setLoading(false);
          } else {
            throw new Error("Invalid API response structure");
          }
        }
      } catch (e) {
        if (isMounted) {
          console.error("Failed to fetch surah details", e);
          setError("Failed to load content. Please check your internet connection.");
          setLoading(false);
        }
      }
    };
    
    if (currentId) {
      fetchData();
      window.scrollTo(0, 0);
    }

    return () => {
      isMounted = false;
    };
  }, [currentId]);

  const toggleBookmark = (ayahNumber: number, textSnippet: string) => {
    const exists = bookmarks.find(b => b.surahNumber === currentId && b.ayahNumber === ayahNumber);
    let newBookmarks;
    if (exists) {
      newBookmarks = bookmarks.filter(b => !(b.surahNumber === currentId && b.ayahNumber === ayahNumber));
    } else {
      newBookmarks = [...bookmarks, {
        surahNumber: currentId,
        ayahNumber,
        text: textSnippet.substring(0, 50) + "...",
        timestamp: Date.now()
      }];
    }
    setBookmarks(newBookmarks);
    saveBookmarks(newBookmarks);
  };

  const isBookmarked = (ayahNumber: number) => {
    return bookmarks.some(b => b.surahNumber === currentId && b.ayahNumber === ayahNumber);
  };

  const goToNext = () => {
    if (currentId < 114) navigate(`/read/${currentId + 1}`);
  };

  const goToPrev = () => {
    if (currentId > 1) navigate(`/read/${currentId - 1}`);
  };

  const showBismillahHeader = currentId !== 1 && currentId !== 9;

  return (
    <div className="min-h-screen bg-slate-950 pb-24 animate-fade-in">
      {/* Top Navigation */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <button 
          onClick={() => navigate('/quran-tracker')}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center bg-slate-900 rounded-lg p-1 border border-slate-800">
           <button 
             onClick={() => setReadingMode('mushaf')}
             className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
               readingMode === 'mushaf' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
             }`}
           >
             <BookOpen size={16} /> <span className="hidden sm:inline">Mushaf</span>
           </button>
           <button 
             onClick={() => setReadingMode('translation')}
             className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
               readingMode === 'translation' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
             }`}
           >
             <ScrollText size={16} /> <span className="hidden sm:inline">Translation</span>
           </button>
        </div>

        <button 
          onClick={() => setShowSettings(!showSettings)}
          className={`p-2 rounded-lg transition ${showSettings ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Settings Drawer */}
      {showSettings && (
        <div className="bg-slate-900 border-b border-slate-800 p-4 animate-slide-up">
           <div className="max-w-md mx-auto flex items-center gap-4">
              <TypeIcon size={18} className="text-slate-400" />
              <input 
                type="range" 
                min="20" 
                max="60" 
                value={fontSize} 
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500"
              />
              <span className="text-slate-400 text-sm">{fontSize}px</span>
           </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-emerald-500/50">
          <Loader2 size={48} className="animate-spin mb-4" />
          <p className="text-slate-500">Opening Surah...</p>
        </div>
      ) : error ? (
        <div className="max-w-md mx-auto mt-20 text-center py-10 px-6 text-red-400 bg-red-900/10 rounded-2xl border border-red-900/30 animate-scale-in">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-900/20 rounded-lg hover:bg-red-900/40">Retry</button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto md:px-4 py-6">
          
          <PageFrame>
             <SurahHeader surah={arabicSurah} />
             
             {showBismillahHeader && (
                <div className="text-center mb-10 animate-fade-in delay-200">
                   <p className="font-quran text-3xl text-emerald-200/80 ornate-text">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</p>
                </div>
             )}

             {readingMode === 'mushaf' ? (
                // --- MUSHAF MODE ---
                <div 
                  className={`font-quran leading-[2.6] text-slate-200 tracking-wide text-center animate-fade-in delay-300`}
                  style={{ fontSize: `${fontSize}px`, textAlign: 'justify', textAlignLast: 'center', direction: 'rtl' }}
                >
                   {arabicSurah?.ayahs.map((ayah, idx) => (
                     <React.Fragment key={ayah.number}>
                        <span 
                           className={`hover:text-emerald-400 transition-colors cursor-pointer ${isBookmarked(ayah.numberInSurah) ? 'text-yellow-400' : ''}`}
                           onClick={() => toggleBookmark(ayah.numberInSurah, englishSurah?.ayahs[idx].text || "")}
                        >
                           {ayah.text}
                        </span>
                        {/* Verse Marker */}
                        <span className="inline-flex items-center justify-center mx-2 w-[0.8em] h-[0.8em] border border-emerald-600/40 rounded-full text-[0.4em] align-middle bg-emerald-900/10 text-emerald-500 font-sans mt-1">
                           {ayah.numberInSurah}
                        </span>
                     </React.Fragment>
                   ))}
                </div>
             ) : (
                // --- TRANSLATION MODE ---
                <div className="space-y-6 animate-fade-in delay-300">
                  {arabicSurah?.ayahs.map((ayah, index) => {
                    const engAyah = englishSurah?.ayahs[index];
                    const bookmarked = isBookmarked(ayah.numberInSurah);
                    
                    return (
                      <div key={ayah.number} className="group border-b border-slate-800/50 pb-6 mb-6 last:border-0">
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex items-center gap-3">
                              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-emerald-500 font-bold text-sm border border-slate-700">
                                 {ayah.numberInSurah}
                              </span>
                              <button 
                                onClick={() => toggleBookmark(ayah.numberInSurah, engAyah?.text || "")}
                                className={`transition-colors ${bookmarked ? 'text-yellow-500' : 'text-slate-600 hover:text-yellow-500'}`}
                              >
                                <BookmarkIcon size={18} fill={bookmarked ? "currentColor" : "none"} />
                              </button>
                           </div>
                        </div>

                        <p 
                          className="font-quran text-right text-slate-100 leading-[2.5] mb-4" 
                          dir="rtl"
                          style={{ fontSize: `${fontSize}px` }}
                        >
                          {ayah.text}
                        </p>

                        <p className="text-slate-400 text-lg leading-relaxed font-serif pl-4 border-l-2 border-slate-800">
                          {engAyah?.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
             )}
          </PageFrame>

          {/* Navigation Footer */}
          <div className="flex justify-between items-center mt-8 px-4 animate-slide-up">
            <button 
              onClick={goToPrev}
              disabled={currentId <= 1}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-0 transition flex items-center gap-2 text-slate-200"
            >
              <ChevronLeft size={18} /> Previous
            </button>
            
            <div className="text-slate-500 text-sm font-mono">
              Surah {currentId} of 114
            </div>

            <button 
              onClick={goToNext}
              disabled={currentId >= 114}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-0 transition flex items-center gap-2 text-slate-200"
            >
              Next <ChevronRight size={18} />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default QuranReader;
