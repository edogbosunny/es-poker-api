const express = require('express');
const app = express()
require('./src/db/dbconn');
const http = require("http").createServer(app);
const dotenv = require('dotenv');
const voteValidator = require('./src/utils/vote-validator');
const Rooms = require('./src/models/rooms')
const routes = require('./src/routes');
const cors = require('cors');
const io = require("socket.io")(http);
const logger = require('./src/utils/logger');

dotenv.config()


/**
 * connect to the db.
 * check joined rooms from socketio for incoming request.
 * if room does not exist, let user join the room.
 * do necessary validations and reply accordinly.
 */

app.use(cors());
app.use('/api/v1', routes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config()
app.set("io", io);
app.get("/", function (req, res) {
  res.send({ code: '00', message: 'welcome home' });
});

// atomic updates

try {
  io.on('connection', (socket) => {
    socket.join('vroom');
    app.set("io", io);
    app.set("sock", socket);

    socket.on('vote', async (v) => {
      const rooms = io.sockets.adapter.rooms.get(v.room);
      if (!rooms) {
        socket.join(v.room);
        socket.emit("success", "You have successful joined: " + v.room);
      }

      let voteValidatorResponse = voteValidator(Number(v.vote))
      if (!voteValidatorResponse) {

        io.emit("vote-status", {
          // socket.to(v.room).emit("vote-status", {
          message: "Vote has been recorderd successfully.",
          response: respValue
        })
        io.in(v.room).emit("vote-status", {
          message: "Vote must be prime number between 0 and 13",
        })
      }
      else {

        const fnd = await Rooms.find({ 'meta.data.name': v.name, room: v.room })

        if (!fnd || fnd.length === 0) {
          const respValue = await Rooms.findOneAndUpdate({ room: v.room },
            {
              $push: { 'meta.data': v }
            }, { new: true }
          )

          io.emit("vote-status", {
            // socket.to(v.room).emit("vote-status", {
            message: "Vote has been recorderd successfully.",
            response: respValue
          })
          io.in(v.room).emit("vote-status", {
            message: "Vote has been recorderd successfully.",
            response: respValue
          })
        } else {
          const respValue = await Rooms.findOneAndUpdate({ 'meta.data.name': v.name, room: v.room },
            {
              $set: {
                'meta.data.$.vote': v.vote,
                'meta.data.$.name': v.name,
                'meta.data.$.room': v.room,
              }
            }, { new: true }
          )

          io.emit("vote-status", {
            // socket.to(v.room).emit("vote-status", {
            message: "Vote has been recorderd successfully.",
            response: respValue
          })
          io.in(v.room).emit("vote-status", {
            // socket.to(v.room).emit("vote-status", {
            message: "Vote has been recorderd successfully.",
            response: respValue
          })
        }
      }
    })
  })
} catch (error) {
logger.error('An error has occoured')
}

app.use('*', (req, res) => res.status(404).json({
  data: {
    message: 'Page not found',
  },
}));

module.exports = http;

// data structure
// [
//   {
//     _id: {
//       $oid: "60df30f8c67b96d4aab38548"
//     },
//     room: "churchh",
//     "room_id": "12312312323",
//     "meta": {

// data: [
//        {
//         name: 'sunny',
//         vote: 5
//       },
//      {
//         name: 'bola',
//         vote: 3
//       }
//     },
// ]
//     "__v": 0
//   }
// ]