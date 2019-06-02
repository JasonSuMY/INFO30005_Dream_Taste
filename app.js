const express = require('express');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Set up the database.
const db = require('./models/db.js');

// Setting up the bodyparser, so the body of the request can be parsed as JSON
// object.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up the configuration of a user session.
// app.use(cookieParser);
app.use(session({
   secret: "matrix",
   cookie: {maxAge: 12 * 3600 * 10},
   resave: true,
   saveUninitialized: false,
   store: new MongoStore({mongooseConnection: db.db})
}));

// Setting up the flash, so messages can be passed around.
app.use(flash());

// Setting up the response local variables, which are available to the views.
app.use(function(req, res, next) {
   if (req.session && req.session.userID) {
      res.locals.authenticated = true;
   } else {
      res.locals.authenticated = false;
   }
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

const PORT = process.env.PORT || 3000;

// Set the view engine
app.set('view engine', 'pug');

// Test express where the staic files are kepts
app.use(express.static(__dirname + '/public'));

// Set up the routes.
const routes = require('./routes/routes.js');
app.use('/', routes);

// error handler
app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   req.flash("error", err.message);
   res.redirect("back");
});

app.listen(PORT, function () {
   console.log(`Express serving at port ${PORT}`);
});