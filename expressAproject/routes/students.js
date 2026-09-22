const express = require('express');
const router = express.Router();

// Route-level middleware
const studentAuth = (req, res, next) => {
  console.log('Student route middleware: checking student access');
  next();
};

router.get('/', (req, res) => {
  res.send('student portal');
});

router.get('/info', studentAuth, (req, res) => {
  res.send('student info');
});

router.get('/result', studentAuth, (req, res) => {
  res.send('student result');
});

router.get('/notification', studentAuth, (req, res) => {
  res.send('student notification');
});

router.get('/profile', studentAuth, (req, res) => {
  res.send('student profile page');
});

module.exports = router;


