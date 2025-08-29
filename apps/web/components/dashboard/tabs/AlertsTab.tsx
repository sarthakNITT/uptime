'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, Bell } from 'lucide-react';
import { useMockData } from '../../../providers/MockDataProvider';
import { useAccessibility } from '../../../providers/AccessibilityProvider';

export function AlertsTab() {
  const { alerts, acknowledgeAlert } = useMockData();
  const { animationsEnabled } = useAccessibility();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'info': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-muted-400 bg-white/5 border-white/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'downtime': return AlertTriangle;
      case 'ssl': return CheckCircle;
      case 'response_time': return Clock;
      default: return Bell;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-bg-800 rounded-card border border-white/10">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-text-100">Alert Center</h2>
          <p className="text-muted-400 text-sm mt-1">
            {alerts.filter(a => !a.acknowledged).length} unacknowledged alerts
          </p>
        </div>

        <div className="divide-y divide-white/5">
          {alerts.map((alert, index) => {
            const Icon = getTypeIcon(alert.type);
            const MotionDiv = animationsEnabled ? motion.div : 'div';
            
            return (
              <MotionDiv
                key={alert.id}
                className={`p-6 ${alert.acknowledged ? 'opacity-60' : ''}`}
                initial={animationsEnabled ? { opacity: 0, x: -20 } : false}
                animate={animationsEnabled ? { opacity: 1, x: 0 } : false}
                transition={animationsEnabled ? { delay: index * 0.05 } : undefined}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-md border ${getSeverityColor(alert.severity)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-400">
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-text-100 mb-2">{alert.message}</p>
                    <div className="text-xs text-muted-400">
                      Alert Type: {alert.type.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                  {!alert.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="text-xs px-3 py-1 bg-accent-ice/10 text-accent-ice border border-accent-ice/20 rounded-btn hover:bg-accent-ice/20 transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </div>
  );
}