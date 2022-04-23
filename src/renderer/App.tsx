import './App.css';
import 'react-quill/dist/quill.snow.css';

import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';

import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';

const { electron } = window;

const Hello = () => {
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
      <ReactQuill
        style={{
          color: 'black',
          backgroundColor: 'white',
          maxHeight: '90vh',
          height: '90vh',
          overflow: 'auto',
        }}
        theme="snow"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
