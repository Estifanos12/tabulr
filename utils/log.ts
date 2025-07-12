const winston = require('winston');

export const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
});
