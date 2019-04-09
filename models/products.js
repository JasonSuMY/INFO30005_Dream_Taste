const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema(
    {
        name: String,
        description: String
    }
);

mongoose.model('products', ProductSchema);