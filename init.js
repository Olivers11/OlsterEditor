const {BrowserWindow} = require('electron');


function CrearVentana(){
    let win = new BrowserWindow({
        width: 900,
        height: 600,
        title: 'OlsterCode',
        minWidth: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        }
    })

    win.loadFile('src/index.html');
    //win.webContents.openDevTools();
}
module.exports = {
    CrearVentana
}


