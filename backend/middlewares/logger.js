// backend/middlewares/logger.js
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '..', 'logs');
const logFile = path.join(logDir, 'access.log');

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  fs.appendFileSync(logFile, log);
  next();
};

module.exports = logger;
