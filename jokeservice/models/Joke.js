//Joke.js
const mongoose = require('mongoose');

const joke = new mongoose.Schema({
    setup: String,
    punchline: String,
    type: mongoose.ObjectId, ref: 'Joke' 
});

module.exports = mongoose.model('Joke', joke);