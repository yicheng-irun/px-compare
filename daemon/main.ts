import {app, BrowserWindow} from 'electron';
import {createWindow} from './create-window';

app.whenReady().then(() => {
	createWindow(app);
}).catch(console.error);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow(app);
	}
});
