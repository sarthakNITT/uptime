'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAccessibility } from '../../providers/AccessibilityProvider';

export function PricingTeaser() {
  const { animationsEnabled } = useAccessibility();

  const plans = [
    {
      name: 'Starter',
      price: '$9',
      period: '/month',
      description: 'Perfect for small projects and personal websites',
      features: [
        '5 monitors',
        '1-minute checks',
        'Email alerts',
        'Basic dashboard',
        '30-day history',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'For growing teams and businesses',
      features: [
        '25 monitors',
        '30-second checks',
        'SMS + Email alerts',
        'Advanced analytics',
        '1-year history',
        'Status pages',
        'Slack integration',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations with complex needs',
      features: [
        'Unlimited monitors',
        '10-second checks',
        'All integrations',
        'Custom dashboards',
        'Unlimited history',
        'SLA reports',
        'Priority support',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-100 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-400 max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const MotionDiv = animationsEnabled ? motion.div : 'div';
            
            return (
              <MotionDiv
                key={plan.name}
                className={`relative bg-bg-800 rounded-card p-8 border ${
                  plan.popular 
                    ? 'border-accent-ice/50 glow-sm' 
                    : 'border-white/10'
                } card-hover`}
                initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
                whileInView={animationsEnabled ? { opacity: 1, y: 0 } : undefined}
                transition={animationsEnabled ? { duration: 0.6, delay: index * 0.1 } : undefined}
                viewport={{ once: true }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-accent-ice text-black px-4 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-text-100 mb-2">{plan.name}</h3>
                  <p className="text-muted-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-text-100">{plan.price}</span>
                    {plan.period && <span className="text-muted-400 ml-1">{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-accent-ice flex-shrink-0" />
                      <span className="text-sm text-muted-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.cta === 'Contact Sales' ? '/contact' : '/signup'}
                  className={`group flex items-center justify-center w-full py-3 px-4 rounded-btn font-medium transition-all duration-200 ${
                    plan.popular
                      ? 'bg-accent-ice text-black hover:bg-accent-ice/90 hover:scale-105'
                      : 'bg-white/5 text-text-100 border border-white/20 hover:bg-white/10'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MotionDiv>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-400 text-sm">
            All plans include a 14-day free trial. No credit card required.{' '}
            <Link href="/pricing" className="text-accent-ice hover:underline">
              View detailed pricing →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}