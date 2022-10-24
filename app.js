const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const loginRoute = require('./data/login.js');
const authRoute = require('./data/auth.js');
const userRoute = require('./data/users.js');
const hallRoute = require('./data/hall.js');
const bookingRoute = require('./data/booking.js');
require('dotenv').config()

// MongoDB Databse url
var mongoDatabase = process.env.MONGODB_URI;


// Created express server
const app = express();
mongoose.Promise = global.Promise;


// Connect Mongodb Database
mongoose.connect(mongoDatabase, { useUnifiedTopology: true, useNewUrlParser: true }).then(
 () => { console.log('Database is connected') },
 err => { console.log('There is problem while connecting database ' + err) }
);


// Convert incoming data to JSON format
app.use(bodyParser.json());

app.use(express.static(`./dist/frontend`)); 

// Enabled CORS
app.use(cors());


// Setup for the server port number
const port = process.env.PORT || 4000;


// Routes Configuration
app.use('/api/login', loginRoute);
app.use('/api/users', authRoute, userRoute);
app.use('/api/hall', authRoute, hallRoute);
app.use('/api/booking', authRoute, bookingRoute);


// Staring our express server
const server = app.listen(port, function () {
 console.log('Server Lisening On Port : ' + port);
});

app.get('/*', function (req, res){
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
})