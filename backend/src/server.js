import express from 'express';
import noteRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import ratelimiter from './middleware/rateLimter.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON bodies
//call the ratelimiter middleware
app.use(ratelimiter);
app.use(cors()); // Enable CORS for all routes
app.use('/api/notes', noteRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});
