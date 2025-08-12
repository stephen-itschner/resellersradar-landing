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
      {/* Variant Toggle for Demo */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentVariant('b2c')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              currentVariant === 'b2c'
                ? 'bg-[#FF5A3D] text-white'
                : 'text-[#636E72] hover:text-[#102A43]'
            }`}
          >
            B2C
          </button>
          <button
            onClick={() => setCurrentVariant('b2b')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              currentVariant === 'b2b'
                ? 'bg-[#FF5A3D] text-white'
                : 'text-[#636E72] hover:text-[#102A43]'
            }`}
          >
            B2B
          </button>
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