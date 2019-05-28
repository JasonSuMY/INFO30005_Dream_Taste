const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, unique: true, required: true, trim: true},
        password: {type: String, required: true},
        avatar: {type: String, default: '//placehold.it/250'},
        email: {type: String, unique: true, required: true, trim: true}
    }
);

// Hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        } else {
            user.password = hash;
            next();
        }
    });
});

// Authenticate input against database.
UserSchema.statics.authenticate = function(email, password, cb) {
    Users.findOne({email: email})
         .exec(function(err, user) {
            if (err) {
                return cb(err);
            } else if (!user) {
                const err = new Error("User not found");
                err.status = 401;
                return cb(err);
            }
            bcrypt.compare(password, user.password, function(err, result) {
                if (result == true) {
                    return cb(null, user);
                } else {
                    return cb();
                }
            });
         });
};

// Add a customed validator to make sure email will be unique.
UserSchema.path("email").validate(function(value, done) {
    Users.count({ email: value }, function(err, count) {
        if (err) {
            return done(err);
        }
        if (count === 0) {
            return true;
        } else {
            return false;
        }
    });
}, "Email already registered.");

// Add a customed validator to make sure username will be unique.
UserSchema.path("username").validate(function(value, done) {
    Users.count({ username: value }, function(err, count) {
        if (err) {
            return done(err);
        }
        if (count === 0) {
            return true;
        } else {
            return false;
        }
    });
}, "Username already taken.");

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;