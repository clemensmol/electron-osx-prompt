# Electron OS X Prompts

> Electron macOS-style prompts.

<img src="https://i.imgur.com/rS6Dncv.png">


## IMPORTANT
The module can only be used from the main process, so use IPC.

And don't package your app with asar when using this module.

This won't work because the `childprocess.spawn()` won't execute correctly.

## Install
```
$ npm install electron-osx-prompt
```

## Usage
```js
ipcMain.on('open-prompt', (event, arg) => {

  const userPrompt = require('electron-osx-prompt')

  userPrompt('Label text', 'Placeholder text')
    .then(input => {
      if (input) {
        console.log(input)
      }
    })
})
```

## Options
You can change the label text and the textbox placeholder text.

Your app icon will be automatically loaded after packaging the app (no asar!).

### input([label], [placeholder])
- label: `string`
- placeholder: `string`
- returns Promise with user input. Cancel will return `null`.

## ToDo
- prompt as modal
- auto asar-exclude

## Licence
MIT © Peter Freeman

Uses css from `photon` by [@connors](https://github.com/connors)
