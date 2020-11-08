// testDB.js
const mongoose = require('mongoose');
const { exit } = require('process');
mongoose.connect('mongodb+srv://Aaron:Anarchie99@cluster0.dfoma.mongodb.net/joke?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });

const testSchema = new mongoose.Schema({
    setup: String,  
    punchline: String
});

const Test = mongoose.model('jokes', testSchema);

async function createCompany() {
    console.log('executing');

    //The await function goes here:
    const test = await Test.create({
      setup: "xd",  
      punchline: "xd is funny!"
    });
    console.log(test);

    //---------------------------------
  }

  function start() {
    return createCompany();
  }
  
  // Call start
  (async() => {
    console.log('starting');
  
    await start();
    
    console.log('finished');
    return process.exit();
  })();