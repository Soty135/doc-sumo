import { useState } from 'react';

export default function Header({ onOpenDrawer }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container/70 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] ring-1 ring-white/5 overflow-x-hidden">
      <div className="h-16 px-4 md:px-8 lg:px-12 flex items-center justify-between min-w-0">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-lg">auto_awesome</span>
          </div>
          <span className="font-display text-lg md:text-xl font-bold text-on-surface tracking-tight">
            DocSumo AI
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={onOpenDrawer}
            className="text-sm font-body text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            Recent Summaries
          </button>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Desktop Groq Badge */}
          <div className="hidden md:flex items-center gap-2 bg-primary-container/10 px-3 py-1.5 rounded-full border border-primary-container/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-primary">
              Groq Llama 3 Engine Active
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3 border-l border-outline-variant pl-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center text-xs font-bold text-on-surface ring-2 ring-background">
              U
            </div>
          </div>

          {/* Mobile: hamburger + recent summaries */}
          <button
            onClick={onOpenDrawer}
            className="md:hidden p-1.5 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">history</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/30 bg-surface-container/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDrawer();
            }}
            className="block w-full text-left text-sm font-body text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer py-2"
          >
            Recent Summaries
          </button>
          <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-primary">
              Groq Llama 3 Engine Active
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
