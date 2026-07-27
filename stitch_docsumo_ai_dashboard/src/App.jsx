import { useState, useCallback } from 'react';
import Header from './components/Header';
import DropZone from './components/DropZone';
import ControlPanel from './components/ControlPanel';
import OutputPanel from './components/OutputPanel';
import RecentSummariesDrawer from './components/RecentSummariesDrawer';
import Footer from './components/Footer';
import ToastProvider from './components/ToastProvider';
import { useSummarize } from './hooks/useSummarize';

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    summaryText,
    setSummaryText,
    loading,
    fileName,
    setFileName,
    selectedFile,
    setSelectedFile,
    handleSummarize,
    recentSummaries,
    loadingHistory,
    loadRecentSummaries,
    loadSummaryFromHistory,
  } = useSummarize();

  const onFileSelect = useCallback((file) => {
    setSelectedFile(file);
  }, [setSelectedFile]);

  const onAnalyze = useCallback(
    (format, focus) => {
      handleSummarize(selectedFile, format, focus);
    },
    [selectedFile, handleSummarize]
  );

  const onOpenDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const onRefresh = useCallback(() => {
    loadRecentSummaries();
  }, [loadRecentSummaries]);

  const onSelectHistory = useCallback(
    (item) => {
      loadSummaryFromHistory(item);
    },
    [loadSummaryFromHistory]
  );

  return (
    <div className="min-h-screen bg-background text-on-background font-body flex flex-col overflow-x-hidden">
      <ToastProvider />
      <Header onOpenDrawer={onOpenDrawer} />

      <main className="flex-grow pt-24 pb-8">
        {/* Decorative Ambient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 md:px-8 lg:px-12 py-8 relative max-w-[1280px] mx-auto">
          {/* LEFT COLUMN: Upload & Controls (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-container/40 backdrop-blur-xl ring-1 ring-white/10 shadow-2xl rounded-2xl p-5 md:p-8 sticky top-24">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">upload_file</span>
                </div>
                <div>
                  <h2 className="text-lg font-display font-semibold text-on-surface">Input Core</h2>
                  <p className="text-sm font-body text-on-surface-variant">
                    Configure your analysis parameters
                  </p>
                </div>
              </div>

              {/* Drag & Drop Zone */}
              <DropZone onFileSelect={onFileSelect} />

              {/* Control Stack */}
              <ControlPanel onAnalyze={onAnalyze} loading={loading} hasFile={!!selectedFile} />
            </div>

            {/* Quick Stats Card */}
            <div className="bg-surface-container-low/30 ring-1 ring-white/5 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-4">
                <p className="text-xs sm:text-sm font-body text-on-surface-variant">
                  Powered by Groq's high-speed inference
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-[11px] font-mono font-semibold text-primary uppercase tracking-wider">
                  Groq Engine v3.1
                </p>
                <p className="text-[10px] text-on-surface-variant/50 uppercase tracking-tighter">
                  Latency: ~14ms
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Output (7 Cols) */}
          <div className="lg:col-span-7">
            <OutputPanel
              summaryText={summaryText}
              loading={loading}
              fileName={fileName}
            />
          </div>
        </div>
      </main>

      <Footer />

      {/* Recent Summaries Drawer */}
      <RecentSummariesDrawer
        isOpen={isDrawerOpen}
        onClose={onCloseDrawer}
        summaries={recentSummaries}
        loadingHistory={loadingHistory}
        onSelect={onSelectHistory}
        onRefresh={onRefresh}
      />
    </div>
  );
}
