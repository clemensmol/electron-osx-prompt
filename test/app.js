'use strict'

// Load the global electron module
const {app, BrowserWindow, ipcMain} = require('electron')
const url = require('url')
const path = require('path')

let win = null

app.on('ready', () => {
  createMainWindow()
})

app.on('activate', function () {
  if (win === null) {
    createMainWindow()
  }
})

function createMainWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 300,
    show: false
  })

  // ... and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Let the window appear after the page has loaded to avoid
  // a white flash. Therefore we also set the background color.
  win.once('ready-to-show', win.show)

  win.on('closed', () => {
    win = null
  })
}

ipcMain.on('open-prompt', (event, arg) => {

  // const input = require('./../package/index');
  const input = require('electron-osx-prompt');

  input('Please enter a value', 'Type here...')
    .then((r) => {
      if (r) {
        event.sender.send('return-prompt', r);
      }
    });
})
