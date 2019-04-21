const mongoose = require('mongoose');
const Users = mongoose.model('Users');

// Validate the user log in.
let validateLogIn = function(req, res) {
    Users.findOne({username: req.body.username, password: req.body.password}, 
        function(err, user) {
            if (!err) {
                if (user) {
                    res.send("Log in successfully");
                } else {
                    res.send("Log in failed");
                }
            } else {
                res.sendStatus(400);
            }
        });
};

module.exports.validateLogIn = validateLogIn;