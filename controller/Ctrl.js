const avatar = require("../models/imagelist");
const axios = require('axios');

const NFTData = async (req, res) => {
    let data = [];
    for (let index = 0; index < req.body.links.length; index++) {
        const element = req.body.links[index];
        console.log(element.token_uri, 'element')
        await axios.get(element.token_uri)
            .then(result => {
                console.log(result.data, 'data')
                data.push(result.data);
            })
            .catch(err => {
                console.log(err, 'err')
            })
    }
    res.send(data);
}

const imageMulti = (req, res, next) => {
    let d = req.files
    let row = {}
    for (let i in d) {
        row[d[i].fieldname] = d[i].filename
    }
    req.images = row
    next()
}

const UploadImage = async (req, res) => {

    let userAvatar = await avatar.findOne({ address: req.body.address })
    if (userAvatar !== null) {
        if (req.images.userAvatar) {
            userAvatar.userAvatar = req.images.userAvatar;
            userAvatar.nickName = req.body.nickName;
            userAvatar.save();
            res.send(req.images.userAvatar);
        } else {
            userAvatar.nickName = req.body.nickName;
            userAvatar.save();
            res.send('ok')
        }
    } else {
        let userAvatar = new avatar();
        userAvatar.nickName = req.body.nickName;
        userAvatar.address = req.body.address;
        userAvatar.userAvatar = req.images.userAvatar;
        userAvatar.save();
        res.send(req.images.userAvatar)
    }
}

const getUserData = (req, res) => {
    avatar.findOne({ address: req.body.address }).then(result => {
        if (result !== null) {
            res.send(result);
        } else {
            res.send('nothing');
        }
    }).catch(err => {
        console.log(err, 'err');
        res.send(err);
    })
}

const getUserList = (req, res) => {
    avatar.find().then(result => {
        res.send(result);
    })
}

module.exports = {
    imageMulti,
    UploadImage,
    NFTData,
    getUserData,
    getUserList
};