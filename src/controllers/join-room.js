const SuccessResponse = require('../helpers/success');
const BadRequestResponse = require('../helpers/http-error');
const logger = require('../utils/logger');
const joinRoom = require('../services/join-room');
const resultCodes = require('../helpers/result-codes');

async function joinRoomController(req, res) {
  try {
    const result = await joinRoom(req, res);

    if (!result) {
      logger.error('Could not fetch results');
    } else {
      SuccessResponse(200, 'Success', result, req, res, resultCodes.success);
    }
  } catch (error) {

    logger.error('An error occoured.');
    BadRequestResponse(500, 'Error', error && error.message || 'An error occoured.', req, res, resultCodes.error);
  }
}
module.exports = joinRoomController

