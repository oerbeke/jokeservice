const mongoose = require("mongoose");
const config = require("../config");
const fetch = require("node-fetch");
mongoose.connect(config.dataBaseURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const Joke = require("../models/Joke");
const { create } = require("../models/Joke");


exports.createJoke = async function (setup, punchline) {
 
  let joke = await Joke.findOne({ navn: setup }).exec();
  if (joke !== null) {
    return "navnet findes allerede";
  }
  joke = await Joke.create({
    setup: setup,
    punchline: punchline
  });

  return joke;
};

exports.deleteJoke = async function (navn) {
  const joke = await Joke.deleteOne({ navn: navn }).exec();
  return joke.deletedCount;
};

// getter til alle joke
exports.getAllJokes = async function () {
  return Joke.find().exec();
};

exports.getJoke = async function(setup, punchline) {
  return Joke.findOne({ 'setup': setup, 'punchline': punchline}).exec()
}

exports.updateJoke = async function (setup, punchline, nysetup, nypunchline) {
  Joke.findOneAndUpdate({ 'setup': setup, 'punchline': punchline }
    , { 'setup': nysetup, 'punchline': nypunchline },
      { returnNewDocument: true }).exec()
}

exports.checkAddedJoke = async function(setup, punchline) {
  const joke = await Joke.findOne({ setup: setup, punchline: punchline }).exec();

  if (joke == null) {
    this.createJoke(setup, punchline);
    return "Joken er ny";
  } else if (joke.setup == setup && joke.punchline == punchline) {
    return "Joken existerer allerede";
  } else {
    return;
  }
  
}
