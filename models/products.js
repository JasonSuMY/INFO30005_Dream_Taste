const mongoose = require('mongoose');
ProductSchema = mongoose.Schema(
    {
        name: String,
        image: {type: String, required: true},
        price: String,
        description: String,
        category: String,
        rating: {type: Number, min: 0, max: 10},
        comments: String,
    }


);

mongoose.model('Products', ProductSchema);