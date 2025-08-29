'use client';

import { motion } from 'framer-motion';
import { Check, Star, ArrowRight, X } from 'lucide-react';
import { useAccessibility } from '../../providers/AccessibilityProvider';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/forever',
    description: 'Perfect for trying out UpTime',
    features: [
      '3 monitors',
      '5-minute checks',
      'Email alerts only',
      'Basic dashboard',
      '7-day history',
      'Community support',
    ],
    limitations: [
      'Limited to 3 monitors',
      'No SMS alerts',
      'No integrations',
    ],
    cta: 'Get Started Free',
    popular: false,
    highlighted: false,
  },
  {
    name: 'Starter',
    price: '$9',
    period: '/month',
    description: 'Perfect for small projects and personal websites',
    features: [
      '10 monitors',
      '1-minute checks',
      'Email + SMS alerts',
      'Advanced dashboard',
      '30-day history',
      'Basic integrations',
      'Email support',
    ],
    cta: 'Start Free Trial',
    popular: false,
    highlighted: false,
  },
  {
    name: 'Professional', 
    price: '$29',
    period: '/month',
    description: 'For growing teams and businesses',
    features: [
      '50 monitors',
      '30-second checks',
      'All alert channels',
      'Advanced analytics',
      '1-year history',
      'Status pages (3)',
      'All integrations',
      'Priority support',
      'Custom domains',
    ],
    cta: 'Start Free Trial',
    popular: true,
    highlighted: true,
  },
  {
    name: 'Business',
    price: '$79',
    period: '/month',
    description: 'For established businesses with high traffic',
    features: [
      '200 monitors',
      '10-second checks',
      'All alert channels',
      'Custom dashboards',
      'Unlimited history',
      'Unlimited status pages',
      'White-label options',
      'SLA reports',
      'Phone support',
      'Custom integrations',
    ],
    cta: 'Start Free Trial',
    popular: false,
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with complex needs',
    features: [
      'Unlimited monitors',
      '1-second checks',
      'All features included',
      'Custom deployment',
      'Dedicated infrastructure',
      'Enterprise SSO',
      'Compliance features',
      '99.9% SLA',
      'Dedicated support',
      'Custom contracts',
    ],
    cta: 'Contact Sales',
    popular: false,
    highlighted: false,
  },
];

export function PricingSection() {
  const { animationsEnabled } = useAccessibility();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {plans.map((plan, index) => {
        const MotionDiv = animationsEnabled ? motion.div : 'div';
        
        return (
          <MotionDiv
            key={plan.name}
            className={`relative bg-bg-800 rounded-card p-6 border transition-all duration-200 ${
              plan.highlighted 
                ? 'border-accent-ice/50 glow-sm scale-105' 
                : 'border-white/10 card-hover'
            }`}
            initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
            animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
            transition={animationsEnabled ? { duration: 0.6, delay: index * 0.1 } : undefined}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center space-x-1 bg-accent-ice text-black px-3 py-1 rounded-full text-xs font-semibold">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-text-100 mb-2">{plan.name}</h3>
              <p className="text-xs text-muted-400 mb-4 h-8">{plan.description}</p>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-3xl font-bold text-text-100">{plan.price}</span>
                {plan.period && <span className="text-muted-400 text-sm ml-1">{plan.period}</span>}
              </div>
            </div>

            <ul className="space-y-2 mb-6 min-h-[200px]">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-accent-ice flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-400">{feature}</span>
                </li>
              ))}
              {plan.limitations && plan.limitations.map((limitation) => (
                <li key={limitation} className="flex items-start space-x-2 opacity-60">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-400 line-through">{limitation}</span>
                </li>
              ))}
            </ul>

            <button
              className={`group w-full py-2 px-4 rounded-btn font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
                plan.highlighted
                  ? 'bg-accent-ice text-black hover:bg-accent-ice/90 hover:scale-105'
                  : 'bg-white/5 text-text-100 border border-white/20 hover:bg-white/10'
              }`}
            >
              <span>{plan.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </MotionDiv>
        );
      })}
    </div>
  );
}