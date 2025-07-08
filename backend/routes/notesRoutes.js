import express from 'express';
const router = express.Router();
// Define your routes here

router.get('/', (req, res) => {
  res.status(200).json({ message: 'You got 20 Notes!!' });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Note created successfully!' });
});

router.put('/:id', (req, res) => {
  res.status(200).json({ message: `Note updated successfully!` });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `Note deleted successfully!` });
});

export default router;
