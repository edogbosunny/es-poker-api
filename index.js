import express from 'express'
import mongoose from 'mongoose';
import httpServer from 'http'
import dotenv from 'dotenv'
const cors = require('cors');
const io = require("socket.io")(http);

let http = httpServer.createServer(app)



const app = express()
dotenv.config()


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config()

app.get("/", function (req, res) {
  res.send({ code: '00', message: 'welcome home' });
});

// atomic updates

mongoose.connect(process.env.MONGOCONN, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.once('open', function () {

  console.log("Mongo connected");
});

app.use('*', (req, res) => res.status(404).json({
  data: {
    message: 'Page not found',
  },
}));

export default http;
// module.exports = http;

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