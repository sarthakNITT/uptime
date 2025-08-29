'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useAccessibility } from '../../providers/AccessibilityProvider';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CTO at TechFlow',
    company: 'TechFlow',
    content: 'UpTime has been a game-changer for our infrastructure monitoring. The real-time alerts have saved us countless hours of downtime.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'DevOps Engineer',
    company: 'CloudScale',
    content: 'The global monitoring locations give us confidence that our services are accessible worldwide. Best monitoring tool we\'ve used.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Product Manager',
    company: 'StartupXYZ',
    content: 'The status pages are beautiful and keep our customers informed. UpTime helps us maintain trust and transparency.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { animationsEnabled } = useAccessibility();

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-800/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-100 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-muted-400">
            Join thousands of companies that rely on UpTime for their monitoring needs.
          </p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="bg-bg-800 rounded-card p-8 border border-white/10 glow-sm"
              initial={animationsEnabled ? { opacity: 0, x: 20 } : false}
              animate={animationsEnabled ? { opacity: 1, x: 0 } : false}
              exit={animationsEnabled ? { opacity: 0, x: -20 } : undefined}
              transition={animationsEnabled ? { duration: 0.3 } : undefined}
            >
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center space-x-1 mb-6">
                  {Array.from({ length: testimonials[currentIndex]!.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl text-text-100 mb-8 leading-relaxed">
                  &apos;{testimonials[currentIndex]!.content}&apos;
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src={testimonials[currentIndex]!.avatar}
                    alt={`${testimonials[currentIndex]!.name} avatar`}
                    className="w-12 h-12 rounded-full"
                    width={48}
                    height={48}
                  />
                  <div className="text-left">
                    <div className="font-semibold text-text-100">{testimonials[currentIndex]!.name}</div>
                    <div className="text-sm text-muted-400">
                      {testimonials[currentIndex]!.role} at {testimonials[currentIndex]!.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="flex items-center justify-center w-10 h-10 bg-bg-800 border border-white/20 rounded-full hover:bg-white/5 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-muted-400" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-accent-ice' : 'bg-white/20'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="flex items-center justify-center w-10 h-10 bg-bg-800 border border-white/20 rounded-full hover:bg-white/5 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-muted-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}