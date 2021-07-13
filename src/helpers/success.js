const success = (statusCode,
  successMessage,
  successData, req, res, code) => res.status(statusCode).json({
    data: successData,
  });

module.exports = success
