const mongoose = require('mongoose');
const dbURL = "mongodb+srv://mingyu:Cheng19980610@cluster0-qtfpr.mongodb.net/";

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

require('./users.js');
require('./products.js');
require('./comments.js');
require('./categories.js');