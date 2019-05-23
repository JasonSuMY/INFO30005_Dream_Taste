const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, unique: true, required: true, trim: true},
        password: {type: String, required: true},
        email: {type: String, unique: true, required: true, trim: true}
    }
);

//hashing a password before saving it to the database
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

mongoose.model("Users", UserSchema);