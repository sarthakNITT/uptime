'use client';

import { Monitor, Clock, AlertTriangle, Shield, TrendingUp, Users } from 'lucide-react';
import { useMockData } from '../../providers/MockDataProvider';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../providers/AccessibilityProvider';

export function DashboardOverview() {
  const { monitors, alerts, checks } = useMockData();
  const { animationsEnabled } = useAccessibility();

  const upMonitors = monitors.filter(m => m.status === 'up').length;
  const downMonitors = monitors.filter(m => m.status === 'down').length;
  const avgUptime = monitors.reduce((acc, m) => acc + m.uptime30d, 0) / monitors.length || 0;
  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged).length;
  const avgResponseTime = monitors.filter(m => m.status === 'up').reduce((acc, m) => acc + m.responseTime, 0) / upMonitors || 0;
  const totalChecks = checks.length;

  const stats = [
    {
      label: 'Total Monitors',
      value: monitors.length,
      change: '+2 this week',
      icon: Monitor,
      color: 'text-accent-ice',
      bg: 'bg-accent-ice/10',
    },
    {
      label: 'Avg Uptime',
      value: `${avgUptime.toFixed(2)}%`,
      change: '+0.1% from last month',
      icon: TrendingUp,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
    },
    {
      label: 'Active Alerts',
      value: unacknowledgedAlerts,
      change: '-3 from yesterday',
      icon: AlertTriangle,
      color: unacknowledgedAlerts > 0 ? 'text-red-400' : 'text-green-400',
      bg: unacknowledgedAlerts > 0 ? 'bg-red-400/10' : 'bg-green-400/10',
    },
    {
      label: 'Avg Response Time',
      value: `${Math.round(avgResponseTime)}ms`,
      change: '-15ms from last week',
      icon: Clock,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      label: 'Services Online',
      value: `${upMonitors}/${monitors.length}`,
      change: downMonitors > 0 ? `${downMonitors} offline` : 'All systems operational',
      icon: Shield,
      color: downMonitors > 0 ? 'text-yellow-400' : 'text-green-400',
      bg: downMonitors > 0 ? 'bg-yellow-400/10' : 'bg-green-400/10',
    },
    {
      label: 'Total Checks',
      value: totalChecks.toLocaleString(),
      change: '+156 today',
      icon: Users,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const MotionDiv = animationsEnabled ? motion.div : 'div';
        
        return (
          <MotionDiv
            key={stat.label}
            className="bg-bg-800 rounded-card p-6 border border-white/10 card-hover"
            initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
            animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
            transition={animationsEnabled ? { duration: 0.5, delay: index * 0.1 } : undefined}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-md ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-text-100">{stat.value}</div>
                <div className={`text-xs ${stat.change.includes('+') ? 'text-green-400' : stat.change.includes('-') ? 'text-red-400' : 'text-muted-400'}`}>
                  {stat.change}
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-text-100 mb-1">{stat.label}</div>
            </div>
          </MotionDiv>
        );
      })}
    </div>
  );
}