const express = require('express');
const connectDB = require('./config/db');

const app = express();


//connect DB
connectDB();

//Init Middelware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));


//Define routes 
app.use('/api/jokes', require('./routes/api/jokes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
