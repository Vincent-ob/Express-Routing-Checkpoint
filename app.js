const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to check if the request is during working hours
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const day = currentDate.getDay(); // 0 (Sun) to 6 (Sat)
  const hour = currentDate.getHours(); // 0 to 23

  // Check if it's a weekday and within working hours (9 to 17)
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Allow the request to proceed
  } else {
    res.status(403).send('The application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Use the middleware
app.use(workingHoursMiddleware);

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static('public')); // Serve static files from 'public' directory

// Define routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});