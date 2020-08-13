require("dotenv").config();
const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
const session = require("express-session");
const SECRET_SESSION = process.env.SECRET_SESSION;
const passport = require("./config/ppConfig");
app.set("view engine", "ejs");

app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(layouts);

// secret: What we actually giving the user to use our site / session cookie
// resave: Save the session even if it's modified, make this false
// saveUninitialized: if we have a new session, we'll save it, therefore,
// setting this to true

app.use(
  session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize passport and run session as middleware - always under session
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.use("/auth", require("./routes/auth"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;
