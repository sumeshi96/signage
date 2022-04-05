const { app, BrowserWindow } = require('electron');
const path = require('path')

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        //frame: false
    });
    win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);