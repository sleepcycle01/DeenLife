
import React, { useEffect, useState } from 'react';
import { Coordinates } from 'adhan';
import { DEFAULT_COORDINATES } from '../constants';
import { Sun, Moon, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const Home: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [locationName, setLocationName] = useState("Locating...");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Simple mock reverse geocoding or just showing generic text
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationName("Current Location"),
        () => setLocationName("Mecca (Default)")
      );
    } else {
      setLocationName("Mecca (Default)");
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mb-8 animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          As-salamu alaykum
        </h1>
        <p className="text-slate-400">
          Welcome back to your spiritual journey.
        </p>
      </header>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden animate-scale-in delay-100">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-emerald-100 font-medium mb-1 flex items-center gap-2">
                <MapPin size={16} /> {locationName}
              </p>
              <h2 className="text-4xl font-bold">{format(currentTime, 'h:mm a')}</h2>
              <p className="text-emerald-100">{format(currentTime, 'EEEE, d MMMM yyyy')}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <Sun size={32} className="text-yellow-300" />
            </div>
          </div>
          
          <div className="space-y-1">
             <p className="text-sm text-emerald-100 uppercase tracking-wider font-semibold">Next Prayer</p>
             <p className="text-2xl font-bold">Calculation in Prayer Tab</p>
          </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-12 -mb-12 blur-2xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up delay-200">
        {/* Daily Verse / Hadith Placeholder */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
            <BookOpenIcon /> Daily Inspiration
          </h3>
          <blockquote className="italic text-slate-300 text-lg leading-relaxed mb-4">
            "Verily, with hardship comes ease."
          </blockquote>
          <p className="text-sm text-slate-500 text-right">— Surah Al-Sharh (94:6)</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 p-4 rounded-xl text-center hover:bg-slate-700 transition cursor-pointer hover:scale-105 duration-200">
              <div className="mx-auto w-10 h-10 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-2">
                <Calendar size={20} />
              </div>
              <span className="text-sm font-medium">Log Habit</span>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl text-center hover:bg-slate-700 transition cursor-pointer hover:scale-105 duration-200">
               <div className="mx-auto w-10 h-10 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mb-2">
                <Moon size={20} />
              </div>
              <span className="text-sm font-medium">Read Quran</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Icon
const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

export default Home;