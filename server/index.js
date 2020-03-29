const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('client connect ...')
  socket.on('report', data => {
    socket.broadcast.emit('receive', data);
  });
  socket.on('disconnect', () => {
    console.log('client disconnect ...')
  });
});

http.listen(8300, () => {
  console.log('listening on *:8300');
});
