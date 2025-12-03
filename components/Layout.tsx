import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PageRoute } from '../types';
import { Home, CheckSquare, Clock, Compass, Headphones, MessageCircle, Menu, X, BookMarked, ScrollText, Heart } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', icon: Home, path: PageRoute.HOME },
  { label: 'Sunnah Habits', icon: CheckSquare, path: PageRoute.HABITS },
  { label: 'Quran Tracker', icon: BookMarked, path: PageRoute.QURAN_TRACKER },
  { label: 'Quran Audio', icon: Headphones, path: PageRoute.QURAN_AUDIO },
  { label: 'Hadith Collection', icon: ScrollText, path: PageRoute.HADITH },
  { label: 'Dua Collection', icon: Heart, path: PageRoute.DUA },
  { label: 'Prayer Times', icon: Clock, path: PageRoute.PRAYER },
  { label: 'Qibla Finder', icon: Compass, path: PageRoute.QIBLA },
  { label: 'Ask AI', icon: MessageCircle, path: PageRoute.ASSISTANT },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-full">
        <div className="p-6 flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">D</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">DeenLife</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto custom-scrollbar">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-600/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-lg p-3 text-xs text-slate-400 text-center font-medium">
            Copyright © 2025<br/>Made by Umair Mashwani
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-slate-900 z-50 transform transition-transform duration-300 md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="absolute top-4 right-4">
           <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400"><X size={24} /></button>
        </div>
        
        <div className="p-6 flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">D</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">DeenLife</h1>
        </div>

        <nav className="px-4 space-y-2 overflow-y-auto flex-1 custom-scrollbar">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${
                isActive(item.path)
                  ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-600/20'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="text-xs text-slate-500 text-center">
            Copyright © 2025 Made by Umair Mashwani
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">D</span>
            </div>
            <h1 className="text-xl font-bold text-white">DeenLife</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-300">
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto w-full pb-24 md:pb-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;