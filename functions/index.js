require('dotenv').config();

const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');
const summarizeRoutes = require('./routes/summarize');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(summarizeRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Standalone dev server
if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`DocSumo API running on http://localhost:${PORT}`);
  });
}

// Firebase Cloud Functions export
exports.api = functions.https.onRequest(app);

module.exports = app;
