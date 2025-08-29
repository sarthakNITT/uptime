'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

type FAQ = {
  id: string;
  q: string;
  a: string;
};

const DEFAULT_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    q: 'What is Uptime and how does it work?',
    a: 'Uptime monitors your endpoints (HTTP, TCP, ICMP) at regular intervals and alerts you when response times degrade or when an endpoint becomes unreachable. We use distributed probes and aggregate results for accuracy.',
  },
  {
    id: 'faq-2',
    q: 'How do I configure alerts?',
    a: 'Go to the Alerts page, create a new alert policy, choose the monitors, and configure notification channels (email, Slack, Telegram). You can add throttling and escalation rules.',
  },
  {
    id: 'faq-3',
    q: 'Does Uptime provide historical performance reports?',
    a: 'Yes — every monitor stores 30+ days of metrics by default. You can export CSVs or view interactive charts for response time and uptime analytics.',
  },
  {
    id: 'faq-4',
    q: 'Can I integrate Uptime with third-party services?',
    a: 'Absolutely. We support webhooks, Slack, Microsoft Teams, PagerDuty, and custom integrations via the API.',
  },
  {
    id: 'faq-5',
    q: 'How does billing and subscription work?',
    a: 'Subscriptions are billed monthly or yearly. You can add more probe locations or increase retention as add-ons. Visit the Billing section to manage your plan.',
  },
];

type ItemProps = {
  item: FAQ;
  index: number;
  isOpen: boolean;
  toggle: (id: string) => void;
  headerRef: (el: HTMLButtonElement | null) => void;
  onHeaderKeyDown: (e: React.KeyboardEvent, idx: number, id: string) => void;
};

const FAQItem = React.memo(function FAQItem({
  item,
  index,
  isOpen,
  toggle,
  headerRef,
  onHeaderKeyDown,
}: ItemProps) {
  return (
    <div className="w-full">
      <div className="bg-transparent">
        <button
          ref={headerRef}
          onKeyDown={(e) => onHeaderKeyDown(e, index, item.id)}
          onClick={() => toggle(item.id)}
          aria-expanded={isOpen}
          aria-controls={`${item.id}-panel`}
          id={`${item.id}-header`}
          className="w-full text-left px-6 py-2 flex items-start justify-between gap-4 focus:outline-none"
        >
          <div className="flex-1">
            <div className="text-white text-base font-semibold leading-tight">{item.q}</div>
            {/* tightened preview (very small) */}
            <div className="text-white/40 text-sm mt-1 max-w-3xl leading-tight">
              {item.a.slice(0, 70)}
              {item.a.length > 70 ? '...' : ''}
            </div>
          </div>

          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.18 }}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
            aria-hidden
          >
            <Plus className="w-5 h-5 text-white/80" />
          </motion.span>
        </button>

        {/* Smooth, compact answer reveal: scaleY + opacity + tiny y for nicer perception */}
        <motion.div
          id={`${item.id}-panel`}
          role="region"
          aria-labelledby={`${item.id}-header`}
          initial={{ scaleY: 0, opacity: 0, y: -4 }}
          animate={isOpen ? { scaleY: 1, opacity: 1, y: 0 } : { scaleY: 0, opacity: 0, y: -4 }}
          transition={{ duration: 0.20, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ transformOrigin: 'top', overflow: 'hidden' }}
          className="px-6 pb-3"
        >
          <div className="pt-1 text-sm text-white/90 leading-snug">{item.a}</div>
        </motion.div>
      </div>
    </div>
  );
});

export default function FAQSection({ faqs = DEFAULT_FAQS }: { faqs?: FAQ[] }) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const headersRef = useRef<Array<HTMLButtonElement | null>>([]);

  const filtered = useMemo(() => faqs, [faqs]);

  useEffect(() => {
    headersRef.current = headersRef.current.slice(0, filtered.length);
    setOpenIds(prev => {
      const allowed = new Set(filtered.map(f => f.id));
      const next = new Set<string>();
      for (const id of prev) if (allowed.has(id)) next.add(id);
      return next;
    });
  }, [filtered]);

  const toggle = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onHeaderKeyDown = (e: React.KeyboardEvent, index: number, id: string) => {
    const key = e.key;
    const max = filtered.length - 1;
    if (key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(max, index + 1);
      const target = headersRef.current[next];
      if (target) target.focus();
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      const prev = Math.max(0, index - 1);
      const target = headersRef.current[prev];
      if (target) target.focus();
    } else if (key === 'Home') {
      e.preventDefault();
      const target = headersRef.current[0];
      if (target) target.focus();
    } else if (key === 'End') {
      e.preventDefault();
      const target = headersRef.current[max];
      if (target) target.focus();
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      toggle(id);
    }
  };

  return (
    // outer section has background-black and a subtle border around the whole FAQ area
    <section className="w-full min-h-screen bg-black text-white">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Outer bordered wrapper for the complete FAQ section */}
          <div className="rounded-2xl border border-white/8 p-8 bg-black/50">
            <div className="text-center">
              <div className="inline-block py-1 px-3 rounded-md border border-white/8 text-sm text-white/80 mb-3">FAQs</div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Frequently asked questions</h2>
              <p className="mt-2 text-sm text-white/60">Everything You Need to Know.</p>
            </div>

            {/* Inner FAQ container (rounded, with divider lines) */}
            <div className="mt-8 bg-transparent rounded-xl overflow-hidden">
              <div className="divide-y divide-white/6">
                {filtered.length === 0 ? (
                  <div className="p-4 text-center text-white/60">No results found.</div>
                ) : (
                  filtered.map((item, i) => {
                    const isOpen = openIds.has(item.id);
                    return (
                      <FAQItem
                        key={item.id}
                        item={item}
                        index={i}
                        isOpen={isOpen}
                        toggle={toggle}
                        headerRef={(el) => {
                          headersRef.current[i] = el;
                        }}
                        onHeaderKeyDown={onHeaderKeyDown}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
