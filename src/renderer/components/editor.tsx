import '../style/tinymce.css';
import { Editor as TinyMceReactEditor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useEffect, useRef } from 'react';
import { File } from 'renderer/contracts/file';
import { useFile } from 'renderer/context/file';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';

const { electron } = window;

require('tinymce/tinymce');
require('@tjernstad-utvikling/geo-image/dist/plugin');
require('tinymce/plugins/code/index');
require('tinymce/plugins/table/index');
require('tinymce/plugins/lists/index');
require('tinymce/themes/silver/index');
require('tinymce/models/dom/index');
require('tinymce/icons/default/index');

interface EditorProps {
  file: File;
}

export default function Editor({ file }: EditorProps) {
  const editorRef = useRef<TinyMCEEditor>();

  const { updateEditedStatus } = useFile();

  function copyContentToClipboard() {
    electron.clipboard(editorRef.current?.getContent() ?? '');
    toast('html kopiert til utklippstavle');
  }

  useEffect(() => {
    const removeListener = electron.ipcRenderer.on(
      'start-save-file',
      (isSaveAs) => {
        electron.ipcRenderer.send('save-file', {
          ...file,
          path: isSaveAs ? undefined : file.path,
          content: editorRef.current?.getContent(),
        });
        updateEditedStatus(file.id, false);
      }
    );

    return () => {
      if (removeListener) removeListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <>
      <TinyMceReactEditor
        onInit={(_, editor) => {
          editorRef.current = editor;
        }}
        initialValue={file.content}
        onChange={() => {
          if (file) updateEditedStatus(file.id, true);
        }}
        init={{
          skin: false,
          content_css: false,
          height: '80vh',
          menubar: false,
          plugins: 'code geo-image table lists',
          toolbar_mode: 'wrap',
          statusbar: false,
          toolbar:
            'fontfamily | blocks | bold italic underline strikethrough | table numlist bullist | forecolor fontsize | hr geo-image | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | undo redo | code ',
        }}
      />
      <Button variant="contained" onClick={() => copyContentToClipboard()}>
        Kopier html
      </Button>
    </>
  );
}
