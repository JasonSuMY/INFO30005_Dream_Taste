const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Set up the database.
require('./models/db.js');

// Set up the routes.
const routes = require('./routes/routes.js');
app.use('/', routes);

app.listen(PORT, function () {
   console.log(`Express serving at port ${PORT}`);
});