import './style/App.css';

import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import EditorScreen from './screens/editor-screen';
import { FileContextProvider } from './context/file';

export default function App() {
  return (
    <>
      <div id="menu-bar">
        <div className="left" role="menu">
          <button type="button" className="menubar-btn" id="menu-btn">
            |||
          </button>
          <h5>My Awesome App</h5>
        </div>
        <div className="right">
          <button type="button" className="menubar-btn" id="minimize-btn">
            -
          </button>
          <button type="button" className="menubar-btn" id="max-unmax-btn">
            O
          </button>
          <button type="button" className="menubar-btn" id="close-btn">
            X
          </button>
        </div>
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
