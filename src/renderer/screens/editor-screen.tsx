import { useEffect, useState } from 'react';
import Editor from '../components/editor/index';

const { electron } = window;

export default function EditorScreen() {
  const [value, setValue] = useState('');

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
      <Editor defaultData={value} />
    </div>
  );
}
