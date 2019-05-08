const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Set the view engine
app.set('view engine', 'pug');

// Test express where the staic files are kepts
app.use(express.static(__dirname + '/public'));

// make uploads folder available in everywhere.
app.use('/uploads', express.static('uploads'));

// Set up the database.
require('./models/db.js');

// Set up the routes.
const routes = require('./routes/routes.js');
app.use('/', routes);

app.listen(PORT, function () {
   console.log(`Express serving at port ${PORT}`);
});