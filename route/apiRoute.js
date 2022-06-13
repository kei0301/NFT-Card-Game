const express = require('express');
const Ctrl = require('../controller/Ctrl.js');
const router = express.Router();

const fileconfig = require("../dir");
const multer = require('multer');
const FileUploader = require('../middleware/upload')
const path = require("path")
const Uploader = new FileUploader(path.join(fileconfig.BASEURL))
router.post('/UploadImage', multer({ storage: Uploader.storage, fileFilter: Uploader.filter }).any(), Ctrl.imageMulti, Ctrl.UploadImage);
router.post('/getNFTData', Ctrl.NFTData);
router.post('/getUserData', Ctrl.getUserData);
router.get('/getUserList', Ctrl.getUserList);
module.exports = router;