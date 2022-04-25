import '../style/tinymce.css';
import { Editor as TinyMceReactEditor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useRef } from 'react';

require('tinymce/tinymce');
require('tinymce/plugins/code/index');
require('tinymce/themes/silver/index');
require('tinymce/models/dom/index');
require('tinymce/icons/default/index');

interface EditorProps {
  initialContent: string;
}
export default function Editor({ initialContent }: EditorProps) {
  const editorRef = useRef<TinyMCEEditor>();
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current?.getContent());
    }
  };

  return (
    <>
      <TinyMceReactEditor
        onInit={(_, editor) => {
          editorRef.current = editor;
        }}
        initialValue={initialContent}
        init={{
          skin: false,
          content_css: false,
          height: '90vh',
          menubar: false,
          plugins: 'code',
          toolbar_mode: 'wrap',
          toolbar:
            'fontfamily | blocks | ' +
            'bold italic underline strikethrough | forecolor fontsize | hr | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | undo redo | code   | help',
        }}
      />
      <button type="button" onClick={log}>
        Log editor content
      </button>
    </>
  );
}
