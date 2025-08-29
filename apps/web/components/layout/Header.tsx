'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, Menu, X, User, Settings, LogOut } from 'lucide-react';
import { useAccessibility } from '../../providers/AccessibilityProvider';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { animationsEnabled } = useAccessibility();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Docs', href: '/docs' },
  ];

  const MotionComponent = animationsEnabled ? motion.header : 'header';

  return (
    <MotionComponent
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-bg-800/95 backdrop-blur-sm border-b border-white/5' 
          : 'bg-transparent'
      }`}
      initial={animationsEnabled ? { y: -100 } : false}
      animate={animationsEnabled ? { y: 0 } : false}
      transition={animationsEnabled ? { duration: 0.6 } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-8 h-8 bg-accent-ice/10 rounded-md group-hover:bg-accent-ice/20 transition-colors">
              <Activity className="w-5 h-5 text-accent-ice" />
            </div>
            <motion.span 
              className="text-xl font-bold text-text-100"
              initial={animationsEnabled ? { opacity: 0, x: -10 } : false}
              animate={animationsEnabled ? { opacity: 1, x: 0 } : false}
              transition={animationsEnabled ? { delay: 0.2 } : undefined}
            >
              UpTime
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-400 hover:text-text-100 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth & User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton>
                <button
                  // href="/login"
                  className="text-sm font-medium text-muted-400 hover:text-text-100 transition-colors"
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button 
                  // href="/signup"
                  className="group flex items-center space-x-2 bg-accent-ice text-black px-4 py-2 text-[12px] rounded-btn font-medium hover:bg-accent-ice/90 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent-glow"
                >
                  Start Free Trial
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 text-muted-400 hover:text-text-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={animationsEnabled ? { opacity: 0, height: 0 } : false}
            animate={animationsEnabled ? { opacity: 1, height: 'auto' } : false}
            exit={animationsEnabled ? { opacity: 0, height: 0 } : undefined}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-bg-800/95 border-t border-white/5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-muted-400 hover:text-text-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-white/5 pt-3 mt-3">
                <SignedOut>
                  <SignInButton>
                    <button
                      // href="/login"
                      className="text-sm mb-2 font-medium text-muted-400 hover:text-text-100 transition-colors"
                    >
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button 
                      // href="/signup"
                      className="group flex items-center space-x-2 bg-accent-ice text-black px-4 py-2 text-[12px] rounded-btn font-medium hover:bg-accent-ice/90 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent-glow"
                    >
                      Start Free Trial
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </MotionComponent>
  );
}