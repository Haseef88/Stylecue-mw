import React from 'react';
import { X, ShieldCheck, FileText, Cookie, Newspaper, Headphones } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface InfoModalProps {
  type: 'privacy' | 'terms' | 'cookies' | 'press' | 'support' | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  const { themeConfig } = useTheme();
  if (!type) return null;

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
          body: (
            <div className="space-y-4 text-xs leading-relaxed opacity-80">
              <p>
                We respect your store's privacy. Product catalog data and shopper session details stay private to your store and are never sold.
              </p>
              <h5 className="font-bold text-sm" style={{ color: themeConfig.primaryAccent }}>1. No Account, No Login</h5>
              <p>
                We do not sell your store's product data, shopper session data, or contact information to advertisers or other retailers.
              </p>
              <h5 className="font-bold text-sm" style={{ color: themeConfig.primaryAccent }}>2. Secure Storage</h5>
              <p>
                Shopper measurements and preferences collected at the kiosk are stored securely and tied only to that session, so recommendations stay accurate to your store's own inventory.
              </p>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: <FileText className="w-5 h-5" style={{ color: themeConfig.primaryAccent }} />,
          body: (
            <div className="space-y-4 text-xs leading-relaxed opacity-80">
              <p>
                By using StyleCue, your store agrees to our standard kiosk service terms.
              </p>
              <h5 className="font-bold text-sm" style={{ color: themeConfig.primaryAccent }}>1. Your Own Inventory Only</h5>
              <p>
                The kiosk only recommends items from your store's own product catalog — never from an outside catalog or other retailer.
              </p>
              <h5 className="font-bold text-sm" style={{ color: themeConfig.primaryAccent }}>2. Prices & Availability You Control</h5>
              <p>
                Prices and stock levels shown at the kiosk come directly from what your store enters into the system. Checkout and payment happen in-store, the same way they always have.
              </p>
            </div>
          )
        };
      case 'cookies':
        return {
          title: 'Cookie Preferences',
          icon: <Cookie className="w-5 h-5 text-amber-400" />,
          body: (
            <div className="space-y-4 text-xs leading-relaxed opacity-80">
              <p>
                We use cookies on this website to save your theme preference (light or dark mode) and keep you signed in to your retailer account.
              </p>
              <div className="p-4 rounded-xl glass-panel space-y-2">
                <div className="flex items-center justify-between font-bold text-xs">
                  <span>Theme & Account Session</span>
                  <span className="text-emerald-400 font-mono">Always Active</span>
                </div>
                <div className="flex items-center justify-between font-bold text-xs">
                  <span>Website Speed & Performance</span>
                  <span className="text-emerald-400 font-mono">Active</span>
                </div>
              </div>
            </div>
          )
        };
      case 'press':
        return {
          title: 'Press & Media',
          icon: <Newspaper className="w-5 h-5 text-sky-400" />,
          body: (
            <div className="space-y-4 text-xs leading-relaxed opacity-80">
              <p>
                For press inquiries, logos, or interview requests:
              </p>
              <div className="p-4 rounded-xl glass-panel space-y-1 font-mono">
                <div className="font-bold" style={{ color: themeConfig.primaryAccent }}>Press Relations</div>
                <div>press@stylecue.ai</div>
                <div>Based in Sri Lanka</div>
              </div>
            </div>
          )
        };
      case 'support':
        return {
          title: 'Customer Support',
          icon: <Headphones className="w-5 h-5 text-purple-400" />,
          body: (
            <div className="space-y-4 text-xs leading-relaxed opacity-80">
              <p>
                Have a question about setting up your kiosk, your store's catalog, or a shopper session? We're here to help.
              </p>
              <div className="p-4 rounded-xl glass-panel space-y-1 font-mono">
                <div className="font-bold" style={{ color: themeConfig.primaryAccent }}>Get in Touch</div>
                <div>support@stylecue.ai</div>
                <div className="text-[11px] opacity-70">We're a small team in early access — we'll get back to you as quickly as we can</div>
              </div>
            </div>
          )
        };
      default:
        return { title: '', icon: null, body: null };
    }
  };

  const { title, icon, body } = getContent();

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="glass-panel-elevated border border-white/20 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 glass-panel">
          <div className="flex items-center gap-2.5">
            {icon}
            <h3 className="font-bold text-sm uppercase tracking-wide">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full opacity-70 hover:opacity-100 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {body}

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full text-slate-900 py-3 rounded-xl font-bold text-xs transition-all shadow-lg hover:opacity-90 active:scale-95 cursor-pointer"
              style={{ backgroundColor: themeConfig.primaryAccent }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};