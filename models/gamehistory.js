const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const imagelist = mongoose.Schema({
    optionId: {
        type: ObjectId,
        ref: 'option'
    },
    user1: {
        type: String,
    },
    user2: {
        type: String,
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    score1: {
        type: Number
    },
    score2: {
        type: Number
    }
},
    {
        timestamps: true
    });

const avatar = mongoose.model('gameHistory', imagelist)

module.exports = avatar;
