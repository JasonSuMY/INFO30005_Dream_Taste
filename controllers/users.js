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
                    res.redirect('/');
                } else {
                    res.redirect('/login');
                }
            } else {
                res.sendStatus(400);
            }
        });
};

// Display the registration page
let displayRegister = function(req, res) {
    res.render('register', {
       title: "User Registrations"
    });
};

// Create a user based on registration information
let register = function(req, res) {
    const newUser = new Users({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    newUser.save(function(err, newUser) {
        if (!err) {
            res.redirect('/');
        } else {
            res.redirect('/register');
        }
    });
};

module.exports.login = login;
module.exports.validateLogin = validateLogin;
module.exports.displayRegister = displayRegister;
module.exports.register = register;