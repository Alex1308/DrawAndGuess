var socket = io();
$(function () {
    var socket = io();
    $('message').submit(function(){
        socket.emit('chat message', $('#usermsg').val());
        $('#usermsg').val('');
        return false;
    });
});