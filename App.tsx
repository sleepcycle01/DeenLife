import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { SunnahHabitsApp } from './SunnahHabitsApp';
import Home from './Home'; // Import the new Home component

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* New route for Home page */}
        <Route path="/app" element={<SunnahHabitsApp />} /> {/* SunnahHabitsApp moved to /app */}
        {/* Add more routes here if needed */}
      </Routes>
    </HashRouter>
  );
};

export default App;