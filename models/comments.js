const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        title: {type: String, required: [true, "Comment must have a title"]},
        body: {type: String, required: [true, "Comment body cannot be empty"]},
    }
); 

mongoose.model("Comments", CommentSchema);