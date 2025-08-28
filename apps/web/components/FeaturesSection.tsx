'use client';

import { Monitor, Mail, Settings, Shield } from 'lucide-react';

const features = [
  {
    icon: Monitor,
    title: 'Website Uptime Monitoring',
    description: 'Continuous monitoring of your website\'s availability with real-time status updates.'
  },
  {
    icon: Mail,
    title: 'Instant Notifications',
    description: 'Get notified immediately via email or phone call when your site goes down.'
  },
  {
    icon: Settings,
    title: 'Easy Service Setup',
    description: 'Simple configuration process to start monitoring your websites in minutes.'
  },
  {
    icon: Shield,
    title: 'Reliable Infrastructure',
    description: 'Built on robust infrastructure to ensure monitoring never stops working.'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Powerful Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontSize: '13px' }}>
            Everything you need to keep your websites running smoothly and stay informed about their status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 group"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400" style={{ fontSize: '13px' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}