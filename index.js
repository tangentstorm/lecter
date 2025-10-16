const { app, BrowserWindow } = require('electron');
const path = require('path');
const START_DECK = 'lecter-deck.html'

function createWindow () {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    }
  });

  win.loadFile(START_DECK);
  const ejs = js=>win.webContents.executeJavaScript(js)

  // Open the DevTools.
  win.webContents.openDevTools();

  win.webContents.on('did-finish-load', async () => {
    await ejs('toolbars_enable=1;dr.color=1;resize();');
    await ejs('endanger()')
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
