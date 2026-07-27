export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest py-6 md:py-8 ring-1 ring-white/5">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="text-sm font-body text-on-surface-variant">
          &copy; 2024 DocSumo AI. Powered by Groq.
        </div>
        <div className="flex gap-6">
          <a className="text-sm font-body text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            API Docs
          </a>
          <a className="text-sm font-body text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
