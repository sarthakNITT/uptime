'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import Link from 'next/link';
import { Activity, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-bg-900">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-bg-800 rounded-card p-8 border border-white/10 glow-sm">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="flex items-center justify-center w-10 h-10 bg-accent-ice/10 rounded-md">
                <Activity className="w-6 h-6 text-accent-ice" />
              </div>
              <span className="text-2xl font-bold text-text-100">UpTime</span>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-text-100 mb-2">Create your account</h1>
              <p className="text-muted-400">Start monitoring your services in minutes</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-100 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-3 text-text-100 placeholder-muted-400 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-100 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-3 text-text-100 placeholder-muted-400 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-100 mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-3 pr-10 text-text-100 placeholder-muted-400 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-400 hover:text-text-100 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-bg-900 border border-white/20 rounded text-accent-ice focus:ring-accent-ice mt-0.5"
                  />
                  <span className="text-sm text-muted-400">
                    I agree to the{' '}
                    <Link href="/legal/terms" className="text-accent-ice hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/legal/privacy" className="text-accent-ice hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-accent-ice text-bg-900 py-3 px-4 rounded-btn font-medium hover:bg-accent-ice/90 transition-colors"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-400">
                Already have an account?{' '}
                <Link href="/login" className="text-accent-ice hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Trial Info */}
            <div className="mt-8 p-4 bg-accent-ice/5 border border-accent-ice/20 rounded-md text-center">
              <p className="text-xs text-accent-ice">
                🎉 Start with a 14-day free trial • No credit card required
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}