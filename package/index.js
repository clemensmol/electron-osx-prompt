const electron = require('electron');
const { BrowserWindow, ipcMain } = electron || electron.remote;

const fileIcon = require('file-icon');

const process = require('process');
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
      frame: false
    });

    promptWindow.setMenu(null);

    const promptUrl = url.format({
      protocol: 'file',
      slashes: true,
      pathname: path.join(__dirname, './prompt.html')
    });

    promptWindow.loadURL(promptUrl);

    let pid = process.pid;

    fileIcon.buffer(pid, {size: 60}).then(buffer => {
      let options = {
        label: _label,
        placeholder: _placeholder,
        icon: buffer
      }

      promptWindow.webContents.on('did-finish-load', () => {
        promptWindow.webContents.send('prompt-settings', options)
      })
    });


    promptWindow.once('ready-to-show', promptWindow.show);

    const returnValue = (event, value) => {
      resolve(value);

      if (promptWindow) {
        promptWindow.close();
        promptWindow = null;
      }
    };

    ipcMain.on('return-value', returnValue)
  });
}

module.exports = InputPrompt;
