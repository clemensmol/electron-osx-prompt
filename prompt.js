const { ipcRenderer } = require('electron');
const remote = require('electron').remote;

const { getAppIconByPid } = require('node-mac-app-icon');

const path = require('path')

ipcRenderer.on('electron-osx-prompt-settings', (event, options) => {
    document.getElementById('label').innerHTML = options.label;
    document.getElementById('input').placeholder = options.placeholder;

    let pid = remote.process.pid;

    getAppIconByPid(pid, { size: 60 }).then(res => {

        let img = 'data:image/png;base64,' + new Buffer(res).toString('base64');
        document.getElementById('prompt-img').src = img;
    });

    console.log(options.browserWindow)

    if (options.browserWindow == null) {
        var header = document.getElementById('header')
        header.insertAdjacentHTML('afterbegin', '<header class="toolbar toolbar-header"></header>')
    }
})

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('input').focus();
});

function enter (e) {
    if (e.charCode == '13') {
        Ok();
    }
}

function Ok () {
    let returnValue = document.getElementById('input').value.toString();
    ipcRenderer.sendSync('electron-osx-prompt-return-value', returnValue);
}

function Cancel () {
    ipcRenderer.sendSync('electron-osx-prompt-return-value', null);
}
