/**
 * Express server for HVAC AI Demo
 * Used for local development and Vercel deployment
 */

const express = require('express');
const path = require('path');
const openaiRouter = require('./api/openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request body
app.use(express.json({ limit: '50mb' }));

// Set proper cache control and MIME types for better Vercel deployment
app.use((req, res, next) => {
  // Set proper cache control headers
  if (req.url.match(/\.(css|js|html|json)$/)) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  
  // Ensure CSS files are served with the correct MIME type
  if (req.url.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  }
  
  next();
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, path) => {
    // Set proper MIME types for CSS files
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Use the OpenAI API route
app.use('/api/openai', openaiRouter);

// Serve index.html for all other routes (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
