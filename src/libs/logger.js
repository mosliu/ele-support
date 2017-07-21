/**
 * Created by Moses on 2017/7/20.
 */
const log4js = require('log4js');
const config = require('../config');

log4js.configure(config.log);
function logs(name) {
  const logger = log4js.getLogger(name);
  // logger.setLevel('INFO');
  return logger;
}

module.exports = logs;
