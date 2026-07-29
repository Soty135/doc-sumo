const express = require('express');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf');
pdfjsLib.GlobalWorkerOptions.workerSrc = require.resolve('pdfjs-dist/legacy/build/pdf.worker.js');
const { uploadSingle } = require('../middleware/upload');
const { generateSummary } = require('../services/groq');
const { saveSummary, getRecentSummaries } = require('../services/firestore');

const router = express.Router();

router.post('/api/summarize', uploadSingle, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded. Please provide a PDF or TXT file.' });
    }

    const { format, focus } = req.body;
    let text;

    if (req.file.mimetype === 'application/pdf') {
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(req.file.buffer) }).promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n';
      }
    } else {
      text = req.file.buffer.toString('utf-8');
    }

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Could not extract any text from the uploaded file.' });
    }

    const summaryText = await generateSummary(text, format, focus);
    const summaryId = await saveSummary({
      fileName: req.file.originalname,
      format,
      focus,
      summaryText,
    });

    res.json({ success: true, summaryText, summaryId });
  } catch (err) {
    console.error('Summarize error:', err);
    res.status(500).json({ error: 'Failed to process document. ' + err.message });
  }
});

router.get('/api/summaries', async (req, res) => {
  try {
    const summaries = await getRecentSummaries(10);
    res.json({ summaries });
  } catch (err) {
    console.error('Fetch summaries error:', err);
    res.status(500).json({ error: 'Failed to fetch summaries.' });
  }
});

module.exports = router;
