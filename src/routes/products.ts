import { Router, Request, Response } from 'express';
import { index, show, create } from '../models/products';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const products = await index();
  res.send(products);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const product = await show(req.params.id);
  res.send(product);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { name, price, category } = req.body;

  if (name === undefined || price === undefined || category === undefined) {
    res.send(`All attributes ('name', 'price', 'category') must be supplied in the body.`);
  }
  else {
    const newProduct = await create(name, price, category);
    res.send(newProduct);
  }
});

export default router;
