const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    player1: { type: String, required: true },
    player2: { type: String, required: true },
    winner: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;