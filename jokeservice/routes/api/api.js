const express = require("express");
const controller = require("../../controller/controller");
const router = express.Router();

const Joke = require("../../models/Joke");

router.post("/addJoke", async (request, response) => {
  const { setup, punchline } = request.body;
  let newJoke = await controller.checkAddedJoke(setup, punchline);
  
  if (newJoke == "Joken er ny") {
    response.status(201).send(["Joken tilføjet!"]);
  } else {
    response.sendStatus(401);
  }
});

router.get("/jokes", async (request, response) => {
  let joke;

  async function queryJokes() {
    console.log("executing get");
    joke = await Joke.find().exec();
  }

  function start() {
    return queryJokes();
  }

  await start();
  response.render("jokes.hbs", { joke });
});

router.get('/', async (req, res) => {

    let joke;

    async function queryJokes() {
      console.log("executing get");
      joke = await Joke.find().exec();
    }
  
    function start() {
      return queryJokes();
    }
  
    await start();
    res.render("index.hbs", { joke });

})
/*
router.get('/othersites', async (req, res) => {
  try{
      const respons = await fetch(jokesUrl);

      res.json(respons);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
})

router.get('/otherjokes/:site', async (req, res) => {
  try{
      const respons = await fetch(jokesUrl);

      res.json(respons);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
})
*/

module.exports = router;
