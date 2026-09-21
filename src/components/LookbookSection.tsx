import React, { useState } from 'react';
import { Sparkles, ArrowRight, Heart, X } from 'lucide-react';
import { CURATED_LOOKS } from '../data/mockData';
import { LookbookLook } from '../types';
import { useTheme } from '../context/ThemeContext';

interface LookbookSectionProps {
  onStartStyling: () => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onStartStyling }) => {
  const { themeConfig } = useTheme();
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeModalLook, setActiveModalLook] = useState<LookbookLook | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [likedLookIds, setLikedLookIds] = useState<string[]>(['look-1', 'look-2']);

  const filterTags = ['All', 'Casual', 'Evening', 'Work', 'Streetwear', 'Comfort', 'Formal'];

  const filteredLooks = selectedTag === 'All' 
    ? CURATED_LOOKS 
    : CURATED_LOOKS.filter(look => look.tags.some(t => t.toLowerCase().includes(selectedTag.toLowerCase())));

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedLookIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const openLookModal = (look: LookbookLook) => {
    setActiveModalLook(look);
    setActiveImageIndex(0);
  };

  return (
    <section id="lookbooks" className="px-4 sm:px-8 md:px-16 w-full max-w-[1440px] mx-auto py-16 md:py-24 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border text-xs uppercase tracking-widest font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" style={{ color: themeConfig.primaryAccent }} />
            Sample Kiosk Outfits
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Popular <span style={{ color: themeConfig.primaryAccent }}>Outfit Ideas</span>
          </h2>
          <p className="text-base opacity-75 mt-2 max-w-xl">
            Examples of complete outfits the AI stylist puts together for work, dinners, casual weekends, and travel.
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedTag === tag
                  ? 'shadow-lg font-bold text-slate-900'
                  : 'glass-panel opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: selectedTag === tag ? themeConfig.primaryAccent : undefined
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Lookbooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredLooks.map((look) => {
          const isLiked = likedLookIds.includes(look.id);
          return (
            <div
              key={look.id}
              onClick={() => openLookModal(look)}
              className="glass-panel rounded-3xl overflow-hidden group hover:border-opacity-100 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 shadow-xl hover:shadow-2xl border"
            >
              <div className="relative h-72 sm:h-80 overflow-hidden bg-black/40">
                <img
                  src={look.imageUrl}
                  alt={look.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>

                {/* Score badge */}
                <div
                  className="absolute top-3 left-3 glass-panel-elevated px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border shadow-md"
                  style={{ color: themeConfig.primaryAccent }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{look.matchScore}% Match</span>
                </div>

                {/* Favorite Heart Button */}
                <button
                  onClick={(e) => toggleLike(look.id, e)}
                  className={`absolute top-3 right-3 p-2 rounded-full glass-panel-elevated transition-colors cursor-pointer ${
                    isLiked ? 'text-rose-400 bg-rose-500/20' : 'opacity-80 hover:opacity-100'
                  }`}
                  aria-label="Save look"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400' : ''}`} />
                </button>

                {/* Bottom Tags inside Image */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                  {look.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white/90 border border-white/10 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider mb-1 font-mono" style={{ color: themeConfig.secondaryAccent }}>
                    {look.vibe}
                  </div>
                  <h3 className="text-lg font-bold leading-snug group-hover:opacity-90 transition-opacity mb-2">
                    {look.title}
                  </h3>
                  <p className="text-xs opacity-75 line-clamp-2 leading-relaxed mb-4">
                    {look.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-mono opacity-75">{look.items.length} Store Items</span>
                  <span className="font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ color: themeConfig.primaryAccent }}>
                    See Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Look Detail Modal */}
      {activeModalLook && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-panel-elevated border border-white/20 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModalLook(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Photos Column */}
              <div className="md:col-span-6 space-y-3">
                <div className="rounded-2xl overflow-hidden h-80 sm:h-96 relative bg-black border border-white/10">
                  <img
                    src={
                      activeImageIndex === 0
                        ? activeModalLook.imageUrl
                        : (activeModalLook.detailImages && activeModalLook.detailImages[activeImageIndex - 1]) || activeModalLook.imageUrl
                    }
                    alt={activeModalLook.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  <div
                    className="absolute bottom-4 left-4 glass-panel-elevated px-3 py-1.5 rounded-full text-xs font-mono font-bold"
                    style={{ color: themeConfig.primaryAccent }}
                  >
                    Match Score: {activeModalLook.matchScore}%
                  </div>
                </div>

                {/* Detail Image Thumbnails */}
                {activeModalLook.detailImages && activeModalLook.detailImages.length > 0 && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveImageIndex(0)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        activeImageIndex === 0 ? 'scale-105 shadow-md' : 'opacity-60 hover:opacity-100'
                      }`}
                      style={{ borderColor: activeImageIndex === 0 ? themeConfig.primaryAccent : 'transparent' }}
                    >
                      <img src={activeModalLook.imageUrl} alt="Look" className="w-full h-full object-cover" />
                    </button>
                    {activeModalLook.detailImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i + 1)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                          activeImageIndex === i + 1 ? 'scale-105 shadow-md' : 'opacity-60 hover:opacity-100'
                        }`}
                        style={{ borderColor: activeImageIndex === i + 1 ? themeConfig.primaryAccent : 'transparent' }}
                      >
                        <img src={img} alt={`Detail ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Look Information */}
              <div className="md:col-span-6 space-y-4">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest font-bold" style={{ color: themeConfig.secondaryAccent }}>
                    {activeModalLook.vibe}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-1">
                    {activeModalLook.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-80 mt-2 leading-relaxed">
                    {activeModalLook.description}
                  </p>
                </div>

                {/* Items in Look */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider opacity-75 mb-2.5 font-mono">
                    Items in this Outfit ({activeModalLook.items.length} items)
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {activeModalLook.items.map((item) => (
                      <div key={item.id} className="p-3 rounded-xl glass-panel flex items-center justify-between text-xs border border-white/5">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-black" />
                          <div>
                            <div className="font-semibold">{item.name}</div>
                            <div className="text-[11px] opacity-70">{item.brand} • <span className="text-emerald-400">In Stock</span></div>
                          </div>
                        </div>
                        <div className="font-mono font-bold" style={{ color: themeConfig.primaryAccent }}>
                          ${item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Styling Advice */}
                <div className="p-3.5 rounded-2xl glass-panel border border-white/10 text-xs space-y-1">
                  <span className="font-bold block" style={{ color: themeConfig.primaryAccent }}>
                    Best For: {activeModalLook.occasion}
                  </span>
                  <p className="opacity-80">{activeModalLook.stylingTips[0]}</p>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => {
                      setActiveModalLook(null);
                      onStartStyling();
                    }}
                    className="flex-1 py-3.5 rounded-full font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 text-slate-900 shadow-xl cursor-pointer"
                    style={{ backgroundColor: themeConfig.primaryAccent }}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Book a Demo to See This Live</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
