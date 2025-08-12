import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { FoundingMemberBenefits } from './components/FoundingMemberBenefits';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';

type Variant = 'b2b' | 'b2c';

/**
 * Pick the initial variant from URL, hash, subdomain, or localStorage.
 *
 * Precedence:
 * 1) Query param ?variant= / ?audience=
 * 2) Hash #b2b / #b2c
 * 3) Subdomain b2b.* / b2c.*
 * 4) localStorage 'variant'
 * 5) Default 'b2c'
 */
function resolveInitialVariant(): Variant {
  // Guard for SSR or unusual environments
  if (typeof window === 'undefined') return 'b2c';

  const url = new URL(window.location.href);

  // 1) Query param
  const qp = (url.searchParams.get('variant') || url.searchParams.get('audience') || '').toLowerCase();
  if (qp === 'b2b' || qp === 'b2c') return qp as Variant;

  // 2) Hash
  const hash = (window.location.hash || '').replace('#', '').toLowerCase();
  if (hash === 'b2b' || hash === 'b2c') return hash as Variant;

  // 3) Subdomain
  const host = window.location.hostname.toLowerCase();
  // Handles b2b.resellersradar.com, b2c.resellersradar.com, localhost aliases, etc.
  if (host.startsWith('b2b.')) return 'b2b';
  if (host.startsWith('b2c.')) return 'b2c';

  // 4) localStorage
  try {
    const stored = (window.localStorage.getItem('variant') || '').toLowerCase();
    if (stored === 'b2b' || stored === 'b2c') return stored as Variant;
  } catch {
    // ignore storage errors
  }

  // 5) Default
  return 'b2c';
}

/**
 * Keep URL and localStorage in sync with the chosen variant.
 * The URL gets a ?variant= param (without reloading).
 */
function useVariantSync(currentVariant: Variant) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Update localStorage
    try {
      window.localStorage.setItem('variant', currentVariant);
    } catch {
      // ignore storage errors
    }

    // Update query param without hard navigation
    const url = new URL(window.location.href);
    url.searchParams.set('variant', currentVariant);
    window.history.replaceState({}, '', url.toString());
  }, [currentVariant]);
}

function App() {
  const initialVariant = useMemo(resolveInitialVariant, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<Variant>(initialVariant);

  useVariantSync(currentVariant);

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
