const { ipcRenderer } = require('electron');

ipcRenderer.on('prompt-settings', (event, options) => {
    document.getElementById('title').innerHTML = options.title;
    document.getElementById('label').innerHTML = options.label;
    document.getElementById('input').placeholder = options.placeholder;
    document.getElementById('prompt-img').src = options.icon;
})

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('input').focus();
});

function enter(e) {
    if (e.charCode == '13') {
        Ok();
    }
}

function Ok() {
    let returnValue = document.getElementById('input').value;
    ipcRenderer.sendSync('return-value', returnValue);
}

function Cancel() {
    ipcRenderer.sendSync('return-value', null);
}
