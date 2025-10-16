const { app, BrowserWindow } = require('electron');
const path = require('path');
const START_DECK = 'lecter-deck.html'

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(START_DECK);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('did-finish-load', async () => {
    await mainWindow.webContents.executeJavaScript('toolbars_enable=1;dr.color=1;resize();');
    mainWindow.webContents.send('decker:endanger');
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
