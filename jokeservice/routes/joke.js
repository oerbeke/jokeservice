//Joke.js
const controller = require("../controllers/controller");
const express = require('express');
const config = require("../config");
const router = express.Router();

router
    .get('/api/jokes/', async (request, response) => {
        try {
            let jokes = await controller.getJokes();
            response.json(jokes);
        } catch (e) {
            sendStatus(e, response);
        }
    })
    .post('/', async (request, response) => {
            try {
                let {setup, punchline} = request.body;
                await controller.createJoke(setup, punchline);
                response.json({message: 'Joke saved!'});
            } catch (e) {
                sendStatus(e, response);
            }
        }
    );

function sendStatus(e, response) {
    console.error("Exception: " + e);
    if (e.stack) console.error(e.stack);
    response.status(500).send(e);
}

module.exports = router;