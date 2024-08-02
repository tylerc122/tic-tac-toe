/// Same as userRoutes, check explanation there.

const express = require('express');
const Game = require('../models/Game');
const { model } = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', async (req, res) => {
    const { player1, player2, winner } = req.body;
    try {
        const newGame = new Game({ player1, player2, winner });
        await newGame.save();
        res.status(201).send('Game recorded successfully');
    } catch (error) {
        res.status(500).send('Error recording game: ' + error.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const games = await Game.find(req.query);
        res.status(200).json(games);
    } catch (error) {
        res.status(500).send('Error retrieving games: ' + error.message);
    }
});

router.get('/protected-route', authMiddleware, (req, res) => {
    res.send('This is a protected route, only accessible with a valid token');
});

model.exports = router;