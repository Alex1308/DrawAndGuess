var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 9200;

var path = require('path');

var options = {
    index: "html/index.html"
};

var clients = [];

app.use('/', express.static('res', options));


server.listen(port);
console.log("Listening on port " + port);

io.on('connection', function (socket) {
    console.log('A user connected');
    clients.push(socket.id);
    socket.emit('socketID', socket.id);
    socket.on('chat message', function(msg, username) {
        io.emit('chat message', msg, username);

        console.log(chosenWord);
        //check if word is geussed correctly
        if(chosenWord.toLowerCase() === msg.toLowerCase()) {

            io.emit('server message', "Server: Correct! The word was: " + chosenWord);

            //Do stuff
            console.log("Correct geuss!");

        }

    });
    socket.on('disconnect' , function() {
        var index = clients.indexOf(socket.id);
        clients.splice(index, 1);
    });
    socket.on('json canvas', function(json) {
        console.log("ja du er kommet her til");
        console.log(json);
        emit('json canvas', json);
    });
});

var i = 0;

function AssignWordToPlayer(socket) {
    io.emit('no drawing');
    if (i >= clients.length) {
        i = 0;
    }
    ChooseRandomWord();
    io.to(clients[i]).emit('new word', chosenWord);
    socket.on('word accepted', function(username) {
        io.emit('draw message', 'The new drawer is ' + username + '. You now have 1 minute to guess the word.');
    });
    i++;
}




var chosenWord;

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
    var random = Math.floor((Math.random()* possibleWords.length));
    chosenWord = possibleWords[random];
}