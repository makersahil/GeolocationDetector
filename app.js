const express = require('express');
const path = require('path');

const { getLocations, saveLocation } = require('./model/location.model');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/save-location', (req, res) => {

   const { latitude, longitude } = req.body;   

    saveLocation({
        latitude,
        longitude,
   })

   res.sendStatus(200);
});

module.exports = app;