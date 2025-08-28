'use client';

import Link from 'next/link';
import { Monitor, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Monitor className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">UpTime</span>
            </div>
            <p className="text-gray-400 mb-6" style={{ fontSize: '13px' }}>
              Keep your websites monitored 24/7 with instant notifications when issues arise. 
              Never miss downtime again.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Services', 'Pricing', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    href={`/${link.toLowerCase()}`} 
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    style={{ fontSize: '13px' }}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((link) => (
                <li key={link}>
                  <Link 
                    href="#" 
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    style={{ fontSize: '13px' }}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-gray-400" style={{ fontSize: '13px' }}>support@uptime.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="text-gray-400" style={{ fontSize: '13px' }}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-gray-400" style={{ fontSize: '13px' }}>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0" style={{ fontSize: '13px' }}>
              © 2024 UpTime. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-gray-400" style={{ fontSize: '13px' }}>
                Status: <span className="text-green-400">All Systems Operational</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}