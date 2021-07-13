const winston = require('winston')

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `winston`
logger.stream = {
  write: (message) => {
  // use the 'info' log level so the output will be picked up.
    logger.info(message);
  },
};

module.exports = winston;
