import { useEffect, useRef } from 'react';
import Quill, {
  QuillOptionsStatic,
  RangeStatic,
  BoundsStatic,
  StringMap,
  Sources,
  DeltaOperation,
} from 'quill';

interface EditorProps {
  defaultData: string;
}
export default function Editor({ defaultData }: EditorProps) {
  const editor = useRef<Quill>();

  function onEditorChange(
    eventName: 'text-change' | 'selection-change',
    rangeOrDelta: RangeStatic | DeltaOperation,
    oldRangeOrDelta: RangeStatic | DeltaOperation,
    source: Sources
  ) {
    console.log(editor.current?.root.innerHTML);
  }

  useEffect(() => {
    editor.current?.clipboard.dangerouslyPasteHTML(defaultData);
  }, [defaultData]);

  useEffect(() => {
    editor.current = new Quill('#editor', {
      modules: { toolbar: '#toolbar' },
    });
    editor.current.on('editor-change', onEditorChange);

    return () => {
      editor.current?.off('editor-change', onEditorChange);
      editor.current = undefined;
    };
  }, []);

  return (
    <>
      <div id="toolbar">
        <button type="button" className="ql-bold">
          Bold
        </button>
        <button type="button" className="ql-italic">
          Italic
        </button>
      </div>
      <div id="editor">
        <p>Hello World!</p>
        <ul>
          <li>ee</li>
          <li>ee</li>
          <li>ee</li>
        </ul>
      </div>
    </>
  );
}
