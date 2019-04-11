const mongoose = require('mongoose');
ProductSchema = mongoose.Schema(
    {
        name: String,
        price: {data: Buffer, contentType: String},
        description: String,
        category: String,
        rating: {type: Number, min: 0, max: 10},
        usersComments: String
    }


);

mongoose.model('Products', ProductSchema);