module.exports = (req, res, next) => {
  if (!req.user) {
    req.flash("Error", "You must be signed in to access this page.");
    res.redirect("/auth/login");
  } else {
    next();
  }
};
