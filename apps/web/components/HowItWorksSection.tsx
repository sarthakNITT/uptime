'use client';

import { useEffect, useRef, useState } from 'react';
import { Plus, Monitor, Bell, Mail, Phone, CheckCircle, AlertTriangle } from 'lucide-react';

const steps = [
  { 
    icon: Plus, 
    title: 'Add Your Website', 
    description: 'Enter your website URL and configure monitoring settings'
  },
  { 
    icon: Monitor, 
    title: 'Start Monitoring', 
    description: 'Our system begins checking your site every minute'
  },
  { 
    icon: AlertTriangle, 
    title: 'Detect Issues', 
    description: 'We identify when your website becomes unreachable'
  },
  { 
    icon: Bell, 
    title: 'Instant Alert', 
    description: 'Immediate notification system is triggered'
  },
  { 
    icon: Mail, 
    title: 'Email Notification', 
    description: 'Detailed email sent to your registered address'
  },
  { 
    icon: Phone, 
    title: 'Phone Call Alert', 
    description: 'Backup phone call for critical downtime events'
  },
  { 
    icon: CheckCircle, 
    title: 'Recovery Confirmation', 
    description: 'Notification when your site is back online'
  }
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the section is in view
      const startOffset = viewportHeight * 0.3;
      const endOffset = viewportHeight * 0.7;
      
      if (rect.top <= startOffset && rect.bottom >= endOffset) {
        // Section is in the active scroll zone
        const scrolled = (startOffset - rect.top) / (sectionHeight - viewportHeight + startOffset - endOffset);
        const clampedProgress = Math.max(0, Math.min(1, scrolled));
        
        setProgress(clampedProgress);
        
        // Calculate which step should be active
        const stepProgress = clampedProgress * (steps.length - 1);
        const currentActiveStep = Math.floor(stepProgress);
        setActiveStep(currentActiveStep);
        
        // Show cards as the line reaches them
        const newVisibleCards = new Set<number>();
        for (let i = 0; i <= currentActiveStep; i++) {
          newVisibleCards.add(i);
        }
        setVisibleCards(newVisibleCards);
      } else if (rect.top > startOffset) {
        setProgress(0);
        setActiveStep(0);
        setVisibleCards(new Set());
      } else if (rect.bottom < endOffset) {
        setProgress(1);
        setActiveStep(steps.length - 1);
        setVisibleCards(new Set(Array.from({ length: steps.length }, (_, i) => i)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-black min-h-[200vh]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontSize: '13px' }}>
            Our streamlined process ensures you're always in the know about your website's status.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Progress Line - Behind icons */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gray-800 z-0">
            <div 
              className="w-full bg-gradient-to-b from-white to-gray-300 transition-all duration-300 ease-out"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative z-10`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className={`transform transition-all duration-700 delay-200 ${
                    visibleCards.has(index) 
                      ? `translate-y-0 opacity-100 ${index % 2 === 0 ? 'translate-x-0' : 'translate-x-0'}` 
                      : `translate-y-8 opacity-0 ${index % 2 === 0 ? 'translate-x-8' : '-translate-x-8'}`
                  }`}>
                    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-white/30 transition-all duration-300 shadow-lg">
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-400" style={{ fontSize: '13px' }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Icon - Above the line */}
                <div className="w-2/12 flex justify-center relative z-20">
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    index <= activeStep 
                      ? 'bg-white border-white shadow-lg shadow-white/25' 
                      : 'bg-gray-800 border-gray-700'
                  }`}>
                    <step.icon className={`w-8 h-8 transition-colors duration-300 ${
                      index <= activeStep ? 'text-black' : 'text-gray-500'
                    }`} />
                  </div>
                </div>

                {/* Spacer */}
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}