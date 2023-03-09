const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    posting: {
        type: Schema.Types.ObjectId,
        ref: 'FreePost',
        required: true
    },
    comment: {
        type: String,
        required: true,
        maxLength: 300
    },
    codeExample: {
        type: String
    }
},
    {
        timestamps: true
    }
)
const Comment = model("Comment", commentSchema);
module.exports = Comment