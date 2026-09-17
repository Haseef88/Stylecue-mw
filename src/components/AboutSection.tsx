import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const AboutSection: React.FC = () => {
  const { themeConfig } = useTheme();

  return (
    <section id="about-us" className="px-4 sm:px-8 md:px-16 w-full max-w-[1440px] mx-auto py-16 md:py-24 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Story */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border text-xs uppercase tracking-widest font-mono">
            <Sparkles className="w-3.5 h-3.5" style={{ color: themeConfig.primaryAccent }} />
            Our Mission
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Bringing AI Styling <span style={{ color: themeConfig.primaryAccent }}>Onto the Shop Floor</span>
          </h2>

          <p className="text-base sm:text-lg opacity-80 leading-relaxed font-normal">
            Most fashion shopping in Sri Lanka still happens in physical stores, not online. StyleCue builds customized AI styling kiosks that bring a personal-stylist experience directly to retail fashion stores — matching each shopper to outfits already on the rack, sized to fit.
          </p>

          <p className="text-sm opacity-70 leading-relaxed">
            A shopper walks up to the kiosk, answers a few quick questions about who they're shopping for, their measurements, and the occasion, and gets outfit recommendations pulled from that store's own live inventory — then a staff member brings the picks straight to the fitting room.
          </p>

          {/* Core Values / Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-2xl glass-panel border border-white/5 space-y-1">
              <div className="text-2xl font-bold font-mono" style={{ color: themeConfig.primaryAccent }}>
                80%+
              </div>
              <div className="text-xs font-semibold">Of Fashion Sales Are In-Store</div>
              <div className="text-[11px] opacity-60">Sri Lanka's fashion market is still overwhelmingly a physical-retail one — that's exactly where StyleCue fits</div>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-white/5 space-y-1">
              <div className="text-2xl font-bold font-mono" style={{ color: themeConfig.secondaryAccent }}>
                Built Locally
              </div>
              <div className="text-xs font-semibold">Designed for Sri Lankan Retailers</div>
              <div className="text-[11px] opacity-60">Sized, priced, and built around the way local fashion stores actually stock and sell</div>
            </div>
          </div>
        </div>

        {/* Right Column: Image Collage */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
          <div className="space-y-4">
            <div className="h-64 sm:h-72 rounded-3xl overflow-hidden glass-panel border shadow-xl relative group">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80"
                alt="Kiosk Design"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-[11px] font-mono text-white/90 font-semibold">
                Kiosk Design
              </div>
            </div>

            <div className="h-44 sm:h-52 rounded-3xl overflow-hidden glass-panel border shadow-xl relative group">
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
                alt="Fabrics and Colors"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-[11px] font-mono text-white/90 font-semibold">
                Colors & Fit Matching
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 sm:pt-8">
            <div className="h-44 sm:h-52 rounded-3xl overflow-hidden glass-panel border shadow-xl relative group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                alt="In-Store Fitting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-[11px] font-mono text-white/90 font-semibold">
                In-Store Fitting
              </div>
            </div>

            <div className="h-64 sm:h-72 rounded-3xl overflow-hidden glass-panel border shadow-xl relative group">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80"
                alt="Outfit Curation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-[11px] font-mono text-white/90 font-semibold">
                Outfit Matching
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};