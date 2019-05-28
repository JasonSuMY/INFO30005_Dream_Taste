const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Products = mongoose.model('Products');

// Used to upload image.
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

// Set up the cloud storage space for image upload.
cloudinary.config({
    cloud_name: "hkdac1yvv",
    api_key: "155176919271884",
    api_secret: "sfGPuvLSNAsvOIPbCmCDgb7tjYI"
});

let login = function(req, res) {
    res.render("login", {
        title: "User Login"
    });
};

// Initialise storage engine.
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "userAvatars",
    filename: function(req, file, next) {
        next(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialise upload.
const upload = multer({
    storage: storage,
    limits : {fileSize:  250 * 250 * 5},
    fileFilter: function(req, file, next) {
        checkFileType(file, next);
    }
}).single("userAvatar");

// Check the type of the files.
function checkFileType(file, next) {
    // Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif/;

    // Check the file extensions
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    // Check the mime type
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return next(null, true);
    } else {
        next("Error: Images only!");
    }
}
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
                if (req.body.username !== null) {
                    user.username = req.body.username;
                } else {
                    const err = new Error("Invalid Username");
                    err.status = 400;
                    return next(err);
                }
                user.save(function(err){
                    if (!err){
                        req.flash("success", "Edit Successfully.");
                        res.redirect('/profile');
                    } else{
                        req.flash("error", `Fail to edit. ${err}`);
                        res.redirect("back");
                    }
                });
            }
    })
};

let editPassword = function(req, res, next) {
    Users.findById(req.session.userID).
    exec(function(err, user) {
        if(err) {
            return next(err);
        } else {
            if (req.body.password !== null && req.body.password === req.body.passwordConf) {
                user.password = req.body.password;
            } else {
                const err = new Error("Invalid Password");
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
    })
};

let editEmail = function(req, res, next) {
    Users.findById(req.session.userID).
    exec(function(err, user) {
        if(err) {
            return next(err);
        } else {
            if (req.body.email !== null) {
                user.email = req.body.email;
            } else {
                const err = new Error("Invalid Email");
                err.status = 400;
                return next(err);
            }
            user.save(function(err){
                if (!err){
                    req.flash("success", "Edit Successfully.");
                    res.redirect('/profile');
                } else{
                    req.flash("error", `Fail to edit. ${err}`);
                    res.redirect("back");
                }
            });
        }
    })
};

let editAvatar = function(req, res, next) {
    Users.findById(req.session.userID).
    exec(function(err, user) {
        user.avatar = req.file.url;
        user.save(function(err) {
            if (!err){
                req.flash("success", "Avatar is uploaded.");
                res.redirect('/products');
            } else{
                req.flash("error", `Fail to upload avatar. ${err}`);
                res.redirect("back");
            }
        })
    })
};

let uploadAvatar = function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            req.flash("error", `${err}`);
            res.redirect("back");
        } else {
            next();
        }
    });
};


module.exports.login = login;
module.exports.validateLogin = validateLogin;
module.exports.displayRegister = displayRegister;
module.exports.register = register;
module.exports.displayProfile = displayProfile;
module.exports.logout = logout;
module.exports.editUserName = editUserName;
module.exports.editPassword = editPassword;
module.exports.editEmail = editEmail;
module.exports.editAvatar = editAvatar;
module.exports.uploadAvatar = uploadAvatar;