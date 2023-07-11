// Modules to control application life and create native browser window
const { app, BrowserWindow, screen } = require('electron')
const path = require('path')


const createWindow = () => {
  // Create the browser window.
  let factor = screen.getPrimaryDisplay().scaleFactor;

  const mainWindow = new BrowserWindow({
    width: 1920 / factor,
    height: 1080 / factor,
    /* Temporary, make better solution later */
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      zoomFactor: 0.8
    }

  })
  mainWindow.maximize();
  mainWindow.hide();
  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Splash screen
  var splashWindow = new BrowserWindow({
    width: 960,
    height: 540,
    transparent: true,
    frame: false,
    alwaysOnTop: true
  })

  splashWindow.loadFile('src/splash.html');
  splashWindow.center()

  // Hide splash screen and open mainWindow after loading duration
  setTimeout(() => {
    splashWindow.close();
    mainWindow.show();
  }, 0);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
