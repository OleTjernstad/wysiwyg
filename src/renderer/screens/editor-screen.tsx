import { useEffect, useRef, useState } from 'react';
import Editor from 'renderer/components/editor';

const { electron } = window;

export default function EditorScreen() {
  const [value, setValue] = useState<string>();

  useEffect(() => {
    electron.ipcRenderer.on('new-file', (fileContent) => {
      setValue(String(fileContent));
    });
  }, []);
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {value && <Editor initialContent={value} />}
    </div>
  );
}
