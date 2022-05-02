import './style/App.css';
import { Toaster } from 'react-hot-toast';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import EditorScreen from './screens/editor-screen';
import { FileContextProvider } from './context/file';
import AppBar from './components/app-bar';

export default function App() {
  return (
    <>
      <Toaster />
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
