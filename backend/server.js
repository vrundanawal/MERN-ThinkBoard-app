import express from 'express';

const app = express();
app.listen(5001, () => {
  console.log('Server is running on PORT: 5001');
});
