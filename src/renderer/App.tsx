import './style/App.css';
import { Toaster } from 'react-hot-toast';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import EditorScreen from './screens/editor-screen';
import { FileContextProvider } from './context/file';
import AppBar from './components/app-bar';
import logo from '../../assets/logo.png';

export default function App() {
  return (
    <>
      <Toaster />
      <AppBar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={logo}
          style={{ height: '40vmin', marginTop: '5vh' }}
          alt="logo"
        />
      </div>
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
