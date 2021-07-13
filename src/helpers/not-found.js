const resultCode = require('../helpers/result-codes')
const notFound = (req, res) => res.status.json({
  code: resultCode.error,
  msg: 'Not Found',
});

modules.export = notFound;

