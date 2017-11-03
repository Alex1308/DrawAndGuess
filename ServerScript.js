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
    socket.on('chat message', function(msg) {


        console.log(chosenWord);

        //Check if word is geussed
        if(chosenWord == msg) {


            //Do stuff
            console.log("Test");
        }

        io.emit('chat message', msg);
    });
    socket.on('disconnect' , function() {
        var index = clients.indexOf(socket.id);
        clients.splice(index, 1);
    })
});



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
    "Cannoo",
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
    return possibleWords[random];
}