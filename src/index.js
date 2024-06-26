const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Remove the default menu (which includes the DevTools shortcut)
  Menu.setApplicationMenu(null);

  // Prevent opening dev tools via F12 or other key combinations
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12' ||
        (input.control && input.shift && ['I', 'J', 'C', 'R', 'U'].includes(input.key.toUpperCase()))) {
      event.preventDefault();
    }
  });

  // Prevent opening dev tools via context menu
  mainWindow.webContents.on('context-menu', (event) => {
    event.preventDefault();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
