import mongoose from 'mongoose';

// 1st step: create a schema
// 2nd step: create a model based on the schema
// 3rd step: export the model to use it in other files
// 4th step: import the model in the file where you want to use it

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Note = mongoose.model('Note', noteSchema);
export default Note;
