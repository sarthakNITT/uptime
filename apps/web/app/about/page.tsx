'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { Users, Globe, Shield, Zap } from 'lucide-react';
import { useAccessibility } from '../../providers/AccessibilityProvider';

export default function AboutPage() {
  const { animationsEnabled } = useAccessibility();

  return (
    <div className="min-h-screen bg-bg-900">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-text-100 mb-6"
              initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
              animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
            >
              Building the Future of Monitoring
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-400 max-w-3xl mx-auto"
              initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
              animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
              transition={animationsEnabled ? { delay: 0.1 } : undefined}
            >
              We believe every business deserves reliable monitoring that&apos;s simple to set up, 
              powerful to use, and affordable to scale.
            </motion.p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-800/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { label: 'Happy Customers', value: '10,000+', icon: Users },
                { label: 'Global Locations', value: '25+', icon: Globe },
                { label: 'Uptime Guarantee', value: '99.9%', icon: Shield },
                { label: 'Avg Response Time', value: '<100ms', icon: Zap },
              ].map((stat, index) => {
                const Icon = stat.icon;
                const MotionDiv = animationsEnabled ? motion.div : 'div';
                
                return (
                  <MotionDiv
                    key={stat.label}
                    initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
                    animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
                    transition={animationsEnabled ? { delay: index * 0.1 } : undefined}
                  >
                    <Icon className="w-8 h-8 text-accent-ice mx-auto mb-4" />
                    <div className="text-3xl font-bold text-text-100 mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-400">{stat.label}</div>
                  </MotionDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-100 mb-4">Our Story</h2>
              <p className="text-muted-400">
                Born from the frustration of complex monitoring tools that were expensive and hard to use.
              </p>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <div className="bg-bg-800 rounded-card p-8 border border-white/10">
                <p className="text-muted-400 leading-relaxed mb-6">
                  UpTime was founded in 2023 by a team of experienced developers who were tired of 
                  overly complex monitoring solutions that required extensive setup and came with 
                  hefty price tags. We wanted to create something different—a monitoring platform 
                  that just works.
                </p>
                <p className="text-muted-400 leading-relaxed mb-6">
                  Our mission is simple: make website and API monitoring accessible to everyone, 
                  from solo developers to enterprise teams. We believe that monitoring shouldn&apos;t 
                  be complicated, expensive, or require a dedicated DevOps team to maintain.
                </p>
                <p className="text-muted-400 leading-relaxed">
                  Today, UpTime serves thousands of customers worldwide, monitoring millions of 
                  checks every day. We&apos;re proud to help businesses of all sizes maintain reliable, 
                  high-performing services for their users.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}