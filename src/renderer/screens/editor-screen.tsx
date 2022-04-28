import { useEffect, useState } from 'react';
import Editor from 'renderer/components/editor';
import { File, isFile } from 'renderer/contracts/file';

const { electron } = window;

export default function EditorScreen() {
  const [files, setFiles] = useState<File[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>();

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
        return [
          ...prev,
          { content: '', name: 'Beskrivelse.html', path: undefined },
        ];
      });
    });
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {activeIndex && (
        <Editor
          file={files[activeIndex]}
          initialContent={files[activeIndex].content}
        />
      )}
    </div>
  );
}
