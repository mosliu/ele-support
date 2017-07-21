/**
 * Created by Moses on 2017/7/15.
 */
// process.env.debug = '*,-express:router* -express:application* -send';
process.env.NODE_ENV = 'development';

const path = require('path');
const url = require('url');
const config = require('./config');
const electron = require('electron');
// splash window
const SplashWindow = require('./views/splash');
// browser window
const MainWindow = require('./views/mainwindow');
const gVars = require('./libs/globalVars');
// const logger = require('./libs/logger')('main');
const log4js = require('log4js');

const logger = log4js.getLogger('main');

/**
 * 初始化log4js
 */
log4js.configure(config.log);

// Module to control application life.
// 创建应用程序对象
const { app, ipcMain } = electron;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

class MainApp {
  constructor() {
    // 主窗口
    // this.splashWindow = null;
    logger.info('App start!');
    this.mainWindow = null;
    // 启动闪屏
    this.splashWindow = null;
    this.settingsWindow = null;
    this.tray = null;
  }

  createSplashWindow() {
    this.splashWindow = new SplashWindow();
    gVars.window.splashWindow = this.splashWindow;
    logger.info('App created splash window!');
    this.splashWindow.show();
    // console.log('create splash:');
    // console.dir(gVars);
  }

  createMainUtilsWindow() {
    this.mainWindow = new MainWindow();
    gVars.window.mainWindow = this.mainWindow;
    logger.trace('App created main window!');
    // console.log('create main:');
    // console.dir(gVars);
  }

  initApp() {

    logger.info(`locale:${app.getLocale()}`)
    logger.info(`name:${app.getName()}`)

    // Electron 会在初始化后并准备
    // 创建浏览器窗口时，调用这个函数。
    // 部分 API 在 ready 事件触发后才能使用。
    app.on('ready', () => {
      logger.trace('App ready to create windows!');
      this.createSplashWindow();
      this.createMainUtilsWindow();
      // this.createTray();
    });

    /**
     * 当应用被激活时触发，常用于点击应用的 dock 图标的时候。  OS X
     */
    app.on('activate', () => {
      logger.info('App activate!');
      if (this.window == null) {
        this.createMainUtilsWindow();
      } else {
        this.window.show();
      }
    });

    app.on('before-quit', () => {
      logger.info('before-quit');
    });
    //
    // app.on('web-contents-created', () => {
    //   logger.info('web-contents-created');
    // });
    // app.on('browser-window-created', () => {
    //   logger.info('browser-window-created');
    // });


    // 当全部窗口关闭时退出。
    app.on('window-all-closed', () => {
      logger.info('App all window closed, App Existed');
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      // 判断当前操作系统是否是window系统，因为这个事件只作用在window系统中
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  }


  initIPC() {
    ipcMain.on('iamready', (event, args) => {
      console.dir(event);
      console.dir(args);
    });
  }

  init() {
    this.initApp();
    this.initIPC();
  }
}


new MainApp().init();

