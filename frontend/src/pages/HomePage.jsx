import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/notes');
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
    </div>
  );
};

export default HomePage;
