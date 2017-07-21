/**
 * Created by Moses on 2017/7/19.
 */
const path = require('path');
const fs = require('fs');
const merge = require('lodash/merge');
const windowsConf = require('./windows.conf');
const dirConf = require('./dirs.conf');
const logConf = require('./logs.conf');

function existsConfigFile(filename) {
  return fs.existsSync(path.join(dirConf.config, filename));
}

const dev = existsConfigFile('dev.js') ? require('./dev') : { devconf: 'load error' };
const pro = existsConfigFile('pro.js') ? require('./pro') : { proconf: 'load error' };


// 返回的config对象
let config = {
  app: {
    name: 'Electron Support System Client',
    port: 3030,
  },
  debug: true,
  env: 'production',
  dir: dirConf,
  windows: windowsConf,
  log: logConf,
  Language: 'zh_CN',
};

config = merge(config, process.env.NODE_ENV === 'development' ? dev : pro);

// 私人配置文件存在则加载私人配置文件
// config = merge(
//   config,
//   existsConfigFile('private.js') ? require('./private') : { private: 'none' },
// );

if (config.showConfig) {
  console.log('============================Config content start============================');
  console.dir(config);
  console.log('============================Config content end==============================');
}

module.exports = config;

