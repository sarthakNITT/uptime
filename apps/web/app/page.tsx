import { HeroSection } from '../components/sections/HeroSection';
import DashboardSection from '../components/sections/Dashboard';
import { FeaturesSection } from '../components/sections/FeaturesSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { PricingTeaser } from '../components/sections/PricingTeaser';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import FAQSection from '../components/sections/Question';

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
        <PricingTeaser />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
