const express = require("express");
const History = require("../models/gamehistory");
const axios = require("axios");
const app = express();
const socket = require('../socket/index.js');
require("dotenv").config();

const rooms = [];

module.exports = {
    StartSignal: (req, res) => {
        const { roomId, address, name } = req.body;
        try {
            if (!rooms[roomId]) {
                rooms[roomId] = {
                    Names: [],
                    addresss: [],
                    scores: []
                }
            }
            rooms[roomId].Names.push(name);
            rooms[roomId].addresss.push(address);
            try {
                res.json({
                    serverMsg: "Success"
                })
            } catch (error) {
                throw new Error("Can't find Server!");
            };
        } catch (err) {
            res.json({
                serverMsg: err.message
            })
        }
    },
    ScoreUpadte: (req, res) => {
        const { roomId, address, score } = req.body;
        try {
            var sco = parseInt(score);
            var index = rooms[roomId].addresss.indexOf(address);
            rooms[roomId].scores[index] = sco;
            try {
                res.json({
                    serverMsg: "Success"
                })
            } catch (error) {
                throw new Error("Can't find Server!");
            };
        } catch (err) {
            res.json({
                serverMsg: err.message
            })
        }
    },
    GamResult: (req, res) => {
        const { roomId } = req.body;
        try {
            let GameHistory = new History();
            console.log(rooms[roomId], 'rooms', req.body, 'req,body');
            GameHistory.user1 = rooms[roomId].Names[0];
            GameHistory.user2 = rooms[roomId].Names[1];
            GameHistory.address1 = rooms[roomId].addresss[0];
            GameHistory.address2 = rooms[roomId].addresss[1];
            GameHistory.score1 = rooms[roomId].scores[0];
            GameHistory.score2 = rooms[roomId].scores[1];
            GameHistory.save()
                .then(result => {
                    delete rooms[roomId];
                    try {
                        res.json({
                            serverMsg: "Success"
                        })
                    } catch (error) {
                        throw new Error("Can't find Server!");
                    };
                }).catch(err => {
                    console.log(err, 'errr')
                })

        } catch (err) {
            res.json({
                serverMsg: err.message
            })
        }
    },
    getHistoryData: (req, res) => {
        History.find().sort({ createdAt: -1 })
            .then(result => {
                res.send(result)
            })
            .catch(err => {
                console.log(err, 'err')
            })
    }
};