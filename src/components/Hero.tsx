import React from 'react';
import { Zap, TrendingUp, Users, CheckCircle } from 'lucide-react';

interface HeroProps {
  variant: 'b2c' | 'b2b';
}

export const Hero: React.FC<HeroProps> = ({ variant }) => {
  const b2cContent = {
    headline: (
      <>
        Snap the pic.<br />
        <span style={{ color: '#FF5A3D' }}>Nail the price.</span>
      </>
    ),
    subheadline:
      'Get instant, AI-powered appraisals for any item you photograph. Find hidden treasures at garage sales, thrift stores, and estate sales.',
  };

  const b2bContent = {
    headline: 'Scale your business with AI-powered pricing intelligence.',
    subheadline:
      'Streamline inventory appraisal, reduce pricing errors, and maximize profit margins with enterprise-grade object recognition and market analysis.',
  };

  const content = variant === 'b2c' ? b2cContent : b2bContent;

  return (
    <section className="relative bg-gradient-to-br from-[#F8F5F0] via-white to-[#F8F5F0] pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FF5A3D] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#00B49F] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#FFCC3D] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Callout */}
              <div
                className="inline-flex items-center px-4 py-2 rounded-full"
                style={{ backgroundColor: '#FFCC3D' }}
              >
                <span
                  className="text-sm font-medium flex items-center"
                  style={{ color: '#102A43' }}
                >
                  ⚡ AI-Powered Anything Appraisal
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-[#102A43] leading-tight font-['Clash_Display']">
                {content.headline}
              </h1>

              <p className="text-lg lg:text-xl text-[#636E72] leading-relaxed max-w-xl">
                {content.subheadline}
              </p>
            </div>

            {/* CTA Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#00B49F]/10 text-[#00B49F]">
                  Limited Time
                </span>
                <span className="text-sm text-[#636E72]">Only 30 spots available</span>
              </div>

              <h3 className="text-xl font-semibold text-[#102A43] mb-4">
                Founding Member Benefits
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {[
                  'Lifetime 30% discount',
                  'Early access to features',
                  'No charge until launch',
                  'Cancel anytime',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#00B49F]" />
                    <span className="text-[#102A43]">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Row inside card */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-6 py-3 bg-[#FF5A3D] text-white rounded-xl hover:bg-[#FF5A3D]/90 transition-all duration-200 font-semibold text-base shadow-lg hover:shadow-xl">
                  Secure Your Spot - $0 today
                </button>
                <button className="flex-1 px-6 py-3 border-2 border-[#102A43] text-[#102A43] rounded-xl hover:bg-[#102A43] hover:text-white transition-all duration-200 font-semibold text-base">
                  Join Waitlist (Free)
                </button>
              </div>
            </div>
          </div>

          {/* Visual/Demo Placeholder */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 flex items-center justify-center min-h-[300px]">
              {/* Replace this with actual <video> or <img> for your GIF */}
              <div className="text-center text-[#636E72]">
                <p className="mb-2 font-semibold">[ Feature Demo Placeholder ]</p>
                <p className="text-sm">Embed GIF or short video here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
