const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("./auth");

router.get("/home", isAuthenticated, (req, res) => {
  if (req.session.user.role !== "student") {
    return res.redirect("/teacher/home");
  }

  res.redirect("/student-home.html");
});

router.get("/profile", isAuthenticated, (req, res) => {
  if (req.session.user.role !== "student") {
    return res.redirect("/teacher/home");
  }

  res.redirect("/student-profile.html");
});

router.get("/result", isAuthenticated, (req, res) => {
  if (req.session.user.role !== "student") {
    return res.redirect("/teacher/home");
  }

  res.redirect("/student-result.html");
});

module.exports = router;
