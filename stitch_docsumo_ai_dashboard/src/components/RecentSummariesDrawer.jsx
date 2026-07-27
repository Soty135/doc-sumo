import { useEffect } from 'react';

function formatDate(isoString) {
  if (!isoString) return 'Unknown date';
  const d = new Date(isoString);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function RecentSummariesDrawer({
  isOpen,
  onClose,
  summaries,
  loadingHistory,
  onSelect,
  onRefresh,
}) {
  useEffect(() => {
    if (isOpen) onRefresh();
  }, [isOpen, onRefresh]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-surface-container/90 backdrop-blur-xl ring-1 ring-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-high/20">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-xl">history</span>
            <h3 className="text-lg font-display font-semibold text-on-surface">
              Recent Summaries
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors rounded-lg hover:bg-surface-variant/50"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto scrollbar-thin p-4">
          {loadingHistory ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <svg className="w-8 h-8 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm font-body text-on-surface-variant">Loading summaries...</span>
            </div>
          ) : summaries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="material-symbols-outlined text-on-surface-variant/30 text-6xl">
                folder_open
              </span>
              <p className="text-sm font-body text-on-surface-variant">
                No summaries yet. Analyze a document to see it here.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {summaries.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="w-full text-left p-4 rounded-xl bg-surface-container-high/30 ring-1 ring-white/5 hover:ring-primary/30 hover:bg-surface-container-high/50 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-body font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                        {item.fileName || 'Untitled Document'}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase">
                          {item.format || 'Summary'}
                        </span>
                        <span className="text-on-surface-variant/30">·</span>
                        <span className="text-[10px] font-mono text-on-surface-variant/60">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant/30 group-hover:text-primary text-lg transition-colors">
                      arrow_forward
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
