import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Habits from './pages/Habits';
import PrayerTimesPage from './pages/PrayerTimes';
import QiblaPage from './pages/Qibla';
import QuranPage from './pages/Quran';
import QuranTracker from './pages/QuranTracker';
import QuranReader from './pages/QuranReader';
import HadithCollection from './pages/HadithCollection';
import DuaCollection from './pages/DuaCollection';
import Assistant from './pages/Assistant';
import { PageRoute } from './types';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* All routes are now public */}
          <Route path={PageRoute.HOME} element={<Home />} />
          <Route path={PageRoute.HABITS} element={<Habits />} />
          <Route path={PageRoute.QURAN_TRACKER} element={<QuranTracker />} />
          <Route path={PageRoute.QURAN_AUDIO} element={<QuranPage />} />
          <Route path="/read/:surahId" element={<QuranReader />} />
          <Route path={PageRoute.HADITH} element={<HadithCollection />} />
          <Route path={PageRoute.DUA} element={<DuaCollection />} />
          <Route path={PageRoute.PRAYER} element={<PrayerTimesPage />} />
          <Route path={PageRoute.QIBLA} element={<QiblaPage />} />
          <Route path={PageRoute.ASSISTANT} element={<Assistant />} />
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to={PageRoute.HOME} replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;