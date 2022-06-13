const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost:27017/cardgame';
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
    console.log(error);
});
const NFTDataApi = require('./route/apiRoute.js');
const UnityApi = require('./route/unityapiRoute.js');
const socket = require('./socket/index.js');
app.use(cors('*'))
app.use(bodyParser.json({ limit: '200mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use('/NFTData', NFTDataApi);
app.use('/api', UnityApi);

app.use(express.static('upload'));
app.use(express.static('build'));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

const http = require('http').createServer(app)
// const io = require('socket.io')(http, {
//     cors: {
//         origin: "http://192.168.114.33:8000",
//         methods: ["GET", "POST"]
//     }
// })
// socket(io)
// app.set('io', io)
http.listen(PORT);
console.log('server listening on:', PORT)