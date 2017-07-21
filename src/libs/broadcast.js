/**
 * Created by Moses on 2017/7/19.
 */
const { webContents } = require('electron');


/**
 * 广播给 ipcRenderer
 * @param name
 * @param value
 */
function send(name,value) {
  const allWebContents = webContents.getAllWebContents();
  console.log(`allWebContents:\n${allWebContents}`);
  for (let t in allWebContents) {
    allWebContents[t].webContents.send(name,value);
  }
}

module.exports = send;
