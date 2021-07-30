import winston from 'winston';

const logger = new winston.Logger({
  transports: [ new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true
  })
  ],
  exitOnError: false
});

const log = (context: Object, message: Object, scope: Object) => logger.info(`context=${context}, scope=${scope}, message=${message}`);

const logError = (context: Object, message: Object, scope: Object) => logger.error(`context=${context}, scope=${scope}, message=${message}`);

export { log, logError };
