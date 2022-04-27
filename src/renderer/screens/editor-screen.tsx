import { useEffect, useState } from 'react';
import Editor from 'renderer/components/Editor';
import { File, isFile } from 'renderer/contracts/file';

const { electron } = window;

export default function EditorScreen() {
  const [file, setFile] = useState<File>();

  useEffect(() => {
    electron.ipcRenderer.on('new-file', (_file) => {
      if (!isFile(_file)) return;
      setFile(_file);
    });
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {file && <Editor file={file} initialContent={file.content} />}
    </div>
  );
}
