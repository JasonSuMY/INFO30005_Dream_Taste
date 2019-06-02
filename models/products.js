const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {type: String, required: [true, "Product name must be input"]},
        image: {type: String, required: [true, "An image must be added"]},
        description: String,
        category: {type: String, required: [true, "Category must be selected"]},
        rating: {type: Number, default: 0, min: 0, max: 5},
        numOfRatings: {type: Number, default: 0},
        comments: [{type: Schema.Types.ObjectId, ref: "Comments"}],
        numOfViews: {type: Number, default: 0},
        popularity: {type: Number, default: 0}
    }
);

// Set the popularity of a product by its number of views and rating.
// ProductSchema.pre('save', function(next) {
//     this.popularity = 50 * this.rating + 50 * this.numOfViews;
//     next();
// });

mongoose.model('Products', ProductSchema);