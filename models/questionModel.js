const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require('underscore');

const questionSchema = new Schema({
    question: {
        type: Number,
        required: true,
        unique: true
    },
    annotation: [{
        type: mongoose.Types.ObjectId,
        ref: 'topic'
    }]
});

module.exports = mongoose.model('question', questionSchema);