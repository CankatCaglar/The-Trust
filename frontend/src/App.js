import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhatIsSection from './components/WhatIsSection';
import HowItWorks from './components/HowItWorks';
import VerificationSection from './components/VerificationSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// Pages
import DocsPage from './pages/DocsPage';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#050505]" data-testid="home-page">
      <Navbar />
      <main>
        <HeroSection />
        <WhatIsSection />
        <HowItWorks />
        <VerificationSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
