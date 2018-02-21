# Electron OS X Prompts

> Electron macOS-style prompts. Works only on macOS.

<img src="https://i.imgur.com/rS6Dncv.png" width="500px">

<img src="https://i.imgur.com/l7rcbrE.png" width="500px">

## Install
```
$ npm install electron-osx-prompt
```
When packaging your app with asar you have to manually exclude this module by adding the `--unpack-dir {node_modules/electron-osx-prompt}` flag.
This is required because the `child_process.spawn()` command is used to get your app icon.
The complete packaging command should now look like
```
$ asar pack app app.asar --unpack-dir {node_modules/electron-osx-prompt}
```

## Usage

```js
const userPrompt = require('electron-osx-prompt')

userPrompt('Label text', 'Placeholder text')
  .then(input => {
    console.log(input)
  })
  .catch(err => {
    console.log(err)
  })
```

## Options
You can change the label text and the textbox placeholder text.
Your app icon will be automatically loaded after packaging the app (see above).
If you pass a BrowserWindow as the third parameter, the prompt will be attached as a dialog from the top.

### input([label, placeholder, browserWindow])
- label: `string`. Default: `"Please enter a value"`
- placeholder: `string`. Default: `""`
- browserWindow: `BrowserWindow`. Default: `null`
- returns Promise with user input. Cancel will return `null`.

## Licence
MIT © Peter Freeman

Uses css from `photon` by [@connors](https://github.com/connors)
