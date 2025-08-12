import React from 'react';
import { Radar, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FF5A3D] to-[#00B49F] rounded-lg flex items-center justify-center">
              <Radar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-[#102A43] font-['Clash_Display']">
              Resellers Radar
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-[#636E72] hover:text-[#102A43] transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-[#636E72] hover:text-[#102A43] transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-[#636E72] hover:text-[#102A43] transition-colors">
              About
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-[#636E72] hover:text-[#102A43] transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2 bg-[#FF5A3D] text-white rounded-lg hover:bg-[#FF5A3D]/90 transition-colors font-medium">
              Pre-Order Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#102A43]" />
            ) : (
              <Menu className="w-6 h-6 text-[#102A43]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-[#636E72] hover:text-[#102A43] transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-[#636E72] hover:text-[#102A43] transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-[#636E72] hover:text-[#102A43] transition-colors">
                About
              </a>
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                <button className="text-left text-[#636E72] hover:text-[#102A43] transition-colors">
                  Sign In
                </button>
                <button className="px-6 py-2 bg-[#FF5A3D] text-white rounded-lg hover:bg-[#FF5A3D]/90 transition-colors font-medium text-center">
                  Pre-Order Now
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};