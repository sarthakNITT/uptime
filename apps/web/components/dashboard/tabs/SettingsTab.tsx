'use client';

import { Bell, Globe, Shield, User } from 'lucide-react';

export function SettingsTab() {
  const settingsSections = [
    {
      title: 'Notification Settings',
      icon: Bell,
      description: 'Configure how you receive alerts',
      items: [
        { label: 'Email notifications', enabled: true },
        { label: 'SMS alerts', enabled: false },
        { label: 'Slack integration', enabled: true },
        { label: 'Webhook notifications', enabled: false },
      ],
    },
    {
      title: 'Global Settings',
      icon: Globe,
      description: 'Default monitoring configuration',
      items: [
        { label: 'Default check interval: 60 seconds', enabled: true },
        { label: 'Global monitoring regions: 5 active', enabled: true },
        { label: 'Auto-pause on maintenance', enabled: true },
      ],
    },
    {
      title: 'Security Settings',
      icon: Shield,
      description: 'Account security and access',
      items: [
        { label: 'Two-factor authentication', enabled: false },
        { label: 'API key access', enabled: true },
        { label: 'Audit logs', enabled: true },
      ],
    },
    {
      title: 'Account Settings',
      icon: User,
      description: 'Profile and subscription details',
      items: [
        { label: 'Email: user@example.com', enabled: true },
        { label: 'Plan: Professional', enabled: true },
        { label: 'Billing: Monthly', enabled: true },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {settingsSections.map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.title} className="bg-bg-800 rounded-card border border-white/10">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center space-x-3 mb-2">
                <Icon className="w-5 h-5 text-accent-ice" />
                <h3 className="text-lg font-semibold text-text-100">{section.title}</h3>
              </div>
              <p className="text-sm text-muted-400">{section.description}</p>
            </div>
            <div className="p-6 space-y-4">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-text-100">{item.label}</span>
                  <button
                    className={`w-10 h-6 rounded-full border-2 transition-colors ${
                      item.enabled
                        ? 'bg-accent-ice/20 border-accent-ice'
                        : 'bg-transparent border-white/20'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full transition-transform ${
                        item.enabled
                          ? 'transform translate-x-4 bg-accent-ice'
                          : 'transform translate-x-0 bg-white/40'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}