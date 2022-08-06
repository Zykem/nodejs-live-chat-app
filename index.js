var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var path = require('path');

app.use(express.static(path.join(__dirname,'./public')));

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/public/index.html');

});


var name;

io.on('connection', (socket) => {

  socket.on('joining msg', (username) => {

  	name = username;
  	io.emit('chatmsg', `${name} # Joined`);

  });
  
  socket.on('disconnect', () => {

    io.emit('chatmsg', `${name} # Left`);
    
  });
  socket.on('chatmsg', (msg) => {

    socket.broadcast.emit('chatmsg', msg);

  });
});

server.listen(3000, () => {
  console.log('Server is up and running on Port 3000');
});