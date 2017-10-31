var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "Style.css");
});
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/Server.html');
});

server.listen(4200);