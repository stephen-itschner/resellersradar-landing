import React from 'react';
import { Camera, Scissors, MessageCircle, BarChart3, Layout, Share2, Zap, Users, TrendingUp, Shield } from 'lucide-react';

interface FeaturesProps {
  variant: 'b2c' | 'b2b';
}

export const Features: React.FC<FeaturesProps> = ({ variant }) => {
  const b2cFeatures = [
    {
      icon: Camera,
      title: "Snap & Upload",
      description: "Take photos with your phone or upload from gallery. Multiple objects per photo supported.",
      gif: "📸 GIF: User taking photo of vintage items at garage sale"
    },
    {
      icon: Scissors,
      title: "Smart Object Detection",
      description: "AI automatically identifies and segments individual items in cluttered photos.",
      gif: "✂️ GIF: Photo being automatically segmented into individual objects"
    },
    {
      icon: MessageCircle,
      title: "Interactive AI Chat",
      description: "Refine appraisals through conversation. Ask about condition, rarity, or market trends.",
      gif: "💬 GIF: Chat interface showing price refinements based on condition"
    },
    {
      icon: BarChart3,
      title: "Transparent Data",
      description: "See exactly how prices are calculated with recent sales, market trends, and condition factors.",
      gif: "📊 GIF: Detailed breakdown showing comparable sales and pricing factors"
    },
    {
      icon: Layout,
      title: "Item Dashboard",
      description: "Track your finds, profits, and inventory in one organized place.",
      gif: "📋 GIF: Dashboard showing tracked items with profit calculations"
    },
    {
      icon: Share2,
      title: "Multi-Platform Posting",
      description: "List items on eBay, Etsy, Facebook Marketplace, and more with one click.",
      gif: "🚀 GIF: Single item being posted to multiple platforms simultaneously"
    }
  ];

  const b2bFeatures = [
    {
      icon: Zap,
      title: "Bulk Processing",
      description: "Process hundreds of items simultaneously with batch upload and automated categorization.",
      gif: "⚡ GIF: Bulk upload interface processing multiple items at once"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Multi-user access with role-based permissions and shared inventory management.",
      gif: "👥 GIF: Team dashboard showing multiple users working on inventory"
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Detailed reporting on inventory turnover, profit margins, and market performance.",
      gif: "📈 GIF: Comprehensive analytics dashboard with charts and metrics"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliant with encrypted data storage and secure API integrations.",
      gif: "🔒 GIF: Security dashboard showing compliance certifications"
    },
    {
      icon: BarChart3,
      title: "Market Intelligence",
      description: "Real-time market data, seasonal trends, and competitive pricing insights.",
      gif: "🎯 GIF: Market intelligence dashboard showing trends and opportunities"
    },
    {
      icon: Share2,
      title: "Platform Integrations",
      description: "Direct integration with your existing POS, inventory management, and e-commerce systems.",
      gif: "🔗 GIF: Integration flow showing data syncing across platforms"
    }
  ];

  const features = variant === 'b2c' ? b2cFeatures : b2bFeatures;
  const sectionTitle = variant === 'b2c' 
    ? "Everything you need to find hidden treasures"
    : "Enterprise-grade tools for scaling your business";

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#00B49F]/10 rounded-full mb-6">
            <span className="text-sm font-medium text-[#00B49F]">
              ✨ Powered by Advanced AI
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#102A43] mb-6 font-['Clash_Display']">
            {sectionTitle}
          </h2>
          <p className="text-lg text-[#636E72] max-w-2xl mx-auto">
            {variant === 'b2c' 
              ? "From photo to profit in seconds. Our AI does the heavy lifting so you can focus on finding great deals."
              : "Streamline operations, reduce errors, and maximize profitability with AI-powered inventory intelligence."
            }
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-[#F8F5F0] rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FF5A3D]/10 rounded-xl mb-6 group-hover:bg-[#FF5A3D]/20 transition-colors">
                <feature.icon className="w-6 h-6 text-[#FF5A3D]" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-[#102A43] mb-4 font-['Clash_Display']">
                {feature.title}
              </h3>
              <p className="text-[#636E72] mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* GIF Placeholder */}
              <div className="bg-gradient-to-br from-[#FF5A3D]/5 to-[#00B49F]/5 rounded-xl p-4 border-2 border-dashed border-[#FF5A3D]/20">
                <div className="text-center">
                  <div className="w-full h-32 bg-gradient-to-br from-[#FF5A3D]/10 to-[#00B49F]/10 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-2xl">🎬</span>
                  </div>
                  <p className="text-sm text-[#636E72] italic">
                    {feature.gif}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#FF5A3D]/10 via-[#FFCC3D]/10 to-[#00B49F]/10 rounded-2xl p-8 border border-[#FF5A3D]/20">
            <h3 className="text-2xl font-semibold text-[#102A43] mb-4 font-['Clash_Display']">
              {variant === 'b2c' 
                ? "Ready to turn photos into profit?"
                : "Ready to scale your business with AI?"
              }
            </h3>
            <p className="text-[#636E72] mb-6 max-w-2xl mx-auto">
              {variant === 'b2c'
                ? "Join 2,300+ resellers who are already finding hidden treasures with Resellers Radar."
                : "Join 150+ businesses already using AI to optimize their inventory and pricing strategies."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-[#FF5A3D] text-white rounded-xl hover:bg-[#FF5A3D]/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Secure Your Founding Member Spot
              </button>
              <button className="px-8 py-4 border-2 border-[#102A43] text-[#102A43] rounded-xl hover:bg-[#102A43] hover:text-white transition-all duration-200 font-semibold">
                Join Waitlist (Free)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};