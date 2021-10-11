import * as winston from 'winston';
import 'express-async-errors';

function logger() {

  winston.add(
    new winston.transports.Console({
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint({ colorize: true }),
        winston.format.simple(),
        winston.format.padLevels(),
      ),
    }),
    // new winston.transports.File({
    //   filename: 'exceptions.log',
    //   level: 'error',
    //   handleExceptions: true,
    //   json: true,
    // })
    // new winston.transports.File({
    //   filename: 'combined.log',
    // })
  );
  // winston.exceptions.handle(new winston.transports.File({ filename: 'exceptions.log' }));

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
}

export default logger;
