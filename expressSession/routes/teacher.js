const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  if (req.session.user.role !== "teacher") {
    return res.redirect("/student/home");
  }

  res.redirect("/teacher-home.html");
});

router.get("/profile", (req, res) => {
  if (req.session.user.role !== "teacher") {
    return res.redirect("/student/home");
  }

  res.redirect("/teacher-profile.html");
});

router.get("/timetable", (req, res) => {
  if (req.session.user.role !== "teacher") {
    return res.redirect("/student/home");
  }

  res.redirect("/teacher-timetable.html");
});

module.exports = router;
