const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const session = require('express-session');
app.use(session({
   secret: "matrix",
   resave: true,
   saveUninitialized: false
}));

const PORT = process.env.PORT || 3000;

// Set the view engine
app.set('view engine', 'pug');

// Test express where the staic files are kepts
app.use(express.static(__dirname + '/public'));

// Set up the database.
require('./models/db.js');

// Set up the routes.
const routes = require('./routes/routes.js');
app.use('/', routes);

// error handler
app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.send(err.message);
});

app.listen(PORT, function () {
   console.log(`Express serving at port ${PORT}`);
});