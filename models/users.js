const mongoose = require('mongoose');
const UserSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        email: String
    }
);

mongoose.model("Users", UserSchema);