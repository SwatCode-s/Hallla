const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set fixed relationship duration - 1 year, 4 months, and 3 days
const years = 1;
const months = 4;
const remainingDays = 3;
// Calculate total days (approximate)
const diffDays = (years * 365) + (months * 30) + remainingDays;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  console.log("1")
  res.render('index', { 
    days: diffDays,
    years: years,
    months: months,
    remainingDays: remainingDays
  });
});

app.get('/ha  la', (req, res) => {
  console.log("2")
  res.render('hala');
});

app.get('/mohammad', (req, res) => {
  console.log("3")
  res.render('mohammad');
});

// Start server
app.listen(port, () => {
  console.log(`Love website running at http://localhost:${port}`);
});
