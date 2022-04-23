/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import './App.css';
import 'react-quill/dist/quill.snow.css';

import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';

import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';

const { electron } = window;

interface QuillFuncs {
  quill: {
    getSelection(focus: true): { index: number; length: number };
    getSelection(focus?: false): { index: number; length: number } | null;
    insertText(
      index: number,
      text: string,
      source?: 'api' | 'user' | 'silent'
    ): unknown;
    insertText(
      index: number,
      text: string,
      format: string,
      value: unknown,
      source?: 'api' | 'user' | 'silent'
    ): unknown;
    insertText(
      index: number,
      text: string,
      formats: { [key: string]: unknown },
      source?: 'api' | 'user' | 'silent'
    ): unknown;
    setSelection(
      index: number,
      length?: number,
      source?: 'api' | 'user' | 'silent'
    ): void;
  };
}

/*
 * Custom "star" icon for the toolbar using an Octicon
 * https://octicons.github.io
 */
const CustomButton = () => <span>Star</span>;

/*
 * Event handler to be attached using Quill toolbar module (see line 73)
 * https://quilljs.com/docs/modules/toolbar/
 */
function insertStar(this: QuillFuncs) {
  const cursorPosition = this.quill.getSelection()?.index;
  this.quill.insertText(cursorPosition || 1, '★');
  this.quill.setSelection(cursorPosition ? cursorPosition + 1 : 1);
}

const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      insertStar,
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
];

/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option selected />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option selected />
    </select>
    <button className="ql-insertStar">
      <CustomButton />
    </button>
  </div>
);

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
      <CustomToolbar />
      <ReactQuill
        style={{
          color: 'black',
          backgroundColor: 'white',
          maxHeight: '90vh',
          height: '90vh',
          overflow: 'auto',
        }}
        modules={modules}
        formats={formats}
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
