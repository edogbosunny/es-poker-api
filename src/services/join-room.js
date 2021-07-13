const Rooms = require('../models/rooms');
const joi = require('joi');
const { validateSpec } = require('../utils/spec-validator');
const resultCodes = require('../helpers/result-codes')

const createRoom = async (req, res) => {
  const soc = req.app.get('io')
  const sock = req.app.get('sock')
  let selectedRoom = req.query.room || 'defaultRoom';

  try {
    const serviceSpec = joi.object({
      room: joi.string()
        .messages({
          "any.required": "Room name field is required"
        }).required(),
      room_id: joi.string()
        .messages({
          "any.required": "Room id field is required."
        }).required(),
    }).required()

    const params = validateSpec(serviceSpec, req.query);

    const findRoom = await Rooms.find(
      { room: params.room, room_id: params.room_id })

    if (!findRoom || findRoom.length === 0) {
      sock.emit("err", "Room does not exist" + selectedRoom);
      return res.status(400).json({ code: resultCodes.error, message: 'Room does not exist.' })
    }

    const rooms = soc.nsps

    if (!rooms) {
      sock.join(selectedRoom);
      sock.emit("success", "You have successful joined: " + selectedRoom);
    }

    return {
      code: resultCodes.success,
      message: 'meeting room joined.',
    }
    
  } catch (e) {

    sock.emit("err", "An error occoured while joining the room " + selectedRoom);
    res.status(400).json({ code: resultCodes.error, message: e.message })
  }
}
module.exports = createRoom;
