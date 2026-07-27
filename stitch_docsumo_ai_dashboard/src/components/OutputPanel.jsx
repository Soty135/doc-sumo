import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

export default function OutputPanel({ summaryText, loading, fileName }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!summaryText) return;
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      toast.success('Summary copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy to clipboard.');
    }
  };

  const handleDownload = () => {
    if (!summaryText) return;
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `docsumo-summary-${fileName || 'document'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Summary downloaded!');
  };

  return (
    <div className="bg-surface-container/40 backdrop-blur-xl ring-1 ring-white/10 shadow-2xl rounded-xl min-h-[400px] md:min-h-[700px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 md:px-8 py-4 md:py-6 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-high/20">
        <div className="flex items-center gap-3 md:gap-4">
          <span className="material-symbols-outlined text-secondary text-lg md:text-xl">insights</span>
          <h3 className="text-base md:text-lg font-display font-semibold text-on-surface">Document Insights</h3>
        </div>
        <div className="flex gap-1 md:gap-2">
          <button
            onClick={handleCopy}
            disabled={!summaryText}
            className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 rounded bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-colors text-xs md:text-sm font-body disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm md:text-base">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={!summaryText}
            className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 rounded bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-colors text-xs md:text-sm font-body disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm md:text-base">download</span>
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 md:p-12 text-center relative overflow-hidden">
        {/* Empty State */}
        {!loading && !summaryText && (
          <div className="max-w-md space-y-6 animate-in fade-in duration-700">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse"></div>
              <div className="relative w-full h-full flex items-center justify-center text-primary/40">
                <span
                  className="material-symbols-outlined text-7xl"
                  style={{ fontVariationSettings: "'wght' 200" }}
                >
                  description
                </span>
              </div>
            </div>
            <div>
              <p className="text-lg font-display font-semibold text-on-surface mb-2">
                Ready for Extraction
              </p>
              <p className="text-base font-body text-on-surface-variant leading-relaxed">
                Upload a document and select your summary options on the left to extract key
                insights instantly using Groq's high-speed AI engine.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="h-1 bg-surface-variant rounded-full"></div>
              <div className="h-1 bg-surface-variant rounded-full"></div>
              <div className="h-1 bg-surface-variant rounded-full"></div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center gap-8 animate-in fade-in duration-500">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full animate-spin text-primary" viewBox="0 0 100 100">
                <circle
                  className="opacity-10"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  className="opacity-100"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="45"
                  stroke="currentColor"
                  strokeDasharray="180"
                  strokeLinecap="round"
                  strokeWidth="8"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-3xl animate-pulse">
                  bolt
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-display font-semibold text-on-surface">
                Distilling Intelligence...
              </h4>
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}

        {/* Markdown Output */}
        {!loading && summaryText && (
          <div className="w-full text-left space-y-8 h-full overflow-y-auto pr-4 scrollbar-thin animate-in slide-in-from-bottom-8 fade-in duration-1000">
            <div className="border-l-4 border-primary pl-6 py-2">
              <p className="text-[11px] font-mono text-primary font-bold uppercase tracking-widest mb-1">
                {fileName || 'Document'} — Summary
              </p>
            </div>
            <div className="prose prose-invert prose-headings:text-on-surface prose-p:text-on-surface-variant prose-li:text-on-surface-variant prose-strong:text-on-surface prose-blockquote:border-primary/40 prose-blockquote:text-on-surface-variant max-w-none">
              <ReactMarkdown>{summaryText}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
