const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId,
    },

    reactionBody: {
        type: String,
        trim: true,
        required: 'Reaction is Required',
        maxlength: 280,
    },

    username: {
        type: String,
        required: 'Username is Required'
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }

}, {
    toJSON: {
        getters: true
    }
}
);

// ReactionSchema.virtual('reactionCount').get(function () {
//     return this.reactions.length
// });

// const Thought = model('Thought', ReactionSchema);

module.exports = ReactionSchema;