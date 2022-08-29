const mongoose = require('mongoose');

require('./users.js');
require('./products.js');
require('./comments.js');
require('./categories.js');
require('dotenv').config();

const dbURL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0-qtfpr.mongodb.net/`;

const options = {
    dbName: "Dream_Taste",
    useNewUrlParser: true,
    useCreateIndex: true
};

// Connect to the database.
mongoose.connect(dbURL, options, function(err) {
    if (!err) {
        console.log("Connected to MongoDB.");
    } else {
        console.log("Failed to connect to MongoDB.");
    }
});

const db = mongoose.connection;

module.exports.db = db;