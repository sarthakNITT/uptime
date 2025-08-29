'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { HeroHexMap } from '../../components/hero/HeroHexMap';
import { TypingHeadline } from '../../components/hero/TypingHeadline';
import { useAccessibility } from '../../providers/AccessibilityProvider';

export function HeroSection() {
  const { animationsEnabled } = useAccessibility();

  const MotionDiv = animationsEnabled ? motion.div : 'div';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <HeroHexMap />
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <MotionDiv
          initial={animationsEnabled ? { opacity: 0, y: 30 } : false}
          animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
          transition={animationsEnabled ? { duration: 0.8, delay: 0.3 } : undefined}
          className="mb-6"
        >
          <TypingHeadline />
        </MotionDiv>

        <MotionDiv
          initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
          animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
          transition={animationsEnabled ? { duration: 0.8, delay: 0.5 } : undefined}
          className="mb-8"
        >
          <p className="text-lg text-muted-400 max-w-2xl mx-auto leading-relaxed">
            Monitor your websites and APIs with real-time alerts, detailed analytics, 
            and beautiful status pages. Get notified instantly when your services go down.
          </p>
        </MotionDiv>

        <MotionDiv
          initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
          animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
          transition={animationsEnabled ? { duration: 0.8, delay: 0.7 } : undefined}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <button className="group flex items-center space-x-2 bg-accent-ice text-black px-6 py-3 rounded-btn font-medium hover:bg-accent-ice/90 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent-glow">
            <span>Start Monitoring Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group flex items-center space-x-2 border border-white/20 text-text-100 px-6 py-3 rounded-btn font-medium hover:bg-white/5 transition-all duration-200">
            <Play className="w-4 h-4" />
            <span>Watch Demo</span>
          </button>
        </MotionDiv>

        <MotionDiv
          initial={animationsEnabled ? { opacity: 0 } : false}
          animate={animationsEnabled ? { opacity: 1 } : false}
          transition={animationsEnabled ? { duration: 0.8, delay: 1 } : undefined}
          className="mt-12 text-xs text-muted-400"
        >
          No credit card required • 14-day free trial • Cancel anytime
        </MotionDiv>
      </div>

      {/* Scroll Indicator */}
      <MotionDiv
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={animationsEnabled ? { opacity: 0 } : false}
        animate={animationsEnabled ? { opacity: 1 } : false}
        transition={animationsEnabled ? { duration: 0.8, delay: 1.2 } : undefined}
      >
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-ice rounded-full mt-2 animate-bounce"></div>
        </div>
      </MotionDiv>
    </section>
  );
}