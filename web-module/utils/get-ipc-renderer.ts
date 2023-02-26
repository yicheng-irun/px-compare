import { IpcRenderer } from 'electron';

export function getIpcRenderer(): IpcRenderer {
  if (window.require) {
    const electron = window.require('electron');
    return electron.ipcRenderer;
  }
  const mockValue = {
    send(...arg: any) {
      console.info('send', ...arg);
    },
    sendTo(...arg: any) {
      console.info('sendTo', ...arg);
    },
    sendSync(...arg: any) {
      console.info('sendSync', ...arg);
    }
  };
  return (mockValue as unknown) as IpcRenderer;
}
