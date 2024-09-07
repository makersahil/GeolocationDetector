const box = document.getElementById('box');

function getCoordinates() {

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        alert('Geolocation not supported by your browser!');
    }

}

async function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const wrapper = document.createElement('div');
    wrapper.className = 'alert alert-success';
    wrapper.setAttribute('role', 'alert');
    wrapper.setAttribute('id', 'output');
    wrapper.innerHTML = `Latitude: ${latitude} <br> Longitude: ${longitude}`;

    box.append(wrapper);
    await fetch('http://localhost:3000/save-location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            latitude,
            longitude,
        })
    })
}

// ======= CODE FOR SOCKET.IO REAL-TIME COMMUNICATION ======

const socket = io('http://localhost:3000');

function sendLocation(position) {
    const { latitude, longitude } = position.coords;

    socket.emit('location', {latitude, longitude});
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(sendLocation, (error) => {
        console.error('Error getting location', error);
    }, {
        enableHighAccuracy: true
    });
} else {
    console.error('Geolocation not supported by your browser!');
}