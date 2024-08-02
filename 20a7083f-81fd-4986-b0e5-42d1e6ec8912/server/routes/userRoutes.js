const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
    // Receives username and password
    const { username, password } = req.body;

    try {
        // Hashes the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        // Creates a new user.
        const newUser = new User({ username, password: hashedPassword });
        // Saves it to the db
        await newUser.save();
        // If successful send a success message else, error.
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user: ' + error.message);
    }
});

// User login
router.post('/login', async (req, res) => {
    // Gets a username & pass from user.
    const { username, password } = req.body;
    try {
        // Search databse for username
        const user = await User.findOne({ username });
        // If it doesn't exist (meaning our findOne returned null)
        if (!user) {
            // Return satus message
            return res.status(400).send('User not found');
        }
        // If user is found, compare password w/ hashed password in daatabase
        const isMatch = await bcrypt.compare(password, user.password);
        // If they don't match
        if (!isMatch) {
            // Return status message.
            return res.status(400).send('Incorrect password');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).send('Error logging in ' + error.message);
    }
});

router.get('/:username', async (req, res) => {
    try {
        // Searches a user by 'username' using .findOne().
        const user = await User.findOne({ username: req.params.username });
        // Returns user data, else returns error.
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving user: ' + error.message);
    }
});

router.get('/protected-route', authMiddleware, (req, res) => {
    res.send('This is a protected route, only accessible with a valid token');
});


module.exports = router;