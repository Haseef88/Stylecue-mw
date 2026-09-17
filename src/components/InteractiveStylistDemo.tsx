import React, { useState } from 'react';
import { Sparkles, Wand2, RefreshCw, ShoppingBag, SlidersHorizontal, CheckCircle, ArrowRight, Tag } from 'lucide-react';
import { CURATED_LOOKS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface InteractiveStylistDemoProps {
  onOpenQuiz: () => void;
}

const OCCASIONS = [
  'Casual Weekend',
  'Work & Meetings',
  'Dinner Date',
  'Wedding & Party',
  'Travel Outing'
];

const VIBES = [
  'Casual & Clean',
  'Classic & Elegant',
  'Modern Business',
  'Trendy Streetwear'
];

const PALETTES = [
  { name: 'Gold & Deep Violet', colors: ['#1A102E', '#F2C94C', '#B7A4D8'] },
  { name: 'Sky Blue & Clean Black', colors: ['#0B0D12', '#38BDF8', '#818CF8'] },
  { name: 'Warm Cream & Charcoal', colors: ['#281E1E', '#D4AF37', '#EBE2DC'] }
];

export const InteractiveStylistDemo: React.FC<InteractiveStylistDemoProps> = ({ onOpenQuiz }) => {
  const { themeConfig } = useTheme();
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS[0]);
  const [selectedVibe, setSelectedVibe] = useState(VIBES[0]);
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  const currentLook = CURATED_LOOKS[activeLookIndex % CURATED_LOOKS.length];

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setActiveLookIndex((prev) => (prev + 1) % CURATED_LOOKS.length);
      setIsSynthesizing(false);
    }, 400);
  };

  const toggleCartItem = (id: string) => {
    setAddedItemIds((prev) => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const totalPrice = currentLook.items.reduce((acc, item) => acc + item.price, 0);

  return (
    <section id="live-stylist" className="px-4 sm:px-8 md:px-16 w-full max-w-[1440px] mx-auto py-16 md:py-24 relative">
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border text-xs font-semibold uppercase tracking-wider font-mono">
          <Sparkles className="w-3.5 h-3.5" style={{ color: themeConfig.primaryAccent }} />
          Interactive Outfit Builder
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Try the <span style={{ color: themeConfig.primaryAccent }}>AI Stylist</span> Demo
        </h2>
        <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto font-normal">
          Pick your occasion and style below to see how our AI creates full matching outfits with items in stock right now.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Control Parameter Console */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 font-semibold text-base">
              <SlidersHorizontal className="w-5 h-5" style={{ color: themeConfig.primaryAccent }} />
              <span>Choose Your Preferences</span>
            </div>
            <span className="text-xs opacity-60 font-mono">Live Demo</span>
          </div>

          {/* Occasion Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider opacity-75 mb-2.5 font-mono">
              1. Where Are You Going?
            </label>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((occ) => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer border ${
                    selectedOccasion === occ
                      ? 'shadow-md font-bold text-slate-900'
                      : 'glass-panel opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: selectedOccasion === occ ? themeConfig.primaryAccent : undefined,
                    borderColor: selectedOccasion === occ ? themeConfig.primaryAccent : 'transparent'
                  }}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Vibe Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider opacity-75 mb-2.5 font-mono">
              2. What Style Do You Like?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {VIBES.map((vibe) => (
                <button
                  key={vibe}
                  onClick={() => setSelectedVibe(vibe)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all duration-200 cursor-pointer border ${
                    selectedVibe === vibe
                      ? 'glass-panel-elevated font-bold shadow-sm'
                      : 'glass-panel opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    borderColor: selectedVibe === vibe ? themeConfig.primaryAccent : 'transparent',
                    color: selectedVibe === vibe ? themeConfig.primaryAccent : undefined
                  }}
                >
                  {vibe}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider opacity-75 mb-2.5 font-mono">
              3. Pick a Color Palette
            </label>
            <div className="flex flex-col gap-2">
              {PALETTES.map((palette, idx) => (
                <button
                  key={palette.name}
                  onClick={() => setSelectedPalette(idx)}
                  className={`p-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all duration-200 cursor-pointer border ${
                    selectedPalette === idx
                      ? 'glass-panel-elevated shadow-sm'
                      : 'glass-panel opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    borderColor: selectedPalette === idx ? themeConfig.primaryAccent : 'transparent'
                  }}
                >
                  <span>{palette.name}</span>
                  <div className="flex gap-1.5">
                    {palette.colors.map((c, i) => (
                      <span key={i} className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: c }}></span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Look Button */}
          <div className="pt-2">
            <button
              onClick={handleSynthesize}
              disabled={isSynthesizing}
              className="w-full text-slate-900 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xl active:scale-98 cursor-pointer disabled:opacity-50"
              style={{ backgroundColor: themeConfig.primaryAccent }}
            >
              {isSynthesizing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Building Matching Outfit...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate New Outfit</span>
                </>
              )}
            </button>
            <p className="text-[11px] opacity-60 text-center mt-2.5 font-mono">
              Checks live item availability directly against a store's real inventory
            </p>
          </div>
        </div>

        {/* Right Synthesized Output Card */}
        <div className="lg:col-span-7 glass-panel-elevated p-6 sm:p-8 rounded-3xl border relative overflow-hidden shadow-2xl">
          {/* Top Look Title & Score Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold glass-panel" style={{ color: themeConfig.secondaryAccent }}>
                  Chosen for {selectedOccasion}
                </span>
                <span className="text-xs opacity-60">• {selectedVibe}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {currentLook.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-bold font-mono" style={{ color: themeConfig.primaryAccent }}>
                  {currentLook.matchScore}%
                </div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70">
                  Match Score
                </div>
              </div>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: `${themeConfig.primaryAccent}25`, color: themeConfig.primaryAccent }}
              >
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
          </div>

          <p className="text-sm opacity-80 my-4 leading-relaxed">
            {currentLook.description}
          </p>

          {/* Garments in Look Grid */}
          <div className="space-y-3 my-6">
            <div className="text-xs font-semibold uppercase tracking-wider opacity-75 flex items-center justify-between font-mono">
              <span>Pieces in this Outfit ({currentLook.items.length} items)</span>
              <span className="font-mono font-bold" style={{ color: themeConfig.primaryAccent }}>Total: ${totalPrice.toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentLook.items.map((item) => {
                const isSelected = addedItemIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl glass-panel border hover:border-white/20 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover bg-black/50"
                      />
                      <div>
                        <h5 className="text-xs font-semibold line-clamp-1">
                          {item.name}
                        </h5>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] opacity-70">
                          <span>{item.brand}</span>
                          <span>•</span>
                          <span style={{ color: themeConfig.secondaryAccent }} className="font-medium">{item.retailer}</span>
                        </div>
                        <div className="text-xs font-bold mt-1 font-mono">
                          ${item.price.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleCartItem(item.id)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                          : 'glass-panel opacity-75 hover:opacity-100'
                      }`}
                      title={isSelected ? 'Saved to Cart' : 'Save to Cart'}
                    >
                      {isSelected ? <CheckCircle className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stylist Pairing Tips Callout */}
          <div className="glass-panel border p-4 rounded-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono" style={{ color: themeConfig.primaryAccent }}>
              <Tag className="w-3.5 h-3.5" />
              <span>Helpful Styling Tips:</span>
            </div>
            <ul className="text-xs opacity-80 space-y-1.5 list-disc list-inside">
              {currentLook.stylingTips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs opacity-70">
              All items verified in stock in real time, matched to the store's own catalog.
            </div>
            <button
              onClick={onOpenQuiz}
              className="w-full sm:w-auto text-slate-900 px-6 py-2.5 rounded-full text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              style={{ backgroundColor: themeConfig.primaryAccent }}
            >
              <span>Take the 1-Minute Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};