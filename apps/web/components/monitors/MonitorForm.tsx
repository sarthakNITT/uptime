'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Globe } from 'lucide-react';
import { useAccessibility } from '../../providers/AccessibilityProvider';

interface MonitorFormProps {
  onClose: () => void;
}

export function MonitorForm({ onClose }: MonitorFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { animationsEnabled } = useAccessibility();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    onClose();
  };

  const MotionDiv = animationsEnabled ? motion.div : 'div';

  return (
    <MotionDiv
      initial={animationsEnabled ? { opacity: 0, scale: 0.95 } : false}
      animate={animationsEnabled ? { opacity: 1, scale: 1 } : false}
      exit={animationsEnabled ? { opacity: 0, scale: 0.95 } : undefined}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-text-100">Add New Monitor</h2>
        <button
          onClick={onClose}
          className="text-muted-400 hover:text-text-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-100 mb-2">
            Developer&apos;s Phone Number
          </label>
          <input
            type="text"
            className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-2 text-text-100 placeholder-muted-400 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors"
            placeholder="Enter developer's name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-100 mb-2">
            Developer&apos;s Email
          </label>
          <input
            type="text"
            className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-2 text-text-100 placeholder-muted-400 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors"
            placeholder="Enter developer's email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-100 mb-2">
            <Globe className="w-4 h-4 inline mr-2" />
            Website url
          </label>
          <input
            type="url"
            className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-2 text-text-100 placeholder-muted-400 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors"
            placeholder="https://example.com"
            required
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-white/20 text-text-100 rounded-btn hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-2 px-4 bg-accent-ice text-black rounded-btn font-medium hover:bg-accent-ice/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Monitor'}
          </button>
        </div>
      </form>
    </MotionDiv>
  );
}