# Electron OS X Prompts

## Usage (from Electron renderer process)
IMPORTANT: The module can only be used from the main process, so use IPC.
If you package an app, disable packaging as asar archive!

```javascript
ipcMain.on('open-prompt', (event, arg) => {

  const input = require('electron-osx-prompt')

  input('Label text', 'Placeholder text')
    .then((r) => {
      if (r) {
        console.log(r)
      }
    })
})
