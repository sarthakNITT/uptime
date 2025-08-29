'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Globe, Clock } from 'lucide-react';
import { useMockData } from '../../providers/MockDataProvider';
import { useAccessibility } from '../../providers/AccessibilityProvider';

interface MonitorFormProps {
  onClose: () => void;
}

export function MonitorForm({ onClose }: MonitorFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    interval: 60,
    region: 'us-east',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createMonitor } = useMockData();
  const { animationsEnabled } = useAccessibility();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    createMonitor({
      ...formData,
      status: 'up',
      uptime30d: 100,
      lastChecked: new Date().toISOString(),
      responseTime: Math.floor(Math.random() * 500) + 100,
    });

    setIsSubmitting(false);
    onClose();
  };

  const regions = [
    { value: 'us-east', label: 'US East' },
    { value: 'us-west', label: 'US West' },
    { value: 'eu-west', label: 'EU West' },
    { value: 'ap-southeast', label: 'Asia Pacific' },
  ];

  const intervals = [
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' },
    { value: 600, label: '10 minutes' },
  ];

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
            Monitor Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-2 text-text-100 placeholder-muted-400 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors"
            placeholder="My Website"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-100 mb-2">
            <Globe className="w-4 h-4 inline mr-2" />
            URL to Monitor
          </label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-2 text-text-100 placeholder-muted-400 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors"
            placeholder="https://example.com"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-100 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Check Interval
            </label>
            <select
              value={formData.interval}
              onChange={(e) => setFormData({ ...formData, interval: Number(e.target.value) })}
              className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-2 text-text-100 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors"
            >
              {intervals.map((interval) => (
                <option key={interval.value} value={interval.value}>
                  {interval.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-100 mb-2">
              Region
            </label>
            <select
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full bg-bg-900 border border-white/20 rounded-btn px-3 py-2 text-text-100 focus:border-accent-ice focus:ring-1 focus:ring-accent-ice transition-colors"
            >
              {regions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>
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
            className="flex-1 py-2 px-4 bg-accent-ice text-bg-900 rounded-btn font-medium hover:bg-accent-ice/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Monitor'}
          </button>
        </div>
      </form>
    </MotionDiv>
  );
}