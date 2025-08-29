'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg-900">
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-text-100 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-400 max-w-3xl mx-auto">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-bg-800 rounded-card p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-text-100 mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-100 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-2 text-text-100 placeholder-muted-400 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-100 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-2 text-text-100 placeholder-muted-400 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-100 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-2 text-text-100 placeholder-muted-400 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-100 mb-2">Subject</label>
                  <select className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-2 text-text-100 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Feature Request</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-100 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-2 text-text-100 placeholder-muted-400 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors resize-none"
                    placeholder="Tell us about your project or question..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-ice text-bg-900 py-3 px-4 rounded-btn font-medium hover:bg-accent-ice/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-text-100 mb-6">Other ways to reach us</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      title: 'Email Support',
                      description: 'Get help from our support team',
                      contact: 'support@uptime.com',
                      action: 'mailto:support@uptime.com',
                    },
                    {
                      icon: MessageSquare,
                      title: 'Live Chat',
                      description: 'Chat with us in real-time',
                      contact: 'Available 9 AM - 6 PM EST',
                      action: '#',
                    },
                    {
                      icon: Phone,
                      title: 'Phone Support',
                      description: 'Enterprise customers only',
                      contact: '+1 (555) 123-4567',
                      action: 'tel:+15551234567',
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="bg-bg-800 rounded-card p-6 border border-white/10">
                        <div className="flex items-start space-x-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-accent-ice/10 rounded-md">
                            <Icon className="w-6 h-6 text-accent-ice" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-text-100 mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-400 mb-2">{item.description}</p>
                            <a
                              href={item.action}
                              className="text-accent-ice hover:underline font-medium text-sm"
                            >
                              {item.contact}
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Office Information */}
              <div className="bg-bg-800 rounded-card p-6 border border-white/10">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent-ice/10 rounded-md">
                    <MapPin className="w-6 h-6 text-accent-ice" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-100 mb-2">Our Office</h3>
                    <div className="text-sm text-muted-400 space-y-1">
                      <div>123 Innovation Drive</div>
                      <div>San Francisco, CA 94105</div>
                      <div>United States</div>
                    </div>
                  </div>
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