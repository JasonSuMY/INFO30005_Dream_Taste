const mongoose = require('mongoose');
const UserSchema = mongoose.Schema(
    {
        username: {type: String, unique: true, required: true, trim: true},
        password: {type: String, required: true},
        email: {type: String, unique: true, required: true, trim: true}
    }
);

mongoose.model("Users", UserSchema);