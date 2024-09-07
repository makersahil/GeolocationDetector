const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    latitude: String,
    longitude: String
});

const Location = mongoose.model('Location', locationSchema);

async function saveLocation(coordinates) {
    const location = new Location({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
    });

    try {
        const savedLocation = await location.save();
        console.log('Location saved successfylly!', savedLocation);
    } catch (err) {
        console.error('Error saving location ', err);
    }
}

async function getLocations() {
    try {
        const locations = await Location.find();
        console.log(locations);      
    } catch (err) {
        console.error('Error fetching locations', err);
    }
}

module.exports = {
    saveLocation,
    getLocations,
}