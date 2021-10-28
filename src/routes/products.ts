import { Router, Request, Response } from 'express';
import { index, show } from '../models/products';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const products = await index();
  res.send(products);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const product = await show(req.params.id);
  res.send(product);
});

export default router;
