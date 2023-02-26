import {type App, BrowserWindow} from 'electron';
import {handleMessage} from './handle-message';
import {pathToFileURL} from 'url';
import { resolve } from 'path';
import { mainWindowSize } from './config';

const webpagePath = resolve(__dirname, '../dist-webpage/index.html')

const mainWindowUrl = pathToFileURL(webpagePath).toString();
const compareWindowUrl = pathToFileURL(webpagePath).toString() + '#/compare';
// Const mainWindowUrl = 'http://127.0.0.1:8080/';
// const compareWindowUrl = 'http://127.0.0.1:8080#/compare';

console.log(mainWindowUrl, compareWindowUrl);

function createCompareWindow(app: App): BrowserWindow {
	const win = new BrowserWindow({
		width: 600,
		height: 400,
		hasShadow: false,
		skipTaskbar: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		// Resizable: false,
		transparent: true,
		frame: false,
	});
	win.setMenuBarVisibility(false);
	win.setIgnoreMouseEvents(true);
	win.setAlwaysOnTop(true);

	win.loadURL(compareWindowUrl);

	win.on('close', () => {
		app.quit();
	});

	// Win.webContents.openDevTools();

	return win;
}

function createMainWindow(app: App): BrowserWindow {
	const win = new BrowserWindow({
		width: mainWindowSize.width,
		height: mainWindowSize.height,
		// resizable: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});
	win.loadURL(mainWindowUrl);

	win.setMenuBarVisibility(false);
	win.setMaximizable(false);
	win.on('close', () => {
		app.quit();
	});

	// win.webContents.openDevTools({
	// 	mode: 'undocked'
	// });

	return win;
}

export function createWindow(app: App): void {
	const compareWindow = createCompareWindow(app);
	const mainWindow = createMainWindow(app);
	handleMessage({
		mainWindow,
		compareWindow,
	});
}
