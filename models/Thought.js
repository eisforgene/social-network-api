const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const Reaction = require('./Reaction');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        trim: true,
        required: 'Thought is Required',
        minlength: 1,
        maxlength: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp),
    },

    username: {
        type: String,
        required: 'Username is Required'
    },

    reactions: [Reaction],

}, {
    toJSON: {
        getters: true
    },
    id: false
}
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;