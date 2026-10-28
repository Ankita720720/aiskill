import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  Check,
  Sparkles,
  Layout,
  Sun,
  Moon,
  X,
  Layers,
  Sliders,
  CheckCircle2,
  BrainCircuit,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { useTheme, DESIGN_PRESETS, DesignId, CardStyle, LayoutDensity } from '../../context/ThemeContext';
import { UserProfile } from '../../types';

interface DesignSelectorModalProps {
  user: UserProfile;
}

export const DesignSelectorModal: React.FC<DesignSelectorModalProps> = ({ user }) => {
  const {
    designId,
    design,
    cardStyle,
    density,
    setDesignId,
    setCardStyle,
    setDensity,
    isDesignModalOpen,
    setIsDesignModalOpen,
  } = useTheme();

  const [previewDesignId, setPreviewDesignId] = useState<DesignId>(designId);
  const [showAppliedToast, setShowAppliedToast] = useState(false);

  if (!isDesignModalOpen) return null;

  const currentPreviewPreset = DESIGN_PRESETS[previewDesignId];

  const handleApply = (id: DesignId) => {
    setDesignId(id);
    setPreviewDesignId(id);
    setShowAppliedToast(true);
    setTimeout(() => {
      setShowAppliedToast(false);
    }, 2500);
  };

  const designsList = Object.values(DESIGN_PRESETS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">Design &amp; Theme Studio</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-100 text-indigo-700">
                  5 Professional Light Themes
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Choose your ideal professional visual style, color palette, and layout aesthetics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDesignModalOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Two Column (Catalog on Left, Live Interactive Preview on Right) */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Designs Catalog Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Design Archetype
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Click any design to preview &amp; apply
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {designsList.map((item) => {
                const isSelected = designId === item.id;
                const isPreviewing = previewDesignId === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setPreviewDesignId(item.id);
                      handleApply(item.id);
                    }}
                    className={`relative p-4 rounded-2xl border-2 text-left cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/30 shadow-md ring-2 ring-indigo-500/20'
                        : isPreviewing
                        ? 'border-slate-400 bg-slate-50 shadow-xs'
                        : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    {/* Top Tag & Mode Icon */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {item.tag}
                      </span>
                      <div className="flex items-center gap-1">
                        {item.mode === 'light' ? (
                          <Sun className="w-3.5 h-3.5 text-amber-500" />
                        ) : (
                          <Moon className="w-3.5 h-3.5 text-indigo-400" />
                        )}
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Name & Subtitle */}
                    <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                    <p className="text-[11px] text-slate-500 mb-3">{item.subtitle}</p>

                    {/* Color Swatch Dots */}
                    <div className="flex items-center gap-1.5 pt-1">
                      {item.paletteColors.map((c, i) => (
                        <span
                          key={i}
                          className="w-4 h-4 rounded-full border border-slate-300/80 shadow-xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Selection Footer */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <span className={`text-[11px] font-semibold ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`}>
                        {isSelected ? 'Active Theme' : 'Apply Theme'}
                      </span>
                      <span className={`text-xs ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}>
                        →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Customization Options Bar: Card Style & Density */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card Style Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>Card Surface Style</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
                  {(['bordered', 'elevated', 'accent-top'] as CardStyle[]).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setCardStyle(style)}
                      className={`py-1 text-[11px] font-semibold rounded-lg capitalize transition-all ${
                        cardStyle === style
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {style.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout Density Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  <span>Layout Density</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
                  {(['comfortable', 'compact'] as LayoutDensity[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDensity(d)}
                      className={`py-1 text-[11px] font-semibold rounded-lg capitalize transition-all ${
                        density === d
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive Mockup Preview */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Live Interface Preview
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Live Responsive Mode
              </span>
            </div>

            {/* Mockup Canvas */}
            <div className={`flex-1 rounded-2xl p-4 border ${currentPreviewPreset.bgPage} ${currentPreviewPreset.borderCard} flex flex-col justify-between space-y-3.5 shadow-sm`}>
              
              {/* Mini App Header Preview */}
              <div className={`p-3 rounded-xl ${currentPreviewPreset.bgCard} border ${currentPreviewPreset.borderCard} flex items-center justify-between shadow-xs`}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`text-xs font-bold ${currentPreviewPreset.textPrimary}`}>SkillTwin AI</span>
                    <p className={`text-[9px] ${currentPreviewPreset.textMuted}`}>Platform</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${currentPreviewPreset.accentBadge}`}>
                    {user.readinessScore}% Ready
                  </span>
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-slate-300"
                  />
                </div>
              </div>

              {/* Mini Hero Card Preview */}
              <div className={`p-4 rounded-xl ${currentPreviewPreset.bgCard} border ${currentPreviewPreset.borderCard} relative overflow-hidden shadow-xs`}>
                {cardStyle === 'accent-top' && (
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${currentPreviewPreset.primaryColor}`} />
                )}
                
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${currentPreviewPreset.primaryText}`}>
                      Career Intelligence
                    </span>
                    <h4 className={`text-sm font-bold ${currentPreviewPreset.textPrimary} mt-0.5`}>
                      {user.name}
                    </h4>
                    <p className={`text-[11px] ${currentPreviewPreset.textSecondary} mt-0.5`}>
                      {user.role} • Placement Chance {user.placementProbability}%
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    {user.readinessScore}%
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className={currentPreviewPreset.textMuted}>Target: Senior AI Scientist</span>
                  <span className={`font-semibold ${currentPreviewPreset.primaryText} flex items-center gap-1`}>
                    View Skills <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Mini Metric Grid Preview */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className={`p-3 rounded-xl ${currentPreviewPreset.bgCard} border ${currentPreviewPreset.borderCard} shadow-xs`}>
                  <span className={`text-[10px] ${currentPreviewPreset.textMuted} block`}>Weekly Streak</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className={`text-base font-bold ${currentPreviewPreset.textPrimary}`}>7 Days</span>
                    <span className="text-[10px] font-bold text-amber-600">🔥 Active</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl ${currentPreviewPreset.bgCard} border ${currentPreviewPreset.borderCard} shadow-xs`}>
                  <span className={`text-[10px] ${currentPreviewPreset.textMuted} block`}>Adaptive Tests</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className={`text-base font-bold ${currentPreviewPreset.textPrimary}`}>12 Complete</span>
                    <span className="text-[10px] font-bold text-emerald-600">82% Avg</span>
                  </div>
                </div>
              </div>

              {/* Preset Summary Info */}
              <div className="p-3 rounded-xl bg-white/80 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>{currentPreviewPreset.name}</span>
                  <span className="text-[10px] text-slate-500">{currentPreviewPreset.subtitle}</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  {currentPreviewPreset.description}
                </p>
              </div>

              {/* 1-Click Apply Button */}
              <button
                type="button"
                onClick={() => {
                  handleApply(previewDesignId);
                  setIsDesignModalOpen(false);
                }}
                className={`w-full py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all ${currentPreviewPreset.primaryColor} ${currentPreviewPreset.primaryHover}`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Confirm &amp; Apply {currentPreviewPreset.name}</span>
              </button>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs text-slate-600 font-medium">
              Currently Selected: <strong>{design.name}</strong> ({design.subtitle})
            </span>
          </div>

          <button
            onClick={() => setIsDesignModalOpen(false)}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
          >
            Done
          </button>
        </div>

      </motion.div>

      {/* Floating Applied Toast Notification */}
      <AnimatePresence>
        {showAppliedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3 text-xs"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold">Design Applied Successfully!</p>
              <p className="text-[11px] text-slate-300">Switched to {design.name}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
