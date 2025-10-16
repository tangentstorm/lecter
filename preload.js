 const { contextBridge, ipcRenderer } = require('electron');


ipcRenderer.on('decker:endanger', () => {
  endanger()
});
