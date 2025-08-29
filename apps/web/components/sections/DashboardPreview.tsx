'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Monitor, AlertTriangle, Clock, TrendingUp, Activity } from 'lucide-react';
import { useMockData } from '../../providers/MockDataProvider';
import { useAccessibility } from '../../providers/AccessibilityProvider';
import { UptimeSparkline } from '../../components/charts/UptimeSparkline';

export function DashboardPreview() {
  const { monitors, alerts } = useMockData();
  const { scrollEffectsEnabled, animationsEnabled } = useAccessibility();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (scrollEffectsEnabled && animationsEnabled) {
      if (inView) {
        controls.start({ scale: 1.1, y: -20, transition: { type: 'spring', stiffness: 100, damping: 30 } });
      } else {
        controls.start({ scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 30 } });
      }
    }
  }, [inView, controls, scrollEffectsEnabled, animationsEnabled]);

  const [time, setTime] = useState('');
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(interval);
  }, []);

  const upMonitors = monitors.filter(m => m.status === 'up').length;
  const downMonitors = monitors.filter(m => m.status === 'down').length;
  const avgUptime = monitors.reduce((acc, m) => acc + m.uptime30d, 0) / (monitors.length || 1);
  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged).length;
  const avgResponseTime = monitors.filter(m => m.status === 'up').reduce((acc, m) => acc + m.responseTime, 0) / (upMonitors || 1) || 0;

  const stats = [
    { label: 'Total Monitors', value: monitors.length, sublabel: `${upMonitors} up, ${downMonitors} down`, icon: Monitor, color: 'text-accent-ice' },
    { label: 'Avg Uptime (30d)', value: `${avgUptime.toFixed(1)}%`, sublabel: 'Last 30 days', icon: TrendingUp, color: avgUptime > 99 ? 'text-green-400' : 'text-yellow-400' },
    { label: 'Active Alerts', value: unacknowledgedAlerts, sublabel: `${alerts.length} total alerts`, icon: AlertTriangle, color: unacknowledgedAlerts > 0 ? 'text-red-400' : 'text-green-400' },
    { label: 'Avg Response Time', value: `${Math.round(avgResponseTime)}ms`, sublabel: 'Global average', icon: Clock, color: avgResponseTime < 200 ? 'text-green-400' : 'text-yellow-400' },
  ];

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial={{ scale: 1, y: 0 }}
      className="relative py-6 px-4 lg:px-8 overflow-visible max-w-5xl mx-auto bg-black"
    >
      {/* Top gradient that fades from page (transparent) into this section's black background */}
      <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-b from-transparent to-black pointer-events-none z-10" />

      <div className="relative z-20">
        <div className="flex flex-row gap-6 items-start">
          <div className="basis-1/4 flex flex-col justify-center px-2">
            <h2 className="text-2xl font-bold text-text-100 mb-2">Everything You Need at a Glance</h2>
            <p className="text-muted-400 max-w-xs text-sm">Get real-time insights into your infrastructure health with our comprehensive dashboard.</p>
          </div>

          <div className="basis-3/4 flex justify-center">
            <div className="bg-bg-800 rounded-card border border-white/10 overflow-hidden glow-sm w-full">
              <div className="border-b border-white/10 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-accent-ice" />
                  <h3 className="text-base font-semibold text-text-100">UpTime Dashboard</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-muted-400">Live</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 border-b border-white/10">
                {stats.map(stat => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-bg-900/50 rounded-card p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-xs text-muted-400">{stat.label}</span>
                      </div>
                      <div className="text-lg font-bold text-text-100 mb-1">{stat.value}</div>
                      <div className="text-xs text-muted-400">{stat.sublabel}</div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                <div className="lg:col-span-2">
                  <h4 className="text-base font-semibold text-text-100 mb-3">Active Monitors</h4>
                  <div className="space-y-3">
                    {monitors.slice(0, 5).map(monitor => (
                      <div key={monitor.id} className="flex items-center justify-between bg-bg-900/30 rounded-md p-3 hover:bg-bg-900/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${monitor.status === 'up' ? 'bg-green-400' : monitor.status === 'down' ? 'bg-red-400' : 'bg-yellow-400'}`} />
                          <div>
                            <div className="text-sm font-medium text-text-100">{monitor.name}</div>
                            <div className="text-xs text-muted-400">{monitor.url}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-400">
                          <div className="text-right">
                            <div className="text-text-100 font-medium">{monitor.uptime30d.toFixed(1)}%</div>
                            <div>{monitor.responseTime}ms</div>
                          </div>
                          <UptimeSparkline data={Array.from({ length: 30 }, () => Math.random() > 0.05 ? 100 : 0)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-text-100 mb-3">Recent Alerts</h4>
                  <div className="space-y-3">
                    {alerts.slice(0, 4).map(alert => (
                      <div key={alert.id} className="bg-bg-900/30 rounded-md p-3">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${alert.severity === 'critical' ? 'text-red-400' : alert.severity === 'warning' ? 'text-yellow-400' : 'text-blue-400'}`} />
                          <div>
                            <div className="text-sm text-text-100 leading-tight">{alert.message}</div>
                            <div className="text-xs text-muted-400 mt-1">{new Date(alert.timestamp).toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 p-4 bg-bg-900/20">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-400">Last updated: {time}</div>
                  <button className="group flex items-center space-x-2 text-[12px] bg-accent-ice text-black px-4 py-2 rounded-btn font-medium hover:bg-accent-ice/90 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent-glow">
                    View Full Dashboard →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default DashboardPreview;
