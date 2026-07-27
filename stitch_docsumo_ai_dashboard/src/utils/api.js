const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function summarizeDocument(file, format, focus) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('format', format);
  formData.append('focus', focus);

  const response = await fetch(`${API_BASE}/summarize`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `Server error: ${response.status}`);
  }

  return response.json();
}

export async function fetchRecentSummaries() {
  const response = await fetch(`${API_BASE}/summaries`);

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `Server error: ${response.status}`);
  }

  return response.json();
}
