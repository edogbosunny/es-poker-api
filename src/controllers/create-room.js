const SuccessResponse = require('../helpers/success');
const BadRequestResponse = require('../helpers/http-error');
const logger = require('../utils/logger');
const createRoom = require('../services/create-room');
const resultCodes = require('../helpers/result-codes');

async function createRoomController(req, res) {
  try {
    const result = await createRoom(req, res);

    if (!result) {
      logger.error('Could not fetch results');
    } else if (result.code === resultCodes.error) {
      BadRequestResponse(400, 'Error', result.message, req, res);
    } else {
      SuccessResponse(200, 'Success', result, req, res);
    }
  } catch (error) {
    logger.error('An error occoured.');
    BadRequestResponse(500, 'Error', error && error.message || 'An error occoured.', req, res);
  }
}
module.exports = createRoomController
