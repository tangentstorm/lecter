 const { contextBridge, ipcRenderer } = require('electron');

// mainWorld is the "page"
const emw = (apiKey, api)=>contextBridge.exposeInMainWorld(apiKey, api)
emw('add1', x => x + 1);

