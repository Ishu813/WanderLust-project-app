const express = require("express");
const app = express();
const users = require("./routes/user");
const posts = require("./routes/post");
const session = require("express-session");
const flash = require("connect-flash");

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  req.flash("success", "user registered successfully!");
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.locals.messages = req.flash("success");
  res.render("page.ejs", { name: req.session.name });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
