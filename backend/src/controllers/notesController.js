export const getAllNotes = (req, res) => {
  res.status(200).json({ message: 'You got 20 Notes!!' });
};

export const createNote = (req, res) => {
  res.status(201).json({ message: 'Note created successfully!' });
};
export const updateNote = (req, res) => {
  res.status(200).json({ message: `Note updated successfully!` });
};

export const deleteNote = (req, res) => {
  res.status(200).json({ message: `Note deleted successfully!` });
};
