import React from 'react';
import { Store, ShoppingBag, RefreshCw, ArrowRight, Wrench } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface RetailersSectionProps {
  onOpenRetailerModal: () => void;
}

export const RetailersSection: React.FC<RetailersSectionProps> = ({ onOpenRetailerModal }) => {
  const { themeConfig } = useTheme();

  return (
    <section id="for-retailers" className="px-4 sm:px-8 md:px-16 w-full max-w-[1440px] mx-auto py-16 md:py-24 relative">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border text-xs uppercase tracking-widest font-mono">
          <Store className="w-3.5 h-3.5" style={{ color: themeConfig.primaryAccent }} />
          For Retailers & Brands
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          StyleCue for <span style={{ color: themeConfig.primaryAccent }}>Fashion Brands & Stores</span>
        </h2>
        <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto font-normal">
          Help your shoppers walk out with complete, matching outfits — sized right the first time.
        </p>
      </div>

      {/* What the kiosk gives your store */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border mb-16 shadow-xl">
        <h3 className="text-lg font-bold mb-6 text-center">What Your Store Gets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-sm font-semibold" style={{ color: themeConfig.primaryAccent }}>An In-Store Kiosk</div>
            <p className="text-xs opacity-70 leading-relaxed">A physical AI styling kiosk on your shop floor, matched to your store's own inventory.</p>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold" style={{ color: themeConfig.primaryAccent }}>A Staff Dashboard</div>
            <p className="text-xs opacity-70 leading-relaxed">Your team sees each shopper's picks and brings the right items straight to the fitting room.</p>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold" style={{ color: themeConfig.primaryAccent }}>Your Own Catalog</div>
            <p className="text-xs opacity-70 leading-relaxed">The kiosk recommends only what's actually on your shelves — nothing from anywhere else.</p>
          </div>
        </div>
      </div>

      {/* What we're building toward (MVP-stage, honest framing) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel-elevated p-8 rounded-3xl border relative overflow-hidden shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold mb-2" style={{ color: themeConfig.primaryAccent }}>Complete Outfits, Not Single Items</h4>
          <p className="text-sm opacity-80">
            Shoppers see a full matching outfit instead of one item at a time — designed to grow basket size.
          </p>
        </div>

        <div className="glass-panel-elevated p-8 rounded-3xl border relative overflow-hidden shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold mb-2" style={{ color: themeConfig.primaryAccent }}>Sized Before They Buy</h4>
          <p className="text-sm opacity-80">
            Matching size to measurements at the kiosk, before checkout, aims to cut down fit-related returns.
          </p>
        </div>

        <div className="glass-panel-elevated p-8 rounded-3xl border relative overflow-hidden shadow-xl">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
            style={{ backgroundColor: `${themeConfig.primaryAccent}20`, color: themeConfig.primaryAccent }}
          >
            <Wrench className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold mb-2" style={{ color: themeConfig.primaryAccent }}>Hands-On Setup, Together</h4>
          <p className="text-sm opacity-80">
            We're in early access — our team works directly with you to install the kiosk and load your catalog.
          </p>
        </div>
      </div>

      {/* Retail Partner Banner CTA */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">
            Want to be one of our first retail partners?
          </h3>
          <p className="text-sm opacity-75">
            Book a quick 15-minute call with our team to learn more.
          </p>
        </div>

        <button
          onClick={onOpenRetailerModal}
          className="text-slate-900 px-8 py-3.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 shadow-xl cursor-pointer whitespace-nowrap hover:opacity-90 active:scale-95"
          style={{ backgroundColor: themeConfig.primaryAccent }}
        >
          <span>Talk to Our Team</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
