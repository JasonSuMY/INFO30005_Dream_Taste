const mongoose = require('mongoose');
const UserSchema = mongoose.Schema(
    {
        "username": String,
        "password": String
    }
);

mongoose.model("users", UserSchema);