/**
 * Created by Moses on 2017/7/20.
 */
const conf = {
  Splash: {
    width: 380,
    height: 120,
    title: 'MosesUtils',
    resizable: false,
    center: true,
    show: true,
    frame: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    icon: 'resources/icon.png',
    titleBarStyle: 'hidden',
  },
  MainWindow: {
    width: 800,
    height: 600,
    resizable: true,
    center: true,
    title: 'MosesUtils',
    show: false,
    frame: true,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    icon: 'resources/icon.png',
    titleBarStyle: 'hidden',
  },
};

module.exports = conf;
