import './style/App.css';

import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import EditorScreen from './screens/editor-screen';
import { FileContextProvider } from './context/file';
import AppBar from './components/app-bar';

export default function App() {
  return (
    <>
      <AppBar />
      <FileContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<EditorScreen />} />
          </Routes>
        </Router>
      </FileContextProvider>
    </>
  );
}
