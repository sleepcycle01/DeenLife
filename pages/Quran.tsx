
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Search, ChevronDown, Check, User, X, SkipBack, SkipForward, Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react';
import { Surah, Reciter } from '../types';
import { QURAN_API_BASE, RECITERS } from '../constants';
import { getCachedSurahs, cacheSurahs } from '../services/storageService';
import { useNavigate } from 'react-router-dom';

const QuranPage: React.FC = () => {
  const navigate = useNavigate();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [activeReciter, setActiveReciter] = useState<Reciter>(RECITERS[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Playback State
  const [playingSurah, setPlayingSurah] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  // UI State
  const [searchTerm, setSearchTerm] = useState("");
  const [showReciterModal, setShowReciterModal] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const loadSurahs = async () => {
    setLoading(true);
    setError(null);
    const cached = getCachedSurahs();
    if (cached) {
      setSurahs(cached);
      setLoading(false);
    } else {
      try {
        const res = await fetch(`${QURAN_API_BASE}/surah`);
        if (!res.ok) throw new Error("Failed to fetch surahs");
        const data = await res.json();
        if (data.code === 200) {
          setSurahs(data.data);
          cacheSurahs(data.data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (e) {
        console.error("Failed to fetch surahs", e);
        setError("Failed to load list. Please check internet connection.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadSurahs();

    // Initialize Audio Object
    const audio = new Audio();
    audio.preload = "auto"; // Optimize for speed
    audioRef.current = audio;

    // Audio Event Listeners
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onWaiting = () => setIsBuffering(true);
    const onCanPlay = () => setIsBuffering(false);
    const onEnded = () => handleNext(); // Auto-play next

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onCanPlay);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onCanPlay);
      audio.removeEventListener('ended', onEnded);
      audioRef.current = null;
    };
  }, []);

  // Sync Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const loadAndPlay = async (surahNumber: number) => {
    if (!audioRef.current) return;

    const paddedNum = surahNumber.toString().padStart(3, '0');
    const url = `${activeReciter.serverUrl}${paddedNum}.mp3`;

    // Reset State for new track
    setPlayingSurah(surahNumber);
    setIsPlaying(true);
    setIsBuffering(true);
    setCurrentTime(0);
    setDuration(0);

    try {
      audioRef.current.src = url;
      await audioRef.current.play();
      setIsBuffering(false);
    } catch (error) {
      console.warn("Playback error or interruption:", error);
      // Don't reset playing state if it was just an interruption by another play call
    }
  };

  const togglePlay = async (surahNumber: number) => {
    if (!audioRef.current) return;

    if (playingSurah === surahNumber) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) { console.error(e); }
      }
    } else {
      await loadAndPlay(surahNumber);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const time = parseFloat(e.target.value);
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleNext = () => {
    if (playingSurah && playingSurah < 114) {
      loadAndPlay(playingSurah + 1);
    }
  };

  const handlePrev = () => {
    if (playingSurah && playingSurah > 1) {
      loadAndPlay(playingSurah - 1);
    }
  };

  const handleReciterSelect = (reciter: Reciter) => {
    setActiveReciter(reciter);
    setShowReciterModal(false);
    if (playingSurah) {
      // Reload current surah with new reciter
      loadAndPlay(playingSurah);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.name.includes(searchTerm) ||
    String(s.number).includes(searchTerm)
  );

  const currentSurahData = surahs.find(s => s.number === playingSurah);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] relative animate-fade-in">
      
      {/* Top Header Bar */}
      <div className="bg-emerald-600 -mx-4 md:-mx-8 -mt-4 md:-mt-8 p-6 pb-12 mb-[-2rem] text-white shadow-lg relative z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <button onClick={() => navigate(-1)} className="md:hidden">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
             </button>
             <h2 className="text-xl md:text-2xl font-bold">Quran Audio</h2>
          </div>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-100" size={18} />
             <input 
               type="text" 
               placeholder="Search..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="bg-emerald-700/50 border border-emerald-500/50 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-emerald-200/70 focus:outline-none focus:bg-emerald-700 transition w-32 md:w-48 focus:w-64"
             />
          </div>
        </div>
      </div>

      {/* Reciter Selector Card */}
      <div className="max-w-4xl mx-auto w-full px-4 mb-4 relative z-20">
         <button 
           onClick={() => setShowReciterModal(true)}
           className="w-full bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-2xl p-4 flex items-center justify-between shadow-lg transition-transform active:scale-[0.99]"
         >
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-500 overflow-hidden relative">
                   {activeReciter.image ? (
                     <img src={activeReciter.image} alt={activeReciter.name} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-slate-200 text-emerald-600">
                        <User size={24} />
                     </div>
                   )}
               </div>
               <div className="text-left">
                  <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Selected Reciter</p>
                  <h3 className="text-white font-bold text-sm md:text-base">{activeReciter.name}</h3>
               </div>
            </div>
            <ChevronDown className="text-slate-400" />
         </button>
      </div>

      {/* Reciter Modal */}
      {showReciterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
           <div className="bg-white rounded-3xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl animate-scale-in overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="text-lg font-bold text-emerald-600">Select Reciter</h3>
                 <button onClick={() => setShowReciterModal(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <X size={20} className="text-gray-600" />
                 </button>
              </div>
              <div className="overflow-y-auto p-2 custom-scrollbar">
                 {RECITERS.map((reciter) => (
                    <button
                      key={reciter.id}
                      onClick={() => handleReciterSelect(reciter)}
                      className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                        activeReciter.id === reciter.id 
                          ? 'bg-emerald-50 border border-emerald-100' 
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                       <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-500">
                             <User size={24} />
                          </div>
                          {activeReciter.id === reciter.id && (
                             <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1 border-2 border-white">
                                <span className="block w-2 h-2 bg-white rounded-full"></span>
                             </div>
                          )}
                       </div>
                       <div className="text-left flex-1">
                          <h4 className={`font-bold ${activeReciter.id === reciter.id ? 'text-emerald-700' : 'text-gray-800'}`}>
                             {reciter.name}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1">{reciter.subtext}</p>
                       </div>
                       {activeReciter.id === reciter.id && <Check className="text-emerald-500" size={20} />}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Surah List */}
      <div className="flex-1 overflow-y-auto px-0 md:px-0 pb-32 max-w-4xl mx-auto w-full">
         {loading ? (
           <div className="flex justify-center py-20 text-slate-500">
              <Loader2 className="animate-spin" size={32} />
           </div>
         ) : error ? (
           <div className="text-center py-20 text-red-400 bg-red-900/10 rounded-xl mx-4">
              <AlertCircle className="mx-auto mb-2" size={32} />
              <p>{error}</p>
              <button onClick={loadSurahs} className="mt-4 px-4 py-2 bg-red-900/20 rounded hover:bg-red-900/40">Retry</button>
           </div>
         ) : (
           <div className="space-y-3 p-4">
              {filteredSurahs.map((surah, index) => {
                 const isActive = playingSurah === surah.number;
                 const isRowBuffering = isActive && isBuffering;
                 return (
                    <div 
                      key={surah.number}
                      className={`bg-white rounded-2xl p-4 flex items-center justify-between border shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up ${isActive ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-100'}`}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                       <div className="flex items-center gap-4">
                          <span className={`text-sm font-bold w-8 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>{surah.number}.</span>
                          <div>
                             <h4 className={`font-bold ${isActive ? 'text-emerald-700' : 'text-slate-800'}`}>{surah.englishName}</h4>
                             <p className="font-quran text-lg text-emerald-600">{surah.name}</p>
                          </div>
                       </div>

                       <div className="flex items-center gap-2">
                          <button 
                            onClick={() => togglePlay(surah.number)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all border ${
                               isActive 
                                 ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                                 : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                            }`}
                          >
                             {isRowBuffering ? (
                               <Loader2 size={16} className="animate-spin" />
                             ) : (
                               isActive && isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />
                             )}
                             {isActive && isPlaying ? "PAUSE" : "PLAY"}
                          </button>
                       </div>
                    </div>
                 );
              })}
           </div>
         )}
      </div>

      {/* GLOBAL STICKY PLAYER */}
      {playingSurah && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 p-4 pb-8 md:pb-4 animate-slide-up z-40 text-white">
           <div className="max-w-4xl mx-auto">
             
             {/* Track Info & Progress */}
             <div className="flex flex-col mb-4">
                <div className="flex justify-between items-end mb-2">
                   <div>
                      <p className="text-xs text-emerald-400 uppercase tracking-wider font-bold">Now Playing</p>
                      <h3 className="font-bold text-lg">{currentSurahData?.englishName} - {currentSurahData?.name}</h3>
                      <p className="text-xs text-slate-400">{activeReciter.name}</p>
                   </div>
                   <div className="text-xs font-mono text-slate-400">
                      {formatTime(currentTime)} / {formatTime(duration)}
                   </div>
                </div>
                
                {/* Custom Progress Slider */}
                <div className="relative h-2 bg-slate-700 rounded-full group cursor-pointer">
                   <div 
                      className="absolute h-full bg-emerald-500 rounded-full" 
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                   ></div>
                   <input 
                      type="range" 
                      min="0" 
                      max={duration || 100} 
                      value={currentTime} 
                      onChange={handleSeek}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                   />
                </div>
             </div>

             {/* Controls */}
             <div className="flex items-center justify-between">
                
                {/* Volume (Hidden on mobile usually, or small) */}
                <div className="hidden md:flex items-center gap-2 w-1/4">
                   <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-white">
                      {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                   </button>
                   <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-24 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                   />
                </div>

                {/* Main Playback Buttons */}
                <div className="flex items-center justify-center gap-6 w-full md:w-auto">
                   <button onClick={handlePrev} className="text-slate-400 hover:text-white transition">
                      <SkipBack size={24} />
                   </button>
                   
                   <button 
                      onClick={() => togglePlay(playingSurah)}
                      className="w-12 h-12 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center text-white shadow-lg transition transform hover:scale-105 active:scale-95"
                   >
                      {isBuffering ? (
                        <Loader2 size={24} className="animate-spin" />
                      ) : (
                        isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />
                      )}
                   </button>

                   <button onClick={handleNext} className="text-slate-400 hover:text-white transition">
                      <SkipForward size={24} />
                   </button>
                </div>

                {/* Spacer for layout balance on Desktop */}
                <div className="hidden md:block w-1/4"></div>

             </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default QuranPage;
