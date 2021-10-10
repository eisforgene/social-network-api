const { Schema, model } = require('mongoose');

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
        get: timestamp => DateFormat(timestamp)
    },

    username: {
        type: String,
        required: 'Username is Required'
    },

    reactions: [reactionSchema]

}, {
    toJSON: {
        virtuals: true
    }
}
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const User = model('User', ThoughtSchema);

module.exports = User;