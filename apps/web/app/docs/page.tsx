'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { BookOpen, Code, Zap, Globe } from 'lucide-react';

export default function DocsPage() {
  const sections = [
    {
      title: 'Getting Started',
      icon: Zap,
      items: [
        { name: 'Quick Start Guide', href: '/docs/quickstart' },
        { name: 'Installation', href: '/docs/installation' },
        { name: 'Configuration', href: '/docs/configuration' },
        { name: 'First Monitor', href: '/docs/first-monitor' },
      ],
    },
    {
      title: 'API Reference',
      icon: Code,
      items: [
        { name: 'Authentication', href: '/docs/api/auth' },
        { name: 'Monitors', href: '/docs/api/monitors' },
        { name: 'Alerts', href: '/docs/api/alerts' },
        { name: 'Status Pages', href: '/docs/api/status' },
      ],
    },
    {
      title: 'Integrations',
      icon: Globe,
      items: [
        { name: 'Slack Integration', href: '/docs/integrations/slack' },
        { name: 'Webhooks', href: '/docs/integrations/webhooks' },
        { name: 'Email Alerts', href: '/docs/integrations/email' },
        { name: 'SMS Notifications', href: '/docs/integrations/sms' },
      ],
    },
    {
      title: 'Guides',
      icon: BookOpen,
      items: [
        { name: 'Monitor Types', href: '/docs/guides/monitor-types' },
        { name: 'Alert Rules', href: '/docs/guides/alert-rules' },
        { name: 'Status Pages', href: '/docs/guides/status-pages' },
        { name: 'Best Practices', href: '/docs/guides/best-practices' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-bg-900">
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-text-100 mb-4">
              Documentation
            </h1>
            <p className="text-xl text-muted-400 max-w-3xl mx-auto">
              Everything you need to know about using UpTime for monitoring your services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="bg-bg-800 rounded-card border border-white/10 card-hover">
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className="w-6 h-6 text-accent-ice" />
                      <h2 className="text-lg font-semibold text-text-100">{section.title}</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className="text-sm text-muted-400 hover:text-accent-ice transition-colors block"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Start Preview */}
          <div className="mt-16 bg-bg-800 rounded-card border border-white/10">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-text-100">Quick Start</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent-ice/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-accent-ice">1</span>
                  </div>
                  <h3 className="font-semibold text-text-100 mb-2">Create Account</h3>
                  <p className="text-sm text-muted-400">Sign up for your free UpTime account</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent-ice/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-accent-ice">2</span>
                  </div>
                  <h3 className="font-semibold text-text-100 mb-2">Add Monitor</h3>
                  <p className="text-sm text-muted-400">Enter your website or API URL to monitor</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent-ice/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-accent-ice">3</span>
                  </div>
                  <h3 className="font-semibold text-text-100 mb-2">Get Alerts</h3>
                  <p className="text-sm text-muted-400">Receive notifications when issues occur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}