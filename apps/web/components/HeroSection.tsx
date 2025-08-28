'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@repo/ui/button';
import WorldMap from './WorldMap';

export default function HeroSection() {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const words = useMemo(() => ['Notified', 'Online'], []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = words[wordIndex] ?? "";
      
      if (!isDeleting) {
        setCurrentWord(current.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        
        if (charIndex === current.length - 1) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentWord(current.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        
        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 100 : 150);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Animated World Map Background */}
      <div className="absolute inset-0">
        <WorldMap />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Stay </span>
            <span className="text-blue-400 min-w-[200px] inline-block text-left">
              {currentWord}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: '13px' }}>
            UpTime is a SaaS tool for developers to monitor their websites. If your site goes down, 
            we notify you instantly via email or phone call.
          </p>
          
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white border-0 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
            style={{ fontSize: '13px' }}
          >
            Get Started
          </Button>
        </div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-5"></div>
    </section>
  );
}