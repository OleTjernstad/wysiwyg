import './style/App.css';

import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import EditorScreen from './screens/editor-screen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EditorScreen />} />
      </Routes>
    </Router>
  );
}
