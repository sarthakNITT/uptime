import { HeroSection } from '../components/sections/HeroSection';
import { DashboardPreview } from '../components/sections/DashboardPreview';
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
      <main>
        <HeroSection />
        <DashboardPreview />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingTeaser />
      </main>
      <Footer />
    </div>
  );
}