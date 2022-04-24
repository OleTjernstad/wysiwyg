import 'react-quill/dist/quill.snow.css';
import '../style/Editor.css';

import { useEffect, useState } from 'react';

import ReactQuill from 'react-quill';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { html } from 'js-beautify';
import CustomToolbar, { formats, modules } from './editor/toolbar';

const { electron } = window;

export default function Editor() {
  const [value, setValue] = useState('');

  useEffect(() => {
    electron.ipcRenderer.on('new-file', (fileContent) => {
      setValue(String(fileContent));
    });
  }, []);
  return (
    <>
      <CustomToolbar />
      <ReactQuill
        style={{
          color: 'black',
          backgroundColor: 'white',
          maxHeight: '90vh',
          height: '40vh',
          overflow: 'auto',
        }}
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue}
      />
      <SyntaxHighlighter
        language="html"
        style={anOldHope}
        showLineNumbers
        className="highlighter"
      >
        {html(value, {
          indent_size: 4,
          indent_char: ' ',
          max_preserve_newlines: 5,
          preserve_newlines: true,

          indent_scripts: 'normal',
          wrap_attributes: 'force',
          end_with_newline: true,
          wrap_line_length: 120,
          indent_inner_html: true,

          indent_empty_lines: true,
        })}
      </SyntaxHighlighter>
    </>
  );
}
