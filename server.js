const http = require('.');
const logger = require('./src/utils/logger');
const PORT = process.env.PORT || 3001;

http.listen(PORT, function () {
  logger.info(`Listening on port ${PORT}`);
});
