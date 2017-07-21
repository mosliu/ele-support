/**
 * Created by Moses on 2017/7/19.
 */

const path = require('path');
const { ipcMain, BrowserWindow } = require('electron');
const config = require('../config');
const log4js = require('log4js');

const WindowConf = config.windows.Splash;
const language = config.Language;
const logger = log4js.getLogger('SplashWindow');

class SplashWindow {
  constructor() {
    logger.info('splash constructor initialized!');
    this.window = new BrowserWindow(WindowConf);
    const loadfile = path.join(config.dir.static, 'htmls/splash.html');
    console.log(`file://${loadfile}`);
    this.window.loadURL(`file://${loadfile}`);
    this.isShown = false;
    ipcMain.on('iamready', (event, args) => {
      console.log('iamready revoked');
      console.dir(event);
      console.dir(args);
    });
  }

  show() {
    this.window.show();
    this.isShown = true;
  }

  hide() {
    this.window.hide();
    this.isShown = false;
  }
}

module.exports = SplashWindow;
