import express from 'express';
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteByID,
} from '../controllers/notesController.js';
const router = express.Router();
// Define your routes here

router.get('/', getAllNotes);
router.get('/:id', getNoteByID); // Assuming you want to get a specific note by ID
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
