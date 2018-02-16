const electron = require('electron');

const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow

const ipcMain = electron.ipcMain ||  electron.remote.ipcMain

const url = require('url');
const path = require('path');

function InputPrompt (
              _label = 'Please enter a value',
              _placeholder = '',
              browserWindow = null) {
  return new Promise((resolve, reject) => {
    let hasParent = null
    let isModal = false

    if (browserWindow) {
      hasParent = browserWindow
      isModal = true
    }

    let promptWindow = new BrowserWindow({
      width: 450,
      height: 160,
      skipTaskbar: true,
      alwaysOnTop: true,
      backgroundColor: '#ECECEC',
      show: false,
      frame: false,
      resizable: false,
      parent: hasParent,
      modal: isModal
    });

    promptWindow.setMenu(null);

    const promptUrl = url.format({
      protocol: 'file',
      slashes: true,
      pathname: path.join(__dirname, './prompt.html')
    });

    promptWindow.loadURL(promptUrl);

    let options = {
      label: _label.toString(),
      placeholder: _placeholder.toString(),
      browserWindow: hasParent
    }

    promptWindow.webContents.on('did-finish-load', () => {
      promptWindow.webContents.send('electron-osx-prompt-settings', options)
      //promptWindow.webContents.openDevTools({detach: true})
    });

    promptWindow.once('ready-to-show', promptWindow.show);

    const returnValue = (event, value) => {
      resolve(value);

      if (promptWindow) {
        promptWindow.close();
        promptWindow = null;
      }
    };

    ipcMain.on('electron-osx-prompt-return-value', returnValue)

  });
}

module.exports = InputPrompt;
