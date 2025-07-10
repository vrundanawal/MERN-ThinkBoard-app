import { Route, Routes } from 'react-router';
import Homepage from './pages/Homepage';
import NoteDetailPage from './pages/NoteDetailPage';
import CreatePage from './pages/CreatePage';
import toast from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <button
        onClick={() => toast.success('congrates')}
        className="text-red-500 p-4"
      >
        Click Me
      </button>
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
