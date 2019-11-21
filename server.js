var express = require('express');
var app = require('express')();
var port = process.env.PORT || 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);
var clientCounter = 0;

// Set public folder as root
app.use(express.static('public'));

// Provide access to node_modules folder from the client-side
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/views/index.html`));

io.set('transports', ['websocket']);

io.on('connection', function (socket) {

  console.log("user connected");
  clientCounter++;
  io.emit('client counter', clientCounter);

  // emit to server clients
  socket.on('balloon message', function (message) {
    console.log(message);
    io.emit('balloon message', message);
  });

  socket.on('disconnect', function () {
    console.log("user disconnected");
    clientCounter--;
    io.emit('client counter', clientCounter);
  })
});

server.listen(port, () => {
  console.info('listening on %d', port);
});