const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from client/dist if present
const staticPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(staticPath));

// Serve index.html for client-side routes (so React Router can handle them)
app.get(['/', '/insightx', '/verifyx', '/insightx/*', '/verifyx/*'], (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Health check
app.get('/__health', (req, res) => res.json({ status: 'ok' }));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
