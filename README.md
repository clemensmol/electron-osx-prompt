# Electron OS X Prompts

> Electron macOS-style prompts. Works only on _macOS_.

<img src="https://i.imgur.com/rS6Dncv.png">

## IMPORTANT
When packaging your app with asar you have to manually exclude this module by adding the `--unpack-dir {node_modules/electron-osx-prompt}` flag.
This is required because the `child_process.spawn()` command is used to get your app icon.

The complete packaging command should now look like
```
$ asar pack app app.asar --unpack-dir {node_modules/electron-osx-prompt}
```

## Install
```
$ npm install electron-osx-prompt
```

## Usage

```js
const userPrompt = require('electron-osx-prompt')

userPrompt('Label text', 'Placeholder text')
  .then(input => {
    console.log(input)
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
