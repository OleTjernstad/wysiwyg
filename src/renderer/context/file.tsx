import { v4 as uuidv4 } from 'uuid';

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
  const [activeId, setActiveId] = useState<string>();
  const [isEdited, setIsEdited] = useState<Map<string, boolean>>(new Map());
  const [refreshIndex, setRefreshIndex] = useState<number>();

  const updateEditedStatus = (id: string, hasBeenEdited: boolean) => {
    const currentIsEdited = isEdited;

    currentIsEdited.set(id, hasBeenEdited);

    setIsEdited(currentIsEdited);
    setRefreshIndex(Date.now());
  };

  useEffect(() => {
    electron.ipcRenderer.on('new-file', (_file) => {
      const id = uuidv4();
      if (!isFile(_file)) return;
      setFiles((prev) => {
        return [...prev, { ..._file, id }];
      });
      setActiveId(id);
    });
  }, []);

  useEffect(() => {
    electron.ipcRenderer.on('start-new-file', () => {
      const id = uuidv4();
      setFiles((prev) => {
        return [
          ...prev,
          { id, content: '', name: 'Ny fil.html', path: undefined },
        ];
      });
      updateEditedStatus(id, true);
      setActiveId(id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <context.Provider
      value={{
        files,
        activeId,
        isEdited,
        refreshIndex,
        setActiveFile: setActiveId,
        updateEditedStatus,
      }}
    >
      {children}
    </context.Provider>
  );
};
