const winston = require('winston');

const logger = winston.createLogger({
  transports: [ new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true
  })
  ],
  exitOnError: false
});

const log = (context, message, scope) => {
  const obj = {
    context,
    scope,
    message: message.toString()
  };
  logger.info(obj);
};

module.exports = {
  log
};
