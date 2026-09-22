const express = require('express');
const router = express.Router();

// Route-level middleware
const teacherAuth = (req, res, next) => {
  console.log('Teacher route middleware: checking teacher access');
  next();
};

// router.use(teacherAuth);

router.get('/', (req, res) => {
  res.send('teacher portal');
});

router.get('/info', teacherAuth, (req, res) => {
  res.send('teacher info');
});

router.get('/timeTable', teacherAuth, (req, res) => {
  res.send('teacher timeTable');
});

router.get('/notification', teacherAuth, (req, res) => {
  res.send('teacher notification');
});

router.get('/dashboard', teacherAuth, (req, res) => {
  res.send('teacher dashboard');
});

module.exports = router;


