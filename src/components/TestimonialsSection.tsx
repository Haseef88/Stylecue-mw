import React from 'react';
import { Sparkles, Users, Target, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const WHY_WE_BUILT_THIS = [
  {
    icon: Target,
    title: 'The Problem We Saw',
    text: "Shoppers walk into stores unsure what suits them, and staff can't always give every customer one-on-one styling attention. That confusion often ends in a wasted trip."
  },
  {
    icon: Zap,
    title: "What We're Building",
    text: 'A kiosk that gives every shopper a personal stylist experience — matched to what the store actually has in stock, in their size, right now.'
  },
  {
    icon: Users,
    title: "Who It's For",
    text: "Fashion retailers who want to help shoppers buy full outfits with confidence, without needing a stylist on every floor."
  }
];

export const TestimonialsSection: React.FC = () => {
  const { themeConfig } = useTheme();

  return (
    <section id="testimonials" className="px-4 sm:px-8 md:px-16 w-full max-w-[1440px] mx-auto py-16 md:py-24 relative">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border text-xs uppercase tracking-widest font-mono">
          <Sparkles className="w-3.5 h-3.5" style={{ color: themeConfig.primaryAccent }} />
          Why StyleCue
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Built to Solve a <span style={{ color: themeConfig.primaryAccent }}>Real In-Store Problem</span>
        </h2>
        <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto font-normal">
          We're an early-stage team building StyleCue from the ground up — here's the thinking behind it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {WHY_WE_BUILT_THIS.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="glass-panel p-8 sm:p-10 rounded-3xl border flex flex-col gap-4 group hover:border-opacity-100 transition-all duration-300 shadow-xl"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${themeConfig.primaryAccent}20`, color: themeConfig.primaryAccent }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold">{card.title}</h4>
              <p className="text-sm opacity-80 leading-relaxed">{card.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};