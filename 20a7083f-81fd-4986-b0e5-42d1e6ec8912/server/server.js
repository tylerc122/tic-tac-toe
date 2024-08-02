const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb+srv://tylercollo1:AANi0yEMLD0VLSMi@cluster0.d02tzun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Successfully connected');
    })
    .catch((error) => {
        console.error('Error connecting', error);
    });
app.get('/', (req, res) => {
    res.send("Hello world");
});

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port ${port}')
});
