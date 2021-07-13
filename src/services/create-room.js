const Rooms = require('../models/rooms');
const joi = require('joi');
const { validateSpec } = require('../utils/spec-validator');
const responseCodes = require('../helpers/result-codes')

const createRoom = async (req, res) => {

  const sock = req.app.get('sock');
  let selectedRoom = req.body.room || 'defaultRoom';
  try {

    /**
     * - get room to be created from FE.
     * - check if such room already exists in the db.
     * - if it does, throw an error informing the user that that room already exists.
     * - if not. save the user to the db and create a room immediatly.
     * - return the link as a json response so user can share.
     */

    const serviceSpec = joi.object({
      room: joi.string()
        .messages({
          "any.required": "Room name field is required"
        }).required(),
      room_id: joi.string()
        .messages({
          "any.required": "Room id field is required."
        }).required(),
      meta: joi.object(),
    }).required()

    const params = validateSpec(serviceSpec, req.body);

    const storeRooms = await Rooms.create(
      { room: params.room, room_id: params.room_id, meta: params.meta || {} })

    if (!storeRooms) {
      return res.status(400).json({ code: responseCodes.error, message: 'Room already exists' })
    }


    sock.join(selectedRoom);
    sock.emit("success", "You have successful joined: " + selectedRoom);



    return {
      code: responseCodes.success,
      message: 'success hell yeah room has been created.',
      url: `${process.env.BASEURL}/api/v1/join?room_id=${params.room_id}&room=${params.room}`
    }

  } catch (e) {
    if (e.message.indexOf('room_1') >= 0) {
      e.message = 'Room already exist.';
    }
    if (e.message.indexOf('room_id_1') >= 0) {
      e.message = 'Room already exist.';
    }
    sock.emit('err', 'Room already exist' + selectedRoom);
    return { code: responseCodes.error, message: e.message }
  }
}
module.exports = createRoom;

