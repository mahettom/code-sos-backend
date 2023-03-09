const { Schema, model } = require("mongoose");

const helpRequestSchema = new Schema({
    question: {
        type: String,
        require: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        //Need to connect user email with extend
    },
},
    {
        timestamps: true
    });

const HelpRequest = model("HelpRequest", helpRequestSchema);
module.exports = HelpRequest