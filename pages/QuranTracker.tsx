
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCachedSurahs, getQuranProgress, saveQuranProgress, getLastRead, getBookmarks } from '../services/storageService';
import { Surah, LastRead, Bookmark } from '../types';
import { QURAN_API_BASE } from '../constants';
import { CheckCircle2, BookOpen, Clock, Bookmark as BookmarkIcon, Grid, List, Search, ArrowRight, ArrowLeft, Trash2, Crown, Loader2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const QuranTracker: React.FC = () => {
  const navigate = useNavigate();
  
  // Data State
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [view, setView] = useState<'dashboard' | 'surah-index' | 'juzz-index' | 'bookmarks'>('dashboard');
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setCompleted(getQuranProgress());
    setLastRead(getLastRead());
    setBookmarks(getBookmarks());

    const cached = getCachedSurahs();
    if (cached) {
      setSurahs(cached);
      setLoading(false);
    } else {
      try {
        const res = await fetch(`${QURAN_API_BASE}/surah`);
        if (!res.ok) throw new Error("Failed to fetch surah list");
        
        const data = await res.json();
        if (data.code === 200) {
          setSurahs(data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (e) {
        console.error(e);
        setError("Failed to load Surah list. Please check your connection.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleSurahCompletion = (e: React.MouseEvent, number: number) => {
    e.stopPropagation();
    let newCompleted;
    if (completed.includes(number)) {
      newCompleted = completed.filter(n => n !== number);
    } else {
      newCompleted = [...completed, number];
    }
    setCompleted(newCompleted);
    saveQuranProgress(newCompleted);
  };

  const handleRead = (number: number) => {
    navigate(`/read/${number}`);
  };

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.name.includes(searchTerm) ||
    String(s.number).includes(searchTerm)
  );

  const JUZZ_COUNT = 30; // Static Juzz List for UI

  // --- SUB-COMPONENTS ---

  const HeroResume = () => (
    <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden mb-8 animate-scale-in">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-32 h-32 bg-black/5 rounded-full blur-xl pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-yellow-100/90 text-sm font-medium uppercase tracking-wider">
            <BookOpen size={16} />
            <span>Last Read</span>
          </div>
          <h2 className="font-quran text-3xl md:text-4xl mb-1">
            {lastRead ? lastRead.surahName : "Start Reading"}
          </h2>
          <p className="text-yellow-100">
            {lastRead ? `Surah No. ${lastRead.surahNumber}` : "Begin your journey today"}
          </p>
        </div>

        <button 
          onClick={() => handleRead(lastRead ? lastRead.surahNumber : 1)}
          className="bg-white text-yellow-700 hover:bg-yellow-50 px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          {lastRead ? "Resume Reading" : "Start Quran"}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );

  const DashboardGrid = () => (
    <div className="grid grid-cols-2 gap-4 animate-slide-up delay-100">
      <button 
        onClick={() => setView('surah-index')}
        className="bg-white text-slate-900 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group flex flex-col items-center justify-center gap-3 h-40 hover:scale-[1.02]"
      >
        <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-white transition-colors">
          <List size={24} />
        </div>
        <span className="font-bold text-lg">Surah Index</span>
      </button>

      <button 
        onClick={() => setView('juzz-index')}
        className="bg-white text-slate-900 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group flex flex-col items-center justify-center gap-3 h-40 hover:scale-[1.02]"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
          <Grid size={24} />
        </div>
        <span className="font-bold text-lg">Juzz Index</span>
      </button>

      <button 
        onClick={() => setView('bookmarks')}
        className="bg-white text-slate-900 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group flex flex-col items-center justify-center gap-3 h-40 hover:scale-[1.02]"
      >
        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
          <BookmarkIcon size={24} />
        </div>
        <span className="font-bold text-lg">Bookmarks</span>
      </button>

      <div className="bg-slate-800 text-white p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center gap-3 h-40 relative overflow-hidden hover:scale-[1.02] transition-transform">
        <div className="absolute inset-0 bg-emerald-600 opacity-20"></div>
        <div className="relative z-10 text-center">
          <p className="text-xs text-slate-300 uppercase tracking-wider mb-1">Completed</p>
          <p className="text-3xl font-bold">{completed.length}</p>
          <p className="text-xs text-slate-400">of 114 Surahs</p>
        </div>
        {/* Progress Ring Mini */}
        <div className="absolute bottom-0 w-full h-1 bg-slate-700">
           <div className="h-full bg-emerald-500" style={{ width: `${(completed.length / 114) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );

  const SurahListView = () => (
    <div className="animate-fade-in space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setView('dashboard')} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Surah..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-10 text-slate-500">
           <Loader2 className="animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-400 bg-red-900/10 rounded-xl">
           <AlertCircle className="mx-auto mb-2" size={32} />
           <p>{error}</p>
           <button onClick={loadData} className="mt-4 px-4 py-2 bg-red-900/20 rounded hover:bg-red-900/40">Retry</button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSurahs.map((surah, idx) => {
            const isDone = completed.includes(surah.number);
            return (
              <div
                key={surah.number}
                onClick={() => handleRead(surah.number)}
                className="flex items-center justify-between p-4 bg-white rounded-2xl cursor-pointer hover:shadow-lg transition-all group border-l-4 border-transparent hover:border-emerald-500 animate-slide-up"
                style={{ animationDelay: `${idx * 20}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 relative flex items-center justify-center text-slate-800 font-bold">
                    {/* Star shape bg */}
                    <div className="absolute inset-0 bg-slate-100 rotate-45 rounded-md group-hover:bg-emerald-100 transition-colors"></div>
                    <span className="relative z-10">{surah.number}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors">
                      {surah.englishName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{surah.revelationType}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span>{surah.numberOfAyahs} Verses</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                   <span className="font-quran text-xl text-emerald-600">{surah.name}</span>
                   <button
                      onClick={(e) => toggleSurahCompletion(e, surah.number)}
                      className={`p-1 rounded-full transition-colors ${
                        isDone ? 'text-emerald-500' : 'text-slate-300 hover:text-emerald-500'
                      }`}
                    >
                       {isDone ? <CheckCircle2 size={24} fill="currentColor" className="text-emerald-100" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>}
                    </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const JuzzListView = () => (
    <div className="animate-fade-in">
       <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setView('dashboard')} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-white">
          <ArrowLeft size={20} />
        </button>
        <h3 className="text-2xl font-bold text-white">Juzz Index</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: JUZZ_COUNT }, (_, i) => i + 1).map((juzz, idx) => (
          <button 
            key={juzz}
            onClick={() => handleRead(1)} 
            className="bg-slate-800 hover:bg-slate-700 p-6 rounded-2xl text-center transition-all group relative overflow-hidden animate-scale-in"
            style={{ animationDelay: `${idx * 30}ms` }}
          >
             <div className="absolute top-0 right-0 p-2 opacity-10">
               <Grid size={48} />
             </div>
             <span className="text-sm text-slate-400 uppercase tracking-wider">Juzz</span>
             <p className="text-3xl font-bold text-white mt-1">{juzz}</p>
          </button>
        ))}
      </div>
      <p className="text-center text-slate-500 mt-8 text-sm">
        *Detailed Juzz mapping coming soon. Clicking opens Al-Fatiha.
      </p>
    </div>
  );

  const BookmarksView = () => (
    <div className="animate-fade-in">
       <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setView('dashboard')} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-white">
          <ArrowLeft size={20} />
        </button>
        <h3 className="text-2xl font-bold text-white">Bookmarks</h3>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-20 bg-slate-900 rounded-3xl border border-slate-800 animate-scale-in">
          <BookmarkIcon size={48} className="mx-auto text-slate-700 mb-4" />
          <p className="text-slate-400">No bookmarks yet.</p>
          <p className="text-sm text-slate-600 mt-2">Tap the bookmark icon while reading to save verses here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((bm, idx) => (
            <div 
              key={idx}
              onClick={() => handleRead(bm.surahNumber)}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl cursor-pointer hover:border-emerald-500 transition-all group animate-slide-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-900/30 text-emerald-400 text-xs px-2 py-1 rounded font-bold">
                    Surah {bm.surahNumber}, Ayah {bm.ayahNumber}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={12} /> {format(bm.timestamp, 'MMM d, yyyy')}
                  </span>
                </div>
                <BookmarkIcon size={16} className="text-emerald-500 fill-current" />
              </div>
              <p className="text-slate-300 text-sm line-clamp-2 italic font-serif">"{bm.text}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // --- MAIN RENDER ---

  return (
    <div className="max-w-md mx-auto md:max-w-2xl lg:max-w-4xl min-h-screen animate-fade-in">
      
      {/* Top Header - Always visible unless deeply nested, but here we change view content */}
      {view === 'dashboard' && (
        <>
          <header className="flex justify-between items-center mb-6 pt-2 animate-slide-up">
             <div className="flex items-center gap-2 text-white">
               <Crown size={24} className="text-yellow-400 fill-current" />
               <h1 className="text-xl font-bold tracking-wide">Al Quran</h1>
             </div>
             <button className="p-2 bg-slate-800 rounded-full text-white hover:rotate-90 transition-transform duration-300">
               <Grid size={20} />
             </button>
          </header>

          <HeroResume />
          <DashboardGrid />
        </>
      )}

      {/* Views */}
      <div className={view === 'dashboard' ? 'hidden' : 'block'}>
        {view === 'surah-index' && <SurahListView />}
        {view === 'juzz-index' && <JuzzListView />}
        {view === 'bookmarks' && <BookmarksView />}
      </div>

    </div>
  );
};

export default QuranTracker;
