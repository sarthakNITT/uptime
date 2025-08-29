import { HeroSection } from '../components/sections/HeroSection';
import DashboardSection from '../components/sections/Dashboard';
import { FeaturesSection } from '../components/sections/FeaturesSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { PricingTeaser } from '../components/sections/PricingTeaser';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-900">
      <Header />
      <main className="relative">
        <HeroSection />

        {/* DashboardSection contains the sticky heading + two dashboards swap */}
        <DashboardSection />

        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingTeaser />
      </main>
      <Footer />
    </div>
  );
}
