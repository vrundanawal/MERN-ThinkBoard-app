import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import noteRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import ratelimiter from './middleware/rateLimter.js';
import { log } from 'console';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
console.log(__dirname);

app.use(
  cors({
    origin: 'http://localhost:5173', // Change this to your frontend URL in production
  })
); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
//call the ratelimiter middleware
app.use(ratelimiter);
app.use('/api/notes', noteRoutes);

//only in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});
