import React from 'react';
import { Crown, Users, Percent, Calendar, Shield, Zap } from 'lucide-react';

export const FoundingMemberBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Crown,
      title: "Early Access & Input",
      description: "Get first access to new features and help shape product development",
      highlight: "Exclusive"
    },
    {
      icon: Users,
      title: "Limited to 30 Spots",
      description: "Join an exclusive group of founding members with direct access to our team",
      highlight: "Only 22 Left"
    },
    {
      icon: Percent,
      title: "Lifetime 30% Discount",
      description: "Lock in 30% off forever, plus your first month for just $30",
      highlight: "Save $100s"
    },
    {
      icon: Calendar,
      title: "No Charge Until Launch",
      description: "Reserve your spot now, only pay when the product goes live",
      highlight: "Risk-Free"
    },
    {
      icon: Shield,
      title: "Cancel Anytime",
      description: "No long-term commitment. Cancel your membership whenever you want",
      highlight: "Flexible"
    },
    {
      icon: Zap,
      title: "Priority Support",
      description: "Direct line to our team with priority customer support and feedback",
      highlight: "VIP Access"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#102A43] to-[#102A43]/90 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF5A3D] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#00B49F] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#FFCC3D] rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-[#FF5A3D] rounded-full mb-6">
            <Crown className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-semibold">Founding Member Exclusive</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6 font-['Clash_Display']">
            Join the Inner Circle
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Be part of something special. Founding members get exclusive benefits, 
            early access, and help shape the future of AI-powered reselling.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
            >
              {/* Icon & Highlight */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FF5A3D]/20 rounded-xl">
                  <benefit.icon className="w-6 h-6 text-[#FF5A3D]" />
                </div>
                <span className="px-3 py-1 bg-[#FFCC3D] text-[#102A43] rounded-full text-sm font-semibold">
                  {benefit.highlight}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3 font-['Clash_Display']">
                {benefit.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Urgency Banner */}
        <div className="bg-gradient-to-r from-[#FF5A3D] to-[#FF5A3D]/80 rounded-2xl p-8 text-center border-2 border-[#FF5A3D]/30">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-3 h-3 bg-[#FFCC3D] rounded-full animate-pulse"></div>
            <span className="text-white font-semibold text-lg">
              Only 22 Founding Member Spots Remain
            </span>
            <div className="w-3 h-3 bg-[#FFCC3D] rounded-full animate-pulse"></div>
          </div>
          
          <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-4 font-['Clash_Display']">
            Secure Your Spot for only $30 the first month
          </h3>
          
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            No payment until launch. Cancel anytime. Lock in a lifetime 30% discount now.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-[#FF5A3D] rounded-xl hover:bg-white/90 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Become a Founding Member
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-[#FF5A3D] transition-all duration-200 font-semibold">
              Join Waitlist Instead
            </button>
          </div>

                  </div>
      </div>
    </section>
  );
};