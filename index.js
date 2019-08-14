const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socket = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

let mensajes = [];

socket.on('connection', function(socketClient){
    console.log('Se conecto un nuevo cliente!', socketClient);

    socketClient.on('nuevoMensaje', (dato)=>{
        mensajes.push(dato);
        socket.sockets.emit('mensaje', mensajes);
    });
    

    //para enviar a todos los sockets clientes que esten activos!
    //socket.sockets.emit('mensaje', mensajes);
});


http.listen(8080, ()=>{
    console.log("escuchando en http://localhost:8080/");
});
