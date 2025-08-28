'use client';

import Link from 'next/link';
import { Button } from '@repo/ui/button';
import { Monitor } from 'lucide-react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Monitor className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors duration-300" />
            <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
              UpTime
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
              style={{ fontSize: '13px' }}
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className="text-white hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
              style={{ fontSize: '13px' }}
            >
              Services
            </Link>
            <Link 
              href="/contact" 
              className="text-white hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
              style={{ fontSize: '13px' }}
            >
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className='flex flex-row gap-4'>
            <SignedOut>
              <SignInButton>
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
                >
                  Login
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button 
                  size="sm"
                  className="bg-blue-600 px-3 rounded-lg hover:bg-blue-700 text-white border-0 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {/* <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
              style={{ fontSize: '13px' }}
            >
              Login
            </Button>
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 text-white border-0 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              style={{ fontSize: '13px' }}
            >
              Sign Up
            </Button>
          </div> */}
        </div>
      </div>
    </header>
  );
}