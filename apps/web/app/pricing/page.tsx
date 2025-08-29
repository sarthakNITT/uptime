'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { PricingSection } from '../../components/sections/PricingSection';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg-900">
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-text-100 mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-400 max-w-3xl mx-auto">
              Start free and scale as you grow. All plans include our core monitoring features.
            </p>
          </div>
          <PricingSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}