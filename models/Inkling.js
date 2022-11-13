const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const InklingSchema = new Schema({
    inklingText: {
        type: String,
        required: true,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now, // default to current date if nothing else provided
        get: (createdAtVal) => dateFormat(createdAtVal) // getter to format date
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        {
            type: Schema.Types.ObjectId, // expect an object id
            ref: 'Reaction' // retrieve data from ReactionSchema
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// get total count of reactions on retrieval
InklingSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Inkling model using InklingSchema
const Inkling = model('Inkling', InklingSchema);

module.exports = Inkling;