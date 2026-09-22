const express = require('express');
const cors = require('cors');

const app = express();
const port = 3300;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// Application-level middleware
app.use((req, res, next) => {
  console.log('Application middleware: request received for ->', req.url);
  next();
});

const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');

app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);

app.get('/', (req, res) => {
  res.send('Hello from home page');
});

// Example route that triggers error handling middleware
app.get('/test-error', (req, res, next) => {
    
  next(new Error('This is a test error from app route'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log('Error middleware:', err.message);
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

app.listen(port, () => {
  console.log('server is running on http://localhost:' + port);
});