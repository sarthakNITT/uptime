'use client';

import { motion } from 'framer-motion';
import { Clock, Bell, BarChart3, Globe, Shield, Zap } from 'lucide-react';
import { useAccessibility } from '../../providers/AccessibilityProvider';

const features = [
  {
    icon: Clock,
    title: 'Real-time Monitoring',
    description: 'Check your websites and APIs every 30 seconds from multiple global locations.',
  },
  {
    icon: Bell,
    title: 'Instant Alerts',
    description: 'Get notified via email, SMS, Slack, or webhooks the moment something goes wrong.',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Track uptime trends, response times, and performance metrics over time.',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Monitor from 20+ locations worldwide to ensure global accessibility.',
  },
  {
    icon: Shield,
    title: 'SSL Monitoring',
    description: 'Track SSL certificate expiration and get alerts before they expire.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-second response times with optimized monitoring infrastructure.',
  },
];

export function FeaturesSection() {
  const { animationsEnabled } = useAccessibility();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-100 mb-4">
            Why Choose UpTime?
          </h2>
          <p className="text-muted-400 max-w-2xl mx-auto">
            Built for developers, loved by teams. Monitor everything that matters to your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const MotionDiv = animationsEnabled ? motion.div : 'div';
            
            return (
              <MotionDiv
                key={feature.title}
                className="bg-bg-800 rounded-card p-6 border border-white/10 card-hover"
                initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
                whileInView={animationsEnabled ? { opacity: 1, y: 0 } : undefined}
                transition={animationsEnabled ? { duration: 0.5, delay: index * 0.1 } : undefined}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-accent-ice/10 rounded-md">
                    <Icon className="w-5 h-5 text-accent-ice" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-100">{feature.title}</h3>
                </div>
                <p className="text-muted-400 leading-relaxed">{feature.description}</p>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}