import { App, BrowserWindow } from 'electron';
import { handleMessage } from './handle-message';
import { pathToFileURL } from 'url'

const mainWindowUrl = pathToFileURL(__dirname + '/web/index.html').toString()
const compareWindowUrl = pathToFileURL(__dirname + '/web/index.html').toString()+'#/compare'
// const mainWindowUrl = 'http://127.0.0.1:8080/';
// const compareWindowUrl = 'http://127.0.0.1:8080#/compare';

console.log(mainWindowUrl, compareWindowUrl)

function createCompareWindow(app: App): BrowserWindow {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    hasShadow: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    // resizable: false,
    transparent: true,
    frame: false
  });
  win.setMenuBarVisibility(false);
  win.setIgnoreMouseEvents(true);
  win.setAlwaysOnTop(true);

  win.loadURL(compareWindowUrl);

  win.on('close', () => {
    app.quit();
  });

  // win.webContents.openDevTools();

  return win;
}

function createMainWindow(app: App): BrowserWindow {
  const win = new BrowserWindow({
    width: 250,
    height: 400,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadURL(mainWindowUrl);


  win.setMenuBarVisibility(false);
  win.setMaximizable(false);
  win.on('close', () => {
    app.quit();
  });

  // win.webContents.openDevTools();

  return win;
}

export function createWindow(app: App): void {
  const compareWindow = createCompareWindow(app);
  const mainWindow = createMainWindow(app);
  handleMessage({
    mainWindow,
    compareWindow
  });
}
