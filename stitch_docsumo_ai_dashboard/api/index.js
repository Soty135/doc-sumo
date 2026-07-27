const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const summarizeRoutes = require('./routes/summarize');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(summarizeRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;
module.exports.handler = serverless(app);
