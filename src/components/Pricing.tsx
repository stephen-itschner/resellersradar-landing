import React from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';

interface PricingProps {
  variant: 'b2c' | 'b2b';
}

export const Pricing: React.FC<PricingProps> = ({ variant }) => {
  const b2cPlans = [
    {
      name: "Waitlist",
      price: "Free",
      period: "",
      description: "Get notified when we launch",
      features: [
        "Early access notification",
        "Product updates",
        "No commitment"
      ],
      cta: "Join Waitlist",
      popular: false,
      ctaStyle: "border"
    },
    {
      name: "Founding Member",
      price: "$1",
      period: " first month",
      originalPrice: "$10",
      description: "Limited to 30 spots - 22 remaining",
      features: [
        "Everything in Standard plan",
        "Lifetime 30% discount, any plan",
        "Early access to features",
        "Direct input on development",
        "Priority support",
        "No charges until launch day",
        "Cancel anytime"
      ],
      cta: "Secure Your Spot",
      popular: true,
      ctaStyle: "primary",
      badge: "Only 22 Left"
    },
    {
      name: "Standard (Future)",
      price: "$10+",
      period: "/month",
      description: "Full access when we launch",
      features: [
        "Basic photo appraisals",
        "Multi-object detection",
        "Interactive AI chat",
        "Market data & trends"
      ],
      cta: "Available at Launch",
      popular: false,
      ctaStyle: "disabled"
    }
  ];

  const b2bPlans = [
    {
      name: "Waitlist",
      price: "Free",
      period: "",
      description: "Get notified when we launch",
      features: [
        "Early access notification",
        "Product updates",
        "No commitment"
      ],
      cta: "Join Waitlist",
      popular: false,
      ctaStyle: "border"
    },
    {
      name: "Founding Member",
      price: "$199",
      period: "/month",
      originalPrice: "$299",
      description: "Perfect for small businesses",
      features: [
        "Up to 1,000 appraisals/month",
        "Basic team collaboration",
        "Standard integrations",
        "Email support",
        "Basic analytics"
      ],
      cta: "Secure Your Spot - $1 first month",
      popular: true,
      ctaStyle: "primary",
      badge: "Most Popular"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large-scale operations",
      features: [
        "Up to unlimited appraisals",
        "White-label options",
        "Custom integrations",
        "Dedicated support",
        "Advanced security",
      ],
      cta: "Contact Sales",
      popular: false,
      ctaStyle: "border"
    }
  ];

  const plans = variant === 'b2c' ? b2cPlans : b2bPlans;

  return (
    <section id="pricing" className="py-20 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#FFCC3D]/20 rounded-full mb-6">
            <Star className="w-4 h-4 text-[#FFCC3D] mr-2" />
            <span className="text-sm font-medium text-[#102A43]">
              {variant === 'b2c' ? "Limited Time Founding Member Offer" : "Enterprise-Ready Pricing"}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#102A43] mb-6 font-['Clash_Display']">
            {variant === 'b2c' 
              ? "Choose Your Path to Profit"
              : "Scale Your Business with AI"
            }
          </h2>
          <p className="text-lg text-[#636E72] max-w-2xl mx-auto">
            {variant === 'b2c'
              ? "Start free or secure your founding member benefits. No hidden fees, cancel anytime."
              : "Flexible pricing that grows with your business. All plans include free demo and setup."
            }
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-[#FF5A3D] shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-[#FF5A3D]/30'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#FF5A3D] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    {plan.popular && <Crown className="w-4 h-4 mr-1" />}
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-[#102A43] mb-2 font-['Clash_Display']">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  {plan.originalPrice && (
                    <span className="text-lg text-[#636E72] line-through mr-2">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-[#102A43] font-['IBM_Plex_Mono']">
                    {plan.price}
                  </span>
                  <span className="text-[#636E72]">{plan.period}</span>
                </div>
                <p className="text-[#636E72]">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-[#2F9D52] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#636E72]">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button 
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
                  plan.ctaStyle === 'primary'
                    ? 'bg-[#FF5A3D] text-white hover:bg-[#FF5A3D]/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : plan.ctaStyle === 'border'
                    ? 'border-2 border-[#102A43] text-[#102A43] hover:bg-[#102A43] hover:text-white'
                    : 'bg-gray-100 text-[#636E72] cursor-not-allowed'
                }`}
                disabled={plan.ctaStyle === 'disabled'}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        {variant === 'b2c' ? (
          <div className="bg-gradient-to-r from-[#FF5A3D]/10 to-[#00B49F]/10 rounded-2xl p-8 text-center border border-[#FF5A3D]/20">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#FF5A3D] mr-2" />
              <span className="text-lg font-semibold text-[#102A43]">
                Act Fast - Founding Member Spots Filling Up
              </span>
            </div>
            <p className="text-[#636E72] mb-6 max-w-2xl mx-auto">
              Join 8 other founding members who've already secured their lifetime discount. 
              Only 22 spots remain at this exclusive price.
            </p>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2F9D52] font-['IBM_Plex_Mono']">30%</div>
                <div className="text-sm text-[#636E72]">Lifetime Discount</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF5A3D] font-['IBM_Plex_Mono']">$0</div>
                <div className="text-sm text-[#636E72]">Until Launch</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00B49F] font-['IBM_Plex_Mono']">22</div>
                <div className="text-sm text-[#636E72]">Spots Left</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-[#102A43] mb-4 font-['Clash_Display']">
              Need a Custom Solution?
            </h3>
            <p className="text-[#636E72] mb-6 max-w-2xl mx-auto">
              We work with businesses of all sizes. Contact our team to discuss 
              custom pricing, integrations, and enterprise features.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};