import React from 'react';
import { Menu, X } from 'lucide-react';
import lightModeLogo from '../../public/darkModeLogoText_transparent.png';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="bg-[#102A43] backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={lightModeLogo}
              alt="Resellers Radar Logo"
              className="h-28 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white hover:text-[#FFCC3D] transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-white hover:text-[#FFCC3D] transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-white hover:text-[#FFCC3D] transition-colors">
              About
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
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
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 border-opacity-20">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-white hover:text-[#FFCC3D] transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-white hover:text-[#FFCC3D] transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-white hover:text-[#FFCC3D] transition-colors">
                About
              </a>
              <div className="pt-4 border-t border-gray-100 border-opacity-20 flex flex-col space-y-3">
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
