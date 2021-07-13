const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const roomsSchema = new mongoose.Schema({
  room: { type: String, unique: true },
  room_id: { type: String, unique: true },
  meta: { type: mongoose.Schema.Types.Mixed },
  ts: Number
});

const prefix = process.env.PREFIX
const model_name = prefix + "_es_rooms";
module.exports = mongoose.model(model_name, roomsSchema);
