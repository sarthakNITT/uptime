'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Edit, Trash2, Play, Pause, Loader2 } from 'lucide-react';
import { useAccessibility } from '../../providers/AccessibilityProvider';
import { UptimeSparkline } from '../../components/charts/UptimeSparkline';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Monitor {
  id: string;
  name: string;
  url: string;
  status: "up" | "down" | "paused" | "unknown";
  uptime30d: number;
  responseTime: number;
  lastChecked: string;
}

export function MonitorList() {
  const { animationsEnabled } = useAccessibility();
  const [monitors, setMonitors] = useState<Monitor[]>([]);

  const [loading, setLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fallbackTimer = setTimeout(() => {
      if (!mounted) return;
      setShowFallback(true);
      setLoading(false);
    }, 5000);

    (async () => {
      try {
        const res = await axios.get('/api/getServices');
        if (!mounted) return;

        clearTimeout(fallbackTimer);

        const data: Monitor[] = res.data ?? [];

        if (Array.isArray(data) && data.length > 0) {
          setMonitors(data);
          setShowFallback(false);
        } else {
          setMonitors([]);
          setShowFallback(true);
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch services', err);
        if (!mounted) return;

        clearTimeout(fallbackTimer);
        setMonitors([]);
        setShowFallback(true);
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      clearTimeout(fallbackTimer);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up': return 'bg-green-400';
      case 'down': return 'bg-red-400';
      case 'paused': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'up': return 'Online';
      case 'down': return 'Offline';
      case 'paused': return 'Paused';
      default: return 'Unknown';
    }
  };

  const toggleMonitorStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'paused' ? 'up' : 'paused';
    setMonitors(prev =>
      prev.map(m => m.id === id ? { ...m, status: newStatus } : m)
    );
  };

  return (
    <div className="bg-bg-800 rounded-card border border-white/10">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-100">Your Monitors</h2>
          <p className="text-muted-400 text-sm mt-1">
            {loading ? 'Loading...' : `${monitors.length} monitors configured`}
          </p>
        </div>
      </div>

      <div className="p-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="animate-spin w-8 h-8 text-accent-ice" />
            <motion.span
              className="text-sm text-muted-400 mt-3"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              Fetching services...
            </motion.span>
          </div>
        )}

        {!loading && showFallback && monitors.length === 0 && (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="text-muted-400 mb-4">No monitors configured yet</div>
          </div>
        )}

        {!loading && monitors.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-400">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-400">Monitor</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-400">Uptime (30d)</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-400">Response Time</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-400">Last Checked</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-400">Trend</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {monitors.map((monitor, index) => {
                  const MotionTr = animationsEnabled ? motion.tr : 'tr';
                  return (
                    <MotionTr
                      key={monitor.id}
                      className="border-b border-white/5 hover:bg-white/2 transition-colors"
                      initial={animationsEnabled ? { opacity: 0, y: 10 } : false}
                      animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
                      transition={animationsEnabled ? { delay: index * 0.05 } : undefined}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(monitor.status)}`}></div>
                          <span className="text-sm text-text-100">{getStatusText(monitor.status)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <Link href={monitor.url} target='blank' className="text-sm font-medium flex gap-1 flex-row items-center text-text-100">
                            {monitor.url}
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-sm font-medium ${
                          monitor.uptime30d >= 99 ? 'text-green-400' :
                          monitor.uptime30d >= 95 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {monitor.uptime30d.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-text-100">
                          {monitor.status === 'down' ? '—' : `${monitor.responseTime}ms`}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs text-muted-400">
                          {new Date(monitor.lastChecked).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <UptimeSparkline 
                          data={Array.from({length: 24}, () => Math.random() > 0.05 ? monitor.uptime30d : 0)} 
                          width={80} 
                          height={24} 
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => toggleMonitorStatus(monitor.id, monitor.status)}
                            className="text-muted-400 hover:text-accent-ice transition-colors"
                            title={monitor.status === 'paused' ? 'Resume monitoring' : 'Pause monitoring'}
                          >
                            {monitor.status === 'paused' ? (
                              <Play className="w-4 h-4" />
                            ) : (
                              <Pause className="w-4 h-4" />
                            )}
                          </button>
                          <button className="text-muted-400 hover:text-accent-ice transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setMonitors(prev => prev.filter(m => m.id !== monitor.id))}
                            className="text-muted-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </MotionTr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
