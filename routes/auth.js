const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../config/ppConfig");

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/signup", (req, res) => {
  db.user
    .findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        name: req.body.name,
        password: req.body.password,
      },
    })
    .then(([user, created]) => {
      if (created) {
        // if created, success and redirect to home
        console.log(`${user.name} was created`);
        passport.authenticate("local", {
          successRedirect: "/",
        })(req, res);
        // before passport authenticate
        // res.redirect("/");
      } else {
        // Email already exist
        console.log("Email already exist");
        res.redirect("/auth/signup");
      }
    })
    .catch((error) => {
      console.log("Error", error);
      res.redirect("/auth/signup");
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

// router.post("/login", (req, res) => {});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
