
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SunnahHabitsApp } from './SunnahHabitsApp';
import Home from './Home';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Individual Routes for each section */}
        <Route path="/habits" element={<SunnahHabitsApp />} />
        <Route path="/quran" element={<SunnahHabitsApp />} />
        <Route path="/audio" element={<SunnahHabitsApp />} />
        <Route path="/hadith" element={<SunnahHabitsApp />} />
        <Route path="/dua" element={<SunnahHabitsApp />} />
        <Route path="/prayers" element={<SunnahHabitsApp />} />
        <Route path="/qibla" element={<SunnahHabitsApp />} />

        {/* Fallback/Redirect for old route or unknown paths */}
        <Route path="/app" element={<Navigate to="/habits" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
