const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("./auth");

router.get("/home", isAuthenticated, (req, res) => {
  if (req.session.user.role !== "teacher") {
    return res.redirect("/student/home");
  }

  res.redirect("/teacher-home.html");
});

router.get("/profile", isAuthenticated, (req, res) => {
  if (req.session.user.role !== "teacher") {
    return res.redirect("/student/home");
  }

  res.redirect("/teacher-profile.html");
});

router.get("/timetable", isAuthenticated, (req, res) => {
  if (req.session.user.role !== "teacher") {
    return res.redirect("/student/home");
  }

  res.redirect("/teacher-timetable.html");
});

module.exports = router;
