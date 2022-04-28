import { createContext, useContext, useEffect, useState } from 'react';
import { File, isFile } from 'renderer/contracts/file';
import { ContextInterface } from './contracts';

const context = createContext<ContextInterface>({} as ContextInterface);

const { electron } = window;

export const useFile = () => {
  return useContext(context);
};

export const FileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [files, setFiles] = useState<File[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    electron.ipcRenderer.on('new-file', (_file) => {
      if (!isFile(_file)) return;
      setFiles((prev) => {
        return [...prev, _file];
      });
    });
  }, []);

  useEffect(() => {
    electron.ipcRenderer.on('start-new-file', () => {
      setFiles((prev) => {
        return [...prev, { content: '', name: 'Ny fil.html', path: undefined }];
      });
    });
  }, []);

  return (
    <context.Provider
      value={{
        files,
        activeIndex,
        setActiveFile: setActiveIndex,
      }}
    >
      {children}
    </context.Provider>
  );
};
