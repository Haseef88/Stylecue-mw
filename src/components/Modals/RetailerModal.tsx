import React, { useState } from 'react';
import { X, Building2, Mail, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { useTheme } from '../../context/ThemeContext';

interface RetailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RetailerModal: React.FC<RetailerModalProps> = ({ isOpen, onClose }) => {
  const { themeConfig } = useTheme();
  const [brandName, setBrandName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [skuCount, setSkuCount] = useState('10k – 100k Items');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="glass-panel-elevated border border-white/20 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 glass-panel">
          <div className="flex items-center gap-2.5">
            <BrandLogo className="w-6 h-6" label="StyleCue" />
            <span className="font-bold text-sm uppercase tracking-wider">
              StyleCue <span style={{ color: themeConfig.primaryAccent }}>Partner Program</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full opacity-70 hover:opacity-100 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-xl font-bold">Request Received!</h4>
              <p className="text-xs opacity-75 max-w-sm mx-auto leading-relaxed">
                Our team will reach out within 1–2 business days to talk through a kiosk pilot for your store.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Bring a Kiosk to Your Store</h3>
                <p className="text-xs opacity-75">
                  Give your shoppers an AI styling kiosk matched to your store's own inventory.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider opacity-75 mb-1.5 font-mono">
                    Store or Brand Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 opacity-50 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g. Modern Atelier"
                      className="w-full glass-panel border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider opacity-75 mb-1.5 font-mono">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 opacity-50 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="you@brand.com"
                      className="w-full glass-panel border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider opacity-75 mb-1.5 font-mono">
                    Website or Social Page
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 opacity-50 absolute left-3.5 top-3" />
                    <input
                      type="url"
                      required
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourstore.com"
                      className="w-full glass-panel border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider opacity-75 mb-1.5 font-mono">
                    Approximate Product Count
                  </label>
                  <select
                    value={skuCount}
                    onChange={(e) => setSkuCount(e.target.value)}
                    className="w-full glass-panel border border-white/15 rounded-xl px-3 py-2.5 text-xs focus:outline-none bg-black/80"
                  >
                    <option value="Under 1k Items">Under 1k Items</option>
                    <option value="1k – 10k Items">1k – 10k Items</option>
                    <option value="10k+ Items">10k+ Items</option>
                    <option value="Boutique / Independent Store">Boutique / Independent Store</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full text-slate-900 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: themeConfig.primaryAccent }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request a Pilot</span>
                </button>
              </div>

              <p className="text-[11px] opacity-60 text-center font-mono">
                We're onboarding early partners by hand — our team will walk you through setup directly.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
