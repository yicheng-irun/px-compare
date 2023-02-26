import {type IpcRenderer} from 'electron';

export function getIpcRenderer(): IpcRenderer {
	if (window.require) {
		const electron = window.require('electron');
		return electron.ipcRenderer;
	}

	const mockValue = {
		send(...arg: unknown[]) {
			console.info('send', ...arg);
		},
		sendTo(...arg: unknown[]) {
			console.info('sendTo', ...arg);
		},
		sendSync(...arg: unknown[]) {
			console.info('sendSync', ...arg);
		},
		on(...arg: unknown[]) {
			console.info('sendSync', ...arg);
		},
	};
	return (mockValue as unknown) as IpcRenderer;
}
