import './App.css';
import 'react-quill/dist/quill.snow.css';

import React, { useRef, useState } from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';

import ReactQuill from 'react-quill';

const Hello = () => {
  const [value, setValue] = useState('');

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
          overflow: 'auto',
          margin: 10,
          marginTop: 20,
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
