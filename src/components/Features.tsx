import React from 'react';
import {
  Camera,
  Scissors,
  MessageCircle,
  BarChart3,
  Layout,
  Share2,
  Zap,
  Users,
  TrendingUp,
  Shield,
} from 'lucide-react';

interface FeaturesProps {
  variant: 'b2c' | 'b2b';
}

type FeatureItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  video?: string;
  image?: string;
};

export const Features: React.FC<FeaturesProps> = ({ variant }) => {
  const b2cFeatures: FeatureItem[] = [
    {
      icon: Camera,
      title: 'Snap & Upload',
      description:
        'Snap photos or upload from your gallery. Our AI handles multiple angles and lighting conditions.',
      video: '/photoIngest.mp4',
    },
    {
      icon: Scissors,
      title: 'Smart Object Detection',
      description:
        'Multiple items in one photo? No problem. Our AI identifies and segments individual items in cluttered photos.',
      video: '/smartObjectDetection.mp4',
    },
    {
      icon: MessageCircle,
      title: 'Interactive AI Chat',
      description:
        'Refine appraisals through conversation. Add context, additional photos, or other information to narrow the price range.',
      video: '/interactiveAIChat.mp4',
    },
    {
      icon: BarChart3,
      title: 'Transparent Data',
      description:
        'See exactly how prices are calculated with recent sales, market trends, and condition factors.',
      video: '/transparentData.mp4',
    },
    {
      icon: Layout,
      title: 'Item Dashboard',
      description:
        'Track all your finds in one organized place. Revisit each one to refine, update, or post for sale.',
      video: '/itemDashboard2.mp4',
    },
    {
      icon: Share2,
      title: 'One-Click Listings',
      description:
        'Post to eBay, Etsy, Cherished, and more, with optimized titles and descriptions. Turn appraisal photos into listing photos instantly.',
      image: '/sellForTopDollar.png',
    },
  ];

  const b2bFeatures: FeatureItem[] = [
    {
      icon: Zap,
      title: 'Bulk Processing',
      description:
        'Process hundreds of items simultaneously with batch upload and automated categorization.',
      video: '',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description:
        'Multi-user access with role-based permissions and shared inventory management.',
      video: '',
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description:
        'Detailed reporting on inventory turnover, profit margins, and market performance.',
      video: '',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description:
        'SOC 2 compliant with encrypted data storage and secure API integrations.',
      video: '',
    },
    {
      icon: BarChart3,
      title: 'Market Intelligence',
      description:
        'Real-time market data, seasonal trends, and competitive pricing insights.',
      video: '',
    },
    {
      icon: Share2,
      title: 'Platform Integrations',
      description:
        'Direct integration with your existing POS, inventory management, and e-commerce systems.',
      video: '',
    },
  ];

  const features = variant === 'b2c' ? b2cFeatures : b2bFeatures;
  const sectionTitle =
    variant === 'b2c'
      ? 'Everything you need to find hidden treasures'
      : 'Enterprise-grade tools for scaling your business';

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#00B49F]/10 rounded-full mb-6">
            <span className="text-sm font-medium text-[#00B49F]">
              ✨ Powered by Advanced AI + Real Comps
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#102A43] mb-6 font-['Clash_Display']">
            {sectionTitle}
          </h2>
          <p className="text-lg text-[#636E72] max-w-2xl mx-auto">
            {variant === 'b2c'
              ? 'From photo to price tag in seconds. Our AI does the heavy lifting so you can focus on finding great deals.'
              : 'Streamline operations, reduce errors, and maximize profitability with AI-powered inventory intelligence.'}
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

              {/* Media box: fixed 9:16 area; videos and image share it */}
              <div
                className="rounded-xl overflow-hidden border border-[#FF5A3D]/20 mx-auto w-full max-w-[360px] bg-black"
                style={{ aspectRatio: '9/16' }}
              >
                {feature.video ? (
                  <video
                    src={feature.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
                    className="w-full h-full object-contain"
                  />
                ) : feature.image ? (
                  <img
                    src={feature.image}
                    alt={`${feature.title} illustration`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#FF5A3D]/10 to-[#00B49F]/10 flex items-center justify-center">
                    <span className="text-2xl">🎬</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#FF5A3D]/10 via-[#FFCC3D]/10 to-[#00B49F]/10 rounded-2xl p-8 border border-[#FF5A3D]/20">
            <h3 className="text-2xl font-semibold text-[#102A43] mb-4 font-['Clash_Display']">
              {variant === 'b2c'
                ? 'Ready to turn pictures into price tags?'
                : 'Ready to scale your business with AI?'}
            </h3>
            <p className="text-[#636E72] mb-6 max-w-2xl mx-auto">
              {variant === 'b2c'
                ? 'Join resellers who are finding hidden treasures with Resellers Radar.'
                : 'Join businesses already using AI to optimize their inventory and pricing strategies.'}
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
