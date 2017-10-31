var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 9200;

var path = require('path');

app.use(express.static('res'));

server.listen(port);
console.log("Listening on port " + port);


io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});
