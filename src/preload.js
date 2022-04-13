const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('myapi', {
    send: async (data) => await ipcRenderer.invoke('getWeatherData', data),
    on: (channel, func) => {
        ipcRenderer.on(channel, (event, data) => func(data));
    }
});