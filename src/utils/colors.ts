export const COLOR_KEYS = [
  'blue',
  'emerald',
  'amber',
  'violet',
  'red',
  'cyan',
  'lime',
  'orange',
] as const;

export type ColorKey = (typeof COLOR_KEYS)[number];

export const COLORS: Record<ColorKey, string> = {
  blue: '#3b82f6',
  emerald: '#10b981',
  amber: '#f59e0b',
  violet: '#8b5cf6',
  red: '#ef4444',
  cyan: '#06b6d4',
  lime: '#84cc16',
  orange: '#f97316',
};

export const BG_COLOR_MAP = {
  blue: 'bg-blue',
  emerald: 'bg-emerald',
  amber: 'bg-amber',
  violet: 'bg-violet',
  red: 'bg-red',
  cyan: 'bg-cyan',
  lime: 'bg-lime',
  orange: 'bg-orange',
};
