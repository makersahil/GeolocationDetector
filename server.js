const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');

const app = require('./app');

const server = http.createServer(app);

const io = socketIo(server);

const PORT = 3000;

const HOST = '0.0.0.0';

const MONGO_URL = 'mongodb+srv://sahilkgupta:sahilkgupta@todo-app.akkxz.mongodb.net/?retryWrites=true&w=majority&appName=todo-app';

let dataCount = 0;

io.on('connection', (socket) => {
    console.log('A user connection');

    socket.on('location', (data) => {
        console.log(`${++dataCount}: Received Location: Latitude: ${data.latitude}, Longitude: ${data.longitude}`); 
        
    });

    socket.on('disconnect', () => {
        console.log('User disconnected!');
    });
});

server.listen(PORT, HOST,    () => {
    console.log(`The server is running: http://0.0.0.0:${PORT}`);
    mongoose.connect(MONGO_URL);
    mongoose.connection.on('connected', () => {
        console.log('Connection to database successful!');
    })

    mongoose.connection.on('error', (err) => {
        console.log(err);
    })
    
})