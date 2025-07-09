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
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  try {
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

// export const createNote = (req, res) => {
//   res.status(201).json({ message: 'Note created successfully!' });
// };
export const updateNote = (req, res) => {
  res.status(200).json({ message: `Note updated successfully!` });
};

export const deleteNote = (req, res) => {
  res.status(200).json({ message: `Note deleted successfully!` });
};
