const express = require("express");
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }

  return res.redirect("/login.html");
};

// simple in-memory user storage
const users = {
  student1: { password: "1234", role: "student" },
  teacher1: { password: "5678", role: "teacher" },
};

router.get("/signin", (req, res) => {
  res.redirect("/signin.html");
});

router.post("/signin", (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.send("Please fill all fields");
  }

  if (users[username]) {
    return res.send("User already exists");
  }

  users[username] = {
    username,
    password,
    role
  };

  req.session.user = {
    username,
    role
  };

  if (role === "student") {
    res.redirect(303, "/student/home");
  } else {
    res.redirect(303, "/teacher/home");
  }
});


router.get("/login", (req, res) => {
  res.redirect("/login.html");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (user && user.password === password) {
    req.session.user = {
      username,
      role: user.role,
    };

    if (user.role === "student") {
      res.redirect(303, "/student/home");
    } else {
      res.redirect(303, "/teacher/home");
    }
  } else {
    res.send("Wrong login details. <a href='/login.html'>Try again</a>");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login.html");
    // res.send('you logout');
  });
});

module.exports = {
  router,
  isAuthenticated,
};
