import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false); // Track if fetch has already occurred

  useEffect(() => {
    const fetchNotes = async () => {
      if (hasFetched.current) return; // Prevent duplicate calls
      hasFetched.current = true;
      try {
        const response = await api.get('/notes');
        console.log('Fetched notes:', response.data); // Debugging line to check fetched notes
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response && error.response?.status === 429) {
          setIsRateLimited(true);
          toast.error(
            'You have exceeded the rate limit. Please try again later.'
          );
        } else {
          setIsRateLimited(false);
          toast.error('Failed to fetch notes. Please try again later.');
        }
      } finally {
        // Additional cleanup or final actions can be performed here if needed
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
