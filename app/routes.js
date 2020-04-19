// app/routes.js

module.exports = function (app, passport) {
  //===================================
  // HOME PAGE (with login links)======
  // ==================================

  app.get("/", (req, res) => {
    res.render("index"); // load the index.ejs file
  });

  //===================================
  // LOGIN ============================
  //===================================

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // show LOGIN form

  app.get("/login", (req, res) => {
    // render the page and passs in any flash data if it exists
    res.render("login", { message: req.flash("loginMessage") });
  });

  // process the login form

  //===================================
  // SIGNUP ===========================
  //===================================
  // show the signup form.

  app.get("/signup", (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render("signup", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // =====================================
  // PROFILE SECTION =====================
  // =====================================

  // we want this proteted so you ahve to be logged in to visit
  // use route middleware to verify this (the is LoggedIn function)

  app.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile", {
      user: req.user, // get the user out of the session and pass to template
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};

//  route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();

    // if they aren't redirect them to the home page
    res.redirect("/");
  }
}
