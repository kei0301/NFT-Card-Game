const mongoose = require('mongoose');

const imagelist = mongoose.Schema({

    userAvatar: {
        type: String,
    },
    address: {
        type: String
    },
    nickName: {
        type: String
    }
},
    {
        timestamps: true
    });

const avatar = mongoose.model('userAvatar', imagelist)

module.exports = avatar;
