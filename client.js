const io = require('socket.io-client');

let games = io.connect('http://localhost:3001')


games.emit('joinRoom', 'csgo----->')
games.emit('someEventFromClient', 'csgosss')
games.emit('vote', {
  room: 'churchhk',
  name: 'sunny',
  vote: 89
})






