'use client';

import React, { useEffect, useRef, useState } from 'react';
import DashboardPreview from './DashboardPreview';
import DashboardHeading from './DashboardPreviewHeading';

export default function Dashboard() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastDashRef = useRef<HTMLDivElement | null>(null);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [headingHeight, setHeadingHeight] = useState(0);
  const [panelHeight, setPanelHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState('200vh');

  const DASH_COUNT = 3;

  const [headingStickyEnabled, setHeadingStickyEnabled] = useState(true);

  function getSiteHeaderElement(): HTMLElement | null {
    if (typeof document === 'undefined') return null;
    return (
      (document.querySelector('header') as HTMLElement) ||
      (document.querySelector('[role="banner"]') as HTMLElement) ||
      (document.querySelector('[data-site-header]') as HTMLElement) ||
      null
    );
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const compute = () => {
      const hdrEl = getSiteHeaderElement();
      const hdrH = hdrEl ? Math.ceil(hdrEl.getBoundingClientRect().height) : 0;
      const hdgH = headingRef.current ? Math.ceil(headingRef.current.getBoundingClientRect().height) : 0;
      const vh = window.innerHeight;

      const panelH = Math.max(160, Math.floor(vh - hdrH - hdgH));

      const contH = hdrH + hdgH + DASH_COUNT * panelH;

      setHeaderHeight(hdrH);
      setHeadingHeight(hdgH);
      setPanelHeight(panelH);
      setContainerHeight(`${contH}px`);
    };

    compute();

    const onResize = () => compute();
    window.addEventListener('resize', onResize);

    const hdrEl = getSiteHeaderElement();
    let hdrObserver: ResizeObserver | null = null;
    if (hdrEl && (window as any).ResizeObserver) {
      hdrObserver = new ResizeObserver(compute);
      hdrObserver.observe(hdrEl);
    }
    let headingObserver: ResizeObserver | null = null;
    if (headingRef.current && (window as any).ResizeObserver) {
      headingObserver = new ResizeObserver(compute);
      headingObserver.observe(headingRef.current);
    }

    return () => {
      window.removeEventListener('resize', onResize);
      if (hdrObserver) hdrObserver.disconnect();
      if (headingObserver) headingObserver.disconnect();
    };
  }, [DASH_COUNT]);

  const headingTop = headerHeight;
  const dashboardsTop = headerHeight + headingHeight;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!lastDashRef.current) return;

    let ticking = false;

    const check = () => {
      ticking = false;
      const lastRect = lastDashRef.current!.getBoundingClientRect();
      if (lastRect.top <= dashboardsTop + 1) {
        setHeadingStickyEnabled(false);
      } else {
        setHeadingStickyEnabled(true);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(check);
        ticking = true;
      }
    };

    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [dashboardsTop, panelHeight, headingHeight, headerHeight, DASH_COUNT]);

  return (
    <section className="relative" ref={containerRef}>
      {/* Heading: sticky only when headingStickyEnabled is true */}
      <div
        className={headingStickyEnabled ? 'sticky z-50 bg-transparent' : 'relative z-50 bg-transparent'}
        style={headingStickyEnabled ? { top: `${headingTop}px` } : undefined}
      >
        <DashboardHeading ref={headingRef} />
      </div>

      {/* Container that holds stacked sticky dashboards */}
      <div
        className="relative"
        style={{
          height: containerHeight,
        }}
      >
        {/* Render DASH_COUNT sticky dashboards stacked on top of each other.
            Later dashboards receive higher zIndex so they visually replace earlier ones. */}
        {Array.from({ length: DASH_COUNT }).map((_, i) => {
          const z = 20 + i * 10;
          const isLast = i === DASH_COUNT - 1;
          return (
            <div
              key={i}
              ref={isLast ? lastDashRef : undefined}
              className="sticky top-0 flex items-start justify-center"
              style={{
                top: `${dashboardsTop}px`,
                zIndex: z,
                minHeight: panelHeight ? `${panelHeight}px` : `calc(100vh - ${dashboardsTop}px)`,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: '0 1rem',
              }}
              aria-hidden={i > 0 ? 'false' : 'false'}
            >
              <div className="w-full max-w-[1200px]">
                {/* You can optionally vary the content per instance by passing a prop */}
                <DashboardPreview />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
