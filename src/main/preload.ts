import {
  contextBridge,
  ipcRenderer,
  IpcRendererEvent,
  clipboard,
} from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    openMenu(x: number, y: number) {
      ipcRenderer.send(`display-app-menu`, { x, y });
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['new-file', 'start-save-file', 'start-new-file'];
      if (validChannels.includes(channel)) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
          func(...args);
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
      }

      return undefined;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send(channel: string, ...args: any[]) {
      const validChannels = ['save-file'];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, ...args);
      }

      return undefined;
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example', 'save-file'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
  clipboard(text: string) {
    clipboard.writeText(text);
  },
});
