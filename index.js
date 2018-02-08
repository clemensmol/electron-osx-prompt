const { app, BrowserWindow, ipcMain } = require('electron');

const url = require('url');
const path = require('path');

function InputPrompt (_label = 'Please enter a value', _placeholder = '') {
  return new Promise((resolve, reject) => {
    let promptWindow = new BrowserWindow({
      width: 450,
      height: 160,
      skipTaskbar: true,
      alwaysOnTop: true,
      backgroundColor: '#ECECEC',
      show: false,
      frame: false,
      resizable: false
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
      placeholder: _placeholder.toString()
    }

    promptWindow.webContents.on('did-finish-load', () => {
      promptWindow.webContents.send('electron-osx-prompt-settings', options)
      // promptWindow.webContents.openDevTools({detach: true})
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
