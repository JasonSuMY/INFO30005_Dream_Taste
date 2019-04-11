const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            index: true
        },
        description: String
    }
);

mongoose.model('Categories', CategorySchema);