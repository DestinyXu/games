import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import GameDetailPage from './components/GameDetailPage';
import './index.css';

// This is a simplified routes structure - in a real app this would be more complex
const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game/:slug" element={<GameDetailPage />} />
              <Route path="/category/:category" element={<HomePage />} />
              <Route path="/popular" element={<HomePage />} />
              <Route path="/new-releases" element={<HomePage />} />
              <Route path="/featured" element={<HomePage />} />
              <Route path="/tags/:tag" element={<HomePage />} />
              <Route path="/search" element={<HomePage />} />
              <Route path="*" element={<div className="container">Page not found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App; 