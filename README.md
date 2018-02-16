# Electron OS X Prompts

> Electron macOS-style prompts. Works only on _macOS_.

<img src="https://i.imgur.com/rS6Dncv.png">


## IMPORTANT
This module does not work when packaging your app with asar because of the `child_process.spawn()` error. I'm trying to find a workaround for this.

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
Your app icon will be automatically loaded after packaging the app (no asar!).
If you pass a BrowserWindow as the third parameter, the prompt will be attached as a dialog from the top.

### input([label, placeholder])
- label: `string`. Default: `"Please enter a value"`
- placeholder: `string`. Default: `""`
- browserWindow: `BrowserWindow`. Default: `null`
- returns Promise with user input. Cancel will return `null`.

## ToDo
- auto asar-exclude

## Licence
MIT © Peter Freeman

Uses css from `photon` by [@connors](https://github.com/connors)
