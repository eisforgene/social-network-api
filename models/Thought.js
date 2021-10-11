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

    reactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Reaction'
    }],

}, {
    toJSON: {
        getters: true
    }
}
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;