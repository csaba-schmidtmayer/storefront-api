import express from 'express';
import cors from 'cors';

const app = express();

// Global middleware
app.use(cors());

// Routes
app.get('*', (req, res) => {
  res.json('works').send();
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
