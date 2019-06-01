const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        body: {type: String, required: [true, "Comment body cannot be empty"]},
        author: {
            authorID: Schema.Types.ObjectId,
            name: String,
            avatar: String
        }
    }
); 

mongoose.model("Comments", CommentSchema);