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
                req.flash("error", "Invalid username or password.");
                res.redirect("back");
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
        req.flash("error", "Passwords do not match.");
        res.redirect("back");
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
        req.session.destroy(function(err) {
            if (err) {
                next(err);
            } else {
                res.redirect('/');
            }
        });
    }
};

let editUserName = function(req, res, next) {
    Users.findById(req.session.userID).
        exec(function(err, user) {
            if(err) {
                return next(err);
            } else {
                if (user == null) {
                    const err = new Error("Not authorized");
                    err.status = 400;
                     return next(err);
                } else {
                    if (req.body.username) {
                        user.username = req.body.username;
                    } else {
                        const err = new Error("Invalid Username");
                        err.status = 400;
                        return next(err);
                    }
                    user.save(function(err, user){
                        if (!err){
                            req.flash("success", "Edit Successfully.");
                            res.redirect('/profile');
                        } else{
                            req.flash("error", `Fail to edit. ${err}`);
                            res.redirect("back");
                        }
                    });

            }
        }
    })
};

// let editPassword = function(req, res, next) {
//     Users.findById(req.session.userID).
//     exec(function(err, user) {
//         if(err) {
//             return next(err);
//         } else {
//             if (user == null) {
//                 const err = new Error("Not authorized");
//                 err.status = 400;
//                 return next(err);
//             } else {
//                 if (req.body.password) {
//                     user.password = req.body.password;
//                 } else {
//                     const err = new Error("Invalid Password");
//                     err.status = 400;
//                     return next(err);
//                 }
//                 user.save(function(err, user){
//                     if (!err){
//                         req.flash("success", "Edit Successfully.");
//                         res.redirect('/profile');
//                     } else{
//                         req.flash("error", `Fail to edit. ${err}`);
//                         res.redirect("back");
//                     }
//                 });
//
//             }
//         }
//     })
// };

let editEmail = function(req, res, next) {
    Users.findById(req.session.userID).
    exec(function(err, user) {
        if(err) {
            return next(err);
        } else {
            if (user == null) {
                const err = new Error("Not authorized");
                err.status = 400;
                return next(err);
            } else {
                if (req.body.email) {
                    user.email = req.body.email;
                } else {
                    const err = new Error("Invalid Email");
                    err.status = 400;
                    return next(err);
                }
                user.save(function(err, user){
                    if (!err){
                        req.flash("success", "Edit Successfully.");
                        res.redirect('/profile');
                    } else{
                        req.flash("error", `Fail to edit. ${err}`);
                        res.redirect("back");
                    }
                });

            }
        }
    })
};

module.exports.login = login;
module.exports.validateLogin = validateLogin;
module.exports.displayRegister = displayRegister;
module.exports.register = register;
module.exports.displayProfile = displayProfile;
module.exports.logout = logout;
module.exports.editUserName = editUserName;
//module.exports.editPassword = editPassword;
module.exports.editEmail = editEmail;