const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {type: String, required: [true, "Product name must be input"]},
        image: {type: String, required: [true, "An image must be added"]},
        price: String,
        description: String,
        category: {type: String, required: [true, "Category must be selected"]},
        rating: {type: Number, min: 0, max: 10},
        comments: [{type: Schema.Types.ObjectId, ref: "Comments"}]
    }
);

mongoose.model('Products', ProductSchema);