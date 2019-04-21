const mongoose = require('mongoose');
const Users = mongoose.model('Users');

let login = function(req, res) {
    res.render("login", {
        title: "User Login"
    });
};

// Validate the user log in.
let validateLogin = function(req, res) {
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

module.exports.login = login;
module.exports.validateLogin = validateLogin;