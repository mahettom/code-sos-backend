const { Schema, model } = require("mongoose");



const freePostSchema = new Schema({

    question: {
        type: String,
        require: true
    },
    code_example: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
},
    {
        timestamps: true
    });



const FreePost = model("FreePost", freePostSchema);
module.exports = FreePost