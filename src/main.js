const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        //frame:false;
    });
    win.loadFile('./src/index.html');
    win.setMenu(null);
    //win.setFullScreen(true);
    //win.webContents.openDevTools();
}

//ウィンドウ作成処理
app.whenReady().then(createWindow);

//weather.pyからデータを受け取る
var { PythonShell } = require('python-shell');

ipcMain.handle('getWeatherData', (event, data) => {
    //pythonに渡すパラメータ
    var options = {
        data: data
    };
    //パラメータとともに渡す
    let pyshell = new PythonShell('./src/weather.py', options);

    //pythonでコード実行、結果を受け取る
    pyshell.on('message', async function (message) {
        //preload.jsに送る
        event.sender.send("return_data", message);
    });
});

