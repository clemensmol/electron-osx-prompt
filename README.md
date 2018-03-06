# Electron OS X Prompts

> Electron macOS-style prompts. Works on all platforms.

<img src="https://i.imgur.com/rS6Dncv.png" width="500px">

<img src="https://i.imgur.com/l7rcbrE.png" width="500px">

## Install
```
$ npm install electron-osx-prompt
```

## Usage

```js
const userPrompt = require('electron-osx-prompt')

// from main process
const icon = __dirname + '/icon.png'

userPrompt('Label text', 'Placeholder text', icon)
  .then(input => {
    console.log(input)
  })
  .catch(err => {
    console.log(err)
  })
```

## Options
You can change the label text and the textbox placeholder text.
You can also provide a PNG or JPEG image for the prompt icon. It's size should be about 60 x 60 px.
If you pass a BrowserWindow instance as the fourth parameter, the prompt will be attached as a dialog from the top.

### input([label, placeholder, browserWindow])
- label: `string`. Default: `"Please enter a value"`.
- placeholder: `string`. Default: `""`.
- icon: `string`. Default: Electron's standard icon.
- browserWindow: `BrowserWindow`. Default: `null`.
- returns Promise with user input. Clicking `Cancel` will return `null`.

## Licence
MIT © Peter Freeman

Uses css from `photon` by [@connors](https://github.com/connors)
