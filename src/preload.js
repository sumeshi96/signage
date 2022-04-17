const { contextBridge, ipcRenderer } = require('electron');

const fs = require('fs');

contextBridge.exposeInMainWorld('myapi', {
    send: async (data) => await ipcRenderer.invoke('getWeatherData', data),

    on: (channel, func) => {
        ipcRenderer.on(channel, (event, data) => func(data));
    },

    getSetting: () => {
        const setting_path = './src/forecast.json';
        return fs.existsSync(setting_path) ? fs.readFileSync(setting_path, 'utf8') : '{}';
    },

    getBus: () => {
        const bus_path = './src/bus-timetable.json';
        return fs.existsSync(bus_path) ? fs.readFileSync(setting_path, 'utf8') : '{}';
    }
});