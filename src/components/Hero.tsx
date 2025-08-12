import React from 'react';
import { Camera, Zap, TrendingUp, Users } from 'lucide-react';

interface HeroProps {
  variant: 'b2c' | 'b2b';
}

export const Hero: React.FC<HeroProps> = ({ variant }) => {
  const b2cContent = {
    headline: "Snap the pic. Nail the price.",
    subheadline: "Turn any photo into profit with AI-powered instant appraisals. Find hidden treasures at thrift stores, garage sales, and estate sales.",
    stats: [
      { icon: Camera, label: "Photos Analyzed", value: "50K+" },
      { icon: TrendingUp, label: "Avg. Profit Found", value: "$127" },
      { icon: Users, label: "Active Resellers", value: "2.3K+" }
    ]
  };

  const b2bContent = {
    headline: "Scale your business with AI-powered pricing intelligence.",
    subheadline: "Streamline inventory appraisal, reduce pricing errors, and maximize profit margins with enterprise-grade object recognition and market analysis.",
    stats: [
      { icon: TrendingUp, label: "Revenue Increase", value: "34%" },
      { icon: Zap, label: "Faster Appraisals", value: "10x" },
      { icon: Users, label: "Business Partners", value: "150+" }
    ]
  };

  const content = variant === 'b2c' ? b2cContent : b2bContent;

  return (
    <section className="relative bg-gradient-to-br from-[#F8F5F0] via-white to-[#F8F5F0] pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FF5A3D] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#00B49F] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#FFCC3D] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-[#FF5A3D]/10 rounded-full">
                <span className="text-sm font-medium text-[#FF5A3D]">
                  🚀 Founding Members Only - 30 Spots Left
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-[#102A43] leading-tight font-['Clash_Display']">
                {content.headline}
              </h1>
              
              <p className="text-lg lg:text-xl text-[#636E72] leading-relaxed max-w-xl">
                {content.subheadline}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#FF5A3D] text-white rounded-xl hover:bg-[#FF5A3D]/90 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Secure Your Spot - $30/month
              </button>
              <button className="px-8 py-4 border-2 border-[#102A43] text-[#102A43] rounded-xl hover:bg-[#102A43] hover:text-white transition-all duration-200 font-semibold text-lg">
                Join Waitlist (Free)
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-[#FF5A3D] to-[#00B49F] rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <span className="text-sm text-[#636E72]">2,300+ early adopters</span>
              </div>
              <div className="text-sm text-[#636E72]">
                ⭐ 4.9/5 beta rating
              </div>
            </div>
          </div>

          {/* Visual/Demo */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                {/* Mock App Interface */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#102A43]">Quick Appraisal</h3>
                  <div className="w-3 h-3 bg-[#2F9D52] rounded-full animate-pulse"></div>
                </div>
                
                {/* Photo Upload Area */}
                <div className="border-2 border-dashed border-[#00B49F] rounded-xl p-8 text-center bg-[#00B49F]/5">
                  <Camera className="w-12 h-12 text-[#00B49F] mx-auto mb-4" />
                  <p className="text-[#636E72] mb-2">Drop photo or click to upload</p>
                  <p className="text-sm text-[#636E72]">Supports multiple objects per photo</p>
                </div>

                {/* Mock Results */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#2F9D52]/10 rounded-lg">
                    <span className="text-sm font-medium text-[#102A43]">Vintage Camera</span>
                    <span className="text-lg font-bold text-[#2F9D52] font-['IBM_Plex_Mono']">$245-$320</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#FFCC3D]/10 rounded-lg">
                    <span className="text-sm font-medium text-[#102A43]">Leather Bag</span>
                    <span className="text-lg font-bold text-[#FFCC3D] font-['IBM_Plex_Mono']">$85-$120</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2F9D52] font-['IBM_Plex_Mono']">$127</div>
                <div className="text-xs text-[#636E72]">Avg. profit found</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200">
          {content.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FF5A3D]/10 rounded-xl mb-4">
                <stat.icon className="w-6 h-6 text-[#FF5A3D]" />
              </div>
              <div className="text-3xl font-bold text-[#102A43] font-['IBM_Plex_Mono'] mb-2">
                {stat.value}
              </div>
              <div className="text-[#636E72]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};