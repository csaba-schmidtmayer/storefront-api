import express from 'express';
import cors from 'cors';

import categories from './routes/categories';
import products from './routes/products';
import users from './routes/users';
import checkAdmin from './helpers/checkAdmin';

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/categories', categories);
app.use('/products', products);
app.use('/users', users);

app.get('*', (req, res) => {
  res.json('works').send();
});

// Check existance of an admin user and start the server
checkAdmin()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`app is running on port ${PORT}`);
    });
  });

export default app;
