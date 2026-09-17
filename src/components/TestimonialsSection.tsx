import React from 'react';
import { Sparkles, ShieldCheck, Users, PackageSearch, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const TRUST_POINTS = [
  {
    id: 'inventory',
    icon: PackageSearch,
    question: 'Will it work with what I already stock?',
    answer: "Yes. Every recommendation comes from your store's own live inventory — nothing from an outside catalog.",
  },
  {
    id: 'staffing',
    icon: Users,
    question: 'Do I need to hire new staff to run it?',
    answer: 'No new hires needed. Your existing team gets a simple dashboard showing exactly which items to bring to the fitting room.',
  },
  {
    id: 'stock',
    icon: ShieldCheck,
    question: "What if it suggests something that's out of stock?",
    answer: "The kiosk only recommends items your system marks as in stock, checked in real time — not a stale catalog snapshot.",
  },
  {
    id: 'privacy',
    icon: Lock,
    question: "Is my store's data shared with anyone else?",
    answer: "No. Your product catalog and shopper sessions stay private to your store — we don't share them across retailers.",
  },
];

export const TestimonialsSection: React.FC = () => {
  const { themeConfig } = useTheme();

  return (
    <section id="testimonials" className="px-4 sm:px-8 md:px-16 w-full max-w-[1440px] mx-auto py-16 md:py-24 relative">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border text-xs uppercase tracking-widest font-mono">
          <Sparkles className="w-3.5 h-3.5" style={{ color: themeConfig.primaryAccent }} />
          Common Concerns, Answered
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Built to Fit <span style={{ color: themeConfig.primaryAccent }}>How You Already Run Your Store</span>
        </h2>
        <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto font-normal">
          Straight answers to what retailers usually ask before trying a kiosk on their floor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TRUST_POINTS.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              className="glass-panel p-8 sm:p-10 rounded-3xl border flex flex-col gap-4 group hover:border-opacity-100 transition-all duration-300 shadow-xl relative"
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md"
                style={{ backgroundColor: `${themeConfig.primaryAccent}20`, color: themeConfig.primaryAccent }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold leading-snug">
                {t.question}
              </h4>
              <p className="text-sm sm:text-base opacity-80 leading-relaxed">
                {t.answer}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};