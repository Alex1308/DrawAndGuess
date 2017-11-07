var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 9200;

var path = require('path');

var options = {
    index: "html/index.html"
};

var clients = new Map();
var timeout;
var drawer;

app.use('/', express.static('res', options));


server.listen(port);
console.log("Listening on port " + port);

io.on('connection', function (socket) {
    console.log('A user connected');
    clients.set(socket.id, [0, ""]);
    socket.emit('socketID', socket.id);
    socket.on('chat message', function (msg, username) {
        io.emit('chat message', msg, username);

        clients.get(socket.id)[1] = username;
        //check if word is guessed correctly
        if (chosenWord !== "") {
            if (chosenWord.toLowerCase() === msg.toLowerCase()) {

                io.emit('server message', "Server: Correct! The word was: " + chosenWord);
                EndOfRound();
                clients.set(socket.id, [clients.get(socket.id)[0] + 5, username]);
                clients.set(drawer, [clients.get(drawer)[0] + 10, clients.get(drawer)[1]]);
                //Do stuff
                console.log("Correct guess!");
                scoreUpdate();
            }
        }

    });
    socket.on('start game', function () {
        StartGame(socket);
    });
    socket.on('disconnect', function () {
        clients.delete(socket.id);
    });
    socket.on('json canvas', function (json) {
        socket.broadcast.emit('json canvas', json);
    });
});

var i = 0;

function StartGame() {
    AssignWordToPlayer();
}

function EndOfRound() {
    clearTimeout(timeout);
    io.emit('round finished', "The round has finished and a new one will begin in 10 seconds.")
    setTimeout(AssignWordToPlayer, 10000);
}

function AssignWordToPlayer() {
    var currentClient;
    clearTimeout(timeout);
    io.emit('no drawing');
    if (i >= clients.size) {
        i = 0;
    }
    ChooseRandomWord();
    console.log(chosenWord);
    currentClient = Array.from(clients.keys())[i];
    io.to(currentClient).emit('new word', chosenWord);
    drawer = currentClient;
    io.sockets.connected[currentClient].on('word accepted', function (username) {
        io.emit('draw message', 'The new drawer is ' + username + '. You now have 1 minute to guess the word.');
    });
    timeout = setTimeout(EndOfRound, 60000);
    i++;
}

function scoreUpdate() {
    var converted = JSON.stringify(Array.from(clients));
    io.emit('score up', converted);
}


var chosenWord = "";

var possibleWords = [
    "Avocado",
    "Airplane",
    "Bee",
    "Busta rhymes",
    "Alberto Contador",
    "Reddit",
    "Monitor",
    "Captain Morgan",
    "Zeppelin",
    "Burger",
    "Canoe",
    "Supermarket",
    "Torpedo",
    "Offside",
    "Motorbike",
    "Rodeo",
    "Hangover",
    "Kangaroo",
    "Tank",
    "Panther",
    "Gorilla",
    "Attack Helicopter",
    "Blue Whale",
    "Christmas Eve",
    "Santa Claus",
    "Titanic",
    "Donald Trump",
    "Restaurant",
    "Javascript",
    "Wok",
    "Liverpool FC",
    "Internet",
    "Calculator",
    "Guitar"
];


function ChooseRandomWord() {
    var random = Math.floor((Math.random() * possibleWords.length));
    chosenWord = possibleWords[random];
}