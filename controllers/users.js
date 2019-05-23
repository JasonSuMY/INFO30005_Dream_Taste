const mongoose = require('mongoose');
const Users = mongoose.model('Users');

let login = function(req, res) {
    res.render("login", {
        title: "User Login"
    });
};

// Validate the user log in.
let validateLogin = function(req, res, next) {
    Users.authenticate(req.body.email, req.body.password, function(err, user) {
        if (!err) {
            if (user) {
                req.session.userID = user._id;
                res.redirect('/profile');
            } else {
                res.render('login', {
                    title: "User Login",
                    msgType: "ERROR",
                    msg: "Invalid email or password"
                });
            }
        } else {
            return next(err);
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
let register = function(req, res, next) {

    if (req.body.password !== req.body.passwordConf) {
        const err = new Error("Passwords do not match");
        err.status = 400;
        res.send("Passwords do not match");
        return next(err);
    }

    const newUser = new Users({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    newUser.save(function(err, newUser) {
        if (!err) {
            req.session.userID = newUser._id;
            return res.redirect('/profile');
        } else {
            return next(err);
        }
    });
};

let displayProfile = function(req, res, next) {
    Users.findById(req.session.userID).
        exec(function(err, user) {
            if (err) {
                return next(err);
            } else {
                if (user == null) {
                    const err = new Error("Not authorized!");
                    err.status = 400;
                    return next(err);
                } else {
                    res.render('profile', {
                        title: `${user.username}'s Profile`,
                        user: user
                    });
                }
            }
        });
};

let logout = function(req, res, next) {
    if (req.session) {
        req.session.destory(function(err) {
            if (err) {
                next(err);
            } else {
                res.redirect('/');
            }
        });
    }
};

module.exports.login = login;
module.exports.validateLogin = validateLogin;
module.exports.displayRegister = displayRegister;
module.exports.register = register;
module.exports.displayProfile = displayProfile;
module.exports.logout = logout;