'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  animationsEnabled: boolean;
  scrollEffectsEnabled: boolean;
  toggleAnimations: () => void;
  toggleScrollEffects: () => void;
  prefersReducedMotion: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [scrollEffectsEnabled, setScrollEffectsEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Load saved preferences
    const savedAnimations = localStorage.getItem('uptime_animations_enabled');
    const savedScrollEffects = localStorage.getItem('uptime_scroll_effects_enabled');
    
    if (savedAnimations !== null) {
      setAnimationsEnabled(JSON.parse(savedAnimations));
    } else if (mediaQuery.matches) {
      setAnimationsEnabled(false);
    }
    
    if (savedScrollEffects !== null) {
      setScrollEffectsEnabled(JSON.parse(savedScrollEffects));
    } else if (mediaQuery.matches) {
      setScrollEffectsEnabled(false);
    }

    // Listen for changes
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches && savedAnimations === null) {
        setAnimationsEnabled(false);
      }
      if (mediaQuery.matches && savedScrollEffects === null) {
        setScrollEffectsEnabled(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Apply global classes based on preferences
    const body = document.body;
    if (!animationsEnabled) {
      body.classList.add('animations-disabled');
    } else {
      body.classList.remove('animations-disabled');
    }
    
    if (!scrollEffectsEnabled) {
      body.classList.add('scroll-effects-disabled');
    } else {
      body.classList.remove('scroll-effects-disabled');
    }
  }, [animationsEnabled, scrollEffectsEnabled]);

  const toggleAnimations = () => {
    const newValue = !animationsEnabled;
    setAnimationsEnabled(newValue);
    localStorage.setItem('uptime_animations_enabled', JSON.stringify(newValue));
  };

  const toggleScrollEffects = () => {
    const newValue = !scrollEffectsEnabled;
    setScrollEffectsEnabled(newValue);
    localStorage.setItem('uptime_scroll_effects_enabled', JSON.stringify(newValue));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        animationsEnabled,
        scrollEffectsEnabled,
        toggleAnimations,
        toggleScrollEffects,
        prefersReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}