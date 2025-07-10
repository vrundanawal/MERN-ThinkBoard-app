import { Route, Routes } from 'react-router';
import Homepage from './pages/Homepage';
import NoteDetailPage from './pages/NoteDetailPage';
import CreatePage from './pages/CreatePage';

const App = () => {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default App;
