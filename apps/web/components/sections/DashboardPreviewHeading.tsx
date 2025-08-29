'use client';

import React, { forwardRef } from 'react';

type Props = {
  title?: string;
  subtitle?: string;
};

/**
 * Forwarding ref so parent can measure this node's height.
 */
const DashboardHeading = forwardRef<HTMLDivElement, Props>(function DashboardHeading(
  { title = 'Empower your detection with Uptime', subtitle = 'Detect incidents faster and reduce downtime — actionable insights across your infrastructure.' },
  ref
) {
  return (
    <div ref={ref} className="w-full bg-transparent pb-10">
      <div className="py-4 md:py-5 lg:py-6 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-100">{title}</h1>
        <p className="mt-1 text-sm text-muted-400 max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </div>
  );
});

export default DashboardHeading;
