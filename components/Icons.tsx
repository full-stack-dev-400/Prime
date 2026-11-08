type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const IconLayers = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 3 2 8l10 5 10-5-10-5z" /><path d="m2 13 10 5 10-5" /><path d="m2 17.5 10 5 10-5" opacity=".5" /></svg>
);
export const IconPlug = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0z" /><path d="M12 17v5" /></svg>
);
export const IconShield = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const IconBolt = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
);
export const IconChart = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 6-7" /></svg>
);
export const IconBuilding = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 21V5l8-3 8 3v16" /><path d="M9 21v-4h6v4M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01" /></svg>
);
export const IconCheck = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.4}><path d="m5 12 5 5 9-10" /></svg>
);
