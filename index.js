const {BrowserWindow, ipcMain, app} = require('electron').remote;

const url = require('url');
const path = require('path');

function InputPrompt(
  options = { title: app.getName(), label: 'Please enter a value', placeholder: '',
    icon: '', showDevTools: false }) {
    return new Promise((resolve, reject) => {
        let promptWindow = new BrowserWindow({
            width: 440,
            height: 155,
            skipTaskbar: true,
            alwaysOnTop: true,
            frame: false,
            backgroundColor: '#ECECEC'
        });

        promptWindow.setMenu(null);

        if (options.showDevTools) {
          promptWindow.webContents.openDevTools('detach');
        }

        const promptUrl = url.format({
          protocol: 'file',
          slashes: true,
          pathname: path.join(__dirname, './prompt.html')
        });

        promptWindow.loadURL(promptUrl);

        promptWindow.webContents.on('did-finish-load', () => {
          promptWindow.webContents.send('prompt-settings', options)
        })

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
