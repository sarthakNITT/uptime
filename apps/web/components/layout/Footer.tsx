'use client';

import Link from 'next/link';
import { Activity, Github, Twitter, Linkedin } from 'lucide-react';
import { useAccessibility } from '../../providers/AccessibilityProvider';

export function Footer() {
  const { toggleAnimations, toggleScrollEffects, animationsEnabled, scrollEffectsEnabled } = useAccessibility();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'API', href: '/docs/api' },
        { name: 'Status', href: '/status/uptime' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Help Center', href: '/help' },
        { name: 'Tutorials', href: '/tutorials' },
        { name: 'Community', href: '/community' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/legal/privacy' },
        { name: 'Terms of Service', href: '/legal/terms' },
        { name: 'Cookie Policy', href: '/legal/cookies' },
        { name: 'DPA', href: '/legal/dpa' },
      ],
    },
  ];

  return (
    <footer className="bg-bg-800 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-accent-ice/10 rounded-md">
                <Activity className="w-5 h-5 text-accent-ice" />
              </div>
              <span className="text-xl font-bold text-text-100">UpTime</span>
            </Link>
            <p className="text-muted-400 mb-6 max-w-sm">
              Monitor your websites and APIs with real-time alerts and detailed analytics. 
              Built for developers, loved by teams.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-muted-400 hover:text-accent-ice transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-400 hover:text-accent-ice transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-400 hover:text-accent-ice transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Accessibility Controls */}
            <div className="border-t gap-2 flex flex-col border-white/10 pt-6">
              <h4 className="text-sm font-semibold text-text-100 mb-3">Accessibility</h4>
              <div className="space-y-2">
                <button
                  onClick={toggleAnimations}
                  className={`text-xs px-3 py-1 rounded-btn border transition-colors ${
                    animationsEnabled 
                      ? 'border-accent-ice/50 text-accent-ice bg-accent-ice/10' 
                      : 'border-white/20 text-muted-400 hover:bg-white/5'
                  }`}
                >
                  {animationsEnabled ? 'Disable' : 'Enable'} Animations
                </button>
                <button
                  onClick={toggleScrollEffects}
                  className={`text-xs px-3 py-1 rounded-btn border transition-colors ml-2 ${
                    scrollEffectsEnabled 
                      ? 'border-accent-ice/50 text-accent-ice bg-accent-ice/10' 
                      : 'border-white/20 text-muted-400 hover:bg-white/5'
                  }`}
                >
                  {scrollEffectsEnabled ? 'Disable' : 'Enable'} Scroll Effects
                </button>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-text-100 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-400 hover:text-text-100 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-400">
            © {new Date().getFullYear()} UpTime. All rights reserved.
          </p>
          <p className="text-sm text-muted-400 mt-4 md:mt-0">
            Built with ❤️ for developers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}