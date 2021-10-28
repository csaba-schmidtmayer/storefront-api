import express from 'express';
import cors from 'cors';

import categories from './routes/categories';
import products from './routes/products';

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/categories', categories);
app.use('/products', products);

app.get('*', (req, res) => {
  res.json('works').send();
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
