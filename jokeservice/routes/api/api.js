const express = require("express");
const router = express.Router();

const Joke = require("../../models/Joke");

router.get("/api", async (request, response) => {
  let joke;

  async function queryJokes() {
    console.log("executing");
    joke = await Joke.find().exec();
  }

  function start() {
    return queryJokes();
  }

  await start();
  response.render("jokes.hbs", { joke });
});


module.exports = router;
