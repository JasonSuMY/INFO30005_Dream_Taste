const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        category: String
    }
);

mongoose.model('Products', ProductSchema);