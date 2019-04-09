const mongoose = require('mongoose');
const dbURL = "mongodb+srv://mingyu:Cheng19980610@cluster0-qtfpr.mongodb.net/Dream_Taste?retryWrites=true"

// Connect to the database.
mongoose.connect(dbURL, {useNewUrlParser: true}, function(err) {
    if (!err) {
        console.log("Connected to MongoDB.");
    } else {
        console.log("Failed to connect to MongoDB.");
    }
});

require('./users.js');