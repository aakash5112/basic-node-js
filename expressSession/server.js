const express = require("express");
const session = require("express-session");
const path = require("path");

const { router: authRoutes, isAuthenticated } = require("./routes/auth");
const studentRoutes = require("./routes/student");
const teacherRoutes = require("./routes/teacher");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "mySecretKey123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 10,
    },
  })
);

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.use(authRoutes);
app.use(isAuthenticated);
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
