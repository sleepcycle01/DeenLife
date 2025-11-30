
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Star, Heart, BookOpen, Compass, Menu, X, ArrowRight, Sparkles, Headphones, Book, Lightbulb, Clock } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Directly navigate to the path
  const navigateToTab = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: 'Sunnah Habits', path: '/habits', icon: Sparkles },
    { label: 'Quran Tracker', path: '/quran', icon: BookOpen },
    { label: 'Quran Audio', path: '/audio', icon: Headphones },
    { label: 'Hadith Collection', path: '/hadith', icon: Book },
    { label: 'Dua Collection', path: '/dua', icon: Lightbulb },
    { label: 'Prayer Times', path: '/prayers', icon: Clock },
    { label: 'Qibla Finder', path: '/qibla', icon: Compass },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1537181534458-76d64098909b?q=80&w=1974&auto=format&fit=crop")', // Makkah (Kaaba) image
          filter: 'grayscale(30%)' 
        }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-900/80"></div>

      {/* Hamburger Menu Button */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors z-20 rounded-full hover:bg-slate-800/50 focus:outline-none"
        aria-label="Open Menu"
      >
        <Menu className="w-8 h-8" />
      </button>

      {/* Full Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-sm animate-fade-in-up">
          {/* Close Button - Top Right */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800/50 focus:outline-none z-60"
            aria-label="Close Menu"
          >
            <X className="w-8 h-8" />
          </button>
          
          {/* Pro Menu Card */}
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700/50 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            
            {/* Decorative Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.8)]"></div>

            <div className="mb-6 text-center relative z-10">
               <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">DeenLife</h2>
               <p className="text-xs text-blue-400 font-medium uppercase tracking-[0.2em]">Navigation</p>
            </div>

            <nav className="flex flex-col w-full gap-2 relative z-10">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigateToTab(item.path)}
                  className="group flex items-center w-full p-3 rounded-xl text-left transition-all duration-200 hover:bg-slate-800 border border-transparent hover:border-slate-700"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 group-hover:bg-slate-700 text-blue-400 group-hover:text-blue-300 transition-colors mr-4">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="flex-1 text-base font-medium text-slate-200 group-hover:text-white">{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto animate-fade-in-up py-12 flex flex-col items-center">
        
        {/* Logo */}
        <div className="relative w-20 h-20 mb-6 bg-slate-800/50 backdrop-blur-md rounded-2xl flex items-center justify-center border border-slate-700/50 shadow-2xl">
          <Moon className="w-10 h-10 text-blue-400" />
          <Star className="w-5 h-5 text-yellow-400 absolute top-3 right-3" />
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-bold text-blue-200 mb-2 tracking-tight">
          DeenLife
        </h1>
        <p className="text-sm text-slate-400 mb-8 font-medium tracking-wide">Built for the Ummah</p>

        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-lg mx-auto font-light">
          Your spiritual companion for a balanced life. Track your daily Sunnah habits, monitor your sleep etiquette, and stay connected with the Quran.
        </p>

        {/* Feature Icons (Minimal Style) */}
        <div className="mt-24 flex flex-wrap justify-center gap-12 sm:gap-20">
          <div className="flex flex-col items-center group cursor-pointer" onClick={() => navigateToTab('/habits')}>
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-800/30 border border-slate-700/30 mb-3 group-hover:bg-slate-800/50 transition-colors">
               <Heart className="w-7 h-7 text-red-400" />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Spiritual Wellness</span>
          </div>
          
          <div className="flex flex-col items-center group cursor-pointer" onClick={() => navigateToTab('/habits')}>
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-800/30 border border-slate-700/30 mb-3 group-hover:bg-slate-800/50 transition-colors">
               <Moon className="w-7 h-7 text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Sunnah Sleep</span>
          </div>

          <div className="flex flex-col items-center group cursor-pointer" onClick={() => navigateToTab('/quran')}>
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-800/30 border border-slate-700/30 mb-3 group-hover:bg-slate-800/50 transition-colors">
               <BookOpen className="w-7 h-7 text-green-400" />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Quran Journey</span>
          </div>

          <div className="flex flex-col items-center group cursor-pointer" onClick={() => navigateToTab('/qibla')}>
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-800/30 border border-slate-700/30 mb-3 group-hover:bg-slate-800/50 transition-colors">
               <Compass className="w-7 h-7 text-red-500" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Qibla Finder</span>
              <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-600 mt-20 font-medium">Copyright &copy; 2025 Made by Umair Mashwani</p>
      </div>
    </div>
  );
};

export default Home;
