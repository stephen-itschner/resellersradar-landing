import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { FoundingMemberBenefits } from './components/FoundingMemberBenefits';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<'b2c' | 'b2b'>('b2c');

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Variant Toggle (desktop-only, subtle) */}
      <div className="fixed top-2 right-2 z-[9999] hidden md:block">
        <div className="bg-white/75 backdrop-blur rounded-md border border-gray-200 shadow p-1 text-xs opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentVariant('b2c')}
              aria-label="Switch to B2C"
              className={`px-2 py-0.5 rounded transition-colors ${
                currentVariant === 'b2c'
                  ? 'bg-[#FF5A3D] text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              B2C
            </button>
            <button
              onClick={() => setCurrentVariant('b2b')}
              aria-label="Switch to B2B"
              className={`px-2 py-0.5 rounded transition-colors ${
                currentVariant === 'b2b'
                  ? 'bg-[#FF5A3D] text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              B2B
            </button>
          </div>
        </div>
      </div>

      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero variant={currentVariant} />
      <Features variant={currentVariant} />
      <FoundingMemberBenefits />
      <Pricing variant={currentVariant} />
      <Footer />
    </div>
  );
}

export default App;
