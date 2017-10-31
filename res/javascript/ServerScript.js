var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 4200;




app.use(express.static(__dirname + '/node_modules'));

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "Style.css");
});
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/Index.html');
});

server.listen(port);
console.log("Listening on port " + port);


io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});
