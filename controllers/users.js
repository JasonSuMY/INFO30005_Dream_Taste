const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Products = mongoose.model('Products');
const path = require('path');
require('dotenv').config();

// Used to upload image.
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

// Set up the cloud storage space for image upload.
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


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
    limits : {fileSize:  1024 * 1024 * 5},
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
        populate("list").
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
                        title: `Profile`,
                        user: user,
                        wishlist: user.list
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

let editUser = function(req, res, next) {

    if (req.body.password !== req.body.passwordConf) {
        req.flash("error", "Passwords do not match.");
        res.redirect("back");
    }

    let userAvatar = undefined;
    let newPassword = undefined;

    if (req.file && req.file.url) {
        userAvatar = req.file.url;
    }

    if (req.body.password) {
        newPassword = req.body.password;
    }

    Users.findOneAndUpdate({_id: req.session.userID}, 
        {$set: {
            username: req.body.username,
            email: req.body.email,
            password: newPassword,
            avatar: userAvatar
        }}, {omitUndefined: true}).
            exec(function(err, user) {
            if (!err) {
                req.flash("success", "Edit Successfully.");
                res.redirect('/profile');
            } else {
                req.flash("error", `Fail to edit. ${err}`);
                res.redirect("back");
            }
        });
};

let addToWishlist = function (req, res, next) {
    const id = req.params.id;
    const userID = req.session.userID;

    Products.findById(id, function(err, product) {
        if (!err) {
            Users.findByIdAndUpdate(userID, {$push: {list: product}}, function(err, user) {
                if (!err) {
                    req.flash("success", `Add ${product.name} to wish list`);
                    res.redirect(`/products/${id}`);
                } else {
                    next(err);
                }
            });
        } else {
            next(err);
        }
    });
}
module.exports.login = login;
module.exports.validateLogin = validateLogin;
module.exports.displayRegister = displayRegister;
module.exports.register = register;
module.exports.displayProfile = displayProfile;
module.exports.logout = logout;
module.exports.uploadAvatar = uploadAvatar;
module.exports.addToWishlist = addToWishlist;
module.exports.editUser = editUser;