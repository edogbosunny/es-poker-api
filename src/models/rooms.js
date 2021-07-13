var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config()
var roomsSchema = new mongoose.Schema({
  room: { type: String, unique: true },
  room_id: { type: String, unique: true },
  meta: { type: mongoose.Schema.Types.Mixed },
  ts: Number
});
// roomsSchema.index({ name: 1, room_id: 1 }, { unique: true })
let prefix = process.env.PREFIX
var model_name = prefix + "_es_rooms";
module.exports = mongoose.model(model_name, roomsSchema);
