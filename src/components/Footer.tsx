import React from 'react';
import lightModeLogo from '../../public/darkModeLogoText_transparent.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#102A43] text-white py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8 items-start">
          {/* Logo */}
          <div>
            <img
              src={lightModeLogo}
              alt="Resellers Radar Logo"
              className="h-28 w-auto mb-4"
            />
            {/* Social Buttons */}
            {/*
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            */}
          </div>

          {/* Middle column with description */}
          <div>
            <p className="text-white/70 max-w-md text-sm leading-relaxed">
              AI-powered photo-based object appraisal for smart resellers.
              Turn any photo into profit with instant, accurate pricing.
            </p>
          </div>

          {/* Product column on far right */}
          <div>
            <h4 className="font-semibold mb-3 font-['Clash_Display'] text-base">
              Product
            </h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="text-white/70 mb-3 md:mb-0">
              © 2025 Resellers Radar. All rights reserved.
            </div>
            <div className="flex space-x-4 text-white/70">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
