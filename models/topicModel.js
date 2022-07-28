const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require('underscore');

const topicSchema = new Schema({
    topic: {
        type: String,
        required: true,
        unique: true
    },
    children: [{
        type: mongoose.Types.ObjectId,
        ref: 'topic'
    }]
});

topicSchema.pre('save', function (next) {
    this.children = _.uniq(this.children);
    next();
});

topicSchema.pre('updateOne', function (next) {
    this.children = _.uniq(this.children);
    next();
});


module.exports = mongoose.model('topic', topicSchema);