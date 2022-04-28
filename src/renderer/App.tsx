import './style/App.css';

import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import EditorScreen from './screens/editor-screen';
import { FileContextProvider } from './context/file';

export default function App() {
  return (
    <FileContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<EditorScreen />} />
        </Routes>
      </Router>
    </FileContextProvider>
  );
}
