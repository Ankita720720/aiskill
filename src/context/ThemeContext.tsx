import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type DesignId = 'executive' | 'nordic' | 'tech-iris' | 'editorial' | 'ocean' | 'dark-stealth';
export type ThemeMode = 'light' | 'dark';
export type CardStyle = 'bordered' | 'elevated' | 'accent-top';
export type LayoutDensity = 'comfortable' | 'compact';

export interface DesignPreset {
  id: DesignId;
  name: string;
  subtitle: string;
  tag: string;
  mode: ThemeMode;
  bgPage: string;
  bgCard: string;
  bgSubtle: string;
  borderCard: string;
  borderSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primaryColor: string;
  primaryHover: string;
  primaryText: string;
  primaryLightBg: string;
  primaryLightBorder: string;
  accentBadge: string;
  paletteColors: string[];
  description: string;
  previewClass: string;
}

export const DESIGN_PRESETS: Record<DesignId, DesignPreset> = {
  executive: {
    id: 'executive',
    name: 'Executive Alabaster',
    subtitle: 'Classic Enterprise Light',
    tag: 'Recommended for Ankita',
    mode: 'light',
    bgPage: 'bg-slate-50',
    bgCard: 'bg-white',
    bgSubtle: 'bg-slate-100/80',
    borderCard: 'border-slate-200/90',
    borderSubtle: 'border-slate-200/60',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-700',
    textMuted: 'text-slate-500',
    primaryColor: 'bg-indigo-600',
    primaryHover: 'hover:bg-indigo-700',
    primaryText: 'text-indigo-600',
    primaryLightBg: 'bg-indigo-50',
    primaryLightBorder: 'border-indigo-200',
    accentBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    paletteColors: ['#0f172a', '#4f46e5', '#38bdf8', '#f8fafc', '#ffffff'],
    description: 'Crisp corporate white with high-contrast slate text, royal indigo accents, and clean micro-borders. High clarity and executive presence.',
    previewClass: 'from-slate-50 to-indigo-50/40 text-slate-900 border-slate-200',
  },
  nordic: {
    id: 'nordic',
    name: 'Nordic Minimalist',
    subtitle: 'Calm Porcelain & Sage',
    tag: 'Zen Scandinavian',
    mode: 'light',
    bgPage: 'bg-[#faf9f6]',
    bgCard: 'bg-white',
    bgSubtle: 'bg-[#f3f2ee]',
    borderCard: 'border-stone-200',
    borderSubtle: 'border-stone-200/70',
    textPrimary: 'text-stone-900',
    textSecondary: 'text-stone-700',
    textMuted: 'text-stone-500',
    primaryColor: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    primaryText: 'text-emerald-600',
    primaryLightBg: 'bg-emerald-50',
    primaryLightBorder: 'border-emerald-200',
    accentBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    paletteColors: ['#1c1917', '#059669', '#10b981', '#faf9f6', '#ffffff'],
    description: 'Warm studio porcelain canvas with soft stone borders, rich emerald green accents, and tranquil aesthetic.',
    previewClass: 'from-[#faf9f6] to-emerald-50/30 text-stone-900 border-stone-200',
  },
  'tech-iris': {
    id: 'tech-iris',
    name: 'Modern Tech Iris',
    subtitle: 'Silicon Valley AI Studio',
    tag: 'Modern & Vibrant',
    mode: 'light',
    bgPage: 'bg-[#fcfcff]',
    bgCard: 'bg-white',
    bgSubtle: 'bg-violet-50/50',
    borderCard: 'border-zinc-200',
    borderSubtle: 'border-violet-100',
    textPrimary: 'text-zinc-900',
    textSecondary: 'text-zinc-700',
    textMuted: 'text-zinc-500',
    primaryColor: 'bg-violet-600',
    primaryHover: 'hover:bg-violet-700',
    primaryText: 'text-violet-600',
    primaryLightBg: 'bg-violet-50',
    primaryLightBorder: 'border-violet-200',
    accentBadge: 'bg-violet-50 text-violet-700 border-violet-200',
    paletteColors: ['#18181b', '#7c3aed', '#06b6d4', '#f5f3ff', '#ffffff'],
    description: 'Pure pearl white with electric violet and cyan highlights, subtle frosted headers, and sleek tech typography.',
    previewClass: 'from-[#fcfcff] to-violet-50/40 text-zinc-900 border-zinc-200',
  },
  editorial: {
    id: 'editorial',
    name: 'Editorial Ivory & Bronze',
    subtitle: 'Forbes & Academic Prestige',
    tag: 'Warm Executive',
    mode: 'light',
    bgPage: 'bg-[#faf7f2]',
    bgCard: 'bg-white',
    bgSubtle: 'bg-[#f4efe6]',
    borderCard: 'border-amber-200/80',
    borderSubtle: 'border-amber-100',
    textPrimary: 'text-neutral-900',
    textSecondary: 'text-neutral-700',
    textMuted: 'text-neutral-500',
    primaryColor: 'bg-amber-700',
    primaryHover: 'hover:bg-amber-800',
    primaryText: 'text-amber-700',
    primaryLightBg: 'bg-amber-50',
    primaryLightBorder: 'border-amber-200',
    accentBadge: 'bg-amber-50 text-amber-800 border-amber-200',
    paletteColors: ['#171717', '#b45309', '#f59e0b', '#faf7f2', '#ffffff'],
    description: 'Soft warm ivory with amber bronze highlights, warm charcoal typography, and classic authoritative poise.',
    previewClass: 'from-[#faf7f2] to-amber-50/50 text-neutral-900 border-amber-200',
  },
  ocean: {
    id: 'ocean',
    name: 'Oceanic Azure',
    subtitle: 'Fintech & Cloud Precision',
    tag: 'Crisp & Clean',
    mode: 'light',
    bgPage: 'bg-[#f4f9fd]',
    bgCard: 'bg-white',
    bgSubtle: 'bg-sky-50',
    borderCard: 'border-sky-200/80',
    borderSubtle: 'border-sky-100',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-700',
    textMuted: 'text-slate-500',
    primaryColor: 'bg-sky-600',
    primaryHover: 'hover:bg-sky-700',
    primaryText: 'text-sky-600',
    primaryLightBg: 'bg-sky-50',
    primaryLightBorder: 'border-sky-200',
    accentBadge: 'bg-sky-50 text-sky-700 border-sky-200',
    paletteColors: ['#0f172a', '#0284c7', '#06b6d4', '#f0f9ff', '#ffffff'],
    description: 'Frosty sky mist background with deep azure accents, crystal crisp card borders, and high-trust corporate polish.',
    previewClass: 'from-[#f4f9fd] to-sky-50/50 text-slate-900 border-sky-200',
  },
  'dark-stealth': {
    id: 'dark-stealth',
    name: 'Stealth Midnight',
    subtitle: 'Deep Developer Dark Mode',
    tag: 'Night Studio',
    mode: 'dark',
    bgPage: 'bg-slate-950',
    bgCard: 'bg-slate-900',
    bgSubtle: 'bg-slate-900/60',
    borderCard: 'border-slate-800',
    borderSubtle: 'border-slate-800/60',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    primaryColor: 'bg-indigo-600',
    primaryHover: 'hover:bg-indigo-500',
    primaryText: 'text-indigo-400',
    primaryLightBg: 'bg-indigo-950/40',
    primaryLightBorder: 'border-indigo-800/50',
    accentBadge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    paletteColors: ['#020617', '#0f172a', '#6366f1', '#38bdf8', '#ffffff'],
    description: 'Rich dark slate aesthetic for late-night study sessions with neon cybernetic accents.',
    previewClass: 'from-slate-950 to-slate-900 text-white border-slate-800',
  },
};

interface ThemeContextType {
  designId: DesignId;
  design: DesignPreset;
  cardStyle: CardStyle;
  density: LayoutDensity;
  setDesignId: (id: DesignId) => void;
  setCardStyle: (style: CardStyle) => void;
  setDensity: (density: LayoutDensity) => void;
  toggleThemeMode: () => void;
  isDesignModalOpen: boolean;
  setIsDesignModalOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to the requested professional light design: Executive Alabaster
  const [designId, setDesignId] = useState<DesignId>('executive');
  const [cardStyle, setCardStyle] = useState<CardStyle>('bordered');
  const [density, setDensity] = useState<LayoutDensity>('comfortable');
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);

  const design = DESIGN_PRESETS[designId] || DESIGN_PRESETS.executive;

  const toggleThemeMode = () => {
    if (design.mode === 'light') {
      setDesignId('dark-stealth');
    } else {
      setDesignId('executive');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        designId,
        design,
        cardStyle,
        density,
        setDesignId,
        setCardStyle,
        setDensity,
        toggleThemeMode,
        isDesignModalOpen,
        setIsDesignModalOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
