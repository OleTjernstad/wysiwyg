declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing(): void;
        openMenu(x: number, y: number): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        send(
          channel: string,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...args: any[]
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
      clipboard(text: string): void;
    };
  }
}

export {};
