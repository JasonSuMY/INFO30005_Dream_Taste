const mongoose = require('mongoose');
ProductSchema = mongoose.Schema(
    {
        name: String,
        picture: {data: Buffer, contentType: String},
        price: String,
        description: String,
        category: String,
        rating: {type: Number, min: 0, max: 10},
    }


);

mongoose.model('Products', ProductSchema);