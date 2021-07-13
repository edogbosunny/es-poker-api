// const mongoose = require('mongoose');
// const voteValidator = require('../utils/vote-validator');
// const Rooms = require('../models/rooms')
// // const io = require("socket.io")(http);
// const logger = require('../utils/logger');

// const db = mongoose.connection;
// ( ()=> {

// })
// mongoose.connect(process.env.MONGOCONN, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// });

// // db.once('open', function () {
// //   try {
//     // io.on('connection', (socket) => {
//     //   socket.join('vroom');
//     //   app.set("io", io);
//     //   app.set("sock", socket);
//     //   // console.log('>>>', io.sockets.adapter)
//     //   socket.on('vote', async (v) => {
//     //     const rooms = io.sockets.adapter.rooms.get(v.room);
//     //     console.log(rooms)
//     //     console.log('v', v)
//     //     if (!rooms) {
//     //       socket.join(v.room);
//     //       socket.emit("success", "You have successful joined: " + v.room);
//     //     }

//     //     let voteValidatorResponse = voteValidator(Number(v.vote))
//     //     if (!voteValidatorResponse) {

//     //       io.in(v.room).emit("vote-status", {
//     //         message: "Vote must be prime number between 0 and 13",
//     //       })
//     //     }
//     //     else {
//     //       console.log('--here3>')
//     //       const fnd = await Rooms.find({ 'meta.data.name': v.name, room: v.room })

//     //       if (!fnd || fnd.length === 0) {
//     //         const respValue = await Rooms.findOneAndUpdate({ room: v.room },
//     //           {
//     //             $push: { 'meta.data': v }
//     //           }, { new: true }
//     //         )
//     //         console.log('--here2>')
//     //         io.in(v.room).emit("vote-status", {
//     //           message: "Vote has been recorderd successfully.",
//     //           response: respValue
//     //         })
//     //       } else {
//     //         const respValue = await Rooms.findOneAndUpdate({ 'meta.data.name': v.name, room: v.room },
//     //           {
//     //             $set: {
//     //               'meta.data.$.vote': v.vote,
//     //               'meta.data.$.name': v.name,
//     //               'meta.data.$.room': v.room,
//     //             }
//     //           }, { new: true }
//     //         )

//     //         io.in(v.room).emit("vote-status", {
//     //           // socket.to(v.room).emit("vote-status", {
//     //           message: "Vote has been recorderd successfully.",
//     //           response: respValue
//     //         })
//     //       }
//     //     }
//     //   })
//     // })
// //   } catch (error) {

// //   }
// //   logger.info('Now connected to the database');
// // });

// module.exports = db


require('dotenv').config();

const mongoose = require('mongoose');
const logger = require('../utils/logger');

// Build the connection string


  const dbURI = process.env.MONGOCONN

  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  };

  // Create the database connection
  const db = mongoose.connection;
  mongoose
    .connect(dbURI, options)
    .then(() => {
      logger.info('Mongoose connection done');
    })
    .catch((e) => {
      logger.info(`Mongoose connection error: ${e.message}`);
    });

  /* CONNECTION EVENTS
     When successfully connected
  */
  mongoose.connection.on('connected', () => {
    logger.info('Mongoose default connection open');
  });

  // If the connection throws an error
  mongoose.connection.on('error', (err) => {
    logger.error(`Mongoose default connection error: ${err}`);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });



module.exports = db