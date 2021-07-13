const SuccessResponse = require('../helpers/success');
const BadRequestResponse = require('../helpers/http-error');
const logger = require('../utils/logger');
const createRoom = require('../services/create-room');

async function createRoomController(req, res) {
  try {
    const result = await createRoom(req, res);
    console.log('-->', result)
    if (!result) {
      logger.error('Could not fetch results');
    } else if(result.message === 'Room already exist.'){
      BadRequestResponse(400, 'Error', result.message, req, res);
    }else{
      SuccessResponse(200, 'Success', result, req, res);
    }
  } catch (error) {
    logger.error('An error occoured.');
    BadRequestResponse(500, 'Error', error && error.message || 'An error occoured.', req, res);
  }
}
module.exports = createRoomController

