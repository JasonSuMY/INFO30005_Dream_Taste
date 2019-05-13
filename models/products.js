const mongoose = require('mongoose');
ProductSchema = mongoose.Schema(
    {
        name: {type: String, required: [true, "Product name must be input"]},
        image: {type: String, required: [true, "An image must be added"]},
        price: String,
        description: String,
        category: {type: String, required: [true, "Category must be selected"]},
        rating: {type: Number, min: 0, max: 10},
        comments: String
    }


);

mongoose.model('Products', ProductSchema);