const express = require('express');
const router = express.Router();
const { check, oneOf, validationResult } = require('express-validator');
const fetch = require("node-fetch");

const Joke = require('../../models/Joke');
const jokesUrl = 'https://krdo-joke-registry.herokuapp.com/api/services';

// @route   POST api/jokes
// @desc    Opret joke
// @acess   Public


router.post('/', oneOf([

    check('setup', 'Setup is required').isLength({ min: 2}),
    check('punchline', 'Punchline is required').isLength({ min: 2})

    ]), 

async (req, res) => {

const errors = validationResult(req);

if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
}

const { setup, punchline } = req.body;

try{

    let joke = await Joke.findOne({ setup });

    if(joke){
       return res.status(400).json({errors: [{ msg: 'Den har jeg hørt før (Setup findes allerede)'}]})
    }

    joke = new Joke({
        setup,
        punchline
    })

    await joke.save();

    res.send('Joke gemt')

} catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');

}

});

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


// @route   GET api/jokes
// @desc    Hent alle jokes
// @acess   Public

router.get('/', async (req, res) => {
    try{

        const jokes = await Joke.find().populate('joke', ['joke', ['setup', 'punchline']]);
        res.json(jokes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

//TODO
// @route   GET api/jokes/othersites
// @desc    Henter andre sider for jokes
// @acess   Public
router.get('/othersites', async (req, res) => {
    try{
        const respons = await fetch(jokesUrl);

        res.json(respons);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


//TODO
// @route   GET api/jokes/otherjokes/:site
// @desc    Hent alle jokes
// @acess   Public

router.get('/otherjokes/:site', async (req, res) => {
    try{
        const respons = await fetch(jokesUrl);

        res.json(respons);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})



module.exports = router;