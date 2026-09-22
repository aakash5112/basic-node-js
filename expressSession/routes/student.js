const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  if (req.session.user.role !== "student") {
    return res.redirect("/teacher/home");
  }

  res.redirect("/student-home.html");
});

router.get("/profile", (req, res) => {
  if (req.session.user.role !== "student") {
    return res.redirect("/teacher/home");
  }

  res.redirect("/student-profile.html");
});

router.get("/result", (req, res) => {
  if (req.session.user.role !== "student") {
    return res.redirect("/teacher/home");
  }

  res.redirect("/student-result.html");
});

module.exports = router;
