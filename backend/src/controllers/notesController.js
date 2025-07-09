import Note from '../models/Note.js';

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res
      .status(500)
      .json({ message: 'Error fetching notes', error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    // Validate that title and content are provided
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: 'Title and content are required' });
    }
    const newNote = new Note({
      title,
      content,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res
      .status(500)
      .json({ message: 'Error creating note', error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params; // Get the note ID from the request parameters
    const { title, content } = req.body; // Get the updated title and content from the request body
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res
      .status(500)
      .json({ message: 'Error updating note', error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params; // Get the note ID from the request parameters
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully!' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res
      .status(500)
      .json({ message: 'Error deleting note', error: error.message });
  }
};
