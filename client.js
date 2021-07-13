const io = require('socket.io-client');

// let games = io.connect('http://localhost:3000/api/v1/poker')
let games = io.connect('http://localhost:3001')
// let games = io.connect('http://localhost:3000/api/v1/home')
games.on('hello', (res) => console.log('success', res))
games.on('socker', (res) => console.log('success', res))
// console.log(games.on)
// games.on('welcome', (msg) => {
//   console.log('recieved', msg)
// });

games.emit('joinRoom', 'csgo----->')
games.emit('someEventFromClient', 'csgosss')
games.emit('vote', {
  room: 'churchhk',
  name: 'sunny',
  vote: 89
})

// games.on('welcome', (msg) => {
//   console.log('recieved', 'iii')
// });

games.on('err', (err) => console.log('An error occoured', err))
games.on('success', (res) => console.log('qsuccess', res))
games.on('vote-status', (res) => console.log('wsuccess', JSON.stringify(res, null, 4)))
// games.on('some event', (res) => console.log('event', res))
// games.on('gbese', (res) => console.log('jjjjjj', res))
// games.on('gbese', (res) => console.log('jjjjjj', res))