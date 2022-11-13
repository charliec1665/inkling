const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    inklings: [
        {
            type: Schema.Types.ObjectId, // expect an object id
            ref: 'Inkling' // data comes from Inkling model
        }
    ],
    squids: [
        {
            type: Schema.Types.ObjectId, // expect object id
            ref: 'User' // self-reference
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

// get total count of squids (friends) on retrieval
UserSchema.virtual('squidCount').get(function() {
    return this.squids.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema)

module.exports = User;