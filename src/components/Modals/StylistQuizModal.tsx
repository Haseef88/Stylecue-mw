import React, { useMemo, useState } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  ShoppingBag,
  CheckCircle2,
  Ruler
} from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { CURATED_LOOKS } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

interface StylistQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Gender = 'Men' | 'Women' | 'Boys' | 'Girls';
type Category = 'Full Outfit' | 'Tops' | 'Bottoms' | 'Outerwear';
type Occasion = 'Casual' | 'Work' | 'Wedding' | 'Party';
type BodyType = 'Slim' | 'Athletic' | 'Regular' | 'Plus Size';
type SizeOption = 'XS' | 'S' | 'M' | 'L' | 'XL';

const GENDERS: Gender[] = ['Men', 'Women', 'Boys', 'Girls'];
const CATEGORIES: Category[] = ['Full Outfit', 'Tops', 'Bottoms', 'Outerwear'];
const OCCASIONS: { id: Occasion; tag: string }[] = [
  { id: 'Casual', tag: 'Casual' },
  { id: 'Work', tag: 'Office' },
  { id: 'Wedding', tag: 'Formal' },
  { id: 'Party', tag: 'Party' }
];
const SKIN_TONES: { name: string; swatch: string }[] = [
  { name: 'Fair', swatch: '#F3D5B5' },
  { name: 'Light Medium', swatch: '#E0AC85' },
  { name: 'Medium', swatch: '#C68A5D' },
  { name: 'Tan', swatch: '#9A6B44' },
  { name: 'Deep', swatch: '#5C3A28' }
];
const BODY_TYPES: BodyType[] = ['Slim', 'Athletic', 'Regular', 'Plus Size'];
const SIZES: SizeOption[] = ['XS', 'S', 'M', 'L', 'XL'];

const STEP_LABELS = [
  'Gender',
  'Category',
  'Occasion',
  'Skin Tone',
  'Body Type',
  'Measurements',
  'Your Outfit',
  'Confirm'
];

export const StylistQuizModal: React.FC<StylistQuizModalProps> = ({ isOpen, onClose }) => {
  const { themeConfig } = useTheme();

  const [step, setStep] = useState(0);
  const [gender, setGender] = useState<Gender | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [skinTone, setSkinTone] = useState<string | null>(null);
  const [bodyType, setBodyType] = useState<BodyType | null>(null);
  const [size, setSize] = useState<SizeOption | null>(null);
  const [height, setHeight] = useState('');
  const [waist, setWaist] = useState('');
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [sessionId] = useState(() => Math.floor(1000 + Math.random() * 9000));

  const recommendedLook = useMemo(() => {
    if (!occasion) return CURATED_LOOKS[0];
    const occasionMeta = OCCASIONS.find((o) => o.id === occasion);
    const match = CURATED_LOOKS.find((look) =>
      look.tags.some((t) => t.toLowerCase().includes(occasionMeta?.tag.toLowerCase() ?? ''))
    );
    return match ?? CURATED_LOOKS[0];
  }, [occasion]);

  if (!isOpen) return null;

  const totalSteps = STEP_LABELS.length;

  const resetAndClose = () => {
    setStep(0);
    setGender(null);
    setCategory(null);
    setOccasion(null);
    setSkinTone(null);
    setBodyType(null);
    setSize(null);
    setHeight('');
    setWaist('');
    setSelectedItemIds([]);
    setIsConfirmed(false);
    onClose();
  };

  const goNext = () => {
    if (step === 5) {
      setSelectedItemIds(recommendedLook.items.map((i) => i.id));
    }
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const toggleItem = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const canProceed = (() => {
    switch (step) {
      case 0: return !!gender;
      case 1: return !!category;
      case 2: return !!occasion;
      case 3: return !!skinTone;
      case 4: return !!bodyType;
      case 5: return !!size || (!!height && !!waist);
      case 6: return selectedItemIds.length > 0;
      default: return true;
    }
  })();

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const OptionButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
    swatch?: string;
  }> = ({ label, isActive, onClick, swatch }) => (
    <button
      onClick={onClick}
      className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer border flex items-center justify-center gap-2 ${
        isActive ? 'glass-panel-elevated shadow-md' : 'glass-panel opacity-75 hover:opacity-100'
      }`}
      style={{ borderColor: isActive ? themeConfig.primaryAccent : 'transparent', color: isActive ? themeConfig.primaryAccent : undefined }}
    >
      {swatch && (
        <span className="w-4 h-4 rounded-full border border-black/20 flex-shrink-0" style={{ backgroundColor: swatch }}></span>
      )}
      <span>{label}</span>
      {isActive && <Check className="w-3.5 h-3.5" />}
    </button>
  );

  const totalPrice = recommendedLook.items
    .filter((i) => selectedItemIds.includes(i.id))
    .reduce((acc, i) => acc + i.price, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="glass-panel-elevated border border-white/20 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 glass-panel sticky top-0 z-10 backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <BrandLogo className="w-6 h-6" label="StyleCue" />
            <span className="font-bold text-sm uppercase tracking-wider">
              AI Stylist <span style={{ color: themeConfig.primaryAccent }}>Kiosk Demo</span>
            </span>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1 rounded-full opacity-70 hover:opacity-100 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isConfirmed && (
          <div className="px-6 pt-5">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider opacity-70 mb-2">
              <span>Step {step + 1} of {totalSteps}</span>
              <span>{STEP_LABELS[step]}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((step + 1) / totalSteps) * 100}%`,
                  backgroundColor: themeConfig.primaryAccent
                }}
              ></div>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold mb-1">Who are we styling today?</h3>
                <p className="text-xs opacity-70">This helps the kiosk pull from the right part of the store's catalog.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {GENDERS.map((g) => (
                  <OptionButton key={g} label={g} isActive={gender === g} onClick={() => setGender(g)} />
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold mb-1">What are you shopping for?</h3>
                <p className="text-xs opacity-70">Pick a starting point — you can always add more pieces later.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map((c) => (
                  <OptionButton key={c} label={c} isActive={category === c} onClick={() => setCategory(c)} />
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold mb-1">What's the occasion?</h3>
                <p className="text-xs opacity-70">The AI matches styling and formality to what you're dressing for.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {OCCASIONS.map((o) => (
                  <OptionButton key={o.id} label={o.id} isActive={occasion === o.id} onClick={() => setOccasion(o.id)} />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold mb-1">Which shade is closest to you?</h3>
                <p className="text-xs opacity-70">Used for color matching only — this isn't saved after your visit.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SKIN_TONES.map((t) => (
                  <OptionButton
                    key={t.name}
                    label={t.name}
                    swatch={t.swatch}
                    isActive={skinTone === t.name}
                    onClick={() => setSkinTone(t.name)}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold mb-1">Which body type fits best?</h3>
                <p className="text-xs opacity-70">Helps the AI pick cuts and silhouettes that suit you.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {BODY_TYPES.map((b) => (
                  <OptionButton key={b} label={b} isActive={bodyType === b} onClick={() => setBodyType(b)} />
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold mb-1">Let's get your size right</h3>
                <p className="text-xs opacity-70">Pick a standard size, or enter measurements if you know them — either works.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider opacity-75 mb-2.5 font-mono">
                  Standard Size
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {SIZES.map((s) => (
                    <OptionButton key={s} label={s} isActive={size === s} onClick={() => setSize(s)} />
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-75 mb-2.5 font-mono">
                  <Ruler className="w-3.5 h-3.5" />
                  Or Enter Measurements (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Height (cm)"
                      className="w-full glass-panel border border-white/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                      placeholder="Waist (in)"
                      className="w-full glass-panel border border-white/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">{recommendedLook.title}</h3>
                  <p className="text-xs opacity-70">Matched from this store's own in-stock inventory.</p>
                </div>
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5"
                  style={{ backgroundColor: `${themeConfig.primaryAccent}20`, color: themeConfig.primaryAccent }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {recommendedLook.matchScore}% Match
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden h-56 relative border border-white/10">
                <img src={recommendedLook.imageUrl} alt={recommendedLook.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider opacity-75 font-mono flex items-center justify-between">
                  <span>Pieces in this Outfit</span>
                  <span style={{ color: themeConfig.primaryAccent }}>Total: ${totalPrice.toLocaleString()}</span>
                </div>
                {recommendedLook.items.map((item) => {
                  const isSelected = selectedItemIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl glass-panel flex items-center justify-between gap-3 border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-black/50" />
                        <div>
                          <div className="text-xs font-semibold">{item.name}</div>
                          <div className="text-[11px] opacity-70">
                            <span className="text-emerald-400 font-medium">In Stock</span> • ${item.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`p-2 rounded-xl transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'glass-panel opacity-75 hover:opacity-100'
                        }`}
                      >
                        {isSelected ? <CheckCircle2 className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 7 && !isConfirmed && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold mb-1">Ready to try these on?</h3>
                <p className="text-xs opacity-70">Confirming sends your picks straight to the sales floor.</p>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between opacity-80"><span>Outfit</span><span className="font-semibold">{recommendedLook.title}</span></div>
                <div className="flex justify-between opacity-80"><span>Items Selected</span><span className="font-semibold">{selectedItemIds.length}</span></div>
                <div className="flex justify-between opacity-80"><span>Size</span><span className="font-semibold">{size ?? `${height}cm / ${waist}in`}</span></div>
                <div className="flex justify-between pt-2 border-t border-white/10 font-bold">
                  <span>Total</span>
                  <span style={{ color: themeConfig.primaryAccent }}>${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full text-slate-900 py-3.5 rounded-xl font-bold text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 active:scale-95"
                style={{ backgroundColor: themeConfig.primaryAccent }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm & Notify Staff</span>
              </button>
            </div>
          )}

          {step === 7 && isConfirmed && (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
              <div>
                <h3 className="text-xl font-bold mb-1">Staff Notified!</h3>
                <p className="text-sm opacity-75 max-w-sm mx-auto leading-relaxed">
                  Session #{sessionId} has been sent to the fitting room team — they're bringing your picks over now.
                </p>
              </div>
              <p className="text-[11px] opacity-60 font-mono">
                Your measurements and preferences from this session will be cleared automatically.
              </p>
              <button
                onClick={resetAndClose}
                className="mt-2 text-slate-900 px-8 py-3 rounded-full font-bold text-xs transition-all shadow-lg cursor-pointer hover:opacity-90 active:scale-95"
                style={{ backgroundColor: themeConfig.primaryAccent }}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {!(step === 7 && isConfirmed) && (
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between gap-3">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="px-5 py-2.5 rounded-full text-xs font-semibold glass-panel border border-white/10 flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer opacity-85 hover:opacity-100"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {step < 7 && (
              <button
                onClick={goNext}
                disabled={!canProceed}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:opacity-90 active:scale-95"
                style={{ backgroundColor: themeConfig.primaryAccent }}
              >
                <span>{step === 6 ? 'Review & Confirm' : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};