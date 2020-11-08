//Controller.js
const mongoose = require("mongoose");
const Joke = require('../models/Joke');
const config = require('../config');

mongoose.connect(config.databaseURI, {useNewUrlParser: true,useUnifiedTopology: true});

exports.createJoke = function (setup, punchline) {
    return Joke.create({
        setup,
        punchline
    });
};

exports.getJoke = function (jokeId) {
    return Joke.findById("_id").exec();
};


exports.getJokes = function () {
    return Joke.find().populate('_id').exec();
};

/*
async function updateJokes() {
    let test = await Test.findById('5fa535ed168e293c10b23e1c').exec();
    test.setup += "-ny";
    test.punchline += "-ny";
    console.log(await test.save());
}

async function deleteJokes() {
    console.log(await Test.deleteOne().where("setup").equals("123").exec());
}
*/
