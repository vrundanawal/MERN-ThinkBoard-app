import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import noteRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import ratelimiter from './middleware/rateLimter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: 'http://localhost:5173', // Change this to your frontend URL in production
  })
); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
//call the ratelimiter middleware
app.use(ratelimiter);
app.use('/api/notes', noteRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});
