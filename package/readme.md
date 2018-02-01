# Electron OS X Prompts

## Usage (from Electron renderer process)
```
const input = require('electron-osx-prompt');

// pop up a prompt
input('label text', 'placeholder text')
  .then((r) => {
    // write the user input to the document
    if (r) document.getElementById('input').innerHTML = r;
  });
}
´´´
