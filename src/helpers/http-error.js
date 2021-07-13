const httpError = (statusCode,
  errorMessage,
  errorData,
  req,
  res, code) => res.status(statusCode).send({
    code,
    msg: errorData,
  });

module.exports = httpError;

