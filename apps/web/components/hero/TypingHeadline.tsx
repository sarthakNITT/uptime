'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../providers/AccessibilityProvider';

export function TypingHeadline() {
  const { animationsEnabled } = useAccessibility();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const words = useMemo(() => ['Websites', 'APIs', 'Servers', 'Services'], []);
  const staticText = 'Monitor Your ';

  useEffect(() => {
    if (!animationsEnabled) {
      setCurrentText(words[0] ?? '');
      return;
    }

    const timeout = setTimeout(() => {
      const currentWord = words[currentWordIndex];
      
      if (!isDeleting) {
        setCurrentText(currentWord!.substring(0, currentText.length + 1));
        
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(currentWord!.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, animationsEnabled, words]);

  const MotionH1 = animationsEnabled ? motion.h1 : 'h1';

  return (
    <MotionH1 
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-100 mb-4"
      initial={animationsEnabled ? { opacity: 0 } : false}
      animate={animationsEnabled ? { opacity: 1 } : false}
      transition={animationsEnabled ? { duration: 0.8 } : undefined}
    >
      {staticText}
      <span className="text-accent-ice">
        {animationsEnabled ? currentText : words[0]}
        {animationsEnabled && (
          <motion.span
            className="inline-block w-0.5 h-12 bg-accent-ice ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          />
        )}
      </span>
      <br />
      <span className="text-text-100">With Confidence</span>
    </MotionH1>
  );
}