import { useState } from 'react';

const FORMATS = [
  'Executive Bullet Points',
  '1-Paragraph Overview',
  'Detailed Chapter Breakdown',
  'Key Action Items',
];

const FOCUS_AREAS = [
  'General Summary',
  'Financial Metrics',
  'Legal & Risks',
  'Technical Details',
];

export default function ControlPanel({ onAnalyze, loading, hasFile }) {
  const [format, setFormat] = useState(FORMATS[0]);
  const [focus, setFocus] = useState(FOCUS_AREAS[0]);

  const handleClick = () => {
    if (!hasFile) return;
    onAnalyze(format, focus);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-body font-semibold text-on-surface-variant uppercase tracking-widest ml-1">
          Summary Format
        </label>
        <div className="relative">
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full bg-surface-container-high/50 border border-outline-variant rounded-lg px-4 py-3 appearance-none text-on-surface focus:ring-2 focus:ring-primary/40 outline-none transition-all text-sm font-body"
          >
            {FORMATS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-xl">
            expand_more
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-body font-semibold text-on-surface-variant uppercase tracking-widest ml-1">
          Focus Area
        </label>
        <div className="relative">
          <select
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            className="w-full bg-surface-container-high/50 border border-outline-variant rounded-lg px-4 py-3 appearance-none text-on-surface focus:ring-2 focus:ring-primary/40 outline-none transition-all text-sm font-body"
          >
            {FOCUS_AREAS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-xl">
            target
          </span>
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={loading || !hasFile}
        className={`group relative w-full overflow-hidden rounded-lg py-4 px-6 font-bold transition-all active:scale-95 ${
          loading || !hasFile
            ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
            : 'bg-primary text-on-primary hover:shadow-[0_0_20px_rgba(78,222,163,0.4)]'
        }`}
      >
        <div className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin text-on-primary" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm font-body font-bold uppercase tracking-tight">
                Analyzing...
              </span>
            </>
          ) : (
            <>
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span className="text-xs sm:text-sm font-body font-bold uppercase tracking-tight">
                Analyze & Summarize
              </span>
            </>
          )}
        </div>
        {!loading && hasFile && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        )}
      </button>
    </div>
  );
}
