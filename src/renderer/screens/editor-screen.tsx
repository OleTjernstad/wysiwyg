import Editor from 'renderer/components/editor';
import FileSelector from 'renderer/components/file-tabs';
import { useFile } from 'renderer/context/file';

export default function EditorScreen() {
  const { activeIndex, files } = useFile();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <FileSelector />
      {files.length > 0 && (
        <Editor
          file={files[activeIndex]}
          initialContent={files[activeIndex].content}
        />
      )}
    </div>
  );
}
