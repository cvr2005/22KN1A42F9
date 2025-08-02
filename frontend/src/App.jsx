import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenerPage from './pages/ShortenerPage';
import StatisticsPage from './pages/StatisticsPage';
import Redirector from './pages/Redirector';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="/:shortCode" element={<Redirector />} />
      </Routes>
    </Router>
  );
}
