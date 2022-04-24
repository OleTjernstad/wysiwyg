/* eslint-disable jsx-a11y/control-has-associated-label */

import { QuillFuncs } from 'renderer/contracts/Editor';

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

export const modules = {
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

export const formats = [
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
export default function CustomToolbar() {
  return (
    <div id="toolbar">
      <select
        className="ql-header"
        defaultValue=""
        onChange={(e) => e.persist()}
      >
        <option value="1" />
        <option value="2" />
        <option />
      </select>

      <button type="button" className="ql-bold" />
      <button type="button" className="ql-italic" />
      <button type="button" className="ql-strike" />
      <select className="ql-color" defaultValue="">
        <option value="red" />
        <option value="green" />
        <option value="blue" />
        <option value="orange" />
        <option value="violet" />
        <option value="#d0d1d2" />
        <option />
      </select>
      <button type="button" className="ql-insertStar">
        <CustomButton />
      </button>
    </div>
  );
}
