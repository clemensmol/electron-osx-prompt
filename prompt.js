const { ipcRenderer } = require('electron');

ipcRenderer.on('prompt-settings', (event, options) => {
    document.getElementById('label').innerHTML = options.label;
    document.getElementById('input').placeholder = options.placeholder;
    document.getElementById('prompt-img').src =
        'data:image/png;base64,' + new Buffer(options.icon).toString('base64');
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
