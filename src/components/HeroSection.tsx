import React, { useState } from 'react';
import { ArrowRight, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import { HERO_IMAGE_URL } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  onStartStyling: () => void;
  onExploreLookbooks: () => void;
}

const HERO_LOOK_PRESETS = [
  {
    id: 'urban',
    title: 'Street Style Outfit',
    score: 98,
    desc: 'Lightweight utility jacket with comfortable matching cargo pants and gold jewelry.',
    tag: 'Casual Streetwear',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'riviera',
    title: 'Evening Silk Dress',
    score: 99,
    desc: 'Smooth silk evening slip dress with a warm cashmere coat and gold clutch bag.',
    tag: 'Dinner & Parties',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'executive',
    title: 'Modern Business Suit',
    score: 96,
    desc: 'Sharp tailored black blazer paired with comfortable wide-leg trousers.',
    tag: 'Work & Meetings',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartStyling,
  onExploreLookbooks
}) => {
  const [activePresetIndex, setActivePresetIndex] = useState<number | null>(null);
  const activePreset = activePresetIndex === null ? null : HERO_LOOK_PRESETS[activePresetIndex];
  const { themeConfig } = useTheme();

  return (
    <section id="hero" className="relative px-4 sm:px-8 md:px-16 w-full max-w-[1440px] mx-auto pt-6 md:pt-10 pb-16 md:pb-24">
      {/* Background ambient radial glows */}
      <div
        className="absolute top-0 left-1/4 -z-10 w-[500px] h-[500px] blur-[140px] rounded-full pointer-events-none opacity-20"
        style={{ backgroundColor: themeConfig.primaryAccent }}
      ></div>
      <div
        className="absolute top-1/3 right-10 -z-10 w-[450px] h-[450px] blur-[150px] rounded-full pointer-events-none opacity-20"
        style={{ backgroundColor: themeConfig.secondaryAccent }}
      ></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[68vh]">
        {/* Left Column Content */}
        <div className="lg:col-span-6 z-10 space-y-6 md:space-y-7 text-left">
          {/* Subtle Live Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Online AI Stylist</span>
            <span className="opacity-40">•</span>
            <span style={{ color: themeConfig.primaryAccent }}>Checks Real Store Stock & Sizing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.12]">
            Your <span style={{ color: themeConfig.primaryAccent }}>Personal Stylist</span>, Powered by AI.
          </h1>

          <p className="text-base sm:text-lg md:text-xl opacity-80 leading-relaxed max-w-xl font-normal">
            Get personalized outfit ideas chosen for your body shape, taste, and budget. Every piece is in stock in your size and ready to wear.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-1">
            <button
              onClick={onStartStyling}
              className="px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-xl hover:opacity-95 active:scale-95 group cursor-pointer text-slate-950"
              style={{ backgroundColor: themeConfig.primaryAccent }}
            >
              <span>Take Style Quiz</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onExploreLookbooks}
              className="glass-panel px-8 py-3.5 rounded-full font-bold text-sm sm:text-base hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer opacity-85"
            >
              <Layers className="w-4 h-4 opacity-75" />
              <span>Browse Outfits</span>
            </button>
          </div>

          {/* Live Look Switcher for Interactive Exploration */}
          <div className="pt-4 border-t border-white/10">
            <div className="text-xs font-semibold uppercase tracking-wider opacity-75 mb-3 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5" style={{ color: themeConfig.primaryAccent }} />
              <span>Click to preview sample outfits:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {HERO_LOOK_PRESETS.map((preset, idx) => (
                <button
                  key={preset.id}
                  onClick={() => setActivePresetIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer border ${
                    activePresetIndex === idx
                      ? 'glass-panel-elevated shadow-md'
                      : 'glass-panel opacity-65 hover:opacity-100'
                  }`}
                  style={{
                    borderColor: activePresetIndex === idx ? themeConfig.primaryAccent : undefined,
                    color: activePresetIndex === idx ? themeConfig.primaryAccent : undefined
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activePresetIndex === idx ? themeConfig.primaryAccent : '#94A3B8' }}
                  ></span>
                  <span>{preset.title}</span>
                  <span className="text-[10px] opacity-75 font-mono">({preset.score}% Match)</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column Hero Visual & Floating Dynamic AI Panel */}
        <div className="lg:col-span-6 relative h-[480px] sm:h-[540px] md:h-[620px] rounded-3xl overflow-hidden glass-panel border shadow-2xl group">
          {/* Show the intro video until a sample outfit is selected. */}
          {activePreset ? (
            <img
              src={activePreset.image || HERO_IMAGE_URL}
              alt={activePreset.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />
          ) : (
            <video
              src="/Stylecue_video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />
          )}

          {/* Gradient Lighting and Deep Shadow Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

          {/* Upper Right Boutique Status Pill */}
          <div className="absolute top-6 right-6 glass-panel-elevated px-4 py-2 rounded-full flex items-center gap-2 border shadow-lg text-xs font-semibold backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeConfig.primaryAccent }}></span>
            <span>Matched to Real Store Stock</span>
          </div>

          {/* Floating UI Element */}
          {activePreset && <div className="absolute bottom-6 right-6 left-6 sm:left-auto sm:w-84 glass-panel-elevated p-5 rounded-2xl border shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-3xl">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${themeConfig.primaryAccent}25` }}
                >
                  <Sparkles className="w-3.5 h-3.5" style={{ color: themeConfig.primaryAccent }} />
                </div>
                <span className="text-xs font-bold tracking-wider uppercase font-mono" style={{ color: themeConfig.primaryAccent }}>
                  AI MATCH: {activePreset.score}%
                </span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full glass-panel font-semibold">
                {activePreset.tag}
              </span>
            </div>

            <h4 className="text-sm font-bold mb-1">
              "{activePreset.title}"
            </h4>
            <p className="text-xs opacity-75 leading-relaxed">
              {activePreset.desc}
            </p>

            {/* Micro details bar */}
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                In Stock in Your Size
              </span>
              <span className="font-mono opacity-80 text-[10px]">Complete Outfit</span>
            </div>
          </div>}
        </div>
      </div>

      {/* Trust & Performance Bar */}
      <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-3">
          <div className="text-2xl md:text-3xl font-bold font-mono">Live</div>
          <div className="text-xs md:text-sm opacity-70 mt-1 font-medium">Checked Against Real Store Stock</div>
        </div>
        <div className="p-3">
          <div className="text-2xl md:text-3xl font-bold font-mono" style={{ color: themeConfig.primaryAccent }}>
            Instant
          </div>
          <div className="text-xs md:text-sm opacity-70 mt-1 font-medium">Size & Sizing Check</div>
        </div>
        <div className="p-3">
          <div className="text-2xl md:text-3xl font-bold font-mono">No Login</div>
          <div className="text-xs md:text-sm opacity-70 mt-1 font-medium">Anonymous, One-Time Sessions</div>
        </div>
        <div className="p-3">
          <div className="text-2xl md:text-3xl font-bold font-mono" style={{ color: themeConfig.secondaryAccent }}>
            New
          </div>
          <div className="text-xs md:text-sm opacity-70 mt-1 font-medium">Now Onboarding Pilot Stores</div>
        </div>
      </div>
    </section>
  );
};