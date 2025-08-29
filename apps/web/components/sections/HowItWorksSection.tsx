'use client';

import { motion } from 'framer-motion';
import { Plus, Settings, Bell, BarChart3, Users, Globe, Zap } from 'lucide-react';
import { useAccessibility } from '../../providers/AccessibilityProvider';

const steps = [
  {
    icon: Plus,
    title: 'Add Your Monitors',
    description: 'Simply enter your website or API URL and configure monitoring intervals.',
  },
  {
    icon: Settings,
    title: 'Configure Alerts', 
    description: 'Set up notifications via email, Slack, webhooks, or SMS.',
  },
  {
    icon: Bell,
    title: 'Get Notified',
    description: 'Receive instant alerts when your services experience issues.',
  },
  {
    icon: BarChart3,
    title: 'Track Performance',
    description: 'Monitor response times, uptime trends, and performance metrics.',
  },
  {
    icon: Users,
    title: 'Share Status',
    description: 'Create beautiful status pages to keep your users informed.',
  },
  {
    icon: Globe,
    title: 'Scale Globally',
    description: 'Monitor from multiple locations as your business grows.',
  },
  {
    icon: Zap,
    title: 'Stay Ahead',
    description: 'Proactively fix issues before they impact your users.',
  },
];

export function HowItWorksSection() {
  const { animationsEnabled } = useAccessibility();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-100 mb-4">
            How It Works
          </h2>
          <p className="text-muted-400">
            Get started in minutes with our simple 7-step process.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10"></div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const MotionDiv = animationsEnabled ? motion.div : 'div';
              
              return (
                <MotionDiv
                  key={step.title}
                  className="relative flex items-start space-x-6"
                  initial={animationsEnabled ? { opacity: 0, x: -20 } : false}
                  whileInView={animationsEnabled ? { opacity: 1, x: 0 } : undefined}
                  transition={animationsEnabled ? { duration: 0.6, delay: index * 0.1 } : undefined}
                  viewport={{ once: true }}
                >
                  {/* Step Number */}
                  <div className="relative flex items-center justify-center w-16 h-16 bg-bg-800 border-2 border-accent-ice/20 rounded-full z-10">
                    <div className="flex items-center justify-center w-10 h-10 bg-accent-ice/10 rounded-full">
                      <Icon className="w-5 h-5 text-accent-ice" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-ice rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-black">{index + 1}</span>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-text-100 mb-2">{step.title}</h3>
                    <p className="text-muted-400 leading-relaxed">{step.description}</p>
                  </div>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}