// Vector recreation of the JKV mark (teal J-K-V with the white K leg).
// The original artwork is kept at /public/brand/jkv-logo-original.jpg.
export default function Logo({ className = "h-8 w-auto", withTagline = false }: { className?: string; withTagline?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <svg viewBox="0 0 260 80" className={className} role="img" aria-label="JKV Prime">
        <defs>
          <linearGradient id="jkv-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1FC9A8" />
            <stop offset="1" stopColor="#0D6B57" />
          </linearGradient>
        </defs>
        <g fill="url(#jkv-g)" stroke="#3FE3C6" strokeWidth="1.2" strokeOpacity=".6">
          {/* J */}
          <path d="M44 4h22v46c0 17-12 28-30 28H4V60h30c7 0 10-4 10-11z" />
          {/* K stem */}
          <path d="M80 4h22v74H80z" />
          {/* K upper arm */}
          <path d="M102 46 140 4h30l-44 50z" />
          {/* V */}
          <path d="M150 40l20-14 22 40 42-62h24l-56 74h-20z" />
        </g>
        {/* white K leg */}
        <path d="M112 44h22l30 34h-26z" fill="#F4F7FA" />
        <path d="M134 62h12l18 16h-18z" fill="#D8DEE6" />
      </svg>
      {withTagline ? null : (
        <span className="hidden font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-mist-body sm:inline">Prime</span>
      )}
    </span>
  );
}
