const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

var configDb = require("./config/databse.js"); // importing external file

const app = express();
const port = process.env.PORT || 4000;

// configuration ==========================================================================

mongoose.connect(configDb.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // connect to database

require('./config/passport')(passport); // pass passport for configuration

// set up express application

app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser(bodyParser.urlencoded({ extended: false }))); // get detail from html form

app.set("view engine", "ejs"); // set up for ejs templating

// required for passport

app.use(session({ secret: "simplesecretkey." })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

// routes =============================================================================================================

require("./app/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

// launch =============================================================================================================

app.listen(port, () => {
  console.log("Server Started on Port: " + port);
});
