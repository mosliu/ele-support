/**
 * Created by Moses on 2016/12/27.
 */
const path = require('path');
const url = require('url');
const { ipcMain, BrowserWindow } = require('electron');
const config = require('../config');
const broadcost = require('../libs/broadcast');
const gVars = require('../libs/globalVars');
const logger = require('log4js').getLogger('MainWindow');

const WindowConf = config.windows.MainWindow;
const language = config.Language;

class MainWindow {
  constructor() {
    this.createWindow();
  }

  show() {
    this.window.show();
    this.isShown = true;
  }

  hide() {
    this.window.hide();
    this.isShown = false;
  }

  /**
   * 创建窗口
   */
  createWindow() {
    logger.info('mainWindow constructor initialized!');
    let inProgramConf = { titleBarStyle: 'show' };
    inProgramConf = Object.assign(inProgramConf, WindowConf);
    this.window = new BrowserWindow(inProgramConf);


    this.window.loadURL(url.format({
      // pathname: path.join(__dirname, 'index.html'),
      // pathname: '192.168.7.202',
      pathname: '127.0.0.1',
      protocol: 'http:',
      slashes: true,
    }));
    this.isShown = false;

    this.window.on('close', (e) => {
      this.window = null;
      // if (this.mainWindow.isVisible()) {
      //   e.preventDefault();
      //   this.mainWindow.hide();
      // }
    });

    this.window.once('ready-to-show', () => {
      // this.mainWindow.show();
      // broadcost('iamready', true);
    });

    this.window.webContents.once('did-finish-load', () => {
      gVars.window.splashWindow.window.close();
      console.log('haliluya!!');
    });

    this.window.webContents.on('did-finish-load', () => {
      this.window.show();
      this.window.webContents.executeJavaScript("console.log('Hello from Electron');");
      console.log('!!!!!!!!!!!!!!!!!');
      broadcost('iamready', true);
    });

    this.window.webContents.on('will-navigate', () => {
      console.log('will-navigate');
    });
    this.window.webContents.on('did-navigate', () => {
      console.log('did-navigate');
    });
  }
}

module.exports = MainWindow;
