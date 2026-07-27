import { useState } from 'react';
import { summarizeDocument, fetchRecentSummaries } from '../utils/api';
import toast from 'react-hot-toast';

export function useSummarize() {
  const [summaryText, setSummaryText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [recentSummaries, setRecentSummaries] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const handleSummarize = async (file, format, focus) => {
    if (!file) {
      toast.error('Please select a file first.');
      return;
    }

    setLoading(true);
    setError(null);
    setFileName(file.name);
    toast.loading('Analyzing document...', { id: 'analyzing' });

    try {
      const data = await summarizeDocument(file, format, focus);
      setSummaryText(data.summaryText);
      toast.success('Analysis complete!', { id: 'analyzing' });
    } catch (err) {
      setError(err.message);
      toast.error(err.message, { id: 'analyzing' });
    } finally {
      setLoading(false);
    }
  };

  const loadRecentSummaries = async () => {
    setLoadingHistory(true);
    try {
      const data = await fetchRecentSummaries();
      setRecentSummaries(data.summaries || []);
    } catch (err) {
      toast.error('Failed to load recent summaries.');
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadSummaryFromHistory = (summary) => {
    setSummaryText(summary.summaryText);
    setFileName(summary.fileName || 'Past document');
    toast.success('Summary loaded from history.');
  };

  return {
    summaryText,
    setSummaryText,
    loading,
    error,
    fileName,
    setFileName,
    selectedFile,
    setSelectedFile,
    handleSummarize,
    recentSummaries,
    loadingHistory,
    loadRecentSummaries,
    loadSummaryFromHistory,
  };
}
